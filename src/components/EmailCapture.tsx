"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function EmailCapture() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        // In production, this would POST to an API that stores emails
        await new Promise((r) => setTimeout(r, 1000));
        setSubmitted(true);
        setLoading(false);
        toast.success("Thanks for subscribing!");
    };

    if (submitted) {
        return (
            <Card className="bg-green-900/20 border-green-800/50">
                <CardContent className="flex items-center gap-3 py-6">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-green-300">Thanks! We&apos;ll keep you updated.</span>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Mail className="h-5 w-5 text-blue-400" />
                    Stay Updated
                </CardTitle>
                <CardDescription>
                    Get notified about new features and updates.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-950 border-gray-800"
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "..." : "Subscribe"}
                    </Button>
                </form>
                <p className="text-xs text-gray-500 mt-2">
                    No spam. Unsubscribe anytime.
                </p>
            </CardContent>
        </Card>
    );
}
