import { claude, MODEL } from '../config/claude';
import { BRAND_SYSTEM_PROMPT } from '../config/brand';
import type { UserContext, PushTriggerType, GeneratedPushNotification } from '../types';

const TRIGGER_DESCRIPTIONS: Record<PushTriggerType, string> = {
  daily_sprint_reminder:
    'Gentle daily nudge to complete today\'s Sprint activity. Should feel like a friend checking in, not an alarm.',
  twin_match_confirmed:
    'A Solar Twin match has been found — someone who made the exact transition this user is considering. This is exciting.',
  call_reminder_2hrs:
    'Their call with a Twin is in 2 hours. Help them feel prepared, not nervous.',
  sprint_streak_broken:
    'They missed a day. Don\'t guilt-trip. Acknowledge life gets busy. Invite them back gently.',
  subscription_renewed:
    'Their subscription just renewed. A quick thank-you. Make them feel good about staying.',
  twin_call_available:
    'A new Twin call slot has opened up. Create gentle urgency — slots fill up.',
};

export async function generatePushNotification(
  triggerType: PushTriggerType,
  userContext: UserContext,
): Promise<GeneratedPushNotification> {
  const response = await claude.messages.create({
    model: MODEL,
    max_tokens: 256,
    system: BRAND_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Generate a mobile push notification for a Veerd user.

TRIGGER: ${triggerType}
CONTEXT: ${TRIGGER_DESCRIPTIONS[triggerType]}

USER DETAILS:
- Name: ${userContext.name}
- Current role: ${userContext.currentRole}
- Considering: ${userContext.targetDirection}
- Sprint day: ${userContext.sprintDay}
- Plan: ${userContext.planType}

RULES:
- Title: under 50 characters
- Body: under 100 characters
- Must be specific to this user's situation
- Create urgency without being pushy
- Warm and human, never robotic

Return ONLY valid JSON:
{
  "title": "...",
  "body": "...",
  "triggerType": "${triggerType}"
}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse push notification response from Claude');
  return JSON.parse(jsonMatch[0]) as GeneratedPushNotification;
}
