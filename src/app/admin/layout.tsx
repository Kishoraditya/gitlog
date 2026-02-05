"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();

    if (status === "loading") return null;

    if (session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        redirect("/dashboard");
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-gray-950">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gray-950/80">
                <div className="container mx-auto p-8 max-w-7xl">
                    <Breadcrumbs />
                    {children}
                </div>
            </main>
            <Toaster />
        </div>
    );
}
