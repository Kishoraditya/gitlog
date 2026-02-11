"use client";

import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    LogOut,
    Trash2,
    Download,
    User,
    Key,
    Settings,
    Coffee,
    ShieldCheck,
    Globe,
    FileText
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    const { data: session } = useSession();
    const [deleting, setDeleting] = useState(false);
    const [template, setTemplate] = useState("");

    useEffect(() => {
        fetch("/api/user/settings")
            .then(res => res.json())
            .then(data => {
                if (data.user?.customFormat) {
                    setTemplate(data.user.customFormat);
                }
            });
    }, []);

    const handleExportData = () => {
        toast.success("Data export started. Check your email.");
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="flex items-center justify-between mb-8 px-4">
                <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                </Button>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <div className="px-4 mb-6">
                    <TabsList className="bg-gray-900 border border-white/5 p-1">
                        <TabsTrigger value="profile" className="data-[state=active]:bg-green-600">
                            <User className="h-4 w-4 mr-2" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="preferences" className="data-[state=active]:bg-green-600">
                            <Settings className="h-4 w-4 mr-2" />
                            Preferences
                        </TabsTrigger>
                        <TabsTrigger value="billing" className="data-[state=active]:bg-green-600">
                            <Coffee className="h-4 w-4 mr-2" />
                            Tipping History
                        </TabsTrigger>
                        <TabsTrigger value="compliance" className="data-[state=active]:bg-green-600">
                            <ShieldCheck className="h-4 w-4 mr-2" />
                            Security & Policy
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="profile" className="space-y-6 px-4">
                    <Card className="glass-dark border-white/5">
                        <CardHeader>
                            <CardTitle>Public Profile</CardTitle>
                            <CardDescription>Managed via GitHub authentication.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                    <img
                                        src={session?.user?.image || ""}
                                        alt="Profile"
                                        className="relative w-20 h-20 rounded-full border-2 border-white/10"
                                    />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-white">{session?.user?.name || "User"}</p>
                                    <p className="text-sm text-gray-500">{session?.user?.email}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-[10px] bg-green-900/40 text-green-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">GitHub Connected</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input value={session?.user?.name || ""} disabled className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input value={session?.user?.email || ""} disabled className="bg-white/5 border-white/10" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-dark border-white/5">
                        <CardHeader>
                            <CardTitle>API Access</CardTitle>
                            <CardDescription>Integrate GitLog AI with your external tools.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Key className="h-5 w-5 text-green-400" />
                                    <div>
                                        <p className="text-sm font-bold text-white">Public API Access</p>
                                        <p className="text-xs text-gray-500">Use your GitHub token for authentication.</p>
                                    </div>
                                </div>
                                <Button variant="link" asChild className="text-green-400">
                                    <Link href="/api-docs">API Docs →</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6 px-4">
                    <Card className="glass-dark border-white/5">
                        <CardHeader>
                            <CardTitle>Defaults</CardTitle>
                            <CardDescription>Set your preferred output settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Default Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger className="glass border-white/10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="glass-dark border-white/10 text-white">
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="hi">Hindi</SelectItem>
                                            <SelectItem value="de">German</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Default Format</Label>
                                    <Select defaultValue="keepachangelog">
                                        <SelectTrigger className="glass border-white/10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="glass-dark border-white/10 text-white">
                                            <SelectItem value="keepachangelog">Keep a Changelog</SelectItem>
                                            <SelectItem value="github_release">GitHub Release</SelectItem>
                                            <SelectItem value="simple">Simple Minimalist</SelectItem>
                                            <SelectItem value="custom">Custom Template</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Separator className="bg-white/5" />

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-green-400" />
                                        Custom Changelog Template
                                    </Label>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Available variables: <code className="text-green-400">{"{{version}}"}</code>, <code className="text-green-400">{"{{date}}"}</code>, <code className="text-green-400">{"{{comment}}"}</code>, <code className="text-green-400">{"{{commits}}"}</code>
                                    </p>
                                    <textarea
                                        placeholder="# Release {{version}} ({{date}})\n\n{{comment}}\n\n{{commits}}"
                                        className="w-full min-h-[150px] bg-white/5 border border-white/10 rounded-md p-3 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                                        id="custom-format-setting"
                                    />
                                </div>
                                <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={async () => {
                                        const template = (document.getElementById('custom-format-setting') as HTMLTextAreaElement).value;
                                        try {
                                            const res = await fetch('/api/user/settings', {
                                                method: 'PATCH',
                                                body: JSON.stringify({ customFormat: template }),
                                            });
                                            if (res.ok) toast.success("Template saved!");
                                            else toast.error("Failed to save template");
                                        } catch (e) {
                                            toast.error("Error saving settings");
                                        }
                                    }}
                                >
                                    Save Preferences
                                </Button>
                            </div>

                            <Separator className="bg-white/5" />

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Autocorrect Grammer</Label>
                                    <p className="text-xs text-gray-500">Use AI to fix typos in commit messages.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6 px-4">
                    <Card className="glass-dark border-white/5">
                        <CardHeader>
                            <CardTitle>Support History</CardTitle>
                            <CardDescription>Past tips and contributions to GitLog AI project.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                    <FileText className="h-8 w-8 text-gray-600" />
                                </div>
                                <h3 className="text-lg font-bold text-white">No transactions yet</h3>
                                <p className="text-gray-500 text-sm max-w-xs mx-auto mt-1">
                                    Your support helps keep this project free and open source.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="compliance" className="space-y-6 px-4">
                    <Card className="glass-dark border-white/5">
                        <CardHeader>
                            <CardTitle>Policy & Governance</CardTitle>
                            <CardDescription>Transparency regarding your data and rights.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link href="/terms" className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-white/10 group">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-blue-400" />
                                    <span className="text-sm font-medium">Terms of Service</span>
                                </div>
                                <span className="text-xs text-gray-500">Accepted: 2026-02-05</span>
                            </Link>
                            <Link href="/privacy" className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-white/10 group">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5 text-green-400" />
                                    <span className="text-sm font-medium">Privacy Policy</span>
                                </div>
                                <span className="text-xs text-gray-500">Rev: v1.1.0</span>
                            </Link>
                            <Link href="/compliance" className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-white/10 group">
                                <div className="flex items-center gap-3">
                                    <Globe className="h-5 w-5 text-orange-400" />
                                    <span className="text-sm font-medium">GDPR / Data Transparency</span>
                                </div>
                                <span className="text-xs text-green-500 font-bold tracking-widest">VERIFIED</span>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="bg-red-950/20 border-red-900/50">
                        <CardHeader>
                            <CardTitle className="text-red-400 text-sm font-bold uppercase tracking-wider">Danger Zone</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button variant="destructive" size="sm" className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Destroy Account & Data
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
