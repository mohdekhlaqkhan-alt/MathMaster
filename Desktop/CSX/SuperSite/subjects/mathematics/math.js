/* ============================================
   SUPERSITE MATHEMATICS - GAME ENGINE
   The Most Fun Math Learning Experience!
   ============================================ */

// ============================================
// PLAYER DATA
// ============================================
let playerData = {
    name: '',
    wallet: 0,  // Indian Rupees
    xp: 0,
    streak: 0,
    lastPlayed: null,
    totalSolved: 0,
    totalCorrect: 0,
    progress: {
        squares: 0,
        cubes: 0,
        tables: 0,
        formulas: 0
    }
};

// ============================================
// GAME STATE
// ============================================
let gameState = {
    mode: null,
    questions: [],
    currentIndex: 0,
    correct: 0,
    wrong: 0,
    combo: 0,
    maxCombo: 0,
    sessionCoins: 0,
    sessionXP: 0,
    startTime: null,
    isProcessing: false,  // Prevent multiple submissions
    userAnswers: [] // Track user's answers for explanations
};

// ============================================
// MATH DATA
// ============================================
const mathData = {
    squares: Array.from({ length: 30 }, (_, i) => ({
        q: `${i + 1}²`,
        a: (i + 1) ** 2,
        display: `What is ${i + 1}² ?`
    })),
    cubes: Array.from({ length: 20 }, (_, i) => ({
        q: `${i + 1}³`,
        a: (i + 1) ** 3,
        display: `What is ${i + 1}³ ?`
    })),
    tables: [],

    // Integer Operations (Sign Rules) - 30 MCQ Questions
    // Covers: Addition, Subtraction, Multiplication, Division, Double Negatives
    integers: [
        // === ADDITION WITH NEGATIVES (8 questions) ===
        { q: '(−7) + 2', a: '−5', options: ['−5', '5', '−9', '9'], display: '(−7) + 2 = ?' },
        { q: '(−3) + 8', a: '5', options: ['5', '−5', '11', '−11'], display: '(−3) + 8 = ?' },
        { q: '(−5) + (−4)', a: '−9', options: ['−9', '9', '−1', '1'], display: '(−5) + (−4) = ?' },
        { q: '(−12) + 7', a: '−5', options: ['−5', '5', '−19', '19'], display: '(−12) + 7 = ?' },
        { q: '15 + (−9)', a: '6', options: ['6', '−6', '24', '−24'], display: '15 + (−9) = ?' },
        { q: '(−6) + 6', a: '0', options: ['0', '12', '−12', '6'], display: '(−6) + 6 = ?' },
        { q: '(−8) + (−7)', a: '−15', options: ['−15', '15', '−1', '1'], display: '(−8) + (−7) = ?' },
        { q: '(−20) + 35', a: '15', options: ['15', '−15', '55', '−55'], display: '(−20) + 35 = ?' },

        // === SUBTRACTION WITH NEGATIVES (8 questions) ===
        { q: '(−2) − 3', a: '−5', options: ['−5', '5', '−1', '1'], display: '(−2) − 3 = ?' },
        { q: '5 − 12', a: '−7', options: ['−7', '7', '−17', '17'], display: '5 − 12 = ?' },
        { q: '(−9) − 6', a: '−15', options: ['−15', '15', '−3', '3'], display: '(−9) − 6 = ?' },
        { q: '8 − (−4)', a: '12', options: ['12', '−12', '4', '−4'], display: '8 − (−4) = ?' },
        { q: '(−7) − (−3)', a: '−4', options: ['−4', '4', '−10', '10'], display: '(−7) − (−3) = ?' },
        { q: '0 − (−5)', a: '5', options: ['5', '−5', '0', '−10'], display: '0 − (−5) = ?' },
        { q: '(−15) − (−15)', a: '0', options: ['0', '−30', '30', '15'], display: '(−15) − (−15) = ?' },
        { q: '(−4) − (−9)', a: '5', options: ['5', '−5', '−13', '13'], display: '(−4) − (−9) = ?' },

        // === MULTIPLICATION WITH SIGNS (7 questions) ===
        { q: '(−5) × 4', a: '−20', options: ['−20', '20', '−9', '9'], display: '(−5) × 4 = ?' },
        { q: '(−3) × (−6)', a: '18', options: ['18', '−18', '9', '−9'], display: '(−3) × (−6) = ?' },
        { q: '7 × (−2)', a: '−14', options: ['−14', '14', '−9', '5'], display: '7 × (−2) = ?' },
        { q: '(−8) × (−5)', a: '40', options: ['40', '−40', '13', '−13'], display: '(−8) × (−5) = ?' },
        { q: '(−1) × (−1)', a: '1', options: ['1', '−1', '0', '2'], display: '(−1) × (−1) = ?' },
        { q: '(−9) × 0', a: '0', options: ['0', '−9', '9', '−0'], display: '(−9) × 0 = ?' },
        { q: '(−4) × (−4)', a: '16', options: ['16', '−16', '8', '−8'], display: '(−4) × (−4) = ?' },

        // === DIVISION WITH SIGNS (7 questions) ===
        { q: '(−12) ÷ 3', a: '−4', options: ['−4', '4', '−9', '9'], display: '(−12) ÷ 3 = ?' },
        { q: '(−18) ÷ (−6)', a: '3', options: ['3', '−3', '12', '−12'], display: '(−18) ÷ (−6) = ?' },
        { q: '24 ÷ (−8)', a: '−3', options: ['−3', '3', '−16', '16'], display: '24 ÷ (−8) = ?' },
        { q: '(−35) ÷ (−7)', a: '5', options: ['5', '−5', '28', '−28'], display: '(−35) ÷ (−7) = ?' },
        { q: '(−27) ÷ 9', a: '−3', options: ['−3', '3', '−18', '18'], display: '(−27) ÷ 9 = ?' },
        { q: '0 ÷ (−5)', a: '0', options: ['0', '−5', '5', 'undefined'], display: '0 ÷ (−5) = ?' },
        { q: '(−36) ÷ (−4)', a: '9', options: ['9', '−9', '32', '−32'], display: '(−36) ÷ (−4) = ?' }
    ],

    // Categorized Formula Questions (Pure Formula MCQs - No Numerical Calculations)
    formulaCategories: {
        exponents: [
            { q: "aᵐ × aⁿ = ?", a: "aᵐ⁺ⁿ", options: ["aᵐ⁺ⁿ", "aᵐⁿ", "aᵐ⁻ⁿ", "aᵐ/ⁿ"], display: "aᵐ × aⁿ = ?" },
            { q: "aᵐ ÷ aⁿ = ?", a: "aᵐ⁻ⁿ", options: ["aᵐ⁺ⁿ", "aᵐ⁻ⁿ", "aᵐⁿ", "aᵐ×ⁿ"], display: "aᵐ ÷ aⁿ = ?" },
            { q: "(aᵐ)ⁿ = ?", a: "aᵐⁿ", options: ["aᵐ⁺ⁿ", "aᵐ⁻ⁿ", "aᵐⁿ", "aᵐ/ⁿ"], display: "(aᵐ)ⁿ = ?" },
            { q: "(ab)ⁿ = ?", a: "aⁿbⁿ", options: ["aⁿ+bⁿ", "aⁿbⁿ", "(a+b)ⁿ", "aⁿ-bⁿ"], display: "(ab)ⁿ = ?" },
            { q: "a⁰ = ? (where a ≠ 0)", a: "1", options: ["0", "1", "a", "undefined"], display: "a⁰ = ? (where a ≠ 0)" },
            { q: "a⁻ⁿ = ?", a: "1/aⁿ", options: ["aⁿ", "-aⁿ", "1/aⁿ", "-1/aⁿ"], display: "a⁻ⁿ = ?" }
        ],
        algebraic: [
            { q: "(a + b)² = ?", a: "a² + 2ab + b²", options: ["a² + b²", "a² + 2ab + b²", "a² - 2ab + b²", "2ab"], display: "(a + b)² = ?" },
            { q: "(a - b)² = ?", a: "a² - 2ab + b²", options: ["a² - b²", "a² - 2ab + b²", "a² + 2ab + b²", "2ab"], display: "(a - b)² = ?" },
            { q: "a² - b² = ?", a: "(a+b)(a-b)", options: ["(a+b)²", "(a-b)²", "(a+b)(a-b)", "a²+b²"], display: "a² - b² = ?" },
            { q: "(a + b)³ = ?", a: "a³ + 3a²b + 3ab² + b³", options: ["a³ + b³", "a³ + 3a²b + 3ab² + b³", "a³ + 3ab + b³", "(a+b)(a²+b²)"], display: "(a + b)³ = ?" },
            { q: "a³ + b³ = ?", a: "(a+b)(a²-ab+b²)", options: ["(a+b)³", "(a+b)(a²-ab+b²)", "(a+b)(a²+b²)", "(a-b)(a²+ab+b²)"], display: "a³ + b³ = ?" },
            { q: "a³ - b³ = ?", a: "(a-b)(a²+ab+b²)", options: ["(a-b)³", "(a-b)(a²+ab+b²)", "(a-b)(a²-b²)", "(a+b)(a²-ab+b²)"], display: "a³ - b³ = ?" }
        ],
        geometry: [
            { q: "Sum of angles in a triangle = ? (त्रिभुज के कोणों का योग = ?)", a: "180°", options: ["90°", "180°", "270°", "360°"], display: "Sum of angles in a triangle = ? (त्रिभुज के कोणों का योग = ?)" },
            { q: "Sum of angles in a quadrilateral = ? (चतुर्भुज के कोणों का योग = ?)", a: "360°", options: ["180°", "270°", "360°", "540°"], display: "Sum of angles in a quadrilateral = ? (चतुर्भुज के कोणों का योग = ?)" },
            { q: "Pythagoras Theorem: Hypotenuse² = ? (पाइथागोरस प्रमेय: कर्ण² = ?)", a: "Base² + Perpendicular² (आधार² + लंब²)", options: ["Base + Perpendicular (आधार + लंब)", "Base² - Perpendicular² (आधार² - लंब²)", "Base² + Perpendicular² (आधार² + लंब²)", "2 × Base × Perpendicular (2 × आधार × लंब)"], display: "Pythagoras Theorem: Hypotenuse² = ? (पाइथागोरस प्रमेय: कर्ण² = ?)" },
            { q: "Sum of interior angles of n-sided polygon = ? (n-भुज के आंतरिक कोणों का योग = ?)", a: "(n-2) × 180°", options: ["n × 180°", "(n-2) × 180°", "(n+2) × 180°", "n × 90°"], display: "Sum of interior angles of n-gon = ? (n-भुज के आंतरिक कोणों का योग = ?)" },
            { q: "Each angle of equilateral triangle = ? (समबाहु त्रिभुज का प्रत्येक कोण = ?)", a: "60°", options: ["45°", "60°", "90°", "120°"], display: "Each angle of equilateral triangle = ? (समबाहु त्रिभुज का प्रत्येक कोण = ?)" },
            { q: "Exterior angle of triangle = ? (त्रिभुज का बाह्य कोण = ?)", a: "Sum of opposite interior angles (विपरीत आंतरिक कोणों का योग)", options: ["90°", "Sum of opposite interior angles (विपरीत आंतरिक कोणों का योग)", "180°", "Adjacent interior angle (समीपवर्ती आंतरिक कोण)"], display: "Exterior angle of triangle = ? (त्रिभुज का बाह्य कोण = ?)" }
        ],
        mensuration: [
            { q: "Area of Circle = ? (वृत्त का क्षेत्रफल = ?)", a: "πr² (क्षेत्रफल/Area)", options: ["2πr (परिधि/Circumference)", "πr² (क्षेत्रफल/Area)", "πd (व्यास π)", "2πr²"], display: "Area of Circle = ? (वृत्त का क्षेत्रफल = ?)" },
            { q: "Circumference of Circle = ? (वृत्त की परिधि = ?)", a: "2πr (परिधि/Circumference)", options: ["πr² (क्षेत्रफल/Area)", "2πr (परिधि/Circumference)", "πd²", "πr"], display: "Circumference of Circle = ? (वृत्त की परिधि = ?)" },
            { q: "Volume of Cylinder = ? (बेलन का आयतन = ?)", a: "πr²h (आयतन/Volume)", options: ["2πrh (वक्र पृष्ठ/CSA)", "πr²h (आयतन/Volume)", "πr²", "2πr²h"], display: "Volume of Cylinder = ? (बेलन का आयतन = ?)" },
            { q: "Volume of Cone = ? (शंकु का आयतन = ?)", a: "⅓πr²h (शंकु/Cone)", options: ["πr²h (बेलन/Cylinder)", "⅓πr²h (शंकु/Cone)", "½πr²h", "2πr²h"], display: "Volume of Cone = ? (शंकु का आयतन = ?)" },
            { q: "Volume of Sphere = ? (गोले का आयतन = ?)", a: "⁴⁄₃πr³ (आयतन/Volume)", options: ["4πr² (पृष्ठीय क्षेत्रफल/SA)", "⁴⁄₃πr³ (आयतन/Volume)", "πr³", "2πr³"], display: "Volume of Sphere = ? (गोले का आयतन = ?)" },
            { q: "Surface Area of Sphere = ? (गोले का पृष्ठीय क्षेत्रफल = ?)", a: "4πr² (पृष्ठीय क्षेत्रफल/SA)", options: ["2πr²", "4πr² (पृष्ठीय क्षेत्रफल/SA)", "πr²", "⁴⁄₃πr³ (आयतन/Volume)"], display: "Surface Area of Sphere = ? (गोले का पृष्ठीय क्षेत्रफल = ?)" }
        ],
        trigonometry: [
            { q: "sin²θ + cos²θ = ?", a: "1", options: ["0", "1", "2", "sin2θ"], display: "sin²θ + cos²θ = ?" },
            { q: "1 + tan²θ = ?", a: "sec²θ", options: ["cot²θ", "sec²θ", "cosec²θ", "cos²θ"], display: "1 + tan²θ = ?" },
            { q: "1 + cot²θ = ?", a: "cosec²θ", options: ["tan²θ", "sec²θ", "cosec²θ", "sin²θ"], display: "1 + cot²θ = ?" },
            { q: "tan θ = ?", a: "sin θ / cos θ", options: ["cos θ / sin θ", "sin θ / cos θ", "sin θ × cos θ", "1 / sin θ"], display: "tan θ = ?" },
            { q: "sin(90° - θ) = ?", a: "cos θ", options: ["sin θ", "cos θ", "tan θ", "-sin θ"], display: "sin(90° - θ) = ?" },
            { q: "cos(90° - θ) = ?", a: "sin θ", options: ["sin θ", "cos θ", "-cos θ", "tan θ"], display: "cos(90° - θ) = ?" }
        ]
    },

    // Legacy formulas array (for backward compatibility)
    formulas: []
};

