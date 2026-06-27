/**
 * ============================================
 * BROPRO SARKARI EXAM HUB - FRONTEND LOGIC
 * Comprehensive portal for Govt Jobs, Exams & Scholarships
 * Inspired by rojgarresult.com but with premium BroPro quality
 * ============================================
 */

// API Configuration
const API_BASE = 'https://asia-south1-supersite-2dcf9.cloudfunctions.net';
const ENDPOINTS = {
    getAlerts: `${API_BASE}/getExamAlerts`,
    getStats: `${API_BASE}/getExamStats`,
    trackClick: `${API_BASE}/trackAlertClick`,
    healthCheck: `${API_BASE}/healthCheck`
};

// State
let allAlerts = [];
let currentCategory = 'all';
let currentType = 'all';
let urgentOnly = false;
let currentLanguage = 'en';

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTheme();
    loadAlerts();
    loadStats();
    updateTicker();
});

// ============================================
// BREAKING NEWS TICKER
// ============================================

function updateTicker() {
    const tickerContent = document.getElementById('tickerContent');
    if (!tickerContent) return;

    // Update ticker with urgent alerts
    const urgentAlerts = allAlerts.filter(a => a.isUrgent);
    if (urgentAlerts.length > 0) {
        const tickerText = urgentAlerts.map(a => `${a.examShortName}: ${a.title}`).join(' | ');
        tickerContent.innerHTML = `<span>${tickerText}</span>`;
    }
}

// ============================================
// PARTICLE BACKGROUND
// ============================================

function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function initParticlesArray() {
        particles = [];
        const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 20000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticlesArray();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticlesArray();
    });
}

// ============================================
// THEME TOGGLE
// ============================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('bropro-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('bropro-theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

// ============================================
// LOAD ALERTS FROM API
// ============================================

let systemStatus = null;
let autoRefreshInterval = null;

async function loadAlerts() {
    const loadingEl = document.getElementById('alertsLoading');
    const emptyEl = document.getElementById('alertsEmpty');
    const gridEl = document.getElementById('alertsGrid');

    try {
        loadingEl.style.display = 'flex';
        emptyEl.style.display = 'none';
        gridEl.innerHTML = '';

        const response = await fetch(ENDPOINTS.getAlerts);
        const data = await response.json();

        // Store system status
        if (data.lastUpdated) {
            systemStatus = {
                lastUpdated: data.lastUpdated,
                nextUpdate: data.nextUpdate,
                status: data.systemStatus
            };
            updateSystemStatusUI();
        }

        if (!data.success || !data.alerts || data.alerts.length === 0) {
            loadingEl.style.display = 'none';
            renderDemoAlerts();
            return;
        }

        allAlerts = data.alerts;
        loadingEl.style.display = 'none';
        renderAlerts(allAlerts);
        updateTicker();

        // Start auto-refresh (check every 2 minutes for new data)
        startAutoRefresh();

    } catch (error) {
        console.error('Failed to load alerts:', error);
        loadingEl.style.display = 'none';
        renderDemoAlerts();
    }
}

function updateSystemStatusUI() {
    // Update the "Last Updated" indicator if exists
    let statusEl = document.getElementById('systemStatus');

    if (!statusEl) {
        // Create status indicator
        const filterSection = document.querySelector('.filter-section .filter-container');
        if (filterSection) {
            statusEl = document.createElement('div');
            statusEl.id = 'systemStatus';
            statusEl.className = 'system-status';
            filterSection.appendChild(statusEl);
        }
    }

    if (statusEl && systemStatus) {
        const lastUpdated = new Date(systemStatus.lastUpdated);
        const now = new Date();
        const diffMinutes = Math.round((now - lastUpdated) / 60000);

        let statusText = '';
        let statusClass = 'healthy';

        if (diffMinutes < 5) {
            statusText = '🟢 Just updated';
        } else if (diffMinutes < 35) {
            statusText = `🟢 Updated ${diffMinutes}m ago`;
        } else if (diffMinutes < 60) {
            statusText = `🟡 Updated ${diffMinutes}m ago`;
            statusClass = 'warning';
        } else {
            statusText = `🔴 Updated ${Math.round(diffMinutes / 60)}h ago`;
            statusClass = 'stale';
        }

        statusEl.innerHTML = `
            <span class="status-indicator ${statusClass}"></span>
            <span class="status-text">${statusText}</span>
        `;
    }
}

