// ============================================
// JNV CLASS 9 EXAM - CORE JAVASCRIPT
// Tab Navigation, Quiz Logic, Leaderboard
// ============================================

// ============================================
// TAB NAVIGATION
// ============================================
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.jnv-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // Update panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `${tabName}-panel`);
    });

    // Scroll to top of content
    window.scrollTo({ top: 400, behavior: 'smooth' });

    // Load leaderboard if switching to that tab
    if (tabName === 'leaderboard') {
        loadJNVLeaderboard();
    }
}

function scrollToSection(section) {
    switchTab(section);
}

// ============================================
// QUIZ SYSTEM
// ============================================
let currentQuiz = {
    subject: null,
    questions: [],
    currentIndex: 0,
    correct: 0,
    wrong: 0,
    xp: 0
};

function startPractice(subject) {
    // Check if questions exist
    if (!window.JNV_QUESTIONS || !JNV_QUESTIONS[subject]) {
        showToast('⏳ Questions coming soon!');
        return;
    }

    const questions = JNV_QUESTIONS[subject];
    if (questions.length === 0) {
        showToast('⏳ Questions coming soon!');
        return;
    }

    // Initialize quiz
    currentQuiz = {
        subject: subject,
        questions: shuffleArray([...questions]).slice(0, 10), // Random 10 questions
        currentIndex: 0,
        correct: 0,
        wrong: 0,
        xp: 0
    };

    // Update modal UI
    const lang = currentLanguage || 'en';
    const subjectNames = {
        english: '🇬🇧 English Practice',
        hindi: '🇮🇳 Hindi Practice',
        maths: lang === 'hi' ? '📐 गणित अभ्यास' : '📐 Mathematics Practice',
        science: lang === 'hi' ? '🔬 विज्ञान अभ्यास' : '🔬 Science Practice'
    };
    document.getElementById('quizMode').textContent = subjectNames[subject] || (lang === 'hi' ? '🎯 अभ्यास' : '🎯 Practice');
    document.getElementById('quizTotal').textContent = currentQuiz.questions.length;
    document.getElementById('quizXP').textContent = '0';

    // Show modal
    document.getElementById('quizModal').classList.add('active');

    // Render first question
    renderQuizQuestion();
}

function startPYQ(year) {
    const pyqKey = `pyq${year}`;

    console.log('🎯 Starting PYQ:', year, 'Key:', pyqKey);
    console.log('📚 JNV_QUESTIONS available:', !!window.JNV_QUESTIONS);
    console.log('📋 PYQ data:', JNV_QUESTIONS?.[pyqKey]?.length || 0, 'questions');

    if (!window.JNV_QUESTIONS || !JNV_QUESTIONS[pyqKey]) {
        showToast('⏳ This paper is coming soon!');
        return;
    }

    const questions = JNV_QUESTIONS[pyqKey];

    if (!questions || questions.length === 0) {
        showToast('⏳ Questions are being added!');
        return;
    }

    // Start CBT Exam Mode
    startCBTExam(year, questions);
}

// ============================================
// CBT EXAM SYSTEM
// ============================================
let cbtExam = {
    year: null,
    questions: [],
    currentIndex: 0,
    answers: [],        // User's selected answers (-1 = not answered)
    status: [],         // 'not-visited', 'visited', 'answered', 'marked', 'answered-marked'
    timeRemaining: 0,   // in seconds
    timerInterval: null,
    isSubmitted: false
};

function startCBTExam(year, questions) {
    // Initialize exam state
    cbtExam = {
        year: year,
        questions: [...questions],
        currentIndex: 0,
        answers: new Array(questions.length).fill(-1),
        status: new Array(questions.length).fill('not-visited'),
        timeRemaining: 150 * 60, // 2.5 hours = 150 minutes
        timerInterval: null,
        isSubmitted: false
    };

    // Mark first question as visited
    cbtExam.status[0] = 'visited';

    // Update exam title
    document.getElementById('cbtExamTitle').textContent = `JNV Class 9 - PYQ ${year}`;
    document.getElementById('cbtTotalQ').textContent = questions.length;

    // Update user info
    const user = firebase.auth().currentUser;
    if (user) {
        document.getElementById('cbtUserName').textContent = user.displayName || 'Student';
        document.getElementById('cbtUserId').textContent = user.email || '';
    }

    // Render question grid
    renderCBTQuestionGrid();

    // Render first question
    renderCBTQuestion();

    // Start timer
    startCBTTimer();

    // Show CBT interface
    document.getElementById('cbtExam').classList.add('active');
    document.body.style.overflow = 'hidden';

    console.log('✅ CBT Exam started:', questions.length, 'questions');
}

