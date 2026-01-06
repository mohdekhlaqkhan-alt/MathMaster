/* ============================================
   SUPERSITE - MAIN APPLICATION
   ============================================ */

// Subject Data
const subjects = [
    {
        id: 'mathematics',
        name: 'Mathematics (AnuSquare)',
        icon: '📐',
        gradient: 'math-gradient',
        description: 'Master numbers, algebra, geometry, and more with interactive problem-solving.',
        topics: ['Algebra', 'Geometry', 'Calculus'],
        stats: { topics: '25+', quizzes: '100+' },
        badge: '🎮 AnuSquare Integrated',
        available: true // Will link to MathMaster
    },
    {
        id: 'science',
        name: 'Science',
        icon: '🔬',
        gradient: 'science-gradient',
        description: 'Explore physics, chemistry, and biology through interactive quizzes.',
        topics: ['Physics', 'Chemistry', 'Biology'],
        stats: { topics: '9', quizzes: '90+' },
        badge: '🧪 Lab Ready',
        available: true
    },
    {
        id: 'geography',
        name: 'Geography',
        icon: '🌍',
        gradient: 'geography-gradient',
        description: 'Discover the world with interactive maps, coordinates, and climate explorations.',
        topics: ['World Maps', 'Climate', 'Countries'],
        stats: { topics: '20+', quizzes: '50+' },
        badge: '🗺️ Interactive Maps',
        available: true
    },
    {
        id: 'history',
        name: 'History',
        icon: '📜',
        gradient: 'history-gradient',
        description: 'Travel through time with interactive timelines and stories.',
        topics: ['Ancient', 'Medieval', 'Modern'],
        stats: { topics: '35+', quizzes: '80+' },
        badge: '📜 Time Traveler',
        available: true
    },
    {
        id: 'english',
        name: 'English',
        icon: '📖',
        gradient: 'languages-gradient',
        description: 'Master grammar, vocabulary, and word skills.',
        topics: ['Grammar', 'Vocabulary', 'Spelling'],
        stats: { topics: '6', quizzes: '60+' },
        badge: '📝 Word Wizard',
        available: true
    },
    {
        id: 'hindi',
        name: 'हिंदी',
        icon: '🇮🇳',
        gradient: 'hindi-gradient',
        description: 'व्याकरण, शब्दावली और मुहावरे सीखें!',
        topics: ['व्याकरण', 'शब्दावली', 'मुहावरे'],
        stats: { topics: '6', quizzes: '60+' },
        badge: '🪔 भाषा ज्ञानी',
        available: true
    },
    {
        id: 'gk',
        name: 'General Knowledge',
        icon: '🧠',
        gradient: 'gk-gradient',
        description: 'Expand your mind with fascinating facts!',
        topics: ['Personalities', 'Sports', 'India'],
        stats: { topics: '8', quizzes: '80+' },
        badge: '💡 Quiz Master',
        available: true
    },
    {
        id: 'computer-science',
        name: 'Computer Science',
        icon: '💻',
        gradient: 'cs-gradient',
        description: 'Learn coding, logic, and computational thinking.',
        topics: ['Coding', 'Logic', 'Web Dev'],
        stats: { topics: '20+', quizzes: '100+' },
        available: false
    },
    {
        id: 'leaderboard',
        name: 'Leaderboard',
        icon: '🏆',
        gradient: 'leaderboard-gradient',
        description: 'See the top champions across all subjects!',
        topics: ['Rankings', 'XP Leaders', 'Champions'],
        stats: { topics: 'Top 10', quizzes: 'Global' },
        badge: '👑 Champions',
        available: true,
        isSpecial: true
    }
];

// Features Data
const features = [
    { icon: '🎮', title: 'Gamified Learning', description: 'Earn XP, level up, and earn real rupees in your wallet!' },
    { icon: '🧪', title: 'Interactive Labs', description: 'Conduct virtual experiments and see concepts come to life.' },
    { icon: '🔊', title: 'Sound Effects', description: 'Fun audio feedback for correct answers, combos, and achievements.' },
    { icon: '🏆', title: 'Achievements', description: 'Earn badges and trophies as you master new skills.' },
    { icon: '📱', title: 'Learn Anywhere', description: 'Access lessons on any device - mobile, tablet, or desktop.' },
    { icon: '🌙', title: 'Dark Mode', description: 'Easy on the eyes with a beautiful dark theme.' }
];

// DOM Elements
const subjectsGrid = document.getElementById('subjectsGrid');
const featuresGrid = document.getElementById('featuresGrid');
const modal = document.getElementById('comingSoonModal');
const themeToggle = document.getElementById('themeToggle');

// Render Subject Cards
function renderSubjects() {
    if (!subjectsGrid) return;
    subjectsGrid.innerHTML = subjects.map(subject => `
        <div class="subject-card" data-subject="${subject.id}" onclick="openSubject('${subject.id}')">
            <div class="card-glow"></div>
            <div class="card-content">
                <div class="card-icon-wrapper ${subject.gradient}">
                    <span class="card-icon">${subject.icon}</span>
                </div>
                <h3 class="card-title">${subject.name}</h3>
                <p class="card-description">${subject.description}</p>
                <div class="card-topics">
                    ${subject.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
                </div>
                <div class="card-footer">
                    <div class="card-stats">
                        <span class="stat">${subject.stats.topics} Topics</span>
                        <span class="stat">${subject.stats.quizzes} Quizzes</span>
                    </div>
                    <button class="card-btn">
                        <span>Explore</span>
                        <span class="arrow">→</span>
                    </button>
                </div>
                ${subject.badge ? `<div class="card-badge">${subject.badge}</div>` : ''}
            </div>
        </div>
    `).join('');
}

// Render Feature Cards
function renderFeatures() {
    if (!featuresGrid) return;
    featuresGrid.innerHTML = features.map(feature => `
        <div class="feature-card">
            <div class="feature-icon">${feature.icon}</div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-description">${feature.description}</p>
        </div>
    `).join('');
}

// Open Subject
function openSubject(subjectId) {
    const subject = subjects.find(s => s.id === subjectId);

    if (subject && subject.available) {
        // Handle special leaderboard card
        if (subjectId === 'leaderboard') {
            openGlobalLeaderboard();
            return;
        }
        // Navigate to available subjects
        if (subjectId === 'mathematics') {
            window.location.href = 'subjects/mathematics/index.html';
            return;
        }
        if (subjectId === 'geography') {
            window.location.href = 'subjects/geography/index.html';
            return;
        }
        if (subjectId === 'science') {
            window.location.href = 'subjects/science/index.html';
            return;
        }
        if (subjectId === 'english') {
            window.location.href = 'subjects/english/index.html';
            return;
        }
        if (subjectId === 'hindi') {
            window.location.href = 'subjects/hindi/index.html';
            return;
        }
        if (subjectId === 'gk') {
            window.location.href = 'subjects/gk/index.html';
            return;
        }
        if (subjectId === 'history') {
            window.location.href = 'subjects/history/index.html';
            return;
        }
    }
    showComingSoon();
}

// Show Coming Soon Modal
function showComingSoon(message = null) {
    if (!modal) return;
    if (message) {
        const modalText = modal.querySelector('.modal-text');
        if (modalText) modalText.textContent = message;
    }
    modal.classList.add('active');
}

// Close Modal
function closeModal() {
    if (modal) modal.classList.remove('active');
}

// Theme Toggle
function initTheme() {
    // Default to dark mode if no preference saved
    const savedTheme = localStorage.getItem('supersite-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('supersite-theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 2rem';
        } else {
            navbar.style.padding = '1rem 2rem';
        }
    });
}

// Close modal on outside click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Profile Modal
const profileModal = document.getElementById('profileModal');

