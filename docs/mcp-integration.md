# MCP Integration Guide

GitLog AI can be used as an MCP (Model Context Protocol) tool by AI agents, enabling automated changelog generation in any agent workflow.

---

## Overview

MCP is a protocol that allows AI agents to use external tools. GitLog AI exposes changelog generation capabilities through a standard MCP interface.

## Server URL

```
https://gitlog.ai/api/mcp
```

For local development:
```
http://localhost:3000/api/mcp
```

---

## Authentication

All MCP requests require a GitHub Personal Access Token for repository access.

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer <GITHUB_PAT>` - GitHub token with `repo` scope |
| `X-API-Key` | No | OpenRouter/OpenAI API key for BYOK |
| `Content-Type` | Yes | `application/json` |

### Creating a GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (Full control of private repositories)
4. Copy the token

---

## Available Tools

### 1. gitlog-generate-changelog

Generate a professional changelog from commit history.

**Input Schema:**

```json
{
  "repoFullName": "owner/repo",      // Required
  "fromRef": "v1.0.0",               // Optional, default: "HEAD~50"
  "toRef": "HEAD",                   // Optional, default: "HEAD"
  "format": "keepachangelog",        // Optional: keepachangelog | github_release | simple
  "outputLanguage": "en"             // Optional: en | hi | es | de
}
```

**Example Request:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "gitlog-generate-changelog",
    "arguments": {
      "repoFullName": "facebook/react",
      "fromRef": "v18.0.0",
      "toRef": "v18.2.0",
      "format": "keepachangelog"
    }
  }
}
```

### 2. gitlog-list-tags

List available tags in a repository (useful for selecting commit ranges).

**Input Schema:**

```json
{
  "repoFullName": "owner/repo"       // Required
}
```

---

## MCP Protocol Methods

### Initialize

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {}
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": { "tools": {} },
    "serverInfo": {
      "name": "gitlog-ai",
      "version": "0.2.0"
    }
  }
}
```

### List Tools

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list",
  "params": {}
}
```

### Call Tool

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "gitlog-generate-changelog",
    "arguments": {
      "repoFullName": "owner/repo"
    }
  }
}
```

---

## Example: cURL

```bash
# List available tools
curl -X POST https://gitlog.ai/api/mcp \
  -H "Authorization: Bearer ghp_xxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'

# Generate changelog
curl -X POST https://gitlog.ai/api/mcp \
  -H "Authorization: Bearer ghp_xxxxxxxxxxxx" \
  -H "X-API-Key: sk-or-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "gitlog-generate-changelog",
      "arguments": {
        "repoFullName": "vercel/next.js",
        "fromRef": "v14.0.0",
        "toRef": "v14.1.0",
        "format": "github_release"
      }
    }
  }'
```

---

## Standalone MCP Server (Stdio)

For local agents like Claude Desktop that prefer stdio-based communication, we provide a dedicated server script.

### Installation

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/Kishoraditya/gitlog.git
   cd gitlog
   npm install
   ```

2. Configure your agent (e.g., Claude Desktop):
   - Open `%APPDATA%\Claude\claude_desktop_config.json`
   - Add the following:

```json
{
  "mcpServers": {
    "gitlog-ai": {
      "command": "node",
      "args": ["d:/data/gitlog/scripts/mcp-server.js"],
      "env": {
        "GITHUB_TOKEN": "your_github_pat_here"
      }
    }
  }
}
```

### Usage

The agent will now have access to the `generate_changelog` tool directly. You can simply ask: "Generate a changelog for vercel/next.js between v14.0.0 and v14.1.0".

---

## HTTP MCP Server (Remote)
// ... existing HTTP docs

## Example: Python Client

```python
import requests

MCP_URL = "https://gitlog.ai/api/mcp"
GITHUB_TOKEN = "ghp_xxxxxxxxxxxx"

def call_mcp(method: str, params: dict = None, id: int = 1):
    response = requests.post(
        MCP_URL,
        headers={
            "Authorization": f"Bearer {GITHUB_TOKEN}",
            "Content-Type": "application/json",
        },
        json={
            "jsonrpc": "2.0",
            "id": id,
            "method": method,
            "params": params or {},
        },
    )
    return response.json()

# List tools
tools = call_mcp("tools/list")
print(tools)

# Generate changelog
changelog = call_mcp(
    "tools/call",
    {
        "name": "gitlog-generate-changelog",
        "arguments": {
            "repoFullName": "owner/repo",
            "format": "keepachangelog",
        },
    },
)
print(changelog["result"]["content"][0]["text"])
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| -32600 | Invalid Request | Missing Authorization header |
| -32601 | Method not found | Unknown MCP method |
| -32602 | Invalid params | Invalid tool arguments |
| -32000 | Tool error | Tool execution failed |
| -32603 | Internal error | Server error |

---

## Rate Limits

- **200 requests/hour** per authenticated user
- Rate limit headers included in response:
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

---

## Support

- GitHub Issues: [github.com/Kishoraditya/gitlog/issues](https://github.com/Kishoraditya/gitlog/issues)
- API Docs: [gitlog.ai/api-docs](/api-docs)