// Generate times tables (12 to 20)
for (let t = 12; t <= 20; t++) {
    for (let m = 1; m <= 10; m++) {
        mathData.tables.push({
            q: `${t} × ${m}`,
            a: t * m,
            display: `What is ${t} × ${m} ?`
        });
    }
}

// ============================================
// MASCOT MESSAGES
// ============================================
const mascotMessages = {
    welcome: [
        "Hey there, Math Champion! 🎉 Ready to have some fun with numbers?",
        "Welcome back! Let's crush some math problems today! 💪",
        "Math time! Your brain is about to get a workout! 🧠",
        "Ready to become a math legend? Let's go! 🚀"
    ],
    correct: [
        "Amazing! You're on fire! 🔥",
        "Brilliant! That brain is working overtime! 🧠",
        "Perfect! You're unstoppable! ⚡",
        "Yes! Math genius alert! 🌟",
        "Incredible! Keep that streak going! 🎯"
    ],
    wrong: [
        "Oops! Don't worry, mistakes help us learn! 📚",
        "So close! You'll get the next one! 💪",
        "That's okay! Every mistake is a lesson! 🎓",
        "Keep trying! Champions never give up! 🏆"
    ],
    combo: [
        "🔥 COMBO x{n}! You're on a roll!",
        "⚡ {n}x STREAK! Unstoppable!",
        "🌟 {n} in a row! Math wizard!",
        "💫 {n}x COMBO! Legendary!"
    ]
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerData();
    initTheme();
    initParticles();
    checkStreak();
    updateUI();
    checkNewBadges(); // Hide "NEW" badges after 4 days

    // Check if using main profile system (BroProPlayer) or local
    if (window.BroProPlayer) {
        const profile = BroProPlayer.load();
        // If user is logged in with main system, use that name
        if (profile.name || profile.displayName) {
            playerData.name = profile.displayName || profile.name;
            savePlayerData();
            showMascotMessage('welcome');
        } else if (!playerData.name) {
            // No name in either system - redirect to home to set up profile
            showMascotMessage('welcome', 'Click your Level badge on the main page to set up your profile! 🎯');
        } else {
            showMascotMessage('welcome');
        }
    } else if (!playerData.name) {
        // Fallback: show name modal only if no profile system available
        showNameModal();
    } else {
        showMascotMessage('welcome');
    }

    // Enter key for answer
    document.getElementById('answerInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
});

