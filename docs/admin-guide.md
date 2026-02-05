# Admin Console - Operations Guide

Welcome kishoradityasc@gmail.com. This guide explains how to manage the GitLog AI ecosystem.

## 🛠️ User & Feature Management

We use a hybrid approach of direct database management (PostgreSQL) and dynamic feature toggling.

### Feature Flags (GrowthBook)
- **Control**: Access [GrowthBook](https://app.growthbook.io) to enable/disable features globally.
- **Flags**:
  - `tip_jar`: Controls visibility of the floating tipjar.
  - `ai_generation`: Toggle the core LLM processing.
  - `beta_access`: Restricts dashboard to specific email allowlists.

## 🛡️ Unified Command Center (/admin)
The admin console is the heart of GitLog AI operations. It surfaces:
- **Live Business KPIs**: Real-time counts of Users, Repos, and Changelogs.
- **System Health**: Active monitoring of system status and execution metrics.
- **One-Click Toolbox**: Direct deep-links to Sentry, GrowthBook, PostHog, and Razorpay.

## 🛠️ Monitoring & Alerting (Sentry)
- **Error Tracking**: All client and server errors are sent to [Sentry](https://sentry.io).
- **Alerting**: Critical exceptions trigger notifications based on the rules defined in the Sentry dashboard.
- **Performance**: Monitor API latency and LLM response times globally.

### Detailed Metrics (PostHog)
- **Dashboard**: Monitor growth via [PostHog Dashboard](https://app.posthog.com).
- **KPIs to Watch**:
  - `Changelog Generated`: Primary usage metric.
  - `MCP Connection Established`: Success of machine-first strategy.
  - `Tip Button Clicked`: Conversion for the community model.

## 📈 Growth Strategy Implementation

### 1. SEO (Search Engine Optimization)
- **Approach**: Static path generation for all `/resources` pages.
- **Metadata**: Managed via `RootLayout` and individual page `metadata` objects.
- **Sitemap**: Automatically generated at `/sitemap.xml`.

### 2. AEO & LLMEO (Answer/LLM Engine Optimization)
- **Approach**: We utilize Semantic HTML and JSON-LD schema to ensure AI crawlers (Perplexity, OpenAI) understand our core value.
- **Machine Interface**: The `/agents.md` at root provides a clear instruction set for LLMs to use GitLog.

### 3. GEO (Generative Engine Optimization)
- **Strategy**: Creating "Comparison Pages" and "Scenario Guides" (like the ones in Blog) to rank for specific prompt queries like "How to use MCP with Git".

### 4. RSS Feed Strategy
- **Distribution**: Two feeds exist at `/api/rss/blog` and `/api/rss/changelog`. These should be submitted to technical aggregators (Daily.dev, HN, etc.) as the project evolves.

## 📬 Mailing & Growth
- **Mailing Center**: View and export newsletter subscribers directly in the `/admin` dashboard.
- **Strategy**: Use exported lists for product updates or feature announcements.

## ☕ Support Handling
- **Razorpay**: Tips are monitored via the Razorpay Dashboard.
- **Community Progress**: The landing page tip jar automatically sums captured payments from the Razorpay API.

---
GitLog AI - Confidential Internal Documentation
