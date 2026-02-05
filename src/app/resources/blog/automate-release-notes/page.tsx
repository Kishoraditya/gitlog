import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Zap, Cpu, Code, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Automate Your Release Notes with AI",
    description: "Deep dive into how GitLog AI uses LLMs to interpret code changes.",
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
                        Release Notes <br />
                        <span className="text-gradient">on Autopilot.</span>
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 text-gray-500 text-xs font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-green-500" />
                            <span>Automation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-500" />
                            <span>Jan 25, 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span>6 min read</span>
                        </div>
                    </div>
                </header>

                <div className="prose prose-invert prose-green max-w-none space-y-12 text-gray-300 leading-relaxed text-lg">
                    <p className="text-xl text-white">
                        The era of copying and pasting commit hashes into a Word doc is over. AI has fundamentally changed how we document software evolution.
                    </p>

                    <h2 className="text-3xl font-black text-white mt-16 flex items-center gap-3 uppercase tracking-tight">
                        <Code className="h-8 w-8 text-green-500" />
                        The Logic of Translation
                    </h2>
                    <p>
                        GitLog AI doesn&apos;t just read your commit messages. It reads the <strong>diffs</strong>. When a commit says &quot;Update logic&quot;, our AI sees that you changed a filtering algorithm in the search results page.
                    </p>

                    {/* Scenario: The Human Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <User className="h-5 w-5 text-green-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest text-sm">Human Scenario: The Editorial Review</h3>
                        </div>
                        <p className="text-sm text-gray-400">Collaborative editing for high-stakes enterprise releases.</p>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-4">
                                <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
                                <span><strong className="text-white">Drafting:</strong> Use the web UI to trigger a generation for the <code>stable-v2</code> branch.</span>
                            </li>
                            <li className="flex gap-4">
                                <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
                                <span><strong className="text-white">Approval:</strong> Share the private URL with your team leads for review.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Scenario: The AI Agent Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Cpu className="h-5 w-5 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest text-sm">AI Agent Scenario: Autonomous Summarization</h3>
                        </div>
                        <p className="text-sm text-gray-400">Connecting your internal LLM agents to project history via MCP.</p>
                        <div className="bg-black/60 rounded-xl p-6 font-mono text-[11px] text-purple-400 leading-relaxed">
                            <p>// System Prompt for Agent</p>
                            <p className="text-white">access_resource(&quot;mcp://gitlog/owner/repo/changelog/latest&quot;)</p>
                            <p className="text-white mt-1">.then(changelog =&gt; check_compatibility(changelog))</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-white mt-16 flex items-center gap-3 uppercase tracking-tight">
                        <ShieldCheck className="h-8 w-8 text-blue-500" />
                        Infrastructure & Security
                    </h2>
                    <p>
                        Security is central to automation. GitLog AI NEVER stores your source code. We process ephemeral diffs in memory, generate the metadata, and immediately discard the source data.
                    </p>

                    <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] mt-24 text-center">
                        <h3 className="text-3xl font-black text-white mb-4">Start Automating Today</h3>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get your team out of the &quot;documentation debt&quot; and back into the code.</p>
                        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-10" asChild>
                            <Link href="/login">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
