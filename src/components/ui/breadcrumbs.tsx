"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);

    if (paths.length === 0) return null;

    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link
                href="/"
                className="hover:text-green-400 transition-colors flex items-center gap-1"
            >
                <Home className="h-3.5 w-3.5" />
            </Link>

            {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join("/")}`;
                const isLast = index === paths.length - 1;
                const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

                return (
                    <div key={path} className="flex items-center space-x-2">
                        <ChevronRight className="h-3.5 w-3.5" />
                        {isLast ? (
                            <span className="font-medium text-white">{label}</span>
                        ) : (
                            <Link
                                href={href}
                                className="hover:text-green-400 transition-colors"
                            >
                                {label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
