/* ============================================
   SCIENCE LAB - GAME ENGINE
   Physics, Chemistry & Biology Quizzes
   ============================================ */

// ============================================
// SCIENCE DATA
// ============================================
const scienceData = {
    forces: {
        title: 'Forces & Motion',
        category: 'Physics',
        emoji: '⚡',
        xpPerQuestion: 15,
        questions: [
            { q: 'What is the SI unit of force? (बल की SI इकाई क्या है?)', options: ['Watt (वाट)', 'Newton (न्यूटन)', 'Joule (जूल)', 'Pascal (पास्कल)'], answer: 'Newton (न्यूटन)' },
            { q: 'Who discovered the laws of motion? (गति के नियमों की खोज किसने की?)', options: ['Einstein (आइंस्टीन)', 'Newton (न्यूटन)', 'Galileo (गैलीलियो)', 'Faraday (फैराडे)'], answer: 'Newton (न्यूटन)' },
            { q: 'What is the formula for force? (बल का सूत्र क्या है?)', options: ['F = ma', 'F = mv', 'F = mg', 'F = m/a'], answer: 'F = ma' },
            { q: 'Friction always acts in which direction? (घर्षण हमेशा किस दिशा में कार्य करता है?)', options: ['Same as motion (गति की दिशा में)', 'Opposite to motion (गति के विपरीत)', 'Perpendicular (लंबवत)', 'Random (यादृच्छिक)'], answer: 'Opposite to motion (गति के विपरीत)' },
            { q: 'What is the acceleration due to gravity on Earth? (पृथ्वी पर गुरुत्वाकर्षण के कारण त्वरण क्या है?)', options: ['9.8 m/s²', '10.8 m/s²', '8.9 m/s²', '11 m/s²'], answer: '9.8 m/s²' },
            { q: "Newton's first law is also called? (न्यूटन का पहला नियम क्या कहलाता है?)", options: ['Law of Inertia (जड़त्व का नियम)', 'Law of Motion (गति का नियम)', 'Law of Force (बल का नियम)', 'Law of Mass (द्रव्यमान का नियम)'], answer: 'Law of Inertia (जड़त्व का नियम)' },
            { q: 'Weight is a type of? (भार किसका प्रकार है?)', options: ['Mass (द्रव्यमान)', 'Force (बल)', 'Volume (आयतन)', 'Density (घनत्व)'], answer: 'Force (बल)' },
            { q: 'What happens when net force is zero? (जब कुल बल शून्य हो तो क्या होता है?)', options: ['Object accelerates (वस्तु त्वरित होती है)', 'Object stops (वस्तु रुकती है)', 'Object moves at constant velocity (वस्तु समान वेग से चलती है)', 'Object reverses (वस्तु पलटती है)'], answer: 'Object moves at constant velocity (वस्तु समान वेग से चलती है)' },
            { q: 'Action and reaction forces are described by? (क्रिया और प्रतिक्रिया बलों का वर्णन किस नियम में है?)', options: ['1st law (पहला नियम)', '2nd law (दूसरा नियम)', '3rd law (तीसरा नियम)', '4th law (चौथा नियम)'], answer: '3rd law (तीसरा नियम)' },
            { q: 'Momentum = ? (संवेग = ?)', options: ['m × v (द्रव्यमान × वेग)', 'm × a (द्रव्यमान × त्वरण)', 'm × g (द्रव्यमान × g)', 'v × a (वेग × त्वरण)'], answer: 'm × v (द्रव्यमान × वेग)' }
        ]
    },
    electricity: {
        title: 'Electricity & Circuits',
        category: 'Physics',
        emoji: '🔌',
        xpPerQuestion: 20,
        questions: [
            { q: 'What is the SI unit of electric current? (विद्युत धारा की SI इकाई क्या है?)', options: ['Volt (वोल्ट)', 'Ampere (एम्पियर)', 'Ohm (ओम)', 'Watt (वाट)'], answer: 'Ampere (एम्पियर)' },
            { q: "Ohm's Law states V = ? (ओम का नियम V = ?)", options: ['IR', 'I/R', 'R/I', 'I+R'], answer: 'IR' },
            { q: 'What is the unit of resistance? (प्रतिरोध की इकाई क्या है?)', options: ['Ampere (एम्पियर)', 'Volt (वोल्ट)', 'Ohm (ओम)', 'Watt (वाट)'], answer: 'Ohm (ओम)' },
            { q: 'In a series circuit, current is? (श्रेणी परिपथ में धारा कैसी होती है?)', options: ['Same everywhere (हर जगह समान)', 'Different (अलग-अलग)', 'Zero (शून्य)', 'Infinite (अनंत)'], answer: 'Same everywhere (हर जगह समान)' },
            { q: 'What type of current flows in batteries? (बैटरी में किस प्रकार की धारा बहती है?)', options: ['AC (प्रत्यावर्ती धारा)', 'DC (दिष्ट धारा)', 'Both (दोनों)', 'Neither (कोई नहीं)'], answer: 'DC (दिष्ट धारा)' },
            { q: 'Electric power = ? (विद्युत शक्ति = ?)', options: ['V × I', 'V / I', 'V + I', 'V - I'], answer: 'V × I' },
            { q: 'What device measures current? (कौन सा उपकरण धारा मापता है?)', options: ['Voltmeter (वोल्टमीटर)', 'Ammeter (एमीटर)', 'Ohmmeter (ओममीटर)', 'Thermometer (थर्मामीटर)'], answer: 'Ammeter (एमीटर)' },
            { q: 'Insulators have what kind of resistance? (कुचालकों में प्रतिरोध कैसा होता है?)', options: ['Low (कम)', 'High (उच्च)', 'Zero (शून्य)', 'Negative (ऋणात्मक)'], answer: 'High (उच्च)' },
            { q: '1 kilowatt = ? (1 किलोवाट = ?)', options: ['100 W', '1000 W', '10 W', '10000 W'], answer: '1000 W' },
            { q: 'What flows in an electric circuit? (विद्युत परिपथ में क्या बहता है?)', options: ['Protons (प्रोटॉन)', 'Neutrons (न्यूट्रॉन)', 'Electrons (इलेक्ट्रॉन)', 'Photons (फोटॉन)'], answer: 'Electrons (इलेक्ट्रॉन)' }
        ]
    },
    light: {
        title: 'Light & Optics',
        category: 'Physics',
        emoji: '💡',
        xpPerQuestion: 20,
        questions: [
            { q: 'Light travels fastest in? (प्रकाश सबसे तेज़ कहाँ चलता है?)', options: ['Water (पानी)', 'Glass (कांच)', 'Vacuum (निर्वात)', 'Air (हवा)'], answer: 'Vacuum (निर्वात)' },
            { q: 'What is the speed of light? (प्रकाश की गति क्या है?)', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10⁴ m/s', '3×10² m/s'], answer: '3×10⁸ m/s' },
            { q: 'A concave mirror is used in? (अवतल दर्पण का उपयोग कहाँ होता है?)', options: ['Rearview mirror (पीछे का दर्पण)', 'Torch (टॉर्च)', 'Sunglasses (धूप का चश्मा)', 'Telescope (दूरबीन)'], answer: 'Torch (टॉर्च)' },
            { q: 'Splitting of light into colors is called? (प्रकाश का रंगों में विभाजन क्या कहलाता है?)', options: ['Reflection (परावर्तन)', 'Refraction (अपवर्तन)', 'Dispersion (विक्षेपण)', 'Diffraction (विवर्तन)'], answer: 'Dispersion (विक्षेपण)' },
            { q: 'Rainbow has how many colors? (इंद्रधनुष में कितने रंग होते हैं?)', options: ['5', '6', '7', '8'], answer: '7' },
            { q: "When light bounces back, it's called? (जब प्रकाश वापस उछलता है, इसे क्या कहते हैं?)", options: ['Refraction (अपवर्तन)', 'Reflection (परावर्तन)', 'Absorption (अवशोषण)', 'Transmission (संचरण)'], answer: 'Reflection (परावर्तन)' },
            { q: 'Lens used to correct myopia? (निकट दृष्टि दोष को ठीक करने के लिए कौन सा लेंस?)', options: ['Convex (उत्तल)', 'Concave (अवतल)', 'Plano (समतल)', 'Cylindrical (बेलनाकार)'], answer: 'Concave (अवतल)' },
            { q: 'Image in plane mirror is? (समतल दर्पण में प्रतिबिंब कैसा होता है?)', options: ['Real (वास्तविक)', 'Virtual (आभासी)', 'Inverted (उल्टा)', 'Magnified (आवर्धित)'], answer: 'Virtual (आभासी)' },
            { q: 'Which color bends most during refraction? (अपवर्तन में कौन सा रंग सबसे अधिक मुड़ता है?)', options: ['Red (लाल)', 'Yellow (पीला)', 'Green (हरा)', 'Violet (बैंगनी)'], answer: 'Violet (बैंगनी)' },
            { q: 'Total internal reflection requires? (पूर्ण आंतरिक परावर्तन के लिए क्या आवश्यक है?)', options: ['Dense to rarer medium (सघन से विरल माध्यम)', 'Rarer to denser (विरल से सघन)', 'Same medium (समान माध्यम)', 'Vacuum (निर्वात)'], answer: 'Dense to rarer medium (सघन से विरल माध्यम)' }
        ]
    },
    elements: {
        title: 'Periodic Table',
        category: 'Chemistry',
        emoji: '⚛️',
        xpPerQuestion: 15,
        questions: [
            { q: 'Symbol for Gold? (सोने का प्रतीक?)', options: ['Go', 'Gd', 'Au', 'Ag'], answer: 'Au' },
            { q: 'Atomic number of Carbon? (कार्बन की परमाणु संख्या?)', options: ['4', '6', '8', '12'], answer: '6' },
            { q: 'Which is the lightest element? (सबसे हल्का तत्व कौन सा है?)', options: ['Helium (हीलियम)', 'Hydrogen (हाइड्रोजन)', 'Lithium (लिथियम)', 'Oxygen (ऑक्सीजन)'], answer: 'Hydrogen (हाइड्रोजन)' },
            { q: 'Symbol for Iron? (लोहे का प्रतीक?)', options: ['Ir', 'Fe', 'I', 'In'], answer: 'Fe' },
            { q: 'Which element has atomic number 8? (किस तत्व की परमाणु संख्या 8 है?)', options: ['Nitrogen (नाइट्रोजन)', 'Carbon (कार्बन)', 'Oxygen (ऑक्सीजन)', 'Fluorine (फ्लोरीन)'], answer: 'Oxygen (ऑक्सीजन)' },
            { q: 'Na is the symbol for? (Na किसका प्रतीक है?)', options: ['Nitrogen (नाइट्रोजन)', 'Sodium (सोडियम)', 'Neon (नियॉन)', 'Nickel (निकल)'], answer: 'Sodium (सोडियम)' },
            { q: "Most abundant element in Earth's crust? (पृथ्वी की पपड़ी में सबसे अधिक तत्व?)", options: ['Iron (लोहा)', 'Silicon (सिलिकॉन)', 'Oxygen (ऑक्सीजन)', 'Aluminum (एल्युमीनियम)'], answer: 'Oxygen (ऑक्सीजन)' },
            { q: 'Which gas is called "Noble Gas"? (किस गैस को "उत्कृष्ट गैस" कहते हैं?)', options: ['Oxygen (ऑक्सीजन)', 'Nitrogen (नाइट्रोजन)', 'Helium (हीलियम)', 'Hydrogen (हाइड्रोजन)'], answer: 'Helium (हीलियम)' },
            { q: 'Symbol for Silver? (चांदी का प्रतीक?)', options: ['Si', 'Sr', 'Ag', 'Au'], answer: 'Ag' },
            { q: 'Atomic number equals number of? (परमाणु संख्या किसकी संख्या के बराबर होती है?)', options: ['Electrons (इलेक्ट्रॉन)', 'Neutrons (न्यूट्रॉन)', 'Protons (प्रोटॉन)', 'Both A & C (A और C दोनों)'], answer: 'Both A & C (A और C दोनों)' }
        ]
    },
    reactions: {
        title: 'Chemical Reactions',
        category: 'Chemistry',
        emoji: '🧪',
        xpPerQuestion: 20,
        questions: [
            { q: 'Rusting is an example of? (जंग लगना किसका उदाहरण है?)', options: ['Reduction (अपचयन)', 'Oxidation (ऑक्सीकरण)', 'Neutralization (उदासीनीकरण)', 'Decomposition (अपघटन)'], answer: 'Oxidation (ऑक्सीकरण)' },
            { q: 'Acid + Base = ? (अम्ल + क्षार = ?)', options: ['Salt + Water (लवण + पानी)', 'Salt + Gas (लवण + गैस)', 'Acid + Gas (अम्ल + गैस)', 'Base + Water (क्षार + पानी)'], answer: 'Salt + Water (लवण + पानी)' },
            { q: 'pH of pure water is? (शुद्ध पानी का pH क्या है?)', options: ['0', '7', '14', '1'], answer: '7' },
            { q: 'Which gas is released when acid reacts with metal? (अम्ल धातु के साथ अभिक्रिया करने पर कौन सी गैस निकलती है?)', options: ['Oxygen (ऑक्सीजन)', 'Hydrogen (हाइड्रोजन)', 'Nitrogen (नाइट्रोजन)', 'Carbon dioxide (कार्बन डाइऑक्साइड)'], answer: 'Hydrogen (हाइड्रोजन)' },
            { q: 'Photosynthesis is what type of reaction? (प्रकाश संश्लेषण किस प्रकार की अभिक्रिया है?)', options: ['Exothermic (ऊष्माक्षेपी)', 'Endothermic (ऊष्माशोषी)', 'Neutral (उदासीन)', 'Combustion (दहन)'], answer: 'Endothermic (ऊष्माशोषी)' },
            { q: 'Burning of wood is? (लकड़ी का जलना क्या है?)', options: ['Physical change (भौतिक परिवर्तन)', 'Chemical change (रासायनिक परिवर्तन)', 'No change (कोई परिवर्तन नहीं)', 'Reversible (उत्क्रमणीय)'], answer: 'Chemical change (रासायनिक परिवर्तन)' },
            { q: 'Catalyst does what to a reaction? (उत्प्रेरक अभिक्रिया में क्या करता है?)', options: ['Slows it (धीमा करता है)', 'Speeds it (तेज करता है)', 'Stops it (रोकता है)', 'Reverses it (उलटता है)'], answer: 'Speeds it (तेज करता है)' },
            { q: 'pH less than 7 indicates? (pH 7 से कम क्या दर्शाता है?)', options: ['Base (क्षार)', 'Acid (अम्ल)', 'Neutral (उदासीन)', 'Salt (लवण)'], answer: 'Acid (अम्ल)' },
            { q: 'Sodium + Water produces? (सोडियम + पानी से क्या बनता है?)', options: ['Hydrogen (हाइड्रोजन)', 'Oxygen (ऑक्सीजन)', 'Nitrogen (नाइट्रोजन)', 'Carbon dioxide (कार्बन डाइऑक्साइड)'], answer: 'Hydrogen (हाइड्रोजन)' },
            { q: 'Baking soda is chemically? (बेकिंग सोडा रासायनिक रूप से क्या है?)', options: ['NaCl', 'NaHCO₃', 'Na₂CO₃', 'NaOH'], answer: 'NaHCO₃' }
        ]
    },
    compounds: {
        title: 'Compounds & Formulas',
        category: 'Chemistry',
        emoji: '🔗',
        xpPerQuestion: 25,
        questions: [
            { q: 'Formula for Water? (पानी का सूत्र?)', options: ['H₂O', 'HO₂', 'OH', 'H₃O'], answer: 'H₂O' },
            { q: 'Formula for Carbon dioxide? (कार्बन डाइऑक्साइड का सूत्र?)', options: ['CO', 'CO₂', 'C₂O', 'CO₃'], answer: 'CO₂' },
            { q: 'Formula for Table Salt? (नमक का सूत्र?)', options: ['NaCl', 'KCl', 'CaCl₂', 'NaOH'], answer: 'NaCl' },
            { q: 'H₂SO₄ is? (H₂SO₄ क्या है?)', options: ['Hydrochloric acid (हाइड्रोक्लोरिक अम्ल)', 'Sulphuric acid (सल्फ्यूरिक अम्ल)', 'Nitric acid (नाइट्रिक अम्ल)', 'Acetic acid (एसिटिक अम्ल)'], answer: 'Sulphuric acid (सल्फ्यूरिक अम्ल)' },
            { q: 'Formula for Glucose? (ग्लूकोज़ का सूत्र?)', options: ['C₆H₁₂O₆', 'C₆H₆O₆', 'C₁₂H₂₂O₁₁', 'CH₄'], answer: 'C₆H₁₂O₆' },
            { q: 'CaCO₃ is called? (CaCO₃ क्या कहलाता है?)', options: ['Quick lime (चूना)', 'Limestone (चूना पत्थर)', 'Slaked lime (बुझा हुआ चूना)', 'Chalk powder (खड़िया पाउडर)'], answer: 'Limestone (चूना पत्थर)' },
            { q: 'Formula for Ammonia? (अमोनिया का सूत्र?)', options: ['NH₃', 'NO₂', 'N₂O', 'NH₄'], answer: 'NH₃' },
            { q: 'Molecular formula of Methane? (मीथेन का आणविक सूत्र?)', options: ['CH₄', 'C₂H₆', 'C₂H₄', 'C₃H₈'], answer: 'CH₄' },
            { q: 'NaOH is called? (NaOH क्या कहलाता है?)', options: ['Sodium chloride (सोडियम क्लोराइड)', 'Caustic soda (कास्टिक सोडा)', 'Baking soda (बेकिंग सोडा)', 'Washing soda (धोने का सोडा)'], answer: 'Caustic soda (कास्टिक सोडा)' },
            { q: 'Chemical name of Bleaching Powder? (विरंजक चूर्ण का रासायनिक नाम?)', options: ['Calcium hypochlorite (कैल्शियम हाइपोक्लोराइट)', 'Sodium hypochlorite (सोडियम हाइपोक्लोराइट)', 'Calcium carbonate (कैल्शियम कार्बोनेट)', 'Sodium carbonate (सोडियम कार्बोनेट)'], answer: 'Calcium hypochlorite (कैल्शियम हाइपोक्लोराइट)' }
        ]
    },
    cells: {
        title: 'Cell Structure',
        category: 'Biology',
        emoji: '🦠',
        xpPerQuestion: 15,
        questions: [
            { q: 'Who discovered cells? (कोशिकाओं की खोज किसने की?)', options: ['Darwin (डार्विन)', 'Hooke (हुक)', 'Mendel (मेंडल)', 'Watson (वॉटसन)'], answer: 'Hooke (हुक)' },
            { q: 'Powerhouse of the cell? (कोशिका का पावरहाउस?)', options: ['Nucleus (केंद्रक)', 'Mitochondria (माइटोकॉन्ड्रिया)', 'Ribosome (राइबोसोम)', 'Chloroplast (हरितलवक)'], answer: 'Mitochondria (माइटोकॉन्ड्रिया)' },
            { q: 'Which organelle contains DNA? (किस अंगक में DNA होता है?)', options: ['Ribosome (राइबोसोम)', 'Lysosome (लाइसोसोम)', 'Nucleus (केंद्रक)', 'Vacuole (रिक्तिका)'], answer: 'Nucleus (केंद्रक)' },
            { q: 'Plant cells have which unique organelle? (पादप कोशिकाओं में कौन सा विशेष अंगक होता है?)', options: ['Mitochondria (माइटोकॉन्ड्रिया)', 'Chloroplast (हरितलवक)', 'Nucleus (केंद्रक)', 'Ribosome (राइबोसोम)'], answer: 'Chloroplast (हरितलवक)' },
            { q: 'Cell membrane is also called? (कोशिका झिल्ली को और क्या कहते हैं?)', options: ['Cell wall (कोशिका भित्ति)', 'Plasma membrane (प्लाज़्मा झिल्ली)', 'Nuclear membrane (केंद्रक झिल्ली)', 'Tonoplast (टोनोप्लास्ट)'], answer: 'Plasma membrane (प्लाज़्मा झिल्ली)' },
            { q: 'Ribosomes are responsible for? (राइबोसोम किसके लिए जिम्मेदार हैं?)', options: ['Digestion (पाचन)', 'Protein synthesis (प्रोटीन संश्लेषण)', 'Respiration (श्वसन)', 'Photosynthesis (प्रकाश संश्लेषण)'], answer: 'Protein synthesis (प्रोटीन संश्लेषण)' },
            { q: 'Suicide bags of the cell are? (कोशिका की आत्मघाती थैलियाँ कौन सी हैं?)', options: ['Ribosomes (राइबोसोम)', 'Lysosomes (लाइसोसोम)', 'Vacuoles (रिक्तिकाएँ)', 'Mitochondria (माइटोकॉन्ड्रिया)'], answer: 'Lysosomes (लाइसोसोम)' },
            { q: 'Largest cell organelle? (सबसे बड़ा कोशिका अंगक?)', options: ['Mitochondria (माइटोकॉन्ड्रिया)', 'Nucleus (केंद्रक)', 'Vacuole (रिक्तिका)', 'Golgi body (गॉल्जी बॉडी)'], answer: 'Nucleus (केंद्रक)' },
            { q: 'Animal cells lack? (जंतु कोशिकाओं में क्या नहीं होता?)', options: ['Nucleus (केंद्रक)', 'Cell wall (कोशिका भित्ति)', 'Mitochondria (माइटोकॉन्ड्रिया)', 'Cytoplasm (कोशिका द्रव्य)'], answer: 'Cell wall (कोशिका भित्ति)' },
            { q: 'Basic unit of life? (जीवन की मूल इकाई?)', options: ['Atom (परमाणु)', 'Molecule (अणु)', 'Cell (कोशिका)', 'Tissue (ऊतक)'], answer: 'Cell (कोशिका)' }
        ]
    },
    human: {
        title: 'Human Body',
        category: 'Biology',
        emoji: '🫀',
        xpPerQuestion: 20,
        questions: [
            { q: 'Largest organ of the human body? (मानव शरीर का सबसे बड़ा अंग?)', options: ['Liver (यकृत)', 'Brain (मस्तिष्क)', 'Skin (त्वचा)', 'Heart (हृदय)'], answer: 'Skin (त्वचा)' },
            { q: 'How many bones in adult human body? (वयस्क मानव शरीर में कितनी हड्डियाँ होती हैं?)', options: ['206', '300', '180', '250'], answer: '206' },
            { q: 'Which blood type is universal donor? (कौन सा रक्त समूह सार्वभौमिक दाता है?)', options: ['A', 'B', 'AB', 'O'], answer: 'O' },
            { q: 'Normal human body temperature? (सामान्य मानव शरीर का तापमान?)', options: ['36°C', '37°C', '38°C', '35°C'], answer: '37°C' },
            { q: 'Largest bone in human body? (मानव शरीर की सबसे बड़ी हड्डी?)', options: ['Humerus (ह्यूमरस)', 'Femur (फीमर)', 'Tibia (टिबिया)', 'Spine (रीढ़)'], answer: 'Femur (फीमर)' },
            { q: 'Heart has how many chambers? (हृदय में कितने कक्ष होते हैं?)', options: ['2', '3', '4', '5'], answer: '4' },
            { q: 'Normal pulse rate is? (सामान्य नाड़ी दर क्या है?)', options: ['50-60', '72-80', '100-120', '40-50'], answer: '72-80' },
            { q: 'Blood is filtered by? (रक्त किससे छनता है?)', options: ['Liver (यकृत)', 'Kidney (गुर्दा)', 'Heart (हृदय)', 'Lungs (फेफड़े)'], answer: 'Kidney (गुर्दा)' },
            { q: 'Digestion of food starts in? (भोजन का पाचन कहाँ से शुरू होता है?)', options: ['Stomach (पेट)', 'Mouth (मुँह)', 'Small intestine (छोटी आंत)', 'Large intestine (बड़ी आंत)'], answer: 'Mouth (मुँह)' },
            { q: 'Which organ produces insulin? (कौन सा अंग इंसुलिन बनाता है?)', options: ['Liver (यकृत)', 'Kidney (गुर्दा)', 'Pancreas (अग्न्याशय)', 'Stomach (पेट)'], answer: 'Pancreas (अग्न्याशय)' }
        ]
    },
    ecology: {
        title: 'Ecology & Environment',
        category: 'Biology',
        emoji: '🌿',
        xpPerQuestion: 20,
        questions: [
            { q: 'Ozone layer is found in which layer? (ओजोन परत किस परत में पाई जाती है?)', options: ['Troposphere (क्षोभमंडल)', 'Stratosphere (समतापमंडल)', 'Mesosphere (मध्यमंडल)', 'Thermosphere (तापमंडल)'], answer: 'Stratosphere (समतापमंडल)' },
            { q: 'Primary producers in ecosystem are? (पारिस्थितिकी तंत्र में प्राथमिक उत्पादक कौन हैं?)', options: ['Herbivores (शाकाहारी)', 'Carnivores (मांसाहारी)', 'Green plants (हरे पौधे)', 'Decomposers (अपघटक)'], answer: 'Green plants (हरे पौधे)' },
            { q: 'Food chain starts with? (खाद्य श्रृंखला किससे शुरू होती है?)', options: ['Consumer (उपभोक्ता)', 'Producer (उत्पादक)', 'Decomposer (अपघटक)', 'Carnivore (मांसाहारी)'], answer: 'Producer (उत्पादक)' },
            { q: 'Major greenhouse gas is? (प्रमुख ग्रीनहाउस गैस कौन सी है?)', options: ['Oxygen (ऑक्सीजन)', 'Nitrogen (नाइट्रोजन)', 'Carbon dioxide (कार्बन डाइऑक्साइड)', 'Hydrogen (हाइड्रोजन)'], answer: 'Carbon dioxide (कार्बन डाइऑक्साइड)' },
            { q: 'Biodiversity hotspot of India? (भारत का जैव विविधता हॉटस्पॉट?)', options: ['Thar desert (थार मरुस्थल)', 'Western Ghats (पश्चिमी घाट)', 'Gangetic Plains (गंगा का मैदान)', 'Deccan Plateau (दक्कन का पठार)'], answer: 'Western Ghats (पश्चिमी घाट)' },
            { q: 'Which gas causes acid rain? (कौन सी गैस अम्लीय वर्षा का कारण बनती है?)', options: ['CO₂', 'SO₂', 'O₂', 'N₂'], answer: 'SO₂' },
            { q: 'Top of food chain is occupied by? (खाद्य श्रृंखला के शीर्ष पर कौन होता है?)', options: ['Herbivores (शाकाहारी)', 'Producers (उत्पादक)', 'Apex predators (शीर्ष शिकारी)', 'Decomposers (अपघटक)'], answer: 'Apex predators (शीर्ष शिकारी)' },
            { q: 'Amazon is called the lungs of? (अमेज़न को किसके फेफड़े कहते हैं?)', options: ['Asia (एशिया)', 'Earth (पृथ्वी)', 'South America (दक्षिण अमेरिका)', 'Africa (अफ्रीका)'], answer: 'Earth (पृथ्वी)' },
            { q: 'What percentage of Earth is covered by forests? (पृथ्वी का कितना प्रतिशत वनों से ढका है?)', options: ['10%', '20%', '31%', '50%'], answer: '31%' },
            { q: 'Coral reefs are found in? (मूंगा चट्टानें कहाँ पाई जाती हैं?)', options: ['Deep ocean (गहरा समुद्र)', 'Shallow warm water (उथला गर्म पानी)', 'Cold water (ठंडा पानी)', 'Rivers (नदियाँ)'], answer: 'Shallow warm water (उथला गर्म पानी)' }
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
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerData();
    initTheme();
    initFactsSlider();
    updateUI();
});

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

// ============================================
// SUBJECT FILTER
// ============================================
function filterSubject(subject) {
    // Update tabs
    document.querySelectorAll('.subject-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.subject === subject);
    });

    // Filter cards
    document.querySelectorAll('.activity-card').forEach(card => {
        if (subject === 'all') {
            card.classList.remove('hidden');
        } else {
            card.classList.toggle('hidden', card.dataset.category !== subject);
        }
    });
}

// ============================================
// QUIZ SYSTEM
// ============================================

// Activity order for access control (first one is free)
// IDs must match the onclick handlers in index.html
const activityOrder = ['forces', 'electricity', 'light', 'elements', 'reactions', 'compounds', 'cells', 'human', 'ecology'];

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
    quizState.userAnswers = []; // Reset user answers for explanations
    quizState.questions = shuffleArray([...data.questions]);

    // Update header
    document.getElementById('quizCategory').textContent = data.category;
    document.getElementById('quizTitle').textContent = data.title;
    document.getElementById('totalQ').textContent = quizState.questions.length;

    // Reset stats display
    document.getElementById('correctStat').textContent = '0';
    document.getElementById('wrongStat').textContent = '0';
    document.getElementById('xpStat').textContent = '0';

    // Show modal
    document.getElementById('quizModal').classList.add('active');

    loadQuestion();
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

    // Next question
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
