/* ============================================
   ENGLISH - GAME ENGINE
   Grammar, Vocabulary, Spelling & More!
   ============================================ */

// ============================================
// LANGUAGE DATA
// ============================================
const languageData = {
    grammar: {
        title: 'Grammar Master',
        category: 'Grammar',
        emoji: '📝',
        xpPerQuestion: 15,
        levels: {
            1: {
                name: 'Foundation',
                icon: '🌱',
                questions: [
                    { q: 'Which is a noun?', options: ['Run (दौड़ना)', 'Dog (कुत्ता)', 'Quickly (जल्दी से)', 'Beautiful (सुंदर)'], answer: 'Dog (कुत्ता)' },
                    { q: 'Which is a verb?', options: ['Table (मेज़)', 'Run (दौड़ना)', 'Happy (खुश)', 'Slowly (धीरे से)'], answer: 'Run (दौड़ना)' },
                    { q: 'Plural of "cat"?', options: ['Cats (बिल्लियाँ)', 'Cates', 'Catties', 'Catos'], answer: 'Cats (बिल्लियाँ)' },
                    { q: 'Past tense of "play"?', options: ['Played (खेला)', 'Playing', 'Plays', 'Player'], answer: 'Played (खेला)' },
                    { q: 'Which sentence is correct?', options: ['He go school.', 'He goes to school.', 'He going school.', 'He go to school.'], answer: 'He goes to school.' },
                    { q: '"She" is a?', options: ['Noun (संज्ञा)', 'Pronoun (सर्वनाम)', 'Verb (क्रिया)', 'Adjective (विशेषण)'], answer: 'Pronoun (सर्वनाम)' },
                    { q: 'Plural of "book"?', options: ['Bookes', 'Books (किताबें)', 'Bookies', 'Bookses'], answer: 'Books (किताबें)' },
                    { q: 'Which ends a sentence?', options: [', (अल्पविराम)', '. (पूर्णविराम)', ': (कोलन)', '; (अर्धविराम)'], answer: '. (पूर्णविराम)' },
                    { q: '"Red" is what type of word?', options: ['Noun (संज्ञा)', 'Verb (क्रिया)', 'Adjective (विशेषण)', 'Adverb (क्रियाविशेषण)'], answer: 'Adjective (विशेषण)' },
                    { q: 'Past tense of "eat"?', options: ['Eated', 'Ate (खाया)', 'Eating', 'Eats'], answer: 'Ate (खाया)' }
                ]
            },
            2: {
                name: 'Growing',
                icon: '🌿',
                questions: [
                    { q: 'Which sentence is correct?', options: ['She don\'t know', 'She doesn\'t know', 'She doesn\'t knows', 'She don\'t knows'], answer: 'She doesn\'t know' },
                    { q: '"Run" is what part of speech?', options: ['Noun (संज्ञा)', 'Verb (क्रिया)', 'Adjective (विशेषण)', 'Adverb (क्रियाविशेषण)'], answer: 'Verb (क्रिया)' },
                    { q: 'Past tense of "go"?', options: ['Goed', 'Gone', 'Went (गया)', 'Going'], answer: 'Went (गया)' },
                    { q: 'Which is a proper noun?', options: ['city (शहर)', 'dog (कुत्ता)', 'London (लंदन)', 'happiness (खुशी)'], answer: 'London (लंदन)' },
                    { q: '"Quickly" is an example of?', options: ['Noun (संज्ञा)', 'Verb (क्रिया)', 'Adjective (विशेषण)', 'Adverb (क्रियाविशेषण)'], answer: 'Adverb (क्रियाविशेषण)' },
                    { q: 'Plural of "child"?', options: ['Childs', 'Childrens', 'Children (बच्चे)', 'Childes'], answer: 'Children (बच्चे)' },
                    { q: 'Which punctuation ends a question?', options: ['. (पूर्णविराम)', '! (विस्मयादिबोधक)', '? (प्रश्नवाचक)', ', (अल्पविराम)'], answer: '? (प्रश्नवाचक)' },
                    { q: '"The cat sat on the mat." The subject is?', options: ['cat (बिल्ली)', 'sat (बैठी)', 'mat (चटाई)', 'the'], answer: 'cat (बिल्ली)' },
                    { q: 'Which is an adjective?', options: ['happy (खुश)', 'run (दौड़ना)', 'quickly (जल्दी से)', 'the'], answer: 'happy (खुश)' },
                    { q: 'Past tense of "write"?', options: ['Writed', 'Wrote (लिखा)', 'Written', 'Writing'], answer: 'Wrote (लिखा)' }
                ]
            }
        },
        questions: [
            { q: 'Which sentence is correct?', options: ['She don\'t know', 'She doesn\'t know', 'She doesn\'t knows', 'She don\'t knows'], answer: 'She doesn\'t know' },
            { q: '"Run" is what part of speech?', options: ['Noun', 'Verb', 'Adjective', 'Adverb'], answer: 'Verb' },
            { q: 'Past tense of "go"?', options: ['Goed', 'Gone', 'Went', 'Going'], answer: 'Went' },
            { q: 'Which is a proper noun?', options: ['city', 'dog', 'London', 'happiness'], answer: 'London' },
            { q: '"Quickly" is an example of?', options: ['Noun', 'Verb', 'Adjective', 'Adverb'], answer: 'Adverb' },
            { q: 'Plural of "child"?', options: ['Childs', 'Childrens', 'Children', 'Childes'], answer: 'Children' },
            { q: 'Which punctuation ends a question?', options: ['.', '!', '?', ','], answer: '?' },
            { q: '"The cat sat on the mat." The subject is?', options: ['cat', 'sat', 'mat', 'the'], answer: 'cat' },
            { q: 'Past tense of "eat"?', options: ['Eated', 'Ate', 'Eaten', 'Eating'], answer: 'Ate' },
            { q: 'Which is an adjective?', options: ['happy', 'run', 'quickly', 'the'], answer: 'happy' }
        ]
    },
    vocabulary: {
        title: 'Master Vocabulary',
        category: 'Vocabulary',
        emoji: '📚',
        xpPerQuestion: 20,
        // All vocabulary organized into levels
        levels: {
            1: {
                name: 'Foundation',
                icon: '🌱',
                questions: [
                    { q: 'What does "happy" mean?', options: ['Sad (दुखी)', 'Joyful (खुश)', 'Angry (गुस्सा)', 'Tired (थका)'], answer: 'Joyful (खुश)' },
                    { q: 'What does "big" mean?', options: ['Small (छोटा)', 'Large (बड़ा)', 'Thin (पतला)', 'Short (नाटा)'], answer: 'Large (बड़ा)' },
                    { q: 'What does "fast" mean?', options: ['Slow (धीमा)', 'Quick (तेज़)', 'Heavy (भारी)', 'Light (हल्का)'], answer: 'Quick (तेज़)' },
                    { q: 'What does "beautiful" mean?', options: ['Ugly (बदसूरत)', 'Pretty (सुंदर)', 'Old (पुराना)', 'Dirty (गंदा)'], answer: 'Pretty (सुंदर)' },
                    { q: 'What does "rich" mean?', options: ['Poor (गरीब)', 'Wealthy (धनवान)', 'Hungry (भूखा)', 'Sick (बीमार)'], answer: 'Wealthy (धनवान)' },
                    { q: 'What does "afraid" mean?', options: ['Happy (खुश)', 'Scared (डरा हुआ)', 'Angry (गुस्सा)', 'Tired (थका)'], answer: 'Scared (डरा हुआ)' },
                    { q: 'What does "clean" mean?', options: ['Dirty (गंदा)', 'Neat (साफ़)', 'Messy (अस्त-व्यस्त)', 'Old (पुराना)'], answer: 'Neat (साफ़)' },
                    { q: 'What does "hot" mean?', options: ['Cold (ठंडा)', 'Warm (गर्म)', 'Cool (शीतल)', 'Wet (गीला)'], answer: 'Warm (गर्म)' },
                    { q: 'What does "strong" mean?', options: ['Weak (कमज़ोर)', 'Powerful (ताक़तवर)', 'Soft (नरम)', 'Small (छोटा)'], answer: 'Powerful (ताक़तवर)' },
                    { q: 'What does "smart" mean?', options: ['Dull (मंद)', 'Clever (चतुर)', 'Slow (धीमा)', 'Quiet (शांत)'], answer: 'Clever (चतुर)' }
                ]
            },
            2: {
                name: 'Growing',
                icon: '🌿',
                questions: [
                    { q: 'What does "dangerous" mean?', options: ['Safe (सुरक्षित)', 'Risky (खतरनाक)', 'Calm (शांत)', 'Slow (धीमा)'], answer: 'Risky (खतरनाक)' },
                    { q: 'What does "ancient" mean?', options: ['New (नया)', 'Very old (प्राचीन)', 'Shiny (चमकदार)', 'Fast (तेज़)'], answer: 'Very old (प्राचीन)' },
                    { q: 'What does "patient" mean?', options: ['Rushing (जल्दी करते)', 'Calm and waiting (धैर्यवान)', 'Angry (गुस्सा)', 'Loud (शोर करते)'], answer: 'Calm and waiting (धैर्यवान)' },
                    { q: 'What does "silly" mean?', options: ['Serious (गंभीर)', 'Foolish (मूर्खतापूर्ण)', 'Angry (गुस्सा)', 'Brave (बहादुर)'], answer: 'Foolish (मूर्खतापूर्ण)' },
                    { q: 'What does "calm" mean?', options: ['Excited (उत्साहित)', 'Peaceful (शांत)', 'Noisy (शोरगुल)', 'Running (दौड़ता)'], answer: 'Peaceful (शांत)' },
                    { q: 'What does "generous" mean?', options: ['Greedy (लालची)', 'Giving freely (उदार)', 'Selfish (स्वार्थी)', 'Mean (कंजूस)'], answer: 'Giving freely (उदार)' },
                    { q: 'What does "famous" mean?', options: ['Unknown (अज्ञात)', 'Well-known (प्रसिद्ध)', 'Hidden (छुपा हुआ)', 'Quiet (शांत)'], answer: 'Well-known (प्रसिद्ध)' },
                    { q: 'What does "difficult" mean?', options: ['Easy (आसान)', 'Hard (कठिन)', 'Simple (सरल)', 'Quick (जल्दी)'], answer: 'Hard (कठिन)' },
                    { q: "What does \"enormous\" mean?", options: ['Tiny (छोटा)', 'Very big (बहुत बड़ा)', 'Medium (मध्यम)', 'Normal (सामान्य)'], answer: 'Very big (बहुत बड़ा)' },
                    { q: 'What does "worried" mean?', options: ['Happy (खुश)', 'Anxious (चिंतित)', 'Relaxed (आराम से)', 'Bored (ऊबा)'], answer: 'Anxious (चिंतित)' }
                ]
            },
            3: {
                name: 'Intermediate',
                icon: '🌳',
                questions: [
                    { q: 'What does "brave" mean?', options: ['Scared (डरा हुआ)', 'Courageous (साहसी)', 'Weak (कमज़ोर)', 'Lazy (आलसी)'], answer: 'Courageous (साहसी)' },
                    { q: 'What does "honest" mean?', options: ['Lying (झूठा)', 'Truthful (ईमानदार)', 'Cheating (धोखेबाज़)', 'Hiding (छुपाने वाला)'], answer: 'Truthful (ईमानदार)' },
                    { q: 'What does "lazy" mean?', options: ['Active (सक्रिय)', 'Idle (आलसी)', 'Fast (तेज़)', 'Busy (व्यस्त)'], answer: 'Idle (आलसी)' },
                    { q: 'What does "polite" mean?', options: ['Rude (बदतमीज़)', 'Courteous (विनम्र)', 'Loud (ज़ोर से)', 'Mean (कठोर)'], answer: 'Courteous (विनम्र)' },
                    { q: 'What does "angry" mean?', options: ['Calm (शांत)', 'Furious (गुस्से में)', 'Happy (खुश)', 'Sleepy (नींद में)'], answer: 'Furious (गुस्से में)' },
                    { q: 'What does "confident" mean?', options: ['Doubtful (संदेहशील)', 'Self-assured (आत्मविश्वासी)', 'Scared (डरा हुआ)', 'Shy (शर्मीला)'], answer: 'Self-assured (आत्मविश्वासी)' },
                    { q: 'What does "curious" mean?', options: ['Bored (ऊबा हुआ)', 'Inquisitive (जिज्ञासु)', 'Sleepy (नींद में)', 'Angry (गुस्सा)'], answer: 'Inquisitive (जिज्ञासु)' },
                    { q: 'What does "silent" mean?', options: ['Noisy (शोरगुल)', 'Quiet (मौन)', 'Loud (ज़ोर से)', 'Active (सक्रिय)'], answer: 'Quiet (मौन)' },
                    { q: 'What does "kind" mean?', options: ['Cruel (क्रूर)', 'Caring (दयालु)', 'Rude (बदतमीज़)', 'Selfish (स्वार्थी)'], answer: 'Caring (दयालु)' },
                    { q: 'What does "tired" mean?', options: ['Energetic (ऊर्जावान)', 'Exhausted (थका हुआ)', 'Happy (खुश)', 'Fresh (ताज़ा)'], answer: 'Exhausted (थका हुआ)' }
                ]
            },
            4: {
                name: 'Advanced',
                icon: '🌴',
                questions: [
                    { q: 'What is the meaning of Assault?', options: ['Praise (तारीफ करना)', 'Attack (हमला करना)', 'Ignore (अनदेखा करना)', 'Welcome (स्वागत करना)'], answer: 'Attack (हमला करना)' },
                    { q: 'What is the meaning of Collision?', options: ['Separation (अलगाव)', 'Crash (टक्कर)', 'Agreement (सहमति)', 'Silence (शांति)'], answer: 'Crash (टक्कर)' },
                    { q: 'What is the meaning of Cattle?', options: ['Birds (पक्षी)', 'Livestock/Cows (मवेशी)', 'Insects (कीड़े)', 'Fish (मछली)'], answer: 'Livestock/Cows (मवेशी)' },
                    { q: 'What is the meaning of Extinct?', options: ['Alive (जीवित)', 'No longer existing (विलुप्त)', 'Popular (लोकप्रिय)', 'Sleeping (सो रहा)'], answer: 'No longer existing (विलुप्त)' },
                    { q: 'What is the meaning of Victim?', options: ['Winner (विजेता)', 'Sufferer (पीड़ित)', 'Leader (नेता)', 'Builder (निर्माता)'], answer: 'Sufferer (पीड़ित)' },
                    { q: 'What is the meaning of Lure?', options: ['Push away (धकेलना)', 'Tempt (ललचाना)', 'Warn (चेतावनी देना)', 'Punish (सजा देना)'], answer: 'Tempt (ललचाना)' },
                    { q: 'What is the meaning of Fog?', options: ['Sunshine (धूप)', 'Thick Mist (कोहरा)', 'Rain (बारिश)', 'Clear sky (साफ आसमान)'], answer: 'Thick Mist (कोहरा)' },
                    { q: 'What is the meaning of Hell?', options: ['Paradise (स्वर्ग)', 'Place of suffering (नरक)', 'School (विद्यालय)', 'Garden (बगीचा)'], answer: 'Place of suffering (नरक)' },
                    { q: 'What is the meaning of Hollow?', options: ['Heavy (भारी)', 'Empty inside (खोखला)', 'Solid (ठोस)', 'Full (भरा हुआ)'], answer: 'Empty inside (खोखला)' },
                    { q: 'What is the meaning of Compensation?', options: ['Punishment (सजा)', 'Payment for loss (मुआवजा)', 'Tax (कर)', 'Theft (चोरी)'], answer: 'Payment for loss (मुआवजा)' }
                ]
            }
        },
        // Keep backward compatibility - default questions from Level 1
        questions: [
            { q: 'What does "happy" mean?', options: ['Sad (दुखी)', 'Joyful (खुश)', 'Angry (गुस्सा)', 'Tired (थका)'], answer: 'Joyful (खुश)' },
            { q: 'What does "big" mean?', options: ['Small (छोटा)', 'Large (बड़ा)', 'Thin (पतला)', 'Short (नाटा)'], answer: 'Large (बड़ा)' },
            { q: 'What does "fast" mean?', options: ['Slow (धीमा)', 'Quick (तेज़)', 'Heavy (भारी)', 'Light (हल्का)'], answer: 'Quick (तेज़)' },
            { q: 'What does "beautiful" mean?', options: ['Ugly (बदसूरत)', 'Pretty (सुंदर)', 'Old (पुराना)', 'Dirty (गंदा)'], answer: 'Pretty (सुंदर)' },
            { q: 'What does "brave" mean?', options: ['Scared (डरा हुआ)', 'Courageous (बहादुर)', 'Weak (कमज़ोर)', 'Lazy (आलसी)'], answer: 'Courageous (बहादुर)' },
            { q: 'What does "kind" mean?', options: ['Mean (कठोर)', 'Helpful (मददगार)', 'Rude (बदतमीज़)', 'Selfish (स्वार्थी)'], answer: 'Helpful (मददगार)' },
            { q: 'What does "clean" mean?', options: ['Dirty (गंदा)', 'Neat (साफ़)', 'Messy (अस्त-व्यस्त)', 'Old (पुराना)'], answer: 'Neat (साफ़)' },
            { q: 'What does "hot" mean?', options: ['Cold (ठंडा)', 'Warm (गर्म)', 'Cool (शीतल)', 'Wet (गीला)'], answer: 'Warm (गर्म)' },
            { q: 'What does "strong" mean?', options: ['Weak (कमज़ोर)', 'Powerful (ताक़तवर)', 'Soft (नरम)', 'Small (छोटा)'], answer: 'Powerful (ताक़तवर)' },
            { q: 'What does "smart" mean?', options: ['Dull (मंद)', 'Clever (चतुर)', 'Slow (धीमा)', 'Quiet (शांत)'], answer: 'Clever (चतुर)' }
        ]
    },
    synonyms: {
        title: 'Master Synonyms',
        category: 'Synonyms',
        emoji: '🔗',
        xpPerQuestion: 15,
        levels: {
            1: {
                name: 'Foundation',
                icon: '🌱',
                questions: [
                    { q: 'Synonym of "happy"?', options: ['Sad', 'Joyful', 'Angry', 'Tired'], answer: 'Joyful' },
                    { q: 'Synonym of "big"?', options: ['Tiny', 'Small', 'Large', 'Short'], answer: 'Large' },
                    { q: 'Synonym of "beautiful"?', options: ['Ugly', 'Pretty', 'Plain', 'Dull'], answer: 'Pretty' },
                    { q: 'Synonym of "good"?', options: ['Bad', 'Nice', 'Awful', 'Poor'], answer: 'Nice' },
                    { q: 'Synonym of "small"?', options: ['Big', 'Huge', 'Little', 'Tall'], answer: 'Little' },
                    { q: 'Synonym of "fast"?', options: ['Slow', 'Quick', 'Heavy', 'Light'], answer: 'Quick' },
                    { q: 'Synonym of "strong"?', options: ['Weak', 'Powerful', 'Soft', 'Gentle'], answer: 'Powerful' },
                    { q: 'Synonym of "sad"?', options: ['Happy', 'Unhappy', 'Joyful', 'Excited'], answer: 'Unhappy' },
                    { q: 'Synonym of "cold"?', options: ['Hot', 'Chilly', 'Warm', 'Burning'], answer: 'Chilly' },
                    { q: 'Synonym of "old"?', options: ['New', 'Ancient', 'Young', 'Fresh'], answer: 'Ancient' }
                ]
            },
            2: {
                name: 'Growing',
                icon: '🌿',
                questions: [
                    { q: 'Synonym of "smart"?', options: ['Dumb', 'Intelligent', 'Slow', 'Foolish'], answer: 'Intelligent' },
                    { q: 'Synonym of "difficult"?', options: ['Easy', 'Simple', 'Hard', 'Clear'], answer: 'Hard' },
                    { q: 'Synonym of "start"?', options: ['End', 'Begin', 'Stop', 'Finish'], answer: 'Begin' },
                    { q: 'Synonym of "angry"?', options: ['Calm', 'Furious', 'Happy', 'Peaceful'], answer: 'Furious' },
                    { q: 'Synonym of "silent"?', options: ['Loud', 'Quiet', 'Noisy', 'Screaming'], answer: 'Quiet' },
                    { q: 'Synonym of "brave"?', options: ['Scared', 'Courageous', 'Weak', 'Timid'], answer: 'Courageous' },
                    { q: 'Synonym of "wealthy"?', options: ['Poor', 'Rich', 'Broke', 'Needy'], answer: 'Rich' },
                    { q: 'Synonym of "huge"?', options: ['Tiny', 'Enormous', 'Small', 'Little'], answer: 'Enormous' },
                    { q: 'Synonym of "tired"?', options: ['Energetic', 'Exhausted', 'Active', 'Fresh'], answer: 'Exhausted' },
                    { q: 'Synonym of "scared"?', options: ['Brave', 'Afraid', 'Bold', 'Fearless'], answer: 'Afraid' }
                ]
            }
        },
        questions: [
            { q: 'Synonym of "happy"?', options: ['Sad', 'Joyful', 'Angry', 'Tired'], answer: 'Joyful' },
            { q: 'Synonym of "big"?', options: ['Tiny', 'Small', 'Large', 'Short'], answer: 'Large' },
            { q: 'Synonym of "beautiful"?', options: ['Ugly', 'Pretty', 'Plain', 'Dull'], answer: 'Pretty' },
            { q: 'Synonym of "smart"?', options: ['Dumb', 'Intelligent', 'Slow', 'Foolish'], answer: 'Intelligent' },
            { q: 'Synonym of "difficult"?', options: ['Easy', 'Simple', 'Hard', 'Clear'], answer: 'Hard' }
        ]
    },
    antonyms: {
        title: 'Master Antonyms',
        category: 'Antonyms',
        emoji: '↔️',
        xpPerQuestion: 15,
        levels: {
            1: {
                name: 'Foundation',
                icon: '🌱',
                questions: [
                    { q: 'Antonym of "hot"?', options: ['Warm', 'Cold', 'Boiling', 'Humid'], answer: 'Cold' },
                    { q: 'Antonym of "fast"?', options: ['Quick', 'Rapid', 'Slow', 'Swift'], answer: 'Slow' },
                    { q: 'Antonym of "old"?', options: ['Ancient', 'Young', 'Aged', 'Elderly'], answer: 'Young' },
                    { q: 'Antonym of "day"?', options: ['Morning', 'Night', 'Evening', 'Noon'], answer: 'Night' },
                    { q: 'Antonym of "up"?', options: ['High', 'Down', 'Top', 'Above'], answer: 'Down' },
                    { q: 'Antonym of "happy"?', options: ['Joyful', 'Sad', 'Glad', 'Cheerful'], answer: 'Sad' },
                    { q: 'Antonym of "big"?', options: ['Large', 'Small', 'Huge', 'Massive'], answer: 'Small' },
                    { q: 'Antonym of "good"?', options: ['Nice', 'Bad', 'Great', 'Fine'], answer: 'Bad' },
                    { q: 'Antonym of "new"?', options: ['Fresh', 'Old', 'Modern', 'Recent'], answer: 'Old' },
                    { q: 'Antonym of "long"?', options: ['Tall', 'Short', 'Extended', 'Lengthy'], answer: 'Short' }
                ]
            },
            2: {
                name: 'Growing',
                icon: '🌿',
                questions: [
                    { q: 'Antonym of "light"?', options: ['Bright', 'Dark', 'Sunny', 'Clear'], answer: 'Dark' },
                    { q: 'Antonym of "brave"?', options: ['Courageous', 'Bold', 'Cowardly', 'Fearless'], answer: 'Cowardly' },
                    { q: 'Antonym of "rich"?', options: ['Wealthy', 'Poor', 'Luxurious', 'Affluent'], answer: 'Poor' },
                    { q: 'Antonym of "clean"?', options: ['Neat', 'Dirty', 'Tidy', 'Pure'], answer: 'Dirty' },
                    { q: 'Antonym of "empty"?', options: ['Hollow', 'Full', 'Vacant', 'Bare'], answer: 'Full' },
                    { q: 'Antonym of "smart"?', options: ['Intelligent', 'Foolish', 'Clever', 'Wise'], answer: 'Foolish' },
                    { q: 'Antonym of "start"?', options: ['Begin', 'End', 'Commence', 'Launch'], answer: 'End' },
                    { q: 'Antonym of "love"?', options: ['Like', 'Hate', 'Adore', 'Care'], answer: 'Hate' },
                    { q: 'Antonym of "easy"?', options: ['Simple', 'Difficult', 'Plain', 'Quick'], answer: 'Difficult' },
                    { q: 'Antonym of "beautiful"?', options: ['Pretty', 'Ugly', 'Lovely', 'Gorgeous'], answer: 'Ugly' }
                ]
            }
        },
        questions: [
            { q: 'Antonym of "hot"?', options: ['Warm', 'Cold', 'Boiling', 'Humid'], answer: 'Cold' },
            { q: 'Antonym of "fast"?', options: ['Quick', 'Rapid', 'Slow', 'Swift'], answer: 'Slow' },
            { q: 'Antonym of "old"?', options: ['Ancient', 'Young', 'Aged', 'Elderly'], answer: 'Young' },
            { q: 'Antonym of "light"?', options: ['Bright', 'Dark', 'Sunny', 'Clear'], answer: 'Dark' },
            { q: 'Antonym of "brave"?', options: ['Courageous', 'Bold', 'Cowardly', 'Fearless'], answer: 'Cowardly' }
        ]
    },
    idioms: {
        title: 'Idioms & Phrases',
        category: 'Idioms',
        emoji: '💬',
        xpPerQuestion: 20,
        levels: {
            1: {
                name: 'Foundation',
                icon: '🌱',
                questions: [
                    { q: '"Break a leg" means?', options: ['Get injured (चोट लगना)', 'Good luck (शुभकामनाएं)', 'Run away (भाग जाना)', 'Dance (नाचना)'], answer: 'Good luck (शुभकामनाएं)' },
                    { q: '"Piece of cake" means?', options: ['Delicious (स्वादिष्ट)', 'Very easy (बहुत आसान)', 'Expensive (महंगा)', 'Sweet (मीठा)'], answer: 'Very easy (बहुत आसान)' },
                    { q: '"Under the weather" means?', options: ['Outside (बाहर)', 'Feeling sick (बीमार महसूस)', 'Cold (ठंडा)', 'Rainy (बारिश)'], answer: 'Feeling sick (बीमार महसूस)' },
                    { q: '"Hit the books" means?', options: ['Punch books (किताबें मारना)', 'Study hard (कड़ी पढ़ाई)', 'Buy books (किताबें खरीदना)', 'Throw books (किताबें फेंकना)'], answer: 'Study hard (कड़ी पढ़ाई)' },
                    { q: '"Raining cats and dogs" means?', options: ['Animals falling (जानवर गिरना)', 'Heavy rain (भारी बारिश)', 'Pet shop (पालतू दुकान)', 'Cloudy (बादल)'], answer: 'Heavy rain (भारी बारिश)' },
                    { q: '"A piece of my mind" means?', options: ['Give a gift (उपहार देना)', 'Share thoughts angrily (गुस्से में बोलना)', 'Think deeply (गहरा सोचना)', 'Forget (भूलना)'], answer: 'Share thoughts angrily (गुस्से में बोलना)' },
                    { q: '"Burning the midnight oil" means?', options: ['Starting a fire (आग लगाना)', 'Working late (देर तक काम)', 'Cooking (खाना बनाना)', 'Sleeping (सोना)'], answer: 'Working late (देर तक काम)' },
                    { q: '"Break the ice" means?', options: ['Cold weather (ठंड)', 'Start a conversation (बातचीत शुरू)', 'Freeze water (पानी जमाना)', 'Skiing (स्कीइंग)'], answer: 'Start a conversation (बातचीत शुरू)' },
                    { q: '"Kill two birds with one stone" means?', options: ['Hunting birds (पक्षी शिकार)', 'Two tasks at once (एक साथ दो काम)', 'Throw stones (पत्थर फेंकना)', 'Bird watching (पक्षी देखना)'], answer: 'Two tasks at once (एक साथ दो काम)' },
                    { q: '"The ball is in your court" means?', options: ['Playing tennis (टेनिस खेलना)', 'Your decision now (अब तुम्हारा फैसला)', 'Court case (अदालत)', 'Sports (खेल)'], answer: 'Your decision now (अब तुम्हारा फैसला)' }
                ]
            },
            2: {
                name: 'Growing',
                icon: '🌿',
                questions: [
                    { q: '"Bite the bullet" means?', options: ['Eat metal (धातु खाना)', 'Face difficulty (कठिनाई का सामना)', 'Shoot (गोली मारना)', 'Run away (भाग जाना)'], answer: 'Face difficulty (कठिनाई का सामना)' },
                    { q: '"Cost an arm and a leg" means?', options: ['Cheap (सस्ता)', 'Free (मुफ्त)', 'Very expensive (बहुत महंगा)', 'Injury (चोट)'], answer: 'Very expensive (बहुत महंगा)' },
                    { q: '"Let the cat out of the bag" means?', options: ['Free a cat (बिल्ली छोड़ना)', 'Reveal a secret (राज़ खोलना)', 'Buy a cat (बिल्ली खरीदना)', 'Lose something (कुछ खोना)'], answer: 'Reveal a secret (राज़ खोलना)' },
                    { q: '"Once in a blue moon" means?', options: ['Every night (हर रात)', 'Very rarely (बहुत कभी कभी)', 'Every month (हर महीने)', 'Often (अक्सर)'], answer: 'Very rarely (बहुत कभी कभी)' },
                    { q: '"Spill the beans" means?', options: ['Make a mess (गंदगी करना)', 'Cook beans (बीन्स पकाना)', 'Tell a secret (राज़ बताना)', 'Waste food (खाना बर्बाद)'], answer: 'Tell a secret (राज़ बताना)' },
                    { q: '"Blessing in disguise" means?', options: ['Bad costume (बुरी पोशाक)', 'Good from bad (बुरे से अच्छा)', 'Magic (जादू)', 'Curse (श्राप)'], answer: 'Good from bad (बुरे से अच्छा)' },
                    { q: '"A penny for your thoughts" means?', options: ['Give money (पैसे देना)', 'What are you thinking? (क्या सोच रहे हो?)', 'Saving coins (सिक्के बचाना)', 'Shopping (खरीदारी)'], answer: 'What are you thinking? (क्या सोच रहे हो?)' },
                    { q: '"Back to the drawing board" means?', options: ['Art class (कला कक्षा)', 'Start again (फिर से शुरू)', 'Draw pictures (चित्र बनाना)', 'Finish work (काम खत्म)'], answer: 'Start again (फिर से शुरू)' },
                    { q: '"Better late than never" means?', options: ['Always be late (हमेशा देर)', 'Doing late is better (देर से भी करो)', 'Never do it (कभी मत करो)', 'Hurry up (जल्दी करो)'], answer: 'Doing late is better (देर से भी करो)' },
                    { q: '"Actions speak louder than words" means?', options: ['Talk loudly (ज़ोर से बोलो)', 'Doing is better than saying (करना बोलने से बेहतर)', 'Silent (चुप रहो)', 'Argue (बहस करो)'], answer: 'Doing is better than saying (करना बोलने से बेहतर)' }
                ]
            }
        },
        questions: [
            { q: '"Break a leg" means?', options: ['Get injured', 'Good luck', 'Run away', 'Dance'], answer: 'Good luck' },
            { q: '"Piece of cake" means?', options: ['Delicious', 'Very easy', 'Expensive', 'Sweet'], answer: 'Very easy' },
            { q: '"Under the weather" means?', options: ['Outside', 'Feeling sick', 'Cold', 'Rainy'], answer: 'Feeling sick' },
            { q: '"Hit the books" means?', options: ['Punch books', 'Study hard', 'Buy books', 'Throw books'], answer: 'Study hard' },
            { q: '"Bite the bullet" means?', options: ['Eat metal', 'Face something difficult', 'Shoot', 'Run away'], answer: 'Face something difficult' },
            { q: '"Cost an arm and a leg" means?', options: ['Cheap', 'Free', 'Very expensive', 'Injury'], answer: 'Very expensive' },
            { q: '"Let the cat out of the bag" means?', options: ['Free a cat', 'Reveal a secret', 'Buy a cat', 'Lose something'], answer: 'Reveal a secret' },
            { q: '"Once in a blue moon" means?', options: ['Every night', 'Very rarely', 'Every month', 'Often'], answer: 'Very rarely' },
            { q: '"Spill the beans" means?', options: ['Make a mess', 'Cook beans', 'Tell a secret', 'Waste food'], answer: 'Tell a secret' },
            { q: '"Break the ice" means?', options: ['Cold weather', 'Start a conversation', 'Freeze water', 'Skiing'], answer: 'Start a conversation' }
        ]
    },
    spelling: {
        title: 'Spelling Bee',
        category: 'Spelling',
        emoji: '🐝',
        xpPerQuestion: 25,
        words: [
            { word: 'Necessary', hint: 'Required or essential' },
            { word: 'Accommodation', hint: 'A place to stay' },
            { word: 'Definitely', hint: 'Without doubt' },
            { word: 'Separate', hint: 'To divide or keep apart' },
            { word: 'Receive', hint: 'To get or accept' },
            { word: 'Beautiful', hint: 'Pleasing to look at' },
            { word: 'Embarrass', hint: 'To make someone feel awkward' },
            { word: 'Occurrence', hint: 'Something that happens' },
            { word: 'Restaurant', hint: 'A place to eat' },
            { word: 'Wednesday', hint: 'A day of the week' }
        ]
    },
    scramble: {
        title: 'Word Scramble',
        category: 'Scramble',
        emoji: '🔀',
        xpPerQuestion: 30,
        words: [
            { word: 'EDUCATION', scrambled: 'NOITACUDE' },
            { word: 'LEARNING', scrambled: 'GNIRAENL' },
            { word: 'KNOWLEDGE', scrambled: 'EGDEWLONK' },
            { word: 'STUDENT', scrambled: 'TNEDUTS' },
            { word: 'TEACHER', scrambled: 'REHCAET' },
            { word: 'LANGUAGE', scrambled: 'EGAUGNAL' },
            { word: 'VOCABULARY', scrambled: 'YRALUBACOV' },
            { word: 'GRAMMAR', scrambled: 'RAMMARG' },
            { word: 'SPELLING', scrambled: 'GNILLEPS' },
            { word: 'SENTENCE', scrambled: 'ECNETNES' }
        ]
    }
};

