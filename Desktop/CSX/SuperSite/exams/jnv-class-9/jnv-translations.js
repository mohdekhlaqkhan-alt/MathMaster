// ============================================
// JNV CLASS 9 - LANGUAGE TRANSLATIONS
// Hindi/English toggle support
// ============================================

// Translation dictionary
const JNV_TRANSLATIONS = {
    // Tab names
    overview: { en: 'Overview', hi: 'अवलोकन' },
    syllabus: { en: 'Syllabus', hi: 'पाठ्यक्रम' },
    practice: { en: 'Practice', hi: 'अभ्यास' },
    leaderboard: { en: 'Leaderboard', hi: 'लीडरबोर्ड' },

    // Overview Tab
    about_jnv: { en: 'About JNV', hi: 'JNV के बारे में' },
    about_jnv_desc: {
        en: 'Jawahar Navodaya Vidyalayas are a system of central schools for talented students from rural areas. The Class 9 Lateral Entry exam gives students admission to Class 9 in these prestigious residential schools.',
        hi: 'जवाहर नवोदय विद्यालय ग्रामीण क्षेत्रों के प्रतिभाशाली छात्रों के लिए केंद्रीय विद्यालयों की एक प्रणाली है। कक्षा 9 की पार्श्व प्रवेश परीक्षा इन प्रतिष्ठित आवासीय विद्यालयों में कक्षा 9 में प्रवेश प्रदान करती है।'
    },
    exam_pattern: { en: 'Exam Pattern', hi: 'परीक्षा पैटर्न' },
    eligibility: { en: 'Eligibility Criteria', hi: 'पात्रता मानदंड' },
    important_dates: { en: 'Important Dates', hi: 'महत्वपूर्ण तिथियां' },

    // Exam pattern details
    subject: { en: 'Subject', hi: 'विषय' },
    questions: { en: 'Questions', hi: 'प्रश्न' },
    marks: { en: 'Marks', hi: 'अंक' },
    duration: { en: 'Duration', hi: 'समय' },
    total: { en: 'Total', hi: 'कुल' },
    hours: { en: 'Hours', hi: 'घंटे' },
    minutes: { en: 'Minutes', hi: 'मिनट' },

    // Eligibility
    eligibility_1: {
        en: 'Student must be studying in Class 8 in a government school',
        hi: 'छात्र सरकारी स्कूल में कक्षा 8 में अध्ययनरत होना चाहिए'
    },
    eligibility_2: {
        en: 'Age should be between 13-16 years as on May 1st of admission year',
        hi: 'प्रवेश वर्ष की 1 मई को आयु 13-16 वर्ष के बीच होनी चाहिए'
    },
    eligibility_3: {
        en: 'Candidate must belong to the district where JNV is located',
        hi: 'उम्मीदवार उस जिले का निवासी होना चाहिए जहां JNV स्थित है'
    },
    eligibility_4: {
        en: 'No domicile certificate required for rural area candidates',
        hi: 'ग्रामीण क्षेत्र के उम्मीदवारों के लिए अधिवास प्रमाण पत्र की आवश्यकता नहीं है'
    },

    // Dates
    application_start: { en: 'Application Start', hi: 'आवेदन प्रारंभ' },
    application_end: { en: 'Application End', hi: 'आवेदन समाप्त' },
    exam_date: { en: 'Exam Date', hi: 'परीक्षा तिथि' },
    result_date: { en: 'Result Date', hi: 'परिणाम तिथि' },

    // Syllabus Tab
    official_syllabus: { en: 'JNV Class 9 Official Syllabus', hi: 'JNV कक्षा 9 आधिकारिक पाठ्यक्रम' },
    syllabus_note: {
        en: 'Based on Class 8 NCERT curriculum. This is the exact syllabus as prescribed by Navodaya Vidyalaya Samiti (NVS).',
        hi: 'कक्षा 8 NCERT पाठ्यक्रम पर आधारित। यह नवोदय विद्यालय समिति (NVS) द्वारा निर्धारित सटीक पाठ्यक्रम है।'
    },
    preparation_tips: { en: 'Preparation Tips', hi: 'तैयारी के सुझाव' },

    // Practice Tab
    practice_questions: { en: 'Practice Questions', hi: 'अभ्यास प्रश्न' },
    practice_desc: {
        en: 'Master JNV Class 9 with topic-wise practice and previous year papers',
        hi: 'विषय-वार अभ्यास और पिछले वर्षों के प्रश्न पत्रों के साथ JNV कक्षा 9 में महारत हासिल करें'
    },
    subject_wise_practice: { en: 'Subject-wise Practice', hi: 'विषय-वार अभ्यास' },
    previous_year_papers: { en: 'Previous Year Papers', hi: 'पिछले वर्ष के प्रश्न पत्र' },
    mock_tests: { en: 'Mock Tests', hi: 'मॉक टेस्ट' },
    full_paper: { en: 'Full Paper', hi: 'पूर्ण प्रश्न पत्र' },
    available: { en: 'Available', hi: 'उपलब्ध' },
    coming_soon: { en: 'Coming Soon', hi: 'जल्द आ रहा है' },
    start_test: { en: 'Start Test', hi: 'टेस्ट शुरू करें' },
    free: { en: 'FREE', hi: 'मुफ़्त' },
    premium: { en: 'PREMIUM', hi: 'प्रीमियम' },

    // Subjects
    english_subject: { en: 'English', hi: 'अंग्रेजी' },
    mathematics: { en: 'Mathematics', hi: 'गणित' },
    science: { en: 'Science', hi: 'विज्ञान' },
    complete: { en: 'Complete', hi: 'पूर्ण' },

    // CBT Exam
    time_left: { en: 'Time Left', hi: 'शेष समय' },
    submit_exam: { en: 'Submit Exam', hi: 'परीक्षा जमा करें' },
    question_no: { en: 'Question No.', hi: 'प्रश्न संख्या' },
    of: { en: 'of', hi: 'में से' },
    section: { en: 'Section', hi: 'खंड' },
    clear_response: { en: 'Clear Response', hi: 'उत्तर मिटाएं' },
    mark_for_review: { en: 'Mark for Review', hi: 'समीक्षा के लिए चिह्नित करें' },
    previous: { en: 'Previous', hi: 'पिछला' },
    save_next: { en: 'Save & Next', hi: 'सहेजें और अगला' },
    answered: { en: 'Answered', hi: 'उत्तर दिया' },
    not_answered: { en: 'Not Answered', hi: 'उत्तर नहीं दिया' },
    not_visited: { en: 'Not Visited', hi: 'नहीं देखा' },
    marked_review: { en: 'Marked for Review', hi: 'समीक्षा के लिए चिह्नित' },
    answered_marked: { en: 'Answered & Marked', hi: 'उत्तर और चिह्नित' },
    confirm_submit: { en: 'Confirm Submit', hi: 'जमा करने की पुष्टि करें' },
    go_back: { en: 'Go Back', hi: 'वापस जाएं' },
    exam_completed: { en: 'Exam Completed!', hi: 'परीक्षा पूर्ण!' },
    correct: { en: 'Correct', hi: 'सही' },
    wrong: { en: 'Wrong', hi: 'गलत' },
    skipped: { en: 'Skipped', hi: 'छोड़ा गया' },
    xp_earned: { en: 'XP Earned', hi: 'XP अर्जित' },
    review_answers: { en: 'Review Answers', hi: 'उत्तर देखें' },
    done: { en: 'Done', hi: 'पूर्ण' },

    // Leaderboard
    jnv_leaderboard: { en: 'JNV Class 9 Leaderboard', hi: 'JNV कक्षा 9 लीडरबोर्ड' },
    leaderboard_desc: {
        en: 'Top performers in JNV Class 9 practice',
        hi: 'JNV कक्षा 9 अभ्यास में शीर्ष प्रदर्शक'
    },

    // Miscellaneous
    questions_count: { en: 'Questions', hi: 'प्रश्न' },
    hours_count: { en: 'Hours', hi: 'घंटे' },
    unlock: { en: 'Unlock', hi: 'अनलॉक करें' }
};

