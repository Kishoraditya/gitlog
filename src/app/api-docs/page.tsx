import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "API Documentation",
    description: "Documentation for the GitLog AI Public API.",
};

export default function ApiDocsPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
                    <p className="text-gray-400 text-lg">
                        Programmatic access to GitLog AI.
                    </p>
                </div>

                <Card className="bg-gray-900 border-gray-800 mb-8">
                    <CardHeader>
                        <CardTitle>Base URL</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <code className="bg-gray-950 px-4 py-2 rounded block">
                            https://gitlog.ai/api/v1
                        </code>
                    </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800 mb-8">
                    <CardHeader>
                        <CardTitle>Authentication</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-400">
                            All requests require a GitHub Personal Access Token with <code>repo</code> scope.
                        </p>
                        <pre className="bg-gray-950 p-4 rounded overflow-x-auto text-sm">
                            {`Authorization: Bearer <GITHUB_ACCESS_TOKEN>`}
                        </pre>
                        <p className="text-gray-400">
                            For BYOK (using your own LLM key), add:
                        </p>
                        <pre className="bg-gray-950 p-4 rounded overflow-x-auto text-sm">
                            {`X-API-Key: <OPENROUTER_API_KEY>`}
                        </pre>
                    </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800 mb-8">
                    <CardHeader>
                        <CardTitle className="text-green-400">POST /generate</CardTitle>
                        <CardDescription>Generate a changelog from commits.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Request Body</h4>
                            <pre className="bg-gray-950 p-4 rounded overflow-x-auto text-sm">
                                {`{
  "repoFullName": "owner/repo",
  "fromRef": "v1.0.0",
  "toRef": "HEAD",
  "format": "keepachangelog"
}`}
                            </pre>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Parameters</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><code>repoFullName</code> (required): GitHub repository in &quot;owner/repo&quot; format.</li>
                                <li><code>fromRef</code> (optional): Starting ref (tag, SHA). Default: &quot;HEAD~50&quot;.</li>
                                <li><code>toRef</code> (optional): Ending ref. Default: &quot;HEAD&quot;.</li>
                                <li><code>format</code> (optional): &quot;keepachangelog&quot; | &quot;github_release&quot; | &quot;simple&quot;.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Response</h4>
                            <pre className="bg-gray-950 p-4 rounded overflow-x-auto text-sm">
                                {`{
  "success": true,
  "changelog": "# Changelog...",
  "commitCount": 25,
  "format": "keepachangelog"
}`}
                            </pre>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800 mb-8">
                    <CardHeader>
                        <CardTitle>Example (cURL)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-gray-950 p-4 rounded overflow-x-auto text-sm">
                            {`curl -X POST https://gitlog.ai/api/v1/generate \\
  -H "Authorization: Bearer ghp_xxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "repoFullName": "Kishoraditya/gitlog",
    "fromRef": "v0.1.0",
    "toRef": "HEAD",
    "format": "keepachangelog"
  }'`}
                        </pre>
                    </CardContent>
                </Card>

                <div className="mt-12 text-center">
                    <Link href="/resources" className="text-green-400 hover:underline">
                        ← Back to Resources
                    </Link>
                </div>
            </div>
        </div>
    );
}
