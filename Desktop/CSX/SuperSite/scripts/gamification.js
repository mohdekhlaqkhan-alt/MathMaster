/* ============================================
   SUPERSITE - UNIFIED GAMIFICATION SYSTEM
   XP, Achievements, Sounds & Global Progress
   ============================================ */

// ============================================
// WALLET FORMULA CONFIGURATION
// Change this value to adjust XP to Rupee conversion
// Formula: Rupees = XP / XP_TO_RUPEE_DIVISOR
// ============================================
const XP_TO_RUPEE_DIVISOR = 40; // Changed from 10 to 40 (1 rupee per 40 XP)
window.XP_TO_RUPEE_DIVISOR = XP_TO_RUPEE_DIVISOR; // Make globally accessible

// ============================================
// PLAYER PROFILE SYSTEM
// ============================================
const BroProPlayer = {
    // Default profile structure
    getDefaultProfile() {
        return {
            name: '',
            email: '',
            avatar: '🐼',
            level: 1,
            xp: 0,
            wallet: 0, // Indian Rupees earned from leveling up
            walletAdded: 0, // Money added via Cashfree top-up
            walletSpent: 0, // Track money spent on premium items
            walletTransactions: [], // Transaction history
            ownedPremiumAvatars: [], // Array of owned premium avatar emojis
            streak: 0,
            lastPlayed: null,
            totalQuestions: 0,
            totalCorrect: 0,
            isPremium: false,
            premium: false, // Premium subscription status
            premiumExpiry: null, // ISO date string for premium expiry
            premiumGrantedAt: null, // When premium was granted
            premiumPromoCode: null, // Promo code used for premium
            usedPromoCodes: [], // Array of used promo codes
            registeredAt: null,
            subjectProgress: {
                math: { xp: 0, quizzes: 0, accuracy: 0 },
                geography: { xp: 0, quizzes: 0, accuracy: 0 },
                science: { xp: 0, quizzes: 0, accuracy: 0 },
                english: { xp: 0, quizzes: 0, accuracy: 0 },
                hindi: { xp: 0, quizzes: 0, accuracy: 0 },
                gk: { xp: 0, quizzes: 0, accuracy: 0 },
                history: { xp: 0, quizzes: 0, accuracy: 0 }
            },
            settings: {
                soundEnabled: true,
                musicEnabled: false,
                theme: 'dark'
            },
            achievements: [] // Track unlocked achievements
        };
    },

    // Load profile from localStorage
    load() {
        const saved = localStorage.getItem('supersite-player-profile');
        if (saved) {
            const profile = { ...this.getDefaultProfile(), ...JSON.parse(saved) };

            // Self-repair: Ensure level matches XP
            // This fixes issues where level might be out of sync with actual XP
            const calculatedLevel = Math.floor(profile.xp / 500) + 1;
            if (profile.level !== calculatedLevel) {
                console.log(`⚠️ Auto-correcting level: Was ${profile.level}, Should be ${calculatedLevel} (XP: ${profile.xp})`);
                profile.level = calculatedLevel;
                // We don't save here to avoid read-write loops, it will save on next update
                // But we return the corrected profile so UI is correct immediately
            }

            // Self-repair: Ensure walletSpent doesn't exceed total available (XP/DIVISOR + walletAdded)
            // This fixes issues when formula changed
            const maxAvailable = Math.floor(profile.xp / XP_TO_RUPEE_DIVISOR) + (profile.walletAdded || 0);
            if ((profile.walletSpent || 0) > maxAvailable) {
                console.log(`⚠️ Auto-correcting walletSpent: Was ${profile.walletSpent}, Max possible ${maxAvailable}`);
                profile.walletSpent = maxAvailable; // Cap at max available
                this.save(profile); // Save the correction
            }

            return profile;
        }
        return this.getDefaultProfile();
    },

    // Save profile to localStorage
    save(profile) {
        localStorage.setItem('supersite-player-profile', JSON.stringify(profile));
    },

    // ============================================
    // AUTHENTICATION SYSTEM
    // ============================================

    // Check if user is logged in (strict check)
    isLoggedIn() {
        // Must have a current user session
        const currentUserId = localStorage.getItem('supersite-current-user');
        if (!currentUserId) return false;

        // Must have profile with registration info
        const profile = this.load();
        return !!(profile.name && profile.email && profile.registeredAt);
    },

    // Get current user name (prioritize custom leaderboard name over Google name)
    getName() {
        const profile = this.load();
        // displayName = custom leaderboard name, name = may be Google name
        return profile.displayName || profile.name || 'Guest';
    },

    // Sign up new user
    signup(name, email, password) {
        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('supersite-users') || '[]');
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, error: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: btoa(password), // Simple encoding (use proper hashing in production)
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('supersite-users', JSON.stringify(users));

        // Auto login after signup
        return this.login(email, password);
    },

    // Login user
    login(email, password) {
        const users = JSON.parse(localStorage.getItem('supersite-users') || '[]');
        const user = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase().trim() &&
            u.password === btoa(password)
        );

        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Load or create profile for this user
        const profileKey = `supersite-profile-${user.id}`;
        let profile = JSON.parse(localStorage.getItem(profileKey) || 'null');

        if (!profile) {
            profile = this.getDefaultProfile();
            profile.name = user.name;
            profile.email = user.email;
            profile.registeredAt = user.createdAt;
        }

        // Set as current profile
        localStorage.setItem('supersite-player-profile', JSON.stringify(profile));
        localStorage.setItem('supersite-current-user', user.id);

        // Update leaderboard
        this.updateLeaderboard();

        return { success: true, user: { name: user.name, email: user.email } };
    },

    // Logout user
    logout() {
        // Save current profile to user-specific storage before logout
        const userId = localStorage.getItem('supersite-current-user');
        if (userId) {
            const profile = this.load();
            localStorage.setItem(`supersite-profile-${userId}`, JSON.stringify(profile));
        }

        localStorage.removeItem('supersite-player-profile');
        localStorage.removeItem('supersite-current-user');

        return true;
    },

    // Update global leaderboard
    updateLeaderboard() {
        if (!this.isLoggedIn()) return;

        const profile = this.load();
        const leaderboard = JSON.parse(localStorage.getItem('supersite-leaderboard') || '[]');

        // Find or create entry
        const existingIdx = leaderboard.findIndex(p => p.email === profile.email);

        const entry = {
            name: profile.name,
            email: profile.email,
            xp: profile.xp,
            level: profile.level,
            avatar: profile.avatar
        };

        if (existingIdx >= 0) {
            leaderboard[existingIdx] = entry;
        } else {
            leaderboard.push(entry);
        }

        localStorage.setItem('supersite-leaderboard', JSON.stringify(leaderboard));

        // SYNC TO CLOUD: Update Firebase if available
        if (window.FirebaseAuth && this.isLoggedIn()) {
            FirebaseAuth.updateLeaderboardEntry(profile);
        }
    },

    // Check if activity is accessible
    checkActivityAccess(activityIndex) {
        // First activity (index 0) is always free
        if (activityIndex === 0) return { allowed: true };

        // Other activities require login
        if (!this.isLoggedIn()) {
            return {
                allowed: false,
                reason: 'login_required',
                message: 'Please login to access this activity!'
            };
        }

        // For premium check (future)
        // const profile = this.load();
        // if (!profile.isPremium) {
        //     return { allowed: false, reason: 'premium_required', message: 'Upgrade to Premium!' };
        // }

        return { allowed: true };
    },

    // Add XP with level up check
    addXP(amount, subject = null) {
        const profile = this.load();
        const oldLevel = profile.level || this.calculateLevel(profile.xp);
        profile.xp += amount;

        if (subject) {
            // Initialize subject progress if not exists
            if (!profile.subjectProgress[subject]) {
                profile.subjectProgress[subject] = { xp: 0, quizzes: 0, accuracy: 0 };
            }
            profile.subjectProgress[subject].xp += amount;
        }

        // Check for level up (500 XP per level)
        const newLevel = this.calculateLevel(profile.xp);
        const leveledUp = newLevel > oldLevel;
        profile.level = newLevel;

        // Wallet is XP divided by divisor (₹ = XP ÷ XP_TO_RUPEE_DIVISOR)
        profile.wallet = Math.floor(profile.xp / XP_TO_RUPEE_DIVISOR);

        this.save(profile);

        console.log(`📊 addXP: +${amount} (XP: ${profile.xp}, Wallet: ₹${profile.wallet}, Level: ${newLevel})`);

        // Update leaderboards using new system
        if (window.BroProLeaderboard && this.isLoggedIn()) {
            const subjectXP = subject ? (profile.subjectProgress[subject]?.xp || 0) : 0;
            const totalXP = profile.xp;

            console.log(`🏆 Updating leaderboards - Subject ${subject}: ${subjectXP}, Global: ${totalXP}`);

            // Update both subject AND global leaderboard
            if (subject) {
                BroProLeaderboard.updateSubjectScore(subject, subjectXP, profile.name)
                    .then(success => {
                        if (success) {
                            console.log('✅ Leaderboards updated successfully');
                        } else {
                            console.log('⚠️ Leaderboard update returned false');
                        }
                    })
                    .catch(err => console.error('❌ Leaderboard update error:', err));
            }
        } else {
            console.log('⚠️ BroProLeaderboard not available or not logged in');
            // Fallback to old system
            this.updateLeaderboard();
            if (subject) {
                this.updateSubjectLeaderboard(subject, profile);
            }
        }

        if (leveledUp) {
            this.triggerLevelUp(newLevel);
        }

        // 🕐 Piggyback: Save activity time for FREE alongside XP update
        if (window.BroProActivityTracker) {
            BroProActivityTracker.piggybackSave();
        }

        return { xp: profile.xp, level: profile.level, leveledUp, wallet: profile.wallet };
    },

    // Update subject-specific leaderboard
    updateSubjectLeaderboard(subject, profile) {
        if (!profile.name || !profile.email) return;

        const key = `supersite-leaderboard-${subject}`;
        const leaderboard = JSON.parse(localStorage.getItem(key) || '[]');

        // Get subject XP
        const subjectXP = profile.subjectProgress[subject]?.xp || 0;

        // Find or create entry
        const existingIdx = leaderboard.findIndex(p => p.email === profile.email);

        const entry = {
            name: profile.name,
            email: profile.email,
            xp: subjectXP,
            avatar: profile.avatar || '🐼'
        };

        if (existingIdx >= 0) {
            leaderboard[existingIdx] = entry;
        } else {
            leaderboard.push(entry);
        }

        // Sort by XP
        leaderboard.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        localStorage.setItem(key, JSON.stringify(leaderboard));
    },

    // Get wallet amount (XP/DIVISOR + walletAdded - walletSpent)
    getWallet() {
        const profile = this.load();
        const earnedFromXP = Math.floor(profile.xp / XP_TO_RUPEE_DIVISOR);
        const addedViaPurchase = profile.walletAdded || 0;
        const spent = profile.walletSpent || 0;
        // Ensure wallet never goes negative
        return Math.max(0, earnedFromXP + addedViaPurchase - spent);
    },

    // Calculate level from XP (500 XP per level)
    calculateLevel(xp) {
        // Level formula: Level = floor(xp / 500) + 1
        // Level 1 = 0-499 XP, Level 2 = 500-999 XP, etc.
        return Math.floor(xp / 500) + 1;
    },

    // Get XP needed for next level
    getXPForLevel(level) {
        // XP needed to reach this level = (level - 1) * 500
        return level * 500;
    },

    // Get XP progress within current level
    getLevelProgress(xp) {
        const currentLevel = this.calculateLevel(xp);
        const currentLevelXP = (currentLevel - 1) * 500;
        const nextLevelXP = currentLevel * 500;
        const progress = xp - currentLevelXP;
        const needed = nextLevelXP - currentLevelXP;
        return {
            level: currentLevel,
            currentXP: xp,
            progressInLevel: progress,
            neededForNext: needed,
            percentage: Math.min((progress / needed) * 100, 100)
        };
    },

    // Get rank based on level (not XP)
    getRank(xp) {
        const level = this.calculateLevel(xp);
        if (level >= 100) return { name: 'Legend', emoji: '👑', color: '#ffd700' };
        if (level >= 50) return { name: 'Master', emoji: '💎', color: '#00d4ff' };
        if (level >= 20) return { name: 'Diamond', emoji: '💠', color: '#b9f2ff' };
        if (level >= 10) return { name: 'Platinum', emoji: '🏆', color: '#e5e4e2' };
        if (level >= 5) return { name: 'Gold', emoji: '🥇', color: '#ffd700' };
        if (level >= 3) return { name: 'Silver', emoji: '🥈', color: '#c0c0c0' };
        if (level >= 2) return { name: 'Bronze', emoji: '🥉', color: '#cd7f32' };
        return { name: 'Beginner', emoji: '🌱', color: '#4ade80' };
    },

    // Update streak
    updateStreak() {
        const profile = this.load();
        const today = new Date().toDateString();

        if (profile.lastPlayed) {
            const lastDate = new Date(profile.lastPlayed);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastDate.toDateString() === yesterday.toDateString()) {
                profile.streak++;
            } else if (lastDate.toDateString() !== today) {
                profile.streak = 1;
            }
        } else {
            profile.streak = 1;
        }

        profile.lastPlayed = today;
        this.save(profile);

        return profile.streak;
    },

    // Trigger level up animation
    triggerLevelUp(level) {
        BroProEffects.levelUp(level);
        BroProSounds.play('levelup');

        // Log to activity feed
        if (window.logLevelUpActivity) {
            logLevelUpActivity(level);
        }
    },

    // ============================================
    // QUIZ MASTERY TRACKING SYSTEM
    // Prevents XP farming by reducing rewards for mastered content
    // ============================================

    // Get quiz mastery data from localStorage
    getQuizMastery() {
        return JSON.parse(localStorage.getItem('supersite-quiz-mastery') || '{}');
    },

    // Save quiz mastery data
    saveQuizMastery(data) {
        localStorage.setItem('supersite-quiz-mastery', JSON.stringify(data));
    },

    // Generate a unique key for a quiz (subject + mode + level if applicable)
    getQuizKey(subject, mode, level = null) {
        return level ? `${subject}_${mode}_level${level}` : `${subject}_${mode}`;
    },

    // Record quiz completion and get the best score
    recordQuizCompletion(subject, mode, correct, total, level = null) {
        const mastery = this.getQuizMastery();
        const key = this.getQuizKey(subject, mode, level);
        const accuracy = Math.round((correct / total) * 100);

        const existingData = mastery[key] || {
            bestScore: 0,
            bestAccuracy: 0,
            timesCompleted: 0,
            firstCompletedAt: null,
            lastCompletedAt: null,
            perfectCount: 0
        };

        // Update data
        existingData.timesCompleted++;
        existingData.lastCompletedAt = new Date().toISOString();

        if (!existingData.firstCompletedAt) {
            existingData.firstCompletedAt = new Date().toISOString();
        }

        // Track if this is a new best
        const isNewBest = correct > existingData.bestScore;

        if (isNewBest) {
            existingData.bestScore = correct;
            existingData.bestAccuracy = accuracy;
        }

        // Track perfect scores
        if (accuracy === 100) {
            existingData.perfectCount++;
        }

        mastery[key] = existingData;
        this.saveQuizMastery(mastery);

        return {
            isNewBest,
            previousBest: existingData.bestScore,
            currentScore: correct,
            accuracy,
            timesCompleted: existingData.timesCompleted,
            isPerfect: accuracy === 100,
            wasPreviouslyPerfect: existingData.perfectCount > 1 || (existingData.perfectCount === 1 && accuracy !== 100)
        };
    },

    // Calculate XP multiplier based on mastery level
    // Full XP for new learning, reduced XP for practice
    calculateXPMultiplier(subject, mode, currentAccuracy, level = null) {
        const mastery = this.getQuizMastery();
        const key = this.getQuizKey(subject, mode, level);
        const existingData = mastery[key];

        // First time playing this quiz - full XP
        if (!existingData || existingData.timesCompleted === 0) {
            return { multiplier: 1.0, reason: 'new_learning', message: null };
        }

        const previousBestAccuracy = existingData.bestAccuracy || 0;

        // If current score beats previous best - full XP for improvement
        if (currentAccuracy > previousBestAccuracy) {
            return { multiplier: 1.0, reason: 'improvement', message: null };
        }

        // Already mastered (previous 100%) - practice mode (25% XP)
        if (previousBestAccuracy === 100) {
            return {
                multiplier: 0.25,
                reason: 'mastered',
                message: '🔄 Practice Mode: 25% XP (Already Mastered)'
            };
        }

        // Not mastered but same or lower score - reduced XP (50%)
        if (currentAccuracy <= previousBestAccuracy) {
            return {
                multiplier: 0.5,
                reason: 'practice',
                message: '🔄 Practice: 50% XP (Beat your best for full XP!)'
            };
        }

        return { multiplier: 1.0, reason: 'default', message: null };
    },

    // Get mastery status for display
    getQuizMasteryStatus(subject, mode, level = null) {
        const mastery = this.getQuizMastery();
        const key = this.getQuizKey(subject, mode, level);
        const data = mastery[key];

        if (!data) {
            return { status: 'new', badge: '🆕', text: 'New Quiz' };
        }

        if (data.bestAccuracy === 100) {
            return {
                status: 'mastered',
                badge: '⭐',
                text: `Mastered (${data.perfectCount}x Perfect)`,
                timesPlayed: data.timesCompleted
            };
        }

        if (data.bestAccuracy >= 80) {
            return {
                status: 'proficient',
                badge: '✓',
                text: `Best: ${data.bestAccuracy}%`,
                timesPlayed: data.timesCompleted
            };
        }

        return {
            status: 'learning',
            badge: '📖',
            text: `Best: ${data.bestAccuracy}%`,
            timesPlayed: data.timesCompleted
        };
    }
};

