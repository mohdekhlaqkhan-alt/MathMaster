/* ============================================
   HINDI - GAME ENGINE
   व्याकरण, शब्दावली, मुहावरे और अधिक!
   ============================================ */

// ============================================
// HINDI DATA
// ============================================
const hindiData = {
    grammar: {
        title: 'व्याकरण (Grammar)',
        category: 'व्याकरण',
        emoji: '📝',
        xpPerQuestion: 15,
        questions: [
            { q: '"राम" कौन सी संज्ञा है?', options: ['जातिवाचक', 'व्यक्तिवाचक', 'भाववाचक', 'समूहवाचक'], answer: 'व्यक्तिवाचक' },
            { q: '"खाना" कौन सा शब्द है?', options: ['संज्ञा', 'क्रिया', 'विशेषण', 'सर्वनाम'], answer: 'क्रिया' },
            { q: '"सुंदर" कौन सा शब्द है?', options: ['संज्ञा', 'क्रिया', 'विशेषण', 'क्रियाविशेषण'], answer: 'विशेषण' },
            { q: '"वह" कौन सा शब्द है?', options: ['संज्ञा', 'सर्वनाम', 'विशेषण', 'क्रिया'], answer: 'सर्वनाम' },
            { q: '"धीरे-धीरे" कौन सा शब्द है?', options: ['संज्ञा', 'क्रिया', 'विशेषण', 'क्रियाविशेषण'], answer: 'क्रियाविशेषण' },
            { q: 'हिंदी में कितने वचन होते हैं?', options: ['एक', 'दो', 'तीन', 'चार'], answer: 'दो' },
            { q: '"लड़का" का बहुवचन क्या है?', options: ['लड़के', 'लड़कियां', 'लड़कों', 'लड़की'], answer: 'लड़के' },
            { q: 'हिंदी में कितने लिंग होते हैं?', options: ['एक', 'दो', 'तीन', 'चार'], answer: 'दो' },
            { q: '"पुस्तक" किस लिंग का शब्द है?', options: ['पुल्लिंग', 'स्त्रीलिंग', 'नपुंसकलिंग', 'उभयलिंग'], answer: 'स्त्रीलिंग' },
            { q: '"बच्चा" किस लिंग का शब्द है?', options: ['पुल्लिंग', 'स्त्रीलिंग', 'नपुंसकलिंग', 'उभयलिंग'], answer: 'पुल्लिंग' }
        ]
    },
    vocabulary: {
        title: 'शब्दावली (Vocabulary)',
        category: 'शब्दावली',
        emoji: '📚',
        xpPerQuestion: 20,
        questions: [
            { q: '"Sun" को हिंदी में क्या कहते हैं?', options: ['चाँद', 'सूरज', 'तारा', 'आकाश'], answer: 'सूरज' },
            { q: '"Water" को हिंदी में क्या कहते हैं?', options: ['आग', 'हवा', 'पानी', 'मिट्टी'], answer: 'पानी' },
            { q: '"Book" को हिंदी में क्या कहते हैं?', options: ['कलम', 'पुस्तक', 'कागज', 'मेज'], answer: 'पुस्तक' },
            { q: '"Mother" को हिंदी में क्या कहते हैं?', options: ['पिता', 'माता', 'भाई', 'बहन'], answer: 'माता' },
            { q: '"School" को हिंदी में क्या कहते हैं?', options: ['घर', 'विद्यालय', 'बाजार', 'मंदिर'], answer: 'विद्यालय' },
            { q: '"फूल" का English अर्थ क्या है?', options: ['Tree', 'Leaf', 'Flower', 'Fruit'], answer: 'Flower' },
            { q: '"आकाश" का English अर्थ क्या है?', options: ['Earth', 'Sky', 'Sea', 'Mountain'], answer: 'Sky' },
            { q: '"पक्षी" का English अर्थ क्या है?', options: ['Animal', 'Bird', 'Fish', 'Insect'], answer: 'Bird' },
            { q: '"नदी" का English अर्थ क्या है?', options: ['Lake', 'River', 'Ocean', 'Pond'], answer: 'River' },
            { q: '"पर्वत" का English अर्थ क्या है?', options: ['Hill', 'Mountain', 'Valley', 'Plain'], answer: 'Mountain' }
        ]
    },
    muhavare: {
        title: 'मुहावरे (Idioms)',
        category: 'मुहावरे',
        emoji: '💬',
        xpPerQuestion: 20,
        questions: [
            { q: '"आँखों का तारा" का अर्थ है?', options: ['आँख में कुछ गिरना', 'बहुत प्यारा', 'तारा देखना', 'आँख दुखना'], answer: 'बहुत प्यारा' },
            { q: '"नाक में दम करना" का अर्थ है?', options: ['साँस लेना', 'बहुत परेशान करना', 'नाक साफ करना', 'रोना'], answer: 'बहुत परेशान करना' },
            { q: '"हाथ पैर फूलना" का अर्थ है?', options: ['खुश होना', 'घबरा जाना', 'थक जाना', 'सूज जाना'], answer: 'घबरा जाना' },
            { q: '"अंधे की लाठी" का अर्थ है?', options: ['लाठी', 'एकमात्र सहारा', 'अंधापन', 'कमजोरी'], answer: 'एकमात्र सहारा' },
            { q: '"आग बबूला होना" का अर्थ है?', options: ['जलना', 'बहुत गुस्सा होना', 'गर्मी लगना', 'तेज होना'], answer: 'बहुत गुस्सा होना' },
            { q: '"अपना उल्लू सीधा करना" का अर्थ है?', options: ['उल्लू पालना', 'अपना काम निकालना', 'सीधा चलना', 'पढ़ाई करना'], answer: 'अपना काम निकालना' },
            { q: '"दाल में कुछ काला होना" का अर्थ है?', options: ['दाल जलना', 'कुछ गड़बड़ होना', 'काली दाल', 'खाना खराब'], answer: 'कुछ गड़बड़ होना' },
            { q: '"नौ दो ग्यारह होना" का अर्थ है?', options: ['गणित करना', 'भाग जाना', 'गिनती करना', 'हिसाब करना'], answer: 'भाग जाना' },
            { q: '"घी के दिये जलाना" का अर्थ है?', options: ['पूजा करना', 'खुशी मनाना', 'रोशनी करना', 'खर्चा करना'], answer: 'खुशी मनाना' },
            { q: '"ईंट से ईंट बजाना" का अर्थ है?', options: ['मकान बनाना', 'पूरी तरह नष्ट करना', 'ईंटें तोड़ना', 'शोर करना'], answer: 'पूरी तरह नष्ट करना' }
        ]
    },
    paryayvachi: {
        title: 'पर्यायवाची शब्द (Synonyms)',
        category: 'पर्यायवाची',
        emoji: '🔄',
        xpPerQuestion: 15,
        questions: [
            { q: '"जल" का पर्यायवाची शब्द है?', options: ['आग', 'पानी', 'हवा', 'मिट्टी'], answer: 'पानी' },
            { q: '"सूर्य" का पर्यायवाची शब्द है?', options: ['चंद्रमा', 'रवि', 'तारा', 'ग्रह'], answer: 'रवि' },
            { q: '"आकाश" का पर्यायवाची शब्द है?', options: ['नभ', 'धरती', 'समुद्र', 'पर्वत'], answer: 'नभ' },
            { q: '"पुष्प" का पर्यायवाची शब्द है?', options: ['पत्ता', 'फूल', 'फल', 'जड़'], answer: 'फूल' },
            { q: '"वायु" का पर्यायवाची शब्द है?', options: ['पानी', 'आग', 'हवा', 'आकाश'], answer: 'हवा' },
            { q: '"नयन" का पर्यायवाची शब्द है?', options: ['नाक', 'कान', 'आँख', 'मुँह'], answer: 'आँख' },
            { q: '"गृह" का पर्यायवाची शब्द है?', options: ['घर', 'बाजार', 'स्कूल', 'मंदिर'], answer: 'घर' },
            { q: '"वृक्ष" का पर्यायवाची शब्द है?', options: ['पौधा', 'पेड़', 'फूल', 'घास'], answer: 'पेड़' },
            { q: '"मार्ग" का पर्यायवाची शब्द है?', options: ['नदी', 'पर्वत', 'रास्ता', 'समुद्र'], answer: 'रास्ता' },
            { q: '"नेत्र" का पर्यायवाची शब्द है?', options: ['हाथ', 'पैर', 'आँख', 'सिर'], answer: 'आँख' }
        ]
    },
    vilom: {
        title: 'विलोम शब्द (Antonyms)',
        category: 'विलोम',
        emoji: '↔️',
        xpPerQuestion: 15,
        questions: [
            { q: '"दिन" का विलोम शब्द है?', options: ['सुबह', 'शाम', 'रात', 'दोपहर'], answer: 'रात' },
            { q: '"सुख" का विलोम शब्द है?', options: ['खुशी', 'दुख', 'आनंद', 'प्रसन्नता'], answer: 'दुख' },
            { q: '"सच" का विलोम शब्द है?', options: ['सत्य', 'झूठ', 'ईमानदार', 'अच्छा'], answer: 'झूठ' },
            { q: '"अमीर" का विलोम शब्द है?', options: ['धनी', 'गरीब', 'संपन्न', 'समृद्ध'], answer: 'गरीब' },
            { q: '"गर्म" का विलोम शब्द है?', options: ['तेज', 'ठंडा', 'गुनगुना', 'जलता'], answer: 'ठंडा' },
            { q: '"आगे" का विलोम शब्द है?', options: ['सामने', 'पीछे', 'ऊपर', 'नीचे'], answer: 'पीछे' },
            { q: '"जीवन" का विलोम शब्द है?', options: ['जन्म', 'मृत्यु', 'उम्र', 'बचपन'], answer: 'मृत्यु' },
            { q: '"नया" का विलोम शब्द है?', options: ['ताजा', 'पुराना', 'अच्छा', 'सुंदर'], answer: 'पुराना' },
            { q: '"प्रेम" का विलोम शब्द है?', options: ['प्यार', 'घृणा', 'स्नेह', 'दया'], answer: 'घृणा' },
            { q: '"सफल" का विलोम शब्द है?', options: ['विजयी', 'असफल', 'कामयाब', 'जीतना'], answer: 'असफल' }
        ]
    },
    translation: {
        title: 'अनुवाद (Translation)',
        category: 'अनुवाद',
        emoji: '🔤',
        xpPerQuestion: 25,
        questions: [
            { q: '"मैं स्कूल जाता हूँ" का English अनुवाद?', options: ['I go to school', 'I am at school', 'I like school', 'School is good'], answer: 'I go to school' },
            { q: '"The sky is blue" का Hindi अनुवाद?', options: ['आकाश लाल है', 'आकाश नीला है', 'आकाश हरा है', 'आकाश सफेद है'], answer: 'आकाश नीला है' },
            { q: '"मेरा नाम राम है" का English अनुवाद?', options: ['My name is Ram', 'His name is Ram', 'Your name is Ram', 'Ram is my friend'], answer: 'My name is Ram' },
            { q: '"She is eating food" का Hindi अनुवाद?', options: ['वह खाना बना रही है', 'वह खाना खा रही है', 'वह खाना ला रही है', 'वह खाना दे रही है'], answer: 'वह खाना खा रही है' },
            { q: '"भारत मेरा देश है" का English अनुवाद?', options: ['India is big', 'I love India', 'India is my country', 'India is beautiful'], answer: 'India is my country' },
            { q: '"The sun rises in the east" का Hindi अनुवाद?', options: ['सूरज पश्चिम में उगता है', 'सूरज पूर्व में उगता है', 'सूरज उत्तर में उगता है', 'सूरज दक्षिण में उगता है'], answer: 'सूरज पूर्व में उगता है' },
            { q: '"बच्चे खेल रहे हैं" का English अनुवाद?', options: ['Children are sleeping', 'Children are playing', 'Children are eating', 'Children are studying'], answer: 'Children are playing' },
            { q: '"I love my mother" का Hindi अनुवाद?', options: ['मैं अपनी माँ से प्यार करता हूँ', 'मेरी माँ अच्छी है', 'मेरी माँ खाना बनाती है', 'मेरी माँ सो रही है'], answer: 'मैं अपनी माँ से प्यार करता हूँ' },
            { q: '"पानी जीवन है" का English अनुवाद?', options: ['Water is useful', 'Water is life', 'Water is clean', 'Water is cold'], answer: 'Water is life' },
            { q: '"Birds fly in the sky" का Hindi अनुवाद?', options: ['पक्षी पानी में तैरते हैं', 'पक्षी पेड़ पर बैठते हैं', 'पक्षी आकाश में उड़ते हैं', 'पक्षी खाना खाते हैं'], answer: 'पक्षी आकाश में उड़ते हैं' }
        ]
    }
};