// Words of the Day
const wordsOfDay = [
    { word: 'Serendipity', meaning: 'Finding something good without looking for it' },
    { word: 'Ephemeral', meaning: 'Lasting for a very short time' },
    { word: 'Eloquent', meaning: 'Fluent and persuasive in speaking' },
    { word: 'Resilient', meaning: 'Able to recover quickly from difficulties' },
    { word: 'Ubiquitous', meaning: 'Found everywhere' },
    { word: 'Luminous', meaning: 'Full of or giving off light' },
    { word: 'Quintessential', meaning: 'The perfect example of something' }
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
    setWordOfDay();
    updateUI();

    // Spelling input enter key
    document.getElementById('spellingInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkSpelling();
    });
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

function setWordOfDay() {
    const today = new Date().getDay();
    const wod = wordsOfDay[today % wordsOfDay.length];
    document.getElementById('wodWord').textContent = wod.word;
    document.getElementById('wodMeaning').textContent = wod.meaning;
}

// ============================================
// VOCABULARY LEVELS
// ============================================

// Track current vocabulary level being played
let currentVocabLevel = 1;

function openVocabularyLevels() {
    // Check if logged in (vocabulary is second activity, needs login)
    if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
        if (window.BroProAuth) {
            BroProAuth.showLoginRequired('Login to unlock "Master Vocabulary" and all other activities!');
        } else {
            alert('Please login to access this activity!');
        }
        return;
    }

    // Check if premium
    if (window.BroProPremium && !BroProPremium.isPremium()) {
        BroProPremium.showPremiumRequired('Master Vocabulary');
        return;
    }

    // Update progress indicators
    updateVocabLevelProgress();

    // Show modal
    document.getElementById('vocabLevelsModal').classList.add('active');
}

