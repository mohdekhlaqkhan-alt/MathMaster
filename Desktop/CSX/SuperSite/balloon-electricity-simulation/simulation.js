// ===== BALLOONS AND STATIC ELECTRICITY SIMULATION =====
// World-class PhET-style interactive simulation

// ===== STATE MANAGEMENT =====
const state = {
    language: 'en',
    balloons: [],
    sweaterCharge: 0,
    maxSweaterCharge: 20,
    showCharges: true,
    showField: false,
    wallMaterial: 'insulator',
    isDragging: false,
    draggedBalloon: null,
    dragOffset: { x: 0, y: 0 }
};

// ===== QUIZ QUESTIONS =====
const quizQuestions = [
    {
        question: "What happens when you rub a balloon on a wool sweater?",
        questionHi: "जब तुम गुब्बारे को ऊनी स्वेटर पर रगड़ते हो तो क्या होता है?",
        options: ["Protons transfer to balloon", "Electrons transfer to balloon", "Neutrons transfer to balloon", "Nothing happens"],
        optionsHi: ["प्रोटॉन गुब्बारे पर जाते हैं", "इलेक्ट्रॉन गुब्बारे पर जाते हैं", "न्यूट्रॉन गुब्बारे पर जाते हैं", "कुछ नहीं होता"],
        correct: 1
    },
    {
        question: "What charge does a balloon have after rubbing on wool?",
        questionHi: "ऊन पर रगड़ने के बाद गुब्बारे पर कौन सा चार्ज होता है?",
        options: ["Positive (+)", "Negative (-)", "Neutral", "Both + and -"],
        optionsHi: ["धनात्मक (+)", "ऋणात्मक (-)", "उदासीन", "दोनों + और -"],
        correct: 1
    },
    {
        question: "Why does a charged balloon stick to a neutral wall?",
        questionHi: "चार्ज गुब्बारा उदासीन दीवार से क्यों चिपकता है?",
        options: ["Gravity pulls it", "Induced charges in wall attract it", "Magic", "Wall becomes negative"],
        optionsHi: ["गुरुत्वाकर्षण खींचता है", "दीवार में प्रेरित चार्ज आकर्षित करता है", "जादू", "दीवार ऋणात्मक हो जाती है"],
        correct: 1
    },
    {
        question: "What is the phenomenon called when electrons transfer by rubbing?",
        questionHi: "रगड़ने से इलेक्ट्रॉन ट्रांसफर होने की घटना को क्या कहते हैं?",
        options: ["Magnetism", "Triboelectric effect", "Gravity", "Radiation"],
        optionsHi: ["चुंबकत्व", "ट्राइबोइलेक्ट्रिक प्रभाव", "गुरुत्वाकर्षण", "विकिरण"],
        correct: 1
    },
    {
        question: "Which subatomic particle moves during static electricity?",
        questionHi: "स्थिर बिजली में कौन सा उप-परमाणु कण चलता है?",
        options: ["Protons", "Neutrons", "Electrons", "All of them"],
        optionsHi: ["प्रोटॉन", "न्यूट्रॉन", "इलेक्ट्रॉन", "सभी"],
        correct: 2
    },
    {
        question: "What happens when two negatively charged objects come close?",
        questionHi: "जब दो ऋणात्मक चार्ज वाली वस्तुएं पास आती हैं तो क्या होता है?",
        options: ["They attract", "They repel", "Nothing happens", "They explode"],
        optionsHi: ["वे आकर्षित होती हैं", "वे दूर भागती हैं", "कुछ नहीं होता", "वे फटती हैं"],
        correct: 1
    },
    {
        question: "Why do you get more static shocks in winter?",
        questionHi: "सर्दियों में ज़्यादा स्थैतिक झटके क्यों लगते हैं?",
        options: ["Cold increases charge", "Dry air is poor conductor", "More wool clothing", "All of the above"],
        optionsHi: ["ठंड चार्ज बढ़ाती है", "सूखी हवा खराब कंडक्टर है", "ज़्यादा ऊनी कपड़े", "उपरोक्त सभी"],
        correct: 3
    },
    {
        question: "What is lightning?",
        questionHi: "बिजली (lightning) क्या है?",
        options: ["A type of magnet", "Giant static discharge", "Sunlight reflection", "Sound wave"],
        optionsHi: ["एक प्रकार का चुंबक", "विशाल स्थैतिक डिस्चार्ज", "सूर्य की रोशनी का प्रतिबिंब", "ध्वनि तरंग"],
        correct: 1
    },
    {
        question: "In the triboelectric series, rubber tends to:",
        questionHi: "ट्राइबोइलेक्ट्रिक सीरीज़ में, रबर का रुझान है:",
        options: ["Gain electrons", "Lose electrons", "Stay neutral", "Gain protons"],
        optionsHi: ["इलेक्ट्रॉन लेना", "इलेक्ट्रॉन खोना", "उदासीन रहना", "प्रोटॉन लेना"],
        correct: 0
    },
    {
        question: "What makes a material a good insulator for static charge?",
        questionHi: "कौन सी चीज़ किसी सामग्री को स्थिर चार्ज के लिए अच्छा कुचालक बनाती है?",
        options: ["Free electrons", "No free electrons", "Magnetic properties", "High temperature"],
        optionsHi: ["मुक्त इलेक्ट्रॉन", "कोई मुक्त इलेक्ट्रॉन नहीं", "चुंबकीय गुण", "उच्च तापमान"],
        correct: 1
    }
];