// Current language (default: English)
let currentLanguage = localStorage.getItem('jnv_language') || 'en';

// Set language
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('jnv_language', lang);

    // Update toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Add body class for fonts
    document.body.classList.toggle('lang-hi', lang === 'hi');
    document.body.classList.toggle('lang-en', lang === 'en');

    // Add translating class for animation
    document.body.classList.add('translating');

    // Translate all elements with data-translate attribute
    translatePage();

    // Remove translating class
    setTimeout(() => {
        document.body.classList.remove('translating');
    }, 200);

    console.log('🌐 Language set to:', lang === 'hi' ? 'Hindi' : 'English');
}

// Translate entire page
function translatePage() {
    // Translate elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (JNV_TRANSLATIONS[key]) {
            el.textContent = JNV_TRANSLATIONS[key][currentLanguage];
        }
    });

    // Translate CBT exam interface if open
    if (document.getElementById('cbtExam')?.classList.contains('active')) {
        translateCBTInterface();
    }
}

// Translate CBT interface
function translateCBTInterface() {
    const t = (key) => JNV_TRANSLATIONS[key]?.[currentLanguage] || key;

    // Header elements
    const timeLeftLabel = document.querySelector('.timer-label');
    if (timeLeftLabel) timeLeftLabel.textContent = t('time_left') + ':';

    const submitBtn = document.querySelector('.cbt-submit-btn span');
    if (submitBtn) submitBtn.textContent = '📤 ' + t('submit_exam');

    // Navigation buttons
    const clearBtn = document.querySelector('.cbt-action-btn.secondary span');
    if (clearBtn) clearBtn.textContent = '🗑️ ' + t('clear_response');

    const markBtn = document.querySelector('.cbt-action-btn.mark-review span');
    if (markBtn && !markBtn.closest('.cbt-action-btn').classList.contains('active')) {
        markBtn.textContent = '🔖 ' + t('mark_for_review');
    }

    const prevBtn = document.querySelector('.cbt-nav-btn.prev');
    if (prevBtn) prevBtn.textContent = '← ' + t('previous');

    const nextBtn = document.querySelector('.cbt-nav-btn.save-next');
    if (nextBtn) nextBtn.textContent = t('save_next') + ' →';

    // Legend items
    document.querySelectorAll('.legend-item').forEach(item => {
        const box = item.querySelector('.legend-box');
        const text = item.querySelector('span:last-child');
        if (!box || !text) return;

        if (box.classList.contains('answered')) text.textContent = t('answered');
        else if (box.classList.contains('not-answered')) text.textContent = t('not_answered');
        else if (box.classList.contains('not-visited')) text.textContent = t('not_visited');
        else if (box.classList.contains('marked')) text.textContent = t('marked_review');
        else if (box.classList.contains('answered-marked')) text.textContent = t('answered_marked');
    });

    // Result modal
    const resultHeader = document.querySelector('.result-header h2');
    if (resultHeader) resultHeader.textContent = t('exam_completed');
}

// Get translation
function getTranslation(key) {
    return JNV_TRANSLATIONS[key]?.[currentLanguage] || key;
}

// Initialize language on load
function initLanguage() {
    // Set saved language or default
    setLanguage(currentLanguage);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initLanguage);

console.log('🌐 JNV Translations loaded');
