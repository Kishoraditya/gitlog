# GitLog AI - Architecture Overview

## Tech Stack

| Layer         | Technology            | Purpose                     |
|---------------|-----------------------|-----------------------------|
| Frontend      | Next.js 14 (App Router) | SSR, Routing, API Routes  |
| Styling       | Tailwind CSS + shadcn/ui | Design System           |
| Auth          | NextAuth.js (JWT)     | GitHub OAuth                |
| Database      | Supabase (PostgreSQL) | User, Repo, Changelog data  |
| ORM           | Prisma                | Type-safe DB access         |
| AI            | OpenRouter (OpenAI SDK compatible) | LLM API           |
| VCS           | GitHub API (Octokit)  | Commits, Tags, Diffs        |

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/        # Authenticated routes
│   │   ├── generate/       # Main changelog generation UI
│   │   ├── history/        # Past changelogs
│   │   └── settings/       # User settings (planned)
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth handlers
│   │   ├── commits/        # Fetch commits/tags
│   │   └── generate/       # Changelog generation endpoint
│   ├── login/              # Public login page
│   └── layout.tsx          # Root layout with metadata
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui primitives
│   └── TipJar.tsx          # Community support widget
├── lib/                    # Core business logic
│   ├── auth.ts             # NextAuth config
│   ├── github.ts           # Octokit wrappers
│   ├── llm.ts              # AI generation logic
│   ├── prisma.ts           # Prisma client singleton
│   └── utils.ts            # Helpers
└── public/                 # Static assets
    ├── robots.txt
    ├── llms.txt
    ├── agents.md
    ├── privacy.txt
    └── terms.txt
```

## Data Flow

1. **User authenticates** via GitHub OAuth
2. **User selects repo** → API fetches repos via Octokit
3. **User picks range** → API fetches commits
4. **Generate clicked** → LLM processes commits → Changelog returned
5. **Optional**: Push to GitHub via `updateOrCreateFile`

## Key Design Decisions

- **JWT Strategy**: No server-side sessions; tokens stored in cookies.
- **BYOK**: User-provided keys are never stored; passed per-request.
- **Lazy LLM Init**: Client only created when generation is triggered.
- **Fallback Logic**: If commit range fails, we fetch recent commits.

## Environment Variables

See `.env.example` for required keys.
