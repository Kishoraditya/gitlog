"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, GitCommit, Tag, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Changelog {
    id: string;
    title: string;
    version: string | null;
    commitCount: number;
    format: string;
    createdAt: string;
    repository: {
        fullName: string;
    };
}

export default function HistoryPage() {
    const { data: session } = useSession();
    const [changelogs, setChangelogs] = useState<Changelog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetch("/api/generate?limit=50")
                .then((res) => res.json())
                .then((data) => {
                    if (data.changelogs) setChangelogs(data.changelogs);
                })
                .finally(() => setLoading(false));
        }
    }, [session]);

    if (loading) {
        return <div className="text-white">Loading history...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Changelog History</h1>
                <p className="text-gray-400 mt-2">
                    View your previously generated changelogs.
                </p>
            </div>

            <div className="grid gap-6">
                {changelogs.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No changelogs generated yet.
                    </div>
                ) : (
                    changelogs.map((log) => (
                        <Card key={log.id} className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl text-white">
                                            {log.title}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-2">
                                            <span className="text-green-400 font-medium">
                                                {log.repository.fullName}
                                            </span>
                                            {log.version && (
                                                <Badge variant="outline" className="border-gray-700 text-gray-300">
                                                    <Tag className="h-3 w-3 mr-1" />
                                                    {log.version}
                                                </Badge>
                                            )}
                                        </CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center text-sm text-gray-500 mb-2">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {formatDate(log.createdAt)}
                                        </div>
                                        <Badge className="bg-gray-800 hover:bg-gray-700">
                                            {log.format}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-6 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <GitCommit className="h-4 w-4" />
                                        {log.commitCount} commits processed
                                    </div>
                                    {/* Future: Add view/edit button */}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