function closeVocabularyLevels() {
    document.getElementById('vocabLevelsModal').classList.remove('active');
}

function updateVocabLevelProgress() {
    // Get saved progress from localStorage
    const progress = JSON.parse(localStorage.getItem('supersite-vocab-progress') || '{}');

    // Update Level 1 progress
    const level1Data = progress['level1'] || { completed: 0, total: 10, bestScore: 0 };
    const level1Percent = Math.round((level1Data.completed / level1Data.total) * 100);

    const level1ProgressEl = document.getElementById('level1Progress');
    const level1ProgressTextEl = document.getElementById('level1ProgressText');

    if (level1ProgressEl) {
        level1ProgressEl.style.width = level1Percent + '%';
    }

    if (level1ProgressTextEl) {
        if (level1Data.completed === 0) {
            level1ProgressTextEl.textContent = 'Not Started';
        } else if (level1Percent >= 100) {
            level1ProgressTextEl.textContent = '✅ Completed! Best: ' + level1Data.bestScore + '/' + level1Data.total;
        } else {
            level1ProgressTextEl.textContent = 'Best: ' + level1Data.bestScore + '/' + level1Data.total;
        }
    }

    // Update Level 2 progress
    const level2Data = progress['level2'] || { completed: 0, total: 10, bestScore: 0 };
    const level2Percent = Math.round((level2Data.completed / level2Data.total) * 100);

    const level2ProgressEl = document.getElementById('level2Progress');
    const level2ProgressTextEl = document.getElementById('level2ProgressText');

    if (level2ProgressEl) {
        level2ProgressEl.style.width = level2Percent + '%';
    }

    if (level2ProgressTextEl) {
        if (level2Data.completed === 0) {
            level2ProgressTextEl.textContent = 'Not Started';
        } else if (level2Percent >= 100) {
            level2ProgressTextEl.textContent = '✅ Completed! Best: ' + level2Data.bestScore + '/' + level2Data.total;
        } else {
            level2ProgressTextEl.textContent = 'Best: ' + level2Data.bestScore + '/' + level2Data.total;
        }
    }

    // Update Level 3 progress
    const level3Data = progress['level3'] || { completed: 0, total: 10, bestScore: 0 };
    const level3Percent = Math.round((level3Data.completed / level3Data.total) * 100);

    const level3ProgressEl = document.getElementById('level3Progress');
    const level3ProgressTextEl = document.getElementById('level3ProgressText');

    if (level3ProgressEl) {
        level3ProgressEl.style.width = level3Percent + '%';
    }

    if (level3ProgressTextEl) {
        if (level3Data.completed === 0) {
            level3ProgressTextEl.textContent = 'Not Started';
        } else if (level3Percent >= 100) {
            level3ProgressTextEl.textContent = '✅ Completed! Best: ' + level3Data.bestScore + '/' + level3Data.total;
        } else {
            level3ProgressTextEl.textContent = 'Best: ' + level3Data.bestScore + '/' + level3Data.total;
        }
    }

    // Update Level 4 progress
    const level4Data = progress['level4'] || { completed: 0, total: 10, bestScore: 0 };
    const level4Percent = Math.round((level4Data.completed / level4Data.total) * 100);

    const level4ProgressEl = document.getElementById('level4Progress');
    const level4ProgressTextEl = document.getElementById('level4ProgressText');

    if (level4ProgressEl) {
        level4ProgressEl.style.width = level4Percent + '%';
    }

    if (level4ProgressTextEl) {
        if (level4Data.completed === 0) {
            level4ProgressTextEl.textContent = 'Not Started';
        } else if (level4Percent >= 100) {
            level4ProgressTextEl.textContent = '✅ Completed! Best: ' + level4Data.bestScore + '/' + level4Data.total;
        } else {
            level4ProgressTextEl.textContent = 'Best: ' + level4Data.bestScore + '/' + level4Data.total;
        }
    }
}

