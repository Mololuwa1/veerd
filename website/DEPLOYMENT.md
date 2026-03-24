# Veerd Website Deployment Guide

## Prerequisites

- A Vercel account
- A Supabase project
- A Resend account
- Access to the veerd.co domain DNS settings

## Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. Import the repository containing the `website/` directory
4. Set the **Root Directory** to `website`
5. Vercel will auto-detect Next.js — confirm the framework preset
6. Click **Deploy**

## Step 2: Add Environment Variables

In the Vercel dashboard for your project, go to **Settings > Environment Variables** and add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g. `https://xxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `RESEND_API_KEY` | Your Resend API key |
| `NEXT_PUBLIC_SITE_URL` | `https://veerd.co` |
| `GTM_ID` | Your Google Tag Manager container ID (e.g. `GTM-XXXXXXX`) |

## Step 3: Connect the Custom Domain

1. In Vercel, go to **Settings > Domains**
2. Add `veerd.co`
3. Vercel will provide DNS records to add
4. In your domain registrar DNS settings, add:
   - An **A record** pointing to `76.76.21.21`
   - A **CNAME record** for `www` pointing to `cname.vercel-dns.com`
5. Wait for DNS propagation (usually 5–30 minutes)
6. Vercel will automatically provision an SSL certificate

## Step 4: Set Up Supabase

Create these tables in your Supabase project:

### email_subscribers

```sql
CREATE TABLE email_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  source text DEFAULT 'website',
  confirmed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

### twin_applications

```sql
CREATE TABLE twin_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  current_role text NOT NULL,
  previous_role text NOT NULL,
  transition_year text NOT NULL,
  quote text NOT NULL,
  availability_tier text NOT NULL,
  linkedin_url text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
```

## Step 5: Set Up Resend

1. Go to [resend.com](https://resend.com) and sign in
2. Add and verify the domain `veerd.co` in **Domains**
3. Create an API key and add it to Vercel environment variables
4. The from address `hello@veerd.co` must be on a verified domain

## Step 6: Verify

1. Visit `https://veerd.co` and confirm the site loads
2. Test the email capture form — check Supabase for the new row
3. Test the Twin application form — check Supabase and your email
4. Check all navigation links work
5. Run a Lighthouse audit and confirm performance score above 90
6. Verify the sitemap at `https://veerd.co/sitemap.xml`
7. Verify robots.txt at `https://veerd.co/robots.txt`
