/**
 * BroPro Service Worker v3.0
 * World-Class PWA with AGGRESSIVE Update Strategy
 * 
 * PROBLEM SOLVED: Users now get updates immediately on refresh!
 * 
 * Features:
 * - Network-First for HTML pages (always get fresh content)
 * - Cache-First only for truly static assets (fonts)
 * - Stale-While-Revalidate for CSS/JS (fresh on next load)
 * - AGGRESSIVE cache invalidation on version change
 * - Force skip waiting and claim clients
 * - No more stale content issues!
 */

// ============================================
// VERSION - UPDATE THIS TO FORCE CACHE REFRESH!
// ============================================
const CACHE_VERSION = 'bropro-v3.8.6';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

// ============================================
// CHAT STATE TRACKING
// ============================================
// Tracks which browser tabs/windows have the chat actively open and visible.
// Used to suppress push notifications when the user is already viewing the
// conversation — mimics WhatsApp/Telegram behavior exactly.
// The page proactively reports state via postMessage; the SW also queries
// clients directly as a fallback for cold restart scenarios.
const activeChatClients = new Map();

// Scripts that should ALWAYS bypass cache (versioned scripts)
const ALWAYS_FRESH_SCRIPTS = [
    'app.js',
    'firebase-auth.js',
    'leaderboard.js',
    'activity-ticker.js',
    'wallet.js',
    'admin.js',
    'bronest.js',
    'push-notifications.js',
    'native-app-feel.js',
    'news-reader.js',
    'news-editor.js'
];

// Core files that must be cached for offline functionality
// PERFORMANCE FIX: Added CSS files to ensure fast loading
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/styles/main.css',
    '/styles/mobile.css'
];

// Subject pages to pre-cache
const SUBJECT_PAGES = [
    '/subjects/maths/',
    '/subjects/science/',
    '/subjects/gk/',
    '/subjects/english/',
    '/subjects/hindi/',
    '/subjects/geography/',
    '/subjects/history/'
];

// External resources to cache
const EXTERNAL_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap'
];

// Cache size limits
const MAX_DYNAMIC_CACHE = 100;
const MAX_IMAGE_CACHE = 50;

// ============================================
// INSTALLATION EVENT
// ============================================

self.addEventListener('install', (event) => {
    console.log('🚀 [BroPro SW] Installing Service Worker v3.0...');
    console.log('📍 Cache Version:', CACHE_VERSION);

    event.waitUntil(
        (async () => {
            // Cache core static assets
            const staticCache = await caches.open(STATIC_CACHE);
            console.log('📦 [BroPro SW] Caching core assets...');

            // Cache core assets (fail gracefully for missing files)
            for (const asset of CORE_ASSETS) {
                try {
                    await staticCache.add(asset);
                } catch (error) {
                    console.warn(`⚠️ [BroPro SW] Could not cache: ${asset}`, error);
                }
            }

            // Pre-cache subject pages in background
            for (const page of SUBJECT_PAGES) {
                try {
                    await staticCache.add(page);
                } catch (error) {
                    console.warn(`⚠️ [BroPro SW] Could not pre-cache: ${page}`);
                }
            }

            // Cache external fonts
            const fontCache = await caches.open(FONT_CACHE);
            for (const font of EXTERNAL_ASSETS) {
                try {
                    await fontCache.add(font);
                } catch (error) {
                    console.warn(`⚠️ [BroPro SW] Could not cache font: ${font}`);
                }
            }

            console.log('✅ [BroPro SW] Installation complete!');

            // IMPORTANT: Force activation immediately - no waiting!
            self.skipWaiting();
        })()
    );
});

// ============================================
// ACTIVATION EVENT
// ============================================