// Hide NEW badges after 4 days
function checkNewBadges() {
    const cards = document.querySelectorAll('[data-added]');
    const now = new Date();
    const FOUR_DAYS_MS = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds

    cards.forEach(card => {
        const addedDate = new Date(card.getAttribute('data-added'));
        const timePassed = now - addedDate;

        if (timePassed > FOUR_DAYS_MS) {
            // Hide the NEW badge if more than 4 days have passed
            const badge = card.querySelector('.new-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        }
    });
}

// ============================================
// LOCAL STORAGE
// ============================================
function loadPlayerData() {
    const saved = localStorage.getItem('supersite-math-player');
    if (saved) {
        playerData = JSON.parse(saved);
    }
}

function savePlayerData() {
    localStorage.setItem('supersite-math-player', JSON.stringify(playerData));
}

// ============================================
// UI UPDATES
// ============================================
function updateUI() {
    // Get wallet from global profile if available
    const globalProfile = window.BroProPlayer ? BroProPlayer.load() : null;
    const walletAmount = globalProfile?.wallet || playerData.wallet || 0;

    // Update wallet display if exists
    const walletEl = document.getElementById('walletCount');
    if (walletEl) {
        walletEl.textContent = '₹' + walletAmount;
    }

    document.getElementById('xpCount').textContent = playerData.xp;
    document.getElementById('streakCount').textContent = playerData.streak;
    document.getElementById('totalSolved').textContent = playerData.totalSolved;

    const accuracy = playerData.totalSolved > 0
        ? Math.round((playerData.totalCorrect / playerData.totalSolved) * 100)
        : 0;
    document.getElementById('accuracyPercent').textContent = accuracy + '%';

    document.getElementById('rankDisplay').textContent = getRank(playerData.xp);

    updateProgressRings();
}

function updateProgressRings() {
    const progressData = {
        squares: { max: 30, current: playerData.progress.squares },
        cubes: { max: 20, current: playerData.progress.cubes },
        tables: { max: 90, current: playerData.progress.tables },
        formulas: { max: 8, current: playerData.progress.formulas }
    };

    Object.keys(progressData).forEach(key => {
        const ring = document.getElementById(`${key}Progress`);
        if (ring) {
            const percent = (progressData[key].current / progressData[key].max) * 100;
            const offset = 283 - (283 * percent / 100);
            const circle = ring.querySelector('.progress-fill');
            if (circle) {
                circle.style.strokeDashoffset = offset;
                circle.style.stroke = getProgressColor(percent);
            }
            ring.querySelector('.progress-text').textContent = Math.round(percent) + '%';
        }
    });
}

function getProgressColor(percent) {
    if (percent < 30) return '#f87171';
    if (percent < 60) return '#fbbf24';
    if (percent < 90) return '#4ade80';
    return '#22d3ee';
}

function getRank(xp) {
    if (xp >= 10000) return '👑 Legend';
    if (xp >= 5000) return '💎 Diamond';
    if (xp >= 2000) return '🥇 Platinum';
    if (xp >= 1000) return '🥈 Gold';
    if (xp >= 500) return '🥉 Silver';
    return '🔰 Bronze';
}

// ============================================
// STREAK SYSTEM
// ============================================
function checkStreak() {
    const today = new Date().toDateString();
    const lastPlayed = playerData.lastPlayed;

    if (lastPlayed) {
        const lastDate = new Date(lastPlayed);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate.toDateString() === yesterday.toDateString()) {
            // Streak continues!
        } else if (lastDate.toDateString() !== today) {
            // Streak broken
            playerData.streak = 0;
        }
    }
}

function updateStreak() {
    const today = new Date().toDateString();
    if (playerData.lastPlayed !== today) {
        playerData.streak++;
        playerData.lastPlayed = today;
        savePlayerData();

        if (playerData.streak > 1) {
            showMascotMessage('combo', `🔥 ${playerData.streak} Day Streak! Keep it up!`);
        }
    }
}

// ============================================
// MASCOT
// ============================================
function showMascotMessage(type, customMessage = null) {
    const speech = document.getElementById('mascotSpeech');
    let message;

    if (customMessage) {
        message = customMessage;
    } else {
        const messages = mascotMessages[type];
        message = messages[Math.floor(Math.random() * messages.length)];
    }

    speech.querySelector('p').textContent = message;
    speech.style.animation = 'none';
    setTimeout(() => speech.style.animation = 'fadeInUp 0.5s ease', 10);
}

// ============================================
// NAME MODAL
// ============================================
function showNameModal() {
    document.getElementById('nameModal').classList.add('active');
}

function saveName() {
    const name = document.getElementById('playerNameInput').value.trim();
    if (name.length > 0) {
        playerData.name = name;
        savePlayerData();
        document.getElementById('nameModal').classList.remove('active');
        showMascotMessage('welcome');
    }
}

// ============================================
// GAME ACTIVITIES
// ============================================
function openActivity(mode) {
    if (mode === 'tables') {
        document.getElementById('tableSelectionModal').style.display = 'flex';
        return;
    }

    if (mode === 'formulas') {
        document.getElementById('formulaSelectionModal').style.display = 'flex';
        return;
    }

    startGame(mode);
}

function closeTableSelection() {
    document.getElementById('tableSelectionModal').style.display = 'none';
}

function closeFormulaSelection() {
    document.getElementById('formulaSelectionModal').style.display = 'none';
}

function startFormulaGame(category) {
    closeFormulaSelection();

    // Get questions based on category
    if (category === 'all') {
        // Mix all formula categories
        const allFormulas = [
            ...mathData.formulaCategories.exponents,
            ...mathData.formulaCategories.algebraic,
            ...mathData.formulaCategories.geometry,
            ...mathData.formulaCategories.mensuration,
            ...mathData.formulaCategories.trigonometry
        ];
        mathData.selectedFormulaQuestions = shuffleArray(allFormulas).slice(0, 20);
    } else {
        mathData.selectedFormulaQuestions = shuffleArray([...mathData.formulaCategories[category]]);
    }

    startGame('formulas');
}

function closeTableSelection() {
    document.getElementById('tableSelectionModal').style.display = 'none';
}

function startTableGame(table) {
    closeTableSelection();

    // Filter questions based on selection
    if (table === 'all') {
        mathData.selectedTableQuestions = shuffleArray([...mathData.tables]);
    } else {
        mathData.selectedTableQuestions = mathData.tables.filter(q => q.q.startsWith(`${table} ×`));
        // Shuffle the 10 questions for this table
        mathData.selectedTableQuestions = shuffleArray(mathData.selectedTableQuestions);
    }

    startGame('tables');
}

// Activity order for access control (first one is free)
const mathActivityOrder = ['squares', 'cubes', 'tables', 'formulas', 'integers', 'speed'];

function startGame(mode) {
    // Check access - first activity is free, others need login
    const activityIndex = mathActivityOrder.indexOf(mode);
    const activityNames = {
        squares: 'Squares Master',
        cubes: 'Cubes Champion',
        tables: 'Times Tables',
        formulas: 'Formula Quiz',
        integers: 'Integer Master',
        speed: 'Speed Challenge'
    };

    // Block access for non-first activities if not logged in OR not premium
    if (activityIndex > 0) {
        // First check if logged in
        if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
            if (window.BroProAuth) {
                BroProAuth.showLoginRequired(`Login to unlock "${activityNames[mode] || mode}" and all other activities!`);
            } else {
                alert('Please login to access this activity!');
            }
            return;
        }

        // Then check if premium (only for logged in users)
        if (window.BroProPremium && !BroProPremium.isPremium()) {
            BroProPremium.showPremiumRequired(activityNames[mode] || mode);
            return;
        }
    }

    gameState.mode = mode;
    gameState.currentIndex = 0;
    gameState.correct = 0;
    gameState.wrong = 0;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.sessionCoins = 0;
    gameState.sessionXP = 0;
    gameState.startTime = Date.now();
    gameState.isFormulaMCQ = false;  // Reset MCQ mode
    gameState.userAnswers = []; // Reset user answers

    // Generate questions
    if (mode === 'formulas') {
        gameState.questions = mathData.selectedFormulaQuestions || shuffleArray([...mathData.formulaCategories.exponents]);
        gameState.isFormulaMCQ = true;
    } else if (mode === 'speed') {
        // Speed mode: mix of all types
        const mixed = [
            ...shuffleArray([...mathData.squares]).slice(0, 10),
            ...shuffleArray([...mathData.cubes]).slice(0, 5),
            ...shuffleArray([...mathData.tables]).slice(0, 10)
        ];
        gameState.questions = shuffleArray(mixed).slice(0, 20);
    } else if (mode === 'squares') {
        // Squares Master: All 30 squares (1² to 30²)
        gameState.questions = shuffleArray([...mathData.squares]);
    } else if (mode === 'cubes') {
        // Cubes Champion: All 20 cubes (1³ to 20³)
        gameState.questions = shuffleArray([...mathData.cubes]);
    } else if (mode === 'tables') {
        // Times Tables
        gameState.questions = mathData.selectedTableQuestions || shuffleArray([...mathData.tables]);
    } else if (mode === 'integers') {
        // Integer Master: All 30 sign rule questions (MCQ format)
        gameState.questions = shuffleArray([...mathData.integers]);
        gameState.isFormulaMCQ = true;  // Enable MCQ mode for integers
    } else {
        gameState.questions = shuffleArray([...mathData[mode]]).slice(0, 10);
    }

    // Update game header
    const modeNames = {
        squares: 'Squares Master',
        cubes: 'Cubes Champion',
        tables: 'Times Tables',
        formulas: 'Formula Genius',
        integers: 'Integer Master ➕➖',
        speed: 'Speed Blitz ⚡'
    };
    document.getElementById('gameMode').textContent = modeNames[mode];
    document.getElementById('totalQ').textContent = gameState.questions.length;

    // Show game modal
    document.getElementById('gameModal').classList.add('active');

    // Load first question
    loadQuestion();

    // Focus input
    setTimeout(() => document.getElementById('answerInput').focus(), 100);
}

