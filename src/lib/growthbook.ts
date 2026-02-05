/**
 * GrowthBook Feature Flag Integration
 * Free tier: Unlimited flags, up to 10K API calls/month
 */

import { GrowthBook } from "@growthbook/growthbook";

// Feature flag definitions
export const FEATURE_FLAGS = {
    MCP_ENABLED: "mcp_enabled",
    MULTILINGUAL: "multilingual",
    API_V2: "api_v2",
    DEEP_INSPECTION: "deep_inspection",
    PUSH_TO_GITHUB: "push_to_github",
    TIP_JAR: "tip_jar",
    COMING_SOON_FEATURES: "coming_soon_features",
} as const;

export type FeatureFlag = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];

// Default values (used when GrowthBook is not configured)
const DEFAULT_FLAGS: Record<FeatureFlag, boolean> = {
    mcp_enabled: true,
    multilingual: true,
    api_v2: false,
    deep_inspection: true,
    push_to_github: true,
    tip_jar: true,
    coming_soon_features: true,
};

// Singleton instance
let growthbookInstance: GrowthBook | null = null;

export function getGrowthBook(): GrowthBook | null {
    if (typeof window === "undefined") {
        // Server-side: create new instance each time
        if (!process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY) {
            return null;
        }
        return new GrowthBook({
            apiHost: "https://cdn.growthbook.io",
            clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
            enableDevMode: process.env.NODE_ENV === "development",
        });
    }

    // Client-side: use singleton
    if (!growthbookInstance && process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY) {
        growthbookInstance = new GrowthBook({
            apiHost: "https://cdn.growthbook.io",
            clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
            enableDevMode: process.env.NODE_ENV === "development",
            trackingCallback: (experiment, result) => {
                // Track experiment views in analytics
                if ((window as any).gtag) {
                    (window as any).gtag("event", "experiment_viewed", {
                        experiment_id: experiment.key,
                        variation_id: result.key,
                    });
                }
            },
        });

        // Load features
        growthbookInstance.loadFeatures({ autoRefresh: true });
    }

    return growthbookInstance;
}

// Check if a feature is enabled
export function isFeatureEnabled(flag: FeatureFlag, userId?: string): boolean {
    const gb = getGrowthBook();

    if (!gb) {
        // Return default if GrowthBook not configured
        return DEFAULT_FLAGS[flag] ?? false;
    }

    // Set user attributes for targeting
    if (userId) {
        gb.setAttributes({
            id: userId,
        });
    }

    return gb.isOn(flag);
}

// Get feature value (for non-boolean flags)
export function getFeatureValue<T>(flag: string, defaultValue: T): T {
    const gb = getGrowthBook();

    if (!gb) {
        return defaultValue;
    }

    return gb.getFeatureValue(flag, defaultValue) as T;
}

// Initialize GrowthBook attributes
export function setUserAttributes(attributes: Record<string, unknown>) {
    const gb = getGrowthBook();
    if (gb) {
        gb.setAttributes(attributes);
    }
}
