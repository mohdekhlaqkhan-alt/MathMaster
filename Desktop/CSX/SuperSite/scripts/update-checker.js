/**
 * BroPro Update Checker
 * Lightweight script for all pages to detect and handle updates
 * Include this on pages that don't have the full PWA manager
 */

(function () {
    'use strict';

    // Check if PWA manager is already loaded
    if (window.broproPWA) {
        console.log('[Update Checker] PWA Manager already loaded, skipping.');
        return;
    }

    // Listen for service worker controller change
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('[Update Checker] New service worker active, reloading...');
            window.location.reload();
        });

        // Listen for messages from SW
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data?.type === 'SW_UPDATED') {
                console.log('[Update Checker] Update available!');
                showMiniUpdate();
            }
        });
    }

    // Show a minimal update notification
    function showMiniUpdate() {
        if (document.getElementById('mini-update-toast')) return;

        const toast = document.createElement('div');
        toast.id = 'mini-update-toast';
        toast.innerHTML = `
            <span>🎉 Update available!</span>
            <button onclick="location.reload(true)">Refresh</button>
        `;
        toast.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 20px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        toast.querySelector('button').style.cssText = `
            background: white;
            color: #667eea;
            border: none;
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 700;
            cursor: pointer;
        `;
        document.body.appendChild(toast);
    }

    console.log('[Update Checker] Lightweight update checker loaded');
})();
