import Link from "next/link";
import { ShieldCheck, Lock, Eye, Download, Trash2, Scale, Globe, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CompliancePage() {
    const policies = [
        {
            title: "Data Minimization",
            desc: "We only store commit metadata and repository names. No source code is ever stored on our servers.",
            icon: ShieldCheck,
            status: "Active"
        },
        {
            title: "Right to Erasure",
            desc: "Users can permanently delete their account and all associated data with a single click in settings.",
            icon: Trash2,
            status: "Compliant"
        },
        {
            title: "Data Portability",
            desc: "Export your entire generation history as JSON at any time.",
            icon: Download,
            status: "Available"
        },
        {
            title: "Encryption",
            desc: "All data in transit and at rest is encrypted using industry-standard AES-256.",
            icon: Lock,
            status: "Verified"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-950 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold mb-6">
                        <Globe className="h-3 w-3" />
                        TRUST & TRANSPARENCY
                    </div>
                    <h1 className="text-5xl font-black mb-6 tracking-tight text-white">Compliance Center</h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        At GitLog AI, your data privacy isn&apos;t just a policy—it&apos;s a technical architecture choice.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {policies.map((p) => (
                        <Card key={p.title} className="glass-dark border-white/5 overflow-hidden">
                            <CardHeader className="relative">
                                <div className="absolute top-4 right-4 text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded">
                                    {p.status}
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                                    <p.icon className="h-6 w-6 text-green-400" />
                                </div>
                                <CardTitle className="text-xl text-white">{p.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="glass border-white/10 bg-gradient-to-br from-green-500/5 to-transparent">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="h-5 w-5 text-green-500" />
                            Regulatory Adherence
                        </CardTitle>
                        <CardDescription>We aim to exceed standard data protection requirements.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-white text-sm">GDPR Ready</h4>
                                <p className="text-xs text-gray-500 mt-1 italic leading-relaxed">
                                    Full support for Right to Access, Right to Rectification, and Right to be Forgotten.
                                    Our servers are located in data centers that maintain strict SOC 2 Type II compliance.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-white text-sm">Open Source Commitment</h4>
                                <p className="text-xs text-gray-500 mt-1 italic leading-relaxed">
                                    We believe transparency is the ultimate security. Users can audit how we handle tokens
                                    and data in our public repository.
                                </p>
                            </div>
                        </div>

                        <Separator className="bg-white/10" />

                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                                Last Audit: February 2026
                            </div>
                            <Link href="/privacy" className="text-xs text-green-400 hover:underline">
                                View Full Privacy Policy →
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-600 mb-6">
                        Got specific compliance questions? Feel free to reach out.
                    </p>
                    <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
