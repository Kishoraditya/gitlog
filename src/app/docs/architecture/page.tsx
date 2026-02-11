"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { Settings } from "lucide-react";

export default function ArchitecturePage() {
    return (
        <div className="space-y-8">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Settings className="h-3 w-3" /> Technical Deep Dive
                </div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-4">Architecture Overview</h1>
                <p className="text-lg text-slate-400">
                    Under the hood of GitLog AI: Next.js, OpenAI, and MCP.
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Tech Stack</h2>
                <div className="border border-white/10 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-200 uppercase bg-white/5">
                            <tr>
                                <th className="px-6 py-3">Layer</th>
                                <th className="px-6 py-3">Technology</th>
                                <th className="px-6 py-3">Purpose</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <tr className="bg-white/5">
                                <td className="px-6 py-4 font-medium text-white">Frontend</td>
                                <td className="px-6 py-4">Next.js 14 (App Router)</td>
                                <td className="px-6 py-4">SSR, Routing, API Routes</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Styling</td>
                                <td className="px-6 py-4">Tailwind CSS + shadcn/ui</td>
                                <td className="px-6 py-4">Design System</td>
                            </tr>
                            <tr className="bg-white/5">
                                <td className="px-6 py-4 font-medium text-white">Auth</td>
                                <td className="px-6 py-4">NextAuth.js (JWT)</td>
                                <td className="px-6 py-4">GitHub OAuth</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Database</td>
                                <td className="px-6 py-4">Supabase (PostgreSQL)</td>
                                <td className="px-6 py-4">User, Repo, Changelog data</td>
                            </tr>
                            <tr className="bg-white/5">
                                <td className="px-6 py-4 font-medium text-white">AI</td>
                                <td className="px-6 py-4">OpenRouter</td>
                                <td className="px-6 py-4">LLM API (OpenAI compatible)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Directory Structure</h2>
                <CodeBlock language="text" code={`src/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/        # Authenticated routes
│   ├── api/                # API routes
│   │   ├── mcp/            # Model Context Protocol endpoints
│   │   └── generate/       # Changelog generation endpoint
│   └── layout.tsx          # Root layout with metadata
├── components/             # Reusable UI components
├── lib/                    # Core business logic
│   ├── llm.ts              # AI generation logic
│   └── github.ts           # Octokit wrappers
└── public/                 # Static assets`} />
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Flow</h2>
                <ol className="list-decimal list-inside space-y-2 text-slate-400">
                    <li><strong>User authenticates</strong> via GitHub OAuth</li>
                    <li><strong>User selects repo</strong> → API fetches repos via Octokit</li>
                    <li><strong>User picks range</strong> → API fetches commits</li>
                    <li><strong>Generate clicked</strong> → LLM processes commits → Changelog returned</li>
                    <li><strong>Optional</strong>: Push to GitHub via <code className="bg-white/10 px-1 py-0.5 rounded text-white">updateOrCreateFile</code></li>
                </ol>
            </section>
        </div>
    );
}