function openPlayerProfile() {
    if (!window.BroProPlayer) return;

    const profile = BroProPlayer.load();
    const rank = BroProPlayer.getRank(profile.xp);

    // Update profile display
    document.getElementById('profileName').textContent = profile.displayName || profile.name || 'Student';

    // Handle avatar (could be URL, emoji, or image avatar)
    const avatarEl = document.getElementById('profileAvatar');
    const imageAvatars = ['bhai', 'black-rock-bhain', 'bhagat-singh', 'shri-ram', 'krishna', 'buddha', 'guru-nanak', 'vivekananda', 'ambedkar', 'gandhi', 'netaji', 'hanuman', 'apj-kalam', 'tipu-sultan', 'maharana-pratap', 'maulana-azad', 'shivaji-maharaj', 'rani-lakshmibai', 'savitribai-phule', 'kalpana-chawla', 'aryabhata', 'sardar-patel', 'lal-bahadur-shastri', 'jawaharlal-nehru', 'chanakya', 'cv-raman', 'vikram-sarabhai', 'ratan-tata', 'nelson-mandela'];
    if (profile.avatar && (profile.avatar.startsWith('http://') || profile.avatar.startsWith('https://'))) {
        avatarEl.innerHTML = `<img src="${profile.avatar}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    } else if (imageAvatars.includes(profile.avatar) || (profile.avatar && profile.avatar.startsWith('img:'))) {
        // Image-based avatar
        avatarEl.innerHTML = `<img src="assets/avatars/${profile.avatar}-avatar.png" alt="Avatar" class="profile-avatar-img">`;
    } else {
        avatarEl.textContent = profile.avatar || '🐼';
        avatarEl.classList.add('animated');
    }

    document.getElementById('profileRank').textContent = `${rank.emoji} ${rank.name}`;
    document.getElementById('profileLevel').textContent = profile.level;
    document.getElementById('profileTotalXP').textContent = profile.xp.toLocaleString();

    // Display wallet with rupee symbol (wallet = XP ÷ DIVISOR minus spent)
    const walletEl = document.getElementById('profileWallet');
    if (walletEl) {
        const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
        const totalEarned = Math.floor(profile.xp / divisor);
        const spent = profile.walletSpent || 0;
        // Ensure wallet never goes negative
        const walletAmount = Math.max(0, totalEarned - spent);
        walletEl.textContent = `₹${walletAmount.toLocaleString()}`;
        console.log('💰 Wallet Display Update:', { xp: profile.xp, totalEarned, spent, available: walletAmount });
    }

    document.getElementById('profileStreak').textContent = profile.streak;

    // Show email
    const emailEl = document.getElementById('profileEmail');
    if (emailEl) {
        emailEl.textContent = profile.email || 'Not logged in';
    }

    // Accuracy
    const accuracy = profile.totalQuestions > 0
        ? Math.round((profile.totalCorrect / profile.totalQuestions) * 100)
        : 0;
    document.getElementById('profileAccuracy').textContent = accuracy + '%';

    // Level progress (500 XP per level)
    const levelProgress = BroProPlayer.getLevelProgress(profile.xp);
    const progressPercent = levelProgress.percentage;

    document.getElementById('profileCurrentXP').textContent = levelProgress.progressInLevel;
    document.getElementById('profileNextXP').textContent = levelProgress.neededForNext;
    document.getElementById('levelFill').style.width = progressPercent + '%';

    // Pre-fill the display name input
    const nameInput = document.getElementById('displayNameInput');
    if (nameInput) {
        nameInput.value = profile.displayName || profile.name || '';
    }

    // Mark current avatar as selected
    highlightCurrentAvatar(profile.avatar);

    // Hide edit sections by default
    document.getElementById('nameEditSection').style.display = 'none';
    document.getElementById('avatarPickerSection').style.display = 'none';

    // Update premium status display
    if (window.BroProPremium) {
        BroProPremium.updatePremiumBadge();
    }

    profileModal.classList.add('active');
}

function closeProfileModal() {
    profileModal.classList.remove('active');
}

// Toggle Name Edit Section
function toggleNameEdit() {
    const section = document.getElementById('nameEditSection');
    const avatarSection = document.getElementById('avatarPickerSection');

    // Check if name was already changed
    const profile = BroProPlayer.load();
    if (profile.nameChanged === true) {
        alert('⚠️ You have already changed your display name once.\n\nTo change it again, please contact the admin.');
        return;
    }

    if (section.style.display === 'none') {
        section.style.display = 'block';
        avatarSection.style.display = 'none';
        document.getElementById('displayNameInput').focus();
    } else {
        section.style.display = 'none';
    }
}

// Toggle Avatar Picker Section
function toggleAvatarPicker() {
    const section = document.getElementById('avatarPickerSection');
    const nameSection = document.getElementById('nameEditSection');

    if (section.style.display === 'none') {
        section.style.display = 'block';
        nameSection.style.display = 'none';
    } else {
        section.style.display = 'none';
    }
}

// Save Display Name
function saveDisplayName() {
    const input = document.getElementById('displayNameInput');
    const newName = input.value.trim();

    if (!newName) {
        alert('Please enter a display name!');
        return;
    }

    if (newName.length < 2) {
        alert('Name must be at least 2 characters!');
        return;
    }

    // Load profile and check if name was already changed
    const profile = BroProPlayer.load();

    // Check if name was already changed once
    if (profile.nameChanged === true) {
        alert('⚠️ You can only change your display name once!\n\nTo change it again, please contact the admin.');
        document.getElementById('nameEditSection').style.display = 'none';
        return;
    }

    // Check if it's actually a change
    const currentName = profile.displayName || profile.name;
    if (newName === currentName) {
        document.getElementById('nameEditSection').style.display = 'none';
        return;
    }

    // Save to profile with nameChanged flag
    profile.displayName = newName;
    profile.name = newName; // Also update main name for leaderboard
    profile.nameChanged = true; // Mark as changed
    profile.nameChangedAt = new Date().toISOString();
    BroProPlayer.save(profile);

    // Update display
    document.getElementById('profileName').textContent = newName;
    document.getElementById('nameEditSection').style.display = 'none';

    // Sync to Firebase
    if (window.FirebaseAuth && window.FirebaseAuth.currentUser) {
        FirebaseAuth.updateLeaderboardEntry(profile);
    }

    // Sync name across ALL subject leaderboards (math, science, history, etc.)
    if (window.BroProLeaderboard) {
        BroProLeaderboard.updateNameAcrossLeaderboards(newName);
    }

    // Update presence if admin system is available
    if (window.BroProAdmin && firebase.auth().currentUser) {
        BroProAdmin.updateUserPresence(firebase.auth().currentUser, true);
    }

    alert('✅ Display name updated!\n\n⚠️ Note: You can only change your name once. To change it again, contact admin.');
}

// Select Avatar
function selectAvatar(avatar) {
    if (!avatar) return;

    // Play click sound
    if (window.BroProSounds) {
        BroProSounds.play('click');
    }

    // Save to profile
    const profile = BroProPlayer.load();
    profile.avatar = avatar;
    BroProPlayer.save(profile);

    // Update display - handle image avatars
    const avatarEl = document.getElementById('profileAvatar');
    if (avatarEl) {
        const imageAvatars = ['bhai', 'black-rock-bhain', 'bhagat-singh', 'shri-ram', 'krishna', 'buddha', 'guru-nanak', 'vivekananda', 'ambedkar', 'gandhi', 'netaji', 'hanuman', 'apj-kalam', 'tipu-sultan', 'maharana-pratap', 'maulana-azad', 'shivaji-maharaj', 'rani-lakshmibai', 'savitribai-phule', 'kalpana-chawla', 'aryabhata', 'sardar-patel', 'lal-bahadur-shastri', 'jawaharlal-nehru', 'chanakya', 'cv-raman', 'vikram-sarabhai', 'ratan-tata', 'nelson-mandela'];
        if (imageAvatars.includes(avatar) || avatar.startsWith('img:')) {
            // Image-based avatar
            avatarEl.innerHTML = `<img src="assets/avatars/${avatar}-avatar.png" alt="Avatar" class="profile-avatar-img">`;
        } else {
            // Emoji avatar
            avatarEl.textContent = avatar;
        }
        avatarEl.classList.add('animated');
        setTimeout(() => avatarEl.classList.remove('animated'), 500);
    }

    // Highlight selected
    highlightCurrentAvatar(avatar);

    // Hide picker
    const pickerSection = document.getElementById('avatarPickerSection');
    if (pickerSection) {
        pickerSection.style.display = 'none';
    }

    // Sync to Firebase - update avatar across ALL leaderboards
    if (window.BroProLeaderboard) {
        BroProLeaderboard.updateAvatarAcrossLeaderboards(avatar);
    }

    // Also update legacy leaderboard entry
    if (window.FirebaseAuth && window.FirebaseAuth.currentUser) {
        FirebaseAuth.updateLeaderboardEntry(profile);
    }

    // Update presence if admin system is available
    if (window.BroProAdmin && firebase.auth().currentUser) {
        BroProAdmin.updateUserPresence(firebase.auth().currentUser, true);
    }

    // Update navbar if visible
    updateNavbarStats();

    // Show confirmation
    if (window.BroProSounds) {
        BroProSounds.play('correct');
    }

    // Show a nice toast
    const toast = document.getElementById('adminToast');
    if (toast && window.BroProLeaderboard) {
        const imageAvatars = ['bhai', 'black-rock-bhain', 'bhagat-singh', 'shri-ram', 'krishna', 'buddha', 'guru-nanak', 'vivekananda', 'ambedkar', 'gandhi', 'netaji', 'hanuman', 'apj-kalam', 'tipu-sultan', 'maharana-pratap', 'maulana-azad', 'shivaji-maharaj', 'rani-lakshmibai', 'savitribai-phule', 'kalpana-chawla', 'aryabhata', 'sardar-patel', 'lal-bahadur-shastri', 'jawaharlal-nehru', 'chanakya', 'cv-raman', 'vikram-sarabhai', 'ratan-tata', 'nelson-mandela'];
        const displayName = imageAvatars.includes(avatar) ? `👑 ${avatar.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}` : avatar;
        BroProLeaderboard.showToast('success', `✅ Avatar changed to ${displayName}`);
    } else {
        console.log('✅ Avatar changed to', avatar);
    }
}

// Highlight currently selected avatar
function highlightCurrentAvatar(currentAvatar) {
    document.querySelectorAll('.avatar-option').forEach(opt => {
        const avatar = opt.getAttribute('data-avatar');
        if (avatar === currentAvatar) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
}

// Switch avatar category
function showAvatarCategory(category) {
    // Hide all categories
    document.querySelectorAll('.avatar-category').forEach(cat => {
        cat.style.display = 'none';
    });

    // Show selected category
    const selectedCat = document.querySelector(`.avatar-category[data-category="${category}"]`);
    if (selectedCat) {
        // Premium category uses block layout, others use grid
        selectedCat.style.display = category === 'premium' ? 'block' : 'grid';
    }

    // Update active tab - use closest to handle clicks on nested elements
    document.querySelectorAll('.avatar-cat-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const clickedBtn = event.target.closest('.avatar-cat-btn');
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }

    // Check premium state
    if (category === 'premium') {
        updatePremiumState();
    }
}

// ============================================
// PREMIUM AVATAR SYSTEM - WORLD CLASS IMPLEMENTATION
// ============================================

// Get current wallet balance (XP/DIVISOR + walletAdded - walletSpent)
function getWalletBalance() {
    const profile = BroProPlayer.load();
    const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
    const earnedFromXP = Math.floor((profile.xp || 0) / divisor);
    const addedViaPurchase = profile.walletAdded || 0;
    const spent = profile.walletSpent || 0;
    return Math.max(0, earnedFromXP + addedViaPurchase - spent);
}

// Check if a specific premium avatar is owned
function isPremiumAvatarOwned(avatar) {
    const profile = BroProPlayer.load();
    const ownedAvatars = profile.ownedPremiumAvatars || [];
    return ownedAvatars.includes(avatar);
}

// ============================================
// LIMITED STOCK AVATAR SYSTEM
// ============================================
const LimitedStockAvatars = {
    // Configuration for limited stock avatars
    config: {
        'bhai': {
            maxStock: 5,
            firestoreDocId: 'bhai-avatar-stock',
            name: 'Bhai - The Legend',
            price: 150
        },
        'black-rock-bhain': {
            maxStock: 5,
            firestoreDocId: 'black-rock-bhain-stock',
            name: 'Black Rock Avatar of Bhai',
            price: 150
        }
    },

    // Cache for stock data
    stockCache: {},
    stockListeners: {},

    // Initialize limited stock system
    async init() {
        console.log('🔥 Initializing Limited Stock Avatar System...');

        // Initialize stock for each limited avatar
        for (const avatarId of Object.keys(this.config)) {
            await this.initializeStock(avatarId);
            this.startStockListener(avatarId);
            // Sync ownership from Firebase buyers list
            await this.syncOwnershipFromFirebase(avatarId);
        }
    },

    // Sync ownership from Firebase buyers list
    // This ensures users who purchased the avatar have it in their ownedPremiumAvatars
    async syncOwnershipFromFirebase(avatarId) {
        if (!window.firebase || !firebase.firestore) return;
        if (!window.FirebaseAuth || !FirebaseAuth.currentUser) return;

        const config = this.config[avatarId];
        if (!config) return;

        const userUid = FirebaseAuth.currentUser.uid;

        try {
            const db = firebase.firestore();
            const doc = await db.collection('limitedStock').doc(config.firestoreDocId).get();

            if (doc.exists) {
                const data = doc.data();
                const buyers = data.buyers || [];

                // Check if user is in buyers list
                if (buyers.includes(userUid)) {
                    // Check if avatar is already in user's ownedPremiumAvatars
                    const profile = BroProPlayer.load();
                    const ownedAvatars = profile.ownedPremiumAvatars || [];

                    if (!ownedAvatars.includes(avatarId)) {
                        // Add avatar to owned list
                        ownedAvatars.push(avatarId);
                        profile.ownedPremiumAvatars = ownedAvatars;
                        BroProPlayer.save(profile);
                        console.log(`✅ Synced ownership: Added ${avatarId} to user's owned avatars (from Firebase buyers list)`);

                        // Update UI immediately
                        this.updateStockUI(avatarId, data.remainingStock);
                    }
                }
            }
        } catch (error) {
            console.warn('Ownership sync skipped:', error.message);
        }
    },

    // Initialize stock in Firestore if not exists
    async initializeStock(avatarId) {
        if (!window.firebase || !firebase.firestore) return;

        const config = this.config[avatarId];
        if (!config) return;

        try {
            const db = firebase.firestore();
            const docRef = db.collection('limitedStock').doc(config.firestoreDocId);
            const doc = await docRef.get();

            if (!doc.exists) {
                // Create initial stock document
                await docRef.set({
                    avatarId: avatarId,
                    maxStock: config.maxStock,
                    soldCount: 0,
                    remainingStock: config.maxStock,
                    buyers: [],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log(`📦 Initialized stock for ${avatarId}: ${config.maxStock} available`);
            } else {
                const data = doc.data();
                this.stockCache[avatarId] = data.remainingStock;
                this.updateStockUI(avatarId, data.remainingStock);
                console.log(`📦 Stock for ${avatarId}: ${data.remainingStock}/${config.maxStock}`);
            }
        } catch (error) {
            console.error('Error initializing stock:', error);
        }
    },

    // Start real-time listener for stock changes
    startStockListener(avatarId) {
        if (!window.firebase || !firebase.firestore) return;

        const config = this.config[avatarId];
        if (!config) return;

        const db = firebase.firestore();
        const docRef = db.collection('limitedStock').doc(config.firestoreDocId);

        // Stop any existing listener
        if (this.stockListeners[avatarId]) {
            this.stockListeners[avatarId]();
        }

        // Start new listener
        this.stockListeners[avatarId] = docRef.onSnapshot((doc) => {
            if (doc.exists) {
                const data = doc.data();
                this.stockCache[avatarId] = data.remainingStock;
                this.updateStockUI(avatarId, data.remainingStock);
                console.log(`🔄 Stock updated for ${avatarId}: ${data.remainingStock} left`);
            }
        }, (error) => {
            console.error('Stock listener error:', error);
        });
    },

    // Update the stock UI
    updateStockUI(avatarId, remainingStock) {
        const avatarEl = document.getElementById(`${avatarId}AvatarOption`);
        const stockCountEl = document.getElementById(`${avatarId}StockCount`);
        const stockBadgeEl = document.getElementById(`${avatarId}StockBadge`);

        if (!avatarEl || !stockCountEl) return;

        const config = this.config[avatarId];

        // Check if user owns this avatar
        const isOwned = isPremiumAvatarOwned(avatarId);

        if (isOwned) {
            // User OWNS this avatar - show owned state
            stockCountEl.textContent = 'OWNED ✓';
            avatarEl.classList.add('owned');
            avatarEl.classList.remove('locked', 'sold-out', 'low-stock');
            // Hide price badge for owned avatars
            const priceBadge = avatarEl.querySelector('.price-badge');
            if (priceBadge) priceBadge.style.display = 'none';
            // Update badge styling for owned
            if (stockBadgeEl) {
                stockBadgeEl.classList.add('owned-badge');
                stockBadgeEl.classList.remove('sold-out-badge');
            }
            console.log(`✅ User owns ${avatarId} - showing OWNED state`);
        } else if (remainingStock <= 0) {
            // SOLD OUT for non-owners
            stockCountEl.textContent = 'SOLD OUT!';
            avatarEl.classList.add('sold-out');
            avatarEl.classList.remove('low-stock', 'owned');
            if (stockBadgeEl) {
                stockBadgeEl.classList.add('sold-out-badge');
                stockBadgeEl.classList.remove('owned-badge');
            }
        } else if (remainingStock <= 2) {
            // LOW STOCK - Urgency!
            stockCountEl.textContent = `Only ${remainingStock} left!`;
            avatarEl.classList.add('low-stock');
            avatarEl.classList.remove('sold-out', 'owned');
        } else {
            // Normal stock
            stockCountEl.textContent = `${remainingStock} left`;
            avatarEl.classList.remove('low-stock', 'sold-out', 'owned');
        }
    },

    // Get current stock for an avatar
    async getStock(avatarId) {
        if (this.stockCache[avatarId] !== undefined) {
            return this.stockCache[avatarId];
        }

        if (!window.firebase || !firebase.firestore) return 0;

        const config = this.config[avatarId];
        if (!config) return 0;

        try {
            const db = firebase.firestore();
            const doc = await db.collection('limitedStock').doc(config.firestoreDocId).get();

            if (doc.exists) {
                const remaining = doc.data().remainingStock;
                this.stockCache[avatarId] = remaining;
                return remaining;
            }
        } catch (error) {
            console.error('Error getting stock:', error);
        }

        return 0;
    },

    // Purchase a limited stock avatar
    async purchaseStock(avatarId, buyerUid, buyerEmail) {
        if (!window.firebase || !firebase.firestore) {
            return { success: false, error: 'Firebase not available' };
        }

        const config = this.config[avatarId];
        if (!config) {
            return { success: false, error: 'Invalid avatar' };
        }

        const db = firebase.firestore();
        const docRef = db.collection('limitedStock').doc(config.firestoreDocId);

        try {
            // Use transaction for atomic update
            const result = await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(docRef);

                if (!doc.exists) {
                    throw new Error('Stock document not found');
                }

                const data = doc.data();

                // Check if already purchased by this user
                if (data.buyers && data.buyers.includes(buyerUid)) {
                    throw new Error('already_purchased');
                }

                // Check stock availability
                if (data.remainingStock <= 0) {
                    throw new Error('out_of_stock');
                }

                // Update stock
                const newSoldCount = (data.soldCount || 0) + 1;
                const newRemaining = data.maxStock - newSoldCount;
                const newBuyers = [...(data.buyers || []), buyerUid];

                transaction.update(docRef, {
                    soldCount: newSoldCount,
                    remainingStock: newRemaining,
                    buyers: newBuyers,
                    lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                    [`purchases.${buyerUid}`]: {
                        email: buyerEmail,
                        purchasedAt: new Date().toISOString()
                    }
                });

                return { newRemaining, newSoldCount };
            });

            console.log(`✅ Limited stock purchase successful! ${result.newRemaining} remaining`);
            return { success: true, remaining: result.newRemaining };

        } catch (error) {
            if (error.message === 'out_of_stock') {
                return { success: false, error: 'This avatar is sold out!' };
            }
            if (error.message === 'already_purchased') {
                return { success: true, alreadyOwned: true };
            }
            console.error('Purchase transaction error:', error);
            return { success: false, error: 'Purchase failed. Please try again.' };
        }
    },

    // ADMIN ONLY: Set stock manually (call from console: LimitedStockAvatars.adminSetStock('black-rock-bhain', 3))
    async adminSetStock(avatarId, newStock, soldCount = null) {
        if (!window.firebase || !firebase.firestore) {
            console.error('Firebase not available');
            return false;
        }

        const config = this.config[avatarId];
        if (!config) {
            console.error('Invalid avatar ID');
            return false;
        }

        try {
            const db = firebase.firestore();
            const docRef = db.collection('limitedStock').doc(config.firestoreDocId);

            const calculatedSoldCount = soldCount !== null ? soldCount : (config.maxStock - newStock);

            await docRef.update({
                remainingStock: newStock,
                soldCount: calculatedSoldCount,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log(`✅ ADMIN: Stock for ${avatarId} set to ${newStock} (${calculatedSoldCount} sold)`);
            this.updateStockUI(avatarId, newStock);
            return true;
        } catch (error) {
            console.error('Admin stock update failed:', error);
            return false;
        }
    },

    // Check if user already purchased this limited avatar
    async hasUserPurchased(avatarId, userUid) {
        if (!window.firebase || !firebase.firestore || !userUid) return false;

        const config = this.config[avatarId];
        if (!config) return false;

        try {
            const db = firebase.firestore();
            const doc = await db.collection('limitedStock').doc(config.firestoreDocId).get();

            if (doc.exists) {
                const buyers = doc.data().buyers || [];
                return buyers.includes(userUid);
            }
        } catch (error) {
            console.error('Error checking purchase:', error);
        }

        return false;
    }
};

// Handle limited stock avatar selection
async function selectLimitedStockAvatar(avatarId, avatarName, price) {
    console.log(`🖱️ Limited stock avatar clicked: ${avatarId}`);

    // Check if already owned locally
    let isOwned = isPremiumAvatarOwned(avatarId);

    // If not owned locally, check Firebase buyers list as fallback
    if (!isOwned && window.FirebaseAuth && FirebaseAuth.currentUser) {
        console.log(`🔍 Checking Firebase buyers list for ${avatarId}...`);
        const userUid = FirebaseAuth.currentUser.uid;
        isOwned = await LimitedStockAvatars.hasUserPurchased(avatarId, userUid);

        if (isOwned) {
            // User is in buyers list but avatar wasn't in local profile - sync it now!
            console.log(`✅ Found user in Firebase buyers list! Syncing ownership...`);
            const profile = BroProPlayer.load();
            if (!Array.isArray(profile.ownedPremiumAvatars)) {
                profile.ownedPremiumAvatars = [];
            }
            if (!profile.ownedPremiumAvatars.includes(avatarId)) {
                profile.ownedPremiumAvatars.push(avatarId);
                BroProPlayer.save(profile);
                console.log(`✅ Synced ${avatarId} to owned avatars`);
            }
            // Update UI
            const stock = await LimitedStockAvatars.getStock(avatarId);
            LimitedStockAvatars.updateStockUI(avatarId, stock);
        }
    }

    if (isOwned) {
        selectAvatar(avatarId);
        if (window.BroProLeaderboard) {
            BroProLeaderboard.showToast('success', `✅ ${avatarName} equipped!`);
        }
        return;
    }

    // Get current stock
    const remainingStock = await LimitedStockAvatars.getStock(avatarId);

    if (remainingStock <= 0) {
        // Show sold out message
        if (window.BroProLeaderboard) {
            BroProLeaderboard.showToast('error', '😢 This avatar is SOLD OUT!');
        }
        return;
    }

    // Show enhanced purchase modal with stock info
    showLimitedStockPurchaseModal(avatarId, avatarName, price, remainingStock);
}

// Enhanced purchase modal for limited stock avatars
function showLimitedStockPurchaseModal(avatarId, avatarName, price, remainingStock) {
    const wallet = getWalletBalance();
    const canAfford = wallet >= price;
    const config = LimitedStockAvatars.config[avatarId];
    const maxStock = config ? config.maxStock : 5;

    const urgencyClass = remainingStock <= 2 ? 'urgent' : '';
    const soldCount = maxStock - remainingStock;

    const modalHTML = `
        <div class="premium-purchase-overlay" id="premiumPurchaseModal" onclick="if(event.target === this) closePremiumPurchaseModal()">
            <div class="premium-purchase-container exclusive-tier limited-edition">
                <div class="premium-purchase-content">
                    <button class="premium-close-btn" onclick="closePremiumPurchaseModal()">✕</button>
                    
                    <div class="limited-edition-banner">
                        <span class="banner-fire">🔥</span>
                        <span class="banner-text">LIMITED EDITION</span>
                        <span class="banner-fire">🔥</span>
                    </div>
                    
                    <div class="premium-avatar-preview">
                        <div class="preview-glow gold-glow"></div>
                        <img src="assets/avatars/${avatarId}-avatar.png" alt="${avatarName}" class="preview-avatar-img floating">
                    </div>
                    
                    <h3 class="premium-title">${avatarName}</h3>
                    <p class="premium-subtitle">👑 Exclusive Limited Avatar</p>
                    
                    <div class="limited-stock-info ${urgencyClass}">
                        <span class="fire-icon">🔥</span>
                        <div class="stock-details">
                            <span class="stock-label">${remainingStock <= 2 ? 'HURRY! Almost Gone!' : 'Limited Stock'}</span>
                            <span class="stock-value">${remainingStock} of ${maxStock} remaining</span>
                        </div>
                    </div>
                    
                    <div class="stock-progress-bar">
                        <div class="stock-progress-fill" style="width: ${(soldCount / maxStock) * 100}%"></div>
                        <span class="stock-progress-text">${soldCount} sold</span>
                    </div>
                    
                    <div class="premium-price-tag exclusive-price">
                        <span class="price-label">Price</span>
                        <span class="price-value">₹${price}</span>
                    </div>
                    
                    <div class="wallet-display">
                        <span class="wallet-label">Your Wallet</span>
                        <span class="wallet-value ${canAfford ? 'sufficient' : 'insufficient'}">₹${wallet}</span>
                    </div>
                    
                    ${canAfford ? `
                        <button class="premium-buy-btn exclusive-btn" id="purchaseBtn" onclick="executeLimitedStockPurchase('${avatarId}', '${avatarName}', ${price})">
                            <span class="buy-icon">👑</span>
                            <span>Purchase Now!</span>
                        </button>
                    ` : `
                        <div class="insufficient-funds">
                            <span class="sad-emoji">😢</span>
                            <p>Not enough funds!</p>
                            <p class="need-more">You need ₹${price - wallet} more</p>
                            <p class="earn-tip">💡 Practice more to earn rupees!</p>
                        </div>
                    `}
                    
                    <p class="premium-note">⚠️ Once sold out, this avatar will be GONE FOREVER!</p>
                </div>
            </div>
        </div>
    `;

    // Remove any existing modal
    const existing = document.getElementById('premiumPurchaseModal');
    if (existing) existing.remove();

    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Animate in
    requestAnimationFrame(() => {
        const modal = document.getElementById('premiumPurchaseModal');
        if (modal) modal.classList.add('active');
    });
}

// Execute limited stock purchase
async function executeLimitedStockPurchase(avatarId, avatarName, price) {
    // Disable button to prevent double-click
    const btn = document.getElementById('purchaseBtn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⏳ Processing...</span>';
    }

    // Check login
    if (!window.FirebaseAuth || !FirebaseAuth.currentUser) {
        if (window.BroProLeaderboard) {
            BroProLeaderboard.showToast('error', '❌ Please login to purchase!');
        }
        closePremiumPurchaseModal();
        openAuthModal();
        return;
    }

    const userUid = FirebaseAuth.currentUser.uid;
    const userEmail = FirebaseAuth.currentUser.email;

    // Fresh check of wallet balance
    const wallet = getWalletBalance();
    if (wallet < price) {
        if (window.BroProLeaderboard) {
            BroProLeaderboard.showToast('error', `❌ Insufficient funds! Balance: ₹${wallet}`);
        }
        closePremiumPurchaseModal();
        return;
    }

    // Attempt to purchase stock
    const stockResult = await LimitedStockAvatars.purchaseStock(avatarId, userUid, userEmail);

    if (!stockResult.success) {
        if (window.BroProLeaderboard) {
            BroProLeaderboard.showToast('error', `❌ ${stockResult.error}`);
        }
        closePremiumPurchaseModal();
        return;
    }

    // Close purchase modal
    closePremiumPurchaseModal();

    // Show processing toast
    if (window.BroProLeaderboard) {
        BroProLeaderboard.showToast('info', '⏳ Processing purchase...');
    }

    // Small delay for premium feel
    await new Promise(r => setTimeout(r, 600));

    // Load fresh profile
    const profile = BroProPlayer.load();

    // Calculate and update spent amount
    const currentSpent = profile.walletSpent || 0;
    profile.walletSpent = currentSpent + price;

    // Add to owned avatars array
    if (!Array.isArray(profile.ownedPremiumAvatars)) {
        profile.ownedPremiumAvatars = [];
    }
    if (!profile.ownedPremiumAvatars.includes(avatarId)) {
        profile.ownedPremiumAvatars.push(avatarId);
    }

    // Set as current avatar
    profile.avatar = avatarId;

    // Save to localStorage
    BroProPlayer.save(profile);

    // Sync to Firebase
    if (window.BroProLeaderboard) {
        BroProLeaderboard.updateAvatarAcrossLeaderboards(avatarId);
    }

    if (window.FirebaseAuth) {
        try {
            await FirebaseAuth.updateLeaderboardEntry(profile);
        } catch (err) {
            console.warn('Firebase sync error:', err);
        }
    }

    // Update all UI elements
    updatePremiumState();
    updateNavbarStats();

    // Update profile modal wallet display
    const profileWalletEl = document.getElementById('profileWallet');
    if (profileWalletEl) {
        const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
        const totalEarned = Math.floor(profile.xp / divisor);
        const available = Math.max(0, totalEarned - profile.walletSpent);
        profileWalletEl.textContent = `₹${available.toLocaleString()}`;
    }

    // Update avatar in profile modal
    const avatarEl = document.getElementById('profileAvatar');
    if (avatarEl) {
        avatarEl.innerHTML = `<img src="assets/avatars/${avatarId}-avatar.png" alt="Avatar" class="profile-avatar-img">`;
        avatarEl.classList.add('animated');
        setTimeout(() => avatarEl.classList.remove('animated'), 500);
    }

    // Highlight in picker
    highlightCurrentAvatar(avatarId);

    // Show success celebration with limited edition flair
    showLimitedEditionCelebration(avatarId, avatarName, wallet - price, stockResult.remaining);

    console.log(`✅ LIMITED EDITION PURCHASE COMPLETE: ${avatarName}`);
}

// Special celebration for limited edition purchase
function showLimitedEditionCelebration(avatarId, avatarName, newBalance, remainingStock) {
    const celebrationHTML = `
        <div class="purchase-success-overlay" id="purchaseSuccessModal">
            <div class="celebration-particles" id="celebrationParticles"></div>
            <div class="celebration-spotlight"></div>
            <div class="purchase-success-container limited-edition">
                <div class="success-ring success-ring-1"></div>
                <div class="success-ring success-ring-2"></div>
                <div class="success-ring success-ring-3"></div>
                <div class="success-crown">👑</div>
                <div class="success-avatar-wrapper">
                    <div class="success-avatar-glow"></div>
                    <div class="success-avatar-shine"></div>
                    <img src="assets/avatars/${avatarId}-avatar.png" alt="${avatarName}" class="success-avatar-img">
                </div>
                <div class="success-badge limited-badge">LIMITED EDITION</div>
                <h2 class="success-title">Congratulations!</h2>
                <p class="success-subtitle">${avatarName}</p>
                <div class="limited-edition-note">
                    <span class="le-icon">🔥</span>
                    <span class="le-text">${remainingStock !== undefined ? `Only ${remainingStock} left in stock!` : 'Exclusive Limited Edition!'}</span>
                </div>
                <div class="success-divider"></div>
                <div class="success-stats">
                    <div class="success-stat">
                        <span class="stat-icon">👑</span>
                        <span class="stat-label">Limited Edition</span>
                    </div>
                    <div class="success-stat">
                        <span class="stat-icon">💰</span>
                        <span class="stat-value">₹${newBalance}</span>
                        <span class="stat-label">Balance</span>
                    </div>
                </div>
                <button class="success-btn" onclick="closePurchaseCelebration()">
                    <span class="btn-text">Continue</span>
                    <span class="btn-icon">→</span>
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', celebrationHTML);
    createCelebrationParticles();

    requestAnimationFrame(() => {
        const modal = document.getElementById('purchaseSuccessModal');
        if (modal) modal.classList.add('active');
    });

    playPremiumPurchaseSound();

    if (window.BroProLeaderboard) {
        BroProLeaderboard.showToast('success', `👑 ${avatarName} - LIMITED EDITION unlocked!`);
    }
}

// Initialize limited stock on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize limited stock system after a brief delay
    setTimeout(() => {
        if (window.firebase && firebase.firestore) {
            LimitedStockAvatars.init();
        }
    }, 1500);
});

// Get all owned premium avatars
function getOwnedPremiumAvatars() {
    const profile = BroProPlayer.load();
    return profile.ownedPremiumAvatars || [];
}

// Update premium category UI based on ownership
function updatePremiumState() {
    const ownedAvatars = getOwnedPremiumAvatars();
    const lockIcon = document.querySelector('.premium-cat-btn .lock-icon');

    // Update lock icon based on owned count
    if (lockIcon) {
        lockIcon.textContent = ownedAvatars.length > 0 ? '✨' : '💎';
    }

    // Update each premium avatar's visual state
    document.querySelectorAll('.premium-avatar').forEach(avatarEl => {
        const avatar = avatarEl.getAttribute('data-avatar');
        const priceBadge = avatarEl.querySelector('.price-badge');
        const isLimitedStock = avatarEl.classList.contains('limited-stock-avatar');

        if (ownedAvatars.includes(avatar)) {
            avatarEl.classList.add('owned');
            avatarEl.classList.remove('locked', 'sold-out');
            if (priceBadge) priceBadge.style.display = 'none';

            // For limited stock avatars, also update the stock badge text
            if (isLimitedStock) {
                const stockCountEl = avatarEl.querySelector('.stock-count');
                if (stockCountEl) {
                    stockCountEl.textContent = 'OWNED ✓';
                }
                const stockBadge = avatarEl.querySelector('.limited-stock-badge');
                if (stockBadge) {
                    stockBadge.classList.add('owned-badge');
                    stockBadge.classList.remove('sold-out-badge');
                }
            }
        } else {
            avatarEl.classList.remove('owned');
            // Don't add 'locked' class if it's sold out - keep sold-out styling
            if (!avatarEl.classList.contains('sold-out')) {
                avatarEl.classList.add('locked');
            }
            if (priceBadge && !avatarEl.classList.contains('sold-out')) {
                priceBadge.style.display = 'block';
            }
        }
    });

    // Refresh limited stock avatar UI states
    if (window.LimitedStockAvatars) {
        for (const avatarId of Object.keys(LimitedStockAvatars.config)) {
            const stock = LimitedStockAvatars.stockCache[avatarId];
            if (stock !== undefined) {
                LimitedStockAvatars.updateStockUI(avatarId, stock);
            }
        }
    }
}

// Show premium purchase modal
function showPremiumPurchaseModal(avatar, avatarName, price = 20) {
    const wallet = getWalletBalance();
    const canAfford = wallet >= price;
    const imageAvatars = ['bhai', 'black-rock-bhain', 'bhagat-singh', 'shri-ram', 'krishna', 'buddha', 'guru-nanak', 'vivekananda', 'ambedkar', 'gandhi', 'netaji', 'hanuman', 'apj-kalam', 'tipu-sultan', 'maharana-pratap', 'maulana-azad', 'shivaji-maharaj', 'rani-lakshmibai', 'savitribai-phule', 'kalpana-chawla', 'aryabhata', 'sardar-patel', 'lal-bahadur-shastri', 'jawaharlal-nehru', 'chanakya', 'cv-raman', 'vikram-sarabhai', 'ratan-tata', 'nelson-mandela'];
    const isImageAvatar = imageAvatars.includes(avatar) || avatar.startsWith('img:');

    // Determine avatar display
    const avatarDisplay = isImageAvatar
        ? `<img src="assets/avatars/${avatar}-avatar.png" alt="${avatarName}" class="preview-avatar-img floating">`
        : `<span class="preview-avatar">${avatar}</span>`;

    // Premium/Exclusive label based on price
    const tierLabel = price >= 100 ? '👑 Exclusive Avatar' : 'Premium Avatar';

    const modalHTML = `
        <div class="premium-purchase-overlay" id="premiumPurchaseModal" onclick="if(event.target === this) closePremiumPurchaseModal()">
            <div class="premium-purchase-container ${price >= 100 ? 'exclusive-tier' : ''}">
                <div class="premium-purchase-content">
                    <button class="premium-close-btn" onclick="closePremiumPurchaseModal()">✕</button>
                    
                    <div class="premium-avatar-preview">
                        <div class="preview-glow ${price >= 100 ? 'gold-glow' : ''}"></div>
                        ${avatarDisplay}
                    </div>
                    
                    <h3 class="premium-title">${avatarName}</h3>
                    <p class="premium-subtitle">${tierLabel}</p>
                    
                    <div class="premium-price-tag ${price >= 100 ? 'exclusive-price' : ''}">
                        <span class="price-label">Price</span>
                        <span class="price-value">₹${price}</span>
                    </div>
                    
                    <div class="wallet-display">
                        <span class="wallet-label">Your Wallet</span>
                        <span class="wallet-value ${canAfford ? 'sufficient' : 'insufficient'}">₹${wallet}</span>
                    </div>
                    
                    ${canAfford ? `
                        <button class="premium-buy-btn ${price >= 100 ? 'exclusive-btn' : ''}" id="purchaseBtn" onclick="executePurchase('${avatar}', '${avatarName}', ${price})">
                            <span class="buy-icon">${price >= 100 ? '👑' : '✨'}</span>
                            <span>Purchase & Equip</span>
                        </button>
                    ` : `
                        <div class="insufficient-funds">
                            <span class="sad-emoji">😢</span>
                            <p>Not enough funds!</p>
                            <p class="need-more">You need ₹${price - wallet} more</p>
                            <button class="add-money-btn" onclick="closePremiumPurchaseModal(); if(window.BroProWallet) BroProWallet.openAddMoneyModal(${price - wallet + 10}, 'avatar_purchase');" style="
                                margin-top: 1rem;
                                padding: 0.75rem 1.5rem;
                                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                                color: white;
                                border: none;
                                border-radius: 12px;
                                font-weight: 600;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                                justify-content: center;
                                width: 100%;
                            ">
                                <span>💳</span>
                                <span>Add ₹${Math.ceil((price - wallet + 10) / 10) * 10} Now</span>
                            </button>
                            <p class="earn-tip" style="margin-top: 0.75rem;">💡 Or practice more to earn rupees!</p>
                        </div>
                    `}
                    
                    <p class="premium-note">✨ Premium avatars are exclusive & permanent</p>
                </div>
            </div>
        </div>
    `;

    // Remove any existing modal
    const existing = document.getElementById('premiumPurchaseModal');
    if (existing) existing.remove();

    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Animate in
    requestAnimationFrame(() => {
        const modal = document.getElementById('premiumPurchaseModal');
        if (modal) modal.classList.add('active');
    });
}

// Close purchase modal
function closePremiumPurchaseModal() {
    const modal = document.getElementById('premiumPurchaseModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Execute the actual purchase
async function executePurchase(avatar, avatarName, price = 20) {
    // Disable button to prevent double-click
    const btn = document.getElementById('purchaseBtn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⏳ Processing...</span>';
    }

    // Fresh check of wallet balance
    const wallet = getWalletBalance();
    console.log('🛒 PURCHASE START:', { avatar, avatarName, price, currentBalance: wallet });

    if (wallet < price) {
        if (window.BroProLeaderboard) {
            BroProLeaderboard.showToast('error', `❌ Insufficient funds! Balance: ₹${wallet}`);
        }
        closePremiumPurchaseModal();
        return;
    }

    // Check if this is a limited stock avatar and handle stock decrement
    const isLimitedStock = LimitedStockAvatars.config && LimitedStockAvatars.config[avatar];
    if (isLimitedStock) {
        // Get current user info for stock tracking
        if (!window.FirebaseAuth || !FirebaseAuth.currentUser) {
            if (window.BroProLeaderboard) {
                BroProLeaderboard.showToast('error', '❌ Please login to purchase limited edition avatars!');
            }
            closePremiumPurchaseModal();
            openAuthModal();
            return;
        }

        const userUid = FirebaseAuth.currentUser.uid;
        const userEmail = FirebaseAuth.currentUser.email;

        // Attempt to purchase stock atomically
        const stockResult = await LimitedStockAvatars.purchaseStock(avatar, userUid, userEmail);

        if (!stockResult.success && !stockResult.alreadyOwned) {
            if (window.BroProLeaderboard) {
                BroProLeaderboard.showToast('error', `❌ ${stockResult.error}`);
            }
            closePremiumPurchaseModal();
            return;
        }

        console.log('✅ Limited stock purchase processed:', stockResult);
    }

    // Close purchase modal
    closePremiumPurchaseModal();

    // Show processing toast
    if (window.BroProLeaderboard) {
        BroProLeaderboard.showToast('info', '⏳ Processing purchase...');
    }

    // Small delay for premium feel
    await new Promise(r => setTimeout(r, 600));

    // Load fresh profile
    const profile = BroProPlayer.load();
    console.log('📋 Profile BEFORE purchase:', {
        xp: profile.xp,
        walletSpent: profile.walletSpent,
        ownedAvatars: profile.ownedPremiumAvatars
    });

    // Calculate and update spent amount
    const currentSpent = profile.walletSpent || 0;
    const newSpent = currentSpent + price;
    profile.walletSpent = newSpent;

    // Add to owned avatars array
    if (!Array.isArray(profile.ownedPremiumAvatars)) {
        profile.ownedPremiumAvatars = [];
    }
    if (!profile.ownedPremiumAvatars.includes(avatar)) {
        profile.ownedPremiumAvatars.push(avatar);
    }

    // Set as current avatar
    profile.avatar = avatar;

    console.log('📋 Profile AFTER modification:', {
        xp: profile.xp,
        walletSpent: profile.walletSpent,
        ownedAvatars: profile.ownedPremiumAvatars,
        avatar: profile.avatar
    });

    // Save to localStorage
    BroProPlayer.save(profile);

    // Verify save worked
    const verifyProfile = BroProPlayer.load();
    console.log('✅ Profile AFTER SAVE (verification):', {
        walletSpent: verifyProfile.walletSpent,
        ownedAvatars: verifyProfile.ownedPremiumAvatars
    });

    // Sync to Firebase if logged in - update ALL leaderboards
    if (window.BroProLeaderboard) {
        BroProLeaderboard.updateAvatarAcrossLeaderboards(avatar);
    }

    // Also update legacy leaderboard
    if (window.FirebaseAuth && FirebaseAuth.currentUser) {
        try {
            await FirebaseAuth.updateLeaderboardEntry(profile);
        } catch (err) {
            console.warn('Firebase sync error:', err);
        }
    }

    // Update all UI elements
    updatePremiumState();
    updateNavbarStats();

    // Update profile modal wallet display directly
    const profileWalletEl = document.getElementById('profileWallet');
    if (profileWalletEl) {
        const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
        const earnedFromXP = Math.floor(profile.xp / divisor);
        const addedViaPurchase = profile.walletAdded || 0;
        // Ensure wallet never goes negative
        const available = Math.max(0, earnedFromXP + addedViaPurchase - profile.walletSpent);
        profileWalletEl.textContent = `₹${available.toLocaleString()}`;
    }

    // Update avatar in profile modal - handle image avatars
    const avatarEl = document.getElementById('profileAvatar');
    if (avatarEl) {
        const imageAvatars = ['bhai', 'black-rock-bhain', 'bhagat-singh', 'shri-ram', 'krishna', 'buddha', 'guru-nanak', 'vivekananda', 'ambedkar', 'gandhi', 'netaji', 'hanuman', 'apj-kalam', 'tipu-sultan', 'maharana-pratap', 'maulana-azad', 'shivaji-maharaj', 'rani-lakshmibai', 'savitribai-phule', 'kalpana-chawla', 'aryabhata', 'sardar-patel', 'lal-bahadur-shastri', 'jawaharlal-nehru', 'chanakya', 'cv-raman', 'vikram-sarabhai', 'ratan-tata', 'nelson-mandela'];
        if (imageAvatars.includes(avatar) || avatar.startsWith('img:')) {
            avatarEl.innerHTML = `<img src="assets/avatars/${avatar}-avatar.png" alt="Avatar" class="profile-avatar-img">`;
        } else {
            avatarEl.textContent = avatar;
        }
        avatarEl.classList.add('animated');
        setTimeout(() => avatarEl.classList.remove('animated'), 500);
    }

    // Highlight in picker
    highlightCurrentAvatar(avatar);

    // Show success celebration
    showPurchaseCelebration(avatar, avatarName, wallet - price);

    // Log for debugging
    console.log(`✅ PURCHASE COMPLETE: ${avatarName}`);
    console.log(`   Spent: ₹${price} | New Balance: ₹${wallet - price}`);
    console.log(`   Owned Avatars: ${profile.ownedPremiumAvatars.join(', ')}`);
}

// Show purchase success celebration - WORLD CLASS PREMIUM EXPERIENCE
function showPurchaseCelebration(avatar, avatarName, newBalance) {
    const celebrationHTML = `
        <div class="purchase-success-overlay" id="purchaseSuccessModal">
            <div class="celebration-particles" id="celebrationParticles"></div>
            <div class="celebration-spotlight"></div>
            <div class="purchase-success-container">
                <div class="success-ring success-ring-1"></div>
                <div class="success-ring success-ring-2"></div>
                <div class="success-ring success-ring-3"></div>
                <div class="success-crown">👑</div>
                <div class="success-avatar-wrapper">
                    <div class="success-avatar-glow"></div>
                    <div class="success-avatar-shine"></div>
                    <span class="success-avatar">${avatar}</span>
                </div>
                <div class="success-badge">UNLOCKED</div>
                <h2 class="success-title">Congratulations!</h2>
                <p class="success-subtitle">${avatarName}</p>
                <div class="success-divider"></div>
                <div class="success-stats">
                    <div class="success-stat">
                        <span class="stat-icon">✨</span>
                        <span class="stat-label">Premium Avatar</span>
                    </div>
                    <div class="success-stat">
                        <span class="stat-icon">💰</span>
                        <span class="stat-value">₹${newBalance}</span>
                        <span class="stat-label">Balance</span>
                    </div>
                </div>
                <button class="success-btn" onclick="closePurchaseCelebration()">
                    <span class="btn-text">Continue</span>
                    <span class="btn-icon">→</span>
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', celebrationHTML);

    // Create floating particles
    createCelebrationParticles();

    requestAnimationFrame(() => {
        const modal = document.getElementById('purchaseSuccessModal');
        if (modal) modal.classList.add('active');
    });

    // Play PREMIUM satisfying sound sequence
    playPremiumPurchaseSound();

    // Show success toast
    if (window.BroProLeaderboard) {
        BroProLeaderboard.showToast('success', `👑 ${avatarName} unlocked!`);
    }
}

// Create celebration particles
function createCelebrationParticles() {
    const container = document.getElementById('celebrationParticles');
    if (!container) return;

    const colors = ['#ffd700', '#ff8c00', '#10b981', '#667eea', '#f472b6', '#60a5fa'];
    const emojis = ['⭐', '✨', '💫', '🌟', '💎', '👑', '🎉', '🎊'];

    // Create sparkle particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'celebration-particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-delay: ${Math.random() * 2}s;
            animation-duration: ${2 + Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }

    // Create emoji particles
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'celebration-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 1}s;
            animation-duration: ${3 + Math.random() * 2}s;
        `;
        container.appendChild(emoji);
    }
}

// Premium satisfying purchase sound
function playPremiumPurchaseSound() {
    if (!window.BroProSounds || !BroProSounds.enabled) return;
    if (!BroProSounds.audioContext) BroProSounds.init();

    const ctx = BroProSounds.audioContext;
    if (!ctx) return;

    // Resume audio context if suspended
    if (ctx.state === 'suspended') ctx.resume();

    try {
        // Create a rich, satisfying sound sequence
        const now = ctx.currentTime;

        // Main celebratory chord progression - ascending and satisfying
        const notes = [
            { freq: 523.25, time: 0, duration: 0.15 },     // C5
            { freq: 659.25, time: 0.1, duration: 0.15 },   // E5
            { freq: 783.99, time: 0.2, duration: 0.15 },   // G5
            { freq: 1046.50, time: 0.3, duration: 0.25 },  // C6
            { freq: 1318.51, time: 0.5, duration: 0.4 },   // E6 (main note - held)
        ];

        notes.forEach(note => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = note.freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0, now + note.time);
            gain.gain.linearRampToValueAtTime(0.25, now + note.time + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, now + note.time + note.duration);
            osc.start(now + note.time);
            osc.stop(now + note.time + note.duration);
        });

        // Add shimmer/sparkle effect
        for (let i = 0; i < 5; i++) {
            const shimmer = ctx.createOscillator();
            const shimmerGain = ctx.createGain();
            shimmer.connect(shimmerGain);
            shimmerGain.connect(ctx.destination);
            shimmer.frequency.value = 2000 + Math.random() * 2000;
            shimmer.type = 'sine';
            const startTime = now + 0.4 + i * 0.1;
            shimmerGain.gain.setValueAtTime(0, startTime);
            shimmerGain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
            shimmerGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
            shimmer.start(startTime);
            shimmer.stop(startTime + 0.15);
        }
    } catch (e) {
        console.log('Premium sound error:', e);
        // Fallback to basic sound
        BroProSounds.play('purchase');
    }
}

// Close celebration modal
function closePurchaseCelebration() {
    const modal = document.getElementById('purchaseSuccessModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Handle premium avatar selection (owned = equip, not owned = purchase)
function selectPremiumAvatar(avatar, avatarName = 'Premium Avatar', price = 20) {
    if (isPremiumAvatarOwned(avatar)) {
        // Already owned - just equip it
        selectAvatar(avatar);
        if (window.BroProLeaderboard) {
            BroProLeaderboard.showToast('success', `✅ ${avatarName} equipped!`);
        }
    } else {
        // Not owned - show purchase modal
        showPremiumPurchaseModal(avatar, avatarName, price);
    }
}

if (profileModal) {
    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            closeProfileModal();
        }
    });
}

function renderAchievements(profile) {
    const grid = document.getElementById('achievementsGrid');
    if (!window.BroProAchievements) return;

    grid.innerHTML = BroProAchievements.list.map(achievement => {
        const unlocked = profile.achievements.includes(achievement.id);
        return `
            <div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}" title="${achievement.name}">
                <span>${achievement.icon}</span>
                <div class="achievement-tooltip">${achievement.name}<br><small>${achievement.desc}</small></div>
            </div>
        `;
    }).join('');
}

// Sound Toggle
function toggleSounds() {
    if (!window.BroProSounds) return;

    const enabled = BroProSounds.toggle();
    document.querySelector('.sound-icon').textContent = enabled ? '🔊' : '🔇';
}

// Update Navbar Stats
function updateNavbarStats() {
    if (!window.BroProPlayer) return;

    const profile = BroProPlayer.load();

    // Update wallet with rupee symbol (wallet = XP/DIVISOR + walletAdded - spent)
    const walletEl = document.getElementById('navWallet');
    if (walletEl) {
        const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
        const earnedFromXP = Math.floor((profile.xp || 0) / divisor);
        const addedViaPurchase = profile.walletAdded || 0;
        const spent = profile.walletSpent || 0;
        const available = Math.max(0, earnedFromXP + addedViaPurchase - spent);
        walletEl.textContent = `₹${available}`;
    }

    const navXPEl = document.getElementById('navXP');
    const navLevelEl = document.getElementById('navLevel');
    if (navXPEl) navXPEl.textContent = profile.xp;
    if (navLevelEl) navLevelEl.textContent = profile.level;
}

// Event Listeners
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

// ============================================
// GLOBAL LEADERBOARD
// ============================================
function openGlobalLeaderboard() {
    console.log('Attempting to open global leaderboard...');
    try {
        // Check if logged in for leaderboard access
        if (!window.BroProPlayer || !BroProPlayer.isLoggedIn()) {
            console.log('User not logged in, showing login required.');
            showLoginRequired('Login to view the leaderboard and see your ranking!');
            return;
        }

        const modal = document.getElementById('globalLeaderboardModal');
        if (modal) {
            modal.classList.add('active');
            console.log('Leaderboard modal active class added.');
            renderGlobalLeaderboard();
        } else {
            console.error('Global leaderboard modal element not found!');
            alert('Error: Leaderboard modal missing.');
        }
    } catch (e) {
        console.error('Error opening leaderboard:', e);
        alert('Something went wrong opening the leaderboard. Please check console.');
    }
}

function closeGlobalLeaderboard() {
    const modal = document.getElementById('globalLeaderboardModal');
    if (modal) modal.classList.remove('active');
}

// Current leaderboard period
let currentGlobalPeriod = 'alltime';

function switchGlobalTab(period) {
    currentGlobalPeriod = period;

    // Update tab buttons with premium styles
    const tabs = document.querySelectorAll('#globalLeaderboardTabs .tab-btn');
    tabs.forEach(tab => {
        const isActive = tab.dataset.period === period;
        tab.classList.toggle('active', isActive);

        if (isActive) {
            tab.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
            tab.style.color = 'white';
            tab.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
        } else {
            tab.style.background = 'transparent';
            tab.style.color = 'var(--text-secondary, #666)';
            tab.style.boxShadow = 'none';
        }
    });

    // Re-render leaderboard with new period
    renderGlobalLeaderboard(period);
}

function renderGlobalLeaderboard(period = 'alltime') {
    console.log('📋 Rendering global leaderboard...', period);

    // Use new leaderboard system
    if (window.BroProLeaderboard) {
        // Use the new renderLeaderboard API: (containerId, subject, options)
        BroProLeaderboard.renderLeaderboard('globalLeaderboardList', 'global', {
            showDelete: false,
            limit: 20,
            period: period
        });

        // Also update your rank
        BroProLeaderboard.getUserRank('global').then(result => {
            const rankEl = document.getElementById('globalYourRank');
            const xpEl = document.getElementById('globalYourXP');

            if (rankEl) rankEl.textContent = result.rank;
            if (xpEl) xpEl.textContent = result.xp.toLocaleString();

            console.log('📊 Your global rank:', result.rank, 'XP:', result.xp);
        });
    } else {
        console.log('⚠️ BroProLeaderboard not available');
        // Fallback for when leaderboard module isn't loaded
        const list = document.getElementById('globalLeaderboardList');
        if (list) {
            list.innerHTML = '<p style="text-align: center; padding: 2rem;">Loading leaderboard...</p>';
        }
    }
}

// ============================================
// AUTHENTICATION UI
// ============================================
async function openAuthModal() {
    if (window.BroProPlayer && BroProPlayer.isLoggedIn()) {
        // Already logged in, show premium logout confirmation
        const shouldLogout = await showConfirmModal(
            'Switch Account?',
            `You are logged in as ${BroProPlayer.getName()}. Do you want to logout?`,
            '🔄'
        );
        if (shouldLogout) {
            handleLogout();
        }
        return;
    }
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
    // Clear form errors
    document.getElementById('loginError').textContent = '';
    document.getElementById('signupError').textContent = '';
}

function switchAuthTab(tab) {
    if (tab === 'login') {
        document.getElementById('loginTab').classList.add('active');
        document.getElementById('signupTab').classList.remove('active');
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('signupForm').classList.add('hidden');
    } else {
        document.getElementById('loginTab').classList.remove('active');
        document.getElementById('signupTab').classList.add('active');
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('signupForm').classList.remove('hidden');
    }
}

async function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    const submitBtn = document.querySelector('#loginForm .auth-submit');

    // Clear previous error
    errorEl.textContent = '';

    // Validation
    if (!email || !password) {
        errorEl.textContent = 'Please fill in all fields';
        return;
    }

    // Show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Logging in...';
    }

    // Use Firebase Authentication for email/password login
    if (window.FirebaseAuth && FirebaseAuth.signInWithEmail) {
        const result = await FirebaseAuth.signInWithEmail(email, password);

        if (result.success) {
            closeAuthModal();
            updateAuthUI();
            updateNavbarStats();

            // Get user name from Firebase user or profile
            const userName = result.user.displayName || email.split('@')[0];
            showWelcomeModal(userName, false);
        } else {
            errorEl.textContent = result.error;
            // Reset button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Login';
            }
        }
    } else {
        // Fallback to old localStorage-based method (should not happen normally)
        console.warn('⚠️ Firebase Auth not available, using localStorage fallback');
        const result = window.BroProPlayer.login(email, password);

        if (result.success) {
            closeAuthModal();
            updateAuthUI();
            updateNavbarStats();
            showWelcomeModal(result.user.name, false);
        } else {
            errorEl.textContent = result.error;
        }

        // Reset button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Login';
        }
    }
}


async function handleSignup() {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const errorEl = document.getElementById('signupError');
    const submitBtn = document.querySelector('#signupForm .auth-submit');

    // Clear previous error
    errorEl.textContent = '';

    // Validation
    if (!name || !email || !password) {
        errorEl.textContent = 'Please fill in all fields';
        return;
    }

    if (name.length < 2) {
        errorEl.textContent = 'Name must be at least 2 characters';
        return;
    }

    if (!email.includes('@')) {
        errorEl.textContent = 'Please enter a valid email';
        return;
    }

    if (password.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters';
        return;
    }

    // Show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Creating account...';
    }

    // Use Firebase Authentication for email/password signup
    if (window.FirebaseAuth && FirebaseAuth.signUpWithEmail) {
        const result = await FirebaseAuth.signUpWithEmail(name, email, password);

        if (result.success) {
            closeAuthModal();
            updateAuthUI();
            updateNavbarStats();
            // Show premium welcome message for new user
            showWelcomeModal(name, true);
        } else {
            errorEl.textContent = result.error;
            // Reset button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Create Account';
            }
        }
    } else {
        // Fallback to old localStorage-based method (should not happen normally)
        console.warn('⚠️ Firebase Auth not available, using localStorage fallback');
        const result = window.BroProPlayer.signup(name, email, password);

        if (result.success) {
            closeAuthModal();
            updateAuthUI();
            updateNavbarStats();
            showWelcomeModal(result.user.name, true);
        } else {
            errorEl.textContent = result.error;
        }

        // Reset button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Create Account';
        }
    }
}


function handleLogout() {
    // Set logout flag to prevent auto-relogin (critical for Safari)
    sessionStorage.setItem('supersite-logged-out', 'true');

    if (window.FirebaseAuth) {
        FirebaseAuth.isLoggingOut = true;
    }

    // Clear ALL localStorage first (Safari-friendly approach)
    try {
        localStorage.removeItem('supersite-player-profile');
        localStorage.removeItem('supersite-current-user');
        localStorage.removeItem('supersite-firebase-user');
        localStorage.removeItem('supersite-leaderboard');
        localStorage.removeItem('supersite-cloud-leaderboard');
    } catch (e) {
        console.error('localStorage clear error:', e);
    }

    // Clear BroProPlayer
    if (window.BroProPlayer) {
        try {
            BroProPlayer.logout();
        } catch (e) {
            console.error('BroProPlayer logout error:', e);
        }
    }

    // Sign out from Firebase (using callback for Safari compatibility)
    if (window.firebase && firebase.auth) {
        firebase.auth().signOut()
            .then(function () {
                console.log('Firebase signed out successfully');
                showGoodbyeModal('You have been logged out successfully.');
            })
            .catch(function (error) {
                console.error('Firebase signout error:', error);
                showGoodbyeModal('You have been logged out.');
            });
    } else {
        showGoodbyeModal('You have been logged out successfully.');
    }
}

function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const authBtnText = document.getElementById('authBtnText');

    if (window.BroProPlayer && BroProPlayer.isLoggedIn()) {
        const name = BroProPlayer.getName();
        authBtnText.textContent = name.split(' ')[0]; // First name only
        authBtn.classList.add('logged-in');
        authBtn.title = 'Click to logout';
    } else {
        authBtnText.textContent = 'Login';
        authBtn.classList.remove('logged-in');
        authBtn.title = 'Login or Sign up';
    }
}

// Login Required Modal handlers
function showLoginRequired(message) {
    document.getElementById('loginRequiredMessage').textContent = message || 'Please login to access this content.';
    document.getElementById('loginRequiredModal').classList.add('active');
}

function closeLoginRequiredModal() {
    document.getElementById('loginRequiredModal').classList.remove('active');
}

// Check activity access (for use in subject pages)
window.checkActivityAccess = function (activityIndex, activityName) {
    if (window.BroProPlayer) {
        const access = BroProPlayer.checkActivityAccess(activityIndex);
        if (!access.allowed) {
            showLoginRequired(`Login to unlock "${activityName}" and all other activities!`);
            return false;
        }
    }
    return true;
};

// Update DOMContentLoaded to include auth UI update
const originalDOMReady = document.addEventListener;
document.addEventListener('DOMContentLoaded', () => {
    renderSubjects();
    renderFeatures();
    initTheme();
    initNavbarScroll();

    // Update auth UI
    updateAuthUI();

    setTimeout(() => {
        updateNavbarStats();
        if (window.BroProPlayer) {
            const profile = BroProPlayer.load();
            const soundIcon = document.querySelector('.sound-icon');
            if (soundIcon) {
                soundIcon.textContent = profile.settings.soundEnabled ? '🔊' : '🔇';
            }
        }

        // Show premium badge if user is premium
        if (window.BroProPremium) {
            BroProPremium.updatePremiumBadge();
        }

        // Check if we need to auto-open chat (redirected from subject page notification)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('openChat') === 'true') {
            // Remove the query param from URL
            window.history.replaceState({}, '', window.location.pathname);

            // Open chat after a brief delay for page to load
            setTimeout(() => {
                if (window.BroProAdmin && typeof BroProAdmin.openStudentChat === 'function') {
                    BroProAdmin.openStudentChat();
                }
            }, 500);
        }
    }, 100);
});


// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    if (!menu || !overlay) return;

    menu.classList.toggle('active');
    overlay.classList.toggle('active');

    // Update mobile stats when menu opens
    if (menu.classList.contains('active') && window.BroProPlayer) {
        const profile = BroProPlayer.load();
        const mobileWallet = document.getElementById('mobileWallet');
        const mobileXP = document.getElementById('mobileXP');
        const mobileLevel = document.getElementById('mobileLevel');

        const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
        if (mobileWallet) mobileWallet.textContent = '₹' + Math.floor(profile.xp / divisor).toLocaleString();
        if (mobileXP) mobileXP.textContent = profile.xp.toLocaleString();
        if (mobileLevel) mobileLevel.textContent = profile.level;
    }
}

// Premium Alert Modal Functions
function showPremiumAlert(title, message, icon = '🔐') {
    const modal = document.getElementById('premiumAlertModal');
    const titleEl = document.getElementById('premiumAlertTitle');
    const messageEl = document.getElementById('premiumAlertMessage');
    const iconEl = document.getElementById('premiumAlertIcon');

    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    if (iconEl) iconEl.innerHTML = `<span>${icon}</span>`;

    if (modal) modal.classList.add('active');
}

function closePremiumAlert() {
    const modal = document.getElementById('premiumAlertModal');
    if (modal) modal.classList.remove('active');
}

// Welcome Modal Functions
function showWelcomeModal(name, isNewUser = false) {
    const modal = document.getElementById('welcomeModal');
    const greetingEl = document.getElementById('welcomeGreeting');
    const nameEl = document.getElementById('welcomeName');
    const subtitleEl = document.getElementById('welcomeSubtitle');
    const avatarEl = document.getElementById('welcomeAvatar');

    if (greetingEl) {
        greetingEl.textContent = isNewUser ? 'Welcome!' : 'Welcome Back!';
    }
    if (nameEl) {
        nameEl.textContent = name || 'Champion';
    }
    if (subtitleEl) {
        subtitleEl.textContent = isNewUser
            ? 'Your learning journey begins now!'
            : 'Ready to continue learning?';
    }
    if (avatarEl) {
        avatarEl.textContent = isNewUser ? '🎉' : '👋';
    }

    if (modal) modal.classList.add('active');
}

function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) modal.classList.remove('active');
}

// Confirm Modal Functions
let confirmResolve = null;

function showConfirmModal(title, message, icon = '🤔') {
    return new Promise((resolve) => {
        confirmResolve = resolve;

        const modal = document.getElementById('confirmModal');
        const titleEl = document.getElementById('confirmTitle');
        const messageEl = document.getElementById('confirmMessage');
        const iconEl = document.getElementById('confirmIcon');

        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.textContent = message;
        if (iconEl) iconEl.textContent = icon;

        if (modal) modal.classList.add('active');
    });
}

function closeConfirmModal(result) {
    const modal = document.getElementById('confirmModal');
    if (modal) modal.classList.remove('active');

    if (confirmResolve) {
        confirmResolve(result);
        confirmResolve = null;
    }
}

// Goodbye Modal Functions
let shouldReloadAfterGoodbye = false;

function showGoodbyeModal(message = 'You have been logged out successfully.', reload = true) {
    const modal = document.getElementById('goodbyeModal');
    const messageEl = document.getElementById('goodbyeMessage');

    shouldReloadAfterGoodbye = reload;
    if (messageEl) messageEl.textContent = message;
    if (modal) modal.classList.add('active');
}

function closeGoodbyeModal() {
    const modal = document.getElementById('goodbyeModal');
    if (modal) modal.classList.remove('active');

    // Reload page after user acknowledges the goodbye message
    if (shouldReloadAfterGoodbye) {
        window.location.replace(window.location.pathname);
    }
}

// ============================================
// PREMIUM SUBSCRIPTION SYSTEM
// ============================================

var BroProPremium = {
    // NEW PRICING STRUCTURE - January 2026
    priceMonthly: 199,      // ₹199/month
    priceYearly: 1999,      // ₹1999/year (base price)
    price: 1999,            // Default for backward compatibility
    selectedPlan: 'yearly', // 'monthly' or 'yearly'
    currentPromoCode: null,
    promoDiscount: 0,
    promoDiscountRupees: 0, // Actual rupees off
    promoMessage: null,     // Custom message from promo code
    featuredDeal: null,     // Cached featured deal from Firebase

    // Check if user has premium access
    isPremium() {
        // Try BroProPlayer first
        let profile = null;
        if (window.BroProPlayer) {
            profile = BroProPlayer.load();
        } else {
            // Fallback: check localStorage directly
            try {
                profile = JSON.parse(localStorage.getItem('supersite-player-profile') || '{}');
            } catch (e) {
                return false;
            }
        }

        if (!profile || !profile.premium) return false;

        // Check if premium has expired
        if (profile.premiumExpiry) {
            const expiry = new Date(profile.premiumExpiry);
            const now = new Date();

            if (expiry < now) {
                console.log('⚠️ Premium EXPIRED on', expiry.toISOString());

                // Only revoke once - check if we haven't already revoked
                if (!profile.premiumExpiredAt) {
                    this.handlePremiumExpiration(profile, expiry);
                }

                return false;
            }
        }

        return true;
    },

    // Handle premium expiration - cleanup and sync
    handlePremiumExpiration(profile, expiryDate) {
        console.log('🔄 Processing premium expiration...');

        // Mark as expired (not revoked by admin, naturally expired)
        profile.premium = false;
        profile.premiumExpiredAt = new Date().toISOString();
        profile.premiumExpiredReason = 'subscription_ended';
        // Keep premiumExpiry for reference

        // Save to localStorage
        if (window.BroProPlayer) {
            BroProPlayer.save(profile);
        } else {
            localStorage.setItem('supersite-player-profile', JSON.stringify(profile));
        }

        // Update localStorage status flag
        localStorage.setItem('supersite_premium_status', 'expired');

        // Sync to Firebase
        this.syncExpiredStatusToFirebase(profile);

        // Update UI
        setTimeout(() => {
            this.updatePremiumBadge();
        }, 100);

        // Show notification to user
        if (window.BroProLeaderboard && window.BroProLeaderboard.showToast) {
            setTimeout(() => {
                BroProLeaderboard.showToast(
                    '⏰ Subscription Expired',
                    'Your premium subscription has ended. Renew to continue enjoying unlimited access!',
                    6000
                );
            }, 500);
        }

        console.log('✅ Premium expiration processed');
    },

    // Sync expired status to Firebase
    async syncExpiredStatusToFirebase(profile) {
        try {
            if (!window.firebase || !firebase.auth || !firebase.firestore) {
                console.log('Firebase not available for expiry sync');
                return;
            }

            const user = firebase.auth().currentUser;
            if (!user) {
                console.log('No user logged in for expiry sync');
                return;
            }

            const db = firebase.firestore();
            const expiryData = {
                premium: false,
                premiumExpiredAt: profile.premiumExpiredAt,
                premiumExpiredReason: 'subscription_ended',
                // Keep history
                premiumExpiry: profile.premiumExpiry,
                premiumGrantedAt: profile.premiumGrantedAt
            };

            await db.collection('users').doc(user.uid).set(expiryData, { merge: true });
            await db.collection('presence').doc(user.uid).set(expiryData, { merge: true });

            console.log('✅ Expiration synced to Firebase');
        } catch (error) {
            console.warn('Could not sync expiration to Firebase:', error.message);
        }
    },

    // Get premium expiry date
    getExpiryDate() {
        let profile = null;
        if (window.BroProPlayer) {
            profile = BroProPlayer.load();
        } else {
            try {
                profile = JSON.parse(localStorage.getItem('supersite-player-profile') || '{}');
            } catch (e) {
                return null;
            }
        }
        return profile && profile.premiumExpiry ? new Date(profile.premiumExpiry) : null;
    },

    // Grant premium access (1 year from now)
    grantPremium(referenceOrPromoCode = null, promoCodeUsed = null) {
        let profile = null;
        if (window.BroProPlayer) {
            profile = BroProPlayer.load();
        } else {
            try {
                profile = JSON.parse(localStorage.getItem('supersite-player-profile') || '{}');
            } catch (e) {
                profile = {};
            }
        }

        // Get the selected plan to determine duration
        const selectedPlan = this.selectedPlan || 'yearly';

        const expiryDate = new Date();
        if (selectedPlan === 'monthly') {
            // Monthly subscription: 1 month from now
            expiryDate.setMonth(expiryDate.getMonth() + 1);
            profile.premiumPlan = 'monthly';
        } else {
            // Yearly subscription: 1 year from now
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            profile.premiumPlan = 'yearly';
        }

        profile.premium = true;
        profile.premiumExpiry = expiryDate.toISOString();
        profile.premiumGrantedAt = new Date().toISOString();

        // Handle different scenarios:
        // 1. Just promo code (100% discount): referenceOrPromoCode = promoCode, promoCodeUsed = null
        // 2. Just payment (no promo): referenceOrPromoCode = paymentId, promoCodeUsed = null
        // 3. Payment + Promo (partial discount): referenceOrPromoCode = paymentId, promoCodeUsed = promoCode

        if (referenceOrPromoCode) {
            // Check if it's a payment reference (starts with cashfree_, paid_, etc.)
            if (referenceOrPromoCode.startsWith('cashfree_') || referenceOrPromoCode.startsWith('paid_')) {
                profile.premiumPaymentRef = referenceOrPromoCode;
            } else {
                // It's a promo code
                profile.premiumPromoCode = referenceOrPromoCode;
            }
        }

        // If a separate promo code was used with payment
        if (promoCodeUsed) {
            profile.premiumPromoCode = promoCodeUsed;
        }

        // Save to localStorage
        if (window.BroProPlayer) {
            BroProPlayer.save(profile);
        } else {
            localStorage.setItem('supersite-player-profile', JSON.stringify(profile));
        }

        // Update premium badge
        this.updatePremiumBadge();

        // Sync to Firebase
        this.syncPremiumToFirebase(profile);

        console.log('✅ Premium granted! Expires:', expiryDate);
        return true;
    },

    // Update premium status in profile modal
    updatePremiumBadge() {
        const premiumStatusEl = document.getElementById('profilePremiumStatus');
        if (!premiumStatusEl) return;

        // Add styles if not present
        if (!document.getElementById('premiumStatusStyles')) {
            const style = document.createElement('style');
            style.id = 'premiumStatusStyles';
            style.textContent = `
                .profile-premium-status {
                    margin: 1rem 0;
                    padding: 1rem;
                    border-radius: 16px;
                    text-align: center;
                }
                .premium-active-card {
                    background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1));
                    border: 2px solid rgba(255, 215, 0, 0.4);
                    animation: premiumGlow 3s ease-in-out infinite;
                }
                @keyframes premiumGlow {
                    0%, 100% { border-color: rgba(255, 215, 0, 0.4); box-shadow: 0 0 15px rgba(255, 215, 0, 0.2); }
                    50% { border-color: rgba(255, 215, 0, 0.7); box-shadow: 0 0 25px rgba(255, 215, 0, 0.4); }
                }
                .premium-inactive-card {
                    background: linear-gradient(135deg, rgba(100, 100, 100, 0.1), rgba(80, 80, 80, 0.05));
                    border: 2px dashed rgba(255, 255, 255, 0.2);
                }
                .premium-status-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                .premium-crown {
                    font-size: 1.5rem;
                    animation: crownBounce 2s ease-in-out infinite;
                }
                @keyframes crownBounce {
                    0%, 100% { transform: translateY(0) rotate(-5deg); }
                    50% { transform: translateY(-5px) rotate(5deg); }
                }
                .premium-status-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #ffd700, #ff8c00);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .premium-status-title.inactive {
                    background: none;
                    -webkit-text-fill-color: rgba(255, 255, 255, 0.6);
                }
                .premium-status-info {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                }
                .premium-status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #22c55e;
                    animation: dotPulse 2s ease-in-out infinite;
                }
                @keyframes dotPulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
                    50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
                }
                .premium-expiry {
                    color: #22c55e;
                    font-weight: 600;
                }
                .upgrade-premium-btn {
                    margin-top: 0.75rem;
                    padding: 0.6rem 1.2rem;
                    background: linear-gradient(135deg, #ffd700, #ff8c00);
                    color: #000;
                    border: none;
                    border-radius: 25px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .upgrade-premium-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
                }
            `;
            document.head.appendChild(style);
        }

        if (this.isPremium()) {
            const expiry = this.getExpiryDate();
            const expiryText = expiry ? expiry.toLocaleDateString('en-IN', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }) : 'Forever';

            premiumStatusEl.className = 'profile-premium-status premium-active-card';
            premiumStatusEl.innerHTML = `
                <div class="premium-status-header">
                    <span class="premium-crown">👑</span>
                    <span class="premium-status-title">Premium Member</span>
                </div>
                <div class="premium-status-info">
                    <span class="premium-status-dot"></span>
                    <span>Active until <span class="premium-expiry">${expiryText}</span></span>
                </div>
            `;
        } else {
            premiumStatusEl.className = 'profile-premium-status premium-inactive-card';
            premiumStatusEl.innerHTML = `
                <div class="premium-status-header">
                    <span class="premium-crown" style="opacity: 0.5; animation: none;">👑</span>
                    <span class="premium-status-title inactive">Free Account</span>
                </div>
                <button class="upgrade-premium-btn" onclick="closeProfileModal(); openPremiumModal();">
                    ✨ Upgrade to Premium
                </button>
            `;
        }
    },

    // Sync premium status to Firebase
    async syncPremiumToFirebase(profile, retryCount = 0) {
        if (!window.firebase || !firebase.firestore) {
            console.warn('Firebase not available for premium sync');
            return;
        }

        const maxRetries = 3;
        const retryDelay = 1000 * (retryCount + 1); // Exponential backoff

        try {
            const db = firebase.firestore();
            let user = firebase.auth().currentUser;

            // If user is not authenticated, wait a bit and retry
            if (!user && retryCount < maxRetries) {
                console.log(`⏳ User not authenticated, waiting ${retryDelay}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                user = firebase.auth().currentUser;

                if (!user) {
                    // Retry recursively
                    return this.syncPremiumToFirebase(profile, retryCount + 1);
                }
            }

            if (user) {
                // Premium data to sync
                const premiumData = {
                    // Premium status
                    premium: profile.premium,
                    premiumExpiry: profile.premiumExpiry,
                    premiumGrantedAt: profile.premiumGrantedAt,
                    premiumPromoCode: profile.premiumPromoCode || null,
                    premiumPaymentRef: profile.premiumPaymentRef || null
                };

                // User identity info
                const userInfo = {
                    name: profile.name || profile.displayName || user.displayName || 'Unknown',
                    displayName: profile.displayName || profile.name || user.displayName || 'Unknown',
                    email: (profile.email || user.email || '').toLowerCase(),
                    avatar: profile.avatar || '🐼',
                    photoURL: user.photoURL || null
                };

                // 1. Sync to users collection (primary)
                await db.collection('users').doc(user.uid).set({
                    ...userInfo,
                    ...premiumData
                }, { merge: true });

                // 2. Also sync premium status to presence collection (backup)
                // This ensures Premium Manager can find all premium users
                await db.collection('presence').doc(user.uid).set({
                    ...premiumData,
                    email: (profile.email || user.email || '').toLowerCase(),
                    name: profile.name || profile.displayName || user.displayName || 'Unknown'
                }, { merge: true });

                console.log('✅ Premium synced to Firebase (users + presence)');

                // Clear any pending premium data since sync succeeded
                localStorage.removeItem('bropro_pending_premium');
            } else {
                console.warn('⚠️ Could not sync premium - user not authenticated after retries');

                // Save as pending premium for next login
                if (profile.premium && profile.premiumPaymentRef) {
                    const pendingData = {
                        orderId: profile.premiumPaymentRef.replace('cashfree_', ''),
                        customerEmail: (profile.email || '').toLowerCase(),
                        customerName: profile.name || 'Unknown',
                        promoCode: profile.premiumPromoCode || null,
                        paymentRef: profile.premiumPaymentRef,
                        createdAt: profile.premiumGrantedAt || new Date().toISOString(),
                        expiryDate: profile.premiumExpiry
                    };
                    localStorage.setItem('bropro_pending_premium', JSON.stringify(pendingData));
                    console.log('💾 Saved pending premium for next login');
                }
            }
        } catch (error) {
            console.error('Error syncing premium:', error);

            // Save as pending premium for next login
            if (profile.premium && retryCount >= maxRetries) {
                const pendingData = {
                    orderId: (profile.premiumPaymentRef || '').replace('cashfree_', ''),
                    customerEmail: (profile.email || '').toLowerCase(),
                    customerName: profile.name || 'Unknown',
                    promoCode: profile.premiumPromoCode || null,
                    paymentRef: profile.premiumPaymentRef,
                    createdAt: profile.premiumGrantedAt || new Date().toISOString(),
                    expiryDate: profile.premiumExpiry
                };
                localStorage.setItem('bropro_pending_premium', JSON.stringify(pendingData));
                console.log('💾 Saved pending premium due to sync error');
            }
        }
    },

    // Check premium status from Firebase and sync to localStorage
    // This handles cases where admin revokes premium
    async checkPremiumFromFirebase() {
        if (!window.firebase || !firebase.firestore || !firebase.auth) return;

        try {
            const user = firebase.auth().currentUser;
            if (!user) return;

            const db = firebase.firestore();
            const userDoc = await db.collection('users').doc(user.uid).get();

            if (!userDoc.exists) return;

            const firebaseData = userDoc.data();

            // Get current localStorage profile
            let profile = null;
            if (window.BroProPlayer) {
                profile = BroProPlayer.load();
            } else {
                try {
                    profile = JSON.parse(localStorage.getItem('supersite-player-profile') || '{}');
                } catch (e) {
                    return;
                }
            }

            // Check if Firebase says premium is revoked but localStorage still has it
            if (profile.premium === true && firebaseData.premium === false) {
                console.log('⚠️ Premium was REVOKED by admin! Updating localStorage...');

                // Revoke premium in localStorage
                profile.premium = false;
                profile.premiumExpiry = null;
                profile.premiumRevokedAt = firebaseData.premiumRevokedAt || new Date().toISOString();
                profile.premiumRevokedBy = firebaseData.premiumRevokedBy || 'admin';

                // Save to localStorage
                if (window.BroProPlayer) {
                    BroProPlayer.save(profile);
                } else {
                    localStorage.setItem('supersite-player-profile', JSON.stringify(profile));
                }

                // Update UI
                this.updatePremiumBadge();

                // Show notification to user
                if (window.BroProLeaderboard) {
                    BroProLeaderboard.showToast('⚠️ Subscription Ended', 'Your premium subscription has been ended by the administrator.');
                }

                console.log('✅ Premium status revoked and localStorage updated');
            }

            // Also check if Firebase has premium but localStorage doesn't (in case of restore)
            if (profile.premium === false && firebaseData.premium === true && firebaseData.premiumExpiry) {
                const expiry = new Date(firebaseData.premiumExpiry);
                if (expiry > new Date()) {
                    console.log('✅ Restoring premium from Firebase...');
                    profile.premium = true;
                    profile.premiumExpiry = firebaseData.premiumExpiry;
                    profile.premiumGrantedAt = firebaseData.premiumGrantedAt;
                    profile.premiumPromoCode = firebaseData.premiumPromoCode;

                    if (window.BroProPlayer) {
                        BroProPlayer.save(profile);
                    } else {
                        localStorage.setItem('supersite-player-profile', JSON.stringify(profile));
                    }

                    this.updatePremiumBadge();
                }
            }

        } catch (error) {
            console.log('Premium sync check skipped:', error.message);
        }
    },

    // Validate promo code against Firebase
    async validatePromoCode(code) {
        if (!code || code.length < 3) {
            return { valid: false, message: 'Please enter a valid promo code' };
        }

        code = code.toUpperCase().trim();

        // Check if user already used this code
        if (window.BroProPlayer) {
            const profile = BroProPlayer.load();
            if (profile.usedPromoCodes && profile.usedPromoCodes.includes(code)) {
                return { valid: false, message: 'You have already used this promo code' };
            }
        }

        // 1. First check hardcoded promo codes (always work)
        const hardcodedCodes = {
            'NPS_PREMIUM': { discount: 100, message: '✅ NPS Premium access granted!' },
            'AMM': { discount: 100, message: '✅ 100% FREE Premium access!' }
        };

        if (hardcodedCodes[code]) {
            return {
                valid: true,
                message: hardcodedCodes[code].message,
                discount: hardcodedCodes[code].discount,
                code: code
            };
        }

        // 2. Check Firebase for promo codes (Primary Source)
        // Note: LocalStorage check removed as we now enforce cloud storage for all users


        // 3. Check Firebase for promo codes
        if (window.firebase && firebase.firestore) {
            try {
                const db = firebase.firestore();
                const promoDoc = await db.collection('promoCodes').doc(code).get();

                if (promoDoc.exists) {
                    const promoData = promoDoc.data();

                    // Check if code is expired
                    if (promoData.validUntil) {
                        const validUntil = promoData.validUntil.toDate ? promoData.validUntil.toDate() : new Date(promoData.validUntil);
                        if (validUntil < new Date()) {
                            return { valid: false, message: 'This promo code has expired' };
                        }
                    }

                    // Check if code has reached max uses
                    if (promoData.maxUses && promoData.currentUses >= promoData.maxUses) {
                        return { valid: false, message: 'This promo code has reached its usage limit' };
                    }

                    // Check if code is active
                    if (promoData.active === false) {
                        return { valid: false, message: 'This promo code is no longer active' };
                    }

                    // Get discount info - support both percentage and rupee-based discounts
                    const discountType = promoData.discountType || 'percent';
                    let discount = 0;
                    let discountRupees = 0;

                    if (discountType === 'free') {
                        // 100% free
                        discount = 100;
                        discountRupees = 0; // Will be calculated based on plan in applyPromoCode
                    } else if (discountType === 'amount') {
                        // Fixed amount discount
                        // Admin stores as discountRupees in Firebase
                        discountRupees = promoData.discountRupees || promoData.discountAmount || 0;
                        // Calculate percentage based on yearly for display, but real calc in applyPromoCode
                        discount = Math.round((discountRupees / 1999) * 100);
                    } else {
                        // Percentage discount
                        discount = promoData.discountPercent || promoData.discount || 25;
                        // Calculate rupees based on yearly for display, but real calc in applyPromoCode
                        discountRupees = Math.round((discount / 100) * 1999);
                    }

                    // Generate appropriate message (will be refined in applyPromoCode)
                    let defaultMsg;
                    if (discount === 100) {
                        defaultMsg = '✅ Promo code applied! You get FREE access!';
                    } else if (discountType === 'amount' && discountRupees > 0) {
                        defaultMsg = `✅ Promo code applied! You save ₹${discountRupees}!`;
                    } else if (discount > 0) {
                        defaultMsg = `✅ Promo code applied! You get ${discount}% OFF!`;
                    } else {
                        defaultMsg = '✅ Promo code applied!';
                    }

                    // Smart fix: if message says "FREE" but discount isn't 100%, use the correct message
                    let message = promoData.message || defaultMsg;
                    if (discount !== 100 && message.toLowerCase().includes('free')) {
                        message = defaultMsg;
                    }

                    return {
                        valid: true,
                        message: message,
                        discount: discount,
                        discountRupees: discountRupees,
                        discountType: discountType, // Include discountType for applyPromoCode
                        appliesTo: promoData.appliesTo || 'yearly',
                        code: code
                    };
                }
            } catch (error) {
                console.error('Error validating promo code from Firebase:', error);
            }
        }

        return { valid: false, message: 'Invalid promo code' };
    },

    // Record promo code usage
    async recordPromoCodeUsage(code) {
        const profile = BroProPlayer.load();

        // Add to user's used codes
        if (!profile.usedPromoCodes) {
            profile.usedPromoCodes = [];
        }
        profile.usedPromoCodes.push(code);
        BroProPlayer.save(profile);

        // Update usage count in Firebase
        if (window.firebase && firebase.firestore) {
            try {
                const db = firebase.firestore();
                await db.collection('promoCodes').doc(code).update({
                    currentUses: firebase.firestore.FieldValue.increment(1)
                });

                // Record which user used this code
                await db.collection('promoCodeUsage').add({
                    code: code,
                    userEmail: profile.email,
                    userName: profile.name,
                    usedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                console.log('✅ Promo code usage recorded');
            } catch (error) {
                console.error('Error recording promo usage:', error);
            }
        }
    },

    // Show premium required message
    showPremiumRequired(activityName = 'this activity') {
        // Check if logged in first
        if (!BroProPlayer.isLoggedIn()) {
            if (window.BroProAuth) {
                BroProAuth.showLoginRequired(`Login to access ${activityName}!`);
            }
            return;
        }

        // Show premium modal
        openPremiumModal(activityName);
    },

    // Fetch featured deal from Firebase (admin-controlled)
    async getFeaturedDeal() {
        if (this.featuredDeal !== null) {
            return this.featuredDeal; // Return cached
        }

        if (!window.firebase || !firebase.firestore) {
            return null;
        }

        try {
            const db = firebase.firestore();
            const snapshot = await db.collection('promoCodes')
                .where('featured', '==', true)
                .where('active', '==', true)
                .limit(1)
                .get();

            if (snapshot.empty) {
                this.featuredDeal = false; // No featured deal, cache it
                return null;
            }

            const doc = snapshot.docs[0];
            const data = doc.data();

            // Check if expired
            if (data.validUntil) {
                const validUntil = data.validUntil.toDate ? data.validUntil.toDate() : new Date(data.validUntil);
                if (validUntil < new Date()) {
                    this.featuredDeal = false;
                    return null;
                }
            }

            // Check max uses
            if (data.maxUses && data.currentUses >= data.maxUses) {
                this.featuredDeal = false;
                return null;
            }

            // Calculate discount based on type
            const discountType = data.discountType || 'percent';
            let discount = 0;
            let discountRupees = 0;

            if (discountType === 'free') {
                discount = 100;
                discountRupees = this.priceYearly;
            } else if (discountType === 'amount') {
                discountRupees = data.discountAmount || 500;
                discount = Math.round((discountRupees / this.priceYearly) * 100);
            } else {
                discount = data.discountPercent || data.discount || 25;
                discountRupees = Math.round((discount / 100) * this.priceYearly);
            }

            this.featuredDeal = {
                code: data.code,
                discount: discount,
                discountRupees: discountRupees,
                discountType: discountType,
                appliesTo: data.appliesTo || 'yearly',
                message: data.message,
                validUntil: data.validUntil
            };

            console.log('⭐ Featured Deal found:', this.featuredDeal.code, '- Save ₹' + discountRupees);
            return this.featuredDeal;

        } catch (error) {
            console.log('Could not fetch featured deal:', error.message);
            return null;
        }
    },

    // Calculate final price based on plan and discounts
    calculateFinalPrice(plan = 'yearly') {
        const basePrice = plan === 'monthly' ? this.priceMonthly : this.priceYearly;

        // If there's a promo discount
        if (this.promoDiscountRupees > 0) {
            return Math.max(0, basePrice - this.promoDiscountRupees);
        }

        if (this.promoDiscount > 0) {
            return Math.max(0, Math.round(basePrice * (1 - this.promoDiscount / 100)));
        }

        return basePrice;
    }
};

// Premium Modal Functions
async function openPremiumModal(activityName = 'premium content') {
    let modal = document.getElementById('premiumModal');

    // If modal doesn't exist, inject it dynamically
    if (!modal) {
        injectPremiumModal();
        modal = document.getElementById('premiumModal');
    }

    if (!modal) {
        console.error('Failed to create premium modal');
        return;
    }

    // Reset state
    BroProPremium.currentPromoCode = null;
    BroProPremium.promoDiscount = 0;
    BroProPremium.promoDiscountRupees = 0;
    BroProPremium.selectedPlan = 'yearly';
    BroProPremium.featuredDeal = null; // Reset cached deal

    const promoInput = document.getElementById('promoCodeInput');
    const promoMessage = document.getElementById('promoMessage');
    if (promoInput) promoInput.value = '';
    if (promoMessage) {
        promoMessage.textContent = '';
        promoMessage.className = 'promo-message';
    }

    // Reset plan selection UI
    const monthlyBtn = document.getElementById('monthlyPlanBtn');
    const yearlyBtn = document.getElementById('yearlyPlanBtn');
    if (monthlyBtn) monthlyBtn.classList.remove('active');
    if (yearlyBtn) yearlyBtn.classList.add('active');

    // Reset price display to default yearly
    updatePremiumPriceDisplay('yearly', 0, 0);

    // Reset button
    const buyBtn = document.getElementById('premiumBuyBtn');
    if (buyBtn) {
        buyBtn.classList.remove('free-access');
        const btnText = buyBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Get Yearly Premium';
    }

    // Hide success state, show purchase UI
    const successState = document.getElementById('premiumSuccessState');
    const premiumHeader = modal.querySelector('.premium-header');
    const priceSection = modal.querySelector('.premium-price-section');
    const featuresGrid = modal.querySelector('.premium-features-grid');
    const promoSection = modal.querySelector('.promo-section');
    const actions = modal.querySelector('.premium-action-buttons');
    const planToggle = document.getElementById('planToggleContainer');
    const dealBanner = document.getElementById('featuredDealBanner');

    if (successState) successState.style.display = 'none';
    if (premiumHeader) premiumHeader.style.display = 'block';
    if (priceSection) priceSection.style.display = 'block';
    if (featuresGrid) featuresGrid.style.display = 'grid';
    if (promoSection) promoSection.style.display = 'block';
    if (actions) actions.style.display = 'flex';
    if (planToggle) planToggle.style.display = 'flex';
    if (dealBanner) dealBanner.style.display = 'none';

    // Check if already premium
    if (BroProPremium.isPremium()) {
        showPremiumSuccessState();
    }

    // Show modal first (fast response)
    modal.classList.add('active');

    // Then fetch featured deal in background and update UI (show banner but don't auto-apply)
    try {
        const featuredDeal = await BroProPremium.getFeaturedDeal();
        if (featuredDeal && featuredDeal.code) {
            // DON'T auto-apply - just show the deal and pre-fill the code
            // User must click "Apply" to activate the discount

            // Show featured deal banner (promotional display only)
            if (dealBanner) {
                dealBanner.style.display = 'flex';
                const codeEl = document.getElementById('featuredDealCode');
                const savingsEl = document.getElementById('featuredDealSavings');
                if (codeEl) codeEl.textContent = featuredDeal.code;
                if (savingsEl) savingsEl.textContent = `Save ₹${featuredDeal.discountRupees.toLocaleString()}!`;
            }

            // Pre-fill the promo code input (but don't apply yet)
            if (promoInput) {
                promoInput.value = featuredDeal.code;
            }

            // Show hint message that user can apply the code
            if (promoMessage) {
                promoMessage.textContent = `💡 Use code "${featuredDeal.code}" to save ₹${featuredDeal.discountRupees.toLocaleString()}!`;
                promoMessage.className = 'promo-message hint';
            }

            console.log('⭐ Featured deal displayed (not auto-applied):', featuredDeal.code);
        }
    } catch (e) {
        console.log('Featured deal check skipped:', e.message);
    }
}

// Dynamically inject Premium Modal HTML - WORLD CLASS DESIGN
function injectPremiumModal() {
    const modalHTML = `
    <div class="premium-modal-overlay" id="premiumModal" onclick="if(event.target === this) closePremiumModal()">
        <div class="premium-modal-container">
            <!-- Animated Background Effects -->
            <div class="premium-bg-effects">
                <div class="premium-glow glow-1"></div>
                <div class="premium-glow glow-2"></div>
                <div class="premium-particles">
                    <span class="particle">✨</span>
                    <span class="particle">💎</span>
                    <span class="particle">⭐</span>
                    <span class="particle">🌟</span>
                    <span class="particle">✨</span>
                </div>
            </div>
            
            <!-- Close Button -->
            <button class="premium-modal-close" onclick="closePremiumModal()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            
            <!-- Premium Header with Crown -->
            <div class="premium-header">
                <div class="premium-crown-container">
                    <div class="crown-glow"></div>
                    <div class="crown-emoji">👑</div>
                    <div class="crown-sparkles">
                        <span>✦</span><span>✦</span><span>✦</span>
                    </div>
                </div>
                <h2 class="premium-main-title">
                    <span class="title-word">Unlock</span>
                    <span class="title-gradient">Premium</span>
                </h2>
                <p class="premium-tagline">Experience learning without limits</p>
            </div>
            
            <!-- Featured Deal Banner (appears when admin sets a deal) -->
            <div class="featured-deal-banner" id="featuredDealBanner" style="display: none;">
                <div class="deal-sparkle">✨</div>
                <div class="deal-content">
                    <span class="deal-label">🔥 Special Offer</span>
                    <span class="deal-code" id="featuredDealCode">SAVE500</span>
                </div>
                <div class="deal-savings" id="featuredDealSavings">Save ₹500!</div>
            </div>
            
            <!-- Plan Selection Toggle -->
            <div class="plan-toggle-container" id="planToggleContainer">
                <button class="plan-toggle-btn" id="monthlyPlanBtn" onclick="selectPremiumPlan('monthly')">
                    <span class="plan-name">Monthly</span>
                    <span class="plan-price">₹199<small>/mo</small></span>
                </button>
                <button class="plan-toggle-btn active" id="yearlyPlanBtn" onclick="selectPremiumPlan('yearly')">
                    <span class="plan-name">Yearly</span>
                    <span class="plan-price" id="yearlyPriceBtn">₹1,999<small>/yr</small></span>
                    <span class="plan-savings-badge">Best Value</span>
                </button>
            </div>
            
            <!-- Price Section with Glassmorphism -->
            <div class="premium-price-section" id="premiumPriceSection">
                <div class="price-card">
                    <div class="price-badge" id="premiumDiscountBadge" style="display: none;">SPECIAL OFFER</div>
                    <div class="price-row">
                        <span class="price-original" id="premiumOriginalPrice" style="display: none;">₹1,999</span>
                        <span class="price-arrow" id="premiumPriceArrow" style="display: none;">→</span>
                        <div class="price-current" id="premiumFinalPrice">
                            <span class="currency">₹</span>
                            <span class="price-amount">1,999</span>
                            <span class="price-period">/year</span>
                        </div>
                    </div>
                    <div class="price-breakdown" id="priceBreakdown">
                        <span>Just ₹5.5/day</span>
                        <span class="dot">•</span>
                        <span>Less than a samosa!</span>
                    </div>
                    <div class="premium-savings" id="premiumSavings" style="display: none;">
                        🎉 You save ₹500!
                    </div>
                </div>
            </div>
            
            <!-- Premium Features Grid -->
            <div class="premium-features-grid">
                <div class="feature-card">
                    <div class="feature-icon-wrap">📚</div>
                    <div class="feature-text">
                        <strong>All Subjects</strong>
                        <span>Math, Science, GK & more</span>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon-wrap">🎮</div>
                    <div class="feature-text">
                        <strong>All Activities</strong>
                        <span>100+ quizzes unlocked</span>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon-wrap">🐼</div>
                    <div class="feature-text">
                        <strong>Premium Avatars</strong>
                        <span>Exclusive characters</span>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon-wrap">💬</div>
                    <div class="feature-text">
                        <strong>Priority Support</strong>
                        <span>Direct teacher access</span>
                    </div>
                </div>
            </div>
            
            <!-- Promo Code Section -->
            <div class="promo-section" id="promoSection">
                <div class="promo-header-label">
                    <span class="promo-icon">🎫</span>
                    <span>Have a promo code?</span>
                </div>
                <div class="promo-input-container">
                    <input type="text" id="promoCodeInput" placeholder="Enter code here..." maxlength="20" autocomplete="off">
                    <button class="promo-apply-btn" onclick="applyPromoCode()">
                        <span class="btn-text">Apply</span>
                        <span class="btn-loader" style="display:none;">⏳</span>
                    </button>
                </div>
                <div class="promo-message-container">
                    <p class="promo-message" id="promoMessage"></p>
                    <button class="promo-clear-btn" id="promoClearBtn" onclick="clearPromoCode()" title="Remove promo code" style="display: none;">✕ Remove</button>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="premium-action-buttons" id="premiumActions">
                <button class="premium-cta-btn" id="premiumBuyBtn" onclick="initiatePremiumPurchase()">
                    <span class="cta-shine"></span>
                    <span class="cta-icon">💎</span>
                    <span class="cta-text btn-text">Get Premium Now</span>
                </button>
                <button class="premium-skip-btn" onclick="closePremiumModal()">
                    Maybe later
                </button>
            </div>
            
            <!-- Success State - Premium Active -->
            <div class="premium-success-container" id="premiumSuccessState" style="display: none;">
                <!-- Bhai Avatar with 3D Effects -->
                <div class="bhai-avatar-container">
                    <div class="bhai-avatar-glow"></div>
                    <img src="/assets/bhai-avatar-premium.jpg" alt="Bhai Avatar" class="bhai-avatar-3d">
                    <div class="bhai-avatar-crown-sparkle">✨</div>
                </div>
                
                <h2 class="success-title">You're Premium!</h2>
                <p class="success-subtitle">Enjoy unlimited access to everything</p>
                
                <div class="premium-status-card">
                    <div class="status-row">
                        <span class="status-label">Status</span>
                        <span class="status-value active">
                            <span class="status-dot"></span>
                            Active
                        </span>
                    </div>
                    <div class="status-row">
                        <span class="status-label">Valid Until</span>
                        <span class="status-value" id="premiumValidUntil">Loading...</span>
                    </div>
                    <div class="status-row">
                        <span class="status-label">Benefits</span>
                        <span class="status-value">All Features Unlocked</span>
                    </div>
                </div>
                
                <button class="success-continue-btn" onclick="closePremiumModal()">
                    <span>Continue Learning</span>
                    <span class="arrow">→</span>
                </button>
            </div>
        </div>
    </div>`;

    // Inject into body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Inject CSS if not already present
    if (!document.getElementById('premiumModalStyles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'premiumModalStyles';
        styleEl.textContent = getPremiumModalCSS();
        document.head.appendChild(styleEl);
    }
}

// Select Monthly or Yearly plan
function selectPremiumPlan(plan) {
    BroProPremium.selectedPlan = plan;

    const monthlyBtn = document.getElementById('monthlyPlanBtn');
    const yearlyBtn = document.getElementById('yearlyPlanBtn');
    const buyBtn = document.getElementById('premiumBuyBtn');
    const messageEl = document.getElementById('promoMessage');

    // Check if current promo applies to this plan
    const appliesTo = BroProPremium.promoAppliesTo || 'yearly';
    const promoApplies = appliesTo === 'both' || appliesTo === plan;
    const hasPromo = BroProPremium.currentPromoCode && BroProPremium.promoDiscount > 0;

    // Get base price for the selected plan
    const basePrice = plan === 'monthly' ? BroProPremium.priceMonthly : BroProPremium.priceYearly;

    if (plan === 'monthly') {
        if (monthlyBtn) monthlyBtn.classList.add('active');
        if (yearlyBtn) yearlyBtn.classList.remove('active');

        if (hasPromo && promoApplies) {
            // Recalculate discount for monthly price using stored discount type
            let discountRupees = 0;
            let discountPercent = BroProPremium.promoDiscount;
            const discountType = BroProPremium.promoDiscountType || 'percent';

            if (discountPercent === 100 || discountType === 'free') {
                discountRupees = basePrice;
                discountPercent = 100;
            } else if (discountType === 'amount' && BroProPremium.promoDiscountRupees > 0) {
                // For amount-based, cap at base price
                discountRupees = Math.min(BroProPremium.promoDiscountRupees, basePrice);
                discountPercent = Math.round((discountRupees / basePrice) * 100);
            } else if (discountPercent > 0) {
                // Percentage discount - recalculate rupees from percentage
                discountRupees = Math.round((discountPercent / 100) * basePrice);
            }

            updatePremiumPriceDisplay('monthly', discountRupees, discountPercent);

            // Update button for discounted price
            if (buyBtn) {
                const btnText = buyBtn.querySelector('.btn-text');
                const finalPrice = basePrice - discountRupees;
                if (discountPercent === 100 || finalPrice <= 0) {
                    buyBtn.classList.add('free-access');
                    if (btnText) btnText.textContent = '🎉 Activate FREE Premium!';
                } else {
                    buyBtn.classList.remove('free-access');
                    if (btnText) btnText.textContent = `Get Premium for ₹${finalPrice.toLocaleString()}`;
                }
            }
        } else {
            // No promo or promo doesn't apply to monthly
            updatePremiumPriceDisplay('monthly', 0, 0);

            if (buyBtn) {
                buyBtn.classList.remove('free-access');
                const btnText = buyBtn.querySelector('.btn-text');
                if (btnText) btnText.textContent = `Get Monthly Premium for ₹${basePrice.toLocaleString()}`;
            }

            // Show message if promo doesn't apply
            if (hasPromo && !promoApplies && messageEl) {
                messageEl.textContent = `⚠️ Your promo code only applies to Yearly Plan`;
                messageEl.className = 'promo-message hint';
            }
        }
    } else {
        // Yearly plan
        if (monthlyBtn) monthlyBtn.classList.remove('active');
        if (yearlyBtn) yearlyBtn.classList.add('active');

        if (hasPromo && promoApplies) {
            // Recalculate discount for yearly price using stored discount type
            let discountRupees = 0;
            let discountPercent = BroProPremium.promoDiscount;
            const discountType = BroProPremium.promoDiscountType || 'percent';

            if (discountPercent === 100 || discountType === 'free') {
                discountRupees = basePrice;
                discountPercent = 100;
            } else if (discountType === 'amount' && BroProPremium.promoDiscountRupees > 0) {
                // For amount-based, cap at base price
                discountRupees = Math.min(BroProPremium.promoDiscountRupees, basePrice);
                discountPercent = Math.round((discountRupees / basePrice) * 100);
            } else if (discountPercent > 0) {
                // Percentage discount - recalculate rupees from percentage
                discountRupees = Math.round((discountPercent / 100) * basePrice);
            }

            updatePremiumPriceDisplay('yearly', discountRupees, discountPercent);

            // Update button for discounted price
            if (buyBtn) {
                const btnText = buyBtn.querySelector('.btn-text');
                const finalPrice = basePrice - discountRupees;
                if (discountPercent === 100 || finalPrice <= 0) {
                    buyBtn.classList.add('free-access');
                    if (btnText) btnText.textContent = '🎉 Activate FREE Premium!';
                } else {
                    buyBtn.classList.remove('free-access');
                    if (btnText) btnText.textContent = `Get Premium for ₹${finalPrice.toLocaleString()}`;
                }
            }
        } else {
            // No promo or promo doesn't apply to yearly
            updatePremiumPriceDisplay('yearly', 0, 0);

            if (buyBtn) {
                buyBtn.classList.remove('free-access');
                const btnText = buyBtn.querySelector('.btn-text');
                if (btnText) btnText.textContent = `Get Yearly Premium for ₹${basePrice.toLocaleString()}`;
            }

            // Show message if promo doesn't apply
            if (hasPromo && !promoApplies && messageEl) {
                messageEl.textContent = `⚠️ Your promo code only applies to Monthly Plan`;
                messageEl.className = 'promo-message hint';
            }
        }
    }
}

// Update price display based on plan and discount
function updatePremiumPriceDisplay(plan, discountRupees = 0, discountPercent = 0) {
    const priceAmount = document.querySelector('#premiumFinalPrice .price-amount');
    const pricePeriod = document.querySelector('#premiumFinalPrice .price-period');
    const origPrice = document.getElementById('premiumOriginalPrice');
    const priceArrow = document.getElementById('premiumPriceArrow');
    const discountBadge = document.getElementById('premiumDiscountBadge');
    const savings = document.getElementById('premiumSavings');
    const breakdown = document.getElementById('priceBreakdown');

    let basePrice = plan === 'monthly' ? BroProPremium.priceMonthly : BroProPremium.priceYearly;
    let finalPrice = basePrice;

    // Calculate discount
    if (discountPercent === 100) {
        finalPrice = 0;
    } else if (discountRupees > 0) {
        finalPrice = Math.max(0, basePrice - discountRupees);
    } else if (discountPercent > 0) {
        finalPrice = Math.round(basePrice * (1 - discountPercent / 100));
    }

    // Update main price
    if (priceAmount) {
        priceAmount.textContent = finalPrice === 0 ? 'FREE' : finalPrice.toLocaleString();
        priceAmount.classList.toggle('free', finalPrice === 0);
    }
    if (pricePeriod) {
        pricePeriod.textContent = plan === 'monthly' ? '/month' : '/year';
    }

    // Show/hide strikethrough original price
    if (discountRupees > 0 || discountPercent > 0) {
        if (origPrice) {
            origPrice.textContent = `₹${basePrice.toLocaleString()}`;
            origPrice.style.display = 'inline';
        }
        if (priceArrow) priceArrow.style.display = 'inline';
        if (discountBadge) {
            discountBadge.textContent = discountPercent === 100 ? '100% FREE!' : `₹${discountRupees} OFF`;
            discountBadge.style.display = 'block';
        }
        if (savings) {
            savings.textContent = discountPercent === 100 ? '🎉 You get FREE Premium!' : `🎉 You save ₹${discountRupees.toLocaleString()}!`;
            savings.style.display = 'block';
        }
    } else {
        if (origPrice) origPrice.style.display = 'none';
        if (priceArrow) priceArrow.style.display = 'none';
        if (discountBadge) discountBadge.style.display = 'none';
        if (savings) savings.style.display = 'none';
    }

    // Update breakdown text - Both plans are less than a samosa per day!
    if (breakdown) {
        const daysInPeriod = plan === 'monthly' ? 30 : 365;
        const dailyPrice = (finalPrice / daysInPeriod).toFixed(1);
        const secondText = plan === 'monthly' ? 'Cancel anytime' : 'Best value!';
        breakdown.innerHTML = `<img src="assets/icons/samosa.jpeg" alt="" style="height: 18px; vertical-align: middle; margin-right: 4px;">Less than a Samosa! ₹${dailyPrice}/day<span class="dot">•</span><span>${secondText}</span>`;
    }
}

// Get Premium Modal CSS - WORLD CLASS DESIGN
function getPremiumModalCSS() {
    return `
    /* ========================================
       PREMIUM MODAL - WORLD CLASS DESIGN
       ======================================== */
    
    /* Featured Deal Banner - Auto-applied deals */
    .featured-deal-banner {
        display: none;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 0.8rem 1rem;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.1));
        border: 2px solid rgba(34, 197, 94, 0.4);
        border-radius: 16px;
        position: relative;
        z-index: 1;
        animation: dealPulse 2s ease-in-out infinite;
    }
    
    @keyframes dealPulse {
        0%, 100% { border-color: rgba(34, 197, 94, 0.4); box-shadow: 0 0 20px rgba(34, 197, 94, 0.1); }
        50% { border-color: rgba(34, 197, 94, 0.7); box-shadow: 0 0 30px rgba(34, 197, 94, 0.3); }
    }
    
    .deal-sparkle {
        font-size: 1.3rem;
        animation: sparkleRotate 2s linear infinite;
    }
    
    @keyframes sparkleRotate {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1); }
    }
    
    .deal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .deal-label {
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.7);
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .deal-code {
        font-size: 1.1rem;
        font-weight: 800;
        color: #22c55e;
        letter-spacing: 2px;
    }
    
    .deal-savings {
        font-size: 0.9rem;
        font-weight: 700;
        color: #ffd700;
        background: rgba(255, 215, 0, 0.1);
        padding: 0.3rem 0.8rem;
        border-radius: 8px;
    }
    
    /* Plan Toggle Container */
    .plan-toggle-container {
        display: flex;
        gap: 0.8rem;
        margin-bottom: 1rem;
        position: relative;
        z-index: 1;
    }
    
    .plan-toggle-btn {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
    }
    
    .plan-toggle-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 215, 0, 0.3);
    }
    
    .plan-toggle-btn.active {
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1));
        border-color: #ffd700;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
    }
    
    .plan-toggle-btn .plan-name {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 0.3rem;
    }
    
    .plan-toggle-btn.active .plan-name {
        color: #ffd700;
    }
    
    .plan-toggle-btn .plan-price {
        font-size: 1.3rem;
        font-weight: 800;
        color: white;
    }
    
    .plan-toggle-btn .plan-price small {
        font-size: 0.7rem;
        font-weight: 400;
        opacity: 0.7;
    }
    
    .plan-savings-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: linear-gradient(135deg, #22c55e, #10b981);
        color: white;
        font-size: 0.6rem;
        font-weight: 700;
        padding: 0.25rem 0.5rem;
        border-radius: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
    }
    
    .premium-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 1rem;
    }
    
    .premium-modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    .premium-modal-container {
        position: relative;
        width: 100%;
        max-width: 440px;
        max-height: 90vh;
        overflow-y: auto;
        background: linear-gradient(145deg, 
            rgba(26, 26, 46, 0.98), 
            rgba(22, 33, 62, 0.98));
        border-radius: 28px;
        padding: 2rem;
        border: 1px solid rgba(255, 215, 0, 0.2);
        box-shadow: 
            0 0 0 1px rgba(255, 215, 0, 0.1),
            0 25px 80px rgba(0, 0, 0, 0.6),
            0 0 100px rgba(255, 215, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        transform: scale(0.9) translateY(30px);
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .premium-modal-overlay.active .premium-modal-container {
        transform: scale(1) translateY(0);
    }
    
    /* Background Effects */
    .premium-bg-effects {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        border-radius: 28px;
        pointer-events: none;
        z-index: 0;
    }
    
    .premium-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
        opacity: 0.5;
    }
    
    .glow-1 {
        width: 200px;
        height: 200px;
        background: linear-gradient(135deg, #ffd700, #ff8c00);
        top: -50px;
        right: -50px;
        animation: glowPulse 4s ease-in-out infinite;
    }
    
    .glow-2 {
        width: 150px;
        height: 150px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        bottom: -30px;
        left: -30px;
        animation: glowPulse 4s ease-in-out infinite 2s;
    }
    
    @keyframes glowPulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.2); }
    }
    
    .premium-particles {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    
    .particle {
        position: absolute;
        font-size: 1rem;
        opacity: 0.4;
        animation: floatParticle 8s ease-in-out infinite;
    }
    
    .particle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
    .particle:nth-child(2) { top: 20%; right: 15%; animation-delay: 1.5s; }
    .particle:nth-child(3) { bottom: 30%; left: 8%; animation-delay: 3s; }
    .particle:nth-child(4) { bottom: 15%; right: 10%; animation-delay: 4.5s; }
    .particle:nth-child(5) { top: 50%; right: 5%; animation-delay: 6s; }
    
    @keyframes floatParticle {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
    }
    
    /* Close Button */
    .premium-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .premium-modal-close:hover {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        transform: rotate(90deg);
    }
    
    /* Premium Header */
    .premium-header {
        text-align: center;
        margin-bottom: 1.5rem;
        position: relative;
        z-index: 1;
    }
    
    .premium-crown-container {
        position: relative;
        display: inline-block;
        margin-bottom: 1rem;
    }
    
    .crown-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.4), transparent 70%);
        border-radius: 50%;
        animation: crownGlow 2s ease-in-out infinite;
    }
    
    @keyframes crownGlow {
        0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
    }
    
    .crown-emoji {
        font-size: 4rem;
        position: relative;
        animation: crownFloat 3s ease-in-out infinite;
        filter: drop-shadow(0 5px 20px rgba(255, 215, 0, 0.5));
    }
    
    @keyframes crownFloat {
        0%, 100% { transform: translateY(0) rotate(-5deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
    }
    
    .crown-sparkles {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    
    .crown-sparkles span {
        position: absolute;
        font-size: 0.8rem;
        color: #ffd700;
        animation: sparkle 2s ease-in-out infinite;
    }
    
    .crown-sparkles span:nth-child(1) { top: 0; left: 20%; animation-delay: 0s; }
    .crown-sparkles span:nth-child(2) { top: 10%; right: 15%; animation-delay: 0.7s; }
    .crown-sparkles span:nth-child(3) { bottom: 20%; right: 25%; animation-delay: 1.4s; }
    
    @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
    }
    
    .premium-main-title {
        font-size: 2rem;
        font-weight: 800;
        margin: 0.5rem 0;
        line-height: 1.2;
    }
    
    .title-word {
        color: #ffffff;
        display: block;
        font-size: 1.1rem;
        font-weight: 500;
        letter-spacing: 2px;
        text-transform: uppercase;
        opacity: 0.8;
    }
    
    .title-gradient {
        background: linear-gradient(135deg, #ffd700 0%, #ff8c00 50%, #ffd700 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 3s linear infinite;
    }
    
    @keyframes shimmer {
        0% { background-position: 0% center; }
        100% { background-position: 200% center; }
    }
    
    .premium-tagline {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1rem;
        margin: 0;
    }
    
    /* Price Section */
    .premium-price-section {
        position: relative;
        z-index: 1;
        margin-bottom: 1.5rem;
    }
    
    .price-card {
        background: linear-gradient(135deg, 
            rgba(255, 215, 0, 0.1), 
            rgba(255, 140, 0, 0.05));
        border: 1px solid rgba(255, 215, 0, 0.2);
        border-radius: 20px;
        padding: 1.5rem;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    
    .price-badge {
        position: absolute;
        top: 12px;
        right: -30px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.3rem 2rem;
        transform: rotate(45deg);
        box-shadow: 0 2px 10px rgba(239, 68, 68, 0.4);
    }
    
    .price-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .price-original {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.4);
        text-decoration: line-through;
    }
    
    .price-original.show-strikethrough {
        color: rgba(255, 255, 255, 0.6);
    }
    
    .price-arrow {
        color: #22c55e;
        font-size: 1.2rem;
    }
    
    .price-current {
        display: flex;
        align-items: baseline;
    }
    
    .currency {
        font-size: 1.5rem;
        font-weight: 700;
        color: #22c55e;
    }
    
    .price-amount {
        font-size: 3rem;
        font-weight: 800;
        color: #22c55e;
        line-height: 1;
    }
    
    .price-amount.free {
        background: linear-gradient(135deg, #22c55e, #10b981);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .price-period {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.5);
        margin-left: 4px;
    }
    
    .price-breakdown {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .dot {
        color: rgba(255, 255, 255, 0.3);
    }
    
    .premium-savings {
        margin-top: 0.75rem;
        font-size: 0.95rem;
        color: #22c55e;
        font-weight: 600;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    /* Features Grid */
    .premium-features-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        position: relative;
        z-index: 1;
    }
    
    .feature-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transition: all 0.3s ease;
    }
    
    .feature-card:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 215, 0, 0.2);
        transform: translateY(-2px);
    }
    
    .feature-icon-wrap {
        font-size: 1.5rem;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .feature-text {
        display: flex;
        flex-direction: column;
    }
    
    .feature-text strong {
        font-size: 0.85rem;
        color: #ffffff;
        font-weight: 600;
    }
    
    .feature-text span {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.5);
    }
    
    /* Promo Section */
    .promo-section {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.25rem;
        margin-bottom: 1.5rem;
        position: relative;
        z-index: 1;
    }
    
    .promo-header-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .promo-icon {
        font-size: 1.1rem;
    }
    
    .promo-input-container {
        display: flex;
        gap: 0.5rem;
    }
    
    .promo-input-container input {
        flex: 1;
        padding: 0.9rem 1rem;
        background: rgba(0, 0, 0, 0.3);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        font-size: 1rem;
        color: #ffffff;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease;
    }
    
    .promo-input-container input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
    }
    
    .promo-input-container input::placeholder {
        color: rgba(255, 255, 255, 0.3);
        text-transform: none;
        letter-spacing: normal;
    }
    
    .promo-apply-btn {
        padding: 0.9rem 1.5rem;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border: none;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }
    
    .promo-apply-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }
    
    .promo-apply-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
    
    .promo-message-container {
        min-height: 1.5rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
    }
    
    .promo-message {
        font-size: 0.85rem;
        margin: 0;
        transition: all 0.3s ease;
    }
    
    .promo-message.success { color: #22c55e; }
    .promo-message.error { color: #ef4444; }
    .promo-message.loading { color: rgba(255, 255, 255, 0.6); }
    .promo-message.hint { color: #fbbf24; font-weight: 500; }
    
    /* Promo Clear Button - Inline Premium Design */
    .promo-clear-btn {
        display: none;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        padding: 0.4rem 0.8rem;
        background: linear-gradient(135deg, #ef4444, #b91c1c);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        color: white;
        font-size: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        white-space: nowrap;
    }
    
    .promo-clear-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        background: linear-gradient(135deg, #f87171, #dc2626);
    }
    
    .promo-clear-btn:active {
        transform: translateY(0);
    }
    
    /* Action Buttons */
    .premium-action-buttons {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        position: relative;
        z-index: 1;
    }
    
    .premium-cta-btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 1.1rem 1.5rem;
        background: linear-gradient(135deg, #ffd700, #ff8c00);
        border: none;
        border-radius: 16px;
        color: #000000;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 25px rgba(255, 215, 0, 0.4);
    }
    
    .premium-cta-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 35px rgba(255, 215, 0, 0.5);
    }
    
    .premium-cta-btn.free-access {
        background: linear-gradient(135deg, #22c55e, #10b981);
        color: white;
        box-shadow: 0 4px 25px rgba(34, 197, 94, 0.4);
    }
    
    .cta-shine {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: ctaShine 3s ease-in-out infinite;
    }
    
    @keyframes ctaShine {
        0% { left: -100%; }
        50%, 100% { left: 100%; }
    }
    
    .cta-icon { font-size: 1.3rem; }
    
    .premium-skip-btn {
        padding: 0.9rem;
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.95rem;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .premium-skip-btn:hover {
        color: rgba(255, 255, 255, 0.8);
    }
    
    /* Success State */
    .premium-success-container {
        text-align: center;
        padding: 1rem 0;
        position: relative;
        z-index: 1;
    }
    
    .success-badge {
        position: relative;
        display: inline-block;
        margin-bottom: 1.5rem;
    }
    
    .badge-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        height: 120px;
        background: radial-gradient(circle, rgba(34, 197, 94, 0.4), transparent 70%);
        border-radius: 50%;
        animation: badgeGlow 2s ease-in-out infinite;
    }
    
    @keyframes badgeGlow {
        0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
    }
    
    .badge-icon {
        font-size: 4.5rem;
        position: relative;
        animation: badgeBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    @keyframes badgeBounce {
        0% { transform: scale(0); }
        60% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .badge-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        border: 3px solid rgba(34, 197, 94, 0.3);
        border-radius: 50%;
        animation: ringExpand 2s ease-out infinite;
    }
    
    @keyframes ringExpand {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
    }
    
    .success-title {
        font-size: 1.8rem;
        font-weight: 800;
        color: #22c55e;
        margin: 0 0 0.5rem;
    }
    
    .success-subtitle {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1rem;
        margin: 0 0 1.5rem;
    }
    
    /* Premium Status Card */
    .premium-status-card {
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.2);
        border-radius: 16px;
        padding: 1.25rem;
        margin-bottom: 1.5rem;
    }
    
    .status-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.6rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .status-row:last-child {
        border-bottom: none;
    }
    
    .status-label {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
    }
    
    .status-value {
        color: #ffffff;
        font-weight: 600;
        font-size: 0.9rem;
    }
    
    .status-value.active {
        color: #22c55e;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .status-dot {
        width: 8px;
        height: 8px;
        background: #22c55e;
        border-radius: 50%;
        animation: statusPulse 2s ease-in-out infinite;
    }
    
    @keyframes statusPulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
        50% { opacity: 0.8; box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
    }
    
    .success-continue-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        background: linear-gradient(135deg, #22c55e, #10b981);
        border: none;
        border-radius: 14px;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .success-continue-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
    }
    
    .success-continue-btn .arrow {
        transition: transform 0.3s ease;
    }
    
    .success-continue-btn:hover .arrow {
        transform: translateX(5px);
    }
    
    /* Responsive */
    @media (max-width: 480px) {
        .premium-modal-container {
            padding: 1.5rem;
            border-radius: 20px;
        }
        
        .premium-main-title {
            font-size: 1.6rem;
        }
        
        .crown-emoji {
            font-size: 3rem;
        }
        
        .price-amount {
            font-size: 2.5rem;
        }
        
        .premium-features-grid {
            grid-template-columns: 1fr;
        }
    }
    
    /* Bhai Avatar 3D Styles */
    .bhai-avatar-container {
        position: relative;
        width: 140px;
        height: 140px;
        margin: 1rem auto;
        perspective: 1000px;
    }

    .bhai-avatar-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 140, 0, 0.2) 40%, transparent 70%);
        filter: blur(15px);
        animation: bhaiGlowPulse 2s ease-in-out infinite;
        z-index: 0;
    }

    @keyframes bhaiGlowPulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 1;
        }
    }

    .bhai-avatar-3d {
        position: relative;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center top;
        border: 4px solid transparent;
        background: linear-gradient(145deg, #1a1a2e, #16213e) padding-box,
                    linear-gradient(145deg, #ffd700, #ff8c00, #ffd700) border-box;
        box-shadow: 
            0 0 0 3px rgba(255, 215, 0, 0.3),
            0 10px 30px rgba(0, 0, 0, 0.5),
            0 5px 15px rgba(255, 215, 0, 0.2),
            inset 0 -3px 10px rgba(0, 0, 0, 0.3);
        animation: bhaiFloat 3s ease-in-out infinite, bhaiEntrance 0.8s ease-out;
        z-index: 1;
        transform-style: preserve-3d;
    }

    @keyframes bhaiFloat {
        0%, 100% {
            transform: translateY(0) rotateX(0deg) rotateY(0deg);
        }
        25% {
            transform: translateY(-8px) rotateX(2deg) rotateY(-2deg);
        }
        50% {
            transform: translateY(-12px) rotateX(0deg) rotateY(0deg);
        }
        75% {
            transform: translateY(-8px) rotateX(-2deg) rotateY(2deg);
        }
    }

    @keyframes bhaiEntrance {
        0% {
            opacity: 0;
            transform: scale(0.5) translateY(30px) rotateY(-180deg);
        }
        50% {
            transform: scale(1.1) translateY(-10px) rotateY(0deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotateY(0deg);
        }
    }

    .bhai-avatar-crown-sparkle {
        position: absolute;
        top: -5px;
        right: 5px;
        font-size: 1.5rem;
        animation: sparkleFloat 1.5s ease-in-out infinite;
        filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.8));
        z-index: 2;
    }

    @keyframes sparkleFloat {
        0%, 100% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-5px) scale(1.2) rotate(10deg);
            opacity: 0.8;
        }
    }
    `;
}

function closePremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) modal.classList.remove('active');
}