function startVocabularyLevel(level) {
    const vocabData = languageData.vocabulary;
    const levelData = vocabData.levels[level];

    if (!levelData) {
        console.error('Level not found:', level);
        return;
    }

    // Close levels modal
    closeVocabularyLevels();

    // Set current level
    currentVocabLevel = level;

    // Initialize quiz state
    quizState.mode = 'vocabulary';
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = []; // Reset user answers
    quizState.questions = shuffleArray([...levelData.questions]);
    quizState.vocabLevel = level; // Track which level we're playing

    // Update header with level info
    document.getElementById('quizCategory').textContent = 'Level ' + level + ' • ' + levelData.name;
    document.getElementById('quizTitle').textContent = vocabData.title;
    document.getElementById('totalQ').textContent = quizState.questions.length;

    // Reset stats
    document.getElementById('correctCount').textContent = '0';
    document.getElementById('wrongCount').textContent = '0';
    document.getElementById('xpCount2').textContent = '0';

    // Open quiz modal
    document.getElementById('quizModal').classList.add('active');
    loadQuestion();
}

function saveVocabLevelProgress(level, correct, total) {
    const progress = JSON.parse(localStorage.getItem('supersite-vocab-progress') || '{}');
    const key = 'level' + level;

    // Only update if this score is better than previous
    const existing = progress[key] || { completed: 0, total: total, bestScore: 0 };

    progress[key] = {
        completed: Math.max(existing.completed, correct),
        total: total,
        bestScore: Math.max(existing.bestScore, correct)
    };

    localStorage.setItem('supersite-vocab-progress', JSON.stringify(progress));
}

