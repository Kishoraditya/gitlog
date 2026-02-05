# Complete Build Plan: GitLog AI (Commit → Changelog Generator)

## Executive Summary


**Total Cost to Launch**: ~$0-20/month initially
**Target MRR (India-focused)**: ₹50K-2L/month ($600-2,400) within 6 months

---

## 1. Tech Stack (100% Open Source Friendly)

```
┌─────────────────────────────────────────────────────────────────┐
│                        ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐   │
│   │   Next.js    │────│   Railway    │────│  PostgreSQL  │   │
│   │   14 (App)   │     │   Hosting    │     │   (Railway)  │   │
│   └──────────────┘     └──────────────┘     └──────────────┘   │
│          │                                          │           │
│          ▼                                          │           │
│   ┌──────────────┐     ┌──────────────┐            │           │
│   │   NextAuth   │────│GitHub OAuth  │            │           │
│   │   (Auth)     │     │   + API      │            │           │
│   └──────────────┘     └──────────────┘            │           │
│          │                                          │           │
│          ▼                                          │           │
│   ┌──────────────┐     ┌──────────────┐            │           │
│   │   Groq API   │ OR  │   Ollama +   │───────────┘           │
│   │ (Free Llama) │     │   Llama 3.1  │                        │
│   └──────────────┘     └──────────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Stack Breakdown

| Layer | Choice | Why | Cost |
|-------|--------|-----|------|
| **Framework** | Next.js 14 (App Router) | Full-stack, API routes, SSR, great DX | Free |
| **Database** | PostgreSQL | Railway native, robust, free tier | $0-5/mo |
| **ORM** | Prisma | Type-safe, migrations, great DX | Free |
| **Auth** | NextAuth.js v5 | GitHub OAuth built-in, open source | Free |
| **LLM** | Groq (Llama 3.1 70B) | FREE tier: 30 req/min, blazing fast | Free |
| **LLM Backup** | OpenRouter / Together.ai | Pay-per-token, cheap Llama/Mistral | ~$0.0002/1K |
| **GitHub** | Octokit | Official SDK, well-maintained | Free |
| **UI** | Tailwind + shadcn/ui | Copy-paste components, no lock-in | Free |
| **Payments** | Razorpay (India) + LemonSqueezy (Global) | UPI support, easy integration | 2% fee |
| **Email** | Resend (or Nodemailer) | 3K free/month | Free |
| **Deploy** | Railway | Simple, predictable pricing | $5/mo |

---

## 2. MVP Feature Set 

### Core Features (Must Have)

```
 Phase 1
├── GitHub OAuth Login
├── Repository Connection (public + private)
├── Commit Fetching (by date range / tag range / branch)
├── AI Changelog Generation (3 formats)
│   ├── Keep a Changelog format
│   ├── GitHub Release style
│   └── Simple bullet points
├── Markdown Export / Copy
└── Basic Dashboard

 Phase 2
├── Semantic Version Suggestion
├── PR-based changelog (with descriptions)
├── Custom Templates
├── Conventional Commits Detection
└── Razorpay Payment Integration
```

### Deferred Features (Post-Launch)

```
 Phase 3
