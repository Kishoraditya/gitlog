import { NextRequest, NextResponse } from "next/server";
import { generateChangelog, ChangelogFormat } from "@/lib/llm";
import { getCommitsBetweenRefs, getCommits } from "@/lib/github";
import { parseRepoFullName } from "@/lib/utils";

/**
 * Public API v1 - Generate Changelog
 * 
 * POST /api/v1/generate
 * 
 * Headers:
 *   Authorization: Bearer <GITHUB_ACCESS_TOKEN>
 *   X-API-Key: <OPENROUTER_API_KEY> (optional, for BYOK)
 * 
 * Body:
 *   {
 *     "repoFullName": "owner/repo",
 *     "fromRef": "v1.0.0",
 *     "toRef": "HEAD",
 *     "format": "keepachangelog" | "github_release" | "simple"
 *   }
 */
export async function POST(req: NextRequest) {
    try {
        // Auth
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing or invalid Authorization header. Use 'Bearer <GITHUB_ACCESS_TOKEN>'" },
                { status: 401 }
            );
        }
        const accessToken = authHeader.substring(7);

        // BYOK support
        const customApiKey = req.headers.get("x-api-key") || undefined;

        // Body
        const body = await req.json();
        const {
            repoFullName,
            fromRef = "HEAD~50",
            toRef = "HEAD",
            format = "keepachangelog",
        } = body;

        if (!repoFullName) {
            return NextResponse.json(
                { error: "Missing required field: repoFullName" },
                { status: 400 }
            );
        }

        const { owner, repo } = parseRepoFullName(repoFullName);

        // Fetch commits
        let commits;
        try {
            if (fromRef && toRef) {
                commits = await getCommitsBetweenRefs(accessToken, owner, repo, fromRef, toRef);
            } else {
                commits = await getCommits(accessToken, owner, repo, { perPage: 50 });
            }
        } catch (error: any) {
            return NextResponse.json(
                { error: `Failed to fetch commits: ${error.message}` },
                { status: 500 }
            );
        }

        if (commits.length === 0) {
            return NextResponse.json(
                { error: "No commits found in the specified range" },
                { status: 404 }
            );
        }

        // Generate changelog
        const changelog = await generateChangelog({
            commits,
            format: format as ChangelogFormat,
            repoName: repoFullName,
            accessToken,
            customApiKey,
        });

        return NextResponse.json({
            success: true,
            changelog,
            commitCount: commits.length,
            format,
        });
    } catch (error: any) {
        console.error("API v1 Generate Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        name: "GitLog AI Public API",
        version: "1.0.0",
        endpoints: {
            "POST /api/v1/generate": "Generate a changelog from GitHub commits",
        },
        docs: "https://gitlog.ai/resources/tutorial",
    });
}
