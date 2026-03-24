import { claude, MODEL } from '../config/claude';
import { BRAND_SYSTEM_PROMPT } from '../config/brand';
import type { TwitterContentType, GeneratedTwitterContent } from '../types';

export async function generateTwitterContent(
  contentType: TwitterContentType,
  topic: string,
  trendingContext: string,
): Promise<GeneratedTwitterContent> {
  const formatInstructions: Record<TwitterContentType, string> = {
    standalone: `Generate a single tweet under 280 characters. It should be a standalone insight about career transition that adds genuine value. Not promotional — just a smart, human observation.`,
    thread: `Generate a Twitter thread of exactly 5 tweets. Each tweet must be under 280 characters. The thread should tell a coherent story or build an argument about career transition. First tweet must hook the reader. Last tweet should invite discussion. Never use "Thread 🧵" or similar.`,
    reply: `Generate a reply tweet under 280 characters. It should be a thoughtful response that adds to the career transition conversation. Genuine and helpful, never promotional.`,
  };

  const response = await claude.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: `${BRAND_SYSTEM_PROMPT}

TWITTER-SPECIFIC RULES:
- Every tweet must add genuine insight to the career transition conversation.
- Never overtly promotional. Never "Download our app!"
- Sound like a thoughtful person sharing real observations, not a brand.
- Use short sentences. Be punchy. Be real.
- No hashtags unless they add meaning.`,
    messages: [
      {
        role: 'user',
        content: `Generate Twitter content.

TYPE: ${contentType}
TOPIC: ${topic}
TRENDING CONTEXT: ${trendingContext}

${formatInstructions[contentType]}

Return ONLY valid JSON:
{
  "contentType": "${contentType}",
  "tweets": ["tweet1"${contentType === 'thread' ? ', "tweet2", "tweet3", "tweet4", "tweet5"' : ''}],
  "topic": "${topic}"
}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse Twitter response from Claude');
  return JSON.parse(jsonMatch[0]) as GeneratedTwitterContent;
}
