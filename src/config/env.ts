import 'dotenv/config';

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

function optional(key: string): string | undefined {
  return process.env[key];
}

export const env = {
  anthropic: {
    apiKey: required('ANTHROPIC_API_KEY'),
  },
  supabase: {
    url: required('SUPABASE_URL'),
    anonKey: required('SUPABASE_ANON_KEY'),
  },
  resend: {
    apiKey: required('RESEND_API_KEY'),
  },
  reddit: {
    clientId: optional('REDDIT_CLIENT_ID') ?? '',
    clientSecret: optional('REDDIT_CLIENT_SECRET') ?? '',
  },
  twitter: {
    apiKey: optional('TWITTER_API_KEY') ?? '',
    apiSecret: optional('TWITTER_API_SECRET') ?? '',
    accessToken: optional('TWITTER_ACCESS_TOKEN') ?? '',
    accessSecret: optional('TWITTER_ACCESS_SECRET') ?? '',
  },
} as const;
