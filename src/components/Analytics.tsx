"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { usePathname, useSearchParams } from "next/navigation";

// Initialize PostHog
// Initialize PostHog
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ingest", // Use the reverse proxy
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com", // For the toolbar
        capture_pageview: false, // We handle this manually for Next.js App Router
        capture_pageleave: true, // Enable pageleave capture
        persistence: "localStorage",
        autocapture: true,
    });
}

import { usePathname, useSearchParams } from "next/navigation";

function PostHogPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Track pageviews
    useEffect(() => {
        if (pathname && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
            let url = window.origin + pathname;
            if (searchParams.toString()) {
                url = url + `?${searchParams.toString()}`;
            }
            posthog.capture("$pageview", {
                $current_url: url,
            });
        }
    }, [pathname, searchParams]);

    // Track scroll depth
    useEffect(() => {
        let maxScroll = 0;
        const updateScroll = () => {
            const scrollPercent = Math.round(
                (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
            );
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
            }
        };

        window.addEventListener("scroll", updateScroll);

        // Send scroll depth on unmount (page leave)
        return () => {
            window.removeEventListener("scroll", updateScroll);
            if (maxScroll > 0) {
                posthog.capture("scroll_depth", { depth: maxScroll, path: pathname });
            }
        };
    }, [pathname]);

    return null;
}

export function Analytics({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    useEffect(() => {
        // Identify user across platforms if session exists
        if (session?.user) {
            const userId = session.user.id;

            // PostHog
            posthog.identify(userId, {
                email: session.user.email,
                name: session.user.name,
            });

            // Google Analytics
            if ((window as any).gtag) {
                (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
                    user_id: userId,
                });
            }

            // Sentry
            import("@sentry/nextjs").then(Sentry => {
                Sentry.setUser({
                    id: userId,
                    email: session.user.email || undefined,
                    username: session.user.name || undefined,
                });
            });
        }
    }, [session]);

    return (
        <PostHogProvider client={posthog}>
            <PostHogPageView />
            {/* Google Analytics 4 */}
            {process.env.NEXT_PUBLIC_GA_ID && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                                page_path: window.location.pathname,
                            });
                        `}
                    </Script>
                </>
            )}
            <VercelAnalytics />
            {children}
        </PostHogProvider>
    );
}

// Utility functions for event tracking
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
    const consent = typeof window !== "undefined" ? localStorage.getItem("cookie-consent") : null;
    if (consent === "all") {
        posthog.capture(eventName, properties);

        // Also send to GA if available
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", eventName, properties);
        }
    }
}

export function identifyUser(userId: string, traits?: Record<string, unknown>) {
    const consent = typeof window !== "undefined" ? localStorage.getItem("cookie-consent") : null;
    if (consent === "all") {
        posthog.identify(userId, traits);
    }
}
