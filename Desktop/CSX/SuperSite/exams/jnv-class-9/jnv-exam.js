// ============================================
// JNV CLASS 9 EXAM - CORE JAVASCRIPT
// Tab Navigation, Quiz Logic, Leaderboard
// ============================================

// ============================================
// PREMIUM ACCESS CONTROL
// ============================================

/**
 * Check if user is logged in
 */
function isUserLoggedIn() {
    return window.BroProPlayer && BroProPlayer.isLoggedIn && BroProPlayer.isLoggedIn();
}

/**
 * Check if user has premium subscription
 */
function isUserPremium() {
    return window.BroProPremium && BroProPremium.isPremium && BroProPremium.isPremium();
}

/**
 * Check if Gathri is locked (requires premium)
 * NEW STRUCTURE:
 * - Display 1 (JNV 2024 PYQ) = FREE (newest, first position always free)
 * - Display 2 (JNV 2023 PYQ) = Premium
 * - Display 3+ (Practice) = Premium
 */
function isGathriLocked(displayNumber) {
    // Display number 1 (newest PYQ - JNV 2024) is always free and accessible without login
    if (displayNumber === 1) return false;
    // All other gathris (display 2, 3, etc.) require premium
    return !isUserPremium();
}

/**
 * Check if PYQ year is locked
 * PYQ 2024 is FREE, all other years require premium
 */
function isPYQLocked(year) {
    if (year === 2024) return false;
    return !isUserPremium();
}

/**
 * Check if Mock Test is locked (all mocks require premium)
 */
function isMockLocked() {
    return !isUserPremium();
}

/**
 * Show login required prompt
 */
function showLoginRequiredForJNV(activityName = 'this content') {
    if (window.BroProAuth && BroProAuth.showLoginRequired) {
        BroProAuth.showLoginRequired(`Login to access ${activityName}!`);
    } else {
        showToast('🔒 Please login first!');
    }
}

/**
 * Show premium required prompt
 */
function showPremiumRequiredForJNV(activityName = 'premium content') {
    if (!isUserLoggedIn()) {
        showLoginRequiredForJNV(activityName);
        return;
    }

    if (window.openPremiumModal) {
        openPremiumModal(activityName);
    } else if (window.BroProPremium && BroProPremium.showPremiumRequired) {
        BroProPremium.showPremiumRequired(activityName);
    } else {
        showToast('🔒 Premium subscription required!');
    }
}

/**
 * Update UI based on premium status
 * Call this on page load and when auth state changes
 * Hides lock icons and shows 'Available' for premium users
 */
function updatePremiumUI() {
    const isPremium = isUserPremium();
    const lang = currentLanguage || 'en';

    if (isPremium) {
        console.log('👑 Premium user detected - Updating UI to show unlocked content');

        // 1. Update PYQ cards (PYQ 2023 and older)
        const pyq2023Card = document.querySelector('.pyq-card.premium-locked');
        if (pyq2023Card) {
            pyq2023Card.classList.remove('premium-locked');
            // Remove lock badge
            const lockBadge = pyq2023Card.querySelector('.pyq-lock-badge');
            if (lockBadge) lockBadge.remove();
            // Update status badges
            const statusBadges = pyq2023Card.querySelectorAll('.pyq-status.premium');
            statusBadges.forEach(badge => {
                badge.classList.remove('premium');
                badge.classList.add('available');
                badge.textContent = badge.classList.contains('lang-hi') ? 'उपलब्ध' : 'Available';
            });
        }

        // 2. Update Mock Test cards
        const mockCards = document.querySelectorAll('.mock-card.locked');
        mockCards.forEach(card => {
            card.classList.remove('locked');
            // Update badge from PREMIUM to UNLOCKED
            const premiumBadges = card.querySelectorAll('.mock-badge.premium');
            premiumBadges.forEach(badge => {
                badge.classList.remove('premium');
                badge.classList.add('unlocked');
                badge.textContent = badge.classList.contains('lang-hi') ? '✓ अनलॉक' : '✓ UNLOCKED';
            });
            // Update button from 🔒 Unlock to Start Test
            const lockedBtns = card.querySelectorAll('.mock-start-btn.locked-btn');
            lockedBtns.forEach(btn => {
                btn.classList.remove('locked-btn');
                btn.textContent = btn.classList.contains('lang-hi') ? 'टेस्ट शुरू करें' : 'Start Test';
            });
        });

        console.log('✅ Premium UI update complete');
    }
}

/**
 * Initialize premium UI on page load
 */
function initPremiumUIOnLoad() {
    // Wait for auth and player to be ready
    const checkAndUpdate = () => {
        if (window.BroProPlayer && window.BroProPremium) {
            updatePremiumUI();
        }
    };

    // Initial check after a short delay
    setTimeout(checkAndUpdate, 500);

    // Also check after auth state might change
    setTimeout(checkAndUpdate, 2000);

    // Listen for auth changes if possible
    if (window.firebase && firebase.auth) {
        firebase.auth().onAuthStateChanged(() => {
            setTimeout(checkAndUpdate, 500);
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumUIOnLoad);
} else {
    initPremiumUIOnLoad();
}

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
        renderJNVLeaderboard();
    }
}

function scrollToSection(section) {
    switchTab(section);
}

// ============================================
// GATHRI (BUNDLE) SYSTEM
// ============================================
let currentGathriSubject = null;

// Subject configuration for Gathri
const gathriConfig = {
    english: {
        icon: '🇬🇧',
        name: 'English',
        nameHi: 'अंग्रेजी',
        questionsPerGathri: 15
    },
    hindi: {
        icon: '🇮🇳',
        name: 'हिंदी',
        nameHi: 'हिंदी',
        questionsPerGathri: 15
    },
    maths: {
        icon: '📐',
        name: 'Mathematics',
        nameHi: 'गणित',
        questionsPerGathri: 35
    },
    science: {
        icon: '🔬',
        name: 'Science',
        nameHi: 'विज्ञान',
        questionsPerGathri: 35
    }
};