// ============================================
// GRAMMAR LEVELS
// ============================================

function openGrammarLevels() {
    // Check if logged in
    if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
        if (window.BroProAuth) {
            BroProAuth.showLoginRequired('Login to unlock "Grammar Master" and all other activities!');
        } else {
            alert('Please login to access this activity!');
        }
        return;
    }

    // Check if premium
    if (window.BroProPremium && !BroProPremium.isPremium()) {
        BroProPremium.showPremiumRequired('Grammar Master');
        return;
    }

    updateGrammarLevelProgress();
    document.getElementById('grammarLevelsModal').classList.add('active');
}

function closeGrammarLevels() {
    document.getElementById('grammarLevelsModal').classList.remove('active');
}

function updateGrammarLevelProgress() {
    const progress = JSON.parse(localStorage.getItem('supersite-grammar-progress') || '{}');

    [1, 2].forEach(level => {
        const data = progress['level' + level] || { completed: 0, total: 10, bestScore: 0 };
        const percent = Math.round((data.completed / data.total) * 100);

        const progressEl = document.getElementById('grammarLevel' + level + 'Progress');
        const textEl = document.getElementById('grammarLevel' + level + 'ProgressText');

        if (progressEl) progressEl.style.width = percent + '%';
        if (textEl) {
            if (data.completed === 0) textEl.textContent = 'Not Started';
            else if (percent >= 100) textEl.textContent = '✅ Completed! Best: ' + data.bestScore + '/' + data.total;
            else textEl.textContent = 'Best: ' + data.bestScore + '/' + data.total;
        }
    });
}

