/* ============================================
   BROPRO - RECENT ACTIVITY TICKER
   Real-time Activity Feed System
   No fake data - 100% real user activities
   ============================================ */

const BroProActivityTicker = {
    db: null,
    activities: [],
    isInitialized: false,
    unsubscribe: null,
    ADMIN_EMAIL: 'mohdekhlaqkhan@gmail.com',
    MAX_ACTIVITIES: 50,  // Max activities to keep in Firestore
    ACTIVITY_TTL: 24 * 60 * 60 * 1000, // 24 hours in milliseconds

    // Activity types
    ACTIVITY_TYPES: {
        QUIZ_COMPLETE: 'quiz_complete',
        LEVEL_UP: 'level_up',
        XP_EARNED: 'xp_earned',
        ACHIEVEMENT: 'achievement',
        STREAK: 'streak',
        LOGIN: 'login'
    },

    // Subject display names
    subjectNames: {
        math: 'Math 📐',
        mathematics: 'Math 📐',
        english: 'English 📖',
        gk: 'GK 🧠',
        hindi: 'Hindi 🇮🇳',
        science: 'Science 🔬',
        geography: 'Geography 🌍',
        history: 'History 📜',
        global: 'BroPro'
    },

    // Initialize the ticker
    init() {
        if (this.isInitialized) return;

        if (typeof firebase !== 'undefined' && firebase.firestore) {
            this.db = firebase.firestore();
            this.startRealtimeListener();
            this.isInitialized = true;
            console.log('📢 Activity Ticker Initialized (Real-time Mode)');
        } else {
            console.warn('⚠️ Firebase not available - Activity Ticker disabled');
            this.showEmptyState();
        }
    },

    // Start "Eco-Mode" Listener (Fetch Once)
    // SAVES QUOTA: Replaces expensive onSnapshot with single get()
    async startRealtimeListener() {
        if (!this.db) return;

        try {
            const snapshot = await this.db
                .collection('activities')
                .orderBy('timestamp', 'desc')
                .limit(20) // Reduced limit for optimization
                .get();

            this.processSnapshot(snapshot);

            console.log('🌱 Activity Ticker: Eco-Mode Active (Static Fetch)');

        } catch (error) {
            console.error('Activity ticker error:', error);
            this.showEmptyState();
        }
    },

    // Process the snapshot data (shared logic)
    processSnapshot(snapshot) {
        const newActivities = [];
        const now = Date.now();

        snapshot.forEach(doc => {
            const data = doc.data();
            const timestamp = data.timestamp?.toDate?.() || new Date();
            const age = now - timestamp.getTime();

            // Only show activities from last 24 hours
            if (age <= this.ACTIVITY_TTL) {
                newActivities.push({
                    id: doc.id,
                    ...data,
                    timestamp: timestamp
                });
            }
        });

        // Sort by most recent
        newActivities.sort((a, b) => b.timestamp - a.timestamp);
        this.activities = newActivities;

        if (newActivities.length > 0) {
            this.renderTicker();
        } else {
            this.showEmptyState();
        }
    },

    // Sanitize display name (first name only for privacy)
    sanitizeName(name) {
        if (!name) return 'Student';
        const firstName = name.split(' ')[0];
        return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    },

    // Format relative time
    formatTimeAgo(date) {
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    },

    // Helper to render avatar (handles both emoji and image-based avatars)
    renderAvatar(avatar) {
        if (!avatar) return '🐼';

        // Check if this is an image-based avatar (premium avatars like 'bhai', 'shri-ram', or URLs)
        const imageAvatars = ['bhai', 'black-rock-bhain', 'shri-ram', 'krishna', 'ganesh', 'hanuman', 'bhagat-singh', 'buddha', 'guru-nanak', 'vivekananda', 'ambedkar', 'gandhi', 'netaji'];

        // Check if it's a known premium avatar name
        if (imageAvatars.includes(avatar.toLowerCase())) {
            // Try the avatars folder first with -avatar suffix
            return `<img src="/assets/avatars/${avatar.toLowerCase()}-avatar.png" alt="${avatar}" class="ticker-avatar-img" onerror="this.onerror=null; this.src='/assets/${avatar.toLowerCase()}-avatar.png'; this.onerror=function(){this.parentElement.innerHTML='🐼';}">`;
        }

        // Check if it's a URL (starts with http or /)
        if (avatar.startsWith('http') || avatar.startsWith('/assets/')) {
            return `<img src="${avatar}" alt="avatar" class="ticker-avatar-img" onerror="this.parentElement.innerHTML='🐼'">`;
        }

        // Otherwise, it's an emoji - return as-is
        return avatar;
    },

    // Generate activity display text
    generateActivityText(activity) {
        const subject = activity.subject ? (this.subjectNames[activity.subject.toLowerCase()] || activity.subject) : '';

        switch (activity.type) {
            case this.ACTIVITY_TYPES.QUIZ_COMPLETE:
                if (activity.accuracy >= 90) {
                    return `aced a ${subject} quiz with ${activity.accuracy}%! 🏆`;
                } else if (activity.accuracy >= 70) {
                    return `completed a ${subject} quiz with ${activity.accuracy}% 🎯`;
                } else {
                    return `practiced ${subject} 📚`;
                }

            case this.ACTIVITY_TYPES.LEVEL_UP:
                return `reached Level ${activity.level}! 🚀`;

            case this.ACTIVITY_TYPES.XP_EARNED:
                if (subject) {
                    return `earned ${activity.xp} XP in ${subject} ⚡`;
                }
                return `earned ${activity.xp} XP! ⚡`;

            case this.ACTIVITY_TYPES.ACHIEVEMENT:
                return activity.message || 'unlocked an achievement! 🏅';

            case this.ACTIVITY_TYPES.STREAK:
                return `is on a ${activity.level}-day streak! 🔥`;

            case this.ACTIVITY_TYPES.LOGIN:
                return 'joined BroPro! 👋';

            default:
                return activity.message || 'is learning 📖';
        }
    },

    // Render the ticker
    renderTicker() {
        const track = document.getElementById('tickerTrack');
        if (!track) return;

        if (this.activities.length === 0) {
            this.showEmptyState();
            return;
        }

        // Create activity items
        // Only duplicate for seamless loop if we have enough activities
        let html = '';
        let items;
        if (this.activities.length >= 5) {
            items = [...this.activities, ...this.activities]; // Duplicate for seamless scrolling
        } else {
            items = this.activities; // Don't duplicate if too few
        }

        items.forEach((activity, index) => {
            const actionText = this.generateActivityText(activity);
            const timeAgo = this.formatTimeAgo(activity.timestamp);

            html += `
                <div class="ticker-item" data-activity-id="${activity.id}-${index}">
                    <div class="ticker-avatar">${this.renderAvatar(activity.userAvatar)}</div>
                    <div class="ticker-content">
                        <span class="ticker-name">
                            ${this.escapeHtml(activity.userName)}
                            ${activity.level >= 10 ? '<span class="ticker-level">⭐' + activity.level + '</span>' : ''}
                        </span>
                        <span class="ticker-action">${actionText}</span>
                    </div>
                    ${activity.xp ? `<span class="ticker-xp">+${activity.xp} XP</span>` : ''}
                    <span class="ticker-time">${timeAgo}</span>
                </div>
            `;
        });

        track.innerHTML = html;

        // Adjust animation speed based on number of items
        const baseSpeed = 30;
        const itemCount = items.length;
        const adjustedSpeed = Math.max(25, baseSpeed * (itemCount / 10));
        track.style.animationDuration = `${adjustedSpeed}s`;
    },

    // Show empty state when no activities
    showEmptyState() {
        const track = document.getElementById('tickerTrack');
        if (!track) return;

        track.innerHTML = `
            <div class="ticker-item ticker-empty">
                <div class="ticker-avatar">🎓</div>
                <div class="ticker-content">
                    <span class="ticker-action">Start learning to see real-time activity!</span>
                </div>
            </div>
            <div class="ticker-item ticker-empty">
                <div class="ticker-avatar">🚀</div>
                <div class="ticker-content">
                    <span class="ticker-action">Complete quizzes to appear here!</span>
                </div>
            </div>
            <div class="ticker-item ticker-empty">
                <div class="ticker-avatar">🔥</div>
                <div class="ticker-content">
                    <span class="ticker-action">Be the first to show your progress!</span>
                </div>
            </div>
        `;

        track.style.animationDuration = '20s';
    },

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    },

    // Cleanup
    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
        this.isInitialized = false;
    }
};

