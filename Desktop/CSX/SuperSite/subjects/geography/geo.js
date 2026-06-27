/* ============================================
   GEOGRAPHY EXPLORER - GAME ENGINE
   Class-wise Chapter Organization (NCERT)
   Topic-based Filtering: Physical, Human, Map Skills, World
   ============================================ */

// ============================================
// CLASS-WISE CHAPTER REGISTRY (NCERT Aligned)
// subject = topic: 'physical', 'human', 'mapskills', 'world'
// ============================================
const classChapters = {
    '6': [
        // The Earth: Our Habitat (NCERT Class 6 Geography)
        { id: 'c6_ch1', name: 'The Earth in the Solar System', subject: 'physical', ch: 1, icon: '🌍', dataKey: null },
        { id: 'c6_ch2', name: 'Globe: Latitudes and Longitudes', subject: 'mapskills', ch: 2, icon: '🌐', dataKey: null },
        { id: 'c6_ch3', name: 'Motions of the Earth', subject: 'physical', ch: 3, icon: '🔄', dataKey: null },
        { id: 'c6_ch4', name: 'Maps', subject: 'mapskills', ch: 4, icon: '🗺️', dataKey: null },
        { id: 'c6_ch5', name: 'Major Domains of the Earth', subject: 'physical', ch: 5, icon: '🏔️', dataKey: null },
        { id: 'c6_ch6', name: 'Major Landforms of the Earth', subject: 'physical', ch: 6, icon: '⛰️', dataKey: null },
        { id: 'c6_ch7', name: 'Our Country – India', subject: 'indian', ch: 7, icon: '🇮🇳', dataKey: null },
        { id: 'c6_ch8', name: 'India: Climate, Vegetation and Wildlife', subject: 'indian', ch: 8, icon: '🌿', dataKey: null }
    ],
    '7': [
        // Our Environment (NCERT Class 7 Geography)
        { id: 'c7_ch1', name: 'Environment', subject: 'physical', ch: 1, icon: '🌱', dataKey: null },
        { id: 'c7_ch2', name: 'Inside Our Earth', subject: 'physical', ch: 2, icon: '🌋', dataKey: null },
        { id: 'c7_ch3', name: 'Our Changing Earth', subject: 'physical', ch: 3, icon: '🏜️', dataKey: null },
        { id: 'c7_ch4', name: 'Air', subject: 'physical', ch: 4, icon: '💨', dataKey: null },
        { id: 'c7_ch5', name: 'Water', subject: 'physical', ch: 5, icon: '💧', dataKey: null },
        { id: 'c7_ch6', name: 'Natural Vegetation and Wildlife', subject: 'physical', ch: 6, icon: '🦁', dataKey: null },
        { id: 'c7_ch7', name: 'Human Environment – Settlement, Transport and Communication', subject: 'human', ch: 7, icon: '🏘️', dataKey: null },
        { id: 'c7_ch8', name: 'Human-Environment Interactions: Tropical and Subtropical Region', subject: 'human', ch: 8, icon: '🌴', dataKey: null },
        { id: 'c7_ch9', name: 'Life in the Temperate Grasslands', subject: 'human', ch: 9, icon: '🌾', dataKey: null },
        { id: 'c7_ch10', name: 'Life in the Deserts', subject: 'human', ch: 10, icon: '🐫', dataKey: null }
    ],
    '8': [
        // Resources and Development (NCERT Class 8 Geography)
        { id: 'c8_ch1', name: 'Resources', subject: 'human', ch: 1, icon: '⛏️', dataKey: null },
        { id: 'c8_ch2', name: 'Land, Soil, Water, Natural Vegetation and Wildlife Resources', subject: 'physical', ch: 2, icon: '🌿', dataKey: null },
        { id: 'c8_ch3', name: 'Mineral and Power Resources', subject: 'physical', ch: 3, icon: '💎', dataKey: null },
        { id: 'c8_ch4', name: 'Agriculture', subject: 'human', ch: 4, icon: '🌾', dataKey: null },
        { id: 'c8_ch5', name: 'Industries', subject: 'human', ch: 5, icon: '🏭', dataKey: null },
        { id: 'c8_ch6', name: 'Human Resources', subject: 'human', ch: 6, icon: '👥', dataKey: null }
    ],
    '9': [
        // Contemporary India - I (NCERT Class 9 Geography)
        { id: 'c9_ch1', name: 'India – Size and Location', subject: 'indian', ch: 1, icon: '🇮🇳', dataKey: null },
        { id: 'c9_ch2', name: 'Physical Features of India', subject: 'indian', ch: 2, icon: '🏔️', dataKey: null },
        { id: 'c9_ch3', name: 'Drainage', subject: 'physical', ch: 3, icon: '🏞️', dataKey: null },
        { id: 'c9_ch4', name: 'Climate', subject: 'physical', ch: 4, icon: '🌦️', dataKey: null },
        { id: 'c9_ch5', name: 'Natural Vegetation and Wildlife', subject: 'physical', ch: 5, icon: '🐘', dataKey: null },
        { id: 'c9_ch6', name: 'Population', subject: 'indian', ch: 6, icon: '👨‍👩‍👧‍👦', dataKey: null }
    ],
    '10': [
        // Contemporary India - II (NCERT Class 10 Geography)
        { id: 'c10_ch1', name: 'Resources and Development', subject: 'human', ch: 1, icon: '🌱', dataKey: null },
        { id: 'c10_ch2', name: 'Forest and Wildlife Resources', subject: 'physical', ch: 2, icon: '🌲', dataKey: null },
        { id: 'c10_ch3', name: 'Water Resources', subject: 'physical', ch: 3, icon: '💧', dataKey: null },
        { id: 'c10_ch4', name: 'Agriculture', subject: 'human', ch: 4, icon: '🚜', dataKey: null },
        { id: 'c10_ch5', name: 'Minerals and Energy Resources', subject: 'physical', ch: 5, icon: '⛏️', dataKey: null },
        { id: 'c10_ch6', name: 'Manufacturing Industries', subject: 'human', ch: 6, icon: '🏗️', dataKey: null },
        { id: 'c10_ch7', name: 'Lifelines of National Economy', subject: 'human', ch: 7, icon: '🚆', dataKey: null }
    ],
    'other': [
        // General topic-based quizzes (not class-specific)
        { id: 'gen_countries', name: 'Countries & Flags', subject: 'world', icon: '🏳️', dataKey: 'countries' },
        { id: 'gen_continents', name: 'Continents & Oceans', subject: 'world', icon: '🌐', dataKey: 'continents' },
        { id: 'gen_landmarks', name: 'Famous Landmarks', subject: 'world', icon: '🏛️', dataKey: 'landmarks' }
    ]
};

