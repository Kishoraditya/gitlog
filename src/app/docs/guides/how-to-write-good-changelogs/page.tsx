"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { FileText } from "lucide-react";

export default function WritingChangelogsGuide() {
    return (
        <div className="space-y-8">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <FileText className="h-3 w-3" /> Best Practices
                </div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-4">Writing Good Changelogs</h1>
                <p className="text-lg text-slate-400">
                    A changelog is a love letter to your users. Here is how to write one that matters.
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">The "Keep a Changelog" Standard</h2>
                <p className="text-slate-400 mb-4">
                    We follow the <a href="https://keepachangelog.com" className="text-indigo-400 hover:underline">Keep a Changelog</a> conventions. A good changelog entry should:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                    <li>Group changes by type (Added, Changed, Deprecated, Removed, Fixed, Security).</li>
                    <li>List the release date and version number.</li>
                    <li>Be written for humans, not machines (skip obscure internal refactors).</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Example Structure</h2>
                <CodeBlock language="markdown" code={`## [1.0.0] - 2024-02-11

### Added
- New "Dark Mode" toggle in settings.
- Support for Spanish and German languages.

### Fixed
- Resolved crash when parsing empty commit messages.
- Fixed layout shift on mobile devices.`} />
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">How GitLog Helps</h2>
                <p className="text-slate-400">
                    GitLog AI analyzes your raw commit history and automatically categorizes them into these sections. It filters out noise (like "fix typo" or "merge branch") and synthesizes related commits into single, readable bullet points.
                </p>
            </section>
        </div>
    );
}
