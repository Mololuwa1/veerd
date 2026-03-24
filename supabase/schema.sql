-- Veerd Content Automation — Supabase Schema
-- Run this in your Supabase SQL editor to create the required tables.

-- ── Content Queue ──
CREATE TABLE IF NOT EXISTS content_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel TEXT NOT NULL CHECK (channel IN ('email', 'push', 'reddit', 'twitter', 'tiktok')),
  content_type TEXT NOT NULL,
  trigger_type TEXT NOT NULL,
  generated_content JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'posted')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at TIMESTAMPTZ,
  posted_at TIMESTAMPTZ,
  edit_history JSONB NOT NULL DEFAULT '[]'
);

-- Index for dashboard queries
CREATE INDEX IF NOT EXISTS idx_content_queue_status ON content_queue(status);
CREATE INDEX IF NOT EXISTS idx_content_queue_channel ON content_queue(channel);
CREATE INDEX IF NOT EXISTS idx_content_queue_created ON content_queue(created_at DESC);

-- Enable realtime for content_queue
ALTER PUBLICATION supabase_realtime ADD TABLE content_queue;
