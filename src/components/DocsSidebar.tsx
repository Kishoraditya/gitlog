"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Cpu, ShieldCheck, Terminal, Rocket, Settings, FileText } from "lucide-react";

export function DocsSidebar() {
    const pathname = usePathname();

    const items = [
        {
            title: "Getting Started",
            items: [
                { title: "Introduction", href: "/docs", icon: Book },
                { title: "Manual Setup", href: "/docs/manual-setup", icon: Terminal },
                { title: "Architecture", href: "/docs/architecture", icon: Settings },
            ],
        },
        {
            title: "Integrations",
            items: [
                { title: "MCP Server", href: "/docs/mcp-integration", icon: Cpu },
                { title: "Troubleshooting", href: "/docs/troubleshooting", icon: ShieldCheck },
            ],
        },
        {
            title: "Guides",
            items: [
                { title: "Writing Changelogs", href: "/docs/guides/how-to-write-good-changelogs", icon: FileText },
                { title: "AI Context", href: "/docs/guides/why-agents-need-context", icon: Rocket },
            ],
        },
    ];

    return (
        <div className="w-64 border-r border-white/5 h-screen sticky top-16 hidden lg:block bg-slate-950/50 backdrop-blur-xl">
            <ScrollArea className="h-full py-6 pr-4 pl-6">
                <div className="space-y-8">
                    {items.map((section, i) => (
                        <div key={i}>
                            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                {section.title}
                            </h4>
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                            pathname === item.href
                                                ? "bg-indigo-500/10 text-indigo-400"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "h-4 w-4 transition-colors",
                                            pathname === item.href ? "text-indigo-400" : "text-slate-500 group-hover:text-white"
                                        )} />
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