function showPremiumSuccessState() {
    // Get the premium modal first
    const modal = document.getElementById('premiumModal');

    if (!modal) {
        console.error('Premium modal not found');
        return;
    }

    // Hide ALL purchase UI elements - support both ultra and regular class names
    const elementsToHide = [
        // Ultra design (index.html)
        '.premium-header-ultra',
        '.premium-price-card',
        '.premium-features-ultra',
        '.promo-code-section-ultra',
        '.premium-actions-ultra',
        '.trust-badges',
        '.premium-particles',
        // Regular design (injected modal)
        '.premium-header',
        '.premium-price-section',
        '.premium-features-grid',
        '.promo-section',
        '.premium-action-buttons',
        '.premium-bg-effects'
    ];

    elementsToHide.forEach(selector => {
        const el = modal.querySelector(selector);
        if (el) el.style.display = 'none';
    });

    // Show success state - support both class names
    const successState = modal.querySelector('#premiumSuccessState') ||
        modal.querySelector('.premium-success-state') ||
        modal.querySelector('.premium-success-container');

    if (successState) {
        successState.style.display = 'block';
        successState.style.textAlign = 'center';
        successState.style.padding = '2rem';
    } else {
        console.error('Premium success state element not found');
    }

    // Show expiry date with nice formatting
    const expiry = BroProPremium.getExpiryDate();
    const validUntilEl = modal.querySelector('#premiumValidUntil') ||
        modal.querySelector('.premium-valid-until');

    if (expiry && validUntilEl) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        validUntilEl.textContent = `Valid until: ${expiry.toLocaleDateString('en-IN', options)}`;
        validUntilEl.style.display = 'block';
    }

    console.log('✅ Premium success state shown');
}