function openGathriModal(subject) {
    // Check if questions exist for this subject
    if (!window.JNV_QUESTIONS || !JNV_QUESTIONS[subject]) {
        showToast('⏳ Questions coming soon!');
        return;
    }

    const questions = JNV_QUESTIONS[subject];
    if (questions.length === 0) {
        showToast('⏳ Questions coming soon!');
        return;
    }

    currentGathriSubject = subject;
    const config = gathriConfig[subject];
    const lang = currentLanguage || 'en';

    // Update modal header
    document.getElementById('gathriSubjectIcon').textContent = config.icon;
    document.getElementById('gathriSubjectTitle').textContent = lang === 'hi' ? config.nameHi : config.name;

    // Update questions per gathri info
    document.getElementById('gathriQCount').textContent = config.questionsPerGathri;
    if (document.getElementById('gathriQCountHi')) {
        document.getElementById('gathriQCountHi').textContent = config.questionsPerGathri;
    }

    // Render gathri cards
    renderGathriCards(subject, questions, config.questionsPerGathri);

    // Show modal
    document.getElementById('gathriModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGathriModal() {
    document.getElementById('gathriModal').classList.remove('active');
    document.body.style.overflow = '';
    currentGathriSubject = null;
}

function renderGathriCards(subject, questions, questionsPerGathri) {
    const grid = document.getElementById('gathriGrid');
    const totalQuestions = questions.length;
    const totalGathris = Math.ceil(totalQuestions / questionsPerGathri);
    const lang = currentLanguage || 'en';

    // Get saved progress from localStorage
    const progressKey = `jnv_gathri_progress_${subject}`;
    const savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');

    let html = '';

    // NEW 5-GATHRI STRUCTURE (with JNV 2025 and JNV 2022):
    // Data Order: Gathri 1 = Practice, Gathri 2 = JNV 2023, Gathri 3 = JNV 2024, Gathri 4 = JNV 2025, Gathri 5 = JNV 2022
    // Display Order: [3, 4, 2, 1, 5] → shown as [1, 2, 3, 4, 5]
    // So: Display 1 = JNV 2024 (FREE), Display 2 = JNV 2025, Display 3 = JNV 2023, Display 4 = Practice, Display 5 = JNV 2022

    const displayOrder = [];

    if (totalGathris >= 5) {
        // Full 5-Gathri structure: JNV 2024 (FREE) → JNV 2025 → JNV 2023 → Practice → JNV 2022
        displayOrder.push(3); // JNV 2024 (displayed as Gathri 1) - FREE
        displayOrder.push(4); // JNV 2025 (displayed as Gathri 2) - Premium
        displayOrder.push(2); // JNV 2023 (displayed as Gathri 3) - Premium
        displayOrder.push(1); // Practice (displayed as Gathri 4) - Premium
        displayOrder.push(5); // JNV 2022 (displayed as Gathri 5) - Premium
        // Add any additional gathris in order
        for (let i = 6; i <= totalGathris; i++) {
            displayOrder.push(i);
        }
    } else if (totalGathris >= 4) {
        // 4-Gathri structure: JNV 2024 (FREE) → JNV 2025 → JNV 2023 → Practice
        displayOrder.push(3); // JNV 2024 (displayed as Gathri 1) - FREE
        displayOrder.push(4); // JNV 2025 (displayed as Gathri 2) - Premium
        displayOrder.push(2); // JNV 2023 (displayed as Gathri 3) - Premium
        displayOrder.push(1); // Practice (displayed as Gathri 4) - Premium
        for (let i = 5; i <= totalGathris; i++) {
            displayOrder.push(i);
        }
    } else if (totalGathris >= 3) {
        // 3-Gathri structure (no JNV 2025 yet for this subject)
        displayOrder.push(3); // JNV 2024 (displayed as Gathri 1)
        displayOrder.push(2); // JNV 2023 (displayed as Gathri 2)
        displayOrder.push(1); // Practice (displayed as Gathri 3)
    } else if (totalGathris === 2) {
        // Legacy: [2, 1] - PYQ 2023 first, then practice
        displayOrder.push(2);
        displayOrder.push(1);
    } else {
        // Single gathri
        displayOrder.push(1);
    }

    for (let displayIndex = 0; displayIndex < totalGathris; displayIndex++) {
        const actualGathriNumber = displayOrder[displayIndex]; // The actual data index
        const displayNumber = displayIndex + 1; // What we show to user (1, 2, 3, ...)

        const startQ = (actualGathriNumber - 1) * questionsPerGathri;
        const endQ = Math.min(startQ + questionsPerGathri, totalQuestions);
        const actualQuestions = endQ - startQ;

        // Check completion status (use actual gathri number for progress)
        const isCompleted = savedProgress[actualGathriNumber] === 'completed';
        const isInProgress = savedProgress[actualGathriNumber] === 'in-progress';

        // Status text
        let statusClass = 'new';
        let statusText = lang === 'hi' ? 'नया' : 'New';

        if (isCompleted) {
            statusClass = 'completed';
            statusText = lang === 'hi' ? '✓ पूर्ण' : '✓ Completed';
        } else if (isInProgress) {
            statusClass = 'in-progress';
            statusText = lang === 'hi' ? '🔄 जारी' : '🔄 In Progress';
        }

        const cardClass = isCompleted ? 'completed' : '';

        // PYQ Badges - Actual Gathri 5 = JNV 2022, Gathri 4 = JNV 2025, Gathri 3 = JNV 2024, Gathri 2 = JNV 2023
        let pyqBadge = '';
        if (actualGathriNumber === 5) {
            pyqBadge = `<span class="gathri-pyq-badge jnv-2022">JNV 2022</span>`;
        } else if (actualGathriNumber === 4) {
            pyqBadge = `<span class="gathri-pyq-badge jnv-2025">JNV 2025</span>`;
        } else if (actualGathriNumber === 3) {
            pyqBadge = `<span class="gathri-pyq-badge jnv-2024">JNV 2024</span>`;
        } else if (actualGathriNumber === 2) {
            pyqBadge = `<span class="gathri-pyq-badge jnv-2023">JNV 2023</span>`;
        }

        // Check if this gathri is locked (display 1 = free, display 2+ = premium)
        const isLocked = isGathriLocked(displayNumber);
        const lockBadge = isLocked ? `<span class="gathri-lock-badge">🔒</span>` : '';
        const lockedClass = isLocked ? 'locked' : '';

        // Override status for locked items
        if (isLocked) {
            statusClass = 'locked';
            statusText = lang === 'hi' ? '🔒 प्रीमियम' : '🔒 Premium';
        }

        // All cards look the same, just PYQ has a badge
        html += `
            <div class="gathri-card ${cardClass} ${lockedClass}" onclick="handleGathriClick('${subject}', ${actualGathriNumber}, ${displayNumber})">
                ${pyqBadge}
                ${lockBadge}
                <div class="gathri-number">${displayNumber}</div>
                <div class="gathri-label">${lang === 'hi' ? 'गठरी' : 'Gathri'} ${displayNumber}</div>
                <div class="gathri-questions">${actualQuestions} ${lang === 'hi' ? 'प्रश्न' : 'Questions'}</div>
                <span class="gathri-status ${statusClass}">${statusText}</span>
            </div>
        `;
    }

    grid.innerHTML = html;
}

/**
 * Handle Gathri card click with premium access control
 */
function handleGathriClick(subject, actualGathriNumber, displayNumber) {
    // Check if locked
    if (isGathriLocked(displayNumber)) {
        const lang = currentLanguage || 'en';
        const activityName = lang === 'hi' ? `गठरी ${displayNumber}` : `Gathri ${displayNumber}`;
        showPremiumRequiredForJNV(activityName);
        return;
    }

    // Not locked, start the gathri
    startGathri(subject, actualGathriNumber);
}


// ============================================
// SHUFFLE HELPER FUNCTIONS
// ============================================

/**
 * Shuffle questions while keeping passage-based questions together as groups
 * Questions with the same passage text are kept consecutive
 */
function shuffleGathriQuestions(questions) {
    // Group questions by passage (questions with same passage stay together)
    const groups = [];
    let currentGroup = [];
    let currentPassage = null;

    questions.forEach((q, index) => {
        if (q.passage) {
            // If this question has a different passage than current group, start new group
            if (q.passage !== currentPassage) {
                if (currentGroup.length > 0) {
                    groups.push([...currentGroup]);
                }
                currentGroup = [q];
                currentPassage = q.passage;
            } else {
                // Same passage, add to current group
                currentGroup.push(q);
            }
        } else {
            // No passage - push any pending group first
            if (currentGroup.length > 0) {
                groups.push([...currentGroup]);
                currentGroup = [];
                currentPassage = null;
            }
            // Each non-passage question is its own group
            groups.push([q]);
        }
    });

    // Don't forget the last group
    if (currentGroup.length > 0) {
        groups.push([...currentGroup]);
    }

    // Shuffle the groups using Fisher-Yates algorithm
    for (let i = groups.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [groups[i], groups[j]] = [groups[j], groups[i]];
    }

    // Flatten groups back into array
    return groups.flat();
}

/**
 * Shuffle options for a question and update correct answer index
 * Returns a new question object with shuffled options
 */
function shuffleQuestionOptions(question) {
    // Create array of option objects with original index
    const optionObjects = question.options.map((opt, idx) => ({
        text: opt,
        textHi: question.options_hi ? question.options_hi[idx] : null,
        originalIndex: idx
    }));

    // Shuffle options using Fisher-Yates algorithm
    for (let i = optionObjects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionObjects[i], optionObjects[j]] = [optionObjects[j], optionObjects[i]];
    }

    // Find new index of correct answer
    const newCorrectIndex = optionObjects.findIndex(opt => opt.originalIndex === question.correct);

    // Create new question object with shuffled options
    return {
        ...question,
        options: optionObjects.map(opt => opt.text),
        options_hi: question.options_hi ? optionObjects.map(opt => opt.textHi) : null,
        correct: newCorrectIndex,
        originalCorrect: question.correct, // Keep original for reference
        optionMapping: optionObjects.map(opt => opt.originalIndex) // Map new index -> original index
    };
}

