/**
 * ============================================
 * BROPRO SARKARI EXAM HUB - PRODUCTION SYSTEM
 * Real-time Exam Alert Intelligence Platform
 * ============================================
 * 
 * Features:
 * - 30-minute refresh cycle for all exams
 * - Smart marquee/news section targeting
 * - Change detection (no duplicate alerts)
 * - Auto-publish for verified official sources
 * - Telegram notifications for admin
 * - Health monitoring & status dashboard
 * 
 * Author: BroPro AI System
 * Version: 2.0.0 (Production)
 */

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const { onSchedule } = require("firebase-functions/scheduler");
const { onCall } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const axios = require("axios");
const cheerio = require("cheerio");
const crypto = require("crypto");

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Cost control & performance
setGlobalOptions({
    maxInstances: 10,
    region: "asia-south1",
    memory: "512MiB",
    timeoutSeconds: 120
});

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    // Scraping settings
    SCRAPE_TIMEOUT: 15000, // 15 seconds per site
    MAX_RETRIES: 2,

    // Auto-publish settings (skip manual approval for these)
    AUTO_PUBLISH_DOMAINS: [
        'navodaya.gov.in',
        'nta.nic.in',
        'upsc.gov.in',
        'ssc.gov.in',
        'ibps.in',
        'rrbcdg.gov.in',
        'joinindianarmy.nic.in',
        'scholarships.gov.in'
    ],

    // Telegram Bot (for admin notifications)
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || null,
    TELEGRAM_ADMIN_CHAT_ID: process.env.TELEGRAM_ADMIN_CHAT_ID || null,

    // User agent rotation
    USER_AGENTS: [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ]
};

// ============================================
// EXAM SOURCES - COMPREHENSIVE DATABASE
// ============================================

