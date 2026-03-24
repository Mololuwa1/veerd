# Veerd Content Automation Engine

A Node.js/TypeScript backend that generates, schedules, and queues marketing content for human approval before posting. Built for Veerd — a career transition app.

## Architecture

```
src/
  config/          Brand voice, env, Supabase & Claude clients
  generators/      6 content generators (email, push, reddit, twitter, tiktok, repurposing)
  triggers/        Scheduled cron jobs + Supabase realtime event listeners
  dashboard/       Express API + vanilla JS frontend for content approval
  types.ts         Shared TypeScript types
  queue.ts         Queue helper (add, update, fetch from Supabase)
  index.ts         Main entry — starts triggers
supabase/
  schema.sql       Database schema for content_queue table
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.template .env
```

Fill in your `.env` file:

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API key from console.anthropic.com |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `RESEND_API_KEY` | Resend email API key |
| `REDDIT_CLIENT_ID` | Reddit app client ID |
| `REDDIT_CLIENT_SECRET` | Reddit app client secret |
| `TWITTER_API_KEY` | Twitter/X API key |
| `TWITTER_API_SECRET` | Twitter/X API secret |
| `TWITTER_ACCESS_TOKEN` | Twitter/X access token |
| `TWITTER_ACCESS_SECRET` | Twitter/X access secret |

### 3. Set up Supabase

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor to create the `content_queue` table.

### 4. Run

**Start the content engine** (triggers + generators):

```bash
npm run dev
```

**Start the dashboard** (API on :3000 + frontend on :3001):

```bash
npm run dashboard
```

Open `http://localhost:3001` in your browser to review and approve content.

## Content Generators

| Generator | File | What it produces |
|---|---|---|
| Email | `emailGenerator.ts` | Lifecycle emails (intake, sprint milestones, cancellation, win-back) |
| Push | `pushNotificationGenerator.ts` | Mobile push notifications (reminders, matches, streaks) |
| Reddit | `redditGenerator.ts` | Genuine helpful Reddit responses to career transition posts |
| Twitter | `twitterGenerator.ts` | Standalone tweets, threads, and replies |
| TikTok | `tiktokScriptGenerator.ts` | Weekly batches of 4 scripts with hooks, body, CTA, hashtags |
| Repurposing | `repurposingEngine.ts` | Cross-platform content adaptation |

## Trigger Schedule

| When | What |
|---|---|
| Daily 7am | Sprint reminder push notifications for inactive users |
| Monday 6am | 4 TikTok scripts for the week |
| Mon/Wed/Fri 9am | 3 Twitter posts based on trending topics |
| Sunday 8am | Reddit responses to top career transition posts |
| Monthly 1st 6am | Monthly newsletter |

Event-based triggers fire on Supabase realtime changes to `users` and `subscriptions` tables.

## Adding New Content Types

1. Create a new generator in `src/generators/` following the existing pattern:
   - Import `claude` and `MODEL` from `../config/claude`
   - Import `BRAND_SYSTEM_PROMPT` from `../config/brand`
   - Export an async function that calls the Claude API and returns structured JSON
   - Add the new type to `src/types.ts`

2. Add a trigger in `src/triggers/scheduled.ts` (cron) or `src/triggers/eventBased.ts` (realtime)

3. Call `addToQueue()` from `src/queue.ts` to route content through the approval dashboard

## Adding New Triggers

**Scheduled (cron):**
```typescript
// In src/triggers/scheduled.ts
cron.schedule('0 10 * * *', async () => {
  const content = await yourGenerator(...);
  await addToQueue('channel', 'type', 'trigger', content);
});
```

**Event-based (Supabase realtime):**
```typescript
// In src/triggers/eventBased.ts
supabase.channel('my-events')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'my_table' },
    async (payload) => {
      const content = await yourGenerator(...);
      await addToQueue('channel', 'type', 'trigger', content);
    }
  ).subscribe();
```

## Brand Voice

All content is generated through Claude with the Veerd brand voice enforced via system prompt. The brand guidelines are defined in `src/config/brand.ts` and automatically applied to every generator. To update the voice, edit that single file.
