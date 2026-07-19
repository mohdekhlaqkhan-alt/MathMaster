/**
 * ============================================
 * 🎬 GIPHY API PROXY — Production Endpoint
 * ============================================
 * Proxies Giphy REST API requests server-side so the API key
 * is never exposed in client JavaScript.
 *
 * Routes:
 *   GET /api/giphy?type=trending&offset=0&limit=20
 *   GET /api/giphy?type=search&q=happy&offset=0&limit=20
 *
 * Security: Fortress Protocol Compliant
 *   - CORS whitelisting via _security.js
 *   - Input sanitization & validation
 *   - API key stored in env, never in client
 *   - Response shaping (strip sensitive fields)
 *   - CDN cache headers for performance
 */

const { setCorsHeaders, handlePreflight, sendError } = require('./_security');

// ============================================
// GIPHY API CONFIGURATION
// ============================================
const GIPHY_API_BASE = 'https://api.giphy.com/v1/gifs';
const DEFAULT_RATING  = 'g';   // Safe for all audiences
const DEFAULT_LANG    = 'en';

// ============================================
// CURATED FALLBACK DATABASE
// Used when GIPHY_API_KEY is not configured.
// These are stable, well-known Giphy GIF IDs that have
// existed on the platform for years and have known
// canonical CDN URLs.
// Format uses media.giphy.com which is the authoritative CDN.
// ============================================
const FALLBACK_DB = {
    trending: [
        { id: 'JIX9t2j0ZTN9S',     title: 'Yes! Nod',              w: 200, h: 200 },
        { id: 'jUwpNzg9IcyrK',      title: 'Parkour',               w: 200, h: 110 },
        { id: '13Nc3xlO1kGg3S',     title: 'Office Celebrate',      w: 200, h: 150 },
        { id: 'nflY6KFeCWws8',      title: 'Typing...',             w: 200, h: 200 },
        { id: 'l0MYt5jPR6QX5pnqM',  title: 'Minions Cheer',         w: 200, h: 113 },
        { id: '3o7abGQa0aRvXSk48c',  title: 'Fun Dance',             w: 200, h: 200 },
        { id: 'QAGbbeasRkLxdu3fNS', title: 'Minions Happy',         w: 200, h: 122 },
        { id: '5ndem5WKKMSFvNLHmV', title: 'Celebration',           w: 200, h: 200 },
        { id: 'xT0GqszuvQyQ6418VO', title: 'Wow Reaction',          w: 200, h: 200 },
        { id: 'l41YkFIiBxQdRlMnK',  title: 'Amazing',              w: 200, h: 200 },
    ],
    happy: [
        { id: 'JIX9t2j0ZTN9S',     title: 'Yes! Happy',            w: 200, h: 200 },
        { id: 'l0MYt5jPR6QX5pnqM',  title: 'Minions Cheer',         w: 200, h: 113 },
        { id: 'QAGbbeasRkLxdu3fNS', title: 'Minions Happy',         w: 200, h: 122 },
        { id: '5ndem5WKKMSFvNLHmV', title: 'Celebration',           w: 200, h: 200 },
        { id: '3oFzmkkFW6RX3kJP56', title: 'Happy Dance',           w: 200, h: 200 },
    ],
    love: [
        { id: 'l2R0eznXFEssMRwuA',  title: 'Heart Love',            w: 200, h: 200 },
        { id: 'uj9CcJZJOicCk',      title: 'Love Hugs',             w: 200, h: 200 },
        { id: 'oiH4RFJkKOnug',      title: 'Heart Pulse',           w: 200, h: 200 },
    ],
    thanks: [
        { id: '26BRrSl0qOQGTzMU8',  title: 'Thank You',             w: 200, h: 200 },
        { id: '6tHy8UAbv79Ls',      title: 'Thanks a Lot',          w: 200, h: 200 },
        { id: 'l2Sqdzlg0XgPDMd6M',  title: 'Thank You so Much',     w: 200, h: 200 },
    ],
    celebrate: [
        { id: '13Nc3xlO1kGg3S',     title: 'Office Celebrate',      w: 200, h: 150 },
        { id: '5ndem5WKKMSFvNLHmV', title: 'Celebration',           w: 200, h: 200 },
        { id: 'l0MYt5jPR6QX5pnqM',  title: 'Minions Cheer',         w: 200, h: 113 },
        { id: 'artj92V8o75VPL7AeQ', title: 'Congrats',              w: 200, h: 200 },
    ],
    funny: [
        { id: 'jUwpNzg9IcyrK',      title: 'Parkour',               w: 200, h: 110 },
        { id: 'nflY6KFeCWws8',      title: 'Typing...',             w: 200, h: 200 },
        { id: 'VbnUQpnihPsi0',      title: 'Laughing Hard',         w: 200, h: 200 },
        { id: 'GeimqsH0TLDt4',      title: 'LOL Cat',               w: 200, h: 200 },
    ],
    sad: [
        { id: 'd2lcHJTG5Tscg',      title: 'Sad Crying',            w: 200, h: 200 },
        { id: 'evVYqWfFiXlqB5odKY', title: 'Tears',                 w: 200, h: 200 },
        { id: '9Y5BbDSkVJ',         title: 'Sad Bear',              w: 200, h: 200 },
    ],
    wow: [
        { id: 'xT0GqszuvQyQ6418VO', title: 'Wow Reaction',          w: 200, h: 200 },
        { id: '5VKbQ5DYH4oK2mFVi5', title: 'Mind Blown',            w: 200, h: 200 },
        { id: '3oEjHGr1Fhz0kyv8Ig', title: 'Shocked',               w: 200, h: 200 },
    ],
    yes: [
        { id: 'JIX9t2j0ZTN9S',     title: 'Yes! Nod',              w: 200, h: 200 },
        { id: '6oMKugqMut7ks',      title: 'Thumbs Up',             w: 200, h: 200 },
        { id: 'GIPHY0QFrKFnLLJ',    title: 'Yes!',                  w: 200, h: 200 },
    ],
};

