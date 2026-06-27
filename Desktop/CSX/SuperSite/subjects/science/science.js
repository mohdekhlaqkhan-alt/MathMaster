/* ============================================
   SCIENCE LAB - GAME ENGINE
   Physics, Chemistry & Biology Quizzes
   Class-wise Chapter Organization (NCERT)
   ============================================ */

// ============================================
// CLASS-WISE CHAPTER REGISTRY (NCERT Aligned)
// Each chapter's `dataKey` maps to scienceData
// ============================================
const classChapters = {
    '6': [
        { id: 'c6_ch1', name: 'Food: Where Does It Come From?', subject: 'biology', ch: 1, icon: '🍎', dataKey: null },
        { id: 'c6_ch2', name: 'Components of Food', subject: 'biology', ch: 2, icon: '🥗', dataKey: null },
        { id: 'c6_ch3', name: 'Fibre to Fabric', subject: 'chemistry', ch: 3, icon: '🧶', dataKey: null },
        { id: 'c6_ch4', name: 'Sorting Materials into Groups', subject: 'chemistry', ch: 4, icon: '📦', dataKey: null },
        { id: 'c6_ch5', name: 'Separation of Substances', subject: 'chemistry', ch: 5, icon: '🧪', dataKey: null },
        { id: 'c6_ch6', name: 'Changes Around Us', subject: 'chemistry', ch: 6, icon: '🔄', dataKey: null },
        { id: 'c6_ch6', name: 'Diversity in the Living World', subject: 'biology', cls: 6, icon: '🌱', dataKey: 'c6_plants' },
        { id: 'c6_ch8', name: 'Body Movements', subject: 'biology', ch: 8, icon: '🏃', dataKey: null },
        { id: 'c6_ch9', name: 'The Living Organisms', subject: 'biology', ch: 9, icon: '🦎', dataKey: null },
        { id: 'c6_ch10', name: 'Motion & Measurement', subject: 'physics', ch: 10, icon: '📏', dataKey: null },
        { id: 'c6_ch11', name: 'Light, Shadows & Reflections', subject: 'physics', ch: 11, icon: '🔦', dataKey: null },
        { id: 'c6_ch12', name: 'Electricity & Circuits', subject: 'physics', ch: 12, icon: '🔌', dataKey: null },
        { id: 'c6_ch13', name: 'Fun with Magnets', subject: 'physics', ch: 13, icon: '🧲', dataKey: null },
        { id: 'c6_ch14', name: 'Water', subject: 'chemistry', ch: 14, icon: '💧', dataKey: null },
        { id: 'c6_ch15', name: 'Air Around Us', subject: 'chemistry', ch: 15, icon: '💨', dataKey: null },
        { id: 'c6_ch16', name: 'Garbage In, Garbage Out', subject: 'biology', ch: 16, icon: '♻️', dataKey: null }
    ],
    '7': [
        { id: 'c7_ch1', name: 'Nutrition in Plants', subject: 'biology', ch: 1, icon: '🌿', dataKey: null },
        { id: 'c7_ch2', name: 'Nutrition in Animals', subject: 'biology', ch: 2, icon: '🐄', dataKey: null },
        { id: 'c7_ch3', name: 'Fibre to Fabric', subject: 'chemistry', ch: 3, icon: '👕', dataKey: null },
        { id: 'c7_ch4', name: 'Heat', subject: 'physics', ch: 4, icon: '🌡️', dataKey: null },
        { id: 'c7_ch5', name: 'Acids, Bases & Salts', subject: 'chemistry', ch: 5, icon: '🧫', dataKey: null },
        { id: 'c7_ch6', name: 'Physical & Chemical Changes', subject: 'chemistry', ch: 6, icon: '⚗️', dataKey: null },
        { id: 'c7_ch7', name: 'Weather, Climate & Adaptation', subject: 'biology', ch: 7, icon: '🌦️', dataKey: null },
        { id: 'c7_ch8', name: 'Winds, Storms & Cyclones', subject: 'physics', ch: 8, icon: '🌪️', dataKey: null },
        { id: 'c7_ch9', name: 'Soil', subject: 'chemistry', ch: 9, icon: '🏔️', dataKey: null },
        { id: 'c7_ch10', name: 'Respiration in Organisms', subject: 'biology', ch: 10, icon: '🫁', dataKey: null },
        { id: 'c7_ch11', name: 'Transportation in Animals & Plants', subject: 'biology', ch: 11, icon: '🩸', dataKey: null },
        { id: 'c7_ch12', name: 'Reproduction in Plants', subject: 'biology', ch: 12, icon: '🌸', dataKey: null },
        { id: 'c7_ch13', name: 'Motion & Time', subject: 'physics', ch: 13, icon: '⏱️', dataKey: null },
        { id: 'c7_ch14', name: 'Electric Current & Its Effects', subject: 'physics', ch: 14, icon: '⚡', dataKey: null },
        { id: 'c7_ch15', name: 'Light', subject: 'physics', ch: 15, icon: '💡', dataKey: null },
        { id: 'c7_ch16', name: 'Water: A Precious Resource', subject: 'chemistry', ch: 16, icon: '🚰', dataKey: null },
        { id: 'c7_ch17', name: 'Forests: Our Lifeline', subject: 'biology', ch: 17, icon: '🌳', dataKey: null },
        { id: 'c7_ch18', name: 'Wastewater Story', subject: 'chemistry', ch: 18, icon: '🏭', dataKey: null }
    ],
    '8': [
        { id: 'c8_ch1', name: 'Crop Production & Management', subject: 'biology', ch: 1, icon: '🌾', dataKey: null },
        { id: 'c8_ch2', name: 'Microorganisms: Friend & Foe', subject: 'biology', ch: 2, icon: '🦠', dataKey: null },
        { id: 'c8_ch3', name: 'Synthetic Fibres & Plastics', subject: 'chemistry', ch: 3, icon: '🧵', dataKey: null },
        { id: 'c8_ch4', name: 'Materials: Metals & Non-Metals', subject: 'chemistry', ch: 4, icon: '⚙️', dataKey: null },
        { id: 'c8_ch5', name: 'Coal & Petroleum', subject: 'chemistry', ch: 5, icon: '⛽', dataKey: null },
        { id: 'c8_ch6', name: 'Combustion & Flame', subject: 'chemistry', ch: 6, icon: '🔥', dataKey: null },
        { id: 'c8_ch7', name: 'Conservation of Plants & Animals', subject: 'biology', ch: 7, icon: '🐘', dataKey: null },
        { id: 'c8_ch8', name: 'Cell: Structure & Functions', subject: 'biology', ch: 8, icon: '🔬', dataKey: null },
        { id: 'c8_ch9', name: 'Reproduction in Animals', subject: 'biology', ch: 9, icon: '🥚', dataKey: null },
        { id: 'c8_ch10', name: 'Reaching the Age of Adolescence', subject: 'biology', ch: 10, icon: '👦', dataKey: null },
        { id: 'c8_ch11', name: 'Force & Pressure', subject: 'physics', ch: 11, icon: '💪', dataKey: null },
        { id: 'c8_ch12', name: 'Friction', subject: 'physics', ch: 12, icon: '🛞', dataKey: null },
        { id: 'c8_ch13', name: 'Sound', subject: 'physics', ch: 13, icon: '🔊', dataKey: null },
        { id: 'c8_ch14', name: 'Chemical Effects of Electric Current', subject: 'physics', ch: 14, icon: '🔋', dataKey: null },
        { id: 'c8_ch15', name: 'Some Natural Phenomena', subject: 'physics', ch: 15, icon: '⛈️', dataKey: null },
        { id: 'c8_ch16', name: 'Light', subject: 'physics', ch: 16, icon: '🌈', dataKey: null },
        { id: 'c8_ch17', name: 'Stars & the Solar System', subject: 'physics', ch: 17, icon: '🌌', dataKey: null },
        { id: 'c8_ch18', name: 'Pollution of Air & Water', subject: 'chemistry', ch: 18, icon: '🏭', dataKey: null }
    ],
    '9': [
        { id: 'c9_ch1', name: 'Matter in Our Surroundings', subject: 'chemistry', ch: 1, icon: '🧊', dataKey: 'c9_matter' },
        { id: 'c9_ch2', name: 'Is Matter Around Us Pure?', subject: 'chemistry', ch: 2, icon: '🔍', dataKey: null },
        { id: 'c9_ch3', name: 'Atoms & Molecules', subject: 'chemistry', ch: 3, icon: '⚛️', dataKey: null },
        { id: 'c9_ch4', name: 'Structure of the Atom', subject: 'chemistry', ch: 4, icon: '🔮', dataKey: 'c9_atom' },
        { id: 'c9_ch5', name: 'The Fundamental Unit of Life', subject: 'biology', ch: 5, icon: '🦠', dataKey: null },
        { id: 'c9_ch6', name: 'Tissues', subject: 'biology', ch: 6, icon: '🧬', dataKey: null },
        { id: 'c9_ch7', name: 'Diversity in Living Organisms', subject: 'biology', ch: 7, icon: '🦋', dataKey: null },
        { id: 'c9_ch8', name: 'Motion', subject: 'physics', ch: 8, icon: '🏃', dataKey: null },
        { id: 'c9_ch9', name: 'Force & Laws of Motion', subject: 'physics', ch: 9, icon: '🚀', dataKey: null },
        { id: 'c9_ch10', name: 'Gravitation', subject: 'physics', ch: 10, icon: '🍎', dataKey: null },
        { id: 'c9_ch11', name: 'Work & Energy', subject: 'physics', ch: 11, icon: '⚡', dataKey: null },
        { id: 'c9_ch12', name: 'Sound', subject: 'physics', ch: 12, icon: '🔊', dataKey: null },
        { id: 'c9_ch13', name: 'Why Do We Fall Ill?', subject: 'biology', ch: 13, icon: '🏥', dataKey: null },
        { id: 'c9_ch14', name: 'Natural Resources', subject: 'biology', ch: 14, icon: '🌍', dataKey: null },
        { id: 'c9_ch15', name: 'Improvement in Food Resources', subject: 'biology', ch: 15, icon: '🌽', dataKey: null }
    ],
    '10': [
        { id: 'c10_ch1', name: 'Chemical Reactions & Equations', subject: 'chemistry', ch: 1, icon: '⚗️', dataKey: 'c10_chemical_reactions' },
        { id: 'c10_ch2', name: 'Acids, Bases & Salts', subject: 'chemistry', ch: 2, icon: '🧫', dataKey: 'c10_acids_bases' },
        { id: 'c10_ch3', name: 'Metals & Non-Metals', subject: 'chemistry', ch: 3, icon: '⚙️', dataKey: null },
        { id: 'c10_ch4', name: 'Carbon & Its Compounds', subject: 'chemistry', ch: 4, icon: '💎', dataKey: null },
        { id: 'c10_ch5', name: 'Periodic Classification of Elements', subject: 'chemistry', ch: 5, icon: '📊', dataKey: null },
        { id: 'c10_ch6', name: 'Life Processes', subject: 'biology', ch: 6, icon: '🫀', dataKey: null },
        { id: 'c10_ch7', name: 'Control & Coordination', subject: 'biology', ch: 7, icon: '🧠', dataKey: null },
        { id: 'c10_ch8', name: 'How Do Organisms Reproduce?', subject: 'biology', ch: 8, icon: '🌸', dataKey: null },
        { id: 'c10_ch9', name: 'Heredity & Evolution', subject: 'biology', ch: 9, icon: '🧬', dataKey: null },
        { id: 'c10_ch10', name: 'Light: Reflection & Refraction', subject: 'physics', ch: 10, icon: '🔭', dataKey: null },
        { id: 'c10_ch11', name: 'The Human Eye', subject: 'physics', ch: 11, icon: '👁️', dataKey: null },
        { id: 'c10_ch12', name: 'Electricity', subject: 'physics', ch: 12, icon: '🔌', dataKey: null },
        { id: 'c10_ch13', name: 'Magnetic Effects of Electric Current', subject: 'physics', ch: 13, icon: '🧲', dataKey: null }
    ],
    'other': [
        { id: 'forces', name: 'Forces & Motion', subject: 'physics', icon: '⚡', dataKey: 'forces' },
        { id: 'electricity', name: 'Electricity & Circuits', subject: 'physics', icon: '🔌', dataKey: 'electricity' },
        { id: 'light', name: 'Light & Optics', subject: 'physics', icon: '💡', dataKey: 'light' },
        { id: 'elements', name: 'Periodic Table', subject: 'chemistry', icon: '⚛️', dataKey: 'elements' },
        { id: 'reactions', name: 'Chemical Reactions', subject: 'chemistry', icon: '🧪', dataKey: 'reactions' },
        { id: 'compounds', name: 'Compounds & Formulas', subject: 'chemistry', icon: '🔗', dataKey: 'compounds' },
        { id: 'cells', name: 'Cell Structure', subject: 'biology', icon: '🦠', dataKey: 'cells' },
        { id: 'human', name: 'Human Body', subject: 'biology', icon: '🫀', dataKey: 'human' },
        { id: 'ecology', name: 'Ecology & Environment', subject: 'biology', icon: '🌿', dataKey: 'ecology' }
    ]
};

