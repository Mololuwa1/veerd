import cron from 'node-cron';
import { supabase } from '../config/supabase';
import { generatePushNotification } from '../generators/pushNotificationGenerator';
import { generateTikTokScript } from '../generators/tiktokScriptGenerator';
import { generateTwitterContent } from '../generators/twitterGenerator';
import { generateRedditResponse } from '../generators/redditGenerator';
import { generateEmail } from '../generators/emailGenerator';
import { addToQueue } from '../queue';
import type { UserContext } from '../types';

// ── Helper: fetch active Explorer users who haven't completed today's activity ──
async function getInactiveExplorers(): Promise<UserContext[]> {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('users')
    .select('name, current_role, target_direction, sprint_day, plan_type, last_active_at')
    .eq('plan_type', 'explorer')
    .eq('status', 'active')
    .lt('last_active_at', today);

  if (error) {
    console.error('Failed to fetch inactive explorers:', error.message);
    return [];
  }

  return (data || []).map((u) => ({
    name: u.name,
    currentRole: u.current_role,
    targetDirection: u.target_direction,
    sprintDay: u.sprint_day,
    planType: u.plan_type,
    daysSinceLastActive: Math.floor(
      (Date.now() - new Date(u.last_active_at).getTime()) / (1000 * 60 * 60 * 24),
    ),
  }));
}

// ── Helper: fetch trending Twitter topics ──
async function fetchTrendingTopics(): Promise<string[]> {
  // Twitter API integration — returns placeholder until API keys configured
  try {
    // TODO: Implement Twitter API v2 trending topics fetch
    return [
      'career change',
      'quiet quitting',
      'work life balance',
      'career pivot',
      'professional development',
    ];
  } catch (err) {
    console.error('Failed to fetch trending topics:', err);
    return ['career transition', 'career change'];
  }
}

// ── Helper: fetch top Reddit posts from target subreddits ──
async function fetchTopRedditPosts(
  subreddits: string[],
): Promise<Array<{ subreddit: string; title: string; body: string; topComments: string[] }>> {
  // Reddit API integration — returns placeholder until API keys configured
  try {
    // TODO: Implement Reddit API fetch using REDDIT_CLIENT_ID/SECRET
    return subreddits.map((sub) => ({
      subreddit: sub,
      title: 'Placeholder — configure Reddit API keys',
      body: '',
      topComments: [],
    }));
  } catch (err) {
    console.error('Failed to fetch Reddit posts:', err);
    return [];
  }
}

// ── Schedule: Daily at 7am — Sprint reminder push notifications ──
cron.schedule('0 7 * * *', async () => {
  console.log('[Scheduled] Generating daily Sprint reminders...');
  try {
    const users = await getInactiveExplorers();
    for (const user of users) {
      const notification = await generatePushNotification('daily_sprint_reminder', user);
      await addToQueue('push', 'push_notification', 'daily_sprint_reminder', notification as unknown as Record<string, unknown>);
    }
    console.log(`[Scheduled] Queued ${users.length} Sprint reminder notifications.`);
  } catch (err) {
    console.error('[Scheduled] Sprint reminders failed:', err);
  }
});

// ── Schedule: Weekly Monday at 6am — TikTok scripts ──
cron.schedule('0 6 * * 1', async () => {
  console.log('[Scheduled] Generating weekly TikTok scripts...');
  try {
    const scripts = await generateTikTokScript(
      'Career transition stories', // Weekly theme — can be dynamic
      ['career change', 'quitting corporate', 'finding purpose'],
      ['POV: you finally quit the job you hated for 5 years'],
      'awareness',
    );
    for (const script of scripts) {
      await addToQueue('tiktok', 'tiktok_script', 'weekly_batch', script as unknown as Record<string, unknown>);
    }
    console.log(`[Scheduled] Queued ${scripts.length} TikTok scripts.`);
  } catch (err) {
    console.error('[Scheduled] TikTok scripts failed:', err);
  }
});

// ── Schedule: Mon/Wed/Fri at 9am — Twitter posts ──
cron.schedule('0 9 * * 1,3,5', async () => {
  console.log('[Scheduled] Generating Twitter content...');
  try {
    const trending = await fetchTrendingTopics();
    const trendingContext = trending.join(', ');

    const types: Array<'standalone' | 'thread' | 'reply'> = ['standalone', 'standalone', 'thread'];
    for (const type of types) {
      const content = await generateTwitterContent(type, 'career transition', trendingContext);
      await addToQueue('twitter', type, 'scheduled_post', content as unknown as Record<string, unknown>);
    }
    console.log('[Scheduled] Queued 3 Twitter posts.');
  } catch (err) {
    console.error('[Scheduled] Twitter content failed:', err);
  }
});

// ── Schedule: Sunday at 8am — Reddit responses ──
cron.schedule('0 8 * * 0', async () => {
  console.log('[Scheduled] Generating Reddit responses...');
  try {
    const subreddits = ['careerchange', 'careerguidance', 'findapath'];
    const posts = await fetchTopRedditPosts(subreddits);

    for (const post of posts) {
      if (!post.title || post.title.includes('Placeholder')) continue;
      const response = await generateRedditResponse(
        post.subreddit,
        post.title,
        post.body,
        post.topComments,
      );
      await addToQueue('reddit', 'reddit_response', 'weekly_outreach', response as unknown as Record<string, unknown>);
    }
    console.log('[Scheduled] Queued Reddit responses.');
  } catch (err) {
    console.error('[Scheduled] Reddit responses failed:', err);
  }
});

// ── Schedule: Monthly 1st at 6am — Newsletter ──
cron.schedule('0 6 1 * *', async () => {
  console.log('[Scheduled] Generating monthly newsletter...');
  try {
    const { data: subscribers, error } = await supabase
      .from('users')
      .select('name, current_role, target_direction, sprint_day, plan_type, last_active_at')
      .eq('newsletter_subscribed', true);

    if (error || !subscribers) {
      console.error('Failed to fetch subscribers:', error?.message);
      return;
    }

    // Generate a single newsletter template
    const userContext: UserContext = {
      name: 'Subscriber',
      currentRole: 'various',
      targetDirection: 'various',
      sprintDay: 0,
      planType: 'explorer',
      daysSinceLastActive: 0,
    };

    const newsletter = await generateEmail('sprint_complete', userContext, 1);
    await addToQueue('email', 'newsletter', 'monthly_newsletter', {
      ...newsletter,
      recipientCount: subscribers.length,
    } as unknown as Record<string, unknown>);

    console.log(`[Scheduled] Queued monthly newsletter for ${subscribers.length} subscribers.`);
  } catch (err) {
    console.error('[Scheduled] Monthly newsletter failed:', err);
  }
});

export function startScheduledJobs() {
  console.log('[Triggers] Scheduled jobs started.');
  console.log('  - Daily 7am: Sprint reminder notifications');
  console.log('  - Monday 6am: Weekly TikTok scripts');
  console.log('  - Mon/Wed/Fri 9am: Twitter content');
  console.log('  - Sunday 8am: Reddit responses');
  console.log('  - Monthly 1st 6am: Newsletter');
}
