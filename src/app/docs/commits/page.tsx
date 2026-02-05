import type { Metadata } from "next";
import Link from "next/link";
import { GitCommit, ArrowLeft, Check, X } from "lucide-react";

export const metadata: Metadata = {
    title: "Best Practices - GitLog AI",
    description: "Learn how to write better commit messages for automated changelogs.",
};

export default function CommitsDocsPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-green-900/20 border border-green-900/50">
                        <GitCommit className="h-8 w-8 text-green-400" />
                    </div>
                    <h1 className="text-4xl font-bold">Better Commits Guide</h1>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Why Commit Messages Matter</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Clear commit messages aren't just for your future self—they are the fuel for
                            **GitLog AI**. When you write structured commits, our AI can instantly categorize
                            changes, determine semantic version bumps, and generate beautiful changelogs without
                            guessing.
                        </p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-xl bg-red-950/20 border border-red-900/30">
                            <h3 className="flex items-center gap-2 text-red-400 font-bold mb-4">
                                <X className="h-5 w-5" /> Bad Practices
                            </h3>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li className="flex gap-2">❌ <span>"wip"</span></li>
                                <li className="flex gap-2">❌ <span>"fixed stuff"</span></li>
                                <li className="flex gap-2">❌ <span>"update"</span></li>
                                <li className="flex gap-2">❌ <span>"changes for meeting"</span></li>
                            </ul>
                            <p className="mt-4 text-xs text-red-300/60">
                                These trigger "Deep Inspection" (slower generation) or get categorized as "Other".
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-green-950/20 border border-green-900/30">
                            <h3 className="flex items-center gap-2 text-green-400 font-bold mb-4">
                                <Check className="h-5 w-5" /> Good Practices
                            </h3>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li className="flex gap-2">✅ <span>"feat: add dark mode"</span></li>
                                <li className="flex gap-2">✅ <span>"fix(auth): handle null session"</span></li>
                                <li className="flex gap-2">✅ <span>"docs: update API usage"</span></li>
                                <li className="flex gap-2">✅ <span>"chore: bump dependencies"</span></li>
                            </ul>
                            <p className="mt-4 text-xs text-green-300/60">
                                These are instantly parsed, categorized, and result in perfect changelogs.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Conventional Commits Cheat Sheet</h2>
                        <div className="overflow-hidden rounded-xl border border-gray-800">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-900 text-gray-300">
                                    <tr>
                                        <th className="p-4 font-medium">Type</th>
                                        <th className="p-4 font-medium">Description</th>
                                        <th className="p-4 font-medium">SemVer</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800 bg-gray-900/50">
                                    <tr className="hover:bg-gray-800/50">
                                        <td className="p-4 font-mono text-blue-400">feat</td>
                                        <td className="p-4 text-gray-400">New feature for the user</td>
                                        <td className="p-4 text-blue-300">MINOR</td>
                                    </tr>
                                    <tr className="hover:bg-gray-800/50">
                                        <td className="p-4 font-mono text-orange-400">fix</td>
                                        <td className="p-4 text-gray-400">Bug fix for the user</td>
                                        <td className="p-4 text-orange-300">PATCH</td>
                                    </tr>
                                    <tr className="hover:bg-gray-800/50">
                                        <td className="p-4 font-mono text-purple-400">! (bang)</td>
                                        <td className="p-4 text-gray-400">Breaking change (e.g. `feat!: ...`)</td>
                                        <td className="p-4 text-red-400">MAJOR</td>
                                    </tr>
                                    <tr className="hover:bg-gray-800/50">
                                        <td className="p-4 font-mono text-gray-400">docs</td>
                                        <td className="p-4 text-gray-400">Documentation only changes</td>
                                        <td className="p-4 text-gray-500">PATCH</td>
                                    </tr>
                                    <tr className="hover:bg-gray-800/50">
                                        <td className="p-4 font-mono text-gray-400">style</td>
                                        <td className="p-4 text-gray-400">Formatting, missing semi-colons, etc</td>
                                        <td className="p-4 text-gray-500">PATCH</td>
                                    </tr>
                                    <tr className="hover:bg-gray-800/50">
                                        <td className="p-4 font-mono text-gray-400">refactor</td>
                                        <td className="p-4 text-gray-400">Code change that neither fixes a bug nor adds a feature</td>
                                        <td className="p-4 text-gray-500">PATCH</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
