/* ============================================
   SUPERSITE - ADMIN SYSTEM
   Complete Admin Management & Messaging
   ============================================ */

const BroProAdmin = {
    ADMIN_EMAIL: 'mohdekhlaqkhan@gmail.com',
    ADMIN_PASSWORD: 'Math#F786',
    isAdmin: false,
    db: null,
    unsubscribeMessages: null,
    unsubscribeOnlineUsers: null,
    unsubscribeUnread: null, // For unread message listener
    onlineUsersData: [],
    inboxConversations: [],
    currentChatUserId: null,
    chatMode: 'real', // 'real' for Real Bhai, 'ai' for BhAI
    aiConversationHistory: [], // Store AI conversation context
    lastReadTimestamp: null, // Track when user last read messages
    schoolConfig: null, // Store school settings

    // ============================================
    // GUEST BHAI PREVIEW SYSTEM
    // ============================================
    GUEST_MAX_MESSAGES: 3, // Number of free messages for guests
    guestMessagesUsed: 0,  // Tracks messages used by guest
    isGuestMode: false,    // Whether user is in guest mode

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        // Wait for Firebase
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            this.db = firebase.firestore();
        }

        // Load guest messages count from localStorage
        this.loadGuestMessageCount();

        // Listen for auth changes
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.isGuestMode = false;
                this.checkAdminStatus(user);
                // Start listening for unread messages (for students)
                this.startUnreadMessageListener(user);
                // Load walletSpent from Firestore
                this.loadWalletFromFirestore(user);
                // Fix: Restore toggle bar if it was showing trial mode for a guest
                // This handles the case where user logs in while chat is open
                setTimeout(() => {
                    this.restoreLoggedInToggleBar();
                }, 500);
            } else {
                this.isAdmin = false;
                this.isGuestMode = true;
                this.hideAdminUI();
                this.stopUnreadMessageListener();
                this.stopPresenceSystem(); // Clean up heartbeat and refresh intervals
            }
        });

        // Initialize Talk to Admin for students
        this.initTalkToAdmin();

        // Load School Settings (for everyone, effectively)
        this.loadSchoolSettings();

        console.log('🔐 Admin System Initialized');
    },

    // Load guest message count from localStorage
    loadGuestMessageCount() {
        const stored = localStorage.getItem('bropro_guest_messages');
        if (stored) {
            const data = JSON.parse(stored);
            // Reset if it's been more than 24 hours (daily reset)
            const dayMs = 24 * 60 * 60 * 1000;
            if (data.timestamp && (Date.now() - data.timestamp) < dayMs) {
                this.guestMessagesUsed = data.count || 0;
            } else {
                this.guestMessagesUsed = 0;
                this.saveGuestMessageCount();
            }
        } else {
            this.guestMessagesUsed = 0;
        }
        console.log(`🎁 Guest messages used today: ${this.guestMessagesUsed}/${this.GUEST_MAX_MESSAGES}`);
    },

    // Save guest message count to localStorage
    saveGuestMessageCount() {
        localStorage.setItem('bropro_guest_messages', JSON.stringify({
            count: this.guestMessagesUsed,
            timestamp: Date.now()
        }));
    },

    // Get remaining guest messages
    getGuestMessagesRemaining() {
        return Math.max(0, this.GUEST_MAX_MESSAGES - this.guestMessagesUsed);
    },

    // Check if current user is admin
    checkAdminStatus(user) {
        this.isAdmin = user.email && user.email.toLowerCase() === this.ADMIN_EMAIL.toLowerCase();

        if (this.isAdmin) {
            console.log('👑 Admin detected! Loading admin dashboard...');
            this.showAdminUI();
            this.startOnlineUsersListener();
            this.startInboxListener();
            this.updateUserPresence(user, true);
        } else {
            this.hideAdminUI();
            this.updateUserPresence(user, true);
        }
    },

    // ============================================
    // USER PRESENCE SYSTEM (Heartbeat-based)
    // ============================================
    heartbeatInterval: null,
    currentUserRef: null,

    updateUserPresence(user, isOnline = true) {
        if (!this.db || !user) return;

        const presenceRef = this.db.collection('presence').doc(user.uid);
        this.currentUserRef = presenceRef;
        const profile = window.BroProPlayer?.load() || {};

        // Use Google photo URL if available, otherwise use profile avatar or default emoji
        const avatar = user.photoURL || profile.avatar || '🐼';

        // Detect device type
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const device = isMobile ? 'mobile' : 'desktop';

        // Detect login method from provider data
        let loginMethod = 'unknown';
        if (user.providerData && user.providerData.length > 0) {
            const providerId = user.providerData[0].providerId;
            if (providerId === 'google.com') {
                loginMethod = 'google';
            } else if (providerId === 'password') {
                loginMethod = 'email';
            }
        }

        const presenceData = {
            name: user.displayName || profile.name || 'Anonymous',
            email: user.email,
            avatar: avatar,
            photoURL: user.photoURL || null,
            isOnline: isOnline,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            xp: profile.xp || 0,
            level: profile.level || 1,
            walletSpent: profile.walletSpent || 0,
            device: device,
            loginMethod: loginMethod,
            isPremium: profile.isPremium || false
        };

        presenceRef.set(presenceData, { merge: true }).catch(e => {
            console.log('Presence update skipped:', e.message);
        });

        // Start heartbeat system for accurate presence tracking
        this.startHeartbeat(presenceRef);

        // Set offline on page unload (fallback)
        window.addEventListener('beforeunload', () => {
            // Use sendBeacon for more reliable offline update
            this.setOfflineStatus(presenceRef);
        });

        // Also handle visibility change for mobile/tab switching
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                // User switched tabs/minimized - still online but update lastSeen
                presenceRef.update({
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                }).catch(() => { });
            } else if (document.visibilityState === 'visible') {
                // User came back - refresh presence
                presenceRef.update({
                    isOnline: true,
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                }).catch(() => { });
            }
        });
    },

    // Heartbeat system - sends periodic updates to prove user is still online
    startHeartbeat(presenceRef) {
        // Clear any existing heartbeat
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }

        // Send heartbeat every 30 seconds
        this.heartbeatInterval = setInterval(() => {
            if (document.visibilityState !== 'hidden') {
                presenceRef.update({
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
                    isOnline: true
                }).catch(() => { });
            }
        }, 30000); // 30 seconds

        console.log('💓 Presence heartbeat started');
    },

    // Set user offline with multiple fallback methods
    setOfflineStatus(presenceRef) {
        try {
            // Method 1: Direct update (may not complete before page unloads)
            presenceRef.update({
                isOnline: false,
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(() => { });
        } catch (e) {
            console.log('Offline status update skipped');
        }
    },

    // Clean up presence system (called on logout)
    stopPresenceSystem() {
        // Stop heartbeat interval
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
            console.log('💔 Heartbeat stopped');
        }

        // Stop online users refresh interval
        if (this.onlineUsersRefreshInterval) {
            clearInterval(this.onlineUsersRefreshInterval);
            this.onlineUsersRefreshInterval = null;
        }

        // Set user offline if we have a reference
        if (this.currentUserRef) {
            this.currentUserRef.update({
                isOnline: false,
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(() => { });
            this.currentUserRef = null;
        }

        // Unsubscribe from online users listener
        if (this.unsubscribeOnlineUsers) {
            this.unsubscribeOnlineUsers();
            this.unsubscribeOnlineUsers = null;
        }

        console.log('🛑 Presence system stopped');
    },

    // Listen for online users (Admin only) - Uses heartbeat-based verification
    startOnlineUsersListener() {
        if (!this.db || !this.isAdmin) return;

        if (this.unsubscribeOnlineUsers) {
            this.unsubscribeOnlineUsers();
        }

        // Consider users online only if lastSeen within 2 minutes
        const ONLINE_THRESHOLD_MS = 2 * 60 * 1000; // 2 minutes

        this.unsubscribeOnlineUsers = this.db.collection('presence')
            .where('isOnline', '==', true)
            .onSnapshot((snapshot) => {
                const now = Date.now();
                this.onlineUsersData = [];
                const staleUsers = []; // Users to mark as offline

                snapshot.forEach(doc => {
                    const data = doc.data();

                    // Check if lastSeen is recent (within threshold)
                    let lastSeenTime = null;
                    if (data.lastSeen) {
                        // Handle Firestore Timestamp
                        lastSeenTime = data.lastSeen.toDate ? data.lastSeen.toDate().getTime() : data.lastSeen;
                    }

                    const timeSinceLastSeen = lastSeenTime ? (now - lastSeenTime) : Infinity;

                    if (timeSinceLastSeen <= ONLINE_THRESHOLD_MS) {
                        // User is genuinely online (heartbeat received within threshold)
                        this.onlineUsersData.push({
                            id: doc.id,
                            ...data,
                            lastSeenFormatted: this.formatLastSeen(timeSinceLastSeen)
                        });
                    } else if (timeSinceLastSeen > ONLINE_THRESHOLD_MS && data.isOnline) {
                        // User's heartbeat is stale - mark them as offline
                        staleUsers.push(doc.id);
                    }
                });

                // Mark stale users as offline (cleanup)
                staleUsers.forEach(userId => {
                    this.db.collection('presence').doc(userId).update({
                        isOnline: false
                    }).catch(() => { });
                });

                if (staleUsers.length > 0) {
                    console.log(`🧹 Marked ${staleUsers.length} stale users as offline`);
                }

                console.log(`👥 Online Users: ${this.onlineUsersData.length} (verified by heartbeat)`);
                this.renderOnlineUsers();
            }, (error) => {
                console.error('Online users listener error:', error);
            });

        // Also refresh the list periodically to catch any stale entries
        this.startOnlineUsersRefresh();
    },

    // Format how long ago user was seen
    formatLastSeen(ms) {
        const seconds = Math.floor(ms / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return 'Long ago';
    },

    // Periodic refresh to clean up stale online statuses
    onlineUsersRefreshInterval: null,

    startOnlineUsersRefresh() {
        if (this.onlineUsersRefreshInterval) {
            clearInterval(this.onlineUsersRefreshInterval);
        }

        // Refresh every 60 seconds to ensure accuracy
        this.onlineUsersRefreshInterval = setInterval(() => {
            // Re-filter the current data based on time
            const now = Date.now();
            const ONLINE_THRESHOLD_MS = 2 * 60 * 1000;

            this.onlineUsersData = this.onlineUsersData.filter(user => {
                let lastSeenTime = null;
                if (user.lastSeen) {
                    lastSeenTime = user.lastSeen.toDate ? user.lastSeen.toDate().getTime() : user.lastSeen;
                }
                const timeSinceLastSeen = lastSeenTime ? (now - lastSeenTime) : Infinity;
                return timeSinceLastSeen <= ONLINE_THRESHOLD_MS;
            });

            this.renderOnlineUsers();
            console.log(`🔄 Online users refresh: ${this.onlineUsersData.length} still online`);
        }, 60000); // Every 60 seconds
    },

    // ============================================
    // RECENTLY ACTIVE USERS SYSTEM
    // Premium feature showing offline users from last 30 days
    // ============================================
    recentlyActiveUsers: [],
    recentlyActiveCurrentPage: 1,
    recentlyActivePerPage: 10,
    recentlyActiveTimeFilter: '30d',

    // Load recently active users (offline within time range)
    async loadRecentlyActiveUsers() {
        if (!this.db || !this.isAdmin) return;

        const container = document.getElementById('recentlyActiveList');
        if (!container) return;

        // Show loading
        container.innerHTML = `
            <div class="empty-state">
                <div style="width: 40px; height: 40px; border: 3px solid rgba(251, 146, 60, 0.2); border-top-color: #fb923c; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto;"></div>
                <p style="margin-top: 1rem;">Loading recently active users...</p>
            </div>
        `;

        try {
            // Get time filter
            const filterSelect = document.getElementById('recentlyActiveTimeFilter');
            this.recentlyActiveTimeFilter = filterSelect ? filterSelect.value : '30d';

            // Calculate cutoff date
            const now = new Date();
            let cutoffDate = new Date();

            switch (this.recentlyActiveTimeFilter) {
                case '24h':
                    cutoffDate.setHours(cutoffDate.getHours() - 24);
                    break;
                case '7d':
                    cutoffDate.setDate(cutoffDate.getDate() - 7);
                    break;
                case '30d':
                default:
                    cutoffDate.setDate(cutoffDate.getDate() - 30);
                    break;
            }

            // Fetch users from presence who are offline but were active within range
            // Fetch users from presence who are offline but were active within range
            // OPTIMIZED: Added limit(100) to stop quota abuse (50k reads/day limit)
            const snapshot = await this.db.collection('presence')
                .where('lastSeen', '>=', cutoffDate)
                .orderBy('lastSeen', 'desc')
                .limit(100)
                .get();

            const onlineUserIds = new Set(this.onlineUsersData.map(u => u.id));
            const users = [];

            for (const doc of snapshot.docs) {
                const data = doc.data();
                const userId = doc.id;

                // Skip users who are currently online
                if (onlineUserIds.has(userId)) continue;

                // Skip admin
                if (data.email === this.ADMIN_EMAIL) continue;

                // OPTIMIZED: Use data directly from presence document
                // This saves 2 extra reads PER USER (100 users = 200 saved reads per load)
                // The presence document is already updated with this data by the ticker/app
                let userData = {
                    id: userId,
                    name: data.name || data.displayName || 'Student',
                    email: data.email || '',
                    avatar: data.avatar || '🐼',
                    xp: data.xp || 0,
                    level: data.level || 1,
                    lastSeen: data.lastSeen,
                    sessionDuration: data.sessionDuration || null,
                    device: data.device || 'Unknown',
                    loginMethod: data.loginMethod || 'Unknown',
                    isPremium: data.isPremium || false,
                    quizzesToday: data.quizzesToday || 0,
                    totalQuizzes: data.totalQuizzes || 0,
                    lastSubject: data.lastSubject || null
                };

                users.push(userData);
            }

            this.recentlyActiveUsers = users;
            this.recentlyActiveCurrentPage = 1;

            // Update count badge
            const countEl = document.getElementById('recentlyActiveCount');
            if (countEl) {
                countEl.textContent = `${users.length} user${users.length !== 1 ? 's' : ''}`;
            }

            this.renderRecentlyActiveUsers();

            console.log(`🕐 Loaded ${users.length} recently active users (${this.recentlyActiveTimeFilter})`);

        } catch (error) {
            console.error('Error loading recently active users:', error);
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">❌</span>
                    <p>Failed to load users</p>
                    <button onclick="BroProAdmin.loadRecentlyActiveUsers()" style="margin-top: 0.5rem; padding: 0.5rem 1rem; border: none; background: var(--primary); color: white; border-radius: 8px; cursor: pointer;">Retry</button>
                </div>
            `;
        }
    },

    // Filter handler
    filterRecentlyActive() {
        this.loadRecentlyActiveUsers();
    },

    // Render recently active users with pagination
    renderRecentlyActiveUsers() {
        const container = document.getElementById('recentlyActiveList');
        const paginationContainer = document.getElementById('recentlyActivePagination');
        if (!container) return;

        const users = this.recentlyActiveUsers;

        if (users.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">🌙</span>
                    <p>No recently active users in this time range</p>
                </div>
            `;
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        // Calculate pagination
        const totalPages = Math.ceil(users.length / this.recentlyActivePerPage);
        const startIndex = (this.recentlyActiveCurrentPage - 1) * this.recentlyActivePerPage;
        const endIndex = startIndex + this.recentlyActivePerPage;
        const pageUsers = users.slice(startIndex, endIndex);

        // Render users
        let html = '';
        pageUsers.forEach(user => {
            const lastSeenText = this.formatLastSeenFull(user.lastSeen);
            const avatarHtml = this.getAvatarHtml(user.avatar, '2.5rem');
            const escapedName = (user.name || 'Student').replace(/'/g, "\\'");
            const deviceIcon = user.device === 'mobile' ? '📱' : '💻';
            const loginIcon = user.loginMethod === 'google' ? '🔵' : '📧';

            // Build device badge only if known
            let deviceBadge = '';
            if (user.device && user.device !== 'Unknown') {
                deviceBadge = `<span style="padding: 0.15rem 0.4rem; background: rgba(139, 92, 246, 0.2); border-radius: 4px; font-size: 0.65rem; color: #a78bfa;">${deviceIcon} ${user.device}</span>`;
            }

            // Build login badge only if known
            let loginBadge = '';
            if (user.loginMethod && user.loginMethod !== 'Unknown' && user.loginMethod !== 'unknown') {
                const loginLabel = user.loginMethod === 'google' ? 'Google' : 'Email';
                loginBadge = `<span style="padding: 0.15rem 0.4rem; background: rgba(16, 185, 129, 0.2); border-radius: 4px; font-size: 0.65rem; color: #10b981;">${loginIcon} ${loginLabel}</span>`;
            }

            // Quiz badge (always show) - Today and Total
            const quizToday = user.quizzesToday || 0;
            const quizTotal = user.totalQuizzes || 0;
            const quizBadge = `<span style="padding: 0.15rem 0.4rem; background: rgba(59, 130, 246, 0.2); border-radius: 4px; font-size: 0.65rem; color: #60a5fa;">📝 ${quizToday} today</span><span style="padding: 0.15rem 0.4rem; background: rgba(168, 85, 247, 0.2); border-radius: 4px; font-size: 0.65rem; color: #a855f7;">🏆 ${quizTotal} total</span>`;

            // Last subject badge
            let subjectBadge = '';
            if (user.lastSubject) {
                const subjectEmoji = { math: '📐', science: '🔬', english: '📚', history: '📜', geography: '🌍', gk: '🧠', hindi: '🇮🇳' };
                subjectBadge = `<span style="padding: 0.15rem 0.4rem; background: rgba(234, 179, 8, 0.2); border-radius: 4px; font-size: 0.65rem; color: #eab308;">${subjectEmoji[user.lastSubject] || '📖'} ${user.lastSubject}</span>`;
            }

            html += `
                <div class="online-user-card recently-active-card" data-userid="${user.id}">
                    <div class="user-status-indicator" style="background: #fbbf24; box-shadow: 0 0 6px rgba(251, 191, 36, 0.5);"></div>
                    <div class="user-avatar">${avatarHtml}</div>
                    <div class="user-info">
                        <div class="user-name">
                            ${this.escapeHtml(user.name || 'Student')}
                            ${user.isPremium ? '<span style="margin-left: 0.5rem; padding: 0.1rem 0.4rem; background: linear-gradient(135deg, #ffd700, #ffaa00); border-radius: 4px; font-size: 0.6rem; font-weight: 700; color: #000;">👑 PRO</span>' : ''}
                        </div>
                        <div class="user-email">${this.escapeHtml(user.email || '')}</div>
                        <div class="user-stats">
                            <span>Level ${user.level || 1}</span>
                            <span>${(user.xp || 0).toLocaleString()} XP</span>
                            <span class="last-seen-badge" style="background: linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(245, 158, 11, 0.15)); border-color: rgba(251, 146, 60, 0.3); color: #fb923c;">🕐 ${lastSeenText}</span>
                        </div>
                        <div class="user-stats" style="margin-top: 0.25rem;">
                            ${deviceBadge}${loginBadge}${quizBadge}${subjectBadge}
                        </div>
                    </div>
                    <div class="user-actions">
                        <button class="action-btn message-btn" onclick="BroProAdmin.viewUserProfile('${user.id}')" title="View Profile">
                            👁️
                        </button>
                        <button class="action-btn message-btn" onclick="BroProAdmin.openMessageModal('${user.id}', '${escapedName}', '${user.email || ''}')" title="Send Message">
                            💬
                        </button>
                        <button class="action-btn delete-btn" onclick="BroProAdmin.deleteUserProfile('${user.id}', '${escapedName}', '${user.email || ''}')" title="Delete User">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Render pagination
        if (paginationContainer && totalPages > 1) {
            let paginationHtml = `
                <button class="pagination-btn" onclick="BroProAdmin.goToRecentlyActivePage(1)" ${this.recentlyActiveCurrentPage === 1 ? 'disabled' : ''}>⏮️</button>
                <button class="pagination-btn" onclick="BroProAdmin.goToRecentlyActivePage(${this.recentlyActiveCurrentPage - 1})" ${this.recentlyActiveCurrentPage === 1 ? 'disabled' : ''}>◀️</button>
            `;

            // Show page numbers
            const startPage = Math.max(1, this.recentlyActiveCurrentPage - 2);
            const endPage = Math.min(totalPages, this.recentlyActiveCurrentPage + 2);

            for (let i = startPage; i <= endPage; i++) {
                paginationHtml += `
                    <button class="pagination-btn ${i === this.recentlyActiveCurrentPage ? 'active' : ''}" onclick="BroProAdmin.goToRecentlyActivePage(${i})">${i}</button>
                `;
            }

            paginationHtml += `
                <button class="pagination-btn" onclick="BroProAdmin.goToRecentlyActivePage(${this.recentlyActiveCurrentPage + 1})" ${this.recentlyActiveCurrentPage === totalPages ? 'disabled' : ''}>▶️</button>
                <button class="pagination-btn" onclick="BroProAdmin.goToRecentlyActivePage(${totalPages})" ${this.recentlyActiveCurrentPage === totalPages ? 'disabled' : ''}>⏭️</button>
                <span class="pagination-info">Page ${this.recentlyActiveCurrentPage} of ${totalPages}</span>
            `;

            paginationContainer.innerHTML = paginationHtml;
        } else if (paginationContainer) {
            paginationContainer.innerHTML = '';
        }
    },

    // Pagination handler
    goToRecentlyActivePage(page) {
        const totalPages = Math.ceil(this.recentlyActiveUsers.length / this.recentlyActivePerPage);
        if (page < 1 || page > totalPages) return;

        this.recentlyActiveCurrentPage = page;
        this.renderRecentlyActiveUsers();

        // Scroll to top of list
        const container = document.getElementById('recentlyActiveList');
        if (container) container.scrollTop = 0;
    },

    // Format last seen with full date
    formatLastSeenFull(lastSeen) {
        if (!lastSeen) return 'Unknown';

        const date = lastSeen.toDate ? lastSeen.toDate() : new Date(lastSeen);
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;

        // Format full date
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Format duration
    formatDuration(ms) {
        if (!ms) return '-';
        const minutes = Math.floor(ms / 60000);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        }
        return `${minutes}m`;
    },

    // View user profile modal
    async viewUserProfile(userId) {
        if (!this.isAdmin || !userId) return;

        // Find user in recently active list or fetch from DB
        let user = this.recentlyActiveUsers.find(u => u.id === userId);

        if (!user) {
            // Fetch from presence
            try {
                const doc = await this.db.collection('presence').doc(userId).get();
                if (doc.exists) {
                    user = { id: userId, ...doc.data() };
                }
            } catch (e) {
                console.error('Error fetching user:', e);
            }
        }

        if (!user) {
            alert('User not found');
            return;
        }

        // Create modal if not exists
        let modal = document.getElementById('viewProfileModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'viewProfileModal';
            modal.className = 'modal-overlay';
            modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
            document.body.appendChild(modal);
        }

        const avatarHtml = this.getAvatarHtml(user.avatar, '3rem');
        const lastSeenText = this.formatLastSeenFull(user.lastSeen);
        const escapedName = (user.name || 'Student').replace(/'/g, "\\'");

        modal.innerHTML = `
            <div class="view-profile-modal">
                <div class="profile-modal-header">
                    <div class="profile-modal-avatar">${avatarHtml}</div>
                    <div class="profile-modal-name">${this.escapeHtml(user.name || 'Student')}</div>
                    <div class="profile-modal-email">${this.escapeHtml(user.email || 'No email')}</div>
                    ${user.isPremium ? '<div style="margin-top: 0.5rem;"><span class="premium-badge" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">👑 PREMIUM</span></div>' : ''}
                </div>
                <div class="profile-modal-body">
                    <div class="profile-stat-row">
                        <span class="profile-stat-label">⭐ Total XP</span>
                        <span class="profile-stat-value">${(user.xp || 0).toLocaleString()}</span>
                    </div>
                    <div class="profile-stat-row">
                        <span class="profile-stat-label">📊 Level</span>
                        <span class="profile-stat-value">${user.level || 1}</span>
                    </div>
                    <div class="profile-stat-row">
                        <span class="profile-stat-label">🕐 Last Active</span>
                        <span class="profile-stat-value">${lastSeenText}</span>
                    </div>
                    <div class="profile-stat-row">
                        <span class="profile-stat-label">${user.device === 'mobile' ? '📱' : '💻'} Device</span>
                        <span class="profile-stat-value">${user.device || 'Unknown'}</span>
                    </div>
                    <div class="profile-stat-row">
                        <span class="profile-stat-label">🔐 Login Method</span>
                        <span class="profile-stat-value">${user.loginMethod === 'google' ? 'Google' : user.loginMethod === 'email' ? 'Email' : 'Unknown'}</span>
                    </div>
                    <div class="profile-stat-row">
                        <span class="profile-stat-label">📝 Quizzes Today</span>
                        <span class="profile-stat-value">${user.quizzesToday || 0}</span>
                    </div>
                    <div class="profile-stat-row">
                        <span class="profile-stat-label">📚 Last Subject</span>
                        <span class="profile-stat-value">${user.lastSubject || 'None'}</span>
                    </div>
                    <div class="profile-stat-row">
                        <span class="profile-stat-label">🆔 User ID</span>
                        <span class="profile-stat-value" style="font-size: 0.7rem; font-family: monospace;">${userId.substring(0, 12)}...</span>
                    </div>
                </div>
                <div class="profile-modal-footer">
                    <button class="close-btn" onclick="document.getElementById('viewProfileModal').classList.remove('active')">Close</button>
                    <button class="message-btn" onclick="document.getElementById('viewProfileModal').classList.remove('active'); BroProAdmin.openMessageModal('${userId}', '${escapedName}', '${user.email || ''}')">💬 Message</button>
                </div>
            </div>
        `;

        modal.classList.add('active');
    },

    // ============================================
    // ADMIN UI - Dynamic Injection for Security
    // ============================================
    showAdminUI() {
        // SECURITY: Dynamically inject admin buttons ONLY for admin users
        // This ensures non-admin users never see admin elements in the DOM
        const container = document.getElementById('adminButtonsContainer');

        if (container && !document.getElementById('adminDashboardBtn')) {
            // Inject admin dashboard button
            const adminBtn = document.createElement('button');
            adminBtn.className = 'admin-nav-btn desktop-only';
            adminBtn.id = 'adminDashboardBtn';
            adminBtn.onclick = () => BroProAdmin.openAdminDashboard();
            adminBtn.innerHTML = `
                <span class="admin-crown">👑</span>
                <span>Admin</span>
            `;
            container.appendChild(adminBtn);

            // Inject admin inbox button
            const inboxBtn = document.createElement('button');
            inboxBtn.className = 'admin-inbox-btn desktop-only';
            inboxBtn.id = 'adminInboxBtn';
            inboxBtn.onclick = () => BroProAdmin.openAdminInbox();
            inboxBtn.innerHTML = `
                📬
                <span class="inbox-unread-badge" id="inboxUnreadBadge">0</span>
            `;
            container.appendChild(inboxBtn);

            console.log('👑 Admin UI buttons injected');
        }

        // Hide student chat bubble
        const studentChat = document.getElementById('talkToAdminBubble');
        if (studentChat) studentChat.style.display = 'none';
    },

    hideAdminUI() {
        // SECURITY: Remove admin buttons from DOM entirely
        const container = document.getElementById('adminButtonsContainer');
        if (container) {
            container.innerHTML = ''; // Remove all admin buttons
        }

        // Show student chat bubble (if logged in)
        const studentChat = document.getElementById('talkToAdminBubble');
        if (studentChat && firebase.auth().currentUser) {
            studentChat.style.display = 'flex';
        }
    },

    // Open Admin Dashboard
    openAdminDashboard() {
        if (!this.isAdmin) {
            alert('⛔ Access Denied! Admin only.');
            return;
        }

        const modal = document.getElementById('adminDashboardModal');
        if (modal) {
            modal.classList.add('active');
            this.renderOnlineUsers();
            // Load recently active users
            this.loadRecentlyActiveUsers();
        }
    },

    closeAdminDashboard() {
        const modal = document.getElementById('adminDashboardModal');
        if (modal) modal.classList.remove('active');
    },

    // Render Online Users
    renderOnlineUsers() {
        const container = document.getElementById('onlineUsersList');
        if (!container) return;

        if (this.onlineUsersData.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">😴</span>
                    <p>No users online right now</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.onlineUsersData.map(user => {
            const avatarHtml = this.getAvatarHtml(user.avatar, '2.5rem');
            const escapedName = (user.name || 'Student').replace(/'/g, "\\'");
            const lastSeenText = user.lastSeenFormatted || 'Just now';

            return `
                <div class="online-user-card" data-userid="${user.id}">
                    <div class="user-status-indicator active-heartbeat"></div>
                    <div class="user-avatar">${avatarHtml}</div>
                    <div class="user-info">
                        <div class="user-name">${user.name || 'Anonymous'}</div>
                        <div class="user-email">${user.email || ''}</div>
                        <div class="user-stats">
                            <span>Level ${user.level || 1}</span>
                            <span>${(user.xp || 0).toLocaleString()} XP</span>
                            <span class="last-seen-badge">🟢 ${lastSeenText}</span>
                        </div>
                    </div>
                    <div class="user-actions">
                        <button class="action-btn message-btn" onclick="BroProAdmin.openMessageModal('${user.id}', '${escapedName}', '${user.email || ''}')" title="Send Message">
                            💬
                        </button>
                        <button class="action-btn delete-btn" onclick="BroProAdmin.deleteUserProfile('${user.id}', '${escapedName}', '${user.email || ''}')" title="Delete User">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Update count
        const countEl = document.getElementById('onlineUsersCount');
        if (countEl) countEl.textContent = this.onlineUsersData.length;
    },

    // ============================================
    // USER MANAGEMENT
    // ============================================

    // Pending delete info
    _pendingDelete: null,

    async deleteUserProfile(userId, userName, userEmail) {
        if (!this.isAdmin) {
            alert('⛔ Access Denied!');
            return;
        }

        // Prevent deleting admin
        if (userEmail === this.ADMIN_EMAIL) {
            this.showAdminToast('error', '🚫 Cannot delete admin account!');
            return;
        }

        // Store pending delete info
        this._pendingDelete = { userId, userName, userEmail };

        // Get modal elements
        const modal = document.getElementById('adminConfirmModal');

        if (!modal) {
            // Fallback if modal not found
            if (confirm(`Delete "${userName}"?`)) {
                const pwd = prompt('Enter admin password:');
                if (pwd === 'Math#F786') {
                    const result = await this.deleteUserProfileDirect(userId, userName);
                    alert(result.success ? '✅ Deleted!' : '❌ Failed!');
                }
            }
            return;
        }

        const title = document.getElementById('confirmTitle');
        const message = document.getElementById('confirmMessage');
        const passwordSection = document.getElementById('confirmPasswordSection');
        const passwordInput = document.getElementById('adminPasswordInput');
        const passwordError = document.getElementById('passwordError');
        const deleteBtn = document.getElementById('confirmDeleteBtn');
        const cancelBtn = document.getElementById('confirmCancelBtn');

        // Reset and configure modal
        passwordInput.value = '';
        passwordError.textContent = '';
        deleteBtn.disabled = false;
        deleteBtn.innerHTML = '<span>🗑️</span> Delete';

        title.textContent = 'Delete Player';
        message.innerHTML = `Are you sure you want to delete <strong style="color: var(--primary)">${userName}</strong>?<br><br><span style="color: #ef4444; font-size: 0.9rem;">⚠️ This will remove ALL their data!</span>`;

        // Hide password section if already logged in as admin
        if (this.isAdmin) {
            passwordSection.style.display = 'none';
        } else {
            passwordSection.style.display = 'block';
        }

        // Remove old event listeners by cloning
        const newDeleteBtn = deleteBtn.cloneNode(true);
        const newCancelBtn = cancelBtn.cloneNode(true);
        deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

        // Add new listeners
        newDeleteBtn.addEventListener('click', () => this.handleDeleteConfirm());
        newCancelBtn.addEventListener('click', () => this.closeDeleteModal());

        // Show modal
        modal.classList.add('active');

        // Focus password input only if needed
        if (!this.isAdmin) {
            setTimeout(() => passwordInput.focus(), 300);
        }

        if (window.BroProSounds) BroProSounds.play('click');
    },

    closeDeleteModal() {
        const modal = document.getElementById('adminConfirmModal');
        if (modal) modal.classList.remove('active');
        this._pendingDelete = null;
    },

    async handleDeleteConfirm() {
        const passwordInput = document.getElementById('adminPasswordInput');
        const passwordError = document.getElementById('passwordError');
        const deleteBtn = document.getElementById('confirmDeleteBtn');

        // Only check password if NOT already authenticated as admin
        if (!this.isAdmin && passwordInput.value !== 'Math#F786') {
            passwordError.textContent = '❌ Invalid password!';
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 500);
            if (window.BroProSounds) BroProSounds.play('wrong');
            return;
        }

        deleteBtn.disabled = true;
        deleteBtn.innerHTML = '<span>⏳</span> Deleting...';

        const result = await this.deleteUserProfileDirect(
            this._pendingDelete.userId,
            this._pendingDelete.userName
        );

        this.closeDeleteModal();

        if (result.success) {
            this.showAdminToast('success', `✅ ${this._pendingDelete.userName} deleted!`);
            if (window.BroProSounds) BroProSounds.play('correct');
        } else {
            this.showAdminToast('error', `❌ Failed: ${result.message}`);
            if (window.BroProSounds) BroProSounds.play('wrong');
        }
    },

    showAdminToast(type, message) {
        const toast = document.getElementById('adminToast');
        const toastIcon = document.getElementById('toastIcon');
        const toastMessage = document.getElementById('toastMessage');

        if (!toast) { alert(message); return; }

        toastIcon.textContent = type === 'success' ? '✅' : '❌';
        toastMessage.textContent = message;
        toast.className = `admin-toast ${type} show`;

        setTimeout(() => toast.classList.remove('show'), 3000);
    },

    // Direct deletion - comprehensive
    async deleteUserProfileDirect(userId, userName) {
        if (!this.isAdmin) return { success: false, message: 'Not authorized' };

        try {
            const subjects = ['math', 'mathematics', 'science', 'geography', 'english', 'hindi', 'gk', 'history'];

            // 1. Set force logout flag first
            await this.db.collection('presence').doc(userId).set({
                forceLogout: true,
                forceLogoutAt: firebase.firestore.FieldValue.serverTimestamp(),
                deletedBy: this.ADMIN_EMAIL
            }, { merge: true });

            console.log('🔐 Force logout flag set');

            // Wait for listener to catch it
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 2. Delete from global leaderboard (new structure)
            try {
                await this.db.collection('leaderboards').doc('global').collection('players').doc(userId).delete();
                console.log('✅ Deleted from global leaderboard');
            } catch (e) { console.log('Skip global:', e.message); }

            // 3. Delete from subject leaderboards (new structure)
            for (const subject of subjects) {
                try {
                    await this.db.collection('leaderboards').doc(subject).collection('players').doc(userId).delete();
                    console.log(`✅ Deleted from ${subject} leaderboard`);
                } catch (e) { }
            }

            // 4. Delete from old leaderboard collection
            try {
                await this.db.collection('leaderboard').doc(userId).delete();
                console.log('✅ Deleted from old leaderboard');
            } catch (e) { }

            // 5. Delete presence
            try {
                await this.db.collection('presence').doc(userId).delete();
                console.log('✅ Deleted presence');
            } catch (e) { }

            // 6. Delete messages
            try {
                const messages = await this.db.collection('messages').where('recipientId', '==', userId).get();
                for (const doc of messages.docs) {
                    await doc.ref.delete();
                }
                const sentMessages = await this.db.collection('messages').where('senderId', '==', userId).get();
                for (const doc of sentMessages.docs) {
                    await doc.ref.delete();
                }
                console.log('✅ Deleted messages');
            } catch (e) { }

            console.log(`✅ "${userName}" completely deleted from ALL collections`);
            return { success: true, message: `Deleted ${userName} successfully!` };

        } catch (error) {
            console.error('Error deleting user:', error);
            return { success: false, message: error.message };
        }
    },

    // ============================================
    // ADMIN MESSAGING SYSTEM (Simplified)
    // ============================================
    async openMessageModal(userId, userName, userEmail) {
        if (!this.isAdmin) return;

        this.currentChatUserId = userId;

        // Fetch leaderboard name and avatar (priority over Google name)
        let displayName = userName;
        let displayEmail = userEmail;
        let displayAvatar = '🐼'; // Default

        try {
            const leaderboardDoc = await this.db.collection('leaderboard').doc(userId).get();
            if (leaderboardDoc.exists) {
                const userData = leaderboardDoc.data();
                displayName = userData.name || userName;  // Leaderboard name takes priority
                displayEmail = userData.email || userEmail;
                displayAvatar = userData.avatar || userData.photoURL || '🐼';
            }

            // Also try presence collection for additional data
            const presenceDoc = await this.db.collection('presence').doc(userId).get();
            if (presenceDoc.exists) {
                const presenceData = presenceDoc.data();
                if (!displayAvatar || displayAvatar === '🐼') {
                    displayAvatar = presenceData.avatar || presenceData.photoURL || displayAvatar;
                }
                if (!displayEmail) {
                    displayEmail = presenceData.email || displayEmail;
                }
            }
        } catch (e) {
            console.log('Could not fetch user data:', e.message);
        }

        document.getElementById('messageRecipientName').textContent = displayName;
        document.getElementById('messageRecipientEmail').textContent = displayEmail;
        document.getElementById('adminMessageInput').value = '';

        // Set avatar (support both emoji and URL)
        const avatarEl = document.getElementById('messageRecipientAvatar');
        if (avatarEl) {
            if (displayAvatar && displayAvatar.startsWith('http')) {
                avatarEl.innerHTML = `<img src="${displayAvatar}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
            } else {
                avatarEl.textContent = displayAvatar || '🐼';
            }
        }

        const modal = document.getElementById('adminMessageModal');
        if (modal) modal.classList.add('active');

        // Load chat history
        this.loadChatHistory(userId);
    },

    closeMessageModal() {
        const modal = document.getElementById('adminMessageModal');
        if (modal) modal.classList.remove('active');
        this.currentChatUserId = null;

        // Cleanup listener
        if (this.unsubscribeMessages) {
            this.unsubscribeMessages();
            this.unsubscribeMessages = null;
        }
    },

    // Admin permanently deletes entire conversation from Firebase
    async deleteConversation() {
        if (!this.isAdmin || !this.currentChatUserId) {
            alert('❌ Cannot delete: No active conversation');
            return;
        }

        const userId = this.currentChatUserId;
        const userName = document.getElementById('messageRecipientName')?.textContent || 'this user';

        // Show confirmation
        const confirmed = confirm(`⚠️ PERMANENT DELETE\n\nAre you sure you want to permanently delete ALL messages with ${userName}?\n\nThis will:\n• Delete from Firebase (both sides)\n• Reset user's chat cleared timestamp\n• Cannot be undone!\n\nClick OK to delete, Cancel to abort.`);

        if (!confirmed) return;

        try {
            const chatContainer = document.getElementById('adminChatHistory');
            if (chatContainer) {
                chatContainer.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;">
                        <div style="width: 40px; height: 40px; border: 3px solid rgba(239,68,68,0.2); border-top-color: #ef4444; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
                        <p style="color: var(--text-secondary);">Deleting all messages...</p>
                    </div>
                `;
            }

            // Delete messages sent TO the user from admin
            const adminToUser = await this.db.collection('messages')
                .where('senderId', '==', 'admin')
                .where('recipientId', '==', userId)
                .get();

            // Delete messages sent BY the user to admin
            const userToAdmin = await this.db.collection('messages')
                .where('senderId', '==', userId)
                .where('recipientId', '==', 'admin')
                .get();

            // Batch delete all messages
            const batch = this.db.batch();
            let deleteCount = 0;

            adminToUser.forEach(doc => {
                batch.delete(doc.ref);
                deleteCount++;
            });

            userToAdmin.forEach(doc => {
                batch.delete(doc.ref);
                deleteCount++;
            });

            // Reset user's chatClearedAt so they don't have stale timestamp
            await this.db.collection('users').doc(userId).set({
                chatClearedAt: null
            }, { merge: true });

            await batch.commit();

            // Clear UI
            if (chatContainer) {
                chatContainer.innerHTML = `
                    <div class="no-messages">
                        <span>🗑️</span>
                        <p>Conversation deleted</p>
                        <p style="font-size: 0.8rem; opacity: 0.7;">${deleteCount} messages removed</p>
                    </div>
                `;
            }

            // Show success toast
            if (this.showAdminToast) {
                this.showAdminToast('success', `✅ Deleted ${deleteCount} messages with ${userName}`);
            } else {
                alert(`✅ Deleted ${deleteCount} messages with ${userName}`);
            }

            console.log(`✅ Admin deleted ${deleteCount} messages with user ${userId}`);

            // Refresh inbox
            if (this.loadInbox) {
                setTimeout(() => this.listenToInbox(), 1000);
            }

        } catch (error) {
            console.error('Error deleting conversation:', error);
            alert('❌ Failed to delete conversation: ' + error.message);
        }
    },

    // Load chat using 'messages' collection
    async loadChatHistory(userId) {
        if (!this.db) return;

        const chatContainer = document.getElementById('adminChatHistory');
        if (!chatContainer) return;

        chatContainer.innerHTML = '<div class="loading-chat">Loading messages...</div>';

        if (this.unsubscribeMessages) {
            this.unsubscribeMessages();
        }

        try {
            // Listen to messages FROM this user TO admin
            this.unsubscribeMessages = this.db.collection('messages')
                .where('senderId', '==', userId)
                .where('recipientId', '==', 'admin')
                .onSnapshot((fromUserSnapshot) => {
                    // Also get messages FROM admin TO this user
                    this.db.collection('messages')
                        .where('senderId', '==', 'admin')
                        .where('recipientId', '==', userId)
                        .get()
                        .then((fromAdminSnapshot) => {
                            const allMessages = [];

                            // Messages FROM user TO admin
                            fromUserSnapshot.forEach(doc => {
                                const data = doc.data();
                                const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
                                allMessages.push({ id: doc.id, ...data, timestamp });
                            });

                            // Messages FROM admin TO user
                            fromAdminSnapshot.forEach(doc => {
                                const data = doc.data();
                                const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
                                allMessages.push({ id: doc.id, ...data, timestamp });
                            });

                            if (allMessages.length === 0) {
                                chatContainer.innerHTML = '<div class="no-messages"><span>💬</span><p>Start a conversation!</p></div>';
                                return;
                            }

                            // Remove duplicates and sort
                            const uniqueMessages = Array.from(
                                new Map(allMessages.map(m => [m.id, m])).values()
                            );
                            uniqueMessages.sort((a, b) => a.timestamp - b.timestamp);

                            chatContainer.innerHTML = '';
                            uniqueMessages.forEach(msg => {
                                const isAdmin = msg.senderId === 'admin';
                                const msgClass = window.getMessageClass ? getMessageClass(msg.text, isAdmin) : (isAdmin ? 'admin-message' : 'user-message');
                                const content = window.renderMessageContent ? renderMessageContent(msg.text || '') : this.escapeHtml(msg.text || '');
                                chatContainer.innerHTML += '<div class="chat-message ' + msgClass + '">' +
                                    '<div class="message-content">' + content + '</div>' +
                                    '<div class="message-time">' + this.formatTime(msg.timestamp) + '</div>' +
                                    '</div>';
                            });

                            chatContainer.scrollTop = chatContainer.scrollHeight;
                        });
                }, (error) => {
                    console.error('Chat listener error:', error);
                    chatContainer.innerHTML = '<div class="error-chat">Error loading messages</div>';
                });

        } catch (error) {
            console.error('Error loading chat:', error);
            chatContainer.innerHTML = '<div class="error-chat">Error loading messages</div>';
        }
    },

    // Send message from Admin to User
    async sendAdminMessage() {
        if (!this.isAdmin || !this.currentChatUserId) return;

        const input = document.getElementById('adminMessageInput');
        const text = input.value.trim();

        if (!text) return;

        input.value = '';

        try {
            // Use the existing 'messages' collection
            await this.db.collection('messages').add({
                senderId: 'admin',
                senderName: 'Bhai',
                recipientId: this.currentChatUserId,
                text: text,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                read: false
            });

            console.log('✅ Message sent to user');

            // Refresh chat to show the new message immediately
            this.loadChatHistory(this.currentChatUserId);

        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message: ' + error.message);
        }
    },

    // ============================================
    // ADMIN INBOX (Simple approach)
    // ============================================
    openAdminInbox() {
        if (!this.isAdmin) {
            alert('⛔ Access Denied! Admin only.');
            return;
        }

        const modal = document.getElementById('adminInboxModal');
        if (modal) modal.classList.add('active');
    },

    closeAdminInbox() {
        const modal = document.getElementById('adminInboxModal');
        if (modal) modal.classList.remove('active');
    },

    startInboxListener() {
        if (!this.db || !this.isAdmin) return;

        // Listen to messages sent TO admin
        this.db.collection('messages')
            .where('recipientId', '==', 'admin')
            .onSnapshot((snapshot) => {
                const conversations = new Map();

                snapshot.forEach(doc => {
                    const data = doc.data();
                    const senderId = data.senderId;
                    const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();

                    if (!conversations.has(senderId) || timestamp > conversations.get(senderId).timestamp) {
                        conversations.set(senderId, {
                            id: senderId,
                            recipientId: senderId,
                            senderName: data.senderName || 'Student',
                            lastMessage: data.text || '',
                            timestamp: timestamp,
                            unread: !data.read
                        });
                    }
                });

                // Fetch additional user data from leaderboard for each conversation
                const conversationsList = Array.from(conversations.values());
                const enrichedConversations = [];

                // Process each conversation
                const enrichPromises = conversationsList.map(async (conv) => {
                    try {
                        // Try to get user data from leaderboard
                        const leaderboardDoc = await this.db.collection('leaderboard').doc(conv.recipientId).get();

                        if (leaderboardDoc.exists) {
                            const userData = leaderboardDoc.data();
                            return {
                                ...conv,
                                leaderboardName: userData.name || '',
                                email: userData.email || '',
                                googleName: userData.googleName || userData.displayName || '',
                                avatar: userData.avatar || '🐼'
                            };
                        }
                        return conv;
                    } catch (e) {
                        return conv;
                    }
                });

                Promise.all(enrichPromises).then((enrichedList) => {
                    this.inboxConversations = enrichedList;
                    this.inboxConversations.sort((a, b) => b.timestamp - a.timestamp);
                    this.renderInbox();
                    this.updateInboxBadge();
                });
            });
    },

    renderInbox() {
        const container = document.getElementById('inboxConversationsList');
        if (!container) return;

        if (this.inboxConversations.length === 0) {
            container.innerHTML = '<div class="empty-inbox"><span class="empty-icon">📭</span><p>No conversations yet</p></div>';
            return;
        }

        let html = '';
        this.inboxConversations.forEach(conv => {
            // Priority: Leaderboard Name > Google Name > Sender Name
            const displayName = conv.leaderboardName || conv.googleName || conv.senderName || 'Student';
            const avatar = conv.avatar || '🐼';

            html += '<div class="inbox-conversation ' + (conv.unread ? 'unread' : '') + '" ';
            html += 'onclick="BroProAdmin.openConversation(\'' + conv.recipientId + '\', \'' + this.escapeHtml(displayName) + '\')">';
            html += '<div class="conv-avatar">' + this.getAvatarHtml(avatar, '2.5rem') + '</div>';
            html += '<div class="conv-info">';
            html += '<div class="conv-name">' + this.escapeHtml(displayName) + '</div>';

            // Show email and Google name as subtitle if available
            let subtitle = '';
            if (conv.email) {
                subtitle = conv.email;
            }
            if (conv.googleName && conv.googleName !== displayName) {
                subtitle += subtitle ? ' • ' + conv.googleName : conv.googleName;
            }

            if (subtitle) {
                html += '<div class="conv-subtitle">' + this.escapeHtml(subtitle) + '</div>';
            }

            html += '<div class="conv-preview">' + this.truncateText(conv.lastMessage, 40) + '</div>';
            html += '</div>';
            if (conv.unread) {
                html += '<div class="unread-indicator"></div>';
            }
            html += '<div class="conv-time">' + this.formatTime(conv.timestamp) + '</div>';
            html += '</div>';
        });
        container.innerHTML = html;
    },

    updateInboxBadge() {
        const badge = document.getElementById('inboxUnreadBadge');
        if (!badge) return;

        const unreadCount = this.inboxConversations.filter(c => c.unread).length;

        if (unreadCount > 0) {
            badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    },

    async openConversation(userId, userName) {
        this.closeAdminInbox();
        this.openMessageModal(userId, userName, '');

        // Mark as read (for messages from this user to admin)
        try {
            const messagesToAdmin = await this.db.collection('messages')
                .where('senderId', '==', userId)
                .where('recipientId', '==', 'admin')
                .where('read', '==', false)
                .get();

            const batch = this.db.batch();
            messagesToAdmin.docs.forEach(doc => {
                batch.update(doc.ref, { read: true });
            });
            await batch.commit();
        } catch (e) {
            console.log('Mark as read skipped:', e.message);
        }
    },

    // ============================================
    // STUDENT: TALK TO BHAI
    // ============================================
    initTalkToAdmin() {
        firebase.auth().onAuthStateChanged((user) => {
            const container = document.querySelector('.bhai-container');

            if (!container) return;

            if (user && user.email !== this.ADMIN_EMAIL) {
                container.style.display = 'block';
            } else if (!user) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
    },

    // ============================================
    // UNREAD MESSAGE TRACKING
    // ============================================
    startUnreadMessageListener(user) {
        if (!this.db || !user || user.email === this.ADMIN_EMAIL) return;

        // Load last read timestamp from localStorage
        const storedTimestamp = localStorage.getItem(`bhai_lastRead_${user.uid}`);
        this.lastReadTimestamp = storedTimestamp ? new Date(storedTimestamp) : new Date(0);

        // Listen to messages sent TO this user (from admin or AI)
        this.unsubscribeUnread = this.db
            .collection('messages')
            .where('recipientId', '==', user.uid)
            .onSnapshot((snapshot) => {
                let unreadCount = 0;

                snapshot.forEach(doc => {
                    const data = doc.data();
                    const msgTimestamp = data.timestamp ? data.timestamp.toDate() : new Date();

                    // Only count messages from REAL Bhai (admin), NOT AI messages
                    const isFromAdmin = data.senderId === 'admin';
                    const isNotAI = data.isAI !== true && data.senderId !== 'bhai-ai';

                    // Count messages newer than last read timestamp AND from real admin only
                    if (msgTimestamp > this.lastReadTimestamp && isFromAdmin && isNotAI) {
                        unreadCount++;
                    }
                });

                this.updateUnreadBadge(unreadCount);
            }, (error) => {
                console.error('Unread listener error:', error);
            });

        console.log('📬 Unread message listener started');
    },

    stopUnreadMessageListener() {
        if (this.unsubscribeUnread) {
            this.unsubscribeUnread();
            this.unsubscribeUnread = null;
        }
    },

    updateUnreadBadge(count) {
        const badge = document.getElementById('bhaiUnreadBadge');
        const countEl = badge?.querySelector('.badge-count');

        if (!badge || !countEl) return;

        if (count > 0) {
            // Show badge with count
            countEl.textContent = count > 99 ? '99+' : count;
            badge.style.display = 'flex';

            // Add high-count class for extra emphasis
            if (count > 5) {
                badge.classList.add('high-count');
            } else {
                badge.classList.remove('high-count');
            }

            // Trigger re-animation
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = 'badgeEntrance 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }, 10);

            console.log(`🔴 ${count} unread messages`);
        } else {
            // Hide badge
            badge.style.display = 'none';
            badge.classList.remove('high-count');
        }
    },

    async markMessagesAsRead() {
        const user = firebase.auth().currentUser;
        if (!user || !this.db) return;

        // Update last read timestamp locally
        this.lastReadTimestamp = new Date();
        localStorage.setItem(`bhai_lastRead_${user.uid}`, this.lastReadTimestamp.toISOString());

        // Clear the badge immediately for UI responsiveness
        this.updateUnreadBadge(0);

        try {
            // Find unread messages sent by admin to this user
            const snapshot = await this.db.collection('messages')
                .where('recipientId', '==', user.uid)
                .where('senderId', '==', 'admin')
                .where('read', '==', false)
                .get();

            if (!snapshot.empty) {
                const batch = this.db.batch();
                snapshot.forEach(doc => {
                    batch.update(doc.ref, { read: true });
                });
                await batch.commit();
                console.log(`✅ Marked ${snapshot.size} messages as read in Firestore`);
            }
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    },

    // Load wallet data from Firestore
    async loadWalletFromFirestore(user) {
        if (!this.db || !user) return;

        try {
            const presenceDoc = await this.db.collection('presence').doc(user.uid).get();

            if (presenceDoc.exists) {
                const data = presenceDoc.data();
                const firestoreWalletSpent = data.walletSpent || 0;

                // Load local profile
                const profile = window.BroProPlayer?.load() || {};
                const localWalletSpent = profile.walletSpent || 0;

                console.log(`💰 Wallet check - Firestore: ${firestoreWalletSpent}, Local: ${localWalletSpent}`);

                // Always use the higher value to prevent loss
                const finalWalletSpent = Math.max(firestoreWalletSpent, localWalletSpent);

                if (finalWalletSpent !== localWalletSpent) {
                    profile.walletSpent = finalWalletSpent;
                    window.BroProPlayer?.save(profile);
                    console.log(`💰 Wallet updated to: ₹${finalWalletSpent} spent`);
                }

                if (finalWalletSpent !== firestoreWalletSpent) {
                    // Sync to Firestore
                    await this.db.collection('presence').doc(user.uid).set({
                        walletSpent: finalWalletSpent
                    }, { merge: true });
                    console.log(`💰 Wallet synced to Firestore: ₹${finalWalletSpent} spent`);
                }
            } else {
                // Create presence doc with current wallet
                const profile = window.BroProPlayer?.load() || {};
                await this.db.collection('presence').doc(user.uid).set({
                    walletSpent: profile.walletSpent || 0
                }, { merge: true });
            }

            // Set up real-time listener for wallet changes
            this.db.collection('presence').doc(user.uid).onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const firestoreWallet = data.walletSpent || 0;
                    const profile = window.BroProPlayer?.load() || {};

                    // Only update if Firestore value is higher (to prevent reset)
                    if (firestoreWallet > (profile.walletSpent || 0)) {
                        profile.walletSpent = firestoreWallet;
                        window.BroProPlayer?.save(profile);

                        // Update UI displays
                        const profileWallet = document.getElementById('profileWallet');
                        if (profileWallet) {
                            const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
                            const totalEarned = Math.floor((profile.xp || 0) / divisor);
                            const available = Math.max(0, totalEarned - firestoreWallet);
                            profileWallet.textContent = `₹${available.toLocaleString()}`;
                        }

                        // Also update chat wallet if visible
                        const chatWallet = document.getElementById('chatWalletAmount');
                        if (chatWallet) {
                            const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
                            const totalEarned = Math.floor((profile.xp || 0) / divisor);
                            const available = Math.max(0, totalEarned - firestoreWallet);
                            chatWallet.textContent = '₹' + available;
                        }
                    }
                }
            });

        } catch (error) {
            console.log('Wallet load error:', error.message);
        }
    },



    openStudentChat() {
        const user = firebase.auth().currentUser;
        const remaining = this.getGuestMessagesRemaining();

        // GUEST MODE - Allow limited free BhAI messages
        if (!user) {
            if (remaining <= 0) {
                // Guest has used all free messages - prompt login
                this.showGuestLimitReached();
                return;
            }

            // Guest can still chat - open in guest mode
            this.isGuestMode = true;
            console.log(`🎁 Guest mode: ${remaining} free messages remaining`);
        } else {
            this.isGuestMode = false;
        }

        const modal = document.getElementById('studentChatModal');
        if (modal) {
            modal.classList.add('active');

            // For guests: Force AI mode and show guest-specific UI
            if (!user) {
                this.chatMode = 'ai'; // Guests can ONLY use BhAI
                this.showGuestWelcomeScreen();
                this.updateGuestUI();
            } else {
                // Ensure toggle bar is restored if it was showing trial mode
                this.restoreLoggedInToggleBar();
                this.loadStudentChatHistory();
                // Mark messages as read
                this.markMessagesAsRead();
                // Initialize wallet display
                this.updateChatWalletDisplay();
                // Reset to Real Bhai mode by default for logged-in users
                this.chatMode = 'real';
            }

            this.updateChatModeUI();

            // Hide the floating Bhai button when chat is open
            const bhaiContainer = document.querySelector('.bhai-container');
            if (bhaiContainer) {
                bhaiContainer.style.display = 'none';
            }

            // MOBILE FIX: Force correct layout on mobile
            if (window.innerWidth <= 1024) {
                const chatModal = document.querySelector('.bhai-chat-modal');
                const chatHeader = document.querySelector('.bhai-chat-header');
                const toggleBar = document.querySelector('.chat-mode-toggle-bar');
                const chatArea = document.querySelector('.bhai-chat-area');
                const inputArea = document.querySelector('.bhai-input-area');

                // Force modal overlay to not center
                modal.style.alignItems = 'flex-start';
                modal.style.justifyContent = 'flex-start';
                modal.style.padding = '0';

                // Force chat modal to fill screen with FLEX COLUMN layout
                if (chatModal) {
                    chatModal.style.cssText = `
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        bottom: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        max-width: 100% !important;
                        max-height: 100% !important;
                        border-radius: 0 !important;
                        margin: 0 !important;
                        display: flex !important;
                        flex-direction: column !important;
                        z-index: 99999 !important;
                        overflow: hidden !important;
                    `;
                }

                // Header - fixed height, no shrink
                if (chatHeader) {
                    chatHeader.style.cssText = `
                        flex-shrink: 0 !important;
                        min-height: 60px !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: space-between !important;
                        background: linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 100%) !important;
                        padding: 0.75rem !important;
                        border-bottom: 1px solid rgba(139, 92, 246, 0.3) !important;
                        box-sizing: border-box !important;
                        position: relative !important;
                        z-index: 10 !important;
                    `;
                }

                // TOGGLE BAR - Compact and sleek design
                if (toggleBar) {
                    toggleBar.style.cssText = `
                        display: flex !important;
                        visibility: visible !important;
                        flex-shrink: 0 !important;
                        min-height: 48px !important;
                        height: auto !important;
                        align-items: center !important;
                        justify-content: space-between !important;
                        padding: 0.35rem 0.75rem !important;
                        background: linear-gradient(180deg, rgba(30, 20, 50, 0.98), rgba(20, 15, 40, 0.95)) !important;
                        border-bottom: 1px solid rgba(139, 92, 246, 0.3) !important;
                        box-sizing: border-box !important;
                        position: relative !important;
                        z-index: 9 !important;
                    `;

                    // Make mode buttons more compact
                    const modeButtons = toggleBar.querySelectorAll('.mode-btn');
                    modeButtons.forEach(btn => {
                        btn.style.cssText = `
                            display: flex !important;
                            flex-direction: column !important;
                            align-items: center !important;
                            padding: 0.25rem 0.5rem !important;
                            min-width: 60px !important;
                            border-radius: 8px !important;
                            border: none !important;
                            cursor: pointer !important;
                            gap: 0 !important;
                        `;
                    });

                    // Style the wallet display more compact
                    const walletDisplay = toggleBar.querySelector('.wallet-display-chat');
                    if (walletDisplay) {
                        walletDisplay.style.cssText = `
                            display: flex !important;
                            align-items: center !important;
                            gap: 0.3rem !important;
                            padding: 0.25rem 0.5rem !important;
                            background: rgba(16, 185, 129, 0.15) !important;
                            border: 1px solid rgba(16, 185, 129, 0.3) !important;
                            border-radius: 16px !important;
                            font-size: 0.85rem !important;
                        `;
                    }
                }

                // Chat area - flexible, takes remaining space, NO padding
                if (chatArea) {
                    chatArea.style.cssText = `
                        flex: 1 !important;
                        overflow-y: auto !important;
                        -webkit-overflow-scrolling: touch !important;
                        position: relative !important;
                        min-height: 0 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background-size: cover !important;
                        background-position: center !important;
                    `;

                    // Style the messages container - minimal top padding
                    const messagesContainer = chatArea.querySelector('.bhai-messages-container');
                    if (messagesContainer) {
                        messagesContainer.style.cssText = `
                            padding: 0.35rem 0.75rem 0.5rem 0.75rem !important;
                            margin: 0 !important;
                            display: flex !important;
                            flex-direction: column !important;
                            gap: 0.4rem !important;
                            min-height: auto !important;
                        `;
                    }

                    // Fix welcome screen - align to top instead of center
                    const welcomeScreen = chatArea.querySelector('.bhai-welcome-screen');
                    if (welcomeScreen) {
                        welcomeScreen.style.cssText = `
                            display: flex !important;
                            flex-direction: column !important;
                            align-items: center !important;
                            justify-content: flex-start !important;
                            padding-top: 1rem !important;
                        `;
                    }
                }

                // Input area - fixed at bottom
                if (inputArea) {
                    inputArea.style.cssText = `
                        flex-shrink: 0 !important;
                        min-height: 60px !important;
                        display: flex !important;
                        align-items: center !important;
                        background: linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%) !important;
                        padding: 0.75rem !important;
                        border-top: 1px solid rgba(139, 92, 246, 0.2) !important;
                        box-sizing: border-box !important;
                        position: relative !important;
                        z-index: 10 !important;
                    `;
                }

                // Also hide the main navbar when chat is open
                const mainNavbar = document.querySelector('.navbar');
                if (mainNavbar) {
                    mainNavbar.style.display = 'none';
                }
            }
        }
    },

    // ============================================
    // GUEST MODE UI HELPERS
    // ============================================

    // Show premium welcome screen for guests
    showGuestWelcomeScreen() {
        // IMPORTANT: Hide the original default welcome screen
        const originalWelcome = document.getElementById('bhaiWelcomeScreen');
        if (originalWelcome) {
            originalWelcome.style.display = 'none';
        }

        const chatContainer = document.getElementById('studentChatMessages');
        if (!chatContainer) return;

        const remaining = this.getGuestMessagesRemaining();

        // Make container visible and show guest content
        chatContainer.style.display = 'flex';
        chatContainer.style.flexDirection = 'column';
        chatContainer.innerHTML = `
            <div class="guest-welcome-screen" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                padding: 2rem;
                text-align: center;
                background: linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%);
            ">
                <div class="guest-avatar" style="
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #a855f7, #6366f1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
                    animation: float 3s ease-in-out infinite;
                ">🤖</div>
                
                <h3 style="
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, #a855f7, #6366f1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                ">Welcome to BhAI! ✨</h3>
                
                <p style="
                    color: var(--text-secondary);
                    margin-bottom: 1.5rem;
                    font-size: 0.95rem;
                    max-width: 280px;
                ">
                    Your AI study buddy is ready to help! Ask me anything about your studies.
                </p>
                
                <div class="guest-free-badge" style="
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.25rem;
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05));
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    border-radius: 50px;
                    margin-bottom: 1rem;
                ">
                    <span style="font-size: 1.2rem;">🎁</span>
                    <span style="
                        font-weight: 700;
                        color: #10b981;
                        font-size: 0.9rem;
                    ">${remaining} FREE messages remaining!</span>
                </div>
                
                <p style="
                    font-size: 0.8rem;
                    color: var(--text-tertiary);
                    max-width: 250px;
                ">
                    <a href="#" onclick="openAuthModal(); return false;" style="
                        color: #8b5cf6;
                        text-decoration: none;
                        font-weight: 600;
                    ">Login</a> for unlimited messages + Real Bhai chat!
                </p>
            </div>
        `;
    },

    // Update UI elements for guest mode
    updateGuestUI() {
        // IMPORTANT: Double-check auth state to prevent showing trial mode for logged-in users
        const user = firebase.auth().currentUser;
        if (user) {
            console.log('⚠️ updateGuestUI called but user is logged in - skipping');
            // Restore proper logged-in UI if needed
            this.restoreLoggedInToggleBar();
            return;
        }

        const remaining = this.getGuestMessagesRemaining();

        // Hide mode toggle for guests (they can only use AI)
        const toggleBar = document.querySelector('.chat-mode-toggle-bar');
        if (toggleBar) {
            toggleBar.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    padding: 0.5rem 1rem;
                    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(99, 102, 241, 0.05));
                    border-radius: 12px;
                    width: 100%;
                ">
                    <span style="font-size: 1.2rem;">🎁</span>
                    <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">
                        Trial Mode: <span style="color: #10b981;">${remaining}</span> free message${remaining !== 1 ? 's' : ''} left
                    </span>
                    <button onclick="openAuthModal(); BroProAdmin.closeStudentChat();" style="
                        background: linear-gradient(135deg, #8b5cf6, #6366f1);
                        color: white;
                        border: none;
                        padding: 0.4rem 0.8rem;
                        border-radius: 20px;
                        font-size: 0.75rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        Login →
                    </button>
                </div>
            `;
        }

        // Hide wallet display for guests
        const chatWallet = document.getElementById('chatWalletDisplay');
        if (chatWallet) {
            chatWallet.style.display = 'none';
        }

        // Update header title for guests
        const titleEl = document.getElementById('chatModeTitle');
        if (titleEl) {
            titleEl.textContent = 'Try BhAI Free! 🎁';
        }
    },

    // Restore the toggle bar for logged-in users (fixes issue where trial mode shows for logged-in users)
    restoreLoggedInToggleBar() {
        const toggleBar = document.querySelector('.chat-mode-toggle-bar');
        if (!toggleBar) return;

        // Check if toggle bar is already in guest mode (contains trial mode content)
        const isGuestMode = toggleBar.innerHTML.includes('Trial Mode');
        if (!isGuestMode) return; // Already in logged-in mode

        console.log('🔧 Restoring logged-in toggle bar...');

        // Restore the proper logged-in toggle bar HTML
        toggleBar.innerHTML = `
            <div class="wallet-display-chat"
                style="display: flex !important; visibility: visible !important; cursor: pointer;"
                onclick="if(window.BroProWallet) BroProWallet.openAddMoneyModal(null, 'bhai_chat')"
                title="Click to add money">
                <span class="wallet-icon">💰</span>
                <span class="wallet-amount" id="chatWalletAmount">₹0</span>
                <span class="add-plus" style="margin-left: 4px; font-weight: 700; color: #8b5cf6;">+</span>
            </div>
            <div class="chat-mode-toggle" style="display: flex !important; visibility: visible !important;">
                <button class="mode-btn active" id="realBhaiBtn" onclick="switchChatMode('real')"
                    style="display: flex !important; visibility: visible !important;">
                    <span class="mode-icon">👨‍🏫</span>
                    <span class="mode-label" style="display: block !important;">Real Bhai</span>
                    <span class="mode-cost" style="display: block !important;">₹2/msg</span>
                </button>
                <button class="mode-btn" id="aiBhaiBtn" onclick="switchChatMode('ai')"
                    style="display: flex !important; visibility: visible !important;">
                    <span class="mode-icon">🤖</span>
                    <span class="mode-label" style="display: block !important;">BhAI</span>
                    <span class="mode-cost" style="display: block !important;">₹1/msg</span>
                </button>
            </div>
        `;

        // Update wallet display
        this.updateChatWalletDisplay();

        // Update the mode UI
        this.updateChatModeUI();

        // Reset title
        const titleEl = document.getElementById('chatModeTitle');
        if (titleEl) {
            titleEl.textContent = this.chatMode === 'ai' ? 'Talk to BhAI 🤖' : 'Talk to Real Bhai';
        }
    },

    // Show premium modal when guest limit is reached
    showGuestLimitReached() {
        // Create the modal HTML
        const modalHtml = `
            <div class="guest-limit-modal" id="guestLimitModal" style="
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
                padding: 1rem;
                animation: fadeIn 0.3s ease;
            ">
                <div class="limit-modal-content" style="
                    background: linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%);
                    border-radius: 24px;
                    padding: 2.5rem;
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 25px 80px rgba(139, 92, 246, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    position: relative;
                    overflow: hidden;
                ">
                    <!-- Floating particles -->
                    <div style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        overflow: hidden;
                        pointer-events: none;
                    ">
                        <div style="position: absolute; top: 10%; left: 10%; font-size: 1.5rem; animation: float 3s ease-in-out infinite;">✨</div>
                        <div style="position: absolute; top: 20%; right: 15%; font-size: 1rem; animation: float 4s ease-in-out infinite 0.5s;">⭐</div>
                        <div style="position: absolute; bottom: 20%; left: 15%; font-size: 1.2rem; animation: float 3.5s ease-in-out infinite 1s;">💎</div>
                    </div>

                    <!-- Lock icon -->
                    <div style="
                        width: 80px;
                        height: 80px;
                        margin: 0 auto 1.5rem;
                        background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1));
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2.5rem;
                        animation: pulse 2s ease-in-out infinite;
                    ">🔒</div>

                    <h3 style="
                        font-size: 1.5rem;
                        font-weight: 700;
                        margin-bottom: 0.5rem;
                        color: white;
                    ">Free Trial Ended! 🎯</h3>

                    <p style="
                        color: rgba(255, 255, 255, 0.7);
                        margin-bottom: 1.5rem;
                        font-size: 0.95rem;
                        line-height: 1.6;
                    ">
                        You've used your <strong style="color: #10b981;">3 free messages</strong> today!<br>
                        Login to unlock unlimited BhAI conversations.
                    </p>

                    <!-- Benefits -->
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 16px;
                        padding: 1rem;
                        margin-bottom: 1.5rem;
                        text-align: left;
                    ">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span>✅</span>
                            <span style="color: rgba(255,255,255,0.8); font-size: 0.85rem;">Unlimited BhAI conversations</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span>✅</span>
                            <span style="color: rgba(255,255,255,0.8); font-size: 0.85rem;">Chat with Real Bhai (human tutor!)</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span>✅</span>
                            <span style="color: rgba(255,255,255,0.8); font-size: 0.85rem;">Track your progress on leaderboards</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>✅</span>
                            <span style="color: rgba(255,255,255,0.8); font-size: 0.85rem;">Earn XP and level up!</span>
                        </div>
                    </div>

                    <!-- CTA Buttons -->
                    <button onclick="document.getElementById('guestLimitModal').remove(); openAuthModal();" style="
                        width: 100%;
                        background: linear-gradient(135deg, #8b5cf6, #6366f1);
                        color: white;
                        border: none;
                        padding: 1rem;
                        border-radius: 50px;
                        font-size: 1.1rem;
                        font-weight: 700;
                        cursor: pointer;
                        margin-bottom: 0.75rem;
                        transition: all 0.3s;
                        box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 35px rgba(139, 92, 246, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(139, 92, 246, 0.3)';">
                        🚀 Login Free
                    </button>

                    <button onclick="document.getElementById('guestLimitModal').remove();" style="
                        background: transparent;
                        color: rgba(255, 255, 255, 0.5);
                        border: none;
                        padding: 0.5rem;
                        font-size: 0.85rem;
                        cursor: pointer;
                    ">
                        Maybe Later
                    </button>

                    <p style="
                        margin-top: 1rem;
                        font-size: 0.75rem;
                        color: rgba(255, 255, 255, 0.4);
                    ">
                        🔄 Free trial resets every 24 hours
                    </p>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existing = document.getElementById('guestLimitModal');
        if (existing) existing.remove();

        // Add to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    closeStudentChat() {
        const modal = document.getElementById('studentChatModal');
        if (modal) modal.classList.remove('active');

        // Show the floating Bhai button again when chat is closed
        const bhaiContainer = document.querySelector('.bhai-container');
        if (bhaiContainer) {
            bhaiContainer.style.display = 'block';
        }

        // Restore navbar on mobile when chat is closed
        if (window.innerWidth <= 768) {
            const mainNavbar = document.querySelector('.navbar');
            if (mainNavbar) {
                mainNavbar.style.display = '';
            }
        }

        // Cleanup listener
        if (this.unsubscribeStudentChat) {
            this.unsubscribeStudentChat();
            this.unsubscribeStudentChat = null;
        }
    },

    // Student loads their chat
    async loadStudentChatHistory() {
        if (!this.db) return;

        const user = firebase.auth().currentUser;
        if (!user) return;

        const chatContainer = document.getElementById('studentChatMessages');
        const welcomeScreen = document.getElementById('bhaiWelcomeScreen');

        if (!chatContainer) return;

        console.log(`💬 Loading chat for: ${user.uid} `);

        // Get chatClearedAt timestamp from localStorage or Firebase
        let chatClearedAt = null;
        const profile = window.BroProPlayer?.load() || {};
        if (profile.chatClearedAt) {
            chatClearedAt = new Date(profile.chatClearedAt);
        }

        // Cleanup previous listener
        if (this.unsubscribeStudentChat) {
            this.unsubscribeStudentChat();
        }

        try {
            // Listen to messages WHERE recipientId == myUserId (messages FROM admin TO me)
            this.unsubscribeStudentChat = this.db
                .collection('messages')
                .where('recipientId', '==', user.uid)
                .onSnapshot((snapshot) => {
                    // Also fetch messages I SENT to admin
                    this.db.collection('messages')
                        .where('senderId', '==', user.uid)
                        .get()
                        .then((sentSnapshot) => {
                            const allMessages = [];

                            // Messages from admin to me
                            snapshot.forEach(doc => {
                                const data = doc.data();
                                const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
                                allMessages.push({ id: doc.id, ...data, timestamp });
                            });

                            // Messages I sent
                            sentSnapshot.forEach(doc => {
                                const data = doc.data();
                                const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
                                allMessages.push({ id: doc.id, ...data, timestamp });
                            });

                            // Filter out messages before chatClearedAt timestamp
                            let filteredMessages = chatClearedAt
                                ? allMessages.filter(msg => msg.timestamp > chatClearedAt)
                                : allMessages;

                            // Filter by chat mode (Real Bhai vs AI)
                            if (this.chatMode === 'ai') {
                                // AI mode: Show only AI messages
                                filteredMessages = filteredMessages.filter(msg => msg.isAI === true);
                            } else {
                                // Real Bhai mode: Show only non-AI messages (admin messages)
                                filteredMessages = filteredMessages.filter(msg => msg.isAI !== true);
                            }

                            console.log(`📨 Mode: ${this.chatMode}, showing ${filteredMessages.length} of ${allMessages.length} messages`);

                            if (filteredMessages.length === 0) {
                                if (welcomeScreen) {
                                    welcomeScreen.style.opacity = '1';
                                    welcomeScreen.style.zIndex = '2';
                                    welcomeScreen.style.display = 'flex';
                                }
                                chatContainer.innerHTML = '';
                                return;
                            }

                            // Hide welcome screen
                            if (welcomeScreen) {
                                welcomeScreen.style.opacity = '0';
                                setTimeout(() => {
                                    welcomeScreen.style.zIndex = '-1';
                                    welcomeScreen.style.display = 'none';
                                }, 300);
                            }

                            // Remove duplicates and sort
                            const uniqueMessages = Array.from(
                                new Map(filteredMessages.map(m => [m.id, m])).values()
                            );
                            uniqueMessages.sort((a, b) => a.timestamp - b.timestamp);

                            // Render
                            let html = '';
                            uniqueMessages.forEach(msg => {
                                const isAdmin = msg.senderId === 'admin';
                                const isAI = msg.isAI === true;
                                const isAIResponse = msg.messageType === 'ai' || msg.senderId === 'bhai-ai';
                                const isUserMessage = msg.senderId === user.uid;

                                // For AI conversations
                                if (isAI) {
                                    if (isAIResponse) {
                                        // AI Response - left side
                                        html += `
                                            <div class="bhai-chat-bubble bhai-bubble ai-response">
                                                <div class="bubble-avatar">
                                                    <img src="/assets/bhai-avatar.png" alt="BhAI" class="avatar-img">
                                                    <span class="ai-badge">🤖</span>
                                                </div>
                                                <div class="bubble-content">
                                                    <span class="bubble-sender">BhAI</span>
                                                    <p class="bubble-text">${this.formatAIResponse(msg.message || msg.text || '')}</p>
                                                </div>
                                                <span class="bubble-time">${this.formatTime(msg.timestamp)}</span>
                                            </div>
                                        `;
                                    } else {
                                        // User message to AI - right side
                                        html += `
                                            <div class="bhai-chat-bubble user-bubble">
                                                <div class="bubble-content">
                                                    <p class="bubble-text">${this.escapeHtml(msg.message || msg.text || '')}</p>
                                                </div>
                                                <span class="bubble-time">${this.formatTime(msg.timestamp)}</span>
                                            </div>
                                        `;
                                    }
                                } else {
                                    // Regular chat (Real Bhai)
                                    const msgClass = window.getMessageClass ? getMessageClass(msg.text, isAdmin) : (isAdmin ? 'admin-message' : 'user-message');
                                    const content = window.renderMessageContent ? renderMessageContent(msg.text || '') : this.escapeHtml(msg.text || '');

                                    html += '<div class="chat-message ' + msgClass + '">';
                                    if (isAdmin) {
                                        html += '<div class="admin-badge">👑 Bhai</div>';
                                    }
                                    html += '<div class="message-content">' + content + '</div>';
                                    html += '<div class="message-time">' + this.formatTime(msg.timestamp) + '</div>';
                                    html += '</div>';
                                }
                            });

                            chatContainer.innerHTML = html;

                            setTimeout(() => {
                                chatContainer.scrollTop = chatContainer.scrollHeight;
                            }, 50);
                        });
                }, (error) => {
                    console.error('❌ Chat error:', error);
                });

        } catch (error) {
            console.error('❌ Error loading chat:', error);
        }
    },

    // Student sends message - handles both Real Bhai and BhAI modes
    async sendStudentMessage() {
        const user = firebase.auth().currentUser;
        const input = document.getElementById('studentMessageInput');
        const text = input.value.trim();

        if (!text) return;

        // ============================================
        // GUEST MODE: Free Messages
        // ============================================
        if (!user) {
            const remaining = this.getGuestMessagesRemaining();

            if (remaining <= 0) {
                // Guest exhausted free messages - show login modal
                this.showGuestLimitReached();
                return;
            }

            // Guest can send! Use their free message
            this.guestMessagesUsed++;
            this.saveGuestMessageCount();

            console.log(`🎁 Guest used free message: ${this.guestMessagesUsed}/${this.GUEST_MAX_MESSAGES}`);

            // Clear input immediately
            input.value = '';
            input.focus();

            // Play sound
            if (window.BroProSounds) {
                BroProSounds.play('click');
            }

            // Handle guest AI message
            await this.handleGuestAIMessage(text);

            // Update remaining count in UI
            this.updateGuestUI();

            return;
        }

        // ============================================
        // LOGGED-IN USER: Wallet-based Messages
        // ============================================

        // Get cost based on mode
        const cost = this.chatMode === 'ai' ? 1 : 2;

        // Check wallet balance (new formula: XP/DIVISOR + walletAdded - walletSpent)
        const profile = window.BroProPlayer?.load() || {};
        const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
        const earnedFromXP = Math.floor((profile.xp || 0) / divisor);
        const addedViaPurchase = profile.walletAdded || 0;
        const spent = profile.walletSpent || 0;
        const currentBalance = Math.max(0, earnedFromXP + addedViaPurchase - spent);

        if (currentBalance < cost) {
            // Use the new premium insufficient funds popup with Add Money option
            if (window.BroProWallet) {
                BroProWallet.showInsufficientFunds(cost, currentBalance, 'bhai_chat');
            } else {
                this.showInsufficientFundsToast(cost, currentBalance);
            }
            return;
        }

        try {
            const senderName = user.displayName || profile.name || 'Student';

            // Clear input immediately
            input.value = '';
            input.focus();

            // Deduct from wallet
            profile.walletSpent = (profile.walletSpent || 0) + cost;
            window.BroProPlayer?.save(profile);
            this.updateChatWalletDisplay();

            // Sync walletSpent to Firestore for persistence (multiple places for safety)
            if (this.db) {
                const walletData = { walletSpent: profile.walletSpent };

                // 1. Save to presence collection (primary)
                this.db.collection('presence').doc(user.uid).set(walletData, { merge: true })
                    .then(() => console.log('💰 Wallet synced to presence:', profile.walletSpent))
                    .catch(e => console.error('❌ Presence sync failed:', e.message));

                // 2. Also save to leaderboard collection (backup - this is checked on login)
                this.db.collection('leaderboard').doc(user.uid).set(walletData, { merge: true })
                    .then(() => console.log('💰 Wallet synced to leaderboard:', profile.walletSpent))
                    .catch(e => console.error('❌ Leaderboard sync failed:', e.message));
            }

            // Play sound
            if (window.BroProSounds) {
                BroProSounds.play('click');
            }

            if (this.chatMode === 'ai') {
                // AI Mode - Call BhAI API
                await this.handleAIMessage(text, user, senderName);
            } else {
                // Real Bhai Mode - Send to Firebase
                await this.db.collection('messages').add({
                    senderId: user.uid,
                    senderName: senderName,
                    recipientId: 'admin',
                    text: text,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    read: false,
                    mode: 'real'
                });

                console.log('✅ Message sent to Real Bhai');
                this.loadStudentChatHistory();
            }

        } catch (error) {
            console.error('Error sending:', error);

            // Refund on error
            profile.walletSpent = Math.max(0, (profile.walletSpent || 0) - cost);
            window.BroProPlayer?.save(profile);
            this.updateChatWalletDisplay();

            alert('Failed to send message. No charge applied. Please try again.');
        }
    },

    // ============================================
    // GUEST AI MESSAGE HANDLER
    // ============================================
    async handleGuestAIMessage(text) {
        const chatContainer = document.getElementById('studentChatMessages');

        if (!chatContainer) return;

        // IMPORTANT: Hide the original default welcome screen
        const originalWelcome = document.getElementById('bhaiWelcomeScreen');
        if (originalWelcome) {
            originalWelcome.style.display = 'none';
        }

        // Clear welcome screen if present (both old and new formats)
        const welcomeScreen = chatContainer.querySelector('.guest-welcome-screen') || chatContainer.querySelector('.bhai-welcome-screen');
        if (welcomeScreen) {
            chatContainer.innerHTML = '';
        }

        // Show user's message immediately
        const userMsgHtml = `
            <div class="bhai-chat-bubble user-bubble" style="
                align-self: flex-end;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
                padding: 0.75rem 1rem;
                border-radius: 18px 18px 4px 18px;
                max-width: 80%;
                margin: 0.5rem 0;
            ">
                <p style="margin: 0;">${this.escapeHtml(text)}</p>
                <span style="font-size: 0.7rem; opacity: 0.7; display: block; margin-top: 0.25rem; text-align: right;">Just now</span>
            </div>
        `;
        chatContainer.insertAdjacentHTML('beforeend', userMsgHtml);

        // Show AI typing indicator
        const typingId = 'guest-ai-typing-' + Date.now();
        const typingHtml = `
            <div class="ai-typing-indicator" id="${typingId}" style="
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.05);
                border-radius: 18px 18px 18px 4px;
                margin: 0.5rem 0;
                align-self: flex-start;
            ">
                <div class="typing-dots" style="display: flex; gap: 0.25rem;">
                    <span class="dot" style="width: 8px; height: 8px; background: #a855f7; border-radius: 50%; animation: bounce 1.4s ease-in-out infinite;"></span>
                    <span class="dot" style="width: 8px; height: 8px; background: #a855f7; border-radius: 50%; animation: bounce 1.4s ease-in-out 0.2s infinite;"></span>
                    <span class="dot" style="width: 8px; height: 8px; background: #a855f7; border-radius: 50%; animation: bounce 1.4s ease-in-out 0.4s infinite;"></span>
                </div>
                <span style="font-size: 0.85rem; color: var(--text-secondary);">BhAI is thinking...</span>
            </div>
        `;
        chatContainer.insertAdjacentHTML('beforeend', typingHtml);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Add to guest conversation history
        this.aiConversationHistory.push({ role: 'user', content: text });

        // Keep only last 6 messages for guest context (limited history)
        if (this.aiConversationHistory.length > 6) {
            this.aiConversationHistory = this.aiConversationHistory.slice(-6);
        }

        try {
            // Check if roast mode is enabled
            const isRoastMode = window.BroProRoastMode ? BroProRoastMode.isEnabled() : false;

            // CLIENT-SIDE RETRY LOGIC - Try up to 3 times
            let data = null;
            let lastError = null;
            const maxRetries = 3;

            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    console.log(`🔄 BhAI API attempt ${attempt}/${maxRetries}...`);

                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

                    const response = await fetch('/api/bhai-ai', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            message: text,
                            conversationHistory: this.aiConversationHistory.slice(-4),
                            schoolConfig: this.schoolConfig,
                            isGuest: true,
                            roastMode: isRoastMode
                        }),
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);
                    data = await response.json();

                    if (data.success && data.response) {
                        console.log(`✅ BhAI succeeded on attempt ${attempt}`);
                        break; // Success! Exit retry loop
                    } else {
                        throw new Error(data.error || 'Invalid response from API');
                    }
                } catch (attemptError) {
                    lastError = attemptError;
                    console.warn(`❌ BhAI attempt ${attempt} failed:`, attemptError.message);

                    if (attempt < maxRetries) {
                        // Wait before retrying (1.5 seconds)
                        await new Promise(r => setTimeout(r, 1500));

                        // Update typing indicator to show retry
                        const typingEl = document.getElementById(typingId);
                        if (typingEl) {
                            const typingText = typingEl.querySelector('.typing-text, span:last-child');
                            if (typingText) {
                                typingText.textContent = `BhAI is thinking... (retry ${attempt})`;
                            }
                        }
                    }
                }
            }

            // Remove typing indicator
            const typingEl = document.getElementById(typingId);
            if (typingEl) typingEl.remove();

            if (data && data.success && data.response) {
                // Show AI response
                const aiMsgHtml = `
                    <div class="bhai-chat-bubble ai-bubble" style="
                        align-self: flex-start;
                        background: rgba(168, 85, 247, 0.1);
                        border: 1px solid rgba(168, 85, 247, 0.2);
                        padding: 0.75rem 1rem;
                        border-radius: 18px 18px 18px 4px;
                        max-width: 85%;
                        margin: 0.5rem 0;
                    ">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span style="font-size: 1.5rem;">🤖</span>
                            <span style="font-weight: 600; color: #a855f7; font-size: 0.85rem;">BhAI</span>
                            <span style="
                                background: rgba(16, 185, 129, 0.15);
                                color: #10b981;
                                padding: 0.15rem 0.4rem;
                                border-radius: 10px;
                                font-size: 0.65rem;
                                font-weight: 600;
                            ">FREE</span>
                        </div>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.5;">${this.formatAIResponse(data.response)}</p>
                        <span style="font-size: 0.7rem; color: var(--text-tertiary); display: block; margin-top: 0.5rem;">Just now</span>
                    </div>
                `;
                chatContainer.insertAdjacentHTML('beforeend', aiMsgHtml);

                // Add AI response to history
                this.aiConversationHistory.push({ role: 'assistant', content: data.response });

                console.log('✅ Guest BhAI response received');
            } else {
                throw new Error(lastError?.message || 'All retries failed');
            }

        } catch (error) {
            console.error('Guest AI error:', error);

            // Remove typing indicator
            const typingEl = document.getElementById(typingId);
            if (typingEl) typingEl.remove();

            // Show error message
            const errorMsgHtml = `
                <div style="
                    padding: 0.75rem 1rem;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    border-radius: 12px;
                    margin: 0.5rem 0;
                    align-self: flex-start;
                ">
                    <p style="margin: 0; color: #ef4444; font-size: 0.9rem;">
                        ❌ Oops! BhAI is taking a break. Try again in a moment!
                    </p>
                </div>
            `;
            chatContainer.insertAdjacentHTML('beforeend', errorMsgHtml);
        }

        chatContainer.scrollTop = chatContainer.scrollHeight;
    },

    // Handle AI message
    async handleAIMessage(text, user, senderName) {
        const chatContainer = document.getElementById('studentChatMessages');

        if (!chatContainer) return;

        // IMPORTANT: Hide the original default welcome screen (same as guest)
        const originalWelcome = document.getElementById('bhaiWelcomeScreen');
        if (originalWelcome) {
            originalWelcome.style.display = 'none';
        }

        // Clear welcome screen if present (both old and new formats)
        const welcomeScreen = chatContainer.querySelector('.guest-welcome-screen') || chatContainer.querySelector('.bhai-welcome-screen');
        if (welcomeScreen) {
            chatContainer.innerHTML = '';
        }
        // Show user's message immediately
        const userMsgHtml = `
            <div class="bhai-chat-bubble user-bubble">
                <div class="bubble-content">
                    <p class="bubble-text">${this.escapeHtml(text)}</p>
                </div>
                <span class="bubble-time">Just now</span>
            </div>
        `;
        chatContainer.insertAdjacentHTML('beforeend', userMsgHtml);

        // Show AI typing indicator
        const typingId = 'ai-typing-' + Date.now();
        const typingHtml = `
            <div class="ai-typing-indicator" id="${typingId}">
                <div class="typing-dots">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <span class="typing-text">BhAI is thinking...</span>
            </div>
        `;
        chatContainer.insertAdjacentHTML('beforeend', typingHtml);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Add to conversation history for context
        this.aiConversationHistory.push({ role: 'user', content: text });

        // Keep only last 10 messages for context
        if (this.aiConversationHistory.length > 20) {
            this.aiConversationHistory = this.aiConversationHistory.slice(-20);
        }

        try {
            // Ensure we have the latest school settings
            await this.loadSchoolSettings();

            // Check if roast mode is enabled
            const isRoastMode = window.BroProRoastMode ? BroProRoastMode.isEnabled() : false;

            // Prepare validated config
            const safeConfig = this.schoolConfig || {};
            console.log("📤 Sending BhAI Context:", safeConfig); // Debug log

            // CLIENT-SIDE RETRY LOGIC - Try up to 3 times
            let data = null;
            let lastError = null;
            const maxRetries = 3;

            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    console.log(`🔄 BhAI API attempt ${attempt}/${maxRetries}...`);

                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout for logged-in users

                    const response = await fetch('/api/bhai-ai', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            message: text,
                            conversationHistory: this.aiConversationHistory.slice(-10),
                            schoolConfig: safeConfig,
                            isAdmin: !!this.isAdmin,
                            roastMode: isRoastMode
                        }),
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);
                    data = await response.json();

                    if (data.success && data.response) {
                        console.log(`✅ BhAI succeeded on attempt ${attempt}`);
                        break; // Success! Exit retry loop
                    } else {
                        throw new Error(data.error || 'Invalid response from API');
                    }
                } catch (attemptError) {
                    lastError = attemptError;
                    console.warn(`❌ BhAI attempt ${attempt} failed:`, attemptError.message);

                    if (attempt < maxRetries) {
                        // Wait before retrying (1.5 seconds)
                        await new Promise(r => setTimeout(r, 1500));

                        // Update typing indicator to show retry
                        const typingEl = document.getElementById(typingId);
                        if (typingEl) {
                            const typingText = typingEl.querySelector('.typing-text');
                            if (typingText) {
                                typingText.textContent = `BhAI is thinking... (retry ${attempt})`;
                            }
                        }
                    }
                }
            }

            // Remove typing indicator
            const typingEl = document.getElementById(typingId);
            if (typingEl) typingEl.remove();

            // ============================================
            // HANDLE ADMIN UPDATES
            // ============================================
            if (data && data.adminUpdate && Object.keys(data.adminUpdate).length > 0 && this.isAdmin) {
                try {
                    // Save updates to Firestore
                    await this.db.collection('school_settings').doc('config').set(
                        data.adminUpdate,
                        { merge: true }
                    );

                    // Update local config
                    this.schoolConfig = { ...this.schoolConfig, ...data.adminUpdate };
                    console.log('🔧 School settings updated:', data.adminUpdate);
                } catch (err) {
                    console.error('Failed to save admin update:', err);
                }
            }

            if (data && data.success && data.response) {
                // Add AI response to history
                this.aiConversationHistory.push({ role: 'assistant', content: data.response });

                // Save user message to Firestore (for persistence) - DON'T let this break the chat
                if (this.db) {
                    try {
                        await this.db.collection('messages').add({
                            senderId: user.uid,
                            senderName: senderName,
                            recipientId: 'bhai-ai',
                            message: text,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            isAI: true,
                            messageType: 'user'
                        });

                        // Save AI response to Firestore (for persistence)
                        await this.db.collection('messages').add({
                            senderId: user.uid, // CHANGED FROM 'bhai-ai' TO PASS RULES
                            senderName: 'BhAI',
                            recipientId: user.uid,
                            message: data.response,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            isAI: true,
                            messageType: 'ai',
                            model: data.model || 'unknown'
                        });
                    } catch (firestoreErr) {
                        console.warn('⚠️ Failed to save chat to Firestore (not critical):', firestoreErr.message);
                        // Don't throw - let the chat continue working
                    }
                }

                // Determine model badge color and text
                const modelName = data.model || 'unknown';
                const isGemini = modelName.toLowerCase().includes('gemini');
                const isOpenRouter = modelName.toLowerCase().includes('openrouter');
                let modelBadge;

                if (isGemini) {
                    modelBadge = `<span style="background: linear-gradient(135deg, #4285f4, #34a853); color: white; font-size: 0.65rem; padding: 2px 6px; border-radius: 8px; margin-left: 6px;">✨ ${modelName}</span>`;
                } else if (isOpenRouter) {
                    modelBadge = `<span style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 0.65rem; padding: 2px 6px; border-radius: 8px; margin-left: 6px;">🌐 ${modelName}</span>`;
                } else {
                    modelBadge = `<span style="background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; font-size: 0.65rem; padding: 2px 6px; border-radius: 8px; margin-left: 6px;">🦙 ${modelName}</span>`;
                }

                // Show AI response with model badge
                const aiMsgHtml = `
                    <div class="bhai-chat-bubble bhai-bubble ai-response">
                        <div class="bubble-avatar">
                            <img src="/assets/bhai-avatar.png" alt="BhAI" class="avatar-img">
                            <span class="ai-badge">🤖</span>
                        </div>
                        <div class="bubble-content">
                            <span class="bubble-sender">BhAI ${modelBadge}</span>
                            <p class="bubble-text">${this.formatAIResponse(data.response)}</p>
                        </div>
                        <span class="bubble-time">Just now</span>
                    </div>
                `;
                chatContainer.insertAdjacentHTML('beforeend', aiMsgHtml);
                chatContainer.scrollTop = chatContainer.scrollHeight;

                /* 
                 * Save to Firestore:
                 * We must use senderId = user.uid to pass Firestore Security Rules (users can only create their own messages).
                 * We set messageType = 'ai' so the UI correctly renders it on the left side as an AI response.
                 */

                // Play success sound
                if (window.BroProSounds) {
                    BroProSounds.play('correct');
                }

                console.log('✅ BhAI responded using:', data.model || 'unknown model');
            } else {
                // Show error message with more detail
                const errorMsg = lastError?.message || data?.error || 'Unknown Error';
                this.showChatToast('❌ ' + errorMsg, 'error');
            }

        } catch (error) {
            console.error('AI API Error:', error);

            // Remove typing indicator
            const typingEl = document.getElementById(typingId);
            if (typingEl) typingEl.remove();

            this.showChatToast('❌ Error: ' + error.message, 'error');
        }
    },

    // Format AI response (handle markdown-like formatting)
    formatAIResponse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    },

    // Escape HTML to prevent XSS, but make URLs clickable
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        let escaped = div.innerHTML;

        // Make URLs clickable
        const urlRegex = /(https?:\/\/[^\s<]+)/g;
        escaped = escaped.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>');

        return escaped;
    },

    // Show insufficient funds toast
    showInsufficientFundsToast(cost, balance) {
        // Remove existing toast
        const existing = document.querySelector('.insufficient-funds-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'insufficient-funds-toast';
        toast.innerHTML = `
            <span>😢</span>
            <div>
                <strong>Insufficient Balance!</strong>
                <p style="margin:0;font-size:0.85rem;">Need ₹${cost}, have ₹${balance}. Play more quizzes to earn!</p>
            </div>
        `;
        document.body.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => toast.remove(), 3000);

        // Vibrate on mobile
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    },

    // Update wallet display in chat
    updateChatWalletDisplay() {
        const walletEl = document.getElementById('chatWalletAmount');
        if (walletEl && window.BroProPlayer) {
            const profile = BroProPlayer.load();
            const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
            const earnedFromXP = Math.floor((profile.xp || 0) / divisor);
            const addedViaPurchase = profile.walletAdded || 0;
            const spent = profile.walletSpent || 0;
            const balance = Math.max(0, earnedFromXP + addedViaPurchase - spent);
            walletEl.textContent = '₹' + balance;
        }

        // Also update wallet modal if open
        if (window.BroProWallet) {
            BroProWallet.updateAllWalletDisplays();
        }
    },

    // Clear student chat history - Premium feature
    // This only hides messages from user's view, admin can still see them
    async clearStudentChat() {
        const user = firebase.auth().currentUser;
        if (!user) {
            this.showChatToast('❌ Please login first', 'error');
            return;
        }

        // Show premium confirmation modal
        const confirmed = await this.showClearChatConfirmation();
        if (!confirmed) return;

        try {
            // Show loading state
            const chatContainer = document.getElementById('studentChatMessages');
            const welcomeScreen = document.getElementById('bhaiWelcomeScreen');

            if (chatContainer) {
                chatContainer.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;">
                        <div class="clear-chat-spinner"></div>
                        <p style="color: rgba(255,255,255,0.7);">Clearing messages...</p>
                    </div>
                `;
            }

            // Instead of deleting, save a "chatClearedAt" timestamp to user's profile
            // Messages before this timestamp will be hidden from user but visible to admin
            const clearTimestamp = new Date().toISOString();

            // Save to Firebase user document
            await this.db.collection('users').doc(user.uid).set({
                chatClearedAt: clearTimestamp
            }, { merge: true });

            // Also save to localStorage for immediate effect
            const profile = window.BroProPlayer?.load() || {};
            profile.chatClearedAt = clearTimestamp;
            if (window.BroProPlayer) {
                BroProPlayer.save(profile);
            } else {
                localStorage.setItem('supersite-player-profile', JSON.stringify(profile));
            }

            // Count messages that will be hidden (for display)
            const sentMessages = await this.db.collection('messages')
                .where('senderId', '==', user.uid)
                .where('recipientId', '==', 'admin')
                .get();

            const receivedMessages = await this.db.collection('messages')
                .where('recipientId', '==', user.uid)
                .where('senderId', '==', 'admin')
                .get();

            const hiddenCount = sentMessages.size + receivedMessages.size;

            // Clear UI with animation
            if (chatContainer) {
                chatContainer.innerHTML = '';
                chatContainer.style.opacity = '0';
                setTimeout(() => {
                    chatContainer.style.opacity = '1';
                }, 300);
            }

            // Show welcome screen again
            if (welcomeScreen) {
                welcomeScreen.style.display = 'flex';
            }

            // Play success sound
            if (window.BroProSounds) {
                BroProSounds.play('levelup');
            }

            // Show success toast
            this.showChatToast(`✅ Chat cleared! ${hiddenCount} messages hidden.`, 'success');

            console.log(`✅ Chat cleared for user ${user.uid} at ${clearTimestamp}`);

        } catch (error) {
            console.error('Error clearing chat:', error);
            this.showChatToast('❌ Failed to clear chat. Try again.', 'error');
        }
    },

    // Show premium confirmation modal
    showClearChatConfirmation() {
        return new Promise((resolve) => {
            // Create modal if doesn't exist
            let modal = document.getElementById('clearChatConfirmModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'clearChatConfirmModal';
                modal.innerHTML = `
                    <div class="clear-chat-confirm-backdrop" onclick="document.getElementById('clearChatConfirmModal').remove(); window.__clearChatResolve && window.__clearChatResolve(false);"></div>
                    <div class="clear-chat-confirm-box">
                        <div class="clear-confirm-icon">🗑️</div>
                        <h3>Clear Chat History?</h3>
                        <p>This will permanently delete all messages between you and admin. This action cannot be undone.</p>
                        <div class="clear-confirm-buttons">
                            <button class="clear-confirm-cancel" onclick="document.getElementById('clearChatConfirmModal').remove(); window.__clearChatResolve && window.__clearChatResolve(false);">
                                Cancel
                            </button>
                            <button class="clear-confirm-delete" onclick="document.getElementById('clearChatConfirmModal').remove(); window.__clearChatResolve && window.__clearChatResolve(true);">
                                <span>🗑️</span> Delete All
                            </button>
                        </div>
                    </div>
                `;
                modal.style.cssText = `
                    position: fixed;
                    inset: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.2s ease;
                `;
                document.body.appendChild(modal);

                // Add styles
                const style = document.createElement('style');
                style.textContent = `
                    .clear-chat-confirm-backdrop {
                        position: absolute;
                        inset: 0;
                        background: rgba(0,0,0,0.7);
                        backdrop-filter: blur(8px);
                    }
                    .clear-chat-confirm-box {
                        position: relative;
                        background: linear-gradient(145deg, #1a1a2e, #16213e);
                        border: 1px solid rgba(239, 68, 68, 0.3);
                        border-radius: 20px;
                        padding: 2rem;
                        max-width: 380px;
                        width: 90%;
                        text-align: center;
                        animation: slideUp 0.3s ease;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(239, 68, 68, 0.1);
                    }
                    .clear-confirm-icon {
                        font-size: 3rem;
                        margin-bottom: 1rem;
                        animation: shake 0.5s ease;
                    }
                    .clear-chat-confirm-box h3 {
                        color: #fff;
                        margin: 0 0 0.75rem;
                        font-size: 1.3rem;
                    }
                    .clear-chat-confirm-box p {
                        color: rgba(255,255,255,0.6);
                        font-size: 0.9rem;
                        margin: 0 0 1.5rem;
                        line-height: 1.5;
                    }
                    .clear-confirm-buttons {
                        display: flex;
                        gap: 0.75rem;
                    }
                    .clear-confirm-cancel {
                        flex: 1;
                        padding: 0.8rem 1rem;
                        background: rgba(255,255,255,0.1);
                        border: 1px solid rgba(255,255,255,0.2);
                        border-radius: 12px;
                        color: #fff;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .clear-confirm-cancel:hover {
                        background: rgba(255,255,255,0.15);
                    }
                    .clear-confirm-delete {
                        flex: 1;
                        padding: 0.8rem 1rem;
                        background: linear-gradient(135deg, #ef4444, #dc2626);
                        border: none;
                        border-radius: 12px;
                        color: #fff;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        transition: all 0.3s ease;
                    }
                    .clear-confirm-delete:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 5px 20px rgba(239, 68, 68, 0.4);
                    }
                    .clear-chat-spinner {
                        width: 40px;
                        height: 40px;
                        border: 3px solid rgba(255,255,255,0.1);
                        border-top-color: #ef4444;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite;
                    }
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(20px) scale(0.95); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    @keyframes shake {
                        0%, 100% { transform: rotate(0); }
                        25% { transform: rotate(-10deg); }
                        75% { transform: rotate(10deg); }
                    }
                `;
                document.head.appendChild(style);
            }

            // Store resolve function globally
            window.__clearChatResolve = resolve;
        });
    },

    // Show chat toast notification
    showChatToast(message, type = 'info') {
        // Remove existing toast
        const existingToast = document.querySelector('.chat-clear-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'chat-clear-toast';
        toast.innerHTML = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #3b82f6, #2563eb)'};
            border-radius: 12px;
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            z-index: 100000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: toastSlideUp 0.3s ease forwards;
        `;
        document.body.appendChild(toast);

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes toastSlideUp {
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Remove after 3s
        setTimeout(() => {
            toast.style.animation = 'toastSlideUp 0.3s ease reverse forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // ============================================
    // SEND MESSAGE FROM LEADERBOARD
    // ============================================
    sendMessageFromLeaderboard(playerId, playerName, playerEmail) {
        if (!this.isAdmin) {
            alert('⛔ Only admin can send messages!');
            return;
        }

        this.openMessageModal(playerId, playerName, playerEmail);
    },

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    // Helper to render avatar (handles both emoji and URL)
    getAvatarHtml(avatar, size = '2rem') {
        if (!avatar) return '🐼';

        // Check if it's a URL (Google profile picture)
        if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
            return '<img src="' + avatar + '" alt="Avatar" style="width: ' + size + '; height: ' + size + '; border-radius: 50%; object-fit: cover;">';
        }

        // It's an emoji
        return avatar;
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    formatTime(date) {
        if (!date) return '';
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
        return date.toLocaleDateString();
    },

    truncateText(text, maxLength) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },

    // Cleanup
    cleanup() {
        if (this.unsubscribeMessages) this.unsubscribeMessages();
        if (this.unsubscribeOnlineUsers) this.unsubscribeOnlineUsers();
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        BroProAdmin.init();
    }, 1000);
});

// Global access
window.BroProAdmin = BroProAdmin;

// ============================================
// SCHOOL SETTINGS MANAGEMENT
// ============================================
BroProAdmin.showToast = function (message) {
    const toast = document.getElementById('adminToast');
    if (!toast) {
        alert(message);
        return;
    }

    const msgEl = document.getElementById('toastMessage');
    if (msgEl) msgEl.textContent = message;

    toast.style.display = 'flex';
    // Small delay to allow display:flex to apply before adding class for transition
    setTimeout(() => toast.classList.add('active'), 10);

    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.style.display = 'none', 300);
    }, 3000);
};

