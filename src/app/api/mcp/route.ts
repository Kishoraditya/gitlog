import { NextRequest, NextResponse } from "next/server";
import { MCP_TOOLS, executeTool, formatMcpResponse, formatMcpError } from "@/lib/mcp";
import { McpToolInvocationSchema } from "@/lib/schemas";

/**
 * MCP (Model Context Protocol) Server Endpoint
 * 
 * This endpoint allows AI agents to use GitLog AI as a tool.
 * 
 * Authentication:
 *   Authorization: Bearer <GITHUB_ACCESS_TOKEN>
 *   X-API-Key: <OPENROUTER_API_KEY> (optional, for BYOK)
 * 
 * Supported Methods:
 *   - tools/list: List available tools
 *   - tools/call: Execute a tool
 */

// Handle tool listing
function handleToolsList(id: string | number) {
    return formatMcpResponse(id, {
        tools: MCP_TOOLS,
    });
}

// Handle tool invocation
async function handleToolCall(
    id: string | number,
    toolName: string,
    args: Record<string, unknown>,
    accessToken: string,
    apiKey?: string
) {
    const result = await executeTool(toolName, args, accessToken, apiKey);

    if (result.success) {
        return formatMcpResponse(id, {
            content: [
                {
                    type: "text",
                    text: typeof result.result === "string"
                        ? result.result
                        : JSON.stringify(result.result, null, 2),
                },
            ],
        });
    } else {
        return formatMcpError(id, -32000, result.error || "Tool execution failed");
    }
}

export async function POST(req: NextRequest) {
    try {
        // Authentication
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                formatMcpError(null, -32600, "Missing Authorization header. Use 'Bearer <GITHUB_TOKEN>'"),
                { status: 401 }
            );
        }
        const accessToken = authHeader.substring(7);
        const customApiKey = req.headers.get("x-api-key") || undefined;

        // Parse request
        const body = await req.json();
        const { id, method, params } = body;

        // Route by method
        switch (method) {
            case "tools/list":
                return NextResponse.json(handleToolsList(id));

            case "tools/call":
                const validation = McpToolInvocationSchema.safeParse(body);
                if (!validation.success) {
                    return NextResponse.json(
                        formatMcpError(id, -32602, "Invalid params"),
                        { status: 400 }
                    );
                }
                const result = await handleToolCall(
                    id,
                    params.name,
                    params.arguments as Record<string, unknown>,
                    accessToken,
                    customApiKey
                );
                return NextResponse.json(result);

            case "initialize":
                return NextResponse.json(formatMcpResponse(id, {
                    protocolVersion: "2024-11-05",
                    capabilities: {
                        tools: {},
                    },
                    serverInfo: {
                        name: "gitlog-ai",
                        version: "0.2.0",
                    },
                }));

            default:
                return NextResponse.json(
                    formatMcpError(id, -32601, `Method not found: ${method}`),
                    { status: 400 }
                );
        }
    } catch (error: any) {
        console.error("MCP Error:", error);
        return NextResponse.json(
            formatMcpError(null, -32603, error.message || "Internal error"),
            { status: 500 }
        );
    }
}

// Optional: GET endpoint for discovery
export async function GET() {
    return NextResponse.json({
        name: "GitLog AI MCP Server",
        version: "0.2.0",
        protocol: "MCP 2024-11-05",
        description: "AI-powered changelog generation from Git commits",
        endpoints: {
            mcp: "POST /api/mcp",
            docs: "/docs/mcp-integration",
        },
        tools: MCP_TOOLS.map((t) => t.name),
        authentication: {
            type: "bearer",
            header: "Authorization",
            description: "GitHub Personal Access Token with 'repo' scope",
        },
    });
}