function renderCBTQuestionGrid() {
    const grid = document.getElementById('cbtQuestionGrid');
    let html = '';

    cbtExam.questions.forEach((q, i) => {
        const statusClass = cbtExam.status[i];
        const currentClass = i === cbtExam.currentIndex ? 'current' : '';
        html += `<button class="cbt-q-btn ${statusClass} ${currentClass}" onclick="goToCBTQuestion(${i})">${i + 1}</button>`;
    });

    grid.innerHTML = html;
}

function renderCBTQuestion() {
    const q = cbtExam.questions[cbtExam.currentIndex];
    const i = cbtExam.currentIndex;
    const lang = currentLanguage || 'en';

    // Update question number
    document.getElementById('cbtCurrentQ').textContent = i + 1;

    // Update section badge with translation
    let section = 'Hindi';
    let sectionHi = 'हिंदी';
    if (i >= 15 && i < 30) { section = 'English'; sectionHi = 'अंग्रेजी'; }
    else if (i >= 30 && i < 65) { section = 'Mathematics'; sectionHi = 'गणित'; }
    else if (i >= 65) { section = 'Science'; sectionHi = 'विज्ञान'; }

    const sectionBadge = lang === 'hi'
        ? `📚 खंड: ${sectionHi}`
        : `📚 Section: ${section}`;
    document.getElementById('cbtSection').innerHTML = `<span class="section-badge">${sectionBadge}</span>`;

    // Determine if we should show Hindi (for Math/Science, not Hindi/English sections)
    const canTranslate = (i >= 30 && i < 65) || (i >= 65); // Math or Science
    const showHindi = lang === 'hi' && canTranslate;

    // Get question text (use Hindi if available and in Hindi mode for Math/Science)
    const questionText = (showHindi && q.question_hi) ? q.question_hi : q.question;
    document.getElementById('cbtQuestionText').textContent = questionText;

    // Get options (use Hindi if available)
    const options = (showHindi && q.options_hi) ? q.options_hi : q.options;

    // Render options
    const letters = ['A', 'B', 'C', 'D', 'अ', 'आ', 'इ', 'ई'];
    const optLetters = lang === 'hi' ? letters.slice(4) : letters.slice(0, 4);
    const optionsHTML = options.map((opt, optIndex) => {
        const selectedClass = cbtExam.answers[i] === optIndex ? 'selected' : '';
        return `
            <div class="cbt-option ${selectedClass}" onclick="selectCBTOption(${optIndex})">
                <span class="option-letter">${optLetters[optIndex] || letters[optIndex]}</span>
                <span class="option-text">${opt}</span>
            </div>
        `;
    }).join('');
    document.getElementById('cbtOptions').innerHTML = optionsHTML;

    // Update mark for review button with translation
    const markBtn = document.querySelector('.cbt-action-btn.mark-review');
    const markText = lang === 'hi' ? '🔖 समीक्षा के लिए चिह्नित' : '🔖 Mark for Review';
    const markedText = lang === 'hi' ? '🔖 समीक्षा के लिए चिह्नित ✓' : '🔖 Marked for Review';

    if (cbtExam.status[i] === 'marked' || cbtExam.status[i] === 'answered-marked') {
        markBtn.classList.add('active');
        markBtn.innerHTML = `<span>${markedText}</span>`;
    } else {
        markBtn.classList.remove('active');
        markBtn.innerHTML = `<span>${markText}</span>`;
    }

    // Update other CBT interface elements with translations
    updateCBTTranslations();

    // Update question grid to highlight current
    renderCBTQuestionGrid();
}

