#!/usr/bin/env node
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { CallToolRequestSchema, ListToolsRequestSchema } = require("@modelcontextprotocol/sdk/types.js");
const axios = require("axios");

/**
 * GitLog AI Standalone MCP Server (Stdio Version)
 * 
 * This server allows AI agents (like Claude Desktop) to connect via stdio
 * and use GitLog AI tools locally.
 * 
 * Usage:
 * node scripts/mcp-server.js
 * 
 * Configuration (Claude Desktop):
 * {
 *   "mcpServers": {
 *     "gitlog-ai": {
 *       "command": "node",
 *       "args": ["/path/to/gitlog/scripts/mcp-server.js"],
 *       "env": {
 *         "GITHUB_TOKEN": "your_ghp_token",
 *         "GITLOG_API_URL": "https://gitlog.ai/api/v1/generate"
 *       }
 *     }
 *   }
 * }
 */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITLOG_API_URL = process.env.GITLOG_API_URL || "https://gitlog.ai/api/v1/generate";

if (!GITHUB_TOKEN) {
    console.error("Error: GITHUB_TOKEN environment variable is required.");
    process.exit(1);
}

const server = new Server(
    {
        name: "gitlog-ai-server",
        version: "0.1.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "generate_changelog",
                description: "Generate a professional changelog from a GitHub repository using AI",
                inputSchema: {
                    type: "object",
                    properties: {
                        repoFullName: {
                            type: "string",
                            description: "GitHub repository (e.g., 'facebook/react')"
                        },
                        fromRef: {
                            type: "string",
                            description: "Starting tag or commit SHA"
                        },
                        toRef: {
                            type: "string",
                            description: "Ending tag or commit SHA (default: HEAD)"
                        },
                        format: {
                            type: "string",
                            enum: ["keepachangelog", "github_release", "simple"],
                            description: "Changelog format"
                        }
                    },
                    required: ["repoFullName"]
                }
            }
        ]
    };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name !== "generate_changelog") {
        throw new Error(`Unknown tool: ${request.params.name}`);
    }

    const { repoFullName, fromRef, toRef, format } = request.params.arguments;

    try {
        const response = await axios.post(
            GITLOG_API_URL,
            {
                repoFullName,
                fromRef,
                toRef,
                format: format || "keepachangelog"
            },
            {
                headers: {
                    "Authorization": `Bearer ${GITHUB_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return {
            content: [
                {
                    type: "text",
                    text: response.data.changelog?.content || "No changelog content returned."
                }
            ]
        };
    } catch (error) {
        const errorMsg = error.response?.data?.error || error.message;
        return {
            isError: true,
            content: [
                {
                    type: "text",
                    text: `Failed to generate changelog: ${errorMsg}`
                }
            ]
        };
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("GitLog AI MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
