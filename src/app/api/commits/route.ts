import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCommits, getCommitsBetweenRefs, getTags, getBranches } from "@/lib/github";
import { parseRepoFullName } from "@/lib/utils";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const repoFullName = searchParams.get("repo");
        const fromRef = searchParams.get("from");
        const toRef = searchParams.get("to");
        const since = searchParams.get("since");
        const until = searchParams.get("until");

        if (!repoFullName) {
            return NextResponse.json(
                { error: "Repository name required" },
                { status: 400 }
            );
        }

        const { owner, repo } = parseRepoFullName(repoFullName);

        let commits;

        if (fromRef && toRef) {
            // Compare between two refs (tags, branches, SHAs)
            commits = await getCommitsBetweenRefs(
                session.accessToken,
                owner,
                repo,
                fromRef,
                toRef
            );
        } else {
            // Get commits by date range
            commits = await getCommits(session.accessToken, owner, repo, {
                since: since || undefined,
                until: until || undefined,
            });
        }

        return NextResponse.json({
            commits,
            count: commits.length,
        });
    } catch (error) {
        console.error("Commits API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch commits" },
            { status: 500 }
        );
    }
}

// Get tags and branches for a repository
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { repoFullName } = body;

        if (!repoFullName) {
            return NextResponse.json(
                { error: "Repository name required" },
                { status: 400 }
            );
        }

        const { owner, repo } = parseRepoFullName(repoFullName);

        const [tags, branches] = await Promise.all([
            getTags(session.accessToken, owner, repo),
            getBranches(session.accessToken, owner, repo),
        ]);

        return NextResponse.json({ tags, branches });
    } catch (error) {
        console.error("Refs API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch refs" },
            { status: 500 }
        );
    }
}