self.addEventListener('activate', (event) => {
    console.log('⚡ [BroPro SW] Activating Service Worker...');

    event.waitUntil(
        (async () => {
            // AGGRESSIVE CACHE CLEANUP
            // Delete ALL old caches when version changes
            const cacheNames = await caches.keys();
            const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, FONT_CACHE];

            console.log('🗑️ [BroPro SW] Cleaning up old caches...');
            console.log('   Current caches to keep:', currentCaches);
            console.log('   All existing caches:', cacheNames);

            // Delete any cache that doesn't match current version
            await Promise.all(
                cacheNames
                    .filter(name => !currentCaches.includes(name))
                    .map(name => {
                        console.log(`🗑️ [BroPro SW] DELETING old cache: ${name}`);
                        return caches.delete(name);
                    })
            );

            // Take control of all clients IMMEDIATELY
            await self.clients.claim();

            console.log('✅ [BroPro SW] Activation complete! Controlling all pages.');

            // Notify all clients about the update
            const clients = await self.clients.matchAll({ type: 'window' });
            clients.forEach(client => {
                client.postMessage({
                    type: 'SW_UPDATED',
                    version: CACHE_VERSION,
                    message: 'New version available!'
                });
            });
        })()
    );
});

// ============================================
// FETCH EVENT - Smart Caching Strategies
// ============================================

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip Chrome extension requests and development tools
    if (url.protocol === 'chrome-extension:' ||
        url.hostname === 'localhost' && url.port === '5173') {
        return;
    }

    // BYPASS SERVICE WORKER completely for API/Firebase requests
    if (isApiRequest(url)) {
        return; // Let the browser handle it directly
    }

    // BYPASS CACHE for critical JS scripts - ALWAYS get fresh!
    if (isCriticalScript(url)) {
        event.respondWith(fetch(request));
        return;
    }

    // Route to appropriate caching strategy
    if (isNavigationRequest(request)) {
        // HTML PAGES: NETWORK FIRST - Always get fresh content!
        event.respondWith(networkFirstWithTimeout(request, DYNAMIC_CACHE, 3000));
    } else if (isFontRequest(url)) {
        // Fonts rarely change - cache first is OK
        event.respondWith(cacheFirst(request, FONT_CACHE));
    } else if (isImageRequest(request)) {
        // Images - stale while revalidate
        event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    } else if (isStaticAsset(url)) {
        // CSS/JS - Network First to get fresh updates!
        event.respondWith(networkFirstWithTimeout(request, STATIC_CACHE, 2000));
    } else {
        // Everything else - network first
        event.respondWith(networkFirstWithTimeout(request, DYNAMIC_CACHE, 3000));
    }
});

// ============================================
// CACHING STRATEGIES
// ============================================

/**
 * Network First with Timeout
 * Best for: HTML pages, CSS, JS - content that changes often
 * Tries network first with a timeout, falls back to cache
 */
async function networkFirstWithTimeout(request, cacheName, timeoutMs = 3000) {
    const cache = await caches.open(cacheName);

    try {
        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Network timeout')), timeoutMs)
        );

        // Race between network and timeout
        const networkResponse = await Promise.race([
            fetch(request),
            timeoutPromise
        ]);

        if (networkResponse.ok) {
            // Cache the fresh response
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.warn('⚠️ [BroPro SW] Network failed, trying cache:', request.url);

        // Fall back to cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Last resort - offline page for navigation
        return createOfflineResponse(request);
    }
}

/**
 * Cache First Strategy
 * Best for: Fonts - truly static assets that rarely change
 */
async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('🔴 [BroPro SW] Cache-first fetch failed:', error);
        return createOfflineResponse(request);
    }
}

