import { supabase } from '../config/supabase';
import { generateEmail } from '../generators/emailGenerator';
import { generatePushNotification } from '../generators/pushNotificationGenerator';
import { addToQueue } from '../queue';
import type { UserContext, EmailTriggerType } from '../types';

function buildUserContext(record: Record<string, unknown>): UserContext {
  return {
    name: (record.name as string) || 'there',
    currentRole: (record.current_role as string) || 'professional',
    targetDirection: (record.target_direction as string) || 'something new',
    sprintDay: (record.sprint_day as number) || 0,
    planType: (record.plan_type as 'explorer' | 'pathfinder' | 'accelerator') || 'explorer',
    daysSinceLastActive: record.last_active_at
      ? Math.floor(
          (Date.now() - new Date(record.last_active_at as string).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0,
  };
}

// ── Sprint day milestones that trigger emails ──
const SPRINT_DAY_TRIGGERS: Record<number, EmailTriggerType> = {
  3: 'sprint_day_3',
  7: 'sprint_day_7',
  15: 'sprint_day_15',
  28: 'sprint_day_28',
};

export function startEventListeners() {
  console.log('[Triggers] Starting Supabase realtime listeners...');

  // ── Listen for user table changes ──
  supabase
    .channel('user-events')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'users' },
      async (payload) => {
        const newRecord = payload.new as Record<string, unknown>;
        const oldRecord = payload.old as Record<string, unknown>;
        const userContext = buildUserContext(newRecord);

        try {
          // ── Intake completed but payment not done ──
          if (
            newRecord.intake_completed === true &&
            oldRecord.intake_completed !== true &&
            newRecord.payment_completed !== true
          ) {
            console.log(`[Event] Intake incomplete for ${userContext.name} — scheduling re-engagement email in 24h`);
            const email = await generateEmail('intake_incomplete', userContext, 1);
            await addToQueue('email', 'lifecycle_email', 'intake_incomplete', {
              ...email,
              scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              userId: newRecord.id,
            } as unknown as Record<string, unknown>);
          }

          // ── Sprint day milestone ──
          if (
            newRecord.sprint_day !== oldRecord.sprint_day &&
            typeof newRecord.sprint_day === 'number'
          ) {
            const triggerType = SPRINT_DAY_TRIGGERS[newRecord.sprint_day];
            if (triggerType) {
              console.log(`[Event] Sprint day ${newRecord.sprint_day} for ${userContext.name}`);
              const email = await generateEmail(triggerType, userContext, 1);
              await addToQueue('email', 'sprint_email', triggerType, {
                ...email,
                userId: newRecord.id,
              } as unknown as Record<string, unknown>);
            }
          }

          // ── Sprint completed ──
          if (
            newRecord.sprint_completed === true &&
            oldRecord.sprint_completed !== true
          ) {
            console.log(`[Event] Sprint completed for ${userContext.name}`);

            const [upgradeEmail, completionNotification] = await Promise.all([
              generateEmail('upgrade_prompt', userContext, 1),
              generatePushNotification('daily_sprint_reminder', userContext),
            ]);

            await Promise.all([
              addToQueue('email', 'upgrade_email', 'sprint_complete', {
                ...upgradeEmail,
                userId: newRecord.id,
              } as unknown as Record<string, unknown>),
              addToQueue('push', 'push_notification', 'sprint_complete', {
                ...completionNotification,
                userId: newRecord.id,
              } as unknown as Record<string, unknown>),
            ]);
          }
        } catch (err) {
          console.error(`[Event] Error processing user update for ${newRecord.id}:`, err);
        }
      },
    )
    .subscribe();

  // ── Listen for subscription changes ──
  supabase
    .channel('subscription-events')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'subscriptions' },
      async (payload) => {
        const newRecord = payload.new as Record<string, unknown>;
        const oldRecord = payload.old as Record<string, unknown>;

        try {
          // Fetch user context for this subscription
          const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('id', newRecord.user_id)
            .single();

          if (!user) return;
          const userContext = buildUserContext(user);

          // ── Subscription cancelled ──
          if (
            newRecord.status === 'cancelled' &&
            oldRecord.status !== 'cancelled'
          ) {
            console.log(`[Event] Subscription cancelled for ${userContext.name}`);

            // Day 1 email — immediately
            const day1Email = await generateEmail('cancellation_day_1', userContext, 1);
            await addToQueue('email', 'cancellation_email', 'cancellation_day_1', {
              ...day1Email,
              userId: newRecord.user_id,
            } as unknown as Record<string, unknown>);

            // Day 7 email — scheduled
            const day7Email = await generateEmail('cancellation_day_7', userContext, 2);
            await addToQueue('email', 'cancellation_email', 'cancellation_day_7', {
              ...day7Email,
              userId: newRecord.user_id,
              scheduledFor: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            } as unknown as Record<string, unknown>);
          }

          // ── Subscription renewed ──
          if (
            newRecord.status === 'active' &&
            oldRecord.status !== 'active'
          ) {
            console.log(`[Event] Subscription renewed for ${userContext.name}`);
            const notification = await generatePushNotification('subscription_renewed', userContext);
            await addToQueue('push', 'push_notification', 'subscription_renewed', {
              ...notification,
              userId: newRecord.user_id,
            } as unknown as Record<string, unknown>);
          }
        } catch (err) {
          console.error(`[Event] Error processing subscription update:`, err);
        }
      },
    )
    .subscribe();

  console.log('[Triggers] Realtime listeners active:');
  console.log('  - users table: intake, sprint milestones, sprint completion');
  console.log('  - subscriptions table: cancellation, renewal');
}
