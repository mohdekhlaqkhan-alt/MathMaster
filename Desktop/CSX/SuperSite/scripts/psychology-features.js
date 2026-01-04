/* ============================================
   BROPRO - PSYCHOLOGICAL ENGAGEMENT SYSTEM
   "System Phad Denge" Features
   ============================================ */

// ============================================
// 1. JADU KI JHAPPI - MYSTERY BOX SYSTEM
// Variable Reward Psychology (Loot Box)
// ============================================
const BroProMysteryBox = {
    // Reward probabilities and items
    rewards: {
        nothing: {
            probability: 0.60, // 60% chance
            items: [
                { type: 'meme', message: 'Better luck next time! 😅', emoji: '💨' },
                { type: 'meme', message: 'Arey yaar... kuch nahi mila! 🙈', emoji: '😤' },
                { type: 'meme', message: 'Box empty hai bhai! 📦', emoji: '😢' },
                { type: 'meme', message: 'Try again, champion! 💪', emoji: '🎲' },
                { type: 'meme', message: 'Agla box pakka lucky! 🤞', emoji: '⭐' }
            ]
        },
        common: {
            probability: 0.30, // 30% chance 
            items: [
                { type: 'xp', amount: 5, message: '+5 XP! 🎯', emoji: '⚡' },
                { type: 'xp', amount: 10, message: '+10 XP! Nice! 🌟', emoji: '✨' },
                { type: 'sticker', name: 'Chai Break ☕', message: 'You got a Chai Break sticker!', emoji: '☕' },
                { type: 'sticker', name: 'Samosa Time 🥟', message: 'Samosa sticker unlocked!', emoji: '🥟' },
                { type: 'sticker', name: 'Topper 📚', message: 'Topper badge for you!', emoji: '🎓' },
                { type: 'sticker', name: 'Night Owl 🦉', message: 'Night Owl badge!', emoji: '🦉' },
                { type: 'sticker', name: 'Early Bird 🐦', message: 'Early Bird badge!', emoji: '🐦' }
            ]
        },
        rare: {
            probability: 0.10, // 10% chance
            items: [
                { type: 'money', amount: 1, message: '₹1 added to wallet! 💰', emoji: '🎁', isRare: true },
                { type: 'money', amount: 2, message: '₹2! Jackpot! 🎰', emoji: '💎', isRare: true },
                { type: 'badge', name: 'Golden Samosa 🥟', message: 'RARE! Golden Samosa Badge! ✨', emoji: '🏆', isRare: true },
                { type: 'badge', name: 'Diamond Chai 💎', message: 'SUPER RARE! Diamond Chai Badge!', emoji: '👑', isRare: true },
                { type: 'xp', amount: 50, message: 'MEGA XP BOOST! +50 XP! 🚀', emoji: '🌟', isRare: true },
                { type: 'badge', name: 'Lucky Star ⭐', message: 'Lucky Star Badge! You are blessed!', emoji: '🌟', isRare: true }
            ]
        }
    },

    // Collectibles storage key
    STORAGE_KEY: 'bropro-collectibles',

    // Get user's collectibles
    getCollectibles() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{"stickers":[],"badges":[],"totalBoxesOpened":0}');
    },

    // Save collectibles
    saveCollectibles(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    // Roll for reward
    rollReward() {
        const random = Math.random();
        let cumulativeProbability = 0;

        for (const [tier, data] of Object.entries(this.rewards)) {
            cumulativeProbability += data.probability;
            if (random <= cumulativeProbability) {
                const items = data.items;
                const reward = items[Math.floor(Math.random() * items.length)];
                return { tier, ...reward };
            }
        }

        // Fallback to nothing
        const items = this.rewards.nothing.items;
        return { tier: 'nothing', ...items[0] };
    },

    // Apply reward to user
    applyReward(reward) {
        const profile = window.BroProPlayer?.load() || {};
        const collectibles = this.getCollectibles();

        collectibles.totalBoxesOpened = (collectibles.totalBoxesOpened || 0) + 1;

        switch (reward.type) {
            case 'xp':
                if (window.BroProPlayer) {
                    BroProPlayer.addXP(reward.amount);
                }
                break;

            case 'money':
                // Reverse the wallet spent to add money
                profile.walletSpent = Math.max(0, (profile.walletSpent || 0) - (reward.amount * 10));
                if (window.BroProPlayer) BroProPlayer.save(profile);
                break;

            case 'sticker':
                if (!collectibles.stickers.includes(reward.name)) {
                    collectibles.stickers.push(reward.name);
                }
                break;

            case 'badge':
                if (!collectibles.badges.includes(reward.name)) {
                    collectibles.badges.push(reward.name);
                }
                break;
        }

        this.saveCollectibles(collectibles);
        return reward;
    },

    // Show Mystery Box Modal
    showMysteryBox(source = 'quiz') {
        // Create/update modal
        let modal = document.getElementById('mysteryBoxModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'mysteryBoxModal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="mystery-box-overlay" onclick="BroProMysteryBox.closeBox()"></div>
            <div class="mystery-box-container">
                <div class="mystery-box-glow"></div>
                <div class="mystery-box-content">
                    <h2 class="mystery-box-title">🎁 Jadu Ki Jhappi!</h2>
                    <p class="mystery-box-subtitle">Tap the box to reveal your reward!</p>
                    
                    <div class="gift-box-wrapper" onclick="BroProMysteryBox.openReward()">
                        <div class="gift-box" id="mysteryGiftBox">
                            <div class="gift-lid">
                                <div class="gift-bow"></div>
                            </div>
                            <div class="gift-body">
                                <div class="gift-pattern"></div>
                            </div>
                        </div>
                        <div class="sparkles">
                            <span class="sparkle">✨</span>
                            <span class="sparkle">⭐</span>
                            <span class="sparkle">💫</span>
                            <span class="sparkle">🌟</span>
                        </div>
                    </div>
                    
                    <div class="mystery-reward-reveal" id="mysteryRewardReveal" style="display: none;">
                        <div class="reward-emoji" id="rewardEmoji">🎁</div>
                        <div class="reward-message" id="rewardMessage">Opening...</div>
                        <div class="reward-tier" id="rewardTier"></div>
                    </div>
                    
                    <button class="mystery-close-btn" onclick="BroProMysteryBox.closeBox()">
                        Skip
                    </button>
                </div>
            </div>
        `;

        modal.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        this.addMysteryBoxStyles();
    },

    // Open the reward
    openReward() {
        const giftBox = document.getElementById('mysteryGiftBox');
        const revealDiv = document.getElementById('mysteryRewardReveal');

        if (giftBox.classList.contains('opened')) return;

        // Add opening animation
        giftBox.classList.add('opening');

        // Play sound
        if (window.BroProSounds) {
            BroProSounds.play('click');
        }

        setTimeout(() => {
            giftBox.classList.remove('opening');
            giftBox.classList.add('opened');

            // Roll and apply reward
            const reward = this.rollReward();
            this.applyReward(reward);

            // Show reveal
            setTimeout(() => {
                revealDiv.style.display = 'block';
                document.getElementById('rewardEmoji').textContent = reward.emoji;
                document.getElementById('rewardMessage').textContent = reward.message;

                const tierBadge = document.getElementById('rewardTier');
                if (reward.isRare) {
                    tierBadge.innerHTML = '<span class="rare-badge">🌟 RARE!</span>';
                    // Play special sound for rare
                    if (window.BroProSounds) {
                        BroProSounds.play('levelup');
                    }
                    // Add confetti for rare
                    this.showConfetti();
                } else if (reward.tier === 'common') {
                    tierBadge.innerHTML = '<span class="common-badge">✓ Nice!</span>';
                    if (window.BroProSounds) {
                        BroProSounds.play('correct');
                    }
                } else {
                    tierBadge.innerHTML = '<span class="empty-badge">😅</span>';
                }

                revealDiv.style.animation = 'revealBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }, 300);
        }, 500);
    },

    // Show confetti for rare items
    showConfetti() {
        const confettiCount = 50;
        const container = document.querySelector('.mystery-box-container');

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'mystery-confetti';
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3'][Math.floor(Math.random() * 6)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                animation: confettiFall ${1.5 + Math.random()}s ease-out forwards;
                animation-delay: ${Math.random() * 0.3}s;
            `;
            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 2500);
        }
    },

    // Close mystery box
    closeBox() {
        const modal = document.getElementById('mysteryBoxModal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => modal.remove(), 300);
        }
    },

    // Add CSS styles
    addMysteryBoxStyles() {
        if (document.getElementById('mysteryBoxStyles')) return;

        const style = document.createElement('style');
        style.id = 'mysteryBoxStyles';
        style.textContent = `
            .mystery-box-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(10px);
            }
            
            .mystery-box-container {
                position: relative;
                background: linear-gradient(145deg, #1a1a2e, #16213e);
                border: 2px solid rgba(255, 215, 0, 0.3);
                border-radius: 24px;
                padding: 2rem;
                width: 90%;
                max-width: 380px;
                text-align: center;
                box-shadow: 
                    0 25px 80px rgba(0, 0, 0, 0.5),
                    0 0 60px rgba(255, 215, 0, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
                animation: modalPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .mystery-box-glow {
                position: absolute;
                inset: -20px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
                pointer-events: none;
                animation: pulseGlow 2s ease-in-out infinite;
            }
            
            .mystery-box-title {
                font-size: 1.8rem;
                color: #ffd700;
                margin: 0 0 0.5rem;
                text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            }
            
            .mystery-box-subtitle {
                color: rgba(255, 255, 255, 0.7);
                margin: 0 0 2rem;
                font-size: 0.95rem;
            }
            
            .gift-box-wrapper {
                position: relative;
                display: inline-block;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .gift-box-wrapper:hover {
                transform: scale(1.05);
            }
            
            .gift-box {
                position: relative;
                width: 120px;
                height: 100px;
                margin: 0 auto;
            }
            
            .gift-lid {
                position: absolute;
                top: 0;
                left: -10px;
                right: -10px;
                height: 30px;
                background: linear-gradient(135deg, #ff6b6b, #ee5253);
                border-radius: 8px;
                z-index: 2;
                transform-origin: bottom;
                transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                box-shadow: 0 5px 20px rgba(238, 82, 83, 0.3);
            }
            
            .gift-bow {
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                height: 40px;
                background: radial-gradient(circle, #ffd700, #f9ca24);
                border-radius: 50%;
                box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
            }
            
            .gift-bow::before, .gift-bow::after {
                content: '';
                position: absolute;
                width: 25px;
                height: 25px;
                background: #ffd700;
                border-radius: 50% 0;
                top: 8px;
            }
            
            .gift-bow::before {
                left: -15px;
                transform: rotate(-45deg);
            }
            
            .gift-bow::after {
                right: -15px;
                transform: rotate(45deg);
            }
            
            .gift-body {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 70px;
                background: linear-gradient(135deg, #ff6b6b, #ee5253);
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(238, 82, 83, 0.3);
            }
            
            .gift-pattern {
                position: absolute;
                inset: 0;
                background: 
                    linear-gradient(90deg, transparent 45%, #ffd700 45%, #ffd700 55%, transparent 55%),
                    linear-gradient(0deg, transparent 45%, #ffd700 45%, #ffd700 55%, transparent 55%);
                opacity: 0.8;
            }
            
            .sparkles {
                position: absolute;
                inset: -30px;
                pointer-events: none;
            }
            
            .sparkle {
                position: absolute;
                font-size: 1.5rem;
                animation: sparkleFloat 2s ease-in-out infinite;
            }
            
            .sparkle:nth-child(1) { top: 0; left: 20%; animation-delay: 0s; }
            .sparkle:nth-child(2) { top: 30%; right: 0; animation-delay: 0.3s; }
            .sparkle:nth-child(3) { bottom: 0; left: 30%; animation-delay: 0.6s; }
            .sparkle:nth-child(4) { top: 50%; left: 0; animation-delay: 0.9s; }
            
            .gift-box.opening .gift-lid {
                animation: lidShake 0.5s ease-in-out;
            }
            
            .gift-box.opened .gift-lid {
                transform: rotateX(-120deg) translateY(-30px);
            }
            
            .mystery-reward-reveal {
                margin-top: 1.5rem;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .reward-emoji {
                font-size: 4rem;
                margin-bottom: 0.5rem;
                animation: bounceEmoji 0.6s ease infinite;
            }
            
            .reward-message {
                font-size: 1.1rem;
                color: white;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }
            
            .rare-badge {
                display: inline-block;
                background: linear-gradient(135deg, #ffd700, #ff8c00);
                color: #000;
                padding: 0.3rem 1rem;
                border-radius: 20px;
                font-weight: 700;
                font-size: 0.85rem;
                animation: rarePulse 0.5s ease infinite alternate;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            }
            
            .common-badge {
                display: inline-block;
                background: rgba(74, 222, 128, 0.2);
                color: #4ade80;
                padding: 0.3rem 1rem;
                border-radius: 20px;
                font-size: 0.85rem;
            }
            
            .empty-badge {
                font-size: 1.5rem;
            }
            
            .mystery-close-btn {
                margin-top: 1.5rem;
                padding: 0.75rem 2rem;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.9rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .mystery-close-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: white;
            }
            
            @keyframes modalPop {
                from { opacity: 0; transform: scale(0.8) translateY(20px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            
            @keyframes pulseGlow {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }
            
            @keyframes sparkleFloat {
                0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
                50% { transform: translateY(-10px) rotate(180deg); opacity: 0.5; }
            }
            
            @keyframes lidShake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-5deg); }
                75% { transform: rotate(5deg); }
            }
            
            @keyframes bounceEmoji {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes rarePulse {
                from { transform: scale(1); }
                to { transform: scale(1.05); }
            }
            
            @keyframes revealBounce {
                from { opacity: 0; transform: scale(0.5); }
                to { opacity: 1; transform: scale(1); }
            }
            
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
            }
            
            @keyframes fadeOut {
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
};


// ============================================
// 2. STREAK & SHAME SYSTEM
// Loss Aversion Psychology
// ============================================
const BroProStreak = {
    // Avatar states based on streak/health
    avatarStates: {
        healthy: {
            condition: (streak) => streak > 0,
            filter: 'none',
            overlay: null,
            message: null
        },
        sick: {
            condition: (streak, missedDays) => missedDays === 1,
            filter: 'grayscale(30%) brightness(0.9)',
            overlay: '😴',
            message: 'Your avatar is getting sleepy...'
        },
        verySick: {
            condition: (streak, missedDays) => missedDays >= 2,
            filter: 'grayscale(60%) brightness(0.7)',
            overlay: '😷',
            message: 'Your avatar is sick! Answer 5 questions to heal!'
        },
        dead: {
            condition: (streak, missedDays) => missedDays >= 3,
            filter: 'grayscale(100%) brightness(0.5)',
            overlay: '💀',
            message: 'Your avatar needs revival! Complete a quiz now!'
        }
    },

    STORAGE_KEY: 'bropro-streak-data',
    HEAL_QUESTIONS_NEEDED: 5,

    // Get streak data
    getStreakData() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : {
            lastActiveDate: null,
            currentStreak: 0,
            healingProgress: 0,
            avatarHealth: 'healthy',
            totalDaysActive: 0
        };
    },

    // Save streak data
    saveStreakData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    // Check and update streak
    checkStreak() {
        const data = this.getStreakData();
        const today = new Date().toDateString();
        const lastActive = data.lastActiveDate ? new Date(data.lastActiveDate) : null;

        if (!lastActive) {
            // First time user
            data.lastActiveDate = today;
            data.currentStreak = 1;
            data.totalDaysActive = 1;
            data.avatarHealth = 'healthy';
            this.saveStreakData(data);
            return data;
        }

        const lastActiveDate = new Date(data.lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastActiveDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            // Same day, no change
            return data;
        } else if (diffDays === 1) {
            // Consecutive day - increase streak
            data.currentStreak++;
            data.lastActiveDate = today;
            data.totalDaysActive++;
            data.avatarHealth = 'healthy';
            data.healingProgress = 0;
        } else {
            // Missed days - avatar gets sick
            data.missedDays = diffDays;

            if (diffDays === 1) {
                data.avatarHealth = 'sick';
            } else if (diffDays === 2) {
                data.avatarHealth = 'verySick';
            } else {
                data.avatarHealth = 'dead';
            }

            data.currentStreak = 0;
        }

        this.saveStreakData(data);
        return data;
    },

    // Record correct answer for healing
    recordCorrectAnswer() {
        const data = this.getStreakData();

        if (data.avatarHealth !== 'healthy') {
            data.healingProgress = (data.healingProgress || 0) + 1;

            if (data.healingProgress >= this.HEAL_QUESTIONS_NEEDED) {
                // Avatar is healed!
                data.avatarHealth = 'healthy';
                data.healingProgress = 0;
                data.lastActiveDate = new Date().toDateString();
                data.currentStreak = 1;

                this.saveStreakData(data);
                this.showHealingComplete();
                return true;
            }

            this.saveStreakData(data);
            this.updateHealingProgress(data.healingProgress);
        }

        return false;
    },

    // Apply avatar state visually
    applyAvatarState() {
        const data = this.checkStreak();
        const state = this.avatarStates[data.avatarHealth];

        // Find all avatar elements
        const avatars = document.querySelectorAll('.profile-avatar, .nav-avatar, .mobile-avatar, [id*="Avatar"]');

        avatars.forEach(avatar => {
            if (avatar) {
                avatar.style.filter = state.filter;

                // Add overlay emoji if sick
                if (state.overlay && !avatar.querySelector('.avatar-state-overlay')) {
                    const overlay = document.createElement('span');
                    overlay.className = 'avatar-state-overlay';
                    overlay.style.cssText = `
                        position: absolute;
                        bottom: -5px;
                        right: -5px;
                        font-size: 1.2rem;
                        z-index: 10;
                    `;
                    overlay.textContent = state.overlay;
                    avatar.style.position = 'relative';
                    avatar.appendChild(overlay);
                }
            }
        });

        // Show notification if avatar is sick
        if (state.message && data.avatarHealth !== 'healthy') {
            this.showSickNotification(state.message, data.avatarHealth);
        }
    },

    // Show sick notification
    showSickNotification(message, healthState) {
        // Only show once per session
        if (sessionStorage.getItem('streak-notification-shown')) return;
        sessionStorage.setItem('streak-notification-shown', 'true');

        const notification = document.createElement('div');
        notification.className = 'streak-sick-notification';
        notification.innerHTML = `
            <div class="sick-notif-content">
                <span class="sick-emoji">${this.avatarStates[healthState].overlay}</span>
                <div class="sick-text">
                    <strong>Oh no!</strong>
                    <p>${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()">Got it!</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 16px;
            padding: 1rem 1.5rem;
            z-index: 10000;
            animation: slideUp 0.5s ease;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        `;

        this.addStreakStyles();
        document.body.appendChild(notification);

        // Auto remove after 10s
        setTimeout(() => notification.remove(), 10000);
    },

    // Show healing progress
    updateHealingProgress(progress) {
        let progressBar = document.getElementById('healingProgressBar');

        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'healingProgressBar';
            progressBar.innerHTML = `
                <div class="healing-bar-content">
                    <span>💊 Healing: ${progress}/${this.HEAL_QUESTIONS_NEEDED}</span>
                    <div class="healing-progress">
                        <div class="healing-fill" style="width: ${(progress / this.HEAL_QUESTIONS_NEEDED) * 100}%"></div>
                    </div>
                </div>
            `;
            progressBar.style.cssText = `
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #22c55e, #16a34a);
                padding: 0.75rem 1.5rem;
                border-radius: 20px;
                z-index: 9999;
                box-shadow: 0 5px 20px rgba(34, 197, 94, 0.3);
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.querySelector('span').textContent = `💊 Healing: ${progress}/${this.HEAL_QUESTIONS_NEEDED}`;
            progressBar.querySelector('.healing-fill').style.width = `${(progress / this.HEAL_QUESTIONS_NEEDED) * 100}%`;
        }
    },

    // Show healing complete celebration
    showHealingComplete() {
        const healingBar = document.getElementById('healingProgressBar');
        if (healingBar) healingBar.remove();

        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <div class="healing-complete-content">
                <span class="healing-emoji">🎉</span>
                <h3>Avatar Healed!</h3>
                <p>Your avatar is back to full health!</p>
            </div>
        `;
        celebration.style.cssText = `
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.8);
            z-index: 100000;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(celebration);

        if (window.BroProSounds) {
            BroProSounds.play('levelup');
        }

        // Remove avatar sick states
        document.querySelectorAll('.avatar-state-overlay').forEach(el => el.remove());
        document.querySelectorAll('.profile-avatar, .nav-avatar').forEach(el => {
            el.style.filter = 'none';
        });

        setTimeout(() => celebration.remove(), 3000);
    },

    // Add streak styles
    addStreakStyles() {
        if (document.getElementById('streakStyles')) return;

        const style = document.createElement('style');
        style.id = 'streakStyles';
        style.textContent = `
            .sick-notif-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .sick-emoji {
                font-size: 2.5rem;
                animation: wobble 1s ease infinite;
            }
            
            .sick-text strong {
                color: #ef4444;
                display: block;
                margin-bottom: 0.25rem;
            }
            
            .sick-text p {
                color: rgba(255, 255, 255, 0.7);
                margin: 0;
                font-size: 0.9rem;
            }
            
            .sick-notif-content button {
                padding: 0.5rem 1rem;
                background: linear-gradient(135deg, #22c55e, #16a34a);
                border: none;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                cursor: pointer;
            }
            
            .healing-bar-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                color: white;
            }
            
            .healing-progress {
                width: 150px;
                height: 8px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                overflow: hidden;
            }
            
            .healing-fill {
                height: 100%;
                background: white;
                border-radius: 4px;
                transition: width 0.3s ease;
            }
            
            .healing-complete-content {
                text-align: center;
                color: white;
                animation: celebrationBounce 0.5s ease;
            }
            
            .healing-emoji {
                font-size: 5rem;
                display: block;
                margin-bottom: 1rem;
            }
            
            @keyframes wobble {
                0%, 100% { transform: rotate(-5deg); }
                50% { transform: rotate(5deg); }
            }
            
            @keyframes celebrationBounce {
                0% { transform: scale(0); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            @keyframes slideUp {
                from { transform: translateX(-50%) translateY(100px); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    },

    // Generate engaging push notification messages
    getStreakMessage(streak) {
        const messages = [
            `🔥 ${streak} day streak! You're on fire!`,
            `💪 Day ${streak}! Keep crushing it!`,
            `⭐ ${streak} days straight! Legend status!`,
            `🚀 ${streak} day streak! Unstoppable!`
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }
};