// ============================================
// STANDALONE ACTIVITY LOGGER
// Works on ANY page (not just main page)
// Uses Firebase directly without needing ticker
// ============================================
const BroProActivityLogger = {
    ADMIN_EMAIL: 'mohdekhlaqkhan@gmail.com',

    // Activity types
    ACTIVITY_TYPES: {
        QUIZ_COMPLETE: 'quiz_complete',
        LEVEL_UP: 'level_up',
        XP_EARNED: 'xp_earned',
        ACHIEVEMENT: 'achievement',
        STREAK: 'streak',
        LOGIN: 'login'
    },

    // Sanitize name
    sanitizeName(name) {
        if (!name) return 'Student';
        const firstName = name.split(' ')[0];
        return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    },

    // Log activity directly to Firebase
    async logActivity(type, data) {
        // Check if Firebase is available
        if (typeof firebase === 'undefined' || !firebase.firestore) {
            console.warn('Cannot log activity - Firebase not available');
            return false;
        }

        const db = firebase.firestore();

        // Get current user info
        const profile = window.BroProPlayer?.load() || {};
        const user = firebase.auth()?.currentUser;

        if (!user && !profile.name) {
            console.log('Skipping activity log - user not identified');
            return false;
        }

        // Skip admin activities
        if (user?.email === this.ADMIN_EMAIL) {
            console.log('Skipping admin activity log');
            return false;
        }

        const activity = {
            type: type,
            userName: this.sanitizeName(profile.displayName || profile.name || user?.displayName || 'Student'),
            userAvatar: profile.avatar || '🐼',
            userId: user?.uid || profile.id || 'anonymous',
            subject: data.subject || null,
            xp: data.xp || null,
            level: data.level || null,
            accuracy: data.accuracy || null,
            message: data.message || null,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            await db.collection('activities').add(activity);
            console.log('📢 Activity logged successfully:', type, data);
            return true;
        } catch (error) {
            console.error('Failed to log activity:', error);
            return false;
        }
    }
};

