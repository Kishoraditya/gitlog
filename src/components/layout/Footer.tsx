"use client";

import Link from "next/link";
import { GitBranch, Github, Linkedin, Mail, Globe, Sparkles, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Footer() {
    return (
        <footer className="transparent border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6 relative z-10">
                {/* Top Layer: Branding & Subscription */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 pb-16 border-b border-white/5">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <GitBranch className="h-6 w-6 text-green-500 group-hover:rotate-12 transition-transform" />
                            <span className="font-black text-2xl text-white tracking-tighter uppercase">GitLog AI</span>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                            Modernizing release management with AI-powered changelogs.
                            Precision documentation for developers and machines.
                        </p>
                    </div>
                    <div className="w-full md:w-auto min-w-[320px]">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">Stay Synchronized</h4>
                        <NewsletterForm />
                    </div>
                </div>

                {/* Middle Layer: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-20">
                    <div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Sparkles className="h-3 w-3 text-green-500" />
                            Platform
                        </h4>
                        <ul className="space-y-3">
                            <li><Link href="/dashboard" className="text-xs text-gray-500 hover:text-green-400 transition-colors">User Dashboard</Link></li>
                            <li><Link href="/api-docs" className="text-xs text-gray-500 hover:text-green-400 transition-colors">Public API Documentation</Link></li>
                            <li><Link href="/resources/tutorial" className="text-xs text-gray-500 hover:text-green-400 transition-colors">Integration Tutorial</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Knowledge</h4>
                        <ul className="space-y-3">
                            <li><Link href="/resources/blog" className="text-xs text-gray-500 hover:text-green-400 transition-colors">Engineering Blog</Link></li>
                            <li><Link href="/resources/use-cases" className="text-xs text-gray-500 hover:text-green-400 transition-colors">Implementation Use Cases</Link></li>
                            <li><Link href="/faq" className="text-xs text-gray-500 hover:text-green-400 transition-colors">Frequently Asked Questions</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Governance</h4>
                        <ul className="space-y-3">
                            <li><Link href="/terms" className="text-xs text-gray-500 hover:text-green-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-xs text-gray-500 hover:text-green-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/compliance" className="text-xs text-gray-500 hover:text-green-400 transition-colors">GDPR Compliance</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Layer: Legal & Social */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                            <p className="text-[10px] text-gray-600 font-medium">
                                © 2026 GitLog AI. Built with love by{" "}
                                <Link href="https://www.linkedin.com/in/kishoraditya/" target="_blank" className="hover:text-white transition-colors">Aditya</Link>,{" "}
                                <Link href="http://antigravity.google/" target="_blank" className="hover:text-white transition-colors">Antigravity</Link>,{" "}
                                <Link href="https://www.anthropic.com/" target="_blank" className="hover:text-white transition-colors">Claude</Link>, &{" "}
                                <Link href="https://gemini.google.com/" target="_blank" className="hover:text-white transition-colors">Gemini</Link>.
                            </p>
                            <div className="flex items-center gap-6">
                                <Link href="https://github.com/Kishoraditya/gitlog" target="_blank" className="text-gray-600 hover:text-white transition-colors">
                                    <Github className="h-4 w-4" />
                                </Link>
                                <Link href="https://www.linkedin.com/in/kishoraditya/" target="_blank" className="text-gray-600 hover:text-white transition-colors">
                                    <Linkedin className="h-4 w-4" />
                                </Link>
                                <Link href="mailto:kishoradityasc@gmail.com" className="text-gray-600 hover:text-white transition-colors">
                                    <Mail className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10">
                            <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Operational</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                            <Globe className="h-3 w-3" />
                            Global Support
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message);
                setEmail("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500/50 transition-colors"
                required
            />
            <Button
                type="submit"
                size="icon"
                disabled={isLoading}
                className="h-8 w-8 bg-green-600 hover:bg-green-500 text-white shrink-0"
            >
                {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
            </Button>
        </form>
    );
}
