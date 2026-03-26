-- Veerd Supabase Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- 1. Email Subscribers (early access signups)
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'website',
  confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add index for quick email lookups
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers (email);

-- Enable Row Level Security
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the anon key (public signups)
CREATE POLICY "Allow public inserts" ON email_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Only allow reading via service role (not public)
CREATE POLICY "Deny public reads" ON email_subscribers
  FOR SELECT
  USING (false);


-- 2. Twin Applications
CREATE TABLE IF NOT EXISTS twin_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  current_role TEXT NOT NULL,
  previous_role TEXT NOT NULL,
  transition_year TEXT NOT NULL,
  quote TEXT NOT NULL,
  availability_tier TEXT NOT NULL,
  linkedin_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add index for status filtering
CREATE INDEX IF NOT EXISTS idx_twin_applications_status ON twin_applications (status);
CREATE INDEX IF NOT EXISTS idx_twin_applications_email ON twin_applications (email);

-- Enable Row Level Security
ALTER TABLE twin_applications ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the anon key (public applications)
CREATE POLICY "Allow public inserts" ON twin_applications
  FOR INSERT
  WITH CHECK (true);

-- Only allow reading via service role (not public)
CREATE POLICY "Deny public reads" ON twin_applications
  FOR SELECT
  USING (false);
