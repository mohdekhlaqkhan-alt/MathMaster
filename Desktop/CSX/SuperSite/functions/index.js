/**
 * ============================================
 * BROPRO EXAM ALERT SYSTEM
 * AI-Powered Competitive Exam Intelligence
 * ============================================
 * 
 * This system monitors official government websites for exam updates
 * and uses AI to extract structured data from notifications.
 * 
 * Architecture:
 * 1. Scheduled Scrapers → Fetch data from official sites
 * 2. AI Processor → Extract structured info using Gemini
 * 3. Admin Approval → Human review before publishing
 * 4. Public API → Serve approved alerts to website
 */

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const { onSchedule } = require("firebase-functions/scheduler");
const { onCall } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const axios = require("axios");
const cheerio = require("cheerio");

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Cost control - limit concurrent instances
setGlobalOptions({ maxInstances: 10, region: "asia-south1" });

// ============================================
// CONFIGURATION
// ============================================

// List of exams we monitor with their official sources
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
        searchKeywords: ["Civil Services", "IAS", "IPS", "UPSC", "Prelims", "Mains"],
        importance: "critical"
    },
    sscCgl: {
        name: "SSC CGL",
        shortName: "SSC CGL",
        category: "central",
        icon: "📋",
        officialUrl: "https://ssc.gov.in",
        searchKeywords: ["CGL", "Combined Graduate", "SSC CGL"],
        importance: "high"
    },
    sscChsl: {
        name: "SSC CHSL",
        shortName: "SSC CHSL",
        category: "central",
        icon: "📋",
        officialUrl: "https://ssc.gov.in",
        searchKeywords: ["CHSL", "10+2", "SSC CHSL", "DEO", "LDC"],
        importance: "high"
    },
    sscGd: {
        name: "SSC GD Constable",
        shortName: "SSC GD",
        category: "central",
        icon: "👮",
        officialUrl: "https://ssc.gov.in",
        searchKeywords: ["SSC GD", "Constable", "CRPF", "BSF", "CISF"],
        importance: "high"
    },
    sscMts: {
        name: "SSC MTS",
        shortName: "SSC MTS",
        category: "central",
        icon: "📋",
        officialUrl: "https://ssc.gov.in",
        searchKeywords: ["MTS", "Multi Tasking Staff", "SSC MTS"],
        importance: "medium"
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
        searchKeywords: ["UPPSC", "UP PCS", "Uttar Pradesh"],
        importance: "high"
    },
    bpsc: {
        name: "BPSC",
        shortName: "BPSC",
        category: "state",
        icon: "🗺️",
        officialUrl: "https://bpsc.bih.nic.in",
        searchKeywords: ["BPSC", "Bihar PSC", "Bihar"],
        importance: "high"
    },
    upPolice: {
        name: "UP Police",
        shortName: "UP Police",
        category: "state",
        icon: "👮",
        officialUrl: "https://uppbpb.gov.in",
        searchKeywords: ["UP Police", "Constable", "SI", "UPPBPB"],
        importance: "high"
    },
    upLekhpal: {
        name: "UP Lekhpal",
        shortName: "UP Lekhpal",
        category: "state",
        icon: "📝",
        officialUrl: "https://upsssc.gov.in",
        searchKeywords: ["Lekhpal", "UPSSSC", "Revenue"],
        importance: "medium"
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
        searchKeywords: ["Agniveer", "Indian Army", "Rally", "Recruitment"],
        importance: "critical"
    },
    nda: {
        name: "NDA/NA Exam",
        shortName: "NDA",
        category: "defence",
        icon: "🎖️",
        officialUrl: "https://upsc.gov.in",
        searchKeywords: ["NDA", "Naval Academy", "Defence Academy"],
        importance: "high"
    },
    cds: {
        name: "CDS Exam",
        shortName: "CDS",
        category: "defence",
        icon: "🎖️",
        officialUrl: "https://upsc.gov.in",
        searchKeywords: ["CDS", "Combined Defence", "OTA", "IMA"],
        importance: "high"
    },
    afcat: {
        name: "AFCAT",
        shortName: "AFCAT",
        category: "defence",
        icon: "✈️",
        officialUrl: "https://afcat.cdac.in",
        searchKeywords: ["AFCAT", "Air Force", "Flying Branch"],
        importance: "medium"
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
        searchKeywords: ["IBPS PO", "Probationary Officer", "Bank PO"],
        importance: "critical"
    },
    ibpsClerk: {
        name: "IBPS Clerk",
        shortName: "IBPS Clerk",
        category: "banking",
        icon: "🏦",
        officialUrl: "https://ibps.in",
        searchKeywords: ["IBPS Clerk", "CRP Clerk", "Bank Clerk"],
        importance: "high"
    },
    sbiPo: {
        name: "SBI PO",
        shortName: "SBI PO",
        category: "banking",
        icon: "🏦",
        officialUrl: "https://sbi.co.in/careers",
        searchKeywords: ["SBI PO", "State Bank", "Probationary"],
        importance: "critical"
    },
    rbiGradeB: {
        name: "RBI Grade B",
        shortName: "RBI",
        category: "banking",
        icon: "🏦",
        officialUrl: "https://rbi.org.in",
        searchKeywords: ["RBI Grade B", "Reserve Bank", "Officer"],
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
        searchKeywords: ["RRB NTPC", "Non Technical", "Railway"],
        importance: "critical"
    },
    rrbGroupD: {
        name: "RRB Group D",
        shortName: "RRB Group D",
        category: "railway",
        icon: "🚂",
        officialUrl: "https://www.rrbcdg.gov.in",
        searchKeywords: ["RRB Group D", "Railway Group D", "Level 1"],
        importance: "high"
    },
    rrbJe: {
        name: "RRB JE",
        shortName: "RRB JE",
        category: "railway",
        icon: "🚂",
        officialUrl: "https://www.rrbcdg.gov.in",
        searchKeywords: ["RRB JE", "Junior Engineer", "Railway JE"],
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
        searchKeywords: ["CTET", "Central Teacher", "Paper 1", "Paper 2"],
        importance: "critical"
    },
    uptet: {
        name: "UPTET",
        shortName: "UPTET",
        category: "teaching",
        icon: "👨‍🏫",
        officialUrl: "https://updeled.gov.in",
        searchKeywords: ["UPTET", "UP TET", "Teacher Eligibility"],
        importance: "high"
    },
    superTet: {
        name: "Super TET",
        shortName: "Super TET",
        category: "teaching",
        icon: "👨‍🏫",
        officialUrl: "https://updeled.gov.in",
        searchKeywords: ["Super TET", "Assistant Teacher", "UP"],
        importance: "high"
    },
    ugcNet: {
        name: "UGC NET",
        shortName: "UGC NET",
        category: "teaching",
        icon: "🎓",
        officialUrl: "https://ugcnet.nta.nic.in",
        searchKeywords: ["UGC NET", "JRF", "Assistant Professor"],
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
        searchKeywords: ["JNVST", "Class 6", "Navodaya"],
        importance: "high"
    },
    jnvClass9: {
        name: "JNV Class 9 Lateral Entry",
        shortName: "JNV-9",
        category: "school",
        icon: "🏫",
        officialUrl: "https://navodaya.gov.in",
        searchKeywords: ["JNV Class 9", "Lateral Entry", "Class IX"],
        importance: "high"
    },
    sainikSchool: {
        name: "Sainik School AISSEE",
        shortName: "AISSEE",
        category: "school",
        icon: "🎖️",
        officialUrl: "https://aissee.nta.nic.in",
        searchKeywords: ["AISSEE", "Sainik School", "Class 6", "Class 9"],
        importance: "high"
    },
    jeeMain: {
        name: "JEE Main",
        shortName: "JEE Main",
        category: "school",
        icon: "⚙️",
        officialUrl: "https://jeemain.nta.nic.in",
        searchKeywords: ["JEE Main", "NTA", "Engineering", "Session"],
        importance: "critical"
    },
    neet: {
        name: "NEET UG",
        shortName: "NEET",
        category: "school",
        icon: "🩺",
        officialUrl: "https://neet.nta.nic.in",
        searchKeywords: ["NEET UG", "Medical", "NTA NEET"],
        importance: "critical"
    },
    cuet: {
        name: "CUET UG",
        shortName: "CUET",
        category: "school",
        icon: "🎓",
        officialUrl: "https://cuet.samarth.ac.in",
        searchKeywords: ["CUET", "Central Universities", "NTA CUET"],
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
        searchKeywords: ["NSP", "National Scholarship", "Pre-Matric", "Post-Matric"],
        importance: "high"
    },
    upScholarship: {
        name: "UP Scholarship",
        shortName: "UP Scholarship",
        category: "scholarship",
        icon: "🎓",
        officialUrl: "https://scholarship.up.gov.in",
        searchKeywords: ["UP Scholarship", "Pre Matric", "Post Matric"],
        importance: "high"
    },
    pmScholarship: {
        name: "PM Scholarship",
        shortName: "PM Scholarship",
        category: "scholarship",
        icon: "🏆",
        officialUrl: "https://scholarships.gov.in",
        searchKeywords: ["PM Scholarship", "Prime Minister", "Ex-Servicemen"],
        importance: "medium"
    },
    ntse: {
        name: "NTSE",
        shortName: "NTSE",
        category: "scholarship",
        icon: "🏆",
        officialUrl: "https://ncert.nic.in",
        searchKeywords: ["NTSE", "National Talent Search", "Scholarship"],
        importance: "high"
    }
};