let quizState = {
    currentQuestion: 0,
    score: 0,
    answered: false
};

// ===== DOM ELEMENTS =====
let balloon1, sweater, wall, balloonArea;
let chargeValueEl, chargeLabelEl, forceBar, forceLabelEl, explanationText;
let electricFieldCanvas, fieldCtx;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    initBalloon();
    initEventListeners();
    initCanvas();
    updateUI();
    renderQuizQuestion();
});

function initElements() {
    balloon1 = document.getElementById('balloon1');
    sweater = document.getElementById('sweater');
    wall = document.getElementById('wall');
    balloonArea = document.getElementById('balloonArea');
    chargeValueEl = document.getElementById('chargeValue');
    chargeLabelEl = document.getElementById('chargeLabel');
    forceBar = document.getElementById('forceBar');
    forceLabelEl = document.getElementById('forceLabel');
    explanationText = document.getElementById('explanationText');
    electricFieldCanvas = document.getElementById('electricFieldCanvas');
    fieldCtx = electricFieldCanvas.getContext('2d');
}

function initBalloon() {
    state.balloons.push({
        element: balloon1,
        charge: 0,
        x: 0,
        y: 0,
        isNearSweater: false,
        isNearWall: false
    });

    // Position balloon in center initially
    const areaRect = balloonArea.getBoundingClientRect();
    balloon1.style.left = (areaRect.width / 2 - 50) + 'px';
    balloon1.style.top = (areaRect.height / 2 - 65) + 'px';
}

function initCanvas() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    const container = document.querySelector('.balloon-sim-container');
    electricFieldCanvas.width = container.offsetWidth;
    electricFieldCanvas.height = container.offsetHeight;
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Balloon drag
    balloon1.addEventListener('mousedown', startDrag);
    balloon1.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // Control toggles
    document.getElementById('showChargesToggle').addEventListener('change', (e) => {
        state.showCharges = e.target.checked;
        updateChargeVisibility();
    });

    document.getElementById('showFieldToggle').addEventListener('change', (e) => {
        state.showField = e.target.checked;
        if (state.showField) {
            drawElectricField();
        } else {
            clearCanvas();
        }
    });

    document.getElementById('wallMaterial').addEventListener('change', (e) => {
        state.wallMaterial = e.target.value;
        updateWallAppearance();
    });

    // Buttons
    document.getElementById('addBalloonBtn').addEventListener('click', addSecondBalloon);
    document.getElementById('resetBtn').addEventListener('click', resetSimulation);
    document.getElementById('retryQuizBtn').addEventListener('click', retryQuiz);
}

// ===== DRAG & DROP =====
function startDrag(e) {
    e.preventDefault();
    state.isDragging = true;
    state.draggedBalloon = e.target.closest('.balloon');

    // Hide instruction overlay
    document.getElementById('instructionOverlay').classList.add('hidden');

    const rect = state.draggedBalloon.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    state.dragOffset.x = clientX - rect.left;
    state.dragOffset.y = clientY - rect.top;

    state.draggedBalloon.style.transition = 'none';
    state.draggedBalloon.style.zIndex = '100';
}

