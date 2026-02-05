import { NextResponse } from "next/server";
import { generateRssXml } from "@/lib/rss";

const BLOG_POSTS = [
    {
        slug: "why-your-changelog-sucks",
        title: "Why Your Changelog Sucks (And How to Fix It)",
        description: "Most changelogs are either empty or unreadable. Here's how to write ones that developers actually appreciate.",
        date: "2026-02-01",
    },
    {
        slug: "conventional-commits-guide",
        title: "The Complete Guide to Conventional Commits",
        description: "Learn the commit message format that powers automated versioning and changelog generation.",
        date: "2026-01-28",
    },
    {
        slug: "automate-release-notes",
        title: "Automate Your Release Notes with AI",
        description: "How GitLog AI uses LLMs to transform commit history into polished documentation.",
        date: "2026-01-25",
    },
];

export async function GET() {
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://gitlog.ai";
    const rssItems = BLOG_POSTS.map((post) => ({
        title: post.title,
        description: post.description,
        link: `/resources/blog/${post.slug}`,
        date: post.date,
        author: "GitLog AI Team",
    }));

    const xml = generateRssXml(
        "GitLog AI Blog",
        "Best practices, tips, and product updates from the GitLog AI team.",
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
