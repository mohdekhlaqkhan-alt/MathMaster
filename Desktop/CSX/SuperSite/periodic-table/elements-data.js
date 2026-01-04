// Elements Data - All 118 Elements with English/Hindi Support
const ELEMENTS_DATA = [
    { n: 1, s: "H", en: "Hydrogen", hi: "हाइड्रोजन", m: 1.008, c: "nonmetal", p: 1, g: 1, b: "s", ec: "1s¹", en_v: 2.20, mp: -259.16, bp: -252.87, d: 0.00009, st: "gas", db: { en: "Henry Cavendish", hi: "हेनरी कैवेंडिश" }, y: 1766, f: { en: "Most abundant element in universe!", hi: "ब्रह्मांड में सबसे प्रचुर तत्व!" } },
    { n: 2, s: "He", en: "Helium", hi: "हीलियम", m: 4.003, c: "noble-gas", p: 1, g: 18, b: "s", ec: "1s²", en_v: null, mp: -272.2, bp: -268.93, d: 0.00018, st: "gas", db: { en: "Pierre Janssen", hi: "पियरे जेनसेन" }, y: 1868, f: { en: "Second lightest element, used in balloons!", hi: "दूसरा सबसे हल्का तत्व, गुब्बारों में प्रयोग!" } },
    { n: 3, s: "Li", en: "Lithium", hi: "लिथियम", m: 6.94, c: "alkali-metal", p: 2, g: 1, b: "s", ec: "[He]2s¹", en_v: 0.98, mp: 180.54, bp: 1342, d: 0.534, st: "solid", db: { en: "Johan Arfwedson", hi: "योहान आर्फवेडसन" }, y: 1817, f: { en: "Lightest metal, used in batteries!", hi: "सबसे हल्की धातु, बैटरियों में प्रयोग!" } },
    { n: 4, s: "Be", en: "Beryllium", hi: "बेरिलियम", m: 9.012, c: "alkaline-earth", p: 2, g: 2, b: "s", ec: "[He]2s²", en_v: 1.57, mp: 1287, bp: 2470, d: 1.85, st: "solid", db: { en: "Louis Nicolas Vauquelin", hi: "लुई निकोलस वोकेलिन" }, y: 1798, f: { en: "Used in aerospace materials!", hi: "एयरोस्पेस सामग्री में प्रयोग!" } },
    { n: 5, s: "B", en: "Boron", hi: "बोरॉन", m: 10.81, c: "metalloid", p: 2, g: 13, b: "p", ec: "[He]2s²2p¹", en_v: 2.04, mp: 2077, bp: 4000, d: 2.34, st: "solid", db: { en: "Joseph Gay-Lussac", hi: "जोसेफ गे-लुसाक" }, y: 1808, f: { en: "Used in heat-resistant glass!", hi: "गर्मी प्रतिरोधी कांच में प्रयोग!" } },
    { n: 6, s: "C", en: "Carbon", hi: "कार्बन", m: 12.011, c: "nonmetal", p: 2, g: 14, b: "p", ec: "[He]2s²2p²", en_v: 2.55, mp: 3550, bp: 4027, d: 2.267, st: "solid", db: { en: "Ancient", hi: "प्राचीन" }, y: -3750, f: { en: "Basis of all life on Earth!", hi: "पृथ्वी पर सभी जीवन का आधार!" } },
    { n: 7, s: "N", en: "Nitrogen", hi: "नाइट्रोजन", m: 14.007, c: "nonmetal", p: 2, g: 15, b: "p", ec: "[He]2s²2p³", en_v: 3.04, mp: -210.1, bp: -195.79, d: 0.00125, st: "gas", db: { en: "Daniel Rutherford", hi: "डेनियल रदरफोर्ड" }, y: 1772, f: { en: "Makes up 78% of Earth's atmosphere!", hi: "पृथ्वी के वायुमंडल का 78%!" } },
    { n: 8, s: "O", en: "Oxygen", hi: "ऑक्सीजन", m: 15.999, c: "nonmetal", p: 2, g: 16, b: "p", ec: "[He]2s²2p⁴", en_v: 3.44, mp: -218.79, bp: -182.95, d: 0.00143, st: "gas", db: { en: "Joseph Priestley", hi: "जोसेफ प्रीस्टली" }, y: 1774, f: { en: "Essential for breathing and combustion!", hi: "श्वास और दहन के लिए आवश्यक!" } },
    { n: 9, s: "F", en: "Fluorine", hi: "फ्लोरीन", m: 18.998, c: "halogen", p: 2, g: 17, b: "p", ec: "[He]2s²2p⁵", en_v: 3.98, mp: -219.67, bp: -188.12, d: 0.0017, st: "gas", db: { en: "Henri Moissan", hi: "हेनरी मोइसां" }, y: 1886, f: { en: "Most reactive element!", hi: "सबसे प्रतिक्रियाशील तत्व!" } },
    { n: 10, s: "Ne", en: "Neon", hi: "नियॉन", m: 20.18, c: "noble-gas", p: 2, g: 18, b: "p", ec: "[He]2s²2p⁶", en_v: null, mp: -248.59, bp: -246.08, d: 0.0009, st: "gas", db: { en: "William Ramsay", hi: "विलियम रैमसे" }, y: 1898, f: { en: "Used in glowing neon signs!", hi: "चमकदार नियॉन साइन में प्रयोग!" } },
    { n: 11, s: "Na", en: "Sodium", hi: "सोडियम", m: 22.99, c: "alkali-metal", p: 3, g: 1, b: "s", ec: "[Ne]3s¹", en_v: 0.93, mp: 97.72, bp: 883, d: 0.97, st: "solid", db: { en: "Humphry Davy", hi: "हम्फ्री डेवी" }, y: 1807, f: { en: "Essential for nerve function!", hi: "तंत्रिका कार्य के लिए आवश्यक!" } },
    { n: 12, s: "Mg", en: "Magnesium", hi: "मैग्नीशियम", m: 24.305, c: "alkaline-earth", p: 3, g: 2, b: "s", ec: "[Ne]3s²", en_v: 1.31, mp: 650, bp: 1090, d: 1.74, st: "solid", db: { en: "Joseph Black", hi: "जोसेफ ब्लैक" }, y: 1755, f: { en: "Burns with bright white flame!", hi: "चमकदार सफेद लौ से जलता है!" } },
    { n: 13, s: "Al", en: "Aluminium", hi: "एल्युमिनियम", m: 26.982, c: "post-transition", p: 3, g: 13, b: "p", ec: "[Ne]3s²3p¹", en_v: 1.61, mp: 660.32, bp: 2519, d: 2.7, st: "solid", db: { en: "Hans Christian Ørsted", hi: "हैंस क्रिश्चियन ऑर्स्टेड" }, y: 1825, f: { en: "Most abundant metal in Earth's crust!", hi: "पृथ्वी की पपड़ी में सबसे प्रचुर धातु!" } },
    { n: 14, s: "Si", en: "Silicon", hi: "सिलिकॉन", m: 28.085, c: "metalloid", p: 3, g: 14, b: "p", ec: "[Ne]3s²3p²", en_v: 1.9, mp: 1414, bp: 3265, d: 2.33, st: "solid", db: { en: "Jöns Jacob Berzelius", hi: "जोंस जैकब बर्जेलियस" }, y: 1824, f: { en: "Used in computer chips!", hi: "कंप्यूटर चिप्स में प्रयोग!" } },
    { n: 15, s: "P", en: "Phosphorus", hi: "फॉस्फोरस", m: 30.974, c: "nonmetal", p: 3, g: 15, b: "p", ec: "[Ne]3s²3p³", en_v: 2.19, mp: 44.15, bp: 280.5, d: 1.82, st: "solid", db: { en: "Hennig Brand", hi: "हेनिग ब्रांड" }, y: 1669, f: { en: "Glows in the dark!", hi: "अंधेरे में चमकता है!" } },
    { n: 16, s: "S", en: "Sulfur", hi: "सल्फर", m: 32.06, c: "nonmetal", p: 3, g: 16, b: "p", ec: "[Ne]3s²3p⁴", en_v: 2.58, mp: 115.21, bp: 444.6, d: 2.07, st: "solid", db: { en: "Ancient", hi: "प्राचीन" }, y: -2000, f: { en: "Known since ancient times!", hi: "प्राचीन काल से ज्ञात!" } },
    { n: 17, s: "Cl", en: "Chlorine", hi: "क्लोरीन", m: 35.45, c: "halogen", p: 3, g: 17, b: "p", ec: "[Ne]3s²3p⁵", en_v: 3.16, mp: -101.5, bp: -34.04, d: 0.0032, st: "gas", db: { en: "Carl Wilhelm Scheele", hi: "कार्ल विल्हेम शीले" }, y: 1774, f: { en: "Used to purify water!", hi: "पानी शुद्ध करने में प्रयोग!" } },
    { n: 18, s: "Ar", en: "Argon", hi: "आर्गन", m: 39.948, c: "noble-gas", p: 3, g: 18, b: "p", ec: "[Ne]3s²3p⁶", en_v: null, mp: -189.35, bp: -185.85, d: 0.0018, st: "gas", db: { en: "Lord Rayleigh", hi: "लॉर्ड रेले" }, y: 1894, f: { en: "Third most abundant gas in atmosphere!", hi: "वायुमंडल में तीसरी सबसे प्रचुर गैस!" } },
    { n: 19, s: "K", en: "Potassium", hi: "पोटैशियम", m: 39.098, c: "alkali-metal", p: 4, g: 1, b: "s", ec: "[Ar]4s¹", en_v: 0.82, mp: 63.38, bp: 759, d: 0.89, st: "solid", db: { en: "Humphry Davy", hi: "हम्फ्री डेवी" }, y: 1807, f: { en: "Essential for muscle function!", hi: "मांसपेशियों के कार्य के लिए आवश्यक!" } },
    { n: 20, s: "Ca", en: "Calcium", hi: "कैल्शियम", m: 40.078, c: "alkaline-earth", p: 4, g: 2, b: "s", ec: "[Ar]4s²", en_v: 1.0, mp: 842, bp: 1484, d: 1.54, st: "solid", db: { en: "Humphry Davy", hi: "हम्फ्री डेवी" }, y: 1808, f: { en: "Builds strong bones and teeth!", hi: "मजबूत हड्डियां और दांत बनाता है!" } }
];
// Continue with elements 21-118...
const ELEMENTS_21_40 = [
    { n: 21, s: "Sc", en: "Scandium", hi: "स्कैंडियम", m: 44.956, c: "transition-metal", p: 4, g: 3, b: "d", ec: "[Ar]3d¹4s²", en_v: 1.36, mp: 1541, bp: 2836, d: 2.99, st: "solid", db: { en: "Lars Fredrik Nilson", hi: "लार्स फ्रेड्रिक निल्सन" }, y: 1879, f: { en: "Used in aerospace alloys!", hi: "एयरोस्पेस मिश्र धातुओं में प्रयोग!" } },
    { n: 22, s: "Ti", en: "Titanium", hi: "टाइटेनियम", m: 47.867, c: "transition-metal", p: 4, g: 4, b: "d", ec: "[Ar]3d²4s²", en_v: 1.54, mp: 1668, bp: 3287, d: 4.5, st: "solid", db: { en: "William Gregor", hi: "विलियम ग्रेगर" }, y: 1791, f: { en: "Strong as steel but half the weight!", hi: "स्टील जितना मजबूत लेकिन आधा वजन!" } },
    { n: 23, s: "V", en: "Vanadium", hi: "वैनेडियम", m: 50.942, c: "transition-metal", p: 4, g: 5, b: "d", ec: "[Ar]3d³4s²", en_v: 1.63, mp: 1910, bp: 3407, d: 6.0, st: "solid", db: { en: "Andrés Manuel del Río", hi: "आंद्रेस मैनुएल डेल रियो" }, y: 1801, f: { en: "Used to make rust-resistant steel!", hi: "जंग प्रतिरोधी स्टील बनाने में प्रयोग!" } },
    { n: 24, s: "Cr", en: "Chromium", hi: "क्रोमियम", m: 51.996, c: "transition-metal", p: 4, g: 6, b: "d", ec: "[Ar]3d⁵4s¹", en_v: 1.66, mp: 1907, bp: 2671, d: 7.15, st: "solid", db: { en: "Louis Nicolas Vauquelin", hi: "लुई निकोलस वोकेलिन" }, y: 1797, f: { en: "Makes stainless steel shiny!", hi: "स्टेनलेस स्टील को चमकदार बनाता है!" } },
    { n: 25, s: "Mn", en: "Manganese", hi: "मैंगनीज", m: 54.938, c: "transition-metal", p: 4, g: 7, b: "d", ec: "[Ar]3d⁵4s²", en_v: 1.55, mp: 1246, bp: 2061, d: 7.3, st: "solid", db: { en: "Johan Gottlieb Gahn", hi: "योहान गोटलिब गान" }, y: 1774, f: { en: "Essential for bone health!", hi: "हड्डियों के स्वास्थ्य के लिए आवश्यक!" } },
    { n: 26, s: "Fe", en: "Iron", hi: "लोहा", m: 55.845, c: "transition-metal", p: 4, g: 8, b: "d", ec: "[Ar]3d⁶4s²", en_v: 1.83, mp: 1538, bp: 2861, d: 7.87, st: "solid", db: { en: "Ancient", hi: "प्राचीन" }, y: -5000, f: { en: "Most used metal in the world!", hi: "दुनिया में सबसे ज्यादा इस्तेमाल होने वाली धातु!" } },
    { n: 27, s: "Co", en: "Cobalt", hi: "कोबाल्ट", m: 58.933, c: "transition-metal", p: 4, g: 9, b: "d", ec: "[Ar]3d⁷4s²", en_v: 1.88, mp: 1495, bp: 2927, d: 8.86, st: "solid", db: { en: "Georg Brandt", hi: "जॉर्ज ब्रांट" }, y: 1735, f: { en: "Gives blue color to glass!", hi: "कांच को नीला रंग देता है!" } },
    { n: 28, s: "Ni", en: "Nickel", hi: "निकल", m: 58.693, c: "transition-metal", p: 4, g: 10, b: "d", ec: "[Ar]3d⁸4s²", en_v: 1.91, mp: 1455, bp: 2913, d: 8.9, st: "solid", db: { en: "Axel Fredrik Cronstedt", hi: "एक्सेल फ्रेड्रिक क्रोनस्टेड" }, y: 1751, f: { en: "Used in coins worldwide!", hi: "दुनिया भर में सिक्कों में प्रयोग!" } },
    { n: 29, s: "Cu", en: "Copper", hi: "तांबा", m: 63.546, c: "transition-metal", p: 4, g: 11, b: "d", ec: "[Ar]3d¹⁰4s¹", en_v: 1.9, mp: 1084.62, bp: 2560, d: 8.96, st: "solid", db: { en: "Ancient", hi: "प्राचीन" }, y: -9000, f: { en: "Best electrical conductor after silver!", hi: "चांदी के बाद सबसे अच्छा विद्युत चालक!" } },
    { n: 30, s: "Zn", en: "Zinc", hi: "जस्ता", m: 65.38, c: "transition-metal", p: 4, g: 12, b: "d", ec: "[Ar]3d¹⁰4s²", en_v: 1.65, mp: 419.53, bp: 907, d: 7.14, st: "solid", db: { en: "Andreas Marggraf", hi: "एंड्रियास मार्ग्राफ" }, y: 1746, f: { en: "Protects steel from rusting!", hi: "स्टील को जंग से बचाता है!" } },
    { n: 31, s: "Ga", en: "Gallium", hi: "गैलियम", m: 69.723, c: "post-transition", p: 4, g: 13, b: "p", ec: "[Ar]3d¹⁰4s²4p¹", en_v: 1.81, mp: 29.76, bp: 2204, d: 5.91, st: "solid", db: { en: "Paul Emile Lecoq de Boisbaudran", hi: "पॉल एमिल लेकोक डी बोइसबौड्रन" }, y: 1875, f: { en: "Melts in your hand!", hi: "आपके हाथ में पिघल जाता है!" } },
    { n: 32, s: "Ge", en: "Germanium", hi: "जर्मेनियम", m: 72.63, c: "metalloid", p: 4, g: 14, b: "p", ec: "[Ar]3d¹⁰4s²4p²", en_v: 2.01, mp: 938.25, bp: 2833, d: 5.32, st: "solid", db: { en: "Clemens Winkler", hi: "क्लेमेंस विंकलर" }, y: 1886, f: { en: "Used in fiber optics!", hi: "फाइबर ऑप्टिक्स में प्रयोग!" } },
    { n: 33, s: "As", en: "Arsenic", hi: "आर्सेनिक", m: 74.922, c: "metalloid", p: 4, g: 15, b: "p", ec: "[Ar]3d¹⁰4s²4p³", en_v: 2.18, mp: 817, bp: 614, d: 5.78, st: "solid", db: { en: "Albertus Magnus", hi: "अल्बर्टस मैग्नस" }, y: 1250, f: { en: "Famous poison in history!", hi: "इतिहास में प्रसिद्ध जहर!" } },
    { n: 34, s: "Se", en: "Selenium", hi: "सेलेनियम", m: 78.971, c: "nonmetal", p: 4, g: 16, b: "p", ec: "[Ar]3d¹⁰4s²4p⁴", en_v: 2.55, mp: 221, bp: 685, d: 4.81, st: "solid", db: { en: "Jöns Jacob Berzelius", hi: "जोंस जैकब बर्जेलियस" }, y: 1817, f: { en: "Named after the Moon!", hi: "चंद्रमा के नाम पर!" } },
    { n: 35, s: "Br", en: "Bromine", hi: "ब्रोमीन", m: 79.904, c: "halogen", p: 4, g: 17, b: "p", ec: "[Ar]3d¹⁰4s²4p⁵", en_v: 2.96, mp: -7.2, bp: 58.8, d: 3.1, st: "liquid", db: { en: "Antoine Jérôme Balard", hi: "एंटोनी जेरोम बालार्ड" }, y: 1826, f: { en: "Only nonmetal liquid at room temp!", hi: "कमरे के तापमान पर एकमात्र अधातु तरल!" } },
    { n: 36, s: "Kr", en: "Krypton", hi: "क्रिप्टन", m: 83.798, c: "noble-gas", p: 4, g: 18, b: "p", ec: "[Ar]3d¹⁰4s²4p⁶", en_v: 3.0, mp: -157.36, bp: -153.22, d: 0.0037, st: "gas", db: { en: "William Ramsay", hi: "विलियम रैमसे" }, y: 1898, f: { en: "Superman's home planet Krypton!", hi: "सुपरमैन का गृह ग्रह क्रिप्टन!" } },
    { n: 37, s: "Rb", en: "Rubidium", hi: "रुबिडियम", m: 85.468, c: "alkali-metal", p: 5, g: 1, b: "s", ec: "[Kr]5s¹", en_v: 0.82, mp: 39.31, bp: 688, d: 1.53, st: "solid", db: { en: "Robert Bunsen", hi: "रॉबर्ट बन्सेन" }, y: 1861, f: { en: "Used in atomic clocks!", hi: "परमाणु घड़ियों में प्रयोग!" } },
    { n: 38, s: "Sr", en: "Strontium", hi: "स्ट्रोंटियम", m: 87.62, c: "alkaline-earth", p: 5, g: 2, b: "s", ec: "[Kr]5s²", en_v: 0.95, mp: 777, bp: 1382, d: 2.64, st: "solid", db: { en: "Adair Crawford", hi: "अदैर क्रॉफर्ड" }, y: 1790, f: { en: "Makes red fireworks!", hi: "लाल आतिशबाजी बनाता है!" } },
    { n: 39, s: "Y", en: "Yttrium", hi: "इट्रियम", m: 88.906, c: "transition-metal", p: 5, g: 3, b: "d", ec: "[Kr]4d¹5s²", en_v: 1.22, mp: 1526, bp: 3345, d: 4.47, st: "solid", db: { en: "Johan Gadolin", hi: "योहान गैडोलिन" }, y: 1794, f: { en: "Used in LED lights!", hi: "LED लाइट्स में प्रयोग!" } },
    { n: 40, s: "Zr", en: "Zirconium", hi: "जिर्कोनियम", m: 91.224, c: "transition-metal", p: 5, g: 4, b: "d", ec: "[Kr]4d²5s²", en_v: 1.33, mp: 1855, bp: 4409, d: 6.52, st: "solid", db: { en: "Martin Heinrich Klaproth", hi: "मार्टिन हेनरिक क्लाप्रोथ" }, y: 1789, f: { en: "Used in nuclear reactors!", hi: "परमाणु रिएक्टरों में प्रयोग!" } }
];
// Combine arrays
ELEMENTS_DATA.push(...ELEMENTS_21_40);
// Elements 41-118 in next chunk...