// Update all CBT interface text based on language
function updateCBTTranslations() {
    const lang = currentLanguage || 'en';

    // Timer label
    const timerLabel = document.querySelector('.timer-label');
    if (timerLabel) timerLabel.textContent = lang === 'hi' ? 'शेष समय:' : 'Time Left:';

    // Submit button
    const submitBtn = document.querySelector('.cbt-submit-btn span');
    if (submitBtn) submitBtn.textContent = lang === 'hi' ? '📤 परीक्षा जमा करें' : '📤 Submit Exam';

    // Clear response button
    const clearBtn = document.querySelector('.cbt-action-btn.secondary span');
    if (clearBtn) clearBtn.textContent = lang === 'hi' ? '🗑️ उत्तर मिटाएं' : '🗑️ Clear Response';

    // Navigation buttons
    const prevBtn = document.querySelector('.cbt-nav-btn.prev');
    if (prevBtn) prevBtn.textContent = lang === 'hi' ? '← पिछला' : '← Previous';

    const nextBtn = document.querySelector('.cbt-nav-btn.save-next');
    if (nextBtn) nextBtn.textContent = lang === 'hi' ? 'सहेजें और अगला →' : 'Save & Next →';

    // Legend items
    const legendTexts = {
        'answered': { en: 'Answered', hi: 'उत्तर दिया' },
        'not-answered': { en: 'Not Answered', hi: 'उत्तर नहीं दिया' },
        'not-visited': { en: 'Not Visited', hi: 'नहीं देखा' },
        'marked': { en: 'Marked for Review', hi: 'समीक्षा चिह्नित' },
        'answered-marked': { en: 'Answered & Marked', hi: 'उत्तर और चिह्नित' }
    };
    document.querySelectorAll('.legend-item').forEach(item => {
        const box = item.querySelector('.legend-box');
        const text = item.querySelector('span:last-child');
        if (!box || !text) return;
        for (const [cls, translations] of Object.entries(legendTexts)) {
            if (box.classList.contains(cls)) {
                text.textContent = translations[lang];
                break;
            }
        }
    });
}

function selectCBTOption(optIndex) {
    const i = cbtExam.currentIndex;
    cbtExam.answers[i] = optIndex;

    // Update status
    if (cbtExam.status[i] === 'marked' || cbtExam.status[i] === 'answered-marked') {
        cbtExam.status[i] = 'answered-marked';
    } else {
        cbtExam.status[i] = 'answered';
    }

    // Re-render
    renderCBTQuestion();
}

function clearResponse() {
    const i = cbtExam.currentIndex;
    cbtExam.answers[i] = -1;

    // Update status
    if (cbtExam.status[i] === 'answered-marked') {
        cbtExam.status[i] = 'marked';
    } else {
        cbtExam.status[i] = 'visited';
    }

    renderCBTQuestion();
    const msg = currentLanguage === 'hi' ? 'उत्तर मिटा दिया गया' : 'Response cleared';
    showToast(msg);
}

function markForReview() {
    const i = cbtExam.currentIndex;
    const lang = currentLanguage || 'en';

    if (cbtExam.status[i] === 'marked' || cbtExam.status[i] === 'answered-marked') {
        // Unmark
        if (cbtExam.answers[i] !== -1) {
            cbtExam.status[i] = 'answered';
        } else {
            cbtExam.status[i] = 'visited';
        }
        showToast(lang === 'hi' ? 'समीक्षा से हटाया गया' : 'Removed from review');
    } else {
        // Mark
        if (cbtExam.answers[i] !== -1) {
            cbtExam.status[i] = 'answered-marked';
        } else {
            cbtExam.status[i] = 'marked';
        }
        showToast('Marked for review');
    }

    renderCBTQuestion();
}

function goToCBTQuestion(index) {
    if (index < 0 || index >= cbtExam.questions.length) return;

    cbtExam.currentIndex = index;

    // Mark as visited if not visited
    if (cbtExam.status[index] === 'not-visited') {
        cbtExam.status[index] = 'visited';
    }

    renderCBTQuestion();
}