function startGrammarLevel(level) {
    const grammarData = languageData.grammar;
    const levelData = grammarData.levels[level];

    if (!levelData) return;

    closeGrammarLevels();

    quizState.mode = 'grammar';
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = []; // Reset user answers
    quizState.questions = shuffleArray([...levelData.questions]);
    quizState.grammarLevel = level;

    document.getElementById('quizCategory').textContent = 'Level ' + level + ' • ' + levelData.name;
    document.getElementById('quizTitle').textContent = grammarData.title;
    document.getElementById('totalQ').textContent = quizState.questions.length;
    document.getElementById('correctCount').textContent = '0';
    document.getElementById('wrongCount').textContent = '0';
    document.getElementById('xpCount2').textContent = '0';

    document.getElementById('quizModal').classList.add('active');
    loadQuestion();
}

function saveGrammarLevelProgress(level, correct, total) {
    const progress = JSON.parse(localStorage.getItem('supersite-grammar-progress') || '{}');
    const key = 'level' + level;
    const existing = progress[key] || { completed: 0, total: total, bestScore: 0 };

    progress[key] = {
        completed: Math.max(existing.completed, correct),
        total: total,
        bestScore: Math.max(existing.bestScore, correct)
    };

    localStorage.setItem('supersite-grammar-progress', JSON.stringify(progress));
}

// ============================================
// SYNONYMS LEVELS
// ============================================

function openSynonymsLevels() {
    if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
        if (window.BroProAuth) {
            BroProAuth.showLoginRequired('Login to unlock "Synonyms & Antonyms" and all other activities!');
        } else {
            alert('Please login to access this activity!');
        }
        return;
    }

    if (window.BroProPremium && !BroProPremium.isPremium()) {
        BroProPremium.showPremiumRequired('Synonyms & Antonyms');
        return;
    }

    updateSynonymsLevelProgress();
    document.getElementById('synonymsLevelsModal').classList.add('active');
}

function closeSynonymsLevels() {
    document.getElementById('synonymsLevelsModal').classList.remove('active');
}

function updateSynonymsLevelProgress() {
    const progress = JSON.parse(localStorage.getItem('supersite-synonyms-progress') || '{}');

    [1, 2].forEach(level => {
        const data = progress['level' + level] || { completed: 0, total: 10, bestScore: 0 };
        const percent = Math.round((data.completed / data.total) * 100);

        const progressEl = document.getElementById('synonymsLevel' + level + 'Progress');
        const textEl = document.getElementById('synonymsLevel' + level + 'ProgressText');

        if (progressEl) progressEl.style.width = percent + '%';
        if (textEl) {
            if (data.completed === 0) textEl.textContent = 'Not Started';
            else if (percent >= 100) textEl.textContent = '✅ Completed! Best: ' + data.bestScore + '/' + data.total;
            else textEl.textContent = 'Best: ' + data.bestScore + '/' + data.total;
        }
    });
}

function startSynonymsLevel(level) {
    const synonymsData = languageData.synonyms;
    const levelData = synonymsData.levels[level];

    if (!levelData) return;

    closeSynonymsLevels();

    quizState.mode = 'synonyms';
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = []; // Reset user answers
    quizState.questions = shuffleArray([...levelData.questions]);
    quizState.synonymsLevel = level;

    document.getElementById('quizCategory').textContent = 'Level ' + level + ' • ' + levelData.name;
    document.getElementById('quizTitle').textContent = synonymsData.title;
    document.getElementById('totalQ').textContent = quizState.questions.length;
    document.getElementById('correctCount').textContent = '0';
    document.getElementById('wrongCount').textContent = '0';
    document.getElementById('xpCount2').textContent = '0';

    document.getElementById('quizModal').classList.add('active');
    loadQuestion();
}

function saveSynonymsLevelProgress(level, correct, total) {
    const progress = JSON.parse(localStorage.getItem('supersite-synonyms-progress') || '{}');
    const key = 'level' + level;
    const existing = progress[key] || { completed: 0, total: total, bestScore: 0 };

    progress[key] = {
        completed: Math.max(existing.completed, correct),
        total: total,
        bestScore: Math.max(existing.bestScore, correct)
    };

    localStorage.setItem('supersite-synonyms-progress', JSON.stringify(progress));
}

// ============================================
// ANTONYMS LEVELS
// ============================================

function openAntonymsLevels() {
    if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
        if (window.BroProAuth) {
            BroProAuth.showLoginRequired('Login to unlock "Master Antonyms" and all other activities!');
        } else {
            alert('Please login to access this activity!');
        }
        return;
    }

    if (window.BroProPremium && !BroProPremium.isPremium()) {
        BroProPremium.showPremiumRequired('Master Antonyms');
        return;
    }

    updateAntonymsLevelProgress();
    document.getElementById('antonymsLevelsModal').classList.add('active');
}