├── GitHub App (auto-generate on release)
├── Webhook triggers
├── Slack/Discord notifications
├── Team workspaces
└── API access
```

---

## 3. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  githubId      String    @unique
  accessToken   String    // encrypted
  
  plan          Plan      @default(FREE)
  repoLimit     Int       @default(2)
  
  repositories  Repository[]
  changelogs    Changelog[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Repository {
  id            String    @id @default(cuid())
  githubId      Int
  name          String
  fullName      String    // owner/repo
  private       Boolean
  defaultBranch String
  
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  changelogs    Changelog[]
  
  createdAt     DateTime  @default(now())
}

model Changelog {
  id            String    @id @default(cuid())
  title         String
  version       String?
  content       String    @db.Text
  format        Format    @default(KEEPACHANGELOG)
  
  fromRef       String    // commit SHA or tag
  toRef         String
  commitCount   Int
  
  repositoryId  String
  repository    Repository @relation(fields: [repositoryId], references: [id])
  
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  createdAt     DateTime  @default(now())
}

model Subscription {
  id            String    @id @default(cuid())
  userId        String    @unique
  razorpayId    String?
  lemonsqueezyId String?
  
  plan          Plan
  status        SubStatus
  
  currentPeriodEnd DateTime
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Plan {
  FREE
  PRO
  TEAM
}

enum Format {
  KEEPACHANGELOG
  GITHUB_RELEASE
  SIMPLE
  CUSTOM
}

enum SubStatus {
  ACTIVE
  CANCELLED
  PAST_DUE
}
```

---

## 4. Core Implementation

### Project Structure

```
gitlog-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── callback/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── repos/page.tsx
│   │   ├── generate/page.tsx
│   │   └── history/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── repos/route.ts
│   │   ├── commits/route.ts
│   │   ├── generate/route.ts
│   │   └── webhooks/
│   │       └── razorpay/route.ts
│   ├── layout.tsx
│   └── page.tsx (landing)
├── components/
│   ├── ui/ (shadcn)
│   ├── RepoSelector.tsx
│   ├── CommitRangePicker.tsx
│   ├── ChangelogPreview.tsx
│   └── TemplateSelector.tsx
├── lib/
│   ├── auth.ts
│   ├── github.ts
│   ├── llm.ts
│   ├── prisma.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
└── package.json
```

### Key Code Files

#### `lib/github.ts` - GitHub Integration

```typescript
import { Octokit } from "@octokit/rest";

export function createOctokit(accessToken: string) {
  return new Octokit({ auth: accessToken });
}

export async function getRepositories(accessToken: string) {
  const octokit = createOctokit(accessToken);
  const { data } = await octokit.repos.listForAuthenticatedUser({
    sort: "updated",
    per_page: 100,
  });
  return data;
}

export async function getCommits(
  accessToken: string,
  owner: string,
  repo: string,
  options: {
    since?: string;
    until?: string;
    sha?: string;
  }
) {
  const octokit = createOctokit(accessToken);
  const { data } = await octokit.repos.listCommits({
    owner,
    repo,
    ...options,
    per_page: 100,
  });
  return data;
}

export async function getCommitsBetweenRefs(
  accessToken: string,
  owner: string,
  repo: string,
  base: string,
  head: string
) {
  const octokit = createOctokit(accessToken);
  const { data } = await octokit.repos.compareCommits({
    owner,
    repo,
    base,
    head,
  });
  return data.commits;
}

export async function getPullRequests(
  accessToken: string,
  owner: string,
  repo: string,
  state: "open" | "closed" | "all" = "closed"
) {
  const octokit = createOctokit(accessToken);
  const { data } = await octokit.pulls.list({
    owner,
    repo,
    state,
    sort: "updated",
    direction: "desc",
    per_page: 50,
  });
  return data;
}

export async function getTags(
  accessToken: string,
  owner: string,
  repo: string
) {
  const octokit = createOctokit(accessToken);
  const { data } = await octokit.repos.listTags({
    owner,
    repo,
    per_page: 20,
  });
  return data;
}
```

#### `lib/llm.ts` - AI Changelog Generation

