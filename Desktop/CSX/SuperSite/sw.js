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
const CACHE_VERSION = 'bropro-v3.1.0-2026.01.04';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

// Scripts that should ALWAYS bypass cache (versioned scripts)
const ALWAYS_FRESH_SCRIPTS = [
    'app.js',
    'firebase-auth.js',
    'leaderboard.js',
    'activity-ticker.js',
    'wallet.js',
    'admin.js'
];

// Core files that must be cached for offline functionality
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json'
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
    }
});

// ============================================
// PUSH NOTIFICATIONS (Ready for future use)
// ============================================

self.addEventListener('push', (event) => {
    if (!event.data) return;

    try {
        const data = event.data.json();

        const options = {
            body: data.body || 'New update from BroPro!',
            icon: '/assets/icons/icon-192x192.png',
            badge: '/assets/icons/badge-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                url: data.url || '/',
                dateOfArrival: Date.now()
            },
            actions: [
                { action: 'open', title: 'Open App', icon: '/assets/icons/action-open.png' },
                { action: 'close', title: 'Dismiss', icon: '/assets/icons/action-close.png' }
            ],
            tag: data.tag || 'bropro-notification',
            renotify: true
        };

        event.waitUntil(
            self.registration.showNotification(data.title || 'BroPro', options)
        );
    } catch (error) {
        console.error('[BroPro SW] Push notification error:', error);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') return;

    const targetUrl = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(windowClients => {
                // Focus existing window if available
                for (const client of windowClients) {
                    if (client.url === targetUrl && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Otherwise open new window
                return clients.openWindow(targetUrl);
            })
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
