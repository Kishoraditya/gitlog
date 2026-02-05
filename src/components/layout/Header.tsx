"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GitBranch, User, LogOut, LayoutDashboard, Settings, ShieldCheck } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 w-full glass-dark border-b border-white/10">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                    >
                        <GitBranch className="h-6 w-6 text-green-500" />
                    </motion.div>
                    <span className="font-bold text-xl tracking-tight text-white group-hover:text-green-400 transition-colors">
                        GitLog AI
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/resources" className="text-sm font-medium text-gray-400 hover:text-green-400 transition-colors">
                        Resources
                    </Link>
                    <Link href="/faq" className="text-sm font-medium text-gray-400 hover:text-green-400 transition-colors">
                        FAQ
                    </Link>
                    <Link href="/api-docs" className="text-sm font-medium text-gray-400 hover:text-green-400 transition-colors">
                        API
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/10 p-0 overflow-hidden hover:border-green-500/50 transition-colors">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                                        <AvatarFallback className="bg-green-900/20 text-green-400">
                                            {session.user?.name?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 glass-dark border-white/10 text-gray-200" align="end">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none text-white">{session.user?.name}</p>
                                        <p className="text-xs leading-none text-gray-400">{session.user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard" className="cursor-pointer flex items-center gap-2 focus:bg-green-500/10 focus:text-green-400">
                                        <LayoutDashboard className="h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className="cursor-pointer flex items-center gap-2 focus:bg-green-500/10 focus:text-green-400">
                                        <Settings className="h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                {session.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin" className="cursor-pointer flex items-center gap-2 focus:bg-purple-500/10 focus:text-purple-400">
                                            <ShieldCheck className="h-4 w-4" />
                                            Admin Portal
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem
                                    className="cursor-pointer flex items-center gap-2 text-red-400 focus:bg-red-500/10 focus:text-red-400"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white px-3 py-2 transition-colors">
                                Log In
                            </Link>
                            <Button asChild className="bg-green-600 hover:bg-green-500 text-white border-none shadow-lg shadow-green-900/20">
                                <Link href="/login">Get Started</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