```typescript
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

interface GenerateOptions {
  commits: Commit[];
  format: "keepachangelog" | "github_release" | "simple";
  repoName: string;
  version?: string;
  includeAuthors?: boolean;
}

const FORMAT_PROMPTS = {
  keepachangelog: `Generate a changelog following the Keep a Changelog format (https://keepachangelog.com).
Categorize changes into: Added, Changed, Deprecated, Removed, Fixed, Security.
Use this structure:
## [Version] - Date
### Added
- New features

### Changed
- Changes in existing functionality

### Fixed
- Bug fixes`,

  github_release: `Generate release notes suitable for GitHub Releases.
Use a friendly, concise tone. Include:
- A brief summary paragraph
- Highlights section for major changes
- Bullet points for all changes
- Contributors mention if applicable`,

  simple: `Generate a simple, clean bullet-point changelog.
Group related changes together.
Use clear, action-oriented language.
Format: - [type] Description`,
};

export async function generateChangelog(options: GenerateOptions): Promise<string> {
  const { commits, format, repoName, version } = options;

  // Prepare commit summary
  const commitSummary = commits
    .map((c) => `- ${c.commit.message.split("\n")[0]}`)
    .join("\n");

  const systemPrompt = `You are an expert technical writer specializing in software release documentation.
Your task is to transform raw git commits into polished, professional changelogs.

Rules:
1. Group related commits together
2. Use clear, user-friendly language (avoid commit jargon)
3. Highlight breaking changes prominently
4. Detect conventional commits (feat:, fix:, docs:, etc.) and categorize appropriately
5. Be concise but informative
6. Output in Markdown format`;

  const userPrompt = `Repository: ${repoName}
${version ? `Version: ${version}` : ""}
Date: ${new Date().toISOString().split("T")[0]}

Format Instructions:
${FORMAT_PROMPTS[format]}

Raw Commits (${commits.length} total):
${commitSummary}

Generate the changelog now:`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-70b-versatile", // Free on Groq!
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 2000,
  });

  return response.choices[0]?.message?.content || "";
}

export async function suggestVersion(
  commits: Commit[],
  currentVersion?: string
): Promise<{ suggested: string; reason: string }> {
  const commitMessages = commits.map((c) => c.commit.message).join("\n");

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", // Faster, cheaper for simple task
    messages: [
      {
        role: "system",
        content: `You are a semantic versioning expert. Analyze commits and suggest the next version.
MAJOR: Breaking changes (look for "BREAKING", "!", major refactors)
MINOR: New features (look for "feat:", "add", "new")
PATCH: Bug fixes and minor changes (look for "fix:", "patch", "update")

Respond in JSON: {"suggested": "x.y.z", "reason": "brief explanation"}`,
      },
      {
        role: "user",
        content: `Current version: ${currentVersion || "0.0.0"}
Commits:\n${commitMessages}`,
      },
    ],
    temperature: 0,
    max_tokens: 200,
  });

  try {
    return JSON.parse(response.choices[0]?.message?.content || "{}");
  } catch {
    return { suggested: "1.0.0", reason: "Could not parse commits" };
  }
}
```

#### `app/api/generate/route.ts` - API Endpoint

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCommitsBetweenRefs, getCommits } from "@/lib/github";
import { generateChangelog, suggestVersion } from "@/lib/llm";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { changelogs: true },
    });

    // Check limits for free users
    if (user?.plan === "FREE" && user.changelogs.length >= 10) {
      return NextResponse.json(
        { error: "Free tier limit reached. Please upgrade." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { repoFullName, fromRef, toRef, format, generateVersion } = body;

    const [owner, repo] = repoFullName.split("/");

    // Fetch commits
    let commits;
    if (fromRef && toRef) {
      commits = await getCommitsBetweenRefs(
        user!.accessToken,
        owner,
        repo,
        fromRef,
        toRef
      );
    } else {
      commits = await getCommits(user!.accessToken, owner, repo, {
        since: body.since,
        until: body.until,
      });
    }

    if (!commits.length) {
      return NextResponse.json(
        { error: "No commits found in the specified range" },
        { status: 400 }
      );
    }

    // Generate version suggestion if requested
    let version;
    if (generateVersion) {
      const versionResult = await suggestVersion(commits, body.currentVersion);
      version = versionResult.suggested;
    }

    // Generate changelog
    const content = await generateChangelog({
      commits,
      format,
      repoName: repoFullName,
      version,
    });

    // Save to database
    const changelog = await prisma.changelog.create({
      data: {
        title: `${repo} ${version || "Changelog"}`,
        version,
        content,
        format: format.toUpperCase(),
        fromRef: fromRef || body.since,
        toRef: toRef || body.until,
        commitCount: commits.length,
        userId: user!.id,
        repositoryId: body.repositoryId,
      },
    });

    return NextResponse.json({
      changelog,
      version,
      commitCount: commits.length,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate changelog" },
      { status: 500 }
    );
  }
}
```

#### Landing Page Component (`app/page.tsx`)

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Git Commits → Beautiful Changelogs
          <br />
          <span className="text-green-400">In Seconds</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Stop writing release notes manually. Connect your GitHub repo and let
          AI generate polished changelogs from your commits.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/login">
              <GitHubIcon className="mr-2 h-5 w-5" />
              Connect GitHub - Free
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#demo">See Demo</Link>
          </Button>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          ✓ Free for public repos &nbsp; ✓ No credit card required
        </p>
      </section>

      {/* Demo */}
      <section id="demo" className="container mx-auto px-4 py-16">
        <div className="bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-4">
                Raw Commits
              </h3>
              <pre className="bg-gray-900 p-4 rounded-lg text-sm text-gray-300 overflow-auto">
{`fix: resolve memory leak in worker
feat: add dark mode support
docs: update API documentation
fix(auth): handle expired tokens
feat: implement webhook notifications
chore: upgrade dependencies`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-4">
                Generated Changelog 
              </h3>
              <pre className="bg-gray-900 p-4 rounded-lg text-sm text-gray-300 overflow-auto">
{`## [1.2.0] - 2024-01-15

### Added
- Dark mode support for better UX
- Webhook notifications for events

### Fixed
- Memory leak in background worker
- Auth token expiration handling

### Documentation
- Updated API documentation`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Simple Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free */}
          <PricingCard
            title="Free"
            price="₹0"
            features={[
              "2 public repos",
              "10 changelogs/month",
              "3 formats",
              "Markdown export",
            ]}
            cta="Get Started"
            href="/login"
          />
          {/* Pro */}
          <PricingCard
            title="Pro"
            price="₹299"
            period="/month"
            features={[
              "Unlimited repos",
              "Unlimited changelogs",
              "Private repos",
              "Custom templates",
              "Version suggestions",
              "Priority support",
            ]}
            cta="Start Free Trial"
            href="/login?plan=pro"
            highlighted
          />
          {/* Team */}
          <PricingCard
            title="Team"
            price="₹999"
            period="/month"
            features={[
              "Everything in Pro",
              "5 team members",
              "GitHub App automation",
              "API access",
              "Slack integration",
            ]}
            cta="Contact Us"
            href="/contact"
          />
        </div>
      </section>
    </div>
  );
}
```

---

## 5. Railway Deployment

### `railway.json`

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "startCommand": "npx prisma migrate deploy && npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100
  }
}
```

### Environment Variables (Railway Dashboard)

```bash
# Database (auto-set by Railway PostgreSQL)
DATABASE_URL=

