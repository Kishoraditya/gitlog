/**
 * MCP (Model Context Protocol) Tool Definitions
 * Enables GitLog AI to be used as a tool by AI agents
 */

import { generateChangelog, ChangelogFormat } from "./llm";
import { getCommitsBetweenRefs, getCommits } from "./github";
import { parseRepoFullName } from "./utils";

// MCP Tool Definition
export interface McpTool {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: Record<string, unknown>;
        required: string[];
    };
}

// Available tools
export const MCP_TOOLS: McpTool[] = [
    {
        name: "gitlog-generate-changelog",
        description:
            "Generate a professional changelog from a GitHub repository's commit history using AI. Supports Keep a Changelog format, GitHub Release notes, and simple bullet points.",
        inputSchema: {
            type: "object",
            properties: {
                repoFullName: {
                    type: "string",
                    description: "GitHub repository in 'owner/repo' format (e.g., 'facebook/react')",
                },
                fromRef: {
                    type: "string",
                    description: "Starting reference (tag, SHA, or 'HEAD~N'). Default: 'HEAD~50'",
                },
                toRef: {
                    type: "string",
                    description: "Ending reference. Default: 'HEAD'",
                },
                format: {
                    type: "string",
                    enum: ["keepachangelog", "github_release", "simple"],
                    description: "Output format. Default: 'keepachangelog'",
                },
                outputLanguage: {
                    type: "string",
                    description: "ISO 639-1 language code for output (e.g., 'en', 'es', 'hi'). Default: 'en'",
                },
            },
            required: ["repoFullName"],
        },
    },
    {
        name: "gitlog-list-tags",
        description: "List all tags in a GitHub repository for changelog generation reference.",
        inputSchema: {
            type: "object",
            properties: {
                repoFullName: {
                    type: "string",
                    description: "GitHub repository in 'owner/repo' format",
                },
            },
            required: ["repoFullName"],
        },
    },
];

// Tool execution
export async function executeTool(
    toolName: string,
    args: Record<string, unknown>,
    accessToken: string,
    customApiKey?: string
): Promise<{ success: boolean; result?: unknown; error?: string }> {
    try {
        switch (toolName) {
            case "gitlog-generate-changelog":
                return await executeGenerateChangelog(args, accessToken, customApiKey);
            case "gitlog-list-tags":
                return await executeListTags(args, accessToken);
            default:
                return { success: false, error: `Unknown tool: ${toolName}` };
        }
    } catch (error: any) {
        return { success: false, error: error.message || "Tool execution failed" };
    }
}

async function executeGenerateChangelog(
    args: Record<string, unknown>,
    accessToken: string,
    customApiKey?: string
) {
    const repoFullName = args.repoFullName as string;
    const fromRef = (args.fromRef as string) || "HEAD~50";
    const toRef = (args.toRef as string) || "HEAD";
    const format = (args.format as ChangelogFormat) || "keepachangelog";
    const outputLanguage = (args.outputLanguage as string) || "en";

    const { owner, repo } = parseRepoFullName(repoFullName);

    // Fetch commits
    let commits;
    try {
        commits = await getCommitsBetweenRefs(accessToken, owner, repo, fromRef, toRef);
    } catch {
        commits = await getCommits(accessToken, owner, repo, { perPage: 50 });
    }

    if (commits.length === 0) {
        return { success: false, error: "No commits found in the specified range" };
    }

    // Generate changelog
    const changelog = await generateChangelog({
        commits,
        format,
        repoName: repoFullName,
        accessToken,
        customApiKey,
        outputLanguage,
    });

    return {
        success: true,
        result: {
            changelog,
            commitCount: commits.length,
            format,
            language: outputLanguage,
        },
    };
}

async function executeListTags(args: Record<string, unknown>, accessToken: string) {
    const repoFullName = args.repoFullName as string;
    const { owner, repo } = parseRepoFullName(repoFullName);

    const { Octokit } = await import("@octokit/rest");
    const octokit = new Octokit({ auth: accessToken });

    const { data: tags } = await octokit.repos.listTags({
        owner,
        repo,
        per_page: 30,
    });

    return {
        success: true,
        result: {
            tags: tags.map((t) => ({
                name: t.name,
                sha: t.commit.sha.substring(0, 7),
            })),
            count: tags.length,
        },
    };
}

// MCP Response formatting
export function formatMcpResponse(id: string | number | null, result: unknown) {
    return {
        jsonrpc: "2.0",
        id,
        result,
    };
}

export function formatMcpError(id: string | number | null, code: number, message: string) {
    return {
        jsonrpc: "2.0",
        id,
        error: {
            code,
            message,
        },
    };
}