function startGathri(subject, gathriNumber) {
    // Close the gathri modal
    closeGathriModal();

    // Get questions for this subject
    const allQuestions = JNV_QUESTIONS[subject];
    const config = gathriConfig[subject];
    const questionsPerGathri = config.questionsPerGathri;

    // Calculate which questions to use for this gathri
    const startIndex = (gathriNumber - 1) * questionsPerGathri;
    const endIndex = Math.min(startIndex + questionsPerGathri, allQuestions.length);
    const gathriQuestions = allQuestions.slice(startIndex, endIndex);

    if (gathriQuestions.length === 0) {
        showToast('❌ No questions available for this Gathri');
        return;
    }

    // Mark as in-progress in localStorage
    const progressKey = `jnv_gathri_progress_${subject}`;
    const savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    if (savedProgress[gathriNumber] !== 'completed') {
        savedProgress[gathriNumber] = 'in-progress';
        localStorage.setItem(progressKey, JSON.stringify(savedProgress));
    }

    // Start the quiz with these specific questions
    startGathriPractice(subject, gathriNumber, gathriQuestions);
}

function startGathriPractice(subject, gathriNumber, questions) {
    const lang = currentLanguage || 'en';
    const config = gathriConfig[subject];

    // Reset sound streaks for fresh quiz experience
    if (window.BroProSounds) {
        BroProSounds.resetStreak();
    }

    // Shuffle questions (keeping passage-based questions together)
    const shuffledQuestions = shuffleGathriQuestions(questions);

    // Shuffle options for each question
    const processedQuestions = shuffledQuestions.map(q => shuffleQuestionOptions(q));

    // Initialize quiz with shuffled questions
    currentQuiz = {
        subject: subject,
        gathriNumber: gathriNumber,
        questions: processedQuestions,
        originalQuestions: questions, // Keep original for review
        currentIndex: 0,
        correct: 0,
        wrong: 0,
        xp: 0,
        userAnswers: [] // Track user's answers for review
    };

    // Update full-page quiz UI
    const subjectName = lang === 'hi' ? config.nameHi : config.name;
    const gathriLabel = lang === 'hi' ? 'गठरी' : 'Gathri';

    // Update badge
    document.getElementById('gathriQuizBadge').innerHTML =
        `<span class="badge-text">${gathriLabel} ${gathriNumber} - ${subjectName}</span>`;

    // Update title
    const titleText = lang === 'hi' ? 'अभ्यास प्रश्न' : 'Practice Questions';
    document.getElementById('gathriQuizTitle').textContent = titleText;

    // Update progress
    document.getElementById('gathriQuizTotal').textContent = currentQuiz.questions.length;
    document.getElementById('gathriQuizCurrent').textContent = '1';

    // Update topic icon based on subject
    const icons = {
        'english': '🇬🇧',
        'hindi': '🇮🇳',
        'maths': '📐',
        'science': '🔬'
    };
    document.getElementById('gathriTopicIcon').textContent = icons[subject] || '📚';

    // Reset stats
    document.getElementById('gathriCorrect').textContent = '0';
    document.getElementById('gathriWrong').textContent = '0';
    document.getElementById('gathriXP').textContent = '0';

    // Show full-page quiz
    document.getElementById('gathriQuizPage').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Render first question
    renderGathriQuestion();
}

// Close Gathri Quiz
function closeGathriQuiz() {
    document.getElementById('gathriQuizPage').classList.remove('active');
    document.body.style.overflow = '';

    // Show confirmation if quiz is in progress
    if (currentQuiz.currentIndex > 0 && currentQuiz.currentIndex < currentQuiz.questions.length) {
        // Could add confirmation here
    }
}

// Render Gathri Question
function renderGathriQuestion() {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const lang = currentLanguage || 'en';
    const subject = currentQuiz.subject;

    // Update progress
    document.getElementById('gathriQuizCurrent').textContent = currentQuiz.currentIndex + 1;

    // Determine if this subject supports bilingual display (Math/Science only)
    const supportsBilingual = (subject === 'maths' || subject === 'science');

    // Helper function to convert \n to <br> for proper line breaks
    const formatText = (text) => text ? text.replace(/\n/g, '<br>') : text;

    // Build question text - show BOTH English and Hindi for Math/Science
    let questionText = formatText(q.question);
    if (supportsBilingual && q.question_hi) {
        // Show English on one line, Hindi below with proper styling
        questionText = `
            <div class="question-english" style="margin-bottom: 0.75rem;">${formatText(q.question)}</div>
            <div class="question-hindi" style="
                color: var(--text-secondary);
                font-size: 0.9em;
                padding: 0.5rem 0.75rem;
                background: rgba(99, 102, 241, 0.08);
                border-radius: 8px;
                border-left: 3px solid var(--primary-color);
            ">${formatText(q.question_hi)}</div>
        `;
    }

    // Check if question has a PYQ tag (Previous Year Question)
    if (q.pyq) {
        // Display premium PYQ badge above the question
        const pyqHTML = `
            <div class="pyq-badge" style="
                display: inline-block;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
                letter-spacing: 0.5px;
                margin-bottom: 0.75rem;
                box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
            ">${q.pyq}</div>
        `;
        questionText = pyqHTML + '<br>' + questionText;
    }

    // Check if question has a passage (for comprehension questions)
    if (q.passage) {
        // Determine passage header based on subject
        const passageHeader = subject === 'hindi' ? '📖 गद्यांश (Passage)' : '📖 Passage';

        // Display passage above the question with improved visibility
        const passageHTML = `
            <div class="passage-box" style="
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.12));
                border: 2px solid rgba(99, 102, 241, 0.4);
                border-radius: 16px;
                padding: 1.25rem 1.5rem;
                margin-bottom: 1.5rem;
                max-height: 280px;
                overflow-y: auto;
                font-size: 0.95rem;
                line-height: 1.8;
                color: var(--text-primary);
                box-shadow: 0 4px 15px rgba(99, 102, 241, 0.15);
            ">
                <div style="
                    font-weight: 700; 
                    color: var(--primary-color); 
                    margin-bottom: 0.75rem; 
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border-bottom: 1px solid rgba(99, 102, 241, 0.2);
                    padding-bottom: 0.5rem;
                ">
                    ${passageHeader}
                </div>
                <div style="text-align: justify;">${q.passage}</div>
            </div>
        `;
        questionText = passageHTML + questionText;
    }

    // Check if question has an image
    if (q.image) {
        const imageHTML = `
            <div class="question-image" style="
                text-align: center;
                margin-bottom: 1rem;
            ">
                <img src="${q.image}" alt="Question diagram" style="
                    max-width: 100%;
                    max-height: 200px;
                    border-radius: 12px;
                    border: 2px solid rgba(99, 102, 241, 0.3);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                " onerror="this.style.display='none'">
            </div>
        `;
        questionText = questionText + imageHTML;
    }

    document.getElementById('gathriQuestionText').innerHTML = questionText;

    // Get options
    const options = q.options;
    const optionsHi = q.options_hi;

    // Render options with INTELLIGENT translation
    let optionsHTML = '';
    options.forEach((opt, i) => {
        let displayText = formatText(opt);

        // Apply intelligent translation for Math/Science when Hindi translations exist
        if (supportsBilingual && optionsHi && optionsHi[i]) {
            // Check if this option is a mathematical/numeric value
            if (isMathematicalValue(opt)) {
                // Mathematical values: DO NOT translate (keep as-is)
                displayText = opt;
            } else {
                // Text-based options: Show BOTH English and Hindi
                // Check if English and Hindi are different (avoid duplicates for units)
                if (opt !== optionsHi[i]) {
                    // Show English on one line, Hindi below for long options
                    displayText = `
                        <div class="option-english">${formatText(opt)}</div>
                        <div class="option-hindi" style="
                            color: var(--text-secondary);
                            font-size: 0.85em;
                            margin-top: 0.25rem;
                            opacity: 0.85;
                        ">${formatText(optionsHi[i])}</div>
                    `;
                } else {
                    displayText = opt;
                }
            }
        }

        optionsHTML += `
            <button class="gathri-option-btn" onclick="selectGathriAnswer(${i})">
                <span class="option-text">${displayText}</span>
            </button>
        `;
    });

    document.getElementById('gathriOptions').innerHTML = optionsHTML;
}