function drag(e) {
    if (!state.isDragging || !state.draggedBalloon) return;
    e.preventDefault();

    const container = document.querySelector('.balloon-sim-container');
    const containerRect = container.getBoundingClientRect();

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    let newX = clientX - containerRect.left - state.dragOffset.x;
    let newY = clientY - containerRect.top - state.dragOffset.y;

    // Constrain to container
    newX = Math.max(0, Math.min(containerRect.width - 100, newX));
    newY = Math.max(0, Math.min(containerRect.height - 170, newY));

    state.draggedBalloon.style.left = newX + 'px';
    state.draggedBalloon.style.top = newY + 'px';

    // Check proximity to sweater and wall
    checkSweaterProximity(newX, newY);
    checkWallProximity(newX, newY);

    // Update electric field if enabled
    if (state.showField) {
        drawElectricField();
    }
}

function endDrag(e) {
    if (!state.isDragging) return;

    state.isDragging = false;
    if (state.draggedBalloon) {
        state.draggedBalloon.style.transition = 'all 0.3s ease';
        state.draggedBalloon.style.zIndex = '10';
    }

    sweater.classList.remove('rubbing');
    state.draggedBalloon = null;

    // Check if balloon should stick to wall
    const balloonData = state.balloons[0];
    if (balloonData.isNearWall && balloonData.charge < -5) {
        // Balloon sticks to wall
        updateExplanation('stick');
    }
}

// ===== PROXIMITY DETECTION =====
function checkSweaterProximity(balloonX, balloonY) {
    const sweaterRect = sweater.getBoundingClientRect();
    const containerRect = document.querySelector('.balloon-sim-container').getBoundingClientRect();

    const sweaterX = sweaterRect.left - containerRect.left;
    const sweaterY = sweaterRect.top - containerRect.top;

    const distance = Math.sqrt(
        Math.pow(balloonX - sweaterX, 2) +
        Math.pow(balloonY - sweaterY, 2)
    );

    const balloonData = state.balloons[0];

    if (distance < 150) {
        balloonData.isNearSweater = true;

        // Rubbing animation and charge transfer
        if (state.isDragging && state.sweaterCharge < state.maxSweaterCharge) {
            sweater.classList.add('rubbing');

            // Transfer electrons (balloon becomes more negative)
            if (balloonData.charge > -15) {
                balloonData.charge -= 0.2;
                state.sweaterCharge += 0.2;

                updateChargeDisplay();
                updateSweaterCharges();
                updateBalloonCharges();
                updateExplanation('rubbing');

                // Play subtle sound (optional)
                playRubSound();
            }
        }
    } else {
        balloonData.isNearSweater = false;
        sweater.classList.remove('rubbing');
    }
}

function checkWallProximity(balloonX, balloonY) {
    const wallRect = wall.getBoundingClientRect();
    const containerRect = document.querySelector('.balloon-sim-container').getBoundingClientRect();

    const wallX = wallRect.left - containerRect.left;

    const balloonData = state.balloons[0];
    const distance = Math.abs(balloonX + 100 - wallX);

    if (distance < 100) {
        balloonData.isNearWall = true;

        if (balloonData.charge < -3) {
            // Show induced charges on wall
            wall.classList.add('induced');
            updateWallCharges(balloonData.charge);
            updateForceDisplay(distance, balloonData.charge);
            updateExplanation('wall');
        }
    } else {
        balloonData.isNearWall = false;
        wall.classList.remove('induced');
        clearWallCharges();
        updateForceDisplay(0, 0);
    }
}

// ===== CHARGE VISUALIZATION =====
function updateChargeDisplay() {
    const balloonData = state.balloons[0];
    const charge = Math.round(balloonData.charge);

    chargeValueEl.textContent = charge;

    if (charge === 0) {
        chargeLabelEl.textContent = state.language === 'en' ? 'Neutral' : 'उदासीन';
        chargeLabelEl.style.color = '#a0a0a0';
    } else if (charge < 0) {
        chargeLabelEl.textContent = state.language === 'en' ? 'Negative (-)' : 'ऋणात्मक (-)';
        chargeLabelEl.style.color = '#ef4444';
    } else {
        chargeLabelEl.textContent = state.language === 'en' ? 'Positive (+)' : 'धनात्मक (+)';
        chargeLabelEl.style.color = '#22c55e';
    }

    // Update balloon visual state
    if (charge < -3) {
        balloon1.classList.add('charged');
    } else {
        balloon1.classList.remove('charged');
    }
}

