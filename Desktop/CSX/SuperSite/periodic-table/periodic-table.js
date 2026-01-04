// ============================================
// INTERACTIVE PERIODIC TABLE - CORE LOGIC
// Premium Features with 3D Visualization & Quiz
// ============================================

// Current state
let currentLanguage = 'en';
let currentViewMode = 'category';
let currentFilter = 'all';
let selectedElement = null;

// Quiz state
let quizActive = false;
let quizQuestions = [];
let quizCurrentIndex = 0;
let quizCorrect = 0;
let quizWrong = 0;
let quizXP = 0;

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderPeriodicTable();
    initParticles();
    console.log('⚗️ Periodic Table initialized!');
});

// ============================================
// RENDER PERIODIC TABLE
// ============================================
function renderPeriodicTable() {
    const grid = document.getElementById('periodicTable');
    const lanthanides = document.getElementById('lanthanides');
    const actinides = document.getElementById('actinides');

    if (!grid) return;

    // Create 7x18 grid with proper element placement
    let gridHTML = '';

    for (let row = 1; row <= 7; row++) {
        for (let col = 1; col <= 18; col++) {
            const element = findElementAtPosition(row, col);
            if (element) {
                gridHTML += createElementCard(element);
            } else {
                gridHTML += '<div class="element placeholder"></div>';
            }
        }
    }

    grid.innerHTML = gridHTML;

    // Render Lanthanides (57-71)
    if (lanthanides) {
        lanthanides.innerHTML = LANTHANIDES.map(n => {
            const el = ELEMENTS_DATA.find(e => e.n === n);
            return el ? createElementCard(el) : '';
        }).join('');
    }

    // Render Actinides (89-103)
    if (actinides) {
        actinides.innerHTML = ACTINIDES.map(n => {
            const el = ELEMENTS_DATA.find(e => e.n === n);
            return el ? createElementCard(el) : '';
        }).join('');
    }
}

function findElementAtPosition(row, col) {
    for (const [num, pos] of Object.entries(ELEMENT_POSITIONS)) {
        if (pos.r === row && pos.c === col) {
            return ELEMENTS_DATA.find(e => e.n === parseInt(num));
        }
    }
    return null;
}

function createElementCard(el) {
    const name = currentLanguage === 'hi' ? el.hi : el.en;
    return `
        <div class="element ${el.c}" data-number="${el.n}" data-symbol="${el.s}" 
             data-category="${el.c}" data-state="${el.st}" data-block="${el.b}"
             onclick="openElementModal(${el.n})">
            <span class="el-number">${el.n}</span>
            <span class="el-symbol">${el.s}</span>
            <span class="el-name">${name}</span>
            <span class="el-mass">${el.m}</span>
        </div>
    `;
}

// ============================================
// LANGUAGE TOGGLE
// ============================================
function setLanguage(lang) {
    currentLanguage = lang;

    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update UI text
    const t = UI_TRANSLATIONS[lang];
    document.getElementById('pageTitle').textContent = t.title;
    document.getElementById('pageSubtitle').textContent = t.subtitle;
    document.getElementById('elementSearch').placeholder = t.search;
    document.getElementById('quizBtnText').textContent = t.startQuiz;

    // Re-render table
    renderPeriodicTable();

    // Update modal if open
    if (selectedElement) {
        updateModalContent(selectedElement);
    }
}

// ============================================
// SEARCH & FILTER
// ============================================
function searchElements(query) {
    const q = query.toLowerCase().trim();

    document.querySelectorAll('.element:not(.placeholder)').forEach(el => {
        const symbol = el.dataset.symbol.toLowerCase();
        const number = el.dataset.number;
        const element = ELEMENTS_DATA.find(e => e.n === parseInt(number));
        const nameEn = element?.en.toLowerCase() || '';
        const nameHi = element?.hi || '';

        const matches = !q || symbol.includes(q) || nameEn.includes(q) || nameHi.includes(q) || number === q;

        el.classList.toggle('dimmed', !matches);
        el.classList.toggle('highlighted', matches && q.length > 0);
    });
}

function filterByCategory(category) {
    currentFilter = category;

    document.querySelectorAll('.element:not(.placeholder)').forEach(el => {
        const elCategory = el.dataset.category;
        const matches = category === 'all' || elCategory === category;
        el.classList.toggle('dimmed', !matches);
    });
}