// Quotes of the Day
const quotesOfDay = [
    { quote: '"सत्यमेव जयते"', meaning: 'Truth alone triumphs' },
    { quote: '"अहिंसा परमो धर्मः"', meaning: 'Non-violence is the highest duty' },
    { quote: '"वसुधैव कुटुम्बकम्"', meaning: 'The world is one family' },
    { quote: '"विद्या ददाति विनयम्"', meaning: 'Knowledge gives humility' },
    { quote: '"कर्मण्येवाधिकारस्ते"', meaning: 'You have the right to work only' },
    { quote: '"श्रम एव जयते"', meaning: 'Hard work always pays' },
    { quote: '"सत्संगति कथय किं न करोति"', meaning: 'Good company transforms all' }
];

// ============================================
// QUIZ STATE
// ============================================
let quizState = {
    mode: null,
    questions: [],
    currentIndex: 0,
    correct: 0,
    wrong: 0,
    xpEarned: 0,
    userAnswers: [] // Track user's answers for explanations
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerData();
    initTheme();
    setQuoteOfDay();
    updateUI();
});

function loadPlayerData() {
    if (window.BroProPlayer) {
        const profile = BroProPlayer.load();
        document.getElementById('xpCount').textContent = profile.xp;
    }
}

function updateUI() {
    if (window.BroProPlayer) {
        const profile = BroProPlayer.load();
        document.getElementById('xpCount').textContent = profile.xp;
    }
}