// Alert status types
const ALERT_STATUS = {
    PENDING: "pending",      // Scraped, awaiting admin review
    APPROVED: "approved",    // Approved by admin, visible to public
    REJECTED: "rejected",    // Rejected by admin
    EXPIRED: "expired"       // Past deadline
};

// Alert types
const ALERT_TYPES = {
    NOTIFICATION: "notification",    // New exam notification released
    APPLICATION: "application",      // Application window open
    ADMIT_CARD: "admit_card",        // Admit card released
    EXAM_DATE: "exam_date",          // Exam date announced
    RESULT: "result",                // Result declared
    ANSWER_KEY: "answer_key",        // Answer key released
    COUNSELING: "counseling",        // Counseling dates
    CORRECTION: "correction"         // Application correction window
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate a unique ID for an alert based on exam + type + date
 */
function generateAlertId(examKey, alertType, dateStr) {
    const cleanDate = dateStr ? dateStr.replace(/[^\w]/g, "") : Date.now();
    return `${examKey}_${alertType}_${cleanDate}`.toLowerCase();
}

/**
 * Check if an alert already exists to avoid duplicates
 */
async function alertExists(alertId) {
    const doc = await db.collection("examAlerts").doc(alertId).get();
    return doc.exists;
}

/**
 * Save a new exam alert to Firestore
 */
async function saveExamAlert(alertData) {
    const alertId = generateAlertId(
        alertData.examKey,
        alertData.alertType,
        alertData.relevantDate
    );

    // Check for duplicate
    if (await alertExists(alertId)) {
        logger.info(`Alert already exists: ${alertId}`);
        return { success: false, reason: "duplicate" };
    }

    const alert = {
        id: alertId,
        ...alertData,
        status: ALERT_STATUS.PENDING,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        scrapedAt: admin.firestore.FieldValue.serverTimestamp(),
        views: 0,
        clicks: 0
    };

    await db.collection("examAlerts").doc(alertId).set(alert);
    logger.info(`✅ New alert saved: ${alertId}`);

    return { success: true, alertId };
}

// ============================================
// NEWS API SCRAPER (Phase 1 - Quick Start)
// ============================================

/**
 * Fetch exam-related news from Google News RSS
 * This is Phase 1 - quick to set up, catches the "buzz"
 */
async function fetchExamNewsFromRSS(examConfig) {
    try {
        const searchQuery = encodeURIComponent(
            `${examConfig.searchKeywords.join(" OR ")} exam notification 2024 2025 2026`
        );
        const rssUrl = `https://news.google.com/rss/search?q=${searchQuery}&hl=en-IN&gl=IN&ceid=IN:en`;

        const response = await axios.get(rssUrl, {
            timeout: 10000,
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; BroProBot/1.0)"
            }
        });

        const $ = cheerio.load(response.data, { xmlMode: true });
        const newsItems = [];

        $("item").each((i, el) => {
            if (i >= 5) return; // Limit to 5 items per exam

            const title = $(el).find("title").text();
            const link = $(el).find("link").text();
            const pubDate = $(el).find("pubDate").text();
            const source = $(el).find("source").text();

            // Filter for relevant news
            const isRelevant = examConfig.searchKeywords.some(keyword =>
                title.toLowerCase().includes(keyword.toLowerCase())
            );

            if (isRelevant) {
                newsItems.push({
                    title: title.trim(),
                    link: link.trim(),
                    publishedAt: new Date(pubDate).toISOString(),
                    source: source.trim() || "Google News"
                });
            }
        });

        return newsItems;
    } catch (error) {
        logger.error(`RSS fetch failed for ${examConfig.shortName}:`, error.message);
        return [];
    }
}

