/* ============================================
   BROPRO - FIREBASE AUTHENTICATION
   Google Sign-In + Email/Password Authentication
   ============================================ */

// Firebase Configuration
// CRITICAL: authDomain is configured dynamically. In production, use the exact
// current host so Google auth stays same-origin on both bropro.in and
// www.bropro.in. For localhost/staging, use the default Firebase subdomain.
const productionAuthHosts = ['bropro.in', 'www.bropro.in'];
const isProduction = productionAuthHosts.includes(window.location.hostname);
const authDomain = isProduction ? window.location.hostname : "supersite-2dcf9.firebaseapp.com";

const firebaseConfig = {
    apiKey: "AIzaSyCK7HfVBcg4otmuuODgijhlsLan-At5vb0",
    authDomain: authDomain,
    projectId: "supersite-2dcf9",
    storageBucket: "supersite-2dcf9.firebasestorage.app",
    messagingSenderId: "343498160294",
    appId: "1:343498160294:web:1281299dbf534c1ed0dc67"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ============================================
// AUTHENTICATION PERSISTENCE FOR PWA
// ============================================
// Use LOCAL persistence for PWA - this uses IndexedDB to persist auth state
// across browser restarts and PWA sessions. This ensures users stay logged in.
//
// Persistence options:
// - LOCAL: Persists even after browser closes (uses IndexedDB) - BEST FOR PWA
// - SESSION: Clears when browser/tab closes - NOT SUITABLE FOR PWA
// - NONE: No persistence - for sensitive apps
//
// Note: If you experience issues on older Safari, it's due to ITP (Intelligent
// Tracking Prevention). The solution is to ensure the app is added to home screen.
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        console.log('🔐 Firebase Auth: LOCAL persistence enabled for PWA');
    })
    .catch((error) => {
        console.warn('⚠️ Firebase Auth: Could not set LOCAL persistence, using default:', error.message);
        // Fallback: The default is LOCAL anyway, so this should still work
    });

const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const AUTH_REDIRECT_FLAG = 'supersite-auth-redirect';
const AUTH_REDIRECT_STARTED_AT = 'supersite-auth-redirect-started-at';
const AUTH_REDIRECT_MAX_AGE_MS = 10 * 60 * 1000;

function getSessionValue(key) {
    try {
        return sessionStorage.getItem(key);
    } catch (_ignored) {
        return null;
    }
}

function setSessionValue(key, value) {
    try {
        sessionStorage.setItem(key, value);
    } catch (_ignored) { }
}

function removeSessionValue(key) {
    try {
        sessionStorage.removeItem(key);
    } catch (_ignored) { }
}

function markAuthRedirectStarted() {
    setSessionValue(AUTH_REDIRECT_FLAG, 'true');
    setSessionValue(AUTH_REDIRECT_STARTED_AT, String(Date.now()));
}

function clearAuthRedirectState() {
    removeSessionValue(AUTH_REDIRECT_FLAG);
    removeSessionValue(AUTH_REDIRECT_STARTED_AT);
}

function isAuthRedirectFresh() {
    if (getSessionValue(AUTH_REDIRECT_FLAG) !== 'true') return false;

    const startedAt = Number(getSessionValue(AUTH_REDIRECT_STARTED_AT) || 0);
    if (!startedAt) return false;

    return Date.now() - startedAt < AUTH_REDIRECT_MAX_AGE_MS;
}

function isFirebaseRedirectReturn() {
    const urlState = `${window.location.search || ''}${window.location.hash || ''}`;
    return isAuthRedirectFresh() ||
        urlState.includes('__firebase_request_key') ||
        urlState.includes('firebaseError');
}