function setQuoteOfDay() {
    const today = new Date().getDay();
    const qod = quotesOfDay[today % quotesOfDay.length];
    document.getElementById('qodQuote').textContent = qod.quote;
    document.getElementById('qodMeaning').textContent = qod.meaning;
}

// ============================================
// ACTIVITY OPENER
// ============================================

// Activity order for access control (first one is free)
// IDs must match the onclick handlers in index.html
const hindiActivityOrder = ['grammar', 'vocabulary', 'muhavare', 'paryayvachi', 'vilom', 'translation'];

function openActivity(mode) {
    const data = hindiData[mode];
    if (!data) return;

    // Check access - first activity is free, others need login
    const activityIndex = hindiActivityOrder.indexOf(mode);

    // Block access for non-first activities if not logged in OR not premium
    if (activityIndex > 0) {
        // First check if logged in
        if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
            if (window.BroProAuth) {
                BroProAuth.showLoginRequired(`"${data.title}" अनलॉक करने के लिए लॉगिन करें!`);
            } else {
                alert('Please login to access this activity!');
            }
            return;
        }

        // Then check if premium (only for logged in users)
        if (window.BroProPremium && !BroProPremium.isPremium()) {
            BroProPremium.showPremiumRequired(data.title);
            return;
        }
    }

    quizState.mode = mode;
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = []; // Reset user answers
    quizState.questions = shuffleArray([...data.questions]);

    // Update header
    document.getElementById('quizCategory').textContent = data.category;
    document.getElementById('quizTitle').textContent = data.title;
    document.getElementById('totalQ').textContent = quizState.questions.length;

    // Reset stats
    document.getElementById('correctCount').textContent = '0';
    document.getElementById('wrongCount').textContent = '0';
    document.getElementById('xpCount2').textContent = '0';

    document.getElementById('quizModal').classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    const data = hindiData[quizState.mode];

    document.getElementById('currentQ').textContent = quizState.currentIndex + 1;
    document.getElementById('questionEmoji').textContent = data.emoji;
    document.getElementById('questionText').textContent = q.q;

    // Progress
    const progress = (quizState.currentIndex / quizState.questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Shuffle options for random order each time
    const shuffledOptions = shuffleArray([...q.options]);

    // Options
    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = shuffledOptions.map(opt => `
        <button class="option-btn" onclick="selectOption(this, '${opt.replace(/'/g, "\\'")}')">${opt}</button>
    `).join('');

    // Hide feedback
    document.getElementById('feedbackBox').className = 'feedback-box';
}

