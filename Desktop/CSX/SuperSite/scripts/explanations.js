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

        // ── PRIORITY 1: Use question-level explanation if provided ──
        // Parses structured 🔬 English / 📘 Hindi bilingual format
        if (question.explanation && typeof question.explanation === 'string' && question.explanation.trim().length > 0) {
            const raw = question.explanation;
            const enMarker = raw.indexOf('🔬');
            const hiMarker = raw.indexOf('📘');

            if (enMarker !== -1 && hiMarker !== -1) {
                // Extract and clean English / Hindi sections
                let enText = raw.substring(enMarker, hiMarker).replace(/^🔬\s*/, '').trim();
                let hiText = raw.substring(hiMarker).replace(/^📘\s*/, '').trim();

                return {
                    en: {
                        simple: enText,
                        funFact: `🔬 Correct Answer: <strong>${answer}</strong>`,
                        tip: ''
                    },
                    hi: {
                        simple: hiText,
                        funFact: `🔬 सही उत्तर: <strong>${answer}</strong>`,
                        tip: ''
                    },
                    emoji: '🧪'
                };
            }

            // Fallback: non-structured but present explanation
            return {
                en: {
                    simple: raw,
                    funFact: `✅ Answer: <strong>${answer}</strong>`,
                    tip: ''
                },
                hi: {
                    simple: raw,
                    funFact: `✅ उत्तर: <strong>${answer}</strong>`,
                    tip: ''
                },
                emoji: '📖'
            };
        }

        // ── PRIORITY 2: Subject-specific explanation generators ──
        const explanationGenerators = {
            science: () => this.generateScienceExplanation(q, answer, topic),
            geography: () => this.generateGeographyExplanation(q, answer, topic),
            history: () => this.generateHistoryExplanation(q, answer),
            english: () => this.generateEnglishExplanation(q, answer),
            hindi: () => this.generateHindiExplanation(q, answer),
            gk: () => this.generateGKExplanation(q, answer, topic),
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
            },
            // === CLASS 6: Plant Classification ===
            'Biodiversity': {
                en: { simple: '<strong>Biodiversity</strong> = variety of plants, animals, and organisms in a region. More biodiversity = healthier ecosystem!', funFact: '🌿 India is one of the 17 mega-biodiverse countries in the world!', tip: 'Bio = Life, Diversity = Variety → Biodiversity = Variety of Life!' },
                hi: { simple: '<strong>जैव विविधता</strong> = किसी क्षेत्र में पौधों, जानवरों की विविधता। ज़्यादा = स्वस्थ पारिस्थितिकी!', funFact: '🌿 भारत दुनिया के 17 मेगा-जैवविविध देशों में से एक है!', tip: 'Bio = जीवन, Diversity = विविधता → जीवन की विविधता!' },
                emoji: '🌍'
            },
            'Herbs': {
                en: { simple: '<strong>Herbs</strong> are small plants with soft, green stems — like tomato, mint, wheat.', funFact: '🌿 Tulsi is a herb used in Indian medicine for thousands of years!', tip: 'Herbs = Short + Soft stem + Green!' },
                hi: { simple: '<strong>शाक</strong> छोटे पौधे हैं — नरम, हरा तना — जैसे टमाटर, पुदीना, गेहूँ।', funFact: '🌿 तुलसी एक शाक है जो हज़ारों सालों से चिकित्सा में उपयोग होती है!', tip: 'शाक = छोटा + नरम तना + हरा!' },
                emoji: '🌱'
            },
            'shrub': {
                en: { simple: '<strong>Shrubs</strong> have many brown woody stems branching close to ground. Examples: Rose, Hibiscus.', funFact: '🌹 Rose bushes can live for over 35 years!', tip: 'Shrubs = Many stems + Branching near ground!' },
                hi: { simple: '<strong>झाड़ी</strong> में कई भूरे काष्ठीय तने ज़मीन के पास शाखित होते हैं। उदाहरण: गुलाब, गुड़हल।', funFact: '🌹 गुलाब की झाड़ी 35+ साल जी सकती है!', tip: 'झाड़ी = कई तने + ज़मीन के पास शाखाएँ!' },
                emoji: '🌹'
            },
            'Climbers': {
                en: { simple: '<strong>Climbers</strong> have weak stems needing support. Examples: Money Plant, Pea. Creepers crawl on ground.', funFact: '🌿 Money plants can grow up to 20 meters with support!', tip: 'Climbers CLIMB with support; Creepers CREEP on the ground!' },
                hi: { simple: '<strong>आरोही पौधे</strong> कमज़ोर तने वाले — सहारे से ऊपर बढ़ते हैं। उदाहरण: मनी प्लांट, मटर।', funFact: '🌿 मनी प्लांट सहारे से 20 मीटर तक बढ़ सकता है!', tip: 'Climber = सहारे से चढ़ता; Creeper = ज़मीन पर रेंगता!' },
                emoji: '🌿'
            },
            'Venation': {
                en: { simple: '<strong>Venation</strong> = pattern of veins on a leaf. Two types: Reticulate (net-like) and Parallel.', funFact: '🍃 Leaves use veins to transport water & food, like blood vessels in our body!', tip: 'Venation = "Vein-ation" — pattern of veins!' },
                hi: { simple: '<strong>शिरा विन्यास</strong> = पत्ती पर शिराओं का पैटर्न। दो प्रकार: जालिका और समानांतर।', funFact: '🍃 शिराएँ पानी-भोजन ले जाती हैं, हमारी नसों जैसे!', tip: 'Venation = Vein + ation → शिराओं का पैटर्न!' },
                emoji: '🍃'
            },
            'Reticulate venation': {
                en: { simple: '<strong>Reticulate venation</strong> = net-like vein pattern. Found in dicots: mango, hibiscus, chickpea.', funFact: '🕸️ "Reticulate" comes from Latin "reticulum" = little net!', tip: 'Reticulate = Net → Dicot → Taproot!' },
                hi: { simple: '<strong>जालिका शिरा विन्यास</strong> = जाल जैसा पैटर्न। द्विबीजपत्री में: आम, गुड़हल, चना।', funFact: '🕸️ "Reticulate" लैटिन "reticulum" = छोटा जाल!', tip: 'जालिका = जाल → द्विबीजपत्री → मूसला जड़!' },
                emoji: '🌿'
            },
            'Banana': {
                en: { simple: '<strong>Banana</strong> and grass have parallel venation — veins run side-by-side. This is a monocot feature.', funFact: '🍌 Banana plants are not trees — they are the world\'s largest herbs!', tip: 'Parallel veins = Monocot = Fibrous roots!' },
                hi: { simple: '<strong>केला</strong> और घास में समानांतर शिरा विन्यास — शिराएँ साथ-साथ चलती हैं। यह एकबीजपत्री की विशेषता है।', funFact: '🍌 केले का पौधा पेड़ नहीं — दुनिया का सबसे बड़ा शाक है!', tip: 'समानांतर शिराएँ = एकबीजपत्री = रेशेदार जड़ें!' },
                emoji: '🍌'
            },
            'Taproot': {
                en: { simple: '<strong>Taproot</strong> = one main thick root + small side roots. Found in dicots: mustard, carrot, mango.', funFact: '🥕 A carrot is a modified taproot that stores food!', tip: 'Taproot → one main root going deep!' },
                hi: { simple: '<strong>मूसला जड़</strong> = एक मुख्य मोटी जड़ + छोटी जड़ें। द्विबीजपत्री में: सरसों, गाजर, आम।', funFact: '🥕 गाजर रूपांतरित मूसला जड़ है जो भोजन जमा करती है!', tip: 'मूसला जड़ = एक मुख्य जड़ गहराई तक!' },
                emoji: '🌱'
            },
            'Fibrous roots': {
                en: { simple: '<strong>Fibrous roots</strong> = bunch of thin roots from stem base. Found in monocots: wheat, rice, grass.', funFact: '🌱 A single rye plant can have 14 billion root hairs!', tip: 'Fibrous = Fibre-like thin roots = Monocot!' },
                hi: { simple: '<strong>रेशेदार जड़ें</strong> = तने से पतली जड़ों का गुच्छा। एकबीजपत्री में: गेहूँ, चावल, घास।', funFact: '🌱 एक राई पौधे में 14 अरब जड़ें हो सकती हैं!', tip: 'रेशेदार = पतली जड़ें = एकबीजपत्री!' },
                emoji: '🌾'
            },
            'Dicotyledon': {
                en: { simple: '<strong>Dicot</strong> = 2 cotyledons in seed. Features: reticulate venation + taproot. Ex: chickpea, mango.', funFact: '🫘 Split a chana — you\'ll see two cotyledons!', tip: 'Di = Two → Dicot = 2 cotyledons → Reticulate → Taproot!' },
                hi: { simple: '<strong>द्विबीजपत्री</strong> = बीज में 2 बीजपत्र। जालिका शिरा + मूसला जड़। उदा: चना, आम।', funFact: '🫘 चना तोड़ो — दो बीजपत्र दिखेंगे!', tip: 'Di = दो → Dicot = 2 बीजपत्र → जालिका → मूसला जड़!' },
                emoji: '🫘'
            },
            'monocot': {
                en: { simple: '<strong>Monocot</strong> = 1 cotyledon. Features: parallel venation + fibrous root. Ex: wheat, maize, banana.', funFact: '🌽 Maize is one of the most grown monocots worldwide!', tip: 'Mono = One → 1 cotyledon → Parallel veins → Fibrous roots!' },
                hi: { simple: '<strong>एकबीजपत्री</strong> = बीज में 1 बीजपत्र। समानांतर शिरा + रेशेदार जड़। उदा: गेहूँ, मक्का, केला।', funFact: '🌽 मक्का दुनिया की सबसे उगाई जाने वाली एकबीजपत्री फसल है!', tip: 'Mono = एक → 1 बीजपत्र → समानांतर शिराएँ → रेशेदार जड़ें!' },
                emoji: '🌽'
            },
            'Habitat': {
                en: { simple: '<strong>Habitat</strong> = the place providing food, water, air, shelter for organisms to survive.', funFact: '🏠 Aquatic (water), Terrestrial (land), Aerial (air) are types of habitats!', tip: 'Habitat = "Home-itat" — the home of organisms!' },
                hi: { simple: '<strong>आवास</strong> = जीवों को भोजन, पानी, वायु और आश्रय देने वाला स्थान।', funFact: '🏠 जलीय, स्थलीय, और वायवीय — आवास के प्रकार!', tip: 'Habitat = Home → जीवों का घर!' },
                emoji: '🏠'
            },
            'Amphibians': {
                en: { simple: '<strong>Amphibians</strong> live both in water AND on land. Ex: Frogs, Toads, Salamanders.', funFact: '🐸 Frogs breathe through skin in water and through lungs on land!', tip: 'Amphi = Both → Amphibian = land + water!' },
                hi: { simple: '<strong>उभयचर</strong> पानी और ज़मीन दोनों पर रहते हैं। उदा: मेंढक, टोड।', funFact: '🐸 मेंढक पानी में त्वचा से, ज़मीन पर फेफड़ों से साँस लेता है!', tip: 'Amphi = दोनों → उभयचर = ज़मीन + पानी!' },
                emoji: '🐸'
            },
            'Fins': {
                en: { simple: 'Fish use <strong>fins</strong> for movement. Streamlined body reduces water resistance.', funFact: '🐠 Fish have dorsal, pectoral, and caudal (tail) fins — each with a specific job!', tip: 'Fish = Fins + Streamlined body + Gills!' },
                hi: { simple: 'मछली <strong>फिन</strong> से तैरती है। सुव्यवस्थित शरीर पानी का प्रतिरोध कम करता है।', funFact: '🐠 मछली के पृष्ठ, वक्ष और पुच्छ पंख — हर एक का अलग काम!', tip: 'मछली = फिन + सुव्यवस्थित शरीर + गलफड़े!' },
                emoji: '🐟'
            },
            'Adaptations': {
                en: { simple: '<strong>Adaptations</strong> = special features that help organisms survive in their habitat.', funFact: '🦎 Chameleons change color — that\'s an adaptation to hide from predators!', tip: 'Adapt = Adjust → Adaptations = survival adjustments!' },
                hi: { simple: '<strong>अनुकूलन</strong> = विशेष विशेषताएँ जो जीवों को आवास में जीवित रहने में मदद करती हैं।', funFact: '🦎 गिरगिट रंग बदलता है — यह शिकारियों से बचने का अनुकूलन है!', tip: 'Adapt = ढलना → अनुकूलन = जीवित रहने के लिए ढलना!' },
                emoji: '🌵'
            },
            'cactus': {
                en: { simple: '<strong>Cactus</strong> survives in deserts: thick fleshy stems store water, spines reduce water loss.', funFact: '🌵 A large cactus can store up to 200 gallons of water!', tip: 'Thick stem = water tank, Spines = no water loss!' },
                hi: { simple: '<strong>कैक्टस</strong> रेगिस्तान में: मोटे मांसल तने पानी जमा करते हैं, काँटे पानी की हानि रोकते हैं।', funFact: '🌵 बड़ा कैक्टस 200 गैलन पानी जमा कर सकता है!', tip: 'मोटा तना = पानी की टंकी, काँटे = पानी नहीं जाता!' },
                emoji: '🌵'
            },
            'Deodar': {
                en: { simple: '<strong>Deodar trees</strong>: conical shape + sloping branches → snow slides off easily in cold mountains.', funFact: '🏔️ Deodar means "Wood of the Gods" in Sanskrit!', tip: 'Conical shape = snow slides off = tree survives!' },
                hi: { simple: '<strong>देवदार</strong>: शंक्वाकार + ढलवाँ शाखाएँ → बर्फ आसानी से फिसल जाती है।', funFact: '🏔️ देवदार = संस्कृत में "ईश्वर की लकड़ी"!', tip: 'शंकु आकार = बर्फ फिसलती है = पेड़ बचता है!' },
                emoji: '🌲'
            },
            'camel': {
                en: { simple: 'Hot desert: long legs + wide hooves + 1 hump. Cold desert (Ladakh): 2 humps + long hair.', funFact: '🐪 Camels can drink 135 liters of water in 13 minutes!', tip: 'Hot = 1 hump + long legs. Cold (Ladakh) = 2 humps + long hair!' },
                hi: { simple: 'गर्म रेगिस्तान: लंबी टाँगें + चौड़े खुर + 1 कूबड़। ठंडा (लद्दाख): 2 कूबड़ + लंबे बाल।', funFact: '🐪 ऊँट 13 मिनट में 135 लीटर पानी पी सकता है!', tip: 'गर्म = 1 कूबड़ + लंबी टाँगें। ठंडा = 2 कूबड़ + लंबे बाल!' },
                emoji: '🐪'
            },
            'urine': {
                en: { simple: 'Camels conserve water: small amounts of urine + dry dung + no sweating!', funFact: '🐪 Camels can go 7 days without drinking water!', tip: 'Less urine + dry dung + no sweat = water saved!' },
                hi: { simple: 'ऊँट पानी बचाते हैं: कम मूत्र + सूखा गोबर + पसीना नहीं!', funFact: '🐪 ऊँट 7 दिन बिना पानी रह सकते हैं!', tip: 'कम मूत्र + सूखा गोबर + पसीना नहीं = पानी बचत!' },
                emoji: '🐪'
            },
            'Rhododendron': {
                en: { simple: '<strong>Rhododendrons</strong> in Nilgiris: shorter height + smaller leaves → survive heavy mountain winds.', funFact: '🌺 Rhododendrons are the national flower of Nepal!', tip: 'Short + small leaves = less wind resistance!' },
                hi: { simple: 'नीलगिरी में <strong>रोडोडेंड्रोन</strong>: कम ऊँचाई + छोटी पत्तियाँ → तेज़ हवाओं में बचाव।', funFact: '🌺 रोडोडेंड्रोन नेपाल का राष्ट्रीय फूल है!', tip: 'छोटा + छोटी पत्तियाँ = कम हवा प्रतिरोध!' },
                emoji: '🌺'
            },
            'Janaki Ammal': {
                en: { simple: '<strong>Janaki Ammal</strong> (1897–1984): Indian botanist, headed Botanical Survey of India, led "Save Silent Valley" movement.', funFact: '🌿 She received the Padma Shri for her contributions to botany!', tip: 'Janaki Ammal = Botanist + Botanical Survey + Silent Valley!' },
                hi: { simple: '<strong>जानकी अम्मल</strong> (1897–1984): भारतीय वनस्पतिशास्त्री, वनस्पति सर्वेक्षण प्रमुख, "साइलेंट वैली बचाओ" आंदोलन।', funFact: '🌿 उन्हें वनस्पति विज्ञान में योगदान के लिए पद्मश्री मिली!', tip: 'जानकी अम्मल = वनस्पतिशास्त्री + सर्वेक्षण प्रमुख + साइलेंट वैली!' },
                emoji: '👩‍🔬'
            },
            'Kunthipuzha': {
                en: { simple: '"Save Silent Valley" = 10-year fight against dam on <strong>Kunthipuzha</strong> river, Kerala.', funFact: '🌳 Silent Valley is one of India\'s last remaining rainforests!', tip: 'Silent Valley = Kerala = Kunthipuzha = 10-year movement!' },
                hi: { simple: '"साइलेंट वैली बचाओ" = केरल में <strong>कुंथिपुझा</strong> नदी पर बाँध के खिलाफ 10 साल का आंदोलन।', funFact: '🌳 साइलेंट वैली भारत के अंतिम वर्षावनों में से एक है!', tip: 'साइलेंट वैली = केरल = कुंथिपुझा = 10 साल!' },
                emoji: '🌳'
            },
            'Salim Ali': {
                en: { simple: '<strong>Salim Ali</strong> = "Birdman of India". Protected Keoladeo (Rajasthan) & Ranganathittu (Karnataka).', funFact: '🐦 He wrote 10 books on birds of the Indian subcontinent!', tip: 'Salim Ali = Birdman = Keoladeo + Ranganathittu!' },
                hi: { simple: '<strong>सलीम अली</strong> = "बर्डमैन ऑफ इंडिया"। केवलादेव (राजस्थान) व रंगनाथिट्टु (कर्नाटक) संरक्षित किए।', funFact: '🐦 उन्होंने 10 किताबें लिखीं भारतीय पक्षियों पर!', tip: 'सलीम अली = बर्डमैन = केवलादेव + रंगनाथिट्टु!' },
                emoji: '🐦'
            },
            'Project Tiger': {
                en: { simple: '<strong>Project Tiger</strong> = 1973, to protect Bengal Tigers. Count: ~1,800 (1973) → 3,600+ (2023)!', funFact: '🐅 India has the most tigers in the world today!', tip: 'Project Tiger = 1973 = Bengal Tiger protection!' },
                hi: { simple: '<strong>प्रोजेक्ट टाइगर</strong> = 1973, बंगाल टाइगर की रक्षा। ~1,800 (1973) → 3,600+ (2023)!', funFact: '🐅 आज भारत में सबसे ज़्यादा बाघ हैं!', tip: 'प्रोजेक्ट टाइगर = 1973 = बंगाल टाइगर!' },
                emoji: '🐅'
            },
            'Cheetah': {
                en: { simple: '<strong>Cheetah Reintroduction Project</strong> = 2022, restoring India\'s extinct cheetah population.', funFact: '🐆 Cheetahs are the fastest land animals — up to 120 km/h!', tip: 'Cheetah Reintroduction = 2022!' },
                hi: { simple: '<strong>चीता पुनर्वास</strong> = 2022, भारत में विलुप्त चीतों को वापस लाना।', funFact: '🐆 चीता सबसे तेज़ ज़मीनी जानवर — 120 km/h!', tip: 'चीता पुनर्वास = 2022!' },
                emoji: '🐆'
            },
            'Bustard': {
                en: { simple: '<strong>Great Indian Bustard</strong> protected in Gujarat, Rajasthan, Maharashtra. Critically endangered.', funFact: '🦅 One of the heaviest flying birds — up to 18 kg!', tip: 'GIB = Gujarat, Rajasthan, Maharashtra!' },
                hi: { simple: '<strong>ग्रेट इंडियन बस्टर्ड</strong> गुजरात, राजस्थान, महाराष्ट्र में संरक्षित। अत्यंत लुप्तप्राय।', funFact: '🦅 सबसे भारी उड़ने वाले पक्षियों में — 18 किलो तक!', tip: 'GIB = गुजरात, राजस्थान, महाराष्ट्र!' },
                emoji: '🦅'
            },
            'Sacred Groves': {
                en: { simple: '<strong>Sacred Groves</strong> = community-protected forest patches with medicinal plants.', funFact: '🌳 India has 13,000+ documented sacred groves!', tip: 'Sacred Groves = Community-protected + Medicinal plants!' },
                hi: { simple: '<strong>पवित्र वन</strong> = समुदाय संरक्षित वन पट्टी — औषधीय पौधों से भरपूर।', funFact: '🌳 भारत में 13,000+ पवित्र वन हैं!', tip: 'पवित्र वन = समुदाय संरक्षित + औषधीय पौधे!' },
                emoji: '🌳'
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
            'payment for loss': { actualWord: 'Compensation', pos: 'Noun', sentence: 'Suraj Yadav asked for <strong>compensation</strong> when his cricket ball broke the window.', sentenceHi: 'Suraj Yadav ने <strong>मुआवजा</strong> माँगा जब उसकी cricket ball से खिड़की टूट गई।', synonyms: ['repayment', 'refund'], antonyms: ['penalty', 'fine'] },

            // === VOCABULARY GATHRI 5 ANSWERS ===
            'guard/watch': {
                actualWord: 'Patrol',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> Ankit saw the police <strong>patrol</strong> the market at night for safety.<br><strong>As a Noun:</strong> The night <strong>patrol</strong> helped Ankit feel safe in his neighborhood.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> अंकित ने देखा कि पुलिस रात में सुरक्षा के लिए बाज़ार में <strong>गश्त</strong> लगा रही थी।<br><strong>संज्ञा के रूप में:</strong> रात की <strong>गश्त</strong> ने अंकित को अपने मोहल्ले में सुरक्षित महसूस कराया।',
                synonyms: ['guard', 'watch'],
                antonyms: ['ignore', 'neglect'],
                extraInfo: 'Patrol can be a Verb (to walk or drive around an area to check for trouble) or a Noun (the act of watching or guarding an area).',
                extraInfoHi: 'Patrol एक क्रिया (किसी इलाके में परेशानी की जांच के लिए चलना या गाड़ी चलाना) या संज्ञा (किसी इलाके की निगरानी या पहरेदारी करना) हो सकता है।'
            },
            'waste matter': {
                actualWord: 'Excreta',
                pos: 'Noun',
                sentence: 'Hari Kishan cleaned the bird <strong>excreta</strong> from his bicycle seat.',
                sentenceHi: 'हरी किशन ने अपनी साइकिल की सीट से पक्षी का <strong>मल-मूत्र</strong> साफ किया।',
                synonyms: ['waste', 'droppings'],
                antonyms: ['food', 'nutrient'],
                extraInfo: 'Excreta is a Noun. It refers to waste matter discharged from the body, like poop or urine.',
                extraInfoHi: 'Excreta एक संज्ञा है। इसका मतलब है शरीर से निकलने वाला कचरा, जैसे मल या पेशाब।'
            },
            'disagreement': {
                actualWord: 'Argument',
                pos: 'Noun',
                sentence: 'Adarsh and Ladli had a small <strong>argument</strong> about whose turn it was to bat.',
                sentenceHi: 'आदर्श और लाडली में छोटी सी <strong>बहस</strong> हो गई कि बल्लेबाजी की बारी किसकी है।',
                synonyms: ['fight', 'dispute'],
                antonyms: ['agreement', 'harmony'],
                extraInfo: 'Argument is a Noun. It is a situation where people speak angrily because they disagree.',
                extraInfoHi: 'Argument एक संज्ञा है। यह वह स्थिति है जब लोग असहमत होने पर गुस्से में बात करते हैं।'
            },
            'belch': {
                actualWord: 'Burp',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> Aniket Kumar <strong>burped</strong> loudly after drinking the soda.<br><strong>As a Noun:</strong> Everyone laughed when Aniket Kumar let out a loud <strong>burp</strong>.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> सोडा पीने के बाद अनिकेत कुमार ने जोर से <strong>डकार</strong> ली।<br><strong>संज्ञा के रूप में:</strong> जब अनिकेत कुमार ने जोर से <strong>डकार</strong> ली तो सब हँस पड़े।',
                synonyms: ['belch'],
                antonyms: ['hiccup'],
                extraInfo: 'Burp can be a Verb (to release gas from the stomach through the mouth) or a Noun (the sound made when releasing gas).',
                extraInfoHi: 'Burp एक क्रिया (पेट से मुंह के रास्ते गैस निकालना) या संज्ञा (गैस निकलने पर आने वाली आवाज़) हो सकता है।'
            },
            'grow/shoot': {
                actualWord: 'Sprout',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> Shivshant watered the seeds daily until he saw them <strong>sprout</strong>.<br><strong>As a Noun:</strong> Shivshant pointed at the tiny green <strong>sprout</strong> coming out of the soil.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> शिवशांत ने बीजों को रोज़ पानी दिया जब तक उसने उन्हें <strong>अंकुरित</strong> होते नहीं देखा।<br><strong>संज्ञा के रूप में:</strong> शिवशांत ने मिट्टी से निकलते छोटे हरे <strong>अंकुर</strong> की ओर इशारा किया।',
                synonyms: ['grow', 'bud'],
                antonyms: ['wither', 'die'],
                extraInfo: 'Sprout can be a Verb (to begin to grow and put out shoots) or a Noun (a young plant shoot).',
                extraInfoHi: 'Sprout एक क्रिया (उगना शुरू करना और अंकुर निकालना) या संज्ञा (पौधे का नया अंकुर) हो सकता है।'
            },
            'sprouting': {
                actualWord: 'Germination',
                pos: 'Noun',
                sentence: 'Divanshi learned about seed <strong>germination</strong> in her science class today.',
                sentenceHi: 'दिवांशी ने आज अपनी विज्ञान की कक्षा में बीज के <strong>अंकुरण</strong> के बारे में सीखा।',
                synonyms: ['sprouting', 'growth'],
                antonyms: ['decay', 'death'],
                extraInfo: 'Germination is a Noun. It is the process by which a seed starts to grow into a new plant.',
                extraInfoHi: 'Germination एक संज्ञा है। यह वह प्रक्रिया है जिसमें बीज एक नए पौधे में बढ़ना शुरू करता है।'
            },
            'large snake': {
                actualWord: 'Python',
                pos: 'Noun',
                sentence: 'Sakshi 2 saw a huge <strong>python</strong> in the zoo and was amazed by its size.',
                sentenceHi: 'साक्षी 2 ने चिड़ियाघर में एक विशाल <strong>अजगर</strong> देखा और उसके आकार को देखकर हैरान रह गई।',
                synonyms: ['boa', 'serpent'],
                antonyms: ['worm'],
                extraInfo: 'Python is a Noun. It is a very large non-venomous snake that kills prey by squeezing it.',
                extraInfoHi: 'Python एक संज्ञा है। यह एक बहुत बड़ा गैर-विषैला सांप है जो शिकार को दबाकर मारता है।'
            },
            'ending life': {
                actualWord: 'Killing',
                pos: 'Noun/Verb',
                sentence: '<strong>As a Noun:</strong> Vipin explained that the <strong>killing</strong> of innocent animals is a crime.<br><strong>As a Verb:</strong> "Using plastic is <strong>killing</strong> our environment," said Vipin.',
                sentenceHi: '<strong>संज्ञा के रूप में:</strong> विपिन ने समझाया कि निर्दोष जानवरों की <strong>हत्या</strong> अपराध है।<br><strong>क्रिया के रूप में:</strong> "प्लास्टिक का इस्तेमाल हमारे पर्यावरण को <strong>मार</strong> रहा है," विपin ने कहा।',
                synonyms: ['murdering', 'slaying'],
                antonyms: ['saving', 'birth'],
                extraInfo: 'Killing can be a Noun (an act of causing death) or a Verb (the act of causing something to die).',
                extraInfoHi: 'Killing एक संज्ञा (मौत का कारण बनने का कार्य) या क्रिया (किसी चीज़ को मारने का कार्य) हो सकता है।'
            },
            'snake player': {
                actualWord: 'Snake Charmer',
                pos: 'Noun',
                sentence: 'Madhu watched the <strong>snake charmer</strong> play his flute in the village fair.',
                sentenceHi: 'मधु ने गाँव के मेले में <strong>सपेरे</strong> को बाँसुरी बजाते देखा।',
                synonyms: ['juggler (related context)'],
                antonyms: ['N/A'],
                extraInfo: 'Snake Charmer is a Noun. A person who appears to make snakes move by playing music on a pipe.',
                extraInfoHi: 'Snake Charmer (सपेरा) एक संज्ञा है। वह व्यक्ति जो बाँसुरी बजाकर सांपों को नचाता हुआ दिखता है।'
            },
            'blessing/gift': {
                actualWord: 'Boon',
                pos: 'Noun',
                sentence: 'The heavy rain was a <strong>boon</strong> for Kishan\'s farm fields this year.',
                sentenceHi: 'भारी बारिश इस साल किशन के खेतों के लिए <strong>वरदान</strong> साबित हुई।',
                synonyms: ['blessing', 'gift'],
                antonyms: ['curse', 'bane'],
                extraInfo: 'Boon is a Noun. It is something helpful or beneficial; a blessing.',
                extraInfoHi: 'Boon (वरदान) एक संज्ञा है। यह कोई ऐसी चीज़ है जो मददगार या फायदेमंद हो; एक आशीर्वाद।'
            },

            // === VOCABULARY GATHRI 6 ANSWERS ===
            'excuse': {
                actualWord: 'Pretext',
                pos: 'Noun',
                sentence: 'Shivansh left the class on the <strong>pretext</strong> of drinking water, but he actually went to play.',
                sentenceHi: 'शिवांश पानी पीने के <strong>बहाने</strong> क्लास से निकला, लेकिन असल में वह खेलने गया।',
                synonyms: ['Excuse', 'Ruse'],
                antonyms: ['Truth', 'Reality'],
                extraInfo: 'Pretext is a Noun. It is a false reason given to hide the real reason for doing something.',
                extraInfoHi: 'Pretext (बहाना) एक संज्ञा है। यह किसी काम के असली कारण को छुपाने के लिए दिया गया झूठा कारण है।'
            },
            'pleasant sounding': {
                actualWord: 'Melodious',
                pos: 'Adjective',
                sentence: 'Stuti sang a <strong>melodious</strong> song during the school assembly.',
                sentenceHi: 'स्तुति ने स्कूल की सभा में एक <strong>मधुर</strong> गाना गाया।',
                synonyms: ['Musical', 'Tuneful'],
                antonyms: ['Harsh', 'Noisy'],
                extraInfo: 'Melodious is an Adjective. It describes a sound that is pleasant and sweet to hear, like music.',
                extraInfoHi: 'Melodious (मधुर/सुरीला) एक विशेषण है। यह ऐसी आवाज़ को बताता है जो सुनने में मीठी और अच्छी लगे, जैसे संगीत।'
            },
            'insect': {
                actualWord: 'Beetle',
                pos: 'Noun',
                sentence: 'Yash found a shiny black <strong>beetle</strong> in the garden.',
                sentenceHi: 'यश को बगीचे में एक चमकता काला <strong>गुबरैला</strong> मिला।',
                synonyms: ['Bug', 'Insect'],
                antonyms: [],
                extraInfo: 'Beetle is a Noun. It is a type of insect with hard wing covers.',
                extraInfoHi: 'Beetle (गुबरैला/भृंग) एक संज्ञा है। यह एक प्रकार का कीड़ा है जिसके पंखों पर कड़े कवर होते हैं।'
            },
            'just married person': {
                actualWord: 'Newlywed',
                pos: 'Noun',
                sentence: 'Sakshi went to visit the <strong>newlywed</strong> couple in her neighborhood.',
                sentenceHi: 'साक्षी अपने मोहल्ले में <strong>नवविवाहित</strong> जोड़े से मिलने गई।',
                synonyms: ['Bride/Groom'],
                antonyms: ['Single', 'Divorced'],
                extraInfo: 'Newlywed is a Noun. It refers to a person who has recently gotten married.',
                extraInfoHi: 'Newlywed (नवविवाहित) एक संज्ञा है। यह उस व्यक्ति को कहते हैं जिसकी हाल ही में शादी हुई हो।'
            },
            'doubt/person under suspicion': {
                actualWord: 'Suspect',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> Sunil began to <strong>suspect</strong> that his pen was stolen, not lost.<br><strong>As a Noun:</strong> The police caught the main <strong>suspect</strong> of the robbery.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> सुनील को <strong>संदेह</strong> होने लगा कि उसका पेन खोया नहीं, चुराया गया है।<br><strong>संज्ञा के रूप में:</strong> पुलिस ने डकैती के मुख्य <strong>संदिग्ध</strong> को पकड़ लिया।',
                synonyms: ['Distrust', 'Accused'],
                antonyms: ['Trust', 'Innocent'],
                extraInfo: 'Suspect can be a Verb (to think someone is guilty without proof) or a Noun (a person thought to be guilty of a crime).',
                extraInfoHi: 'Suspect एक क्रिया (बिना सबूत के किसी को दोषी मानना) या संज्ञा (वह व्यक्ति जिस पर अपराध का शक हो) हो सकता है।'
            },
            'organized effort/drive': {
                actualWord: 'Campaign',
                pos: 'Noun/Verb',
                sentence: '<strong>As a Noun:</strong> Palak started a "Clean India" <strong>campaign</strong> in her school.<br><strong>As a Verb:</strong> Anurag likes to <strong>campaign</strong> for his friend during class elections.',
                sentenceHi: '<strong>संज्ञा के रूप में:</strong> पलक ने अपने स्कूल में "स्वच्छ भारत" <strong>अभियान</strong> शुरू किया।<br><strong>क्रिया के रूप में:</strong> अनुराग क्लास चुनाव में अपने दोस्त के लिए <strong>प्रचार</strong> करना पसंद करता है।',
                synonyms: ['Drive', 'Movement'],
                antonyms: ['Inaction'],
                extraInfo: 'Campaign can be a Noun (a series of actions to achieve a goal) or a Verb (to work in an organized way towards a goal).',
                extraInfoHi: 'Campaign एक संज्ञा (किसी लक्ष्य को पाने के लिए कार्यों की श्रृंखला) या क्रिया (किसी लक्ष्य की ओर संगठित तरीके से काम करना) हो सकता है।'
            },
            'prisoner/declare guilty': {
                actualWord: 'Convict',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> The judge had enough proof to <strong>convict</strong> the thief.<br><strong>As a Noun:</strong> Suraj read a news story about an escaped <strong>convict</strong>.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> जज के पास चोर को <strong>दोषी ठहराने</strong> के लिए पर्याप्त सबूत थे।<br><strong>संज्ञा के रूप में:</strong> सूरज ने एक भागे हुए <strong>कैदी</strong> के बारे में खबर पढ़ी।',
                synonyms: ['Prisoner', 'Condemn'],
                antonyms: ['Acquit', 'Free man'],
                extraInfo: 'Convict can be a Verb (to officially decide someone is guilty in court) or a Noun (a person serving a sentence in prison).',
                extraInfoHi: 'Convict एक क्रिया (अदालत में किसी को आधिकारिक रूप से दोषी ठहराना) या संज्ञा (जेल में सज़ा काट रहा व्यक्ति) हो सकता है।'
            },
            'hunted animal': {
                actualWord: 'Prey',
                pos: 'Noun/Verb',
                sentence: '<strong>As a Noun:</strong> Khushboo watched the cat catch its <strong>prey</strong> in the garden.<br><strong>As a Verb:</strong> Eagles <strong>prey</strong> on small animals like mice.',
                sentenceHi: '<strong>संज्ञा के रूप में:</strong> खुशबू ने बगीचे में बिल्ली को अपना <strong>शिकार</strong> पकड़ते देखा।<br><strong>क्रिया के रूप में:</strong> बाज चूहों जैसे छोटे जानवरों का <strong>शिकार</strong> करते हैं।',
                synonyms: ['Victim', 'Quarry'],
                antonyms: ['Predator', 'Hunter'],
                extraInfo: 'Prey can be a Noun (an animal that is hunted and killed by another for food) or a Verb (to hunt and kill for food).',
                extraInfoHi: 'Prey एक संज्ञा (वह जानवर जिसका शिकार करके खाया जाता है) या क्रिया (खाने के लिए शिकार करना) हो सकता है।'
            },
            'extreme hunger': {
                actualWord: 'Starvation',
                pos: 'Noun',
                sentence: 'Vivek donated money to help people suffering from <strong>starvation</strong>.',
                sentenceHi: 'विवेक ने <strong>भुखमरी</strong> से पीड़ित लोगों की मदद के लिए पैसे दान किए।',
                synonyms: ['Famine', 'Hunger'],
                antonyms: ['Plenty', 'Fullness'],
                extraInfo: 'Starvation is a Noun. It implies suffering or death caused by having no food.',
                extraInfoHi: 'Starvation (भुखमरी) एक संज्ञा है। इसका मतलब है खाना न मिलने से होने वाला कष्ट या मृत्यु।'
            },
            'customary/old style': {
                actualWord: 'Traditional',
                pos: 'Adjective',
                sentence: 'Anshit wore a <strong>traditional</strong> Kurta Pyjama for the festival.',
                sentenceHi: 'अंशित ने त्योहार के लिए <strong>परंपरागत</strong> कुर्ता पायजामा पहना।',
                synonyms: ['Customary', 'Classic'],
                antonyms: ['Modern', 'New'],
                extraInfo: 'Traditional is an Adjective. It describes following ideas or methods that have existed for a long time.',
                extraInfoHi: 'Traditional (परंपरागत) एक विशेषण है। यह उन विचारों या तरीकों को बताता है जो बहुत पुराने समय से चले आ रहे हैं।'
            },
            'forecast': {
                actualWord: 'Prediction',
                pos: 'Noun',
                sentence: 'Anshika made a <strong>prediction</strong> that it would rain today, and she was right!',
                sentenceHi: 'अंशिका ने <strong>भविष्यवाणी</strong> की कि आज बारिश होगी, और वह सही थी!',
                synonyms: ['Forecast', 'Guess'],
                antonyms: ['Fact', 'Reality'],
                extraInfo: 'Prediction is a Noun. It is a statement about what will happen in the future.',
                extraInfoHi: 'Prediction (भविष्यवाणी) एक संज्ञा है। यह एक बयान है जो बताता है कि भविष्य में क्या होगा।'
            },
            'tool for scraping': {
                actualWord: 'Scraper',
                pos: 'Noun',
                sentence: 'Anchal used a metal <strong>scraper</strong> to remove the old paint from the wall.',
                sentenceHi: 'आंचल ने दीवार से पुराना पेंट हटाने के लिए धातु की <strong>खुरचनी</strong> का इस्तेमाल किया।',
                synonyms: ['Remover', 'Blade'],
                antonyms: [],
                extraInfo: 'Scraper is a Noun. It is a tool or device used for scraping dirt, paint, or ice from a surface.',
                extraInfoHi: 'Scraper (खुरचनी) एक संज्ञा है। यह एक औजार है जो सतह से गंदगी, पेंट या बर्फ खुरचने के लिए इस्तेमाल होता है।'
            },
            'rubble/trash': {
                actualWord: 'Debris',
                pos: 'Noun',
                sentence: 'Divansh helped clean up the <strong>debris</strong> after the strong storm.',
                sentenceHi: 'दिवांश ने तूफान के बाद <strong>मलबा</strong> साफ करने में मदद की।',
                synonyms: ['Rubble', 'Wreckage'],
                antonyms: ['Neatness', 'Purity'],
                extraInfo: 'Debris is a Noun. It refers to scattered pieces of rubbish or remains of something destroyed.',
                extraInfoHi: 'Debris (मलबा) एक संज्ञा है। इसका मतलब है बिखरे हुए कचरे के टुकड़े या किसी नष्ट हुई चीज़ के अवशेष।'
            },
            'decrease/make less': {
                actualWord: 'Reduce',
                pos: 'Verb',
                sentence: 'Suraj Yadav decided to <strong>reduce</strong> the time he spends playing mobile games.',
                sentenceHi: 'सूरज यादव ने मोबाइल गेम खेलने में लगने वाले समय को <strong>कम करने</strong> का फैसला किया।',
                synonyms: ['Decrease', 'Lower'],
                antonyms: ['Increase', 'Expand'],
                extraInfo: 'Reduce is a Verb. It means to make something smaller or less in amount.',
                extraInfoHi: 'Reduce (कम करना) एक क्रिया है। इसका मतलब है किसी चीज़ को मात्रा में छोटा या कम करना।'
            },
            'mouse-like animal': {
                actualWord: 'Shrew',
                pos: 'Noun',
                sentence: 'Shlok Nishad saw a tiny <strong>shrew</strong> running quickly across the garden path.',
                sentenceHi: 'श्लोक निषाद ने एक छोटी <strong>छछूंदर</strong> को बगीचे के रास्ते पर तेज़ी से दौड़ते देखा।',
                synonyms: ['Mole-like animal'],
                antonyms: [],
                extraInfo: 'Shrew is a Noun. It is a small animal that looks like a mouse but has a long, pointed nose.',
                extraInfoHi: 'Shrew (छछूंदर) एक संज्ञा है। यह एक छोटा जानवर है जो चूहे जैसा दिखता है लेकिन इसकी नाक लंबी और नुकीली होती है।'
            },

            // === VOCABULARY GATHRI 7 ANSWERS ===
            'tiny opening': {
                actualWord: 'Pore',
                pos: 'Noun',
                sentence: 'Mahak washed her face to clean the dust from every <strong>pore</strong> of her skin.',
                sentenceHi: 'महक ने अपनी त्वचा के हर <strong>छिद्र</strong> से धूल साफ करने के लिए अपना चेहरा धोया।',
                synonyms: ['Hole', 'Opening'],
                antonyms: ['Barrier', 'Seal'],
                extraInfo: 'Pore is a Noun. It refers to a very tiny opening in the skin or other surfaces through which liquid or air can pass.',
                extraInfoHi: 'Pore (छिद्र/सुराख) एक संज्ञा है। यह त्वचा या अन्य सतहों में बहुत छोटा छेद है जिससे तरल या हवा गुजर सकती है।'
            },
            'take severe action': {
                actualWord: 'Crack down',
                pos: 'Phrasal Verb',
                sentence: 'The school principal decided to <strong>crack down</strong> on students coming late, so Swati arrived early.',
                sentenceHi: 'स्कूल के प्रधानाचार्य ने देर से आने वाले छात्रों पर <strong>कड़ी कार्रवाई</strong> करने का फैसला किया, इसलिए स्वाति जल्दी आई।',
                synonyms: ['Clamp down', 'Suppress'],
                antonyms: ['Allow', 'Loosen'],
                extraInfo: 'Crack down is a Phrasal Verb. It means to start enforcing a law or rule very strictly.',
                extraInfoHi: 'Crack down (कड़ी कार्रवाई करना) एक क्रियाविशेषण है। इसका मतलब है किसी कानून या नियम को बहुत सख्ती से लागू करना शुरू करना।'
            },
            'vanish': {
                actualWord: 'Disappear',
                pos: 'Verb',
                sentence: 'Ankit watched the airplane <strong>disappear</strong> into the clouds.',
                sentenceHi: 'अंकित ने हवाई जहाज को बादलों में <strong>गायब</strong> होते देखा।',
                synonyms: ['Vanish', 'Fade'],
                antonyms: ['Appear', 'Emerge'],
                extraInfo: 'Disappear is a Verb. It means to go somewhere where you cannot be seen or found.',
                extraInfoHi: 'Disappear (गायब होना) एक क्रिया है। इसका मतलब है ऐसी जगह जाना जहां तुम दिख या मिल नहीं सकते।'
            },
            'gulp down': {
                actualWord: 'Swallow',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> Hari Kishan had to <strong>swallow</strong> the bitter medicine quickly.<br><strong>As a Noun:</strong> Hari Kishan saw a blue <strong>swallow</strong> flying in the sky.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> हरी किशन को कड़वी दवाई जल्दी <strong>निगलनी</strong> पड़ी।<br><strong>संज्ञा के रूप में:</strong> हरी किशन ने आसमान में एक नीली <strong>अबाबील</strong> उड़ते देखी।',
                synonyms: ['Gulp', 'Ingest'],
                antonyms: ['Spit', 'Vomit'],
                extraInfo: 'Swallow can be a Verb (to make food or drink go down your throat) or a Noun (a type of small bird).',
                extraInfoHi: 'Swallow एक क्रिया (भोजन या पेय को गले से नीचे उतारना) या संज्ञा (एक प्रकार की छोटी चिड़िया - अबाबील) हो सकता है।'
            },
            'relatives/family': {
                actualWord: 'Kin',
                pos: 'Noun',
                sentence: 'Adarsh invited all his <strong>kin</strong> to his sister\'s wedding.',
                sentenceHi: 'आदर्श ने अपनी बहन की शादी में अपने सभी <strong>रिश्तेदारों</strong> को बुलाया।',
                synonyms: ['Family', 'Relatives'],
                antonyms: ['Strangers', 'Outsiders'],
                extraInfo: 'Kin is a Noun. It refers to your family and relations.',
                extraInfoHi: 'Kin (रिश्तेदार/परिजन) एक संज्ञा है। इसका मतलब है आपका परिवार और रिश्तेदार।'
            },
            'grow well/thrive': {
                actualWord: 'Flourish',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> Ladli watered the plants to make them <strong>flourish</strong>.<br><strong>As a Noun:</strong> The dancer ended her performance with a <strong>flourish</strong>.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> लाडली ने पौधों को <strong>फलने-फूलने</strong> के लिए पानी दिया।<br><strong>संज्ञा के रूप में:</strong> नर्तकी ने अपना प्रदर्शन एक <strong>शानदार अंदाज़</strong> में समाप्त किया।',
                synonyms: ['Thrive', 'Prosper'],
                antonyms: ['Wither', 'Fail'],
                extraInfo: 'Flourish can be a Verb (to grow in a healthy way) or a Noun (a grand gesture).',
                extraInfoHi: 'Flourish एक क्रिया (स्वस्थ तरीके से बढ़ना) या संज्ञा (एक शानदार हावभाव) हो सकता है।'
            },
            'tolerance/calmness': {
                actualWord: 'Patience',
                pos: 'Noun',
                sentence: 'Aniket Kumar showed great <strong>patience</strong> while teaching his little brother to read.',
                sentenceHi: 'अनिकेत कुमार ने अपने छोटे भाई को पढ़ना सिखाते समय बड़ा <strong>धैर्य</strong> दिखाया।',
                synonyms: ['Endurance', 'Tolerance'],
                antonyms: ['Haste', 'Impatience'],
                extraInfo: 'Patience is a Noun. It is the ability to wait or accept trouble without getting angry.',
                extraInfoHi: 'Patience (धैर्य/सब्र) एक संज्ञा है। यह बिना गुस्सा हुए इंतज़ार करने या परेशानी सहने की क्षमता है।'
            },
            'organic soil component': {
                actualWord: 'Humus',
                pos: 'Noun',
                sentence: 'Shivshant added <strong>humus</strong> to the garden soil to make the flowers grow better.',
                sentenceHi: 'शिवशांत ने बगीचे की मिट्टी में <strong>खाद-मिट्टी</strong> मिलाई ताकि फूल बेहतर उगें।',
                synonyms: ['Compost', 'Soil matter'],
                antonyms: [],
                extraInfo: 'Humus is a Noun. It is the dark organic material in soil formed from decayed leaves and plants, which is very good for growing crops.',
                extraInfoHi: 'Humus (खाद-मिट्टी) एक संज्ञा है। यह मिट्टी में सड़ी पत्तियों और पौधों से बना गहरे रंग का जैविक पदार्थ है, जो फसल उगाने के लिए बहुत अच्छा है।'
            },
            'prepare land/plow': {
                actualWord: 'Till',
                pos: 'Verb',
                sentence: 'Divanshi watched the farmer <strong>till</strong> the field with a tractor.',
                sentenceHi: 'दिवांशी ने किसान को ट्रैक्टर से खेत की <strong>जुताई</strong> करते देखा।',
                synonyms: ['Plow', 'Cultivate'],
                antonyms: [],
                extraInfo: 'Till is a Verb. It means to prepare and cultivate the land for growing crops.',
                extraInfoHi: 'Till (जुताई करना) एक क्रिया है। इसका मतलब है फसल उगाने के लिए ज़मीन तैयार करना और जोतना।'
            },
            'very old': {
                actualWord: 'Ancient',
                pos: 'Adjective',
                sentence: 'Sakshi 2 visited an <strong>ancient</strong> temple that was built 1,000 years ago.',
                sentenceHi: 'साक्षी 2 ने एक <strong>प्राचीन</strong> मंदिर का दौरा किया जो 1,000 साल पहले बना था।',
                synonyms: ['Old', 'Antique'],
                antonyms: ['Modern', 'New'],
                extraInfo: 'Ancient is an Adjective. It describes something belonging to the very distant past.',
                extraInfoHi: 'Ancient (प्राचीन) एक विशेषण है। यह बहुत पुराने समय की किसी चीज़ को बताता है।'
            },
            'plant seeds': {
                actualWord: 'Sow',
                pos: 'Verb',
                sentence: 'Vipin helped his father <strong>sow</strong> the wheat seeds before the rain started.',
                sentenceHi: 'विपिन ने बारिश शुरू होने से पहले अपने पिता को गेहूं के बीज <strong>बोने</strong> में मदद की।',
                synonyms: ['Plant', 'Seed'],
                antonyms: ['Harvest', 'Reap'],
                extraInfo: 'Sow is a Verb. It means to plant seeds in the ground.',
                extraInfoHi: 'Sow (बोना) एक क्रिया है। इसका मतलब है ज़मीन में बीज डालना।'
            },
            'young period/young people': {
                actualWord: 'Youth',
                pos: 'Noun',
                sentence: 'Madhu said that the <strong>youth</strong> of India can change the country\'s future.',
                sentenceHi: 'मधु ने कहा कि भारत के <strong>युवा</strong> देश का भविष्य बदल सकते हैं।',
                synonyms: ['Youngster', 'Adolescence'],
                antonyms: ['Elderly', 'Old age'],
                extraInfo: 'Youth is a Noun. It refers to the time of life when a person is young, or young people in general.',
                extraInfoHi: 'Youth (जवानी/युवा) एक संज्ञा है। यह जीवन का वह समय है जब व्यक्ति युवा होता है, या सामान्य रूप से युवा लोग।'
            },
            'break/catch': {
                actualWord: 'Bust',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> Be careful not to <strong>bust</strong> the balloon! warned Kishan.<br><strong>As a Noun:</strong> Kishan saw a bronze <strong>bust</strong> of Mahatma Gandhi in the park.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> ध्यान रहे गुब्बारा <strong>फूट</strong> न जाए! किशन ने चेताया।<br><strong>संज्ञा के रूप में:</strong> किशन ने पार्क में महात्मा गांधी की कांसे की <strong>प्रतिमा</strong> देखी।',
                synonyms: ['Break', 'Crack', 'Arrest'],
                antonyms: ['Fix', 'Mend'],
                extraInfo: 'Bust can be a Verb (to break something or to catch someone doing something wrong) or a Noun (a sculpture of a person\'s head and shoulders).',
                extraInfoHi: 'Bust एक क्रिया (कुछ तोड़ना या किसी को गलत करते पकड़ना) या संज्ञा (किसी व्यक्ति के सिर और कंधों की मूर्ति) हो सकता है।'
            },
            'related to beans/peas': {
                actualWord: 'Leguminous',
                pos: 'Adjective',
                sentence: 'Anshika learned that <strong>leguminous</strong> plants help improve soil quality.',
                sentenceHi: 'अंशिका ने सीखा कि <strong>फलीदार</strong> पौधे मिट्टी की गुणवत्ता सुधारने में मदद करते हैं।',
                synonyms: ['Bean-like', 'Pod-bearing'],
                antonyms: [],
                extraInfo: 'Leguminous is an Adjective. It describes plants that belong to the pea or bean family (legumes).',
                extraInfoHi: 'Leguminous (फलीदार) एक विशेषण है। यह उन पौधों को बताता है जो मटर या फली परिवार (दलहन) से हैं।'
            },
            'disorderly crowd': {
                actualWord: 'Mob',
                pos: 'Noun/Verb',
                sentence: '<strong>As a Noun:</strong> The police controlled the angry <strong>mob</strong> on the street.<br><strong>As a Verb:</strong> Fans tried to <strong>mob</strong> the cricket star, so Shivansh stayed back.',
                sentenceHi: '<strong>संज्ञा के रूप में:</strong> पुलिस ने सड़क पर गुस्साई <strong>भीड़</strong> को नियंत्रित किया।<br><strong>क्रिया के रूप में:</strong> प्रशंसकों ने क्रिकेट स्टार को <strong>घेरने</strong> की कोशिश की, इसलिए शिवांश पीछे रहा।',
                synonyms: ['Crowd', 'Horde'],
                antonyms: ['Individual', 'Solitary'],
                extraInfo: 'Mob can be a Noun (a large crowd of people, often disorderly or angry) or a Verb (to crowd around someone aggressively).',
                extraInfoHi: 'Mob एक संज्ञा (लोगों की बड़ी भीड़, अक्सर अव्यवस्थित या गुस्सैल) या क्रिया (किसी के चारों ओर आक्रामक तरीके से घेरना) हो सकता है।'
            },

            // === VOCABULARY GATHRI 8 ANSWERS ===
            'killing by mob': {
                actualWord: 'Lynching',
                pos: 'Noun',
                sentence: 'Ankit was shocked to read the news about the violent <strong>lynching</strong> in the city.',
                sentenceHi: 'अंकित शहर में हिंसक <strong>भीड़ द्वारा हत्या</strong> की खबर पढ़कर हैरान रह गया।',
                synonyms: ['Mob execution', 'Killing'],
                antonyms: ['Protecting', 'Saving'],
                extraInfo: 'Lynching is a Noun. It is when a mob (angry crowd) attacks and kills someone illegally, usually by beating.',
                extraInfoHi: 'Lynching (भीड़ द्वारा मार डालना) एक संज्ञा है। यह तब होता है जब भीड़ (गुस्सैल लोग) किसी को अवैध रूप से पीट-पीटकर मार डालते हैं।'
            },
            'nearly/about to': {
                actualWord: 'Almost',
                pos: 'Adverb',
                sentence: 'Hari Kishan fell asleep because the movie was <strong>almost</strong> three hours long.',
                sentenceHi: 'हरी किशन सो गया क्योंकि फिल्म <strong>लगभग</strong> तीन घंटे लंबी थी।',
                synonyms: ['Nearly', 'Practically'],
                antonyms: ['Exactly', 'Completely'],
                extraInfo: 'Almost is an Adverb. It means very nearly, but not completely.',
                extraInfoHi: 'Almost (लगभग) एक क्रियाविशेषण है। इसका मतलब है बहुत करीब, लेकिन पूरी तरह नहीं।'
            },
            'seller/hawker': {
                actualWord: 'Vendor',
                pos: 'Noun',
                sentence: 'Adarsh bought fresh vegetables from the street <strong>vendor</strong>.',
                sentenceHi: 'आदर्श ने सड़क के <strong>फेरीवाले</strong> से ताजी सब्जियां खरीदीं।',
                synonyms: ['Seller', 'Merchant'],
                antonyms: ['Customer', 'Buyer'],
                extraInfo: 'Vendor is a Noun. It refers to a person who sells things, especially on the street.',
                extraInfoHi: 'Vendor (फेरीवाला/विक्रेता) एक संज्ञा है। यह उस व्यक्ति को कहते हैं जो चीजें बेचता है, खासकर सड़क पर।'
            },
            'pull heavily': {
                actualWord: 'Drag',
                pos: 'Verb',
                sentence: 'The box was so heavy that Ladli had to <strong>drag</strong> it across the room.',
                sentenceHi: 'डिब्बा इतना भारी था कि लाडली को उसे कमरे में <strong>घसीटना</strong> पड़ा।',
                synonyms: ['Pull', 'Haul'],
                antonyms: ['Push', 'Carry'],
                extraInfo: 'Drag is a Verb. It means to pull something along the ground with effort.',
                extraInfoHi: 'Drag (खींचना/घसीटना) एक क्रिया है। इसका मतलब है किसी चीज को मेहनत से जमीन पर खींचना।'
            },
            'fainted/senseless': {
                actualWord: 'Unconscious',
                pos: 'Adjective',
                sentence: 'After hitting his head, the player fell <strong>unconscious</strong>, and Aniket Kumar ran to help him.',
                sentenceHi: 'सिर पर चोट लगने के बाद खिलाड़ी <strong>बेहोश</strong> हो गया, और अनिकेत कुमार उसकी मदद के लिए दौड़ा।',
                synonyms: ['Senseless', 'Fainted'],
                antonyms: ['Conscious', 'Awake'],
                extraInfo: 'Unconscious is an Adjective. It describes a person who is not awake and aware of their surroundings, often due to injury.',
                extraInfoHi: 'Unconscious (बेहोश) एक विशेषण है। यह उस व्यक्ति को बताता है जो जागा हुआ नहीं है और अपने आसपास से अनजान है, अक्सर चोट के कारण।'
            },
            'worship place or side of head': {
                actualWord: 'Temple',
                pos: 'Noun',
                sentence: '<strong>Meaning 1:</strong> Shivshant went to the <strong>temple</strong> to offer prayers.<br><strong>Meaning 2:</strong> Shivshant had a headache right on his left <strong>temple</strong>.',
                sentenceHi: '<strong>अर्थ 1:</strong> शिवशांत प्रार्थना करने <strong>मंदिर</strong> गया।<br><strong>अर्थ 2:</strong> शिवशांत के बाएं <strong>कनपटी</strong> में दर्द था।',
                synonyms: ['Shrine'],
                antonyms: [],
                extraInfo: 'Temple is a Noun with two meanings: 1. A building used for religious worship. 2. The flat part of the side of the head between the forehead and the ear.',
                extraInfoHi: 'Temple एक संज्ञा है जिसके दो अर्थ हैं: 1. धार्मिक पूजा के लिए इमारत (मंदिर)। 2. माथे और कान के बीच सिर का सपाट हिस्सा (कनपटी)।'
            },
            'location or speech': {
                actualWord: 'Address',
                pos: 'Noun/Verb',
                sentence: '<strong>As a Noun:</strong> Divanshi wrote her home <strong>address</strong> on the envelope.<br><strong>As a Verb:</strong> The Principal decided to <strong>address</strong> the students in the morning assembly.',
                sentenceHi: '<strong>संज्ञा के रूप में:</strong> दिवांशी ने लिफाफे पर अपना घर का <strong>पता</strong> लिखा।<br><strong>क्रिया के रूप में:</strong> प्रधानाचार्य ने सुबह की सभा में छात्रों को <strong>संबोधित</strong> करने का फैसला किया।',
                synonyms: ['Residence', 'Speech'],
                antonyms: ['Ignore'],
                extraInfo: 'Address can be a Noun (the details of where a person lives) or a Verb (to speak to a group of people formally).',
                extraInfoHi: 'Address एक संज्ञा (जहां कोई रहता है उसका विवरण - पता) या क्रिया (लोगों के समूह को औपचारिक रूप से संबोधित करना) हो सकता है।'
            },
            'fold/crease': {
                actualWord: 'Wrinkle',
                pos: 'Noun',
                sentence: 'Sakshi 2 ironed her shirt to remove every <strong>wrinkle</strong>.',
                sentenceHi: 'साक्षी 2 ने अपनी शर्ट से हर <strong>सिकुड़न</strong> हटाने के लिए इस्त्री की।',
                synonyms: ['Crease', 'Fold'],
                antonyms: ['Smoothness', 'Flatness'],
                extraInfo: 'Wrinkle is a Noun. It is a small line or fold in something, especially fabric or the skin.',
                extraInfoHi: 'Wrinkle (सिकुड़न/झुर्री) एक संज्ञा है। यह किसी चीज में छोटी रेखा या मोड़ है, खासकर कपड़े या त्वचा में।'
            },
            'religious leader/pujari': {
                actualWord: 'Priest',
                pos: 'Noun',
                sentence: 'Vipin asked the <strong>priest</strong> for blessings after the ceremony.',
                sentenceHi: 'विपिन ने समारोह के बाद <strong>पुजारी</strong> से आशीर्वाद मांगा।',
                synonyms: ['Clergyman', 'Pujari'],
                antonyms: [],
                extraInfo: 'Priest is a Noun. It is a person who performs religious ceremonies.',
                extraInfoHi: 'Priest (पुजारी) एक संज्ञा है। यह वह व्यक्ति है जो धार्मिक अनुष्ठान करता है।'
            },
            'offensive/unpleasant': {
                actualWord: 'Objectionable',
                pos: 'Adjective',
                sentence: 'The teacher told the class that using bad words is <strong>objectionable</strong>, so Madhu apologized.',
                sentenceHi: 'शिक्षक ने कक्षा को बताया कि बुरे शब्दों का इस्तेमाल <strong>आपत्तिजनक</strong> है, इसलिए मधु ने माफी मांगी।',
                synonyms: ['Offensive', 'Unacceptable'],
                antonyms: ['Acceptable', 'Pleasant'],
                extraInfo: 'Objectionable is an Adjective. It describes something that causes people to disagree or feel offended.',
                extraInfoHi: 'Objectionable (आपत्तिजनक) एक विशेषण है। यह ऐसी चीज को बताता है जो लोगों को असहमत या नाराज करती है।'
            },
            'whole/complete': {
                actualWord: 'Entire',
                pos: 'Adjective',
                sentence: 'Kishan was so hungry he ate the <strong>entire</strong> pizza by himself.',
                sentenceHi: 'किशन को इतनी भूख थी कि उसने अकेले <strong>पूरा</strong> पिज्जा खा लिया।',
                synonyms: ['Whole', 'Total'],
                antonyms: ['Partial', 'Incomplete'],
                extraInfo: 'Entire is an Adjective. It means with no part left out; whole.',
                extraInfoHi: 'Entire (पूरा/संपूर्ण) एक विशेषण है। इसका मतलब है कोई हिस्सा छूटा नहीं; पूरा।'
            },
            'extreme fatness': {
                actualWord: 'Obesity',
                pos: 'Noun',
                sentence: 'Anshika learned that eating too much junk food can lead to <strong>obesity</strong>.',
                sentenceHi: 'अंशिका ने सीखा कि बहुत ज्यादा जंक फूड खाने से <strong>मोटापा</strong> हो सकता है।',
                synonyms: ['Fatness', 'Overweight'],
                antonyms: ['Thinness', 'Fitness'],
                extraInfo: 'Obesity is a Noun. It is the medical condition of being very overweight or fat in a way that is unhealthy.',
                extraInfoHi: 'Obesity (मोटापा) एक संज्ञा है। यह बहुत अधिक वजन या मोटा होने की चिकित्सा स्थिति है जो अस्वस्थ है।'
            },
            'insect killer': {
                actualWord: 'Insecticide',
                pos: 'Noun',
                sentence: 'Shivansh watched the farmer spray <strong>insecticide</strong> to save the crops from bugs.',
                sentenceHi: 'शिवांश ने किसान को कीड़ों से फसल बचाने के लिए <strong>कीटनाशक</strong> छिड़कते देखा।',
                synonyms: ['Pesticide', 'Bug spray'],
                antonyms: [],
                extraInfo: 'Insecticide is a Noun. It is a chemical used to kill insects that damage crops.',
                extraInfoHi: 'Insecticide (कीटनाशक) एक संज्ञा है। यह फसलों को नुकसान पहुंचाने वाले कीड़ों को मारने के लिए इस्तेमाल होने वाला रसायन है।'
            },
            'garden tool': {
                actualWord: 'Hoe',
                pos: 'Noun',
                sentence: 'Yash used a <strong>hoe</strong> to remove the weeds from the flower bed.',
                sentenceHi: 'यश ने फूलों की क्यारी से खरपतवार हटाने के लिए <strong>कुदाली</strong> का इस्तेमाल किया।',
                synonyms: ['Digger', 'Mattock'],
                antonyms: [],
                extraInfo: 'Hoe is a Noun. It is a gardening tool with a long handle and a flat blade, used for weeding and breaking up soil.',
                extraInfoHi: 'Hoe (कुदाली) एक संज्ञा है। यह एक बागवानी का औजार है जिसमें लंबा हत्था और सपाट ब्लेड होती है, जो खरपतवार निकालने और मिट्टी तोड़ने के लिए इस्तेमाल होती है।'
            },
            'farm tool/turn soil': {
                actualWord: 'Plough',
                pos: 'Noun/Verb',
                sentence: '<strong>As a Noun:</strong> The farmer attached the <strong>plough</strong> to his tractor.<br><strong>As a Verb:</strong> Stuti watched the oxen <strong>plough</strong> the field before the rain came.',
                sentenceHi: '<strong>संज्ञा के रूप में:</strong> किसान ने अपने ट्रैक्टर में <strong>हल</strong> लगाया।<br><strong>क्रिया के रूप में:</strong> स्तुति ने बारिश आने से पहले बैलों को खेत <strong>जोतते</strong> देखा।',
                synonyms: ['Tiller', 'Till'],
                antonyms: [],
                extraInfo: 'Plough can be a Noun (a large farming tool pulled by a tractor or animals to turn the soil) or a Verb (to turn up the earth with a plough).',
                extraInfoHi: 'Plough एक संज्ञा (ट्रैक्टर या जानवरों द्वारा खींचा जाने वाला बड़ा खेती का औजार - हल) या क्रिया (हल से जमीन जोतना) हो सकता है।'
            },

            // === VOCABULARY GATHRI 9 ANSWERS ===
            'bunch/cluster': {
                actualWord: 'Clump',
                pos: 'Noun',
                sentence: 'Ankit found a <strong>clump</strong> of trees where he could sit in the shade.',
                sentenceHi: 'अंकित को पेड़ों का एक <strong>झुंड</strong> मिला जहां वह छाया में बैठ सकता था।',
                synonyms: ['Bunch', 'Cluster'],
                antonyms: ['Individual', 'Single'],
                extraInfo: 'Clump is a Noun. It refers to a small group of things or people clustered together.',
                extraInfoHi: 'Clump (गुच्छा/समूह) एक संज्ञा है। इसका मतलब है चीजों या लोगों का छोटा समूह जो एक साथ इकट्ठा हो।'
            },
            'pollution/impurity': {
                actualWord: 'Contamination',
                pos: 'Noun',
                sentence: 'Hari Kishan boiled the water to remove any <strong>contamination</strong> before drinking.',
                sentenceHi: 'हरी किशन ने पीने से पहले पानी को उबालकर किसी भी <strong>मिलावट</strong> को हटाया।',
                synonyms: ['Pollution', 'Infection'],
                antonyms: ['Purification', 'Cleaning'],
                extraInfo: 'Contamination is a Noun. It is the action of making something impure or harmful by adding dirt or chemicals.',
                extraInfoHi: 'Contamination (दूषित करना/मिलावट) एक संज्ञा है। यह गंदगी या रसायन मिलाकर किसी चीज को अशुद्ध या हानिकारक बनाने की क्रिया है।'
            },
            'dispute/debate': {
                actualWord: 'Controversy',
                pos: 'Noun',
                sentence: 'There was a big <strong>controversy</strong> in the class about who broke the window, Adarsh or the wind.',
                sentenceHi: 'कक्षा में बड़ा <strong>विवाद</strong> था कि खिड़की किसने तोड़ी, आदर्श ने या हवा ने।',
                synonyms: ['Dispute', 'Argument'],
                antonyms: ['Agreement', 'Harmony'],
                extraInfo: 'Controversy is a Noun. It is a prolonged public disagreement or heated discussion.',
                extraInfoHi: 'Controversy (विवाद) एक संज्ञा है। यह लंबी सार्वजनिक असहमति या गरमागरम चर्चा है।'
            },
            'ignite/flash': {
                actualWord: 'Spark',
                pos: 'Noun/Verb',
                sentence: '<strong>As a Noun:</strong> A tiny <strong>spark</strong> from the matchstick started the fire.<br><strong>As a Verb:</strong> The small fight between friends threatened to <strong>spark</strong> a bigger argument for Ladli.',
                sentenceHi: '<strong>संज्ञा के रूप में:</strong> माचिस की एक छोटी <strong>चिंगारी</strong> से आग लग गई।<br><strong>क्रिया के रूप में:</strong> दोस्तों के बीच छोटी लड़ाई लाडली के लिए बड़ा झगड़ा <strong>भड़काने</strong> की धमकी दे रही थी।',
                synonyms: ['Flash', 'Ignite'],
                antonyms: ['Extinguish'],
                extraInfo: 'Spark can be a Noun (a small fiery particle thrown off from a fire) or a Verb (to ignite or start something suddenly).',
                extraInfoHi: 'Spark एक संज्ञा (आग से निकलने वाला छोटा अग्नि कण - चिंगारी) या क्रिया (अचानक कुछ शुरू करना या भड़काना) हो सकता है।'
            },
            'burst out/explode': {
                actualWord: 'Erupt',
                pos: 'Verb',
                sentence: 'Aniket Kumar saw the volcano <strong>erupt</strong> in the movie.',
                sentenceHi: 'अनिकेत कुमार ने फिल्म में ज्वालामुखी को <strong>फटते</strong> देखा।',
                synonyms: ['Explode', 'Burst'],
                antonyms: ['Subside', 'Calm'],
                extraInfo: 'Erupt is a Verb. It means to break out suddenly and dramatically (like a volcano or anger).',
                extraInfoHi: 'Erupt (भड़क जाना/फटना) एक क्रिया है। इसका मतलब है अचानक और नाटकीय रूप से फूटना (जैसे ज्वालामुखी या गुस्सा)।'
            },
            'sudden start': {
                actualWord: 'Outbreak',
                pos: 'Noun',
                sentence: 'Doctors worked hard to stop the <strong>outbreak</strong> of the flu in Shivshant\'s village.',
                sentenceHi: 'डॉक्टरों ने शिवशांत के गांव में फ्लू के <strong>प्रकोप</strong> को रोकने के लिए कड़ी मेहनत की।',
                synonyms: ['Eruption', 'Epidemic'],
                antonyms: ['Conclusion', 'End'],
                extraInfo: 'Outbreak is a Noun. It refers to the sudden start of something unwelcome, like war or disease.',
                extraInfoHi: 'Outbreak (प्रकोप/आरंभ) एक संज्ञा है। इसका मतलब है किसी अनचाही चीज की अचानक शुरुआत, जैसे युद्ध या बीमारी।'
            },
            'serious/harsh': {
                actualWord: 'Severe',
                pos: 'Adjective',
                sentence: 'Divanshi had a <strong>severe</strong> headache and could not come to school.',
                sentenceHi: 'दिवांशी को <strong>गंभीर</strong> सिरदर्द था और वह स्कूल नहीं आ सकी।',
                synonyms: ['Critical', 'Harsh'],
                antonyms: ['Mild', 'Gentle'],
                extraInfo: 'Severe is an Adjective. It describes something very intense, strict, or bad.',
                extraInfoHi: 'Severe (गंभीर/खतरनाक) एक विशेषण है। यह बहुत तीव्र, सख्त या बुरी चीज को बताता है।'
            },
            'most bad': {
                actualWord: 'Worst',
                pos: 'Adjective',
                sentence: 'Losing his favorite cricket bat was the <strong>worst</strong> feeling for Sakshi 2\'s brother.',
                sentenceHi: 'अपना पसंदीदा क्रिकेट बैट खोना साक्षी 2 के भाई के लिए <strong>सबसे बुरा</strong> अनुभव था।',
                synonyms: ['Poorest', 'Lowest'],
                antonyms: ['Best', 'Finest'],
                extraInfo: 'Worst is an Adjective. It means of the poorest quality or the most unpleasant thing.',
                extraInfoHi: 'Worst (सबसे बुरा) एक विशेषण है। इसका मतलब है सबसे खराब गुणवत्ता वाला या सबसे अप्रिय चीज।'
            },
            'sharp/severe': {
                actualWord: 'Acute',
                pos: 'Adjective',
                sentence: 'There was an <strong>acute</strong> shortage of water in the city, so Vipin used it carefully.',
                sentenceHi: 'शहर में पानी की <strong>गंभीर</strong> कमी थी, इसलिए विपिन ने इसे सावधानी से इस्तेमाल किया।',
                synonyms: ['Sharp', 'Critical'],
                antonyms: ['Mild', 'Dull'],
                extraInfo: 'Acute is an Adjective. It describes something present or experienced to a severe or intense degree (often used for pain or shortage).',
                extraInfoHi: 'Acute (तेज/गंभीर) एक विशेषण है। यह ऐसी चीज को बताता है जो गंभीर या तीव्र स्तर पर मौजूद हो (अक्सर दर्द या कमी के लिए उपयोग)।'
            },
            'sudden increase/rush': {
                actualWord: 'Surge',
                pos: 'Noun/Verb',
                sentence: '<strong>As a Noun:</strong> There was a sudden <strong>surge</strong> in the price of onions at the market.<br><strong>As a Verb:</strong> Madhu felt hope <strong>surge</strong> in her heart when she saw the exam results.',
                sentenceHi: '<strong>संज्ञा के रूप में:</strong> बाजार में प्याज की कीमत में अचानक <strong>वृद्धि</strong> हुई।<br><strong>क्रिया के रूप में:</strong> परीक्षा परिणाम देखकर मधु के दिल में उम्मीद <strong>उमड़</strong> आई।',
                synonyms: ['Rush', 'Rise'],
                antonyms: ['Drop', 'Decline'],
                extraInfo: 'Surge can be a Noun (a sudden powerful forward or upward movement) or a Verb (to increase suddenly and powerfully).',
                extraInfoHi: 'Surge एक संज्ञा (अचानक शक्तिशाली आगे या ऊपर की गति - वृद्धि) या क्रिया (अचानक और शक्तिशाली रूप से बढ़ना - उमड़ना) हो सकता है।'
            },
            'demand/assert': {
                actualWord: 'Claim',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> Kishan likes to <strong>claim</strong> that he is the fastest runner in school.<br><strong>As a Noun:</strong> The teacher investigated the <strong>claim</strong> that the homework was too difficult.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> किशन <strong>दावा</strong> करना पसंद करता है कि वह स्कूल में सबसे तेज धावक है।<br><strong>संज्ञा के रूप में:</strong> शिक्षक ने उस <strong>दावे</strong> की जांच की कि होमवर्क बहुत कठिन था।',
                synonyms: ['Assert', 'Demand'],
                antonyms: ['Deny', 'Reject'],
                extraInfo: 'Claim can be a Verb (to state that something is the case, typically without providing proof yet) or a Noun (an assertion of the truth of something).',
                extraInfoHi: 'Claim एक क्रिया (यह कहना कि कुछ सच है, आमतौर पर बिना सबूत दिए - दावा करना) या संज्ञा (किसी बात की सच्चाई का दावा) हो सकता है।'
            },
            'happen': {
                actualWord: 'Occur',
                pos: 'Verb',
                sentence: 'Accidents often <strong>occur</strong> when people drive too fast, Anshika noted.',
                sentenceHi: 'अंशिका ने नोट किया कि जब लोग बहुत तेज गाड़ी चलाते हैं तो अक्सर दुर्घटनाएं <strong>होती</strong> हैं।',
                synonyms: ['Happen', 'Take place'],
                antonyms: ['Prevent', 'Stop'],
                extraInfo: 'Occur is a Verb. It means to happen or take place.',
                extraInfoHi: 'Occur (घटित होना) एक क्रिया है। इसका मतलब है होना या घटित होना।'
            },
            'death by accident': {
                actualWord: 'Fatality',
                pos: 'Noun',
                sentence: 'Fortunately, there was no <strong>fatality</strong> in the bus accident, Shivansh told his parents.',
                sentenceHi: 'सौभाग्य से, बस दुर्घटना में कोई <strong>मौत</strong> नहीं हुई, शिवांश ने अपने माता-पिता को बताया।',
                synonyms: ['Death', 'Casualty'],
                antonyms: ['Survival', 'Birth'],
                extraInfo: 'Fatality is a Noun. It refers to an occurrence of death by accident, in war, or from disease.',
                extraInfoHi: 'Fatality (मौत/मृत्यु) एक संज्ञा है। इसका मतलब है दुर्घटना, युद्ध या बीमारी से मृत्यु की घटना।'
            },
            'doubt/mistrust': {
                actualWord: 'Suspicion',
                pos: 'Noun',
                sentence: 'Yash looked at the broken vase with <strong>suspicion</strong>, thinking the cat did it.',
                sentenceHi: 'यश ने टूटी हुई फूलदान को <strong>संदेह</strong> से देखा, सोचते हुए कि बिल्ली ने किया।',
                synonyms: ['Doubt', 'Distrust'],
                antonyms: ['Trust', 'Certainty'],
                extraInfo: 'Suspicion is a Noun. It is a feeling that someone is guilty of doing something wrong or that something is not right.',
                extraInfoHi: 'Suspicion (संदेह/शक) एक संज्ञा है। यह एक भावना है कि कोई गलत काम करने का दोषी है या कुछ ठीक नहीं है।'
            },
            'fee/count': {
                actualWord: 'Toll',
                pos: 'Noun',
                sentence: '<strong>Fee:</strong> Stuti\'s father stopped the car to pay the <strong>toll</strong> at the highway gate.<br><strong>Count:</strong> The death <strong>toll</strong> from the earthquake was very high, which made everyone sad.',
                sentenceHi: '<strong>शुल्क:</strong> स्तुति के पिता ने हाईवे गेट पर <strong>टोल</strong> देने के लिए गाड़ी रोकी।<br><strong>संख्या:</strong> भूकंप से मृत्यु की <strong>संख्या</strong> बहुत अधिक थी, जिससे सभी दुखी हुए।',
                synonyms: ['Tax', 'Tally'],
                antonyms: ['Free entry'],
                extraInfo: 'Toll is a Noun with two common meanings: 1. Fee: Money paid to use a bridge or road. 2. Count: The number of deaths or casualties from an accident or disaster.',
                extraInfoHi: 'Toll एक संज्ञा है जिसके दो सामान्य अर्थ हैं: 1. शुल्क: पुल या सड़क इस्तेमाल करने के लिए दिया गया पैसा। 2. संख्या: दुर्घटना या आपदा से मौतों या हताहतों की गिनती।'
            },

            // === VOCABULARY GATHRI 10 ANSWERS ===
            'starting/beginning': {
                actualWord: 'Initial',
                pos: 'Adjective',
                sentence: 'Ankit faced some <strong>initial</strong> problems in math, but now he is an expert.',
                sentenceHi: 'अंकित को गणित में कुछ <strong>शुरुआती</strong> समस्याओं का सामना करना पड़ा, लेकिन अब वह विशेषज्ञ है।',
                synonyms: ['First', 'Beginning'],
                antonyms: ['Final', 'Last'],
                extraInfo: 'Initial is an Adjective. It refers to something that happens at the very beginning.',
                extraInfoHi: 'Initial (शुरुआती) एक विशेषण है। यह उस चीज को संदर्भित करता है जो बिल्कुल शुरुआत में होती है।'
            },
            'blame/charge': {
                actualWord: 'Accuse',
                pos: 'Verb',
                sentence: 'It is wrong to <strong>accuse</strong> Hari Kishan of stealing without any proof.',
                sentenceHi: 'बिना किसी सबूत के हरी किशन पर चोरी का <strong>आरोप लगाना</strong> गलत है।',
                synonyms: ['Blame', 'Charge'],
                antonyms: ['Defend', 'Praise'],
                extraInfo: 'Accuse is a Verb. It means to say that someone has done something wrong or illegal.',
                extraInfoHi: 'Accuse (आरोप लगाना) एक क्रिया है। इसका मतलब है किसी के बारे में कहना कि उसने कुछ गलत या अवैध किया है।'
            },
            'late/postpone': {
                actualWord: 'Delay',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> Heavy rain might <strong>delay</strong> the school bus today.<br><strong>As a Noun:</strong> Adarsh apologized for the <strong>delay</strong> in submitting his homework.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> भारी बारिश आज स्कूल बस को <strong>देर</strong> करा सकती है।<br><strong>संज्ञा के रूप में:</strong> आदर्श ने अपना होमवर्क जमा करने में <strong>देरी</strong> के लिए माफी मांगी।',
                synonyms: ['Postpone', 'Lateness'],
                antonyms: ['Rush', 'Punctuality'],
                extraInfo: 'Delay can be a Verb (to make something late or slow) or a Noun (a period of time by which something is late).',
                extraInfoHi: 'Delay एक क्रिया (किसी चीज को देर या धीमा करना) या संज्ञा (वह समय जितनी देर कुछ हुआ - देरी/विलंब) हो सकता है।'
            },
            'responsibility/answerability': {
                actualWord: 'Accountability',
                pos: 'Noun',
                sentence: 'As the class monitor, Ladli took full <strong>accountability</strong> for maintaining silence.',
                sentenceHi: 'क्लास मॉनिटर के रूप में, लाडली ने शांति बनाए रखने की पूरी <strong>जवाबदेही</strong> ली।',
                synonyms: ['Responsibility', 'Liability'],
                antonyms: ['Irresponsibility'],
                extraInfo: 'Accountability is a Noun. It means being responsible for your actions and willing to explain them.',
                extraInfoHi: 'Accountability (जवाबदेही) एक संज्ञा है। इसका मतलब है अपने कार्यों के लिए जिम्मेदार होना और उन्हें समझाने के लिए तैयार रहना।'
            },
            'speak with pauses': {
                actualWord: 'Stammer',
                pos: 'Verb',
                sentence: 'Aniket Kumar used to <strong>stammer</strong> when he was nervous, but now he speaks clearly.',
                sentenceHi: 'अनिकेत कुमार घबराने पर <strong>हकलाता</strong> था, लेकिन अब वह साफ बोलता है।',
                synonyms: ['Stutter', 'Hesitate'],
                antonyms: ['Speak fluently'],
                extraInfo: 'Stammer is a Verb. It means to speak with sudden pauses and a tendency to repeat the initial letters of words.',
                extraInfoHi: 'Stammer (हकलाना) एक क्रिया है। इसका मतलब है अचानक रुककर बोलना और शब्दों के शुरुआती अक्षरों को दोहराने की प्रवृत्ति।'
            },
            'sudden fear': {
                actualWord: 'Panic',
                pos: 'Noun/Verb',
                sentence: '<strong>As a Noun:</strong> There was a state of <strong>panic</strong> when the fire alarm rang.<br><strong>As a Verb:</strong> "Don\'t <strong>panic</strong>, it\'s just a small spider," said Shivshant.',
                sentenceHi: '<strong>संज्ञा के रूप में:</strong> जब फायर अलार्म बजा तो <strong>हड़कंप</strong> मच गया।<br><strong>क्रिया के रूप में:</strong> "मत <strong>घबराओ</strong>, यह बस एक छोटी मकड़ी है," शिवशांत ने कहा।',
                synonyms: ['Fear', 'Alarm'],
                antonyms: ['Calm', 'Confidence'],
                extraInfo: 'Panic can be a Noun (a sudden feeling of fear that prevents reasonable thought) or a Verb (to feel sudden uncontrollable fear).',
                extraInfoHi: 'Panic एक संज्ञा (अचानक डर की भावना जो तर्कसंगत सोच को रोकती है - हड़कंप) या क्रिया (अचानक बेकाबू डर महसूस करना - घबराना) हो सकता है।'
            },
            'come out/appear': {
                actualWord: 'Emerge',
                pos: 'Verb',
                sentence: 'Divanshi watched the sun <strong>emerge</strong> from behind the clouds.',
                sentenceHi: 'दिवांशी ने सूरज को बादलों के पीछे से <strong>उभरते</strong> देखा।',
                synonyms: ['Appear', 'Arise'],
                antonyms: ['Disappear', 'Vanish'],
                extraInfo: 'Emerge is a Verb. It means to move out of something and become visible.',
                extraInfoHi: 'Emerge (प्रकट होना/उभरना) एक क्रिया है। इसका मतलब है किसी चीज से बाहर आना और दिखाई देना।'
            },
            'declare/condition': {
                actualWord: 'State',
                pos: 'Verb/Noun',
                sentence: '<strong>As a Verb:</strong> The teacher asked Sakshi 2 to <strong>state</strong> her reason for being late.<br><strong>As a Noun:</strong> Water is in a liquid <strong>state</strong>.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> शिक्षक ने साक्षी 2 से देर से आने का कारण <strong>बताने</strong> को कहा।<br><strong>संज्ञा के रूप में:</strong> पानी तरल <strong>अवस्था</strong> में है।',
                synonyms: ['Declare', 'Condition'],
                antonyms: ['Conceal'],
                extraInfo: 'State can be a Verb (to say or declare something formally) or a Noun (the condition of someone OR a territory like UP).',
                extraInfoHi: 'State एक क्रिया (औपचारिक रूप से कुछ कहना या घोषित करना - बताना) या संज्ञा (किसी की स्थिति या क्षेत्र जैसे UP - दशा/राज्य) हो सकता है।'
            },
            'press firmly': {
                actualWord: 'Squeeze',
                pos: 'Verb',
                sentence: 'Vipin helped his mother <strong>squeeze</strong> lemons to make juice.',
                sentenceHi: 'विपिन ने जूस बनाने के लिए अपनी माँ को नींबू <strong>निचोड़ने</strong> में मदद की।',
                synonyms: ['Press', 'Crush'],
                antonyms: ['Release', 'Expand'],
                extraInfo: 'Squeeze is a Verb. It means to firmly press something, usually with your fingers or hands.',
                extraInfoHi: 'Squeeze (दबाना/निचोड़ना) एक क्रिया है। इसका मतलब है किसी चीज को मजबूती से दबाना, आमतौर पर अपनी उंगलियों या हाथों से।'
            },
            'formal event/function': {
                actualWord: 'Ceremony',
                pos: 'Noun',
                sentence: 'Madhu wore a new dress for the prize distribution <strong>ceremony</strong>.',
                sentenceHi: 'मधु ने पुरस्कार वितरण <strong>समारोह</strong> के लिए नई ड्रेस पहनी।',
                synonyms: ['Function', 'Event'],
                antonyms: [],
                extraInfo: 'Ceremony is a Noun. It is a formal religious or public occasion, typically celebrating a particular event.',
                extraInfoHi: 'Ceremony (समारोह) एक संज्ञा है। यह एक औपचारिक धार्मिक या सार्वजनिक अवसर है, आमतौर पर किसी विशेष घटना का जश्न मनाना।'
            },
            'aim/goal': {
                actualWord: 'Purpose',
                pos: 'Noun',
                sentence: 'The main <strong>purpose</strong> of this class is to help Kishan learn English.',
                sentenceHi: 'इस कक्षा का मुख्य <strong>उद्देश्य</strong> किशन को अंग्रेजी सीखने में मदद करना है।',
                synonyms: ['Goal', 'Objective'],
                antonyms: [],
                extraInfo: 'Purpose is a Noun. It is the reason for which something is done or created; an aim or goal.',
                extraInfoHi: 'Purpose (उद्देश्य) एक संज्ञा है। यह वह कारण है जिसके लिए कुछ किया या बनाया जाता है; एक लक्ष्य।'
            },
            'stubborn/firm': {
                actualWord: 'Adamant',
                pos: 'Adjective',
                sentence: 'Anshika was <strong>adamant</strong> that she would finish the puzzle without any help.',
                sentenceHi: 'अंशिका <strong>अड़ी</strong> थी कि वह बिना किसी मदद के पहेली पूरी करेगी।',
                synonyms: ['Stubborn', 'Rigid'],
                antonyms: ['Flexible', 'Agreeable'],
                extraInfo: 'Adamant is an Adjective. It describes someone who refuses to change their mind or be persuaded.',
                extraInfoHi: 'Adamant (जिद्दी/अडिग) एक विशेषण है। यह उस व्यक्ति को बताता है जो अपना मन बदलने या राजी होने से मना करता है।'
            },
            'supposedly/reportedly': {
                actualWord: 'Allegedly',
                pos: 'Adverb',
                sentence: 'The man <strong>allegedly</strong> stole the bicycle, but Shivansh wasn\'t sure if it was true.',
                sentenceHi: 'आदमी ने <strong>कथित तौर पर</strong> साइकिल चुराई, लेकिन शिवांश को यकीन नहीं था कि यह सच है।',
                synonyms: ['Supposedly', 'Reportedly'],
                antonyms: ['Definitely', 'Proven'],
                extraInfo: 'Allegedly is an Adverb. It is used to convey that something is claimed to be true although there is no proof yet.',
                extraInfoHi: 'Allegedly (कथित तौर पर) एक क्रियाविशेषण है। इसका उपयोग यह बताने के लिए किया जाता है कि कुछ सच होने का दावा किया गया है हालांकि अभी कोई सबूत नहीं है।'
            },
            'religious custom': {
                actualWord: 'Ritual',
                pos: 'Noun',
                sentence: 'Lighting a lamp in the evening is a daily <strong>ritual</strong> in Yash\'s house.',
                sentenceHi: 'शाम को दीया जलाना यश के घर में रोजाना की <strong>रस्म</strong> है।',
                synonyms: ['Ceremony', 'Custom'],
                antonyms: [],
                extraInfo: 'Ritual is a Noun. It is a religious or solemn ceremony consisting of a series of actions performed according to a prescribed order.',
                extraInfoHi: 'Ritual (रस्म/धार्मिक संस्कार) एक संज्ञा है। यह एक धार्मिक या गंभीर समारोह है जिसमें निर्धारित क्रम में कार्यों की श्रृंखला होती है।'
            },
            'interference/involvement': {
                actualWord: 'Intervention',
                pos: 'Noun',
                sentence: 'The teacher\'s timely <strong>intervention</strong> stopped the fight between the two boys, allowing Stuti to study in peace.',
                sentenceHi: 'शिक्षक के समय पर <strong>हस्तक्षेप</strong> ने दो लड़कों के बीच लड़ाई रोक दी, जिससे स्तुति शांति से पढ़ सकी।',
                synonyms: ['Involvement', 'Interference'],
                antonyms: ['Ignoring', 'Non-interference'],
                extraInfo: 'Intervention is a Noun. It is the action of becoming intentionally involved in a difficult situation to improve it or prevent it from getting worse.',
                extraInfoHi: 'Intervention (हस्तक्षेप) एक संज्ञा है। यह जानबूझकर किसी कठिन स्थिति में शामिल होने की क्रिया है ताकि उसे सुधारा जा सके या बदतर होने से रोका जा सके।'
            },

            // === VOCABULARY GATHRI 11 ANSWERS ===
            'convey/show': {
                actualWord: 'Express',
                pos: 'Verb',
                sentence: 'Shivansh wrote a letter to <strong>express</strong> his thanks to the teacher.',
                sentenceHi: 'शिवांश ने शिक्षक को धन्यवाद <strong>व्यक्त</strong> करने के लिए एक पत्र लिखा।',
                synonyms: ['Convey', 'Show'],
                antonyms: ['Hide', 'Conceal'],
                extraInfo: 'Express is a Verb. It means to show your feelings, thoughts, or ideas to others.',
                extraInfoHi: 'Express (व्यक्त करना) एक क्रिया है। इसका मतलब है अपनी भावनाओं, विचारों या विचारों को दूसरों को दिखाना।'
            },
            'hurt/wound': {
                actualWord: 'Injury',
                pos: 'Noun',
                sentence: 'Yash had a leg <strong>injury</strong>, so he could not play cricket today.',
                sentenceHi: 'यश को पैर में <strong>चोट</strong> थी, इसलिए वह आज क्रिकेट नहीं खेल सका।',
                synonyms: ['Wound', 'Harm'],
                antonyms: ['Healing', 'Cure'],
                extraInfo: 'Injury is a Noun. It refers to physical harm or damage to the body.',
                extraInfoHi: 'Injury (चोट) एक संज्ञा है। यह शरीर को शारीरिक नुकसान या क्षति को संदर्भित करता है।'
            },
            'cause destruction': {
                actualWord: 'Wreak Havoc',
                pos: 'Phrase',
                sentence: 'The heavy rain will <strong>wreak havoc</strong> on the farmers\' crops, Stuti worried.',
                sentenceHi: 'भारी बारिश किसानों की फसलों पर <strong>तबाही मचाएगी</strong>, स्तुति चिंतित थी।',
                synonyms: ['Damage', 'Destroy'],
                antonyms: ['Fix', 'Restore'],
                extraInfo: 'Wreak Havoc is a Phrase. It means to cause a lot of damage, destruction, or confusion.',
                extraInfoHi: 'Wreak Havoc (तबाही मचाना) एक वाक्यांश है। इसका मतलब है बहुत नुकसान, विनाश या भ्रम पैदा करना।'
            },
            'total confusion': {
                actualWord: 'Chaos',
                pos: 'Noun',
                sentence: 'There was total <strong>chaos</strong> in the market when the bull started running, said Sakshi 1.',
                sentenceHi: 'जब सांड दौड़ने लगा तो बाजार में पूरी <strong>अफरा-तफरी</strong> मच गई, साक्षी 1 ने कहा।',
                synonyms: ['Disorder', 'Confusion'],
                antonyms: ['Order', 'Calm'],
                extraInfo: 'Chaos is a Noun. It is a state of complete confusion and disorder.',
                extraInfoHi: 'Chaos (अव्यवस्था/गड़बड़ी) एक संज्ञा है। यह पूर्ण भ्रम और अव्यवस्था की स्थिति है।'
            },
            'parade/march': {
                actualWord: 'Procession',
                pos: 'Noun',
                sentence: 'Sunil watched the wedding <strong>procession</strong> pass by his house with music and dance.',
                sentenceHi: 'सुनील ने शादी का <strong>जुलूस</strong> संगीत और नृत्य के साथ अपने घर के पास से गुजरते देखा।',
                synonyms: ['Parade', 'March'],
                antonyms: [],
                extraInfo: 'Procession is a Noun. It is a line of people or vehicles moving forward as part of a ceremony or festival.',
                extraInfoHi: 'Procession (जुलूस/रैली) एक संज्ञा है। यह समारोह या त्योहार के हिस्से के रूप में आगे बढ़ने वाले लोगों या वाहनों की पंक्ति है।'
            },
            'repeat aloud/chant': {
                actualWord: 'Recite',
                pos: 'Verb',
                sentence: 'The teacher asked Palak to <strong>recite</strong> the poem in front of the class.',
                sentenceHi: 'शिक्षक ने पलक से कक्षा के सामने कविता <strong>सुनाने</strong> को कहा।',
                synonyms: ['Chant', 'Repeat'],
                antonyms: [],
                extraInfo: 'Recite is a Verb. It means to repeat something aloud from memory (like a poem) or to chant prayers.',
                extraInfoHi: 'Recite (सुनाना/जपना) एक क्रिया है। इसका मतलब है याद से कुछ जोर से दोहराना (जैसे कविता) या प्रार्थना जपना।'
            },
            'place of event': {
                actualWord: 'Venue',
                pos: 'Noun',
                sentence: 'Anurag reached the <strong>venue</strong> early to get a good seat for the show.',
                sentenceHi: 'अनुराग शो के लिए अच्छी सीट पाने के लिए <strong>स्थान</strong> पर जल्दी पहुंच गया।',
                synonyms: ['Location', 'Site'],
                antonyms: [],
                extraInfo: 'Venue is a Noun. It is the place where an organized event (like a match, concert, or wedding) happens.',
                extraInfoHi: 'Venue (कार्यक्रम का स्थान) एक संज्ञा है। यह वह जगह है जहां कोई संगठित कार्यक्रम (जैसे मैच, कॉन्सर्ट, या शादी) होता है।'
            },
            'holy place': {
                actualWord: 'Shrine',
                pos: 'Noun',
                sentence: 'Suraj visited the famous <strong>shrine</strong> to offer flowers and pray.',
                sentenceHi: 'सूरज ने फूल चढ़ाने और प्रार्थना करने के लिए प्रसिद्ध <strong>मंदिर</strong> का दौरा किया।',
                synonyms: ['Temple', 'Holy place'],
                antonyms: [],
                extraInfo: 'Shrine is a Noun. It is a holy place dedicated to a specific deity, ancestor, or hero.',
                extraInfoHi: 'Shrine (मंदिर/पवित्र स्थान) एक संज्ञा है। यह किसी विशेष देवता, पूर्वज या नायक को समर्पित एक पवित्र स्थान है।'
            },
            'change appearance/mask': {
                actualWord: 'Disguise',
                pos: 'Verb/Noun',
                sentence: 'Khushboo wore a beard as a <strong>disguise</strong> for the school play.',
                sentenceHi: 'खुशबू ने स्कूल नाटक के लिए <strong>भेष बदलने</strong> के लिए दाढ़ी लगाई।',
                synonyms: ['Mask', 'Camouflage'],
                antonyms: ['Reveal', 'Unmask'],
                extraInfo: 'Disguise is a Verb or Noun. It means to change your appearance so no one recognizes you.',
                extraInfoHi: 'Disguise (भेष बदलना) एक क्रिया या संज्ञा है। इसका मतलब है अपनी दिखावट बदलना ताकि कोई आपको पहचान न सके।'
            },
            'go to see': {
                actualWord: 'Visit',
                pos: 'Verb',
                sentence: 'Vivek plans to <strong>visit</strong> his grandmother in the village this Sunday.',
                sentenceHi: 'विवेक इस रविवार गांव में अपनी दादी से <strong>मिलने जाने</strong> की योजना बना रहा है।',
                synonyms: ['Call on', 'Go to'],
                antonyms: ['Ignore', 'Avoid'],
                extraInfo: 'Visit is a Verb. It means to go to see a person or a place for a period of time.',
                extraInfoHi: 'Visit (मिलने जाना) एक क्रिया है। इसका मतलब है किसी व्यक्ति या स्थान को कुछ समय के लिए देखने जाना।'
            },
            'deny/reject': {
                actualWord: 'Refuse',
                pos: 'Verb',
                sentence: 'Anshit had to <strong>refuse</strong> the ice cream because he had a cold.',
                sentenceHi: 'अंशित को आइसक्रीम <strong>मना करनी</strong> पड़ी क्योंकि उसे सर्दी थी।',
                synonyms: ['Reject', 'Decline'],
                antonyms: ['Accept', 'Agree'],
                extraInfo: 'Refuse is a Verb. It means to say no to a request or offer.',
                extraInfoHi: 'Refuse (इनकार/अस्वीकार करना) एक क्रिया है। इसका मतलब है किसी अनुरोध या प्रस्ताव को ना कहना।'
            },
            'finally/in the end': {
                actualWord: 'Eventually',
                pos: 'Adverb',
                sentence: 'After trying for hours, Anshika <strong>eventually</strong> solved the hard math problem.',
                sentenceHi: 'घंटों कोशिश करने के बाद, अंशिका ने <strong>अंततः</strong> कठिन गणित का सवाल हल कर लिया।',
                synonyms: ['Finally', 'Ultimately'],
                antonyms: ['Immediately', 'Never'],
                extraInfo: 'Eventually is an Adverb. It means in the end, especially after a long delay or series of problems.',
                extraInfoHi: 'Eventually (अंततः) एक क्रियाविशेषण है। इसका मतलब है अंत में, विशेष रूप से लंबी देरी या समस्याओं की श्रृंखला के बाद।'
            },
            'tease/fake': {
                actualWord: 'Mock',
                pos: 'Verb/Adjective',
                sentence: '<strong>As a Verb:</strong> "Do not <strong>mock</strong> others for their mistakes," the teacher told Anchal.<br><strong>As an Adjective:</strong> Anchal scored full marks in the <strong>mock</strong> exam.',
                sentenceHi: '<strong>क्रिया के रूप में:</strong> "दूसरों की गलतियों पर <strong>मजाक</strong> मत उड़ाओ," शिक्षक ने अंचल से कहा।<br><strong>विशेषण के रूप में:</strong> अंचल ने <strong>नकली</strong> परीक्षा में पूरे अंक प्राप्त किए।',
                synonyms: ['Tease', 'Fake'],
                antonyms: ['Praise', 'Real'],
                extraInfo: 'Mock can be a Verb (to tease or laugh at someone in an unkind way) or an Adjective (not real; for practice, e.g., Mock Test).',
                extraInfoHi: 'Mock एक क्रिया (किसी का बुरे तरीके से मजाक उड़ाना) या विशेषण (असली नहीं; अभ्यास के लिए, जैसे Mock Test - दिखावटी) हो सकता है।'
            },
            'illegal payment': {
                actualWord: 'Bribe',
                pos: 'Noun',
                sentence: 'Divansh knows that offering a <strong>bribe</strong> to a police officer is a crime.',
                sentenceHi: 'दिवांश जानता है कि पुलिस अधिकारी को <strong>रिश्वत</strong> देना अपराध है।',
                synonyms: ['Payoff', 'Kickback'],
                antonyms: [],
                extraInfo: 'Bribe is a Noun. It is money or a gift given illegally to persuade someone to do something for you.',
                extraInfoHi: 'Bribe (घूस/रिश्वत) एक संज्ञा है। यह किसी को आपके लिए कुछ करने के लिए राजी करने के लिए अवैध रूप से दिया गया पैसा या उपहार है।'
            },
            'neglect of duty': {
                actualWord: 'Dereliction',
                pos: 'Noun',
                sentence: 'The guard was punished for <strong>dereliction</strong> of duty because he slept while working, Suraj Yadav learned.',
                sentenceHi: 'गार्ड को <strong>कर्तव्य की अवहेलना</strong> के लिए दंडित किया गया क्योंकि वह काम करते समय सो गया था, सूरज यादव ने सीखा।',
                synonyms: ['Negligence', 'Failure'],
                antonyms: ['Diligence', 'Care'],
                extraInfo: 'Dereliction is a Noun. It is the shameful failure to fulfill one\'s obligations or duties.',
                extraInfoHi: 'Dereliction (कर्तव्य का त्याग) एक संज्ञा है। यह अपने दायित्वों या कर्तव्यों को पूरा करने में शर्मनाक विफलता है।'
            },

            // === VOCABULARY GATHRI 12 ANSWERS ===
            'conflict/fight': {
                actualWord: 'Clash',
                pos: 'Noun/Verb',
                sentence: 'There was a violent <strong>clash</strong> between the two groups in the market, Ankit reported.',
                sentenceHi: 'बाजार में दो समूहों के बीच हिंसक <strong>टकराव</strong> हुआ, अंकित ने बताया।',
                synonyms: ['Conflict', 'Fight'],
                antonyms: ['Agreement', 'Harmony'],
                extraInfo: 'Clash is a Noun or Verb. It means a violent confrontation or a strong disagreement.',
                extraInfoHi: 'Clash (टकराव/लड़ाई) एक संज्ञा या क्रिया है। इसका मतलब है हिंसक टकराव या गंभीर असहमति।'
            },
            'increase rapidly': {
                actualWord: 'Escalate',
                pos: 'Verb',
                sentence: 'The small argument between friends started to <strong>escalate</strong> into a big fight, so Hari Kishan stopped it.',
                sentenceHi: 'दोस्तों के बीच छोटा सा तर्क एक बड़ी लड़ाई में <strong>बढ़ने</strong> लगा, इसलिए हरी किशन ने इसे रोक दिया।',
                synonyms: ['Intensify', 'Rise'],
                antonyms: ['Decrease', 'De-escalate'],
                extraInfo: 'Escalate is a Verb. It means to increase rapidly or become more intense/serious.',
                extraInfoHi: 'Escalate (आगे बढ़ जाना/तेज होना) एक क्रिया है। इसका मतलब है तेजी से बढ़ना या अधिक तीव्र/गंभीर होना।'
            },
            'discontent/unhappiness': {
                actualWord: 'Dissatisfaction',
                pos: 'Noun',
                sentence: 'Adarsh expressed his <strong>dissatisfaction</strong> with the cold food served at the restaurant.',
                sentenceHi: 'आदर्श ने रेस्तरां में परोसे गए ठंडे खाने से अपनी <strong>असंतोष</strong> व्यक्त की।',
                synonyms: ['Discontent', 'Displeasure'],
                antonyms: ['Satisfaction', 'Contentment'],
                extraInfo: 'Dissatisfaction is a Noun. It is the feeling of being unhappy or not satisfied with something.',
                extraInfoHi: 'Dissatisfaction (असंतोष) एक संज्ञा है। यह किसी चीज से नाखुश या संतुष्ट न होने की भावना है।'
            },
            'manners/polite behavior': {
                actualWord: 'Etiquette',
                pos: 'Noun',
                sentence: 'Ladli learned proper dining <strong>etiquette</strong>, like not talking with her mouth full.',
                sentenceHi: 'लाडली ने उचित भोजन <strong>शिष्टाचार</strong> सीखा, जैसे मुंह में खाना होने पर बात न करना।',
                synonyms: ['Manners', 'Protocol'],
                antonyms: ['Rudeness', 'Bad manners'],
                extraInfo: 'Etiquette is a Noun. It refers to the customary code of polite behavior in society.',
                extraInfoHi: 'Etiquette (शिष्टाचार) एक संज्ञा है। यह समाज में विनम्र व्यवहार की पारंपरिक संहिता को संदर्भित करता है।'
            },
            'try/effort': {
                actualWord: 'Attempt',
                pos: 'Verb/Noun',
                sentence: 'Aniket Kumar made a sincere <strong>attempt</strong> to solve the puzzle.',
                sentenceHi: 'अनिकेत कुमार ने पहेली हल करने का ईमानदार <strong>प्रयास</strong> किया।',
                synonyms: ['Try', 'Effort'],
                antonyms: ['Give up', 'Surrender'],
                extraInfo: 'Attempt can be a Verb or a Noun. It means to try to do something, especially something difficult.',
                extraInfoHi: 'Attempt (कोशिश) एक क्रिया या संज्ञा हो सकता है। इसका मतलब है कुछ करने की कोशिश करना, विशेष रूप से कुछ कठिन।'
            },
            'happen': {
                actualWord: 'Occur',
                pos: 'Verb',
                sentence: 'The accident did not <strong>occur</strong> because Shivshant was driving carefully.',
                sentenceHi: 'दुर्घटना <strong>नहीं हुई</strong> क्योंकि शिवशांत सावधानी से गाड़ी चला रहा था।',
                synonyms: ['Happen', 'Take place'],
                antonyms: [],
                extraInfo: 'Occur is a Verb. It means to happen or take place.',
                extraInfoHi: 'Occur (घटित होना) एक क्रिया है। इसका मतलब है होना या घटित होना।'
            },
            'desired/searched for': {
                actualWord: 'Wanted',
                pos: 'Adjective/Verb',
                sentence: 'The police put up posters of the <strong>wanted</strong> thief, Divanshi saw.',
                sentenceHi: 'पुलिस ने <strong>वांछित</strong> चोर के पोस्टर लगाए, दिवांशी ने देखा।',
                synonyms: ['Desired', 'Sought after'],
                antonyms: ['Unwanted', 'Ignored'],
                extraInfo: 'Wanted is an Adjective (often used for criminals) or Verb (past tense of want). It means being searched for by police OR desired.',
                extraInfoHi: 'Wanted (ढूंढना/चाहना) एक विशेषण (अक्सर अपराधियों के लिए) या क्रिया (want का भूतकाल) है। इसका मतलब है पुलिस द्वारा खोजा जा रहा या वांछित।'
            },
            'show/make known': {
                actualWord: 'Reveal',
                pos: 'Verb',
                sentence: 'Sakshi 2 promised not to <strong>reveal</strong> the secret surprise to anyone.',
                sentenceHi: 'साक्षी 2 ने वादा किया कि वह गुप्त सरप्राइज किसी को <strong>नहीं बताएगी</strong>।',
                synonyms: ['Disclose', 'Show'],
                antonyms: ['Hide', 'Conceal'],
                extraInfo: 'Reveal is a Verb. It means to make previously unknown or secret information known to others.',
                extraInfoHi: 'Reveal (राज खोलना/सामने लाना) एक क्रिया है। इसका मतलब है पहले से अज्ञात या गुप्त जानकारी को दूसरों को बताना।'
            },
            'work for/help': {
                actualWord: 'Serve',
                pos: 'Verb',
                sentence: 'Vipin wants to join the army to <strong>serve</strong> his country.',
                sentenceHi: 'विपिन अपने देश की <strong>सेवा</strong> करने के लिए सेना में शामिल होना चाहता है।',
                synonyms: ['Assist', 'Help'],
                antonyms: ['Command', 'Rule'],
                extraInfo: 'Serve is a Verb. It means to perform duties or services for another person or an organization.',
                extraInfoHi: 'Serve (सेवा करना) एक क्रिया है। इसका मतलब है किसी अन्य व्यक्ति या संगठन के लिए कर्तव्य या सेवाएं निभाना।'
            },
            'forcefully take money': {
                actualWord: 'Extort',
                pos: 'Verb',
                sentence: 'The gang tried to <strong>extort</strong> money from the shopkeeper, but Madhu called the police.',
                sentenceHi: 'गिरोह ने दुकानदार से पैसे <strong>ऐंठने</strong> की कोशिश की, लेकिन मधु ने पुलिस को बुलाया।',
                synonyms: ['Blackmail', 'Force'],
                antonyms: ['Offer', 'Give'],
                extraInfo: 'Extort is a Verb. It means to obtain something (usually money) by force, threats, or unfair means.',
                extraInfoHi: 'Extort (पैसे ऐंठना) एक क्रिया है। इसका मतलब है बल, धमकी या अनुचित तरीकों से कुछ (आमतौर पर पैसे) प्राप्त करना।'
            },
            'soul/ghost': {
                actualWord: 'Spirit',
                pos: 'Noun',
                sentence: 'Kishan listened to a scary story about a wandering <strong>spirit</strong>.',
                sentenceHi: 'किशन ने एक भटकती <strong>आत्मा</strong> की डरावनी कहानी सुनी।',
                synonyms: ['Soul', 'Ghost'],
                antonyms: ['Body', 'Flesh'],
                extraInfo: 'Spirit is a Noun. It refers to the non-physical part of a person (soul) or a supernatural being (ghost).',
                extraInfoHi: 'Spirit (आत्मा) एक संज्ञा है। यह किसी व्यक्ति के गैर-भौतिक भाग (आत्मा) या अलौकिक प्राणी (भूत) को संदर्भित करता है।'
            },
            'run away': {
                actualWord: 'Flee',
                pos: 'Verb',
                sentence: 'The thief tried to <strong>flee</strong> when he saw the police, but Anshika spotted him.',
                sentenceHi: 'चोर ने पुलिस को देखकर <strong>भागने</strong> की कोशिश की, लेकिन अंशिका ने उसे देख लिया।',
                synonyms: ['Escape', 'Run away'],
                antonyms: ['Stay', 'Remain'],
                extraInfo: 'Flee is a Verb. It means to run away from a place or situation of danger.',
                extraInfoHi: 'Flee (भाग जाना) एक क्रिया है। इसका मतलब है खतरे की जगह या स्थिति से भागना।'
            },
            'heal/treatment': {
                actualWord: 'Cure',
                pos: 'Verb/Noun',
                sentence: 'Doctors are working hard to find a <strong>cure</strong> for the new virus, Shivansh read.',
                sentenceHi: 'डॉक्टर नए वायरस का <strong>इलाज</strong> खोजने के लिए कड़ी मेहनत कर रहे हैं, शिवांश ने पढ़ा।',
                synonyms: ['Heal', 'Treat'],
                antonyms: ['Infect', 'Injure'],
                extraInfo: 'Cure can be a Verb or a Noun. It means to relieve a person of the symptoms of a disease or condition.',
                extraInfoHi: 'Cure (इलाज करना) एक क्रिया या संज्ञा हो सकता है। इसका मतलब है किसी व्यक्ति को बीमारी या स्थिति के लक्षणों से राहत दिलाना।'
            },
            'many/some': {
                actualWord: 'Several',
                pos: 'Adjective',
                sentence: 'Yash has <strong>several</strong> books in his bag to read.',
                sentenceHi: 'यश के बैग में पढ़ने के लिए <strong>कई</strong> किताबें हैं।',
                synonyms: ['Various', 'Many'],
                antonyms: ['Few', 'None'],
                extraInfo: 'Several is an Adjective. It means more than two but not many.',
                extraInfoHi: 'Several (कई सारे) एक विशेषण है। इसका मतलब है दो से अधिक लेकिन बहुत अधिक नहीं।'
            },
            'iron worker': {
                actualWord: 'Blacksmith',
                pos: 'Noun',
                sentence: 'Stuti watched the <strong>blacksmith</strong> making a tool from hot iron.',
                sentenceHi: 'स्तुति ने <strong>लुहार</strong> को गर्म लोहे से औजार बनाते हुए देखा।',
                synonyms: ['Ironworker'],
                antonyms: [],
                extraInfo: 'Blacksmith is a Noun. A person who makes and repairs things in iron by hand.',
                extraInfoHi: 'Blacksmith (लुहार) एक संज्ञा है। वह व्यक्ति जो हाथ से लोहे की चीजें बनाता और मरम्मत करता है।'
            },

            // === VOCABULARY GATHRI 13 ANSWERS ===
            'very sad/disastrous': {
                actualWord: 'Tragic',
                pos: 'Adjective',
                sentence: 'The <strong>tragic</strong> accident on the highway made Ankit very sad.',
                sentenceHi: 'हाईवे पर <strong>दुखद</strong> दुर्घटना ने अंकित को बहुत दुखी कर दिया।',
                synonyms: ['Heartbreaking', 'Disastrous'],
                antonyms: ['Comic', 'Happy'],
                extraInfo: 'Tragic is an Adjective. It describes an event that causes great sadness, often involving death or suffering.',
                extraInfoHi: 'Tragic (दर्दनाक/दुखद) एक विशेषण है। यह किसी ऐसी घटना का वर्णन करता है जो बहुत दुख का कारण बनती है, अक्सर मृत्यु या पीड़ा के साथ।'
            },
            'situation/conditions': {
                actualWord: 'Circumstances',
                pos: 'Noun',
                sentence: 'Due to poor financial <strong>circumstances</strong>, Hari Kishan had to work while studying.',
                sentenceHi: 'खराब वित्तीय <strong>परिस्थितियों</strong> के कारण, हरी किशन को पढ़ाई के साथ काम करना पड़ा।',
                synonyms: ['Situation', 'Conditions'],
                antonyms: [],
                extraInfo: 'Circumstances is a Noun. It refers to the conditions or facts connected with an event or situation.',
                extraInfoHi: 'Circumstances (हालात/परिस्थिति) एक संज्ञा है। यह किसी घटना या स्थिति से जुड़ी शर्तों या तथ्यों को संदर्भित करता है।'
            },
            'choke/unable to breathe': {
                actualWord: 'Suffocate',
                pos: 'Verb',
                sentence: 'The thick smoke made Adarsh cough and almost <strong>suffocate</strong>.',
                sentenceHi: 'घने धुएं ने आदर्श को खांसने और लगभग <strong>दम घुटने</strong> पर मजबूर कर दिया।',
                synonyms: ['Choke', 'Smother'],
                antonyms: ['Breathe'],
                extraInfo: 'Suffocate is a Verb. It means to die or cause to die from lack of air or unable to breathe.',
                extraInfoHi: 'Suffocate (दम घुटना) एक क्रिया है। इसका मतलब है हवा की कमी से मरना या सांस न ले पाना।'
            },
            'fight/battle': {
                actualWord: 'Combat',
                pos: 'Noun/Verb',
                sentence: 'Soldiers are trained for <strong>combat</strong> to protect the country, Ladli learned.',
                sentenceHi: 'देश की रक्षा के लिए सैनिकों को <strong>युद्ध</strong> के लिए प्रशिक्षित किया जाता है, लाडली ने सीखा।',
                synonyms: ['Battle', 'Conflict'],
                antonyms: ['Peace', 'Harmony'],
                extraInfo: 'Combat is a Noun or Verb. It means fighting between armed forces or to fight against something.',
                extraInfoHi: 'Combat (लड़ाई/युद्ध) एक संज्ञा या क्रिया है। इसका मतलब है सशस्त्र बलों के बीच लड़ाई या किसी चीज से लड़ना।'
            },
            'disgraceful/bad': {
                actualWord: 'Shameful',
                pos: 'Adjective',
                sentence: 'It is <strong>shameful</strong> to cheat in exams, the teacher told Aniket Kumar.',
                sentenceHi: 'परीक्षा में नकल करना <strong>शर्मनाक</strong> है, शिक्षक ने अनिकेत कुमार से कहा।',
                synonyms: ['Disgraceful', 'Embarrassing'],
                antonyms: ['Honorable', 'Proud'],
                extraInfo: 'Shameful is an Adjective. It describes actions that are bad and cause a feeling of shame or disgrace.',
                extraInfoHi: 'Shameful (शर्मनाक) एक विशेषण है। यह उन कार्यों का वर्णन करता है जो बुरे हैं और शर्म या अपमान की भावना पैदा करते हैं।'
            },
            'make drunk/poison': {
                actualWord: 'Intoxicate',
                pos: 'Verb',
                sentence: 'Drinking alcohol can <strong>intoxicate</strong> a person and make them fall, warned Shivshant.',
                sentenceHi: 'शराब पीने से व्यक्ति को <strong>नशा</strong> हो सकता है और वह गिर सकता है, शिवशांत ने चेतावनी दी।',
                synonyms: ['Inebriate', 'Drunken'],
                antonyms: ['Sober'],
                extraInfo: 'Intoxicate is a Verb. It means to cause someone to lose control of their faculties (usually by alcohol or drugs).',
                extraInfoHi: 'Intoxicate (नशा करना) एक क्रिया है। इसका मतलब है किसी को अपनी क्षमताओं पर नियंत्रण खोने का कारण बनाना (आमतौर पर शराब या नशीली दवाओं द्वारा)।'
            },
            'train carriage': {
                actualWord: 'Coach',
                pos: 'Noun',
                sentence: 'Divanshi sat in the third <strong>coach</strong> of the train near the window.',
                sentenceHi: 'दिवांशी ट्रेन के तीसरे <strong>डिब्बे</strong> में खिड़की के पास बैठी।',
                synonyms: ['Carriage', 'Compartment'],
                antonyms: [],
                extraInfo: 'Coach is a Noun. In this context, it refers to a railway carriage or wagon. (Note: It also means a sports trainer).',
                extraInfoHi: 'Coach (रेल का डिब्बा) एक संज्ञा है। इस संदर्भ में, यह रेलवे की बोगी या वैगन को संदर्भित करता है। (नोट: इसका मतलब खेल प्रशिक्षक भी है)।'
            },
            'did/performed': {
                actualWord: 'Committed',
                pos: 'Verb',
                sentence: 'The thief admitted he had <strong>committed</strong> the robbery, Sakshi 2 read in the paper.',
                sentenceHi: 'चोर ने माना कि उसने डकैती <strong>की थी</strong>, साक्षी 2 ने पेपर में पढ़ा।',
                synonyms: ['Performed', 'Perpetrated'],
                antonyms: ['Abstained', 'Stopped'],
                extraInfo: 'Committed is a Verb (past tense). It often refers to carrying out a mistake, crime, or immoral act.',
                extraInfoHi: 'Committed (कर डाला/किया) एक क्रिया (भूतकाल) है। यह अक्सर गलती, अपराध या अनैतिक कार्य करने को संदर्भित करता है।'
            },
            'detention/care': {
                actualWord: 'Custody',
                pos: 'Noun',
                sentence: 'The police took the suspect into <strong>custody</strong> for questioning, Vipin observed.',
                sentenceHi: 'पुलिस ने संदिग्ध को पूछताछ के लिए <strong>हिरासत</strong> में लिया, विपिन ने देखा।',
                synonyms: ['Detention', 'Guardianship'],
                antonyms: ['Freedom', 'Liberty'],
                extraInfo: 'Custody is a Noun. It means the protective care of someone or imprisonment (police custody).',
                extraInfoHi: 'Custody (हिरासत/निगरानी) एक संज्ञा है। इसका मतलब है किसी की सुरक्षात्मक देखभाल या कारावास (पुलिस हिरासत)।'
            },
            'legal/court related': {
                actualWord: 'Judicial',
                pos: 'Adjective',
                sentence: 'The judge ordered a <strong>judicial</strong> inquiry into the case, said Madhu.',
                sentenceHi: 'न्यायाधीश ने मामले में <strong>न्यायिक</strong> जांच का आदेश दिया, मधु ने कहा।',
                synonyms: ['Legal', 'Courtly'],
                antonyms: ['Illegal'],
                extraInfo: 'Judicial is an Adjective. It relates to the administration of justice, judges, or courts.',
                extraInfoHi: 'Judicial (न्यायिक/अदालती) एक विशेषण है। यह न्याय प्रशासन, न्यायाधीशों या अदालतों से संबंधित है।'
            },
            'more bad/poorer': {
                actualWord: 'Worse',
                pos: 'Adjective',
                sentence: 'The weather became <strong>worse</strong> in the evening with heavy rain, forcing Kishan to stay home.',
                sentenceHi: 'शाम को भारी बारिश के साथ मौसम <strong>और बुरा</strong> हो गया, जिससे किशन को घर रहना पड़ा।',
                synonyms: ['Poorer', 'Inferior'],
                antonyms: ['Better', 'Improved'],
                extraInfo: 'Worse is an Adjective. It is the comparative form of bad; meaning of poorer quality or lower standard.',
                extraInfoHi: 'Worse (और बुरा/बेकार) एक विशेषण है। यह bad का तुलनात्मक रूप है; खराब गुणवत्ता या निम्न स्तर का अर्थ।'
            },
            'announce': {
                actualWord: 'Declare',
                pos: 'Verb',
                sentence: 'The principal will <strong>declare</strong> the exam results tomorrow, Anshika told her friends.',
                sentenceHi: 'प्रिंसिपल कल परीक्षा के परिणाम <strong>घोषित</strong> करेंगे, अंशिका ने अपने दोस्तों को बताया।',
                synonyms: ['Announce', 'Proclaim'],
                antonyms: ['Conceal', 'Hide'],
                extraInfo: 'Declare is a Verb. It means to say something in a solemn and emphatic manner.',
                extraInfoHi: 'Declare (घोषित करना) एक क्रिया है। इसका मतलब है कुछ गंभीर और जोरदार तरीके से कहना।'
            },
            'request strongly/advise': {
                actualWord: 'Urge',
                pos: 'Verb',
                sentence: 'Teachers always <strong>urge</strong> students to study daily, Shivansh recalled.',
                sentenceHi: 'शिक्षक हमेशा छात्रों से रोजाना पढ़ने का <strong>आग्रह</strong> करते हैं, शिवांश ने याद किया।',
                synonyms: ['Encourage', 'Advise'],
                antonyms: ['Discourage', 'Deter'],
                extraInfo: 'Urge is a Verb. It means to try earnestly or persistently to persuade someone to do something.',
                extraInfoHi: 'Urge (आग्रह करना/कहना) एक क्रिया है। इसका मतलब है किसी को कुछ करने के लिए ईमानदारी से या लगातार राजी करने की कोशिश करना।'
            },
            'fast/quick': {
                actualWord: 'Rapid',
                pos: 'Adjective',
                sentence: 'Yash made <strong>rapid</strong> progress in learning English this month.',
                sentenceHi: 'यश ने इस महीने अंग्रेजी सीखने में <strong>तेज</strong> प्रगति की।',
                synonyms: ['Fast', 'Quick'],
                antonyms: ['Slow', 'Gradual'],
                extraInfo: 'Rapid is an Adjective. It means happening in a short time or at a fast speed.',
                extraInfoHi: 'Rapid (तेज/तीव्र) एक विशेषण है। इसका मतलब है कम समय में या तेज गति से होना।'
            },
            'moving to another place': {
                actualWord: 'Migration',
                pos: 'Noun',
                sentence: 'The <strong>migration</strong> of workers to the city is common, noted Stuti.',
                sentenceHi: 'शहर में श्रमिकों का <strong>पलायन</strong> आम है, स्तुति ने नोट किया।',
                synonyms: ['Relocation', 'Movement'],
                antonyms: ['Staying', 'Settlement'],
                extraInfo: 'Migration is a Noun. It is the movement of people or animals from one place to another.',
                extraInfoHi: 'Migration (प्रवास/पलायन) एक संज्ञा है। यह लोगों या जानवरों का एक स्थान से दूसरे स्थान पर जाना है।'
            },

            // ========== GATHRI 14: Work & Society ==========
            'dismiss/fire': {
                actualWord: 'Sack',
                pos: 'Verb/Noun',
                sentence: '(Verb): The manager threatened to <strong>sack</strong> the lazy worker, Ankit heard.<br>(Noun): Ankit carried a heavy <strong>sack</strong> of rice on his shoulder.',
                sentenceHi: '(क्रिया): मैनेजर ने आलसी कर्मचारी को <strong>बर्खास्त</strong> करने की धमकी दी, अंकित ने सुना।<br>(संज्ञा): अंकित ने चावल की भारी <strong>बोरी</strong> अपने कंधे पर उठाई।',
                synonyms: ['Dismiss', 'Fire'],
                antonyms: ['Hire', 'Employ'],
                extraInfo: 'Sack can be a Verb or a Noun. As a Verb: To dismiss someone from a job. As a Noun: A large bag made of strong material.',
                extraInfoHi: 'Sack (बर्खास्त करना) एक क्रिया या संज्ञा हो सकता है। क्रिया के रूप में: किसी को नौकरी से निकालना। संज्ञा के रूप में: मजबूत सामग्री का एक बड़ा थैला।'
            },
            'business/commerce': {
                actualWord: 'Trade',
                pos: 'Noun/Verb',
                sentence: 'Hari Kishan wants to learn the <strong>trade</strong> of carpentry from his father.',
                sentenceHi: 'हरी किशन अपने पिता से बढ़ईगीरी का <strong>व्यापार</strong> सीखना चाहते हैं।',
                synonyms: ['Business', 'Commerce'],
                antonyms: [],
                extraInfo: 'Trade is a Noun or Verb. It involves buying and selling goods and services.',
                extraInfoHi: 'Trade (व्यापार) एक संज्ञा या क्रिया है। इसमें वस्तुओं और सेवाओं की खरीद और बिक्री शामिल है।'
            },
            'illegal/unlawful': {
                actualWord: 'Illicit',
                pos: 'Adjective',
                sentence: 'The police arrested the men for selling <strong>illicit</strong> liquor, Adarsh read in the news.',
                sentenceHi: 'आदर्श ने समाचार में पढ़ा कि पुलिस ने <strong>अवैध</strong> शराब बेचने के आरोप में लोगों को गिरफ्तार किया।',
                synonyms: ['Illegal', 'Unlawful'],
                antonyms: ['Legal', 'Lawful'],
                extraInfo: 'Illicit is an Adjective. It describes something forbidden by law, rules, or custom.',
                extraInfoHi: 'Illicit (अवैध) एक विशेषण है। यह कानून, नियमों या रीति-रिवाजों द्वारा निषिद्ध किसी चीज़ का वर्णन करता है।'
            },
            'lead/head a meeting': {
                actualWord: 'Preside',
                pos: 'Verb',
                sentence: 'The Principal will <strong>preside</strong> over the school\'s annual function, said Ladli.',
                sentenceHi: 'लाडली ने कहा, प्रधानाचार्य स्कूल के वार्षिक समारोह की <strong>अध्यक्षता</strong> करेंगे।',
                synonyms: ['Chair', 'Lead'],
                antonyms: ['Follow'],
                extraInfo: 'Preside is a Verb. It means to be in the position of authority in a meeting or gathering.',
                extraInfoHi: 'Preside (अध्यक्षता करना) एक क्रिया है। इसका मतलब है किसी बैठक या सभा में अधिकार की स्थिति में होना।'
            },
            'participation/inclusion': {
                actualWord: 'Involvement',
                pos: 'Noun',
                sentence: 'Aniket Kumar\'s active <strong>involvement</strong> in sports helped him stay fit.',
                sentenceHi: 'अनिकेत कुमार की खेलों में सक्रिय <strong>भागीदारी</strong> ने उन्हें फिट रहने में मदद की।',
                synonyms: ['Participation', 'Connection'],
                antonyms: ['Exclusion'],
                extraInfo: 'Involvement is a Noun. It means the fact or condition of being involved with or participating in something.',
                extraInfoHi: 'Involvement (भागीदारी/शामिल होना) एक संज्ञा है। इसका मतलब है किसी चीज़ में शामिल होने या भाग लेने की स्थिति।'
            },
            'strict/severe': {
                actualWord: 'Stringent',
                pos: 'Adjective',
                sentence: 'The school has <strong>stringent</strong> rules about wearing the correct uniform, Shivshant warned.',
                sentenceHi: 'शिवशांत ने चेतावनी दी, स्कूल में सही यूनिफॉर्म पहनने के <strong>कड़े</strong> नियम हैं।',
                synonyms: ['Strict', 'Rigid'],
                antonyms: ['Lenient', 'Flexible'],
                extraInfo: 'Stringent is an Adjective. It describes regulations, requirements, or conditions that are very strict.',
                extraInfoHi: 'Stringent (कठोर/सख्त) एक विशेषण है। यह ऐसे नियमों, आवश्यकताओं या शर्तों का वर्णन करता है जो बहुत सख्त हों।'
            },
            'unavoidable/certain': {
                actualWord: 'Inevitable',
                pos: 'Adjective',
                sentence: 'It was <strong>inevitable</strong> that Divanshi would win the race because she practiced so hard.',
                sentenceHi: 'यह <strong>अनिवार्य</strong> था कि दिवांशी रेस जीतेगी क्योंकि उसने बहुत मेहनत से अभ्यास किया।',
                synonyms: ['Unavoidable', 'Certain'],
                antonyms: ['Avoidable', 'Uncertain'],
                extraInfo: 'Inevitable is an Adjective. It means certain to happen; unavoidable.',
                extraInfoHi: 'Inevitable (अनिवार्य/तय) एक विशेषण है। इसका मतलब है निश्चित रूप से होने वाला; जिससे बचा न जा सके।'
            },
            'energy source/encourage': {
                actualWord: 'Fuel',
                pos: 'Noun/Verb',
                sentence: '(Noun): Sakshi 2\'s father stopped at the pump to put <strong>fuel</strong> in the car.<br>(Verb): His angry words only served to <strong>fuel</strong> the argument.',
                sentenceHi: '(संज्ञा): साक्षी 2 के पिता ने कार में <strong>ईंधन</strong> डालने के लिए पंप पर रुके।<br>(क्रिया): उनके गुस्से भरे शब्दों ने केवल बहस को <strong>बढ़ावा</strong> दिया।',
                synonyms: ['Energy', 'Stimulate'],
                antonyms: ['Extinguish'],
                extraInfo: 'Fuel can be a Noun or a Verb. As a Noun: Material like coal, gas, or oil burned to produce heat. As a Verb: To supply with fuel or to stimulate (give energy to) something.',
                extraInfoHi: 'Fuel (ईंधन) संज्ञा या क्रिया हो सकता है। संज्ञा के रूप में: कोयला, गैस या तेल जैसी सामग्री जो गर्मी पैदा करने के लिए जलाई जाती है। क्रिया के रूप में: ईंधन देना या किसी चीज़ को बढ़ावा देना।'
            },
            'find fault/blame': {
                actualWord: 'Criticise',
                pos: 'Verb',
                sentence: 'It is easy to <strong>criticise</strong>, but hard to do the work yourself, said Vipin.',
                sentenceHi: 'विपिन ने कहा, <strong>आलोचना</strong> करना आसान है, लेकिन खुद काम करना मुश्किल है।',
                synonyms: ['Blame', 'Condemn'],
                antonyms: ['Praise', 'Commend'],
                extraInfo: 'Criticise is a Verb. It means to indicate the faults of someone or something in a disapproving way.',
                extraInfoHi: 'Criticise (आलोचना करना) एक क्रिया है। इसका मतलब है किसी व्यक्ति या चीज़ की गलतियों को नापसंदगी से बताना।'
            },
            'encourage/care for': {
                actualWord: 'Foster',
                pos: 'Verb',
                sentence: 'The teacher tries to <strong>foster</strong> a love for reading in all her students, including Madhu.',
                sentenceHi: 'शिक्षिका मधु सहित अपने सभी छात्रों में पढ़ने के प्रति प्रेम <strong>विकसित</strong> करने की कोशिश करती हैं।',
                synonyms: ['Nurture', 'Promote'],
                antonyms: ['Neglect', 'Hinder'],
                extraInfo: 'Foster is a Verb. It means to encourage the development of something or to bring up a child that is not one\'s own by birth.',
                extraInfoHi: 'Foster (पालन-पोषण करना/बढ़ावा देना) एक क्रिया है। इसका मतलब है किसी चीज़ के विकास को प्रोत्साहित करना या किसी ऐसे बच्चे का पालन-पोषण करना जो जन्म से अपना नहीं है।'
            },
            'kidnap': {
                actualWord: 'Abduct',
                pos: 'Verb',
                sentence: 'The villain tried to <strong>abduct</strong> the hero\'s sister in the movie Kishan watched.',
                sentenceHi: 'किशन ने जो फिल्म देखी उसमें खलनायक ने हीरो की बहन का <strong>अपहरण</strong> करने की कोशिश की।',
                synonyms: ['Kidnap', 'Seize'],
                antonyms: ['Release', 'Free'],
                extraInfo: 'Abduct is a Verb. It means to take someone away illegally by force or deception; kidnap.',
                extraInfoHi: 'Abduct (अपहरण करना) एक क्रिया है। इसका मतलब है किसी को जबरदस्ती या धोखे से अवैध रूप से ले जाना।'
            },
            'criminal/guilty person': {
                actualWord: 'Offender',
                pos: 'Noun',
                sentence: 'The police caught the traffic <strong>offender</strong> who jumped the red light, Anshika saw.',
                sentenceHi: 'अंशिका ने देखा, पुलिस ने लाल बत्ती तोड़ने वाले यातायात <strong>अपराधी</strong> को पकड़ लिया।',
                synonyms: ['Criminal', 'Culprit'],
                antonyms: ['Innocent', 'Law-abider'],
                extraInfo: 'Offender is a Noun. It refers to a person who commits an illegal act.',
                extraInfoHi: 'Offender (अपराधी/दोषी) एक संज्ञा है। यह उस व्यक्ति को संदर्भित करता है जो कोई अवैध कार्य करता है।'
            },
            'homeless/wanderer': {
                actualWord: 'Stray',
                pos: 'Adjective/Verb',
                sentence: 'Shivansh gave some milk to the <strong>stray</strong> dog near his house.',
                sentenceHi: 'शिवांश ने अपने घर के पास <strong>आवारा</strong> कुत्ते को कुछ दूध दिया।',
                synonyms: ['Homeless', 'Wandering'],
                antonyms: ['Home', 'Pet'],
                extraInfo: 'Stray is an Adjective or Verb. It refers to a domestic animal without a home or to move away from the right place.',
                extraInfoHi: 'Stray (आवारा/भटका हुआ) एक विशेषण या क्रिया है। यह बिना घर के पालतू जानवर को संदर्भित करता है या सही जगह से दूर जाना।'
            },
            'police officer': {
                actualWord: 'Cop',
                pos: 'Noun',
                sentence: 'Yash wants to become a tough <strong>cop</strong> when he grows up.',
                sentenceHi: 'यश बड़ा होकर एक सख्त <strong>पुलिसवाला</strong> बनना चाहता है।',
                synonyms: ['Police officer', 'Constable'],
                antonyms: ['Criminal'],
                extraInfo: 'Cop is a Noun (informal). It refers to a police officer.',
                extraInfoHi: 'Cop (पुलिस) एक संज्ञा है (अनौपचारिक)। यह पुलिस अधिकारी को संदर्भित करता है।'
            },
            'campaigner': {
                actualWord: 'Activist',
                pos: 'Noun',
                sentence: 'The social <strong>activist</strong> fought for clean water in Stuti\'s village.',
                sentenceHi: 'सामाजिक <strong>कार्यकर्ता</strong> ने स्तुति के गाँव में साफ पानी के लिए लड़ाई लड़ी।',
                synonyms: ['Campaigner', 'Reformer'],
                antonyms: [],
                extraInfo: 'Activist is a Noun. It is a person who campaigns to bring about political or social change.',
                extraInfoHi: 'Activist (कार्यकर्ता) एक संज्ञा है। यह वह व्यक्ति है जो राजनीतिक या सामाजिक बदलाव लाने के लिए अभियान चलाता है।'
            },

            // ========== GATHRI 15: Growth & Action ==========
            'guest care/warm welcome': {
                actualWord: 'Hospitality',
                pos: 'Noun',
                sentence: 'Ankit was praised for his warm <strong>hospitality</strong> when guests visited his home.',
                sentenceHi: 'जब मेहमान अंकित के घर आए तो उसकी गर्मजोशी भरी <strong>मेहमान-नवाजी</strong> की तारीफ हुई।',
                synonyms: ['Welcome', 'Friendliness'],
                antonyms: ['Rudeness', 'Hostility'],
                extraInfo: 'Hospitality is a Noun. It is the friendly and generous reception and entertainment of guests or strangers.',
                extraInfoHi: 'Hospitality (मेहमान-नवाजी) एक संज्ञा है। यह मेहमानों या अजनबियों का दोस्ताना और उदार स्वागत और मनोरंजन है।'
            },
            'city-related': {
                actualWord: 'Urban',
                pos: 'Adjective',
                sentence: 'Hari Kishan moved from his village to an <strong>urban</strong> area for better studies.',
                sentenceHi: 'हरी किशन बेहतर पढ़ाई के लिए अपने गाँव से <strong>शहरी</strong> क्षेत्र में चले गए।',
                synonyms: ['City', 'Metropolitan'],
                antonyms: ['Rural', 'Village'],
                extraInfo: 'Urban is an Adjective. It relates to a city or town (opposite of rural/village).',
                extraInfoHi: 'Urban (शहरी) एक विशेषण है। यह शहर या कस्बे से संबंधित है (ग्रामीण/गाँव का विपरीत)।'
            },
            'experience/go through': {
                actualWord: 'Undergo',
                pos: 'Verb',
                sentence: 'Adarsh had to <strong>undergo</strong> a surgery to fix his broken leg.',
                sentenceHi: 'आदर्श को अपनी टूटी हुई टांग ठीक करने के लिए सर्जरी <strong>करानी</strong> पड़ी।',
                synonyms: ['Experience', 'Endure'],
                antonyms: ['Avoid', 'Escape'],
                extraInfo: 'Undergo is a Verb. It means to experience or be subjected to something, typically something difficult or painful.',
                extraInfoHi: 'Undergo (गुजरना/सहना) एक क्रिया है। इसका मतलब है किसी चीज़ का अनुभव करना, आमतौर पर कुछ कठिन या दर्दनाक।'
            },
            'important/meaningful': {
                actualWord: 'Significant',
                pos: 'Adjective',
                sentence: 'There was a <strong>significant</strong> improvement in Ladli\'s marks after she started studying daily.',
                sentenceHi: 'रोज़ाना पढ़ाई शुरू करने के बाद लाडली के अंकों में <strong>महत्वपूर्ण</strong> सुधार हुआ।',
                synonyms: ['Important', 'Major'],
                antonyms: ['Insignificant', 'Minor'],
                extraInfo: 'Significant is an Adjective. It means sufficiently great or important to be worthy of attention.',
                extraInfoHi: 'Significant (महत्वपूर्ण) एक विशेषण है। इसका मतलब है ध्यान देने योग्य।'
            },
            'goal/aim': {
                actualWord: 'Objective',
                pos: 'Noun',
                sentence: 'The main <strong>objective</strong> of Aniket Kumar is to join the Indian Army.',
                sentenceHi: 'अनिकेत कुमार का मुख्य <strong>उद्देश्य</strong> भारतीय सेना में शामिल होना है।',
                synonyms: ['Goal', 'Target'],
                antonyms: [],
                extraInfo: 'Objective is a Noun. It is a goal or aim that you are trying to achieve.',
                extraInfoHi: 'Objective (उद्देश्य) एक संज्ञा है। यह वह लक्ष्य है जिसे आप प्राप्त करने की कोशिश कर रहे हैं।'
            },
            'stress/give importance': {
                actualWord: 'Emphasize',
                pos: 'Verb',
                sentence: 'The teacher tried to <strong>emphasize</strong> the importance of grammar to Shivshant.',
                sentenceHi: 'शिक्षक ने शिवशांत को व्याकरण के महत्व पर <strong>जोर</strong> देने की कोशिश की।',
                synonyms: ['Highlight', 'Stress'],
                antonyms: ['Ignore', 'Understate'],
                extraInfo: 'Emphasize is a Verb. It means to give special importance or prominence to something in speaking or writing.',
                extraInfoHi: 'Emphasize (जोर देना) एक क्रिया है। इसका मतलब है बोलने या लिखने में किसी चीज़ को विशेष महत्व देना।'
            },
            'shared/common': {
                actualWord: 'Mutual',
                pos: 'Adjective',
                sentence: 'Divanshi and her friend have <strong>mutual</strong> respect for each other.',
                sentenceHi: 'दिवांशी और उसकी सहेली में एक-दूसरे के लिए <strong>आपसी</strong> सम्मान है।',
                synonyms: ['Shared', 'Reciprocal'],
                antonyms: ['One-sided', 'Individual'],
                extraInfo: 'Mutual is an Adjective. It describes a feeling or action experienced by two or more people equally.',
                extraInfoHi: 'Mutual (आपसी/साझा) एक विशेषण है। यह दो या अधिक लोगों द्वारा समान रूप से अनुभव की गई भावना या क्रिया का वर्णन करता है।'
            },
            'working together': {
                actualWord: 'Coordination',
                pos: 'Noun',
                sentence: 'The team won the match because of good <strong>coordination</strong> between Sakshi 2 and the other players.',
                sentenceHi: 'साक्षी 2 और अन्य खिलाड़ियों के बीच अच्छे <strong>तालमेल</strong> की वजह से टीम मैच जीत गई।',
                synonyms: ['Cooperation', 'Teamwork'],
                antonyms: ['Confusion', 'Discord'],
                extraInfo: 'Coordination is a Noun. It is the organization of different people or things so that they work together effectively.',
                extraInfoHi: 'Coordination (तालमेल) एक संज्ञा है। यह विभिन्न लोगों या चीजों का संगठन है ताकि वे प्रभावी ढंग से मिलकर काम करें।'
            },
            'destroy completely': {
                actualWord: 'Eradicate',
                pos: 'Verb',
                sentence: 'The government is trying to <strong>eradicate</strong> polio from the country, Vipin learned.',
                sentenceHi: 'विपिन ने सीखा कि सरकार देश से पोलियो को <strong>जड़ से खत्म</strong> करने की कोशिश कर रही है।',
                synonyms: ['Eliminate', 'Wipe out'],
                antonyms: ['Create', 'Establish'],
                extraInfo: 'Eradicate is a Verb. It means to destroy or get rid of something completely (like a disease or bad habit).',
                extraInfoHi: 'Eradicate (जड़ से खत्म करना) एक क्रिया है। इसका मतलब है किसी चीज़ को पूरी तरह से नष्ट करना (जैसे कोई बीमारी या बुरी आदत)।'
            },
            'hunt illegally': {
                actualWord: 'Poach',
                pos: 'Verb',
                sentence: 'The forest guards arrested the men trying to <strong>poach</strong> tigers, Madhu read.',
                sentenceHi: 'मधु ने पढ़ा कि वन रक्षकों ने बाघों का <strong>अवैध शिकार</strong> करने वाले लोगों को गिरफ्तार किया।',
                synonyms: ['Hunt illegally', 'Steal'],
                antonyms: ['Protect', 'Conserve'],
                extraInfo: 'Poach is a Verb. It means to hunt or catch animals illegally on someone else\'s land. (Also means to cook an egg).',
                extraInfoHi: 'Poach (अवैध शिकार करना) एक क्रिया है। इसका मतलब है किसी और की जमीन पर अवैध रूप से जानवरों का शिकार करना।'
            },
            'jab/prod': {
                actualWord: 'Poke',
                pos: 'Verb',
                sentence: 'Kishan used a stick to <strong>poke</strong> the fire to make it burn brighter.',
                sentenceHi: 'किशन ने आग को तेज जलाने के लिए डंडे से <strong>कोचा</strong>।',
                synonyms: ['Jab', 'Prod'],
                antonyms: [],
                extraInfo: 'Poke is a Verb. It means to prod or push someone or something with a finger or a sharp object.',
                extraInfoHi: 'Poke (कोचना/चुभाना) एक क्रिया है। इसका मतलब है किसी को उंगली या नुकीली चीज़ से धक्का देना या चुभाना।'
            },
            'pierce with horn': {
                actualWord: 'Gore',
                pos: 'Verb',
                sentence: 'The angry bull tried to <strong>gore</strong> the matador, scaring Anshika.',
                sentenceHi: 'गुस्से में बैल ने मैटाडोर को <strong>सींग मारने</strong> की कोशिश की, जिससे अंशिका डर गई।',
                synonyms: ['Pierce', 'Stab'],
                antonyms: [],
                extraInfo: 'Gore is a Verb. It means to pierce or stab someone with a horn or tusk (usually done by an animal like a bull).',
                extraInfoHi: 'Gore (सींग घुसाना) एक क्रिया है। इसका मतलब है किसी को सींग या दांत से छेदना (आमतौर पर बैल जैसे जानवर द्वारा)।'
            },
            'huge/very large': {
                actualWord: 'Giant',
                pos: 'Noun/Adjective',
                sentence: 'Shivansh saw a <strong>giant</strong> statue of Lord Shiva during his trip.',
                sentenceHi: 'शिवांश ने अपनी यात्रा के दौरान भगवान शिव की <strong>विशाल</strong> मूर्ति देखी।',
                synonyms: ['Huge', 'Colossal'],
                antonyms: ['Tiny', 'Dwarf'],
                extraInfo: 'Giant is a Noun or Adjective. It refers to a person or thing of unusually great size or power.',
                extraInfoHi: 'Giant (विशाल/राक्षस) एक संज्ञा या विशेषण है। यह असामान्य रूप से बड़े आकार या शक्ति वाले व्यक्ति या चीज़ को संदर्भित करता है।'
            },
            'mad/insane': {
                actualWord: 'Deranged',
                pos: 'Adjective',
                sentence: 'The <strong>deranged</strong> man was shouting at the empty street, so Yash stayed away.',
                sentenceHi: '<strong>पागल</strong> आदमी खाली सड़क पर चिल्ला रहा था, इसलिए यश दूर रहा।',
                synonyms: ['Insane', 'Crazy'],
                antonyms: ['Sane', 'Rational'],
                extraInfo: 'Deranged is an Adjective. It describes someone who is mad or mentally unstable.',
                extraInfoHi: 'Deranged (सिर-फिरा/पागल) एक विशेषण है। यह किसी ऐसे व्यक्ति का वर्णन करता है जो पागल या मानसिक रूप से अस्थिर है।'
            },
            'perform or kill': {
                actualWord: 'Execute',
                pos: 'Verb',
                sentence: '(Meaning 1): Stuti helped her team <strong>execute</strong> the project plan perfectly.<br>(Meaning 2): The king ordered his guards to <strong>execute</strong> the traitor.',
                sentenceHi: '(अर्थ 1): स्तुति ने अपनी टीम को परियोजना योजना को पूरी तरह से <strong>क्रियान्वित</strong> करने में मदद की।<br>(अर्थ 2): राजा ने अपने सैनिकों को गद्दार को <strong>फांसी</strong> देने का आदेश दिया।',
                synonyms: ['Perform', 'Put to death'],
                antonyms: ['Abandon', 'Pardon'],
                extraInfo: 'Execute is a Verb with two common meanings: 1. To carry out or perform a plan. 2. To kill someone as a legal punishment (hang/shoot).',
                extraInfoHi: 'Execute (करना/फांसी देना) एक क्रिया है जिसके दो सामान्य अर्थ हैं: 1. किसी योजना को पूरा करना। 2. किसी को कानूनी सजा के रूप में मारना।'
            },

            // ========== GATHRI 16: Law & Justice ==========
            'ownership/control': {
                actualWord: 'Possession',
                pos: 'Noun',
                sentence: 'The police recovered the stolen jewelry from the thief\'s <strong>possession</strong>, Ankit read.',
                sentenceHi: 'पुलिस ने चोर के <strong>कब्जे</strong> से चोरी के गहने बरामद किए, अंकित ने पढ़ा।',
                synonyms: ['Ownership', 'Custody'],
                antonyms: ['Loss', 'Lacking'],
                extraInfo: 'Possession is a Noun. It means the state of having, owning, or controlling something.',
                extraInfoHi: 'Possession (कब्जा/अधिकार) एक संज्ञा है। इसका मतलब है किसी चीज़ का होना, मालिक होना या नियंत्रण करना।'
            },
            'cow protector': {
                actualWord: 'Cow Vigilante',
                pos: 'Noun',
                sentence: 'Hari Kishan watched a news debate about the actions of a <strong>cow vigilante</strong> group.',
                sentenceHi: 'हरी किशन ने <strong>गौ रक्षक</strong> समूह की कार्रवाइयों के बारे में एक समाचार बहस देखी।',
                synonyms: ['Cow protector'],
                antonyms: [],
                extraInfo: 'Cow Vigilante is a Noun. It refers to a person who takes the law into their own hands to protect cows (often illegally).',
                extraInfoHi: 'Cow Vigilante (गौ रक्षक) एक संज्ञा है। यह उस व्यक्ति को संदर्भित करता है जो गायों की रक्षा के लिए कानून को अपने हाथ में लेता है (अक्सर अवैध रूप से)।'
            },
            'self-appointed guard': {
                actualWord: 'Vigilante',
                pos: 'Noun',
                sentence: 'Adarsh thought Batman was a cool <strong>vigilante</strong>, but in real life, we need police.',
                sentenceHi: 'आदर्श ने सोचा कि बैटमैन एक अच्छा <strong>स्वयं-सेवक</strong> था, लेकिन वास्तविक जीवन में, हमें पुलिस की जरूरत है।',
                synonyms: ['Watchman', 'Avenger'],
                antonyms: ['Police officer'],
                extraInfo: 'Vigilante is a Noun. It describes a person who tries to stop crime or punish criminals without having legal authority (like a superhero).',
                extraInfoHi: 'Vigilante (स्वयं-सेवक) एक संज्ञा है। यह उस व्यक्ति का वर्णन करता है जो कानूनी अधिकार के बिना अपराध रोकने या अपराधियों को दंडित करने की कोशिश करता है।'
            },
            'proof/facts': {
                actualWord: 'Evidence',
                pos: 'Noun',
                sentence: 'Ladli showed the teacher the video as <strong>evidence</strong> that she did not break the glass.',
                sentenceHi: 'लाडली ने शिक्षक को वीडियो <strong>सबूत</strong> के रूप में दिखाया कि उसने गिलास नहीं तोड़ा।',
                synonyms: ['Proof', 'Confirmation'],
                antonyms: ['Disproof', 'Denial'],
                extraInfo: 'Evidence is a Noun. It refers to the available facts or information indicating whether a belief is true (proof).',
                extraInfoHi: 'Evidence (सबूत) एक संज्ञा है। यह उपलब्ध तथ्यों या सूचनाओं को संदर्भित करता है जो यह दर्शाती है कि कोई विश्वास सत्य है या नहीं।'
            },
            'connect/join': {
                actualWord: 'Link',
                pos: 'Verb/Noun',
                sentence: 'Police are trying to <strong>link</strong> the suspect to the crime scene, Aniket Kumar explained.',
                sentenceHi: 'अनिकेत कुमार ने बताया कि पुलिस संदिग्ध को अपराध स्थल से <strong>जोड़ने</strong> की कोशिश कर रही है।',
                synonyms: ['Connect', 'Join'],
                antonyms: ['Separate', 'Disconnect'],
                extraInfo: 'Link can be a Verb or a Noun. It means to connect two things or a relationship between two things.',
                extraInfoHi: 'Link (जोड़ना/संपर्क) एक क्रिया या संज्ञा हो सकता है। इसका मतलब है दो चीजों को जोड़ना या दो चीजों के बीच संबंध।'
            },
            'fair/unbiased': {
                actualWord: 'Impartial',
                pos: 'Adjective',
                sentence: 'A cricket umpire must be <strong>impartial</strong> to both teams, said Shivshant.',
                sentenceHi: 'शिवशांत ने कहा, क्रिकेट अंपायर को दोनों टीमों के प्रति <strong>निष्पक्ष</strong> होना चाहिए।',
                synonyms: ['Unbiased', 'Neutral'],
                antonyms: ['Biased', 'Partial'],
                extraInfo: 'Impartial is an Adjective. It means treating all rivals or disputants equally; fair and just.',
                extraInfoHi: 'Impartial (निष्पक्ष) एक विशेषण है। इसका मतलब है सभी प्रतिद्वंद्वियों के साथ समान व्यवहार करना।'
            },
            'stop/catch midway': {
                actualWord: 'Intercept',
                pos: 'Verb',
                sentence: 'Divanshi jumped to <strong>intercept</strong> the ball before it reached the goal.',
                sentenceHi: 'दिवांशी ने गोल तक पहुंचने से पहले गेंद को <strong>रोकने</strong> के लिए छलांग लगाई।',
                synonyms: ['Stop', 'Block'],
                antonyms: ['Allow', 'Release'],
                extraInfo: 'Intercept is a Verb. It means to stop or catch someone or something that is going from one place to another.',
                extraInfoHi: 'Intercept (रोकना/बीच में पकड़ना) एक क्रिया है। इसका मतलब है किसी को या किसी चीज़ को रोकना जो एक जगह से दूसरी जगह जा रही है।'
            },
            'regularly': {
                actualWord: 'Routinely',
                pos: 'Adverb',
                sentence: 'Sakshi 2 <strong>routinely</strong> wakes up at 6 AM to study.',
                sentenceHi: 'साक्षी 2 पढ़ाई के लिए <strong>नियमित रूप से</strong> सुबह 6 बजे उठती है।',
                synonyms: ['Regularly', 'Habitually'],
                antonyms: ['Rarely', 'Occasionally'],
                extraInfo: 'Routinely is an Adverb. It means doing something as a part of a regular procedure or habit.',
                extraInfoHi: 'Routinely (नियमित रूप से) एक क्रिया विशेषण है। इसका मतलब है नियमित प्रक्रिया या आदत के हिस्से के रूप में कुछ करना।'
            },
            'trouble/bother': {
                actualWord: 'Harass',
                pos: 'Verb',
                sentence: 'It is a crime to <strong>harass</strong> anyone on the street, Vipin told his younger brother.',
                sentenceHi: 'विपिन ने अपने छोटे भाई को बताया कि सड़क पर किसी को <strong>परेशान</strong> करना अपराध है।',
                synonyms: ['Bother', 'Pester'],
                antonyms: ['Assist', 'Comfort'],
                extraInfo: 'Harass is a Verb. It means to trouble, annoy, or disturb someone repeatedly.',
                extraInfoHi: 'Harass (परेशान करना/उत्पीड़न) एक क्रिया है। इसका मतलब है किसी को बार-बार परेशान करना।'
            },
            'run after/pursue': {
                actualWord: 'Chase',
                pos: 'Verb',
                sentence: 'Madhu laughed watching the dog <strong>chase</strong> its own tail.',
                sentenceHi: 'मधु कुत्ते को अपनी पूंछ का <strong>पीछा</strong> करते देखकर हंसी।',
                synonyms: ['Pursue', 'Follow'],
                antonyms: ['Flee', 'Escape'],
                extraInfo: 'Chase is a Verb. It means to run after someone or something in order to catch them.',
                extraInfoHi: 'Chase (पीछा करना) एक क्रिया है। इसका मतलब है किसी को पकड़ने के लिए उसके पीछे दौड़ना।'
            },
            'insult/disgrace': {
                actualWord: 'Humiliate',
                pos: 'Verb',
                sentence: 'The rude man tried to <strong>humiliate</strong> the waiter, but Kishan stood up for him.',
                sentenceHi: 'बदतमीज आदमी ने वेटर को <strong>अपमानित</strong> करने की कोशिश की, लेकिन किशन ने उसका समर्थन किया।',
                synonyms: ['Insult', 'Embarrass'],
                antonyms: ['Honor', 'Respect'],
                extraInfo: 'Humiliate is a Verb. It means to make someone feel ashamed or foolish, especially publicly.',
                extraInfoHi: 'Humiliate (अपमानित करना/नीचा दिखाना) एक क्रिया है। इसका मतलब है किसी को शर्मिंदा या मूर्ख महसूस कराना, खासकर सार्वजनिक रूप से।'
            },
            'justly/honestly': {
                actualWord: 'Fairly',
                pos: 'Adverb',
                sentence: 'The teacher treated all students <strong>fairly</strong>, giving marks only for correct answers, said Anshika.',
                sentenceHi: 'अंशिका ने कहा, शिक्षक ने सभी छात्रों के साथ <strong>निष्पक्षता</strong> से व्यवहार किया, केवल सही उत्तरों के लिए अंक दिए।',
                synonyms: ['Honestly', 'Justly'],
                antonyms: ['Unfairly', 'Biasedly'],
                extraInfo: 'Fairly is an Adverb. It means in a way that is honest, just, or reasonable.',
                extraInfoHi: 'Fairly (न्यायपूर्वक) एक क्रिया विशेषण है। इसका मतलब है ईमानदार, न्यायसंगत या उचित तरीके से।'
            },
            'through/by way of': {
                actualWord: 'Via',
                pos: 'Preposition',
                sentence: 'Shivansh sent the photo to his friend <strong>via</strong> WhatsApp.',
                sentenceHi: 'शिवांश ने WhatsApp <strong>के जरिए</strong> अपने दोस्त को फोटो भेजी।',
                synonyms: ['Through', 'By means of'],
                antonyms: [],
                extraInfo: 'Via is a Preposition. It means traveling through a place en route to a destination.',
                extraInfoHi: 'Via (के द्वारा/के जरिए) एक पूर्वसर्ग है। इसका मतलब है किसी स्थान से होकर गंतव्य तक जाना।'
            },
            'promote/praise': {
                actualWord: 'Tout',
                pos: 'Verb',
                sentence: 'The company tried to <strong>tout</strong> their new cream as a miracle cure, Yash noticed.',
                sentenceHi: 'यश ने देखा कि कंपनी ने अपनी नई क्रीम को चमत्कारी इलाज के रूप में <strong>प्रचारित</strong> करने की कोशिश की।',
                synonyms: ['Promote', 'Praise'],
                antonyms: ['Criticise', 'Discourage'],
                extraInfo: 'Tout is a Verb. It means to attempt to sell something, typically by pestering people, or to praise something energetically.',
                extraInfoHi: 'Tout (प्रचारित करना/दलाली करना) एक क्रिया है। इसका मतलब है किसी चीज़ को बेचने की कोशिश करना या किसी चीज़ की जोरदार तारीफ करना।'
            },
            'dead person': {
                actualWord: 'Deceased',
                pos: 'Adjective/Noun',
                sentence: 'The family prayed for the peace of the <strong>deceased</strong> soul, said Stuti.',
                sentenceHi: 'स्तुति ने कहा, परिवार ने <strong>मृतक</strong> आत्मा की शांति के लिए प्रार्थना की।',
                synonyms: ['Dead', 'Departed'],
                antonyms: ['Living', 'Alive'],
                extraInfo: 'Deceased is an Adjective or Noun. It refers to a person who has recently died.',
                extraInfoHi: 'Deceased (मृतक) एक विशेषण या संज्ञा है। यह उस व्यक्ति को संदर्भित करता है जिसकी हाल ही में मृत्यु हुई है।'
            },

            // ========== GATHRI 17: Life & Nature ==========
            'deadly/fatal': {
                actualWord: 'Lethal',
                pos: 'Adjective',
                sentence: 'The snake\'s poison is <strong>lethal</strong>, so Ankit stayed far away from it.',
                sentenceHi: 'सांप का जहर <strong>घातक</strong> है, इसलिए अंकित इससे दूर रहा।',
                synonyms: ['Deadly', 'Fatal'],
                antonyms: ['Harmless', 'Safe'],
                extraInfo: 'Lethal is an Adjective. It means something dangerous enough to cause death.',
                extraInfoHi: 'Lethal (घातक/जानलेवा) एक विशेषण है। इसका मतलब है कुछ इतना खतरनाक जो मौत का कारण बन सकता है।'
            },
            'hurt/upset': {
                actualWord: 'Aggrieved',
                pos: 'Adjective',
                sentence: 'Hari Kishan felt <strong>aggrieved</strong> when he was punished for a mistake he didn\'t make.',
                sentenceHi: 'हरी किशन ने खुद को <strong>आहत</strong> महसूस किया जब उसे उस गलती के लिए सजा मिली जो उसने नहीं की थी।',
                synonyms: ['Resentful', 'Wronged'],
                antonyms: ['Pleased', 'Satisfied'],
                extraInfo: 'Aggrieved is an Adjective. It describes a feeling of resentment because one has been treated unfairly.',
                extraInfoHi: 'Aggrieved (आहत/दुखी) एक विशेषण है। यह अनुचित व्यवहार के कारण नाराजगी की भावना का वर्णन करता है।'
            },
            'cover/enclose': {
                actualWord: 'Wrap',
                pos: 'Verb',
                sentence: 'Adarsh helped his sister <strong>wrap</strong> the birthday gift with colorful paper.',
                sentenceHi: 'आदर्श ने अपनी बहन को रंगीन कागज में जन्मदिन का उपहार <strong>लपेटने</strong> में मदद की।',
                synonyms: ['Cover', 'Enclose'],
                antonyms: ['Unwrap', 'Reveal'],
                extraInfo: 'Wrap is a Verb. It means to cover or enclose something in paper or soft material.',
                extraInfoHi: 'Wrap (लपेटना) एक क्रिया है। इसका मतलब है किसी चीज़ को कागज या मुलायम सामग्री में ढकना।'
            },
            'thick blanket': {
                actualWord: 'Quilt',
                pos: 'Noun',
                sentence: 'Ladli pulled the warm <strong>quilt</strong> over herself on the cold winter night.',
                sentenceHi: 'लाडली ने ठंडी सर्दी की रात में अपने ऊपर गर्म <strong>रजाई</strong> खींची।',
                synonyms: ['Duvet', 'Blanket'],
                antonyms: [],
                extraInfo: 'Quilt is a Noun. It is a warm bed covering made of padding enclosed between layers of fabric.',
                extraInfoHi: 'Quilt (रजाई) एक संज्ञा है। यह कपड़े की परतों के बीच पैडिंग से बना गर्म बिस्तर का कवर है।'
            },
            'dry spell/no rain': {
                actualWord: 'Drought',
                pos: 'Noun',
                sentence: 'The farmers were worried because the <strong>drought</strong> was destroying their crops, noted Aniket Kumar.',
                sentenceHi: 'अनिकेत कुमार ने नोट किया कि किसान चिंतित थे क्योंकि <strong>सूखा</strong> उनकी फसलों को नष्ट कर रहा था।',
                synonyms: ['Dryness', 'Aridity'],
                antonyms: ['Flood', 'Deluge'],
                extraInfo: 'Drought is a Noun. It is a prolonged period of abnormally low rainfall, leading to a shortage of water.',
                extraInfoHi: 'Drought (सूखा) एक संज्ञा है। यह असामान्य रूप से कम बारिश की लंबी अवधि है, जिससे पानी की कमी होती है।'
            },
            'sweet dish': {
                actualWord: 'Dessert',
                pos: 'Noun',
                sentence: 'Shivshant loves to eat gulab jamun for <strong>dessert</strong> after dinner.',
                sentenceHi: 'शिवशांत को रात के खाने के बाद <strong>मिठाई</strong> में गुलाब जामुन खाना पसंद है।',
                synonyms: ['Sweet', 'Pudding'],
                antonyms: ['Starter', 'Appetizer'],
                extraInfo: 'Dessert is a Noun. It is the sweet course eaten at the end of a meal (like ice cream or kheer).',
                extraInfoHi: 'Dessert (मिठाई/मीठा) एक संज्ञा है। यह भोजन के अंत में खाया जाने वाला मीठा व्यंजन है।'
            },
            'becoming desert': {
                actualWord: 'Desertification',
                pos: 'Noun',
                sentence: 'Divanshi learned that cutting too many trees can lead to <strong>desertification</strong>.',
                sentenceHi: 'दिवांशी ने सीखा कि बहुत अधिक पेड़ काटने से <strong>मरुस्थलीकरण</strong> हो सकता है।',
                synonyms: ['Land degradation'],
                antonyms: ['Reforestation'],
                extraInfo: 'Desertification is a Noun. It is the process by which fertile land becomes desert, usually due to drought or deforestation.',
                extraInfoHi: 'Desertification (मरुस्थलीकरण) एक संज्ञा है। यह वह प्रक्रिया है जिससे उपजाऊ जमीन रेगिस्तान बन जाती है।'
            },
            'body organ': {
                actualWord: 'Pancreas',
                pos: 'Noun',
                sentence: 'The doctor told Sakshi 2 that the <strong>pancreas</strong> produces insulin for the body.',
                sentenceHi: 'डॉक्टर ने साक्षी 2 को बताया कि <strong>अग्न्याशय</strong> शरीर के लिए इंसुलिन बनाता है।',
                synonyms: ['Organ', 'Gland'],
                antonyms: [],
                extraInfo: 'Pancreas is a Noun. It is a large gland behind the stomach that helps digestion and regulates sugar.',
                extraInfoHi: 'Pancreas (अग्न्याशय) एक संज्ञा है। यह पेट के पीछे एक बड़ी ग्रंथि है जो पाचन में मदद करती है और शर्करा को नियंत्रित करती है।'
            },
            'liking/affection': {
                actualWord: 'Fondness',
                pos: 'Noun',
                sentence: 'Vipin has a great <strong>fondness</strong> for playing cricket on Sundays.',
                sentenceHi: 'विपिन को रविवार को क्रिकेट खेलने का बहुत <strong>शौक</strong> है।',
                synonyms: ['Affection', 'Liking'],
                antonyms: ['Hatred', 'Dislike'],
                extraInfo: 'Fondness is a Noun. It means having an affection or liking for someone or something.',
                extraInfoHi: 'Fondness (शौक/लगाव) एक संज्ञा है। इसका मतलब है किसी व्यक्ति या चीज़ के प्रति प्रेम या लगाव।'
            },
            'died': {
                actualWord: 'Passed away',
                pos: 'Phrasal Verb',
                sentence: 'Madhu was very sad when her favorite actor <strong>passed away</strong>.',
                sentenceHi: 'मधु बहुत दुखी थी जब उसके पसंदीदा अभिनेता का <strong>निधन</strong> हुआ।',
                synonyms: ['Died', 'Expired'],
                antonyms: ['Born', 'Lived'],
                extraInfo: 'Passed away is a Phrasal Verb. It is a polite way of saying that someone has died.',
                extraInfoHi: 'Passed away (गुजर जाना/मर जाना) एक मुहावरा क्रिया है। यह कहने का विनम्र तरीका है कि किसी की मृत्यु हो गई।'
            },
            'succeed/go across': {
                actualWord: 'Pass',
                pos: 'Verb',
                sentence: 'Kishan studied very hard to <strong>pass</strong> the math exam with good marks.',
                sentenceHi: 'किशन ने अच्छे अंकों से गणित की परीक्षा <strong>पास</strong> करने के लिए बहुत मेहनत की।',
                synonyms: ['Succeed', 'Proceed'],
                antonyms: ['Fail', 'Stop'],
                extraInfo: 'Pass is a Verb. It means to be successful in a test or to move past something.',
                extraInfoHi: 'Pass (सफल होना/गुजरना) एक क्रिया है। इसका मतलब है परीक्षा में सफल होना या किसी चीज़ के पास से गुजरना।'
            },
            'neck passage': {
                actualWord: 'Throat',
                pos: 'Noun',
                sentence: 'Anshika drank hot water to soothe her sore <strong>throat</strong>.',
                sentenceHi: 'अंशिका ने अपने दुखते <strong>गले</strong> को आराम देने के लिए गर्म पानी पिया।',
                synonyms: ['Gullet', 'Neck'],
                antonyms: [],
                extraInfo: 'Throat is a Noun. It is the passage that leads from the back of the mouth down to the stomach and lungs.',
                extraInfoHi: 'Throat (गला) एक संज्ञा है। यह मुंह के पिछले हिस्से से पेट और फेफड़ों तक जाने वाला मार्ग है।'
            },
            'in spite of': {
                actualWord: 'Despite',
                pos: 'Preposition',
                sentence: 'Shivansh went to school <strong>despite</strong> the heavy rain.',
                sentenceHi: 'शिवांश भारी बारिश के <strong>बावजूद</strong> स्कूल गया।',
                synonyms: ['Regardless of', 'In spite of'],
                antonyms: ['Because of'],
                extraInfo: 'Despite is a Preposition. It means without being affected by; in spite of.',
                extraInfoHi: 'Despite (के बावजूद) एक पूर्वसर्ग है। इसका मतलब है प्रभावित हुए बिना।'
            },
            'hospital room/area': {
                actualWord: 'Ward',
                pos: 'Noun',
                sentence: 'Yash visited his grandfather in the general <strong>ward</strong> of the hospital.',
                sentenceHi: 'यश ने अपने दादाजी से अस्पताल के जनरल <strong>वार्ड</strong> में मिलने गया।',
                synonyms: ['Room', 'Section'],
                antonyms: [],
                extraInfo: 'Ward is a Noun. It usually refers to a separate room in a hospital or an administrative division of a city.',
                extraInfoHi: 'Ward (वार्ड/कक्ष) एक संज्ञा है। यह आमतौर पर अस्पताल में एक अलग कमरे या शहर के प्रशासनिक विभाग को संदर्भित करता है।'
            },
            'speak softly': {
                actualWord: 'Whisper',
                pos: 'Verb',
                sentence: 'Stuti leaned closer to <strong>whisper</strong> the secret answer to her friend.',
                sentenceHi: 'स्तुति ने अपनी सहेली को गुप्त जवाब <strong>फुसफुसाने</strong> के लिए करीब झुकी।',
                synonyms: ['Murmur', 'Mumble'],
                antonyms: ['Shout', 'Scream'],
                extraInfo: 'Whisper is a Verb. It means to speak very softly using one\'s breath without using the vocal cords, usually for secrecy.',
                extraInfoHi: 'Whisper (फुसफुसाना) एक क्रिया है। इसका मतलब है अपनी सांस का उपयोग करके बहुत धीरे से बोलना, आमतौर पर गोपनीयता के लिए।'
            },

            // ========== GATHRI 18: World & Expression ==========
            'beside/with': {
                actualWord: 'Along',
                pos: 'Preposition',
                sentence: 'Aniket walked <strong>along</strong> the river bank with his friends.',
                sentenceHi: 'अनिकेत अपने दोस्तों के साथ नदी के किनारे <strong>के साथ</strong> चला।',
                synonyms: ['Beside', 'By'],
                antonyms: ['Against', 'Apart'],
                extraInfo: 'Along is a Preposition. It means moving in a constant direction on a path or being in company with others.',
                extraInfoHi: 'Along (के साथ/किनारे) एक पूर्वसर्ग है। इसका मतलब है किसी रास्ते पर एक निरंतर दिशा में चलना या दूसरों के साथ होना।'
            },
            'coast/bank': {
                actualWord: 'Shore',
                pos: 'Noun',
                sentence: 'Deva sat on the <strong>shore</strong> and watched the waves.',
                sentenceHi: 'देवा <strong>किनारे</strong> पर बैठा और लहरों को देखा।',
                synonyms: ['Coast', 'Beach'],
                antonyms: ['Sea', 'Ocean center'],
                extraInfo: 'Shore is a Noun. It is the land along the edge of a sea, lake, or large river.',
                extraInfoHi: 'Shore (किनारा/तट) एक संज्ञा है। यह समुद्र, झील या बड़ी नदी के किनारे की जमीन है।'
            },
            'monitoring/notice': {
                actualWord: 'Observation',
                pos: 'Noun',
                sentence: 'The scientist kept the experiment under strict <strong>observation</strong>, Jhanvi noted.',
                sentenceHi: 'वैज्ञानिक ने प्रयोग को सख्त <strong>निगरानी</strong> में रखा, झांवी ने नोट किया।',
                synonyms: ['Inspection', 'Monitoring'],
                antonyms: ['Neglect', 'Indifference'],
                extraInfo: 'Observation is a Noun. It is the action of watching something or someone carefully to gain information.',
                extraInfoHi: 'Observation (निगरानी/अवलोकन) एक संज्ञा है। यह जानकारी प्राप्त करने के लिए किसी चीज़ या व्यक्ति को ध्यान से देखने की क्रिया है।'
            },
            'really/in fact': {
                actualWord: 'Indeed',
                pos: 'Adverb',
                sentence: '"It is <strong>indeed</strong> a very hot day," remarked Samriddhi Chaurasiya.',
                sentenceHi: '"यह <strong>वास्तव में</strong> बहुत गर्म दिन है," समृद्धि चौरसिया ने कहा।',
                synonyms: ['Certainly', 'Truly'],
                antonyms: ['Doubtfully'],
                extraInfo: 'Indeed is an Adverb. It is used to emphasize a statement or confirm something is true.',
                extraInfoHi: 'Indeed (वास्तव में/सचमुच) एक क्रिया विशेषण है। इसका उपयोग किसी कथन पर जोर देने या किसी बात की पुष्टि करने के लिए किया जाता है।'
            },
            'hit/surprise': {
                actualWord: 'Strike',
                pos: 'Verb',
                sentence: 'Arpit Pal was <strong>struck</strong> with wonder when he saw the beautiful Taj Mahal.',
                sentenceHi: 'अर्पित पाल जब ताजमहल देखा तो आश्चर्य से <strong>चकित</strong> रह गया।',
                synonyms: ['Hit', 'Impact', 'Amaze'],
                antonyms: ['Miss', 'Protect'],
                extraInfo: 'Strike (Past: Struck) is a Verb. It means to hit forcibly OR to affect someone deeply (like a sudden thought or surprise).',
                extraInfoHi: 'Strike (मारना/हैरान करना) एक क्रिया है। इसका मतलब है जोर से मारना या किसी को गहराई से प्रभावित करना।'
            },
            'own/have': {
                actualWord: 'Possess',
                pos: 'Verb',
                sentence: 'Kavya does not <strong>possess</strong> a bicycle yet, but she wants one.',
                sentenceHi: 'कव्या के <strong>पास</strong> अभी साइकिल नहीं है, लेकिन वह एक चाहती है।',
                synonyms: ['Own', 'Have'],
                antonyms: ['Lack', 'Lose'],
                extraInfo: 'Possess is a Verb. It means to have or own something.',
                extraInfoHi: 'Possess (पास होना/कब्जा करना) एक क्रिया है। इसका मतलब है किसी चीज़ का मालिक होना।'
            },
            'hard/rigid': {
                actualWord: 'Stiff',
                pos: 'Adjective',
                sentence: 'The new shoes were <strong>stiff</strong> and hurt Muskan\'s feet.',
                sentenceHi: 'नए जूते <strong>सख्त</strong> थे और मुस्कान के पैरों में दर्द हुआ।',
                synonyms: ['Rigid', 'Hard'],
                antonyms: ['Flexible', 'Soft'],
                extraInfo: 'Stiff is an Adjective. It means not easily bent or changed in shape; rigid.',
                extraInfoHi: 'Stiff (सख्त/कड़ा) एक विशेषण है। इसका मतलब है आसानी से न मुड़ने वाला; कठोर।'
            },
            'walk/rally': {
                actualWord: 'March',
                pos: 'Verb/Noun',
                sentence: 'Sanjana Nishad participated in the protest <strong>march</strong> (rally) yesterday.',
                sentenceHi: 'संजना निषाद ने कल विरोध <strong>जुलूस</strong> (रैली) में भाग लिया।',
                synonyms: ['Parade', 'Walk'],
                antonyms: ['Halt', 'Stop'],
                extraInfo: 'March is a Verb or Noun. It means to walk in a military manner or an organized procession (Rally).',
                extraInfoHi: 'March (पैदल चलना/जुलूस) एक क्रिया या संज्ञा है। इसका मतलब है सैन्य शैली में चलना या एक संगठित जुलूस।'
            },
            'give food': {
                actualWord: 'Feed',
                pos: 'Verb',
                sentence: 'Anubhav likes to <strong>feed</strong> the birds on his terrace every morning.',
                sentenceHi: 'अनुभव को हर सुबह अपनी छत पर पक्षियों को <strong>खिलाना</strong> पसंद है।',
                synonyms: ['Nourish', 'Serve'],
                antonyms: ['Starve'],
                extraInfo: 'Feed is a Verb. It means to give food to a person or animal.',
                extraInfoHi: 'Feed (खिलाना) एक क्रिया है। इसका मतलब है किसी व्यक्ति या जानवर को खाना देना।'
            },
            'reason/make happen': {
                actualWord: 'Cause',
                pos: 'Noun/Verb',
                sentence: 'Heavy rain was the <strong>cause</strong> of the flood, explained Ankit.',
                sentenceHi: 'अंकित ने बताया कि भारी बारिश बाढ़ का <strong>कारण</strong> थी।',
                synonyms: ['Reason', 'Source'],
                antonyms: ['Effect', 'Result'],
                extraInfo: 'Cause can be a Noun or a Verb. As a Noun: The reason why something happens. As a Verb: To make something happen.',
                extraInfoHi: 'Cause (वजह/कारण बनना) एक संज्ञा या क्रिया हो सकता है। संज्ञा: कारण। क्रिया: कुछ होने का कारण बनना।'
            },
            'speak/say': {
                actualWord: 'Utter',
                pos: 'Verb',
                sentence: 'Hari Kishan was so scared he could not <strong>utter</strong> a single word.',
                sentenceHi: 'हरी किशन इतना डरा हुआ था कि वह एक शब्द भी नहीं <strong>बोल</strong> सका।',
                synonyms: ['Speak', 'Say'],
                antonyms: ['Silence', 'Mute'],
                extraInfo: 'Utter is a Verb. It means to say something aloud or make a sound with your voice.',
                extraInfoHi: 'Utter (बोलना/बड़बड़ाना) एक क्रिया है। इसका मतलब है जोर से कुछ कहना या अपनी आवाज़ से ध्वनि निकालना।'
            },
            'nice/enjoyable': {
                actualWord: 'Pleasant',
                pos: 'Adjective',
                sentence: 'It was a very <strong>pleasant</strong> evening, so Adarsh went for a walk.',
                sentenceHi: 'यह बहुत <strong>सुहावनी</strong> शाम थी, इसलिए आदर्श टहलने गया।',
                synonyms: ['Nice', 'Delightful'],
                antonyms: ['Unpleasant', 'Nasty'],
                extraInfo: 'Pleasant is an Adjective. It describes something giving a sense of happy satisfaction or enjoyment.',
                extraInfoHi: 'Pleasant (सुहावना/अच्छा) एक विशेषण है। यह किसी ऐसी चीज़ का वर्णन करता है जो खुशी या आनंद की भावना देती है।'
            },
            'storyteller': {
                actualWord: 'Narrator',
                pos: 'Noun',
                sentence: 'Ladli acted as the <strong>narrator</strong> in the school play.',
                sentenceHi: 'लाडली ने स्कूल के नाटक में <strong>कथावाचक</strong> की भूमिका निभाई।',
                synonyms: ['Storyteller', 'Speaker'],
                antonyms: ['Listener'],
                extraInfo: 'Narrator is a Noun. It is the person who tells a story (in a book, movie, or play).',
                extraInfoHi: 'Narrator (कथावाचक) एक संज्ञा है। यह वह व्यक्ति है जो कहानी सुनाता है (किताब, फिल्म या नाटक में)।'
            },
            'unborn baby': {
                actualWord: 'Embryo',
                pos: 'Noun',
                sentence: 'Aniket Kumar learned in biology how a seed contains a plant <strong>embryo</strong>.',
                sentenceHi: 'अनिकेत कुमार ने जीव विज्ञान में सीखा कि बीज में पौधे का <strong>भ्रूण</strong> होता है।',
                synonyms: ['Fetus'],
                antonyms: ['Adult'],
                extraInfo: 'Embryo is a Noun. It is an unborn offspring in the process of development (early stage).',
                extraInfoHi: 'Embryo (भ्रूण) एक संज्ञा है। यह विकास की प्रक्रिया में एक अजन्मा जीव है (प्रारंभिक अवस्था)।'
            },
            'trip/fall': {
                actualWord: 'Stumble',
                pos: 'Verb',
                sentence: 'Shivshant saw the runner <strong>stumble</strong> but quickly get up and finish the race.',
                sentenceHi: 'शिवशांत ने देखा कि धावक <strong>ठोकर</strong> खाया लेकिन जल्दी उठकर दौड़ पूरी की।',
                synonyms: ['Trip', 'Slip'],
                antonyms: ['Stabilize'],
                extraInfo: 'Stumble is a Verb. It means to trip or momentarily lose one\'s balance; almost fall.',
                extraInfoHi: 'Stumble (ठोकर खाना) एक क्रिया है। इसका मतलब है ठोकर खाना या अस्थायी रूप से संतुलन खोना।'
            },

            // ========== GATHRI 19: Food & Mind ==========
            'enjoyment/taste': {
                actualWord: 'Relish',
                pos: 'Noun/Verb',
                sentence: 'Aniket ate the mango pickle with great <strong>relish</strong>.',
                sentenceHi: 'अनिकेत ने बड़े <strong>चाव</strong> से आम का अचार खाया।',
                synonyms: ['Enjoyment', 'Delight'],
                antonyms: ['Dislike', 'Apathy'],
                extraInfo: 'Relish can be a Noun or a Verb. As a Noun: Great enjoyment. As a Verb: To enjoy something greatly.',
                extraInfoHi: 'Relish (स्वाद/मजा लेना) एक संज्ञा या क्रिया हो सकता है। संज्ञा: बहुत आनंद। क्रिया: किसी चीज़ का बहुत आनंद लेना।'
            },
            'tasty/delicious': {
                actualWord: 'Appetizing',
                pos: 'Adjective',
                sentence: 'The smell of the cake was so <strong>appetizing</strong> that Deva felt hungry immediately.',
                sentenceHi: 'केक की खुशबू इतनी <strong>स्वादिष्ट</strong> थी कि देवा को तुरंत भूख लगी।',
                synonyms: ['Delicious', 'Tempting'],
                antonyms: ['Tasteless', 'Disgusting'],
                extraInfo: 'Appetizing is an Adjective. It describes food that looks or smells so good that you want to eat it.',
                extraInfoHi: 'Appetizing (स्वादिष्ट/मजेदार) एक विशेषण है। यह ऐसे खाने का वर्णन करता है जो इतना अच्छा दिखता या महकता है कि आप खाना चाहते हैं।'
            },
            'healthy/nutritious': {
                actualWord: 'Wholesome',
                pos: 'Adjective',
                sentence: 'Jhanvi prefers eating <strong>wholesome</strong> home-cooked food over junk food.',
                sentenceHi: 'झांवी जंक फूड की जगह <strong>पौष्टिक</strong> घर का बना खाना खाना पसंद करती है।',
                synonyms: ['Healthy', 'Nutritious'],
                antonyms: ['Unhealthy', 'Junk'],
                extraInfo: 'Wholesome is an Adjective. It describes food that is good for your health or things that are morally good.',
                extraInfoHi: 'Wholesome (पौष्टिक/हितकारी) एक विशेषण है। यह ऐसे भोजन का वर्णन करता है जो स्वास्थ्य के लिए अच्छा है।'
            },
            'food/repast': {
                actualWord: 'Meal',
                pos: 'Noun',
                sentence: 'Samriddhi Chaurasiya invited her friends for a special <strong>meal</strong> on her birthday.',
                sentenceHi: 'समृद्धि चौरसिया ने अपने जन्मदिन पर दोस्तों को एक खास <strong>भोजन</strong> के लिए आमंत्रित किया।',
                synonyms: ['Food', 'Feast'],
                antonyms: ['Starvation'],
                extraInfo: 'Meal is a Noun. It refers to the food eaten on regular occasions (like breakfast, lunch, or dinner).',
                extraInfoHi: 'Meal (खाना/भोजन) एक संज्ञा है। यह नियमित अवसरों पर खाए जाने वाले खाने को संदर्भित करता है।'
            },
            'transformation': {
                actualWord: 'Metamorphosis',
                pos: 'Noun',
                sentence: 'Arpit Pal was amazed to learn about the <strong>metamorphosis</strong> of a butterfly in science class.',
                sentenceHi: 'अर्पित पाल विज्ञान की कक्षा में तितली के <strong>कायांतरण</strong> के बारे में जानकर हैरान रह गया।',
                synonyms: ['Transformation', 'Change'],
                antonyms: ['Stagnation'],
                extraInfo: 'Metamorphosis is a Noun. It describes a complete change of form (like a caterpillar turning into a butterfly).',
                extraInfoHi: 'Metamorphosis (कायांतरण/रूप बदलना) एक संज्ञा है। यह रूप में पूर्ण परिवर्तन का वर्णन करता है (जैसे इल्ली का तितली में बदलना)।'
            },
            'fake doctor': {
                actualWord: 'Quack',
                pos: 'Noun',
                sentence: 'The villagers were warned not to take medicine from the <strong>quack</strong>, noted Kavya.',
                sentenceHi: 'कव्या ने बताया कि गाँव वालों को <strong>झोलाछाप डॉक्टर</strong> से दवा न लेने की चेतावनी दी गई।',
                synonyms: ['Fraud', 'Charlatan'],
                antonyms: ['Professional', 'Expert'],
                extraInfo: 'Quack is a Noun. It refers to a person who dishonestly claims to have medical knowledge (a fake doctor).',
                extraInfoHi: 'Quack (झोलाछाप डॉक्टर) एक संज्ञा है। यह उस व्यक्ति को संदर्भित करता है जो बेईमानी से चिकित्सा ज्ञान होने का दावा करता है।'
            },
            'intentionally': {
                actualWord: 'Deliberately',
                pos: 'Adverb',
                sentence: 'Muskan <strong>deliberately</strong> woke up early to study for the exam.',
                sentenceHi: 'मुस्कान ने परीक्षा की पढ़ाई के लिए <strong>जान-बूझकर</strong> जल्दी उठी।',
                synonyms: ['Intentionally', 'Purposely'],
                antonyms: ['Accidentally', 'Mistakenly'],
                extraInfo: 'Deliberately is an Adverb. It means doing something on purpose or intentionally.',
                extraInfoHi: 'Deliberately (जान-बूझकर) एक क्रिया विशेषण है। इसका मतलब है जानबूझकर या उद्देश्य से कुछ करना।'
            },
            'tiredness/exhaustion': {
                actualWord: 'Fatigue',
                pos: 'Noun',
                sentence: 'After playing football for two hours, Sanjana Nishad felt great <strong>fatigue</strong>.',
                sentenceHi: 'दो घंटे फुटबॉल खेलने के बाद, संजना निषाद को बहुत <strong>थकान</strong> महसूस हुई।',
                synonyms: ['Tiredness', 'Exhaustion'],
                antonyms: ['Energy', 'Vigor'],
                extraInfo: 'Fatigue is a Noun. It means extreme tiredness resulting from mental or physical exertion.',
                extraInfoHi: 'Fatigue (थकान) एक संज्ञा है। इसका मतलब है मानसिक या शारीरिक परिश्रम के कारण अत्यधिक थकान।'
            },
            'suitable/proper': {
                actualWord: 'Appropriate',
                pos: 'Adjective',
                sentence: 'Anubhav wore <strong>appropriate</strong> clothes for the wedding ceremony.',
                sentenceHi: 'अनुभव ने शादी समारोह के लिए <strong>उचित</strong> कपड़े पहने।',
                synonyms: ['Suitable', 'Correct'],
                antonyms: ['Inappropriate', 'Unsuitable'],
                extraInfo: 'Appropriate is an Adjective. It means suitable or proper in the circumstances.',
                extraInfoHi: 'Appropriate (उचित/सही) एक विशेषण है। इसका मतलब है परिस्थितियों में उपयुक्त या सही।'
            },
            'small village': {
                actualWord: 'Hamlet',
                pos: 'Noun',
                sentence: 'Ankit visited a small <strong>hamlet</strong> near the river to see his grandmother.',
                sentenceHi: 'अंकित ने अपनी दादी से मिलने नदी के पास एक छोटे <strong>पुरवे</strong> का दौरा किया।',
                synonyms: ['Settlement', 'Small village'],
                antonyms: ['Metropolis', 'City'],
                extraInfo: 'Hamlet is a Noun. It refers to a small settlement, generally smaller than a village.',
                extraInfoHi: 'Hamlet (छोटा गाँव/पुरवा) एक संज्ञा है। यह एक छोटी बस्ती को संदर्भित करता है, आमतौर पर गाँव से छोटी।'
            },
            'at whatever time': {
                actualWord: 'Whenever',
                pos: 'Conjunction',
                sentence: 'Hari Kishan smiles <strong>whenever</strong> he sees his favorite teacher.',
                sentenceHi: 'हरी किशन <strong>जब भी</strong> अपने पसंदीदा शिक्षक को देखता है तो मुस्कुराता है।',
                synonyms: ['Anytime', 'Every time'],
                antonyms: ['Never'],
                extraInfo: 'Whenever is a Conjunction. It means at whatever time; on every occasion that.',
                extraInfoHi: 'Whenever (जब भी/जब कभी) एक संयोजक है। इसका मतलब है किसी भी समय; हर अवसर पर।'
            },
            'false idea/trick': {
                actualWord: 'Illusion',
                pos: 'Noun',
                sentence: 'The magician created an <strong>illusion</strong> that the rabbit had disappeared, surprising Adarsh.',
                sentenceHi: 'जादूगर ने एक <strong>भ्रम</strong> पैदा किया कि खरगोश गायब हो गया, जिससे आदर्श हैरान रह गया।',
                synonyms: ['Delusion', 'Trick'],
                antonyms: ['Reality', 'Fact'],
                extraInfo: 'Illusion is a Noun. It is a false idea or belief; something that is likely to be wrongly perceived by the senses.',
                extraInfoHi: 'Illusion (भ्रम/आभास) एक संज्ञा है। यह एक गलत विचार या विश्वास है; कुछ ऐसा जिसे इंद्रियों द्वारा गलत तरीके से समझा जा सकता है।'
            },
            'food supplies/store': {
                actualWord: 'Grocery',
                pos: 'Noun',
                sentence: 'Ladli went to the <strong>grocery</strong> store to buy rice and sugar.',
                sentenceHi: 'लाडली चावल और चीनी खरीदने <strong>किराना</strong> दुकान गई।',
                synonyms: ['Provisions', 'Foodstuff'],
                antonyms: [],
                extraInfo: 'Grocery is a Noun. It refers to a grocer\'s store or items of food sold in a grocer\'s store.',
                extraInfoHi: 'Grocery (किराना/राशन) एक संज्ञा है। यह किराना दुकान या किराना दुकान में बिकने वाली खाद्य वस्तुओं को संदर्भित करता है।'
            },
            'handle cleverly': {
                actualWord: 'Manipulate',
                pos: 'Verb',
                sentence: 'Aniket Kumar knows how to <strong>manipulate</strong> numbers to solve math problems quickly.',
                sentenceHi: 'अनिकेत कुमार जानता है कि गणित की समस्याओं को जल्दी हल करने के लिए संख्याओं को कैसे <strong>चतुराई से संभालना</strong> है।',
                synonyms: ['Control', 'Influence'],
                antonyms: ['Leave alone'],
                extraInfo: 'Manipulate is a Verb. It means to control or influence a person or situation cleverly or unfairly.',
                extraInfoHi: 'Manipulate (चालाकी से काम निकालना) एक क्रिया है। इसका मतलब है किसी व्यक्ति या स्थिति को चतुराई से या अनुचित तरीके से नियंत्रित करना।'
            },
            'rod/stick': {
                actualWord: 'Bar',
                pos: 'Noun',
                sentence: 'Shivshant used an iron <strong>bar</strong> to lift the heavy stone.',
                sentenceHi: 'शिवशांत ने भारी पत्थर उठाने के लिए लोहे की <strong>छड़</strong> का इस्तेमाल किया।',
                synonyms: ['Rod', 'Pole'],
                antonyms: [],
                extraInfo: 'Bar is a Noun. It is a long rigid piece of wood, metal, or similar material.',
                extraInfoHi: 'Bar (छड़ी/डंडा) एक संज्ञा है। यह लकड़ी, धातु या इसी तरह की सामग्री का एक लंबा कठोर टुकड़ा है।'
            },

            // ========== GATHRI 20: People & Character ==========
            'innocent/easily tricked': {
                actualWord: 'Gullible',
                pos: 'Adjective',
                sentence: 'Aniket is so <strong>gullible</strong> that he believed the fake lottery message.',
                sentenceHi: 'अनिकेत इतना <strong>भोला</strong> है कि उसने फर्जी लॉटरी वाले मैसेज पर विश्वास कर लिया।',
                synonyms: ['Innocent', 'Trusting'],
                antonyms: ['Suspicious', 'Clever'],
                extraInfo: 'Gullible is an Adjective. It describes someone who is easily persuaded to believe something or easily tricked.',
                extraInfoHi: 'Gullible (भोला/आसानी से धोखा खाने वाला) एक विशेषण है। यह किसी ऐसे व्यक्ति का वर्णन करता है जिसे आसानी से किसी बात पर विश्वास दिलाया जा सकता है।'
            },
            'cleanliness': {
                actualWord: 'Hygiene',
                pos: 'Noun',
                sentence: 'The teacher told Kavya to maintain good <strong>hygiene</strong> by bathing daily.',
                sentenceHi: 'शिक्षक ने कव्या को रोज नहाकर अच्छी <strong>स्वच्छता</strong> बनाए रखने को कहा।',
                synonyms: ['Cleanliness', 'Sanitation'],
                antonyms: ['Dirtiness', 'Unhygienic'],
                extraInfo: 'Hygiene is a Noun. It refers to conditions or practices that help to maintain health and prevent disease, especially through cleanliness.',
                extraInfoHi: 'Hygiene (स्वच्छता) एक संज्ञा है। यह उन स्थितियों या प्रथाओं को संदर्भित करता है जो स्वास्थ्य बनाए रखने और बीमारी को रोकने में मदद करती हैं।'
            },
            'sarcasm/opposite of what is expected': {
                actualWord: 'Irony',
                pos: 'Noun',
                sentence: 'The <strong>irony</strong> is that Deva, who works at a police station, had his own bicycle stolen!',
                sentenceHi: 'यह बड़ी <strong>विडंबना</strong> है कि देवा जो पुलिस स्टेशन में काम करता है, उसी की साइकिल चोरी हो गई!',
                synonyms: ['Sarcasm', 'Paradox'],
                antonyms: ['Sincerity', 'Expected'],
                extraInfo: 'Irony is a Noun. It is a situation that is strange or funny because things happen in a way that seems the exact opposite of what you expected.',
                extraInfoHi: 'Irony (ताना/विडंबना) एक संज्ञा है। यह ऐसी स्थिति है जो अजीब या मज़ेदार है क्योंकि चीज़ें उम्मीद के बिल्कुल विपरीत होती हैं।'
            },
            'chance/likelihood': {
                actualWord: 'Probability',
                pos: 'Noun',
                sentence: 'The <strong>probability</strong> of rain today is very high, so Jhanvi carried an umbrella.',
                sentenceHi: 'आज बारिश होने की <strong>संभावना</strong> बहुत ज़्यादा है, इसलिए झांवी ने छाता रख लिया।',
                synonyms: ['Chance', 'Likelihood'],
                antonyms: ['Impossibility', 'Certainty'],
                extraInfo: 'Probability is a Noun. It is the extent to which something is likely to happen.',
                extraInfoHi: 'Probability (प्रायिकता/संभावना) एक संज्ञा है। यह इस बात की सीमा है कि कुछ होने की कितनी संभावना है।'
            },
            'act/fake': {
                actualWord: 'Pretend',
                pos: 'Verb',
                sentence: 'Samriddhi Chaurasiya <strong>pretend</strong>ed to have a stomachache to avoid going to school.',
                sentenceHi: 'समृद्धि चौरसिया ने स्कूल न जाने के लिए पेट दर्द का <strong>बहाना</strong> किया।',
                synonyms: ['Act', 'Fake'],
                antonyms: ['Be genuine', 'Tell truth'],
                extraInfo: 'Pretend is a Verb. It means to behave so as to make it appear that something is the case when in fact it is not.',
                extraInfoHi: 'Pretend (बहाना करना/दिखावा करना) एक क्रिया है। इसका मतलब है ऐसा व्यवहार करना जिससे लगे कि कुछ सच है जबकि वास्तव में ऐसा नहीं है।'
            },
            'search blindly with hands': {
                actualWord: 'Grope',
                pos: 'Verb',
                sentence: 'When the power went out suddenly, Arpit Pal <strong>grope</strong>d along the wall for the switch.',
                sentenceHi: 'अचानक लाइट चली गई, तो अर्पित पाल दीवार पर स्विच के लिए <strong>टटोलने</strong> लगा।',
                synonyms: ['Fumble', 'Feel blindly'],
                antonyms: ['See', 'Grasp confidently'],
                extraInfo: 'Grope is a Verb. It means to feel about or search blindly or uncertainly with the hands.',
                extraInfoHi: 'Grope (टटोलना) एक क्रिया है। इसका मतलब है हाथों से अंधेरे में या अनिश्चित रूप से ढूँढना।'
            },
            'decision/judgment': {
                actualWord: 'Verdict',
                pos: 'Noun',
                sentence: 'The judge announced the <strong>verdict</strong> and freed the innocent man, Muskan saw on the news.',
                sentenceHi: 'जज ने अपना <strong>फैसला</strong> सुनाया और निर्दोष आदमी को रिहा कर दिया, मुस्कान ने न्यूज में देखा।',
                synonyms: ['Decision', 'Judgment'],
                antonyms: ['Accusation'],
                extraInfo: 'Verdict is a Noun. It is a decision on a disputed issue in a civil or criminal case.',
                extraInfoHi: 'Verdict (फैसला/निर्णय) एक संज्ञा है। यह किसी दीवानी या आपराधिक मामले में विवादित मुद्दे पर निर्णय है।'
            },
            'companion/peer': {
                actualWord: 'Fellow',
                pos: 'Noun/Adjective',
                sentence: 'Sanjana Nishad always helps her <strong>fellow</strong> students in class.',
                sentenceHi: 'संजना निषाद हमेशा क्लास में अपने <strong>साथी</strong> छात्रों की मदद करती है।',
                synonyms: ['Companion', 'Partner'],
                antonyms: ['Opponent', 'Enemy'],
                extraInfo: 'Fellow is a Noun or Adjective. It refers to a person in the same situation, condition, or class as you.',
                extraInfoHi: 'Fellow (साथी/सहकर्मी) एक संज्ञा या विशेषण है। यह आपके समान स्थिति या श्रेणी के व्यक्ति को संदर्भित करता है।'
            },
            'traveler': {
                actualWord: 'Passenger',
                pos: 'Noun',
                sentence: 'As soon as the train stopped, all the <strong>passenger</strong>s rushed to get off, including Anubhav.',
                sentenceHi: 'ट्रेन रुकते ही सारे <strong>यात्री</strong> जल्दी से उतरने लगे, जिसमें अनुभव भी था।',
                synonyms: ['Traveler', 'Commuter'],
                antonyms: ['Driver', 'Crew'],
                extraInfo: 'Passenger is a Noun. It is a person who is traveling in a vehicle but is not driving it or working on it.',
                extraInfoHi: 'Passenger (यात्री/मुसाफिर) एक संज्ञा है। यह वह व्यक्ति है जो किसी वाहन में यात्रा कर रहा है लेकिन उसे चला या संचालित नहीं कर रहा।'
            },
            'brother or sister': {
                actualWord: 'Sibling',
                pos: 'Noun',
                sentence: 'Ankit and his younger <strong>sibling</strong> always fight over the TV remote.',
                sentenceHi: 'अंकित और उसकी छोटी <strong>बहन</strong> हमेशा TV रिमोट के लिए लड़ते हैं।',
                synonyms: ['Brother', 'Sister'],
                antonyms: ['Only child'],
                extraInfo: 'Sibling is a Noun. It refers to each of two or more children having one or both parents in common; a brother or sister.',
                extraInfoHi: 'Sibling (भाई-बहन) एक संज्ञा है। यह एक या दोनों माता-पिता साझा करने वाले बच्चों में से प्रत्येक को संदर्भित करता है।'
            },
            'money owed/loan': {
                actualWord: 'Debt',
                pos: 'Noun',
                sentence: 'Hari Kishan worked day and night to pay off all his bank <strong>debt</strong>.',
                sentenceHi: 'हरी किशन ने दिन-रात मेहनत करके बैंक का सारा <strong>कर्ज</strong> चुका दिया।',
                synonyms: ['Loan', 'Liability'],
                antonyms: ['Asset', 'Profit'],
                extraInfo: 'Debt is a Noun. It is a sum of money that is owed or due to someone else.',
                extraInfoHi: 'Debt (कर्ज/ऋण) एक संज्ञा है। यह वह धनराशि है जो किसी अन्य व्यक्ति को देनी होती है।'
            },
            'impolite/bad-mannered': {
                actualWord: 'Rude',
                pos: 'Adjective',
                sentence: 'Adarsh never speaks in a <strong>rude</strong> manner to anyone; he respects everyone.',
                sentenceHi: 'आदर्श कभी किसी से <strong>बदतमीजी</strong> से बात नहीं करता, वो सबका आदर करता है।',
                synonyms: ['Impolite', 'Disrespectful'],
                antonyms: ['Polite', 'Respectful'],
                extraInfo: 'Rude is an Adjective. It means offensively impolite or bad-mannered.',
                extraInfoHi: 'Rude (अभद्र/बदतमीज) एक विशेषण है। इसका मतलब है अपमानजनक रूप से अशिष्ट या बदतमीज।'
            },
            'brave/fearless': {
                actualWord: 'Bold',
                pos: 'Adjective',
                sentence: 'Ladli made a <strong>bold</strong> decision to speak on stage in front of the whole assembly.',
                sentenceHi: 'लाडली ने भरी सभा में स्टेज पर बोलने का <strong>साहसी</strong> फैसला लिया।',
                synonyms: ['Brave', 'Fearless'],
                antonyms: ['Timid', 'Cowardly'],
                extraInfo: 'Bold is an Adjective. It describes a person showing an ability to take risks; confident and courageous.',
                extraInfoHi: 'Bold (साहसी/निडर) एक विशेषण है। यह ऐसे व्यक्ति का वर्णन करता है जो जोखिम लेने की क्षमता दिखाता है; आत्मविश्वासी और साहसी।'
            },
            'intimidate/threaten': {
                actualWord: 'Bully',
                pos: 'Noun/Verb',
                sentence: 'It is very wrong to <strong>bully</strong> a younger child in school, Aniket Kumar explained.',
                sentenceHi: 'स्कूल में किसी छोटे बच्चे को <strong>धमकाना</strong> बहुत गलत बात है, अनिकेत कुमार ने बताया।',
                synonyms: ['Threaten', 'Intimidate'],
                antonyms: ['Support', 'Defend'],
                extraInfo: 'Bully can be a Noun or a Verb. As a Verb: To seek to harm, intimidate, or coerce someone perceived as vulnerable. As a Noun: A person who habitually threatens others.',
                extraInfoHi: 'Bully (धमकाना/डराना) एक संज्ञा या क्रिया हो सकता है। क्रिया: किसी कमजोर व्यक्ति को नुकसान पहुँचाना या डराना। संज्ञा: वह व्यक्ति जो आदतन दूसरों को धमकाता है।'
            },
            'modest/polite': {
                actualWord: 'Humble',
                pos: 'Adjective',
                sentence: 'Even after getting such great results, Shivshant remains very <strong>humble</strong>.',
                sentenceHi: 'इतना अच्छा रिजल्ट आने के बाद भी, शिवशांत का स्वभाव बहुत <strong>विनम्र</strong> है।',
                synonyms: ['Modest', 'Polite'],
                antonyms: ['Arrogant', 'Proud'],
                extraInfo: 'Humble is an Adjective. It means having or showing a modest or low estimate of one\'s own importance; not proud.',
                extraInfoHi: 'Humble (विनम्र/साधारण) एक विशेषण है। इसका मतलब है अपने महत्व का विनम्र या कम अनुमान रखना; घमंडी न होना।'
            },

            // ========== GATHRI 21: Skills & Actions ==========
            'weave/make clothes': {
                actualWord: 'Knit',
                pos: 'Verb',
                sentence: 'Jhanvi\'s grandmother is <strong>knit</strong>ting a beautiful red sweater for her.',
                sentenceHi: 'झांवी की दादी उसके लिए एक सुंदर लाल स्वेटर <strong>बुन</strong> रही हैं।',
                synonyms: ['Weave', 'Stitch'],
                antonyms: ['Unravel', 'Undo'],
                extraInfo: 'Knit is a Verb. It means to make clothes (like a sweater) by interlocking loops of wool or yarn.',
                extraInfoHi: 'Knit (बुनना) एक क्रिया है। इसका मतलब है ऊन या धागे की फंदों को आपस में गूँथकर कपड़े (जैसे स्वेटर) बनाना।'
            },
            'proud/haughty': {
                actualWord: 'Arrogant',
                pos: 'Adjective',
                sentence: 'Deva does not like <strong>arrogant</strong> people who look down on others.',
                sentenceHi: 'देवा को <strong>घमंडी</strong> लोग बिल्कुल पसंद नहीं हैं जो दूसरों को छोटा समझते हैं।',
                synonyms: ['Proud', 'Haughty'],
                antonyms: ['Humble', 'Modest'],
                extraInfo: 'Arrogant is an Adjective. It describes someone who behaves in a proud and unpleasant way, thinking they are better than others.',
                extraInfoHi: 'Arrogant (घमंडी) एक विशेषण है। यह किसी ऐसे व्यक्ति का वर्णन करता है जो घमंड से व्यवहार करता है और खुद को दूसरों से बेहतर समझता है।'
            },
            'purifying liquid': {
                actualWord: 'Distillation',
                pos: 'Noun',
                sentence: 'In science class, Arpit Pal observed the <strong>distillation</strong> process used to purify water.',
                sentenceHi: 'विज्ञान की कक्षा में अर्पित पाल ने पानी को शुद्ध करने की <strong>आसवन</strong> प्रक्रिया देखी।',
                synonyms: ['Purification', 'Refining'],
                antonyms: ['Contamination', 'Pollution'],
                extraInfo: 'Distillation is a Noun. It is a science process used to purify a liquid by heating and cooling it.',
                extraInfoHi: 'Distillation (आसवन/शुद्ध करना) एक संज्ञा है। यह एक विज्ञान प्रक्रिया है जिसमें तरल को गर्म और ठंडा करके शुद्ध किया जाता है।'
            },
            'gather/collect': {
                actualWord: 'Accumulate',
                pos: 'Verb',
                sentence: 'Muskan has <strong>accumulate</strong>d a lot of coins in her piggy bank.',
                sentenceHi: 'मुस्कान ने अपनी गुल्लक में बहुत सारे सिक्के <strong>इकट्ठा</strong> कर लिए हैं।',
                synonyms: ['Collect', 'Gather'],
                antonyms: ['Scatter', 'Disperse'],
                extraInfo: 'Accumulate is a Verb. It means to gather or collect something together over time.',
                extraInfoHi: 'Accumulate (इकट्ठा होना/करना) एक क्रिया है। इसका मतलब है समय के साथ कुछ इकट्ठा करना।'
            },
            'liquid food/broth': {
                actualWord: 'Soup',
                pos: 'Noun',
                sentence: 'During the winter season, Sanjana Nishad loves to have a warm tomato <strong>soup</strong>.',
                sentenceHi: 'सर्दियों के मौसम में संजना निषाद को गरम टमाटर का <strong>सूप</strong> पीना बहुत पसंद है।',
                synonyms: ['Broth', 'Stew'],
                antonyms: ['Solid food'],
                extraInfo: 'Soup is a Noun. It is a liquid dish, typically made by boiling meat, fish, or vegetables.',
                extraInfoHi: 'Soup (सूप/रसेदार खाना) एक संज्ञा है। यह एक तरल व्यंजन है जो आमतौर पर मांस, मछली या सब्जियों को उबालकर बनाया जाता है।'
            },
            'get/acquire': {
                actualWord: 'Obtain',
                pos: 'Verb',
                sentence: 'Anubhav <strong>obtain</strong>ed the highest marks in class through his hard work.',
                sentenceHi: 'अनुभव ने अपनी मेहनत से कक्षा में सबसे अधिक अंक <strong>प्राप्त</strong> किए।',
                synonyms: ['Get', 'Acquire'],
                antonyms: ['Lose', 'Give up'],
                extraInfo: 'Obtain is a Verb. It means to get or acquire something, usually by effort.',
                extraInfoHi: 'Obtain (प्राप्त करना) एक क्रिया है। इसका मतलब है कुछ पाना या हासिल करना, आमतौर पर प्रयास से।'
            },
            'thread/cord': {
                actualWord: 'String',
                pos: 'Noun',
                sentence: 'Kavya used a strong <strong>string</strong> to fly her kite.',
                sentenceHi: 'कव्या ने पतंग उड़ाने के लिए एक मजबूत <strong>डोरी</strong> का इस्तेमाल किया।',
                synonyms: ['Thread', 'Cord'],
                antonyms: [],
                extraInfo: 'String is a Noun. It is a material consisting of threads of cotton, hemp, or other material twisted together to form a thin length.',
                extraInfoHi: 'String (धागा/डोरी) एक संज्ञा है। यह सूत, भांग या अन्य सामग्री के धागों से मिलकर बना होता है।'
            },
            'previous/earlier': {
                actualWord: 'Former',
                pos: 'Adjective',
                sentence: 'Samriddhi Chaurasiya misses her friends from her <strong>former</strong> school very much.',
                sentenceHi: 'समृद्धि चौरसिया अपने <strong>पहले</strong> स्कूल के दोस्तों को बहुत याद करती है।',
                synonyms: ['Previous', 'Earlier'],
                antonyms: ['Current', 'Future'],
                extraInfo: 'Former is an Adjective. It refers to something that happened or existed in the past, or the first of two things mentioned.',
                extraInfoHi: 'Former (पूर्व/पहला) एक विशेषण है। यह अतीत में हुई या मौजूद किसी चीज को संदर्भित करता है।'
            },
            'reason/make happen': {
                actualWord: 'Cause',
                pos: 'Noun/Verb',
                sentence: 'The main <strong>cause</strong> of the traffic jam was a fallen tree on the road, Aniket explained.',
                sentenceHi: 'ट्रैफिक जाम का मुख्य <strong>कारण</strong> सड़क पर गिरा हुआ पेड़ था, अनिकेत ने बताया।',
                synonyms: ['Reason', 'Source'],
                antonyms: ['Effect', 'Result'],
                extraInfo: 'Cause can be a Noun or a Verb. As a Noun: The reason why something happens. As a Verb: To make something happen.',
                extraInfoHi: 'Cause (कारण/वजह) एक संज्ञा या क्रिया हो सकता है। संज्ञा: कुछ होने का कारण। क्रिया: कुछ घटित कराना।'
            },
            'unfinished/remaining': {
                actualWord: 'Pending',
                pos: 'Adjective',
                sentence: 'The teacher told Yash to complete all his <strong>pending</strong> homework today itself.',
                sentenceHi: 'शिक्षक ने यश को अपना सारा <strong>बाकी</strong> होमवर्क आज ही पूरा करने को कहा।',
                synonyms: ['Unfinished', 'Remaining'],
                antonyms: ['Finished', 'Resolved'],
                extraInfo: 'Pending is an Adjective. It describes something that is waiting to be decided or completed.',
                extraInfoHi: 'Pending (बची हुई/लंबित) एक विशेषण है। यह किसी ऐसी चीज़ का वर्णन करता है जो तय या पूरी होने की प्रतीक्षा में है।'
            },
            'on purpose': {
                actualWord: 'Intentionally',
                pos: 'Adverb',
                sentence: 'Shivansh did not <strong>intentionally</strong> hurt anyone; it was just an accident.',
                sentenceHi: 'शिवांश ने <strong>जान-बूझकर</strong> किसी को चोट नहीं पहुँचाई; यह बस एक दुर्घटना थी।',
                synonyms: ['Deliberately', 'Purposely'],
                antonyms: ['Accidentally', 'Unintentionally'],
                extraInfo: 'Intentionally is an Adverb. It means doing something deliberately or on purpose, not by accident.',
                extraInfoHi: 'Intentionally (जान बूझ कर) एक क्रिया विशेषण है। इसका मतलब है जानबूझकर या उद्देश्य से कुछ करना, दुर्घटनावश नहीं।'
            },
            'release/let go': {
                actualWord: 'Unleash',
                pos: 'Verb',
                sentence: 'As soon as they reached the park, Stuti <strong>unleash</strong>ed her dog from the leash.',
                sentenceHi: 'पार्क पहुँचते ही स्तुति ने अपने कुत्ते का पट्टा <strong>खोल</strong> दिया।',
                synonyms: ['Release', 'Free'],
                antonyms: ['Restrain', 'Tie up'],
                extraInfo: 'Unleash is a Verb. It means to release an animal from a leash or to release a strong force.',
                extraInfoHi: 'Unleash (पट्टा खोलना/मुक्त करना) एक क्रिया है। इसका मतलब है किसी जानवर को पट्टे से छोड़ना या किसी शक्तिशाली बल को मुक्त करना।'
            },
            'remaining food/stuff': {
                actualWord: 'Leftovers',
                pos: 'Noun',
                sentence: 'After the party, Ankit distributed all the <strong>leftovers</strong> among the poor.',
                sentenceHi: 'पार्टी के बाद अंकित ने सारा <strong>बचा हुआ खाना</strong> गरीबों में बाँट दिया।',
                synonyms: ['Remains', 'Remnants'],
                antonyms: ['Freshly cooked food'],
                extraInfo: 'Leftovers is a Noun (usually plural). It refers to food remaining after the rest has been used or eaten.',
                extraInfoHi: 'Leftovers (बचा-कुचा खाना) एक संज्ञा है। यह उस खाने को संदर्भित करता है जो बाकी के उपयोग या खाने के बाद बच जाता है।'
            },
            'recognize/find out': {
                actualWord: 'Identify',
                pos: 'Verb',
                sentence: 'The police <strong>identif</strong>ied the thief immediately by watching the CCTV footage.',
                sentenceHi: 'पुलिस ने CCTV फुटेज देखकर चोर को तुरंत <strong>पहचान</strong> लिया।',
                synonyms: ['Recognize', 'Discover'],
                antonyms: ['Confuse', 'Mistake'],
                extraInfo: 'Identify is a Verb. It means to recognize or establish who or what someone or something is.',
                extraInfoHi: 'Identify (पहचानना) एक क्रिया है। इसका मतलब है किसी व्यक्ति या वस्तु को पहचानना या स्थापित करना।'
            },
            'candidate/hopeful': {
                actualWord: 'Aspirant',
                pos: 'Noun',
                sentence: 'Hari Kishan is an Army <strong>aspirant</strong>, so he wakes up early every morning to go for a run.',
                sentenceHi: 'हरी किशन एक आर्मी <strong>उम्मीदवार</strong> है, इसलिए वो रोज सुबह जल्दी उठकर दौड़ लगाता है।',
                synonyms: ['Candidate', 'Hopeful'],
                antonyms: [],
                extraInfo: 'Aspirant is a Noun. It is a person who has ambitions to achieve something, like a specific job or position.',
                extraInfoHi: 'Aspirant (उम्मीदवार/तैयारी करने वाला) एक संज्ञा है। यह वह व्यक्ति है जिसकी किसी विशेष नौकरी या पद को हासिल करने की महत्वाकांक्षा है।'
            },

            // ========== GATHRI 22: Life & Society ==========
            'desire/wish': {
                actualWord: 'Will',
                pos: 'Noun/Verb',
                sentence: 'Aniket has a strong <strong>will</strong> to become a successful doctor when he grows up.',
                sentenceHi: 'अनिकेत की प्रबल <strong>इच्छा</strong> है कि वो बड़ा होकर एक सफल डॉक्टर बने।',
                synonyms: ['Desire', 'Determination'],
                antonyms: ['Reluctance', 'Apathy'],
                extraInfo: 'Will can be a Noun or a Verb. As a Noun: A strong desire or determination to do something.',
                extraInfoHi: 'Will (इच्छा) एक संज्ञा या क्रिया हो सकता है। संज्ञा: कुछ करने की प्रबल इच्छा या दृढ़ संकल्प।'
            },
            'destiny': {
                actualWord: 'Fate',
                pos: 'Noun',
                sentence: 'Deva believes that through hard work and good education, we can change our <strong>fate</strong>.',
                sentenceHi: 'देवा मानता है कि मेहनत और अच्छी पढ़ाई से हम अपना <strong>भाग्य</strong> बदल सकते हैं।',
                synonyms: ['Destiny', 'Luck'],
                antonyms: ['Choice', 'Free will'],
                extraInfo: 'Fate is a Noun. It refers to the events outside a person\'s control, determined by a supernatural power; destiny.',
                extraInfoHi: 'Fate (भाग्य/किस्मत) एक संज्ञा है। यह किसी व्यक्ति के नियंत्रण से बाहर की घटनाओं को संदर्भित करता है।'
            },
            'chaos/confusion': {
                actualWord: 'Turmoil',
                pos: 'Noun',
                sentence: 'The rumour of a fire in the market caused <strong>turmoil</strong> everywhere, Jhanvi reported.',
                sentenceHi: 'बाज़ार में आग लगने की अफवाह से हर जगह <strong>अफरा-तफरी</strong> मच गई, झांवी ने बताया।',
                synonyms: ['Chaos', 'Disorder'],
                antonyms: ['Peace', 'Calm'],
                extraInfo: 'Turmoil is a Noun. It is a state of great disturbance, confusion, or uncertainty.',
                extraInfoHi: 'Turmoil (अफरा-तफरी/अशांति) एक संज्ञा है। यह बड़ी अशांति, भ्रम या अनिश्चितता की स्थिति है।'
            },
            'shining/smart': {
                actualWord: 'Bright',
                pos: 'Adjective',
                sentence: 'Samriddhi Chaurasiya wore a very beautiful and <strong>bright</strong> yellow dress at the annual function.',
                sentenceHi: 'समृद्धि चौरसिया ने वार्षिक समारोह में बहुत सुंदर और <strong>चमकीली</strong> पीली ड्रेस पहनी।',
                synonyms: ['Shining', 'Radiant'],
                antonyms: ['Dark', 'Dull'],
                extraInfo: 'Bright is an Adjective. It describes giving out or reflecting a lot of light, or someone who is very smart.',
                extraInfoHi: 'Bright (चमकीला/उज्ज्वल) एक विशेषण है। यह बहुत प्रकाश देने या प्रतिबिंबित करने, या बहुत होशियार व्यक्ति का वर्णन करता है।'
            },
            'boring/not bright': {
                actualWord: 'Dull',
                pos: 'Adjective',
                sentence: 'The weather was very <strong>dull</strong> today, so Arpit Pal did not go to play cricket.',
                sentenceHi: 'आज का मौसम बहुत <strong>सुस्त</strong> था, इसलिए अर्पित पाल क्रिकेट खेलने नहीं गया।',
                synonyms: ['Boring', 'Dreary'],
                antonyms: ['Bright', 'Interesting'],
                extraInfo: 'Dull is an Adjective. It means lacking interest or excitement; not bright or shiny.',
                extraInfoHi: 'Dull (नीरस/सुस्त) एक विशेषण है। इसका मतलब है रुचि या उत्साह की कमी; चमकीला या चमकदार नहीं।'
            },
            'difficulty/suffering': {
                actualWord: 'Hardship',
                pos: 'Noun',
                sentence: 'Kavya faced many <strong>hardship</strong>s to complete her education and topped the class.',
                sentenceHi: 'कव्या ने अपनी पढ़ाई पूरी करने के लिए बहुत <strong>कठिनाइयों</strong> का सामना किया और टॉप किया।',
                synonyms: ['Difficulty', 'Trouble'],
                antonyms: ['Comfort', 'Ease'],
                extraInfo: 'Hardship is a Noun. It means severe suffering or difficulty in life.',
                extraInfoHi: 'Hardship (परेशानी/कठिनाई) एक संज्ञा है। इसका मतलब है जीवन में कठोर कष्ट या कठिनाई।'
            },
            'earnest request': {
                actualWord: 'Appeal',
                pos: 'Verb/Noun',
                sentence: 'Muskan <strong>appeal</strong>ed to the teacher to postpone the exam date.',
                sentenceHi: 'मुस्कान ने शिक्षक से परीक्षा की तारीख आगे बढ़ाने की <strong>अपील</strong> की।',
                synonyms: ['Request', 'Plead'],
                antonyms: ['Demand', 'Refuse'],
                extraInfo: 'Appeal can be a Verb or a Noun. It means to make a serious or urgent request to someone.',
                extraInfoHi: 'Appeal (निवेदन करना/अपील करना) एक क्रिया या संज्ञा हो सकता है। इसका मतलब है किसी से गंभीर या तत्काल अनुरोध करना।'
            },
            'hold tightly': {
                actualWord: 'Cling',
                pos: 'Verb',
                sentence: 'The scared little child <strong>cling</strong> to his mother tightly, Sanjana Nishad noticed.',
                sentenceHi: 'डरा हुआ छोटा बच्चा अपनी माँ से कसकर <strong>चिपक</strong> गया, संजना निषाद ने देखा।',
                synonyms: ['Hold on', 'Stick'],
                antonyms: ['Let go', 'Release'],
                extraInfo: 'Cling is a Verb. It means to hold on tightly to something or someone.',
                extraInfoHi: 'Cling (चिपके रहना/अडिग रहना) एक क्रिया है। इसका मतलब है किसी चीज या व्यक्ति को कसकर पकड़ना।'
            },
            'quote/mention': {
                actualWord: 'Cite',
                pos: 'Verb',
                sentence: 'While writing his answer, Anubhav <strong>cite</strong>d an example from a famous book.',
                sentenceHi: 'अपना उत्तर लिखते समय अनुभव ने एक प्रसिद्ध पुस्तक से उदाहरण <strong>उद्धृत</strong> किया।',
                synonyms: ['Quote', 'Mention'],
                antonyms: ['Conceal', 'Ignore'],
                extraInfo: 'Cite is a Verb. It means to refer to a book, author, or event as evidence or proof of what you are saying.',
                extraInfoHi: 'Cite (हवाला देना/उद्धृत करना) एक क्रिया है। इसका मतलब है किसी पुस्तक, लेखक या घटना का प्रमाण के रूप में संदर्भ देना।'
            },
            'food/repast': {
                actualWord: 'Meal',
                pos: 'Noun',
                sentence: 'For the afternoon <strong>meal</strong>, Hari Kishan had dal and rice.',
                sentenceHi: 'दोपहर के <strong>भोजन</strong> में हरी किशन ने दाल-चावल खाए।',
                synonyms: ['Food', 'Feast'],
                antonyms: ['Starvation'],
                extraInfo: 'Meal is a Noun. It refers to the food eaten on regular occasions (like breakfast, lunch, or dinner).',
                extraInfoHi: 'Meal (खाना/भोजन) एक संज्ञा है। यह नियमित अवसरों पर खाए जाने वाले खाने को संदर्भित करता है।'
            },
            'get back/heal': {
                actualWord: 'Recover',
                pos: 'Verb',
                sentence: 'The police <strong>recover</strong>ed all the stolen goods from the thief, Adarsh read in the news.',
                sentenceHi: 'पुलिस ने चोर से चोरी का सारा सामान <strong>बरामद</strong> कर लिया, आदर्श ने न्यूज में पढ़ा।',
                synonyms: ['Regain', 'Retrieve'],
                antonyms: ['Lose', 'Worsen'],
                extraInfo: 'Recover is a Verb. It means to find or regain possession of something stolen or lost, or to return to a normal state of health.',
                extraInfoHi: 'Recover (वापस पाना/ठीक होना) एक क्रिया है। इसका मतलब है चोरी या खोई हुई चीज़ वापस पाना, या स्वास्थ्य की सामान्य स्थिति में लौटना।'
            },
            'underground drain': {
                actualWord: 'Sewer',
                pos: 'Noun',
                sentence: 'During the rainy season, the street <strong>sewer</strong> started to overflow, so Aniket Kumar called the municipal corporation.',
                sentenceHi: 'बारिश के मौसम में सड़क का <strong>गटर</strong> ओवरफ्लो होने लगा, तो अनिकेत कुमार ने नगर निगम को फोन किया।',
                synonyms: ['Drain', 'Gutter'],
                antonyms: [],
                extraInfo: 'Sewer is a Noun. It is an underground pipe or drain used to carry off waste water and refuse.',
                extraInfoHi: 'Sewer (गटर/नाला) एक संज्ञा है। यह अपशिष्ट जल और कचरे को ले जाने के लिए उपयोग किया जाने वाला एक भूमिगत पाइप है।'
            },
            'about/concerning': {
                actualWord: 'Regarding',
                pos: 'Preposition',
                sentence: 'Ladli asked the teacher a few doubts <strong>regarding</strong> the upcoming exam.',
                sentenceHi: 'लाडली ने आने वाली परीक्षा <strong>के बारे में</strong> शिक्षक से कुछ संदेह पूछे।',
                synonyms: ['Concerning', 'About'],
                antonyms: ['Ignoring'],
                extraInfo: 'Regarding is a Preposition. It means "with respect to" or "concerning" a particular subject.',
                extraInfoHi: 'Regarding (के बारे में/किसी चीज को लेकर) एक संबंधसूचक अव्यय है। इसका मतलब है "के संबंध में" या किसी विषय से "संबंधित"।'
            },
            'improper/vulgar': {
                actualWord: 'Indecent',
                pos: 'Adjective',
                sentence: 'Shivshant believes that using <strong>indecent</strong> language in a public place is very wrong.',
                sentenceHi: 'शिवशांत को लगता है कि सार्वजनिक स्थान पर <strong>अभद्र</strong> भाषा का प्रयोग बहुत गलत है।',
                synonyms: ['Improper', 'Vulgar'],
                antonyms: ['Decent', 'Proper'],
                extraInfo: 'Indecent is an Adjective. It describes behavior or language that is not appropriate, polite, or acceptable in society.',
                extraInfoHi: 'Indecent (अभद्र/अश्लील) एक विशेषण है। यह ऐसे व्यवहार या भाषा का वर्णन करता है जो समाज में उचित या स्वीकार्य नहीं है।'
            },
            'regular procedure': {
                actualWord: 'Routine',
                pos: 'Noun/Adjective',
                sentence: 'Yash\'s daily <strong>routine</strong> starts with exercise at 6 in the morning.',
                sentenceHi: 'यश की दैनिक <strong>दिनचर्या</strong> सुबह 6 बजे व्यायाम से शुरू होती है।',
                synonyms: ['Schedule', 'Everyday'],
                antonyms: ['Unusual', 'Special'],
                extraInfo: 'Routine can be a Noun or an Adjective. It refers to a sequence of actions regularly followed.',
                extraInfoHi: 'Routine (दिनचर्या/सामान्य) एक संज्ञा या विशेषण हो सकता है। यह नियमित रूप से अपनाई जाने वाली क्रियाओं के क्रम को संदर्भित करता है।'
            },

            // ========== GATHRI 23: Law & Nature ==========
            'indecent/vulgar': {
                actualWord: 'Obscene',
                pos: 'Adjective',
                sentence: 'Anubhav explained to his friends that using <strong>obscene</strong> language in public places is completely wrong.',
                sentenceHi: 'अनुभव ने अपने दोस्तों को समझाया कि सार्वजनिक स्थानों पर <strong>अश्लील</strong> भाषा का इस्तेमाल पूरी तरह गलत है।',
                synonyms: ['Vulgar', 'Indecent'],
                antonyms: ['Decent', 'Clean'],
                extraInfo: 'Obscene is an Adjective. It describes something that is offensive to moral principles or socially unacceptable.',
                extraInfoHi: 'Obscene (अश्लील/अभद्र) एक विशेषण है। यह किसी ऐसी चीज़ का वर्णन करता है जो नैतिक सिद्धांतों के खिलाफ या सामाजिक रूप से अस्वीकार्य हो।'
            },
            'comment/statement': {
                actualWord: 'Remark',
                pos: 'Noun/Verb',
                sentence: 'The art teacher gave a very positive <strong>remark</strong> on Sanjana Nishad\'s beautiful drawing.',
                sentenceHi: 'कला शिक्षक ने संजना निषाद की सुंदर ड्राइंग पर बहुत सकारात्मक <strong>टिप्पणी</strong> दी।',
                synonyms: ['Comment', 'Observation'],
                antonyms: [],
                extraInfo: 'Remark can be a Noun or a Verb. It means something that you say or write which expresses an opinion or thought.',
                extraInfoHi: 'Remark (टिप्पणी/कहना) एक संज्ञा या क्रिया हो सकता है। इसका मतलब है कुछ ऐसा जो आप कहते या लिखते हैं जो किसी राय या विचार को व्यक्त करता है।'
            },
            'harassment of women': {
                actualWord: 'Eve-teasing',
                pos: 'Noun',
                sentence: 'Muskan saw on the news that the local police promised to take strict action against <strong>eve-teasing</strong>.',
                sentenceHi: 'मुस्कान ने न्यूज में देखा कि स्थानीय पुलिस ने <strong>छेड़-छाड़</strong> के खिलाफ सख्त कार्रवाई का वादा किया।',
                synonyms: ['Harassment', 'Molestation'],
                antonyms: ['Respecting', 'Honoring'],
                extraInfo: 'Eve-teasing is a Noun. It is a term used for the public sexual harassment or molestation of women by men.',
                extraInfoHi: 'Eve-teasing (छेड़-छाड़) एक संज्ञा है। यह पुरुषों द्वारा महिलाओं के सार्वजनिक यौन उत्पीड़न के लिए इस्तेमाल किया जाने वाला शब्द है।'
            },
            'catch/arrest': {
                actualWord: 'Apprehend',
                pos: 'Verb',
                sentence: 'Deva read in the newspaper that the police were able to <strong>apprehend</strong> the thief immediately after the robbery.',
                sentenceHi: 'देवा ने अखबार में पढ़ा कि पुलिस डकैती के तुरंत बाद चोर को <strong>पकड़</strong> पाई।',
                synonyms: ['Arrest', 'Catch'],
                antonyms: ['Release', 'Free'],
                extraInfo: 'Apprehend is a Verb. It means to catch and arrest someone who has not obeyed the law.',
                extraInfoHi: 'Apprehend (पकड़ लेना/गिरफ्तार करना) एक क्रिया है। इसका मतलब है किसी ऐसे व्यक्ति को पकड़ना और गिरफ्तार करना जिसने कानून का उल्लंघन किया है।'
            },
            'large horned animal': {
                actualWord: 'Rhinoceros',
                pos: 'Noun',
                sentence: 'During the school trip to the zoo, Arpit Pal was amazed to see a huge <strong>rhinoceros</strong>.',
                sentenceHi: 'चिड़ियाघर की स्कूल ट्रिप के दौरान, अर्पित पाल एक विशाल <strong>गैंडा</strong> देखकर आश्चर्यचकित रह गया।',
                synonyms: ['Rhino'],
                antonyms: [],
                extraInfo: 'Rhinoceros is a Noun. It is a large, heavily built plant-eating mammal with one or two horns on the nose.',
                extraInfoHi: 'Rhinoceros (गैंडा) एक संज्ञा है। यह एक बड़ा, भारी शाकाहारी स्तनधारी जानवर है जिसकी नाक पर एक या दो सींग होते हैं।'
            },
            'give in/die': {
                actualWord: 'Succumb',
                pos: 'Verb',
                sentence: 'Aniket was very sad to hear that the injured man <strong>succumb</strong>ed to his injuries in the hospital.',
                sentenceHi: 'अनिकेत को यह सुनकर बहुत दुख हुआ कि घायल आदमी अस्पताल में अपनी चोटों से <strong>दम तोड़</strong> गया।',
                synonyms: ['Surrender', 'Die'],
                antonyms: ['Resist', 'Survive'],
                extraInfo: 'Succumb is a Verb. It means to stop trying to resist something or to die from the effect of a disease or injury.',
                extraInfoHi: 'Succumb (हार मान लेना/मृत्यु हो जाना) एक क्रिया है। इसका मतलब है किसी चीज़ का विरोध करना बंद करना या बीमारी या चोट से मर जाना।'
            },
            'initial/first': {
                actualWord: 'Preliminary',
                pos: 'Adjective',
                sentence: 'Kavya studied hard and scored the highest marks in the <strong>preliminary</strong> test before the final exams.',
                sentenceHi: 'कव्या ने खूब मेहनत की और अंतिम परीक्षा से पहले <strong>प्रारंभिक</strong> परीक्षा में सबसे अधिक अंक प्राप्त किए।',
                synonyms: ['Initial', 'Preparatory'],
                antonyms: ['Final', 'Concluding'],
                extraInfo: 'Preliminary is an Adjective. It describes an action or event preceding or preparing for something fuller or more important.',
                extraInfoHi: 'Preliminary (शुरुआती/प्रारंभिक) एक विशेषण है। यह किसी ऐसी क्रिया या घटना का वर्णन करता है जो किसी बड़ी या महत्वपूर्ण चीज़ की तैयारी करती है।'
            },
            'run away secretly': {
                actualWord: 'Abscond',
                pos: 'Verb',
                sentence: 'Samriddhi Chaurasiya read a news article about a criminal who managed to <strong>abscond</strong> from the city at night.',
                sentenceHi: 'समृद्धि चौरसिया ने एक समाचार लेख पढ़ा कि एक अपराधी रात में शहर से <strong>फरार</strong> होने में कामयाब रहा।',
                synonyms: ['Escape', 'Flee'],
                antonyms: ['Remain', 'Stay'],
                extraInfo: 'Abscond is a Verb. It means to leave hurriedly and secretly, typically to escape from custody or avoid arrest.',
                extraInfoHi: 'Abscond (भाग जाना/फरार होना) एक क्रिया है। इसका मतलब है जल्दी और गुप्त रूप से चले जाना, आमतौर पर हिरासत से बचने या गिरफ्तारी से बचने के लिए।'
            },
            'cruelly/violently': {
                actualWord: 'Brutally',
                pos: 'Adverb',
                sentence: 'Jhanvi watched a wildlife documentary where a lion <strong>brutally</strong> attacked its prey in the jungle.',
                sentenceHi: 'झांवी ने एक वन्यजीव डॉक्यूमेंट्री देखी जिसमें एक शेर ने जंगल में अपने शिकार पर <strong>बेरहमी</strong> से हमला किया।',
                synonyms: ['Cruelly', 'Violently'],
                antonyms: ['Gently', 'Kindly'],
                extraInfo: 'Brutally is an Adverb. It means doing something in a savagely violent, cruel, or harsh way.',
                extraInfoHi: 'Brutally (बुरी तरह से/बेरहमी से) एक क्रिया विशेषण है। इसका मतलब है क्रूर, हिंसक या कठोर तरीके से कुछ करना।'
            },
            'put/keep': {
                actualWord: 'Place',
                pos: 'Noun/Verb',
                sentence: 'Shivansh carefully decided to <strong>place</strong> his brand new book on the top shelf of the study table.',
                sentenceHi: 'शिवांश ने सावधानी से अपनी नई किताब को स्टडी टेबल की ऊपरी शेल्फ पर <strong>रखने</strong> का फैसला किया।',
                synonyms: ['Put', 'Position'],
                antonyms: ['Remove', 'Take away'],
                extraInfo: 'Place can be a Noun or a Verb. As a verb, it means to put something in a particular position.',
                extraInfoHi: 'Place (रख देना/रखना) एक संज्ञा या क्रिया हो सकता है। क्रिया के रूप में, इसका मतलब है किसी चीज़ को किसी विशेष स्थान पर रखना।'
            },
            'often/many times': {
                actualWord: 'Frequently',
                pos: 'Adverb',
                sentence: 'Stuti <strong>frequently</strong> visits the school library during her free time to read new storybooks.',
                sentenceHi: 'स्तुति अपने खाली समय में नई कहानी की किताबें पढ़ने के लिए <strong>अक्सर</strong> स्कूल की लाइब्रेरी जाती है।',
                synonyms: ['Often', 'Regularly'],
                antonyms: ['Rarely', 'Seldom'],
                extraInfo: 'Frequently is an Adverb. It means regularly or habitually; often.',
                extraInfoHi: 'Frequently (बार-बार/अक्सर) एक क्रिया विशेषण है। इसका मतलब है नियमित रूप से या आदतन; अक्सर।'
            },
            'expel/ban': {
                actualWord: 'Rusticate',
                pos: 'Verb',
                sentence: 'Yash told everyone that the principal decided to <strong>rusticate</strong> the naughty student for breaking the school rules.',
                sentenceHi: 'यश ने सबको बताया कि प्रिंसिपल ने स्कूल के नियम तोड़ने पर शरारती छात्र को <strong>निकालने</strong> का फैसला किया।',
                synonyms: ['Expel', 'Suspend'],
                antonyms: ['Admit', 'Enroll'],
                extraInfo: 'Rusticate is a Verb. In schools or colleges, it means to suspend or expel a student as a punishment.',
                extraInfoHi: 'Rusticate (निकाल देना/बैन कर देना) एक क्रिया है। स्कूलों या कॉलेजों में, इसका मतलब है सजा के रूप में किसी छात्र को निलंबित या निष्कासित करना।'
            },
            'dead body': {
                actualWord: 'Corpse',
                pos: 'Noun',
                sentence: 'Deva was watching an intense detective movie where the police discovered a hidden <strong>corpse</strong> in the forest.',
                sentenceHi: 'देवा एक रोमांचक जासूसी फिल्म देख रहा था जिसमें पुलिस ने जंगल में एक छिपी हुई <strong>लाश</strong> खोजी।',
                synonyms: ['Dead body', 'Carcass'],
                antonyms: ['Living being'],
                extraInfo: 'Corpse is a Noun. It refers to a dead body, especially of a human being.',
                extraInfoHi: 'Corpse (लाश/मृत शरीर) एक संज्ञा है। यह एक मृत शरीर को संदर्भित करता है, विशेष रूप से मनुष्य का।'
            },
            'regret/guilt': {
                actualWord: 'Remorse',
                pos: 'Noun',
                sentence: 'After arguing with his best friend over a small issue, Anubhav felt deep <strong>remorse</strong> and immediately apologized.',
                sentenceHi: 'एक छोटी सी बात पर अपने सबसे अच्छे दोस्त से बहस करने के बाद, अनुभव को गहरा <strong>पछतावा</strong> हुआ और उसने तुरंत माफी मांगी।',
                synonyms: ['Regret', 'Guilt'],
                antonyms: ['Indifference', 'Satisfaction'],
                extraInfo: 'Remorse is a Noun. It is a feeling of deep regret or guilt for a wrong committed.',
                extraInfoHi: 'Remorse (पछतावा/दुःख) एक संज्ञा है। यह किसी गलत काम के लिए गहरे पछतावे या अपराधबोध की भावना है।'
            },
            'plant for medicine/food': {
                actualWord: 'Herb',
                pos: 'Noun',
                sentence: 'Sanjana Nishad\'s grandmother gave her a special medicinal <strong>herb</strong> from the garden to cure her cough.',
                sentenceHi: 'संजना निषाद की दादी ने उसकी खांसी ठीक करने के लिए बगीचे से एक खास औषधीय <strong>जड़ी-बूटी</strong> दी।',
                synonyms: ['Plant', 'Medicinal plant'],
                antonyms: [],
                extraInfo: 'Herb is a Noun. It is any plant with leaves, seeds, or flowers used for flavoring, food, medicine, or perfume.',
                extraInfoHi: 'Herb (शाक/जड़ी-बूटी) एक संज्ञा है। यह कोई भी पौधा है जिसके पत्तों, बीजों या फूलों का उपयोग स्वाद, भोजन, दवा या इत्र के लिए किया जाता है।'
            },
            // ========== GATHRI 24: Action & Law ==========
            'bush/woody plant': {
                actualWord: 'Shrub',
                pos: 'Noun',
                sentence: 'Aniket planted a beautiful rose <strong>shrub</strong> in his backyard garden.',
                sentenceHi: 'अनिकेत ने अपने पिछवाड़े के बगीचे में एक सुंदर गुलाब की <strong>झाड़ी</strong> लगाई।',
                synonyms: ['Bush', 'Hedge'],
                antonyms: ['Tree', 'Timber'],
                extraInfo: 'Shrub is a Noun. It is a woody plant that is smaller than a tree and generally has several main stems arising at or near the ground.',
                extraInfoHi: 'Shrub (झाड़ी) एक संज्ञा है। यह एक लकड़ी का पौधा है जो पेड़ से छोटा होता है और आमतौर पर जमीन पर या उसके पास से कई मुख्य तने निकलते हैं।'
            },
            'swear/make a promise': {
                actualWord: 'Vow',
                pos: 'Noun/Verb',
                sentence: 'Deva made a firm <strong>vow</strong> to study hard and score the highest marks in his final exams.',
                sentenceHi: 'देवा ने कठिन परिश्रम करने और अंतिम परीक्षा में सबसे अधिक अंक प्राप्त करने की दृढ़ <strong>शपथ</strong> ली।',
                synonyms: ['Promise', 'Swear'],
                antonyms: ['Break promise', 'Betray'],
                extraInfo: 'Vow can be a Noun or a Verb. It means to make a solemn promise or pledge to do a specified thing.',
                extraInfoHi: 'Vow (कसम खाना/शपथ लेना) एक संज्ञा या क्रिया हो सकता है। इसका अर्थ है किसी निर्दिष्ट कार्य को करने का गंभीर वादा या प्रतिज्ञा करना।'
            },
            'change direction/rotate': {
                actualWord: 'Turn',
                pos: 'Verb',
                sentence: 'Jhanvi watched in amazement as the green caterpillar began to <strong>turn</strong> into a beautiful butterfly.',
                sentenceHi: 'झांवी ने आश्चर्य से देखा जब हरी इल्ली एक सुंदर तितली में <strong>बदलने</strong> लगी।',
                synonyms: ['Rotate', 'Transform'],
                antonyms: ['Straighten', 'Remain'],
                extraInfo: 'Turn is a Verb. It means to move in a circular direction wholly or partly around an axis or point, or to change in nature/direction.',
                extraInfoHi: 'Turn (बदल देना/मुड़ जाना) एक क्रिया है। इसका अर्थ है किसी अक्ष या बिंदु के चारों ओर पूर्ण या आंशिक रूप से गोलाकार दिशा में जाना, या प्रकृति/दिशा में बदलाव करना।'
            },
            'corn': {
                actualWord: 'Maize',
                pos: 'Noun',
                sentence: 'Samriddhi Chaurasiya loves eating warm, roasted <strong>maize</strong> with salt during the rainy season.',
                sentenceHi: 'समृद्धि चौरसिया बारिश के मौसम में नमक के साथ गरम भुनी हुई <strong>मक्का</strong> खाना पसंद करती हैं।',
                synonyms: ['Corn', 'Sweetcorn'],
                antonyms: [],
                extraInfo: 'Maize is a Noun. It is a cereal plant that yields large grains set in rows on a cob; also known as corn.',
                extraInfoHi: 'Maize (मक्का) एक संज्ञा है। यह एक अनाज का पौधा है जो भुट्टे पर पंक्तियों में बड़े दाने पैदा करता है; इसे कॉर्न भी कहते हैं।'
            },
            'species/lineage or running contest': {
                actualWord: 'Race',
                pos: 'Noun',
                sentence: 'Human beings belong to the same human <strong>race</strong> regardless of where they live, Arpit Pal read in a science book.',
                sentenceHi: 'मनुष्य चाहे कहीं भी रहें, वे एक ही मानव <strong>प्रजाति</strong> से हैं, अर्पित पाल ने एक विज्ञान की किताब में पढ़ा।',
                synonyms: ['Lineage', 'Species'],
                antonyms: [],
                extraInfo: 'Race is a Noun. It has two main meanings: a group of people sharing the same culture/history/lineage, or a competition of speed.',
                extraInfoHi: 'Race (प्रजाति/वंश या दौड़) एक संज्ञा है। इसके दो मुख्य अर्थ हैं: एक ही संस्कृति/इतिहास/वंश साझा करने वाले लोगों का समूह, या गति की प्रतियोगिता।'
            },
            'asking for forgiveness': {
                actualWord: 'Apology',
                pos: 'Noun',
                sentence: 'Kavya wrote a very sincere <strong>apology</strong> letter to her best friend after their silly argument.',
                sentenceHi: 'कावया ने अपनी सबसे अच्छी सहेली को उनकी छोटी सी बहस के बाद एक बहुत ईमानदार <strong>माफी</strong> का पत्र लिखा।',
                synonyms: ['Regret', 'Pardon'],
                antonyms: ['Defiance', 'Justification'],
                extraInfo: 'Apology is a Noun. It is a regretful acknowledgment of an offense, failure, or mistake.',
                extraInfoHi: 'Apology (क्षमायाचना/माफी) एक संज्ञा है। यह किसी अपराध, विफलता या गलती की पछतावे भरी स्वीकृति है।'
            },
            'anxiety/fear': {
                actualWord: 'Apprehension',
                pos: 'Noun',
                sentence: 'Muskan felt a strong sense of <strong>apprehension</strong> before stepping onto the large stage for her speech.',
                sentenceHi: 'मुस्कान को अपने भाषण के लिए बड़े मंच पर कदम रखने से पहले तीव्र <strong>आशंका</strong> महसूस हुई।',
                synonyms: ['Anxiety', 'Fear'],
                antonyms: ['Confidence', 'Calmness'],
                extraInfo: 'Apprehension is a Noun. It means anxiety or fear that something bad or unpleasant will happen.',
                extraInfoHi: 'Apprehension (डर/आशंका) एक संज्ञा है। इसका अर्थ है कुछ बुरा या अप्रिय होने की चिंता या भय।'
            },
            'stupid person/idiot': {
                actualWord: 'Moron',
                pos: 'Noun',
                sentence: 'The careless driver acted like a complete <strong>moron</strong> by ignoring the red traffic light, Sanjana Nishad noticed.',
                sentenceHi: 'लापरवाह ड्राइवर ने लाल ट्रैफिक लाइट को अनदेखा करके एक पूरे <strong>मूर्ख</strong> की तरह व्यवहार किया, संजना निषाद ने देखा।',
                synonyms: ['Idiot', 'Fool'],
                antonyms: ['Genius', 'Brain'],
                extraInfo: 'Moron is a Noun. It is an informal and insulting word used for a stupid person.',
                extraInfoHi: 'Moron (मूर्ख) एक संज्ञा है। यह एक अनौपचारिक और अपमानजनक शब्द है जो किसी बेवकूफ व्यक्ति के लिए प्रयोग किया जाता है।'
            },
            'take action/deed': {
                actualWord: 'Act',
                pos: 'Noun/Verb',
                sentence: 'Helping the poor old man cross the busy street was a very kind <strong>act</strong> by Anubhav.',
                sentenceHi: 'गरीब बूढ़े आदमी को व्यस्त सड़क पार कराना अनुभव का एक बहुत दयालु <strong>कार्य</strong> था।',
                synonyms: ['Deed', 'Action'],
                antonyms: ['Inaction', 'Idleness'],
                extraInfo: 'Act can be a Noun or a Verb. It means to take action, do something, or a specific deed that someone has done.',
                extraInfoHi: 'Act (काम किया/कार्य) एक संज्ञा या क्रिया हो सकता है। इसका अर्थ है कार्रवाई करना, कुछ करना, या किसी का किया हुआ एक विशिष्ट कार्य।'
            },
            'partner in crime': {
                actualWord: 'Accomplice',
                pos: 'Noun',
                sentence: 'The police not only arrested the main thief but also caught his hidden <strong>accomplice</strong>, Aniket told everyone.',
                sentenceHi: 'पुलिस ने न केवल मुख्य चोर को गिरफ्तार किया बल्कि उसके छिपे हुए <strong>सह-अपराधी</strong> को भी पकड़ा, अनिकेत ने सबको बताया।',
                synonyms: ['Partner', 'Associate'],
                antonyms: ['Opponent', 'Enemy'],
                extraInfo: 'Accomplice is a Noun. It refers to a person who helps another commit a crime or do something wrong.',
                extraInfoHi: 'Accomplice (सह-अपराधी) एक संज्ञा है। यह उस व्यक्ति को संदर्भित करता है जो किसी अन्य को अपराध करने या कुछ गलत करने में मदद करता है।'
            },
            'intimidate/warn': {
                actualWord: 'Threaten',
                pos: 'Verb',
                sentence: 'It is a serious crime to <strong>threaten</strong> someone over the phone, Deva warned his younger brother.',
                sentenceHi: 'फोन पर किसी को <strong>धमकाना</strong> एक गंभीर अपराध है, देवा ने अपने छोटे भाई को चेतावनी दी।',
                synonyms: ['Intimidate', 'Menace'],
                antonyms: ['Protect', 'Defend'],
                extraInfo: 'Threaten is a Verb. It means to state one\'s intention to take hostile action against someone in order to frighten them.',
                extraInfoHi: 'Threaten (धमकाना) एक क्रिया है। इसका अर्थ है किसी को डराने के लिए उसके खिलाफ शत्रुतापूर्ण कार्रवाई करने का इरादा बताना।'
            },
            'pursue/run after': {
                actualWord: 'Chase',
                pos: 'Verb',
                sentence: 'Jhanvi watched from her window as the police car began to <strong>chase</strong> the speeding van down the highway.',
                sentenceHi: 'झांवी ने अपनी खिड़की से देखा जब पुलिस की गाड़ी ने हाईवे पर तेज भागती वैन का <strong>पीछा</strong> करना शुरू किया।',
                synonyms: ['Pursue', 'Follow'],
                antonyms: ['Escape', 'Run away'],
                extraInfo: 'Chase is a Verb. It means to pursue in order to catch or catch up with someone or something.',
                extraInfoHi: 'Chase (पीछा करना) एक क्रिया है। इसका अर्थ है किसी को पकड़ने या उसके बराबर पहुंचने के लिए पीछा करना।'
            },
            'administer medicine/narcotic': {
                actualWord: 'Drug',
                pos: 'Noun/Verb',
                sentence: 'The villain in the mystery movie tried to <strong>drug</strong> the hero\'s drink, but Samriddhi Chaurasiya knew he would escape.',
                sentenceHi: 'रहस्यमयी फिल्म में खलनायक ने हीरो के पेय में <strong>नशा</strong> मिलाने की कोशिश की, लेकिन समृद्धि चौरसिया को पता था कि वह बच जाएगा।',
                synonyms: ['Medicate', 'Intoxicate'],
                antonyms: [],
                extraInfo: 'Drug can be a Noun or a Verb. As a verb, it means to administer a drug to someone in order to induce sleep, unconsciousness, or a stupor.',
                extraInfoHi: 'Drug (नशा देना/दवा देना) एक संज्ञा या क्रिया हो सकता है। क्रिया के रूप में, इसका अर्थ है किसी को नींद, बेहोशी या मूर्छा लाने के लिए दवा देना।'
            },
            'fascinating/making drunk': {
                actualWord: 'Intoxicating',
                pos: 'Adjective',
                sentence: 'The sweet scent of the fresh jasmine flowers in Arpit Pal\'s garden was highly <strong>intoxicating</strong>.',
                sentenceHi: 'अर्पित पाल के बगीचे में ताजे चमेली के फूलों की मीठी खुशबू बेहद <strong>मदहोश</strong> करने वाली थी।',
                synonyms: ['Thrilling', 'Inebriating'],
                antonyms: ['Boring', 'Sobering'],
                extraInfo: 'Intoxicating is an Adjective. It describes something that causes someone to lose control of their faculties (like alcohol) or something extremely fascinating.',
                extraInfoHi: 'Intoxicating (नशीली/मदहोश करने वाली) एक विशेषण है। यह किसी ऐसी चीज़ का वर्णन करता है जो किसी को अपनी क्षमताओं पर नियंत्रण खोने का कारण बनती है (जैसे शराब) या कुछ अत्यंत आकर्षक।'
            },
            'feeling faint/spinning': {
                actualWord: 'Dizziness',
                pos: 'Noun',
                sentence: 'After spinning around rapidly in circles for a minute, Kavya felt extreme <strong>dizziness</strong> and had to sit down immediately.',
                sentenceHi: 'एक मिनट तक तेजी से गोल-गोल घूमने के बाद, कावया को अत्यधिक <strong>चक्कर</strong> आया और उसे तुरंत बैठना पड़ा।',
                synonyms: ['Giddiness', 'Lightheadedness'],
                antonyms: ['Steadiness', 'Balance'],
                extraInfo: 'Dizziness is a Noun. It is a sensation of spinning around and losing one\'s balance or feeling faint.',
                extraInfoHi: 'Dizziness (चक्कर आना) एक संज्ञा है। यह चक्कर आने और संतुलन खोने या बेहोशी महसूस होने की अनुभूति है।'
            },
            // ========== GATHRI 25: Law & Society ==========
            'submit officially': {
                actualWord: 'File',
                pos: 'Verb/Noun',
                sentence: 'Aniket advised his neighbor to <strong>file</strong> a police complaint immediately about the stolen bicycle.',
                sentenceHi: 'अनिकेत ने अपने पड़ोसी को चोरी हुई साइकिल के बारे में तुरंत पुलिस शिकायत <strong>दर्ज</strong> करने की सलाह दी।',
                synonyms: ['Submit', 'Register'],
                antonyms: ['Withdraw', 'Cancel'],
                extraInfo: 'File can be a Verb or a Noun. As a verb, it means to place a document in a cabinet or to officially submit a legal charge or complaint.',
                extraInfoHi: 'File (दायर करना/दर्ज करना) एक क्रिया या संज्ञा हो सकता है। क्रिया के रूप में, इसका अर्थ है किसी दस्तावेज़ को कैबिनेट में रखना या आधिकारिक रूप से कानूनी आरोप या शिकायत प्रस्तुत करना।'
            },
            'throwing stones': {
                actualWord: 'Stone pelting',
                pos: 'Noun Phrase',
                sentence: 'The police officers had to intervene quickly to stop the dangerous <strong>stone pelting</strong> in the street, said Deva.',
                sentenceHi: 'पुलिस अधिकारियों को सड़क पर खतरनाक <strong>पथराव</strong> रोकने के लिए जल्दी से हस्तक्षेप करना पड़ा, देवा ने कहा।',
                synonyms: ['Rock throwing'],
                antonyms: [],
                extraInfo: 'Stone pelting is a Noun Phrase. It refers to the act of throwing stones or rocks at someone or something, often during a riot or protest.',
                extraInfoHi: 'Stone pelting (पथराव) एक संज्ञा वाक्यांश है। यह किसी व्यक्ति या वस्तु पर पत्थर फेंकने की क्रिया को संदर्भित करता है, अक्सर दंगे या विरोध के दौरान।'
            },
            'daily pay/salary': {
                actualWord: 'Wage',
                pos: 'Noun',
                sentence: 'The factory workers demanded a higher daily <strong>wage</strong> for their hard physical labor, Jhanvi read in the newspaper.',
                sentenceHi: 'कारखाने के मजदूरों ने अपनी कठिन शारीरिक मेहनत के लिए अधिक दैनिक <strong>मजदूरी</strong> की मांग की, झांवी ने अखबार में पढ़ा।',
                synonyms: ['Salary', 'Pay'],
                antonyms: ['Debt', 'Loss'],
                extraInfo: 'Wage is a Noun. It is a fixed regular payment earned for work or services, typically paid on a daily or weekly basis.',
                extraInfoHi: 'Wage (वेतन/मजदूरी) एक संज्ञा है। यह काम या सेवाओं के लिए अर्जित एक निश्चित नियमित भुगतान है, जो आमतौर पर दैनिक या साप्ताहिक आधार पर दिया जाता है।'
            },
            'voluntary payment/fee': {
                actualWord: 'Honorarium',
                pos: 'Noun',
                sentence: 'The guest speaker was given a small <strong>honorarium</strong> to respectfully thank him for his wonderful lecture, Samriddhi Chaurasiya noted.',
                sentenceHi: 'अतिथि वक्ता को उनके अद्भुत व्याख्यान के लिए सम्मानपूर्वक धन्यवाद देने के लिए एक छोटा <strong>मानदेय</strong> दिया गया, समृद्धि चौरसिया ने नोट किया।',
                synonyms: ['Fee', 'Reward'],
                antonyms: ['Penalty'],
                extraInfo: 'Honorarium is a Noun. It is a payment given for professional services that are rendered nominally without a fixed charge.',
                extraInfoHi: 'Honorarium (मानदेय/सम्मान राशि) एक संज्ञा है। यह पेशेवर सेवाओं के लिए दिया जाने वाला भुगतान है जो बिना किसी निश्चित शुल्क के नाममात्र रूप से प्रदान की जाती हैं।'
            },
            'waste water system': {
                actualWord: 'Drainage',
                pos: 'Noun',
                sentence: 'The heavy monsoon rain caused floods because the city\'s <strong>drainage</strong> system was completely blocked with plastic, Arpit Pal observed.',
                sentenceHi: 'भारी मानसूनी बारिश ने बाढ़ ला दी क्योंकि शहर की <strong>जल निकासी</strong> प्रणाली प्लास्टिक से पूरी तरह अवरुद्ध थी, अर्पित पाल ने देखा।',
                synonyms: ['Sewerage', 'Waste system'],
                antonyms: [],
                extraInfo: 'Drainage is a Noun. It is the action or system of draining away waste water or other liquids from an area.',
                extraInfoHi: 'Drainage (नाली/जल निकासी) एक संज्ञा है। यह किसी क्षेत्र से अपशिष्ट जल या अन्य तरल पदार्थों को बहाने की क्रिया या प्रणाली है।'
            },
            'secret agent/observe secretly': {
                actualWord: 'Spy',
                pos: 'Noun/Verb',
                sentence: 'Kavya watched a highly exciting movie about a secret <strong>spy</strong> trying to save the world from danger.',
                sentenceHi: 'कावया ने एक बेहद रोमांचक फिल्म देखी जो एक गुप्त <strong>जासूस</strong> के बारे में थी जो दुनिया को खतरे से बचाने की कोशिश कर रहा था।',
                synonyms: ['Secret agent', 'Undercover'],
                antonyms: ['Informant (public)'],
                extraInfo: 'Spy can be a Noun or a Verb. As a Noun: A person who secretly collects information about enemies. As a Verb: To secretly observe someone.',
                extraInfoHi: 'Spy (जासूस/जासूसी करना) एक संज्ञा या क्रिया हो सकता है। संज्ञा के रूप में: वह व्यक्ति जो गुप्त रूप से दुश्मनों के बारे में जानकारी एकत्र करता है। क्रिया के रूप में: किसी को गुप्त रूप से देखना।'
            },
            'blessed/religious': {
                actualWord: 'Sacred / Holy',
                pos: 'Adjective',
                sentence: 'The river Ganga is considered a very <strong>sacred</strong> river by millions of people across the country, said Muskan.',
                sentenceHi: 'गंगा नदी को देश भर में लाखों लोगों द्वारा एक बहुत <strong>पवित्र</strong> नदी माना जाता है, मुस्कान ने कहा।',
                synonyms: ['Blessed', 'Divine'],
                antonyms: ['Cursed', 'Unholy'],
                extraInfo: 'Sacred and Holy are Adjectives. They describe something that is connected with God or dedicated to a religious purpose.',
                extraInfoHi: 'Sacred / Holy (पवित्र) विशेषण हैं। ये किसी ऐसी चीज़ का वर्णन करते हैं जो ईश्वर से जुड़ी हो या किसी धार्मिक उद्देश्य के लिए समर्पित हो।'
            },
            'overreact/make a fuss': {
                actualWord: 'Make a big deal',
                pos: 'Idiom',
                sentence: 'It was just a small mistake on the project, so Sanjana Nishad told her teammate not to <strong>make a big deal</strong> out of it.',
                sentenceHi: 'यह प्रोजेक्ट पर बस एक छोटी सी गलती थी, इसलिए संजना निषाद ने अपनी टीममेट से कहा कि इसका <strong>बतंगड़ न बनाओ</strong>।',
                synonyms: ['Overreact', 'Exaggerate'],
                antonyms: ['Downplay', 'Ignore'],
                extraInfo: 'Make a big deal is a very common Idiom. It means to treat a minor problem or event as if it were very important or serious.',
                extraInfoHi: 'Make a big deal (बात का बतंगड़ बनाना) एक बहुत ही आम मुहावरा है। इसका अर्थ है किसी छोटी समस्या या घटना को ऐसे मानना जैसे वह बहुत महत्वपूर्ण या गंभीर हो।'
            },
            'remember/bring back to mind': {
                actualWord: 'Recall',
                pos: 'Verb',
                sentence: 'Anubhav closed his eyes and tried hard to <strong>recall</strong> the exact science formula during his difficult examination.',
                sentenceHi: 'अनुभव ने अपनी आंखें बंद कीं और अपनी कठिन परीक्षा के दौरान सटीक विज्ञान सूत्र <strong>याद</strong> करने की कड़ी कोशिश की।',
                synonyms: ['Remember', 'Recollect'],
                antonyms: ['Forget', 'Overlook'],
                extraInfo: 'Recall is a Verb. It means to bring a past event, fact, or situation back into your mind; to remember.',
                extraInfoHi: 'Recall (याद करना) एक क्रिया है। इसका अर्थ है किसी बीती हुई घटना, तथ्य या स्थिति को अपने मन में वापस लाना; याद करना।'
            },
            'noisy argument/fight': {
                actualWord: 'Altercation',
                pos: 'Noun',
                sentence: 'The referee had to step in quickly when a sudden <strong>altercation</strong> broke out between the two frustrated football players, Aniket saw.',
                sentenceHi: 'रेफरी को जल्दी से बीच में आना पड़ा जब दो निराश फुटबॉल खिलाड़ियों के बीच अचानक <strong>झगड़ा</strong> हो गया, अनिकेत ने देखा।',
                synonyms: ['Argument', 'Dispute'],
                antonyms: ['Agreement', 'Harmony'],
                extraInfo: 'Altercation is a Noun. It is a loud, noisy, and angry argument or disagreement, especially in public.',
                extraInfoHi: 'Altercation (लड़ाई-झगड़ा) एक संज्ञा है। यह एक तेज, शोरगुल वाला और गुस्से भरा बहस या असहमति है, विशेषकर सार्वजनिक रूप से।'
            },
            'burial ceremony': {
                actualWord: 'Funeral',
                pos: 'Noun',
                sentence: 'Deva wore a formal black suit to attend his grandfather\'s <strong>funeral</strong> and pay his final respects.',
                sentenceHi: 'देवा ने अपने दादाजी के <strong>अंतिम संस्कार</strong> में शामिल होने और अंतिम श्रद्धांजलि देने के लिए औपचारिक काला सूट पहना।',
                synonyms: ['Burial', 'Cremation ceremony'],
                antonyms: ['Birth', 'Baptism'],
                extraInfo: 'Funeral is a Noun. It is a ceremony held shortly after a person\'s death, usually including burial or cremation.',
                extraInfoHi: 'Funeral (अंतिम संस्कार) एक संज्ञा है। यह किसी व्यक्ति की मृत्यु के कुछ समय बाद आयोजित एक समारोह है, जिसमें आमतौर पर दफन या दाह संस्कार शामिल होता है।'
            },
            'weapon or body part': {
                actualWord: 'Arm',
                pos: 'Noun/Verb',
                sentence: 'The police officer had to <strong>arm</strong> himself with a heavy shield before facing the angry, dangerous crowd, Jhanvi explained.',
                sentenceHi: 'पुलिस अधिकारी को गुस्से वाली खतरनाक भीड़ का सामना करने से पहले भारी ढाल से खुद को <strong>हथियारबंद</strong> करना पड़ा, झांवी ने समझाया।',
                synonyms: ['Weapon', 'Equip'],
                antonyms: ['Disarm'],
                extraInfo: 'Arm can be a Noun or a Verb. As a noun, it means a limb of the body or a weapon. As a verb, it means to supply yourself or others with weapons.',
                extraInfoHi: 'Arm (हथियार या बांह) एक संज्ञा या क्रिया हो सकता है। संज्ञा के रूप में, इसका अर्थ है शरीर का एक अंग या हथियार। क्रिया के रूप में, इसका अर्थ है खुद को या दूसरों को हथियारों से सुसज्जित करना।'
            },
            'face aggressively/challenge': {
                actualWord: 'Confront',
                pos: 'Verb',
                sentence: 'Samriddhi Chaurasiya decided to boldly <strong>confront</strong> the classmate who was spreading false rumors about her.',
                sentenceHi: 'समृद्धि चौरसिया ने साहसपूर्वक उस सहपाठी का <strong>सामना</strong> करने का फैसला किया जो उसके बारे में झूठी अफवाहें फैला रहा था।',
                synonyms: ['Challenge', 'Face up to'],
                antonyms: ['Avoid', 'Evade'],
                extraInfo: 'Confront is a Verb. It means to face, meet, or deal with a difficult situation or person directly and aggressively.',
                extraInfoHi: 'Confront (मुकाबला करना/सामना करना) एक क्रिया है। इसका अर्थ है किसी कठिन स्थिति या व्यक्ति का सीधे और आक्रामक रूप से सामना करना।'
            },
            'thug/hooligan': {
                actualWord: 'Goon',
                pos: 'Noun',
                sentence: 'The brave shopkeeper grabbed a stick and chased away the <strong>goon</strong> who tried to steal money from his store, Arpit Pal cheered.',
                sentenceHi: 'बहादुर दुकानदार ने एक डंडा पकड़ा और उस <strong>गुंडे</strong> को भगा दिया जिसने उसकी दुकान से पैसे चुराने की कोशिश की, अर्पित पाल ने खुशी जताई।',
                synonyms: ['Thug', 'Hooligan'],
                antonyms: ['Protector', 'Police'],
                extraInfo: 'Goon is an informal Noun. It refers to a violent criminal who is paid to frighten or attack people.',
                extraInfoHi: 'Goon (गुंडा/बदमाश) एक अनौपचारिक संज्ञा है। यह एक हिंसक अपराधी को संदर्भित करता है जिसे लोगों को डराने या उन पर हमला करने के लिए भुगतान किया जाता है।'
            },
            'guilty person/offender': {
                actualWord: 'Culprit',
                pos: 'Noun',
                sentence: 'After searching for clues all day, the smart detective finally found the real <strong>culprit</strong> who had stolen the diamond necklace, Kavya read in her mystery book.',
                sentenceHi: 'पूरे दिन सुराग खोजने के बाद, चतुर जासूस ने आखिरकार असली <strong>अपराधी</strong> को पाया जिसने हीरे का हार चुराया था, कावया ने अपनी रहस्य किताब में पढ़ा।',
                synonyms: ['Offender', 'Criminal'],
                antonyms: ['Innocent', 'Victim'],
                extraInfo: 'Culprit is a Noun. It is a person who is responsible for a crime or some other misdeed.',
                extraInfoHi: 'Culprit (अपराधी/दोषी) एक संज्ञा है। यह वह व्यक्ति है जो किसी अपराध या किसी अन्य दुष्कर्म के लिए जिम्मेदार है।'
            },
            // ========== GATHRI 26: Character & Society ==========
            'incomplete/biased': {
                actualWord: 'Partial',
                pos: 'Adjective',
                sentence: 'Aniket realized the referee was being <strong>partial</strong> to the opposing team during the football match.',
                sentenceHi: 'अनिकेत को एहसास हुआ कि रेफरी फुटबॉल मैच के दौरान विरोधी टीम के प्रति <strong>पक्षपाती</strong> हो रहा था।',
                synonyms: ['Incomplete', 'Biased'],
                antonyms: ['Complete', 'Fair'],
                extraInfo: 'Partial is an Adjective. It can mean existing only in part (incomplete) or favoring one side in a dispute above the other (biased).',
                extraInfoHi: 'Partial (आंशिक/पक्षपाती) एक विशेषण है। इसका अर्थ हो सकता है केवल भाग में मौजूद (अधूरा) या किसी विवाद में एक पक्ष का दूसरे से अधिक समर्थन करना (पक्षपाती)।'
            },
            'restrict/limit': {
                actualWord: 'Confine',
                pos: 'Verb',
                sentence: 'The doctor advised Deva to <strong>confine</strong> himself to his bedroom until his contagious fever was completely gone.',
                sentenceHi: 'डॉक्टर ने देवा को सलाह दी कि जब तक उसका संक्रामक बुखार पूरी तरह से ठीक नहीं हो जाता, तब तक वह खुद को अपने कमरे तक <strong>सीमित</strong> रखे।',
                synonyms: ['Restrict', 'Limit'],
                antonyms: ['Release', 'Free'],
                extraInfo: 'Confine is a Verb. It means to keep someone or something within certain limits of space, quantity, or time.',
                extraInfoHi: 'Confine (सीमित कर देना/कैद करना) एक क्रिया है। इसका अर्थ है किसी व्यक्ति या चीज़ को स्थान, मात्रा या समय की निश्चित सीमाओं के भीतर रखना।'
            },
            'disapprove/criticize': {
                actualWord: 'Condemn',
                pos: 'Verb',
                sentence: 'The principal stood on the stage to strongly <strong>condemn</strong> the bad behavior of the senior students, making Jhanvi nod in agreement.',
                sentenceHi: 'प्रधानाचार्य मंच पर खड़े होकर वरिष्ठ छात्रों के बुरे व्यवहार की कड़ी <strong>निंदा</strong> करने लगे, जिससे झांवी ने सहमति में सिर हिलाया।',
                synonyms: ['Criticize', 'Censure'],
                antonyms: ['Praise', 'Approve'],
                extraInfo: 'Condemn is a Verb. It means to express complete disapproval of something, typically in public.',
                extraInfoHi: 'Condemn (निंदा करना) एक क्रिया है। इसका अर्थ है किसी चीज़ की पूर्ण अस्वीकृति व्यक्त करना, आमतौर पर सार्वजनिक रूप से।'
            },
            'perfect model/outstanding': {
                actualWord: 'Exemplary',
                pos: 'Adjective',
                sentence: 'Samriddhi Chaurasiya received a special award for her <strong>exemplary</strong> performance in the final science exhibition.',
                sentenceHi: 'समृद्धि चौरसिया को अंतिम विज्ञान प्रदर्शनी में उनके <strong>आदर्श</strong> प्रदर्शन के लिए एक विशेष पुरस्कार मिला।',
                synonyms: ['Perfect', 'Outstanding'],
                antonyms: ['Deplorable', 'Poor'],
                extraInfo: 'Exemplary is an Adjective. It describes something representing the best of its kind or serving as a desirable model for others to follow.',
                extraInfoHi: 'Exemplary (मिसाल/आदर्श) एक विशेषण है। यह किसी ऐसी चीज़ का वर्णन करता है जो अपनी तरह की सबसे अच्छी है या दूसरों के अनुसरण के लिए एक वांछनीय मॉडल के रूप में कार्य करती है।'
            },
            'fast/quick': {
                actualWord: 'Swift',
                pos: 'Adjective',
                sentence: 'The cheetah is famous for its extremely <strong>swift</strong> movements when hunting for food in the wild, Arpit Pal read in his book.',
                sentenceHi: 'चीता जंगल में भोजन का शिकार करते समय अपनी अत्यंत <strong>तेज</strong> गतिविधियों के लिए प्रसिद्ध है, अर्पित पाल ने अपनी किताब में पढ़ा।',
                synonyms: ['Fast', 'Rapid'],
                antonyms: ['Slow', 'Sluggish'],
                extraInfo: 'Swift is an Adjective. It means happening quickly or moving with great speed.',
                extraInfoHi: 'Swift (तीव्र/तेज) एक विशेषण है। इसका अर्थ है जल्दी होना या बहुत तेज गति से चलना।'
            },
            'severe/firm': {
                actualWord: 'Strict',
                pos: 'Adjective',
                sentence: 'Our new mathematics teacher is very <strong>strict</strong> about completing homework on time, Kavya warned her classmates.',
                sentenceHi: 'हमारे नए गणित शिक्षक समय पर होमवर्क पूरा करने के बारे में बहुत <strong>सख्त</strong> हैं, कावया ने अपने सहपाठियों को चेतावनी दी।',
                synonyms: ['Severe', 'Firm'],
                antonyms: ['Lenient', 'Easygoing'],
                extraInfo: 'Strict is an Adjective. It describes someone who demands that rules concerning behavior are perfectly obeyed and observed.',
                extraInfoHi: 'Strict (कठोर/सख्त) एक विशेषण है। यह किसी ऐसे व्यक्ति का वर्णन करता है जो मांग करता है कि व्यवहार संबंधी नियमों का पूरी तरह से पालन किया जाए।'
            },
            'natural home': {
                actualWord: 'Habitat',
                pos: 'Noun',
                sentence: 'Polar bears are slowly losing their natural ice <strong>habitat</strong> due to global warming, Muskan explained during her presentation.',
                sentenceHi: 'ध्रुवीय भालू ग्लोबल वार्मिंग के कारण धीरे-धीरे अपना प्राकृतिक बर्फ का <strong>आवास</strong> खो रहे हैं, मुस्कान ने अपनी प्रस्तुति के दौरान समझाया।',
                synonyms: ['Environment', 'Home'],
                antonyms: [],
                extraInfo: 'Habitat is a Noun. It is the natural home or environment of an animal, plant, or other organism.',
                extraInfoHi: 'Habitat (आवास/प्राकृतिक घर) एक संज्ञा है। यह किसी जानवर, पौधे या अन्य जीव का प्राकृतिक घर या वातावरण है।'
            },
            'solemn promise': {
                actualWord: 'Pledge',
                pos: 'Noun/Verb',
                sentence: 'Every morning during the school assembly, Sanjana Nishad takes a proud <strong>pledge</strong> to respect her nation.',
                sentenceHi: 'हर सुबह स्कूल की सभा के दौरान, संजना निषाद अपने राष्ट्र का सम्मान करने की गर्वपूर्ण <strong>प्रतिज्ञा</strong> लेती है।',
                synonyms: ['Promise', 'Vow'],
                antonyms: ['Betrayal', 'Breach'],
                extraInfo: 'Pledge can be a Noun or a Verb. It means a serious promise or agreement to do something.',
                extraInfoHi: 'Pledge (प्रतिज्ञा/शपथ) एक संज्ञा या क्रिया हो सकता है। इसका अर्थ है कुछ करने का गंभीर वादा या समझौता।'
            },
            'diverse/different types': {
                actualWord: 'Varied',
                pos: 'Adjective',
                sentence: 'The school cafeteria offers a highly <strong>varied</strong> menu so that students can try different types of healthy meals, noticed Anubhav.',
                sentenceHi: 'स्कूल कैफेटेरिया एक अत्यधिक <strong>विविध</strong> मेनू प्रदान करता है ताकि छात्र विभिन्न प्रकार के स्वस्थ भोजन आज़मा सकें, अनुभव ने नोट किया।',
                synonyms: ['Diverse', 'Assorted'],
                antonyms: ['Uniform', 'Identical'],
                extraInfo: 'Varied is an Adjective. It means incorporating a number of different types or elements; showing variation or variety.',
                extraInfoHi: 'Varied (तरह-तरह की/विभिन्न) एक विशेषण है। इसका अर्थ है विभिन्न प्रकारों या तत्वों को शामिल करना; विविधता दिखाना।'
            },
            'make great effort': {
                actualWord: 'Strive',
                pos: 'Verb',
                sentence: 'Aniket promised his parents that he would always <strong>strive</strong> for excellence in all his upcoming sports tournaments.',
                sentenceHi: 'अनिकेत ने अपने माता-पिता से वादा किया कि वह अपने आगामी सभी खेल प्रतियोगिताओं में हमेशा उत्कृष्टता के लिए <strong>प्रयास</strong> करेगा।',
                synonyms: ['Try hard', 'Endeavor'],
                antonyms: ['Give up', 'Surrender'],
                extraInfo: 'Strive is a Verb. It means to make great efforts to achieve or obtain something.',
                extraInfoHi: 'Strive (प्रयास करना/संघर्ष करना) एक क्रिया है। इसका अर्थ है कुछ हासिल करने या प्राप्त करने के लिए बड़े प्रयास करना।'
            },
            'deserving/valuable': {
                actualWord: 'Worthy',
                pos: 'Adjective',
                sentence: 'The brave firefighter was deemed a <strong>worthy</strong> recipient of the national medal of honor, Deva read in the news.',
                sentenceHi: 'बहादुर अग्निशामक को राष्ट्रीय सम्मान पदक का <strong>योग्य</strong> प्राप्तकर्ता माना गया, देवा ने समाचार में पढ़ा।',
                synonyms: ['Deserving', 'Meritorious'],
                antonyms: ['Unworthy', 'Useless'],
                extraInfo: 'Worthy is an Adjective. It describes someone or something having the qualities that deserve a specified reward, action, or regard.',
                extraInfoHi: 'Worthy (योग्य/लायक) एक विशेषण है। यह किसी ऐसे व्यक्ति या चीज़ का वर्णन करता है जिसमें निर्दिष्ट पुरस्कार, कार्रवाई या सम्मान के योग्य गुण हों।'
            },
            'situations/conditions': {
                actualWord: 'Circumstances',
                pos: 'Noun',
                sentence: 'Despite the difficult financial <strong>circumstances</strong> at home, Jhanvi managed to score top marks in her board exams.',
                sentenceHi: 'घर पर कठिन वित्तीय <strong>परिस्थितियों</strong> के बावजूद, झांवी अपनी बोर्ड परीक्षाओं में शीर्ष अंक प्राप्त करने में सफल रही।',
                synonyms: ['Situations', 'Conditions'],
                antonyms: [],
                extraInfo: 'Circumstances is a Noun. It refers to the facts, conditions, or events connected with or relevant to a situation.',
                extraInfoHi: 'Circumstances (परिस्थितियां/हालात) एक संज्ञा है। यह किसी स्थिति से जुड़े या उससे संबंधित तथ्यों, शर्तों या घटनाओं को संदर्भित करता है।'
            },
            'easily broken/delicate': {
                actualWord: 'Fragile',
                pos: 'Adjective',
                sentence: 'Samriddhi Chaurasiya handled the beautiful glass vase very carefully because it was extremely <strong>fragile</strong>.',
                sentenceHi: 'समृद्धि चौरसिया ने सुंदर कांच के फूलदान को बहुत सावधानी से संभाला क्योंकि वह अत्यंत <strong>नाजुक</strong> था।',
                synonyms: ['Delicate', 'Breakable'],
                antonyms: ['Strong', 'Unbreakable'],
                extraInfo: 'Fragile is an Adjective. It describes an object that is easily broken or damaged.',
                extraInfoHi: 'Fragile (नाजुक/कोमल) एक विशेषण है। यह किसी ऐसी वस्तु का वर्णन करता है जो आसानी से टूट या क्षतिग्रस्त हो सकती है।'
            },
            'dead person': {
                actualWord: 'Deceased',
                pos: 'Adjective/Noun',
                sentence: 'The solemn lawyer read the final will of the <strong>deceased</strong> man to his grieving family members, Arpit Pal watched in the movie.',
                sentenceHi: 'गंभीर वकील ने <strong>मृतक</strong> व्यक्ति की अंतिम वसीयत उसके शोकग्रस्त परिवार के सदस्यों को पढ़कर सुनाई, अर्पित पाल ने फिल्म में देखा।',
                synonyms: ['Dead', 'Departed'],
                antonyms: ['Alive', 'Living'],
                extraInfo: 'Deceased is an Adjective or Noun. It refers to a person who has recently died.',
                extraInfoHi: 'Deceased (मृतक/जो मर गया हो) एक विशेषण या संज्ञा है। यह उस व्यक्ति को संदर्भित करता है जिसकी हाल ही में मृत्यु हुई हो।'
            },
            'loop of rope': {
                actualWord: 'Noose',
                pos: 'Noun',
                sentence: 'The skillful cowboy quickly tied a strong <strong>noose</strong> in his rope to catch the running horse, Kavya saw on television.',
                sentenceHi: 'कुशल काउबॉय ने भागते हुए घोड़े को पकड़ने के लिए अपनी रस्सी में जल्दी से एक मजबूत <strong>फंदा</strong> बांधा, कावया ने टेलीविजन पर देखा।',
                synonyms: ['Loop', 'Snare'],
                antonyms: [],
                extraInfo: 'Noose is a Noun. It is a loop at the end of a rope that gets tighter when the rope is pulled, often used for trapping animals or hanging.',
                extraInfoHi: 'Noose (फंदा/फांसी का फंदा) एक संज्ञा है। यह रस्सी के सिरे पर एक लूप है जो रस्सी खींचने पर कसता जाता है, अक्सर जानवरों को फंसाने या फांसी के लिए इस्तेमाल होता है।'
            },
            // ========== GATHRI 27: Investigation & Society ==========
            'look for/want': {
                actualWord: 'Seek',
                pos: 'Verb',
                sentence: 'Aniket decided to <strong>seek</strong> help from his teacher to solve the difficult math problem.',
                sentenceHi: 'अनिकेत ने गणित की कठिन समस्या को हल करने के लिए अपने शिक्षक से मदद <strong>मांगने</strong> का फैसला किया।',
                synonyms: ['Search', 'Pursue'],
                antonyms: ['Ignore', 'Abandon'],
                extraInfo: 'Seek is a Verb. It means to attempt to find something, or to ask for something from someone.',
                extraInfoHi: 'Seek (खोजना/चाहना) एक क्रिया है। इसका अर्थ है कुछ खोजने का प्रयास करना, या किसी से कुछ मांगना।'
            },
            'claim/accusation': {
                actualWord: 'Allegation',
                pos: 'Noun',
                sentence: 'The police carefully investigated the serious <strong>allegation</strong> made against the suspected thief, Deva read in the news.',
                sentenceHi: 'पुलिस ने संदिग्ध चोर पर लगे गंभीर <strong>आरोप</strong> की सावधानीपूर्वक जांच की, देवा ने खबर में पढ़ा।',
                synonyms: ['Accusation', 'Charge'],
                antonyms: ['Denial', 'Exculpation'],
                extraInfo: 'Allegation is a Noun. It is a claim or assertion that someone has done something wrong or illegal, typically one made without proof yet.',
                extraInfoHi: 'Allegation (आरोप) एक संज्ञा है। यह एक दावा या कथन है कि किसी ने कुछ गलत या अवैध किया है, आमतौर पर अभी तक बिना सबूत के किया गया है।'
            },
            'top/highest point': {
                actualWord: 'Apex',
                pos: 'Noun',
                sentence: 'Jhanvi finally reached the <strong>apex</strong> of the mountain after a long and tiring hike.',
                sentenceHi: 'झांवी लंबी और थका देने वाली चढ़ाई के बाद अंततः पर्वत के <strong>शिखर</strong> पर पहुंच गई।',
                synonyms: ['Peak', 'Summit'],
                antonyms: ['Bottom', 'Base'],
                extraInfo: 'Apex is a Noun. It refers to the top or highest part of something, especially one forming a point.',
                extraInfoHi: 'Apex (सर्वोच्च/शिखर) एक संज्ञा है। यह किसी चीज के शीर्ष या उच्चतम भाग को संदर्भित करता है, विशेष रूप से एक बिंदु बनाने वाला।'
            },
            'stop': {
                actualWord: 'Halt',
                pos: 'Noun/Verb',
                sentence: 'The traffic police officer raised his hand to <strong>halt</strong> all the speeding vehicles on the road.',
                sentenceHi: 'यातायात पुलिस अधिकारी ने सड़क पर तेज गति वाले सभी वाहनों को <strong>रोकने</strong> के लिए अपना हाथ उठाया।',
                synonyms: ['Stop', 'Pause'],
                antonyms: ['Start', 'Continue'],
                extraInfo: 'Halt can be a Noun or a Verb. It means to bring or come to an abrupt stop.',
                extraInfoHi: 'Halt (रोक देना/रुकना) एक संज्ञा या क्रिया हो सकता है। इसका अर्थ है अचानक रुक जाना।'
            },
            'destruction': {
                actualWord: 'Demolition',
                pos: 'Noun',
                sentence: 'Samriddhi Chaurasiya watched the safe <strong>demolition</strong> of the old, abandoned building near her house.',
                sentenceHi: 'समृद्धि चौरसिया ने अपने घर के पास पुरानी, परित्यक्त इमारत के सुरक्षित <strong>विध्वंस (तोड़फोड़)</strong> को देखा।',
                synonyms: ['Destruction', 'Knocking down'],
                antonyms: ['Construction', 'Building'],
                extraInfo: 'Demolition is a Noun. It is the action or process of demolishing or forcefully destroying a building or structure.',
                extraInfoHi: 'Demolition (नष्ट कर देना/तोड़फोड़) एक संज्ञा है। यह किसी इमारत या संरचना को ढहाने या बलपूर्वक नष्ट करने की क्रिया या प्रक्रिया है।'
            },
            'be the property of': {
                actualWord: 'Belong',
                pos: 'Verb',
                sentence: 'Arpit Pal found a lost wallet in the playground and wondered to whom it might <strong>belong</strong>.',
                sentenceHi: 'अर्पित पाल को खेल के मैदान में एक खोया हुआ बटुआ मिला और उसने सोचा कि यह किसका <strong>हो सकता है।</strong>',
                synonyms: ['Owned by', 'Appertain to'],
                antonyms: [],
                extraInfo: 'Belong is a Verb. It means to be the property of someone or to be a member of a particular group.',
                extraInfoHi: 'Belong (संबंधित/का होना) एक क्रिया है। इसका अर्थ है किसी की संपत्ति होना या किसी विशेष समूह का सदस्य होना।'
            },
            'more distant/additional': {
                actualWord: 'Further',
                pos: 'Adverb/Adjective',
                sentence: 'Kavya refused to answer any <strong>further</strong> questions until she finished reading the entire book.',
                sentenceHi: 'काव्या ने पूरी किताब पढ़ने तक <strong>आगे</strong> कोई भी सवाल का जवाब देने से इनकार कर दिया।',
                synonyms: ['Additional', 'More'],
                antonyms: ['Closer', 'Nearer'],
                extraInfo: 'Further is an Adverb or Adjective. It means more distant in space or time, or something additional.',
                extraInfoHi: 'Further (आगे/और अधिक) एक क्रिया विशेषण या विशेषण है। इसका अर्थ है स्थान या समय में अधिक दूर, या कुछ अतिरिक्त।'
            },
            'take control of/fill': {
                actualWord: 'Occupy',
                pos: 'Verb',
                sentence: 'The invading army tried to <strong>occupy</strong> the peaceful city, but the brave soldiers defended it well.',
                sentenceHi: 'आक्रमणकारी सेना ने शांतिपूर्ण शहर पर <strong>कब्जा करने</strong> की कोशिश की, लेकिन बहादुर सैनिकों ने इसकी अच्छी तरह रक्षा की।',
                synonyms: ['Take over', 'Inhabit'],
                antonyms: ['Vacate', 'Leave'],
                extraInfo: 'Occupy is a Verb. It means to take control of a place, or to fill a space, time, or someone\'s mind.',
                extraInfoHi: 'Occupy (कब्जा करना/घेरना) एक क्रिया है। इसका अर्थ है किसी स्थान पर नियंत्रण करना, या किसी स्थान, समय या किसी के दिमाग को भरना।'
            },
            'deceive/give wrong idea': {
                actualWord: 'Mislead',
                pos: 'Verb',
                sentence: 'Muskan quickly realized that the fake advertisement was designed to <strong>mislead</strong> the innocent customers.',
                sentenceHi: 'मुस्कान को जल्दी ही एहसास हो गया कि नकली विज्ञापन निर्दोष ग्राहकों को <strong>गुमराह करने</strong> के लिए बनाया गया था।',
                synonyms: ['Deceive', 'Fool'],
                antonyms: ['Guide', 'Enlighten'],
                extraInfo: 'Mislead is a Verb. It means to cause someone to have a wrong idea or impression about something.',
                extraInfoHi: 'Mislead (गुमराह करना) एक क्रिया है। इसका अर्थ है किसी को किसी चीज के बारे में गलत विचार या धारणा देना।'
            },
            'collecting/stockpiling': {
                actualWord: 'Hoarding',
                pos: 'Noun',
                sentence: 'The government took strict action against the illegal <strong>hoarding</strong> of essential food supplies during the crisis.',
                sentenceHi: 'सरकार ने संकट के दौरान आवश्यक खाद्य आपूर्ति की अवैध <strong>जमाखोरी</strong> के खिलाफ सख्त कार्रवाई की।',
                synonyms: ['Stockpiling', 'Accumulating'],
                antonyms: ['Distributing', 'Sharing'],
                extraInfo: 'Hoarding is a Noun. It refers to the practice of collecting or accumulating large amounts of something (like food or money), often secretly.',
                extraInfoHi: 'Hoarding (जमाखोरी) एक संज्ञा है। यह गुप्त रूप से किसी चीज (जैसे भोजन या पैसा) की बड़ी मात्रा में संग्रह या संचय करने की प्रथा को संदर्भित करता है।'
            },
            'absolutely necessary': {
                actualWord: 'Essential',
                pos: 'Adjective',
                sentence: 'Clean water and fresh air are completely <strong>essential</strong> for human survival, Sanjana Nishad learned in science class.',
                sentenceHi: 'मानव अस्तित्व के लिए साफ पानी और ताजी हवा पूरी तरह से <strong>आवश्यक</strong> है, संजना निषाद ने विज्ञान की कक्षा में सीखा।',
                synonyms: ['Crucial', 'Necessary'],
                antonyms: ['Unimportant', 'Optional'],
                extraInfo: 'Essential is an Adjective. It describes something that is completely necessary or extremely important.',
                extraInfoHi: 'Essential (आवश्यक/जरूरी) एक विशेषण है। यह किसी ऐसी चीज़ का वर्णन करता है जो पूरी तरह से आवश्यक या अत्यंत महत्वपूर्ण है।'
            },
            'notice/see': {
                actualWord: 'Spot',
                pos: 'Noun/Verb',
                sentence: 'Anubhav was very excited to <strong>spot</strong> a rare blue bird resting on his balcony.',
                sentenceHi: 'अनुभव अपनी बालकनी पर आराम कर रहे एक दुर्लभ नीले पक्षी को <strong>देखकर</strong> बहुत उत्साहित हुआ।',
                synonyms: ['Notice', 'See'],
                antonyms: ['Overlook', 'Miss'],
                extraInfo: 'Spot can be a Noun (a mark) or a Verb. As a verb, it means to see, notice, or recognize someone or something that is difficult to detect.',
                extraInfoHi: 'Spot (देखा/पहचानना) एक संज्ञा (एक निशान) या एक क्रिया हो सकता है। एक क्रिया के रूप में, इसका अर्थ है किसी को या किसी चीज़ को देखना, नोटिस करना या पहचानना जिसका पता लगाना मुश्किल है।'
            },
            'goods train': {
                actualWord: 'Freight train',
                pos: 'Noun Phrase',
                sentence: 'Aniket watched the long <strong>freight train</strong> slowly pass through the railway station carrying tons of heavy coal.',
                sentenceHi: 'अनिकेत ने लंबी <strong>मालगाड़ी</strong> को रेलवे स्टेशन से धीरे-धीरे भारी कोयले के टन ले जाते हुए देखा।',
                synonyms: ['Goods train', 'Cargo train'],
                antonyms: ['Passenger train'],
                extraInfo: 'Freight train is a Noun Phrase. It is a train specifically designed for carrying goods and heavy cargo rather than people.',
                extraInfoHi: 'Freight train (माल गाड़ी) एक संज्ञा वाक्यांश है। यह विशेष रूप से लोगों के बजाय माल और भारी माल ले जाने के लिए डिज़ाइन की गई एक ट्रेन है।'
            },
            'normal citizen': {
                actualWord: 'Civilian',
                pos: 'Noun',
                sentence: 'During the dangerous rescue mission, the brave soldiers safely evacuated every single <strong>civilian</strong> from the affected zone.',
                sentenceHi: 'खतरनाक बचाव मिशन के दौरान, बहादुर सैनिकों ने प्रभावित क्षेत्र से हर एक <strong>नागरिक</strong> को सुरक्षित निकाल लिया।',
                synonyms: ['Citizen', 'Non-military'],
                antonyms: ['Military', 'Soldier'],
                extraInfo: 'Civilian is a Noun. It refers to a person who is not a member of the armed services or the police force.',
                extraInfoHi: 'Civilian (असैनिक/नागरिक) एक संज्ञा है। यह एक ऐसे व्यक्ति को संदर्भित करता है जो सशस्त्र सेवाओं या पुलिस बल का सदस्य नहीं है।'
            },
            'curved shape': {
                actualWord: 'Crescent',
                pos: 'Noun/Adjective',
                sentence: 'Deva looked up at the beautiful night sky and peacefully admired the glowing <strong>crescent</strong> moon.',
                sentenceHi: 'देवा ने सुंदर रात के आकाश की ओर देखा और शांतिपूर्वक चमकते <strong>अर्धचंद्राकार</strong> चाँद की प्रशंसा की।',
                synonyms: ['Half-moon shape', 'Curve'],
                antonyms: ['Full circle'],
                extraInfo: 'Crescent is a Noun or Adjective. It is the curved sickle shape of the waxing or waning moon.',
                extraInfoHi: 'Crescent (अर्धचन्द्राकार) एक संज्ञा या विशेषण है। यह घटते या बढ़ते चंद्रमा का घुमावदार दरांती आकार है।'
            },
            // ========== GATHRI 28: Crime & Society ==========
            'very big/large': {
                actualWord: 'Huge',
                pos: 'Adjective',
                sentence: 'Jhanvi was amazed to see a <strong>huge</strong> elephant bathing in the river during her jungle safari.',
                sentenceHi: 'झांवी अपनी जंगल सफारी के दौरान नदी में नहाते हुए एक <strong>विशाल</strong> हाथी को देखकर चकित रह गई।',
                synonyms: ['Enormous', 'Massive'],
                antonyms: ['Tiny', 'Small'],
                extraInfo: 'Huge is an Adjective. It describes something that is extremely large in size or amount.',
                extraInfoHi: 'Huge (विशाल/बड़ा) एक विशेषण है। यह किसी ऐसी चीज़ का वर्णन करता है जो आकार या मात्रा में अत्यंत बड़ी हो।'
            },
            'private teacher/coach': {
                actualWord: 'Tutor',
                pos: 'Noun',
                sentence: 'Arpit Pal hired a mathematics <strong>tutor</strong> to help him understand algebra better before the final exams.',
                sentenceHi: 'अर्पित पाल ने अंतिम परीक्षा से पहले बीजगणित को बेहतर ढंग से समझने के लिए एक गणित <strong>शिक्षक</strong> को काम पर रखा।',
                synonyms: ['Instructor', 'Coach'],
                antonyms: ['Student', 'Pupil'],
                extraInfo: 'Tutor is a Noun. It refers to a private teacher who teaches a single student or a very small group.',
                extraInfoHi: 'Tutor (कोच/निजी शिक्षक) एक संज्ञा है। यह एक निजी शिक्षक को संदर्भित करता है जो एक अकेले छात्र या बहुत छोटे समूह को पढ़ाता है।'
            },
            'secret evil plan': {
                actualWord: 'Conspiracy',
                pos: 'Noun',
                sentence: 'The brilliant detective successfully uncovered a dangerous <strong>conspiracy</strong> against the king, Aniket read in his historical novel.',
                sentenceHi: 'अनिकेत ने अपने ऐतिहासिक उपन्यास में पढ़ा कि शानदार जासूस ने राजा के खिलाफ एक खतरनाक <strong>साजिश</strong> का सफलतापूर्वक पर्दाफाश किया।',
                synonyms: ['Plot', 'Scheme'],
                antonyms: ['Honesty', 'Loyalty'],
                extraInfo: 'Conspiracy is a Noun. It is a secret plan by a group to do something unlawful or harmful.',
                extraInfoHi: 'Conspiracy (षड़यंत्र/साजिश) एक संज्ञा है। यह किसी समूह द्वारा कुछ गैरकानूनी या हानिकारक करने की एक गुप्त योजना है।'
            },
            'death penalty': {
                actualWord: 'Capital Punishment',
                pos: 'Noun',
                sentence: 'Deva watched a news debate discussing whether <strong>capital punishment</strong> should be banned in modern society.',
                sentenceHi: 'देवा ने एक समाचार बहस देखी जिसमें चर्चा की गई कि क्या आधुनिक समाज में <strong>मृत्युदंड</strong> पर प्रतिबंध लगाया जाना चाहिए।',
                synonyms: ['Death penalty', 'Execution'],
                antonyms: ['Pardon', 'Life sentence'],
                extraInfo: 'Capital Punishment is a Noun. It is the legally authorized killing of someone as punishment for a very serious crime.',
                extraInfoHi: 'Capital Punishment (सजा-ए-मौत) एक संज्ञा है। यह किसी बहुत ही गंभीर अपराध की सजा के रूप में किसी की कानूनी रूप से अधिकृत हत्या है।'
            },
            'main point/summary': {
                actualWord: 'Crux / Gist',
                pos: 'Noun',
                sentence: 'The teacher asked Samriddhi Chaurasiya to quickly explain the <strong>crux</strong> of the long poem to the rest of the class.',
                sentenceHi: 'शिक्षक ने समृद्धि चौरसिया से बाकी कक्षा को लंबी कविता का <strong>मूल बिंदु</strong> जल्दी से समझाने के लिए कहा।',
                synonyms: ['Core', 'Summary', 'Essence'],
                antonyms: ['Details', 'Extras'],
                extraInfo: 'Crux and Gist are Nouns. They refer to the most important or central point of an issue, or the general meaning of a speech or text.',
                extraInfoHi: 'Crux / Gist (मूल बिंदु/सारांश) संज्ञा हैं। वे किसी मुद्दे के सबसे महत्वपूर्ण या केंद्रीय बिंदु, या किसी भाषण या पाठ के सामान्य अर्थ को संदर्भित करते हैं।'
            },
            'cancel': {
                actualWord: 'Call off',
                pos: 'Phrasal Verb',
                sentence: 'The school principal had to <strong>call off</strong> the annual sports day because of the heavy thunderstorm, disappointing Sanjana Nishad.',
                sentenceHi: 'भारी आंधी के कारण स्कूल के प्रधानाचार्य को वार्षिक खेल दिवस <strong>रद्द करना</strong> पड़ा, जिससे संजना निषाद निराश हो गईं।',
                synonyms: ['Cancel', 'Abandon'],
                antonyms: ['Continue', 'Proceed'],
                extraInfo: 'Call off is a Phrasal Verb. It means to cancel an event or agreement that was previously planned.',
                extraInfoHi: 'Call off (बंद करना/मना करना/रद्द करना) एक Phrasal Verb है। इसका अर्थ है किसी ऐसी घटना या समझौते को रद्द करना जिसकी पहले योजना बनाई गई थी।'
            },
            'metal rings for wrists': {
                actualWord: 'Handcuff',
                pos: 'Noun/Verb',
                sentence: 'The brave police officer managed to place a heavy <strong>handcuff</strong> on the running thief, Anubhav observed.',
                sentenceHi: 'अनुभव ने देखा कि बहादुर पुलिस अधिकारी भागते हुए चोर को भारी <strong>हथकड़ी</strong> पहनाने में कामयाब रहा।',
                synonyms: ['Manacles', 'Cuffs'],
                antonyms: ['Release', 'Unfasten'],
                extraInfo: 'Handcuff can be a Noun or a Verb. It refers to a pair of lockable metal rings connected by a short chain, used to secure a prisoner\'s wrists.',
                extraInfoHi: 'Handcuff (हथकड़ी) एक संज्ञा या क्रिया हो सकता है। यह एक छोटी श्रृंखला द्वारा जुड़ी लॉक करने योग्य धातु के छल्लों की एक जोड़ी को संदर्भित करता है, जिसका उपयोग कैदी की कलाइयों को सुरक्षित करने के लिए किया जाता है।'
            },
            'chains for legs/wrists': {
                actualWord: 'Shackle',
                pos: 'Noun',
                sentence: 'The innocent man cried tears of joy when the judge ordered the guards to remove his heavy iron <strong>shackles</strong>, Kavya read.',
                sentenceHi: 'काव्या ने पढ़ा, जब न्यायाधीश ने संतरियों को उसकी भारी लोहे की <strong>बेड़ियाँ</strong> हटाने का आदेश दिया तो निर्दोष व्यक्ति खुशी के आंसू रो पड़ा।',
                synonyms: ['Chains', 'Fetters'],
                antonyms: ['Freedom', 'Emancipation'],
                extraInfo: 'Shackle is a Noun (often used in plural as shackles). It refers to a pair of metal rings connected by a chain, used to fasten a prisoner\'s ankles or wrists.',
                extraInfoHi: 'Shackle (बेड़ी) एक संज्ञा है (अक्सर बहुवचन के रूप में प्रयोग किया जाता है)। यह एक श्रृंखला द्वारा जुड़े धातु के छल्लों की एक जोड़ी को संदर्भित करता है, जिसका उपयोग कैदी के टखनों या कलाई को बांधने के लिए किया जाता है।'
            },
            'be cautious/alert': {
                actualWord: 'Beware',
                pos: 'Verb',
                sentence: 'A large sign on the wooden gate warned everyone to <strong>beware</strong> of the fierce guard dog, so Muskan stayed away.',
                sentenceHi: 'लकड़ी के गेट पर एक बड़े बोर्ड ने सभी को खूंखार रक्षक कुत्ते से <strong>सावधान रहने</strong> की चेतावनी दी, इसलिए मुस्कान दूर रही।',
                synonyms: ['Watch out', 'Be careful'],
                antonyms: ['Ignore', 'Be reckless'],
                extraInfo: 'Beware is a Verb. It means to be cautious and alert to risks or dangers.',
                extraInfoHi: 'Beware (सावधान/खबरदार) एक क्रिया है। इसका अर्थ है जोखिमों या खतरों के प्रति सतर्क और चौकस रहना।'
            },
            'fraud/dishonest scheme': {
                actualWord: 'Scam',
                pos: 'Noun',
                sentence: 'Yash quickly realized that the text message offering him a free lottery ticket was actually a dangerous <strong>scam</strong>.',
                sentenceHi: 'यश को जल्दी ही एहसास हो गया कि उसे मुफ्त लॉटरी टिकट देने वाला टेक्स्ट संदेश वास्तव में एक खतरनाक <strong>घोटाला</strong> था।',
                synonyms: ['Fraud', 'Swindle'],
                antonyms: ['Honesty', 'Truth'],
                extraInfo: 'Scam is a Noun. It is a dishonest scheme or a fraud designed to cheat people out of their money.',
                extraInfoHi: 'Scam (घोटाला/धोखाधड़ी) एक संज्ञा है। यह एक बेईमान योजना या लोगों का पैसा ठगने के लिए बनाया गया धोखा है।'
            },
            'animal feed': {
                actualWord: 'Fodder',
                pos: 'Noun',
                sentence: 'Early in the morning, the hardworking farmer carried a large bundle of green <strong>fodder</strong> to feed his hungry cows, Shivansh noticed.',
                sentenceHi: 'शिवंश ने देखा कि सुबह-सुबह मेहनती किसान अपनी भूखी गायों को खिलाने के लिए हरे <strong>चारे</strong> का एक बड़ा गट्ठर ले जा रहा था।',
                synonyms: ['Animal feed', 'Forage'],
                antonyms: [],
                extraInfo: 'Fodder is a Noun. It refers to food, especially dried hay or straw, used for feeding cattle and other livestock.',
                extraInfoHi: 'Fodder (चारा) एक संज्ञा है। यह भोजन को संदर्भित करता है, विशेष रूप से सूखी घास या भूसा, जिसका उपयोग मवेशियों और अन्य पशुओं को खिलाने के लिए किया जाता है।'
            },
            'praise highly': {
                actualWord: 'Glorify',
                pos: 'Verb',
                sentence: 'Stuti believes that movies should never <strong>glorify</strong> criminals or violence because it sets a bad example for children.',
                sentenceHi: 'स्तुति का मानना है कि फिल्मों में कभी भी अपराधियों या हिंसा का <strong>महिमामंडन</strong> नहीं करना चाहिए क्योंकि यह बच्चों के लिए एक बुरा उदाहरण पेश करता है।',
                synonyms: ['Praise', 'Exalt'],
                antonyms: ['Condemn', 'Criticize'],
                extraInfo: 'Glorify is a Verb. It means to describe or represent something as admirable, especially something that is actually not good, or to praise someone highly.',
                extraInfoHi: 'Glorify (महिमा मंडन/पूजना) एक क्रिया है। इसका अर्थ है किसी चीज़ को प्रशंसनीय बताना, विशेषकर ऐसी चीज़ जो वास्तव में अच्छी न हो, या किसी की बहुत अधिक प्रशंसा करना।'
            },
            'application of a law': {
                actualWord: 'Enforcement',
                pos: 'Noun',
                sentence: 'Strict <strong>enforcement</strong> of traffic rules is absolutely necessary to prevent severe accidents on the highway, Ladli argued.',
                sentenceHi: 'हाईवे पर गंभीर दुर्घटनाओं को रोकने के लिए यातायात नियमों का सख्ती से <strong>लागू होना</strong> नितांत आवश्यक है, लाडली ने तर्क दिया।',
                synonyms: ['Implementation', 'Application'],
                antonyms: ['Violation', 'Disregard'],
                extraInfo: 'Enforcement is a Noun. It is the act of compelling observance of or compliance with a law, rule, or obligation.',
                extraInfoHi: 'Enforcement (लागू करना) एक संज्ञा है। यह किसी कानून, नियम या दायित्व का पालन या अनुपालन कराने का कार्य है।'
            },
            'fraudster/cheat': {
                actualWord: 'Scammer',
                pos: 'Noun',
                sentence: 'The clever <strong>scammer</strong> tried to steal bank details over a phone call, but Hari Kishan immediately disconnected the line.',
                sentenceHi: 'चतुर <strong>जालसाज़</strong> ने फोन कॉल पर बैंक विवरण चुराने की कोशिश की, लेकिन हरि किशन ने तुरंत लाइन काट दी।',
                synonyms: ['Fraudster', 'Swindler'],
                antonyms: ['Honest person', 'Philanthropist'],
                extraInfo: 'Scammer is a Noun. It refers to a person who commits fraud or participates in a dishonest scheme to steal money or information.',
                extraInfoHi: 'Scammer (धोखाधड़ी करने वाला) एक संज्ञा है। यह एक ऐसे व्यक्ति को संदर्भित करता है जो पैसा या जानकारी चुराने के लिए धोखाधड़ी करता है या किसी बेईमान योजना में भाग लेता है।'
            },
            'ground grain powder': {
                actualWord: 'Flour',
                pos: 'Noun',
                sentence: 'Adarsh went to the grocery store to buy two packets of fine wheat <strong>flour</strong> so his mother could bake fresh bread.',
                sentenceHi: 'आदर्श किराने की दुकान पर दो पैकेट बारीक गेहूं का <strong>आटा</strong> खरीदने गया ताकि उसकी माँ ताज़ी रोटी बना सके।',
                synonyms: ['Ground grain', 'Powder'],
                antonyms: [],
                extraInfo: 'Flour is a Noun. It is a powder obtained by grinding grain, typically wheat, and used to make bread, cakes, and pastry.',
                extraInfoHi: 'Flour (आटा) एक संज्ञा है। यह आमतौर पर गेहूं या अनाज को पीसकर प्राप्त किया गया एक पाउडर है, जिसका उपयोग रोटी, केक और पेस्ट्री बनाने के लिए किया जाता है।'
            },
            // ========== GATHRI 29: Life & Nature ==========
            'small shop/stand': {
                actualWord: 'Stall',
                pos: 'Noun',
                sentence: 'Aniket bought some fresh apples from a small fruit <strong>stall</strong> near the crowded market.',
                sentenceHi: 'अनिकेत ने भीड़भाड़ वाले बाज़ार के पास एक छोटी फल की <strong>दुकान</strong> से कुछ ताज़े सेब खरीदे।',
                synonyms: ['Stand', 'Booth'],
                antonyms: ['Supermarket', 'Mall'],
                extraInfo: 'Stall is a Noun. It is a small shop, stand, or booth in a market where goods are sold.',
                extraInfoHi: 'Stall (छोटी दुकान) एक संज्ञा है। यह बाज़ार में एक छोटी दुकान, स्टैंड या बूथ है जहाँ सामान बेचा जाता है।'
            },
            'renown/popularity': {
                actualWord: 'Fame',
                pos: 'Noun',
                sentence: 'The young singer achieved international <strong>fame</strong> after his first beautiful song went viral on the internet, Deva noted.',
                sentenceHi: 'देवा ने नोट किया कि युवा गायक ने अपने पहले खूबसूरत गाने के इंटरनेट पर वायरल होने के बाद अंतरराष्ट्रीय <strong>प्रसिद्धि</strong> हासिल की।',
                synonyms: ['Popularity', 'Glory'],
                antonyms: ['Obscurity', 'Disgrace'],
                extraInfo: 'Fame is a Noun. It refers to the state of being known or talked about by many people, especially on account of notable achievements.',
                extraInfoHi: 'Fame (प्रसिद्धि/शोहरत) एक संज्ञा है। यह कई लोगों द्वारा जाने जाने या चर्चित होने की स्थिति को संदर्भित करता है, विशेष रूप से उल्लेखनीय उपलब्धियों के कारण।'
            },
            'fall down/fail': {
                actualWord: 'Collapse',
                pos: 'Verb',
                sentence: 'Jhanvi warned everyone that the old wooden bridge might <strong>collapse</strong> if too many heavy trucks crossed it at the same time.',
                sentenceHi: 'झांवी ने सभी को चेतावनी दी कि अगर एक ही समय में बहुत सारे भारी ट्रक पुराने लकड़ी के पुल से गुज़रे तो वह <strong>ढह</strong> सकता है।',
                synonyms: ['Fall', 'Cave in'],
                antonyms: ['Rise', 'Stand strong'],
                extraInfo: 'Collapse is a Verb. It means to suddenly fall down or give way, usually because of weakness or structural failure.',
                extraInfoHi: 'Collapse (गिर जाना/ढह जाना) एक क्रिया है। इसका अर्थ है अचानक गिर जाना या टूट जाना, आमतौर पर कमज़ोरी या संरचनात्मक विफलता के कारण।'
            },
            'deep sorrow': {
                actualWord: 'Grief',
                pos: 'Noun',
                sentence: 'Samriddhi Chaurasiya felt immense <strong>grief</strong> when her beloved pet dog passed away last week.',
                sentenceHi: 'समृद्धि चौरसिया को अत्यंत <strong>दुःख</strong> हुआ जब पिछले हफ्ते उसका प्यारा पालतू कुत्ता चल बसा।',
                synonyms: ['Sorrow', 'Sadness'],
                antonyms: ['Joy', 'Happiness'],
                extraInfo: 'Grief is a Noun. It is an intense sorrow or deep sadness, especially caused by someone\'s death or a major loss.',
                extraInfoHi: 'Grief (दुःख/शोक) एक संज्ञा है। यह एक तीव्र दुःख या गहरी उदासी है, विशेष रूप से किसी की मृत्यु या बड़ी हानि के कारण।'
            },
            'relating to money': {
                actualWord: 'Financial',
                pos: 'Adjective',
                sentence: 'Arpit Pal wants to become a professional accountant to help companies easily manage their <strong>financial</strong> records.',
                sentenceHi: 'अर्पित पाल एक पेशेवर लेखाकार बनना चाहते हैं ताकि कंपनियों को उनके <strong>वित्तीय</strong> रिकॉर्ड आसानी से प्रबंधित करने में मदद मिल सके।',
                synonyms: ['Economic', 'Monetary'],
                antonyms: ['Non-financial'],
                extraInfo: 'Financial is an Adjective. It is used to describe things relating to finance, money, or how money is managed.',
                extraInfoHi: 'Financial (वित्तीय/आर्थिक) एक विशेषण है। इसका उपयोग वित्त, धन, या पैसे के प्रबंधन से संबंधित चीज़ों का वर्णन करने के लिए किया जाता है।'
            },
            'find/situate': {
                actualWord: 'Locate',
                pos: 'Verb',
                sentence: 'Kavya used a digital map on her smart phone to quickly <strong>locate</strong> the new museum in the city.',
                sentenceHi: 'काव्या ने शहर में नए संग्रहालय का जल्दी से <strong>पता लगाने</strong> के लिए अपने स्मार्ट फोन पर डिजिटल मैप का इस्तेमाल किया।',
                synonyms: ['Find', 'Discover'],
                antonyms: ['Lose', 'Misplace'],
                extraInfo: 'Locate is a Verb. It means to discover the exact place or position of something, or to set something in a particular place.',
                extraInfoHi: 'Locate (पता लगाना/स्थित होना) एक क्रिया है। इसका अर्थ है किसी चीज़ के सटीक स्थान या स्थिति का पता लगाना, या किसी चीज़ को किसी विशेष स्थान पर रखना।'
            },
            'break into fragments': {
                actualWord: 'Crumble',
                pos: 'Verb',
                sentence: 'Muskan accidentally dropped the dry biscuit, watching it immediately <strong>crumble</strong> into tiny pieces on the floor.',
                sentenceHi: 'मुस्कान ने गलती से सूखा बिस्कुट गिरा दिया और देखा कि वह तुरंत फर्श पर छोटे-छोटे <strong>टुकड़ों में बिखर</strong> गया।',
                synonyms: ['Disintegrate', 'Fall apart'],
                antonyms: ['Solidify', 'Unite'],
                extraInfo: 'Crumble is a Verb. It means to break or fall apart into small fragments, especially as part of a process of deterioration.',
                extraInfoHi: 'Crumble (टुकड़े-टुकड़े होना) एक क्रिया है। इसका अर्थ है छोटे टुकड़ों में टूटना या बिखरना, विशेष रूप से क्षय की प्रक्रिया के हिस्से के रूप में।'
            },
            'cause to happen': {
                actualWord: 'Trigger',
                pos: 'Noun/Verb',
                sentence: 'Sanjana Nishad learned in geography class that a sudden earthquake under the ocean can easily <strong>trigger</strong> a dangerous tsunami.',
                sentenceHi: 'संजना निषाद ने भूगोल की कक्षा में सीखा कि समुद्र के नीचे अचानक भूकंप आसानी से एक खतरनाक सुनामी <strong>पैदा कर</strong> सकता है।',
                synonyms: ['Cause', 'Provoke'],
                antonyms: ['Prevent', 'Halt'],
                extraInfo: 'Trigger can be a Noun or a Verb. As a verb, it means to cause an event or situation to happen or exist suddenly.',
                extraInfoHi: 'Trigger (कारण बनना/शुरू करना) एक संज्ञा या क्रिया हो सकता है। एक क्रिया के रूप में, इसका अर्थ है किसी घटना या स्थिति को अचानक घटित करना।'
            },
            'cruelly/violently': {
                actualWord: 'Brutally',
                pos: 'Adverb',
                sentence: 'Anubhav was shocked to read a history book explaining how ancient kings <strong>brutally</strong> treated their defeated enemies.',
                sentenceHi: 'अनुभव एक इतिहास की किताब पढ़कर हैरान रह गया जिसमें बताया गया था कि प्राचीन राजा अपने पराजित शत्रुओं के साथ कैसे <strong>क्रूरतापूर्वक</strong> व्यवहार करते थे।',
                synonyms: ['Cruelly', 'Savagely'],
                antonyms: ['Gently', 'Kindly'],
                extraInfo: 'Brutally is an Adverb. It describes an action done in a savagely violent, cruel, or harsh way.',
                extraInfoHi: 'Brutally (क्रूरता से/बेरहमी से) एक क्रिया विशेषण है। यह किसी कार्य को बर्बर, क्रूर या कठोर तरीके से किए जाने का वर्णन करता है।'
            },
            'winter sleep': {
                actualWord: 'Hibernation',
                pos: 'Noun',
                sentence: 'Aniket watched a fascinating nature documentary explaining how brown bears go into deep <strong>hibernation</strong> during the freezing winter months.',
                sentenceHi: 'अनिकेत ने एक आकर्षक प्रकृति वृत्तचित्र देखा जिसमें बताया गया कि कैसे भूरे भालू ठंड के सर्दियों के महीनों में गहरी <strong>शीतनिद्रा</strong> में चले जाते हैं।',
                synonyms: ['Winter sleep', 'Dormancy'],
                antonyms: ['Activity', 'Awakening'],
                extraInfo: 'Hibernation is a Noun. It is the condition or period of an animal or plant spending the winter in a dormant state (deep sleep).',
                extraInfoHi: 'Hibernation (शीतनिद्रा) एक संज्ञा है। यह किसी जानवर या पौधे की सर्दियों में निष्क्रिय अवस्था (गहरी नींद) में बिताने की स्थिति या अवधि है।'
            },
            'person who moves for work': {
                actualWord: 'Migrant',
                pos: 'Noun',
                sentence: 'Deva saw a news report about how a <strong>migrant</strong> worker travels very far from his hometown just to find a reliable job.',
                sentenceHi: 'देवा ने एक समाचार रिपोर्ट देखी कि कैसे एक <strong>प्रवासी</strong> मज़दूर एक विश्वसनीय नौकरी खोजने के लिए अपने गृहनगर से बहुत दूर यात्रा करता है।',
                synonyms: ['Traveler', 'Immigrant'],
                antonyms: ['Native', 'Local'],
                extraInfo: 'Migrant is a Noun. It refers to a person who moves from one place to another, especially in order to find work or better living conditions.',
                extraInfoHi: 'Migrant (प्रवासी/स्थान बदलकर रहने वाला) एक संज्ञा है। यह एक ऐसे व्यक्ति को संदर्भित करता है जो एक स्थान से दूसरे स्थान पर जाता है, विशेष रूप से काम या बेहतर रहने की स्थिति खोजने के लिए।'
            },
            'wandering community': {
                actualWord: 'Nomad tribe',
                pos: 'Noun Phrase',
                sentence: 'Jhanvi read an adventurous story about a strong <strong>nomad tribe</strong> that constantly travels across the hot desert on camels.',
                sentenceHi: 'झांवी ने एक साहसिक कहानी पढ़ी एक मजबूत <strong>खानाबदोश कबीले</strong> के बारे में जो लगातार ऊंटों पर गर्म रेगिस्तान पार करता है।',
                synonyms: ['Wandering tribe', 'Gypsies'],
                antonyms: ['Settled community'],
                extraInfo: 'Nomad tribe is a Noun Phrase. It refers to a community of people who do not have a permanent home and travel from place to place to find fresh pasture for their livestock.',
                extraInfoHi: 'Nomad tribe (खानाबदोश कबीला) एक संज्ञा वाक्यांश है। यह उन लोगों के समुदाय को संदर्भित करता है जिनका कोई स्थायी घर नहीं होता और वे अपने पशुओं के लिए ताज़ा चारागाह खोजने हेतु एक स्थान से दूसरे स्थान पर यात्रा करते हैं।'
            },
            'continue firmly': {
                actualWord: 'Persist',
                pos: 'Verb',
                sentence: 'If the heavy rain continues to <strong>persist</strong> throughout the night, Samriddhi Chaurasiya knows the narrow streets will definitely flood.',
                sentenceHi: 'अगर भारी बारिश पूरी रात <strong>जारी रहती</strong> है, तो समृद्धि चौरसिया जानती हैं कि तंग गलियों में निश्चित रूप से बाढ़ आ जाएगी।',
                synonyms: ['Continue', 'Persevere'],
                antonyms: ['Stop', 'Give up'],
                extraInfo: 'Persist is a Verb. It means to continue firmly or obstinately in an opinion or a course of action in spite of difficulty, opposition, or failure.',
                extraInfoHi: 'Persist (कायम रहना/दृढ़ रहना) एक क्रिया है। इसका अर्थ है कठिनाई, विरोध या असफलता के बावजूद किसी राय या कार्य में दृढ़ता से जारी रहना।'
            },
            'give confidence/promise': {
                actualWord: 'Assure',
                pos: 'Verb',
                sentence: 'Arpit Pal tried his best to <strong>assure</strong> his nervous teammate that they had practiced more than enough to win the final match.',
                sentenceHi: 'अर्पित पाल ने अपने घबराए हुए साथी को <strong>भरोसा दिलाने</strong> की पूरी कोशिश की कि उन्होंने फाइनल मैच जीतने के लिए पर्याप्त अभ्यास किया है।',
                synonyms: ['Promise', 'Guarantee'],
                antonyms: ['Doubt', 'Alarm'],
                extraInfo: 'Assure is a Verb. It means to tell someone something positively or confidently to dispel any doubts they may have.',
                extraInfoHi: 'Assure (भरोसा दिलाना) एक क्रिया है। इसका अर्थ है किसी को सकारात्मक या आत्मविश्वास से कुछ बताना ताकि उनकी किसी भी शंका को दूर किया जा सके।'
            },
            'thick piece': {
                actualWord: 'Chunk',
                pos: 'Noun',
                sentence: 'Kavya carefully used a knife to cut a large <strong>chunk</strong> of delicious chocolate cake and placed it gently on her plate.',
                sentenceHi: 'काव्या ने सावधानी से चाकू का उपयोग करके स्वादिष्ट चॉकलेट केक का एक बड़ा <strong>टुकड़ा</strong> काटा और इसे धीरे से अपनी प्लेट में रखा।',
                synonyms: ['Piece', 'Block'],
                antonyms: ['Crumb', 'Speck'],
                extraInfo: 'Chunk is a Noun. It refers to a thick, solid piece of something (like wood, stone, or food).',
                extraInfoHi: 'Chunk (टुकड़ा) एक संज्ञा है। यह किसी चीज़ (जैसे लकड़ी, पत्थर, या भोजन) के मोटे, ठोस टुकड़े को संदर्भित करता है।'
            },
            // ========== GATHRI 30: Philosophy & Crime ==========
            'grasp/organize': {
                actualWord: 'Hold',
                pos: 'Verb',
                sentence: 'Aniket helped the teacher to <strong>hold</strong> the heavy books and correctly organize the classroom event.',
                sentenceHi: 'अनिकेत ने शिक्षक को भारी किताबें <strong>पकड़ने</strong> और कक्षा के कार्यक्रम को सही ढंग से आयोजित करने में मदद की।',
                synonyms: ['Grasp', 'Keep', 'Organize'],
                antonyms: ['Drop', 'Release', 'Cancel'],
                extraInfo: 'Hold is a Verb. It means to grasp or carry something, or to arrange and take part in an event/meeting.',
                extraInfoHi: 'Hold (पकड़ना/आयोजित करना) एक क्रिया है। इसका अर्थ है किसी चीज़ को पकड़ना या ले जाना, या किसी कार्यक्रम/बैठक का आयोजन करना।'
            },
            'living forever': {
                actualWord: 'Immortal',
                pos: 'Adjective',
                sentence: 'In the ancient story, the brave warrior drank a magic potion to become completely <strong>immortal</strong>, Deva read.',
                sentenceHi: 'प्राचीन कहानी में, बहादुर योद्धा ने पूरी तरह से <strong>अमर</strong> बनने के लिए एक जादुई औषधि पी, देवा ने पढ़ा।',
                synonyms: ['Eternal', 'Undying'],
                antonyms: ['Mortal', 'Perishable'],
                extraInfo: 'Immortal is an Adjective. It describes someone or something that lives forever and never dies.',
                extraInfoHi: 'Immortal (अमर) एक विशेषण है। यह किसी ऐसे व्यक्ति या चीज़ का वर्णन करता है जो हमेशा जीवित रहता है और कभी नहीं मरता।'
            },
            'subject to death': {
                actualWord: 'Mortal',
                pos: 'Adjective/Noun',
                sentence: 'Jhanvi read a philosophical poem explaining that every single human being on earth is inherently <strong>mortal</strong>.',
                sentenceHi: 'झांवी ने एक दार्शनिक कविता पढ़ी जिसमें बताया गया कि पृथ्वी पर हर एक इंसान स्वाभाविक रूप से <strong>नश्वर</strong> है।',
                synonyms: ['Human', 'Perishable'],
                antonyms: ['Immortal', 'Eternal'],
                extraInfo: 'Mortal is an Adjective or Noun. It means being subject to death; something that must eventually die.',
                extraInfoHi: 'Mortal (मरने वाला/नश्वर) एक विशेषण या संज्ञा है। इसका अर्थ है मृत्यु के अधीन होना; कुछ ऐसा जो अंततः मर जाएगा।'
            },
            'local/indigenous': {
                actualWord: 'Native',
                pos: 'Adjective/Noun',
                sentence: 'Samriddhi Chaurasiya is a true <strong>native</strong> of this village and perfectly understands all the local traditions.',
                sentenceHi: 'समृद्धि चौरसिया इस गांव की एक सच्ची <strong>मूल निवासी</strong> हैं और सभी स्थानीय परंपराओं को पूरी तरह से समझती हैं।',
                synonyms: ['Indigenous', 'Local'],
                antonyms: ['Foreign', 'Alien'],
                extraInfo: 'Native is an Adjective or Noun. It refers to a person born in a specified place or associated with the place by birth.',
                extraInfoHi: 'Native (स्वदेशी/मूल निवासी) एक विशेषण या संज्ञा है। यह किसी निश्चित स्थान पर जन्मे या जन्म से उस स्थान से जुड़े व्यक्ति को संदर्भित करता है।'
            },
            'charismatic guru/cult leader': {
                actualWord: 'Godman',
                pos: 'Noun',
                sentence: 'The local police arrested the fake <strong>godman</strong> for illegally cheating innocent people out of their money, Arpit Pal shared.',
                sentenceHi: 'स्थानीय पुलिस ने नकली <strong>बाबा</strong> को निर्दोष लोगों के पैसे अवैध रूप से ठगने के लिए गिरफ्तार किया, अर्पित पाल ने बताया।',
                synonyms: ['Guru', 'Cult leader'],
                antonyms: ['Rationalist'],
                extraInfo: 'Godman is a Noun. It is a term commonly used in India to describe a charismatic guru or holy man, often used critically when they are involved in fraud.',
                extraInfoHi: 'Godman (तांत्रिक बाबा/ढोंगी) एक संज्ञा है। यह भारत में एक करिश्माई गुरु या संत का वर्णन करने के लिए उपयोग किया जाने वाला शब्द है, जो अक्सर धोखाधड़ी में शामिल होने पर आलोचनात्मक रूप से प्रयोग किया जाता है।'
            },
            'embodiment/avatar': {
                actualWord: 'Incarnation',
                pos: 'Noun',
                sentence: 'Kavya learned in her mythology class that Lord Krishna is widely worshipped as a divine <strong>incarnation</strong> of Lord Vishnu.',
                sentenceHi: 'काव्या ने अपनी पौराणिक कथाओं की कक्षा में सीखा कि भगवान कृष्ण को भगवान विष्णु के दिव्य <strong>अवतार</strong> के रूप में व्यापक रूप से पूजा जाता है।',
                synonyms: ['Avatar', 'Embodiment'],
                antonyms: [],
                extraInfo: 'Incarnation is a Noun. It means a person who embodies in the flesh a deity, spirit, or abstract quality.',
                extraInfoHi: 'Incarnation (अवतार) एक संज्ञा है। इसका अर्थ है एक ऐसा व्यक्ति जो शरीर में किसी देवता, आत्मा, या अमूर्त गुण को मूर्त रूप देता है।'
            },
            'chance occurrence': {
                actualWord: 'Coincidence',
                pos: 'Noun',
                sentence: 'It was a huge and surprising <strong>coincidence</strong> that Muskan and her best friend bought the exact same dress without planning it.',
                sentenceHi: 'यह एक बहुत बड़ा और आश्चर्यजनक <strong>संयोग</strong> था कि मुस्कान और उसकी सबसे अच्छी सहेली ने बिना योजना बनाए बिल्कुल एक जैसी ड्रेस खरीदी।',
                synonyms: ['Chance', 'Accident'],
                antonyms: ['Plan', 'Intention'],
                extraInfo: 'Coincidence is a Noun. It is a remarkable concurrence of events or circumstances without apparent causal connection.',
                extraInfoHi: 'Coincidence (संयोग/इत्तेफाक) एक संज्ञा है। यह बिना किसी स्पष्ट कारण संबंध के घटनाओं या परिस्थितियों का एक उल्लेखनीय संयोग है।'
            },
            'time period': {
                actualWord: 'Duration',
                pos: 'Noun',
                sentence: 'Sanjana Nishad stayed completely silent and focused for the entire <strong>duration</strong> of her two-hour examination.',
                sentenceHi: 'संजना निषाद अपनी दो घंटे की परीक्षा की पूरी <strong>अवधि</strong> के दौरान पूरी तरह से शांत और केंद्रित रहीं।',
                synonyms: ['Time', 'Period'],
                antonyms: [],
                extraInfo: 'Duration is a Noun. It refers to the time during which something continues or exists.',
                extraInfoHi: 'Duration (समय/अवधि) एक संज्ञा है। यह उस समय को संदर्भित करता है जिसके दौरान कुछ जारी रहता है या अस्तित्व में रहता है।'
            },
            'perfect/without defect': {
                actualWord: 'Flawless',
                pos: 'Adjective',
                sentence: 'Anubhav confidently delivered a completely <strong>flawless</strong> performance during the highly competitive annual speech contest.',
                sentenceHi: 'अनुभव ने अत्यधिक प्रतिस्पर्धी वार्षिक भाषण प्रतियोगिता के दौरान आत्मविश्वास से पूरी तरह <strong>त्रुटिहीन</strong> प्रदर्शन किया।',
                synonyms: ['Perfect', 'Impeccable'],
                antonyms: ['Flawed', 'Defective'],
                extraInfo: 'Flawless is an Adjective. It describes something that is without any blemishes or imperfections; completely perfect.',
                extraInfoHi: 'Flawless (कोई कमी न होना/त्रुटिहीन) एक विशेषण है। यह किसी ऐसी चीज़ का वर्णन करता है जिसमें कोई दोष या अपूर्णता नहीं है; पूरी तरह सही।'
            },
            'faking/false show': {
                actualWord: 'Pretense',
                pos: 'Noun',
                sentence: 'Under the clever <strong>pretense</strong> of helping, the trickster actually managed to steal the valuable watch, Aniket realized.',
                sentenceHi: 'मदद करने के चतुर <strong>बहाने</strong> में, ठग वास्तव में कीमती घड़ी चुराने में कामयाब रहा, अनिकेत ने महसूस किया।',
                synonyms: ['Fakery', 'Charade'],
                antonyms: ['Honesty', 'Reality'],
                extraInfo: 'Pretense is a Noun. It is an attempt to make something that is not the case appear true; faking or showing off.',
                extraInfoHi: 'Pretense (दिखावा/बहाना) एक संज्ञा है। यह किसी ऐसी चीज़ को सच दिखाने का प्रयास है जो वास्तव में सच नहीं है; नाटक करना या दिखावा करना।'
            },
            'criminal/offender': {
                actualWord: 'Perpetrator',
                pos: 'Noun',
                sentence: 'The smart detective finally gathered enough solid evidence to arrest the true <strong>perpetrator</strong> of the complex crime, Deva noted.',
                sentenceHi: 'चतुर जासूस ने आखिरकार जटिल अपराध के असली <strong>अपराधी</strong> को गिरफ्तार करने के लिए पर्याप्त ठोस सबूत जुटाए, देवा ने नोट किया।',
                synonyms: ['Criminal', 'Offender'],
                antonyms: ['Victim', 'Innocent'],
                extraInfo: 'Perpetrator is a Noun. It refers to a person who carries out a harmful, illegal, or immoral act.',
                extraInfoHi: 'Perpetrator (अपराधी/दोषी) एक संज्ञा है। यह एक ऐसे व्यक्ति को संदर्भित करता है जो हानिकारक, अवैध या अनैतिक कार्य करता है।'
            },
            'obtain/get': {
                actualWord: 'Procure',
                pos: 'Verb',
                sentence: 'Jhanvi managed to successfully <strong>procure</strong> two extremely rare tickets for the highly anticipated weekend music concert.',
                sentenceHi: 'झांवी बहुप्रतीक्षित सप्ताहांत संगीत कार्यक्रम के लिए दो अत्यंत दुर्लभ टिकट सफलतापूर्वक <strong>प्राप्त करने</strong> में कामयाब रहीं।',
                synonyms: ['Obtain', 'Acquire'],
                antonyms: ['Lose', 'Forfeit'],
                extraInfo: 'Procure is a Verb. It means to obtain something, especially with care, effort, or legal means.',
                extraInfoHi: 'Procure (प्राप्त करना/हासिल करना) एक क्रिया है। इसका अर्थ है कुछ प्राप्त करना, विशेष रूप से सावधानी, प्रयास या कानूनी साधनों से।'
            },
            'main idea or indicate direction': {
                actualWord: 'Point',
                pos: 'Noun/Verb',
                sentence: 'Samriddhi Chaurasiya used a long wooden stick to directly <strong>point</strong> at the most important location on the large geographical map.',
                sentenceHi: 'समृद्धि चौरसिया ने बड़े भौगोलिक मानचित्र पर सबसे महत्वपूर्ण स्थान की ओर सीधे <strong>इशारा करने</strong> के लिए एक लंबी लकड़ी की छड़ी का उपयोग किया।',
                synonyms: ['Core issue', 'Indicate'],
                antonyms: [],
                extraInfo: 'Point can be a Noun or a Verb. It refers to the core idea of a discussion, a dot, or the action of directing someone\'s attention by extending a finger.',
                extraInfoHi: 'Point (बिंदु/मुद्दा या इशारा करना) एक संज्ञा या क्रिया हो सकता है। यह किसी चर्चा के मूल विचार, एक बिंदु, या उंगली बढ़ाकर किसी का ध्यान आकर्षित करने की क्रिया को संदर्भित करता है।'
            },
            'illegal scheme/fraud': {
                actualWord: 'Racket',
                pos: 'Noun',
                sentence: 'The brave local journalist exposed a massive financial <strong>racket</strong> operating secretly within the city, Arpit Pal read in the morning paper.',
                sentenceHi: 'बहादुर स्थानीय पत्रकार ने शहर के अंदर गुप्त रूप से संचालित एक बड़े वित्तीय <strong>रैकेट</strong> का पर्दाफाश किया, अर्पित पाल ने सुबह के अखबार में पढ़ा।',
                synonyms: ['Fraud', 'Scheme'],
                antonyms: ['Legal business'],
                extraInfo: 'Racket is a Noun. While it means a bat used in sports, in this context, it refers to an illegal or dishonest scheme for obtaining money.',
                extraInfoHi: 'Racket (ठग विद्या/धोखाधड़ी) एक संज्ञा है। जबकि इसका अर्थ खेलों में इस्तेमाल होने वाला बैट भी है, इस संदर्भ में यह पैसे प्राप्त करने के लिए एक अवैध या बेईमान योजना को संदर्भित करता है।'
            },
            'surprise attack/police search': {
                actualWord: 'Raid',
                pos: 'Noun/Verb',
                sentence: 'The city police conducted a sudden, early morning <strong>raid</strong> to safely catch the dangerous criminals hiding in the abandoned warehouse, Kavya watched on the news.',
                sentenceHi: 'शहर की पुलिस ने परित्यक्त गोदाम में छिपे खतरनाक अपराधियों को सुरक्षित रूप से पकड़ने के लिए सुबह-सुबह अचानक <strong>छापा</strong> मारा, काव्या ने खबर में देखा।',
                synonyms: ['Search', 'Incursion'],
                antonyms: ['Retreat', 'Leave alone'],
                extraInfo: 'Raid can be a Noun or a Verb. It is a rapid surprise attack or a sudden search conducted by police to find criminals or illegal goods.',
                extraInfoHi: 'Raid (छापा/अचानक हमला) एक संज्ञा या क्रिया हो सकता है। यह एक तेज़ आश्चर्यजनक हमला या अपराधियों या अवैध सामान खोजने के लिए पुलिस द्वारा की गई अचानक तलाशी है।'
            },
            // ========== GATHRI 31: Society & Law ==========
            'many/more than two': {
                actualWord: 'Several',
                pos: 'Adjective/Pronoun',
                sentence: 'Rahul checked his bag and realized he had brought <strong>several</strong> pens to the examination hall.',
                sentenceHi: 'राहुल ने अपना बैग चेक किया और उसे एहसास हुआ कि वह परीक्षा हॉल में <strong>कई</strong> पेन ले आया था।',
                synonyms: ['Various', 'Multiple'],
                antonyms: ['None', 'One'],
                extraInfo: 'Several is an Adjective or Pronoun. It means more than two but not very many.',
                extraInfoHi: 'Several (अनेक/कई सारे) एक विशेषण या सर्वनाम है। इसका अर्थ है दो से अधिक लेकिन बहुत अधिक नहीं।'
            },
            'staff/employees': {
                actualWord: 'Personnel',
                pos: 'Noun',
                sentence: 'The hospital requires all medical <strong>personnel</strong> to wash their hands before entering the operation theater, noted Dr. Sharma.',
                sentenceHi: 'अस्पताल में सभी चिकित्सा <strong>कर्मचारियों</strong> को ऑपरेशन थिएटर में प्रवेश करने से पहले हाथ धोने की आवश्यकता है, डॉ. शर्मा ने कहा।',
                synonyms: ['Staff', 'Employees', 'Workforce'],
                antonyms: ['Management', 'Customers'],
                extraInfo: 'Personnel is a Noun. It refers to the people employed in an organization or engaged in an organized undertaking, such as military service.',
                extraInfoHi: 'Personnel (स्टाफ/कर्मचारी) एक संज्ञा है। यह किसी संगठन में कार्यरत लोगों या किसी संगठित कार्य जैसे सैन्य सेवा में लगे लोगों को संदर्भित करता है।'
            },
            'in the middle of/during': {
                actualWord: 'Amid',
                pos: 'Preposition',
                sentence: '<strong>Amid</strong> the loud cheers of the crowd, Virat confidently walked onto the cricket pitch.',
                sentenceHi: 'भीड़ की तेज जयकार के <strong>बीच</strong>, विराट आत्मविश्वास से क्रिकेट पिच पर चल पड़े।',
                synonyms: ['Among', 'During'],
                antonyms: ['Outside', 'Away from'],
                extraInfo: 'Amid is a Preposition. It means surrounded by or in the middle of something (often a noisy or confusing situation).',
                extraInfoHi: 'Amid (के बीच/दौरान) एक पूर्वसर्ग है। इसका अर्थ है किसी चीज़ से घिरे हुए या किसी चीज़ के बीच में (अक्सर शोरगुल या भ्रमित करने वाली स्थिति)।'
            },
            'excavation site': {
                actualWord: 'Mine',
                pos: 'Noun',
                sentence: 'The brave workers wore hard hats and carried bright flashlights as they went deep into the dark coal <strong>mine</strong>.',
                sentenceHi: 'बहादुर मज़दूरों ने हेलमेट पहने और उज्ज्वल टॉर्च लिए जब वे अंधेरी कोयले की <strong>खदान</strong> में गहरे उतरे।',
                synonyms: ['Pit', 'Excavation'],
                antonyms: [],
                extraInfo: 'Mine is a Noun. It is a deep hole or excavation in the earth for extracting coal or other valuable minerals. (Note: It is also a pronoun meaning "belonging to me").',
                extraInfoHi: 'Mine (खान/खदान) एक संज्ञा है। यह कोयले या अन्य बहुमूल्य खनिजों को निकालने के लिए पृथ्वी में एक गहरा गड्ढा या खुदाई है। (नोट: यह एक सर्वनाम भी है जिसका अर्थ है "मेरा")।'
            },
            'obstinate/rigid': {
                actualWord: 'Stubborn',
                pos: 'Adjective',
                sentence: 'The <strong>stubborn</strong> little boy refused to eat his healthy vegetables, no matter what his mother said.',
                sentenceHi: '<strong>जिद्दी</strong> छोटे लड़के ने अपनी स्वस्थ सब्जियां खाने से इनकार कर दिया, चाहे उसकी माँ ने कुछ भी कहा।',
                synonyms: ['Obstinate', 'Rigid'],
                antonyms: ['Compliant', 'Flexible'],
                extraInfo: 'Stubborn is an Adjective. It describes a person who has a strong determination not to change their attitude or position on something.',
                extraInfoHi: 'Stubborn (जिद्दी/अड़ियल) एक विशेषण है। यह ऐसे व्यक्ति का वर्णन करता है जो किसी चीज़ पर अपना रवैया या स्थिति बदलने के लिए दृढ़ संकल्प रखता है।'
            },
            'trader/businessman': {
                actualWord: 'Merchant',
                pos: 'Noun',
                sentence: 'The wealthy spice <strong>merchant</strong> traveled across the ocean in a large ship to sell his valuable goods in India.',
                sentenceHi: 'धनी मसाला <strong>व्यापारी</strong> ने भारत में अपना कीमती माल बेचने के लिए एक बड़े जहाज में समुद्र पार किया।',
                synonyms: ['Trader', 'Dealer'],
                antonyms: ['Buyer', 'Consumer'],
                extraInfo: 'Merchant is a Noun. It refers to a person or company involved in wholesale trade, especially dealing with foreign countries or supplying goods.',
                extraInfoHi: 'Merchant (व्यापारी/सौदागर) एक संज्ञा है। यह थोक व्यापार में शामिल किसी व्यक्ति या कंपनी को संदर्भित करता है, विशेष रूप से विदेशों के साथ व्यापार या माल की आपूर्ति।'
            },
            'illegal payment': {
                actualWord: 'Bribe',
                pos: 'Noun/Verb',
                sentence: 'The corrupt official was immediately arrested by the police when he was caught accepting a huge cash <strong>bribe</strong>.',
                sentenceHi: 'भ्रष्ट अधिकारी को पुलिस ने तुरंत गिरफ्तार कर लिया जब वह एक बड़ी नकद <strong>रिश्वत</strong> लेते हुए पकड़ा गया।',
                synonyms: ['Payoff', 'Kickback'],
                antonyms: ['Fine', 'Penalty'],
                extraInfo: 'Bribe is a Noun or Verb. It is money or a gift offered illegally to persuade someone to do something for you.',
                extraInfoHi: 'Bribe (घूस/रिश्वत) एक संज्ञा या क्रिया है। यह किसी को अपने लिए कुछ करने के लिए अवैध रूप से दिया गया पैसा या उपहार है।'
            },
            'cleaner': {
                actualWord: 'Sweeper',
                pos: 'Noun',
                sentence: 'The hardworking <strong>sweeper</strong> arrived early in the morning to make sure the school corridors were perfectly clean before the students arrived.',
                sentenceHi: 'मेहनती <strong>सफाईकर्मी</strong> सुबह जल्दी आ गया ताकि छात्रों के आने से पहले स्कूल के गलियारे पूरी तरह साफ हो जाएं।',
                synonyms: ['Cleaner', 'Janitor'],
                antonyms: [],
                extraInfo: 'Sweeper is a Noun. It refers to a person whose job is cleaning floors or streets using a broom.',
                extraInfoHi: 'Sweeper (झाड़ू-पोछा करने वाला) एक संज्ञा है। यह उस व्यक्ति को संदर्भित करता है जिसका काम झाड़ू से फर्श या सड़कों की सफाई करना है।'
            },
            'hiring new people': {
                actualWord: 'Recruitment',
                pos: 'Noun',
                sentence: 'The software company started its annual <strong>recruitment</strong> drive to hire fifty talented new engineers this year, Priya announced.',
                sentenceHi: 'सॉफ्टवेयर कंपनी ने इस साल पचास प्रतिभाशाली नए इंजीनियरों को काम पर रखने के लिए अपना वार्षिक <strong>भर्ती</strong> अभियान शुरू किया, प्रिया ने घोषणा की।',
                synonyms: ['Hiring', 'Enrollment'],
                antonyms: ['Dismissal', 'Firing'],
                extraInfo: 'Recruitment is a Noun. It is the overall process of finding, selecting, and hiring new employees for an organization.',
                extraInfoHi: 'Recruitment (नौकरी पर रखना/भर्ती) एक संज्ञा है। यह किसी संगठन के लिए नए कर्मचारियों को खोजने, चुनने और काम पर रखने की समग्र प्रक्रिया है।'
            },
            'caught during a crime': {
                actualWord: 'Red-handed',
                pos: 'Adjective/Adverb',
                sentence: 'Amit caught his little brother completely <strong>red-handed</strong> trying to secretly steal cookies from the jar at midnight.',
                sentenceHi: 'अमित ने अपने छोटे भाई को आधी रात को जार से चुपके से कुकीज़ चुराने की कोशिश करते हुए पूरी तरह <strong>रंगे हाथों</strong> पकड़ लिया।',
                synonyms: ['In the act', 'Guilty'],
                antonyms: ['Innocent'],
                extraInfo: 'Red-handed is an Adjective or Adverb. It means discovering a person in the exact act of doing something wrong or illegal.',
                extraInfoHi: 'Red-handed (रंगे हाथों पकड़े जाना) एक विशेषण या क्रिया विशेषण है। इसका अर्थ है किसी व्यक्ति को कुछ गलत या अवैध काम करते हुए ठीक उसी समय पकड़ना।'
            },
            'partial payment': {
                actualWord: 'Installment',
                pos: 'Noun',
                sentence: 'Neha finally paid the last <strong>installment</strong> on her car loan and was very happy to be completely debt-free.',
                sentenceHi: 'नेहा ने आखिरकार अपने कार लोन की आखिरी <strong>किस्त</strong> चुका दी और पूरी तरह से कर्ज मुक्त होकर बहुत खुश हुई।',
                synonyms: ['Payment', 'Portion'],
                antonyms: ['Lump sum'],
                extraInfo: 'Installment is a Noun. It is a sum of money due as one of several equal payments for something, spread over an agreed period of time.',
                extraInfoHi: 'Installment (किस्त) एक संज्ञा है। यह किसी चीज़ के लिए कई बराबर भुगतानों में से एक के रूप में देय धनराशि है, जो एक सहमत अवधि में फैली होती है।'
            },
            'stop oneself/avoid': {
                actualWord: 'Refrain',
                pos: 'Verb',
                sentence: 'The strict doctor told Sanjay to absolutely <strong>refrain</strong> from eating any sugary foods to protect his teeth.',
                sentenceHi: 'सख्त डॉक्टर ने संजय को अपने दांतों की सुरक्षा के लिए किसी भी मीठे खाने से बिल्कुल <strong>परहेज करने</strong> को कहा।',
                synonyms: ['Abstain', 'Avoid'],
                antonyms: ['Indulge', 'Continue'],
                extraInfo: 'Refrain is a Verb. It means to stop oneself from doing something, usually a habit or action.',
                extraInfoHi: 'Refrain (रोकना/परहेज करना) एक क्रिया है। इसका अर्थ है किसी काम को करने से खुद को रोकना, आमतौर पर कोई आदत या कार्य।'
            },
            'escaped person': {
                actualWord: 'Fugitive',
                pos: 'Noun',
                sentence: 'The police checkpoints were set up on every major highway to catch the dangerous <strong>fugitive</strong> who escaped from prison.',
                sentenceHi: 'जेल से भागे खतरनाक <strong>भगोड़े</strong> को पकड़ने के लिए हर प्रमुख राजमार्ग पर पुलिस चौकियां लगाई गईं।',
                synonyms: ['Escapee', 'Runaway'],
                antonyms: ['Captive', 'Prisoner'],
                extraInfo: 'Fugitive is a Noun. It refers to a person who has escaped from captivity or is hiding from the police and law enforcement.',
                extraInfoHi: 'Fugitive (भगोड़ा) एक संज्ञा है। यह ऐसे व्यक्ति को संदर्भित करता है जो कैद से भाग गया हो या पुलिस और कानून प्रवर्तन से छिपा हो।'
            },
            'weather conditions': {
                actualWord: 'Climate',
                pos: 'Noun',
                sentence: 'The warm, tropical <strong>climate</strong> of southern India is absolutely perfect for growing healthy coconut trees, Meera learned.',
                sentenceHi: 'दक्षिण भारत की गर्म, उष्णकटिबंधीय <strong>जलवायु</strong> स्वस्थ नारियल के पेड़ उगाने के लिए बिल्कुल उपयुक्त है, मीरा ने सीखा।',
                synonyms: ['Weather pattern', 'Atmosphere'],
                antonyms: [],
                extraInfo: 'Climate is a Noun. It is the general weather conditions prevailing in an area over a long period.',
                extraInfoHi: 'Climate (जलवायु) एक संज्ञा है। यह किसी क्षेत्र में लंबी अवधि में प्रचलित सामान्य मौसम की स्थिति है।'
            },
            'tomb or serious': {
                actualWord: 'Grave',
                pos: 'Noun/Adjective',
                sentence: 'The doctor informed Arjun that his grandfather\'s illness was a very <strong>grave</strong> matter requiring immediate surgery.',
                sentenceHi: 'डॉक्टर ने अर्जुन को बताया कि उसके दादाजी की बीमारी एक बहुत <strong>गंभीर</strong> मामला है जिसमें तुरंत सर्जरी की आवश्यकता है।',
                synonyms: ['Tomb', 'Serious', 'Critical'],
                antonyms: ['Trivial', 'Mild'],
                extraInfo: 'Grave can be a Noun or an Adjective. As a Noun: A hole dug in the ground to bury a dead body. As an Adjective: Giving cause for alarm; very serious.',
                extraInfoHi: 'Grave (कब्र या गंभीर) एक संज्ञा या विशेषण हो सकता है। संज्ञा के रूप में: मृत शरीर को दफनाने के लिए ज़मीन में खोदा गया गड्ढा। विशेषण के रूप में: चिंता का कारण देने वाला; बहुत गंभीर।'
            },
            // ========== GATHRI 32: Nature & Society ==========
            'never done or known before': {
                actualWord: 'Unprecedented',
                pos: 'Adjective',
                sentence: 'Rohan witnessed an <strong>unprecedented</strong> level of support from his community during the local festival.',
                sentenceHi: 'रोहन ने स्थानीय त्योहार के दौरान अपने समुदाय से <strong>अभूतपूर्व</strong> स्तर का समर्थन देखा।',
                synonyms: ['Unparalleled', 'Extraordinary'],
                antonyms: ['Normal', 'Common'],
                extraInfo: 'Unprecedented is an Adjective. It describes an event or situation that has never happened or existed in the past.',
                extraInfoHi: 'Unprecedented (अभूतपूर्व/जो पहले कभी न हुआ हो) एक विशेषण है। यह किसी ऐसी घटना या स्थिति का वर्णन करता है जो अतीत में कभी नहीं हुई।'
            },
            'sudden heavy rainfall': {
                actualWord: 'Cloudburst',
                pos: 'Noun',
                sentence: 'The sudden <strong>cloudburst</strong> caused massive flooding in the small mountain village, Priya read in the newspaper.',
                sentenceHi: 'अचानक <strong>बादल फटने</strong> से छोटे पहाड़ी गांव में भारी बाढ़ आ गई, प्रिया ने अखबार में पढ़ा।',
                synonyms: ['Downpour', 'Deluge'],
                antonyms: ['Drought', 'Dry spell'],
                extraInfo: 'Cloudburst is a Noun. It is a sudden, very heavy rainfall, usually local in nature and brief in duration.',
                extraInfoHi: 'Cloudburst (बादल फटना) एक संज्ञा है। यह अचानक होने वाली बहुत भारी वर्षा है, जो आमतौर पर स्थानीय प्रकृति की और कम अवधि की होती है।'
            },
            'river of ice': {
                actualWord: 'Glacier',
                pos: 'Noun',
                sentence: 'Amit was fascinated to see the massive, slow-moving <strong>glacier</strong> during his adventurous trip to the Himalayas.',
                sentenceHi: 'अमित हिमालय की अपनी साहसिक यात्रा के दौरान विशाल, धीमी गति से चलने वाले <strong>हिमनद</strong> को देखकर मंत्रमुग्ध हो गया।',
                synonyms: ['Icecap', 'Ice field'],
                antonyms: [],
                extraInfo: 'Glacier is a Noun. It is a slowly moving mass or river of ice formed by the accumulation and compaction of snow on mountains.',
                extraInfoHi: 'Glacier (हिमनद/बर्फ की नदी) एक संज्ञा है। यह पहाड़ों पर बर्फ के संचय और संघनन से बनी बर्फ की धीमी गति से चलने वाली विशाल नदी है।'
            },
            'eat grass': {
                actualWord: 'Graze',
                pos: 'Verb',
                sentence: 'Sunita sat under a tree and watched the sheep peacefully <strong>graze</strong> in the green meadow all afternoon.',
                sentenceHi: 'सुनीता एक पेड़ के नीचे बैठी और पूरी दोपहर हरे मैदान में शांति से <strong>चरती</strong> भेड़ों को देखती रही।',
                synonyms: ['Feed', 'Pasture'],
                antonyms: ['Starve'],
                extraInfo: 'Graze is a Verb. It means to eat grass in a field (usually done by cattle, sheep, etc.).',
                extraInfoHi: 'Graze (चरना) एक क्रिया है। इसका अर्थ है खेत में घास खाना (आमतौर पर मवेशियों, भेड़ों आदि द्वारा)।'
            },
            'aggressive/using physical force': {
                actualWord: 'Violent',
                pos: 'Adjective',
                sentence: 'Kabir strictly advised his younger brother to stop playing such <strong>violent</strong> video games.',
                sentenceHi: 'कबीर ने अपने छोटे भाई को ऐसे <strong>हिंसक</strong> वीडियो गेम खेलना बंद करने की सख्त सलाह दी।',
                synonyms: ['Brutal', 'Aggressive'],
                antonyms: ['Peaceful', 'Gentle'],
                extraInfo: 'Violent is an Adjective. It describes using or involving physical force intended to hurt, damage, or kill someone or something.',
                extraInfoHi: 'Violent (हिंसक) एक विशेषण है। यह किसी को चोट पहुंचाने, नुकसान पहुंचाने या मारने के उद्देश्य से शारीरिक बल के उपयोग का वर्णन करता है।'
            },
            'violent or destructive behavior': {
                actualWord: 'Rampage',
                pos: 'Noun/Verb',
                sentence: 'Anjali saw a terrifying news report about a wild elephant going on a <strong>rampage</strong> through the local farms.',
                sentenceHi: 'अंजलि ने एक भयानक समाचार रिपोर्ट देखी कि एक जंगली हाथी स्थानीय खेतों में <strong>उत्पात</strong> मचा रहा था।',
                synonyms: ['Riot', 'Uproar'],
                antonyms: ['Calmness', 'Peace'],
                extraInfo: 'Rampage is a Noun or Verb. It refers to a period of violent and uncontrollable behavior, typically involving destruction.',
                extraInfoHi: 'Rampage (हंगामा/उत्पात) एक संज्ञा या क्रिया है। यह हिंसक और अनियंत्रित व्यवहार की अवधि को संदर्भित करता है, जिसमें आमतौर पर विनाश शामिल होता है।'
            },
            'observation/directing': {
                actualWord: 'Supervision',
                pos: 'Noun',
                sentence: 'The students conducted the dangerous chemistry experiment only under the strict <strong>supervision</strong> of their teacher, Vikram.',
                sentenceHi: 'छात्रों ने अपने शिक्षक विक्रम की सख्त <strong>निगरानी</strong> में ही खतरनाक रसायन विज्ञान का प्रयोग किया।',
                synonyms: ['Oversight', 'Management'],
                antonyms: ['Neglect', 'Inattention'],
                extraInfo: 'Supervision is a Noun. It is the action of overseeing, observing, or directing someone or a project to ensure it is done correctly.',
                extraInfoHi: 'Supervision (देखरेख/निगरानी) एक संज्ञा है। यह किसी व्यक्ति या परियोजना की देखरेख, अवलोकन या निर्देशन का कार्य है ताकि यह सुनिश्चित किया जा सके कि यह सही ढंग से किया गया है।'
            },
            'step in/get involved': {
                actualWord: 'Intervene',
                pos: 'Verb',
                sentence: 'Sneha had to <strong>intervene</strong> quickly to stop the heated argument between her two best friends.',
                sentenceHi: 'स्नेहा को अपनी दो सबसे अच्छी सहेलियों के बीच गरमागरम बहस को रोकने के लिए जल्दी से <strong>हस्तक्षेप</strong> करना पड़ा।',
                synonyms: ['Mediate', 'Interfere'],
                antonyms: ['Ignore', 'Stand by'],
                extraInfo: 'Intervene is a Verb. It means to come between people or things, especially to prevent an argument or alter a situation.',
                extraInfoHi: 'Intervene (हस्तक्षेप करना/बीच-बचाव करना) एक क्रिया है। इसका अर्थ है लोगों या चीजों के बीच आना, विशेष रूप से किसी बहस को रोकने या स्थिति को बदलने के लिए।'
            },
            'done on purpose/deliberate': {
                actualWord: 'Intentional',
                pos: 'Adjective',
                sentence: 'Rahul apologized to his mother, explaining that breaking the beautiful glass vase was not an <strong>intentional</strong> act.',
                sentenceHi: 'राहुल ने अपनी माँ से माफी मांगते हुए बताया कि सुंदर कांच के फूलदान को तोड़ना <strong>जानबूझकर</strong> किया गया कार्य नहीं था।',
                synonyms: ['Deliberate', 'Calculated'],
                antonyms: ['Accidental', 'Unintentional'],
                extraInfo: 'Intentional is an Adjective. It describes something that is done on purpose or deliberately.',
                extraInfoHi: 'Intentional (जान-बूझकर/इरादतन) एक विशेषण है। यह किसी ऐसी चीज़ का वर्णन करता है जो जानबूझकर या जानबूझकर की गई हो।'
            },
            'feel deep sorrow': {
                actualWord: 'Mourn',
                pos: 'Verb',
                sentence: 'Meera and her entire family gathered together to <strong>mourn</strong> the heartbreaking loss of their beloved grandmother.',
                sentenceHi: 'मीरा और उसका पूरा परिवार अपनी प्यारी दादी के दर्दनाक निधन पर <strong>शोक</strong> मनाने के लिए एक साथ इकट्ठा हुआ।',
                synonyms: ['Grieve', 'Lament'],
                antonyms: ['Rejoice', 'Celebrate'],
                extraInfo: 'Mourn is a Verb. It means to feel or show deep sorrow or regret, especially for the death of someone.',
                extraInfoHi: 'Mourn (विलाप/शोक करना) एक क्रिया है। इसका अर्थ है गहरा दुःख या पछतावा महसूस करना या दिखाना, विशेष रूप से किसी की मृत्यु पर।'
            },
            'young child': {
                actualWord: 'Toddler',
                pos: 'Noun',
                sentence: 'Arjun gently held the hand of the <strong>toddler</strong> as the little boy learned to take his first few steps in the park.',
                sentenceHi: 'अर्जुन ने <strong>नन्हे बच्चे</strong> का हाथ धीरे से पकड़ा जब छोटा लड़का पार्क में अपने पहले कदम चलना सीख रहा था।',
                synonyms: ['Young child', 'Tot'],
                antonyms: ['Adult', 'Teenager'],
                extraInfo: 'Toddler is a Noun. It refers to a very young child, usually one who is just learning to walk.',
                extraInfoHi: 'Toddler (बहुत छोटा बच्चा) एक संज्ञा है। यह एक बहुत छोटे बच्चे को संदर्भित करता है, आमतौर पर वह जो अभी चलना सीख रहा हो।'
            },
            'baby/newborn': {
                actualWord: 'Infant',
                pos: 'Noun',
                sentence: 'Neha quietly sang a soft lullaby to help the sleepy <strong>infant</strong> fall asleep comfortably in the wooden cradle.',
                sentenceHi: 'नेहा ने नींद से भरे <strong>शिशु</strong> को लकड़ी के पालने में आराम से सुलाने के लिए धीरे से एक मधुर लोरी गाई।',
                synonyms: ['Baby', 'Newborn'],
                antonyms: ['Adult', 'Grown-up'],
                extraInfo: 'Infant is a Noun. It is a very young child or newborn baby who cannot walk or talk yet.',
                extraInfoHi: 'Infant (शिशु/नवजात) एक संज्ञा है। यह एक बहुत छोटा बच्चा या नवजात शिशु है जो अभी तक चल या बोल नहीं सकता।'
            },
            'area of land/region': {
                actualWord: 'Territory',
                pos: 'Noun',
                sentence: 'The fierce tiger aggressively protected its jungle <strong>territory</strong> from other wild animals, Sanjay noted in his wildlife journal.',
                sentenceHi: 'भयंकर बाघ ने आक्रामक रूप से अपने जंगल के <strong>इलाके</strong> को अन्य जंगली जानवरों से बचाया, संजय ने अपनी वन्यजीव पत्रिका में नोट किया।',
                synonyms: ['Region', 'Domain'],
                antonyms: [],
                extraInfo: 'Territory is a Noun. It is an area of land under the jurisdiction of a ruler or state, or an area defended by an animal.',
                extraInfoHi: 'Territory (इलाका/क्षेत्र) एक संज्ञा है। यह किसी शासक या राज्य के अधिकार क्षेत्र में आने वाला भूमि का क्षेत्र है, या किसी जानवर द्वारा संरक्षित क्षेत्र है।'
            },
            'overturn in water': {
                actualWord: 'Capsize',
                pos: 'Verb',
                sentence: 'The unexpectedly heavy storm caused the small wooden fishing boat to <strong>capsize</strong> in the middle of the deep lake, Pooja explained.',
                sentenceHi: 'अप्रत्याशित रूप से भारी तूफान के कारण गहरी झील के बीच में छोटी लकड़ी की मछली पकड़ने वाली नाव <strong>पलट</strong> गई, पूजा ने बताया।',
                synonyms: ['Overturn', 'Tip over'],
                antonyms: ['Right', 'Stabilize'],
                extraInfo: 'Capsize is a Verb. It specifically means for a boat or ship to overturn in the water.',
                extraInfoHi: 'Capsize (पलटना/उलटना) एक क्रिया है। इसका विशेष अर्थ है नाव या जहाज का पानी में पलट जाना।'
            },
            'final place/goal': {
                actualWord: 'Destination',
                pos: 'Noun',
                sentence: 'After a long and tiring train journey, Aditya finally reached his beautiful holiday <strong>destination</strong> in the mountains.',
                sentenceHi: 'लंबी और थकाऊ ट्रेन यात्रा के बाद, आदित्य आखिरकार पहाड़ों में अपनी खूबसूरत छुट्टी की <strong>मंजिल</strong> पर पहुंच गया।',
                synonyms: ['Goal', 'Journey\'s end'],
                antonyms: ['Starting point', 'Origin'],
                extraInfo: 'Destination is a Noun. It is the place to which someone or something is going or being sent.',
                extraInfoHi: 'Destination (मंजिल/गंतव्य) एक संज्ञा है। यह वह स्थान है जहां कोई व्यक्ति या कोई चीज जा रही है या भेजी जा रही है।'
            },
            // ========== GATHRI 33: Life & Expression ==========
            'cleanliness/hygiene': {
                actualWord: 'Sanitation',
                pos: 'Noun',
                sentence: 'Rohan realized that maintaining proper <strong>sanitation</strong> in the village would prevent many waterborne diseases.',
                sentenceHi: 'रोहन को एहसास हुआ कि गांव में उचित <strong>स्वच्छता</strong> बनाए रखने से कई जलजनित बीमारियों को रोका जा सकता है।',
                synonyms: ['Hygiene', 'Cleanliness'],
                antonyms: ['Dirtiness', 'Pollution'],
                extraInfo: 'Sanitation is a Noun. It refers to the conditions relating to public health, especially the provision of clean drinking water and adequate sewage disposal.',
                extraInfoHi: 'Sanitation (स्वच्छता/सफाई) एक संज्ञा है। यह सार्वजनिक स्वास्थ्य से संबंधित स्थितियों को संदर्भित करता है, विशेष रूप से स्वच्छ पेयजल और पर्याप्त सीवेज निपटान का प्रावधान।'
            },
            'afterwards/later': {
                actualWord: 'Subsequently',
                pos: 'Adverb',
                sentence: 'The cricket team lost their first match but <strong>subsequently</strong> won all the remaining games in the tournament, Aisha cheered.',
                sentenceHi: 'क्रिकेट टीम ने अपना पहला मैच हारा लेकिन <strong>तत्पश्चात</strong> टूर्नामेंट के सभी शेष मैच जीत लिए, आयशा ने खुशी मनाई।',
                synonyms: ['Afterwards', 'Later'],
                antonyms: ['Previously', 'Before'],
                extraInfo: 'Subsequently is an Adverb. It means after a particular thing has happened; afterwards.',
                extraInfoHi: 'Subsequently (तत्पश्चात/बाद में) एक क्रिया विशेषण है। इसका अर्थ है किसी विशेष घटना के बाद; बाद में।'
            },
            'but/nevertheless': {
                actualWord: 'However',
                pos: 'Adverb',
                sentence: 'The mathematics exam was extremely difficult; <strong>however</strong>, Manish managed to score the highest marks in his class.',
                sentenceHi: 'गणित की परीक्षा बेहद कठिन थी; <strong>हालांकि</strong>, मनीष ने अपनी कक्षा में सबसे अधिक अंक हासिल किए।',
                synonyms: ['Nevertheless', 'But'],
                antonyms: ['Consequently', 'Therefore'],
                extraInfo: 'However is an Adverb. It is used to introduce a statement that contrasts with or seems to contradict something that has been said previously.',
                extraInfoHi: 'However (हालांकि/फिर भी) एक क्रिया विशेषण है। इसका उपयोग किसी ऐसे कथन को प्रस्तुत करने के लिए किया जाता है जो पहले कही गई बात से विपरीत या विरोधाभासी लगता है।'
            },
            'builder/agreement holder': {
                actualWord: 'Contractor',
                pos: 'Noun',
                sentence: 'The government hired a reliable private <strong>contractor</strong> to quickly repair the damaged highway before the monsoon season started.',
                sentenceHi: 'सरकार ने मानसून शुरू होने से पहले क्षतिग्रस्त राजमार्ग की शीघ्र मरम्मत के लिए एक विश्वसनीय निजी <strong>ठेकेदार</strong> को काम पर रखा।',
                synonyms: ['Builder', 'Supplier'],
                antonyms: [],
                extraInfo: 'Contractor is a Noun. It refers to a person or company that undertakes a contract to provide materials or labor to perform a service or do a job.',
                extraInfoHi: 'Contractor (ठेकेदार) एक संज्ञा है। यह ऐसे व्यक्ति या कंपनी को संदर्भित करता है जो सामग्री या श्रम प्रदान करने के लिए अनुबंध करती है।'
            },
            'increase/rise': {
                actualWord: 'Hike',
                pos: 'Noun/Verb',
                sentence: 'Due to the sudden <strong>hike</strong> in petrol prices, Geeta decided to start using public transport for her daily office commute.',
                sentenceHi: 'पेट्रोल की कीमतों में अचानक <strong>बढ़ोतरी</strong> के कारण, गीता ने अपनी दैनिक कार्यालय यात्रा के लिए सार्वजनिक परिवहन का उपयोग शुरू करने का फैसला किया।',
                synonyms: ['Increase', 'Rise'],
                antonyms: ['Decrease', 'Drop'],
                extraInfo: 'Hike is a Noun or Verb. In this context, it means a sharp increase, especially in price, salary, or taxes. (It can also mean a long walk).',
                extraInfoHi: 'Hike (बढ़ोतरी) एक संज्ञा या क्रिया है। इस संदर्भ में, इसका अर्थ है तीव्र वृद्धि, विशेष रूप से कीमत, वेतन या करों में। (इसका अर्थ लंबी पैदल यात्रा भी हो सकता है)।'
            },
            'protest/display': {
                actualWord: 'Demonstration',
                pos: 'Noun',
                sentence: 'Thousands of local farmers gathered in the city center for a peaceful <strong>demonstration</strong> regarding the new agricultural laws.',
                sentenceHi: 'हजारों स्थानीय किसान नए कृषि कानूनों के संबंध में शांतिपूर्ण <strong>प्रदर्शन</strong> के लिए शहर के केंद्र में इकट्ठा हुए।',
                synonyms: ['Protest', 'Exhibition'],
                antonyms: ['Concealment', 'Hiding'],
                extraInfo: 'Demonstration is a Noun. It is a public meeting or march protesting against something or expressing views on an issue.',
                extraInfoHi: 'Demonstration (विरोध प्रदर्शन) एक संज्ञा है। यह किसी चीज़ के खिलाफ विरोध करने या किसी मुद्दे पर विचार व्यक्त करने वाली सार्वजनिक बैठक या मार्च है।'
            },
            'throw things at': {
                actualWord: 'Pelt',
                pos: 'Verb',
                sentence: 'The angry mob started to <strong>pelt</strong> heavy stones at the empty buses during the violent riot, frightening the residents.',
                sentenceHi: 'गुस्साई भीड़ ने हिंसक दंगे के दौरान खाली बसों पर भारी <strong>पत्थर फेंकने</strong> शुरू कर दिए, जिससे निवासी भयभीत हो गए।',
                synonyms: ['Throw', 'Bombard'],
                antonyms: ['Catch', 'Hold'],
                extraInfo: 'Pelt is a Verb. It means to attack someone by repeatedly hurling things at them.',
                extraInfoHi: 'Pelt (फेंकना/मारना) एक क्रिया है। इसका अर्थ है बार-बार चीजें फेंककर किसी पर हमला करना।'
            },
            'huge/very big': {
                actualWord: 'Massive',
                pos: 'Adjective',
                sentence: 'After the terrible storm, a <strong>massive</strong> tree fell directly across the main road, completely blocking the morning traffic.',
                sentenceHi: 'भयानक तूफान के बाद, एक <strong>विशाल</strong> पेड़ सीधे मुख्य सड़क पर गिर गया, जिससे सुबह का ट्रैफिक पूरी तरह से रुक गया।',
                synonyms: ['Huge', 'Enormous'],
                antonyms: ['Tiny', 'Minute'],
                extraInfo: 'Massive is an Adjective. It describes something exceptionally large, heavy, and solid.',
                extraInfoHi: 'Massive (विशाल/बहुत बड़ा) एक विशेषण है। यह किसी असाधारण रूप से बड़ी, भारी और ठोस चीज़ का वर्णन करता है।'
            },
            'extreme/burning heat': {
                actualWord: 'Scorching heat',
                pos: 'Noun Phrase',
                sentence: 'Walking barefoot on the sandy beach in the <strong>scorching heat</strong> of the summer afternoon severely burned Tarun\'s feet.',
                sentenceHi: 'गर्मी की दोपहर में <strong>झुलसाने वाली गर्मी</strong> में रेतीले समुद्र तट पर नंगे पैर चलने से तरुण के पैर बुरी तरह जल गए।',
                synonyms: ['Blistering heat', 'Extreme heat'],
                antonyms: ['Freezing cold'],
                extraInfo: 'Scorching heat is a Noun Phrase. It refers to weather that is extremely hot, to the point of burning or parching.',
                extraInfoHi: 'Scorching heat (झुलसाने वाली गर्मी) एक संज्ञा वाक्यांश है। यह ऐसे मौसम को संदर्भित करता है जो बेहद गर्म हो, जलाने या सुखाने की हद तक।'
            },
            'expensive/comfortable': {
                actualWord: 'Luxurious',
                pos: 'Adjective',
                sentence: 'For their tenth wedding anniversary, Mr. and Mrs. Kapoor booked a stay in a highly <strong>luxurious</strong> five-star hotel in Mumbai.',
                sentenceHi: 'अपनी दसवीं शादी की सालगिरह पर, श्री और श्रीमती कपूर ने मुंबई के एक अत्यंत <strong>आलीशान</strong> पांच सितारा होटल में ठहरने की बुकिंग की।',
                synonyms: ['Lavish', 'Opulent'],
                antonyms: ['Poor', 'Cheap'],
                extraInfo: 'Luxurious is an Adjective. It describes something extremely comfortable, elegant, or enjoyable, especially in a way that involves great expense.',
                extraInfoHi: 'Luxurious (शान शौकत/आलीशान) एक विशेषण है। यह किसी अत्यंत आरामदायक, सुरुचिपूर्ण या आनंददायक चीज़ का वर्णन करता है, विशेष रूप से ऐसे तरीके से जिसमें भारी खर्च शामिल हो।'
            },
            'spotless/original condition': {
                actualWord: 'Pristine',
                pos: 'Adjective',
                sentence: 'The hidden mountain valley was famous for its <strong>pristine</strong> rivers and beautifully untouched natural forests.',
                sentenceHi: 'छिपी हुई पहाड़ी घाटी अपनी <strong>प्राचीन</strong> नदियों और खूबसूरत अछूते प्राकृतिक जंगलों के लिए प्रसिद्ध थी।',
                synonyms: ['Spotless', 'Unspoiled'],
                antonyms: ['Dirty', 'Polluted'],
                extraInfo: 'Pristine is an Adjective. It means in its original condition, unspoiled, or completely clean and spotless.',
                extraInfoHi: 'Pristine (सबसे स्वच्छ/प्राचीन) एक विशेषण है। इसका अर्थ है अपनी मूल स्थिति में, अदूषित, या पूरी तरह से स्वच्छ और बेदाग।'
            },
            'truly/in fact': {
                actualWord: 'Indeed',
                pos: 'Adverb',
                sentence: '"It is <strong>indeed</strong> a proud moment for our country to win the gold medal," the sports minister happily declared on television.',
                sentenceHi: '"हमारे देश के लिए स्वर्ण पदक जीतना <strong>वास्तव में</strong> एक गर्व का क्षण है," खेल मंत्री ने खुशी से टेलीविजन पर घोषणा की।',
                synonyms: ['Truly', 'Certainly'],
                antonyms: ['Doubtfully'],
                extraInfo: 'Indeed is an Adverb. It is used to emphasize a statement or response confirming something already suggested.',
                extraInfoHi: 'Indeed (वास्तव में/सचमुच) एक क्रिया विशेषण है। इसका उपयोग पहले से सुझाई गई किसी बात की पुष्टि करने वाले कथन या प्रतिक्रिया पर जोर देने के लिए किया जाता है।'
            },
            'investigate/discover': {
                actualWord: 'Explore',
                pos: 'Verb',
                sentence: 'During his summer vacation, Kabir rented a bicycle to completely <strong>explore</strong> the historic ruins of the ancient city.',
                sentenceHi: 'अपनी गर्मी की छुट्टियों के दौरान, कबीर ने प्राचीन शहर के ऐतिहासिक खंडहरों को पूरी तरह <strong>खोजने</strong> के लिए एक साइकिल किराए पर ली।',
                synonyms: ['Investigate', 'Discover'],
                antonyms: ['Ignore', 'Overlook'],
                extraInfo: 'Explore is a Verb. It means to travel through an unfamiliar area in order to learn about it, or to inquire into or discuss a subject in detail.',
                extraInfoHi: 'Explore (पता लगाना/खोजना) एक क्रिया है। इसका अर्थ है किसी अपरिचित क्षेत्र में यात्रा करना ताकि उसके बारे में जान सकें, या किसी विषय पर विस्तार से पूछताछ या चर्चा करना।'
            },
            'magnificent/excellent': {
                actualWord: 'Splendid',
                pos: 'Adjective',
                sentence: 'The royal palace looked absolutely <strong>splendid</strong> when it was fully decorated with thousands of colorful lights for the Diwali festival.',
                sentenceHi: 'शाही महल बिल्कुल <strong>शानदार</strong> लग रहा था जब इसे दिवाली उत्सव के लिए हजारों रंगीन रोशनियों से पूरी तरह सजाया गया था।',
                synonyms: ['Magnificent', 'Excellent'],
                antonyms: ['Terrible', 'Awful'],
                extraInfo: 'Splendid is an Adjective. It describes something magnificent, very impressive, or excellent.',
                extraInfoHi: 'Splendid (शानदार/भव्य) एक विशेषण है। यह किसी भव्य, बहुत प्रभावशाली या उत्कृष्ट चीज़ का वर्णन करता है।'
            },
            'behave towards/deal with': {
                actualWord: 'Treat',
                pos: 'Verb',
                sentence: 'The wise principal advised his teachers to always <strong>treat</strong> all their students with equal respect and fairness, regardless of their backgrounds.',
                sentenceHi: 'बुद्धिमान प्रधानाचार्य ने अपने शिक्षकों को सलाह दी कि वे हमेशा अपने सभी छात्रों के साथ समान सम्मान और निष्पक्षता से <strong>व्यवहार</strong> करें, चाहे उनकी पृष्ठभूमि कुछ भी हो।',
                synonyms: ['Behave towards', 'Handle'],
                antonyms: ['Ignore', 'Mistreat'],
                extraInfo: 'Treat is a Verb. It means to behave towards or deal with someone or something in a certain way. (It can also mean giving medical care or paying for someone\'s food/entertainment).',
                extraInfoHi: 'Treat (व्यवहार करना) एक क्रिया है। इसका अर्थ है किसी के प्रति एक निश्चित तरीके से व्यवहार करना या उनसे निपटना। (इसका अर्थ चिकित्सा देखभाल देना या किसी के भोजन/मनोरंजन का भुगतान करना भी हो सकता है)।'
            },
            // ========== GATHRI 34: Power & Knowledge ==========
            'excessive physical power': {
                actualWord: 'Brute force',
                pos: 'Noun Phrase',
                sentence: 'The rescue team had to use <strong>brute force</strong> to break open the jammed wooden door and save the trapped family.',
                sentenceHi: 'बचाव दल को जाम हुए लकड़ी के दरवाजे को तोड़कर फंसे परिवार को बचाने के लिए <strong>अंधाधुंध ताकत</strong> का इस्तेमाल करना पड़ा।',
                synonyms: ['Muscle power', 'Sheer strength'],
                antonyms: ['Finesse', 'Strategy'],
                extraInfo: 'Brute force is a Noun Phrase. It refers to relying entirely on physical strength or power rather than intelligence or strategy.',
                extraInfoHi: 'Brute force (अंधाधुंध ताकत) एक संज्ञा वाक्यांश है। यह बुद्धि या रणनीति के बजाय पूरी तरह से शारीरिक शक्ति पर निर्भर रहने को संदर्भित करता है।'
            },
            'look fixedly/gaze': {
                actualWord: 'Stare',
                pos: 'Verb',
                sentence: 'Priya\'s mother taught her that it is considered very impolite to constantly <strong>stare</strong> at strangers in public places.',
                sentenceHi: 'प्रिया की माँ ने उसे सिखाया कि सार्वजनिक स्थानों पर अजनबियों को लगातार <strong>घूरना</strong> बहुत अशिष्ट माना जाता है।',
                synonyms: ['Gaze', 'Glare'],
                antonyms: ['Glance', 'Look away'],
                extraInfo: 'Stare is a Verb. It means to look at someone or something with a fixed gaze, often with wide-open eyes.',
                extraInfoHi: 'Stare (घूरना) एक क्रिया है। इसका अर्थ है किसी व्यक्ति या चीज़ को स्थिर दृष्टि से देखना, अक्सर आंखें पूरी खुली होकर।'
            },
            'frequently/many times': {
                actualWord: 'Often',
                pos: 'Adverb',
                sentence: 'Rohan <strong>often</strong> visits the local library on his weekends to read newly published historical novels.',
                sentenceHi: 'रोहन <strong>अक्सर</strong> सप्ताहांत पर स्थानीय पुस्तकालय जाता है नई प्रकाशित ऐतिहासिक उपन्यास पढ़ने के लिए।',
                synonyms: ['Frequently', 'Regularly'],
                antonyms: ['Rarely', 'Seldom'],
                extraInfo: 'Often is an Adverb. It means frequently or many times.',
                extraInfoHi: 'Often (अक्सर/बार-बार) एक क्रिया विशेषण है। इसका अर्थ है बार-बार या कई बार।'
            },
            'home/residence': {
                actualWord: 'Abode',
                pos: 'Noun',
                sentence: 'The tired traveler finally reached his humble <strong>abode</strong> after a long and exhausting journey through the mountains.',
                sentenceHi: 'थका हुआ यात्री पहाड़ों की लंबी और थकाऊ यात्रा के बाद आखिरकार अपने विनम्र <strong>निवास</strong> पर पहुंचा।',
                synonyms: ['Home', 'Residence'],
                antonyms: [],
                extraInfo: 'Abode is a Noun. It is a formal or poetic word for a place of residence; a house or home.',
                extraInfoHi: 'Abode (घर/निवास) एक संज्ञा है। यह निवास स्थान के लिए एक औपचारिक या काव्यात्मक शब्द है।'
            },
            'dark blue dye/color': {
                actualWord: 'Indigo',
                pos: 'Noun/Adjective',
                sentence: 'In history class, Arjun learned that poor farmers were once forced to grow <strong>indigo</strong> crops against their will.',
                sentenceHi: 'इतिहास की कक्षा में, अर्जुन ने सीखा कि गरीब किसानों को एक समय उनकी इच्छा के विरुद्ध <strong>नील</strong> की फसल उगाने के लिए मजबूर किया जाता था।',
                synonyms: ['Dark blue', 'Navy'],
                antonyms: [],
                extraInfo: 'Indigo is a Noun or Adjective. It is a tropical plant cultivated as a source of dark blue dye, or the dark blue color itself.',
                extraInfoHi: 'Indigo (नील) एक संज्ञा या विशेषण है। यह एक उष्णकटिबंधीय पौधा है जिसे गहरे नीले रंग के स्रोत के रूप में उगाया जाता है।'
            },
            'big mistake': {
                actualWord: 'Blunder',
                pos: 'Noun',
                sentence: 'Sending the highly confidential email to the wrong client was a massive <strong>blunder</strong> by the careless employee.',
                sentenceHi: 'अत्यधिक गोपनीय ईमेल गलत ग्राहक को भेजना लापरवाह कर्मचारी की एक बड़ी <strong>भूल</strong> थी।',
                synonyms: ['Error', 'Mistake'],
                antonyms: ['Accuracy', 'Perfection'],
                extraInfo: 'Blunder is a Noun. It is a stupid or careless mistake.',
                extraInfoHi: 'Blunder (बड़ी भूल/गलती) एक संज्ञा है। यह एक मूर्खतापूर्ण या लापरवाह गलती है।'
            },
            'prickling sensation': {
                actualWord: 'Tingling',
                pos: 'Noun/Adjective',
                sentence: 'After sitting on the floor in the same awkward position for an hour, Sunita felt a strange <strong>tingling</strong> in her legs.',
                sentenceHi: 'एक घंटे तक फर्श पर एक ही अजीब स्थिति में बैठने के बाद, सुनीता को अपने पैरों में एक अजीब <strong>झनझनाहट</strong> महसूस हुई।',
                synonyms: ['Prickling', 'Shivering'],
                antonyms: ['Numbness'],
                extraInfo: 'Tingling is a Noun or Adjective. It is a slight prickling or stinging sensation, usually felt when a body part "falls asleep."',
                extraInfoHi: 'Tingling (झनझनाहट) एक संज्ञा या विशेषण है। यह हल्की चुभन या सिहरन की अनुभूति है, जो आमतौर पर तब महसूस होती है जब शरीर का कोई अंग "सो जाता है।"'
            },
            'injury/cut': {
                actualWord: 'Wound',
                pos: 'Noun/Verb',
                sentence: 'The kind nurse carefully cleaned the deep <strong>wound</strong> on the young soldier\'s arm and applied a fresh bandage.',
                sentenceHi: 'दयालु नर्स ने युवा सैनिक की बांह पर गहरे <strong>घाव</strong> को ध्यान से साफ किया और ताजी पट्टी लगाई।',
                synonyms: ['Injury', 'Cut'],
                antonyms: ['Healing', 'Cure'],
                extraInfo: 'Wound is a Noun or Verb. It is an injury to living tissue caused by a cut, blow, or other impact, typically one in which the skin is cut or broken.',
                extraInfoHi: 'Wound (घाव) एक संज्ञा या क्रिया है। यह कटने, चोट लगने या किसी अन्य प्रभाव से जीवित ऊतक को लगी चोट है।'
            },
            'aquatic nut': {
                actualWord: 'Water chestnut',
                pos: 'Noun Phrase',
                sentence: 'During the holy fasting festival, Meera prepared a delicious sweet dish using fresh <strong>water chestnut</strong> flour.',
                sentenceHi: 'पवित्र व्रत के त्योहार के दौरान, मीरा ने ताजे <strong>सिंघाड़े</strong> के आटे से एक स्वादिष्ट मीठी डिश बनाई।',
                synonyms: ['Singhara'],
                antonyms: [],
                extraInfo: 'Water chestnut is a Noun Phrase. It refers to a type of edible nut that grows underwater in marshes or ponds.',
                extraInfoHi: 'Water chestnut (सिंघाड़ा) एक संज्ञा वाक्यांश है। यह एक प्रकार का खाने योग्य फल है जो दलदल या तालाबों में पानी के नीचे उगता है।'
            },
            'force/oblige': {
                actualWord: 'Compel',
                pos: 'Verb',
                sentence: 'The continuous heavy rainfall and flooded streets will definitely <strong>compel</strong> the school administration to declare a holiday tomorrow.',
                sentenceHi: 'लगातार भारी बारिश और जलभराव वाली सड़कें निश्चित रूप से स्कूल प्रशासन को कल छुट्टी घोषित करने के लिए <strong>मजबूर</strong> करेंगी।',
                synonyms: ['Force', 'Press'],
                antonyms: ['Allow', 'Let go'],
                extraInfo: 'Compel is a Verb. It means to force or oblige someone to do something.',
                extraInfoHi: 'Compel (मजबूर करना) एक क्रिया है। इसका अर्थ है किसी को कुछ करने के लिए मजबूर करना या बाध्य करना।'
            },
            'growing crops/farming': {
                actualWord: 'Cultivation',
                pos: 'Noun',
                sentence: 'The highly fertile land near the great river is absolutely perfect for the <strong>cultivation</strong> of premium quality rice.',
                sentenceHi: 'महान नदी के पास की अत्यधिक उपजाऊ भूमि उच्च गुणवत्ता वाले चावल की <strong>खेती</strong> के लिए बिल्कुल उपयुक्त है।',
                synonyms: ['Farming', 'Agriculture'],
                antonyms: ['Neglect', 'Destruction'],
                extraInfo: 'Cultivation is a Noun. It is the act of preparing land and growing crops on it (farming/agriculture).',
                extraInfoHi: 'Cultivation (खेती/कृषि) एक संज्ञा है। यह भूमि तैयार करने और उस पर फसल उगाने का कार्य है।'
            },
            'for that reason': {
                actualWord: 'Therefore',
                pos: 'Adverb',
                sentence: 'It was raining very heavily outside; <strong>therefore</strong>, Amit decided to stay safely inside his house and complete his homework.',
                sentenceHi: 'बाहर बहुत तेज बारिश हो रही थी; <strong>इसलिए</strong>, अमित ने सुरक्षित रूप से अपने घर के अंदर रहने और अपना होमवर्क पूरा करने का फैसला किया।',
                synonyms: ['Consequently', 'Thus'],
                antonyms: ['However', 'Nevertheless'],
                extraInfo: 'Therefore is an Adverb. It means for that reason; consequently. It is used to show the result of a situation.',
                extraInfoHi: 'Therefore (इसलिए/अतः) एक क्रिया विशेषण है। इसका अर्थ है उस कारण से; फलस्वरूप। इसका उपयोग किसी स्थिति का परिणाम दिखाने के लिए किया जाता है।'
            },
            'obtain/get': {
                actualWord: 'Acquire',
                pos: 'Verb',
                sentence: 'Sneha knows that it takes many years of dedicated daily practice to successfully <strong>acquire</strong> a brand new foreign language.',
                sentenceHi: 'स्नेहा जानती है कि एक बिल्कुल नई विदेशी भाषा को सफलतापूर्वक <strong>सीखने</strong> के लिए कई वर्षों के समर्पित दैनिक अभ्यास की आवश्यकता होती है।',
                synonyms: ['Obtain', 'Gain'],
                antonyms: ['Lose', 'Surrender'],
                extraInfo: 'Acquire is a Verb. It means to buy or obtain an asset or object for oneself, or to learn or develop a new skill.',
                extraInfoHi: 'Acquire (प्राप्त करना/अधिग्रहण करना) एक क्रिया है। इसका अर्थ है अपने लिए कोई संपत्ति या वस्तु खरीदना या प्राप्त करना, या कोई नया कौशल सीखना या विकसित करना।'
            },
            'abandon/give up': {
                actualWord: 'Forsake',
                pos: 'Verb',
                sentence: 'Kabir firmly believes that a true and loyal friend will never <strong>forsake</strong> you during your most difficult times in life.',
                sentenceHi: 'कबीर दृढ़ता से मानते हैं कि एक सच्चा और वफादार दोस्त जीवन के सबसे कठिन समय में आपको कभी <strong>नहीं छोड़ेगा</strong>।',
                synonyms: ['Abandon', 'Desert'],
                antonyms: ['Keep', 'Support'],
                extraInfo: 'Forsake is a Verb. It means to abandon someone or something, or to renounce or give up a habit.',
                extraInfoHi: 'Forsake (त्यागना/छोड़ देना) एक क्रिया है। इसका अर्थ है किसी को या किसी चीज़ को त्यागना, या किसी आदत को छोड़ देना।'
            },
            'profitable/tempting': {
                actualWord: 'Lucrative',
                pos: 'Adjective',
                sentence: 'After completing his engineering degree, Manish received a highly <strong>lucrative</strong> job offer from a famous software company in the city.',
                sentenceHi: 'अपनी इंजीनियरिंग की डिग्री पूरी करने के बाद, मनीष को शहर की एक प्रसिद्ध सॉफ्टवेयर कंपनी से अत्यधिक <strong>लाभदायक</strong> नौकरी का प्रस्ताव मिला।',
                synonyms: ['Profitable', 'Rewarding'],
                antonyms: ['Unprofitable', 'Unrewarding'],
                extraInfo: 'Lucrative is an Adjective. It describes a job, deal, or business that produces a great deal of profit or wealth, making it very tempting.',
                extraInfoHi: 'Lucrative (लाभदायक/लुभावना) एक विशेषण है। यह ऐसी नौकरी, सौदे या व्यवसाय का वर्णन करता है जो बहुत अधिक लाभ या धन पैदा करता है।'
            },
            // ========== GATHRI 35: Law & Governance ==========
            'complaint/resentment': {
                actualWord: 'Grievance',
                pos: 'Noun',
                sentence: 'Rajesh filed a formal <strong>grievance</strong> with the HR department regarding the unfair distribution of extra work.',
                sentenceHi: 'राजेश ने अतिरिक्त कार्य के अनुचित वितरण के बारे में एचआर विभाग में औपचारिक <strong>शिकायत</strong> दर्ज की।',
                synonyms: ['Complaint', 'Injustice'],
                antonyms: ['Commendation', 'Praise'],
                extraInfo: 'Grievance is a Noun. It is a real or imagined wrong or other cause for complaint or protest, especially unfair treatment.',
                extraInfoHi: 'Grievance (शिकायत) एक संज्ञा है। यह वास्तविक या काल्पनिक गलत या शिकायत या विरोध का कोई अन्य कारण है, विशेष रूप से अनुचित व्यवहार।'
            },
            'remedy/resolution': {
                actualWord: 'Redressal',
                pos: 'Noun',
                sentence: 'The consumer court promised quick <strong>redressal</strong> for the customers who were sold defective mobile phones.',
                sentenceHi: 'उपभोक्ता अदालत ने दोषपूर्ण मोबाइल फोन बेचे जाने वाले ग्राहकों के लिए शीघ्र <strong>निवारण</strong> का वादा किया।',
                synonyms: ['Resolution', 'Remedy'],
                antonyms: ['Worsening', 'Damage'],
                extraInfo: 'Redressal is a Noun. It refers to the act of setting right an unjust situation or providing a remedy/compensation for a grievance.',
                extraInfoHi: 'Redressal (निपटारा/निवारण) एक संज्ञा है। यह एक अन्यायपूर्ण स्थिति को सही करने या शिकायत के लिए उपाय/मुआवजा प्रदान करने के कार्य को संदर्भित करता है।'
            },
            'excessive bureaucracy/strict rules': {
                actualWord: 'Red tapism',
                pos: 'Noun',
                sentence: 'Priya was highly frustrated by the constant <strong>red tapism</strong> that delayed the approval of her simple bank loan for months.',
                sentenceHi: 'प्रिया निरंतर <strong>लालफीताशाही</strong> से बहुत निराश थी जिसने उसके साधारण बैंक ऋण की मंजूरी को महीनों तक विलंबित कर दिया।',
                synonyms: ['Bureaucracy', 'Officialdom'],
                antonyms: ['Efficiency', 'Flexibility'],
                extraInfo: 'Red tapism (or Red Tape) is a Noun. It refers to excessive regulation or rigid conformity to formal rules that is considered redundant or bureaucratic and hinders or prevents action or decision-making.',
                extraInfoHi: 'Red tapism (लालफीताशाही) एक संज्ञा है। यह अत्यधिक विनियमन या औपचारिक नियमों के कठोर अनुपालन को संदर्भित करता है जो कार्रवाई या निर्णय लेने में बाधा डालता है।'
            },
            'term/period of office': {
                actualWord: 'Tenure',
                pos: 'Noun',
                sentence: 'During his successful five-year <strong>tenure</strong> as the city mayor, Vivek built three new hospitals and improved the roads.',
                sentenceHi: 'शहर के मेयर के रूप में अपने सफल पांच वर्षीय <strong>कार्यकाल</strong> के दौरान, विवेक ने तीन नए अस्पताल बनाए और सड़कों में सुधार किया।',
                synonyms: ['Term', 'Incumbency'],
                antonyms: [],
                extraInfo: 'Tenure is a Noun. It is the period of time a person holds a specific job or office.',
                extraInfoHi: 'Tenure (कार्यकाल) एक संज्ञा है। यह वह अवधि है जिसमें कोई व्यक्ति किसी विशेष नौकरी या पद पर रहता है।'
            },
            'force out/banish': {
                actualWord: 'Expel',
                pos: 'Verb',
                sentence: 'The school principal had no choice but to immediately <strong>expel</strong> the senior student for constantly breaking the strict disciplinary rules.',
                sentenceHi: 'स्कूल के प्रधानाचार्य के पास सख्त अनुशासनिक नियमों को लगातार तोड़ने के लिए वरिष्ठ छात्र को तुरंत <strong>निकालने</strong> के अलावा कोई विकल्प नहीं था।',
                synonyms: ['Banish', 'Eject'],
                antonyms: ['Admit', 'Welcome'],
                extraInfo: 'Expel is a Verb. It means to officially force someone to leave a school, organization, or country.',
                extraInfoHi: 'Expel (निकाल देना) एक क्रिया है। इसका अर्थ है किसी को आधिकारिक रूप से स्कूल, संगठन या देश छोड़ने के लिए मजबूर करना।'
            },
            'rough fight/dispute': {
                actualWord: 'Brawl',
                pos: 'Noun/Verb',
                sentence: 'The local police had to arrive quickly to stop a violent <strong>brawl</strong> that broke out in the crowded vegetable market.',
                sentenceHi: 'स्थानीय पुलिस को भीड़ भरे सब्जी बाजार में शुरू हुए हिंसक <strong>झगड़े</strong> को रोकने के लिए जल्दी से पहुंचना पड़ा।',
                synonyms: ['Fight', 'Scuffle'],
                antonyms: ['Peace', 'Agreement'],
                extraInfo: 'Brawl is a Noun or a Verb. It is a rough, noisy fight or quarrel, usually in a public place.',
                extraInfoHi: 'Brawl (झगड़ा/विवाद) एक संज्ञा या क्रिया है। यह एक हिंसक, शोरगुल वाला झगड़ा है, आमतौर पर सार्वजनिक स्थान पर।'
            },
            'stealing with force': {
                actualWord: 'Robbery',
                pos: 'Noun',
                sentence: 'The security cameras recorded the entire bank <strong>robbery</strong>, helping the police identify the masked criminals.',
                sentenceHi: 'सुरक्षा कैमरों ने पूरी बैंक <strong>डकैती</strong> को रिकॉर्ड कर लिया, जिससे पुलिस को नकाबपोश अपराधियों की पहचान करने में मदद मिली।',
                synonyms: ['Theft', 'Burglary'],
                antonyms: ['Donation', 'Giving'],
                extraInfo: 'Robbery is a Noun. It is the action of taking property unlawfully from a person or place by force or threat of force.',
                extraInfoHi: 'Robbery (डकैती/लूट) एक संज्ञा है। यह बल या बल की धमकी से किसी व्यक्ति या स्थान से अवैध रूप से संपत्ति लेने की कार्रवाई है।'
            },
            'value/cost': {
                actualWord: 'Worth',
                pos: 'Noun/Adjective',
                sentence: 'Neha finally took her grandmother\'s old gold necklace to the jeweler to find out its true market <strong>worth</strong>.',
                sentenceHi: 'नेहा आखिरकार अपनी दादी का पुराना सोने का हार जौहरी के पास ले गई ताकि उसका वास्तविक बाजार <strong>मूल्य</strong> पता लगा सके।',
                synonyms: ['Value', 'Price'],
                antonyms: ['Worthlessness'],
                extraInfo: 'Worth is a Noun or Adjective. It refers to the value equivalent to that of someone or something, usually in financial terms.',
                extraInfoHi: 'Worth (कीमत/मूल्य) एक संज्ञा या विशेषण है। यह किसी व्यक्ति या वस्तु के समतुल्य मूल्य को संदर्भित करता है।'
            },
            'function/part played': {
                actualWord: 'Role',
                pos: 'Noun',
                sentence: 'Sunita played a very crucial <strong>role</strong> in perfectly organizing the annual college cultural festival this year.',
                sentenceHi: 'सुनीता ने इस साल वार्षिक कॉलेज सांस्कृतिक उत्सव को पूरी तरह से आयोजित करने में बहुत महत्वपूर्ण <strong>भूमिका</strong> निभाई।',
                synonyms: ['Part', 'Function'],
                antonyms: [],
                extraInfo: 'Role is a Noun. It is the function assumed or part played by a person or thing in a particular situation.',
                extraInfoHi: 'Role (भूमिका) एक संज्ञा है। यह किसी विशेष स्थिति में किसी व्यक्ति या वस्तु द्वारा निभाई गई भूमिका या कार्य है।'
            },
            'destruction of property': {
                actualWord: 'Vandalism',
                pos: 'Noun',
                sentence: 'The city park had to be closed for extensive repairs following a senseless night of <strong>vandalism</strong> by some aggressive teenagers.',
                sentenceHi: 'कुछ आक्रामक किशोरों द्वारा <strong>तोड़-फोड़</strong> की एक बेतुकी रात के बाद शहर के पार्क को व्यापक मरम्मत के लिए बंद करना पड़ा।',
                synonyms: ['Destruction', 'Defacement'],
                antonyms: ['Protection', 'Conservation'],
                extraInfo: 'Vandalism is a Noun. It is the action involving deliberate destruction of or damage to public or private property.',
                extraInfoHi: 'Vandalism (तोड़-फोड़/बर्बरता) एक संज्ञा है। यह सार्वजनिक या निजी संपत्ति को जानबूझकर नष्ट करने या नुकसान पहुंचाने की कार्रवाई है।'
            },
            'after/later': {
                actualWord: 'Post',
                pos: 'Preposition/Prefix',
                sentence: 'Sanjay excitedly attended the <strong>post</strong>-match press conference to hear what the winning cricket captain had to say.',
                sentenceHi: 'संजय ने उत्साहपूर्वक मैच के <strong>बाद</strong> की प्रेस कॉन्फ्रेंस में भाग लिया ताकि जीतने वाले क्रिकेट कप्तान की बात सुन सके।',
                synonyms: ['After', 'Following'],
                antonyms: ['Pre', 'Before'],
                extraInfo: 'Post can be a Preposition or Prefix. When used this way, it means subsequent to; after.',
                extraInfoHi: 'Post (बाद में) एक पूर्वसर्ग या उपसर्ग हो सकता है। इस तरह उपयोग किए जाने पर, इसका अर्थ है बाद में; के पश्चात।'
            },
            'voting/election': {
                actualWord: 'Poll',
                pos: 'Noun/Verb',
                sentence: 'Millions of responsible citizens woke up early and went to their local centers to cast their vote in the national <strong>poll</strong>.',
                sentenceHi: 'लाखों जिम्मेदार नागरिक जल्दी उठे और राष्ट्रीय <strong>मतदान</strong> में अपना वोट डालने के लिए अपने स्थानीय केंद्रों पर गए।',
                synonyms: ['Vote', 'Election'],
                antonyms: [],
                extraInfo: 'Poll is a Noun or Verb. It refers to the process of voting in an election, or a record of the number of votes cast.',
                extraInfoHi: 'Poll (मतदान/चुनाव) एक संज्ञा या क्रिया है। यह चुनाव में मतदान की प्रक्रिया या डाले गए वोटों की संख्या के रिकॉर्ड को संदर्भित करता है।'
            },
            'setting fire intentionally': {
                actualWord: 'Arson',
                pos: 'Noun',
                sentence: 'The police investigation proved that the old factory burning down was not a simple accident, but a clear case of illegal <strong>arson</strong>.',
                sentenceHi: 'पुलिस जांच ने साबित किया कि पुरानी फैक्ट्री का जलना कोई साधारण दुर्घटना नहीं थी, बल्कि अवैध <strong>आगजनी</strong> का स्पष्ट मामला था।',
                synonyms: ['Fire-raising', 'Incendiarism'],
                antonyms: ['Firefighting'],
                extraInfo: 'Arson is a Noun. It is the criminal act of deliberately setting fire to property.',
                extraInfoHi: 'Arson (आगजनी) एक संज्ञा है। यह जानबूझकर संपत्ति में आग लगाने का आपराधिक कार्य है।'
            },
            'carelessness': {
                actualWord: 'Negligence',
                pos: 'Noun',
                sentence: 'The careless driver was sued for gross <strong>negligence</strong> after his reckless driving caused a major accident on the highway.',
                sentenceHi: 'लापरवाह चालक पर घोर <strong>लापरवाही</strong> का मुकदमा चलाया गया क्योंकि उसकी लापरवाह ड्राइविंग ने राजमार्ग पर एक बड़ी दुर्घटना का कारण बना।',
                synonyms: ['Carelessness', 'Irresponsibility'],
                antonyms: ['Care', 'Attention'],
                extraInfo: 'Negligence is a Noun. It is the failure to take proper care in doing something, often resulting in damage or injury.',
                extraInfoHi: 'Negligence (लापरवाही) एक संज्ञा है। यह किसी कार्य में उचित देखभाल न करने की विफलता है, जिसके परिणामस्वरूप अक्सर नुकसान या चोट होती है।'
            },
            'sink/die underwater': {
                actualWord: 'Drown',
                pos: 'Verb',
                sentence: 'The brave young lifeguard quickly jumped into the deep end of the swimming pool to save the little boy from <strong>drowning</strong>.',
                sentenceHi: 'बहादुर युवा लाइफगार्ड ने छोटे लड़के को <strong>डूबने</strong> से बचाने के लिए तेजी से स्विमिंग पूल के गहरे सिरे में छलांग लगा दी।',
                synonyms: ['Sink', 'Submerge'],
                antonyms: ['Float', 'Survive'],
                extraInfo: 'Drown is a Verb. It means to die through submersion in and inhalation of water, or to completely submerge something in a liquid.',
                extraInfoHi: 'Drown (डूबना) एक क्रिया है। इसका अर्थ है पानी में डूबने और पानी अंदर जाने से मरना, या किसी चीज़ को पूरी तरह से तरल में डुबो देना।'
            },
            // ========== GATHRI 36: Nature & Senses ==========
            'productive/yielding crops': {
                actualWord: 'Fertile',
                pos: 'Adjective',
                sentence: 'Karan planted the wheat seeds in the highly <strong>fertile</strong> soil to ensure a massive harvest for the season.',
                sentenceHi: 'करन ने मौसम के लिए भारी फसल सुनिश्चित करने के लिए अत्यधिक <strong>उपजाऊ</strong> मिट्टी में गेहूं के बीज बोए।',
                synonyms: ['Productive', 'Fruitful'],
                antonyms: ['Barren', 'Infertile'],
                extraInfo: 'Fertile is an Adjective. It describes soil or land that is capable of producing abundant vegetation or crops.',
                extraInfoHi: 'Fertile (उपजाऊ) एक विशेषण है। यह ऐसी मिट्टी या भूमि का वर्णन करता है जो प्रचुर मात्रा में वनस्पति या फसल पैदा करने में सक्षम है।'
            },
            'treat cruelly/persecute': {
                actualWord: 'Oppress',
                pos: 'Verb',
                sentence: 'The history teacher told Aarti how the cruel emperor used his massive army to <strong>oppress</strong> the poor villagers.',
                sentenceHi: 'इतिहास की शिक्षिका ने आरती को बताया कि कैसे क्रूर सम्राट ने गरीब ग्रामीणों पर <strong>अत्याचार</strong> करने के लिए अपनी विशाल सेना का उपयोग किया।',
                synonyms: ['Persecute', 'Tyrannize'],
                antonyms: ['Liberate', 'Free'],
                extraInfo: 'Oppress is a Verb. It means to keep someone in subservience and hardship, especially by the unjust exercise of authority.',
                extraInfoHi: 'Oppress (अत्याचार करना/जुल्म करना) एक क्रिया है। इसका अर्थ है किसी को अधीनता और कठिनाई में रखना, विशेष रूप से अधिकार के अन्यायपूर्ण प्रयोग द्वारा।'
            },
            'color-changing lizard': {
                actualWord: 'Chameleon',
                pos: 'Noun',
                sentence: 'Ravi was fascinated to watch the small <strong>chameleon</strong> magically change its color to match the green leaves.',
                sentenceHi: 'रवि छोटे <strong>गिरगिट</strong> को जादुई रूप से हरी पत्तियों से मिलान करने के लिए अपना रंग बदलते देखकर मंत्रमुग्ध हो गया।',
                synonyms: ['Lizard', 'Reptile'],
                antonyms: [],
                extraInfo: 'Chameleon is a Noun. It is a small slow-moving lizard with a highly developed ability to change color.',
                extraInfoHi: 'Chameleon (गिरगिट) एक संज्ञा है। यह एक छोटी धीमी गति से चलने वाली छिपकली है जिसमें रंग बदलने की अत्यधिक विकसित क्षमता है।'
            },
            'disguise/hide': {
                actualWord: 'Camouflage',
                pos: 'Noun/Verb',
                sentence: 'The clever tiger uses its striped fur as a natural <strong>camouflage</strong> to perfectly hide in the tall jungle grass, explained Manish.',
                sentenceHi: 'चालाक बाघ अपनी धारीदार खाल का उपयोग प्राकृतिक <strong>छलावरण</strong> के रूप में करता है ताकि ऊंची जंगल की घास में पूरी तरह छिप सके, मनीष ने समझाया।',
                synonyms: ['Disguise', 'Concealment'],
                antonyms: ['Reveal', 'Expose'],
                extraInfo: 'Camouflage is a Noun or Verb. It refers to the hiding of something as a result of its appearance blending in with its surroundings.',
                extraInfoHi: 'Camouflage (छलावरण/छिपाव) एक संज्ञा या क्रिया है। यह किसी चीज़ को उसके परिवेश में घुलमिल जाने के कारण छिपाने को संदर्भित करता है।'
            },
            'decide/establish': {
                actualWord: 'Determine',
                pos: 'Verb',
                sentence: 'Pooja needs to carefully <strong>determine</strong> the exact time of her train departure before leaving her house for the station.',
                sentenceHi: 'पूजा को स्टेशन के लिए अपना घर छोड़ने से पहले अपनी ट्रेन के प्रस्थान का सही समय सावधानीपूर्वक <strong>निर्धारित</strong> करना होगा।',
                synonyms: ['Decide', 'Resolve'],
                antonyms: ['Hesitate', 'Waver'],
                extraInfo: 'Determine is a Verb. It means to cause something to occur in a particular way or to firmly decide something.',
                extraInfoHi: 'Determine (निर्धारित करना/तय करना) एक क्रिया है। इसका अर्थ है किसी चीज़ को एक विशेष तरीके से घटित करना या दृढ़ता से कुछ तय करना।'
            },
            'lose color/disappear': {
                actualWord: 'Fade',
                pos: 'Verb',
                sentence: 'Deepak noticed that the bright red color of his favorite shirt started to <strong>fade</strong> after multiple harsh washes.',
                sentenceHi: 'दीपक ने देखा कि कई बार कठोर धुलाई के बाद उसकी पसंदीदा शर्ट का चमकीला लाल रंग <strong>फीका</strong> पड़ने लगा।',
                synonyms: ['Pale', 'Diminish'],
                antonyms: ['Brighten', 'Enhance'],
                extraInfo: 'Fade is a Verb. It means to gradually grow faint and disappear or lose color.',
                extraInfoHi: 'Fade (फीका पड़ना/मुरझाना) एक क्रिया है। इसका अर्थ है धीरे-धीरे धुंधला होना और गायब हो जाना या रंग खोना।'
            },
            'normally/mostly': {
                actualWord: 'Usually',
                pos: 'Adverb',
                sentence: 'Sneha <strong>usually</strong> wakes up at six in the morning to peacefully practice yoga before heading to her college.',
                sentenceHi: 'स्नेहा <strong>आमतौर पर</strong> सुबह छह बजे उठती है ताकि कॉलेज जाने से पहले शांति से योग अभ्यास कर सके।',
                synonyms: ['Generally', 'Normally'],
                antonyms: ['Rarely', 'Seldom'],
                extraInfo: 'Usually is an Adverb. It means under normal conditions; generally.',
                extraInfoHi: 'Usually (आमतौर पर/अधिकतर) एक क्रिया विशेषण है। इसका अर्थ है सामान्य परिस्थितियों में; आम तौर पर।'
            },
            'adhesive/clammy': {
                actualWord: 'Sticky',
                pos: 'Adjective',
                sentence: 'After eating the sweet and juicy mango, Rohan\'s hands became very <strong>sticky</strong> and required a good wash.',
                sentenceHi: 'मीठा और रसीला आम खाने के बाद, रोहन के हाथ बहुत <strong>चिपचिपे</strong> हो गए और उन्हें अच्छी तरह धोने की जरूरत पड़ी।',
                synonyms: ['Adhesive', 'Gummy'],
                antonyms: ['Smooth', 'Dry'],
                extraInfo: 'Sticky is an Adjective. It describes something that is designed or tending to stick to things on contact.',
                extraInfoHi: 'Sticky (चिपचिपा) एक विशेषण है। यह ऐसी चीज़ का वर्णन करता है जो संपर्क में आने पर चीजों से चिपक जाती है।'
            },
            'worry/matter of interest': {
                actualWord: 'Concern',
                pos: 'Noun/Verb',
                sentence: 'The rapidly increasing air pollution in the city is a major <strong>concern</strong> for Dr. Patel and his asthma patients.',
                sentenceHi: 'शहर में तेजी से बढ़ता वायु प्रदूषण डॉ. पटेल और उनके अस्थमा रोगियों के लिए एक प्रमुख <strong>चिंता</strong> का विषय है।',
                synonyms: ['Worry', 'Issue'],
                antonyms: ['Indifference', 'Peace'],
                extraInfo: 'Concern can be a Noun or a Verb. It relates to anxiety or worry, or a matter of interest or importance to someone.',
                extraInfoHi: 'Concern (चिंता/मामला) एक संज्ञा या क्रिया हो सकती है। यह चिंता या किसी व्यक्ति के लिए रुचि या महत्व के मामले से संबंधित है।'
            },
            'effect/collision': {
                actualWord: 'Impact',
                pos: 'Noun/Verb',
                sentence: 'The heavy monsoon rainfall had a huge <strong>impact</strong> on the local traffic, causing Kiran to reach her office very late.',
                sentenceHi: 'भारी मानसूनी बारिश का स्थानीय यातायात पर बहुत बड़ा <strong>प्रभाव</strong> पड़ा, जिससे किरण अपने कार्यालय बहुत देर से पहुंची।',
                synonyms: ['Effect', 'Influence'],
                antonyms: ['Avoidance'],
                extraInfo: 'Impact can be a Noun or a Verb. It is the action of one object coming forcibly into contact with another, or having a strong effect on someone or something.',
                extraInfoHi: 'Impact (प्रभाव/टकराव) एक संज्ञा या क्रिया हो सकती है। यह एक वस्तु का दूसरी से जबरदस्ती संपर्क में आना, या किसी पर मजबूत प्रभाव डालना है।'
            },
            'farm animals': {
                actualWord: 'Livestock',
                pos: 'Noun',
                sentence: 'The hardworking village farmer relies entirely on his healthy <strong>livestock</strong> to generate his daily income, noted Suresh.',
                sentenceHi: 'मेहनती गांव का किसान अपनी दैनिक आय अर्जित करने के लिए पूरी तरह से अपने स्वस्थ <strong>मवेशियों</strong> पर निर्भर है, सुरेश ने कहा।',
                synonyms: ['Farm animals', 'Cattle'],
                antonyms: [],
                extraInfo: 'Livestock is a Noun. It refers to farm animals regarded as an asset (such as cows, sheep, and pigs).',
                extraInfoHi: 'Livestock (मवेशी/पशुधन) एक संज्ञा है। यह संपत्ति के रूप में माने जाने वाले पालतू पशुओं को संदर्भित करता है (जैसे गाय, भेड़ और सुअर)।'
            },
            'extreme/strong': {
                actualWord: 'Intense',
                pos: 'Adjective',
                sentence: 'Gaurav felt an <strong>intense</strong> sharp pain in his left ankle immediately after tripping on the hard basketball court.',
                sentenceHi: 'कठोर बास्केटबॉल कोर्ट पर ठोकर खाने के तुरंत बाद गौरव को अपने बाएं टखने में <strong>तीव्र</strong> तेज दर्द महसूस हुआ।',
                synonyms: ['Extreme', 'Severe'],
                antonyms: ['Mild', 'Moderate'],
                extraInfo: 'Intense is an Adjective. It describes something of extreme force, degree, or strength.',
                extraInfoHi: 'Intense (तीव्र/गहन) एक विशेषण है। यह अत्यधिक बल, डिग्री या ताकत वाली चीज़ का वर्णन करता है।'
            },
            'afraid/scared': {
                actualWord: 'Frightened',
                pos: 'Adjective',
                sentence: 'The sudden, loud thunder during the midnight storm made little Kavita feel very <strong>frightened</strong> in her dark room.',
                sentenceHi: 'आधी रात के तूफान के दौरान अचानक तेज गर्जना ने छोटी कविता को अपने अंधेरे कमरे में बहुत <strong>भयभीत</strong> कर दिया।',
                synonyms: ['Scared', 'Terrified'],
                antonyms: ['Fearless', 'Brave'],
                extraInfo: 'Frightened is an Adjective (derived from the verb Frighten). It means feeling fear or being afraid.',
                extraInfoHi: 'Frightened (भयभीत/डरा हुआ) एक विशेषण है (क्रिया Frighten से व्युत्पन्न)। इसका अर्थ है डर महसूस करना या भयभीत होना।'
            },
            'feces/waste matter': {
                actualWord: 'Stool',
                pos: 'Noun',
                sentence: 'The veterinarian gently asked Mohan to collect a sample of the dog\'s <strong>stool</strong> to test the pet for any stomach infections.',
                sentenceHi: 'पशु चिकित्सक ने मोहन से कुत्ते के <strong>मल</strong> का नमूना एकत्र करने के लिए कहा ताकि पालतू जानवर का पेट संक्रमण की जांच की जा सके।',
                synonyms: ['Feces', 'Excrement'],
                antonyms: [],
                extraInfo: 'Stool is a Noun. While it commonly means a backless chair, in biology and medicine, it refers to a piece of feces (solid waste from the body).',
                extraInfoHi: 'Stool (मल) एक संज्ञा है। जबकि इसका सामान्य अर्थ बिना पीठ वाली कुर्सी है, जीव विज्ञान और चिकित्सा में, यह मल (शरीर से ठोस अपशिष्ट) को संदर्भित करता है।'
            },
            // ========== GATHRI 37: Politics & Society ==========
            'notice/letter distributed to many': {
                actualWord: 'Circular',
                pos: 'Noun/Adjective',
                sentence: 'The school principal sent a <strong>circular</strong> to all parents regarding the upcoming summer vacation dates.',
                sentenceHi: 'स्कूल के प्रधानाचार्य ने आगामी गर्मी की छुट्टियों की तारीखों के बारे में सभी अभिभावकों को एक <strong>सूचना पत्र</strong> भेजा।',
                synonyms: ['Notice', 'Leaflet'],
                antonyms: ['Private letter'],
                extraInfo: 'Circular can be an Adjective (meaning round) or a Noun. As a noun, it refers to a letter or advertisement distributed to a large number of people.',
                extraInfoHi: 'Circular (सूचना पत्र/परिपत्र) एक विशेषण (गोल) या संज्ञा हो सकता है। संज्ञा के रूप में, यह बड़ी संख्या में लोगों को वितरित किया जाने वाला पत्र या विज्ञापन है।'
            },
            'release/distribute officially': {
                actualWord: 'Issue',
                pos: 'Noun/Verb',
                sentence: 'The traffic police department decided to <strong>issue</strong> a strict warning to drivers who constantly break the speed limit.',
                sentenceHi: 'ट्रैफिक पुलिस विभाग ने लगातार स्पीड लिमिट तोड़ने वाले ड्राइवरों को सख्त चेतावनी <strong>जारी</strong> करने का फैसला किया।',
                synonyms: ['Release', 'Distribute'],
                antonyms: ['Withdraw', 'Hold back'],
                extraInfo: 'Issue can be a Noun (a problem) or a Verb. As a verb, it means to supply or distribute something officially.',
                extraInfoHi: 'Issue (जारी करना) एक संज्ञा (समस्या) या क्रिया हो सकता है। क्रिया के रूप में, इसका अर्थ है आधिकारिक रूप से कुछ आपूर्ति या वितरित करना।'
            },
            'public declaration of policies': {
                actualWord: 'Manifesto',
                pos: 'Noun',
                sentence: 'The political leader released a detailed <strong>manifesto</strong> promising better roads and clean water for the entire city.',
                sentenceHi: 'राजनीतिक नेता ने पूरे शहर के लिए बेहतर सड़कों और साफ पानी का वादा करते हुए एक विस्तृत <strong>घोषणा पत्र</strong> जारी किया।',
                synonyms: ['Declaration', 'Platform'],
                antonyms: ['Secret plan'],
                extraInfo: 'Manifesto is a Noun. It is a public declaration of policy and aims, especially one issued before an election by a political party or candidate.',
                extraInfoHi: 'Manifesto (घोषणा पत्र) एक संज्ञा है। यह नीति और उद्देश्यों की सार्वजनिक घोषणा है, विशेष रूप से चुनाव से पहले किसी राजनीतिक दल द्वारा जारी की जाने वाली।'
            },
            'illegal intrusion on land': {
                actualWord: 'Encroachment',
                pos: 'Noun',
                sentence: 'The municipal corporation brought a bulldozer to clear the illegal <strong>encroachment</strong> on the public footpath.',
                sentenceHi: 'नगर निगम ने सार्वजनिक फुटपाथ पर अवैध <strong>अतिक्रमण</strong> को हटाने के लिए बुलडोजर लाया।',
                synonyms: ['Intrusion', 'Invasion'],
                antonyms: ['Retreat', 'Withdrawal'],
                extraInfo: 'Encroachment is a Noun. It refers to the intrusion on a person\'s territory, rights, or the illegal occupation of land.',
                extraInfoHi: 'Encroachment (अतिक्रमण/अवैध कब्जा) एक संज्ञा है। यह किसी व्यक्ति के क्षेत्र, अधिकारों पर अतिक्रमण या भूमि पर अवैध कब्जे को संदर्भित करता है।'
            },
            'act of quitting a job': {
                actualWord: 'Resignation',
                pos: 'Noun',
                sentence: 'After working at the company for ten years, Amit officially submitted his <strong>resignation</strong> to start his own business.',
                sentenceHi: 'कंपनी में दस साल काम करने के बाद, अमित ने अपना व्यवसाय शुरू करने के लिए आधिकारिक रूप से अपना <strong>त्याग पत्र</strong> जमा किया।',
                synonyms: ['Departure', 'Quitting'],
                antonyms: ['Hiring', 'Employment'],
                extraInfo: 'Resignation is a Noun. It is the formal act of giving up or quitting one\'s position or office.',
                extraInfoHi: 'Resignation (त्याग पत्र/इस्तीफा) एक संज्ञा है। यह किसी के पद या कार्यालय को छोड़ने या त्यागने का औपचारिक कार्य है।'
            },
            'minor change/improvement': {
                actualWord: 'Amendment',
                pos: 'Noun',
                sentence: 'The committee proposed a new <strong>amendment</strong> to the club rules to allow younger members to join.',
                sentenceHi: 'समिति ने छोटे सदस्यों को शामिल होने की अनुमति देने के लिए क्लब के नियमों में एक नया <strong>संशोधन</strong> प्रस्तावित किया।',
                synonyms: ['Revision', 'Modification'],
                antonyms: ['Worsening', 'Damage'],
                extraInfo: 'Amendment is a Noun. It is a minor change or addition designed to improve a text, piece of legislation, or document.',
                extraInfoHi: 'Amendment (संशोधन/सुधार) एक संज्ञा है। यह किसी पाठ, कानून या दस्तावेज़ को बेहतर बनाने के लिए किया गया मामूली बदलाव या जोड़ है।'
            },
            'try to gain love/entice': {
                actualWord: 'Woo',
                pos: 'Verb',
                sentence: 'The shopping mall offered massive discounts to successfully <strong>woo</strong> more customers during the festive season.',
                sentenceHi: 'शॉपिंग मॉल ने त्योहारी सीजन के दौरान अधिक ग्राहकों को <strong>लुभाने</strong> के लिए भारी छूट दी।',
                synonyms: ['Entice', 'Attract'],
                antonyms: ['Repel', 'Disgust'],
                extraInfo: 'Woo is a Verb. It means to try to gain the love of someone, or to seek the favor, support, or custom of someone.',
                extraInfoHi: 'Woo (लुभाना/लालच देना) एक क्रिया है। इसका अर्थ है किसी का प्यार पाने की कोशिश करना, या किसी का पक्ष, समर्थन या रिवाज पाने की कोशिश करना।'
            },
            'in spite of the fact that': {
                actualWord: 'Although',
                pos: 'Conjunction',
                sentence: '<strong>Although</strong> it was raining very heavily outside, Priya still decided to walk to the library.',
                sentenceHi: '<strong>हालाँकि</strong> बाहर बहुत तेज बारिश हो रही थी, प्रिया ने फिर भी पुस्तकालय तक पैदल जाने का फैसला किया।',
                synonyms: ['Even though', 'Despite the fact'],
                antonyms: [],
                extraInfo: 'Although is a Conjunction. It means "even though" or "in spite of the fact that."',
                extraInfoHi: 'Although (हालाँकि/यद्यपि) एक समुच्चयबोधक है। इसका अर्थ है "इस तथ्य के बावजूद कि" या "भले ही।"'
            },
            'arrange systematically': {
                actualWord: 'Organize',
                pos: 'Verb',
                sentence: 'Rohan enthusiastically volunteered to <strong>organize</strong> the annual science fair at his college this year.',
                sentenceHi: 'रोहन ने इस साल अपने कॉलेज में वार्षिक विज्ञान मेले का <strong>आयोजन</strong> करने के लिए उत्साहपूर्वक स्वेच्छा से काम किया।',
                synonyms: ['Arrange', 'Coordinate'],
                antonyms: ['Mess up', 'Disrupt'],
                extraInfo: 'Organize is a Verb. It means to arrange things into a structured whole or coordinate the activities of a person or group.',
                extraInfoHi: 'Organize (आयोजन करना/व्यवस्थित करना) एक क्रिया है। इसका अर्थ है चीजों को एक संरचित समग्र में व्यवस्थित करना या किसी व्यक्ति या समूह की गतिविधियों का समन्वय करना।'
            },
            'motion or campaign': {
                actualWord: 'Movement',
                pos: 'Noun',
                sentence: 'Mahatma Gandhi led a massive non-violent <strong>movement</strong> to help India gain independence from British rule.',
                sentenceHi: 'महात्मा गांधी ने भारत को ब्रिटिश शासन से स्वतंत्रता दिलाने में मदद करने के लिए एक विशाल अहिंसक <strong>आंदोलन</strong> का नेतृत्व किया।',
                synonyms: ['Campaign', 'Motion'],
                antonyms: ['Stillness', 'Inaction'],
                extraInfo: 'Movement is a Noun. It can refer to the act of changing physical location, or a group of people working together to advance their shared ideas.',
                extraInfoHi: 'Movement (गति/आंदोलन) एक संज्ञा है। यह शारीरिक स्थान बदलने की क्रिया, या अपने साझा विचारों को आगे बढ़ाने के लिए मिलकर काम करने वाले लोगों के समूह को संदर्भित कर सकता है।'
            },
            'anomaly/not following rules': {
                actualWord: 'Irregularity',
                pos: 'Noun',
                sentence: 'The strict auditor found a major financial <strong>irregularity</strong> in the company\'s accounting records during the inspection.',
                sentenceHi: 'सख्त ऑडिटर ने निरीक्षण के दौरान कंपनी के लेखा अभिलेखों में एक बड़ी वित्तीय <strong>अनियमितता</strong> पाई।',
                synonyms: ['Anomaly', 'Inconsistency'],
                antonyms: ['Regularity', 'Consistency'],
                extraInfo: 'Irregularity is a Noun. It refers to a state of not being regular, balanced, or following established rules; an anomaly.',
                extraInfoHi: 'Irregularity (अनियमितता/गड़बड़ी) एक संज्ञा है। यह नियमित, संतुलित या स्थापित नियमों का पालन न करने की स्थिति को संदर्भित करता है।'
            },
            'something added to complete': {
                actualWord: 'Supplement',
                pos: 'Noun/Verb',
                sentence: 'The doctor advised Vikram to take a daily vitamin <strong>supplement</strong> to quickly improve his overall health.',
                sentenceHi: 'डॉक्टर ने विक्रम को अपने समग्र स्वास्थ्य में तेजी से सुधार के लिए दैनिक विटामिन <strong>पूरक</strong> लेने की सलाह दी।',
                synonyms: ['Addition', 'Enhancement'],
                antonyms: ['Subtraction', 'Decrease'],
                extraInfo: 'Supplement is a Noun or Verb. It is something that completes or enhances something else when added to it.',
                extraInfoHi: 'Supplement (पूरक/अतिरिक्त चीज) एक संज्ञा या क्रिया है। यह कुछ ऐसा है जो किसी चीज़ में जोड़े जाने पर उसे पूरा या बेहतर बनाता है।'
            },
            'prejudice/favoritism': {
                actualWord: 'Bias',
                pos: 'Noun/Verb',
                sentence: 'The sports coach was accused of showing an unfair <strong>bias</strong> toward the players from his own hometown.',
                sentenceHi: 'खेल कोच पर अपने गृहनगर के खिलाड़ियों के प्रति अनुचित <strong>पक्षपात</strong> दिखाने का आरोप लगाया गया।',
                synonyms: ['Prejudice', 'Partiality'],
                antonyms: ['Fairness', 'Objectivity'],
                extraInfo: 'Bias is a Noun or Verb. It is an unfair prejudice in favor of or against one thing, person, or group compared with another.',
                extraInfoHi: 'Bias (पक्षपात/पूर्वाग्रह) एक संज्ञा या क्रिया है। यह एक चीज़, व्यक्ति या समूह के पक्ष में या विरुद्ध अनुचित पूर्वाग्रह है।'
            },
            'fair/impartial': {
                actualWord: 'Unbiased',
                pos: 'Adjective',
                sentence: 'The judge carefully listened to both lawyers to ensure he made a completely <strong>unbiased</strong> decision in the courtroom.',
                sentenceHi: 'न्यायाधीश ने दोनों वकीलों को ध्यान से सुना ताकि वह अदालत कक्ष में पूरी तरह से <strong>निष्पक्ष</strong> निर्णय ले सके।',
                synonyms: ['Fair', 'Impartial'],
                antonyms: ['Biased', 'Prejudiced'],
                extraInfo: 'Unbiased is an Adjective. It describes someone or something that shows no prejudice and makes fair, impartial judgments.',
                extraInfoHi: 'Unbiased (निष्पक्ष) एक विशेषण है। यह किसी ऐसे व्यक्ति या चीज़ का वर्णन करता है जो कोई पूर्वाग्रह नहीं दिखाता और निष्पक्ष निर्णय लेता है।'
            },
            'musical performance': {
                actualWord: 'Concert',
                pos: 'Noun',
                sentence: 'Sunita bought two front-row tickets to attend the spectacular live music <strong>concert</strong> of her favorite singer.',
                sentenceHi: 'सुनीता ने अपने पसंदीदा गायक के शानदार लाइव संगीत <strong>समारोह</strong> में भाग लेने के लिए दो फ्रंट-रो टिकट खरीदे।',
                synonyms: ['Musical performance', 'Show'],
                antonyms: [],
                extraInfo: 'Concert is a Noun. It is a live musical performance given in public, typically by several performers or of several separate compositions.',
                extraInfoHi: 'Concert (संगीत समारोह) एक संज्ञा है। यह सार्वजनिक रूप से दिया गया एक लाइव संगीत प्रदर्शन है, आमतौर पर कई कलाकारों या कई अलग-अलग रचनाओं द्वारा।'
            }
        };

        // Cache the vocabularyDB for external access (inline explanation toggle)
        this._vocabularyDB = vocabularyDB;

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

            // Extra info for detailed explanation - use Hindi version when available
            const extraInfoEn = wordInfo.extraInfo ? `<br><br>📖 <strong>Simple Explanation:</strong> ${wordInfo.extraInfo}` : '';
            const extraInfoHi = (wordInfo.extraInfoHi || wordInfo.extraInfo) ? `<br><br>📖 <strong>सरल व्याख्या:</strong> ${wordInfo.extraInfoHi || wordInfo.extraInfo}` : '';

            return {
                en: {
                    simple: `<strong>${displayWord}</strong> is a <span style="color:#60a5fa;">${wordInfo.pos}</span>.${extraInfoEn}<br><br>` +
                        `📝 <strong>Relatable Sentences:</strong><br>${wordInfo.sentence}<br><br>` +
                        `✅ <strong>Synonyms:</strong> ${wordInfo.synonyms.join(', ')}<br>` +
                        `❌ <strong>Antonyms:</strong> ${wordInfo.antonyms.join(', ')}`,
                    funFact: '📚 Learning synonyms & antonyms helps you express better!',
                    tip: 'Pro tip: Use new words in your daily conversations!'
                },
                hi: {
                    simple: `<strong>${displayWord}</strong> एक <span style="color:#60a5fa;">${wordInfo.pos}</span> है।${extraInfoHi}<br><br>` +
                        `📝 <strong>वाक्य:</strong><br>${hiSentence}<br><br>` +
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

    // GK explanations (Bilingual) - Enhanced for States & Capitals
    generateGKExplanation(q, answer, topic) {
        // Special handling for International Organizations HQ topic
        if (topic === 'internationalOrgs' || q.toLowerCase().includes('headquarter of')) {
            // Extract organization name from question
            const orgMatch = q.match(/headquarter of ([^\?]+)\?/i);
            const orgName = orgMatch ? orgMatch[1].split('(')[0].trim() : '';

            // City-based groupings for memory tricks
            const cityGroups = {
                'Washington DC': {
                    orgs: ['IMF', 'World Bank', 'IFC'],
                    orgsHi: ['अंतर्राष्ट्रीय मुद्रा कोष', 'विश्व बैंक', 'अंतर्राष्ट्रीय वित्त निगम'],
                    trick: '"Washington DC = Money City" - All major FINANCIAL organizations are here!',
                    trickHi: '"वाशिंगटन DC = पैसों का शहर" - सभी बड़े वित्तीय संगठन यहाँ हैं!'
                },
                'Geneva': {
                    orgs: ['WHO', 'WTO', 'ILO', 'UNHCR', 'WIPO', 'UNHRC', 'WMO'],
                    orgsHi: ['विश्व स्वास्थ्य संगठन', 'विश्व व्यापार संगठन', 'अंतर्राष्ट्रीय श्रम संगठन', 'शरणार्थी उच्चायुक्त', 'बौद्धिक संपदा संगठन', 'मानवाधिकार परिषद', 'मौसम विज्ञान संगठन'],
                    trick: '"Geneva = Neutral Switzerland = Peace & Health" - Health, Labor, Trade, Refugees all here!',
                    trickHi: '"जिनेवा = तटस्थ स्विट्जरलैंड = शांति और स्वास्थ्य" - स्वास्थ्य, श्रम, व्यापार, शरणार्थी सब यहाँ!'
                },
                'New York': {
                    orgs: ['UN', 'UNSC', 'UNICEF'],
                    orgsHi: ['संयुक्त राष्ट्र', 'सुरक्षा परिषद', 'बाल कोष'],
                    trick: '"New York = UN\'s Home" - Main UN bodies are headquartered here!',
                    trickHi: '"न्यूयॉर्क = UN का घर" - मुख्य संयुक्त राष्ट्र निकाय यहाँ हैं!'
                },
                'Vienna': {
                    orgs: ['IAEA', 'UNIDO', 'OPEC', 'UNODC'],
                    orgsHi: ['परमाणु ऊर्जा एजेंसी', 'औद्योगिक विकास संगठन', 'पेट्रोलियम निर्यातक देश', 'ड्रग्स और अपराध कार्यालय'],
                    trick: '"Vienna = Energy & Industry Hub" - Nuclear, Oil, Industry all here!',
                    trickHi: '"वियना = ऊर्जा और उद्योग केंद्र" - परमाणु, तेल, उद्योग सब यहाँ!'
                },
                'Rome': {
                    orgs: ['FAO', 'IFAD'],
                    orgsHi: ['खाद्य और कृषि संगठन', 'कृषि विकास कोष'],
                    trick: '"Rome = Food Capital" - All FOOD/Agriculture organizations are in Rome!',
                    trickHi: '"रोम = खाद्य राजधानी" - सभी खाद्य/कृषि संगठन रोम में हैं!'
                },
                'Brussels': {
                    orgs: ['EU', 'NATO', 'WCO'],
                    orgsHi: ['यूरोपीय संघ', 'नाटो', 'सीमा शुल्क संगठन'],
                    trick: '"Brussels = Heart of Europe" - European organizations are here!',
                    trickHi: '"ब्रसेल्स = यूरोप का दिल" - यूरोपीय संगठन यहाँ हैं!'
                },
                'Paris': {
                    orgs: ['UNESCO'],
                    orgsHi: ['यूनेस्को'],
                    trick: '"Paris = City of Culture" - UNESCO (Education, Science, Culture) is here!',
                    trickHi: '"पेरिस = संस्कृति का शहर" - UNESCO (शिक्षा, विज्ञान, संस्कृति) यहाँ है!'
                },
                'London': {
                    orgs: ['IMO'],
                    orgsHi: ['समुद्री संगठन'],
                    trick: '"London = Maritime Power" - Britain\'s naval history = IMO here!',
                    trickHi: '"लंदन = समुद्री शक्ति" - ब्रिटेन का नौसैनिक इतिहास = IMO यहाँ!'
                }
            };

            // Organization-specific data
            const orgsData = {
                'International Monetary Fund': {
                    abbr: 'IMF',
                    city: 'Washington DC',
                    cityHi: 'वाशिंगटन डी.सी.',
                    fact: 'IMF was established in 1944 at the Bretton Woods Conference. It has 190 member countries.',
                    factHi: 'IMF की स्थापना 1944 में ब्रेटन वुड्स सम्मेलन में हुई थी। इसके 190 सदस्य देश हैं।',
                    purpose: 'Promotes global financial stability and monetary cooperation.',
                    purposeHi: 'वैश्विक वित्तीय स्थिरता और मौद्रिक सहयोग को बढ़ावा देता है।'
                },
                'World Bank': {
                    abbr: 'WBG',
                    city: 'Washington DC',
                    cityHi: 'वाशिंगटन डी.सी.',
                    fact: 'World Bank Group provides loans and grants to governments of low and middle-income countries.',
                    factHi: 'विश्व बैंक समूह निम्न और मध्यम आय वाले देशों की सरकारों को ऋण और अनुदान प्रदान करता है।',
                    purpose: 'Aims to reduce poverty and support development.',
                    purposeHi: 'गरीबी कम करने और विकास का समर्थन करने का उद्देश्य।'
                },
                'International Finance Corporation': {
                    abbr: 'IFC',
                    city: 'Washington DC',
                    cityHi: 'वाशिंगटन डी.सी.',
                    fact: 'IFC is a member of the World Bank Group focusing on private sector development.',
                    factHi: 'IFC विश्व बैंक समूह का सदस्य है जो निजी क्षेत्र के विकास पर केंद्रित है।',
                    purpose: 'Helps developing countries by investing in private businesses.',
                    purposeHi: 'निजी व्यवसायों में निवेश करके विकासशील देशों की मदद करता है।'
                },
                'United Nations Organization': {
                    abbr: 'UN/UNO',
                    city: 'New York',
                    cityHi: 'न्यूयॉर्क',
                    fact: 'UN was established in 1945 after WWII. It has 193 member states.',
                    factHi: 'UN की स्थापना 1945 में द्वितीय विश्व युद्ध के बाद हुई। इसके 193 सदस्य देश हैं।',
                    purpose: 'Maintains international peace and security.',
                    purposeHi: 'अंतर्राष्ट्रीय शांति और सुरक्षा बनाए रखता है।'
                },
                'United Nations Security Council': {
                    abbr: 'UNSC',
                    city: 'New York',
                    cityHi: 'न्यूयॉर्क',
                    fact: 'UNSC has 5 permanent members (P5): USA, UK, France, Russia, China - each with veto power.',
                    factHi: 'UNSC के 5 स्थायी सदस्य (P5) हैं: अमेरिका, ब्रिटेन, फ्रांस, रूस, चीन - प्रत्येक के पास वीटो शक्ति।',
                    purpose: 'Responsible for maintaining international peace.',
                    purposeHi: 'अंतर्राष्ट्रीय शांति बनाए रखने का जिम्मेदार।'
                },
                'United Nations Children\'s Fund': {
                    abbr: 'UNICEF',
                    city: 'New York',
                    cityHi: 'न्यूयॉर्क',
                    fact: 'UNICEF was created in 1946 to help children affected by WWII. Won Nobel Peace Prize in 1965.',
                    factHi: 'UNICEF 1946 में WWII से प्रभावित बच्चों की मदद के लिए बनाया गया। 1965 में नोबेल शांति पुरस्कार।',
                    purpose: 'Provides humanitarian aid to children worldwide.',
                    purposeHi: 'दुनिया भर के बच्चों को मानवीय सहायता प्रदान करता है।'
                },
                'World Health Organization': {
                    abbr: 'WHO',
                    city: 'Geneva',
                    cityHi: 'जिनेवा',
                    fact: 'WHO was established in 1948. It declared COVID-19 a pandemic on 11 March 2020.',
                    factHi: 'WHO की स्थापना 1948 में हुई। इसने 11 मार्च 2020 को COVID-19 को महामारी घोषित किया।',
                    purpose: 'Directs international health within the UN system.',
                    purposeHi: 'UN प्रणाली में अंतर्राष्ट्रीय स्वास्थ्य का निर्देशन करता है।'
                },
                'International Labour Organization': {
                    abbr: 'ILO',
                    city: 'Geneva',
                    cityHi: 'जिनेवा',
                    fact: 'ILO was created in 1919 as part of Treaty of Versailles. Won Nobel Peace Prize in 1969.',
                    factHi: 'ILO 1919 में वर्साय संधि के हिस्से के रूप में बनाया गया। 1969 में नोबेल शांति पुरस्कार।',
                    purpose: 'Sets international labor standards and promotes decent work.',
                    purposeHi: 'अंतर्राष्ट्रीय श्रम मानक निर्धारित करता है और अच्छे काम को बढ़ावा देता है।'
                },
                'World Trade Organization': {
                    abbr: 'WTO',
                    city: 'Geneva',
                    cityHi: 'जिनेवा',
                    fact: 'WTO replaced GATT in 1995. It has 164 member countries.',
                    factHi: 'WTO ने 1995 में GATT की जगह ली। इसके 164 सदस्य देश हैं।',
                    purpose: 'Regulates and facilitates international trade.',
                    purposeHi: 'अंतर्राष्ट्रीय व्यापार को विनियमित और सुगम बनाता है।'
                },
                'United Nations High Commissioner for Refugees': {
                    abbr: 'UNHCR',
                    city: 'Geneva',
                    cityHi: 'जिनेवा',
                    fact: 'UNHCR was established in 1950. Has won Nobel Peace Prize twice (1954, 1981).',
                    factHi: 'UNHCR की स्थापना 1950 में हुई। दो बार नोबेल शांति पुरस्कार (1954, 1981) जीता।',
                    purpose: 'Protects and supports refugees worldwide.',
                    purposeHi: 'दुनिया भर में शरणार्थियों की सुरक्षा और समर्थन करता है।'
                },
                'World Intellectual Property Organization': {
                    abbr: 'WIPO',
                    city: 'Geneva',
                    cityHi: 'जिनेवा',
                    fact: 'WIPO was established in 1967. Administers international treaties on patents, copyrights.',
                    factHi: 'WIPO की स्थापना 1967 में हुई। पेटेंट, कॉपीराइट पर अंतर्राष्ट्रीय संधियों का प्रशासन।',
                    purpose: 'Protects intellectual property worldwide (patents, copyrights, trademarks).',
                    purposeHi: 'दुनिया भर में बौद्धिक संपदा (पेटेंट, कॉपीराइट, ट्रेडमार्क) की सुरक्षा करता है।'
                },
                'United Nations Human Rights Council': {
                    abbr: 'UNHRC',
                    city: 'Geneva',
                    cityHi: 'जिनेवा',
                    fact: 'UNHRC replaced the UN Commission on Human Rights in 2006.',
                    factHi: 'UNHRC ने 2006 में मानवाधिकार आयोग की जगह ली।',
                    purpose: 'Promotes and protects human rights globally.',
                    purposeHi: 'विश्व स्तर पर मानवाधिकारों को बढ़ावा देता है और उनकी रक्षा करता है।'
                },
                'World Meteorological Organization': {
                    abbr: 'WMO',
                    city: 'Geneva',
                    cityHi: 'जिनेवा',
                    fact: 'WMO originated from the International Meteorological Organization (1873).',
                    factHi: 'WMO की उत्पत्ति अंतर्राष्ट्रीय मौसम विज्ञान संगठन (1873) से हुई।',
                    purpose: 'Coordinates weather and climate information worldwide.',
                    purposeHi: 'दुनिया भर में मौसम और जलवायु जानकारी का समन्वय करता है।'
                },
                'United Nations Industrial Development Organization': {
                    abbr: 'UNIDO',
                    city: 'Vienna',
                    cityHi: 'वियना',
                    fact: 'UNIDO was established in 1966. It became a UN specialized agency in 1985.',
                    factHi: 'UNIDO की स्थापना 1966 में हुई। 1985 में UN विशेष एजेंसी बनी।',
                    purpose: 'Promotes industrial development in developing countries.',
                    purposeHi: 'विकासशील देशों में औद्योगिक विकास को बढ़ावा देता है।'
                },
                'International Atomic Energy Agency': {
                    abbr: 'IAEA',
                    city: 'Vienna',
                    cityHi: 'वियना',
                    fact: 'IAEA was established in 1957. Won Nobel Peace Prize in 2005.',
                    factHi: 'IAEA की स्थापना 1957 में हुई। 2005 में नोबेल शांति पुरस्कार।',
                    purpose: 'Promotes peaceful use of nuclear energy and prevents nuclear weapons.',
                    purposeHi: 'परमाणु ऊर्जा के शांतिपूर्ण उपयोग को बढ़ावा देता है और परमाणु हथियारों को रोकता है।'
                },
                'Organization of the Petroleum Exporting Countries': {
                    abbr: 'OPEC',
                    city: 'Vienna',
                    cityHi: 'वियना',
                    fact: 'OPEC was founded in 1960 by Iran, Iraq, Kuwait, Saudi Arabia, and Venezuela.',
                    factHi: 'OPEC की स्थापना 1960 में ईरान, इराक, कुवैत, सऊदी अरब और वेनेजुएला ने की।',
                    purpose: 'Coordinates petroleum policies among member oil-producing countries.',
                    purposeHi: 'सदस्य तेल उत्पादक देशों के बीच पेट्रोलियम नीतियों का समन्वय करता है।'
                },
                'United Nations Office on Drugs and Crime': {
                    abbr: 'UNODC',
                    city: 'Vienna',
                    cityHi: 'वियना',
                    fact: 'UNODC was established in 1997. It fights against illicit drugs and international crime.',
                    factHi: 'UNODC की स्थापना 1997 में हुई। यह अवैध नशीले पदार्थों और अंतर्राष्ट्रीय अपराध से लड़ता है।',
                    purpose: 'Combats drugs, crime, and terrorism globally.',
                    purposeHi: 'विश्व स्तर पर नशीले पदार्थों, अपराध और आतंकवाद से लड़ता है।'
                },
                'UNESCO': {
                    abbr: 'UNESCO',
                    city: 'Paris',
                    cityHi: 'पेरिस',
                    fact: 'UNESCO was founded in 1945. It has designated 1,199 World Heritage Sites.',
                    factHi: 'UNESCO की स्थापना 1945 में हुई। इसने 1,199 विश्व धरोहर स्थल नामित किए हैं।',
                    purpose: 'Promotes peace through education, science, culture, and communication.',
                    purposeHi: 'शिक्षा, विज्ञान, संस्कृति और संचार के माध्यम से शांति को बढ़ावा देता है।'
                },
                'International Maritime Organization': {
                    abbr: 'IMO',
                    city: 'London',
                    cityHi: 'लंदन',
                    fact: 'IMO was established in 1948 but entered into force in 1958. It has 175 member states.',
                    factHi: 'IMO की स्थापना 1948 में हुई लेकिन 1958 में लागू हुई। इसके 175 सदस्य देश हैं।',
                    purpose: 'Ensures safety and security of shipping and prevents marine pollution.',
                    purposeHi: 'जहाजरानी की सुरक्षा सुनिश्चित करता है और समुद्री प्रदूषण रोकता है।'
                },
                'Food and Agriculture Organization': {
                    abbr: 'FAO',
                    city: 'Rome',
                    cityHi: 'रोम',
                    fact: 'FAO was established in 1945. World Food Day is celebrated on 16 October (FAO founding day).',
                    factHi: 'FAO की स्थापना 1945 में हुई। विश्व खाद्य दिवस 16 अक्टूबर (FAO स्थापना दिवस) को मनाया जाता है।',
                    purpose: 'Leads international efforts to defeat hunger.',
                    purposeHi: 'भूख को हराने के अंतर्राष्ट्रीय प्रयासों का नेतृत्व करता है।'
                },
                'International Fund for Agricultural Development': {
                    abbr: 'IFAD',
                    city: 'Rome',
                    cityHi: 'रोम',
                    fact: 'IFAD was established in 1977. It focuses specifically on rural poverty.',
                    factHi: 'IFAD की स्थापना 1977 में हुई। यह विशेष रूप से ग्रामीण गरीबी पर केंद्रित है।',
                    purpose: 'Eradicates poverty and hunger in rural areas of developing countries.',
                    purposeHi: 'विकासशील देशों के ग्रामीण क्षेत्रों में गरीबी और भुखमरी उन्मूलन।'
                },
                'North Atlantic Treaty Organization': {
                    abbr: 'NATO',
                    city: 'Brussels',
                    cityHi: 'ब्रसेल्स',
                    fact: 'NATO was established in 1949. It has 32 member countries (as of 2024).',
                    factHi: 'NATO की स्थापना 1949 में हुई। इसके 32 सदस्य देश हैं (2024 तक)।',
                    purpose: 'A military alliance for collective defense of North American & European countries.',
                    purposeHi: 'उत्तरी अमेरिकी और यूरोपीय देशों की सामूहिक रक्षा के लिए सैन्य गठबंधन।'
                },
                'European Union': {
                    abbr: 'EU',
                    city: 'Brussels',
                    cityHi: 'ब्रसेल्स',
                    fact: 'EU was established in 1993 by Maastricht Treaty. It has 27 member countries.',
                    factHi: 'EU की स्थापना 1993 में मास्ट्रिच संधि द्वारा हुई। इसके 27 सदस्य देश हैं।',
                    purpose: 'Political and economic union of European countries.',
                    purposeHi: 'यूरोपीय देशों का राजनीतिक और आर्थिक संघ।'
                },
                'World Customs Organization': {
                    abbr: 'WCO',
                    city: 'Brussels',
                    cityHi: 'ब्रसेल्स',
                    fact: 'WCO was established in 1952. It represents 183 customs administrations.',
                    factHi: 'WCO की स्थापना 1952 में हुई। यह 183 सीमा शुल्क प्रशासनों का प्रतिनिधित्व करता है।',
                    purpose: 'Improves effectiveness and efficiency of customs administrations.',
                    purposeHi: 'सीमा शुल्क प्रशासनों की प्रभावशीलता और दक्षता में सुधार करता है।'
                },
                'Association of Southeast Asian Nations': {
                    abbr: 'ASEAN',
                    city: 'Jakarta',
                    cityHi: 'जकार्ता',
                    fact: 'ASEAN was founded in 1967 by Indonesia, Malaysia, Philippines, Singapore, Thailand.',
                    factHi: 'ASEAN की स्थापना 1967 में इंडोनेशिया, मलेशिया, फिलीपींस, सिंगापुर, थाईलैंड ने की।',
                    purpose: 'Promotes political and economic cooperation in Southeast Asia.',
                    purposeHi: 'दक्षिण पूर्व एशिया में राजनीतिक और आर्थिक सहयोग को बढ़ावा देता है।'
                },
                'South Asian Association for Regional Cooperation': {
                    abbr: 'SAARC',
                    city: 'Kathmandu',
                    cityHi: 'काठमांडू',
                    fact: 'SAARC was established in 1985. Has 8 member countries including India, Pakistan, Bangladesh.',
                    factHi: 'SAARC की स्थापना 1985 में हुई। भारत, पाकिस्तान, बांग्लादेश सहित 8 सदस्य देश।',
                    purpose: 'Promotes economic and regional integration in South Asia.',
                    purposeHi: 'दक्षिण एशिया में आर्थिक और क्षेत्रीय एकीकरण को बढ़ावा देता है।'
                },
                'World Wide Fund for Nature': {
                    abbr: 'WWF',
                    city: 'Gland',
                    cityHi: 'ग्लैंड',
                    fact: 'WWF was founded in 1961. Its famous panda logo was designed based on Chi Chi, a giant panda.',
                    factHi: 'WWF की स्थापना 1961 में हुई। इसका प्रसिद्ध पांडा लोगो ची ची नामक विशाल पांडा पर आधारित है।',
                    purpose: 'World\'s leading conservation organization for wildlife and environment.',
                    purposeHi: 'वन्यजीव और पर्यावरण के लिए दुनिया का अग्रणी संरक्षण संगठन।'
                },
                'International Olympic Committee': {
                    abbr: 'IOC',
                    city: 'Lausanne',
                    cityHi: 'लुसान',
                    fact: 'IOC was founded in 1894 by Pierre de Coubertin. Olympic Museum is in Lausanne.',
                    factHi: 'IOC की स्थापना 1894 में पियरे डी कूबर्टिन ने की। ओलंपिक संग्रहालय लुसान में है।',
                    purpose: 'Organizes Olympic Games and selects host cities.',
                    purposeHi: 'ओलंपिक खेलों का आयोजन करता है और मेजबान शहरों का चयन करता है।'
                },
                'United Nations Environment Programme': {
                    abbr: 'UNEP',
                    city: 'Nairobi',
                    cityHi: 'नैरोबी',
                    fact: 'UNEP was established in 1972. It is the only UN agency headquartered in Africa!',
                    factHi: 'UNEP की स्थापना 1972 में हुई। यह अफ्रीका में मुख्यालय वाली एकमात्र UN एजेंसी है!',
                    purpose: 'Coordinates UN\'s environmental activities and sustainability.',
                    purposeHi: 'UN की पर्यावरणीय गतिविधियों और स्थिरता का समन्वय करता है।'
                }
            };

            // Find the organization data
            let orgData = null;
            for (const [name, data] of Object.entries(orgsData)) {
                if (orgName.includes(name) || orgName.includes(data.abbr) ||
                    name.toLowerCase().includes(orgName.toLowerCase())) {
                    orgData = data;
                    break;
                }
            }

            // Find city group for memory trick
            let cityGroup = null;
            if (orgData) {
                cityGroup = cityGroups[orgData.city];
            }

            if (orgData) {
                return {
                    en: {
                        simple: `<strong>${orgData.abbr}</strong> is headquartered in <strong>${orgData.city}</strong>.<br><br>📌 <em>${orgData.purpose}</em>`,
                        funFact: `🏛️ ${orgData.fact}`,
                        tip: cityGroup ? `🧠 Memory Trick: ${cityGroup.trick}<br><br>📍 Other organizations in ${orgData.city}: <strong>${cityGroup.orgs.join(', ')}</strong>` : `🧠 Remember: ${orgData.abbr} = ${orgData.city}`
                    },
                    hi: {
                        simple: `<strong>${orgData.abbr}</strong> का मुख्यालय <strong>${orgData.cityHi}</strong> में है।<br><br>📌 <em>${orgData.purposeHi}</em>`,
                        funFact: `🏛️ ${orgData.factHi}`,
                        tip: cityGroup ? `🧠 याद करने की Trick: ${cityGroup.trickHi}<br><br>📍 ${orgData.cityHi} में अन्य संगठन: <strong>${cityGroup.orgsHi.join(', ')}</strong>` : `🧠 याद रखें: ${orgData.abbr} = ${orgData.cityHi}`
                    },
                    emoji: '🏛️'
                };
            }

            // Fallback for any missed organization
            return {
                en: {
                    simple: `The correct answer is <strong>${answer}</strong>.`,
                    funFact: '🌍 International organizations work together for world peace and development!',
                    tip: 'Pro tip: Group organizations by their headquarters city to remember better!'
                },
                hi: {
                    simple: `सही जवाब है <strong>${answer}</strong>।`,
                    funFact: '🌍 अंतर्राष्ट्रीय संगठन विश्व शांति और विकास के लिए मिलकर काम करते हैं!',
                    tip: 'टिप: संगठनों को उनके मुख्यालय शहर के अनुसार समूह बनाकर याद करें!'
                },
                emoji: '🏛️'
            };
        }

        // Special handling for States & Capitals topic
        if (topic === 'statesCapitals' || q.toLowerCase().includes('capital of')) {
            // Extract state name from question
            const stateMatch = q.match(/capital of ([^\?]+)\?/i);
            const stateName = stateMatch ? stateMatch[1].split('(')[0].trim() : '';

            // Comprehensive database with summer/winter capitals and facts
            const statesData = {
                'Andhra Pradesh': {
                    capital: 'Amaravati',
                    capitalHi: 'अमरावती',
                    fact: 'Amaravati is being developed as a new planned city. The Legislative Capital is Amaravati, Judicial Capital is Kurnool, and Executive functions are in Visakhapatnam.',
                    factHi: 'अमरावती एक नियोजित शहर के रूप में विकसित हो रही है। विधायी राजधानी अमरावती है, न्यायिक राजधानी कुर्नूल है, और कार्यकारी कार्य विशाखापत्तनम में होते हैं।',
                    formed: '1956 (reorganized 2014)',
                    specialNote: '3 Capitals System (Tri-capital)',
                    specialNoteHi: '3 राजधानी प्रणाली (त्रि-राजधानी)'
                },
                'Arunachal Pradesh': {
                    capital: 'Itanagar',
                    capitalHi: 'ईटानगर',
                    fact: 'Itanagar means "Fort of Bricks". The city is named after the Ita Fort, a 14th-century fort made of bricks.',
                    factHi: 'ईटानगर का अर्थ है "ईंटों का किला"। शहर का नाम 14वीं सदी के ईंटों से बने ईटा किले के नाम पर रखा गया है।',
                    formed: '1987'
                },
                'Assam': {
                    capital: 'Dispur',
                    capitalHi: 'दिसपुर',
                    fact: 'Dispur is actually a suburb of Guwahati. The capital was shifted from Shillong to Dispur in 1973.',
                    factHi: 'दिसपुर वास्तव में गुवाहाटी का एक उपनगर है। राजधानी 1973 में शिलांग से दिसपुर स्थानांतरित की गई थी।',
                    formed: '1947'
                },
                'Bihar': {
                    capital: 'Patna',
                    capitalHi: 'पटना',
                    fact: 'Patna is one of the oldest continuously inhabited cities in the world! Ancient name was Pataliputra.',
                    factHi: 'पटना दुनिया के सबसे पुराने लगातार बसे शहरों में से एक है! प्राचीन नाम पाटलिपुत्र था।',
                    formed: '1947'
                },
                'Chhattisgarh': {
                    capital: 'Raipur',
                    capitalHi: 'रायपुर',
                    fact: 'Chhattisgarh was carved out of Madhya Pradesh in 2000. It is known as the "Rice Bowl of India".',
                    factHi: 'छत्तीसगढ़ 2000 में मध्य प्रदेश से अलग हुआ। इसे "भारत का चावल का कटोरा" कहा जाता है।',
                    formed: '2000'
                },
                'Goa': {
                    capital: 'Panaji',
                    capitalHi: 'पणजी',
                    fact: 'Goa is India\'s smallest state by area. Panaji was formerly known as Panjim during Portuguese rule.',
                    factHi: 'गोवा क्षेत्रफल के हिसाब से भारत का सबसे छोटा राज्य है। पणजी को पुर्तगाली शासन में पंजिम कहा जाता था।',
                    formed: '1987'
                },
                'Gujarat': {
                    capital: 'Gandhinagar',
                    capitalHi: 'गांधीनगर',
                    fact: 'Gandhinagar is named after Mahatma Gandhi. It is one of India\'s greenest and cleanest capitals with extensive tree cover.',
                    factHi: 'गांधीनगर का नाम महात्मा गांधी के नाम पर रखा गया है। यह भारत की सबसे हरी-भरी और स्वच्छ राजधानियों में से एक है।',
                    formed: '1960'
                },
                'Haryana': {
                    capital: 'Chandigarh',
                    capitalHi: 'चंडीगढ़',
                    fact: 'Chandigarh is a Union Territory that serves as the joint capital of both Punjab and Haryana!',
                    factHi: 'चंडीगढ़ एक केंद्र शासित प्रदेश है जो पंजाब और हरियाणा दोनों की संयुक्त राजधानी है!',
                    formed: '1966',
                    specialNote: 'Shared Capital with Punjab',
                    specialNoteHi: 'पंजाब के साथ साझा राजधानी'
                },
                'Himachal Pradesh': {
                    capital: 'Shimla',
                    capitalHi: 'शिमला',
                    fact: 'Shimla was the Summer Capital of British India. Dharamshala serves as the Winter Capital (since 2017).',
                    factHi: 'शिमला ब्रिटिश भारत की ग्रीष्मकालीन राजधानी थी। धर्मशाला 2017 से शीतकालीन राजधानी है।',
                    formed: '1971',
                    summerCapital: 'Shimla',
                    winterCapital: 'Dharamshala',
                    specialNote: '2 Capitals: Summer (Shimla) & Winter (Dharamshala)',
                    specialNoteHi: '2 राजधानियां: ग्रीष्मकालीन (शिमला) और शीतकालीन (धर्मशाला)'
                },
                'Jharkhand': {
                    capital: 'Ranchi',
                    capitalHi: 'रांची',
                    fact: 'Jharkhand was carved out of Bihar in 2000. Ranchi is known as the "City of Waterfalls".',
                    factHi: 'झारखंड 2000 में बिहार से अलग हुआ। रांची को "झरनों का शहर" कहा जाता है।',
                    formed: '2000'
                },
                'Karnataka': {
                    capital: 'Bengaluru',
                    capitalHi: 'बेंगलुरु',
                    fact: 'Bengaluru is called the "Silicon Valley of India". The city was formerly known as Bangalore.',
                    factHi: 'बेंगलुरु को "भारत की सिलिकॉन वैली" कहा जाता है। शहर को पहले बैंगलोर के नाम से जाना जाता था।',
                    formed: '1956'
                },
                'Kerala': {
                    capital: 'Thiruvananthapuram',
                    capitalHi: 'तिरुवनंतपुरम',
                    fact: 'Thiruvananthapuram means "City of Lord Anantha (Vishnu)". It is home to the famous Padmanabhaswamy Temple.',
                    factHi: 'तिरुवनंतपुरम का अर्थ है "भगवान अनंत (विष्णु) का शहर"। यहाँ प्रसिद्ध पद्मनाभस्वामी मंदिर है।',
                    formed: '1956'
                },
                'Madhya Pradesh': {
                    capital: 'Bhopal',
                    capitalHi: 'भोपाल',
                    fact: 'Bhopal is known as the "City of Lakes". It has two beautiful lakes - Upper Lake and Lower Lake.',
                    factHi: 'भोपाल को "झीलों का शहर" कहा जाता है। यहाँ दो सुंदर झीलें हैं - बड़ा तालाब और छोटा तालाब।',
                    formed: '1956'
                },
                'Maharashtra': {
                    capital: 'Mumbai',
                    capitalHi: 'मुंबई',
                    fact: 'Mumbai is the Summer Capital. Nagpur serves as the Winter Capital (2nd capital) for winter session of legislature.',
                    factHi: 'मुंबई ग्रीष्मकालीन राजधानी है। नागपुर विधानमंडल के शीतकालीन सत्र के लिए शीतकालीन राजधानी (दूसरी राजधानी) है।',
                    formed: '1960',
                    summerCapital: 'Mumbai',
                    winterCapital: 'Nagpur',
                    specialNote: '2 Capitals: Summer (Mumbai) & Winter Session in Nagpur',
                    specialNoteHi: '2 राजधानियां: ग्रीष्मकालीन (मुंबई) और शीतकालीन सत्र नागपुर में'
                },
                'Manipur': {
                    capital: 'Imphal',
                    capitalHi: 'इंफाल',
                    fact: 'Imphal is surrounded by nine hills. Manipur is known for its famous Loktak Lake and Sangai deer.',
                    factHi: 'इंफाल नौ पहाड़ियों से घिरा है। मणिपुर अपनी प्रसिद्ध लोकटक झील और संगाई हिरण के लिए जाना जाता है।',
                    formed: '1972'
                },
                'Meghalaya': {
                    capital: 'Shillong',
                    capitalHi: 'शिलांग',
                    fact: 'Shillong is called the "Scotland of the East". Cherrapunji (Sohra) receives one of highest rainfalls in world.',
                    factHi: 'शिलांग को "पूर्व का स्कॉटलैंड" कहा जाता है। चेरापूंजी (सोहरा) दुनिया में सबसे ज़्यादा बारिश वाली जगहों में से एक है।',
                    formed: '1972'
                },
                'Mizoram': {
                    capital: 'Aizawl',
                    capitalHi: 'आइज़ॉल',
                    fact: 'Mizoram has the second-highest literacy rate in India (91.58%). Aizawl is built on hills.',
                    factHi: 'मिज़ोरम भारत में दूसरी सबसे ऊंची साक्षरता दर (91.58%) वाला राज्य है। आइज़ॉल पहाड़ियों पर बसा है।',
                    formed: '1987'
                },
                'Nagaland': {
                    capital: 'Kohima',
                    capitalHi: 'कोहिमा',
                    fact: 'Kohima was the site of a major WWII battle (Battle of Kohima, 1944) that stopped Japanese invasion of India.',
                    factHi: 'कोहिमा द्वितीय विश्व युद्ध की एक बड़ी लड़ाई (कोहिमा का युद्ध, 1944) का स्थल था जिसने जापानी आक्रमण रोका।',
                    formed: '1963'
                },
                'Odisha': {
                    capital: 'Bhubaneswar',
                    capitalHi: 'भुवनेश्वर',
                    fact: 'Bhubaneswar is called the "Temple City of India" with 700+ temples. Earlier capital was Cuttack.',
                    factHi: 'भुवनेश्वर को 700+ मंदिरों के साथ "भारत का मंदिर नगर" कहा जाता है। पहले राजधानी कटक थी।',
                    formed: '1947'
                },
                'Punjab': {
                    capital: 'Chandigarh',
                    capitalHi: 'चंडीगढ़',
                    fact: 'Chandigarh was designed by famous architect Le Corbusier. It is a Union Territory shared with Haryana.',
                    factHi: 'चंडीगढ़ प्रसिद्ध वास्तुकार ले कॉर्बूज़िए ने डिज़ाइन किया था। यह हरियाणा के साथ साझा केंद्र शासित प्रदेश है।',
                    formed: '1947',
                    specialNote: 'Shared Capital with Haryana',
                    specialNoteHi: 'हरियाणा के साथ साझा राजधानी'
                },
                'Rajasthan': {
                    capital: 'Jaipur',
                    capitalHi: 'जयपुर',
                    fact: 'Jaipur is called the "Pink City" because buildings were painted pink to welcome Prince Albert in 1876.',
                    factHi: 'जयपुर को "गुलाबी शहर" कहा जाता है क्योंकि 1876 में प्रिंस अल्बर्ट के स्वागत में इमारतों को गुलाबी रंग दिया गया था।',
                    formed: '1949'
                },
                'Sikkim': {
                    capital: 'Gangtok',
                    capitalHi: 'गंगटोक',
                    fact: 'Sikkim became part of India in 1975. It is the only state where Nepali is an official language.',
                    factHi: 'सिक्किम 1975 में भारत का हिस्सा बना। यह एकमात्र राज्य है जहाँ नेपाली एक आधिकारिक भाषा है।',
                    formed: '1975'
                },
                'Tamil Nadu': {
                    capital: 'Chennai',
                    capitalHi: 'चेन्नई',
                    fact: 'Chennai was formerly known as Madras. It is called the "Gateway to South India" and "Detroit of India".',
                    factHi: 'चेन्नई को पहले मद्रास कहा जाता था। इसे "दक्षिण भारत का प्रवेश द्वार" और "भारत का डेट्रॉइट" कहते हैं।',
                    formed: '1956'
                },
                'Telangana': {
                    capital: 'Hyderabad',
                    capitalHi: 'हैदराबाद',
                    fact: 'Telangana was formed in 2014 as India\'s 29th state. Hyderabad is called the "City of Pearls" and "Cyberabad".',
                    factHi: 'तेलंगाना 2014 में भारत के 29वें राज्य के रूप में बना। हैदराबाद को "मोतियों का शहर" और "साइबराबाद" कहते हैं।',
                    formed: '2014'
                },
                'Tripura': {
                    capital: 'Agartala',
                    capitalHi: 'अगरतला',
                    fact: 'Agartala is very close to Bangladesh border (only 2 km). Tripura is the third-smallest state in India.',
                    factHi: 'अगरतला बांग्लादेश सीमा के बहुत करीब है (केवल 2 किमी)। त्रिपुरा भारत का तीसरा सबसे छोटा राज्य है।',
                    formed: '1972'
                },
                'Uttar Pradesh': {
                    capital: 'Lucknow',
                    capitalHi: 'लखनऊ',
                    fact: 'Lucknow is called the "City of Nawabs" famous for its tehzeeb (culture), kebabs, and chikankari embroidery.',
                    factHi: 'लखनऊ को "नवाबों का शहर" कहा जाता है - अपनी तहज़ीब, कबाब और चिकनकारी के लिए प्रसिद्ध है।',
                    formed: '1947'
                },
                'Uttarakhand': {
                    capital: 'Dehradun',
                    capitalHi: 'देहरादून',
                    fact: 'Uttarakhand has 2 capitals: Dehradun (Winter Capital) and Gairsain (Summer Capital, declared in 2020).',
                    factHi: 'उत्तराखंड की 2 राजधानियां हैं: देहरादून (शीतकालीन) और गैरसैण (ग्रीष्मकालीन, 2020 में घोषित)।',
                    formed: '2000',
                    summerCapital: 'Gairsain (Bhararisain)',
                    winterCapital: 'Dehradun',
                    specialNote: '2 Capitals: Winter (Dehradun) & Summer (Gairsain)',
                    specialNoteHi: '2 राजधानियां: शीतकालीन (देहरादून) और ग्रीष्मकालीन (गैरसैण)'
                },
                'West Bengal': {
                    capital: 'Kolkata',
                    capitalHi: 'कोलकाता',
                    fact: 'Kolkata was the capital of British India until 1911. It is called the "City of Joy" and cultural capital of India.',
                    factHi: 'कोलकाता 1911 तक ब्रिटिश भारत की राजधानी थी। इसे "जॉय का शहर" और भारत की सांस्कृतिक राजधानी कहते हैं।',
                    formed: '1947'
                }
            };

            const stateInfo = statesData[stateName];
            if (stateInfo) {
                // Build special note section for summer/winter capitals
                let specialEn = '';
                let specialHi = '';
                if (stateInfo.specialNote) {
                    specialEn = `<br><br>🏛️ <strong>Special Note:</strong> ${stateInfo.specialNote}`;
                    specialHi = `<br><br>🏛️ <strong>विशेष:</strong> ${stateInfo.specialNoteHi}`;
                }

                return {
                    en: {
                        simple: `<strong>${stateInfo.capital}</strong> is the capital of <strong>${stateName}</strong>.${specialEn}<br><br>` +
                            `📅 <strong>State Formation:</strong> ${stateInfo.formed}`,
                        funFact: `🗺️ ${stateInfo.fact}`,
                        tip: 'Pro tip: Associate each capital with a unique fact about the state to remember better!'
                    },
                    hi: {
                        simple: `<strong>${stateInfo.capitalHi}</strong> <strong>${stateName}</strong> की राजधानी है।${specialHi}<br><br>` +
                            `📅 <strong>राज्य गठन:</strong> ${stateInfo.formed}`,
                        funFact: `🗺️ ${stateInfo.factHi}`,
                        tip: 'टिप: हर राजधानी को राज्य की एक खास बात से जोड़ो, याद रहेगा!'
                    },
                    emoji: '🗺️'
                };
            }
        }

        // Default GK explanation
        return {
            en: { simple: `The answer is <strong>${answer}</strong>. Great general knowledge fact!`, funFact: '💡 Learning new facts every day makes you smarter!', tip: 'Pro tip: Quiz yourself daily to retain information!' },
            hi: { simple: `जवाब है <strong>${answer}</strong>। बढ़िया GK है!`, funFact: '💡 रोज़ कुछ नया सीखो, तो दिमाग तेज़ होता है!', tip: 'टिप: रोज़ खुद से सवाल पूछो, याद रहेगा!' },
            emoji: '🧠'
        };
    },

    // Math explanations (Bilingual) - Enhanced with Integer Operations
    generateMathExplanation(q, answer, topic) {
        // Special handling for Integer Operations (Sign Rules)
        if (topic === 'integers' || q.includes('−') || q.includes('÷')) {
            return this.generateIntegerExplanation(q, answer);
        }

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

    // Integer Operations Explanation Generator
    generateIntegerExplanation(q, answer) {
        // Clean the question for analysis
        const cleanQ = q.replace(/\s/g, '').replace(/[()]/g, '');

        // Detect operation type
        const hasMultiply = q.includes('×');
        const hasDivide = q.includes('÷');
        const hasDoubleNeg = q.includes('−(−') || q.includes('-(−') || q.includes('− (−');
        const hasAddNeg = q.includes('+(−') || q.includes('+ (−');
        const isSubtraction = q.includes('−') && !hasMultiply && !hasDivide;
        const isAddition = q.includes('+') && !hasMultiply && !hasDivide;

        // MULTIPLICATION
        if (hasMultiply) {
            const bothNeg = (q.match(/\(−/g) || []).length >= 2;
            const oneNeg = (q.match(/\(−/g) || []).length === 1;

            if (bothNeg) {
                return {
                    en: {
                        simple: `<strong>Rule:</strong> (−) × (−) = (+)<br><br>When you multiply two negative numbers, the result is <strong>POSITIVE</strong>.<br><br>Answer: <strong>${answer}</strong>`,
                        funFact: '🧠 Think of it like this: "The enemy of my enemy is my friend" - two negatives make a positive!',
                        tip: 'Pro tip: Count the minus signs. Even number of negatives = Positive answer!'
                    },
                    hi: {
                        simple: `<strong>नियम:</strong> (−) × (−) = (+)<br><br>जब दो ऋणात्मक संख्याओं को गुणा करते हैं, तो जवाब <strong>धनात्मक</strong> होता है।<br><br>उत्तर: <strong>${answer}</strong>`,
                        funFact: '🧠 ऐसे सोचो: "दुश्मन का दुश्मन दोस्त होता है" - दो minus मिलकर plus बनते हैं!',
                        tip: 'टिप: Minus की गिनती करो। सम (even) minus = धनात्मक जवाब!'
                    },
                    emoji: '✖️'
                };
            } else if (oneNeg) {
                return {
                    en: {
                        simple: `<strong>Rule:</strong> (+) × (−) = (−) OR (−) × (+) = (−)<br><br>When you multiply a positive and a negative, the result is <strong>NEGATIVE</strong>.<br><br>Answer: <strong>${answer}</strong>`,
                        funFact: '🎯 One negative in multiplication always makes the answer negative!',
                        tip: 'Pro tip: Odd number of negatives = Negative answer!'
                    },
                    hi: {
                        simple: `<strong>नियम:</strong> (+) × (−) = (−) या (−) × (+) = (−)<br><br>जब एक धनात्मक और एक ऋणात्मक को गुणा करते हैं, तो जवाब <strong>ऋणात्मक</strong> होता है।<br><br>उत्तर: <strong>${answer}</strong>`,
                        funFact: '🎯 गुणा में एक minus हो तो जवाब हमेशा minus!',
                        tip: 'टिप: विषम (odd) minus = ऋणात्मक जवाब!'
                    },
                    emoji: '✖️'
                };
            }
        }

        // DIVISION
        if (hasDivide) {
            const bothNeg = (q.match(/\(−/g) || []).length >= 2;
            const oneNeg = (q.match(/\(−/g) || []).length === 1;

            if (bothNeg) {
                return {
                    en: {
                        simple: `<strong>Rule:</strong> (−) ÷ (−) = (+)<br><br>When you divide two negative numbers, the result is <strong>POSITIVE</strong>.<br><br>Answer: <strong>${answer}</strong>`,
                        funFact: '📊 Division follows the same sign rules as multiplication!',
                        tip: 'Pro tip: Same signs = Positive, Different signs = Negative!'
                    },
                    hi: {
                        simple: `<strong>नियम:</strong> (−) ÷ (−) = (+)<br><br>जब दो ऋणात्मक संख्याओं को भाग करते हैं, तो जवाब <strong>धनात्मक</strong> होता है।<br><br>उत्तर: <strong>${answer}</strong>`,
                        funFact: '📊 भाग में भी गुणा जैसे ही नियम लगते हैं!',
                        tip: 'टिप: समान चिह्न = धनात्मक, अलग चिह्न = ऋणात्मक!'
                    },
                    emoji: '➗'
                };
            } else if (oneNeg) {
                return {
                    en: {
                        simple: `<strong>Rule:</strong> (+) ÷ (−) = (−) OR (−) ÷ (+) = (−)<br><br>When you divide numbers with different signs, the result is <strong>NEGATIVE</strong>.<br><br>Answer: <strong>${answer}</strong>`,
                        funFact: '⚖️ Different signs always give a negative result in division!',
                        tip: 'Pro tip: Think of it as "opposites don\'t attract" in math!'
                    },
                    hi: {
                        simple: `<strong>नियम:</strong> (+) ÷ (−) = (−) या (−) ÷ (+) = (−)<br><br>जब अलग-अलग चिह्न वाली संख्याओं को भाग करते हैं, तो जवाब <strong>ऋणात्मक</strong> होता है।<br><br>उत्तर: <strong>${answer}</strong>`,
                        funFact: '⚖️ अलग चिह्न = भाग में हमेशा minus!',
                        tip: 'टिप: मैथ में भी "उल्टे attract नहीं करते"!'
                    },
                    emoji: '➗'
                };
            }
        }

        // DOUBLE NEGATIVE (Subtraction of negative)
        if (hasDoubleNeg) {
            return {
                en: {
                    simple: `<strong>Golden Rule:</strong> a − (−b) = a + b<br><br>Subtracting a negative is the SAME as ADDING!<br>"Minus minus = Plus"<br><br>Answer: <strong>${answer}</strong>`,
                    funFact: '💡 Think: If someone removes your debt (−), your money increases (+)!',
                    tip: 'Pro tip: Two minus signs next to each other always become a plus!'
                },
                hi: {
                    simple: `<strong>सुनहरा नियम:</strong> a − (−b) = a + b<br><br>ऋणात्मक घटाना = जोड़ना!<br>"माइनस माइनस = प्लस"<br><br>उत्तर: <strong>${answer}</strong>`,
                    funFact: '💡 सोचो: अगर कोई तुम्हारा कर्ज़ (−) हटा दे, तो पैसे बढ़ जाते हैं (+)!',
                    tip: 'टिप: दो minus साथ में हमेशा plus बन जाते हैं!'
                },
                emoji: '➕'
            };
        }

        // ADDING A NEGATIVE
        if (hasAddNeg) {
            return {
                en: {
                    simple: `<strong>Rule:</strong> a + (−b) = a − b<br><br>Adding a negative is the SAME as SUBTRACTING!<br><br>Answer: <strong>${answer}</strong>`,
                    funFact: '💰 Think: Adding debt (−) is like losing money!',
                    tip: 'Pro tip: Plus followed by minus = Just minus!'
                },
                hi: {
                    simple: `<strong>नियम:</strong> a + (−b) = a − b<br><br>ऋणात्मक जोड़ना = घटाना!<br><br>उत्तर: <strong>${answer}</strong>`,
                    funFact: '💰 सोचो: कर्ज़ (−) जोड़ना = पैसे खोना!',
                    tip: 'टिप: Plus के बाद minus = बस minus!'
                },
                emoji: '➖'
            };
        }

        // NEGATIVE + NEGATIVE
        if (isAddition && q.includes('(−') && (q.match(/\(−/g) || []).length >= 2) {
            return {
                en: {
                    simple: `<strong>Rule:</strong> (−a) + (−b) = −(a + b)<br><br>Adding two negatives: Add the numbers, keep the MINUS!<br><br>Answer: <strong>${answer}</strong>`,
                    funFact: '💸 Two debts added together = Bigger debt!',
                    tip: 'Pro tip: Just add normally and put minus in front!'
                },
                hi: {
                    simple: `<strong>नियम:</strong> (−a) + (−b) = −(a + b)<br><br>दो ऋणात्मक जोड़ना: संख्याएं जोड़ो, MINUS रखो!<br><br>उत्तर: <strong>${answer}</strong>`,
                    funFact: '💸 दो कर्ज़ जोड़ो = बड़ा कर्ज़!',
                    tip: 'टिप: सामान्य जोड़ करो और आगे minus लगा दो!'
                },
                emoji: '➕'
            };
        }

        // NEGATIVE + POSITIVE or POSITIVE - SOMETHING
        if ((isAddition || isSubtraction) && q.includes('(−')) {
            const answerNum = parseInt(answer);
            return {
                en: {
                    simple: `<strong>Money Analogy:</strong><br><br>• Negative (−) = Debt/Loss<br>• Positive (+) = Money/Gain<br><br>${answerNum >= 0 ? 'You ended up with money! 💰' : 'You ended up with debt! 💸'}<br><br>Answer: <strong>${answer}</strong>`,
                    funFact: '🎯 Bigger number wins! The sign follows the larger number.',
                    tip: 'Pro tip: Find the difference and take the sign of the bigger number!'
                },
                hi: {
                    simple: `<strong>पैसों की सोच:</strong><br><br>• ऋणात्मक (−) = कर्ज़/घाटा<br>• धनात्मक (+) = पैसा/फायदा<br><br>${answerNum >= 0 ? 'पैसा बचा! 💰' : 'कर्ज़ हो गया! 💸'}<br><br>उत्तर: <strong>${answer}</strong>`,
                    funFact: '🎯 बड़ी संख्या जीतती है! चिह्न बड़े वाले का लगता है।',
                    tip: 'टिप: अंतर निकालो और बड़ी संख्या का चिह्न लगाओ!'
                },
                emoji: '💰'
            };
        }

        // Default Integer explanation
        return {
            en: {
                simple: `The answer is <strong>${answer}</strong>.<br><br><strong>Sign Rules:</strong><br>• (+) × (+) = (+)<br>• (−) × (−) = (+)<br>• (+) × (−) = (−)<br>• (−) × (+) = (−)`,
                funFact: '🧠 Same signs = Positive, Different signs = Negative!',
                tip: 'Pro tip: Master these 4 rules and integers become easy!'
            },
            hi: {
                simple: `जवाब है <strong>${answer}</strong>।<br><br><strong>चिह्न नियम:</strong><br>• (+) × (+) = (+)<br>• (−) × (−) = (+)<br>• (+) × (−) = (−)<br>• (−) × (+) = (−)`,
                funFact: '🧠 समान चिह्न = धनात्मक, अलग चिह्न = ऋणात्मक!',
                tip: 'टिप: ये 4 नियम याद करो, integers आसान हो जाएंगे!'
            },
            emoji: '±'
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
    },

    // ============================================
    // PUBLIC VOCAB LOOKUP (for inline explanation toggle)
    // ============================================
    _getVocabEntry(key) {
        // If vocabularyDB hasn't been cached yet, trigger a dummy call to populate it
        if (!this._vocabularyDB) {
            this.generateEnglishExplanation({ q: '', options: [], answer: '' }, '');
        }
        if (this._vocabularyDB && this._vocabularyDB[key]) {
            return this._vocabularyDB[key];
        }
        return null;
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