// ============================================
// OFFICIAL WEBSITE SCRAPER (Phase 2 - Precision)
// ============================================

/**
 * Scrape the official NVS (Navodaya) website for JNV updates
 */
async function scrapeNavodayaWebsite() {
    try {
        const response = await axios.get("https://navodaya.gov.in", {
            timeout: 15000,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
        });

        const $ = cheerio.load(response.data);
        const updates = [];

        // Look for news/updates sections (this selector may need adjustment)
        $(".marquee a, .news-section a, .updates a, .notice a").each((i, el) => {
            const text = $(el).text().trim();
            const href = $(el).attr("href");

            // Check if it's related to admission/exam
            const keywords = ["admission", "class ix", "class vi", "jnvst", "lateral", "exam", "notification"];
            const isRelevant = keywords.some(kw => text.toLowerCase().includes(kw));

            if (isRelevant && text.length > 10) {
                updates.push({
                    title: text,
                    link: href?.startsWith("http") ? href : `https://navodaya.gov.in${href}`,
                    source: "Official NVS Website"
                });
            }
        });

        return updates;
    } catch (error) {
        logger.error("Navodaya scrape failed:", error.message);
        return [];
    }
}

/**
 * Scrape NTA (National Testing Agency) websites
 */
async function scrapeNTAWebsite(examUrl, examName) {
    try {
        const response = await axios.get(examUrl, {
            timeout: 15000,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
        });

        const $ = cheerio.load(response.data);
        const updates = [];

        // NTA websites typically have a news/updates marquee
        $("marquee a, .news a, .update a, .notice a, .scroll-text a").each((i, el) => {
            const text = $(el).text().trim();
            const href = $(el).attr("href");

            if (text.length > 10) {
                updates.push({
                    title: text,
                    link: href?.startsWith("http") ? href : `${examUrl}${href}`,
                    source: `Official ${examName} Website`
                });
            }
        });

        return updates;
    } catch (error) {
        logger.error(`${examName} scrape failed:`, error.message);
        return [];
    }
}

