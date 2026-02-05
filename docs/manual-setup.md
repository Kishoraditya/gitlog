# Manual Setup Guide

This document lists all the manual steps required to fully configure GitLog AI for production.

---

## 1. Environment Variables

Add these to your `.env` file (copy from `.env.example`):

### Required
```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/gitlog"
DIRECT_URL="postgresql://user:password@host:5432/gitlog"

# Auth
NEXTAUTH_SECRET="your-32-character-random-string"
NEXTAUTH_URL="https://gitlog.ai"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-oauth-app-client-id"
GITHUB_CLIENT_SECRET="your-github-oauth-app-secret"

# LLM (OpenRouter)
OPENROUTER_API_KEY="sk-or-v1-xxxx"
```

### Optional (for full features)
```bash
# Supabase (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxx"

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_xxxxxxxxxxxx"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Feature Flags
NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY="sdk-xxxxxxxxxxxx"
```

---

## 2. GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: GitLog AI
   - **Homepage URL**: `https://gitlog.ai`
   - **Authorization callback URL**: `https://gitlog.ai/api/auth/callback/github`
4. Click "Register application"
5. Copy **Client ID** → `GITHUB_CLIENT_ID`
6. Generate a client secret → `GITHUB_CLIENT_SECRET`

---

## 3. PostHog Analytics

1. Go to [PostHog](https://posthog.com) and sign up (free tier: 1M events/month)
2. Create a new project
3. Go to **Project Settings → Project API Key**
4. Copy the key → `NEXT_PUBLIC_POSTHOG_KEY`

---

## 4. Google Analytics

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property
3. Go to **Admin → Data Streams → Add Stream → Web**
4. Enter your domain and create
5. Copy the **Measurement ID** (G-XXXXXXXXXX) → `NEXT_PUBLIC_GA_ID`

---

## 5. GrowthBook Feature Flags

1. Go to [GrowthBook](https://growthbook.io) and sign up (free tier)
2. Create a new project
3. Go to **SDK Connections → Create New**
4. Select "JavaScript/React"
5. Copy the **Client Key** → `NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY`
6. Create feature flags:
   - `mcp_enabled` (boolean, default: true)
   - `multilingual` (boolean, default: true)
   - `api_v2` (boolean, default: false)
   - `deep_inspection` (boolean, default: true)

---

## 6. Database Setup (Supabase)

1. Go to [Supabase](https://supabase.com) and create a project
2. Go to **Settings → API**
3. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
4. Copy **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Run Prisma migrations:
   ```bash
   npx prisma migrate deploy
   ```

---

## 7. Supabase Row-Level Security (RLS)

Run these SQL commands in the Supabase SQL Editor:

```sql
-- Enable RLS on tables
ALTER TABLE "Repository" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Changelog" ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own repositories
CREATE POLICY "Users see own repos" ON "Repository"
  FOR SELECT USING (
    "userId" = auth.uid()
  );

-- Policy: Users can only see their own changelogs
CREATE POLICY "Users see own changelogs" ON "Changelog"
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM "Repository" r
      WHERE r.id = "repositoryId"
      AND r."userId" = auth.uid()
    )
  );

-- Policy: Users can insert changelogs for their repos
CREATE POLICY "Users insert own changelogs" ON "Changelog"
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM "Repository" r
      WHERE r.id = "repositoryId"
      AND r."userId" = auth.uid()
    )
  );
```

---

## 8. OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai) and sign up
2. Go to **Keys → Create Key**
3. Copy the key → `OPENROUTER_API_KEY`

---

## 9. Vercel Deployment

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com) and import repo
3. Add environment variables:
   - All variables from `.env`
4. Deploy
5. Update GitHub OAuth callback URL to match Vercel URL

---

## 10. Post-Deployment Checklist

- [ ] Verify GitHub OAuth login works
- [ ] Test changelog generation on a real repo
- [ ] Check PostHog receives events
- [ ] Verify rate limiting works (`X-RateLimit-Remaining` header)
- [ ] Test MCP endpoint with cURL
- [ ] Check feature flags toggle correctly
- [ ] Run `npm audit` and fix vulnerabilities

---

## 11. Security Audit

Run these commands before launch:

```bash
# Check for vulnerabilities
npm audit

# Fix auto-fixable issues
npm audit fix

# Manual review for critical issues
npm audit --audit-level=critical
```

---

## 12. Tip Platform Setup (Optional)

Choose one or more:

### Buy Me a Coffee
1. Go to [buymeacoffee.com](https://www.buymeacoffee.com)
2. Create account
3. Copy your profile URL

### Ko-fi
1. Go to [ko-fi.com](https://ko-fi.com)
2. Create account
3. Copy your profile URL

### UPI (India)
1. Create a UPI ID with any bank app
2. Note your UPI ID (e.g., `username@upi`)

Update `TipJar.tsx` with your actual payment links.

---

## Summary

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| PostHog | Analytics | 1M events/month |
| Google Analytics | Analytics | Unlimited |
| GrowthBook | Feature Flags | Unlimited |
| OpenRouter | LLM API | Pay-per-use |
| Supabase | Database | 500MB, 2GB bandwidth |
| Vercel | Hosting | 100GB bandwidth |