// ============================================
// GEOGRAPHY DATA
// ============================================
const geoData = {
    countries: [
        { name: 'India (भारत)', flag: '🇮🇳', capital: 'New Delhi (नई दिल्ली)', continent: 'Asia (एशिया)' },
        { name: 'United States (संयुक्त राज्य अमेरिका)', flag: '🇺🇸', capital: 'Washington D.C. (वाशिंगटन डी.सी.)', continent: 'North America (उत्तरी अमेरिका)' },
        { name: 'United Kingdom (यूनाइटेड किंगडम)', flag: '🇬🇧', capital: 'London (लंदन)', continent: 'Europe (यूरोप)' },
        { name: 'Japan (जापान)', flag: '🇯🇵', capital: 'Tokyo (टोक्यो)', continent: 'Asia (एशिया)' },
        { name: 'Brazil (ब्राज़ील)', flag: '🇧🇷', capital: 'Brasília (ब्रासीलिया)', continent: 'South America (दक्षिण अमेरिका)' },
        { name: 'Australia (ऑस्ट्रेलिया)', flag: '🇦🇺', capital: 'Canberra (कैनबरा)', continent: 'Oceania (ओशिनिया)' },
        { name: 'Germany (जर्मनी)', flag: '🇩🇪', capital: 'Berlin (बर्लिन)', continent: 'Europe (यूरोप)' },
        { name: 'France (फ्रांस)', flag: '🇫🇷', capital: 'Paris (पेरिस)', continent: 'Europe (यूरोप)' },
        { name: 'Italy (इटली)', flag: '🇮🇹', capital: 'Rome (रोम)', continent: 'Europe (यूरोप)' },
        { name: 'Canada (कनाडा)', flag: '🇨🇦', capital: 'Ottawa (ओटावा)', continent: 'North America (उत्तरी अमेरिका)' },
        { name: 'China (चीन)', flag: '🇨🇳', capital: 'Beijing (बीजिंग)', continent: 'Asia (एशिया)' },
        { name: 'Russia (रूस)', flag: '🇷🇺', capital: 'Moscow (मॉस्को)', continent: 'Europe/Asia (यूरोप/एशिया)' },
        { name: 'South Africa (दक्षिण अफ्रीका)', flag: '🇿🇦', capital: 'Pretoria (प्रिटोरिया)', continent: 'Africa (अफ्रीका)' },
        { name: 'Egypt (मिस्र)', flag: '🇪🇬', capital: 'Cairo (काहिरा)', continent: 'Africa (अफ्रीका)' },
        { name: 'Mexico (मैक्सिको)', flag: '🇲🇽', capital: 'Mexico City (मैक्सिको सिटी)', continent: 'North America (उत्तरी अमेरिका)' },
        { name: 'Argentina (अर्जेंटीना)', flag: '🇦🇷', capital: 'Buenos Aires (ब्यूनस आयर्स)', continent: 'South America (दक्षिण अमेरिका)' },
        { name: 'Spain (स्पेन)', flag: '🇪🇸', capital: 'Madrid (मैड्रिड)', continent: 'Europe (यूरोप)' },
        { name: 'South Korea (दक्षिण कोरिया)', flag: '🇰🇷', capital: 'Seoul (सियोल)', continent: 'Asia (एशिया)' },
        { name: 'New Zealand (न्यूजीलैंड)', flag: '🇳🇿', capital: 'Wellington (वेलिंगटन)', continent: 'Oceania (ओशिनिया)' },
        { name: 'Thailand (थाईलैंड)', flag: '🇹🇭', capital: 'Bangkok (बैंकॉक)', continent: 'Asia (एशिया)' },
        { name: 'Netherlands (नीदरलैंड)', flag: '🇳🇱', capital: 'Amsterdam (एम्स्टर्डम)', continent: 'Europe (यूरोप)' },
        { name: 'Switzerland (स्विट्जरलैंड)', flag: '🇨🇭', capital: 'Bern (बर्न)', continent: 'Europe (यूरोप)' },
        { name: 'Sweden (स्वीडन)', flag: '🇸🇪', capital: 'Stockholm (स्टॉकहोम)', continent: 'Europe (यूरोप)' },
        { name: 'Norway (नॉर्वे)', flag: '🇳🇴', capital: 'Oslo (ओस्लो)', continent: 'Europe (यूरोप)' },
        { name: 'Portugal (पुर्तगाल)', flag: '🇵🇹', capital: 'Lisbon (लिस्बन)', continent: 'Europe (यूरोप)' },
        { name: 'Greece (ग्रीस)', flag: '🇬🇷', capital: 'Athens (एथेंस)', continent: 'Europe (यूरोप)' },
        { name: 'Turkey (तुर्की)', flag: '🇹🇷', capital: 'Ankara (अंकारा)', continent: 'Europe/Asia (यूरोप/एशिया)' },
        { name: 'Indonesia (इंडोनेशिया)', flag: '🇮🇩', capital: 'Jakarta (जकार्ता)', continent: 'Asia (एशिया)' },
        { name: 'Malaysia (मलेशिया)', flag: '🇲🇾', capital: 'Kuala Lumpur (कुआलालंपुर)', continent: 'Asia (एशिया)' },
        { name: 'Singapore (सिंगापुर)', flag: '🇸🇬', capital: 'Singapore (सिंगापुर)', continent: 'Asia (एशिया)' }
    ],

    continents: [
        { name: 'Asia (एशिया)', emoji: '🌏', fact: 'Largest continent, home to 60% of world population (सबसे बड़ा महाद्वीप, विश्व की 60% जनसंख्या का घर)' },
        { name: 'Africa (अफ्रीका)', emoji: '🌍', fact: 'Second largest, has 54 countries (दूसरा सबसे बड़ा, 54 देश हैं)' },
        { name: 'North America (उत्तरी अमेरिका)', emoji: '🌎', fact: 'Third largest, includes Canada, USA, Mexico (तीसरा सबसे बड़ा, कनाडा, अमेरिका, मैक्सिको शामिल)' },
        { name: 'South America (दक्षिण अमेरिका)', emoji: '🌎', fact: 'Contains Amazon rainforest (अमेज़न वर्षावन यहाँ है)' },
        { name: 'Antarctica (अंटार्कटिका)', emoji: '🧊', fact: 'No permanent residents, coldest continent (कोई स्थायी निवासी नहीं, सबसे ठंडा महाद्वीप)' },
        { name: 'Europe (यूरोप)', emoji: '🌍', fact: '44 countries, very diverse cultures (44 देश, बहुत विविध संस्कृतियाँ)' },
        { name: 'Australia/Oceania (ऑस्ट्रेलिया/ओशिनिया)', emoji: '🌏', fact: 'Smallest continent, includes Pacific islands (सबसे छोटा महाद्वीप, प्रशांत द्वीप शामिल)' }
    ],

    oceans: [
        { name: 'Pacific Ocean (प्रशांत महासागर)', emoji: '🌊', fact: 'Largest ocean, covers 1/3 of Earth (सबसे बड़ा महासागर, पृथ्वी का 1/3 भाग)' },
        { name: 'Atlantic Ocean (अटलांटिक महासागर)', emoji: '🌊', fact: 'Second largest, separates Americas from Europe/Africa (दूसरा सबसे बड़ा)' },
        { name: 'Indian Ocean (हिंद महासागर)', emoji: '🌊', fact: 'Third largest, warmest ocean (तीसरा सबसे बड़ा, सबसे गर्म महासागर)' },
        { name: 'Southern Ocean (दक्षिणी महासागर)', emoji: '🌊', fact: 'Surrounds Antarctica (अंटार्कटिका को घेरता है)' },
        { name: 'Arctic Ocean (आर्कटिक महासागर)', emoji: '🌊', fact: 'Smallest and coldest ocean (सबसे छोटा और सबसे ठंडा महासागर)' }
    ],

    landmarks: [
        { name: 'Eiffel Tower (एफिल टॉवर)', emoji: '🗼', country: 'France (फ्रांस)', city: 'Paris (पेरिस)' },
        { name: 'Statue of Liberty (स्टैच्यू ऑफ लिबर्टी)', emoji: '🗽', country: 'USA (अमेरिका)', city: 'New York (न्यूयॉर्क)' },
        { name: 'Great Wall (चीन की दीवार)', emoji: '🏯', country: 'China (चीन)', city: 'Beijing (बीजिंग)' },
        { name: 'Taj Mahal (ताज महल)', emoji: '🕌', country: 'India (भारत)', city: 'Agra (आगरा)' },
        { name: 'Big Ben (बिग बेन)', emoji: '🏛️', country: 'UK (ब्रिटेन)', city: 'London (लंदन)' },
        { name: 'Sydney Opera House (सिडनी ओपेरा हाउस)', emoji: '🎭', country: 'Australia (ऑस्ट्रेलिया)', city: 'Sydney (सिडनी)' },
        { name: 'Colosseum (कोलोसियम)', emoji: '🏟️', country: 'Italy (इटली)', city: 'Rome (रोम)' },
        { name: 'Machu Picchu (माचू पिच्चू)', emoji: '🏔️', country: 'Peru (पेरू)', city: 'Cusco (कुस्को)' }
    ]
};

