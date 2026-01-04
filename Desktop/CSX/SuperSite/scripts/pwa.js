/**
 * BroPro PWA Manager v2.0
 * AGGRESSIVE Update Strategy - No More Stale Content!
 * 
 * Features:
 * - Immediate Service Worker registration & updates
 * - AGGRESSIVE update detection and application
 * - Auto-reload when new version is detected
 * - Install Prompt Management
 * - Offline/Online Detection
 * - Prominent update notification
 */

(function () {
    'use strict';

    // ============================================
    // PWA CONFIGURATION
    // ============================================

    const PWA_CONFIG = {
        swPath: '/sw.js',
        updateCheckInterval: 30 * 1000, // Check every 30 seconds
        installPromptDelay: 30000,
        debug: true, // Always log for debugging
        forceUpdateOnVersionChange: true
    };

    // State management
    let deferredInstallPrompt = null;
    let serviceWorkerRegistration = null;
    let isInstalled = false;
    let isOnline = navigator.onLine;
    let currentSWVersion = null;

    // ============================================
    // SERVICE WORKER REGISTRATION
    // ============================================

    async function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            log('Service Workers not supported');
            return null;
        }

        try {
            // IMPORTANT: Add cache-busting query to force fresh SW fetch
            const swUrl = PWA_CONFIG.swPath + '?v=' + Date.now();

            const registration = await navigator.serviceWorker.register(PWA_CONFIG.swPath, {
                scope: '/',
                updateViaCache: 'none' // IMPORTANT: Never use cached SW
            });

            serviceWorkerRegistration = registration;
            log('✅ Service Worker registered successfully');

            // Force check for updates immediately
            registration.update();

            // Handle updates with AGGRESSIVE strategy
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                log('🔄 New Service Worker found, installing...');

                newWorker.addEventListener('statechange', () => {
                    log(`📢 SW State changed: ${newWorker.state}`);

                    if (newWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // New content is available - show prominent notification
                            log('🆕 New version installed, showing update prompt');
                            showUpdateNotification();
                        } else {
                            // First install - content cached for offline
                            log('📦 Content cached for offline use');
                        }
                    }
                });
            });

            // CRITICAL: Listen for controller change and RELOAD
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                log('⚡ Controller changed! Reloading page for fresh content...');
                // The new service worker has taken control
                // Reload to ensure fresh content
                window.location.reload();
            });

            // Check for updates frequently
            setInterval(() => {
                log('🔍 Checking for service worker updates...');
                registration.update();
            }, PWA_CONFIG.updateCheckInterval);

            // Listen for messages from SW
            navigator.serviceWorker.addEventListener('message', handleSWMessage);

            // Get initial version
            getSWVersion();

            return registration;
        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
            return null;
        }
    }

    // Get current SW version
    async function getSWVersion() {
        if (navigator.serviceWorker.controller) {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
                if (event.data.version) {
                    const storedVersion = localStorage.getItem('bropro-sw-version');
                    currentSWVersion = event.data.version;

                    log(`📍 Current SW Version: ${currentSWVersion}`);
                    log(`📍 Stored SW Version: ${storedVersion}`);

                    if (storedVersion && storedVersion !== currentSWVersion) {
                        log('🆕 Version mismatch detected! New version available.');
                        // Force clear old caches
                        clearAllCaches();
                    }

                    localStorage.setItem('bropro-sw-version', currentSWVersion);
                }
            };
            navigator.serviceWorker.controller.postMessage(
                { type: 'GET_VERSION' },
                [messageChannel.port2]
            );
        }
    }

    // Clear all caches
    async function clearAllCaches() {
        log('🗑️ Clearing all browser caches...');

        try {
            const names = await caches.keys();
            await Promise.all(names.map(name => {
                log(`   Deleting cache: ${name}`);
                return caches.delete(name);
            }));
            log('✅ All caches cleared');

            // Also clear localStorage cached data (except auth)
            const keysToKeep = ['firebase', 'bropro-sw-version'];
            const allKeys = Object.keys(localStorage);
            allKeys.forEach(key => {
                if (!keysToKeep.some(keep => key.includes(keep))) {
                    // Only clear cache-related keys
                    if (key.includes('cache') || key.includes('Cache')) {
                        localStorage.removeItem(key);
                    }
                }
            });

        } catch (error) {
            console.error('Error clearing caches:', error);
        }
    }

    // ============================================
    // INSTALL PROMPT MANAGEMENT
    // ============================================

    function setupInstallPrompt() {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            isInstalled = true;
            log('📱 App is running in standalone mode (installed)');
            return;
        }

        // Listen for beforeinstallprompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredInstallPrompt = e;

            log('📥 Install prompt available');

            // Show custom install button after delay
            setTimeout(() => {
                if (deferredInstallPrompt && !isInstalled) {
                    showInstallBanner();
                }
            }, PWA_CONFIG.installPromptDelay);
        });

        // Track when app is installed
        window.addEventListener('appinstalled', () => {
            isInstalled = true;
            deferredInstallPrompt = null;
            log('🎉 App installed successfully!');
            hideInstallBanner();
            showInstallSuccessToast();
        });
    }

    // ============================================
    // INSTALL BANNER UI
    // ============================================

    function showInstallBanner() {
        if (document.getElementById('pwa-install-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'pwa-install-banner';
        banner.innerHTML = `
            <div class="pwa-banner-content">
                <div class="pwa-banner-icon">🚀</div>
                <div class="pwa-banner-text">
                    <strong>Install BroPro</strong>
                    <span>Add to home screen for the best experience!</span>
                </div>
                <div class="pwa-banner-actions">
                    <button class="pwa-install-btn" onclick="window.broproPWA.install()">
                        Install
                    </button>
                    <button class="pwa-dismiss-btn" onclick="window.broproPWA.dismissInstall()">
                        ✕
                    </button>
                </div>
            </div>
        `;

        // Apply styles
        if (!document.getElementById('pwa-banner-styles')) {
            const styles = document.createElement('style');
            styles.id = 'pwa-banner-styles';
            styles.textContent = `
                #pwa-install-banner {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%) translateY(150%);
                    z-index: 10000;
                    background: linear-gradient(135deg, rgba(15, 15, 26, 0.95), rgba(26, 26, 46, 0.95));
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(102, 126, 234, 0.3);
                    border-radius: 16px;
                    padding: 16px 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4),
                                0 0 40px rgba(102, 126, 234, 0.2);
                    animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    max-width: 400px;
                    width: calc(100% - 40px);
                }

                @keyframes slideUp {
                    to { transform: translateX(-50%) translateY(0); }
                }

                .pwa-banner-content {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .pwa-banner-icon {
                    font-size: 2.2rem;
                    animation: iconBounce 1s ease infinite;
                }

                @keyframes iconBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }

                .pwa-banner-text {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .pwa-banner-text strong {
                    color: #fff;
                    font-size: 1rem;
                }

                .pwa-banner-text span {
                    color: #a0aec0;
                    font-size: 0.85rem;
                }

                .pwa-banner-actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .pwa-install-btn {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: inherit;
                }

                .pwa-install-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                }

                .pwa-dismiss-btn {
                    background: transparent;
                    border: none;
                    color: #718096;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }

                .pwa-dismiss-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                }

                @media (max-width: 400px) {
                    .pwa-banner-content {
                        flex-wrap: wrap;
                    }
                    .pwa-banner-actions {
                        width: 100%;
                        justify-content: flex-end;
                        margin-top: 10px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(banner);
        log('📢 Install banner shown');
    }

    function hideInstallBanner() {
        const banner = document.getElementById('pwa-install-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.3s ease forwards';
            setTimeout(() => banner.remove(), 300);
        }
    }

    async function triggerInstall() {
        if (!deferredInstallPrompt) {
            log('⚠️ No install prompt available');
            return false;
        }

        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        log(`📱 Install prompt outcome: ${outcome}`);
        deferredInstallPrompt = null;
        hideInstallBanner();
        return outcome === 'accepted';
    }

    // ============================================
    // UPDATE NOTIFICATION - PROMINENT!
    // ============================================

    function showUpdateNotification() {
        if (document.getElementById('pwa-update-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'pwa-update-banner';
        banner.innerHTML = `
            <div class="update-banner-content">
                <div class="update-banner-text">
                    <span class="update-icon">🎉</span>
                    <div class="update-message">
                        <strong>New Update Available!</strong>
                        <span>Refresh to get the latest features and fixes</span>
                    </div>
                </div>
                <div class="update-banner-actions">
                    <button class="update-now-btn" onclick="window.broproPWA.applyUpdate()">
                        🔄 Refresh Now
                    </button>
                    <button class="update-later-btn" onclick="document.getElementById('pwa-update-banner').remove()">
                        Later
                    </button>
                </div>
            </div>
        `;

        // Apply PROMINENT styles
        if (!document.getElementById('pwa-update-styles')) {
            const styles = document.createElement('style');
            styles.id = 'pwa-update-styles';
            styles.textContent = `
                #pwa-update-banner {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 100000;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 0;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    animation: slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes slideDown {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(0); }
                }

                .update-banner-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 12px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .update-banner-text {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: white;
                }

                .update-icon {
                    font-size: 1.8rem;
                    animation: bounce 1s ease infinite;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }

                .update-message {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .update-message strong {
                    font-size: 1rem;
                    font-weight: 700;
                }

                .update-message span {
                    font-size: 0.85rem;
                    opacity: 0.9;
                }

                .update-banner-actions {
                    display: flex;
                    gap: 10px;
                }

                .update-now-btn {
                    background: white;
                    color: #667eea;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: inherit;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }

                .update-now-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                }

                .update-later-btn {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 10px 20px;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: inherit;
                }

                .update-later-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                @media (max-width: 600px) {
                    .update-banner-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    .update-banner-text {
                        flex-direction: column;
                    }
                    .update-banner-actions {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(banner);
        log('🔔 Update notification shown');
    }

    function applyUpdate() {
        log('🔄 Applying update...');

        // Remove the banner
        const banner = document.getElementById('pwa-update-banner');
        if (banner) banner.remove();

        // Tell the waiting SW to skip waiting and take control
        if (serviceWorkerRegistration?.waiting) {
            log('📤 Sending SKIP_WAITING to waiting SW...');
            serviceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
        } else {
            // No waiting SW, just reload
            log('🔄 No waiting SW, reloading directly...');
            window.location.reload(true);
        }
    }

    // ============================================
    // SUCCESS TOAST
    // ============================================

    function showInstallSuccessToast() {
        const toast = document.createElement('div');
        toast.className = 'pwa-success-toast';
        toast.innerHTML = `
            <span class="success-icon">🎉</span>
            <span>BroPro installed successfully!</span>
        `;

        if (!document.getElementById('pwa-success-styles')) {
            const styles = document.createElement('style');
            styles.id = 'pwa-success-styles';
            styles.textContent = `
                .pwa-success-toast {
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 16px 28px;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                    box-shadow: 0 15px 50px rgba(102, 126, 234, 0.4);
                    animation: toastPop 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                               toastFade 0.5s ease 3s forwards;
                    z-index: 10001;
                }

                @keyframes toastPop {
                    from { transform: translateX(-50%) scale(0.5); opacity: 0; }
                    to { transform: translateX(-50%) scale(1); opacity: 1; }
                }

                @keyframes toastFade {
                    to { opacity: 0; transform: translateX(-50%) translateY(20px); }
                }

                .success-icon { font-size: 1.3rem; }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    // ============================================
    // ONLINE/OFFLINE DETECTION
    // ============================================

    function setupConnectivityListeners() {
        window.addEventListener('online', () => {
            isOnline = true;
            log('🌐 Back online');
            showConnectivityToast('online');

            // Check for updates when back online
            if (serviceWorkerRegistration) {
                serviceWorkerRegistration.update();
            }
        });

        window.addEventListener('offline', () => {
            isOnline = false;
            log('📡 Gone offline');
            showConnectivityToast('offline');
        });
    }

    function showConnectivityToast(status) {
        const existing = document.querySelector('.pwa-connectivity-toast');
        if (existing) existing.remove();

        const isOnlineStatus = status === 'online';
        const toast = document.createElement('div');
        toast.className = 'pwa-connectivity-toast';
        toast.innerHTML = `
            <span class="conn-icon">${isOnlineStatus ? '🌐' : '📡'}</span>
            <span>${isOnlineStatus ? 'You\'re back online!' : 'You\'re offline - some features may be limited'}</span>
        `;

        toast.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: ${isOnlineStatus ?
                'linear-gradient(135deg, #11998e, #38ef7d)' :
                'linear-gradient(135deg, #f093fb, #f5576c)'};
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            font-size: 0.9rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: fadeInOut 3s ease forwards;
        `;

        if (!document.getElementById('connectivity-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'connectivity-animation-styles';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // ============================================
    // SERVICE WORKER MESSAGE HANDLING
    // ============================================

    function handleSWMessage(event) {
        const { type, data, version, message } = event.data || {};

        switch (type) {
            case 'SW_UPDATED':
                log(`⚡ Service Worker updated to version: ${version}`);
                log(`   Message: ${message}`);
                // Show update notification
                showUpdateNotification();
                break;
            case 'SW_ACTIVATED':
                log('⚡ Service Worker activated', data);
                break;
            case 'CACHE_UPDATED':
                log('📦 Cache updated');
                break;
            default:
                log('📨 SW Message:', event.data);
        }
    }

    // ============================================
    // FORCE REFRESH MECHANISM
    // ============================================

    function forceRefresh() {
        log('🔄 Force refreshing...');

        // Clear all caches
        clearAllCaches().then(() => {
            // Unregister service worker
            if (serviceWorkerRegistration) {
                serviceWorkerRegistration.unregister().then(() => {
                    log('✅ Service worker unregistered');
                    // Hard reload
                    window.location.reload(true);
                });
            } else {
                window.location.reload(true);
            }
        });
    }

    // ============================================
    // UTILITIES
    // ============================================

    function log(...args) {
        if (PWA_CONFIG.debug) {
            console.log('[BroPro PWA]', ...args);
        }
    }

    // ============================================
    // PUBLIC API
    // ============================================

    window.broproPWA = {
        // Install the app
        install: triggerInstall,

        // Dismiss the install banner
        dismissInstall: () => {
            hideInstallBanner();
            sessionStorage.setItem('pwa-install-dismissed', 'true');
        },

        // Apply pending update
        applyUpdate: applyUpdate,

        // Force refresh (nuclear option)
        forceRefresh: forceRefresh,

        // Check if installed
        isInstalled: () => isInstalled,

        // Check if online
        isOnline: () => isOnline,

        // Get SW registration
        getRegistration: () => serviceWorkerRegistration,

        // Get current version
        getVersion: () => currentSWVersion,

        // Clear all caches
        clearCache: clearAllCaches,

        // Check for updates manually
        checkForUpdates: async () => {
            if (serviceWorkerRegistration) {
                await serviceWorkerRegistration.update();
                log('🔍 Checked for updates');
            }
        },

        // Show update notification manually (for testing)
        showUpdateNotification: showUpdateNotification
    };

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        log('🚀 Initializing PWA Manager v2.0...');

        // Register Service Worker
        registerServiceWorker();

        // Setup install prompt handling
        setupInstallPrompt();

        // Setup connectivity listeners
        setupConnectivityListeners();

        // Add keyboard shortcut for force refresh (Ctrl+Shift+R shows it)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                log('🔄 Force refresh triggered via keyboard');
                forceRefresh();
            }
        });

        log('✅ PWA Manager v2.0 initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
