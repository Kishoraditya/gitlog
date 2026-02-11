"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function ManualSetupPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-4">Manual Setup Guide</h1>
                <p className="text-lg text-slate-400">
                    Complete steps to configure GitLog AI for production environments.
                </p>
            </div>

            <Alert className="bg-indigo-500/10 border-indigo-500/20 text-indigo-300">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Prerequisites</AlertTitle>
                <AlertDescription>
                    Ensure you have Node.js 18+ and a PostgreSQL database ready.
                </AlertDescription>
            </Alert>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Environment Variables</h2>
                <p className="text-slate-400 mb-4">
                    Create a <code className="bg-white/10 px-1 py-0.5 rounded text-white">.env</code> file in the root directory.
                </p>
                <CodeBlock language="bash" code={`# Database
DATABASE_URL="postgresql://user:password@host:5432/gitlog"
DIRECT_URL="postgresql://user:password@host:5432/gitlog"

# Auth
NEXTAUTH_SECRET="your-32-character-random-string"
NEXTAUTH_URL="https://gitlog.ai"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-oauth-app-client-id"
GITHUB_CLIENT_SECRET="your-github-oauth-app-secret"

# LLM (OpenRouter)
OPENROUTER_API_KEY="sk-or-v1-xxxx"`} />
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Database Setup</h2>
                <p className="text-slate-400 mb-4">Run Prisma migrations to set up your schema:</p>
                <CodeBlock language="bash" code={`npx prisma migrate deploy`} />
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. GitHub OAuth App</h2>
                <ol className="list-decimal list-inside space-y-2 text-slate-400">
                    <li>Go to <Link href="https://github.com/settings/developers" className="text-indigo-400 hover:underline">GitHub Developer Settings</Link></li>
                    <li>Click <strong>New OAuth App</strong></li>
                    <li>Set Homepage URL to <code className="bg-white/10 px-1 py-0.5 rounded text-white">https://your-domain.com</code></li>
                    <li>Set Callback URL to <code className="bg-white/10 px-1 py-0.5 rounded text-white">https://your-domain.com/api/auth/callback/github</code></li>
                </ol>
            </section>
        </div>
    );
}