function selectOption(btn, answer) {
    const q = quizState.questions[quizState.currentIndex];
    const data = hindiData[quizState.mode];
    const isCorrect = answer === q.answer;

    // Track user's answer for explanations
    quizState.userAnswers[quizState.currentIndex] = answer;

    // Disable buttons
    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.textContent === q.answer) b.classList.add('correct');
    });

    const feedback = document.getElementById('feedbackBox');

    if (isCorrect) {
        btn.classList.add('correct');
        quizState.correct++;
        quizState.xpEarned += data.xpPerQuestion;

        feedback.className = 'feedback-box visible correct';
        document.getElementById('feedbackIcon').textContent = '✅';
        document.getElementById('feedbackText').textContent = 'सही! +' + data.xpPerQuestion + ' XP';

        // Use recordCorrect for streak tracking
        if (window.BroProSounds) BroProSounds.recordCorrect();
    } else {
        btn.classList.add('wrong');
        quizState.wrong++;

        feedback.className = 'feedback-box visible wrong';
        document.getElementById('feedbackIcon').textContent = '❌';
        document.getElementById('feedbackText').textContent = 'उत्तर: ' + q.answer;

        // Use recordWrong for streak tracking
        if (window.BroProSounds) BroProSounds.recordWrong();
    }

    // Update stats
    document.getElementById('correctCount').textContent = quizState.correct;
    document.getElementById('wrongCount').textContent = quizState.wrong;
    document.getElementById('xpCount2').textContent = quizState.xpEarned;

    // Show inline explanation then advance on user click
    if (window.BroProInlineExp) {
        BroProInlineExp.show({
            question: q.q,
            answer: answer,
            correctAnswer: q.answer,
            isCorrect: isCorrect,
            options: q.options,
            explanation: q.explanation || null
        }, () => {
            quizState.currentIndex++;
            if (quizState.currentIndex >= quizState.questions.length) {
                endQuiz();
            } else {
                loadQuestion();
            }
        });
    } else {
        setTimeout(() => {
            quizState.currentIndex++;
            if (quizState.currentIndex >= quizState.questions.length) {
                endQuiz();
            } else {
                loadQuestion();
            }
        }, 1500);
    }
}

