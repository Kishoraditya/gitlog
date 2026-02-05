import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Code, Bot, Cpu, Zap, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "The Complete Guide to Conventional Commits",
    description: "Learn how to structure your commits for maximum AI readability and automated changelogs.",
};

export default function BlogPost() {
    return (
        <article className="min-h-screen bg-mesh py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/resources/blog" className="inline-flex items-center gap-2 text-green-500 text-sm font-medium mb-12 hover:underline transition-all hover:gap-3">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Link>

                <header className="mb-16">
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
                        Conventional Commits <br />
                        <span className="text-gradient">The AI Standard.</span>
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 text-gray-500 text-xs font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2 text-blue-500">
                            <Info className="h-4 w-4" />
                            <span>Guide</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-green-500" />
                            <span>Kishoraditya</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span>8 min read</span>
                        </div>
                    </div>
                </header>

                <div className="prose prose-invert prose-green max-w-none space-y-12 text-gray-300 leading-relaxed text-lg">
                    <p>
                        Conventional Commits aren&apos;t just for humans anymore. In the age of AI agents and automated pipelines, a structured commit history is the single most important factor in maintaining a clean project narrative.
                    </p>

                    <h2 className="text-3xl font-black text-white mt-16 flex items-center gap-3 uppercase tracking-tight">
                        <Code className="h-8 w-8 text-blue-500" />
                        The Core Specification
                    </h2>
                    <p>
                        The specification is simple: <code>&lt;type&gt;(&lt;scope&gt;): &lt;description&gt;</code>. But why does it matter for GitLog AI?
                    </p>

                    {/* Scenario: The Human Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <User className="h-5 w-5 text-green-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest text-sm">Human Scenario: Team Standards</h3>
                        </div>
                        <p className="text-sm text-gray-400">Maintain sanity in a team of 50+ developers.</p>
                        <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-xs space-y-2">
                            <p className="text-green-400">feat(auth): add google oauth provider</p>
                            <p className="text-blue-400">fix(ui): repair overlapping sidebar on mobile</p>
                            <p className="text-purple-400">docs: update readme with deployment steps</p>
                        </div>
                    </div>

                    {/* Scenario: The AI Agent Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Bot className="h-5 w-5 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest text-sm">AI Agent Scenario: Automated Versioning</h3>
                        </div>
                        <p className="text-sm text-gray-400">GitLog AI detects <code>feat</code> as a minor bump and <code>fix</code> as a patch bump automatically.</p>
                        <div className="bg-gray-900 border border-purple-500/20 rounded-xl p-6 italic text-sm text-purple-300">
                            &quot;I noticed you have 3 features and 1 breaking change since v1.0.0. I suggest bumping to v2.0.0 and I have drafted the announcement for you.&quot; — GitLog AI Bot
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-white mt-16 flex items-center gap-3 uppercase tracking-tight">
                        <Zap className="h-8 w-8 text-yellow-500" />
                        Self-Hosting Guide (CLI)
                    </h2>
                    <p>
                        For teams who want to run GitLog locally or in a private cloud, we provide a CLI wrapper.
                    </p>
                    <div className="bg-black border border-white/10 rounded-2xl p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                        <p className="text-gray-500 mb-4"># Install the GitLog CLI</p>
                        <p className="text-white mb-6">npm install -g gitlog-ai</p>

                        <p className="text-gray-500 mb-4"># Generate local changelog</p>
                        <p className="text-white mb-2">gitlog generate --from v1.0 --to HEAD --format keepachangelog</p>

                        <p className="text-gray-500 mt-6 mb-4"># Push metadata to MCP</p>
                        <p className="text-white">gitlog sync --mcp-token YOUR_TOKEN_HERE</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] mt-24 text-center">
                        <h3 className="text-3xl font-black text-white mb-4">Standardize Your History</h3>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Stop guessing what went into your releases. Let GitLog AI enforce the standard.</p>
                        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-10" asChild>
                            <Link href="/login">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