// ============================================
// SELECTED CLASS & TOPIC STATE
// ============================================
let selectedClass = 'all';
let selectedSubject = 'all'; // topic filter: physical, human, mapskills, world

// ============================================
// PLAYER STATE
// ============================================
let playerState = {
    xp: 0,
    countriesLearned: [],
    quizzesCompleted: 0
};

// ============================================
// QUIZ STATE
// ============================================
let quizState = {
    mode: null,
    questions: [],
    currentIndex: 0,
    score: 0,
    xpEarned: 0,
    userAnswers: []
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerState();
    initTheme();
    initFactsCarousel();
    updateUI();
    renderChapterGrid();
});

function loadPlayerState() {
    const saved = localStorage.getItem('supersite-geo-player');
    if (saved) {
        playerState = JSON.parse(saved);
    }
}

function savePlayerState() {
    localStorage.setItem('supersite-geo-player', JSON.stringify(playerState));
}

function updateUI() {
    if (window.BroProPlayer) {
        const profile = BroProPlayer.load();
        document.getElementById('xpCount').textContent = profile.xp;
    }
}

// ============================================
// CLASS SELECTOR
// ============================================
function selectClass(cls) {
    selectedClass = cls;
    selectedSubject = 'all';

    document.querySelectorAll('#classSelectorRow .class-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.class === cls);
    });

    document.querySelectorAll('.subject-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.subject === 'all');
    });

    renderChapterGrid();
    if (window.BroProSounds) BroProSounds.play('click');
}

