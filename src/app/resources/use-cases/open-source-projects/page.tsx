import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Globe, Users, Heart, Cpu, Code, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "GitLog AI for Open Source Projects",
    description: "Empower your contributors and users with transparent, automated changelogs.",
};

export default function UseCasePage() {
    return (
        <article className="min-h-screen bg-mesh py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/resources/use-cases" className="inline-flex items-center gap-2 text-green-500 text-sm font-medium mb-12 hover:underline transition-all hover:gap-3">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Use Cases
                </Link>

                <header className="mb-16">
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter uppercase">
                        Open Source <br />
                        <span className="text-gradient">Efficiency.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Transparency is the foundation of every great OSS project. GitLog AI makes that transparency effortless for maintainers and visible for users.
                    </p>
                </header>

                <div className="prose prose-invert prose-green max-w-none space-y-12 text-gray-300 leading-relaxed text-lg">
                    <p>
                        Maintaining an open-source project is a labor of love. But as your project grows, so does the administrative burden. Tracking every contributor&apos;s pull request shouldn&apos;t be a manual task.
                    </p>

                    <h2 className="text-3xl font-black text-white mt-16 flex items-center gap-3 uppercase tracking-tight">
                        <Users className="h-8 w-8 text-green-500" />
                        Community Scenarios
                    </h2>

                    {/* Scenario: The Contributor Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <Heart className="h-5 w-5 text-green-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest text-sm">Case 1: The New Contributor</h3>
                        </div>
                        <p className="text-sm text-gray-400">Ensure every single PR gets the recognition it deserves in the final release.</p>
                        <div className="bg-black/40 p-6 rounded-2xl border border-white/5 italic text-sm text-gray-400">
                            &quot;I merged a small fix for the CSS grid and was surprised to see my name automatically listed in the v1.2.0 changelog. It made me want to contribute more.&quot;
                        </div>
                    </div>

                    {/* Scenario: The AI Agent Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Cpu className="h-5 w-5 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest text-sm">Case 2: Dependency Awareness</h3>
                        </div>
                        <p className="text-sm text-gray-400">AI agents use GitLog to determine if a project dependency is safe to update.</p>
                        <div className="bg-gray-900 border border-purple-500/20 rounded-xl p-6 font-mono text-xs text-purple-400">
                            gitlog query --repo "facebook/react" --since v18.0.0 --contains "breaking"
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-white mt-16 flex items-center gap-3 uppercase tracking-tight">
                        <Zap className="h-8 w-8 text-yellow-500" />
                        Host Your Own Instance
                    </h2>
                    <p>
                        Large OSS projects can host their own dedicated GitLog instance to provide custom changelog portals for their community.
                    </p>
                    <div className="bg-black border border-white/10 rounded-2xl p-8 font-mono text-sm leading-relaxed">
                        <p className="text-gray-500 mb-4"># Deploy via Docker</p>
                        <p className="text-white mb-2">docker-compose up -d gitlog-ai</p>
                        <p className="text-gray-500 mt-6 mb-4"># Connect your GitHub App</p>
                        <p className="text-white">GITLOG_GITHUB_APP_ID=123456</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] mt-24 text-center">
                        <h3 className="text-3xl font-black text-white mb-4">Empower Your Community</h3>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Build trust through transparency. Start generating professional release notes today.</p>
                        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-10" asChild>
                            <Link href="/login">Get Started for OSS</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