function startAutoRefresh() {
    // Clear existing interval
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }

    // Check for updates every 2 minutes
    autoRefreshInterval = setInterval(async () => {
        try {
            const response = await fetch(ENDPOINTS.getAlerts + '?limit=1');
            const data = await response.json();

            if (data.lastUpdated && systemStatus?.lastUpdated !== data.lastUpdated) {
                // New data available, show notification
                showUpdateNotification();
            }
        } catch (error) {
            console.log('Auto-refresh check failed:', error);
        }
    }, 120000); // 2 minutes
}

function showUpdateNotification() {
    // Show a toast notification
    const toast = document.createElement('div');
    toast.className = 'update-toast';
    toast.innerHTML = `
        <span>🔔 New updates available!</span>
        <button onclick="location.reload()">Refresh</button>
    `;
    document.body.appendChild(toast);

    // Auto-remove after 10 seconds
    setTimeout(() => toast.remove(), 10000);
}

// ============================================
// EXPANDED DEMO ALERTS (Comprehensive Coverage)
// ============================================

function renderDemoAlerts() {
    const demoAlerts = [
        // URGENT - UPSC CSE (NOTIFICATION RELEASED)
        {
            id: 'demo-upsc',
            examName: 'UPSC Civil Services Examination',
            examShortName: 'UPSC CSE',
            icon: '🏛️',
            category: 'central',
            alertType: 'result',
            title: 'UPSC CSE 2026 Prelims Results Expected Shortly',
            summary: 'UPSC CSE 2026 Preliminary Examination results are expected to be declared shortly (projected between June 12 and June 14, 2026). Qualified candidates will appear for Mains starting August 21, 2026.',
            summaryHindi: 'UPSC CSE 2026 प्रारंभिक परीक्षा के परिणाम जल्द ही घोषित होने की उम्मीद है (12 से 14 जून 2026 के बीच अनुमानित)। मुख्य परीक्षा 21 अगस्त 2026 से शुरू होगी।',
            isUrgent: true,
            isOfficial: true,
            officialUrl: 'https://upsc.gov.in',
            createdAt: new Date().toISOString()
        },
        // JEE Main
        {
            id: 'demo-jee',
            examName: 'JEE Main 2026 Session 1',
            examShortName: 'JEE Main',
            icon: '⚙️',
            category: 'school',
            alertType: 'application',
            title: 'JEE Main 2026 Session 1 - Registration Open Now',
            summary: 'NTA has opened registrations for JEE Main 2026 Session 1. Engineering aspirants can apply before the deadline.',
            summaryHindi: 'NTA ने JEE Main 2026 सत्र 1 के लिए पंजीकरण शुरू कर दिया है। इंजीनियरिंग अभ्यर्थी अंतिम तिथि से पहले आवेदन कर सकते हैं।',
            isUrgent: true,
            deadlineDate: '2026-01-31',
            isOfficial: true,
            officialUrl: 'https://jeemain.nta.nic.in',
            createdAt: new Date().toISOString()
        },
        // SSC CGL
        {
            id: 'demo-ssc-cgl',
            examName: 'SSC CGL 2025',
            examShortName: 'SSC CGL',
            icon: '📋',
            category: 'central',
            alertType: 'admit_card',
            title: 'SSC CGL 2025 Tier-1 Admit Card Released',
            summary: 'Staff Selection Commission has released admit cards for CGL Tier-1 examination. Download from official website.',
            summaryHindi: 'कर्मचारी चयन आयोग ने CGL Tier-1 परीक्षा के एडमिट कार्ड जारी कर दिए हैं। आधिकारिक वेबसाइट से डाउनलोड करें।',
            isUrgent: false,
            isOfficial: true,
            officialUrl: 'https://ssc.gov.in',
            createdAt: new Date().toISOString()
        },
        // Railway
        {
            id: 'demo-rrb',
            examName: 'RRB NTPC 2025',
            examShortName: 'RRB NTPC',
            icon: '🚂',
            category: 'railway',
            alertType: 'result',
            title: 'RRB NTPC 2025 CBT-2 Result Declared',
            summary: 'Railway Recruitment Boards have declared NTPC CBT-2 results. Check your score and download scorecard.',
            summaryHindi: 'रेलवे भर्ती बोर्ड ने NTPC CBT-2 परिणाम घोषित कर दिए हैं। अपना स्कोर चेक करें।',
            isUrgent: false,
            isOfficial: true,
            officialUrl: 'https://rrbcdg.gov.in',
            createdAt: new Date().toISOString()
        },
        // Banking
        {
            id: 'demo-ibps',
            examName: 'IBPS PO 2025',
            examShortName: 'IBPS PO',
            icon: '🏦',
            category: 'banking',
            alertType: 'notification',
            title: 'IBPS PO 2025 Notification Expected Soon',
            summary: 'Institute of Banking Personnel Selection expected to release PO recruitment notification. Total 4000+ vacancies expected.',
            summaryHindi: 'बैंकिंग कार्मिक चयन संस्थान जल्द ही PO भर्ती अधिसूचना जारी करेगा। कुल 4000+ रिक्तियां अपेक्षित।',
            isUrgent: false,
            isOfficial: true,
            officialUrl: 'https://ibps.in',
            createdAt: new Date().toISOString()
        },
        // Defence - Agniveer
        {
            id: 'demo-agniveer',
            examName: 'Agniveer Army Recruitment',
            examShortName: 'Agniveer',
            icon: '🎖️',
            category: 'defence',
            alertType: 'application',
            title: 'Agniveer Army Rally 2026 - Registration Started',
            summary: 'Indian Army Agniveer recruitment rally for various states. Age 17.5 to 21 years. Apply online at joinindianarmy.nic.in.',
            summaryHindi: 'भारतीय सेना अग्निवीर भर्ती रैली विभिन्न राज्यों के लिए। आयु 17.5 से 21 वर्ष।',
            isUrgent: true,
            deadlineDate: '2026-02-15',
            isOfficial: true,
            officialUrl: 'https://joinindianarmy.nic.in',
            createdAt: new Date().toISOString()
        },
        // State - UP Police
        {
            id: 'demo-up-police',
            examName: 'UP Police Constable',
            examShortName: 'UP Police',
            icon: '👮',
            category: 'state',
            alertType: 'notification',
            title: 'UP Police Constable 2026 - 60,000+ Vacancies',
            summary: 'Uttar Pradesh Police Recruitment Board expected to release mega recruitment for 60,000+ constable posts.',
            summaryHindi: 'उत्तर प्रदेश पुलिस भर्ती बोर्ड 60,000+ कांस्टेबल पदों के लिए मेगा भर्ती जारी करेगा।',
            isUrgent: false,
            isOfficial: true,
            officialUrl: 'https://uppbpb.gov.in',
            createdAt: new Date().toISOString()
        },
        // Teaching
        {
            id: 'demo-ctet',
            examName: 'CTET 2026',
            examShortName: 'CTET',
            icon: '👨‍🏫',
            category: 'teaching',
            alertType: 'application',
            title: 'CTET January 2026 - Application Form Available',
            summary: 'CBSE has released CTET January 2026 application form. Last date to apply with regular fee.',
            summaryHindi: 'CBSE ने CTET जनवरी 2026 आवेदन फॉर्म जारी कर दिया है।',
            isUrgent: true,
            deadlineDate: '2026-01-20',
            isOfficial: true,
            officialUrl: 'https://ctet.nic.in',
            createdAt: new Date().toISOString()
        },
        // JNV - UPDATED: Admit Card Released
        {
            id: 'demo-jnv',
            examName: 'JNV Class 9 Lateral Entry',
            examShortName: 'JNV-9',
            icon: '🏫',
            category: 'school',
            alertType: 'admit_card',
            title: 'JNV Class 9 LEST 2026 - Admit Card Released',
            summary: 'Admit cards for Class IX LEST 2026 are now available for download. Note: Cards for West Bengal and Jharkhand will be released later.',
            summaryHindi: 'कक्षा 9 LEST 2026 के लिए प्रवेश पत्र अब डाउनलोड के लिए उपलब्ध हैं। (पश्चिम बंगाल और झारखंड के प्रवेश पत्र बाद में जारी किए जाएंगे)।',
            isUrgent: true,
            relevantDate: new Date().toISOString().split('T')[0],
            isOfficial: true,
            officialUrl: 'https://navodaya.gov.in',
            createdAt: new Date().toISOString()
        },
        // Scholarship
        {
            id: 'demo-nsp',
            examName: 'National Scholarship Portal',
            examShortName: 'NSP',
            icon: '🎓',
            category: 'scholarship',
            alertType: 'application',
            title: 'NSP 2025-26 - Fresh & Renewal Applications Open',
            summary: 'National Scholarship Portal accepting fresh and renewal applications for Pre-Matric, Post-Matric scholarships.',
            summaryHindi: 'राष्ट्रीय छात्रवृत्ति पोर्टल प्री-मैट्रिक, पोस्ट-मैट्रिक छात्रवृत्ति के लिए आवेदन स्वीकार कर रहा है।',
            isUrgent: true,
            deadlineDate: '2026-01-31',
            isOfficial: true,
            officialUrl: 'https://scholarships.gov.in',
            createdAt: new Date().toISOString()
        },
        // NEET
        {
            id: 'demo-neet',
            examName: 'NEET UG 2026',
            examShortName: 'NEET',
            icon: '🩺',
            category: 'school',
            alertType: 'exam_date',
            title: 'NEET UG 2026 Re-Examination Rescheduled to June 21, 2026',
            summary: 'NTA will conduct the NEET UG 2026 re-examination on June 21, 2026. Exam duration extended to 195 minutes (2:00 PM to 5:15 PM) with 4 rough sheets.',
            summaryHindi: 'NTA द्वारा NEET UG 2026 की पुनः परीक्षा 21 जून 2026 को आयोजित की जाएगी। परीक्षा का समय बढ़ाकर 195 मिनट (दोपहर 2:00 से शाम 5:15 बजे) कर दिया गया है।',
            isUrgent: true,
            isOfficial: true,
            officialUrl: 'https://neet.nta.nic.in',
            createdAt: new Date().toISOString()
        },
        // Sainik School
        {
            id: 'demo-aissee',
            examName: 'Sainik School AISSEE',
            examShortName: 'AISSEE',
            icon: '🎖️',
            category: 'school',
            alertType: 'result',
            title: 'AISSEE 2025 Result Declared - Check Score',
            summary: 'All India Sainik School Entrance Examination 2025 results have been declared. Check your score online.',
            summaryHindi: 'अखिल भारतीय सैनिक स्कूल प्रवेश परीक्षा 2025 के परिणाम घोषित। ऑनलाइन स्कोर चेक करें।',
            isUrgent: false,
            isOfficial: true,
            officialUrl: 'https://aissee.nta.nic.in',
            createdAt: new Date().toISOString()
        }
    ];

    allAlerts = demoAlerts;
    renderAlerts(demoAlerts);
    updateTicker();

    // Update stats with demo data
    updateStats({
        total: demoAlerts.length,
        byCategory: {
            central: 2,
            state: 1,
            defence: 1,
            banking: 1,
            railway: 1,
            teaching: 1,
            school: 4,
            scholarship: 1
        },
        urgent: demoAlerts.filter(a => a.isUrgent).length
    });
}