// Select Gathri Answer
function selectGathriAnswer(index) {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const isCorrect = index === q.correct;
    const lang = currentLanguage || 'en';

    // Store user's answer for review
    currentQuiz.userAnswers[currentQuiz.currentIndex] = index;

    // Disable all options
    document.querySelectorAll('.gathri-option-btn').forEach((opt, i) => {
        opt.disabled = true;
        if (i === q.correct) opt.classList.add('correct');
        if (i === index && !isCorrect) opt.classList.add('wrong');
    });

    // Update stats and play sounds
    if (isCorrect) {
        currentQuiz.correct++;
        currentQuiz.xp += 5;
        document.getElementById('gathriCorrect').textContent = currentQuiz.correct;
        document.getElementById('gathriXP').textContent = currentQuiz.xp;

        // Play correct sound (no streak celebration for Gathri)
        if (window.BroProSounds) {
            BroProSounds.play('correct');
            // Reset wrong streak on correct answer
            BroProSounds.wrongStreak = 0;
        }
    } else {
        currentQuiz.wrong++;
        document.getElementById('gathriWrong').textContent = currentQuiz.wrong;

        // Play wrong sound + check for 3 consecutive wrong (Abhay Saale meme)
        if (window.BroProSounds) {
            BroProSounds.recordWrong();
        }
    }

    // Next question after delay
    setTimeout(() => {
        currentQuiz.currentIndex++;
        if (currentQuiz.currentIndex < currentQuiz.questions.length) {
            renderGathriQuestion();
        } else {
            endGathriQuiz();
        }
    }, 1500);
}

// End Gathri Quiz
function endGathriQuiz() {
    const lang = currentLanguage || 'en';
    const subject = currentQuiz.subject;
    const gathriNumber = currentQuiz.gathriNumber;
    const total = currentQuiz.questions.length;
    const correct = currentQuiz.correct;
    const percentage = Math.round((correct / total) * 100);
    const xp = currentQuiz.xp;

    // Mark gathri as completed in localStorage
    if (gathriNumber) {
        const progressKey = `jnv_gathri_progress_${subject}`;
        const savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
        savedProgress[gathriNumber] = 'completed';
        localStorage.setItem(progressKey, JSON.stringify(savedProgress));
    }

    // Award XP
    if (window.BroProPlayer) {
        BroProPlayer.addXP(xp, 'jnv');
    }

    // Update leaderboard
    if (typeof updateJNVLeaderboard === 'function') {
        updateJNVLeaderboard(xp, correct, currentQuiz.wrong);
    }

    // Determine completion title based on performance
    let title = '💪 Keep Practicing!';
    let icon = '📚';
    let isExcellent = false;

    if (percentage >= 80) {
        title = '🎉 Excellent!';
        icon = '🏆';
        isExcellent = true;
    } else if (percentage >= 60) {
        title = '👏 Good Job!';
        icon = '⭐';
    } else if (percentage >= 40) {
        title = '📈 Keep Going!';
        icon = '💡';
    }

    // Update modal content
    document.getElementById('completeIcon').textContent = icon;
    document.getElementById('completeTitle').textContent = title;
    document.getElementById('completeCorrect').textContent = correct;
    document.getElementById('completeAccuracy').textContent = percentage + '%';
    document.getElementById('completeXP').textContent = xp;

    // Add excellent class if high score
    const modalContent = document.querySelector('.complete-modal-content');
    if (isExcellent) {
        modalContent.classList.add('excellent');
    } else {
        modalContent.classList.remove('excellent');
    }

    // Hide quiz page, show completion modal
    document.getElementById('gathriQuizPage').classList.remove('active');
    document.getElementById('gathriCompleteModal').classList.add('active');
}

