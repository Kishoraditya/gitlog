"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setShow(true);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem("cookie-consent", "all");
        setShow(false);
    };

    const acceptEssential = () => {
        localStorage.setItem("cookie-consent", "essential");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50">
            <Card className="bg-gray-900 border-gray-700 shadow-2xl">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">🍪 Cookie Preferences</CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={acceptEssential}
                            className="h-8 w-8 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-gray-400">
                        We use essential cookies for authentication. Analytics cookies help us improve the product.
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={acceptEssential}>
                        Essential Only
                    </Button>
                    <Button size="sm" onClick={acceptAll} className="bg-green-600 hover:bg-green-700">
                        Accept All
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