const EXAM_SOURCES = {
    // ============================================
    // CENTRAL GOVERNMENT
    // ============================================
    upsc: {
        name: "UPSC Civil Services",
        shortName: "UPSC CSE",
        category: "central",
        icon: "🏛️",
        officialUrl: "https://upsc.gov.in",
        scrapeUrl: "https://upsc.gov.in",
        newsSelector: "marquee, .ticker, .news-ticker, .scroll-text, .latest-news a, .notice-board a, table a[href*='.pdf']",
        searchKeywords: ["civil services", "ias", "ips", "notification", "admit card", "result", "prelims", "mains"],
        importance: "critical"
    },
    sscCgl: {
        name: "SSC CGL",
        shortName: "SSC CGL",
        category: "central",
        icon: "📋",
        officialUrl: "https://ssc.gov.in",
        scrapeUrl: "https://ssc.gov.in",
        newsSelector: "marquee, .latest-news a, .notice a, table a[href*='.pdf'], .ticker a",
        searchKeywords: ["cgl", "combined graduate", "tier", "admit card", "result", "notification"],
        importance: "high"
    },
    sscChsl: {
        name: "SSC CHSL",
        shortName: "SSC CHSL",
        category: "central",
        icon: "📋",
        officialUrl: "https://ssc.gov.in",
        scrapeUrl: "https://ssc.gov.in",
        newsSelector: "marquee, .latest-news a, .notice a, table a[href*='.pdf']",
        searchKeywords: ["chsl", "10+2", "deo", "ldc", "admit card", "result"],
        importance: "high"
    },
    sscGd: {
        name: "SSC GD Constable",
        shortName: "SSC GD",
        category: "central",
        icon: "👮",
        officialUrl: "https://ssc.gov.in",
        scrapeUrl: "https://ssc.gov.in",
        newsSelector: "marquee, .latest-news a, table a[href*='.pdf']",
        searchKeywords: ["ssc gd", "constable", "crpf", "bsf", "cisf", "admit card", "result"],
        importance: "high"
    },

    // ============================================
    // STATE GOVERNMENT  
    // ============================================
    uppsc: {
        name: "UPPSC PCS",
        shortName: "UPPSC",
        category: "state",
        icon: "🗺️",
        officialUrl: "https://uppsc.up.nic.in",
        scrapeUrl: "https://uppsc.up.nic.in",
        newsSelector: "marquee, .news a, .notice a, table a",
        searchKeywords: ["uppsc", "pcs", "ro", "aro", "admit card", "result"],
        importance: "high"
    },
    bpsc: {
        name: "BPSC",
        shortName: "BPSC",
        category: "state",
        icon: "🗺️",
        officialUrl: "https://bpsc.bih.nic.in",
        scrapeUrl: "https://bpsc.bih.nic.in",
        newsSelector: "marquee, .latest a, .news a, table a",
        searchKeywords: ["bpsc", "bihar", "pcs", "teacher", "admit card", "result"],
        importance: "high"
    },
    upPolice: {
        name: "UP Police",
        shortName: "UP Police",
        category: "state",
        icon: "👮",
        officialUrl: "https://uppbpb.gov.in",
        scrapeUrl: "https://uppbpb.gov.in",
        newsSelector: "marquee, .news a, .notice a, table a",
        searchKeywords: ["up police", "constable", "si", "admit card", "result", "physical"],
        importance: "high"
    },

    // ============================================
    // DEFENCE
    // ============================================
    agniveer: {
        name: "Agniveer Army",
        shortName: "Agniveer",
        category: "defence",
        icon: "🎖️",
        officialUrl: "https://joinindianarmy.nic.in",
        scrapeUrl: "https://joinindianarmy.nic.in",
        newsSelector: "marquee, .news a, .notice a, .rally-info a, table a",
        searchKeywords: ["agniveer", "army", "rally", "admit card", "result", "medical"],
        importance: "critical"
    },
    nda: {
        name: "NDA Exam",
        shortName: "NDA",
        category: "defence",
        icon: "🎖️",
        officialUrl: "https://upsc.gov.in",
        scrapeUrl: "https://upsc.gov.in",
        newsSelector: "marquee, .latest-news a, table a[href*='.pdf']",
        searchKeywords: ["nda", "naval academy", "defence academy", "admit card", "result"],
        importance: "high"
    },
    cds: {
        name: "CDS Exam",
        shortName: "CDS",
        category: "defence",
        icon: "🎖️",
        officialUrl: "https://upsc.gov.in",
        scrapeUrl: "https://upsc.gov.in",
        newsSelector: "marquee, .latest-news a, table a[href*='.pdf']",
        searchKeywords: ["cds", "combined defence", "ota", "ima", "admit card", "result"],
        importance: "high"
    },

    // ============================================
    // BANKING
    // ============================================
    ibpsPo: {
        name: "IBPS PO",
        shortName: "IBPS PO",
        category: "banking",
        icon: "🏦",
        officialUrl: "https://ibps.in",
        scrapeUrl: "https://ibps.in",
        newsSelector: "marquee, .news a, .notice a, .important a, table a",
        searchKeywords: ["ibps po", "probationary officer", "prelims", "mains", "admit card", "result"],
        importance: "critical"
    },
    ibpsClerk: {
        name: "IBPS Clerk",
        shortName: "IBPS Clerk",
        category: "banking",
        icon: "🏦",
        officialUrl: "https://ibps.in",
        scrapeUrl: "https://ibps.in",
        newsSelector: "marquee, .news a, .notice a, table a",
        searchKeywords: ["ibps clerk", "crp clerk", "prelims", "mains", "admit card", "result"],
        importance: "high"
    },
    sbiPo: {
        name: "SBI PO",
        shortName: "SBI PO",
        category: "banking",
        icon: "🏦",
        officialUrl: "https://sbi.co.in/careers",
        scrapeUrl: "https://sbi.co.in/web/careers/current-openings",
        newsSelector: ".news a, .notice a, table a, .career-item a",
        searchKeywords: ["sbi po", "probationary", "junior associate", "admit card", "result"],
        importance: "critical"
    },
    rbiGradeB: {
        name: "RBI Grade B",
        shortName: "RBI",
        category: "banking",
        icon: "🏦",
        officialUrl: "https://rbi.org.in",
        scrapeUrl: "https://opportunities.rbi.org.in",
        newsSelector: ".news a, .notice a, table a",
        searchKeywords: ["rbi", "grade b", "officer", "admit card", "result"],
        importance: "high"
    },

    // ============================================
    // RAILWAY
    // ============================================
    rrbNtpc: {
        name: "RRB NTPC",
        shortName: "RRB NTPC",
        category: "railway",
        icon: "🚂",
        officialUrl: "https://www.rrbcdg.gov.in",
        scrapeUrl: "https://www.rrbcdg.gov.in",
        newsSelector: "marquee, .news a, .notice a, table a, .latest a",
        searchKeywords: ["rrb ntpc", "non technical", "cbt", "admit card", "result"],
        importance: "critical"
    },
    rrbGroupD: {
        name: "RRB Group D",
        shortName: "RRB Group D",
        category: "railway",
        icon: "🚂",
        officialUrl: "https://www.rrbcdg.gov.in",
        scrapeUrl: "https://www.rrbcdg.gov.in",
        newsSelector: "marquee, .news a, .notice a, table a",
        searchKeywords: ["rrb group d", "level 1", "admit card", "result", "cbt"],
        importance: "high"
    },
    rrbJe: {
        name: "RRB JE",
        shortName: "RRB JE",
        category: "railway",
        icon: "🚂",
        officialUrl: "https://www.rrbcdg.gov.in",
        scrapeUrl: "https://www.rrbcdg.gov.in",
        newsSelector: "marquee, .news a, .notice a, table a",
        searchKeywords: ["rrb je", "junior engineer", "admit card", "result"],
        importance: "high"
    },

    // ============================================
    // TEACHING
    // ============================================
    ctet: {
        name: "CTET",
        shortName: "CTET",
        category: "teaching",
        icon: "👨‍🏫",
        officialUrl: "https://ctet.nic.in",
        scrapeUrl: "https://ctet.nic.in",
        newsSelector: "marquee, .news a, .notice a, .latest a, table a",
        searchKeywords: ["ctet", "central teacher", "paper 1", "paper 2", "admit card", "result"],
        importance: "critical"
    },
    uptet: {
        name: "UPTET",
        shortName: "UPTET",
        category: "teaching",
        icon: "👨‍🏫",
        officialUrl: "https://updeled.gov.in",
        scrapeUrl: "https://updeled.gov.in",
        newsSelector: "marquee, .news a, .notice a, table a",
        searchKeywords: ["uptet", "up tet", "teacher eligibility", "admit card", "result"],
        importance: "high"
    },
    superTet: {
        name: "Super TET",
        shortName: "Super TET",
        category: "teaching",
        icon: "👨‍🏫",
        officialUrl: "https://updeled.gov.in",
        scrapeUrl: "https://updeled.gov.in",
        newsSelector: "marquee, .news a, .notice a, table a",
        searchKeywords: ["super tet", "assistant teacher", "admit card", "result"],
        importance: "high"
    },
    ugcNet: {
        name: "UGC NET",
        shortName: "UGC NET",
        category: "teaching",
        icon: "🎓",
        officialUrl: "https://ugcnet.nta.nic.in",
        scrapeUrl: "https://ugcnet.nta.nic.in",
        newsSelector: "marquee, .news a, .notice a, .latest a, table a",
        searchKeywords: ["ugc net", "jrf", "assistant professor", "admit card", "result"],
        importance: "high"
    },

    // ============================================
    // SCHOOL & COLLEGE ENTRANCE
    // ============================================
    jnvClass6: {
        name: "JNV Class 6",
        shortName: "JNV-6",
        category: "school",
        icon: "🏫",
        officialUrl: "https://navodaya.gov.in",
        scrapeUrl: "https://navodaya.gov.in",
        newsSelector: "marquee, .scrolling-text, .news-ticker, .latest-news a, .red-text, a[style*='color:red'], a[style*='color: red'], font[color='red'] a, .notice a, table a",
        searchKeywords: ["class vi", "class 6", "jnvst", "admission", "admit card", "result"],
        importance: "high"
    },
    jnvClass9: {
        name: "JNV Class 9 Lateral Entry",
        shortName: "JNV-9",
        category: "school",
        icon: "🏫",
        officialUrl: "https://navodaya.gov.in",
        scrapeUrl: "https://navodaya.gov.in",
        newsSelector: "marquee, .scrolling-text, .news-ticker, .latest-news a, .red-text, a[style*='color:red'], a[style*='color: red'], font[color='red'] a, .notice a, table a",
        searchKeywords: ["class ix", "class 9", "lateral entry", "lest", "admit card", "result"],
        importance: "high"
    },
    sainikSchool: {
        name: "Sainik School AISSEE",
        shortName: "AISSEE",
        category: "school",
        icon: "🎖️",
        officialUrl: "https://aissee.nta.nic.in",
        scrapeUrl: "https://aissee.nta.nic.in",
        newsSelector: "marquee, .news a, .notice a, .latest a, table a",
        searchKeywords: ["aissee", "sainik school", "class 6", "class 9", "admit card", "result"],
        importance: "high"
    },
    jeeMain: {
        name: "JEE Main",
        shortName: "JEE Main",
        category: "school",
        icon: "⚙️",
        officialUrl: "https://jeemain.nta.nic.in",
        scrapeUrl: "https://jeemain.nta.nic.in",
        newsSelector: "marquee, .news a, .notice a, .latest a, .ticker a, table a",
        searchKeywords: ["jee main", "session", "registration", "admit card", "result", "answer key"],
        importance: "critical"
    },
    neet: {
        name: "NEET UG",
        shortName: "NEET",
        category: "school",
        icon: "🩺",
        officialUrl: "https://neet.nta.nic.in",
        scrapeUrl: "https://neet.nta.nic.in",
        newsSelector: "marquee, .news a, .notice a, .latest a, table a",
        searchKeywords: ["neet ug", "medical", "registration", "admit card", "result", "answer key"],
        importance: "critical"
    },
    cuet: {
        name: "CUET UG",
        shortName: "CUET",
        category: "school",
        icon: "🎓",
        officialUrl: "https://cuet.samarth.ac.in",
        scrapeUrl: "https://cuet.samarth.ac.in",
        newsSelector: "marquee, .news a, .notice a, .latest a, table a",
        searchKeywords: ["cuet", "central universities", "registration", "admit card", "result"],
        importance: "high"
    },

    // ============================================
    // SCHOLARSHIPS
    // ============================================
    nsp: {
        name: "National Scholarship Portal",
        shortName: "NSP",
        category: "scholarship",
        icon: "🎓",
        officialUrl: "https://scholarships.gov.in",
        scrapeUrl: "https://scholarships.gov.in",
        newsSelector: "marquee, .news a, .notice a, .latest a, .ticker a",
        searchKeywords: ["nsp", "national scholarship", "pre-matric", "post-matric", "fresh", "renewal"],
        importance: "high"
    },
    upScholarship: {
        name: "UP Scholarship",
        shortName: "UP Scholarship",
        category: "scholarship",
        icon: "🎓",
        officialUrl: "https://scholarship.up.gov.in",
        scrapeUrl: "https://scholarship.up.gov.in",
        newsSelector: "marquee, .news a, .notice a, table a",
        searchKeywords: ["up scholarship", "pre matric", "post matric", "fresh", "renewal"],
        importance: "high"
    },
    ntse: {
        name: "NTSE",
        shortName: "NTSE",
        category: "scholarship",
        icon: "🏆",
        officialUrl: "https://ncert.nic.in",
        scrapeUrl: "https://ncert.nic.in/national-talent-examination.php",
        newsSelector: "marquee, .news a, .notice a, table a, p a",
        searchKeywords: ["ntse", "national talent", "scholarship", "admit card", "result"],
        importance: "high"
    }
};

