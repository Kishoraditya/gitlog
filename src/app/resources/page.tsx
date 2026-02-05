import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Lightbulb, PlayCircle, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Resources",
    description: "Guides, tutorials, and use cases for GitLog AI.",
};

const resources = [
    {
        title: "Getting Started",
        description: "Learn how to generate your first changelog in 5 minutes.",
        href: "/resources/tutorial",
        icon: PlayCircle,
        color: "text-green-500",
    },
    {
        title: "Use Cases",
        description: "See how teams use GitLog AI for releases, OSS, and more.",
        href: "/resources/use-cases",
        icon: Lightbulb,
        color: "text-blue-500",
    },
    {
        title: "Blog",
        description: "Best practices, tips, and product updates.",
        href: "/resources/blog",
        icon: BookOpen,
        color: "text-purple-500",
    },
    {
        title: "Changelog",
        description: "See what's new in GitLog AI (we use our own tool!).",
        href: "/resources/changelog",
        icon: FileText,
        color: "text-emerald-500",
    },
];

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-mesh py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-white mb-4">Documentation & Insights</h1>
                    <p className="text-gray-400 text-lg">
                        Everything you need to master automated documentation.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {resources.map((resource) => (
                        <Link key={resource.href} href={resource.href}>
                            <Card className="glass-dark border-white/5 hover:border-white/10 transition-all group overflow-hidden h-full">
                                <CardHeader className="p-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                            <resource.icon className={`h-6 w-6 ${resource.color}`} />
                                        </div>
                                        <CardTitle className="text-2xl text-white group-hover:text-green-400 transition-colors uppercase tracking-tighter">
                                            {resource.title}
                                        </CardTitle>
                                    </div>
                                    <CardDescription className="text-gray-400 text-sm leading-relaxed">
                                        {resource.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8 flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    Browse Section <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
