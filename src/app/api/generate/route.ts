import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCommitsBetweenRefs, getCommits } from "@/lib/github";
import { generateChangelog, suggestVersionWithLLM, type ChangelogFormat } from "@/lib/llm";
import { parseRepoFullName } from "@/lib/utils";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user with plan info
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                changelogs: {
                    where: {
                        createdAt: {
                            gte: new Date(new Date().setDate(1)), // This month
                        },
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check limits for free users
        if (user.plan === "FREE" && user.changelogs.length >= user.changelogLimit) {
            return NextResponse.json(
                {
                    error: "Monthly changelog limit reached",
                    limit: user.changelogLimit,
                    used: user.changelogs.length,
                    upgrade: true,
                },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { GenerateRequestSchema } = await import("@/lib/schemas");
        const validation = GenerateRequestSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: "Invalid request data",
                    details: validation.error.issues.map((e: any) => `${e.path.join(".")}: ${e.message}`)
                },
                { status: 400 }
            );
        }

        const {
            repoFullName,
            repositoryId,
            fromRef,
            toRef,
            since,
            until,
            format,
            generateVersion,
            currentVersion,
            title,
            pushToRepo,
            customApiKey,
            customBaseURL,
            outputLanguage,
            comment,
        } = validation.data;

        if (!repositoryId) {
            return NextResponse.json(
                { error: "Repository ID is required" },
                { status: 400 }
            );
        }

        const { owner, repo } = parseRepoFullName(repoFullName);

        // Fetch repository to check for overrides
        const repository = await prisma.repository.findUnique({
            where: { id: repositoryId }
        });

        // Fetch commits
        let commits;
        if (fromRef && toRef) {
            commits = await getCommitsBetweenRefs(
                session.accessToken,
                owner,
                repo,
                fromRef,
                toRef
            );
        } else if (since || until) {
            commits = await getCommits(session.accessToken, owner, repo, {
                since,
                until,
            });
        } else {
            // Default: last 50 commits
            commits = await getCommits(session.accessToken, owner, repo, {
                perPage: 50,
            });
        }

        if (!commits || !commits.length) {
            return NextResponse.json(
                { error: "No commits found in the specified range. Try a different range." },
                { status: 400 }
            );
        }

        // Generate version suggestion if requested
        let version: string | undefined;
        let versionReason: string | undefined;

        if (generateVersion) {
            const versionResult = await suggestVersionWithLLM(commits, currentVersion);
            version = versionResult.suggested;
            versionReason = versionResult.reason;
        }

        // Determine custom template
        const customFormatTemplate = repository?.customFormat || user.customFormat || undefined;

        // Generate changelog
        const content = await generateChangelog({
            commits,
            format: format as ChangelogFormat,
            repoName: repoFullName,
            version,
            comment,
            customFormatTemplate,
            accessToken: session.accessToken,
            customApiKey,
            customBaseURL,
            outputLanguage,
        });

        // Save to database
        const changelog = await prisma.changelog.create({
            data: {
                title: title || `${repo} ${version || "Changelog"}`,
                version,
                content,
                format: format.toUpperCase() as any,
                fromRef: fromRef || since || "HEAD~50",
                toRef: toRef || until || "HEAD",
                commitCount: commits.length,
                userId: user.id,
                repositoryId,
            },
        });

        // Push to GitHub if requested
        if (pushToRepo) {
            try {
                const { updateOrCreateFile } = await import("@/lib/github");
                await updateOrCreateFile(
                    session.accessToken,
                    owner,
                    repo,
                    "CHANGELOG.md",
                    content,
                    `docs: update changelog for ${version || "new release"} [skip ci]`
                );
            } catch (githubError: any) {
                console.error("Failed to push to GitHub:", githubError);
                // We don't fail the whole request since changelog was generated and saved to DB
            }
        }

        return NextResponse.json({
            changelog,
            version,
            versionReason,
            commitCount: commits.length,
            pushed: pushToRepo,
        });
    } catch (error) {
        console.error("Generate error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to generate changelog" },
            { status: 500 }
        );
    }
}

// Get changelog history
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const repositoryId = searchParams.get("repositoryId");
        const limit = parseInt(searchParams.get("limit") || "20");

        const changelogs = await prisma.changelog.findMany({
            where: {
                userId: session.user.id,
                ...(repositoryId && { repositoryId }),
            },
            orderBy: { createdAt: "desc" },
            take: limit,
            include: {
                repository: {
                    select: {
                        name: true,
                        fullName: true,
                    },
                },
            },
        });

        return NextResponse.json({ changelogs });
    } catch (error) {
        console.error("History API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch history" },
            { status: 500 }
        );
    }
}
