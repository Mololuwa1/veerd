import { claude, MODEL } from '../config/claude';
import { BRAND_SYSTEM_PROMPT } from '../config/brand';
import type { Channel, RepurposedContent } from '../types';

const CHANNEL_FORMATS: Record<string, string> = {
  tiktok:
    'TikTok script format: hook (under 15 words), body (5-8 bullet points), cta (under 10 words), caption (under 150 chars), hashtags (5-8).',
  twitter:
    'Single tweet under 280 characters. Punchy, insightful, conversational. No hashtags unless they add meaning.',
  linkedin:
    'LinkedIn post: 150-300 words. Professional but warm. Use line breaks for readability. End with a question to drive engagement.',
  email:
    'Email format: subject (under 50 chars), preview text (under 100 chars), body (under 300 words). Personal and direct.',
  push:
    'Push notification: title (under 50 chars), body (under 100 chars). Urgent but not pushy.',
  reddit:
    'Reddit comment: 150-300 words. Genuine, helpful, sounds like a real person sharing experience. No promotional language.',
};

export async function repurposeContent(
  sourceContent: string,
  sourceChannel: Channel,
  targetChannels: Channel[],
): Promise<RepurposedContent> {
  const response = await claude.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: `${BRAND_SYSTEM_PROMPT}

REPURPOSING RULES:
- Never copy content directly from source — reimagine it for each platform.
- Each platform has its own culture and format. Respect that.
- The core insight should carry over, but the expression must change completely.
- Match the native tone of each target platform.`,
    messages: [
      {
        role: 'user',
        content: `Repurpose the following content for different platforms.

SOURCE CHANNEL: ${sourceChannel}
SOURCE CONTENT:
${sourceContent}

TARGET CHANNELS AND FORMATS:
${targetChannels.map((ch) => `- ${ch}: ${CHANNEL_FORMATS[ch] || 'Appropriate format for this channel.'}`).join('\n')}

For each target channel, reimagine the content — don't just reformat it. The core idea should transfer but the expression must feel native to each platform.

Return ONLY valid JSON with a key for each target channel:
{
  ${targetChannels.map((ch) => `"${ch}": "repurposed content here"`).join(',\n  ')}
}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse repurposed content from Claude');
  return JSON.parse(jsonMatch[0]) as RepurposedContent;
}
