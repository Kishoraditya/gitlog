import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Code, Rocket, Building2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Use Cases",
    description: "Discover how different teams use GitLog AI for changelog generation.",
};

const useCases = [
    {
        icon: Code,
        title: "Open Source Projects",
        description: "Empower your contributors and users with transparent, automated changelogs.",
        slug: "open-source-projects",
        color: "text-green-500",
    },
    {
        icon: Building2,
        title: "Internal Engineering Teams",
        description: "Bridge the gap between developers and stakeholders with status automation.",
        slug: "internal-engineering-teams",
        color: "text-blue-500",
    },
];

export default function UseCasesPage() {
    return (
        <div className="min-h-screen bg-mesh py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-white mb-4">Use Cases</h1>
                    <p className="text-gray-400 text-lg">
                        See how teams are reclaiming their release cycles.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {useCases.map((useCase) => (
                        <Link key={useCase.slug} href={`/resources/use-cases/${useCase.slug}`}>
                            <Card className="glass-dark border-white/5 hover:border-white/10 transition-all group h-full">
                                <CardHeader className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <useCase.icon className={`h-6 w-6 ${useCase.color}`} />
                                        </div>
                                        <CardTitle className="text-2xl text-white group-hover:text-green-400 transition-colors uppercase tracking-tighter">
                                            {useCase.title}
                                        </CardTitle>
                                    </div>
                                    <CardDescription className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {useCase.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                                    Explore Study <ArrowRight className="h-4 w-4 text-green-500 group-hover:translate-x-1 transition-transform" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}

                    {/* Placeholder for future growth */}
                    <div className="p-8 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center">
                        <Rocket className="h-8 w-8 text-gray-700 mb-4" />
                        <h3 className="text-gray-500 font-bold uppercase text-xs tracking-widest">More coming soon</h3>
                        <p className="text-[10px] text-gray-600 mt-1 max-w-[150px]">
                            We're currently documenting cases for CI/CD pipelines and solo-preneurs.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/resources" className="text-gray-500 hover:text-white transition-colors text-sm">
                        ← Back to Resources
                    </Link>
                </div>
            </div>
        </div>
    );
}