async function applyPromoCode() {
    const input = document.getElementById('promoCodeInput');
    const messageEl = document.getElementById('promoMessage');
    // Support both old and new button class names
    const applyBtn = document.querySelector('.promo-apply-btn-ultra') || document.querySelector('.promo-apply-btn');

    const code = input.value.trim().toUpperCase();

    if (!code) {
        messageEl.textContent = 'Please enter a promo code';
        messageEl.className = 'promo-message error';
        return;
    }

    // Show loading
    if (applyBtn) applyBtn.disabled = true;
    messageEl.textContent = 'Validating...';
    messageEl.className = 'promo-message loading';

    // Validate code
    const result = await BroProPremium.validatePromoCode(code);

    if (applyBtn) applyBtn.disabled = false;

    if (result.valid) {
        // Get currently selected plan
        const selectedPlan = BroProPremium.selectedPlan || 'yearly';
        const appliesTo = result.appliesTo || 'yearly';

        // Check if promo code applies to the selected plan
        const promoApplies = appliesTo === 'both' || appliesTo === selectedPlan;

        if (!promoApplies) {
            // Promo code doesn't apply to this plan
            const planLabel = appliesTo === 'monthly' ? 'Monthly Plan' : 'Yearly Plan';
            messageEl.textContent = `❌ This code only applies to ${planLabel}`;
            messageEl.className = 'promo-message error';

            // Clear any stored promo data
            BroProPremium.currentPromoCode = null;
            BroProPremium.promoDiscount = 0;
            BroProPremium.promoDiscountRupees = 0;
            BroProPremium.promoAppliesTo = null;

            if (window.BroProSounds) {
                BroProSounds.play('wrong');
            }
            return;
        }

        // Store promo data
        BroProPremium.currentPromoCode = result.code;
        BroProPremium.promoAppliesTo = appliesTo;

        // Calculate discount based on selected plan's price
        const basePrice = selectedPlan === 'monthly' ? BroProPremium.priceMonthly : BroProPremium.priceYearly;
        let discountRupees = 0;
        let discountPercent = 0;

        // Use discountType to determine correct calculation
        const discountType = result.discountType || 'percent';

        if (result.discount === 100 || discountType === 'free') {
            // 100% FREE - full price as discount
            discountRupees = basePrice;
            discountPercent = 100;
        } else if (discountType === 'amount' && result.discountRupees > 0) {
            // Fixed amount discount - use the specified rupee amount (capped at base price)
            discountRupees = Math.min(result.discountRupees, basePrice);
            discountPercent = Math.round((discountRupees / basePrice) * 100);
        } else if (result.discount > 0) {
            // Percentage discount - calculate from base price of selected plan
            discountPercent = result.discount;
            discountRupees = Math.round((discountPercent / 100) * basePrice);
        }

        BroProPremium.promoDiscount = discountPercent;
        BroProPremium.promoDiscountRupees = discountRupees;
        BroProPremium.promoDiscountType = discountType; // Store for recalculation on plan switch
        BroProPremium.promoMessage = result.message;

        // Update price display
        updatePremiumPriceDisplay(selectedPlan, discountRupees, discountPercent);

        // Update button text
        const buyBtn = document.getElementById('premiumBuyBtn');
        const btnTextEl = buyBtn ? buyBtn.querySelector('.btn-text') : null;
        const finalPrice = basePrice - discountRupees;

        if (discountPercent === 100 || finalPrice <= 0) {
            if (buyBtn) buyBtn.classList.add('free-access');
            if (btnTextEl) btnTextEl.textContent = '🎉 Activate FREE Premium!';
        } else if (discountRupees > 0) {
            if (buyBtn) buyBtn.classList.remove('free-access');
            if (btnTextEl) btnTextEl.textContent = `Get Premium for ₹${finalPrice.toLocaleString()}`;
        }

        // Show success message
        messageEl.textContent = `✅ Code applied! You save ₹${discountRupees.toLocaleString()}`;
        messageEl.className = 'promo-message success';

        // Show clear button
        showPromoClearButton(true);

        if (window.BroProSounds) {
            BroProSounds.play('purchase');
        }
    } else {
        messageEl.textContent = result.message;
        messageEl.className = 'promo-message error';

        if (window.BroProSounds) {
            BroProSounds.play('wrong');
        }
    }
}

