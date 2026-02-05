import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for GitLog AI - Learn how we handle your data.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1>Privacy Policy</h1>
                <p className="text-sm text-gray-400">Last Updated: February 5, 2026</p>

                <p>
                    GitLog AI (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, and safeguard your information.
                </p>

                <h2>1. Information We Collect</h2>
                <ul>
                    <li><strong>Account Information</strong>: GitHub username, email, and profile picture (via OAuth).</li>
                    <li><strong>Repository Data</strong>: Repository names and commit messages (temporarily processed, not stored long-term).</li>
                    <li><strong>Usage Data</strong>: Pages visited, features used, errors encountered (anonymized).</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <ul>
                    <li>To authenticate you with GitHub.</li>
                    <li>To generate changelogs from your repositories.</li>
                    <li>To improve our service.</li>
                </ul>

                <h2>3. Data Storage & Retention</h2>
                <ul>
                    <li><strong>GitHub Tokens</strong>: Session-only. Never stored in our database.</li>
                    <li><strong>BYOK API Keys</strong>: Session-only. Never stored.</li>
                    <li><strong>Changelogs</strong>: Stored until you delete them or your account.</li>
                </ul>

                <h2>4. Your Rights</h2>
                <p>You have the right to access, export, and delete your data.</p>

                <h2>5. Contact</h2>
                <p>
                    For privacy concerns, please open an issue on{" "}
                    <Link href="https://github.com/Kishoraditya/gitlog/issues" className="text-green-400">
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
