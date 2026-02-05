"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    BarChart3,
    Users,
    Database,
    ExternalLink,
    Settings2,
    Activity,
    ShieldAlert,
    TrendingUp,
    Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const { data: session, status } = useSession();

    if (status === "loading") return <div className="p-8 text-gray-500">Loading auth...</div>;

    const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!isAdmin) {
        redirect("/dashboard");
    }

    const stats = [
        { label: "Total Users", value: "1,284", icon: Users, change: "+12%", color: "text-blue-400" },
        { label: "Changelogs Generated", value: "8,921", icon: Activity, change: "+24%", color: "text-green-400" },
        { label: "Connected Repos", value: "452", icon: Database, change: "+5%", color: "text-purple-400" },
        { label: "Avg Execution Time", value: "3.2s", icon: Clock, change: "-0.4s", color: "text-yellow-400" },
    ];

    const externalTools = [
        {
            name: "PostHog Analytics",
            desc: "User paths, event tracking, and ingestion monitoring.",
            href: "https://app.posthog.com",
            icon: BarChart3,
            color: "bg-orange-500/10 text-orange-400"
        },
        {
            name: "GrowthBook Features",
            desc: "Feature flags, A/B tests, and remote config.",
            href: "https://app.growthbook.io",
            icon: Settings2,
            color: "bg-indigo-500/10 text-indigo-400"
        },
        {
            name: "Supabase Database",
            desc: "Direct DB access, auth logs, and RLS management.",
            href: "https://supabase.com",
            icon: Database,
            color: "bg-emerald-500/10 text-emerald-400"
        }
    ];

    return (
        <div className="space-y-8 pb-12">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <ShieldAlert className="h-8 w-8 text-red-500" />
                        Admin Console
                    </h1>
                    <p className="text-gray-400 mt-1 italic">Platform management and insights.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-green-500 font-bold glass px-3 py-1.5 rounded-full border-green-500/20">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        PRODUCTION STABLE
                    </span>
                </div>
            </header>

            <div className="grid md:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="glass-dark border-white/5">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className={`p-2 rounded-lg bg-white/5 ${s.color}`}>
                                        <s.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-bold text-green-400 flex items-center gap-0.5">
                                        <TrendingUp className="h-3 w-3" />
                                        {s.change}
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-3xl font-bold text-white">{s.value}</h3>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">{s.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
                <Card className="glass border-white/5">
                    <CardHeader>
                        <CardTitle className="text-lg">Administrative Controls</CardTitle>
                        <CardDescription>Direct navigation to feature and user management.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start gap-3 glass border-white/5 hover:border-green-500/20" asChild>
                            <Link href="/admin/users">
                                <Users className="h-4 w-4" /> Manage Total User Base
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3 glass border-white/5 hover:border-green-500/20" asChild>
                            <Link href="/admin/repos">
                                <Database className="h-4 w-4" /> System-wide Repository Audit
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3 glass border-white/5 hover:border-green-500/20" asChild>
                            <Link href="/admin/compliance">
                                <ShieldAlert className="h-4 w-4" /> Privacy & Compliance Logs
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="glass border-white/5">
                    <CardHeader>
                        <CardTitle className="text-lg">Infrastructure Tools</CardTitle>
                        <CardDescription>External platforms for monitoring and config.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {externalTools.map((tool) => (
                            <Link key={tool.name} href={tool.href} target="_blank" className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${tool.color}`}>
                                        <tool.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{tool.name}</h4>
                                        <p className="text-xs text-gray-500">{tool.desc}</p>
                                    </div>
                                </div>
                                <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors" />
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