function cbtPrevQuestion() {
    if (cbtExam.currentIndex > 0) {
        goToCBTQuestion(cbtExam.currentIndex - 1);
    }
}

function cbtSaveAndNext() {
    if (cbtExam.currentIndex < cbtExam.questions.length - 1) {
        goToCBTQuestion(cbtExam.currentIndex + 1);
    } else {
        showToast('This is the last question. Click Submit to finish.');
    }
}

function switchCBTSection(section) {
    // Update section tabs
    document.querySelectorAll('.cbt-section-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.section === section);
    });

    // Go to first question of section
    let startIndex = 0;
    switch (section) {
        case 'hindi': startIndex = 0; break;
        case 'english': startIndex = 15; break;
        case 'maths': startIndex = 30; break;
        case 'science': startIndex = 65; break;
    }

    if (startIndex < cbtExam.questions.length) {
        goToCBTQuestion(startIndex);
    }
}

// Timer
function startCBTTimer() {
    updateCBTTimerDisplay();
    cbtExam.timerInterval = setInterval(() => {
        cbtExam.timeRemaining--;
        updateCBTTimerDisplay();

        if (cbtExam.timeRemaining <= 0) {
            clearInterval(cbtExam.timerInterval);
            showToast('⏰ Time\'s up! Submitting exam...');
            setTimeout(() => confirmSubmitExam(), 1500);
        }

        // Warning at 10 minutes
        if (cbtExam.timeRemaining === 600) {
            showToast('⚠️ 10 minutes remaining!');
        }
        // Warning at 5 minutes
        if (cbtExam.timeRemaining === 300) {
            showToast('⚠️ Only 5 minutes left!');
        }
    }, 1000);
}

function updateCBTTimerDisplay() {
    const hours = Math.floor(cbtExam.timeRemaining / 3600);
    const minutes = Math.floor((cbtExam.timeRemaining % 3600) / 60);
    const seconds = cbtExam.timeRemaining % 60;

    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('cbtTimeDisplay').textContent = display;

    // Change color when time is low
    const timer = document.getElementById('cbtTimer');
    if (cbtExam.timeRemaining <= 300) {
        timer.style.background = 'rgba(239, 68, 68, 0.3)';
        timer.style.animation = 'pulse 1s infinite';
    } else if (cbtExam.timeRemaining <= 600) {
        timer.style.background = 'rgba(245, 158, 11, 0.2)';
    }
}

// Submit Exam
function submitCBTExam() {
    // Calculate summary
    let answered = 0, notAnswered = 0, marked = 0, notVisited = 0;

    cbtExam.status.forEach((s, i) => {
        if (s === 'not-visited') notVisited++;
        else if (s === 'answered' || s === 'answered-marked') answered++;
        else if (s === 'marked') { marked++; notAnswered++; }
        else notAnswered++;
    });

    // But actually count based on answers array
    answered = cbtExam.answers.filter(a => a !== -1).length;
    notAnswered = cbtExam.answers.filter(a => a === -1).length - notVisited;
    if (notAnswered < 0) notAnswered = 0;

    // Update summary modal
    document.getElementById('summaryTotal').textContent = cbtExam.questions.length;
    document.getElementById('summaryAnswered').textContent = answered;
    document.getElementById('summaryNotAnswered').textContent = cbtExam.questions.length - answered - notVisited;
    document.getElementById('summaryMarked').textContent = cbtExam.status.filter(s => s === 'marked' || s === 'answered-marked').length;
    document.getElementById('summaryNotVisited').textContent = notVisited;

    // Show submit modal
    document.getElementById('cbtSubmitModal').classList.add('active');
}

function closeSubmitModal() {
    document.getElementById('cbtSubmitModal').classList.remove('active');
}

