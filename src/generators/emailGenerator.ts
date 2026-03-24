import { claude, MODEL } from '../config/claude';
import { BRAND_SYSTEM_PROMPT } from '../config/brand';
import type { UserContext, EmailTriggerType, GeneratedEmail } from '../types';

const TRIGGER_DESCRIPTIONS: Record<EmailTriggerType, string> = {
  intake_incomplete:
    'User started sign-up but didn\'t finish. They were curious enough to try — something held them back.',
  sprint_day_3:
    'User is on day 3 of their Sprint. The novelty is wearing off. They need a reason to keep going.',
  sprint_day_7:
    'One week in. This is where most people quit. Acknowledge how hard change is.',
  sprint_day_15:
    'Halfway through. They\'ve built real momentum. Help them see how far they\'ve come.',
  sprint_day_28:
    'Almost done. The finish line is close. Make it feel real and worth completing.',
  sprint_complete:
    'They finished their Sprint. Celebrate genuinely — this is rare and meaningful.',
  upgrade_prompt:
    'Free plan user who\'s gotten value. Suggest upgrading only by showing what they\'re missing.',
  renewal_reminder:
    'Subscription renewing soon. Remind them of the value they\'ve gotten, not the price.',
  cancellation_day_1:
    'Just cancelled. Don\'t be desperate. Acknowledge their decision. Leave the door open.',
  cancellation_day_7:
    'A week after cancelling. One gentle check-in. Share something useful — no pitch.',
  win_back_day_30:
    'A month gone. If they\'ve moved on, respect that. If they\'re still stuck, offer a hand.',
};

export async function generateEmail(
  triggerType: EmailTriggerType,
  userContext: UserContext,
  sequencePosition: number,
): Promise<GeneratedEmail> {
  const response = await claude.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: BRAND_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Generate a marketing email for a Veerd user.

TRIGGER: ${triggerType}
CONTEXT: ${TRIGGER_DESCRIPTIONS[triggerType]}
SEQUENCE POSITION: ${sequencePosition} (how many emails this user has received in this sequence)

USER DETAILS:
- Name: ${userContext.name}
- Current role: ${userContext.currentRole}
- Considering moving toward: ${userContext.targetDirection}
- Sprint day: ${userContext.sprintDay}
- Plan: ${userContext.planType}
- Days since last active: ${userContext.daysSinceLastActive}

RULES:
- Subject line: under 50 characters
- Preview text: under 100 characters
- Body: under 300 words
- Must feel personal — reference their specific situation
- Never generic. Never "Dear valued user."
- If this is a re-engagement email, don't guilt-trip. Be warm.

Return ONLY valid JSON:
{
  "subject": "...",
  "previewText": "...",
  "body": "...",
  "triggerType": "${triggerType}"
}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse email response from Claude');
  return JSON.parse(jsonMatch[0]) as GeneratedEmail;
}
