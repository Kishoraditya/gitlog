"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function LandingCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center glass border-white/5 p-12 md:p-20 rounded-[2.5rem] relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>

                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white tracking-tighter relative z-10">
                        Open Source. <br />
                        <span className="text-gradient">Community First.</span>
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed font-light relative z-10">
                        GitLog AI is free for everyone. We rely on community support to cover our yearly infrastructure costs.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        <Button size="lg" className="h-14 px-10 bg-white text-slate-900 hover:bg-slate-200 rounded-full text-base font-bold shadow-xl shadow-white/10" asChild>
                            <Link href="/login">Connect My GitHub</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-10 glass border-white/10 text-white hover:bg-white/5 rounded-full text-base group" asChild>
                            <Link href="/resources/use-cases">
                                View Use Cases
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