// ============================================
// TOPIC FILTER
// ============================================
function filterSubject(subject) {
    selectedSubject = subject;

    document.querySelectorAll('.subject-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.subject === subject);
    });

    renderChapterGrid();
}

// ============================================
// DYNAMIC CHAPTER GRID RENDERER
// ============================================
function renderChapterGrid() {
    const grid = document.getElementById('activitiesGrid');
    const gradientMap = {
        physical: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        human: 'linear-gradient(135deg, #667eea, #764ba2)',
        mapskills: 'linear-gradient(135deg, #43e97b, #38f9d7)',
        indian: 'linear-gradient(135deg, #ff9933, #138808)',
        world: 'linear-gradient(135deg, #fa709a, #fee140)'
    };
    const labelMap = { physical: 'Physical', human: 'Human', mapskills: 'Map Skills', indian: 'Indian', world: 'World' };

    // Determine which quiz-type maps to dataKey (for "other" general topics)
    const quizDataKeys = { countries: true, continents: true, landmarks: true };

    // Get chapters
    let chapters;
    if (selectedClass === 'all') {
        chapters = [];
        Object.values(classChapters).forEach(list => {
            list.forEach(ch => {
                if (ch.dataKey && quizDataKeys[ch.dataKey] && !chapters.some(c => c.dataKey === ch.dataKey)) {
                    chapters.push(ch);
                }
            });
        });
    } else {
        chapters = classChapters[selectedClass] || [];
    }

    // Filter by topic
    const filtered = selectedSubject === 'all'
        ? chapters
        : chapters.filter(ch => ch.subject === selectedSubject);

    // Playable = has a quiz data key
    const playable = filtered.filter(ch => ch.dataKey && quizDataKeys[ch.dataKey]);

    let html = '';

    // Leaderboard card — always pinned
    html += `
    <div class="activity-card leaderboard-card" onclick="openLeaderboard()" style="animation-delay:0.02s">
        <div class="card-header" style="background: linear-gradient(135deg, #ffd700, #ff8c00);">
            <span class="card-emoji">🏆</span>
            <span class="category-tag">Rankings</span>
        </div>
        <div class="card-body">
            <h3 class="card-title">Leaderboard</h3>
            <p class="card-desc">See the top Geography Champions!</p>
            <div class="card-footer">
                <span class="difficulty" style="background: gold; color: #333;">Global</span>
                <span class="xp-reward">🌟 Rankings</span>
            </div>
        </div>
    </div>`;

    // GeoMaster + World Map — only show for 'all' or 'other'
    if (selectedClass === 'all' || selectedClass === 'other') {
        html += `
        <div class="activity-card geomaster-card" onclick="GeoMasterMap.openGeoMaster()" style="animation-delay:0.05s">
            <div class="card-header" style="background: linear-gradient(135deg, #6366f1, #8b5cf6);">
                <span class="card-emoji">🗺️</span>
                <span class="category-tag" style="background: rgba(255,255,255,0.2); color: #fff;">🌟 Premium</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">GeoMaster</h3>
                <p class="card-desc">Learn → Practice → Master 195 countries!</p>
                <div class="card-footer">
                    <span class="difficulty legendary">Premium</span>
                    <span class="xp-reward">195 Countries</span>
                </div>
            </div>
        </div>`;

        html += `
        <div class="activity-card" onclick="openActivity('worldmap')" style="animation-delay:0.08s">
            <div class="card-header" style="background: linear-gradient(135deg, #1a1a2e, #16213e);">
                <span class="card-emoji">🗺️</span>
                <span class="category-tag">Interactive</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">World Map Explorer</h3>
                <p class="card-desc">Interactive map with countries, capitals & landmarks</p>
                <div class="card-footer">
                    <span class="difficulty easy">Explore</span>
                    <span class="xp-reward">+10 XP</span>
                </div>
            </div>
        </div>`;
    }

    // Render playable chapter cards
    playable.forEach((ch, i) => {
        const gradient = gradientMap[ch.subject] || gradientMap.world;
        const topicLabel = labelMap[ch.subject] || 'Geography';
        const chapterBadge = ch.ch ? `<span class="chapter-number-badge">Ch${ch.ch}</span>` : '';
        const delay = `style="animation-delay:${(i + 3) * 0.06}s"`;

        // XP depends on quiz type
        const xpMap = { countries: 15, continents: 10, landmarks: 15 };
        const xp = xpMap[ch.dataKey] || 10;

        html += `
        <div class="activity-card" data-category="${ch.subject}" onclick="openActivity('${ch.dataKey}')" ${delay}>
            <div class="card-header" style="background: ${gradient};">
                ${chapterBadge}
                <span class="card-emoji">${ch.icon}</span>
                <span class="category-tag">${topicLabel}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${ch.name}</h3>
                <p class="card-desc">Quiz</p>
                <div class="card-footer">
                    <span class="difficulty easy">Play Now</span>
                    <span class="xp-reward">+${xp} XP/Q</span>
                </div>
            </div>
        </div>`;
    });

    grid.innerHTML = html;

    // Update chapter count label
    const label = document.getElementById('chapterCountLabel');
    if (label) {
        const className = selectedClass === 'all' ? 'All Topics' : selectedClass === 'other' ? 'General Topics' : 'Class ' + selectedClass;
        const topicName = selectedSubject === 'all' ? '' : ' • ' + labelMap[selectedSubject];
        if (playable.length > 0) {
            label.textContent = `${className}${topicName} — ${playable.length} topics available`;
        } else if (selectedClass !== 'other' && selectedClass !== 'all') {
            label.textContent = `${className}${topicName} — Content coming soon`;
        } else {
            label.textContent = '';
        }
    }
}

