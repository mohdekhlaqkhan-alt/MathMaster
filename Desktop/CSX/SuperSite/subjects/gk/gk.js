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
});

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
const gkActivityOrder = ['personalities', 'inventions', 'sports', 'national', 'days', 'books', 'awards', 'firsts'];

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
    document.getElementById('questionText').textContent = q.q;

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

    setTimeout(() => {
        quizState.currentIndex++;
        if (quizState.currentIndex >= quizState.questions.length) {
            endQuiz();
        } else {
            loadQuestion();
        }
    }, 1500);
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