// ============================================
// 3. ROAST MODE - SARCASTIC AI TOGGLE
// Personality-based Engagement
// ============================================
const BroProRoastMode = {
    STORAGE_KEY: 'bropro-roast-mode',

    isEnabled() {
        return localStorage.getItem(this.STORAGE_KEY) === 'true';
    },

    toggle() {
        const current = this.isEnabled();
        localStorage.setItem(this.STORAGE_KEY, (!current).toString());
        return !current;
    },

    setEnabled(enabled) {
        localStorage.setItem(this.STORAGE_KEY, enabled.toString());
    },

    // Sarcastic responses for simple questions
    sarcasticResponses: {
        simpleQuestions: [
            "Seriously? You opened the app for this? 😏",
            "Bhai, Google bhi hai duniya mein! 🙄",
            "Yeh toh bachcha bhi bata deta! 😤",
            "Kya yaar, thoda dimag lagao! 🧠",
            "Basic hai boss, ab kuch mushkil pucho! 💪",
            "Arey yaar, calculator use karo! 📱"
        ],
        encouragement: [
            "Now THAT'S a BroPro-worthy question! 🔥",
            "Ab baat ban rahi hai! 💯",
            "That's more like it, champion! 🏆",
            "Finally, a challenge! Let's go! 🚀"
        ]
    },

    // Get a random sarcastic response
    getResponse(type = 'simpleQuestions') {
        const responses = this.sarcasticResponses[type] || this.sarcasticResponses.simpleQuestions;
        return responses[Math.floor(Math.random() * responses.length)];
    },

    // Check if question is "too simple" (for roast mode)
    isSimpleQuestion(question) {
        const simplePatterns = [
            /what is \d\s*[\+\-\*\/x]\s*\d/i,
            /\d\s*[\+\-\*\/x]\s*\d\s*=?\s*\??/i,
            /what is .*capital/i,
            /spell .{1,5}$/i,
            /how do you say (hello|hi|bye)/i
        ];

        return simplePatterns.some(pattern => pattern.test(question));
    }
};


