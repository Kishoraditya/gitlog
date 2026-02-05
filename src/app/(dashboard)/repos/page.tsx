"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { RefreshCw, GitFork, Lock, Unlock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface Repository {
    id: string;
    githubId: number;
    name: string;
    fullName: string;
    private: boolean;
    defaultBranch: string;
    description: string | null;
    updatedAt: string;
    _count: {
        changelogs: number;
    };
}

export default function ReposPage() {
    const { data: session } = useSession();
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);

    const fetchRepos = async (sync = false) => {
        try {
            if (sync) setSyncing(true);
            else setLoading(true);

            const res = await fetch(`/api/repos${sync ? "?sync=true" : ""}`);
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setRepos(data.repositories);

            if (sync) toast.success("Repositories synced successfully");
        } catch (error) {
            toast.error("Failed to fetch repositories");
            console.error(error);
        } finally {
            setLoading(false);
            setSyncing(false);
        }
    };

    useEffect(() => {
        if (session) fetchRepos();
    }, [session]);

    if (loading && !repos.length) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-40 rounded-xl bg-gray-800 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Repositories</h1>
                    <p className="text-gray-400 mt-2">
                        Select a repository to generate a changelog.
                    </p>
                </div>
                <Button
                    onClick={() => fetchRepos(true)}
                    disabled={syncing}
                    variant="outline"
                    className="gap-2 border-gray-700 bg-gray-900 text-white hover:bg-gray-800"
                >
                    <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
                    {syncing ? "Syncing..." : "Sync from GitHub"}
                </Button>
            </div>

            {!repos.length ? (
                <Card className="bg-gray-900 border-gray-800 text-center py-12">
                    <CardContent>
                        <GitFork className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No repositories found
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            Sync your GitHub repositories to get started.
                            We&apos;ll fetch your public and private repos securely.
                        </p>
                        <Button onClick={() => fetchRepos(true)} disabled={syncing}>
                            Sync Repositories
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map((repo) => (
                        <Link key={repo.id} href={`/generate?repoId=${repo.id}&fullName=${repo.fullName}`}>
                            <Card className="bg-gray-900 border-gray-800 hover:border-green-500/50 transition-all cursor-pointer group h-full flex flex-col">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg font-semibold text-white truncate pr-2">
                                            {repo.name}
                                        </CardTitle>
                                        {repo.private ? (
                                            <Lock className="h-4 w-4 text-gray-500 shrink-0" />
                                        ) : (
                                            <Unlock className="h-4 w-4 text-gray-500 shrink-0" />
                                        )}
                                    </div>
                                    <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                                        {repo.description || "No description provided"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto pt-0">
                                    <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                                        <div className="flex items-center gap-2">
                                            <GitFork className="h-4 w-4" />
                                            <span>{repo.defaultBranch}</span>
                                        </div>
                                        {repo._count.changelogs > 0 && (
                                            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                                                {repo._count.changelogs} Logs
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
                                        <span>Updated {formatDate(repo.updatedAt)}</span>
                                        <ArrowRight className="h-4 w-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