// ============================================
// RENDER ALERTS
// ============================================

function renderAlerts(alerts) {
    const gridEl = document.getElementById('alertsGrid');
    const emptyEl = document.getElementById('alertsEmpty');

    if (!alerts || alerts.length === 0) {
        gridEl.innerHTML = '';
        emptyEl.style.display = 'block';
        return;
    }

    emptyEl.style.display = 'none';

    gridEl.innerHTML = alerts.map(alert => createAlertCard(alert)).join('');
}

function createAlertCard(alert) {
    const alertTypeLabels = {
        notification: '📢 Notification',
        application: '✍️ Apply Now',
        admit_card: '🎫 Admit Card',
        exam_date: '📅 Exam Date',
        result: '📊 Result',
        answer_key: '🔑 Answer Key',
        counseling: '🎓 Counseling',
        correction: '✏️ Correction',
        syllabus: '📚 Syllabus'
    };

    const categoryLabels = {
        central: 'Central Govt',
        state: 'State Govt',
        defence: 'Defence',
        banking: 'Banking',
        railway: 'Railway',
        teaching: 'Teaching',
        school: 'School/College',
        scholarship: 'Scholarship',
        college: 'College',
        jobs: 'Govt Jobs'
    };

    const timeAgo = getTimeAgo(alert.createdAt);
    const urgentClass = alert.isUrgent ? 'urgent' : '';
    const categoryClass = alert.category || 'central';

    return `
        <div class="alert-card ${categoryClass} ${urgentClass}" onclick="openAlertModal('${alert.id}')">
            <div class="card-header">
                <div class="card-exam">
                    <div class="exam-icon">${alert.icon || '📋'}</div>
                    <div class="exam-info">
                        <div class="exam-name">${alert.examShortName || alert.examName}</div>
                        <div class="exam-category">${categoryLabels[alert.category] || 'Exam'}</div>
                    </div>
                </div>
                <div class="card-badges">
                    ${alert.isUrgent ? '<span class="status-badge urgent">🚨 Urgent</span>' : ''}
                    <span class="status-badge ${alert.alertType}">${alertTypeLabels[alert.alertType] || '📢 Update'}</span>
                </div>
            </div>
            <div class="card-body">
                <h3 class="alert-title">${alert.title}</h3>
                <p class="alert-summary">${currentLanguage === 'hi' && alert.summaryHindi ? alert.summaryHindi : (alert.summary || alert.title)}</p>
                <div class="card-meta">
                    <span class="meta-item">
                        <span>🕐</span>
                        <span>${timeAgo}</span>
                    </span>
                    ${alert.deadlineDate ? `<span class="meta-item deadline">
                        <span>⏰</span>
                        <span>Last Date: ${formatDate(alert.deadlineDate)}</span>
                    </span>` : ''}
                    ${alert.relevantDate ? `<span class="meta-item">
                        <span>📅</span>
                        <span>${formatDate(alert.relevantDate)}</span>
                    </span>` : ''}
                </div>
            </div>
            <div class="card-footer">
                <span class="source-info ${alert.isOfficial ? 'official' : ''}">
                    ${alert.isOfficial ? '✓ Official' : '📰 News'}
                </span>
                <div class="card-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); shareAlert('${alert.id}')" title="Share">
                        📤
                    </button>
                    <button class="action-btn primary" onclick="event.stopPropagation(); visitSource('${alert.sourceUrl || alert.officialUrl}')" title="Apply/Visit">
                        🔗
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// LOAD STATS
// ============================================

async function loadStats() {
    try {
        const response = await fetch(ENDPOINTS.getStats);
        const data = await response.json();

        if (data.success && data.stats) {
            updateStats(data.stats);
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

function updateStats(stats) {
    const totalAlertsEl = document.getElementById('totalAlerts');
    const urgentAlertsEl = document.getElementById('urgentAlerts');

    if (totalAlertsEl) totalAlertsEl.textContent = stats.total || allAlerts.length;
    if (urgentAlertsEl) urgentAlertsEl.textContent = stats.urgent || allAlerts.filter(a => a.isUrgent).length;

    // Update tab counts
    const categories = ['all', 'central', 'state', 'defence', 'banking', 'railway', 'teaching', 'school', 'scholarship'];
    categories.forEach(cat => {
        const countEl = document.getElementById(`count-${cat}`);
        if (countEl) {
            if (cat === 'all') {
                countEl.textContent = stats.total || allAlerts.length;
            } else {
                countEl.textContent = stats.byCategory?.[cat] || allAlerts.filter(a => a.category === cat).length;
            }
        }
    });
}

// ============================================
// FILTERING
// ============================================

function filterAlerts(category) {
    currentCategory = category;

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });

    // Update bottom nav
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector('.bottom-nav-item')?.classList.add('active');

    applyFilters();
}

function filterByType(type) {
    currentType = type;

    // Update dropdown
    const dropdown = document.getElementById('typeFilter');
    if (dropdown) dropdown.value = type;

    applyFilters();
}

function toggleUrgentFilter() {
    urgentOnly = !urgentOnly;
    const btn = document.getElementById('urgentFilter');
    if (btn) {
        btn.classList.toggle('active', urgentOnly);
    }
    applyFilters();
}

function applyFilters() {
    let filtered = [...allAlerts];

    // Category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(alert => alert.category === currentCategory);
    }

    // Type filter
    if (currentType !== 'all') {
        filtered = filtered.filter(alert => alert.alertType === currentType);
    }

    // Urgent filter
    if (urgentOnly) {
        filtered = filtered.filter(alert => alert.isUrgent || alert.deadlineDate);
    }

    renderAlerts(filtered);
}

// ============================================
// LANGUAGE TOGGLE
// ============================================

function setLanguage(lang) {
    currentLanguage = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    applyFilters();
}

// ============================================
// ALERT MODAL
// ============================================

function openAlertModal(alertId) {
    const alert = allAlerts.find(a => a.id === alertId);
    if (!alert) return;

    const modal = document.getElementById('alertModal');
    const header = document.getElementById('modalHeader');
    const body = document.getElementById('modalBody');
    const footer = document.getElementById('modalFooter');

    const alertTypeLabels = {
        notification: '📢 Notification',
        application: '✍️ Apply Now',
        admit_card: '🎫 Admit Card',
        exam_date: '📅 Exam Date',
        result: '📊 Result',
        answer_key: '🔑 Answer Key',
        counseling: '🎓 Counseling',
        correction: '✏️ Correction'
    };

    header.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="font-size: 3rem;">${alert.icon || '📋'}</div>
            <div>
                <h2 style="color: white; margin: 0;">${alert.examName}</h2>
                <span class="status-badge ${alert.alertType}" style="margin-top: 0.5rem; display: inline-block;">
                    ${alertTypeLabels[alert.alertType] || '📢 Update'}
                </span>
                ${alert.isUrgent ? '<span class="status-badge urgent" style="margin-left: 0.5rem;">🚨 Urgent</span>' : ''}
            </div>
        </div>
    `;

    const summary = currentLanguage === 'hi' && alert.summaryHindi ? alert.summaryHindi : (alert.summary || alert.title);

    body.innerHTML = `
        <h3 style="color: white; margin-bottom: 1rem; font-size: 1.1rem; line-height: 1.5;">${alert.title}</h3>
        <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">${summary}</p>
        
        <div style="display: grid; gap: 1rem;">
            ${alert.deadlineDate ? `
                <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: rgba(239, 68, 68, 0.1); border-radius: 12px; border: 1px solid rgba(239, 68, 68, 0.3);">
                    <span style="font-size: 1.5rem;">⏰</span>
                    <div>
                        <div style="color: #ef4444; font-weight: 600;">Last Date to Apply</div>
                        <div style="color: white;">${formatDate(alert.deadlineDate)}</div>
                    </div>
                </div>
            ` : ''}
            
            ${alert.relevantDate ? `
                <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: var(--glass-bg); border-radius: 12px; border: 1px solid var(--glass-border);">
                    <span style="font-size: 1.5rem;">📅</span>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.85rem;">Important Date</div>
                        <div style="color: white;">${formatDate(alert.relevantDate)}</div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    footer.innerHTML = `
        <a href="${alert.sourceUrl || alert.officialUrl}" target="_blank" rel="noopener" 
           style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 14px; color: white; text-decoration: none; font-weight: 600; transition: all 0.3s;"
           onmouseover="this.style.transform='translateY(-2px)'"
           onmouseout="this.style.transform='translateY(0)'">
            🔗 Visit Official Website
        </a>
        <button onclick="shareAlert('${alert.id}')" 
                style="padding: 1rem 1.5rem; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 14px; color: white; font-weight: 600; cursor: pointer; transition: all 0.3s;"
                onmouseover="this.style.background='rgba(255,255,255,0.1)'"
                onmouseout="this.style.background='var(--glass-bg)'">
            📤 Share
        </button>
    `;

    modal.classList.add('active');
    trackAlertClick(alertId);
}

