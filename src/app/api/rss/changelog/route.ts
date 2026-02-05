import { NextResponse } from "next/server";
import { generateRssXml } from "@/lib/rss";

const RELEASES = [
    {
        version: "0.2.0",
        date: "2026-02-05",
        summary: "GitLog AI Community Edition. AI-powered changelogs, MCP integration, BYOK functionality, and deep commit inspection.",
    },
    {
        version: "0.1.0",
        date: "2026-01-20",
        summary: "MVP Release. GitHub OAuth, smart versioning, and multiple output formats.",
    },
];

export async function GET() {
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://gitlog.ai";
    const rssItems = RELEASES.map((release) => ({
        title: `v${release.version} - ${release.date}`,
        description: release.summary,
        link: `/resources/changelog#${release.version}`,
        date: release.date,
        author: "GitLog AI",
    }));

    const xml = generateRssXml(
        "GitLog AI Product Changelog",
        "The official record of updates, fixes, and features added to GitLog AI.",
        siteUrl,
        rssItems
    );

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
    });
}