function loadQuestion() {
    const q = gameState.questions[gameState.currentIndex];

    // Reset processing lock
    gameState.isProcessing = false;

    const input = document.getElementById('answerInput');
    const answerSection = document.getElementById('answerSection');
    const mcqOptions = document.getElementById('mcqOptions');

    // Check if this is an MCQ question (formula mode)
    if (gameState.isFormulaMCQ && q.options) {
        // Hide text input, show MCQ options, hide number pad
        answerSection.style.display = 'none';
        mcqOptions.style.display = 'grid';
        document.getElementById('numberPad').style.display = 'none';

        // Generate shuffled options
        const shuffledOptions = shuffleArray([...q.options]);
        mcqOptions.innerHTML = shuffledOptions.map(opt => `
            <button class="mcq-option" onclick="selectMCQOption(this, '${opt.replace(/'/g, "\\'")}')">${opt}</button>
        `).join('');
    } else {
        // Show text input, hide MCQ options, show number pad
        answerSection.style.display = 'flex';
        mcqOptions.style.display = 'none';
        document.getElementById('numberPad').style.display = 'grid';
        input.disabled = false;
        input.readOnly = false;
        input.value = '';
        // Don't auto-focus on mobile to avoid keyboard popup automatically
        // User can tap input to show keyboard or use number pad
    }

    document.getElementById('qNumber').textContent = gameState.currentIndex + 1;
    document.getElementById('currentQ').textContent = gameState.currentIndex;
    document.getElementById('questionText').textContent = q.display || q.q;
    document.getElementById('feedback').className = 'feedback-container';

    // Update progress bar
    const progress = (gameState.currentIndex / gameState.questions.length) * 100;
    document.getElementById('gameProgress').style.width = progress + '%';

    // Update session rewards display
    document.getElementById('sessionCoins').textContent = gameState.sessionCoins;
    document.getElementById('sessionXP').textContent = gameState.sessionXP;
}

