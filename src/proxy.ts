import { NextRequest, NextResponse } from "next/server";

/**
 * Rate Limiting Middleware
 * Uses in-memory store (for single-instance deployments)
 * For production with multiple instances, use Upstash Redis
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory rate limit store
const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration
const RATE_LIMITS = {
    "/api/v1/": { max: 100, windowMs: 60 * 60 * 1000 }, // 100/hour for API
    "/api/mcp": { max: 200, windowMs: 60 * 60 * 1000 }, // 200/hour for MCP
    "/api/generate": { max: 50, windowMs: 60 * 60 * 1000 }, // 50/hour for generate
    default: { max: 1000, windowMs: 60 * 60 * 1000 }, // 1000/hour default
};

function getClientIdentifier(req: NextRequest): string {
    // Try to get authenticated user ID
    const authHeader = req.headers.get("authorization");
    if (authHeader) {
        // Hash the token for privacy
        return `auth:${hashSimple(authHeader)}`;
    }

    // Fall back to IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] || req.headers.get("x-real-ip") || "unknown";
    return `ip:${ip}`;
}

function hashSimple(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

function getRateLimitConfig(pathname: string) {
    for (const [prefix, config] of Object.entries(RATE_LIMITS)) {
        if (pathname.startsWith(prefix)) {
            return config;
        }
    }
    return RATE_LIMITS.default;
}

function checkRateLimit(
    identifier: string,
    pathname: string
): { allowed: boolean; remaining: number; resetTime: number } {
    const config = getRateLimitConfig(pathname);
    const key = `${identifier}:${pathname.split("/").slice(0, 3).join("/")}`;
    const now = Date.now();

    let entry = rateLimitStore.get(key);

    // Reset if window expired
    if (!entry || now > entry.resetTime) {
        entry = {
            count: 0,
            resetTime: now + config.windowMs,
        };
    }

    // Check limit
    if (entry.count >= config.max) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: entry.resetTime,
        };
    }

    // Increment and save
    entry.count++;
    rateLimitStore.set(key, entry);

    return {
        allowed: true,
        remaining: config.max - entry.count,
        resetTime: entry.resetTime,
    };
}

// Cleanup old entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}, 60 * 1000); // Every minute

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Only rate limit API routes
    if (!pathname.startsWith("/api/")) {
        return NextResponse.next();
    }

    // Skip auth routes
    if (pathname.startsWith("/api/auth/")) {
        return NextResponse.next();
    }

    const identifier = getClientIdentifier(req);
    const { allowed, remaining, resetTime } = checkRateLimit(identifier, pathname);

    // Add rate limit headers
    const headers = new Headers();
    headers.set("X-RateLimit-Remaining", remaining.toString());
    headers.set("X-RateLimit-Reset", Math.ceil(resetTime / 1000).toString());

    if (!allowed) {
        return new NextResponse(
            JSON.stringify({
                error: "Too many requests",
                retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
            }),
            {
                status: 429,
                headers: {
                    ...Object.fromEntries(headers),
                    "Content-Type": "application/json",
                    "Retry-After": Math.ceil((resetTime - Date.now()) / 1000).toString(),
                },
            }
        );
    }

    const response = NextResponse.next();
    headers.forEach((value, key) => {
        response.headers.set(key, value);
    });

    return response;
}

export const config = {
    matcher: "/api/:path*",
};