// ============================================
// ACHIEVEMENTS SYSTEM
// ============================================
const BroProAchievements = {
    // All available achievements
    list: [
        // Progress Achievements
        { id: 'first_quiz', name: 'First Steps', desc: 'Complete your first quiz', icon: '🎯', xp: 50 },
        { id: 'quiz_10', name: 'Quiz Master', desc: 'Complete 10 quizzes', icon: '📚', xp: 100 },
        { id: 'quiz_50', name: 'Knowledge Seeker', desc: 'Complete 50 quizzes', icon: '🎓', xp: 500 },
        { id: 'quiz_100', name: 'Scholar', desc: 'Complete 100 quizzes', icon: '🏛️', xp: 1000 },

        // Accuracy Achievements
        { id: 'perfect_quiz', name: 'Perfect Score', desc: 'Get 100% on any quiz', icon: '💯', xp: 100 },
        { id: 'perfect_5', name: 'Perfectionist', desc: 'Get 5 perfect scores', icon: '⭐', xp: 250 },

        // Streak Achievements
        { id: 'streak_3', name: 'Consistent', desc: '3 day streak', icon: '🔥', xp: 50 },
        { id: 'streak_7', name: 'Dedicated', desc: '7 day streak', icon: '🔥', xp: 150 },
        { id: 'streak_30', name: 'Unstoppable', desc: '30 day streak', icon: '🔥', xp: 500 },

        // Subject Achievements
        { id: 'math_master', name: 'Math Wizard', desc: 'Earn 1000 XP in Math', icon: '📐', xp: 200 },
        { id: 'geo_explorer', name: 'World Explorer', desc: 'Earn 1000 XP in Geography', icon: '🌍', xp: 200 },
        { id: 'history_buff', name: 'Time Traveler', desc: 'Earn 1000 XP in History', icon: '📜', xp: 200 },

        // Speed Achievements
        { id: 'speed_demon', name: 'Speed Demon', desc: 'Complete speed challenge with 90%+', icon: '⚡', xp: 200 },

        // Level Achievements
        { id: 'level_5', name: 'Rising Star', desc: 'Reach Level 5', icon: '⭐', xp: 100 },
        { id: 'level_10', name: 'Superstar', desc: 'Reach Level 10', icon: '🌟', xp: 250 },
        { id: 'level_25', name: 'Legend', desc: 'Reach Level 25', icon: '👑', xp: 1000 }
    ],

    // Check and unlock achievements
    check(profile) {
        const newAchievements = [];
        const unlockedAchievements = profile.achievements || [];

        this.list.forEach(achievement => {
            if (unlockedAchievements.includes(achievement.id)) return;

            let unlocked = false;

            switch (achievement.id) {
                case 'first_quiz':
                    unlocked = profile.totalQuestions > 0;
                    break;
                case 'quiz_10':
                    unlocked = this.getTotalQuizzes(profile) >= 10;
                    break;
                case 'quiz_50':
                    unlocked = this.getTotalQuizzes(profile) >= 50;
                    break;
                case 'streak_3':
                    unlocked = profile.streak >= 3;
                    break;
                case 'streak_7':
                    unlocked = profile.streak >= 7;
                    break;
                case 'streak_30':
                    unlocked = profile.streak >= 30;
                    break;
                case 'level_5':
                    unlocked = profile.level >= 5;
                    break;
                case 'level_10':
                    unlocked = profile.level >= 10;
                    break;
                case 'math_master':
                    unlocked = (profile.subjectProgress?.mathematics?.xp || profile.subjectProgress?.math?.xp || 0) >= 1000;
                    break;
                case 'geo_explorer':
                    unlocked = (profile.subjectProgress?.geography?.xp || 0) >= 1000;
                    break;
                case 'history_buff':
                    unlocked = (profile.subjectProgress?.history?.xp || 0) >= 1000;
                    break;
            }

            if (unlocked) {
                newAchievements.push(achievement);
            }
        });

        return newAchievements;
    },

    // Unlock achievement
    unlock(achievementId) {
        const profile = BroProPlayer.load();
        const achievement = this.list.find(a => a.id === achievementId);

        // Initialize achievements array if not exists
        if (!profile.achievements) {
            profile.achievements = [];
        }

        if (achievement && !profile.achievements.includes(achievementId)) {
            profile.achievements.push(achievementId);
            profile.xp += achievement.xp;
            BroProPlayer.save(profile);

            BroProEffects.achievementUnlock(achievement);
            BroProSounds.play('achievement');

            return true;
        }
        return false;
    },

    getTotalQuizzes(profile) {
        return Object.values(profile.subjectProgress).reduce((sum, s) => sum + s.quizzes, 0);
    }
};

