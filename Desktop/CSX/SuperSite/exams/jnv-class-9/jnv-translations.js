// ============================================
// JNV CLASS 9 - LANGUAGE TRANSLATIONS
// Hindi/English toggle support
// ============================================

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

    // Toggle visibility of lang-en and lang-hi elements
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'en' ? '' : 'none';
    });
    document.querySelectorAll('.lang-hi').forEach(el => {
        el.style.display = lang === 'hi' ? '' : 'none';
    });

    // Translate CBT exam interface if open
    if (document.getElementById('cbtExam')?.classList.contains('active')) {
        renderCBTQuestion(); // Re-render with current language
    }

    console.log('🌐 Language set to:', lang === 'hi' ? 'Hindi (हिंदी)' : 'English');
}

// Get translation for a question (for Math/Science)
function getQuestionTranslation(question, lang) {
    // If question has hindi version, return it
    if (lang === 'hi' && question.question_hi) {
        return {
            question: question.question_hi,
            options: question.options_hi || question.options,
            explanation: question.explanation_hi || question.explanation
        };
    }
    return {
        question: question.question,
        options: question.options,
        explanation: question.explanation
    };
}

// Initialize language on load
function initLanguage() {
    // Set saved language or default
    setLanguage(currentLanguage);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initLanguage);

console.log('🌐 JNV Translations loaded - v2');
