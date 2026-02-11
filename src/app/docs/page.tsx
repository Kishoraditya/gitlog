import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Cpu, Book } from "lucide-react";

export default function DocsIndex() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-4">Documentation</h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                    The complete guide to automating your release workflow with GitLog AI.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/docs/manual-setup" className="group p-6 glass border border-white/5 rounded-2xl hover:bg-white/5 transition-all">
                    <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20">
                        <Terminal className="h-5 w-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300">Quick Start</h3>
                    <p className="text-sm text-slate-500">Set up GitLog AI in less than 5 minutes using our CLI or web dashboard.</p>
                </Link>

                <Link href="/docs/mcp-integration" className="group p-6 glass border border-white/5 rounded-2xl hover:bg-white/5 transition-all">
                    <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20">
                        <Cpu className="h-5 w-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300">MCP Server</h3>
                    <p className="text-sm text-slate-500">Connect your local AI agents to your repository context.</p>
                </Link>
            </div>

            <div className="prose prose-invert prose-slate max-w-none">
                <h2>What is GitLog AI?</h2>
                <p>
                    GitLog AI is a developer tool that turns messy git commits into structured, production-ready changelogs.
                    It bridges the gap between your development activity and user-facing documentation.
                </p>
            </div>
        </div>
    );
}
