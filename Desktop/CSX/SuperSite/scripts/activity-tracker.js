// ============================================
// 🕐 BROPRO ACTIVITY TRACKER
// Optimized "Session-Based" Time Tracking System
// Cost: Near-Zero (Piggybacks on existing saves)
// ============================================

const BroProActivityTracker = {
    // Configuration
    IDLE_TIMEOUT: 120000, // 2 minutes of inactivity = idle
    STORAGE_KEY: 'bropro-activity-session',
    DATE_KEY: 'bropro-activity-date',

    // State
    isTracking: false,
    isIdle: false,
    isVisible: true,
    sessionSeconds: 0,
    lastActivity: Date.now(),
    tickInterval: null,
    idleCheckInterval: null,

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        console.log('⏱️ Activity Tracker: Initializing...');

        // Try multiple ways to detect logged-in user
        const isLoggedIn = this.checkLoginStatus();

        if (isLoggedIn) {
            console.log('⏱️ User is logged in. Starting tracker immediately.');
            this.startTracking();
            return;
        }

        console.log('⏱️ Activity Tracker: Waiting for login...');

        // Listen for auth state changes
        if (window.firebase && firebase.auth) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log('⏱️ Auth state changed: User logged in');
                    this.startTracking();
                } else {
                    console.log('⏱️ Auth state changed: User logged out');
                    this.stopTracking();
                }
            });
        }

        // Also check BroProPlayer as fallback
        if (window.BroProPlayer && BroProPlayer.isLoggedIn && BroProPlayer.isLoggedIn()) {
            console.log('⏱️ BroProPlayer detected user. Starting tracker.');
            this.startTracking();
        }
    },

    // Check if user is logged in using multiple methods
    checkLoginStatus() {
        // Method 1: FirebaseAuth global
        if (window.FirebaseAuth && FirebaseAuth.currentUser) {
            return true;
        }

        // Method 2: firebase.auth() directly
        if (window.firebase && firebase.auth) {
            const user = firebase.auth().currentUser;
            if (user) return true;
        }

        // Method 3: BroProPlayer
        if (window.BroProPlayer && typeof BroProPlayer.isLoggedIn === 'function') {
            return BroProPlayer.isLoggedIn();
        }

        // Method 4: Check localStorage for profile
        const profile = localStorage.getItem('bropro-profile');
        if (profile) {
            try {
                const parsed = JSON.parse(profile);
                if (parsed.uid || parsed.email) return true;
            } catch (e) { }
        }

        return false;
    },

    startTracking() {
        if (this.isTracking) return;

        console.log('⏱️ Activity Tracker: Starting...');
        this.isTracking = true;

        // Check if it's a new day - reset if so
        this.checkDateReset();

        // Load any previously saved session time
        this.loadSession();

        // Start the tick counter (every second)
        this.tickInterval = setInterval(() => this.tick(), 1000);

        // Check for idle state every 10 seconds
        this.idleCheckInterval = setInterval(() => this.checkIdle(), 10000);

        // Listen for visibility changes (tab switch)
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());

        // Listen for user activity (reset idle timer)
        ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => this.recordActivity(), { passive: true });
        });

        // Save on page unload (critical for accuracy)
        window.addEventListener('beforeunload', () => this.saveSession(true));

        // Also save when page becomes hidden (mobile browsers)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.saveSession(false);
            }
        });

        console.log('⏱️ Activity Tracker: Running! Session time:', this.formatTime(this.sessionSeconds));
    },

    stopTracking() {
        if (!this.isTracking) return;

        console.log('⏱️ Activity Tracker: Stopping...');
        this.isTracking = false;

        // Save final session
        this.saveSession(true);

        // Clear intervals
        if (this.tickInterval) clearInterval(this.tickInterval);
        if (this.idleCheckInterval) clearInterval(this.idleCheckInterval);
    },

    // ============================================
    // CORE TRACKING LOGIC
    // ============================================
    tick() {
        // Only count time if:
        // 1. User is logged in
        // 2. Tab is visible
        // 3. User is not idle
        if (!this.isTracking || !this.isVisible || this.isIdle) {
            return;
        }

        this.sessionSeconds++;

        // Save to localStorage every 30 seconds (local = free)
        if (this.sessionSeconds % 30 === 0) {
            this.saveToLocalStorage();
        }
    },

    checkIdle() {
        const timeSinceActivity = Date.now() - this.lastActivity;
        const wasIdle = this.isIdle;
        this.isIdle = timeSinceActivity > this.IDLE_TIMEOUT;

        // If just became idle, save the session
        if (this.isIdle && !wasIdle) {
            console.log('⏱️ User went idle. Pausing tracker.');
            this.saveSession(false);
        }

        // If just returned from idle, log it
        if (!this.isIdle && wasIdle) {
            console.log('⏱️ User returned! Resuming tracker.');
        }
    },

    recordActivity() {
        this.lastActivity = Date.now();
        if (this.isIdle) {
            this.isIdle = false;
        }
    },

    handleVisibilityChange() {
        this.isVisible = !document.hidden;

        if (document.hidden) {
            console.log('⏱️ Tab hidden. Pausing tracker.');
        } else {
            console.log('⏱️ Tab visible. Resuming tracker.');
            this.recordActivity(); // Reset idle timer when returning
        }
    },

    // ============================================
    // DATE HANDLING
    // ============================================
    getTodayKey() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    },

    checkDateReset() {
        const savedDate = localStorage.getItem(this.DATE_KEY);
        const today = this.getTodayKey();

        if (savedDate !== today) {
            console.log('⏱️ New day detected! Resetting session counter.');
            this.sessionSeconds = 0;
            localStorage.setItem(this.DATE_KEY, today);
            localStorage.removeItem(this.STORAGE_KEY);
        }
    },

    // ============================================
    // LOCAL STORAGE (FREE)
    // ============================================
    saveToLocalStorage() {
        localStorage.setItem(this.STORAGE_KEY, String(this.sessionSeconds));
    },

    loadSession() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            this.sessionSeconds = parseInt(saved, 10) || 0;
            console.log('⏱️ Loaded previous session:', this.formatTime(this.sessionSeconds));
        }
    },

    // ============================================
    // FIREBASE SYNC (OPTIMIZED)
    // ============================================
    async saveSession(isFinal = false) {
        if (!window.firebase || !firebase.firestore) {
            console.log('⏱️ Firebase not available for saving');
            return;
        }

        // Try multiple methods to get user ID
        let uid = null;

        // Method 1: FirebaseAuth global
        if (window.FirebaseAuth && FirebaseAuth.currentUser) {
            uid = FirebaseAuth.currentUser.uid;
        }

        // Method 2: firebase.auth() directly
        if (!uid && window.firebase && firebase.auth) {
            const user = firebase.auth().currentUser;
            if (user) uid = user.uid;
        }

        // Method 3: BroProPlayer
        if (!uid && window.BroProPlayer) {
            const profile = BroProPlayer.load();
            if (profile && profile.uid) uid = profile.uid;
        }

        // Method 4: localStorage
        if (!uid) {
            const profile = localStorage.getItem('bropro-profile');
            if (profile) {
                try {
                    const parsed = JSON.parse(profile);
                    if (parsed.uid) uid = parsed.uid;
                } catch (e) { }
            }
        }

        if (!uid) {
            console.log('⏱️ No user ID found - cannot save to Firebase');
            return;
        }

        if (this.sessionSeconds < 5) return; // Don't save tiny sessions (lowered from 10)

        // Save to localStorage first
        this.saveToLocalStorage();

        const today = this.getTodayKey();

        try {
            const db = firebase.firestore();
            const docRef = db.collection('users').doc(uid).collection('daily_stats').doc(today);

            // Use set with merge to create or update
            await docRef.set({
                activeSeconds: this.sessionSeconds,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                date: today
            }, { merge: true });

            if (isFinal) {
                console.log('⏱️ Final session saved:', this.formatTime(this.sessionSeconds));
            } else {
                console.log('⏱️ Session synced:', this.formatTime(this.sessionSeconds));
            }
        } catch (error) {
            console.error('⏱️ Failed to save session:', error);
        }
    },

    // Piggyback method - call this from quiz completion to save for FREE
    piggybackSave() {
        this.saveToLocalStorage();
        this.saveSession(false);
    },

    // ============================================
    // ADMIN: FETCH USER STATS
    // ============================================
    async getUserStats(userId) {
        if (!window.firebase || !firebase.firestore) return null;

        try {
            const db = firebase.firestore();
            const today = this.getTodayKey();

            // Get today's stats
            const todayDoc = await db.collection('users').doc(userId).collection('daily_stats').doc(today).get();
            const todayData = todayDoc.exists ? todayDoc.data() : { activeSeconds: 0 };

            // Get last 7 days
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);

            const historySnapshot = await db.collection('users').doc(userId)
                .collection('daily_stats')
                .orderBy('date', 'desc')
                .limit(7)
                .get();

            const history = [];
            historySnapshot.forEach(doc => {
                history.push(doc.data());
            });

            return {
                today: todayData.activeSeconds || 0,
                history: history
            };
        } catch (error) {
            console.error('⏱️ Failed to fetch user stats:', error);
            return null;
        }
    },

    // ============================================
    // UTILITIES
    // ============================================
    formatTime(seconds) {
        if (seconds < 60) return `${seconds}s`;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (mins < 60) return `${mins}m ${secs}s`;
        const hours = Math.floor(mins / 60);
        const remainingMins = mins % 60;
        return `${hours}h ${remainingMins}m`;
    },

    formatTimeShort(seconds) {
        if (seconds < 60) return `${seconds}s`;
        const mins = Math.floor(seconds / 60);
        if (mins < 60) return `${mins} min`;
        const hours = Math.floor(mins / 60);
        const remainingMins = mins % 60;
        if (remainingMins === 0) return `${hours}h`;
        return `${hours}h ${remainingMins}m`;
    },

    // Get current session time (for display)
    getCurrentTime() {
        return this.sessionSeconds;
    },

    getCurrentTimeFormatted() {
        return this.formatTime(this.sessionSeconds);
    }
};

