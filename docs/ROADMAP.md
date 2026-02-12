# GitLog AI Roadmap

This document outlines the future direction of GitLog AI. We welcome community contributions to help achieve these goals!

## 🌟 Vision
To become the industry-standard tool for automated, intelligent changelog generation that developers actually trust.

## 🗺️ Roadmap Priorities

### Q1 2026: Enhancing Intelligence
- [ ] **Pull Request Integration**: Generate changelogs directly from merged PRs, using PR descriptions as context.
- [ ] **Custom Templates**: Allow users to define fully custom Handlebars/Mustache templates for output.
- [ ] **Smart Grouping**: Use AI to group related commits into meaningful features (e.g., grouping backend API changes with frontend UI updates).

### Q2 2026: Ecosystem & Integrations
- [ ] **GitHub Action**: Build a standalone GitHub Action to auto-generate changelogs on release tags.
- [ ] **Team Collaboration**: Shared workspaces for teams to manage changelog templates.
- [ ] **Semantic Release Plugin**: Integrate with `semantic-release` workflows.
- [ ] **IDE Plugins**: VS Code extension for generating changelog snippets directly in the editor.

### Q3 2026: Global Reach
- [ ] **Multi-language Output**: Native support for generating changelogs in 10+ languages.
- [ ] **Enterprise SSO**: SAML/OIDC support for large organizations.

### Long-term Goals
- **Self-Hosting**: Docker container for easy on-premise deployment.
- **API Monetization**: Premium API tier for high-volume automated usage.

## 🐛 Known Issues & Bugs
- **Large Diffs**: Very large commit diffs can sometimes hit token limits on smaller LLM models.
- **Vague Commits**: While we have "Deep Inspection", commits with *no message* or single-letter messages are still hard to process accurately.
- **Rate Limits**: Heavy usage of the GitHub API can trigger rate limiting on the free tier.

## 💡 Improvements
- **Caching**: Implement Redis-based caching for frequently requested repositories.
- **UI/UX**: Add a "History" view to see all past generated changelogs.
- **Performance**: Optimize the diff fetching strategy to reduce API calls.

Have an idea? Check out `CONTRIBUTING.md` and open a "Feature Request" issue!