# Auth
NEXTAUTH_URL=https://your-app.railway.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# LLM
GROQ_API_KEY=

# Payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Optional
RESEND_API_KEY=
```

### Deployment Steps

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
railway init

# 4. Add PostgreSQL
railway add --database postgresql

# 5. Set environment variables
railway variables set NEXTAUTH_SECRET=$(openssl rand -base64 32)
# ... set other variables

# 6. Deploy
railway up

# 7. Get your URL
railway open
```

### Cost Breakdown (Railway)

| Resource | Free Tier | Paid Usage |
|----------|-----------|------------|
| Compute | 500 hrs/month | $0.000463/min |
| PostgreSQL | 1GB | $0.000231/GB/hr |
| **Estimated** | **$0/month** | **$5-10/month** |

---

## 6. Pricing Strategy (India-Focused)

### Pricing Tiers

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRICING FOR INDIA                          │
├──────────────┬─────────────┬──────────────┬───────────────────┤
│    FREE      │     PRO     │    TEAM      │    ENTERPRISE     │
├──────────────┼─────────────┼──────────────┼───────────────────┤
│    ₹0/mo     │   ₹299/mo   │   ₹999/mo    │    Custom         │
│              │   ($3.50)   │   ($12)      │                   │
├──────────────┼─────────────┼──────────────┼───────────────────┤
│ 2 pub repos  │ Unlimited   │ Everything + │ Self-hosted       │
│ 10 logs/mo   │ Private     │ 5 members    │ SLA               │
│ 3 formats    │ Templates   │ API access   │ Custom features   │
└──────────────┴─────────────┴──────────────┴───────────────────┘

