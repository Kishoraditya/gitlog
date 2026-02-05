import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Changelog",
    description: "See what's new in GitLog AI - we use our own tool!",
};

interface Release {
    version: string;
    date: string;
    type: string;
    changes: Record<string, string[]>;
}

const releases: Release[] = [
    {
        version: "0.2.0",
        date: "2026-02-05",
        type: "minor",
        changes: {
            Added: [
                "BYOK (Bring Your Own Key) support for OpenRouter, OpenAI, Claude, DeepSeek",
                "YAML metadata block in generated changelogs",
                "Push to GitHub feature",
                "TipJar component for community support",
                "Resources section with tutorials and use cases",
                "Legal pages (Privacy, Terms)",
                "SEO infrastructure (sitemap, robots.txt, llms.txt, agents.md)",
            ],
            Changed: [
                "Switched from SaaS model to free community edition",
                "Improved commit range selection with tag/commit dropdowns",
                "Enhanced changelog formatting with commit links",
            ],
            Removed: [
                "Razorpay integration (no longer needed)",
                "Resend email dependency",
                "Groq SDK (replaced with OpenRouter)",
            ],
        },
    },
    {
        version: "0.1.0",
        date: "2026-01-20",
        type: "minor",
        changes: {
            Added: [
                "Initial MVP release",
                "GitHub OAuth authentication",
                "Changelog generation (Keep a Changelog, GitHub Release, Simple)",
                "Smart semver versioning",
                "Markdown editor with live preview",
                "Contributor shoutouts",
                "Deep inspection for vague commits",
            ],
        },
    },
];

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Changelog</h1>
                    <p className="text-gray-400 text-lg">
                        What&apos;s new in GitLog AI (we dogfood our own tool!)
                    </p>
                </div>

                <div className="space-y-12">
                    {releases.map((release) => (
                        <div key={release.version} className="border-l-2 border-green-600 pl-6">
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-2xl font-bold">[{release.version}]</h2>
                                <span className="text-gray-500">- {release.date}</span>
                                <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded uppercase">
                                    {release.type}
                                </span>
                            </div>

                            {Object.entries(release.changes).map(([category, items]) => (
                                <div key={category} className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-300 mb-2">{category}</h3>
                                    <ul className="space-y-1">
                                        {items.map((item, i) => (
                                            <li key={i} className="text-gray-400 flex items-start gap-2">
                                                <span className="text-green-500 mt-1">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/resources" className="text-green-400 hover:underline">
                        ← Back to Resources
                    </Link>
                </div>
            </div>
        </div>
    );
}