function confirmSubmitExam() {
    if (cbtExam.isSubmitted) return;
    cbtExam.isSubmitted = true;

    // Stop timer
    clearInterval(cbtExam.timerInterval);

    // Close submit modal
    closeSubmitModal();

    // Calculate results
    let correct = 0, wrong = 0, skipped = 0;

    cbtExam.questions.forEach((q, i) => {
        if (cbtExam.answers[i] === -1) {
            skipped++;
        } else if (cbtExam.answers[i] === q.correct) {
            correct++;
        } else {
            wrong++;
        }
    });

    const total = cbtExam.questions.length;
    const percentage = Math.round((correct / total) * 100);
    const xpEarned = correct * 5;

    // Update result modal
    document.getElementById('resultScore').textContent = correct;
    document.getElementById('resultPercentage').textContent = percentage + '%';
    document.getElementById('resultCorrect').textContent = correct;
    document.getElementById('resultWrong').textContent = wrong;
    document.getElementById('resultSkipped').textContent = skipped;
    document.getElementById('resultXP').textContent = xpEarned;

    // Update icon based on performance
    const icon = document.querySelector('.result-icon');
    if (percentage >= 80) icon.textContent = '🏆';
    else if (percentage >= 60) icon.textContent = '🎉';
    else if (percentage >= 40) icon.textContent = '👍';
    else icon.textContent = '💪';

    // Award XP
    if (window.BroProPlayer && xpEarned > 0) {
        BroProPlayer.addXP(xpEarned, 'jnv-class-9-pyq');
    }

    // Update leaderboard
    updateJNVLeaderboard(xpEarned, correct, total);

    // Show result modal
    document.getElementById('cbtResultModal').classList.add('active');

    console.log('✅ Exam submitted:', { correct, wrong, skipped, percentage, xpEarned });
}

function reviewAnswers() {
    // Close result modal
    document.getElementById('cbtResultModal').classList.remove('active');

    // TODO: Implement answer review mode showing correct answers
    showToast('📋 Review mode coming soon!');
}

function closeCBTExam() {
    // Stop timer
    if (cbtExam.timerInterval) {
        clearInterval(cbtExam.timerInterval);
    }

    // Hide all modals
    document.getElementById('cbtExam').classList.remove('active');
    document.getElementById('cbtSubmitModal').classList.remove('active');
    document.getElementById('cbtResultModal').classList.remove('active');
    document.body.style.overflow = '';

    // Reset state
    cbtExam = {
        year: null,
        questions: [],
        currentIndex: 0,
        answers: [],
        status: [],
        timeRemaining: 0,
        timerInterval: null,
        isSubmitted: false
    };
}


function startMockTest(testNumber) {
    if (testNumber > 1) {
        // Premium test
        showToast('👑 This mock test requires Premium subscription');
        return;
    }

    // Combine questions from all subjects for mock test
    if (!window.JNV_QUESTIONS) {
        showToast('⏳ Mock test coming soon!');
        return;
    }

    let allQuestions = [];
    ['english', 'hindi', 'maths', 'science'].forEach(subject => {
        if (JNV_QUESTIONS[subject]) {
            allQuestions.push(...JNV_QUESTIONS[subject]);
        }
    });

    if (allQuestions.length < 10) {
        showToast('⏳ Not enough questions for mock test!');
        return;
    }

    currentQuiz = {
        subject: 'mock',
        questions: shuffleArray(allQuestions).slice(0, Math.min(100, allQuestions.length)),
        currentIndex: 0,
        correct: 0,
        wrong: 0,
        xp: 0
    };

    document.getElementById('quizMode').textContent = `🎯 Mock Test ${testNumber}`;
    document.getElementById('quizTotal').textContent = currentQuiz.questions.length;
    document.getElementById('quizXP').textContent = '0';

    document.getElementById('quizModal').classList.add('active');
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const lang = currentLanguage || 'en';
    const subject = currentQuiz.subject;

    // Only translate for maths and science, not hindi/english
    const canTranslate = (subject === 'maths' || subject === 'science');
    const showHindi = lang === 'hi' && canTranslate;

    // Update progress
    document.getElementById('quizCurrent').textContent = currentQuiz.currentIndex + 1;
    document.getElementById('quizProgress').style.width =
        `${((currentQuiz.currentIndex) / currentQuiz.questions.length) * 100}%`;

    // Get question text (use Hindi if available for math/science)
    const questionText = (showHindi && q.question_hi) ? q.question_hi : q.question;
    document.getElementById('quizQuestion').innerHTML = questionText;

    // Get options (use Hindi if available)
    const options = (showHindi && q.options_hi) ? q.options_hi : q.options;

    // Render options
    const optionsHTML = options.map((opt, i) => `
        <button class="quiz-option" onclick="selectAnswer(${i})">${opt}</button>
    `).join('');
    document.getElementById('quizOptions').innerHTML = optionsHTML;

    // Hide feedback
    document.getElementById('quizFeedback').className = 'quiz-feedback';
    document.getElementById('quizFeedback').innerHTML = '';
}

