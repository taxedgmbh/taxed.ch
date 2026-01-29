/**
 * CacheManager - Shared caching utility for services
 * Provides in-memory caching with expiration support
 */

export interface CacheOptions {
  /** Cache duration in milliseconds (default: 5 minutes) */
  duration?: number;
  /** Whether to use caching (default: true) */
  enabled?: boolean;
}

export class CacheManager {
  private cache: Map<string, unknown> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly defaultDuration: number;

  constructor(defaultDurationMs: number = 5 * 60 * 1000) {
    this.defaultDuration = defaultDurationMs;
  }

  /**
   * Get cached data or fetch using the provided fetcher function
   */
  async getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const { duration = this.defaultDuration, enabled = true } = options;

    if (enabled && this.has(key)) {
      const expiry = this.cacheExpiry.get(key);
      if (expiry && Date.now() < expiry) {
        return this.cache.get(key) as T;
      }
    }

    const data = await fetcher();

    if (enabled) {
      this.set(key, data, duration);
    }

    return data;
  }

  /**
   * Check if a key exists and is not expired
   */
  has(key: string): boolean {
    if (!this.cache.has(key)) return false;
    const expiry = this.cacheExpiry.get(key);
    return expiry ? Date.now() < expiry : false;
  }

  /**
   * Get a value from cache (returns undefined if expired or not found)
   */
  get<T>(key: string): T | undefined {
    if (!this.has(key)) return undefined;
    return this.cache.get(key) as T;
  }

  /**
   * Set a value in cache with optional custom duration
   */
  set<T>(key: string, value: T, durationMs?: number): void {
    this.cache.set(key, value);
    this.cacheExpiry.set(key, Date.now() + (durationMs ?? this.defaultDuration));
  }

  /**
   * Delete a specific key from cache
   */
  delete(key: string): boolean {
    this.cacheExpiry.delete(key);
    return this.cache.delete(key);
  }

  /**
   * Clear all cached data
   */
  clear(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  /**
   * Remove expired entries (garbage collection)
   */
  pruneExpired(): number {
    const now = Date.now();
    let pruned = 0;

    for (const [key, expiry] of this.cacheExpiry.entries()) {
      if (now >= expiry) {
        this.cache.delete(key);
        this.cacheExpiry.delete(key);
        pruned++;
      }
    }

    return pruned;
  }
}

// Pre-configured instances for common use cases
export const blogCache = new CacheManager(5 * 60 * 1000);  // 5 minutes
export const productsCache = new CacheManager(10 * 60 * 1000); // 10 minutes

export default CacheManager;