// ============================================
// END QUIZ
// ============================================
function endQuiz() {
    document.getElementById('quizModal').classList.remove('active');

    const total = quizState.questions.length;
    const accuracy = Math.round((quizState.correct / total) * 100);

    // Calculate XP with mastery multiplier
    let finalXP = quizState.xpEarned;
    let xpMessage = null;

    if (window.BroProPlayer) {
        // Get XP multiplier based on mastery status
        const multiplierInfo = BroProPlayer.calculateXPMultiplier('hindi', quizState.mode, accuracy);
        finalXP = Math.floor(quizState.xpEarned * multiplierInfo.multiplier);
        xpMessage = multiplierInfo.message;

        // Record this quiz completion
        BroProPlayer.recordQuizCompletion('hindi', quizState.mode, quizState.correct, total);

        // Add the adjusted XP
        BroProPlayer.addXP(finalXP, 'hindi');
        updateUI();

        console.log(`📊 Hindi Quiz Complete - Raw XP: ${quizState.xpEarned}, Multiplier: ${multiplierInfo.multiplier}, Final XP: ${finalXP}`);
    }

    document.getElementById('finalCorrect').textContent = quizState.correct;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalXP').textContent = finalXP;

    // Show practice mode indicator if applicable
    const resultsXPElement = document.getElementById('finalXP');
    if (xpMessage && resultsXPElement && finalXP < quizState.xpEarned) {
        resultsXPElement.innerHTML = `${finalXP} <small style="font-size:0.6em;opacity:0.7">(अभ्यास)</small>`;
    }

    const title = accuracy >= 90 ? '🌟 शानदार!' :
        accuracy >= 70 ? '🎉 बहुत अच्छा!' :
            accuracy >= 50 ? '👍 अच्छा प्रयास!' :
                '💪 और अभ्यास करें!';
    document.getElementById('resultsTitle').textContent = title;

    const icon = accuracy >= 90 ? '🏆' :
        accuracy >= 70 ? '🥈' :
            accuracy >= 50 ? '🥉' : '📖';
    document.getElementById('resultsIcon').textContent = icon;

    document.getElementById('resultsModal').classList.add('active');

    // Store quiz results for explanations
    if (window.BroProExplanations) {
        BroProExplanations.storeQuizResults(quizState.questions, quizState.userAnswers, 'hindi', quizState.mode);
    }

    if (accuracy >= 70 && window.BroProEffects) {
        BroProEffects.confetti();
    }

    // 🎰 Check for Saat Crore Easter Egg (7 quizzes with 90%+ accuracy)
    if (window.SaatCroreEasterEgg) {
        SaatCroreEasterEgg.recordPerfectQuiz(accuracy, quizState.mode);
    }

    // 📢 Log to real-time activity feed (visible to all users)
    if (window.logQuizActivity) {
        logQuizActivity('hindi', finalXP, accuracy);
    }
}

