import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        // Security check
        if (session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const [userCount, changelogCount, repoCount, subscriberCount] = await Promise.all([
            prisma.user.count(),
            prisma.changelog.count(),
            prisma.repository.count(),
            prisma.subscriber.count(),
        ]);

        return NextResponse.json({
            stats: [
                { label: "Total Users", value: userCount.toLocaleString(), change: "+0%", color: "text-blue-400 font-bold" },
                { label: "AI Changelogs", value: changelogCount.toLocaleString(), change: "+0%", color: "text-green-400 font-bold" },
                { label: "Connected Repos", value: repoCount.toLocaleString(), change: "+0%", color: "text-purple-400 font-bold" },
                { label: "Subscribers", value: subscriberCount.toLocaleString(), change: "+0%", color: "text-red-400 font-bold" },
            ],
            growth: {
                users: userCount,
                changelogs: changelogCount,
                repos: repoCount,
                subscribers: subscriberCount
            }
        });
    } catch (error) {
        console.error("Admin stats fetch error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
