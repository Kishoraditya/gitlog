import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms of Service for GitLog AI - Understand the rules of using our platform.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1>Terms of Service</h1>
                <p className="text-sm text-gray-400">Last Updated: February 5, 2026</p>

                <p>By using GitLog AI, you agree to these Terms of Service.</p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using GitLog AI, you agree to be bound by these Terms.
                    If you disagree, please do not use the service.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                    GitLog AI is a free tool that generates changelogs from your GitHub repositories using AI.
                </p>

                <h2>3. User Responsibilities</h2>
                <ul>
                    <li>Provide accurate GitHub authentication.</li>
                    <li>Not use the service for illegal purposes.</li>
                    <li>Not attempt to reverse engineer or abuse our systems.</li>
                </ul>

                <h2>4. Intellectual Property</h2>
                <ul>
                    <li><strong>Your Content</strong>: You retain all rights to your changelogs.</li>
                    <li><strong>Our Service</strong>: GitLog AI, its code, and branding are owned by us.</li>
                </ul>

                <h2>5. Disclaimer of Warranties</h2>
                <p>
                    GitLog AI is provided &quot;as is&quot; without warranties of any kind.
                </p>

                <h2>6. Governing Law</h2>
                <p>These Terms are governed by the laws of India.</p>

                <h2>7. Contact</h2>
                <p>
                    For questions, please open an issue on{" "}
                    <Link href="https://github.com/gitlog/issues" className="text-green-400">
                        GitHub
                    </Link>.
                </p>

                <div className="mt-8 pt-4 border-t border-gray-800">
                    <Link href="/" className="text-green-400 hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
