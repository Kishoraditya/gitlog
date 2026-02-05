# GitLog AI 🚀

[![v0.2.0](https://img.shields.io/badge/version-0.2.0-green.svg)](https://gitlog-ai.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-black.svg)](https://nextjs.org)
[![MCP Powered](https://img.shields.io/badge/MCP-Standard-blue.svg)](https://modelcontextprotocol.io)

**Changelogs for Developers. Context for AI Agents.**

GitLog AI is a production-grade Micro SaaS designed to automate the painful process of writing release notes. It translates messy, technical git commits into structured, meaningful documentation that serves both human stakeholders and Large Language Model (LLM) agents.

---

## 🌟 Why GitLog AI?

Traditional changelogs are either too technical (git logs) or too manually intensive. GitLog AI bridges this gap with:

- **Human-Readable Updates**: Clean, categorized release notes for your users.
- **Machine-Readable Context**: Fully-fledged **MCP (Model Context Protocol)** server to give AI agents (Claude, IDEs) real-time awareness of your codebase history.
- **Version Intelligence**: Automated SemVer suggestions based on commit analysis.
- **Multi-Lingual reach**: Support for English, Hindi, Spanish, and German out of the box.

---

## ✨ Key Features

### 🛠️ For Engineering Teams
- **Native GitHub Integration**: One-click repository sync via OAuth.
- **AI-Powered Summarization**: Deep inspection of commits using LLMs to group by Features, Stability, and Docs.
- **Direct Push**: Update your `CHANGELOG.md` directly from the dashboard.
- **Custom Formats**: Support for *Keep a Changelog*, GitHub Releases, and raw Markdown.

### 🤖 For AI Agents & LLMs
- **MCP Server Implementation**: Supports both **Stdio** (local) and **HTTP SSE** (remote) transport.
- **Real-time Awareness**: Let your AI assistants understand *why* a file changed, not just *that* it changed.
- **Semantic Search**: (Coming Soon) Context-aware search through 100% of your project history.

---

## 🏗️ Technical Stack

- **Frontend/Backend**: [Next.js 15+](https://nextjs.org) (App Router, Server Actions)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [Framer Motion](https://www.framer.com/motion/) (Premium Glassmorphism Design)
- **Database**: [PostgreSQL](https://www.postgresql.org) + [Prisma ORM](https://www.prisma.io)
- **Authentication**: [NextAuth.js](https://next-auth.js.org) (GitHub Provider)
- **Infrastructure**:
  - **Caching**: [Redis](https://redis.io) (LRU Cache Layer)
  - **Metrics**: [PostHog](https://posthog.com) & [Google Analytics](https://analytics.google.com)
  - **Feature Flags**: [GrowthBook](https://www.growthbook.io)
  - **Payments/Tips**: [Razorpay](https://razorpay.com)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- PostgreSQL instance
- GitHub OAuth App (for authentication)

### 2. Environment Setup
Copy `.env.example` to `.env` and fill in the required keys:

```bash
# Core
DATABASE_URL="your_postgresql_url"
NEXTAUTH_SECRET="your_nextauth_secret"

# GitHub
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"

# AI
OPENAI_API_KEY="your_key" # Or Anthropic/Google
```

### 3. Installation
```bash
npm install
npx prisma generate
npm run dev
```

---

## 🔌 MCP Integration

To use GitLog AI as an MCP server in your local tools (like Claude Desktop), add the following to your `config.json`:

```json
"mcpServers": {
  "gitlog": {
    "command": "node",
    "args": ["scripts/mcp-server.js"],
    "env": {
      "GITHUB_TOKEN": "your_github_personal_access_token",
      "NEXT_PUBLIC_APP_URL": "http://localhost:3000"
    }
  }
}
```

---

## 🤝 Community & Support

GitLog AI is an open-source first project. We rely on community support to keep the infrastructure running.

- **Drop a Tip**: Support our yearly operational goal ($150) via the integrated **Tip Jar**.
- **Product Hunt**: Upvote us on [Product Hunt].
- **Feedback**: Use the sticky feedback sidebar to report bugs or request features.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` (coming soon) for more information.

---

Built with ❤️ by [Kishoraditya](https://github.com/Kishoraditya) and the Open Source Community.
