import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, Eye, Keyboard, Volume2, Contrast, MousePointer } from "lucide-react";

export const metadata: Metadata = {
    title: "Accessibility Statement",
    description: "Our commitment to making GitLog AI accessible to everyone.",
};

const accessibilityFeatures = [
    {
        icon: Keyboard,
        title: "Keyboard Navigation",
        description: "All features are accessible via keyboard. Use Tab to navigate and Enter to activate.",
    },
    {
        icon: Contrast,
        title: "High Contrast",
        description: "Our dark theme maintains a minimum 4.5:1 contrast ratio for text readability.",
    },
    {
        icon: Volume2,
        title: "Screen Reader Support",
        description: "Semantic HTML and ARIA labels ensure compatibility with screen readers.",
    },
    {
        icon: MousePointer,
        title: "Focus Indicators",
        description: "Clear focus outlines help keyboard users track their position.",
    },
    {
        icon: Eye,
        title: "Reduced Motion",
        description: "Animations respect the prefers-reduced-motion setting.",
    },
];

export default function AccessibilityPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Accessibility className="h-8 w-8 text-green-500" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
                    <p className="text-gray-400 text-lg">
                        GitLog AI is committed to making our product accessible to everyone.
                    </p>
                </div>

                <div className="prose prose-invert mb-12">
                    <h2>Our Commitment</h2>
                    <p className="text-gray-400">
                        We strive to ensure that GitLog AI is accessible to people with disabilities.
                        We are continuously improving the user experience and applying relevant
                        accessibility standards (WCAG 2.1 Level AA).
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {accessibilityFeatures.map((feature) => (
                        <Card key={feature.title} className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <feature.icon className="h-5 w-5 text-green-500" />
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="prose prose-invert">
                    <h2>Feedback</h2>
                    <p className="text-gray-400">
                        If you encounter any accessibility barriers, please let us know via
                        <Link href="https://github.com/gitlog/issues" className="text-green-400"> GitHub Issues</Link>.
                        We welcome your feedback and will work to address any issues.
                    </p>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/" className="text-green-400 hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