function updateSweaterCharges() {
    const chargesContainer = document.getElementById('sweaterCharges');
    chargesContainer.innerHTML = '';

    if (!state.showCharges) return;

    const numCharges = Math.min(Math.floor(state.sweaterCharge), 12);

    for (let i = 0; i < numCharges; i++) {
        const charge = document.createElement('div');
        charge.className = 'charge positive';
        charge.textContent = '+';
        charge.style.left = (20 + Math.random() * 140) + 'px';
        charge.style.top = (40 + Math.random() * 140) + 'px';
        chargesContainer.appendChild(charge);
    }
}

function updateBalloonCharges() {
    const chargesContainer = document.getElementById('balloon1Charges');
    chargesContainer.innerHTML = '';

    if (!state.showCharges) return;

    const balloonData = state.balloons[0];
    const numCharges = Math.min(Math.abs(Math.floor(balloonData.charge)), 10);

    for (let i = 0; i < numCharges; i++) {
        const charge = document.createElement('div');
        charge.className = 'charge negative';
        charge.textContent = '−';
        charge.style.left = (15 + Math.random() * 60) + 'px';
        charge.style.top = (20 + Math.random() * 80) + 'px';
        chargesContainer.appendChild(charge);
    }
}

function updateWallCharges(balloonCharge) {
    const chargesContainer = document.getElementById('wallCharges');
    chargesContainer.innerHTML = '';

    if (!state.showCharges || !balloonCharge) return;

    const numCharges = Math.min(Math.abs(Math.floor(balloonCharge / 2)), 8);

    // Positive charges on surface (near balloon)
    for (let i = 0; i < numCharges; i++) {
        const charge = document.createElement('div');
        charge.className = 'charge positive';
        charge.textContent = '+';
        charge.style.left = '5px';
        charge.style.top = (80 + i * 25) + 'px';
        chargesContainer.appendChild(charge);
    }

    // Negative charges pushed to back
    for (let i = 0; i < numCharges; i++) {
        const charge = document.createElement('div');
        charge.className = 'charge negative';
        charge.textContent = '−';
        charge.style.left = '55px';
        charge.style.top = (80 + i * 25) + 'px';
        chargesContainer.appendChild(charge);
    }
}

function clearWallCharges() {
    document.getElementById('wallCharges').innerHTML = '';
}

function updateChargeVisibility() {
    const allCharges = document.querySelectorAll('.charge');
    allCharges.forEach(charge => {
        charge.style.opacity = state.showCharges ? '1' : '0';
    });

    updateSweaterCharges();
    updateBalloonCharges();
}

// ===== FORCE DISPLAY =====
function updateForceDisplay(distance, charge) {
    if (distance === 0 || charge === 0) {
        forceBar.style.width = '0%';
        forceLabelEl.textContent = state.language === 'en' ? 'None' : 'कोई नहीं';
        return;
    }

    // Coulomb-like force calculation (simplified)
    const force = Math.abs(charge) * (1 / (distance / 50));
    const forcePercent = Math.min(force * 10, 100);

    forceBar.style.width = forcePercent + '%';

    if (forcePercent < 30) {
        forceLabelEl.textContent = state.language === 'en' ? 'Weak' : 'कमज़ोर';
    } else if (forcePercent < 60) {
        forceLabelEl.textContent = state.language === 'en' ? 'Medium' : 'मध्यम';
    } else {
        forceLabelEl.textContent = state.language === 'en' ? 'Strong' : 'मज़बूत';
    }
}

// ===== EXPLANATIONS =====
function updateExplanation(context) {
    const explanations = {
        rubbing: {
            en: "Electrons are jumping from the wool to the balloon! The balloon is becoming negatively charged (-) while the sweater becomes positive (+).",
            hi: "इलेक्ट्रॉन ऊन से गुब्बारे पर कूद रहे हैं! गुब्बारा ऋणात्मक (-) और स्वेटर धनात्मक (+) हो रहा है।"
        },
        wall: {
            en: "The negative balloon pushes electrons in the wall away, leaving positive charges on the surface. This creates attraction!",
            hi: "ऋणात्मक गुब्बारा दीवार के इलेक्ट्रॉन को पीछे धकेलता है, सतह पर + चार्ज छोड़ता है। इससे आकर्षण बनता है!"
        },
        stick: {
            en: "The balloon sticks to the wall! The induced positive charges on the wall's surface attract the negative balloon.",
            hi: "गुब्बारा दीवार से चिपक गया! दीवार पर प्रेरित + चार्ज ऋणात्मक गुब्बारे को आकर्षित करता है।"
        },
        neutral: {
            en: "Drag the balloon to the sweater to charge it by rubbing!",
            hi: "गुब्बारे को स्वेटर पर ले जाओ और रगड़ कर चार्ज करो!"
        }
    };

    const textEn = explanations[context]?.en || explanations.neutral.en;
    const textHi = explanations[context]?.hi || explanations.neutral.hi;

    explanationText.setAttribute('data-en', textEn);
    explanationText.setAttribute('data-hi', textHi);
    explanationText.textContent = state.language === 'en' ? textEn : textHi;
}