// Elements 41-80
const ELEMENTS_41_80 = [
  {n:41,s:"Nb",en:"Niobium",hi:"नाइओबियम",m:92.906,c:"transition-metal",p:5,g:5,b:"d",ec:"[Kr]4d⁴5s¹",en_v:1.6,mp:2477,bp:4744,d:8.57,st:"solid",db:{en:"Charles Hatchett",hi:"चार्ल्स हैचेट"},y:1801,f:{en:"Used in jet engines!",hi:"जेट इंजन में प्रयोग!"}},
  {n:42,s:"Mo",en:"Molybdenum",hi:"मॉलिब्डेनम",m:95.95,c:"transition-metal",p:5,g:6,b:"d",ec:"[Kr]4d⁵5s¹",en_v:2.16,mp:2623,bp:4639,d:10.2,st:"solid",db:{en:"Carl Wilhelm Scheele",hi:"कार्ल विल्हेम शीले"},y:1778,f:{en:"Essential for plant growth!",hi:"पौधों के विकास के लिए आवश्यक!"}},
  {n:43,s:"Tc",en:"Technetium",hi:"टेक्नेटियम",m:98,c:"transition-metal",p:5,g:7,b:"d",ec:"[Kr]4d⁵5s²",en_v:1.9,mp:2157,bp:4265,d:11,st:"solid",db:{en:"Emilio Segrè",hi:"एमिलियो सेग्रे"},y:1937,f:{en:"First artificially made element!",hi:"पहला कृत्रिम रूप से बनाया गया तत्व!"}},
  {n:44,s:"Ru",en:"Ruthenium",hi:"रुथेनियम",m:101.07,c:"transition-metal",p:5,g:8,b:"d",ec:"[Kr]4d⁷5s¹",en_v:2.2,mp:2334,bp:4150,d:12.1,st:"solid",db:{en:"Karl Ernst Claus",hi:"कार्ल अर्न्स्ट क्लॉस"},y:1844,f:{en:"Named after Russia!",hi:"रूस के नाम पर!"}},
  {n:45,s:"Rh",en:"Rhodium",hi:"रोडियम",m:102.91,c:"transition-metal",p:5,g:9,b:"d",ec:"[Kr]4d⁸5s¹",en_v:2.28,mp:1964,bp:3695,d:12.4,st:"solid",db:{en:"William Hyde Wollaston",hi:"विलियम हाइड वोलास्टन"},y:1803,f:{en:"Most expensive precious metal!",hi:"सबसे महंगी कीमती धातु!"}},
  {n:46,s:"Pd",en:"Palladium",hi:"पैलेडियम",m:106.42,c:"transition-metal",p:5,g:10,b:"d",ec:"[Kr]4d¹⁰",en_v:2.2,mp:1555,bp:2963,d:12.0,st:"solid",db:{en:"William Hyde Wollaston",hi:"विलियम हाइड वोलास्टन"},y:1803,f:{en:"Used in catalytic converters!",hi:"उत्प्रेरक कन्वर्टर्स में प्रयोग!"}},
  {n:47,s:"Ag",en:"Silver",hi:"चाँदी",m:107.87,c:"transition-metal",p:5,g:11,b:"d",ec:"[Kr]4d¹⁰5s¹",en_v:1.93,mp:961.78,bp:2162,d:10.5,st:"solid",db:{en:"Ancient",hi:"प्राचीन"},y:-5000,f:{en:"Best conductor of electricity!",hi:"बिजली का सबसे अच्छा चालक!"}},
  {n:48,s:"Cd",en:"Cadmium",hi:"कैडमियम",m:112.41,c:"transition-metal",p:5,g:12,b:"d",ec:"[Kr]4d¹⁰5s²",en_v:1.69,mp:321.07,bp:767,d:8.69,st:"solid",db:{en:"Karl Samuel Leberecht Hermann",hi:"कार्ल सैमुअल लेबरेक्ट हर्मन"},y:1817,f:{en:"Used in rechargeable batteries!",hi:"रिचार्जेबल बैटरी में प्रयोग!"}},
  {n:49,s:"In",en:"Indium",hi:"इंडियम",m:114.82,c:"post-transition",p:5,g:13,b:"p",ec:"[Kr]4d¹⁰5s²5p¹",en_v:1.78,mp:156.6,bp:2072,d:7.31,st:"solid",db:{en:"Ferdinand Reich",hi:"फर्डिनेंड रीख"},y:1863,f:{en:"Soft enough to cut with knife!",hi:"चाकू से काटने जितना नरम!"}},
  {n:50,s:"Sn",en:"Tin",hi:"टिन",m:118.71,c:"post-transition",p:5,g:14,b:"p",ec:"[Kr]4d¹⁰5s²5p²",en_v:1.96,mp:231.93,bp:2602,d:7.29,st:"solid",db:{en:"Ancient",hi:"प्राचीन"},y:-3500,f:{en:"Used to make bronze since ancient times!",hi:"प्राचीन काल से कांस्य बनाने में!"}},
  {n:51,s:"Sb",en:"Antimony",hi:"एंटीमनी",m:121.76,c:"metalloid",p:5,g:15,b:"p",ec:"[Kr]4d¹⁰5s²5p³",en_v:2.05,mp:630.63,bp:1587,d:6.68,st:"solid",db:{en:"Ancient",hi:"प्राचीन"},y:-3000,f:{en:"Used in flame retardants!",hi:"ज्वाला मंदक में प्रयोग!"}},
  {n:52,s:"Te",en:"Tellurium",hi:"टेलुरियम",m:127.6,c:"metalloid",p:5,g:16,b:"p",ec:"[Kr]4d¹⁰5s²5p⁴",en_v:2.1,mp:449.51,bp:988,d:6.24,st:"solid",db:{en:"Franz-Joseph Müller von Reichenstein",hi:"फ्रांज-जोसेफ मुलर वॉन रीचेनस्टीन"},y:1782,f:{en:"Named after Earth (Tellus)!",hi:"पृथ्वी (टेलस) के नाम पर!"}},
  {n:53,s:"I",en:"Iodine",hi:"आयोडीन",m:126.9,c:"halogen",p:5,g:17,b:"p",ec:"[Kr]4d¹⁰5s²5p⁵",en_v:2.66,mp:113.7,bp:184.4,d:4.93,st:"solid",db:{en:"Bernard Courtois",hi:"बर्नार्ड कौर्टोइस"},y:1811,f:{en:"Essential for thyroid health!",hi:"थायरॉयड स्वास्थ्य के लिए आवश्यक!"}},
  {n:54,s:"Xe",en:"Xenon",hi:"ज़ेनॉन",m:131.29,c:"noble-gas",p:5,g:18,b:"p",ec:"[Kr]4d¹⁰5s²5p⁶",en_v:2.6,mp:-111.75,bp:-108.09,d:0.0059,st:"gas",db:{en:"William Ramsay",hi:"विलियम रैमसे"},y:1898,f:{en:"Used in camera flashes!",hi:"कैमरा फ्लैश में प्रयोग!"}},
  {n:55,s:"Cs",en:"Cesium",hi:"सीज़ियम",m:132.91,c:"alkali-metal",p:6,g:1,b:"s",ec:"[Xe]6s¹",en_v:0.79,mp:28.44,bp:671,d:1.93,st:"solid",db:{en:"Robert Bunsen",hi:"रॉबर्ट बन्सेन"},y:1860,f:{en:"Used to define the second!",hi:"सेकंड को परिभाषित करने में प्रयोग!"}},
  {n:56,s:"Ba",en:"Barium",hi:"बेरियम",m:137.33,c:"alkaline-earth",p:6,g:2,b:"s",ec:"[Xe]6s²",en_v:0.89,mp:727,bp:1897,d:3.62,st:"solid",db:{en:"Carl Wilhelm Scheele",hi:"कार्ल विल्हेम शीले"},y:1772,f:{en:"Makes green fireworks!",hi:"हरी आतिशबाजी बनाता है!"}},
  {n:57,s:"La",en:"Lanthanum",hi:"लैंथनम",m:138.91,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]5d¹6s²",en_v:1.1,mp:920,bp:3464,d:6.15,st:"solid",db:{en:"Carl Gustaf Mosander",hi:"कार्ल गुस्ताफ मोसांडर"},y:1839,f:{en:"First of the lanthanides!",hi:"लैंथेनाइड्स में पहला!"}},
  {n:58,s:"Ce",en:"Cerium",hi:"सेरियम",m:140.12,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f¹5d¹6s²",en_v:1.12,mp:795,bp:3443,d:6.77,st:"solid",db:{en:"Jöns Jacob Berzelius",hi:"जोंस जैकब बर्जेलियस"},y:1803,f:{en:"Used in self-cleaning ovens!",hi:"सेल्फ-क्लीनिंग ओवन में प्रयोग!"}},
  {n:59,s:"Pr",en:"Praseodymium",hi:"प्रासियोडाइमियम",m:140.91,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f³6s²",en_v:1.13,mp:931,bp:3520,d:6.77,st:"solid",db:{en:"Carl Auer von Welsbach",hi:"कार्ल ऑयर वॉन वेल्सबाक"},y:1885,f:{en:"Makes aircraft engines stronger!",hi:"विमान इंजन को मजबूत बनाता है!"}},
  {n:60,s:"Nd",en:"Neodymium",hi:"नियोडाइमियम",m:144.24,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f⁴6s²",en_v:1.14,mp:1024,bp:3074,d:7.01,st:"solid",db:{en:"Carl Auer von Welsbach",hi:"कार्ल ऑयर वॉन वेल्सबाक"},y:1885,f:{en:"Makes the strongest permanent magnets!",hi:"सबसे मजबूत स्थायी चुंबक बनाता है!"}},
  {n:61,s:"Pm",en:"Promethium",hi:"प्रोमेथियम",m:145,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f⁵6s²",en_v:1.13,mp:1042,bp:3000,d:7.26,st:"solid",db:{en:"Chien Shiung Wu",hi:"चिएन शियुंग वू"},y:1945,f:{en:"Only radioactive lanthanide!",hi:"एकमात्र रेडियोधर्मी लैंथेनाइड!"}},
  {n:62,s:"Sm",en:"Samarium",hi:"समेरियम",m:150.36,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f⁶6s²",en_v:1.17,mp:1072,bp:1900,d:7.52,st:"solid",db:{en:"Paul Émile Lecoq de Boisbaudran",hi:"पॉल एमिल लेकोक डी बोइसबौड्रन"},y:1879,f:{en:"Used in cancer treatment!",hi:"कैंसर उपचार में प्रयोग!"}},
  {n:63,s:"Eu",en:"Europium",hi:"यूरोपियम",m:151.96,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f⁷6s²",en_v:1.2,mp:822,bp:1529,d:5.24,st:"solid",db:{en:"Eugène-Anatole Demarçay",hi:"यूजीन-अनातोल डेमार्से"},y:1901,f:{en:"Makes euro banknotes glow!",hi:"यूरो नोटों को चमकाता है!"}},
  {n:64,s:"Gd",en:"Gadolinium",hi:"गैडोलिनियम",m:157.25,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f⁷5d¹6s²",en_v:1.2,mp:1313,bp:3273,d:7.9,st:"solid",db:{en:"Jean Charles Galissard de Marignac",hi:"जीन चार्ल्स गैलिसार्ड डी मरिग्नाक"},y:1880,f:{en:"Used in MRI scans!",hi:"MRI स्कैन में प्रयोग!"}},
  {n:65,s:"Tb",en:"Terbium",hi:"टर्बियम",m:158.93,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f⁹6s²",en_v:1.2,mp:1356,bp:3230,d:8.23,st:"solid",db:{en:"Carl Gustaf Mosander",hi:"कार्ल गुस्ताफ मोसांडर"},y:1843,f:{en:"Makes green phosphors in TVs!",hi:"TV में हरे फॉस्फोर बनाता है!"}},
  {n:66,s:"Dy",en:"Dysprosium",hi:"डिस्प्रोसियम",m:162.5,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f¹⁰6s²",en_v:1.22,mp:1412,bp:2567,d:8.55,st:"solid",db:{en:"Paul Émile Lecoq de Boisbaudran",hi:"पॉल एमिल लेकोक डी बोइसबौड्रन"},y:1886,f:{en:"Has highest magnetic strength!",hi:"सबसे अधिक चुंबकीय शक्ति!"}},
  {n:67,s:"Ho",en:"Holmium",hi:"होल्मियम",m:164.93,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f¹¹6s²",en_v:1.23,mp:1474,bp:2700,d:8.8,st:"solid",db:{en:"Per Teodor Cleve",hi:"पेर टियोडोर क्लीव"},y:1878,f:{en:"Named after Stockholm!",hi:"स्टॉकहोम के नाम पर!"}},
  {n:68,s:"Er",en:"Erbium",hi:"एर्बियम",m:167.26,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f¹²6s²",en_v:1.24,mp:1529,bp:2868,d:9.07,st:"solid",db:{en:"Carl Gustaf Mosander",hi:"कार्ल गुस्ताफ मोसांडर"},y:1843,f:{en:"Amplifies fiber optic signals!",hi:"फाइबर ऑप्टिक सिग्नल बढ़ाता है!"}},
  {n:69,s:"Tm",en:"Thulium",hi:"थुलियम",m:168.93,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f¹³6s²",en_v:1.25,mp:1545,bp:1950,d:9.32,st:"solid",db:{en:"Per Teodor Cleve",hi:"पेर टियोडोर क्लीव"},y:1879,f:{en:"Rarest naturally occurring lanthanide!",hi:"सबसे दुर्लभ प्राकृतिक लैंथेनाइड!"}},
  {n:70,s:"Yb",en:"Ytterbium",hi:"इटर्बियम",m:173.05,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f¹⁴6s²",en_v:1.1,mp:824,bp:1196,d:6.9,st:"solid",db:{en:"Jean Charles Galissard de Marignac",hi:"जीन चार्ल्स गैलिसार्ड डी मरिग्नाक"},y:1878,f:{en:"Could improve atomic clocks!",hi:"परमाणु घड़ियों को बेहतर बना सकता है!"}},
  {n:71,s:"Lu",en:"Lutetium",hi:"ल्यूटेटियम",m:174.97,c:"lanthanide",p:6,g:3,b:"f",ec:"[Xe]4f¹⁴5d¹6s²",en_v:1.27,mp:1663,bp:3402,d:9.84,st:"solid",db:{en:"Georges Urbain",hi:"जॉर्ज उर्बैन"},y:1907,f:{en:"Last of the lanthanides!",hi:"लैंथेनाइड्स में आखिरी!"}},
  {n:72,s:"Hf",en:"Hafnium",hi:"हेफ्नियम",m:178.49,c:"transition-metal",p:6,g:4,b:"d",ec:"[Xe]4f¹⁴5d²6s²",en_v:1.3,mp:2233,bp:4603,d:13.3,st:"solid",db:{en:"Dirk Coster",hi:"डिर्क कोस्टर"},y:1923,f:{en:"Used in nuclear submarines!",hi:"परमाणु पनडुब्बियों में प्रयोग!"}},
  {n:73,s:"Ta",en:"Tantalum",hi:"टैंटलम",m:180.95,c:"transition-metal",p:6,g:5,b:"d",ec:"[Xe]4f¹⁴5d³6s²",en_v:1.5,mp:3017,bp:5458,d:16.4,st:"solid",db:{en:"Anders Gustaf Ekeberg",hi:"एंडर्स गुस्ताफ एकेबर्ग"},y:1802,f:{en:"Used in mobile phone capacitors!",hi:"मोबाइल फोन कैपेसिटर में प्रयोग!"}},
  {n:74,s:"W",en:"Tungsten",hi:"टंग्स्टन",m:183.84,c:"transition-metal",p:6,g:6,b:"d",ec:"[Xe]4f¹⁴5d⁴6s²",en_v:2.36,mp:3422,bp:5555,d:19.3,st:"solid",db:{en:"Juan José Elhuyar",hi:"जुआन जोस एलुयार"},y:1783,f:{en:"Highest melting point of all metals!",hi:"सभी धातुओं में सबसे उच्च गलनांक!"}},
  {n:75,s:"Re",en:"Rhenium",hi:"रेनियम",m:186.21,c:"transition-metal",p:6,g:7,b:"d",ec:"[Xe]4f¹⁴5d⁵6s²",en_v:1.9,mp:3186,bp:5596,d:21.0,st:"solid",db:{en:"Masataka Ogawa",hi:"मासाताका ओगावा"},y:1925,f:{en:"Last stable element discovered!",hi:"खोजा गया अंतिम स्थिर तत्व!"}},
  {n:76,s:"Os",en:"Osmium",hi:"ऑस्मियम",m:190.23,c:"transition-metal",p:6,g:8,b:"d",ec:"[Xe]4f¹⁴5d⁶6s²",en_v:2.2,mp:3033,bp:5012,d:22.59,st:"solid",db:{en:"Smithson Tennant",hi:"स्मिथसन टेनेंट"},y:1803,f:{en:"Densest naturally occurring element!",hi:"सबसे घना प्राकृतिक तत्व!"}},
  {n:77,s:"Ir",en:"Iridium",hi:"इरीडियम",m:192.22,c:"transition-metal",p:6,g:9,b:"d",ec:"[Xe]4f¹⁴5d⁷6s²",en_v:2.2,mp:2466,bp:4428,d:22.56,st:"solid",db:{en:"Smithson Tennant",hi:"स्मिथसन टेनेंट"},y:1803,f:{en:"Most corrosion-resistant metal!",hi:"सबसे अधिक जंग प्रतिरोधी धातु!"}},
  {n:78,s:"Pt",en:"Platinum",hi:"प्लैटिनम",m:195.08,c:"transition-metal",p:6,g:10,b:"d",ec:"[Xe]4f¹⁴5d⁹6s¹",en_v:2.28,mp:1768.3,bp:3825,d:21.5,st:"solid",db:{en:"Antonio de Ulloa",hi:"एंटोनियो डी उल्लोआ"},y:1735,f:{en:"More rare than gold!",hi:"सोने से अधिक दुर्लभ!"}},
  {n:79,s:"Au",en:"Gold",hi:"सोना",m:196.97,c:"transition-metal",p:6,g:11,b:"d",ec:"[Xe]4f¹⁴5d¹⁰6s¹",en_v:2.54,mp:1064.18,bp:2856,d:19.3,st:"solid",db:{en:"Ancient",hi:"प्राचीन"},y:-6000,f:{en:"Most malleable metal - 1g can be beaten to 1m²!",hi:"सबसे नम्य धातु - 1g को 1m² तक पीटा जा सकता है!"}},
  {n:80,s:"Hg",en:"Mercury",hi:"पारा",m:200.59,c:"transition-metal",p:6,g:12,b:"d",ec:"[Xe]4f¹⁴5d¹⁰6s²",en_v:2.0,mp:-38.83,bp:356.73,d:13.53,st:"liquid",db:{en:"Ancient",hi:"प्राचीन"},y:-1500,f:{en:"Only metal liquid at room temperature!",hi:"कमरे के तापमान पर एकमात्र तरल धातु!"}}
];
ELEMENTS_DATA.push(...ELEMENTS_41_80);

// Elements 81-118
const ELEMENTS_81_118 = [
  {n:81,s:"Tl",en:"Thallium",hi:"थैलियम",m:204.38,c:"post-transition",p:6,g:13,b:"p",ec:"[Xe]4f¹⁴5d¹⁰6s²6p¹",en_v:1.62,mp:304,bp:1473,d:11.8,st:"solid",db:{en:"William Crookes",hi:"विलियम क्रूक्स"},y:1861,f:{en:"Once used as rat poison!",hi:"एक बार चूहे के जहर के रूप में प्रयोग!"}},
  {n:82,s:"Pb",en:"Lead",hi:"सीसा",m:207.2,c:"post-transition",p:6,g:14,b:"p",ec:"[Xe]4f¹⁴5d¹⁰6s²6p²",en_v:2.33,mp:327.46,bp:1749,d:11.3,st:"solid",db:{en:"Ancient",hi:"प्राचीन"},y:-7000,f:{en:"Romans used it for plumbing!",hi:"रोमनों ने प्लंबिंग के लिए इस्तेमाल किया!"}},
  {n:83,s:"Bi",en:"Bismuth",hi:"बिस्मथ",m:208.98,c:"post-transition",p:6,g:15,b:"p",ec:"[Xe]4f¹⁴5d¹⁰6s²6p³",en_v:2.02,mp:271.4,bp:1564,d:9.79,st:"solid",db:{en:"Claude François Geoffroy",hi:"क्लाउड फ्रांस्वा जियोफ्रॉय"},y:1753,f:{en:"Forms beautiful rainbow crystals!",hi:"सुंदर इंद्रधनुषी क्रिस्टल बनाता है!"}},
  {n:84,s:"Po",en:"Polonium",hi:"पोलोनियम",m:209,c:"metalloid",p:6,g:16,b:"p",ec:"[Xe]4f¹⁴5d¹⁰6s²6p⁴",en_v:2.0,mp:254,bp:962,d:9.32,st:"solid",db:{en:"Marie Curie",hi:"मैरी क्यूरी"},y:1898,f:{en:"Named after Poland by Marie Curie!",hi:"मैरी क्यूरी द्वारा पोलैंड के नाम पर!"}},
  {n:85,s:"At",en:"Astatine",hi:"एस्टेटाइन",m:210,c:"halogen",p:6,g:17,b:"p",ec:"[Xe]4f¹⁴5d¹⁰6s²6p⁵",en_v:2.2,mp:302,bp:337,d:7,st:"solid",db:{en:"Dale R. Corson",hi:"डेल आर. कोर्सन"},y:1940,f:{en:"Rarest naturally occurring element!",hi:"सबसे दुर्लभ प्राकृतिक तत्व!"}},
  {n:86,s:"Rn",en:"Radon",hi:"राडोन",m:222,c:"noble-gas",p:6,g:18,b:"p",ec:"[Xe]4f¹⁴5d¹⁰6s²6p⁶",en_v:2.2,mp:-71,bp:-61.7,d:0.0097,st:"gas",db:{en:"Friedrich Ernst Dorn",hi:"फ्रेडरिक अर्न्स्ट डॉर्न"},y:1900,f:{en:"Radioactive gas found in homes!",hi:"घरों में पाई जाने वाली रेडियोधर्मी गैस!"}},
  {n:87,s:"Fr",en:"Francium",hi:"फ्रांसियम",m:223,c:"alkali-metal",p:7,g:1,b:"s",ec:"[Rn]7s¹",en_v:0.7,mp:27,bp:677,d:1.87,st:"solid",db:{en:"Marguerite Perey",hi:"मार्गरीट पेरी"},y:1939,f:{en:"Most unstable natural element!",hi:"सबसे अस्थिर प्राकृतिक तत्व!"}},
  {n:88,s:"Ra",en:"Radium",hi:"रेडियम",m:226,c:"alkaline-earth",p:7,g:2,b:"s",ec:"[Rn]7s²",en_v:0.9,mp:696,bp:1737,d:5.5,st:"solid",db:{en:"Marie Curie",hi:"मैरी क्यूरी"},y:1898,f:{en:"Glows blue in the dark!",hi:"अंधेरे में नीला चमकता है!"}},
  {n:89,s:"Ac",en:"Actinium",hi:"एक्टिनियम",m:227,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]6d¹7s²",en_v:1.1,mp:1050,bp:3200,d:10.07,st:"solid",db:{en:"André-Louis Debierne",hi:"आंद्रे-लुई डेबीर्न"},y:1899,f:{en:"First of the actinides!",hi:"एक्टिनाइड्स में पहला!"}},
  {n:90,s:"Th",en:"Thorium",hi:"थोरियम",m:232.04,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]6d²7s²",en_v:1.3,mp:1750,bp:4788,d:11.7,st:"solid",db:{en:"Jöns Jacob Berzelius",hi:"जोंस जैकब बर्जेलियस"},y:1829,f:{en:"Could power nuclear reactors!",hi:"परमाणु रिएक्टरों को शक्ति दे सकता है!"}},
  {n:91,s:"Pa",en:"Protactinium",hi:"प्रोटैक्टिनियम",m:231.04,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f²6d¹7s²",en_v:1.5,mp:1572,bp:4000,d:15.4,st:"solid",db:{en:"Kasimir Fajans",hi:"कासिमीर फजांस"},y:1913,f:{en:"One of rarest elements on Earth!",hi:"पृथ्वी पर सबसे दुर्लभ तत्वों में से एक!"}},
  {n:92,s:"U",en:"Uranium",hi:"यूरेनियम",m:238.03,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f³6d¹7s²",en_v:1.38,mp:1135,bp:4131,d:19.1,st:"solid",db:{en:"Martin Heinrich Klaproth",hi:"मार्टिन हेनरिक क्लाप्रोथ"},y:1789,f:{en:"Powers nuclear power plants!",hi:"परमाणु ऊर्जा संयंत्रों को शक्ति देता है!"}},
  {n:93,s:"Np",en:"Neptunium",hi:"नेप्च्यूनियम",m:237,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f⁴6d¹7s²",en_v:1.36,mp:644,bp:3902,d:20.2,st:"solid",db:{en:"Edwin McMillan",hi:"एडविन मैकमिलन"},y:1940,f:{en:"Named after planet Neptune!",hi:"ग्रह नेप्च्यून के नाम पर!"}},
  {n:94,s:"Pu",en:"Plutonium",hi:"प्लूटोनियम",m:244,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f⁶7s²",en_v:1.28,mp:640,bp:3228,d:19.7,st:"solid",db:{en:"Glenn T. Seaborg",hi:"ग्लेन टी. सीबोर्ग"},y:1940,f:{en:"Used in nuclear weapons!",hi:"परमाणु हथियारों में प्रयोग!"}},
  {n:95,s:"Am",en:"Americium",hi:"अमेरिसियम",m:243,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f⁷7s²",en_v:1.3,mp:1176,bp:2011,d:12,st:"solid",db:{en:"Glenn T. Seaborg",hi:"ग्लेन टी. सीबोर्ग"},y:1944,f:{en:"Found in smoke detectors!",hi:"धुआं डिटेक्टरों में पाया जाता है!"}},
  {n:96,s:"Cm",en:"Curium",hi:"क्यूरियम",m:247,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f⁷6d¹7s²",en_v:1.3,mp:1345,bp:3110,d:13.5,st:"solid",db:{en:"Glenn T. Seaborg",hi:"ग्लेन टी. सीबोर्ग"},y:1944,f:{en:"Named after Marie Curie!",hi:"मैरी क्यूरी के नाम पर!"}},
  {n:97,s:"Bk",en:"Berkelium",hi:"बर्केलियम",m:247,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f⁹7s²",en_v:1.3,mp:986,bp:2627,d:14.79,st:"solid",db:{en:"Glenn T. Seaborg",hi:"ग्लेन टी. सीबोर्ग"},y:1949,f:{en:"Named after Berkeley, California!",hi:"बर्कले, कैलिफोर्निया के नाम पर!"}},
  {n:98,s:"Cf",en:"Californium",hi:"कैलिफोर्नियम",m:251,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f¹⁰7s²",en_v:1.3,mp:900,bp:1472,d:15.1,st:"solid",db:{en:"Glenn T. Seaborg",hi:"ग्लेन टी. सीबोर्ग"},y:1950,f:{en:"Used to detect gold and silver ores!",hi:"सोने और चांदी का पता लगाने में!"}},
  {n:99,s:"Es",en:"Einsteinium",hi:"आइंस्टीनियम",m:252,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f¹¹7s²",en_v:1.3,mp:860,bp:996,d:8.84,st:"solid",db:{en:"Albert Ghiorso",hi:"अल्बर्ट घियोर्सो"},y:1952,f:{en:"Named after Albert Einstein!",hi:"अल्बर्ट आइंस्टीन के नाम पर!"}},
  {n:100,s:"Fm",en:"Fermium",hi:"फर्मियम",m:257,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f¹²7s²",en_v:1.3,mp:1527,bp:null,d:null,st:"solid",db:{en:"Albert Ghiorso",hi:"अल्बर्ट घियोर्सो"},y:1952,f:{en:"Named after Enrico Fermi!",hi:"एनरिको फर्मी के नाम पर!"}},
  {n:101,s:"Md",en:"Mendelevium",hi:"मेंडेलेवियम",m:258,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f¹³7s²",en_v:1.3,mp:827,bp:null,d:null,st:"solid",db:{en:"Albert Ghiorso",hi:"अल्बर्ट घियोर्सो"},y:1955,f:{en:"Named after Dmitri Mendeleev!",hi:"दिमित्री मेंडेलीव के नाम पर!"}},
  {n:102,s:"No",en:"Nobelium",hi:"नोबेलियम",m:259,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f¹⁴7s²",en_v:1.3,mp:827,bp:null,d:null,st:"solid",db:{en:"Joint Institute for Nuclear Research",hi:"संयुक्त परमाणु अनुसंधान संस्थान"},y:1958,f:{en:"Named after Alfred Nobel!",hi:"अल्फ्रेड नोबेल के नाम पर!"}},
  {n:103,s:"Lr",en:"Lawrencium",hi:"लॉरेंसियम",m:266,c:"actinide",p:7,g:3,b:"f",ec:"[Rn]5f¹⁴7s²7p¹",en_v:1.3,mp:1627,bp:null,d:null,st:"solid",db:{en:"Albert Ghiorso",hi:"अल्बर्ट घियोर्सो"},y:1961,f:{en:"Last of the actinides!",hi:"एक्टिनाइड्स में आखिरी!"}},
  {n:104,s:"Rf",en:"Rutherfordium",hi:"रदरफोर्डियम",m:267,c:"transition-metal",p:7,g:4,b:"d",ec:"[Rn]5f¹⁴6d²7s²",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"Georgy Flerov",hi:"जॉर्जी फ्लेरोव"},y:1964,f:{en:"Named after Ernest Rutherford!",hi:"अर्नेस्ट रदरफोर्ड के नाम पर!"}},
  {n:105,s:"Db",en:"Dubnium",hi:"डब्नियम",m:268,c:"transition-metal",p:7,g:5,b:"d",ec:"[Rn]5f¹⁴6d³7s²",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"Georgy Flerov",hi:"जॉर्जी फ्लेरोव"},y:1968,f:{en:"Named after Dubna, Russia!",hi:"डबना, रूस के नाम पर!"}},
  {n:106,s:"Sg",en:"Seaborgium",hi:"सीबोर्गियम",m:269,c:"transition-metal",p:7,g:6,b:"d",ec:"[Rn]5f¹⁴6d⁴7s²",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"Albert Ghiorso",hi:"अल्बर्ट घियोर्सो"},y:1974,f:{en:"Named after Glenn Seaborg!",hi:"ग्लेन सीबोर्ग के नाम पर!"}},
  {n:107,s:"Bh",en:"Bohrium",hi:"बोहरियम",m:270,c:"transition-metal",p:7,g:7,b:"d",ec:"[Rn]5f¹⁴6d⁵7s²",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"GSI Darmstadt",hi:"GSI डार्मस्टाट"},y:1981,f:{en:"Named after Niels Bohr!",hi:"नील्स बोहर के नाम पर!"}},
  {n:108,s:"Hs",en:"Hassium",hi:"हासियम",m:277,c:"transition-metal",p:7,g:8,b:"d",ec:"[Rn]5f¹⁴6d⁶7s²",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"Peter Armbruster",hi:"पीटर आर्मब्रस्टर"},y:1984,f:{en:"Named after Hesse, Germany!",hi:"हेसे, जर्मनी के नाम पर!"}},
  {n:109,s:"Mt",en:"Meitnerium",hi:"मीटनेरियम",m:278,c:"transition-metal",p:7,g:9,b:"d",ec:"[Rn]5f¹⁴6d⁷7s²",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"GSI Darmstadt",hi:"GSI डार्मस्टाट"},y:1982,f:{en:"Named after Lise Meitner!",hi:"लीज़ मीटनर के नाम पर!"}},
  {n:110,s:"Ds",en:"Darmstadtium",hi:"डार्मस्टेटियम",m:281,c:"transition-metal",p:7,g:10,b:"d",ec:"[Rn]5f¹⁴6d⁸7s²",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"GSI Darmstadt",hi:"GSI डार्मस्टाट"},y:1994,f:{en:"Named after Darmstadt, Germany!",hi:"डार्मस्टाट, जर्मनी के नाम पर!"}},
  {n:111,s:"Rg",en:"Roentgenium",hi:"रॉन्टजेनियम",m:282,c:"transition-metal",p:7,g:11,b:"d",ec:"[Rn]5f¹⁴6d⁹7s²",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"GSI Darmstadt",hi:"GSI डार्मस्टाट"},y:1994,f:{en:"Named after Wilhelm Röntgen!",hi:"विल्हेम रॉन्टजेन के नाम पर!"}},
  {n:112,s:"Cn",en:"Copernicium",hi:"कोपर्निकियम",m:285,c:"transition-metal",p:7,g:12,b:"d",ec:"[Rn]5f¹⁴6d¹⁰7s²",en_v:null,mp:null,bp:null,d:null,st:"liquid",db:{en:"GSI Darmstadt",hi:"GSI डार्मस्टाट"},y:1996,f:{en:"Named after Nicolaus Copernicus!",hi:"निकोलस कोपरनिकस के नाम पर!"}},
  {n:113,s:"Nh",en:"Nihonium",hi:"निहोनियम",m:286,c:"post-transition",p:7,g:13,b:"p",ec:"[Rn]5f¹⁴6d¹⁰7s²7p¹",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"Riken",hi:"रिकेन"},y:2003,f:{en:"Named after Japan (Nihon)!",hi:"जापान (निहोन) के नाम पर!"}},
  {n:114,s:"Fl",en:"Flerovium",hi:"फ्लेरोवियम",m:289,c:"post-transition",p:7,g:14,b:"p",ec:"[Rn]5f¹⁴6d¹⁰7s²7p²",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"JINR",hi:"JINR"},y:1998,f:{en:"Named after Georgy Flerov!",hi:"जॉर्जी फ्लेरोव के नाम पर!"}},
  {n:115,s:"Mc",en:"Moscovium",hi:"मॉस्कोवियम",m:290,c:"post-transition",p:7,g:15,b:"p",ec:"[Rn]5f¹⁴6d¹⁰7s²7p³",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"JINR",hi:"JINR"},y:2003,f:{en:"Named after Moscow!",hi:"मास्को के नाम पर!"}},
  {n:116,s:"Lv",en:"Livermorium",hi:"लिवरमोरियम",m:293,c:"post-transition",p:7,g:16,b:"p",ec:"[Rn]5f¹⁴6d¹⁰7s²7p⁴",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"JINR",hi:"JINR"},y:2000,f:{en:"Named after Livermore, California!",hi:"लिवरमोर, कैलिफोर्निया के नाम पर!"}},
  {n:117,s:"Ts",en:"Tennessine",hi:"टेनेसिन",m:294,c:"halogen",p:7,g:17,b:"p",ec:"[Rn]5f¹⁴6d¹⁰7s²7p⁵",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"JINR",hi:"JINR"},y:2010,f:{en:"Named after Tennessee!",hi:"टेनेसी के नाम पर!"}},
  {n:118,s:"Og",en:"Oganesson",hi:"ओगेनेसन",m:294,c:"noble-gas",p:7,g:18,b:"p",ec:"[Rn]5f¹⁴6d¹⁰7s²7p⁶",en_v:null,mp:null,bp:null,d:null,st:"solid",db:{en:"JINR",hi:"JINR"},y:2002,f:{en:"Named after Yuri Oganessian!",hi:"युरी ओगेनेसियन के नाम पर!"}}
];
ELEMENTS_DATA.push(...ELEMENTS_81_118);

// Grid positions for each element
const ELEMENT_POSITIONS = {
  1:{r:1,c:1},2:{r:1,c:18},3:{r:2,c:1},4:{r:2,c:2},5:{r:2,c:13},6:{r:2,c:14},7:{r:2,c:15},8:{r:2,c:16},9:{r:2,c:17},10:{r:2,c:18},
  11:{r:3,c:1},12:{r:3,c:2},13:{r:3,c:13},14:{r:3,c:14},15:{r:3,c:15},16:{r:3,c:16},17:{r:3,c:17},18:{r:3,c:18},
  19:{r:4,c:1},20:{r:4,c:2},21:{r:4,c:3},22:{r:4,c:4},23:{r:4,c:5},24:{r:4,c:6},25:{r:4,c:7},26:{r:4,c:8},27:{r:4,c:9},28:{r:4,c:10},29:{r:4,c:11},30:{r:4,c:12},31:{r:4,c:13},32:{r:4,c:14},33:{r:4,c:15},34:{r:4,c:16},35:{r:4,c:17},36:{r:4,c:18},
  37:{r:5,c:1},38:{r:5,c:2},39:{r:5,c:3},40:{r:5,c:4},41:{r:5,c:5},42:{r:5,c:6},43:{r:5,c:7},44:{r:5,c:8},45:{r:5,c:9},46:{r:5,c:10},47:{r:5,c:11},48:{r:5,c:12},49:{r:5,c:13},50:{r:5,c:14},51:{r:5,c:15},52:{r:5,c:16},53:{r:5,c:17},54:{r:5,c:18},
  55:{r:6,c:1},56:{r:6,c:2},57:{r:6,c:3},72:{r:6,c:4},73:{r:6,c:5},74:{r:6,c:6},75:{r:6,c:7},76:{r:6,c:8},77:{r:6,c:9},78:{r:6,c:10},79:{r:6,c:11},80:{r:6,c:12},81:{r:6,c:13},82:{r:6,c:14},83:{r:6,c:15},84:{r:6,c:16},85:{r:6,c:17},86:{r:6,c:18},
  87:{r:7,c:1},88:{r:7,c:2},89:{r:7,c:3},104:{r:7,c:4},105:{r:7,c:5},106:{r:7,c:6},107:{r:7,c:7},108:{r:7,c:8},109:{r:7,c:9},110:{r:7,c:10},111:{r:7,c:11},112:{r:7,c:12},113:{r:7,c:13},114:{r:7,c:14},115:{r:7,c:15},116:{r:7,c:16},117:{r:7,c:17},118:{r:7,c:18}
};

// Lanthanides (57-71) and Actinides (89-103) are in f-block
const LANTHANIDES = [57,58,59,60,61,62,63,64,65,66,67,68,69,70,71];
const ACTINIDES = [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103];

// UI Translations
const UI_TRANSLATIONS = {
  en: {
    title: "Interactive Periodic Table",
    subtitle: "Explore all 118 elements with 3D visualizations and quizzes!",
    search: "Search element...",
    startQuiz: "Start Quiz",
    basicInfo: "Basic Information",
    atomicNumber: "Atomic Number",
    atomicMass: "Atomic Mass",
    category: "Category",
    block: "Block",
    period: "Period",
    group: "Group",
    atomicProps: "Atomic Properties",
    electronConfig: "Electron Configuration",
    electronegativity: "Electronegativity",
    physicalProps: "Physical Properties",
    state: "State at Room Temp",
    meltingPoint: "Melting Point",
    boilingPoint: "Boiling Point",
    density: "Density",
    discovery: "Discovery",
    discoveredBy: "Discovered By",
    funFact: "Fun Fact",
    hearPronunciation: "Hear Pronunciation",
    solid: "Solid",
    liquid: "Liquid",
    gas: "Gas"
  },
  hi: {
    title: "इंटरैक्टिव आवर्त सारणी",
    subtitle: "3D विज़ुअलाइज़ेशन और क्विज़ के साथ सभी 118 तत्वों का अन्वेषण करें!",
    search: "तत्व खोजें...",
    startQuiz: "क्विज़ शुरू करें",
    basicInfo: "मूलभूत जानकारी",
    atomicNumber: "परमाणु क्रमांक",
    atomicMass: "परमाणु द्रव्यमान",
    category: "श्रेणी",
    block: "ब्लॉक",
    period: "आवर्त",
    group: "समूह",
    atomicProps: "परमाणु गुण",
    electronConfig: "इलेक्ट्रॉन विन्यास",
    electronegativity: "विद्युतऋणात्मकता",
    physicalProps: "भौतिक गुण",
    state: "कमरे के तापमान पर अवस्था",
    meltingPoint: "गलनांक",
    boilingPoint: "क्वथनांक",
    density: "घनत्व",
    discovery: "खोज",
    discoveredBy: "खोजकर्ता",
    funFact: "रोचक तथ्य",
    hearPronunciation: "उच्चारण सुनें",
    solid: "ठोस",
    liquid: "तरल",
    gas: "गैस"
  }
};

// Category names
const CATEGORY_NAMES = {
  en: {
    "alkali-metal": "Alkali Metal",
    "alkaline-earth": "Alkaline Earth Metal",
    "transition-metal": "Transition Metal",
    "post-transition": "Post-Transition Metal",
    "metalloid": "Metalloid",
    "nonmetal": "Nonmetal",
    "halogen": "Halogen",
    "noble-gas": "Noble Gas",
    "lanthanide": "Lanthanide",
    "actinide": "Actinide"
  },
  hi: {
    "alkali-metal": "क्षार धातु",
    "alkaline-earth": "क्षारीय मृदा धातु",
    "transition-metal": "संक्रमण धातु",
    "post-transition": "संक्रमणोत्तर धातु",
    "metalloid": "उपधातु",
    "nonmetal": "अधातु",
    "halogen": "हैलोजन",
    "noble-gas": "उत्कृष्ट गैस",
    "lanthanide": "लैंथेनाइड",
    "actinide": "एक्टिनाइड"
  }
};

console.log('📊 Periodic Table Data loaded:', ELEMENTS_DATA.length, 'elements');
