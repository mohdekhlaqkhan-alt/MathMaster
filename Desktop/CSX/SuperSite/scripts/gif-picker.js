/* ============================================
   BROPRO PREMIUM GIF PICKER 🎬✨
   ============================================
   Production-grade GIF picker powered by GIPHY.
   All API calls are proxied server-side via /api/giphy
   so the API key is never exposed to the client.

   Features:
   - Trending GIFs grid on open
   - Real-time search with debounce
   - Offset-based pagination / infinite scroll
   - Tap-to-send (instant)
   - Loading shimmer skeletons
   - Powered by GIPHY (ToS-compliant attribution)
   - Premium glassmorphism design
   - Mobile-optimized
   - ⭐ GIF Favorites system (localStorage)
   ============================================ */

window.BroProGifPicker = {
    // ═══════════════════════════════════════════
    // CONFIGURATION
    // ═══════════════════════════════════════════
    config: {
        // All GIF API calls go through our own Vercel serverless proxy.
        // The proxy holds the GIPHY_API_KEY securely in environment vars.
        apiBase: '/api/giphy',
        limit: 20,
        searchDebounceMs: 400,
        maxWidth: 280, // Max GIF width in chat bubble
    },

    // ─── no client-side DB needed — proxy handles everything ───
    // Legacy placeholder kept so any references to this.db don't crash.
    db: {
      "trending": [
        { "id": "sLIVotYbXXG3HpjNyw", "title": "trending gif" },
        { "id": "joSNxeswxuc74Juo8X", "title": "trending gif" },
        { "id": "hS3IfEjaYUw4YDhEjR", "title": "trending gif" },
        { "id": "37Fsl1eFxbhtu", "title": "trending gif" },
        { "id": "fa1AV8UvZvfBFOIt7F", "title": "trending gif" },
        { "id": "wYyTHMm50f4Dm", "title": "trending gif" },
        { "id": "MchM4SnYVFwCdFhVlL", "title": "trending gif" },
        { "id": "EvYHHSntaIl5m", "title": "trending gif" },
        { "id": "tXL4FHPSnVJ0A", "title": "trending gif" },
        { "id": "gj0QdZ9FgqGhOBNlFS", "title": "trending gif" },
        { "id": "13hxeOYjoTWtK8", "title": "trending gif" }
      ],
      "happy": [
        { "id": "BWplyaNrHRjRvweNjS", "title": "Minions Happy Dance GIF" },
        { "id": "cDMYFhpEAnE9CkV6yS", "title": "Minions DDR GIF" },
        { "id": "ukmZRuEqc2Rbi", "title": "Dog Happy Dance GIF" },
        { "id": "artj92V8o75VPL7AeQ", "title": "Minions Happy GIF" },
        { "id": "K4o1c3zfNQH59jWqSv", "title": "Minions Happy Birthday GIF" },
        { "id": "geslvCFM31sFW", "title": "Minions Excited GIF" },
        { "id": "fUQ4rhUZJYiQsas6WD", "title": "Minions Celebration GIF" },
        { "id": "aQYR1p8saOQla", "title": "Minions Happy GIF" },
        { "id": "fPRwBcYd71Lox1v7p2", "title": "Minions Happy GIF" },
        { "id": "O9mzywwlZaQGMrH1z5", "title": "Minions Celebrate GIF" },
        { "id": "QaO94TsFEnZauKsboY", "title": "Minions Happy GIF" },
        { "id": "inyqrgp9o3NUA", "title": "Minions Happy GIF" }
      ],
      "love": [
        { "id": "RB46T9ysjzDEs", "title": "love gif" },
        { "id": "n9HfdJCqnh01e99KtB", "title": "Love Heart GIF" },
        { "id": "Zl7u48zLVFgLpRwq6f", "title": "love gif" },
        { "id": "bSLJZSX04jrK8", "title": "love gif" },
        { "id": "l4Ki4biBSwhjyrS48", "title": "love gif" },
        { "id": "Lv2VhwHrt6ljhvZ6LF", "title": "love gif" },
        { "id": "4N1wOi78ZGzSB6H7vK", "title": "love gif" },
        { "id": "Jq11rmNqtsYvDy5cHo", "title": "Love Kiss GIF" },
        { "id": "1JmGiBtqTuehfYxuy9", "title": "Love You Hearts GIF" },
        { "id": "qFmdpUKAFZ6rMobzzu", "title": "love gif" },
        { "id": "0igHDNPGNJ7jU9xcEZ", "title": "love gif" },
        { "id": "MdAf4GJVvA0HxZfJcr", "title": "love gif" }
      ],
      "thanks": [
        { "id": "igB2Th9e4nW6s", "title": "thanks gif" },
        { "id": "E8rJEUMGs9cyWEtNXT", "title": "Thank You Thanks GIF" },
        { "id": "g0kLgAN4t54RK154oA", "title": "Thank You Appreciation GIF" },
        { "id": "l3q2wJsC23ikJg9xe", "title": "Thank You Hug GIF" },
        { "id": "4a1K4geHnbbZ5BKwO1", "title": "Thank You Friends GIF" },
        { "id": "MF9wHplBBbqwYiTTEk", "title": "Thank You Thanks GIF" },
        { "id": "uWlpPGquhGZNFzY90z", "title": "Thank You Applause GIF" },
        { "id": "pwmkIEFl0XrXvZ94Ok", "title": "Thank You Giphy Cares GIF" },
        { "id": "aLYyJdZzzzzbx541JM", "title": "Thank You So Much GIF" },
        { "id": "VrPyu7ZDrMWzFk1JRK", "title": "Thank You Thanks GIF" },
        { "id": "jQQKBVOaa9gIcJunoF", "title": "Thank You Giphy Cares GIF" },
        { "id": "a3IWyhkEC0p32", "title": "thanks gif" }
      ],
      "celebrate": [
        { "id": "J5Xr9k7qK5KGRi45vp", "title": "Congrats Congratulations GIF" },
        { "id": "DyQrKMpqkAhNHZ1iWe", "title": "Celebrate Confetti GIF" },
        { "id": "IbV86sro1ezVBz3wNo", "title": "Congrats Birthday GIF" },
        { "id": "3og0IuE1EjI5ZQzr3i", "title": "Congrats Congratulations GIF" },
        { "id": "lFHtqqh6orvAhbiGmy", "title": "Celebrate Party GIF" },
        { "id": "BPJmthQ3YRwD6QqcVD", "title": "Congrats Congratulations GIF" },
        { "id": "hv14mGOF3MY7wDKPkE", "title": "celebrate gif" },
        { "id": "rrmf3fICPZWg1MMXOW", "title": "Congrats Celebration GIF" },
        { "id": "R3ART6G2nAPNepCtdI", "title": "Congrats Celebration GIF" },
        { "id": "DYPP3JTXIvPT3CPGhE", "title": "Congrats Celebration GIF" },
        { "id": "g9582DNuQppxC", "title": "celebrate gif" },
        { "id": "Ov09jGgEThFKpxZ9eC", "title": "Congrats Birthday GIF" }
      ],
      "funny": [
        { "id": "fHoqSTQTsgSbfUoiTw", "title": "funny gif" },
        { "id": "8lgqAbycBjosxjfi9k", "title": "funny gif" },
        { "id": "nU0EccnuhJa5ofFr6v", "title": "funny gif" },
        { "id": "WXB88TeARFVvi", "title": "Funny Cat Jump" },
        { "id": "ylyUQlf4VUVF9odXKU", "title": "Funny Cat Lol" },
        { "id": "HrdAndWaWUHeihty9Z", "title": "Funny Cat Typing" },
        { "id": "as521kub4b68hW2JhK", "title": "Funny Cat Typing" },
        { "id": "BWplyaNrHRjRvweNjS", "title": "Minions Happy Dance GIF" },
        { "id": "t0AJF1JhZdjji", "title": "funny gif" },
        { "id": "3o6ozvv0zsJskzOCbu", "title": "funny gif" },
        { "id": "SggILpMXO7Xt6", "title": "funny gif" },
        { "id": "okfvUCpgArv3y", "title": "funny gif" }
      ],
      "sad": [
        { "id": "lGBecpB2dIMwt6ohfI", "title": "Crying Crying Baby GIF" },
        { "id": "Lz6971fkGSgCMOOncl", "title": "Sad Crying Cat GIF" },
        { "id": "qQdL532ZANbjy", "title": "Sad Crying Dog GIF" },
        { "id": "TU76e2JHkPchG", "title": "Sad Crying Face GIF" },
        { "id": "ar71Hyi0ZKejXzMoNs", "title": "Sad Broken Heart GIF" },
        { "id": "q2qxiBO5prG9i", "title": "Sad Crying Boy GIF" },
        { "id": "l22ysLe54hZP0wubek", "title": "sad gif" },
        { "id": "VNTMx3LkpG2anXpwbr", "title": "sad gif" },
        { "id": "P53TSsopKicrm", "title": "sad gif" },
        { "id": "10tIjpzIu8fe0", "title": "sad gif" },
        { "id": "H6cmWzp6LGFvqjidB7", "title": "sad gif" },
        { "id": "Ty9Sg8oHghPWg", "title": "sad gif" }
      ],
      "wow": [
        { "id": "oYtVHSxngR3lC", "title": "Shocked Face Wow GIF" },
        { "id": "vQqeT3AYg8S5O", "title": "Shocked Cat Wow GIF" },
        { "id": "l3q2K5jinAlChoCLS", "title": "Shocked Dog Wow GIF" },
        { "id": "cyntNbcW2R7O2BKWEA", "title": "wow gif" },
        { "id": "3OSo3PPaXdw0U", "title": "wow gif" },
        { "id": "KastytLf5Fxm0B8jTz", "title": "wow gif" },
        { "id": "WuGSL4LFUMQU", "title": "wow gif" },
        { "id": "3XR0chfiSTtAI", "title": "wow gif" },
        { "id": "OluyzCAatv35C", "title": "wow gif" },
        { "id": "aWPGuTlDqq2yc", "title": "wow gif" },
        { "id": "PUBxelwT57jsQ", "title": "wow gif" },
        { "id": "QUENDfi6DEMLzQ0CKt", "title": "wow gif" }
      ],
      "yes": [
        { "id": "89x4osEodHEoo", "title": "Yes Thumbs Up GIF" },
        { "id": "fkD36jhiqzJ9m", "title": "Yes Agree Nod GIF" },
        { "id": "3o85xF9vVInNI6KAlG", "title": "Yes Cool Ok GIF" },
        { "id": "S3Ot3hZ5bcy8o", "title": "yes gif" },
        { "id": "yFs12GkGa4Cpq", "title": "yes gif" },
        { "id": "5paQ42LBoVvUNXBayc", "title": "yes gif" },
        { "id": "10Jpr9KSaXLchW", "title": "yes gif" },
        { "id": "jErnybNlfE1lm", "title": "yes gif" },
        { "id": "hVYVYZZBgF50k", "title": "yes gif" },
        { "id": "rJlQLCLUmvd6ugCsK2", "title": "yes gif" },
        { "id": "l1J9N8zrmYCfSrQFq", "title": "yes gif" },
        { "id": "NEvPzZ8bd1V4Y", "title": "yes gif" }
      ]
    },

    // ═══════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════
    state: {
        isOpen: false,
        isLoading: false,
        searchTerm: '',
        gifs: [],
        trendingGifs: [],
        searchTimeout: null,
        nextPos: 0,                // Offset-based pagination (integer)
        hasMore: true,
        totalCount: 0,             // Total results from Giphy
        isStylesInjected: false,
        onSend: null,              // Callback: (gifData) => {}
        context: 'student',        // 'student' | 'admin' | 'group'
        currentChannelId: null,    // For group channel context
        activeTab: 'trending',     // 'trending' | 'favorites'
    },

    // ═══════════════════════════════════════════
    // FAVORITES SYSTEM
    // ═══════════════════════════════════════════
    favorites: {
        MAX_FAVORITES: 25,
        STORAGE_PREFIX: 'bropro_gif_favs_',

        /** Get storage key for current user */
        _getKey() {
            const user = typeof firebase !== 'undefined' && firebase.auth()?.currentUser;
            return this.STORAGE_PREFIX + (user ? user.uid : 'guest');
        },

        /** Load all favorites from localStorage */
        getAll() {
            try {
                const raw = localStorage.getItem(this._getKey());
                return raw ? JSON.parse(raw) : [];
            } catch (e) {
                console.error('🎬 Favorites load error:', e);
                return [];
            }
        },

        /** Save favorites array to localStorage */
        _save(favs) {
            try {
                localStorage.setItem(this._getKey(), JSON.stringify(favs));
            } catch (e) {
                console.error('🎬 Favorites save error:', e);
            }
        },

        /** Check if a GIF is favorited by its id */
        isFavorited(gifId) {
            return this.getAll().some(f => f.id === gifId);
        },

        /** Toggle favorite on/off, returns new state */
        toggle(gifData) {
            const favs = this.getAll();
            const idx = favs.findIndex(f => f.id === gifData.id);

            if (idx !== -1) {
                // Remove
                favs.splice(idx, 1);
                this._save(favs);
                return false;
            } else {
                // Add (enforce cap)
                if (favs.length >= this.MAX_FAVORITES) {
                    // Remove oldest (first) to make room
                    favs.shift();
                }
                favs.push({
                    id: gifData.id,
                    title: gifData.title || '',
                    previewUrl: gifData.previewUrl,
                    previewWidth: gifData.previewWidth || 220,
                    previewHeight: gifData.previewHeight || 160,
                    fullUrl: gifData.fullUrl || gifData.previewUrl,
                    fullWidth: gifData.fullWidth || 220,
                    fullHeight: gifData.fullHeight || 160,
                    savedAt: Date.now(),
                });
                this._save(favs);
                return true;
            }
        },

        /** Get count */
        count() {
            return this.getAll().length;
        },
    },

    // ═══════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════
    init() {
        if (!this.state.isStylesInjected) {
            this.injectStyles();
            this.state.isStylesInjected = true;
        }
        console.log('🎬 BroProGifPicker initialized');
    },

    // ═══════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════

    /**
     * Open the GIF picker
     * @param {Object} options
     * @param {string} options.context - 'student' | 'admin' | 'group'
     * @param {Function} options.onSend - Callback with gif data
     * @param {string} [options.channelId] - For group channel context
     */
    open(options = {}) {
        this.init();
        this.state.context = options.context || 'student';
        this.state.onSend = options.onSend || null;
        this.state.currentChannelId = options.channelId || null;
        this.state.activeTab = 'trending'; // Always open on trending

        // Create or show the picker modal
        this.createPickerModal();
        this.state.isOpen = true;

        // Load trending GIFs
        if (this.state.trendingGifs.length === 0) {
            this.loadTrending();
        } else {
            this.renderGifs(this.state.trendingGifs);
        }

        // Update favorites badge count
        this.updateFavsBadge();

        // Focus search input
        setTimeout(() => {
            const input = document.getElementById('gifSearchInput');
            if (input) input.focus();
        }, 350);
    },

    close() {
        const modal = document.getElementById('gifPickerModal');
        if (modal) {
            modal.classList.remove('gif-modal-active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        this.state.isOpen = false;
        this.state.searchTerm = '';
        this.state.gifs = [];
        this.state.nextPos = 0;
        this.state.hasMore = true;
        this.state.totalCount = 0;
    },

    // ═══════════════════════════════════════════
    // GIPHY PROXY API CALLS
    // Endpoint: /api/giphy  (Vercel serverless function)
    // ═══════════════════════════════════════════

    /**
     * Build the URL for our Giphy proxy endpoint
     */
    _buildProxyUrl(type, extra = {}) {
        const params = new URLSearchParams({
            type,
            offset: this.state.nextPos,
            limit:  this.config.limit,
            ...extra,
        });
        return `${this.config.apiBase}?${params}`;
    },

    async loadTrending() {
        this.state.isLoading = true;
        this.state.nextPos   = 0;
        this.showLoadingState();

        try {
            const res  = await fetch(this._buildProxyUrl('trending'));
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();

            const gifs = this.parseResults(json.data);
            this.state.trendingGifs = gifs;
            this.state.gifs         = gifs;
            this.state.nextPos      = gifs.length;
            this.state.totalCount   = json.pagination?.total_count || gifs.length;
            this.state.hasMore      = this.state.nextPos < this.state.totalCount;

            this.renderGifs(gifs);
        } catch (error) {
            console.error('🎬 Error loading trending GIFs:', error);
            this.showError('Could not load GIFs. Please check your connection.');
        } finally {
            this.state.isLoading = false;
        }
    },

    async searchGifs(query) {
        if (!query || !query.trim()) {
            // Clear search — restore trending cache
            this.state.searchTerm = '';
            this.state.gifs       = this.state.trendingGifs;
            this.state.nextPos    = this.state.trendingGifs.length;
            this.state.hasMore    = this.state.nextPos < this.state.totalCount;
            this.renderGifs(this.state.gifs);
            this.updateCategoryLabel('🔥 Trending');
            return;
        }

        const term = query.trim();
        this.state.searchTerm = term;
        this.state.isLoading  = true;
        this.state.nextPos    = 0;
        this.state.hasMore    = true;
        this.showLoadingState();

        try {
            const url  = this._buildProxyUrl('search', { q: term });
            const res  = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();

            const gifs = this.parseResults(json.data);
            this.state.gifs       = gifs;
            this.state.nextPos    = gifs.length;
            this.state.totalCount = json.pagination?.total_count || gifs.length;
            this.state.hasMore    = this.state.nextPos < this.state.totalCount;

            this.renderGifs(gifs);
            this.updateCategoryLabel(`🔍 "${term}"`);
        } catch (error) {
            console.error('🎬 Error searching GIFs:', error);
            this.showError('Search failed. Please try again.');
        } finally {
            this.state.isLoading = false;
        }
    },

    async loadMore() {
        if (this.state.isLoading || !this.state.hasMore) return;

        this.state.isLoading = true;
        this.showLoadMoreSpinner();

        try {
            const extra = this.state.searchTerm ? { q: this.state.searchTerm } : {};
            const type  = this.state.searchTerm ? 'search' : 'trending';
            const url   = this._buildProxyUrl(type, extra);

            const res  = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();

            const newGifs = this.parseResults(json.data);
            if (newGifs.length > 0) {
                this.state.gifs    = [...this.state.gifs, ...newGifs];
                this.state.nextPos = this.state.nextPos + newGifs.length;
                this.state.hasMore = this.state.nextPos < (json.pagination?.total_count || 0);
                this.appendGifs(newGifs);
            } else {
                this.state.hasMore = false;
            }
        } catch (error) {
            console.error('🎬 Error loading more GIFs:', error);
        } finally {
            this.state.isLoading = false;
            this.hideLoadMoreSpinner();
        }
    },

    /**
     * Parse Giphy proxy response data into normalised GIF objects.
     * The proxy pre-shapes the data, but we also handle raw Giphy format
     * as a safety net.
     */
    parseResults(data) {
        if (!Array.isArray(data)) return [];
        return data.map(gif => {
            if (!gif) return null;

            // Already shaped by our proxy
            if (gif.previewUrl) {
                return {
                    id:            gif.id,
                    title:         gif.title  || '',
                    previewUrl:    gif.previewUrl,
                    previewWidth:  gif.previewWidth  || 200,
                    previewHeight: gif.previewHeight || 150,
                    fullUrl:       gif.fullUrl  || gif.previewUrl,
                    fullWidth:     gif.fullWidth  || 480,
                    fullHeight:    gif.fullHeight || 360,
                };
            }

            // Raw Giphy API format (fallback parser)
            const preview = gif.images?.fixed_width || gif.images?.downsized;
            const full    = gif.images?.original    || gif.images?.fixed_width;
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
        }).filter(Boolean);
    },

    // Legacy stub — removed in favour of proxy; kept so old code references don't crash
    getMatchedGifs(query) {
        const norm = (query || '').toLowerCase().trim();
        if (!norm) return this.db.trending || [];

        // Category direct matches & alias mapping
        const categoryMap = {
            'happy': 'happy', 'joy': 'happy', 'smile': 'happy', 'laugh': 'happy', 'excited': 'happy', 'yay': 'happy',
            'love': 'love', 'heart': 'love', 'kiss': 'love', 'cute': 'love', 'hug': 'love', 'hearts': 'love',
            'thanks': 'thanks', 'thank you': 'thanks', 'thank': 'thanks', 'grateful': 'thanks', 'thanks gif': 'thanks',
            'celebrate': 'celebrate', 'party': 'celebrate', 'congrats': 'celebrate', 'congratulations': 'celebrate', 'success': 'celebrate',
            'funny': 'funny', 'lol': 'funny', 'haha': 'funny', 'cat': 'funny', 'joke': 'funny',
            'sad': 'sad', 'cry': 'sad', 'crying': 'sad', 'tear': 'sad', 'tears': 'sad',
            'wow': 'wow', 'shock': 'wow', 'shocked': 'wow', 'omg': 'wow', 'surprise': 'wow',
            'yes': 'yes', 'thumbs up': 'yes', 'agree': 'yes', 'ok': 'yes', 'cool': 'yes'
        };

        // If it directly matches one of our mapped keys
        if (categoryMap[norm]) {
            return this.db[categoryMap[norm]] || [];
        }

        // Otherwise perform title substring matching across all categories
        const matched = [];
        const seenIds = new Set();

        for (const [cat, list] of Object.entries(this.db)) {
            for (const item of list) {
                if (seenIds.has(item.id)) continue;
                
                // Match search term in title or category name
                if (item.title.toLowerCase().includes(norm) || cat.includes(norm)) {
                    matched.push(item);
                    seenIds.add(item.id);
                }
            }
        }

        // If no direct matches, return general trending gifs to keep UI alive and positive
        if (matched.length === 0) {
            return this.db.trending || [];
        }

        return matched;
    },


    // ═══════════════════════════════════════════
    // SEND GIF
    // ═══════════════════════════════════════════

    sendGif(gifIndex) {
        const gif = this.state.gifs[gifIndex];
        if (!gif) return;
        this._dispatchGif(gif);
    },

    /** Send a GIF from the favorites list */
    sendGifFromFavorites(favIndex) {
        const favs = this.favorites.getAll();
        const gif = favs[favIndex];
        if (!gif) return;
        this._dispatchGif(gif);
    },

    /** Internal: dispatch a GIF to the callback or default handler */
    _dispatchGif(gif) {
        const gifData = {
            type: 'gif',
            gifUrl: gif.fullUrl,
            gifPreviewUrl: gif.previewUrl,
            gifWidth: gif.fullWidth,
            gifHeight: gif.fullHeight,
            gifTitle: gif.title,
        };

        console.log('🎬 Sending GIF:', gif.title || gif.id);

        // Call the onSend callback
        if (typeof this.state.onSend === 'function') {
            this.state.onSend(gifData);
        } else {
            // Default: Send via Talk to Bhai
            this.sendGifToTalkToBhai(gifData);
        }

        // Close picker
        this.close();
    },

    /**
     * Default send handler for Talk to Bhai
     */
    async sendGifToTalkToBhai(gifData) {
        const user = firebase.auth()?.currentUser;
        if (!user) {
            alert('Please log in to send GIFs');
            return;
        }

        // Check wallet balance (GIF costs same as text message = ₹2)
        const cost = 2;
        const profile = window.BroProPlayer?.load() || {};
        const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
        const earnedFromXP = Math.floor((profile.xp || 0) / divisor);
        const addedViaPurchase = profile.walletAdded || 0;
        const spent = profile.walletSpent || 0;
        const currentBalance = Math.max(0, earnedFromXP + addedViaPurchase - spent);

        if (currentBalance < cost) {
            if (window.BroProWallet) {
                BroProWallet.showInsufficientFunds(cost, currentBalance, 'bhai_chat');
            }
            return;
        }

        try {
            const db = firebase.firestore();
            const senderName = user.displayName || profile.name || 'Student';

            // Deduct from wallet
            profile.walletSpent = (profile.walletSpent || 0) + cost;
            window.BroProPlayer?.save(profile);
            if (window.BroProAdmin?.updateChatWalletDisplay) {
                BroProAdmin.updateChatWalletDisplay();
            }

            // Sync walletSpent to Firestore
            if (db) {
                const walletData = { walletSpent: profile.walletSpent };
                db.collection('presence').doc(user.uid).set(walletData, { merge: true }).catch(() => {});
                db.collection('leaderboard').doc(user.uid).set(walletData, { merge: true }).catch(() => {});
            }

            // Play sound
            if (window.BroProSounds) {
                BroProSounds.play('click');
            }

            // Build message data
            const messageData = {
                senderId: user.uid,
                senderName: senderName,
                recipientId: 'admin',
                text: '',
                type: 'gif',
                gifUrl: gifData.gifUrl,
                gifPreviewUrl: gifData.gifPreviewUrl,
                gifWidth: gifData.gifWidth,
                gifHeight: gifData.gifHeight,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                read: false,
                mode: 'real'
            };

            await db.collection('messages').add(messageData);
            console.log('✅ GIF sent to Real Bhai');

            // Refresh chat
            if (window.BroProAdmin?.loadStudentChatHistory) {
                BroProAdmin.loadStudentChatHistory();
            }

        } catch (error) {
            console.error('Error sending GIF:', error);

            // Refund on error
            profile.walletSpent = Math.max(0, (profile.walletSpent || 0) - cost);
            window.BroProPlayer?.save(profile);
            if (window.BroProAdmin?.updateChatWalletDisplay) {
                BroProAdmin.updateChatWalletDisplay();
            }

            alert('Failed to send GIF. No charge applied.');
        }
    },

    // ═══════════════════════════════════════════
    // UI RENDERING
    // ═══════════════════════════════════════════

    createPickerModal() {
        // Remove existing
        const existing = document.getElementById('gifPickerModal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'gifPickerModal';
        modal.className = 'gif-picker-modal';

        const favsCount = this.favorites.count();

        modal.innerHTML = `
            <div class="gif-overlay" onclick="BroProGifPicker.close()"></div>
            <div class="gif-container">
                <!-- Header -->
                <div class="gif-header">
                    <div class="gif-header-left">
                        <span class="gif-header-icon">🎬</span>
                        <span class="gif-header-title">GIFs</span>
                    </div>
                    <!-- Tab Switcher -->
                    <div class="gif-tab-switcher">
                        <button class="gif-tab active" id="gifTabTrending" onclick="BroProGifPicker.switchTab('trending')">
                            🔥 <span class="gif-tab-label">Trending</span>
                        </button>
                        <button class="gif-tab" id="gifTabFavorites" onclick="BroProGifPicker.switchTab('favorites')">
                            ⭐ <span class="gif-tab-label">Favorites</span>
                            <span class="gif-favs-badge" id="gifFavsBadge" style="display:${favsCount > 0 ? 'inline-flex' : 'none'}">${favsCount}</span>
                        </button>
                    </div>
                    <button class="gif-close-btn" onclick="BroProGifPicker.close()" aria-label="Close GIF picker">✕</button>
                </div>

                <!-- Search (hidden in favorites tab) -->
                <div class="gif-search-wrapper" id="gifSearchWrapper">
                    <div class="gif-search-box">
                        <svg class="gif-search-icon" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                        <input type="text" 
                               id="gifSearchInput" 
                               class="gif-search-input" 
                               placeholder="Search GIFs..." 
                               autocomplete="off"
                               oninput="BroProGifPicker.handleSearchInput(this.value)">
                        <button class="gif-search-clear" id="gifSearchClear" onclick="BroProGifPicker.clearSearch()" style="display:none">✕</button>
                    </div>
                    <!-- Quick Tags -->
                    <div class="gif-quick-tags">
                        <button class="gif-tag" onclick="BroProGifPicker.quickSearch('happy')">😊 Happy</button>
                        <button class="gif-tag" onclick="BroProGifPicker.quickSearch('love')">❤️ Love</button>
                        <button class="gif-tag" onclick="BroProGifPicker.quickSearch('thanks')">🙏 Thanks</button>
                        <button class="gif-tag" onclick="BroProGifPicker.quickSearch('celebrate')">🎉 Celebrate</button>
                        <button class="gif-tag" onclick="BroProGifPicker.quickSearch('funny')">😂 Funny</button>
                        <button class="gif-tag" onclick="BroProGifPicker.quickSearch('sad')">😢 Sad</button>
                        <button class="gif-tag" onclick="BroProGifPicker.quickSearch('wow')">😮 Wow</button>
                        <button class="gif-tag" onclick="BroProGifPicker.quickSearch('thumbs up')">👍 Yes</button>
                    </div>
                </div>

                <!-- Category Label -->
                <div class="gif-category-label" id="gifCategoryLabel">🔥 Trending</div>

                <!-- GIF Grid -->
                <div class="gif-grid-container" id="gifGridContainer">
                    <div class="gif-grid" id="gifGrid"></div>
                    <div class="gif-load-more" id="gifLoadMore" style="display:none">
                        <div class="gif-spinner-small"></div>
                    </div>
                </div>

                <!-- Attribution — required by GIPHY Terms of Service -->
                <div class="gif-attribution" id="gifAttribution">
                    <span>Powered by</span>
                    <span class="giphy-logo">GIPHY</span>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate in
        requestAnimationFrame(() => {
            modal.classList.add('gif-modal-active');
        });

        // Setup infinite scroll
        const gridContainer = document.getElementById('gifGridContainer');
        if (gridContainer) {
            gridContainer.addEventListener('scroll', () => {
                const { scrollTop, scrollHeight, clientHeight } = gridContainer;
                if (scrollHeight - scrollTop - clientHeight < 200) {
                    this.loadMore();
                }
            });
        }
    },

    renderGifs(gifs) {
        const grid = document.getElementById('gifGrid');
        if (!grid) return;

        if (gifs.length === 0 && !this.state.isLoading) {
            grid.innerHTML = `
                <div class="gif-empty">
                    <span class="gif-empty-icon">🎬</span>
                    <p>No GIFs found</p>
                    <p class="gif-empty-hint">Try a different search term</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = gifs.map((gif, i) => {
            const isFav = this.favorites.isFavorited(gif.id);
            return `
            <div class="gif-item" 
                 title="${this.escapeAttr(gif.title)}"
                 style="--aspect: ${gif.previewHeight / gif.previewWidth}">
                <img src="${gif.previewUrl}" 
                     alt="${this.escapeAttr(gif.title)}" 
                     loading="lazy"
                     onclick="BroProGifPicker.sendGif(${i})"
                     onload="this.parentElement.classList.add('gif-loaded')"
                     onerror="this.parentElement.style.display='none'">
                <div class="gif-item-shimmer"></div>
                <button class="gif-fav-btn ${isFav ? 'gif-fav-active' : ''}" 
                        onclick="event.stopPropagation(); BroProGifPicker.toggleFavorite(${i})"
                        title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                    ${isFav ? '★' : '☆'}
                </button>
            </div>
        `;
        }).join('');
    },

    appendGifs(newGifs) {
        const grid = document.getElementById('gifGrid');
        if (!grid) return;

        const startIndex = this.state.gifs.length - newGifs.length;
        const html = newGifs.map((gif, i) => {
            const idx = startIndex + i;
            const isFav = this.favorites.isFavorited(gif.id);
            return `
            <div class="gif-item" 
                 title="${this.escapeAttr(gif.title)}"
                 style="--aspect: ${gif.previewHeight / gif.previewWidth}">
                <img src="${gif.previewUrl}" 
                     alt="${this.escapeAttr(gif.title)}" 
                     loading="lazy"
                     onclick="BroProGifPicker.sendGif(${idx})"
                     onload="this.parentElement.classList.add('gif-loaded')"
                     onerror="this.parentElement.style.display='none'">
                <div class="gif-item-shimmer"></div>
                <button class="gif-fav-btn ${isFav ? 'gif-fav-active' : ''}" 
                        onclick="event.stopPropagation(); BroProGifPicker.toggleFavorite(${idx})"
                        title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                    ${isFav ? '★' : '☆'}
                </button>
            </div>
        `;
        }).join('');

        grid.insertAdjacentHTML('beforeend', html);
    },

    showLoadingState() {
        const grid = document.getElementById('gifGrid');
        if (!grid) return;

        // Generate 12 shimmer placeholders
        grid.innerHTML = Array.from({ length: 12 }, (_, i) => `
            <div class="gif-item gif-shimmer-item" style="--aspect: ${0.6 + Math.random() * 0.6}">
                <div class="gif-item-shimmer active"></div>
            </div>
        `).join('');
    },

    showError(msg) {
        const grid = document.getElementById('gifGrid');
        if (!grid) return;

        grid.innerHTML = `
            <div class="gif-empty">
                <span class="gif-empty-icon">⚠️</span>
                <p>${msg}</p>
                <button class="gif-retry-btn" onclick="BroProGifPicker.loadTrending()">
                    🔄 Retry
                </button>
            </div>
        `;
    },

    showLoadMoreSpinner() {
        const el = document.getElementById('gifLoadMore');
        if (el) el.style.display = 'flex';
    },

    hideLoadMoreSpinner() {
        const el = document.getElementById('gifLoadMore');
        if (el) el.style.display = 'none';
    },

    updateCategoryLabel(text) {
        const el = document.getElementById('gifCategoryLabel');
        if (el) el.textContent = text;
    },

    // ═══════════════════════════════════════════
    // SEARCH HANDLING
    // ═══════════════════════════════════════════

    handleSearchInput(value) {
        // Show/hide clear button
        const clearBtn = document.getElementById('gifSearchClear');
        if (clearBtn) clearBtn.style.display = value ? 'flex' : 'none';

        // Debounce search
        clearTimeout(this.state.searchTimeout);
        this.state.searchTimeout = setTimeout(() => {
            this.searchGifs(value);
        }, this.config.searchDebounceMs);
    },

    quickSearch(term) {
        const input = document.getElementById('gifSearchInput');
        if (input) input.value = term;
        this.handleSearchInput(term);
    },

    clearSearch() {
        const input = document.getElementById('gifSearchInput');
        if (input) {
            input.value = '';
            input.focus();
        }
        const clearBtn = document.getElementById('gifSearchClear');
        if (clearBtn) clearBtn.style.display = 'none';

        this.searchGifs('');
    },

    // ═══════════════════════════════════════════
    // FAVORITES UI METHODS
    // ═══════════════════════════════════════════

    /** Toggle a GIF's favorite status from the main grid */
    toggleFavorite(gifIndex) {
        const gif = this.state.gifs[gifIndex];
        if (!gif) return;

        const isNowFav = this.favorites.toggle(gif);

        // Update the star button in the grid
        const grid = document.getElementById('gifGrid');
        if (grid) {
            const items = grid.querySelectorAll('.gif-item');
            const btn = items[gifIndex]?.querySelector('.gif-fav-btn');
            if (btn) {
                btn.classList.toggle('gif-fav-active', isNowFav);
                btn.innerHTML = isNowFav ? '★' : '☆';
                btn.title = isNowFav ? 'Remove from favorites' : 'Add to favorites';

                // Play micro-animation
                if (isNowFav) {
                    btn.classList.add('gif-fav-pop');
                    setTimeout(() => btn.classList.remove('gif-fav-pop'), 400);
                }
            }
        }

        // Update badge count
        this.updateFavsBadge();

        console.log(`🎬 ${isNowFav ? '⭐ Favorited' : '☆ Unfavorited'}: ${gif.title || gif.id}`);
    },

    /** Toggle favorite from the favorites tab */
    toggleFavoriteFromFavTab(gifId) {
        const favs = this.favorites.getAll();
        const gif = favs.find(f => f.id === gifId);
        if (!gif) return;

        this.favorites.toggle(gif);
        this.updateFavsBadge();

        // Re-render the favorites view
        this.renderFavorites();
    },

    /** Switch between trending and favorites tabs */
    switchTab(tab) {
        this.state.activeTab = tab;

        // Update tab buttons
        const trendingTab = document.getElementById('gifTabTrending');
        const favoritesTab = document.getElementById('gifTabFavorites');
        if (trendingTab) trendingTab.classList.toggle('active', tab === 'trending');
        if (favoritesTab) favoritesTab.classList.toggle('active', tab === 'favorites');

        // Show/hide search (hide in favorites tab)
        const searchWrapper = document.getElementById('gifSearchWrapper');
        if (searchWrapper) searchWrapper.style.display = tab === 'trending' ? 'block' : 'none';

        // Show/hide attribution
        const attribution = document.getElementById('gifAttribution');
        if (attribution) attribution.style.display = tab === 'trending' ? 'flex' : 'none';

        if (tab === 'trending') {
            // Restore trending/search view
            const label = this.state.searchTerm ? `🔍 "${this.state.searchTerm}"` : '🔥 Trending';
            this.updateCategoryLabel(label);
            this.renderGifs(this.state.gifs.length > 0 ? this.state.gifs : this.state.trendingGifs);
        } else {
            // Show favorites
            this.updateCategoryLabel(`⭐ Favorites (${this.favorites.count()}/${this.favorites.MAX_FAVORITES})`);
            this.renderFavorites();
        }
    },

    /** Render the favorites grid */
    renderFavorites() {
        const grid = document.getElementById('gifGrid');
        if (!grid) return;

        const favs = this.favorites.getAll();

        // Hide load more in favorites tab
        const loadMore = document.getElementById('gifLoadMore');
        if (loadMore) loadMore.style.display = 'none';

        if (favs.length === 0) {
            grid.innerHTML = `
                <div class="gif-empty gif-favs-empty">
                    <span class="gif-empty-icon">⭐</span>
                    <p>No favorites yet</p>
                    <p class="gif-empty-hint">Tap the ☆ star on any GIF to save it here</p>
                    <button class="gif-retry-btn" onclick="BroProGifPicker.switchTab('trending')">
                        🔥 Browse Trending
                    </button>
                </div>
            `;
            return;
        }

        // Render favorites (newest first)
        const sortedFavs = [...favs].reverse();
        grid.innerHTML = sortedFavs.map((gif, i) => {
            const realIndex = favs.length - 1 - i; // Map back to original index for send
            return `
            <div class="gif-item gif-fav-item" 
                 title="${this.escapeAttr(gif.title)}"
                 style="--aspect: ${gif.previewHeight / gif.previewWidth}">
                <img src="${gif.previewUrl}" 
                     alt="${this.escapeAttr(gif.title)}" 
                     loading="lazy"
                     onclick="BroProGifPicker.sendGifFromFavorites(${realIndex})"
                     onload="this.parentElement.classList.add('gif-loaded')"
                     onerror="this.parentElement.style.display='none'">
                <div class="gif-item-shimmer"></div>
                <button class="gif-fav-btn gif-fav-active gif-fav-remove" 
                        onclick="event.stopPropagation(); BroProGifPicker.toggleFavoriteFromFavTab('${gif.id}')"
                        title="Remove from favorites">
                    ★
                </button>
            </div>
        `;
        }).join('');
    },

    /** Update the favorites badge count */
    updateFavsBadge() {
        const badge = document.getElementById('gifFavsBadge');
        if (!badge) return;
        const count = this.favorites.count();
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    },

    // ═══════════════════════════════════════════
    // UTILITIES
    // ═══════════════════════════════════════════

    escapeAttr(str) {
        if (!str) return '';
        return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },

    // ═══════════════════════════════════════════
    // STATIC: RENDER GIF IN CHAT BUBBLE
    // Called by external renderers (admin.js, group-channels.js)
    // ═══════════════════════════════════════════

    /**
     * Render a GIF message bubble
     * @param {Object} msg - Message object with gifUrl, gifPreviewUrl, gifWidth, gifHeight
     * @returns {string} HTML string
     */
    renderGifBubble(msg) {
        const url = msg.gifUrl || msg.gifPreviewUrl || '';
        if (!url) return '';

        const width = Math.min(msg.gifWidth || 220, this.config.maxWidth);
        const ratio = (msg.gifHeight || 160) / (msg.gifWidth || 220);
        const height = Math.round(width * ratio);

        // Escape URL for safe HTML attribute usage
        const safeUrl = this.escapeAttr(url);

        return `
            <div class="gif-chat-bubble" style="width:${width}px; max-width:100%; min-height:60px">
                <img class="gif-chat-img" 
                     src="${safeUrl}" 
                     alt="GIF" 
                     width="${width}" 
                     height="${height}"
                     loading="lazy"
                     style="opacity:0;transition:opacity 0.3s ease"
                     onload="this.style.opacity='1';this.parentElement.style.minHeight='auto'"
                     onclick="BroProGifPicker.openFullscreen('${safeUrl}')"
                     onerror="this.style.display='none';this.nextElementSibling.style.display='none';this.parentElement.querySelector('.gif-load-fallback').style.display='flex'"
                >
                <span class="gif-badge">GIF</span>
                <div class="gif-load-fallback" style="display:none;flex-direction:column;align-items:center;justify-content:center;padding:1.2rem;min-height:100px;line-height:1.4;gap:8px;text-align:center">
                    <span style="font-size:1.8rem;opacity:0.5">🎬</span>
                    <span style="color:rgba(255,255,255,0.5);font-size:0.8rem;font-weight:600">GIF failed to load</span>
                    <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" 
                       onclick="event.stopPropagation()" 
                       style="color:#a78bfa;font-size:0.75rem;text-decoration:none;padding:4px 12px;border:1px solid rgba(139,92,246,0.3);border-radius:8px;background:rgba(139,92,246,0.1);transition:all 0.2s">
                        Open in new tab ↗
                    </a>
                </div>
            </div>
        `;
    },

    openFullscreen(url) {
        // Reuse existing fullscreen viewer if available
        if (window.BroProAdmin?.openFullscreenImage) {
            BroProAdmin.openFullscreenImage(url);
            return;
        }

        // Fallback: simple fullscreen
        const viewer = document.createElement('div');
        viewer.className = 'gif-fullscreen';
        viewer.onclick = () => viewer.remove();
        viewer.innerHTML = `
            <img src="${url}" alt="GIF">
            <button class="gif-fullscreen-close" onclick="this.parentElement.remove()">✕</button>
        `;
        document.body.appendChild(viewer);
    },

    // ═══════════════════════════════════════════
    // STYLES — Self-contained CSS injection
    // ═══════════════════════════════════════════

    injectStyles() {
        if (document.getElementById('gif-picker-styles')) return;

        const style = document.createElement('style');
        style.id = 'gif-picker-styles';
        style.textContent = `
/* ═══════════════════════════════════════════
   GIF PICKER MODAL
   ═══════════════════════════════════════════ */
.gif-picker-modal {
    position: fixed;
    inset: 0;
    z-index: 10000000;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}
.gif-modal-active {
    opacity: 1;
    visibility: visible;
}

.gif-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.gif-container {
    position: relative;
    width: 100%;
    max-width: 480px;
    height: 72vh;
    max-height: 620px;
    background: linear-gradient(165deg, #161629 0%, #0f0f24 40%, #0a0a1a 100%);
    border: 1px solid rgba(139, 92, 246, 0.25);
    border-bottom: none;
    border-radius: 24px 24px 0 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 -20px 80px rgba(139, 92, 246, 0.15), 0 -4px 30px rgba(0, 0, 0, 0.5);
}
.gif-modal-active .gif-container {
    transform: translateY(0);
}

/* Desktop: center the modal */
@media (min-width: 640px) {
    .gif-picker-modal { align-items: center; padding: 2rem; }
    .gif-container {
        border-radius: 24px;
        border-bottom: 1px solid rgba(139, 92, 246, 0.25);
        height: 75vh;
        max-height: 680px;
        transform: scale(0.9) translateY(30px);
    }
    .gif-modal-active .gif-container {
        transform: scale(1) translateY(0);
    }
}

/* ═══ HEADER ═══ */
.gif-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: rgba(139, 92, 246, 0.06);
    border-bottom: 1px solid rgba(139, 92, 246, 0.12);
    flex-shrink: 0;
}
.gif-header-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}
.gif-header-icon {
    font-size: 1.5rem;
    animation: gifIconPulse 2s ease-in-out infinite;
}
@keyframes gifIconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15) rotate(-5deg); }
}
.gif-header-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.5px;
}
.gif-close-btn {
    width: 36px; height: 36px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}
.gif-close-btn:hover {
    background: rgba(255, 100, 100, 0.2);
    color: #ff6b6b;
}

/* ═══ SEARCH ═══ */
.gif-search-wrapper {
    padding: 0.75rem 1rem 0.5rem;
    flex-shrink: 0;
}

.gif-search-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 14px;
    padding: 0.1rem 0.75rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.gif-search-box:focus-within {
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.gif-search-icon {
    color: rgba(255, 255, 255, 0.35);
    flex-shrink: 0;
}

.gif-search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 0.95rem;
    font-family: inherit;
    padding: 0.65rem 0;
}
.gif-search-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
}

.gif-search-clear {
    width: 24px; height: 24px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
}
.gif-search-clear:hover {
    background: rgba(255, 100, 100, 0.2);
    color: #ff6b6b;
}

/* Quick Tags */
.gif-quick-tags {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.6rem;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.25rem;
}
.gif-quick-tags::-webkit-scrollbar { display: none; }

.gif-tag {
    flex-shrink: 0;
    padding: 0.35rem 0.7rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 20px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.78rem;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}
.gif-tag:hover, .gif-tag:active {
    background: rgba(139, 92, 246, 0.25);
    border-color: rgba(139, 92, 246, 0.4);
    color: #fff;
    transform: translateY(-1px);
}

/* ═══ CATEGORY LABEL ═══ */
.gif-category-label {
    padding: 0.4rem 1.25rem 0.25rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.45);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    flex-shrink: 0;
}

/* ═══ GIF GRID ═══ */
.gif-grid-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 0.75rem 0.75rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
}
.gif-grid-container::-webkit-scrollbar {
    width: 4px;
}
.gif-grid-container::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 4px;
}

.gif-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
}

.gif-item {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.03);
    /* Use CSS aspect-ratio from custom property */
    aspect-ratio: 1 / var(--aspect, 0.75);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.gif-item:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.25);
    z-index: 1;
}
.gif-item:active {
    transform: scale(0.97);
}

.gif-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.gif-item.gif-loaded img {
    opacity: 1;
}

/* Shimmer loading effect */
.gif-item-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        110deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.04) 40%,
        rgba(139, 92, 246, 0.08) 50%,
        rgba(255, 255, 255, 0.04) 60%,
        rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    pointer-events: none;
    opacity: 0;
}
.gif-item-shimmer.active,
.gif-shimmer-item .gif-item-shimmer {
    opacity: 1;
    animation: gifShimmer 1.5s ease-in-out infinite;
}
.gif-loaded .gif-item-shimmer {
    opacity: 0;
}

@keyframes gifShimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.gif-shimmer-item {
    background: rgba(139, 92, 246, 0.05);
    border-radius: 12px;
}

/* Empty / Error State */
.gif-empty {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    gap: 0.5rem;
}
.gif-empty-icon {
    font-size: 2.5rem;
    opacity: 0.6;
}
.gif-empty p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    margin: 0;
}
.gif-empty-hint {
    font-size: 0.8rem !important;
    color: rgba(255, 255, 255, 0.3) !important;
}
.gif-retry-btn {
    margin-top: 0.75rem;
    padding: 0.5rem 1.25rem;
    background: rgba(139, 92, 246, 0.2);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 10px;
    color: #a78bfa;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
}
.gif-retry-btn:hover {
    background: rgba(139, 92, 246, 0.35);
}

/* Load More Spinner */
.gif-load-more {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
}
.gif-spinner-small {
    width: 24px; height: 24px;
    border: 3px solid rgba(139, 92, 246, 0.15);
    border-top-color: #8b5cf6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}

/* ═══ ATTRIBUTION ═══ */
.gif-attribution {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    flex-shrink: 0;
}
.gif-attribution span {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.25);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.giphy-logo {
    font-weight: 900;
    letter-spacing: 0.5px;
    font-size: 13px;
    background: linear-gradient(135deg, #00ff99 0%, #00ccff 50%, #9933ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* ═══════════════════════════════════════════
   GIF IN CHAT BUBBLES
   ═══════════════════════════════════════════ */
.gif-chat-bubble {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    margin: 0.3rem 0;
    background: rgba(139, 92, 246, 0.05);
    line-height: 0;
}
.gif-chat-img {
    width: 100%;
    height: auto;
    border-radius: 14px;
    display: block;
    transition: filter 0.2s ease;
}
.gif-chat-img:hover {
    filter: brightness(1.08);
}
.gif-badge {
    position: absolute;
    bottom: 8px;
    left: 8px;
    padding: 2px 8px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 6px;
    font-size: 0.6rem;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 1px;
    text-transform: uppercase;
}
.gif-broken {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    color: rgba(255, 255, 255, 0.45);
    font-size: 0.8rem;
    line-height: 1.4;
    min-height: 100px;
    gap: 8px;
}

/* Fullscreen viewer fallback */
.gif-fullscreen {
    position: fixed;
    inset: 0;
    z-index: 99999999;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    animation: fadeIn 0.2s ease;
}
.gif-fullscreen img {
    max-width: 95vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 12px;
}
.gif-fullscreen-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px; height: 44px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* ═══ GIF button in action menu ═══ */
.gif-menu-badge {
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    color: white;
    font-size: 0.55rem;
    font-weight: 800;
    padding: 1px 5px;
    border-radius: 4px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-left: auto;
}

/* ═══════════════════════════════════════════
   TAB SWITCHER
   ═══════════════════════════════════════════ */
.gif-tab-switcher {
    display: flex;
    gap: 2px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 3px;
}
.gif-tab {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.35rem 0.7rem;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.78rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap;
    position: relative;
}
.gif-tab:hover {
    color: rgba(255, 255, 255, 0.75);
    background: rgba(255, 255, 255, 0.05);
}
.gif-tab.active {
    background: rgba(139, 92, 246, 0.2);
    color: #c4b5fd;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
}
.gif-tab-label {
    display: none;
}
@media (min-width: 400px) {
    .gif-tab-label { display: inline; }
}

/* Favorites count badge */
.gif-favs-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    border-radius: 8px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: #fff;
    font-size: 0.6rem;
    font-weight: 800;
    line-height: 1;
}

/* ═══════════════════════════════════════════
   FAVORITE STAR BUTTON ON GIFs
   ═══════════════════════════════════════════ */
.gif-fav-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    color: rgba(255, 255, 255, 0.6);
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.2s ease;
    z-index: 2;
    padding: 0;
    line-height: 1;
}
.gif-item:hover .gif-fav-btn,
.gif-fav-btn.gif-fav-active {
    opacity: 1;
    transform: scale(1);
}
.gif-fav-btn:hover {
    background: rgba(0, 0, 0, 0.75);
    transform: scale(1.15) !important;
}
.gif-fav-btn.gif-fav-active {
    color: #fbbf24;
    text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
}

/* Pop animation when favoriting */
.gif-fav-pop {
    animation: gifFavPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes gifFavPop {
    0% { transform: scale(1); }
    40% { transform: scale(1.5); }
    100% { transform: scale(1); }
}

/* Remove button in favorites tab */
.gif-fav-remove {
    opacity: 1;
    transform: scale(1);
}
.gif-fav-remove:hover {
    color: #ef4444 !important;
    text-shadow: 0 0 8px rgba(239, 68, 68, 0.5) !important;
    background: rgba(239, 68, 68, 0.15);
}

/* Favorites empty state enhancement */
.gif-favs-empty .gif-empty-icon {
    font-size: 3rem;
    animation: gifStarFloat 3s ease-in-out infinite;
}
@keyframes gifStarFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(5deg); }
}

/* Favorite items have a subtle gold border */
.gif-fav-item {
    border: 1px solid rgba(251, 191, 36, 0.15);
}
.gif-fav-item:hover {
    border-color: rgba(251, 191, 36, 0.35);
    box-shadow: 0 4px 20px rgba(251, 191, 36, 0.15);
}
        `;

        document.head.appendChild(style);
    },
};

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BroProGifPicker.init());
} else {
    BroProGifPicker.init();
}

console.log('🎬 BroProGifPicker module loaded');
