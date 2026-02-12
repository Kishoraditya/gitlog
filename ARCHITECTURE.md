# GitLog AI Architecture Documentation

## 🏗️ Overview

GitLog AI is a Next.js application that leverages Large Language Models (LLMs) to analyze Git commit history and generate structured, professional changelogs. It is designed as a Micro SaaS with a focus on developer experience (DX), automation, and community-driven features.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (hosted on [Supabase](https://supabase.com/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (GitHub Provider)
- **AI/LLM**: [OpenRouter](https://openrouter.ai/) (supporting models like DeepSeek, Llama, Claude, GPT-4)
- **State Management**: React Context + Hooks
- **Analytics**: [PostHog](https://posthog.com/) + Google Analytics 4
- **Feature Flags**: [GrowthBook](https://www.growthbook.io/)
- **Monitoring**: [Sentry](https://sentry.io/) + Vercel Analytics

## 📂 Directory Structure

```
src/
├── app/                  # App Router pages and layouts
│   ├── (auth)/           # Authentication routes (login)
│   ├── (dashboard)/      # Protected dashboard routes
│   ├── api/              # API Routes (Next.js handlers)
│   ├── admin/            # Admin dashboard
│   ├── docs/             # Documentation pages
│   └── layout.tsx        # Root layout with providers
├── components/           # React components
│   ├── ui/               # Reusable UI components (buttons, cards)
│   ├── layout/           # Layout components (Header, Footer, Sidebar)
│   ├── admin/            # Admin-specific components
│   └── TipJar.tsx        # Tipping widget logic
├── lib/                  # Utility functions and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Database client instance
│   ├── llm.ts            # LLM interaction logic
│   ├── github.ts         # GitHub API helpers
│   └── utils.ts          # General utilities
└── types/                # TypeScript type definitions
```

## 🔄 Data Flow

1.  **User Authentication**: Users sign in via GitHub OAuth (`next-auth`).
2.  **Repo Connection**: The app fetches the user's repositories using the GitHub API.
3.  **Commit Analysis**:
    -   When a user requests a changelog, the app fetches recent commits.
    -   It parses commit messages (Conventional Commits).
    -   If messages are vague (e.g., "fix bug"), it fetches the *code diff* for deep inspection.
4.  **AI Generation**:
    -   Parsed commits + diff summaries are sent to the LLM via OpenRouter.
    -   The LLM generates a changelog based on the requested format (Keep a Changelog, Release Notes, etc.).
5.  **Storage**: Generated changelogs can be saved (cached) in the database via Prisma.

## 🧠 Key Components

### LLM Interface (`src/lib/llm.ts`)
Handles interactions with AI models. It includes logic for:
-   **Prompt Engineering**: Constructing context-aware prompts.
-   **Model Selection**: Choosing optimized models for speed vs. quality.
-   **Diff Analysis**: Using AI to summarize code changes when commit messages are poor.

### Changelog Generator (`src/app/api/generate/route.ts`)
The core API endpoint that orchestrates the generation process. It connects GitHub data fetching with the LLM service.

### Admin Dashboard (`src/app/admin/page.tsx`)
Restricted area for managing users, viewing analytics, and handling feature flags.

### Floating Tip Jar (`src/components/FloatingTipJar.tsx`)
A portal-based widget that allows users to support the project via Razorpay, visible only when logged in.

## 🚀 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com) with zero configuration. It utilizes Vercel functions for API routes and edge caching for static assets.