// ============================================
// ACTIVITIES
// ============================================
const geoActivityOrder = ['worldmap', 'countries', 'continents', 'coordinates', 'landmarks', 'speed'];

function openActivity(type) {
    const activityIndex = geoActivityOrder.indexOf(type);
    const activityNames = {
        worldmap: 'World Map Explorer',
        countries: 'Countries Quiz',
        continents: 'Continents & Oceans',
        coordinates: 'Coordinates Challenge',
        landmarks: 'Famous Landmarks',
        speed: 'Speed Challenge'
    };

    const displayName = activityNames[type] || type;

    if (activityIndex > 0) {
        if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
            if (window.BroProAuth) {
                BroProAuth.showLoginRequired(`Login to unlock "${displayName}" and all other activities!`);
            } else {
                alert('Please login to access this activity!');
            }
            return;
        }

        if (window.BroProPremium && !BroProPremium.isPremium()) {
            BroProPremium.showPremiumRequired(displayName);
            return;
        }
    }

    switch (type) {
        case 'worldmap': openMap(); break;
        case 'countries': startQuiz('countries'); break;
        case 'continents': startQuiz('continents'); break;
        case 'coordinates': startQuiz('coordinates'); break;
        case 'landmarks': startQuiz('landmarks'); break;
        case 'speed': startQuiz('speed'); break;
    }
}