// Learn from mistakes - show explanations with Hindi/English toggle
function learnFromMistakes() {
    closeCompleteModal();
    const lang = currentLanguage || 'en';
    const subject = currentQuiz.subject;
    const questions = currentQuiz.questions;

    if (!questions || questions.length === 0) {
        showToast(lang === 'hi' ? '❌ कोई प्रश्न उपलब्ध नहीं' : '❌ No questions available');
        return;
    }

    // Get config for subject name
    const config = gathriConfig[subject] || { name: subject, nameHi: subject };
    const subjectName = lang === 'hi' ? config.nameHi : config.name;

    // Build the review HTML
    let reviewHTML = `
        <div class="review-modal active" id="reviewModal">
            <div class="review-container">
                <button class="review-close" onclick="closeReviewModal()">✕</button>
                
                <div class="review-header">
                    <h2>📖 <span class="lang-en">Learn from Explanations</span><span class="lang-hi" style="display:${lang === 'hi' ? 'inline' : 'none'}">स्पष्टीकरण से सीखें</span></h2>
                    <p>${subjectName} • ${questions.length} ${lang === 'hi' ? 'प्रश्न' : 'Questions'}</p>
                    
                    <!-- Language Toggle -->
                    <div class="review-lang-toggle">
                        <button class="lang-btn ${lang === 'en' ? 'active' : ''}" onclick="toggleReviewLang('en')">🇬🇧 English</button>
                        <button class="lang-btn ${lang === 'hi' ? 'active' : ''}" onclick="toggleReviewLang('hi')">🇮🇳 हिंदी</button>
                    </div>
                </div>
                
                <div class="review-content" id="reviewContent">
    `;

    // Add each question with explanation
    questions.forEach((q, index) => {
        const correctOption = q.options[q.correct];
        const correctOptionHi = q.options_hi ? q.options_hi[q.correct] : correctOption;
        const supportsBilingual = (subject === 'maths' || subject === 'science');

        // Get user's answer for this question
        const userAnswerIndex = currentQuiz.userAnswers ? currentQuiz.userAnswers[index] : undefined;
        const isCorrect = userAnswerIndex === q.correct;
        const isSkipped = userAnswerIndex === undefined;

        // Determine status icon and card style
        let statusIcon = '✅';
        let cardClass = 'review-card correct';
        if (isSkipped) {
            statusIcon = '⚪';
            cardClass = 'review-card skipped';
        } else if (!isCorrect) {
            statusIcon = '❌';
            cardClass = 'review-card wrong';
        }

        // Question text
        let questionText = q.question;
        if (supportsBilingual && q.question_hi) {
            questionText = `${q.question} <span class="hindi-translation">(${q.question_hi})</span>`;
        }

        // Correct answer text
        let correctText = correctOption;
        if (supportsBilingual && correctOptionHi && correctOption !== correctOptionHi && !isMathematicalValue(correctOption)) {
            correctText = `${correctOption} <span class="hindi-translation">(${correctOptionHi})</span>`;
        }

        // User's wrong answer (if applicable)
        let userAnswerHTML = '';
        if (!isCorrect && !isSkipped && userAnswerIndex !== undefined) {
            const userOption = q.options[userAnswerIndex];
            const userOptionHi = q.options_hi ? q.options_hi[userAnswerIndex] : userOption;
            let userAnswerText = userOption;
            if (supportsBilingual && userOptionHi && userOption !== userOptionHi && !isMathematicalValue(userOption)) {
                userAnswerText = `${userOption} <span class="hindi-translation">(${userOptionHi})</span>`;
            }
            userAnswerHTML = `
                <div class="review-user-answer">
                    <span class="user-answer-label">✗ <span class="lang-en">Your Answer:</span><span class="lang-hi" style="display:none">आपका उत्तर:</span></span>
                    <span class="user-answer-value">${userAnswerText}</span>
                </div>
            `;
        }

        // Explanation text - Smart translation (with proper line breaks)
        const formatExplanation = (text) => text ? text.replace(/\n/g, '<br>') : 'No explanation available.';
        let explanationEn = formatExplanation(q.explanation);
        let explanationHi = q.explanation_hi ? formatExplanation(q.explanation_hi) : explanationEn; // Fallback to English if no Hindi

        reviewHTML += `
            <div class="${cardClass}">
                <div class="review-card-header">
                    <span class="review-q-num">Q${index + 1}</span>
                    <span class="review-q-status">${statusIcon}</span>
                </div>
                
                <div class="review-question">
                    ${questionText}
                </div>
                
                ${userAnswerHTML}
                
                <div class="review-correct-answer">
                    <span class="correct-label">✓ <span class="lang-en">Correct Answer:</span><span class="lang-hi" style="display:none">सही उत्तर:</span></span>
                    <span class="correct-value">${correctText}</span>
                </div>
                
                <div class="review-explanation">
                    <div class="explanation-header">
                        <span class="explanation-icon">💡</span>
                        <span class="lang-en">Explanation</span>
                        <span class="lang-hi" style="display:none">स्पष्टीकरण</span>
                    </div>
                    <div class="explanation-text">
                        <p class="lang-en">${explanationEn}</p>
                        <p class="lang-hi" style="display:none">${explanationHi}</p>
                    </div>
                </div>
            </div>
        `;
    });

    reviewHTML += `
                </div>
                
                <div class="review-footer">
                    <button class="review-btn primary" onclick="closeReviewAndGoHome()">
                        <span class="lang-en">✓ Done</span>
                        <span class="lang-hi" style="display:none">✓ समाप्त</span>
                    </button>
                    <button class="review-btn secondary" onclick="closeReviewAndPlayAgain()">
                        <span class="lang-en">🔄 Practice Again</span>
                        <span class="lang-hi" style="display:none">🔄 फिर से अभ्यास</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add CSS if not already added
    if (!document.getElementById('reviewModalStyles')) {
        const styles = document.createElement('style');
        styles.id = 'reviewModalStyles';
        styles.textContent = getReviewModalStyles();
        document.head.appendChild(styles);
    }

    // Insert the modal
    document.body.insertAdjacentHTML('beforeend', reviewHTML);
    document.body.style.overflow = 'hidden';

    // Apply current language
    toggleReviewLang(lang);
}

// Toggle language in review modal
function toggleReviewLang(lang) {
    const modal = document.getElementById('reviewModal');
    if (!modal) return;

    // Update toggle buttons
    modal.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(lang === 'en' ? 'English' : 'हिंदी'));
    });

    // Toggle content visibility
    modal.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'en' ? '' : 'none';
    });
    modal.querySelectorAll('.lang-hi').forEach(el => {
        el.style.display = lang === 'hi' ? '' : 'none';
    });
}

// Close review modal
function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.remove();
    }
    document.body.style.overflow = '';
}

// Close review modal and go back to gathri selection
function closeReviewAndGoHome() {
    closeReviewModal();
    // Open the gathri modal for the same subject so user can pick another gathri
    const subject = currentQuiz.subject;
    if (subject) {
        openGathriModal(subject);
    }
}

// Close review modal and restart the same gathri
function closeReviewAndPlayAgain() {
    closeReviewModal();
    const subject = currentQuiz.subject;
    const gathriNumber = currentQuiz.gathriNumber;
    if (subject && gathriNumber) {
        startGathri(subject, gathriNumber);
    }
}

// Get review modal styles
function getReviewModalStyles() {
    return `
        .review-modal {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            overflow: auto;
        }
        
        .review-container {
            background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 20px;
            width: 100%;
            max-width: 800px;
            max-height: 90vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
        }
        
        .review-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            z-index: 10;
            transition: all 0.2s;
        }
        
        .review-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }
        
        .review-header {
            padding: 1.5rem 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            text-align: center;
        }
        
        .review-header h2 {
            margin: 0;
            font-size: 1.5rem;
            color: white;
        }
        
        .review-header p {
            margin: 0.5rem 0 0;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
        }
        
        .review-lang-toggle {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            margin-top: 1rem;
        }
        
        .review-lang-toggle .lang-btn {
            padding: 0.5rem 1rem;
            border: 1px solid rgba(255, 255, 255, 0.3);
            background: transparent;
            color: white;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.2s;
        }
        
        .review-lang-toggle .lang-btn.active {
            background: white;
            color: #764ba2;
            border-color: white;
        }
        
        .review-content {
            flex: 1;
            overflow-y: auto;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .review-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 1.25rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .review-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
        }
        
        .review-q-num {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .review-q-status {
            font-size: 1.2rem;
        }
        
        .review-question {
            color: white;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        
        .review-question .hindi-translation {
            color: #fbbf24;
            font-size: 0.95em;
        }
        
        .review-correct-answer {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
            border: 1px solid rgba(34, 197, 94, 0.4);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .correct-label {
            color: #22c55e;
            font-weight: 600;
        }
        
        .correct-value {
            color: white;
        }
        
        .correct-value .hindi-translation {
            color: #fbbf24;
        }
        
        .review-card.correct {
            border-color: rgba(34, 197, 94, 0.3);
        }
        
        .review-card.wrong {
            border-color: rgba(239, 68, 68, 0.4);
            background: rgba(239, 68, 68, 0.05);
        }
        
        .review-card.skipped {
            border-color: rgba(156, 163, 175, 0.3);
            opacity: 0.8;
        }
        
        .review-user-answer {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
            border: 1px solid rgba(239, 68, 68, 0.4);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .user-answer-label {
            color: #ef4444;
            font-weight: 600;
        }
        
        .user-answer-value {
            color: white;
            text-decoration: line-through;
            opacity: 0.9;
        }
        
        .user-answer-value .hindi-translation {
            color: #fbbf24;
        }
        
        .review-explanation {
            background: rgba(99, 102, 241, 0.1);
            border-radius: 8px;
            padding: 1rem;
            border-left: 3px solid #6366f1;
        }
        
        .explanation-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #a5b4fc;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .explanation-icon {
            font-size: 1.2rem;
        }
        
        .explanation-text p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.95rem;
            line-height: 1.6;
            margin: 0;
        }
        
        .review-footer {
            padding: 1rem 1.5rem;
            background: rgba(0, 0, 0, 0.2);
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .review-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            font-size: 0.95rem;
            transition: all 0.2s;
        }
        
        .review-btn.primary {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
        }
        
        .review-btn.secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .review-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        @media (max-width: 600px) {
            .review-container {
                max-height: 95vh;
                border-radius: 16px;
            }
            
            .review-header {
                padding: 1rem 1.5rem;
            }
            
            .review-header h2 {
                font-size: 1.25rem;
            }
            
            .review-content {
                padding: 1rem;
            }
            
            .review-card {
                padding: 1rem;
            }
            
            .review-footer {
                padding: 1rem;
            }
        }
    `;
}

// Play Again - restart the same gathri
function playAgain() {
    closeCompleteModal();

    const subject = currentQuiz.subject;
    const gathriNumber = currentQuiz.gathriNumber;

    if (subject && gathriNumber) {
        startGathri(subject, gathriNumber);
    }
}

// Go to Menu
function goToMenu() {
    closeCompleteModal();
    document.body.style.overflow = '';
}

// Close completion modal
function closeCompleteModal() {
    document.getElementById('gathriCompleteModal').classList.remove('active');
    document.body.style.overflow = '';
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
    // PREMIUM ACCESS CONTROL: PYQ 2024 is FREE, all others require premium
    if (isPYQLocked(year)) {
        const lang = currentLanguage || 'en';
        const activityName = lang === 'hi' ? `PYQ ${year}` : `PYQ ${year}`;
        showPremiumRequiredForJNV(activityName);
        return;
    }

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

    // Initialize language toggle state
    const lang = currentLanguage || 'en';
    document.querySelectorAll('.cbt-lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

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

    // Determine if this section supports bilingual display (Math/Science only)
    const supportsBilingual = (i >= 30 && i < 65) || (i >= 65); // Math or Science

    // ============================================
    // PASSAGE DISPLAY (for comprehension questions)
    // ============================================
    let passageHTML = '';
    if (q.passage) {
        const passageTitle = lang === 'hi' ? '📖 गद्यांश पढ़ें:' : '📖 Read the Passage:';
        passageHTML = `
            <div class="cbt-passage-box">
                <div class="passage-header">${passageTitle}</div>
                <div class="passage-text">${q.passage}</div>
            </div>
        `;
    }

    // ============================================
    // IMAGE DISPLAY (for diagram-based questions)
    // ============================================
    let imageHTML = '';
    if (q.image) {
        imageHTML = `
            <div class="cbt-question-image">
                <img src="${q.image}" alt="Question diagram" loading="lazy">
            </div>
        `;
    }

    // Build question text - show BOTH English and Hindi for Math/Science
    let questionText = q.question;
    if (supportsBilingual && q.question_hi) {
        // Show both: "English (हिंदी)"
        questionText = `${q.question} <span class="hindi-translation">(${q.question_hi})</span>`;
    }

    // Combine: Passage + Image + Question
    document.getElementById('cbtQuestionText').innerHTML = passageHTML + imageHTML + questionText;

    // Render options with INTELLIGENT translation
    const letters = ['A', 'B', 'C', 'D', 'अ', 'आ', 'इ', 'ई'];
    const optLetters = lang === 'hi' ? letters.slice(4) : letters.slice(0, 4);
    const options = q.options;
    const optionsHi = q.options_hi;

    const optionsHTML = options.map((opt, optIndex) => {
        const selectedClass = cbtExam.answers[i] === optIndex ? 'selected' : '';

        // Apply intelligent translation for Math/Science
        let displayText = opt;
        if (supportsBilingual && optionsHi && optionsHi[optIndex]) {
            if (isMathematicalValue(opt)) {
                // Mathematical values: DO NOT translate
                displayText = opt;
            } else {
                // Text-based options: Show BOTH English and Hindi
                if (opt !== optionsHi[optIndex]) {
                    displayText = `${opt} <span class="hindi-translation">(${optionsHi[optIndex]})</span>`;
                } else {
                    displayText = opt;
                }
            }
        }

        return `
            <div class="cbt-option ${selectedClass}" onclick="selectCBTOption(${optIndex})">
                <span class="option-letter">${optLetters[optIndex] || letters[optIndex]}</span>
                <span class="option-text">${displayText}</span>
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

// Set CBT Language Toggle
function setCBTLanguage(lang) {
    // Update global language
    currentLanguage = lang;

    // Update toggle button states
    document.querySelectorAll('.cbt-lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Also sync with main page toggle if visible
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Save to localStorage
    localStorage.setItem('jnv_language', lang);

    // Re-render current question with new language
    renderCBTQuestion();

    // Show toast
    const msg = lang === 'hi' ? '🇮🇳 भाषा: हिंदी' : '🇬🇧 Language: English';
    showToast(msg);
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
        BroProPlayer.addXP(xpEarned, 'jnv');
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

    const lang = currentLanguage || 'en';
    const formatText = (text) => text ? text.replace(/\n/g, '<br>') : '';

    // Build review HTML
    let reviewHTML = '';
    let sectionStart = { hindi: 0, english: 15, maths: 30, science: 65 };
    let currentSection = '';

    cbtExam.questions.forEach((q, i) => {
        // Determine section
        let section = '';
        let sectionName = '';
        if (i < 15) { section = 'hindi'; sectionName = lang === 'hi' ? '📚 हिंदी' : '📚 Hindi'; }
        else if (i < 30) { section = 'english'; sectionName = lang === 'hi' ? '📖 अंग्रेजी' : '📖 English'; }
        else if (i < 65) { section = 'maths'; sectionName = lang === 'hi' ? '🔢 गणित' : '🔢 Mathematics'; }
        else { section = 'science'; sectionName = lang === 'hi' ? '🔬 विज्ञान' : '🔬 Science'; }

        // Add section header if new section
        if (section !== currentSection) {
            currentSection = section;
            reviewHTML += `<div class="review-section-header">${sectionName}</div>`;
        }

        const userAnswer = cbtExam.answers[i];
        const correctIndex = q.correct;
        const isCorrect = userAnswer === correctIndex;
        const isSkipped = userAnswer === -1;

        // Status class and icon
        let statusClass = isSkipped ? 'skipped' : (isCorrect ? 'correct' : 'wrong');
        let statusIcon = isSkipped ? '⏭️' : (isCorrect ? '✅' : '❌');

        // Question text (bilingual for maths/science)
        let questionText = q.question;
        if ((section === 'maths' || section === 'science') && q.question_hi) {
            questionText = formatText(q.question) + '<br><span class="hindi-text">' + formatText(q.question_hi) + '</span>';
        } else {
            questionText = formatText(q.question);
        }

        // Add passage if exists (for comprehension questions)
        let passageHTML = '';
        if (q.passage) {
            const passageTitle = lang === 'hi' ? '📖 गद्यांश:' : '📖 Passage:';
            passageHTML = `
                <div class="review-passage">
                    <div class="passage-title">${passageTitle}</div>
                    <div class="passage-content">${q.passage}</div>
                </div>
            `;
        }

        // Prepend passage to question text
        questionText = passageHTML + questionText;

        // Options
        const options = q.options || [];
        const optionsHi = q.options_hi || [];

        let optionsHTML = '';
        options.forEach((opt, idx) => {
            let optClass = '';
            let optMark = '';

            if (idx === correctIndex) {
                optClass = 'correct-option';
                optMark = ' ✓';
            }
            if (idx === userAnswer && userAnswer !== correctIndex) {
                optClass = 'wrong-option';
                optMark = ' ✗';
            }
            if (idx === userAnswer && userAnswer === correctIndex) {
                optClass = 'correct-option user-selected';
                optMark = ' ✓ (Your answer)';
            }

            // Bilingual options for maths/science
            let optText = opt;
            if ((section === 'maths' || section === 'science') && optionsHi[idx]) {
                optText = `${opt} <span class="hindi-small">(${optionsHi[idx]})</span>`;
            }

            optionsHTML += `
                <div class="review-option ${optClass}">
                    <span class="opt-letter">${String.fromCharCode(65 + idx)}.</span>
                    ${optText}${optMark}
                </div>
            `;
        });

        // Explanation
        const explanation = lang === 'hi' && q.explanation_hi ? q.explanation_hi : q.explanation;
        const explanationHTML = explanation ? `
            <div class="review-explanation">
                <div class="explanation-header">💡 ${lang === 'hi' ? 'व्याख्या' : 'Explanation'}</div>
                <div class="explanation-text">${formatText(explanation)}</div>
            </div>
        ` : '';

        reviewHTML += `
            <div class="review-item ${statusClass}">
                <div class="review-item-header">
                    <span class="review-q-num">Q${i + 1}</span>
                    <span class="review-status">${statusIcon}</span>
                </div>
                <div class="review-question">${questionText}</div>
                ${q.image ? `<img src="${q.image}" class="review-image" alt="Question diagram">` : ''}
                <div class="review-options">${optionsHTML}</div>
                ${!isCorrect || true ? explanationHTML : ''} <!-- Always show explanation -->
            </div>
        `;
    });

    // Create and show review modal
    const reviewModal = document.createElement('div');
    reviewModal.id = 'cbtReviewModal';
    reviewModal.className = 'cbt-review-modal active';
    reviewModal.innerHTML = `
        <div class="cbt-review-container">
            <div class="review-header">
                <h2>📋 ${lang === 'hi' ? 'उत्तर समीक्षा' : 'Answer Review'} - PYQ ${cbtExam.year}</h2>
                <div class="review-language-toggle">
                    <button class="review-lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en" onclick="switchReviewLanguage('en')">
                        🇬🇧 EN
                    </button>
                    <button class="review-lang-btn ${lang === 'hi' ? 'active' : ''}" data-lang="hi" onclick="switchReviewLanguage('hi')">
                        🇮🇳 हिंदी
                    </button>
                </div>
                <button class="close-review-btn" onclick="closeReviewAndExitCBT()">✕</button>
            </div>
            <div class="review-stats">
                <span class="stat correct">✅ ${cbtExam.answers.filter((a, i) => a === cbtExam.questions[i].correct).length}</span>
                <span class="stat wrong">❌ ${cbtExam.answers.filter((a, i) => a !== -1 && a !== cbtExam.questions[i].correct).length}</span>
                <span class="stat skipped">⏭️ ${cbtExam.answers.filter(a => a === -1).length}</span>
            </div>
            <div class="review-content">${reviewHTML}</div>
            <div class="review-footer">
                <button class="cbt-action-btn primary" onclick="closeReviewAndExitCBT()">
                    ✓ ${lang === 'hi' ? 'बंद करें' : 'Close'}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(reviewModal);
}

function closeCBTReviewModal() {
    const reviewModal = document.getElementById('cbtReviewModal');
    if (reviewModal) {
        reviewModal.remove();
    }
}

// Close review modal AND exit CBT mode completely
function closeReviewAndExitCBT() {
    // Remove the review modal
    const reviewModal = document.getElementById('cbtReviewModal');
    if (reviewModal) {
        reviewModal.remove();
    }

    // Exit CBT mode completely
    closeCBTExam();
}

// Switch language in Review Modal and rebuild
function switchReviewLanguage(lang) {
    // Save current scroll position BEFORE closing the modal
    const reviewModal = document.getElementById('cbtReviewModal');
    const reviewContent = reviewModal ? reviewModal.querySelector('.review-content') : null;
    const savedScrollTop = reviewContent ? reviewContent.scrollTop : 0;

    // Update global language
    currentLanguage = lang;
    localStorage.setItem('jnv_language', lang);

    // Close current modal and rebuild with new language
    closeCBTReviewModal();
    reviewAnswers();

    // Restore scroll position AFTER rebuilding
    requestAnimationFrame(() => {
        const newModal = document.getElementById('cbtReviewModal');
        const newContent = newModal ? newModal.querySelector('.review-content') : null;
        if (newContent) {
            newContent.scrollTop = savedScrollTop;
        }
    });

    // Show toast
    const msg = lang === 'hi' ? '🇮🇳 भाषा: हिंदी' : '🇬🇧 Language: English';
    showToast(msg);
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

    // Remove review modal if exists
    const reviewModal = document.getElementById('cbtReviewModal');
    if (reviewModal) reviewModal.remove();

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
    // ALL Mock Tests require Premium subscription
    if (isMockLocked()) {
        const lang = currentLanguage || 'en';
        const activityName = lang === 'hi' ? `मॉक टेस्ट ${testNumber}` : `Mock Test ${testNumber}`;
        showPremiumRequiredForJNV(activityName);
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


// ============================================
// INTELLIGENT TRANSLATION SYSTEM FOR QUIZ
// ============================================

// Check if a string is primarily mathematical (numbers, operators, symbols)
// Returns TRUE for values that should NOT be translated (numbers, formulas, units)
function isMathematicalValue(str) {
    if (!str) return false;
    const trimmed = str.toString().trim();

    // Patterns that indicate mathematical/numeric content - DO NOT TRANSLATE these
    const mathPatterns = [
        /^[\d\s\+\-\*\/\=\.\,\%\(\)\[\]\{\}\^\<\>\≤\≥\≠\±\×\÷°]+$/, // Pure numbers, operators, degrees
        /^\d+[\s]*(cm|m|km|kg|g|ml|l|s|h|min|°|°C|°F|m\/s|km\/h|cm²|m²|cm³|m³)$/i, // Units
        /^[\-]?\d+(\.\d+)?[\s]*(cm|m|km|kg|g|ml|l|s|h|min|°|°C|°F|m\/s|km\/h|cm²|m²|cm³|m³)?$/i, // Numbers with optional units
        /^\d+\s*\/\s*\d+$/, // Fractions like "1/2", "3/4" 
        /^[\d\s\/]+$/, // Pure fractions
        /^\d+\s*:\s*\d+$/, // Ratios like "1:2", "3:4"
        /^Rs\.?\s*\d+/, // Currency Rs
        /^₹\s*\d+/, // Rupee symbol
        /^\d+\s*%$/, // Percentages like "25%"
        /^[\d\.\,\s]+$/, // Just numbers
        /^[A-Z]$/, // Single capital letter (geometry labels)
        /^\d+\s*×\s*10[⁰¹²³⁴⁵⁶⁷⁸⁹]+\s*(m\/s)?$/i, // Scientific notation
        /^[A-Za-z][₀-₉]*$/, // Chemical symbols like H₂O, CO₂
        /^[A-Z][a-z]?[₀-₉]+$/, // Chemical formulas
        /^(CO₂|H₂O|O₂|NaCl|Na₂CO₃|NaHCO₃|NaOH|CH₄)$/i, // Common chemical formulas
    ];

    for (const pattern of mathPatterns) {
        if (pattern.test(trimmed)) return true;
    }

    // If mostly numbers/math symbols (>60%), don't translate
    const mathChars = trimmed.match(/[\d\+\-\*\/\=\.\,\%\(\)\[\]\{\}\^\<\>\≤\≥\≠\±\×\÷°₀₁₂₃₄₅₆₇₈₉]/g) || [];
    if (mathChars.length / trimmed.length > 0.6) return true;

    return false;
}

// Get intelligently translated option - returns bilingual for text, original for numbers
function getIntelligentOption(option, optionHi, lang) {
    // If English mode, always use original
    if (lang === 'en') return option;

    // If Hindi mode and Hindi translation exists
    if (lang === 'hi' && optionHi) {
        // If it's mathematical/numeric, use original (don't translate numbers)
        if (isMathematicalValue(option)) {
            return option;
        }
        // For text-based options: show bilingual format
        // If English and Hindi are different, show both
        if (option !== optionHi) {
            return `${option} <span class="hindi-translation">(${optionHi})</span>`;
        }
        return option;
    }

    // Fallback to original
    return option;
}

// Get subject section name for display
function getSubjectSectionName(subject, lang) {
    const sections = {
        english: { en: '🇬🇧 English', hi: '🇬🇧 अंग्रेजी' },
        hindi: { en: '🇮🇳 Hindi', hi: '🇮🇳 हिंदी' },
        maths: { en: '📐 Mathematics', hi: '📐 गणित' },
        science: { en: '🔬 Science', hi: '🔬 विज्ञान' }
    };
    return sections[subject]?.[lang] || sections[subject]?.en || subject;
}

function renderQuizQuestion() {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const lang = currentLanguage || 'en';
    const subject = currentQuiz.subject;
    const gathriNumber = currentQuiz.gathriNumber;

    // Update progress
    document.getElementById('quizCurrent').textContent = currentQuiz.currentIndex + 1;
    document.getElementById('quizProgress').style.width =
        `${((currentQuiz.currentIndex) / currentQuiz.questions.length) * 100}%`;

    // === INTELLIGENT BILINGUAL TRANSLATION LOGIC ===

    // For Hindi/English subjects: Questions are in their native language, don't translate
    // For Maths/Science: ALWAYS show BOTH English and Hindi (bilingual display)

    let questionText = q.question;
    let options = q.options;
    const supportsBilingual = (subject === 'maths' || subject === 'science');

    // For Math/Science, show bilingual questions
    if (supportsBilingual && q.question_hi) {
        questionText = `${q.question} <span class="hindi-translation">(${q.question_hi})</span>`;
    }

    // For options, use intelligent translation (bilingual for text, original for numbers)
    if (supportsBilingual && q.options_hi && q.options_hi.length === q.options.length) {
        options = q.options.map((opt, i) =>
            getIntelligentOption(opt, q.options_hi[i], 'hi') // Force bilingual mode
        );
    }

    // Render question with section indicator
    const sectionName = getSubjectSectionName(subject, lang);
    const gathriLabel = lang === 'hi' ? 'गठरी' : 'Gathri';

    // Add section badge above question
    const sectionBadgeHTML = gathriNumber
        ? `<div class="quiz-section-badge">${sectionName} • ${gathriLabel} ${gathriNumber}</div>`
        : `<div class="quiz-section-badge">${sectionName}</div>`;

    document.getElementById('quizQuestion').innerHTML = sectionBadgeHTML + `<div class="quiz-question-text">${questionText}</div>`;

    // Render options with proper styling
    const optionLabels = lang === 'hi' ? ['अ', 'आ', 'इ', 'ई'] : ['A', 'B', 'C', 'D'];
    const optionsHTML = options.map((opt, i) => `
        <button class="quiz-option" onclick="selectAnswer(${i})">
            <span class="option-label">${optionLabels[i] || String.fromCharCode(65 + i)}</span>
            <span class="option-content">${opt}</span>
        </button>
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

    // Get options using intelligent bilingual translation for Math/Science
    let options = q.options;
    const supportsBilingual = (subject === 'maths' || subject === 'science');
    if (supportsBilingual && q.options_hi && q.options_hi.length === q.options.length) {
        options = q.options.map((opt, i) =>
            getIntelligentOption(opt, q.options_hi[i], 'hi') // Force bilingual mode
        );
    }

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
        const correctMsg = lang === 'hi' ? '✅ सही जवाब!' : '✅ Correct!';
        const xpMsg = lang === 'hi' ? 'अंक' : 'XP';
        feedback.innerHTML = `<strong>${correctMsg}</strong> +5 ${xpMsg}`;
    } else {
        currentQuiz.wrong++;
        feedback.className = 'quiz-feedback wrong';
        const correctAnswer = options[q.correct];
        const incorrectMsg = lang === 'hi' ? '❌ गलत!' : '❌ Incorrect!';
        const answerLabel = lang === 'hi' ? 'सही उत्तर:' : 'Correct answer:';
        feedback.innerHTML = `<strong>${incorrectMsg}</strong><br>${answerLabel} ${correctAnswer}`;

        // Show explanation - use Hindi if available for math/science
        let explanation = q.explanation;
        if (lang === 'hi' && (subject === 'maths' || subject === 'science') && q.explanation_hi) {
            explanation = q.explanation_hi;
        }
        if (explanation) {
            // Convert \n to <br> for proper line breaks
            const formattedExplanation = explanation.replace(/\n/g, '<br>');
            const tipLabel = lang === 'hi' ? '💡 व्याख्या:' : '💡 Explanation:';
            feedback.innerHTML += `<br><br>${tipLabel}<br>${formattedExplanation}`;
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

    // Mark gathri as completed if this was a gathri quiz
    if (currentQuiz.gathriNumber && currentQuiz.subject) {
        const progressKey = `jnv_gathri_progress_${currentQuiz.subject}`;
        const savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
        savedProgress[currentQuiz.gathriNumber] = 'completed';
        localStorage.setItem(progressKey, JSON.stringify(savedProgress));
    }

    // Award XP
    if (window.BroProPlayer && xpEarned > 0) {
        BroProPlayer.addXP(xpEarned, 'jnv');
        document.getElementById('xpCount').textContent = BroProPlayer.load().xp.toLocaleString();
    }

    // Update JNV leaderboard
    updateJNVLeaderboard(xpEarned, correct, total);

    // Show results toast
    const lang = currentLanguage || 'en';
    let message = '';
    if (accuracy >= 80) {
        message = lang === 'hi'
            ? `🎉 उत्कृष्ट! ${correct}/${total} सही (+${xpEarned} XP)`
            : `🎉 Excellent! ${correct}/${total} correct (+${xpEarned} XP)`;
    } else if (accuracy >= 50) {
        message = lang === 'hi'
            ? `👍 बढ़िया! ${correct}/${total} सही (+${xpEarned} XP)`
            : `👍 Good job! ${correct}/${total} correct (+${xpEarned} XP)`;
    } else {
        message = lang === 'hi'
            ? `💪 अभ्यास जारी रखें! ${correct}/${total} सही (+${xpEarned} XP)`
            : `💪 Keep practicing! ${correct}/${total} correct (+${xpEarned} XP)`;
    }
    showToast(message);

    // 🎰 Check for Saat Crore Easter Egg (7 quizzes with 90%+ accuracy)
    // Only track Gathri quizzes, not Full PYQs
    if (window.SaatCroreEasterEgg && currentQuiz.gathriNumber) {
        SaatCroreEasterEgg.recordPerfectQuiz(accuracy, 'gathri', `gathri-${currentQuiz.gathriNumber}`);
    }
}

function closeQuiz() {
    document.getElementById('quizModal').classList.remove('active');
}

// ============================================
// JNV LEADERBOARD (With Global Sync)
// ============================================
async function updateJNVLeaderboard(xpEarned, correct, total) {
    const user = firebase.auth().currentUser;
    if (!user) {
        console.log('❌ No user for JNV leaderboard update');
        return;
    }

    try {
        const db = firebase.firestore();
        const userId = user.uid;

        // Get user profile for display name and avatar
        const profile = window.BroProPlayer?.load() || {};
        const name = profile.displayName || profile.name || user.displayName || 'Student';
        const email = user.email;
        const avatar = profile.avatar || '🎓';
        const totalXP = profile.xp || 0;
        const level = profile.level || window.BroProPlayer?.calculateLevel(totalXP) || 1;

        // 1. Update JNV Class 9 specific leaderboard (using subcollection structure like main leaderboard)
        // Use FieldValue.increment to ADD earned XP to existing value (not overwrite!)
        const jnvLeaderboardRef = db.collection('leaderboards').doc('jnv-class-9').collection('players').doc(userId);

        await jnvLeaderboardRef.set({
            name: name,
            email: email,
            xp: firebase.firestore.FieldValue.increment(xpEarned), // ADD to existing XP, don't overwrite!
            avatar: avatar,
            level: level,
            quizzes: firebase.firestore.FieldValue.increment(1),
            totalCorrect: firebase.firestore.FieldValue.increment(correct),
            totalQuestions: firebase.firestore.FieldValue.increment(total),
            lastActive: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log('✅ JNV Class 9 Leaderboard updated: +' + xpEarned + ' XP');

        // 2. Also update global leaderboard with TOTAL XP (including JNV XP)
        const globalRef = db.collection('leaderboards').doc('global').collection('players').doc(userId);

        await globalRef.set({
            name: name,
            email: email,
            xp: totalXP, // Total XP across all subjects (this is cumulative from local profile)
            avatar: avatar,
            level: level,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log('🌍 Global Leaderboard updated:', totalXP, 'XP');

    } catch (error) {
        console.error('❌ Error updating JNV leaderboard:', error);
    }
}

// Current JNV leaderboard period
let currentJNVLeaderboardPeriod = 'alltime';

// Render JNV Leaderboard using the premium BroProLeaderboard system
function renderJNVLeaderboard(period = currentJNVLeaderboardPeriod) {
    currentJNVLeaderboardPeriod = period;

    const list = document.getElementById('jnvLeaderboardList');
    if (!list) return;

    // Use BroProLeaderboard if available
    if (window.BroProLeaderboard) {
        // Use the renderLeaderboard method with container ID and period
        BroProLeaderboard.renderLeaderboard('jnvLeaderboardList', 'jnv-class-9', {
            period: period,
            limit: 20
        });

        // Update user rank
        updateJNVUserRank(period);
    } else {
        // Fallback message
        list.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
                <p>Leaderboard loading...</p>
            </div>
        `;
    }
}

// Switch JNV Leaderboard time period
function switchJNVLeaderboardPeriod(period) {
    // Update tab button styles
    document.querySelectorAll('.jnv-tab-btn').forEach(btn => {
        const btnPeriod = btn.dataset.period;
        if (btnPeriod === period) {
            btn.classList.add('active');
            btn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
            btn.style.color = 'white';
            btn.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
        } else {
            btn.classList.remove('active');
            btn.style.background = 'transparent';
            btn.style.color = 'var(--text-secondary, #888)';
            btn.style.boxShadow = 'none';
        }
    });

    // Render with new period
    renderJNVLeaderboard(period);
}

// Update user's JNV rank display
async function updateJNVUserRank(period = 'alltime') {
    const positionEl = document.getElementById('jnvYourPosition');
    const scoreEl = document.getElementById('jnvYourScore');

    if (!positionEl || !scoreEl) return;

    try {
        if (window.BroProLeaderboard) {
            const rankData = await BroProLeaderboard.getUserRank('jnv-class-9');
            positionEl.textContent = rankData.rank || '-';
            scoreEl.textContent = (rankData.xp || 0).toLocaleString();
        } else {
            // Get from local profile
            const profile = window.BroProPlayer?.load() || {};
            const jnvXP = profile.subjectProgress?.jnv?.xp || 0;
            positionEl.textContent = '-';
            scoreEl.textContent = jnvXP.toLocaleString();
        }
    } catch (error) {
        console.error('Error getting JNV user rank:', error);
        positionEl.textContent = '-';
        scoreEl.textContent = '0';
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
