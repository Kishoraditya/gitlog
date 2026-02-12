"use client";

import { useEffect, useState } from "react";
import { Coffee, Target, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TipJar() {
    const [stats, setStats] = useState({ total: 0, goal: 150 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/tips/stats");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch tip stats");
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const percentage = Math.min((stats.total / stats.goal) * 100, 100);

    return (
        <Card className="glass-dark border-white/5 shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-white">
                    <Target className="h-4 w-4 text-green-500" />
                    2026 Operational Goal
                </CardTitle>
                <CardDescription className="text-xs text-gray-400">
                    Help us reach $150 to keep GitLog AI free & running for a full year.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        <span>Progress</span>
                        <div className="flex items-center gap-1.5">
                            {isLoading && <Loader2 className="h-2 w-2 animate-spin" />}
                            <span className="text-white">
                                ${stats.total.toLocaleString()} / ${stats.goal}
                            </span>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                        />
                    </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed italic">
                    All tips go directly towards infra costs (Vercel, Supabase, LLM tokens). No salaries, just servers.
                </p>

                <div className="space-y-2">
                    <Button variant="default" className="w-full bg-white text-black hover:bg-gray-200 text-xs font-bold h-9">
                        <Coffee className="h-4 w-4 mr-2" />
                        Drop a Tip
                    </Button>

                    {/* Product Hunt Upvote - Added per Phase 23 */}
                    <Link href="https://www.producthunt.com/products/gitlog?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-gitlog" target="_blank">
                        <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 text-[10px] font-bold h-8 flex items-center justify-center gap-2 mt-2">
                            <span className="text-[#FF6154]">P</span>
                            Upvote on Product Hunt
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

import Link from "next/link";