// ============================================
// QUIZ SYSTEM
// ============================================
function startQuiz(mode) {
    quizState.mode = mode;
    quizState.currentIndex = 0;
    quizState.score = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = [];

    switch (mode) {
        case 'countries':
            quizState.questions = generateCountryQuestions();
            document.getElementById('quizMode').textContent = '🏳️ Countries & Flags Quiz';
            break;
        case 'continents':
            quizState.questions = generateContinentQuestions();
            document.getElementById('quizMode').textContent = '🌐 Continents & Oceans Quiz';
            break;
        case 'landmarks':
            quizState.questions = generateLandmarkQuestions();
            document.getElementById('quizMode').textContent = '🏛️ Famous Landmarks Quiz';
            break;
        case 'speed':
            quizState.questions = generateSpeedQuestions();
            document.getElementById('quizMode').textContent = '⚡ Speed Challenge';
            break;
        default:
            quizState.questions = generateCountryQuestions();
    }

    document.getElementById('totalQ').textContent = quizState.questions.length;
    document.getElementById('quizModal').classList.add('active');
    loadQuestion();
}

function generateCountryQuestions() {
    const questions = [];
    const countries = shuffleArray([...geoData.countries]).slice(0, 10);

    countries.forEach(country => {
        const others = geoData.countries.filter(c => c.name !== country.name);
        const options = shuffleArray([
            country.name,
            ...shuffleArray(others).slice(0, 3).map(c => c.name)
        ]);

        questions.push({
            visual: country.flag,
            text: 'Which country does this flag belong to? (यह झंडा किस देश का है?)',
            options: options,
            correct: country.name,
            xp: 15
        });
    });

    return questions;
}

function generateContinentQuestions() {
    const questions = [];

    geoData.continents.forEach(continent => {
        const wrongOptions = geoData.continents
            .filter(c => c.name !== continent.name)
            .map(c => c.name);
        const selectedWrong = shuffleArray(wrongOptions).slice(0, 3);
        const options = shuffleArray([continent.name, ...selectedWrong]);

        questions.push({
            visual: continent.emoji,
            text: `Which continent: "${continent.fact}"? (कौन सा महाद्वीप?)`,
            options: options,
            correct: continent.name,
            xp: 10
        });
    });

    geoData.oceans.forEach(ocean => {
        const wrongOptions = geoData.oceans
            .filter(o => o.name !== ocean.name)
            .map(o => o.name);
        const selectedWrong = shuffleArray(wrongOptions).slice(0, 3);
        const options = shuffleArray([ocean.name, ...selectedWrong]);

        questions.push({
            visual: ocean.emoji,
            text: `Which ocean: "${ocean.fact}"? (कौन सा महासागर?)`,
            options: options,
            correct: ocean.name,
            xp: 10
        });
    });

    return shuffleArray(questions);
}

function generateLandmarkQuestions() {
    const questions = [];
    const landmarks = shuffleArray([...geoData.landmarks]);

    landmarks.forEach(landmark => {
        questions.push({
            visual: landmark.emoji,
            text: `Where is the ${landmark.name} located? (${landmark.name} कहाँ स्थित है?)`,
            options: shuffleArray([
                landmark.country,
                ...shuffleArray(geoData.landmarks.filter(l => l.country !== landmark.country))
                    .slice(0, 3)
                    .map(l => l.country)
            ]),
            correct: landmark.country,
            xp: 15
        });
    });

    return questions;
}

function generateSpeedQuestions() {
    const countryQs = generateCountryQuestions().slice(0, 5);
    const continentQs = generateContinentQuestions().slice(0, 3);
    const landmarkQs = generateLandmarkQuestions().slice(0, 4);
    return shuffleArray([...countryQs, ...continentQs, ...landmarkQs]);
}

function loadQuestion() {
    const q = quizState.questions[quizState.currentIndex];

    document.getElementById('currentQ').textContent = quizState.currentIndex + 1;
    document.getElementById('questionVisual').textContent = q.visual;
    document.getElementById('questionText').textContent = q.text;

    const progress = (quizState.currentIndex / quizState.questions.length) * 100;
    document.getElementById('quizProgress').style.width = progress + '%';

    const shuffledOptions = shuffleArray([...q.options]);
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = shuffledOptions.map(opt => `
        <button class="option-btn" onclick="selectOption(this, '${opt.replace(/'/g, "\\'")}')">${opt}</button>
    `).join('');

    document.getElementById('feedbackDisplay').className = 'feedback-display';
    document.getElementById('scoreValue').textContent = quizState.score;
}

