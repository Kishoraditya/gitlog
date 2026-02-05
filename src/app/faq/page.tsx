import { Metadata } from "next";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: "FAQ",
    description: "Frequently asked questions about GitLog AI.",
};

const faqs = [
    {
        question: "What is GitLog AI?",
        answer: "GitLog AI is an AI-powered tool that generates professional changelogs from your Git commit history. It supports formats like Keep a Changelog and GitHub Releases.",
    },
    {
        question: "Is GitLog AI free?",
        answer: "Yes! GitLog AI is free to use. You can bring your own API key (BYOK) for unlimited generations, or use our community tier.",
    },
    {
        question: "What does BYOK mean?",
        answer: "BYOK stands for 'Bring Your Own Key'. You can provide your own OpenRouter, OpenAI, or Claude API key to power the AI, keeping costs transparent and usage private.",
    },
    {
        question: "Is my code or data stored?",
        answer: "No. We process your commit messages temporarily to generate changelogs, but we never store your code. GitHub tokens and API keys are session-only and never persisted.",
    },
    {
        question: "What formats are supported?",
        answer: "We support Keep a Changelog (the industry standard), GitHub Release notes, and a Simple bullet-point format.",
    },
    {
        question: "Can I push changelogs directly to GitHub?",
        answer: "Yes! After generating a changelog, you can push it directly to your repository's CHANGELOG.md file.",
    },
    {
        question: "How does version suggestion work?",
        answer: "GitLog AI analyzes your commits to detect breaking changes, new features, and bug fixes, then suggests the next semantic version (major, minor, or patch).",
    },
    {
        question: "What is Deep Inspection?",
        answer: "For vague commit messages like 'fix bug', GitLog AI can analyze the actual code diff to generate a more descriptive changelog entry.",
    },
    {
        question: "How can I support the project?",
        answer: "GitLog AI is built by a solo developer. You can support the project by dropping a tip via the TipJar, sharing on social media, or contributing on GitHub.",
    },
    {
        question: "Is there an API?",
        answer: "Yes! We offer a public REST API for programmatic access. See our API Documentation for details.",
    },
];

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-400 text-lg">
                        Everything you need to know about GitLog AI.
                    </p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="bg-gray-900 border border-gray-800 rounded-lg px-6"
                        >
                            <AccordionTrigger className="text-left hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="mt-12 text-center space-y-4">
                    <p className="text-gray-500">
                        Still have questions?
                    </p>
                    <Link
                        href="https://github.com/Kishoraditya/gitlog/issues"
                        className="text-green-400 hover:underline"
                    >
                        Ask on GitHub →
                    </Link>
                    <div>
                        <Link href="/" className="text-gray-400 hover:underline">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
