import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog",
    description: "Best practices, tips, and product updates from GitLog AI.",
};

const posts = [
    {
        slug: "why-your-changelog-sucks",
        title: "Why Your Changelog Sucks (And How to Fix It)",
        description: "Most changelogs are either empty or unreadable. Learn the psychology of good release notes.",
        date: "2026-02-01",
        readTime: "5 min read",
    },
    {
        slug: "conventional-commits-guide",
        title: "The Complete Guide to Conventional Commits",
        description: "Learn the commit message format that powers automated versioning and changelog generation.",
        date: "2026-01-28",
        readTime: "8 min read",
    },
    {
        slug: "automate-release-notes",
        title: "Automate Your Release Notes with AI",
        description: "How GitLog AI uses LLMs to transform commit history into polished documentation.",
        date: "2026-01-25",
        readTime: "4 min read",
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-mesh py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-white mb-4">Engineering Blog</h1>
                    <p className="text-gray-400 text-lg">
                        Insights on release management, Git workflows, and AI automation.
                    </p>
                </div>

                <div className="grid gap-6">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/resources/blog/${post.slug}`}>
                            <Card className="glass-dark border-white/5 hover:border-white/10 transition-all group overflow-hidden">
                                <CardHeader className="p-8">
                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3 w-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3 w-3" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <CardTitle className="text-2xl text-white group-hover:text-green-400 transition-colors uppercase tracking-tighter mb-2">
                                        {post.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                                        {post.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8 flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest">
                                    Read Article <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/resources" className="text-gray-500 hover:text-white transition-colors text-sm">
                        ← Back to Resources
                    </Link>
                </div>
            </div>
        </div>
    );
}