function selectOption(btn, answer) {
    const q = quizState.questions[quizState.currentIndex];
    const isCorrect = answer === q.correct;

    quizState.userAnswers[quizState.currentIndex] = answer;

    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.textContent === q.correct) {
            b.classList.add('correct');
        }
    });

    if (isCorrect) {
        btn.classList.add('correct');
        quizState.score++;
        quizState.xpEarned += q.xp;

        document.getElementById('feedbackDisplay').className = 'feedback-display visible correct';
        document.getElementById('feedbackIcon').textContent = '✅';
        document.getElementById('feedbackText').textContent = 'Correct! +' + q.xp + ' XP';

        if (window.BroProSounds) BroProSounds.recordCorrect();
    } else {
        btn.classList.add('wrong');

        document.getElementById('feedbackDisplay').className = 'feedback-display visible wrong';
        document.getElementById('feedbackIcon').textContent = '❌';
        document.getElementById('feedbackText').textContent = 'The answer was: ' + q.correct;

        if (window.BroProSounds) BroProSounds.recordWrong();
    }

    // Show inline explanation then advance on user click
    if (window.BroProInlineExp) {
        BroProInlineExp.show({
            question: q.text,
            answer: answer,
            correctAnswer: q.correct,
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

function endQuiz() {
    document.getElementById('quizModal').classList.remove('active');

    const total = quizState.questions.length;
    const accuracy = Math.round((quizState.score / total) * 100);

    let finalXP = quizState.xpEarned;
    let xpMessage = null;

    if (window.BroProPlayer) {
        const multiplierInfo = BroProPlayer.calculateXPMultiplier('geography', quizState.mode, accuracy);
        finalXP = Math.floor(quizState.xpEarned * multiplierInfo.multiplier);
        xpMessage = multiplierInfo.message;

        BroProPlayer.recordQuizCompletion('geography', quizState.mode, quizState.score, total);
        BroProPlayer.addXP(finalXP, 'geography');
        updateUI();
    }

    playerState.xp += finalXP;
    playerState.quizzesCompleted++;
    savePlayerState();

    document.getElementById('correctCount').textContent = quizState.score;
    document.getElementById('accuracyDisplay').textContent = accuracy + '%';
    document.getElementById('xpEarned').textContent = finalXP;

    const resultsXPElement = document.getElementById('xpEarned');
    if (xpMessage && resultsXPElement && finalXP < quizState.xpEarned) {
        resultsXPElement.innerHTML = `${finalXP} <small style="font-size:0.6em;opacity:0.7">(Practice)</small>`;
    }

    const title = accuracy >= 90 ? '🌟 Geography Master!' :
        accuracy >= 70 ? '🎉 Great Explorer!' :
            accuracy >= 50 ? '👍 Good Job!' :
                '💪 Keep Exploring!';
    document.getElementById('resultsTitle').textContent = title;

    const trophy = accuracy >= 90 ? '🏆' :
        accuracy >= 70 ? '🥈' :
            accuracy >= 50 ? '🥉' : '🌍';
    document.getElementById('resultsTrophy').textContent = trophy;

    document.getElementById('resultsModal').classList.add('active');

    if (window.BroProExplanations) {
        BroProExplanations.storeQuizResults(quizState.questions, quizState.userAnswers, 'geography', quizState.mode);
    }

    if (accuracy >= 70 && window.BroProEffects) {
        BroProEffects.confetti();
    }

    if (window.SaatCroreEasterEgg) {
        SaatCroreEasterEgg.recordPerfectQuiz(accuracy, quizState.mode);
    }

    if (window.logQuizActivity) {
        logQuizActivity('geography', finalXP, accuracy);
    }
}

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
    startQuiz(quizState.mode);
}

function closeResults() {
    document.getElementById('resultsModal').classList.remove('active');
}

// ============================================
// FACTS CAROUSEL
// ============================================
let currentFact = 0;
const facts = document.querySelectorAll('.fact-card');
const dotsContainer = document.getElementById('factsDots');

function initFactsCarousel() {
    facts.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => showFact(i);
        dotsContainer.appendChild(dot);
    });

    setInterval(() => {
        currentFact = (currentFact + 1) % facts.length;
        showFact(currentFact);
    }, 5000);
}