function selectAnswer(index) {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const isCorrect = index === q.correct;
    const lang = currentLanguage || 'en';
    const subject = currentQuiz.subject;

    // Only translate for maths and science
    const canTranslate = (subject === 'maths' || subject === 'science');
    const showHindi = lang === 'hi' && canTranslate;

    // Get options for display
    const options = (showHindi && q.options_hi) ? q.options_hi : q.options;

    // Disable all options
    document.querySelectorAll('.quiz-option').forEach((opt, i) => {
        opt.disabled = true;
        if (i === q.correct) opt.classList.add('correct');
        if (i === index && !isCorrect) opt.classList.add('wrong');
    });

    // Show feedback
    const feedback = document.getElementById('quizFeedback');
    if (isCorrect) {
        currentQuiz.correct++;
        currentQuiz.xp += 5;
        feedback.className = 'quiz-feedback correct';
        const correctMsg = lang === 'hi' ? '✅ सही!' : '✅ Correct!';
        feedback.innerHTML = `<strong>${correctMsg}</strong> +5 XP`;
    } else {
        currentQuiz.wrong++;
        feedback.className = 'quiz-feedback wrong';
        const correctAnswer = options[q.correct];
        const incorrectMsg = lang === 'hi' ? '❌ गलत!' : '❌ Incorrect!';
        const answerLabel = lang === 'hi' ? 'सही उत्तर:' : 'Correct answer:';
        feedback.innerHTML = `<strong>${incorrectMsg}</strong><br>${answerLabel} ${correctAnswer}`;

        // Show explanation (use Hindi if available for math/science)
        const explanation = (showHindi && q.explanation_hi) ? q.explanation_hi : q.explanation;
        if (explanation) {
            feedback.innerHTML += `<br><br>💡 ${explanation}`;
        }
    }

    document.getElementById('quizXP').textContent = currentQuiz.xp;

    // Next question after delay
    setTimeout(() => {
        currentQuiz.currentIndex++;
        if (currentQuiz.currentIndex < currentQuiz.questions.length) {
            renderQuizQuestion();
        } else {
            endQuiz();
        }
    }, 2000);
}

function endQuiz() {
    closeQuiz();

    const total = currentQuiz.questions.length;
    const correct = currentQuiz.correct;
    const accuracy = Math.round((correct / total) * 100);
    const xpEarned = currentQuiz.xp;

    // Award XP
    if (window.BroProPlayer && xpEarned > 0) {
        BroProPlayer.addXP(xpEarned, 'jnv-class-9');
        document.getElementById('xpCount').textContent = BroProPlayer.load().xp.toLocaleString();
    }

    // Update JNV leaderboard
    updateJNVLeaderboard(xpEarned, correct, total);

    // Show results toast
    let message = '';
    if (accuracy >= 80) {
        message = `🎉 Excellent! ${correct}/${total} correct (+${xpEarned} XP)`;
    } else if (accuracy >= 50) {
        message = `👍 Good job! ${correct}/${total} correct (+${xpEarned} XP)`;
    } else {
        message = `💪 Keep practicing! ${correct}/${total} correct (+${xpEarned} XP)`;
    }
    showToast(message);
}

function closeQuiz() {
    document.getElementById('quizModal').classList.remove('active');
}

