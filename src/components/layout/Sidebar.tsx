"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    GitBranch,
    History,
    FileText,
    LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarItems = [
    {
        title: "Repositories",
        href: "/repos",
        icon: LayoutDashboard,
    },
    {
        title: "Generate",
        href: "/generate",
        icon: FileText,
    },
    {
        title: "History",
        href: "/history",
        icon: History,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-gray-900 text-white">
            <div className="flex h-16 items-center border-b border-gray-800 px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <GitBranch className="h-6 w-6 text-green-400" />
                    <span>GitLog AI</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-800",
                                pathname === item.href || pathname?.startsWith(item.href + "/")
                                    ? "bg-gray-800 text-green-400"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="border-t border-gray-800 p-4">
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-9 w-9 border border-gray-700">
                        <AvatarImage src={session?.user?.image || ""} />
                        <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium">
                            {session?.user?.name}
                        </span>
                        <span className="truncate text-xs text-gray-500">
                            Free Plan
                        </span>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-gray-800"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
