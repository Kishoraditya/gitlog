"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Download, Search, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Subscriber {
    id: string;
    email: string;
    createdAt: string;
}

export function MailingCenter() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetch("/api/admin/subscribers")
            .then(res => res.json())
            .then(data => {
                setSubscribers(data.subscribers || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = subscribers.filter(s =>
        s.email.toLowerCase().includes(filter.toLowerCase())
    );

    const exportCsv = () => {
        const csv = "Email,Joined\n" +
            filtered.map(s => `${s.email},${new Date(s.createdAt).toLocaleDateString()}`).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <Card className="glass border-white/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Mail className="h-5 w-5 text-red-400" />
                        Mailing & Growth
                    </CardTitle>
                    <CardDescription>Manage newsletter subscribers and mailing lists.</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="glass gap-2" onClick={exportCsv}>
                    <Download className="h-4 w-4" /> Export CSV
                </Button>
            </CardHeader>
            <CardContent>
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        id="subscriber-search"
                        name="search"
                        placeholder="Search subscribers..."
                        className="pl-10 glass border-white/5 focus:border-red-500/50"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

                <div className="rounded-xl border border-white/5 overflow-hidden">
                    <div className="max-h-[300px] overflow-y-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-white/5 text-gray-400 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Email Address</th>
                                    <th className="px-6 py-3 font-medium text-right">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr><td colSpan={2} className="px-6 py-4 text-center text-gray-500">Loading...</td></tr>
                                ) : filtered.length === 0 ? (
                                    <tr><td colSpan={2} className="px-6 py-4 text-center text-gray-500">No subscribers found.</td></tr>
                                ) : (
                                    filtered.map((s) => (
                                        <tr key={s.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-medium flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                {s.email}
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-400">
                                                {new Date(s.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