// ============================================
// JNV LEADERBOARD (With Global Sync)
// ============================================
async function updateJNVLeaderboard(xpEarned, correct, total) {
    const user = firebase.auth().currentUser;
    if (!user) return;

    try {
        const db = firebase.firestore();
        const leaderboardRef = db.collection('leaderboards').doc('jnv-class-9');

        // Get current data
        const doc = await leaderboardRef.get();
        const data = doc.exists ? doc.data() : { players: {} };

        // Get current user's JNV data
        const userId = user.uid;
        const currentData = data.players?.[userId] || { xp: 0, quizzes: 0, totalCorrect: 0, totalQuestions: 0 };

        // Update
        currentData.xp += xpEarned;
        currentData.quizzes += 1;
        currentData.totalCorrect += correct;
        currentData.totalQuestions += total;
        currentData.name = user.displayName || 'Student';
        currentData.email = user.email;
        currentData.lastActive = firebase.firestore.FieldValue.serverTimestamp();

        // Get user avatar
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            currentData.avatar = userDoc.data().avatar || '🎓';
        }

        // Save to JNV leaderboard
        await leaderboardRef.set({
            players: {
                ...data.players,
                [userId]: currentData
            },
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log('✅ JNV Leaderboard updated');
    } catch (error) {
        console.error('❌ Error updating JNV leaderboard:', error);
    }
}

async function loadJNVLeaderboard() {
    try {
        const db = firebase.firestore();
        const doc = await db.collection('leaderboards').doc('jnv-class-9').get();

        if (!doc.exists) {
            console.log('No JNV leaderboard data yet');
            return;
        }

        const data = doc.data();
        const players = data.players || {};

        // Convert to array and sort by XP
        const sortedPlayers = Object.entries(players)
            .map(([id, player]) => ({ id, ...player }))
            .sort((a, b) => (b.xp || 0) - (a.xp || 0))
            .slice(0, 50);

        if (sortedPlayers.length === 0) return;

        // Update podium
        const podiumPlaces = ['second', 'first', 'third'];
        const podiumOrder = [1, 0, 2]; // Display order: 2nd, 1st, 3rd

        podiumOrder.forEach((playerIndex, displayIndex) => {
            const player = sortedPlayers[playerIndex];
            const podium = document.querySelector(`.podium-place.${podiumPlaces[displayIndex]}`);

            if (player && podium) {
                const medals = ['🥇', '🥈', '🥉'];
                podium.querySelector('.podium-avatar').textContent = player.avatar || medals[playerIndex];
                podium.querySelector('.podium-name').textContent = player.name || 'Student';
                podium.querySelector('.podium-score').textContent = `${(player.xp || 0).toLocaleString()} XP`;
            }
        });

        // Update list
        const listContainer = document.getElementById('jnvLeaderboardList');
        if (sortedPlayers.length > 3) {
            const listHTML = sortedPlayers.slice(3).map((player, i) => `
                <div class="leaderboard-row">
                    <span class="rank">#${i + 4}</span>
                    <span class="avatar">${player.avatar || '🎓'}</span>
                    <span class="name">${player.name || 'Student'}</span>
                    <span class="score">${(player.xp || 0).toLocaleString()} XP</span>
                </div>
            `).join('');

            listContainer.innerHTML = `
                <style>
                    .leaderboard-row {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        padding: 0.75rem;
                        border-bottom: 1px solid var(--border-color);
                    }
                    .leaderboard-row:last-child { border-bottom: none; }
                    .leaderboard-row .rank { 
                        font-weight: 700; 
                        color: var(--text-tertiary);
                        min-width: 40px;
                    }
                    .leaderboard-row .avatar { font-size: 1.5rem; }
                    .leaderboard-row .name { 
                        flex: 1; 
                        font-weight: 600;
                        color: var(--text-primary);
                    }
                    .leaderboard-row .score { 
                        color: var(--primary-color);
                        font-weight: 600;
                    }
                </style>
                ${listHTML}
            `;
        }
    } catch (error) {
        console.error('❌ Error loading JNV leaderboard:', error);
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

// ============================================
// PARTICLE BACKGROUND
// ============================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
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
            opacity: Math.random() * 0.5 + 0.1
        };
    }

    function init() {
        resize();
        particles = [];
        const count = Math.min(40, Math.floor((canvas.width * canvas.height) / 25000));
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    init();
    animate();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    console.log('🏫 JNV Class 9 Exam Page Initialized');
});
