import { DocsSidebar } from "@/components/DocsSidebar";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto px-6 pt-24 pb-16">
            <div className="flex gap-12">
                <DocsSidebar />
                <main className="flex-1 min-w-0">
                    <div className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-400 hover:prose-a:text-indigo-300">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
