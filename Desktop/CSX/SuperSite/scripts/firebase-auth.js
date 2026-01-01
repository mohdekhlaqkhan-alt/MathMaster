/* ============================================
   BROPRO - FIREBASE AUTHENTICATION
   Google Sign-In + Email/Password Authentication
   ============================================ */

// Firebase Configuration
// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCK7HfVBcg4otmuuODgijhlsLan-At5vb0",
    authDomain: "supersite-2dcf9.firebaseapp.com",
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

// Force Google to show account chooser every time
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// ============================================
// FIREBASE AUTH MANAGER
// ============================================
const FirebaseAuth = {
    currentUser: null,
    db: db,
    isLoggingOut: false, // Flag to prevent auto-login during logout
    userInitiatedLogin: false, // Flag to track user-initiated login
    forceLogoutListener: null, // Listener for admin deletion

    // Initialize auth state listener
    init() {
        // Start listening to leaderboard immediately (for read access)
        this.startLeaderboardListener();

        // Check and clear logout flag on page load
        // This only affects AUTO-login, not user-initiated login
        const wasLoggedOut = sessionStorage.getItem('supersite-logged-out') === 'true';
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
                    sessionStorage.removeItem('supersite-logged-out');
                    auth.signOut();
                    return;
                }

                // Clear any lingering logout flag
                sessionStorage.removeItem('supersite-logged-out');

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

        // Handle redirect result (for Safari/mobile Google sign-in)
        auth.getRedirectResult().then((result) => {
            if (result.user) {
                console.log('Redirect sign-in successful:', result.user.displayName);
                // Close any auth modals
                const authModal = document.getElementById('authModal');
                if (authModal) authModal.classList.remove('active');
            }
        }).catch((error) => {
            console.error('Redirect sign-in error:', error);
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
        sessionStorage.setItem('supersite-logged-out', 'true');
        this.isLoggingOut = true;

        // Sign out from Firebase
        try {
            await auth.signOut();
            console.log('🔐 Force logout complete - ALL data cleared');
        } catch (e) {
            console.error('Force logout error:', e);
        }
    },

    // Sign in with Google
    async signInWithGoogle() {
        // Mark this as user-initiated login (not auto-login)
        this.userInitiatedLogin = true;

        // Clear any logout flag so login works immediately
        sessionStorage.removeItem('supersite-logged-out');

        try {
            const result = await auth.signInWithPopup(googleProvider);
            const user = result.user;
            console.log('Google Sign-In successful:', user.displayName);
            return { success: true, user };
        } catch (error) {
            console.error('Google Sign-In error:', error);
            // Reset the flag on error
            this.userInitiatedLogin = false;

            // Handle popup closed by user
            if (error.code === 'auth/popup-closed-by-user') {
                return { success: false, error: 'Sign-in cancelled' };
            }
            return { success: false, error: error.message };
        }
    },

    // Sign up with Email/Password (Firebase Authentication)
    async signUpWithEmail(name, email, password) {
        // Mark this as user-initiated login (not auto-login)
        this.userInitiatedLogin = true;

        // Clear any logout flag so login works immediately
        sessionStorage.removeItem('supersite-logged-out');

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

            // Handle specific Firebase Auth errors with user-friendly messages
            let errorMessage = 'Sign-up failed. Please try again.';

            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'This email is already registered. Please login instead.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Please enter a valid email address.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password should be at least 6 characters long.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Email/password sign-up is not enabled. Please contact support.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Please check your internet connection.';
                    break;
                default:
                    errorMessage = error.message || 'Sign-up failed. Please try again.';
            }

            return { success: false, error: errorMessage };
        }
    },

    // Sign in with Email/Password (Firebase Authentication)
    async signInWithEmail(email, password) {
        // Mark this as user-initiated login (not auto-login)
        this.userInitiatedLogin = true;

        // Clear any logout flag so login works immediately
        sessionStorage.removeItem('supersite-logged-out');

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

            // Handle specific Firebase Auth errors with user-friendly messages
            let errorMessage = 'Login failed. Please try again.';

            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email. Please sign up first.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password. Please try again.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Please enter a valid email address.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This account has been disabled. Please contact support.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many failed attempts. Please try again later.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Please check your internet connection.';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Invalid email or password. Please check and try again.';
                    break;
                default:
                    errorMessage = error.message || 'Login failed. Please try again.';
            }

            return { success: false, error: errorMessage };
        }
    },

    // Sign out
    async signOut() {
        try {
            await auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    },

    // Handle successful login
    async onLoginSuccess(user) {
        console.log('🔐 Login successful for:', user.displayName || user.email);

        // Wrap everything in try-catch to ensure login always succeeds
        try {
            // Start with fresh values - Firebase is the ONLY source of truth
            let restoredXP = 0;
            let restoredLevel = 1;
            let restoredCoins = 0;
            let restoredSubjectProgress = {};
            let restoredAvatar = '🐼';
            let restoredName = user.displayName || 'Player'; // Default to Google name
            let restoredNameChanged = false; // Track if name was previously changed
            let restoredWalletSpent = 0; // Track premium purchases
            let restoredWalletAdded = 0; // Track wallet top-ups
            let restoredOwnedPremiumAvatars = []; // Track owned premium avatars
            let restoredAchievements = []; // Track unlocked achievements
            let hasFirebaseData = false;

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

                // ALSO check users collection for wallet data (most reliable source after payment)
                try {
                    const usersDoc = await this.db.collection('users').doc(user.uid).get();
                    if (usersDoc.exists) {
                        const userData = usersDoc.data();
                        if (userData.walletAdded && userData.walletAdded > restoredWalletAdded) {
                            restoredWalletAdded = userData.walletAdded;
                            console.log('💰 Got latest walletAdded from users collection:', restoredWalletAdded);
                        }
                        if (userData.walletSpent && userData.walletSpent > restoredWalletSpent) {
                            restoredWalletSpent = userData.walletSpent;
                            console.log('💰 Got latest walletSpent from users collection:', restoredWalletSpent);
                        }
                    }
                } catch (e) {
                    console.log('Users collection check skipped:', e.message);
                }

                // Calculate level from XP
                if (restoredXP > 0) {
                    restoredLevel = Math.floor(restoredXP / 100) + 1;
                }

                if (!hasFirebaseData) {
                    console.log('🆕 No Firebase data found - starting fresh');
                }

            } catch (firebaseError) {
                console.warn('Firebase restore skipped:', firebaseError.message);
                // Continue with default values - login should still work
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

            console.log('✅ Login complete!');

        } catch (error) {
            console.error('❌ Login error:', error);

            // Fallback - create minimal profile so login still works
            // BUT PRESERVE PREMIUM DATA!
            let existingPremium = {};
            try {
                const existing = JSON.parse(localStorage.getItem('supersite-player-profile') || '{}');
                existingPremium = {
                    premium: existing.premium || false,
                    premiumExpiry: existing.premiumExpiry,
                    premiumGrantedAt: existing.premiumGrantedAt,
                    premiumPromoCode: existing.premiumPromoCode,
                    usedPromoCodes: existing.usedPromoCodes || []
                };
            } catch (e) { }

            const fallbackProfile = {
                name: user.displayName || 'Player',
                email: user.email,
                avatar: '🐼',
                xp: 0,
                level: 1,
                coins: 0,
                firebaseUid: user.uid,
                ...existingPremium // Preserve premium data!
            };

            localStorage.setItem('supersite-player-profile', JSON.stringify(fallbackProfile));
            localStorage.setItem('supersite-current-user', user.uid);

            // Still update UI
            this.updateAuthUI();
            this.removeLockBadges();

            console.log('⚠️ Login completed with fallback profile (premium preserved)');
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

    // Listen for realtime leaderboard updates
    startLeaderboardListener() {
        if (!this.db) return;

        console.log('Starting Cloud Leaderboard Listener...');
        window.BroProLeaderboardData = []; // Initialize global store

        this.db.collection('leaderboard')
            .orderBy('xp', 'desc')
            .limit(50)
            .onSnapshot((snapshot) => {
                const cloudLeaderboard = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    // Ensure robust data structure
                    if (data.name && typeof data.xp === 'number') {
                        cloudLeaderboard.push(data);
                    }
                });

                // 1. UPDATE GLOBAL STORE
                window.BroProLeaderboardData = cloudLeaderboard;

                // 2. BACKUP TO LOCAL STORAGE
                localStorage.setItem('supersite-cloud-leaderboard', JSON.stringify(cloudLeaderboard));

                console.log('🔥 CLOUD UPDATE:', cloudLeaderboard.length, 'players synced.');

                // 3. FORCE UI RENDER IF MODAL IS OPEN
                const globalModal = document.getElementById('globalLeaderboardModal');
                if (globalModal && globalModal.classList.contains('active')) {
                    if (typeof renderGlobalLeaderboard === 'function') {
                        renderGlobalLeaderboard();
                    }
                }
            }, (error) => {
                console.error('❌ FIREBASE LISTENER ERROR:', error);

                // Alert user if permission denied (Common Firestore Rules issue)
                if (error.code === 'permission-denied') {
                    console.warn('Authentication or Rules issue preventing leaderboard sync.');
                }
            });
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

        if (!authBtn) return;

        if (this.currentUser) {
            // Priority: Leaderboard name > Local profile > Google name
            let displayName = this.currentUser.displayName || 'User';

            // Try to get leaderboard name
            try {
                // First check local profile
                const localProfile = window.BroProPlayer?.load();
                if (localProfile && localProfile.name) {
                    displayName = localProfile.name;
                }

                // Then check Firestore leaderboard (overrides local if exists)
                const leaderboardDoc = await db.collection('leaderboard').doc(this.currentUser.uid).get();
                if (leaderboardDoc.exists) {
                    const userData = leaderboardDoc.data();
                    if (userData.name) {
                        displayName = userData.name;
                    }
                }
            } catch (e) {
                console.log('Could not fetch leaderboard name for navbar');
            }

            authBtnText.textContent = displayName.split(' ')[0];
            authBtn.classList.add('logged-in');
            authBtn.title = 'Click to logout';

            // Update navbar stats
            if (window.updateNavbarStats) {
                updateNavbarStats();
            }
        } else {
            authBtnText.textContent = 'Login';
            authBtn.classList.remove('logged-in');
            authBtn.title = 'Login or Sign up';
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
async function handleGoogleSignIn() {
    const errorEl = document.getElementById('loginError') || document.getElementById('signupError');

    // Show loading state
    const googleBtn = document.querySelector('.google-signin-btn');
    if (googleBtn) {
        googleBtn.disabled = true;
        googleBtn.innerHTML = '<span class="google-icon">⏳</span> Signing in...';
    }

    const result = await FirebaseAuth.signInWithGoogle();

    if (result.success) {
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

        // Reset button
        if (googleBtn) {
            googleBtn.disabled = false;
            googleBtn.innerHTML = '<span class="google-icon"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google"></span> Continue with Google';
        }
    }
}

// ============================================
// OVERRIDE EXISTING AUTH FUNCTIONS
// ============================================
// Override openAuthModal to handle logged-in state
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

