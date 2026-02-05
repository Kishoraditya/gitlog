"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
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
    Clock,
    AlertCircle,
    CreditCard
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MailingCenter } from "@/components/admin/MailingCenter";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then(res => res.json())
            .then(data => {
                setStats(data.stats);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (status === "loading") return <div className="p-8 text-gray-500">Loading auth...</div>;

    const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!isAdmin) {
        redirect("/dashboard");
    }

    const externalTools = [
        {
            name: "PostHog Analytics",
            desc: "User paths, event tracking, and session recordings.",
            href: "https://app.posthog.com",
            icon: BarChart3,
            color: "bg-orange-500/10 text-orange-400"
        },
        {
            name: "Sentry Monitoring",
            desc: "Error tracking, performance, and alerting.",
            href: "https://sentry.io",
            icon: AlertCircle,
            color: "bg-purple-500/10 text-purple-400"
        },
        {
            name: "GrowthBook Flags",
            desc: "Feature flags, A/B tests, and remote config.",
            href: "https://app.growthbook.io",
            icon: Settings2,
            color: "bg-indigo-500/10 text-indigo-400"
        },
        {
            name: "Razorpay Payments",
            desc: "Manage tips, payments, and payouts.",
            href: "https://dashboard.razorpay.com",
            icon: CreditCard,
            color: "bg-blue-500/10 text-blue-400"
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
                    <p className="text-gray-400 mt-1 italic">Unified Command Center for GitLog AI.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-green-500 font-bold glass px-3 py-1.5 rounded-full border-green-500/20">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        SYSTEMS OPERATIONAL
                    </span>
                </div>
            </header>

            <div className="grid md:grid-cols-4 gap-6">
                {(loading ? Array(4).fill({}) : stats).map((s, i) => (
                    <motion.div
                        key={s.label || i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="glass-dark border-white/5 h-full">
                            <CardContent className="p-6">
                                {loading ? (
                                    <div className="animate-pulse space-y-3">
                                        <div className="h-8 w-8 bg-white/5 rounded-lg"></div>
                                        <div className="h-8 w-16 bg-white/5 rounded"></div>
                                        <div className="h-4 w-24 bg-white/5 rounded"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-start">
                                            <div className={`p-2 rounded-lg bg-white/5 ${s.color}`}>
                                                {i === 0 && <Users className="h-5 w-5" />}
                                                {i === 1 && <Activity className="h-5 w-5" />}
                                                {i === 2 && <Database className="h-5 w-5" />}
                                                {i === 3 && <TrendingUp className="h-5 w-5" />}
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
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-12">
                <div className="lg:col-span-2 space-y-8">
                    <MailingCenter />

                    <Card className="glass border-white/5">
                        <CardHeader>
                            <CardTitle className="text-lg">Administrative Controls</CardTitle>
                            <CardDescription>Direct navigation to feature and user management.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 gap-4">
                            <Button variant="outline" className="justify-start gap-3 glass border-white/5 hover:border-green-500/20" asChild>
                                <Link href="/admin/users">
                                    <Users className="h-4 w-4" /> Manage User Base
                                </Link>
                            </Button>
                            <Button variant="outline" className="justify-start gap-3 glass border-white/5 hover:border-green-500/20" asChild>
                                <Link href="/admin/repos">
                                    <Database className="h-4 w-4" /> Repository Audit
                                </Link>
                            </Button>
                            <Button variant="outline" className="justify-start gap-3 glass border-white/5 hover:border-green-500/20" asChild>
                                <Link href="/admin/compliance">
                                    <ShieldAlert className="h-4 w-4" /> Compliance Logs
                                </Link>
                            </Button>
                            <Button variant="outline" className="justify-start gap-3 glass border-white/5 hover:border-green-500/20" asChild>
                                <Link href="/admin/billing">
                                    <CreditCard className="h-4 w-4" /> Billing & Tipping
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="glass border-white/5 h-full">
                        <CardHeader>
                            <CardTitle className="text-lg">Infrastructure Tools</CardTitle>
                            <CardDescription>Direct access to external monitoring.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {externalTools.map((tool) => (
                                <Link key={tool.name} href={tool.href} target="_blank" className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all group active:scale-95">
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
        </div>
    );
}