Annual Discount: 2 months free (₹2,990/year for Pro)
```

### Razorpay Integration

```typescript
// lib/razorpay.ts
import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createSubscription(planId: string, customerId: string) {
  return razorpay.subscriptions.create({
    plan_id: planId,
    customer_id: customerId,
    quantity: 1,
    total_count: 12, // 12 months
    customer_notify: 1,
  });
}

// Plans to create in Razorpay Dashboard:
// - plan_pro_monthly: ₹299/month
// - plan_pro_yearly: ₹2990/year
// - plan_team_monthly: ₹999/month
```

---

## 7. Go-To-Market Strategy

### Pre-Launch

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRE-LAUNCH CHECKLIST                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ Create landing page with waitlist (use Tally.so - free)     │
│  □ Set up Twitter/X account, start posting dev content         │
│  □ Write 2-3 blog posts about changelog best practices         │
│  □ Create demo video (Loom - free)                             │
│  □ Prepare Product Hunt assets                                  │
│  □ Join Indian dev communities (Discord, Twitter)               │
│  □ Build in public - share progress daily                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Launch

| Day | Action |
|-----|--------|
| Mon | Soft launch to waitlist + close friends |
| Tue | Post on Twitter, Dev.to article |
| Wed | **Product Hunt launch** |
| Thu | Reddit posts (r/SideProject, r/webdev, r/IndieHackers) |
| Fri | Hacker News (Show HN) |
| Sat | Indian tech Twitter threads |
| Sun | Summarize launch, engage with feedback |

### Channels (India Focus)

```
HIGH PRIORITY:
├── Twitter/X Indian Tech Community
│   ├── Follow: @IndianDevs, @TheAnkurTyagi, @AskSingh
│   └── Hashtags: #BuildInPublic #IndieHacker #DevTools
├── LinkedIn (strong in India)
├── Dev.to / Hashnode
└── Hacker News