// ============================================
// GLOBAL HELPER FUNCTIONS
// Call these from any page to log activities
// ============================================

// Log quiz completion
window.logQuizActivity = function (subject, xp, accuracy) {
    console.log('📝 logQuizActivity called:', { subject, xp, accuracy });
    BroProActivityLogger.logActivity(
        BroProActivityLogger.ACTIVITY_TYPES.QUIZ_COMPLETE,
        { subject, xp, accuracy }
    );

    // Track quizzesToday AND totalQuizzes in presence for admin dashboard
    try {
        const user = firebase.auth().currentUser;
        if (user && firebase.firestore) {
            const db = firebase.firestore();
            const today = new Date().toDateString();

            db.collection('presence').doc(user.uid).get().then(doc => {
                const data = doc.data() || {};
                const lastQuizDate = data.lastQuizDate || '';
                let quizzesToday = data.quizzesToday || 0;
                let totalQuizzes = data.totalQuizzes || 0;

                // Reset daily count if it's a new day
                if (lastQuizDate !== today) {
                    quizzesToday = 0;
                }

                db.collection('presence').doc(user.uid).update({
                    quizzesToday: quizzesToday + 1,
                    totalQuizzes: totalQuizzes + 1,  // Lifetime total
                    lastQuizDate: today,
                    lastSubject: subject
                }).then(() => {
                    console.log('✅ Quiz tracking updated: today=' + (quizzesToday + 1) + ', total=' + (totalQuizzes + 1));
                }).catch(e => console.log('Quiz tracking error:', e.message));
            });
        }
    } catch (e) {
        console.log('Quiz tracking skipped:', e.message);
    }
};

// Log level up
window.logLevelUpActivity = function (newLevel) {
    console.log('📝 logLevelUpActivity called:', newLevel);
    BroProActivityLogger.logActivity(
        BroProActivityLogger.ACTIVITY_TYPES.LEVEL_UP,
        { level: newLevel }
    );
};

// Log XP earned
window.logXPActivity = function (xp, subject = null) {
    BroProActivityLogger.logActivity(
        BroProActivityLogger.ACTIVITY_TYPES.XP_EARNED,
        { xp, subject }
    );
};

// Log achievement
window.logAchievementActivity = function (message) {
    BroProActivityLogger.logActivity(
        BroProActivityLogger.ACTIVITY_TYPES.ACHIEVEMENT,
        { message }
    );
};

// Log streak
window.logStreakActivity = function (streakDays) {
    BroProActivityLogger.logActivity(
        BroProActivityLogger.ACTIVITY_TYPES.STREAK,
        { level: streakDays }
    );
};

// Auto-initialize ticker when DOM is ready (only on pages with ticker element)
document.addEventListener('DOMContentLoaded', () => {
    // Delay initialization to ensure Firebase is loaded
    setTimeout(() => {
        // Only init ticker if on a page with the ticker element
        if (document.getElementById('tickerTrack')) {
            BroProActivityTicker.init();
        }
    }, 1500);
});

// Export for global access
window.BroProActivityTicker = BroProActivityTicker;
window.BroProActivityLogger = BroProActivityLogger;