// Clear/Remove promo code functionality
function clearPromoCode() {
    const input = document.getElementById('promoCodeInput');
    const messageEl = document.getElementById('promoMessage');
    const selectedPlan = BroProPremium.selectedPlan || 'yearly';

    // Clear input
    if (input) input.value = '';

    // Clear stored promo data
    BroProPremium.currentPromoCode = null;
    BroProPremium.promoDiscount = 0;
    BroProPremium.promoDiscountRupees = 0;
    BroProPremium.promoDiscountType = null;
    BroProPremium.promoAppliesTo = null;
    BroProPremium.promoMessage = null;

    // Reset price display to original
    updatePremiumPriceDisplay(selectedPlan, 0, 0);

    // Reset buy button
    const buyBtn = document.getElementById('premiumBuyBtn');
    const btnTextEl = buyBtn ? buyBtn.querySelector('.btn-text') : null;
    const basePrice = selectedPlan === 'monthly' ? BroProPremium.priceMonthly : BroProPremium.priceYearly;

    if (buyBtn) buyBtn.classList.remove('free-access');
    if (btnTextEl) btnTextEl.textContent = `Get Premium for ₹${basePrice.toLocaleString()}`;

    // Clear message
    if (messageEl) {
        messageEl.textContent = '🎫 Promo code removed';
        messageEl.className = 'promo-message hint';

        // Clear the message after 2 seconds
        setTimeout(() => {
            if (messageEl) messageEl.textContent = '';
        }, 2000);
    }

    // Hide clear button
    showPromoClearButton(false);

    console.log('🗑️ Promo code cleared');
}

