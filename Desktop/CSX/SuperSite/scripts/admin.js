/* ============================================
   SUPERSITE - ADMIN SYSTEM
   Complete Admin Management & Messaging
   ============================================ */

const BroProAdmin = {
    ADMIN_EMAIL: 'mohdekhlaqkhan@gmail.com',
    // 🔐 SECURITY: Password removed - admin verification is now done server-side via Firebase ID token
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
    // CHAT PERSONALIZATION SYSTEM
    // Custom sender name per user (admin-configured)
    // ============================================
    customChatName: null, // Custom name set by admin for this user (null = default 'Bhai')

    // Reply system state
    studentReplyTo: null, // { id, text, senderName, isAdmin }
    studentMessages: [], // Store loaded messages for reply lookup

    // ============================================
    // REAL-TIME TYPING INDICATOR STATE
    // ============================================
    _typingTimeout: null,        // Auto-clear timeout (5s inactivity)
    _typingActive: false,        // Whether we've notified Firestore we're typing
    _typingDebounceTimer: null,  // Debounce timer for Firestore writes
    _bhaiTypingListener: null,   // Firestore listener for admin typing state
    _typingStaleCheckInterval: null, // Interval to check for stale typing state
    selectedStudentMessageId: null, // Currently selected message for context menu

    // ============================================
    // 🔐 SECURITY: Get Firebase ID Token for API calls
    // ============================================
    async getAuthToken() {
        try {
            const user = firebase.auth().currentUser;
            if (user) {
                return await user.getIdToken();
            }
        } catch (e) {
            console.warn('Could not get auth token:', e.message);
        }
        return null;
    },

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
            // Mark auth state as resolved — prevents password bypass race condition
            this._authStateReady = true;

            if (user) {
                this.isGuestMode = false;
                this.checkAdminStatus(user);
                // Start listening for unread messages (for students)
                this.startUnreadMessageListener(user);
                // Load walletSpent from Firestore
                this.loadWalletFromFirestore(user);
                // Fetch custom chat name for this user (Chat Personalization)
                this.fetchCustomChatName(user);
                // Listen for admin-pushed effects and glow (VIP)
                this.setupChatEffectsListener(user.uid);
                // Fix: Restore toggle bar if it was showing trial mode for a guest
                // This handles the case where user logs in while chat is open
                setTimeout(() => {
                    this.restoreLoggedInToggleBar();
                }, 500);
            } else {
                this.isAdmin = false;
                this.isGuestMode = true;
                this._personalizationLoaded = true; // No user — no personalization needed
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

    // ============================================
    // CHAT PERSONALIZATION — Fetch & Cache
    // Loads admin-configured custom name for the
    // current user from settings/customChatNames
    // Uses real-time listener for INSTANT updates
    // Supports rich format: { name, emoji, celebration }
    // ============================================
    unsubscribeCustomName: null,
    customChatEmoji: null,        // e.g., '🦁'
    customChatCelebration: null,  // e.g., 'confetti'
    customChatPassword: null,     // optional password set by admin
    customChatSeasonalEffects: false, // whether admin granted seasonal effects
    _chatPasswordVerified: false, // whether password was verified this session
    _personalizationLoaded: false, // true after first Firestore snapshot (prevents password bypass race)
    _authStateReady: false, // true after first onAuthStateChanged fires (prevents auth race)

    // Normalize entry — handles both old string and new object format
    _normalizePersonalization(entry) {
        if (!entry) return null;
        if (typeof entry === 'string') {
            return { name: entry, emoji: '', celebration: 'sparkles', password: '', seasonalEffects: false };
        }
        return {
            name: entry.name || '',
            emoji: entry.emoji || '',
            celebration: entry.celebration || 'sparkles',
            password: entry.password || '',
            seasonalEffects: !!entry.seasonalEffects
        };
    },

    fetchCustomChatName(user) {
        if (this.unsubscribeCustomName) {
            this.unsubscribeCustomName();
            this.unsubscribeCustomName = null;
        }

        if (!user || !user.email || user.email === this.ADMIN_EMAIL) {
            this._personalizationLoaded = true; // No personalization needed — safe to proceed
            return;
        }
        if (!this.db) {
            this._personalizationLoaded = true; // DB unavailable — safe to proceed
            return;
        }

        const userEmail = user.email.toLowerCase();

        // 1. Try localStorage cache first (instant UI on page load)
        const cached = localStorage.getItem('bropro_customChatName');
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                if (parsed.email === userEmail && parsed.name) {
                    this.customChatName = parsed.name;
                    this.customChatEmoji = parsed.emoji || null;
                    this.customChatCelebration = parsed.celebration || null;
                    this.applyCustomChatName();
                }
            } catch (e) { /* ignore */ }
        }

        // 2. Real-time listener for instant updates
        try {
            this.unsubscribeCustomName = this.db.collection('settings').doc('customChatNames')
                .onSnapshot((doc) => {
                    // Mark personalization as loaded (first snapshot arrived)
                    this._personalizationLoaded = true;

                    if (doc.exists) {
                        const data = doc.data();
                        const names = data.names || {};
                        const rawEntry = names[userEmail] || null;
                        const entry = this._normalizePersonalization(rawEntry);

                        const newName = entry ? entry.name : null;
                        const newEmoji = entry ? entry.emoji : null;
                        const newCeleb = entry ? entry.celebration : null;

                        // Always update password and seasonalEffects from Firestore (not cached in localStorage)
                        this.customChatPassword = entry ? entry.password || null : null;
                        this.customChatSeasonalEffects = entry ? !!entry.seasonalEffects : false;

                        // Check if anything changed
                        if (this.customChatName !== newName ||
                            this.customChatEmoji !== newEmoji ||
                            this.customChatCelebration !== newCeleb) {

                            const oldName = this.customChatName;
                            this.customChatName = newName;
                            this.customChatEmoji = newEmoji || null;
                            this.customChatCelebration = newCeleb || null;

                            // Cache in localStorage
                            if (newName) {
                                localStorage.setItem('bropro_customChatName', JSON.stringify({
                                    email: userEmail,
                                    name: newName,
                                    emoji: newEmoji || '',
                                    celebration: newCeleb || 'sparkles'
                                }));
                                console.log(`🎭 Personalization: "${oldName || 'Bhai'}" → "${newName}" ${newEmoji || ''} (${newCeleb})`);
                            } else {
                                localStorage.removeItem('bropro_customChatName');
                                // Remove accent glow when personalization removed
                                if (window.VIPWelcome) VIPWelcome.removeAccentGlow();
                                console.log('🎭 Personalization removed, reverting to "Bhai"');
                            }

                            this.applyCustomChatName();

                            // Re-evaluate VIP status so GIF, Send Effect, and Glow react instantly
                            this.setupStudentVIPStatus();
                        }
                    } else {
                        if (this.customChatName !== null) {
                            this.customChatName = null;
                            this.customChatEmoji = null;
                            this.customChatCelebration = null;
                            this.customChatPassword = null;
                            localStorage.removeItem('bropro_customChatName');
                            if (window.VIPWelcome) VIPWelcome.removeAccentGlow();
                            this.applyCustomChatName();

                            // Re-evaluate VIP status (personalization doc gone)
                            this.setupStudentVIPStatus();
                        }
                    }
                }, (error) => {
                    console.log('Personalization listener error:', error.message);
                    // Mark as loaded even on error — don't block chat forever
                    this._personalizationLoaded = true;
                });
        } catch (error) {
            console.log('Personalization listener setup failed:', error.message);
            // Mark as loaded on setup failure — don't block chat forever
            this._personalizationLoaded = true;
        }
    },

    // Get the display name — custom name or default 'Bhai'
    getDisplayName() {
        return this.customChatName || 'Bhai';
    },

    // Apply custom name to all visible UI elements
    applyCustomChatName() {
        const name = this.getDisplayName();

        // 1. Chat header title (when in 'real' mode)
        if (this.chatMode === 'real') {
            const titleEl = document.getElementById('chatModeTitle');
            if (titleEl) titleEl.textContent = `Talk to ${name}`;
        }

        // 2. Floating button tooltip — always "Talk to Bhai" (VIP name only shown inside chat)
        const tooltipText = document.querySelector('.bhai-tooltip .tooltip-text');
        if (tooltipText) tooltipText.textContent = 'Talk to Bhai';

        // 3. Real Bhai mode button label (static HTML in index.html)
        const realBhaiLabel = document.getElementById('realBhaiLabel');
        if (realBhaiLabel) realBhaiLabel.textContent = `Real ${name}`;

        // 4. Real Bhai mode button label (dynamically injected by restoreLoggedInToggleBar)
        const dynamicLabel = document.querySelector('#realBhaiBtn .mode-label');
        if (dynamicLabel && dynamicLabel !== realBhaiLabel) {
            dynamicLabel.textContent = `Real ${name}`;
        }

        // 5. Admin badges in chat messages (update existing ones)
        document.querySelectorAll('.admin-badge').forEach(badge => {
            badge.textContent = `👑 ${name}`;
        });

        // 6. Welcome screen title ("Welcome to Bhai's Chat!")
        const welcomeTitle = document.getElementById('bhaiWelcomeTitle');
        if (welcomeTitle) welcomeTitle.textContent = `Welcome to ${name}'s Chat!`;

        // 7. Welcome card title ("Real Bhai" in mode info card)
        const welcomeCardTitle = document.getElementById('bhaiWelcomeCardTitle');
        if (welcomeCardTitle) welcomeCardTitle.textContent = `Real ${name}`;

        // 8. Notification popup title ("Bhai wants to talk!")
        const notifTitle = document.getElementById('bhaiNotifTitle');
        if (notifTitle) notifTitle.textContent = name;

        // 9. Notification footer ("Bhai is waiting...")
        const notifFooter = document.getElementById('bhaiNotifFooter');
        if (notifFooter) notifFooter.textContent = `${name} is waiting...`;

        // 10. Login prompt ("Please login to chat with Bhai!")
        const loginPrompt = document.getElementById('bhaiLoginPromptName');
        if (loginPrompt) loginPrompt.textContent = name;
    },

    // ============================================
    // STUDENT-SIDE EFFECT & GLOW LISTENER
    // Listens to chatEffects/{userId} for:
    // - Admin-pushed celebration effects
    // - Admin-controlled accent glow
    // ============================================
    _unsubscribeChatEffects: null,
    _lastEffectTimestamp: null,

    setupChatEffectsListener(userId) {
        // Clean up previous listener
        if (this._unsubscribeChatEffects) {
            this._unsubscribeChatEffects();
            this._unsubscribeChatEffects = null;
        }

        if (!userId || !this.db) return;

        const pageLoadTime = (window.VIPWelcome && VIPWelcome._pageLoadTime) || Date.now();

        try {
            this._unsubscribeChatEffects = this.db.collection('chatEffects').doc(userId)
                .onSnapshot((doc) => {
                    if (!doc.exists) return;
                    const data = doc.data();

                    // Handle incoming celebration effect
                    if (data.effect && data.effect.triggeredAt) {
                        const ts = data.effect.triggeredAt.toMillis ? data.effect.triggeredAt.toMillis() : 0;
                        // Only play effects that are: (a) new, (b) triggered AFTER page load
                        if (ts > 0 && ts !== this._lastEffectTimestamp && ts > pageLoadTime) {
                            this._lastEffectTimestamp = ts;

                            // Play effect FULL-PAGE — not limited to chat modal
                            if (window.VIPWelcome) {
                                const customName = this.customChatName || 'Bhai';
                                const emoji = this.customChatEmoji || '';
                                VIPWelcome.play({
                                    name: customName,
                                    emoji: emoji,
                                    celebration: data.effect.type || 'sparkles',
                                    customText: data.effect.customText || '',
                                    birthdayName: data.effect.birthdayName || '',
                                    email: '__force_play__' // bypass session check + enable full-page
                                });
                            }

                            // Clear the effect after playing to prevent replay on reload
                            this.db.collection('chatEffects').doc(userId).update({
                                effect: firebase.firestore.FieldValue.delete()
                            }).catch(() => { });
                        }
                    }

                    // Handle glow state
                    if (data.glow) {
                        this._handleGlowUpdate(data.glow);
                        // Sync to student menu state
                        this._studentGlowState = { active: data.glow.active || false, mood: data.glow.mood || '' };
                        this.updateStudentVIPMenu();
                    } else {
                        this._handleGlowUpdate({ active: false });
                        this._studentGlowState = { active: false, mood: '' };
                        this.updateStudentVIPMenu();
                    }
                }, (error) => {
                    console.log('Chat effects listener error:', error.message);
                });
        } catch (e) {
            console.log('Chat effects listener setup failed:', e.message);
        }
    },

    _handleGlowUpdate(glowData) {
        if (!window.VIPWelcome) return;

        if (glowData.active && glowData.mood) {
            // Map mood names to celebration presets or direct RGB values
            const moodMap = {
                hearts: 'hearts',
                gold: 'stars',
                fire: 'fire',
                ice: 'snow',
                purple: 'sparkles',
                emerald: 'petals',
                // New intense glow moods — use direct RGB
                red_hot: null,
                fume: null,
                freeze: null
            };

            // Direct RGB for new moods
            const directRGB = {
                red_hot: [220, 38, 38],
                fume: [180, 83, 9],
                freeze: [14, 165, 233]
            };

            const mapped = moodMap[glowData.mood];
            if (mapped) {
                VIPWelcome.applyAccentGlow(mapped);
            } else if (directRGB[glowData.mood]) {
                VIPWelcome.applyAccentGlow(null, directRGB[glowData.mood]);
            } else {
                VIPWelcome.applyAccentGlow('sparkles');
            }
        } else {
            VIPWelcome.removeAccentGlow();
        }
    },

    // ============================================
    // STUDENT-SIDE + ACTION MENU
    // ============================================
    _studentMenuOpen: false,
    _closeStudentMenuHandler: null,

    toggleStudentActionMenu(e) {
        if (e) e.stopPropagation();
        const popup = document.getElementById('studentActionMenuPopup');
        const btn = document.getElementById('studentActionMenuBtn');
        if (!popup || !btn) return;

        if (this._studentMenuOpen) {
            this.closeStudentActionMenu();
        } else {
            // Position popup above the button
            const rect = btn.getBoundingClientRect();
            popup.style.left = rect.left + 'px';
            popup.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
            popup.style.top = 'auto';

            popup.classList.add('active');
            btn.classList.add('active');
            this._studentMenuOpen = true;

            // Close on outside click
            if (!this._closeStudentMenuHandler) {
                this._closeStudentMenuHandler = (ev) => {
                    const popup = document.getElementById('studentActionMenuPopup');
                    const btn = document.getElementById('studentActionMenuBtn');
                    if (popup && !popup.contains(ev.target) && btn && !btn.contains(ev.target)) {
                        this.closeStudentActionMenu();
                    }
                };
            }
            requestAnimationFrame(() => {
                document.addEventListener('click', this._closeStudentMenuHandler);
            });
        }
    },

    closeStudentActionMenu() {
        const popup = document.getElementById('studentActionMenuPopup');
        const btn = document.getElementById('studentActionMenuBtn');
        if (popup) popup.classList.remove('active');
        if (btn) btn.classList.remove('active');
        this._studentMenuOpen = false;
        if (this._closeStudentMenuHandler) {
            document.removeEventListener('click', this._closeStudentMenuHandler);
        }
    },

    studentMenuAction(action) {
        this.closeStudentActionMenu();
        switch (action) {
            case 'emoji':
                // Make the hidden emoji picker container visible
                const emojiContainer = document.querySelector('.bhai-input-area .emoji-picker-container');
                if (emojiContainer) emojiContainer.style.display = 'flex';
                toggleEmojiPicker('student');
                break;
            case 'gif':
                // GIF picker is VIP-only (same gate as Send Effect)
                if (!this._studentIsVIP) {
                    this.showToast('error', '🎬 GIF sending is a VIP feature');
                    return;
                }
                // Open premium GIF picker
                if (window.BroProGifPicker) {
                    BroProGifPicker.open({
                        context: 'student',
                        onSend: (gifData) => BroProGifPicker.sendGifToTalkToBhai(gifData)
                    });
                } else {
                    console.error('GIF picker not loaded');
                }
                break;
            case 'image':
                this.triggerStudentImageUpload();
                break;
        }
    },

    // ============================================
    // STUDENT VIP FEATURES
    // ============================================
    _studentIsVIP: false,
    _studentGlowState: { active: false, mood: '' },

    updateStudentVIPMenu() {
        const container = document.getElementById('studentVIPItems');
        if (!container) return;

        if (!this._studentIsVIP) {
            container.innerHTML = '';
            return;
        }

        const glowActive = this._studentGlowState.active;
        const glowMood = this._studentGlowState.mood;

        const moods = [
            { id: 'hearts', color: '#ec4899', label: '💕' },
            { id: 'gold', color: '#eab308', label: '💛' },
            { id: 'fire', color: '#f97316', label: '🔥' },
            { id: 'ice', color: '#38bdf8', label: '❄️' },
            { id: 'purple', color: '#8b5cf6', label: '💜' },
            { id: 'emerald', color: '#10b981', label: '💚' },
            { id: 'red_hot', color: '#dc2626', label: '🔴' },
            { id: 'fume', color: '#b45309', label: '🌋' },
            { id: 'freeze', color: '#0ea5e9', label: '🧊' }
        ];

        const glowDotsHtml = moods.map(m =>
            `<span class="action-glow-dot ${glowActive && glowMood === m.id ? 'active-glow' : ''}" 
                  style="background: ${m.color}; color: ${m.color};" 
                  title="${m.label} glow"
                  onclick="event.stopPropagation(); BroProAdmin.studentToggleGlow('${m.id}')"></span>`
        ).join('');

        container.innerHTML = `
            <div class="action-menu-divider"></div>
            <button class="action-menu-item" onclick="event.stopPropagation(); BroProAdmin.showStudentCelebPicker()">
                <span class="action-item-icon">🎭</span>
                <span class="action-item-label">Send Effect</span>
                <span class="action-item-badge">VIP</span>
            </button>
            <div id="studentCelebPickerGrid" style="display: none;">
                <div class="action-celeb-grid">
                    <button class="action-celeb-btn" onclick="BroProAdmin.studentSendEffect('confetti')" title="Confetti">🎊</button>
                    <button class="action-celeb-btn" onclick="BroProAdmin.studentSendEffect('hearts')" title="Hearts">💕</button>
                    <button class="action-celeb-btn" onclick="BroProAdmin.studentSendEffect('stars')" title="Stars">⭐</button>
                    <button class="action-celeb-btn" onclick="BroProAdmin.studentSendEffect('fire')" title="Fire">🔥</button>
                    <button class="action-celeb-btn" onclick="BroProAdmin.studentSendEffect('sparkles')" title="Sparkles">✨</button>
                    <button class="action-celeb-btn" onclick="BroProAdmin.studentSendEffect('rockets')" title="Rockets">🚀</button>
                    <button class="action-celeb-btn" onclick="BroProAdmin.studentSendEffect('petals')" title="Petals">🌸</button>
                    <button class="action-celeb-btn" onclick="BroProAdmin.studentSendEffect('snow')" title="Snow">❄️</button>
                </div>
                <div class="action-custom-text-row">
                    <input type="text" id="studentCustomEffectInput" class="action-custom-input" 
                           placeholder="Type text or emoji..." maxlength="50"
                           onclick="event.stopPropagation()"
                           onkeydown="if(event.key==='Enter'){event.preventDefault(); BroProAdmin.studentSendEffect('custom')}">
                    <button class="action-custom-send-btn" onclick="event.stopPropagation(); BroProAdmin.studentSendEffect('custom')" title="Send custom">
                        ▶
                    </button>
                </div>
            </div>
            ${this.customChatSeasonalEffects ? `
            <div id="studentSeasonalPickerGrid" style="display: none;">
                <div class="action-seasonal-label">🎆 Seasonal:</div>
                <div class="action-celeb-grid action-seasonal-grid">
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('holi')" title="Holi">🎨</button>
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('diwali')" title="Diwali">🪔</button>
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('rain')" title="Rain">🌧️</button>
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('aurora')" title="Aurora">🌊</button>
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('fireworks')" title="Fireworks">🎆</button>
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('butterfly')" title="Butterfly">🦋</button>
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('tornado')" title="Tornado">🌪️</button>
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('rainbow')" title="Rainbow">🌈</button>
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('sunrise')" title="Sunrise">☀️</button>
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('nightsky')" title="Night Sky">🌙</button>
                    <button class="action-celeb-btn action-seasonal-btn" onclick="BroProAdmin.studentSendEffect('birthday')" title="Birthday">🎂</button>
                </div>
            </div>
            ` : ''}
            <div class="action-glow-row">
                <span class="action-glow-label">✨ Glow:</span>
                ${glowDotsHtml}
                <span class="action-glow-off" onclick="event.stopPropagation(); BroProAdmin.studentToggleGlow(null)" title="Turn off glow">✕</span>
            </div>
        `;
    },

    showStudentCelebPicker() {
        const grid = document.getElementById('studentCelebPickerGrid');
        if (!grid) return;
        const show = grid.style.display === 'none';
        grid.style.display = show ? 'block' : 'none';
        // Also toggle seasonal grid if it exists
        const seasonalGrid = document.getElementById('studentSeasonalPickerGrid');
        if (seasonalGrid) seasonalGrid.style.display = show ? 'block' : 'none';
    },

    // Student sends effect → writes to chatEffects/{userId}.studentEffect
    // Admin's listener picks it up and plays on admin side
    async studentSendEffect(type) {
        const user = firebase.auth().currentUser;
        if (!user || !this.db || !this._studentIsVIP) return;

        let customText = '';
        let birthdayName = '';
        if (type === 'custom') {
            const input = document.getElementById('studentCustomEffectInput');
            customText = input ? input.value.trim() : '';
            if (!customText) {
                this.showToast('error', '❌ Enter text or emoji to send');
                return;
            }
        }

        // Prompt for birthday person's name
        if (type === 'birthday') {
            birthdayName = prompt('🎂 Enter the birthday person\'s name:');
            if (!birthdayName || !birthdayName.trim()) {
                return; // User cancelled
            }
            birthdayName = birthdayName.trim();
        }

        try {
            const effectData = {
                type: type,
                triggeredAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            if (type === 'custom' && customText) {
                effectData.customText = customText;
            }
            if (type === 'birthday' && birthdayName) {
                effectData.birthdayName = birthdayName;
            }

            await this.db.collection('chatEffects').doc(user.uid).set({
                studentEffect: effectData
            }, { merge: true });

            // Clear custom input
            if (type === 'custom') {
                const input = document.getElementById('studentCustomEffectInput');
                if (input) input.value = '';
            }

            this.closeStudentActionMenu();

            // Also play locally on student's own screen
            if (window.VIPWelcome) {
                VIPWelcome.play({
                    name: this.customChatName || 'You',
                    emoji: this.customChatEmoji || '',
                    celebration: type,
                    customText: customText,
                    birthdayName: birthdayName,
                    email: '__force_play__'
                });
            }

            this.showToast('success', type === 'custom'
                ? `🎭 Effect sent: "${customText}"`
                : `🎭 ${type} effect sent!`);
        } catch (e) {
            console.error('Student send effect error:', e);
            this.showToast('error', '❌ Failed to send effect');
        }
    },

    // Student toggles glow → writes to chatEffects/{userId}.glow
    // Both sides see it via their listeners; instant visual feedback here
    async studentToggleGlow(mood) {
        const user = firebase.auth().currentUser;
        if (!user || !this.db || !this._studentIsVIP) return;

        try {
            if (!mood) {
                await this.db.collection('chatEffects').doc(user.uid).set({
                    glow: { active: false, mood: '' }
                }, { merge: true });
                this._studentGlowState = { active: false, mood: '' };
                this._handleGlowUpdate({ active: false });
                this.showToast('success', '✨ Glow turned off');
            } else {
                const isToggleOff = this._studentGlowState.active && this._studentGlowState.mood === mood;
                if (isToggleOff) {
                    await this.db.collection('chatEffects').doc(user.uid).set({
                        glow: { active: false, mood: '' }
                    }, { merge: true });
                    this._studentGlowState = { active: false, mood: '' };
                    this._handleGlowUpdate({ active: false });
                    this.showToast('success', '✨ Glow turned off');
                } else {
                    await this.db.collection('chatEffects').doc(user.uid).set({
                        glow: { active: true, mood: mood }
                    }, { merge: true });
                    this._studentGlowState = { active: true, mood: mood };
                    this._handleGlowUpdate({ active: true, mood: mood });
                    this.showToast('success', `✨ Glow set: ${mood}`);
                }
            }
            this.updateStudentVIPMenu();
        } catch (e) {
            console.error('Student glow toggle error:', e);
            this.showToast('error', '❌ Failed to update glow');
        }
    },
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
    // USER PRESENCE SYSTEM (Production-Grade)
    // Heartbeat-based with Page Lifecycle API,
    // sendBeacon fallback, adaptive intervals,
    // and network reconnection handling.
    // ============================================
    heartbeatInterval: null,
    currentUserRef: null,
    _presenceListenersAttached: false, // Singleton guard for event listeners
    _lastVisibilityWrite: 0,          // Throttle for visibility writes
    _presenceUserId: null,            // Track current user to avoid stale refs
    _cachedAuthToken: null,            // Pre-cached auth token for sendBeacon

    // Heartbeat config — tuned for reliability vs cost
    _HEARTBEAT_INTERVAL_MS: 120000,     // 2 minutes (visible tab)
    _ONLINE_THRESHOLD_MS: 4 * 60 * 1000, // 4 minutes (2× heartbeat + buffer)
    _VISIBILITY_THROTTLE_MS: 30000,     // 30s min between visibility writes

    updateUserPresence(user, isOnline = true) {
        if (!this.db || !user) return;

        const presenceRef = this.db.collection('presence').doc(user.uid);
        this.currentUserRef = presenceRef;
        this._presenceUserId = user.uid;
        const profile = window.BroProPlayer?.load() || {};

        // Detect device type
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const device = isMobile ? 'mobile' : 'desktop';

        // Detect login method from provider data
        let loginMethod = 'unknown';
        let googlePhotoURL = user.photoURL || null;
        if (user.providerData && user.providerData.length > 0) {
            for (const provider of user.providerData) {
                if (provider.providerId === 'google.com') {
                    loginMethod = 'google';
                    // Extract Google profile photo from provider data (most reliable source)
                    if (!googlePhotoURL && provider.photoURL) {
                        googlePhotoURL = provider.photoURL;
                    }
                } else if (provider.providerId === 'password') {
                    if (loginMethod === 'unknown') loginMethod = 'email';
                }
            }
        }

        const presenceData = {
            name: user.displayName || profile.name || 'Anonymous',
            email: user.email,
            avatar: profile.avatar || '🐼',
            photoURL: googlePhotoURL || profile.photoURL || null,
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

        // Pre-cache auth token immediately for sendBeacon reliability
        try {
            user.getIdToken().then(token => {
                this._cachedAuthToken = token;
            }).catch(() => { });
        } catch (e) { /* ignore */ }

        // Attach lifecycle event listeners ONCE (singleton pattern)
        if (!this._presenceListenersAttached) {
            this._attachPresenceLifecycleListeners();
        }
    },

    // ============================================
    // LIFECYCLE EVENT LISTENERS (Singleton)
    // Attached once, never duplicated.
    // Handles: visibility, pagehide, online/offline
    // ============================================
    _attachPresenceLifecycleListeners() {
        if (this._presenceListenersAttached) return;
        this._presenceListenersAttached = true;

        // --- 1. Visibility Change (tab focus/blur) ---
        // When tab becomes visible: immediately mark online + heartbeat
        // When tab becomes hidden: immediately mark offline (eliminates false positives)
        document.addEventListener('visibilitychange', () => {
            if (!this.currentUserRef) return;

            if (document.visibilityState === 'visible') {
                // Tab regained focus — immediately mark online and send heartbeat
                this.currentUserRef.update({
                    isOnline: true,
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                }).catch(() => { });
                // Restart the heartbeat interval (it was paused when hidden)
                this.startHeartbeat(this.currentUserRef);
            } else if (document.visibilityState === 'hidden') {
                // Tab lost focus — IMMEDIATELY mark offline
                // This eliminates the 4-minute false-positive window where admin
                // would see the user as "online" even though they left the tab.
                // If the user comes back, visibilitychange → visible will re-mark online.
                this.currentUserRef.update({
                    isOnline: false,
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                }).catch(() => { });
                this._lastVisibilityWrite = Date.now();

                // Pause heartbeat to save writes while hidden
                if (this.heartbeatInterval) {
                    clearInterval(this.heartbeatInterval);
                    this.heartbeatInterval = null;
                }
            }
        });

        // --- 2. Page Hide (reliable unload — works on iOS Safari) ---
        // `pagehide` is the W3C-recommended replacement for `beforeunload`.
        // It fires reliably on all platforms including iOS Safari, Android Chrome,
        // and desktop browsers when a tab is closed, navigated away, or evicted.
        window.addEventListener('pagehide', (event) => {
            this._handlePageUnload(event.persisted);
        });

        // --- 3. beforeunload (legacy fallback for older browsers) ---
        window.addEventListener('beforeunload', () => {
            this._handlePageUnload(false);
        });

        // --- 4. Network Reconnection ---
        // When user comes back online after a network drop, immediately heartbeat
        window.addEventListener('online', () => {
            console.log('🌐 Network restored — sending presence heartbeat');
            if (this.currentUserRef) {
                this._sendHeartbeat();
                this.startHeartbeat(this.currentUserRef);
            }
        });

        // When network drops, update lastSeen so threshold kicks in quickly
        window.addEventListener('offline', () => {
            console.log('📡 Network lost — pausing heartbeat');
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval);
                this.heartbeatInterval = null;
            }
        });

        // --- 5. Page Freeze (bfcache / tab discard on mobile) ---
        // Modern browsers may freeze a page without firing pagehide.
        // The 'freeze' event handles this edge case.
        if ('onfreeze' in document) {
            document.addEventListener('freeze', () => {
                if (this.currentUserRef) {
                    this.currentUserRef.update({
                        isOnline: false,
                        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                    }).catch(() => { });
                }
                if (this.heartbeatInterval) {
                    clearInterval(this.heartbeatInterval);
                    this.heartbeatInterval = null;
                }
            });

            document.addEventListener('resume', () => {
                if (this.currentUserRef) {
                    this.currentUserRef.update({
                        isOnline: true,
                        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                    }).catch(() => { });
                    this.startHeartbeat(this.currentUserRef);
                }
            });
        }

        console.log('🔗 Presence lifecycle listeners attached (singleton)');
    },

    // ============================================
    // PAGE UNLOAD HANDLER
    // Multi-strategy offline status on page close.
    // Strategy: sendBeacon → Firestore SDK fallback
    // ============================================
    _handlePageUnload(persisted) {
        if (!this._presenceUserId) return;

        // Stop heartbeat immediately
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }

        // If bfcache (persisted = true), the page may come back — just update lastSeen
        // If not persisted, mark fully offline

        // Method 1: sendBeacon with Firestore REST :commit endpoint (most reliable)
        // sendBeacon is guaranteed by browsers to deliver even after page closes.
        // We use the :commit endpoint (POST) since sendBeacon only supports POST.
        // The pre-cached auth token enables authenticated writes.
        if (navigator.sendBeacon && this._cachedAuthToken) {
            try {
                const projectId = 'supersite-2dcf9';
                const docName = `projects/${projectId}/databases/(default)/documents/presence/${this._presenceUserId}`;
                const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:commit`;

                const payload = JSON.stringify({
                    writes: [{
                        update: {
                            name: docName,
                            fields: {
                                isOnline: { booleanValue: false },
                                lastSeen: { timestampValue: new Date().toISOString() }
                            }
                        },
                        updateMask: {
                            fieldPaths: ['isOnline', 'lastSeen']
                        }
                    }]
                });

                // Create a Blob with proper content type and auth
                const blob = new Blob([payload], { type: 'application/json' });

                // sendBeacon can't set headers, but :commit supports Bearer via query param
                const sent = navigator.sendBeacon(
                    `${url}?access_token=${this._cachedAuthToken}`,
                    blob
                );

                if (sent) {
                    return; // sendBeacon queued — browser will deliver it
                }
            } catch (e) {
                // sendBeacon failed — fall through to direct update
            }
        }

        // Method 2: Direct Firestore SDK update (may not complete before unload)
        // This is a best-effort fallback. If it doesn't complete, the heartbeat
        // threshold (4 min) will automatically mark the user as offline.
        if (this.currentUserRef) {
            this.currentUserRef.update({
                isOnline: false,
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(() => { });
        }
    },

    // ============================================
    // HEARTBEAT SYSTEM
    // Adaptive interval: active when visible,
    // paused when hidden. Immediate on reconnect.
    // ============================================
    startHeartbeat(presenceRef) {
        // Clear any existing heartbeat
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }

        // Only run heartbeat when tab is visible
        if (document.visibilityState === 'hidden') {
            return; // Will be started when tab becomes visible
        }

        // Send heartbeat every 2 minutes
        // COST: ~720 writes/user/day (active 24h), realistic ~360/day (12h active)
        // This is a good balance between reliability (4-min detection) and cost
        this.heartbeatInterval = setInterval(() => {
            this._sendHeartbeat();
        }, this._HEARTBEAT_INTERVAL_MS);

        console.log('💓 Presence heartbeat started (2-min adaptive)');
    },

    // Single heartbeat write — reused by interval, visibility, and reconnect
    _sendHeartbeat() {
        if (!this.currentUserRef) return;
        if (document.visibilityState === 'hidden') return; // Don't heartbeat in background
        if (!navigator.onLine) return; // Don't attempt when offline

        this.currentUserRef.update({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            isOnline: true
        }).catch(() => { });

        // Pre-cache auth token for sendBeacon (async is OK here — we're not unloading)
        // This token will be used by _handlePageUnload when the page closes
        try {
            const user = firebase.auth().currentUser;
            if (user) {
                user.getIdToken().then(token => {
                    this._cachedAuthToken = token;
                }).catch(() => { });
            }
        } catch (e) { /* ignore */ }
    },

    // Set user offline — called by stopPresenceSystem (logout)
    setOfflineStatus(presenceRef) {
        try {
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

        // Clear user ID and auth token (prevents stale sendBeacon on next unload)
        this._presenceUserId = null;
        this._cachedAuthToken = null;

        // Unsubscribe from online users listener
        if (this.unsubscribeOnlineUsers) {
            this.unsubscribeOnlineUsers();
            this.unsubscribeOnlineUsers = null;
        }

        console.log('🛑 Presence system stopped');
    },

    // ============================================
    // ONLINE USERS LISTENER (Admin Only)
    // Heartbeat-verified with stale user cleanup
    // ============================================
    startOnlineUsersListener() {
        if (!this.db || !this.isAdmin) return;

        if (this.unsubscribeOnlineUsers) {
            this.unsubscribeOnlineUsers();
        }

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

                    if (timeSinceLastSeen <= this._ONLINE_THRESHOLD_MS) {
                        // User is genuinely online (heartbeat received within threshold)
                        this.onlineUsersData.push({
                            id: doc.id,
                            ...data,
                            lastSeenFormatted: this.formatLastSeen(timeSinceLastSeen)
                        });
                    } else if (timeSinceLastSeen > this._ONLINE_THRESHOLD_MS && data.isOnline) {
                        // User's heartbeat is stale - mark them as offline
                        staleUsers.push(doc.id);
                    }
                });

                // Batch-clean stale users (max 5 per cycle to keep costs low)
                const staleBatch = staleUsers.slice(0, 5);
                if (staleBatch.length > 0) {
                    const batch = this.db.batch();
                    staleBatch.forEach(userId => {
                        batch.update(this.db.collection('presence').doc(userId), {
                            isOnline: false
                        });
                    });
                    batch.commit().catch(() => { });
                    console.log(`🧹 Batch-cleaned ${staleBatch.length} stale users as offline`);
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

        // Refresh every 90 seconds (matches tighter threshold detection)
        this.onlineUsersRefreshInterval = setInterval(() => {
            // Re-filter the current data based on time
            const now = Date.now();

            this.onlineUsersData = this.onlineUsersData.filter(user => {
                let lastSeenTime = null;
                if (user.lastSeen) {
                    lastSeenTime = user.lastSeen.toDate ? user.lastSeen.toDate().getTime() : user.lastSeen;
                }
                const timeSinceLastSeen = lastSeenTime ? (now - lastSeenTime) : Infinity;
                return timeSinceLastSeen <= this._ONLINE_THRESHOLD_MS;
            });

            this.renderOnlineUsers();
            console.log(`🔄 Online users refresh: ${this.onlineUsersData.length} still online`);
        }, 90000); // Every 90 seconds
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
                    displayName: data.displayName || data.name || 'Student',
                    googleName: data.googleName || data.displayName || '',
                    email: data.email || '',
                    avatar: data.avatar || '🐼',
                    photoURL: data.photoURL || (this.isHttpUrl(data.avatar) ? data.avatar : null),
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
            const avatarHtml = this.getIdentityAvatarHtml(user, '2.5rem');
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
                        <button class="action-btn message-btn" onclick="if(window.BroProTimeStats) BroProTimeStats.showUserTimeStats('${user.id}', '${escapedName}')" title="View Time Stats" style="background: rgba(16, 185, 129, 0.15);">
                            ⏱️
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

        const avatarHtml = this.getIdentityAvatarHtml(user, '3rem');
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
    // ADMIN UI - DISABLED (Use /newadmin/ instead)
    // Admin dashboard moved to separate URL for security
    // ============================================
    showAdminUI() {
        // 🔐 SECURITY UPDATE: Admin UI buttons no longer injected in main site
        // Admin must access /newadmin/ directly for all administrative tasks
        // This prevents admin modals from being exposed if CSS breaks
        console.log('👑 Admin detected! Use /newadmin/ for admin dashboard');

        // Hide student chat bubble for admin (they reply via /newadmin/)
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

    // ============================================
    // PROGRESS RESTORE SYSTEM
    // Premium Admin Feature for Restoring User Progress
    // ============================================
    _restoreFoundUser: null,

    openProgressRestoreModal() {
        if (!this.isAdmin) {
            alert('⛔ Access Denied! Admin only.');
            return;
        }

        const modal = document.getElementById('progressRestoreModal');
        if (modal) {
            modal.classList.add('active');
            // Reset form
            document.getElementById('restoreUserEmail').value = '';
            document.getElementById('restoreUserInfo').style.display = 'none';
            document.getElementById('restoreLog').style.display = 'none';
            document.getElementById('restoreLog').innerHTML = '';
            this._restoreFoundUser = null;
        }
    },

    closeProgressRestoreModal() {
        const modal = document.getElementById('progressRestoreModal');
        if (modal) modal.classList.remove('active');
    },

    _restoreLog(message, type = 'info') {
        const logEl = document.getElementById('restoreLog');
        if (!logEl) return;

        logEl.style.display = 'block';
        const time = new Date().toLocaleTimeString();
        const colors = {
            info: '#94a3b8',
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b'
        };
        logEl.innerHTML += `<div style="color: ${colors[type] || '#94a3b8'}; padding: 0.25rem 0;">[${time}] ${message}</div>`;
        logEl.scrollTop = logEl.scrollHeight;
    },

    async findUserForRestore() {
        const email = document.getElementById('restoreUserEmail').value.trim().toLowerCase();
        if (!email) {
            alert('Please enter an email address');
            return;
        }

        const btn = document.getElementById('findUserBtn');
        btn.disabled = true;
        btn.innerHTML = '🔄 Searching...';

        const db = firebase.firestore();

        try {
            let userData = null;
            let userId = null;

            // Try global leaderboard first
            const globalQuery = await db.collection('leaderboards').doc('global').collection('players')
                .where('email', '==', email).limit(1).get();

            if (!globalQuery.empty) {
                userId = globalQuery.docs[0].id;
                userData = globalQuery.docs[0].data();
                this._restoreLog('Found in global leaderboard', 'success');
            }

            // Also check old leaderboard
            if (!userId) {
                const oldQuery = await db.collection('leaderboard')
                    .where('email', '==', email).limit(1).get();

                if (!oldQuery.empty) {
                    userId = oldQuery.docs[0].id;
                    userData = oldQuery.docs[0].data();
                    this._restoreLog('Found in old leaderboard', 'success');
                }
            }

            // Check users collection
            if (!userId) {
                const usersQuery = await db.collection('users')
                    .where('email', '==', email).limit(1).get();

                if (!usersQuery.empty) {
                    userId = usersQuery.docs[0].id;
                    userData = usersQuery.docs[0].data();
                    this._restoreLog('Found in users collection', 'success');
                }
            }

            // Check presence collection
            if (!userId) {
                const presenceQuery = await db.collection('presence')
                    .where('email', '==', email).limit(1).get();

                if (!presenceQuery.empty) {
                    userId = presenceQuery.docs[0].id;
                    userData = presenceQuery.docs[0].data();
                    this._restoreLog('Found in presence collection', 'success');
                }
            }

            if (!userData || !userId) {
                alert('❌ User not found with email: ' + email);
                this._restoreLog('User not found: ' + email, 'error');
                return;
            }

            // Store found user
            this._restoreFoundUser = {
                id: userId,
                email: email,
                ...userData
            };

            // Display user info
            document.getElementById('restoreFoundName').textContent = userData.name || userData.displayName || 'Unknown';
            document.getElementById('restoreFoundXP').textContent = (userData.xp || 0).toLocaleString() + ' XP';
            document.getElementById('restoreFoundLevel').textContent = 'Level ' + (userData.level || 1);

            // Show the restore section
            document.getElementById('restoreUserInfo').style.display = 'block';

            this._restoreLog('User found: ' + (userData.name || email) + ' (Level ' + (userData.level || 1) + ')', 'success');

        } catch (error) {
            console.error('Error finding user:', error);
            alert('Error finding user: ' + error.message);
            this._restoreLog('Error: ' + error.message, 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '🔍 Find User';
        }
    },

    setRestoreLevel(level) {
        const xp = (level - 1) * (window.XP_PER_LEVEL || 1000);
        document.getElementById('restoreNewXP').value = xp;
        document.getElementById('restoreNewLevel').value = level;
    },

    async executeProgressRestore() {
        if (!this._restoreFoundUser) {
            alert('Please find a user first');
            return;
        }

        const newXP = parseInt(document.getElementById('restoreNewXP').value);
        if (isNaN(newXP) || newXP < 0) {
            alert('Please enter a valid XP value');
            return;
        }

        let newLevel = parseInt(document.getElementById('restoreNewLevel').value);
        if (isNaN(newLevel) || newLevel < 1) {
            // Auto-calculate level from XP (using XP_PER_LEVEL constant - 1000 XP per level)
            newLevel = Math.floor(newXP / (window.XP_PER_LEVEL || 1000)) + 1;
        }

        // Confirm
        const confirmed = confirm(`
⚠️ CONFIRM RESTORE:

User: ${this._restoreFoundUser.name || this._restoreFoundUser.displayName || 'Unknown'}
Email: ${this._restoreFoundUser.email}
User ID: ${this._restoreFoundUser.id}

Current XP: ${this._restoreFoundUser.xp || 0}
New XP: ${newXP}

Current Level: ${this._restoreFoundUser.level || 1}
New Level: ${newLevel}

Are you sure you want to restore this user's progress?
        `);

        if (!confirmed) return;

        const btn = document.getElementById('restoreBtn');
        btn.disabled = true;
        btn.innerHTML = '🔄 Restoring...';

        const db = firebase.firestore();
        const userId = this._restoreFoundUser.id;

        try {
            const updateData = {
                xp: newXP,
                level: newLevel,
                restoredAt: firebase.firestore.FieldValue.serverTimestamp(),
                restoredBy: this.ADMIN_EMAIL,
                previousXP: this._restoreFoundUser.xp || 0,
                previousLevel: this._restoreFoundUser.level || 1
            };

            this._restoreLog('Starting restore process...', 'info');

            // Update global leaderboard
            try {
                await db.collection('leaderboards').doc('global').collection('players').doc(userId).set(updateData, { merge: true });
                this._restoreLog('✅ Updated leaderboards/global/players', 'success');
            } catch (e) {
                this._restoreLog('⚠️ Could not update global leaderboard: ' + e.message, 'warning');
            }

            // Update old leaderboard
            try {
                await db.collection('leaderboard').doc(userId).set(updateData, { merge: true });
                this._restoreLog('✅ Updated leaderboard collection', 'success');
            } catch (e) {
                this._restoreLog('⚠️ Could not update old leaderboard: ' + e.message, 'warning');
            }

            // Update users collection
            try {
                await db.collection('users').doc(userId).set(updateData, { merge: true });
                this._restoreLog('✅ Updated users collection', 'success');
            } catch (e) {
                this._restoreLog('⚠️ Could not update users collection: ' + e.message, 'warning');
            }

            // Update presence collection
            try {
                await db.collection('presence').doc(userId).set({ xp: newXP, level: newLevel }, { merge: true });
                this._restoreLog('✅ Updated presence collection', 'success');
            } catch (e) {
                this._restoreLog('⚠️ Could not update presence: ' + e.message, 'warning');
            }

            this._restoreLog('🎉 PROGRESS RESTORED SUCCESSFULLY!', 'success');
            this._restoreLog(`New XP: ${newXP.toLocaleString()}, New Level: ${newLevel}`, 'success');

            // Update UI
            document.getElementById('restoreFoundXP').textContent = newXP.toLocaleString() + ' XP';
            document.getElementById('restoreFoundLevel').textContent = 'Level ' + newLevel;

            // Show toast
            this.showAdminToast('success', `✅ Progress restored: ${newXP.toLocaleString()} XP, Level ${newLevel}`);

            // Play sound
            if (window.BroProSounds) {
                BroProSounds.play('levelup');
            }

        } catch (error) {
            console.error('Error restoring progress:', error);
            alert('Error restoring progress: ' + error.message);
            this._restoreLog('❌ Error: ' + error.message, 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '✨ Restore Progress';
        }
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
            const avatarHtml = this.getIdentityAvatarHtml(user, '2.5rem');
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
                        <button class="action-btn message-btn" onclick="if(window.BroProTimeStats) BroProTimeStats.showUserTimeStats('${user.id}', '${escapedName}')" title="View Time Stats" style="background: rgba(16, 185, 129, 0.15);">
                            ⏱️
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

        // 🔐 SECURITY: Only allow delete if authenticated as admin
        // Password check removed - authentication is via Firebase only
        if (!this.isAdmin) {
            passwordError.textContent = '❌ Admin authentication required!';
            if (passwordInput) {
                passwordInput.classList.add('shake');
                setTimeout(() => passwordInput.classList.remove('shake'), 500);
            }
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
        let displayPhotoURL = null;

        try {
            const leaderboardDoc = await this.db.collection('leaderboard').doc(userId).get();
            if (leaderboardDoc.exists) {
                const userData = leaderboardDoc.data();
                displayName = userData.name || userName;  // Leaderboard name takes priority
                displayEmail = userData.email || userEmail;
                displayAvatar = userData.avatar || displayAvatar;
                displayPhotoURL = userData.photoURL || (this.isHttpUrl(userData.avatar) ? userData.avatar : displayPhotoURL);
            }

            // Also try presence collection for additional data
            const presenceDoc = await this.db.collection('presence').doc(userId).get();
            if (presenceDoc.exists) {
                const presenceData = presenceDoc.data();
                if (!displayPhotoURL) {
                    displayPhotoURL = presenceData.photoURL || (this.isHttpUrl(presenceData.avatar) ? presenceData.avatar : null);
                }
                if (!displayAvatar || displayAvatar === '🐼') {
                    displayAvatar = presenceData.avatar || displayAvatar;
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

        // Set avatar (support emoji, URL, and premium avatars)
        const avatarEl = document.getElementById('messageRecipientAvatar');
        if (avatarEl) {
            avatarEl.innerHTML = this.getIdentityAvatarHtml({
                name: displayName,
                email: displayEmail,
                avatar: displayAvatar,
                photoURL: displayPhotoURL
            }, '4rem');
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
            let fromUserMessages = [];
            let fromAdminMessages = [];
            let lastRenderedIds = new Set();
            let lastReactionHashes = new Map();

            // Helper: generate the HTML string for a single message
            const renderMessageHtml = (msg) => {
                const isAdmin = msg.senderId === 'admin';
                const msgClass = window.getMessageClass ? getMessageClass(msg.text, isAdmin) : (isAdmin ? 'admin-message' : 'user-message');

                if (msg.type === 'gif' && (msg.gifUrl || msg.gifPreviewUrl)) {
                    // Security: Validate GIF URL is from trusted source
                    const rawGifUrl = msg.gifUrl || msg.gifPreviewUrl;
                    const safeGifUrl = this._isSafeUrl(rawGifUrl) ? rawGifUrl : '';
                    const gifHtml = window.BroProGifPicker
                        ? BroProGifPicker.renderGifBubble(msg)
                        : (safeGifUrl ? `<div class="gif-chat-bubble"><img src="${safeGifUrl}" alt="GIF" style="max-width:250px;border-radius:12px"><span class="gif-badge">GIF</span></div>` : '<div class="gif-chat-bubble">[Invalid GIF]</div>');
                    const captionHtml = msg.text ? '<div class="message-content">' + (window.renderMessageContent ? renderMessageContent(msg.text) : this.escapeHtml(msg.text)) + '</div>' : '';
                    return '<div class="chat-message ' + msgClass + '" data-msg-id="' + msg.id + '">' +
                        captionHtml +
                        gifHtml +
                        '<div class="message-time">' + this.formatTime(msg.timestamp) + '</div>' +
                        '</div>';
                } else {
                    const content = window.renderMessageContent ? renderMessageContent(msg.text || '') : this.escapeHtml(msg.text || '');
                    return '<div class="chat-message ' + msgClass + '" data-msg-id="' + msg.id + '">' +
                        '<div class="message-content">' + content + '</div>' +
                        '<div class="message-time">' + this.formatTime(msg.timestamp) + '</div>' +
                        '</div>';
                }
            };

            // Helper: create a DOM element from an HTML string
            const createElementFromHtml = (htmlStr) => {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = htmlStr;
                return wrapper.firstElementChild;
            };

            // Helper: compute a simple hash for reaction-relevant data on a message
            const getReactionHash = (msg) => {
                const reactions = msg.reactions ? JSON.stringify(msg.reactions) : '';
                const read = msg.read ? '1' : '0';
                return reactions + '|' + read + '|' + (msg.text || '') + '|' + (msg.gifUrl || '') + '|' + (msg.gifPreviewUrl || '');
            };

            const updateCombinedMessages = () => {
                const allMessages = [...fromUserMessages, ...fromAdminMessages];

                // Handle empty state
                if (allMessages.length === 0) {
                    if (lastRenderedIds.size > 0 || chatContainer.children.length === 0 ||
                        !chatContainer.querySelector('.no-messages')) {
                        chatContainer.innerHTML = '<div class="no-messages"><span>💬</span><p>Start a conversation!</p></div>';
                    }
                    lastRenderedIds.clear();
                    lastReactionHashes.clear();
                    return;
                }

                // Remove the empty-state placeholder if it exists
                const emptyState = chatContainer.querySelector('.no-messages');
                if (emptyState) emptyState.remove();
                // Also remove any loading indicator
                const loadingEl = chatContainer.querySelector('.loading-chat');
                if (loadingEl) loadingEl.remove();

                // Deduplicate and sort
                const uniqueMessages = Array.from(
                    new Map(allMessages.map(m => [m.id, m])).values()
                );
                uniqueMessages.sort((a, b) => a.timestamp - b.timestamp);

                const currentIds = new Set(uniqueMessages.map(m => m.id));

                // --- Smart scroll: check if user is near the bottom before mutation ---
                const scrollThreshold = 150;
                const wasNearBottom = (chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight) < scrollThreshold;

                // 1. REMOVE messages no longer present
                lastRenderedIds.forEach(id => {
                    if (!currentIds.has(id)) {
                        const el = chatContainer.querySelector(`[data-msg-id="${id}"]`);
                        if (el) el.remove();
                    }
                });

                // 2. ADD new messages & UPDATE changed ones, maintaining sorted order
                let hasNewMessages = false;
                const fragment = document.createDocumentFragment();
                const existingEls = new Map();
                chatContainer.querySelectorAll('[data-msg-id]').forEach(el => {
                    existingEls.set(el.getAttribute('data-msg-id'), el);
                });

                uniqueMessages.forEach((msg, index) => {
                    const existingEl = existingEls.get(msg.id);

                    if (existingEl) {
                        // Message already in DOM — check if content/reactions changed
                        const newHash = getReactionHash(msg);
                        if (lastReactionHashes.get(msg.id) !== newHash) {
                            // Content changed: replace the element in-place
                            const updatedEl = createElementFromHtml(renderMessageHtml(msg));
                            existingEl.replaceWith(updatedEl);
                            existingEls.set(msg.id, updatedEl);
                            lastReactionHashes.set(msg.id, newHash);
                        }
                        // Ensure correct order: the element should be the (index)-th child
                        // We handle ordering after all inserts via a second pass below
                    } else {
                        // New message — create and mark for insertion
                        hasNewMessages = true;
                        const newEl = createElementFromHtml(renderMessageHtml(msg));
                        existingEls.set(msg.id, newEl);
                        lastReactionHashes.set(msg.id, getReactionHash(msg));
                    }
                });

                // Ensure correct sorted order in the DOM
                // Walk the sorted list and append/insert each element in order
                uniqueMessages.forEach((msg) => {
                    const el = existingEls.get(msg.id);
                    if (el) {
                        // appendChild moves an already-attached node without cloning
                        chatContainer.appendChild(el);
                    }
                });

                // Update tracking state
                lastRenderedIds = currentIds;

                // Smart scroll: only auto-scroll if user was near the bottom OR new messages arrived
                if (wasNearBottom || hasNewMessages) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            };

            const unsubscribeUser = this.db.collection('messages')
                .where('senderId', '==', userId)
                .where('recipientId', '==', 'admin')
                .onSnapshot((fromUserSnapshot) => {
                    fromUserMessages = [];
                    fromUserSnapshot.forEach(doc => {
                        const data = doc.data();
                        const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
                        fromUserMessages.push({ id: doc.id, ...data, timestamp });
                    });
                    updateCombinedMessages();
                }, (error) => {
                    console.error('Chat user listener error:', error);
                    chatContainer.innerHTML = '<div class="error-chat">Error loading messages</div>';
                });

            const unsubscribeAdmin = this.db.collection('messages')
                .where('senderId', '==', 'admin')
                .where('recipientId', '==', userId)
                .onSnapshot((fromAdminSnapshot) => {
                    fromAdminMessages = [];
                    fromAdminSnapshot.forEach(doc => {
                        const data = doc.data();
                        const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
                        fromAdminMessages.push({ id: doc.id, ...data, timestamp });
                    });
                    updateCombinedMessages();
                }, (error) => {
                    console.error('Chat admin listener error:', error);
                    chatContainer.innerHTML = '<div class="error-chat">Error loading messages</div>';
                });

            this.unsubscribeMessages = () => {
                unsubscribeUser();
                unsubscribeAdmin();
            };

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
            // ═══ GIF URL AUTO-DETECTION ═══
            // Admin can paste any GIF link and it auto-converts to a proper GIF message
            const gifDetection = window.BroProFormatter?.detectGifUrl?.(text);

            if (gifDetection?.hasGif && gifDetection.gifUrl) {
                // Send as a proper GIF message (reuses existing GIF rendering pipeline)
                const messageData = {
                    senderId: 'admin',
                    senderName: this.getDisplayName ? this.getDisplayName() : 'Bhai',
                    recipientId: this.currentChatUserId,
                    type: 'gif',
                    gifUrl: gifDetection.gifUrl,
                    gifPreviewUrl: gifDetection.gifUrl,
                    gifWidth: 280,
                    gifHeight: 200,
                    text: gifDetection.remainingText || '',
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    read: false
                };

                await this.db.collection('messages').add(messageData);
                console.log('✅ GIF message sent to user (auto-detected from link)');
            } else {
                // Regular text message
                await this.db.collection('messages').add({
                    senderId: 'admin',
                    senderName: this.getDisplayName ? this.getDisplayName() : 'Bhai',
                    recipientId: this.currentChatUserId,
                    text: text,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    read: false
                });
                console.log('✅ Message sent to user');
            }

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

    // ============================================
    // STUDENT CHAT REPLY SYSTEM
    // Premium reply-to-message feature
    // ============================================

    setupStudentChatReply() {
        const container = document.getElementById('studentChatMessages');
        if (!container) return;

        let longPressTimer = null;

        // Hide context menu when clicking elsewhere
        const hideMenuHandler = (e) => {
            if (!e.target.closest('.student-reply-menu')) {
                this.hideStudentReplyMenu();
            }
        };
        document.removeEventListener('click', hideMenuHandler);
        document.addEventListener('click', hideMenuHandler);

        // Long press for mobile
        container.addEventListener('touchstart', (e) => {
            const msgElement = e.target.closest('.chat-message[data-msg-id]');
            if (!msgElement) return;

            longPressTimer = setTimeout(() => {
                this.selectedStudentMessageId = msgElement.dataset.msgId;
                if (navigator.vibrate) navigator.vibrate(50);
                this.showStudentReplyMenu(e.touches[0].clientX, e.touches[0].clientY);
            }, 500);
        }, { passive: true });

        container.addEventListener('touchend', () => clearTimeout(longPressTimer));
        container.addEventListener('touchmove', () => clearTimeout(longPressTimer));

        // Right-click for desktop
        container.addEventListener('contextmenu', (e) => {
            const msgElement = e.target.closest('.chat-message[data-msg-id]');
            if (!msgElement) return;

            e.preventDefault();
            this.selectedStudentMessageId = msgElement.dataset.msgId;
            this.showStudentReplyMenu(e.clientX, e.clientY);
        });

        console.log('💬 Student reply system initialized');
    },

    showStudentReplyMenu(x, y) {
        // Remove existing menu
        this.hideStudentReplyMenu();

        const menu = document.createElement('div');
        menu.className = 'student-reply-menu';

        // Quick reaction bar + Reply button
        const reactionEmojis = ['❤️', '👍', '😂', '😮', '😢', '🙏'];
        const reactionBar = reactionEmojis.map(emoji =>
            `<button class="sr-quick-react-btn" onclick="BroProAdmin.toggleStudentReaction('${emoji}')">${emoji}</button>`
        ).join('');

        menu.innerHTML = `
            <div class="sr-quick-react-bar">
                ${reactionBar}
                <button class="sr-quick-react-btn sr-react-plus" onclick="BroProAdmin.openStudentEmojiPicker()" title="More emojis">+</button>
            </div>
            <div class="sr-context-divider"></div>
            <button class="reply-menu-btn" onclick="BroProAdmin.replyToStudentMessage()">
                <span>↩️</span> Reply
            </button>
        `;

        // Position the menu
        menu.style.cssText = `
            position: fixed;
            left: ${Math.min(x, window.innerWidth - 120)}px;
            top: ${Math.min(y, window.innerHeight - 50)}px;
            background: linear-gradient(145deg, #2a2a4e, #1a1a3e);
            border: 1px solid rgba(139, 92, 246, 0.4);
            border-radius: 12px;
            padding: 0.5rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 99999;
            animation: fadeInScale 0.15s ease-out;
        `;

        document.body.appendChild(menu);
    },

    hideStudentReplyMenu() {
        const menu = document.querySelector('.student-reply-menu');
        if (menu) menu.remove();
    },

    replyToStudentMessage() {
        if (!this.selectedStudentMessageId) return;

        // Find the message in stored messages
        const message = this.studentMessages.find(m => m.id === this.selectedStudentMessageId);
        if (!message) {
            console.error('Message not found for reply');
            return;
        }

        // Set reply state — handle GIF/image messages with no text
        const isAdmin = message.senderId === 'admin';
        let replyText = message.text || message.message || '';
        if (!replyText && message.type === 'gif') replyText = '🎬 GIF';
        else if (!replyText && (message.gifUrl || message.gifPreviewUrl)) replyText = '🎬 GIF';
        else if (!replyText && message.imageUrl) replyText = '🖼️ Image';

        this.studentReplyTo = {
            id: this.selectedStudentMessageId,
            text: replyText,
            senderName: isAdmin ? (BroProAdmin.getDisplayName ? BroProAdmin.getDisplayName() : 'Bhai') : 'You',
            isAdmin: isAdmin
        };

        // Show reply preview
        this.showStudentReplyPreview();

        // Hide context menu
        this.hideStudentReplyMenu();

        // Focus the input
        const input = document.getElementById('studentMessageInput');
        if (input) input.focus();
    },

    showStudentReplyPreview() {
        // Remove existing preview
        let preview = document.getElementById('studentReplyPreview');
        if (!preview) {
            // Create the preview element
            const inputArea = document.querySelector('.bhai-input-area');
            if (!inputArea) return;

            preview = document.createElement('div');
            preview.id = 'studentReplyPreview';
            preview.className = 'student-reply-preview';
            inputArea.insertBefore(preview, inputArea.firstChild);
        }

        if (!this.studentReplyTo) return;

        const truncatedText = this.studentReplyTo.text.length > 60
            ? this.studentReplyTo.text.substring(0, 60) + '...'
            : this.studentReplyTo.text;

        preview.innerHTML = `
            <div class="reply-preview-indicator"></div>
            <div class="reply-preview-content">
                <span class="reply-preview-sender ${this.studentReplyTo.isAdmin ? 'admin' : ''}">${this.studentReplyTo.senderName}</span>
                <span class="reply-preview-text">${this.escapeHtml(truncatedText)}</span>
            </div>
            <button class="reply-preview-cancel" onclick="BroProAdmin.cancelStudentReply()">✕</button>
        `;

        preview.style.display = 'flex';
    },

    cancelStudentReply() {
        this.studentReplyTo = null;
        const preview = document.getElementById('studentReplyPreview');
        if (preview) preview.style.display = 'none';
    },

    scrollToStudentMessage(messageId) {
        const messageEl = document.querySelector(`[data-msg-id="${messageId}"]`);
        if (messageEl) {
            messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            messageEl.classList.add('highlight-msg');
            setTimeout(() => messageEl.classList.remove('highlight-msg'), 2000);
        }
    },

    // ============================================
    // EMOJI REACTIONS — Student-side (Talk to Bhai)
    // ============================================

    /**
     * Render reactions row HTML for a student chat message.
     */
    renderStudentReactions(reactions, messageId) {
        if (!reactions || typeof reactions !== 'object' || Object.keys(reactions).length === 0) {
            return '';
        }

        // Consolidate duplicate emoji variants (e.g., ❤️ vs ❤)
        const consolidated = window.EmojiNormalize?.reactions(reactions) || reactions;

        const user = firebase.auth().currentUser;
        const myId = user?.uid || '';

        let chips = '';
        for (const [emoji, userIds] of Object.entries(consolidated)) {
            if (!Array.isArray(userIds) || userIds.length === 0) continue;
            const hasReacted = userIds.includes(myId);
            const count = userIds.length;
            chips += `<button class="sr-reaction-chip ${hasReacted ? 'own' : ''}" 
                onclick="BroProAdmin.toggleStudentReaction('${emoji}', '${messageId}')" 
                title="${hasReacted ? 'Remove reaction' : 'Add reaction'}">
                <span class="sr-reaction-emoji">${emoji}</span>
                <span class="sr-reaction-count">${count}</span>
            </button>`;
        }

        return `<div class="sr-reactions-row">${chips}</div>`;
    },

    /**
     * Toggle emoji reaction on a student chat message.
     * Called from context menu (uses selectedStudentMessageId) or chip click (explicit msgId).
     */
    async toggleStudentReaction(emoji, msgId) {
        const messageId = msgId || this.selectedStudentMessageId;
        if (!messageId || !emoji) return;

        this.hideStudentReplyMenu();
        this.closeStudentEmojiPicker();

        const user = firebase.auth().currentUser;
        if (!user) return;

        const db = firebase.firestore();
        const reactorId = user.uid;

        // ── NORMALIZE EMOJI ── prevents duplicate keys from Unicode variants ──
        const EN = window.EmojiNormalize;
        const normalizedEmoji = EN?.emoji(emoji) || emoji;
        const fieldPath = `reactions.${normalizedEmoji}`;

        const msg = this.studentMessages?.find(m => m.id === messageId);
        if (!msg) return;

        // Gather reactors across ALL variant keys
        const currentReactors = EN ? EN.gatherReactors(msg.reactions || {}, emoji) : (msg.reactions?.[emoji] || []);
        const hasReacted = currentReactors.includes(reactorId);
        const variantKeys = EN ? EN.findVariantKeys(msg.reactions || {}, emoji) : [];
        const needsCleanup = variantKeys.length > 1 || (variantKeys.length === 1 && variantKeys[0] !== normalizedEmoji);

        // ── OPTIMISTIC UI UPDATE ──
        if (!msg.reactions) msg.reactions = {};
        variantKeys.forEach(key => delete msg.reactions[key]);
        if (hasReacted) {
            const filtered = currentReactors.filter(id => id !== reactorId);
            if (filtered.length > 0) msg.reactions[normalizedEmoji] = filtered;
        } else {
            msg.reactions[normalizedEmoji] = [...currentReactors, reactorId];
        }
        this.updateStudentReactionRow(messageId);

        // ── FIRESTORE WRITE ──
        try {
            const msgRef = db.collection('messages').doc(messageId);
            if (needsCleanup) {
                const updateObj = {};
                variantKeys.forEach(key => {
                    if (key !== normalizedEmoji) {
                        updateObj[`reactions.${key}`] = firebase.firestore.FieldValue.delete();
                    }
                });
                if (hasReacted) {
                    const filtered = currentReactors.filter(id => id !== reactorId);
                    updateObj[fieldPath] = filtered.length > 0 ? filtered : firebase.firestore.FieldValue.delete();
                } else {
                    updateObj[fieldPath] = [...currentReactors, reactorId];
                }
                await msgRef.update(updateObj);
            } else {
                if (hasReacted) {
                    await msgRef.update({ [fieldPath]: firebase.firestore.FieldValue.arrayRemove(reactorId) });
                } else {
                    await msgRef.update({ [fieldPath]: firebase.firestore.FieldValue.arrayUnion(reactorId) });
                }
            }
        } catch (error) {
            console.error('Error toggling student reaction:', error);
            // Revert on failure
            if (hasReacted) {
                if (!msg.reactions[normalizedEmoji]) msg.reactions[normalizedEmoji] = [];
                msg.reactions[normalizedEmoji].push(reactorId);
            } else {
                msg.reactions[normalizedEmoji] = currentReactors;
            }
            this.updateStudentReactionRow(messageId);
        }
    },

    /**
     * Re-render only the reaction row for a specific student chat message.
     */
    updateStudentReactionRow(messageId) {
        // Student chat uses multiple possible message class structures
        const msgEl = document.querySelector(`[data-msg-id="${messageId}"]`);
        if (!msgEl) return;

        const existingRow = msgEl.querySelector('.sr-reactions-row');
        if (existingRow) existingRow.remove();

        const msg = this.studentMessages?.find(m => m.id === messageId);
        const html = this.renderStudentReactions(msg?.reactions, messageId);
        if (html) {
            msgEl.insertAdjacentHTML('beforeend', html);
        }
    },

    /**
     * Full emoji picker for student chat reactions.
     */
    openStudentEmojiPicker() {
        const messageId = this.selectedStudentMessageId;
        if (!messageId) return;
        this.hideStudentReplyMenu();
        this.closeStudentEmojiPicker();

        const cats = {
            'Smileys': ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','💋','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🫡','🤐','🤨','😐','😑','😶','🫥','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐','😡','😤','😭','😢','😱','😨','😰','😥','😳','🤬','😈','👿','💀','☠️','👻','👽','🤖','💩','🤡'],
            'Gestures': ['👍','👎','👊','✊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','✌️','🤞','🫠','🤟','🤘','🤙','👈','👉','👆','👇','☝️','🫵','👋','🤚','🖐️','✋','🖖','💪','🦾','🫱','🫲'],
            'Hearts': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','❤️‍🔥','❤️‍🩹','♥️','🫀'],
            'Objects': ['🔥','⭐','🌟','✨','💫','💥','🔔','🎉','🎊','🎁','🏆','💎','💰','💡','📚','✏️','📝','💻','📱','⏰','🔑','🛡️','⚔️','🧲','🔮','🪄','🎀','📌','🚀','🛸','⚡','☀️','🌈','🌊','❄️','🍀','🌹','🌸','💐'],
            'Food': ['🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍒','🍑','🥭','🍍','🥥','🍕','🍔','🍟','🌭','🍿','🧁','🎂','🍰','🍩','🍪','🍫','🍬','🍭']
        };

        const picker = document.createElement('div');
        picker.id = 'srEmojiPicker';
        picker.className = 'gc-emoji-reaction-picker';

        const catNames = Object.keys(cats);
        const tabsHtml = catNames.map((cat, i) =>
            `<button class="gc-erp-tab ${i === 0 ? 'active' : ''}" data-cat="${cat}">${cats[cat][0]}</button>`
        ).join('');
        const gridHtml = cats[catNames[0]].map(e =>
            `<button class="gc-erp-emoji" onclick="BroProAdmin.toggleStudentReaction('${e}', '${messageId}')">${e}</button>`
        ).join('');

        picker.innerHTML = `
            <div class="gc-erp-overlay" onclick="BroProAdmin.closeStudentEmojiPicker()"></div>
            <div class="gc-erp-modal">
                <div class="gc-erp-header">
                    <input type="text" class="gc-erp-search" placeholder="Search emoji..." oninput="BroProAdmin.filterStudentEmojis(this.value, '${messageId}')">
                    <button class="gc-erp-close" onclick="BroProAdmin.closeStudentEmojiPicker()">✕</button>
                </div>
                <div class="gc-erp-tabs">${tabsHtml}</div>
                <div class="gc-erp-grid" id="srErpGrid">${gridHtml}</div>
            </div>
        `;
        document.body.appendChild(picker);
        this._srEmojiCats = cats;

        picker.querySelectorAll('.gc-erp-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                picker.querySelectorAll('.gc-erp-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById('srErpGrid').innerHTML = cats[tab.dataset.cat].map(e =>
                    `<button class="gc-erp-emoji" onclick="BroProAdmin.toggleStudentReaction('${e}', '${messageId}')">${e}</button>`
                ).join('');
                picker.querySelector('.gc-erp-search').value = '';
            });
        });
    },

    filterStudentEmojis(query, messageId) {
        const grid = document.getElementById('srErpGrid');
        if (!grid || !this._srEmojiCats) return;
        if (!query.trim()) {
            const first = Object.keys(this._srEmojiCats)[0];
            grid.innerHTML = this._srEmojiCats[first].map(e =>
                `<button class="gc-erp-emoji" onclick="BroProAdmin.toggleStudentReaction('${e}', '${messageId}')">${e}</button>`
            ).join('');
            return;
        }
        const allEmojis = Object.values(this._srEmojiCats).flat();
        const matched = window.EmojiSearch ? window.EmojiSearch.filter(allEmojis, this._srEmojiCats, query) : allEmojis;
        grid.innerHTML = matched.map(e =>
            `<button class="gc-erp-emoji" onclick="BroProAdmin.toggleStudentReaction('${e}', '${messageId}')">${e}</button>`
        ).join('');
    },

    closeStudentEmojiPicker() {
        const p = document.getElementById('srEmojiPicker');
        if (p) p.remove();
    },

    injectStudentReplyStyles() {
        if (document.getElementById('student-reply-styles')) return;

        const style = document.createElement('style');
        style.id = 'student-reply-styles';
        style.textContent = `
            /* ===== STUDENT CHAT EMOJI REACTIONS ===== */
            .sr-reactions-row {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                margin-top: 4px;
                padding: 0 4px;
            }
            .sr-reaction-chip {
                display: inline-flex;
                align-items: center;
                gap: 3px;
                padding: 2px 8px;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                cursor: pointer;
                font-size: 0.8rem;
                transition: all 0.2s ease;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
            }
            .sr-reaction-chip:hover {
                background: rgba(139, 92, 246, 0.2);
                border-color: rgba(139, 92, 246, 0.4);
                transform: scale(1.08);
            }
            .sr-reaction-chip:active { transform: scale(0.95); }
            .sr-reaction-chip.own {
                background: rgba(139, 92, 246, 0.25);
                border-color: rgba(139, 92, 246, 0.5);
                box-shadow: 0 0 8px rgba(139, 92, 246, 0.15);
            }
            .sr-reaction-emoji { font-size: 0.95rem; line-height: 1; }
            .sr-reaction-count {
                font-size: 0.7rem;
                color: rgba(255, 255, 255, 0.7);
                font-weight: 600;
                min-width: 8px;
                text-align: center;
            }
            .sr-reaction-chip.own .sr-reaction-count { color: rgba(255, 255, 255, 0.9); }

            /* Quick reaction bar in student reply menu */
            .sr-quick-react-bar {
                display: flex;
                gap: 2px;
                padding: 6px 8px;
                justify-content: center;
            }
            .sr-quick-react-btn {
                background: transparent;
                border: none;
                font-size: 1.35rem;
                cursor: pointer;
                padding: 4px 6px;
                border-radius: 8px;
                transition: all 0.15s ease;
                line-height: 1;
                -webkit-tap-highlight-color: transparent;
            }
            .sr-quick-react-btn:hover {
                background: rgba(139, 92, 246, 0.3);
                transform: scale(1.25);
            }
            .sr-quick-react-btn:active { transform: scale(0.9); }

            /* "+" button */
            .sr-react-plus {
                font-size: 1.1rem !important;
                font-weight: 700;
                color: rgba(255, 255, 255, 0.5);
                background: rgba(255, 255, 255, 0.08);
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                font-family: inherit;
            }
            .sr-react-plus:hover {
                background: rgba(139, 92, 246, 0.25) !important;
                color: white;
            }

            /* Shared emoji picker (gc- prefixed classes) */
            .gc-emoji-reaction-picker {
                position: fixed;
                inset: 0;
                z-index: 99999999;
                display: flex;
                align-items: flex-end;
                justify-content: center;
            }
            .gc-erp-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(4px);
            }
            .gc-erp-modal {
                position: relative;
                width: 100%;
                max-width: 380px;
                max-height: 55vh;
                background: linear-gradient(145deg, #1e1e3f, #12122a);
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 20px 20px 0 0;
                display: flex;
                flex-direction: column;
                box-shadow: 0 -10px 60px rgba(0, 0, 0, 0.5);
                animation: gcErpSlideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                overflow: hidden;
            }
            @keyframes gcErpSlideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            .gc-erp-header {
                display: flex;
                gap: 8px;
                padding: 14px 14px 8px;
                align-items: center;
            }
            .gc-erp-search {
                flex: 1;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 10px;
                padding: 8px 12px;
                color: white;
                font-size: 0.9rem;
                outline: none;
                font-family: inherit;
            }
            .gc-erp-search::placeholder { color: rgba(255, 255, 255, 0.35); }
            .gc-erp-search:focus { border-color: rgba(139, 92, 246, 0.5); }
            .gc-erp-close {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .gc-erp-close:hover { background: rgba(255, 100, 100, 0.3); }
            .gc-erp-tabs {
                display: flex;
                gap: 2px;
                padding: 4px 14px;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }
            .gc-erp-tabs::-webkit-scrollbar { display: none; }
            .gc-erp-tab {
                background: transparent;
                border: none;
                font-size: 1.3rem;
                cursor: pointer;
                padding: 6px 8px;
                border-radius: 8px;
                transition: background 0.15s;
                flex-shrink: 0;
                line-height: 1;
            }
            .gc-erp-tab.active { background: rgba(139, 92, 246, 0.3); }
            .gc-erp-tab:hover { background: rgba(139, 92, 246, 0.15); }
            .gc-erp-grid {
                display: grid;
                grid-template-columns: repeat(8, 1fr);
                gap: 4px;
                padding: 8px 14px 16px;
                overflow-y: auto;
                max-height: 35vh;
                -webkit-overflow-scrolling: touch;
            }
            .gc-erp-grid::-webkit-scrollbar { width: 4px; }
            .gc-erp-grid::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.3); border-radius: 2px; }
            .gc-erp-emoji {
                background: transparent;
                border: none;
                font-size: 1.6rem;
                cursor: pointer;
                padding: 6px;
                border-radius: 8px;
                transition: all 0.12s ease;
                line-height: 1;
                text-align: center;
            }
            .gc-erp-emoji:hover { background: rgba(139, 92, 246, 0.2); transform: scale(1.2); }
            .gc-erp-emoji:active { transform: scale(0.9); }

            .sr-context-divider {
                height: 1px;
                background: rgba(255, 255, 255, 0.1);
                margin: 2px 8px;
            }

            /* Reply Menu */
            .student-reply-menu {
                font-family: inherit;
            }
            .reply-menu-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                width: 100%;
                padding: 0.6rem 1rem;
                background: transparent;
                border: none;
                color: white;
                font-size: 0.9rem;
                cursor: pointer;
                border-radius: 8px;
                transition: all 0.2s;
            }
            .reply-menu-btn:hover {
                background: rgba(139, 92, 246, 0.3);
            }
            
            @keyframes fadeInScale {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            
            /* Reply Preview Bar */
            .student-reply-preview {
                display: none;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem 1rem;
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.1));
                border-left: 3px solid #8b5cf6;
                border-radius: 8px;
                margin-bottom: 0.75rem;
                animation: slideDown 0.2s ease-out;
            }
            
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .reply-preview-indicator {
                width: 4px;
                height: 100%;
                min-height: 30px;
                background: #8b5cf6;
                border-radius: 2px;
            }
            
            .reply-preview-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
                overflow: hidden;
            }
            
            .reply-preview-sender {
                font-size: 0.75rem;
                font-weight: 600;
                color: #a78bfa;
            }
            .reply-preview-sender.admin {
                color: #fbbf24;
            }
            
            .reply-preview-text {
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.7);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .reply-preview-cancel {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: rgba(255, 255, 255, 0.6);
                width: 28px;
                height: 28px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            .reply-preview-cancel:hover {
                background: rgba(255, 100, 100, 0.3);
                color: white;
            }
            
            /* Quoted Message in Chat */
            .quoted-reply {
                background: rgba(139, 92, 246, 0.1);
                border-left: 3px solid #8b5cf6;
                border-radius: 0 8px 8px 0;
                padding: 0.5rem 0.75rem;
                margin-bottom: 0.5rem;
                cursor: pointer;
                transition: background 0.2s;
            }
            .quoted-reply:hover {
                background: rgba(139, 92, 246, 0.2);
            }
            .quoted-reply.admin-quoted {
                border-left-color: #fbbf24;
                background: rgba(251, 191, 36, 0.1);
            }
            
            .quoted-reply-sender {
                font-size: 0.7rem;
                font-weight: 600;
                color: #a78bfa;
                margin-bottom: 0.15rem;
            }
            .quoted-reply.admin-quoted .quoted-reply-sender {
                color: #fbbf24;
            }
            
            .quoted-reply-text {
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.6);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            /* Message Highlight Animation */
            .chat-message.highlight-msg {
                animation: highlightPulse 2s ease-out;
            }
            
            @keyframes highlightPulse {
                0%, 100% { background-color: transparent; }
                25% { background-color: rgba(139, 92, 246, 0.3); }
                50% { background-color: rgba(139, 92, 246, 0.2); }
                75% { background-color: rgba(139, 92, 246, 0.1); }
            }
        `;
        document.head.appendChild(style);
        console.log('💬 Student reply styles injected');
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
        // 🛡️ SECURITY LAYER 1: Wait for Firebase Auth to resolve
        // Prevents race where currentUser is null (auth not restored yet),
        // causing the code to treat a logged-in user as a guest and skip password
        if (!this._authStateReady) {
            this._openChatAfterAuthReady();
            return;
        }

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

        // 🛡️ SECURITY LAYER 2: Wait for personalization data before opening chat
        // Prevents password bypass via race condition (clicking before Firestore loads)
        if (user && !this._personalizationLoaded) {
            this._openChatAfterPersonalizationLoad();
            return;
        }

        // 🔒 PASSWORD GATE — Check if this VIP student needs a password
        // Password is required on every page reload (in-memory flag resets on reload)
        if (user && this.customChatPassword && !this._chatPasswordVerified) {
            this._showPasswordGate();
            return;
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
                // Start listening for Bhai typing
                this._startBhaiTypingListener();
                // Setup typing detection on input
                this._setupStudentTypingDetection();
                // Mark messages as read
                this.markMessagesAsRead();
                // Initialize wallet display
                this.updateChatWalletDisplay();
                // Check image permission for this user
                this.checkImagePermission();
                // Reset to Real Bhai mode by default for logged-in users
                this.chatMode = 'real';
            }

            this.updateChatModeUI();

            // Apply custom chat name to all UI elements
            this.applyCustomChatName();

            // Note: VIP effects (celebrations, glow) are now admin-triggered on-demand
            // via chatEffects/{userId} — no auto-play on chat open

            // Hide the floating Bhai button when chat is open
            const bhaiContainer = document.querySelector('.bhai-container');
            if (bhaiContainer) {
                bhaiContainer.style.display = 'none';
            }

            // MOBILE FIX: Force correct layout on PHONES only
            // Tablets (768px+) use CSS media queries for centered card layout
            if (window.innerWidth <= 767) {
                const chatModal = document.querySelector('.bhai-chat-modal');
                const chatHeader = document.querySelector('.bhai-chat-header');
                const toggleBar = document.querySelector('.chat-mode-toggle-bar');
                const chatArea = document.querySelector('.bhai-chat-area');
                const inputArea = document.querySelector('.bhai-input-area');

                // Force modal overlay to not center (full-screen on phone)
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
            } else if (window.innerWidth <= 1366) {
                // TABLET: Let CSS handle the centered card layout
                // Only ensure the overlay centers the modal properly
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.padding = '0';
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
                    ">Login</a> for unlimited messages + Real ${this.getDisplayName()} chat!
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
                    <span class="mode-label" style="display: block !important;">Real ${this.getDisplayName()}</span>
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
            titleEl.textContent = this.chatMode === 'ai' ? 'Talk to BhAI 🤖' : `Talk to ${this.getDisplayName()}`;
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
                            <span style="color: rgba(255,255,255,0.8); font-size: 0.85rem;">Chat with Real ${this.getDisplayName()} (human tutor!)</span>
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

        // 🔒 Reset password verification — require password on every chat open
        this._chatPasswordVerified = false;

        // Show the floating Bhai button again when chat is closed
        const bhaiContainer = document.querySelector('.bhai-container');
        if (bhaiContainer) {
            bhaiContainer.style.display = 'block';
        }

        // Remove VIP accent glow when chat is closed
        if (window.VIPWelcome) VIPWelcome.removeAccentGlow();

        // Restore navbar on mobile when chat is closed
        if (window.innerWidth <= 768) {
            const mainNavbar = document.querySelector('.navbar');
            if (mainNavbar) {
                mainNavbar.style.display = '';
            }
        }

        // Cleanup chat messages listener
        if (this.unsubscribeStudentChat) {
            this.unsubscribeStudentChat();
            this.unsubscribeStudentChat = null;
        }

        // Cleanup effects/glow listener
        if (this._unsubscribeChatEffects) {
            this._unsubscribeChatEffects();
            this._unsubscribeChatEffects = null;
        }

        // Cleanup typing indicator
        this._clearStudentTypingState();
        this._stopBhaiTypingListener();
    },

    // ============================================
    // SECURITY LAYER 1: Wait for Firebase Auth to resolve
    // Prevents the case where currentUser is null because
    // auth hasn't restored yet → user treated as guest → password skipped
    // ============================================
    _openChatAfterAuthReady() {
        const bhaiBtn = document.querySelector('.bhai-btn');
        if (bhaiBtn) {
            bhaiBtn.style.pointerEvents = 'none';
            bhaiBtn.style.opacity = '0.7';
        }

        const MAX_WAIT = 5000; // 5 second max wait for auth
        const POLL_INTERVAL = 100;
        let elapsed = 0;

        const poll = setInterval(() => {
            elapsed += POLL_INTERVAL;

            if (this._authStateReady || elapsed >= MAX_WAIT) {
                clearInterval(poll);

                // Restore button
                if (bhaiBtn) {
                    bhaiBtn.style.pointerEvents = '';
                    bhaiBtn.style.opacity = '';
                }

                if (!this._authStateReady) {
                    console.log('⚠️ Auth state timeout — proceeding');
                    this._authStateReady = true;
                }

                // Re-enter openStudentChat with auth state now resolved
                this.openStudentChat();
            }
        }, POLL_INTERVAL);
    },

    // ============================================
    // SECURITY LAYER 2: Wait for personalization data before opening chat
    // Prevents password bypass via race condition on page load
    // ============================================
    _openChatAfterPersonalizationLoad() {
        // Show a brief loading state on the floating button
        const bhaiBtn = document.querySelector('.bhai-btn');
        const originalContent = bhaiBtn ? bhaiBtn.innerHTML : '';
        if (bhaiBtn) {
            bhaiBtn.style.pointerEvents = 'none';
            bhaiBtn.style.opacity = '0.7';
        }

        const MAX_WAIT = 3000; // 3 second max wait
        const POLL_INTERVAL = 100; // check every 100ms
        let elapsed = 0;

        const poll = setInterval(() => {
            elapsed += POLL_INTERVAL;

            if (this._personalizationLoaded || elapsed >= MAX_WAIT) {
                clearInterval(poll);

                // Restore button state
                if (bhaiBtn) {
                    bhaiBtn.innerHTML = originalContent;
                    bhaiBtn.style.pointerEvents = '';
                    bhaiBtn.style.opacity = '';
                }

                // If we hit the timeout, mark as loaded to prevent permanent blocking
                if (!this._personalizationLoaded) {
                    console.log('⚠️ Personalization load timeout — proceeding without password data');
                    this._personalizationLoaded = true;
                }

                // Now open chat — password check will run properly
                this.openStudentChat();
            }
        }, POLL_INTERVAL);
    },

    // ============================================
    // PASSWORD GATE — Premium lock screen for VIP chat
    // ============================================
    _showPasswordGate() {
        // Inject styles if not already present
        this._injectPasswordGateStyles();

        // Remove existing modal if any
        const existing = document.getElementById('bhaiPasswordGate');
        if (existing) existing.remove();

        const displayName = this.customChatName || 'Bhai';

        const modal = document.createElement('div');
        modal.id = 'bhaiPasswordGate';
        modal.className = 'pwd-gate-overlay';

        modal.innerHTML = `
            <div class="pwd-gate-container">
                <!-- Floating particles background -->
                <div class="pwd-gate-particles">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                </div>

                <!-- Lock icon -->
                <div class="pwd-gate-lock" id="pwdGateLockIcon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>

                <!-- Title -->
                <h2 class="pwd-gate-title">Enter your password</h2>

                <!-- Password input -->
                <div class="pwd-gate-input-wrap" id="pwdGateInputWrap">
                    <input type="password" id="pwdGateInput" class="pwd-gate-input"
                        placeholder="Enter password" autocomplete="off" maxlength="50"
                        onkeydown="if(event.key==='Enter'){event.preventDefault(); BroProAdmin._verifyPasswordGate()}">
                    <button type="button" class="pwd-gate-eye" id="pwdGateEye" onclick="BroProAdmin._togglePwdGateVisibility()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>

                <!-- Error message -->
                <p class="pwd-gate-error" id="pwdGateError"></p>

                <!-- Action buttons -->
                <div class="pwd-gate-actions">
                    <button class="pwd-gate-btn primary" id="pwdGateUnlockBtn" onclick="BroProAdmin._verifyPasswordGate()">
                        <span class="pwd-gate-btn-text">Unlock Chat</span>
                        <span class="pwd-gate-btn-icon">→</span>
                    </button>
                    <button class="pwd-gate-btn secondary" onclick="BroProAdmin._closePasswordGate()">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this._closePasswordGate();
        });

        // Animate in
        requestAnimationFrame(() => {
            modal.classList.add('active');
            // Focus the input after transition
            setTimeout(() => {
                const input = document.getElementById('pwdGateInput');
                if (input) input.focus();
            }, 400);
        });
    },

    _escapeHtmlPwd(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    _togglePwdGateVisibility() {
        const input = document.getElementById('pwdGateInput');
        const eyeBtn = document.getElementById('pwdGateEye');
        if (!input) return;

        if (input.type === 'password') {
            input.type = 'text';
            if (eyeBtn) eyeBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>`;
        } else {
            input.type = 'password';
            if (eyeBtn) eyeBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>`;
        }
    },

    _verifyPasswordGate() {
        const input = document.getElementById('pwdGateInput');
        const errorEl = document.getElementById('pwdGateError');
        const inputWrap = document.getElementById('pwdGateInputWrap');
        const lockIcon = document.getElementById('pwdGateLockIcon');
        const unlockBtn = document.getElementById('pwdGateUnlockBtn');

        if (!input) return;

        const enteredPassword = input.value.trim();

        if (!enteredPassword) {
            if (errorEl) {
                errorEl.textContent = 'Please enter a password';
                errorEl.classList.add('visible');
            }
            if (inputWrap) inputWrap.classList.add('shake');
            setTimeout(() => { if (inputWrap) inputWrap.classList.remove('shake'); }, 600);
            return;
        }

        if (enteredPassword === this.customChatPassword) {
            // ✅ SUCCESS — Mark as verified
            this._chatPasswordVerified = true;

            const user = firebase.auth().currentUser;
            if (user) {
                // Password verified — stored in-memory only (resets on page reload)
            }

            // Success animation
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('visible');
            }
            if (lockIcon) lockIcon.classList.add('unlocked');
            if (unlockBtn) {
                unlockBtn.classList.add('success');
                const btnText = unlockBtn.querySelector('.pwd-gate-btn-text');
                const btnIcon = unlockBtn.querySelector('.pwd-gate-btn-icon');
                if (btnText) btnText.textContent = 'Unlocked!';
                if (btnIcon) btnIcon.textContent = '✓';
            }

            // Wait for animation then open chat
            setTimeout(() => {
                this._closePasswordGate();
                // Now open the chain — password is verified, won't re-trigger gate
                this.openStudentChat();
            }, 900);

        } else {
            // ❌ WRONG PASSWORD
            if (errorEl) {
                errorEl.textContent = 'Incorrect password. Try again.';
                errorEl.classList.add('visible');
            }
            if (inputWrap) inputWrap.classList.add('shake');
            if (lockIcon) lockIcon.classList.add('wrong');

            setTimeout(() => {
                if (inputWrap) inputWrap.classList.remove('shake');
                if (lockIcon) lockIcon.classList.remove('wrong');
            }, 600);

            // Clear input and refocus
            input.value = '';
            input.focus();
        }
    },

    _closePasswordGate() {
        const modal = document.getElementById('bhaiPasswordGate');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 350);
        }
    },

    _injectPasswordGateStyles() {
        if (document.getElementById('bhaiPasswordGateStyles')) return;

        const style = document.createElement('style');
        style.id = 'bhaiPasswordGateStyles';
        style.textContent = `
            /* Password Gate Overlay */
            .pwd-gate-overlay {
                position: fixed;
                inset: 0;
                z-index: 100000;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                opacity: 0;
                transition: opacity 0.35s ease;
                padding: 1rem;
            }
            .pwd-gate-overlay.active {
                opacity: 1;
            }

            /* Container */
            .pwd-gate-container {
                position: relative;
                background: linear-gradient(145deg, rgba(26, 20, 50, 0.95), rgba(15, 12, 35, 0.98));
                border: 1px solid rgba(139, 92, 246, 0.25);
                border-radius: 24px;
                padding: 2.5rem 2rem 2rem;
                max-width: 380px;
                width: 100%;
                text-align: center;
                overflow: hidden;
                box-shadow:
                    0 25px 60px rgba(0, 0, 0, 0.5),
                    0 0 40px rgba(139, 92, 246, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05);
                transform: scale(0.9) translateY(20px);
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .pwd-gate-overlay.active .pwd-gate-container {
                transform: scale(1) translateY(0);
            }

            /* Floating particles */
            .pwd-gate-particles {
                position: absolute;
                inset: 0;
                overflow: hidden;
                pointer-events: none;
            }
            .pwd-gate-particles span {
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(139, 92, 246, 0.4);
                border-radius: 50%;
                animation: pwdParticleFloat 6s infinite ease-in-out;
            }
            .pwd-gate-particles span:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
            .pwd-gate-particles span:nth-child(2) { left: 80%; top: 15%; animation-delay: 1.5s; animation-duration: 7s; }
            .pwd-gate-particles span:nth-child(3) { left: 50%; top: 70%; animation-delay: 3s; animation-duration: 5s; }
            .pwd-gate-particles span:nth-child(4) { left: 20%; top: 80%; animation-delay: 0.8s; animation-duration: 8s; }
            .pwd-gate-particles span:nth-child(5) { left: 70%; top: 60%; animation-delay: 2s; }
            .pwd-gate-particles span:nth-child(6) { left: 90%; top: 40%; animation-delay: 4s; animation-duration: 6s; }

            @keyframes pwdParticleFloat {
                0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
                50% { transform: translateY(-15px) scale(1.5); opacity: 0.7; }
            }

            /* Lock Icon */
            .pwd-gate-lock {
                width: 64px;
                height: 64px;
                margin: 0 auto 1.2rem;
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.1));
                border: 2px solid rgba(139, 92, 246, 0.3);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(168, 132, 252, 0.9);
                transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                animation: pwdLockPulse 3s infinite ease-in-out;
            }
            .pwd-gate-lock svg {
                width: 28px;
                height: 28px;
            }
            .pwd-gate-lock.unlocked {
                background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.2));
                border-color: rgba(34, 197, 94, 0.5);
                color: #4ade80;
                transform: scale(1.15);
                animation: none;
                box-shadow: 0 0 30px rgba(34, 197, 94, 0.3);
            }
            .pwd-gate-lock.wrong {
                border-color: rgba(239, 68, 68, 0.5);
                color: #ef4444;
                animation: none;
            }

            @keyframes pwdLockPulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.15); }
                50% { box-shadow: 0 0 20px 5px rgba(139, 92, 246, 0.1); }
            }

            /* Title */
            .pwd-gate-title {
                font-family: 'Inter', 'Segoe UI', sans-serif;
                font-size: 1.4rem;
                font-weight: 700;
                color: #fff;
                margin: 0 0 0.3rem;
                letter-spacing: -0.02em;
            }
            .pwd-gate-subtitle {
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.5);
                margin: 0 0 1.5rem;
                line-height: 1.4;
            }

            /* Input wrapper */
            .pwd-gate-input-wrap {
                position: relative;
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.06);
                border: 1.5px solid rgba(139, 92, 246, 0.25);
                border-radius: 14px;
                overflow: hidden;
                transition: all 0.3s ease;
                margin-bottom: 0.5rem;
            }
            .pwd-gate-input-wrap:focus-within {
                border-color: rgba(139, 92, 246, 0.6);
                background: rgba(255, 255, 255, 0.08);
                box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
            }
            .pwd-gate-input-wrap.shake {
                animation: pwdShake 0.5s ease;
                border-color: rgba(239, 68, 68, 0.5);
            }
            @keyframes pwdShake {
                0%, 100% { transform: translateX(0); }
                15% { transform: translateX(-8px); }
                30% { transform: translateX(8px); }
                45% { transform: translateX(-6px); }
                60% { transform: translateX(6px); }
                75% { transform: translateX(-3px); }
                90% { transform: translateX(3px); }
            }

            .pwd-gate-input {
                flex: 1;
                background: transparent;
                border: none;
                outline: none;
                color: #fff;
                font-size: 1rem;
                padding: 0.9rem 1rem;
                font-family: 'Inter', 'Segoe UI', sans-serif;
                letter-spacing: 0.05em;
            }
            .pwd-gate-input::placeholder {
                color: rgba(255, 255, 255, 0.3);
                letter-spacing: 0;
            }

            /* Eye toggle */
            .pwd-gate-eye {
                background: transparent;
                border: none;
                padding: 0.8rem;
                cursor: pointer;
                color: rgba(255, 255, 255, 0.4);
                transition: color 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .pwd-gate-eye:hover {
                color: rgba(255, 255, 255, 0.8);
            }

            /* Error message */
            .pwd-gate-error {
                font-size: 0.8rem;
                color: #ef4444;
                min-height: 1.2rem;
                margin: 0 0 0.8rem;
                opacity: 0;
                transform: translateY(-5px);
                transition: all 0.3s ease;
            }
            .pwd-gate-error.visible {
                opacity: 1;
                transform: translateY(0);
            }

            /* Action buttons */
            .pwd-gate-actions {
                display: flex;
                flex-direction: column;
                gap: 0.6rem;
            }
            .pwd-gate-btn {
                border: none;
                border-radius: 12px;
                padding: 0.85rem 1.5rem;
                font-size: 0.95rem;
                font-weight: 600;
                font-family: 'Inter', 'Segoe UI', sans-serif;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
            .pwd-gate-btn.primary {
                background: linear-gradient(135deg, #7c3aed, #6d28d9);
                color: #fff;
                box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
            }
            .pwd-gate-btn.primary:hover {
                background: linear-gradient(135deg, #8b5cf6, #7c3aed);
                transform: translateY(-1px);
                box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
            }
            .pwd-gate-btn.primary.success {
                background: linear-gradient(135deg, #22c55e, #16a34a) !important;
                box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
                pointer-events: none;
            }
            .pwd-gate-btn.secondary {
                background: rgba(255, 255, 255, 0.06);
                color: rgba(255, 255, 255, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .pwd-gate-btn.secondary:hover {
                background: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.8);
            }
            .pwd-gate-btn-icon {
                font-size: 1.1rem;
                transition: transform 0.3s;
            }
            .pwd-gate-btn.primary:hover .pwd-gate-btn-icon {
                transform: translateX(3px);
            }

            /* Mobile adjustments */
            @media (max-width: 480px) {
                .pwd-gate-container {
                    padding: 2rem 1.5rem 1.5rem;
                    border-radius: 20px;
                    margin: 0 0.5rem;
                }
                .pwd-gate-lock {
                    width: 56px;
                    height: 56px;
                }
                .pwd-gate-lock svg {
                    width: 24px;
                    height: 24px;
                }
                .pwd-gate-title {
                    font-size: 1.2rem;
                }
            }
        `;

        document.head.appendChild(style);
    },

    // Student loads their chat
    async loadStudentChatHistory() {
        if (!this.db) return;

        const user = firebase.auth().currentUser;
        if (!user) return;

        const chatContainer = document.getElementById('studentChatMessages');
        const welcomeScreen = document.getElementById('bhaiWelcomeScreen');

        if (!chatContainer) return;

        console.log(`💬 Loading chat for: ${user.uid}`);

        let chatClearedAt = null;
        try {
            const userDoc = await this.db.collection('users').doc(user.uid).get();
            if (userDoc.exists && userDoc.data().chatClearedAt) {
                chatClearedAt = new Date(userDoc.data().chatClearedAt);
            }
        } catch (e) {
            console.log('⚠️ Could not fetch chatClearedAt from Firebase');
        }

        if (this.unsubscribeStudentChat) {
            this.unsubscribeStudentChat();
        }

        try {
            let receivedMessages = [];
            let sentMessages = [];
            let lastRenderedIds = new Set();
            let lastReactionHashes = new Map();

            // ── Helper: generate the HTML string for a single message ──
            const renderStudentMessageHtml = (msg) => {
                const isAdmin = msg.senderId === 'admin';
                const isAI = msg.isAI === true;
                const isAIResponse = msg.messageType === 'ai' || msg.senderId === 'bhai-ai';

                let quotedHtml = '';
                if (msg.replyTo && (msg.replyTo.text || msg.replyTo.id)) {
                    const replyDisplayText = msg.replyTo.text || '🎬 GIF';
                    const quotedText = replyDisplayText.length > 50 ? replyDisplayText.substring(0, 50) + '...' : replyDisplayText;
                    quotedHtml = `
                        <div class="quoted-reply ${msg.replyTo.isAdmin ? 'admin-quoted' : ''}" 
                             onclick="BroProAdmin.scrollToStudentMessage('${msg.replyTo.id}')" title="Click to see original">
                            <div class="quoted-reply-sender">${this.escapeHtml(msg.replyTo.senderName)}</div>
                            <div class="quoted-reply-text">${this.escapeHtml(quotedText)}</div>
                        </div>
                    `;
                }

                // Reactions rendered inline with the message
                const reactionsHtml = (msg.reactions && Object.keys(msg.reactions).length > 0)
                    ? this.renderStudentReactions(msg.reactions, msg.id)
                    : '';

                if (isAI) {
                    if (isAIResponse) {
                        return `
                            <div class="bhai-chat-bubble bhai-bubble ai-response" data-msg-id="${msg.id}">
                                ${quotedHtml}
                                <div class="bubble-avatar"><img src="/assets/bhai-avatar.png" alt="BhAI" class="avatar-img"><span class="ai-badge">🤖</span></div>
                                <div class="bubble-content"><p class="bubble-text">${this.formatAIResponse(msg.message || msg.text || '')}</p></div>
                                <span class="bubble-time">${this.formatTime(msg.timestamp)}</span>
                                ${reactionsHtml}
                            </div>
                        `;
                    } else {
                        return `
                            <div class="bhai-chat-bubble user-bubble" data-msg-id="${msg.id}">
                                ${quotedHtml}
                                <div class="bubble-content"><p class="bubble-text">${this.escapeHtml(msg.message || msg.text || '')}</p></div>
                                <span class="bubble-time">${this.formatTime(msg.timestamp)}</span>
                                ${reactionsHtml}
                            </div>
                        `;
                    }
                } else {
                    if (msg.type === 'gif' && (msg.gifUrl || msg.gifPreviewUrl)) {
                        const gifClass = isAdmin ? 'admin-message' : 'user-message';
                        const gifBubbleHtml = window.BroProGifPicker ? BroProGifPicker.renderGifBubble(msg) : `<div class="gif-chat-bubble"><img src="${msg.gifUrl || msg.gifPreviewUrl}" alt="GIF" style="max-width:250px;border-radius:12px"><span class="gif-badge">GIF</span></div>`;
                        const captionHtml = msg.text ? `<div class="message-content">${window.renderMessageContent ? renderMessageContent(msg.text) : this.escapeHtml(msg.text)}</div>` : '';
                        return `
                            <div class="chat-message ${gifClass}" data-msg-id="${msg.id}">
                                ${quotedHtml}
                                ${isAdmin ? '<div class="admin-badge">👑 ' + this.getDisplayName() + '</div>' : ''}
                                ${captionHtml}
                                ${gifBubbleHtml}
                                <div class="message-time">${this.formatTime(msg.timestamp)}</div>
                                ${reactionsHtml}
                            </div>
                        `;
                    } else if (msg.imageUrl) {
                        const imgClass = isAdmin ? 'admin-message' : 'user-message';
                        const textContent = msg.text ? `<div class="message-content">${this.escapeHtml(msg.text)}</div>` : '';
                        const hdBadge = msg.imageQuality === 'fullhd' ? '<span class="quality-badge hd">HD</span>' : '';
                        return `
                            <div class="chat-message ${imgClass}" data-msg-id="${msg.id}">
                                ${quotedHtml}
                                ${isAdmin ? '<div class="admin-badge">👑 ' + this.getDisplayName() + '</div>' : ''}
                                <div class="chat-image-bubble" onclick="BroProAdmin.openFullscreenImage('${msg.imageUrl}')">
                                    <img src="${msg.imageUrl}" alt="Image" loading="lazy">
                                    ${hdBadge}
                                </div>
                                ${textContent}
                                <div class="message-time">${this.formatTime(msg.timestamp)}</div>
                                ${reactionsHtml}
                            </div>
                        `;
                    } else {
                        const emojiInfo = detectEmojiOnlyMessage(msg.text);
                        let content = '';
                        let msgClass = isAdmin ? 'admin-message' : 'user-message';
                        if (emojiInfo.isEmojiOnly) {
                            msgClass += ' emoji-message';
                            if (emojiInfo.count === 1) msgClass += ' emoji-single';
                            else if (emojiInfo.count <= 3) msgClass += ' emoji-few';
                            else msgClass += ' emoji-many';
                            msgClass += ` emoji-type-${emojiInfo.type}`;
                            content = `<div class="message-content emoji-content">${this.escapeHtml(msg.text || '')}</div>`;
                        } else {
                            content = window.renderMessageContent ? renderMessageContent(msg.text || '') : this.escapeHtml(msg.text || '');
                            content = `<div class="message-content">${content}</div>`;
                        }

                        let h = `<div class="chat-message ${msgClass}" data-msg-id="${msg.id}">`;
                        h += quotedHtml;
                        if (isAdmin) {
                            h += '<div class="admin-badge">👑 ' + this.getDisplayName() + '</div>';
                        }
                        h += content;
                        h += '<div class="message-time">' + this.formatTime(msg.timestamp) + '</div>';
                        h += reactionsHtml;
                        h += '</div>';
                        return h;
                    }
                }
            };

            // ── Helper: compute a lightweight hash of a reactions object ──
            const reactionHash = (reactions) => {
                if (!reactions || typeof reactions !== 'object') return '';
                try {
                    // Deterministic key order for comparison
                    const keys = Object.keys(reactions).sort();
                    return keys.map(k => `${k}:${(reactions[k] || []).slice().sort().join(',')}`).join('|');
                } catch (_) { return ''; }
            };

            const updateCombinedStudentMessages = () => {
                // ── 1. Filter messages (same logic as before) ──
                const allMessages = [...receivedMessages, ...sentMessages];
                let filteredMessages = chatClearedAt
                    ? allMessages.filter(msg => msg.timestamp > chatClearedAt)
                    : allMessages;

                if (this.chatMode === 'ai') {
                    filteredMessages = filteredMessages.filter(msg => msg.isAI === true);
                } else {
                    filteredMessages = filteredMessages.filter(msg => msg.isAI !== true);
                }

                // ── 2. Welcome screen toggle ──
                if (filteredMessages.length === 0) {
                    if (welcomeScreen) {
                        welcomeScreen.style.opacity = '1';
                        welcomeScreen.style.zIndex = '2';
                        welcomeScreen.style.display = 'flex';
                    }
                    chatContainer.innerHTML = '';
                    lastRenderedIds.clear();
                    lastReactionHashes.clear();
                    return;
                }

                if (welcomeScreen) {
                    welcomeScreen.style.opacity = '0';
                    setTimeout(() => {
                        welcomeScreen.style.zIndex = '-1';
                        welcomeScreen.style.display = 'none';
                    }, 300);
                }

                // ── 3. Deduplicate & sort ──
                const uniqueMessages = Array.from(
                    new Map(filteredMessages.map(m => [m.id, m])).values()
                );
                uniqueMessages.sort((a, b) => a.timestamp - b.timestamp);

                this.studentMessages = uniqueMessages;

                // ── 4. Compute current ID set & detect changes ──
                const currentIds = new Set(uniqueMessages.map(m => m.id));
                let hasNewMessages = false;

                // Smart scroll: check if user is near the bottom BEFORE mutating DOM
                const scrollThreshold = 80; // px from bottom
                const wasNearBottom = (chatContainer.scrollTop + chatContainer.clientHeight) >=
                    (chatContainer.scrollHeight - scrollThreshold);

                // ── 5. REMOVE: messages no longer present ──
                for (const oldId of lastRenderedIds) {
                    if (!currentIds.has(oldId)) {
                        const el = chatContainer.querySelector(`[data-msg-id="${oldId}"]`);
                        if (el) el.remove();
                        lastReactionHashes.delete(oldId);
                    }
                }

                // ── 6. ADD new messages & UPDATE reactions for existing ones ──
                // Build a lookup for quick positional insertion
                const msgById = new Map(uniqueMessages.map(m => [m.id, m]));

                uniqueMessages.forEach((msg, idx) => {
                    const existingEl = chatContainer.querySelector(`[data-msg-id="${msg.id}"]`);

                    if (!existingEl) {
                        // ── NEW message: create DOM element & insert at correct position ──
                        hasNewMessages = true;
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = renderStudentMessageHtml(msg);
                        const newNode = tempDiv.firstElementChild;

                        // Find the correct insertion point (the element of the next message in sorted order)
                        let inserted = false;
                        for (let j = idx + 1; j < uniqueMessages.length; j++) {
                            const nextEl = chatContainer.querySelector(`[data-msg-id="${uniqueMessages[j].id}"]`);
                            if (nextEl) {
                                chatContainer.insertBefore(newNode, nextEl);
                                inserted = true;
                                break;
                            }
                        }
                        if (!inserted) {
                            chatContainer.appendChild(newNode);
                        }

                        // Track reaction hash for this new message
                        lastReactionHashes.set(msg.id, reactionHash(msg.reactions));
                    } else {
                        // ── EXISTING message: check if reactions changed ──
                        const newHash = reactionHash(msg.reactions);
                        const oldHash = lastReactionHashes.get(msg.id) || '';

                        if (newHash !== oldHash) {
                            // Remove old reaction row if present
                            const oldReactionRow = existingEl.querySelector('.sr-reactions-row');
                            if (oldReactionRow) oldReactionRow.remove();

                            // Insert new reaction row if reactions exist
                            if (msg.reactions && Object.keys(msg.reactions).length > 0) {
                                const reactionsHtml = this.renderStudentReactions(msg.reactions, msg.id);
                                if (reactionsHtml) {
                                    existingEl.insertAdjacentHTML('beforeend', reactionsHtml);
                                }
                            }

                            lastReactionHashes.set(msg.id, newHash);
                        }
                    }
                });

                // ── 7. Update tracking state ──
                lastRenderedIds = currentIds;

                // ── 8. Re-bind event handlers (idempotent) ──
                this.injectStudentReplyStyles();
                this.setupStudentChatReply();

                // ── 9. Smart scroll: only scroll if new messages arrived or user was near bottom ──
                if (hasNewMessages || wasNearBottom) {
                    this.scrollChatToBottom(chatContainer);
                }
            };

            const unsubscribeReceived = this.db.collection('messages')
                .where('recipientId', '==', user.uid)
                .onSnapshot((snapshot) => {
                    receivedMessages = [];
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
                        receivedMessages.push({ id: doc.id, ...data, timestamp });
                    });
                    updateCombinedStudentMessages();
                }, (error) => {
                    console.error('❌ Student chat received error:', error);
                });

            const unsubscribeSent = this.db.collection('messages')
                .where('senderId', '==', user.uid)
                .onSnapshot((snapshot) => {
                    sentMessages = [];
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
                        sentMessages.push({ id: doc.id, ...data, timestamp });
                    });
                    updateCombinedStudentMessages();
                }, (error) => {
                    console.error('❌ Student chat sent error:', error);
                });

            this.unsubscribeStudentChat = () => {
                unsubscribeReceived();
                unsubscribeSent();
            };

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
            input.style.height = 'auto'; // Reset textarea height
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
            input.style.height = 'auto'; // Reset textarea height
            input.focus();

            // Clear typing indicator immediately on send
            this._clearStudentTypingState();

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
                // Real Bhai Mode - Send to Firebase with reply support

                // ═══ GIF URL AUTO-DETECTION (VIP/Personalised students only) ═══
                const gifDetection = this._studentIsVIP
                    ? window.BroProFormatter?.detectGifUrl?.(text)
                    : null;

                let messageData;

                if (gifDetection?.hasGif && gifDetection.gifUrl) {
                    // VIP student pasted a GIF link → convert to proper GIF message
                    messageData = {
                        senderId: user.uid,
                        senderName: senderName,
                        recipientId: 'admin',
                        type: 'gif',
                        gifUrl: gifDetection.gifUrl,
                        gifPreviewUrl: gifDetection.gifUrl,
                        gifWidth: 280,
                        gifHeight: 200,
                        text: gifDetection.remainingText || '',
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        read: false,
                        mode: 'real'
                    };
                } else {
                    // Regular text message
                    messageData = {
                        senderId: user.uid,
                        senderName: senderName,
                        recipientId: 'admin',
                        text: text,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        read: false,
                        mode: 'real'
                    };
                }

                // Add reply data if replying to a message
                if (this.studentReplyTo) {
                    messageData.replyTo = {
                        id: this.studentReplyTo.id,
                        text: this.studentReplyTo.text,
                        senderName: this.studentReplyTo.senderName,
                        isAdmin: this.studentReplyTo.isAdmin
                    };
                    // Clear reply state
                    this.cancelStudentReply();
                }

                await this.db.collection('messages').add(messageData);

                console.log(gifDetection?.hasGif
                    ? '✅ GIF message sent to Real Bhai (auto-detected from link)'
                    : '✅ Message sent to Real Bhai');
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
    // REAL-TIME TYPING INDICATOR SYSTEM
    // Premium WhatsApp-style typing detection
    // Uses presence/{userId} Firestore documents
    // ============================================
    TYPING_DEBOUNCE_MS: 2000,    // Min interval between Firestore writes
    TYPING_TIMEOUT_MS: 5000,     // Auto-clear after 5s of no typing
    TYPING_STALE_MS: 10000,      // Consider typing stale after 10s

    /**
     * Called on every input event of the student message textarea.
     * Debounces Firestore writes and auto-clears after inactivity.
     * Only active in 'real' chat mode (not AI mode).
     */
    onStudentTyping() {
        // Only track typing for Real Bhai mode (AI has local indicator)
        if (this.chatMode !== 'real') return;

        const user = firebase.auth().currentUser;
        if (!user || !this.db) return;

        // Reset the auto-clear timeout on every keystroke
        clearTimeout(this._typingTimeout);
        this._typingTimeout = setTimeout(() => {
            this._typingActive = false;
            this._setStudentTypingState(false);
        }, this.TYPING_TIMEOUT_MS);

        // Debounce: only write to Firestore at most every TYPING_DEBOUNCE_MS
        if (this._typingActive) return; // Already notified, waiting for debounce

        this._typingActive = true;
        this._setStudentTypingState(true);

        // Set debounce cooldown — prevent re-writing for TYPING_DEBOUNCE_MS
        clearTimeout(this._typingDebounceTimer);
        this._typingDebounceTimer = setTimeout(() => {
            this._typingActive = false;
        }, this.TYPING_DEBOUNCE_MS);
    },

    /**
     * Writes or clears typing state in Firestore presence document.
     * Uses merge to avoid overwriting other presence fields.
     */
    _setStudentTypingState(isTyping) {
        const user = firebase.auth().currentUser;
        if (!user || !this.db) return;

        const presenceRef = this.db.collection('presence').doc(user.uid);

        if (isTyping) {
            presenceRef.set({
                typing: {
                    recipientId: 'admin',
                    timestamp: Date.now()
                }
            }, { merge: true }).catch(e =>
                console.warn('⌨️ Typing state write failed:', e.message)
            );
        } else {
            presenceRef.set({
                typing: firebase.firestore.FieldValue.delete()
            }, { merge: true }).catch(e =>
                console.warn('⌨️ Typing state clear failed:', e.message)
            );
        }
    },

    /**
     * Immediately clears typing state — called on message send and chat close.
     * Also clears all local timers.
     */
    _clearStudentTypingState() {
        clearTimeout(this._typingTimeout);
        clearTimeout(this._typingDebounceTimer);
        this._typingActive = false;
        this._setStudentTypingState(false);
    },

    /**
     * Starts listening for admin (Bhai) typing state.
     * Listens to presence/admin document for typing field.
     * Shows/hides the typing indicator in the chat UI.
     */
    _startBhaiTypingListener() {
        // Stop any existing listener
        this._stopBhaiTypingListener();

        const user = firebase.auth().currentUser;
        if (!user || !this.db) return;

        // Only listen in Real Bhai mode
        if (this.chatMode !== 'real') return;

        console.log('\u2328\ufe0f Starting Bhai typing listener');

        // First check if admin has disabled typing indicator for this user
        this._bhaiTypingEnabled = true; // Default: enabled

        // Helper: extract toggle state from doc data (handles both formats)
        const _getToggleState = (data, uid) => {
            // New format: nested toggles map
            const toggles = data?.toggles || {};
            if (toggles.hasOwnProperty(uid)) {
                return toggles[uid] !== false;
            }
            // Legacy format: dot-notation key at top level
            const dotKey = `toggles.${uid}`;
            if (data.hasOwnProperty(dotKey)) {
                return data[dotKey] !== false;
            }
            return true; // Default: enabled
        };

        this.db.collection('settings').doc('typingIndicator').get()
            .then(doc => {
                if (doc.exists) {
                    this._bhaiTypingEnabled = _getToggleState(doc.data(), user.uid);
                }
            })
            .catch(() => { /* Silent fail, default to enabled */ });

        // Also listen for real-time toggle changes
        this._typingToggleListener = this.db.collection('settings')
            .doc('typingIndicator')
            .onSnapshot(doc => {
                if (doc.exists) {
                    this._bhaiTypingEnabled = _getToggleState(doc.data(), user.uid);
                    // If just disabled, immediately hide any visible indicator
                    if (!this._bhaiTypingEnabled) {
                        this._hideBhaiTyping();
                    }
                }
            }, () => { /* Silent fail */ });

        this._bhaiTypingListener = this.db.collection('presence')
            .doc('admin')
            .onSnapshot((doc) => {
                if (!doc.exists) {
                    this._hideBhaiTyping();
                    return;
                }

                const data = doc.data();
                const typing = data?.typing;

                // Check if admin is typing TO this specific user,
                // the timestamp isn't stale, AND the toggle is enabled
                if (typing &&
                    typing.recipientId === user.uid &&
                    Date.now() - typing.timestamp < this.TYPING_STALE_MS &&
                    this._bhaiTypingEnabled) {
                    this._showBhaiTyping();

                    // Set up a stale-check that will hide the indicator
                    // if the admin stops updating the timestamp
                    this._startTypingStaleCheck(typing.timestamp);
                } else {
                    this._hideBhaiTyping();
                }
            }, (error) => {
                console.warn('\u2328\ufe0f Bhai typing listener error:', error.message);
            });
    },

    /**
     * Periodically checks if the typing timestamp has gone stale.
     * This handles the case where Firestore doesn't fire a new snapshot
     * but the timestamp is now older than TYPING_STALE_MS.
     */
    _startTypingStaleCheck(lastTimestamp) {
        clearInterval(this._typingStaleCheckInterval);
        this._typingStaleCheckInterval = setInterval(() => {
            if (Date.now() - lastTimestamp >= this.TYPING_STALE_MS) {
                this._hideBhaiTyping();
                clearInterval(this._typingStaleCheckInterval);
                this._typingStaleCheckInterval = null;
            }
        }, 2000); // Check every 2 seconds
    },

    /**
     * Stops the Bhai typing listener and cleans up all resources.
     */
    _stopBhaiTypingListener() {
        if (this._bhaiTypingListener) {
            this._bhaiTypingListener();
            this._bhaiTypingListener = null;
        }
        if (this._typingToggleListener) {
            this._typingToggleListener();
            this._typingToggleListener = null;
        }
        clearInterval(this._typingStaleCheckInterval);
        this._typingStaleCheckInterval = null;
        this._hideBhaiTyping();
    },

    /**
     * Shows the typing indicator UI in the chat.
     * Also updates the header status text (WhatsApp-style).
     */
    _showBhaiTyping() {
        const indicator = document.getElementById('bhaiTypingIndicator');
        const statusText = document.getElementById('bhaiStatusText');
        const statusDot = document.getElementById('bhaiStatusDot');
        const label = document.getElementById('bhaiTypingLabel');
        const chatArea = document.querySelector('.bhai-chat-area');

        // Update the label with custom chat name if set
        const displayName = this.customChatName || 'Bhai';
        if (label) label.textContent = `${displayName} is typing`;

        if (indicator && indicator.style.display === 'none') {
            indicator.style.display = 'flex';

            // Auto-scroll to show the typing indicator
            if (chatArea) {
                requestAnimationFrame(() => {
                    chatArea.scrollTop = chatArea.scrollHeight;
                });
            }
        }

        // Update header status (WhatsApp-style)
        if (statusText) {
            statusText.textContent = 'typing...';
            statusText.style.fontStyle = 'italic';
        }
        if (statusDot) {
            statusDot.style.background = '#a855f7'; // Purple for typing
        }
    },

    /**
     * Hides the typing indicator UI.
     * Restores the header status text to 'Online'.
     */
    _hideBhaiTyping() {
        const indicator = document.getElementById('bhaiTypingIndicator');
        const statusText = document.getElementById('bhaiStatusText');
        const statusDot = document.getElementById('bhaiStatusDot');

        if (indicator) indicator.style.display = 'none';

        // Restore header status only if we're in real mode
        if (this.chatMode === 'real') {
            if (statusText) {
                statusText.textContent = 'Online';
                statusText.style.fontStyle = 'normal';
            }
            if (statusDot) {
                statusDot.style.background = '#10b981'; // Green for online
            }
        }
    },

    /**
     * Sets up the input event listener on the student textarea.
     * Called once when the chat module initializes.
     * Uses _typingListenerAttached flag to prevent double-binding.
     */
    _setupStudentTypingDetection() {
        const input = document.getElementById('studentMessageInput');
        if (!input || input._typingListenerAttached) return;

        input.addEventListener('input', () => {
            this.onStudentTyping();
        });

        // Also clear typing when input is emptied
        input.addEventListener('change', () => {
            if (!input.value.trim()) {
                this._clearStudentTypingState();
            }
        });

        input._typingListenerAttached = true;
        console.log('⌨️ Student typing detection initialized');
    },

    // ============================================
    // STUDENT IMAGE MESSAGING SYSTEM
    // ============================================
    MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10 MB
    pendingStudentImage: null,
    studentCanSendImages: false,
    studentImageQuality: 'compressed', // 'compressed' or 'fullhd'

    // Select quality for student image
    selectStudentQuality(quality, element) {
        this.studentImageQuality = quality;

        // Update UI
        document.querySelectorAll('.student-quality-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        if (element) {
            element.classList.add('selected');
        }

        console.log(`📷 Student image quality set to: ${quality}`);
    },

    // Check if current user has image permission
    async checkImagePermission() {
        const user = firebase.auth().currentUser;
        if (!user) {
            this.studentCanSendImages = false;
            return;
        }

        try {
            const doc = await this.db.collection('leaderboard').doc(user.uid).get();
            if (doc.exists) {
                this.studentCanSendImages = doc.data().canSendImages || false;
            } else {
                this.studentCanSendImages = false;
            }

            // Show/hide image menu item based on permission
            const imageMenuItem = document.getElementById('studentImgMenuItem');
            if (imageMenuItem) {
                imageMenuItem.style.display = this.studentCanSendImages ? 'flex' : 'none';
            }

            // Also check VIP status
            this.setupStudentVIPStatus();

            console.log(`📷 Image permission: ${this.studentCanSendImages ? 'Granted' : 'Denied'}`);
        } catch (e) {
            console.error('Error checking image permission:', e);
            this.studentCanSendImages = false;
        }
    },

    // Determine if student is VIP (personalized) and show VIP menu items
    setupStudentVIPStatus() {
        // User is VIP if they have a custom chat name set by admin
        this._studentIsVIP = !!(this.customChatName && this.customChatName !== 'Bhai');

        // Load current glow state from the chatEffects listener data
        // (Already being tracked by setupChatEffectsListener)

        // Show/hide GIF picker based on VIP status (same gate as Send Effect)
        const gifMenuItem = document.getElementById('studentGifMenuItem');
        if (gifMenuItem) {
            gifMenuItem.style.display = this._studentIsVIP ? 'flex' : 'none';
        }

        // Render VIP menu items (Send Effect, Glow, etc.)
        this.updateStudentVIPMenu();

        console.log(`👑 VIP status: ${this._studentIsVIP ? 'YES' : 'No'}`);
    },

    // Trigger file input for student
    triggerStudentImageUpload() {
        if (!this.studentCanSendImages) {
            this.showToast('error', '❌ You don\'t have permission to send images');
            return;
        }

        const fileInput = document.getElementById('studentImageFileInput');
        if (fileInput) {
            fileInput.value = '';
            fileInput.click();
        }
    },

    // Handle student image selection
    handleStudentImageSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            this.showToast('error', '❌ Please select an image file');
            return;
        }

        if (file.size > this.MAX_IMAGE_SIZE) {
            this.showToast('error', '❌ Image too large! Max size is 10 MB.');
            return;
        }

        this.pendingStudentImage = file;
        this.openStudentImagePreview(file);
    },

    // Open student image preview
    openStudentImagePreview(file) {
        const modal = document.getElementById('studentImagePreviewModal');
        const previewImg = document.getElementById('studentImagePreviewImg');
        const sizeInfo = document.getElementById('studentImageSizeInfo');

        if (!modal || !previewImg) return;

        const objectUrl = URL.createObjectURL(file);
        previewImg.src = objectUrl;
        sizeInfo.textContent = `Size: ${this.formatStudentFileSize(file.size)}`;

        modal.classList.add('active');
    },

    // Close student image preview
    closeStudentImagePreview() {
        const modal = document.getElementById('studentImagePreviewModal');
        if (modal) modal.classList.remove('active');

        const previewImg = document.getElementById('studentImagePreviewImg');
        if (previewImg && previewImg.src.startsWith('blob:')) {
            URL.revokeObjectURL(previewImg.src);
        }
        this.pendingStudentImage = null;

        // Reset quality to default
        this.studentImageQuality = 'compressed';
        document.querySelectorAll('.student-quality-option').forEach((opt, i) => {
            opt.classList.toggle('selected', i === 0); // First option is compressed
        });
    },

    // Send student image (with quality selection: compressed or fullhd)
    async sendStudentImage() {
        const user = firebase.auth().currentUser;
        if (!user || !this.pendingStudentImage) {
            this.showToast('error', '❌ Please login and select an image');
            return;
        }

        if (!this.studentCanSendImages) {
            this.showToast('error', '❌ You don\'t have permission to send images');
            return;
        }

        const sendBtn = document.querySelector('.student-image-send-btn');
        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<span>⏳</span> Uploading...';
        }

        // Image costs ₹3 (same as regular message + ₹1 for storage)
        const cost = 3;
        const profile = window.BroProPlayer?.load() || {};
        const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
        const earnedFromXP = Math.floor((profile.xp || 0) / divisor);
        const addedViaPurchase = profile.walletAdded || 0;
        const spent = profile.walletSpent || 0;
        const currentBalance = Math.max(0, earnedFromXP + addedViaPurchase - spent);

        if (currentBalance < cost) {
            if (window.BroProWallet) {
                BroProWallet.showInsufficientFunds(cost, currentBalance, 'image_send');
            } else {
                this.showToast('error', `❌ Insufficient balance (₹${cost} needed)`);
            }
            if (sendBtn) {
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<span>📤</span> Send Image';
            }
            return;
        }

        try {
            // Determine upload based on quality selection
            let fileToUpload;
            let qualitySuffix;

            if (this.studentImageQuality === 'fullhd') {
                // Full HD - use original file
                fileToUpload = this.pendingStudentImage;
                qualitySuffix = 'fullhd';
                console.log(`🖼️ Sending Full HD: ${this.formatStudentFileSize(this.pendingStudentImage.size)}`);
            } else {
                // Compressed - compress the image
                fileToUpload = await this.compressStudentImage(this.pendingStudentImage);
                qualitySuffix = 'compressed';
                console.log(`📦 Compressed: ${this.formatStudentFileSize(this.pendingStudentImage.size)} → ${this.formatStudentFileSize(fileToUpload.size)}`);
            }

            // Generate filename with quality indicator
            const timestamp = Date.now();
            const ext = this.pendingStudentImage.name.split('.').pop() || 'jpg';
            const filename = `chat-images/${user.uid}/${timestamp}_${qualitySuffix}.${ext}`;

            // Upload to Firebase Storage
            const storage = firebase.storage();
            const storageRef = storage.ref(filename);
            const uploadTask = storageRef.put(fileToUpload);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`📤 Upload: ${progress.toFixed(0)}%`);
                },
                (error) => {
                    console.error('Upload error:', error);
                    this.showToast('error', '❌ Upload failed');
                    if (sendBtn) {
                        sendBtn.disabled = false;
                        sendBtn.innerHTML = '<span>📤</span> Send Image';
                    }
                },
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                    // Deduct wallet
                    profile.walletSpent = (profile.walletSpent || 0) + cost;
                    window.BroProPlayer?.save(profile);
                    this.updateChatWalletDisplay();

                    // Sync to Firestore
                    if (this.db) {
                        const walletData = { walletSpent: profile.walletSpent };
                        this.db.collection('presence').doc(user.uid).set(walletData, { merge: true }).catch(e => console.error(e));
                        this.db.collection('leaderboard').doc(user.uid).set(walletData, { merge: true }).catch(e => console.error(e));
                    }

                    // Create message
                    const messageData = {
                        senderId: user.uid,
                        senderName: user.displayName || profile.name || 'Student',
                        recipientId: 'admin',
                        text: '',
                        imageUrl: downloadURL,
                        imageQuality: qualitySuffix,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        read: false,
                        mode: 'real'
                    };

                    // Add reply if exists
                    if (this.studentReplyTo) {
                        messageData.replyTo = {
                            id: this.studentReplyTo.id,
                            text: this.studentReplyTo.text,
                            senderName: this.studentReplyTo.senderName,
                            isAdmin: this.studentReplyTo.isAdmin
                        };
                        this.cancelStudentReply();
                    }

                    await this.db.collection('messages').add(messageData);

                    console.log('✅ Image sent!');
                    this.showToast('success', '✅ Image sent!');

                    this.closeStudentImagePreview();
                    this.loadStudentChatHistory();

                    if (sendBtn) {
                        sendBtn.disabled = false;
                        sendBtn.innerHTML = '<span>📤</span> Send Image';
                    }
                }
            );

        } catch (error) {
            console.error('Error sending image:', error);
            this.showToast('error', '❌ Failed to send image');
            if (sendBtn) {
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<span>📤</span> Send Image';
            }
        }
    },

    // Compress student image
    async compressStudentImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    let width = img.width;
                    let height = img.height;
                    const maxDim = 1200;

                    if (width > maxDim || height > maxDim) {
                        if (width > height) {
                            height = (height / width) * maxDim;
                            width = maxDim;
                        } else {
                            width = (width / height) * maxDim;
                            height = maxDim;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
                        } else {
                            reject(new Error('Compression failed'));
                        }
                    }, 'image/jpeg', 0.8);
                };
                img.onerror = () => reject(new Error('Image load failed'));
                img.src = e.target.result;
            };
            reader.onerror = () => reject(new Error('File read failed'));
            reader.readAsDataURL(file);
        });
    },

    // Format file size
    formatStudentFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    },

    // Open fullscreen image viewer
    openFullscreenImage(imageUrl) {
        const viewer = document.getElementById('fullscreenImageViewer');
        const img = document.getElementById('fullscreenImage');

        if (viewer && img) {
            img.src = imageUrl;
            viewer.classList.add('active');
        }
    },

    // Close fullscreen image viewer
    closeFullscreenImage() {
        const viewer = document.getElementById('fullscreenImageViewer');
        if (viewer) viewer.classList.remove('active');
    },

    /**
     * Smart scroll to bottom that handles lazy-loaded images
     * Scrolls immediately and then re-scrolls when images load
     * This fixes the issue where chat scrolls to image instead of latest message
     */
    scrollChatToBottom(container) {
        if (!container) return;

        // Prevent browser from restoring previous scroll position
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Force scroll to bottom immediately (no smooth scroll on initial load)
        const scrollToEnd = () => {
            container.scrollTop = container.scrollHeight + 1000; // Extra buffer
        };

        // Immediate scroll
        scrollToEnd();

        // Get all images in the container
        const images = container.querySelectorAll('img');

        if (images.length === 0) {
            // No images, just do a final scroll after a short delay
            setTimeout(scrollToEnd, 50);
            return;
        }

        // Track pending images
        let pendingImages = 0;

        images.forEach(img => {
            // If image is not yet loaded
            if (!img.complete) {
                pendingImages++;

                const scrollOnLoad = () => {
                    pendingImages--;
                    // Scroll to bottom after each image loads
                    scrollToEnd();
                };

                // Handle both load and error
                img.addEventListener('load', scrollOnLoad, { once: true });
                img.addEventListener('error', scrollOnLoad, { once: true });
            }
        });

        // Multiple scroll attempts to combat browser scroll restoration
        // This ensures we always end up at the bottom
        setTimeout(scrollToEnd, 50);
        setTimeout(scrollToEnd, 150);
        setTimeout(scrollToEnd, 300);

        // If all images are already loaded, still do extra scrolls
        if (pendingImages === 0) {
            setTimeout(scrollToEnd, 500);
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

    // ============================================
    // BHAI PERSONALIZATION - Get User Data & Admin Notes
    // ============================================
    async getPersonalizationData(userId) {
        try {
            if (!this.db || !userId) return { userData: null, adminNotes: '' };

            // Get user data from leaderboard (name, level, xp)
            const leaderboardDoc = await this.db.collection('leaderboard').doc(userId).get();
            let userData = null;

            if (leaderboardDoc.exists) {
                const data = leaderboardDoc.data();
                const profile = window.BroProPlayer?.load() || {};
                const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
                const earnedFromXP = Math.floor((data.xp || profile.xp || 0) / divisor);
                const walletBalance = Math.max(0, earnedFromXP + (data.walletAdded || 0) - (data.walletSpent || 0));

                userData = {
                    name: data.name || profile.name || 'Student',
                    level: data.level || profile.level || 1,
                    xp: data.xp || profile.xp || 0,
                    walletBalance: walletBalance
                };
            } else {
                // Fallback to local profile
                const profile = window.BroProPlayer?.load() || {};
                if (profile.name) {
                    userData = {
                        name: profile.name,
                        level: profile.level || 1,
                        xp: profile.xp || 0
                    };
                }
            }

            // Get admin notes from userProfiles collection
            let adminNotes = '';
            try {
                const profileDoc = await this.db.collection('userProfiles').doc(userId).get();
                if (profileDoc.exists) {
                    adminNotes = profileDoc.data().adminNotes || '';
                }
            } catch (e) {
                // userProfiles collection may not exist yet - that's ok
                console.log('No admin notes found for user');
            }

            console.log('📦 Personalization data loaded:', { userData, hasAdminNotes: !!adminNotes });
            return { userData, adminNotes };

        } catch (error) {
            console.error('Error fetching personalization data:', error);
            return { userData: null, adminNotes: '' };
        }
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

        // Build quoted reply HTML if user is replying
        let quotedHtml = '';
        if (this.studentReplyTo) {
            const quotedText = this.studentReplyTo.text.length > 50
                ? this.studentReplyTo.text.substring(0, 50) + '...'
                : this.studentReplyTo.text;
            quotedHtml = `
                <div class="quoted-reply ${this.studentReplyTo.isAdmin ? 'admin-quoted' : ''}" 
                     onclick="BroProAdmin.scrollToStudentMessage('${this.studentReplyTo.id}')"
                     title="Click to see original">
                    <div class="quoted-reply-sender">${this.escapeHtml(this.studentReplyTo.senderName)}</div>
                    <div class="quoted-reply-text">${this.escapeHtml(quotedText)}</div>
                </div>
            `;
            // Clear reply state after using
            this.cancelStudentReply();
        }

        // Show user's message immediately
        const userMsgHtml = `
            <div class="bhai-chat-bubble user-bubble">
                ${quotedHtml}
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

            // 🎯 PERSONALIZATION: Fetch user data and admin notes
            const personalizationData = await this.getPersonalizationData(user.uid);

            // Prepare validated config
            const safeConfig = this.schoolConfig || {};
            console.log("📤 Sending BhAI Context:", safeConfig, "Personalization:", personalizationData); // Debug log

            // CLIENT-SIDE RETRY LOGIC - Try up to 3 times
            let data = null;
            let lastError = null;
            const maxRetries = 3;

            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    console.log(`🔄 BhAI API attempt ${attempt}/${maxRetries}...`);

                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout for logged-in users

                    // 🔐 SECURITY: Get auth token for server-side admin verification
                    const authToken = await this.getAuthToken();
                    const headers = {
                        'Content-Type': 'application/json',
                    };
                    // Only add Authorization header if we have a token
                    if (authToken) {
                        headers['Authorization'] = `Bearer ${authToken}`;
                    }

                    const response = await fetch('/api/bhai-ai', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                            message: text,
                            conversationHistory: this.aiConversationHistory.slice(-10),
                            schoolConfig: safeConfig,
                            // Note: isAdmin is now verified server-side via the auth token
                            // We still send it for backwards compatibility, but server doesn't trust it
                            isAdmin: !!this.isAdmin,
                            roastMode: isRoastMode,
                            // 🎯 PERSONALIZATION DATA
                            userData: personalizationData.userData,
                            adminNotes: personalizationData.adminNotes
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

    /**
     * Security: Validate URL is from a trusted source (HTTPS only).
     * Prevents tracking pixel injection via GIF/image URLs.
     */
    _isSafeUrl(url) {
        if (!url || typeof url !== 'string') return false;
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'https:';
        } catch {
            return false;
        }
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

    // Helper to render avatar (handles emoji, URL, and premium avatars)
    getAvatarHtml(avatar, size = '2rem') {
        if (!avatar) return '🐼';

        // Check if it's a URL (Google profile picture)
        if (this.isHttpUrl(avatar)) {
            return '<img src="' + this.escapeAttr(avatar) + '" alt="Avatar" style="width: ' + size + '; height: ' + size + '; border-radius: 50%; object-fit: cover;" referrerpolicy="no-referrer">';
        }

        // List of premium avatar names
        const premiumAvatars = [
            'ambedkar', 'apj-kalam', 'aryabhata', 'bhagat-singh', 'bhai',
            'black-rock-bhain', 'buddha', 'chanakya', 'cv-raman', 'gandhi',
            'guru-nanak', 'hanuman', 'jawaharlal-nehru', 'kalpana-chawla',
            'krishna', 'lal-bahadur-shastri', 'maharana-pratap', 'maulana-azad',
            'nelson-mandela', 'netaji', 'rani-lakshmibai', 'ratan-tata',
            'sardar-patel', 'savitribai-phule', 'shivaji-maharaj', 'shri-ram',
            'tipu-sultan', 'vikram-sarabhai', 'vivekananda'
        ];

        // Check if it's a premium avatar name
        if (typeof avatar === 'string' && premiumAvatars.includes(avatar.toLowerCase())) {
            const avatarName = avatar.toLowerCase();
            return `<img src="assets/avatars/${avatarName}-avatar.png" 
                         alt="${avatarName}" 
                         class="premium-avatar-img" 
                         style="width: ${size}; height: ${size}; border-radius: 50%; object-fit: cover; object-position: center top; border: 2px solid #f59e0b; box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);"
                         onerror="this.outerHTML='🐼'">`;
        }

        // It's an emoji
        return avatar;
    },

    isHttpUrl(value) {
        return typeof value === 'string' && /^https?:\/\//i.test(value.trim());
    },

    escapeAttr(text) {
        return this.escapeHtml(text).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },

    getIdentityAvatarHtml(user, size = '2.5rem') {
        const identity = user || {};
        const photoURL = identity.photoURL || identity.googlePhotoURL || identity.providerPhotoURL ||
            (this.isHttpUrl(identity.avatar) ? identity.avatar : null);
        const initial = this.getIdentityInitial(identity);
        const label = this.escapeAttr(`${identity.name || identity.displayName || identity.email || 'User'} profile`);
        const fallback = `<span class="identity-avatar-initial" ${photoURL ? 'hidden' : ''} style="width: ${size}; height: ${size}; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: ${this.getIdentityAvatarColor(identity)}; color: #fff; font-size: ${this.getIdentityFontSize(size)}; font-weight: 800; line-height: 1; box-shadow: inset 0 0 0 2px rgba(255,255,255,0.14);">${this.escapeHtml(initial)}</span>`;

        if (!photoURL) {
            return fallback;
        }

        return `<img src="${this.escapeAttr(photoURL)}" alt="${label}" style="width: ${size}; height: ${size}; border-radius: 50%; object-fit: cover; background: rgba(255,255,255,0.08);" referrerpolicy="no-referrer" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false;">${fallback}`;
    },

    getIdentityInitial(user) {
        const source = (user.name || user.displayName || user.googleName || user.email || 'User').trim();
        const firstToken = source.includes('@') ? source.split('@')[0] : source.split(/\s+/)[0];
        return (firstToken.charAt(0) || 'U').toUpperCase();
    },

    getIdentityAvatarColor(user) {
        const key = `${user.email || ''}${user.name || user.displayName || user.googleName || ''}`;
        const palette = [
            'linear-gradient(135deg, #2e7d32, #43a047)',
            'linear-gradient(135deg, #1565c0, #1e88e5)',
            'linear-gradient(135deg, #6a1b9a, #8e24aa)',
            'linear-gradient(135deg, #ad1457, #d81b60)',
            'linear-gradient(135deg, #00695c, #00897b)',
            'linear-gradient(135deg, #ef6c00, #fb8c00)'
        ];
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = ((hash << 5) - hash) + key.charCodeAt(i);
            hash |= 0;
        }
        return palette[Math.abs(hash) % palette.length];
    },

    getIdentityFontSize(size) {
        const match = String(size).match(/^([\d.]+)(rem|px)$/);
        if (!match) return '1.25rem';
        const value = Number(match[1]);
        return `${Math.max(value * 0.48, 0.9)}${match[2]}`;
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    formatTime(date) {
        if (!date) return '';

        // Convert various timestamp formats to Date object
        let dateObj;
        if (date instanceof Date) {
            dateObj = date;
        } else if (date && typeof date.toDate === 'function') {
            // Firestore Timestamp
            dateObj = date.toDate();
        } else if (typeof date === 'number') {
            // Unix timestamp in milliseconds
            dateObj = new Date(date);
        } else if (date && date.seconds) {
            // Firestore Timestamp object with seconds property
            dateObj = new Date(date.seconds * 1000);
        } else {
            // Try to parse as date string
            dateObj = new Date(date);
        }

        // Check if valid date
        if (isNaN(dateObj.getTime())) return '';

        const now = new Date();
        const diff = now - dateObj;

        // Handle negative diff (future time) or very small diff
        if (diff < 0) return 'Just now';

        // Less than 60 seconds
        if (diff < 60000) {
            const secs = Math.floor(diff / 1000);
            return secs < 10 ? 'Just now' : `${secs}s ago`;
        }

        // Less than 1 hour - show minutes
        if (diff < 3600000) {
            const mins = Math.floor(diff / 60000);
            return `${mins}m ago`;
        }

        // Less than 24 hours - show hours
        if (diff < 86400000) {
            const hours = Math.floor(diff / 3600000);
            return `${hours}h ago`;
        }

        // Less than 7 days - show days
        if (diff < 604800000) {
            const days = Math.floor(diff / 86400000);
            return `${days}d ago`;
        }

        // Older than 7 days - show date
        return dateObj.toLocaleDateString();
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
    setVal('settingCompassionStories', config.compassionStories);

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
                    <textarea id="settingHoliday" rows="3" placeholder="" style="background: rgba(255,255,255,0.05); color: white; border-color: rgba(255,255,255,0.1);"></textarea>
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
                
                <div class="auth-field">
                    <label style="color: #cbd5e1;">📖 Compassion Stories (Real-life examples)</label>
                    <textarea id="settingCompassionStories" rows="6" placeholder="Stories of compassion in action (e.g., The Pothole Story)..." style="background: rgba(255,255,255,0.05); color: white; border-color: rgba(255,255,255,0.1);"></textarea>
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
        compassionStories: getVal('settingCompassionStories'),
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
                        // Re-hide the student emoji container
                        if (type === 'student') {
                            const container = document.querySelector('.bhai-input-area .emoji-picker-container');
                            if (container) container.style.display = 'none';
                        }
                    }
                });
            }, 100);
        } else {
            // Picker was toggled off directly — hide container
            if (type === 'student') {
                const container = document.querySelector('.bhai-input-area .emoji-picker-container');
                if (container) container.style.display = 'none';
            }
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
        // Re-hide student emoji container
        if (type === 'student') {
            const container = document.querySelector('.bhai-input-area .emoji-picker-container');
            if (container) container.style.display = 'none';
        }

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
    // Check for emoji marker format - USE NON-GREEDY REGEX
    const match = text.match(/^\{\{EMOJI:(.+?):(.+?)\}\}$/);
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
// This is the CORE function for premium emoji display + WhatsApp-style formatting
function renderMessageContent(text) {
    if (!text) return '';

    // Use the centralized BroProFormatter for premium WhatsApp-style formatting
    // It handles: emoji markers, emoji-only detection, bold, italic, strike, 
    // code, lists, links, and more
    if (window.BroProFormatter) {
        return BroProFormatter.format(text);
    }

    // Fallback if formatter not loaded yet
    // FIRST: Check for {{EMOJI:X:animation}} marker format (from admin emoji picker)
    const markerMatch = text.match(/^\{\{EMOJI:(.+?):(.+?)\}\}$/);
    if (markerMatch) {
        const emoji = markerMatch[1];
        const animation = markerMatch[2];
        return `<div class="premium-emoji-display">
            <span class="premium-emoji ${animation}">${emoji}</span>
        </div>`;
    }

    // SECOND: Check for animated emoji (from EMOJI_ANIMATIONS map)
    const emojiData = isAnimatedEmoji(text);
    if (emojiData) {
        return `<div class="premium-emoji-display">
            <span class="premium-emoji ${emojiData.animation}">${emojiData.emoji}</span>
        </div>`;
    }

    // THIRD: Check if it's pure emoji (no text, just emojis)
    const emojiInfo = detectEmojiOnlyMessage(text);
    if (emojiInfo.isEmojiOnly) {
        return `<div class="premium-emoji-display emoji-type-${emojiInfo.type}">
            <span class="premium-emoji">${text}</span>
        </div>`;
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
// PREMIUM EMOJI ANIMATION SYSTEM 💎
// Ultra-premium animated emojis for user-side chat
// Matches admin panel quality
// ============================================

// Detect emoji-only messages with TYPE detection
function detectEmojiOnlyMessage(text) {
    if (!text) return { isEmojiOnly: false, count: 0, type: 'default' };

    // Comprehensive emoji regex - includes newer Unicode ranges for modern emojis
    // Covers: 🫶 (heart hands U+1FAF6), 🫡 (saluting face U+1FAE1), etc.
    const emojiRegex = /(?:[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDFFF]|[\u2600-\u26FF]|[\u2300-\u23FF]|\uD83C[\uDF00-\uDFFF]|[\u200D\uFE0F])+/g;

    const textWithoutEmojis = text.replace(emojiRegex, '').replace(/\s/g, '');
    const isEmojiOnly = textWithoutEmojis.length === 0 && text.trim().length > 0;
    const matches = text.match(emojiRegex);
    const count = matches ? matches.length : 0;

    // Detect emoji TYPE for custom animations
    // Expanded coverage for more emojis
    let type = 'default';

    // Hearts - realistic heartbeat animation
    if (/[❤️🧡💛💚💙💜🖤🤍💗💖💝💘💕💓💔❣️🫀💞💟🫶]/u.test(text)) {
        type = 'heart';
    }
    // Fire/explosion - flickering glow
    else if (/[🔥💥✨⚡🌟⭐💫🎇🎆💢]/u.test(text)) {
        type = 'fire';
    }
    // Celebration - party bounce
    else if (/[🎉🎊🥳🎁🎈🎀🪅🎄🎃🎂🍾🥂🏆🏅🎖️🥇🎯🎰🎮🕹️]/u.test(text)) {
        type = 'celebration';
    }
    // Thumbs/gestures - wave animation  
    else if (/[👍👎✌️🤙👋🤟👊✋🖐️🖖🤘🤞✊🤛🤜👆👇👉👈🫵]/u.test(text)) {
        type = 'gesture';
    }
    // Sad/crying - trembling animation
    else if (/[😢😭😿💔😥😰🥺😞😔😣😩😫😖😓🥲]/u.test(text)) {
        type = 'sad';
    }
    // Laughing - shaking with joy
    else if (/[😂🤣😆😅😁😄😃🤪😜😝😹🙃😛🤭]/u.test(text)) {
        type = 'laugh';
    }
    // Love faces - floating hearts effect
    else if (/[😍🥰😘😻💋🥵🤩😚🥴]/u.test(text)) {
        type = 'love';
    }
    // Clap/applause - bounce animation
    else if (/[👏🙌🤝]/u.test(text)) {
        type = 'clap';
    }
    // Rocket/speed - fly up animation
    else if (/[🚀🛸🛩️✈️🚁🎢]/u.test(text)) {
        type = 'rocket';
    }
    // Crown/royalty - shine animation
    else if (/[👑💎💰🏆🥇🎖️🏅🥈🥉]/u.test(text)) {
        type = 'crown';
    }
    // Pray/spiritual - gentle float
    else if (/[🙏📿✝️☪️🕉️☮️🕋🛕🕌🕍⛪🛐]/u.test(text)) {
        type = 'pray';
    }
    // Muscle/strength - flex animation
    else if (/[💪🦾🤌🤏✌️🏋️🏃🤸🧗🏊⛹️]/u.test(text)) {
        type = 'muscle';
    }
    // Cool/sunglasses - smooth sway
    else if (/[😎🥶🆒🧊☃️❄️🌊🏔️]/u.test(text)) {
        type = 'cool';
    }
    // Money - sparkle animation
    else if (/[💵💴💶💷💸🤑💲💰🪙💳]/u.test(text)) {
        type = 'money';
    }
    // Skull/death - shake
    else if (/[💀☠️👻🎃👽🤖]/u.test(text)) {
        type = 'skull';
    }
    // India/flag - wave flag animation
    else if (/[🇮🇳🇧🇷🇺🇸🇬🇧🇯🇵🇰🇷🇨🇳🇫🇷🇩🇪🇮🇹🇪🇸🇷🇺🇦🇺🇨🇦]/u.test(text)) {
        type = 'flag';
    }
    // 100/perfect - pulse animation
    else if (/[💯🔟🔢🔝⬆️📈📊✅]/u.test(text)) {
        type = 'hundred';
    }

    return { isEmojiOnly, count, type };
}

// Inject premium emoji animation styles
function injectPremiumEmojiStyles() {
    if (document.getElementById('premiumEmojiAnimStyles')) return;

    const style = document.createElement('style');
    style.id = 'premiumEmojiAnimStyles';
    style.textContent = `
        /* ===== ULTRA-PREMIUM EMOJI ANIMATIONS ===== */
        
        /* Base emoji message - transparent background */
        .chat-message.big-emoji-message,
        .chat-message.emoji-message {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 12px 8px !important;
            text-align: center !important;
        }
        
        .chat-message.big-emoji-message .message-content,
        .chat-message.emoji-message .message-content {
            background: transparent !important;
            text-align: center !important;
            font-size: 5rem !important;
            line-height: 1.2 !important;
            overflow: visible !important;
        }
        
        /* ===== PREMIUM EMOJI DISPLAY - THE CORE STYLES ===== */
        .premium-emoji-display {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 0.5rem 0 !important;
            background: transparent !important;
        }
        
        .premium-emoji {
            display: inline-block !important;
            font-size: 6rem !important;
            line-height: 1 !important;
            text-align: center !important;
            filter: drop-shadow(0 0 25px rgba(255, 200, 100, 0.6)) !important;
            animation: premiumFloat 2s ease-in-out infinite !important;
        }
        
        @keyframes premiumFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        
        /* When inside message, remove bubble background */
        .chat-message:has(.premium-emoji-display),
        .admin-message:has(.premium-emoji-display),
        .user-message:has(.premium-emoji-display) {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
        }
        
        /* Emoji content specific */
        .message-content.emoji-content {
            font-size: 5rem !important;
            display: inline-block;
            animation: none; /* Reset base animation */
        }
        
        /* Animated emoji wrapper - HUGE */
        .emoji-animated {
            display: inline-block;
            font-size: 5rem !important;
            line-height: 1 !important;
            filter: drop-shadow(0 0 20px rgba(255, 200, 100, 0.5));
        }
        
        /* ===== ANIMATION TYPES ===== */
        
        /* Heartbeat */
        .emoji-animated.heartbeat,
        .premium-emoji.heartbeat,
        .chat-message.emoji-type-heart .message-content,
        .chat-message.emoji-type-heart .emoji-content,
        .chat-message.emoji-type-heart .premium-emoji {
            animation: emojiHeartbeat 1.2s ease-in-out infinite !important;
            filter: drop-shadow(0 0 25px rgba(255, 0, 80, 0.7)) !important;
        }
        
        @keyframes emojiHeartbeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.3); }
            28% { transform: scale(1); }
            42% { transform: scale(1.2); }
            56% { transform: scale(1); }
            100% { transform: scale(1); }
        }
        
        /* Flame/Fire */
        .emoji-animated.flame,
        .premium-emoji.flame,
        .chat-message.emoji-type-fire .message-content,
        .chat-message.emoji-type-fire .emoji-content,
        .chat-message.emoji-type-fire .premium-emoji {
            animation: emojiFlame 0.15s ease-in-out infinite alternate !important;
            filter: drop-shadow(0 0 30px rgba(255, 80, 0, 0.9)) !important;
        }
        
        @keyframes emojiFlame {
            0% { transform: scale(1) rotate(-2deg); }
            100% { transform: scale(1.08) rotate(2deg); }
        }
        
        /* Laugh */
        .emoji-animated.laugh,
        .premium-emoji.laugh,
        .chat-message.emoji-type-laugh .message-content,
        .chat-message.emoji-type-laugh .emoji-content,
        .chat-message.emoji-type-laugh .premium-emoji {
            animation: emojiLaugh 0.3s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(255, 220, 0, 0.6)) !important;
        }
        
        @keyframes emojiLaugh {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
        }
        
        /* Cry/Sad */
        .emoji-animated.cry,
        .premium-emoji.cry,
        .chat-message.emoji-type-sad .message-content,
        .chat-message.emoji-type-sad .emoji-content,
        .chat-message.emoji-type-sad .premium-emoji {
            animation: emojiCry 0.8s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(100, 150, 255, 0.6)) !important;
        }
        
        @keyframes emojiCry {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-3px); }
            75% { transform: translateY(3px); }
        }
        
        /* Spin */
        .emoji-animated.spin,
        .premium-emoji.spin {
            animation: emojiSpin 2s linear infinite !important;
            filter: drop-shadow(0 0 25px rgba(255, 200, 0, 0.7)) !important;
        }
        
        @keyframes emojiSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* Starstruck */
        .emoji-animated.starstruck,
        .premium-emoji.starstruck {
            animation: emojiStarstruck 0.5s ease-in-out infinite !important;
            filter: drop-shadow(0 0 30px rgba(255, 230, 0, 0.8)) !important;
        }
        
        @keyframes emojiStarstruck {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 25px rgba(255, 230, 0, 0.7)); }
            50% { transform: scale(1.15); filter: drop-shadow(0 0 35px rgba(255, 255, 100, 0.9)); }
        }
        
        /* Thumbsup/Gesture */
        .emoji-animated.thumbsup,
        .premium-emoji.thumbsup,
        .chat-message.emoji-type-gesture .message-content,
        .chat-message.emoji-type-gesture .emoji-content,
        .chat-message.emoji-type-gesture .premium-emoji {
            animation: emojiThumbsup 0.4s ease-in-out infinite !important;
            transform-origin: bottom center;
        }
        
        @keyframes emojiThumbsup {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
        }
        
        /* Bounce/Celebration */
        .emoji-animated.bounce,
        .premium-emoji.bounce,
        .chat-message.emoji-type-celebration .message-content,
        .chat-message.emoji-type-celebration .emoji-content,
        .chat-message.emoji-type-celebration .premium-emoji {
            animation: emojiBounce 0.5s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(255, 200, 0, 0.6)) !important;
        }
        
        @keyframes emojiBounce {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-15px) scale(1.1); }
        }
        
        /* Pulse */
        .emoji-animated.pulse,
        .premium-emoji.pulse {
            animation: emojiPulse 1s ease-in-out infinite !important;
            filter: drop-shadow(0 0 25px rgba(200, 150, 255, 0.6)) !important;
        }
        
        @keyframes emojiPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.85; }
        }
        
        /* Party */
        .emoji-animated.party,
        .premium-emoji.party {
            animation: emojiParty 0.5s ease-in-out infinite !important;
            filter: drop-shadow(0 0 25px rgba(255, 200, 0, 0.7)) !important;
        }
        
        @keyframes emojiParty {
            0%, 100% { transform: translateY(0) rotate(-5deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        /* Love */
        .emoji-animated.love,
        .premium-emoji.love,
        .chat-message.emoji-type-love .message-content,
        .chat-message.emoji-type-love .emoji-content,
        .chat-message.emoji-type-love .premium-emoji {
            animation: emojiLove 1s ease-in-out infinite !important;
            filter: drop-shadow(0 0 25px rgba(255, 100, 150, 0.7)) !important;
        }
        
        @keyframes emojiLove {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.15) rotate(-5deg); }
            50% { transform: scale(1.2); }
            75% { transform: scale(1.15) rotate(5deg); }
        }
        
        /* Rocket */
        .emoji-animated.rocket,
        .premium-emoji.rocket {
            animation: emojiRocket 1s ease-in-out infinite !important;
            filter: drop-shadow(0 0 25px rgba(255, 150, 0, 0.7)) !important;
        }
        
        @keyframes emojiRocket {
            0%, 100% { transform: translateY(0) rotate(-5deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        /* Diamond */
        .emoji-animated.diamond,
        .premium-emoji.diamond {
            animation: emojiDiamond 2s ease-in-out infinite !important;
            filter: drop-shadow(0 0 30px rgba(100, 200, 255, 0.8)) !important;
        }
        
        @keyframes emojiDiamond {
            0%, 100% { filter: drop-shadow(0 0 25px rgba(100, 200, 255, 0.7)) brightness(1); }
            50% { filter: drop-shadow(0 0 40px rgba(150, 230, 255, 1)) brightness(1.3); }
        }
        
        /* Shine */
        .emoji-animated.shine,
        .premium-emoji.shine {
            animation: emojiShine 1.5s ease-in-out infinite !important;
            filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.8)) !important;
        }
        
        @keyframes emojiShine {
            0%, 100% { filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.7)) brightness(1); }
            50% { filter: drop-shadow(0 0 40px rgba(255, 230, 100, 1)) brightness(1.4); }
        }
        
        /* Pray */
        .emoji-animated.pray,
        .premium-emoji.pray {
            animation: emojiPray 1s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(255, 200, 150, 0.6)) !important;
        }
        
        @keyframes emojiPray {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        
        /* Muscle */
        .emoji-animated.muscle,
        .premium-emoji.muscle {
            animation: emojiMuscle 0.5s ease-in-out infinite !important;
            transform-origin: center;
            filter: drop-shadow(0 0 20px rgba(255, 150, 100, 0.6)) !important;
        }
        
        @keyframes emojiMuscle {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        /* Look */
        .emoji-animated.look,
        .premium-emoji.look {
            animation: emojiLook 1.5s ease-in-out infinite !important;
            filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4)) !important;
        }
        
        @keyframes emojiLook {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        /* Shake */
        .emoji-animated.shake,
        .premium-emoji.shake {
            animation: emojiShake 0.2s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(255, 50, 50, 0.6)) !important;
        }
        
        @keyframes emojiShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
        }
        
        /* Float */
        .emoji-animated.float,
        .premium-emoji.float {
            animation: emojiFloat 2s ease-in-out infinite !important;
            filter: drop-shadow(0 0 25px rgba(255, 200, 100, 0.5)) !important;
        }
        
        @keyframes emojiFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        /* Wave */
        .emoji-animated.wave,
        .premium-emoji.wave {
            animation: emojiWave 1s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(255, 150, 50, 0.5)) !important;
        }
        
        @keyframes emojiWave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
        }
        
        /* ===== NEW EMOJI TYPE ANIMATIONS ===== */
        
        /* Default - Float animation for any unmatched emoji */
        .chat-message.emoji-type-default .message-content,
        .chat-message.emoji-type-default .emoji-content,
        .chat-message.emoji-type-default .premium-emoji {
            animation: emojiFloat 2s ease-in-out infinite !important;
            filter: drop-shadow(0 0 25px rgba(255, 200, 100, 0.5)) !important;
        }
        
        /* Clap - Bounce effect */
        .chat-message.emoji-type-clap .message-content,
        .chat-message.emoji-type-clap .emoji-content,
        .chat-message.emoji-type-clap .premium-emoji {
            animation: emojiClap 0.4s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(255, 220, 100, 0.6)) !important;
        }
        
        @keyframes emojiClap {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.15) rotate(-8deg); }
            75% { transform: scale(1.15) rotate(8deg); }
        }
        
        /* Rocket - Fly up animation */
        .chat-message.emoji-type-rocket .message-content,
        .chat-message.emoji-type-rocket .emoji-content,
        .chat-message.emoji-type-rocket .premium-emoji {
            animation: emojiRocket 1s ease-in-out infinite !important;
            filter: drop-shadow(0 0 25px rgba(255, 150, 0, 0.7)) !important;
        }
        
        /* Crown - Shine/sparkle effect */
        .chat-message.emoji-type-crown .message-content,
        .chat-message.emoji-type-crown .emoji-content,
        .chat-message.emoji-type-crown .premium-emoji {
            animation: emojiCrown 1.5s ease-in-out infinite !important;
            filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.8)) !important;
        }
        
        @keyframes emojiCrown {
            0%, 100% { filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.7)) brightness(1); transform: scale(1); }
            50% { filter: drop-shadow(0 0 40px rgba(255, 230, 100, 1)) brightness(1.4); transform: scale(1.1); }
        }
        
        /* Pray - Gentle float */
        .chat-message.emoji-type-pray .message-content,
        .chat-message.emoji-type-pray .emoji-content,
        .chat-message.emoji-type-pray .premium-emoji {
            animation: emojiPray 1.2s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(255, 200, 150, 0.6)) !important;
        }
        
        /* Muscle - Flex animation */
        .chat-message.emoji-type-muscle .message-content,
        .chat-message.emoji-type-muscle .emoji-content,
        .chat-message.emoji-type-muscle .premium-emoji {
            animation: emojiMuscle 0.5s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(255, 150, 100, 0.6)) !important;
        }
        
        /* Cool - Smooth sway */
        .chat-message.emoji-type-cool .message-content,
        .chat-message.emoji-type-cool .emoji-content,
        .chat-message.emoji-type-cool .premium-emoji {
            animation: emojiCool 1.5s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(100, 200, 255, 0.6)) !important;
        }
        
        @keyframes emojiCool {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(-3px) rotate(-3deg); }
            75% { transform: translateX(3px) rotate(3deg); }
        }
        
        /* Money - Sparkle/shine */
        .chat-message.emoji-type-money .message-content,
        .chat-message.emoji-type-money .emoji-content,
        .chat-message.emoji-type-money .premium-emoji {
            animation: emojiMoney 0.8s ease-in-out infinite !important;
            filter: drop-shadow(0 0 25px rgba(100, 255, 100, 0.7)) !important;
        }
        
        @keyframes emojiMoney {
            0%, 100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
            50% { transform: scale(1.1) rotate(5deg); filter: brightness(1.3); }
        }
        
        /* Skull - Shake */
        .chat-message.emoji-type-skull .message-content,
        .chat-message.emoji-type-skull .emoji-content,
        .chat-message.emoji-type-skull .premium-emoji {
            animation: emojiSkull 0.2s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(150, 150, 150, 0.6)) !important;
        }
        
        @keyframes emojiSkull {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(-2px) rotate(-3deg); }
            75% { transform: translateX(2px) rotate(3deg); }
        }
        
        /* Flag - Wave animation */
        .chat-message.emoji-type-flag .message-content,
        .chat-message.emoji-type-flag .emoji-content,
        .chat-message.emoji-type-flag .premium-emoji {
            animation: emojiFlag 1s ease-in-out infinite !important;
            filter: drop-shadow(0 0 20px rgba(255, 150, 50, 0.5)) !important;
        }
        
        @keyframes emojiFlag {
            0%, 100% { transform: rotate(0deg) skewX(0deg); }
            25% { transform: rotate(-5deg) skewX(-3deg); }
            75% { transform: rotate(5deg) skewX(3deg); }
        }
        
        /* Hundred/Perfect - Pulse */
        .chat-message.emoji-type-hundred .message-content,
        .chat-message.emoji-type-hundred .emoji-content,
        .chat-message.emoji-type-hundred .premium-emoji {
            animation: emojiHundred 0.6s ease-in-out infinite !important;
            filter: drop-shadow(0 0 25px rgba(255, 100, 100, 0.7)) !important;
        }
        
        @keyframes emojiHundred {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
    console.log('💎 Premium emoji animations injected!');
}

// Make new functions globally available
window.detectEmojiOnlyMessage = detectEmojiOnlyMessage;
window.injectPremiumEmojiStyles = injectPremiumEmojiStyles;

// Auto-inject premium emoji styles on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => injectPremiumEmojiStyles(), 500);
});

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

    // DYNAMIC INJECTION: Create popup if it doesn't exist (for Competitive Corner and other pages)
    let popup = document.getElementById('bhaiNotificationPopup');
    if (!popup) {
        injectBhaiNotificationPopup();
        popup = document.getElementById('bhaiNotificationPopup');
    }

    if (!popup) {
        console.error('Failed to create bhaiNotificationPopup');
        return;
    }

    const previewBox = document.getElementById('bhaiMessagePreview');

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

    // Check if we're on the main page
    const currentPath = window.location.pathname;
    const isMainPage = currentPath === '/' || currentPath === '/index.html';
    const isSubjectPage = currentPath.includes('/subjects/');
    const isExamPage = currentPath.includes('/exams/');

    if (!isMainPage || isSubjectPage || isExamPage) {
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
// Also bridges chat state to the push notification system for
// WhatsApp-style notification suppression (no system notification
// while user is actively viewing the conversation).
function trackChatOpenState() {
    // Override the openStudentChat to track state
    const originalOpen = BroProAdmin.openStudentChat;
    BroProAdmin.openStudentChat = function () {
        isStudentChatOpen = true;
        // Notify push system: suppress DM notifications
        if (window.BroProPush && BroProPush.setChatActive) {
            BroProPush.setChatActive(true, 'direct_message');
        }
        originalOpen.call(this);
    };

    const originalClose = BroProAdmin.closeStudentChat;
    BroProAdmin.closeStudentChat = function () {
        isStudentChatOpen = false;
        // Notify push system: resume chat notifications
        if (window.BroProPush && BroProPush.setChatActive) {
            BroProPush.setChatActive(false);
        }
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
// DYNAMIC INJECTION OF BHAI NOTIFICATION POPUP
// Works on ALL pages including Competitive Corner
// ============================================
function injectBhaiNotificationPopup() {
    // Check if already injected
    if (document.getElementById('bhaiNotificationPopup')) return;

    // Inject the premium popup HTML
    const popupHTML = `
    <div class="bhai-notification-overlay" id="bhaiNotificationPopup">
        <div class="notification-particles">
            <span class="particle"></span>
            <span class="particle"></span>
            <span class="particle"></span>
            <span class="particle"></span>
            <span class="particle"></span>
            <span class="particle"></span>
            <span class="particle"></span>
            <span class="particle"></span>
        </div>
        <div class="bhai-notification-content">
            <div class="notification-glow"></div>
            <div class="bhai-notification-avatar">
                <img src="/assets/bhai-avatar.png" alt="Bhai" class="bhai-notif-img">
                <span class="crown-badge">👑</span>
                <div class="avatar-ring"></div>
            </div>
            <div class="notification-text">
                <h2 class="notification-title">
                    <span class="title-emoji">💬</span>
                    ${(window.BroProAdmin && BroProAdmin.getDisplayName) ? BroProAdmin.getDisplayName() : 'Bhai'} wants to talk!
                </h2>
                <p class="notification-subtitle">You have a new message</p>
                <div class="message-preview-box" id="bhaiMessagePreview">
                    <span class="preview-text">"Hey! How's your practice going?"</span>
                </div>
            </div>
            <div class="notification-actions">
                <button class="notif-btn primary" onclick="openChatFromNotification()">
                    <span class="btn-icon">💬</span>
                    <span class="btn-text">Open Chat</span>
                </button>
                <button class="notif-btn secondary" onclick="dismissNotification()">
                    <span class="btn-text">Later</span>
                </button>
            </div>
            <div class="notification-footer">
                <span class="typing-indicator">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </span>
                <span class="footer-text">${(window.BroProAdmin && BroProAdmin.getDisplayName) ? BroProAdmin.getDisplayName() : 'Bhai'} is waiting...</span>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Inject premium CSS if not already present
    if (!document.getElementById('bhaiNotificationStyles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'bhaiNotificationStyles';
        styleEl.textContent = `
            /* PREMIUM BHAI NOTIFICATION POPUP - HIGHEST PRIORITY */
            .bhai-notification-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 30, 0.97);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                z-index: 9999999; /* HIGHEST PRIORITY */
                display: none;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            .bhai-notification-overlay.active {
                display: flex;
                animation: notifFadeIn 0.5s ease forwards, notifPulse 2s ease-in-out infinite;
            }
            body.bhai-notification-active::before {
                content: '';
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                border: 4px solid transparent;
                border-image: linear-gradient(135deg, #8b5cf6, #d946ef, #f97316) 1;
                animation: borderPulse 1s ease-in-out infinite alternate;
                pointer-events: none;
                z-index: 9999998;
            }
            @keyframes borderPulse { 0% { opacity: 0.5; } 100% { opacity: 1; } }
            @keyframes notifFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes notifPulse { 0%, 100% { box-shadow: inset 0 0 100px rgba(139, 92, 246, 0.1); } 50% { box-shadow: inset 0 0 150px rgba(139, 92, 246, 0.2); } }
            
            .notification-particles { position: absolute; width: 100%; height: 100%; overflow: hidden; pointer-events: none; }
            .particle { position: absolute; width: 10px; height: 10px; background: linear-gradient(135deg, #8b5cf6, #d946ef); border-radius: 50%; animation: floatParticle 4s ease-in-out infinite; opacity: 0.6; }
            .particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
            .particle:nth-child(2) { left: 20%; top: 80%; animation-delay: 0.5s; width: 15px; height: 15px; }
            .particle:nth-child(3) { left: 70%; top: 30%; animation-delay: 1s; }
            .particle:nth-child(4) { left: 80%; top: 70%; animation-delay: 1.5s; width: 8px; height: 8px; }
            .particle:nth-child(5) { left: 50%; top: 10%; animation-delay: 2s; width: 12px; height: 12px; }
            .particle:nth-child(6) { left: 30%; top: 60%; animation-delay: 2.5s; }
            .particle:nth-child(7) { left: 90%; top: 40%; animation-delay: 3s; width: 6px; height: 6px; }
            .particle:nth-child(8) { left: 5%; top: 50%; animation-delay: 3.5s; width: 14px; height: 14px; }
            @keyframes floatParticle { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; } 50% { transform: translateY(-30px) scale(1.2); opacity: 1; } }
            
            .bhai-notification-content {
                position: relative;
                background: linear-gradient(145deg, rgba(30, 30, 60, 0.9), rgba(20, 20, 50, 0.95));
                border-radius: 30px;
                padding: 3rem 2.5rem;
                text-align: center;
                max-width: 400px;
                width: 90%;
                border: 1px solid rgba(139, 92, 246, 0.3);
                box-shadow: 0 30px 100px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
            .bhai-notification-overlay.active .bhai-notification-content { animation: cardSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
            @keyframes cardSlideIn { from { opacity: 0; transform: scale(0.8) translateY(50px); } to { opacity: 1; transform: scale(1) translateY(0); } }
            
            .notification-glow { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%); pointer-events: none; animation: glowPulse 3s ease-in-out infinite; }
            @keyframes glowPulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
            
            .bhai-notification-avatar { position: relative; width: 120px; height: 120px; margin: 0 auto 1.5rem; animation: avatarBounce 2s ease-in-out infinite; }
            @keyframes avatarBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
            .bhai-notif-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 4px solid rgba(139, 92, 246, 0.5); box-shadow: 0 10px 40px rgba(139, 92, 246, 0.5); }
            .crown-badge { position: absolute; top: -10px; right: -5px; font-size: 2rem; animation: crownFloat 1.5s ease-in-out infinite; filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5)); }
            @keyframes crownFloat { 0%, 100% { transform: rotate(-10deg) translateY(0); } 50% { transform: rotate(10deg) translateY(-5px); } }
            .avatar-ring { position: absolute; top: -10px; left: -10px; right: -10px; bottom: -10px; border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 50%; animation: ringPulse 2s ease-in-out infinite; }
            @keyframes ringPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.5; } }
            
            .notification-text { position: relative; z-index: 2; }
            .notification-title { font-size: 1.8rem; font-weight: 700; color: white; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
            .title-emoji { font-size: 1.5rem; animation: emojiWiggle 0.5s ease-in-out infinite; }
            @keyframes emojiWiggle { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
            .notification-subtitle { color: rgba(255, 255, 255, 0.7); font-size: 1rem; margin-bottom: 1.5rem; }
            
            .message-preview-box { background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 16px; padding: 1rem 1.5rem; margin-bottom: 2rem; position: relative; }
            .message-preview-box::before { content: '💬'; position: absolute; top: -15px; left: 20px; background: linear-gradient(145deg, #1e1e3f, #2d2d5a); padding: 0 0.5rem; font-size: 1.2rem; }
            .preview-text { color: rgba(255, 255, 255, 0.9); font-style: italic; font-size: 0.95rem; line-height: 1.5; }
            
            .notification-actions { display: flex; gap: 1rem; justify-content: center; margin-bottom: 1.5rem; }
            .notif-btn { padding: 0.9rem 1.8rem; border-radius: 50px; border: none; font-weight: 600; font-size: 1rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s; }
            .notif-btn.primary { background: linear-gradient(135deg, #8b5cf6, #d946ef); color: white; box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4); }
            .notif-btn.primary:hover { transform: scale(1.05); box-shadow: 0 12px 40px rgba(139, 92, 246, 0.5); }
            .notif-btn.secondary { background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.8); border: 1px solid rgba(255, 255, 255, 0.2); }
            .notif-btn.secondary:hover { background: rgba(255, 255, 255, 0.15); }
            
            .notification-footer { display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; }
            .typing-indicator { display: flex; gap: 4px; }
            .typing-indicator .dot { width: 8px; height: 8px; background: rgba(139, 92, 246, 0.6); border-radius: 50%; animation: typingDot 1.4s ease-in-out infinite; }
            .typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
            .typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }
            @keyframes typingDot { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
            
            .bhai-notification-overlay.closing { animation: notifFadeOut 0.4s ease forwards; }
            .bhai-notification-overlay.closing .bhai-notification-content { animation: cardSlideOut 0.4s ease forwards; }
            @keyframes notifFadeOut { from { opacity: 1; } to { opacity: 0; } }
            @keyframes cardSlideOut { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(0.8) translateY(50px); } }
        `;
        document.head.appendChild(styleEl);
    }

    console.log('🔔 Bhai notification popup dynamically injected!');
}

window.injectBhaiNotificationPopup = injectBhaiNotificationPopup;

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

    // Inject the promo code modal HTML - ENHANCED WITH FEATURED DEAL SYSTEM
    injectPromoCodeModal() {
        const modalHTML = `
        <div class="modal-overlay" id="promoCodeModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; align-items: center; justify-content: center;">
            <div class="promo-manager-modal" style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; width: 90%; max-width: 700px; max-height: 90vh; overflow: hidden; box-shadow: 0 25px 80px rgba(0,0,0,0.5);">
                <div class="promo-header" style="padding: 1.5rem; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0; color: white; font-size: 1.4rem;">🎟️ Premium Promo Manager</h2>
                    <button onclick="PromoCodeManager.closePromoCodeManager()" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; font-size: 1.2rem; cursor: pointer;">✕</button>
                </div>
                
                <!-- PRICING INFO BANNER -->
                <div style="padding: 1rem 1.5rem; background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.05)); border-bottom: 1px solid rgba(255,215,0,0.2);">
                    <div style="display: flex; justify-content: space-around; text-align: center;">
                        <div>
                            <div style="font-size: 0.7rem; color: rgba(255,255,255,0.5); text-transform: uppercase;">Monthly</div>
                            <div style="font-size: 1.2rem; font-weight: 700; color: #ffd700;">₹99</div>
                        </div>
                        <div style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 2rem;">
                            <div style="font-size: 0.7rem; color: rgba(255,255,255,0.5); text-transform: uppercase;">Yearly Base</div>
                            <div style="font-size: 1.2rem; font-weight: 700; color: #ffd700;">₹999</div>
                        </div>
                        <div style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 2rem;">
                            <div style="font-size: 0.7rem; color: rgba(255,255,255,0.5); text-transform: uppercase;">With Featured Deal</div>
                            <div style="font-size: 1.2rem; font-weight: 700; color: #22c55e;" id="featuredDealPrice">₹999</div>
                        </div>
                    </div>
                </div>
                
                <div class="promo-create-section" style="padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); overflow-y: auto; max-height: 350px;">
                    <h3 style="margin: 0 0 1rem 0; color: #a8edea; font-size: 1rem;">➕ Create New Promo Code</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
                        <div>
                            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">📝 Promo Code</label>
                            <input type="text" id="newPromoCode" placeholder="e.g., SAVE500" 
                                   style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; text-transform: uppercase; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">💵 Discount Type</label>
                            <select id="newPromoDiscountType" onchange="PromoCodeManager.toggleDiscountInput()"
                                   style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; box-sizing: border-box;">
                                <option value="amount" style="background: #1a1a2e;">₹ Amount Off</option>
                                <option value="percent" style="background: #1a1a2e;">% Percentage Off</option>
                                <option value="free" style="background: #1a1a2e;">100% FREE Access</option>
                            </select>
                        </div>
                        <div id="discountAmountContainer">
                            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">💰 Discount Amount (₹)</label>
                            <input type="number" id="newPromoDiscountAmount" placeholder="e.g., 200" value="200" min="1" max="999"
                                   style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; box-sizing: border-box;">
                        </div>
                        <div id="discountPercentContainer" style="display: none;">
                            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">📊 Discount Percent (%)</label>
                            <input type="number" id="newPromoDiscountPercent" placeholder="e.g., 25" value="25" min="1" max="99"
                                   style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">🎯 Applies To</label>
                            <select id="newPromoAppliesTo"
                                   style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; box-sizing: border-box;">
                                <option value="yearly" style="background: #1a1a2e;">Yearly Plan Only</option>
                                <option value="monthly" style="background: #1a1a2e;">Monthly Plan Only</option>
                                <option value="both" style="background: #1a1a2e;">Both Plans</option>
                            </select>
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
                    
                    <!-- FEATURED DEAL TOGGLE - THE MAGIC SWITCH -->
                    <div style="margin-top: 1rem; padding: 1rem; background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.05)); border: 2px solid rgba(34, 197, 94, 0.3); border-radius: 12px;">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <div style="color: #22c55e; font-weight: 700; font-size: 0.95rem;">⭐ Featured Deal</div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.75rem; margin-top: 0.2rem;">Auto-displays on subscription page with special styling</div>
                            </div>
                            <label class="featured-toggle" style="position: relative; display: inline-block; width: 60px; height: 32px;">
                                <input type="checkbox" id="newPromoFeatured" style="opacity: 0; width: 0; height: 0;">
                                <span class="toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.1); border-radius: 32px; transition: 0.3s;"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div style="margin-top: 0.8rem;">
                        <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.75rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">💬 Display Message (Optional)</label>
                        <input type="text" id="newPromoMessage" placeholder="e.g., 🎉 Limited Time Offer!" 
                               style="width: 100%; padding: 0.8rem; border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.05); color: white; font-size: 0.9rem; box-sizing: border-box;">
                    </div>
                    <button onclick="PromoCodeManager.createPromoCode()" 
                            style="width: 100%; margin-top: 1rem; padding: 1rem; background: linear-gradient(135deg, #11998e, #38ef7d); border: none; border-radius: 12px; color: white; font-weight: 600; font-size: 1rem; cursor: pointer; transition: transform 0.2s;">
                        ✨ Create Promo Code
                    </button>
                </div>
                
                <div class="promo-list-section" style="padding: 1.5rem; overflow-y: auto; max-height: 250px;">
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
            #promoCodeModal input:focus, #promoCodeModal select:focus { border-color: #667eea !important; outline: none; }
            .promo-code-item { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 1rem; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease; }
            .promo-code-item .code-info { flex: 1; }
            .promo-code-item .code-name { font-weight: 700; color: #a8edea; font-size: 1.1rem; }
            .promo-code-item .code-details { font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-top: 0.3rem; }
            .promo-code-item .code-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
            .promo-code-item button { padding: 0.5rem 0.8rem; border: none; border-radius: 8px; cursor: pointer; font-size: 0.8rem; }
            .promo-code-item .delete-btn { background: #ef4444; color: white; }
            .promo-code-item .toggle-btn { background: #667eea; color: white; }
            .promo-code-item .feature-btn { background: linear-gradient(135deg, #22c55e, #10b981); color: white; }
            .promo-code-item .unfeature-btn { background: #f59e0b; color: white; }
            .promo-code-item.inactive { opacity: 0.5; }
            .promo-code-item.featured { border: 2px solid #22c55e; background: rgba(34, 197, 94, 0.1); }
            
            /* Featured badge */
            .featured-badge { background: linear-gradient(135deg, #22c55e, #10b981); color: white; padding: 0.15rem 0.5rem; border-radius: 6px; font-size: 0.7rem; font-weight: 700; margin-left: 0.5rem; animation: featuredPulse 2s ease infinite; }
            @keyframes featuredPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); } 50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); } }
            
            /* Toggle switch styling */
            .featured-toggle input:checked + .toggle-slider { background: linear-gradient(135deg, #22c55e, #10b981); }
            .featured-toggle .toggle-slider:before { content: ''; position: absolute; height: 26px; width: 26px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.3s; }
            .featured-toggle input:checked + .toggle-slider:before { transform: translateX(28px); }
            
            /* Usage badge styling for real-time visibility */
            .usage-badge { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 0.2rem 0.5rem; border-radius: 8px; font-weight: 700; font-size: 0.85rem; display: inline-block; min-width: 45px; text-align: center; }
            
            /* Discount badge */
            .discount-badge { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 0.15rem 0.5rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }
            
            /* Flash animation for real-time updates */
            @keyframes promoListFlash { 0% { opacity: 0.7; transform: scale(0.98); } 50% { opacity: 1; background: rgba(102, 126, 234, 0.1); } 100% { opacity: 1; transform: scale(1); background: transparent; } }
            
            /* Real-time update indicator */
            #promoCodesList::before { content: '🔴 LIVE'; position: absolute; top: -25px; right: 10px; font-size: 0.7rem; color: #22c55e; background: rgba(34, 197, 94, 0.1); padding: 0.2rem 0.5rem; border-radius: 10px; animation: liveBlink 1.5s ease infinite; }
            @keyframes liveBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            
            .promo-list-section { position: relative; }
        `;
        document.head.appendChild(style);
    },

    // Toggle discount input based on type
    toggleDiscountInput() {
        const type = document.getElementById('newPromoDiscountType').value;
        const amountContainer = document.getElementById('discountAmountContainer');
        const percentContainer = document.getElementById('discountPercentContainer');

        if (type === 'amount') {
            amountContainer.style.display = 'block';
            percentContainer.style.display = 'none';
        } else if (type === 'percent') {
            amountContainer.style.display = 'none';
            percentContainer.style.display = 'block';
        } else { // free
            amountContainer.style.display = 'none';
            percentContainer.style.display = 'none';
        }
    },

    // Create a new promo code - ENHANCED WITH FEATURED DEAL SUPPORT
    async createPromoCode() {
        const code = document.getElementById('newPromoCode').value.toUpperCase().trim();
        const discountType = document.getElementById('newPromoDiscountType').value;
        const discountAmount = parseInt(document.getElementById('newPromoDiscountAmount')?.value) || 500;
        const discountPercent = parseInt(document.getElementById('newPromoDiscountPercent')?.value) || 25;
        const appliesTo = document.getElementById('newPromoAppliesTo')?.value || 'yearly';
        const maxUses = parseInt(document.getElementById('newPromoMaxUses').value) || 0;
        const expiry = document.getElementById('newPromoExpiry').value;
        const message = document.getElementById('newPromoMessage').value.trim();
        const isFeatured = document.getElementById('newPromoFeatured')?.checked || false;

        if (!code || code.length < 3) {
            alert('❌ Please enter a valid promo code (at least 3 characters)');
            return;
        }

        // Calculate discount values based on type
        let discount, discountRupees, displayMessage;
        const yearlyPrice = 999;

        if (discountType === 'free') {
            discount = 100;
            discountRupees = yearlyPrice;
            displayMessage = `✅ ${code} applied! You get FREE Premium access!`;
        } else if (discountType === 'amount') {
            discountRupees = discountAmount;
            discount = Math.round((discountAmount / yearlyPrice) * 100);
            displayMessage = `✅ ${code} applied! You save ₹${discountAmount}!`;
        } else { // percent
            discount = discountPercent;
            discountRupees = Math.round((discountPercent / 100) * yearlyPrice);
            displayMessage = `✅ ${code} applied! You get ${discountPercent}% OFF!`;
        }

        const promoData = {
            code: code,
            discount: discount,                    // Percentage (for backward compatibility)
            discountType: discountType,            // 'amount', 'percent', or 'free'
            discountAmount: discountType === 'amount' ? discountAmount : 0,  // Raw amount if amount type
            discountPercent: discountType === 'percent' ? discountPercent : discount,  // Percentage value
            discountRupees: discountRupees,        // Calculated ₹ amount saved (based on yearly)
            appliesTo: appliesTo,                  // 'yearly', 'monthly', or 'both'
            featured: isFeatured,                  // Featured deal flag
            active: true,
            maxUses: maxUses,
            currentUses: 0,
            validUntil: expiry ? new Date(expiry).toISOString() : null,
            message: message || displayMessage,
            createdAt: new Date().toISOString(),
            createdBy: BroProAdmin.ADMIN_EMAIL
        };

        // If setting this as featured, un-feature any other deals first
        if (isFeatured && window.firebase && firebase.firestore) {
            try {
                const snapshot = await firebase.firestore().collection('promoCodes').where('featured', '==', true).get();
                const batch = firebase.firestore().batch();
                snapshot.forEach(doc => {
                    batch.update(doc.ref, { featured: false });
                });
                await batch.commit();
                console.log('🔄 Cleared previous featured deals');
            } catch (e) {
                console.log('Note: Could not clear previous featured deals:', e.message);
            }
        }

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
                document.getElementById('newPromoDiscountAmount').value = '500';
                document.getElementById('newPromoDiscountPercent').value = '25';
                document.getElementById('newPromoDiscountType').value = 'amount';
                document.getElementById('newPromoMaxUses').value = '0';
                document.getElementById('newPromoExpiry').value = '';
                document.getElementById('newPromoMessage').value = '';
                const featuredCheckbox = document.getElementById('newPromoFeatured');
                if (featuredCheckbox) featuredCheckbox.checked = false;

                // Reset discount input visibility
                this.toggleDiscountInput();

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

    // Render promo codes to the container - ENHANCED WITH FEATURED DEAL SUPPORT
    renderPromoCodes(container, allCodes) {
        const codeEntries = Object.entries(allCodes);

        if (codeEntries.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: rgba(255,255,255,0.5); padding: 2rem;">No promo codes yet. Create one above!</div>';
            return;
        }

        // Sort: Featured first, then by creation date
        codeEntries.sort((a, b) => {
            if (a[1].featured && !b[1].featured) return -1;
            if (!a[1].featured && b[1].featured) return 1;
            return 0;
        });

        // Update featured deal price display in header
        const featuredDeal = codeEntries.find(([_, data]) => data.featured && data.active !== false);
        const featuredPriceEl = document.getElementById('featuredDealPrice');
        if (featuredPriceEl) {
            if (featuredDeal) {
                const yearlyPrice = 999;
                const discountRupees = featuredDeal[1].discountRupees || Math.round((featuredDeal[1].discount / 100) * yearlyPrice);
                const finalPrice = yearlyPrice - discountRupees;
                featuredPriceEl.textContent = `₹${finalPrice.toLocaleString()}`;
                featuredPriceEl.style.color = '#22c55e';
            } else {
                featuredPriceEl.textContent = '₹999';
                featuredPriceEl.style.color = 'rgba(255,255,255,0.5)';
            }
        }

        // Add flash animation to show real-time updates
        container.style.animation = 'none';
        container.offsetHeight; // Trigger reflow
        container.style.animation = 'promoListFlash 0.5s ease';

        container.innerHTML = codeEntries.map(([code, data]) => {
            const isActive = data.active !== false;
            const isFeatured = data.featured === true;
            const isExpired = data.validUntil && new Date(data.validUntil) < new Date();
            const status = isExpired ? '⏰ Expired' : (isActive ? '🟢 Active' : '🔴 Inactive');

            // Calculate discount info - show correctly based on discount type
            let discountDisplay;
            if (data.discount === 100 || data.discountType === 'free') {
                discountDisplay = '<span class="discount-badge">FREE</span>';
            } else if (data.discountType === 'percent') {
                // For percentage type, show the percentage
                const percent = data.discountPercent || data.discount || 0;
                discountDisplay = `<span class="discount-badge">${percent}% OFF</span>`;
            } else if (data.discountType === 'amount') {
                // For amount type, show the rupee amount
                const amount = data.discountAmount || data.discountRupees || 0;
                discountDisplay = `<span class="discount-badge">₹${amount} OFF</span>`;
            } else {
                // Fallback for legacy codes - check if discount is a high number (likely amount) or low (percent)
                const yearlyPrice = 999;
                const discountRupees = data.discountRupees || Math.round((data.discount / 100) * yearlyPrice);
                discountDisplay = `<span class="discount-badge">₹${discountRupees} OFF</span>`;
            }

            // Usage count
            const currentUses = data.currentUses || 0;
            const maxUses = data.maxUses || 0;
            const usageInfo = maxUses ? `<span class="usage-badge">${currentUses}/${maxUses}</span>` : 'Unlimited';

            const expiryInfo = data.validUntil ? `📅 ${new Date(data.validUntil).toLocaleDateString()}` : '';
            const sourceLabel = data.isHardcoded ? '🔒' : '☁️';
            const featuredBadge = isFeatured ? '<span class="featured-badge">⭐ FEATURED</span>' : '';
            const appliesLabel = data.appliesTo === 'both' ? '(All Plans)' : (data.appliesTo === 'monthly' ? '(Monthly)' : '(Yearly)');

            return `
                <div class="promo-code-item ${!isActive || isExpired ? 'inactive' : ''} ${isFeatured ? 'featured' : ''}" data-code="${code}">
                    <div class="code-info">
                        <div class="code-name">${sourceLabel} ${code} ${featuredBadge}</div>
                        <div class="code-details">${discountDisplay} ${appliesLabel} • ${usageInfo} uses • ${expiryInfo} ${status}</div>
                    </div>
                    <div class="code-actions">
                        ${!data.isHardcoded ? `
                            ${isFeatured
                        ? `<button class="unfeature-btn" onclick="PromoCodeManager.setFeatured('${code}', false)">⭐ Unfeature</button>`
                        : `<button class="feature-btn" onclick="PromoCodeManager.setFeatured('${code}', true)">⭐ Feature</button>`
                    }
                            <button class="toggle-btn" onclick="PromoCodeManager.togglePromoCode('${code}', ${isActive})">${isActive ? '⏸️' : '▶️'}</button>
                            <button class="delete-btn" onclick="PromoCodeManager.deletePromoCode('${code}')">🗑️</button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    },

    // Set/Unset a promo code as Featured Deal
    async setFeatured(code, shouldFeature) {
        if (!window.firebase || !firebase.firestore) {
            alert('❌ Firebase not available');
            return;
        }

        try {
            const db = firebase.firestore();

            // If setting as featured, first un-feature all others
            if (shouldFeature) {
                const snapshot = await db.collection('promoCodes').where('featured', '==', true).get();
                const batch = db.batch();
                snapshot.forEach(doc => {
                    batch.update(doc.ref, { featured: false });
                });
                await batch.commit();
            }

            // Now update this code
            await db.collection('promoCodes').doc(code).update({
                featured: shouldFeature
            });

            console.log(`⭐ Promo code ${code} ${shouldFeature ? 'set as FEATURED' : 'unfeatured'}`);

            if (window.BroProAdmin && BroProAdmin.showAdminToast) {
                BroProAdmin.showAdminToast('success', shouldFeature
                    ? `⭐ "${code}" is now the Featured Deal!`
                    : `"${code}" is no longer featured`);
            }
        } catch (error) {
            console.error('Error setting featured:', error);
            alert('❌ Failed to update featured status');
        }
    },

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

    /**
     * Security: Escape HTML entities in user-generated content.
     * Prevents stored XSS when rendering BhAI chat messages.
     */
    _safeEscape(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    },
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
                                ${BhAIChatsManager._safeEscape(msg.message || 'No content')}
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

    // Manage typing indicator based on mode
    if (mode === 'real') {
        // Start listening for Bhai typing in real mode
        BroProAdmin._startBhaiTypingListener();
    } else {
        // Stop typing listener and clear state in AI mode
        BroProAdmin._clearStudentTypingState();
        BroProAdmin._stopBhaiTypingListener();
    }

    // Play click sound
    if (window.BroProSounds) {
        BroProSounds.play('click');
    }

    console.log('💬 Chat mode switched to:', mode === 'ai' ? 'BhAI (AI)' : `Real ${BroProAdmin.getDisplayName()}`);
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

        if (titleEl) titleEl.textContent = `Talk to ${this.getDisplayName()}`;
        if (statusDot) statusDot.style.background = '#10b981';
        if (statusText) statusText.textContent = 'Online';
    }
};

// ============================================
// PROMO CODE MODAL
// ============================================
BroProAdmin.openPromoCodeModal = function () {
    // Check if modal exists, if not create it
    let modal = document.getElementById('promoCodeModal');
    if (!modal) {
        this.createPromoCodeModal();
        modal = document.getElementById('promoCodeModal');
    }
    modal.style.display = 'flex';
    this.loadPromoCodes();
};

BroProAdmin.closePromoCodeModal = function () {
    const modal = document.getElementById('promoCodeModal');
    if (modal) modal.style.display = 'none';
};

BroProAdmin.createPromoCodeModal = function () {
    const modalHTML = `
    <div class="modal-overlay" id="promoCodeModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; align-items: center; justify-content: center;">
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; padding: 2rem; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: #10b981; font-size: 1.5rem;">🎟️ Promo Codes</h2>
                <button onclick="BroProAdmin.closePromoCodeModal()" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>
            <div id="promoCodeList" style="margin-bottom: 1rem;">Loading...</div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                <input type="text" id="newPromoCode" placeholder="Enter promo code" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: none; color: #fff; margin-bottom: 0.5rem;">
                <input type="number" id="newPromoDiscount" placeholder="Discount %" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: none; color: #fff; margin-bottom: 0.5rem;">
                <button onclick="BroProAdmin.createPromoCode()" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: linear-gradient(135deg, #10b981, #059669); border: none; color: #fff; font-weight: 600; cursor: pointer;">Create Promo Code</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

BroProAdmin.loadPromoCodes = async function () {
    const list = document.getElementById('promoCodeList');
    if (!list) return;
    list.innerHTML = '<p style="color: #94a3b8;">No promo codes yet. Create one below!</p>';
};

BroProAdmin.createPromoCode = async function () {
    const code = document.getElementById('newPromoCode')?.value;
    const discount = document.getElementById('newPromoDiscount')?.value;
    if (!code || !discount) {
        alert('Please fill in all fields');
        return;
    }
    alert('Promo code created: ' + code + ' (' + discount + '% off)');
    this.closePromoCodeModal();
};

// ============================================
// PREMIUM MANAGER MODAL
// ============================================
BroProAdmin.openPremiumManagerModal = function () {
    let modal = document.getElementById('premiumManagerModal');
    if (!modal) {
        this.createPremiumManagerModal();
        modal = document.getElementById('premiumManagerModal');
    }
    modal.style.display = 'flex';
    this.loadPremiumUsers();
};

BroProAdmin.closePremiumManagerModal = function () {
    const modal = document.getElementById('premiumManagerModal');
    if (modal) modal.style.display = 'none';
};

BroProAdmin.createPremiumManagerModal = function () {
    const modalHTML = `
    <div id="premiumManagerModal" class="admin-modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; justify-content: center; align-items: center; padding: 1rem;">
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; padding: 2rem; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: #f59e0b; font-size: 1.5rem;">👑 Premium Manager</h2>
                <button onclick="BroProAdmin.closePremiumManagerModal()" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>
            <div id="premiumUsersList" style="margin-bottom: 1rem;">
                <p style="color: #94a3b8;">Loading premium users...</p>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                <input type="email" id="grantPremiumEmail" placeholder="User email" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: none; color: #fff; margin-bottom: 0.5rem;">
                <button onclick="BroProAdmin.grantPremium()" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; color: #fff; font-weight: 600; cursor: pointer;">Grant Premium</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

BroProAdmin.loadPremiumUsers = async function () {
    const list = document.getElementById('premiumUsersList');
    if (!list) return;
    list.innerHTML = '<p style="color: #94a3b8;">Premium user management coming soon!</p>';
};

BroProAdmin.grantPremium = function () {
    const email = document.getElementById('grantPremiumEmail')?.value;
    if (!email) {
        alert('Please enter an email');
        return;
    }
    alert('Premium granted to: ' + email);
};

// ============================================
// BHAI AI CONVERSATIONS MODAL
// ============================================
BroProAdmin.openBhaiAIConversationsModal = function () {
    let modal = document.getElementById('bhaiAIConversationsModal');
    if (!modal) {
        this.createBhaiAIConversationsModal();
        modal = document.getElementById('bhaiAIConversationsModal');
    }
    modal.style.display = 'flex';
    this.loadBhaiConversations();
};

BroProAdmin.closeBhaiAIConversationsModal = function () {
    const modal = document.getElementById('bhaiAIConversationsModal');
    if (modal) modal.style.display = 'none';
};

BroProAdmin.createBhaiAIConversationsModal = function () {
    const modalHTML = `
    <div id="bhaiAIConversationsModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; justify-content: center; align-items: center; padding: 1rem;">
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; padding: 2rem; max-width: 700px; width: 100%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: #8b5cf6; font-size: 1.5rem;">🤖 BhAI Conversations</h2>
                <button onclick="BroProAdmin.closeBhaiAIConversationsModal()" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>
            <div id="bhaiConversationsList">
                <p style="color: #94a3b8;">Loading AI conversations...</p>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

BroProAdmin.loadBhaiConversations = async function () {
    const list = document.getElementById('bhaiConversationsList');
    if (!list) return;
    list.innerHTML = '<p style="color: #94a3b8;">AI conversation viewer coming soon!</p>';
};

// ============================================
// NOTIFICATION MODAL
// ============================================
BroProAdmin.openNotificationModal = function () {
    let modal = document.getElementById('adminNotificationModal');
    if (!modal) {
        this.createNotificationModal();
        modal = document.getElementById('adminNotificationModal');
    }
    modal.style.display = 'flex';
};

BroProAdmin.closeNotificationModal = function () {
    const modal = document.getElementById('adminNotificationModal');
    if (modal) modal.style.display = 'none';
};

BroProAdmin._notificationMode = 'bell'; // 'bell' or 'urgent'
BroProAdmin._loadedGroups = [];

BroProAdmin.createNotificationModal = function () {
    const modalHTML = `
    <div id="adminNotificationModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.85); z-index: 10000; justify-content: center; align-items: center; padding: 1rem;" onclick="if(event.target === this) BroProAdmin.closeNotificationModal()">
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; padding: 1.5rem; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; border: 1px solid rgba(255,255,255,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div>
                    <h2 style="color: #ec4899; font-size: 1.2rem; margin: 0;">🔔 Push Notifications</h2>
                    <p style="color: #94a3b8; font-size: 0.8rem; margin: 0.25rem 0 0;">Unified notification control</p>
                </div>
                <button onclick="BroProAdmin.closeNotificationModal()" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>
            
            <!-- Mode Switcher -->
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 0.35rem;">
                <button id="modeBellBtn" class="notif-mode-btn active" onclick="BroProAdmin.switchNotificationMode('bell')" style="flex: 1; padding: 0.6rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #ec4899, #db2777); color: #fff; font-weight: 600; cursor: pointer; font-size: 0.85rem; transition: all 0.2s;">
                    🔔 Bell Notification
                </button>
                <button id="modeUrgentBtn" class="notif-mode-btn" onclick="BroProAdmin.switchNotificationMode('urgent')" style="flex: 1; padding: 0.6rem; border-radius: 10px; border: none; background: transparent; color: rgba(255,255,255,0.6); font-weight: 600; cursor: pointer; font-size: 0.85rem; transition: all 0.2s;">
                    🚨 Urgent Popup
                </button>
            </div>
            
            <!-- Mode Description -->
            <div id="modeDescription" style="background: rgba(236,72,153,0.15); border: 1px solid rgba(236,72,153,0.3); border-radius: 10px; padding: 0.75rem; margin-bottom: 1rem;">
                <p style="color: #f9a8d4; font-size: 0.8rem; margin: 0;">💡 <strong>Bell Notification:</strong> Appears in the notification bell. Users see it when they check notifications.</p>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <!-- Target Group (for Urgent only) -->
                <div id="targetGroupSection" style="display: none;">
                    <label style="color: #94a3b8; font-size: 0.85rem;">🎯 Target Group</label>
                    <select id="notifTargetGroup" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-top: 0.25rem;">
                        <option value="all">📢 All Users</option>
                    </select>
                    <p style="color: #64748b; font-size: 0.75rem; margin-top: 0.25rem;">Select which group receives this urgent alert</p>
                </div>
                
                <div>
                    <label style="color: #94a3b8; font-size: 0.85rem;">📝 Title</label>
                    <input type="text" id="notifTitle" placeholder="Notification title" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-top: 0.25rem;">
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 0.85rem;">💬 Message</label>
                    <textarea id="notifMessage" placeholder="Your message..." rows="3" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-top: 0.25rem; resize: vertical;"></textarea>
                </div>
                
                <!-- Type buttons (for Bell notifications only) -->
                <div id="notifTypeSection">
                    <label style="color: #94a3b8; font-size: 0.85rem;">📦 Type</label>
                    <div id="notifTypeBtns" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.25rem;">
                        <button class="notif-type-btn active" data-type="feature" onclick="BroProAdmin.selectNotifType(this)" style="padding: 0.4rem 0.8rem; border-radius: 20px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border: none; color: #fff; cursor: pointer; font-size: 0.8rem; transition: all 0.2s;">✨ Feature</button>
                        <button class="notif-type-btn" data-type="announce" onclick="BroProAdmin.selectNotifType(this)" style="padding: 0.4rem 0.8rem; border-radius: 20px; background: rgba(255,255,255,0.1); border: none; color: #fff; cursor: pointer; font-size: 0.8rem; transition: all 0.2s;">📢 Announce</button>
                        <button class="notif-type-btn" data-type="tip" onclick="BroProAdmin.selectNotifType(this)" style="padding: 0.4rem 0.8rem; border-radius: 20px; background: rgba(255,255,255,0.1); border: none; color: #fff; cursor: pointer; font-size: 0.8rem; transition: all 0.2s;">💡 Tip</button>
                        <button class="notif-type-btn" data-type="celebrate" onclick="BroProAdmin.selectNotifType(this)" style="padding: 0.4rem 0.8rem; border-radius: 20px; background: rgba(255,255,255,0.1); border: none; color: #fff; cursor: pointer; font-size: 0.8rem; transition: all 0.2s;">🎉 Celebrate</button>
                        <button class="notif-type-btn" data-type="important" onclick="BroProAdmin.selectNotifType(this)" style="padding: 0.4rem 0.8rem; border-radius: 20px; background: rgba(255,255,255,0.1); border: none; color: #fff; cursor: pointer; font-size: 0.8rem; transition: all 0.2s;">⚠️ Important</button>
                    </div>
                </div>
                
                <button id="sendNotifBtn" onclick="BroProAdmin.sendNotification()" style="width: 100%; padding: 1rem; border-radius: 12px; background: linear-gradient(135deg, #ec4899, #db2777); border: none; color: #fff; font-weight: 600; cursor: pointer; font-size: 0.95rem; margin-top: 0.5rem; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);">📤 Send Bell Notification</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

// Switch between Bell and Urgent modes
BroProAdmin.switchNotificationMode = function (mode) {
    this._notificationMode = mode;

    const bellBtn = document.getElementById('modeBellBtn');
    const urgentBtn = document.getElementById('modeUrgentBtn');
    const modeDesc = document.getElementById('modeDescription');
    const targetSection = document.getElementById('targetGroupSection');
    const typeSection = document.getElementById('notifTypeSection');
    const sendBtn = document.getElementById('sendNotifBtn');

    if (mode === 'bell') {
        bellBtn.style.background = 'linear-gradient(135deg, #ec4899, #db2777)';
        bellBtn.style.color = '#fff';
        urgentBtn.style.background = 'transparent';
        urgentBtn.style.color = 'rgba(255,255,255,0.6)';

        modeDesc.style.background = 'rgba(236,72,153,0.15)';
        modeDesc.style.borderColor = 'rgba(236,72,153,0.3)';
        modeDesc.innerHTML = '<p style="color: #f9a8d4; font-size: 0.8rem; margin: 0;">💡 <strong>Bell Notification:</strong> Appears in the notification bell. Users see it when they check notifications.</p>';

        targetSection.style.display = 'none';
        typeSection.style.display = 'block';
        sendBtn.style.background = 'linear-gradient(135deg, #ec4899, #db2777)';
        sendBtn.innerHTML = '📤 Send Bell Notification';
    } else {
        urgentBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        urgentBtn.style.color = '#fff';
        bellBtn.style.background = 'transparent';
        bellBtn.style.color = 'rgba(255,255,255,0.6)';

        modeDesc.style.background = 'rgba(239,68,68,0.15)';
        modeDesc.style.borderColor = 'rgba(239,68,68,0.3)';
        modeDesc.innerHTML = '<p style="color: #fca5a5; font-size: 0.8rem; margin: 0;">🚨 <strong>Urgent Popup:</strong> Appears IMMEDIATELY as a popup on users\' screens, even during quizzes!</p>';

        targetSection.style.display = 'block';
        typeSection.style.display = 'none';
        sendBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        sendBtn.innerHTML = '🚨 Send Urgent Alert';

        // Load groups for the dropdown
        this.loadGroupsForNotification();
    }
};

// Load message groups for urgent alerts
BroProAdmin.loadGroupsForNotification = async function () {
    try {
        if (!this.db) return;

        const select = document.getElementById('notifTargetGroup');
        if (!select) return;

        // Keep "All Users" option
        select.innerHTML = '<option value="all">📢 All Users</option>';

        // Load groups from Firestore
        const groupsSnap = await this.db.collection('messageGroups').get();
        groupsSnap.forEach(doc => {
            const group = doc.data();
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = `${group.icon || '👥'} ${group.name} (${group.members?.length || 0} members)`;
            select.appendChild(option);
        });

        this._loadedGroups = groupsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
        console.error('Error loading groups:', error);
    }
};

// Select notification type
BroProAdmin.selectNotifType = function (btn) {
    document.querySelectorAll('.notif-type-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'rgba(255,255,255,0.1)';
    });
    btn.classList.add('active');
    btn.style.background = 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
};

BroProAdmin.sendNotification = async function () {
    const title = document.getElementById('notifTitle')?.value?.trim();
    const message = document.getElementById('notifMessage')?.value?.trim();

    if (!title || !message) {
        alert('❌ Please fill in title and message');
        return;
    }

    // Dispatch based on mode
    if (this._notificationMode === 'urgent') {
        await this.sendUrgentAlert(title, message);
    } else {
        await this.sendBellNotification(title, message);
    }
};

// Send Bell Notification (appears in notification bell)
BroProAdmin.sendBellNotification = async function (title, message) {
    const activeTypeBtn = document.querySelector('.notif-type-btn.active');
    const type = activeTypeBtn?.dataset?.type || 'feature';

    const sendBtn = document.getElementById('sendNotifBtn');
    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = '⏳ Sending...';
    }

    try {
        if (!this.db) {
            throw new Error('Database not connected');
        }

        // Send notification to Firestore notifications collection
        await this.db.collection('notifications').add({
            type: type,
            title: title,
            message: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: this.ADMIN_EMAIL || 'admin',
            active: true,
            expiresAt: null
        });

        // Show success  
        if (this.showAdminToast) {
            this.showAdminToast('success', `🔔 Bell notification sent: "${title}"`);
        } else {
            alert('✅ Bell notification sent successfully!');
        }

        // Clear form & close modal
        document.getElementById('notifTitle').value = '';
        document.getElementById('notifMessage').value = '';
        setTimeout(() => this.closeNotificationModal(), 800);

    } catch (error) {
        console.error('Error sending bell notification:', error);
        alert('❌ Failed to send: ' + error.message);
    } finally {
        if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = '📤 Send Bell Notification';
        }
    }
};

// Send Urgent Alert (appears as real-time popup)
BroProAdmin.sendUrgentAlert = async function (title, message) {
    const targetGroup = document.getElementById('notifTargetGroup')?.value || 'all';

    const sendBtn = document.getElementById('sendNotifBtn');
    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = '⏳ Sending...';
    }

    try {
        if (!this.db) {
            throw new Error('Database not connected');
        }

        // Send to groupMessages collection with isUrgent flag
        // This triggers the urgent-admin-alerts.js listener
        await this.db.collection('groupMessages').add({
            groupId: targetGroup,
            title: title,
            message: message,
            sender: 'Admin',
            senderEmail: this.ADMIN_EMAIL || 'admin@bropro.app',
            isUrgent: true,
            isAdminAlert: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Show success  
        if (this.showAdminToast) {
            this.showAdminToast('success', `🚨 Urgent alert sent: "${title}"`);
        } else {
            alert('✅ Urgent alert sent! Users will see a popup immediately.');
        }

        // Clear form & close modal
        document.getElementById('notifTitle').value = '';
        document.getElementById('notifMessage').value = '';
        setTimeout(() => this.closeNotificationModal(), 800);

    } catch (error) {
        console.error('Error sending urgent alert:', error);
        alert('❌ Failed to send: ' + error.message);
    } finally {
        if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = '🚨 Send Urgent Alert';
        }
    }
};

// ============================================
// GROUP MESSAGE MODAL
// ============================================
BroProAdmin.openGroupMessageModal = function () {
    let modal = document.getElementById('groupMessageModal');
    if (!modal) {
        this.createGroupMessageModal();
        modal = document.getElementById('groupMessageModal');
    }
    modal.style.display = 'flex';
};

BroProAdmin.closeGroupMessageModal = function () {
    const modal = document.getElementById('groupMessageModal');
    if (modal) modal.style.display = 'none';
};

BroProAdmin.createGroupMessageModal = function () {
    const modalHTML = `
    <div id="groupMessageModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; justify-content: center; align-items: center; padding: 1rem;">
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; padding: 2rem; max-width: 500px; width: 100%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: #06b6d4; font-size: 1.5rem;">👥 Group Message</h2>
                <button onclick="BroProAdmin.closeGroupMessageModal()" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <label style="color: #94a3b8; font-size: 0.85rem;">Select Group</label>
                    <select id="groupSelect" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: none; color: #fff; margin-top: 0.25rem;">
                        <option value="all">All Students</option>
                        <option value="premium">Premium Users</option>
                        <option value="active">Active This Week</option>
                    </select>
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 0.85rem;">Message</label>
                    <textarea id="groupMessage" placeholder="Your message to the group..." rows="4" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: none; color: #fff; margin-top: 0.25rem; resize: vertical;"></textarea>
                </div>
                <button onclick="BroProAdmin.sendGroupMessage()" style="width: 100%; padding: 1rem; border-radius: 12px; background: linear-gradient(135deg, #06b6d4, #0891b2); border: none; color: #fff; font-weight: 600; cursor: pointer;">📤 Send Group Message</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

BroProAdmin.sendGroupMessage = function () {
    const group = document.getElementById('groupSelect')?.value;
    const message = document.getElementById('groupMessage')?.value;
    if (!message) {
        alert('Please enter a message');
        return;
    }
    alert('Message sent to: ' + group);
    this.closeGroupMessageModal();
};

// ============================================
// USER SEARCH MODAL
// ============================================
BroProAdmin.openUserSearchModal = function () {
    let modal = document.getElementById('userSearchModal');
    if (!modal) {
        this.createUserSearchModal();
        modal = document.getElementById('userSearchModal');
    }
    modal.style.display = 'flex';
    this.loadAllUsersForSearch();
};

BroProAdmin.closeUserSearchModal = function () {
    const modal = document.getElementById('userSearchModal');
    if (modal) modal.style.display = 'none';
};

BroProAdmin.createUserSearchModal = function () {
    const modalHTML = `
    <div id="userSearchModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; justify-content: center; align-items: center; padding: 1rem;">
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; padding: 2rem; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2 style="color: #3b82f6; font-size: 1.5rem;">🔍 Find Players</h2>
                <button onclick="BroProAdmin.closeUserSearchModal()" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>
            <input type="text" id="userSearchInput" placeholder="Search by name or email..." oninput="BroProAdmin.filterUsers(this.value)" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: none; color: #fff; margin-bottom: 1rem;">
            <div id="userSearchResults" style="max-height: 400px; overflow-y: auto;">
                <p style="color: #94a3b8;">Loading users...</p>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

BroProAdmin.loadAllUsersForSearch = async function () {
    const results = document.getElementById('userSearchResults');
    if (!results) return;
    results.innerHTML = '<p style="color: #94a3b8;">User search loading...</p>';
};

BroProAdmin.filterUsers = function (query) {
    console.log('Searching for:', query);
};

// ============================================
// COMPASSION SCHOLARSHIP MODAL
// ============================================
BroProAdmin.openCompassionScholarshipModal = function () {
    let modal = document.getElementById('compassionScholarshipModal');
    if (!modal) {
        this.createCompassionScholarshipModal();
        modal = document.getElementById('compassionScholarshipModal');
    }
    modal.style.display = 'flex';
    this.loadScholarshipData();
};

BroProAdmin.closeCompassionScholarshipModal = function () {
    const modal = document.getElementById('compassionScholarshipModal');
    if (modal) modal.style.display = 'none';
};

BroProAdmin.createCompassionScholarshipModal = function () {
    const modalHTML = `
    <div id="compassionScholarshipModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; justify-content: center; align-items: center; padding: 1rem;">
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; padding: 2rem; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: #14b8a6; font-size: 1.5rem;">🎓 Compassion Scholarships</h2>
                <button onclick="BroProAdmin.closeCompassionScholarshipModal()" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>
            <div id="scholarshipStats" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                <div style="background: rgba(20,184,166,0.2); border-radius: 12px; padding: 1rem; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #14b8a6;" id="scholarshipTotal">0</div>
                    <div style="color: #94a3b8; font-size: 0.8rem;">Total Funded</div>
                </div>
                <div style="background: rgba(34,197,94,0.2); border-radius: 12px; padding: 1rem; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #22c55e;" id="scholarshipAvail">0</div>
                    <div style="color: #94a3b8; font-size: 0.8rem;">Available</div>
                </div>
                <div style="background: rgba(59,130,246,0.2); border-radius: 12px; padding: 1rem; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #3b82f6;" id="scholarshipUsed">0</div>
                    <div style="color: #94a3b8; font-size: 0.8rem;">Claimed</div>
                </div>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                <label style="color: #94a3b8; font-size: 0.85rem;">Add Scholarship Slots</label>
                <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                    <input type="number" id="addScholarshipCount" value="1" min="1" style="flex: 1; padding: 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.1); border: none; color: #fff;">
                    <button onclick="BroProAdmin.addScholarshipSlots()" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: linear-gradient(135deg, #14b8a6, #0d9488); border: none; color: #fff; font-weight: 600; cursor: pointer;">Add</button>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

BroProAdmin.loadScholarshipData = async function () {
    // Load scholarship data from Firestore
    try {
        if (!this.db) return;
        const doc = await this.db.collection('config').doc('compassionScholarship').get();
        if (doc.exists) {
            const data = doc.data();
            const totalEl = document.getElementById('scholarshipTotal');
            const availEl = document.getElementById('scholarshipAvail');
            const usedEl = document.getElementById('scholarshipUsed');
            const countEl = document.getElementById('scholarshipSlotsCount');

            if (totalEl) totalEl.textContent = data.totalFunded || 0;
            if (availEl) availEl.textContent = data.available || 0;
            if (usedEl) usedEl.textContent = data.claimed || 0;
            if (countEl) countEl.textContent = data.available || 0;
        }
    } catch (e) {
        console.log('Error loading scholarship data:', e);
    }
};

BroProAdmin.addScholarshipSlots = async function () {
    const count = parseInt(document.getElementById('addScholarshipCount')?.value) || 1;
    alert('Added ' + count + ' scholarship slot(s)');
};

// ============================================
// SELF-HEALING CACHE BUSTER FOR NEWSROOM UPDATES
// ============================================
(function() {
    try {
        const path = window.location.pathname;
        if (path.includes('/news/') || path.includes('/news/index.html')) {
            // Check if the DOM is missing the new profile section indicating stale HTML cache
            const runCheck = () => {
                const isNewsReader = document.getElementById('newsHamburgerDropdown') && document.getElementById('dropdownBookmarksFilterBtn');
                if (isNewsReader && !document.getElementById('dropdownProfileSection')) {
                    console.warn('[BP Times SW Alert] Stale news reader HTML detected. Evicting caches and reloading...');
                    if ('serviceWorker' in navigator) {
                        navigator.serviceWorker.getRegistrations().then(registrations => {
                            for (const reg of registrations) {
                                reg.unregister();
                            }
                            if (window.caches) {
                                caches.keys().then(keys => {
                                    Promise.all(keys.map(key => caches.delete(key))).then(() => {
                                        window.location.reload(true);
                                    });
                                });
                            } else {
                                window.location.reload(true);
                            }
                        }).catch(() => {
                            window.location.reload(true);
                        });
                    } else {
                        window.location.reload(true);
                    }
                }
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', runCheck);
            } else {
                runCheck();
            }
        }
    } catch(e) {
        console.error('Cache buster error:', e);
    }
})();
