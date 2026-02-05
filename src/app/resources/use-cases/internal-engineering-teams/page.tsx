import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap, BarChart, Cpu, Layout, Globe, Command } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "GitLog AI for Engineering Teams",
    description: "Streamline communication between developers and stakeholders.",
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
                        Engineering <br />
                        <span className="text-gradient">Alignment.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Bridge the gap between raw commits and business value. GitLog AI automates the &quot;translation&quot; of engineering work into human-ready progress reports.
                    </p>
                </header>

                <div className="prose prose-invert prose-green max-w-none space-y-12 text-gray-300 leading-relaxed text-lg">
                    <p>
                        Developer time is expensive. Spending those hours writing status updates for product managers or stakeholders is a drain on project velocity. GitLog AI ensures that every branch merge is documented without pulling a single dev off-task.
                    </p>

                    <h2 className="text-3xl font-black text-white mt-16 flex items-center gap-3 uppercase tracking-tight">
                        <BarChart className="h-8 w-8 text-blue-500" />
                        Enterprise Scenarios
                    </h2>

                    {/* Scenario: The PM Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <Layout className="h-5 w-5 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest text-sm">Human Scenario: The Stakeholder Sync</h3>
                        </div>
                        <p className="text-sm text-gray-400">Perfect for technical program managers who need high-level summaries without touching the CLI.</p>
                        <div className="space-y-4 text-sm">
                            <div className="flex gap-4">
                                <div className="h-6 w-6 rounded-full bg-white/10 text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">1</div>
                                <p><strong className="text-white">Filter:</strong> Filter repositories by department or project team inside the GitLog dashboard.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-6 w-6 rounded-full bg-white/10 text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">2</div>
                                <p><strong className="text-white">Export:</strong> Copy the AI-summarized changelog directly into Slack, MS Teams, or a Confluence page.</p>
                            </div>
                        </div>
                    </div>

                    {/* Scenario: The API Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <Command className="h-5 w-5 text-green-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest text-sm">Automation Scenario: Jira Integration</h3>
                        </div>
                        <p className="text-sm text-gray-400">Automatically update Jira tickets when a version is generated via CLI.</p>
                        <div className="bg-black/60 rounded-xl p-4 font-mono text-xs border border-white/5">
                            <p className="text-green-400">gitlog generate --to HEAD --jira-sync --token $JIRA_API_KEY</p>
                        </div>
                    </div>

                    {/* Scenario: The MCP Agent Path */}
                    <div className="glass-dark p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Cpu className="h-5 w-5 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest text-sm">Machine Scenario: The AI Architect</h3>
                        </div>
                        <p className="text-sm text-gray-400">Internal AI managers use the MCP server to verify if security patches were applied across all microservices.</p>
                        <div className="bg-gray-900 border border-purple-500/20 rounded-xl p-6 italic text-sm text-purple-300">
                            &quot;Check all services in the &apos;payment-gateway&apos; cluster. Have they all been updated with the CVE-2026-X patch according to their changelogs?&quot;
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-white mt-16 flex items-center gap-3 uppercase tracking-tight">
                        <ShieldCheck className="h-8 w-8 text-green-500" />
                        On-Premise Deployment
                    </h2>
                    <p>
                        For teams with strict data residency requirements, GitLog AI can be deployed behind your VPC.
                    </p>
                    <div className="bg-black border border-white/10 rounded-2xl p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                        <p className="text-gray-500 mb-4"># Deploy to local cluster</p>
                        <p className="text-white">helm install gitlog-ai ./charts/gitlog --set license=$LICENSE_KEY</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] mt-24 text-center">
                        <h3 className="text-3xl font-black text-white mb-4">Reclaim Engineering Hours</h3>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Focus on building, not documenting. Let GitLog AI align your team automatically.</p>
                        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-10" asChild>
                            <Link href="/login">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