// ============================================
// AI PROCESSOR (Gemini API)
// ============================================

/**
 * Use Gemini AI to extract structured data from a news headline
 * This is the "intelligence" layer that understands the content
 */
async function processWithAI(newsItem, examConfig) {
    // Check if Gemini API key is configured
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
        // Fallback: Use rule-based extraction
        return extractDataWithRules(newsItem, examConfig);
    }

    try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
You are an expert at extracting information from Indian education/exam news headlines.

Analyze this headline and extract structured data:
"${newsItem.title}"

For exam: ${examConfig.name}
Source: ${newsItem.source}

Extract the following in JSON format:
{
  "alertType": "notification|application|admit_card|exam_date|result|answer_key|counseling|correction",
  "relevantDate": "YYYY-MM-DD or null if not mentioned",
  "deadlineDate": "YYYY-MM-DD or null if not mentioned",
  "summary": "A concise 1-line summary in simple English",
  "summaryHindi": "Same summary in Hindi",
  "isUrgent": true/false (true if deadline is within 7 days or words like 'last date', 'urgent', 'extended'),
  "isOfficial": true/false (true if from official government source),
  "confidence": 0.0 to 1.0 (how confident you are in this extraction)
}

Only return valid JSON, no explanation.
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Parse JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return extractDataWithRules(newsItem, examConfig);
    } catch (error) {
        logger.error("AI processing failed:", error.message);
        return extractDataWithRules(newsItem, examConfig);
    }
}

