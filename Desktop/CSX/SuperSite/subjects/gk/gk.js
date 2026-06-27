/* ============================================
   GENERAL KNOWLEDGE - GAME ENGINE
   Test Your Knowledge!
   ============================================ */

// ============================================
// GK DATA
// ============================================
const gkData = {
    personalities: {
        title: 'Famous Personalities',
        emoji: '👤',
        xpPerQuestion: 15,
        questions: [
            { q: 'Who is known as the Father of the Nation in India? (भारत में राष्ट्रपिता के रूप में किसे जाना जाता है?)', options: ['Jawaharlal Nehru (जवाहरलाल नेहरू)', 'Mahatma Gandhi (महात्मा गांधी)', 'Sardar Patel (सरदार पटेल)', 'Subhas Chandra Bose (सुभाष चंद्र बोस)'], answer: 'Mahatma Gandhi (महात्मा गांधी)' },
            { q: 'Who discovered gravity? (गुरुत्वाकर्षण की खोज किसने की?)', options: ['Albert Einstein (अल्बर्ट आइंस्टीन)', 'Isaac Newton (आइज़क न्यूटन)', 'Galileo Galilei (गैलीलियो गैलीली)', 'Nikola Tesla (निकोला टेस्ला)'], answer: 'Isaac Newton (आइज़क न्यूटन)' },
            { q: 'Who wrote the Indian National Anthem? (भारतीय राष्ट्रगान किसने लिखा?)', options: ['Bankim Chandra (बंकिम चंद्र)', 'Rabindranath Tagore (रबीन्द्रनाथ टैगोर)', 'Sarojini Naidu (सरोजिनी नायडू)', 'Muhammad Iqbal (मुहम्मद इकबाल)'], answer: 'Rabindranath Tagore (रबीन्द्रनाथ टैगोर)' },
            { q: 'Who was the first Prime Minister of India? (भारत के पहले प्रधानमंत्री कौन थे?)', options: ['Sardar Patel (सरदार पटेल)', 'Lal Bahadur Shastri (लाल बहादुर शास्त्री)', 'Jawaharlal Nehru (जवाहरलाल नेहरू)', 'Indira Gandhi (इंदिरा गांधी)'], answer: 'Jawaharlal Nehru (जवाहरलाल नेहरू)' },
            { q: 'Who is known as the Missile Man of India? (भारत के मिसाइल मैन के रूप में किसे जाना जाता है?)', options: ['Vikram Sarabhai (विक्रम साराभाई)', 'Homi Bhabha (होमी भाभा)', 'APJ Abdul Kalam (एपीजे अब्दुल कलाम)', 'CV Raman (सीवी रमन)'], answer: 'APJ Abdul Kalam (एपीजे अब्दुल कलाम)' },
            { q: 'Who painted the Mona Lisa? (मोनालिसा किसने बनाई?)', options: ['Michelangelo (माइकलएंजेलो)', 'Leonardo da Vinci (लियोनार्डो दा विंची)', 'Picasso (पिकासो)', 'Van Gogh (वैन गॉग)'], answer: 'Leonardo da Vinci (लियोनार्डो दा विंची)' },
            { q: 'Who is known as the Iron Man of India? (भारत के लौह पुरुष के रूप में किसे जाना जाता है?)', options: ['Bhagat Singh (भगत सिंह)', 'Sardar Vallabhbhai Patel (सरदार वल्लभभाई पटेल)', 'Subhas Chandra Bose (सुभाष चंद्र बोस)', 'Lala Lajpat Rai (लाला लाजपत राय)'], answer: 'Sardar Vallabhbhai Patel (सरदार वल्लभभाई पटेल)' },
            { q: 'Who founded Microsoft? (माइक्रोसॉफ्ट की स्थापना किसने की?)', options: ['Steve Jobs (स्टीव जॉब्स)', 'Bill Gates (बिल गेट्स)', 'Mark Zuckerberg (मार्क जुकरबर्ग)', 'Jeff Bezos (जेफ बेजोस)'], answer: 'Bill Gates (बिल गेट्स)' },
            { q: 'Who discovered Penicillin? (पेनिसिलिन की खोज किसने की?)', options: ['Louis Pasteur (लुई पाश्चर)', 'Alexander Fleming (अलेक्जेंडर फ्लेमिंग)', 'Robert Koch (रॉबर्ट कोच)', 'Edward Jenner (एडवर्ड जेनर)'], answer: 'Alexander Fleming (अलेक्जेंडर फ्लेमिंग)' },
            { q: 'Who was the first woman Prime Minister of India? (भारत की पहली महिला प्रधानमंत्री कौन थीं?)', options: ['Pratibha Patil (प्रतिभा पाटिल)', 'Indira Gandhi (इंदिरा गांधी)', 'Sarojini Naidu (सरोजिनी नायडू)', 'Sonia Gandhi (सोनिया गांधी)'], answer: 'Indira Gandhi (इंदिरा गांधी)' }
        ]
    },
    inventions: {
        title: 'Inventions & Discoveries',
        emoji: '💡',
        xpPerQuestion: 15,
        questions: [
            { q: 'Who invented the telephone? (टेलीफोन का आविष्कार किसने किया?)', options: ['Thomas Edison (थॉमस एडिसन)', 'Alexander Graham Bell (अलेक्जेंडर ग्राहम बेल)', 'Nikola Tesla (निकोला टेस्ला)', 'Guglielmo Marconi (गुग्लिएल्मो मार्कोनी)'], answer: 'Alexander Graham Bell (अलेक्जेंडर ग्राहम बेल)' },
            { q: 'Who invented the electric bulb? (बिजली के बल्ब का आविष्कार किसने किया?)', options: ['Thomas Edison (थॉमस एडिसन)', 'Benjamin Franklin (बेंजामिन फ्रैंकलिन)', 'Nikola Tesla (निकोला टेस्ला)', 'Michael Faraday (माइकल फैराडे)'], answer: 'Thomas Edison (थॉमस एडिसन)' },
            { q: 'Who invented the World Wide Web? (वर्ल्ड वाइड वेब का आविष्कार किसने किया?)', options: ['Bill Gates (बिल गेट्स)', 'Tim Berners-Lee (टिम बर्नर्स-ली)', 'Steve Jobs (स्टीव जॉब्स)', 'Mark Zuckerberg (मार्क जुकरबर्ग)'], answer: 'Tim Berners-Lee (टिम बर्नर्स-ली)' },
            { q: 'Who invented Radio? (रेडियो का आविष्कार किसने किया?)', options: ['Alexander Bell (अलेक्जेंडर बेल)', 'Marconi (मार्कोनी)', 'Edison (एडिसन)', 'Tesla (टेस्ला)'], answer: 'Marconi (मार्कोनी)' },
            { q: 'Who invented the printing press? (छापाखाने का आविष्कार किसने किया?)', options: ['Johannes Gutenberg (जोहानेस गुटेनबर्ग)', 'Benjamin Franklin (बेंजामिन फ्रैंकलिन)', 'Isaac Newton (आइज़क न्यूटन)', 'Galileo (गैलीलियो)'], answer: 'Johannes Gutenberg (जोहानेस गुटेनबर्ग)' },
            { q: 'Who discovered X-rays? (एक्स-रे की खोज किसने की?)', options: ['Marie Curie (मैरी क्यूरी)', 'Wilhelm Roentgen (विल्हेम रोएंटजन)', 'Albert Einstein (अल्बर्ट आइंस्टीन)', 'Niels Bohr (नील्स बोर)'], answer: 'Wilhelm Roentgen (विल्हेम रोएंटजन)' },
            { q: 'Who invented the steam engine? (भाप इंजन का आविष्कार किसने किया?)', options: ['James Watt (जेम्स वाट)', 'Henry Ford (हेनरी फोर्ड)', 'Thomas Edison (थॉमस एडिसन)', 'Wright Brothers (राइट ब्रदर्स)'], answer: 'James Watt (जेम्स वाट)' },
            { q: 'Who invented the airplane? (हवाई जहाज का आविष्कार किसने किया?)', options: ['Henry Ford (हेनरी फोर्ड)', 'Wright Brothers (राइट ब्रदर्स)', 'James Watt (जेम्स वाट)', 'Karl Benz (कार्ल बेंज)'], answer: 'Wright Brothers (राइट ब्रदर्स)' },
            { q: 'Who discovered electricity? (बिजली की खोज किसने की?)', options: ['Thomas Edison (थॉमस एडिसन)', 'Benjamin Franklin (बेंजामिन फ्रैंकलिन)', 'Nikola Tesla (निकोला टेस्ला)', 'Michael Faraday (माइकल फैराडे)'], answer: 'Benjamin Franklin (बेंजामिन फ्रैंकलिन)' },
            { q: 'Who invented the computer? (कंप्यूटर का आविष्कार किसने किया?)', options: ['Charles Babbage (चार्ल्स बैबेज)', 'Alan Turing (एलन ट्यूरिंग)', 'Bill Gates (बिल गेट्स)', 'Steve Jobs (स्टीव जॉब्स)'], answer: 'Charles Babbage (चार्ल्स बैबेज)' }
        ]
    },
    sports: {
        title: 'Sports & Games',
        emoji: '⚽',
        xpPerQuestion: 15,
        questions: [
            { q: "Which sport is called the \"Gentleman's Game\"? (किस खेल को \"जेंटलमैन गेम\" कहा जाता है?)", options: ['Football (फुटबॉल)', 'Cricket (क्रिकेट)', 'Tennis (टेनिस)', 'Golf (गोल्फ)'], answer: 'Cricket (क्रिकेट)' },
            { q: 'How many players are there in a football team? (फुटबॉल टीम में कितने खिलाड़ी होते हैं?)', options: ['9', '10', '11', '12'], answer: '11' },
            { q: 'Where were the first modern Olympics held? (पहला आधुनिक ओलंपिक कहाँ आयोजित हुआ था?)', options: ['Paris (पेरिस)', 'Athens (एथेंस)', 'Rome (रोम)', 'London (लंदन)'], answer: 'Athens (एथेंस)' },
            { q: 'Which country has won the most FIFA World Cups? (किस देश ने सबसे ज्यादा फीफा विश्व कप जीते हैं?)', options: ['Germany (जर्मनी)', 'Argentina (अर्जेंटीना)', 'Brazil (ब्राज़ील)', 'Italy (इटली)'], answer: 'Brazil (ब्राज़ील)' },
            { q: "Which sport is widely considered India's most popular traditional sport? (भारत का सबसे लोकप्रिय पारंपरिक खेल कौन सा माना जाता है?)", options: ['Cricket (क्रिकेट)', 'Hockey (हॉकी)', 'Kabaddi (कबड्डी)', 'Football (फुटबॉल)'], answer: 'Hockey (हॉकी)' },
            { q: 'Who has won the most Grand Slam tennis titles (men)? (पुरुषों में सबसे ज्यादा ग्रैंड स्लैम खिताब किसने जीते हैं?)', options: ['Roger Federer (रोजर फेडरर)', 'Rafael Nadal (राफेल नडाल)', 'Novak Djokovic (नोवाक जोकोविच)', 'Pete Sampras (पीट सम्प्रास)'], answer: 'Novak Djokovic (नोवाक जोकोविच)' },
            { q: 'Which country hosted the 2020 Summer Olympics? (2020 ग्रीष्मकालीन ओलंपिक किस देश ने आयोजित किया?)', options: ['China (चीन)', 'Japan (जापान)', 'South Korea (दक्षिण कोरिया)', 'India (भारत)'], answer: 'Japan (जापान)' },
            { q: 'Who is known as the "Flying Sikh"? ("फ्लाइंग सिख" के नाम से कौन प्रसिद्ध हैं?)', options: ['Milkha Singh (मिल्खा सिंह)', 'PT Usha (पीटी उषा)', 'Sachin Tendulkar (सचिन तेंदुलकर)', 'Dhyan Chand (ध्यान चंद)'], answer: 'Milkha Singh (मिल्खा सिंह)' },
            { q: 'In which sport is the term "Love" used? (किस खेल में "लव" शब्द का प्रयोग होता है?)', options: ['Badminton (बैडमिंटन)', 'Table Tennis (टेबल टेनिस)', 'Tennis (टेनिस)', 'Squash (स्क्वॉश)'], answer: 'Tennis (टेनिस)' },
            { q: 'Who is called the "God of Cricket"? ("क्रिकेट का भगवान" किसे कहा जाता है?)', options: ['Virat Kohli (विराट कोहली)', 'MS Dhoni (एमएस धोनी)', 'Sachin Tendulkar (सचिन तेंदुलकर)', 'Kapil Dev (कपिल देव)'], answer: 'Sachin Tendulkar (सचिन तेंदुलकर)' }
        ]
    },
    national: {
        title: 'India: National Symbols',
        emoji: '🇮🇳',
        xpPerQuestion: 15,
        questions: [
            { q: 'What is the National Animal of India? (भारत का राष्ट्रीय पशु क्या है?)', options: ['Lion (शेर)', 'Elephant (हाथी)', 'Tiger (बाघ)', 'Peacock (मोर)'], answer: 'Tiger (बाघ)' },
            { q: 'What is the National Bird of India? (भारत का राष्ट्रीय पक्षी क्या है?)', options: ['Parrot (तोता)', 'Eagle (गरुड़)', 'Peacock (मोर)', 'Sparrow (गौरैया)'], answer: 'Peacock (मोर)' },
            { q: 'What is the National Flower of India? (भारत का राष्ट्रीय फूल क्या है?)', options: ['Rose (गुलाब)', 'Lotus (कमल)', 'Sunflower (सूरजमुखी)', 'Jasmine (चमेली)'], answer: 'Lotus (कमल)' },
            { q: 'What is the National Fruit of India? (भारत का राष्ट्रीय फल क्या है?)', options: ['Apple (सेब)', 'Banana (केला)', 'Mango (आम)', 'Orange (संतरा)'], answer: 'Mango (आम)' },
            { q: 'What is the National Tree of India? (भारत का राष्ट्रीय वृक्ष क्या है?)', options: ['Neem (नीम)', 'Banyan (बरगद)', 'Peepal (पीपल)', 'Mango (आम)'], answer: 'Banyan (बरगद)' },
            { q: 'What is the National River of India? (भारत की राष्ट्रीय नदी कौन सी है?)', options: ['Yamuna (यमुना)', 'Ganga (गंगा)', 'Brahmaputra (ब्रह्मपुत्र)', 'Godavari (गोदावरी)'], answer: 'Ganga (गंगा)' },
            { q: "What is India's National Anthem? (भारत का राष्ट्रगान क्या है?)", options: ['Vande Mataram (वंदे मातरम)', 'Jana Gana Mana (जन गण मन)', 'Sare Jahan Se Achha (सारे जहाँ से अच्छा)', 'Ae Mere Watan (ऐ मेरे वतन)'], answer: 'Jana Gana Mana (जन गण मन)' },
            { q: "What is India's National Song? (भारत का राष्ट्रीय गीत क्या है?)", options: ['Jana Gana Mana (जन गण मन)', 'Vande Mataram (वंदे मातरम)', 'Sare Jahan Se Achha (सारे जहाँ से अच्छा)', 'Ae Mere Watan (ऐ मेरे वतन)'], answer: 'Vande Mataram (वंदे मातरम)' },
            { q: 'How many spokes are in the Ashoka Chakra? (अशोक चक्र में कितनी तीलियाँ हैं?)', options: ['12', '22', '24', '26'], answer: '24' },
            { q: 'What is the National Currency of India? (भारत की राष्ट्रीय मुद्रा क्या है?)', options: ['Dollar (डॉलर)', 'Rupee (रुपया)', 'Pound (पाउंड)', 'Yen (येन)'], answer: 'Rupee (रुपया)' }
        ]
    },
    days: {
        title: 'Important Days',
        emoji: '📅',
        xpPerQuestion: 15,
        questions: [
            { q: 'When is Independence Day of India celebrated? (भारत का स्वतंत्रता दिवस कब मनाया जाता है?)', options: ['26 January (26 जनवरी)', '15 August (15 अगस्त)', '2 October (2 अक्टूबर)', '14 November (14 नवंबर)'], answer: '15 August (15 अगस्त)' },
            { q: 'When is Republic Day of India celebrated? (भारत का गणतंत्र दिवस कब मनाया जाता है?)', options: ['15 August (15 अगस्त)', '26 January (26 जनवरी)', '2 October (2 अक्टूबर)', '5 September (5 सितंबर)'], answer: '26 January (26 जनवरी)' },
            { q: "When is Teachers' Day celebrated in India? (भारत में शिक्षक दिवस कब मनाया जाता है?)", options: ['14 November (14 नवंबर)', '5 September (5 सितंबर)', '1 May (1 मई)', '21 June (21 जून)'], answer: '5 September (5 सितंबर)' },
            { q: "When is Children's Day celebrated in India? (भारत में बाल दिवस कब मनाया जाता है?)", options: ['5 September (5 सितंबर)', '14 November (14 नवंबर)', '26 January (26 जनवरी)', '2 October (2 अक्टूबर)'], answer: '14 November (14 नवंबर)' },
            { q: 'When is Gandhi Jayanti? (गांधी जयंती कब है?)', options: ['26 January (26 जनवरी)', '15 August (15 अगस्त)', '2 October (2 अक्टूबर)', '14 November (14 नवंबर)'], answer: '2 October (2 अक्टूबर)' },
            { q: 'When is World Environment Day? (विश्व पर्यावरण दिवस कब है?)', options: ['22 April (22 अप्रैल)', '5 June (5 जून)', '21 March (21 मार्च)', '8 March (8 मार्च)'], answer: '5 June (5 जून)' },
            { q: "When is International Women's Day? (अंतर्राष्ट्रीय महिला दिवस कब है?)", options: ['8 March (8 मार्च)', '1 May (1 मई)', '22 April (22 अप्रैल)', '5 June (5 जून)'], answer: '8 March (8 मार्च)' },
            { q: 'When is World Health Day? (विश्व स्वास्थ्य दिवस कब है?)', options: ['7 April (7 अप्रैल)', '22 April (22 अप्रैल)', '1 May (1 मई)', '5 June (5 जून)'], answer: '7 April (7 अप्रैल)' },
            { q: 'When is International Yoga Day? (अंतर्राष्ट्रीय योग दिवस कब है?)', options: ['21 June (21 जून)', '5 June (5 जून)', '14 November (14 नवंबर)', '2 October (2 अक्टूबर)'], answer: '21 June (21 जून)' },
            { q: 'When is National Science Day in India? (भारत में राष्ट्रीय विज्ञान दिवस कब है?)', options: ['11 February (11 फरवरी)', '28 February (28 फरवरी)', '5 September (5 सितंबर)', '14 November (14 नवंबर)'], answer: '28 February (28 फरवरी)' }
        ]
    },
    books: {
        title: 'Books & Authors',
        emoji: '📖',
        xpPerQuestion: 15,
        questions: [
            { q: 'Who wrote "Wings of Fire"? ("विंग्स ऑफ फायर" किसने लिखी?)', options: ['Jawaharlal Nehru (जवाहरलाल नेहरू)', 'APJ Abdul Kalam (एपीजे अब्दुल कलाम)', 'Mahatma Gandhi (महात्मा गांधी)', 'Rabindranath Tagore (रबीन्द्रनाथ टैगोर)'], answer: 'APJ Abdul Kalam (एपीजे अब्दुल कलाम)' },
            { q: 'Who wrote "Discovery of India"? ("डिस्कवरी ऑफ इंडिया" किसने लिखी?)', options: ['Mahatma Gandhi (महात्मा गांधी)', 'Jawaharlal Nehru (जवाहरलाल नेहरू)', 'Sardar Patel (सरदार पटेल)', 'BR Ambedkar (बीआर अंबेडकर)'], answer: 'Jawaharlal Nehru (जवाहरलाल नेहरू)' },
            { q: 'Who wrote "Harry Potter" series? ("हैरी पॉटर" श्रृंखला किसने लिखी?)', options: ['JRR Tolkien (जेआरआर टोल्किन)', 'JK Rowling (जेके रोलिंग)', 'Enid Blyton (एनिड ब्लाइटन)', 'Roald Dahl (रोआल्ड डाल)'], answer: 'JK Rowling (जेके रोलिंग)' },
            { q: 'Who wrote "Gitanjali"? ("गीतांजलि" किसने लिखी?)', options: ['Bankim Chandra (बंकिम चंद्र)', 'Rabindranath Tagore (रबीन्द्रनाथ टैगोर)', 'Premchand (प्रेमचंद)', 'Sarojini Naidu (सरोजिनी नायडू)'], answer: 'Rabindranath Tagore (रबीन्द्रनाथ टैगोर)' },
            { q: 'Who wrote "My Experiments with Truth"? ("सत्य के साथ मेरे प्रयोग" किसने लिखी?)', options: ['Jawaharlal Nehru (जवाहरलाल नेहरू)', 'Sardar Patel (सरदार पटेल)', 'Mahatma Gandhi (महात्मा गांधी)', 'BR Ambedkar (बीआर अंबेडकर)'], answer: 'Mahatma Gandhi (महात्मा गांधी)' },
            { q: 'Who wrote "Romeo and Juliet"? ("रोमियो एंड जूलियट" किसने लिखी?)', options: ['Charles Dickens (चार्ल्स डिकेंस)', 'William Shakespeare (विलियम शेक्सपियर)', 'Jane Austen (जेन ऑस्टिन)', 'Mark Twain (मार्क ट्वेन)'], answer: 'William Shakespeare (विलियम शेक्सपियर)' },
            { q: 'Who wrote "The God of Small Things"? ("द गॉड ऑफ स्मॉल थिंग्स" किसने लिखी?)', options: ['Arundhati Roy (अरुंधति रॉय)', 'Chetan Bhagat (चेतन भगत)', 'Vikram Seth (विक्रम सेठ)', 'Salman Rushdie (सलमान रुश्दी)'], answer: 'Arundhati Roy (अरुंधति रॉय)' },
            { q: 'Who wrote "Panchatantra"? ("पंचतंत्र" किसने लिखी?)', options: ['Kalidas (कालिदास)', 'Vishnu Sharma (विष्णु शर्मा)', 'Tulsidas (तुलसीदास)', 'Ved Vyas (वेद व्यास)'], answer: 'Vishnu Sharma (विष्णु शर्मा)' },
            { q: 'Who wrote "Arthashastra"? ("अर्थशास्त्र" किसने लिखी?)', options: ['Chanakya (चाणक्य)', 'Ashoka (अशोक)', 'Chandragupta (चंद्रगुप्त)', 'Kalidas (कालिदास)'], answer: 'Chanakya (चाणक्य)' },
            { q: 'Who wrote "A Tale of Two Cities"? ("ए टेल ऑफ टू सिटीज" किसने लिखी?)', options: ['Mark Twain (मार्क ट्वेन)', 'Charles Dickens (चार्ल्स डिकेंस)', 'Jane Austen (जेन ऑस्टिन)', 'Oscar Wilde (ऑस्कर वाइल्ड)'], answer: 'Charles Dickens (चार्ल्स डिकेंस)' }
        ]
    },
    awards: {
        title: 'Awards & Honors',
        emoji: '🏆',
        xpPerQuestion: 15,
        questions: [
            { q: "What is India's highest civilian award? (भारत का सर्वोच्च नागरिक पुरस्कार कौन सा है?)", options: ['Padma Shri (पद्म श्री)', 'Padma Bhushan (पद्म भूषण)', 'Padma Vibhushan (पद्म विभूषण)', 'Bharat Ratna (भारत रत्न)'], answer: 'Bharat Ratna (भारत रत्न)' },
            { q: 'Who was the first Indian to win a Nobel Prize? (नोबेल पुरस्कार जीतने वाले पहले भारतीय कौन थे?)', options: ['CV Raman (सीवी रमन)', 'Rabindranath Tagore (रबीन्द्रनाथ टैगोर)', 'Mother Teresa (मदर टेरेसा)', 'Amartya Sen (अमर्त्य सेन)'], answer: 'Rabindranath Tagore (रबीन्द्रनाथ टैगोर)' },
            { q: 'Which award is given for excellence in cinema in India? (भारत में सिनेमा में उत्कृष्टता के लिए कौन सा पुरस्कार दिया जाता है?)', options: ['Dada Saheb Phalke Award (दादा साहेब फाल्के पुरस्कार)', 'Arjuna Award (अर्जुन पुरस्कार)', 'Dronacharya Award (द्रोणाचार्य पुरस्कार)', 'Padma Shri (पद्म श्री)'], answer: 'Dada Saheb Phalke Award (दादा साहेब फाल्के पुरस्कार)' },
            { q: 'Which award is given for excellence in sports in India? (भारत में खेलों में उत्कृष्टता के लिए कौन सा पुरस्कार दिया जाता है?)', options: ['Bharat Ratna (भारत रत्न)', 'Arjuna Award (अर्जुन पुरस्कार)', 'Padma Bhushan (पद्म भूषण)', 'Filmfare (फिल्मफेयर)'], answer: 'Arjuna Award (अर्जुन पुरस्कार)' },
            { q: 'What is the highest award for bravery in India? (भारत में वीरता का सर्वोच्च पुरस्कार कौन सा है?)', options: ['Ashoka Chakra (अशोक चक्र)', 'Param Vir Chakra (परमवीर चक्र)', 'Vir Chakra (वीर चक्र)', 'Shaurya Chakra (शौर्य चक्र)'], answer: 'Param Vir Chakra (परमवीर चक्र)' },
            { q: 'In which field is the Pulitzer Prize given? (पुलित्जर पुरस्कार किस क्षेत्र में दिया जाता है?)', options: ['Science (विज्ञान)', 'Literature (साहित्य)', 'Journalism (पत्रकारिता)', 'Peace (शांति)'], answer: 'Journalism (पत्रकारिता)' },
            { q: 'Who gives the Nobel Prize? (नोबेल पुरस्कार कौन देता है?)', options: ['USA (अमेरिका)', 'UK (ब्रिटेन)', 'Sweden & Norway (स्वीडन और नॉर्वे)', 'Germany (जर्मनी)'], answer: 'Sweden & Norway (स्वीडन और नॉर्वे)' },
            { q: 'Which award is known as "Oscar"? ("ऑस्कर" के नाम से कौन सा पुरस्कार जाना जाता है?)', options: ['Grammy (ग्रैमी)', 'Emmy (एमी)', 'Academy Award (अकादमी पुरस्कार)', 'Golden Globe (गोल्डन ग्लोब)'], answer: 'Academy Award (अकादमी पुरस्कार)' },
            { q: 'Dronacharya Award is given to? (द्रोणाचार्य पुरस्कार किसे दिया जाता है?)', options: ['Players (खिलाड़ी)', 'Coaches (कोच)', 'Writers (लेखक)', 'Scientists (वैज्ञानिक)'], answer: 'Coaches (कोच)' },
            { q: 'Which prize is given for contribution to world peace? (विश्व शांति में योगदान के लिए कौन सा पुरस्कार दिया जाता है?)', options: ['Nobel Peace Prize (नोबेल शांति पुरस्कार)', 'Pulitzer (पुलित्जर)', 'Booker (बुकर)', 'Grammy (ग्रैमी)'], answer: 'Nobel Peace Prize (नोबेल शांति पुरस्कार)' }
        ]
    },
    firsts: {
        title: 'Firsts in India & World',
        emoji: '🥇',
        xpPerQuestion: 15,
        questions: [
            { q: 'Who was the first President of India? (भारत के पहले राष्ट्रपति कौन थे?)', options: ['Jawaharlal Nehru (जवाहरलाल नेहरू)', 'Rajendra Prasad (राजेंद्र प्रसाद)', 'Sarvepalli Radhakrishnan (सर्वपल्ली राधाकृष्णन)', 'Zakir Husain (जाकिर हुसैन)'], answer: 'Rajendra Prasad (राजेंद्र प्रसाद)' },
            { q: 'Who was the first Indian woman in space? (अंतरिक्ष में जाने वाली पहली भारतीय महिला कौन थीं?)', options: ['Sunita Williams (सुनीता विलियम्स)', 'Kalpana Chawla (कल्पना चावला)', 'Tessy Thomas (टेसी थॉमस)', 'Ritu Karidhal (ऋतु करीधल)'], answer: 'Kalpana Chawla (कल्पना चावला)' },
            { q: 'Who was the first man to walk on the Moon? (चंद्रमा पर चलने वाले पहले व्यक्ति कौन थे?)', options: ['Buzz Aldrin (बज़ एल्ड्रिन)', 'Neil Armstrong (नील आर्मस्ट्रांग)', 'Yuri Gagarin (यूरी गागरिन)', 'John Glenn (जॉन ग्लेन)'], answer: 'Neil Armstrong (नील आर्मस्ट्रांग)' },
            { q: 'Who was the first person in space? (अंतरिक्ष में जाने वाले पहले व्यक्ति कौन थे?)', options: ['Neil Armstrong (नील आर्मस्ट्रांग)', 'Yuri Gagarin (यूरी गागरिन)', 'Buzz Aldrin (बज़ एल्ड्रिन)', 'John Glenn (जॉन ग्लेन)'], answer: 'Yuri Gagarin (यूरी गागरिन)' },
            { q: 'Who was the first Indian to receive Nobel Prize in Physics? (भौतिकी में नोबेल पुरस्कार प्राप्त करने वाले पहले भारतीय कौन थे?)', options: ['Hargobind Khorana (हरगोविंद खुराना)', 'CV Raman (सीवी रमन)', 'Venkatraman Ramakrishnan (वेंकटरामन रामकृष्णन)', 'Subrahmanyan Chandrasekhar (सुब्रह्मण्यम चंद्रशेखर)'], answer: 'CV Raman (सीवी रमन)' },
            { q: 'Who was the first woman President of India? (भारत की पहली महिला राष्ट्रपति कौन थीं?)', options: ['Indira Gandhi (इंदिरा गांधी)', 'Pratibha Patil (प्रतिभा पाटिल)', 'Sonia Gandhi (सोनिया गांधी)', 'Sarojini Naidu (सरोजिनी नायडू)'], answer: 'Pratibha Patil (प्रतिभा पाटिल)' },
            { q: 'Who was the first Indian to win Olympic gold in individual event? (व्यक्तिगत इवेंट में ओलंपिक स्वर्ण जीतने वाले पहले भारतीय कौन थे?)', options: ['PT Usha (पीटी उषा)', 'Abhinav Bindra (अभिनव बिंद्रा)', 'Saina Nehwal (साइना नेहवाल)', 'Mary Kom (मैरी कॉम)'], answer: 'Abhinav Bindra (अभिनव बिंद्रा)' },
            { q: 'What was the first satellite launched by India? (भारत द्वारा प्रक्षेपित पहला उपग्रह कौन सा था?)', options: ['INSAT (इनसैट)', 'Aryabhata (आर्यभट्ट)', 'Chandrayaan (चंद्रयान)', 'Mangalyaan (मंगलयान)'], answer: 'Aryabhata (आर्यभट्ट)' },
            { q: 'Who was the first Indian cricketer to score 10,000 runs in Tests? (टेस्ट में 10,000 रन बनाने वाले पहले भारतीय क्रिकेटर कौन थे?)', options: ['Rahul Dravid (राहुल द्रविड)', 'Sachin Tendulkar (सचिन तेंदुलकर)', 'Sunil Gavaskar (सुनील गावस्कर)', 'Virat Kohli (विराट कोहली)'], answer: 'Sachin Tendulkar (सचिन तेंदुलकर)' },
            { q: 'Who was the first Governor-General of independent India? (स्वतंत्र भारत के पहले गवर्नर-जनरल कौन थे?)', options: ['Lord Mountbatten (लॉर्ड माउंटबेटन)', 'C Rajagopalachari (सी राजगोपालाचारी)', 'Jawaharlal Nehru (जवाहरलाल नेहरू)', 'Rajendra Prasad (राजेंद्र प्रसाद)'], answer: 'Lord Mountbatten (लॉर्ड माउंटबेटन)' }
        ]
    },
    statesCapitals: {
        title: 'Indian States & Capitals',
        emoji: '🗺️',
        xpPerQuestion: 15,
        questions: [
            // 28 States of India with 100% accurate capitals (as of 2024)
            { q: 'What is the capital of Andhra Pradesh? (आंध्र प्रदेश की राजधानी क्या है?)', options: ['Hyderabad (हैदराबाद)', 'Amaravati (अमरावती)', 'Visakhapatnam (विशाखापत्तनम)', 'Vijayawada (विजयवाड़ा)'], answer: 'Amaravati (अमरावती)' },
            { q: 'What is the capital of Arunachal Pradesh? (अरुणाचल प्रदेश की राजधानी क्या है?)', options: ['Tawang (तवांग)', 'Itanagar (ईटानगर)', 'Ziro (जीरो)', 'Pasighat (पासीघाट)'], answer: 'Itanagar (ईटानगर)' },
            { q: 'What is the capital of Assam? (असम की राजधानी क्या है?)', options: ['Guwahati (गुवाहाटी)', 'Dispur (दिसपुर)', 'Silchar (सिलचर)', 'Jorhat (जोरहाट)'], answer: 'Dispur (दिसपुर)' },
            { q: 'What is the capital of Bihar? (बिहार की राजधानी क्या है?)', options: ['Gaya (गया)', 'Patna (पटना)', 'Nalanda (नालंदा)', 'Muzaffarpur (मुजफ्फरपुर)'], answer: 'Patna (पटना)' },
            { q: 'What is the capital of Chhattisgarh? (छत्तीसगढ़ की राजधानी क्या है?)', options: ['Bilaspur (बिलासपुर)', 'Raipur (रायपुर)', 'Durg (दुर्ग)', 'Korba (कोरबा)'], answer: 'Raipur (रायपुर)' },
            { q: 'What is the capital of Goa? (गोवा की राजधानी क्या है?)', options: ['Margao (मडगांव)', 'Panaji (पणजी)', 'Vasco da Gama (वास्को डी गामा)', 'Mapusa (मापुसा)'], answer: 'Panaji (पणजी)' },
            { q: 'What is the capital of Gujarat? (गुजरात की राजधानी क्या है?)', options: ['Ahmedabad (अहमदाबाद)', 'Surat (सूरत)', 'Gandhinagar (गांधीनगर)', 'Vadodara (वडोदरा)'], answer: 'Gandhinagar (गांधीनगर)' },
            { q: 'What is the capital of Haryana? (हरियाणा की राजधानी क्या है?)', options: ['Faridabad (फरीदाबाद)', 'Gurugram (गुरुग्राम)', 'Chandigarh (चंडीगढ़)', 'Karnal (करनाल)'], answer: 'Chandigarh (चंडीगढ़)' },
            { q: 'What is the capital of Himachal Pradesh? (हिमाचल प्रदेश की राजधानी क्या है?)', options: ['Manali (मनाली)', 'Shimla (शिमला)', 'Dharamshala (धर्मशाला)', 'Kullu (कुल्लू)'], answer: 'Shimla (शिमला)' },
            { q: 'What is the capital of Jharkhand? (झारखंड की राजधानी क्या है?)', options: ['Jamshedpur (जमशेदपुर)', 'Dhanbad (धनबाद)', 'Ranchi (रांची)', 'Bokaro (बोकारो)'], answer: 'Ranchi (रांची)' },
            { q: 'What is the capital of Karnataka? (कर्नाटक की राजधानी क्या है?)', options: ['Mysuru (मैसूर)', 'Bengaluru (बेंगलुरु)', 'Mangaluru (मंगलुरु)', 'Hubli (हुबली)'], answer: 'Bengaluru (बेंगलुरु)' },
            { q: 'What is the capital of Kerala? (केरल की राजधानी क्या है?)', options: ['Kochi (कोच्चि)', 'Kozhikode (कोझिकोड)', 'Thiruvananthapuram (तिरुवनंतपुरम)', 'Thrissur (त्रिशूर)'], answer: 'Thiruvananthapuram (तिरुवनंतपुरम)' },
            { q: 'What is the capital of Madhya Pradesh? (मध्य प्रदेश की राजधानी क्या है?)', options: ['Indore (इंदौर)', 'Bhopal (भोपाल)', 'Gwalior (ग्वालियर)', 'Jabalpur (जबलपुर)'], answer: 'Bhopal (भोपाल)' },
            { q: 'What is the capital of Maharashtra? (महाराष्ट्र की राजधानी क्या है?)', options: ['Pune (पुणे)', 'Nagpur (नागपुर)', 'Mumbai (मुंबई)', 'Nashik (नासिक)'], answer: 'Mumbai (मुंबई)' },
            { q: 'What is the capital of Manipur? (मणिपुर की राजधानी क्या है?)', options: ['Churachandpur (चुराचांदपुर)', 'Imphal (इंफाल)', 'Thoubal (थौबल)', 'Bishnupur (बिष्णुपुर)'], answer: 'Imphal (इंफाल)' },
            { q: 'What is the capital of Meghalaya? (मेघालय की राजधानी क्या है?)', options: ['Tura (तूरा)', 'Shillong (शिलांग)', 'Jowai (जोवाई)', 'Nongpoh (नोंगपोह)'], answer: 'Shillong (शिलांग)' },
            { q: 'What is the capital of Mizoram? (मिज़ोरम की राजधानी क्या है?)', options: ['Lunglei (लुंगलेई)', 'Aizawl (आइज़ॉल)', 'Champhai (चंफाई)', 'Serchhip (सेरछिप)'], answer: 'Aizawl (आइज़ॉल)' },
            { q: 'What is the capital of Nagaland? (नागालैंड की राजधानी क्या है?)', options: ['Dimapur (दीमापुर)', 'Kohima (कोहिमा)', 'Mokokchung (मोकोकचुंग)', 'Tuensang (ट्वेनसांग)'], answer: 'Kohima (कोहिमा)' },
            { q: 'What is the capital of Odisha? (ओडिशा की राजधानी क्या है?)', options: ['Cuttack (कटक)', 'Bhubaneswar (भुवनेश्वर)', 'Puri (पुरी)', 'Rourkela (राउरकेला)'], answer: 'Bhubaneswar (भुवनेश्वर)' },
            { q: 'What is the capital of Punjab? (पंजाब की राजधानी क्या है?)', options: ['Ludhiana (लुधियाना)', 'Amritsar (अमृतसर)', 'Chandigarh (चंडीगढ़)', 'Jalandhar (जालंधर)'], answer: 'Chandigarh (चंडीगढ़)' },
            { q: 'What is the capital of Rajasthan? (राजस्थान की राजधानी क्या है?)', options: ['Jodhpur (जोधपुर)', 'Udaipur (उदयपुर)', 'Jaipur (जयपुर)', 'Ajmer (अजमेर)'], answer: 'Jaipur (जयपुर)' },
            { q: 'What is the capital of Sikkim? (सिक्किम की राजधानी क्या है?)', options: ['Pelling (पेलिंग)', 'Gangtok (गंगटोक)', 'Namchi (नामची)', 'Mangan (मंगन)'], answer: 'Gangtok (गंगटोक)' },
            { q: 'What is the capital of Tamil Nadu? (तमिलनाडु की राजधानी क्या है?)', options: ['Coimbatore (कोयंबटूर)', 'Madurai (मदुरई)', 'Chennai (चेन्नई)', 'Trichy (त्रिची)'], answer: 'Chennai (चेन्नई)' },
            { q: 'What is the capital of Telangana? (तेलंगाना की राजधानी क्या है?)', options: ['Warangal (वारंगल)', 'Hyderabad (हैदराबाद)', 'Karimnagar (करीमनगर)', 'Nizamabad (निजामाबाद)'], answer: 'Hyderabad (हैदराबाद)' },
            { q: 'What is the capital of Tripura? (त्रिपुरा की राजधानी क्या है?)', options: ['Udaipur (उदयपुर)', 'Agartala (अगरतला)', 'Dharmanagar (धर्मनगर)', 'Kailashahar (कैलाशहर)'], answer: 'Agartala (अगरतला)' },
            { q: 'What is the capital of Uttar Pradesh? (उत्तर प्रदेश की राजधानी क्या है?)', options: ['Kanpur (कानपुर)', 'Varanasi (वाराणसी)', 'Lucknow (लखनऊ)', 'Agra (आगरा)'], answer: 'Lucknow (लखनऊ)' },
            { q: 'What is the capital of Uttarakhand? (उत्तराखंड की राजधानी क्या है?)', options: ['Haridwar (हरिद्वार)', 'Nainital (नैनीताल)', 'Dehradun (देहरादून)', 'Rishikesh (ऋषिकेश)'], answer: 'Dehradun (देहरादून)' },
            { q: 'What is the capital of West Bengal? (पश्चिम बंगाल की राजधानी क्या है?)', options: ['Howrah (हावड़ा)', 'Kolkata (कोलकाता)', 'Darjeeling (दार्जिलिंग)', 'Siliguri (सिलीगुड़ी)'], answer: 'Kolkata (कोलकाता)' }
        ]
    },
    internationalOrgs: {
        title: 'International Organizations HQ',
        emoji: '🏛️',
        xpPerQuestion: 15,
        questions: [
            // Washington DC Organizations (Financial Hub) - USA
            { q: 'Where is the headquarter of International Monetary Fund (IMF)?\nअंतर्राष्ट्रीय मुद्रा कोष (IMF) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'New York, USA (न्यूयॉर्क, अमेरिका)', 'Washington DC, USA (वाशिंगटन डी.सी., अमेरिका)'], answer: 'Washington DC, USA (वाशिंगटन डी.सी., अमेरिका)' },
            { q: 'Where is the headquarter of World Bank Group (WBG)?\nविश्व बैंक समूह (WBG) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'New York, USA (न्यूयॉर्क, अमेरिका)', 'Washington DC, USA (वाशिंगटन डी.सी., अमेरिका)'], answer: 'Washington DC, USA (वाशिंगटन डी.सी., अमेरिका)' },
            { q: 'Where is the headquarter of International Finance Corporation (IFC)?\nअंतर्राष्ट्रीय वित्त निगम (IFC) का मुख्यालय कहाँ है?', options: ['Lausanne, Switzerland (लुसान, स्विट्जरलैंड)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'Nairobi, Kenya (नैरोबी, केन्या)', 'Washington DC, USA (वाशिंगटन डी.सी., अमेरिका)'], answer: 'Washington DC, USA (वाशिंगटन डी.सी., अमेरिका)' },

            // New York Organizations (UN Hub) - USA
            { q: 'Where is the headquarter of United Nations Organization (UNO)?\nसंयुक्त राष्ट्र संगठन (UNO) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'New York, USA (न्यूयॉर्क, अमेरिका)', 'Washington DC, USA (वाशिंगटन डी.सी., अमेरिका)'], answer: 'New York, USA (न्यूयॉर्क, अमेरिका)' },
            { q: 'Where is the headquarter of United Nations Security Council (UNSC)?\nसंयुक्त राष्ट्र सुरक्षा परिषद (UNSC) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'New York, USA (न्यूयॉर्क, अमेरिका)', 'Washington DC, USA (वाशिंगटन डी.सी., अमेरिका)'], answer: 'New York, USA (न्यूयॉर्क, अमेरिका)' },
            { q: 'Where is the headquarter of United Nations Children\'s Fund (UNICEF)?\nसंयुक्त राष्ट्र बाल कोष (UNICEF) का मुख्यालय कहाँ है?', options: ['New York, USA (न्यूयॉर्क, अमेरिका)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'Rome, Italy (रोम, इटली)', 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)'], answer: 'New York, USA (न्यूयॉर्क, अमेरिका)' },

            // Geneva Organizations (Health & Trade Hub) - Switzerland
            { q: 'Where is the headquarter of World Health Organization (WHO)?\nविश्व स्वास्थ्य संगठन (WHO) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'New York, USA (न्यूयॉर्क, अमेरिका)', 'Vienna, Austria (वियना, ऑस्ट्रिया)'], answer: 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)' },
            { q: 'Where is the headquarter of International Labour Organization (ILO)?\nअंतर्राष्ट्रीय श्रम संगठन (ILO) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'New York, USA (न्यूयॉर्क, अमेरिका)', 'Vienna, Austria (वियना, ऑस्ट्रिया)'], answer: 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)' },
            { q: 'Where is the headquarter of World Trade Organization (WTO)?\nविश्व व्यापार संगठन (WTO) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'New York, USA (न्यूयॉर्क, अमेरिका)', 'Vienna, Austria (वियना, ऑस्ट्रिया)'], answer: 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)' },
            { q: 'Where is the headquarter of United Nations High Commissioner for Refugees (UNHCR)?\nसंयुक्त राष्ट्र शरणार्थी उच्चायुक्त (UNHCR) का मुख्यालय कहाँ है?', options: ['Lausanne, Switzerland (लुसान, स्विट्जरलैंड)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'Nairobi, Kenya (नैरोबी, केन्या)', 'Jakarta, Indonesia (जकार्ता, इंडोनेशिया)'], answer: 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)' },
            { q: 'Where is the headquarter of World Intellectual Property Organization (WIPO)?\nविश्व बौद्धिक संपदा संगठन (WIPO) का मुख्यालय कहाँ है?', options: ['New York, USA (न्यूयॉर्क, अमेरिका)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'Rome, Italy (रोम, इटली)', 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)'], answer: 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)' },
            { q: 'Where is the headquarter of United Nations Human Rights Council (UNHRC)?\nसंयुक्त राष्ट्र मानवाधिकार परिषद (UNHRC) का मुख्यालय कहाँ है?', options: ['New York, USA (न्यूयॉर्क, अमेरिका)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'Rome, Italy (रोम, इटली)', 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)'], answer: 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)' },
            { q: 'Where is the headquarter of World Meteorological Organization (WMO)?\nविश्व मौसम विज्ञान संगठन (WMO) का मुख्यालय कहाँ है?', options: ['New York, USA (न्यूयॉर्क, अमेरिका)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'Rome, Italy (रोम, इटली)', 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)'], answer: 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)' },

            // Vienna Organizations (Energy & Industry Hub) - Austria
            { q: 'Where is the headquarter of United Nations Industrial Development Organization (UNIDO)?\nसंयुक्त राष्ट्र औद्योगिक विकास संगठन (UNIDO) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'New York, USA (न्यूयॉर्क, अमेरिका)', 'Vienna, Austria (वियना, ऑस्ट्रिया)'], answer: 'Vienna, Austria (वियना, ऑस्ट्रिया)' },
            { q: 'Where is the headquarter of International Atomic Energy Agency (IAEA)?\nअंतर्राष्ट्रीय परमाणु ऊर्जा एजेंसी (IAEA) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'New York, USA (न्यूयॉर्क, अमेरिका)', 'Vienna, Austria (वियना, ऑस्ट्रिया)'], answer: 'Vienna, Austria (वियना, ऑस्ट्रिया)' },
            { q: 'Where is the headquarter of Organization of the Petroleum Exporting Countries (OPEC)?\nपेट्रोलियम निर्यातक देशों के संगठन (OPEC) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Rome, Italy (रोम, इटली)', 'London, UK (लंदन, ब्रिटेन)', 'Vienna, Austria (वियना, ऑस्ट्रिया)'], answer: 'Vienna, Austria (वियना, ऑस्ट्रिया)' },
            { q: 'Where is the headquarter of United Nations Office on Drugs and Crime (UNODC)?\nसंयुक्त राष्ट्र ड्रग्स और अपराध कार्यालय (UNODC) का मुख्यालय कहाँ है?', options: ['New York, USA (न्यूयॉर्क, अमेरिका)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'Vienna, Austria (वियना, ऑस्ट्रिया)', 'Washington DC, USA (वाशिंगटन डी.सी., अमेरिका)'], answer: 'Vienna, Austria (वियना, ऑस्ट्रिया)' },

            // Paris - Culture - France
            { q: 'Where is the headquarter of UNESCO?\nयूनेस्को (UNESCO) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'New York, USA (न्यूयॉर्क, अमेरिका)', 'Vienna, Austria (वियना, ऑस्ट्रिया)'], answer: 'Paris, France (पेरिस, फ्रांस)' },

            // London - Maritime - UK
            { q: 'Where is the headquarter of International Maritime Organization (IMO)?\nअंतर्राष्ट्रीय समुद्री संगठन (IMO) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Rome, Italy (रोम, इटली)', 'London, UK (लंदन, ब्रिटेन)', 'Vienna, Austria (वियना, ऑस्ट्रिया)'], answer: 'London, UK (लंदन, ब्रिटेन)' },

            // Rome - Food & Agriculture - Italy
            { q: 'Where is the headquarter of Food and Agriculture Organization (FAO)?\nखाद्य और कृषि संगठन (FAO) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Rome, Italy (रोम, इटली)', 'London, UK (लंदन, ब्रिटेन)', 'Vienna, Austria (वियना, ऑस्ट्रिया)'], answer: 'Rome, Italy (रोम, इटली)' },
            { q: 'Where is the headquarter of International Fund for Agricultural Development (IFAD)?\nअंतर्राष्ट्रीय कृषि विकास कोष (IFAD) का मुख्यालय कहाँ है?', options: ['New York, USA (न्यूयॉर्क, अमेरिका)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'Rome, Italy (रोम, इटली)', 'Washington DC, USA (वाशिंगटन डी.सी., अमेरिका)'], answer: 'Rome, Italy (रोम, इटली)' },

            // Brussels - European Hub - Belgium
            { q: 'Where is the headquarter of North Atlantic Treaty Organization (NATO)?\nउत्तरी अटलांटिक संधि संगठन (NATO) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Rome, Italy (रोम, इटली)', 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)', 'Jakarta, Indonesia (जकार्ता, इंडोनेशिया)'], answer: 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)' },
            { q: 'Where is the headquarter of European Union (EU)?\nयूरोपीय संघ (EU) का मुख्यालय कहाँ है?', options: ['New York, USA (न्यूयॉर्क, अमेरिका)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'Rome, Italy (रोम, इटली)', 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)'], answer: 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)' },
            { q: 'Where is the headquarter of World Customs Organization (WCO)?\nविश्व सीमा शुल्क संगठन (WCO) का मुख्यालय कहाँ है?', options: ['New York, USA (न्यूयॉर्क, अमेरिका)', 'Geneva, Switzerland (जिनेवा, स्विट्जरलैंड)', 'Rome, Italy (रोम, इटली)', 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)'], answer: 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)' },

            // Asian Organizations
            { q: 'Where is the headquarter of Association of Southeast Asian Nations (ASEAN)?\nदक्षिण पूर्व एशियाई राष्ट्र संघ (ASEAN) का मुख्यालय कहाँ है?', options: ['Paris, France (पेरिस, फ्रांस)', 'Rome, Italy (रोम, इटली)', 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)', 'Jakarta, Indonesia (जकार्ता, इंडोनेशिया)'], answer: 'Jakarta, Indonesia (जकार्ता, इंडोनेशिया)' },
            { q: 'Where is the headquarter of South Asian Association for Regional Cooperation (SAARC)?\nदक्षिण एशियाई क्षेत्रीय सहयोग संगठन (SAARC) का मुख्यालय कहाँ है?', options: ['Lausanne, Switzerland (लुसान, स्विट्जरलैंड)', 'Kathmandu, Nepal (काठमांडू, नेपाल)', 'Brussels, Belgium (ब्रसेल्स, बेल्जियम)', 'Jakarta, Indonesia (जकार्ता, इंडोनेशिया)'], answer: 'Kathmandu, Nepal (काठमांडू, नेपाल)' },

            // Switzerland Special
            { q: 'Where is the headquarter of World Wide Fund for Nature (WWF)?\nवर्ल्ड वाइड फंड फॉर नेचर (WWF) का मुख्यालय कहाँ है?', options: ['Lausanne, Switzerland (लुसान, स्विट्जरलैंड)', 'Kathmandu, Nepal (काठमांडू, नेपाल)', 'Gland, Switzerland (ग्लैंड, स्विट्जरलैंड)', 'Jakarta, Indonesia (जकार्ता, इंडोनेशिया)'], answer: 'Gland, Switzerland (ग्लैंड, स्विट्जरलैंड)' },
            { q: 'Where is the headquarter of International Olympic Committee (IOC)?\nअंतर्राष्ट्रीय ओलंपिक समिति (IOC) का मुख्यालय कहाँ है?', options: ['Lausanne, Switzerland (लुसान, स्विट्जरलैंड)', 'Kathmandu, Nepal (काठमांडू, नेपाल)', 'Gland, Switzerland (ग्लैंड, स्विट्जरलैंड)', 'Jakarta, Indonesia (जकार्ता, इंडोनेशिया)'], answer: 'Lausanne, Switzerland (लुसान, स्विट्जरलैंड)' },

            // Africa
            { q: 'Where is the headquarter of United Nations Environment Programme (UNEP)?\nसंयुक्त राष्ट्र पर्यावरण कार्यक्रम (UNEP) का मुख्यालय कहाँ है?', options: ['Lausanne, Switzerland (लुसान, स्विट्जरलैंड)', 'Kathmandu, Nepal (काठमांडू, नेपाल)', 'Nairobi, Kenya (नैरोबी, केन्या)', 'Jakarta, Indonesia (जकार्ता, इंडोनेशिया)'], answer: 'Nairobi, Kenya (नैरोबी, केन्या)' }
        ]
    },

    // ============================================
    // 🌍 WORLD CAPITALS - BY CONTINENT
    // Premium Interactive Learning Experience
    // ============================================

    // 🌏 ASIA - The Largest Continent
    capitalsAsia: {
        title: 'Asia Capitals',
        emoji: '🌏',
        continent: 'Asia',
        xpPerQuestion: 15,
        questions: [
            { q: 'What is the capital of India?\nभारत की राजधानी क्या है?', options: ['Mumbai (मुंबई)', 'New Delhi (नई दिल्ली)', 'Kolkata (कोलकाता)', 'Chennai (चेन्नई)'], answer: 'New Delhi (नई दिल्ली)' },
            { q: 'What is the capital of China?\nचीन की राजधानी क्या है?', options: ['Shanghai (शंघाई)', 'Beijing (बीजिंग)', 'Hong Kong (हांगकांग)', 'Guangzhou (ग्वांगझोउ)'], answer: 'Beijing (बीजिंग)' },
            { q: 'What is the capital of Japan?\nजापान की राजधानी क्या है?', options: ['Osaka (ओसाका)', 'Kyoto (क्योटो)', 'Tokyo (टोक्यो)', 'Yokohama (योकोहामा)'], answer: 'Tokyo (टोक्यो)' },
            { q: 'What is the capital of Pakistan?\nपाकिस्तान की राजधानी क्या है?', options: ['Karachi (कराची)', 'Lahore (लाहौर)', 'Islamabad (इस्लामाबाद)', 'Peshawar (पेशावर)'], answer: 'Islamabad (इस्लामाबाद)' },
            { q: 'What is the capital of Bangladesh?\nबांग्लादेश की राजधानी क्या है?', options: ['Chittagong (चटगांव)', 'Dhaka (ढाका)', 'Khulna (खुलना)', 'Sylhet (सिलहट)'], answer: 'Dhaka (ढाका)' },
            { q: 'What is the capital of South Korea?\nदक्षिण कोरिया की राजधानी क्या है?', options: ['Busan (बुसान)', 'Incheon (इंचियोन)', 'Seoul (सियोल)', 'Daegu (दैगू)'], answer: 'Seoul (सियोल)' },
            { q: 'What is the capital of Thailand?\nथाईलैंड की राजधानी क्या है?', options: ['Pattaya (पटाया)', 'Chiang Mai (चियांग माई)', 'Bangkok (बैंकॉक)', 'Phuket (फुकेट)'], answer: 'Bangkok (बैंकॉक)' },
            { q: 'What is the capital of Indonesia?\nइंडोनेशिया की राजधानी क्या है?', options: ['Bali (बाली)', 'Surabaya (सुराबाया)', 'Jakarta (जकार्ता)', 'Bandung (बांडुंग)'], answer: 'Jakarta (जकार्ता)' },
            { q: 'What is the capital of Malaysia?\nमलेशिया की राजधानी क्या है?', options: ['Penang (पेनांग)', 'Johor Bahru (जोहर बहरू)', 'Kuala Lumpur (कुआलालंपुर)', 'Malacca (मलक्का)'], answer: 'Kuala Lumpur (कुआलालंपुर)' },
            { q: 'What is the capital of Vietnam?\nवियतनाम की राजधानी क्या है?', options: ['Ho Chi Minh City (हो ची मिन्ह सिटी)', 'Hanoi (हनोई)', 'Da Nang (दा नांग)', 'Hue (ह्यू)'], answer: 'Hanoi (हनोई)' },
            { q: 'What is the capital of Nepal?\nनेपाल की राजधानी क्या है?', options: ['Pokhara (पोखरा)', 'Kathmandu (काठमांडू)', 'Biratnagar (बिराटनगर)', 'Lalitpur (ललितपुर)'], answer: 'Kathmandu (काठमांडू)' },
            { q: 'What is the capital of Sri Lanka?\nश्रीलंका की राजधानी क्या है?', options: ['Kandy (कैंडी)', 'Colombo (कोलंबो)', 'Galle (गाले)', 'Jaffna (जाफना)'], answer: 'Colombo (कोलंबो)' },
            { q: 'What is the capital of Saudi Arabia?\nसऊदी अरब की राजधानी क्या है?', options: ['Jeddah (जेद्दा)', 'Mecca (मक्का)', 'Riyadh (रियाद)', 'Medina (मदीना)'], answer: 'Riyadh (रियाद)' },
            { q: 'What is the capital of UAE (United Arab Emirates)?\nसंयुक्त अरब अमीरात की राजधानी क्या है?', options: ['Dubai (दुबई)', 'Abu Dhabi (अबू धाबी)', 'Sharjah (शारजाह)', 'Ajman (अजमान)'], answer: 'Abu Dhabi (अबू धाबी)' },
            { q: 'What is the capital of Iran?\nईरान की राजधानी क्या है?', options: ['Isfahan (इस्फ़हान)', 'Shiraz (शिराज़)', 'Tehran (तेहरान)', 'Tabriz (तबरीज़)'], answer: 'Tehran (तेहरान)' },
            { q: 'What is the capital of Iraq?\nइराक की राजधानी क्या है?', options: ['Basra (बसरा)', 'Mosul (मोसुल)', 'Baghdad (बगदाद)', 'Erbil (अर्बिल)'], answer: 'Baghdad (बगदाद)' },
            { q: 'What is the capital of Israel?\nइज़राइल की राजधानी क्या है?', options: ['Tel Aviv (तेल अवीव)', 'Haifa (हाइफ़ा)', 'Jerusalem (येरूशलेम)', 'Eilat (ईलात)'], answer: 'Jerusalem (येरूशलेम)' },
            { q: 'What is the capital of Singapore?\nसिंगापुर की राजधानी क्या है?', options: ['Jurong (जुरोंग)', 'Sentosa (सेंटोसा)', 'Singapore City (सिंगापुर सिटी)', 'Changi (चांगी)'], answer: 'Singapore City (सिंगापुर सिटी)' },
            { q: 'What is the capital of Philippines?\nफिलीपींस की राजधानी क्या है?', options: ['Cebu (सेबू)', 'Davao (दावाओ)', 'Manila (मनीला)', 'Quezon City (क्वेज़ोन सिटी)'], answer: 'Manila (मनीला)' },
            { q: 'What is the capital of Afghanistan?\nअफ़ग़ानिस्तान की राजधानी क्या है?', options: ['Kandahar (कंधार)', 'Herat (हेरात)', 'Kabul (काबुल)', 'Mazar-i-Sharif (मज़ार-ए-शरीफ़)'], answer: 'Kabul (काबुल)' }
        ]
    },

    // 🌍 EUROPE - The Old Continent
    capitalsEurope: {
        title: 'Europe Capitals',
        emoji: '🏰',
        continent: 'Europe',
        xpPerQuestion: 15,
        questions: [
            { q: 'What is the capital of United Kingdom?\nयूनाइटेड किंगडम की राजधानी क्या है?', options: ['Manchester (मैनचेस्टर)', 'Birmingham (बर्मिंघम)', 'London (लंदन)', 'Liverpool (लिवरपूल)'], answer: 'London (लंदन)' },
            { q: 'What is the capital of France?\nफ्रांस की राजधानी क्या है?', options: ['Lyon (लियोन)', 'Marseille (मार्सिले)', 'Paris (पेरिस)', 'Nice (नीस)'], answer: 'Paris (पेरिस)' },
            { q: 'What is the capital of Germany?\nजर्मनी की राजधानी क्या है?', options: ['Munich (म्यूनिख)', 'Hamburg (हैम्बर्ग)', 'Berlin (बर्लिन)', 'Frankfurt (फ्रैंकफर्ट)'], answer: 'Berlin (बर्लिन)' },
            { q: 'What is the capital of Italy?\nइटली की राजधानी क्या है?', options: ['Milan (मिलान)', 'Venice (वेनिस)', 'Rome (रोम)', 'Florence (फ्लोरेंस)'], answer: 'Rome (रोम)' },
            { q: 'What is the capital of Spain?\nस्पेन की राजधानी क्या है?', options: ['Barcelona (बार्सिलोना)', 'Seville (सेविले)', 'Madrid (मैड्रिड)', 'Valencia (वालेंसिया)'], answer: 'Madrid (मैड्रिड)' },
            { q: 'What is the capital of Russia?\nरूस की राजधानी क्या है?', options: ['St. Petersburg (सेंट पीटर्सबर्ग)', 'Kazan (कज़ान)', 'Moscow (मॉस्को)', 'Sochi (सोची)'], answer: 'Moscow (मॉस्को)' },
            { q: 'What is the capital of Netherlands?\nनीदरलैंड की राजधानी क्या है?', options: ['Rotterdam (रॉटरडैम)', 'The Hague (द हेग)', 'Amsterdam (एम्स्टर्डम)', 'Utrecht (यूट्रेक्ट)'], answer: 'Amsterdam (एम्स्टर्डम)' },
            { q: 'What is the capital of Belgium?\nबेल्जियम की राजधानी क्या है?', options: ['Antwerp (एंटवर्प)', 'Ghent (गेंट)', 'Brussels (ब्रसेल्स)', 'Bruges (ब्रुग्स)'], answer: 'Brussels (ब्रसेल्स)' },
            { q: 'What is the capital of Switzerland?\nस्विट्जरलैंड की राजधानी क्या है?', options: ['Zurich (ज्यूरिख)', 'Geneva (जिनेवा)', 'Bern (बर्न)', 'Basel (बेसल)'], answer: 'Bern (बर्न)' },
            { q: 'What is the capital of Austria?\nऑस्ट्रिया की राजधानी क्या है?', options: ['Salzburg (साल्ज़बर्ग)', 'Innsbruck (इंसब्रुक)', 'Vienna (वियना)', 'Graz (ग्राज़)'], answer: 'Vienna (वियना)' },
            { q: 'What is the capital of Poland?\nपोलैंड की राजधानी क्या है?', options: ['Krakow (क्राको)', 'Gdansk (ग्दान्स्क)', 'Warsaw (वारसॉ)', 'Wroclaw (व्रोत्सवाव)'], answer: 'Warsaw (वारसॉ)' },
            { q: 'What is the capital of Sweden?\nस्वीडन की राजधानी क्या है?', options: ['Gothenburg (गोथेनबर्ग)', 'Malmo (मालमो)', 'Stockholm (स्टॉकहोम)', 'Uppsala (उप्साला)'], answer: 'Stockholm (स्टॉकहोम)' },
            { q: 'What is the capital of Norway?\nनॉर्वे की राजधानी क्या है?', options: ['Bergen (बर्गन)', 'Trondheim (ट्रोंडहाइम)', 'Oslo (ओस्लो)', 'Stavanger (स्टावेंगर)'], answer: 'Oslo (ओस्लो)' },
            { q: 'What is the capital of Denmark?\nडेनमार्क की राजधानी क्या है?', options: ['Aarhus (ऑरहस)', 'Odense (ओडेंसे)', 'Copenhagen (कोपेनहेगन)', 'Aalborg (आलबोर्ग)'], answer: 'Copenhagen (कोपेनहेगन)' },
            { q: 'What is the capital of Finland?\nफिनलैंड की राजधानी क्या है?', options: ['Turku (तुर्कू)', 'Tampere (तम्पेरे)', 'Helsinki (हेलसिंकी)', 'Oulu (ओउलु)'], answer: 'Helsinki (हेलसिंकी)' },
            { q: 'What is the capital of Greece?\nग्रीस की राजधानी क्या है?', options: ['Thessaloniki (थेसालोनिकी)', 'Patras (पात्रस)', 'Athens (एथेंस)', 'Heraklion (हेराक्लिओन)'], answer: 'Athens (एथेंस)' },
            { q: 'What is the capital of Portugal?\nपुर्तगाल की राजधानी क्या है?', options: ['Porto (पोर्टो)', 'Braga (ब्रागा)', 'Lisbon (लिस्बन)', 'Coimbra (कोइम्ब्रा)'], answer: 'Lisbon (लिस्बन)' },
            { q: 'What is the capital of Ireland?\nआयरलैंड की राजधानी क्या है?', options: ['Cork (कॉर्क)', 'Galway (गॉलवे)', 'Dublin (डबलिन)', 'Limerick (लिमेरिक)'], answer: 'Dublin (डबलिन)' },
            { q: 'What is the capital of Turkey?\nतुर्की की राजधानी क्या है?', options: ['Istanbul (इस्तांबुल)', 'Izmir (इज़मिर)', 'Ankara (अंकारा)', 'Antalya (अंताल्या)'], answer: 'Ankara (अंकारा)' },
            { q: 'What is the capital of Ukraine?\nयूक्रेन की राजधानी क्या है?', options: ['Kharkiv (खार्किव)', 'Odessa (ओडेसा)', 'Kyiv (कीव)', 'Lviv (ल्वीव)'], answer: 'Kyiv (कीव)' }
        ]
    },

    // 🌍 AFRICA - The Motherland
    capitalsAfrica: {
        title: 'Africa Capitals',
        emoji: '🦁',
        continent: 'Africa',
        xpPerQuestion: 15,
        questions: [
            { q: 'What is the capital of Egypt?\nमिस्र की राजधानी क्या है?', options: ['Alexandria (अलेक्जेंड्रिया)', 'Giza (गीज़ा)', 'Cairo (काहिरा)', 'Luxor (लक्सर)'], answer: 'Cairo (काहिरा)' },
            { q: 'What is the capital of South Africa (Administrative)?\nदक्षिण अफ्रीका की प्रशासनिक राजधानी क्या है?', options: ['Johannesburg (जोहान्सबर्ग)', 'Cape Town (केप टाउन)', 'Pretoria (प्रिटोरिया)', 'Durban (डरबन)'], answer: 'Pretoria (प्रिटोरिया)' },
            { q: 'What is the capital of Nigeria?\nनाइजीरिया की राजधानी क्या है?', options: ['Lagos (लागोस)', 'Kano (कानो)', 'Abuja (अबुजा)', 'Ibadan (इबादान)'], answer: 'Abuja (अबुजा)' },
            { q: 'What is the capital of Kenya?\nकेन्या की राजधानी क्या है?', options: ['Mombasa (मोम्बासा)', 'Kisumu (किसुमू)', 'Nairobi (नैरोबी)', 'Nakuru (नाकुरू)'], answer: 'Nairobi (नैरोबी)' },
            { q: 'What is the capital of Ethiopia?\nइथियोपिया की राजधानी क्या है?', options: ['Dire Dawa (दिरे दावा)', 'Mekelle (मेकेले)', 'Addis Ababa (अदीस अबाबा)', 'Gondar (गोंदर)'], answer: 'Addis Ababa (अदीस अबाबा)' },
            { q: 'What is the capital of Morocco?\nमोरक्को की राजधानी क्या है?', options: ['Casablanca (कैसाब्लांका)', 'Marrakech (मराकेश)', 'Rabat (रबात)', 'Fez (फ़ेज़)'], answer: 'Rabat (रबात)' },
            { q: 'What is the capital of Ghana?\nघाना की राजधानी क्या है?', options: ['Kumasi (कुमासी)', 'Tamale (तमाले)', 'Accra (अक्रा)', 'Sekondi (सेकोंडी)'], answer: 'Accra (अक्रा)' },
            { q: 'What is the capital of Tanzania?\nतंजानिया की राजधानी क्या है?', options: ['Dar es Salaam (दार एस सलाम)', 'Mwanza (म्वान्ज़ा)', 'Dodoma (डोडोमा)', 'Arusha (अरुशा)'], answer: 'Dodoma (डोडोमा)' },
            { q: 'What is the capital of Algeria?\nअल्जीरिया की राजधानी क्या है?', options: ['Oran (ओरान)', 'Constantine (कॉन्स्टेंटाइन)', 'Algiers (अल्जीयर्स)', 'Annaba (अन्नाबा)'], answer: 'Algiers (अल्जीयर्स)' },
            { q: 'What is the capital of Uganda?\nयुगांडा की राजधानी क्या है?', options: ['Entebbe (एंटेबे)', 'Jinja (जिंजा)', 'Kampala (कम्पाला)', 'Mbarara (म्बारारा)'], answer: 'Kampala (कम्पाला)' },
            { q: 'What is the capital of Sudan?\nसूडान की राजधानी क्या है?', options: ['Omdurman (ओम्दुरमान)', 'Port Sudan (पोर्ट सूडान)', 'Khartoum (खार्तूम)', 'Kassala (कसाला)'], answer: 'Khartoum (खार्तूम)' },
            { q: 'What is the capital of Zimbabwe?\nजिम्बाब्वे की राजधानी क्या है?', options: ['Bulawayo (बुलावायो)', 'Mutare (मुतारे)', 'Harare (हरारे)', 'Gweru (ग्वेरू)'], answer: 'Harare (हरारे)' },
            { q: 'What is the capital of Libya?\nलीबिया की राजधानी क्या है?', options: ['Benghazi (बेंगाज़ी)', 'Misrata (मिसरता)', 'Tripoli (त्रिपोली)', 'Sabha (सभा)'], answer: 'Tripoli (त्रिपोली)' },
            { q: 'What is the capital of Tunisia?\nट्यूनीशिया की राजधानी क्या है?', options: ['Sfax (स्फ़ैक्स)', 'Sousse (सूसे)', 'Tunis (ट्यूनिस)', 'Kairouan (कैरोउआन)'], answer: 'Tunis (ट्यूनिस)' },
            { q: 'What is the capital of Rwanda?\nरवांडा की राजधानी क्या है?', options: ['Butare (बुटारे)', 'Gisenyi (गिसेन्यी)', 'Kigali (किगाली)', 'Ruhengeri (रुहेंगेरी)'], answer: 'Kigali (किगाली)' }
        ]
    },

    // 🌎 NORTH AMERICA - The New World
    capitalsNorthAmerica: {
        title: 'North America Capitals',
        emoji: '🗽',
        continent: 'North America',
        xpPerQuestion: 15,
        questions: [
            { q: 'What is the capital of USA?\nअमेरिका की राजधानी क्या है?', options: ['New York (न्यूयॉर्क)', 'Los Angeles (लॉस एंजिलिस)', 'Washington D.C. (वाशिंगटन डी.सी.)', 'Chicago (शिकागो)'], answer: 'Washington D.C. (वाशिंगटन डी.सी.)' },
            { q: 'What is the capital of Canada?\nकनाडा की राजधानी क्या है?', options: ['Toronto (टोरंटो)', 'Vancouver (वैंकूवर)', 'Ottawa (ओटावा)', 'Montreal (मॉन्ट्रियल)'], answer: 'Ottawa (ओटावा)' },
            { q: 'What is the capital of Mexico?\nमैक्सिको की राजधानी क्या है?', options: ['Guadalajara (ग्वाडलहारा)', 'Cancun (कैनकन)', 'Mexico City (मैक्सिको सिटी)', 'Monterrey (मोंटेरी)'], answer: 'Mexico City (मैक्सिको सिटी)' },
            { q: 'What is the capital of Cuba?\nक्यूबा की राजधानी क्या है?', options: ['Santiago de Cuba (सैंटियागो डे क्यूबा)', 'Varadero (वरादेरो)', 'Havana (हवाना)', 'Camaguey (कैमाग्वे)'], answer: 'Havana (हवाना)' },
            { q: 'What is the capital of Jamaica?\nजमैका की राजधानी क्या है?', options: ['Montego Bay (मोंटेगो बे)', 'Ocho Rios (ओचो रियोस)', 'Kingston (किंग्स्टन)', 'Port Antonio (पोर्ट एंटोनियो)'], answer: 'Kingston (किंग्स्टन)' },
            { q: 'What is the capital of Guatemala?\nग्वाटेमाला की राजधानी क्या है?', options: ['Antigua (एंटीगुआ)', 'Quetzaltenango (क्वेट्ज़ालटेनांगो)', 'Guatemala City (ग्वाटेमाला सिटी)', 'Flores (फ्लोरेस)'], answer: 'Guatemala City (ग्वाटेमाला सिटी)' },
            { q: 'What is the capital of Panama?\nपनामा की राजधानी क्या है?', options: ['Colon (कोलोन)', 'David (डेविड)', 'Panama City (पनामा सिटी)', 'Bocas del Toro (बोकास डेल टोरो)'], answer: 'Panama City (पनामा सिटी)' },
            { q: 'What is the capital of Costa Rica?\nकोस्टा रिका की राजधानी क्या है?', options: ['Limon (लिमोन)', 'Alajuela (अलाहुएला)', 'San Jose (सैन होज़े)', 'Puntarenas (पुंटारेनास)'], answer: 'San Jose (सैन होज़े)' },
            { q: 'What is the capital of Honduras?\nहोंडुरास की राजधानी क्या है?', options: ['San Pedro Sula (सैन पेड्रो सुला)', 'La Ceiba (ला सेइबा)', 'Tegucigalpa (तेगुसिगाल्पा)', 'Choloma (चोलोमा)'], answer: 'Tegucigalpa (तेगुसिगाल्पा)' },
            { q: 'What is the capital of Haiti?\nहैती की राजधानी क्या है?', options: ['Cap-Haitien (कैप-हेटियन)', 'Gonaives (गोनाइव्स)', 'Port-au-Prince (पोर्ट-ओ-प्रिंस)', 'Jacmel (जैक्मेल)'], answer: 'Port-au-Prince (पोर्ट-ओ-प्रिंस)' },
            { q: 'What is the capital of Dominican Republic?\nडोमिनिकन गणराज्य की राजधानी क्या है?', options: ['Santiago (सैंटियागो)', 'Punta Cana (पुंटा काना)', 'Santo Domingo (सैंटो डोमिंगो)', 'Puerto Plata (प्वेर्टो प्लाटा)'], answer: 'Santo Domingo (सैंटो डोमिंगो)' },
            { q: 'What is the capital of El Salvador?\nएल साल्वाडोर की राजधानी क्या है?', options: ['Santa Ana (सांता एना)', 'San Miguel (सैन मिगुएल)', 'San Salvador (सैन साल्वाडोर)', 'Soyapango (सोयापांगो)'], answer: 'San Salvador (सैन साल्वाडोर)' }
        ]
    },

    // 🌎 SOUTH AMERICA - The Land of Passion
    capitalsSouthAmerica: {
        title: 'South America Capitals',
        emoji: '🌴',
        continent: 'South America',
        xpPerQuestion: 15,
        questions: [
            { q: 'What is the capital of Brazil?\nब्राज़ील की राजधानी क्या है?', options: ['Sao Paulo (साओ पाउलो)', 'Rio de Janeiro (रियो डी जेनेरो)', 'Brasilia (ब्रासीलिया)', 'Salvador (साल्वाडोर)'], answer: 'Brasilia (ब्रासीलिया)' },
            { q: 'What is the capital of Argentina?\nअर्जेंटीना की राजधानी क्या है?', options: ['Cordoba (कॉर्डोबा)', 'Rosario (रोसारियो)', 'Buenos Aires (ब्यूनस आयर्स)', 'Mendoza (मेंडोज़ा)'], answer: 'Buenos Aires (ब्यूनस आयर्स)' },
            { q: 'What is the capital of Peru?\nपेरू की राजधानी क्या है?', options: ['Cusco (कुस्को)', 'Arequipa (अरेकिपा)', 'Lima (लीमा)', 'Trujillo (ट्रुजिलो)'], answer: 'Lima (लीमा)' },
            { q: 'What is the capital of Colombia?\nकोलंबिया की राजधानी क्या है?', options: ['Medellin (मेडेलिन)', 'Cali (काली)', 'Bogota (बोगोटा)', 'Cartagena (कार्टाजेना)'], answer: 'Bogota (बोगोटा)' },
            { q: 'What is the capital of Venezuela?\nवेनेज़ुएला की राजधानी क्या है?', options: ['Maracaibo (माराकाइबो)', 'Valencia (वालेंसिया)', 'Caracas (काराकास)', 'Barquisimeto (बार्किसिमेटो)'], answer: 'Caracas (काराकास)' },
            { q: 'What is the capital of Chile?\nचिली की राजधानी क्या है?', options: ['Valparaiso (वालपाराइसो)', 'Concepcion (कॉन्सेप्सियोन)', 'Santiago (सैंटियागो)', 'Vina del Mar (विना डेल मार)'], answer: 'Santiago (सैंटियागो)' },
            { q: 'What is the capital of Ecuador?\nइक्वाडोर की राजधानी क्या है?', options: ['Guayaquil (ग्वायाकिल)', 'Cuenca (क्वेंका)', 'Quito (क्विटो)', 'Manta (मांता)'], answer: 'Quito (क्विटो)' },
            { q: 'What is the capital of Bolivia (Constitutional)?\nबोलीविया की संवैधानिक राजधानी क्या है?', options: ['La Paz (ला पाज़)', 'Cochabamba (कोचाबाम्बा)', 'Sucre (सुक्रे)', 'Santa Cruz (सांता क्रूज़)'], answer: 'Sucre (सुक्रे)' },
            { q: 'What is the capital of Paraguay?\nपैराग्वे की राजधानी क्या है?', options: ['Ciudad del Este (स्युदाद देल एस्ते)', 'Encarnacion (एंकार्नासियोन)', 'Asuncion (असुंसियोन)', 'Luque (लुके)'], answer: 'Asuncion (असुंसियोन)' },
            { q: 'What is the capital of Uruguay?\nउरुग्वे की राजधानी क्या है?', options: ['Salto (साल्टो)', 'Paysandu (पायसांदू)', 'Montevideo (मोंटेवीडियो)', 'Rivera (रिवेरा)'], answer: 'Montevideo (मोंटेवीडियो)' },
            { q: 'What is the capital of Guyana?\nगुयाना की राजधानी क्या है?', options: ['Linden (लिंडेन)', 'New Amsterdam (न्यू एम्स्टर्डम)', 'Georgetown (जॉर्जटाउन)', 'Bartica (बार्टिका)'], answer: 'Georgetown (जॉर्जटाउन)' },
            { q: 'What is the capital of Suriname?\nसूरीनाम की राजधानी क्या है?', options: ['Nieuw Nickerie (न्यू निकेरी)', 'Lelydorp (लेलीडोर्प)', 'Paramaribo (पैरामारिबो)', 'Moengo (मोएंगो)'], answer: 'Paramaribo (पैरामारिबो)' }
        ]
    },

    // 🏝️ OCEANIA - Islands of Paradise
    capitalsOceania: {
        title: 'Oceania Capitals',
        emoji: '🏝️',
        continent: 'Oceania',
        xpPerQuestion: 15,
        questions: [
            { q: 'What is the capital of Australia?\nऑस्ट्रेलिया की राजधानी क्या है?', options: ['Sydney (सिडनी)', 'Melbourne (मेलबर्न)', 'Canberra (कैनबरा)', 'Brisbane (ब्रिस्बेन)'], answer: 'Canberra (कैनबरा)' },
            { q: 'What is the capital of New Zealand?\nन्यूज़ीलैंड की राजधानी क्या है?', options: ['Auckland (ऑकलैंड)', 'Christchurch (क्राइस्टचर्च)', 'Wellington (वेलिंगटन)', 'Hamilton (हैमिल्टन)'], answer: 'Wellington (वेलिंगटन)' },
            { q: 'What is the capital of Fiji?\nफिजी की राजधानी क्या है?', options: ['Nadi (नाडी)', 'Lautoka (लौटोका)', 'Suva (सुवा)', 'Labasa (लबासा)'], answer: 'Suva (सुवा)' },
            { q: 'What is the capital of Papua New Guinea?\nपापुआ न्यू गिनी की राजधानी क्या है?', options: ['Lae (ला)', 'Madang (मडांग)', 'Port Moresby (पोर्ट मोरेस्बी)', 'Goroka (गोरोका)'], answer: 'Port Moresby (पोर्ट मोरेस्बी)' },
            { q: 'What is the capital of Samoa?\nसमोआ की राजधानी क्या है?', options: ['Salelologa (सालेलोलोगा)', 'Leulumoega (लेउलुमोएगा)', 'Apia (आपिया)', 'Faleasiu (फालेसियू)'], answer: 'Apia (आपिया)' },
            { q: 'What is the capital of Tonga?\nटोंगा की राजधानी क्या है?', options: ['Neiafu (नेइआफू)', 'Pangai (पंगाई)', 'Nukualofa (नुकुअलोफ़ा)', 'Haapai (हापई)'], answer: 'Nukualofa (नुकुअलोफ़ा)' },
            { q: 'What is the capital of Vanuatu?\nवानुआतू की राजधानी क्या है?', options: ['Luganville (लुगानविल)', 'Isangel (इसांगेल)', 'Port Vila (पोर्ट विला)', 'Lakatoro (लाकाटोरो)'], answer: 'Port Vila (पोर्ट विला)' },
            { q: 'What is the capital of Solomon Islands?\nसोलोमन द्वीप की राजधानी क्या है?', options: ['Gizo (गिज़ो)', 'Auki (औकी)', 'Honiara (होनियारा)', 'Buala (बुआला)'], answer: 'Honiara (होनियारा)' },
            { q: 'What is the capital of Kiribati?\nकिरिबाती की राजधानी क्या है?', options: ['Betio (बेटियो)', 'Bikenibeu (बिकेनीबेउ)', 'Tarawa (तारावा)', 'Bairiki (बैरीकी)'], answer: 'Tarawa (तारावा)' },
            { q: 'What is the capital of Micronesia?\nमाइक्रोनेशिया की राजधानी क्या है?', options: ['Weno (वेनो)', 'Kolonia (कोलोनिया)', 'Palikir (पालीकिर)', 'Tofol (टोफ़ोल)'], answer: 'Palikir (पालीकिर)' }
        ]
    }
};

// Facts of the Day
const factsOfDay = [
    "India has the largest postal network in the world with over 1.5 lakh post offices!",
    "The game of Chess was invented in India!",
    "India was the first country to mine diamonds!",
    "Yoga originated in India over 5,000 years ago!",
    "India has the world's largest democracy!",
    "The concept of zero was formalized by Indian mathematician Brahmagupta!",
    "India's Mars mission cost less than the movie Gravity!"
];

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
    setRandomFact();
    updateUI();
    checkNewBadges(); // Hide "NEW" badges after 4 days
    initFilterTabs(); // Initialize filter tabs
});

// ============================================
// FILTER TABS SYSTEM
// ============================================
let currentFilter = 'all';

function initFilterTabs() {
    // Load saved filter preference
    const savedFilter = localStorage.getItem('gk-filter-preference') || 'all';
    filterQuizzes(savedFilter);
    updateFilterCounts();
}

function filterQuizzes(category) {
    currentFilter = category;

    // Save preference
    localStorage.setItem('gk-filter-preference', category);

    // Update tab states
    document.querySelectorAll('.filter-tab').forEach(tab => {
        if (tab.dataset.filter === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Get all quiz cards (exclude leaderboard)
    const cards = document.querySelectorAll('.activity-card[data-category]');
    let visibleCount = 0;

    cards.forEach((card, index) => {
        const cardCategories = card.dataset.category || '';
        const shouldShow = category === 'all' || cardCategories.includes(category);

        if (shouldShow) {
            card.classList.remove('hidden');
            card.classList.add('visible');
            card.style.animationDelay = `${visibleCount * 0.05}s`;
            visibleCount++;
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
        }
    });

    // Show leaderboard card always
    const leaderboardCard = document.querySelector('.leaderboard-card');
    if (leaderboardCard) {
        leaderboardCard.classList.remove('hidden');
        leaderboardCard.classList.add('visible');
    }
}

function updateFilterCounts() {
    const cards = document.querySelectorAll('.activity-card[data-category]');
    let indiaCount = 0;
    let internationalCount = 0;
    let allCount = cards.length;

    cards.forEach(card => {
        const categories = card.dataset.category || '';
        if (categories.includes('india')) indiaCount++;
        if (categories.includes('international')) internationalCount++;
    });

    // Update count badges
    const countAll = document.getElementById('countAll');
    const countIndia = document.getElementById('countIndia');
    const countInternational = document.getElementById('countInternational');

    if (countAll) countAll.textContent = allCount;
    if (countIndia) countIndia.textContent = indiaCount;
    if (countInternational) countInternational.textContent = internationalCount;
}

// Hide NEW badges after 48 hours (industry standard for "new" content)
function checkNewBadges() {
    const badges = document.querySelectorAll('.new-badge-auto, .new-badge[data-added]');
    const now = new Date();
    const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

    badges.forEach(badge => {
        const addedDateStr = badge.getAttribute('data-added') ||
            badge.closest('[data-added]')?.getAttribute('data-added');

        if (!addedDateStr) return;

        const addedDate = new Date(addedDateStr);
        const timePassed = now - addedDate;

        if (timePassed > FORTY_EIGHT_HOURS_MS) {
            // Hide the NEW badge after 48 hours using CSS class (cleaner approach)
            badge.classList.add('badge-hidden');
        }
    });
}

function loadPlayerData() {
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

function setRandomFact() {
    const fact = factsOfDay[Math.floor(Math.random() * factsOfDay.length)];
    document.getElementById('factText').textContent = fact;
}

// ============================================
// QUIZ SYSTEM
// ============================================

// Activity order for access control (first one is free)
const gkActivityOrder = ['personalities', 'inventions', 'sports', 'national', 'days', 'books', 'awards', 'firsts', 'statesCapitals', 'internationalOrgs', 'capitalsAsia', 'capitalsEurope', 'capitalsAfrica', 'capitalsNorthAmerica', 'capitalsSouthAmerica', 'capitalsOceania'];

// ============================================
// 🌍 WORLD CAPITALS - CONTINENT SELECTOR
// Premium Interactive Experience
// ============================================

// Continent data for the selector
const worldCapitalsContinents = [
    { id: 'capitalsAsia', name: 'Asia', emoji: '🌏', countries: 20, color: 'linear-gradient(135deg, #ff6b6b, #ffa502)' },
    { id: 'capitalsEurope', name: 'Europe', emoji: '🏰', countries: 20, color: 'linear-gradient(135deg, #3742fa, #5352ed)' },
    { id: 'capitalsAfrica', name: 'Africa', emoji: '🦁', countries: 15, color: 'linear-gradient(135deg, #2ed573, #1abc9c)' },
    { id: 'capitalsNorthAmerica', name: 'North America', emoji: '🗽', countries: 12, color: 'linear-gradient(135deg, #1e90ff, #00bcd4)' },
    { id: 'capitalsSouthAmerica', name: 'South America', emoji: '🌴', countries: 12, color: 'linear-gradient(135deg, #ff9f43, #ee5a24)' },
    { id: 'capitalsOceania', name: 'Oceania', emoji: '🏝️', countries: 10, color: 'linear-gradient(135deg, #a55eea, #8854d0)' }
];

function openWorldCapitals() {
    // Check if user is logged in for premium content
    if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
        if (window.BroProAuth) {
            BroProAuth.showLoginRequired('Login to explore World Capitals and master geography!');
        } else {
            alert('Please login to access World Capitals!');
        }
        return;
    }

    // Check premium access
    if (window.BroProPremium && !BroProPremium.isPremium()) {
        BroProPremium.showPremiumRequired('World Capitals');
        return;
    }

    // Show the continent selector modal
    document.getElementById('continentSelectorModal').classList.add('active');
}

function closeContinentSelector() {
    document.getElementById('continentSelectorModal').classList.remove('active');
}

function selectContinent(continentId) {
    closeContinentSelector();
    openActivity(continentId);
}

// Calculate total World Capitals questions
function getTotalWorldCapitalsQuestions() {
    return worldCapitalsContinents.reduce((total, c) => {
        const data = gkData[c.id];
        return total + (data ? data.questions.length : 0);
    }, 0);
}

function openActivity(mode) {
    const data = gkData[mode];
    if (!data) return;

    // Check access - first activity is free, others need login
    const activityIndex = gkActivityOrder.indexOf(mode);

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
    quizState.userAnswers = []; // Reset user answers
    quizState.questions = shuffleArray([...data.questions]);

    // Update header
    document.getElementById('quizCategory').textContent = 'General Knowledge';
    document.getElementById('quizTitle').textContent = data.title;
    document.getElementById('totalQ').textContent = quizState.questions.length;

    // Reset stats
    document.getElementById('correctCount').textContent = '0';
    document.getElementById('wrongCount').textContent = '0';
    document.getElementById('xpCount2').textContent = '0';

    document.getElementById('quizModal').classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    const data = gkData[quizState.mode];

    document.getElementById('currentQ').textContent = quizState.currentIndex + 1;
    document.getElementById('questionEmoji').textContent = data.emoji;
    // Replace newlines with <br> for proper Hindi translation line breaks
    document.getElementById('questionText').innerHTML = q.q.replace(/\n/g, '<br>');

    // Progress
    const progress = (quizState.currentIndex / quizState.questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Shuffle options for random order each time
    const shuffledOptions = shuffleArray([...q.options]);

    // Options
    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = shuffledOptions.map(opt => `
        <button class="option-btn" onclick="selectOption(this, '${opt.replace(/'/g, "\\'")}')">${opt}</button>
    `).join('');

    // Hide feedback
    document.getElementById('feedbackBox').className = 'feedback-box';
}

function selectOption(btn, answer) {
    const q = quizState.questions[quizState.currentIndex];
    const data = gkData[quizState.mode];
    const isCorrect = answer === q.answer;

    // Track user's answer for explanations
    quizState.userAnswers[quizState.currentIndex] = answer;

    // Disable buttons
    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.textContent === q.answer) b.classList.add('correct');
    });

    const feedback = document.getElementById('feedbackBox');

    if (isCorrect) {
        btn.classList.add('correct');
        quizState.correct++;
        quizState.xpEarned += data.xpPerQuestion;

        feedback.className = 'feedback-box visible correct';
        document.getElementById('feedbackIcon').textContent = '✅';
        document.getElementById('feedbackText').textContent = 'Correct! +' + data.xpPerQuestion + ' XP';

        // Use recordCorrect for streak tracking
        if (window.BroProSounds) BroProSounds.recordCorrect();
    } else {
        btn.classList.add('wrong');
        quizState.wrong++;

        feedback.className = 'feedback-box visible wrong';
        document.getElementById('feedbackIcon').textContent = '❌';
        document.getElementById('feedbackText').textContent = 'Answer: ' + q.answer;

        // Use recordWrong for streak tracking
        if (window.BroProSounds) BroProSounds.recordWrong();
    }

    // Update stats
    document.getElementById('correctCount').textContent = quizState.correct;
    document.getElementById('wrongCount').textContent = quizState.wrong;
    document.getElementById('xpCount2').textContent = quizState.xpEarned;

    // Show inline explanation then advance on user click
    if (window.BroProInlineExp) {
        BroProInlineExp.show({
            question: q.q,
            answer: answer,
            correctAnswer: q.answer,
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

// ============================================
// END QUIZ
// ============================================
function endQuiz() {
    document.getElementById('quizModal').classList.remove('active');

    const total = quizState.questions.length;
    const accuracy = Math.round((quizState.correct / total) * 100);

    // Calculate XP with mastery multiplier
    let finalXP = quizState.xpEarned;
    let xpMessage = null;

    if (window.BroProPlayer) {
        // Get XP multiplier based on mastery status
        const multiplierInfo = BroProPlayer.calculateXPMultiplier('gk', quizState.mode, accuracy);
        finalXP = Math.floor(quizState.xpEarned * multiplierInfo.multiplier);
        xpMessage = multiplierInfo.message;

        // Record this quiz completion
        BroProPlayer.recordQuizCompletion('gk', quizState.mode, quizState.correct, total);

        // Add the adjusted XP
        BroProPlayer.addXP(finalXP, 'gk');
        updateUI();

        console.log(`📊 GK Quiz Complete - Raw XP: ${quizState.xpEarned}, Multiplier: ${multiplierInfo.multiplier}, Final XP: ${finalXP}`);
    }

    document.getElementById('finalCorrect').textContent = quizState.correct;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalXP').textContent = finalXP;

    // Show practice mode indicator if applicable
    const resultsXPElement = document.getElementById('finalXP');
    if (xpMessage && resultsXPElement && finalXP < quizState.xpEarned) {
        resultsXPElement.innerHTML = `${finalXP} <small style="font-size:0.6em;opacity:0.7">(Practice)</small>`;
    }

    const title = accuracy >= 90 ? '🌟 Genius!' :
        accuracy >= 70 ? '🎉 Excellent!' :
            accuracy >= 50 ? '👍 Good Job!' :
                '💪 Keep Learning!';
    document.getElementById('resultsTitle').textContent = title;

    const icon = accuracy >= 90 ? '🏆' :
        accuracy >= 70 ? '🥈' :
            accuracy >= 50 ? '🥉' : '📚';
    document.getElementById('resultsIcon').textContent = icon;

    document.getElementById('resultsModal').classList.add('active');

    // Store quiz results for explanations
    if (window.BroProExplanations) {
        BroProExplanations.storeQuizResults(quizState.questions, quizState.userAnswers, 'gk', quizState.mode);
    }

    if (accuracy >= 70 && window.BroProEffects) {
        BroProEffects.confetti();
    }

    // 🎰 Check for Saat Crore Easter Egg (7 quizzes with 90%+ accuracy)
    if (window.SaatCroreEasterEgg) {
        SaatCroreEasterEgg.recordPerfectQuiz(accuracy, quizState.mode);
    }

    // 📢 Log to real-time activity feed (visible to all users)
    if (window.logQuizActivity) {
        logQuizActivity('gk', finalXP, accuracy);
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
    openActivity(quizState.mode);
}

function closeResults() {
    document.getElementById('resultsModal').classList.remove('active');
}

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

// Current GK leaderboard period
let currentGKPeriod = 'alltime';

function openLeaderboard() {
    if (!window.BroProPlayer || !BroProPlayer.isLoggedIn()) {
        BroProAuth.showLoginRequired('Login to view the leaderboard!');
        return;
    }
    document.getElementById('leaderboardModal').classList.add('active');
    renderLeaderboard();
}

function closeLeaderboard() {
    document.getElementById('leaderboardModal').classList.remove('active');
}

function switchTab(period) {
    currentGKPeriod = period;

    // Update tab buttons
    const tabs = document.querySelectorAll('.leaderboard-tabs .tab-btn');
    tabs.forEach(tab => {
        const isActive = tab.dataset.period === period;
        tab.classList.toggle('active', isActive);

        if (isActive) {
            tab.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
            tab.style.color = 'white';
            tab.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.3)';
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
        BroProLeaderboard.renderLeaderboard('leaderboardList', 'gk', {
            showDelete: false,
            limit: 20,
            period: period
        });

        // Also update your rank separately
        BroProLeaderboard.getUserRank('gk').then(rankInfo => {
            document.getElementById('yourPosition').textContent = rankInfo.rank;
            document.getElementById('yourScore').textContent = rankInfo.xp.toLocaleString();
        });

    } else {
        // Fallback to localStorage
        const leaderboard = JSON.parse(localStorage.getItem('supersite-leaderboard-gk') || '[]');
        leaderboard.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        if (leaderboard.length === 0) {
            list.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No players yet. Start playing to be #1!</p>';
        } else {
            list.innerHTML = leaderboard.slice(0, 10).map((player, i) => `
                <div class="leaderboard-item ${i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : ''} ${player.name === currentPlayer ? 'is-player' : ''}">
                    <span class="rank-number">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</span>
                    <span class="player-avatar">${player.avatar || '🐼'}</span>
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