// Handle MCQ option selection
function selectMCQOption(btn, answer) {
    if (gameState.isProcessing) return;
    gameState.isProcessing = true;

    const q = gameState.questions[gameState.currentIndex];
    const isCorrect = answer === q.a;

    // Track user's answer for explanations
    gameState.userAnswers[gameState.currentIndex] = answer;

    // Disable all buttons
    document.querySelectorAll('.mcq-option').forEach(b => {
        b.disabled = true;
        if (b.textContent === q.a) {
            b.classList.add('correct');
        }
    });

    const feedback = document.getElementById('feedback');

    if (isCorrect) {
        btn.classList.add('correct');
        gameState.correct++;
        gameState.combo++;
        gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);

        const baseXP = 10;
        const comboMultiplier = 1 + (gameState.combo * 0.1);
        const xpEarned = Math.floor(baseXP * comboMultiplier);

        gameState.sessionXP += xpEarned;

        feedback.className = 'feedback-container correct';
        feedback.querySelector('.feedback-icon').textContent = '✅';
        feedback.querySelector('.feedback-text').textContent = `Correct! +${xpEarned} XP`;

        // Use recordCorrect for streak tracking (plays correct sound + checks for 4-streak)
        if (window.BroProSounds) BroProSounds.recordCorrect();

        if (gameState.combo >= 3) {
            showCombo(gameState.combo);
        }
    } else {
        btn.classList.add('wrong');
        gameState.wrong++;
        gameState.combo = 0;

        feedback.className = 'feedback-container wrong';
        feedback.querySelector('.feedback-icon').textContent = '❌';
        feedback.querySelector('.feedback-text').textContent = `Answer: ${q.a}`;

        // Use recordWrong for streak tracking (resets streak + plays Ayein sound)
        if (window.BroProSounds) BroProSounds.recordWrong();
    }

    document.getElementById('sessionCoins').textContent = gameState.sessionCoins;
    document.getElementById('sessionXP').textContent = gameState.sessionXP;

    // Auto-advance to next question
    setTimeout(() => {
        gameState.isProcessing = false;
        gameState.currentIndex++;
        if (gameState.currentIndex >= gameState.questions.length) {
            endGame();
        } else {
            loadQuestion();
        }
    }, 1500);
}

