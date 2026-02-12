"use client";

import { useSession } from "next-auth/react";
import { Coffee, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TipJar } from "./TipJar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function FloatingTipJar() {
    const { data: session } = useSession();
    const [isExpanded, setIsExpanded] = useState(false);

    // Only show for authenticated users as requested in earlier phases
    if (!session) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="w-80"
                    >
                        <div className="relative group">
                            <TipJar />
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-950 border border-white/10 text-white flex items-center justify-center hover:bg-gray-900 transition-colors shadow-2xl"
                            >
                                <span className="text-[10px] font-bold">×</span>
                            </button>

                            {/* Updated GitHub Link directly in the floating modal */}
                            <div className="mt-4 flex gap-2">
                                <Button variant="outline" className="flex-1 bg-black/40 border-white/10 text-[10px] h-8 text-gray-400 hover:text-white" asChild>
                                    <a href="https://github.com/gitlog" target="_blank" rel="noopener noreferrer">
                                        <Github className="h-3 w-3 mr-2" />
                                        Repository
                                    </a>
                                </Button>
                                <Button variant="outline" className="flex-1 bg-black/40 border-white/10 text-[10px] h-8 text-gray-400 hover:text-white" asChild>
                                    <a href="mailto:kishoradityasc@gmail.com">
                                        Support
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="collapsed"
                        layoutId="tipjar"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsExpanded(true)}
                        className="h-12 w-12 rounded-full bg-green-600 shadow-lg shadow-green-900/40 flex items-center justify-center text-white border-2 border-white/20"
                    >
                        <Coffee className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
