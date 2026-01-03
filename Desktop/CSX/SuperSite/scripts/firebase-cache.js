/**
 * Firebase Read Optimization Module
 * 
 * This module provides caching and throttling for Firebase reads
 * to keep costs low while maintaining good user experience.
 * 
 * Usage:
 * 1. Include this script before other Firebase scripts
 * 2. Use FirebaseCache.get() instead of direct Firestore reads
 * 3. Configure cache durations based on data freshness needs
 */

const FirebaseCache = {
    // Cache storage
    cache: new Map(),

    // Cache durations (in milliseconds)
    CACHE_DURATIONS: {
        leaderboard: 60000,        // 1 minute - leaderboards don't need real-time updates
        presence: 300000,          // 5 minutes - presence data
        users: 300000,             // 5 minutes - user data
        premiumSubscriptions: 60000, // 1 minute - premium status
        promoCodes: 120000,        // 2 minutes - promo codes
        default: 60000             // 1 minute - default cache time
    },

    // Active listeners tracking
    activeListeners: new Map(),

    // Maximum listeners allowed
    MAX_LISTENERS: 5,

    /**
     * Get data from cache or Firebase
     * @param {string} collection - Firestore collection name
     * @param {string} docId - Document ID (optional, for single doc)
     * @param {object} queryOptions - Query options (orderBy, limit, where)
     * @returns {Promise<any>} - Cached or fresh data
     */
    async get(collection, docId = null, queryOptions = {}) {
        const cacheKey = this.generateCacheKey(collection, docId, queryOptions);
        const cached = this.cache.get(cacheKey);
        const now = Date.now();

        // Return cached data if still valid
        if (cached && (now - cached.timestamp) < this.getCacheDuration(collection)) {
            console.log(`📦 Cache HIT: ${cacheKey} (${Math.round((now - cached.timestamp) / 1000)}s old)`);
            return cached.data;
        }

        console.log(`🔄 Cache MISS: ${cacheKey} - fetching from Firebase...`);

        try {
            // Fetch from Firebase
            const data = await this.fetchFromFirebase(collection, docId, queryOptions);

            // Store in cache
            this.cache.set(cacheKey, {
                data: data,
                timestamp: now
            });

            return data;
        } catch (error) {
            console.error(`❌ Firebase read error for ${cacheKey}:`, error);

            // Return stale cache if available
            if (cached) {
                console.log(`⚠️ Returning stale cache for ${cacheKey}`);
                return cached.data;
            }

            throw error;
        }
    },

    /**
     * Fetch data from Firebase
     */
    async fetchFromFirebase(collection, docId, queryOptions) {
        if (!window.firebase || !firebase.firestore) {
            throw new Error('Firebase not available');
        }

        const db = firebase.firestore();

        if (docId) {
            // Single document read
            const doc = await db.collection(collection).doc(docId).get();
            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        }

        // Collection query
        let query = db.collection(collection);

        if (queryOptions.where) {
            queryOptions.where.forEach(([field, op, value]) => {
                query = query.where(field, op, value);
            });
        }

        if (queryOptions.orderBy) {
            const [field, direction = 'asc'] = queryOptions.orderBy;
            query = query.orderBy(field, direction);
        }

        if (queryOptions.limit) {
            query = query.limit(queryOptions.limit);
        }

        const snapshot = await query.get();
        const results = [];
        snapshot.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() });
        });

        return results;
    },

    /**
     * Invalidate cache for a specific key or pattern
     */
    invalidate(pattern) {
        if (pattern === '*') {
            this.cache.clear();
            console.log('🗑️ All cache cleared');
            return;
        }

        for (const key of this.cache.keys()) {
            if (key.includes(pattern)) {
                this.cache.delete(key);
                console.log(`🗑️ Cache invalidated: ${key}`);
            }
        }
    },

    /**
     * Generate a unique cache key
     */
    generateCacheKey(collection, docId, queryOptions) {
        const parts = [collection];
        if (docId) parts.push(docId);
        if (queryOptions.where) parts.push(JSON.stringify(queryOptions.where));
        if (queryOptions.orderBy) parts.push(queryOptions.orderBy.join('_'));
        if (queryOptions.limit) parts.push(`limit_${queryOptions.limit}`);
        return parts.join('::');
    },

    /**
     * Get cache duration for a collection
     */
    getCacheDuration(collection) {
        return this.CACHE_DURATIONS[collection] || this.CACHE_DURATIONS.default;
    },

    /**
     * Create a managed listener (limits total active listeners)
     */
    createManagedListener(name, collection, callback, queryOptions = {}) {
        // Check if we've exceeded max listeners
        if (this.activeListeners.size >= this.MAX_LISTENERS) {
            console.warn(`⚠️ Max listeners (${this.MAX_LISTENERS}) reached. Using one-time read instead.`);
            // Fall back to one-time read
            this.get(collection, null, queryOptions).then(callback);
            return null;
        }

        // Stop existing listener with same name
        this.stopListener(name);

        if (!window.firebase || !firebase.firestore) {
            console.warn('Firebase not available for listener');
            return null;
        }

        const db = firebase.firestore();
        let query = db.collection(collection);

        if (queryOptions.where) {
            queryOptions.where.forEach(([field, op, value]) => {
                query = query.where(field, op, value);
            });
        }

        if (queryOptions.orderBy) {
            const [field, direction = 'desc'] = queryOptions.orderBy;
            query = query.orderBy(field, direction);
        }

        if (queryOptions.limit) {
            query = query.limit(queryOptions.limit);
        }

        const unsubscribe = query.onSnapshot(
            (snapshot) => {
                const results = [];
                snapshot.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() });
                });
                callback(results);
            },
            (error) => {
                console.error(`❌ Listener error for ${name}:`, error);
                // Fall back to cached data
                this.get(collection, null, queryOptions).then(callback);
            }
        );

        this.activeListeners.set(name, unsubscribe);
        console.log(`📡 Listener started: ${name} (${this.activeListeners.size}/${this.MAX_LISTENERS} active)`);

        return unsubscribe;
    },

    /**
     * Stop a specific listener
     */
    stopListener(name) {
        const unsubscribe = this.activeListeners.get(name);
        if (unsubscribe) {
            unsubscribe();
            this.activeListeners.delete(name);
            console.log(`🛑 Listener stopped: ${name}`);
        }
    },

    /**
     * Stop all listeners
     */
    stopAllListeners() {
        this.activeListeners.forEach((unsubscribe, name) => {
            unsubscribe();
            console.log(`🛑 Listener stopped: ${name}`);
        });
        this.activeListeners.clear();
    },

    /**
     * Get cache statistics
     */
    getStats() {
        return {
            cacheEntries: this.cache.size,
            activeListeners: this.activeListeners.size,
            maxListeners: this.MAX_LISTENERS
        };
    }
};

// Make globally available
window.FirebaseCache = FirebaseCache;

// Clean up listeners when page unloads
window.addEventListener('beforeunload', () => {
    FirebaseCache.stopAllListeners();
});

console.log('🚀 Firebase Cache Module loaded - reduces reads by up to 90%!');
