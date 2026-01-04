/* ============================================
   HISTORY EXPLORER - GAME ENGINE
   Learn About Our Amazing Past!
   ============================================ */

// ============================================
// HISTORY DATA - BILINGUAL (English + Hindi)
// ============================================
const historyData = {
    ancientIndia: {
        title: 'Ancient India (प्राचीन भारत)',
        emoji: '🏛️',
        xpPerQuestion: 15,
        questions: [
            { q: 'Which is the oldest civilization in India? (भारत की सबसे पुरानी सभ्यता कौन सी है?)', options: ['Indus Valley Civilization (सिंधु घाटी सभ्यता)', 'Vedic Civilization (वैदिक सभ्यता)', 'Maurya Dynasty (मौर्य वंश)', 'Gupta Dynasty (गुप्त वंश)'], answer: 'Indus Valley Civilization (सिंधु घाटी सभ्यता)' },
            { q: 'Which were the main cities of Indus Valley Civilization? (सिंधु घाटी सभ्यता के प्रमुख शहर कौन से थे?)', options: ['Delhi & Mumbai (दिल्ली और मुंबई)', 'Harappa & Mohenjo-daro (हड़प्पा और मोहनजोदड़ो)', 'Varanasi & Patna (वाराणसी और पटना)', 'Kolkata & Chennai (कोलकाता और चेन्नई)'], answer: 'Harappa & Mohenjo-daro (हड़प्पा और मोहनजोदड़ो)' },
            { q: 'Who founded the Maurya Dynasty? (मौर्य वंश की स्थापना किसने की?)', options: ['Ashoka (अशोक)', 'Chandragupta Maurya (चंद्रगुप्त मौर्य)', 'Bindusara (बिंदुसार)', 'Chanakya (चाणक्य)'], answer: 'Chandragupta Maurya (चंद्रगुप्त मौर्य)' },
            { q: 'Who wrote the Arthashastra? (अर्थशास्त्र किसने लिखा?)', options: ['Ashoka (अशोक)', 'Chanakya/Kautilya (चाणक्य/कौटिल्य)', 'Chandragupta (चंद्रगुप्त)', 'Bindusara (बिंदुसार)'], answer: 'Chanakya/Kautilya (चाणक्य/कौटिल्य)' },
            { q: 'Which king spread Buddhism? (किस राजा ने बौद्ध धर्म का प्रसार किया?)', options: ['Chandragupta (चंद्रगुप्त)', 'Ashoka the Great (अशोक महान)', 'Samudragupta (समुद्रगुप्त)', 'Harsha (हर्ष)'], answer: 'Ashoka the Great (अशोक महान)' },
            { q: 'What is the symbol on the Indian National Emblem? (भारतीय राष्ट्रीय प्रतीक पर क्या चिह्न है?)', options: ['Ashoka Chakra (अशोक चक्र)', 'Ashoka Pillar Lions (अशोक स्तंभ के शेर)', 'Taj Mahal (ताज महल)', 'Lotus (कमल)'], answer: 'Ashoka Pillar Lions (अशोक स्तंभ के शेर)' },
            { q: 'Which period is called the "Golden Age of India"? (किस काल को "भारत का स्वर्ण युग" कहा जाता है?)', options: ['Maurya Period (मौर्य काल)', 'Gupta Period (गुप्त काल)', 'Mughal Period (मुगल काल)', 'British Period (ब्रिटिश काल)'], answer: 'Gupta Period (गुप्त काल)' },
            { q: 'Who was the greatest king of the Gupta dynasty? (गुप्त वंश का सबसे महान राजा कौन था?)', options: ['Chandragupta I (चंद्रगुप्त प्रथम)', 'Samudragupta (समुद्रगुप्त)', 'Chandragupta II (चंद्रगुप्त द्वितीय)', 'Kumaragupta (कुमारगुप्त)'], answer: 'Samudragupta (समुद्रगुप्त)' },
            { q: 'Where did Lord Buddha attain enlightenment? (भगवान बुद्ध को ज्ञान कहाँ प्राप्त हुआ?)', options: ['Lumbini (लुम्बिनी)', 'Bodh Gaya (बोधगया)', 'Sarnath (सारनाथ)', 'Kushinagar (कुशीनगर)'], answer: 'Bodh Gaya (बोधगया)' },
            { q: 'Who founded Jainism? (जैन धर्म की स्थापना किसने की?)', options: ['Gautam Buddha (गौतम बुद्ध)', 'Mahavira (महावीर)', 'Ashoka (अशोक)', 'Chanakya (चाणक्य)'], answer: 'Mahavira (महावीर)' }
        ]
    },
    medievalIndia: {
        title: 'Medieval India (मध्यकालीन भारत)',
        emoji: '👑',
        xpPerQuestion: 15,
        questions: [
            { q: 'Who established the Delhi Sultanate? (दिल्ली सल्तनत की स्थापना किसने की?)', options: ['Qutub-ud-din Aibak (कुतुबुद्दीन ऐबक)', 'Muhammad Ghori (मुहम्मद गोरी)', 'Alauddin Khilji (अलाउद्दीन खिलजी)', 'Iltutmish (इल्तुतमिश)'], answer: 'Qutub-ud-din Aibak (कुतुबुद्दीन ऐबक)' },
            { q: 'Who built the Qutub Minar? (कुतुब मीनार किसने बनवाया?)', options: ['Akbar (अकबर)', 'Qutub-ud-din Aibak (कुतुबुद्दीन ऐबक)', 'Shah Jahan (शाहजहाँ)', 'Iltutmish (इल्तुतमिश)'], answer: 'Qutub-ud-din Aibak (कुतुबुद्दीन ऐबक)' },
            { q: 'Who founded the Mughal Empire in India? (भारत में मुगल साम्राज्य की स्थापना किसने की?)', options: ['Akbar (अकबर)', 'Babur (बाबर)', 'Humayun (हुमायूं)', 'Shah Jahan (शाहजहाँ)'], answer: 'Babur (बाबर)' },
            { q: 'Who built the Taj Mahal? (ताज महल किसने बनवाया?)', options: ['Akbar (अकबर)', 'Jahangir (जहांगीर)', 'Shah Jahan (शाहजहाँ)', 'Aurangzeb (औरंगजेब)'], answer: 'Shah Jahan (शाहजहाँ)' },
            { q: 'Who was called "Akbar the Great"? (किसे "अकबर महान" कहा जाता है?)', options: ['Babur (बाबर)', 'Jalaluddin Akbar (जलालुद्दीन अकबर)', 'Aurangzeb (औरंगजेब)', 'Shah Jahan (शाहजहाँ)'], answer: 'Jalaluddin Akbar (जलालुद्दीन अकबर)' },
            { q: 'Which Mughal emperor introduced Din-i-Ilahi? (किस मुगल सम्राट ने दीन-ए-इलाही चलाया?)', options: ['Babur (बाबर)', 'Akbar (अकबर)', 'Jahangir (जहांगीर)', 'Aurangzeb (औरंगजेब)'], answer: 'Akbar (अकबर)' },
            { q: 'Who was the last powerful Mughal emperor? (अंतिम शक्तिशाली मुगल सम्राट कौन था?)', options: ['Shah Jahan (शाहजहाँ)', 'Aurangzeb (औरंगजेब)', 'Bahadur Shah Zafar (बहादुर शाह जफर)', 'Jahangir (जहांगीर)'], answer: 'Aurangzeb (औरंगजेब)' },
            { q: 'Who founded the Maratha Empire? (मराठा साम्राज्य की स्थापना किसने की?)', options: ['Shivaji Maharaj (शिवाजी महाराज)', 'Bajirao I (बाजीराव प्रथम)', 'Sambhaji (संभाजी)', 'Peshwa (पेशवा)'], answer: 'Shivaji Maharaj (शिवाजी महाराज)' },
            { q: 'In which battle did Babur defeat Ibrahim Lodi? (बाबर ने इब्राहिम लोदी को किस युद्ध में हराया?)', options: ['Battle of Plassey (प्लासी का युद्ध)', 'First Battle of Panipat (पानीपत का पहला युद्ध)', 'Battle of Haldighati (हल्दीघाटी का युद्ध)', 'Battle of Talikota (तालीकोट का युद्ध)'], answer: 'First Battle of Panipat (पानीपत का पहला युद्ध)' },
            { q: 'Who built the Red Fort in Delhi? (दिल्ली में लाल किला किसने बनवाया?)', options: ['Akbar (अकबर)', 'Shah Jahan (शाहजहाँ)', 'Aurangzeb (औरंगजेब)', 'Humayun (हुमायूं)'], answer: 'Shah Jahan (शाहजहाँ)' }
        ]
    },
    modernIndia: {
        title: 'Modern India (आधुनिक भारत)',
        emoji: '🇮🇳',
        xpPerQuestion: 15,
        questions: [
            { q: 'When did India gain independence? (भारत को स्वतंत्रता कब मिली?)', options: ['15 August 1947 (15 अगस्त 1947)', '26 January 1950 (26 जनवरी 1950)', '15 August 1942 (15 अगस्त 1942)', '26 January 1947 (26 जनवरी 1947)'], answer: '15 August 1947 (15 अगस्त 1947)' },
            { q: 'Who is called the Father of the Nation? (राष्ट्रपिता किसे कहा जाता है?)', options: ['Jawaharlal Nehru (जवाहरलाल नेहरू)', 'Mahatma Gandhi (महात्मा गांधी)', 'Sardar Patel (सरदार पटेल)', 'Subhas Chandra Bose (सुभाष चंद्र बोस)'], answer: 'Mahatma Gandhi (महात्मा गांधी)' },
            { q: 'Who was the first Prime Minister of India? (भारत के पहले प्रधानमंत्री कौन थे?)', options: ['Mahatma Gandhi (महात्मा गांधी)', 'Jawaharlal Nehru (जवाहरलाल नेहरू)', 'Sardar Patel (सरदार पटेल)', 'B.R. Ambedkar (बी.आर. अंबेडकर)'], answer: 'Jawaharlal Nehru (जवाहरलाल नेहरू)' },
            { q: 'When did the Jallianwala Bagh massacre happen? (जलियांवाला बाग हत्याकांड कब हुआ?)', options: ['1919', '1920', '1942', '1947'], answer: '1919' },
            { q: 'Who gave the slogan "Do or Die"? (किसने "करो या मरो" का नारा दिया?)', options: ['Subhas Chandra Bose (सुभाष चंद्र बोस)', 'Bhagat Singh (भगत सिंह)', 'Mahatma Gandhi (महात्मा गांधी)', 'Bal Gangadhar Tilak (बाल गंगाधर तिलक)'], answer: 'Mahatma Gandhi (महात्मा गांधी)' },
            { q: 'When did the Quit India Movement start? (भारत छोड़ो आंदोलन कब शुरू हुआ?)', options: ['1940', '1942', '1944', '1946'], answer: '1942' },
            { q: 'Who founded the Indian National Army (INA)? (आजाद हिंद फौज की स्थापना किसने की?)', options: ['Mahatma Gandhi (महात्मा गांधी)', 'Subhas Chandra Bose (सुभाष चंद्र बोस)', 'Bhagat Singh (भगत सिंह)', 'Sardar Patel (सरदार पटेल)'], answer: 'Subhas Chandra Bose (सुभाष चंद्र बोस)' },
            { q: 'Who wrote the Indian Constitution? (भारतीय संविधान किसने लिखा?)', options: ['Jawaharlal Nehru (जवाहरलाल नेहरू)', 'B.R. Ambedkar (बी.आर. अंबेडकर)', 'Mahatma Gandhi (महात्मा गांधी)', 'Rajendra Prasad (राजेंद्र प्रसाद)'], answer: 'B.R. Ambedkar (बी.आर. अंबेडकर)' },
            { q: 'When did the Dandi March take place? (दांडी मार्च कब हुआ?)', options: ['1920', '1930', '1942', '1947'], answer: '1930' },
            { q: 'Who was called "Iron Man of India"? (भारत का लौह पुरुष किसे कहा जाता है?)', options: ['Jawaharlal Nehru (जवाहरलाल नेहरू)', 'Sardar Vallabhbhai Patel (सरदार वल्लभभाई पटेल)', 'B.R. Ambedkar (बी.आर. अंबेडकर)', 'Lala Lajpat Rai (लाला लाजपत राय)'], answer: 'Sardar Vallabhbhai Patel (सरदार वल्लभभाई पटेल)' }
        ]
    },
    worldHistory: {
        title: 'World History (विश्व इतिहास)',
        emoji: '🌍',
        xpPerQuestion: 15,
        questions: [
            { q: 'What is the oldest civilization in the world? (विश्व की सबसे पुरानी सभ्यता कौन सी है?)', options: ['Egyptian (मिस्र)', 'Mesopotamian (मेसोपोटामिया)', 'Indus Valley (सिंधु घाटी)', 'Chinese (चीनी)'], answer: 'Mesopotamian (मेसोपोटामिया)' },
            { q: 'Where were the pyramids built? (पिरामिड कहाँ बने?)', options: ['Greece (ग्रीस)', 'Rome (रोम)', 'Egypt (मिस्र)', 'India (भारत)'], answer: 'Egypt (मिस्र)' },
            { q: 'Who discovered America? (अमेरिका की खोज किसने की?)', options: ['Vasco da Gama (वास्को डी गामा)', 'Christopher Columbus (क्रिस्टोफर कोलंबस)', 'Ferdinand Magellan (फर्डिनेंड मैगलन)', 'Marco Polo (मार्को पोलो)'], answer: 'Christopher Columbus (क्रिस्टोफर कोलंबस)' },
            { q: 'When did the French Revolution start? (फ्रांसीसी क्रांति कब शुरू हुई?)', options: ['1776', '1789', '1799', '1815'], answer: '1789' },
            { q: 'Who was Napoleon Bonaparte? (नेपोलियन बोनापार्ट कौन था?)', options: ['British King (ब्रिटिश राजा)', 'French Emperor (फ्रांसीसी सम्राट)', 'German Leader (जर्मन नेता)', 'Russian Tsar (रूसी ज़ार)'], answer: 'French Emperor (फ्रांसीसी सम्राट)' },
            { q: 'When did American Independence happen? (अमेरिकी स्वतंत्रता कब हुई?)', options: ['1776', '1789', '1800', '1812'], answer: '1776' },
            { q: 'Who built the Great Wall of China? (चीन की महान दीवार किसने बनवाई?)', options: ['Genghis Khan (चंगेज खान)', 'Qin Shi Huang (किन शी हुआंग)', 'Mao Zedong (माओ ज़ेडोंग)', 'Kublai Khan (कुबलाई खान)'], answer: 'Qin Shi Huang (किन शी हुआंग)' },
            { q: 'What was the Renaissance? (पुनर्जागरण क्या था?)', options: ['A War (एक युद्ध)', 'Cultural Rebirth in Europe (यूरोप में सांस्कृतिक पुनर्जन्म)', 'An Empire (एक साम्राज्य)', 'A Religion (एक धर्म)'], answer: 'Cultural Rebirth in Europe (यूरोप में सांस्कृतिक पुनर्जन्म)' },
            { q: 'Who was Alexander the Great? (सिकंदर महान कौन था?)', options: ['Roman Emperor (रोमन सम्राट)', 'Greek King (ग्रीक राजा)', 'Egyptian Pharaoh (मिस्री फिरौन)', 'Persian King (फारसी राजा)'], answer: 'Greek King (ग्रीक राजा)' },
            { q: 'What was the Industrial Revolution? (औद्योगिक क्रांति क्या थी?)', options: ['Political Movement (राजनीतिक आंदोलन)', 'Shift from farming to factories (खेती से कारखानों में बदलाव)', 'Religious Reform (धार्मिक सुधार)', 'Art Movement (कला आंदोलन)'], answer: 'Shift from farming to factories (खेती से कारखानों में बदलाव)' }
        ]
    },
    worldWars: {
        title: 'World Wars (विश्व युद्ध)',
        emoji: '⚔️',
        xpPerQuestion: 15,
        questions: [
            { q: 'When did World War I start? (प्रथम विश्व युद्ध कब शुरू हुआ?)', options: ['1912', '1914', '1918', '1920'], answer: '1914' },
            { q: 'When did World War I end? (प्रथम विश्व युद्ध कब समाप्त हुआ?)', options: ['1916', '1917', '1918', '1919'], answer: '1918' },
            { q: 'What event triggered World War I? (प्रथम विश्व युद्ध का कारण क्या था?)', options: ['Pearl Harbor Attack (पर्ल हार्बर हमला)', 'Assassination of Archduke Franz Ferdinand (आर्कड्यूक फ्रांज फर्डिनेंड की हत्या)', 'Treaty of Versailles (वर्साय की संधि)', 'Russian Revolution (रूसी क्रांति)'], answer: 'Assassination of Archduke Franz Ferdinand (आर्कड्यूक फ्रांज फर्डिनेंड की हत्या)' },
            { q: 'When did World War II start? (द्वितीय विश्व युद्ध कब शुरू हुआ?)', options: ['1935', '1939', '1941', '1945'], answer: '1939' },
            { q: 'When did World War II end? (द्वितीय विश्व युद्ध कब समाप्त हुआ?)', options: ['1943', '1944', '1945', '1947'], answer: '1945' },
            { q: 'Who was Adolf Hitler? (एडोल्फ हिटलर कौन था?)', options: ['British PM (ब्रिटिश PM)', 'German Dictator (जर्मन तानाशाह)', 'Russian Leader (रूसी नेता)', 'American President (अमेरिकी राष्ट्रपति)'], answer: 'German Dictator (जर्मन तानाशाह)' },
            { q: 'On which cities were atomic bombs dropped? (किन शहरों पर परमाणु बम गिराए गए?)', options: ['Tokyo & Osaka (टोक्यो और ओसाका)', 'Hiroshima & Nagasaki (हिरोशिमा और नागासाकी)', 'Kyoto & Kobe (क्योटो और कोबे)', 'Berlin & Munich (बर्लिन और म्यूनिख)'], answer: 'Hiroshima & Nagasaki (हिरोशिमा और नागासाकी)' },
            { q: 'What was the Holocaust? (होलोकॉस्ट क्या था?)', options: ['A Treaty (एक संधि)', 'Mass genocide by Nazis (नाज़ियों द्वारा नरसंहार)', 'A Battle (एक युद्ध)', 'A Revolution (एक क्रांति)'], answer: 'Mass genocide by Nazis (नाज़ियों द्वारा नरसंहार)' },
            { q: 'When did Japan attack Pearl Harbor? (जापान ने पर्ल हार्बर पर कब हमला किया?)', options: ['1939', '1940', '1941', '1942'], answer: '1941' },
            { q: 'Who were the Allied Powers in WWII? (द्वितीय विश्व युद्ध में मित्र राष्ट्र कौन थे?)', options: ['Germany, Italy, Japan (जर्मनी, इटली, जापान)', 'USA, UK, USSR, France (अमेरिका, ब्रिटेन, USSR, फ्रांस)', 'China, India, Australia (चीन, भारत, ऑस्ट्रेलिया)', 'Spain, Portugal, Brazil (स्पेन, पुर्तगाल, ब्राज़ील)'], answer: 'USA, UK, USSR, France (अमेरिका, ब्रिटेन, USSR, फ्रांस)' }
        ]
    }
};

