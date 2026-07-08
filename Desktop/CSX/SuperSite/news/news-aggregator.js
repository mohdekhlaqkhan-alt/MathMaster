/**
 * 📰 BroPro Times — News Aggregator
 * Fetches and normalizes news from external Hindi RSS feeds.
 * Provides unified article format compatible with the BroPro Times reader.
 *
 * @module NewsAggregator
 * @version 1.0.0
 */

const NewsAggregator = (() => {
    'use strict';

    // ── Constants ────────────────────────────────────────────────────────
    const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
    const CACHE_KEY = 'bpt_rss_cache';
    const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

    const RSS_FEEDS = [
        {
            id: 'amarujala_breaking',
            name: 'अमर उजाला',
            nameEn: 'Amar Ujala',
            url: 'https://www.amarujala.com/rss/breaking-news.xml',
            color: '#e53e3e',
            defaultCategory: 'local',
            logo: '📰',
        },
        {
            id: 'jagran_latest',
            name: 'दैनिक जागरण',
            nameEn: 'Dainik Jagran',
            url: 'https://www.jagran.com/rss/latest-news.xml',
            color: '#2563eb',
            defaultCategory: 'local',
            logo: '📰',
        },
        {
            id: 'ndtv_hindi',
            name: 'NDTV हिंदी',
            nameEn: 'NDTV Hindi',
            url: 'https://feeds.feedburner.com/ndtvkhabar',
            color: '#dc2626',
            defaultCategory: 'politics',
            logo: '📺',
        },
    ];

    // ── Category Mapping ────────────────────────────────────────────────
    const CATEGORY_MAP = {
        'शिक्षा': 'education', 'education': 'education',
        'खेल': 'sports', 'sports': 'sports', 'क्रिकेट': 'sports',
        'राजनीति': 'politics', 'politics': 'politics', 'political': 'politics',
        'व्यापार': 'business', 'business': 'business', 'economy': 'business',
        'तकनीक': 'science_tech', 'technology': 'science_tech', 'tech': 'science_tech', 'science': 'science_tech',
        'स्वास्थ्य': 'health', 'health': 'health',
        'मनोरंजन': 'arts_culture', 'entertainment': 'arts_culture',
        'अंतरराष्ट्रीय': 'world_brief', 'world': 'world_brief', 'international': 'world_brief',
        'पर्यावरण': 'environment', 'environment': 'environment',
    };

    // ── Helpers ──────────────────────────────────────────────────────────

    /** Extract text content from the first matching child element. */
    function getTagText(parent, tagName) {
        const el = parent.querySelector(tagName);
        if (!el) return '';
        return el.textContent || '';
    }

    /** Safely decode HTML entities and collapse whitespace. */
    function sanitizeText(text) {
        const div = document.createElement('div');
        div.innerHTML = text;
        return (div.textContent || div.innerText || '').trim().replace(/\s+/g, ' ');
    }

    /** Strip all HTML tags, returning plain text. */
    function stripHtml(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return (div.textContent || div.innerText || '').trim();
    }

    /** Generate a short deterministic hash from a string. */
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(36);
    }

    /** Map an RSS category string to the BroPro category system. */
    function mapCategory(rssCategory, defaultCategory) {
        if (!rssCategory) return defaultCategory;
        const lower = rssCategory.toLowerCase();
        for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
            if (lower.includes(keyword)) return category;
        }
        return defaultCategory;
    }

    // ── Cache Management ────────────────────────────────────────────────

    function getCachedArticles() {
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            const cached = JSON.parse(raw);
            if (Date.now() - cached.timestamp > CACHE_TTL) {
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            cached.articles.forEach(a => { a.publishedAt = new Date(a.publishedAt); });
            return cached.articles;
        } catch (_) {
            return null;
        }
    }

    function setCachedArticles(articles) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), articles }));
        } catch (e) {
            console.warn('[NewsAggregator] Failed to cache articles:', e.message);
        }
    }

    // ── Normalisation ───────────────────────────────────────────────────

    /** Convert a raw RSS item + feed config into the unified BroPro article shape. */
    function normalizeArticle(rawItem, feedConfig) {
        const publishedDate = rawItem.pubDate ? new Date(rawItem.pubDate) : new Date();
        const mappedCategory = mapCategory(rawItem.category, feedConfig.defaultCategory);

        return {
            id: `ext_${feedConfig.id}_${hashString(rawItem.title)}`,
            title: rawItem.title,
            summary: rawItem.summary || '',
            body: null,
            coverImageUrl: rawItem.imageUrl || '',
            category: mappedCategory,
            source: feedConfig.id,
            sourceName: feedConfig.name,
            sourceNameEn: feedConfig.nameEn,
            sourceColor: feedConfig.color,
            sourceLogo: feedConfig.logo,
            sourceUrl: rawItem.link,
            authorName: feedConfig.name,
            isAnonymous: false,
            publishedAt: publishedDate,
            readTimeMinutes: Math.max(1, Math.ceil((rawItem.summary || '').split(/\s+/).length / 200)),
            isExternal: true,
            isFeatured: false,
            isPinned: false,
            location: { city: '', tehsil: '', village: '' },
            viewCount: 0,
            reactionCounts: {},
            tags: [],
        };
    }

    // ── RSS Parsing ─────────────────────────────────────────────────────

    /** Parse raw RSS XML into an array of normalised article objects. */
    function parseRSS(xmlText, feedConfig) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, 'text/xml');

        if (xml.querySelector('parsererror')) {
            console.warn(`[NewsAggregator] XML parse error for ${feedConfig.nameEn}`);
            return [];
        }

        const items = xml.querySelectorAll('item');
        const articles = [];

        items.forEach((item, index) => {
            if (index >= 15) return; // Cap at 15 articles per feed

            const title = getTagText(item, 'title');
            const link = getTagText(item, 'link');
            const description = getTagText(item, 'description');
            const pubDate = getTagText(item, 'pubDate');
            const category = getTagText(item, 'category');

            // Extract image from various RSS patterns
            let imageUrl = '';
            const enclosure = item.querySelector('enclosure[type^="image"]');
            if (enclosure) {
                imageUrl = enclosure.getAttribute('url') || '';
            }
            if (!imageUrl) {
                const mediaContent = item.querySelector('content');
                if (mediaContent && mediaContent.getAttribute('url')) {
                    imageUrl = mediaContent.getAttribute('url');
                }
            }
            if (!imageUrl) {
                const imgMatch = description?.match(/<img[^>]+src=["']([^"']+)["']/i);
                if (imgMatch) imageUrl = imgMatch[1];
            }

            if (!title) return; // Skip titleless items

            articles.push(normalizeArticle({
                title: sanitizeText(title),
                summary: sanitizeText(stripHtml(description || '')).substring(0, 200),
                imageUrl,
                link,
                pubDate,
                category: category || '',
            }, feedConfig));
        });

        return articles;
    }

    // ── Fetching ────────────────────────────────────────────────────────

    /**
     * Fetch a single RSS feed through the CORS proxy.
     * @param {Object} feed - Feed configuration object.
     * @returns {Promise<Array>} Normalised articles (empty array on failure).
     */
    async function fetchSingleFeed(feed) {
        try {
            const response = await fetch(CORS_PROXY + encodeURIComponent(feed.url), {
                signal: AbortSignal.timeout(8000),
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const xmlText = await response.text();
            return parseRSS(xmlText, feed);
        } catch (err) {
            console.warn(`[NewsAggregator] Failed to fetch ${feed.nameEn}:`, err.message);
            return [];
        }
    }

    // ── Public API ──────────────────────────────────────────────────────

    /**
     * Fetch all configured RSS feeds in parallel.
     * Returns cached results when available (TTL 15 min).
     * @returns {Promise<Array>} Combined array of normalised articles, newest first.
     */
    async function fetchAll() {
        const cached = getCachedArticles();
        if (cached) {
            console.log(`[NewsAggregator] Serving ${cached.length} cached articles`);
            return cached;
        }

        console.log('[NewsAggregator] Fetching external feeds...');
        const results = await Promise.allSettled(RSS_FEEDS.map(feed => fetchSingleFeed(feed)));

        const allArticles = [];
        results.forEach((result, idx) => {
            if (result.status === 'fulfilled') {
                console.log(`[NewsAggregator] ${RSS_FEEDS[idx].nameEn}: ${result.value.length} articles`);
                allArticles.push(...result.value);
            } else {
                console.warn(`[NewsAggregator] ${RSS_FEEDS[idx].nameEn} failed:`, result.reason);
            }
        });

        allArticles.sort((a, b) => (b.publishedAt?.getTime?.() || 0) - (a.publishedAt?.getTime?.() || 0));

        if (allArticles.length > 0) {
            setCachedArticles(allArticles);
        }

        console.log(`[NewsAggregator] Total: ${allArticles.length} external articles`);
        return allArticles;
    }

    /**
     * Return metadata for all configured feeds (safe for UI display).
     * @returns {Array<{id: string, name: string, nameEn: string, color: string, logo: string}>}
     */
    function getFeeds() {
        return RSS_FEEDS.map(f => ({ id: f.id, name: f.name, nameEn: f.nameEn, color: f.color, logo: f.logo }));
    }

    /**
     * Clear the RSS article cache from localStorage.
     */
    function clearCache() {
        localStorage.removeItem(CACHE_KEY);
    }

    /**
     * Check whether an article originated from an external RSS feed.
     * @param {Object} article
     * @returns {boolean}
     */
    function isExternal(article) {
        return article && article.isExternal === true;
    }

    return { fetchAll, getFeeds, clearCache, isExternal };
})();

window.NewsAggregator = NewsAggregator;
