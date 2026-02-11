"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { Rocket, Bot } from "lucide-react";

export default function AIContextGuide() {
    return (
        <div className="space-y-8">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Bot className="h-3 w-3" /> AI Strategy
                </div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-4">Why Agents Need Context</h1>
                <p className="text-lg text-slate-400">
                    In the age of coding agents, your repository history is a dataset. Don't let it go to waste.
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
                <p className="text-slate-400 mb-4">
                    AI agents like Claude Dev or Cursor are powerful, but they often lack <strong>temporal context</strong>. They see the code <em>as it is now</em>, but they don't know <em>why</em> it changed or what the recent momentum has been.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">The Solution: Structured History</h2>
                <p className="text-slate-400 mb-4">
                    By exposing your changelog and commit history via an <strong>MCP Server</strong> (like GitLog AI), you give agents the ability to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                    <li>Trace the root cause of a recent bug.</li>
                    <li>Understand the intent behind a new feature.</li>
                    <li>Draft release announcements that match the actual work done.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Example Config</h2>
                <CodeBlock language="json" code={`{
  "mcpServers": {
    "gitlog": {
      "command": "npx",
      "args": ["-y", "gitlog-mcp"]
      // The agent can now "ask" your repo what happened last week
    }
  }
}`} />
            </section>
        </div>
    );
}