// Alert types with icons
const ALERT_TYPES = {
    notification: { label: "📢 Notification", priority: 1 },
    application: { label: "✍️ Apply Now", priority: 2 },
    admit_card: { label: "🎫 Admit Card", priority: 3 },
    exam_date: { label: "📅 Exam Date", priority: 4 },
    answer_key: { label: "🔑 Answer Key", priority: 5 },
    result: { label: "📊 Result", priority: 6 },
    counseling: { label: "🎓 Counseling", priority: 7 },
    correction: { label: "✏️ Correction", priority: 8 }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get random user agent for requests
 */
function getRandomUserAgent() {
    return CONFIG.USER_AGENTS[Math.floor(Math.random() * CONFIG.USER_AGENTS.length)];
}

/**
 * Generate content hash for change detection
 */
function generateContentHash(content) {
    return crypto.createHash('md5').update(content.toLowerCase().trim()).digest('hex');
}

/**
 * Check if domain is auto-publishable
 */
function isAutoPublishDomain(url) {
    return CONFIG.AUTO_PUBLISH_DOMAINS.some(domain => url.includes(domain));
}

/**
 * Detect alert type from text content
 */
function detectAlertType(text) {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('admit card') || lowerText.includes('hall ticket') || lowerText.includes('call letter')) {
        return 'admit_card';
    }
    if (lowerText.includes('result') || lowerText.includes('score') || lowerText.includes('merit')) {
        return 'result';
    }
    if (lowerText.includes('answer key') || lowerText.includes('objection')) {
        return 'answer_key';
    }
    if (lowerText.includes('apply') || lowerText.includes('registration') || lowerText.includes('application')) {
        return 'application';
    }
    if (lowerText.includes('exam date') || lowerText.includes('schedule') || lowerText.includes('time table')) {
        return 'exam_date';
    }
    if (lowerText.includes('counseling') || lowerText.includes('counselling') || lowerText.includes('allotment')) {
        return 'counseling';
    }
    if (lowerText.includes('correction') || lowerText.includes('edit') || lowerText.includes('modify')) {
        return 'correction';
    }

    return 'notification';
}

