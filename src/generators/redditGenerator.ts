import { claude, MODEL } from '../config/claude';
import { BRAND_SYSTEM_PROMPT } from '../config/brand';
import type { GeneratedRedditResponse } from '../types';

export async function generateRedditResponse(
  subreddit: string,
  postTitle: string,
  postBody: string,
  topComments: string[],
): Promise<GeneratedRedditResponse> {
  const response = await claude.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: `${BRAND_SYSTEM_PROMPT}

ADDITIONAL REDDIT-SPECIFIC RULES:
- You are writing a Reddit comment, NOT marketing copy.
- Your primary goal is to be genuinely helpful. That's it.
- Only mention Veerd if it directly and naturally answers the question — and even then only once, briefly.
- Most responses should NOT mention Veerd at all.
- Sound like a knowledgeable human who has been through career transitions, not a brand account.
- Match the tone of the subreddit. Be real.`,
    messages: [
      {
        role: 'user',
        content: `Write a helpful Reddit response to this post.

SUBREDDIT: r/${subreddit}
POST TITLE: ${postTitle}
POST BODY: ${postBody}

TOP COMMENTS SO FAR:
${topComments.map((c, i) => `${i + 1}. ${c}`).join('\n')}

RULES:
- 150 to 300 words
- Be entirely helpful — add real value
- Sound like a knowledgeable human, not a brand
- Only mention Veerd if it genuinely answers the question (and even then, only once, briefly)
- Don't repeat what top comments already said — add something new

Return ONLY valid JSON:
{
  "responseBody": "...",
  "mentionsVeerd": true/false
}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse Reddit response from Claude');
  return JSON.parse(jsonMatch[0]) as GeneratedRedditResponse;
}