/**
 * Format a curated fallback item into the same shape
 * the proxy returns for real Giphy API results.
 */
function formatFallbackItem(item) {
    const preview = `https://media.giphy.com/media/${item.id}/200w.gif`;
    const full    = `https://media.giphy.com/media/${item.id}/giphy.gif`;
    return {
        id:            item.id,
        title:         item.title,
        previewUrl:    preview,
        previewWidth:  item.w || 200,
        previewHeight: item.h || 150,
        fullUrl:       full,
        fullWidth:     480,
        fullHeight:    Math.round(480 * (item.h / item.w)) || 360,
    };
}

/**
 * Strip a Giphy API `data` array item down to only what the
 * client needs, to minimize response size.
 */
function formatGiphyItem(gif) {
    const preview = gif.images?.fixed_width    || gif.images?.downsized;
    const full    = gif.images?.original       || gif.images?.fixed_width;

    if (!preview?.url) return null;

    return {
        id:            gif.id,
        title:         gif.title || '',
        previewUrl:    preview.url,
        previewWidth:  parseInt(preview.width)  || 200,
        previewHeight: parseInt(preview.height) || 150,
        fullUrl:       full?.url    || preview.url,
        fullWidth:     parseInt(full?.width)  || 480,
        fullHeight:    parseInt(full?.height) || 360,
    };
}

// ============================================
// MAIN HANDLER
// ============================================
module.exports = async function handler(req, res) {
    setCorsHeaders(req, res);
    if (handlePreflight(req, res)) return;

    if (req.method !== 'GET') {
        return sendError(res, 405, 'Method not allowed');
    }

    // ——— Parse & sanitize query params ———
    const {
        type   = 'trending',
        q      = '',
        offset = '0',
        limit  = '20',
    } = req.query;

    const safeType   = ['trending', 'search'].includes(type) ? type : 'trending';
    const safeQ      = String(q  || '').trim().slice(0, 100);
    const safeOffset = Math.max(0, Math.min(parseInt(offset) || 0, 5000));
    const safeLimit  = Math.max(1, Math.min(parseInt(limit)  || 20, 50));

    if (safeType === 'search' && !safeQ) {
        return sendError(res, 400, 'Search query (q) is required for type=search');
    }

    const apiKey = process.env.GIPHY_API_KEY;

    // ——— No API key: return curated fallback ———
    if (!apiKey) {
        console.warn('[giphy] GIPHY_API_KEY not set — returning curated fallback');

        const category = safeType === 'search'
            ? (FALLBACK_DB[safeQ.toLowerCase()] ? safeQ.toLowerCase() : 'trending')
            : 'trending';

        const pool     = FALLBACK_DB[category] || FALLBACK_DB.trending;
        const sliced   = pool.slice(safeOffset, safeOffset + safeLimit);
        const data     = sliced.map(formatFallbackItem);

        res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
        return res.status(200).json({
            data,
            pagination: { total_count: pool.length, count: data.length, offset: safeOffset },
            is_fallback: true,
        });
    }

    // ——— Build real Giphy API URL ———
    let giphyUrl;
    if (safeType === 'search') {
        const params = new URLSearchParams({
            api_key: apiKey,
            q:       safeQ,
            offset:  safeOffset,
            limit:   safeLimit,
            rating:  DEFAULT_RATING,
            lang:    DEFAULT_LANG,
        });
        giphyUrl = `${GIPHY_API_BASE}/search?${params}`;
    } else {
        const params = new URLSearchParams({
            api_key: apiKey,
            offset:  safeOffset,
            limit:   safeLimit,
            rating:  DEFAULT_RATING,
        });
        giphyUrl = `${GIPHY_API_BASE}/trending?${params}`;
    }

    // ——— Proxy the request ———
    try {
        const upstream = await fetch(giphyUrl, {
            headers: { 'User-Agent': 'BroPro/1.0' },
        });

        if (!upstream.ok) {
            const body = await upstream.text();
            console.error(`[giphy] Upstream error ${upstream.status}:`, body.slice(0, 200));
            return sendError(res, 502, 'GIF service temporarily unavailable');
        }

        const json = await upstream.json();

        if (!json.data || json.meta?.status !== 200) {
            console.error('[giphy] Unexpected Giphy response:', JSON.stringify(json.meta));
            return sendError(res, 502, 'GIF service returned an unexpected response');
        }

        const data = json.data.map(formatGiphyItem).filter(Boolean);
        const pagination = {
            total_count: json.pagination?.total_count || data.length,
            count:       data.length,
            offset:      safeOffset,
        };

        // Cache: 5 min for trending, 2 min for search
        const maxAge = safeType === 'trending' ? 300 : 120;
        res.setHeader('Cache-Control', `public, max-age=${maxAge}, s-maxage=${maxAge}`);

        return res.status(200).json({ data, pagination });

    } catch (err) {
        console.error('[giphy] Proxy fetch error:', err.message);
        return sendError(res, 502, 'GIF service temporarily unavailable');
    }
};