/**
 * Stale While Revalidate Strategy
 * Best for: Images - show cached version immediately, update in background
 */
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    // Fetch from network in background
    const fetchPromise = fetch(request)
        .then(networkResponse => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch(error => {
            console.warn('⚠️ [BroPro SW] Background revalidation failed:', error);
            return null;
        });

    // Return cached response immediately if available
    if (cachedResponse) {
        return cachedResponse;
    }

    // Otherwise wait for network
    try {
        const networkResponse = await fetchPromise;
        if (networkResponse) {
            return networkResponse;
        }
        return createOfflineResponse(request);
    } catch (error) {
        return createOfflineResponse(request);
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function isApiRequest(url) {
    // IMPORTANT: Bypass ALL Firebase/auth related requests
    return url.pathname.startsWith('/api/') ||
        url.hostname.includes('firestore.googleapis.com') ||
        url.hostname.includes('firebase') ||
        url.hostname.includes('firebaseapp.com') ||
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('identitytoolkit') ||
        url.hostname.includes('securetoken') ||
        url.hostname.includes('gstatic.com') ||
        url.hostname.includes('accounts.google.com') ||
        url.hostname.includes('cashfree') ||
        url.pathname.includes('__/auth/') ||
        url.pathname.includes('oauth') ||
        url.pathname.includes('token');
}

// Check if this is a critical script that should ALWAYS bypass cache
function isCriticalScript(url) {
    const pathname = url.pathname.toLowerCase();
    return ALWAYS_FRESH_SCRIPTS.some(script => pathname.includes(script));
}

function isImageRequest(request) {
    const accept = request.headers.get('accept') || '';
    return accept.includes('image') ||
        /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(request.url);
}

function isFontRequest(url) {
    return url.hostname === 'fonts.googleapis.com' ||
        url.hostname === 'fonts.gstatic.com' ||
        /\.(woff2?|ttf|otf|eot)$/i.test(url.pathname);
}

function isStaticAsset(url) {
    return /\.(css|js|json)$/i.test(url.pathname) ||
        url.pathname.startsWith('/assets/');
}

function isNavigationRequest(request) {
    return request.mode === 'navigate' ||
        request.headers.get('accept')?.includes('text/html');
}

/**
 * Creates an offline response
 */
async function createOfflineResponse(request) {
    // For navigation requests, return the offline page
    if (isNavigationRequest(request)) {
        const cache = await caches.open(STATIC_CACHE);
        const offlinePage = await cache.match('/offline.html');

        if (offlinePage) {
            return offlinePage;
        }

        // Fallback offline response
        return new Response(
            `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline - BroPro</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Outfit', system-ui, sans-serif;
            background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
          }
          .container { max-width: 400px; }
          .icon { font-size: 4rem; margin-bottom: 1rem; animation: pulse 2s ease-in-out infinite; }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
          h1 { font-size: 2rem; margin-bottom: 1rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          p { color: #a0aec0; line-height: 1.6; margin-bottom: 1.5rem; }
          button {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          button:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">📡</div>
          <h1>You're Offline</h1>
          <p>No worries! Your learning journey is saved. Connect to the internet to continue exploring new topics.</p>
          <button onclick="location.reload()">Try Again 🔄</button>
        </div>
      </body>
      </html>`,
            {
                headers: { 'Content-Type': 'text/html' },
                status: 503,
                statusText: 'Service Unavailable'
            }
        );
    }

    // For other requests, return a simple error
    return new Response('Offline', { status: 503, statusText: 'Offline' });
}

/**
 * Limits cache size by removing oldest entries
 */
async function trimCache(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    if (keys.length > maxItems) {
        const keysToDelete = keys.slice(0, keys.length - maxItems);
        await Promise.all(keysToDelete.map(key => cache.delete(key)));
    }
}

// ============================================
// MESSAGE HANDLING
// ============================================

self.addEventListener('message', (event) => {
    const { type, data } = event.data || {};

    switch (type) {
        case 'SKIP_WAITING':
            console.log('📢 [BroPro SW] Received SKIP_WAITING command');
            self.skipWaiting();
            break;

        case 'CLEAR_ALL_CACHES':
            console.log('🗑️ [BroPro SW] Clearing ALL caches...');
            caches.keys().then(names =>
                Promise.all(names.map(name => {
                    console.log(`🗑️ Deleting cache: ${name}`);
                    return caches.delete(name);
                }))
            ).then(() => {
                console.log('✅ All caches cleared!');
                event.ports[0]?.postMessage({ success: true });
            });
            break;

        case 'GET_VERSION':
            event.ports[0]?.postMessage({ version: CACHE_VERSION });
            break;

        case 'CACHE_URLS':
            if (data?.urls) {
                caches.open(DYNAMIC_CACHE).then(cache =>
                    cache.addAll(data.urls)
                ).then(() => {
                    event.ports[0]?.postMessage({ success: true });
                });
            }
            break;

        case 'FORCE_UPDATE':
            console.log('🔄 [BroPro SW] Force update requested');
            self.skipWaiting();
            break;

        case 'CHAT_FOCUS_STATE':
            // Page reports chat open/close + page visibility state + active channel.
            // This drives the smart notification suppression logic.
            // For group chats, activeChannelId identifies WHICH group is open.
            // For DMs, chatType is 'direct_message' (no channel ID needed).
            if (event.source && event.source.id) {
                if (data && data.chatOpen) {
                    activeChatClients.set(event.source.id, {
                        chatOpen: true,
                        pageVisible: data.pageVisible !== false,
                        chatType: data.chatType || 'direct_message',
                        activeChannelId: data.activeChannelId || null,
                        timestamp: Date.now()
                    });
                } else {
                    activeChatClients.delete(event.source.id);
                }
            }
            break;
    }
});

// ============================================
// PUSH NOTIFICATIONS — Smart Handler
// ============================================
// We intentionally do NOT import firebase-messaging-compat.js here.
// The Firebase Messaging SDK registers its own internal 'push' listener
// which causes DUPLICATE notifications. Instead, we handle the raw
// push event directly — giving us full control, exactly 1 notification.
//
// SMART SUPPRESSION (v3.7): For chat messages (direct_message, group_message),
// we check if the user is actively viewing the chat before showing a system
// notification. This mimics WhatsApp/Telegram behavior: no notification
// slides down on the phone when you're already in the conversation.

/**
 * Determines if a chat notification should be suppressed.
 * Returns true if any controlled client has the chat open AND page visible.
 *
 * Channel-aware logic:
 *   - direct_message: Suppress if ANY DM chat is open (there's only one DM conversation)
 *   - group_message:  Suppress ONLY if the user is viewing the SAME group channel
 *                     (message in Group A should still notify if user is in Group B)
 *
 * Two-tier detection:
 *   Tier 1 (fast):    Check the proactively-updated activeChatClients Map
 *   Tier 2 (fallback): Query visible clients via MessageChannel
 *                      (handles cold SW restart where Map is empty)
 *
 * @param {string} pushType - 'direct_message' or 'group_message'
 * @param {string|null} pushChannelId - The group channel ID from the push (null for DMs)
 */
async function shouldSuppressChatNotification(pushType, pushChannelId) {
    try {
        const windowClients = await self.clients.matchAll({
            type: 'window',
            includeUncontrolled: false
        });

        // No open pages — definitely show the notification
        if (windowClients.length === 0) {
            activeChatClients.clear();
            return false;
        }

        // Build set of currently valid client IDs
        const validClientIds = new Set(windowClients.map(c => c.id));

        // Prune stale entries from clients that no longer exist
        for (const clientId of activeChatClients.keys()) {
            if (!validClientIds.has(clientId)) {
                activeChatClients.delete(clientId);
            }
        }

        // ── Tier 1: Stored state from proactive page updates (fast path) ──
        for (const [, state] of activeChatClients.entries()) {
            if (state.chatOpen && state.pageVisible) {
                if (isMatchingChat(state, pushType, pushChannelId)) {
                    console.log(`[BroPro SW] Tier 1 match: ${pushType} suppressed (channel: ${pushChannelId || 'DM'})`);
                    return true;
                }
            }
        }

        // ── Tier 2: Direct query via MessageChannel (cold-start fallback) ──
        const visibleClients = windowClients.filter(
            c => c.visibilityState === 'visible'
        );
        if (visibleClients.length === 0) return false;

        const results = await Promise.all(
            visibleClients.map(client => queryChatState(client, pushType, pushChannelId))
        );

        const matchingResult = results.find(r => r.suppress === true);

        // Warm the cache for future checks
        if (matchingResult) {
            visibleClients.forEach(client => {
                activeChatClients.set(client.id, {
                    chatOpen: true,
                    pageVisible: true,
                    chatType: matchingResult.chatType || pushType,
                    activeChannelId: matchingResult.activeChannelId || null,
                    timestamp: Date.now()
                });
            });
            console.log(`[BroPro SW] Tier 2 match: client confirmed ${pushType} active (channel: ${pushChannelId || 'DM'})`);
        }

        return !!matchingResult;
    } catch (error) {
        console.warn('[BroPro SW] Chat state check failed:', error.message);
        return false; // Fail-open: show notification if something goes wrong
    }
}

/**
 * Check if a client's active chat matches the incoming push.
 * - DM push: matches any DM chat or ANY open chat (DMs have no channel distinction)
 * - Group push: matches ONLY if the user is viewing THAT specific group channel
 */
function isMatchingChat(state, pushType, pushChannelId) {
    if (pushType === 'direct_message') {
        // DM: suppress if any DM chat is open
        return state.chatType === 'direct_message';
    }
    if (pushType === 'group_message' && pushChannelId) {
        // Group: suppress ONLY if viewing the SAME channel
        return state.chatType === 'group_message' &&
               state.activeChannelId === pushChannelId;
    }
    return false;
}

/**
 * Query a specific client's chat state via MessageChannel.
 * Now passes pushType and pushChannelId so the page can give a precise answer.
 * Times out after 500ms to avoid blocking the push handler indefinitely.
 */
function queryChatState(client, pushType, pushChannelId) {
    return new Promise((resolve) => {
        const channel = new MessageChannel();
        const timer = setTimeout(() => resolve({ suppress: false }), 500);

        channel.port1.onmessage = (event) => {
            clearTimeout(timer);
            const d = event.data || {};
            resolve({
                suppress: d.chatOpen === true,
                chatType: d.chatType || null,
                activeChannelId: d.activeChannelId || null
            });
        };

        try {
            client.postMessage({
                type: 'CHAT_STATE_QUERY',
                pushType: pushType || null,
                pushChannelId: pushChannelId || null
            }, [channel.port2]);
        } catch (e) {
            clearTimeout(timer);
            resolve({ suppress: false });
        }
    });
}

self.addEventListener('push', (event) => {
    if (!event.data) return;

    console.log('[BroPro SW] Push event received');

    let data = {};
    try {
        const payload = event.data.json();
        // FCM wraps data-only messages: the actual data is in payload.data
        data = payload.data || payload || {};
    } catch (e) {
        // If not JSON, try text
        try {
            data = { title: 'BroPro', body: event.data.text() };
        } catch (e2) {
            data = { title: 'BroPro', body: 'New notification' };
        }
    }

    console.log('[BroPro SW] Push data:', JSON.stringify(data));

    const title = data.title || 'BroPro';
    const options = {
        body: data.body || 'You have a new notification',
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/',
            type: data.type || 'notification',
            dateOfArrival: Date.now()
        },
        actions: [
            { action: 'open', title: 'Open App' },
            { action: 'dismiss', title: 'Dismiss' }
        ],
        // Tag ensures only 1 notification per unique tag — prevents duplicates
        tag: data.tag || 'bropro-' + Date.now(),
        renotify: true,
        requireInteraction: data.type === 'urgent' || data.type === 'direct_message'
    };

    // Smart notification suppression for chat messages.
    // Mimics WhatsApp/Telegram: no system notification when you're in the conversation.
    // Channel-aware: Group A notification still shows when you're in Group B.
    const isChatMessage = data.type === 'direct_message' || data.type === 'group_message';
    const pushChannelId = data.groupChannelId || null;

    event.waitUntil(
        (async () => {
            if (isChatMessage) {
                const suppress = await shouldSuppressChatNotification(data.type, pushChannelId);
                if (suppress) {
                    console.log(`[BroPro SW] ✅ Notification suppressed — user is viewing ${data.type}${pushChannelId ? ` (channel: ${pushChannelId})` : ''}`);
                    return;
                }
            }
            return self.registration.showNotification(title, options);
        })()
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    // "Dismiss" action — just close, don't navigate
    if (event.action === 'dismiss' || event.action === 'close') return;

    const notifData = event.notification.data || {};
    const notifType = notifData.type || 'notification';

    event.waitUntil(
        (async () => {
            const windowClients = await clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            });

            // ── Chat-aware deep linking ──
            // For chat notifications, prefer focusing an existing window
            // and telling it to open the right chat (no reload = instant).
            // This mimics WhatsApp/Telegram tap-to-open behavior.

            if (notifType === 'group_message') {
                // Extract channel ID from URL: "/?channel=abc123" → "abc123"
                const channelId = notifData.url
                    ? new URL(notifData.url, self.location.origin).searchParams.get('channel')
                    : null;

                // Try to focus an existing window and tell it to open the group
                for (const client of windowClients) {
                    if (new URL(client.url).origin === self.location.origin) {
                        await client.focus();
                        client.postMessage({
                            type: 'OPEN_GROUP_CHAT',
                            channelId: channelId
                        });
                        console.log(`[BroPro SW] Focused existing window → opening group ${channelId}`);
                        return;
                    }
                }

                // No existing window — open with correct deeplink param
                // app.js handles ?openGroup= to auto-open the group chat
                const deepLink = channelId
                    ? `/?openGroup=${channelId}`
                    : (notifData.url || '/');
                return clients.openWindow(deepLink);
            }

            if (notifType === 'direct_message') {
                // Try to focus an existing window and tell it to open DM chat
                for (const client of windowClients) {
                    if (new URL(client.url).origin === self.location.origin) {
                        await client.focus();
                        client.postMessage({
                            type: 'OPEN_DM_CHAT'
                        });
                        console.log('[BroPro SW] Focused existing window → opening DM chat');
                        return;
                    }
                }

                // No existing window — open with correct deeplink param
                return clients.openWindow('/?openChat=realBhai');
            }

            if (notifType === 'brothon_live') {
                // Try to focus an existing window and tell it to open BroNest Brothon
                for (const client of windowClients) {
                    if (new URL(client.url).origin === self.location.origin) {
                        await client.focus();
                        client.postMessage({
                            type: 'OPEN_BRONEST'
                        });
                        console.log('[BroPro SW] Focused existing window → opening BroNest Brothon');
                        return;
                    }
                }

                // No existing window — open with deeplink param
                return clients.openWindow('/?openBroNest=brothon');
            }

            // ── Non-chat notifications: standard URL navigation ──
            const targetUrl = notifData.url || '/';

            // Try to focus existing window at the same URL
            for (const client of windowClients) {
                try {
                    const clientUrl = new URL(client.url);
                    const target = new URL(targetUrl, self.location.origin);
                    if (clientUrl.pathname === target.pathname && 'focus' in client) {
                        return client.focus();
                    }
                } catch (e) { /* URL parse error, skip */ }
            }

            // Otherwise open new window
            return clients.openWindow(targetUrl);
        })()
    );
});

// ============================================
// BACKGROUND SYNC (Ready for future use)
// ============================================

self.addEventListener('sync', (event) => {
    console.log('🔄 [BroPro SW] Background sync triggered:', event.tag);

    if (event.tag === 'sync-progress') {
        event.waitUntil(syncUserProgress());
    }
});

async function syncUserProgress() {
    console.log('📤 [BroPro SW] Syncing user progress...');
}

console.log('🚀 [BroPro SW] Service Worker loaded successfully!');
console.log('📍 Version:', CACHE_VERSION);