// ============================================
// SOUND EFFECTS SYSTEM
// ============================================
const BroProSounds = {
    enabled: true,
    audioFiles: {}, // Cache for preloaded audio files
    correctStreak: 0, // Track consecutive correct answers
    wrongStreak: 0, // Track consecutive wrong answers

    // Sound definitions (base64 encoded short sounds or Web Audio)
    sounds: {
        correct: { frequency: 523.25, duration: 150, type: 'sine' },
        wrong: { file: '/assets/sounds/ayein_meme.mp3' }, // Custom audio file for wrong answers
        streak4: { file: '/assets/sounds/system_phar_denge.mp3' }, // 4 correct in a row celebration!
        wrong3: { file: '/assets/sounds/aabe_saale.mp3' }, // 3 wrong in a row - Aabe Saale!
        click: { frequency: 800, duration: 50, type: 'sine' },
        levelup: { frequency: [523, 659, 784], duration: 200, type: 'sine' },
        achievement: { frequency: [392, 523, 659, 784], duration: 150, type: 'sine' },
        combo: { frequency: 880, duration: 100, type: 'triangle' },
        purchase: { frequency: [523, 659, 784, 1047], duration: 120, type: 'sine' } // Satisfying purchase success!
    },

    // Initialize audio context and preload audio files
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('AudioContext not available');
        }

        // Load enabled state from profile
        const profile = BroProPlayer.load();
        if (profile.settings && typeof profile.settings.soundEnabled === 'boolean') {
            this.enabled = profile.settings.soundEnabled;
        } else {
            this.enabled = true; // Default to enabled
        }

        // Preload audio files for instant playback
        this.preloadAudioFiles();
    },

    // Preload audio files to avoid delay on first play
    preloadAudioFiles() {
        Object.keys(this.sounds).forEach(soundName => {
            const sound = this.sounds[soundName];
            if (sound.file) {
                const audio = new Audio(sound.file);
                audio.preload = 'auto';
                audio.load();
                this.audioFiles[soundName] = audio;
                console.log(`🔊 Preloaded sound: ${soundName}`);
            }
        });
    },

    // Play a sound
    play(soundName) {
        if (!this.enabled) return;
        if (!this.audioContext) this.init();

        const sound = this.sounds[soundName];
        if (!sound) return;

        try {
            // Check if it's a custom audio file
            if (sound.file) {
                // Audio files (MP3/WAV) don't need Web Audio Context resume
                this.playAudioFile(soundName);
            } else if (Array.isArray(sound.frequency)) {
                // Resume contextual only for tone generation
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    this.audioContext.resume().catch(e => console.log('Audio resume failed:', e));
                }

                // Play sequence
                sound.frequency.forEach((freq, i) => {
                    setTimeout(() => this.playTone(freq, sound.duration, sound.type), i * sound.duration);
                });
            } else {
                // Resume contextual only for tone generation
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    this.audioContext.resume().catch(e => console.log('Audio resume failed:', e));
                }

                this.playTone(sound.frequency, sound.duration, sound.type);
            }
        } catch (e) {
            console.log('Audio not available');
        }
    },

    // Play a custom audio file instantly
    playAudioFile(soundName) {
        if (!this.enabled) return;

        try {
            // Use preloaded audio for instant playback
            let audio = this.audioFiles[soundName];

            if (audio) {
                // Clone the audio to allow overlapping plays
                const audioClone = audio.cloneNode();
                audioClone.volume = 0.7;
                audioClone.currentTime = 0;

                // Play immediately
                const playPromise = audioClone.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.log('Audio play failed:', e);
                    });
                }
            } else {
                // Fallback: create new audio element
                const sound = this.sounds[soundName];
                if (sound && sound.file) {
                    audio = new Audio(sound.file);
                    audio.volume = 0.7;
                    audio.play().catch(e => console.log('Audio play failed:', e));
                    this.audioFiles[soundName] = audio;
                }
            }
        } catch (e) {
            console.log('Error playing audio file:', e);
        }
    },

    // Play a single tone
    playTone(frequency, duration, type) {
        // Double-check sounds are enabled
        if (!this.enabled) return;
        if (!this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration / 1000);
        } catch (e) {
            console.log('Error playing tone:', e);
        }
    },

    // Toggle sounds
    toggle() {
        this.enabled = !this.enabled;
        const profile = BroProPlayer.load();

        // Ensure settings object exists
        if (!profile.settings) {
            profile.settings = {
                soundEnabled: true,
                musicEnabled: false,
                theme: 'dark'
            };
        }

        profile.settings.soundEnabled = this.enabled;
        BroProPlayer.save(profile);

        console.log('🔊 Sound toggled:', this.enabled ? 'ON' : 'OFF');
        return this.enabled;
    },

    // Record a correct answer and check for streak
    recordCorrect() {
        this.correctStreak++;
        this.wrongStreak = 0; // Reset wrong streak on correct answer
        console.log(`🔥 Correct streak: ${this.correctStreak}`);

        // Play normal correct sound
        this.play('correct');

        // Check for 4-in-a-row streak!
        if (this.correctStreak === 4) {
            console.log('🎉 4 CORRECT IN A ROW! Playing celebration sound!');
            // Delay the celebration sound slightly so it doesn't overlap with correct sound
            setTimeout(() => {
                this.play('streak4');
                // Show visual celebration
                if (window.BroProEffects) {
                    BroProEffects.streakCelebration(4);
                }
            }, 200);
        } else if (this.correctStreak > 4 && this.correctStreak % 4 === 0) {
            // Also celebrate every 4th correct answer after the first streak
            console.log(`🔥 ${this.correctStreak} CORRECT IN A ROW! Playing celebration!`);
            setTimeout(() => {
                this.play('streak4');
                if (window.BroProEffects) {
                    BroProEffects.streakCelebration(this.correctStreak);
                }
            }, 200);
        }

        return this.correctStreak;
    },

    // Record a wrong answer (resets correct streak, tracks wrong streak)
    recordWrong() {
        const previousCorrectStreak = this.correctStreak;
        this.correctStreak = 0;
        this.wrongStreak++;
        console.log(`❌ Correct streak broken! Was: ${previousCorrectStreak}, Wrong streak: ${this.wrongStreak}`);

        // Play wrong sound
        this.play('wrong');

        // Check for 3 wrong in a row!
        if (this.wrongStreak === 3) {
            console.log('😱 3 WRONG IN A ROW! Playing Aabe Saale sound!');
            setTimeout(() => {
                this.play('wrong3');
                // Show visual feedback
                if (window.BroProEffects) {
                    BroProEffects.wrongStreakFeedback(3);
                }
            }, 300);
        } else if (this.wrongStreak > 3 && this.wrongStreak % 3 === 0) {
            // Also play at every 3rd wrong answer after that
            console.log(`😱 ${this.wrongStreak} WRONG IN A ROW! Playing Aabe Saale!`);
            setTimeout(() => {
                this.play('wrong3');
                if (window.BroProEffects) {
                    BroProEffects.wrongStreakFeedback(this.wrongStreak);
                }
            }, 300);
        }

        return previousCorrectStreak;
    },

    // Get current correct streak count
    getStreak() {
        return this.correctStreak;
    },

    // Get current wrong streak count
    getWrongStreak() {
        return this.wrongStreak;
    },

    // Reset all streaks (call when quiz ends or restarts)
    resetStreak() {
        this.correctStreak = 0;
        this.wrongStreak = 0;
        console.log('🔄 All streaks reset');
    }
};

