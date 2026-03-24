import { claude, MODEL } from '../config/claude';
import { BRAND_SYSTEM_PROMPT } from '../config/brand';
import type { MarketingPhase, TikTokScript } from '../types';

export async function generateTikTokScript(
  weeklyTheme: string,
  trendingTopics: string[],
  previousPerformingHooks: string[],
  marketingPhase: MarketingPhase,
): Promise<TikTokScript[]> {
  const phaseGuidance: Record<MarketingPhase, string> = {
    awareness:
      'Focus on relatable career-change content that earns trust. No selling. Build audience by naming pains people feel but don\'t say out loud.',
    launch:
      'Introduce Veerd naturally through stories. Show what a Twin call looks like, what the Sprint feels like. Let the product speak through real moments.',
    growth:
      'Lean into social proof and outcomes. Share real stories of transitions. Be bolder about the product while staying human.',
  };

  const response = await claude.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: `${BRAND_SYSTEM_PROMPT}

TIKTOK-SPECIFIC RULES:
- Hooks must stop the scroll in under 3 seconds.
- Body should be conversational, like talking to a friend.
- Never sound like an ad. Sound like someone sharing a real story or insight.
- CTAs should feel natural, not salesy.
- Captions should spark engagement — ask a question or make a bold claim.`,
    messages: [
      {
        role: 'user',
        content: `Generate 4 TikTok scripts for this week.

WEEKLY THEME: ${weeklyTheme}
MARKETING PHASE: ${marketingPhase}
PHASE GUIDANCE: ${phaseGuidance[marketingPhase]}

TRENDING TOPICS TO CONSIDER:
${trendingTopics.map((t) => `- ${t}`).join('\n')}

HOOKS THAT PERFORMED WELL BEFORE:
${previousPerformingHooks.map((h) => `- "${h}"`).join('\n')}

FOR EACH SCRIPT INCLUDE:
- hook: attention-grabbing first line, under 15 words
- body: 5-8 bullet points, each one sentence
- cta: call to action, under 10 words
- caption: under 150 characters
- hashtags: 5-8 relevant hashtags
- suggestedSound: description of a suitable sound/music
- estimatedPerformance: "low", "medium", or "high"

Return ONLY a valid JSON array of exactly 4 script objects:
[
  {
    "hook": "...",
    "body": ["point 1", "point 2", ...],
    "cta": "...",
    "caption": "...",
    "hashtags": ["#tag1", "#tag2", ...],
    "suggestedSound": "...",
    "estimatedPerformance": "low|medium|high"
  },
  ...
]`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Failed to parse TikTok scripts response from Claude');
  return JSON.parse(jsonMatch[0]) as TikTokScript[];
}