function closeAntonymsLevels() {
    document.getElementById('antonymsLevelsModal').classList.remove('active');
}

function updateAntonymsLevelProgress() {
    const progress = JSON.parse(localStorage.getItem('supersite-antonyms-progress') || '{}');

    [1, 2].forEach(level => {
        const data = progress['level' + level] || { completed: 0, total: 10, bestScore: 0 };
        const percent = Math.round((data.completed / data.total) * 100);

        const progressEl = document.getElementById('antonymsLevel' + level + 'Progress');
        const textEl = document.getElementById('antonymsLevel' + level + 'ProgressText');

        if (progressEl) progressEl.style.width = percent + '%';
        if (textEl) {
            if (data.completed === 0) textEl.textContent = 'Not Started';
            else if (percent >= 100) textEl.textContent = '✅ Completed! Best: ' + data.bestScore + '/' + data.total;
            else textEl.textContent = 'Best: ' + data.bestScore + '/' + data.total;
        }
    });
}

function startAntonymsLevel(level) {
    const antonymsData = languageData.antonyms;
    const levelData = antonymsData.levels[level];

    if (!levelData) return;

    closeAntonymsLevels();

    quizState.mode = 'antonyms';
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = []; // Reset user answers
    quizState.questions = shuffleArray([...levelData.questions]);
    quizState.antonymsLevel = level;

    document.getElementById('quizCategory').textContent = 'Level ' + level + ' • ' + levelData.name;
    document.getElementById('quizTitle').textContent = antonymsData.title;
    document.getElementById('totalQ').textContent = quizState.questions.length;
    document.getElementById('correctCount').textContent = '0';
    document.getElementById('wrongCount').textContent = '0';
    document.getElementById('xpCount2').textContent = '0';

    document.getElementById('quizModal').classList.add('active');
    loadQuestion();
}

function saveAntonymsLevelProgress(level, correct, total) {
    const progress = JSON.parse(localStorage.getItem('supersite-antonyms-progress') || '{}');
    const key = 'level' + level;
    const existing = progress[key] || { completed: 0, total: total, bestScore: 0 };

    progress[key] = {
        completed: Math.max(existing.completed, correct),
        total: total,
        bestScore: Math.max(existing.bestScore, correct)
    };

    localStorage.setItem('supersite-antonyms-progress', JSON.stringify(progress));
}

// ============================================
// IDIOMS LEVELS
// ============================================

function openIdiomsLevels() {
    if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
        if (window.BroProAuth) {
            BroProAuth.showLoginRequired('Login to unlock "Idioms & Phrases" and all other activities!');
        } else {
            alert('Please login to access this activity!');
        }
        return;
    }

    if (window.BroProPremium && !BroProPremium.isPremium()) {
        BroProPremium.showPremiumRequired('Idioms & Phrases');
        return;
    }

    updateIdiomsLevelProgress();
    document.getElementById('idiomsLevelsModal').classList.add('active');
}

function closeIdiomsLevels() {
    document.getElementById('idiomsLevelsModal').classList.remove('active');
}

function updateIdiomsLevelProgress() {
    const progress = JSON.parse(localStorage.getItem('supersite-idioms-progress') || '{}');

    [1, 2].forEach(level => {
        const data = progress['level' + level] || { completed: 0, total: 10, bestScore: 0 };
        const percent = Math.round((data.completed / data.total) * 100);

        const progressEl = document.getElementById('idiomsLevel' + level + 'Progress');
        const textEl = document.getElementById('idiomsLevel' + level + 'ProgressText');

        if (progressEl) progressEl.style.width = percent + '%';
        if (textEl) {
            if (data.completed === 0) textEl.textContent = 'Not Started';
            else if (percent >= 100) textEl.textContent = '✅ Completed! Best: ' + data.bestScore + '/' + data.total;
            else textEl.textContent = 'Best: ' + data.bestScore + '/' + data.total;
        }
    });
}

function startIdiomsLevel(level) {
    const idiomsData = languageData.idioms;
    const levelData = idiomsData.levels[level];

    if (!levelData) return;

    closeIdiomsLevels();

    quizState.mode = 'idioms';
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = []; // Reset user answers
    quizState.questions = shuffleArray([...levelData.questions]);
    quizState.idiomsLevel = level;

    document.getElementById('quizCategory').textContent = 'Level ' + level + ' • ' + levelData.name;
    document.getElementById('quizTitle').textContent = idiomsData.title;
    document.getElementById('totalQ').textContent = quizState.questions.length;
    document.getElementById('correctCount').textContent = '0';
    document.getElementById('wrongCount').textContent = '0';
    document.getElementById('xpCount2').textContent = '0';

    document.getElementById('quizModal').classList.add('active');
    loadQuestion();
}

function saveIdiomsLevelProgress(level, correct, total) {
    const progress = JSON.parse(localStorage.getItem('supersite-idioms-progress') || '{}');
    const key = 'level' + level;
    const existing = progress[key] || { completed: 0, total: total, bestScore: 0 };

    progress[key] = {
        completed: Math.max(existing.completed, correct),
        total: total,
        bestScore: Math.max(existing.bestScore, correct)
    };

    localStorage.setItem('supersite-idioms-progress', JSON.stringify(progress));
}

// ============================================
// ACTIVITY OPENER
// ============================================

// Activity order for access control (first one is free)
// IDs must match the onclick handlers in index.html
const engActivityOrder = ['grammar', 'vocabulary', 'synonyms', 'idioms', 'spelling', 'scramble'];