/**
 * Check if text is relevant to exam
 */
function isRelevantToExam(text, examConfig) {
    const lowerText = text.toLowerCase();
    return examConfig.searchKeywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

/**
 * Extract date from text
 */
function extractDateFromText(text) {
    // Common date patterns
    const patterns = [
        /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/,  // DD/MM/YYYY or DD-MM-YYYY
        /(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})/i,  // DD Month YYYY
        /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{1,2}),?\s+(\d{4})/i  // Month DD, YYYY
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
            try {
                // Try to parse the date
                const dateStr = match[0];
                const date = new Date(dateStr);
                if (!isNaN(date.getTime())) {
                    return date.toISOString().split('T')[0];
                }
            } catch (e) {
                continue;
            }
        }
    }

    return null;
}

/**
 * Send Telegram notification to admin
 */
async function notifyAdmin(message) {
    if (!CONFIG.TELEGRAM_BOT_TOKEN || !CONFIG.TELEGRAM_ADMIN_CHAT_ID) {
        logger.info('Telegram not configured, skipping notification');
        return;
    }

    try {
        await axios.post(`https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: CONFIG.TELEGRAM_ADMIN_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        logger.info('Telegram notification sent');
    } catch (error) {
        logger.error('Failed to send Telegram notification:', error.message);
    }
}

/**
 * Process text with AI for better extraction (optional)
 */
async function processWithAI(text, examConfig) {
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
        // Fallback to rule-based extraction
        return {
            alertType: detectAlertType(text),
            summary: text.substring(0, 200),
            summaryHindi: null,
            relevantDate: extractDateFromText(text),
            confidence: 0.7
        };
    }

    try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
Analyze this exam notification text and extract structured data:
"${text}"

For exam: ${examConfig.name}

Return ONLY valid JSON (no markdown, no explanation):
{
    "alertType": "notification|application|admit_card|exam_date|result|answer_key|counseling|correction",
    "summary": "Concise 1-line summary in English (max 150 chars)",
    "summaryHindi": "Same summary in Hindi",
    "relevantDate": "YYYY-MM-DD or null",
    "deadlineDate": "YYYY-MM-DD or null",
    "isUrgent": true/false,
    "confidence": 0.0-1.0
}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
    } catch (error) {
        logger.error('AI processing failed:', error.message);
    }

    // Fallback
    return {
        alertType: detectAlertType(text),
        summary: text.substring(0, 200),
        summaryHindi: null,
        relevantDate: extractDateFromText(text),
        confidence: 0.5
    };
}

// ============================================
// SCRAPING FUNCTIONS
// ============================================

/**
 * Scrape a single exam source
 */
async function scrapeExamSource(examKey, examConfig) {
    const results = [];

    try {
        logger.info(`Scraping ${examConfig.shortName} from ${examConfig.scrapeUrl}`);

        const response = await axios.get(examConfig.scrapeUrl, {
            timeout: CONFIG.SCRAPE_TIMEOUT,
            headers: {
                'User-Agent': getRandomUserAgent(),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive'
            },
            maxRedirects: 5
        });

        const $ = cheerio.load(response.data);
        const newsItems = new Set(); // Avoid duplicates

        // Extract text from news selectors
        $(examConfig.newsSelector).each((i, el) => {
            let text = $(el).text().trim();
            const href = $(el).attr('href') || '';

            // Skip empty or very short text
            if (text.length < 10) return;

            // Skip navigation links
            if (['home', 'about', 'contact', 'login', 'register'].some(w => text.toLowerCase() === w)) return;

            // Check if relevant to this exam
            if (isRelevantToExam(text, examConfig) || isRelevantToExam(href, examConfig)) {
                newsItems.add(text);
            }
        });

        // Also check for any red/highlighted text (common for important notices)
        $('font[color="red"], font[color="#ff0000"], .red, .highlight, .important, .new, .blink').each((i, el) => {
            const text = $(el).text().trim();
            if (text.length >= 10 && isRelevantToExam(text, examConfig)) {
                newsItems.add(text);
            }
        });

        // Process each unique news item
        for (const text of newsItems) {
            const contentHash = generateContentHash(text);

            // Check if this exact content already exists
            const existingDoc = await db.collection('examAlerts')
                .where('contentHash', '==', contentHash)
                .limit(1)
                .get();

            if (!existingDoc.empty) {
                logger.info(`Skipping duplicate: ${text.substring(0, 50)}...`);
                continue;
            }

            // Process with AI or rules
            const processed = await processWithAI(text, examConfig);

            // Create alert object
            const alert = {
                examKey,
                examName: examConfig.name,
                examShortName: examConfig.shortName,
                icon: examConfig.icon,
                category: examConfig.category,
                alertType: processed.alertType,
                title: text.substring(0, 200),
                summary: processed.summary || text.substring(0, 200),
                summaryHindi: processed.summaryHindi,
                isUrgent: processed.isUrgent || processed.alertType === 'admit_card' || processed.alertType === 'result',
                relevantDate: processed.relevantDate,
                deadlineDate: processed.deadlineDate,
                isOfficial: true,
                officialUrl: examConfig.officialUrl,
                sourceUrl: examConfig.scrapeUrl,
                contentHash,
                confidence: processed.confidence || 0.7,
                status: isAutoPublishDomain(examConfig.scrapeUrl) ? 'approved' : 'pending',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                scrapedAt: admin.firestore.FieldValue.serverTimestamp(),
                views: 0,
                clicks: 0
            };

            results.push(alert);
        }

    } catch (error) {
        logger.error(`Failed to scrape ${examConfig.shortName}:`, error.message);
    }

    return results;
}

/**
 * Scrape Google News RSS for exam updates
 */
async function scrapeGoogleNews(examKey, examConfig) {
    const results = [];

    try {
        const searchQuery = encodeURIComponent(
            `${examConfig.searchKeywords.slice(0, 3).join(' OR ')} exam 2025 2026`
        );
        const rssUrl = `https://news.google.com/rss/search?q=${searchQuery}&hl=en-IN&gl=IN&ceid=IN:en`;

        const response = await axios.get(rssUrl, {
            timeout: 10000,
            headers: { 'User-Agent': getRandomUserAgent() }
        });

        const $ = cheerio.load(response.data, { xmlMode: true });

        $('item').slice(0, 5).each((i, el) => {
            const title = $(el).find('title').text();
            const pubDate = $(el).find('pubDate').text();
            const link = $(el).find('link').text();

            if (isRelevantToExam(title, examConfig)) {
                const contentHash = generateContentHash(title);

                results.push({
                    examKey,
                    examName: examConfig.name,
                    examShortName: examConfig.shortName,
                    icon: examConfig.icon,
                    category: examConfig.category,
                    alertType: detectAlertType(title),
                    title: title.substring(0, 200),
                    summary: title,
                    isUrgent: false,
                    isOfficial: false,
                    sourceUrl: link,
                    officialUrl: examConfig.officialUrl,
                    contentHash,
                    confidence: 0.5,
                    status: 'pending', // News items always need approval
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    scrapedAt: admin.firestore.FieldValue.serverTimestamp(),
                    views: 0,
                    clicks: 0
                });
            }
        });

    } catch (error) {
        logger.error(`Google News scrape failed for ${examConfig.shortName}:`, error.message);
    }

    return results;
}

// ============================================
// SCHEDULED FUNCTIONS
// ============================================

/**
 * Main scraper - runs every 30 minutes
 */
exports.fetchExamUpdates = onSchedule(
    {
        schedule: "every 30 minutes",
        timeZone: "Asia/Kolkata",
        memory: "1GiB",
        timeoutSeconds: 540 // 9 minutes max
    },
    async (event) => {
        logger.info("🚀 Starting 30-minute exam update fetch...");

        const startTime = Date.now();
        const stats = {
            examined: 0,
            newAlerts: 0,
            duplicates: 0,
            errors: 0,
            sources: []
        };

        // Shuffle exam sources for fairness
        const examKeys = Object.keys(EXAM_SOURCES).sort(() => Math.random() - 0.5);

        for (const examKey of examKeys) {
            const examConfig = EXAM_SOURCES[examKey];
            stats.examined++;

            try {
                // Scrape official website
                const officialAlerts = await scrapeExamSource(examKey, examConfig);

                // Also check Google News for extra coverage
                const newsAlerts = await scrapeGoogleNews(examKey, examConfig);

                const allAlerts = [...officialAlerts, ...newsAlerts];

                // Save new alerts
                for (const alert of allAlerts) {
                    try {
                        // Final duplicate check
                        const existing = await db.collection('examAlerts')
                            .where('contentHash', '==', alert.contentHash)
                            .limit(1)
                            .get();

                        if (existing.empty) {
                            await db.collection('examAlerts').add(alert);
                            stats.newAlerts++;

                            // Notify admin for important alerts
                            if (alert.isUrgent && alert.status === 'approved') {
                                await notifyAdmin(
                                    `🚨 <b>NEW ALERT</b>\n\n` +
                                    `📋 ${alert.examShortName}\n` +
                                    `📢 ${alert.title}\n\n` +
                                    `🔗 ${alert.officialUrl}`
                                );
                            }
                        } else {
                            stats.duplicates++;
                        }
                    } catch (saveError) {
                        logger.error(`Failed to save alert:`, saveError.message);
                        stats.errors++;
                    }
                }

                stats.sources.push({
                    exam: examConfig.shortName,
                    found: allAlerts.length,
                    status: 'success'
                });

            } catch (examError) {
                logger.error(`Failed to process ${examConfig.shortName}:`, examError.message);
                stats.errors++;
                stats.sources.push({
                    exam: examConfig.shortName,
                    found: 0,
                    status: 'error',
                    error: examError.message
                });
            }

            // Small delay between sources to be respectful
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        const duration = Math.round((Date.now() - startTime) / 1000);

        // Save run log
        await db.collection('systemLogs').add({
            type: 'scraper_run',
            stats,
            duration,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        // Update last run time
        await db.collection('systemStatus').doc('scraper').set({
            lastRun: admin.firestore.FieldValue.serverTimestamp(),
            nextRun: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
            stats,
            duration,
            status: stats.errors === 0 ? 'healthy' : 'degraded'
        }, { merge: true });

        logger.info(`✅ Scraper complete: ${stats.newAlerts} new alerts, ${stats.duplicates} duplicates, ${stats.errors} errors in ${duration}s`);
    }
);

// ============================================
// API ENDPOINTS
// ============================================

/**
 * Get approved exam alerts (public API)
 */
exports.getExamAlerts = onRequest(
    { cors: true, region: "asia-south1" },
    async (req, res) => {
        try {
            const { category, type, urgent, limit: limitParam } = req.query;
            const limitVal = Math.min(parseInt(limitParam) || 50, 100);

            let query = db.collection('examAlerts')
                .where('status', '==', 'approved')
                .orderBy('createdAt', 'desc');

            if (category && category !== 'all') {
                query = query.where('category', '==', category);
            }

            if (urgent === 'true') {
                query = query.where('isUrgent', '==', true);
            }

            const snapshot = await query.limit(limitVal).get();

            let alerts = [];
            snapshot.forEach(doc => {
                const data = doc.data();

                // Filter by type if specified
                if (type && type !== 'all' && data.alertType !== type) {
                    return;
                }

                alerts.push({
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
                });
            });

            // Get system status
            const statusDoc = await db.collection('systemStatus').doc('scraper').get();
            const systemStatus = statusDoc.exists ? statusDoc.data() : null;

            res.set('Access-Control-Allow-Origin', '*');
            res.set('Cache-Control', 'public, max-age=60'); // Cache for 1 minute

            res.json({
                success: true,
                count: alerts.length,
                alerts,
                lastUpdated: systemStatus?.lastRun?.toDate?.()?.toISOString() || null,
                nextUpdate: systemStatus?.nextRun || null,
                systemStatus: systemStatus?.status || 'unknown'
            });

        } catch (error) {
            logger.error('getExamAlerts error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
);

/**
 * Get system stats
 */
exports.getExamStats = onRequest(
    { cors: true, region: "asia-south1" },
    async (req, res) => {
        try {
            // Get counts by category
            const approvedSnapshot = await db.collection('examAlerts')
                .where('status', '==', 'approved')
                .get();

            const stats = {
                total: approvedSnapshot.size,
                byCategory: {},
                byType: {},
                urgent: 0,
                examsTracked: Object.keys(EXAM_SOURCES).length
            };

            approvedSnapshot.forEach(doc => {
                const data = doc.data();

                // Count by category
                stats.byCategory[data.category] = (stats.byCategory[data.category] || 0) + 1;

                // Count by type
                stats.byType[data.alertType] = (stats.byType[data.alertType] || 0) + 1;

                // Count urgent
                if (data.isUrgent) stats.urgent++;
            });

            // Get system status
            const statusDoc = await db.collection('systemStatus').doc('scraper').get();
            const systemStatus = statusDoc.exists ? statusDoc.data() : null;

            res.set('Access-Control-Allow-Origin', '*');
            res.set('Cache-Control', 'public, max-age=60');

            res.json({
                success: true,
                stats,
                lastUpdated: systemStatus?.lastRun?.toDate?.()?.toISOString() || null,
                systemStatus: systemStatus?.status || 'unknown'
            });

        } catch (error) {
            logger.error('getExamStats error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
);

/**
 * Track alert click
 */
exports.trackAlertClick = onRequest(
    { cors: true, region: "asia-south1" },
    async (req, res) => {
        try {
            const { alertId } = req.body;

            if (alertId) {
                await db.collection('examAlerts').doc(alertId).update({
                    clicks: admin.firestore.FieldValue.increment(1)
                });
            }

            res.json({ success: true });
        } catch (error) {
            res.json({ success: false });
        }
    }
);

/**
 * Get pending alerts (admin only)
 */
exports.getPendingAlerts = onCall(
    { cors: true, region: "asia-south1" },
    async (request) => {
        try {
            const snapshot = await db.collection('examAlerts')
                .where('status', '==', 'pending')
                .orderBy('createdAt', 'desc')
                .limit(50)
                .get();

            const alerts = [];
            snapshot.forEach(doc => {
                alerts.push({ id: doc.id, ...doc.data() });
            });

            return { success: true, alerts };
        } catch (error) {
            logger.error('getPendingAlerts error:', error);
            return { success: false, error: error.message };
        }
    }
);

/**
 * Moderate alert (approve/reject)
 */
exports.moderateAlert = onCall(
    { cors: true, region: "asia-south1" },
    async (request) => {
        try {
            const { alertId, action, updatedData } = request.data;

            if (!alertId || !['approve', 'reject', 'delete'].includes(action)) {
                return { success: false, error: 'Invalid parameters' };
            }

            const alertRef = db.collection('examAlerts').doc(alertId);

            if (action === 'delete') {
                await alertRef.delete();
            } else if (action === 'approve') {
                await alertRef.update({
                    status: 'approved',
                    moderatedAt: admin.firestore.FieldValue.serverTimestamp(),
                    ...(updatedData || {})
                });
            } else if (action === 'reject') {
                await alertRef.update({
                    status: 'rejected',
                    moderatedAt: admin.firestore.FieldValue.serverTimestamp()
                });
            }

            return { success: true };
        } catch (error) {
            logger.error('moderateAlert error:', error);
            return { success: false, error: error.message };
        }
    }
);

/**
 * Add manual alert (admin quick add)
 */
exports.addManualAlert = onCall(
    { cors: true, region: "asia-south1" },
    async (request) => {
        try {
            const alertData = request.data;

            if (!alertData.examName || !alertData.title) {
                return { success: false, error: 'Missing required fields' };
            }

            const alert = {
                ...alertData,
                isOfficial: true,
                isManual: true,
                status: 'approved',
                contentHash: generateContentHash(alertData.title),
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                views: 0,
                clicks: 0
            };

            const docRef = await db.collection('examAlerts').add(alert);

            // Notify via Telegram
            await notifyAdmin(
                `📢 <b>MANUAL ALERT ADDED</b>\n\n` +
                `📋 ${alert.examShortName || alert.examName}\n` +
                `📢 ${alert.title}\n\n` +
                `Added by admin`
            );

            return { success: true, alertId: docRef.id };
        } catch (error) {
            logger.error('addManualAlert error:', error);
            return { success: false, error: error.message };
        }
    }
);

/**
 * Trigger manual fetch (admin)
 */
exports.triggerExamFetch = onCall(
    { cors: true, region: "asia-south1" },
    async (request) => {
        try {
            const { examKey } = request.data;

            if (examKey && EXAM_SOURCES[examKey]) {
                // Fetch single exam
                const results = await scrapeExamSource(examKey, EXAM_SOURCES[examKey]);

                let saved = 0;
                for (const alert of results) {
                    const existing = await db.collection('examAlerts')
                        .where('contentHash', '==', alert.contentHash)
                        .limit(1)
                        .get();

                    if (existing.empty) {
                        await db.collection('examAlerts').add(alert);
                        saved++;
                    }
                }

                return { success: true, found: results.length, saved };
            }

            return { success: false, error: 'Invalid exam key' };
        } catch (error) {
            logger.error('triggerExamFetch error:', error);
            return { success: false, error: error.message };
        }
    }
);

/**
 * Health check endpoint
 */
exports.healthCheck = onRequest(
    { cors: true, region: "asia-south1" },
    async (req, res) => {
        try {
            const statusDoc = await db.collection('systemStatus').doc('scraper').get();
            const status = statusDoc.exists ? statusDoc.data() : null;

            res.json({
                success: true,
                status: 'operational',
                version: '2.0.0',
                examsTracked: Object.keys(EXAM_SOURCES).length,
                lastRun: status?.lastRun?.toDate?.()?.toISOString() || null,
                nextRun: status?.nextRun || null,
                scraperStatus: status?.status || 'unknown',
                features: {
                    autoRefresh: '30 minutes',
                    aiProcessing: !!process.env.GEMINI_API_KEY,
                    telegramNotifications: !!(CONFIG.TELEGRAM_BOT_TOKEN && CONFIG.TELEGRAM_ADMIN_CHAT_ID),
                    autoPublish: CONFIG.AUTO_PUBLISH_DOMAINS.length + ' domains'
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
);
