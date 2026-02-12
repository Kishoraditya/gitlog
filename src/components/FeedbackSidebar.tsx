"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Send, Loader2, Bug, Lightbulb, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export function FeedbackSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState<"FEEDBACK" | "BUG" | "FEATURE">("FEEDBACK");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (content.length < 10) {
            toast.error("Feedback must be at least 10 characters long");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, content }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message);
                setContent("");
                setIsOpen(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to send feedback");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-40 rotate-90 origin-right rounded-b-none h-10 px-4 bg-green-600 hover:bg-green-500 text-white shadow-2xl transition-all hover:pr-6 group border-none"
            >
                <MessageSquare className="h-4 w-4 mr-2 -rotate-90 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Feedback</span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Sidebar Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-sm glass-dark border-l border-white/10 z-[60] p-8 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Give Feedback</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Feedback Type</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: "FEEDBACK", label: "General", icon: MessageCircle },
                                            { id: "BUG", label: "Bug", icon: Bug },
                                            { id: "FEATURE", label: "Idea", icon: Lightbulb },
                                        ].map((t) => (
                                            <button
                                                key={t.id}
                                                type="button"
                                                onClick={() => setType(t.id as any)}
                                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${type === t.id
                                                    ? "bg-green-600/20 border-green-500/50 text-white"
                                                    : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                                                    }`}
                                            >
                                                <t.icon className={`h-4 w-4 mb-2 ${type === t.id ? "text-green-400" : ""}`} />
                                                <span className="text-[10px] font-bold uppercase">{t.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</p>
                                    <textarea
                                        id="feedback-content"
                                        name="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Tell us what's on your mind..."
                                        className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-green-500/50 transition-colors resize-none"
                                        required
                                    />
                                    <p className="text-[10px] text-gray-500 italic">
                                        At least 10 characters. {content.length}/1000
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-widest text-xs"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" />
                                            Send Feedback
                                        </>
                                    )}
                                </Button>

                                <div className="pt-8 border-t border-white/5">
                                    <p className="text-[10px] text-gray-500 leading-relaxed text-center">
                                        Your feedback helps us prioritize the roadmap.
                                        {session ? (
                                            <span className="block mt-1 text-green-500/50">
                                                Logged in as {session.user?.email}
                                            </span>
                                        ) : (
                                            <span className="block mt-1">
                                                Sending anonymously.
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
