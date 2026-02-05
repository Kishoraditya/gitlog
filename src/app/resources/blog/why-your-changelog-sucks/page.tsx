import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Terminal, Bot, Layout, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Why Your Changelog Sucks (And How to Fix It)",
    description: "Stop writing changelogs that nobody reads. Learn the psychology of good release notes.",
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
                        Why Your Changelog Sucks <br />
                        <span className="text-gradient">(And How to Fix It)</span>
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 text-gray-500 text-xs font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-500" />
                            <span>Feb 1, 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-green-500" />
                            <span>Kishoraditya</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span>10 min read</span>
                        </div>
                    </div>
                </header>

                <div className="prose prose-invert prose-green max-w-none space-y-12 text-gray-300 leading-relaxed text-lg">
                    <p className="text-2xl text-white font-medium italic border-l-4 border-green-500 pl-6 py-2 bg-white/5 rounded-r-2xl">
                        &quot;Most changelogs are an after-thought. They are either a dry dump of Git commits or a vague &apos;Bug fixes and performance improvements&apos; note that tells the user absolutely nothing.&quot;
                    </p>

                    <h2 className="text-3xl font-black text-white mt-16 mb-6 uppercase tracking-tight flex items-center gap-3">
                        <Terminal className="h-8 w-8 text-green-500" />
                        The Technical Debt of Documentation
                    </h2>
                    <p>
                        Commits like <code>fix: repair memory leak</code> or <code>chore: update dependencies</code> are great for Git history, but they represent technical debt when converted directly to user-facing logs. Your users don&apos;t care about your worker threads; they care that the app is faster and more reliable.
                    </p>

                    {/* Scenario: The Human Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <Layout className="h-5 w-5 text-green-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest">Scenario 1: The UI Workflow</h3>
                        </div>
                        <p className="text-sm text-gray-400">Perfect for product managers and lead devs who want total control over the narrative.</p>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="h-6 w-6 rounded-full bg-white/10 text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">1</div>
                                <p className="text-sm"><span className="text-white font-bold">Connect:</span> Authenticate with GitHub and select your repository.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-6 w-6 rounded-full bg-white/10 text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">2</div>
                                <p className="text-sm"><span className="text-white font-bold">Analyze:</span> GitLog AI crawls your commits and generates a draft based on the delta between tags.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-6 w-6 rounded-full bg-white/10 text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">3</div>
                                <p className="text-sm"><span className="text-white font-bold">Polish:</span> Use our inline editor to categorize changes into &quot;🚀 Features&quot; and &quot;🛠️ Fixes&quot;.</p>
                            </div>
                        </div>
                    </div>

                    {/* Scenario: The API Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <Globe className="h-5 w-5 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest">Scenario 2: CI/CD Automation</h3>
                        </div>
                        <p className="text-sm text-gray-400">Automate your release notes inside GitHub Actions or GitLab CI.</p>
                        <div className="bg-black/60 rounded-xl p-4 font-mono text-xs border border-white/5">
                            <p className="text-blue-400"># Trigger generate via REST API</p>
                            <p className="mt-2 text-white">curl -X POST https://gitlog.ai/api/v1/generate \</p>
                            <p className="ml-4 text-white">-H &quot;Authorization: Bearer $GITLOG_TOKEN&quot; \</p>
                            <p className="ml-4 text-white">-d &apos;&#123; &quot;repo&quot;: &quot;owner/repo&quot;, &quot;to&quot;: &quot;v2.1.0&quot; &#125;&apos;</p>
                        </div>
                    </div>

                    {/* Scenario: The AI Agent Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Cpu className="h-5 w-5 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest">Scenario 3: AI Agents (MCP)</h3>
                        </div>
                        <p className="text-sm text-gray-400">Let your IDE (Claude Dev, Cursor) ask the context directly.</p>
                        <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 italic text-sm text-purple-300">
                            &quot;Claude, check the last 3 releases of this project via GitLog MCP and tell me if we introduced any breaking changes to the Auth module.&quot;
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-white mt-16 mb-4">Summary</h2>
                    <p>
                        Whether you are a human writing for humans, an engineer automating for teams, or an AI agent gathering context, GitLog AI provides the structured data layer your project history deserves. Stop writing boring logs—start telling your project&apos;s story.
                    </p>

                    <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] mt-24 text-center relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 h-64 w-64 bg-green-500/10 blur-[100px] pointer-events-none" />
                        <h3 className="text-3xl font-black text-white mb-4">Ready to fix your changelog?</h3>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Join 1,000+ developers who use GitLog AI to bridge the gap between code and community.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-10" asChild>
                                <Link href="/login">Get Started for Free</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/10 text-white h-14 px-10 glass hover:bg-white/5" asChild>
                                <Link href="/api-docs">Explore API</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
