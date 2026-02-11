"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { Cpu } from "lucide-react";

export default function MCPIntegrationPage() {
    return (
        <div className="space-y-8">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Cpu className="h-3 w-3" /> Agent Ready
                </div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-4">MCP Integration</h1>
                <p className="text-lg text-slate-400">
                    Connect GitLog AI to Claude Desktop or any MCP-compliant agent.
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-slate-400 mb-4">
                    GitLog AI implements the Model Context Protocol (MCP), allowing AI agents to directly query your repository history and generate changelogs on command.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Claude Desktop Configuration</h2>
                <p className="text-slate-400 mb-4">
                    Add this to your <code className="bg-white/10 px-1 py-0.5 rounded text-white">claude_desktop_config.json</code>:
                </p>
                <CodeBlock language="json" code={`{
  "mcpServers": {
    "gitlog": {
      "command": "npx",
      "args": ["-y", "gitlog-mcp"],
      "env": {
        "GITHUB_TOKEN": "your-github-pat"
      }
    }
  }
}`} />
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Available Tools</h2>
                <div className="space-y-6">
                    <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                        <h3 className="text-lg font-bold text-white mb-2">gitlog-generate-changelog</h3>
                        <p className="text-slate-400 text-sm mb-4">Generates a formatted changelog from commit history.</p>
                        <CodeBlock language="json" code={`{
  "repoFullName": "owner/repo",
  "fromRef": "v1.0.0",
  "toRef": "HEAD"
}`} />
                    </div>
                </div>
            </section>
        </div>
    );
}
