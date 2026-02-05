import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Github, Code, FileJson, Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";

export const metadata: Metadata = {
    title: "Getting Started Tutorial",
    description: "Learn how to generate your first changelog with GitLog AI in 5 minutes.",
};

const steps = [
    {
        number: "01",
        title: "Connect Your GitHub",
        description: "Click 'Login with GitHub' on the homepage. Grant access to your public or private repositories via OAuth.",
        icon: Github,
        color: "text-blue-500",
    },
    {
        number: "02",
        title: "Select a Repository",
        description: "From your personal dashboard, choose the project you want to generate a release note for.",
        icon: Code,
        color: "text-green-500",
    },
    {
        number: "03",
        title: "Define Commit Range",
        description: "Select the starting point (usually your last tag) and the ending point (usually HEAD).",
        icon: Sparkles,
        color: "text-yellow-500",
    },
    {
        number: "04",
        title: "Select Output Format",
        description: "Choose between 'Keep a Changelog' (Markdown), 'Standard JSON', or raw text for plain release notes.",
        icon: FileJson,
        color: "text-purple-500",
    },
    {
        number: "05",
        title: "Generate & Deploy",
        description: "Click 'Generate'. Review the AI's suggestions, edit if needed, and push directly to your repository.",
        icon: Send,
        color: "text-blue-400",
    },
];

export default function TutorialPage() {
    return (
        <div className="min-h-screen bg-mesh py-24 px-4 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-24 relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
                        5 Minute <br />
                        <span className="text-gradient">Quickstart.</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        From zero to professional release notes in five simple steps. No complex configuration required.
                    </p>
                </div>

                <div className="space-y-8 relative">
                    {/* Progress Line */}
                    <div className="absolute left-[39px] top-10 bottom-10 w-px bg-white/5 md:block hidden" />

                    {steps.map((step, idx) => (
                        <div key={step.number} className="relative group">
                            <div className="md:flex gap-12 items-start">
                                <div className="hidden md:flex flex-col items-center">
                                    <div className="h-20 w-20 rounded-[2rem] glass-dark border border-white/10 flex items-center justify-center text-xl font-black text-white group-hover:border-green-500/50 transition-colors bg-black/40 relative z-10">
                                        {step.number}
                                    </div>
                                </div>

                                <Card className="flex-1 glass border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 rounded-[2.5rem] p-4 md:p-8 shadow-2xl overflow-hidden group-hover:border-white/10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center ${step.color}`}>
                                            <step.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>

                                    {/* Abstract background element */}
                                    <div className="absolute top-0 right-0 h-32 w-32 bg-white/[0.02] rounded-bl-full pointer-events-none" />
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center space-y-6">
                    <Button size="lg" className="h-16 px-12 bg-white text-black hover:bg-gray-200 text-lg font-black uppercase tracking-widest rounded-2xl" asChild>
                        <Link href="/login">
                            Launch Your First Log
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <Link href="/resources" className="text-sm font-bold text-gray-500 hover:text-green-500 transition-colors uppercase tracking-[0.2em]">
                            ← Return to Resources
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
