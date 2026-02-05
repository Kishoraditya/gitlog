import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility functions for GitLog AI
 */

// Parse repository full name (owner/repo)
export function parseRepoFullName(fullName: string): { owner: string; repo: string } {
  const parts = fullName.split("/");
  if (parts.length !== 2) {
    throw new Error(`Invalid repository format: ${fullName}. Expected 'owner/repo'.`);
  }
  return { owner: parts[0], repo: parts[1] };
}

// Generate a simple hash for caching/deduplication
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

// Format date for display
export function formatDate(date: Date | string, locale = "en-US"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Format date for changelog (ISO format)
export function formatChangelogDate(date?: Date): string {
  const d = date || new Date();
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
}

// Delay utility for rate limiting
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Safe JSON parse
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

// Check if running in browser
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// Get base URL
export function getBaseUrl(): string {
  if (isBrowser()) {
    return window.location.origin;
  }
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

// Sanitize output (basic XSS prevention)
export function sanitize(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Extract version from tag name
export function extractVersion(tagName: string): string {
  const match = tagName.match(/v?(\d+\.\d+\.\d+(?:-[\w.]+)?)/);
  return match ? match[1] : tagName;
}

// Compare semver versions
export function compareSemver(a: string, b: string): number {
  const parseVersion = (v: string) => {
    const [main, pre] = v.split("-");
    const parts = main.split(".").map(Number);
    return { parts, pre: pre || "" };
  };

  const va = parseVersion(a);
  const vb = parseVersion(b);

  for (let i = 0; i < 3; i++) {
    const diff = (va.parts[i] || 0) - (vb.parts[i] || 0);
    if (diff !== 0) return diff;
  }

  // Pre-release versions are lower than release
  if (va.pre && !vb.pre) return -1;
  if (!va.pre && vb.pre) return 1;
  return va.pre.localeCompare(vb.pre);
}

// Group array by key
export function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const key = keyFn(item);
      (result[key] = result[key] || []).push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
