"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-[calc(100vh-4rem)] bg-mesh">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto p-8 max-w-7xl">
                    <Breadcrumbs />
                    {children}
                </div>
            </main>
            <Toaster />
        </div>
    );
}
