"use client";

import { motion } from "framer-motion";
import {
    Zap, Search, Languages, FileJson, Sparkles, Share2,
    Cpu, ShieldCheck, History, Key, Database, Lock
} from "lucide-react";

const features = [
    { title: "Smart Sync", desc: "Native GitHub OAuth integration.", icon: Zap },
    { title: "Deep Inspection", desc: "LLM analysis of commit titles.", icon: Search },
    { title: "Multi-Lingual", desc: "English, Hindi, Spanish, German.", icon: Languages },
    { title: "Custom Formats", desc: "Keep a Changelog, raw Markdown.", icon: FileJson },
    { title: "Semver Bot", desc: "Automated version suggestions.", icon: Sparkles },
    { title: "Push to Repo", desc: "Direct CHANGELOG.md updates.", icon: Share2 },
    { title: "MCP Server", desc: "Technical repo awareness.", icon: Cpu },
    { title: "Rate Limited", desc: "IP and token-based protection.", icon: ShieldCheck },
    { title: "History Hub", desc: "Unified dashboard for history.", icon: History },
    { title: "BYOK Enabled", desc: "Use your own API keys for LLMs.", icon: Key },
    { title: "Cache Layer", desc: "Fast responses via Redis & LRU.", icon: Database },
    { title: "Privacy First", desc: "No source code stored.", icon: Lock },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

export function LandingFeatures() {
    return (
        <section className="py-32 relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter">
                        The Complete <span className="text-indigo-400">Toolkit.</span>
                    </h2>
                    <p className="text-lg text-slate-400">
                        Everything you need to automate your release workflow, built for scale.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {features.map((feature, i) => (
                        <motion.div
                            variants={item}
                            key={i}
                            className="group p-6 glass border border-white/5 rounded-2xl hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300"
                        >
                            <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                                <feature.icon className="h-5 w-5 text-indigo-400" />
                            </div>
                            <h3 className="text-sm font-bold mb-2 text-white group-hover:text-indigo-100 transition-colors">{feature.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