// ============================================
// VISUAL EFFECTS SYSTEM
// ============================================
const BroProEffects = {
    // XP popup effect
    xpPopup(amount, element) {
        const popup = document.createElement('div');
        popup.className = 'xp-popup';
        popup.innerHTML = `+${amount} XP`;
        popup.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            font-weight: 700;
            color: #fbbf24;
            text-shadow: 0 2px 10px rgba(251, 191, 36, 0.5);
            pointer-events: none;
            z-index: 9999;
            animation: xpFloat 1.5s ease-out forwards;
        `;

        if (element) {
            const rect = element.getBoundingClientRect();
            popup.style.left = rect.left + rect.width / 2 + 'px';
            popup.style.top = rect.top + 'px';
        } else {
            popup.style.left = '50%';
            popup.style.top = '50%';
            popup.style.transform = 'translateX(-50%)';
        }

        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1500);
    },

    // Coin popup effect
    coinPopup(amount, element) {
        const popup = document.createElement('div');
        popup.className = 'coin-popup';
        popup.innerHTML = `🪙 +${amount}`;
        popup.style.cssText = `
            position: fixed;
            font-size: 1.25rem;
            font-weight: 600;
            color: #fcd34d;
            pointer-events: none;
            z-index: 9999;
            animation: coinBounce 1s ease-out forwards;
        `;

        if (element) {
            const rect = element.getBoundingClientRect();
            popup.style.left = rect.left + rect.width / 2 + 'px';
            popup.style.top = rect.top + 'px';
        } else {
            popup.style.right = '100px';
            popup.style.top = '80px';
        }

        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1000);
    },

    // Level up celebration
    levelUp(level) {
        const overlay = document.createElement('div');
        overlay.className = 'levelup-overlay';
        overlay.innerHTML = `
            <div class="levelup-content">
                <div class="levelup-stars">⭐✨⭐</div>
                <h2 class="levelup-title">LEVEL UP!</h2>
                <div class="levelup-level">Level ${level}</div>
                <p class="levelup-text">You're getting smarter! 🎉</p>
            </div>
        `;
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(overlay);
        this.confetti();

        setTimeout(() => {
            overlay.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => overlay.remove(), 300);
        }, 3000);
    },

    // Achievement unlock popup
    achievementUnlock(achievement) {
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <span class="achievement-label">Achievement Unlocked!</span>
                <span class="achievement-name">${achievement.name}</span>
            </div>
        `;
        popup.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #78350f;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 1rem;
            box-shadow: 0 10px 40px rgba(251, 191, 36, 0.4);
            z-index: 10000;
            animation: slideInRight 0.5s ease, shake 0.5s ease 0.5s;
        `;

        document.body.appendChild(popup);
        setTimeout(() => {
            popup.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => popup.remove(), 500);
        }, 4000);
    },

    // Confetti celebration
    confetti() {
        let canvas = document.getElementById('globalConfetti');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'globalConfetti';
            canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9998;
            `;
            document.body.appendChild(canvas);
        }

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confetti = [];
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b', '#fbbf24', '#00f2fe'];

        for (let i = 0; i < 150; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * 100,
                size: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 3 + 2,
                speedX: Math.random() * 4 - 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }

        let frame = 0;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach(c => {
                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate(c.rotation * Math.PI / 180);
                ctx.fillStyle = c.color;
                ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
                ctx.restore();

                c.y += c.speedY;
                c.x += c.speedX;
                c.rotation += c.rotationSpeed;
                c.speedY += 0.05;
            });

            frame++;
            if (frame < 200) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        animate();
    },

    // Combo fire effect
    comboFire(count) {
        const fire = document.createElement('div');
        fire.innerHTML = `🔥 ${count}x COMBO!`;
        fire.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #f59e0b, #ef4444);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            z-index: 9999;
            animation: comboBlast 0.8s ease-out forwards;
        `;

        document.body.appendChild(fire);
        setTimeout(() => fire.remove(), 800);
    },

    // 4-correct streak celebration effect
    streakCelebration(count) {
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <div class="streak-content">
                <div class="streak-fire">🔥🔥🔥🔥</div>
                <div class="streak-text">${count}x STREAK!</div>
                <div class="streak-subtitle">System Phar Denge! 💪</div>
            </div>
        `;
        celebration.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.2s ease;
        `;
        celebration.innerHTML = `
            <div style="text-align: center; animation: streakBounce 0.5s ease;">
                <div style="font-size: 4rem; animation: streakFire 0.5s ease infinite;">🔥🔥🔥🔥</div>
                <div style="font-size: 3.5rem; font-weight: 900; 
                    background: linear-gradient(135deg, #ff6b35, #f7931e, #ffcc00);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
                    margin: 0.5rem 0;
                    animation: streakPulse 0.3s ease infinite alternate;">
                    ${count}x STREAK!
                </div>
                <div style="font-size: 1.8rem; color: #fff; font-weight: 600; 
                    text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
                    💪 System Phar Denge! 💪
                </div>
            </div>
        `;

        document.body.appendChild(celebration);

        // Auto remove after 2 seconds
        setTimeout(() => {
            celebration.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => celebration.remove(), 300);
        }, 2000);

        // Also click to dismiss
        celebration.onclick = () => {
            celebration.style.animation = 'fadeOut 0.2s ease forwards';
            setTimeout(() => celebration.remove(), 200);
        };
    },

    // 3-wrong streak feedback effect
    wrongStreakFeedback(count) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.2s ease;
        `;
        feedback.innerHTML = `
            <div style="text-align: center; animation: wrongBounce 0.5s ease;">
                <div style="font-size: 4rem; animation: wrongShake 0.5s ease infinite;">💀💀💀</div>
                <div style="font-size: 3rem; font-weight: 900; 
                    background: linear-gradient(135deg, #ff4444, #cc0000);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 30px rgba(255, 68, 68, 0.5);
                    margin: 0.5rem 0;
                    animation: wrongPulse 0.3s ease infinite alternate;">
                    ${count}x WRONG!
                </div>
                <div style="font-size: 1.8rem; color: #ff6b6b; font-weight: 600; 
                    text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
                    😤 Aabe Saale! 😤
                </div>
                <div style="font-size: 1rem; color: #fff; margin-top: 1rem; opacity: 0.8;">
                    Focus! You can do this! 💪
                </div>
            </div>
        `;

        document.body.appendChild(feedback);

        // Auto remove after 2 seconds
        setTimeout(() => {
            feedback.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);

        // Also click to dismiss
        feedback.onclick = () => {
            feedback.style.animation = 'fadeOut 0.2s ease forwards';
            setTimeout(() => feedback.remove(), 200);
        };
    }
};

// ============================================
// GLOBAL STYLES FOR EFFECTS
// ============================================
const effectStyles = document.createElement('style');
effectStyles.textContent = `
    @keyframes xpFloat {
        0% { opacity: 1; transform: translateY(0) translateX(-50%); }
        100% { opacity: 0; transform: translateY(-50px) translateX(-50%); }
    }
    
    @keyframes coinBounce {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        50% { transform: translateY(-20px) scale(1.2); }
        100% { opacity: 0; transform: translateY(-40px) scale(0.8); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes comboBlast {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
    
    @keyframes streakBounce {
        0% { transform: scale(0) rotate(-10deg); opacity: 0; }
        50% { transform: scale(1.1) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    
    @keyframes streakFire {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2) translateY(-5px); }
    }
    
    @keyframes streakPulse {
        0% { transform: scale(1); }
        100% { transform: scale(1.05); }
    }
    
    @keyframes wrongBounce {
        0% { transform: scale(0) rotate(10deg); opacity: 0; }
        50% { transform: scale(1.1) rotate(-5deg); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    
    @keyframes wrongShake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        75% { transform: translateX(10px) rotate(5deg); }
    }
    
    @keyframes wrongPulse {
        0% { transform: scale(1); }
        100% { transform: scale(1.08); }
    }
    
    .levelup-content {
        text-align: center;
        animation: bounceIn 0.5s ease;
    }
    
    .levelup-stars {
        font-size: 3rem;
        margin-bottom: 1rem;
        animation: pulse 1s ease-in-out infinite;
    }
    
    .levelup-title {
        font-size: 3rem;
        font-weight: 800;
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.5rem;
    }
    
    .levelup-level {
        font-size: 2rem;
        font-weight: 700;
        color: white;
        margin-bottom: 1rem;
    }
    
    .levelup-text {
        font-size: 1.25rem;
        color: rgba(255,255,255,0.8);
    }
    
    .achievement-icon {
        font-size: 2rem;
    }
    
    .achievement-label {
        display: block;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.8;
    }
    
    .achievement-name {
        display: block;
        font-size: 1.1rem;
        font-weight: 700;
    }
    
    @keyframes bounceIn {
        0% { transform: scale(0.5); opacity: 0; }
        70% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(effectStyles);

// ============================================
// LOGIN REQUIRED MODAL FOR SUBJECT PAGES
// ============================================
const BroProAuth = {
    // Show login required modal (for subject pages)
    showLoginRequired(message) {
        // Check if modal exists, if not create it
        let modal = document.getElementById('loginRequiredModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'loginRequiredModal';
            modal.className = 'auth-modal';
            modal.innerHTML = `
                <div style="background: var(--bg-primary, #fff); border-radius: 16px; padding: 2rem; max-width: 400px; width: 90%; position: relative; animation: slideUp 0.3s ease;">
                    <button onclick="BroProAuth.closeLoginRequired()" style="position: absolute; top: 1rem; right: 1rem; background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1rem;">✕</button>
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔒</div>
                        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">Login Required</h2>
                        <p id="loginRequiredMessage" style="color: #64748b;">${message || 'Please login to access this content.'}</p>
                    </div>
                    <p style="margin: 1rem 0; color: #64748b; text-align: center;">
                        🎁 <strong>First activity is FREE!</strong><br>
                        Login to unlock all activities and join the leaderboard.
                    </p>
                    <button onclick="BroProAuth.closeLoginRequired(); window.location.href='../../index.html';" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer;">Login / Sign Up</button>
                    <p style="text-align: center; margin-top: 1rem; color: #64748b; font-size: 0.9rem;">
                        <a onclick="BroProAuth.closeLoginRequired()" style="color: #667eea; cursor: pointer; font-weight: 600;">Continue as Guest</a>
                    </p>
                </div>
            `;
            // Add required CSS
            const style = document.createElement('style');
            style.textContent = `
                .auth-modal { display: none; position: fixed; inset: 0; z-index: 5000; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); align-items: center; justify-content: center; }
                .auth-modal.active { display: flex; }
                @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `;
            document.head.appendChild(style);
            document.body.appendChild(modal);
        }

        document.getElementById('loginRequiredMessage').textContent = message || 'Please login to access this content.';
        modal.classList.add('active');
    },

    closeLoginRequired() {
        const modal = document.getElementById('loginRequiredModal');
        if (modal) modal.classList.remove('active');
    },

    // Check if activity at given index is accessible
    // Returns true if allowed, false if blocked (and shows modal)
    canAccessActivity(index, activityName) {
        // First activity (index 0) is always free
        if (index === 0) return true;

        // Check if logged in
        if (!BroProPlayer.isLoggedIn()) {
            this.showLoginRequired(`Login to unlock "${activityName}" and all other activities!`);
            return false;
        }

        return true;
    },

    // Add visible lock badges to activity cards
    addLockBadges() {
        // Only add locks if user is NOT logged in
        if (BroProPlayer.isLoggedIn()) return;

        // Add CSS for lock badges if not already added
        if (!document.getElementById('lock-badge-styles')) {
            const style = document.createElement('style');
            style.id = 'lock-badge-styles';
            style.textContent = `
                .lock-badge {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    z-index: 10;
                    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
                }
                .lock-badge::before {
                    content: '🔒';
                    font-size: 0.8rem;
                }
            `;
            document.head.appendChild(style);
        }

        // Find all activity cards and add lock badge to locked ones
        const cards = document.querySelectorAll('.activity-card');
        cards.forEach((card, index) => {
            // Skip first card (it's free) and leaderboard cards
            const isLeaderboard = card.textContent.toLowerCase().includes('leaderboard');
            if (index === 0 || isLeaderboard) return;

            // Check if lock badge already exists
            if (card.querySelector('.lock-badge')) return;

            // Make card position relative for badge positioning
            card.style.position = 'relative';

            // Create lock badge
            const badge = document.createElement('span');
            badge.className = 'lock-badge';
            badge.textContent = 'LOGIN';
            card.appendChild(badge);
        });
    }
};

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize sound system
    BroProSounds.init();

    // Add lock badges to locked activities
    setTimeout(() => {
        BroProAuth.addLockBadges();
    }, 100);

    // Check for achievements on page load
    const profile = BroProPlayer.load();
    const newAchievements = BroProAchievements.check(profile);

    newAchievements.forEach((achievement, i) => {
        setTimeout(() => {
            BroProAchievements.unlock(achievement.id);
        }, i * 1500);
    });
});

// Export for use in other scripts
window.BroProPlayer = BroProPlayer;
window.BroProAchievements = BroProAchievements;
window.BroProSounds = BroProSounds;
window.BroProEffects = BroProEffects;
window.BroProAuth = BroProAuth;