// Open Explanations after quiz
function openExplanations() {
    document.getElementById('resultsModal').classList.remove('active');
    if (window.BroProExplanations) {
        BroProExplanations.open();
    } else {
        alert('Explanations will be available soon!');
    }
}

function closeQuiz() {
    document.getElementById('quizModal').classList.remove('active');
}

function replayQuiz() {
    document.getElementById('resultsModal').classList.remove('active');
    openActivity(quizState.mode);
}

function closeResults() {
    document.getElementById('resultsModal').classList.remove('active');
}

// ============================================
// THEME
// ============================================
function initTheme() {
    const saved = localStorage.getItem('supersite-theme') || 'dark';
    document.body.setAttribute('data-theme', saved);
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
}

document.getElementById('themeToggle').addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('supersite-theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    document.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ============================================
// UTILITIES
// ============================================
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ============================================
// LEADERBOARD
// ============================================
let currentHindiPeriod = 'alltime';

function openLeaderboard() {
    if (!window.BroProPlayer || !BroProPlayer.isLoggedIn()) {
        BroProAuth.showLoginRequired('लीडरबोर्ड देखने के लिए लॉगिन करें!');
        return;
    }
    renderLeaderboard();
    document.getElementById('leaderboardModal').classList.add('active');
}

function closeLeaderboard() {
    document.getElementById('leaderboardModal').classList.remove('active');
}

function switchTab(period) {
    currentHindiPeriod = period;

    const tabs = document.querySelectorAll('#hindiLeaderboardTabs .tab-btn');
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

    renderLeaderboard(period);
}

function renderLeaderboard(period = 'alltime') {
    const currentPlayer = window.BroProPlayer?.getName() || null;
    const list = document.getElementById('leaderboardList');

    if (window.BroProLeaderboard && BroProLeaderboard.db) {
        list.innerHTML = '<div style="text-align:center;padding:2rem;"><div style="font-size:2rem;animation:spin 1s linear infinite;">⏳</div><p>लोड हो रहा है...</p></div>';

        BroProLeaderboard.renderLeaderboard('leaderboardList', 'hindi', {
            showDelete: false,
            limit: 20,
            period: period
        });

        BroProLeaderboard.getUserRank('hindi').then(rankInfo => {
            document.getElementById('yourPosition').textContent = rankInfo.rank;
            document.getElementById('yourScore').textContent = rankInfo.xp.toLocaleString();
        });

    } else {
        const leaderboard = JSON.parse(localStorage.getItem('supersite-leaderboard-hindi') || '[]');
        leaderboard.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        if (leaderboard.length === 0) {
            list.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">अभी कोई खिलाड़ी नहीं है। #1 बनने के लिए खेलें!</p>';
        } else {
            list.innerHTML = leaderboard.slice(0, 10).map((player, i) => `
                <div class="leaderboard-item ${i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : ''} ${player.name === currentPlayer ? 'is-player' : ''}">
                    <span class="rank-number">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</span>
                    <span class="player-avatar">${player.avatar || '📖'}</span>
                    <span class="player-name">${player.name || 'Anonymous'}${player.name === currentPlayer ? ' (आप)' : ''}</span>
                    <span class="player-score">${(player.xp || 0).toLocaleString()} XP</span>
                </div>
            `).join('');
        }

        const yourIdx = leaderboard.findIndex(p => p.name === currentPlayer);
        document.getElementById('yourPosition').textContent = yourIdx >= 0 ? yourIdx + 1 : '-';
        document.getElementById('yourScore').textContent = yourIdx >= 0 ? (leaderboard[yourIdx].xp || 0).toLocaleString() : '0';
    }
}