// ============================================
// VIEW MODE
// ============================================
function setViewMode(mode) {
    currentViewMode = mode;

    // Update buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === mode);
    });

    // Apply view styles
    document.querySelectorAll('.element:not(.placeholder)').forEach(el => {
        // Remove previous view classes
        el.classList.remove('state-solid', 'state-liquid', 'state-gas');
        el.classList.remove('block-s-view', 'block-p-view', 'block-d-view', 'block-f-view');

        if (mode === 'state') {
            el.classList.add(`state-${el.dataset.state}`);
        } else if (mode === 'block') {
            el.classList.add(`block-${el.dataset.block}-view`);
        }
    });
}

// ============================================
// ELEMENT MODAL
// ============================================
function openElementModal(atomicNumber) {
    const element = ELEMENTS_DATA.find(e => e.n === atomicNumber);
    if (!element) return;

    selectedElement = element;
    updateModalContent(element);

    // Show modal
    document.getElementById('elementModal').classList.add('active');

    // Generate 3D atom
    render3DAtom(element);
}

function closeElementModal() {
    document.getElementById('elementModal').classList.remove('active');
    selectedElement = null;
}

function updateModalContent(el) {
    const lang = currentLanguage;
    const t = UI_TRANSLATIONS[lang];
    const catNames = CATEGORY_NAMES[lang];

    // Element card
    const card = document.getElementById('modalElementCard');
    card.className = `element-card-large ${el.c}`;
    card.querySelector('.element-number').textContent = el.n;
    card.querySelector('.element-symbol').textContent = el.s;
    card.querySelector('.element-name').textContent = lang === 'hi' ? el.hi : el.en;
    card.querySelector('.element-mass').textContent = el.m;

    // Proton count
    document.getElementById('protonCount').textContent = el.n;

    // Labels
    document.getElementById('basicInfoTitle').textContent = t.basicInfo;
    document.getElementById('labelAtomicNumber').textContent = t.atomicNumber;
    document.getElementById('labelAtomicMass').textContent = t.atomicMass;
    document.getElementById('labelCategory').textContent = t.category;
    document.getElementById('labelBlock').textContent = t.block;
    document.getElementById('labelPeriod').textContent = t.period;
    document.getElementById('labelGroup').textContent = t.group;
    document.getElementById('atomicPropsTitle').textContent = t.atomicProps;
    document.getElementById('labelElectronConfig').textContent = t.electronConfig;
    document.getElementById('labelElectronegativity').textContent = t.electronegativity;
    document.getElementById('physicalPropsTitle').textContent = t.physicalProps;
    document.getElementById('labelState').textContent = t.state;
    document.getElementById('labelMeltingPoint').textContent = t.meltingPoint;
    document.getElementById('labelBoilingPoint').textContent = t.boilingPoint;
    document.getElementById('labelDensity').textContent = t.density;
    document.getElementById('historyTitle').textContent = t.discovery;
    document.getElementById('labelDiscoveredBy').textContent = t.discoveredBy;
    document.getElementById('funFactTitle').textContent = t.funFact;
    document.getElementById('pronounceBtnText').textContent = t.hearPronunciation;

    // Values
    document.getElementById('infoAtomicNumber').textContent = el.n;
    document.getElementById('infoAtomicMass').textContent = el.m + ' u';
    document.getElementById('infoCategory').textContent = catNames[el.c] || el.c;
    document.getElementById('infoBlock').textContent = el.b.toUpperCase();
    document.getElementById('infoPeriod').textContent = el.p;
    document.getElementById('infoGroup').textContent = el.g;
    document.getElementById('infoElectronConfig').textContent = el.ec;
    document.getElementById('infoElectronegativity').textContent = el.en_v || 'N/A';

    const stateNames = { solid: t.solid, liquid: t.liquid, gas: t.gas };
    document.getElementById('infoState').textContent = stateNames[el.st] || el.st;
    document.getElementById('infoMeltingPoint').textContent = el.mp !== null ? el.mp + ' °C' : 'N/A';
    document.getElementById('infoBoilingPoint').textContent = el.bp !== null ? el.bp + ' °C' : 'N/A';
    document.getElementById('infoDensity').textContent = el.d !== null ? el.d + ' g/cm³' : 'N/A';

    const discoverer = lang === 'hi' ? el.db.hi : el.db.en;
    const year = el.y < 0 ? `${Math.abs(el.y)} BCE` : el.y;
    document.getElementById('infoDiscoveredBy').textContent = `${discoverer} (${year})`;

    document.getElementById('infoFunFact').textContent = lang === 'hi' ? el.f.hi : el.f.en;
}