BroProAdmin.loadSchoolSettings = async function () {
    try {
        if (!this.db) return;
        const doc = await this.db.collection('school_settings').doc('config').get();
        if (doc.exists) {
            this.schoolConfig = doc.data();
            console.log('🏫 School settings loaded:', this.schoolConfig);
        } else {
            console.log('🏫 No custom settings found, using defaults.');
            this.schoolConfig = null;
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
};

// ============================================
// SCHOOL SETTINGS MODAL (Manual Edit)
// ============================================

BroProAdmin.openSchoolSettingsModal = async function () {
    // 1. Check if modal exists, if not create it
    if (!document.getElementById('schoolSettingsModal')) {
        this.createSchoolSettingsModal();
    }

    // 2. Load latest data (in case it changed)
    this.showAdminToast('loading', 'Loading settings...');
    await this.loadSchoolSettings();
    this.closeAdminToast(); // Helper if exists, or simple toast update

    // 3. Populate fields
    const config = this.schoolConfig || {};

    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
    };

    setVal('settingHoliday', config.upcomingHoliday);
    setVal('settingAnnouncements', config.announcements);
    setVal('settingEvents', config.recentEvents);
    setVal('settingResults', config.examResults);
    setVal('settingCompassion', config.compassionFund);

    // 4. Show modal
    const modal = document.getElementById('schoolSettingsModal');
    if (modal) modal.classList.add('active');
};

BroProAdmin.closeSchoolSettingsModal = function () {
    const modal = document.getElementById('schoolSettingsModal');
    if (modal) modal.classList.remove('active');
};

BroProAdmin.closeAdminToast = function () {
    const toast = document.getElementById('adminToast');
    if (toast) toast.classList.remove('show');
}

BroProAdmin.createSchoolSettingsModal = function () {
    const modalHtml = `
    <div class="modal-overlay" id="schoolSettingsModal" onclick="if(event.target === this) BroProAdmin.closeSchoolSettingsModal()">
        <div class="modal-content" style="max-width: 800px; width: 95%; max-height: 90vh; overflow-y: auto; background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid rgba(255,255,255,0.1);">
             <div class="admin-dashboard-header">
                <div class="admin-header-title">
                    <span class="crown-icon">⚙️</span>
                    <h2>School Settings</h2>
                </div>
                <button class="admin-close-btn" onclick="BroProAdmin.closeSchoolSettingsModal()">✕</button>
            </div>
            
            <div class="auth-form" style="margin-top: 1rem; background: transparent; padding: 0;">
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">
                    Update school information directly here. BhAI and the website will use this data immediately.
                </p>
                
                <div class="auth-field">
                    <label style="color: #cbd5e1;">🎉 Upcoming Holiday / Vacation</label>
                    <textarea id="settingHoliday" rows="3" placeholder="e.g. Winter Vacation from 29th Dec to 14th Jan..." style="background: rgba(255,255,255,0.05); color: white; border-color: rgba(255,255,255,0.1);"></textarea>
                </div>
                
                <div class="auth-field">
                    <label style="color: #cbd5e1;">📢 Announcements (News/Notices)</label>
                    <textarea id="settingAnnouncements" rows="5" placeholder="Important notices for students..." style="background: rgba(255,255,255,0.05); color: white; border-color: rgba(255,255,255,0.1);"></textarea>
                </div>
                
                <div class="auth-field">
                    <label style="color: #cbd5e1;">🏆 Exam Results / Toppers</label>
                    <textarea id="settingResults" rows="4" placeholder="Class 8 Toppers: 1. Name..." style="background: rgba(255,255,255,0.05); color: white; border-color: rgba(255,255,255,0.1);"></textarea>
                </div>
                
                <div class="auth-field">
                    <label style="color: #cbd5e1;">🎉 Recent Events</label>
                    <textarea id="settingEvents" rows="3" placeholder="Annual Function details..." style="background: rgba(255,255,255,0.05); color: white; border-color: rgba(255,255,255,0.1);"></textarea>
                </div>
                
                <div class="auth-field">
                    <label style="color: #cbd5e1;">💜 Compassion Fund Info</label>
                    <textarea id="settingCompassion" rows="3" placeholder="Details about Compassion Day/Fund..." style="background: rgba(255,255,255,0.05); color: white; border-color: rgba(255,255,255,0.1);"></textarea>
                </div>
                
                <button class="btn btn-primary btn-large" style="width: 100%; margin-top: 1rem; background: linear-gradient(135deg, #6366f1, #8b5cf6);" onclick="BroProAdmin.saveSchoolSettings()">
                    💾 Save Changes
                </button>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

BroProAdmin.saveSchoolSettings = async function () {
    const getVal = (id) => document.getElementById(id)?.value || '';

    const settings = {
        upcomingHoliday: getVal('settingHoliday'),
        announcements: getVal('settingAnnouncements'),
        recentEvents: getVal('settingEvents'),
        examResults: getVal('settingResults'),
        compassionFund: getVal('settingCompassion'),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: firebase.auth().currentUser?.email
    };

    // Show saving state
    const btn = document.querySelector('#schoolSettingsModal .btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Saving...';
    btn.disabled = true;

    try {
        await this.db.collection('school_settings').doc('config').set(settings, { merge: true });

        // Update local cache
        this.schoolConfig = settings;

        this.showAdminToast('success', '✅ Settings saved successfully!');

        setTimeout(() => {
            this.closeSchoolSettingsModal();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);

    } catch (error) {
        console.error('Error saving settings:', error);
        this.showAdminToast('error', '❌ Error saving: ' + error.message);
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};

// Note: Settings are now updated via chat commands!

// Admin can say "Change lunch time to 1:00 PM" and it will be saved automatically.

// Open Admin AI Chat - for updating settings via conversation
BroProAdmin.openAdminAIChat = function () {
    // Close admin dashboard first
    this.closeAdminDashboard();

    // Set chat mode to AI
    this.chatMode = 'ai';

    // Open the student chat (which works for admin too)
    this.openStudentChat();

    // Update UI to show AI mode
    setTimeout(() => {
        this.updateChatModeUI();

        // Show welcome message for admin
        const chatContainer = document.getElementById('studentChatMessages');
        if (chatContainer) {
            const welcomeHtml = `
                <div class="bhai-chat-bubble bhai-bubble ai-response admin-welcome">
                    <div class="bubble-avatar">
                        <img src="/assets/bhai-avatar.png" alt="BhAI" class="avatar-img">
                        <span class="ai-badge">🤖</span>
                    </div>
                    <div class="bubble-content">
                        <span class="bubble-sender">BhAI - Admin Mode</span>
                        <p class="bubble-text">
                            <strong>👑 Welcome, Admin!</strong><br><br>
                            You can update school settings by typing commands like:<br>
                            • "Change lunch time to 1:00 PM"<br>
                            • "Update principal to Dr. Sharma"<br>
                            • "Set holiday to 26th Jan: Republic Day"<br><br>
                            Just tell me what to update! 🚀
                        </p>
                    </div>
                    <span class="bubble-time">Just now</span>
                </div>
            `;
            chatContainer.innerHTML = welcomeHtml;
        }
    }, 300);
};

// ============================================
// ANIMATED EMOJI PICKER - Global Functions
// ============================================

// Emoji animation mapping
const EMOJI_ANIMATIONS = {
    '❤️': 'heartbeat',
    '💕': 'heartbeat',
    '😘': 'heartbeat',
    '🥰': 'heartbeat',
    '🔥': 'flame',
    '😂': 'laugh',
    '🤣': 'laugh',
    '😭': 'cry',
    '⭐': 'spin',
    '🤩': 'starstruck',
    '👍': 'thumbsup',
    '✌️': 'bounce',
    '👌': 'pulse',
    '👏': 'bounce',
    '🎉': 'party',
    '😍': 'love',
    '🚀': 'rocket',
    '💯': 'pulse',
    '💎': 'diamond',
    '🏆': 'shine',
    '👑': 'shine',
    '🙏': 'pray',
    '✅': 'bounce',
    '💪': 'muscle',
    '👀': 'look',
    '🤬': 'shake',
    '🤐': 'shake',
    '👹': 'pulse',
    '💩': 'bounce',
    '🕌': 'float',
    '🛕': 'float',
    '🇮🇳': 'wave'
};

// Toggle emoji picker visibility
function toggleEmojiPicker(type) {
    const pickerId = type === 'student' ? 'studentEmojiPicker' : 'adminEmojiPicker';
    const picker = document.getElementById(pickerId);

    if (picker) {
        picker.classList.toggle('active');

        // Close picker when clicking outside
        if (picker.classList.contains('active')) {
            setTimeout(() => {
                document.addEventListener('click', function closePickerHandler(e) {
                    if (!e.target.closest('.emoji-picker-container')) {
                        picker.classList.remove('active');
                        document.removeEventListener('click', closePickerHandler);
                    }
                });
            }, 100);
        }
    }
}

// Insert animated emoji and send
function insertAnimatedEmoji(type, emoji, animation) {
    const inputId = type === 'student' ? 'studentMessageInput' : 'adminMessageInput';
    const input = document.getElementById(inputId);
    const pickerId = type === 'student' ? 'studentEmojiPicker' : 'adminEmojiPicker';

    if (input) {
        // Set the emoji as the message with animation marker
        input.value = `{{EMOJI:${emoji}:${animation}}}`;

        // Close picker
        const picker = document.getElementById(pickerId);
        if (picker) picker.classList.remove('active');

        // Send immediately
        if (type === 'student') {
            BroProAdmin.sendStudentMessage();
        } else {
            BroProAdmin.sendAdminMessage();
        }
    }
}

// Check if message is an animated emoji
function isAnimatedEmoji(text) {
    if (!text) return null;

    // Check for emoji marker format
    const match = text.match(/^\{\{EMOJI:(.+):(.+)\}\}$/);
    if (match) {
        return { emoji: match[1], animation: match[2] };
    }

    // Check if it's just a single emoji with known animation
    const trimmed = text.trim();
    if (EMOJI_ANIMATIONS[trimmed]) {
        return { emoji: trimmed, animation: EMOJI_ANIMATIONS[trimmed] };
    }

    return null;
}

// Render message content (handles animated emojis and clickable links)
function renderMessageContent(text) {
    const emojiData = isAnimatedEmoji(text);

    if (emojiData) {
        return `<span class="emoji-animated ${emojiData.animation}">${emojiData.emoji}</span>`;
    }

    // Regular text - escape HTML first
    const div = document.createElement('div');
    div.textContent = text;
    let escaped = div.innerHTML;

    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    escaped = escaped.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>');

    return escaped;
}

// Get message CSS class (for big emoji styling)
function getMessageClass(text, isAdmin) {
    const baseClass = isAdmin ? 'admin-message' : 'user-message';
    const emojiData = isAnimatedEmoji(text);

    if (emojiData) {
        return `${baseClass} big-emoji-message`;
    }

    return baseClass;
}

// Make functions globally available
window.toggleEmojiPicker = toggleEmojiPicker;
window.insertAnimatedEmoji = insertAnimatedEmoji;
window.isAnimatedEmoji = isAnimatedEmoji;
window.renderMessageContent = renderMessageContent;
window.getMessageClass = getMessageClass;

// ============================================
// PREMIUM BHAI NOTIFICATION SYSTEM
// ============================================

let lastNotifiedMessageId = null;
let notificationListener = null;
let isStudentChatOpen = false;

// Show the premium notification popup - HIGHEST PRIORITY over games
// Show the premium notification popup - HIGHEST PRIORITY over games
function showBhaiNotification(messageText, messageId) {
    // 1. Check transient memory (current session)
    if (lastNotifiedMessageId === messageId) return;
    lastNotifiedMessageId = messageId;

    // 2. Check persistent storage (cross-session/reload)
    const seenMessages = JSON.parse(localStorage.getItem('bhai_seen_messages') || '[]');
    if (seenMessages.includes(messageId)) {
        console.log('Skipping already seen notification:', messageId);
        return;
    }

    // Don't show if chat is already open
    const chatModal = document.getElementById('studentChatModal');
    if (chatModal && chatModal.classList.contains('active')) return;

    const popup = document.getElementById('bhaiNotificationPopup');
    const previewBox = document.getElementById('bhaiMessagePreview');

    if (!popup) return;

    // FORCE HIGHEST Z-INDEX - Above all games and modals
    popup.style.zIndex = '9999999';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.right = '0';
    popup.style.bottom = '0';

    // Update message preview
    if (previewBox) {
        // Handle animated emoji display
        const emojiData = isAnimatedEmoji(messageText);
        let displayText = messageText;

        if (emojiData) {
            displayText = emojiData.emoji;
        }

        // Truncate long messages
        if (displayText.length > 100) {
            displayText = displayText.substring(0, 100) + '...';
        }

        previewBox.innerHTML = '<span class="preview-text">"' + displayText + '"</span>';
    }

    // Force animation restart by removing and re-adding class
    popup.classList.remove('active', 'closing');

    // Small delay to force browser reflow and restart animation
    requestAnimationFrame(() => {
        popup.classList.add('active');

        // Add pulsing effect to body to draw attention
        document.body.classList.add('bhai-notification-active');
    });

    // Play satisfying notification chime
    setTimeout(() => {
        playNotificationChime();

        // Vibrate if supported (for mobile devices)
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 200]);
        }
    }, 100);

    console.log('🔔 Bhai notification shown with HIGHEST PRIORITY!');
}

// Dismiss the notification
// Dismiss the notification
function dismissNotification() {
    // Mark as seen in persistent storage
    if (lastNotifiedMessageId) {
        try {
            const seen = JSON.parse(localStorage.getItem('bhai_seen_messages') || '[]');
            if (!seen.includes(lastNotifiedMessageId)) {
                seen.push(lastNotifiedMessageId);
                // Keep only last 50 IDs to avoid storage bloat
                if (seen.length > 50) seen.shift();
                localStorage.setItem('bhai_seen_messages', JSON.stringify(seen));
            }
        } catch (e) {
            console.error('Error saving seen message:', e);
        }
    }

    const popup = document.getElementById('bhaiNotificationPopup');
    if (!popup) return;

    popup.classList.add('closing');
    document.body.classList.remove('bhai-notification-active');

    setTimeout(() => {
        popup.classList.remove('active', 'closing');
    }, 400);
}

// Open chat from notification
function openChatFromNotification() {
    dismissNotification();

    // Check if we're on a subject page (not the main page)
    const currentPath = window.location.pathname;
    const isSubjectPage = currentPath.includes('/subjects/');

    if (isSubjectPage) {
        // Redirect to main page with query param to auto-open chat
        window.location.href = '/?openChat=true';
    } else {
        // We're on main page, just open chat directly
        setTimeout(() => {
            if (window.BroProAdmin && typeof BroProAdmin.openStudentChat === 'function') {
                BroProAdmin.openStudentChat();
            }
        }, 300);
    }
}

// Start listening for new messages (for notification)
function startNotificationListener() {
    const user = firebase.auth().currentUser;
    if (!user || !db) return;

    // Don't start if user is admin
    if (user.email === 'mohdekhlaqkhan@gmail.com') return;

    // Stop existing listener
    if (notificationListener) {
        notificationListener();
    }

    console.log('🔔 Starting notification listener for:', user.uid);

    // Listen for messages TO this user FROM admin
    notificationListener = db.collection('messages')
        .where('recipientId', '==', user.uid)
        .where('senderId', '==', 'admin')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const data = change.doc.data();
                    const messageId = change.doc.id;

                    // Check if this is a recent message (within last 30 seconds)
                    const timestamp = data.timestamp?.toDate?.() || new Date();
                    const now = new Date();
                    const diffSeconds = (now - timestamp) / 1000;

                    // Only notify for messages from last 30 seconds
                    if (diffSeconds < 30) {
                        // Check if chat is open
                        const chatModal = document.getElementById('studentChatModal');
                        const isChatOpen = chatModal && chatModal.classList.contains('active');

                        if (!isChatOpen && !data.read) {
                            showBhaiNotification(data.text, messageId);
                        }
                    }
                }
            });
        }, (error) => {
            console.error('Notification listener error:', error);
        });
}

// Stop notification listener
function stopNotificationListener() {
    if (notificationListener) {
        notificationListener();
        notificationListener = null;
    }
}

// Track when chat is opened/closed
function trackChatOpenState() {
    // Override the openStudentChat to track state
    const originalOpen = BroProAdmin.openStudentChat;
    BroProAdmin.openStudentChat = function () {
        isStudentChatOpen = true;
        originalOpen.call(this);
    };

    const originalClose = BroProAdmin.closeStudentChat;
    BroProAdmin.closeStudentChat = function () {
        isStudentChatOpen = false;
        originalClose.call(this);
    };
}

// Initialize notification system when user logs in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Delay to let other systems initialize
        setTimeout(() => {
            startNotificationListener();
            trackChatOpenState();
        }, 2000);
    } else {
        stopNotificationListener();
    }
});

// Make notification functions globally available
window.showBhaiNotification = showBhaiNotification;
window.dismissNotification = dismissNotification;
window.openChatFromNotification = openChatFromNotification;

// ============================================
// PREMIUM NOTIFICATION CHIME SOUND
// ============================================

let audioContext = null;
let audioInitialized = false;

// Initialize audio context on first user interaction (required by browsers)
function initializeAudioContext() {
    if (audioInitialized) return;

    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioInitialized = true;
        console.log('🔊 Audio context initialized');

        // Remove listeners after first init
        document.removeEventListener('click', initializeAudioContext);
        document.removeEventListener('touchstart', initializeAudioContext);
        document.removeEventListener('keydown', initializeAudioContext);
    } catch (e) {
        console.log('Could not init audio:', e.message);
    }
}

// Set up listeners to init audio on first interaction
document.addEventListener('click', initializeAudioContext);
document.addEventListener('touchstart', initializeAudioContext);
document.addEventListener('keydown', initializeAudioContext);

function playNotificationChime() {
    try {
        // Create audio context if not exists
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioInitialized = true;
        }

        // Resume if suspended (browsers suspend by default)
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                actuallyPlayChime();
            });
        } else {
            actuallyPlayChime();
        }

    } catch (error) {
        console.log('Could not play notification sound:', error.message);
    }
}

function actuallyPlayChime() {
    if (!audioContext) return;

    const now = audioContext.currentTime;

    // Create a pleasant 3-note chime (like Telegram/iMessage)
    const notes = [
        { freq: 523.25, start: 0, duration: 0.15 },      // C5
        { freq: 659.25, start: 0.12, duration: 0.15 },   // E5
        { freq: 783.99, start: 0.24, duration: 0.25 }    // G5
    ];

    notes.forEach(note => {
        // Create oscillator for each note
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(note.freq, now + note.start);

        // Volume envelope for smooth sound
        gainNode.gain.setValueAtTime(0, now + note.start);
        gainNode.gain.linearRampToValueAtTime(0.4, now + note.start + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + note.start + note.duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(now + note.start);
        oscillator.stop(now + note.start + note.duration + 0.1);
    });

    // Add a subtle "ding" overtone for richness
    const dingOsc = audioContext.createOscillator();
    const dingGain = audioContext.createGain();

    dingOsc.type = 'triangle';
    dingOsc.frequency.setValueAtTime(1046.50, now); // C6 (high)

    dingGain.gain.setValueAtTime(0, now);
    dingGain.gain.linearRampToValueAtTime(0.2, now + 0.01);
    dingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    dingOsc.connect(dingGain);
    dingGain.connect(audioContext.destination);

    dingOsc.start(now);
    dingOsc.stop(now + 0.6);

    console.log('🔔 Notification chime played!');
}

window.playNotificationChime = playNotificationChime;
window.initializeAudioContext = initializeAudioContext;

// ============================================
// PROMO CODE MANAGEMENT SYSTEM
// ============================================
const PromoCodeManager = {
    // Real-time listener for promo codes
    promoCodesListener: null,

    // Open promo code management modal
    openPromoCodeManager() {
        if (!BroProAdmin.isAdmin) {
            alert('⛔ Access Denied! Admin only.');
            return;
        }

        // Create modal if it doesn't exist
        let modal = document.getElementById('promoCodeModal');
        if (!modal) {
            this.injectPromoCodeModal();
            modal = document.getElementById('promoCodeModal');
        }

        if (modal) {
            modal.classList.add('active');
            this.loadPromoCodes();
        }
    },

    closePromoCodeManager() {
        const modal = document.getElementById('promoCodeModal');
        if (modal) modal.classList.remove('active');

        // Stop the real-time listener when modal closes
        this.stopPromoCodesListener();
    },

    // Stop the real-time listener
    stopPromoCodesListener() {
        if (this.promoCodesListener) {
            this.promoCodesListener();
            this.promoCodesListener = null;
            console.log('🔇 Promo codes listener stopped');
        }
    },

    // Inject the promo code modal HTML
    injectPromoCodeModal() {
        const modalHTML = `
        <div class="modal-overlay" id="promoCodeModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; align-items: center; justify-content: center;">
            <div class="promo-manager-modal" style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; width: 90%; max-width: 600px; max-height: 85vh; overflow: hidden; box-shadow: 0 25px 80px rgba(0,0,0,0.5);">
                <div class="promo-header" style="padding: 1.5rem; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0; color: white; font-size: 1.4rem;">🎟️ Promo Code Manager</h2>
                    <button onclick="PromoCodeManager.closePromoCodeManager()" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; font-size: 1.2rem; cursor: pointer;">✕</button>
                </div>
                
                <div class="promo-create-section" style="padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <h3 style="margin: 0 0 1rem 0; color: #a8edea; font-size: 1rem;">➕ Create New Promo Code</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
                        <div>
                            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">📝 Promo Code</label>
                            <input type="text" id="newPromoCode" placeholder="e.g., SUMMER2024" 
                                   style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; text-transform: uppercase; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">💰 Discount %</label>
                            <input type="number" id="newPromoDiscount" placeholder="100 = Free" value="100" min="0" max="100"
                                   style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">👥 Max Uses</label>
                            <input type="number" id="newPromoMaxUses" placeholder="0 = Unlimited" value="0" min="0"
                                   style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">📅 Expiry Date</label>
                            <input type="date" id="newPromoExpiry" 
                                   style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; box-sizing: border-box;">
                        </div>
                    </div>
                    <div style="margin-top: 0.8rem;">
                        <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">💬 Success Message (Optional)</label>
                        <input type="text" id="newPromoMessage" placeholder="e.g., 🎉 Welcome to NPS Premium!" 
                               style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; box-sizing: border-box;">
                    </div>
                    <button onclick="PromoCodeManager.createPromoCode()" 
                            style="width: 100%; margin-top: 1rem; padding: 1rem; background: linear-gradient(135deg, #11998e, #38ef7d); border: none; border-radius: 12px; color: white; font-weight: 600; font-size: 1rem; cursor: pointer; transition: transform 0.2s;">
                        ✨ Create Promo Code
                    </button>
                </div>
                
                <div class="promo-list-section" style="padding: 1.5rem; overflow-y: auto; max-height: 300px;">
                    <h3 style="margin: 0 0 1rem 0; color: #a8edea; font-size: 1rem;">📋 Active Promo Codes</h3>
                    <div id="promoCodesList" style="display: flex; flex-direction: column; gap: 0.8rem;">
                        <div style="text-align: center; color: rgba(255,255,255,0.5); padding: 2rem;">Loading...</div>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add click-outside-to-close
        const modal = document.getElementById('promoCodeModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closePromoCodeManager();
        });

        // Style for active state and real-time update animations
        const style = document.createElement('style');
        style.textContent = `
            #promoCodeModal.active { display: flex !important; }
            #promoCodeModal input:focus { border-color: #667eea !important; outline: none; }
            .promo-code-item { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 1rem; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease; }
            .promo-code-item .code-info { flex: 1; }
            .promo-code-item .code-name { font-weight: 700; color: #a8edea; font-size: 1.1rem; }
            .promo-code-item .code-details { font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-top: 0.3rem; }
            .promo-code-item .code-actions { display: flex; gap: 0.5rem; }
            .promo-code-item button { padding: 0.5rem 1rem; border: none; border-radius: 8px; cursor: pointer; font-size: 0.85rem; }
            .promo-code-item .delete-btn { background: #ef4444; color: white; }
            .promo-code-item .toggle-btn { background: #667eea; color: white; }
            .promo-code-item.inactive { opacity: 0.5; }
            
            /* Usage badge styling for real-time visibility */
            .usage-badge { 
                background: linear-gradient(135deg, #667eea, #764ba2); 
                color: white; 
                padding: 0.2rem 0.5rem; 
                border-radius: 8px; 
                font-weight: 700; 
                font-size: 0.85rem;
                display: inline-block;
                min-width: 45px;
                text-align: center;
                animation: usagePulse 2s ease infinite;
            }
            
            /* Flash animation for real-time updates */
            @keyframes promoListFlash {
                0% { opacity: 0.7; transform: scale(0.98); }
                50% { opacity: 1; background: rgba(102, 126, 234, 0.1); }
                100% { opacity: 1; transform: scale(1); background: transparent; }
            }
            
            /* Pulse animation for usage badge */
            @keyframes usagePulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
                50% { box-shadow: 0 0 0 4px rgba(102, 126, 234, 0); }
            }
            
            /* Real-time update indicator */
            #promoCodesList::before {
                content: '🔴 LIVE';
                position: absolute;
                top: -25px;
                right: 10px;
                font-size: 0.7rem;
                color: #22c55e;
                background: rgba(34, 197, 94, 0.1);
                padding: 0.2rem 0.5rem;
                border-radius: 10px;
                animation: liveBlink 1.5s ease infinite;
            }
            
            @keyframes liveBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            .promo-list-section { position: relative; }
        `;
        document.head.appendChild(style);
    },

    // Create a new promo code
    // Create a new promo code
    async createPromoCode() {
        const code = document.getElementById('newPromoCode').value.toUpperCase().trim();
        const discount = parseInt(document.getElementById('newPromoDiscount').value) || 100;
        const maxUses = parseInt(document.getElementById('newPromoMaxUses').value) || 0;
        const expiry = document.getElementById('newPromoExpiry').value;
        const message = document.getElementById('newPromoMessage').value.trim();

        if (!code || code.length < 3) {
            alert('❌ Please enter a valid promo code (at least 3 characters)');
            return;
        }

        // Generate default message based on discount
        const defaultMessage = discount === 100
            ? `✅ ${code} applied! You get FREE access!`
            : `✅ ${code} applied! You get ${discount}% OFF!`;

        const promoData = {
            code: code,
            discount: discount,
            active: true,
            maxUses: maxUses,
            currentUses: 0,
            validUntil: expiry ? new Date(expiry).toISOString() : null,
            message: message || defaultMessage,
            createdAt: new Date().toISOString(),
            createdBy: BroProAdmin.ADMIN_EMAIL
        };

        // Save to Firebase (Cloud Storage)
        if (window.firebase && firebase.firestore) {
            try {
                const btn = document.querySelector('.promo-create-section button');
                const originalText = btn.innerHTML;
                btn.innerHTML = '⏳ Saving...';
                btn.disabled = true;

                await firebase.firestore().collection('promoCodes').doc(code).set(promoData);
                console.log('✅ Promo code saved to Firebase');

                // Clear form
                document.getElementById('newPromoCode').value = '';
                document.getElementById('newPromoDiscount').value = '100';
                document.getElementById('newPromoMaxUses').value = '0';
                document.getElementById('newPromoExpiry').value = '';
                document.getElementById('newPromoMessage').value = '';

                // Restore button
                btn.innerHTML = originalText;
                btn.disabled = false;

                // No need to manually reload - real-time listener will update automatically

                // Show success
                if (BroProAdmin.showAdminToast) {
                    BroProAdmin.showAdminToast('success', `✅ Cloud Promo Code "${code}" created!`);
                } else {
                    alert(`✅ Promo code "${code}" created successfully on Cloud!`);
                }

                if (window.BroProSounds) BroProSounds.play('correct');

            } catch (error) {
                console.error('Error saving to Firebase:', error);
                alert(`❌ Failed to save to Cloud: ${error.message}`);

                // Restore button
                const btn = document.querySelector('.promo-create-section button');
                if (btn) btn.disabled = false;
            }
        } else {
            alert('❌ Firebase not available! Cannot save to cloud.');
        }
    },

    // Load all promo codes with REAL-TIME listener
    loadPromoCodes() {
        const container = document.getElementById('promoCodesList');
        if (!container) return;

        // Store reference to this for use in callbacks
        const self = this;

        // Stop any existing listener first
        this.stopPromoCodesListener();

        // Show loading state
        container.innerHTML = '<div style="padding: 2rem; text-align: center; color: rgba(255,255,255,0.5);">⏳ Loading cloud codes...</div>';

        // Get hardcoded codes
        const hardcodedCodes = {
            'NPS_PREMIUM': { discount: 100, message: '✅ NPS Premium access granted!', active: true, isHardcoded: true }
        };

        // Play safe - wait for Firebase
        if (!window.firebase || !firebase.firestore) {
            container.innerHTML = '<div style="color: #ef4444; padding: 1rem;">❌ Firebase not connected</div>';
            return;
        }

        // Set up real-time listener for promo codes
        try {
            this.promoCodesListener = firebase.firestore().collection('promoCodes').onSnapshot(
                function (snapshot) {
                    // Get fresh container reference each time (in case DOM changed)
                    const freshContainer = document.getElementById('promoCodesList');
                    if (!freshContainer) {
                        console.log('⚠️ Promo codes container not found, skipping update');
                        return;
                    }

                    // Combine hardcoded codes with Firebase codes
                    const allCodes = { ...hardcodedCodes };

                    snapshot.forEach(function (doc) {
                        const data = doc.data();
                        allCodes[doc.id] = { ...data, isFirebase: true };
                    });

                    // Render codes using self reference
                    self.renderPromoCodes(freshContainer, allCodes);
                    console.log('📡 Promo codes updated in real-time:', Object.keys(allCodes).length, 'codes');
                },
                function (error) {
                    console.error('Could not load Firebase promo codes:', error.message);
                    const freshContainer = document.getElementById('promoCodesList');
                    if (freshContainer) {
                        freshContainer.innerHTML = `<div style="color: #ef4444; padding: 1rem;">❌ Error loading codes: ${error.message}</div>`;
                    }
                }
            );
            console.log('🔊 Real-time promo codes listener started');
        } catch (error) {
            console.error('Failed to set up promo codes listener:', error);
            container.innerHTML = `<div style="color: #ef4444; padding: 1rem;">❌ Failed to connect: ${error.message}</div>`;
        }
    },

    // Render promo codes to the container
    renderPromoCodes(container, allCodes) {
        const codeEntries = Object.entries(allCodes);

        if (codeEntries.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: rgba(255,255,255,0.5); padding: 2rem;">No promo codes yet. Create one above!</div>';
            return;
        }

        // Add flash animation to show real-time updates
        container.style.animation = 'none';
        container.offsetHeight; // Trigger reflow
        container.style.animation = 'promoListFlash 0.5s ease';

        container.innerHTML = codeEntries.map(([code, data]) => {
            const isActive = data.active !== false;
            const isExpired = data.validUntil && new Date(data.validUntil) < new Date();
            const status = isExpired ? '⏰ Expired' : (isActive ? '🟢 Active' : '🔴 Inactive');

            // Make usage count more prominent
            const currentUses = data.currentUses || 0;
            const maxUses = data.maxUses || 0;
            const usageInfo = maxUses ? `<span class="usage-badge">${currentUses}/${maxUses}</span> uses` : 'Unlimited uses';

            const expiryInfo = data.validUntil ? `Expires: ${new Date(data.validUntil).toLocaleDateString()}` : 'No expiry';
            const sourceLabel = data.isHardcoded ? '🔒 Built-in' : '☁️ Cloud';

            return `
                <div class="promo-code-item ${!isActive || isExpired ? 'inactive' : ''}" data-code="${code}">
                    <div class="code-info">
                        <div class="code-name">${code} ${sourceLabel}</div>
                        <div class="code-details">${data.discount}% off • ${usageInfo} • ${expiryInfo} • ${status}</div>
                    </div>
                    <div class="code-actions">
                        ${!data.isHardcoded ? `
                            <button class="toggle-btn" onclick="PromoCodeManager.togglePromoCode('${code}', ${isActive})">${isActive ? '⏸️ Pause' : '▶️ Enable'}</button>
                            <button class="delete-btn" onclick="PromoCodeManager.deletePromoCode('${code}')">🗑️</button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    },

    // Toggle promo code active state
    // Toggle promo code active state
    async togglePromoCode(code, currentStatus) {
        // Update Firebase
        if (window.firebase && firebase.firestore) {
            try {
                await firebase.firestore().collection('promoCodes').doc(code).update({
                    active: !currentStatus
                });
                console.log(`✅ Promo code ${code} toggled`);
                // No need to manually reload - real-time listener will update automatically
            } catch (error) {
                console.log('Firebase update error:', error.message);
                alert('❌ Failed to update status on cloud');
            }
        }
    },

    // Delete a promo code
    async deletePromoCode(code) {
        if (!confirm(`Delete promo code "${code}" from Cloud?`)) return;

        // Remove from Firebase
        if (window.firebase && firebase.firestore) {
            try {
                await firebase.firestore().collection('promoCodes').doc(code).delete();
                console.log('✅ Promo code deleted from Cloud');

                if (window.BroProAdmin && BroProAdmin.showAdminToast) {
                    BroProAdmin.showAdminToast('success', `🗑️ Promo code "${code}" deleted!`);
                }
                // No need to manually reload - real-time listener will update automatically
            } catch (error) {
                console.log('Firebase delete failed:', error.message);
                alert('❌ Failed to delete from cloud');
            }
        }
    }
};

// ============================================
// PREMIUM SUBSCRIPTION MANAGER
// ============================================
const PremiumManager = {
    premiumUsers: [],
    premiumSubscriptionsListener: null,

    async openPremiumManager() {
        if (!BroProAdmin.isAdmin) {
            alert('⛔ Access Denied!');
            return;
        }

        // Create modal if not exists
        if (!document.getElementById('premiumManagerModal')) {
            this.createPremiumManagerModal();
        }

        const modal = document.getElementById('premiumManagerModal');
        modal.classList.add('active');

        // Load premium users
        await this.loadPremiumUsers();

        // Start real-time listener for new subscriptions
        this.startPremiumListener();
    },

    // Real-time listener for premium subscriptions
    startPremiumListener() {
        if (this.premiumSubscriptionsListener) return; // Already listening

        try {
            const db = firebase.firestore();

            // Listen to premiumSubscriptions collection for real-time updates
            this.premiumSubscriptionsListener = db.collection('premiumSubscriptions')
                .orderBy('createdAt', 'desc')
                .limit(20)
                .onSnapshot(
                    (snapshot) => {
                        if (!snapshot.metadata.hasPendingWrites) {
                            // Only reload if changes are from server (not local)
                            snapshot.docChanges().forEach(change => {
                                if (change.type === 'added') {
                                    const data = change.doc.data();
                                    console.log('🔔 New premium subscription detected:', data.customerEmail);

                                    // Show toast notification
                                    if (BroProAdmin.showAdminToast) {
                                        BroProAdmin.showAdminToast('success', `🆕 New premium: ${data.customerEmail}`);
                                    }
                                }
                            });

                            // Reload the list
                            this.loadPremiumUsers();
                        }
                    },
                    (error) => {
                        console.error('Premium subscriptions listener error:', error);
                    }
                );

            console.log('🔊 Premium subscriptions real-time listener started');
        } catch (error) {
            console.error('Failed to start premium listener:', error);
        }
    },

    // Stop real-time listener
    stopPremiumListener() {
        if (this.premiumSubscriptionsListener) {
            this.premiumSubscriptionsListener();
            this.premiumSubscriptionsListener = null;
            console.log('🔇 Premium subscriptions listener stopped');
        }
    },

    closePremiumManager() {
        const modal = document.getElementById('premiumManagerModal');
        if (modal) modal.classList.remove('active');

        // Stop real-time listener to save resources
        this.stopPremiumListener();
    },

    createPremiumManagerModal() {
        const modalHTML = `
        <div id="premiumManagerModal" class="admin-modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; justify-content: center; align-items: center; padding: 1rem;">
            <div class="premium-manager-container" style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; width: 100%; max-width: 600px; max-height: 90vh; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.5); border: 1px solid rgba(255,215,0,0.2);">
                <!-- Header -->
                <div class="premium-manager-header" style="background: linear-gradient(135deg, #ffd700, #ff8c00); padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 0.8rem;">
                        <span style="font-size: 1.8rem;">👑</span>
                        <h2 style="margin: 0; color: #1a1a2e; font-size: 1.4rem;">Premium Subscriptions</h2>
                    </div>
                    <button onclick="PremiumManager.closePremiumManager()" style="background: rgba(0,0,0,0.2); border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; color: #1a1a2e;">×</button>
                </div>
                
                <!-- Grant Premium Section -->
                <div class="grant-premium-section" style="padding: 1rem 1.5rem; background: rgba(34,197,94,0.1); border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.5rem;">
                        <input type="email" id="grantPremiumEmail" placeholder="User email *" 
                            style="flex: 2; min-width: 180px; padding: 0.6rem 1rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; color: white; font-size: 0.9rem; outline: none;">
                        <input type="text" id="grantPremiumOrderId" placeholder="Order ID (optional)" 
                            style="flex: 1; min-width: 140px; padding: 0.6rem 1rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(96,165,250,0.3); border-radius: 8px; color: white; font-size: 0.9rem; outline: none;">
                        <button onclick="PremiumManager.grantPremiumByEmail()" 
                            style="background: linear-gradient(135deg, #22c55e, #16a34a); color: white; border: none; padding: 0.6rem 1.25rem; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; gap: 0.4rem; transition: all 0.3s; white-space: nowrap;">
                            ➕ Grant
                        </button>
                    </div>
                    <div style="font-size: 0.7rem; color: rgba(255,255,255,0.5);">
                        💡 Enter email (required) and Order ID (from Cashfree) to grant 1 year premium
                    </div>
                </div>
                
                <!-- Stats -->
                <div class="premium-stats" style="display: flex; gap: 1rem; padding: 1rem 1.5rem; background: rgba(255,215,0,0.1); border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #ffd700;" id="premiumUsersCount">0</div>
                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Active Premium</div>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #22c55e;" id="paidUsersCount">0</div>
                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Paid</div>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #60a5fa;" id="promoUsersCount">0</div>
                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Promo</div>
                    </div>
                </div>
                
                <!-- Users List -->
                <div class="premium-users-list" id="premiumUsersList" style="padding: 1rem; overflow-y: auto; max-height: 350px;">
                    <div style="text-align: center; color: rgba(255,255,255,0.5); padding: 2rem;">Loading...</div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add click-outside-to-close
        const modal = document.getElementById('premiumManagerModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closePremiumManager();
        });

        // Style for active state
        const style = document.createElement('style');
        style.textContent = `
            #premiumManagerModal.active { display: flex !important; }
            .premium-user-card {
                background: rgba(255,255,255,0.05);
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 0.8rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                border: 1px solid rgba(255,215,0,0.2);
                transition: all 0.3s ease;
            }
            .premium-user-card:hover {
                background: rgba(255,255,255,0.08);
                border-color: rgba(255,215,0,0.4);
            }
            .premium-user-avatar {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                background: rgba(255,215,0,0.1);
            }
            .premium-user-avatar img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
            }
            .premium-user-info {
                flex: 1;
            }
            .premium-user-name {
                font-weight: 600;
                color: white;
                font-size: 1rem;
            }
            .premium-user-email {
                font-size: 0.8rem;
                color: rgba(255,255,255,0.5);
            }
            .premium-user-meta {
                font-size: 0.75rem;
                color: rgba(255,215,0,0.8);
                margin-top: 0.3rem;
            }
            .premium-user-meta .promo-badge {
                background: rgba(96,165,250,0.2);
                color: #60a5fa;
                padding: 0.2rem 0.5rem;
                border-radius: 10px;
                font-size: 0.7rem;
            }
            .premium-user-meta .paid-badge {
                background: rgba(34,197,94,0.2);
                color: #22c55e;
                padding: 0.2rem 0.5rem;
                border-radius: 10px;
                font-size: 0.7rem;
            }
            .revoke-btn {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.85rem;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            .revoke-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 15px rgba(239,68,68,0.4);
            }
            .revoke-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(style);
    },

    async loadPremiumUsers() {
        const list = document.getElementById('premiumUsersList');
        if (!list) return;

        list.innerHTML = '<div style="text-align: center; color: rgba(255,255,255,0.5); padding: 2rem;">⏳ Loading premium users...</div>';

        try {
            const db = firebase.firestore();

            // Track unique premium users by their ID
            const premiumUsersMap = new Map();
            let paidCount = 0;
            let promoCount = 0;

            // 1. Get users with premium=true from users collection
            const usersSnapshot = await db.collection('users').where('premium', '==', true).get();

            // 2. Also get ALL presence data (we'll check for premium there too)
            const presenceSnapshot = await db.collection('presence').get();
            const presenceMap = {};
            presenceSnapshot.forEach(doc => {
                presenceMap[doc.id] = doc.data();
            });

            // 3. Process users from users collection first
            usersSnapshot.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                data._source = 'users';

                // Fallback to presence data for name/email if not in users collection
                const presenceData = presenceMap[doc.id] || {};
                if (!data.name || data.name === 'Unknown') {
                    data.name = presenceData.name || presenceData.displayName || data.displayName || 'Unknown';
                }
                if (!data.email) {
                    data.email = presenceData.email || '';
                }
                if (!data.avatar) {
                    data.avatar = presenceData.avatar || '🐼';
                }
                if (!data.photoURL) {
                    data.photoURL = presenceData.photoURL || null;
                }

                premiumUsersMap.set(doc.id, data);
            });

            // 4. Also check presence collection for users with premium=true
            // This catches users whose premium wasn't synced to 'users' collection
            presenceSnapshot.forEach(doc => {
                const presenceData = doc.data();

                // Check if this user has premium in presence but wasn't in users collection
                if (presenceData.premium === true && !premiumUsersMap.has(doc.id)) {
                    const data = {
                        id: doc.id,
                        name: presenceData.name || presenceData.displayName || 'Unknown',
                        displayName: presenceData.displayName || presenceData.name || 'Unknown',
                        email: presenceData.email || '',
                        avatar: presenceData.avatar || '🐼',
                        photoURL: presenceData.photoURL || null,
                        premium: true,
                        premiumExpiry: presenceData.premiumExpiry || null,
                        premiumGrantedAt: presenceData.premiumGrantedAt || null,
                        premiumPromoCode: presenceData.premiumPromoCode || null,
                        premiumPaymentRef: presenceData.premiumPaymentRef || null,
                        _source: 'presence'
                    };
                    premiumUsersMap.set(doc.id, data);
                    console.log('📍 Found premium user in presence collection:', presenceData.email || doc.id);
                }
            });

            // 5. Also try to get users from promoCodeUsage collection to find any premium grants
            try {
                const promoUsageSnapshot = await db.collection('promoCodeUsage').get();
                for (const doc of promoUsageSnapshot.docs) {
                    const usageData = doc.data();
                    const userEmail = usageData.userEmail;

                    // Check if this user is already in our map
                    let found = false;
                    premiumUsersMap.forEach(user => {
                        if (user.email === userEmail) {
                            found = true;
                        }
                    });

                    if (!found && userEmail) {
                        // Try to find this user by email in presence
                        for (const [uid, presData] of Object.entries(presenceMap)) {
                            if (presData.email === userEmail && !premiumUsersMap.has(uid)) {
                                // *** CRITICAL FIX: Skip if user has been explicitly revoked or set to non-premium ***
                                if (presData.premium === false || presData.premiumRevoked === true || presData.paymentStatus === 'REVOKED') {
                                    console.log('🚫 Skipping revoked user from promo usage:', userEmail);
                                    continue;
                                }

                                const data = {
                                    id: uid,
                                    name: presData.name || presData.displayName || usageData.userName || 'Unknown',
                                    displayName: presData.displayName || presData.name || usageData.userName || 'Unknown',
                                    email: userEmail,
                                    avatar: presData.avatar || '🐼',
                                    photoURL: presData.photoURL || null,
                                    premium: true,
                                    premiumPromoCode: usageData.code || null,
                                    _source: 'promoUsage'
                                };
                                premiumUsersMap.set(uid, data);
                                console.log('📍 Found premium user via promo usage:', userEmail);
                                break;
                            }
                        }
                    }
                }
            } catch (promoError) {
                console.log('Could not check promo code usage:', promoError.message);
            }

            // 6. *** CRITICAL: Check premiumSubscriptions collection ***
            // This is the authoritative server-side source for all Cashfree payments
            try {
                const subscriptionsSnapshot = await db.collection('premiumSubscriptions').get();

                for (const doc of subscriptionsSnapshot.docs) {
                    const subData = doc.data();
                    const customerEmail = (subData.customerEmail || '').toLowerCase();

                    // Check if subscription is revoked
                    if (subData.premium === false || subData.paymentStatus === 'REVOKED' || subData.premiumRevoked === true) {
                        continue;
                    }

                    // Skip if premium has expired
                    if (subData.premiumExpiry) {
                        const expiry = new Date(subData.premiumExpiry);
                        if (expiry < new Date()) {
                            continue; // Expired subscription
                        }
                    }

                    // Check if already found by email in premiumUsersMap
                    let alreadyInMap = false;
                    premiumUsersMap.forEach((user) => {
                        if (user.email && user.email.toLowerCase() === customerEmail) {
                            alreadyInMap = true;
                        }
                    });

                    if (alreadyInMap) {
                        continue;
                    }

                    // Try to find user in presence by email
                    if (customerEmail) {
                        let userId = null;
                        let userData = null;

                        for (const [uid, presData] of Object.entries(presenceMap)) {
                            if (presData.email && presData.email.toLowerCase() === customerEmail) {
                                userId = uid;
                                userData = presData;
                                break;
                            }
                        }

                        // *** CRITICAL FIX: If user is found but has been revoked in presence, DO NOT ADD ***
                        if (userData && (userData.premium === false || userData.premiumRevoked === true)) {
                            console.log('🚫 Skipping revoked user from subscription check:', customerEmail);
                            continue;
                        }

                        if (userId && !premiumUsersMap.has(userId)) {
                            const data = {
                                id: userId,
                                name: userData.name || userData.displayName || subData.customerName || 'Unknown',
                                displayName: userData.displayName || userData.name || subData.customerName || 'Unknown',
                                email: customerEmail,
                                avatar: userData.avatar || '🐼',
                                photoURL: userData.photoURL || null,
                                premium: true,
                                premiumExpiry: subData.premiumExpiry || null,
                                premiumGrantedAt: subData.premiumGrantedAt || subData.createdAt || null,
                                premiumPaymentRef: `cashfree_${subData.orderId || doc.id}`,
                                premiumPromoCode: subData.promoCode || null,
                                _source: 'premiumSubscriptions'
                            };
                            premiumUsersMap.set(userId, data);
                            console.log('📍 Added premium user from subscription:', customerEmail);
                        } else if (!userId) {
                            // User not found in presence - show as "Pending Sync" entry
                            // Generate a temporary ID for display purposes
                            const tempId = 'pending_' + doc.id;
                            if (!premiumUsersMap.has(tempId)) {
                                const data = {
                                    id: tempId,
                                    name: subData.customerName || 'Unknown',
                                    displayName: subData.customerName || 'Unknown',
                                    email: customerEmail,
                                    avatar: '⏳',
                                    photoURL: null,
                                    premium: true,
                                    premiumExpiry: subData.premiumExpiry || null,
                                    premiumGrantedAt: subData.premiumGrantedAt || subData.createdAt || null,
                                    premiumPaymentRef: `cashfree_${subData.orderId || doc.id}`,
                                    premiumPromoCode: subData.promoCode || null,
                                    _source: 'premiumSubscriptions_pending',
                                    _pendingSync: true
                                };
                                premiumUsersMap.set(tempId, data);
                                console.log('⏳ Added pending sync premium user:', customerEmail);
                            }
                        }
                    }
                }
            } catch (subError) {
                console.log('Could not check premium subscriptions:', subError.message);
            }

            // Convert map to array
            this.premiumUsers = Array.from(premiumUsersMap.values());

            // Count paid vs promo users
            this.premiumUsers.forEach(data => {
                const isPaidUser = data.premiumPaymentRef ||
                    (data.premiumPromoCode && (data.premiumPromoCode.startsWith('cashfree_') || data.premiumPromoCode.startsWith('paid_')));

                if (isPaidUser) {
                    paidCount++;
                }
                // Promo = has promo code that's not a payment reference
                if (data.premiumPromoCode && !data.premiumPromoCode.startsWith('cashfree_') && !data.premiumPromoCode.startsWith('paid_')) {
                    promoCount++;
                }
            });

            // Update stats
            document.getElementById('premiumUsersCount').textContent = this.premiumUsers.length;
            document.getElementById('paidUsersCount').textContent = paidCount;
            document.getElementById('promoUsersCount').textContent = promoCount;

            if (this.premiumUsers.length === 0) {
                list.innerHTML = `
                    <div style="text-align: center; color: rgba(255,255,255,0.5); padding: 3rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">👑</div>
                        <p>No premium users yet</p>
                    </div>
                `;
                return;
            }

            list.innerHTML = this.premiumUsers.map(user => {
                const avatarHtml = user.photoURL
                    ? `<img src="${user.photoURL}" alt="">`
                    : (user.avatar || '🐼');

                const expiry = user.premiumExpiry
                    ? new Date(user.premiumExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                    : 'Unknown';

                // Determine if paid (has payment ref) and/or promo (has promo code)
                const hasPaidRef = user.premiumPaymentRef || (user.premiumPromoCode && user.premiumPromoCode.startsWith('cashfree_'));
                const hasPromoCode = user.premiumPromoCode && !user.premiumPromoCode.startsWith('cashfree_') && !user.premiumPromoCode.startsWith('paid_');

                // Check if this is a pending sync user
                const isPendingSync = user._pendingSync || user.id.startsWith('pending_');

                // Build badges
                let badges = [];

                // Add pending sync badge first if applicable
                if (isPendingSync) {
                    badges.push(`<span class="pending-badge" style="background: rgba(251,191,36,0.2); color: #fbbf24; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem;">⏳ Pending Sync</span>`);
                }

                if (hasPaidRef) {
                    const paymentRef = user.premiumPaymentRef || user.premiumPromoCode;
                    badges.push(`<span class="paid-badge">💳 ${paymentRef}</span>`);
                }
                if (hasPromoCode) {
                    badges.push(`<span class="promo-badge">🎟️ ${user.premiumPromoCode}</span>`);
                }
                if (badges.length === 0 && user.premiumPromoCode) {
                    // Fallback for old format
                    const isPaid = user.premiumPromoCode.startsWith('paid_') || user.premiumPromoCode.startsWith('cashfree_');
                    badges.push(`<span class="${isPaid ? 'paid-badge' : 'promo-badge'}">${isPaid ? '💳' : '🎟️'} ${user.premiumPromoCode}</span>`);
                }
                if (badges.length === 0) {
                    badges.push(`<span class="promo-badge">🎟️ Promo</span>`);
                }

                // Add special styling for pending sync cards
                const pendingClass = isPendingSync ? 'pending-sync-card' : '';
                const pendingStyle = isPendingSync ? 'border: 1px dashed rgba(251,191,36,0.5); background: rgba(251,191,36,0.05);' : '';

                return `
                    <div class="premium-user-card ${pendingClass}" data-userid="${user.id}" style="${pendingStyle}">
                        <div class="premium-user-avatar">${avatarHtml}</div>
                        <div class="premium-user-info">
                            <div class="premium-user-name">${user.name || user.displayName || 'Unknown'}${isPendingSync ? ' <small style="color: #fbbf24;">(not logged in)</small>' : ''}</div>
                            <div class="premium-user-email">${user.email || ''}</div>
                            <div class="premium-user-meta">
                                ${badges.join(' + ')}
                                <span style="margin-left: 0.5rem; color: rgba(255,255,255,0.5);">Expires: ${expiry}</span>
                            </div>
                        </div>
                        <button class="revoke-btn" onclick="PremiumManager.revokePremium(event, '${user.id}', '${(user.name || user.displayName || 'User').replace(/'/g, "\\'")}')">
                            ❌ Revoke
                        </button>
                    </div>
                `;
            }).join('');

        } catch (error) {
            console.error('Error loading premium users:', error);
            list.innerHTML = `<div style="text-align: center; color: #ef4444; padding: 2rem;">❌ Error loading users: ${error.message}</div>`;
        }
    },

    async revokePremium(e, userId, userName) {
        if (!confirm(`Are you sure you want to REVOKE premium from "${userName}"?\n\nThis will take effect immediately.`)) {
            return;
        }

        const btn = e.target;
        btn.disabled = true;
        btn.textContent = '⏳ Revoking...';

        try {
            const db = firebase.firestore();

            // Update Firebase users collection
            await db.collection('users').doc(userId).set({
                premium: false,
                premiumExpiry: null,
                premiumRevokedAt: firebase.firestore.FieldValue.serverTimestamp(),
                premiumRevokedBy: 'admin'
            }, { merge: true });

            // Also update presence to trigger client-side update
            await db.collection('presence').doc(userId).set({
                premium: false,
                premiumExpiry: null,
                premiumRevoked: true,
                premiumRevokedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            // *** CRITICAL: Also revoke from premiumSubscriptions (Authoritative Source) ***
            try {
                // Find subscriptions linked to this user
                const subsSnapshot = await db.collection('premiumSubscriptions')
                    .where('userId', '==', userId)
                    .where('premium', '==', true)
                    .get();

                const batch = db.batch();
                let hasUpdates = false;

                subsSnapshot.forEach(doc => {
                    const docRef = db.collection('premiumSubscriptions').doc(doc.id);
                    batch.update(docRef, {
                        premium: false,
                        premiumRevoked: true,
                        premiumRevokedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        paymentStatus: 'REVOKED'
                    });
                    hasUpdates = true;
                });

                // Also check by email if userId wasn't linked properly
                // We need the email first
                const userDoc = await db.collection('users').doc(userId).get();
                if (userDoc.exists && userDoc.data().email) {
                    const email = userDoc.data().email;
                    const emailSubs = await db.collection('premiumSubscriptions')
                        .where('customerEmail', '==', email)
                        .where('premium', '==', true)
                        .get();

                    emailSubs.forEach(doc => {
                        const docRef = db.collection('premiumSubscriptions').doc(doc.id);
                        batch.update(docRef, {
                            premium: false,
                            premiumRevoked: true,
                            premiumRevokedAt: firebase.firestore.FieldValue.serverTimestamp(),
                            paymentStatus: 'REVOKED'
                        });
                        hasUpdates = true;
                    });
                }

                if (hasUpdates) {
                    await batch.commit();
                    console.log('✅ Revoked from premiumSubscriptions as well');
                }
            } catch (subError) {
                console.warn('⚠️ Could not revoke from premiumSubscriptions:', subError);
            }

            // Remove the card from UI
            const card = document.querySelector(`.premium-user-card[data-userid="${userId}"]`);
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateX(100px)';
                setTimeout(() => card.remove(), 300);
            }

            // Update count
            const countEl = document.getElementById('premiumUsersCount');
            if (countEl) {
                countEl.textContent = parseInt(countEl.textContent) - 1;
            }

            if (BroProAdmin.showAdminToast) {
                BroProAdmin.showAdminToast('success', `👑 Premium revoked from "${userName}"!`);
            }

            // Play sound
            if (window.BroProSounds) {
                BroProSounds.play('click');
            }

        } catch (error) {
            console.error('Error revoking premium:', error);
            alert('❌ Failed to revoke premium: ' + error.message);
            btn.disabled = false;
            btn.textContent = '❌ Revoke';
        }
    },

    // Grant premium to a user by email
    async grantPremiumByEmail() {
        const emailInput = document.getElementById('grantPremiumEmail');
        const orderIdInput = document.getElementById('grantPremiumOrderId');
        const email = emailInput.value.trim().toLowerCase();
        const orderId = orderIdInput ? orderIdInput.value.trim() : '';

        if (!email || !email.includes('@')) {
            alert('⚠️ Please enter a valid email address');
            return;
        }

        if (!confirm(`Grant 1 year of PREMIUM to:\n\n${email}\n${orderId ? `Order ID: ${orderId}\n` : ''}\nAre you sure?`)) {
            return;
        }

        try {
            const db = firebase.firestore();

            // Find user by email in presence collection
            const presenceSnapshot = await db.collection('presence')
                .where('email', '==', email)
                .get();

            let userId = null;
            let userData = null;

            if (!presenceSnapshot.empty) {
                // Found user in presence collection
                presenceSnapshot.forEach(doc => {
                    userId = doc.id;
                    userData = doc.data();
                });
            } else {
                // Try to find in users collection
                const usersSnapshot = await db.collection('users')
                    .where('email', '==', email)
                    .get();

                if (!usersSnapshot.empty) {
                    usersSnapshot.forEach(doc => {
                        userId = doc.id;
                        userData = doc.data();
                    });
                }
            }

            if (!userId) {
                // If user not found, strict check: require login
                // OPTIONAL: We could create a "pending" subscription in premiumSubscriptions even if user doesn't exist yet
                alert(`❌ User with email "${email}" not found!\n\nThe user must have logged in at least once.`);
                return;
            }

            // Calculate expiry date (1 year from now)
            const expiryDate = new Date();
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);

            const grantedAt = new Date().toISOString();

            // Construct payment ref
            let paymentRef = 'ADMIN_GRANT';
            if (orderId) {
                // maintain 'cashfree_' prefix convention if it looks like a cashfree ID or just raw if user prefers
                // The user asked to "edit the order ID", assuming they put the actual ID.
                // Let's standardise: if they type "order_123", we save "cashfree_order_123" unless they typed "cashfree_..."
                if (orderId.toLowerCase().startsWith('cashfree_')) {
                    paymentRef = orderId;
                } else {
                    paymentRef = 'cashfree_' + orderId;
                }
            }

            const premiumData = {
                premium: true,
                premiumExpiry: expiryDate.toISOString(),
                premiumGrantedAt: grantedAt,
                premiumPromoCode: 'ADMIN_GRANT',
                premiumPaymentRef: paymentRef,
                premiumGrantedByAdmin: true
            };

            const userInfo = {
                name: userData.name || userData.displayName || 'Unknown',
                displayName: userData.displayName || userData.name || 'Unknown',
                email: email,
                avatar: userData.avatar || '🐼',
                photoURL: userData.photoURL || null
            };

            // 1. Update users collection
            await db.collection('users').doc(userId).set({
                ...userInfo,
                ...premiumData
            }, { merge: true });

            // 2. Update presence collection
            await db.collection('presence').doc(userId).set({
                ...userInfo,
                ...premiumData
            }, { merge: true });

            // 3. Create entry in premiumSubscriptions (Authoritative Source)
            // This ensures it shows up even if user data sync has issues later
            if (orderId) {
                const subscriptionId = orderId.replace(/^cashfree_/i, ''); // clean ID for doc name
                await db.collection('premiumSubscriptions').doc(subscriptionId).set({
                    orderId: subscriptionId,
                    customerEmail: email,
                    customerName: userInfo.name,
                    orderAmount: 0, // Admin grant, unknown amount
                    paymentStatus: 'PAID', // Treated as paid
                    premium: true,
                    premiumExpiry: expiryDate.toISOString(),
                    premiumGrantedAt: grantedAt,
                    source: 'admin_manual_grant',
                    synced: true,
                    userId: userId,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }

            // Clear inputs
            emailInput.value = '';
            if (orderIdInput) orderIdInput.value = '';

            // Show success
            if (BroProAdmin.showAdminToast) {
                BroProAdmin.showAdminToast('success', `👑 Premium granted to "${email}"!`);
            } else {
                alert(`✅ Premium granted to ${email}!\nRef: ${paymentRef}`);
            }

            // Reload the list
            await this.loadPremiumUsers();

            // Play sound
            if (window.BroProSounds) {
                BroProSounds.play('levelup');
            }

        } catch (error) {
            console.error('Error granting premium:', error);
            alert('❌ Failed to grant premium: ' + error.message);
        }
    }
};

// Make available globally
window.PremiumManager = PremiumManager;

// Make available globally
window.PromoCodeManager = PromoCodeManager;

// ============================================
// BHAI CHATS MANAGER - View & Manage User-BhAI Conversations
// ============================================
const BhAIChatsManager = {
    db: null,
    currentUserId: null,
    currentUserName: null,
    usersList: [],

    async init() {
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            this.db = firebase.firestore();
        }
    },

    async openBhAIChatsManager() {
        await this.init();
        if (!this.db) {
            alert('Database not available');
            return;
        }

        // Create modal if not exists
        if (!document.getElementById('bhaiChatsManagerModal')) {
            this.createBhAIChatsModal();
        }

        document.getElementById('bhaiChatsManagerModal').classList.add('active');
        await this.loadUsersWithChats();
    },

    closeBhAIChatsManager() {
        const modal = document.getElementById('bhaiChatsManagerModal');
        if (modal) modal.classList.remove('active');
        this.currentUserId = null;
        this.currentUserName = null;
    },

    createBhAIChatsModal() {
        const modal = document.createElement('div');
        modal.id = 'bhaiChatsManagerModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px; background: linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 24px; overflow: hidden; max-height: 85vh; display: flex; flex-direction: column;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #8b5cf6, #a855f7, #ec4899); padding: 1.5rem 2rem; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <span style="font-size: 2rem;">🤖</span>
                        <h2 style="margin: 0; color: white; font-size: 1.5rem; font-weight: 700;">BhAI Conversations</h2>
                    </div>
                    <button onclick="BhAIChatsManager.closeBhAIChatsManager()" style="background: rgba(255,255,255,0.2); border: none; width: 44px; height: 44px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; color: white; transition: all 0.3s; backdrop-filter: blur(10px);">×</button>
                </div>

                <!-- Stats Bar -->
                <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem 2rem; display: flex; gap: 2rem; border-bottom: 1px solid rgba(139, 92, 246, 0.2);">
                    <div style="text-align: center;">
                        <div style="font-size: 1.75rem; font-weight: 700; color: #a855f7;" id="bhaiTotalUsers">0</div>
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Users with Chats</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.75rem; font-weight: 700; color: #22c55e;" id="bhaiTotalMessages">0</div>
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Total Messages</div>
                    </div>
                </div>

                <!-- Main Content -->
                <div style="display: flex; flex: 1; overflow: hidden;">
                    <!-- Users Sidebar -->
                    <div id="bhaiUsersSidebar" style="width: 280px; border-right: 1px solid rgba(139, 92, 246, 0.2); overflow-y: auto; background: rgba(0,0,0,0.2);">
                        <div style="padding: 1rem; border-bottom: 1px solid rgba(139, 92, 246, 0.15);">
                            <input type="text" id="bhaiUserSearch" placeholder="🔍 Search users..." 
                                style="width: 100%; padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; color: white; font-size: 0.875rem; outline: none; box-sizing: border-box;"
                                oninput="BhAIChatsManager.filterUsers(this.value)">
                        </div>
                        <div id="bhaiUsersList" style="padding: 0.5rem;">
                            <div style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.5);">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">⏳</div>
                                <div>Loading users...</div>
                            </div>
                        </div>
                    </div>

                    <!-- Chat Viewer -->
                    <div id="bhaiChatViewer" style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
                        <!-- Empty State -->
                        <div id="bhaiEmptyState" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.5); text-align: center; padding: 2rem;">
                            <div style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;">💬</div>
                            <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Select a User</div>
                            <div style="font-size: 0.875rem;">Click on a user to view their BhAI conversation</div>
                        </div>

                        <!-- Selected User Header (hidden initially) -->
                        <div id="bhaiSelectedUserHeader" style="display: none; padding: 1rem 1.5rem; background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.1)); border-bottom: 1px solid rgba(139, 92, 246, 0.2);">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <div id="bhaiSelectedAvatar" style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #8b5cf6, #a855f7); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 700; color: white;"></div>
                                    <div>
                                        <div id="bhaiSelectedName" style="font-weight: 600; color: white; font-size: 1rem;"></div>
                                        <div id="bhaiSelectedMeta" style="font-size: 0.75rem; color: rgba(255,255,255,0.5);"></div>
                                    </div>
                                </div>
                                <button id="bhaiDeleteChatBtn" onclick="BhAIChatsManager.confirmDeleteChat()" 
                                    style="background: linear-gradient(135deg, #ef4444, #dc2626); border: none; padding: 0.6rem 1.25rem; border-radius: 12px; color: white; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; transition: all 0.3s; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);">
                                    🗑️ Delete Chat
                                </button>
                            </div>
                        </div>

                        <!-- Messages Container (hidden initially) -->
                        <div id="bhaiMessagesContainer" style="display: none; flex: 1; overflow-y: auto; padding: 1.5rem; background: rgba(0,0,0,0.1);">
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeBhAIChatsManager();
        });
    },

    async loadUsersWithChats() {
        const usersList = document.getElementById('bhaiUsersList');
        if (!usersList) return;

        try {
            // Query all AI messages to find unique users
            const aiMessagesSnapshot = await this.db.collection('messages')
                .where('isAI', '==', true)
                .get();

            const usersMap = new Map();
            let totalMessages = 0;

            aiMessagesSnapshot.forEach(doc => {
                const data = doc.data();
                totalMessages++;

                // Get user ID from recipientId (for AI responses) or senderId (for user messages)
                const userId = data.recipientId || data.senderId;
                if (userId && userId !== 'admin' && userId !== 'bhai-ai') {
                    if (!usersMap.has(userId)) {
                        usersMap.set(userId, {
                            id: userId,
                            messageCount: 0,
                            lastMessage: null,
                            lastTimestamp: null
                        });
                    }
                    const user = usersMap.get(userId);
                    user.messageCount++;

                    const timestamp = data.timestamp?.toDate?.() || new Date();
                    if (!user.lastTimestamp || timestamp > user.lastTimestamp) {
                        user.lastTimestamp = timestamp;
                        user.lastMessage = data.message?.substring(0, 50) || 'Message';
                    }
                }
            });

            // Update stats
            document.getElementById('bhaiTotalUsers').textContent = usersMap.size;
            document.getElementById('bhaiTotalMessages').textContent = totalMessages;

            // Also get presence data for fallback user info
            const presenceSnapshot = await this.db.collection('presence').get();
            const presenceMap = {};
            presenceSnapshot.forEach(doc => {
                presenceMap[doc.id] = doc.data();
            });

            // Enrich with user names from users collection (with presence fallback)
            const usersArray = Array.from(usersMap.values());

            for (const user of usersArray) {
                try {
                    const userDoc = await this.db.collection('users').doc(user.id).get();
                    const presenceData = presenceMap[user.id] || {};

                    if (userDoc.exists) {
                        const userData = userDoc.data();
                        // Try users collection first, then presence as fallback
                        user.name = userData.displayName || userData.name || presenceData.name || presenceData.displayName || userData.email?.split('@')[0] || presenceData.email?.split('@')[0] || 'Unknown';
                        user.email = userData.email || presenceData.email || '';
                        user.photoURL = userData.photoURL || presenceData.photoURL || '';
                    } else {
                        // Fall back to presence collection
                        user.name = presenceData.displayName || presenceData.name || presenceData.email?.split('@')[0] || 'User ' + user.id.substring(0, 6);
                        user.email = presenceData.email || '';
                        user.photoURL = presenceData.photoURL || '';
                    }
                } catch (e) {
                    // Even on error, try presence data
                    const presenceData = presenceMap[user.id] || {};
                    user.name = presenceData.displayName || presenceData.name || presenceData.email?.split('@')[0] || 'User ' + user.id.substring(0, 6);
                    user.email = presenceData.email || '';
                    user.photoURL = presenceData.photoURL || '';
                }
            }

            // Sort by last message time
            usersArray.sort((a, b) => (b.lastTimestamp || 0) - (a.lastTimestamp || 0));
            this.usersList = usersArray;

            this.renderUsersList(usersArray);

        } catch (error) {
            console.error('Error loading users with chats:', error);
            usersList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #ef4444;">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
                    <div>Failed to load users</div>
                </div>
            `;
        }
    },

    renderUsersList(users) {
        const usersList = document.getElementById('bhaiUsersList');
        if (!usersList) return;

        if (users.length === 0) {
            usersList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.5);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">📭</div>
                    <div>No BhAI conversations yet</div>
                </div>
            `;
            return;
        }

        usersList.innerHTML = users.map(user => {
            const initial = (user.name || 'U').charAt(0).toUpperCase();
            const timeAgo = this.timeAgo(user.lastTimestamp);
            const isSelected = this.currentUserId === user.id;

            return `
                <div class="bhai-user-item" onclick="BhAIChatsManager.selectUser('${user.id}')"
                    style="padding: 0.875rem 1rem; margin-bottom: 0.5rem; border-radius: 12px; cursor: pointer; transition: all 0.3s; 
                    background: ${isSelected ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.2))' : 'rgba(255,255,255,0.03)'};
                    border: 1px solid ${isSelected ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255,255,255,0.05)'};">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; font-size: 1rem; flex-shrink: 0;">
                            ${initial}
                        </div>
                        <div style="flex: 1; min-width: 0;">
                            <div style="font-weight: 600; color: white; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${user.name}</div>
                            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${user.lastMessage || 'No messages'}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem;">
                        <span style="font-size: 0.7rem; color: rgba(255,255,255,0.4);">${timeAgo}</span>
                        <span style="background: rgba(139, 92, 246, 0.3); padding: 0.2rem 0.5rem; border-radius: 20px; font-size: 0.7rem; color: #a855f7; font-weight: 600;">${user.messageCount} msgs</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    filterUsers(query) {
        const filtered = this.usersList.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            (user.email && user.email.toLowerCase().includes(query.toLowerCase()))
        );
        this.renderUsersList(filtered);
    },

    async selectUser(userId) {
        this.currentUserId = userId;
        const user = this.usersList.find(u => u.id === userId);
        this.currentUserName = user?.name || 'User';

        // Update UI
        document.getElementById('bhaiEmptyState').style.display = 'none';
        document.getElementById('bhaiSelectedUserHeader').style.display = 'block';
        document.getElementById('bhaiMessagesContainer').style.display = 'block';

        // Update header
        const initial = (user?.name || 'U').charAt(0).toUpperCase();
        document.getElementById('bhaiSelectedAvatar').textContent = initial;
        document.getElementById('bhaiSelectedName').textContent = user?.name || 'Unknown User';
        document.getElementById('bhaiSelectedMeta').textContent = `${user?.messageCount || 0} messages • ${user?.email || 'No email'}`;

        // Re-render users list to show selection
        this.renderUsersList(this.usersList);

        // Load messages
        await this.loadUserMessages(userId);
    },

    async loadUserMessages(userId) {
        const container = document.getElementById('bhaiMessagesContainer');
        if (!container) return;

        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.5);">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">⏳</div>
                <div>Loading messages...</div>
            </div>
        `;

        try {
            // Get BhAI responses TO this user (AI is sender, user is recipient)
            // AND user messages TO BhAI (user is sender, recipient is bhai-ai)
            const [bhaiResponses, userMessages] = await Promise.all([
                // BhAI responses to user
                this.db.collection('messages')
                    .where('recipientId', '==', userId)
                    .where('isAI', '==', true)
                    .get(),
                // User messages to BhAI
                this.db.collection('messages')
                    .where('senderId', '==', userId)
                    .where('recipientId', '==', 'bhai-ai')
                    .get()
            ]);

            const messages = [];

            // BhAI responses - these are FROM BhAI TO user
            bhaiResponses.forEach(doc => {
                const data = doc.data();
                messages.push({
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp?.toDate?.() || new Date(),
                    isFromUser: false  // BhAI sent this
                });
            });

            // User messages - these are FROM user TO BhAI
            userMessages.forEach(doc => {
                const data = doc.data();
                messages.push({
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp?.toDate?.() || new Date(),
                    isFromUser: true  // User sent this
                });
            });

            // Remove duplicates and sort by timestamp
            const uniqueMessages = Array.from(new Map(messages.map(m => [m.id, m])).values());
            uniqueMessages.sort((a, b) => a.timestamp - b.timestamp);

            if (uniqueMessages.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.5);">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">💭</div>
                        <div>No messages found</div>
                    </div>
                `;
                return;
            }

            // Render messages with proper distinction
            // isFromUser was set during fetch: true = user sent this, false = BhAI sent this
            container.innerHTML = uniqueMessages.map(msg => {
                // Simple: use the isFromUser flag we set during data collection
                // User messages (isFromUser = true) go on RIGHT with purple
                // BhAI responses (isFromUser = false) go on LEFT with dark
                const isUserMessage = msg.isFromUser === true;

                const time = msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                const date = msg.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                return `
                    <div style="display: flex; justify-content: ${isUserMessage ? 'flex-end' : 'flex-start'}; margin-bottom: 1rem;">
                        <div style="max-width: 75%; padding: 1rem 1.25rem; border-radius: ${isUserMessage ? '18px 18px 4px 18px' : '18px 18px 18px 4px'}; 
                            background: ${isUserMessage ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.08)'};
                            border: ${isUserMessage ? 'none' : '1px solid rgba(255,255,255,0.1)'};
                            box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                            <div style="color: ${isUserMessage ? 'white' : 'rgba(255,255,255,0.9)'}; font-size: 0.9rem; line-height: 1.5; word-wrap: break-word;">
                                ${msg.message || 'No content'}
                            </div>
                            <div style="color: ${isUserMessage ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)'}; font-size: 0.7rem; margin-top: 0.5rem; text-align: right;">
                                ${date} • ${time} ${isUserMessage ? '📤' : '🤖'}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // Scroll to bottom
            container.scrollTop = container.scrollHeight;

        } catch (error) {
            console.error('Error loading messages:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #ef4444;">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
                    <div>Failed to load messages</div>
                </div>
            `;
        }
    },

    confirmDeleteChat() {
        if (!this.currentUserId || !this.currentUserName) {
            alert('Please select a user first');
            return;
        }

        const confirmed = confirm(
            `⚠️ DELETE ALL BHAI CHATS\n\n` +
            `Are you sure you want to delete ALL BhAI conversation history for "${this.currentUserName}"?\n\n` +
            `This action CANNOT be undone!`
        );

        if (confirmed) {
            this.deleteUserChat();
        }
    },

    async deleteUserChat() {
        if (!this.currentUserId) return;

        const deleteBtn = document.getElementById('bhaiDeleteChatBtn');
        if (deleteBtn) {
            deleteBtn.disabled = true;
            deleteBtn.innerHTML = '⏳ Deleting...';
        }

        try {
            // Get all AI messages for this user
            const [receivedSnapshot, sentSnapshot] = await Promise.all([
                this.db.collection('messages')
                    .where('recipientId', '==', this.currentUserId)
                    .where('isAI', '==', true)
                    .get(),
                this.db.collection('messages')
                    .where('senderId', '==', this.currentUserId)
                    .where('isAI', '==', true)
                    .get()
            ]);

            // Delete all messages in batches
            const batch = this.db.batch();
            let deleteCount = 0;

            receivedSnapshot.forEach(doc => {
                batch.delete(doc.ref);
                deleteCount++;
            });

            sentSnapshot.forEach(doc => {
                batch.delete(doc.ref);
                deleteCount++;
            });

            await batch.commit();

            // Show success
            if (window.BroProAdmin?.showAdminToast) {
                BroProAdmin.showAdminToast('success', `🗑️ Deleted ${deleteCount} messages from "${this.currentUserName}"`);
            } else {
                alert(`✅ Successfully deleted ${deleteCount} messages!`);
            }

            // Play sound
            if (window.BroProSounds) {
                BroProSounds.play('click');
            }

            // Reset view
            document.getElementById('bhaiEmptyState').style.display = 'flex';
            document.getElementById('bhaiSelectedUserHeader').style.display = 'none';
            document.getElementById('bhaiMessagesContainer').style.display = 'none';
            this.currentUserId = null;
            this.currentUserName = null;

            // Reload users list
            await this.loadUsersWithChats();

        } catch (error) {
            console.error('Error deleting chat:', error);
            alert('❌ Failed to delete chat: ' + error.message);
        } finally {
            if (deleteBtn) {
                deleteBtn.disabled = false;
                deleteBtn.innerHTML = '🗑️ Delete Chat';
            }
        }
    },

    timeAgo(date) {
        if (!date) return 'Unknown';
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
        if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
};

// Make available globally
window.BhAIChatsManager = BhAIChatsManager;

// Add promo code button and premium manager button to admin dashboard
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const adminStatsBar = document.querySelector('.admin-stats-bar');
        if (adminStatsBar) {
            // Add Promo Code Manager button
            if (!document.getElementById('promoCodeManagerBtn')) {
                const promoBtn = document.createElement('div');
                promoBtn.className = 'admin-stat-card';
                promoBtn.id = 'promoCodeManagerBtn';
                promoBtn.style.cssText = 'flex: 0 0 auto; min-width: 95px; width: 95px; cursor: pointer;';
                promoBtn.onclick = () => PromoCodeManager.openPromoCodeManager();
                promoBtn.innerHTML = `
                    <span class="stat-icon">🎟️</span>
                    <span class="stat-value">Promo</span>
                    <span class="stat-label">Manage Codes</span>
                `;
                adminStatsBar.appendChild(promoBtn);
            }

            // Add Premium Manager button
            if (!document.getElementById('premiumManagerBtn')) {
                const premiumBtn = document.createElement('div');
                premiumBtn.className = 'admin-stat-card';
                premiumBtn.id = 'premiumManagerBtn';
                premiumBtn.style.cssText = 'flex: 0 0 auto; min-width: 95px; width: 95px; cursor: pointer; background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.1)); border: 1px solid rgba(255,215,0,0.3);';
                premiumBtn.onclick = () => PremiumManager.openPremiumManager();
                premiumBtn.innerHTML = `
                    <span class="stat-icon">👑</span>
                    <span class="stat-value" style="color: #ffd700;">Premi.</span>
                    <span class="stat-label">Subscriptions</span>
                `;
                adminStatsBar.appendChild(premiumBtn);
            }

            // Add BhAI Chats Manager button
            if (!document.getElementById('bhaiChatsManagerBtn')) {
                const bhaiBtn = document.createElement('div');
                bhaiBtn.className = 'admin-stat-card';
                bhaiBtn.id = 'bhaiChatsManagerBtn';
                bhaiBtn.style.cssText = 'flex: 0 0 auto; min-width: 95px; width: 95px; cursor: pointer; background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(168,85,247,0.1)); border: 1px solid rgba(139,92,246,0.3);';
                bhaiBtn.onclick = () => BhAIChatsManager.openBhAIChatsManager();
                bhaiBtn.innerHTML = `
                    <span class="stat-icon">🤖</span>
                    <span class="stat-value" style="color: #a855f7;">BhAI</span>
                    <span class="stat-label">View Chats</span>
                `;
                adminStatsBar.appendChild(bhaiBtn);
            }
        }
    }, 1000);
});

// ============================================
// GLOBAL CHAT MODE FUNCTIONS
// ============================================

// Switch between Real Bhai and BhAI modes
function switchChatMode(mode) {
    if (!window.BroProAdmin) return;

    BroProAdmin.chatMode = mode;
    BroProAdmin.updateChatModeUI();

    // Reload chat history to show correct messages for this mode
    BroProAdmin.loadStudentChatHistory();

    // Play click sound
    if (window.BroProSounds) {
        BroProSounds.play('click');
    }

    console.log('💬 Chat mode switched to:', mode === 'ai' ? 'BhAI (AI)' : 'Real Bhai');
}

// Add updateChatModeUI to BroProAdmin
BroProAdmin.updateChatModeUI = function () {
    const realBtn = document.getElementById('realBhaiBtn');
    const aiBtn = document.getElementById('aiBhaiBtn');
    const titleEl = document.getElementById('chatModeTitle');
    const statusDot = document.getElementById('bhaiStatusDot');
    const statusText = document.getElementById('bhaiStatusText');

    if (this.chatMode === 'ai') {
        // AI Mode
        realBtn?.classList.remove('active');
        aiBtn?.classList.add('active');

        if (titleEl) titleEl.textContent = 'Talk to BhAI 🤖';
        if (statusDot) statusDot.style.background = '#a855f7';
        if (statusText) statusText.textContent = 'AI Ready 24/7';
    } else {
        // Real Bhai Mode
        aiBtn?.classList.remove('active');
        realBtn?.classList.add('active');

        if (titleEl) titleEl.textContent = 'Talk to Real Bhai';
        if (statusDot) statusDot.style.background = '#10b981';
        if (statusText) statusText.textContent = 'Online';
    }
};