// ===== ELECTRIC FIELD VISUALIZATION =====
function drawElectricField() {
    clearCanvas();

    const balloonData = state.balloons[0];
    if (Math.abs(balloonData.charge) < 1) return;

    const balloonRect = balloon1.getBoundingClientRect();
    const containerRect = document.querySelector('.balloon-sim-container').getBoundingClientRect();

    const centerX = balloonRect.left - containerRect.left + 50;
    const centerY = balloonRect.top - containerRect.top + 65;

    fieldCtx.strokeStyle = 'rgba(124, 58, 237, 0.3)';
    fieldCtx.lineWidth = 1;

    // Draw field lines radiating from balloon
    const numLines = 12;
    for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const startX = centerX + Math.cos(angle) * 60;
        const startY = centerY + Math.sin(angle) * 80;
        const endX = centerX + Math.cos(angle) * 150;
        const endY = centerY + Math.sin(angle) * 180;

        fieldCtx.beginPath();
        fieldCtx.moveTo(startX, startY);
        fieldCtx.lineTo(endX, endY);
        fieldCtx.stroke();

        // Arrowhead (pointing inward for negative charge)
        if (balloonData.charge < 0) {
            drawArrowhead(fieldCtx, endX, endY, startX, startY);
        } else {
            drawArrowhead(fieldCtx, startX, startY, endX, endY);
        }
    }
}

function drawArrowhead(ctx, fromX, fromY, toX, toY) {
    const headLength = 8;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

function clearCanvas() {
    fieldCtx.clearRect(0, 0, electricFieldCanvas.width, electricFieldCanvas.height);
}

// ===== WALL MATERIAL =====
function updateWallAppearance() {
    if (state.wallMaterial === 'conductor') {
        wall.style.background = 'linear-gradient(90deg, #64748b, #475569, #334155)';
    } else {
        wall.style.background = 'linear-gradient(90deg, #4a5568, #2d3748, #1a202c)';
    }
}

// ===== ADD SECOND BALLOON =====
function addSecondBalloon() {
    const existingSecond = document.getElementById('balloon2');
    if (existingSecond) return; // Already exists

    const newBalloon = document.createElement('div');
    newBalloon.className = 'balloon draggable yellow';
    newBalloon.id = 'balloon2';
    newBalloon.innerHTML = `
        <div class="balloon-body">
            <div class="balloon-shine"></div>
            <div class="balloon-charges" id="balloon2Charges"></div>
        </div>
        <div class="balloon-string"></div>
        <div class="balloon-knot"></div>
    `;

    balloonArea.appendChild(newBalloon);

    newBalloon.style.left = '30%';
    newBalloon.style.top = '60%';

    // Add drag events
    newBalloon.addEventListener('mousedown', startDrag);
    newBalloon.addEventListener('touchstart', startDrag, { passive: false });

    state.balloons.push({
        element: newBalloon,
        charge: 0,
        x: 0,
        y: 0,
        isNearSweater: false,
        isNearWall: false
    });
}

// ===== RESET =====
function resetSimulation() {
    // Reset balloon charge
    state.balloons[0].charge = 0;
    state.sweaterCharge = 0;

    // Reset position
    const areaRect = balloonArea.getBoundingClientRect();
    balloon1.style.left = (areaRect.width / 2 - 50) + 'px';
    balloon1.style.top = (areaRect.height / 2 - 65) + 'px';

    // Remove second balloon if exists
    const secondBalloon = document.getElementById('balloon2');
    if (secondBalloon) {
        secondBalloon.remove();
        state.balloons = state.balloons.slice(0, 1);
    }

    // Clear charges
    document.getElementById('sweaterCharges').innerHTML = '';
    document.getElementById('balloon1Charges').innerHTML = '';
    clearWallCharges();

    // Reset classes
    balloon1.classList.remove('charged');
    wall.classList.remove('induced');
    sweater.classList.remove('rubbing');

    // Reset displays
    updateChargeDisplay();
    updateForceDisplay(0, 0);
    updateExplanation('neutral');
    clearCanvas();

    // Show instruction
    document.getElementById('instructionOverlay').classList.remove('hidden');
}

// ===== LANGUAGE TOGGLE =====
function toggleBalloonLanguage() {
    state.language = state.language === 'en' ? 'hi' : 'en';

    const toggle = document.getElementById('balloonLangToggle');
    toggle.classList.toggle('english', state.language === 'en');

    // Update all translatable elements
    document.querySelectorAll('[data-en][data-hi]').forEach(el => {
        const text = state.language === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-hi');
        if (text.includes('<')) {
            el.innerHTML = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        } else {
            el.textContent = text;
        }
    });

    // Update dynamic displays
    updateChargeDisplay();
    updateForceDisplay(0, 0);

    // Update quiz if visible
    if (!document.getElementById('balloonQuizSection').classList.contains('hidden')) {
        renderQuizQuestion();
    }
}
window.toggleBalloonLanguage = toggleBalloonLanguage;

// ===== SECTION NAVIGATION =====
function switchBalloonSection(section) {
    document.querySelectorAll('.balloon-nav-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.section === section);
    });

    document.getElementById('balloonSimulationSection').classList.toggle('hidden', section !== 'simulation');
    document.getElementById('balloonLearnSection').classList.toggle('hidden', section !== 'learn');
    document.getElementById('balloonQuizSection').classList.toggle('hidden', section !== 'quiz');

    if (section === 'quiz') {
        renderQuizQuestion();
    }
}
window.switchBalloonSection = switchBalloonSection;