function checkAnswer() {
    // Prevent multiple submissions
    if (gameState.isProcessing) return;

    const input = document.getElementById('answerInput');
    const userAnswer = input.value.trim();
    const q = gameState.questions[gameState.currentIndex];

    if (!userAnswer) return;

    // Lock to prevent multiple submissions
    gameState.isProcessing = true;
    input.disabled = true;

    // Track user's answer for explanations
    gameState.userAnswers[gameState.currentIndex] = userAnswer;

    const isCorrect = String(q.a).toLowerCase() === userAnswer.toLowerCase() ||
        Number(q.a) === Number(userAnswer);

    const feedback = document.getElementById('feedback');

    if (isCorrect) {
        // Correct answer!
        gameState.correct++;
        gameState.combo++;
        gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);

        // Calculate XP reward with combo bonus
        const baseXP = gameState.mode === 'speed' ? 15 : 10;
        const comboMultiplier = 1 + (gameState.combo * 0.1);
        const xpEarned = Math.floor(baseXP * comboMultiplier);

        gameState.sessionXP += xpEarned;

        feedback.className = 'feedback-container correct';
        feedback.querySelector('.feedback-icon').textContent = '✅';
        feedback.querySelector('.feedback-text').textContent = `Correct! +${xpEarned} XP`;

        // Use recordCorrect for streak tracking (plays correct sound + checks for 4-streak)
        if (window.BroProSounds) {
            BroProSounds.recordCorrect();
        }

        // Show combo if high enough
        if (gameState.combo >= 3) {
            showCombo(gameState.combo);
        }

    } else {
        // Wrong answer
        gameState.wrong++;
        gameState.combo = 0;

        feedback.className = 'feedback-container wrong';
        feedback.querySelector('.feedback-icon').textContent = '❌';
        feedback.querySelector('.feedback-text').textContent = `The answer was ${q.a}`;

        // Use recordWrong for streak tracking (resets streak + plays Ayein sound)
        if (window.BroProSounds) {
            BroProSounds.recordWrong();
        }
    }

    // Update displays
    document.getElementById('sessionCoins').textContent = gameState.sessionCoins;
    document.getElementById('sessionXP').textContent = gameState.sessionXP;

    // Move to next question after delay
    setTimeout(() => {
        gameState.isProcessing = false;
        gameState.currentIndex++;
        if (gameState.currentIndex >= gameState.questions.length) {
            endGame();
        } else {
            loadQuestion();
        }
    }, 1200);
}

