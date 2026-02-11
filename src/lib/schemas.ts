import { z } from "zod";

/**
 * Zod schemas for API input validation
 * Provides type-safe validation and helpful error messages
 */

// Generate Changelog Request Schema
export const GenerateRequestSchema = z.object({
    repoFullName: z
        .string()
        .min(3, "Repository name too short")
        .regex(/^[^/]+\/[^/]+$/, "Must be in 'owner/repo' format"),
    repositoryId: z.string().optional(),
    fromRef: z.string().default("HEAD~50"),
    toRef: z.string().default("HEAD"),
    since: z.string().datetime().optional(),
    until: z.string().datetime().optional(),
    format: z.enum(["keepachangelog", "github_release", "simple", "custom"]).default("keepachangelog"),
    generateVersion: z.boolean().default(false),
    currentVersion: z.string().optional(),
    title: z.string().max(200).optional(),
    comment: z.string().max(2000).optional(),
    pushToRepo: z.boolean().default(false),
    customApiKey: z.string().optional(),
    customBaseURL: z.string().url().optional(),
    outputLanguage: z.string().length(2).optional(), // ISO 639-1 language code
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

// API v1 Generate Request (simplified)
export const ApiV1GenerateSchema = z.object({
    repoFullName: z.string().regex(/^[^/]+\/[^/]+$/, "Must be in 'owner/repo' format"),
    fromRef: z.string().optional(),
    toRef: z.string().optional(),
    format: z.enum(["keepachangelog", "github_release", "simple"]).optional(),
    outputLanguage: z.string().length(2).optional(),
});

export type ApiV1GenerateRequest = z.infer<typeof ApiV1GenerateSchema>;

// MCP Tool Invocation Schema
export const McpToolInvocationSchema = z.object({
    jsonrpc: z.literal("2.0"),
    id: z.union([z.string(), z.number()]),
    method: z.literal("tools/call"),
    params: z.object({
        name: z.string(),
        arguments: z.record(z.string(), z.unknown()),
    }),
});

export type McpToolInvocation = z.infer<typeof McpToolInvocationSchema>;

// Webhook Payload Schema (GitHub Release)
export const GitHubReleaseWebhookSchema = z.object({
    action: z.enum(["published", "created", "edited", "deleted"]),
    release: z.object({
        id: z.number(),
        tag_name: z.string(),
        name: z.string().nullable(),
        body: z.string().nullable(),
        draft: z.boolean(),
        prerelease: z.boolean(),
    }),
    repository: z.object({
        id: z.number(),
        full_name: z.string(),
        private: z.boolean(),
    }),
    sender: z.object({
        login: z.string(),
        id: z.number(),
    }),
});

export type GitHubReleaseWebhook = z.infer<typeof GitHubReleaseWebhookSchema>;

// User settings schema
export const UserSettingsSchema = z.object({
    defaultFormat: z.enum(["keepachangelog", "github_release", "simple", "custom"]).optional(),
    defaultLanguage: z.string().length(2).optional(),
    customFormat: z.string().optional(),
    emailNotifications: z.boolean().optional(),
    pushToGitHub: z.boolean().optional(),
});

export type UserSettings = z.infer<typeof UserSettingsSchema>;

// Feature flag overrides (for development)
export const FeatureFlagOverridesSchema = z.record(z.string(), z.boolean());

// Validation helper function
export function validateRequest<T>(
    schema: z.ZodType<T>,
    data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return {
        success: false,
        errors: result.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`),
    };
}