/**
 * Fallback: Rule-based extraction when AI is not available
 */
function extractDataWithRules(newsItem, examConfig) {
    const titleLower = newsItem.title.toLowerCase();

    let alertType = ALERT_TYPES.NOTIFICATION;
    let isUrgent = false;

    // Detect alert type from keywords
    if (titleLower.includes("admit card") || titleLower.includes("hall ticket")) {
        alertType = ALERT_TYPES.ADMIT_CARD;
    } else if (titleLower.includes("result") || titleLower.includes("declared")) {
        alertType = ALERT_TYPES.RESULT;
    } else if (titleLower.includes("apply") || titleLower.includes("registration") || titleLower.includes("application")) {
        alertType = ALERT_TYPES.APPLICATION;
    } else if (titleLower.includes("exam date") || titleLower.includes("schedule")) {
        alertType = ALERT_TYPES.EXAM_DATE;
    } else if (titleLower.includes("answer key")) {
        alertType = ALERT_TYPES.ANSWER_KEY;
    } else if (titleLower.includes("counseling") || titleLower.includes("counselling")) {
        alertType = ALERT_TYPES.COUNSELING;
    } else if (titleLower.includes("correction")) {
        alertType = ALERT_TYPES.CORRECTION;
    }

    // Detect urgency
    if (titleLower.includes("last date") || titleLower.includes("urgent") ||
        titleLower.includes("extended") || titleLower.includes("tomorrow") ||
        titleLower.includes("today")) {
        isUrgent = true;
    }

    return {
        alertType,
        relevantDate: null,
        deadlineDate: null,
        summary: newsItem.title.slice(0, 150),
        summaryHindi: null,
        isUrgent,
        isOfficial: newsItem.source?.includes("Official") || false,
        confidence: 0.6
    };
}

// ============================================
// SCHEDULED FUNCTIONS (The "Robots")
// ============================================

/**
 * Main scheduled job: Runs every 6 hours to fetch exam updates
 * This is the "always-on" robot that works while you sleep
 */
