import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, Shield, Rocket, GitBranch, Users, Code, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "Coming Soon",
    description: "Exciting features in development for GitLog AI.",
};

const upcomingFeatures = [
    {
        icon: GitBranch,
        title: "Pull Request Integration",
        description: "Generate changelogs directly from merged PRs with labels and descriptions.",
        eta: "Q1 2026",
    },
    {
        icon: Code,
        title: "Custom Templates",
        description: "Create and save your own changelog templates with custom formatting.",
        eta: "Q1 2026",
    },
    {
        icon: Zap,
        title: "GitHub Action",
        description: "Auto-generate changelogs on every release tag via CI/CD.",
        eta: "Q2 2026",
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Share changelog history and templates across your organization.",
        eta: "Q2 2026",
    },
    {
        icon: Sparkles,
        title: "Release Themes",
        description: "Auto-detect and label releases (Security, Performance, etc.).",
        eta: "Q2 2026",
    },
    {
        icon: Globe,
        title: "Multilingual Output",
        description: "Generate changelogs in multiple languages for global audiences.",
        eta: "Q3 2026",
    },
    {
        icon: Shield,
        title: "Webhook Automation",
        description: "Trigger changelog generation from external events.",
        eta: "Q3 2026",
    },
    {
        icon: Rocket,
        title: "Public API",
        description: "Programmatic access to changelog generation via REST API.",
        eta: "Q2 2026",
    },
];

export default function ComingSoonPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">🚀 Coming Soon</h1>
                    <p className="text-gray-400 text-lg">
                        Exciting features we&apos;re building for GitLog AI.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {upcomingFeatures.map((feature) => (
                        <Card key={feature.title} className="bg-gray-900 border-gray-800 opacity-90">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <feature.icon className="h-5 w-5 text-yellow-500" />
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-400 mb-2">
                                    {feature.description}
                                </CardDescription>
                                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                                    ETA: {feature.eta}
                                </span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center space-y-4">
                    <p className="text-gray-500">
                        Want to prioritize a feature? Let us know on GitHub!
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="https://github.com/gitlog/issues"
                            className="text-green-400 hover:underline"
                        >
                            Request a Feature →
                        </Link>
                    </div>
                    <Link href="/" className="text-gray-400 hover:underline block mt-4">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
