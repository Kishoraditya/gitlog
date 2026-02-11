"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Sparkles, Copy, FileDown, Key, Settings2 } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { formatDate } from "@/lib/utils";
import { TipJar } from "@/components/TipJar";
import { isFeatureEnabled } from "@/lib/growthbook";

// Types
interface Repository {
    id: string;
    name: string;
    fullName: string;
    defaultBranch: string;
}

interface Tag {
    name: string;
    commit: { sha: string };
}

interface GenerateState {
    repositoryId: string;
    repoFullName: string;
    fromRef: string;
    toRef: string;
    format: "keepachangelog" | "github_release" | "simple" | "custom";
    generateVersion: boolean;
    pushToRepo: boolean;
    currentVersion: string;
    title: string;
    comment: string;
    customApiKey?: string;
    customBaseURL?: string;
    outputLanguage?: string;
}

function GenerateContent() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();

    // State
    const [repos, setRepos] = useState<Repository[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [commits, setCommits] = useState<any[]>([]); // New: fetch recent commits for dropdown
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [generatedLog, setGeneratedLog] = useState("");
    const [suggestedVersion, setSuggestedVersion] = useState("");
    const [commitCount, setCommitCount] = useState(0);

    const [params, setParams] = useState<GenerateState>({
        repositoryId: searchParams.get("repoId") || "",
        repoFullName: searchParams.get("fullName") || "",
        fromRef: "",
        toRef: "HEAD",
        format: "keepachangelog",
        generateVersion: true,
        pushToRepo: false,
        currentVersion: "",
        title: "",
        comment: "",
    });

    // Fetch repos on load
    useEffect(() => {
        fetch("/api/repos")
            .then((res) => res.json())
            .then((data) => {
                if (data.repositories) setRepos(data.repositories);
            });
    }, []);

    // Fetch tags & commits when repo selected
    useEffect(() => {
        if (params.repoFullName) {
            setLoading(true);
            fetch("/api/commits", {
                method: "POST",
                body: JSON.stringify({ repoFullName: params.repoFullName }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.tags) setTags(data.tags);
                    if (data.commits) setCommits(data.commits);

                    // Default to latest tag as 'from' if available
                    if (data.tags && data.tags.length > 0) {
                        setParams((p) => ({ ...p, fromRef: data.tags[0].name }));
                    } else if (data.commits && data.commits.length > 0) {
                        // Fallback to older commit if no tags
                        const idx = Math.min(data.commits.length - 1, 10);
                        setParams((p) => ({ ...p, fromRef: data.commits[idx].sha }));
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [params.repoFullName]);

    const handleGenerate = async () => {
        if (!params.repoFullName) {
            toast.error("Please select a repository");
            return;
        }

        try {
            setGenerating(true);
            setGeneratedLog(""); // Clear previous

            const res = await fetch("/api/generate", {
                method: "POST",
                body: JSON.stringify(params),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setGeneratedLog(data.changelog.content);
            setCommitCount(data.commitCount);

            if (data.version) {
                setSuggestedVersion(data.version);
                toast.success(`Generated for ${data.commitCount} commits! Version suggestion: ${data.version}`);
            } else {
                toast.success(`Generated changelog for ${data.commitCount} commits`);
            }

        } catch (error: any) {
            toast.error(error.message || "Failed to generate changelog");
        } finally {
            setGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLog);
        toast.success("Copied to clipboard");
    };

    const downloadMarkdown = () => {
        const blob = new Blob([generatedLog], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `CHANGELOG-${new Date().toISOString().split("T")[0]}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="grid lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
            {/* Configuration Panel */}
            <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white">Generate</h1>
                    <p className="text-gray-400">Configure your changelog settings.</p>
                </div>

                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle>Source</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Repository</Label>
                            <Select
                                value={params.repositoryId}
                                onValueChange={(val) => {
                                    const repo = repos.find((r) => r.id === val);
                                    if (repo) {
                                        setParams((p) => ({
                                            ...p,
                                            repositoryId: val,
                                            repoFullName: repo.fullName,
                                        }));
                                    }
                                }}
                            >
                                <SelectTrigger className="bg-gray-950 border-gray-800">
                                    <SelectValue placeholder="Select a repository" />
                                </SelectTrigger>
                                <SelectContent>
                                    {repos.map((repo) => (
                                        <SelectItem key={repo.id} value={repo.id}>
                                            {repo.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>From (Previous)</Label>
                                <Select
                                    value={params.fromRef}
                                    onValueChange={(val) => setParams((p) => ({ ...p, fromRef: val }))}
                                >
                                    <SelectTrigger className="bg-gray-950 border-gray-800">
                                        <SelectValue placeholder="Select tag/commit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="HEAD~50">Last 50 Commits</SelectItem>
                                        {tags.length > 0 && (
                                            <>
                                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase">Tags</div>
                                                {tags.map((tag) => (
                                                    <SelectItem key={tag.name} value={tag.name}>
                                                        {tag.name}
                                                    </SelectItem>
                                                ))}
                                            </>
                                        )}
                                        {commits.length > 0 && (
                                            <>
                                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase text-gray-400">Recent Commits</div>
                                                {commits.slice(0, 10).map((c) => (
                                                    <SelectItem key={c.sha} value={c.sha}>
                                                        {c.sha.substring(0, 7)}: {c.commit.message.split('\n')[0].substring(0, 30)}
                                                    </SelectItem>
                                                ))}
                                            </>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>To (Current)</Label>
                                <Select
                                    value={params.toRef}
                                    onValueChange={(val) => setParams((p) => ({ ...p, toRef: val }))}
                                >
                                    <SelectTrigger className="bg-gray-950 border-gray-800">
                                        <SelectValue placeholder="HEAD" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="HEAD">HEAD (Latest)</SelectItem>
                                        {tags.map((tag) => (
                                            <SelectItem key={tag.name} value={tag.name}>
                                                {tag.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="h-4 w-4 text-yellow-500" />
                            AI Provider (BYOK)
                        </CardTitle>
                        <CardDescription>
                            Use your own API key to bypass limits.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Provider Base URL</Label>
                            <Input
                                placeholder="https://openrouter.ai/api/v1"
                                value={params.customBaseURL}
                                onChange={(e) => setParams(p => ({ ...p, customBaseURL: e.target.value }))}
                                className="bg-gray-950 border-gray-800 text-xs"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>API Key</Label>
                            <Input
                                type="password"
                                placeholder="sk-..."
                                value={params.customApiKey}
                                onChange={(e) => setParams(p => ({ ...p, customApiKey: e.target.value }))}
                                className="bg-gray-950 border-gray-800 text-xs"
                            />
                            <p className="text-[10px] text-gray-500">
                                Key is used only for this session. Recommended for privacy.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle>Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Output Format</Label>
                            <Tabs
                                value={params.format}
                                onValueChange={(val) => setParams((p) => ({ ...p, format: val as any }))}
                                className="w-full"
                            >
                                <TabsList className="grid w-full grid-cols-4 bg-gray-950">
                                    <TabsTrigger value="keepachangelog">Standard</TabsTrigger>
                                    <TabsTrigger value="github_release">GitHub</TabsTrigger>
                                    <TabsTrigger value="simple">Simple</TabsTrigger>
                                    <TabsTrigger value="custom">Custom</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        <div className="space-y-2">
                            <Label>Comment / Highlights (Optional)</Label>
                            <textarea
                                placeholder="Add specific notes or manual highlights..."
                                value={params.comment}
                                onChange={(e) => setParams(p => ({ ...p, comment: e.target.value }))}
                                className="w-full min-h-[100px] bg-gray-950 border border-gray-800 rounded-md p-3 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <p className="text-[10px] text-gray-500">
                                This will be included in your changelog. Great for manual additions.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Language</Label>
                            <Select
                                value={params.outputLanguage || "en"}
                                onValueChange={(val) => setParams((p) => ({ ...p, outputLanguage: val }))}
                            >
                                <SelectTrigger className="bg-gray-950 border-gray-800">
                                    <SelectValue placeholder="English" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English (Default)</SelectItem>
                                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                                    <SelectItem value="es">Español (Spanish)</SelectItem>
                                    <SelectItem value="de">Deutsch (German)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b border-gray-800/50">
                            <div className="space-y-0.5">
                                <Label>Push to Repository</Label>
                                <p className="text-xs text-gray-500">
                                    Update CHANGELOG.md on GitHub
                                </p>
                            </div>
                            <Switch
                                checked={params.pushToRepo}
                                onCheckedChange={(val) => setParams((p) => ({ ...p, pushToRepo: val }))}
                            />
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <div className="space-y-0.5">
                                <Label>Suggest Version</Label>
                                <p className="text-xs text-gray-500">
                                    Auto-calculate semver bump
                                </p>
                            </div>
                            <Switch
                                checked={params.generateVersion}
                                onCheckedChange={(val) => setParams((p) => ({ ...p, generateVersion: val }))}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-3">
                        <Button
                            onClick={handleGenerate}
                            disabled={generating || !params.repositoryId}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                            {generating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate Changelog
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>

                {isFeatureEnabled("tip_jar") && <TipJar />}
            </div>

            {/* Editor Panel */}
            <div className="lg:col-span-8 flex flex-col gap-4 h-full overflow-hidden">
                {generatedLog ? (
                    <>
                        <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg border border-gray-800">
                            <div className="flex items-center gap-4">
                                {suggestedVersion && (
                                    <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm border border-green-800">
                                        🚀 Suggested Version: <span className="font-bold">{suggestedVersion}</span>
                                    </div>
                                )}
                                <span className="text-gray-400 text-sm">
                                    {commitCount} commits analyzed
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                </Button>
                                <Button variant="outline" size="sm" onClick={downloadMarkdown}>
                                    <FileDown className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden rounded-lg border border-gray-800 bg-gray-950" data-color-mode="dark">
                            <MDEditor
                                value={generatedLog}
                                onChange={(val) => setGeneratedLog(val || "")}
                                height="100%"
                                preview="live"
                                className="!bg-gray-950 !text-gray-100"
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-800 rounded-lg bg-gray-900/50 p-12 text-center">
                        <div className="bg-gray-800 p-4 rounded-full mb-4">
                            <Sparkles className="h-8 w-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Ready to Generate
                        </h3>
                        <p className="text-gray-400 max-w-md">
                            Select a repository and range to generate your changelog using AI.
                            We&apos;ll analyze your commits and format them perfectly.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function GeneratePage() {
    return (
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            <GenerateContent />
        </Suspense>
    );
}