// ============================================
// 3D ATOM VISUALIZATION
// ============================================
function render3DAtom(element) {
    const shellsContainer = document.getElementById('electronShells');
    shellsContainer.innerHTML = '';

    // Calculate electron shells from electron configuration
    const shells = getElectronShells(element.n);

    shells.forEach((electronCount, shellIndex) => {
        if (electronCount === 0) return;

        const shellSize = 50 + (shellIndex * 35);
        const shell = document.createElement('div');
        shell.className = 'electron-shell';
        shell.style.width = shellSize + 'px';
        shell.style.height = shellSize + 'px';

        // Add electrons
        for (let i = 0; i < electronCount; i++) {
            const electron = document.createElement('div');
            electron.className = 'electron';

            const angle = (360 / electronCount) * i;
            const radius = shellSize / 2;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;

            electron.style.left = `calc(50% + ${x}px - 5px)`;
            electron.style.top = `calc(50% + ${y}px - 5px)`;

            shell.appendChild(electron);
        }

        shellsContainer.appendChild(shell);
    });
}

function getElectronShells(atomicNumber) {
    // Simplified shell filling (2, 8, 18, 32, ...)
    const maxPerShell = [2, 8, 18, 32, 32, 18, 8];
    const shells = [];
    let remaining = atomicNumber;

    for (let i = 0; i < maxPerShell.length && remaining > 0; i++) {
        const electrons = Math.min(remaining, maxPerShell[i]);
        shells.push(electrons);
        remaining -= electrons;
    }

    return shells;
}

// ============================================
// PRONUNCIATION (Web Speech API)
// ============================================
function pronounceElement() {
    if (!selectedElement) return;

    const name = currentLanguage === 'hi' ? selectedElement.hi : selectedElement.en;
    const lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';

    const utterance = new SpeechSynthesisUtterance(name);
    utterance.lang = lang;
    utterance.rate = 0.9;

    speechSynthesis.speak(utterance);

    // Visual feedback
    const btn = document.querySelector('.pronounce-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 200);
}

// ============================================
// QUIZ SYSTEM
// ============================================
function startQuiz() {
    quizActive = true;
    quizQuestions = generateQuizQuestions(10);
    quizCurrentIndex = 0;
    quizCorrect = 0;
    quizWrong = 0;
    quizXP = 0;

    document.getElementById('quizModal').classList.add('active');
    renderQuizQuestion();
}

function generateQuizQuestions(count) {
    const questions = [];
    const commonElements = ELEMENTS_DATA.filter(e => e.n <= 36); // First 36 for easier quiz

    const questionTypes = [
        { type: 'symbol', q: (e, l) => l === 'hi' ? `${e.hi} का प्रतीक क्या है?` : `What is the symbol for ${e.en}?` },
        { type: 'name', q: (e, l) => l === 'hi' ? `${e.s} किस तत्व का प्रतीक है?` : `Which element has the symbol ${e.s}?` },
        { type: 'number', q: (e, l) => l === 'hi' ? `${e.hi} का परमाणु क्रमांक क्या है?` : `What is the atomic number of ${e.en}?` },
        { type: 'category', q: (e, l) => l === 'hi' ? `${e.hi} किस श्रेणी में आता है?` : `Which category does ${e.en} belong to?` }
    ];

    for (let i = 0; i < count; i++) {
        const element = commonElements[Math.floor(Math.random() * commonElements.length)];
        const qType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

        const question = {
            element: element,
            type: qType.type,
            question: qType.q(element, currentLanguage),
            options: [],
            correct: 0
        };

        // Generate options based on type
        if (qType.type === 'symbol') {
            question.options = generateSymbolOptions(element, commonElements);
            question.correct = question.options.indexOf(element.s);
        } else if (qType.type === 'name') {
            question.options = generateNameOptions(element, commonElements);
            question.correct = question.options.indexOf(currentLanguage === 'hi' ? element.hi : element.en);
        } else if (qType.type === 'number') {
            question.options = generateNumberOptions(element);
            question.correct = question.options.indexOf(element.n.toString());
        } else if (qType.type === 'category') {
            question.options = generateCategoryOptions(element);
            const catName = CATEGORY_NAMES[currentLanguage][element.c];
            question.correct = question.options.indexOf(catName);
        }

        questions.push(question);
    }

    return questions;
}

function generateSymbolOptions(correct, pool) {
    const options = [correct.s];
    while (options.length < 4) {
        const random = pool[Math.floor(Math.random() * pool.length)];
        if (!options.includes(random.s)) {
            options.push(random.s);
        }
    }
    return shuffleArray(options);
}

function generateNameOptions(correct, pool) {
    const name = currentLanguage === 'hi' ? correct.hi : correct.en;
    const options = [name];
    while (options.length < 4) {
        const random = pool[Math.floor(Math.random() * pool.length)];
        const rName = currentLanguage === 'hi' ? random.hi : random.en;
        if (!options.includes(rName)) {
            options.push(rName);
        }
    }
    return shuffleArray(options);
}

function generateNumberOptions(correct) {
    const options = [correct.n.toString()];
    while (options.length < 4) {
        const random = Math.floor(Math.random() * 36) + 1;
        if (!options.includes(random.toString())) {
            options.push(random.toString());
        }
    }
    return shuffleArray(options);
}

function generateCategoryOptions(correct) {
    const categories = Object.values(CATEGORY_NAMES[currentLanguage]);
    const correctCat = CATEGORY_NAMES[currentLanguage][correct.c];
    const options = [correctCat];
    while (options.length < 4) {
        const random = categories[Math.floor(Math.random() * categories.length)];
        if (!options.includes(random)) {
            options.push(random);
        }
    }
    return shuffleArray(options);
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function renderQuizQuestion() {
    const q = quizQuestions[quizCurrentIndex];

    document.getElementById('quizQuestion').textContent = q.question;
    document.getElementById('quizCurrent').textContent = quizCurrentIndex + 1;
    document.getElementById('quizTotal').textContent = quizQuestions.length;
    document.getElementById('quizXP').textContent = quizXP;
    document.getElementById('quizProgress').style.width = `${((quizCurrentIndex) / quizQuestions.length) * 100}%`;

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = q.options.map((opt, i) => `
        <button class="quiz-option" onclick="selectQuizAnswer(${i})">${opt}</button>
    `).join('');

    document.getElementById('quizFeedback').className = 'quiz-feedback';
}

function selectQuizAnswer(index) {
    const q = quizQuestions[quizCurrentIndex];
    const isCorrect = index === q.correct;

    // Disable all buttons
    document.querySelectorAll('.quiz-option').forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add('correct');
        if (i === index && !isCorrect) btn.classList.add('wrong');
    });

    // Show feedback
    const feedback = document.getElementById('quizFeedback');
    if (isCorrect) {
        quizCorrect++;
        quizXP += 5;
        feedback.className = 'quiz-feedback correct';
        feedback.innerHTML = `<span class="feedback-icon">✅</span><span class="feedback-text">${currentLanguage === 'hi' ? 'सही जवाब! +5 XP' : 'Correct! +5 XP'}</span>`;
    } else {
        quizWrong++;
        feedback.className = 'quiz-feedback wrong';
        const correctAnswer = q.options[q.correct];
        feedback.innerHTML = `<span class="feedback-icon">❌</span><span class="feedback-text">${currentLanguage === 'hi' ? `गलत! सही उत्तर: ${correctAnswer}` : `Wrong! Correct answer: ${correctAnswer}`}</span>`;
    }

    document.getElementById('quizXP').textContent = quizXP;

    // Next question after delay
    setTimeout(() => {
        quizCurrentIndex++;
        if (quizCurrentIndex < quizQuestions.length) {
            renderQuizQuestion();
        } else {
            endQuiz();
        }
    }, 1500);
}