// Facts of the Day
const factsOfDay = [
    "The Indus Valley Civilization is one of the oldest in the world, dating back to 3300 BCE!",
    "The Arthashastra by Chanakya is one of the oldest books on statecraft and economics!",
    "The Taj Mahal took 22 years to build with 20,000 workers!",
    "India's Constitution is the longest written constitution in the world!",
    "World War II was the deadliest conflict in human history!"
];

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
// PLAYER STATE
// ============================================
let playerState = {
    xp: 0,
    quizzesCompleted: 0
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
    const saved = localStorage.getItem('supersite-history-player');
    if (saved) {
        playerState = JSON.parse(saved);
    }
}

function savePlayerState() {
    localStorage.setItem('supersite-history-player', JSON.stringify(playerState));
}

function updateUI() {
    if (window.BroProPlayer) {
        const profile = BroProPlayer.load();
        document.getElementById('xpCount').textContent = profile.xp;
    }
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
const historyActivityOrder = ['ancientIndia', 'medievalIndia', 'modernIndia', 'worldHistory', 'worldWars', 'speed'];

function openActivity(type) {
    // Check access - first activity is free, others need login
    const activityIndex = historyActivityOrder.indexOf(type);
    const activityNames = {
        ancientIndia: 'Ancient India',
        medievalIndia: 'Medieval India',
        modernIndia: 'Modern India',
        worldHistory: 'World History',
        worldWars: 'World Wars',
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

    // Start the quiz
    startQuiz(type);
}

// ============================================
// QUIZ SYSTEM
// ============================================
function startQuiz(mode) {
    if (mode === 'speed') {
        // Speed mode - mix of all questions
        quizState.questions = generateSpeedQuestions();
        document.getElementById('quizMode').textContent = '⚡ Speed Challenge';
    } else {
        const data = historyData[mode];
        if (!data) return;

        quizState.questions = shuffleArray([...data.questions]);
        document.getElementById('quizMode').textContent = data.emoji + ' ' + data.title;
    }

    quizState.mode = mode;
    quizState.currentIndex = 0;
    quizState.score = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = []; // Reset user answers

    document.getElementById('totalQ').textContent = quizState.questions.length;
    document.getElementById('quizModal').classList.add('active');

    loadQuestion();
}

function generateSpeedQuestions() {
    const allQuestions = [];
    Object.values(historyData).forEach(category => {
        allQuestions.push(...category.questions.slice(0, 3));
    });
    return shuffleArray(allQuestions).slice(0, 12);
}

function loadQuestion() {
    const q = quizState.questions[quizState.currentIndex];

    document.getElementById('currentQ').textContent = quizState.currentIndex + 1;
    document.getElementById('questionVisual').textContent = '📜';
    document.getElementById('questionText').textContent = q.q;

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
    const isCorrect = answer === q.answer;

    // Track user's answer for explanations
    quizState.userAnswers[quizState.currentIndex] = answer;

    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.textContent === q.answer) {
            b.classList.add('correct');
        }
    });

    if (isCorrect) {
        btn.classList.add('correct');
        quizState.score++;
        quizState.xpEarned += 15;

        document.getElementById('feedbackDisplay').className = 'feedback-display visible correct';
        document.getElementById('feedbackIcon').textContent = '✅';
        document.getElementById('feedbackText').textContent = 'Correct! +15 XP';

        // Play sound effect for correct answer
        if (window.BroProSounds) BroProSounds.recordCorrect();
    } else {
        btn.classList.add('wrong');

        document.getElementById('feedbackDisplay').className = 'feedback-display visible wrong';
        document.getElementById('feedbackIcon').textContent = '❌';
        document.getElementById('feedbackText').textContent = 'The answer was: ' + q.answer.split(' (')[0];

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
        const multiplierInfo = BroProPlayer.calculateXPMultiplier('history', quizState.mode, accuracy);
        finalXP = Math.floor(quizState.xpEarned * multiplierInfo.multiplier);
        xpMessage = multiplierInfo.message;

        // Record this quiz completion
        BroProPlayer.recordQuizCompletion('history', quizState.mode, quizState.score, total);

        // Add the adjusted XP
        BroProPlayer.addXP(finalXP, 'history');
        updateUI();

        console.log(`📊 History Quiz Complete - Raw XP: ${quizState.xpEarned}, Multiplier: ${multiplierInfo.multiplier}, Final XP: ${finalXP}`);
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
    const title = accuracy >= 90 ? '🌟 History Master!' :
        accuracy >= 70 ? '🎉 Great Historian!' :
            accuracy >= 50 ? '👍 Good Job!' :
                '💪 Keep Learning!';
    document.getElementById('resultsTitle').textContent = title;

    // Set trophy
    const trophy = accuracy >= 90 ? '🏆' :
        accuracy >= 70 ? '🥈' :
            accuracy >= 50 ? '🥉' : '📜';
    document.getElementById('resultsTrophy').textContent = trophy;

    document.getElementById('resultsModal').classList.add('active');

    // Store quiz results for explanations
    if (window.BroProExplanations) {
        BroProExplanations.storeQuizResults(quizState.questions, quizState.userAnswers, 'history', quizState.mode);
    }

    // Fire confetti if good performance
    if (accuracy >= 70 && window.BroProEffects) {
        BroProEffects.confetti();
    }

    // 📢 Log to real-time activity feed (visible to all users)
    if (window.logQuizActivity) {
        logQuizActivity('history', finalXP, accuracy);
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
let currentHistoryPeriod = 'alltime';

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
    currentHistoryPeriod = period;

    const tabs = document.querySelectorAll('#historyLeaderboardTabs .tab-btn');
    tabs.forEach(tab => {
        const isActive = tab.dataset.period === period;
        tab.classList.toggle('active', isActive);

        if (isActive) {
            tab.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
            tab.style.color = 'white';
            tab.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
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

        BroProLeaderboard.renderLeaderboard('leaderboardList', 'history', {
            showDelete: false,
            limit: 20,
            period: period
        });

        BroProLeaderboard.getUserRank('history').then(rankInfo => {
            document.getElementById('yourPosition').textContent = rankInfo.rank;
            document.getElementById('yourScore').textContent = rankInfo.xp.toLocaleString();
        });

    } else {
        const leaderboard = JSON.parse(localStorage.getItem('supersite-leaderboard-history') || '[]');
        leaderboard.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        if (leaderboard.length === 0) {
            list.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No players yet. Start learning to be #1!</p>';
        } else {
            list.innerHTML = leaderboard.slice(0, 10).map((player, i) => `
                <div class="leaderboard-item ${i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : ''} ${player.name === currentPlayer ? 'is-player' : ''}">
                    <span class="rank-number">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</span>
                    <span class="player-avatar">${player.avatar || '📜'}</span>
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