function showFact(index) {
    facts.forEach((f, i) => {
        f.classList.toggle('active', i === index);
    });

    document.querySelectorAll('.facts-dots .dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });

    currentFact = index;
}

// ============================================
// WORLD MAP
// ============================================
function openMap() {
    document.getElementById('mapModal').classList.add('active');

    document.querySelectorAll('.region-label').forEach(label => {
        label.onclick = () => showRegionInfo(label.textContent);
    });
}

function closeMap() {
    document.getElementById('mapModal').classList.remove('active');
}

function showRegionInfo(region) {
    const panel = document.getElementById('mapInfoPanel');

    const info = {
        'North America': { title: '🌎 North America', desc: '3 countries: Canada, USA, Mexico. Home to the Grand Canyon and Niagara Falls!' },
        'South America': { title: '🌎 South America', desc: '12 countries. Contains the Amazon Rainforest and Andes Mountains!' },
        'Europe': { title: '🌍 Europe', desc: '44 countries. Rich history with ancient Rome, Greece, and modern cultures!' },
        'Africa': { title: '🌍 Africa', desc: '54 countries. Has the Sahara Desert, Mount Kilimanjaro, and diverse wildlife!' },
        'Asia': { title: '🌏 Asia', desc: '48 countries. Largest continent with Mt. Everest and Great Wall of China!' },
        'Australia': { title: '🌏 Australia/Oceania', desc: 'Includes Australia, New Zealand, and Pacific Islands. Unique wildlife!' },
        'Antarctica': { title: '🧊 Antarctica', desc: 'No permanent population. Coldest, driest, windiest continent!' }
    };

    const regionInfo = info[region] || { title: region, desc: 'Click to learn more!' };

    panel.innerHTML = `
        <h3 class="info-title">${regionInfo.title}</h3>
        <p class="info-desc">${regionInfo.desc}</p>
    `;

    panel.style.animation = 'none';
    setTimeout(() => panel.style.animation = 'popIn 0.3s ease', 10);
}

function showContinentInfo(continentId) {
    const panel = document.getElementById('mapInfoPanel');

    const continentData = {
        'northAmerica': { title: '🌎 North America', desc: '3 major countries: Canada, USA, Mexico.', countries: 23, population: '579 million' },
        'southAmerica': { title: '🌎 South America', desc: '12 countries including Brazil and Argentina.', countries: 12, population: '430 million' },
        'europe': { title: '🌍 Europe', desc: '44 countries with rich history.', countries: 44, population: '746 million' },
        'africa': { title: '🌍 Africa', desc: '54 countries - the most of any continent!', countries: 54, population: '1.4 billion' },
        'asia': { title: '🌏 Asia', desc: 'Largest continent with 48 countries.', countries: 48, population: '4.7 billion' },
        'australia': { title: '🌏 Australia & Oceania', desc: 'Includes Australia, New Zealand, and Pacific Islands.', countries: 14, population: '45 million' },
        'antarctica': { title: '🧊 Antarctica', desc: 'No permanent population! Coldest continent.', countries: 0, population: '~1,000 researchers' }
    };

    const info = continentData[continentId];

    if (info) {
        panel.innerHTML = `
            <h3 class="info-title">${info.title}</h3>
            <p class="info-desc">${info.desc}</p>
            <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1rem;">
                <div style="text-align: center;">
                    <span style="font-size: 1.5rem; font-weight: 700; color: #4facfe;">${info.countries}</span>
                    <span style="display: block; font-size: 0.8rem; color: var(--text-tertiary);">Countries</span>
                </div>
                <div style="text-align: center;">
                    <span style="font-size: 1.5rem; font-weight: 700; color: #00f2fe;">${info.population}</span>
                    <span style="display: block; font-size: 0.8rem; color: var(--text-tertiary);">Population</span>
                </div>
            </div>
        `;

        if (window.BroProSounds) BroProSounds.play('click');
        if (window.BroProPlayer) BroProPlayer.addXP(5, 'geography');

        panel.style.animation = 'none';
        setTimeout(() => panel.style.animation = 'popIn 0.3s ease', 10);
    }
}

// Map view controls
document.querySelectorAll('.map-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    };
});

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
let currentGeoPeriod = 'alltime';

function openLeaderboard() {
    if (!window.BroProPlayer || !BroProPlayer.isLoggedIn()) {
        BroProAuth.showLoginRequired('Login to view the leaderboard and see your ranking!');
        return;
    }
    renderLeaderboard();
    document.getElementById('leaderboardModal').classList.add('active');
}

function closeLeaderboard() {
    document.getElementById('leaderboardModal').classList.remove('active');
}

function switchTab(period) {
    currentGeoPeriod = period;

    const tabs = document.querySelectorAll('#geoLeaderboardTabs .tab-btn');
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
        list.innerHTML = '<div style="text-align:center;padding:2rem;"><div style="font-size:2rem;animation:spin 1s linear infinite;">⏳</div><p>Loading...</p></div>';

        BroProLeaderboard.renderLeaderboard('leaderboardList', 'geography', {
            showDelete: false,
            limit: 20,
            period: period
        });

        BroProLeaderboard.getUserRank('geography').then(rankInfo => {
            document.getElementById('yourPosition').textContent = rankInfo.rank;
            document.getElementById('yourScore').textContent = rankInfo.xp.toLocaleString();
        });

    } else {
        const leaderboard = JSON.parse(localStorage.getItem('supersite-leaderboard-geography') || '[]');
        leaderboard.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        if (leaderboard.length === 0) {
            list.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No players yet. Start exploring to be #1!</p>';
        } else {
            list.innerHTML = leaderboard.slice(0, 10).map((player, i) => `
                <div class="leaderboard-item ${i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : ''} ${player.name === currentPlayer ? 'is-player' : ''}">
                    <span class="rank-number">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</span>
                    <span class="player-avatar">${player.avatar || '🌍'}</span>
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
