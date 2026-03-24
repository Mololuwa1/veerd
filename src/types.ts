// ── User context passed to generators ──
export interface UserContext {
  name: string;
  currentRole: string;
  targetDirection: string;
  sprintDay: number;
  planType: 'explorer' | 'pathfinder' | 'accelerator';
  daysSinceLastActive: number;
}

// ── Email types ──
export type EmailTriggerType =
  | 'intake_incomplete'
  | 'sprint_day_3'
  | 'sprint_day_7'
  | 'sprint_day_15'
  | 'sprint_day_28'
  | 'sprint_complete'
  | 'upgrade_prompt'
  | 'renewal_reminder'
  | 'cancellation_day_1'
  | 'cancellation_day_7'
  | 'win_back_day_30';

export interface GeneratedEmail {
  subject: string;
  previewText: string;
  body: string;
  triggerType: EmailTriggerType;
}

// ── Push notification types ──
export type PushTriggerType =
  | 'daily_sprint_reminder'
  | 'twin_match_confirmed'
  | 'call_reminder_2hrs'
  | 'sprint_streak_broken'
  | 'subscription_renewed'
  | 'twin_call_available';

export interface GeneratedPushNotification {
  title: string;
  body: string;
  triggerType: PushTriggerType;
}

// ── Reddit types ──
export interface GeneratedRedditResponse {
  responseBody: string;
  mentionsVeerd: boolean;
}

// ── Twitter types ──
export type TwitterContentType = 'standalone' | 'thread' | 'reply';

export interface GeneratedTwitterContent {
  contentType: TwitterContentType;
  tweets: string[];
  topic: string;
}

// ── TikTok types ──
export type MarketingPhase = 'awareness' | 'launch' | 'growth';

export interface TikTokScript {
  hook: string;
  body: string[];
  cta: string;
  caption: string;
  hashtags: string[];
  suggestedSound: string;
  estimatedPerformance: 'low' | 'medium' | 'high';
}

// ── Repurposing types ──
export type Channel = 'tiktok' | 'linkedin' | 'email' | 'twitter' | 'push' | 'reddit';

export interface RepurposedContent {
  [channel: string]: string;
}

// ── Content queue types ──
export type QueueStatus = 'pending' | 'approved' | 'rejected' | 'posted';

export interface ContentQueueItem {
  id: string;
  channel: Channel;
  contentType: string;
  triggerType: string;
  generatedContent: Record<string, unknown>;
  status: QueueStatus;
  createdAt: string;
  approvedAt: string | null;
  postedAt: string | null;
  editHistory: Array<{ editedAt: string; previousContent: Record<string, unknown> }>;
}
