/* ============================================
   SUPERSITE EXPLANATION SYSTEM
   Fun & Simple Explanations After Quiz
   ============================================ */

const BroProExplanations = {
    // Store quiz data for explanations
    quizHistory: [],
    currentExplanationIndex: 0,
    isOpen: false,
    currentLanguage: 'en', // 'en' for English, 'hi' for Hindi

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        // Create modal if it doesn't exist
        if (!document.getElementById('explanationModal')) {
            this.createModal();
        }
        console.log('📚 Explanation System Initialized');
    },

    // ============================================
    // CREATE MODAL
    // ============================================
    createModal() {
        const modal = document.createElement('div');
        modal.id = 'explanationModal';
        modal.className = 'explanation-modal';
        modal.innerHTML = `
            <div class="explanation-container">
                <button class="explanation-close" onclick="BroProExplanations.close()">✕</button>
                
                <div class="explanation-header">
                    <div class="explanation-header-content">
                        <span class="explanation-icon">📚</span>
                        <div>
                            <h2 class="explanation-title" id="expHeaderTitle">Learn From Your Answers</h2>
                            <p class="explanation-subtitle" id="expHeaderSubtitle">Simple explanations to help you understand!</p>
                        </div>
                    </div>
                    <div class="explanation-progress-bar">
                        <div class="explanation-progress-fill" id="explanationProgressFill"></div>
                    </div>
                    <div class="explanation-counter">
                        <span id="expCurrentIndex">1</span> / <span id="expTotalCount">10</span>
                    </div>
                </div>

                <div class="explanation-content" id="explanationContent">
                    <!-- Dynamically filled -->
                </div>

                <div class="explanation-nav">
                    <button class="exp-nav-btn prev" onclick="BroProExplanations.previous()" id="expPrevBtn">
                        <span>←</span> <span id="expPrevText">Previous</span>
                    </button>
                    <button class="exp-nav-btn next" onclick="BroProExplanations.next()" id="expNextBtn">
                        <span id="expNextText">Next</span> <span>→</span>
                    </button>
                </div>

                <div class="explanation-footer">
                    <button class="exp-done-btn" onclick="BroProExplanations.close()" id="expDoneBtn">
                        ✅ Done Learning!
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add styles
        this.addStyles();
    },

    // ============================================
    // STORE QUIZ RESULTS
    // ============================================
    storeQuizResults(questions, userAnswers, subject, topic) {
        this.quizHistory = questions.map((q, index) => ({
            question: q.q || q.text || q.display || 'Question',
            correctAnswer: q.answer || q.correct || q.a,
            userAnswer: userAnswers[index] || null,
            isCorrect: userAnswers[index] === (q.answer || q.correct || q.a),
            options: q.options || [],
            subject: subject,
            topic: topic,
            explanation: this.generateExplanation(q, subject, topic)
        }));
    },

    // ============================================
    // GENERATE SIMPLE EXPLANATIONS (BILINGUAL)
    // ============================================
    generateExplanation(question, subject, topic) {
        const q = question.q || question.text || question.display || '';
        const answer = question.answer || question.correct || question.a;

        // Subject-specific explanation generators
        const explanationGenerators = {
            science: () => this.generateScienceExplanation(q, answer, topic),
            geography: () => this.generateGeographyExplanation(q, answer, topic),
            history: () => this.generateHistoryExplanation(q, answer),
            english: () => this.generateEnglishExplanation(q, answer),
            hindi: () => this.generateHindiExplanation(q, answer),
            gk: () => this.generateGKExplanation(q, answer),
            math: () => this.generateMathExplanation(q, answer, topic),
            mathematics: () => this.generateMathExplanation(q, answer, topic)
        };

        const generator = explanationGenerators[subject];
        if (generator) {
            return generator();
        }

        // Default bilingual explanation
        return {
            en: {
                simple: `The correct answer is <strong>${answer}</strong>. This is an important concept to remember!`,
                funFact: '💡 Keep practicing to master this topic!',
                tip: 'Pro tip: Try to understand WHY this is the answer, not just memorize it!'
            },
            hi: {
                simple: `सही जवाब है <strong>${answer}</strong>। यह याद रखना ज़रूरी है!`,
                funFact: '💡 Practice करते रहो, expert बन जाओगे!',
                tip: 'टिप: सिर्फ रटो मत, समझो कि जवाब यही क्यों है!'
            },
            emoji: '📖'
        };
    },

    // Science explanations (Bilingual)
    generateScienceExplanation(q, answer, topic) {
        const explanations = {
            'Newton': {
                en: { simple: 'Newton discovered the three laws of motion that explain how objects move!', funFact: '🍎 Legend says Newton discovered gravity when an apple fell on his head!', tip: 'Pro tip: Use mnemonics to remember this!' },
                hi: { simple: 'न्यूटन ने गति के 3 नियम दिए जो बताते हैं चीज़ें कैसे चलती हैं!', funFact: '🍎 कहते हैं न्यूटन के सिर पर सेब गिरा तो gravity समझ आई!', tip: 'टिप: याद करने के लिए कुछ trick बनाओ!' },
                emoji: '🧪'
            },
            'force': {
                en: { simple: 'Force is a push or pull that can change an object\'s motion.', funFact: '⚡ Force = Mass × Acceleration (F = ma)', tip: 'Pro tip: Visualize forces as arrows!' },
                hi: { simple: 'बल मतलब धक्का या खिंचाव जो किसी चीज़ की गति बदल दे।', funFact: '⚡ बल = द्रव्यमान × त्वरण (F = ma)', tip: 'टिप: बलों को तीर की तरह सोचो!' },
                emoji: '💪'
            },
            'Ohm': {
                en: { simple: 'Ohm\'s Law: Voltage = Current × Resistance (V = IR)', funFact: '🔌 Georg Ohm discovered this in 1827!', tip: 'Pro tip: Remember V-I-R triangle!' },
                hi: { simple: 'ओम का नियम: Voltage = Current × Resistance (V = IR)', funFact: '🔌 ओम ने 1827 में यह खोजा!', tip: 'टिप: V-I-R triangle याद रखो!' },
                emoji: '⚡'
            },
            'Mitochondria': {
                en: { simple: 'Mitochondria converts food into energy (ATP) for the cell - like a tiny power plant!', funFact: '⚡ They have their own DNA, separate from the cell\'s nucleus!', tip: 'Pro tip: Remember - Mitochondria = Powerhouse!' },
                hi: { simple: 'माइटोकॉन्ड्रिया खाने को energy में बदलता है - जैसे एक छोटा power plant!', funFact: '⚡ इसका अपना DNA होता है!', tip: 'टिप: याद रखो - माइटोकॉन्ड्रिया = Powerhouse!' },
                emoji: '🔋'
            },
            'H₂O': {
                en: { simple: 'Water (H₂O) = 2 Hydrogen atoms + 1 Oxygen atom. Easy to remember: H-two-O!', funFact: '💧 Our body is about 60% water!', tip: 'Pro tip: Remember the chemical formula as H-two-O!' },
                hi: { simple: 'पानी (H₂O) = 2 Hydrogen + 1 Oxygen। आसान है - H-two-O!', funFact: '💧 हमारे शरीर में 60% पानी है!', tip: 'टिप: H-two-O बोलो, याद रहेगा!' },
                emoji: '💧'
            },
            'Cell': {
                en: { simple: 'Cells are the building blocks of life - every living thing is made of cells!', funFact: '🔬 Your body has about 37.2 trillion cells!', tip: 'Pro tip: Think of cells as tiny factories!' },
                hi: { simple: 'कोशिका जीवन की ईंट है - हर जीव कोशिकाओं से बना है!', funFact: '🔬 तुम्हारे शरीर में 37 ट्रिलियन से ज़्यादा cells हैं!', tip: 'टिप: Cell को छोटी factory समझो!' },
                emoji: '🦠'
            }
        };

        for (const [key, exp] of Object.entries(explanations)) {
            if (q.includes(key) || (answer && answer.toString().includes(key))) {
                return exp;
            }
        }

        return {
            en: { simple: `The answer is <strong>${answer}</strong>. Science helps us understand how the world works!`, funFact: '🔬 Science is all about asking questions and finding answers!', tip: 'Pro tip: Try to visualize the concept in your mind!' },
            hi: { simple: `जवाब है <strong>${answer}</strong>। Science से हम दुनिया को समझते हैं!`, funFact: '🔬 Science मतलब सवाल पूछो और जवाब खोजो!', tip: 'टिप: दिमाग में picture बनाओ, समझ आ जाएगा!' },
            emoji: '🧪'
        };
    },

    // Geography explanations (Bilingual)
    generateGeographyExplanation(q, answer, topic) {
        const countryFacts = {
            'India': {
                en: { funFact: '🇮🇳 India is the 7th largest country and 2nd most populous!' },
                hi: { funFact: '🇮🇳 भारत 7वां सबसे बड़ा देश और दूसरा सबसे अधिक आबादी वाला देश है!' }
            },
            'Japan': {
                en: { funFact: '🇯🇵 Japan is called the "Land of the Rising Sun"!' },
                hi: { funFact: '🇯🇵 जापान को "उगते सूरज की भूमि" कहा जाता है!' }
            },
            'Brazil': {
                en: { funFact: '🇧🇷 Brazil has the world\'s largest rainforest - the Amazon!' },
                hi: { funFact: '🇧🇷 ब्राज़ील में दुनिया का सबसे बड़ा वर्षावन है - अमेज़न!' }
            },
            'Australia': {
                en: { funFact: '🇦🇺 Australia is both a country AND a continent!' },
                hi: { funFact: '🇦🇺 ऑस्ट्रेलिया एक देश और एक महाद्वीप दोनों है!' }
            }
        };

        for (const [key, fact] of Object.entries(countryFacts)) {
            if (q.includes(key) || (answer && answer.includes(key))) {
                return {
                    en: { simple: `<strong>${answer}</strong> is the correct answer!`, funFact: fact.en.funFact, tip: 'Pro tip: Explore maps to remember locations better!' },
                    hi: { simple: `<strong>${answer}</strong> सही जवाब है!`, funFact: fact.hi.funFact, tip: 'टिप: नक़्शे देखो, जगहें याद रहेंगी!' },
                    emoji: '🌍'
                };
            }
        }

        return {
            en: { simple: `The correct answer is <strong>${answer}</strong>.`, funFact: '🌍 Geography helps us understand our amazing planet!', tip: 'Pro tip: Associate places with their unique features!' },
            hi: { simple: `सही जवाब है <strong>${answer}</strong>।`, funFact: '🌍 भूगोल से हम अपनी धरती को समझते हैं!', tip: 'टिप: हर जगह की खास बात याद करो!' },
            emoji: '🗺️'
        };
    },

    // History explanations (Bilingual)
    generateHistoryExplanation(q, answer) {
        return {
            en: { simple: `The answer is <strong>${answer}</strong>. History helps us learn from the past!`, funFact: '📜 Those who don\'t learn from history are doomed to repeat it!', tip: 'Pro tip: Create a timeline to remember historical events!' },
            hi: { simple: `जवाब है <strong>${answer}</strong>। इतिहास से हम पुरानी बातें सीखते हैं!`, funFact: '📜 जो इतिहास नहीं पढ़ते, वो गलतियाँ दोहराते हैं!', tip: 'टिप: तारीखों की लिस्ट बनाओ, याद रहेगा!' },
            emoji: '🏛️'
        };
    },

    // English explanations (Enhanced for Vocabulary)
    generateEnglishExplanation(q, answer) {
        // Complete vocabulary database with ALL quiz answer words
        const vocabularyDB = {
            // === VOCABULARY LEVEL 1 ANSWERS ===
            'joyful': { pos: 'Adjective', sentence: 'She felt <strong>joyful</strong> on her birthday.', sentenceHi: 'उसके जन्मदिन पर वह बहुत <strong>खुश</strong> थी।', synonyms: ['happy', 'cheerful'], antonyms: ['sad', 'unhappy'] },
            'large': { pos: 'Adjective', sentence: 'The elephant is a <strong>large</strong> animal.', sentenceHi: 'हाथी एक <strong>बड़ा</strong> जानवर है।', synonyms: ['big', 'huge'], antonyms: ['small', 'tiny'] },
            'quick': { pos: 'Adjective', sentence: 'Make a <strong>quick</strong> decision.', sentenceHi: '<strong>जल्दी</strong> फैसला करो।', synonyms: ['fast', 'speedy'], antonyms: ['slow', 'sluggish'] },
            'pretty': { pos: 'Adjective', sentence: 'The flowers look <strong>pretty</strong>.', sentenceHi: 'फूल बहुत <strong>सुंदर</strong> दिखते हैं।', synonyms: ['beautiful', 'lovely'], antonyms: ['ugly', 'plain'] },
            'courageous': { pos: 'Adjective', sentence: 'The <strong>courageous</strong> firefighter saved the child.', sentenceHi: '<strong>बहादुर</strong> फायरमैन ने बच्चे को बचाया।', synonyms: ['brave', 'fearless'], antonyms: ['cowardly', 'timid'] },
            'helpful': { pos: 'Adjective', sentence: 'The <strong>helpful</strong> neighbor carried our bags.', sentenceHi: '<strong>मददगार</strong> पड़ोसी ने हमारे बैग उठाए।', synonyms: ['kind', 'supportive'], antonyms: ['unhelpful', 'selfish'] },
            'neat': { pos: 'Adjective', sentence: 'Keep your room <strong>neat</strong> and tidy.', sentenceHi: 'अपना कमरा <strong>साफ़</strong> रखो।', synonyms: ['clean', 'organized'], antonyms: ['messy', 'dirty'] },
            'warm': { pos: 'Adjective', sentence: 'The fire made the room <strong>warm</strong>.', sentenceHi: 'आग से कमरा <strong>गर्म</strong> हो गया।', synonyms: ['hot', 'heated'], antonyms: ['cold', 'cool'] },
            'powerful': { pos: 'Adjective', sentence: 'The lion is a <strong>powerful</strong> animal.', sentenceHi: 'शेर एक <strong>ताकतवर</strong> जानवर है।', synonyms: ['strong', 'mighty'], antonyms: ['weak', 'feeble'] },
            'clever': { pos: 'Adjective', sentence: 'The <strong>clever</strong> fox tricked the crow.', sentenceHi: '<strong>चालाक</strong> लोमड़ी ने कौए को धोखा दिया।', synonyms: ['smart', 'intelligent'], antonyms: ['foolish', 'stupid'] },

            // === VOCABULARY LEVEL 2 ANSWERS ===
            'eager to learn': { pos: 'Phrase (Adjective)', sentence: 'The student is <strong>eager to learn</strong> new things.', sentenceHi: 'छात्र नई चीज़ें <strong>सीखने के लिए उत्सुक</strong> है।', synonyms: ['curious', 'inquisitive'], antonyms: ['bored', 'uninterested'] },
            'truthful': { pos: 'Adjective', sentence: 'A <strong>truthful</strong> person never lies.', sentenceHi: '<strong>ईमानदार</strong> इंसान झूठ नहीं बोलता।', synonyms: ['honest', 'sincere'], antonyms: ['dishonest', 'lying'] },
            'calm and waiting': { pos: 'Phrase (Adjective)', sentence: 'Be <strong>calm and waiting</strong> for your turn.', sentenceHi: 'अपनी बारी का <strong>शांति से इंतज़ार</strong> करो।', synonyms: ['patient', 'composed'], antonyms: ['impatient', 'restless'] },
            'well-mannered': { pos: 'Adjective', sentence: 'A <strong>well-mannered</strong> child respects elders.', sentenceHi: '<strong>शिष्ट</strong> बच्चा बड़ों का सम्मान करता है।', synonyms: ['polite', 'courteous'], antonyms: ['rude', 'impolite'] },
            'peaceful': { pos: 'Adjective', sentence: 'The <strong>peaceful</strong> lake was beautiful.', sentenceHi: '<strong>शांत</strong> झील बहुत खूबसूरत थी।', synonyms: ['calm', 'tranquil'], antonyms: ['noisy', 'chaotic'] },
            'giving freely': { pos: 'Phrase (Adjective)', sentence: 'A <strong>generous</strong> person gives freely.', sentenceHi: '<strong>उदार</strong> इंसान खुले दिल से देता है।', synonyms: ['generous', 'charitable'], antonyms: ['selfish', 'stingy'] },
            'well-known': { pos: 'Adjective', sentence: 'He is a <strong>well-known</strong> singer.', sentenceHi: 'वह एक <strong>प्रसिद्ध</strong> गायक है।', synonyms: ['famous', 'popular'], antonyms: ['unknown', 'obscure'] },
            'hard': { pos: 'Adjective', sentence: 'This puzzle is <strong>hard</strong> to solve.', sentenceHi: 'यह पहेली <strong>कठिन</strong> है।', synonyms: ['difficult', 'challenging'], antonyms: ['easy', 'simple'] },
            'very big': { pos: 'Phrase (Adjective)', sentence: 'The whale is <strong>very big</strong>.', sentenceHi: 'व्हेल मछली <strong>बहुत बड़ी</strong> है।', synonyms: ['enormous', 'huge'], antonyms: ['tiny', 'small'] },
            'anxious': { pos: 'Adjective', sentence: 'He felt <strong>anxious</strong> before the exam.', sentenceHi: 'परीक्षा से पहले वह <strong>चिंतित</strong> था।', synonyms: ['worried', 'nervous'], antonyms: ['calm', 'relaxed'] },

            // === SYNONYMS SECTION ANSWERS ===
            'little': { pos: 'Adjective', sentence: 'The <strong>little</strong> kitten was cute.', sentenceHi: '<strong>छोटी</strong> बिल्ली बहुत प्यारी थी।', synonyms: ['small', 'tiny'], antonyms: ['big', 'large'] },
            'nice': { pos: 'Adjective', sentence: 'She is a <strong>nice</strong> person.', sentenceHi: 'वह एक <strong>अच्छी</strong> इंसान है।', synonyms: ['good', 'pleasant'], antonyms: ['bad', 'mean'] },
            'unhappy': { pos: 'Adjective', sentence: 'He was <strong>unhappy</strong> with the result.', sentenceHi: 'वह नतीजे से <strong>दुखी</strong> था।', synonyms: ['sad', 'sorrowful'], antonyms: ['happy', 'joyful'] },
            'chilly': { pos: 'Adjective', sentence: 'The morning was <strong>chilly</strong>.', sentenceHi: 'सुबह <strong>ठंडी</strong> थी।', synonyms: ['cold', 'cool'], antonyms: ['warm', 'hot'] },
            'ancient': { pos: 'Adjective', sentence: 'The pyramids are <strong>ancient</strong>.', sentenceHi: 'पिरामिड <strong>प्राचीन</strong> हैं।', synonyms: ['old', 'antique'], antonyms: ['new', 'modern'] },
            'intelligent': { pos: 'Adjective', sentence: 'She is very <strong>intelligent</strong>.', sentenceHi: 'वह बहुत <strong>बुद्धिमान</strong> है।', synonyms: ['smart', 'clever'], antonyms: ['foolish', 'stupid'] },
            'begin': { pos: 'Verb', sentence: 'Let us <strong>begin</strong> the class.', sentenceHi: 'चलो कक्षा <strong>शुरू</strong> करते हैं।', synonyms: ['start', 'commence'], antonyms: ['end', 'finish'] },
            'furious': { pos: 'Adjective', sentence: 'He was <strong>furious</strong> at the lie.', sentenceHi: 'झूठ सुनकर वह बहुत <strong>गुस्सा</strong> था।', synonyms: ['angry', 'enraged'], antonyms: ['calm', 'peaceful'] },
            'quiet': { pos: 'Adjective', sentence: 'The library is <strong>quiet</strong>.', sentenceHi: 'पुस्तकालय <strong>शांत</strong> है।', synonyms: ['silent', 'peaceful'], antonyms: ['loud', 'noisy'] },
            'rich': { pos: 'Adjective', sentence: 'The <strong>rich</strong> man donated money.', sentenceHi: '<strong>अमीर</strong> आदमी ने पैसे दान किए।', synonyms: ['wealthy', 'affluent'], antonyms: ['poor', 'needy'] },
            'enormous': { pos: 'Adjective', sentence: 'The dinosaur was <strong>enormous</strong>.', sentenceHi: 'डायनासोर <strong>विशाल</strong> था।', synonyms: ['huge', 'massive'], antonyms: ['tiny', 'small'] },
            'exhausted': { pos: 'Adjective', sentence: 'She was <strong>exhausted</strong> after running.', sentenceHi: 'दौड़ने के बाद वह <strong>थक</strong> गई।', synonyms: ['tired', 'weary'], antonyms: ['energetic', 'fresh'] },
            'afraid': { pos: 'Adjective', sentence: 'He was <strong>afraid</strong> of the dark.', sentenceHi: 'वह अंधेरे से <strong>डरता</strong> था।', synonyms: ['scared', 'frightened'], antonyms: ['brave', 'fearless'] },

            // === ANTONYMS SECTION ANSWERS ===
            'cold': { pos: 'Adjective', sentence: 'The ice is <strong>cold</strong>.', sentenceHi: 'बर्फ <strong>ठंडी</strong> है।', synonyms: ['chilly', 'freezing'], antonyms: ['hot', 'warm'] },
            'slow': { pos: 'Adjective', sentence: 'The tortoise is <strong>slow</strong>.', sentenceHi: 'कछुआ <strong>धीमा</strong> है।', synonyms: ['sluggish', 'unhurried'], antonyms: ['fast', 'quick'] },
            'young': { pos: 'Adjective', sentence: 'The <strong>young</strong> boy played outside.', sentenceHi: '<strong>छोटा</strong> लड़का बाहर खेल रहा था।', synonyms: ['youthful', 'juvenile'], antonyms: ['old', 'aged'] },
            'night': { pos: 'Noun', sentence: 'Stars shine at <strong>night</strong>.', sentenceHi: '<strong>रात</strong> को तारे चमकते हैं।', synonyms: ['evening', 'darkness'], antonyms: ['day', 'morning'] },
            'down': { pos: 'Adverb/Preposition', sentence: 'He climbed <strong>down</strong> the tree.', sentenceHi: 'वह पेड़ से <strong>नीचे</strong> उतरा।', synonyms: ['below', 'under'], antonyms: ['up', 'above'] },
            'sad': { pos: 'Adjective', sentence: 'He was <strong>sad</strong> when his pet left.', sentenceHi: 'अपने pet के जाने पर वह <strong>दुखी</strong> था।', synonyms: ['unhappy', 'sorrowful'], antonyms: ['happy', 'joyful'] },
            'small': { pos: 'Adjective', sentence: 'An ant is a <strong>small</strong> insect.', sentenceHi: 'चींटी एक <strong>छोटा</strong> कीड़ा है।', synonyms: ['tiny', 'little'], antonyms: ['big', 'large'] },
            'bad': { pos: 'Adjective', sentence: 'Eating too much junk food is <strong>bad</strong>.', sentenceHi: 'ज़्यादा junk food खाना <strong>बुरा</strong> है।', synonyms: ['poor', 'terrible'], antonyms: ['good', 'excellent'] },
            'old': { pos: 'Adjective', sentence: 'My grandfather is <strong>old</strong>.', sentenceHi: 'मेरे दादाजी <strong>बूढ़े</strong> हैं।', synonyms: ['aged', 'elderly'], antonyms: ['young', 'new'] },
            'short': { pos: 'Adjective', sentence: 'The pencil is <strong>short</strong>.', sentenceHi: 'पेंसिल <strong>छोटी</strong> है।', synonyms: ['brief', 'small'], antonyms: ['long', 'tall'] },
            'dark': { pos: 'Adjective', sentence: 'The room was <strong>dark</strong>.', sentenceHi: 'कमरा <strong>अंधेरा</strong> था।', synonyms: ['dim', 'shadowy'], antonyms: ['light', 'bright'] },
            'cowardly': { pos: 'Adjective', sentence: 'Running away was <strong>cowardly</strong>.', sentenceHi: 'भाग जाना <strong>कायरता</strong> थी।', synonyms: ['timid', 'fearful'], antonyms: ['brave', 'courageous'] },
            'poor': { pos: 'Adjective', sentence: 'The <strong>poor</strong> family needed help.', sentenceHi: '<strong>गरीब</strong> परिवार को मदद चाहिए थी।', synonyms: ['needy', 'impoverished'], antonyms: ['rich', 'wealthy'] },
            'dirty': { pos: 'Adjective', sentence: 'His shoes were <strong>dirty</strong>.', sentenceHi: 'उसके जूते <strong>गंदे</strong> थे।', synonyms: ['unclean', 'messy'], antonyms: ['clean', 'neat'] },
            'full': { pos: 'Adjective', sentence: 'The glass is <strong>full</strong>.', sentenceHi: 'गिलास <strong>भरा</strong> है।', synonyms: ['filled', 'complete'], antonyms: ['empty', 'vacant'] },
            'foolish': { pos: 'Adjective', sentence: 'It was <strong>foolish</strong> to ignore the warning.', sentenceHi: 'चेतावनी को अनसुना करना <strong>मूर्खता</strong> थी।', synonyms: ['silly', 'stupid'], antonyms: ['wise', 'clever'] },
            'end': { pos: 'Noun/Verb', sentence: 'The story came to an <strong>end</strong>.', sentenceHi: 'कहानी <strong>खत्म</strong> हो गई।', synonyms: ['finish', 'conclusion'], antonyms: ['start', 'beginning'] },
            'hate': { pos: 'Verb', sentence: 'Do not <strong>hate</strong> anyone.', sentenceHi: 'किसी से <strong>नफरत</strong> मत करो।', synonyms: ['dislike', 'detest'], antonyms: ['love', 'adore'] },
            'difficult': { pos: 'Adjective', sentence: 'The exam was <strong>difficult</strong>.', sentenceHi: 'परीक्षा <strong>कठिन</strong> थी।', synonyms: ['hard', 'challenging'], antonyms: ['easy', 'simple'] },
            'ugly': { pos: 'Adjective', sentence: 'The monster looked <strong>ugly</strong>.', sentenceHi: 'राक्षस <strong>बदसूरत</strong> दिख रहा था।', synonyms: ['unattractive', 'hideous'], antonyms: ['beautiful', 'pretty'] },

            // === ADDITIONAL COMMON WORDS ===
            'happy': { pos: 'Adjective', sentence: 'She felt <strong>happy</strong> today.', sentenceHi: 'आज वह <strong>खुश</strong> थी।', synonyms: ['joyful', 'cheerful'], antonyms: ['sad', 'unhappy'] },
            'beautiful': { pos: 'Adjective', sentence: 'The sunset was <strong>beautiful</strong>.', sentenceHi: 'सूर्यास्त <strong>सुंदर</strong> था।', synonyms: ['gorgeous', 'lovely'], antonyms: ['ugly', 'unattractive'] },
            'big': { pos: 'Adjective', sentence: 'The elephant is a <strong>big</strong> animal.', sentenceHi: 'हाथी एक <strong>बड़ा</strong> जानवर है।', synonyms: ['large', 'huge'], antonyms: ['small', 'tiny'] },
            'fast': { pos: 'Adjective/Adverb', sentence: 'The cheetah runs very <strong>fast</strong>.', sentenceHi: 'चीता बहुत <strong>तेज़</strong> दौड़ता है।', synonyms: ['quick', 'speedy'], antonyms: ['slow', 'sluggish'] },
            'brave': { pos: 'Adjective', sentence: 'The <strong>brave</strong> soldier saved lives.', sentenceHi: '<strong>बहादुर</strong> सैनिक ने जानें बचाईं।', synonyms: ['courageous', 'fearless'], antonyms: ['cowardly', 'timid'] },
            'kind': { pos: 'Adjective', sentence: 'She is a <strong>kind</strong> person.', sentenceHi: 'वह एक <strong>दयालु</strong> इंसान है।', synonyms: ['nice', 'caring'], antonyms: ['cruel', 'mean'] },
            'strong': { pos: 'Adjective', sentence: 'The athlete is very <strong>strong</strong>.', sentenceHi: 'खिलाड़ी बहुत <strong>ताकतवर</strong> है।', synonyms: ['powerful', 'mighty'], antonyms: ['weak', 'feeble'] },
            'smart': { pos: 'Adjective', sentence: 'The <strong>smart</strong> student won the quiz.', sentenceHi: '<strong>होशियार</strong> छात्र ने quiz जीता।', synonyms: ['clever', 'intelligent'], antonyms: ['foolish', 'stupid'] },
            'honest': { pos: 'Adjective', sentence: 'An <strong>honest</strong> person tells truth.', sentenceHi: '<strong>ईमानदार</strong> इंसान सच बोलता है।', synonyms: ['truthful', 'sincere'], antonyms: ['dishonest', 'lying'] },
            'generous': { pos: 'Adjective', sentence: 'The <strong>generous</strong> man helped others.', sentenceHi: '<strong>उदार</strong> आदमी ने दूसरों की मदद की।', synonyms: ['kind', 'charitable'], antonyms: ['selfish', 'stingy'] },

            // === VOCABULARY LEVEL 4 ANSWERS ===
            'attack': { actualWord: 'Assault', pos: 'Verb', sentence: 'A group of bad boys tried to <strong>assault</strong> Shivansh in the market, but he ran away.', sentenceHi: 'कुछ बुरे लड़कों ने बाज़ार में Shivansh पर <strong>हमला</strong> करने की कोशिश की, लेकिन वह भाग गया।', synonyms: ['hit', 'strike'], antonyms: ['protect', 'save'] },
            'crash': { actualWord: 'Collision', pos: 'Noun', sentence: 'Yash was riding his bike too fast and had a <strong>collision</strong> with a wall.', sentenceHi: 'Yash अपनी बाइक बहुत तेज़ चला रहा था और दीवार से <strong>टक्कर</strong> हो गई।', synonyms: ['bang', 'impact'], antonyms: ['miss', 'avoid'] },
            'livestock/cows': { actualWord: 'Cattle', pos: 'Noun', sentence: 'Hari Kishan takes his <strong>cattle</strong> to the farm every morning for grazing.', sentenceHi: 'Hari Kishan हर सुबह अपने <strong>मवेशी</strong> को चराने के लिए खेत ले जाते हैं।', synonyms: ['cows', 'buffaloes'], antonyms: ['wild animals'] },
            'no longer existing': { actualWord: 'Extinct', pos: 'Adjective', sentence: 'Stuti learned in science class that Dinosaurs are now <strong>extinct</strong>.', sentenceHi: 'Stuti ने science की class में सीखा कि Dinosaurs अब <strong>विलुप्त</strong> हो गए हैं।', synonyms: ['gone', 'dead'], antonyms: ['alive', 'living'] },
            'sufferer': { actualWord: 'Victim', pos: 'Noun', sentence: 'Khushboo felt sad for the <strong>victim</strong> who lost his phone in the fair.', sentenceHi: 'Khushboo को उस <strong>पीड़ित</strong> के लिए दुख हुआ जिसका मेले में फोन खो गया।', synonyms: ['injured person', 'sufferer'], antonyms: ['attacker', 'thief'] },
            'tempt': { actualWord: 'Lure', pos: 'Verb', sentence: 'Vivek tried to <strong>lure</strong> the stray dog with a packet of biscuits.', sentenceHi: 'Vivek ने एक पैकेट बिस्किट से आवारा कुत्ते को <strong>ललचाने</strong> की कोशिश की।', synonyms: ['attract', 'entice'], antonyms: ['scare away', 'warn'] },
            'thick mist': { actualWord: 'Fog', pos: 'Noun', sentence: 'Sakshi was late for class because the bus drove slowly in the heavy <strong>fog</strong>.', sentenceHi: 'Sakshi class के लिए देर हो गई क्योंकि बस घने <strong>कोहरे</strong> में धीरे चल रही थी।', synonyms: ['mist', 'haze'], antonyms: ['clear sky', 'sunlight'] },
            'place of suffering': { actualWord: 'Hell', pos: 'Noun', sentence: '"This summer heat without a fan feels like <strong>hell</strong>," complained Aniket Kumar.', sentenceHi: '"पंखे के बिना यह गर्मी <strong>नरक</strong> जैसी लगती है," Aniket Kumar ने शिकायत की।', synonyms: ['nightmare', 'misery'], antonyms: ['heaven', 'fun'] },
            'empty inside': { actualWord: 'Hollow', pos: 'Adjective', sentence: 'Shlok Nishad found a <strong>hollow</strong> bamboo stick to make a flute.', sentenceHi: 'Shlok Nishad को बांसुरी बनाने के लिए एक <strong>खोखली</strong> बांस की छड़ी मिली।', synonyms: ['empty', 'vacant'], antonyms: ['solid', 'full'] },
            'payment for loss': { actualWord: 'Compensation', pos: 'Noun', sentence: 'Suraj Yadav asked for <strong>compensation</strong> when his cricket ball broke the window.', sentenceHi: 'Suraj Yadav ने <strong>मुआवजा</strong> माँगा जब उसकी cricket ball से खिड़की टूट गई।', synonyms: ['repayment', 'refund'], antonyms: ['penalty', 'fine'] }
        };

        // Extract English word from answer like "Joyful (खुश)" -> "joyful"
        let englishWord = answer ? answer.toString() : '';

        // Remove Hindi part in parentheses and clean up
        englishWord = englishWord.replace(/\s*\([^)]*\)\s*/g, '').trim().toLowerCase();

        // Try to find the word in database
        const wordInfo = vocabularyDB[englishWord];

        if (wordInfo) {
            // Rich vocabulary explanation - Use actualWord if available, otherwise capitalize englishWord
            const displayWord = wordInfo.actualWord || (englishWord.charAt(0).toUpperCase() + englishWord.slice(1));

            // Hindi sentence - use sentenceHi if available, otherwise use English
            const hiSentence = wordInfo.sentenceHi || wordInfo.sentence;

            return {
                en: {
                    simple: `<strong>${displayWord}</strong> is a <span style="color:#60a5fa;">${wordInfo.pos}</span>.<br><br>` +
                        `📝 <strong>Sentence:</strong> ${wordInfo.sentence}<br><br>` +
                        `✅ <strong>Synonyms:</strong> ${wordInfo.synonyms.join(', ')}<br>` +
                        `❌ <strong>Antonyms:</strong> ${wordInfo.antonyms.join(', ')}`,
                    funFact: '📚 Learning synonyms & antonyms helps you express better!',
                    tip: 'Pro tip: Use new words in your daily conversations!'
                },
                hi: {
                    simple: `<strong>${displayWord}</strong> एक <span style="color:#60a5fa;">${wordInfo.pos}</span> है।<br><br>` +
                        `📝 <strong>वाक्य:</strong> ${hiSentence}<br><br>` +
                        `✅ <strong>समानार्थी (Synonyms):</strong> ${wordInfo.synonyms.join(', ')}<br>` +
                        `❌ <strong>विलोम (Antonyms):</strong> ${wordInfo.antonyms.join(', ')}`,
                    funFact: '📚 Synonyms और Antonyms सीखो, बेहतर बोल पाओगे!',
                    tip: 'टिप: नए शब्द रोज़ की बातचीत में इस्तेमाल करो!'
                },
                emoji: '📖'
            };
        }

        // Default English explanation
        return {
            en: {
                simple: `The correct answer is <strong>${answer}</strong>.`,
                funFact: '📚 English has over 170,000 words in current use!',
                tip: 'Pro tip: Reading more helps improve vocabulary naturally!'
            },
            hi: {
                simple: `सही जवाब है <strong>${answer}</strong>।`,
                funFact: '📚 English में 1 लाख 70 हज़ार से ज़्यादा शब्द हैं!',
                tip: 'टिप: ज़्यादा पढ़ोगे तो शब्द खुद याद हो जाएंगे!'
            },
            emoji: '📖'
        };
    },

    // Hindi explanations (Already in Hindi, add English translation)
    generateHindiExplanation(q, answer) {
        return {
            en: { simple: `The correct answer is <strong>${answer}</strong>`, funFact: '📚 Hindi is the 4th most spoken language in the world!', tip: 'Pro tip: Reading more increases vocabulary!' },
            hi: { simple: `सही जवाब है <strong>${answer}</strong>`, funFact: '📚 हिंदी दुनिया में चौथी सबसे ज़्यादा बोली जाने वाली भाषा है!', tip: 'टिप: ज़्यादा पढ़ने से शब्द याद होते हैं!' },
            emoji: '📖'
        };
    },

    // GK explanations (Bilingual)
    generateGKExplanation(q, answer) {
        return {
            en: { simple: `The answer is <strong>${answer}</strong>. Great general knowledge fact!`, funFact: '💡 Learning new facts every day makes you smarter!', tip: 'Pro tip: Quiz yourself daily to retain information!' },
            hi: { simple: `जवाब है <strong>${answer}</strong>। बढ़िया GK है!`, funFact: '💡 रोज़ कुछ नया सीखो, तो दिमाग तेज़ होता है!', tip: 'टिप: रोज़ खुद से सवाल पूछो, याद रहेगा!' },
            emoji: '🧠'
        };
    },

    // Math explanations (Bilingual)
    generateMathExplanation(q, answer, topic) {
        const mathExplanations = {
            'square': {
                en: { simple: 'Squaring a number means multiplying it by itself! n² = n × n', funFact: '🔢 Perfect squares: 1, 4, 9, 16, 25, 36...', tip: 'Pro tip: Practice makes perfect in math!' },
                hi: { simple: 'वर्ग मतलब संख्या को खुद से गुणा करो! n² = n × n', funFact: '🔢 पूर्ण वर्ग: 1, 4, 9, 16, 25, 36...', tip: 'टिप: Practice करो, मैथ आसान हो जाएगी!' },
                emoji: '📐'
            },
            'cube': {
                en: { simple: 'Cubing means multiplying a number by itself THREE times! n³ = n × n × n', funFact: '📦 Volume of a cube with side n = n³', tip: 'Pro tip: Visualize a 3D cube!' },
                hi: { simple: 'घन मतलब संख्या को तीन बार खुद से गुणा करो! n³ = n × n × n', funFact: '📦 n भुजा वाले घन का आयतन = n³', tip: 'टिप: एक डब्बा सोचो 3D में!' },
                emoji: '📦'
            },
            'table': {
                en: { simple: 'Times tables are shortcuts for addition! 5×4 = 5+5+5+5 = 20', funFact: '🧮 Ancient Babylonians used times tables 4000 years ago!', tip: 'Pro tip: Practice tables daily!' },
                hi: { simple: 'पहाड़े जोड़ के shortcut हैं! 5×4 = 5+5+5+5 = 20', funFact: '🧮 4000 साल पहले भी लोग पहाड़े इस्तेमाल करते थे!', tip: 'टिप: रोज़ पहाड़े बोलो!' },
                emoji: '✖️'
            },
            'formula': {
                en: { simple: 'Formulas are mathematical shortcuts that save time!', funFact: '📐 Formulas help solve complex problems quickly!', tip: 'Pro tip: Understand the formula, don\'t just memorize!' },
                hi: { simple: 'Formula मतलब मैथ का shortcut जो time बचाता है!', funFact: '📐 Formula से मुश्किल सवाल जल्दी हल होते हैं!', tip: 'टिप: Formula समझो, सिर्फ रटो मत!' },
                emoji: '🔢'
            }
        };

        for (const [key, exp] of Object.entries(mathExplanations)) {
            if (q.toLowerCase().includes(key) || (topic && topic.toLowerCase().includes(key))) {
                return exp;
            }
        }

        return {
            en: { simple: `The answer is <strong>${answer}</strong>. Math is the language of the universe!`, funFact: '🔢 Math patterns are found everywhere in nature!', tip: 'Pro tip: Break complex problems into smaller steps!' },
            hi: { simple: `जवाब है <strong>${answer}</strong>। मैथ हर जगह काम आती है!`, funFact: '🔢 मैथ के pattern हर जगह मिलते हैं - पत्तों में, फूलों में!', tip: 'टिप: बड़े सवाल को छोटे-छोटे में तोड़ो!' },
            emoji: '🧮'
        };
    },

    // ============================================
    // OPEN EXPLANATIONS
    // ============================================
    open() {
        if (this.quizHistory.length === 0) {
            console.log('No quiz history to show explanations');
            return;
        }

        this.currentExplanationIndex = 0;
        this.renderExplanation();

        const modal = document.getElementById('explanationModal');
        if (modal) {
            modal.classList.add('active');
            this.isOpen = true;

            // Play sound
            if (window.BroProSounds) {
                BroProSounds.play('click');
            }
        }
    },

    // ============================================
    // SET LANGUAGE
    // ============================================
    setLanguage(lang) {
        this.currentLanguage = lang;
        this.renderExplanation(); // Only re-render to update explanation box content

        // Play sound
        if (window.BroProSounds) {
            BroProSounds.play('click');
        }
    },

    // ============================================
    // RENDER EXPLANATION (BILINGUAL)
    // ============================================
    renderExplanation() {
        const content = document.getElementById('explanationContent');
        const item = this.quizHistory[this.currentExplanationIndex];
        const lang = this.currentLanguage;

        if (!content || !item) return;

        const statusClass = item.isCorrect ? 'correct' : 'wrong';
        const statusIcon = item.isCorrect ? '✅' : '❌';

        // Status text - always in English
        const statusText = item.isCorrect ? 'You got it right!' : 'Let\'s learn this!';

        // All labels stay in English
        const questionLabel = 'Question:';
        const yourAnswerLabel = 'Your Answer:';
        const correctAnswerLabel = 'Correct Answer:';
        const notAnswered = 'Not answered';
        const expLabel = 'Simple Explanation:';

        // Get bilingual explanation content - ONLY this gets translated
        const exp = item.explanation;
        const expContent = exp[lang] || exp.en || exp; // Fallback to English or flat structure
        const simple = expContent.simple || exp.simple || '';
        const funFact = expContent.funFact || exp.funFact || '';
        const tip = expContent.tip || exp.tip || '';
        const emoji = exp.emoji || '📖';

        content.innerHTML = `
            <div class="explanation-card ${statusClass}">
                <div class="exp-status-badge ${statusClass}">
                    <span class="exp-status-icon">${statusIcon}</span>
                    <span class="exp-status-text">${statusText}</span>
                </div>

                <div class="exp-question-box">
                    <span class="exp-q-label">${questionLabel}</span>
                    <p class="exp-question-text">${item.question}</p>
                </div>

                <div class="exp-answers-section">
                    ${!item.isCorrect ? `
                        <div class="exp-answer wrong-answer">
                            <span class="answer-label">${yourAnswerLabel}</span>
                            <span class="answer-value">${item.userAnswer || notAnswered}</span>
                            <span class="answer-icon">❌</span>
                        </div>
                    ` : ''}
                    <div class="exp-answer correct-answer">
                        <span class="answer-label">${correctAnswerLabel}</span>
                        <span class="answer-value">${item.correctAnswer}</span>
                        <span class="answer-icon">✅</span>
                    </div>
                </div>

                <div class="exp-explanation-box">
                    <div class="exp-explanation-header">
                        <div class="exp-header-left">
                            <span class="exp-emoji">${emoji}</span>
                            <span class="exp-label">${expLabel}</span>
                        </div>
                        <div class="exp-language-toggle" id="expLanguageToggle">
                            <button class="lang-btn ${lang === 'hi' ? 'active' : ''}" data-lang="hi" onclick="BroProExplanations.setLanguage('hi')">
                                <span class="lang-text">हिं</span>
                            </button>
                            <button class="lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en" onclick="BroProExplanations.setLanguage('en')">
                                <span class="lang-text">En</span>
                            </button>
                        </div>
                    </div>
                    <p class="exp-simple-text">${simple}</p>
                    
                    <div class="exp-funfact-box">
                        <span class="funfact-icon">💡</span>
                        <span class="funfact-text">${funFact}</span>
                    </div>

                    <div class="exp-tip-box">
                        <span class="tip-icon">🎯</span>
                        <span class="tip-text">${tip}</span>
                    </div>
                </div>
            </div>
        `;

        // Update progress
        this.updateProgress();
        this.updateNavButtons();
    },

    // ============================================
    // NAVIGATION
    // ============================================
    next() {
        if (this.currentExplanationIndex < this.quizHistory.length - 1) {
            this.currentExplanationIndex++;
            this.renderExplanation();
            if (window.BroProSounds) BroProSounds.play('click');
        }
    },

    previous() {
        if (this.currentExplanationIndex > 0) {
            this.currentExplanationIndex--;
            this.renderExplanation();
            if (window.BroProSounds) BroProSounds.play('click');
        }
    },

    updateProgress() {
        const fill = document.getElementById('explanationProgressFill');
        const current = document.getElementById('expCurrentIndex');
        const total = document.getElementById('expTotalCount');

        if (fill) {
            const progress = ((this.currentExplanationIndex + 1) / this.quizHistory.length) * 100;
            fill.style.width = progress + '%';
        }
        if (current) current.textContent = this.currentExplanationIndex + 1;
        if (total) total.textContent = this.quizHistory.length;
    },

    updateNavButtons() {
        const prevBtn = document.getElementById('expPrevBtn');
        const nextBtn = document.getElementById('expNextBtn');

        if (prevBtn) prevBtn.disabled = this.currentExplanationIndex === 0;
        if (nextBtn) nextBtn.disabled = this.currentExplanationIndex === this.quizHistory.length - 1;
    },

    // ============================================
    // CLOSE
    // ============================================
    close() {
        const modal = document.getElementById('explanationModal');
        if (modal) {
            modal.classList.remove('active');
            this.isOpen = false;
            if (window.BroProSounds) BroProSounds.play('click');
        }
    },

    // ============================================
    // ADD STYLES
    // ============================================
    addStyles() {
        if (document.getElementById('explanation-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'explanation-styles';
        styles.textContent = `
            /* Explanation Modal */
            .explanation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 30, 0.95);
                backdrop-filter: blur(20px);
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                box-sizing: border-box;
            }

            .explanation-modal.active {
                display: flex;
                animation: expFadeIn 0.4s ease;
            }

            @keyframes expFadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }

            .explanation-container {
                position: relative;
                background: linear-gradient(145deg, #1a1a2e, #16213e);
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 24px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
            }

            .explanation-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
                transition: all 0.3s;
                z-index: 10;
            }

            .explanation-close:hover {
                background: rgba(239, 68, 68, 0.8);
                transform: scale(1.1);
            }

            /* Language Toggle - Inside Explanation Box */
            .exp-language-toggle {
                display: flex;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 20px;
                padding: 3px;
                border: 1px solid rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(10px);
                flex-shrink: 0;
            }

            .exp-language-toggle .lang-btn {
                width: 36px;
                height: 28px;
                border: none;
                border-radius: 16px;
                background: transparent;
                color: rgba(255, 255, 255, 0.6);
                font-size: 0.75rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .exp-language-toggle .lang-btn:hover {
                color: white;
            }

            .exp-language-toggle .lang-btn.active {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                box-shadow: 0 3px 10px rgba(102, 126, 234, 0.4);
            }

            .exp-language-toggle .lang-text {
                font-family: 'Outfit', 'Noto Sans Devanagari', sans-serif;
            }

            /* Header */
            .explanation-header {
                background: linear-gradient(135deg, #667eea, #764ba2);
                padding: 1.5rem;
                text-align: center;
                position: relative;
            }

            .explanation-header-content {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .explanation-icon {
                font-size: 2.5rem;
                animation: bounce 2s infinite;
            }

            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            .explanation-title {
                color: white;
                font-size: 1.5rem;
                margin: 0;
                font-weight: 700;
            }

            .explanation-subtitle {
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
                margin: 0;
            }

            .explanation-progress-bar {
                background: rgba(255, 255, 255, 0.2);
                height: 6px;
                border-radius: 3px;
                overflow: hidden;
                margin-top: 1rem;
            }

            .explanation-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #4ade80, #22d3ee);
                border-radius: 3px;
                transition: width 0.3s ease;
            }

            .explanation-counter {
                color: rgba(255, 255, 255, 0.9);
                font-size: 0.85rem;
                margin-top: 0.5rem;
                font-weight: 600;
            }

            /* Content */
            .explanation-content {
                flex: 1;
                overflow-y: auto;
                padding: 1.5rem;
            }

            .explanation-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                padding: 1.5rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .explanation-card.correct {
                border-color: rgba(34, 197, 94, 0.3);
                background: linear-gradient(145deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.05));
            }

            .explanation-card.wrong {
                border-color: rgba(239, 68, 68, 0.3);
                background: linear-gradient(145deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05));
            }

            /* Status Badge */
            .exp-status-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-weight: 600;
                margin-bottom: 1rem;
            }

            .exp-status-badge.correct {
                background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
                color: #4ade80;
            }

            .exp-status-badge.wrong {
                background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
                color: #f87171;
            }

            .exp-status-icon {
                font-size: 1.25rem;
            }

            /* Question Box */
            .exp-question-box {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 1rem;
            }

            .exp-q-label {
                color: rgba(255, 255, 255, 0.5);
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .exp-question-text {
                color: white;
                font-size: 1.1rem;
                margin: 0.5rem 0 0;
                line-height: 1.5;
            }

            /* Answers Section */
            .exp-answers-section {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
            }

            .exp-answer {
                display: flex;
                align-items: center;
                padding: 0.75rem 1rem;
                border-radius: 12px;
                gap: 0.75rem;
            }

            .exp-answer.wrong-answer {
                background: rgba(239, 68, 68, 0.15);
                border: 1px solid rgba(239, 68, 68, 0.3);
            }

            .exp-answer.correct-answer {
                background: rgba(34, 197, 94, 0.15);
                border: 1px solid rgba(34, 197, 94, 0.3);
            }

            .answer-label {
                color: rgba(255, 255, 255, 0.6);
                font-size: 0.8rem;
                flex-shrink: 0;
            }

            .answer-value {
                flex: 1;
                color: white;
                font-weight: 600;
            }

            .answer-icon {
                font-size: 1.25rem;
            }

            /* Explanation Box */
            .exp-explanation-box {
                background: linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.05));
                border: 1px solid rgba(139, 92, 246, 0.2);
                border-radius: 16px;
                padding: 1.25rem;
            }

            .exp-explanation-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 0.5rem;
                margin-bottom: 0.75rem;
            }

            .exp-header-left {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .exp-emoji {
                font-size: 1.5rem;
            }

            .exp-label {
                color: #a78bfa;
                font-weight: 600;
                font-size: 0.9rem;
            }

            .exp-simple-text {
                color: white;
                font-size: 1rem;
                line-height: 1.6;
                margin: 0 0 1rem;
            }

            .exp-simple-text strong {
                color: #4ade80;
            }

            /* Fun Fact Box */
            .exp-funfact-box {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                background: rgba(234, 179, 8, 0.1);
                border: 1px solid rgba(234, 179, 8, 0.2);
                border-radius: 12px;
                padding: 0.875rem;
                margin-bottom: 0.75rem;
            }

            .funfact-icon {
                font-size: 1.25rem;
                flex-shrink: 0;
            }

            .funfact-text {
                color: #fde047;
                font-size: 0.9rem;
                line-height: 1.5;
            }

            /* Tip Box */
            .exp-tip-box {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                background: rgba(34, 211, 238, 0.1);
                border: 1px solid rgba(34, 211, 238, 0.2);
                border-radius: 12px;
                padding: 0.875rem;
            }

            .tip-icon {
                font-size: 1.25rem;
                flex-shrink: 0;
            }

            .tip-text {
                color: #22d3ee;
                font-size: 0.85rem;
                line-height: 1.5;
            }

            /* Navigation */
            .explanation-nav {
                display: flex;
                gap: 1rem;
                padding: 1rem 1.5rem;
                background: rgba(0, 0, 0, 0.2);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }

            .exp-nav-btn {
                flex: 1;
                padding: 0.875rem 1.25rem;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(255, 255, 255, 0.05);
                color: white;
                font-weight: 600;
                font-size: 0.95rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                transition: all 0.3s;
            }

            .exp-nav-btn:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }

            .exp-nav-btn:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }

            .exp-nav-btn.next {
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-color: transparent;
            }

            .exp-nav-btn.next:hover:not(:disabled) {
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
            }

            /* Footer */
            .explanation-footer {
                padding: 1rem 1.5rem;
                text-align: center;
            }

            .exp-done-btn {
                padding: 1rem 2rem;
                border-radius: 12px;
                border: none;
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
                font-weight: 700;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s;
            }

            .exp-done-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
            }

            /* Mobile Responsive */
            @media (max-width: 600px) {
                .explanation-container {
                    max-height: 95vh;
                    border-radius: 20px;
                }

                .explanation-header {
                    padding: 1rem;
                }

                .explanation-header-content {
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .explanation-icon {
                    font-size: 2rem;
                }

                .explanation-title {
                    font-size: 1.25rem;
                }

                .explanation-content {
                    padding: 1rem;
                }

                .explanation-card {
                    padding: 1rem;
                }

                .exp-question-text {
                    font-size: 1rem;
                }

                .explanation-nav {
                    padding: 0.875rem 1rem;
                }

                .exp-nav-btn {
                    padding: 0.75rem 1rem;
                    font-size: 0.875rem;
                }
            }
        `;
        document.head.appendChild(styles);
    }
};

// Export to window for global access
window.BroProExplanations = BroProExplanations;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    BroProExplanations.init();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
    BroProExplanations.init();
}
