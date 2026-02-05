"use client";

import { GrowthBook, GrowthBookProvider as GBProvider } from "@growthbook/growthbook-react";
import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";

export function GrowthBookProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    const gb = useMemo(() => {
        return new GrowthBook({
            apiHost: "https://cdn.growthbook.io",
            clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
            enableDevMode: process.env.NODE_ENV === "development",
            trackingCallback: (experiment, result) => {
                // Track experiment views in GA & PostHog
                if ((window as any).gtag) {
                    (window as any).gtag("event", "experiment_viewed", {
                        experiment_id: experiment.key,
                        variation_id: result.key,
                    });
                }
            },
        });
    }, []);

    useEffect(() => {
        // Load features
        gb.loadFeatures({ autoRefresh: true });
    }, [gb]);

    useEffect(() => {
        // Set attributes for targeting
        gb.setAttributes({
            id: session?.user?.id || "anonymous",
            email: session?.user?.email || "anonymous",
            loggedIn: !!session,
            // Add more attributes here (e.g., plan, repository count)
        });
    }, [gb, session]);

    return (
        <GBProvider growthbook={gb}>
            {children}
        </GBProvider>
    );
}