function endQuiz() {
    document.getElementById('quizModal').classList.remove('active');

    const accuracy = Math.round((quizCorrect / quizQuestions.length) * 100);

    // Update results modal
    document.getElementById('resultsCorrect').textContent = quizCorrect;
    document.getElementById('resultsWrong').textContent = quizWrong;
    document.getElementById('resultsAccuracy').textContent = accuracy + '%';
    document.getElementById('resultsXP').textContent = quizXP;

    // Title based on performance
    const titles = {
        en: accuracy >= 80 ? 'Excellent! 🎉' : accuracy >= 50 ? 'Good Job! 👍' : 'Keep Practicing! 💪',
        hi: accuracy >= 80 ? 'उत्कृष्ट! 🎉' : accuracy >= 50 ? 'अच्छा! 👍' : 'अभ्यास जारी रखें! 💪'
    };
    document.getElementById('resultsTitle').textContent = titles[currentLanguage];

    // Show results
    document.getElementById('quizResultsModal').classList.add('active');

    // Award XP
    if (window.BroProPlayer && quizXP > 0) {
        BroProPlayer.addXP(quizXP, 'science');
        document.getElementById('xpCount').textContent = BroProPlayer.load().xp.toLocaleString();
    }
}

function closeQuiz() {
    document.getElementById('quizModal').classList.remove('active');
    quizActive = false;
}

function closeQuizResults() {
    document.getElementById('quizResultsModal').classList.remove('active');
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
        const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000));
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

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

console.log('⚗️ Periodic Table JavaScript loaded!');