// ============================================
// 4. DIFFICULTY LEVELS - LOCAL FLAVOR
// "Faizabad Touch" - Indian Gaming Names
// ============================================
const BroProDifficulty = {
    levels: {
        easy: {
            name: 'Bachcha',
            nameHindi: 'बच्चा',
            emoji: '🍼',
            color: '#22c55e',
            description: 'Baby steps! Perfect for beginners.',
            descriptionHindi: 'शुरुआती स्तर'
        },
        medium: {
            name: 'Khiladi',
            nameHindi: 'खिलाड़ी',
            emoji: '🎮',
            color: '#f59e0b',
            description: 'Game on! You know your stuff.',
            descriptionHindi: 'खेल शुरू!'
        },
        hard: {
            name: 'Bahubali',
            nameHindi: 'बाहुबली',
            emoji: '💪',
            color: '#ef4444',
            description: 'Only legends survive here!',
            descriptionHindi: 'सिर्फ लीजेंड्स के लिए!'
        }
    },

    // Get difficulty info
    getLevel(key) {
        return this.levels[key] || this.levels.medium;
    },

    // Render difficulty selector
    renderSelector(containerId, onSelect) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="difficulty-selector">
                ${Object.entries(this.levels).map(([key, level]) => `
                    <button class="difficulty-btn" data-level="${key}" 
                            style="--level-color: ${level.color};">
                        <span class="diff-emoji">${level.emoji}</span>
                        <span class="diff-name">${level.name}</span>
                        <span class="diff-name-hindi">${level.nameHindi}</span>
                    </button>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                if (onSelect) onSelect(btn.dataset.level);
            });
        });

        this.addDifficultyStyles();
    },

    addDifficultyStyles() {
        if (document.getElementById('difficultyStyles')) return;

        const style = document.createElement('style');
        style.id = 'difficultyStyles';
        style.textContent = `
            .difficulty-selector {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
                padding: 1rem;
            }
            
            .difficulty-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                padding: 1.5rem 2rem;
                background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                min-width: 120px;
            }
            
            .difficulty-btn:hover {
                transform: translateY(-5px);
                border-color: var(--level-color);
                box-shadow: 0 10px 30px color-mix(in srgb, var(--level-color) 30%, transparent);
            }
            
            .difficulty-btn.selected {
                background: linear-gradient(145deg, color-mix(in srgb, var(--level-color) 20%, transparent), color-mix(in srgb, var(--level-color) 10%, transparent));
                border-color: var(--level-color);
                box-shadow: 0 0 30px color-mix(in srgb, var(--level-color) 30%, transparent);
            }
            
            .diff-emoji {
                font-size: 2.5rem;
            }
            
            .diff-name {
                font-size: 1.1rem;
                font-weight: 700;
                color: white;
            }
            
            .diff-name-hindi {
                font-size: 0.9rem;
                color: rgba(255,255,255,0.6);
            }
        `;
        document.head.appendChild(style);
    }
};


// ============================================
// 5. AUDIO EFFECTS - LOCAL FLAVOR
// Dhol beats, Indian Sound Effects
// ============================================
const BroProLocalSounds = {
    sounds: {
        levelUp: {
            type: 'dhol',
            url: null, // Will generate procedurally
            fallbackFreqs: [200, 300, 400, 300, 200, 400, 500] // Simulated dhol pattern
        },
        achievement: {
            type: 'celebration',
            fallbackFreqs: [523, 659, 784, 1047] // Victory fanfare
        },
        correct: {
            type: 'positive',
            fallbackFreqs: [440, 550, 660] // Pleasant ding
        },
        wrong: {
            type: 'negative',
            fallbackFreqs: [220, 180] // Low buzz
        }
    },

    audioContext: null,

    // Get audio context - reuse from BroProSounds to avoid conflicts
    getAudioContext() {
        // Reuse BroProSounds audioContext if available (to avoid multiple contexts)
        if (window.BroProSounds && BroProSounds.audioContext) {
            this.audioContext = BroProSounds.audioContext;
            return this.audioContext;
        }

        // Only create new context if BroProSounds isn't available
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log('Web Audio not available');
            }
        }
        return this.audioContext;
    },

    init() {
        // Lazy initialization - will use getAudioContext() when needed
        console.log('🎵 BroProLocalSounds ready (will use shared AudioContext)');
    },

    // Play a simulated dhol beat for level up
    playDholBeat() {
        const ctx = this.getAudioContext();
        if (!ctx) return;

        // Resume context if suspended
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const freqs = this.sounds.levelUp.fallbackFreqs;
        const duration = 0.1;

        freqs.forEach((freq, i) => {
            setTimeout(() => {
                this.playDrum(freq, duration);
            }, i * 100);
        });
    },

    playDrum(frequency, duration) {
        const ctx = this.getAudioContext();
        if (!ctx) return;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(frequency, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, ctx.currentTime + duration);

            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            console.log('Sound error:', e);
        }
    }
};


// ============================================
// 6. ADULTS CHALLENGE MODE
// "Are You Smarter Than a 5th Grader?"
// ============================================
const BroProAdultsChallenge = {
    STORAGE_KEY: 'bropro-adults-challenge',

    // Leaderboard data
    getLeaderboard() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY + '-leaderboard') || '{"students":[],"adults":[]}');
    },

    saveLeaderboard(data) {
        localStorage.setItem(this.STORAGE_KEY + '-leaderboard', JSON.stringify(data));
    },

    // Check if user is in adult mode
    isAdultMode() {
        return localStorage.getItem(this.STORAGE_KEY + '-mode') === 'adult';
    },

    setAdultMode(isAdult) {
        localStorage.setItem(this.STORAGE_KEY + '-mode', isAdult ? 'adult' : 'student');
    },

    // Get generation war stats
    getGenerationWarStats() {
        const leaderboard = this.getLeaderboard();
        const studentTotal = leaderboard.students.reduce((sum, s) => sum + s.score, 0);
        const adultTotal = leaderboard.adults.reduce((sum, a) => sum + a.score, 0);

        return {
            studentTotal,
            adultTotal,
            leadingTeam: studentTotal >= adultTotal ? 'students' : 'adults',
            difference: Math.abs(studentTotal - adultTotal)
        };
    },

    // Render the challenge section
    renderChallengeSection(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const stats = this.getGenerationWarStats();

        container.innerHTML = `
            <div class="adults-challenge-section">
                <div class="challenge-header">
                    <h2>🎯 Are You Smarter Than a 5th Grader?</h2>
                    <p class="challenge-tagline">Uncles & Aunties vs Students - The Ultimate Showdown!</p>
                </div>
                
                <div class="generation-war">
                    <div class="war-team students ${stats.leadingTeam === 'students' ? 'leading' : ''}">
                        <span class="team-emoji">👦👧</span>
                        <span class="team-name">Team Students</span>
                        <span class="team-score">${stats.studentTotal.toLocaleString()} pts</span>
                    </div>
                    <div class="war-vs">VS</div>
                    <div class="war-team adults ${stats.leadingTeam === 'adults' ? 'leading' : ''}">
                        <span class="team-emoji">👨‍🦳👩‍🦳</span>
                        <span class="team-name">Team Adults</span>
                        <span class="team-score">${stats.adultTotal.toLocaleString()} pts</span>
                    </div>
                </div>
                
                <div class="challenge-cta">
                    <button class="challenge-btn-student" onclick="BroProAdultsChallenge.startChallenge('student')">
                        I'm a Student 📚
                    </button>
                    <button class="challenge-btn-adult" onclick="BroProAdultsChallenge.startChallenge('adult')">
                        I'm an Adult 🎩
                    </button>
                </div>
                
                <p class="challenge-hint">
                    ${stats.leadingTeam === 'adults'
                ? '😱 Adults are winning! Students, defend your honor!'
                : '🎉 Students are in the lead! Adults, time to prove yourself!'}
                </p>
            </div>
        `;

        this.addChallengeStyles();
    },

    startChallenge(mode) {
        this.setAdultMode(mode === 'adult');
        // Redirect to a special quiz or trigger quiz modal
        if (typeof openSubjectQuiz === 'function') {
            openSubjectQuiz('mathematics', 'Bahubali');
        } else {
            console.log('Starting challenge mode:', mode);
        }
    },

    // Record score for generation war
    recordScore(score, isCorrect) {
        const leaderboard = this.getLeaderboard();
        const mode = this.isAdultMode() ? 'adults' : 'students';
        const profile = window.BroProPlayer?.load() || {};

        const entry = {
            name: profile.name || 'Anonymous',
            score: score,
            date: new Date().toISOString()
        };

        leaderboard[mode].push(entry);

        // Keep only top 100
        leaderboard[mode] = leaderboard[mode]
            .sort((a, b) => b.score - a.score)
            .slice(0, 100);

        this.saveLeaderboard(leaderboard);
    },

    addChallengeStyles() {
        if (document.getElementById('challengeStyles')) return;

        const style = document.createElement('style');
        style.id = 'challengeStyles';
        style.textContent = `
            .adults-challenge-section {
                background: linear-gradient(145deg, #1a1a2e, #16213e);
                border-radius: 24px;
                padding: 2rem;
                margin: 2rem 0;
                border: 1px solid rgba(255, 215, 0, 0.2);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .challenge-header {
                text-align: center;
                margin-bottom: 2rem;
            }
            
            .challenge-header h2 {
                font-size: 1.8rem;
                color: #ffd700;
                margin: 0 0 0.5rem;
            }
            
            .challenge-tagline {
                color: rgba(255, 255, 255, 0.7);
                margin: 0;
            }
            
            .generation-war {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.5rem;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }
            
            .war-team {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                padding: 1.5rem 2rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 16px;
                border: 2px solid rgba(255, 255, 255, 0.1);
                min-width: 140px;
                transition: all 0.3s ease;
            }
            
            .war-team.leading {
                background: rgba(255, 215, 0, 0.1);
                border-color: #ffd700;
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
            }
            
            .war-team.leading::after {
                content: '👑';
                position: absolute;
                top: -15px;
                font-size: 1.5rem;
            }
            
            .team-emoji {
                font-size: 2rem;
            }
            
            .team-name {
                font-weight: 600;
                color: white;
            }
            
            .team-score {
                font-size: 1.2rem;
                font-weight: 700;
                color: #ffd700;
            }
            
            .war-vs {
                font-size: 1.5rem;
                font-weight: 800;
                color: #ef4444;
                text-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
            }
            
            .challenge-cta {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .challenge-btn-student, .challenge-btn-adult {
                padding: 1rem 2rem;
                border: none;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .challenge-btn-student {
                background: linear-gradient(135deg, #3b82f6, #2563eb);
                color: white;
            }
            
            .challenge-btn-adult {
                background: linear-gradient(135deg, #8b5cf6, #7c3aed);
                color: white;
            }
            
            .challenge-btn-student:hover, .challenge-btn-adult:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .challenge-hint {
                text-align: center;
                color: rgba(255, 255, 255, 0.6);
                margin-top: 1.5rem;
                font-style: italic;
            }
        `;
        document.head.appendChild(style);
    }
};


// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize streak system
    setTimeout(() => {
        BroProStreak.checkStreak();
        BroProStreak.applyAvatarState();
    }, 1000);

    // Note: BroProLocalSounds uses lazy initialization to avoid AudioContext conflicts
    // It will reuse BroProSounds.audioContext when available

    console.log('🎮 BroPro Psychology Features Loaded!');
    console.log('   📦 Mystery Box: BroProMysteryBox');
    console.log('   🔥 Streak System: BroProStreak');
    console.log('   😏 Roast Mode: BroProRoastMode');
    console.log('   🎯 Difficulty: BroProDifficulty');
    console.log('   🎵 Local Sounds: BroProLocalSounds');
    console.log('   👨‍🦳 Adults Challenge: BroProAdultsChallenge');
    console.log('   🧪 Test functions: testMysteryBox(), testStreak(), testRoastToggle()');
});

// Make globally available
window.BroProMysteryBox = BroProMysteryBox;
window.BroProStreak = BroProStreak;
window.BroProRoastMode = BroProRoastMode;
window.BroProDifficulty = BroProDifficulty;
window.BroProLocalSounds = BroProLocalSounds;
window.BroProAdultsChallenge = BroProAdultsChallenge;

// ============================================
// TEST FUNCTIONS (for development/debugging)
// Call these in browser console to test features
// ============================================
window.testMysteryBox = function () {
    console.log('🎁 Force-opening Mystery Box...');
    if (window.BroProMysteryBox) {
        BroProMysteryBox.showMysteryBox('test');
    } else {
        console.error('BroProMysteryBox not available!');
    }
};

window.testStreak = function () {
    console.log('🔥 Testing Streak System...');
    if (window.BroProStreak) {
        const data = BroProStreak.checkStreak();
        console.log('Current streak data:', data);
        BroProStreak.applyAvatarState();
        console.log('Avatar state applied!');
    } else {
        console.error('BroProStreak not available!');
    }
};

window.testRoastToggle = function () {
    console.log('😈 Toggling Roast Mode...');
    if (window.BroProRoastMode) {
        const currentState = BroProRoastMode.isEnabled();
        BroProRoastMode.setEnabled(!currentState);
        console.log('Roast Mode is now:', !currentState ? 'ENABLED 😈' : 'DISABLED 😇');
    } else {
        console.error('BroProRoastMode not available!');
    }
};

window.testDifficulty = function () {
    console.log('🎯 Testing Difficulty System...');
    if (window.BroProDifficulty) {
        console.log('Levels:', BroProDifficulty.levels);
        console.log('Current:', BroProDifficulty.getCurrentDifficulty());
    } else {
        console.error('BroProDifficulty not available!');
    }
};
