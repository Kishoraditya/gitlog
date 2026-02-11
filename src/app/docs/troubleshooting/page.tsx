"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, AlertCircle } from "lucide-react";

export default function TroubleshootingPage() {
    return (
        <div className="space-y-8">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <ShieldCheck className="h-3 w-3" /> Support
                </div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-4">Troubleshooting</h1>
                <p className="text-lg text-slate-400">
                    Common issues and how to fix them.
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. "Failed to generate changelog"</h2>
                <Alert variant="destructive" className="bg-red-900/10 border-red-900/20 text-red-300 mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Common Cause</AlertTitle>
                    <AlertDescription>
                        This usually happens due to missing or invalid API keys.
                    </AlertDescription>
                </Alert>
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                    <li>Check <code className="bg-white/10 px-1 py-0.5 rounded text-white">OPENROUTER_API_KEY</code> in your environment variables.</li>
                    <li>Ensure you haven't hit the OpenRouter rate limits.</li>
                    <li>Verify that the selected commit range actually contains commits.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. "No repositories found"</h2>
                <p className="text-slate-400 mb-4">
                    If your dashboard shows an empty repository list:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                    <li><strong>Scope Issue</strong>: Your GitHub OAuth token might lack the <code className="bg-white/10 px-1 py-0.5 rounded text-white">repo</code> scope. Try logging out and back in.</li>
                    <li><strong>Private Repositories</strong>: By default, we only fetch public repos unless you granted private access.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Build Failures</h2>
                <p className="text-slate-400 mb-4">
                    If deployment fails on Vercel or Railway:
                </p>
                <CodeBlock language="json" code={`// package.json script should be:
"build": "prisma generate && next build"`} />
                <p className="text-slate-400 mt-4">
                    Ensure <code className="bg-white/10 px-1 py-0.5 rounded text-white">DATABASE_URL</code> is correctly set in your deployment environment variables.
                </p>
            </section>
        </div>
    );
}
