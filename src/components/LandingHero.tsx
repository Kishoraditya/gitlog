"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Sparkles, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export function LandingHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-5xl mx-auto"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        v0.2.0 is Live
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.95] text-white">
                        Changelogs <br className="hidden md:block" />
                        <span className="text-white/40">that</span> <span className="text-gradient">Developers Trust.</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                        Turn your Git history into production-ready release notes.
                        <span className="text-slate-300 font-medium"> No more manual editing.</span>
                        Perfect for teams and AI agents.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                        <Button size="lg" className="h-14 px-8 text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 rounded-full" asChild>
                            <Link href="/login">
                                <Github className="mr-2 h-5 w-5" />
                                Sign In with GitHub
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-base glass border-white/10 hover:bg-white/5 text-white rounded-full group" asChild>
                            <Link href="/docs">
                                Read Documentation
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>

                    {/* Terminal / Demo Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="relative mx-auto max-w-4xl"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-xl blur opacity-20 animate-pulse"></div>
                        <div className="relative glass-dark rounded-xl border border-white/10 overflow-hidden text-left shadow-2xl">
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                </div>
                                <div className="flex-1 text-center text-[10px] font-mono text-slate-500">zsh — 80x24</div>
                            </div>

                            {/* Terminal Body */}
                            <div className="p-6 font-mono text-sm leading-relaxed text-slate-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-indigo-400">➜</span>
                                    <span className="text-cyan-400">~/project</span>
                                    <span className="text-slate-500">git commit -m "feat: add dark mode"</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-indigo-400">➜</span>
                                    <span className="text-cyan-400">~/project</span>
                                    <span className="text-white">gitlog generate</span>
                                </div>

                                <div className="pl-4 border-l-2 border-indigo-500/30 mb-4">
                                    <div className="text-indigo-300 mb-1">Analyzing 12 commits...</div>
                                    <div className="text-emerald-400 mb-2">✔ Changelog v1.0.2 generated</div>
                                    <br />
                                    <div className="text-white font-bold">## Features</div>
                                    <div className="text-slate-400">- Added dark mode theme support <span className="text-slate-600">(#124)</span></div>
                                    <div className="text-slate-400">- Implemented system preference detection</div>
                                    <br />
                                    <div className="text-white font-bold">## Fixes</div>
                                    <div className="text-slate-400">- Resolved layout shift on mobile</div>
                                </div>

                                <div className="flex items-center gap-2 animate-pulse">
                                    <span className="text-indigo-400">➜</span>
                                    <span className="text-cyan-400">~/project</span>
                                    <span className="w-2 h-4 bg-slate-500"></span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