// ============================================
// SCIENCE DATA
// ============================================
const scienceData = {
    "forces": {
        "title": "Forces & Motion",
        "category": "Physics",
        "emoji": "⚡",
        "xpPerQuestion": 15,
        "questions": [
            {
                "q": "What is the SI unit of force?\n(बल की SI इकाई क्या है?)",
                "options": [
                    "Watt (वाट)",
                    "Newton (न्यूटन)",
                    "Joule (जूल)",
                    "Pascal (पास्कल)"
                ],
                "answer": "Newton (न्यूटन)"
            },
            {
                "q": "Who discovered the laws of motion?\n(गति के नियमों की खोज किसने की?)",
                "options": [
                    "Einstein (आइंस्टीन)",
                    "Newton (न्यूटन)",
                    "Galileo (गैलीलियो)",
                    "Faraday (फैराडे)"
                ],
                "answer": "Newton (न्यूटन)"
            },
            {
                "q": "What is the formula for force?\n(बल का सूत्र क्या है?)",
                "options": [
                    "F = ma",
                    "F = mv",
                    "F = mg",
                    "F = m/a"
                ],
                "answer": "F = ma"
            },
            {
                "q": "Friction always acts in which direction?\n(घर्षण हमेशा किस दिशा में कार्य करता है?)",
                "options": [
                    "Same as motion (गति की दिशा में)",
                    "Opposite to motion (गति के विपरीत)",
                    "Perpendicular (लंबवत)",
                    "Random (यादृच्छिक)"
                ],
                "answer": "Opposite to motion (गति के विपरीत)"
            },
            {
                "q": "What is the acceleration due to gravity on Earth?\n(पृथ्वी पर गुरुत्वाकर्षण के कारण त्वरण क्या है?)",
                "options": [
                    "9.8 m/s²",
                    "10.8 m/s²",
                    "8.9 m/s²",
                    "11 m/s²"
                ],
                "answer": "9.8 m/s²"
            },
            {
                "q": "Newton's first law is also called?\n(न्यूटन का पहला नियम क्या कहलाता है?)",
                "options": [
                    "Law of Inertia (जड़त्व का नियम)",
                    "Law of Motion (गति का नियम)",
                    "Law of Force (बल का नियम)",
                    "Law of Mass (द्रव्यमान का नियम)"
                ],
                "answer": "Law of Inertia (जड़त्व का नियम)"
            },
            {
                "q": "Weight is a type of?\n(भार किसका प्रकार है?)",
                "options": [
                    "Mass (द्रव्यमान)",
                    "Force (बल)",
                    "Volume (आयतन)",
                    "Density (घनत्व)"
                ],
                "answer": "Force (बल)"
            },
            {
                "q": "What happens when net force is zero?\n(जब कुल बल शून्य हो तो क्या होता है?)",
                "options": [
                    "Object accelerates (वस्तु त्वरित होती है)",
                    "Object stops (वस्तु रुकती है)",
                    "Object moves at constant velocity (वस्तु समान वेग से चलती है)",
                    "Object reverses (वस्तु पलटती है)"
                ],
                "answer": "Object moves at constant velocity (वस्तु समान वेग से चलती है)"
            },
            {
                "q": "Action and reaction forces are described by?\n(क्रिया और प्रतिक्रिया बलों का वर्णन किस नियम में है?)",
                "options": [
                    "1st law (पहला नियम)",
                    "2nd law (दूसरा नियम)",
                    "3rd law (तीसरा नियम)",
                    "4th law (चौथा नियम)"
                ],
                "answer": "3rd law (तीसरा नियम)"
            },
            {
                "q": "Momentum = ?\n(संवेग = ?)",
                "options": [
                    "m × v (द्रव्यमान × वेग)",
                    "m × a (द्रव्यमान × त्वरण)",
                    "m × g (द्रव्यमान × g)",
                    "v × a (वेग × त्वरण)"
                ],
                "answer": "m × v (द्रव्यमान × वेग)"
            }
        ]
    },
    "electricity": {
        "title": "Electricity & Circuits",
        "category": "Physics",
        "emoji": "🔌",
        "xpPerQuestion": 20,
        "questions": [
            {
                "q": "What is the SI unit of electric current?\n(विद्युत धारा की SI इकाई क्या है?)",
                "options": [
                    "Volt (वोल्ट)",
                    "Ampere (एम्पियर)",
                    "Ohm (ओम)",
                    "Watt (वाट)"
                ],
                "answer": "Ampere (एम्पियर)"
            },
            {
                "q": "Ohm's Law states V = ?\n(ओम का नियम V = ?)",
                "options": [
                    "IR",
                    "I/R",
                    "R/I",
                    "I+R"
                ],
                "answer": "IR"
            },
            {
                "q": "What is the unit of resistance?\n(प्रतिरोध की इकाई क्या है?)",
                "options": [
                    "Ampere (एम्पियर)",
                    "Volt (वोल्ट)",
                    "Ohm (ओम)",
                    "Watt (वाट)"
                ],
                "answer": "Ohm (ओम)"
            },
            {
                "q": "In a series circuit, current is?\n(श्रेणी परिपथ में धारा कैसी होती है?)",
                "options": [
                    "Same everywhere (हर जगह समान)",
                    "Different (अलग-अलग)",
                    "Zero (शून्य)",
                    "Infinite (अनंत)"
                ],
                "answer": "Same everywhere (हर जगह समान)"
            },
            {
                "q": "What type of current flows in batteries?\n(बैटरी में किस प्रकार की धारा बहती है?)",
                "options": [
                    "AC (प्रत्यावर्ती धारा)",
                    "DC (दिष्ट धारा)",
                    "Both (दोनों)",
                    "Neither (कोई नहीं)"
                ],
                "answer": "DC (दिष्ट धारा)"
            },
            {
                "q": "Electric power = ?\n(विद्युत शक्ति = ?)",
                "options": [
                    "V × I",
                    "V / I",
                    "V + I",
                    "V - I"
                ],
                "answer": "V × I"
            },
            {
                "q": "What device measures current?\n(कौन सा उपकरण धारा मापता है?)",
                "options": [
                    "Voltmeter (वोल्टमीटर)",
                    "Ammeter (एमीटर)",
                    "Ohmmeter (ओममीटर)",
                    "Thermometer (थर्मामीटर)"
                ],
                "answer": "Ammeter (एमीटर)"
            },
            {
                "q": "Insulators have what kind of resistance?\n(कुचालकों में प्रतिरोध कैसा होता है?)",
                "options": [
                    "Low (कम)",
                    "High (उच्च)",
                    "Zero (शून्य)",
                    "Negative (ऋणात्मक)"
                ],
                "answer": "High (उच्च)"
            },
            {
                "q": "1 kilowatt = ?\n(1 किलोवाट = ?)",
                "options": [
                    "100 W",
                    "1000 W",
                    "10 W",
                    "10000 W"
                ],
                "answer": "1000 W"
            },
            {
                "q": "What flows in an electric circuit?\n(विद्युत परिपथ में क्या बहता है?)",
                "options": [
                    "Protons (प्रोटॉन)",
                    "Neutrons (न्यूट्रॉन)",
                    "Electrons (इलेक्ट्रॉन)",
                    "Photons (फोटॉन)"
                ],
                "answer": "Electrons (इलेक्ट्रॉन)"
            }
        ]
    },
    "light": {
        "title": "Light & Optics",
        "category": "Physics",
        "emoji": "💡",
        "xpPerQuestion": 20,
        "questions": [
            {
                "q": "Light travels fastest in?\n(प्रकाश सबसे तेज़ कहाँ चलता है?)",
                "options": [
                    "Water (पानी)",
                    "Glass (कांच)",
                    "Vacuum (निर्वात)",
                    "Air (हवा)"
                ],
                "answer": "Vacuum (निर्वात)"
            },
            {
                "q": "What is the speed of light?\n(प्रकाश की गति क्या है?)",
                "options": [
                    "3×10⁸ m/s",
                    "3×10⁶ m/s",
                    "3×10⁴ m/s",
                    "3×10² m/s"
                ],
                "answer": "3×10⁸ m/s"
            },
            {
                "q": "A concave mirror is used in?\n(अवतल दर्पण का उपयोग कहाँ होता है?)",
                "options": [
                    "Rearview mirror (पीछे का दर्पण)",
                    "Torch (टॉर्च)",
                    "Sunglasses (धूप का चश्मा)",
                    "Telescope (दूरबीन)"
                ],
                "answer": "Torch (टॉर्च)"
            },
            {
                "q": "Splitting of light into colors is called?\n(प्रकाश का रंगों में विभाजन क्या कहलाता है?)",
                "options": [
                    "Reflection (परावर्तन)",
                    "Refraction (अपवर्तन)",
                    "Dispersion (विक्षेपण)",
                    "Diffraction (विवर्तन)"
                ],
                "answer": "Dispersion (विक्षेपण)"
            },
            {
                "q": "Rainbow has how many colors?\n(इंद्रधनुष में कितने रंग होते हैं?)",
                "options": [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                "answer": "7"
            },
            {
                "q": "When light bounces back, it's called?\n(जब प्रकाश वापस उछलता है, इसे क्या कहते हैं?)",
                "options": [
                    "Refraction (अपवर्तन)",
                    "Reflection (परावर्तन)",
                    "Absorption (अवशोषण)",
                    "Transmission (संचरण)"
                ],
                "answer": "Reflection (परावर्तन)"
            },
            {
                "q": "Lens used to correct myopia?\n(निकट दृष्टि दोष को ठीक करने के लिए कौन सा लेंस?)",
                "options": [
                    "Convex (उत्तल)",
                    "Concave (अवतल)",
                    "Plano (समतल)",
                    "Cylindrical (बेलनाकार)"
                ],
                "answer": "Concave (अवतल)"
            },
            {
                "q": "Image in plane mirror is?\n(समतल दर्पण में प्रतिबिंब कैसा होता है?)",
                "options": [
                    "Real (वास्तविक)",
                    "Virtual (आभासी)",
                    "Inverted (उल्टा)",
                    "Magnified (आवर्धित)"
                ],
                "answer": "Virtual (आभासी)"
            },
            {
                "q": "Which color bends most during refraction?\n(अपवर्तन में कौन सा रंग सबसे अधिक मुड़ता है?)",
                "options": [
                    "Red (लाल)",
                    "Yellow (पीला)",
                    "Green (हरा)",
                    "Violet (बैंगनी)"
                ],
                "answer": "Violet (बैंगनी)"
            },
            {
                "q": "Total internal reflection requires?\n(पूर्ण आंतरिक परावर्तन के लिए क्या आवश्यक है?)",
                "options": [
                    "Dense to rarer medium (सघन से विरल माध्यम)",
                    "Rarer to denser (विरल से सघन)",
                    "Same medium (समान माध्यम)",
                    "Vacuum (निर्वात)"
                ],
                "answer": "Dense to rarer medium (सघन से विरल माध्यम)"
            }
        ]
    },
    "elements": {
        "title": "Periodic Table",
        "category": "Chemistry",
        "emoji": "⚛️",
        "xpPerQuestion": 15,
        "questions": [
            {
                "q": "Symbol for Gold?\n(सोने का प्रतीक?)",
                "options": [
                    "Go",
                    "Gd",
                    "Au",
                    "Ag"
                ],
                "answer": "Au"
            },
            {
                "q": "Atomic number of Carbon?\n(कार्बन की परमाणु संख्या?)",
                "options": [
                    "4",
                    "6",
                    "8",
                    "12"
                ],
                "answer": "6"
            },
            {
                "q": "Which is the lightest element?\n(सबसे हल्का तत्व कौन सा है?)",
                "options": [
                    "Helium (हीलियम)",
                    "Hydrogen (हाइड्रोजन)",
                    "Lithium (लिथियम)",
                    "Oxygen (ऑक्सीजन)"
                ],
                "answer": "Hydrogen (हाइड्रोजन)"
            },
            {
                "q": "Symbol for Iron?\n(लोहे का प्रतीक?)",
                "options": [
                    "Ir",
                    "Fe",
                    "I",
                    "In"
                ],
                "answer": "Fe"
            },
            {
                "q": "Which element has atomic number 8?\n(किस तत्व की परमाणु संख्या 8 है?)",
                "options": [
                    "Nitrogen (नाइट्रोजन)",
                    "Carbon (कार्बन)",
                    "Oxygen (ऑक्सीजन)",
                    "Fluorine (फ्लोरीन)"
                ],
                "answer": "Oxygen (ऑक्सीजन)"
            },
            {
                "q": "Na is the symbol for?\n(Na किसका प्रतीक है?)",
                "options": [
                    "Nitrogen (नाइट्रोजन)",
                    "Sodium (सोडियम)",
                    "Neon (नियॉन)",
                    "Nickel (निकल)"
                ],
                "answer": "Sodium (सोडियम)"
            },
            {
                "q": "Most abundant element in Earth's crust?\n(पृथ्वी की पपड़ी में सबसे अधिक तत्व?)",
                "options": [
                    "Iron (लोहा)",
                    "Silicon (सिलिकॉन)",
                    "Oxygen (ऑक्सीजन)",
                    "Aluminum (एल्युमीनियम)"
                ],
                "answer": "Oxygen (ऑक्सीजन)"
            },
            {
                "q": "Which gas is called \"Noble Gas\"?\n(किस गैस को \"उत्कृष्ट गैस\" कहते हैं?)",
                "options": [
                    "Oxygen (ऑक्सीजन)",
                    "Nitrogen (नाइट्रोजन)",
                    "Helium (हीलियम)",
                    "Hydrogen (हाइड्रोजन)"
                ],
                "answer": "Helium (हीलियम)"
            },
            {
                "q": "Symbol for Silver?\n(चांदी का प्रतीक?)",
                "options": [
                    "Si",
                    "Sr",
                    "Ag",
                    "Au"
                ],
                "answer": "Ag"
            },
            {
                "q": "Atomic number equals number of?\n(परमाणु संख्या किसकी संख्या के बराबर होती है?)",
                "options": [
                    "Electrons (इलेक्ट्रॉन)",
                    "Neutrons (न्यूट्रॉन)",
                    "Protons (प्रोटॉन)",
                    "Both A & C (A और C दोनों)"
                ],
                "answer": "Both A & C (A और C दोनों)"
            }
        ]
    },
    "reactions": {
        "title": "Chemical Reactions",
        "category": "Chemistry",
        "emoji": "🧪",
        "xpPerQuestion": 20,
        "questions": [
            {
                "q": "Rusting is an example of?\n(जंग लगना किसका उदाहरण है?)",
                "options": [
                    "Reduction (अपचयन)",
                    "Oxidation (ऑक्सीकरण)",
                    "Neutralization (उदासीनीकरण)",
                    "Decomposition (अपघटन)"
                ],
                "answer": "Oxidation (ऑक्सीकरण)"
            },
            {
                "q": "Acid + Base = ?\n(अम्ल + क्षार = ?)",
                "options": [
                    "Salt + Water (लवण + पानी)",
                    "Salt + Gas (लवण + गैस)",
                    "Acid + Gas (अम्ल + गैस)",
                    "Base + Water (क्षार + पानी)"
                ],
                "answer": "Salt + Water (लवण + पानी)"
            },
            {
                "q": "pH of pure water is?\n(शुद्ध पानी का pH क्या है?)",
                "options": [
                    "0",
                    "7",
                    "14",
                    "1"
                ],
                "answer": "7"
            },
            {
                "q": "Which gas is released when acid reacts with metal?\n(अम्ल धातु के साथ अभिक्रिया करने पर कौन सी गैस निकलती है?)",
                "options": [
                    "Oxygen (ऑक्सीजन)",
                    "Hydrogen (हाइड्रोजन)",
                    "Nitrogen (नाइट्रोजन)",
                    "Carbon dioxide (कार्बन डाइऑक्साइड)"
                ],
                "answer": "Hydrogen (हाइड्रोजन)"
            },
            {
                "q": "Photosynthesis is what type of reaction?\n(प्रकाश संश्लेषण किस प्रकार की अभिक्रिया है?)",
                "options": [
                    "Exothermic (ऊष्माक्षेपी)",
                    "Endothermic (ऊष्माशोषी)",
                    "Neutral (उदासीन)",
                    "Combustion (दहन)"
                ],
                "answer": "Endothermic (ऊष्माशोषी)"
            },
            {
                "q": "Burning of wood is?\n(लकड़ी का जलना क्या है?)",
                "options": [
                    "Physical change (भौतिक परिवर्तन)",
                    "Chemical change (रासायनिक परिवर्तन)",
                    "No change (कोई परिवर्तन नहीं)",
                    "Reversible (उत्क्रमणीय)"
                ],
                "answer": "Chemical change (रासायनिक परिवर्तन)"
            },
            {
                "q": "Catalyst does what to a reaction?\n(उत्प्रेरक अभिक्रिया में क्या करता है?)",
                "options": [
                    "Slows it (धीमा करता है)",
                    "Speeds it (तेज करता है)",
                    "Stops it (रोकता है)",
                    "Reverses it (उलटता है)"
                ],
                "answer": "Speeds it (तेज करता है)"
            },
            {
                "q": "pH less than 7 indicates?\n(pH 7 से कम क्या दर्शाता है?)",
                "options": [
                    "Base (क्षार)",
                    "Acid (अम्ल)",
                    "Neutral (उदासीन)",
                    "Salt (लवण)"
                ],
                "answer": "Acid (अम्ल)"
            },
            {
                "q": "Sodium + Water produces?\n(सोडियम + पानी से क्या बनता है?)",
                "options": [
                    "Hydrogen (हाइड्रोजन)",
                    "Oxygen (ऑक्सीजन)",
                    "Nitrogen (नाइट्रोजन)",
                    "Carbon dioxide (कार्बन डाइऑक्साइड)"
                ],
                "answer": "Hydrogen (हाइड्रोजन)"
            },
            {
                "q": "Baking soda is chemically?\n(बेकिंग सोडा रासायनिक रूप से क्या है?)",
                "options": [
                    "NaCl",
                    "NaHCO₃",
                    "Na₂CO₃",
                    "NaOH"
                ],
                "answer": "NaHCO₃"
            }
        ]
    },
    "compounds": {
        "title": "Compounds & Formulas",
        "category": "Chemistry",
        "emoji": "🔗",
        "xpPerQuestion": 25,
        "questions": [
            {
                "q": "Formula for Water?\n(पानी का सूत्र?)",
                "options": [
                    "H₂O",
                    "HO₂",
                    "OH",
                    "H₃O"
                ],
                "answer": "H₂O"
            },
            {
                "q": "Formula for Carbon dioxide?\n(कार्बन डाइऑक्साइड का सूत्र?)",
                "options": [
                    "CO",
                    "CO₂",
                    "C₂O",
                    "CO₃"
                ],
                "answer": "CO₂"
            },
            {
                "q": "Formula for Table Salt?\n(नमक का सूत्र?)",
                "options": [
                    "NaCl",
                    "KCl",
                    "CaCl₂",
                    "NaOH"
                ],
                "answer": "NaCl"
            },
            {
                "q": "H₂SO₄ is?\n(H₂SO₄ क्या है?)",
                "options": [
                    "Hydrochloric acid (हाइड्रोक्लोरिक अम्ल)",
                    "Sulphuric acid (सल्फ्यूरिक अम्ल)",
                    "Nitric acid (नाइट्रिक अम्ल)",
                    "Acetic acid (एसिटिक अम्ल)"
                ],
                "answer": "Sulphuric acid (सल्फ्यूरिक अम्ल)"
            },
            {
                "q": "Formula for Glucose?\n(ग्लूकोज़ का सूत्र?)",
                "options": [
                    "C₆H₁₂O₆",
                    "C₆H₆O₆",
                    "C₁₂H₂₂O₁₁",
                    "CH₄"
                ],
                "answer": "C₆H₁₂O₆"
            },
            {
                "q": "CaCO₃ is called?\n(CaCO₃ क्या कहलाता है?)",
                "options": [
                    "Quick lime (चूना)",
                    "Limestone (चूना पत्थर)",
                    "Slaked lime (बुझा हुआ चूना)",
                    "Chalk powder (खड़िया पाउडर)"
                ],
                "answer": "Limestone (चूना पत्थर)"
            },
            {
                "q": "Formula for Ammonia?\n(अमोनिया का सूत्र?)",
                "options": [
                    "NH₃",
                    "NO₂",
                    "N₂O",
                    "NH₄"
                ],
                "answer": "NH₃"
            },
            {
                "q": "Molecular formula of Methane?\n(मीथेन का आणविक सूत्र?)",
                "options": [
                    "CH₄",
                    "C₂H₆",
                    "C₂H₄",
                    "C₃H₈"
                ],
                "answer": "CH₄"
            },
            {
                "q": "NaOH is called?\n(NaOH क्या कहलाता है?)",
                "options": [
                    "Sodium chloride (सोडियम क्लोराइड)",
                    "Caustic soda (कास्टिक सोडा)",
                    "Baking soda (बेकिंग सोडा)",
                    "Washing soda (धोने का सोडा)"
                ],
                "answer": "Caustic soda (कास्टिक सोडा)"
            },
            {
                "q": "Chemical name of Bleaching Powder?\n(विरंजक चूर्ण का रासायनिक नाम?)",
                "options": [
                    "Calcium hypochlorite (कैल्शियम हाइपोक्लोराइट)",
                    "Sodium hypochlorite (सोडियम हाइपोक्लोराइट)",
                    "Calcium carbonate (कैल्शियम कार्बोनेट)",
                    "Sodium carbonate (सोडियम कार्बोनेट)"
                ],
                "answer": "Calcium hypochlorite (कैल्शियम हाइपोक्लोराइट)"
            }
        ]
    },
    "cells": {
        "title": "Cell Structure",
        "category": "Biology",
        "emoji": "🦠",
        "xpPerQuestion": 15,
        "questions": [
            {
                "q": "Who discovered cells?\n(कोशिकाओं की खोज किसने की?)",
                "options": [
                    "Darwin (डार्विन)",
                    "Hooke (हुक)",
                    "Mendel (मेंडल)",
                    "Watson (वॉटसन)"
                ],
                "answer": "Hooke (हुक)"
            },
            {
                "q": "Powerhouse of the cell?\n(कोशिका का पावरहाउस?)",
                "options": [
                    "Nucleus (केंद्रक)",
                    "Mitochondria (माइटोकॉन्ड्रिया)",
                    "Ribosome (राइबोसोम)",
                    "Chloroplast (हरितलवक)"
                ],
                "answer": "Mitochondria (माइटोकॉन्ड्रिया)"
            },
            {
                "q": "Which organelle contains DNA?\n(किस अंगक में DNA होता है?)",
                "options": [
                    "Ribosome (राइबोसोम)",
                    "Lysosome (लाइसोसोम)",
                    "Nucleus (केंद्रक)",
                    "Vacuole (रिक्तिका)"
                ],
                "answer": "Nucleus (केंद्रक)"
            },
            {
                "q": "Plant cells have which unique organelle?\n(पादप कोशिकाओं में कौन सा विशेष अंगक होता है?)",
                "options": [
                    "Mitochondria (माइटोकॉन्ड्रिया)",
                    "Chloroplast (हरितलवक)",
                    "Nucleus (केंद्रक)",
                    "Ribosome (राइबोसोम)"
                ],
                "answer": "Chloroplast (हरितलवक)"
            },
            {
                "q": "Cell membrane is also called?\n(कोशिका झिल्ली को और क्या कहते हैं?)",
                "options": [
                    "Cell wall (कोशिका भित्ति)",
                    "Plasma membrane (प्लाज़्मा झिल्ली)",
                    "Nuclear membrane (केंद्रक झिल्ली)",
                    "Tonoplast (टोनोप्लास्ट)"
                ],
                "answer": "Plasma membrane (प्लाज़्मा झिल्ली)"
            },
            {
                "q": "Ribosomes are responsible for?\n(राइबोसोम किसके लिए जिम्मेदार हैं?)",
                "options": [
                    "Digestion (पाचन)",
                    "Protein synthesis (प्रोटीन संश्लेषण)",
                    "Respiration (श्वसन)",
                    "Photosynthesis (प्रकाश संश्लेषण)"
                ],
                "answer": "Protein synthesis (प्रोटीन संश्लेषण)"
            },
            {
                "q": "Suicide bags of the cell are?\n(कोशिका की आत्मघाती थैलियाँ कौन सी हैं?)",
                "options": [
                    "Ribosomes (राइबोसोम)",
                    "Lysosomes (लाइसोसोम)",
                    "Vacuoles (रिक्तिकाएँ)",
                    "Mitochondria (माइटोकॉन्ड्रिया)"
                ],
                "answer": "Lysosomes (लाइसोसोम)"
            },
            {
                "q": "Largest cell organelle?\n(सबसे बड़ा कोशिका अंगक?)",
                "options": [
                    "Mitochondria (माइटोकॉन्ड्रिया)",
                    "Nucleus (केंद्रक)",
                    "Vacuole (रिक्तिका)",
                    "Golgi body (गॉल्जी बॉडी)"
                ],
                "answer": "Nucleus (केंद्रक)"
            },
            {
                "q": "Animal cells lack?\n(जंतु कोशिकाओं में क्या नहीं होता?)",
                "options": [
                    "Nucleus (केंद्रक)",
                    "Cell wall (कोशिका भित्ति)",
                    "Mitochondria (माइटोकॉन्ड्रिया)",
                    "Cytoplasm (कोशिका द्रव्य)"
                ],
                "answer": "Cell wall (कोशिका भित्ति)"
            },
            {
                "q": "Basic unit of life?\n(जीवन की मूल इकाई?)",
                "options": [
                    "Atom (परमाणु)",
                    "Molecule (अणु)",
                    "Cell (कोशिका)",
                    "Tissue (ऊतक)"
                ],
                "answer": "Cell (कोशिका)"
            }
        ]
    },
    "human": {
        "title": "Human Body",
        "category": "Biology",
        "emoji": "🫀",
        "xpPerQuestion": 20,
        "questions": [
            {
                "q": "Largest organ of the human body?\n(मानव शरीर का सबसे बड़ा अंग?)",
                "options": [
                    "Liver (यकृत)",
                    "Brain (मस्तिष्क)",
                    "Skin (त्वचा)",
                    "Heart (हृदय)"
                ],
                "answer": "Skin (त्वचा)"
            },
            {
                "q": "How many bones in adult human body?\n(वयस्क मानव शरीर में कितनी हड्डियाँ होती हैं?)",
                "options": [
                    "206",
                    "300",
                    "180",
                    "250"
                ],
                "answer": "206"
            },
            {
                "q": "Which blood type is universal donor?\n(कौन सा रक्त समूह सार्वभौमिक दाता है?)",
                "options": [
                    "A",
                    "B",
                    "AB",
                    "O"
                ],
                "answer": "O"
            },
            {
                "q": "Normal human body temperature?\n(सामान्य मानव शरीर का तापमान?)",
                "options": [
                    "36°C",
                    "37°C",
                    "38°C",
                    "35°C"
                ],
                "answer": "37°C"
            },
            {
                "q": "Largest bone in human body?\n(मानव शरीर की सबसे बड़ी हड्डी?)",
                "options": [
                    "Humerus (ह्यूमरस)",
                    "Femur (फीमर)",
                    "Tibia (टिबिया)",
                    "Spine (रीढ़)"
                ],
                "answer": "Femur (फीमर)"
            },
            {
                "q": "Heart has how many chambers?\n(हृदय में कितने कक्ष होते हैं?)",
                "options": [
                    "2",
                    "3",
                    "4",
                    "5"
                ],
                "answer": "4"
            },
            {
                "q": "Normal pulse rate is?\n(सामान्य नाड़ी दर क्या है?)",
                "options": [
                    "50-60",
                    "72-80",
                    "100-120",
                    "40-50"
                ],
                "answer": "72-80"
            },
            {
                "q": "Blood is filtered by?\n(रक्त किससे छनता है?)",
                "options": [
                    "Liver (यकृत)",
                    "Kidney (गुर्दा)",
                    "Heart (हृदय)",
                    "Lungs (फेफड़े)"
                ],
                "answer": "Kidney (गुर्दा)"
            },
            {
                "q": "Digestion of food starts in?\n(भोजन का पाचन कहाँ से शुरू होता है?)",
                "options": [
                    "Stomach (पेट)",
                    "Mouth (मुँह)",
                    "Small intestine (छोटी आंत)",
                    "Large intestine (बड़ी आंत)"
                ],
                "answer": "Mouth (मुँह)"
            },
            {
                "q": "Which organ produces insulin?\n(कौन सा अंग इंसुलिन बनाता है?)",
                "options": [
                    "Liver (यकृत)",
                    "Kidney (गुर्दा)",
                    "Pancreas (अग्न्याशय)",
                    "Stomach (पेट)"
                ],
                "answer": "Pancreas (अग्न्याशय)"
            }
        ]
    },
    "ecology": {
        "title": "Ecology & Environment",
        "category": "Biology",
        "emoji": "🌿",
        "xpPerQuestion": 20,
        "questions": [
            {
                "q": "Ozone layer is found in which layer?\n(ओजोन परत किस परत में पाई जाती है?)",
                "options": [
                    "Troposphere (क्षोभमंडल)",
                    "Stratosphere (समतापमंडल)",
                    "Mesosphere (मध्यमंडल)",
                    "Thermosphere (तापमंडल)"
                ],
                "answer": "Stratosphere (समतापमंडल)"
            },
            {
                "q": "Primary producers in ecosystem are?\n(पारिस्थितिकी तंत्र में प्राथमिक उत्पादक कौन हैं?)",
                "options": [
                    "Herbivores (शाकाहारी)",
                    "Carnivores (मांसाहारी)",
                    "Green plants (हरे पौधे)",
                    "Decomposers (अपघटक)"
                ],
                "answer": "Green plants (हरे पौधे)"
            },
            {
                "q": "Food chain starts with?\n(खाद्य श्रृंखला किससे शुरू होती है?)",
                "options": [
                    "Consumer (उपभोक्ता)",
                    "Producer (उत्पादक)",
                    "Decomposer (अपघटक)",
                    "Carnivore (मांसाहारी)"
                ],
                "answer": "Producer (उत्पादक)"
            },
            {
                "q": "Major greenhouse gas is?\n(प्रमुख ग्रीनहाउस गैस कौन सी है?)",
                "options": [
                    "Oxygen (ऑक्सीजन)",
                    "Nitrogen (नाइट्रोजन)",
                    "Carbon dioxide (कार्बन डाइऑक्साइड)",
                    "Hydrogen (हाइड्रोजन)"
                ],
                "answer": "Carbon dioxide (कार्बन डाइऑक्साइड)"
            },
            {
                "q": "Biodiversity hotspot of India?\n(भारत का जैव विविधता हॉटस्पॉट?)",
                "options": [
                    "Thar desert (थार मरुस्थल)",
                    "Western Ghats (पश्चिमी घाट)",
                    "Gangetic Plains (गंगा का मैदान)",
                    "Deccan Plateau (दक्कन का पठार)"
                ],
                "answer": "Western Ghats (पश्चिमी घाट)"
            },
            {
                "q": "Which gas causes acid rain?\n(कौन सी गैस अम्लीय वर्षा का कारण बनती है?)",
                "options": [
                    "CO₂",
                    "SO₂",
                    "O₂",
                    "N₂"
                ],
                "answer": "SO₂"
            },
            {
                "q": "Top of food chain is occupied by?\n(खाद्य श्रृंखला के शीर्ष पर कौन होता है?)",
                "options": [
                    "Herbivores (शाकाहारी)",
                    "Producers (उत्पादक)",
                    "Apex predators (शीर्ष शिकारी)",
                    "Decomposers (अपघटक)"
                ],
                "answer": "Apex predators (शीर्ष शिकारी)"
            },
            {
                "q": "Amazon is called the lungs of?\n(अमेज़न को किसके फेफड़े कहते हैं?)",
                "options": [
                    "Asia (एशिया)",
                    "Earth (पृथ्वी)",
                    "South America (दक्षिण अमेरिका)",
                    "Africa (अफ्रीका)"
                ],
                "answer": "Earth (पृथ्वी)"
            },
            {
                "q": "What percentage of Earth is covered by forests?\n(पृथ्वी का कितना प्रतिशत वनों से ढका है?)",
                "options": [
                    "10%",
                    "20%",
                    "31%",
                    "50%"
                ],
                "answer": "31%"
            },
            {
                "q": "Coral reefs are found in?\n(मूंगा चट्टानें कहाँ पाई जाती हैं?)",
                "options": [
                    "Deep ocean (गहरा समुद्र)",
                    "Shallow warm water (उथला गर्म पानी)",
                    "Cold water (ठंडा पानी)",
                    "Rivers (नदियाँ)"
                ],
                "answer": "Shallow warm water (उथला गर्म पानी)"
            }
        ]
    },
    "c9_matter": {
        "title": "Matter in Our Surroundings",
        "category": "Chemistry",
        "emoji": "🧊",
        "xpPerQuestion": 15,
        "questions": [
            {
                "q": "Which of the following can we scratch?\n(हम निम्न में से किसे खुरच सकते हैं?)",
                "options": [
                    "Solid (ठोस)",
                    "Liquid (द्रव)",
                    "Gas (गैस)",
                    "None of these (इनमें से किसी को नहीं)"
                ],
                "answer": "Solid (ठोस)",
                "explanation": "🔬 Solids have a rigid, closely-packed structure with strong intermolecular forces. This rigidity gives them a definite surface that can be physically scratched. Liquids & gases have no fixed surface.\n\n📘 ठोस (Solid) में कण (Particles) बहुत पास-पास और दृढ़ (Rigid) संरचना में होते हैं। प्रबल अन्तराणविक बल (Strong Intermolecular Force) इन्हें कसकर बाँधे रखता है, जिससे ठोस की एक निश्चित सतह (Surface) बनती है जिसे खुरचा जा सकता है।"
            },
            {
                "q": "Which state of matter can we compress to a great extent?\n(हम किसे बहुत अधिक संपीड़ित कर सकते हैं?)",
                "options": [
                    "Solid (ठोस)",
                    "Liquid (द्रव)",
                    "Gas (गैस)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Gas (गैस)",
                "explanation": "🔬 Gas molecules have very large intermolecular spaces and weak attractive forces. This allows them to be compressed significantly by reducing the space between molecules. Solids & liquids resist compression due to tightly packed particles.\n\n📘 गैस (Gas) के अणुओं (Molecules) के बीच बहुत अधिक अन्तराणविक अवकाश (Intermolecular Space) होता है और आकर्षण बल (Attractive Force) बहुत कमज़ोर होता है। इसलिए दाब (Pressure) लगाकर इन्हें आसानी से संपीड़ित (Compress) किया जा सकता है।"
            },
            {
                "q": "______ has a definite volume but no definite shape.\n(______ का आयतन निश्चित होता है, आकार नहीं।)",
                "options": [
                    "Solid (ठोस)",
                    "Liquid (द्रव)",
                    "Gas (गैस)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Liquid (द्रव)",
                "explanation": "🔬 Liquids have moderate intermolecular forces — strong enough to maintain a fixed volume but too weak to hold a fixed shape. Hence, liquids take the shape of their container while keeping volume constant.\n\n📘 द्रव (Liquid) में अन्तराणविक बल (Intermolecular Force) मध्यम होता है — आयतन (Volume) बनाए रखने के लिए पर्याप्त, लेकिन आकार (Shape) स्थिर रखने के लिए अपर्याप्त। इसलिए द्रव बर्तन (Container) का आकार ले लेता है, पर आयतन वही रहता है।"
            },
            {
                "q": "The melting point of ice is taken as 0° on which scale?\n(बर्फ का गलनांक 0° किस पैमाने में लिया गया है?)",
                "options": [
                    "Fahrenheit scale (फारेनहाइट पैमाना)",
                    "Kelvin scale (केल्विन पैमाना)",
                    "Celsius scale (सेल्सियस पैमाना)",
                    "Galileo scale (गैलीलियो पैमाना)"
                ],
                "answer": "Celsius scale (सेल्सियस पैमाना)",
                "explanation": "🔬 The Celsius scale (also called Centigrade) defines 0°C as the freezing/melting point of pure water at 1 atm pressure, and 100°C as the boiling point. On Kelvin scale, it is 273 K; on Fahrenheit, it is 32°F.\n\n📘 सेल्सियस पैमाने (Celsius Scale) में शुद्ध जल (Pure Water) का गलनांक (Melting Point) 0°C और क्वथनांक (Boiling Point) 100°C निर्धारित है। केल्विन (Kelvin) में यह 273 K और फारेनहाइट (Fahrenheit) में 32°F होता है। सूत्र: K = °C + 273"
            },
            {
                "q": "In which state is neither shape nor volume definite?\n(किसमें आकार व आयतन दोनों निश्चित नहीं होते?)",
                "options": [
                    "Solid (ठोस में)",
                    "Liquid (द्रव में)",
                    "Gas (गैसों में)",
                    "All of these (इन सभी में)"
                ],
                "answer": "Gas (गैसों में)",
                "explanation": "🔬 Gas particles are far apart with negligible intermolecular forces. They have neither definite shape (take container shape) nor definite volume (fill entire container). Solids have both; liquids have only definite volume.\n\n📘 गैस (Gas) के कणों (Particles) के बीच अन्तराणविक बल (Intermolecular Force) नगण्य (Negligible) होता है। इसलिए गैस का न कोई निश्चित आकार (Shape) होता है, न आयतन (Volume)। गैस पूरे बर्तन में फैल जाती है।"
            },
            {
                "q": "Which gas is used in the kitchen for cooking?\n(रसोईघर में किस गैस का प्रयोग करते हैं?)",
                "options": [
                    "LPG",
                    "MIC",
                    "CNG",
                    "All of these (ये सभी)"
                ],
                "answer": "LPG",
                "explanation": "🔬 LPG (Liquefied Petroleum Gas) is used as domestic cooking fuel. It mainly contains butane (C₄H₁₀) and propane (C₃H₈). CNG is used in vehicles, and MIC (Methyl Isocyanate) is an industrial chemical, not a fuel.\n\n📘 LPG (Liquefied Petroleum Gas — द्रवित पेट्रोलियम गैस) रसोई में खाना पकाने के ईंधन (Fuel) के रूप में प्रयोग होती है। इसमें मुख्यतः ब्यूटेन (Butane — C₄H₁₀) और प्रोपेन (Propane — C₃H₈) होती है।"
            },
            {
                "q": "Which gas is used as fuel in vehicles?\n(वाहनों में कौन-सी गैस प्रयोग की जाती है?)",
                "options": [
                    "LPG",
                    "MIC",
                    "CNG",
                    "All of these (ये सभी)"
                ],
                "answer": "CNG",
                "explanation": "🔬 CNG (Compressed Natural Gas) is used as vehicular fuel. Its main component is methane (CH₄). CNG is a cleaner fuel producing less pollution than petrol/diesel. LPG is for domestic cooking.\n\n📘 CNG (Compressed Natural Gas — संपीडित प्राकृतिक गैस) वाहनों (Vehicles) में ईंधन के रूप में प्रयोग होती है। इसका मुख्य घटक मेथेन (Methane — CH₄) है। CNG पेट्रोल/डीज़ल की तुलना में स्वच्छ ईंधन (Cleaner Fuel) है।"
            },
            {
                "q": "What is the melting point of ice?\n(बर्फ का गलनांक क्या है?)",
                "options": [
                    "100°C",
                    "273 K",
                    "273°C",
                    "373 K"
                ],
                "answer": "273 K",
                "explanation": "🔬 Ice melts at 0°C. Converting to Kelvin: K = °C + 273 = 0 + 273 = 273 K. Note: 373 K = 100°C (boiling point of water), and 273°C is incorrect for melting point.\n\n📘 बर्फ (Ice) का गलनांक (Melting Point) 0°C होता है। केल्विन (Kelvin) में बदलने का सूत्र: K = °C + 273। इसलिए 0°C = 0 + 273 = 273 K। याद रखें: 373 K = 100°C (जल का क्वथनांक/Boiling Point)।"
            },
            {
                "q": "What is the boiling point of water?\n(जल का क्वथनांक क्या है?)",
                "options": [
                    "0°C",
                    "273 K",
                    "273°C",
                    "373 K"
                ],
                "answer": "373 K",
                "explanation": "🔬 Water boils at 100°C at standard atmospheric pressure. Converting to Kelvin: K = °C + 273 = 100 + 273 = 373 K. Remember: 273 K = 0°C (melting point of ice).\n\n📘 जल (Water) का क्वथनांक (Boiling Point) मानक वायुमण्डलीय दाब (Standard Atmospheric Pressure) पर 100°C होता है। केल्विन (Kelvin) में: K = 100 + 273 = 373 K। स्मरणीय: 273 K = 0°C (बर्फ का गलनांक)।"
            },
            {
                "q": "Water in a clay pot cools in summer due to which process?\n(गर्मियों में घड़े का जल किसके कारण ठंडा होता है?)",
                "options": [
                    "Osmosis (परासरण)",
                    "Diffusion (विसरण)",
                    "Transpiration (वाष्पोत्सर्जन)",
                    "Evaporation (वाष्पन)"
                ],
                "answer": "Evaporation (वाष्पन)",
                "explanation": "🔬 Clay pots are porous — water seeps through tiny pores to the outer surface and evaporates. Evaporation is a surface phenomenon that absorbs latent heat from the surrounding water, causing cooling. This is why matka water is cold in summer.\n\n📘 मिट्टी का घड़ा सछिद्र (Porous) होता है — जल सूक्ष्म छिद्रों (Pores) से बाहरी सतह पर आता है और वाष्पित (Evaporate) हो जाता है। वाष्पन (Evaporation) एक सतही घटना (Surface Phenomenon) है जो गुप्त ऊष्मा (Latent Heat) अवशोषित करती है, जिससे शीतलन (Cooling) होता है।"
            },
            {
                "q": "Which of the following is NOT matter?\n(निम्न में कौन द्रव्य नहीं है?)",
                "options": [
                    "Glass (काँच)",
                    "Wood (लकड़ी)",
                    "Light (प्रकाश)",
                    "Milk (दूध)"
                ],
                "answer": "Light (प्रकाश)",
                "explanation": "🔬 Matter is anything that has mass and occupies space (volume). Glass, wood, and milk all have mass and volume — they are matter. Light is a form of electromagnetic energy; it has no mass and does not occupy space, hence it is NOT matter.\n\n📘 द्रव्य (Matter) वह है जिसमें द्रव्यमान (Mass) हो और जो स्थान (Space) घेरता हो। काँच, लकड़ी और दूध सभी द्रव्य हैं। प्रकाश (Light) विद्युत चुम्बकीय ऊर्जा (Electromagnetic Energy) का रूप है — इसमें द्रव्यमान नहीं होता, इसलिए यह द्रव्य नहीं है।"
            },
            {
                "q": "Substances with indefinite shape are called?\n(अनिश्चित आकार वाले पदार्थ कहलाते हैं?)",
                "options": [
                    "Solid (ठोस)",
                    "Liquid (द्रव)",
                    "Gas (गैस)",
                    "Liquid and Gas (द्रव तथा गैस)"
                ],
                "answer": "Liquid and Gas (द्रव तथा गैस)",
                "explanation": "🔬 Both liquids and gases lack a definite shape — they adopt the shape of their container. Only solids have a definite shape due to strong intermolecular forces. So both liquid and gas states have indefinite shape.\n\n📘 द्रव (Liquid) और गैस (Gas) दोनों का कोई निश्चित आकार (Definite Shape) नहीं होता — ये अपने बर्तन (Container) का आकार ले लेते हैं। केवल ठोस (Solid) का निश्चित आकार होता है क्योंकि इसमें प्रबल अन्तराणविक बल (Strong Intermolecular Force) होता है।"
            },
            {
                "q": "Which has both indefinite shape and indefinite volume?\n(किसकी आकृति तथा आयतन दोनों अनिश्चित होते हैं?)",
                "options": [
                    "Table (मेज)",
                    "Air (वायु)",
                    "Water (जल)",
                    "Pencil (पेन्सिल)"
                ],
                "answer": "Air (वायु)",
                "explanation": "🔬 Air is a gas. Gases have neither definite shape nor definite volume — they fill the entire available space. Table & pencil are solids (both definite). Water is liquid (definite volume, indefinite shape).\n\n📘 वायु (Air) एक गैस (Gas) है। गैसों का न निश्चित आकार (Shape) होता है, न निश्चित आयतन (Volume) — ये पूरे उपलब्ध स्थान में फैल जाती हैं। मेज व पेन्सिल ठोस (Solid) हैं। जल द्रव (Liquid) है — आयतन निश्चित, आकार अनिश्चित।"
            },
            {
                "q": "Which state of matter always conducts electricity?\n(द्रव्य की कौन-सी अवस्था सदैव विद्युत की सुचालक होती है?)",
                "options": [
                    "Solid (ठोस)",
                    "Liquid (द्रव)",
                    "Gas (गैस)",
                    "Plasma (प्लाज्मा)"
                ],
                "answer": "Plasma (प्लाज्मा)",
                "explanation": "🔬 Plasma is the 4th state of matter — a super-heated gas where atoms are ionized (electrons stripped off). These free charged particles (ions + electrons) make plasma an excellent electrical conductor at all times. Examples: Sun, lightning, neon signs.\n\n📘 प्लाज्मा (Plasma) द्रव्य की चौथी अवस्था (4th State of Matter) है — यह अत्यधिक गर्म आयनीकृत गैस (Ionized Gas) है जिसमें मुक्त आवेशित कण (Free Charged Particles) — आयन (Ions) व इलेक्ट्रॉन (Electrons) — होते हैं, जो इसे सदैव विद्युत सुचालक (Electrical Conductor) बनाते हैं। उदाहरण: सूर्य, बिजली, नियॉन साइन।"
            },
            {
                "q": "The distance between molecules of a substance is?\n(पदार्थ के अणुओं के मध्य की दूरी कहाँ न्यूनतम होती है?)",
                "options": [
                    "Minimum in gaseous state (गैसीय अवस्था में न्यूनतम)",
                    "Maximum in liquid state (द्रव अवस्था में अधिकतम)",
                    "Minimum in solid state (ठोस अवस्था में न्यूनतम)",
                    "Minimum in liquid state (द्रव अवस्था में न्यूनतम)"
                ],
                "answer": "Minimum in solid state (ठोस अवस्था में न्यूनतम)",
                "explanation": "🔬 Intermolecular distance order: Solid < Liquid < Gas. In solids, particles are tightly packed with minimum distance between them due to strong intermolecular forces. Gases have maximum distance.\n\n📘 अन्तराणविक दूरी (Intermolecular Distance) का क्रम: ठोस (Solid) < द्रव (Liquid) < गैस (Gas)। ठोस में कण (Particles) सबसे पास-पास होते हैं क्योंकि अन्तराणविक बल (Intermolecular Force) सबसे प्रबल (Strongest) होता है।"
            },
            {
                "q": "In the gaseous state of matter, what type of energy is present?\n(द्रव्य की गैसीय अवस्था में कैसी ऊर्जा होती है?)",
                "options": [
                    "Maximum kinetic energy (अधिकतम गतिज ऊर्जा)",
                    "Maximum potential energy (अधिकतम स्थितिज ऊर्जा)",
                    "Minimum kinetic energy (न्यूनतम गतिज ऊर्जा)",
                    "None of the above (उपर्युक्त में से कोई नहीं)"
                ],
                "answer": "Maximum kinetic energy (अधिकतम गतिज ऊर्जा)",
                "explanation": "🔬 Kinetic energy order: Gas > Liquid > Solid. Gas particles move fastest with maximum freedom, hence they possess the highest kinetic energy. Solids have minimum KE as particles only vibrate at fixed positions.\n\n📘 गतिज ऊर्जा (Kinetic Energy) का क्रम: गैस (Gas) > द्रव (Liquid) > ठोस (Solid)। गैस के कण सबसे तेज़ गति (Maximum Speed) से चलते हैं और सबसे अधिक स्वतंत्रता (Freedom) रखते हैं, इसलिए गतिज ऊर्जा अधिकतम होती है।"
            },
            {
                "q": "Which statement is TRUE about intermolecular space?\n(अन्तराणविक अवकाश के बारे में कौन-सा कथन सत्य है?)",
                "options": [
                    "Solid has more space than liquid & gas (ठोस में द्रव व गैस से अधिक अवकाश)",
                    "Liquid has less space than solid (द्रव में ठोस से कम अवकाश)",
                    "Gas has less space than solid & liquid (गैस में ठोस व द्रव से कम अवकाश)",
                    "Solid has least space compared to liquid & gas (ठोस में सबसे कम अवकाश)"
                ],
                "answer": "Solid has least space compared to liquid & gas (ठोस में सबसे कम अवकाश)",
                "explanation": "🔬 Intermolecular space order: Solid < Liquid < Gas. Solids have the LEAST intermolecular space because particles are tightly packed. Gas has the MOST space — particles are far apart and move freely.\n\n📘 अन्तराणविक अवकाश (Intermolecular Space) का क्रम: ठोस (Solid) < द्रव (Liquid) < गैस (Gas)। ठोस में कण सबसे करीब (Tightly Packed) होते हैं, इसलिए अवकाश न्यूनतम (Minimum) होता है। गैस में कण सबसे दूर-दूर होते हैं।"
            },
            {
                "q": "The average kinetic energy of gas molecules is?\n(किसी गैस के अणुओं की औसत गतिज ऊर्जा होती है?)",
                "options": [
                    "Less than its liquid molecules (इसी पदार्थ के द्रव के अणुओं से कम)",
                    "Less than its solid molecules (इसी पदार्थ के ठोस के अणुओं से कम)",
                    "More than its liquid molecules (इसी पदार्थ के द्रव के अणुओं से अधिक)",
                    "Equal to its liquid molecules (इसी पदार्थ के द्रव के अणुओं के बराबर)"
                ],
                "answer": "More than its liquid molecules (इसी पदार्थ के द्रव के अणुओं से अधिक)",
                "explanation": "🔬 For the same substance: KE(gas) > KE(liquid) > KE(solid). Gas molecules move most rapidly and freely, so their average kinetic energy is always greater than the liquid state of the same substance.\n\n📘 एक ही पदार्थ (Substance) के लिए गतिज ऊर्जा (Kinetic Energy) का क्रम: गैस > द्रव > ठोस। गैस के अणु (Molecules) सबसे तेज़ व स्वतंत्र गति करते हैं, इसलिए उनकी औसत गतिज ऊर्जा (Average KE) द्रव अवस्था से अधिक होती है।"
            },
            {
                "q": "On heating a liquid, its particles?\n(द्रव को गर्म करने पर उसके कण?)",
                "options": [
                    "Come closer (पास-पास आ जाते हैं)",
                    "Move apart (दूर-दूर हो जाते हैं)",
                    "Some closer, some apart (कुछ पास, कुछ दूर हो जाते हैं)",
                    "Cease to exist (रहते ही नहीं हैं)"
                ],
                "answer": "Move apart (दूर-दूर हो जाते हैं)",
                "explanation": "🔬 Heating increases kinetic energy of particles, causing them to vibrate/move faster and overcome intermolecular forces. This increases the intermolecular distance — particles move apart. Sufficient heating converts liquid to gas.\n\n📘 गर्म करने (Heating) से कणों (Particles) की गतिज ऊर्जा (Kinetic Energy) बढ़ती है, जिससे वे तेज़ कम्पन (Vibrate) करते हैं और अन्तराणविक बल (Intermolecular Force) को पार करके दूर-दूर हो जाते हैं। पर्याप्त ताप पर द्रव गैस में बदल जाता है।"
            },
            {
                "q": "On heating a solid at its melting point?\n(किसी ठोस को उसके गलनांक पर गर्म करने पर?)",
                "options": [
                    "Temperature does not increase (तापमान में वृद्धि नहीं होती)",
                    "Temperature increases (तापमान में वृद्धि हो जाती है)",
                    "Temperature fluctuates (तापमान घटता-बढ़ता रहता है)",
                    "None of the above (उपर्युक्त में से कोई नहीं)"
                ],
                "answer": "Temperature does not increase (तापमान में वृद्धि नहीं होती)",
                "explanation": "🔬 At the melting point, the heat energy supplied is used entirely to break intermolecular bonds (overcoming the lattice structure) — this is called LATENT HEAT OF FUSION. Temperature remains constant until the entire solid melts.\n\n📘 गलनांक (Melting Point) पर दी गई ऊष्मा (Heat) अन्तराणविक बन्धों (Intermolecular Bonds) को तोड़ने में खर्च होती है — इसे गलन की गुप्त ऊष्मा (Latent Heat of Fusion) कहते हैं। जब तक पूरा ठोस नहीं पिघलता, तापमान (Temperature) स्थिर (Constant) रहता है।"
            },
            {
                "q": "The temperature at which vapor pressure of a liquid equals atmospheric pressure is called?\n(जिस ताप पर द्रव का वाष्पदाब वायुमण्डलीय दाब के बराबर होता है, उसे कहते हैं?)",
                "options": [
                    "Freezing point (हिमांक)",
                    "Boiling point (क्वथनांक)",
                    "Melting point (गलनांक)",
                    "Critical temperature (क्रांतिक ताप)"
                ],
                "answer": "Boiling point (क्वथनांक)",
                "explanation": "🔬 Boiling point is the temperature at which the vapor pressure of a liquid equals the external atmospheric pressure. At this point, bubbles form throughout the liquid (not just surface evaporation). For water at 1 atm, BP = 100°C = 373 K.\n\n📘 क्वथनांक (Boiling Point) वह ताप है जिस पर द्रव (Liquid) का वाष्प दाब (Vapor Pressure) बाहरी वायुमण्डलीय दाब (Atmospheric Pressure) के बराबर हो जाता है। इस बिंदु पर पूरे द्रव में बुलबुले (Bubbles) बनते हैं। जल का क्वथनांक 1 atm पर 100°C = 373 K है।"
            },
            {
                "q": "Slow escape of molecules from a liquid surface without heating is called?\n(बिना गर्म किए द्रव की सतह से अणुओं के धीरे-धीरे वायु में मिलने की क्रिया को कहते हैं?)",
                "options": [
                    "Distillation (आसवन)",
                    "Boiling (क्वथन)",
                    "Sublimation (ऊर्ध्वपातन)",
                    "Evaporation (वाष्पन)"
                ],
                "answer": "Evaporation (वाष्पन)",
                "explanation": "🔬 Evaporation is a SURFACE phenomenon that occurs at ANY temperature (below boiling point). High-energy surface molecules escape into the air. It is different from boiling (bulk phenomenon at boiling point). Factors: surface area, temperature, humidity, wind speed.\n\n📘 वाष्पन (Evaporation) एक सतही घटना (Surface Phenomenon) है जो किसी भी ताप (Any Temperature) पर हो सकती है। सतह के उच्च-ऊर्जा अणु (High-Energy Molecules) वायु में मिल जाते हैं। यह क्वथन (Boiling) से भिन्न है। प्रभावी कारक: सतह क्षेत्रफल (Surface Area), तापमान, आर्द्रता (Humidity), पवन वेग (Wind Speed)।"
            },
            {
                "q": "During the process of freezing?\n(जमने की प्रक्रिया में?)",
                "options": [
                    "Intermolecular space remains unchanged (अन्तराणविक अवकाश अपरिवर्तित रहता है)",
                    "Intermolecular space increases (अन्तराणविक अवकाश बढ़ जाता है)",
                    "Intermolecular space decreases (अन्तराणविक अवकाश कम होता है)",
                    "Intermolecular space becomes zero (अन्तराणविक अवकाश शून्य हो जाता है)"
                ],
                "answer": "Intermolecular space decreases (अन्तराणविक अवकाश कम होता है)",
                "explanation": "🔬 Freezing converts liquid → solid. During this, kinetic energy decreases, particles slow down and come closer, and intermolecular forces pull them into a tightly packed arrangement. Hence, intermolecular space DECREASES (but never becomes zero — particles always have some space).\n\n📘 जमना (Freezing) द्रव → ठोस (Liquid → Solid) रूपांतरण है। इसमें गतिज ऊर्जा (KE) घटती है, कण (Particles) धीमे होकर पास आते हैं, और अन्तराणविक बल (Intermolecular Force) उन्हें कसकर व्यवस्थित करता है। अतः अन्तराणविक अवकाश (Intermolecular Space) कम होता है (शून्य कभी नहीं होता)।"
            },
            {
                "q": "Which substance is purified by sublimation?\n(ऊर्ध्वपातन द्वारा किसे शुद्ध किया जाता है?)",
                "options": [
                    "Ammonium chloride / Nausadar (नौसादर)",
                    "Salt (नमक)",
                    "Sulphur (सल्फर)",
                    "Petrol (पेट्रोल)"
                ],
                "answer": "Ammonium chloride / Nausadar (नौसादर)",
                "explanation": "🔬 Sublimation is the direct conversion of solid → gas (without passing through liquid state). Ammonium chloride (NH₄Cl / Nausadar) is a sublimable substance — it directly converts to gas on heating. Other sublimable substances: camphor, naphthalene, dry ice (solid CO₂).\n\n📘 ऊर्ध्वपातन (Sublimation) ठोस का सीधे गैस में परिवर्तन (Solid → Gas) है, बिना द्रव (Liquid) अवस्था से गुज़रे। नौसादर (Ammonium Chloride — NH₄Cl) ऊर्ध्वपातज (Sublimable) पदार्थ है। अन्य उदाहरण: कपूर (Camphor), नैफ्थलीन (Naphthalene), शुष्क बर्फ (Dry Ice — ठोस CO₂)।"
            },
            {
                "q": "When salt is added to water, what happens to its boiling point?\n(पानी में नमक मिलाने से क्वथनांक पर क्या प्रभाव पड़ता है?)",
                "options": [
                    "Remains same (समान रहेगा)",
                    "Increases (बढ़ जायेगा)",
                    "Decreases (घट जायेगा)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Increases (बढ़ जायेगा)",
                "explanation": "🔬 Adding salt (or any non-volatile solute) to water causes BOILING POINT ELEVATION — a colligative property. The solute particles reduce the number of water molecules escaping as vapor, so higher temperature is needed to reach boiling. Example: Salt water boils above 100°C.\n\n📘 नमक (Salt) या कोई अवाष्पशील विलेय (Non-Volatile Solute) मिलाने से क्वथनांक में वृद्धि (Boiling Point Elevation) होती है — यह एक अणुसंख्यक गुणधर्म (Colligative Property) है। विलेय कण जल के अणुओं को वाष्पित होने से रोकते हैं, इसलिए उबलने के लिए अधिक ताप चाहिए।"
            },
            {
                "q": "On heating water from 0°C to 100°C, the volume of water?\n(जल को 0°C से 100°C तक गर्म करने पर, जल का आयतन?)",
                "options": [
                    "First decreases then increases (पहले घटेगा फिर बढ़ेगा)",
                    "First increases then decreases (पहले बढ़ेगा फिर घटेगा)",
                    "Gradually increases (धीरे-धीरे बढ़ेगा)",
                    "Gradually decreases (धीरे-धीरे घटेगा)"
                ],
                "answer": "First decreases then increases (पहले घटेगा फिर बढ़ेगा)",
                "explanation": "🔬 Water shows ANOMALOUS EXPANSION: from 0°C to 4°C, water contracts (volume decreases, density increases). At 4°C, water has MAXIMUM density and MINIMUM volume. Above 4°C, it expands normally. This is why ice floats and aquatic life survives in frozen lakes.\n\n📘 जल असामान्य प्रसार (Anomalous Expansion) दर्शाता है: 0°C से 4°C तक जल सिकुड़ता है (आयतन घटता है, घनत्व बढ़ता है)। 4°C पर जल का घनत्व (Density) अधिकतम और आयतन (Volume) न्यूनतम होता है। 4°C के बाद सामान्य प्रसार (Normal Expansion) होता है। इसी कारण बर्फ तैरती है और जमी झीलों में जलीय जीव जीवित रहते हैं।"
            },
            {
                "q": "Condensation is?\n(संघनन क्या है?)",
                "options": [
                    "Conversion of liquid to vapor (द्रव का वाष्प में परिवर्तन)",
                    "Conversion of vapor to liquid (वाष्प का द्रव में परिवर्तन)",
                    "Conversion of solid to gas (ठोस का गैस में परिवर्तन)",
                    "Conversion of gas to liquid (गैस का द्रव में परिवर्तन)"
                ],
                "answer": "Conversion of vapor to liquid (वाष्प का द्रव में परिवर्तन)",
                "explanation": "🔬 Condensation is the reverse of evaporation/vaporization: Vapor → Liquid. It occurs when gas/vapor loses heat energy, particles slow down, intermolecular forces dominate, and the substance changes to liquid state. Example: dew drops, fog on cold glass.\n\n📘 संघनन (Condensation) वाष्पन (Evaporation) की विपरीत प्रक्रिया है: वाष्प → द्रव (Vapor → Liquid)। जब वाष्प ऊष्मा (Heat) खोती है, कण धीमे होते हैं, अन्तराणविक बल (Intermolecular Force) प्रभावी होता है और पदार्थ द्रव में बदल जाता है। उदाहरण: ओस की बूँदें (Dew Drops), ठंडे गिलास पर कोहरा।"
            },
            {
                "q": "Which of the following is NOT a sublimable substance?\n(निम्नलिखित में ऊर्ध्वपातज पदार्थ नहीं है?)",
                "options": [
                    "Ammonium chloride (अमोनियम क्लोराइड)",
                    "Camphor (कपूर)",
                    "Sodium chloride (सोडियम क्लोराइड)",
                    "Naphthalene (नैफ्थलीन)"
                ],
                "answer": "Sodium chloride (सोडियम क्लोराइड)",
                "explanation": "🔬 Sublimable substances convert directly from solid → gas. Ammonium chloride (NH₄Cl), camphor, and naphthalene all sublime. Sodium chloride (NaCl — common salt) does NOT sublime — it has a very high melting point (801°C) and strong ionic bonds. It requires melting first, then boiling.\n\n📘 ऊर्ध्वपातज (Sublimable) पदार्थ सीधे ठोस से गैस (Solid → Gas) बनते हैं। अमोनियम क्लोराइड (NH₄Cl), कपूर (Camphor) और नैफ्थलीन (Naphthalene) सभी ऊर्ध्वपातज हैं। सोडियम क्लोराइड (NaCl — साधारण नमक) ऊर्ध्वपातज नहीं है — इसका गलनांक (Melting Point) बहुत उच्च (801°C) है और प्रबल आयनिक बन्ध (Ionic Bond) होते हैं।"
            },
            {
                "q": "What is the full form of CNG used as vehicle fuel?\n(वाहनों में ईंधन के रूप में प्रयुक्त CNG का पूर्ण रूप क्या है?)",
                "options": [
                    "Compact Natural Gas",
                    "Compressed Natural Gas",
                    "Complete Natural Gas",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Compressed Natural Gas",
                "explanation": "🔬 CNG = Compressed Natural Gas. Natural gas (mainly methane CH₄) is compressed to less than 1% of its volume at standard atmospheric pressure. CNG is stored at 200-250 bar pressure in cylinders. It is an eco-friendly alternative to petrol/diesel with lower emissions.\n\n📘 CNG = Compressed Natural Gas (संपीडित प्राकृतिक गैस)। प्राकृतिक गैस (मुख्यतः मेथेन CH₄) को मानक दाब पर उसके आयतन (Volume) के 1% से भी कम तक संपीडित (Compress) किया जाता है। CNG 200-250 बार दाब (Pressure) पर सिलिंडरों में भरी जाती है। यह पेट्रोल/डीज़ल का पर्यावरण-अनुकूल (Eco-Friendly) विकल्प है।"
            },
            {
                "q": "Which gas is mainly present in CNG?\n(CNG में मुख्य रूप से कौन-सी गैस होती है?)",
                "options": [
                    "CO₂ — Carbon dioxide (कार्बन डाइऑक्साइड)",
                    "CH₄ — Methane (मेथेन)",
                    "H₂ — Hydrogen (हाइड्रोजन)",
                    "Isobutane (आइसोब्यूटेन)"
                ],
                "answer": "CH₄ — Methane (मेथेन)",
                "explanation": "🔬 CNG is primarily composed of Methane (CH₄) — about 87-96%. Methane is the simplest hydrocarbon with formula CH₄. It is a clean-burning fuel that produces less CO₂ than petrol/diesel per unit of energy released.\n\n📘 CNG का मुख्य घटक मेथेन (Methane — CH₄) है — लगभग 87-96%। मेथेन सबसे सरल हाइड्रोकार्बन (Hydrocarbon) है जिसका सूत्र CH₄ है। यह एक स्वच्छ ईंधन (Clean Fuel) है जो पेट्रोल/डीज़ल की तुलना में प्रति इकाई ऊर्जा (Energy) कम CO₂ उत्पन्न करता है।"
            },
            {
                "q": "What is the full form of LPG?\n(LPG का पूर्ण रूप क्या है?)",
                "options": [
                    "Liquid Pollution Gas",
                    "Liquefied Petroleum Gas",
                    "Large Pollution Gas",
                    "Liberal Population Grid"
                ],
                "answer": "Liquefied Petroleum Gas",
                "explanation": "🔬 LPG = Liquefied Petroleum Gas. It is a flammable mixture of propane (C₃H₈) and butane (C₄H₁₀) stored as liquid under pressure in cylinders. Used primarily for domestic cooking. Ethyl mercaptan is added for leak detection (that distinctive smell).\n\n📘 LPG = Liquefied Petroleum Gas (द्रवित पेट्रोलियम गैस)। यह प्रोपेन (Propane — C₃H₈) और ब्यूटेन (Butane — C₄H₁₀) का ज्वलनशील (Flammable) मिश्रण है जो दाब (Pressure) में द्रव रूप में सिलिंडरों में भरी जाती है। रिसाव पहचानने (Leak Detection) के लिए एथिल मर्कैप्टन (Ethyl Mercaptan) मिलाया जाता है (वही तेज़ गंध)।"
            }
        ]
    },
    "c9_atom": {
        "title": "Structure of the Atom",
        "category": "Chemistry",
        "emoji": "🔮",
        "xpPerQuestion": 15,
        "questions": [
            {
                "q": "Which of the following rays has the highest penetrating power?\n(निम्न किरणों में से सबसे अधिक बेधन क्षमता किसमें होती है?)",
                "options": [
                    "α-rays (α-किरणें)",
                    "X-rays (X-किरणें)",
                    "γ-rays (γ-किरणें)",
                    "Cathode rays (कैथोड किरणें)"
                ],
                "answer": "γ-rays (γ-किरणें)",
                "explanation": "🔬 γ-rays (gamma rays) have the highest penetrating power among all radiations. Order: γ > β > α. γ-rays are electromagnetic waves with no mass/charge, so they can pass through several cm of lead.\n\n📘 γ-किरणों (Gamma Rays) की बेधन क्षमता (Penetrating Power) सबसे अधिक होती है। क्रम: γ > β > α। γ-किरणें विद्युत चुम्बकीय तरंगें (Electromagnetic Waves) हैं जिनमें कोई द्रव्यमान (Mass) या आवेश (Charge) नहीं होता।"
            },
            {
                "q": "Who performed the alpha particle scattering experiment using gold foil?\n(सोने की पन्नी द्वारा अल्फा कण प्रकीर्णन का प्रयोग किसने किया?)",
                "options": [
                    "Thomson (टॉमसन)",
                    "Rutherford (रदरफोर्ड)",
                    "Bohr (बोर)",
                    "All of the above (उपरोक्त सभी)"
                ],
                "answer": "Rutherford (रदरफोर्ड)",
                "explanation": "🔬 Rutherford performed the α-particle scattering experiment (1911) by bombarding a thin gold foil with α-particles. Most passed straight, some deflected, very few bounced back — proving the nucleus is small, dense, and positively charged.\n\n📘 रदरफोर्ड (Rutherford) ने 1911 में सोने की पतली पन्नी (Gold Foil) पर α-कणों की बौछार की। अधिकांश कण सीधे निकले, कुछ विक्षेपित (Deflected) हुए, बहुत कम वापस लौटे — इससे सिद्ध हुआ कि नाभिक (Nucleus) छोटा, सघन (Dense) और धनावेशित (Positively Charged) है।"
            },
            {
                "q": "Who stated that the atom is a sphere of positive charge?\n(परमाणु धन आवेश का गोला है, यह किसने बताया?)",
                "options": [
                    "Thomson (टॉमसन)",
                    "Rutherford (रदरफोर्ड)",
                    "Bohr (बोर)",
                    "All of the above (उपरोक्त सभी)"
                ],
                "answer": "Thomson (टॉमसन)",
                "explanation": "🔬 J.J. Thomson proposed the \"Plum Pudding Model\" (1904) — atom is a uniform sphere of positive charge with electrons embedded in it like plums in a pudding. This was later disproved by Rutherford.\n\n📘 जे.जे. टॉमसन (Thomson) ने \"प्लम पुडिंग मॉडल\" (1904) प्रस्तावित किया — परमाणु (Atom) धनावेश (Positive Charge) का एक समान गोला है जिसमें इलेक्ट्रॉन (Electrons) जड़े हुए हैं। बाद में रदरफोर्ड ने इसे गलत सिद्ध किया।"
            },
            {
                "q": "Who proposed that electrons revolve in certain fixed orbits?\n(इलेक्ट्रॉन निश्चित कक्षाओं में चक्कर लगाते हैं, यह किसने प्रतिपादित किया?)",
                "options": [
                    "Thomson (टॉमसन)",
                    "Rutherford (रदरफोर्ड)",
                    "Bohr (बोर)",
                    "All of the above (उपरोक्त सभी)"
                ],
                "answer": "Bohr (बोर)",
                "explanation": "🔬 Niels Bohr (1913) proposed that electrons revolve in fixed circular orbits (energy levels) called shells (K, L, M, N...). Electrons do not radiate energy while in these orbits. Energy is emitted/absorbed only during transitions.\n\n📘 नील्स बोर (Bohr, 1913) ने प्रस्तावित किया कि इलेक्ट्रॉन निश्चित वृत्ताकार कक्षाओं (Fixed Orbits) में चक्कर लगाते हैं जिन्हें कोश (Shells — K, L, M, N) कहते हैं। इन कक्षाओं में इलेक्ट्रॉन ऊर्जा (Energy) विकिरित नहीं करते।"
            },
            {
                "q": "Subatomic particles are —\n(अवपरमाणुक कण हैं —)",
                "options": [
                    "Electron (इलेक्ट्रॉन)",
                    "Proton (प्रोटॉन)",
                    "Neutron (न्यूट्रॉन)",
                    "All of these (ये सभी)"
                ],
                "answer": "All of these (ये सभी)",
                "explanation": "🔬 The three fundamental subatomic particles are: Electron (e⁻, negative, discovered by Thomson), Proton (p⁺, positive, discovered by Goldstein), and Neutron (n⁰, neutral, discovered by Chadwick). All three together constitute an atom.\n\n📘 तीन मूल अवपरमाणुक कण (Subatomic Particles): इलेक्ट्रॉन (e⁻, ऋणावेशित — Thomson), प्रोटॉन (p⁺, धनावेशित — Goldstein), न्यूट्रॉन (n⁰, उदासीन — Chadwick)। ये तीनों मिलकर परमाणु (Atom) बनाते हैं।"
            },
            {
                "q": "The maximum number of electrons in the second shell is —\n(दूसरे कक्ष में इलेक्ट्रॉनों की अधिकतम संख्या है —)",
                "options": [
                    "2",
                    "4",
                    "18",
                    "8"
                ],
                "answer": "8",
                "explanation": "🔬 Maximum electrons in a shell = 2n². For 2nd shell (L): n=2, so 2×(2²) = 2×4 = 8. Shell-wise: K=2, L=8, M=18, N=32.\n\n📘 किसी कोश में अधिकतम इलेक्ट्रॉन = 2n²। दूसरे कोश (L-shell) के लिए n=2, अतः 2×(2²) = 2×4 = 8। कोशवार: K=2, L=8, M=18, N=32।"
            },
            {
                "q": "What was the limitation of Dalton's atomic theory?\n(डाल्टन के परमाणु सिद्धान्त की कमी क्या थी?)",
                "options": [
                    "He stated atoms are indivisible (उसने परमाणु को अविभाज्य बताया)",
                    "Could not explain different properties of substances from same atoms (एक ही प्रकार के परमाणुओं से बने विभिन्न पदार्थों के गुणों की व्याख्या न कर सका)",
                    "Could not explain synthesis of organic compounds (कार्बनिक यौगिकों के संश्लेषण को स्पष्ट न कर सका)",
                    "All of the above (उपर्युक्त सभी)"
                ],
                "answer": "All of the above (उपर्युक्त सभी)",
                "explanation": "🔬 Dalton's theory had multiple flaws: (1) Atoms ARE divisible into subatomic particles, (2) Isotopes show same element can have different masses, (3) Could not explain allotropy or organic synthesis. All listed limitations are valid.\n\n📘 डाल्टन के सिद्धान्त (Dalton's Theory) की कमियाँ: (1) परमाणु विभाज्य (Divisible) हैं — अवपरमाणुक कण मिले, (2) समस्थानिक (Isotopes) दर्शाते हैं कि एक ही तत्व के अलग द्रव्यमान हो सकते हैं, (3) अपररूपता (Allotropy) व कार्बनिक संश्लेषण (Organic Synthesis) की व्याख्या नहीं कर सका।"
            },
            {
                "q": "What is NOT present in Protium?\n(प्रोटियम में क्या नहीं होता?)",
                "options": [
                    "Proton (प्रोटॉन)",
                    "Electron (इलेक्ट्रॉन)",
                    "Neutron (न्यूट्रॉन)",
                    "All of these (ये सभी)"
                ],
                "answer": "Neutron (न्यूट्रॉन)",
                "explanation": "🔬 Protium (¹₁H) is the lightest isotope of hydrogen with mass number 1 and atomic number 1. It has 1 proton + 1 electron + 0 neutrons. It is the ONLY atom with no neutron.\n\n📘 प्रोटियम (Protium — ¹₁H) हाइड्रोजन (Hydrogen) का सबसे हल्का समस्थानिक (Isotope) है। इसमें 1 प्रोटॉन + 1 इलेक्ट्रॉन + 0 न्यूट्रॉन (Neutron) होते हैं। यह एकमात्र परमाणु है जिसमें न्यूट्रॉन नहीं होता।"
            },
            {
                "q": "Which isotope has two neutrons?\n(दो न्यूट्रॉन किसमें होते हैं?)",
                "options": [
                    "Deuterium (ड्यूटीरियम)",
                    "Tritium (ट्राइटियम)",
                    "Protium (प्रोटियम)",
                    "All of the above (उपर्युक्त सभी)"
                ],
                "answer": "Tritium (ट्राइटियम)",
                "explanation": "🔬 Tritium (³₁H): mass number 3, atomic number 1. Neutrons = 3−1 = 2. Comparison: Protium (¹H) = 0 neutrons, Deuterium (²H) = 1 neutron, Tritium (³H) = 2 neutrons.\n\n📘 ट्राइटियम (Tritium — ³₁H): द्रव्यमान संख्या (Mass Number) 3, परमाणु संख्या 1। न्यूट्रॉन = 3−1 = 2। तुलना: प्रोटियम = 0, ड्यूटीरियम (Deuterium) = 1, ट्राइटियम = 2 न्यूट्रॉन।"
            },
            {
                "q": "Ca and Ar atoms are —\n(Ca व Ar के परमाणु हैं —)",
                "options": [
                    "Isotopes (समस्थानिक)",
                    "Isobars (समभारिक)",
                    "Isomers (समावयव)",
                    "All of these (ये सभी)"
                ],
                "answer": "Isobars (समभारिक)",
                "explanation": "🔬 Isobars = same mass number, different atomic numbers. Ca (Z=20, A=40) and Ar (Z=18, A=40) both have mass number 40 but different atomic numbers → Isobars. Isotopes have same Z, different A.\n\n📘 समभारिक (Isobars) = समान द्रव्यमान संख्या (Mass Number), भिन्न परमाणु संख्या (Atomic Number)। Ca (Z=20, A=40) और Ar (Z=18, A=40) — दोनों का A=40 पर Z अलग → समभारिक। समस्थानिक (Isotopes) में Z समान, A भिन्न होता है।"
            },
            {
                "q": "Atomic number of fluorine is 9. Total electrons in F⁻ will be —\n(फ्लुओरीन की परमाणु संख्या 9 है, F⁻ में इलेक्ट्रॉनों की कुल संख्या होगी —)",
                "options": [
                    "9",
                    "8",
                    "10",
                    "19"
                ],
                "answer": "10",
                "explanation": "🔬 Fluorine (Z=9) has 9 electrons. F⁻ ion gains 1 electron → 9+1 = 10 electrons. The negative charge means it gained electrons. F⁻ has electronic config: 2, 8 (stable octet).\n\n📘 फ्लुओरीन (Fluorine, Z=9) में 9 इलेक्ट्रॉन हैं। F⁻ आयन (Ion) 1 इलेक्ट्रॉन ग्रहण करता है → 9+1 = 10। ऋण आवेश (Negative Charge) का अर्थ है इलेक्ट्रॉन ग्रहण किया। F⁻ का इलेक्ट्रॉनिक विन्यास (Electronic Configuration): 2, 8 (स्थायी अष्टक/Stable Octet)।"
            },
            {
                "q": "In isotopes of an element —\n(किसी तत्त्व के समस्थानिकों में —)",
                "options": [
                    "Number of protons differs (प्रोटॉन की संख्या भिन्न होती है)",
                    "Number of electrons differs (इलेक्ट्रॉन की संख्या भिन्न होती है)",
                    "Number of neutrons differs (न्यूट्रॉन की संख्या भिन्न होती है)",
                    "Number of neutrons is same (न्यूट्रॉन की संख्या समान होती है)"
                ],
                "answer": "Number of neutrons differs (न्यूट्रॉन की संख्या भिन्न होती है)",
                "explanation": "🔬 Isotopes: same atomic number (Z) → same protons & electrons, but different mass number (A) → different neutrons. Example: ¹H, ²H, ³H all have 1 proton but 0, 1, 2 neutrons respectively.\n\n📘 समस्थानिक (Isotopes): समान परमाणु संख्या (Z) → समान प्रोटॉन व इलेक्ट्रॉन, लेकिन भिन्न द्रव्यमान संख्या (A) → भिन्न न्यूट्रॉन। उदाहरण: ¹H, ²H, ³H — सभी में 1 प्रोटॉन, पर क्रमशः 0, 1, 2 न्यूट्रॉन।"
            },
            {
                "q": "When a neutron disintegrates, it produces —\n(जब एक न्यूट्रॉन विघटित होता है तो उत्पन्न होता है —)",
                "options": [
                    "One electron (एक इलेक्ट्रॉन)",
                    "One neutron and one electron (एक न्यूट्रॉन व एक इलेक्ट्रॉन)",
                    "One proton and one electron (एक प्रोटॉन व एक इलेक्ट्रॉन)",
                    "One proton and one neutron (एक प्रोटॉन व एक न्यूट्रॉन)"
                ],
                "answer": "One proton and one electron (एक प्रोटॉन व एक इलेक्ट्रॉन)",
                "explanation": "🔬 Beta decay: a neutron decays into a proton + electron (β-particle) + antineutrino. n⁰ → p⁺ + e⁻ + ν̄. This is the basis of β-radiation in radioactive substances.\n\n📘 बीटा क्षय (Beta Decay): न्यूट्रॉन (Neutron) विघटित होकर प्रोटॉन (Proton) + इलेक्ट्रॉन (β-कण) + एंटीन्यूट्रिनो बनाता है। n⁰ → p⁺ + e⁻ + ν̄। यही रेडियोधर्मी पदार्थों (Radioactive Substances) में β-विकिरण का आधार है।"
            },
            {
                "q": "Radioactive isotope dating counts the atoms of —\n(रेडियो आइसोटोप डेटिंग में गणना करते हैं —)",
                "options": [
                    "¹²C atoms (¹²C परमाणुओं की)",
                    "¹¹C atoms (¹¹C परमाणुओं की)",
                    "¹⁴C atoms (¹⁴C परमाणुओं की)",
                    "¹³C atoms (¹³C परमाणुओं की)"
                ],
                "answer": "¹⁴C atoms (¹⁴C परमाणुओं की)",
                "explanation": "🔬 Carbon-14 (¹⁴C) dating: ¹⁴C is radioactive with half-life ~5730 years. Living organisms absorb ¹⁴C; after death, it decays. By measuring remaining ¹⁴C, age of fossils/archaeological samples is determined.\n\n📘 कार्बन-14 (¹⁴C) डेटिंग: ¹⁴C रेडियोधर्मी (Radioactive) है, अर्ध-आयु (Half-life) ~5730 वर्ष। जीवित प्राणी ¹⁴C अवशोषित करते हैं; मृत्यु के बाद यह क्षय (Decay) होता है। शेष ¹⁴C मापकर जीवाश्मों (Fossils) की आयु ज्ञात की जाती है।"
            },
            {
                "q": "The valency of an element with atomic number 16 is —\n(परमाणु संख्या 16 वाले तत्त्व की संयोजकता है —)",
                "options": [
                    "6",
                    "4",
                    "1",
                    "2"
                ],
                "answer": "2",
                "explanation": "🔬 Atomic number 16 = Sulphur (S). Electronic config: 2, 8, 6. Valence electrons = 6. Valency = 8−6 = 2. Sulphur needs 2 more electrons to complete its octet.\n\n📘 परमाणु संख्या 16 = सल्फर (Sulphur)। इलेक्ट्रॉनिक विन्यास (Electronic Configuration): 2, 8, 6। संयोजकता इलेक्ट्रॉन (Valence Electrons) = 6। संयोजकता (Valency) = 8−6 = 2। सल्फर को अष्टक (Octet) पूरा करने के लिए 2 और इलेक्ट्रॉन चाहिए।"
            },
            {
                "q": "For element A (atomic no. 10) and element B (atomic no. 11), which is correct?\n(तत्त्व A की परमाणु संख्या 10 व B की 11 है, कौन-सा कथन सत्य है?)",
                "options": [
                    "A is more reactive than B (A, B से अधिक सक्रिय है)",
                    "B is more reactive than A (B, A से अधिक सक्रिय है)",
                    "Both are chemically inert (शायनिक रूप से अक्रिय है)",
                    "A and B are equally reactive (A व B समान रूप से सक्रिय हैं)"
                ],
                "answer": "B is more reactive than A (B, A से अधिक सक्रिय है)",
                "explanation": "🔬 A (Z=10) = Neon → config: 2, 8 → complete octet → INERT (noble gas). B (Z=11) = Sodium → config: 2, 8, 1 → 1 valence electron → highly reactive metal. So B is more reactive.\n\n📘 A (Z=10) = नियॉन (Neon) → विन्यास: 2, 8 → पूर्ण अष्टक (Complete Octet) → अक्रिय (Inert/Noble Gas)। B (Z=11) = सोडियम (Sodium) → विन्यास: 2, 8, 1 → 1 संयोजकता इलेक्ट्रॉन → अत्यधिक सक्रिय (Highly Reactive) धातु। अतः B अधिक सक्रिय है।"
            },
            {
                "q": "Which statement is FALSE?\n(निम्न में कौन-सा कथन असत्य है?)",
                "options": [
                    "Heavy elements are radioactive (भारी तत्त्व रेडियोधर्मी होते हैं)",
                    "α-particles are positively charged (α-कण धन आवेशित हैं)",
                    "β-particles are chargeless (β-कण आवेश रहित हैं)",
                    "Isotopes have same atomic number (समस्थानिकों की परमाणु संख्या समान होती है)"
                ],
                "answer": "β-particles are chargeless (β-कण आवेश रहित हैं)",
                "explanation": "🔬 β-particles are high-speed ELECTRONS (e⁻) — they carry NEGATIVE charge (−1), NOT chargeless. α-particles = He²⁺ (positive). γ-rays are chargeless. So the statement \"β-particles are chargeless\" is FALSE.\n\n📘 β-कण तीव्र गति के इलेक्ट्रॉन (Electrons) हैं — इन पर ऋण आवेश (Negative Charge, −1) होता है, ये आवेश रहित नहीं हैं। α-कण = He²⁺ (धनावेशित)। γ-किरणें आवेश रहित (Chargeless) हैं। अतः \"β-कण आवेश रहित हैं\" कथन असत्य (FALSE) है।"
            },
            {
                "q": "The valency of Calcium (atomic number 20) is —\n(कैल्सियम परमाणु संख्या 20 की संयोजकता है —)",
                "options": [
                    "1",
                    "2",
                    "3",
                    "6"
                ],
                "answer": "2",
                "explanation": "🔬 Ca (Z=20): electronic config = 2, 8, 8, 2. Valence electrons = 2. Valency = 2. Calcium loses 2 electrons to form Ca²⁺ ion with stable config 2, 8, 8.\n\n📘 Ca (Z=20): इलेक्ट्रॉनिक विन्यास = 2, 8, 8, 2। संयोजकता इलेक्ट्रॉन = 2। संयोजकता (Valency) = 2। कैल्सियम 2 इलेक्ट्रॉन खोकर Ca²⁺ आयन बनाता है — स्थायी विन्यास 2, 8, 8।"
            },
            {
                "q": "P-32 is used for —\n(P-32 का प्रयोग किया जाता है —)",
                "options": [
                    "Cancer (कैंसर)",
                    "Thyroid (थायरॉइड)",
                    "Leukaemia (ल्यूकीमिया)",
                    "Blockage of arteries (धमनी की रुकावट)"
                ],
                "answer": "Leukaemia (ल्यूकीमिया)",
                "explanation": "🔬 Phosphorus-32 (P-32) is a radioactive isotope used in treatment of leukaemia (blood cancer). It emits β-particles that destroy abnormal white blood cells. Other medical isotopes: I-131 (thyroid), Co-60 (cancer).\n\n📘 फॉस्फोरस-32 (P-32) रेडियोधर्मी समस्थानिक (Radioactive Isotope) है जो ल्यूकीमिया (Leukaemia — रक्त कैंसर) के उपचार में प्रयोग होता है। यह β-कण उत्सर्जित करता है जो असामान्य श्वेत रक्त कोशिकाओं (WBCs) को नष्ट करते हैं।"
            },
            {
                "q": "I-131 is used in the treatment of —\n(I-131 किसके उपचार में प्रयोग किया जाता है?)",
                "options": [
                    "Cancer treatment (कैंसर उपचार में)",
                    "Thyroid disorder (थायरॉइड विकार में)",
                    "Leukaemia (ल्यूकीमिया में)",
                    "Blockage of arteries (धमनी की रुकावट में)"
                ],
                "answer": "Thyroid disorder (थायरॉइड विकार में)",
                "explanation": "🔬 Iodine-131 (I-131) is used to treat thyroid disorders (especially hyperthyroidism and thyroid cancer). The thyroid gland absorbs iodine, so radioactive I-131 targets and destroys overactive thyroid tissue.\n\n📘 आयोडीन-131 (I-131) थायरॉइड विकारों (Thyroid Disorders — हाइपरथायरॉइडिज्म व थायरॉइड कैंसर) के उपचार में प्रयोग होता है। थायरॉइड ग्रंथि (Thyroid Gland) आयोडीन अवशोषित करती है, इसलिए रेडियोधर्मी I-131 सीधे अतिसक्रिय थायरॉइड ऊतक (Tissue) को नष्ट करता है।"
            },
            {
                "q": "The charge on an electron is —\n(इलेक्ट्रॉन पर आवेश है —)",
                "options": [
                    "1.6 × 10⁻¹⁹ C",
                    "9.1 × 10⁻¹⁶ C",
                    "1.9 × 10⁻¹⁶ C",
                    "6.1 × 10⁻¹⁹ C"
                ],
                "answer": "1.6 × 10⁻¹⁹ C",
                "explanation": "🔬 The charge of an electron = 1.6 × 10⁻¹⁹ Coulombs (negative). This was determined by Millikan's oil drop experiment. Mass of electron = 9.1 × 10⁻³¹ kg.\n\n📘 इलेक्ट्रॉन का आवेश (Charge) = 1.6 × 10⁻¹⁹ कूलॉम (Coulomb) — ऋणात्मक (Negative)। यह मिलिकन (Millikan) के तेल बूँद प्रयोग (Oil Drop Experiment) से ज्ञात हुआ। इलेक्ट्रॉन का द्रव्यमान = 9.1 × 10⁻³¹ kg।"
            },
            {
                "q": "_______ are chargeless.\n(_______ आवेश रहित हैं।)",
                "options": [
                    "Neutrons (न्यूट्रॉन)",
                    "Protons (प्रोटॉन)",
                    "Electrons (इलेक्ट्रॉन)",
                    "Electrons and Neutrons (इलेक्ट्रॉन व न्यूट्रॉन)"
                ],
                "answer": "Neutrons (न्यूट्रॉन)",
                "explanation": "🔬 Neutrons are electrically neutral (charge = 0). Protons are positively charged (+1) and electrons are negatively charged (−1). Neutrons were discovered by James Chadwick in 1932.\n\n📘 न्यूट्रॉन (Neutron) विद्युत रूप से उदासीन (Neutral, आवेश = 0) होते हैं। प्रोटॉन धनावेशित (+1) और इलेक्ट्रॉन ऋणावेशित (−1) होते हैं। न्यूट्रॉन की खोज जेम्स चैडविक (James Chadwick) ने 1932 में की।"
            },
            {
                "q": "_______ is NOT present in the nucleus of heavy elements.\n(भारी तत्त्वों के नाभिक में _______ नहीं होता।)",
                "options": [
                    "Proton (प्रोटॉन)",
                    "None of these (इनमें से कोई नहीं)",
                    "Neutron (न्यूट्रॉन)",
                    "Electron (इलेक्ट्रॉन)"
                ],
                "answer": "Electron (इलेक्ट्रॉन)",
                "explanation": "🔬 Electrons are NOT present in the nucleus of any element. The nucleus contains only protons and neutrons. Electrons orbit the nucleus in shells (K, L, M, N...). This is true for all elements — light or heavy.\n\n📘 इलेक्ट्रॉन (Electron) किसी भी तत्त्व के नाभिक (Nucleus) में नहीं होते — ये नाभिक के बाहर कक्षाओं (Orbits/Shells) में चक्कर लगाते हैं। नाभिक में केवल प्रोटॉन (Proton) और न्यूट्रॉन (Neutron) होते हैं।"
            },
            {
                "q": "_______ is NOT present in a hydrogen atom.\n(हाइड्रोजन परमाणु में _______ नहीं होता।)",
                "options": [
                    "Proton (प्रोटॉन)",
                    "Neutron (न्यूट्रॉन)",
                    "Electron and Proton (इलेक्ट्रॉन व प्रोटॉन)",
                    "Electron (इलेक्ट्रॉन)"
                ],
                "answer": "Neutron (न्यूट्रॉन)",
                "explanation": "🔬 Hydrogen (¹₁H / Protium) has 1 proton + 1 electron + 0 neutrons. It is the simplest and only atom without a neutron. Its isotopes Deuterium (²H) and Tritium (³H) do have neutrons.\n\n📘 हाइड्रोजन (¹₁H / प्रोटियम) में 1 प्रोटॉन + 1 इलेक्ट्रॉन + 0 न्यूट्रॉन होते हैं। यह सबसे सरल परमाणु है और बिना न्यूट्रॉन (Neutron) का एकमात्र परमाणु है। इसके समस्थानिक ड्यूटीरियम (²H) व ट्राइटियम (³H) में न्यूट्रॉन होते हैं।"
            },
            {
                "q": "Who first used cathode rays?\n(कैथोड किरणों का प्रयोग सर्वप्रथम किसने किया?)",
                "options": [
                    "Goldstein (गोल्डस्टीन)",
                    "J.J. Thomson (जे.जे. टॉमसन)",
                    "Niels Bohr (नील्स बोर)",
                    "Rutherford (रदरफोर्ड)"
                ],
                "answer": "J.J. Thomson (जे.जे. टॉमसन)",
                "explanation": "🔬 J.J. Thomson first used cathode rays in his experiments (1897) and discovered the electron by measuring the charge-to-mass ratio (e/m) of cathode ray particles. Goldstein named them \"cathode rays\" in 1876, but Thomson was the first to experimentally use them.\n\n📘 जे.जे. टॉमसन (J.J. Thomson) ने सर्वप्रथम कैथोड किरणों (Cathode Rays) का प्रयोग अपने प्रयोगों में किया (1897) और इलेक्ट्रॉन (Electron) की खोज की। गोल्डस्टीन (Goldstein) ने 1876 में इन्हें \"कैथोड किरणें\" नाम दिया था, लेकिन टॉमसन ने इनका प्रयोग सर्वप्रथम किया।"
            },
            {
                "q": "Who first used thin gold foil for α-particle scattering?\n(सोने की पतली पन्नी पर α-कण की बौछार सर्वप्रथम किसने की?)",
                "options": [
                    "Chadwick (चैडविक)",
                    "J.J. Thomson (जे.जे. टॉमसन)",
                    "Niels Bohr (नील्स बोर)",
                    "Rutherford (रदरफोर्ड)"
                ],
                "answer": "Rutherford (रदरफोर्ड)",
                "explanation": "🔬 Ernest Rutherford conducted the gold foil experiment (1911) with Geiger and Marsden. They bombarded a 0.00004 cm thin gold foil with α-particles, leading to the discovery of the atomic nucleus.\n\n📘 अर्नेस्ट रदरफोर्ड (Rutherford) ने 1911 में गाइगर (Geiger) और मार्सडन (Marsden) के साथ स्वर्ण पन्नी प्रयोग (Gold Foil Experiment) किया। 0.00004 cm पतली सोने की पन्नी पर α-कणों की बौछार की, जिससे नाभिक (Nucleus) की खोज हुई।"
            },
            {
                "q": "Who discovered the neutron?\n(न्यूट्रॉन की खोज किसने की?)",
                "options": [
                    "Chadwick (चैडविक)",
                    "J.J. Thomson (जे.जे. टॉमसन)",
                    "Niels Bohr (नील्स बोर)",
                    "Rutherford (रदरफोर्ड)"
                ],
                "answer": "Chadwick (चैडविक)",
                "explanation": "🔬 James Chadwick discovered the neutron in 1932 by bombarding beryllium with α-particles. He received the Nobel Prize in Physics (1935) for this discovery. Neutron: mass ≈ proton mass, charge = 0.\n\n📘 जेम्स चैडविक (James Chadwick) ने 1932 में बेरिलियम (Beryllium) पर α-कणों की बौछार करके न्यूट्रॉन (Neutron) की खोज की। उन्हें इसके लिए 1935 में भौतिकी का नोबेल पुरस्कार (Nobel Prize in Physics) मिला।"
            },
            {
                "q": "An electron is —\n(इलेक्ट्रॉन होता है —)",
                "options": [
                    "1/1838 mass of proton and uncharged (प्रोटॉन का 1/1838 भाग व धन अनावेशित)",
                    "Equal mass to proton and negatively charged (प्रोटॉन के बराबर व ऋण आवेशित)",
                    "Equal mass to proton with 1/1838 charge (द्रव्यमान में प्रोटॉन का 1/1838 व ऋण आवेशित)",
                    "Equal mass to proton and positively charged (द्रव्यमान में प्रोटॉन के बराबर व धन आवेशित)"
                ],
                "answer": "Equal mass to proton with 1/1838 charge (द्रव्यमान में प्रोटॉन का 1/1838 व ऋण आवेशित)",
                "explanation": "🔬 Electron: mass = 1/1838 of proton mass (9.1×10⁻³¹ kg), charge = −1.6×10⁻¹⁹ C (negative). It is the lightest subatomic particle. Discovered by J.J. Thomson in 1897.\n\n📘 इलेक्ट्रॉन: द्रव्यमान = प्रोटॉन का 1/1838 भाग (9.1×10⁻³¹ kg), आवेश = −1.6×10⁻¹⁹ C (ऋणात्मक)। यह सबसे हल्का अवपरमाणुक कण (Lightest Subatomic Particle) है। खोज: जे.जे. टॉमसन (J.J. Thomson), 1897।"
            },
            {
                "q": "The number of protons in an atom equals —\n(किसी परमाणु में प्रोटॉन की संख्या होती है —)",
                "options": [
                    "Number of neutrons (न्यूट्रॉन की संख्या के बराबर)",
                    "Number of electrons (इलेक्ट्रॉन की संख्या के बराबर)",
                    "Atomic mass (परमाणु द्रव्यमान के बराबर)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Number of electrons (इलेक्ट्रॉन की संख्या के बराबर)",
                "explanation": "🔬 In a neutral atom: number of protons = number of electrons (atom is electrically neutral). Atomic number (Z) = number of protons = number of electrons. Neutrons may differ (isotopes).\n\n📘 उदासीन (Neutral) परमाणु में: प्रोटॉन संख्या = इलेक्ट्रॉन संख्या (परमाणु विद्युत रूप से उदासीन होता है)। परमाणु संख्या (Z) = प्रोटॉन = इलेक्ट्रॉन। न्यूट्रॉन भिन्न हो सकते हैं (समस्थानिक/Isotopes)।"
            },
            {
                "q": "If an element has 9 protons and 10 neutrons, its atomic mass is —\n(यदि किसी तत्त्व के परमाणु में 9 प्रोटॉन व 10 न्यूट्रॉन हों तो उसका परमाणु द्रव्यमान है —)",
                "options": [
                    "19",
                    "9",
                    "10",
                    "1"
                ],
                "answer": "19",
                "explanation": "🔬 Atomic mass (A) = Protons + Neutrons = 9 + 10 = 19. This element is Fluorine (F, Z=9). Mass number = sum of nucleons (protons + neutrons) in the nucleus.\n\n📘 परमाणु द्रव्यमान (A) = प्रोटॉन + न्यूट्रॉन = 9 + 10 = 19। यह तत्त्व फ्लुओरीन (Fluorine, Z=9) है। द्रव्यमान संख्या (Mass Number) = नाभिक (Nucleus) में न्यूक्लिऑनों (Nucleons = Protons + Neutrons) का योग।"
            },
            {
                "q": "Na has atomic mass 23 and atomic number 11. Number of neutrons is —\n(Na का परमाणु द्रव्यमान 23 व परमाणु क्रमांक 11 है, तो न्यूट्रॉन होंगे —)",
                "options": [
                    "11",
                    "12",
                    "23",
                    "Cannot be determined (कोई निश्चित नहीं)"
                ],
                "answer": "12",
                "explanation": "🔬 Neutrons = Mass number − Atomic number = A − Z = 23 − 11 = 12. Sodium (Na): 11 protons, 11 electrons, 12 neutrons. Electronic config: 2, 8, 1.\n\n📘 न्यूट्रॉन = द्रव्यमान संख्या − परमाणु संख्या = A − Z = 23 − 11 = 12। सोडियम (Na): 11 प्रोटॉन, 11 इलेक्ट्रॉन, 12 न्यूट्रॉन। इलेक्ट्रॉनिक विन्यास: 2, 8, 1।"
            },
            {
                "q": "Valence electrons are present in _______ shell of an atom.\n(संयोजकता इलेक्ट्रॉन परमाणु के _______ कक्ष में उपस्थित होते हैं।)",
                "options": [
                    "Any shell (किसी भी कक्ष)",
                    "Second shell (द्वितीय कक्ष)",
                    "Outermost shell (बाह्यतम कक्ष)",
                    "First shell (प्रथम कक्ष)"
                ],
                "answer": "Outermost shell (बाह्यतम कक्ष)",
                "explanation": "🔬 Valence electrons are found in the outermost (valence) shell of an atom. They determine the chemical properties and reactivity of the element. Example: Na (2,8,1) → 1 valence electron in the outermost (3rd) shell.\n\n📘 संयोजकता इलेक्ट्रॉन (Valence Electrons) परमाणु के बाह्यतम (Outermost/Valence) कोश में पाए जाते हैं। ये तत्त्व के रासायनिक गुणों (Chemical Properties) और अभिक्रियाशीलता (Reactivity) को निर्धारित करते हैं। उदा: Na (2,8,1) → बाह्यतम (तीसरे) कोश में 1 संयोजकता इलेक्ट्रॉन।"
            },
            {
                "q": "If the outermost shell is the first shell, the maximum electrons it can hold is —\n(यदि किसी तत्त्व का बाह्यतम कक्ष प्रथम कक्ष है तो वह बाह्यतम कक्ष में इलेक्ट्रॉन होने पर अक्रिय गैस का विन्यास प्राप्त कर लेगा।)",
                "options": [
                    "2",
                    "4",
                    "6",
                    "8"
                ],
                "answer": "2",
                "explanation": "🔬 If the outermost shell is the 1st shell (K-shell), max electrons = 2n² = 2(1)² = 2. Elements like He (2) have a complete K-shell and are noble/inert gases. This is the duplet rule.\n\n📘 यदि बाह्यतम कोश पहला कोश (K-shell) है, तो अधिकतम इलेक्ट्रॉन = 2n² = 2(1)² = 2। हीलियम (He) में 2 इलेक्ट्रॉन हैं — K-shell पूर्ण → अक्रिय गैस (Noble Gas)। इसे द्विक नियम (Duplet Rule) कहते हैं।"
            },
            {
                "q": "Every element tries to obtain _______ electrons in its outermost shell.\n(प्रत्येक तत्त्व अपने बाह्यतम कक्ष में _______ इलेक्ट्रॉन पूरा करने का प्रयत्न करता है।)",
                "options": [
                    "2",
                    "4",
                    "6",
                    "8"
                ],
                "answer": "8",
                "explanation": "🔬 The Octet Rule: every element tends to achieve 8 electrons in its outermost shell (like noble gases) to attain stability. Exception: H and He follow the duplet rule (2 electrons). Elements gain, lose, or share electrons to achieve this.\n\n📘 अष्टक नियम (Octet Rule): प्रत्येक तत्त्व बाह्यतम कोश में 8 इलेक्ट्रॉन प्राप्त करने का प्रयत्न करता है (उत्कृष्ट गैसों/Noble Gases की तरह) — स्थायित्व (Stability) के लिए। अपवाद: H और He द्विक नियम (Duplet Rule — 2 इलेक्ट्रॉन) का पालन करते हैं।"
            }
        ]
    },
    "c10_chemical_reactions": {
        "title": "Chemical Reactions & Equations",
        "category": "Chemistry",
        "emoji": "⚗️",
        "xpPerQuestion": 15,
        "questions": [
            {
                "q": "In the chemical reaction: 2FeCl₃ + 2H₂O + y ──> 2FeCl₂ + H₂SO₄ + 2HCl, y is:\n(2FeCl₃ + 2H₂O + y ──> 2FeCl₂ + H₂SO₄ + 2HCl रासायनिक अभिक्रिया में y है-)",
                "options": [
                    "S",
                    "H₂S",
                    "SO₂",
                    "Cl₂"
                ],
                "answer": "SO₂",
                "explanation": "🔬 By balancing the atoms on both sides of the equation: Left side has 2 Fe, 6 Cl, 4 H, 2 O, and y. Right side has 2 Fe, 6 Cl, 4 H, 1 S, and 4 O. Subtracting them shows that y must contain 1 S and 2 O atoms, which is sulfur dioxide (SO₂).\n\n📘 समीकरण के दोनों पक्षों के परमाणुओं को संतुलित करने पर: बाईं ओर 2 Fe, 6 Cl, 4 H, 2 O और y हैं। दाईं ओर 2 Fe, 6 Cl, 4 H, 1 S और 4 O हैं। अंतर करने पर y में 1 S और 2 O परमाणु होने चाहिए, जो कि सल्फर डाइऑक्साइड (SO₂) है।"
            },
            {
                "q": "When ammonia (NH₃) and hydrogen chloride (HCl) come in contact, they react to form:\n(अमोनिया (NH₃) और हाइड्रोजन क्लोराइड (HCl) संपर्क में आने पर क्रिया करके बनाते हैं-)",
                "options": [
                    "Ammonium chloride (अमोनियम क्लोराइड)",
                    "Ammonium sulphide (अमोनियम सल्फाइड)",
                    "Ammonium oxide (अमोनियम ऑक्साइड)",
                    "Sulphur (गन्धक)"
                ],
                "answer": "Ammonium chloride (अमोनियम क्लोराइड)",
                "explanation": "🔬 Gaseous ammonia (NH₃) and hydrogen chloride (HCl) react to form solid ammonium chloride (NH₄Cl). This is a combination reaction that produces dense white fumes.\n\n📘 अमोनिया गैस (NH₃) और हाइड्रोजन क्लोराइड गैस (HCl) आपस में क्रिया करके ठोस अमोनियम क्लोराइड (NH₄Cl) बनाते हैं। यह एक संयोजन अभिक्रिया (Combination Reaction) है जो घने सफेद धुएं का निर्माण करती है।"
            },
            {
                "q": "The reaction: NH₄Cl ⇌ NH₄⁺ + Cl⁻ is a:\n(NH₄Cl ⇌ NH₄⁺ + Cl⁻ अभिक्रिया है-)",
                "options": [
                    "Thermal decomposition (ऊष्मीय अपघटन)",
                    "Ionic dissociation (आयनिक वियोजन)",
                    "Thermal dissociation (ऊष्मीय वियोजन)",
                    "Electrolysis (विद्युत-अपघटन)"
                ],
                "answer": "Ionic dissociation (आयनिक वियोजन)",
                "explanation": "🔬 When ammonium chloride (NH₄Cl) dissolves in water, it splits reversibly into ammonium ions (NH₄⁺) and chloride ions (Cl⁻). Since it involves dissociation into ions in solution, it is called ionic dissociation.\n\n📘 जब अमोनियम क्लोराइड (NH₄Cl) को जल में घोला जाता है, तो यह अमोनियम आयन (NH₄⁺) और क्लोराइड आयन (Cl⁻) में विभाजित हो जाता है। चूंकि इसमें आयनों में वियोजन होता है, इसलिए इसे आयनिक वियोजन कहते हैं।"
            },
            {
                "q": "The reaction in which new compounds are formed by the exchange of ions is called:\n(वह अभिक्रिया जिसमें आयनों के विनिमय से नये यौगिक बनते हैं, कहलाती है-)",
                "options": [
                    "Displacement reaction (विस्थापन अभिक्रिया)",
                    "Double displacement reaction (द्विविस्थापन / उभय-अपघटन अभिक्रिया)",
                    "Addition reaction (योगात्मक अभिक्रिया)",
                    "Decomposition reaction (अपघटन अभिक्रिया)"
                ],
                "answer": "Double displacement reaction (द्विविस्थापन / उभय-अपघटन अभिक्रिया)",
                "explanation": "🔬 Double displacement (or double decomposition) reactions involve the mutual exchange of ions between two compounds to form two new compounds.\n\n📘 द्विविस्थापन (या उभय-अपघटन) अभिक्रियाओं में दो यौगिकों के बीच आयनों का परस्पर आदान-प्रदान (विनिमय) होता है जिससे दो नए यौगिक बनते हैं।"
            },
            {
                "q": "Which of the following is a chemical change?\n(निम्नलिखित में से क्या रासायनिक परिवर्तन है?)",
                "options": [
                    "Rusting of iron (लोहे में जंग लगना)",
                    "Glowing of an electric bulb (विद्युत बल्ब का जलना)",
                    "Melting of wax (मोम का पिघलना)",
                    "Magnetisation of a substance (पदार्थ का चुम्बकन)"
                ],
                "answer": "Rusting of iron (लोहे में जंग लगना)",
                "explanation": "🔬 Rusting of iron is a chemical change because iron reacts with atmospheric oxygen and moisture to form a new substance, hydrated iron(III) oxide (Fe₂O₃·xH₂O), which cannot be reversed.\n\n📘 लोहे में जंग लगना एक रासायनिक परिवर्तन है क्योंकि लोहा वायुमंडलीय ऑक्सीजन और नमी से क्रिया करके एक नया पदार्थ (जंग) बनाता है, जिसे वापस लोहे में नहीं बदला जा सकता।"
            },
            {
                "q": "Rusting of iron is which type of reaction?\n(लोहे पर जंग लगना किस प्रकार की क्रिया है?)",
                "options": [
                    "Oxidation (ऑक्सीकरण)",
                    "Reduction (अपचयन)",
                    "Both oxidation and reduction (ऑक्सीकरण और अपचयन दोनों)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Oxidation (ऑक्सीकरण)",
                "explanation": "🔬 Rusting of iron involves the addition of oxygen to iron, forming iron oxides. In school curriculums, this is primarily classified as an oxidation reaction because iron loses electrons (Fe ──> Fe³⁺) and gains oxygen.\n\n📘 लोहे पर जंग लगने की प्रक्रिया में लोहे का ऑक्सीजन के साथ संयोग होता है। चूंकि लोहा इलेक्ट्रॉन खोता है और ऑक्सीजन ग्रहण करता है, इसे मुख्य रूप से ऑक्सीकरण अभिक्रिया के रूप में वर्गीकृत किया जाता है।"
            },
            {
                "q": "Digestion of food in our body is what type of reaction?\n(हमारे शरीर में भोजन का पचना (digestion) किस प्रकार की क्रिया है?)",
                "options": [
                    "Decomposition reaction (अपघटन अभिक्रिया)",
                    "Oxidation reaction (ऑक्सीकरण अभिक्रिया)",
                    "Neutralisation reaction (उदासीनीकरण)",
                    "Reduction reaction (अपचयन अभिक्रिया)"
                ],
                "answer": "Decomposition reaction (अपघटन अभिक्रिया)",
                "explanation": "🔬 Digestion is a decomposition reaction where complex food molecules (like starch, proteins, and fats) are broken down by enzymes into simpler, soluble substances (like glucose, amino acids, and fatty acids) that the body can absorb.\n\n📘 पाचन एक अपघटन (Decomposition) अभिक्रिया है जिसमें भोजन के जटिल अणु (जैसे स्टार्च, प्रोटीन, वसा) एंजाइमों द्वारा सरल, घुलनशील पदार्थों (जैसे ग्लूकोज) में टूट जाते हैं।"
            },
            {
                "q": "An endothermic reaction is one in which:\n(ऊष्माशोषी अभिक्रिया वह होती है जिसमें-)",
                "options": [
                    "Heat is converted into electricity (ऊष्मा विद्युत में परिवर्तित हो जाती है)",
                    "Heat is absorbed (ऊष्मा का शोषण होता है)",
                    "Heat is released (ऊष्मा उत्पन्न होती है)",
                    "Neither heat is absorbed nor destroyed (न ऊष्मा का शोषण होता है और न ही नष्ट होती है)"
                ],
                "answer": "Heat is absorbed (ऊष्मा का शोषण होता है)",
                "explanation": "🔬 Endothermic reactions are chemical reactions in which heat energy is absorbed from the surroundings to break chemical bonds.\n\n📘 ऊष्माशोषी अभिक्रियाएँ वे रासायनिक अभिक्रियाएँ होती हैं जिनमें अभिकारकों के बीच बंधों को तोड़ने के लिए बाहरी वातावरण से ऊष्मा ऊर्जा का अवशोषण होता है।"
            },
            {
                "q": "Substitution reaction is a characteristic property of:\n(प्रतिस्थापन अभिक्रिया मुख्य गुण है-)",
                "options": [
                    "Alkenes (ऐल्कीन का)",
                    "Carbon monoxide (कार्बन मोनोऑक्साइड का)",
                    "Alkynes (ऐल्काइन का)",
                    "Paraffins / Alkanes (पैराफिन का)"
                ],
                "answer": "Paraffins / Alkanes (पैराफिन का)",
                "explanation": "🔬 Substitution reactions are characteristic of saturated hydrocarbons (paraffins/alkanes). Since they lack double/triple bonds, they cannot undergo addition reactions and instead replace hydrogen atoms with other groups (e.g., chlorination of methane).\n\n📘 प्रतिस्थापन अभिक्रियाएँ संतृप्त हाइड्रोकार्बन (पैराफिन या एल्केन) का मुख्य गुण हैं। चूंकि इनमें केवल एकल बन्ध होते हैं, ये योगात्मक अभिक्रियाएँ नहीं कर सकते और हाइड्रोजन परमाणु को किसी अन्य परमाणु से प्रतिस्थापित करते हैं।"
            },
            {
                "q": "Formation of curd is what type of change?\n(दही का जमना किस प्रकार का परिवर्तन है?)",
                "options": [
                    "Physical change (भौतिक परिवर्तन)",
                    "Chemical change (रासायनिक परिवर्तन)",
                    "Both physical and chemical (भौतिक तथा रासायनिक परिवर्तन)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Chemical change (रासायनिक परिवर्तन)",
                "explanation": "🔬 Formation of curd is a chemical change because lactic acid bacteria (Lactobacillus) convert lactose sugar in milk into lactic acid, changing its chemical composition and properties permanently. It cannot be reversed.\n\n📘 दही का जमना एक रासायनिक परिवर्तन है क्योंकि दूध में उपस्थित लैक्टोज शर्करा लैक्टोबैसिलस जीवाणु द्वारा लैक्टिक अम्ल में परिवर्तित हो जाती है, जिससे नया पदार्थ बनता है और इसे वापस दूध में नहीं बदला जा सकता।"
            },
            {
                "q": "What type of reaction is: BaCl₂ + Na₂SO₄ ──> BaSO₄ + 2NaCl?\n(अभिक्रिया, BaCl₂ + Na₂SO₄ ──> BaSO₄ + 2NaCl किस प्रकार की है?)",
                "options": [
                    "Addition reaction (योग अभिक्रिया)",
                    "Double displacement reaction (द्विविस्थापन अभिक्रिया)",
                    "Decomposition reaction (अपघटन अभिक्रिया)",
                    "Displacement reaction (विस्थापन अभिक्रिया)"
                ],
                "answer": "Double displacement reaction (द्विविस्थापन अभिक्रिया)",
                "explanation": "🔬 In this reaction, barium ions (Ba²⁺) and sodium ions (Na⁺) exchange their anions (Cl⁻ and SO₄²⁻) to form barium sulfate (BaSO₄) precipitate and sodium chloride (NaCl). This is a double displacement reaction.\n\n📘 इस अभिक्रिया में, बेरियम आयन (Ba²⁺) और सोडियम आयन (Na⁺) अपने ऋणायनों (Cl⁻ और SO₄²⁻) का विनिमय करके बेरियम सल्फेट (BaSO₄) का सफेद अवक्षेप और सोडियम क्लोराइड (NaCl) बनाते हैं। यह द्विविस्थापन अभिक्रिया है।"
            },
            {
                "q": "In the reaction: CuO + H₂ ──> Cu + H₂O, the oxidizing agent is:\n(अभिक्रिया, CuO + H₂ ──> Cu + H₂O में ऑक्सीकारक पदार्थ है-)",
                "options": [
                    "CuO",
                    "H₂",
                    "Both CuO and H₂ (CuO तथा H₂ दोनों)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "CuO",
                "explanation": "🔬 The oxidizing agent is the substance that oxidizes another substance while getting reduced itself. Here, copper oxide (CuO) oxidizes hydrogen (H₂) to water (H₂O) while losing its own oxygen to become copper (Cu).\n\n📘 ऑक्सीकारक वह पदार्थ होता है जो दूसरी वस्तु को ऑक्सीकृत करता है और स्वयं अपचयित हो जाता है। यहाँ कॉपर ऑक्साइड (CuO), हाइड्रोजन (H₂) को जल (H₂O) में ऑक्सीकृत करता है और स्वयं कॉपर (Cu) में अपचयित हो जाता है।"
            },
            {
                "q": "Chemically, 'rust' is:\n(रासायनिक दृष्टि से 'जंग' है-)",
                "options": [
                    "Hydrated oxide (हाइड्रेटेड ऑक्साइड)",
                    "Hydrated ferric oxide (हाइड्रेटेड फेरिक ऑक्साइड)",
                    "Only ferric oxide (केवल फेरिक ऑक्साइड)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Hydrated ferric oxide (हाइड्रेटेड फेरिक ऑक्साइड)",
                "explanation": "🔬 Rust is chemically hydrated ferric oxide (Fe₂O₃·xH₂O). It is formed when iron reacts with oxygen and moisture over time, creating a reddish-brown flaky substance.\n\n📘 रासायनिक रूप से जंग 'हाइड्रेटेड फेरिक ऑक्साइड' (Fe₂O₃·xH₂O) है। यह तब बनता है जब लोहा ऑक्सीजन और नमी के साथ क्रिया करके लाल-भूरे रंग की परत बनाता है।"
            },
            {
                "q": "The substances that take part in a chemical reaction are called:\n(रासायनिक अभिक्रिया में भाग लेने वाले पदार्थों को कहते हैं-)",
                "options": [
                    "Reactants (अभिकारक)",
                    "Products (उत्पाद)",
                    "Oxidizing agents (ऑक्सीकारक)",
                    "Reducing agents (अपचायक)"
                ],
                "answer": "Reactants (अभिकारक)",
                "explanation": "🔬 Reactants are the starting substances in a chemical reaction that undergo chemical change, written on the left side of the equation.\n\n📘 रासायनिक अभिक्रिया में भाग लेने वाले आरंभिक पदार्थों को अभिकारक (Reactants) कहते हैं, जिन्हें समीकरण में बाईं ओर लिखा जाता।"
            },
            {
                "q": "Oxidation is that chemical reaction in which:\n(ऑक्सीकरण वह रासायनिक अभिक्रिया है जिसमें-)",
                "options": [
                    "Electrons are lost (इलेक्ट्रॉन पृथक होते हैं)",
                    "Electrons are gained (इलेक्ट्रॉन ग्रहण होते हैं)",
                    "Valency of electropositive element decreases (विद्युत धनात्मक अवयव की संयोजकता घटती है)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Electrons are lost (इलेक्ट्रॉन पृथक होते हैं)",
                "explanation": "🔬 According to the modern electronic concept, oxidation is the loss of one or more electrons by an atom, ion, or molecule (de-electronation).\n\n📘 आधुनिक इलेक्ट्रॉनिक सिद्धांत के अनुसार, ऑक्सीकरण वह अभिक्रिया है जिसमें कोई परमाणु, आयन या अणु एक या अधिक इलेक्ट्रॉन खोता (पृथक करता) है।"
            },
            {
                "q": "In the reaction: 3MnO₂ + 4Al ──> 3Mn + 2Al₂O₃, which substance has been reduced?\n(निम्न अभिक्रिया में किस पदार्थ का अपचयन हुआ है? 3MnO₂ + 4Al ──> 3Mn + 2Al₂O₃)",
                "options": [
                    "MnO₂",
                    "Al",
                    "Al₂O₃",
                    "Mn"
                ],
                "answer": "MnO₂",
                "explanation": "🔬 Reduction is the loss of oxygen. Here, manganese dioxide (MnO₂) loses oxygen to become manganese (Mn), so MnO₂ is reduced.\n\n📘 ऑक्सीजन का ह्रास अपचयन कहलाता है। इस अभिक्रिया में मैंगनीज डाइऑक्साइड (MnO₂) ऑक्सीजन खोकर मैंगनीज (Mn) में बदल जाता है, इसलिए MnO₂ का अपचयन हुआ है।"
            },
            {
                "q": "The chemical formula of lead sulphate is:\n(लेड सल्फेट का रासायनिक सूत्र है-)",
                "options": [
                    "Pb₂SO₄",
                    "Pb(SO₄)₂",
                    "PbSO₄",
                    "Pb(SO₄)₃"
                ],
                "answer": "PbSO₄",
                "explanation": "🔬 Lead has a valency of 2 (Pb²⁺) and sulfate ion has a charge of -2 (SO₄²⁻). Combining them in a 1:1 ratio gives the neutral formula PbSO₄.\n\n📘 लेड (Lead) की संयोजकता 2 (Pb²⁺) और सल्फेट आयन का आवेश -2 (SO₄²⁻) होता है। इन दोनों के मिलने से उदासीन सूत्र PbSO₄ बनता है।"
            },
            {
                "q": "In the reaction: SO₂(g) + 2H₂S(g) ──> 2H₂O(g) + 3S(s), the reducing agent is:\n(अभिक्रिया, SO₂(g) + 2H₂S(g) ──> 2H₂O(g) + 3S(s) में अपचायक है-)",
                "options": [
                    "SO₂",
                    "H₂O",
                    "H₂S",
                    "S"
                ],
                "answer": "H₂S",
                "explanation": "🔬 The reducing agent is the substance that gets oxidized by donating hydrogen or losing electrons. Hydrogen sulfide (H₂S) loses hydrogen/electrons to become sulfur (S), reducing SO₂ to S. Therefore, H₂S is the reducing agent.\n\n📘 अपचायक वह पदार्थ है जो स्वयं ऑक्सीकृत होकर दूसरे को अपचयित करता है। यहाँ हाइड्रोजन सल्फाइड (H₂S) हाइड्रोजन खोकर सल्फर (S) में ऑक्सीकृत हो जाता है और SO₂ को सल्फर में अपचयित करता है।"
            },
            {
                "q": "What happens when dilute hydrochloric acid is added to iron filings?\n(लौह चूर्ण पर तनु हाइड्रोक्लोरिक अम्ल डालने से क्या होता है?)",
                "options": [
                    "Hydrogen gas and iron chloride are formed (हाइड्रोजन गैस एवं आयरन क्लोराइड बनता है।)",
                    "Chlorine gas and iron hydroxide are formed (क्लोरीन गैस एवं आयरन हाइड्रॉक्साइड बनता है।)",
                    "No reaction takes place (कोई अभिक्रिया नहीं होती है।)",
                    "Iron salt and water are formed (आर्न लवण एवं जल बनता है।)"
                ],
                "answer": "Hydrogen gas and iron chloride are formed (हाइड्रोजन गैस एवं आयरन क्लोराइड बनता है।)",
                "explanation": "🔬 Iron is more reactive than hydrogen, so it displaces hydrogen from hydrochloric acid, producing iron(II) chloride (FeCl₂) and hydrogen gas (H₂): Fe(s) + 2HCl(aq) ──> FeCl₂(aq) + H₂(g)↑.\n\n📘 लोहा हाइड्रोजन से अधिक सक्रिय है, इसलिए वह हाइड्रोक्लोरिक अम्ल से हाइड्रोजन को विस्थापित कर देता है, जिससे आयरन क्लोराइड (FeCl₂) और हाइड्रोजन गैस (H₂) बनती है: Fe(s) + 2HCl(aq) ──> FeCl₂(aq) + H₂(g)↑।"
            },
            {
                "q": "The chemical formula of lead nitrate is:\n(लेड नाइट्रेट का रासायनिक सूत्र है-)",
                "options": [
                    "PbNO₃",
                    "Pb(NO₃)₂",
                    "Pb(NO₂)₂",
                    "PbO"
                ],
                "answer": "Pb(NO₃)₂",
                "explanation": "🔬 Lead has a valency of 2 (Pb²⁺) and nitrate ion has a valency of 1 (NO₃⁻). Using the criss-cross method, the chemical formula is Pb(NO₃)₂.\n\n📘 लेड (Lead) की संयोजकता 2 (Pb²⁺) और नाइट्रेट आयन की संयोजकता 1 (NO₃⁻) होती है। क्रिस-क्रॉस विधि द्वारा इसका रासायनिक सूत्र Pb(NO₃)₂ बनता है।"
            },
            {
                "q": "Neutralisation reaction takes place between:\n(उदासीनीकरण अभिक्रिया होती है-)",
                "options": [
                    "Acid and acidic salt (अम्ल और अम्लीय लवण में)",
                    "Base and basic salt (क्षार और क्षारीय लवण में)",
                    "Acid and base (अम्ल और क्षार में)",
                    "Acid and water (अम्ल और जल में)"
                ],
                "answer": "Acid and base (अम्ल और क्षार में)",
                "explanation": "🔬 A neutralization reaction is a chemical reaction in which an acid and a base react together to form salt and water.\n\n📘 उदासीनीकरण वह रासायनिक अभिक्रिया है जिसमें एक अम्ल और एक क्षार आपस में मिलकर लवण (Salt) और जल (Water) का निर्माण करते हैं।"
            },
            {
                "q": "The tendency to gain electrons is called:\n(इलेक्ट्रॉन ग्रहण करने की प्रवृत्ति कहलाती है-)",
                "options": [
                    "Oxidation (ऑक्सीकरण)",
                    "Catalysis (उत्प्रेरण)",
                    "Reduction (अपचयन)",
                    "Induction (अभिप्रेरण)"
                ],
                "answer": "Reduction (अपचयन)",
                "explanation": "🔬 According to the electronic concept of chemistry, reduction is defined as the process of gaining one or more electrons by an atom or ion (electronation).\n\n📘 रसायन विज्ञान के इलेक्ट्रॉनिक सिद्धांत के अनुसार, किसी परमाणु या आयन द्वारा एक या अधिक इलेक्ट्रॉन ग्रहण करने की प्रवृत्ति को अपचयन (Reduction) कहा जाता है।"
            },
            {
                "q": "The chemical reaction related to the burning of hydrogen is:\n(हाइड्रोजन के जलने से सम्बन्धित रासायनिक अभिक्रिया है-)",
                "options": [
                    "Hydrogenation (हाइड्रोजनीकरण)",
                    "Reduction (अपचयन)",
                    "Oxidation (ऑक्सीकरण)",
                    "Hydration (जलियोजन)"
                ],
                "answer": "Oxidation (ऑक्सीकरण)",
                "explanation": "🔬 Burning hydrogen involves reaction with oxygen to form water (2H₂ + O₂ ──> 2H₂O). Since hydrogen combines with oxygen (and loses electrons), it is an oxidation reaction.\n\n📘 हाइड्रोजन के जलने पर वह ऑक्सीजन के साथ संयोग कर जल बनाती है (2H₂ + O₂ ──> 2H₂O)। चूंकि हाइड्रोजन का ऑक्सीजन के साथ संयोग होता है, इसलिए यह एक ऑक्सीकरण अभिक्रिया है।"
            },
            {
                "q": "A physical change is:\n(भौतिक परिवर्तन है-)",
                "options": [
                    "Burning of paper (कागज़ का जलना)",
                    "Melting of wax (मोम का पिघलना)",
                    "Heating of sugar (चीनी का गर्म करना)",
                    "Digestion of food (भोजन का पाचन)"
                ],
                "answer": "Melting of wax (मोम का पिघलना)",
                "explanation": "🔬 Melting of wax is a physical change because only its state changes (solid to liquid) and no new chemical substance is formed. The liquid wax can easily solidify back into wax.\n\n📘 मोम का पिघलना एक भौतिक परिवर्तन है क्योंकि इसमें केवल मोम की अवस्था बदलती है (ठोस से द्रव) और कोई नया पदार्थ नहीं बनता। ठण्डा होने पर इसे पुनः ठोस मोम में बदला जा सकता है।"
            },
            {
                "q": "A chemical change is:\n(रासायनिक परिवर्तन है-)",
                "options": [
                    "Burning of wax (मोम का जलना)",
                    "Freezing of water into ice (पानी का बर्फ में बदलना)",
                    "Dissolving salt in water (नमक का पानी में घुलना)",
                    "Dissolving sugar in water (शक्कर का पानी में घुलना)"
                ],
                "answer": "Burning of wax (मोम का जलना)",
                "explanation": "🔬 Burning of wax is a chemical change because the hydrocarbons in wax burn in the presence of oxygen to produce new substances (carbon dioxide and water vapor) along with heat and light.\n\n📘 मोम का जलना एक रासायनिक परिवर्तन है क्योंकि मोम के जलने पर ऑक्सीजन की उपस्थिति में कार्बन डाइऑक्साइड और जलवाष्प जैसे नए पदार्थ बनते हैं और प्रकाश व ऊष्मा उत्पन्न होती है।"
            },
            {
                "q": "What is FALSE about chemical changes?\n(रासायनिक परिवर्तन के बारे में असत्य है-)",
                "options": [
                    "It is permanent (यह परिवर्तन स्थायी होता है।)",
                    "New substances are formed (परिवर्तन के पश्चात् नये पदार्थ बनते हैं।)",
                    "Molecular structure of substance changes (पदार्थ की आणविक संरचना में परिवर्तन होता है।)",
                    "Generally reversible (सामान्यतः उत्क्रमणीय होते हैं।)"
                ],
                "answer": "Generally reversible (सामान्यतः उत्क्रमणीय होते हैं।)",
                "explanation": "🔬 Chemical changes are generally irreversible (cannot be easily reversed to get reactants back) and permanent, as new substances with different chemical properties are formed.\n\n📘 रासायनिक परिवर्तन सामान्यतः अनुत्क्रमणीय (Irreversible) यानी स्थायी होते हैं। इन्हें भौतिक विधियों द्वारा आसानी से वापस नहीं पलटा जा सकता।"
            },
            {
                "q": "Dissolving quick lime in water is what type of change?\n(कली चूने को जल में घोलना कौन-सा परिवर्तन है?)",
                "options": [
                    "Physical change (भौतिक परिवर्तन)",
                    "Chemical change (रासायनिक परिवर्तन)",
                    "Both physical and chemical (दोनों (a) और (b))",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Chemical change (रासायनिक परिवर्तन)",
                "explanation": "🔬 Dissolving quick lime (CaO) in water is a chemical change (combination reaction) because it reacts chemically to form a new substance, slaked lime (Ca(OH)₂), with the evolution of a large amount of heat: CaO + H₂O ──> Ca(OH)₂ + Heat.\n\n📘 कली चूने (CaO) को जल में घोलने पर वह जल के साथ रासायनिक क्रिया करके कैल्शियम हाइड्रॉक्साइड (बुझा हुआ चूना — Ca(OH)₂) बनाता है और प्रचुर मात्रा में ऊष्मा निकलती है। इसलिए यह रासायनिक परिवर्तन है।"
            },
            {
                "q": "The insoluble substances formed in a chemical reaction are called:\n(रासायनिक अभिक्रिया से बनने वाले अघुलनशील पदार्थ कहलाते हैं-)",
                "options": [
                    "Products (उत्पाद)",
                    "Reactants (अभिकारक)",
                    "Precipitate (अवक्षेप)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Precipitate (अवक्षेप)",
                "explanation": "🔬 An insoluble solid that emerges from a liquid solution during a chemical reaction is called a precipitate.\n\n📘 किसी रासायनिक अभिक्रिया के दौरान विलयन में से बनने वाले अघुलनशील ठोस पदार्थ को अवक्षेप (Precipitate) कहा जाता है।"
            },
            {
                "q": "The gas used in the packaging of potato chips is:\n(आलू चिप्स की पैकिंग में इस्तेमाल की जाने वाली गैस है-)",
                "options": [
                    "Oxygen (ऑक्सीजन)",
                    "Hydrogen (हाइड्रोजन)",
                    "Nitrogen (नाइट्रोजन)",
                    "Chlorine (क्लोरीन)"
                ],
                "answer": "Nitrogen (नाइट्रोजन)",
                "explanation": "🔬 Nitrogen is an inert gas. It is flushed into potato chip bags to displace oxygen, preventing the chips from oxidizing and becoming rancid (spoiling).\n\n📘 नाइट्रोजन एक अक्रिय गैस है। इसे आलू चिप्स के थैलों में भरा जाता है ताकि वहाँ से ऑक्सीजन हट जाए, जिससे चिप्स का ऑक्सीकरण नहीं होता और वे सीलन (Rancidity) से बचे रहते हैं।"
            },
            {
                "q": "The decomposition of vegetable matter into compost is what type of reaction?\n(शाक-सब्जियों का विघटित होकर कम्पोस्ट बनना कौन-सी क्रिया है?)",
                "options": [
                    "Exothermic (ऊष्माक्षेपी)",
                    "Endothermic (ऊष्माशोषी)",
                    "Both exothermic and endothermic (दोनों (a) और (b))",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Exothermic (ऊष्माक्षेपी)",
                "explanation": "🔬 The decomposition of organic matter (like vegetable scraps) by microbes is an exothermic reaction because it releases heat energy during the process.\n\n📘 सूक्ष्मजीवों द्वारा कार्बनिक पदार्थों (जैसे शाक-सब्जियों) के विघटन की प्रक्रिया में ऊष्मा ऊर्जा बाहर निकलती है, इसलिए इसे ऊष्माक्षेपी अभिक्रिया कहते हैं।"
            },
            {
                "q": "A reaction in which both oxidation and reduction occur simultaneously is called:\n(ऐसी अभिक्रिया, जिसमें उपचयन तथा अपचयन दोनों एक साथ एक ही समय पर घटित होती हैं, कहलाती हैं-)",
                "options": [
                    "Combination reaction (संयोजन अभिक्रिया)",
                    "Displacement reaction (विस्थापन अभिक्रिया)",
                    "Redox reaction (रेडॉक्स अभिक्रिया)",
                    "Decomposition reaction (वियोजन अभिक्रिया)"
                ],
                "answer": "Redox reaction (रेडॉक्स अभिक्रिया)",
                "explanation": "🔬 A chemical reaction in which both oxidation (loss of electrons / gain of oxygen) and reduction (gain of electrons / loss of oxygen) occur simultaneously is called a redox (reduction-oxidation) reaction.\n\n📘 वह रासायनिक अभिक्रिया जिसमें ऑक्सीकरण (उपचयन) और अपचयन दोनों एक ही समय पर साथ-साथ होते हैं, रेडॉक्स (Redox) अभिक्रिया कहलाती है।"
            },
            {
                "q": "Burning carbon in air to form carbon dioxide gas is an example of:\n(कार्बन को वायु में जलाने पर कार्बन डाइऑक्साइड गैस का बनना उदाहरण है-)",
                "options": [
                    "Combination reaction (संयोजन अभिक्रिया का)",
                    "Displacement reaction (विस्थापन अभिक्रिया का)",
                    "Double displacement reaction (द्विविस्थापन अभिक्रिया का)",
                    "Decomposition reaction (वियोजन अभिक्रिया का)"
                ],
                "answer": "Combination reaction (संयोजन अभिक्रिया का)",
                "explanation": "🔬 When carbon burns in oxygen, it combines to form a single product, carbon dioxide: C(s) + O₂(g) ──> CO₂(g). Since two reactants form a single product, it is a combination reaction.\n\n📘 जब कार्बन को वायु में जलाया जाता है, तो दो अभिकारक मिलकर एकल उत्पाद (कार्बन डाइऑक्साइड) बनाते हैं: C(s) + O₂(g) ──> CO₂(g)। अतः यह संयोजन अभिक्रिया का उदाहरण है।"
            },
            {
                "q": "The reaction Zn + H₂SO₄ ──> ZnSO₄ + H₂↑ is a:\n(Zn + H₂SO₄ ──> ZnSO₄ + H₂↑ अभिक्रिया है-)",
                "options": [
                    "Combination reaction (संयोजन अभिक्रिया)",
                    "Displacement reaction (विस्थापन अभिक्रिया)",
                    "Decomposition reaction (वियोजन अभिक्रिया)",
                    "Double displacement reaction (द्विविस्थापन अभिक्रिया)"
                ],
                "answer": "Displacement reaction (विस्थापन अभिक्रिया)",
                "explanation": "🔬 Zinc is more reactive than hydrogen, so it displaces hydrogen from sulfuric acid (H₂SO₄) to form zinc sulfate (ZnSO₄) and hydrogen gas (H₂). This is a single displacement reaction.\n\n📘 जिंक, हाइड्रोजन से अधिक अभिक्रियाशील धातु है, इसलिए वह सल्फ्यूरिक अम्ल से हाइड्रोजन को विस्थापित कर उसका स्थान ले लेता है और जिंक सल्फेट बनाता है। यह विस्थापन अभिक्रिया है।"
            },
            {
                "q": "Which of the following is a combustion reaction?\n(निम्नलिखित में कौन-सी एक दहन अभिक्रिया है?)",
                "options": [
                    "NaOH + CH₃COOH ──> CH₃COONa + H₂O",
                    "CH₄ + Cl₂ ──> CH₃Cl + HCl",
                    "CH₄ + 2O₂ ──> CO₂ + 2H₂O + Heat & Light (ऊष्मा एवं प्रकाश)",
                    "Addition of Hydrogen to Alkenes (ऐल्कीन का हाइड्रोजनीकरण)"
                ],
                "answer": "CH₄ + 2O₂ ──> CO₂ + 2H₂O + Heat & Light (ऊष्मा एवं प्रकाश)",
                "explanation": "🔬 A combustion reaction is a reaction where a substance reacts with oxygen to release heat and light. The burning of methane (CH₄) in oxygen is a classic combustion reaction.\n\n📘 दहन अभिक्रिया वह है जिसमें कोई पदार्थ ऑक्सीजन के साथ क्रिया करके ऊष्मा और प्रकाश उत्पन्न करता है। मेथेन (CH₄) का ऑक्सीजन में जलना एक प्रमुख दहन अभिक्रिया है।"
            },
            {
                "q": "The chemical reaction CuSO₄ + Fe ──> FeSO₄ + Cu is a:\n(रासायनिक अभिक्रिया CuSO₄ + Fe ──> FeSO₄ + Cu है-)",
                "options": [
                    "Combination reaction (संयोजन अभिक्रिया)",
                    "Displacement reaction (विस्थापन अभिक्रिया)",
                    "Decomposition reaction (अपघटन अभिक्रिया)",
                    "Double decomposition reaction (उभय अपघटन अभिक्रिया)"
                ],
                "answer": "Displacement reaction (विस्थापन अभिक्रिया)",
                "explanation": "🔬 Iron (Fe) is more reactive than copper (Cu) in the reactivity series. It displaces copper from its copper sulfate (CuSO₄) solution, forming iron sulfate (FeSO₄) and depositing copper.\n\n📘 सक्रियता श्रेणी में लोहा (Fe), कॉपर (Cu) से अधिक क्रियाशील है। इसलिए वह कॉपर सल्फेट के नीले विलयन से कॉपर को विस्थापित कर हल्के हरे रंग का आयरन सल्फेट विलयन बनाता है।"
            },
            {
                "q": "The chemical reaction CaCO₃(s) ──[Heat]──> CaO(s) + CO₂(g) is an example of:\n(रासायनिक अभिक्रिया CaCO₃(s) ──[ऊष्मा]──> CaO(s) + CO₂(g) उदाहरण है-)",
                "options": [
                    "Displacement reaction (विस्थापन अभिक्रिया का)",
                    "Double displacement reaction (द्विविस्थापन अभिक्रिया का)",
                    "Decomposition reaction (अपघटन अभिक्रिया का)",
                    "Combination reaction (संयोजन अभिक्रिया का)"
                ],
                "answer": "Decomposition reaction (अपघटन अभिक्रिया का)",
                "explanation": "🔬 On heating, calcium carbonate (CaCO₃) breaks down into two simpler substances: calcium oxide (CaO) and carbon dioxide (CO₂). This is a thermal decomposition reaction.\n\n📘 गर्म करने पर कैल्शियम कार्बोनेट (CaCO₃) टूटकर दो सरल पदार्थों (कैल्शियम ऑक्साइड और कार्बन डाइऑक्साइड) में अपघटित हो जाता है। अतः यह ऊष्मीय अपघटन अभिक्रिया का उदाहरण है।"
            },
            {
                "q": "Which compound is formed by the combination of CO₂ and H₂O in the presence of sunlight and chlorophyll?\n(सूर्य के प्रकाश एवं पर्णहरित की उपस्थिति में CO₂ तथा H₂O के संयोजन से निम्नलिखित में से कौन-सा यौगिक बनता है?)",
                "options": [
                    "Glucose (ग्लूकोस)",
                    "Chloroform (CHCl₃)",
                    "Carbon tetrachloride (CCl₄)",
                    "Freon (CFCl₃)"
                ],
                "answer": "Glucose (ग्लूकोस)",
                "explanation": "🔬 This is the process of photosynthesis: plants combine carbon dioxide (CO₂) and water (H₂O) in the presence of sunlight and chlorophyll to produce glucose (C₆H₁₂O₆) and release oxygen (O₂).\n\n📘 यह प्रकाश संश्लेषण (Photosynthesis) की प्रक्रिया है: पौधे सूर्य के प्रकाश और क्लोरोफिल की उपस्थिति में कार्बन डाइऑक्साइड (CO₂) और जल (H₂O) का उपयोग करके ग्लूकोस (C₆H₁₂O₆) का निर्माण करते हैं।"
            },
            {
                "q": "Which compound is used to complete the chemical equation? CH₃COONa + ......... ──[CaO]──> CH₄ + Na₂CO₃\n(निम्नलिखित रासायनिक समीकरण को पूर्ण करने में कौन-सा यौगिक प्रयुक्त होता है? CH₃COONa + ......... ──[CaO]──> CH₄ + Na₂CO₃)",
                "options": [
                    "KOH",
                    "NaOH",
                    "NH₄OH",
                    "Ca(OH)₂"
                ],
                "answer": "NaOH",
                "explanation": "🔬 This is the decarboxylation reaction. Heating sodium acetate (CH₃COONa) with sodalime (a mixture of sodium hydroxide, NaOH, and calcium oxide, CaO) yields methane gas (CH₄).\n\n📘 यह डीकार्बोक्सिलीकरण अभिक्रिया है। सोडियम एसीटेट (CH₃COONa) को सोडालाइम (NaOH + CaO) के साथ गर्म करने पर मेथेन गैस (CH₄) प्राप्त होती है। यहाँ लुप्त अभिकारक NaOH है।"
            },
            {
                "q": "Complete the chemical equation: ......... + PCl₅ ──> CH₃COCl + POCl₃ + HCl\n(निम्नलिखित रासायनिक समीकरण को पूरा कीजिए: ......... + PCl₅ ──> CH₃COCl + POCl₃ + HCl)",
                "options": [
                    "CH₃OH",
                    "CH₃COOH",
                    "C₂H₅OH",
                    "CH₃CH₂COOH"
                ],
                "answer": "CH₃COOH",
                "explanation": "🔬 Acetic acid (CH₃COOH) reacts with phosphorus pentachloride (PCl₅) to produce acetyl chloride (CH₃COCl), phosphorus oxychloride (POCl₃), and hydrogen chloride (HCl).\n\n📘 एसिटिक अम्ल (CH₃COOH) फॉस्फोरस पेंटाक्लोराइड (PCl₅) के साथ क्रिया करके एसिटाइल क्लोराइड (CH₃COCl), फॉस्फोरस ऑक्सीक्लोराइड (POCl₃) और हाइड्रोजन क्लोराइड (HCl) बनाता है।"
            },
            {
                "q": "Complete the chemical equation: CH₃COOH + C₂H₅OH ──[Conc. H₂SO₄]──> ......... + H₂O\n(निम्नलिखित रासायनिक समीकरण को पूरा कीजिए: CH₃COOH + C₂H₅OH ──[H₂SO₄ सांद्र]──> ......... + H₂O)",
                "options": [
                    "CH₃OH",
                    "C₂H₅OH",
                    "CH₃COOC₂H₅",
                    "CH₃CH₂COOH"
                ],
                "answer": "CH₃COOC₂H₅",
                "explanation": "🔬 This is the esterification reaction. Acetic acid (CH₃COOH) reacts with ethanol (C₂H₅OH) in the presence of concentrated sulfuric acid as a catalyst to form ethyl acetate (CH₃COOC₂H₅), a sweet-smelling ester, and water.\n\n📘 यह एस्टरीकरण (Esterification) अभिक्रिया है। सांद्र सल्फ्यूरिक अम्ल की उपस्थिति में एसिटिक अम्ल और एथिल अल्कोहल क्रिया करके एथिल एसीटेट (CH₃COOC₂H₅, मीठी गंध वाला एस्टर) और जल बनाते हैं।"
            },
            {
                "q": "Assertion (I): Mixing barium chloride solution with sodium sulfate solution forms sodium chloride and a white precipitate of barium sulfate. Reason (II): This reaction is a double displacement reaction.\n(अभिकथन (I): सोडियम सल्फेट विलयन में बेरियम क्लोराइड विलयन मिलाने पर सोडियम क्लोराइड और बेरियम सल्फेट का सफेद अवक्षेप बनता है। तर्क (II): यह अभिक्रिया द्विविस्थापन अभिक्रिया है।)",
                "options": [
                    "Both (I) and (II) are true and (II) is the correct explanation (दोनों सही हैं तथा तर्क सही स्पष्टीकरण है)",
                    "Both are true but (II) is not the correct explanation (दोनों सही हैं परन्तु तर्क सही स्पष्टीकरण नहीं है)",
                    "Assertion (I) is true but Reason (II) is false (अभिकथन सही है परन्तु तर्क गलत है)",
                    "Assertion (I) is false but Reason (II) is true (अभिकथन गलत है परन्तु तर्क सही है)"
                ],
                "answer": "Both (I) and (II) are true and (II) is the correct explanation (दोनों सही हैं तथा तर्क सही स्पष्टीकरण है)",
                "explanation": "🔬 Barium chloride (BaCl₂) reacts with sodium sulfate (Na₂SO₄) in a double displacement reaction where ions exchange: Ba²⁺ + SO₄²⁻ ──> BaSO₄(s)↓ (white precipitate). The reason correctly explains the assertion.\n\n📘 दोनों कथन सत्य हैं। बेरियम क्लोराइड और सोडियम सल्फेट के बीच आयनों का आदान-प्रदान होता है जिससे बेरियम सल्फेट का सफेद अवक्षेप बनता है: Ba²⁺ + SO₄²⁻ ──> BaSO₄↓। चूंकि यह द्विविस्थापन अभिक्रिया है, कारण सही स्पष्टीकरण है।"
            },
            {
                "q": "Assertion (I): On exposure to sunlight, silver chloride turns grey/brown. Reason (II): Decomposition of silver chloride takes place in the presence of light.\n(अभिकथन (I): सूर्य के प्रकाश में रहने से सिल्वर क्लोराइड का रंग भूरा (धूसर) हो जाता है। तर्क (II): प्रकाश की उपस्थिति में सिल्वर क्लोराइड का अपघटन होता है।)",
                "options": [
                    "Both (I) and (II) are true and (II) is the correct explanation (दोनों कथन सही हैं, और कारण कथन की सही व्याख्या करता है)",
                    "Both are true but (II) is not the correct explanation (दोनों सही हैं, परन्तु कारण कथन की सही व्याख्या नहीं करता)",
                    "Assertion (I) is true but Reason (II) is false (कथन सत्य है, पर कारण असत्य है)",
                    "Assertion (I) is false but Reason (II) is true (कथन असत्य है, पर कारण सत्य है)"
                ],
                "answer": "Both (I) and (II) are true and (II) is the correct explanation (दोनों कथन सही हैं, और कारण कथन की सही व्याख्या करता है)",
                "explanation": "🔬 Silver chloride (AgCl) undergoes photochemical decomposition when exposed to sunlight, breaking down into grey metallic silver (Ag) and chlorine gas (Cl₂): 2AgCl(s) ──[Sunlight]──> 2Ag(s) + Cl₂(g). Thus, both are true and the reason explains the assertion.\n\n📘 सिल्वर क्लोराइड (AgCl) सूर्य के प्रकाश में प्रकाश-अपघटन (Photochemical Decomposition) करता है, जिससे वह धूसर (Grey) रंग के सिल्वर धातु (Ag) और क्लोरीन गैस में टूट जाता है। अतः कारण कथन की सही व्याख्या करता है।"
            },
            {
                "q": "Assertion (I): A solution of slaked lime is used for whitewashing walls. Reason (II): Calcium carbonate is formed on the walls by reacting with carbon dioxide in the air.\n(अभिकथन (I): बुझे हुए चूने के विलयन का उपयोग दीवारों की सफेदी करने के लिए किया जाता है। तर्क (II): सफेदी के बाद वायु की CO₂ से क्रिया होने पर कैल्सियम कार्बोनेट का निर्माण होता है।)",
                "options": [
                    "Both (I) and (II) are true and (II) is the correct explanation (दोनों सत्य हैं, और कारण कथन की सही व्याख्या करता है)",
                    "Both are true but (II) is not the correct explanation (दोनों सत्य हैं, परन्तु कारण कथन की सही व्याख्या नहीं करता)",
                    "Assertion (I) is true but Reason (II) is false (कथन सत्य है, पर कारण असत्य है)",
                    "Assertion (I) is false but Reason (II) is true (कथन असत्य है, पर कारण सत्य है)"
                ],
                "answer": "Both (I) and (II) are true and (II) is the correct explanation (दोनों सत्य हैं, और कारण कथन की सही व्याख्या करता है)",
                "explanation": "🔬 Slaked lime (Ca(OH)₂) applied to walls reacts slowly with carbon dioxide (CO₂) in the air to form a thin, shiny layer of calcium carbonate (CaCO₃) over two to three days. This gives a shiny finish to the walls.\n\n📘 बुझा हुआ चूना (Ca(OH)₂) हवा में उपस्थित कार्बन डाइऑक्साइड (CO₂) के साथ धीमी गति से क्रिया करके कैल्शियम कार्बोनेट (CaCO₃) की एक पतली, चमकदार परत बनाता है, जिससे दीवारों पर चमक आती है। अतः कारण सही व्याख्या करता है।"
            },
            {
                "q": "Choose the correct match between Column (A) and Column (B):\n(कॉलम (A) और कॉलम (B) का सही सुमेलन चुनिए:) (1) Ammonium chloride + Lime ── (iii) Calcium chloride (2) Manganese + Oxygen ── (i) Manganese oxide (3) Magnesium + Sulfuric acid ── (ii) Hydrogen gas (4) Hydrogen + Nitrogen ── (iv) Ammonia",
                "options": [
                    "(1) -> (iv), (2) -> (i), (3) -> (ii), (4) -> (iii)",
                    "(1) -> (iii), (2) -> (i), (3) -> (ii), (4) -> (iv)",
                    "(1) -> (ii), (2) -> (iii), (3) -> (i), (4) -> (iv)",
                    "(1) -> (iii), (2) -> (iv), (3) -> (ii), (4) -> (i)"
                ],
                "answer": "(1) -> (iii), (2) -> (i), (3) -> (ii), (4) -> (iv)",
                "explanation": "🔬 Let's trace each reaction:\n1) NH₄Cl + Ca(OH)₂ ──> CaCl₂ + 2NH₃ + 2H₂O (forms Calcium chloride)\n2) Mn + O₂ ──> MnO₂ (forms Manganese oxide)\n3) Mg + H₂SO₄ ──> MgSO₄ + H₂↑ (releases Hydrogen gas)\n4) N₂ + 3H₂ ──> 2NH₃ (forms Ammonia)\n\n📘 अभिक्रियाएँ इस प्रकार हैं:\n1) नौसादर (NH₄Cl) और चूना (Ca(OH)₂) क्रिया कर कैल्शियम क्लोराइड (CaCl₂) बनाते हैं।\n2) मैंगनीज और ऑक्सीजन मिलकर मैंगनीज ऑक्साइड (MnO₂) बनाते हैं।\n3) मैग्नीशियम तनु सल्फ्यूरिक अम्ल से क्रिया कर हाइड्रोजन गैस विस्थापित करता है।\n4) हाइड्रोजन और नाइट्रोजन संयोग कर अमोनिया बनाते हैं।"
            },
            {
                "q": "Complete the chemical equation: ......... + CO₂ ──> CaCO₃ + H₂O\n(निम्नलिखित रासायनिक समीकरण को पूरा कीजिए: ......... + CO₂ ──> CaCO₃ + H₂O)",
                "options": [
                    "CaO",
                    "Ca(OH)₂",
                    "CaH₂",
                    "CH₃COOH"
                ],
                "answer": "Ca(OH)₂",
                "explanation": "🔬 Calcium hydroxide (slaked lime, Ca(OH)₂) reacts with carbon dioxide (CO₂) to form calcium carbonate (CaCO₃) precipitate and water. This is used to test for CO₂ gas (which turns lime water milky).\n\n📘 कैल्शियम हाइड्रॉक्साइड (बुझा हुआ चूना — Ca(OH)₂) कार्बन डाइऑक्साइड (CO₂) के साथ क्रिया करके कैल्शियम कार्बोनेट (CaCO₃, चूना पत्थर) और जल बनाता है। इस अभिक्रिया का उपयोग CO₂ गैस के परीक्षण (चूने के पानी का दूधिया होना) में किया जाता है।"
            },
            {
                "q": "The chemical reaction: Fe(s) + CuSO₄(aq) ──> FeSO₄(aq) + Cu(s) is a:\n(रासायनिक अभिक्रिया Fe(s) + CuSO₄(aq) ──> FeSO₄(aq) + Cu(s) है:)",
                "options": [
                    "Displacement reaction (विस्थापन अभिक्रिया)",
                    "Double displacement reaction (द्विविस्थापन अभिक्रिया)",
                    "Combination reaction (संयोजन अभिक्रिया)",
                    "Decomposition reaction (अपघटन अभिक्रिया)"
                ],
                "answer": "Displacement reaction (विस्थापन अभिक्रिया)",
                "explanation": "🔬 This is a single displacement reaction. Iron (Fe) is more reactive than copper (Cu) and displaces it from copper sulfate solution, causing the blue color of the solution to fade to light green.\n\n📘 यह विस्थापन अभिक्रिया (Single Displacement) है। लोहा (Fe), कॉपर (Cu) से अधिक क्रियाशील धातु होने के कारण कॉपर सल्फेट विलयन से कॉपर को विस्थापित कर देता है, जिससे विलयन का नीला रंग हल्का हरा हो जाता है।"
            },
            {
                "q": "An example of a combination reaction is:\n(संयोजन अभिक्रिया का उदाहरण है:)",
                "options": [
                    "Burning of carbon in air (कार्बन का वायु में जलना)",
                    "Reaction of zinc with sulfuric acid (जिंक की सल्फ्यूरिक अम्ल से क्रिया)",
                    "Thermal decomposition of CaCO₃ (CaCO₃ का ऊष्मीय अपघटन)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Burning of carbon in air (कार्बन का वायु में जलना)",
                "explanation": "🔬 In combination reactions, two or more reactants combine to form a single product. Burning of carbon in air: C + O₂ ──> CO₂, which forms only one product. Zinc with acid is a displacement reaction, and decomposition of CaCO₃ is a decomposition reaction.\n\n📘 संयोजन अभिक्रिया में दो या दो से अधिक अभिकारक मिलकर केवल एक उत्पाद बनाते हैं। कार्बन का वायु में जलना (C + O₂ ──> CO₂) संयोजन अभिक्रिया है। जिंक की अम्ल से क्रिया विस्थापन है और CaCO₃ का टूटना अपघटन है।"
            },
            {
                "q": "The reaction of zinc with sulfuric acid to form zinc sulfate and hydrogen gas is a:\n(जिंक तथा सल्फ्यूरिक अम्ल की क्रिया से जिंक सल्फेट तथा हाइड्रोजन गैस बनती है। यह अभिक्रिया है:)",
                "options": [
                    "Combination reaction (संयोजन अभिक्रिया)",
                    "Decomposition reaction (वियोजन अभिक्रिया)",
                    "Displacement reaction (विस्थापन अभिक्रिया)",
                    "Double displacement reaction (द्विविस्थापन अभिक्रिया)"
                ],
                "answer": "Displacement reaction (विस्थापन अभिक्रिया)",
                "explanation": "🔬 Zinc (Zn) is placed above hydrogen in the metal activity series. It displaces hydrogen from sulfuric acid (H₂SO₄) to form zinc sulfate (ZnSO₄) and hydrogen gas (H₂): Zn + H₂SO₄ ──> ZnSO₄ + H₂↑.\n\n📘 धातु सक्रियता श्रेणी में जिंक (Zn) Hydrogen से ऊपर स्थित है। यह सल्फ्यूरिक अम्ल से हाइड्रोजन को विस्थापित कर उसका स्थान ग्रहण करता है, इसलिए यह विस्थापन अभिक्रिया है।"
            },
            {
                "q": "In the reaction: Zn(s) + CuO(s) ──> Cu(s) + ZnO(s):\n(अभिक्रिया Zn(s) + CuO(s) ──> Cu(s) + ZnO(s) में:)",
                "options": [
                    "Zinc is reduced (जिंक अपचयित होता है)",
                    "CuO is reduced (CuO अपचयित होता है)",
                    "Cu is oxidized (Cu ऑक्सीकृत होता है)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "CuO is reduced (CuO अपचयित होता है)",
                "explanation": "🔬 Reduction is the loss of oxygen. In this reaction, copper oxide (CuO) loses oxygen to become copper (Cu), so CuO is reduced. Zinc (Zn) gains oxygen to become ZnO, so zinc is oxidized.\n\n📘 अपचयन (Reduction) का अर्थ ऑक्सीजन का ह्रास है। इस अभिक्रिया में, कॉपर ऑक्साइड (CuO) ऑक्सीजन खोकर कॉपर (Cu) में बदल जाता है, इसलिए CuO का अपचयन (अपचयित होना) हुआ है। जिंक (Zn) का उपचयन हुआ है।"
            },
            {
                "q": "The reaction: HCl(aq) + NaOH(aq) ──> NaCl(aq) + H₂O(l) is a:\n(अभिक्रिया HCl(जलीय) + NaOH(जलीय) ──> NaCl(जलीय) + H₂O (द्रव) है:)",
                "options": [
                    "Decomposition reaction (अपघटन अभिक्रिया)",
                    "Redox reaction (उपचयन-अपचयन अभिक्रिया)",
                    "Addition reaction (योगात्मक अभिक्रिया)",
                    "Neutralisation reaction (उदासीनीकरण अभिक्रिया)"
                ],
                "answer": "Neutralisation reaction (उदासीनीकरण अभिक्रिया)",
                "explanation": "🔬 Hydrochloric acid (HCl) is a strong acid and sodium hydroxide (NaOH) is a strong base. They react to form sodium chloride salt (NaCl) and water (H₂O). This is a classic neutralization reaction.\n\n📘 हाइड्रोक्लोरिक अम्ल (HCl) एक प्रबल अम्ल है और सोडियम हाइड्रॉक्साइड (NaOH) एक प्रबल क्षार है। दोनों क्रिया करके नमक (NaCl) और जल बनाते हैं, जिसे उदासीनीकरण अभिक्रिया कहते।"
            }
        ]
    },
    "c10_acids_bases": {
        "title": "Acids, Bases & Salts",
        "category": "Chemistry",
        "emoji": "🧫",
        "xpPerQuestion": 15,
        "questions": [
            {
                "q": "Which gas is released on heating baking powder?\n(बेकिंग पाउडर को गर्म करने पर कौन-सी गैस निकलती है?)",
                "options": [
                    "CO",
                    "Na₂CO₃",
                    "CO₂",
                    "O₂"
                ],
                "answer": "CO₂",
                "explanation": "🔬 Baking powder contains sodium bicarbonate (NaHCO₃). When heated, it decomposes to release carbon dioxide (CO₂) gas: 2NaHCO₃ ──[Heat]──> Na₂CO₃ + H₂O + CO₂↑. This gas causes dough to rise and become fluffy.\n\n📘 बेकिंग पाउडर में सोडियम बाइकार्बोनेट (NaHCO₃) होता है। गर्म करने पर यह अपघटित होकर कार्बन डाइऑक्साइड (CO₂) गैस मुक्त करता है: 2NaHCO₃ ──[ऊष्मा]──> Na₂CO₃ + H₂O + CO₂↑। यह गैस केक या ब्रेड को फुलाने में मदद करती है।"
            },
            {
                "q": "Neon is a/an:\n(नियॉन है-)",
                "options": [
                    "Alkali metal (क्षार धातु)",
                    "Inert / Noble gas (अक्रिय गैस)",
                    "Metalloid (उपधातु)",
                    "Transition element (संक्रमण तत्त्व)"
                ],
                "answer": "Inert / Noble gas (अक्रिय गैस)",
                "explanation": "🔬 Neon (Ne) has atomic number 10. Its electronic configuration is 2, 8, which has a complete outermost octet, making it chemically inert and a noble gas.\n\n📘 नियॉन (Ne) का परमाणु क्रमांक 10 है। इसका इलेक्ट्रॉनिक विन्यास 2, 8 है, जिसके बाह्यतम कोश में 8 इलेक्ट्रॉन (पूर्ण अष्टक) होते हैं, इसलिए यह एक अक्रिय/उत्कृष्ट गैस है।"
            },
            {
                "q": "Which compound is useful to stop bleeding from a cut?\n(बहते हुए रक्त को रोकने में उपयोगी यौगिक है-)",
                "options": [
                    "Baking soda (खाने का सोडा)",
                    "Ammonium chloride (नौसादर)",
                    "Washing soda (धावन सोडा)",
                    "Alum (फिटकरी)"
                ],
                "answer": "Alum (फिटकरी)",
                "explanation": "🔬 Alum (potash alum) has aluminium ions (Al³⁺) which carry a high positive charge. They neutralize the negative charges on colloidal blood proteins, causing them to coagulate and block the cut.\n\n📘 फिटकरी (पोटाश ऐलम) में उपस्थित एल्युमिनियम आयन (Al³⁺) रक्त के कोलाइडल प्रोटीन के ऋण आवेश को उदासीन कर देते हैं, जिससे रक्त का थक्का (Coagulation) बन जाता है और रक्त बहना बंद हो जाता है।"
            },
            {
                "q": "Passing excess carbon dioxide gas through an aqueous solution of sodium carbonate yields:\n(सोडियम कार्बोनेट के जलीय विलयन में कार्बन डाइऑक्साइड गैस अधिकता से प्रवाहित करने पर प्राप्त होने वाला पदार्थ है-)",
                "options": [
                    "NaOH",
                    "Na₂CO₃·10H₂O",
                    "NaHCO₃",
                    "Na₂CO₃·H₂O"
                ],
                "answer": "NaHCO₃",
                "explanation": "🔬 Passing excess CO₂ through sodium carbonate (Na₂CO₃) solution forms sodium hydrogen carbonate (NaHCO₃), which is less soluble and precipitates: Na₂CO₃ + H₂O + CO₂ ──> 2NaHCO₃.\n\n📘 सोडियम कार्बोनेट (Na₂CO₃) के जलीय विलयन में अधिकता में CO₂ प्रवाहित करने पर सोडियम हाइड्रोजन कार्बोनेट (बेकिंग सोडा — NaHCO₃) प्राप्त होता है: Na₂CO₃ + H₂O + CO₂ ──> 2NaHCO₃।"
            },
            {
                "q": "The chemical formula of Nausadar is:\n(नौसादर का रासायनिक सूत्र है-)",
                "options": [
                    "NaCl",
                    "Na₂CO₃",
                    "Na₂SO₄",
                    "NH₄Cl"
                ],
                "answer": "NH₄Cl",
                "explanation": "🔬 Nausadar is the common name for ammonium chloride (NH₄Cl), an inorganic salt formed by the reaction of hydrochloric acid and ammonia.\n\n📘 नौसादर अमोनियम क्लोराइड (NH₄Cl) का साधारण नाम है। यह एक अकार्बनिक लवण है जो अमोनिया और हाइड्रोक्लोरिक अम्ल के संयोग से बनता है।"
            },
            {
                "q": "Which gas is released when dilute sulfuric acid reacts with bleaching powder?\n(विरंजक चूर्ण पर तनु सल्फ्यूरिक अम्ल की अभिक्रिया से गैस निकलती है-)",
                "options": [
                    "H₂",
                    "O₂",
                    "Cl₂",
                    "CO₂"
                ],
                "answer": "Cl₂",
                "explanation": "🔬 Bleaching powder (CaOCl₂) reacts with dilute acids like H₂SO₄ to release chlorine (Cl₂) gas: CaOCl₂ + H₂SO₄ ──> CaSO₄ + H₂O + Cl₂↑.\n\n📘 विरंजक चूर्ण (CaOCl₂) तनु सल्फ्यूरिक अम्ल के साथ अभिक्रिया करके क्लोरीन (Cl₂) गैस मुक्त करता है: CaOCl₂ + H₂SO₄ ──> CaSO₄ + H₂O + Cl₂↑।"
            },
            {
                "q": "The chemical formula of baking soda is:\n(खाने के सोडा का रासायनिक सूत्र है-)",
                "options": [
                    "Na₂CO₃",
                    "NaHCO₃",
                    "NaCl",
                    "NH₄Cl"
                ],
                "answer": "NaHCO₃",
                "explanation": "🔬 Baking soda is sodium hydrogen carbonate (or sodium bicarbonate) with the formula NaHCO₃.\n\n📘 खाने के सोडा (Baking Soda) का रासायनिक नाम सोडियम हाइड्रोजन कार्बोनेट है और इसका सूत्र NaHCO₃ है।"
            },
            {
                "q": "An aqueous solution of sodium carbonate is:\n(सोडियम कार्बोनेट का जलीय विलयन होता है-)",
                "options": [
                    "Weakly acidic (दुर्बल अम्लीय)",
                    "Strongly acidic (प्रबल अम्लीय)",
                    "Alkaline/Basic (क्षारतीय / क्षारीय)",
                    "Neutral (उदासीन)"
                ],
                "answer": "Alkaline/Basic (क्षारतीय / क्षारीय)",
                "explanation": "🔬 Sodium carbonate (Na₂CO₃) undergoes hydrolysis in water to produce sodium hydroxide (strong base) and carbonic acid (weak acid), making the solution alkaline (pH > 7).\n\n📘 सोडियम कार्बोनेट (Na₂CO₃) जल में अपघटित होकर सोडियम हाइड्रॉक्साइड (प्रबल क्षार) और कार्बोनिक अम्ल (दुर्बल अम्ल) बनाता है। अतः इसका जलीय विलयन क्षारीय होता है।"
            },
            {
                "q": "The chemical formula of washing soda is:\n(धावन सोडा का रासायनिक सूत्र है-)",
                "options": [
                    "Na₂CO₃·10H₂O",
                    "NaHCO₃",
                    "NaCl",
                    "NH₄Cl"
                ],
                "answer": "Na₂CO₃·10H₂O",
                "explanation": "🔬 Washing soda is sodium carbonate decahydrate, which contains 10 water molecules of crystallization: Na₂CO₃·10H₂O.\n\n📘 धावन सोडा का रासायनिक नाम सोडियम कार्बोनेट डेकाहाइड्रेट है, जिसमें क्रिस्टलन जल के 10 अणु उपस्थित होते हैं: Na₂CO₃·10H₂O।"
            },
            {
                "q": "The formula of microcosmic salt is:\n(माइक्रोकॉस्मिक लवण का सूत्र है-)",
                "options": [
                    "Na₃PO₄",
                    "Na(NH₄)HPO₄·4H₂O",
                    "Na₂HPO₄",
                    "Na(NH₄)₂PO₄·4H₂O"
                ],
                "answer": "Na(NH₄)HPO₄·4H₂O",
                "explanation": "🔬 Microcosmic salt is sodium ammonium hydrogen phosphate tetrahydrate, with the formula Na(NH₄)HPO₄·4H₂O. It is used in qualitative analysis for bead tests.\n\n📘 माइक्रोकॉस्मिक लवण सोडियम अमोनियम हाइड्रोजन फॉस्फेट टेट्राहाइड्रेट है, जिसका रासायनिक सूत्र Na(NH₄)HPO₄·4H₂O है। इसका उपयोग गुणात्मक विश्लेषण में बीड परीक्षणों के लिए किया जाता है।"
            },
            {
                "q": "Acetic acid is a weak acid because:\n(ऐसीटिक अम्ल एक दुर्बल अम्ल है क्योंकि-)",
                "options": [
                    "It contains more water (इसमें पानी की मात्रा अधिक होती है)",
                    "Its degree of ionization is low (इसके आयनन की मात्रा कम होती है)",
                    "It is an organic acid (यह एक कार्बनिक अम्ल है)",
                    "It is an inorganic acid (यह एक अकार्बनिक अम्ल है)"
                ],
                "answer": "Its degree of ionization is low (इसके आयनन की मात्रा कम होती है)",
                "explanation": "🔬 Acetic acid (CH₃COOH) only partially dissociates in aqueous solution into acetate and hydronium ions. Its low degree of ionization makes it a weak acid.\n\n📘 ऐसीटिक अम्ल (CH₃COOH) जल में पूर्णतः आयनित नहीं होता, बल्कि आंशिक रूप से आयनित होता है। आयनन की कम मात्रा के कारण यह एक दुर्बल अम्ल है।"
            },
            {
                "q": "The strength of a hydrochloric acid solution is 10⁻² N. The pH of this solution is:\n(एक हाइड्रोक्लोरिक अम्ल की शक्ति 10⁻² N है। इस विलयन का pH मान है-)",
                "options": [
                    "1",
                    "2",
                    "3",
                    "10"
                ],
                "answer": "2",
                "explanation": "🔬 Hydrochloric acid (HCl) is a strong monobasic acid, so [H⁺] = 10⁻² N = 10⁻² M. pH = −log[H⁺] = −log(10⁻²) = 2.\n\n📘 HCl एक प्रबल एक-अम्लीय अम्ल है, इसलिए [H⁺] = 10⁻² N = 10⁻² M। pH = −log[H⁺] = −log(10⁻²) = 2।"
            },
            {
                "q": "The concentration of hydrogen ions in a solution is 1 × 10⁻⁷ mol/L. The pH of the solution is:\n(एक विलयन में hydrogen आयन का सान्द्रण 1 × 10⁻⁷ mol/L है। विलयन का pH मान होगा-)",
                "options": [
                    "0",
                    "7",
                    "8",
                    "62"
                ],
                "answer": "7",
                "explanation": "🔬 pH is defined as −log[H⁺]. Given [H⁺] = 10⁻⁷ mol/L, pH = −log(10⁻⁷) = 7, indicating a neutral solution.\n\n📘 pH = −log[H⁺] होता है। यहाँ [H⁺] = 10⁻⁷ mol/L दिया है, इसलिए pH = −log(10⁻⁷) = 7 (उदासीन विलयन)।"
            },
            {
                "q": "The number of acidic hydrogen atoms in a sulfuric acid molecule is:\n(सल्फ्यूरिक अम्ल में अम्लीय हाइड्रोजन परमाणुओं की संख्या है-)",
                "options": [
                    "2",
                    "1",
                    "3",
                    "Zero (शून्य)"
                ],
                "answer": "2",
                "explanation": "🔬 Sulfuric acid (H₂SO₄) is a dibasic acid because it contains two hydrogen atoms bonded to oxygen that can dissociate as H⁺ ions in water.\n\n📘 सल्फ्यूरिक अम्ल (H₂SO₄) एक द्वि-क्षारकीय अम्ल है क्योंकि इसके एक अणु में दो प्रतिस्थापनीय (अम्लीय) हाइड्रोजन परमाणु होते हैं जो जल में H⁺ आयन के रूप में मुक्त हो सकते हैं।"
            },
            {
                "q": "The pH of an acidic solution is:\n(अम्लीय विलयन का pH मान है-)",
                "options": [
                    "7",
                    "Less than 7 (7 से कम)",
                    "More than 7 (7 से अधिक)",
                    "Zero (शून्य)"
                ],
                "answer": "Less than 7 (7 से कम)",
                "explanation": "🔬 Acidic solutions have an excess of hydrogen ions, giving them a pH value of less than 7 at 25°C.\n\n📘 अम्लीय विलयन में हाइड्रोजन आयनों की अधिकता होती है, जिससे इनका pH मान 25°C पर 7 से कम होता है।"
            },
            {
                "q": "Which of the following is a complex salt?\n(संकर लवण है-)",
                "options": [
                    "Na₂SO₄·Fe₂(SO₄)₃·24H₂O",
                    "Na₂HPO₄",
                    "Na₃[Fe(CN)₆]",
                    "NaNH₄HPO₄"
                ],
                "answer": "Na₃[Fe(CN)₆]",
                "explanation": "🔬 Na₃[Fe(CN)₆] is a complex salt because it contains the complex coordination ion [Fe(CN)₆]³⁻, which does not dissociate into simple Fe³⁺ and CN⁻ ions in water.\n\n📘 Na₃[Fe(CN)₆] एक संकर (जटिल) लवण है क्योंकि इसमें जटिल उपसहसंयोजक आयन [Fe(CN)₆]³⁻ होता है, जो जल में विघटित होकर सरल Fe³⁺ और CN⁻ आयन नहीं देता।"
            },
            {
                "q": "The chemical formula of Potash Alum is:\n(पोटाश ऐलम का रासायनिक सूत्र है-)",
                "options": [
                    "Al₂(SO₄)₃",
                    "K₂SO₄",
                    "K₂SO₄·Al₂(SO₄)₃·24H₂O",
                    "K₂SO₄·Al₂(SO₄)₃·6H₂O"
                ],
                "answer": "K₂SO₄·Al₂(SO₄)₃·24H₂O",
                "explanation": "🔬 Potash alum is a double salt of potassium sulfate and aluminium sulfate with 24 molecules of crystallization water: K₂SO₄·Al₂(SO₄)₃·24H₂O.\n\n📘 पोटाश ऐलम (फिटकरी) पोटैशियम सल्फेट और एल्युमिनियम सल्फेट का एक द्विक लवण (Double Salt) है जिसमें क्रिस्टलन जल के 24 अणु होते हैं: K₂SO₄·Al₂(SO₄)₃·24H₂O।"
            },
            {
                "q": "Which substance is useful to make drinking water free from bacteria/germs?\n(जल को जीवाणु-रहित बनाने के लिए उपयोगी पदार्थ है-)",
                "options": [
                    "Washing soda (धावन सोडा)",
                    "Baking soda (बेकिंग सोडा)",
                    "Alum (फिटकरी)",
                    "Bleaching powder (विरंजक चूर्ण)"
                ],
                "answer": "Bleaching powder (विरंजक चूर्ण)",
                "explanation": "🔬 Bleaching powder (CaOCl₂) reacts with water to release chlorine gas (Cl₂), which acts as a powerful disinfectant to kill bacteria and pathogens in water.\n\n📘 विरंजक चूर्ण (CaOCl₂) जल के साथ क्रिया करके क्लोरीन गैस (Cl₂) मुक्त करता है, जो जीवाणुओं और रोगजनकों को नष्ट करने वाले कीटाणुनाशक के रूप में कार्य करती है।"
            },
            {
                "q": "Which of the following compounds is used in soda-acid fire extinguishers?\n(आग बुझाने वाले यन्त्रों में प्रयुक्त होने वाला पदार्थ है-)",
                "options": [
                    "Na₂CO₃",
                    "HCl",
                    "NaCl",
                    "CaCl₂"
                ],
                "answer": "Na₂CO₃",
                "explanation": "🔬 Soda-acid fire extinguishers use sodium carbonate (Na₂CO₃) or sodium bicarbonate (NaHCO₃) which reacts with sulfuric acid to release carbon dioxide gas, extinguishing the fire.\n\n📘 अग्निशामक यंत्रों में सोडियम कार्बोनेट (Na₂CO₃) या सोडियम बाइकार्बोनेट का प्रयोग होता है जो अम्ल से क्रिया करके आग बुझाने वाली कार्बन डाइऑक्साइड (CO₂) गैस उत्पन्न करता है।"
            },
            {
                "q": "The concentration of hydroxide ions in a solution is 1 × 10⁻¹² mol/L. The pH of the solution is:\n(एक विलयन में हाइड्रॉक्साइड आयन का सान्द्रण 1 × 10⁻¹² mol/L है। इस विलयन का pH मान होगा-)",
                "options": [
                    "2",
                    "-4",
                    "-2",
                    "4"
                ],
                "answer": "2",
                "explanation": "🔬 Given [OH⁻] = 10⁻¹² M. Since [H⁺][OH⁻] = 10⁻¹⁴, [H⁺] = 10⁻¹⁴ / 10⁻¹² = 10⁻² M. pH = −log[H⁺] = −log(10⁻²) = 2.\n\n📘 [OH⁻] = 10⁻¹² M है। जल का आयनिक गुणनफल [H⁺][OH⁻] = 10⁻¹⁴ होता है, इसलिए [H⁺] = 10⁻² M। pH = −log(10⁻²) = 2 (अम्लीय विलयन)।"
            },
            {
                "q": "Which of the following substances exhibits the property of sublimation?\n(निम्न में कौन-सा पदार्थ ऊर्ध्वपातन का गुण प्रदर्शित करता है?)",
                "options": [
                    "NaCl",
                    "Na₂CO₃",
                    "NH₄Cl",
                    "CaOCl₂"
                ],
                "answer": "NH₄Cl",
                "explanation": "🔬 Ammonium chloride (NH₄Cl) is a sublimable solid that directly converts into vapors upon heating without passing through the liquid state.\n\n📘 अमोनियम क्लोराइड (NH₄Cl / नौसादर) एक ऊर्ध्वपातज ठोस है जो गर्म करने पर बिना द्रव अवस्था में बदले सीधे गैस में परिवर्तित हो जाता है।"
            },
            {
                "q": "The pH of an aqueous solution of H₂SO₄ is:\n(H₂SO₄ के जलीय विलयन का pH मान है-)",
                "options": [
                    "0",
                    "Less than 7 (7 से कम)",
                    "7",
                    "More than 7 (7 से अधिक)"
                ],
                "answer": "Less than 7 (7 से कम)",
                "explanation": "🔬 Sulfuric acid (H₂SO₄) is a strong mineral acid that releases H⁺ ions in water, making the solution acidic with a pH value of less than 7.\n\n📘 सल्फ्यूरिक अम्ल (H₂SO₄) एक प्रबल खनिज अम्ल है जो जल में आयनित होकर अधिक मात्रा में H⁺ आयन देता है। इसलिए इसके जलीय विलयन का pH मान 7 से कम होता है।"
            },
            {
                "q": "The chemical formula of calcium phosphate is:\n(कैल्सियम फॉस्फेट का सूत्र है-)",
                "options": [
                    "Ca(PO₃)₂",
                    "CaPO₄",
                    "Ca₃(PO₄)₂",
                    "CaP₂O₄"
                ],
                "answer": "Ca₃(PO₄)₂",
                "explanation": "🔬 Calcium is a divalent metal ion (Ca²⁺) and phosphate is a trivalent anion (PO₄³⁻). By cross-matching their valencies, we get the neutral formula Ca₃(PO₄)₂.\n\n📘 कैल्शियम की संयोजकता 2 (Ca²⁺) और फॉस्फेट आयन का आवेश -3 (PO₄³⁻) होता है। संयोजकता विनिमय (Criss-Cross) द्वारा सूत्र Ca₃(PO₄)₂ प्राप्त होता है।"
            },
            {
                "q": "The pH of an alkaline (basic) solution is:\n(क्षारीय विलयन का pH है-)",
                "options": [
                    "Zero (शून्य)",
                    "7",
                    "Less than 7 (7 से कम)",
                    "More than 7 (7 से अधिक)"
                ],
                "answer": "More than 7 (7 से अधिक)",
                "explanation": "🔬 Basic or alkaline solutions have a higher concentration of OH⁻ ions than H⁺ ions, resulting in a pH value greater than 7 at 25°C.\n\n📘 क्षारीय विलयन में हाइड्रॉक्साइड आयनों (OH⁻) की सांद्रता अधिक होती है, जिससे इसका pH मान 25°C पर 7 से अधिक होता है।"
            },
            {
                "q": "The chemical formula of bleaching powder is:\n(विरंजक चूर्ण का सूत्र है-)",
                "options": [
                    "Na₂CO₃·10H₂O",
                    "CaOCl₂",
                    "NaOH",
                    "K₂CO₃"
                ],
                "answer": "CaOCl₂",
                "explanation": "🔬 Bleaching powder is chemically calcium oxychloride with the formula CaOCl₂.\n\n📘 विरंजक चूर्ण का रासायनिक नाम कैल्शियम ऑक्सीक्लोराइड है और इसका सूत्र CaOCl₂ है।"
            },
            {
                "q": "Which gas is released when dilute sulfuric acid reacts with zinc dust?\n(जिंक चूर्ण पर तनु सल्फ्यूरिक अम्ल की अभिक्रिया से गैस निकलती है-)",
                "options": [
                    "H₂",
                    "O₂",
                    "Cl₂",
                    "CO₂"
                ],
                "answer": "H₂",
                "explanation": "🔬 Zinc (Zn) is highly reactive and sits above hydrogen in the metal activity series. It displaces hydrogen from sulfuric acid to release hydrogen gas: Zn + H₂SO₄ ──> ZnSO₄ + H₂↑.\n\n📘 जिंक (Zn) एक सक्रिय धातु है जो तनु सल्फ्यूरिक अम्ल से क्रिया करके हाइड्रोजन गैस मुक्त करती है: Zn + H₂SO₄ ──> ZnSO₄ + H₂↑।"
            },
            {
                "q": "The common name of Na₂CO₃ is:\n(Na₂CO₃ का प्रचलित नाम है-)",
                "options": [
                    "Bleaching powder (ब्लीचिंग पाउडर)",
                    "Baking powder (बेकिंग पाउडर)",
                    "Washing soda (धावन सोडा)",
                    "Plaster of Paris (प्लास्टर ऑफ पेरिस)"
                ],
                "answer": "Washing soda (धावन सोडा)",
                "explanation": "🔬 Sodium carbonate (Na₂CO₃) in its decahydrate form is commonly known as washing soda, used in laundry and water softening.\n\n📘 सोडियम कार्बोनेट (Na₂CO₃) को सामान्यतः धावन सोडा (Washing Soda) कहा जाता है। इसका उपयोग कपड़े धोने और जल की कठोरता दूर करने में किया जाता है।"
            },
            {
                "q": "Which of the following is an alkali metal?\n(निम्नलिखित में क्षार धातु है-)",
                "options": [
                    "Na",
                    "Fe",
                    "Mg",
                    "Au"
                ],
                "answer": "Na",
                "explanation": "🔬 Group 1 elements (Lithium, Sodium, Potassium, etc.) are called alkali metals because they react with water to form strongly alkaline hydroxides.\n\n📘 आवर्त सारणी के वर्ग 1 के तत्वों (जैसे सोडियम, Na) को क्षार धातु (Alkali Metals) कहा जाता है क्योंकि ये जल के साथ क्रिया करके प्रबल क्षारीय हाइड्रॉक्साइड बनाते हैं।"
            },
            {
                "q": "Which set of elements represents alkali metals?\n(क्षार धातुएँ हैं-)",
                "options": [
                    "Ba, Mg, Ca",
                    "Li, Na, K",
                    "B, Al, Ga",
                    "Cu, Ag, Au"
                ],
                "answer": "Li, Na, K",
                "explanation": "🔬 Lithium (Li), Sodium (Na), and Potassium (K) all belong to Group 1 of the periodic table, classifying them as alkali metals.\n\n📘 लिथियम (Li), सोडियम (Na) और पोटैशियम (K) सभी आवर्त सारणी के प्रथम समूह (Group 1) के सदस्य हैं, जिन्हें क्षार धातुएँ कहा जाता है।"
            },
            {
                "q": "The pH of pure water at 25°C is:\n(25°C ताप पर शुद्ध जल का pH मान है-)",
                "options": [
                    "Between 0 and 7 (7 से कम तथा 0 से अधिक)",
                    "Between 7 and 14 (7 से अधिक तथा 14 से कम)",
                    "0",
                    "7"
                ],
                "answer": "7",
                "explanation": "🔬 Pure water is completely neutral at 25°C with equal concentrations of hydronium and hydroxide ions ([H⁺] = [OH⁻] = 10⁻⁷ M), corresponding to pH 7.\n\n📘 25°C पर शुद्ध जल पूर्णतः उदासीन होता है क्योंकि इसमें हाइड्रोजन आयन और हाइड्रॉक्साइड आयन दोनों की सांद्रता समान (10⁻⁷ M) होती है, इसलिए इसका pH मान 7 होता है।"
            },
            {
                "q": "Which of the following aqueous solutions turns red on adding methyl orange?\n(निम्नलिखित में से मेथिल ऑरेंज मिलाने पर कौन-सा लाल हो जाता है?)",
                "options": [
                    "NaCl (aq)",
                    "H₂SO₄ (aq)",
                    "KOH (aq)",
                    "Glucose (aq)"
                ],
                "answer": "H₂SO₄ (aq)",
                "explanation": "🔬 Methyl orange is a pH indicator that changes color to red in acidic environments (pH < 3.1). Since H₂SO₄ is a strong acid, its solution turns methyl orange red.\n\n📘 मेथिल ऑरेंज एक सूचक है जो अम्लीय विलयन में लाल रंग देता है। चूंकि H₂SO₄ एक प्रबल अम्ल है, इसलिए इसके विलयन में मेथिल ऑरेंज डालने पर रंग लाल हो जाता है।"
            },
            {
                "q": "Which of the following is an acidic salt?\n(निम्न में से अम्लीय लवण है-)",
                "options": [
                    "NaCl",
                    "NaHSO₄",
                    "Na₂SO₄",
                    "KCN"
                ],
                "answer": "NaHSO₄",
                "explanation": "🔬 Sodium hydrogen sulfate (NaHSO₄) is formed by partial neutralization of sulfuric acid and still contains a replaceable hydrogen atom, making it an acidic salt.\n\n📘 सोडियम हाइड्रोजन सल्फेट (NaHSO₄) एक अम्लीय लवण है क्योंकि इसमें एक प्रतिस्थापनीय (अम्लीय) हाइड्रोजन परमाणु शेष बचा होता है जो जल में H⁺ आयन देता है।"
            },
            {
                "q": "The reaction between an acid and a base yields:\n(अम्ल एवं क्षारक की अभिक्रिया से प्राप्त होता है-)",
                "options": [
                    "Hydrogen (हाइड्रोजन)",
                    "Oxygen (ऑक्सीजन)",
                    "Salt and water (लवण तथा जल)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Salt and water (लवण तथा जल)",
                "explanation": "🔬 Acid-base neutralization reactions involve H⁺ from the acid combining with OH⁻ from the base to form water, leaving behind a salt.\n\n📘 अम्ल और क्षार की परस्पर अभिक्रिया को उदासीनीकरण (Neutralisation) कहते हैं, जिसके फलस्वरूप लवण (Salt) और जल (Water) बनते हैं।"
            },
            {
                "q": "The number of water molecules in one molecule of washing soda is:\n(धावन सोडा के एक अणु में जल के अणुओं की संख्या है-)",
                "options": [
                    "2",
                    "5",
                    "8",
                    "10"
                ],
                "answer": "10",
                "explanation": "🔬 Washing soda is chemically sodium carbonate decahydrate (Na₂CO₃·10H₂O), indicating 10 water molecules of crystallization per formula unit.\n\n📘 धावन सोडा के एक सूत्र इकाई में क्रिस्टलन जल के 10 अणु उपस्थित होते हैं, इसलिए इसका सूत्र Na₂CO₃·10H₂O है।"
            },
            {
                "q": "Reacting plaster of Paris with water forms:\n(प्लास्टर ऑफ पेरिस की जल से अभिक्रिया कराने पर बनता है-)",
                "options": [
                    "Gypsum (जिप्सम)",
                    "Slaked lime (बुझा चूना)",
                    "Limestone (चूना पत्थर)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Gypsum (जिप्सम)",
                "explanation": "🔬 Plaster of Paris (CaSO₄·½H₂O) absorbs water to reform gypsum (CaSO₄·2H₂O), setting into a hard solid mass: CaSO₄·½H₂O + 1½H₂O ──> CaSO₄·2H₂O.\n\n📘 प्लास्टर ऑफ पेरिस (CaSO₄·½H₂O) जल को अवशोषित करके पुनः जिप्सम (CaSO₄·2H₂O) में परिवर्तित हो जाता है और कठोर हो जाता है: CaSO₄·½H₂O + 1½H₂O ──> CaSO₄·2H₂O।"
            },
            {
                "q": "The chemical formula of Plaster of Paris is:\n(प्लास्टर ऑफ पेरिस का सूत्र है-)",
                "options": [
                    "CaSO₄·½H₂O",
                    "CaSO₄·2H₂O",
                    "CaSO₄·H₂O",
                    "CaSO₄·5H₂O"
                ],
                "answer": "CaSO₄·½H₂O",
                "explanation": "🔬 Plaster of Paris is calcium sulfate hemihydrate with the formula CaSO₄·½H₂O.\n\n📘 प्लास्टर ऑफ पेरिस का रासायनिक नाम कैल्शियम सल्फेट हेमीहाइड्रेट है और इसका सूत्र CaSO₄·½H₂O है।"
            },
            {
                "q": "The chemical formula of calcium nitrate is:\n(कैल्सियम नाइट्रेट का रासायनिक सूत्र है-)",
                "options": [
                    "CaNO₃",
                    "Ca(NO₃)₂",
                    "Ca₃NO₂",
                    "Ca₂NO₃"
                ],
                "answer": "Ca(NO₃)₂",
                "explanation": "🔬 Calcium has a valency of 2 (Ca²⁺) and nitrate has a valency of 1 (NO₃⁻). Criss-crossing gives the neutral formula Ca(NO₃)₂.\n\n📘 कैल्शियम की संयोजकता 2 (Ca²⁺) और नाइट्रेट की 1 (NO₃⁻) होती है। क्रिस-क्रॉस विधि से इसका रासायनिक सूत्र Ca(NO₃)₂ बनता है।"
            },
            {
                "q": "The pH of pure water is:\n(शुद्ध जल का pH मान है-)",
                "options": [
                    "0",
                    "1",
                    "7",
                    "14"
                ],
                "answer": "7",
                "explanation": "🔬 Pure water is neutral because it has equal concentrations of H⁺ and OH⁻ ions ([H⁺] = 10⁻⁷ M), giving it a pH of 7.\n\n📘 शुद्ध जल उदासीन होता है क्योंकि इसमें अम्लीयता और क्षारीयता के कारक आयन बराबर मात्रा में होते हैं, जिससे इसका pH मान 7 होता है।"
            },
            {
                "q": "A solution with pH 0 is:\n(शून्य pH वाला विलयन होता है-)",
                "options": [
                    "Acidic (अम्लीय)",
                    "Basic (क्षारकीय / क्षारीय)",
                    "Neutral (उदासीन)",
                    "None of these (उपर्युक्त में से कोई नहीं)"
                ],
                "answer": "Acidic (अम्लीय)",
                "explanation": "🔬 On the pH scale from 0 to 14, values less than 7 represent acidic solutions. A pH of 0 indicates an extremely strong acidic solution.\n\n📘 pH पैमाने पर 7 से कम के मान अम्लीय विलयन दर्शाते हैं। pH मान 0 होना अत्यंत प्रबल अम्लीय विलयन का सूचक है।"
            },
            {
                "q": "The chemical nature of free hydrogen ions (H⁺) in solution is:\n(हाइड्रोजन आयन (H⁺) की प्रकृति है-)",
                "options": [
                    "Acidic (अम्लीय)",
                    "Basic (क्षारकीय / क्षारीय)",
                    "Neutral (उदासीन)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Acidic (अम्लीय)",
                "explanation": "🔬 Hydrogen ions (H⁺) cannot exist independently in water. They combine with water molecules to form hydronium ions (H₃O⁺), which are responsible for acidic properties.\n\n📘 Hydrogen आयन (H⁺) जलीय विलयन में स्वतंत्र रूप से नहीं रह सकते। ये जल के अणुओं के साथ मिलकर हाइड्रोनियम आयन (H₃O⁺) बनाते हैं जो अम्लीय प्रकृति के लिए उत्तरदायी होते हैं।"
            },
            {
                "q": "Reaction of ethanol with sodium metal yields:\n(एथेनॉल की सोडियम से अभिक्रिया कराने पर प्राप्त होती है-)",
                "options": [
                    "O₂ gas",
                    "H₂ gas",
                    "C₂H₄ gas",
                    "C₂H₆ gas"
                ],
                "answer": "H₂ gas",
                "explanation": "🔬 Ethanol reacts with active alkali metals like sodium to produce sodium ethoxide and release hydrogen (H₂) gas: 2C₂H₅OH + 2Na ──> 2C₂H₅ONa + H₂↑.\n\n📘 एथेनॉल सक्रिय धातु सोडियम के साथ क्रिया करके सोडियम एथॉक्साइड बनाता है और हाइड्रोजन (H₂) गैस मुक्त करता है: 2C₂H₅OH + 2Na ──> 2C₂H₅ONa + H₂↑।"
            },
            {
                "q": "The pH of a neutral solution is:\n(उदासीन घोल का pH है-)",
                "options": [
                    "7",
                    "14",
                    "1",
                    "5"
                ],
                "answer": "7",
                "explanation": "🔬 A solution is neutral when its H⁺ ion concentration is 10⁻⁷ M, resulting in a pH of exactly 7.\n\n📘 उदासीन विलयन का pH मान ठीक 7 होता है, क्योंकि इसमें अम्लीय व क्षारीय आयनों की सांद्रता संतुलित होती है।"
            },
            {
                "q": "A solution with pH 8.5 is:\n(pH मान 8.5 वाला विलयन है-)",
                "options": [
                    "Basic (क्षारकीय / क्षारीय)",
                    "Acidic (अम्लीय)",
                    "Neutral (उदासीन)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Basic (क्षारकीय / क्षारीय)",
                "explanation": "🔬 Any solution with a pH value greater than 7 is classified as basic or alkaline.\n\n📘 7 से अधिक pH मान वाले सभी विलयन क्षारीय (Basic) श्रेणी में आते हैं। अतः 8.5 pH वाला विलयन क्षारीय है।"
            },
            {
                "q": "A solution turns red litmus blue. Its pH value is likely to be:\n(एक विलयन लाल लिटमस को नीला करता है। इसका pH मान सम्भव है-)",
                "options": [
                    "1",
                    "6",
                    "3",
                    "8"
                ],
                "answer": "8",
                "explanation": "🔬 Solutions that turn red litmus blue are basic/alkaline. Their pH must be greater than 7. Among the options, only 8 is greater than 7.\n\n📘 लाल लिटमस को नीला करने वाले विलयन क्षारीय होते हैं और उनका pH मान 7 से अधिक होता है। दिए गए विकल्पों में केवल 8 ही 7 से अधिक है।"
            },
            {
                "q": "The chemical formula of baking soda is:\n(बेकिंग सोडा का सूत्र है-)",
                "options": [
                    "CaOCl₂",
                    "NaHCO₃",
                    "NH₄Cl",
                    "Na₂CO₃"
                ],
                "answer": "NaHCO₃",
                "explanation": "🔬 Baking soda is sodium hydrogen carbonate (NaHCO₃), which releases carbon dioxide when heated or reacted with mild edible acids.\n\n📘 बेकिंग सोडा का रासायनिक नाम सोडियम हाइड्रोजन कार्बोनेट है और इसका रासायनिक सूत्र NaHCO₃ है।"
            },
            {
                "q": "Which of the following is a strong base?\n(प्रबल बेस है-)",
                "options": [
                    "NaOH",
                    "NH₄OH",
                    "Cu(OH)₂",
                    "Al(OH)₃"
                ],
                "answer": "NaOH",
                "explanation": "🔬 Sodium hydroxide (NaOH) is a strong base because it completely dissociates into Na⁺ and OH⁻ ions in aqueous solutions.\n\n📘 सोडियम हाइड्रॉक्साइड (NaOH) एक प्रबल क्षार है क्योंकि यह जलीय विलयन में पूर्णतः आयनित होकर हाइड्रॉक्साइड आयन (OH⁻) प्रदान करता है।"
            },
            {
                "q": "Which of the following represents a precipitation reaction?\n(अवक्षेपण अभिक्रिया है-)",
                "options": [
                    "BaCl₂(aq) + H₂SO₄(aq) ──> BaSO₄(s)↓ + 2HCl(aq)",
                    "HCl(aq) + NaOH(aq) ──> NaCl(aq) + H₂O(l)",
                    "MgCO₃(s) + H₂SO₄(aq) ──> MgSO₄(aq) + H₂O(l) + CO₂(g)",
                    "4Na(s) + O₂(g) ──> 2Na₂O(s)"
                ],
                "answer": "BaCl₂(aq) + H₂SO₄(aq) ──> BaSO₄(s)↓ + 2HCl(aq)",
                "explanation": "🔬 Reacting barium chloride and sulfuric acid forms a solid, insoluble white precipitate of barium sulfate (BaSO₄), which falls out of solution. This is a precipitation reaction.\n\n📘 बेरियम क्लोराइड और सल्फ्यूरिक अम्ल की क्रिया से बेरियम सल्फेट (BaSO₄) का सफेद अघुलनशील ठोस अवक्षेप प्राप्त होता है। यह एक अवक्षेपण अभिक्रिया है।"
            },
            {
                "q": "Which of the following is an alkali/alkaline metal?\n(निम्न में क्षारीय धातु है-)",
                "options": [
                    "Ca",
                    "K",
                    "Ag",
                    "Al"
                ],
                "answer": "K",
                "explanation": "🔬 Potassium (K) is a Group 1 element, which classifies it as an alkali metal (क्षार धातु).\n\n📘 पोटैशियम (K) आवर्त सारणी के प्रथम समूह का सदस्य है, जो इसे एक क्षार धातु (Alkali Metal) बनाता है।"
            },
            {
                "q": "A solution turns red litmus blue. What is the expected pH value?\n(एक विलयन लाल लिटमस को नीला करता है। इस विलयन का सम्भावित pH मान है-)",
                "options": [
                    "2",
                    "3",
                    "5",
                    "8"
                ],
                "answer": "8",
                "explanation": "🔬 Turning red litmus blue is a characteristic property of basic solutions, which have a pH value greater than 7. Thus, 8 is the correct pH.\n\n📘 लाल लिटमस पत्र को नीला करना क्षारीय विलयन का गुण है। क्षारीय विलयन का pH मान 7 से अधिक होता है। अतः उत्तर 8 होगा।"
            },
            {
                "q": "The common name of CaOCl₂ is:\n(CaOCl₂ का प्रचलित नाम है-)",
                "options": [
                    "Baking powder (बेकिंग पाउडर)",
                    "Plaster of Paris (प्लास्टर ऑफ पेरिस)",
                    "Bleaching powder (ब्लीचिंग पाउडर)",
                    "Washing soda (धावन सोडा)"
                ],
                "answer": "Bleaching powder (ब्लीचिंग पाउडर)",
                "explanation": "🔬 Calcium oxychloride (CaOCl₂) is commercially known as bleaching powder, widely used for bleaching clothes and disinfecting water.\n\n📘 कैल्शियम ऑक्सीक्लोराइड (CaOCl₂) को ब्लीचिंग पाउडर (विरंजक चूर्ण) कहा जाता है। इसका उपयोग रोगाणुनाशी और विरंजन कार्यों में होता है।"
            },
            {
                "q": "Rain water is classified as acid rain when its pH value is:\n(अम्ल वर्षा में जल का pH मान होता है-)",
                "options": [
                    "More than 5.6 (5.6 से अधिक)",
                    "Less than 5.6 (5.6 से कम)",
                    "7.0",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "Less than 5.6 (5.6 से कम)",
                "explanation": "🔬 Normal rain water has a pH of around 5.6 due to dissolved carbon dioxide. When pollutants like SO₂ and NO₂ dissolve to form stronger acids, the pH drops below 5.6, creating acid rain.\n\n📘 सामान्य वर्षा का जल थोड़ा अम्लीय (pH ~5.6) होता है। लेकिन जब सल्फर व नाइट्रोजन के ऑक्साइड घुलकर अम्ल बनाते हैं और pH मान 5.6 से कम हो जाता है, तो उसे अम्लीय वर्षा कहते हैं।"
            },
            {
                "q": "Ethanol reacts with sodium metal to produce:\n(एथेनॉल की सोडियम धातु से अभिक्रिया होने पर उत्पन्न होती है-)",
                "options": [
                    "O₂ gas",
                    "H₂ gas",
                    "N₂ gas",
                    "CO₂ gas"
                ],
                "answer": "H₂ gas",
                "explanation": "🔬 Alcohols like ethanol react with active metals like sodium to release hydrogen gas: 2C₂H₅OH + 2Na ──> 2C₂H₅ONa + H₂↑.\n\n📘 एथेनॉल सोडियम जैसी सक्रिय धातु के साथ क्रिया करके सोडियम एथॉक्साइड बनाता है और हाइड्रोजन (H₂) गैस मुक्त करता है।"
            },
            {
                "q": "What will be the approximate pH of a dilute NaOH solution?\n(तनु NaOH विलयन का pH लगभग कितना होगा?)",
                "options": [
                    "7",
                    "Less than 7 (7 से कम)",
                    "More than 7 (7 से अधिक)",
                    "None of these (इनमें से कोई नहीं)"
                ],
                "answer": "More than 7 (7 से अधिक)",
                "explanation": "🔬 Sodium hydroxide (NaOH) is a strong base that fully dissociates in water. Even in dilute solutions, it maintains a high concentration of OH⁻ ions, keeping the pH significantly above 7 (typically around 13).\n\n📘 सोडियम हाइड्रॉक्साइड (NaOH) एक प्रबल क्षार है। तनु होने पर भी इसमें हाइड्रॉक्साइड आयन (OH⁻) बहुतायत में होते हैं, जिससे इसका pH मान 7 से बहुत अधिक (लगभग 13) रहता है।"
            },
            {
                "q": "Tomato naturally contains which organic acid?\n(टमाटर में होता है-)",
                "options": [
                    "Acetic acid (ऐसीटीक अम्ल)",
                    "Citric acid (साइट्रिक अम्ल)",
                    "Tartaric acid (टार्टरिक अम्ल)",
                    "Oxalic acid (ऑक्सैलिक अम्ल)"
                ],
                "answer": "Oxalic acid (ऑक्सैलिक अम्ल)",
                "explanation": "🔬 Tomato contains oxalic acid (H₂C₂O₄) naturally. Other acids like citric acid are present in citrus fruits, tartaric acid in tamarind, and acetic acid in vinegar.\n\n📘 टमाटर में प्राकृतिक रूप से ऑक्सैलिक अम्ल (Oxalic Acid) पाया जाता है। साइट्रिक अम्ल खट्टे फलों में और टार्टरिक अम्ल इमली में पाया जाता है।"
            },
            {
                "q": "What type of salt is NaHCO₃?\n(NaHCO₃ किस प्रकार का लवण है-)",
                "options": [
                    "Acidic salt (अम्लीय लवण)",
                    "Basic salt (क्षारतीय / क्षारीय लवण)",
                    "Neutral salt (उदासीन लवण)",
                    "Double salt (द्विक लवण)"
                ],
                "answer": "Acidic salt (अम्लीय लवण)",
                "explanation": "🔬 Sodium hydrogen carbonate (NaHCO₃) is formed by partial neutralization of carbonic acid and still contains a replaceable hydrogen atom, making it an acidic salt.\n\n📘 सोडियम बाइकार्बोनेट (NaHCO₃) एक अम्लीय लवण है क्योंकि इसमें विस्थापन योग्य हाइड्रोजन परमाणु उपस्थित होता है।"
            },
            {
                "q": "Four solutions A, B, C, and D have pH values of 4, 2, 6, and 11 respectively. Choose the correct order of increasing acidic strength:\n(चार विलयन A, B, C और D के pH क्रमशः: 4, 2, 6 एवं 11 हैं। उक्त विलयनों को बढ़ते हुए अम्लीय गुण के आधार पर व्यवस्थित करने का सही उत्तर चुनिए-)",
                "options": [
                    "D < C < A < B",
                    "B < A < C < D",
                    "A < C < B < D",
                    "B < C < D < A"
                ],
                "answer": "D < C < A < B",
                "explanation": "🔬 Acidity is inversely proportional to pH. A lower pH means a higher concentration of hydrogen ions and thus stronger acidity. Therefore, D (pH 11) is the least acidic, followed by C (pH 6), A (pH 4), and B (pH 2) is the most acidic: D < C < A < B.\n\n📘 विलयन का pH मान जितना कम होगा, उसकी अम्लीयता उतनी ही अधिक होगी। अतः pH 11 (D) सबसे कम अम्लीय है, फिर C (pH 6), फिर A (pH 4) और B (pH 2) सबसे अधिक अम्लीय है। बढ़ता हुआ क्रम: D < C < A < B है।"
            },
            {
                "q": "The formula of bleaching powder is:\n(ब्लीचिंग पाउडर का सूत्र है-)",
                "options": [
                    "CaOCl",
                    "Ca(ClO)₂",
                    "Ca(ClO₃)₂",
                    "CaOCl₂"
                ],
                "answer": "CaOCl₂",
                "explanation": "🔬 Bleaching powder is calcium oxychloride (also called calcium hypochlorite), represented by the formula CaOCl₂.\n\n📘 ब्लीचिंग पाउडर का रासायनिक नाम कैल्शियम ऑक्सीक्लोराइड है और इसका सूत्र CaOCl₂ है।"
            },
            {
                "q": "Match the substances in Column (I) with their applications in Column (II): (A) Plaster of Paris ── (ii) Statue manufacturing (B) Caustic soda ── (i) Soap manufacturing (C) Sodium bicarbonate ── (iv) Antacid (D) Bleaching powder ── (iii) Disinfectant\n(कॉलम (I) के पदार्थों का सुमेलन कॉलम (II) के उनके अनुप्रयोगों से कीजिए:)",
                "options": [
                    "(A) -> (ii), (B) -> (i), (C) -> (iv), (D) -> (iii)",
                    "(A) -> (i), (B) -> (ii), (C) -> (iii), (D) -> (iv)",
                    "(A) -> (ii), (B) -> (iv), (C) -> (i), (D) -> (iii)",
                    "(A) -> (iv), (B) -> (i), (C) -> (ii), (D) -> (iii)"
                ],
                "answer": "(A) -> (ii), (B) -> (i), (C) -> (iv), (D) -> (iii)",
                "explanation": "🔬 Applications of compounds:\n1) Plaster of Paris sets hard to make statues and casts.\n2) Caustic soda (NaOH) reacts with fats to manufacture soap.\n3) Sodium bicarbonate acts as an antacid to neutralize stomach acid.\n4) Bleaching powder is used as a disinfectant.\n\n📘 रासायनिक पदार्थों के उपयोग:\n1) प्लास्टर ऑफ पेरिस का उपयोग मूर्तियां बनाने में होता है।\n2) कॉस्टिक सोडा (NaOH) का उपयोग साबुन निर्माण (Saponification) में होता है।\n3) सोडियम बाइकार्बोनेट का उपयोग पेट की अम्लता दूर करने के लिए प्रतिअम्ल (Antacid) के रूप में होता है।\n4) ब्लीचिंग पाउडर का उपयोग जल शोधन में रोगाणुनाशी के रूप में होता है।"
            },
            {
                "q": "Match the formulas in Column (I) with their common names in Column (II): (A) Na₂CO₃·10H₂O ── (iii) Washing soda (B) NaHCO₃ ── (i) Baking soda (C) CaOCl₂ ── (ii) Bleaching powder (D) CaSO₄·½H₂O ── (iv) Plaster of Paris\n(कॉलम (I) के सूत्रों का सुमेलन कॉलम (II) के प्रचलित नामों से कीजिए:)",
                "options": [
                    "(A) -> (iii), (B) -> (i), (C) -> (ii), (D) -> (iv)",
                    "(A) -> (i), (B) -> (iii), (C) -> (ii), (D) -> (iv)",
                    "(A) -> (iii), (B) -> (ii), (C) -> (i), (D) -> (iv)",
                    "(A) -> (iv), (B) -> (i), (C) -> (ii), (D) -> (iii)"
                ],
                "answer": "(A) -> (iii), (B) -> (i), (C) -> (ii), (D) -> (iv)",
                "explanation": "🔬 Common chemical names:\n- Na₂CO₃·10H₂O = Washing soda\n- NaHCO₃ = Baking soda\n- CaOCl₂ = Bleaching powder\n- CaSO₄·½H₂O = Plaster of Paris\n\n📘 सही रासायनिक संबंध:\n- Na₂CO₃·10H₂O = धावन सोडा\n- NaHCO₃ = बेकिंग (मीठा) सोडा\n- CaOCl₂ = विरंजक चूर्ण\n- CaSO₄·½H₂O = प्लास्टर ऑफ पेरिस।"
            },
            {
                "q": "Assertion (A): Tooth decay starts when the pH of the mouth is more than 5.5.\nReason (R): Tooth decay occurs due to the corrosion of enamel (calcium phosphate).\n(कथन (A): हमारे मुख का pH मान 5.5 से अधिक होने पर दंत क्षय प्रारंभ हो जाता है।\nकारण (R): दंत क्षय इनेमल (कैल्सियम फॉस्फेट) का संक्षारण होने के कारण होता है।)",
                "options": [
                    "Both (A) and (R) are true and (R) is the correct explanation (दोनों सही हैं तथा तर्क सही स्पष्टीकरण है)",
                    "Both are true but (R) is not the correct explanation (दोनों सही हैं परन्तु तर्क सही स्पष्टीकरण नहीं है)",
                    "Assertion (A) is false but Reason (R) is true (कथन असत्य है परन्तु कारण सत्य है)",
                    "Assertion (A) is true but Reason (R) is false (कथन सत्य है परन्तु कारण असत्य है)"
                ],
                "answer": "Assertion (A) is false but Reason (R) is true (कथन असत्य है परन्तु कारण सत्य है)",
                "explanation": "🔬 Assertion (A) is false because tooth decay starts when the pH of the mouth falls below 5.5 (acidic environment), not when it is more than 5.5. Reason (R) is true because enamel, made of calcium phosphate, is corroded by acids produced by bacteria from sugar.\n\n📘 कथन (A) असत्य है क्योंकि दंत क्षय मुख का pH मान 5.5 से कम (अधिक अम्लीय) होने पर शुरू होता है, न कि अधिक होने पर। कारण (R) सत्य है क्योंकि भोजन के बाद मुंह में बैक्टीरिया द्वारा बनाए गए अम्लों से कैल्सियम फॉस्फेट (इनेमल) का संक्षारण होने लगता है।"
            },
            {
                "q": "Assertion (A): On dilution of both strong and weak acid solutions, the number of H⁺ ions per unit volume decreases.\nReason (R): On dilution, the degree of dissociation of strong acids does not increase, whereas that of weak acids increases.\n(कथन (A): एक प्रबल अम्ल या एक दुर्बल अम्ल के तनुकरण से विलयन के प्रति इकाई आयतन में H⁺ आयनों की संख्या घट जाती है।\nकारण (R): तनुकरण पर प्रबल अम्ल का वियोजन नहीं बढ़ता जबकि दुर्बल अम्ल का वियोजन तनुकरण पर बढ़ जाता है।)",
                "options": [
                    "Both (A) and (R) are true and (R) is the correct explanation (दोनों सही हैं तथा तर्क सही स्पष्टीकरण है)",
                    "Both are true but (R) is not the correct explanation (दोनों सही हैं परन्तु तर्क सही स्पष्टीकरण नहीं है)",
                    "Assertion (A) is true but Reason (R) is false (कथन सत्य है परन्तु कारण असत्य है)",
                    "Assertion (A) is false but Reason (R) is true (कथन असत्य है परन्तु कारण सत्य है)"
                ],
                "answer": "Both are true but (R) is not the correct explanation (दोनों सही हैं परन्तु तर्क सही स्पष्टीकरण नहीं है)",
                "explanation": "🔬 Both statements are true. On dilution, the volume increases much faster than any increase in H⁺ ions, so [H⁺] (concentration) decreases for both acids. R is true (Ostwald's dilution law: weak acid dissociation increases, strong acid is already 100% dissociated). However, R is not the direct reason for A; the decrease in concentration is primarily due to the increase in solvent volume.\n\n📘 दोनों कथन सत्य हैं। तनुकरण पर आयतन बहुत अधिक बढ़ जाता है, जिससे प्रति इकाई आयतन में H⁺ आयनों की सांद्रता दोनों ही स्थितियों में घटती है। दुर्बल अम्ल का वियोजन तनुकरण पर बढ़ता है, जबकि प्रबल अम्ल पहले ही पूर्णतः वियोजित होता है (यह भी सत्य है)। परन्तु कारण, कथन का सही स्पष्टीकरण नहीं है।"
            },
            {
                "q": "Assertion (A): Litmus solution obtained from lichen plants is purple in color.\nReason (R): Neutral litmus solution obtained from plants is red in acidic and blue in basic media.\n(कथन (A): लाइकेन पौधे से प्राप्त लिटमस विलयन बैंगनी रंग का होता है।\nकारण (R): पौधों से प्राप्त उदासीन लिटमस विलयन अम्लीय माध्यम में लाल तथा क्षारीय माध्यम में नीला होता है।)",
                "options": [
                    "Both (A) and (R) are true and (R) is the correct explanation (दोनों सही हैं तथा तर्क सही स्पष्टीकरण है)",
                    "Both are true but (R) is not the correct explanation (दोनों सही हैं परन्तु तर्क सही स्पष्टीकरण नहीं है)",
                    "Assertion (A) is true but Reason (R) is false (कथन सत्य है परन्तु कारण असत्य है)",
                    "Assertion (A) is false but Reason (R) is true (कथन असत्य है परन्तु कारण सत्य है)"
                ],
                "answer": "Both are true but (R) is not the correct explanation (दोनों सही हैं परन्तु तर्क सही स्पष्टीकरण नहीं है)",
                "explanation": "🔬 Both statements are true. Litmus is a natural indicator extracted from lichens and is naturally purple (its neutral color). While it turns red in acids and blue in bases (R is true), this acid-base behavior does not explain why its natural, extracted state color is purple.\n\n📘 कथन (A) सत्य है, लिटमस का प्राकृतिक उदासीन रंग बैंगनी होता है। कारण (R) भी सत्य है कि यह अम्लीय माध्यम में लाल और क्षारीय में नीला हो जाता है। परन्तु कारण, कथन का स्पष्टीकरण नहीं है कि प्राकृतिक रंग बैंगनी क्यों है।"
            },
            {
                "q": "Assertion (A): The acidic strength of three acids is in the order: H₃PO₄ > H₂SO₄ > HCl.\nReason (R): Phosphoric, sulfuric, and hydrochloric acids contain 3, 2, and 1 ionizable hydrogen atoms respectively.\n(कथन (A): तीन अम्लों की सामर्थ्य निम्न क्रम में हैं: H₃PO₄ > H₂SO₄ > HCl।\nकारण (R): फॉस्फोरिक अम्ल, सल्फ्यूरिक अम्ल तथा हाइड्रोक्लोरिक अम्ल में क्रमशः 3, 2 तथा 1 आयननीय हाइड्रोजन परमाणु होते हैं।)",
                "options": [
                    "Both (A) and (R) are true and (R) is the correct explanation (दोनों सही हैं तथा तर्क सही स्पष्टीकरण है)",
                    "Both are true but (R) is not the correct explanation (दोनों सही हैं परन्तु तर्क सही स्पष्टीकरण नहीं है)",
                    "Assertion (A) is false but Reason (R) is true (कथन A गलत है लेकिन कारण R सत्य है)",
                    "Assertion (A) is true but Reason (R) is false (कथन A सत्य है लेकिन कारण R गलत है)"
                ],
                "answer": "Assertion (A) is false but Reason (R) is true (कथन A गलत है लेकिन कारण R सत्य है)",
                "explanation": "🔬 Assertion (A) is false because the order of acidic strength is actually HCl > H₂SO₄ > H₃PO₄. HCl and H₂SO₄ are strong mineral acids, while H₃PO₄ is a weak acid. Reason (R) is true because their basicities are indeed 3, 2, and 1 respectively.\n\n📘 कथन (A) असत्य है क्योंकि अम्लों की वास्तविक सामर्थ्य का क्रम HCl > H₂SO₄ > H₃PO₄ है (HCl व सल्फ्यूरिक अम्ल प्रबल अम्ल हैं, फॉस्फोरिक अम्ल दुर्बल है)। कारण (R) सत्य है क्योंकि फॉस्फोरिक, सल्फ्यूरिक और हाइड्रोक्लोरिक अम्लों में क्रमशः 3, 2 और 1 विस्थापन योग्य हाइड्रोजन होते हैं।"
            },
            {
                "q": "Assertion (A): If equal volumes of two solutions having pH = 4 and pH = 10 are mixed, the resulting solution has pH = 7.\nReason (R): When equal volumes of two solutions are mixed, the resulting pH is the average of their pH values.\n(कथन (A): यदि pH = 4 तथा pH = 10 वाले दो विलयनों के समान आयतन मिलाये जायें तब परिणामी विलयन का pH = 7 होता है।\nकारण (R): जब दो विलयनों के समान आयतन मिश्रित किए जाते हैं तो परिणामी विलयन का pH उनके pH के योगफल का आधा होता है।)",
                "options": [
                    "Both (A) and (R) are true and (R) is the correct explanation (दोनों सही हैं तथा तर्क सही स्पष्टीकरण है)",
                    "Assertion (A) is true but Reason (R) is false (कथन A सत्य है लेकिन कारण R गलत है)",
                    "Assertion (A) is false but Reason (R) is true (कथन A गलत है लेकिन कारण R सत्य है)",
                    "Both are false (दोनों कथन गलत हैं)"
                ],
                "answer": "Assertion (A) is true but Reason (R) is false (कथन A सत्य है लेकिन कारण R गलत है)",
                "explanation": "🔬 Assertion (A) is true because pH = 4 corresponds to [H⁺] = 10⁻⁴ M, and pH = 10 corresponds to [OH⁻] = 10⁻⁴ M. Equal volumes of equal strength H⁺ and OH⁻ fully neutralize to pH 7. Reason (R) is false because pH is logarithmic; mixing equal volumes does not result in the simple arithmetic average of their pH values.\n\n📘 कथन (A) सत्य है क्योंकि pH 4 वाले विलयन में H⁺ सांद्रता 10⁻⁴ M होती है और pH 10 वाले विलयन में OH⁻ सांद्रता 10⁻⁴ M (यानी H⁺ = 10⁻¹⁰ M) होती है। इनके समान आयतन मिलने पर H⁺ और OH⁻ परस्पर पूर्ण उदासीन हो जाते हैं, जिससे pH 7 बनता है। कारण (R) असत्य है क्योंकि pH एक लघुगणकीय (Logarithmic) पैमाना है; इनका सीधा औसत नहीं निकाला जा सकता।"
            }
        ]
    }
};

// ============================================
// QUIZ STATE
// ============================================
let quizState = {
    mode: null,
    questions: [],
    currentIndex: 0,
    correct: 0,
    wrong: 0,
    xpEarned: 0,
    userAnswers: [] // Track user's answers for explanations
};

// ============================================
// STATE
// ============================================
let selectedClass = 'all';
let selectedSubject = 'all';

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerData();
    initTheme();
    initFactsSlider();
    updateUI();
    renderChapterGrid(); // Render dynamic grid on load
});

// ============================================
// CLASS FILTER
// ============================================
function selectClass(cls) {
    selectedClass = cls;
    selectedSubject = 'all'; // Reset subject filter

    // Update class button UI
    document.querySelectorAll('.class-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.class === cls);
    });

    // Reset subject tabs
    document.querySelectorAll('.subject-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.subject === 'all');
    });

    renderChapterGrid();

    if (window.BroProSounds) BroProSounds.play('click');
}

// ============================================
// SUBJECT FILTER
// ============================================
function filterSubject(subject) {
    selectedSubject = subject;

    // Update tabs
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
    const gradientMap = { physics: 'physics-gradient', chemistry: 'chemistry-gradient', biology: 'biology-gradient' };
    const labelMap = { physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology' };

    // Get chapters — if 'all' class, merge playable chapters from every class
    let chapters;
    if (selectedClass === 'all') {
        chapters = [];
        Object.values(classChapters).forEach(list => {
            list.forEach(ch => {
                if (ch.dataKey && scienceData[ch.dataKey] && !chapters.some(c => c.dataKey === ch.dataKey)) {
                    chapters.push(ch);
                }
            });
        });
    } else {
        chapters = classChapters[selectedClass] || [];
    }

    // Filter by subject
    const filtered = selectedSubject === 'all'
        ? chapters
        : chapters.filter(ch => ch.subject === selectedSubject);

    // Only show chapters that have quiz data
    const playable = filtered.filter(ch => ch.dataKey && scienceData[ch.dataKey]);

    // Build HTML
    let html = '';

    // Leaderboard card — always pinned at the very top
    html += `
    <div class="activity-card leaderboard-card" onclick="openLeaderboard()" style="animation-delay:0.02s">
        <div class="card-header" style="background: linear-gradient(135deg, #ffd700, #ff8c00);">
            <span class="card-emoji">🏆</span>
            <span class="category-tag">Rankings</span>
        </div>
        <div class="card-body">
            <h3 class="card-title">Leaderboard</h3>
            <p class="card-desc">See the top Science Champions!</p>
            <div class="card-footer">
                <span class="difficulty" style="background: gold; color: #333;">Global</span>
                <span class="xp-reward">🌟 Rankings</span>
            </div>
        </div>
    </div>`;

    // Interactive Periodic Table card — links to the standalone periodic table app
    if (selectedSubject === 'all' || selectedSubject === 'chemistry') {
        html += `
        <div class="activity-card chemistry-card" data-category="chemistry"
            onclick="window.location.href='/periodic-table/'" style="animation-delay:0.08s">
            <div class="card-header chemistry-gradient">
                <span class="card-emoji">⚗️</span>
                <span class="category-tag" style="background: rgba(255,215,0,0.3); color: #ffd700;">✨ NEW</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">Interactive Periodic Table</h3>
                <p class="card-desc">Explore 118 elements with 3D atoms & quizzes!</p>
                <div class="card-footer">
                    <span class="difficulty easy">Beginner</span>
                    <span class="xp-reward">+50 XP</span>
                </div>
            </div>
        </div>`;
    }

    // Interactive Labs shortcut card — scrolls to the Labs section below
    html += `
    <div class="activity-card" data-category="labs"
        onclick="document.getElementById('interactiveLabs').scrollIntoView({behavior:'smooth'})" style="animation-delay:0.14s">
        <div class="card-header" style="background: linear-gradient(135deg, #00c9ff, #92fe9d);">
            <span class="card-emoji">🧪</span>
            <span class="category-tag" style="background: rgba(255,255,255,0.2); color: #fff;">Hands-On</span>
        </div>
        <div class="card-body">
            <h3 class="card-title">Interactive Labs</h3>
            <p class="card-desc">Virtual experiments — Color Mixing, Pendulum, Circuits & more!</p>
            <div class="card-footer">
                <span class="difficulty easy">Explore</span>
                <span class="xp-reward">🔬 5 Labs</span>
            </div>
        </div>
    </div>`;

    // Render playable chapter cards
    playable.forEach((ch, i) => {
        const gradientClass = gradientMap[ch.subject] || 'physics-gradient';
        const subjectLabel = labelMap[ch.subject] || 'Science';
        const xp = scienceData[ch.dataKey].xpPerQuestion;
        const qCount = scienceData[ch.dataKey].questions.length;
        const chapterBadge = ch.ch ? `<span class="chapter-number-badge">Ch${ch.ch}</span>` : '';
        const delay = `style="animation-delay:${(i + 2) * 0.06}s"`;

        html += `
        <div class="activity-card" data-category="${ch.subject}" onclick="openActivity('${ch.dataKey}')" ${delay}>
            <div class="card-header ${gradientClass}">
                ${chapterBadge}
                <span class="card-emoji">${ch.icon}</span>
                <span class="category-tag">${subjectLabel}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${ch.name}</h3>
                <p class="card-desc">${qCount} Questions</p>
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
        const subName = selectedSubject === 'all' ? '' : ' • ' + labelMap[selectedSubject];
        if (playable.length > 0) {
            label.textContent = `${className}${subName} — ${playable.length} topics available`;
        } else if (selectedClass !== 'other' && selectedClass !== 'all') {
            label.textContent = `${className}${subName} — Content coming soon`;
        } else {
            label.textContent = '';
        }
    }
}

// Activity order for access control (first one is free)
const activityOrder = ['forces', 'electricity', 'light', 'elements', 'reactions', 'compounds', 'cells', 'human', 'ecology', 'c9_matter', 'c9_atom', 'c10_chemical_reactions', 'c10_acids_bases'];

// ============================================
// QUIZ INITIATION
// ============================================
function openActivity(mode) {
    const data = scienceData[mode];
    if (!data) return;

    // Check access - first activity is free, others need login
    const activityIndex = activityOrder.indexOf(mode);

    // Block access for non-first activities if not logged in OR not premium
    if (activityIndex > 0) {
        // First check if logged in
        if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
            if (window.BroProAuth) {
                BroProAuth.showLoginRequired(`Login to unlock "${data.title}" and all other activities!`);
            } else {
                alert('Please login to access this activity!');
            }
            return;
        }

        // Then check if premium (only for logged in users)
        if (window.BroProPremium && !BroProPremium.isPremium()) {
            BroProPremium.showPremiumRequired(data.title);
            return;
        }
    }

    quizState.mode = mode;
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = [];

    // Check if the chapter has more than 15 questions
    if (data.questions.length > 15) {
        showSetSelection(data);
    } else {
        quizState.questions = shuffleArray([...data.questions]);
        startQuizUI(data);
    }
}

function showSetSelection(data) {
    // Set header titles
    document.getElementById('quizCategory').textContent = data.category;
    document.getElementById('quizTitle').textContent = data.title;

    // Hide quiz elements
    document.querySelector('.quiz-progress').style.display = 'none';
    document.querySelector('.quiz-content').style.display = 'none';
    document.querySelector('.quiz-stats').style.display = 'none';

    // Show set selection
    const setSelectionScreen = document.getElementById('setSelectionScreen');
    setSelectionScreen.style.display = 'flex';

    // Render set cards
    const sets = getSetsForQuestions(data.questions);
    const setsGrid = document.getElementById('setsGrid');
    setsGrid.innerHTML = sets.map((set, i) => `
        <div class="set-card" onclick="startQuizWithSet(${i})">
            <div class="set-card-icon">${data.emoji}</div>
            <div class="set-card-name">${set.name}</div>
            <div class="set-card-count">${set.questions.length} Questions</div>
        </div>
    `).join('');

    // Open modal
    document.getElementById('quizModal').classList.add('active');
}

// Ensure set splitting uses batch size of 15 and adjusts extra questions in last set
function getSetsForQuestions(questions, batchSize = 15) {
    const N = questions.length;
    // If we have less than or equal to batchSize + 5, put all of them in one set to prevent tiny sets
    if (N <= batchSize + 5) {
        return [{ name: 'All Questions', questions: questions }];
    }
    const sets = [];
    const numFullSets = Math.floor(N / batchSize);
    
    // We break into full sets, and the remainder is adjusted into the last set
    for (let i = 0; i < numFullSets; i++) {
        const start = i * batchSize;
        let end = start + batchSize;
        
        // If it's the last set, merge the remaining questions into it
        if (i === numFullSets - 1) {
            end = N;
        }
        
        sets.push({
            name: `Set ${i + 1} (Q${start + 1}-${end})`,
            questions: questions.slice(start, end)
        });
    }
    return sets;
}

function startQuizWithSet(setIndex) {
    const data = scienceData[quizState.mode];
    if (!data) return;

    const sets = getSetsForQuestions(data.questions);
    const selectedSet = sets[setIndex];
    if (!selectedSet) return;

    // Initialize quizState with the selected subset of questions (shuffled)
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = [];
    quizState.questions = shuffleArray([...selectedSet.questions]);

    // Update title to show Set name
    document.getElementById('quizTitle').textContent = `${data.title} - ${selectedSet.name}`;
    document.getElementById('totalQ').textContent = quizState.questions.length;
    document.getElementById('currentQ').textContent = 1;

    // Reset stats display
    document.getElementById('correctStat').textContent = '0';
    document.getElementById('wrongStat').textContent = '0';
    document.getElementById('xpStat').textContent = '0';

    // Hide set selection
    document.getElementById('setSelectionScreen').style.display = 'none';

    // Show quiz elements
    document.querySelector('.quiz-progress').style.display = 'flex';
    document.querySelector('.quiz-content').style.display = 'block';
    document.querySelector('.quiz-stats').style.display = 'flex';

    loadQuestion();
}

function startQuizUI(data) {
    document.getElementById('quizTitle').textContent = data.title;
    document.getElementById('totalQ').textContent = quizState.questions.length;
    document.getElementById('currentQ').textContent = 1;

    // Reset stats display
    document.getElementById('correctStat').textContent = '0';
    document.getElementById('wrongStat').textContent = '0';
    document.getElementById('xpStat').textContent = '0';

    // Hide set selection
    document.getElementById('setSelectionScreen').style.display = 'none';

    // Show quiz elements
    document.querySelector('.quiz-progress').style.display = 'flex';
    document.querySelector('.quiz-content').style.display = 'block';
    document.querySelector('.quiz-stats').style.display = 'flex';

    document.getElementById('quizModal').classList.add('active');

    loadQuestion();
}


function loadPlayerData() {
    // Use global gamification if available
    if (window.BroProPlayer) {
        const profile = BroProPlayer.load();
        document.getElementById('xpCount').textContent = profile.xp;
    }
}

function updateUI() {
    if (window.BroProPlayer) {
        const profile = BroProPlayer.load();
        document.getElementById('xpCount').textContent = profile.xp;
    }
}

// ============================================
// FACTS SLIDER
// ============================================
let currentFact = 0;
const facts = document.querySelectorAll('.fact-item');

function initFactsSlider() {
    setInterval(() => {
        facts[currentFact].classList.remove('active');
        currentFact = (currentFact + 1) % facts.length;
        facts[currentFact].classList.add('active');
    }, 4000);
}


function loadQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    const data = scienceData[quizState.mode];

    document.getElementById('currentQ').textContent = quizState.currentIndex + 1;
    document.getElementById('questionVisual').textContent = data.emoji;
    document.getElementById('questionText').textContent = q.q;

    // Update progress
    const progress = (quizState.currentIndex / quizState.questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Shuffle options for random order each time
    const shuffledOptions = shuffleArray([...q.options]);

    // Generate options
    const container = document.getElementById('optionsContainer');
    container.innerHTML = shuffledOptions.map(opt => `
        <button class="option-btn" onclick="selectOption(this, '${opt.replace(/'/g, "\\'")}')">${opt}</button>
    `).join('');

    // Hide feedback
    document.getElementById('feedbackBox').className = 'feedback-box';
}

function selectOption(btn, answer) {
    const q = quizState.questions[quizState.currentIndex];
    const data = scienceData[quizState.mode];
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

    const feedbackBox = document.getElementById('feedbackBox');

    if (isCorrect) {
        btn.classList.add('correct');
        quizState.correct++;
        quizState.xpEarned += data.xpPerQuestion;

        feedbackBox.className = 'feedback-box visible correct';
        document.getElementById('feedbackEmoji').textContent = '✅';
        document.getElementById('feedbackText').textContent = 'Correct! +' + data.xpPerQuestion + ' XP';

        // Use recordCorrect for streak tracking (plays correct sound + checks for 4-streak)
        if (window.BroProSounds) {
            BroProSounds.recordCorrect();
        }
    } else {
        btn.classList.add('wrong');
        quizState.wrong++;

        feedbackBox.className = 'feedback-box visible wrong';
        document.getElementById('feedbackEmoji').textContent = '❌';
        document.getElementById('feedbackText').textContent = 'The answer was: ' + q.answer;

        // Use recordWrong for streak tracking (resets streak + plays Ayein sound)
        if (window.BroProSounds) {
            BroProSounds.recordWrong();
        }
    }

    // Update stats
    document.getElementById('correctStat').textContent = quizState.correct;
    document.getElementById('wrongStat').textContent = quizState.wrong;
    document.getElementById('xpStat').textContent = quizState.xpEarned;

    // Advance to next question — use inline explanation if available
    const advanceQuiz = () => {
        quizState.currentIndex++;
        // Hide inline explanation if it was shown
        if (window.BroProInlineExp) BroProInlineExp.hide();

        if (quizState.currentIndex >= quizState.questions.length) {
            endQuiz();
        } else {
            loadQuestion();
        }
    };

    if (window.BroProInlineExp) {
        // Show inline explanation card — user clicks "Next" to advance
        BroProInlineExp.show({
            question: q.q,
            answer: answer,
            correctAnswer: q.answer,
            isCorrect: isCorrect,
            options: q.options,
            explanation: q.explanation || null
        }, advanceQuiz);
    } else {
        // Fallback: auto-advance after 1.5s if inline explanation engine not loaded
        setTimeout(advanceQuiz, 1500);
    }
}

function endQuiz() {
    document.getElementById('quizModal').classList.remove('active');

    const total = quizState.questions.length;
    const accuracy = Math.round((quizState.correct / total) * 100);

    // Calculate XP with mastery multiplier
    let finalXP = quizState.xpEarned;
    let xpMessage = null;

    if (window.BroProPlayer) {
        // Get XP multiplier based on mastery status
        const multiplierInfo = BroProPlayer.calculateXPMultiplier('science', quizState.mode, accuracy);
        finalXP = Math.floor(quizState.xpEarned * multiplierInfo.multiplier);
        xpMessage = multiplierInfo.message;

        // Record this quiz completion
        BroProPlayer.recordQuizCompletion('science', quizState.mode, quizState.correct, total);

        // Add the adjusted XP
        BroProPlayer.addXP(finalXP, 'science');
        updateUI();

        console.log(`📊 Science Quiz Complete - Raw XP: ${quizState.xpEarned}, Multiplier: ${multiplierInfo.multiplier}, Final XP: ${finalXP}`);
    }

    // Set results
    document.getElementById('finalCorrect').textContent = quizState.correct;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalXP').textContent = finalXP;

    // Show practice mode indicator if applicable
    const resultsXPElement = document.getElementById('finalXP');
    if (xpMessage && resultsXPElement && finalXP < quizState.xpEarned) {
        resultsXPElement.innerHTML = `${finalXP} <small style="font-size:0.6em;opacity:0.7">(Practice)</small>`;
    }

    // Set title and icon
    const title = accuracy >= 90 ? '🌟 Science Genius!' :
        accuracy >= 70 ? '🎉 Great Job!' :
            accuracy >= 50 ? '👍 Good Effort!' :
                '💪 Keep Learning!';
    document.getElementById('resultsTitle').textContent = title;

    const icon = accuracy >= 90 ? '🏆' :
        accuracy >= 70 ? '🥈' :
            accuracy >= 50 ? '🥉' : '🔬';
    document.getElementById('resultsIcon').textContent = icon;

    document.getElementById('resultsModal').classList.add('active');

    // Store quiz results for explanations
    if (window.BroProExplanations) {
        BroProExplanations.storeQuizResults(quizState.questions, quizState.userAnswers, 'science', quizState.mode);
    }

    // Confetti for good performance
    if (accuracy >= 70 && window.BroProEffects) {
        BroProEffects.confetti();
    }

    // 📢 Log to real-time activity feed (visible to all users)
    if (window.logQuizActivity) {
        logQuizActivity('science', finalXP, accuracy);
    }
}

// Open Explanations after quiz
function openExplanations() {
    // Close results modal first
    document.getElementById('resultsModal').classList.remove('active');

    // Open explanations
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
    openActivity(quizState.mode);
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
// INTERACTIVE LABS
// ============================================

// Lab State
let labState = {
    colors: { slot1: null, slot2: null, name1: '', name2: '' },
    pendulum: { running: false, angle: 45, length: 100, gravity: 9.8, animationId: null },
    circuit: { wire1: false, wire2: false, wire3: false, switchOn: false }
};

// Open Lab Modal
function openLab(lab) {
    if (lab === 'colors') {
        document.getElementById('colorLabModal').classList.add('active');
        resetColorLab();
    } else if (lab === 'pendulum') {
        document.getElementById('pendulumLabModal').classList.add('active');
        resetPendulum();
    } else if (lab === 'circuit') {
        document.getElementById('circuitLabModal').classList.add('active');
        resetCircuit();
    }

    if (window.BroProSounds) {
        BroProSounds.play('click');
    }
}

// Close Lab Modal
function closeLab(lab) {
    if (lab === 'colors') {
        document.getElementById('colorLabModal').classList.remove('active');
    } else if (lab === 'pendulum') {
        document.getElementById('pendulumLabModal').classList.remove('active');
        stopPendulum();
    } else if (lab === 'circuit') {
        document.getElementById('circuitLabModal').classList.remove('active');
    }
}

// ============================================
// COLOR MIXING LAB
// ============================================
const colorMixes = {
    '#ff0000+#0000ff': { color: '#800080', name: 'Purple!' },
    '#0000ff+#ff0000': { color: '#800080', name: 'Purple!' },
    '#ff0000+#ffff00': { color: '#ff8000', name: 'Orange!' },
    '#ffff00+#ff0000': { color: '#ff8000', name: 'Orange!' },
    '#0000ff+#ffff00': { color: '#00ff00', name: 'Green!' },
    '#ffff00+#0000ff': { color: '#00ff00', name: 'Green!' }
};

function selectColor(color, name) {
    if (!labState.colors.slot1) {
        labState.colors.slot1 = color;
        labState.colors.name1 = name;
        document.getElementById('mixSlot1').style.background = color;
        document.getElementById('mixSlot1').textContent = '';
        document.getElementById('mixMessage').textContent = `${name} selected! Pick another color.`;
    } else if (!labState.colors.slot2) {
        labState.colors.slot2 = color;
        labState.colors.name2 = name;
        document.getElementById('mixSlot2').style.background = color;
        document.getElementById('mixSlot2').textContent = '';

        // Mix the colors
        mixColors();
    }

    if (window.BroProSounds) {
        BroProSounds.play('click');
    }
}

function mixColors() {
    const key = labState.colors.slot1 + '+' + labState.colors.slot2;
    const result = colorMixes[key];

    if (result) {
        document.getElementById('mixResult').style.background = result.color;
        document.getElementById('mixResult').textContent = '';
        document.getElementById('mixMessage').textContent = `${labState.colors.name1} + ${labState.colors.name2} = ${result.name}`;

        if (window.BroProSounds) {
            BroProSounds.play('correct');
        }

        // Award XP for successful experiment
        if (window.BroProPlayer) {
            BroProPlayer.addXP(10, 'science');
        }
    } else {
        document.getElementById('mixMessage').textContent = 'Same color! Try different ones.';
        if (window.BroProSounds) {
            BroProSounds.play('wrong');
        }
    }
}

function resetColorLab() {
    labState.colors = { slot1: null, slot2: null, name1: '', name2: '' };
    document.getElementById('mixSlot1').style.background = '';
    document.getElementById('mixSlot1').textContent = '?';
    document.getElementById('mixSlot2').style.background = '';
    document.getElementById('mixSlot2').textContent = '?';
    document.getElementById('mixResult').style.background = '';
    document.getElementById('mixResult').textContent = '?';
    document.getElementById('mixMessage').textContent = 'Select two colors to mix!';
}

// ============================================
// PENDULUM SIMULATOR
// ============================================
function updatePendulum() {
    const length = document.getElementById('lengthSlider').value;
    labState.pendulum.length = parseInt(length);
    document.getElementById('lengthValue').textContent = length;
    drawPendulum(labState.pendulum.angle);
}

function updateGravity() {
    const gravity = document.getElementById('gravitySlider').value;
    labState.pendulum.gravity = parseFloat(gravity);
    document.getElementById('gravityValue').textContent = (gravity / 1).toFixed(1);
}

function drawPendulum(angle) {
    const length = labState.pendulum.length;
    const rad = angle * Math.PI / 180;
    const x = 150 + length * Math.sin(rad);
    const y = 20 + length * Math.cos(rad);

    document.getElementById('pendulumRod').setAttribute('x2', x);
    document.getElementById('pendulumRod').setAttribute('y2', y);
    document.getElementById('pendulumBall').setAttribute('cx', x);
    document.getElementById('pendulumBall').setAttribute('cy', y);
}

function togglePendulum() {
    if (labState.pendulum.running) {
        stopPendulum();
    } else {
        startPendulum();
    }
}

function startPendulum() {
    labState.pendulum.running = true;
    labState.pendulum.angle = 45;
    document.getElementById('pendulumBtn').textContent = '⏸️ Stop';

    let velocity = 0;
    const damping = 0.995;

    function animate() {
        if (!labState.pendulum.running) return;

        const g = labState.pendulum.gravity;
        const L = labState.pendulum.length / 100;
        const angleRad = labState.pendulum.angle * Math.PI / 180;

        const acceleration = (-g / L) * Math.sin(angleRad);
        velocity += acceleration * 0.016;
        velocity *= damping;
        labState.pendulum.angle += velocity * 180 / Math.PI * 0.5;

        drawPendulum(labState.pendulum.angle);
        labState.pendulum.animationId = requestAnimationFrame(animate);
    }

    animate();

    if (window.BroProSounds) {
        BroProSounds.play('click');
    }
}

function stopPendulum() {
    labState.pendulum.running = false;
    document.getElementById('pendulumBtn').textContent = '▶️ Start';
    if (labState.pendulum.animationId) {
        cancelAnimationFrame(labState.pendulum.animationId);
    }
}

function resetPendulum() {
    stopPendulum();
    labState.pendulum.angle = 0;
    labState.pendulum.length = 100;
    labState.pendulum.gravity = 9.8;
    document.getElementById('lengthSlider').value = 100;
    document.getElementById('gravitySlider').value = 10;
    document.getElementById('lengthValue').textContent = '100';
    document.getElementById('gravityValue').textContent = '9.8';
    drawPendulum(0);
}

// ============================================
// CIRCUIT BUILDER
// ============================================
function toggleWire(wireId) {
    labState.circuit[wireId] = !labState.circuit[wireId];
    document.getElementById(wireId).classList.toggle('connected', labState.circuit[wireId]);

    if (window.BroProSounds) {
        BroProSounds.play('click');
    }

    checkCircuit();
}

function toggleSwitch() {
    labState.circuit.switchOn = !labState.circuit.switchOn;
    document.getElementById('switch1').textContent = labState.circuit.switchOn ? '🔛' : '🔘';

    if (window.BroProSounds) {
        BroProSounds.play('click');
    }

    checkCircuit();
}

function checkCircuit() {
    const allWiresConnected = labState.circuit.wire1 && labState.circuit.wire2 && labState.circuit.wire3;
    const circuitComplete = allWiresConnected && labState.circuit.switchOn;

    const status = document.getElementById('circuitStatus');
    const bulb = document.getElementById('bulb');

    if (circuitComplete) {
        status.textContent = '⚡ Circuit COMPLETE - Bulb is ON!';
        status.classList.add('complete');
        bulb.textContent = '💡';
        bulb.classList.add('lit');

        if (window.BroProSounds) {
            BroProSounds.play('correct');
        }

        // Award XP for completing circuit
        if (window.BroProPlayer) {
            BroProPlayer.addXP(15, 'science');
        }
    } else {
        status.textContent = allWiresConnected ? 'Wires connected! Turn ON the switch.' : 'Circuit is OPEN - Click wires to connect!';
        status.classList.remove('complete');
        bulb.textContent = '💡';
        bulb.classList.remove('lit');
    }
}

function resetCircuit() {
    labState.circuit = { wire1: false, wire2: false, wire3: false, switchOn: false };
    document.querySelectorAll('.wire').forEach(w => w.classList.remove('connected'));
    document.getElementById('switch1').textContent = '🔘';
    document.getElementById('bulb').classList.remove('lit');
    document.getElementById('circuitStatus').textContent = 'Circuit is OPEN - Click wires to connect!';
    document.getElementById('circuitStatus').classList.remove('complete');
}

// ============================================
// LEADERBOARD
// ============================================
let currentSciencePeriod = 'alltime';

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

function switchTab(period) {
    currentSciencePeriod = period;

    // Update tab buttons with premium styles
    const tabs = document.querySelectorAll('#scienceLeaderboardTabs .tab-btn');
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
        BroProLeaderboard.renderLeaderboard('leaderboardList', 'science', {
            showDelete: false,
            limit: 20,
            period: period
        });

        // Also update your rank separately
        BroProLeaderboard.getUserRank('science').then(rankInfo => {
            document.getElementById('yourPosition').textContent = rankInfo.rank;
            document.getElementById('yourScore').textContent = rankInfo.xp.toLocaleString();
        });

    } else {
        // Fallback to localStorage
        const leaderboard = JSON.parse(localStorage.getItem('supersite-leaderboard-science') || '[]');
        leaderboard.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        if (leaderboard.length === 0) {
            list.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No players yet. Start playing to be #1!</p>';
        } else {
            list.innerHTML = leaderboard.slice(0, 10).map((player, i) => `
                <div class="leaderboard-item ${i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : ''} ${player.name === currentPlayer ? 'is-player' : ''}">
                    <span class="rank-number">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</span>
                    <span class="player-avatar">${player.avatar || '🧪'}</span>
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
// MILK CURDLING SIMULATION
// ============================================

// Premium Toast Notification System for Milk Simulation
function showMilkToast(message, type = 'info') {
    // Remove any existing toast
    const existingToast = document.querySelector('.milk-toast');
    if (existingToast) existingToast.remove();

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `milk-toast milk-toast-${type}`;

    // Set icon based on type
    const icons = {
        success: '✅',
        warning: '⚠️',
        error: '❌',
        info: 'ℹ️'
    };

    toast.innerHTML = `
        <div class="milk-toast-icon">${icons[type] || icons.info}</div>
        <div class="milk-toast-message">${message}</div>
        <button class="milk-toast-close" onclick="this.parentElement.remove()">×</button>
    `;

    // Add to the milk modal container
    const container = document.querySelector('.milk-curdling-container');
    if (container) {
        container.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);

        // Play sound
        if (window.BroProSounds) {
            BroProSounds.play(type === 'success' ? 'correct' : type === 'error' ? 'wrong' : 'click');
        }
    }
}

// Language Toggle State
let milkLanguage = 'en'; // Default to English ('hi' = Hindi, 'en' = English)

// Toggle Language Function
function toggleMilkLanguage() {
    const toggle = document.getElementById('milkLangToggle');

    // Toggle the language
    milkLanguage = milkLanguage === 'hi' ? 'en' : 'hi';

    // Update toggle appearance
    toggle.classList.toggle('english', milkLanguage === 'en');

    // Update all translatable elements
    const container = document.querySelector('.milk-curdling-container');
    if (container) {
        const elements = container.querySelectorAll('[data-en][data-hi]');

        elements.forEach(el => {
            const text = el.getAttribute(`data-${milkLanguage}`);
            if (text) {
                // Check if text contains HTML (like <strong>, <br>, etc.)
                if (text.includes('&lt;') || text.includes('<')) {
                    // Decode HTML entities and set as innerHTML
                    const decoded = text
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&amp;/g, '&');
                    el.innerHTML = decoded;
                } else {
                    el.textContent = text;
                }
            }
        });
    }

    // Show toast notification
    const langName = milkLanguage === 'hi' ? 'हिंदी' : 'English';
    showMilkToast(`🌐 Language changed to ${langName}`, 'success');

    // Play sound
    if (window.BroProSounds) {
        BroProSounds.play('click');
    }
}

// Make it globally available
window.toggleMilkLanguage = toggleMilkLanguage;

// Milk Curdling Configuration
const MILK_CONFIG = {
    caseinCount: 20,
    acidIonCount: 0,
    maxAcidIons: 35,
    caseinRadius: 16,
    acidRadius: 7,
    repelForce: 700,
    attractForce: 180,
    friction: 0.95,
    brownianMotion: 0.3,
    simulationSpeed: 1,
    temperature: 25,
    pH: 6.8,
    targetPH: 6.8
};

// Milk Curdling State
let milkState = {
    isRunning: false,
    currentStage: 1,
    selectedAcid: null,
    caseinParticles: [],
    acidIons: [],
    curds: [],
    animationId: null,
    lastTime: 0,
    acidInterval: null,
    initialized: false
};

// Milk Curdling Canvas
let milkCanvas = null;
let milkCtx = null;

// Particle Class for Milk Simulation
class MilkParticle {
    constructor(x, y, radius, type) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.type = type;
        this.charge = type === 'casein' ? -1 : 1;
        this.neutralized = false;
        this.clumped = false;
        this.clumpTarget = null;
        this.glow = 0;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update(deltaTime) {
        const brownianScale = MILK_CONFIG.brownianMotion * (MILK_CONFIG.temperature / 25);
        this.vx += (Math.random() - 0.5) * brownianScale;
        this.vy += (Math.random() - 0.5) * brownianScale;

        this.vx *= MILK_CONFIG.friction;
        this.vy *= MILK_CONFIG.friction;

        this.x += this.vx * MILK_CONFIG.simulationSpeed;
        this.y += this.vy * MILK_CONFIG.simulationSpeed;

        if (this.x - this.radius < 0) { this.x = this.radius; this.vx *= -0.5; }
        if (this.x + this.radius > milkCanvas.width) { this.x = milkCanvas.width - this.radius; this.vx *= -0.5; }
        if (this.y - this.radius < 0) { this.y = this.radius; this.vy *= -0.5; }
        if (this.y + this.radius > milkCanvas.height) { this.y = milkCanvas.height - this.radius; this.vy *= -0.5; }

        this.pulsePhase += 0.05 * MILK_CONFIG.simulationSpeed;
    }

    draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.1 + 1;
        const drawRadius = this.radius * pulse;

        milkCtx.save();

        if (this.type === 'casein') {
            const gradient = milkCtx.createRadialGradient(
                this.x - drawRadius * 0.3, this.y - drawRadius * 0.3, 0,
                this.x, this.y, drawRadius
            );

            if (this.neutralized) {
                gradient.addColorStop(0, '#c4b5fd');
                gradient.addColorStop(0.7, '#a78bfa');
                gradient.addColorStop(1, '#8b5cf6');
            } else {
                gradient.addColorStop(0, '#93c5fd');
                gradient.addColorStop(0.7, '#4a90d9');
                gradient.addColorStop(1, '#2563eb');
            }

            if (this.glow > 0) {
                milkCtx.shadowColor = this.neutralized ? '#a78bfa' : '#4a90d9';
                milkCtx.shadowBlur = 20 * this.glow;
            }

            milkCtx.beginPath();
            milkCtx.arc(this.x, this.y, drawRadius, 0, Math.PI * 2);
            milkCtx.fillStyle = gradient;
            milkCtx.fill();

            if (!this.clumped) {
                milkCtx.fillStyle = 'white';
                milkCtx.font = `bold ${Math.floor(drawRadius * 0.8)}px Arial`;
                milkCtx.textAlign = 'center';
                milkCtx.textBaseline = 'middle';
                milkCtx.fillText(this.neutralized ? '0' : '−', this.x, this.y);
            }

        } else if (this.type === 'acid') {
            const gradient = milkCtx.createRadialGradient(
                this.x - drawRadius * 0.3, this.y - drawRadius * 0.3, 0,
                this.x, this.y, drawRadius
            );
            gradient.addColorStop(0, '#86efac');
            gradient.addColorStop(0.7, '#4ade80');
            gradient.addColorStop(1, '#22c55e');

            milkCtx.shadowColor = '#4ade80';
            milkCtx.shadowBlur = 15;

            milkCtx.beginPath();
            milkCtx.arc(this.x, this.y, drawRadius, 0, Math.PI * 2);
            milkCtx.fillStyle = gradient;
            milkCtx.fill();

            milkCtx.fillStyle = 'white';
            milkCtx.font = `bold ${Math.floor(drawRadius * 1.2)}px Arial`;
            milkCtx.textAlign = 'center';
            milkCtx.textBaseline = 'middle';
            milkCtx.fillText('+', this.x, this.y + 1);
        }

        milkCtx.restore();
    }
}

// Curd Class
class MilkCurd {
    constructor(particles) {
        this.particles = particles;
        this.x = 0;
        this.y = 0;
        this.calculateCenter();
        this.radius = Math.sqrt(particles.length) * MILK_CONFIG.caseinRadius * 1.2;
        this.vy = 0;
        this.settled = false;
    }

    calculateCenter() {
        let sumX = 0, sumY = 0;
        this.particles.forEach(p => { sumX += p.x; sumY += p.y; });
        this.x = sumX / this.particles.length;
        this.y = sumY / this.particles.length;
    }

    update() {
        if (!this.settled) {
            this.vy += 0.1 * MILK_CONFIG.simulationSpeed;
            this.vy *= 0.98;
            this.y += this.vy;

            const settleY = milkCanvas.height * 0.75;
            if (this.y > settleY) {
                this.y = settleY;
                this.vy = 0;
                this.settled = true;
            }

            this.particles.forEach(p => {
                const angle = Math.atan2(p.y - this.y, p.x - this.x);
                const dist = Math.min(this.radius * 0.8, Math.sqrt((p.x - this.x) ** 2 + (p.y - this.y) ** 2));
                p.x = this.x + Math.cos(angle) * dist * 0.5;
                p.y = this.y + Math.sin(angle) * dist * 0.5;
            });
        }
    }

    draw() {
        milkCtx.save();

        const gradient = milkCtx.createRadialGradient(
            this.x - this.radius * 0.2, this.y - this.radius * 0.2, 0,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, '#fef3c7');
        gradient.addColorStop(0.5, '#fcd34d');
        gradient.addColorStop(1, '#f59e0b');

        milkCtx.shadowColor = 'rgba(252, 211, 77, 0.5)';
        milkCtx.shadowBlur = 20;

        milkCtx.beginPath();
        const points = 8;
        for (let i = 0; i <= points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const wobble = Math.sin(angle * 3 + Date.now() / 500) * 0.1 + 1;
            const r = this.radius * wobble;
            const x = this.x + Math.cos(angle) * r;
            const y = this.y + Math.sin(angle) * r;
            if (i === 0) milkCtx.moveTo(x, y);
            else milkCtx.lineTo(x, y);
        }
        milkCtx.closePath();
        milkCtx.fillStyle = gradient;
        milkCtx.fill();

        milkCtx.restore();
    }
}

// Initialize Milk Simulation
function initMilkSimulation() {
    milkCanvas = document.getElementById('milkSimulationCanvas');
    if (!milkCanvas) return;

    milkCtx = milkCanvas.getContext('2d');
    resizeMilkCanvas();

    milkState.caseinParticles = [];
    milkState.acidIons = [];
    milkState.curds = [];

    for (let i = 0; i < MILK_CONFIG.caseinCount; i++) {
        const x = MILK_CONFIG.caseinRadius + Math.random() * (milkCanvas.width - 2 * MILK_CONFIG.caseinRadius);
        const y = MILK_CONFIG.caseinRadius + Math.random() * (milkCanvas.height - 2 * MILK_CONFIG.caseinRadius);
        milkState.caseinParticles.push(new MilkParticle(x, y, MILK_CONFIG.caseinRadius, 'casein'));
    }

    MILK_CONFIG.pH = 6.8;
    MILK_CONFIG.targetPH = 6.8;
    updateMilkPHDisplay();
    milkState.initialized = true;
}

function resizeMilkCanvas() {
    if (!milkCanvas) return;
    const container = milkCanvas.parentElement;
    milkCanvas.width = container.clientWidth;
    milkCanvas.height = container.clientHeight;
}

// Apply Forces
function applyMilkForces() {
    const particles = [...milkState.caseinParticles, ...milkState.acidIons];

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = p1.radius + p2.radius;

            if (dist < minDist * 4) {
                const nx = dx / dist;
                const ny = dy / dist;

                let force = 0;

                if (p1.type === 'casein' && p2.type === 'casein') {
                    if (!p1.neutralized && !p2.neutralized) {
                        force = -MILK_CONFIG.repelForce / (dist * dist);
                    } else if (p1.neutralized && p2.neutralized) {
                        force = MILK_CONFIG.attractForce / (dist * dist);
                    }
                } else if (p1.type === 'acid' && p2.type === 'casein' && !p2.neutralized) {
                    force = MILK_CONFIG.attractForce * 2 / (dist * dist);
                    if (dist < minDist * 1.5) {
                        p2.neutralized = true;
                        p2.glow = 1;
                        const idx = milkState.acidIons.indexOf(p1);
                        if (idx > -1) milkState.acidIons.splice(idx, 1);
                    }
                } else if (p1.type === 'casein' && p2.type === 'acid' && !p1.neutralized) {
                    force = MILK_CONFIG.attractForce * 2 / (dist * dist);
                    if (dist < minDist * 1.5) {
                        p1.neutralized = true;
                        p1.glow = 1;
                        const idx = milkState.acidIons.indexOf(p2);
                        if (idx > -1) milkState.acidIons.splice(idx, 1);
                    }
                }

                const fx = force * nx * 0.01;
                const fy = force * ny * 0.01;

                p1.vx -= fx;
                p1.vy -= fy;
                p2.vx += fx;
                p2.vy += fy;

                if (dist < minDist) {
                    const overlap = minDist - dist;
                    p1.x -= nx * overlap * 0.5;
                    p1.y -= ny * overlap * 0.5;
                    p2.x += nx * overlap * 0.5;
                    p2.y += ny * overlap * 0.5;
                }
            }
        }
    }
}

function checkMilkClumping() {
    const neutralized = milkState.caseinParticles.filter(p => p.neutralized && !p.clumped);

    if (neutralized.length >= 3) {
        const visited = new Set();

        for (const particle of neutralized) {
            if (visited.has(particle)) continue;

            const cluster = [particle];
            visited.add(particle);

            for (const other of neutralized) {
                if (visited.has(other)) continue;

                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MILK_CONFIG.caseinRadius * 4) {
                    cluster.push(other);
                    visited.add(other);
                }
            }

            if (cluster.length >= 3) {
                cluster.forEach(p => p.clumped = true);
                milkState.curds.push(new MilkCurd(cluster));
            }
        }
    }
}

// Animation Loop
function animateMilk(currentTime) {
    if (!milkCanvas || !milkCtx) {
        milkState.animationId = requestAnimationFrame(animateMilk);
        return;
    }

    const deltaTime = currentTime - milkState.lastTime;
    milkState.lastTime = currentTime;

    milkCtx.clearRect(0, 0, milkCanvas.width, milkCanvas.height);

    if (milkState.isRunning) {
        if (MILK_CONFIG.pH !== MILK_CONFIG.targetPH) {
            const diff = MILK_CONFIG.targetPH - MILK_CONFIG.pH;
            MILK_CONFIG.pH += diff * 0.02;
            if (Math.abs(diff) < 0.01) MILK_CONFIG.pH = MILK_CONFIG.targetPH;
            updateMilkPHDisplay();
        }

        applyMilkForces();

        milkState.caseinParticles.forEach(p => {
            if (!p.clumped) p.update(deltaTime);
            if (p.glow > 0) p.glow -= 0.02;
        });

        milkState.acidIons.forEach(p => p.update(deltaTime));

        if (milkState.currentStage >= 3) {
            checkMilkClumping();
        }

        milkState.curds.forEach(c => c.update());

        updateMilkStage();
    }

    milkState.curds.forEach(c => c.draw());
    milkState.caseinParticles.forEach(p => { if (!p.clumped) p.draw(); });
    milkState.acidIons.forEach(p => p.draw());

    milkState.animationId = requestAnimationFrame(animateMilk);
}

// Inject Acid
function injectMilkAcid() {
    if (milkState.acidIons.length >= MILK_CONFIG.maxAcidIons) return;

    const count = MILK_CONFIG.temperature > 50 ? 3 : 2;

    for (let i = 0; i < count; i++) {
        const x = Math.random() * milkCanvas.width;
        const y = -MILK_CONFIG.acidRadius;
        const acid = new MilkParticle(x, y, MILK_CONFIG.acidRadius, 'acid');
        acid.vy = 2 + Math.random() * 2;
        milkState.acidIons.push(acid);
    }

    const pHDrop = milkState.selectedAcid === 'bacteria' ? 0.15 : 0.25;
    MILK_CONFIG.targetPH = Math.max(3.5, MILK_CONFIG.targetPH - pHDrop);
}

// Update pH Display
function updateMilkPHDisplay() {
    const phValue = document.getElementById('milkPhValue');
    const phIndicator = document.getElementById('milkPhIndicator');
    if (!phValue || !phIndicator) return;

    phValue.textContent = MILK_CONFIG.pH.toFixed(1);
    const position = (MILK_CONFIG.pH / 14) * 100;
    phIndicator.style.left = `${position}%`;
}

// Stage Management
function updateMilkStage() {
    const neutralizedCount = milkState.caseinParticles.filter(p => p.neutralized).length;
    const neutralizedRatio = neutralizedCount / milkState.caseinParticles.length;

    let newStage = 1;

    if (milkState.acidIons.length > 0 || neutralizedCount > 0) {
        newStage = 2;
    }

    if (neutralizedRatio > 0.3) {
        newStage = 3;
        const container = document.getElementById('milkContainerInner');
        if (container) container.classList.add('curdling');
    }

    if (milkState.curds.length > 0 && milkState.curds.every(c => c.settled)) {
        newStage = 4;
        const wheyLayer = document.getElementById('milkWheyLayer');
        if (wheyLayer) wheyLayer.classList.add('visible');
    }

    if (newStage !== milkState.currentStage) {
        milkState.currentStage = newStage;
        updateMilkStageIndicator();
        updateMilkInfoCards();
    }
}

function updateMilkStageIndicator() {
    document.querySelectorAll('.milk-stage').forEach((el, idx) => {
        const stageNum = idx + 1;
        el.classList.remove('active', 'completed');

        if (stageNum < milkState.currentStage) {
            el.classList.add('completed');
        } else if (stageNum === milkState.currentStage) {
            el.classList.add('active');
        }
    });
}

function updateMilkInfoCards() {
    document.querySelectorAll('.milk-info-card').forEach(card => {
        const cardStage = parseInt(card.dataset.stage);
        card.classList.toggle('active', cardStage === milkState.currentStage);
    });
}

// Setup Milk Controls
function setupMilkControls() {
    // Acid buttons
    document.querySelectorAll('.milk-acid-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.milk-acid-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            milkState.selectedAcid = btn.dataset.acid;
            if (window.BroProSounds) BroProSounds.play('click');
        });
    });

    // Temperature slider
    const tempSlider = document.getElementById('milkTempSlider');
    const tempValue = document.getElementById('milkTempValue');
    if (tempSlider && tempValue) {
        tempSlider.addEventListener('input', () => {
            MILK_CONFIG.temperature = parseInt(tempSlider.value);
            tempValue.textContent = `${MILK_CONFIG.temperature}°C`;
        });
    }

    // Speed slider
    const speedSlider = document.getElementById('milkSpeedSlider');
    if (speedSlider) {
        speedSlider.addEventListener('input', () => {
            MILK_CONFIG.simulationSpeed = parseInt(speedSlider.value) * 0.5;
        });
    }

    // Start button
    const startBtn = document.getElementById('milkStartBtn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (!milkState.selectedAcid) {
                showMilkToast('🧪 Please select an acid source first!', 'warning');
                // Highlight the acid buttons with a pulse animation
                document.querySelectorAll('.milk-acid-btn').forEach(btn => {
                    btn.classList.add('highlight-pulse');
                    setTimeout(() => btn.classList.remove('highlight-pulse'), 1500);
                });
                return;
            }

            milkState.isRunning = true;
            startBtn.innerHTML = '<span class="milk-btn-icon">⏸</span> Pause';

            if (!milkState.acidInterval) {
                const interval = milkState.selectedAcid === 'bacteria' ? 800 : 400;
                milkState.acidInterval = setInterval(injectMilkAcid, interval / MILK_CONFIG.simulationSpeed);

                setTimeout(() => {
                    clearInterval(milkState.acidInterval);
                    milkState.acidInterval = null;
                }, 8000);
            }

            if (window.BroProSounds) BroProSounds.play('click');
        });
    }

    // Reset button
    const resetBtn = document.getElementById('milkResetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetMilkSimulation);
    }
}

function resetMilkSimulation() {
    milkState.isRunning = false;
    milkState.currentStage = 1;
    milkState.selectedAcid = null;

    if (milkState.acidInterval) {
        clearInterval(milkState.acidInterval);
        milkState.acidInterval = null;
    }

    document.querySelectorAll('.milk-acid-btn').forEach(b => b.classList.remove('active'));

    const startBtn = document.getElementById('milkStartBtn');
    if (startBtn) startBtn.innerHTML = '<span class="milk-btn-icon">▶</span> Start Simulation';

    const container = document.getElementById('milkContainerInner');
    if (container) container.classList.remove('curdling');

    const wheyLayer = document.getElementById('milkWheyLayer');
    if (wheyLayer) wheyLayer.classList.remove('visible');

    MILK_CONFIG.targetPH = 6.8;
    MILK_CONFIG.pH = 6.8;

    initMilkSimulation();
    updateMilkStageIndicator();
    updateMilkInfoCards();

    if (window.BroProSounds) BroProSounds.play('click');
}

// Section Navigation
function switchMilkSection(section) {
    document.querySelectorAll('.milk-nav-pill').forEach(p => {
        p.classList.toggle('active', p.dataset.section === section);
    });

    document.getElementById('milkSimulationSection').classList.toggle('hidden', section !== 'simulation');
    document.getElementById('milkLearnSection').classList.toggle('hidden', section !== 'learn');
    document.getElementById('milkQuizSection').classList.toggle('hidden', section !== 'quiz');

    if (section === 'quiz') {
        renderMilkQuizQuestion();
    }

    if (window.BroProSounds) BroProSounds.play('click');
}

// Milk Quiz System
const milkQuizQuestions = [
    {
        question: "What is the main protein in milk that causes curdling? (दूध में मुख्य प्रोटीन कौन सा है जो दही बनाता है?)",
        options: ["Whey (व्हे)", "Casein (केसीन)", "Albumin (एल्ब्यूमिन)", "Collagen (कोलेजन)"],
        correct: 1
    },
    {
        question: "What type of electric charge do casein proteins have? (केसीन प्रोटीन में किस प्रकार का विद्युत आवेश होता है?)",
        options: ["Positive (धनात्मक)", "Negative (ऋणात्मक)", "Neutral (उदासीन)", "Variable (परिवर्तनशील)"],
        correct: 1
    },
    {
        question: "What do acid molecules release that neutralizes casein? (अम्ल अणु क्या छोड़ते हैं जो केसीन को उदासीन करता है?)",
        options: ["Electrons (इलेक्ट्रॉन)", "Neutrons (न्यूट्रॉन)", "Hydrogen ions H⁺ (हाइड्रोजन आयन H⁺)", "Oxygen atoms (ऑक्सीजन परमाणु)"],
        correct: 2
    },
    {
        question: "Why do casein proteins stay separated in fresh milk? (ताजे दूध में केसीन प्रोटीन अलग-अलग क्यों रहते हैं?)",
        options: ["They are too heavy (वे बहुत भारी हैं)", "Their negative charges repel each other (उनके ऋणात्मक आवेश एक दूसरे को दूर करते हैं)", "They are dissolved in fat (वे वसा में घुले हुए हैं)", "They are frozen (वे जमे हुए हैं)"],
        correct: 1
    },
    {
        question: "What is the liquid that separates from curds called? (दही से अलग होने वाले तरल को क्या कहते हैं?)",
        options: ["Cream (क्रीम)", "Whey (व्हे/पनीर का पानी)", "Buttermilk (छाछ)", "Skim milk (स्किम दूध)"],
        correct: 1
    },
    {
        question: "At what pH does casein curdle most effectively? (किस pH पर केसीन सबसे प्रभावी रूप से जमता है?)",
        options: ["pH 7.0", "pH 4.6", "pH 10.0", "pH 2.0"],
        correct: 1
    },
    {
        question: "What is the isoelectric point? (आइसोइलेक्ट्रिक बिंदु क्या है?)",
        options: ["Point of maximum charge (अधिकतम आवेश का बिंदु)", "Point of zero net charge (शून्य कुल आवेश का बिंदु)", "Point of highest pH (उच्चतम pH का बिंदु)", "Point of lowest temperature (न्यूनतम तापमान का बिंदु)"],
        correct: 1
    },
    {
        question: "Which bacteria is used to make yogurt? (दही बनाने के लिए कौन सा बैक्टीरिया उपयोग किया जाता है?)",
        options: ["E. coli (ई. कोली)", "Lactobacillus (लैक्टोबैसिलस)", "Salmonella (साल्मोनेला)", "Streptococcus (स्ट्रेप्टोकोकस)"],
        correct: 1
    },
    {
        question: "What is the solid part formed after curdling called? (दही बनने के बाद बने ठोस भाग को क्या कहते हैं?)",
        options: ["Whey (व्हे)", "Curds (दही/पनीर)", "Cream (क्रीम)", "Butter (मक्खन)"],
        correct: 1
    },
    {
        question: "Higher temperature causes milk to curdle? (उच्च तापमान से दूध का जमना?)",
        options: ["Slower (धीमा होता है)", "Faster (तेज होता है)", "Has no effect (कोई प्रभाव नहीं)", "Stops completely (पूरी तरह रुक जाता है)"],
        correct: 1
    }
];

let milkQuizState = {
    currentQuestion: 0,
    score: 0,
    answered: false
};

function renderMilkQuizQuestion() {
    const q = milkQuizQuestions[milkQuizState.currentQuestion];

    const questionNumber = document.getElementById('milkQuestionNumber');
    const questionText = document.getElementById('milkQuestionText');
    const progressText = document.getElementById('milkQuizProgressText');
    const progressFill = document.getElementById('milkQuizProgress');
    const container = document.getElementById('milkOptionsContainer');

    if (!questionNumber || !questionText || !container) return;

    questionNumber.textContent = `Q${milkQuizState.currentQuestion + 1}`;
    questionText.textContent = q.question;
    if (progressText) progressText.textContent = `Question ${milkQuizState.currentQuestion + 1} of ${milkQuizQuestions.length} | प्रश्न ${milkQuizState.currentQuestion + 1} / ${milkQuizQuestions.length}`;
    if (progressFill) progressFill.style.width = `${((milkQuizState.currentQuestion + 1) / milkQuizQuestions.length) * 100}%`;

    const letters = ['A', 'B', 'C', 'D'];
    container.innerHTML = q.options.map((option, idx) => `
        <button class="milk-option-btn" onclick="selectMilkAnswer(${idx})">
            <span class="milk-option-letter">${letters[idx]}</span>
            <span>${option}</span>
        </button>
    `).join('');

    milkQuizState.answered = false;
}

function selectMilkAnswer(idx) {
    if (milkQuizState.answered) return;
    milkQuizState.answered = true;

    const q = milkQuizQuestions[milkQuizState.currentQuestion];
    const buttons = document.querySelectorAll('.milk-option-btn');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) {
            btn.classList.add('correct');
        } else if (i === idx) {
            btn.classList.add('incorrect');
        }
    });

    if (idx === q.correct) {
        milkQuizState.score++;
        if (window.BroProSounds) BroProSounds.play('correct');
    } else {
        if (window.BroProSounds) BroProSounds.play('wrong');
    }

    setTimeout(() => {
        milkQuizState.currentQuestion++;
        if (milkQuizState.currentQuestion < milkQuizQuestions.length) {
            renderMilkQuizQuestion();
        } else {
            showMilkQuizResult();
        }
    }, 1500);
}

function showMilkQuizResult() {
    const quizCard = document.getElementById('milkQuizCard');
    const quizResult = document.getElementById('milkQuizResult');
    const finalScore = document.getElementById('milkFinalScore');

    if (quizCard) quizCard.classList.add('hidden');
    if (quizResult) quizResult.classList.remove('hidden');
    if (finalScore) finalScore.textContent = milkQuizState.score;

    // Award XP for completing the quiz
    if (window.BroProPlayer) {
        const xpEarned = milkQuizState.score * 10;
        BroProPlayer.addXP(xpEarned, 'science');
    }

    if (milkQuizState.score >= 4 && window.BroProEffects) {
        BroProEffects.confetti();
    }
}

function resetMilkQuiz() {
    milkQuizState = { currentQuestion: 0, score: 0, answered: false };
    const quizCard = document.getElementById('milkQuizCard');
    const quizResult = document.getElementById('milkQuizResult');
    if (quizCard) quizCard.classList.remove('hidden');
    if (quizResult) quizResult.classList.add('hidden');
    renderMilkQuizQuestion();
}

// Update openLab to handle milk curdling
const originalOpenLab = openLab;
openLab = function (lab) {
    if (lab === 'milkCurdling') {
        document.getElementById('milkCurdlingLabModal').classList.add('active');

        if (!milkState.initialized) {
            setTimeout(() => {
                initMilkSimulation();
                setupMilkControls();
                updateMilkStageIndicator();
                updateMilkInfoCards();

                // Setup retry button
                const retryBtn = document.getElementById('milkRetryQuizBtn');
                if (retryBtn) {
                    retryBtn.addEventListener('click', resetMilkQuiz);
                }

                // Start animation loop
                if (!milkState.animationId) {
                    animateMilk(0);
                }
            }, 100);
        } else {
            if (!milkState.animationId) {
                animateMilk(0);
            }
        }

        if (window.BroProSounds) BroProSounds.play('click');
    } else {
        originalOpenLab(lab);
    }
};

// Update closeLab to handle milk curdling
const originalCloseLab = closeLab;
closeLab = function (lab) {
    if (lab === 'milkCurdling') {
        document.getElementById('milkCurdlingLabModal').classList.remove('active');

        // Reset to simulation view
        switchMilkSection('simulation');
    } else {
        originalCloseLab(lab);
    }
};

// Make switchMilkSection globally available
window.switchMilkSection = switchMilkSection;
window.selectMilkAnswer = selectMilkAnswer;

// ============================================
// BALLOON ELECTRICITY LAB INTEGRATION
// ============================================

// Update openLab to handle balloon electricity
const milkOpenLab = openLab;
openLab = function (lab) {
    if (lab === 'balloonElectricity') {
        const modal = document.getElementById('balloonElectricityLab');
        const iframe = document.getElementById('balloonElectricityFrame');

        modal.classList.add('active');

        // Load the simulation - always set src if not already pointing to the simulation
        if (!iframe.src.includes('balloon-electricity-simulation')) {
            iframe.src = '/balloon-electricity-simulation/index.html';
        }

        if (window.BroProSounds) BroProSounds.play('click');
    } else {
        milkOpenLab(lab);
    }
};

// Update closeLab to handle balloon electricity
const milkCloseLab = closeLab;
closeLab = function (lab) {
    if (lab === 'balloonElectricity') {
        const modal = document.getElementById('balloonElectricityLab');
        modal.classList.remove('active');
    } else {
        milkCloseLab(lab);
    }
};
