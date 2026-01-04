/* ============================================
   GEOGRAPHY EXPLORER - GAME ENGINE
   Learn About Our Amazing World!
   ============================================ */

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
        { name: 'Atlantic Ocean (अटलांटिक महासागर)', emoji: '🌊', fact: 'Second largest, separates Americas from Europe/Africa (दूसरा सबसे बड़ा, अमेरिका को यूरोप/अफ्रीका से अलग करता है)' },
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
    userAnswers: [] // Track user's answers for explanations
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerState();
    initTheme();
    initFactsCarousel();
    updateUI();
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
    document.getElementById('xpCount').textContent = playerState.xp;
}

// ============================================
// FACTS CAROUSEL
// ============================================
let currentFact = 0;
const facts = document.querySelectorAll('.fact-card');
const dotsContainer = document.getElementById('factsDots');

function initFactsCarousel() {
    // Create dots
    facts.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => showFact(i);
        dotsContainer.appendChild(dot);
    });

    // Auto rotate
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
// ACTIVITIES
// ============================================

// Activity order for access control (first one is free)
const geoActivityOrder = ['worldmap', 'countries', 'continents', 'coordinates', 'landmarks', 'speed'];

function openActivity(type) {
    // Check access - first activity is free, others need login
    const activityIndex = geoActivityOrder.indexOf(type);
    const activityNames = {
        worldmap: 'World Map Explorer',
        countries: 'Countries Quiz',
        continents: 'Continents & Oceans',
        coordinates: 'Coordinates Challenge',
        landmarks: 'Famous Landmarks',
        speed: 'Speed Challenge'
    };

    // Block access for non-first activities if not logged in OR not premium
    if (activityIndex > 0) {
        // First check if logged in
        if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
            if (window.BroProAuth) {
                BroProAuth.showLoginRequired(`Login to unlock "${activityNames[type] || type}" and all other activities!`);
            } else {
                alert('Please login to access this activity!');
            }
            return;
        }

        // Then check if premium (only for logged in users)
        if (window.BroProPremium && !BroProPremium.isPremium()) {
            BroProPremium.showPremiumRequired(activityNames[type] || type);
            return;
        }
    }

    switch (type) {
        case 'worldmap':
            openMap();
            break;
        case 'countries':
            startQuiz('countries');
            break;
        case 'continents':
            startQuiz('continents');
            break;
        case 'coordinates':
            startQuiz('coordinates');
            break;
        case 'landmarks':
            startQuiz('landmarks');
            break;
        case 'speed':
            startQuiz('speed');
            break;
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
    quizState.userAnswers = []; // Reset user answers

    // Generate questions based on mode
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
        // Flag to Country question
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

    // Continent questions
    geoData.continents.forEach(continent => {
        // Get 3 random wrong answers
        const wrongOptions = geoData.continents
            .filter(c => c.name !== continent.name)
            .map(c => c.name);
        const selectedWrong = shuffleArray(wrongOptions).slice(0, 3);

        // Combine correct answer with wrong answers and shuffle
        const options = shuffleArray([continent.name, ...selectedWrong]);

        questions.push({
            visual: continent.emoji,
            text: `Which continent: "${continent.fact}"? (कौन सा महाद्वीप?)`,
            options: options,
            correct: continent.name,
            xp: 10
        });
    });

    // Ocean questions
    geoData.oceans.forEach(ocean => {
        // Get 3 random wrong answers
        const wrongOptions = geoData.oceans
            .filter(o => o.name !== ocean.name)
            .map(o => o.name);
        const selectedWrong = shuffleArray(wrongOptions).slice(0, 3);

        // Combine correct answer with wrong answers and shuffle
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
    // Mix of all question types
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

    // Update progress
    const progress = (quizState.currentIndex / quizState.questions.length) * 100;
    document.getElementById('quizProgress').style.width = progress + '%';

    // Shuffle options for random order each time
    const shuffledOptions = shuffleArray([...q.options]);

    // Generate options
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = shuffledOptions.map(opt => `
        <button class="option-btn" onclick="selectOption(this, '${opt.replace(/'/g, "\\'")}')">${opt}</button>
    `).join('');

    // Hide feedback
    document.getElementById('feedbackDisplay').className = 'feedback-display';

    // Update score
    document.getElementById('scoreValue').textContent = quizState.score;
}

function selectOption(btn, answer) {
    const q = quizState.questions[quizState.currentIndex];
    const isCorrect = answer === q.correct;

    // Track user's answer for explanations
    quizState.userAnswers[quizState.currentIndex] = answer;

    // Disable all buttons
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

        // Play sound effect for correct answer
        if (window.BroProSounds) BroProSounds.recordCorrect();
    } else {
        btn.classList.add('wrong');

        document.getElementById('feedbackDisplay').className = 'feedback-display visible wrong';
        document.getElementById('feedbackIcon').textContent = '❌';
        document.getElementById('feedbackText').textContent = 'The answer was: ' + q.correct;

        // Play sound effect for wrong answer
        if (window.BroProSounds) BroProSounds.recordWrong();
    }

    // Move to next question
    setTimeout(() => {
        quizState.currentIndex++;

        if (quizState.currentIndex >= quizState.questions.length) {
            endQuiz();
        } else {
            loadQuestion();
        }
    }, 1500);
}

function endQuiz() {
    document.getElementById('quizModal').classList.remove('active');

    const total = quizState.questions.length;
    const accuracy = Math.round((quizState.score / total) * 100);

    // Calculate XP with mastery multiplier
    let finalXP = quizState.xpEarned;
    let xpMessage = null;

    if (window.BroProPlayer) {
        // Get XP multiplier based on mastery status
        const multiplierInfo = BroProPlayer.calculateXPMultiplier('geography', quizState.mode, accuracy);
        finalXP = Math.floor(quizState.xpEarned * multiplierInfo.multiplier);
        xpMessage = multiplierInfo.message;

        // Record this quiz completion
        BroProPlayer.recordQuizCompletion('geography', quizState.mode, quizState.score, total);

        // Add the adjusted XP
        BroProPlayer.addXP(finalXP, 'geography');
        updateUI();

        console.log(`📊 Geography Quiz Complete - Raw XP: ${quizState.xpEarned}, Multiplier: ${multiplierInfo.multiplier}, Final XP: ${finalXP}`);
    }

    // Also update local player state for local storage
    playerState.xp += finalXP;
    playerState.quizzesCompleted++;
    savePlayerState();

    // Set results
    document.getElementById('correctCount').textContent = quizState.score;
    document.getElementById('accuracyDisplay').textContent = accuracy + '%';
    document.getElementById('xpEarned').textContent = finalXP;

    // Show practice mode indicator if applicable
    const resultsXPElement = document.getElementById('xpEarned');
    if (xpMessage && resultsXPElement && finalXP < quizState.xpEarned) {
        resultsXPElement.innerHTML = `${finalXP} <small style="font-size:0.6em;opacity:0.7">(Practice)</small>`;
    }

    // Set title based on performance
    const title = accuracy >= 90 ? '🌟 Geography Master!' :
        accuracy >= 70 ? '🎉 Great Explorer!' :
            accuracy >= 50 ? '👍 Good Job!' :
                '💪 Keep Exploring!';
    document.getElementById('resultsTitle').textContent = title;

    // Set trophy
    const trophy = accuracy >= 90 ? '🏆' :
        accuracy >= 70 ? '🥈' :
            accuracy >= 50 ? '🥉' : '🌍';
    document.getElementById('resultsTrophy').textContent = trophy;

    document.getElementById('resultsModal').classList.add('active');

    // Store quiz results for explanations
    if (window.BroProExplanations) {
        BroProExplanations.storeQuizResults(quizState.questions, quizState.userAnswers, 'geography', quizState.mode);
    }

    // Fire confetti if good performance
    if (accuracy >= 70 && window.BroProEffects) {
        BroProEffects.confetti();
    }

    // 📢 Log to real-time activity feed (visible to all users)
    if (window.logQuizActivity) {
        logQuizActivity('geography', finalXP, accuracy);
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
    startQuiz(quizState.mode);
}

function closeResults() {
    document.getElementById('resultsModal').classList.remove('active');
}

// ============================================
// WORLD MAP
// ============================================
function openMap() {
    document.getElementById('mapModal').classList.add('active');

    // Set up region click handlers
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
        'North America': {
            title: '🌎 North America',
            desc: '3 countries: Canada, USA, Mexico. Home to the Grand Canyon and Niagara Falls!'
        },
        'South America': {
            title: '🌎 South America',
            desc: '12 countries. Contains the Amazon Rainforest and Andes Mountains!'
        },
        'Europe': {
            title: '🌍 Europe',
            desc: '44 countries. Rich history with ancient Rome, Greece, and modern cultures!'
        },
        'Africa': {
            title: '🌍 Africa',
            desc: '54 countries. Has the Sahara Desert, Mount Kilimanjaro, and diverse wildlife!'
        },
        'Asia': {
            title: '🌏 Asia',
            desc: '48 countries. Largest continent with Mt. Everest and Great Wall of China!'
        },
        'Australia': {
            title: '🌏 Australia/Oceania',
            desc: 'Includes Australia, New Zealand, and Pacific Islands. Unique wildlife!'
        },
        'Antarctica': {
            title: '🧊 Antarctica',
            desc: 'No permanent population. Coldest, driest, windiest continent!'
        }
    };

    const regionInfo = info[region] || { title: region, desc: 'Click to learn more!' };

    panel.innerHTML = `
        <h3 class="info-title">${regionInfo.title}</h3>
        <p class="info-desc">${regionInfo.desc}</p>
    `;

    panel.style.animation = 'none';
    setTimeout(() => panel.style.animation = 'popIn 0.3s ease', 10);
}

// Show continent info when clicking on SVG map
function showContinentInfo(continentId) {
    const panel = document.getElementById('mapInfoPanel');

    const continentData = {
        'northAmerica': {
            title: '🌎 North America',
            desc: '3 major countries: Canada, USA, Mexico. Home to the Grand Canyon, Niagara Falls, and the Rocky Mountains!',
            countries: 23,
            population: '579 million'
        },
        'southAmerica': {
            title: '🌎 South America',
            desc: '12 countries including Brazil and Argentina. Contains the Amazon Rainforest (largest rainforest) and Andes Mountains!',
            countries: 12,
            population: '430 million'
        },
        'europe': {
            title: '🌍 Europe',
            desc: '44 countries with rich history. Home to the Eiffel Tower, Big Ben, Colosseum, and diverse cultures!',
            countries: 44,
            population: '746 million'
        },
        'africa': {
            title: '🌍 Africa',
            desc: '54 countries - the most of any continent! Has the Sahara Desert, Mount Kilimanjaro, and amazing wildlife!',
            countries: 54,
            population: '1.4 billion'
        },
        'asia': {
            title: '🌏 Asia',
            desc: 'Largest continent with 48 countries. Home to Mount Everest, Great Wall of China, and Taj Mahal!',
            countries: 48,
            population: '4.7 billion'
        },
        'australia': {
            title: '🌏 Australia & Oceania',
            desc: 'Includes Australia, New Zealand, and Pacific Islands. Unique wildlife like kangaroos and koalas!',
            countries: 14,
            population: '45 million'
        },
        'antarctica': {
            title: '🧊 Antarctica',
            desc: 'No permanent population! Coldest, driest, and windiest continent. Home to penguins and scientific research stations.',
            countries: 0,
            population: '~1,000 researchers'
        }
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

        // Play sound
        if (window.BroProSounds) {
            BroProSounds.play('click');
        }

        // Award XP for exploring
        if (window.BroProPlayer) {
            BroProPlayer.addXP(5, 'geography');
        }

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
    const saved = localStorage.getItem('supersite-theme') || 'light';
    document.body.setAttribute('data-theme', saved);
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