function shouldUseRedirectFirst() {
    const ua = navigator.userAgent || '';
    const isMobileBrowser = /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(ua);
    const isStandalonePwa = window.matchMedia?.('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.startsWith('android-app://');

    return isMobileBrowser || isStandalonePwa;
}

// Use device language for better auth UX
auth.useDeviceLanguage();

// Force Google to show account chooser every time
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// ── One-time cleanup of stale redirect state ──
// Timestamped redirect state prevents old cancelled/failed redirects from making
// a normal page load look like a broken Google sign-in attempt.
if (getSessionValue(AUTH_REDIRECT_FLAG) === 'true' && !isAuthRedirectFresh()) {
    console.log('🧹 Clearing stale Google sign-in redirect state');
    clearAuthRedirectState();
}

// ============================================
// FIREBASE AUTH MANAGER
// ============================================
const FirebaseAuth = {
    currentUser: null,
    db: db,
    isLoggingOut: false, // Flag to prevent auto-login during logout
    userInitiatedLogin: isAuthRedirectFresh(), // Flag to track user-initiated login
    forceLogoutListener: null, // Listener for admin deletion

    // Initialize auth state listener
    init() {
        // Fetch leaderboard data once on page load (no real-time listener to save reads)
        this.fetchLeaderboardOnce();

        // Check and clear logout flag on page load
        // This only affects AUTO-login, not user-initiated login
        const wasLoggedOut = getSessionValue('supersite-logged-out') === 'true' && !isFirebaseRedirectReturn();
        if (wasLoggedOut) {
            console.log('User previously logged out - preventing auto-login');
        }

        auth.onAuthStateChanged((user) => {
            // If we're in the process of logging out, ignore any auth changes
            if (this.isLoggingOut) {
                console.log('Ignoring auth change during logout');
                return;
            }

            if (user) {
                // Only block auto-login on page load if user manually logged out
                // But if this.userInitiatedLogin is true, allow login
                if (wasLoggedOut && !this.userInitiatedLogin) {
                    console.log('Blocking auto-login after logout');
                    removeSessionValue('supersite-logged-out');
                    auth.signOut();
                    return;
                }

                // Clear any lingering logout flag
                removeSessionValue('supersite-logged-out');

                // User is signed in
                this.currentUser = user;
                this.onLoginSuccess(user);

                // Check premium status from Firebase (handles admin revocation)
                setTimeout(() => {
                    if (window.BroProPremium && BroProPremium.checkPremiumFromFirebase) {
                        BroProPremium.checkPremiumFromFirebase();
                    }
                }, 1500); // Wait for profile to load

                // Start force logout listener for this user
                this.startForceLogoutListener(user.uid);
            } else {
                // User is signed out
                this.currentUser = null;
                this.onLogout();

                // Stop force logout listener
                this.stopForceLogoutListener();
            }
        });

        // Handle redirect result (for Safari/mobile/tablet Google sign-in)
        // PRODUCTION-GRADE: Handles errors gracefully, resets UI state, and
        // provides user feedback if the redirect flow failed.
        const expectedRedirectResult = isFirebaseRedirectReturn();
        auth.getRedirectResult().then((result) => {
            if (result && result.user) {
                console.log('✅ Redirect sign-in successful:', result.user.displayName);
                // Mark this as a user-initiated login so onAuthStateChanged processes it
                this.userInitiatedLogin = true;
                removeSessionValue('supersite-logged-out');
                clearAuthRedirectState();
                // Close any auth modals
                const authModal = document.getElementById('authModal');
                if (authModal) authModal.classList.remove('active');
            } else {
                // No result = fresh page load (not a redirect return). Clean up stale redirect flag.
                if (expectedRedirectResult || getSessionValue(AUTH_REDIRECT_FLAG) === 'true') {
                    // Redirect was started but returned without user — possible cancellation.
                    clearAuthRedirectState();
                    this.userInitiatedLogin = false;
                    console.log('ℹ️ Redirect returned without user (cancelled or failed).');
                    // Reset the Google button if it's still in loading state
                    this._resetGoogleButton();
                }
            }
        }).catch((error) => {
            // Only treat this as a real error if we were actually returning from a redirect.
            // On normal page loads, getRedirectResult() can throw benign errors (e.g.,
            // auth/internal-error) which are harmless and should be silently ignored.
            const wasRedirecting = expectedRedirectResult || isFirebaseRedirectReturn();
            clearAuthRedirectState();

            if (wasRedirecting) {
                console.error('❌ Redirect sign-in error:', error.code, error.message);
                this.userInitiatedLogin = false;
                // Reset button state so user can retry
                this._resetGoogleButton();

                // Show a user-friendly error
                const errorEl = document.getElementById('loginError') || document.getElementById('signupError');
                if (errorEl) {
                    errorEl.textContent = this._getFriendlyAuthError(error);
                }
            } else {
                // Benign error on normal page load — just log it
                console.log('ℹ️ getRedirectResult benign error (not from redirect):', error.code || error.message);
            }
        });
    },

    // 🔐 Listen for force logout (when admin deletes user)
    startForceLogoutListener(userId) {
        if (!this.db || !userId) return;

        // Admin email - admin should NEVER be force logged out
        const ADMIN_EMAIL = 'mohdekhlaqkhan@gmail.com';

        // Skip force logout listener for admin
        if (this.currentUser && this.currentUser.email === ADMIN_EMAIL) {
            console.log('🔐 Skipping force logout listener for admin');

            // Also clear any forceLogout flag that might have been set
            this.db.collection('presence').doc(userId).update({
                forceLogout: firebase.firestore.FieldValue.delete()
            }).catch(e => console.log('No forceLogout flag to clear'));

            return;
        }

        // Stop any existing listener
        this.stopForceLogoutListener();

        console.log('🔐 Starting force logout listener for:', userId);

        // Listen to presence document for forceLogout flag
        this.forceLogoutListener = this.db.collection('presence').doc(userId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    // Check if forceLogout flag is set
                    if (data.forceLogout === true) {
                        console.log('🚨 Force logout triggered!', data);

                        // Show message to user
                        this.showForceLogoutMessage();

                        // Force logout the user
                        this.handleForceLogout();
                    }
                }
            }, (error) => {
                console.log('Force logout listener error:', error.message);
            });
    },

    // Stop force logout listener
    stopForceLogoutListener() {
        if (this.forceLogoutListener) {
            this.forceLogoutListener();
            this.forceLogoutListener = null;
        }
    },

    // Show force logout message
    showForceLogoutMessage() {
        // Create a premium modal notification
        const overlay = document.createElement('div');
        overlay.className = 'force-logout-overlay';
        overlay.innerHTML = `
            <div class="force-logout-box">
                <div class="force-logout-icon">🚫</div>
                <h3>Account Removed</h3>
                <p>Your profile has been removed from the leaderboards by an administrator.</p>
                <p class="force-logout-detail">All your progress has been reset.</p>
                <button onclick="this.closest('.force-logout-overlay').remove(); window.location.reload();">OK, Got it</button>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .force-logout-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                animation: fadeIn 0.3s ease;
            }
            .force-logout-box {
                background: linear-gradient(145deg, #1a1a2e, #16213e);
                border-radius: 24px;
                padding: 2.5rem;
                text-align: center;
                max-width: 400px;
                box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                animation: scaleIn 0.3s ease;
            }
            .force-logout-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            .force-logout-box h3 {
                color: #ef4444;
                font-size: 1.5rem;
                margin: 0 0 1rem;
            }
            .force-logout-box p {
                color: #e2e8f0;
                margin: 0 0 0.5rem;
                font-size: 1rem;
            }
            .force-logout-detail {
                color: #94a3b8 !important;
                font-size: 0.9rem !important;
                margin-bottom: 1.5rem !important;
            }
            .force-logout-box button {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            .force-logout-box button:hover {
                transform: scale(1.05);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(overlay);
    },

    // Show deleted account message (when user tries to login after being deleted)
    showDeletedAccountMessage(deletedData) {
        // Store email for potential fresh start
        const userEmail = deletedData?.email || '';

        // Create a premium modal notification
        const overlay = document.createElement('div');
        overlay.className = 'deleted-account-overlay';
        overlay.id = 'deletedAccountOverlay';
        overlay.innerHTML = `
            <div class="deleted-account-box">
                <div class="deleted-account-icon">🚫</div>
                <h3>Account Not Found</h3>
                <p>Your account was previously removed from the platform.</p>
                <p class="deleted-account-detail">Your previous progress has been reset. You can start fresh with a new account.</p>
                <div class="deleted-account-buttons">
                    <button class="start-fresh-btn" onclick="FirebaseAuth.handleStartFresh('${userEmail}')">🚀 Start Fresh</button>
                    <button class="cancel-btn" onclick="this.closest('.deleted-account-overlay').remove(); window.location.href = '/';">Cancel</button>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .deleted-account-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                animation: fadeIn 0.3s ease;
            }
            .deleted-account-box {
                background: linear-gradient(145deg, #1a1a2e, #16213e);
                border-radius: 24px;
                padding: 2.5rem;
                text-align: center;
                max-width: 420px;
                box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                animation: scaleIn 0.3s ease;
            }
            .deleted-account-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            .deleted-account-box h3 {
                color: #f59e0b;
                font-size: 1.5rem;
                margin: 0 0 1rem;
            }
            .deleted-account-box p {
                color: #e2e8f0;
                margin: 0 0 0.5rem;
                font-size: 1rem;
            }
            .deleted-account-detail {
                color: #94a3b8 !important;
                font-size: 0.9rem !important;
                margin-bottom: 1.5rem !important;
            }
            .deleted-account-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            .deleted-account-box .start-fresh-btn {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            .deleted-account-box .start-fresh-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            }
            .deleted-account-box .cancel-btn {
                background: rgba(255, 255, 255, 0.1);
                color: #94a3b8;
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 1rem 2rem;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            .deleted-account-box .cancel-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #e2e8f0;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(overlay);
    },

    // Handle "Start Fresh" - remove from deletedUsers and allow new account
    async handleStartFresh(email) {
        console.log('🚀 Starting fresh for:', email);

        // Show loading state
        const overlay = document.getElementById('deletedAccountOverlay');
        if (overlay) {
            overlay.querySelector('.deleted-account-box').innerHTML = `
                <div class="deleted-account-icon">⏳</div>
                <h3>Creating Fresh Account...</h3>
                <p>Please wait while we set up your new account.</p>
            `;
        }

        try {
            // Remove from deletedUsers collection
            const normalizedEmail = email.toLowerCase().trim();
            if (normalizedEmail) {
                await this.db.collection('deletedUsers').doc(normalizedEmail).delete();
                console.log('✅ Removed from deletedUsers collection');
            }

            // Clear logout flag
            removeSessionValue('supersite-logged-out');
            this.isLoggingOut = false;

            // Remove the overlay
            if (overlay) overlay.remove();

            // Sign in again - this time it will succeed
            console.log('🔄 Proceeding with fresh login...');

            // Trigger a fresh login by signing in with Google again
            // The user is still authenticated, so we can proceed
            const user = auth.currentUser;
            if (user) {
                // Call onLoginSuccess again - this time deletedUsers check will pass
                await this.onLoginSuccess(user);
            } else {
                // If no user, redirect to sign in
                window.location.reload();
            }

        } catch (error) {
            console.error('❌ Start fresh error:', error);

            if (overlay) {
                overlay.querySelector('.deleted-account-box').innerHTML = `
                    <div class="deleted-account-icon">❌</div>
                    <h3>Error</h3>
                    <p>Failed to create fresh account: ${error.message}</p>
                    <button onclick="window.location.reload();">Try Again</button>
                `;
            }
        }
    },

    // Handle force logout
    async handleForceLogout() {
        console.log('🧹 Clearing ALL local data...');

        // Clear MAIN profile data
        localStorage.removeItem('supersite-player-profile');
        localStorage.removeItem('supersite-current-user');
        localStorage.removeItem('supersite-firebase-user');
        localStorage.removeItem('supersite-leaderboard');

        // Clear ALL subject-specific localStorage data
        const subjectKeys = [
            'supersite-math-player',
            'supersite-science-player',
            'supersite-geography-player',
            'supersite-english-player',
            'supersite-hindi-player',
            'supersite-gk-player',
            'supersite-leaderboard-math',
            'supersite-leaderboard-science',
            'supersite-leaderboard-geography',
            'supersite-leaderboard-english',
            'supersite-leaderboard-hindi',
            'supersite-leaderboard-gk',
            'supersite-leaderboard-global',
            'supersite-leaderboard-mathematics'
        ];

        subjectKeys.forEach(key => {
            localStorage.removeItem(key);
            console.log(`🗑️ Cleared: ${key}`);
        });

        // Also clear any keys that start with 'supersite-' to be thorough
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('supersite-')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));

        console.log(`🧹 Cleared ${keysToRemove.length} additional supersite keys`);

        // Set logout flag
        setSessionValue('supersite-logged-out', 'true');
        this.isLoggingOut = true;

        // Sign out from Firebase
        try {
            await auth.signOut();
            console.log('🔐 Force logout complete - ALL data cleared');
        } catch (e) {
            console.error('Force logout error:', e);
        }
    },

    // ============================================
    // GOOGLE SIGN-IN — via Google Identity Services (GIS)
    // ============================================
    // WHY GIS instead of Firebase's signInWithPopup/signInWithRedirect:
    //   Firebase's popup opens on firebaseapp.com which Chrome blocks (3PCD).
    //   Firebase's redirect via Vercel proxy doesn't fully support the auth handler.
    //   GIS opens Google's own OAuth popup (accounts.google.com), gets an access
    //   token directly, then we pass it to Firebase via signInWithCredential.
    //   This bypasses ALL proxy/authDomain/cookie issues.
    //
    // Flow:
    //   1. User clicks "Continue with Google"
    //   2. GIS opens popup to accounts.google.com (Google's own domain)
    //   3. User picks their Google account
    //   4. GIS returns an access token
    //   5. We create a Firebase credential from the access token
    //   6. We call auth.signInWithCredential(credential)
    //   7. Firebase verifies the token and signs the user in
    //   8. onAuthStateChanged fires → user is logged in ✅

    _signInInProgress: false,
    _tokenClient: null,
    _signInResolve: null,

    // Lazily initialize the GIS token client
    _getTokenClient() {
        if (this._tokenClient) return this._tokenClient;

        // Check if GIS library is loaded
        if (typeof google === 'undefined' || !google.accounts || !google.accounts.oauth2) {
            console.warn('⚠️ Google Identity Services library not loaded');
            return null;
        }

        this._tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: '343498160294-roq4hqcpfq78gli1vtoq3h3f7462lvv0.apps.googleusercontent.com',
            scope: 'email profile openid',
            callback: (tokenResponse) => {
                this._handleGISTokenResponse(tokenResponse);
            },
            error_callback: (error) => {
                this._handleGISError(error);
            }
        });

        console.log('✅ Google Identity Services token client initialized');
        return this._tokenClient;
    },

    // Handle successful token response from GIS
    async _handleGISTokenResponse(tokenResponse) {
        if (tokenResponse.error) {
            console.error('❌ GIS token error:', tokenResponse.error);
            if (this._signInResolve) {
                this._signInResolve({
                    success: false,
                    error: 'Google sign-in failed: ' + tokenResponse.error
                });
            }
            return;
        }

        try {
            console.log('🔑 Got Google access token, signing into Firebase...');
            // Create Firebase credential from Google access token
            const credential = firebase.auth.GoogleAuthProvider.credential(null, tokenResponse.access_token);
            // Sign in with Firebase
            const result = await auth.signInWithCredential(credential);
            console.log('✅ Google Sign-In successful:', result.user.displayName);
            if (this._signInResolve) {
                this._signInResolve({ success: true, user: result.user });
            }
        } catch (error) {
            console.error('❌ Firebase signInWithCredential error:', error.code, error.message);
            if (this._signInResolve) {
                this._signInResolve({
                    success: false,
                    error: this._getFriendlyAuthError(error)
                });
            }
        }
    },

    // Handle GIS errors (popup closed, etc.)
    _handleGISError(error) {
        console.warn('⚠️ GIS error:', error.type, error.message);
        if (this._signInResolve) {
            if (error.type === 'popup_closed' || error.type === 'popup_failed_to_open') {
                this.userInitiatedLogin = false;
                this._signInResolve({
                    success: false,
                    error: 'Sign-in cancelled. Please try again.'
                });
            } else {
                this.userInitiatedLogin = false;
                this._signInResolve({
                    success: false,
                    error: 'Google sign-in failed. Please try again.'
                });
            }
        }
    },

    async signInWithGoogle() {
        // ── Debounce guard ──
        if (this._signInInProgress) {
            console.log('⏳ Google sign-in already in progress — ignoring duplicate click');
            return { success: false, error: 'Sign-in already in progress. Please wait.' };
        }
        this._signInInProgress = true;

        // Mark this as user-initiated login (not auto-login)
        this.userInitiatedLogin = true;

        // Clear any logout flag so login works immediately
        removeSessionValue('supersite-logged-out');

        try {
            // Try GIS first (works everywhere, no 3PCD/proxy issues)
            const tokenClient = this._getTokenClient();
            if (tokenClient) {
                console.log('🚀 Using Google Identity Services for sign-in');
                const result = await new Promise((resolve) => {
                    this._signInResolve = resolve;
                    // This opens Google's own popup at accounts.google.com
                    tokenClient.requestAccessToken({ prompt: 'select_account' });
                });
                return result;
            }

            // Fallback: GIS not loaded → try Firebase's signInWithPopup
            console.log('⚠️ GIS not available, falling back to Firebase popup...');
            return await this._fallbackFirebaseSignIn();
        } finally {
            this._signInInProgress = false;
            this._signInResolve = null;
        }
    },

    // Fallback: Firebase's native sign-in (used only if GIS library fails to load)
    async _fallbackFirebaseSignIn() {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            console.log('✅ Google Sign-In successful via Firebase popup:', result.user.displayName);
            return { success: true, user: result.user };
        } catch (error) {
            const code = error.code || '';
            console.warn('⚠️ Firebase popup error:', code, error.message);

            if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
                this.userInitiatedLogin = false;
                return { success: false, error: 'Sign-in cancelled. Please try again.' };
            }

            // Try redirect as last resort
            try {
                console.log('🔄 Trying redirect sign-in...');
                markAuthRedirectStarted();
                await auth.signInWithRedirect(googleProvider);
                return { success: true, redirect: true };
            } catch (redirectError) {
                clearAuthRedirectState();
                this.userInitiatedLogin = false;
                return { success: false, error: this._getFriendlyAuthError(redirectError) };
            }
        }
    },

    // Internal: reset ALL Google sign-in buttons to their default state
    _resetGoogleButton() {
        const googleBtns = document.querySelectorAll('.google-signin-btn');
        googleBtns.forEach(btn => {
            btn.disabled = false;
            // Restore correct label based on context (login vs signup)
            const isSignup = btn.closest('#signupForm');
            btn.innerHTML = '<span class="google-icon"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google"></span> ' +
                (isSignup ? 'Sign up with Google' : 'Continue with Google');
        });
        // Also release debounce in case it's stuck
        this._signInInProgress = false;
    },

    // Centralized user-friendly error message mapper for Firebase Auth errors
    _getFriendlyAuthError(error) {
        switch (error.code) {
            case 'auth/popup-closed-by-user':
            case 'auth/cancelled-popup-request':
                return 'Sign-in was cancelled. Please try again.';
            case 'auth/popup-blocked':
                return 'Pop-up was blocked by your browser. Please allow pop-ups for this site or try again.';
            case 'auth/network-request-failed':
                return 'Network error. Please check your internet connection and try again.';
            case 'auth/too-many-requests':
                return 'Too many attempts. Please wait a moment and try again.';
            case 'auth/internal-error':
                return 'Google sign-in temporarily unavailable. Please try again.';
            case 'auth/web-storage-unsupported':
                return 'Your browser is blocking storage required for sign-in. Please enable cookies or try a different browser.';
            case 'auth/user-disabled':
                return 'This account has been disabled. Please contact support.';
            case 'auth/account-exists-with-different-credential':
                return 'An account already exists with this email using a different sign-in method.';
            case 'auth/credential-already-in-use':
                return 'This credential is already linked to another account.';
            case 'auth/invalid-credential':
                return 'Invalid email or password. Please check and try again.';
            case 'auth/user-not-found':
                return 'No account found with this email. Please sign up first.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters long.';
            case 'auth/email-already-in-use':
                return 'This email is already registered. Please login instead.';
            case 'auth/operation-not-allowed':
                return 'This sign-in method is not enabled. Please contact support.';
            case 'auth/operation-not-supported-in-this-environment':
                return 'Sign-in is not supported in this browser. Please try a different browser.';
            case 'auth/unauthorized-domain':
                return 'Google sign-in is not enabled for this domain. Please try bropro.in or contact support.';
            case 'auth/redirect-cancelled-by-user':
                return 'Sign-in was cancelled before it completed. Please try again.';
            case 'auth/redirect-operation-pending':
                return 'A sign-in attempt is already in progress. Please wait a moment.';
            case 'auth/invalid-api-key':
                return 'Google sign-in configuration is invalid. Please contact support.';
            default:
                if ((error.message || '').includes('redirect_uri_mismatch')) {
                    return 'Google sign-in needs a domain configuration update. Please contact support or use email login for now.';
                }
                return error.message || 'Sign-in failed. Please try again.';
        }
    },

    // Sign up with Email/Password (Firebase Authentication)
    async signUpWithEmail(name, email, password) {
        // Mark this as user-initiated login (not auto-login)
        this.userInitiatedLogin = true;

        // Clear any logout flag so login works immediately
        removeSessionValue('supersite-logged-out');

        try {
            console.log('📧 Creating Firebase account for:', email);

            // Create user in Firebase Authentication
            const result = await auth.createUserWithEmailAndPassword(email, password);
            const user = result.user;

            // Update user profile with display name
            await user.updateProfile({
                displayName: name
            });

            // Store additional user data in Firestore users collection
            try {
                await this.db.collection('users').doc(user.uid).set({
                    name: name,
                    email: email.toLowerCase(),
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    authProvider: 'email'
                }, { merge: true });
                console.log('✅ User profile saved to Firestore');
            } catch (firestoreError) {
                console.warn('Firestore user save skipped:', firestoreError.message);
            }

            console.log('✅ Firebase Sign-Up successful:', name, email);
            return { success: true, user: { ...user, displayName: name } };

        } catch (error) {
            console.error('❌ Firebase Sign-Up error:', error);
            // Reset the flag on error
            this.userInitiatedLogin = false;

            return { success: false, error: this._getFriendlyAuthError(error) };
        }
    },

    // Sign in with Email/Password (Firebase Authentication)
    async signInWithEmail(email, password) {
        // Mark this as user-initiated login (not auto-login)
        this.userInitiatedLogin = true;

        // Clear any logout flag so login works immediately
        removeSessionValue('supersite-logged-out');

        try {
            console.log('📧 Signing in with Firebase:', email);

            // Sign in with Firebase Authentication
            const result = await auth.signInWithEmailAndPassword(email, password);
            const user = result.user;

            console.log('✅ Firebase Sign-In successful:', user.displayName || user.email);
            return { success: true, user };

        } catch (error) {
            console.error('❌ Firebase Sign-In error:', error);
            // Reset the flag on error
            this.userInitiatedLogin = false;

            return { success: false, error: this._getFriendlyAuthError(error) };
        }
    },

    // Sign out
    async signOut() {
        try {
            // Cleanup push notification token before signing out
            try {
                if (window.BroProPush) {
                    await BroProPush.cleanup();
                }
            } catch (pushError) {
                console.log('Push cleanup skipped:', pushError.message);
            }

            await auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    },

    // ============================================
    // PASSWORD RESET & ACCOUNT LINKING
    // Industry best practice: users should never be locked out
    // ============================================

    // Send password reset email (works for ALL users including Google-only)
    // Security: Does not reveal whether an email exists in the system
    async sendPasswordReset(email) {
        try {
            if (!email || !email.includes('@')) {
                return { success: false, error: 'Please enter a valid email address.' };
            }

            console.log('📧 Sending password reset email to:', email);
            await auth.sendPasswordResetEmail(email);
            console.log('✅ Password reset email sent successfully');

            return { success: true };
        } catch (error) {
            console.error('❌ Password reset error:', error);

            // Security best practice: don't reveal if the email exists or not
            if (error.code === 'auth/user-not-found') {
                return { success: true };
            }

            if (error.code === 'auth/too-many-requests') {
                return { success: false, error: 'Too many requests. Please wait a few minutes and try again.' };
            }

            if (error.code === 'auth/invalid-email') {
                return { success: false, error: 'Please enter a valid email address.' };
            }

            return { success: false, error: 'Failed to send reset email. Please try again.' };
        }
    },

    // Link email/password credential to the currently signed-in user
    // Used for Google-only users to set a backup password
    async linkPasswordToAccount(password) {
        try {
            const user = auth.currentUser;
            if (!user) {
                return { success: false, error: 'You must be logged in to set a backup password.' };
            }

            if (!user.email) {
                return { success: false, error: 'No email address associated with your account.' };
            }

            if (!password || password.length < 6) {
                return { success: false, error: 'Password must be at least 6 characters.' };
            }

            console.log('🔗 Linking password provider to account:', user.email);

            const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
            await user.linkWithCredential(credential);

            // Update Firestore user document to reflect linked provider
            try {
                await this.db.collection('users').doc(user.uid).set({
                    hasBackupPassword: true,
                    backupPasswordSetAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            } catch (e) {
                console.log('Firestore backup password flag update skipped:', e.message);
            }

            console.log('✅ Password provider linked successfully');
            return { success: true };
        } catch (error) {
            console.error('❌ Link password error:', error);

            if (error.code === 'auth/provider-already-linked') {
                return { success: false, error: 'A password is already set for this account.' };
            }
            if (error.code === 'auth/email-already-in-use') {
                return { success: false, error: 'This email is already associated with another account.' };
            }
            if (error.code === 'auth/weak-password') {
                return { success: false, error: 'Password is too weak. Use at least 6 characters.' };
            }
            if (error.code === 'auth/requires-recent-login') {
                return { success: false, error: 'For security, please log in again before setting a backup password.' };
            }

            return { success: false, error: error.message || 'Failed to set backup password. Please try again.' };
        }
    },

    // Check if current user has the password provider linked
    checkHasPasswordProvider() {
        const user = auth.currentUser;
        if (!user || !user.providerData) return false;
        return user.providerData.some(p => p.providerId === 'password');
    },

    // Check if current user signed in with Google
    _isGoogleUser() {
        const user = auth.currentUser;
        if (!user || !user.providerData) return false;
        return user.providerData.some(p => p.providerId === 'google.com');
    },

    // Handle successful login
    async onLoginSuccess(user) {
        console.log('🔐 Login successful for:', user.displayName || user.email);

        // ============================================
        // CHECK IF USER ACCOUNT WAS DELETED
        // Blocks users that were deleted by admin. Fully fail-safe:
        // any Firestore error (permissions, network, etc.) is silently
        // caught and the login proceeds normally.
        // ============================================
        try {
            const userEmail = (user.email || '').toLowerCase().trim();
            if (userEmail) {
                const deletedDoc = await this.db.collection('deletedUsers').doc(userEmail).get();
                if (deletedDoc.exists) {
                    const deletedData = deletedDoc.data();
                    console.log('🚫 BLOCKED: User account was previously deleted:', deletedData);

                    // Show message to user
                    this.showDeletedAccountMessage(deletedData);

                    // Sign out the user
                    this.isLoggingOut = true;
                    setSessionValue('supersite-logged-out', 'true');
                    await auth.signOut();

                    return; // Stop login process
                }
            }
        } catch (_ignored) {
            // Fail-safe: NEVER block login due to a deletedUsers check failure.
            // Common causes: Firestore permission denied (non-admin), network timeout.
            // The user proceeds normally — this is a best-effort safety net.
        }

        // Wrap everything in try-catch to ensure login always succeeds
        try {
            // ============================================
            // CRITICAL: PRESERVE EXISTING LOCALSTORAGE DATA FIRST
            // This prevents ANY scenario where progress could be lost
            // ============================================
            let existingLocalProfile = null;
            try {
                const savedProfile = localStorage.getItem('supersite-player-profile');
                if (savedProfile) {
                    existingLocalProfile = JSON.parse(savedProfile);
                    console.log('📋 Found existing localStorage profile:', {
                        xp: existingLocalProfile.xp,
                        level: existingLocalProfile.level,
                        coins: existingLocalProfile.coins,
                        name: existingLocalProfile.name
                    });
                }
            } catch (e) {
                console.warn('Could not parse existing localStorage profile:', e.message);
            }

            // Start with localStorage values as baseline (if available)
            // This ensures we NEVER lose data even if Firebase fails
            let restoredXP = existingLocalProfile?.xp || 0;
            let restoredLevel = existingLocalProfile?.level || 1;
            let restoredCoins = existingLocalProfile?.coins || 0;
            let restoredSubjectProgress = existingLocalProfile?.subjectProgress || {};
            let restoredAvatar = existingLocalProfile?.avatar || '🐼';
            let restoredName = existingLocalProfile?.name || user.displayName || 'Player';
            let restoredNameChanged = existingLocalProfile?.nameChanged || false;
            let restoredWalletSpent = existingLocalProfile?.walletSpent || 0;
            let restoredWalletAdded = existingLocalProfile?.walletAdded || 0;
            let restoredOwnedPremiumAvatars = existingLocalProfile?.ownedPremiumAvatars || [];
            let restoredAchievements = existingLocalProfile?.achievements || [];
            let hasFirebaseData = false;

            console.log('🔄 Starting data restoration with baseline XP:', restoredXP, 'Level:', restoredLevel);

            // Try to restore data from Firebase
            try {
                // Fetch from global leaderboard first (new structure)
                const globalDoc = await this.db.collection('leaderboards').doc('global').collection('players').doc(user.uid).get();
                if (globalDoc.exists) {
                    const data = globalDoc.data();
                    hasFirebaseData = true;
                    restoredXP = data.xp || 0;
                    restoredCoins = data.coins || 0;
                    // Restore wallet spent, wallet added and owned premium avatars
                    restoredWalletSpent = data.walletSpent || 0;
                    restoredWalletAdded = data.walletAdded || 0;
                    restoredOwnedPremiumAvatars = data.ownedPremiumAvatars || [];
                    // Restore avatar if it's an emoji
                    if (data.avatar && !data.avatar.startsWith('http')) {
                        restoredAvatar = data.avatar;
                    }
                    // Restore custom name if it exists
                    if (data.name && data.name !== user.displayName) {
                        restoredName = data.name;
                        restoredNameChanged = true;
                        console.log('🏷️ Restored custom name:', restoredName);
                    }
                    console.log('✅ Found data in global leaderboard:', { xp: restoredXP, coins: restoredCoins, avatar: restoredAvatar, name: restoredName, walletSpent: restoredWalletSpent, ownedAvatars: restoredOwnedPremiumAvatars });
                }

                // Also check the old leaderboard collection
                const oldDoc = await this.db.collection('leaderboard').doc(user.uid).get();
                if (oldDoc.exists) {
                    const data = oldDoc.data();
                    hasFirebaseData = true;
                    if (data.xp && data.xp > restoredXP) {
                        restoredXP = data.xp;
                    }
                    if (data.coins && data.coins > restoredCoins) {
                        restoredCoins = data.coins;
                    }
                    // Restore wallet spent, wallet added and owned premium avatars from old collection too
                    if (data.walletSpent && data.walletSpent > restoredWalletSpent) {
                        restoredWalletSpent = data.walletSpent;
                    }
                    if (data.walletAdded && data.walletAdded > restoredWalletAdded) {
                        restoredWalletAdded = data.walletAdded;
                    }
                    if (data.ownedPremiumAvatars && data.ownedPremiumAvatars.length > restoredOwnedPremiumAvatars.length) {
                        restoredOwnedPremiumAvatars = data.ownedPremiumAvatars;
                    }
                    if (data.avatar && !data.avatar.startsWith('http')) {
                        restoredAvatar = data.avatar;
                    }
                    // Restore custom name if it exists and not already restored
                    if (data.name && data.name !== user.displayName && !restoredNameChanged) {
                        restoredName = data.name;
                        restoredNameChanged = true;
                        console.log('🏷️ Restored custom name from old leaderboard:', restoredName);
                    }
                    console.log('✅ Found data in old leaderboard:', { xp: restoredXP, avatar: restoredAvatar, walletSpent: restoredWalletSpent });
                }

                // Fetch subject-wise XP
                const subjects = ['math', 'mathematics', 'science', 'geography', 'english', 'hindi', 'gk'];
                for (const subject of subjects) {
                    try {
                        const subjectDoc = await this.db.collection('leaderboards').doc(subject).collection('players').doc(user.uid).get();
                        if (subjectDoc.exists) {
                            const data = subjectDoc.data();
                            hasFirebaseData = true;
                            if (data.xp) {
                                const normalizedSubject = subject === 'mathematics' ? 'math' : subject;
                                restoredSubjectProgress[normalizedSubject] = { xp: data.xp, quizzes: 0, accuracy: 0 };
                            }
                        }
                    } catch (e) {
                        // Subject leaderboard might not exist - that's OK
                    }
                }

                // IMPORTANT: Check presence collection for the most recent walletSpent
                // This is where we save spending in real-time, so it has the most up-to-date value
                try {
                    const presenceDoc = await this.db.collection('presence').doc(user.uid).get();
                    if (presenceDoc.exists) {
                        const presenceData = presenceDoc.data();
                        if (presenceData.walletSpent && presenceData.walletSpent > restoredWalletSpent) {
                            restoredWalletSpent = presenceData.walletSpent;
                            console.log('💰 Got latest walletSpent from presence:', restoredWalletSpent);
                        }
                        if (presenceData.walletAdded && presenceData.walletAdded > restoredWalletAdded) {
                            restoredWalletAdded = presenceData.walletAdded;
                            console.log('💰 Got latest walletAdded from presence:', restoredWalletAdded);
                        }
                    }
                } catch (e) {
                    console.log('Presence check skipped:', e.message);
                }

                // ALSO check users collection for wallet data AND XP (most reliable source)
                try {
                    const usersDoc = await this.db.collection('users').doc(user.uid).get();
                    if (usersDoc.exists) {
                        const userData = usersDoc.data();
                        hasFirebaseData = true;

                        // CRITICAL: Also check XP in users collection
                        if (userData.xp && userData.xp > restoredXP) {
                            console.log('📊 Found higher XP in users collection:', userData.xp, '(was:', restoredXP, ')');
                            restoredXP = userData.xp;
                        }
                        if (userData.coins && userData.coins > restoredCoins) {
                            restoredCoins = userData.coins;
                        }
                        if (userData.walletAdded && userData.walletAdded > restoredWalletAdded) {
                            restoredWalletAdded = userData.walletAdded;
                            console.log('💰 Got latest walletAdded from users collection:', restoredWalletAdded);
                        }
                        if (userData.walletSpent && userData.walletSpent > restoredWalletSpent) {
                            restoredWalletSpent = userData.walletSpent;
                            console.log('💰 Got latest walletSpent from users collection:', restoredWalletSpent);
                        }
                        // Check for achievements
                        if (userData.achievements && userData.achievements.length > restoredAchievements.length) {
                            restoredAchievements = userData.achievements;
                            console.log('🏆 Got achievements from users collection:', restoredAchievements.length);
                        }
                    }
                } catch (e) {
                    console.log('Users collection check skipped:', e.message);
                }

                // ============================================
                // CRITICAL: Calculate level from XP using CORRECT formula
                // Formula: 1000 XP per level (using XP_PER_LEVEL constant)
                // This must match gamification.js calculateLevel()
                // ============================================
                if (restoredXP > 0) {
                    const calculatedLevel = Math.floor(restoredXP / (window.XP_PER_LEVEL || 1000)) + 1;
                    // ALWAYS use the HIGHER level to prevent regression
                    restoredLevel = Math.max(restoredLevel, calculatedLevel);
                    console.log('📊 Level calculation: XP=' + restoredXP + ' → Calculated Level=' + calculatedLevel + ', Final Level=' + restoredLevel);
                }

                if (!hasFirebaseData) {
                    console.log('🆕 No Firebase data found - using localStorage baseline');
                }

            } catch (firebaseError) {
                console.warn('⚠️ Firebase restore error:', firebaseError.message);
                // CRITICAL: Keep localStorage values as fallback - DO NOT reset to 0!
                console.log('🛡️ Using localStorage fallback - XP:', restoredXP, 'Level:', restoredLevel);
            }

            // CRITICAL: Preserve existing premium status from localStorage
            let restoredPremium = false;
            let restoredPremiumExpiry = null;
            let restoredPremiumGrantedAt = null;
            let restoredPremiumPromoCode = null;
            let restoredUsedPromoCodes = [];

            // Check existing localStorage for premium data FIRST
            try {
                const existingProfile = JSON.parse(localStorage.getItem('supersite-player-profile') || '{}');
                if (existingProfile.premium) {
                    restoredPremium = existingProfile.premium;
                    restoredPremiumExpiry = existingProfile.premiumExpiry;
                    restoredPremiumGrantedAt = existingProfile.premiumGrantedAt;
                    restoredPremiumPromoCode = existingProfile.premiumPromoCode;
                    restoredUsedPromoCodes = existingProfile.usedPromoCodes || [];
                    console.log('✅ Premium status preserved from localStorage:', restoredPremium, restoredPremiumExpiry);
                }
                // ALSO preserve achievements!
                if (existingProfile.achievements && existingProfile.achievements.length > 0) {
                    restoredAchievements = existingProfile.achievements;
                    console.log('🏆 Achievements preserved from localStorage:', restoredAchievements.length);
                }
            } catch (e) {
                console.log('No existing profile to check for premium');
            }

            // Also try to restore premium from Firebase users collection
            if (!restoredPremium) {
                try {
                    const userDoc = await this.db.collection('users').doc(user.uid).get();
                    if (userDoc.exists) {
                        const userData = userDoc.data();
                        if (userData.premium) {
                            restoredPremium = userData.premium;
                            restoredPremiumExpiry = userData.premiumExpiry;
                            restoredPremiumGrantedAt = userData.premiumGrantedAt;
                            restoredPremiumPromoCode = userData.premiumPromoCode;
                            console.log('✅ Premium status restored from Firebase:', restoredPremium, restoredPremiumExpiry);
                        }
                    }
                } catch (e) {
                    console.log('Firebase premium check skipped:', e.message);
                }
            }

            // ============================================
            // CRITICAL: SYNC PENDING PREMIUM FROM PAYMENT
            // ============================================
            // Check for pending premium data (from payment-success page when user wasn't logged in)
            const PENDING_PREMIUM_KEY = 'bropro_pending_premium';
            try {
                const pendingData = localStorage.getItem(PENDING_PREMIUM_KEY);
                if (pendingData) {
                    const pending = JSON.parse(pendingData);
                    console.log('🔔 Found pending premium data:', pending);

                    // Verify this pending premium matches the user's email (case insensitive)
                    const userEmail = (user.email || '').toLowerCase();
                    const pendingEmail = (pending.customerEmail || '').toLowerCase();

                    // If emails match, or if no email check possible, apply the premium
                    if (!pendingEmail || !userEmail || pendingEmail === userEmail) {
                        // Apply pending premium to restored data
                        restoredPremium = true;
                        restoredPremiumExpiry = pending.expiryDate;
                        restoredPremiumGrantedAt = pending.createdAt;
                        restoredPremiumPromoCode = pending.promoCode || pending.paymentRef;

                        console.log('✅ Pending premium applied:', pending);

                        // Sync to Firebase immediately
                        const premiumData = {
                            premium: true,
                            premiumExpiry: pending.expiryDate,
                            premiumGrantedAt: pending.createdAt,
                            premiumPaymentRef: pending.paymentRef,
                            premiumPromoCode: pending.promoCode || null,
                            email: user.email,
                            name: user.displayName || restoredName
                        };

                        // Sync to users and presence collections
                        await this.db.collection('users').doc(user.uid).set(premiumData, { merge: true });
                        await this.db.collection('presence').doc(user.uid).set(premiumData, { merge: true });

                        // Update premiumSubscriptions with userId
                        if (pending.orderId) {
                            try {
                                await this.db.collection('premiumSubscriptions').doc(pending.orderId).update({
                                    synced: true,
                                    userId: user.uid,
                                    syncedAt: firebase.firestore.FieldValue.serverTimestamp()
                                });
                            } catch (e) {
                                console.log('Could not update subscription sync status:', e.message);
                            }
                        }

                        // Clear pending data
                        localStorage.removeItem(PENDING_PREMIUM_KEY);
                        console.log('🎉 Pending premium synced to Firebase successfully!');
                    } else {
                        console.log('⚠️ Pending premium email mismatch:', pendingEmail, 'vs', userEmail);
                        // Don't apply if emails don't match
                    }
                }
            } catch (e) {
                console.log('Pending premium check skipped:', e.message);
            }

            // ============================================
            // CRITICAL: SYNC PENDING WALLET TOP-UPS
            // ============================================
            // Check for pending wallet top-ups (from wallet-success page when user wasn't logged in)
            try {
                const pendingTopUps = JSON.parse(localStorage.getItem('pendingWalletTopUps') || '[]');
                if (pendingTopUps.length > 0) {
                    console.log('💰 Found pending wallet top-ups:', pendingTopUps.length);

                    let totalSynced = 0;
                    const successfulSyncs = [];

                    for (const topUp of pendingTopUps) {
                        try {
                            // Check if already processed in Firebase
                            const processedDoc = await this.db.collection('processedOrders').doc(topUp.orderId).get();
                            if (processedDoc.exists) {
                                console.log('⚠️ Order already processed:', topUp.orderId);
                                successfulSyncs.push(topUp.orderId);
                                continue;
                            }

                            // Mark as processed
                            await this.db.collection('processedOrders').doc(topUp.orderId).set({
                                orderId: topUp.orderId,
                                userId: user.uid,
                                amount: topUp.amount,
                                processedAt: firebase.firestore.FieldValue.serverTimestamp(),
                                type: 'wallet_topup',
                                syncedOnLogin: true
                            });

                            // Credit wallet
                            const walletUpdate = {
                                walletAdded: firebase.firestore.FieldValue.increment(topUp.amount),
                                lastWalletTopUp: firebase.firestore.FieldValue.serverTimestamp()
                            };

                            await Promise.all([
                                this.db.collection('users').doc(user.uid).set(walletUpdate, { merge: true }),
                                this.db.collection('presence').doc(user.uid).set(walletUpdate, { merge: true }),
                                this.db.collection('leaderboard').doc(user.uid).set(walletUpdate, { merge: true })
                            ]);

                            totalSynced += topUp.amount;
                            successfulSyncs.push(topUp.orderId);
                            console.log(`✅ Synced wallet top-up: ₹${topUp.amount} (${topUp.orderId})`);

                        } catch (syncErr) {
                            console.error('❌ Failed to sync wallet top-up:', topUp.orderId, syncErr);
                        }
                    }

                    // Remove successfully synced from pending list
                    const remainingPending = pendingTopUps.filter(t => !successfulSyncs.includes(t.orderId));
                    if (remainingPending.length > 0) {
                        localStorage.setItem('pendingWalletTopUps', JSON.stringify(remainingPending));
                    } else {
                        localStorage.removeItem('pendingWalletTopUps');
                    }

                    if (totalSynced > 0) {
                        console.log(`🎉 Total wallet synced on login: ₹${totalSynced}`);
                        restoredWalletAdded += totalSynced; // Add to restored amount
                    }
                }
            } catch (e) {
                console.log('Pending wallet sync skipped:', e.message);
            }

            // ============================================
            // CRITICAL: CHECK FOR UNSYNCED PREMIUM SUBSCRIPTIONS
            // ============================================
            // This catches payments that were recorded but not synced to the user
            if (!restoredPremium) {
                try {
                    const userEmail = (user.email || '').toLowerCase();
                    if (userEmail) {
                        // Check premiumSubscriptions for this user's email
                        const subsQuery = await this.db.collection('premiumSubscriptions')
                            .where('customerEmail', '==', userEmail)
                            .where('premium', '==', true)
                            .orderBy('createdAt', 'desc')
                            .limit(1)
                            .get();

                        if (!subsQuery.empty) {
                            const subData = subsQuery.docs[0].data();
                            const subId = subsQuery.docs[0].id;

                            // Check if subscription is still valid (not expired)
                            if (subData.premiumExpiry) {
                                const expiry = new Date(subData.premiumExpiry);
                                if (expiry > new Date()) {
                                    console.log('🔔 Found unsynced premium subscription:', subId);

                                    restoredPremium = true;
                                    restoredPremiumExpiry = subData.premiumExpiry;
                                    restoredPremiumGrantedAt = subData.premiumGrantedAt;
                                    restoredPremiumPromoCode = subData.promoCode || null;

                                    // Sync to Firebase
                                    const premiumData = {
                                        premium: true,
                                        premiumExpiry: subData.premiumExpiry,
                                        premiumGrantedAt: subData.premiumGrantedAt,
                                        premiumPaymentRef: 'cashfree_' + subId,
                                        premiumPromoCode: subData.promoCode || null
                                    };

                                    await this.db.collection('users').doc(user.uid).set(premiumData, { merge: true });
                                    await this.db.collection('presence').doc(user.uid).set(premiumData, { merge: true });

                                    // Mark subscription as synced
                                    await this.db.collection('premiumSubscriptions').doc(subId).update({
                                        synced: true,
                                        userId: user.uid,
                                        syncedAt: firebase.firestore.FieldValue.serverTimestamp()
                                    });

                                    console.log('🎉 Unsynced premium subscription recovered and applied!');
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.log('Unsynced subscription check skipped:', e.message);
                }
            }

            // Create profile object - NOW WITH PREMIUM DATA PRESERVED
            const profile = {
                name: restoredName, // Use restored custom name, not Google name
                displayName: restoredName, // Also set displayName for leaderboard
                googleName: user.displayName, // Keep original Google name for reference
                email: user.email,
                avatar: restoredAvatar,
                photoURL: user.photoURL,
                registeredAt: user.metadata?.creationTime || new Date().toISOString(),
                firebaseUid: user.uid,
                xp: restoredXP,
                level: restoredLevel,
                coins: restoredCoins,
                walletSpent: restoredWalletSpent, // Premium purchase tracking
                walletAdded: restoredWalletAdded, // Wallet top-ups
                ownedPremiumAvatars: restoredOwnedPremiumAvatars, // Owned premium avatars
                subjectProgress: restoredSubjectProgress,
                nameChanged: restoredNameChanged, // Preserve name change status
                // PREMIUM DATA - PRESERVED!
                premium: restoredPremium,
                premiumExpiry: restoredPremiumExpiry,
                premiumGrantedAt: restoredPremiumGrantedAt,
                premiumPromoCode: restoredPremiumPromoCode,
                usedPromoCodes: restoredUsedPromoCodes,
                settings: {
                    soundEnabled: true,
                    musicEnabled: false,
                    theme: localStorage.getItem('supersite-theme') || 'light'
                },
                achievements: restoredAchievements, // PRESERVE achievements!
                streak: 0,
                totalQuestions: 0,
                totalCorrect: 0
            };

            console.log('💰 Wallet data restored:', { walletSpent: restoredWalletSpent, walletAdded: restoredWalletAdded, ownedAvatars: restoredOwnedPremiumAvatars });
            console.log('👑 Premium status:', { premium: restoredPremium, expiry: restoredPremiumExpiry });

            // Save profile to localStorage
            localStorage.setItem('supersite-player-profile', JSON.stringify(profile));
            localStorage.setItem('supersite-current-user', user.uid);
            localStorage.setItem('supersite-firebase-user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            }));

            console.log('📊 Profile created with XP:', profile.xp, 'Level:', profile.level, 'Avatar:', profile.avatar);

            // Update leaderboard (fire and forget - don't wait)
            this.updateLeaderboardEntry(profile).catch(e => console.log('Leaderboard update skipped:', e.message));

            // Update UI
            this.updateAuthUI();

            // Remove lock badges
            this.removeLockBadges();

            // Update navbar stats
            if (window.updateNavbarStats) {
                setTimeout(() => updateNavbarStats(), 100);
            }

            // Refresh premium avatar and limited stock UI states
            // This ensures users who own avatars see "OWNED" instead of "SOLD OUT"
            setTimeout(() => {
                if (typeof updatePremiumState === 'function') {
                    updatePremiumState();
                    console.log('✅ Premium avatar state refreshed after login');
                }
                // Also refresh limited stock avatar UI
                if (window.LimitedStockAvatars) {
                    for (const avatarId of Object.keys(LimitedStockAvatars.config)) {
                        const stock = LimitedStockAvatars.stockCache[avatarId];
                        if (stock !== undefined) {
                            LimitedStockAvatars.updateStockUI(avatarId, stock);
                        }
                    }
                    console.log('✅ Limited stock avatar UI refreshed after login');
                }
            }, 500);

            console.log('✅ Login complete!');

            // ============================================
            // BACKUP PASSWORD PROMPT FOR GOOGLE-ONLY USERS
            // Industry best practice: prompt Google-only users to set
            // a backup password so they're never locked out.
            // Shows once every 7 days if skipped, never if completed.
            // ============================================
            if (this._isGoogleUser() && !this.checkHasPasswordProvider()) {
                try {
                    const promptData = JSON.parse(localStorage.getItem('supersite-backup-pwd-prompt') || '{}');
                    const lastPrompted = promptData.timestamp || 0;
                    const daysSincePrompt = (Date.now() - lastPrompted) / (1000 * 60 * 60 * 24);

                    // Show prompt if: never prompted, completed=false, or last prompted > 7 days ago
                    if (!promptData.completed && (!promptData.timestamp || daysSincePrompt > 7)) {
                        setTimeout(() => {
                            if (window.showBackupPasswordPrompt) {
                                showBackupPasswordPrompt();
                            }
                        }, 2500); // Wait 2.5s after login for everything to settle
                    }
                } catch (e) {
                    console.log('Backup password prompt check skipped:', e.message);
                }
            }

            // Initialize Push Notifications (FCM token acquisition)
            try {
                if (window.BroProPush) {
                    BroProPush.init(user);
                }
            } catch (pushError) {
                console.log('Push notification init skipped:', pushError.message);
            }

        } catch (error) {
            console.error('❌ Login error:', error);

            // ============================================
            // CRITICAL: PRESERVE ALL EXISTING DATA IN FALLBACK!
            // This prevents any scenario where progress could be lost
            // ============================================
            let existingProfile = {};
            try {
                existingProfile = JSON.parse(localStorage.getItem('supersite-player-profile') || '{}');
                console.log('🛡️ Fallback: Preserving existing profile data:', {
                    xp: existingProfile.xp,
                    level: existingProfile.level,
                    coins: existingProfile.coins,
                    premium: existingProfile.premium
                });
            } catch (e) {
                console.warn('Could not parse existing profile for fallback');
            }

            // CRITICAL: Preserve ALL existing data, not just premium!
            const fallbackProfile = {
                name: existingProfile.name || user.displayName || 'Player',
                email: user.email,
                avatar: existingProfile.avatar || '🐼',
                // CRITICAL: PRESERVE XP AND LEVEL!
                xp: existingProfile.xp || 0,
                level: existingProfile.level || 1,
                coins: existingProfile.coins || 0,
                firebaseUid: user.uid,
                // Preserve all progress data
                subjectProgress: existingProfile.subjectProgress || {},
                walletSpent: existingProfile.walletSpent || 0,
                walletAdded: existingProfile.walletAdded || 0,
                ownedPremiumAvatars: existingProfile.ownedPremiumAvatars || [],
                achievements: existingProfile.achievements || [],
                // Preserve premium data
                premium: existingProfile.premium || false,
                premiumExpiry: existingProfile.premiumExpiry,
                premiumGrantedAt: existingProfile.premiumGrantedAt,
                premiumPromoCode: existingProfile.premiumPromoCode,
                usedPromoCodes: existingProfile.usedPromoCodes || [],
                // Preserve settings
                settings: existingProfile.settings || {
                    soundEnabled: true,
                    musicEnabled: false,
                    theme: 'light'
                },
                nameChanged: existingProfile.nameChanged || false,
                streak: existingProfile.streak || 0,
                totalQuestions: existingProfile.totalQuestions || 0,
                totalCorrect: existingProfile.totalCorrect || 0
            };

            localStorage.setItem('supersite-player-profile', JSON.stringify(fallbackProfile));
            localStorage.setItem('supersite-current-user', user.uid);

            // Still update UI
            this.updateAuthUI();
            this.removeLockBadges();

            console.log('⚠️ Login completed with fallback profile - ALL progress preserved! XP:', fallbackProfile.xp, 'Level:', fallbackProfile.level);
        }
    },

    // Direct leaderboard update with user profile
    async updateLeaderboardEntry(profile) {
        // Update Local Storage first for immediate feedback
        const leaderboard = JSON.parse(localStorage.getItem('supersite-leaderboard') || '[]');
        const existingIdx = leaderboard.findIndex(p => p.email === profile.email);

        const entry = {
            name: profile.name,
            email: profile.email,
            xp: profile.xp || 0,
            level: profile.level || 1,
            coins: profile.coins || 0,
            avatar: profile.avatar || '🐼',
            uid: this.currentUser ? this.currentUser.uid : null
        };

        if (existingIdx >= 0) {
            leaderboard[existingIdx] = {
                ...entry,
                xp: Math.max(leaderboard[existingIdx].xp || 0, entry.xp),
                coins: Math.max(leaderboard[existingIdx].coins || 0, entry.coins)
            };
        } else {
            leaderboard.push(entry);
        }

        leaderboard.sort((a, b) => (b.xp || 0) - (a.xp || 0));
        localStorage.setItem('supersite-leaderboard', JSON.stringify(leaderboard));

        // Sync to Firestore if logged in
        if (this.currentUser) {
            try {
                await this.db.collection('leaderboard').doc(this.currentUser.uid).set({
                    name: profile.name,
                    email: profile.email,
                    xp: profile.xp || 0,
                    coins: profile.coins || 0,
                    avatar: profile.avatar || '🐼',
                    walletSpent: profile.walletSpent || 0, // Premium purchases
                    walletAdded: profile.walletAdded || 0, // Wallet top-ups
                    ownedPremiumAvatars: profile.ownedPremiumAvatars || [], // Owned avatars
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                console.log('✅ Profile synced to cloud (including premium purchases)!');
            } catch (e) {
                console.error('Error syncing to cloud:', e);
            }
        }
    },

    // ============================================
    // ONE-TIME LEADERBOARD FETCH (Cost-Optimized)
    // Replaces the old onSnapshot real-time listener
    // to eliminate cascading reads on every write.
    // Data refreshes: on page load, or via manual refresh.
    // ============================================
    async fetchLeaderboardOnce() {
        if (!this.db) return;

        // Initialize global store from cache immediately for instant UI
        try {
            const cached = localStorage.getItem('supersite-cloud-leaderboard');
            if (cached) {
                window.BroProLeaderboardData = JSON.parse(cached);
                console.log('📦 Leaderboard loaded from cache:', window.BroProLeaderboardData.length, 'players');
            } else {
                window.BroProLeaderboardData = [];
            }
        } catch (e) {
            window.BroProLeaderboardData = [];
        }

        // Check cache freshness (5-minute TTL)
        const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
        const lastFetchTime = parseInt(localStorage.getItem('supersite-cloud-leaderboard-time') || '0');
        const now = Date.now();

        if (now - lastFetchTime < CACHE_TTL && window.BroProLeaderboardData.length > 0) {
            console.log('📦 Leaderboard cache still fresh, skipping fetch');
            return;
        }

        // Fetch fresh data with a single one-time read
        try {
            console.log('📊 Fetching leaderboard (one-time read)...');
            const snapshot = await this.db.collection('leaderboard')
                .orderBy('xp', 'desc')
                .limit(50)
                .get();

            const cloudLeaderboard = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.name && typeof data.xp === 'number') {
                    cloudLeaderboard.push(data);
                }
            });

            // Update global store
            window.BroProLeaderboardData = cloudLeaderboard;

            // Cache to localStorage with timestamp
            localStorage.setItem('supersite-cloud-leaderboard', JSON.stringify(cloudLeaderboard));
            localStorage.setItem('supersite-cloud-leaderboard-time', now.toString());

            console.log('✅ Leaderboard fetched:', cloudLeaderboard.length, 'players (saved to cache)');

            // Render UI if modal is currently open
            const globalModal = document.getElementById('globalLeaderboardModal');
            if (globalModal && globalModal.classList.contains('active')) {
                if (typeof renderGlobalLeaderboard === 'function') {
                    renderGlobalLeaderboard();
                }
            }
        } catch (error) {
            console.error('❌ Leaderboard fetch error:', error);
            if (error.code === 'permission-denied') {
                console.warn('Authentication or Rules issue preventing leaderboard fetch.');
            }
            // Graceful fallback: cache is already populated above
        }
    },

    // Manual refresh — call this from refresh buttons or after XP changes
    async refreshLeaderboard() {
        // Invalidate cache to force fresh fetch
        localStorage.removeItem('supersite-cloud-leaderboard-time');
        await this.fetchLeaderboardOnce();
    },

    // Handle logout
    onLogout() {
        // Clear ALL auth-related storage
        localStorage.removeItem('supersite-firebase-user');
        localStorage.removeItem('supersite-current-user');
        localStorage.removeItem('supersite-player-profile');

        // Reset current user
        this.currentUser = null;

        // Update UI
        this.updateAuthUI();

        // Add lock badges back
        if (window.BroProAuth) {
            setTimeout(() => BroProAuth.addLockBadges(), 100);
        }
    },

    // Update Auth UI elements
    async updateAuthUI() {
        const authBtn = document.getElementById('authBtn');
        const authBtnText = document.getElementById('authBtnText');
        const mobileUserCard = document.getElementById('mobileUserCard');

        if (!authBtn) return;

        if (this.currentUser) {
            // Priority: Leaderboard name > Local profile > Google name
            let displayName = this.currentUser.displayName || 'User';
            let userAvatar = '🐼';

            // Try to get user profile from LOCAL sources (avoids Firestore read)
            try {
                // Priority 1: Local BroProPlayer profile (always synced on login)
                const localProfile = window.BroProPlayer?.load();
                if (localProfile && localProfile.name) {
                    displayName = localProfile.name;
                }
                if (localProfile && localProfile.avatar) {
                    userAvatar = localProfile.avatar;
                }

                // Priority 2: Cached BroProLeaderboardData (in-memory, from page load fetch)
                if (!localProfile?.name && window.BroProLeaderboardData) {
                    const cached = window.BroProLeaderboardData.find(p => p.email === this.currentUser.email);
                    if (cached) {
                        if (cached.name) displayName = cached.name;
                        if (cached.avatar) userAvatar = cached.avatar;
                    }
                }
            } catch (e) {
                console.log('Could not get profile for navbar');
            }

            authBtnText.textContent = displayName.split(' ')[0];
            authBtn.classList.add('logged-in');
            authBtn.title = 'Click to logout';

            // Show logout link in menu
            const logoutML = document.getElementById('logoutMobileLink');
            if (logoutML) logoutML.style.display = 'flex';

            // Populate mobile user card in hamburger menu
            if (mobileUserCard) {
                mobileUserCard.style.display = 'flex';
                const avatarEl = document.getElementById('mobileUserAvatar');
                const nameEl = document.getElementById('mobileUserName');
                const emailEl = document.getElementById('mobileUserEmail');

                // Render avatar: photoURL > URL avatar > image avatar > emoji
                if (avatarEl) {
                    const photoURL = this.currentUser.photoURL;
                    const imageAvatars = ['bhai', 'black-rock-bhain', 'bhagat-singh', 'shri-ram', 'krishna', 'buddha', 'guru-nanak', 'vivekananda', 'ambedkar', 'gandhi', 'netaji', 'hanuman', 'apj-kalam', 'tipu-sultan', 'maharana-pratap', 'maulana-azad', 'shivaji-maharaj', 'rani-lakshmibai', 'savitribai-phule', 'kalpana-chawla', 'aryabhata', 'sardar-patel', 'lal-bahadur-shastri', 'jawaharlal-nehru', 'chanakya', 'cv-raman', 'vikram-sarabhai', 'ratan-tata', 'nelson-mandela'];

                    const imgStyle = 'width:100%;height:100%;border-radius:50%;object-fit:cover;';

                    if (userAvatar && (userAvatar.startsWith('http://') || userAvatar.startsWith('https://'))) {
                        // URL-based avatar
                        avatarEl.innerHTML = `<img src="${userAvatar}" alt="" style="${imgStyle}">`;
                    } else if (imageAvatars.includes(userAvatar) || (userAvatar && userAvatar.startsWith('img:'))) {
                        // Image-based avatar from assets
                        const avatarId = userAvatar.startsWith('img:') ? userAvatar.slice(4) : userAvatar;
                        avatarEl.innerHTML = `<img src="/assets/avatars/${avatarId}-avatar.png" alt="" style="${imgStyle}">`;
                    } else if (photoURL) {
                        // Google profile photo fallback
                        avatarEl.innerHTML = `<img src="${photoURL}" alt="" style="${imgStyle}">`;
                    } else {
                        // Emoji avatar
                        avatarEl.textContent = userAvatar || '🐼';
                    }
                    avatarEl.style.fontSize = avatarEl.querySelector('img') ? '0' : '';
                    avatarEl.style.padding = avatarEl.querySelector('img') ? '0' : '';
                    avatarEl.style.overflow = avatarEl.querySelector('img') ? 'hidden' : '';
                }
                if (nameEl) nameEl.textContent = displayName;
                if (emailEl) emailEl.textContent = this.currentUser.email || '';
            }

            // Update navbar stats
            if (window.updateNavbarStats) {
                updateNavbarStats();
            }
        } else {
            authBtnText.textContent = 'Login';
            authBtn.classList.remove('logged-in');
            authBtn.title = 'Login or Sign up';

            // Hide logout link in menu
            const logoutML = document.getElementById('logoutMobileLink');
            if (logoutML) logoutML.style.display = 'none';

            // Hide mobile user card
            if (mobileUserCard) {
                mobileUserCard.style.display = 'none';
            }
        }
    },

    // Remove lock badges when logged in
    removeLockBadges() {
        document.querySelectorAll('.lock-badge').forEach(badge => badge.remove());
    },

    // Check if user is logged in
    isLoggedIn() {
        return !!this.currentUser;
    },

    // Get current user name (prioritize leaderboard/profile name)
    getUserName() {
        // Try local profile first (synced with leaderboard)
        const localProfile = window.BroProPlayer?.load();
        if (localProfile && localProfile.name) {
            return localProfile.name;
        }
        return this.currentUser?.displayName || 'Guest';
    },

    // Get current user email
    getUserEmail() {
        return this.currentUser?.email || '';
    },

    // Get user photo URL
    getUserPhoto() {
        return this.currentUser?.photoURL || null;
    }
};

// ============================================
// GOOGLE SIGN-IN HANDLER (called from button)
// ============================================
function getActiveAuthErrorElement() {
    const signupForm = document.getElementById('signupForm');
    const signupVisible = signupForm && !signupForm.classList.contains('hidden');
    return document.getElementById(signupVisible ? 'signupError' : 'loginError') ||
        document.getElementById('loginError') ||
        document.getElementById('signupError');
}

async function handleGoogleSignIn() {
    const errorEl = getActiveAuthErrorElement();

    // Clear any previous error
    if (errorEl) errorEl.textContent = '';

    // Show loading state on ALL Google buttons (login + signup forms)
    const googleBtns = document.querySelectorAll('.google-signin-btn');
    googleBtns.forEach(btn => {
        btn.disabled = true;
        btn.innerHTML = '<span class="google-icon">⏳</span> Signing in...';
    });

    const result = await FirebaseAuth.signInWithGoogle();

    if (result.success) {
        // If redirect-based sign-in was triggered, the page will navigate away.
        // Show a "Redirecting..." message so the user knows what's happening.
        if (result.redirect) {
            googleBtns.forEach(btn => {
                btn.innerHTML = '<span class="google-icon">🔄</span> Redirecting to Google...';
            });
            return; // Page will reload after redirect completes
        }

        // Close modal immediately
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.classList.remove('active');
        }
        closeAuthModal();

        // Update UI first to ensure profile is synced
        if (window.updateAuthUI) updateAuthUI();
        if (window.updateNavbarStats) updateNavbarStats();

        // Show premium welcome message with leaderboard/profile name
        const profileName = window.BroProPlayer ? BroProPlayer.getName() : result.user.displayName;
        showWelcomeModal(profileName, false);
    } else {
        // Show error
        if (errorEl) {
            errorEl.textContent = result.error || 'Sign-in failed. Please try again.';
        }

        // Reset ALL Google buttons
        FirebaseAuth._resetGoogleButton();
    }
}

// ============================================
// OVERRIDE EXISTING AUTH FUNCTIONS
// ============================================
// Override openAuthModal to handle logged-in state with logout confirmation
const originalOpenAuthModal = window.openAuthModal;
window.openAuthModal = async function () {
    if (FirebaseAuth.isLoggedIn()) {
        // Use leaderboard/profile name instead of Firebase/Google name
        const profileName = window.BroProPlayer ? BroProPlayer.getName() : FirebaseAuth.getUserName();
        const shouldLogout = await showConfirmModal(
            'Switch Account?',
            `You are logged in as ${profileName}. Do you want to logout?`,
            '🔄'
        );
        if (shouldLogout) {
            await FirebaseAuth.signOut();
            showGoodbyeModal('You have been logged out successfully.');
        }
        return;
    }
    document.getElementById('authModal')?.classList.add('active');
};

// Override handleLogout
window.handleLogout = async function () {
    await FirebaseAuth.signOut();
    if (window.updateNavbarStats) {
        updateNavbarStats();
    }
    showGoodbyeModal('You have been logged out successfully.');
};

// ============================================
// UPDATE SUPERSITE PLAYER TO USE FIREBASE
// ============================================
// Override isLoggedIn to check Firebase first
if (window.BroProPlayer) {
    const originalIsLoggedIn = BroProPlayer.isLoggedIn;
    BroProPlayer.isLoggedIn = function () {
        // Check Firebase auth first
        if (FirebaseAuth.currentUser) return true;
        // Fallback to original check
        return originalIsLoggedIn.call(this);
    };

    const originalGetName = BroProPlayer.getName;
    BroProPlayer.getName = function () {
        if (FirebaseAuth.currentUser) {
            return FirebaseAuth.getUserName();
        }
        return originalGetName.call(this);
    };
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    FirebaseAuth.init();
});

// Export for global access
window.FirebaseAuth = FirebaseAuth;
window.handleGoogleSignIn = handleGoogleSignIn;

// Also export auth methods for direct access
window.handleEmailSignIn = async function (email, password) {
    return await FirebaseAuth.signInWithEmail(email, password);
};

window.handleEmailSignUp = async function (name, email, password) {
    return await FirebaseAuth.signUpWithEmail(name, email, password);
};
