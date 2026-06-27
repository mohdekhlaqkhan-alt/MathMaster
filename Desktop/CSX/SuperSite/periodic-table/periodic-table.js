// ============================================
// INTERACTIVE PERIODIC TABLE - CORE LOGIC
// Premium Features with 2D Bohr Model & Quiz
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
    initLegendFilters(); // Initialize premium legend filtering
    initAdvancedFilterPanel(); // Initialize Groups/Periods/Blocks filter
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

function isRadioactive(n) {
    return n === 43 || n === 61 || n >= 84;
}

function createElementCard(el) {
    const name = currentLanguage === 'hi' ? el.hi : el.en;
    const isRad = isRadioactive(el.n);
    const radIndicator = isRad ? `<span class="el-radiation" title="${currentLanguage === 'hi' ? 'रेडियोधर्मी' : 'Radioactive'}">☢️</span>` : '';
    return `
        <div class="element ${el.c} ${isRad ? 'radioactive' : ''}" data-number="${el.n}" data-symbol="${el.s}" 
             data-category="${el.c}" data-state="${el.st}" data-block="${el.b}"
             data-group="${el.g}" data-period="${el.p}"
             onclick="openElementModal(${el.n})">
            <span class="el-number">${el.n}</span>
            ${radIndicator}
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

    // Translate Legend Items dynamically
    document.querySelectorAll('.legend-item').forEach(item => {
        const cat = item.dataset.category;
        const nameSpan = item.querySelector('.legend-name');
        if (nameSpan) {
            const translatedName = CATEGORY_NAMES[lang][cat];
            if (translatedName) {
                if (cat === 'all-metals') nameSpan.textContent = '⚙️ ' + translatedName;
                else if (cat === 'all-nonmetals') nameSpan.textContent = '💨 ' + translatedName;
                else if (cat === 'radioactive') nameSpan.textContent = '☢️ ' + translatedName;
                else nameSpan.textContent = translatedName;
            }
        }
    });

    // Translate Dropdown Filter Options dynamically
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        const filterTranslations = {
            en: {
                "all": "All Categories",
                "all-metals": "⚙️ All Metals",
                "all-nonmetals": "💨 All Non-Metals",
                "radioactive": "☢️ Radioactive",
                "alkali-metal": "Alkali Metals",
                "alkaline-earth": "Alkaline Earth Metals",
                "transition-metal": "Transition Metals",
                "post-transition": "Post-Transition Metals",
                "metalloid": "Metalloids",
                "nonmetal": "Non-Metals",
                "halogen": "Halogens",
                "noble-gas": "Noble Gases",
                "lanthanide": "Lanthanides",
                "actinide": "Actinides"
            },
            hi: {
                "all": "सभी श्रेणियाँ",
                "all-metals": "⚙️ सभी धातुएँ",
                "all-nonmetals": "💨 सभी अधातुएँ",
                "radioactive": "☢️ रेडियोधर्मी",
                "alkali-metal": "क्षार धातुएँ",
                "alkaline-earth": "क्षारीय मृदा धातुएँ",
                "transition-metal": "संक्रमण धातुएँ",
                "post-transition": "संक्रमणोत्तर धातुएँ",
                "metalloid": "उपधातुएँ",
                "nonmetal": "अधातुएँ",
                "halogen": "हैलोजन",
                "noble-gas": "उत्कृष्ट गैसें",
                "lanthanide": "लैंथेनाइड्स",
                "actinide": "एक्टिनाइड्स"
            }
        };

        Array.from(categoryFilter.options).forEach(opt => {
            const val = opt.value;
            if (val && filterTranslations[lang][val]) {
                opt.textContent = filterTranslations[lang][val];
            }
        });
    }

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

    // Generate 2D Bohr Model
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
    const isRad = isRadioactive(el.n);

    // Element card
    const card = document.getElementById('modalElementCard');
    card.className = `element-card-large ${el.c} ${isRad ? 'radioactive' : ''}`;
    card.querySelector('.element-number').textContent = el.n;
    card.querySelector('.element-symbol').textContent = el.s;
    card.querySelector('.element-name').textContent = lang === 'hi' ? el.hi : el.en;
    card.querySelector('.element-mass').textContent = el.m;

    // Toggle radioactive badge in modal card
    const radBadge = document.getElementById('modalElementRadiation');
    if (radBadge) {
        radBadge.style.display = isRad ? 'block' : 'none';
        radBadge.title = isRad ? (lang === 'hi' ? 'रेडियोधर्मी तत्व' : 'Radioactive Element') : '';
    }

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

    // Radioactivity Label
    const labelRad = document.getElementById('labelRadioactivity');
    if (labelRad) labelRad.textContent = t.radioactivity;

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

    // Radioactivity Value styling and text
    const infoRad = document.getElementById('infoRadioactivity');
    if (infoRad) {
        if (isRad) {
            infoRad.textContent = t.radioactiveStatus;
            infoRad.className = 'info-value radioactive-value';
        } else {
            infoRad.textContent = t.stable;
            infoRad.className = 'info-value stable-value';
        }
    }

    const stateNames = { solid: t.solid, liquid: t.liquid, gas: t.gas };
    document.getElementById('infoState').textContent = stateNames[el.st] || el.st;
    document.getElementById('infoMeltingPoint').textContent = el.mp !== null ? el.mp + ' °C' : 'N/A';
    document.getElementById('infoBoilingPoint').textContent = el.bp !== null ? el.bp + ' °C' : 'N/A';
    document.getElementById('infoDensity').textContent = el.d !== null ? el.d + ' g/cm³' : 'N/A';

    const discoverer = lang === 'hi' ? el.db.hi : el.db.en;
    const year = el.y < 0 ? `${Math.abs(el.y)} BCE` : el.y;
    document.getElementById('infoDiscoveredBy').textContent = `${discoverer} (${year})`;

    document.getElementById('infoFunFact').textContent = lang === 'hi' ? el.f.hi : el.f.en;

    // Update Bohr Model title
    const bohrTitle = document.getElementById('bohrModelTitle');
    if (bohrTitle) bohrTitle.textContent = lang === 'hi' ? 'बोहर मॉडल' : 'Bohr Model';
}

// ============================================
// 2D BOHR MODEL VISUALIZATION
// Academically Accurate (Aufbau Principle)
// ============================================
function render3DAtom(element) {
    const container = document.getElementById('atom3dContainer');
    const shellsContainer = document.getElementById('electronShells');
    shellsContainer.innerHTML = '';

    // Calculate electron shell distribution using Aufbau principle
    const shells = getElectronShells(element.n);
    const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

    // Calculate sub-atomic particle counts
    const protons = element.n;
    const neutrons = Math.max(0, Math.round(element.m) - protons);
    const electrons = protons; // neutral atom

    // Update nucleus proton count
    document.getElementById('protonCount').textContent = protons;

    // Determine dynamic sizing based on number of shells
    const shellCount = shells.filter(s => s > 0).length;
    const nucleusVisualRadius = 22; // Half of nucleus CSS size (44px / 2)
    const shellSpacing = shellCount <= 3 ? 30 : shellCount <= 5 ? 26 : shellCount <= 6 ? 22 : 18;
    const maxShellRadius = nucleusVisualRadius + shellCount * shellSpacing;
    const containerSize = Math.max(180, (maxShellRadius + 18) * 2);

    container.style.width = containerSize + 'px';
    container.style.height = containerSize + 'px';

    // Render each shell as a concentric 2D circle
    shells.forEach((electronCount, shellIndex) => {
        if (electronCount === 0) return;

        const shellRadius = nucleusVisualRadius + (shellIndex + 1) * shellSpacing;
        const shellDiameter = shellRadius * 2;

        // Create shell orbit ring
        const shell = document.createElement('div');
        shell.className = 'electron-shell';
        shell.style.width = shellDiameter + 'px';
        shell.style.height = shellDiameter + 'px';

        // Shell label (K, L, M, N, O, P, Q)
        const label = document.createElement('span');
        label.className = 'shell-label';
        label.textContent = shellNames[shellIndex] || (shellIndex + 1);
        shell.appendChild(label);

        // Adaptive electron dot size to prevent overlap on crowded shells
        const circumference = 2 * Math.PI * shellRadius;
        const maxDotSize = Math.min(10, Math.floor(circumference / (electronCount * 2.8)));
        const electronSize = Math.max(4, maxDotSize);

        // Place electrons evenly distributed around the circle
        for (let i = 0; i < electronCount; i++) {
            const electron = document.createElement('div');
            electron.className = 'electron';

            // Distribute electrons evenly, starting from top (-90°)
            const angle = (360 / electronCount) * i - 90;
            const radian = angle * Math.PI / 180;
            const x = Math.cos(radian) * shellRadius;
            const y = Math.sin(radian) * shellRadius;

            electron.style.width = electronSize + 'px';
            electron.style.height = electronSize + 'px';
            electron.style.left = `calc(50% + ${x}px - ${electronSize / 2}px)`;
            electron.style.top = `calc(50% + ${y}px - ${electronSize / 2}px)`;

            // Stagger glow animation for organic feel
            electron.style.animationDelay = `${-(i * 0.2)}s`;

            shell.appendChild(electron);
        }

        shellsContainer.appendChild(shell);
    });

    // Update particle info and shell configuration displays
    updateBohrModelInfo(protons, neutrons, electrons, shells, shellNames);
}

/**
 * Update particle info legend and shell configuration badge
 */
function updateBohrModelInfo(protons, neutrons, electrons, shells, shellNames) {
    const particleInfo = document.getElementById('bohrParticleInfo');
    const shellConfig = document.getElementById('bohrShellConfig');

    if (particleInfo) {
        const isHindi = currentLanguage === 'hi';
        const pLabel = isHindi ? 'प्रोटॉन' : 'p';
        const nLabel = isHindi ? 'न्यूट्रॉन' : 'n';
        const eLabel = isHindi ? 'इलेक्ट्रॉन' : 'e';

        particleInfo.innerHTML = `
            <div class="particle-item">
                <span class="particle-dot proton-dot"></span>
                <span>${pLabel}⁺ = ${protons}</span>
            </div>
            <div class="particle-item">
                <span class="particle-dot neutron-dot"></span>
                <span>${nLabel}⁰ = ${neutrons}</span>
            </div>
            <div class="particle-item">
                <span class="particle-dot electron-dot"></span>
                <span>${eLabel}⁻ = ${electrons}</span>
            </div>
        `;
    }

    if (shellConfig) {
        const isHindi = currentLanguage === 'hi';
        const configParts = shells
            .filter(s => s > 0)
            .map((count, i) => `${shellNames[i]}(${count})`)
            .join(' · ');

        shellConfig.innerHTML = `<span class="shell-config-label">${isHindi ? 'कक्षा:' : 'Shell:'}</span> ${configParts}`;
    }
}

/**
 * Calculate electron shell distribution for a given atomic number.
 *
 * Uses the Aufbau Principle as the baseline, then applies explicit overrides
 * for elements whose ground-state configurations deviate from it.
 *
 * Well-known exceptions include:
 *  - Half-filled / fully-filled d-subshell stability: Cr, Cu, Mo, Ag, Au, Pt
 *  - Anomalous 4d filling: Nb, Ru, Rh, Pd
 *  - Lanthanide/Actinide irregular occupancy: La, Ce, Gd, Ac, Th, Pa, U, Np, Cm, Lr
 *
 * Shell distributions are derived from the IUPAC-accepted electron configs
 * stored in the `ec` field of ELEMENTS_DATA.
 *
 * Aufbau filling order (baseline):
 * 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p →
 * 6s → 4f → 5d → 6p → 7s → 5f → 6d → 7p
 *
 * @param {number} atomicNumber - The element's atomic number (Z)
 * @returns {number[]} Array where index = shell (0=K, 1=L, …), value = electron count
 */
function getElectronShells(atomicNumber) {
    // ── Explicit overrides for Aufbau-exception elements ──
    // Each entry maps Z → [K, L, M, N, O, P, Q] (trailing zeros omitted).
    // Values are derived from the ground-state configurations in ELEMENTS_DATA.
    const SHELL_EXCEPTIONS = {
        // Period 4 — 3d anomalies
        24: [2, 8, 13, 1],             // Cr: [Ar]3d⁵4s¹  (half-filled 3d)
        29: [2, 8, 18, 1],             // Cu: [Ar]3d¹⁰4s¹ (fully-filled 3d)

        // Period 5 — 4d anomalies
        41: [2, 8, 18, 12, 1],         // Nb: [Kr]4d⁴5s¹
        42: [2, 8, 18, 13, 1],         // Mo: [Kr]4d⁵5s¹  (half-filled 4d)
        44: [2, 8, 18, 15, 1],         // Ru: [Kr]4d⁷5s¹
        45: [2, 8, 18, 16, 1],         // Rh: [Kr]4d⁸5s¹
        46: [2, 8, 18, 18],            // Pd: [Kr]4d¹⁰    (fully-filled 4d, empty 5s)
        47: [2, 8, 18, 18, 1],         // Ag: [Kr]4d¹⁰5s¹ (fully-filled 4d)

        // Period 6 — Lanthanide & 5d anomalies
        57: [2, 8, 18, 18, 9, 2],      // La: [Xe]5d¹6s²  (no 4f electrons)
        58: [2, 8, 18, 19, 9, 2],      // Ce: [Xe]4f¹5d¹6s²
        64: [2, 8, 18, 25, 9, 2],      // Gd: [Xe]4f⁷5d¹6s² (half-filled 4f)
        78: [2, 8, 18, 32, 17, 1],     // Pt: [Xe]4f¹⁴5d⁹6s¹
        79: [2, 8, 18, 32, 18, 1],     // Au: [Xe]4f¹⁴5d¹⁰6s¹ (fully-filled 5d)

        // Period 7 — Actinide anomalies
        89: [2, 8, 18, 32, 18, 9, 2],  // Ac: [Rn]6d¹7s²  (no 5f electrons)
        90: [2, 8, 18, 32, 18, 10, 2], // Th: [Rn]6d²7s²  (no 5f electrons)
        91: [2, 8, 18, 32, 20, 9, 2],  // Pa: [Rn]5f²6d¹7s²
        92: [2, 8, 18, 32, 21, 9, 2],  // U:  [Rn]5f³6d¹7s²
        93: [2, 8, 18, 32, 22, 9, 2],  // Np: [Rn]5f⁴6d¹7s²
        96: [2, 8, 18, 32, 25, 9, 2],  // Cm: [Rn]5f⁷6d¹7s² (half-filled 5f)
        103: [2, 8, 18, 32, 32, 8, 3], // Lr: [Rn]5f¹⁴7s²7p¹
    };

    // Return the pre-computed override if this element has an exception
    if (SHELL_EXCEPTIONS[atomicNumber]) {
        return [...SHELL_EXCEPTIONS[atomicNumber]];
    }

    // ── Standard Aufbau-based computation ──
    // [principal_quantum_number (1-based), sub-shell capacity]
    const fillingOrder = [
        [1, 2],   // 1s
        [2, 2],   // 2s
        [2, 6],   // 2p
        [3, 2],   // 3s
        [3, 6],   // 3p
        [4, 2],   // 4s
        [3, 10],  // 3d
        [4, 6],   // 4p
        [5, 2],   // 5s
        [4, 10],  // 4d
        [5, 6],   // 5p
        [6, 2],   // 6s
        [4, 14],  // 4f
        [5, 10],  // 5d
        [6, 6],   // 6p
        [7, 2],   // 7s
        [5, 14],  // 5f
        [6, 10],  // 6d
        [7, 6],   // 7p
    ];

    const shells = [0, 0, 0, 0, 0, 0, 0]; // K, L, M, N, O, P, Q
    let remaining = atomicNumber;

    for (const [shell, capacity] of fillingOrder) {
        if (remaining <= 0) break;
        const electronsToFill = Math.min(remaining, capacity);
        shells[shell - 1] += electronsToFill;
        remaining -= electronsToFill;
    }

    // Remove trailing empty shells
    while (shells.length > 0 && shells[shells.length - 1] === 0) {
        shells.pop();
    }

    return shells;
}

// ============================================
// PRONUNCIATION (Web Speech API)
// ============================================
function pronounceElement() {
    if (!selectedElement) return;
    // Respect mute toggle — no pronunciation when sounds are off
    if (window.BroProSounds && !BroProSounds.enabled) return;

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
let currentQuizMode = 'classic';

function startQuiz() {
    quizActive = false; // Not active until a mode is chosen

    // Show selection screen, hide play area
    document.getElementById('quizSelectionScreen').style.display = 'block';
    document.getElementById('quizPlayArea').style.display = 'none';

    // Translate selection screen labels dynamically
    const t = UI_TRANSLATIONS[currentLanguage];
    document.getElementById('quizSelectionTitle').textContent = currentLanguage === 'hi' ? 'प्रशिक्षण मिशन चुनें' : 'Select Training Mission';
    document.getElementById('quizSelectionSubtitle').textContent = currentLanguage === 'hi' ? 'लक्षित क्विज़ चुनौतियों के साथ आवर्त सारणी में महारत हासिल करें' : 'Master the periodic table with targeted quiz challenges';

    document.getElementById('atomicQuizTitle').textContent = currentLanguage === 'hi' ? 'परमाणु क्रमांक मास्टर' : 'Atomic Numbers Master';
    document.getElementById('atomicQuizDesc').textContent = currentLanguage === 'hi' ? 'पहले 30 तत्वों + प्रसिद्ध तत्वों (सोना, टंग्स्टन, आदि) के परमाणु क्रमांक सीखें।' : 'Learn atomic numbers of first 30 elements + famous elements (Gold, Tungsten, etc.).';

    document.getElementById('symbolQuizTitle').textContent = currentLanguage === 'hi' ? 'रासायनिक प्रतीक मास्टर' : 'Chemical Symbols Master';
    document.getElementById('symbolQuizDesc').textContent = currentLanguage === 'hi' ? 'पहले 30 तत्वों + प्रसिद्ध तत्वों के रासायनिक प्रतीक याद करें।' : 'Chemical symbols for the first 30 elements + famous elements.';

    document.getElementById('classicQuizTitle').textContent = currentLanguage === 'hi' ? 'क्लासिक चुनौती' : 'Classic Challenge';
    document.getElementById('classicQuizDesc').textContent = currentLanguage === 'hi' ? 'प्रतीकों, नामों, संख्याओं और श्रेणियों के मिश्रित खेल के साथ खुद का परीक्षण करें।' : 'Test yourself with a mixed challenge of symbols, names, numbers, and categories.';

    document.getElementById('quizModal').classList.add('active');
}

function selectQuizMode(mode) {
    currentQuizMode = mode;
    quizActive = true;
    quizXP = 0;
    quizCurrentIndex = 0;
    quizCorrect = 0;
    quizWrong = 0;

    // Generate questions for this specific mode
    quizQuestions = generateQuizQuestionsForMode(mode, 10);

    // Hide selection screen, show play area
    document.getElementById('quizSelectionScreen').style.display = 'none';
    document.getElementById('quizPlayArea').style.display = 'block';

    // Update quiz mode label in the header
    const modeLabels = {
        'atomic-number': currentLanguage === 'hi' ? '🔢 परमाणु क्रमांक मास्टर' : '🔢 Atomic Numbers Master',
        'symbol': currentLanguage === 'hi' ? '🧪 रासायनिक प्रतीक मास्टर' : '🧪 Chemical Symbols Master',
        'classic': currentLanguage === 'hi' ? '🎯 क्लासिक चुनौती' : '🎯 Classic Challenge'
    };
    document.getElementById('quizMode').textContent = modeLabels[mode];

    // Start playing
    renderQuizQuestion();
}

function replayQuiz() {
    closeQuizResults();
    selectQuizMode(currentQuizMode);
}

function getQuizElementPool(mode) {
    if (mode === 'classic') {
        return ELEMENTS_DATA.filter(e => e.n <= 36); // First 36 elements for classic mixed
    }
    
    // For atomic-number and symbol modes: first 30 + famous elements
    const famousAtomicNumbers = [47, 53, 54, 56, 74, 78, 79, 80, 82, 86, 88, 92];
    return ELEMENTS_DATA.filter(e => e.n <= 30 || famousAtomicNumbers.includes(e.n));
}

function generateQuizQuestionsForMode(mode, count) {
    const questions = [];
    const pool = getQuizElementPool(mode);

    for (let i = 0; i < count; i++) {
        // Pick a random element from our pool
        const element = pool[Math.floor(Math.random() * pool.length)];
        
        let questionType = '';
        let questionText = '';
        let options = [];
        let correctIndex = 0;

        if (mode === 'atomic-number') {
            const types = ['name-to-number', 'symbol-to-number', 'number-to-name'];
            questionType = types[Math.floor(Math.random() * types.length)];

            if (questionType === 'name-to-number') {
                const name = currentLanguage === 'hi' ? element.hi : element.en;
                questionText = currentLanguage === 'hi' 
                    ? `तत्व **${name}** का परमाणु क्रमांक (Atomic Number) क्या है?`
                    : `What is the atomic number of the element **${name}**?`;
                options = generateNumberOptionsForPool(element, pool);
                correctIndex = options.indexOf(element.n.toString());
            } else if (questionType === 'symbol-to-number') {
                questionText = currentLanguage === 'hi'
                    ? `प्रतीक **${element.s}** वाले तत्व का परमाणु क्रमांक क्या है?`
                    : `What is the atomic number of the element with symbol **${element.s}**?`;
                options = generateNumberOptionsForPool(element, pool);
                correctIndex = options.indexOf(element.n.toString());
            } else { // 'number-to-name'
                questionText = currentLanguage === 'hi'
                    ? `किस तत्व का परमाणु क्रमांक **${element.n}** है?`
                    : `Which element has the atomic number **${element.n}**?`;
                options = generateNameOptionsForPool(element, pool);
                correctIndex = options.indexOf(currentLanguage === 'hi' ? element.hi : element.en);
            }
        } 
        else if (mode === 'symbol') {
            const types = ['name-to-symbol', 'symbol-to-name'];
            questionType = types[Math.floor(Math.random() * types.length)];

            if (questionType === 'name-to-symbol') {
                const name = currentLanguage === 'hi' ? element.hi : element.en;
                questionText = currentLanguage === 'hi'
                    ? `तत्व **${name}** का रासायनिक प्रतीक (Chemical Symbol) क्या है?`
                    : `What is the chemical symbol for the element **${name}**?`;
                options = generateSymbolOptionsForPool(element, pool);
                correctIndex = options.indexOf(element.s);
            } else { // 'symbol-to-name'
                questionText = currentLanguage === 'hi'
                    ? `रासायनिक प्रतीक **${element.s}** किस तत्व को दर्शाता है?`
                    : `Which element is represented by the chemical symbol **${element.s}**?`;
                options = generateNameOptionsForPool(element, pool);
                correctIndex = options.indexOf(currentLanguage === 'hi' ? element.hi : element.en);
            }
        } 
        else { // 'classic'
            const types = ['symbol', 'name', 'number', 'category'];
            questionType = types[Math.floor(Math.random() * types.length)];

            if (questionType === 'symbol') {
                questionText = currentLanguage === 'hi' 
                    ? `${element.hi} का प्रतीक क्या है?` 
                    : `What is the symbol for ${element.en}?`;
                options = generateSymbolOptions(element, pool);
                correctIndex = options.indexOf(element.s);
            } else if (questionType === 'name') {
                questionText = currentLanguage === 'hi' 
                    ? `${element.s} किस तत्व का प्रतीक है?` 
                    : `Which element has the symbol ${element.s}?`;
                options = generateNameOptions(element, pool);
                correctIndex = options.indexOf(currentLanguage === 'hi' ? element.hi : element.en);
            } else if (questionType === 'number') {
                questionText = currentLanguage === 'hi' 
                    ? `${element.hi} का परमाणु क्रमांक क्या है?` 
                    : `What is the atomic number of ${element.en}?`;
                options = generateNumberOptions(element);
                correctIndex = options.indexOf(element.n.toString());
            } else if (questionType === 'category') {
                questionText = currentLanguage === 'hi' 
                    ? `${element.hi} किस श्रेणी में आता है?` 
                    : `Which category does ${element.en} belong to?`;
                options = generateCategoryOptions(element);
                const catName = CATEGORY_NAMES[currentLanguage][element.c];
                correctIndex = options.indexOf(catName);
            }
        }

        questions.push({
            element: element,
            type: questionType,
            question: questionText,
            options: options,
            correct: correctIndex
        });
    }

    return questions;
}

function generateNumberOptionsForPool(correctElement, pool) {
    const options = [correctElement.n.toString()];
    while (options.length < 4) {
        const randomEl = pool[Math.floor(Math.random() * pool.length)];
        const numStr = randomEl.n.toString();
        if (!options.includes(numStr)) {
            options.push(numStr);
        }
    }
    return shuffleArray(options);
}

function generateNameOptionsForPool(correctElement, pool) {
    const name = currentLanguage === 'hi' ? correctElement.hi : correctElement.en;
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

function generateSymbolOptionsForPool(correctElement, pool) {
    const options = [correctElement.s];
    while (options.length < 4) {
        const random = pool[Math.floor(Math.random() * pool.length)];
        if (!options.includes(random.s)) {
            options.push(random.s);
        }
    }
    return shuffleArray(options);
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

    // Format query text to support markdown bold format **Name** -> <strong>Name</strong>
    const formattedQuestion = q.question.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    document.getElementById('quizQuestion').innerHTML = formattedQuestion;
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

    // 🎰 Check for Saat Crore Easter Egg (7 quizzes with 90%+ accuracy)
    if (window.SaatCroreEasterEgg) {
        SaatCroreEasterEgg.recordPerfectQuiz(accuracy, 'periodic-table');
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

// ============================================
// PREMIUM INTERACTIVE LEGEND FILTERING
// ============================================

// Active legend category
let activeLegendCategory = null;

/**
 * Initialize premium legend click handlers
 */
function initLegendFilters() {
    const legendItems = document.querySelectorAll('.legend-item');

    legendItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            toggleLegendFilter(category, item);
        });

        // Add cursor pointer and transition for premium feel
        item.style.cursor = 'pointer';
    });
}

/**
 * Toggle legend filter with premium effects
 */
function toggleLegendFilter(category, legendItem) {
    const allLegendItems = document.querySelectorAll('.legend-item');

    // If clicking the same category, reset to show all
    if (activeLegendCategory === category) {
        activeLegendCategory = null;

        // Remove active state from legend
        allLegendItems.forEach(item => item.classList.remove('legend-active'));

        // Reset all elements
        resetElementHighlighting();

        // Update dropdown to match
        const dropdown = document.getElementById('categoryFilter');
        if (dropdown) dropdown.value = 'all';

        // Show toast
        showToast(currentLanguage === 'hi' ? 'सभी तत्व दिखाए गए' : 'Showing all elements');

        return;
    }

    // Set new active category
    activeLegendCategory = category;

    // Update legend items - highlight only the active one
    allLegendItems.forEach(item => {
        item.classList.toggle('legend-active', item.dataset.category === category);
        item.classList.toggle('legend-inactive', item.dataset.category !== category);
    });

    // Apply premium filtering to elements
    applyPremiumCategoryFilter(category);

    // Update dropdown to match
    const dropdown = document.getElementById('categoryFilter');
    if (dropdown) dropdown.value = category;

    // Get category name for toast
    const categoryNames = CATEGORY_NAMES[currentLanguage];
    const categoryName = categoryNames[category] || category;
    showToast(currentLanguage === 'hi' ? `${categoryName} दिखाए गए` : `Showing ${categoryName}`);
}

/**
 * Apply premium visual effects when filtering by category
 */
function applyPremiumCategoryFilter(category) {
    const allElements = document.querySelectorAll('.element:not(.placeholder)');

    // Define metal and non-metal categories for group filters
    const metalCategories = [
        'alkali-metal',
        'alkaline-earth',
        'transition-metal',
        'post-transition',
        'lanthanide',
        'actinide'
    ];

    const nonMetalCategories = [
        'nonmetal',
        'halogen',
        'noble-gas'
    ];

    allElements.forEach((el, index) => {
        const elCategory = el.dataset.category;
        const number = parseInt(el.dataset.number);
        let matches = false;

        // Check which filter type is being applied
        if (category === 'all-metals') {
            matches = metalCategories.includes(elCategory);
        } else if (category === 'all-nonmetals') {
            matches = nonMetalCategories.includes(elCategory);
        } else if (category === 'radioactive') {
            matches = isRadioactive(number);
        } else {
            matches = elCategory === category;
        }

        // Remove previous states
        el.classList.remove('dimmed', 'highlighted', 'category-glow', 'category-pulse');

        if (matches) {
            // Apply premium highlighting with staggered animation
            el.classList.add('category-glow', 'category-pulse');
            el.style.animationDelay = `${index * 0.02}s`;
            el.style.zIndex = '5';
        } else {
            // Dim non-matching elements
            el.classList.add('dimmed');
            el.style.zIndex = '1';
        }
    });
}

/**
 * Reset all element highlighting to default state
 */
function resetElementHighlighting() {
    const allElements = document.querySelectorAll('.element:not(.placeholder)');
    const allLegendItems = document.querySelectorAll('.legend-item');

    allElements.forEach(el => {
        el.classList.remove('dimmed', 'highlighted', 'category-glow', 'category-pulse');
        el.style.animationDelay = '';
        el.style.zIndex = '';
    });

    allLegendItems.forEach(item => {
        item.classList.remove('legend-active', 'legend-inactive');
    });

    activeLegendCategory = null;
}

/**
 * Enhanced filterByCategory to work with legend system
 */
const originalFilterByCategory = filterByCategory;
filterByCategory = function (category) {
    if (category === 'all') {
        resetElementHighlighting();
    } else {
        // Find and activate the corresponding legend item
        const legendItem = document.querySelector(`.legend-item[data-category="${category}"]`);
        if (legendItem && activeLegendCategory !== category) {
            toggleLegendFilter(category, legendItem);
            return;
        }
    }

    // Update current filter state
    currentFilter = category;

    if (category === 'all') {
        document.querySelectorAll('.element:not(.placeholder)').forEach(el => {
            el.classList.remove('dimmed');
        });
    }
};

// ============================================
// ADVANCED FILTER PANEL (Groups/Periods/Blocks)
// Production-Ready, Premium Implementation
// ============================================

let activeAdvancedFilter = null; // Track current active filter { type, value }

/**
 * Initialize the Advanced Filter Panel
 */
function initAdvancedFilterPanel() {
    const panel = document.getElementById('advancedFilterPanel');
    if (!panel) return;

    // Initialize tab switching
    const tabs = panel.querySelectorAll('.afp-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchAdvancedTab(tab.dataset.tab));
    });

    // Initialize filter buttons
    const filterBtns = panel.querySelectorAll('.afp-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.dataset.filter;
            const filterValue = btn.dataset.value;
            toggleAdvancedFilter(filterType, filterValue, btn);
        });
    });
}

/**
 * Switch between Groups/Periods/Blocks tabs
 */
function switchAdvancedTab(tabName) {
    // Update tab active states
    document.querySelectorAll('.afp-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // Update pane visibility
    document.querySelectorAll('.afp-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `afp-${tabName}`);
    });
}

/**
 * Toggle an advanced filter (Group/Period/Block)
 */
function toggleAdvancedFilter(filterType, filterValue, btn) {
    const filterKey = `${filterType}-${filterValue}`;

    // If clicking the same filter, toggle off
    if (activeAdvancedFilter === filterKey) {
        clearAdvancedFilter();
        return;
    }

    // Clear any existing filters first
    clearAllFiltersQuietly();

    // Set new active filter
    activeAdvancedFilter = filterKey;

    // Update button states
    document.querySelectorAll('.afp-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Apply the filter
    applyAdvancedFilter(filterType, filterValue);

    // Show toast notification
    const filterLabel = getAdvancedFilterLabel(filterType, filterValue);
    showToast(currentLanguage === 'hi' ? `${filterLabel} दिखाए गए` : `Showing ${filterLabel}`);
}

/**
 * Apply advanced filter highlighting to elements
 */
function applyAdvancedFilter(filterType, filterValue) {
    const allElements = document.querySelectorAll('.element:not(.placeholder)');

    allElements.forEach((el, index) => {
        let matches = false;

        if (filterType === 'group') {
            matches = el.dataset.group === filterValue;
        } else if (filterType === 'period') {
            if (filterValue === 'lanthanide') {
                matches = el.dataset.category === 'lanthanide';
            } else if (filterValue === 'actinide') {
                matches = el.dataset.category === 'actinide';
            } else {
                matches = el.dataset.period === filterValue;
            }
        } else if (filterType === 'block') {
            matches = el.dataset.block === filterValue;
        }

        el.classList.remove('dimmed', 'category-glow', 'category-pulse');

        if (matches) {
            el.classList.add('category-glow', 'category-pulse');
            el.style.animationDelay = `${index * 0.015}s`;
            el.style.zIndex = '5';
        } else {
            el.classList.add('dimmed');
            el.style.zIndex = '1';
        }
    });
}

/**
 * Clear the active advanced filter
 */
function clearAdvancedFilter() {
    activeAdvancedFilter = null;

    // Reset button states
    document.querySelectorAll('.afp-btn').forEach(b => b.classList.remove('active'));

    // Reset element highlighting
    resetElementHighlighting();

    // Show toast
    showToast(currentLanguage === 'hi' ? 'सभी तत्व दिखाए गए' : 'Showing all elements');
}

/**
 * Clear all filters quietly (no toast, for switching between filter types)
 */
function clearAllFiltersQuietly() {
    // Clear advanced filter
    activeAdvancedFilter = null;
    document.querySelectorAll('.afp-btn').forEach(b => b.classList.remove('active'));

    // Clear legend filter
    activeLegendCategory = null;
    document.querySelectorAll('.legend-item').forEach(item => {
        item.classList.remove('legend-active', 'legend-inactive');
    });

    // Reset dropdown
    const dropdown = document.getElementById('categoryFilter');
    if (dropdown) dropdown.value = 'all';

    // Reset elements
    document.querySelectorAll('.element:not(.placeholder)').forEach(el => {
        el.classList.remove('dimmed', 'category-glow', 'category-pulse');
        el.style.animationDelay = '';
        el.style.zIndex = '';
    });
}

/**
 * Get a human-readable label for the filter
 */
function getAdvancedFilterLabel(filterType, filterValue) {
    const labels = {
        en: {
            group: `Group ${filterValue}`,
            period: filterValue === 'lanthanide' ? 'Lanthanides' :
                filterValue === 'actinide' ? 'Actinides' : `Period ${filterValue}`,
            block: `${filterValue.toUpperCase()}-block elements`
        },
        hi: {
            group: `समूह ${filterValue}`,
            period: filterValue === 'lanthanide' ? 'लैंथेनाइड' :
                filterValue === 'actinide' ? 'एक्टिनाइड' : `आवर्त ${filterValue}`,
            block: `${filterValue.toUpperCase()}-ब्लॉक तत्व`
        }
    };
    return labels[currentLanguage][filterType] || filterValue;
}

console.log('⚗️ Periodic Table JavaScript loaded!');

