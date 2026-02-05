import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getRepositories } from "@/lib/github";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get sync parameter
        const { searchParams } = new URL(req.url);
        const sync = searchParams.get("sync") === "true";

        // If sync requested, fetch from GitHub and update database
        if (sync) {
            const githubRepos = await getRepositories(session.accessToken);

            // Upsert repositories
            for (const repo of githubRepos) {
                await prisma.repository.upsert({
                    where: {
                        userId_githubId: {
                            userId: session.user.id,
                            githubId: repo.id,
                        },
                    },
                    update: {
                        name: repo.name,
                        fullName: repo.full_name,
                        private: repo.private,
                        defaultBranch: repo.default_branch,
                        description: repo.description,
                    },
                    create: {
                        githubId: repo.id,
                        name: repo.name,
                        fullName: repo.full_name,
                        private: repo.private,
                        defaultBranch: repo.default_branch,
                        description: repo.description,
                        userId: session.user.id,
                    },
                });
            }
        }

        // Fetch user's repositories from database
        const repositories = await prisma.repository.findMany({
            where: { userId: session.user.id },
            orderBy: { updatedAt: "desc" },
            include: {
                _count: {
                    select: { changelogs: true },
                },
            },
        });

        return NextResponse.json({ repositories });
    } catch (error) {
        console.error("Repos API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch repositories" },
            { status: 500 }
        );
    }
}
