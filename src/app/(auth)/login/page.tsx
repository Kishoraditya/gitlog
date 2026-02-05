"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
            <Card className="w-full max-w-md bg-gray-900 border-gray-800">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto bg-gray-800 p-3 rounded-full w-fit mb-2">
                        <Github className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
                    <CardDescription>
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        className="w-full bg-white text-black hover:bg-gray-200 gap-2 h-11"
                        onClick={() => signIn("github", { callbackUrl: "/repos" })}
                    >
                        <Github className="h-5 w-5" />
                        Sign in with GitHub
                    </Button>
                </CardContent>
                <CardFooter className="text-center text-sm text-gray-400 justify-center">
                    <p>
                        By continuing, you agree to our{" "}
                        <Link href="/terms" className="underline hover:text-white">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline hover:text-white">
                            Privacy Policy
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
