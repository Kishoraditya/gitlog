/**
 * Simple LRU Cache for server-side caching
 * Used to cache GitHub API responses and reduce rate limiting
 */

interface CacheEntry<T> {
    value: T;
    expiry: number;
}

class LRUCache<T> {
    private cache: Map<string, CacheEntry<T>>;
    private maxSize: number;

    constructor(maxSize = 100) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }

    get(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        // Check expiry
        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return null;
        }

        // Move to end (most recently used)
        this.cache.delete(key);
        this.cache.set(key, entry);

        return entry.value;
    }

    set(key: string, value: T, ttlMs: number): void {
        // Remove oldest if at capacity
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) this.cache.delete(firstKey);
        }

        this.cache.set(key, {
            value,
            expiry: Date.now() + ttlMs,
        });
    }

    delete(key: string): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    size(): number {
        return this.cache.size;
    }
}

// Cache instances for different data types
const TTL = {
    COMMITS: 5 * 60 * 1000, // 5 minutes
    REPOS: 60 * 60 * 1000, // 1 hour
    TAGS: 30 * 60 * 1000, // 30 minutes
    CHANGELOG: 10 * 60 * 1000, // 10 minutes
};

// Global cache instances (singleton pattern)
const commitCache = new LRUCache<any>(200);
const repoCache = new LRUCache<any>(50);
const tagCache = new LRUCache<any>(100);
const changelogCache = new LRUCache<string>(50);

// Cache key generators
function generateCacheKey(prefix: string, ...parts: string[]): string {
    return `${prefix}:${parts.join(":")}`;
}

// Exported cache functions
export function getCachedCommits(owner: string, repo: string, ref?: string) {
    const key = generateCacheKey("commits", owner, repo, ref || "default");
    return commitCache.get(key);
}

export function setCachedCommits(owner: string, repo: string, data: any, ref?: string) {
    const key = generateCacheKey("commits", owner, repo, ref || "default");
    commitCache.set(key, data, TTL.COMMITS);
}

export function getCachedRepos(userId: string) {
    const key = generateCacheKey("repos", userId);
    return repoCache.get(key);
}

export function setCachedRepos(userId: string, data: any) {
    const key = generateCacheKey("repos", userId);
    repoCache.set(key, data, TTL.REPOS);
}

export function getCachedTags(owner: string, repo: string) {
    const key = generateCacheKey("tags", owner, repo);
    return tagCache.get(key);
}

export function setCachedTags(owner: string, repo: string, data: any) {
    const key = generateCacheKey("tags", owner, repo);
    tagCache.set(key, data, TTL.TAGS);
}

export function getCachedChangelog(hash: string) {
    return changelogCache.get(hash);
}

export function setCachedChangelog(hash: string, content: string) {
    changelogCache.set(hash, content, TTL.CHANGELOG);
}

// Cache statistics for monitoring
export function getCacheStats() {
    return {
        commits: commitCache.size(),
        repos: repoCache.size(),
        tags: tagCache.size(),
        changelogs: changelogCache.size(),
    };
}

export { TTL };
