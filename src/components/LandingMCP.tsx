"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Cpu, Share2, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export function LandingMCP() {
    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-indigo-950/20">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                            <Cpu className="h-3 w-3" /> Machine Readable
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight tracking-tighter">
                            Context for your <br /><span className="text-indigo-400">AI Agents.</span>
                        </h2>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl font-light">
                            GitLog AI is a fully-fledged <strong className="text-white font-medium">Model Context Protocol (MCP) server</strong>.
                            Connect your local agents (Claude Desktop, IDEs) to get real-time awareness of your codebase evolution.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="p-5 rounded-xl border border-white/5 bg-white/5 hover:border-indigo-500/30 transition-colors">
                                <Bot className="h-6 w-6 text-indigo-400 mb-3" />
                                <span className="text-sm font-bold text-white block mb-1">Stdio MCP</span>
                                <span className="text-xs text-slate-500">For Claude Desktop & Local LLMs</span>
                            </div>
                            <div className="p-5 rounded-xl border border-white/5 bg-white/5 hover:border-indigo-500/30 transition-colors">
                                <Share2 className="h-6 w-6 text-teal-400 mb-3" />
                                <span className="text-sm font-bold text-white block mb-1">HTTP SSE</span>
                                <span className="text-xs text-slate-500">For Remote Agents & Webhooks</span>
                            </div>
                        </div>
                        <Button variant="outline" className="h-12 px-6 border-white/10 text-white hover:bg-white/5 rounded-full" asChild>
                            <Link href="/docs/mcp-integration">
                                <Code2 className="mr-2 h-4 w-4" />
                                View Integration Guide
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-dark p-1 rounded-3xl border-white/10 overflow-hidden shadow-2xl relative"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <Cpu className="w-64 h-64 text-indigo-500 animate-pulse" />
                        </div>
                        <div className="bg-slate-950/80 rounded-[1.4rem] p-8 font-mono text-xs text-slate-400 leading-relaxed border border-white/5 relative z-10 backdrop-blur-sm">
                            <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                            </div>
                            <p className="text-indigo-400 mb-4">// claude_desktop_config.json</p>
                            <p className="text-slate-300">&quot;mcpServers&quot;: &#123;</p>
                            <p className="ml-4 text-slate-300">&quot;gitlog&quot;: &#123;</p>
                            <p className="ml-8 text-teal-300">&quot;command&quot;: &quot;npx&quot;,</p>
                            <p className="ml-8 text-yellow-300">&quot;args&quot;: [&quot;-y&quot;, &quot;gitlog-mcp&quot;],</p>
                            <p className="ml-8 text-slate-500">&quot;env&quot;: &#123; &quot;GITHUB_TOKEN&quot;: &quot;...&quot; &#125;</p>
                            <p className="ml-4 text-slate-300">&#125;</p>
                            <p className="text-slate-300">&#125;</p>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-indigo-400 mb-2">// Agent Usage</p>
                                <p className="text-slate-300">&gt; @gitlog What features were added in the last release?</p>
                                <p className="text-emerald-400 mt-2">Analyzed v0.2.0: Added Dark Mode, fixed auth bug.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
