# GitLog AI - Agent Integration Guide (MCP)

GitLog AI is fully compatible with the **Model Context Protocol (MCP)**, allowing AI agents to generate changelogs directly within their workflow.

---

## 1. Available Tools

### `gitlog-generate-changelog`
Generate a professional changelog from a GitHub repository using AI.

**Input Schema:**
```json
{
  "repoFullName": "owner/repo",
  "fromRef": "tag or SHA",
  "toRef": "tag or SHA (default: HEAD)",
  "format": "keepachangelog | github_release | simple",
  "outputLanguage": "en | hi | es | de"
}
```

---

## 2. Integration Methods

### Method A: Standalone Stdio Server (Recommended for Local Agents)
Use our dedicated Node.js script for direct integration with agents like Claude Desktop.

**Config (Claude Desktop):**
```json
{
  "mcpServers": {
    "gitlog-ai": {
      "command": "node",
      "args": ["/path/to/gitlog/scripts/mcp-server.js"],
      "env": {
        "GITHUB_TOKEN": "YOUR_GITHUB_PAT"
      }
    }
  }
}
```

### Method B: HTTP MCP Server (Remote)
Connect to our hosted MCP endpoint.

```
POST https://gitlog.ai/api/mcp
Authorization: Bearer <GITHUB_TOKEN>
```

---

## 3. Standard API Access

For programmatic access without MCP:

```
POST https://gitlog.ai/api/v1/generate
Authorization: Bearer <GITHUB_TOKEN>
```

Complete API documentation available at: [gitlog.ai/api-docs](/api-docs)

---

## 4. Documentation

- **MCP Guide**: [mcp-integration.md](/docs/mcp-integration.md)
- **API Reference**: [api-docs page](/api-docs)
- **GitHub**: [Kishoraditya/gitlog](https://github.com/Kishoraditya/gitlog)

---

## 5. Contact & Support

- GitHub Issues: [github.com/Kishoraditya/gitlog/issues](https://github.com/Kishoraditya/gitlog/issues)
- Twitter: [@Kishoraditya](https://twitter.com/Kishoraditya)
