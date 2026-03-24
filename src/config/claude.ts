import Anthropic from '@anthropic-ai/sdk';
import { env } from './env';

export const claude = new Anthropic({ apiKey: env.anthropic.apiKey });

export const MODEL = 'claude-sonnet-4-20250514';
