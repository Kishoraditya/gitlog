"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import Script from "next/script";

// Initialize PostHog
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
        capture_pageview: false, // We'll capture manually for SPA
        persistence: "localStorage",
        autocapture: true,
    });
}

export function Analytics({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Check cookie consent before tracking
        const consent = localStorage.getItem("cookie-consent");
        if (consent === "all" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
            posthog.capture("$pageview");
        }
    }, []);

    return (
        <PostHogProvider client={posthog}>
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