function openActivity(mode) {
    // Check access - first activity is free, others need login
    const activityIndex = engActivityOrder.indexOf(mode);
    const activityNames = {
        grammar: 'Grammar Master',
        vocabulary: 'Master Vocabulary',
        antonyms: 'Antonyms',
        synonyms: 'Synonyms',
        spelling: 'Spelling Bee',
        scramble: 'Word Scramble'
    };

    // Block access for non-first activities if not logged in OR not premium
    if (activityIndex > 0) {
        // First check if logged in
        if (window.BroProPlayer && !BroProPlayer.isLoggedIn()) {
            if (window.BroProAuth) {
                BroProAuth.showLoginRequired(`Login to unlock "${activityNames[mode] || mode}" and all other activities!`);
            } else {
                alert('Please login to access this activity!');
            }
            return;
        }

        // Then check if premium (only for logged in users)
        if (window.BroProPremium && !BroProPremium.isPremium()) {
            BroProPremium.showPremiumRequired(activityNames[mode] || mode);
            return;
        }
    }

    if (mode === 'spelling') {
        openSpelling();
        return;
    }
    if (mode === 'scramble') {
        openScramble();
        return;
    }

    const data = languageData[mode];
    if (!data) return;

    quizState.mode = mode;
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = []; // Reset user answers
    quizState.questions = shuffleArray([...data.questions]);

    // Update header
    document.getElementById('quizCategory').textContent = data.category;
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
    const data = languageData[quizState.mode];

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
    const data = languageData[quizState.mode];
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
// SPELLING BEE
// ============================================
function openSpelling() {
    const data = languageData.spelling;
    quizState.mode = 'spelling';
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = []; // Reset user answers
    quizState.questions = shuffleArray([...data.words]);

    document.getElementById('spellTotalQ').textContent = quizState.questions.length;
    document.getElementById('spellingModal').classList.add('active');

    loadSpellingWord();
}

function loadSpellingWord() {
    const word = quizState.questions[quizState.currentIndex];

    document.getElementById('spellCurrentQ').textContent = quizState.currentIndex + 1;
    document.getElementById('spellingMeaning').textContent = '"' + word.hint + '"';
    document.getElementById('spellingInput').value = '';
    document.getElementById('spellingInput').focus();
    document.getElementById('spellingFeedback').className = 'feedback-box';
}

function checkSpelling() {
    const word = quizState.questions[quizState.currentIndex];
    const input = document.getElementById('spellingInput').value.trim();
    const isCorrect = input.toLowerCase() === word.word.toLowerCase();

    // Track user's answer for explanations
    quizState.userAnswers[quizState.currentIndex] = input;

    const feedback = document.getElementById('spellingFeedback');

    if (isCorrect) {
        quizState.correct++;
        quizState.xpEarned += languageData.spelling.xpPerQuestion;

        feedback.className = 'feedback-box visible correct';
        document.getElementById('spellFeedbackIcon').textContent = '✅';
        document.getElementById('spellFeedbackText').textContent = 'Perfect! +25 XP';

        // Use recordCorrect for streak tracking
        if (window.BroProSounds) BroProSounds.recordCorrect();
    } else {
        quizState.wrong++;

        feedback.className = 'feedback-box visible wrong';
        document.getElementById('spellFeedbackIcon').textContent = '❌';
        document.getElementById('spellFeedbackText').textContent = 'Correct: ' + word.word;

        // Use recordWrong for streak tracking
        if (window.BroProSounds) BroProSounds.recordWrong();
    }

    setTimeout(() => {
        quizState.currentIndex++;
        if (quizState.currentIndex >= quizState.questions.length) {
            document.getElementById('spellingModal').classList.remove('active');
            endQuiz();
        } else {
            loadSpellingWord();
        }
    }, 1500);
}

function closeSpelling() {
    document.getElementById('spellingModal').classList.remove('active');
}

// ============================================
// WORD SCRAMBLE
// ============================================
function openScramble() {
    const data = languageData.scramble;
    quizState.mode = 'scramble';
    quizState.currentIndex = 0;
    quizState.correct = 0;
    quizState.wrong = 0;
    quizState.xpEarned = 0;
    quizState.userAnswers = []; // Reset user answers
    quizState.questions = shuffleArray([...data.words]);

    // Use spelling modal for scramble
    document.getElementById('spellingHint').textContent = 'Unscramble this word:';
    document.getElementById('spellTotalQ').textContent = quizState.questions.length;
    document.getElementById('spellingModal').classList.add('active');

    loadScrambleWord();
}

function loadScrambleWord() {
    const word = quizState.questions[quizState.currentIndex];

    document.getElementById('spellCurrentQ').textContent = quizState.currentIndex + 1;
    document.getElementById('spellingMeaning').textContent = word.scrambled;
    document.getElementById('spellingInput').value = '';
    document.getElementById('spellingInput').focus();
    document.getElementById('spellingFeedback').className = 'feedback-box';
}

// ============================================
// END QUIZ
// ============================================
function endQuiz() {
    document.getElementById('quizModal').classList.remove('active');
    document.getElementById('spellingModal').classList.remove('active');

    const total = quizState.questions.length;
    const accuracy = Math.round((quizState.correct / total) * 100);

    // Calculate XP with mastery multiplier
    let finalXP = quizState.xpEarned;
    let xpMessage = null;
    let level = quizState.vocabLevel || quizState.grammarLevel || quizState.synonymsLevel ||
        quizState.antonymsLevel || quizState.idiomsLevel || null;

    if (window.BroProPlayer) {
        // Get XP multiplier based on mastery status
        const multiplierInfo = BroProPlayer.calculateXPMultiplier('english', quizState.mode, accuracy, level);
        finalXP = Math.floor(quizState.xpEarned * multiplierInfo.multiplier);
        xpMessage = multiplierInfo.message;

        // Record this quiz completion
        BroProPlayer.recordQuizCompletion('english', quizState.mode, quizState.correct, total, level);

        // Add the adjusted XP
        BroProPlayer.addXP(finalXP, 'english');
        updateUI();

        console.log(`📊 English Quiz Complete - Raw XP: ${quizState.xpEarned}, Multiplier: ${multiplierInfo.multiplier}, Final XP: ${finalXP}, Reason: ${multiplierInfo.reason}`);
    }

    // Save vocabulary level progress if applicable
    if (quizState.mode === 'vocabulary' && quizState.vocabLevel) {
        saveVocabLevelProgress(quizState.vocabLevel, quizState.correct, total);
    }

    // Save grammar level progress if applicable
    if (quizState.mode === 'grammar' && quizState.grammarLevel) {
        saveGrammarLevelProgress(quizState.grammarLevel, quizState.correct, total);
    }

    // Save synonyms level progress if applicable
    if (quizState.mode === 'synonyms' && quizState.synonymsLevel) {
        saveSynonymsLevelProgress(quizState.synonymsLevel, quizState.correct, total);
    }

    // Save antonyms level progress if applicable
    if (quizState.mode === 'antonyms' && quizState.antonymsLevel) {
        saveAntonymsLevelProgress(quizState.antonymsLevel, quizState.correct, total);
    }

    // Save idioms level progress if applicable
    if (quizState.mode === 'idioms' && quizState.idiomsLevel) {
        saveIdiomsLevelProgress(quizState.idiomsLevel, quizState.correct, total);
    }

    document.getElementById('finalCorrect').textContent = quizState.correct;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalXP').textContent = finalXP;

    // Show practice mode message if applicable
    const resultsXPElement = document.getElementById('finalXP');
    if (xpMessage && resultsXPElement) {
        resultsXPElement.title = xpMessage;
        // Add visual indicator for reduced XP
        if (finalXP < quizState.xpEarned) {
            resultsXPElement.innerHTML = `${finalXP} <small style="font-size:0.6em;opacity:0.7">(Practice)</small>`;
        }
    }

    const title = accuracy >= 90 ? '🌟 Language Genius!' :
        accuracy >= 70 ? '🎉 Great Job!' :
            accuracy >= 50 ? '👍 Good Effort!' :
                '💪 Keep Practicing!';
    document.getElementById('resultsTitle').textContent = title;

    const icon = accuracy >= 90 ? '🏆' :
        accuracy >= 70 ? '🥈' :
            accuracy >= 50 ? '🥉' : '📖';
    document.getElementById('resultsIcon').textContent = icon;

    document.getElementById('resultsModal').classList.add('active');

    // Store quiz results for explanations
    if (window.BroProExplanations) {
        BroProExplanations.storeQuizResults(quizState.questions, quizState.userAnswers, 'english', quizState.mode);
    }

    if (accuracy >= 70 && window.BroProEffects) {
        BroProEffects.confetti();
    }

    // 📢 Log to real-time activity feed (visible to all users)
    if (window.logQuizActivity) {
        logQuizActivity('english', finalXP, accuracy);
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

    // Check if we were playing a specific level and restart that level
    if (quizState.mode === 'vocabulary' && quizState.vocabLevel) {
        startVocabularyLevel(quizState.vocabLevel);
    } else if (quizState.mode === 'grammar' && quizState.grammarLevel) {
        startGrammarLevel(quizState.grammarLevel);
    } else if (quizState.mode === 'synonyms' && quizState.synonymsLevel) {
        startSynonymsLevel(quizState.synonymsLevel);
    } else if (quizState.mode === 'antonyms' && quizState.antonymsLevel) {
        startAntonymsLevel(quizState.antonymsLevel);
    } else if (quizState.mode === 'idioms' && quizState.idiomsLevel) {
        startIdiomsLevel(quizState.idiomsLevel);
    } else {
        // Fallback for non-leveled activities or default
        openActivity(quizState.mode);
    }
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

// Current english leaderboard period
let currentEnglishPeriod = 'alltime';

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
    currentEnglishPeriod = period;

    // Update tab buttons
    const tabs = document.querySelectorAll('.leaderboard-tabs .tab-btn');
    tabs.forEach(tab => {
        const isActive = tab.dataset.period === period;
        tab.classList.toggle('active', isActive);

        if (isActive) {
            tab.style.background = 'linear-gradient(135deg, #fa709a, #fee140)';
            tab.style.color = 'white';
            tab.style.boxShadow = '0 4px 15px rgba(250, 112, 154, 0.3)';
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
        BroProLeaderboard.renderLeaderboard('leaderboardList', 'english', {
            showDelete: false,
            limit: 20,
            period: period
        });

        // Also update your rank separately
        BroProLeaderboard.getUserRank('english').then(rankInfo => {
            document.getElementById('yourPosition').textContent = rankInfo.rank;
            document.getElementById('yourScore').textContent = rankInfo.xp.toLocaleString();
        });

    } else {
        // Fallback to localStorage
        const leaderboard = JSON.parse(localStorage.getItem('supersite-leaderboard-english') || '[]');
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

