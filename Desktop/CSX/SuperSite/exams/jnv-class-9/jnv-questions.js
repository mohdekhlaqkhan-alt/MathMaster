// ============================================
// JNV CLASS 9 QUESTIONS DATABASE
// Previous Year Papers & Subject-wise Questions
// ============================================

const JNV_QUESTIONS = {
    // ============================================
    // ENGLISH QUESTIONS
    // ============================================
    english: [
        {
            question: "Choose the correct form of the verb: She _____ to school every day.",
            options: ["go", "goes", "going", "gone"],
            correct: 1,
            explanation: "'Goes' is used with third person singular (he/she/it) in simple present tense."
        },
        {
            question: "Select the synonym of 'Beautiful':",
            options: ["Ugly", "Pretty", "Dull", "Boring"],
            correct: 1,
            explanation: "'Pretty' and 'Beautiful' both mean attractive or pleasing to look at."
        },
        {
            question: "Choose the antonym of 'Happy':",
            options: ["Joyful", "Glad", "Sad", "Cheerful"],
            correct: 2,
            explanation: "'Sad' is the opposite of 'Happy'. All other options are synonyms."
        },
        {
            question: "Fill in the blank with the correct article: _____ apple a day keeps the doctor away.",
            options: ["A", "An", "The", "No article"],
            correct: 1,
            explanation: "'An' is used before words starting with a vowel sound. 'Apple' starts with 'a'."
        },
        {
            question: "Identify the noun in the sentence: 'The cat sat on the mat.'",
            options: ["sat", "on", "cat", "the"],
            correct: 2,
            explanation: "'Cat' and 'mat' are nouns (naming words). 'Cat' is the subject noun."
        },
        {
            question: "Change to passive voice: 'Ram writes a letter.'",
            options: ["A letter is written by Ram.", "A letter was written by Ram.", "A letter is being written by Ram.", "A letter has been written by Ram."],
            correct: 0,
            explanation: "In passive voice, the object becomes subject. Simple present active → is/am/are + past participle."
        },
        {
            question: "Choose the correct preposition: The book is _____ the table.",
            options: ["in", "on", "at", "under"],
            correct: 1,
            explanation: "'On' is used when something is placed on a surface."
        },
        {
            question: "Select the plural form of 'Child':",
            options: ["Childs", "Childrens", "Children", "Childes"],
            correct: 2,
            explanation: "'Child' has an irregular plural form - 'Children'."
        },
        {
            question: "Identify the adjective: 'The beautiful flower is in the garden.'",
            options: ["flower", "garden", "beautiful", "the"],
            correct: 2,
            explanation: "'Beautiful' describes the noun 'flower', making it an adjective."
        },
        {
            question: "Choose the correct spelling:",
            options: ["Recieve", "Receive", "Receeve", "Recive"],
            correct: 1,
            explanation: "The correct spelling follows the rule: 'i' before 'e' except after 'c'."
        }
    ],

    // ============================================
    // HINDI QUESTIONS
    // ============================================
    hindi: [
        {
            question: "'पुस्तक' शब्द का बहुवचन क्या होगा?",
            options: ["पुस्तकें", "पुस्तके", "पुस्तकी", "पुस्तकों"],
            correct: 0,
            explanation: "'पुस्तक' का बहुवचन 'पुस्तकें' होता है।"
        },
        {
            question: "'सुंदर' का विलोम शब्द क्या है?",
            options: ["मधुर", "कुरूप", "अच्छा", "सुंदर"],
            correct: 1,
            explanation: "'सुंदर' का विलोम 'कुरूप' या 'बदसूरत' होता है।"
        },
        {
            question: "'गाय' शब्द का लिंग बताइए:",
            options: ["पुल्लिंग", "स्त्रीलिंग", "उभयलिंगी", "नपुंसकलिंग"],
            correct: 1,
            explanation: "'गाय' स्त्रीलिंग शब्द है, इसका पुल्लिंग 'बैल' होता है।"
        },
        {
            question: "'पानी में रहकर मगर से बैर' - इस मुहावरे का अर्थ क्या है?",
            options: ["मित्रता करना", "शत्रुता करना", "जिस पर निर्भर हों उससे शत्रुता न करना", "तैरना सीखना"],
            correct: 2,
            explanation: "इसका अर्थ है कि जिस पर हम निर्भर हैं, उससे बैर नहीं करना चाहिए।"
        },
        {
            question: "'विद्यालय' का संधि-विच्छेद क्या होगा?",
            options: ["विद्या + आलय", "विद + यालय", "विद्या + लय", "वि + द्यालय"],
            correct: 0,
            explanation: "'विद्यालय' = विद्या + आलय (दीर्घ संधि - आ + आ = आ)"
        },
        {
            question: "किस वाक्य में क्रिया भूतकाल में है?",
            options: ["राम खाना खाता है।", "राम खाना खाएगा।", "राम ने खाना खाया।", "राम खाना खा रहा है।"],
            correct: 2,
            explanation: "'खाया' भूतकाल की क्रिया है। यह बताता है कि कार्य हो चुका है।"
        },
        {
            question: "'राजा' का स्त्रीलिंग क्या है?",
            options: ["राजी", "रानी", "राजनी", "राजीन"],
            correct: 1,
            explanation: "'राजा' का स्त्रीलिंग 'रानी' होता है।"
        },
        {
            question: "'नीला आकाश सुंदर है।' - इस वाक्य में विशेषण क्या है?",
            options: ["आकाश", "सुंदर", "नीला और सुंदर", "है"],
            correct: 2,
            explanation: "'नीला' और 'सुंदर' दोनों विशेषण हैं जो 'आकाश' की विशेषता बता रहे हैं।"
        },
        {
            question: "'पर्वत' का पर्यायवाची शब्द है:",
            options: ["सूर्य", "पहाड़", "नदी", "समुद्र"],
            correct: 1,
            explanation: "'पर्वत' और 'पहाड़' समान अर्थ वाले शब्द (पर्यायवाची) हैं।"
        },
        {
            question: "'जल' शब्द का अर्थ क्या है?",
            options: ["आग", "पानी", "हवा", "मिट्टी"],
            correct: 1,
            explanation: "'जल' का अर्थ 'पानी' होता है।"
        }
    ],

    // ============================================
    // MATHEMATICS QUESTIONS
    // ============================================
    maths: [
        {
            question: "If x + 5 = 12, then find the value of x:",
            options: ["5", "6", "7", "8"],
            correct: 2,
            explanation: "x + 5 = 12, so x = 12 - 5 = 7"
        },
        {
            question: "What is 25% of 200?",
            options: ["25", "50", "75", "100"],
            correct: 1,
            explanation: "25% of 200 = (25/100) × 200 = 50"
        },
        {
            question: "Find the square root of 144:",
            options: ["10", "11", "12", "13"],
            correct: 2,
            explanation: "12 × 12 = 144, so √144 = 12"
        },
        {
            question: "If the perimeter of a square is 40 cm, what is the length of each side?",
            options: ["8 cm", "10 cm", "12 cm", "15 cm"],
            correct: 1,
            explanation: "Perimeter of square = 4 × side, so side = 40/4 = 10 cm"
        },
        {
            question: "Simplify: 3² + 4²",
            options: ["25", "7", "12", "49"],
            correct: 0,
            explanation: "3² + 4² = 9 + 16 = 25"
        },
        {
            question: "What is the LCM of 4 and 6?",
            options: ["2", "12", "24", "6"],
            correct: 1,
            explanation: "LCM of 4 and 6: Multiples of 4: 4,8,12... Multiples of 6: 6,12... LCM = 12"
        },
        {
            question: "A triangle has angles measuring 60°, 60°, and 60°. What type of triangle is it?",
            options: ["Scalene", "Isosceles", "Equilateral", "Right-angled"],
            correct: 2,
            explanation: "A triangle with all angles equal (60° each) is an equilateral triangle."
        },
        {
            question: "What is the value of 2³?",
            options: ["6", "8", "9", "4"],
            correct: 1,
            explanation: "2³ = 2 × 2 × 2 = 8"
        },
        {
            question: "If a train travels 240 km in 4 hours, what is its speed?",
            options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
            correct: 2,
            explanation: "Speed = Distance/Time = 240/4 = 60 km/h"
        },
        {
            question: "What is the sum of angles in a quadrilateral?",
            options: ["180°", "270°", "360°", "540°"],
            correct: 2,
            explanation: "Sum of all angles in a quadrilateral = 360°"
        },
        {
            question: "Find the area of a rectangle with length 8 cm and breadth 5 cm:",
            options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"],
            correct: 2,
            explanation: "Area = length × breadth = 8 × 5 = 40 cm²"
        },
        {
            question: "What is the HCF of 12 and 18?",
            options: ["2", "3", "6", "9"],
            correct: 2,
            explanation: "Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. HCF = 6"
        },
        {
            question: "Convert 0.75 to a fraction:",
            options: ["3/4", "7/5", "1/2", "2/3"],
            correct: 0,
            explanation: "0.75 = 75/100 = 3/4 (after simplification)"
        },
        {
            question: "If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?",
            options: ["8", "10", "12", "15"],
            correct: 1,
            explanation: "Boys:Girls = 3:2, Boys = 15. So, 3 parts = 15, 1 part = 5. Girls = 2 parts = 10"
        },
        {
            question: "What is the cube root of 27?",
            options: ["3", "9", "6", "4"],
            correct: 0,
            explanation: "3 × 3 × 3 = 27, so ∛27 = 3"
        }
    ],

    // ============================================
    // SCIENCE QUESTIONS
    // ============================================
    science: [
        {
            question: "Which is the largest organ in the human body?",
            options: ["Heart", "Liver", "Skin", "Brain"],
            correct: 2,
            explanation: "Skin is the largest organ, covering about 2 square meters in adults."
        },
        {
            question: "What is the chemical formula for water?",
            options: ["CO₂", "H₂O", "NaCl", "O₂"],
            correct: 1,
            explanation: "Water is made of 2 hydrogen atoms and 1 oxygen atom = H₂O"
        },
        {
            question: "Which planet is known as the 'Red Planet'?",
            options: ["Venus", "Jupiter", "Mars", "Saturn"],
            correct: 2,
            explanation: "Mars appears red due to iron oxide (rust) on its surface."
        },
        {
            question: "What is the unit of force?",
            options: ["Joule", "Watt", "Newton", "Pascal"],
            correct: 2,
            explanation: "The SI unit of force is Newton (N), named after Sir Isaac Newton."
        },
        {
            question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            correct: 2,
            explanation: "Plants absorb CO₂ and release O₂ during photosynthesis."
        },
        {
            question: "What type of energy is stored in food?",
            options: ["Kinetic energy", "Chemical energy", "Electrical energy", "Nuclear energy"],
            correct: 1,
            explanation: "Food contains chemical energy stored in chemical bonds."
        },
        {
            question: "Which metal is liquid at room temperature?",
            options: ["Iron", "Gold", "Mercury", "Silver"],
            correct: 2,
            explanation: "Mercury (Hg) is the only metal that is liquid at room temperature."
        },
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
            correct: 2,
            explanation: "Mitochondria produce ATP (energy) for the cell, hence called 'powerhouse'."
        },
        {
            question: "Sound cannot travel through:",
            options: ["Air", "Water", "Vacuum", "Steel"],
            correct: 2,
            explanation: "Sound needs a medium to travel. Vacuum has no particles, so sound cannot travel."
        },
        {
            question: "Which vitamin is produced when skin is exposed to sunlight?",
            options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
            correct: 3,
            explanation: "Vitamin D is synthesized in the skin when exposed to UV rays from sunlight."
        },
        {
            question: "What is the main function of white blood cells?",
            options: ["Carry oxygen", "Fight infections", "Clot blood", "Produce hormones"],
            correct: 1,
            explanation: "White blood cells (WBCs) are part of the immune system and fight pathogens."
        },
        {
            question: "Which is a non-renewable source of energy?",
            options: ["Solar energy", "Wind energy", "Coal", "Hydropower"],
            correct: 2,
            explanation: "Coal takes millions of years to form and is therefore non-renewable."
        },
        {
            question: "What is the boiling point of water at sea level?",
            options: ["0°C", "50°C", "100°C", "212°C"],
            correct: 2,
            explanation: "Water boils at 100°C (212°F) at standard atmospheric pressure."
        },
        {
            question: "Which organ purifies blood in the human body?",
            options: ["Heart", "Lungs", "Kidney", "Liver"],
            correct: 2,
            explanation: "Kidneys filter waste products and excess fluids from blood."
        },
        {
            question: "The process by which plants make their food is called:",
            options: ["Respiration", "Digestion", "Photosynthesis", "Transpiration"],
            correct: 2,
            explanation: "Photosynthesis: Plants use sunlight, CO₂, and water to make glucose."
        }
    ],

    // ============================================
    // PREVIOUS YEAR PAPERS (Placeholder - Add actual PYQs here)
    // ============================================
    pyq2024: [
        // Add 2024 previous year questions here
        // The user will provide these
    ],

    pyq2023: [
        // Add 2023 previous year questions here
        // The user will provide these
    ]
};

console.log('📚 JNV Questions loaded:', {
    english: JNV_QUESTIONS.english.length,
    hindi: JNV_QUESTIONS.hindi.length,
    maths: JNV_QUESTIONS.maths.length,
    science: JNV_QUESTIONS.science.length
});