function showCombo(count) {
    const comboDisplay = document.getElementById('comboDisplay');
    document.getElementById('comboCount').textContent = count;
    comboDisplay.classList.add('active');

    setTimeout(() => {
        comboDisplay.classList.remove('active');
    }, 1000);
}

function endGame() {
    // Hide game modal
    document.getElementById('gameModal').classList.remove('active');

    const total = gameState.questions.length;
    const accuracy = Math.round((gameState.correct / total) * 100);

    // Calculate XP with mastery multiplier
    let finalXP = gameState.sessionXP;
    let xpMessage = null;

    if (window.BroProPlayer) {
        // Get XP multiplier based on mastery status
        const multiplierInfo = BroProPlayer.calculateXPMultiplier('math', gameState.mode, accuracy);
        finalXP = Math.floor(gameState.sessionXP * multiplierInfo.multiplier);
        xpMessage = multiplierInfo.message;

        // Record this quiz completion
        BroProPlayer.recordQuizCompletion('math', gameState.mode, gameState.correct, total);

        console.log(`📊 Math Quiz Complete - Raw XP: ${gameState.sessionXP}, Multiplier: ${multiplierInfo.multiplier}, Final XP: ${finalXP}`);
    }

    // Update player data (with adjusted XP)
    playerData.xp += finalXP;
    playerData.totalSolved += total;
    playerData.totalCorrect += gameState.correct;

    // Update progress for this mode
    if (gameState.mode !== 'speed') {
        playerData.progress[gameState.mode] = Math.min(
            playerData.progress[gameState.mode] + gameState.correct,
            gameState.mode === 'squares' ? 30 :
                gameState.mode === 'cubes' ? 20 :
                    gameState.mode === 'tables' ? 90 : 8
        );
    }

    updateStreak();
    savePlayerData();
    updateUI();

    // Update global gamification
    if (window.BroProPlayer) {
        console.log('🎮 Game ended! Adjusted XP:', finalXP);

        BroProPlayer.addXP(finalXP, 'math');

        // Force leaderboard update directly as backup
        const profile = BroProPlayer.load();
        console.log('📊 Profile after update - Total XP:', profile.xp, 'Math XP:', profile.subjectProgress?.math?.xp);

        // Direct update to leaderboards
        if (window.BroProLeaderboard && BroProLeaderboard.db) {
            const mathXP = profile.subjectProgress?.math?.xp || 0;
            console.log('🏆 Direct leaderboard update - Math:', mathXP, 'Global:', profile.xp);
            BroProLeaderboard.updateSubjectScore('math', mathXP, profile.name);
        } else {
            console.log('⚠️ Leaderboard not ready, db:', !!BroProLeaderboard?.db);
        }
    } else {
        console.log('❌ BroProPlayer not available!');
    }

    // Show results
    document.getElementById('correctCount').textContent = gameState.correct;
    document.getElementById('wrongCount').textContent = gameState.wrong;
    document.getElementById('accuracyResult').textContent = accuracy + '%';
    document.getElementById('xpEarned').textContent = finalXP;

    // Show practice mode indicator if applicable
    const resultsXPElement = document.getElementById('xpEarned');
    if (xpMessage && resultsXPElement && finalXP < gameState.sessionXP) {
        resultsXPElement.innerHTML = `${finalXP} <small style="font-size:0.6em;opacity:0.7">(Practice)</small>`;
    }

    // Set results title based on performance
    const title = accuracy >= 90 ? '🌟 PERFECT! 🌟' :
        accuracy >= 70 ? '🎉 Amazing Work!' :
            accuracy >= 50 ? '👍 Good Job!' :
                '💪 Keep Practicing!';
    document.getElementById('resultsTitle').textContent = title;

    document.getElementById('resultsModal').classList.add('active');

    // Store quiz results for explanations
    if (window.BroProExplanations) {
        // Convert math questions to standard format for explanations
        const formattedQuestions = gameState.questions.map(q => ({
            q: q.display || q.q,
            answer: String(q.a),
            options: q.options || null
        }));
        BroProExplanations.storeQuizResults(formattedQuestions, gameState.userAnswers, 'math', gameState.mode);
    }

    // Fire confetti and play sound if good performance
    if (accuracy >= 70) {
        fireConfetti();
        if (window.BroProSounds) {
            BroProSounds.play('levelup');
        }
        if (window.BroProEffects) {
            BroProEffects.confetti();
        }

        // 🎁 Trigger Mystery Box (30% chance after good quiz performance)
        if (window.BroProMysteryBox && Math.random() < 0.3) {
            setTimeout(() => {
                BroProMysteryBox.showMysteryBox('math-quiz');
            }, 2000); // Delay to let results show first
        }
    }

    // 🎰 Check for Saat Crore Easter Egg (7 quizzes with 90%+ accuracy)
    if (window.SaatCroreEasterEgg) {
        SaatCroreEasterEgg.recordPerfectQuiz(accuracy, gameState.mode);
    }

    // 📢 Log to real-time activity feed (visible to all users)
    if (window.logQuizActivity) {
        logQuizActivity('math', finalXP, accuracy);
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

function closeGame() {
    document.getElementById('gameModal').classList.remove('active');
}

function replayGame() {
    document.getElementById('resultsModal').classList.remove('active');
    openActivity(gameState.mode);
}

function goHome() {
    document.getElementById('resultsModal').classList.remove('active');
}

// ============================================
// NUMBER PAD
// ============================================
function appendNumber(num) {
    const input = document.getElementById('answerInput');
    if (input && !input.disabled) {
        // Just append the number, don't blur - let keyboard stay if open
        input.value += num;
    }
}

function clearInput(event) {
    // Prevent any default button behavior
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const input = document.getElementById('answerInput');
    if (input) {
        input.value = '';
    }
}

// Toggle minus sign at the beginning of the answer
function toggleMinus() {
    const input = document.getElementById('answerInput');
    if (input && !input.disabled) {
        if (input.value.startsWith('-')) {
            // Remove the minus sign
            input.value = input.value.substring(1);
        } else {
            // Add minus sign at the beginning
            input.value = '-' + input.value;
        }
    }
}

// ============================================
// LEADERBOARD
// ============================================
const sampleLeaderboard = [
    { name: 'MathWhiz123', score: 15420, avatar: '🧙' },
    { name: 'NumberNinja', score: 12350, avatar: '🥷' },
    { name: 'CalcMaster', score: 10200, avatar: '🦊' },
    { name: 'AlgebraAce', score: 8900, avatar: '🐼' },
    { name: 'PiLover', score: 7650, avatar: '🦉' },
    { name: 'QuickCalc', score: 6400, avatar: '🐯' },
    { name: 'MathGenius', score: 5200, avatar: '🦁' },
    { name: 'NumberCruncher', score: 4100, avatar: '🐻' },
    { name: 'EquationKing', score: 3500, avatar: '👑' },
    { name: 'MathRookie', score: 2800, avatar: '🌟' }
];

function openLeaderboard() {
    if (!window.BroProPlayer || !BroProPlayer.isLoggedIn()) {
        BroProAuth.showLoginRequired('Login to view the leaderboard!');
        return;
    }
    renderLeaderboard();
    document.getElementById('leaderboardModal').classList.add('active');
}

function closeLeaderboard() {
    document.getElementById('leaderboardModal').classList.remove('active');
}

// Current math leaderboard period
let currentMathPeriod = 'alltime';

function switchTab(period) {
    currentMathPeriod = period;

    // Update tab buttons with premium styles
    const tabs = document.querySelectorAll('#mathLeaderboardTabs .tab-btn');
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

    // Re-render with new period
    renderLeaderboard(period);
}

function renderLeaderboard(period = 'alltime') {
    const currentPlayer = window.BroProPlayer?.getName() || null;
    const list = document.getElementById('leaderboardList');

    // Use new leaderboard system
    if (window.BroProLeaderboard && BroProLeaderboard.db) {
        // Show loading
        list.innerHTML = '<div style="text-align:center;padding:2rem;"><div style="font-size:2rem;animation:spin 1s linear infinite;">⏳</div><p>Loading...</p></div>';

        // Use the renderLeaderboard method with container ID and period
        BroProLeaderboard.renderLeaderboard('leaderboardList', 'math', {
            showDelete: false,
            limit: 20,
            period: period
        });

        // Also update your rank separately
        BroProLeaderboard.getUserRank('math').then(rankInfo => {
            document.getElementById('yourPosition').textContent = rankInfo.rank;
            document.getElementById('yourScore').textContent = rankInfo.xp.toLocaleString();
        });

    } else {
        // Fallback to localStorage
        const leaderboard = JSON.parse(localStorage.getItem('supersite-leaderboard-math') || '[]');
        leaderboard.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        if (leaderboard.length === 0) {
            list.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No players yet. Start playing to be #1!</p>';
        } else {
            list.innerHTML = leaderboard.slice(0, 10).map((player, i) => `
                <div class="leaderboard-item ${i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : ''} ${player.name === currentPlayer ? 'is-player' : ''}">
                    <span class="rank-number">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</span>
                    <span class="player-avatar">${player.avatar || '🐼'}</span>
                    <span class="player-name">${player.name || 'Anonymous'}${player.name === currentPlayer ? ' (You)' : ''}</span>
                    <span class="player-score">${(player.xp || 0).toLocaleString()} XP</span>
                </div>
            `).join('');
        }

        const yourIdx = leaderboard.findIndex(p => p.name === currentPlayer);
        document.getElementById('yourPosition').textContent = yourIdx >= 0 ? yourIdx + 1 : '-';
        document.getElementById('yourScore').textContent = yourIdx >= 0 ? (leaderboard[yourIdx].xp || 0).toLocaleString() : '0';
    }
}

// ============================================
// THEME
// ============================================
function initTheme() {
    // Default to dark mode (consistent with homepage)
    const saved = localStorage.getItem('supersite-theme') || 'dark';
    // Set on both body and documentElement for compatibility
    document.body.setAttribute('data-theme', saved);
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
}

document.getElementById('themeToggle').addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('supersite-theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    document.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ============================================
// PARTICLES BACKGROUND
// ============================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const symbols = ['+', '-', '×', '÷', '=', '∑', 'π', '√'];

    for (let i = 0; i < 30; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            size: Math.random() * 20 + 10,
            speedY: Math.random() * 0.5 + 0.1,
            speedX: Math.random() * 0.2 - 0.1,
            opacity: Math.random() * 0.15 + 0.05
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.font = `${p.size}px Outfit`;
            ctx.fillStyle = `rgba(102, 126, 234, ${p.opacity})`;
            ctx.fillText(p.symbol, p.x, p.y);

            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y > canvas.height + 50) {
                p.y = -50;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// CONFETTI
// ============================================
function fireConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b', '#fbbf24'];

    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 4 - 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }

    let frame = 0;
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((c, i) => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.rotation * Math.PI / 180);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
            ctx.restore();

            c.y += c.speedY;
            c.x += c.speedX;
            c.rotation += c.rotationSpeed;
            c.speedY += 0.05; // gravity
        });

        frame++;
        if (frame < 200) {
            requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animateConfetti();
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
