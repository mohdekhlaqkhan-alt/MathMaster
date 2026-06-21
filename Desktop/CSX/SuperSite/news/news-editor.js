/* ============================================
   BROPRO TIMES — NEWS EDITOR LOGIC
   Handles auth, CRUD, Quill editor, image uploads,
   review workflow, and toast notifications.
   ============================================ */

const NE = (() => {
    'use strict';

    // ── Constants ──
    const ADMIN_EMAIL = 'mohdekhlaqkhan@gmail.com';
    const CATEGORIES = {
        school_news: 'School News',
        education: 'Education Updates',
        achievements: 'Student Achievements',
        campus_life: 'Campus Life',
        careers: 'Careers & Guidance',
        politics: 'Politics & Society',
        business: 'Business & Economy',
        science_tech: 'Science & Technology',
        environment: 'Environment & Climate',
        health: 'Health & Wellness',
        sports: 'Sports & Athletics',
        arts_culture: 'Arts & Culture',
        literature: 'Literature & Books',
        opinion: 'Opinion & Editorial',
        local: 'Local News',
        interviews: 'Interviews & Spotlights',
        world_brief: 'Global Briefing'
    };
    const BIAS_LABELS = {
        factual_report: '📊 Factual Report',
        opinion: '💬 Opinion/Editorial',
        announcement: '📢 Announcement',
        investigation: '🔍 Investigation'
    };
    const STATUS_LABELS = {
        draft: 'Draft',
        under_review: 'Under Review',
        needs_revision: 'Needs Revision',
        approved: 'Approved',
        published: 'Published',
        updated: 'Updated',
        retracted: 'Retracted',
        rejected: 'Rejected'
    };

    // ── State ──
    let currentUser = null;
    let userRole = null;
    let isAdmin = false;
    let quillEditor = null;
    let currentArticleId = null;
    let currentArticleData = null;
    let currentTab = 'my';
    let confirmCallback = null;
    let pendingReviewAction = null;   // 'revision' or 'reject'
    let reviewArticleId = null;
    let coverImageFile = null;

    // ── DOM Refs (populated on init) ──
    const $ = (id) => document.getElementById(id);

    async function populateLocationDatalists() {
        try {
            console.log('[BP Times Editor] Fetching locations for autocomplete datalists...');
            const snap = await db.collection('newsArticles')
                .where('status', 'in', ['published', 'updated'])
                .get();

            const cities = new Set();
            const tehsils = new Set();
            const villages = new Set();

            snap.forEach(doc => {
                const loc = doc.data().location;
                if (loc) {
                    if (loc.city && loc.city.trim()) cities.add(loc.city.trim());
                    if (loc.tehsil && loc.tehsil.trim()) tehsils.add(loc.tehsil.trim());
                    if (loc.village && loc.village.trim()) villages.add(loc.village.trim());
                }
            });

            const buildDatalist = (id, items) => {
                const dl = $(id);
                if (!dl) return;
                dl.innerHTML = '';
                Array.from(items).sort().forEach(item => {
                    const opt = document.createElement('option');
                    opt.value = item;
                    dl.appendChild(opt);
                });
            };

            populateCitySelect(cities);
            buildDatalist('neTehsilsList', tehsils);
            buildDatalist('neVillagesList', villages);
            console.log('[BP Times Editor] Datalists populated. Cities:', cities.size, 'Tehsils:', tehsils.size, 'Villages:', villages.size);
        } catch (e) {
            console.warn('[BP Times Editor] Failed to populate datalists:', e);
        }
    }

    function populateCitySelect(citiesSet) {
        const select = $('neCitySelect');
        if (!select) return;

        select.innerHTML = '';

        // Default / permanent option
        const optDefault = document.createElement('option');
        optDefault.value = 'Ayodhya';
        optDefault.textContent = 'अयोध्या (Ayodhya)';
        select.appendChild(optDefault);

        // Sort and add other unique cities
        const uniqueCities = new Set();
        citiesSet.forEach(c => {
            if (c && c.trim()) {
                const norm = c.trim();
                if (norm.toLowerCase() !== 'ayodhya' && norm !== 'अयोध्या') {
                    uniqueCities.add(norm);
                }
            }
        });

        Array.from(uniqueCities).sort().forEach(c => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.textContent = c;
            select.appendChild(opt);
        });

        // Add Custom City option
        const optCustom = document.createElement('option');
        optCustom.value = '__custom__';
        optCustom.textContent = '➕ Add Custom City... (नया शहर जोड़ें)';
        select.appendChild(optCustom);

        // Restore previous selection or sync UI
        const currentCityVal = $('neCity') ? $('neCity').value : '';
        if (currentCityVal) {
            syncCityUI(currentCityVal);
        } else {
            // Default to Ayodhya if nothing is selected
            syncCityUI('Ayodhya');
        }
    }

    function syncCityUI(cityVal) {
        const select = $('neCitySelect');
        const customInput = $('neCityCustomInput');
        const hiddenInput = $('neCity');
        if (!select || !customInput || !hiddenInput) return;

        hiddenInput.value = cityVal;

        // Normalization
        let matchVal = cityVal;
        if (cityVal && (cityVal.toLowerCase() === 'ayodhya' || cityVal === 'अयोध्या')) {
            matchVal = 'Ayodhya';
        }

        // Check if option exists
        let hasOption = false;
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === matchVal) {
                hasOption = true;
                break;
            }
        }

        if (hasOption) {
            select.value = matchVal;
            customInput.style.display = 'none';
            customInput.value = '';
        } else if (cityVal) {
            select.value = '__custom__';
            customInput.style.display = 'block';
            customInput.value = cityVal;
        } else {
            // Empty value defaults to Ayodhya
            select.value = 'Ayodhya';
            customInput.style.display = 'none';
            customInput.value = '';
            hiddenInput.value = 'Ayodhya';
        }
    }

    function syncStateUI(stateVal) {
        const select = $('neStateSelect');
        const customInput = $('neStateCustomInput');
        const hiddenInput = $('neState');
        if (!select || !customInput || !hiddenInput) return;

        hiddenInput.value = stateVal;

        // Normalization
        let matchVal = stateVal || 'Uttar Pradesh';

        // Check if option exists
        let hasOption = false;
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === matchVal) {
                hasOption = true;
                break;
            }
        }

        if (hasOption) {
            select.value = matchVal;
            customInput.style.display = 'none';
            customInput.value = '';
        } else if (stateVal) {
            select.value = '__custom__';
            customInput.style.display = 'block';
            customInput.value = stateVal;
        } else {
            select.value = 'Uttar Pradesh';
            customInput.style.display = 'none';
            customInput.value = '';
            hiddenInput.value = 'Uttar Pradesh';
        }
    }

    // ══════════════════════════════════════════
    //  INITIALIZATION
    // ══════════════════════════════════════════
    function init() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                currentUser = user;
                showNavUser(user);
                await checkRole(user);
            } else {
                currentUser = null;
                showView('auth');
            }
        });

        // Setup summary character counter
        const summaryEl = $('neSummary');
        if (summaryEl) {
            summaryEl.addEventListener('input', () => {
                const count = summaryEl.value.length;
                const counter = $('neSummaryCount');
                counter.textContent = count;
                const wrap = counter.parentElement;
                wrap.classList.remove('ne-char-warning', 'ne-char-limit');
                if (count >= 150) wrap.classList.add('ne-char-limit');
                else if (count >= 120) wrap.classList.add('ne-char-warning');
            });
        }

        // Setup tags input
        const tagsInput = $('neTagsInput');
        if (tagsInput) {
            tagsInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    addTag(tagsInput.value.trim());
                    tagsInput.value = '';
                }
            });
        }

        // Focus tags input when clicking container
        const tagsContainer = $('neTagsContainer');
        if (tagsContainer) {
            tagsContainer.addEventListener('click', () => tagsInput.focus());
        }

        // Setup bias label toggles
        const biasGroup = $('neBiasGroup');
        if (biasGroup) {
            biasGroup.querySelectorAll('.ne-bias-option').forEach(opt => {
                opt.addEventListener('click', () => {
                    biasGroup.querySelectorAll('.ne-bias-option').forEach(o => o.classList.remove('active'));
                    opt.classList.add('active');
                    opt.querySelector('input[type="radio"]').checked = true;
                });
            });
        }

        // Setup cover image
        setupCoverUpload();

        // Setup city selector dropdown and custom input
        const citySelect = $('neCitySelect');
        const customInput = $('neCityCustomInput');
        const hiddenInput = $('neCity');

        if (citySelect && customInput && hiddenInput) {
            citySelect.addEventListener('change', () => {
                if (citySelect.value === '__custom__') {
                    customInput.style.display = 'block';
                    customInput.value = '';
                    customInput.focus();
                    hiddenInput.value = '';
                } else {
                    customInput.style.display = 'none';
                    customInput.value = '';
                    hiddenInput.value = citySelect.value;
                }
            });

            customInput.addEventListener('input', () => {
                hiddenInput.value = customInput.value.trim();
            });
        }

        // Setup state selector dropdown and custom input
        const stateSelect = $('neStateSelect');
        const stateCustomInput = $('neStateCustomInput');
        const stateHiddenInput = $('neState');

        if (stateSelect && stateCustomInput && stateHiddenInput) {
            stateSelect.addEventListener('change', () => {
                if (stateSelect.value === '__custom__') {
                    stateCustomInput.style.display = 'block';
                    stateCustomInput.value = '';
                    stateCustomInput.focus();
                    stateHiddenInput.value = '';
                } else {
                    stateCustomInput.style.display = 'none';
                    stateCustomInput.value = '';
                    stateHiddenInput.value = stateSelect.value;
                }
            });

            stateCustomInput.addEventListener('input', () => {
                stateHiddenInput.value = stateCustomInput.value.trim();
            });

            // Initialize state selection
            syncStateUI(stateHiddenInput.value || 'Uttar Pradesh');
        }
    }

    // ══════════════════════════════════════════
    //  AUTH & ROLE CHECK
    // ══════════════════════════════════════════
    function signIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(err => {
            console.error('Sign-in error:', err);
            toast('Sign-in failed', err.message, 'error');
        });
    }

    async function checkRole(user) {
        try {
            if (user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
                isAdmin = true;
                userRole = 'editor';
                showView('dashboard');
                updateDashboardRole();
                showEditorTabs();
                loadArticles();
                populateLocationDatalists();
                return;
            }

            let roleData = null;

            // 1. Try direct UID lookup first
            const roleDoc = await db.collection('newsRoles').doc(user.uid).get();
            if (roleDoc.exists && roleDoc.data().active !== false) {
                roleData = roleDoc.data();
            }

            // 2. Try direct Email ID lookups if UID lookup didn't match
            if (!roleData && user.email) {
                const emailDocs = await Promise.all([
                    db.collection('newsRoles').doc(user.email).get(),
                    db.collection('newsRoles').doc(user.email.toLowerCase()).get()
                ]);
                for (const doc of emailDocs) {
                    if (doc.exists && doc.data().active !== false) {
                        roleData = doc.data();
                        break;
                    }
                }
            }

            // 3. Try Email query fallback if direct lookups didn't match
            if (!roleData && user.email) {
                const emailMatches = await Promise.all([
                    db.collection('newsRoles').where('email', '==', user.email).limit(1).get(),
                    db.collection('newsRoles').where('email', '==', user.email.toLowerCase()).limit(1).get()
                ]);
                
                for (const snap of emailMatches) {
                    if (!snap.empty) {
                        const data = snap.docs[0].data();
                        if (data.active !== false) {
                            roleData = data;
                            break;
                        }
                    }
                }
            }

            if (roleData) {
                userRole = roleData.role;
                isAdmin = false;
                showView('dashboard');
                updateDashboardRole();
                if (userRole === 'editor') showEditorTabs();
                loadArticles();
                populateLocationDatalists();
            } else {
                showView('denied');
            }
        } catch (err) {
            console.error('Role check error:', err);
            showView('denied');
        }
    }

    function showNavUser(user) {
        const navUser = $('neNavUser');
        const avatar = $('neNavAvatar');
        const name = $('neNavUsername');
        if (user.photoURL) avatar.src = user.photoURL;
        else avatar.style.display = 'none';
        name.textContent = user.displayName || user.email;
        navUser.style.display = 'flex';
    }

    function updateDashboardRole() {
        const roleEl = $('neDashRole');
        if (isAdmin) {
            roleEl.textContent = '👑 Admin — Full Access';
        } else {
            const roleName = userRole === 'editor' ? '🛡️ Editor' :
                             userRole === 'senior_reporter' ? '⭐ Senior Reporter' : '📝 Reporter';
            roleEl.textContent = roleName;
        }
    }

    function showEditorTabs() {
        $('neReviewTab').style.display = '';
        $('neAllTab').style.display = '';
        if ($('neBreakingTab')) $('neBreakingTab').style.display = '';
    }

    // ══════════════════════════════════════════
    //  VIEW MANAGEMENT
    // ══════════════════════════════════════════
    function showView(view) {
        $('neLoading').style.display = 'none';
        $('neAuthGate').style.display = 'none';
        $('neAccessDenied').style.display = 'none';
        $('neDashboard').style.display = 'none';
        $('neEditor').style.display = 'none';
        $('neReviewPanel').style.display = 'none';

        switch (view) {
            case 'loading': $('neLoading').style.display = ''; break;
            case 'auth': $('neAuthGate').style.display = ''; break;
            case 'denied': $('neAccessDenied').style.display = ''; break;
            case 'dashboard': $('neDashboard').style.display = ''; break;
            case 'editor': $('neEditor').style.display = ''; break;
            case 'review': $('neReviewPanel').style.display = ''; break;
        }
    }

    // ══════════════════════════════════════════
    //  DASHBOARD — ARTICLE LISTING
    // ══════════════════════════════════════════
    function switchTab(tab) {
        currentTab = tab;
        document.querySelectorAll('.ne-tab').forEach(t => {
            t.classList.toggle('ne-tab-active', t.dataset.tab === tab);
        });

        // Hide article list, empty state, and breaking manager by default
        if ($('neArticleList')) $('neArticleList').style.display = '';
        if ($('neEmpty')) $('neEmpty').style.display = 'none';
        if ($('neBreakingManager')) $('neBreakingManager').style.display = 'none';

        if (tab === 'breaking') {
            if ($('neArticleList')) $('neArticleList').style.display = 'none';
            if ($('neBreakingManager')) {
                $('neBreakingManager').style.display = 'block';
                loadBreakingNewsManager();
            }
        } else {
            loadArticles();
        }
    }

    async function loadArticles() {
        const list = $('neArticleList');
        const empty = $('neEmpty');
        list.innerHTML = renderSkeletons(4);
        empty.style.display = 'none';

        try {
            let query;
            if (currentTab === 'my') {
                query = db.collection('newsArticles')
                    .where('authorId', '==', currentUser.uid)
                    .orderBy('createdAt', 'desc')
                    .limit(50);
            } else if (currentTab === 'review') {
                query = db.collection('newsArticles')
                    .where('status', '==', 'under_review')
                    .orderBy('submittedAt', 'desc')
                    .limit(50);
            } else {
                // all articles (admin/editor)
                query = db.collection('newsArticles')
                    .orderBy('updatedAt', 'desc')
                    .limit(100);
            }

            const snap = await query.get();
            if (snap.empty) {
                list.innerHTML = '';
                empty.style.display = '';
                if (currentTab === 'review') {
                    $('neEmpty').querySelector('.ne-empty-icon').textContent = '✅';
                    $('neEmpty').querySelector('.ne-empty-title').textContent = 'Review queue is empty';
                    $('neEmpty').querySelector('.ne-empty-desc').textContent = 'No articles waiting for review.';
                } else if (currentTab === 'all') {
                    $('neEmpty').querySelector('.ne-empty-icon').textContent = '📚';
                    $('neEmpty').querySelector('.ne-empty-title').textContent = 'No articles';
                    $('neEmpty').querySelector('.ne-empty-desc').textContent = 'No articles have been created yet.';
                } else {
                    $('neEmpty').querySelector('.ne-empty-icon').textContent = '✍️';
                    $('neEmpty').querySelector('.ne-empty-title').textContent = 'No articles yet';
                    $('neEmpty').querySelector('.ne-empty-desc').textContent = 'Start writing your first article for BroPro Times!';
                }
                return;
            }

            // Update review count badge
            if (currentTab !== 'review' && (isAdmin || userRole === 'editor')) {
                const reviewSnap = await db.collection('newsArticles')
                    .where('status', '==', 'under_review')
                    .get();
                const badge = $('neReviewCount');
                if (reviewSnap.size > 0) {
                    badge.textContent = reviewSnap.size;
                    badge.style.display = '';
                } else {
                    badge.style.display = 'none';
                }
            }

            let html = '';
            const docs = snap.docs.map(doc => ({ id: doc.id, data: doc.data() }));
            
            // Client-side sort by updatedAt desc to put most recently edited articles first
            docs.sort((a, b) => {
                const ta = a.data.updatedAt?.toMillis?.() || 0;
                const tb = b.data.updatedAt?.toMillis?.() || 0;
                return tb - ta;
            });

            docs.forEach((item, i) => {
                html += renderArticleCard(item.id, item.data, i);
            });
            list.innerHTML = html;
            empty.style.display = 'none';
        } catch (err) {
            console.error('Load articles error:', err);
            list.innerHTML = `<div class="ne-empty"><div class="ne-empty-icon">⚠️</div><h3 class="ne-empty-title">Error loading articles</h3><p class="ne-empty-desc">${err.message}</p></div>`;
        }
    }

    function renderArticleCard(id, d, index) {
        const statusBadge = `<span class="ne-badge ne-badge-${d.status}">${STATUS_LABELS[d.status] || d.status}</span>`;
        const cat = CATEGORIES[d.category] || d.category;
        const updated = d.updatedAt ? formatDate(d.updatedAt.toDate()) : '—';
        const showAuthor = currentTab !== 'my' && d.authorName;
        const displayAuthorName = d.isAnonymous ? (isAdmin ? `${d.authorName} (🕵️ Anonymous)` : '🕵️ Anonymous') : d.authorName;
        const displayAuthorPhoto = d.isAnonymous ? null : d.authorPhotoUrl;
        const authorHtml = showAuthor ? `<div class="ne-article-card-author">${displayAuthorPhoto ? `<img src="${displayAuthorPhoto}" alt="">` : ''}${displayAuthorName}</div>` : '';

        return `
        <div class="ne-article-card" style="animation-delay:${index * 0.05}s" onclick="NE.openArticle('${id}')">
            <div class="ne-article-card-body">
                <h3 class="ne-article-card-title">${escapeHtml(d.title || 'Untitled')}</h3>
                <div class="ne-article-card-meta">
                    ${statusBadge}
                    <span>${cat}</span>
                    <span>📅 ${updated}</span>
                    ${d.wordCount ? `<span>📝 ${d.wordCount} words</span>` : ''}
                    ${d.viewCount ? `<span>👁️ ${d.viewCount}</span>` : ''}
                </div>
                ${authorHtml}
            </div>
        </div>`;
    }

    function renderSkeletons(count) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `<div class="ne-article-card">
                <div class="ne-article-card-body">
                    <div class="ne-skeleton" style="height:20px;width:70%;margin-bottom:10px"></div>
                    <div class="ne-skeleton" style="height:14px;width:50%"></div>
                </div>
            </div>`;
        }
        return html;
    }

    // ══════════════════════════════════════════
    //  OPEN / EDIT ARTICLE
    // ══════════════════════════════════════════
    async function openArticle(id) {
        try {
            const doc = await db.collection('newsArticles').doc(id).get();
            if (!doc.exists) {
                toast('Not Found', 'This article no longer exists.', 'error');
                return;
            }
            const data = doc.data();

            // Editor/Admin opening under_review article → show review panel
            if (data.status === 'under_review' && (isAdmin || userRole === 'editor') && data.authorId !== currentUser.uid) {
                openReviewPanel(id, data);
                return;
            }

            // Published/approved article by non-owner non-editor → just view in review panel
            if (['published', 'approved', 'updated'].includes(data.status) && data.authorId !== currentUser.uid && !isAdmin) {
                openReviewPanel(id, data);
                return;
            }

            // Otherwise → open editor
            openEditorWithData(id, data);
        } catch (err) {
            console.error('Open article error:', err);
            toast('Error', err.message, 'error');
        }
    }

    function openEditorWithData(id, data) {
        try {
            currentArticleId = id;
            currentArticleData = data;

            // Populate fields
            $('neTitle').value = data.title || '';
            $('neSummary').value = data.summary || '';
            $('neSummaryCount').textContent = (data.summary || '').length;
            $('neCategory').value = data.category || 'school_news';
            $('neIsAnonymous').checked = !!data.isAnonymous;

            // Populate Location fields
            const stateVal = data.location?.state || 'Uttar Pradesh';
            $('neState').value = stateVal;
            syncStateUI(stateVal);
            const cityVal = data.location?.city || '';
            $('neCity').value = cityVal;
            syncCityUI(cityVal);
            $('neTehsil').value = data.location?.tehsil || '';
            $('neVillage').value = data.location?.village || '';

            // Bias label
            const biasGroup = $('neBiasGroup');
            if (biasGroup) {
                biasGroup.querySelectorAll('.ne-bias-option').forEach(opt => {
                    const val = opt.dataset.value;
                    opt.classList.toggle('active', val === (data.biasLabel || 'factual_report'));
                    const radio = opt.querySelector('input[type="radio"]');
                    if (radio) radio.checked = val === (data.biasLabel || 'factual_report');
                });
            }

            // Tags
            clearTags();
            (data.tags || []).forEach(tag => addTag(tag));

            // Cover image
            if (data.coverImageUrl) {
                $('neCoverPreview').src = data.coverImageUrl;
                $('neCoverPreview').style.display = '';
                $('neCoverPlaceholder').style.display = 'none';
                $('neCoverRemoveBtn').style.display = '';
            } else {
                $('neCoverPreview').style.display = 'none';
                $('neCoverPlaceholder').style.display = '';
                $('neCoverRemoveBtn').style.display = 'none';
            }
            coverImageFile = null;

            // Revision / rejection notes
            if (data.status === 'needs_revision' && data.revisionNote) {
                $('neRevisionNote').style.display = '';
                $('neRevisionNoteText').textContent = data.revisionNote;
            } else {
                $('neRevisionNote').style.display = 'none';
            }
            if (data.status === 'rejected' && data.rejectionReason) {
                $('neRejectionNote').style.display = '';
                $('neRejectionNoteText').textContent = data.rejectionReason;
            } else {
                $('neRejectionNote').style.display = 'none';
            }

            // Show/hide buttons based on status
            const canEdit = isAdmin || data.authorId === currentUser.uid;
            const isLive = ['published', 'approved', 'updated'].includes(data.status);
            const isDraft = data.status === 'draft' || data.status === 'needs_revision' || data.status === 'rejected';

            if (isLive && (isAdmin || userRole === 'editor')) {
                $('neSaveDraftBtn').textContent = '💾 Save & Publish';
                $('neSaveDraftBtn').style.display = canEdit ? '' : 'none';
                $('neSubmitBtn').style.display = 'none';
            } else {
                $('neSaveDraftBtn').textContent = '💾 Save Draft';
                $('neSaveDraftBtn').style.display = canEdit ? '' : 'none';
                $('neSubmitBtn').style.display = (canEdit && (isDraft || isLive)) ? '' : 'none';
            }

            $('neDeleteBtn').style.display = (canEdit && data.status === 'draft') ? '' : 'none';

            // Init Quill
            initQuill();
            if (quillEditor) {
                if (data.body) {
                    quillEditor.root.innerHTML = data.body;
                } else {
                    quillEditor.setText('');
                }
            }
            updateWordCount();

            showView('editor');
        } catch (err) {
            console.error('Error in openEditorWithData:', err);
            alert('Error in openEditorWithData: ' + err.message + '\nStack: ' + err.stack);
        }
    }

    // ══════════════════════════════════════════
    //  NEW ARTICLE
    // ══════════════════════════════════════════
    function newArticle() {
        try {
            currentArticleId = null;
            currentArticleData = null;

            // Reset form
            $('neTitle').value = '';
            $('neSummary').value = '';
            $('neSummaryCount').textContent = '0';
            $('neCategory').value = 'school_news';
            $('neIsAnonymous').checked = false;
            $('neState').value = 'Uttar Pradesh';
            syncStateUI('Uttar Pradesh');
            $('neCity').value = '';
            syncCityUI('Ayodhya');
            $('neTehsil').value = '';
            $('neVillage').value = '';

            // Reset bias
            const biasGroup = $('neBiasGroup');
            if (biasGroup) {
                biasGroup.querySelectorAll('.ne-bias-option').forEach((opt, i) => {
                    opt.classList.toggle('active', i === 0);
                    const radio = opt.querySelector('input[type="radio"]');
                    if (radio) radio.checked = i === 0;
                });
            }

            // Reset tags
            clearTags();

            // Reset cover
            $('neCoverPreview').style.display = 'none';
            $('neCoverPlaceholder').style.display = '';
            $('neCoverRemoveBtn').style.display = 'none';
            coverImageFile = null;

            // Reset notes
            $('neRevisionNote').style.display = 'none';
            $('neRejectionNote').style.display = 'none';

            // Show buttons
            $('neSaveDraftBtn').textContent = '💾 Save Draft';
            $('neSaveDraftBtn').style.display = '';
            $('neSubmitBtn').style.display = '';
            $('neDeleteBtn').style.display = 'none';

            // Init Quill
            initQuill();
            if (quillEditor) {
                quillEditor.setText('');
            }
            updateWordCount();

            showView('editor');
        } catch (err) {
            console.error('Error in newArticle:', err);
            alert('Error in newArticle: ' + err.message + '\nStack: ' + err.stack);
        }
    }

    // ══════════════════════════════════════════
    //  QUILL EDITOR
    // ══════════════════════════════════════════
    function initQuill() {
        try {
            const container = $('neQuillEditor');
            if (!container) {
                throw new Error('Element #neQuillEditor not found');
            }

            // If quillEditor already exists, reuse it to prevent Quill container class-corruption issues
            if (quillEditor) {
                return;
            }

            if (typeof Quill === 'undefined') {
                throw new Error('Quill editor library is not loaded. Please verify script tags.');
            }

            // Reset container class list to clean any previous residuals
            container.className = '';

            quillEditor = new Quill('#neQuillEditor', {
                theme: 'snow',
                placeholder: 'Write your article...',
                modules: {
                    toolbar: {
                        container: [
                            [{ header: [2, 3, false] }],
                            ['bold', 'italic', 'underline'],
                            ['blockquote'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image'],
                            ['clean']
                        ],
                        handlers: {
                            image: handleQuillImageUpload
                        }
                    }
                }
            });

            quillEditor.on('text-change', updateWordCount);
        } catch (err) {
            console.error('Error in initQuill:', err);
            alert('Error in initQuill: ' + err.message + '\nStack: ' + err.stack);
            throw err;
        }
    }


    function handleQuillImageUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;
            try {
                toast('Uploading', 'Uploading image...', 'info');
                const compressed = await compressImage(file, 1200);
                const articleId = currentArticleId || 'temp_' + Date.now();
                const path = `news-images/${articleId}/inline_${Date.now()}.${getExtension(file.name)}`;
                const url = await uploadImage(compressed, path);
                const range = quillEditor.getSelection(true);
                quillEditor.insertEmbed(range.index, 'image', url);
                toast('Done', 'Image inserted.', 'success');
            } catch (err) {
                console.error('Inline image upload error:', err);
                toast('Upload Failed', err.message, 'error');
            }
        };
    }

    // ══════════════════════════════════════════
    //  SAVE / SUBMIT / DELETE
    // ══════════════════════════════════════════
    async function saveDraft() {
        const isLive = ['published', 'approved', 'updated'].includes(currentArticleData?.status);
        if (isLive && (isAdmin || userRole === 'editor')) {
            // Keep the live status (use 'updated' if it was published, otherwise keep the same)
            const targetStatus = currentArticleData.status === 'published' ? 'updated' : currentArticleData.status;
            await saveArticle(targetStatus);
        } else {
            await saveArticle('draft');
        }
    }

    async function submitForReview() {
        const title = $('neTitle').value.trim();
        const body = quillEditor.root.innerHTML.trim();
        if (!title) {
            toast('Missing Title', 'Please enter a headline.', 'error');
            return;
        }
        if (!body || body === '<p><br></p>') {
            toast('Missing Body', 'Please write your article content.', 'error');
            return;
        }
        await saveArticle('under_review');
    }

    async function saveArticle(status) {
        const btn = status === 'draft' ? $('neSaveDraftBtn') : $('neSubmitBtn');
        btn.disabled = true;
        btn.textContent = '⏳ Saving...';

        try {
            const title = $('neTitle').value.trim();
            if (!title) {
                toast('Missing Title', 'Please enter a headline.', 'error');
                btn.disabled = false;
                btn.textContent = status === 'draft' ? '💾 Save Draft' : '📤 Submit for Review';
                return;
            }

            const body = quillEditor.root.innerHTML;
            const plainText = stripHtml(body);
            const wc = countWords(plainText);
            const readTime = calculateReadTime(wc);

            const biasChecked = document.querySelector('input[name="biasLabel"]:checked');

            const stateVal = $('neState').value.trim();
            const cityVal = $('neCity').value.trim();
            const tehsilVal = $('neTehsil').value.trim();
            const villageVal = $('neVillage').value.trim();
            const location = (stateVal || cityVal || tehsilVal || villageVal) ? {
                state: stateVal,
                city: cityVal,
                tehsil: tehsilVal,
                village: villageVal
            } : null;

            const articleData = {
                title: title,
                slug: generateSlug(title),
                summary: $('neSummary').value.trim(),
                body: body,
                category: $('neCategory').value,
                tags: getTags(),
                biasLabel: biasChecked ? biasChecked.value : 'factual_report',
                location: location,
                status: status,
                authorId: currentUser.uid,
                authorName: currentUser.displayName || currentUser.email.split('@')[0],
                authorPhotoUrl: currentUser.photoURL || null,
                isAnonymous: $('neIsAnonymous').checked,
                wordCount: wc,
                readTimeMinutes: readTime,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (status === 'under_review') {
                articleData.submittedAt = firebase.firestore.FieldValue.serverTimestamp();
            }

            // Upload cover image if new file selected
            if (coverImageFile) {
                const artId = currentArticleId || 'new_' + Date.now();
                const ext = getExtension(coverImageFile.name);
                const path = `news-images/${artId}/cover.${ext}`;
                const compressed = await compressImage(coverImageFile, 1600);
                const url = await uploadImage(compressed, path);
                articleData.coverImageUrl = url;
                coverImageFile = null;
            }

            if (currentArticleId) {
                // Update existing
                await db.collection('newsArticles').doc(currentArticleId).update(articleData);
                toast('Saved', status === 'under_review' ? 'Article submitted for review!' : 'Draft saved successfully.', 'success');
            } else {
                // Create new
                articleData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                articleData.viewCount = 0;
                articleData.reactionCounts = { '👍': 0, '❤️': 0, '🔥': 0, '💡': 0, '🤔': 0 };
                articleData.commentCount = 0;
                articleData.bookmarkCount = 0;
                articleData.isPinned = false;
                articleData.isFeatured = false;
                articleData.publishedAt = null;
                articleData.editorId = null;
                articleData.editorNote = null;
                articleData.rejectionReason = null;
                articleData.revisionNote = null;
                articleData.hasCorrections = false;
                articleData.correctionNote = null;
                if (!articleData.coverImageUrl) articleData.coverImageUrl = null;

                const docRef = await db.collection('newsArticles').add(articleData);
                currentArticleId = docRef.id;
                toast('Created', status === 'under_review' ? 'Article submitted for review!' : 'Article created as draft.', 'success');
            }

            if (status === 'under_review') {
                backToDashboard();
            }
        } catch (err) {
            console.error('Save error:', err);
            toast('Save Failed', err.message, 'error');
        }

        btn.disabled = false;
        btn.textContent = status === 'draft' ? '💾 Save Draft' : '📤 Submit for Review';
    }

    function deleteDraft() {
        showConfirm(
            '🗑️',
            'Delete Draft?',
            'This will permanently delete this draft. This action cannot be undone.',
            async () => {
                try {
                    await db.collection('newsArticles').doc(currentArticleId).delete();
                    toast('Deleted', 'Draft has been deleted.', 'success');
                    backToDashboard();
                } catch (err) {
                    toast('Error', err.message, 'error');
                }
            }
        );
    }

    // ══════════════════════════════════════════
    //  REVIEW PANEL
    // ══════════════════════════════════════════
    function openReviewPanel(id, data) {
        reviewArticleId = id;

        // Meta
        const cat = CATEGORIES[data.category] || data.category;
        const bias = BIAS_LABELS[data.biasLabel] || data.biasLabel;
        const submitted = data.submittedAt ? formatDate(data.submittedAt.toDate()) : '—';

        let locHtml = '';
        if (data.location && data.location.city) {
            const city = data.location.city;
            const tehsil = data.location.tehsil ? ` ➔ ${data.location.tehsil}` : '';
            const village = data.location.village ? ` ➔ ${data.location.village}` : '';
            locHtml = `<span>📍 ${city}${tehsil}${village}</span><span>•</span>`;
        }

        $('neReviewMeta').innerHTML = `
            <span>${cat}</span>
            <span>•</span>
            <span>${bias}</span>
            <span>•</span>
            ${locHtml}
            <span>Submitted: ${submitted}</span>
            <span>•</span>
            <span>${data.wordCount || 0} words</span>
            <span>•</span>
            <span>${data.readTimeMinutes || 0} min read</span>
        `;

        // Status badge
        $('neReviewStatusBadge').innerHTML = `<span class="ne-badge ne-badge-${data.status}">${STATUS_LABELS[data.status]}</span>`;

        // Title, summary, body
        $('neReviewTitle').textContent = data.title || 'Untitled';
        $('neReviewSummary').textContent = data.summary || '';
        $('neReviewSummary').style.display = data.summary ? '' : 'none';

        // Cover
        if (data.coverImageUrl) {
            $('neReviewCoverImg').src = data.coverImageUrl;
            $('neReviewCover').style.display = '';
        } else {
            $('neReviewCover').style.display = 'none';
        }

        // Body
        $('neReviewBody').innerHTML = data.body || '<p><em>No content</em></p>';

        // Tags
        const tagsHtml = (data.tags || []).map(t => `<span class="ne-review-tag">${escapeHtml(t)}</span>`).join('');
        $('neReviewTags').innerHTML = tagsHtml;
        $('neReviewTags').style.display = tagsHtml ? '' : 'none';

        // Show/hide review actions based on status
        const canReview = (isAdmin || userRole === 'editor') && data.status === 'under_review';
        $('neReviewActions').style.display = canReview ? '' : 'none';
        $('neReviewChecklist').style.display = canReview ? '' : 'none';
        $('neReviewNoteInput').style.display = 'none';

        showView('review');
    }

    function approveArticle() {
        showConfirm(
            '✅',
            'Approve & Publish?',
            'This article will be published immediately and visible to all readers.',
            async () => {
                try {
                    await db.collection('newsArticles').doc(reviewArticleId).update({
                        status: 'published',
                        publishedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        editorId: currentUser.uid,
                        editorNote: 'Approved for publication'
                    });
                    toast('Published', 'Article has been approved and published! 🎉', 'success');
                    backToDashboard();
                } catch (err) {
                    toast('Error', err.message, 'error');
                }
            }
        );
    }

    function requestRevision() {
        pendingReviewAction = 'revision';
        $('neReviewNoteInput').style.display = '';
        $('neReviewNoteLabel').textContent = '📝 Revision Note — What needs to be changed?';
        $('neReviewNoteText').placeholder = 'Explain what the reporter needs to fix or improve...';
        $('neReviewNoteText').value = '';
        $('neReviewNoteConfirm').textContent = '📝 Send for Revision';
        $('neReviewNoteConfirm').className = 'ne-btn ne-btn-warning';
    }

    function rejectArticle() {
        pendingReviewAction = 'reject';
        $('neReviewNoteInput').style.display = '';
        $('neReviewNoteLabel').textContent = '❌ Rejection Reason — Why is this being rejected?';
        $('neReviewNoteText').placeholder = 'Explain why this article is being rejected...';
        $('neReviewNoteText').value = '';
        $('neReviewNoteConfirm').textContent = '❌ Reject Article';
        $('neReviewNoteConfirm').className = 'ne-btn ne-btn-danger';
    }

    function cancelReviewNote() {
        $('neReviewNoteInput').style.display = 'none';
        pendingReviewAction = null;
    }

    async function confirmReviewAction() {
        const note = $('neReviewNoteText').value.trim();
        if (!note) {
            toast('Required', 'Please provide a note before confirming.', 'error');
            return;
        }

        try {
            if (pendingReviewAction === 'revision') {
                await db.collection('newsArticles').doc(reviewArticleId).update({
                    status: 'needs_revision',
                    revisionNote: note,
                    editorId: currentUser.uid,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                toast('Sent', 'Revision requested. The reporter will see your feedback.', 'success');
            } else if (pendingReviewAction === 'reject') {
                await db.collection('newsArticles').doc(reviewArticleId).update({
                    status: 'rejected',
                    rejectionReason: note,
                    editorId: currentUser.uid,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                toast('Rejected', 'Article has been rejected.', 'info');
            }
            backToDashboard();
        } catch (err) {
            toast('Error', err.message, 'error');
        }
    }

    // ══════════════════════════════════════════
    //  COVER IMAGE UPLOAD
    // ══════════════════════════════════════════
    function setupCoverUpload() {
        const dropzone = $('neCoverDropzone');
        const input = $('neCoverInput');
        if (!dropzone || !input) return;

        dropzone.addEventListener('click', () => input.click());

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('ne-drag-over');
        });
        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('ne-drag-over');
        });
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('ne-drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleCoverFile(file);
            }
        });

        input.addEventListener('change', () => {
            if (input.files[0]) handleCoverFile(input.files[0]);
        });
    }

    function handleCoverFile(file) {
        if (file.size > 5 * 1024 * 1024) {
            toast('Too Large', 'Image must be under 5MB.', 'error');
            return;
        }
        coverImageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            $('neCoverPreview').src = e.target.result;
            $('neCoverPreview').style.display = '';
            $('neCoverPlaceholder').style.display = 'none';
            $('neCoverRemoveBtn').style.display = '';
        };
        reader.readAsDataURL(file);
    }

    function removeCoverImage() {
        coverImageFile = null;
        $('neCoverPreview').style.display = 'none';
        $('neCoverPlaceholder').style.display = '';
        $('neCoverRemoveBtn').style.display = 'none';
        $('neCoverInput').value = '';

        // If editing existing article, remove the cover URL
        if (currentArticleId && currentArticleData && currentArticleData.coverImageUrl) {
            db.collection('newsArticles').doc(currentArticleId).update({ coverImageUrl: null })
                .then(() => toast('Removed', 'Cover image removed.', 'info'))
                .catch(err => toast('Error', err.message, 'error'));
        }
    }

    // ══════════════════════════════════════════
    //  TAGS MANAGEMENT
    // ══════════════════════════════════════════
    function addTag(text) {
        text = text.replace(/,/g, '').trim();
        if (!text) return;
        const existing = getTags();
        if (existing.includes(text.toLowerCase())) return;
        if (existing.length >= 10) {
            toast('Max Tags', 'Maximum 10 tags allowed.', 'error');
            return;
        }
        const pills = $('neTagsPills');
        const pill = document.createElement('span');
        pill.className = 'ne-tag-pill';
        pill.innerHTML = `${escapeHtml(text)} <button type="button" class="ne-tag-remove" onclick="this.parentElement.remove()">×</button>`;
        pill.dataset.tag = text.toLowerCase();
        pills.appendChild(pill);
    }

    function getTags() {
        const pills = $('neTagsPills').querySelectorAll('.ne-tag-pill');
        return Array.from(pills).map(p => p.dataset.tag);
    }

    function clearTags() {
        $('neTagsPills').innerHTML = '';
    }

    // ══════════════════════════════════════════
    //  HELPER FUNCTIONS
    // ══════════════════════════════════════════
    function generateSlug(title) {
        return title.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
            .substring(0, 80);
    }

    function calculateReadTime(wordCount) {
        return Math.max(1, Math.ceil(wordCount / 200));
    }

    function countWords(text) {
        text = text.trim();
        if (!text) return 0;
        return text.split(/\s+/).filter(w => w.length > 0).length;
    }

    function stripHtml(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    function updateWordCount() {
        if (!quillEditor) return;
        const text = quillEditor.getText().trim();
        const wc = countWords(text);
        const rt = calculateReadTime(wc);
        $('neWordCount').textContent = `${wc} word${wc !== 1 ? 's' : ''}`;
        $('neReadTime').textContent = `${rt} min read`;
    }

    async function compressImage(file, maxWidth) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let w = img.width;
                let h = img.height;
                if (w > maxWidth) {
                    h = (h * maxWidth) / w;
                    w = maxWidth;
                }
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                canvas.toBlob((blob) => {
                    resolve(new File([blob], file.name, { type: 'image/jpeg' }));
                }, 'image/jpeg', 0.85);
            };
            img.src = URL.createObjectURL(file);
        });
    }

    async function uploadImage(file, path) {
        const ref = storage.ref(path);
        const snap = await ref.put(file);
        return await snap.ref.getDownloadURL();
    }

    function getExtension(filename) {
        const parts = filename.split('.');
        return parts.length > 1 ? parts.pop().toLowerCase() : 'jpg';
    }

    function formatDate(date) {
        const now = new Date();
        const diff = now - date;
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ══════════════════════════════════════════
    //  BREAKING NEWS MANAGER
    // ══════════════════════════════════════════
    async function loadBreakingNewsManager() {
        const container = $('neBreakingManager');
        if (!container) return;

        container.innerHTML = `
            <div style="padding: 2rem; text-align: center;">
                <div class="ne-spinner" style="margin: 0 auto 1rem;"></div>
                <p>Loading breaking news configuration...</p>
            </div>
        `;

        try {
            const doc = await db.collection('newsSettings').doc('breaking').get();
            let items = [];
            if (doc.exists) {
                items = doc.data().items || [];
            }
            // Ensure we have exactly 5 entries
            while (items.length < 5) {
                items.push({ text: '', link: '' });
            }

            let html = `
                <div style="background: var(--news-bg-surface); border: 1px solid var(--news-border); border-radius: var(--news-radius-sm); padding: 1.5rem; margin-bottom: 2rem;">
                    <h2 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--news-text-primary);">⚡ breaking news (शीर्ष समाचार बुलेटिन)</h2>
                    <p style="font-size: 0.85rem; color: var(--news-text-muted); margin-bottom: 1.5rem;">
                        यहाँ आप 5 महत्वपूर्ण खबरें लिख सकते हैं जो पाठकों को मुख्य पृष्ठ के शीर्ष पर घूमते हुए दिखाई देंगी। खाली छोड़े गए बुलेटिन नहीं दिखेंगे।
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 1.25rem;" id="neBreakingFormList">
            `;

            items.forEach((item, index) => {
                html += `
                    <div style="padding: 1rem; border-bottom: 1px solid var(--news-border); display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="font-weight: 700; font-size: 0.85rem; color: var(--news-primary-light); text-transform: uppercase;">
                            बुलेटिन #${index + 1}
                        </div>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <div style="flex: 2; min-width: 250px;">
                                <label style="font-size: 0.75rem; color: var(--news-text-muted); display: block; margin-bottom: 4px;">समाचार हेडलाइन (Headline Text)</label>
                                <input type="text" class="ne-input ne-breaking-text" value="${escapeHtml(item.text || '')}" placeholder="समाचार की संक्षिप्त हेडलाइन लिखें..." maxlength="120">
                            </div>
                            <div style="flex: 1; min-width: 150px;">
                                <label style="font-size: 0.75rem; color: var(--news-text-muted); display: block; margin-bottom: 4px;">लिंक - Article ID या URL (Optional)</label>
                                <input type="text" class="ne-input ne-breaking-link" value="${escapeHtml(item.link || '')}" placeholder="e.g. URL या Article ID">
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                    <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 1rem;">
                        <button class="ne-btn ne-btn-primary" onclick="NE.saveBreakingNews()" id="neSaveBreakingBtn">💾 Save Bulletins</button>
                    </div>
                </div>
            `;

            container.innerHTML = html;
        } catch (err) {
            console.error('Failed to load breaking news settings:', err);
            container.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--news-text-danger);">
                    <p>Failed to load breaking news config: ${err.message}</p>
                </div>
            `;
        }
    }

    async function saveBreakingNews() {
        const btn = $('neSaveBreakingBtn');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Saving...';
        }

        try {
            const textInputs = document.querySelectorAll('.ne-breaking-text');
            const linkInputs = document.querySelectorAll('.ne-breaking-link');

            const items = [];
            for (let i = 0; i < 5; i++) {
                const text = textInputs[i].value.trim();
                const link = linkInputs[i].value.trim();
                items.push({ text, link });
            }

            await db.collection('newsSettings').doc('breaking').set({
                items: items,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedBy: currentUser.email
            });

            toast('Success', 'Breaking news bulletins updated successfully!', 'success');
            loadBreakingNewsManager();
        } catch (err) {
            console.error('Failed to save breaking news settings:', err);
            toast('Error', 'Failed to save settings: ' + err.message, 'error');
            if (btn) {
                btn.disabled = false;
                btn.textContent = '💾 Save Bulletins';
            }
        }
    }

    // ══════════════════════════════════════════
    //  NAVIGATION
    // ══════════════════════════════════════════
    function backToDashboard() {
        currentArticleId = null;
        currentArticleData = null;
        reviewArticleId = null;
        pendingReviewAction = null;
        showView('dashboard');
        loadArticles();
    }

    // ══════════════════════════════════════════
    //  CONFIRM DIALOG
    // ══════════════════════════════════════════
    function showConfirm(icon, title, desc, callback) {
        $('neConfirmIcon').textContent = icon;
        $('neConfirmTitle').textContent = title;
        $('neConfirmDesc').textContent = desc;
        confirmCallback = callback;
        $('neConfirmModal').style.display = '';
    }

    function closeConfirm() {
        $('neConfirmModal').style.display = 'none';
        confirmCallback = null;
    }

    function onConfirm() {
        if (confirmCallback) {
            confirmCallback();
        }
        closeConfirm();
    }

    // ══════════════════════════════════════════
    //  TOAST NOTIFICATIONS
    // ══════════════════════════════════════════
    function toast(title, message, type = 'info') {
        const container = $('neToastContainer');
        const icons = { success: '✅', error: '❌', info: 'ℹ️' };
        const t = document.createElement('div');
        t.className = `ne-toast ne-toast-${type}`;
        t.innerHTML = `
            <span class="ne-toast-icon">${icons[type] || 'ℹ️'}</span>
            <div class="ne-toast-content">
                <div class="ne-toast-title">${escapeHtml(title)}</div>
                <div class="ne-toast-message">${escapeHtml(message)}</div>
            </div>
            <div class="ne-toast-progress"></div>
        `;
        container.appendChild(t);

        setTimeout(() => {
            t.classList.add('ne-toast-exit');
            setTimeout(() => t.remove(), 300);
        }, 4000);
    }

    // ══════════════════════════════════════════
    //  BOOT
    // ══════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', init);

    // ══════════════════════════════════════════
    //  PUBLIC API
    // ══════════════════════════════════════════
    return {
        signIn,
        newArticle,
        switchTab,
        openArticle,
        saveDraft,
        submitForReview,
        deleteDraft,
        backToDashboard,
        approveArticle,
        requestRevision,
        rejectArticle,
        cancelReviewNote,
        confirmReviewAction,
        removeCoverImage,
        closeConfirm,
        onConfirm,
        saveBreakingNews
    };
})();

// Expose NE globally to ensure inline HTML event handlers (e.g. onclick) work on all browsers, including Safari on iOS/iPadOS
window.NE = NE;