// Show/hide clear button
function showPromoClearButton(show) {
    const clearBtn = document.getElementById('promoClearBtn');
    if (clearBtn) {
        clearBtn.style.display = show ? 'inline-flex' : 'none';
    }
}

async function initiatePremiumPurchase() {
    // Get current plan and check if promo applies
    const selectedPlan = BroProPremium.selectedPlan || 'yearly';
    const appliesTo = BroProPremium.promoAppliesTo || 'yearly';
    const promoApplies = appliesTo === 'both' || appliesTo === selectedPlan;

    // Check if promo code gives 100% discount AND applies to selected plan
    if (BroProPremium.promoDiscount === 100 && BroProPremium.currentPromoCode && promoApplies) {
        try {
            // Try to record usage (don't let errors block activation)
            try {
                await BroProPremium.recordPromoCodeUsage(BroProPremium.currentPromoCode);
            } catch (usageError) {
                console.warn('Could not record promo usage (continuing anyway):', usageError);
            }

            // Grant premium access
            BroProPremium.grantPremium(BroProPremium.currentPromoCode);
            console.log('✅ Premium granted with code:', BroProPremium.currentPromoCode);

            // Show success - THIS IS THE KEY PART
            showPremiumSuccessState();
            console.log('✅ Success state shown');

            // Play sounds and effects
            if (window.BroProSounds) {
                BroProSounds.play('levelup');
            }

            if (window.BroProEffects) {
                BroProEffects.confetti();
            }

            if (window.BroProLeaderboard) {
                const customMessage = BroProPremium.promoMessage || 'You now have full access to all content!';
                BroProLeaderboard.showToast('🎉 Premium Activated!', customMessage);
            }
        } catch (error) {
            console.error('Error during premium activation:', error);
            // Still try to show success state even if something failed
            showPremiumSuccessState();
            alert('🎉 Premium Activated! (Some features may need a page refresh)');
        }
        return; // Exit here for free activation
    } else {
        // Paid purchase - Open PayU Checkout

        // 1. Get user info
        let userEmail = '';
        let userName = '';
        let userPhone = '9999999999'; // Default or prompt user

        if (window.BroProPlayer) {
            const profile = BroProPlayer.load();
            userEmail = profile.email || '';
            userName = profile.name || profile.displayName || '';
        }

        if (window.FirebaseAuth && FirebaseAuth.currentUser) {
            userEmail = FirebaseAuth.currentUser.email || userEmail;
            userName = FirebaseAuth.currentUser.displayName || userName;
        }

        // Validate details
        if (!userEmail || !userName) {
            // If missing, prompt user or use defaults (PayU requires them)
            // Ideally we should open a form, but for now let's alert or use defaults
            if (!userEmail) userEmail = prompt("Please enter your email for the receipt:") || 'guest@example.com';
            if (!userName) userName = prompt("Please enter your name:") || 'Guest User';
        }

        // 2. Calculate final amount with plan and promo discount
        // Use selectedPlan, appliesTo, promoApplies from function top
        let basePrice = selectedPlan === 'monthly' ? BroProPremium.priceMonthly : BroProPremium.priceYearly;
        let finalAmount = basePrice;

        // Apply discount only if promo applies to selected plan
        if (promoApplies && BroProPremium.currentPromoCode) {
            if (BroProPremium.promoDiscountRupees > 0) {
                // Amount-based discount - cap at base price
                finalAmount = Math.max(0, basePrice - Math.min(BroProPremium.promoDiscountRupees, basePrice));
            } else if (BroProPremium.promoDiscount > 0 && BroProPremium.promoDiscount < 100) {
                // Percentage-based discount
                finalAmount = Math.round(basePrice * (1 - BroProPremium.promoDiscount / 100));
            }
        }

        console.log('💰 Payment Amount:', {
            plan: selectedPlan,
            basePrice: basePrice,
            appliesTo: appliesTo,
            promoApplies: promoApplies,
            discountRupees: BroProPremium.promoDiscountRupees,
            discountPercent: BroProPremium.promoDiscount + '%',
            finalAmount: finalAmount,
            promoCode: BroProPremium.currentPromoCode
        });

        // 3. Initiate Cashfree Payment
        if (window.PayU) {
            PayU.initiatePayment({
                name: userName,
                email: userEmail,
                phone: userPhone,
                amount: finalAmount,
                promoCode: BroProPremium.currentPromoCode || null,
                plan: selectedPlan
            });
        } else {
            console.error('PayU script not loaded');
            alert('Payment system is initializing. Please try again in a moment.');
        }
    }
}

