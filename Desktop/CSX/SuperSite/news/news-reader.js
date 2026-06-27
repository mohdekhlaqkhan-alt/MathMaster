/**
 * 📰 BroPro Times — News Reader Logic
 * Public news reader for the BroPro educational platform.
 * Reads published articles from Firestore, supports reactions,
 * bookmarks (localStorage), sharing, and reporting.
 */

const NEWS = (() => {
    'use strict';

    /* ── State ── */
    let articles = [];
    let featuredArticle = null;
    let activeCategory = 'all';
    let activeState = 'all';
    let currentUser = null;
    let userReactions = {};    // { articleId: reactionType }
    let openArticleId = null;
    let isLoading = true;
    // Safe localStorage parsing helper
    function safeParseJSON(key, fallback) {
        try {
            const val = localStorage.getItem(key);
            if (val === null) return fallback;
            return JSON.parse(val);
        } catch (e) {
            console.warn(`[BP Times] Failed to parse localStorage key "${key}":`, e);
            return fallback;
        }
    }

    let bookmarks = safeParseJSON('bpt_bookmarks', {});
    
    // Hyperlocal Location Filter State
    let selectedLocation = safeParseJSON('bpt_selected_location', { city: 'Ayodhya', tehsil: 'all', village: 'all' });
    if (!selectedLocation || typeof selectedLocation !== 'object') {
        selectedLocation = { city: 'Ayodhya', tehsil: 'all', village: 'all' };
    }
    if (!selectedLocation.city) selectedLocation.city = 'Ayodhya';
    
    let isBookmarksFilterActive = false;
    let breakingNews = [];

    // Personal Feed ("My Feed") State
    let userInterests = safeParseJSON('bpt_user_interests', []);
    if (!Array.isArray(userInterests)) userInterests = [];
    
    let readArticlesVal = safeParseJSON('bpt_read_articles', []);
    let readArticles = new Set(Array.isArray(readArticlesVal) ? readArticlesVal : []);
    
    let isFeedActive = false;
    let feedActiveTopic = 'all';
    let feedLoadedCount = 0;
    let isFeedScrolling = false;
    let feedMixedArticles = [];
    const FEED_PAGE_SIZE = 5;

    const CATEGORY_ICONS = {
        school_news:  'school',
        education:    'menu_book',
        achievements: 'workspace_premium',
        campus_life:  'diversity_3',
        careers:      'work',
        politics:     'gavel',
        business:     'trending_up',
        science_tech: 'science',
        environment:  'nature_people',
        health:       'favorite',
        sports:       'sports_soccer',
        arts_culture: 'palette',
        literature:   'import_contacts',
        opinion:      'rate_review',
        local:        'location_city',
        interviews:   'record_voice_over',
        world_brief:  'public'
    };

    const CATEGORIES = {
        all:          { label: 'मुख्य समाचार',    emoji: '' },
        school_news:  { label: 'स्कूल समाचार',    emoji: '' },
        education:    { label: 'शिक्षा जगत',       emoji: '' },
        achievements: { label: 'उपलब्धियां',      emoji: '' },
        campus_life:  { label: 'कैंपस लाइफ',       emoji: '' },
        careers:      { label: 'करियर मार्गदर्शन',   emoji: '' },
        politics:     { label: 'राजनीति एवं समाज',    emoji: '' },
        business:     { label: 'व्यापार एवं अर्थव्यवस्था', emoji: '' },
        science_tech: { label: 'विज्ञान एवं तकनीक',    emoji: '' },
        environment:  { label: 'पर्यावरण एवं जलवायु',  emoji: '' },
        health:       { label: 'स्वास्थ्य एवं कल्याण',  emoji: '' },
        sports:       { label: 'खेलकूद',          emoji: '' },
        arts_culture: { label: 'कला एवं संस्कृति',   emoji: '' },
        literature:   { label: 'साहित्य एवं पुस्तकें',  emoji: '' },
        opinion:      { label: 'विचार एवं विश्लेषण',  emoji: '' },
        local:        { label: 'स्थानीय समाचार',     emoji: '' },
        interviews:   { label: 'साक्षात्कार एवं विशेष', emoji: '' },
        world_brief:  { label: 'विश्व समाचार',     emoji: '' },
    };

    const BIAS_LABELS = {
        factual_report: '📊 Factual',
        opinion:        '💬 Opinion',
        announcement:   '📢 Announcement',
        investigation:  '🔍 Investigation',
    };

    const REACTIONS = ['👍', '❤️', '🔥', '💡', '🤔'];

    /* ── DOM Refs ── */
    const $ = id => document.getElementById(id);
    const el = (tag, cls, html) => {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (html !== undefined) e.innerHTML = html;
        return e;
    };

    /* ── Init ── */
    function init() {
        // Stale HTML check to bust old service worker cache
        if (!document.getElementById('dropdownProfileSection')) {
            console.warn('[BP Times] Stale HTML detected (missing profile section). Forcing service worker cache purge and reload...');
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    for (const registration of registrations) {
                        registration.unregister();
                    }
                    caches.keys().then(names => {
                        for (const name of names) {
                            caches.delete(name);
                        }
                        window.location.reload(true);
                    });
                }).catch(() => {
                    window.location.reload(true);
                });
            } else {
                window.location.reload(true);
            }
            return;
        }

        try {
            setupDiagnostics();
            initTheme();
            renderCategoryPills();
            startHeaderClock();
            startLiveTicker();
            showLoadingSkeletons();
            setupScrollEffects();
            loadArticles();
            updateBookmarksCountBadge();

            // Listen to custom breaking news settings
            db.collection('newsSettings').doc('breaking').onSnapshot(doc => {
                if (doc.exists) {
                    breakingNews = doc.data().items || [];
                } else {
                    breakingNews = [];
                }
                renderTicker();
            }, err => {
                console.warn('[BP Times] Failed to listen to breaking settings:', err);
            });

            // Search Input hook
            const searchInput = $('newsSearchInput');
            if (searchInput) {
                searchInput.addEventListener('input', () => {
                    renderLatestGrid();
                });
            }

            // Setup personal feed scroll pagination
            setupFeedScrollObserver();

            // Auth state observer
            auth.onAuthStateChanged(user => {
                currentUser = user;
                if (openArticleId) {
                    loadUserReaction(openArticleId);
                }
                updateDropdownProfile(user);
                checkAndShowDashboardBtn(user);
            });
        } catch (e) {
            console.error('Error in BroPro Times initialization:', e);
        }
    }

    function setupDiagnostics() {
        const diag = document.createElement('div');
        diag.id = 'bp-diagnostics';
        diag.style.position = 'fixed';
        diag.style.top = '100px';
        diag.style.right = '12px';
        diag.style.background = 'rgba(15, 23, 42, 0.95)';
        diag.style.color = '#10b981';
        diag.style.padding = '12px';
        diag.style.borderRadius = '12px';
        diag.style.fontSize = '10px';
        diag.style.fontFamily = 'monospace';
        diag.style.zIndex = '999999';
        diag.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        diag.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.3)';
        diag.style.pointerEvents = 'none';
        diag.style.lineHeight = '1.4';
        diag.style.width = '300px';
        diag.style.maxHeight = '300px';
        diag.style.overflowY = 'auto';
        diag.style.whiteSpace = 'pre-wrap';
        diag.style.wordBreak = 'break-all';
        document.body.appendChild(diag);

        const logs = [];
        window.addEventListener('error', (e) => {
            logs.push(`❌ ERR: ${e.message} (${e.filename}:${e.lineno})`);
        });

        // Intercept console.error to capture card rendering and other runtime issues
        const originalError = console.error;
        console.error = function(...args) {
            logs.push(`🔴 ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}`);
            originalError.apply(console, args);
        };

        setInterval(() => {
            const loc = localStorage.getItem('bpt_selected_location') || 'null';
            const ints = localStorage.getItem('bpt_user_interests') || 'null';
            const errText = logs.length > 0 ? `<div style="color: #ef4444; border-top: 1px solid rgba(239, 68, 68, 0.2); padding-top: 4px; margin-top: 4px;">${logs.slice(-5).join('<br>')}</div>` : 'No JS crashes';
            
            diag.innerHTML = `
                <div style="font-weight: bold; border-bottom: 1px solid rgba(16, 185, 129, 0.2); padding-bottom: 4px; margin-bottom: 4px; color: #34d399;">🕵️ BroPro Diagnostics</div>
                <div>VER: ${window.BROPRO_VERSION || 'null'}</div>
                <div>ACTIVE LOC: ${loc}</div>
                <div>STATE FILTER: ${activeState}</div>
                <div>CATEGORY FILTER: ${activeCategory}</div>
                <div>USER INTS: ${ints}</div>
                <div>ARTICLES: ${articles ? articles.length : 0} (isLoading: ${isLoading})</div>
                <div>FEED STATE: Active=${isFeedActive}</div>
                <div>MIXED FEED: ${typeof feedMixedArticles !== 'undefined' ? feedMixedArticles.length : 0}</div>
                ${errText}
            `;
        }, 500);
    }

    /* ── Theme Toggling ── */
    function initTheme() {
        const storedTheme = localStorage.getItem('bpt_theme') || 'light';
        setTheme(storedTheme);
    }

    function setTheme(theme) {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
            localStorage.setItem('bpt_theme', 'dark');
            const lightBtn = $('themeBtnLight');
            const darkBtn = $('themeBtnDark');
            if (lightBtn && darkBtn) {
                lightBtn.className = 'text-caption font-label-md text-on-surface-variant flex items-center gap-1 cursor-pointer select-none';
                darkBtn.className = 'text-caption font-label-md text-primary flex items-center gap-1 cursor-pointer select-none';
            }
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
            localStorage.setItem('bpt_theme', 'light');
            const lightBtn = $('themeBtnLight');
            const darkBtn = $('themeBtnDark');
            if (lightBtn && darkBtn) {
                lightBtn.className = 'text-caption font-label-md text-primary flex items-center gap-1 cursor-pointer select-none';
                darkBtn.className = 'text-caption font-label-md text-on-surface-variant flex items-center gap-1 cursor-pointer select-none';
            }
        }
    }

    /* ── Hamburger Dropdown Actions ── */
    function toggleMenu(forceState) {
        const dropdown = $('newsHamburgerDropdown');
        if (!dropdown) return;
        const open = forceState !== undefined ? forceState : dropdown.classList.contains('hidden');
        if (open) {
            dropdown.classList.remove('hidden');
            updateDropdownThemeOption();
        } else {
            dropdown.classList.add('hidden');
        }
    }

    function toggleMenuTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
        toggleMenu(false);
    }

    function updateDropdownThemeOption() {
        const icon = $('dropdownThemeIcon');
        const text = $('dropdownThemeText');
        if (!icon || !text) return;
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            icon.textContent = 'light_mode';
            text.textContent = 'लाइट थीम (Light Mode)';
        } else {
            icon.textContent = 'dark_mode';
            text.textContent = 'डार्क थीम (Dark Mode)';
        }
    }

    function toggleBookmarksFilter() {
        isBookmarksFilterActive = !isBookmarksFilterActive;
        const btn = $('dropdownBookmarksFilterBtn');
        if (btn) {
            if (isBookmarksFilterActive) {
                btn.classList.add('bg-primary/10', 'font-bold', 'text-primary');
            } else {
                btn.classList.remove('bg-primary/10', 'font-bold', 'text-primary');
            }
        }
        toggleMenu(false);
        renderAll();
        showToast(isBookmarksFilterActive ? 'बुकमार्क फ़िल्टर सक्रिय' : 'बुकमार्क फ़िल्टर हटाया गया');
    }

    function updateBookmarksCountBadge() {
        const badge = $('bookmarksCountBadge');
        if (badge) {
            const count = Object.keys(bookmarks).length;
            if (count > 0) {
                badge.textContent = count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }

    /* ── Auth, Sign In/Out & Dropdown Profile management ── */
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }

    function updateDropdownProfile(user) {
        const profileSec = $('dropdownProfileSection');
        if (!profileSec) return;

        if (user) {
            const avatarHtml = buildAvatarHTML(user.photoURL, user.displayName || user.email || '?', 36, true);
            profileSec.innerHTML = `
                <div class="flex items-center gap-2.5">
                    ${avatarHtml}
                    <div class="flex flex-col min-w-0">
                        <span class="text-body-sm font-semibold text-on-surface truncate">${escapeHtml(user.displayName || 'BroPro User')}</span>
                        <span class="text-[10px] text-on-surface-variant truncate">${escapeHtml(user.email || '')}</span>
                    </div>
                </div>
                <button onclick="NEWS.signOut()" class="w-full text-left text-[11px] text-error hover:underline mt-1 cursor-pointer select-none">
                    लॉगआउट (Sign Out)
                </button>
            `;
        } else {
            profileSec.innerHTML = `
                <button onclick="NEWS.signIn()" class="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-2 px-3 rounded-lg text-body-sm font-semibold hover:bg-secondary transition-all cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.9 33.5 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.7 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.2-2.7-.4-3.9z"/>
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.5 18.8 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.7 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                        <path fill="#4CAF50" d="M24 44c5.2(0 9.9-1.6 13.4-4.4l-6.2-5.2C29.2 35.7 26.7 36 24 36c-5.4 0-9.9-2.5-11.3-8H6.1C9.4 39.6 16.2 44 24 44z"/>
                        <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.4l6.2 5.2C36.7 39.2 44 34 44 24c0-1.3-.2-2.7-.4-3.9z"/>
                    </svg>
                    लॉगिन करें (Sign In)
                </button>
            `;
        }
    }

    function signIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(() => {
            showToast('सफलतापूर्वक लॉगिन किया गया (Signed In)');
        }).catch(err => {
            console.error('Sign-in error:', err);
            showToast('लॉगिन विफल (Sign-in failed)');
        });
    }

    function signOut() {
        auth.signOut().then(() => {
            showToast('सफलतापूर्वक लॉगआउट किया गया (Signed Out)');
        }).catch(err => {
            console.error('Sign-out error:', err);
        });
    }

    /* ── Role-Aware Dashboard Button inside Dropdown ── */
    const ADMIN_EMAIL = 'mohdekhlaqkhan@gmail.com';

    async function checkAndShowDashboardBtn(user) {
        const dropdownBtn = $('dropdownDashboardBtn');
        if (dropdownBtn) {
            dropdownBtn.classList.add('hidden');
            dropdownBtn.classList.remove('flex');
            dropdownBtn.style.display = 'none';
        }

        let hasAccess = false;

        // Diagnostic banner for live testing
        let diagBanner = document.getElementById('newsDiagnosticBanner');
        if (!diagBanner) {
            diagBanner = document.createElement('div');
            diagBanner.id = 'newsDiagnosticBanner';
            diagBanner.style.cssText = 'background:rgba(0,0,0,0.9); color:#fff; padding:10px 15px; font-size:12px; font-family:monospace; position:fixed; bottom:0; left:0; right:0; z-index:99999; display:flex; justify-content:space-between; align-items:center; border-top:2px solid #6366f1; box-shadow:0 -4px 10px rgba(0,0,0,0.5);';
            document.body.appendChild(diagBanner);
        }
        
        const updateDiag = (email, uid, access) => {
            diagBanner.innerHTML = `
                <span>👤 User: ${email} | UID: ${uid} | Access: <strong style="color:${access ? '#4ade80' : '#f87171'}">${access ? 'YES' : 'NO'}</strong></span>
                <button onclick="this.parentElement.remove()" style="color:#ff8787; border:none; background:none; cursor:pointer; font-weight:bold; font-size:14px; padding:0 5px;">✕</button>
            `;
        };

        if (!user) {
            console.log('[BP Times] No user logged in.');
            updateDiag('None (Guest)', 'N/A', false);
            return;
        }

        console.log('[BP Times] Checking access for user:', user.email, 'UID:', user.uid);

        // Admin check
        if (user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
            console.log('[BP Times] User is admin, granting access.');
            hasAccess = true;
        } else {
            // Check newsRoles collection
            try {
                // 1. Try direct UID lookup first
                const roleDoc = await db.collection('newsRoles').doc(user.uid).get();
                if (roleDoc.exists) {
                    const data = roleDoc.data();
                    console.log('[BP Times] Role doc found by UID:', data);
                    if (data.active !== false) {
                        hasAccess = true;
                        console.log('[BP Times] Active role assigned by UID, granting access.');
                    } else {
                        console.log('[BP Times] Role is inactive by UID.');
                    }
                }
                
                // 2. Try direct Email ID lookups (if the doc ID in Firestore is the email itself)
                if (!hasAccess && user.email) {
                    const emailDocs = await Promise.all([
                        db.collection('newsRoles').doc(user.email).get(),
                        db.collection('newsRoles').doc(user.email.toLowerCase()).get()
                    ]);
                    
                    for (const doc of emailDocs) {
                        if (doc.exists) {
                            const data = doc.data();
                            console.log('[BP Times] Role doc found by Email ID:', data);
                            if (data.active !== false) {
                                hasAccess = true;
                                console.log('[BP Times] Active role assigned by Email ID, granting access.');
                                break;
                            }
                        }
                    }
                }
                
                // 3. Try Email query fallback if direct lookups didn't match (checking the 'email' field in docs)
                if (!hasAccess && user.email) {
                    const emailMatches = await Promise.all([
                        db.collection('newsRoles').where('email', '==', user.email).limit(1).get(),
                        db.collection('newsRoles').where('email', '==', user.email.toLowerCase()).limit(1).get()
                    ]);
                    
                    for (const snap of emailMatches) {
                        if (!snap.empty) {
                            const data = snap.docs[0].data();
                            console.log('[BP Times] Role doc found by Email query:', data);
                            if (data.active !== false) {
                                hasAccess = true;
                                console.log('[BP Times] Active role assigned by Email query, granting access.');
                                break;
                            }
                        }
                    }
                }

                if (!hasAccess) {
                    console.log('[BP Times] No active role doc found in newsRoles for UID/Email:', user.uid, user.email);
                }
            } catch (e) {
                console.error('[BP Times] Role check query failed:', e);
            }
        }

        if (hasAccess && dropdownBtn) {
            dropdownBtn.classList.remove('hidden');
            dropdownBtn.classList.add('flex');
            dropdownBtn.style.setProperty('display', 'flex', 'important');
            console.log('[BP Times] Dashboard button displayed.');
        }

        updateDiag(user.email, user.uid, hasAccess);
    }

    /* ── Firestore: Load Articles ── */
    function loadArticles() {
        // Safe timeout fallback for local/offline testing hangs (3.5 seconds)
        const loadTimeout = setTimeout(() => {
            if (isLoading) {
                console.warn('Firestore load timed out. Rendering fallback/offline state.');
                isLoading = false;
                renderAll();
            }
        }, 3500);

        db.collection('newsArticles')
            .where('status', 'in', ['published', 'updated'])
            .onSnapshot(snap => {
                clearTimeout(loadTimeout);
                articles = [];
                featuredArticle = null;

                snap.forEach(doc => {
                    const data = { id: doc.id, ...doc.data() };
                    if (data.isFeatured && !featuredArticle) {
                        featuredArticle = data;
                    }
                    articles.push(data);
                });

                // Sort client-side to avoid index building delays
                articles.sort((a, b) => {
                    const ta = a.publishedAt?.toMillis?.() || 0;
                    const tb = b.publishedAt?.toMillis?.() || 0;
                    return tb - ta;
                });

                isLoading = false;

                // Extract locations dynamically from articles
                extractLocationLists();

                // Hydrate Location dot indicator
                const activeDot = $('locationFilterActiveDot');
                if (activeDot) {
                    if (selectedLocation.city !== 'all') {
                        activeDot.classList.remove('hidden');
                    } else {
                        activeDot.classList.add('hidden');
                    }
                }

                renderAll();

                // Open article if deep-linked via URL query parameters
                const params = new URLSearchParams(window.location.search);
                const queryArticle = params.get('article');
                if (queryArticle) {
                    const found = articles.find(a => a.id === queryArticle || a.slug === queryArticle);
                    if (found) openArticle(found.id);
                }
            }, err => {
                clearTimeout(loadTimeout);
                console.error('Error loading articles:', err);
                isLoading = false;
                renderAll();
            });
    }

    function extractLocationLists() {
        const citySelect = $('selectLocCity');
        if (!citySelect) return;

        const prevCity = citySelect.value || selectedLocation.city;
        citySelect.innerHTML = `
            <option value="all">सभी शहर (All Cities)</option>
            <option value="Ayodhya">अयोध्या (Ayodhya)</option>
        `;

        // Normalize casing to avoid duplicates in the dropdown
        const uniqueCitiesMap = new Map(); // lowercase -> original case
        articles.forEach(a => {
            const c = a.location?.city;
            if (c && c.trim()) {
                const trimmed = c.trim();
                const lower = trimmed.toLowerCase();
                if (lower !== 'ayodhya' && lower !== 'अयोध्या') {
                    // Store the first casing we see
                    if (!uniqueCitiesMap.has(lower)) {
                        uniqueCitiesMap.set(lower, trimmed);
                    }
                }
            }
        });

        const sortedCities = Array.from(uniqueCitiesMap.values()).sort();
        sortedCities.forEach(c => {
            const opt = el('option');
            opt.value = c;
            opt.textContent = c;
            citySelect.appendChild(opt);
        });

        // Smart check for Ayodhya / अयोध्या
        let matchCity = prevCity;
        if (prevCity && (prevCity.toLowerCase() === 'ayodhya' || prevCity === 'अयोध्या')) {
            matchCity = 'Ayodhya';
        }

        // Compare case-insensitively when validating prevCity selection
        const lowerMatchCity = matchCity ? matchCity.toLowerCase() : '';
        const foundCity = Array.from(uniqueCitiesMap.keys()).find(k => k === lowerMatchCity);

        if (matchCity === 'Ayodhya') {
            citySelect.value = 'Ayodhya';
            selectedLocation.city = 'Ayodhya';
        } else if (foundCity) {
            const originalCasing = uniqueCitiesMap.get(foundCity);
            citySelect.value = originalCasing;
            selectedLocation.city = originalCasing;
        } else {
            citySelect.value = 'all';
            selectedLocation.city = 'all';
        }

        updateTehsilDropdown();
    }

    function updateTehsilDropdown() {
        const citySelect = $('selectLocCity');
        const tehsilSelect = $('selectLocTehsil');
        const villageSelect = $('selectLocVillage');
        if (!citySelect || !tehsilSelect) return;

        const city = citySelect.value;
        tehsilSelect.innerHTML = '<option value="all">सभी तहसील (All Tehsils)</option>';
        villageSelect.innerHTML = '<option value="all">सभी ग्राम / मोहल्ले (All Villages/Areas)</option>';
        villageSelect.disabled = true;

        if (city === 'all') {
            tehsilSelect.disabled = true;
            return;
        }

        tehsilSelect.disabled = false;
        const uniqueTehsils = new Set();
        articles.forEach(a => {
            if (a.location?.city === city) {
                const t = a.location?.tehsil;
                if (t && t.trim()) uniqueTehsils.add(t.trim());
            }
        });

        Array.from(uniqueTehsils).sort().forEach(t => {
            const opt = el('option');
            opt.value = t;
            opt.textContent = t;
            tehsilSelect.appendChild(opt);
        });
    }

    function updateVillageDropdown() {
        const citySelect = $('selectLocCity');
        const tehsilSelect = $('selectLocTehsil');
        const villageSelect = $('selectLocVillage');
        if (!citySelect || !tehsilSelect || !villageSelect) return;

        const city = citySelect.value;
        const tehsil = tehsilSelect.value;
        villageSelect.innerHTML = '<option value="all">सभी ग्राम / मोहल्ले (All Villages/Areas)</option>';

        if (tehsil === 'all') {
            villageSelect.disabled = true;
            return;
        }

        villageSelect.disabled = false;
        const uniqueVillages = new Set();
        articles.forEach(a => {
            if (a.location?.city === city && a.location?.tehsil === tehsil) {
                const v = a.location?.village;
                if (v && v.trim()) uniqueVillages.add(v.trim());
            }
        });

        Array.from(uniqueVillages).sort().forEach(v => {
            const opt = el('option');
            opt.value = v;
            opt.textContent = v;
            villageSelect.appendChild(opt);
        });
    }

    function onLocCityChange() {
        updateTehsilDropdown();
    }

    function onLocTehsilChange() {
        updateVillageDropdown();
    }

    function toggleLocationModal(forceState) {
        const overlay = $('locationSelectorOverlay');
        if (!overlay) return;

        const open = forceState !== undefined ? forceState : !overlay.classList.contains('open');

        if (open) {
            const citySelect = $('selectLocCity');
            if (citySelect) {
                citySelect.value = selectedLocation.city;
                updateTehsilDropdown();
                
                const tehsilSelect = $('selectLocTehsil');
                if (tehsilSelect && selectedLocation.tehsil !== 'all') {
                    tehsilSelect.value = selectedLocation.tehsil;
                    updateVillageDropdown();
                    
                    const villageSelect = $('selectLocVillage');
                    if (villageSelect && selectedLocation.village !== 'all') {
                        villageSelect.value = selectedLocation.village;
                    }
                }
            }

            overlay.classList.add('open');
            document.body.classList.add('overflow-hidden');
        } else {
            overlay.classList.remove('open');
            if (!openArticleId) {
                document.body.classList.remove('overflow-hidden');
            }
        }
    }

    function applyLocationFilter() {
        const city = $('selectLocCity')?.value || 'all';
        const tehsil = $('selectLocTehsil')?.value || 'all';
        const village = $('selectLocVillage')?.value || 'all';

        selectedLocation = { city, tehsil, village };
        localStorage.setItem('bpt_selected_location', JSON.stringify(selectedLocation));

        const activeDot = $('locationFilterActiveDot');
        if (activeDot) {
            if (city !== 'all') {
                activeDot.classList.remove('hidden');
            } else {
                activeDot.classList.add('hidden');
            }
        }

        toggleLocationModal(false);
        renderAll();
        showToast(city === 'all' ? 'सभी स्थान फ़िल्टर हटा दिया गया' : `फ़िल्टर लागू: ${city}${tehsil !== 'all' ? ' ➔ ' + tehsil : ''}`);
    }

    function resetLocationFilter() {
        if ($('selectLocCity')) $('selectLocCity').value = 'all';
        updateTehsilDropdown();
        applyLocationFilter();
    }

    /* ── Hyperlocal & Bookmarks Article Filtering Source of Truth ── */
    function getFilteredArticles() {
        let list = [...articles];

        // Filter by category
        if (activeCategory && activeCategory !== 'all') {
            list = list.filter(a => a.category === activeCategory);
        }

        // Filter by state
        if (activeState && activeState !== 'all') {
            list = list.filter(a => {
                const loc = a.location;
                if (!loc) return false;
                const state = (loc.state || '').trim().toLowerCase();
                const filterState = activeState.trim().toLowerCase();
                return state === filterState;
            });
        }

        // Filter by location
        if (selectedLocation.city !== 'all') {
            list = list.filter(a => {
                const loc = a.location;
                if (!loc) return false;
                
                // Smart match for Ayodhya / अयोध्या (case-insensitive & bilingual)
                const filterCity = selectedLocation.city.trim().toLowerCase();
                const articleCity = (loc.city || '').trim().toLowerCase();
                if (filterCity === 'ayodhya' || filterCity === 'अयोध्या') {
                    if (articleCity !== 'ayodhya' && articleCity !== 'अयोध्या') return false;
                } else {
                    if (articleCity !== filterCity) return false;
                }
                
                if (selectedLocation.tehsil !== 'all' && loc.tehsil !== selectedLocation.tehsil) return false;
                if (selectedLocation.village !== 'all' && loc.village !== selectedLocation.village) return false;
                return true;
            });
        }

        // Filter by bookmarks toggle
        if (isBookmarksFilterActive) {
            list = list.filter(a => bookmarks[a.id]);
        }

        return list;
    }

    /* ── Render All columns ── */
    function renderAll() {
        if (isFeedActive) {
            renderPersonalFeed(true);
            renderTicker();
            renderPulseMonitor();
            renderSocialProof();
        } else {
            renderCategoryPills();
            renderTicker();
            renderHeroSection();
            renderBentoGrid();
            renderPulseMonitor();
            renderSocialProof();
            renderLatestGrid();
        }
    }

    /* ── Category Filtering pills ── */
    function renderCategoryPills() {
        const container = $('newsCategoryScroll');
        if (!container) return;
        container.innerHTML = '';

        Object.entries(CATEGORIES).forEach(([key, cat]) => {
            const isActive = key === activeCategory;
            const pill = el('button', `px-4 py-1.5 rounded-full text-caption font-label-md shrink-0 transition-all select-none whitespace-nowrap ${
                isActive 
                    ? 'bg-primary text-on-primary shadow-sm font-bold' 
                    : 'bg-surface-container hover:bg-surface-variant text-on-surface'
            }`);
            pill.textContent = cat.emoji ? `${cat.emoji} ${cat.label}` : cat.label;
            pill.onclick = () => setCategory(key);
            container.appendChild(pill);
        });
    }

    function setCategory(cat) {
        if (isFeedActive) {
            isFeedActive = false;
            const feedBtn = $('personalFeedNavBtn');
            if (feedBtn) feedBtn.classList.remove('active');
            const personalFeedView = $('personalFeedView');
            if (personalFeedView) personalFeedView.style.display = 'none';
            const heroSection = $('heroLeadSection');
            const bentoSection = $('bentoGrid')?.parentElement;
            const newsGridSection = $('newsGrid')?.parentElement;
            if (heroSection) heroSection.style.display = '';
            if (bentoSection) bentoSection.style.display = '';
            if (newsGridSection) newsGridSection.style.display = '';
        }

        activeCategory = cat;
        
        // Update header nav bar active states
        document.querySelectorAll('.header-nav-item, .header-dropdown-item').forEach(el => {
            el.classList.remove('active');
        });

        const mainNavItem = document.querySelector(`.header-nav-item[data-category="${cat}"]`);
        const moreBtn = $('moreCategoriesNavBtn');
        
        if (mainNavItem) {
            mainNavItem.classList.add('active');
            if (moreBtn) moreBtn.classList.remove('active');
        } else {
            const dropdownItem = document.querySelector(`.header-dropdown-item[data-category="${cat}"]`);
            if (dropdownItem) {
                dropdownItem.classList.add('active');
                if (moreBtn) moreBtn.classList.add('active');
            } else if (moreBtn) {
                moreBtn.classList.remove('active');
            }
        }

        renderCategoryPills();
        renderHeroSection();
        renderBentoGrid();
        renderLatestGrid();

        const gridTitle = $('latestNewsTitle');
        if (gridTitle) {
            gridTitle.textContent = cat === 'all' ? 'ताज़ा ख़बरें' : `ताज़ा ख़बरें: ${CATEGORIES[cat].label}`;
        }

        const activeEl = document.querySelector('#newsCategoryScroll button.bg-primary');
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    function setStateFilter(state) {
        activeState = state;
        
        // Update state nav active states
        document.querySelectorAll('.header-dropdown-item[data-state]').forEach(el => {
            el.classList.toggle('active', el.dataset.state === state);
        });

        const stateBtn = $('stateNavBtn');
        if (stateBtn) {
            if (state !== 'all') {
                stateBtn.classList.add('active');
                stateBtn.innerHTML = `${getStateHindiLabel(state)} <span class="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>`;
            } else {
                stateBtn.classList.remove('active');
                stateBtn.innerHTML = `राज्य <span class="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>`;
            }
        }

        renderHeroSection();
        renderBentoGrid();
        renderLatestGrid();

        showToast(state === 'all' ? 'राज्य फ़िल्टर हटाया गया' : `राज्य फ़िल्टर: ${getStateHindiLabel(state)}`);
    }

    function getStateHindiLabel(state) {
        const labels = {
            'all': 'सभी राज्य',
            'Uttar Pradesh': 'उत्तर प्रदेश (UP)',
            'Uttarakhand': 'उत्तराखंड (UK)',
            'Bihar': 'बिहार',
            'Delhi': 'दिल्ली',
            'Rajasthan': 'राजस्थान',
            'Madhya Pradesh': 'मध्य प्रदेश',
            'Haryana': 'हरियाणा',
            'Jharkhand': 'झारखंड',
            'Maharashtra': 'महाराष्ट्र'
        };
        return labels[state] || state;
    }

    /* ── Breaking News Ticker ── */
    function renderTicker() {
        const container = $('breakingTicker');
        if (!container) return;
        
        if (isLoading) {
            container.innerHTML = 'लोड हो रहा है...';
            return;
        }

        // Custom breaking news or fallback to latest articles
        const activeCustomBreaking = (breakingNews || []).filter(item => item && ((item.text && item.text.trim()) || (item.link && item.link.trim())));

        if (activeCustomBreaking.length > 0) {
            container.innerHTML = '';
            activeCustomBreaking.forEach((item) => {
                const hasText = item.text && item.text.trim();
                const hasLink = item.link && item.link.trim();
                
                let text = '';
                let cleanLink = '';
                
                if (hasText && hasLink) {
                    text = item.text.trim();
                    cleanLink = item.link.trim();
                } else if (hasText) {
                    text = item.text.trim();
                } else {
                    // Only link is present
                    text = item.link.trim();
                    // If it looks like a valid URL or an Article ID (no spaces, short), treat it as a link too
                    if (!text.includes(' ') && (text.startsWith('http://') || text.startsWith('https://') || text.length < 30)) {
                        cleanLink = text;
                    }
                }

                const span = el('span', 'breaking-ticker-item');
                span.innerHTML = `🔥 ${sanitize(text)}`;
                if (cleanLink) {
                    span.onclick = () => {
                        if (cleanLink.startsWith('http://') || cleanLink.startsWith('https://')) {
                            window.open(cleanLink, '_blank');
                        } else {
                            openArticle(cleanLink);
                        }
                    };
                }
                container.appendChild(span);
            });
        } else {
            const activeArticles = getFilteredArticles();
            const tickerArticles = activeArticles.slice(0, 5);
            if (tickerArticles.length === 0) {
                container.innerHTML = 'कोई नई खबर नहीं है।';
                return;
            }

            container.innerHTML = '';
            tickerArticles.forEach((a) => {
                const item = el('span', 'breaking-ticker-item');
                item.innerHTML = `• ${sanitize(a.title)}`;
                item.onclick = () => openArticle(a.id);
                container.appendChild(item);
            });
        }
    }

    /* ── Hero Lead Grid Section ── */
    function renderHeroSection() {
        const container = $('heroLeadSection');
        if (!container) return;
        container.innerHTML = '';

        if (isLoading) {
            container.innerHTML = buildHeroSkeleton();
            return;
        }

        const activeArticles = getFilteredArticles();
        if (activeArticles.length === 0) {
            container.style.display = 'none';
            return;
        }
        container.style.display = 'grid';

        // Lead story
        let lead = featuredArticle;
        if (!lead || !activeArticles.some(a => a.id === lead.id)) {
            lead = activeArticles[0];
        }

        const sideStories = activeArticles.filter(a => a.id !== lead.id).slice(0, 3);

        const leadCol = el('div', 'md:col-span-8 relative overflow-hidden rounded-lg cursor-pointer group/lead bg-surface-container border border-outline-variant shadow-sm h-[320px] md:h-[500px]');
        leadCol.onclick = () => openArticle(lead.id);

        const coverUrl = lead.coverImageUrl || '';
        const imageHTML = coverUrl 
            ? `<img alt="${sanitize(lead.title)}" class="w-full h-full object-cover transition-transform duration-700 group-hover/lead:scale-105" src="${sanitize(coverUrl)}" loading="lazy"/>`
            : `<div class="w-full h-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-5xl">📰</div>`;

        leadCol.innerHTML = `
            ${imageHTML}
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <span class="bg-primary-container text-white px-3 py-1 font-label-md text-caption mb-3 inline-block glow-accent rounded-sm">
                    ${lead.isFeatured ? '⭐ FEATURED' : buildCategoryBadgeText(lead.category)}
                </span>
                <h2 class="text-headline-md md:text-headline-lg font-headline-lg text-white mb-3 leading-tight font-bold line-clamp-3">${sanitize(lead.title)}</h2>
                <div class="flex items-center gap-4 text-white/80 font-label-md text-caption">
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> ${formatDate(lead.publishedAt)}</span>
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">visibility</span> ${(lead.viewCount || 0).toLocaleString()} Views</span>
                </div>
            </div>
        `;
        container.appendChild(leadCol);

        const sideCol = el('div', 'md:col-span-4 space-y-4 flex flex-col justify-between');
        
        if (sideStories.length === 0) {
            sideCol.innerHTML = `
                <div class="p-4 border-l-4 border-primary-container bg-surface-container-low rounded-r-lg">
                    <h3 class="text-body-lg font-bold text-on-surface-variant">अधिक स्थानीय समाचार आ रहे हैं</h3>
                    <p class="text-on-surface-variant text-caption line-clamp-2">तहसील और ग्रामीण संवाददाताओं से समाचार संकलन किया जा रहा है...</p>
                </div>
            `;
        } else {
            const borders = ['border-primary-container', 'border-secondary', 'border-outline'];
            sideStories.forEach((story, idx) => {
                const borderCls = borders[idx % borders.length];
                const card = el('div', `p-4 border-l-4 ${borderCls} bg-surface-container-low hover:bg-surface-container rounded-r-lg transition-all cursor-pointer flex-1 flex flex-col justify-center`);
                card.onclick = () => openArticle(story.id);
                card.innerHTML = `
                    <div class="text-[10px] font-label-md text-primary-container uppercase mb-1 font-bold">${buildCategoryBadgeText(story.category)}</div>
                    <h3 class="text-body-lg font-bold text-on-surface mb-1 line-clamp-2 leading-snug hover:text-primary transition-colors">${sanitize(story.title)}</h3>
                    <p class="text-on-surface-variant text-caption line-clamp-2">${sanitize(story.summary || '')}</p>
                `;
                sideCol.appendChild(card);
            });
        }
        
        container.appendChild(sideCol);
    }

    /* ── Bento Grid Coverage ── */
    function renderBentoGrid() {
        const container = $('bentoGrid');
        if (!container) return;
        container.innerHTML = '';

        if (isLoading) {
            container.innerHTML = buildBentoSkeleton();
            return;
        }

        if (activeCategory !== 'all') {
            container.parentElement.style.display = 'none';
            return;
        }

        const activeArticles = getFilteredArticles();
        if (activeArticles.length === 0) {
            container.parentElement.style.display = 'none';
            return;
        }
        container.parentElement.style.display = 'block';

        const usedIds = new Set();
        let lead = featuredArticle;
        if (!lead || !activeArticles.some(a => a.id === lead.id)) {
            lead = activeArticles[0];
        }
        if (lead) usedIds.add(lead.id);
        const sideStories = activeArticles.filter(a => a.id !== lead.id).slice(0, 3);
        sideStories.forEach(s => usedIds.add(s.id));

        const getBentoItem = (cat) => {
            let found = activeArticles.find(a => a.category === cat && !usedIds.has(a.id));
            if (found) { usedIds.add(found.id); return found; }
            found = activeArticles.find(a => a.category === cat);
            if (found) { usedIds.add(found.id); return found; }
            found = activeArticles.find(a => !usedIds.has(a.id));
            if (found) { usedIds.add(found.id); return found; }
            return null;
        };

        const c1 = getBentoItem('science_tech');
        const c2 = getBentoItem('school_news');
        const c3 = getBentoItem('achievements');
        const c4 = getBentoItem('world_brief');

        // Cell 1
        if (c1) {
            const card = el('div', 'md:col-span-2 md:row-span-2 relative rounded-lg overflow-hidden border border-outline-variant bg-surface-container shadow-sm cursor-pointer group/bento h-64 md:h-full');
            card.onclick = () => openArticle(c1.id);
            card.innerHTML = `
                <img alt="${sanitize(c1.title)}" class="w-full h-full object-cover transition-transform duration-700 group-hover/bento:scale-105" src="${c1.coverImageUrl || '/assets/news-placeholder.jpg'}" loading="lazy"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div class="absolute bottom-0 p-6">
                    <span class="text-primary-fixed-dim font-label-md uppercase tracking-widest mb-2 block text-xs font-bold">${buildCategoryBadgeText(c1.category)}</span>
                    <h3 class="text-headline-md font-headline-md text-white line-clamp-2 font-bold">${sanitize(c1.title)}</h3>
                </div>
            `;
            container.appendChild(card);
        } else {
            container.appendChild(buildBentoPlaceholder('विज्ञान एवं तकनीक', 'science'));
        }

        // Cell 2
        if (c2) {
            const card = el('div', 'md:col-span-2 md:row-span-1 bg-surface-container-high border border-outline-variant rounded-lg p-6 flex flex-col justify-center cursor-pointer hover:bg-surface-container transition-all h-40 md:h-full');
            card.onclick = () => openArticle(c2.id);
            card.innerHTML = `
                <span class="flex items-center gap-2 text-primary font-label-md uppercase mb-2 text-xs font-bold">
                    <span class="w-2 h-2 bg-primary rounded-full pulse-dot"></span> ${buildCategoryBadgeText(c2.category)}
                </span>
                <h3 class="text-body-lg font-bold mb-2 text-on-surface line-clamp-1 leading-snug hover:text-primary transition-colors">${sanitize(c2.title)}</h3>
                <p class="text-on-surface-variant text-caption line-clamp-2">${sanitize(c2.summary || '')}</p>
            `;
            container.appendChild(card);
        } else {
            container.appendChild(buildBentoPlaceholderHorizontal('स्कूल समाचार', 'school'));
        }

        // Cell 3
        if (c3) {
            const card = el('div', 'md:col-span-1 md:row-span-1 relative rounded-lg overflow-hidden border border-outline-variant group/bento3 cursor-pointer h-40 md:h-full');
            card.onclick = () => openArticle(c3.id);
            card.innerHTML = `
                <img alt="${sanitize(c3.title)}" class="w-full h-full object-cover transition-transform duration-700 group-hover/bento3:scale-105" src="${c3.coverImageUrl || '/assets/news-placeholder.jpg'}" loading="lazy"/>
                <div class="absolute inset-0 bg-black/55"></div>
                <div class="absolute bottom-0 p-4">
                    <span class="text-white/80 font-label-md text-[10px] uppercase mb-1 block font-bold">${buildCategoryBadgeText(c3.category)}</span>
                    <h4 class="text-body-md font-bold text-white line-clamp-2 leading-tight">${sanitize(c3.title)}</h4>
                </div>
            `;
            container.appendChild(card);
        } else {
            container.appendChild(buildBentoPlaceholderSquare('उपलब्धियां', 'workspace_premium'));
        }

        // Cell 4
        if (c4) {
            const card = el('div', 'md:col-span-1 md:row-span-1 bg-tertiary-container border border-outline-variant rounded-lg p-4 flex flex-col justify-between cursor-pointer hover:opacity-95 transition-all text-white h-40 md:h-full');
            card.onclick = () => openArticle(c4.id);
            card.innerHTML = `
                <span class="material-symbols-outlined text-3xl">public</span>
                <div>
                    <span class="text-white/80 font-label-md text-[10px] uppercase mb-1 block font-bold">${buildCategoryBadgeText(c4.category)}</span>
                    <h4 class="text-body-md font-bold leading-snug line-clamp-3">${sanitize(c4.title)}</h4>
                </div>
            `;
            container.appendChild(card);
        } else {
            container.appendChild(buildBentoPlaceholderSquareColor('विश्व समाचार', 'public'));
        }
    }

    /* ── Reader Pulse Sidebar ── */
    function renderPulseMonitor() {
        const list = $('trendingPulseList');
        const summary = $('pulseSummaryText');
        if (!list) return;

        if (isLoading) {
            list.innerHTML = `
                <div class="h-10 bg-surface-container animate-pulse rounded"></div>
                <div class="h-10 bg-surface-container animate-pulse rounded mt-3"></div>
            `;
            return;
        }

        const activeArticles = getFilteredArticles();
        const trending = [...activeArticles]
            .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
            .slice(0, 3);

        if (trending.length === 0) {
            list.innerHTML = '<p class="text-on-surface-variant text-caption text-center py-4">कोई पल्स डेटा नहीं</p>';
            if (summary) summary.textContent = 'अभी 0 लोग पढ़ रहे हैं';
            return;
        }

        list.innerHTML = '';
        const maxViews = trending[0].viewCount || 1;
        let totalViewsSum = 0;

        trending.forEach((story, idx) => {
            totalViewsSum += (story.viewCount || 0);
            const pct = Math.max(12, Math.round(((story.viewCount || 0) / maxViews) * 100));
            const item = el('div', 'flex items-center gap-4 cursor-pointer group/pulse');
            item.onclick = () => openArticle(story.id);
            item.innerHTML = `
                <span class="text-caption font-label-md w-6 text-primary-container font-bold text-base">#${idx + 1}</span>
                <div class="flex-1 min-w-0">
                    <p class="text-body-md font-bold text-on-surface leading-tight line-clamp-1 group-hover/pulse:text-primary transition-colors">${sanitize(story.title)}</p>
                    <div class="h-1 w-full bg-surface-variant mt-2 overflow-hidden rounded-full">
                        <div class="h-full bg-primary rounded-full transition-all duration-500" style="width: ${pct}%"></div>
                    </div>
                </div>
            `;
            list.appendChild(item);
        });

        if (summary) {
            const totalFmt = totalViewsSum >= 1000 
                ? (totalViewsSum / 1000).toFixed(1) + 'K' 
                : totalViewsSum.toString();
            summary.textContent = `अभी लगभग ${totalFmt} लोग पढ़ रहे हैं`;
        }
    }

    /* ── Social Proof (Most Liked) ── */
    function renderSocialProof() {
        const container = $('socialProofContainer');
        if (!container) return;
        container.innerHTML = '';

        if (isLoading) return;
        
        const activeArticles = getFilteredArticles();
        if (activeArticles.length === 0) return;

        let topStory = null;
        let maxReactions = -1;

        activeArticles.forEach(a => {
            const counts = a.reactionCounts || {};
            const total = Object.values(counts).reduce((s, v) => s + (v || 0), 0);
            if (total > maxReactions) {
                maxReactions = total;
                topStory = a;
            }
        });

        if (!topStory || maxReactions === 0) {
            topStory = activeArticles[0]; // Fallback
        }

        const card = el('div', 'bg-surface-container-low p-4 rounded-lg border border-outline-variant shadow-sm cursor-pointer hover:bg-surface-container transition-all');
        card.onclick = () => openArticle(topStory.id);
        
        const coverImg = topStory.coverImageUrl 
            ? `<img alt="${sanitize(topStory.title)}" class="w-full h-full object-cover" src="${sanitize(topStory.coverImageUrl)}" loading="lazy"/>`
            : `<div class="w-full h-full bg-surface-variant flex items-center justify-center text-xl">📰</div>`;

        card.innerHTML = `
            <div class="flex items-center gap-3 mb-3">
                <span class="material-symbols-outlined text-primary font-bold">favorite</span>
                <span class="text-caption font-label-md text-primary uppercase font-bold">सबसे अधिक पसंद किया गया</span>
            </div>
            <div class="flex gap-4 items-center">
                <div class="w-16 h-16 bg-surface-variant rounded-sm shrink-0 overflow-hidden">
                    ${coverImg}
                </div>
                <p class="text-body-md font-bold leading-snug text-on-surface line-clamp-2 hover:text-primary transition-colors">${sanitize(topStory.title)}</p>
            </div>
        `;

        container.appendChild(card);
    }

    /* ── Latest News Grid Feed ── */
    function renderLatestGrid() {
        const container = $('newsGrid');
        if (!container) return;
        container.innerHTML = '';

        if (isLoading) {
            for (let i = 0; i < 4; i++) {
                container.innerHTML += buildCardSkeleton();
            }
            return;
        }

        const activeArticles = getFilteredArticles();
        let filtered = activeArticles;

        // Apply search query
        const searchInput = $('newsSearchInput');
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        if (query) {
            filtered = filtered.filter(a => 
                a.title?.toLowerCase().includes(query) || 
                a.summary?.toLowerCase().includes(query) ||
                a.body?.toLowerCase().includes(query)
            );
        }

        // Filter out main featured story
        let lead = featuredArticle;
        if (!lead || !activeArticles.some(a => a.id === lead.id)) {
            lead = activeArticles[0];
        }

        let displayList = filtered;
        if (!query && lead) {
            displayList = filtered.filter(a => a.id !== lead.id);
        }

        if (displayList.length === 0) {
            container.innerHTML = buildEmptyState();
            return;
        }

        displayList.forEach(a => {
            container.appendChild(buildLatestCard(a));
        });
    }

    function buildLatestCard(a) {
        const card = el('article', 'bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden hover:bg-surface-container transition-all cursor-pointer flex flex-col md:flex-row h-auto md:h-48 group/latest shadow-sm');
        card.onclick = () => openArticle(a.id);

        const coverImg = a.coverImageUrl
            ? `<img class="w-full h-full object-cover transition-transform duration-500 group-hover/latest:scale-105" src="${sanitize(a.coverImageUrl)}" alt="${sanitize(a.title)}" loading="lazy">`
            : `<div class="w-full h-full bg-gradient-to-tr from-primary-fixed to-secondary-fixed flex items-center justify-center text-4xl">📰</div>`;

        // Render location indicator tag on card if present
        let locationTag = '';
        if (a.location && a.location.city) {
            const locText = `${a.location.city}${a.location.tehsil && a.location.tehsil !== 'all' ? ' ➔ ' + a.location.tehsil : ''}`;
            locationTag = `<span class="bg-secondary/15 text-secondary px-2 py-0.5 rounded text-[10px] font-label-md font-bold uppercase truncate max-w-[150px]"><span class="material-symbols-outlined text-[11px] align-middle">location_on</span> ${locText}</span>`;
        }

        card.innerHTML = `
            <div class="w-full md:w-44 h-48 md:h-full shrink-0 overflow-hidden relative">
                ${coverImg}
                ${a.isPinned ? `<span class="absolute top-2 left-2 bg-secondary text-white px-2 py-0.5 text-[10px] font-label-md rounded shadow-sm">📌 Pinned</span>` : ''}
            </div>
            <div class="p-5 flex flex-col justify-between flex-1 min-w-0">
                <div>
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                        ${buildCategoryBadge(a.category)}
                        ${locationTag}
                        ${a.biasLabel ? `<span class="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-label-md font-bold uppercase">${BIAS_LABELS[a.biasLabel] || a.biasLabel}</span>` : ''}
                    </div>
                    <h3 class="text-body-lg font-bold text-on-surface mb-2 line-clamp-2 leading-tight group-hover/latest:text-primary transition-colors">${sanitize(a.title)}</h3>
                    <p class="text-on-surface-variant text-caption line-clamp-2">${sanitize(a.summary || '')}</p>
                </div>
                <div class="flex justify-between items-center mt-3 text-caption font-label-md text-on-surface-variant border-t border-outline-variant/30 pt-2">
                    <span class="flex items-center gap-1 font-bold text-[11px]">
                        By ${sanitize(a.isAnonymous ? 'Anonymous' : (a.authorName || 'Reporter'))}
                    </span>
                    <span class="flex items-center gap-1 text-[11px]">
                        <span class="material-symbols-outlined text-[13px]">schedule</span> ${formatDate(a.publishedAt)}
                    </span>
                </div>
            </div>
        `;
        return card;
    }

    /* ── Open Article Modal ── */
    function openArticle(id) {
        const a = articles.find(x => x.id === id);
        if (!a) return;

        openArticleId = id;
        const overlay = $('newsArticleOverlay');
        const content = $('newsArticleContent');

        // Increment view count
        incrementView(id);

        content.innerHTML = '';

        let coverHTML = '';
        if (a.coverImageUrl) {
            coverHTML = `<img class="w-full h-[260px] md:h-[420px] object-contain rounded-xl shadow-md mb-6 bg-black/15" src="${sanitize(a.coverImageUrl)}" alt="${sanitize(a.title)}">`;
        }

        let locFmt = '';
        if (a.location && a.location.city) {
            locFmt = `<span class="bg-secondary/15 text-secondary px-3 py-1 rounded-full text-xs font-label-md font-bold flex items-center gap-1"><span class="material-symbols-outlined text-sm">location_on</span> ${a.location.city}${a.location.tehsil && a.location.tehsil !== 'all' ? ' ➔ ' + a.location.tehsil : ''}${a.location.village && a.location.village !== 'all' ? ' ➔ ' + a.location.village : ''}</span>`;
        }

        const headerHTML = `
            <div class="space-y-4">
                <div class="flex flex-wrap gap-2 items-center">
                    ${buildCategoryBadge(a.category)}
                    ${locFmt}
                    ${a.biasLabel ? `<span class="bg-surface-variant text-on-surface-variant px-2.5 py-0.5 rounded-full text-xs font-label-md font-bold uppercase">${BIAS_LABELS[a.biasLabel] || a.biasLabel}</span>` : ''}
                </div>
                <h1 class="text-2xl md:text-4xl font-display-lg font-bold text-on-surface leading-tight">${sanitize(a.title)}</h1>
                
                <div class="flex items-center gap-4 py-4 border-y border-outline-variant/40 my-6">
                    ${buildAvatarHTML(a.isAnonymous ? null : a.authorPhotoUrl, a.isAnonymous ? 'Anonymous' : a.authorName, 44, true)}
                    <div class="flex-1 min-w-0">
                        <div class="text-body-lg font-bold text-on-surface">${sanitize(a.isAnonymous ? 'Anonymous' : (a.authorName || 'Reporter'))}</div>
                        <div class="text-caption font-label-md text-on-surface-variant flex items-center gap-3 mt-0.5">
                            <span>${formatDate(a.publishedAt)}</span>
                            <span>•</span>
                            <span>${a.readTimeMinutes || 2} मिनट पठन</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        let correctionHTML = '';
        if (a.hasCorrections && a.correctionNote) {
            correctionHTML = `
                <div class="p-4 bg-error-container/10 border-l-4 border-error text-on-error-container rounded-r-lg flex items-start gap-3 my-6">
                    <span class="material-symbols-outlined text-error">warning</span>
                    <div class="text-body-md font-bold">सुधार: ${sanitize(a.correctionNote)}</div>
                </div>
            `;
        }

        const statsHTML = `
            <div class="flex gap-4 text-caption font-label-md text-on-surface-variant bg-surface-container-low p-3 rounded-lg my-6">
                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">visibility</span> ${(a.viewCount || 0).toLocaleString()} views</span>
                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">bookmark</span> ${(a.bookmarkCount || 0)} bookmarks</span>
            </div>
        `;

        const bodyHTML = `
            <div class="news-article-body mt-8">
                ${a.body || '<p>No content available.</p>'}
            </div>
        `;

        const reactionsHTML = `
            <div class="border-t border-outline-variant/40 pt-8 mt-12">
                <h3 class="text-caption font-label-md text-on-surface-variant uppercase tracking-widest mb-4 font-bold">आपकी प्रतिक्रिया</h3>
                <div class="flex flex-wrap gap-3" id="modalReactionsBar"></div>
            </div>
        `;

        content.innerHTML = `
            ${coverHTML}
            ${headerHTML}
            ${correctionHTML}
            ${statsHTML}
            ${bodyHTML}
            ${reactionsHTML}
        `;

        renderReactions(a);
        loadUserReaction(id);

        const shareBtn = $('modalShareBtn');
        const bookmarkBtn = $('modalBookmarkBtn');

        if (shareBtn) {
            shareBtn.onclick = () => shareArticle(id);
        }
        if (bookmarkBtn) {
            const isBookmarked = bookmarks[id];
            bookmarkBtn.className = `flex items-center gap-1 font-label-md text-caption ${isBookmarked ? 'text-primary font-bold' : 'text-on-surface'}`;
            bookmarkBtn.querySelector('.material-symbols-outlined').style.fontVariationSettings = isBookmarked ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400";
            bookmarkBtn.onclick = () => {
                toggleBookmark(id);
                const isNowBookmarked = bookmarks[id];
                bookmarkBtn.className = `flex items-center gap-1 font-label-md text-caption ${isNowBookmarked ? 'text-primary font-bold' : 'text-on-surface'}`;
                bookmarkBtn.querySelector('.material-symbols-outlined').style.fontVariationSettings = isNowBookmarked ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400";
                updateBookmarksCountBadge();
            };
        }

        overlay.classList.add('open');
        document.body.classList.add('overflow-hidden');

        const sheet = overlay.querySelector('.news-article-sheet');
        if (sheet) sheet.scrollTop = 0;
    }

    function closeArticle() {
        const overlay = $('newsArticleOverlay');
        if (overlay) overlay.classList.remove('open');
        document.body.classList.remove('overflow-hidden');
        openArticleId = null;
    }

    /* ── Reactions handlers ── */
    function renderReactions(a) {
        const bar = $('modalReactionsBar');
        if (!bar) return;

        bar.innerHTML = '';
        const counts = a.reactionCounts || {};

        REACTIONS.forEach(emoji => {
            const count = counts[emoji] || 0;
            const isActive = userReactions[a.id] === emoji;
            const btn = el('button', `px-4 py-2 border rounded-full transition-all text-body-md flex items-center gap-2 select-none ${
                isActive 
                    ? 'border-primary bg-primary-container/20 text-primary font-bold scale-95' 
                    : 'border-outline-variant hover:bg-surface-variant text-on-surface'
            }`);
            btn.innerHTML = `<span>${emoji}</span><span>${count > 0 ? count : ''}</span>`;
            btn.onclick = (e) => {
                e.stopPropagation();
                handleReaction(a.id, emoji);
            };
            bar.appendChild(btn);
        });

        if (!currentUser) {
            const prompt = el('div', 'text-caption font-label-md text-on-surface-variant w-full mt-2');
            prompt.innerHTML = `<a href="/" class="text-primary hover:underline font-bold">साइन इन करें</a> प्रतिक्रिया देने के लिए`;
            bar.appendChild(prompt);
        }
    }

    function loadUserReaction(articleId) {
        if (!currentUser) return;

        db.collection('newsArticles').doc(articleId)
            .collection('reactions').doc(currentUser.uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    userReactions[articleId] = doc.data().type;
                } else {
                    delete userReactions[articleId];
                }
                if (openArticleId === articleId) {
                    const a = articles.find(x => x.id === articleId);
                    if (a) renderReactions(a);
                }
            })
            .catch(err => console.error('Error loading reaction:', err));
    }

    function handleReaction(articleId, emoji) {
        if (!currentUser) {
            showToast('प्रतिक्रिया देने के लिए साइन इन करें! 📝');
            return;
        }

        const reactionRef = db.collection('newsArticles').doc(articleId)
            .collection('reactions').doc(currentUser.uid);
        const articleRef = db.collection('newsArticles').doc(articleId);

        const previousReaction = userReactions[articleId];

        if (previousReaction === emoji) {
            const batch = db.batch();
            batch.delete(reactionRef);

            const decrementUpdate = {};
            decrementUpdate[`reactionCounts.${emoji}`] = firebase.firestore.FieldValue.increment(-1);
            batch.update(articleRef, decrementUpdate);

            batch.commit().then(() => {
                delete userReactions[articleId];
                const a = articles.find(x => x.id === articleId);
                if (a && a.reactionCounts) {
                    a.reactionCounts[emoji] = Math.max(0, (a.reactionCounts[emoji] || 0) - 1);
                }
                renderReactions(a);
            }).catch(err => console.error('Error removing reaction:', err));
        } else {
            const batch = db.batch();
            batch.set(reactionRef, {
                type: emoji,
                reactedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            const update = {};
            update[`reactionCounts.${emoji}`] = firebase.firestore.FieldValue.increment(1);
            if (previousReaction) {
                update[`reactionCounts.${previousReaction}`] = firebase.firestore.FieldValue.increment(-1);
            }
            batch.update(articleRef, update);

            batch.commit().then(() => {
                const a = articles.find(x => x.id === articleId);
                if (a) {
                    if (!a.reactionCounts) a.reactionCounts = {};
                    a.reactionCounts[emoji] = (a.reactionCounts[emoji] || 0) + 1;
                    if (previousReaction) {
                        a.reactionCounts[previousReaction] = Math.max(0, (a.reactionCounts[previousReaction] || 0) - 1);
                    }
                }
                userReactions[articleId] = emoji;
                renderReactions(a);
            }).catch(err => console.error('Error setting reaction:', err));
        }
    }

    /* ── View Counter ── */
    function incrementView(articleId) {
        db.collection('newsArticles').doc(articleId).update({
            viewCount: firebase.firestore.FieldValue.increment(1)
        }).catch(() => {});
    }

    /* ── Bookmarks ── */
    function toggleBookmark(articleId) {
        if (!currentUser) {
            showToast('बुकमार्क करने के लिए साइन इन करें! 🔖');
            return;
        }

        if (bookmarks[articleId]) {
            delete bookmarks[articleId];
            showToast('बुकमार्क हटा दिया गया 🗑️');
        } else {
            bookmarks[articleId] = true;
            showToast('बुकमार्क कर लिया गया! 🔖');
        }

        localStorage.setItem('bpt_bookmarks', JSON.stringify(bookmarks));
    }

    /* ── Share ── */
    function shareArticle(articleId) {
        const a = articles.find(x => x.id === articleId);
        if (!a) return;

        const url = `${window.location.origin}/news/?article=${a.slug || articleId}`;
        const shareData = {
            title: a.title,
            text: a.summary || a.title,
            url: url,
        };

        if (navigator.share) {
            navigator.share(shareData).catch(() => {});
        } else {
            navigator.clipboard.writeText(url).then(() => {
                showToast('लिंक क्लिपबोर्ड पर कॉपी हो गया! 🔗');
            }).catch(() => {
                showToast('लिंक कॉपी करने में असमर्थ');
            });
        }
    }

    /* ── Helper Badges ── */
    function buildCategoryBadge(category) {
        const cat = CATEGORIES[category];
        if (!cat) return '';
        const badgeLabel = cat.emoji ? `${cat.emoji} ${cat.label}` : cat.label;
        return `<span class="bg-primary-container/20 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-label-md font-bold uppercase shrink-0">${badgeLabel}</span>`;
    }

    function buildCategoryBadgeText(category) {
        const cat = CATEGORIES[category];
        if (!cat) return 'समाचार';
        return cat.emoji ? `${cat.emoji} ${cat.label}` : cat.label;
    }

    function buildAvatarHTML(photoUrl, name, size, isLarge) {
        const cls = isLarge ? 'w-11 h-11 rounded-full object-cover shrink-0' : 'w-5 h-5 rounded-full object-cover shrink-0';
        const placeholderCls = isLarge 
            ? 'w-11 h-11 rounded-full bg-primary-container/30 text-primary font-bold flex items-center justify-center shrink-0 border border-primary/20' 
            : 'w-5 h-5 rounded-full bg-primary-container/30 text-primary font-bold flex items-center justify-center shrink-0 text-[10px]';

        if (photoUrl) {
            return `<img class="${cls}" src="${sanitize(photoUrl)}" alt="${sanitize(name || '')}" style="width:${size}px;height:${size}px;">`;
        }

        const initial = (name || '?').charAt(0).toUpperCase();
        return `<div class="${placeholderCls}" style="width:${size}px;height:${size}px;">${initial}</div>`;
    }

    function formatDate(timestamp) {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMin = Math.floor(diffMs / 60000);
        const diffHr = Math.floor(diffMs / 3600000);
        const diffDay = Math.floor(diffMs / 86400000);

        if (diffMin < 1) return 'अभी-अभी';
        if (diffMin < 60) return `${diffMin} मिनट पहले`;
        if (diffHr < 24) return `${diffHr} घंटे पहले`;
        if (diffDay < 7) return `${diffDay} दिन पहले`;

        return date.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
    }

    /* ── Sanitize ── */
    function sanitize(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function showToast(msg) {
        let toast = $('newsToast');
        if (!toast) {
            toast = el('div', 'news-toast');
            toast.id = 'newsToast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
    }

    /* ── Skeletons ── */
    function buildHeroSkeleton() {
        return `
            <div class="md:col-span-8 h-[320px] md:h-[500px] bg-surface-container animate-pulse rounded-lg flex flex-col justify-end p-8 border border-outline-variant/30">
                <div class="h-5 w-24 bg-surface-container-highest rounded mb-4"></div>
                <div class="h-8 w-3/4 bg-surface-container-highest rounded mb-3"></div>
                <div class="h-4 w-1/2 bg-surface-container-highest rounded"></div>
            </div>
            <div class="md:col-span-4 space-y-4 flex flex-col justify-between">
                <div class="h-32 bg-surface-container animate-pulse rounded-lg p-4 border border-outline-variant/30 flex flex-col justify-center gap-3">
                    <div class="h-5 w-20 bg-surface-container-highest rounded"></div>
                    <div class="h-6 w-3/4 bg-surface-container-highest rounded"></div>
                </div>
                <div class="h-32 bg-surface-container animate-pulse rounded-lg p-4 border border-outline-variant/30 flex flex-col justify-center gap-3">
                    <div class="h-5 w-20 bg-surface-container-highest rounded"></div>
                    <div class="h-6 w-3/4 bg-surface-container-highest rounded"></div>
                </div>
                <div class="h-32 bg-surface-container animate-pulse rounded-lg p-4 border border-outline-variant/30 flex flex-col justify-center gap-3">
                    <div class="h-5 w-20 bg-surface-container-highest rounded"></div>
                    <div class="h-6 w-3/4 bg-surface-container-highest rounded"></div>
                </div>
            </div>
        `;
    }

    function buildBentoSkeleton() {
        return `
            <div class="md:col-span-2 md:row-span-2 bg-surface-container animate-pulse rounded-lg h-60 md:h-full border border-outline-variant/30"></div>
            <div class="md:col-span-2 md:row-span-1 bg-surface-container animate-pulse rounded-lg h-32 border border-outline-variant/30"></div>
            <div class="md:col-span-1 md:row-span-1 bg-surface-container animate-pulse rounded-lg h-32 border border-outline-variant/30"></div>
            <div class="md:col-span-1 md:row-span-1 bg-surface-container animate-pulse rounded-lg h-32 border border-outline-variant/30"></div>
        `;
    }

    function buildCardSkeleton() {
        return `
            <div class="bg-surface-container animate-pulse rounded-lg h-48 flex flex-col md:flex-row overflow-hidden border border-outline-variant/30">
                <div class="w-full md:w-44 h-full bg-surface-container-highest shrink-0"></div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div class="space-y-3">
                        <div class="h-4 w-20 bg-surface-container-highest rounded"></div>
                        <div class="h-6 w-3/4 bg-surface-container-highest rounded"></div>
                        <div class="h-4 w-1/2 bg-surface-container-highest rounded"></div>
                    </div>
                    <div class="h-4 w-1/3 bg-surface-container-highest rounded"></div>
                </div>
            </div>
        `;
    }

    function showLoadingSkeletons() {
        const hero = $('heroLeadSection');
        if (hero) hero.innerHTML = buildHeroSkeleton();

        const bento = $('bentoGrid');
        if (bento) bento.innerHTML = buildBentoSkeleton();

        const feed = $('newsGrid');
        if (feed) {
            feed.innerHTML = '';
            for (let i = 0; i < 4; i++) {
                feed.innerHTML += buildCardSkeleton();
            }
        }
    }

    function buildEmptyState() {
        return `
            <div class="text-center py-12 bg-surface-container-low border border-outline-variant/40 rounded-lg col-span-1 md:col-span-2 w-full">
                <span class="material-symbols-outlined text-5xl text-on-surface-variant mb-2">newspaper</span>
                <h3 class="text-body-lg font-bold text-on-surface">कोई स्थानीय समाचार नहीं मिला</h3>
                <p class="text-on-surface-variant text-caption mt-1">इस चयनित स्थान या अनुभाग में अभी कोई समाचार उपलब्ध नहीं है।</p>
            </div>
        `;
    }

    function buildBentoPlaceholder(title, iconName) {
        const div = el('div', 'md:col-span-2 md:row-span-2 relative rounded-lg overflow-hidden border border-outline-variant bg-surface-container flex flex-col justify-end p-6 h-64 md:h-full');
        div.innerHTML = `
            <div class="mb-4"><span class="material-symbols-outlined text-5xl text-primary">${iconName}</span></div>
            <span class="text-primary-container font-label-md uppercase tracking-widest mb-2 block font-bold">${title}</span>
            <h3 class="text-headline-md font-headline-md text-on-surface line-clamp-2">समाचार जल्द आ रहे हैं</h3>
        `;
        return div;
    }

    function buildBentoPlaceholderHorizontal(title, iconName) {
        const div = el('div', 'md:col-span-2 md:row-span-1 bg-surface-container-high border border-outline-variant rounded-lg p-6 flex flex-col justify-center h-40 md:h-full');
        div.innerHTML = `
            <div class="flex items-center gap-2 text-primary font-label-md uppercase mb-2 text-xs font-bold">
                <span class="material-symbols-outlined text-sm">${iconName}</span> ${title}
            </div>
            <h3 class="text-body-lg font-bold text-on-surface">कवरेज की तैयारी जारी है</h3>
            <p class="text-on-surface-variant text-caption line-clamp-1">इस क्षेत्र में संवाददाताओं से समाचारों की प्रतीक्षा करें।</p>
        `;
        return div;
    }

    function buildBentoPlaceholderSquare(title, iconName) {
        const div = el('div', 'md:col-span-1 md:row-span-1 relative rounded-lg overflow-hidden border border-outline-variant bg-surface-container flex flex-col justify-end p-4 h-40 md:h-full');
        div.innerHTML = `
            <div class="mb-2"><span class="material-symbols-outlined text-3xl text-on-surface-variant">${iconName}</span></div>
            <span class="text-on-surface-variant font-label-md text-[10px] uppercase mb-1 block font-bold">${title}</span>
            <h4 class="text-body-md font-bold text-on-surface">अपडेट जल्द ही</h4>
        `;
        return div;
    }

    function buildBentoPlaceholderSquareColor(title, iconName) {
        const div = el('div', 'md:col-span-1 md:row-span-1 bg-tertiary-container border border-outline-variant rounded-lg p-4 flex flex-col justify-between text-white h-40 md:h-full');
        div.innerHTML = `
            <span class="material-symbols-outlined text-3xl">${iconName}</span>
            <div>
                <span class="text-white/80 font-label-md text-[10px] uppercase mb-1 block font-bold">${title}</span>
                <h4 class="text-body-md font-bold leading-snug">वैश्विक ख़बरों का संक्षेप</h4>
            </div>
        `;
        return div;
    }

    /* ── Date, Time & Mock Stock Ticker ── */
    function startHeaderClock() {
        const dateTimeEl = $('headerDateTime');
        if (!dateTimeEl) return;

        const formatHindiTime = () => {
            const now = new Date();
            const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
            let dateStr = now.toLocaleDateString('hi-IN', optionsDate);

            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const timeStr = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm} IST`;

            dateTimeEl.innerHTML = `
                <span>${dateStr}</span>
                <span class="text-white/60">${timeStr}</span>
            `;
        };

        formatHindiTime();
        setInterval(formatHindiTime, 1000);
    }

    function startLiveTicker() {
        const tickerEl = $('headerLiveTicker');
        if (!tickerEl) return;

        const items = [
            'चांदी ₹249.26/g',
            'सोना ₹72,450/10g',
            'निफ्टी 23,516 (-0.12%)',
            'अयोध्या 32°C ☀️',
            'सेंसेक्स 77,300 (+0.42%)',
            'रुपया/डॉलर ₹83.45 ⇄'
        ];
        let index = 0;

        const cycle = () => {
            tickerEl.innerHTML = `<span class="transition-opacity duration-300 opacity-0" id="tickerContent">${items[index]}</span>`;
            const content = $('tickerContent');
            setTimeout(() => {
                if (content) content.classList.remove('opacity-0');
            }, 50);

            index = (index + 1) % items.length;
        };

        cycle();
        setInterval(cycle, 4000);
    }

    function toggleSearch(force) {
        const container = $('searchExpandContainer');
        const input = $('newsSearchInput');
        if (!container) return;

        const isOpen = force !== undefined ? force : !container.classList.contains('open');
        if (isOpen) {
            container.classList.add('open');
            if (input) {
                setTimeout(() => input.focus(), 150);
            }
        } else {
            container.classList.remove('open');
            if (input) input.value = '';
            renderLatestGrid();
        }
    }

    function toggleAppLauncher(force) {
        const dropdown = $('headerAppLauncherDropdown');
        if (!dropdown) return;
        const isOpen = force !== undefined ? force : !dropdown.classList.contains('open');
        if (isOpen) {
            dropdown.classList.add('open');
        } else {
            dropdown.classList.remove('open');
        }
    }

    /* ── Scroll & Modal listeners ── */
    function setupScrollEffects() {
        const header = $('ndtvHeader');
        const scrollTopBtn = $('newsScrollTop');

        window.addEventListener('scroll', () => {
            if (header) {
                if (window.scrollY > 20) {
                    header.classList.add('scrolled-header');
                } else {
                    header.classList.remove('scrolled-header');
                }
            }

            if (scrollTopBtn) {
                if (window.scrollY > 400) {
                    scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                    scrollTopBtn.classList.add('opacity-100', 'pointer-events-auto');
                } else {
                    scrollTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
                    scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
                }
            }
        }, { passive: true });

        // Outside clicks hook for closing hamburger dropdown and app launcher
        document.addEventListener('click', (e) => {
            const dropdown = $('newsHamburgerDropdown');
            const menuBtn = document.querySelector('.left-controls-pill');
            if (dropdown && !dropdown.classList.contains('hidden')) {
                if (menuBtn && !menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
                    toggleMenu(false);
                }
            }

            const appLauncher = $('headerAppLauncherDropdown');
            const appLauncherBtn = $('headerAppLauncherBtn');
            if (appLauncher && appLauncher.classList.contains('open')) {
                if (appLauncherBtn && !appLauncherBtn.contains(e.target) && !appLauncher.contains(e.target)) {
                    toggleAppLauncher(false);
                }
            }
        });

        // Close full article overlay on backdrop click
        const overlay = $('newsArticleOverlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeArticle();
            });
        }

        // Close location overlay on backdrop click
        const locOverlay = $('locationSelectorOverlay');
        if (locOverlay) {
            locOverlay.addEventListener('click', (e) => {
                if (e.target === locOverlay) toggleLocationModal(false);
            });
        }

        // ESC key closes modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (openArticleId) closeArticle();
                const locOverlay = $('locationSelectorOverlay');
                if (locOverlay && locOverlay.classList.contains('open')) toggleLocationModal(false);
                const interestsOverlay = $('personalInterestsOverlay');
                if (interestsOverlay && interestsOverlay.classList.contains('open')) toggleInterestsModal(false);
            }
        });

        // Close interests modal on backdrop click
        const interestsOverlay = $('personalInterestsOverlay');
        if (interestsOverlay) {
            interestsOverlay.addEventListener('click', (e) => {
                if (e.target === interestsOverlay) toggleInterestsModal(false);
            });
        }
    }

    /* ── Personal Feed ("My Feed") Core Logic ── */

    let tempSelectedInterests = [];

    function togglePersonalFeed(forceState) {
        const active = forceState !== undefined ? forceState : !isFeedActive;
        isFeedActive = active;

        const feedBtn = $('personalFeedNavBtn');
        if (feedBtn) {
            feedBtn.classList.toggle('active', active);
        }
        const dropdownFeedBtn = $('dropdownPersonalFeedBtn');
        if (dropdownFeedBtn) {
            dropdownFeedBtn.classList.toggle('active', active);
        }

        // Grab all sections by their explicit IDs
        const heroSection      = $('heroLeadSection');
        const bentoSection     = $('bentoSection');
        const newsGridSection  = $('newsGridSection');
        const personalFeedView = $('personalFeedView');

        if (active) {
            // Hide standard content sections
            [heroSection, bentoSection, newsGridSection].forEach(s => {
                if (s) s.style.display = 'none';
            });

            // Show personal feed view
            if (personalFeedView) personalFeedView.style.display = 'block';

            // Remove active state from all nav items except My Feed button
            document.querySelectorAll('.header-nav-item[data-category], .header-dropdown-item[data-category]').forEach(el => {
                el.classList.remove('active');
            });
            const moreBtn = $('moreCategoriesNavBtn');
            if (moreBtn) moreBtn.classList.remove('active');

            // Deactivate bookmarks filter if on
            if (isBookmarksFilterActive) {
                isBookmarksFilterActive = false;
            }

            // First time: show interests picker. Returning user: render feed
            console.log('[MyFeed] togglePersonalFeed ACTIVE. userInterests:', JSON.stringify(userInterests), '| articles.length:', articles.length, '| isLoading:', isLoading);
            if (!userInterests || userInterests.length === 0) {
                console.log('[MyFeed] No interests set → opening modal');
                openInterestsModal();
            } else {
                console.log('[MyFeed] Has interests → calling renderPersonalFeed(true)');
                renderPersonalFeed(true);
            }
        } else {
            // Restore all standard sections
            if (personalFeedView) personalFeedView.style.display = 'none';
            [heroSection, bentoSection, newsGridSection].forEach(s => {
                if (s) s.style.display = '';
            });

            // Go back to All category
            setCategory('all');
        }
    }

    function openInterestsModal() {
        toggleInterestsModal(true);
    }

    function toggleInterestsModal(forceState) {
        const overlay = $('personalInterestsOverlay');
        if (!overlay) return;

        const open = forceState !== undefined ? Boolean(forceState) : !overlay.classList.contains('open');

        if (open) {
            renderInterestsSelectionGrid();
            overlay.classList.add('open');
            document.body.classList.add('overflow-hidden');
        } else {
            overlay.classList.remove('open');
            document.body.classList.remove('overflow-hidden');
            
            // UX Safety Guard: If user has no saved interests and closes modal, revert feed active state
            if (isFeedActive && (!userInterests || userInterests.length === 0)) {
                togglePersonalFeed(false);
            }
        }
    }

    function renderInterestsSelectionGrid() {
        const grid = $('interestsSelectionGrid');
        if (!grid) return;
        grid.innerHTML = '';

        tempSelectedInterests = [...userInterests];

        Object.entries(CATEGORIES).forEach(([key, cat]) => {
            if (key === 'all') return; // Skip "all"

            const isSelected = tempSelectedInterests.includes(key);
            const card = el('div', `interest-card ${isSelected ? 'selected' : ''}`);
            card.dataset.id = key;

            const iconSpan = el('span', 'material-symbols-outlined icon');
            iconSpan.textContent = CATEGORY_ICONS[key] || 'label';

            const labelDiv = el('div', 'label');
            labelDiv.textContent = cat.label;

            card.appendChild(iconSpan);
            card.appendChild(labelDiv);

            card.onclick = () => {
                const idx = tempSelectedInterests.indexOf(key);
                if (idx > -1) {
                    tempSelectedInterests.splice(idx, 1);
                    card.classList.remove('selected');
                } else {
                    tempSelectedInterests.push(key);
                    card.classList.add('selected');
                }
                updateInterestsCount();
            };

            grid.appendChild(card);
        });

        updateInterestsCount();
    }

    function updateInterestsCount() {
        const countLabel = $('interestsCountLabel');
        const saveBtn = $('saveInterestsBtn');
        if (countLabel) {
            countLabel.textContent = `चुने गए: ${tempSelectedInterests.length} / 3`;
        }
        if (saveBtn) {
            saveBtn.disabled = tempSelectedInterests.length < 3;
        }
    }

    function saveInterests() {
        userInterests = [...tempSelectedInterests];
        localStorage.setItem('bpt_user_interests', JSON.stringify(userInterests));
        toggleInterestsModal(false);
        showToast('आपकी रुचियां सहेज ली गई हैं! ✨');
        
        // If we are currently in personal feed view, refresh it
        if (isFeedActive) {
            renderPersonalFeed(true);
        }
    }

    function renderPersonalFeed(resetScroll = false) {
        if (resetScroll) {
            feedLoadedCount = 0;
            feedActiveTopic = 'all';
            const endIndicator = $('personalFeedEnd');
            if (endIndicator) endIndicator.style.display = 'none';
        }

        const feedList = $('personalFeedList');
        if (!feedList) return;

        // Show loading skeleton while loading is in progress
        if (isLoading) {
            console.log('[MyFeed] renderPersonalFeed: LOADING state. isLoading:', isLoading);
            feedList.innerHTML = `
                <div class="flex flex-col items-center justify-center py-20 gap-4">
                    <div class="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <p class="text-body-sm text-on-surface-variant">समाचार लोड हो रहे हैं…</p>
                </div>`;
            return;
        }

        // Mix articles matching interests + active city
        mixPersonalArticles();

        if (resetScroll) {
            // Render topic bubbles after mixing
            renderFeedTopicBubbles();
            feedList.innerHTML = '';
        }

        let filtered = getFilteredFeedArticles();
        console.log('[MyFeed] renderPersonalFeed: feedMixedArticles.length:', feedMixedArticles.length, '| filtered.length:', filtered.length, '| feedActiveTopic:', feedActiveTopic);

        // Fallback: if nothing matches chosen interests/city, show latest articles
        if (filtered.length === 0 && feedActiveTopic === 'all') {
            // Use ALL articles as graceful degradation so feed is never blank
            filtered = [...articles].slice(0, 20);
            if (feedList.innerHTML === '') {
                feedList.innerHTML = `
                    <div class="text-center py-5 px-4 mb-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-body-sm">
                        आपके चुने गए विषयों से मेल खाने वाले समाचार अभी उपलब्ध नहीं हैं। नीचे ताज़ा समाचार दिखाए जा रहे हैं।
                        <button class="ml-2 font-bold underline cursor-pointer" onclick="NEWS.openInterestsModal()">रुचि बदलें</button>
                    </div>`;
            }
        }

        if (filtered.length === 0) {
            feedList.innerHTML = `
                <div class="text-center py-16 bg-surface-container/30 border border-outline-variant/30 rounded-2xl p-6 w-full">
                    <span class="material-symbols-outlined text-[48px] text-on-surface-variant/40">newspaper</span>
                    <h3 class="text-headline-md font-bold text-on-surface mt-4">कोई समाचार उपलब्ध नहीं है</h3>
                    <p class="text-body-sm text-on-surface-variant mt-2 max-w-sm mx-auto">
                        आपके चुने गए विषयों या आपके शहर के लिए कोई समाचार नहीं मिला।
                    </p>
                    <button class="mt-6 bg-primary text-on-primary px-5 py-2 rounded-lg font-bold hover:opacity-95 transition-all text-body-sm shadow cursor-pointer" onclick="NEWS.openInterestsModal()">
                        विषय बदलें
                    </button>
                </div>
            `;
            const endIndicator = $('personalFeedEnd');
            if (endIndicator) endIndicator.style.display = 'none';
            return;
        }

        // Load page size
        const start = feedLoadedCount;
        const end = Math.min(start + FEED_PAGE_SIZE, filtered.length);
        const page = filtered.slice(start, end);

        console.log('[MyFeed] Rendering', page.length, 'cards. feedLoadedCount:', start, '→', end, '| total filtered:', filtered.length);
        page.forEach(art => {
            try {
                const card = renderFeedArticleCard(art);
                if (card) feedList.appendChild(card);
            } catch (cardErr) {
                console.error('[MyFeed] Error rendering article card for ID:', art.id, cardErr);
            }
        });

        feedLoadedCount = end;

        // Show/hide "all caught up" indicator
        const endIndicator = $('personalFeedEnd');
        if (feedLoadedCount >= filtered.length) {
            if (endIndicator) endIndicator.style.display = 'block';
        } else {
            if (endIndicator) endIndicator.style.display = 'none';
        }

        // Update city badge
        const feedCityBadge = $('feedCityBadge');
        if (feedCityBadge) {
            const cityRaw = selectedLocation.city || 'all';
            let hindiCity = 'सभी शहर';
            if (cityRaw !== 'all') {
                hindiCity = cityRaw === 'Ayodhya' ? 'अयोध्या' : cityRaw;
            }
            feedCityBadge.textContent = hindiCity;
        }
    }


    function mixPersonalArticles() {
        const cityFilter = selectedLocation.city ? selectedLocation.city.trim().toLowerCase() : 'all';
        const cityIsAll = (cityFilter === 'all' || cityFilter === '');

        feedMixedArticles = articles.filter(a => {
            // Match selected interests
            const isInterestMatch = userInterests.length > 0 && userInterests.includes(a.category);

            // Match active city filter — 'all' means no restriction
            let isCityMatch = cityIsAll; // if city=all, every article counts as city match
            if (!cityIsAll && a.location && a.location.city) {
                const artCity = a.location.city.trim().toLowerCase();
                if (cityFilter === 'ayodhya' || cityFilter === 'अयोध्या') {
                    isCityMatch = (artCity === 'ayodhya' || artCity === 'अयोध्या');
                } else {
                    isCityMatch = (artCity === cityFilter);
                }
            }

            return isInterestMatch || isCityMatch;
        });

        // Sort chronologically (newest first)
        feedMixedArticles.sort((a, b) => {
            const ta = a.publishedAt?.toMillis?.() || a.updatedAt?.toMillis?.() || a.createdAt?.toMillis?.() || 0;
            const tb = b.publishedAt?.toMillis?.() || b.updatedAt?.toMillis?.() || b.createdAt?.toMillis?.() || 0;
            return tb - ta;
        });
    }

    function getFilteredFeedArticles() {
        if (feedActiveTopic === 'all') {
            return feedMixedArticles;
        }
        if (feedActiveTopic === 'local') {
            const cityFilter = selectedLocation.city ? selectedLocation.city.trim().toLowerCase() : 'all';
            return feedMixedArticles.filter(a => {
                if (!a.location || !a.location.city) return false;
                const artCity = a.location.city.trim().toLowerCase();
                if (cityFilter === 'ayodhya' || cityFilter === 'अयोध्या') {
                    return (artCity === 'ayodhya' || artCity === 'अयोध्या');
                }
                return (artCity === cityFilter);
            });
        }
        return feedMixedArticles.filter(a => a.category === feedActiveTopic);
    }

    function renderFeedTopicBubbles() {
        const container = $('feedTopicBubbles');
        if (!container) return;
        container.innerHTML = '';

        // "All" Bubble
        const allBubble = el('button', `feed-bubble-pill ${feedActiveTopic === 'all' ? 'active' : ''}`);
        allBubble.innerHTML = `<span class="material-symbols-outlined text-sm">view_agenda</span> सभी`;
        allBubble.onclick = () => selectFeedTopic('all');
        container.appendChild(allBubble);

        // "Local" Bubble — only show if a specific city is selected
        const cityIsAll = !selectedLocation.city || selectedLocation.city === 'all';
        if (!cityIsAll) {
            const cityLabel = selectedLocation.city === 'Ayodhya' ? 'अयोध्या' : selectedLocation.city;
            const localBubble = el('button', `feed-bubble-pill ${feedActiveTopic === 'local' ? 'active' : ''}`);
            localBubble.innerHTML = `<span class="material-symbols-outlined text-sm">location_on</span> ${cityLabel}`;
            localBubble.onclick = () => selectFeedTopic('local');
            container.appendChild(localBubble);
        }

        // Selected Interest Bubbles
        userInterests.forEach(catKey => {
            const cat = CATEGORIES[catKey];
            if (!cat) return;

            // Check if any articles exist in this category in the mixed feed
            const count = feedMixedArticles.filter(a => a.category === catKey).length;
            if (count === 0) return;

            const pill = el('button', `feed-bubble-pill ${feedActiveTopic === catKey ? 'active' : ''}`);
            const icon = CATEGORY_ICONS[catKey] || 'label';
            pill.innerHTML = `<span class="material-symbols-outlined text-sm">${icon}</span> ${cat.label}`;
            pill.onclick = () => selectFeedTopic(catKey);
            container.appendChild(pill);
        });
    }

    function selectFeedTopic(topicKey) {
        feedActiveTopic = topicKey;
        feedLoadedCount = 0;

        // Highlight active bubble
        const bubbles = document.querySelectorAll('.feed-bubble-pill');
        bubbles.forEach(b => b.classList.remove('active'));

        // Re-render feed
        renderPersonalFeed(true);
    }

    function stripHtml(html) {
        if (!html) return '';
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    function renderFeedArticleCard(art) {
        const isRead = readArticles.has(art.id);
        const card = el('div', `feed-article-card ${isRead ? 'read' : ''}`);
        card.dataset.id = art.id;

        // Cover Image wrapper
        const imgWrapper = el('div', 'feed-card-image-wrapper');
        const img = el('img', 'feed-card-image');
        img.src = art.coverImageUrl || '/assets/default-news.png';
        img.alt = art.title;
        imgWrapper.appendChild(img);
        card.appendChild(imgWrapper);

        // Content panel
        const content = el('div', 'feed-card-content');

        // Header (badges)
        const header = el('div', 'feed-card-header');
        
        // Category badge
        const catBadge = el('span', 'feed-card-badge');
        catBadge.textContent = CATEGORIES[art.category]?.label || art.category;
        
        // Dynamic colors for category badges
        const catColors = {
            school_news: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            education: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
            achievements: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
            campus_life: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            careers: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
            politics: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
            science_tech: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
            environment: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            sports: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300'
        };
        catBadge.className = `feed-card-badge ${catColors[art.category] || 'bg-surface-container text-on-surface-variant'}`;
        header.appendChild(catBadge);

        // City indicator badge (if matches active city)
        let isLocalMatch = false;
        if (art.location && art.location.city) {
            const artCity = art.location.city.trim().toLowerCase();
            const activeCity = selectedLocation.city.trim().toLowerCase();
            if (activeCity === 'ayodhya' || activeCity === 'अयोध्या') {
                isLocalMatch = (artCity === 'ayodhya' || artCity === 'अयोध्या');
            } else {
                isLocalMatch = (artCity === activeCity);
            }
        }
        if (isLocalMatch) {
            const localBadge = el('span', 'feed-card-city-badge');
            localBadge.innerHTML = `<span class="material-symbols-outlined text-[11px]">location_on</span> स्थानीय (Local)`;
            header.appendChild(localBadge);
        }
        content.appendChild(header);

        // Title and summary container
        const midSection = el('div', 'flex-1');
        const title = el('h3', 'feed-card-title');
        title.textContent = art.title;
        const summary = el('p', 'feed-card-summary');
        summary.textContent = art.summary || stripHtml(art.body).substring(0, 120) + '...';
        midSection.appendChild(title);
        midSection.appendChild(summary);
        content.appendChild(midSection);

        // Footer Metadata
        const footer = el('div', 'feed-card-meta');
        
        const date = art.publishedAt?.toDate?.() || art.updatedAt?.toDate?.() || art.createdAt?.toDate?.();
        const dateStr = date ? date.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' }) : '—';
        const authorName = art.isAnonymous ? 'संवाददाता' : (art.authorName || 'BP Times Reporter');
        
        const leftMeta = el('span');
        leftMeta.textContent = `द्वारा ${authorName} • ${dateStr}`;
        
        const rightMeta = el('span', 'flex items-center gap-1');
        rightMeta.innerHTML = `<span class="material-symbols-outlined text-[12px]">schedule</span> ${art.readTimeMinutes || 1} मिनट`;
        
        footer.appendChild(leftMeta);
        footer.appendChild(rightMeta);
        content.appendChild(footer);

        card.appendChild(content);
        
        card.onclick = () => openFeedArticle(art.id);

        return card;
    }

    function openFeedArticle(id) {
        // Track read status
        if (!readArticles.has(id)) {
            readArticles.add(id);
            localStorage.setItem('bpt_read_articles', JSON.stringify(Array.from(readArticles)));
            
            // Visual feedback: find card and add read class
            const card = document.querySelector(`.feed-article-card[data-id="${id}"]`);
            if (card) card.classList.add('read');
        }

        // Open full article details
        openArticle(id);
    }

    function setupFeedScrollObserver() {
        window.addEventListener('scroll', () => {
            if (!isFeedActive || isFeedScrolling) return;

            const threshold = 150;
            const scrollPos = window.innerHeight + window.scrollY;
            const maxScroll = document.documentElement.offsetHeight;

            if (maxScroll - scrollPos < threshold) {
                const filtered = getFilteredFeedArticles();
                if (feedLoadedCount < filtered.length) {
                    isFeedScrolling = true;
                    
                    const loader = $('personalFeedLoader');
                    if (loader) loader.style.display = 'flex';

                    setTimeout(() => {
                        renderPersonalFeed(false);
                        if (loader) loader.style.display = 'none';
                        isFeedScrolling = false;
                    }, 400); // Premium micro-delay
                }
            }
        });
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ── Public API ── */
    return {
        init,
        setTheme,
        toggleMenu,
        toggleBookmarksFilter,
        toggleMenuTheme,
        toggleLocationModal,
        onLocCityChange,
        onLocTehsilChange,
        applyLocationFilter,
        resetLocationFilter,
        openArticle,
        closeArticle,
        shareArticle,
        toggleBookmark,
        scrollToTop,
        setCategory,
        signIn,
        signOut,
        toggleSearch,
        toggleAppLauncher,
        setStateFilter,
        togglePersonalFeed,
        openInterestsModal,
        toggleInterestsModal,
        saveInterests,
    };
})();

// Expose NEWS globally to ensure Safari on iOS/iPadOS works normally with inline handlers
window.NEWS = NEWS;

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', NEWS.init);
} else {
    NEWS.init();
}
