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
    const subjectNames = {
        english: '🇬🇧 English Practice',
        hindi: '🇮🇳 Hindi Practice',
        maths: '📐 Mathematics Practice',
        science: '🔬 Science Practice'
    };
    document.getElementById('quizMode').textContent = subjectNames[subject] || '🎯 Practice';
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

    currentQuiz = {
        subject: pyqKey,
        questions: [...questions],
        currentIndex: 0,
        correct: 0,
        wrong: 0,
        xp: 0
    };

    document.getElementById('quizMode').textContent = `📝 PYQ ${year} (${questions.length} Questions)`;
    document.getElementById('quizTotal').textContent = currentQuiz.questions.length;
    document.getElementById('quizXP').textContent = '0';

    document.getElementById('quizModal').classList.add('active');
    renderQuizQuestion();
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

    // Update progress
    document.getElementById('quizCurrent').textContent = currentQuiz.currentIndex + 1;
    document.getElementById('quizProgress').style.width =
        `${((currentQuiz.currentIndex) / currentQuiz.questions.length) * 100}%`;

    // Render question
    document.getElementById('quizQuestion').innerHTML = q.question;

    // Render options
    const optionsHTML = q.options.map((opt, i) => `
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
        feedback.innerHTML = `<strong>✅ Correct!</strong> +5 XP`;
    } else {
        currentQuiz.wrong++;
        feedback.className = 'quiz-feedback wrong';
        const correctAnswer = q.options[q.correct];
        feedback.innerHTML = `<strong>❌ Incorrect!</strong><br>Correct answer: ${correctAnswer}`;
        if (q.explanation) {
            feedback.innerHTML += `<br><br>💡 ${q.explanation}`;
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