// Razorpay Configuration
const RAZORPAY_CONFIG = {
    key: 'rzp_test_RtpA4rjvuvbyfz', // Test mode key
    currency: 'INR',
    name: 'BroPro Premium',
    description: 'Annual Premium Subscription - Unlimited Access',
    image: 'https://nps93.vercel.app/assets/logo.png', // School logo
    prefill: {},
    theme: {
        color: '#ffd700'
    }
};

function openRazorpayCheckout() {
    // Check if Razorpay is loaded, if not load it dynamically
    if (typeof Razorpay === 'undefined') {
        console.log('Razorpay not loaded, loading dynamically...');

        // Show loading message
        const buyBtn = document.getElementById('premiumBuyBtn');
        if (buyBtn) {
            buyBtn.disabled = true;
            buyBtn.innerHTML = '<span class="cta-icon">⏳</span><span class="btn-text">Loading Payment...</span>';
        }

        // Load Razorpay script dynamically
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = function () {
            console.log('Razorpay SDK loaded successfully');
            // Reset button
            if (buyBtn) {
                buyBtn.disabled = false;
                buyBtn.innerHTML = '<span class="cta-shine"></span><span class="cta-icon">💎</span><span class="btn-text">Get Premium Now</span>';
            }
            // Now open checkout
            openRazorpayCheckoutReal();
        };
        script.onerror = function () {
            console.error('Failed to load Razorpay SDK');
            alert('Unable to load payment gateway. Please check your internet connection and try again.');
            if (buyBtn) {
                buyBtn.disabled = false;
                buyBtn.innerHTML = '<span class="cta-shine"></span><span class="cta-icon">💎</span><span class="btn-text">Get Premium Now</span>';
            }
        };
        document.head.appendChild(script);
        return;
    }

    // Razorpay is already loaded
    openRazorpayCheckoutReal();
}

