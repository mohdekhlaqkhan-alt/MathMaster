// ============================================
// SUPERSITE LEADERBOARD SYSTEM v2.0
// Clean, Real-time Firebase-powered leaderboards
// Currently supporting: Mathematics, English, GK & Global
// ============================================

const BroProLeaderboard = {
    db: null,
    currentUser: null,
    listeners: {},
    isInitialized: false,

    // Currently active subjects (All subjects now active)
    ACTIVE_SUBJECTS: ['math', 'mathematics', 'english', 'gk', 'hindi', 'science', 'geography', 'history', 'global'],

    // Admin password
    ADMIN_PASSWORD: 'Math#F786',
    ADMIN_EMAIL: 'mohdekhlaqkhan@gmail.com',

    // Pending delete info
    _pendingDelete: null,

    // ============================================
    // INITIALIZATION
    // ============================================

    init() {
        if (this.isInitialized) return;

        if (typeof firebase !== 'undefined' && firebase.firestore) {
            this.db = firebase.firestore();

            firebase.auth().onAuthStateChanged((user) => {
                this.currentUser = user;
                if (user) {
                    console.log('🏆 Leaderboard ready for:', user.displayName || user.email);
                }
            });

            this.isInitialized = true;
            console.log('🏆 Leaderboard System v2.0 Initialized (All Subjects Active)');
        } else {
            console.warn('Firebase not available');
        }
    },

    // ============================================
    // SCORE UPDATES (Real-time sync)
    // ============================================

    // Update Math score
    async updateMathScore(xp) {
        if (!this.currentUser || !this.db) {
            console.log('Not logged in or DB not ready');
            return false;
        }

        const userId = this.currentUser.uid;
        const profile = window.BroProPlayer?.load() || {};
        const name = profile.name || profile.displayName || this.currentUser.displayName || 'Player';
        const email = this.currentUser.email || '';
        const avatar = profile.avatar || '🐼';

        try {
            // Update Mathematics leaderboard
            await this.db.collection('leaderboards').doc('math').collection('players').doc(userId).set({
                name: name,
                email: email,
                xp: xp,
                avatar: avatar,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            console.log(`✅ Math score updated: ${xp} XP for ${name}`);

            // Also update Global score with total XP
            await this.updateGlobalScore();

            return true;
        } catch (error) {
            console.error('❌ Error updating math score:', error);
            return false;
        }
    },

    // Update Global score (total of all subjects)
    async updateGlobalScore() {
        if (!this.currentUser || !this.db) return false;

        const userId = this.currentUser.uid;
        const profile = window.BroProPlayer?.load() || {};
        const name = profile.name || profile.displayName || this.currentUser.displayName || 'Player';
        const email = this.currentUser.email || '';
        const avatar = profile.avatar || '🐼';
        const totalXP = profile.xp || 0;

        try {
            await this.db.collection('leaderboards').doc('global').collection('players').doc(userId).set({
                name: name,
                email: email,
                xp: totalXP,
                avatar: avatar,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            console.log(`🌍 Global score updated: ${totalXP} XP for ${name}`);
            return true;
        } catch (error) {
            console.error('❌ Error updating global score:', error);
            return false;
        }
    },

    // Generic subject score update (for compatibility)
    async updateSubjectScore(subject, xp, playerName) {
        console.log(`🎯 updateSubjectScore called: ${subject}, ${xp} XP`);

        // Normalize subject name
        const normalizedSubject = subject === 'mathematics' ? 'math' : subject;

        // Only process active subjects
        if (!this.ACTIVE_SUBJECTS.includes(normalizedSubject) && normalizedSubject !== 'global') {
            console.log(`⏸️ Subject ${subject} is paused`);
            return false;
        }

        // Ensure db is initialized
        if (!this.db) {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                this.db = firebase.firestore();
                console.log('📦 DB initialized on demand');
            } else {
                console.error('❌ Firebase not available');
                return false;
            }
        }

        // Get current user - try multiple sources
        const user = this.currentUser || (typeof firebase !== 'undefined' ? firebase.auth().currentUser : null);

        if (!user) {
            console.log('❌ No user logged in');
            this.saveToLocalStorage(normalizedSubject, xp, playerName);
            return false;
        }

        const userId = user.uid;
        const profile = window.BroProPlayer?.load() || {};
        const name = profile.name || profile.displayName || playerName || user.displayName || 'Player';
        const email = user.email || '';
        const avatar = profile.avatar || '🐼';
        const totalXP = profile.xp || 0;
        const level = profile.level || window.BroProPlayer?.calculateLevel(totalXP) || 1;

        console.log(`📊 User: ${name}, Subject XP: ${xp}, Total XP: ${totalXP}, Level: ${level}`);

        try {
            // 1. Update subject leaderboard (math)
            console.log(`📝 Writing to leaderboards/${normalizedSubject}/players/${userId}`);
            await this.db.collection('leaderboards').doc(normalizedSubject).collection('players').doc(userId).set({
                name: name,
                email: email,
                xp: xp,
                avatar: avatar,
                level: level,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            console.log(`✅ ${normalizedSubject} leaderboard updated: ${xp} XP, Level ${level}`);

            // 2. Update global leaderboard with TOTAL XP
            console.log(`📝 Writing to leaderboards/global/players/${userId}`);
            await this.db.collection('leaderboards').doc('global').collection('players').doc(userId).set({
                name: name,
                email: email,
                xp: totalXP,
                avatar: avatar,
                level: level,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            console.log(`✅ Global leaderboard updated: ${totalXP} XP, Level ${level}`);

            return true;
        } catch (error) {
            console.error(`❌ Error updating ${normalizedSubject}:`, error);
            this.saveToLocalStorage(normalizedSubject, xp, playerName);
            return false;
        }
    },

    // Update avatar across ALL leaderboards
    async updateAvatarAcrossLeaderboards(newAvatar) {
        if (!this.db) {
            console.log('❌ DB not available for avatar update');
            return false;
        }

        const user = this.currentUser || (typeof firebase !== 'undefined' ? firebase.auth().currentUser : null);
        if (!user) {
            console.log('❌ No user for avatar update');
            return false;
        }

        const userId = user.uid;
        const subjects = ['global', 'math', 'english', 'gk', 'hindi', 'science', 'geography', 'history'];

        console.log(`🎨 Updating avatar to ${newAvatar} across all leaderboards...`);

        try {
            const updatePromises = subjects.map(async (subject) => {
                try {
                    const docRef = this.db.collection('leaderboards').doc(subject).collection('players').doc(userId);
                    const doc = await docRef.get();

                    // Only update if user exists in this leaderboard
                    if (doc.exists) {
                        await docRef.update({
                            avatar: newAvatar,
                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                        console.log(`✅ Avatar updated in ${subject} leaderboard`);
                    }
                } catch (e) {
                    // Ignore errors for individual subjects
                    console.log(`⚠️ Could not update ${subject}:`, e.message);
                }
            });

            await Promise.all(updatePromises);
            console.log('🎉 Avatar sync complete!');
            return true;
        } catch (error) {
            console.error('❌ Avatar update error:', error);
            return false;
        }
    },

    // Update name across ALL leaderboards
    async updateNameAcrossLeaderboards(newName) {
        if (!this.db) {
            console.log('❌ DB not available for name update');
            return false;
        }

        const user = this.currentUser || (typeof firebase !== 'undefined' ? firebase.auth().currentUser : null);
        if (!user) {
            console.log('❌ No user for name update');
            return false;
        }

        const userId = user.uid;
        const subjects = ['global', 'math', 'english', 'gk', 'hindi', 'science', 'geography', 'history'];

        console.log(`📝 Updating name to "${newName}" across all leaderboards...`);

        try {
            const updatePromises = subjects.map(async (subject) => {
                try {
                    const docRef = this.db.collection('leaderboards').doc(subject).collection('players').doc(userId);
                    const doc = await docRef.get();

                    // Only update if user exists in this leaderboard
                    if (doc.exists) {
                        await docRef.update({
                            name: newName,
                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                        console.log(`✅ Name updated in ${subject} leaderboard`);
                    }
                } catch (e) {
                    // Ignore errors for individual subjects
                    console.log(`⚠️ Could not update ${subject}:`, e.message);
                }
            });

            await Promise.all(updatePromises);
            console.log('🎉 Name sync complete across all leaderboards!');
            return true;
        } catch (error) {
            console.error('❌ Name update error:', error);
            return false;
        }
    },

    // ============================================
    // ADMIN: SYNC ALL NAMES FROM GLOBAL TO SUBJECTS
    // This is a one-time migration to fix inconsistent names
    // ============================================
    async syncAllNamesFromGlobal() {
        if (!this.db) {
            console.error('❌ DB not available');
            return { success: false, message: 'Database not available' };
        }

        // Check if admin
        const user = firebase.auth().currentUser;
        if (!user || user.email !== this.ADMIN_EMAIL) {
            console.error('❌ Admin access required');
            return { success: false, message: 'Admin access required' };
        }

        console.log('🔄 Starting global name sync migration...');

        const subjects = ['math', 'english', 'gk', 'hindi', 'science', 'geography', 'history'];
        let updated = 0;
        let errors = 0;

        try {
            // 1. Get all users from global leaderboard
            const globalSnapshot = await this.db
                .collection('leaderboards')
                .doc('global')
                .collection('players')
                .get();

            console.log(`📊 Found ${globalSnapshot.size} users in global leaderboard`);

            // 2. For each user, sync their name to all subject leaderboards
            for (const doc of globalSnapshot.docs) {
                const userData = doc.data();
                const userId = doc.id;
                const correctName = userData.name;
                const userAvatar = userData.avatar;

                if (!correctName) continue;

                console.log(`👤 Syncing ${correctName} (${userId})...`);

                // Update each subject leaderboard
                for (const subject of subjects) {
                    try {
                        const subjectRef = this.db
                            .collection('leaderboards')
                            .doc(subject)
                            .collection('players')
                            .doc(userId);

                        const subjectDoc = await subjectRef.get();

                        if (subjectDoc.exists) {
                            const subjectData = subjectDoc.data();

                            // Check if name or avatar is different
                            if (subjectData.name !== correctName || subjectData.avatar !== userAvatar) {
                                await subjectRef.update({
                                    name: correctName,
                                    avatar: userAvatar,
                                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                });
                                console.log(`  ✅ Updated ${subject}: "${subjectData.name}" → "${correctName}"`);
                                updated++;
                            }
                        }
                    } catch (e) {
                        console.log(`  ⚠️ Error updating ${subject}:`, e.message);
                        errors++;
                    }
                }
            }

            const message = `✅ Migration complete! Updated ${updated} entries, ${errors} errors.`;
            console.log(message);
            return { success: true, message, updated, errors };

        } catch (error) {
            console.error('❌ Migration error:', error);
            return { success: false, message: error.message };
        }
    },

    // ============================================
    // REAL-TIME LEADERBOARD SUBSCRIPTIONS
    // ============================================

    // Subscribe to leaderboard (OPTIMIZED - uses caching instead of real-time)
    subscribeToLeaderboard(subject, callback) {
        const normalizedSubject = subject === 'mathematics' ? 'math' : subject;

        if (!this.db) {
            // Fallback to localStorage
            const data = this.getLocalLeaderboard(normalizedSubject);
            callback(data);
            return null;
        }

        // Cancel existing listener
        if (this.listeners[normalizedSubject]) {
            this.listeners[normalizedSubject]();
            delete this.listeners[normalizedSubject];
        }

        console.log(`📊 Loading ${normalizedSubject} leaderboard (cached)...`);

        // OPTIMIZATION: Use one-time read with caching instead of real-time listener
        // This reduces reads significantly while still showing fresh data
        const fetchLeaderboard = async () => {
            try {
                // Check cache first (1 minute TTL)
                const cacheKey = `leaderboard_${normalizedSubject}`;
                const cached = localStorage.getItem(cacheKey);
                const cacheTime = localStorage.getItem(`${cacheKey}_time`);
                const now = Date.now();

                // Use cache if less than 60 seconds old
                if (cached && cacheTime && (now - parseInt(cacheTime)) < 60000) {
                    const players = JSON.parse(cached);
                    console.log(`📦 Leaderboard from cache: ${players.length} players`);
                    callback(players);
                    return;
                }

                // Fetch fresh data
                const snapshot = await this.db
                    .collection('leaderboards')
                    .doc(normalizedSubject)
                    .collection('players')
                    .orderBy('xp', 'desc')
                    .limit(50)
                    .get();

                const players = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.email !== this.ADMIN_EMAIL) {
                        players.push({
                            id: doc.id,
                            name: data.name || 'Player',
                            email: data.email || '',
                            xp: data.xp || 0,
                            avatar: data.avatar || '🐼',
                            level: data.level || Math.floor((data.xp || 0) / 500) + 1
                        });
                    }
                });

                // Update cache
                localStorage.setItem(cacheKey, JSON.stringify(players));
                localStorage.setItem(`${cacheKey}_time`, now.toString());

                console.log(`📊 ${normalizedSubject}: ${players.length} players (fresh)`);
                callback(players);
            } catch (error) {
                console.error(`❌ Error fetching ${normalizedSubject}:`, error);
                const data = this.getLocalLeaderboard(normalizedSubject);
                callback(data);
            }
        };

        // Fetch immediately
        fetchLeaderboard();

        // Return a function that can be called to refresh
        const refreshInterval = setInterval(fetchLeaderboard, 60000); // Refresh every 60 seconds

        this.listeners[normalizedSubject] = () => {
            clearInterval(refreshInterval);
        };

        return this.listeners[normalizedSubject];
    },

    // One-time fetch
    async getLeaderboard(subject) {
        const normalizedSubject = subject === 'mathematics' ? 'math' : subject;

        if (!this.db) {
            return this.getLocalLeaderboard(normalizedSubject);
        }

        try {
            const snapshot = await this.db
                .collection('leaderboards')
                .doc(normalizedSubject)
                .collection('players')
                .orderBy('xp', 'desc')
                .limit(50)
                .get();

            const players = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.email !== this.ADMIN_EMAIL) {
                    players.push({
                        id: doc.id,
                        name: data.name || 'Player',
                        email: data.email || '',
                        xp: data.xp || 0,
                        avatar: data.avatar || '🐼',
                        level: data.level || Math.floor((data.xp || 0) / 500) + 1
                    });
                }
            });

            return players;
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return this.getLocalLeaderboard(normalizedSubject);
        }
    },

    // ============================================
    // LOCAL STORAGE FALLBACK
    // ============================================

    saveToLocalStorage(subject, xp, playerName) {
        const key = `supersite-leaderboard-${subject}`;
        const leaderboard = JSON.parse(localStorage.getItem(key) || '[]');
        const name = playerName || 'You';

        const existingIdx = leaderboard.findIndex(p => p.name === name);
        const entry = { name, xp, avatar: '🐼', updatedAt: Date.now() };

        if (existingIdx >= 0) {
            leaderboard[existingIdx] = entry;
        } else {
            leaderboard.push(entry);
        }

        leaderboard.sort((a, b) => b.xp - a.xp);
        localStorage.setItem(key, JSON.stringify(leaderboard));
    },

    getLocalLeaderboard(subject) {
        const key = `supersite-leaderboard-${subject}`;
        return JSON.parse(localStorage.getItem(key) || '[]');
    },

    // ============================================
    // USER RANK
    // ============================================

    async getUserRank(subject) {
        // Try to get user from multiple sources
        const user = this.currentUser ||
            (typeof firebase !== 'undefined' ? firebase.auth().currentUser : null);

        if (!user) {
            console.log('⚠️ No user for rank lookup');
            return { rank: '-', xp: 0 };
        }

        const normalizedSubject = subject === 'mathematics' ? 'math' : subject;
        const userId = user.uid;

        // Fetch all players for ranking
        const players = await this.getLeaderboard(normalizedSubject);
        const idx = players.findIndex(p => p.id === userId);

        if (idx >= 0) {
            console.log(`📊 User found at position ${idx + 1} with ${players[idx].xp} XP`);
            return { rank: idx + 1, xp: players[idx].xp };
        }

        // User not in leaderboard yet - get XP from profile
        const profile = window.BroProPlayer?.load() || {};
        let userXP = 0;

        if (normalizedSubject === 'global') {
            userXP = profile.xp || 0;
        } else {
            // Get subject-specific XP
            userXP = profile[`${normalizedSubject}Xp`] ||
                profile.subjectProgress?.[normalizedSubject]?.xp || 0;
        }

        // Calculate rank based on XP
        if (userXP > 0) {
            // Count how many players have more XP
            const playersAbove = players.filter(p => p.xp > userXP).length;
            const estimatedRank = playersAbove + 1;
            console.log(`📊 User not in leaderboard, estimated rank ${estimatedRank} with ${userXP} XP`);
            return { rank: estimatedRank > 50 ? '50+' : estimatedRank, xp: userXP };
        }

        console.log('📊 User has no XP in this subject');
        return { rank: '-', xp: 0 };
    },

    // ============================================
    // LEADERBOARD UI RENDERING
    // ============================================

    renderLeaderboard(containerId, subject, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const normalizedSubject = subject === 'mathematics' ? 'math' : subject;
        const period = options.period || 'alltime';

        // Show loading
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 2rem; animation: spin 1s linear infinite;">⏳</div>
                <p style="color: var(--text-secondary); margin-top: 0.5rem;">Loading leaderboard...</p>
            </div>
        `;

        // Fetch with period filter
        this.getLeaderboardWithPeriod(normalizedSubject, period).then(players => {
            this.renderPlayers(container, players, normalizedSubject, options);
        });
    },

    // Get leaderboard with time period filter
    async getLeaderboardWithPeriod(subject, period = 'alltime') {
        if (!this.db) {
            return this.getLocalLeaderboard(subject);
        }

        try {
            let query = this.db
                .collection('leaderboards')
                .doc(subject)
                .collection('players');

            // Apply time filter
            if (period !== 'alltime') {
                const now = new Date();
                let startDate;

                if (period === 'daily') {
                    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                } else if (period === 'weekly') {
                    const dayOfWeek = now.getDay();
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - dayOfWeek);
                    startDate.setHours(0, 0, 0, 0);
                }

                if (startDate) {
                    query = query.where('updatedAt', '>=', startDate);
                }
            }

            const snapshot = await query.orderBy('xp', 'desc').limit(50).get();

            const players = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.email !== this.ADMIN_EMAIL) {
                    players.push({
                        id: doc.id,
                        name: data.name || 'Player',
                        email: data.email || '',
                        xp: data.xp || 0,
                        avatar: data.avatar || '🐼',
                        level: data.level || Math.floor((data.xp || 0) / 500) + 1,
                        updatedAt: data.updatedAt
                    });
                }
            });

            console.log(`📊 ${subject} (${period}): ${players.length} players`);
            return players;
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            // Fallback: fetch without time filter
            return this.getLeaderboard(subject);
        }
    },

    renderPlayers(container, players, subject, options = {}) {
        const showDelete = options.showDelete || false;
        const maxDisplay = options.limit || 20;

        if (players.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <span style="font-size: 3rem;">🏆</span>
                    <p style="color: var(--text-secondary); margin-top: 1rem;">No scores yet! Be the first to play!</p>
                    <button onclick="BroProLeaderboard.renderLeaderboard('${container.id}', '${subject}')" style="
                        margin-top: 1rem;
                        background: rgba(99,102,241,0.1);
                        border: 1px solid rgba(99,102,241,0.2);
                        color: var(--primary);
                        padding: 0.5rem 1rem;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 0.8rem;
                        transition: all 0.2s;
                    ">🔄 Refresh</button>
                </div>
            `;
            return;
        }

        const displayPlayers = players.slice(0, maxDisplay);
        const currentUserId = this.currentUser?.uid;

        // Container styles with animated background and Refresh Button
        let html = `
            <div style="display: flex; justify-content: flex-end; margin-bottom: 0.5rem;">
                <button onclick="this.classList.add('spinning'); BroProLeaderboard.renderLeaderboard('${container.id}', '${subject}'); setTimeout(() => this.classList.remove('spinning'), 1000);" class="leaderboard-refresh-btn" style="
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
                    <span style="transition: transform 0.5s ease-in-out;" class="refresh-icon">🔄 Refresh</span>
                </button>
                <style>
                    .spinning .refresh-icon { transform: rotate(360deg); }
                </style>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        `;

        displayPlayers.forEach((player, index) => {
            const rank = index + 1;
            const isCurrentUser = player.id === currentUserId;
            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';

            // Calculate level from XP or use stored level
            const playerLevel = player.level || Math.floor((player.xp || 0) / 500) + 1;
            const levelInfo = this.getLevelBadgeInfo(playerLevel);

            // Background gradient for top 3
            let bgStyle = 'background: var(--bg-secondary, rgba(255,255,255,0.05));';
            if (rank === 1) bgStyle = 'background: linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,193,7,0.1)); box-shadow: 0 0 20px rgba(255,215,0,0.1);';
            if (rank === 2) bgStyle = 'background: linear-gradient(135deg, rgba(192,192,192,0.15), rgba(158,158,158,0.1));';
            if (rank === 3) bgStyle = 'background: linear-gradient(135deg, rgba(205,127,50,0.15), rgba(176,141,87,0.1));';
            if (isCurrentUser) bgStyle = 'background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1)); border: 1px solid rgba(99,102,241,0.3); box-shadow: 0 0 15px rgba(99,102,241,0.2);';

            html += `
                <div style="
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.875rem 1rem;
                    border-radius: 14px;
                    ${bgStyle}
                    transition: transform 0.2s, box-shadow 0.2s;
                    backdrop-filter: blur(10px);
                " data-player-id="${player.id}" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
                    
                    <!-- Rank -->
                    <div style="
                        width: 36px;
                        height: 36px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 700;
                        font-size: ${medal ? '1.5rem' : '0.9rem'};
                        color: ${rank <= 3 ? 'var(--text-primary)' : 'var(--text-secondary)'};
                        background: ${rank > 3 ? 'var(--bg-tertiary, rgba(0,0,0,0.1))' : 'transparent'};
                        border-radius: 8px;
                        flex-shrink: 0;
                    ">${medal || '#' + rank}</div>
                    
                    <!-- Avatar with Level Ring -->
                    <div style="
                        position: relative;
                        flex-shrink: 0;
                    ">
                        <div style="
                            width: 44px;
                            height: 44px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 1.75rem;
                            background: linear-gradient(135deg, ${levelInfo.color}22, ${levelInfo.color}11);
                            border: 2px solid ${levelInfo.color};
                            border-radius: 50%;
                            box-shadow: 0 0 10px ${levelInfo.color}40;
                            overflow: hidden;
                        ">${this.renderAvatar(player.avatar)}</div>
                    </div>
                    
                    <!-- Name & Level Badge -->
                    <div style="
                        flex: 1;
                        min-width: 0;
                        display: flex;
                        flex-direction: column;
                        gap: 0.2rem;
                    ">
                        <div style="display: flex; align-items: center; gap: 0.4rem;">
                            <span style="
                                font-weight: 600;
                                font-size: 1rem;
                                color: var(--text-primary);
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            ">${this.escapeHtml(player.name)}</span>
                            ${isCurrentUser ? '<span style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.6rem; font-weight: 700;">YOU</span>' : ''}
                        </div>
                        <!-- Premium Level Badge -->
                        <div style="
                            display: inline-flex;
                            align-items: center;
                            gap: 0.3rem;
                            padding: 0.15rem 0.5rem;
                            background: linear-gradient(135deg, ${levelInfo.color}20, ${levelInfo.color}10);
                            border: 1px solid ${levelInfo.color}40;
                            border-radius: 20px;
                            width: fit-content;
                        ">
                            <span style="font-size: 0.7rem;">${levelInfo.emoji}</span>
                            <span style="
                                font-size: 0.65rem;
                                font-weight: 700;
                                color: ${levelInfo.color};
                                letter-spacing: 0.5px;
                            ">LVL ${playerLevel}</span>
                            <span style="
                                font-size: 0.6rem;
                                color: ${levelInfo.color};
                                opacity: 0.8;
                            ">${levelInfo.name}</span>
                        </div>
                    </div>
                    
                    <!-- XP Display -->
                    <div style="
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        gap: 0.1rem;
                    ">
                        <div style="
                            font-weight: 700;
                            font-size: 1rem;
                            color: var(--primary, #6366f1);
                            white-space: nowrap;
                            display: flex;
                            align-items: center;
                            gap: 0.25rem;
                        ">
                            <span style="font-size: 0.85rem;">⭐</span>
                            ${player.xp.toLocaleString()}
                        </div>
                        <span style="font-size: 0.65rem; color: var(--text-tertiary, #888);">XP</span>
                    </div>
                    
                    ${showDelete && player.id !== currentUserId ? `
                        <button onclick="BroProLeaderboard.showDeleteConfirmation('${player.id}', '${this.escapeHtml(player.name)}', '${player.email}')" style="
                            background: rgba(239,68,68,0.1);
                            border: none;
                            padding: 0.5rem;
                            border-radius: 8px;
                            cursor: pointer;
                            transition: background 0.2s;
                            font-size: 1rem;
                        " onmouseover="this.style.background='rgba(239,68,68,0.2)'" onmouseout="this.style.background='rgba(239,68,68,0.1)'">🗑️</button>
                    ` : ''}
                </div>
            `;
        });

        html += '</div>';

        // Show user's rank if not in top display
        if (currentUserId) {
            const userIdx = players.findIndex(p => p.id === currentUserId);
            if (userIdx >= maxDisplay) {
                const user = players[userIdx];
                const userLevel = user.level || Math.floor((user.xp || 0) / 500) + 1;
                const levelInfo = this.getLevelBadgeInfo(userLevel);

                html += `
                    <div style="
                        margin-top: 1rem;
                        padding: 1rem;
                        background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05));
                        border-radius: 12px;
                        border: 1px solid rgba(99,102,241,0.2);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: var(--text-primary);
                    ">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-weight: 600;">Your Rank: #${userIdx + 1}</span>
                            <span style="
                                display: inline-flex;
                                align-items: center;
                                gap: 0.25rem;
                                padding: 0.15rem 0.5rem;
                                background: linear-gradient(135deg, ${levelInfo.color}20, ${levelInfo.color}10);
                                border-radius: 20px;
                                font-size: 0.7rem;
                                font-weight: 600;
                                color: ${levelInfo.color};
                            ">${levelInfo.emoji} LVL ${userLevel}</span>
                        </div>
                        <span style="color: var(--primary, #6366f1); font-weight: 700;">${user.xp.toLocaleString()} XP</span>
                    </div>
                `;
            }
        }

        container.innerHTML = html;
    },

    // Get level badge styling info
    getLevelBadgeInfo(level) {
        if (level >= 100) return { name: 'Legend', emoji: '👑', color: '#ffd700' };
        if (level >= 50) return { name: 'Master', emoji: '💎', color: '#00d4ff' };
        if (level >= 25) return { name: 'Diamond', emoji: '💠', color: '#b9f2ff' };
        if (level >= 15) return { name: 'Platinum', emoji: '🏆', color: '#e5e4e2' };
        if (level >= 10) return { name: 'Gold', emoji: '🥇', color: '#ffd700' };
        if (level >= 5) return { name: 'Silver', emoji: '🥈', color: '#c0c0c0' };
        if (level >= 3) return { name: 'Bronze', emoji: '🥉', color: '#cd7f32' };
        return { name: 'Beginner', emoji: '🌱', color: '#4ade80' };
    },

    // List of avatars that are images (not emojis)
    IMAGE_AVATARS: ['bhai', 'bhagat-singh', 'shri-ram', 'krishna', 'buddha', 'guru-nanak', 'vivekananda', 'ambedkar', 'gandhi', 'netaji', 'hanuman'],

    // Check if avatar is an image-based avatar
    isImageAvatar(avatar) {
        if (!avatar) return false;
        // Check if it's in the image avatars list
        if (this.IMAGE_AVATARS.includes(avatar)) return true;
        // Check if it starts with img: prefix
        if (avatar.startsWith('img:')) return true;
        // Check if it's a URL
        if (avatar.startsWith('http://') || avatar.startsWith('https://')) return true;
        return false;
    },

    // Render avatar HTML (handles both emoji and image-based avatars)
    renderAvatar(avatar, size = '1.75rem') {
        const avatarValue = avatar || '🐼';

        // Image-based avatar from list
        if (this.IMAGE_AVATARS.includes(avatarValue)) {
            return `<img src="/assets/avatars/${avatarValue}-avatar.png" alt="${avatarValue}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        }
        // Avatar with img: prefix
        if (avatarValue.startsWith('img:')) {
            const avatarName = avatarValue.replace('img:', '');
            return `<img src="/assets/avatars/${avatarName}-avatar.png" alt="${avatarName}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        }
        // URL-based avatar
        if (avatarValue.startsWith('http://') || avatarValue.startsWith('https://')) {
            return `<img src="${avatarValue}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        }
        // Emoji avatar (default)
        return `<span style="font-size: ${size};">${avatarValue}</span>`;
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // ============================================
    // ADMIN: DELETE PLAYER
    // ============================================

    showDeleteConfirmation(playerId, playerName, playerEmail) {
        // Prevent deleting admin
        if (playerEmail === this.ADMIN_EMAIL) {
            this.showToast('error', '🚫 Cannot delete admin!');
            return;
        }

        this._pendingDelete = { playerId, playerName, playerEmail };

        const modal = document.getElementById('adminConfirmModal');
        if (!modal) {
            // Legacy fallback
            if (confirm(`Delete ${playerName}'s scores?`)) {
                const pwd = prompt('Enter admin password:');
                if (pwd === this.ADMIN_PASSWORD) {
                    this.executePlayerDeletion(playerId, playerName);
                }
            }
            return;
        }

        // Configure modal
        const title = document.getElementById('confirmTitle');
        const message = document.getElementById('confirmMessage');
        const passwordInput = document.getElementById('adminPasswordInput');
        const passwordError = document.getElementById('passwordError');
        const deleteBtn = document.getElementById('confirmDeleteBtn');

        title.textContent = 'Delete Player';
        message.innerHTML = `Delete <strong>${playerName}</strong>'s scores?<br><span style="color:#ef4444;font-size:0.9rem;">⚠️ This cannot be undone!</span>`;
        passwordInput.value = '';
        passwordError.textContent = '';
        deleteBtn.disabled = false;
        deleteBtn.innerHTML = '<span>🗑️</span> Delete';

        // Event handlers
        deleteBtn.onclick = () => this.handleDeleteConfirm();
        document.getElementById('confirmCancelBtn').onclick = () => this.closeDeleteConfirmation();

        modal.classList.add('active');
        setTimeout(() => passwordInput.focus(), 300);
    },

    closeDeleteConfirmation() {
        const modal = document.getElementById('adminConfirmModal');
        if (modal) modal.classList.remove('active');
        this._pendingDelete = null;
    },

    async handleDeleteConfirm() {
        const passwordInput = document.getElementById('adminPasswordInput');
        const passwordError = document.getElementById('passwordError');
        const deleteBtn = document.getElementById('confirmDeleteBtn');

        // Validate password
        if (passwordInput.value !== this.ADMIN_PASSWORD) {
            passwordError.textContent = '❌ Invalid password!';
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 500);
            return;
        }

        deleteBtn.disabled = true;
        deleteBtn.innerHTML = '<span>⏳</span> Deleting...';

        const result = await this.executePlayerDeletion(
            this._pendingDelete.playerId,
            this._pendingDelete.playerName
        );

        this.closeDeleteConfirmation();
        this.showToast(result.success ? 'success' : 'error', result.message);
    },

    async executePlayerDeletion(playerId, playerName) {
        if (!this.db || !playerId) {
            return { success: false, message: 'Invalid request' };
        }

        try {
            // Use BroProAdmin's comprehensive delete if available
            if (window.BroProAdmin && BroProAdmin.deleteUserProfileDirect) {
                const result = await BroProAdmin.deleteUserProfileDirect(playerId, playerName);
                return result;
            }

            // Fallback: Delete from all leaderboards ourselves
            const subjects = ['global', 'math', 'mathematics', 'science', 'geography', 'english', 'hindi', 'gk', 'history'];

            for (const subject of subjects) {
                try {
                    const docRef = this.db.collection('leaderboards').doc(subject).collection('players').doc(playerId);
                    const doc = await docRef.get();
                    if (doc.exists) {
                        await docRef.delete();
                        console.log(`🗑️ Deleted from ${subject}`);
                    }
                } catch (e) {
                    // Ignore errors for individual subjects
                }
            }

            // Delete from old leaderboard
            try {
                await this.db.collection('leaderboard').doc(playerId).delete();
            } catch (e) { }

            // Force logout the user
            try {
                await this.db.collection('presence').doc(playerId).set({
                    forceLogout: true,
                    forceLogoutAt: firebase.firestore.FieldValue.serverTimestamp(),
                    deletedBy: this.ADMIN_EMAIL
                }, { merge: true });

                // Wait then delete presence
                setTimeout(async () => {
                    try {
                        await this.db.collection('presence').doc(playerId).delete();
                    } catch (e) { }
                }, 1500);
            } catch (e) { }

            return { success: true, message: `✅ ${playerName} deleted!` };
        } catch (error) {
            console.error('Delete error:', error);
            return { success: false, message: '❌ Delete failed' };
        }
    },

    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================

    showToast(type, message) {
        // Remove existing toast
        const existingToast = document.querySelector('.leaderboard-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = `leaderboard-toast ${type}`;
        toast.innerHTML = `<span>${message}</span>`;
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // ============================================
    // CLEANUP
    // ============================================

    unsubscribeAll() {
        Object.values(this.listeners).forEach(unsubscribe => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
        this.listeners = {};
        console.log('🔌 All leaderboard listeners stopped');
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BroProLeaderboard.init());
} else {
    BroProLeaderboard.init();
}

// Export for global access
window.BroProLeaderboard = BroProLeaderboard;