function closeAlertModal() {
    const modal = document.getElementById('alertModal');
    modal.classList.remove('active');
}

document.addEventListener('click', (e) => {
    if (e.target.id === 'alertModal') {
        closeAlertModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAlertModal();
    }
});

// ============================================
// ACTIONS
// ============================================

function visitSource(url) {
    if (url) {
        window.open(url, '_blank', 'noopener');
    }
}

function shareAlert(alertId) {
    const alert = allAlerts.find(a => a.id === alertId);
    if (!alert) return;

    const shareText = `🎯 ${alert.examName}\n\n${alert.title}\n\n${alert.isUrgent ? '🚨 URGENT: Apply soon!' : ''}\n\n🔗 More alerts: https://bropro.in/exams/alerts/`;

    if (navigator.share) {
        navigator.share({
            title: alert.examName,
            text: shareText,
            url: 'https://bropro.in/exams/alerts/'
        });
    } else {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    }
}

async function trackAlertClick(alertId) {
    try {
        await fetch(ENDPOINTS.trackClick, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ alertId })
        });
    } catch (error) {
        // Silent fail
    }
}

// ============================================
// NOTIFICATIONS
// ============================================

async function enableNotifications() {
    if (!('Notification' in window)) {
        alert('Your browser does not support notifications.');
        return;
    }

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        new Notification('🎉 Notifications Enabled!', {
            body: 'You will now receive important exam updates.',
            icon: '/assets/logo-small.png'
        });

        alert('✅ You will now receive exam alerts!');
    } else {
        alert('Please enable notifications in your browser settings.');
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getTimeAgo(dateString) {
    if (!dateString) return 'Recently';

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
}

function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
}