MEDIUM PRIORITY:
├── Reddit (r/developersIndia, r/india)
├── Discord servers (Reactiflux, Theo's server)
├── Indie Hackers
└── Product Hunt

FREE PROMOTION:
├── GitHub Readme badges
├── Open source the commit parser
├── Free forever for OS maintainers
└── Student/bootcamp discounts
```

### Content Marketing Calendar

```
Why Your Changelog Sucks (And How to Fix It)
Conventional Commits: The Complete Guide
Semantic Versioning Explained for Beginners
Automate Your Release Notes with AI
Case study with early user
Open Source Maintainer's Release Workflow
```

---

## 8. User Acquisition Strategy

### Target Users (India)

```
PRIMARY (Quick Wins):
├── Solo developers with side projects
├── Open source maintainers
├── Freelancers managing multiple client repos
└── Startup CTOs (early-stage)

SECONDARY (Growth):
├── Small dev teams (2-10 people)
├── Tech bootcamp graduates
└── Agency developers

EXPANSION:
├── Enterprise teams
├── DevRel teams
└── Documentation teams
```

### Acquisition Channels by Cost

| Channel | CAC | Expected Users/Month |
|---------|-----|---------------------|
| Product Hunt | $0 | 100-500 |
| Twitter/X organic | $0 | 50-200 |
| Dev.to/Hashnode | $0 | 30-100 |
| GitHub badge links | $0 | 20-50 |
| Word of mouth | $0 | 10-30 |
| LinkedIn posts | $0 | 20-40 |
| **Total Organic** | **$0** | **230-920** |

### Referral Program

```typescript
// Simple referral: Give ₹50, Get ₹50

// User refers friend
// Friend signs up for Pro → Referrer gets ₹50 credit
// New user gets ₹50 off first month

// Implementation: Add referralCode to User model
// Track in separate Referral table
```

---

## 9. Revenue Projections (Conservative)

### Month 1-6

```
Month 1 (Launch):
├── Users: 200 signups
├── Paid: 5 Pro (₹1,495)
└── MRR: ₹1,495

Month 3:
├── Users: 800 total
├── Paid: 25 Pro + 2 Team (₹9,473)
└── MRR: ₹9,473

Month 6:
├── Users: 2,000 total
├── Paid: 80 Pro + 8 Team (₹31,912)
└── MRR: ₹31,912

YEAR 1 TARGET:
├── Users: 5,000
├── Paid: 200 Pro + 20 Team
├── MRR: ₹79,780 (~$960/month)
└── ARR: ₹9.57L (~$11,500)
```

### Break-Even Analysis

```
Monthly Costs:
├── Railway: ₹850 ($10)
├── Groq: ₹0 (free tier sufficient initially)
├── Domain: ₹85/mo ($1)
├── Misc: ₹500
└── Total: ₹1,435/month

Break-even: 5 Pro users or 2 Team users
```

---

## 10. Complete Implementation Timeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    MVP                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Core Build                                             │
│  ├── Project setup, DB schema, Auth                   │
│  ├── GitHub integration, repo listing                 │
│  ├── Commit fetching, LLM integration                 │
│  └── Basic UI, changelog preview                        │
│                                                                 │
│  Polish & Payments                                      │
│  ├── Multiple formats, templates                      │
│  ├── Razorpay integration, pricing page             │
│  ├── Landing page, SEO                              │
│  └── Testing, bug fixes                                │
│                                                                 │
│  Launch                                                 │
│  ├── Deploy to Railway, final testing                  │
│  ├── Product Hunt prep, assets                      │
│  ├── Soft launch to waitlist                           │
│  ├── Product Hunt launch                               │
│  └── Community engagement, iterate                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 11. Quick Start Commands

```bash
# Create project
npx create-next-app@latest gitlog-ai --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd gitlog-ai

# Install dependencies
npm install @prisma/client @octokit/rest groq-sdk next-auth @auth/prisma-adapter
npm install razorpay resend
npm install -D prisma

# UI components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label select textarea dialog dropdown-menu

# Setup Prisma
npx prisma init
# Edit schema.prisma with the schema above
npx prisma generate
npx prisma db push

# Environment setup
cp .env.example .env.local
# Fill in your keys

# Run development
npm run dev
```

---

## 12. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Groq rate limits | Fallback to OpenRouter/Together.ai |
| GitHub API limits | Cache aggressively, use webhooks |
| Low initial traction | Focus on 1 community deeply |
| Competition | Speed + India pricing + build in public |
| LLM quality issues | Prompt engineering, user feedback loop |

---

## Summary

**Launch Cost**: $0-20/month
**Target MRR (6 months)**: ₹30-50K (~$400-600)
**Target MRR (12 months)**: ₹80K-1.5L (~$1,000-1,800)

**Why This Will Work**:
1. **Real pain point** - developers hate writing changelogs
2. **Clear monetization** - value is obvious, pricing is fair
3. **Low competition in India** - most tools price for US market
4. **Build in public** - instant marketing + feedback
5. **Open source core** - trust + SEO + contributions

Start building today. Ship fast. Iterate based on feedback. 