function openRazorpayCheckoutReal() {

    // Get user info for prefill
    let userEmail = '';
    let userName = '';

    if (window.BroProPlayer) {
        const profile = BroProPlayer.load();
        userEmail = profile.email || '';
        userName = profile.name || profile.displayName || '';
    }

    if (window.FirebaseAuth && FirebaseAuth.currentUser) {
        userEmail = FirebaseAuth.currentUser.email || userEmail;
        userName = FirebaseAuth.currentUser.displayName || userName;
    }

    // Calculate final amount (apply promo discount)
    let finalAmount = BroProPremium.price; // ₹999
    if (BroProPremium.promoDiscount > 0 && BroProPremium.promoDiscount < 100) {
        finalAmount = Math.round(finalAmount * (1 - BroProPremium.promoDiscount / 100));
    }

    // Create Razorpay options
    const options = {
        key: RAZORPAY_CONFIG.key,
        amount: finalAmount * 100, // Razorpay expects paise (₹999 = 99900 paise)
        currency: RAZORPAY_CONFIG.currency,
        name: RAZORPAY_CONFIG.name,
        description: RAZORPAY_CONFIG.description,
        image: RAZORPAY_CONFIG.image,
        prefill: {
            email: userEmail,
            name: userName
        },
        theme: RAZORPAY_CONFIG.theme,
        handler: function (response) {
            // Payment successful
            handlePaymentSuccess(response);
        },
        modal: {
            ondismiss: function () {
                console.log('Payment popup closed');
            },
            escape: true,
            animation: true
        },
        notes: {
            promoCode: BroProPremium.currentPromoCode || 'none',
            originalPrice: BroProPremium.price,
            discount: BroProPremium.promoDiscount
        }
    };

    // Open Razorpay checkout
    try {
        const rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response) {
            handlePaymentFailure(response.error);
        });
        rzp.open();
    } catch (error) {
        console.error('Razorpay error:', error);
        alert('Unable to open payment gateway. Please try again.');
    }
}

async function handlePaymentSuccess(response) {
    console.log('✅ Payment successful!', response);

    // Update button to show processing
    const buyBtn = document.getElementById('premiumBuyBtn');
    if (buyBtn) {
        buyBtn.disabled = true;
        buyBtn.innerHTML = '<span class="cta-icon">⏳</span><span class="btn-text">Activating Premium...</span>';
    }

    try {
        // Record the payment in Firebase (for reference)
        if (window.firebase && firebase.firestore && window.FirebaseAuth && FirebaseAuth.currentUser) {
            const db = firebase.firestore();
            await db.collection('payments').add({
                userId: FirebaseAuth.currentUser.uid,
                userEmail: FirebaseAuth.currentUser.email,
                razorpayPaymentId: response.razorpay_payment_id,
                amount: BroProPremium.price,
                discount: BroProPremium.promoDiscount,
                promoCode: BroProPremium.currentPromoCode || null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'success'
            });
            console.log('✅ Payment recorded in Firebase');
        }

        // Grant premium access
        BroProPremium.grantPremium(`paid_${response.razorpay_payment_id}`);

        // Show success state in modal
        showPremiumSuccessState();

        // Play success sound
        if (window.BroProSounds) {
            BroProSounds.play('levelup');
        }

        // Show confetti
        if (window.BroProEffects) {
            BroProEffects.confetti();
        }

        // Show toast
        if (window.BroProLeaderboard) {
            BroProLeaderboard.showToast('🎉 Welcome to Premium!', 'Payment successful! Enjoy unlimited access!');
        }

    } catch (error) {
        console.error('Error processing payment:', error);
        // Still grant premium even if Firebase fails
        BroProPremium.grantPremium(`paid_${response.razorpay_payment_id}`);
        showPremiumSuccessState();
    }
}

function handlePaymentFailure(error) {
    console.error('❌ Payment failed:', error);

    let message = 'Payment failed. Please try again.';
    if (error.description) {
        message = error.description;
    }

    // Show error to user
    if (window.BroProLeaderboard) {
        BroProLeaderboard.showToast('❌ Payment Failed', message);
    } else {
        alert(message);
    }

    // Reset button
    const buyBtn = document.getElementById('premiumBuyBtn');
    if (buyBtn) {
        buyBtn.disabled = false;
        buyBtn.innerHTML = '<span class="cta-shine"></span><span class="cta-icon">💎</span><span class="btn-text">Get Premium Now</span>';
    }
}

// Make premium functions globally available
window.BroProPremium = BroProPremium;
window.openPremiumModal = openPremiumModal;
window.closePremiumModal = closePremiumModal;
window.applyPromoCode = applyPromoCode;
window.clearPromoCode = clearPromoCode;
window.showPromoClearButton = showPromoClearButton;
window.initiatePremiumPurchase = initiatePremiumPurchase;
window.selectPremiumPlan = selectPremiumPlan;
window.updatePremiumPriceDisplay = updatePremiumPriceDisplay;

// ============================================
// PSYCHOLOGY FEATURES INTEGRATION
// ============================================

// Toggle Roast Mode (Sarcastic BhAI)
function toggleRoastMode() {
    if (!window.BroProRoastMode) {
        console.warn('BroProRoastMode not loaded');
        return;
    }

    const isEnabled = BroProRoastMode.toggle();
    const toggle = document.getElementById('roastModeToggle');
    const icon = document.getElementById('roastIcon');
    const label = document.getElementById('roastLabel');

    if (toggle) {
        if (isEnabled) {
            toggle.classList.add('active');
            icon.textContent = '😈';
            label.textContent = 'Roast';

            // Show fun notification
            showRoastModeNotification(true);
        } else {
            toggle.classList.remove('active');
            icon.textContent = '😇';
            label.textContent = 'Nice';

            showRoastModeNotification(false);
        }
    }

    // Play sound
    if (window.BroProSounds) {
        BroProSounds.play('click');
    }
}

// Show roast mode notification
function showRoastModeNotification(enabled) {
    // Remove existing
    const existing = document.querySelector('.roast-mode-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'roast-mode-notification';
    notification.innerHTML = enabled
        ? `<span>😈</span> <span>Sarcastic Mode ON - BhAI will roast you!</span>`
        : `<span>😇</span> <span>Nice Mode ON - BhAI is being polite</span>`;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.75rem 1.5rem;
        background: ${enabled ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #22c55e, #16a34a)'};
        border-radius: 20px;
        color: white;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 100001;
        animation: slideDownBounce 0.5s ease;
        box-shadow: 0 5px 25px ${enabled ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'};
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideDownBounce 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize Roast Mode UI state on load
function initRoastModeUI() {
    if (!window.BroProRoastMode) return;

    const toggle = document.getElementById('roastModeToggle');
    const icon = document.getElementById('roastIcon');
    const label = document.getElementById('roastLabel');

    if (toggle && BroProRoastMode.isEnabled()) {
        toggle.classList.add('active');
        if (icon) icon.textContent = '😈';
        if (label) label.textContent = 'Roast';
    }
}

// Trigger Mystery Box after quiz completion
function triggerMysteryBox(source = 'quiz') {
    if (window.BroProMysteryBox) {
        // 30% chance to show mystery box after quiz
        if (Math.random() < 0.3) {
            setTimeout(() => {
                BroProMysteryBox.showMysteryBox(source);
            }, 1500); // Delay to let quiz results show first
        }
    }
}

// Record correct answer for streak healing
function recordCorrectAnswerForHealing() {
    if (window.BroProStreak) {
        const healed = BroProStreak.recordCorrectAnswer();
        if (healed) {
            console.log('🎉 Avatar healed!');
        }
    }
}

// Show streak celebration
function showStreakCelebration(streak) {
    const existing = document.querySelector('.streak-celebration');
    if (existing) existing.remove();

    const celebration = document.createElement('div');
    celebration.className = 'streak-celebration';
    celebration.innerHTML = window.BroProStreak
        ? BroProStreak.getStreakMessage(streak)
        : `🔥 ${streak} day streak!`;

    document.body.appendChild(celebration);

    if (window.BroProSounds) {
        BroProSounds.play('achievement');
    }

    setTimeout(() => {
        celebration.style.animation = 'slideDownBounce 0.3s ease reverse';
        setTimeout(() => celebration.remove(), 300);
    }, 3000);
}

// Apply avatar state on profile modal open
const originalOpenPlayerProfile = window.openPlayerProfile;
window.openPlayerProfile = function () {
    if (originalOpenPlayerProfile) {
        originalOpenPlayerProfile.apply(this, arguments);
    }

    // Apply streak-based avatar states
    setTimeout(() => {
        if (window.BroProStreak) {
            BroProStreak.applyAvatarState();
        }
    }, 100);
};

// Initialize psychology features on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize roast mode UI
    setTimeout(initRoastModeUI, 500);

    // Check streak on load
    if (window.BroProStreak) {
        const data = BroProStreak.checkStreak();

        // Show streak celebration if streak is active and significant
        if (data.currentStreak > 0 && (data.currentStreak % 3 === 0 || data.currentStreak === 1)) {
            setTimeout(() => {
                showStreakCelebration(data.currentStreak);
            }, 2000);
        }
    }

    // Check premium expiry on load and periodically
    if (window.BroProPremium) {
        // Initial check
        setTimeout(() => {
            BroProPremium.isPremium();
            console.log('🔍 Initial premium status check completed');
        }, 1000);

        // Periodic check every 5 minutes (300000ms)
        setInterval(() => {
            BroProPremium.isPremium();
            console.log('🔄 Periodic premium status check completed');
        }, 300000);
    }
});

// Make functions globally available
window.toggleRoastMode = toggleRoastMode;
window.initRoastModeUI = initRoastModeUI;
window.triggerMysteryBox = triggerMysteryBox;
window.recordCorrectAnswerForHealing = recordCorrectAnswerForHealing;
window.showStreakCelebration = showStreakCelebration;