// ============================================
// ADMIN: TIME STATS MODAL
// ============================================
const BroProTimeStats = {
    async showUserTimeStats(userId, userName) {
        // Show loading modal
        this.showModal(userName, true);

        // Fetch stats
        const stats = await BroProActivityTracker.getUserStats(userId);

        if (!stats) {
            this.showModal(userName, false, { today: 0, history: [] });
            return;
        }

        this.showModal(userName, false, stats);
    },

    showModal(userName, isLoading = false, stats = null) {
        // Remove existing modal
        const existing = document.getElementById('timeStatsModal');
        if (existing) existing.remove();

        const todayFormatted = stats ? BroProActivityTracker.formatTimeShort(stats.today) : '0m';

        // Build chart bars for last 7 days
        let chartHTML = '';
        if (stats && stats.history.length > 0) {
            const maxSeconds = Math.max(...stats.history.map(h => h.activeSeconds || 0), 1);

            // Reverse to show oldest first (left to right)
            const sortedHistory = [...stats.history].reverse();

            chartHTML = sortedHistory.map(day => {
                const seconds = day.activeSeconds || 0;
                const percentage = Math.min((seconds / maxSeconds) * 100, 100);
                const dayName = this.getDayName(day.date);
                const timeLabel = BroProActivityTracker.formatTimeShort(seconds);

                return `
                    <div class="time-chart-bar-container">
                        <div class="time-chart-bar" style="height: ${Math.max(percentage, 5)}%;">
                            <span class="time-chart-value">${timeLabel}</span>
                        </div>
                        <span class="time-chart-label">${dayName}</span>
                    </div>
                `;
            }).join('');
        } else {
            chartHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No activity data yet</p>';
        }

        // Calculate weekly total
        const weeklyTotal = stats ? stats.history.reduce((sum, day) => sum + (day.activeSeconds || 0), 0) : 0;
        const weeklyFormatted = BroProActivityTracker.formatTimeShort(weeklyTotal);

        const modalHTML = `
            <div class="time-stats-overlay" id="timeStatsModal" onclick="if(event.target === this) BroProTimeStats.closeModal()">
                <div class="time-stats-container">
                    <button class="time-stats-close" onclick="BroProTimeStats.closeModal()">✕</button>
                    
                    <div class="time-stats-header">
                        <div class="time-stats-icon">⏱️</div>
                        <h2 class="time-stats-title">Activity Report</h2>
                        <p class="time-stats-subtitle">${userName}</p>
                    </div>
                    
                    ${isLoading ? `
                        <div class="time-stats-loading">
                            <div class="time-stats-spinner"></div>
                            <p>Loading activity data...</p>
                        </div>
                    ` : `
                        <div class="time-stats-today">
                            <div class="today-card">
                                <span class="today-label">Today's Active Time</span>
                                <span class="today-value">${todayFormatted}</span>
                            </div>
                            <div class="today-card weekly">
                                <span class="today-label">This Week</span>
                                <span class="today-value">${weeklyFormatted}</span>
                            </div>
                        </div>
                        
                        <div class="time-stats-chart-section">
                            <h3 class="chart-title">📊 Last 7 Days</h3>
                            <div class="time-chart">
                                ${chartHTML}
                            </div>
                        </div>
                    `}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Animate in
        requestAnimationFrame(() => {
            const modal = document.getElementById('timeStatsModal');
            if (modal) modal.classList.add('active');
        });
    },

    closeModal() {
        const modal = document.getElementById('timeStatsModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },

    getDayName(dateStr) {
        if (!dateStr) return '?';
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (dateStr === BroProActivityTracker.getTodayKey()) return 'Today';
        if (date.toDateString() === yesterday.toDateString()) return 'Yest';

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date.getDay()];
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => BroProActivityTracker.init(), 1000);
    });
} else {
    setTimeout(() => BroProActivityTracker.init(), 1000);
}

// Make it globally available
window.BroProActivityTracker = BroProActivityTracker;
window.BroProTimeStats = BroProTimeStats;

console.log('⏱️ BroPro Activity Tracker loaded');