// ===== QUIZ SYSTEM =====
function renderQuizQuestion() {
    if (quizState.currentQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const q = quizQuestions[quizState.currentQuestion];
    const questionText = state.language === 'en' ? q.question : q.questionHi;
    const options = state.language === 'en' ? q.options : q.optionsHi;

    document.getElementById('questionNumber').textContent = `Q${quizState.currentQuestion + 1}`;
    document.getElementById('questionText').textContent = questionText;
    document.getElementById('quizProgress').style.width = ((quizState.currentQuestion + 1) / quizQuestions.length * 100) + '%';
    document.getElementById('quizProgressText').textContent =
        state.language === 'en'
            ? `Question ${quizState.currentQuestion + 1} of ${quizQuestions.length}`
            : `प्रश्न ${quizState.currentQuestion + 1} / ${quizQuestions.length}`;

    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
        btn.onclick = () => selectAnswer(i);
        container.appendChild(btn);
    });

    quizState.answered = false;
    document.getElementById('quizCard').classList.remove('hidden');
    document.getElementById('quizResult').classList.add('hidden');
}

function selectAnswer(index) {
    if (quizState.answered) return;
    quizState.answered = true;

    const correct = quizQuestions[quizState.currentQuestion].correct;
    const buttons = document.querySelectorAll('.option-btn');

    buttons[index].classList.add(index === correct ? 'correct' : 'wrong');
    if (index !== correct) {
        buttons[correct].classList.add('correct');
    }

    if (index === correct) {
        quizState.score++;
    }

    setTimeout(() => {
        quizState.currentQuestion++;
        renderQuizQuestion();
    }, 1500);
}

function showQuizResult() {
    document.getElementById('quizCard').classList.add('hidden');
    document.getElementById('quizResult').classList.remove('hidden');
    document.getElementById('finalScore').textContent = quizState.score;

    // Award XP if available
    if (window.BroProPlayer) {
        const xp = quizState.score * 10;
        window.BroProPlayer.addXP(xp, 'science');
    }

    // Confetti for good scores
    if (quizState.score >= 7 && window.BroProEffects) {
        window.BroProEffects.confetti();
    }
}

function retryQuiz() {
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.answered = false;
    renderQuizQuestion();
}

// ===== UTILITIES =====
function playRubSound() {
    // Optional: Add subtle rubbing sound
    if (window.BroProSounds && Math.random() < 0.1) {
        window.BroProSounds.play('click');
    }
}

function updateUI() {
    updateChargeDisplay();
    updateExplanation('neutral');
}