exports.fetchExamUpdates = onSchedule(
    {
        schedule: "every 6 hours",
        timeZone: "Asia/Kolkata",
        memory: "512MiB",
        timeoutSeconds: 300
    },
    async (event) => {
        logger.info("🤖 Starting exam updates fetch...");

        const results = {
            totalFetched: 0,
            newAlerts: 0,
            duplicates: 0,
            errors: []
        };

        // Process each exam source
        for (const [examKey, examConfig] of Object.entries(EXAM_SOURCES)) {
            try {
                logger.info(`📡 Fetching updates for: ${examConfig.name}`);

                // Fetch from RSS/News
                const newsItems = await fetchExamNewsFromRSS(examConfig);
                results.totalFetched += newsItems.length;

                // Process each news item
                for (const newsItem of newsItems) {
                    // Extract structured data using AI/rules
                    const extractedData = await processWithAI(newsItem, examConfig);

                    // Skip low-confidence extractions
                    if (extractedData.confidence < 0.4) continue;

                    // Create alert object
                    const alertData = {
                        examKey,
                        examName: examConfig.name,
                        examShortName: examConfig.shortName,
                        category: examConfig.category,
                        icon: examConfig.icon,
                        officialUrl: examConfig.officialUrl,
                        alertType: extractedData.alertType,
                        title: newsItem.title,
                        summary: extractedData.summary,
                        summaryHindi: extractedData.summaryHindi,
                        sourceUrl: newsItem.link,
                        sourceType: newsItem.source,
                        relevantDate: extractedData.relevantDate,
                        deadlineDate: extractedData.deadlineDate,
                        isUrgent: extractedData.isUrgent,
                        isOfficial: extractedData.isOfficial,
                        confidence: extractedData.confidence,
                        importance: examConfig.importance
                    };

                    // Save to Firestore
                    const saveResult = await saveExamAlert(alertData);
                    if (saveResult.success) {
                        results.newAlerts++;
                    } else {
                        results.duplicates++;
                    }
                }
            } catch (error) {
                results.errors.push({ exam: examKey, error: error.message });
                logger.error(`Error processing ${examKey}:`, error);
            }
        }

        // Log final results
        logger.info("✅ Exam updates fetch complete:", results);

        // Save run log
        await db.collection("systemLogs").add({
            type: "examUpdateFetch",
            results,
            completedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        return results;
    }
);

// ============================================
// ADMIN API ENDPOINTS
// ============================================

/**
 * Get all pending alerts for admin review
 */
exports.getPendingAlerts = onCall(
    { cors: true, region: "asia-south1" },
    async (request) => {
        // Verify admin (you should add proper auth check)
        // For now, we'll allow any authenticated user to see pending

        const snapshot = await db.collection("examAlerts")
            .where("status", "==", ALERT_STATUS.PENDING)
            .orderBy("createdAt", "desc")
            .limit(50)
            .get();

        const alerts = [];
        snapshot.forEach(doc => {
            alerts.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, alerts };
    }
);

/**
 * Approve or reject an alert
 */
exports.moderateAlert = onCall(
    { cors: true, region: "asia-south1" },
    async (request) => {
        const { alertId, action, modifiedData } = request.data;

        if (!alertId || !["approve", "reject"].includes(action)) {
            return { success: false, error: "Invalid parameters" };
        }

        const alertRef = db.collection("examAlerts").doc(alertId);
        const doc = await alertRef.get();

        if (!doc.exists) {
            return { success: false, error: "Alert not found" };
        }

        const updateData = {
            status: action === "approve" ? ALERT_STATUS.APPROVED : ALERT_STATUS.REJECTED,
            moderatedAt: admin.firestore.FieldValue.serverTimestamp(),
            moderatedBy: request.auth?.uid || "admin"
        };

        // Allow admin to modify data before publishing
        if (modifiedData) {
            Object.assign(updateData, modifiedData);
        }

        await alertRef.update(updateData);

        return { success: true, alertId, newStatus: updateData.status };
    }
);

// ============================================
// PUBLIC API ENDPOINTS
// ============================================

/**
 * Get approved alerts for public display
 * This is what the website calls to show the Exam Centre
 */
exports.getExamAlerts = onRequest(
    { cors: true, region: "asia-south1" },
    async (req, res) => {
        try {
            const { category, limit = 20, urgent = false } = req.query;

            let query = db.collection("examAlerts")
                .where("status", "==", ALERT_STATUS.APPROVED)
                .orderBy("createdAt", "desc")
                .limit(parseInt(limit));

            // Filter by category if specified
            if (category && ["school", "college", "jobs"].includes(category)) {
                query = db.collection("examAlerts")
                    .where("status", "==", ALERT_STATUS.APPROVED)
                    .where("category", "==", category)
                    .orderBy("createdAt", "desc")
                    .limit(parseInt(limit));
            }

            // Get urgent alerts only
            if (urgent === "true") {
                query = db.collection("examAlerts")
                    .where("status", "==", ALERT_STATUS.APPROVED)
                    .where("isUrgent", "==", true)
                    .orderBy("createdAt", "desc")
                    .limit(parseInt(limit));
            }

            const snapshot = await query.get();

            const alerts = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                // Remove internal fields
                const { confidence, moderatedBy, ...publicData } = data;
                alerts.push({ id: doc.id, ...publicData });
            });

            // Add CORS headers for public access
            res.set("Access-Control-Allow-Origin", "*");
            res.set("Cache-Control", "public, max-age=300"); // Cache for 5 minutes

            res.json({
                success: true,
                count: alerts.length,
                alerts,
                fetchedAt: new Date().toISOString()
            });
        } catch (error) {
            logger.error("getExamAlerts error:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
);

/**
 * Get stats for the Exam Centre dashboard
 */
exports.getExamStats = onRequest(
    { cors: true, region: "asia-south1" },
    async (req, res) => {
        try {
            // Count alerts by category
            const stats = {
                total: 0,
                byCategory: { school: 0, college: 0, jobs: 0 },
                urgent: 0,
                pendingReview: 0
            };

            // Get approved count
            const approvedSnapshot = await db.collection("examAlerts")
                .where("status", "==", ALERT_STATUS.APPROVED)
                .get();

            stats.total = approvedSnapshot.size;

            approvedSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.category && stats.byCategory[data.category] !== undefined) {
                    stats.byCategory[data.category]++;
                }
                if (data.isUrgent) stats.urgent++;
            });

            // Get pending count
            const pendingSnapshot = await db.collection("examAlerts")
                .where("status", "==", ALERT_STATUS.PENDING)
                .get();

            stats.pendingReview = pendingSnapshot.size;

            res.set("Access-Control-Allow-Origin", "*");
            res.set("Cache-Control", "public, max-age=60");

            res.json({ success: true, stats });
        } catch (error) {
            logger.error("getExamStats error:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
);

/**
 * Track alert click (for analytics)
 */
exports.trackAlertClick = onRequest(
    { cors: true, region: "asia-south1" },
    async (req, res) => {
        const { alertId } = req.body;

        if (!alertId) {
            return res.status(400).json({ success: false, error: "Missing alertId" });
        }

        try {
            await db.collection("examAlerts").doc(alertId).update({
                clicks: admin.firestore.FieldValue.increment(1),
                lastClickedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
);

// ============================================
// MANUAL TRIGGER (For Testing)
// ============================================

/**
 * Manually trigger an exam update fetch (for testing)
 * Call this from admin panel to test the system
 */
exports.triggerExamFetch = onCall(
    { cors: true, region: "asia-south1" },
    async (request) => {
        logger.info("📡 Manual exam fetch triggered");

        // Run the fetch logic
        const results = {
            totalFetched: 0,
            newAlerts: 0,
            duplicates: 0,
            errors: []
        };

        // Only fetch for a subset to save resources during testing
        const testExams = ["jnvClass9", "jeeMain", "sscCgl"];

        for (const examKey of testExams) {
            const examConfig = EXAM_SOURCES[examKey];
            if (!examConfig) continue;

            try {
                const newsItems = await fetchExamNewsFromRSS(examConfig);
                results.totalFetched += newsItems.length;

                for (const newsItem of newsItems.slice(0, 3)) { // Limit to 3 per exam for testing
                    const extractedData = await processWithAI(newsItem, examConfig);

                    if (extractedData.confidence < 0.4) continue;

                    const alertData = {
                        examKey,
                        examName: examConfig.name,
                        examShortName: examConfig.shortName,
                        category: examConfig.category,
                        icon: examConfig.icon,
                        officialUrl: examConfig.officialUrl,
                        alertType: extractedData.alertType,
                        title: newsItem.title,
                        summary: extractedData.summary,
                        summaryHindi: extractedData.summaryHindi,
                        sourceUrl: newsItem.link,
                        sourceType: newsItem.source,
                        relevantDate: extractedData.relevantDate,
                        deadlineDate: extractedData.deadlineDate,
                        isUrgent: extractedData.isUrgent,
                        isOfficial: extractedData.isOfficial,
                        confidence: extractedData.confidence,
                        importance: examConfig.importance
                    };

                    const saveResult = await saveExamAlert(alertData);
                    if (saveResult.success) {
                        results.newAlerts++;
                    } else {
                        results.duplicates++;
                    }
                }
            } catch (error) {
                results.errors.push({ exam: examKey, error: error.message });
            }
        }

        logger.info("✅ Manual fetch complete:", results);

        return { success: true, results };
    }
);

// ============================================
// HEALTH CHECK
// ============================================

exports.healthCheck = onRequest(
    { cors: true, region: "asia-south1" },
    async (req, res) => {
        res.json({
            status: "healthy",
            service: "BroPro Exam Alert System",
            version: "1.0.0",
            timestamp: new Date().toISOString(),
            examsMonitored: Object.keys(EXAM_SOURCES).length
        });
    }
);
