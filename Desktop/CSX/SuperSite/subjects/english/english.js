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
            },
            5: {
                name: 'Nature & Life',
                icon: '🏆',
                questions: [
                    { q: 'What is the meaning of Patrol?', options: ['Sleep (सोना)', 'Guard/Watch (गश्त लगाना)', 'Dance (नाचना)', 'Cook (खाना बनाना)'], answer: 'Guard/Watch (गश्त लगाना)' },
                    { q: 'What is the meaning of Excreta?', options: ['Food (भोजन)', 'Waste matter (मल-मूत्र)', 'Flower (फूल)', 'Water (पानी)'], answer: 'Waste matter (मल-मूत्र)' },
                    { q: 'What is the meaning of Argument?', options: ['Friendship (दोस्ती)', 'Disagreement (बहस)', 'Silence (चुप्पी)', 'Agreement (सहमति)'], answer: 'Disagreement (बहस)' },
                    { q: 'What is the meaning of Burp?', options: ['Sneeze (छींकना)', 'Belch (डकार)', 'Cough (खांसना)', 'Laugh (हंसना)'], answer: 'Belch (डकार)' },
                    { q: 'What is the meaning of Sprout?', options: ['Die (मरना)', 'Grow/Shoot (अंकुरित होना)', 'Cut (काटना)', 'Cook (पकाना)'], answer: 'Grow/Shoot (अंकुरित होना)' },
                    { q: 'What is the meaning of Germination?', options: ['Destruction (विनाश)', 'Sprouting (अंकुरण)', 'Sleeping (सोना)', 'Eating (खाना)'], answer: 'Sprouting (अंकुरण)' },
                    { q: 'What is the meaning of Python?', options: ['Small fish (छोटी मछली)', 'Large Snake (अजगर)', 'Bird (पक्षी)', 'Lion (शेर)'], answer: 'Large Snake (अजगर)' },
                    { q: 'What is the meaning of Killing?', options: ['Saving (बचाना)', 'Ending life (मारना/हत्या)', 'Creating (बनाना)', 'Helping (मदद करना)'], answer: 'Ending life (मारना/हत्या)' },
                    { q: 'What is the meaning of Snake Charmer?', options: ['Dancer (नर्तक)', 'Snake player (सपेरा)', 'Singer (गायक)', 'Doctor (चिकित्सक)'], answer: 'Snake player (सपेरा)' },
                    { q: 'What is the meaning of Boon?', options: ['Curse (श्राप)', 'Blessing/Gift (वरदान)', 'Loss (नुकसान)', 'Pain (दर्द)'], answer: 'Blessing/Gift (वरदान)' }
                ]
            },
            6: {
                name: 'Daily Life & Actions',
                icon: '🌟',
                questions: [
                    {
                        q: 'What is the meaning of Pretext?',
                        options: ['Truth (सच)', 'Excuse (बहाना)', 'Result (परिणाम)', 'Question (प्रश्न)'],
                        answer: 'Excuse (बहाना)',
                        explanation: {
                            word: 'Pretext',
                            hindi: 'बहाना',
                            partOfSpeech: 'Noun',
                            meaning: 'A false reason given to hide the real reason for doing something.',
                            sentence: 'Shivansh left the class on the pretext of drinking water, but he actually went to play.',
                            synonyms: ['Excuse', 'Ruse'],
                            antonyms: ['Truth', 'Reality']
                        }
                    },
                    {
                        q: 'What is the meaning of Melodious?',
                        options: ['Noisy (शोरगुल)', 'Pleasant sounding (मधुर/सुरीला)', 'Silent (शांत)', 'Bitter (कड़वा)'],
                        answer: 'Pleasant sounding (मधुर/सुरीला)',
                        explanation: {
                            word: 'Melodious',
                            hindi: 'मधुर/सुरीला',
                            partOfSpeech: 'Adjective',
                            meaning: 'It describes a sound that is pleasant and sweet to hear, like music.',
                            sentence: 'Stuti sang a melodious song during the school assembly.',
                            synonyms: ['Musical', 'Tuneful'],
                            antonyms: ['Harsh', 'Noisy']
                        }
                    },
                    {
                        q: 'What is the meaning of Beetle?',
                        options: ['Bird (पक्षी)', 'Insect (गुबरैला/भृंग)', 'Tool (औजार)', 'Plant (पौधा)'],
                        answer: 'Insect (गुबरैला/भृंग)',
                        explanation: {
                            word: 'Beetle',
                            hindi: 'गुबरैला/भृंग',
                            partOfSpeech: 'Noun',
                            meaning: 'It is a type of insect with hard wing covers.',
                            sentence: 'Yash found a shiny black beetle in the garden.',
                            synonyms: ['Bug', 'Insect'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Newlywed?',
                        options: ['Old friend (पुराना दोस्त)', 'Just married person (नवविवाहित)', 'Student (छात्र)', 'Teacher (शिक्षक)'],
                        answer: 'Just married person (नवविवाहित)',
                        explanation: {
                            word: 'Newlywed',
                            hindi: 'नवविवाहित',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who has recently gotten married.',
                            sentence: 'Sakshi went to visit the newlywed couple in her neighborhood.',
                            synonyms: ['Bride/Groom'],
                            antonyms: ['Single', 'Divorced']
                        }
                    },
                    {
                        q: 'What is the meaning of Suspect?',
                        options: ['Trust (भरोसा करना)', 'Doubt/Person under suspicion (संदेह करना/संदिग्ध)', 'Help (मदद करना)', 'Ignore (अनदेखा करना)'],
                        answer: 'Doubt/Person under suspicion (संदेह करना/संदिग्ध)',
                        explanation: {
                            word: 'Suspect',
                            hindi: 'संदेह करना/संदिग्ध',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'As a Verb: To think someone is guilty without proof. As a Noun: A person thought to be guilty of a crime.',
                            sentence: '(Verb) Sunil began to suspect that his pen was stolen, not lost. (Noun) The police caught the main suspect of the robbery.',
                            synonyms: ['Distrust', 'Accused'],
                            antonyms: ['Trust', 'Innocent']
                        }
                    },
                    {
                        q: 'What is the meaning of Campaign?',
                        options: ['Holiday (छुट्टी)', 'Organized effort/Drive (अभियान)', 'Sleep (नींद)', 'Accident (दुर्घटना)'],
                        answer: 'Organized effort/Drive (अभियान)',
                        explanation: {
                            word: 'Campaign',
                            hindi: 'अभियान',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: A series of actions to achieve a goal. As a Verb: To work in an organized way towards a goal.',
                            sentence: '(Noun) Palak started a "Clean India" campaign in her school. (Verb) Anurag likes to campaign for his friend during class elections.',
                            synonyms: ['Drive', 'Movement'],
                            antonyms: ['Inaction']
                        }
                    },
                    {
                        q: 'What is the meaning of Convict?',
                        options: ['Free person (स्वतंत्र व्यक्ति)', 'Prisoner/Declare guilty (दोषी ठहराना/कैदी)', 'Lawyer (वकील)', 'Judge (न्यायाधीश)'],
                        answer: 'Prisoner/Declare guilty (दोषी ठहराना/कैदी)',
                        explanation: {
                            word: 'Convict',
                            hindi: 'दोषी ठहराना/कैदी',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'As a Verb: To officially decide someone is guilty in court. As a Noun: A person serving a sentence in prison.',
                            sentence: '(Verb) The judge had enough proof to convict the thief. (Noun) Suraj read a news story about an escaped convict.',
                            synonyms: ['Prisoner', 'Condemn'],
                            antonyms: ['Acquit', 'Free man']
                        }
                    },
                    {
                        q: 'What is the meaning of Prey?',
                        options: ['Hunter (शिकारी)', 'Hunted animal (शिकार)', 'Pet (पालतू जानवर)', 'Friend (दोस्त)'],
                        answer: 'Hunted animal (शिकार)',
                        explanation: {
                            word: 'Prey',
                            hindi: 'शिकार',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: An animal that is hunted and killed by another for food. As a Verb: To hunt and kill for food.',
                            sentence: '(Noun) Khushboo watched the cat catch its prey in the garden. (Verb) Eagles prey on small animals like mice.',
                            synonyms: ['Victim', 'Quarry'],
                            antonyms: ['Predator', 'Hunter']
                        }
                    },
                    {
                        q: 'What is the meaning of Starvation?',
                        options: ['Feasting (दावत)', 'Extreme hunger (भुखमरी)', 'Thirst (प्यास)', 'Exercise (व्यायाम)'],
                        answer: 'Extreme hunger (भुखमरी)',
                        explanation: {
                            word: 'Starvation',
                            hindi: 'भुखमरी',
                            partOfSpeech: 'Noun',
                            meaning: 'Suffering or death caused by having no food.',
                            sentence: 'Vivek donated money to help people suffering from starvation.',
                            synonyms: ['Famine', 'Hunger'],
                            antonyms: ['Plenty', 'Fullness']
                        }
                    },
                    {
                        q: 'What is the meaning of Traditional?',
                        options: ['Modern (आधुनिक)', 'Customary/Old style (परंपरागत)', 'New (नया)', 'Strange (अजीब)'],
                        answer: 'Customary/Old style (परंपरागत)',
                        explanation: {
                            word: 'Traditional',
                            hindi: 'परंपरागत',
                            partOfSpeech: 'Adjective',
                            meaning: 'Following ideas or methods that have existed for a long time.',
                            sentence: 'Anshit wore a traditional Kurta Pyjama for the festival.',
                            synonyms: ['Customary', 'Classic'],
                            antonyms: ['Modern', 'New']
                        }
                    },
                    {
                        q: 'What is the meaning of Prediction?',
                        options: ['History (इतिहास)', 'Forecast (भविष्यवाणी)', 'Memory (याद)', 'Secret (रहस्य)'],
                        answer: 'Forecast (भविष्यवाणी)',
                        explanation: {
                            word: 'Prediction',
                            hindi: 'भविष्यवाणी',
                            partOfSpeech: 'Noun',
                            meaning: 'A statement about what will happen in the future.',
                            sentence: 'Anshika made a prediction that it would rain today, and she was right!',
                            synonyms: ['Forecast', 'Guess'],
                            antonyms: ['Fact', 'Reality']
                        }
                    },
                    {
                        q: 'What is the meaning of Scraper?',
                        options: ['Brush (ब्रश)', 'Tool for scraping (खुरचनी)', 'Hammer (हथौड़ा)', 'Spoon (चम्मच)'],
                        answer: 'Tool for scraping (खुरचनी)',
                        explanation: {
                            word: 'Scraper',
                            hindi: 'खुरचनी',
                            partOfSpeech: 'Noun',
                            meaning: 'A tool or device used for scraping dirt, paint, or ice from a surface.',
                            sentence: 'Anchal used a metal scraper to remove the old paint from the wall.',
                            synonyms: ['Remover', 'Blade'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Debris?',
                        options: ['Treasure (खजाना)', 'Rubble/Trash (मलबा)', 'Food (खाना)', 'Clothes (कपड़े)'],
                        answer: 'Rubble/Trash (मलबा)',
                        explanation: {
                            word: 'Debris',
                            hindi: 'मलबा',
                            partOfSpeech: 'Noun',
                            meaning: 'Scattered pieces of rubbish or remains of something destroyed.',
                            sentence: 'Divansh helped clean up the debris after the strong storm.',
                            synonyms: ['Rubble', 'Wreckage'],
                            antonyms: ['Neatness', 'Purity']
                        }
                    },
                    {
                        q: 'What is the meaning of Reduce?',
                        options: ['Increase (बढ़ाना)', 'Decrease/Make less (कम करना)', 'Buy (खरीदना)', 'Sell (बेचना)'],
                        answer: 'Decrease/Make less (कम करना)',
                        explanation: {
                            word: 'Reduce',
                            hindi: 'कम करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To make something smaller or less in amount.',
                            sentence: 'Suraj Yadav decided to reduce the time he spends playing mobile games.',
                            synonyms: ['Decrease', 'Lower'],
                            antonyms: ['Increase', 'Expand']
                        }
                    },
                    {
                        q: 'What is the meaning of Shrew?',
                        options: ['Elephant (हाथी)', 'Mouse-like animal (छछूंदर)', 'Fish (मछली)', 'Bird (पक्षी)'],
                        answer: 'Mouse-like animal (छछूंदर)',
                        explanation: {
                            word: 'Shrew',
                            hindi: 'छछूंदर',
                            partOfSpeech: 'Noun',
                            meaning: 'A small animal that looks like a mouse but has a long, pointed nose.',
                            sentence: 'Shlok Nishad saw a tiny shrew running quickly across the garden path.',
                            synonyms: ['Mole-like animal'],
                            antonyms: []
                        }
                    }
                ]
            },
            7: {
                name: 'Nature & Society',
                icon: '🌾',
                questions: [
                    {
                        q: 'What is the meaning of Pore?',
                        options: ['Rock (चट्टान)', 'Tiny opening (छिद्र/सुराख)', 'Thread (धागा)', 'Box (डिब्बा)'],
                        answer: 'Tiny opening (छिद्र/सुराख)',
                        explanation: {
                            word: 'Pore',
                            hindi: 'छिद्र/सुराख',
                            partOfSpeech: 'Noun',
                            meaning: 'A very tiny opening in the skin or other surfaces through which liquid or air can pass.',
                            sentence: 'Mahak washed her face to clean the dust from every pore of her skin.',
                            synonyms: ['Hole', 'Opening'],
                            antonyms: ['Barrier', 'Seal']
                        }
                    },
                    {
                        q: 'What is the meaning of Crack down?',
                        options: ['Break (तोड़ना)', 'Take severe action (कड़ी कार्रवाई करना)', 'Dance (नाचना)', 'Laugh (हंसना)'],
                        answer: 'Take severe action (कड़ी कार्रवाई करना)',
                        explanation: {
                            word: 'Crack down',
                            hindi: 'कड़ी कार्रवाई करना',
                            partOfSpeech: 'Phrasal Verb',
                            meaning: 'To start enforcing a law or rule very strictly.',
                            sentence: 'The school principal decided to crack down on students coming late, so Swati arrived early.',
                            synonyms: ['Clamp down', 'Suppress'],
                            antonyms: ['Allow', 'Loosen']
                        }
                    },
                    {
                        q: 'What is the meaning of Disappear?',
                        options: ['Arrive (पहुंचना)', 'Vanish (गायब होना)', 'Shout (चिल्लाना)', 'Shine (चमकना)'],
                        answer: 'Vanish (गायब होना)',
                        explanation: {
                            word: 'Disappear',
                            hindi: 'गायब होना',
                            partOfSpeech: 'Verb',
                            meaning: 'To go somewhere where you cannot be seen or found.',
                            sentence: 'Ankit watched the airplane disappear into the clouds.',
                            synonyms: ['Vanish', 'Fade'],
                            antonyms: ['Appear', 'Emerge']
                        }
                    },
                    {
                        q: 'What is the meaning of Swallow?',
                        options: ['Spit (थूकना)', 'Gulp down (निगलना)', 'Chew (चबाना)', 'Cook (पकाना)'],
                        answer: 'Gulp down (निगलना)',
                        explanation: {
                            word: 'Swallow',
                            hindi: 'निगलना',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'As a Verb: To make food or drink go down your throat. As a Noun: A type of small bird.',
                            sentence: '(Verb) Hari Kishan had to swallow the bitter medicine quickly. (Noun) Hari Kishan saw a blue swallow flying in the sky.',
                            synonyms: ['Gulp', 'Ingest'],
                            antonyms: ['Spit', 'Vomit']
                        }
                    },
                    {
                        q: 'What is the meaning of Kin?',
                        options: ['Enemy (दुश्मन)', 'Relatives/Family (रिश्तेदार/परिजन)', 'King (राजा)', 'Stranger (अजनबी)'],
                        answer: 'Relatives/Family (रिश्तेदार/परिजन)',
                        explanation: {
                            word: 'Kin',
                            hindi: 'रिश्तेदार/परिजन',
                            partOfSpeech: 'Noun',
                            meaning: 'Your family and relations.',
                            sentence: 'Adarsh invited all his kin to his sister\'s wedding.',
                            synonyms: ['Family', 'Relatives'],
                            antonyms: ['Strangers', 'Outsiders']
                        }
                    },
                    {
                        q: 'What is the meaning of Flourish?',
                        options: ['Burn (जलना)', 'Grow well/Thrive (फलना-फूलना)', 'Shout (चिल्लाना)', 'Fall (गिरना)'],
                        answer: 'Grow well/Thrive (फलना-फूलना)',
                        explanation: {
                            word: 'Flourish',
                            hindi: 'फलना-फूलना',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'As a Verb: To grow in a healthy way. As a Noun: A grand gesture.',
                            sentence: '(Verb) Ladli watered the plants to make them flourish. (Noun) The dancer ended her performance with a flourish.',
                            synonyms: ['Thrive', 'Prosper'],
                            antonyms: ['Wither', 'Fail']
                        }
                    },
                    {
                        q: 'What is the meaning of Patience?',
                        options: ['Anger (क्रोध)', 'Tolerance/Calmness (धैर्य/सब्र)', 'Hurry (जल्दी)', 'Fear (डर)'],
                        answer: 'Tolerance/Calmness (धैर्य/सब्र)',
                        explanation: {
                            word: 'Patience',
                            hindi: 'धैर्य/सब्र',
                            partOfSpeech: 'Noun',
                            meaning: 'The ability to wait or accept trouble without getting angry.',
                            sentence: 'Aniket Kumar showed great patience while teaching his little brother to read.',
                            synonyms: ['Endurance', 'Tolerance'],
                            antonyms: ['Haste', 'Impatience']
                        }
                    },
                    {
                        q: 'What is the meaning of Humus?',
                        options: ['Rock (पत्थर)', 'Organic soil component (खाद-मिट्टी)', 'Plastic (प्लास्टिक)', 'Metal (धातु)'],
                        answer: 'Organic soil component (खाद-मिट्टी)',
                        explanation: {
                            word: 'Humus',
                            hindi: 'खाद-मिट्टी',
                            partOfSpeech: 'Noun',
                            meaning: 'The dark organic material in soil formed from decayed leaves and plants, which is very good for growing crops.',
                            sentence: 'Shivshant added humus to the garden soil to make the flowers grow better.',
                            synonyms: ['Compost', 'Soil matter'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Till?',
                        options: ['Sleep (सोना)', 'Prepare land/Plow (जुताई करना)', 'Build (निर्माण करना)', 'Eat (खाना)'],
                        answer: 'Prepare land/Plow (जुताई करना)',
                        explanation: {
                            word: 'Till',
                            hindi: 'जुताई करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To prepare and cultivate the land for growing crops.',
                            sentence: 'Divanshi watched the farmer till the field with a tractor.',
                            synonyms: ['Plow', 'Cultivate'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Ancient?',
                        options: ['New (नया)', 'Very old (प्राचीन)', 'Clean (साफ)', 'Fast (तेज)'],
                        answer: 'Very old (प्राचीन)',
                        explanation: {
                            word: 'Ancient',
                            hindi: 'प्राचीन',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something belonging to the very distant past.',
                            sentence: 'Sakshi 2 visited an ancient temple that was built 1,000 years ago.',
                            synonyms: ['Old', 'Antique'],
                            antonyms: ['Modern', 'New']
                        }
                    },
                    {
                        q: 'What is the meaning of Sow?',
                        options: ['Cut (काटना)', 'Plant seeds (बोना)', 'Dig (खोदना)', 'Water (सींचना)'],
                        answer: 'Plant seeds (बोना)',
                        explanation: {
                            word: 'Sow',
                            hindi: 'बोना',
                            partOfSpeech: 'Verb',
                            meaning: 'To plant seeds in the ground.',
                            sentence: 'Vipin helped his father sow the wheat seeds before the rain started.',
                            synonyms: ['Plant', 'Seed'],
                            antonyms: ['Harvest', 'Reap']
                        }
                    },
                    {
                        q: 'What is the meaning of Youth?',
                        options: ['Old age (बुढ़ापा)', 'Young period/Young people (जवानी/युवा)', 'Illness (बीमारी)', 'Night (रात)'],
                        answer: 'Young period/Young people (जवानी/युवा)',
                        explanation: {
                            word: 'Youth',
                            hindi: 'जवानी/युवा',
                            partOfSpeech: 'Noun',
                            meaning: 'The time of life when a person is young, or young people in general.',
                            sentence: 'Madhu said that the youth of India can change the country\'s future.',
                            synonyms: ['Youngster', 'Adolescence'],
                            antonyms: ['Elderly', 'Old age']
                        }
                    },
                    {
                        q: 'What is the meaning of Bust?',
                        options: ['Fix (ठीक करना)', 'Break/Catch (फोड़ना/पकड़ना)', 'Hide (छिपाना)', 'Sleep (सोना)'],
                        answer: 'Break/Catch (फोड़ना/पकड़ना)',
                        explanation: {
                            word: 'Bust',
                            hindi: 'फोड़ना/पकड़ना',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'As a Verb: To break something or to catch someone doing something wrong. As a Noun: A sculpture of a person\'s head and shoulders.',
                            sentence: '(Verb) Be careful not to bust the balloon! warned Kishan. (Noun) Kishan saw a bronze bust of Mahatma Gandhi in the park.',
                            synonyms: ['Break', 'Crack', 'Arrest'],
                            antonyms: ['Fix', 'Mend']
                        }
                    },
                    {
                        q: 'What is the meaning of Leguminous?',
                        options: ['Poisonous (जहरीला)', 'Related to beans/peas (फलीदार)', 'Sandy (रेतीला)', 'Liquid (तरल)'],
                        answer: 'Related to beans/peas (फलीदार)',
                        explanation: {
                            word: 'Leguminous',
                            hindi: 'फलीदार',
                            partOfSpeech: 'Adjective',
                            meaning: 'Describes plants that belong to the pea or bean family (legumes).',
                            sentence: 'Anshika learned that leguminous plants help improve soil quality.',
                            synonyms: ['Bean-like', 'Pod-bearing'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Mob?',
                        options: ['Quiet group (शांत समूह)', 'Disorderly crowd (भीड़)', 'Family (परिवार)', 'Team (टीम)'],
                        answer: 'Disorderly crowd (भीड़)',
                        explanation: {
                            word: 'Mob',
                            hindi: 'भीड़',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: A large crowd of people, often disorderly or angry. As a Verb: To crowd around someone aggressively.',
                            sentence: '(Noun) The police controlled the angry mob on the street. (Verb) Fans tried to mob the cricket star, so Shivansh stayed back.',
                            synonyms: ['Crowd', 'Horde'],
                            antonyms: ['Individual', 'Solitary']
                        }
                    }
                ]
            },
            8: {
                name: 'Daily Life & Tools',
                icon: '🔧',
                questions: [
                    {
                        q: 'What is the meaning of Lynching?',
                        options: ['Scolding (डांटना)', 'Killing by mob (भीड़ द्वारा मार डालना)', 'Arresting (गिरफ्तार करना)', 'Meeting (मुलाकात)'],
                        answer: 'Killing by mob (भीड़ द्वारा मार डालना)',
                        explanation: {
                            word: 'Lynching',
                            hindi: 'भीड़ द्वारा मार डालना',
                            partOfSpeech: 'Noun',
                            meaning: 'When a mob (angry crowd) attacks and kills someone illegally, usually by beating.',
                            sentence: 'Ankit was shocked to read the news about the violent lynching in the city.',
                            synonyms: ['Mob execution', 'Killing'],
                            antonyms: ['Protecting', 'Saving']
                        }
                    },
                    {
                        q: 'What is the meaning of Almost?',
                        options: ['Never (कभी नहीं)', 'Nearly/About to (लगभग)', 'Always (हमेशा)', 'Far (दूर)'],
                        answer: 'Nearly/About to (लगभग)',
                        explanation: {
                            word: 'Almost',
                            hindi: 'लगभग',
                            partOfSpeech: 'Adverb',
                            meaning: 'Very nearly, but not completely.',
                            sentence: 'Hari Kishan fell asleep because the movie was almost three hours long.',
                            synonyms: ['Nearly', 'Practically'],
                            antonyms: ['Exactly', 'Completely']
                        }
                    },
                    {
                        q: 'What is the meaning of Vendor?',
                        options: ['Buyer (खरीददार)', 'Seller/Hawker (फेरीवाला/विक्रेता)', 'Doctor (चिकित्सक)', 'Driver (चालक)'],
                        answer: 'Seller/Hawker (फेरीवाला/विक्रेता)',
                        explanation: {
                            word: 'Vendor',
                            hindi: 'फेरीवाला/विक्रेता',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who sells things, especially on the street.',
                            sentence: 'Adarsh bought fresh vegetables from the street vendor.',
                            synonyms: ['Seller', 'Merchant'],
                            antonyms: ['Customer', 'Buyer']
                        }
                    },
                    {
                        q: 'What is the meaning of Drag?',
                        options: ['Push (धकेलना)', 'Pull heavily (खींचना/घसीटना)', 'Lift (उठाना)', 'Drop (गिराना)'],
                        answer: 'Pull heavily (खींचना/घसीटना)',
                        explanation: {
                            word: 'Drag',
                            hindi: 'खींचना/घसीटना',
                            partOfSpeech: 'Verb',
                            meaning: 'To pull something along the ground with effort.',
                            sentence: 'The box was so heavy that Ladli had to drag it across the room.',
                            synonyms: ['Pull', 'Haul'],
                            antonyms: ['Push', 'Carry']
                        }
                    },
                    {
                        q: 'What is the meaning of Unconscious?',
                        options: ['Alert (सतर्क)', 'Fainted/Senseless (बेहोश)', 'Active (सक्रिय)', 'Smart (होशियार)'],
                        answer: 'Fainted/Senseless (बेहोश)',
                        explanation: {
                            word: 'Unconscious',
                            hindi: 'बेहोश',
                            partOfSpeech: 'Adjective',
                            meaning: 'A person who is not awake and aware of their surroundings, often due to injury.',
                            sentence: 'After hitting his head, the player fell unconscious, and Aniket Kumar ran to help him.',
                            synonyms: ['Senseless', 'Fainted'],
                            antonyms: ['Conscious', 'Awake']
                        }
                    },
                    {
                        q: 'What is the meaning of Temple?',
                        options: ['School (विद्यालय)', 'Worship place OR Side of head (मंदिर या कनपटी)', 'Market (बाजार)', 'Park (बगीचा)'],
                        answer: 'Worship place OR Side of head (मंदिर या कनपटी)',
                        explanation: {
                            word: 'Temple',
                            hindi: 'मंदिर या कनपटी',
                            partOfSpeech: 'Noun',
                            meaning: '1. A building used for religious worship. 2. The flat part of the side of the head between the forehead and the ear.',
                            sentence: '(Meaning 1) Shivshant went to the temple to offer prayers. (Meaning 2) Shivshant had a headache right on his left temple.',
                            synonyms: ['Shrine'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Address?',
                        options: ['Dress (कपड़ा)', 'Location OR Speech (पता या संबोधित करना)', 'Food (खाना)', 'Song (गाना)'],
                        answer: 'Location OR Speech (पता या संबोधित करना)',
                        explanation: {
                            word: 'Address',
                            hindi: 'पता या संबोधित करना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: The details of where a person lives. As a Verb: To speak to a group of people formally.',
                            sentence: '(Noun) Divanshi wrote her home address on the envelope. (Verb) The Principal decided to address the students in the morning assembly.',
                            synonyms: ['Residence', 'Speech'],
                            antonyms: ['Ignore']
                        }
                    },
                    {
                        q: 'What is the meaning of Wrinkle?',
                        options: ['Smoothness (चिकनाई)', 'Fold/Crease (सिकुड़न/झुर्री)', 'Spot (दाग)', 'Cut (कट)'],
                        answer: 'Fold/Crease (सिकुड़न/झुर्री)',
                        explanation: {
                            word: 'Wrinkle',
                            hindi: 'सिकुड़न/झुर्री',
                            partOfSpeech: 'Noun',
                            meaning: 'A small line or fold in something, especially fabric or the skin.',
                            sentence: 'Sakshi 2 ironed her shirt to remove every wrinkle.',
                            synonyms: ['Crease', 'Fold'],
                            antonyms: ['Smoothness', 'Flatness']
                        }
                    },
                    {
                        q: 'What is the meaning of Priest?',
                        options: ['Soldier (सैनिक)', 'Religious leader/Pujari (पुजारी)', 'King (राजा)', 'Farmer (किसान)'],
                        answer: 'Religious leader/Pujari (पुजारी)',
                        explanation: {
                            word: 'Priest',
                            hindi: 'पुजारी',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who performs religious ceremonies.',
                            sentence: 'Vipin asked the priest for blessings after the ceremony.',
                            synonyms: ['Clergyman', 'Pujari'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Objectionable?',
                        options: ['Acceptable (स्वीकार्य)', 'Offensive/Unpleasant (आपत्तिजनक)', 'Beautiful (सुंदर)', 'Tasty (स्वादिष्ट)'],
                        answer: 'Offensive/Unpleasant (आपत्तिजनक)',
                        explanation: {
                            word: 'Objectionable',
                            hindi: 'आपत्तिजनक',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something that causes people to disagree or feel offended.',
                            sentence: 'The teacher told the class that using bad words is objectionable, so Madhu apologized.',
                            synonyms: ['Offensive', 'Unacceptable'],
                            antonyms: ['Acceptable', 'Pleasant']
                        }
                    },
                    {
                        q: 'What is the meaning of Entire?',
                        options: ['Half (आधा)', 'Whole/Complete (पूरा/संपूर्ण)', 'Empty (खाली)', 'Broken (टूटा हुआ)'],
                        answer: 'Whole/Complete (पूरा/संपूर्ण)',
                        explanation: {
                            word: 'Entire',
                            hindi: 'पूरा/संपूर्ण',
                            partOfSpeech: 'Adjective',
                            meaning: 'With no part left out; whole.',
                            sentence: 'Kishan was so hungry he ate the entire pizza by himself.',
                            synonyms: ['Whole', 'Total'],
                            antonyms: ['Partial', 'Incomplete']
                        }
                    },
                    {
                        q: 'What is the meaning of Obesity?',
                        options: ['Fitness (तंदुरुस्ती)', 'Extreme fatness (मोटापा)', 'Weakness (कमजोरी)', 'Height (लंबाई)'],
                        answer: 'Extreme fatness (मोटापा)',
                        explanation: {
                            word: 'Obesity',
                            hindi: 'मोटापा',
                            partOfSpeech: 'Noun',
                            meaning: 'The medical condition of being very overweight or fat in a way that is unhealthy.',
                            sentence: 'Anshika learned that eating too much junk food can lead to obesity.',
                            synonyms: ['Fatness', 'Overweight'],
                            antonyms: ['Thinness', 'Fitness']
                        }
                    },
                    {
                        q: 'What is the meaning of Insecticide?',
                        options: ['Fertilizer (खाद)', 'Insect killer (कीटनाशक)', 'Water (पानी)', 'Seed (बीज)'],
                        answer: 'Insect killer (कीटनाशक)',
                        explanation: {
                            word: 'Insecticide',
                            hindi: 'कीटनाशक',
                            partOfSpeech: 'Noun',
                            meaning: 'A chemical used to kill insects that damage crops.',
                            sentence: 'Shivansh watched the farmer spray insecticide to save the crops from bugs.',
                            synonyms: ['Pesticide', 'Bug spray'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Hoe?',
                        options: ['Hammer (हथौड़ा)', 'Garden tool (कुदाली)', 'Knife (चाकू)', 'Rope (रस्सी)'],
                        answer: 'Garden tool (कुदाली)',
                        explanation: {
                            word: 'Hoe',
                            hindi: 'कुदाली',
                            partOfSpeech: 'Noun',
                            meaning: 'A gardening tool with a long handle and a flat blade, used for weeding and breaking up soil.',
                            sentence: 'Yash used a hoe to remove the weeds from the flower bed.',
                            synonyms: ['Digger', 'Mattock'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Plough?',
                        options: ['Harvest (काटना)', 'Farm tool/Turn soil (हल/जुताई करना)', 'Paint (रंगना)', 'Build (बनाना)'],
                        answer: 'Farm tool/Turn soil (हल/जुताई करना)',
                        explanation: {
                            word: 'Plough',
                            hindi: 'हल/जुताई करना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: A large farming tool pulled by a tractor or animals to turn the soil. As a Verb: To turn up the earth with a plough.',
                            sentence: '(Noun) The farmer attached the plough to his tractor. (Verb) Stuti watched the oxen plough the field before the rain came.',
                            synonyms: ['Tiller', 'Till'],
                            antonyms: []
                        }
                    }
                ]
            },
            9: {
                name: 'News & Events',
                icon: '📰',
                questions: [
                    {
                        q: 'What is the meaning of Clump?',
                        options: ['Single piece (एक टुकड़ा)', 'Bunch/Cluster (गुच्छा/समूह)', 'Line (रेखा)', 'Liquid (तरल)'],
                        answer: 'Bunch/Cluster (गुच्छा/समूह)',
                        explanation: {
                            word: 'Clump',
                            hindi: 'गुच्छा/समूह',
                            partOfSpeech: 'Noun',
                            meaning: 'A small group of things or people clustered together.',
                            sentence: 'Ankit found a clump of trees where he could sit in the shade.',
                            synonyms: ['Bunch', 'Cluster'],
                            antonyms: ['Individual', 'Single']
                        }
                    },
                    {
                        q: 'What is the meaning of Contamination?',
                        options: ['Cleaning (सफाई)', 'Pollution/Impurity (दूषित करना/मिलावट)', 'Cooking (पकाना)', 'Decoration (सजावट)'],
                        answer: 'Pollution/Impurity (दूषित करना/मिलावट)',
                        explanation: {
                            word: 'Contamination',
                            hindi: 'दूषित करना/मिलावट',
                            partOfSpeech: 'Noun',
                            meaning: 'The action of making something impure or harmful by adding dirt or chemicals.',
                            sentence: 'Hari Kishan boiled the water to remove any contamination before drinking.',
                            synonyms: ['Pollution', 'Infection'],
                            antonyms: ['Purification', 'Cleaning']
                        }
                    },
                    {
                        q: 'What is the meaning of Controversy?',
                        options: ['Agreement (सहमति)', 'Dispute/Debate (विवाद)', 'Party (दावत)', 'Silence (शांति)'],
                        answer: 'Dispute/Debate (विवाद)',
                        explanation: {
                            word: 'Controversy',
                            hindi: 'विवाद',
                            partOfSpeech: 'Noun',
                            meaning: 'A prolonged public disagreement or heated discussion.',
                            sentence: 'There was a big controversy in the class about who broke the window, Adarsh or the wind.',
                            synonyms: ['Dispute', 'Argument'],
                            antonyms: ['Agreement', 'Harmony']
                        }
                    },
                    {
                        q: 'What is the meaning of Spark?',
                        options: ['Water drop (पानी की बूंद)', 'Ignite/Flash (चिंगारी/भड़कना)', 'Darken (अंधेरा)', 'Freeze (जमना)'],
                        answer: 'Ignite/Flash (चिंगारी/भड़कना)',
                        explanation: {
                            word: 'Spark',
                            hindi: 'चिंगारी/भड़कना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: A small fiery particle thrown off from a fire. As a Verb: To ignite or start something suddenly.',
                            sentence: '(Noun) A tiny spark from the matchstick started the fire. (Verb) The small fight between friends threatened to spark a bigger argument for Ladli.',
                            synonyms: ['Flash', 'Ignite'],
                            antonyms: ['Extinguish']
                        }
                    },
                    {
                        q: 'What is the meaning of Erupt?',
                        options: ['Sleep (सोना)', 'Burst out/Explode (भड़क जाना/फटना)', 'Hide (छिपना)', 'Walk (चलना)'],
                        answer: 'Burst out/Explode (भड़क जाना/फटना)',
                        explanation: {
                            word: 'Erupt',
                            hindi: 'भड़क जाना/फटना',
                            partOfSpeech: 'Verb',
                            meaning: 'To break out suddenly and dramatically (like a volcano or anger).',
                            sentence: 'Aniket Kumar saw the volcano erupt in the movie.',
                            synonyms: ['Explode', 'Burst'],
                            antonyms: ['Subside', 'Calm']
                        }
                    },
                    {
                        q: 'What is the meaning of Outbreak?',
                        options: ['Ending (अंत)', 'Sudden start (प्रकोप/आरंभ)', 'Meeting (सभा)', 'Gift (उपहार)'],
                        answer: 'Sudden start (प्रकोप/आरंभ)',
                        explanation: {
                            word: 'Outbreak',
                            hindi: 'प्रकोप/आरंभ',
                            partOfSpeech: 'Noun',
                            meaning: 'The sudden start of something unwelcome, like war or disease.',
                            sentence: 'Doctors worked hard to stop the outbreak of the flu in Shivshant\'s village.',
                            synonyms: ['Eruption', 'Epidemic'],
                            antonyms: ['Conclusion', 'End']
                        }
                    },
                    {
                        q: 'What is the meaning of Severe?',
                        options: ['Mild (हल्का)', 'Serious/Harsh (गंभीर/खतरनाक)', 'Happy (खुश)', 'Soft (नरम)'],
                        answer: 'Serious/Harsh (गंभीर/खतरनाक)',
                        explanation: {
                            word: 'Severe',
                            hindi: 'गंभीर/खतरनाक',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something very intense, strict, or bad.',
                            sentence: 'Divanshi had a severe headache and could not come to school.',
                            synonyms: ['Critical', 'Harsh'],
                            antonyms: ['Mild', 'Gentle']
                        }
                    },
                    {
                        q: 'What is the meaning of Worst?',
                        options: ['Best (सबसे अच्छा)', 'Most bad (सबसे बुरा)', 'Good (अच्छा)', 'Better (बेहतर)'],
                        answer: 'Most bad (सबसे बुरा)',
                        explanation: {
                            word: 'Worst',
                            hindi: 'सबसे बुरा',
                            partOfSpeech: 'Adjective',
                            meaning: 'Of the poorest quality or the most unpleasant thing.',
                            sentence: 'Losing his favorite cricket bat was the worst feeling for Sakshi 2\'s brother.',
                            synonyms: ['Poorest', 'Lowest'],
                            antonyms: ['Best', 'Finest']
                        }
                    },
                    {
                        q: 'What is the meaning of Acute?',
                        options: ['Dull (मंद)', 'Sharp/Severe (तेज/गंभीर)', 'Round (गोल)', 'Heavy (भारी)'],
                        answer: 'Sharp/Severe (तेज/गंभीर)',
                        explanation: {
                            word: 'Acute',
                            hindi: 'तेज/गंभीर',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something present or experienced to a severe or intense degree (often used for pain or shortage).',
                            sentence: 'There was an acute shortage of water in the city, so Vipin used it carefully.',
                            synonyms: ['Sharp', 'Critical'],
                            antonyms: ['Mild', 'Dull']
                        }
                    },
                    {
                        q: 'What is the meaning of Surge?',
                        options: ['Decrease (घटना)', 'Sudden increase/Rush (वृद्धि/उमड़ना)', 'Stop (रुकना)', 'Sleep (सोना)'],
                        answer: 'Sudden increase/Rush (वृद्धि/उमड़ना)',
                        explanation: {
                            word: 'Surge',
                            hindi: 'वृद्धि/उमड़ना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: A sudden powerful forward or upward movement. As a Verb: To increase suddenly and powerfully.',
                            sentence: '(Noun) There was a sudden surge in the price of onions at the market. (Verb) Madhu felt hope surge in her heart when she saw the exam results.',
                            synonyms: ['Rush', 'Rise'],
                            antonyms: ['Drop', 'Decline']
                        }
                    },
                    {
                        q: 'What is the meaning of Claim?',
                        options: ['Give (देना)', 'Demand/Assert (दावा करना)', 'Hide (छिपाना)', 'Lose (खोना)'],
                        answer: 'Demand/Assert (दावा करना)',
                        explanation: {
                            word: 'Claim',
                            hindi: 'दावा करना',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'As a Verb: To state that something is the case, typically without providing proof yet. As a Noun: An assertion of the truth of something.',
                            sentence: '(Verb) Kishan likes to claim that he is the fastest runner in school. (Noun) The teacher investigated the claim that the homework was too difficult.',
                            synonyms: ['Assert', 'Demand'],
                            antonyms: ['Deny', 'Reject']
                        }
                    },
                    {
                        q: 'What is the meaning of Occur?',
                        options: ['Stop (रुकना)', 'Happen (घटित होना)', 'Plan (योजना बनाना)', 'Forget (भूलना)'],
                        answer: 'Happen (घटित होना)',
                        explanation: {
                            word: 'Occur',
                            hindi: 'घटित होना',
                            partOfSpeech: 'Verb',
                            meaning: 'To happen or take place.',
                            sentence: 'Accidents often occur when people drive too fast, Anshika noted.',
                            synonyms: ['Happen', 'Take place'],
                            antonyms: ['Prevent', 'Stop']
                        }
                    },
                    {
                        q: 'What is the meaning of Fatality?',
                        options: ['Birth (जन्म)', 'Death by accident (मौत/मृत्यु)', 'Injury (चोट)', 'Recovery (सुधार)'],
                        answer: 'Death by accident (मौत/मृत्यु)',
                        explanation: {
                            word: 'Fatality',
                            hindi: 'मौत/मृत्यु',
                            partOfSpeech: 'Noun',
                            meaning: 'An occurrence of death by accident, in war, or from disease.',
                            sentence: 'Fortunately, there was no fatality in the bus accident, Shivansh told his parents.',
                            synonyms: ['Death', 'Casualty'],
                            antonyms: ['Survival', 'Birth']
                        }
                    },
                    {
                        q: 'What is the meaning of Suspicion?',
                        options: ['Trust (विश्वास)', 'Doubt/Mistrust (संदेह/शक)', 'Knowledge (ज्ञान)', 'Love (प्यार)'],
                        answer: 'Doubt/Mistrust (संदेह/शक)',
                        explanation: {
                            word: 'Suspicion',
                            hindi: 'संदेह/शक',
                            partOfSpeech: 'Noun',
                            meaning: 'A feeling that someone is guilty of doing something wrong or that something is not right.',
                            sentence: 'Yash looked at the broken vase with suspicion, thinking the cat did it.',
                            synonyms: ['Doubt', 'Distrust'],
                            antonyms: ['Trust', 'Certainty']
                        }
                    },
                    {
                        q: 'What is the meaning of Toll?',
                        options: ['Prize (इनाम)', 'Fee/Count (शुल्क/संख्या)', 'Game (खेल)', 'Speed (गति)'],
                        answer: 'Fee/Count (शुल्क/संख्या)',
                        explanation: {
                            word: 'Toll',
                            hindi: 'शुल्क/संख्या',
                            partOfSpeech: 'Noun',
                            meaning: '1. Fee: Money paid to use a bridge or road. 2. Count: The number of deaths or casualties from an accident or disaster.',
                            sentence: '(Fee) Stuti\'s father stopped the car to pay the toll at the highway gate. (Count) The death toll from the earthquake was very high, which made everyone sad.',
                            synonyms: ['Tax', 'Tally'],
                            antonyms: ['Free entry']
                        }
                    }
                ]
            },
            10: {
                name: 'Advanced Words',
                icon: '🎓',
                questions: [
                    {
                        q: 'What is the meaning of Initial?',
                        options: ['Final (अंतिम)', 'Starting/Beginning (शुरुआती)', 'Middle (मध्य)', 'Late (देर से)'],
                        answer: 'Starting/Beginning (शुरुआती)',
                        explanation: {
                            word: 'Initial',
                            hindi: 'शुरुआती',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something that happens at the very beginning.',
                            sentence: 'Ankit faced some initial problems in math, but now he is an expert.',
                            synonyms: ['First', 'Beginning'],
                            antonyms: ['Final', 'Last']
                        }
                    },
                    {
                        q: 'What is the meaning of Accuse?',
                        options: ['Praise (तारीफ करना)', 'Blame/Charge (आरोप लगाना)', 'Save (बचाना)', 'Help (मदद करना)'],
                        answer: 'Blame/Charge (आरोप लगाना)',
                        explanation: {
                            word: 'Accuse',
                            hindi: 'आरोप लगाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To say that someone has done something wrong or illegal.',
                            sentence: 'It is wrong to accuse Hari Kishan of stealing without any proof.',
                            synonyms: ['Blame', 'Charge'],
                            antonyms: ['Defend', 'Praise']
                        }
                    },
                    {
                        q: 'What is the meaning of Delay?',
                        options: ['Hurry (जल्दी)', 'Late/Postpone (देरी/विलंब)', 'Start (शुरू)', 'Win (जीतना)'],
                        answer: 'Late/Postpone (देरी/विलंब)',
                        explanation: {
                            word: 'Delay',
                            hindi: 'देरी/विलंब',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'As a Verb: To make something late or slow. As a Noun: A period of time by which something is late.',
                            sentence: '(Verb) Heavy rain might delay the school bus today. (Noun) Adarsh apologized for the delay in submitting his homework.',
                            synonyms: ['Postpone', 'Lateness'],
                            antonyms: ['Rush', 'Punctuality']
                        }
                    },
                    {
                        q: 'What is the meaning of Accountability?',
                        options: ['Freedom (आजादी)', 'Responsibility/Answerability (जवाबदेही)', 'Silence (चुप्पी)', 'Fear (डर)'],
                        answer: 'Responsibility/Answerability (जवाबदेही)',
                        explanation: {
                            word: 'Accountability',
                            hindi: 'जवाबदेही',
                            partOfSpeech: 'Noun',
                            meaning: 'Being responsible for your actions and willing to explain them.',
                            sentence: 'As the class monitor, Ladli took full accountability for maintaining silence.',
                            synonyms: ['Responsibility', 'Liability'],
                            antonyms: ['Irresponsibility']
                        }
                    },
                    {
                        q: 'What is the meaning of Stammer?',
                        options: ['Shout (चिल्लाना)', 'Speak with pauses (हकलाना)', 'Sing (गाना)', 'Whisper (फुसफुसाना)'],
                        answer: 'Speak with pauses (हकलाना)',
                        explanation: {
                            word: 'Stammer',
                            hindi: 'हकलाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To speak with sudden pauses and a tendency to repeat the initial letters of words.',
                            sentence: 'Aniket Kumar used to stammer when he was nervous, but now he speaks clearly.',
                            synonyms: ['Stutter', 'Hesitate'],
                            antonyms: ['Speak fluently']
                        }
                    },
                    {
                        q: 'What is the meaning of Panic?',
                        options: ['Calmness (शांति)', 'Sudden fear (हड़कंप/घबराहट)', 'Party (दावत)', 'Sleep (नींद)'],
                        answer: 'Sudden fear (हड़कंप/घबराहट)',
                        explanation: {
                            word: 'Panic',
                            hindi: 'हड़कंप/घबराहट',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: A sudden feeling of fear that prevents reasonable thought. As a Verb: To feel sudden uncontrollable fear.',
                            sentence: '(Noun) There was a state of panic when the fire alarm rang. (Verb) "Don\'t panic, it\'s just a small spider," said Shivshant.',
                            synonyms: ['Fear', 'Alarm'],
                            antonyms: ['Calm', 'Confidence']
                        }
                    },
                    {
                        q: 'What is the meaning of Emerge?',
                        options: ['Hide (छिपना)', 'Come out/Appear (प्रकट होना/उभरना)', 'Die (मरना)', 'Fall (गिरना)'],
                        answer: 'Come out/Appear (प्रकट होना/उभरना)',
                        explanation: {
                            word: 'Emerge',
                            hindi: 'प्रकट होना/उभरना',
                            partOfSpeech: 'Verb',
                            meaning: 'To move out of something and become visible.',
                            sentence: 'Divanshi watched the sun emerge from behind the clouds.',
                            synonyms: ['Appear', 'Arise'],
                            antonyms: ['Disappear', 'Vanish']
                        }
                    },
                    {
                        q: 'What is the meaning of State?',
                        options: ['Ask (पूछना)', 'Declare/Condition (बताना/दशा/राज्य)', 'Hide (छिपाना)', 'Walk (चलना)'],
                        answer: 'Declare/Condition (बताना/दशा/राज्य)',
                        explanation: {
                            word: 'State',
                            hindi: 'बताना/दशा/राज्य',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'As a Verb: To say or declare something formally. As a Noun: The condition of someone OR a territory (like UP).',
                            sentence: '(Verb) The teacher asked Sakshi 2 to state her reason for being late. (Noun) Water is in a liquid state.',
                            synonyms: ['Declare', 'Condition'],
                            antonyms: ['Conceal']
                        }
                    },
                    {
                        q: 'What is the meaning of Squeeze?',
                        options: ['Pull (खींचना)', 'Press firmly (दबाना/निचोड़ना)', 'Throw (फेंकना)', 'Drop (गिराना)'],
                        answer: 'Press firmly (दबाना/निचोड़ना)',
                        explanation: {
                            word: 'Squeeze',
                            hindi: 'दबाना/निचोड़ना',
                            partOfSpeech: 'Verb',
                            meaning: 'To firmly press something, usually with your fingers or hands.',
                            sentence: 'Vipin helped his mother squeeze lemons to make juice.',
                            synonyms: ['Press', 'Crush'],
                            antonyms: ['Release', 'Expand']
                        }
                    },
                    {
                        q: 'What is the meaning of Ceremony?',
                        options: ['Fight (लड़ाई)', 'Formal event/Function (समारोह)', 'Game (खेल)', 'Accident (दुर्घटना)'],
                        answer: 'Formal event/Function (समारोह)',
                        explanation: {
                            word: 'Ceremony',
                            hindi: 'समारोह',
                            partOfSpeech: 'Noun',
                            meaning: 'A formal religious or public occasion, typically celebrating a particular event.',
                            sentence: 'Madhu wore a new dress for the prize distribution ceremony.',
                            synonyms: ['Function', 'Event'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Purpose?',
                        options: ['Mistake (गलती)', 'Aim/Goal (उद्देश्य)', 'Joke (मजाक)', 'Dream (सपना)'],
                        answer: 'Aim/Goal (उद्देश्य)',
                        explanation: {
                            word: 'Purpose',
                            hindi: 'उद्देश्य',
                            partOfSpeech: 'Noun',
                            meaning: 'The reason for which something is done or created; an aim or goal.',
                            sentence: 'The main purpose of this class is to help Kishan learn English.',
                            synonyms: ['Goal', 'Objective'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Adamant?',
                        options: ['Flexible (लचीला)', 'Stubborn/Firm (जिद्दी/अडिग)', 'Weak (कमजोर)', 'Happy (खुश)'],
                        answer: 'Stubborn/Firm (जिद्दी/अडिग)',
                        explanation: {
                            word: 'Adamant',
                            hindi: 'जिद्दी/अडिग',
                            partOfSpeech: 'Adjective',
                            meaning: 'Someone who refuses to change their mind or be persuaded.',
                            sentence: 'Anshika was adamant that she would finish the puzzle without any help.',
                            synonyms: ['Stubborn', 'Rigid'],
                            antonyms: ['Flexible', 'Agreeable']
                        }
                    },
                    {
                        q: 'What is the meaning of Allegedly?',
                        options: ['Surely (पक्का)', 'Supposedly/Reportedly (कथित तौर पर)', 'Never (कभी नहीं)', 'Slowly (धीरे)'],
                        answer: 'Supposedly/Reportedly (कथित तौर पर)',
                        explanation: {
                            word: 'Allegedly',
                            hindi: 'कथित तौर पर',
                            partOfSpeech: 'Adverb',
                            meaning: 'Used to convey that something is claimed to be true although there is no proof yet.',
                            sentence: 'The man allegedly stole the bicycle, but Shivansh wasn\'t sure if it was true.',
                            synonyms: ['Supposedly', 'Reportedly'],
                            antonyms: ['Definitely', 'Proven']
                        }
                    },
                    {
                        q: 'What is the meaning of Ritual?',
                        options: ['Habit (आदत)', 'Religious custom (रस्म/धार्मिक संस्कार)', 'Law (कानून)', 'Game (खेल)'],
                        answer: 'Religious custom (रस्म/धार्मिक संस्कार)',
                        explanation: {
                            word: 'Ritual',
                            hindi: 'रस्म/धार्मिक संस्कार',
                            partOfSpeech: 'Noun',
                            meaning: 'A religious or solemn ceremony consisting of a series of actions performed according to a prescribed order.',
                            sentence: 'Lighting a lamp in the evening is a daily ritual in Yash\'s house.',
                            synonyms: ['Ceremony', 'Custom'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Intervention?',
                        options: ['Ignoring (अनदेखा करना)', 'Interference/Involvement (हस्तक्षेप)', 'Leaving (छोड़ना)', 'Running (दौड़ना)'],
                        answer: 'Interference/Involvement (हस्तक्षेप)',
                        explanation: {
                            word: 'Intervention',
                            hindi: 'हस्तक्षेप',
                            partOfSpeech: 'Noun',
                            meaning: 'The action of becoming intentionally involved in a difficult situation to improve it or prevent it from getting worse.',
                            sentence: 'The teacher\'s timely intervention stopped the fight between the two boys, allowing Stuti to study in peace.',
                            synonyms: ['Involvement', 'Interference'],
                            antonyms: ['Ignoring', 'Non-interference']
                        }
                    }
                ]
            },
            11: {
                name: 'Culture & Society',
                icon: '🏛️',
                questions: [
                    {
                        q: 'What is the meaning of Express?',
                        options: ['Hide (छिपाना)', 'Convey/Show (व्यक्त करना)', 'Sleep (सोना)', 'Buy (खरीदना)'],
                        answer: 'Convey/Show (व्यक्त करना)',
                        explanation: {
                            word: 'Express',
                            hindi: 'व्यक्त करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To show your feelings, thoughts, or ideas to others.',
                            sentence: 'Shivansh wrote a letter to express his thanks to the teacher.',
                            synonyms: ['Convey', 'Show'],
                            antonyms: ['Hide', 'Conceal']
                        }
                    },
                    {
                        q: 'What is the meaning of Injury?',
                        options: ['Health (स्वास्थ्य)', 'Hurt/Wound (चोट)', 'Prize (इनाम)', 'Game (खेल)'],
                        answer: 'Hurt/Wound (चोट)',
                        explanation: {
                            word: 'Injury',
                            hindi: 'चोट',
                            partOfSpeech: 'Noun',
                            meaning: 'Physical harm or damage to the body.',
                            sentence: 'Yash had a leg injury, so he could not play cricket today.',
                            synonyms: ['Wound', 'Harm'],
                            antonyms: ['Healing', 'Cure']
                        }
                    },
                    {
                        q: 'What is the meaning of Wreak Havoc?',
                        options: ['Build (बनाना)', 'Cause destruction (तबाही मचाना)', 'Help (मदद करना)', 'Silence (शांति)'],
                        answer: 'Cause destruction (तबाही मचाना)',
                        explanation: {
                            word: 'Wreak Havoc',
                            hindi: 'तबाही मचाना',
                            partOfSpeech: 'Phrase',
                            meaning: 'To cause a lot of damage, destruction, or confusion.',
                            sentence: 'The heavy rain will wreak havoc on the farmers\' crops, Stuti worried.',
                            synonyms: ['Damage', 'Destroy'],
                            antonyms: ['Fix', 'Restore']
                        }
                    },
                    {
                        q: 'What is the meaning of Chaos?',
                        options: ['Order (व्यवस्था)', 'Total confusion (अव्यवस्था/गड़बड़ी)', 'Silence (शांति)', 'Line (पंक्ति)'],
                        answer: 'Total confusion (अव्यवस्था/गड़बड़ी)',
                        explanation: {
                            word: 'Chaos',
                            hindi: 'अव्यवस्था/गड़बड़ी',
                            partOfSpeech: 'Noun',
                            meaning: 'A state of complete confusion and disorder.',
                            sentence: 'There was total chaos in the market when the bull started running, said Sakshi 1.',
                            synonyms: ['Disorder', 'Confusion'],
                            antonyms: ['Order', 'Calm']
                        }
                    },
                    {
                        q: 'What is the meaning of Procession?',
                        options: ['Meeting (सभा)', 'Parade/March (जुलूस/रैली)', 'Alone (अकेला)', 'Study (पढ़ाई)'],
                        answer: 'Parade/March (जुलूस/रैली)',
                        explanation: {
                            word: 'Procession',
                            hindi: 'जुलूस/रैली',
                            partOfSpeech: 'Noun',
                            meaning: 'A line of people or vehicles moving forward as part of a ceremony or festival.',
                            sentence: 'Sunil watched the wedding procession pass by his house with music and dance.',
                            synonyms: ['Parade', 'March'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Recite?',
                        options: ['Write (लिखना)', 'Repeat aloud/Chant (सुनाना/जपना)', 'Forget (भूलना)', 'Run (दौड़ना)'],
                        answer: 'Repeat aloud/Chant (सुनाना/जपना)',
                        explanation: {
                            word: 'Recite',
                            hindi: 'सुनाना/जपना',
                            partOfSpeech: 'Verb',
                            meaning: 'To repeat something aloud from memory (like a poem) or to chant prayers.',
                            sentence: 'The teacher asked Palak to recite the poem in front of the class.',
                            synonyms: ['Chant', 'Repeat'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Venue?',
                        options: ['Time (समय)', 'Place of event (कार्यक्रम का स्थान)', 'Food (भोजन)', 'Person (व्यक्ति)'],
                        answer: 'Place of event (कार्यक्रम का स्थान)',
                        explanation: {
                            word: 'Venue',
                            hindi: 'कार्यक्रम का स्थान',
                            partOfSpeech: 'Noun',
                            meaning: 'The place where an organized event (like a match, concert, or wedding) happens.',
                            sentence: 'Anurag reached the venue early to get a good seat for the show.',
                            synonyms: ['Location', 'Site'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Shrine?',
                        options: ['Market (बाजार)', 'Holy place (मंदिर/पवित्र स्थान)', 'School (विद्यालय)', 'Forest (जंगल)'],
                        answer: 'Holy place (मंदिर/पवित्र स्थान)',
                        explanation: {
                            word: 'Shrine',
                            hindi: 'मंदिर/पवित्र स्थान',
                            partOfSpeech: 'Noun',
                            meaning: 'A holy place dedicated to a specific deity, ancestor, or hero.',
                            sentence: 'Suraj visited the famous shrine to offer flowers and pray.',
                            synonyms: ['Temple', 'Holy place'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Disguise?',
                        options: ['Reveal (दिखाना)', 'Change appearance/Mask (भेष बदलना)', 'Shout (चिल्लाना)', 'Sleep (सोना)'],
                        answer: 'Change appearance/Mask (भेष बदलना)',
                        explanation: {
                            word: 'Disguise',
                            hindi: 'भेष बदलना',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'To change your appearance so no one recognizes you.',
                            sentence: 'Khushboo wore a beard as a disguise for the school play.',
                            synonyms: ['Mask', 'Camouflage'],
                            antonyms: ['Reveal', 'Unmask']
                        }
                    },
                    {
                        q: 'What is the meaning of Visit?',
                        options: ['Ignore (अनदेखा करना)', 'Go to see (मिलने जाना)', 'Hate (नफरत करना)', 'Break (तोड़ना)'],
                        answer: 'Go to see (मिलने जाना)',
                        explanation: {
                            word: 'Visit',
                            hindi: 'मिलने जाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To go to see a person or a place for a period of time.',
                            sentence: 'Vivek plans to visit his grandmother in the village this Sunday.',
                            synonyms: ['Call on', 'Go to'],
                            antonyms: ['Ignore', 'Avoid']
                        }
                    },
                    {
                        q: 'What is the meaning of Refuse?',
                        options: ['Accept (स्वीकार करना)', 'Deny/Reject (इनकार/अस्वीकार करना)', 'Take (लेना)', 'Agree (सहमत होना)'],
                        answer: 'Deny/Reject (इनकार/अस्वीकार करना)',
                        explanation: {
                            word: 'Refuse',
                            hindi: 'इनकार/अस्वीकार करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To say no to a request or offer.',
                            sentence: 'Anshit had to refuse the ice cream because he had a cold.',
                            synonyms: ['Reject', 'Decline'],
                            antonyms: ['Accept', 'Agree']
                        }
                    },
                    {
                        q: 'What is the meaning of Eventually?',
                        options: ['Never (कभी नहीं)', 'Finally/In the end (अंततः)', 'Quickly (जल्दी)', 'Firstly (सबसे पहले)'],
                        answer: 'Finally/In the end (अंततः)',
                        explanation: {
                            word: 'Eventually',
                            hindi: 'अंततः',
                            partOfSpeech: 'Adverb',
                            meaning: 'In the end, especially after a long delay or series of problems.',
                            sentence: 'After trying for hours, Anshika eventually solved the hard math problem.',
                            synonyms: ['Finally', 'Ultimately'],
                            antonyms: ['Immediately', 'Never']
                        }
                    },
                    {
                        q: 'What is the meaning of Mock?',
                        options: ['Respect (आदर करना)', 'Tease/Fake (मजाक उड़ाना/दिखावटी)', 'Help (मदद करना)', 'Real (असली)'],
                        answer: 'Tease/Fake (मजाक उड़ाना/दिखावटी)',
                        explanation: {
                            word: 'Mock',
                            hindi: 'मजाक उड़ाना/दिखावटी',
                            partOfSpeech: 'Verb/Adjective',
                            meaning: 'As a Verb: To tease or laugh at someone in an unkind way. As an Adjective: Not real; for practice (e.g., Mock Test).',
                            sentence: '(Verb) "Do not mock others for their mistakes," the teacher told Anchal. (Adjective) Anchal scored full marks in the mock exam.',
                            synonyms: ['Tease', 'Fake'],
                            antonyms: ['Praise', 'Real']
                        }
                    },
                    {
                        q: 'What is the meaning of Bribe?',
                        options: ['Salary (वेतन)', 'Illegal payment (घूस/रिश्वत)', 'Fine (जुर्माना)', 'Tax (कर)'],
                        answer: 'Illegal payment (घूस/रिश्वत)',
                        explanation: {
                            word: 'Bribe',
                            hindi: 'घूस/रिश्वत',
                            partOfSpeech: 'Noun',
                            meaning: 'Money or a gift given illegally to persuade someone to do something for you.',
                            sentence: 'Divansh knows that offering a bribe to a police officer is a crime.',
                            synonyms: ['Payoff', 'Kickback'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Dereliction?',
                        options: ['Duty (कर्तव्य)', 'Neglect of duty (कर्तव्य का त्याग)', 'Promotion (तरक्की)', 'Success (सफलता)'],
                        answer: 'Neglect of duty (कर्तव्य का त्याग)',
                        explanation: {
                            word: 'Dereliction',
                            hindi: 'कर्तव्य का त्याग',
                            partOfSpeech: 'Noun',
                            meaning: 'The shameful failure to fulfill one\'s obligations or duties.',
                            sentence: 'The guard was punished for dereliction of duty because he slept while working, Suraj Yadav learned.',
                            synonyms: ['Negligence', 'Failure'],
                            antonyms: ['Diligence', 'Care']
                        }
                    }
                ]
            },
            12: {
                name: 'Actions & Conflicts',
                icon: '⚔️',
                questions: [
                    {
                        q: 'What is the meaning of Clash?',
                        options: ['Hug (गले मिलना)', 'Conflict/Fight (टकराव/लड़ाई)', 'Distance (दूरी)', 'Silence (शांति)'],
                        answer: 'Conflict/Fight (टकराव/लड़ाई)',
                        explanation: {
                            word: 'Clash',
                            hindi: 'टकराव/लड़ाई',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'A violent confrontation or a strong disagreement.',
                            sentence: 'There was a violent clash between the two groups in the market, Ankit reported.',
                            synonyms: ['Conflict', 'Fight'],
                            antonyms: ['Agreement', 'Harmony']
                        }
                    },
                    {
                        q: 'What is the meaning of Escalate?',
                        options: ['Decrease (घटना)', 'Increase rapidly (आगे बढ़ जाना/तेज होना)', 'Stop (रुकना)', 'Sleep (सोना)'],
                        answer: 'Increase rapidly (आगे बढ़ जाना/तेज होना)',
                        explanation: {
                            word: 'Escalate',
                            hindi: 'आगे बढ़ जाना/तेज होना',
                            partOfSpeech: 'Verb',
                            meaning: 'To increase rapidly or become more intense/serious.',
                            sentence: 'The small argument between friends started to escalate into a big fight, so Hari Kishan stopped it.',
                            synonyms: ['Intensify', 'Rise'],
                            antonyms: ['Decrease', 'De-escalate']
                        }
                    },
                    {
                        q: 'What is the meaning of Dissatisfaction?',
                        options: ['Happiness (खुशी)', 'Discontent/Unhappiness (असंतोष)', 'Hunger (भूख)', 'Sleep (नींद)'],
                        answer: 'Discontent/Unhappiness (असंतोष)',
                        explanation: {
                            word: 'Dissatisfaction',
                            hindi: 'असंतोष',
                            partOfSpeech: 'Noun',
                            meaning: 'The feeling of being unhappy or not satisfied with something.',
                            sentence: 'Adarsh expressed his dissatisfaction with the cold food served at the restaurant.',
                            synonyms: ['Discontent', 'Displeasure'],
                            antonyms: ['Satisfaction', 'Contentment']
                        }
                    },
                    {
                        q: 'What is the meaning of Etiquette?',
                        options: ['Rudeness (अशिष्टता)', 'Manners/Polite behavior (तरीका/शिष्टाचार)', 'Clothes (कपड़े)', 'Food (खाना)'],
                        answer: 'Manners/Polite behavior (तरीका/शिष्टाचार)',
                        explanation: {
                            word: 'Etiquette',
                            hindi: 'तरीका/शिष्टाचार',
                            partOfSpeech: 'Noun',
                            meaning: 'The customary code of polite behavior in society.',
                            sentence: 'Ladli learned proper dining etiquette, like not talking with her mouth full.',
                            synonyms: ['Manners', 'Protocol'],
                            antonyms: ['Rudeness', 'Bad manners']
                        }
                    },
                    {
                        q: 'What is the meaning of Attempt?',
                        options: ['Give up (हार मानना)', 'Try/Effort (कोशिश)', 'Win (जीतना)', 'Lose (हारना)'],
                        answer: 'Try/Effort (कोशिश)',
                        explanation: {
                            word: 'Attempt',
                            hindi: 'कोशिश',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'To try to do something, especially something difficult.',
                            sentence: 'Aniket Kumar made a sincere attempt to solve the puzzle.',
                            synonyms: ['Try', 'Effort'],
                            antonyms: ['Give up', 'Surrender']
                        }
                    },
                    {
                        q: 'What is the meaning of Occur?',
                        options: ['Stop (रुकना)', 'Happen (घटित होना)', 'Plan (योजना)', 'Hide (छिपना)'],
                        answer: 'Happen (घटित होना)',
                        explanation: {
                            word: 'Occur',
                            hindi: 'घटित होना',
                            partOfSpeech: 'Verb',
                            meaning: 'To happen or take place.',
                            sentence: 'The accident did not occur because Shivshant was driving carefully.',
                            synonyms: ['Happen', 'Take place'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Wanted?',
                        options: ['Hated (नफरत करना)', 'Desired/Searched for (ढूंढना/चाहना)', 'Forgotten (भूला हुआ)', 'Broken (टूटा हुआ)'],
                        answer: 'Desired/Searched for (ढूंढना/चाहना)',
                        explanation: {
                            word: 'Wanted',
                            hindi: 'ढूंढना/चाहना',
                            partOfSpeech: 'Adjective/Verb',
                            meaning: 'Being searched for by police OR desired.',
                            sentence: 'The police put up posters of the wanted thief, Divanshi saw.',
                            synonyms: ['Desired', 'Sought after'],
                            antonyms: ['Unwanted', 'Ignored']
                        }
                    },
                    {
                        q: 'What is the meaning of Reveal?',
                        options: ['Hide (छिपाना)', 'Show/Make known (राज खोलना/सामने लाना)', 'Cover (ढकना)', 'Sleep (सोना)'],
                        answer: 'Show/Make known (राज खोलना/सामने लाना)',
                        explanation: {
                            word: 'Reveal',
                            hindi: 'राज खोलना/सामने लाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To make previously unknown or secret information known to others.',
                            sentence: 'Sakshi 2 promised not to reveal the secret surprise to anyone.',
                            synonyms: ['Disclose', 'Show'],
                            antonyms: ['Hide', 'Conceal']
                        }
                    },
                    {
                        q: 'What is the meaning of Serve?',
                        options: ['Eat (खाना)', 'Work for/Help (सेवा करना)', 'Sleep (सोना)', 'Buy (खरीदना)'],
                        answer: 'Work for/Help (सेवा करना)',
                        explanation: {
                            word: 'Serve',
                            hindi: 'सेवा करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To perform duties or services for another person or an organization.',
                            sentence: 'Vipin wants to join the army to serve his country.',
                            synonyms: ['Assist', 'Help'],
                            antonyms: ['Command', 'Rule']
                        }
                    },
                    {
                        q: 'What is the meaning of Extort?',
                        options: ['Donate (दान देना)', 'Forcefully take money (पैसे ऐंठना)', 'Gift (उपहार देना)', 'Save (बचाना)'],
                        answer: 'Forcefully take money (पैसे ऐंठना)',
                        explanation: {
                            word: 'Extort',
                            hindi: 'पैसे ऐंठना',
                            partOfSpeech: 'Verb',
                            meaning: 'To obtain something (usually money) by force, threats, or unfair means.',
                            sentence: 'The gang tried to extort money from the shopkeeper, but Madhu called the police.',
                            synonyms: ['Blackmail', 'Force'],
                            antonyms: ['Offer', 'Give']
                        }
                    },
                    {
                        q: 'What is the meaning of Spirit?',
                        options: ['Body (शरीर)', 'Soul/Ghost (आत्मा)', 'Stone (पत्थर)', 'Tree (पेड़)'],
                        answer: 'Soul/Ghost (आत्मा)',
                        explanation: {
                            word: 'Spirit',
                            hindi: 'आत्मा',
                            partOfSpeech: 'Noun',
                            meaning: 'The non-physical part of a person (soul) or a supernatural being (ghost).',
                            sentence: 'Kishan listened to a scary story about a wandering spirit.',
                            synonyms: ['Soul', 'Ghost'],
                            antonyms: ['Body', 'Flesh']
                        }
                    },
                    {
                        q: 'What is the meaning of Flee?',
                        options: ['Stay (रुकना)', 'Run away (भाग जाना)', 'Fight (लड़ना)', 'Sleep (सोना)'],
                        answer: 'Run away (भाग जाना)',
                        explanation: {
                            word: 'Flee',
                            hindi: 'भाग जाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To run away from a place or situation of danger.',
                            sentence: 'The thief tried to flee when he saw the police, but Anshika spotted him.',
                            synonyms: ['Escape', 'Run away'],
                            antonyms: ['Stay', 'Remain']
                        }
                    },
                    {
                        q: 'What is the meaning of Cure?',
                        options: ['Disease (बीमारी)', 'Heal/Treatment (इलाज करना)', 'Hurt (चोट पहुंचाना)', 'Break (तोड़ना)'],
                        answer: 'Heal/Treatment (इलाज करना)',
                        explanation: {
                            word: 'Cure',
                            hindi: 'इलाज करना',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'To relieve a person of the symptoms of a disease or condition.',
                            sentence: 'Doctors are working hard to find a cure for the new virus, Shivansh read.',
                            synonyms: ['Heal', 'Treat'],
                            antonyms: ['Infect', 'Injure']
                        }
                    },
                    {
                        q: 'What is the meaning of Several?',
                        options: ['One (एक)', 'Many/Some (कई सारे)', 'None (कोई नहीं)', 'All (सभी)'],
                        answer: 'Many/Some (कई सारे)',
                        explanation: {
                            word: 'Several',
                            hindi: 'कई सारे',
                            partOfSpeech: 'Adjective',
                            meaning: 'More than two but not many.',
                            sentence: 'Yash has several books in his bag to read.',
                            synonyms: ['Various', 'Many'],
                            antonyms: ['Few', 'None']
                        }
                    },
                    {
                        q: 'What is the meaning of Blacksmith?',
                        options: ['Carpenter (बढ़ई)', 'Iron worker (लुहार)', 'Gold worker (सुनार)', 'Farmer (किसान)'],
                        answer: 'Iron worker (लुहार)',
                        explanation: {
                            word: 'Blacksmith',
                            hindi: 'लुहार',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who makes and repairs things in iron by hand.',
                            sentence: 'Stuti watched the blacksmith making a tool from hot iron.',
                            synonyms: ['Ironworker'],
                            antonyms: []
                        }
                    }
                ]
            },
            13: {
                name: 'Life & Law',
                icon: '⚖️',
                questions: [
                    {
                        q: 'What is the meaning of Tragic?',
                        options: ['Funny (मजेदार)', 'Very sad/Disastrous (दर्दनाक/दुखद)', 'Happy (खुश)', 'Long (लंबा)'],
                        answer: 'Very sad/Disastrous (दर्दनाक/दुखद)',
                        explanation: {
                            word: 'Tragic',
                            hindi: 'दर्दनाक/दुखद',
                            partOfSpeech: 'Adjective',
                            meaning: 'An event that causes great sadness, often involving death or suffering.',
                            sentence: 'The tragic accident on the highway made Ankit very sad.',
                            synonyms: ['Heartbreaking', 'Disastrous'],
                            antonyms: ['Comic', 'Happy']
                        }
                    },
                    {
                        q: 'What is the meaning of Circumstances?',
                        options: ['Circle (गोला)', 'Situation/Conditions (हालात/परिस्थिति)', 'Result (परिणाम)', 'Weather (मौसम)'],
                        answer: 'Situation/Conditions (हालात/परिस्थिति)',
                        explanation: {
                            word: 'Circumstances',
                            hindi: 'हालात/परिस्थिति',
                            partOfSpeech: 'Noun',
                            meaning: 'The conditions or facts connected with an event or situation.',
                            sentence: 'Due to poor financial circumstances, Hari Kishan had to work while studying.',
                            synonyms: ['Situation', 'Conditions'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Suffocate?',
                        options: ['Breathe (सांस लेना)', 'Choke/Unable to breathe (दम घुटना)', 'Swim (तैरना)', 'Eat (खाना)'],
                        answer: 'Choke/Unable to breathe (दम घुटना)',
                        explanation: {
                            word: 'Suffocate',
                            hindi: 'दम घुटना',
                            partOfSpeech: 'Verb',
                            meaning: 'To die or cause to die from lack of air or unable to breathe.',
                            sentence: 'The thick smoke made Adarsh cough and almost suffocate.',
                            synonyms: ['Choke', 'Smother'],
                            antonyms: ['Breathe']
                        }
                    },
                    {
                        q: 'What is the meaning of Combat?',
                        options: ['Peace (शांति)', 'Fight/Battle (लड़ाई/युद्ध)', 'Talk (बात करना)', 'Dance (नाचना)'],
                        answer: 'Fight/Battle (लड़ाई/युद्ध)',
                        explanation: {
                            word: 'Combat',
                            hindi: 'लड़ाई/युद्ध',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Fighting between armed forces or to fight against something.',
                            sentence: 'Soldiers are trained for combat to protect the country, Ladli learned.',
                            synonyms: ['Battle', 'Conflict'],
                            antonyms: ['Peace', 'Harmony']
                        }
                    },
                    {
                        q: 'What is the meaning of Shameful?',
                        options: ['Proud (गर्वित)', 'Disgraceful/Bad (शर्मनाक)', 'Good (अच्छा)', 'Brave (बहादुर)'],
                        answer: 'Disgraceful/Bad (शर्मनाक)',
                        explanation: {
                            word: 'Shameful',
                            hindi: 'शर्मनाक',
                            partOfSpeech: 'Adjective',
                            meaning: 'Actions that are bad and cause a feeling of shame or disgrace.',
                            sentence: 'It is shameful to cheat in exams, the teacher told Aniket Kumar.',
                            synonyms: ['Disgraceful', 'Embarrassing'],
                            antonyms: ['Honorable', 'Proud']
                        }
                    },
                    {
                        q: 'What is the meaning of Intoxicate?',
                        options: ['Drink water (पानी पीना)', 'Make drunk/Poison (नशा करना/जहर देना)', 'Sleep (सोना)', 'Run (दौड़ना)'],
                        answer: 'Make drunk/Poison (नशा करना/जहर देना)',
                        explanation: {
                            word: 'Intoxicate',
                            hindi: 'नशा करना/जहर देना',
                            partOfSpeech: 'Verb',
                            meaning: 'To cause someone to lose control of their faculties (usually by alcohol or drugs).',
                            sentence: 'Drinking alcohol can intoxicate a person and make them fall, warned Shivshant.',
                            synonyms: ['Inebriate', 'Drunken'],
                            antonyms: ['Sober']
                        }
                    },
                    {
                        q: 'What is the meaning of Coach?',
                        options: ['Engine (इंजन)', 'Train carriage (रेल का डिब्बा)', 'Ticket (टिकट)', 'Station (स्टेशन)'],
                        answer: 'Train carriage (रेल का डिब्बा)',
                        explanation: {
                            word: 'Coach',
                            hindi: 'रेल का डिब्बा',
                            partOfSpeech: 'Noun',
                            meaning: 'A railway carriage or wagon. (Note: It also means a sports trainer).',
                            sentence: 'Divanshi sat in the third coach of the train near the window.',
                            synonyms: ['Carriage', 'Compartment'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Committed?',
                        options: ['Forgot (भूल गया)', 'Did/Performed (कर डाला/किया)', 'Slept (सोया)', 'Ran (दौड़ा)'],
                        answer: 'Did/Performed (कर डाला/किया)',
                        explanation: {
                            word: 'Committed',
                            hindi: 'कर डाला/किया',
                            partOfSpeech: 'Verb',
                            meaning: 'Carrying out a mistake, crime, or immoral act.',
                            sentence: 'The thief admitted he had committed the robbery, Sakshi 2 read in the paper.',
                            synonyms: ['Performed', 'Perpetrated'],
                            antonyms: ['Abstained', 'Stopped']
                        }
                    },
                    {
                        q: 'What is the meaning of Custody?',
                        options: ['Freedom (आजादी)', 'Detention/Care (हिरासत/निगरानी)', 'School (विद्यालय)', 'Home (घर)'],
                        answer: 'Detention/Care (हिरासत/निगरानी)',
                        explanation: {
                            word: 'Custody',
                            hindi: 'हिरासत/निगरानी',
                            partOfSpeech: 'Noun',
                            meaning: 'The protective care of someone or imprisonment (police custody).',
                            sentence: 'The police took the suspect into custody for questioning, Vipin observed.',
                            synonyms: ['Detention', 'Guardianship'],
                            antonyms: ['Freedom', 'Liberty']
                        }
                    },
                    {
                        q: 'What is the meaning of Judicial?',
                        options: ['Medical (चिकित्सीय)', 'Legal/Court related (न्यायिक/अदालती)', 'Personal (व्यक्तिगत)', 'Sports (खेल)'],
                        answer: 'Legal/Court related (न्यायिक/अदालती)',
                        explanation: {
                            word: 'Judicial',
                            hindi: 'न्यायिक/अदालती',
                            partOfSpeech: 'Adjective',
                            meaning: 'Relates to the administration of justice, judges, or courts.',
                            sentence: 'The judge ordered a judicial inquiry into the case, said Madhu.',
                            synonyms: ['Legal', 'Courtly'],
                            antonyms: ['Illegal']
                        }
                    },
                    {
                        q: 'What is the meaning of Worse?',
                        options: ['Good (अच्छा)', 'More bad/Poorer (और बुरा/बेकार)', 'Best (सबसे अच्छा)', 'Same (वही)'],
                        answer: 'More bad/Poorer (और बुरा/बेकार)',
                        explanation: {
                            word: 'Worse',
                            hindi: 'और बुरा/बेकार',
                            partOfSpeech: 'Adjective',
                            meaning: 'The comparative form of bad; of poorer quality or lower standard.',
                            sentence: 'The weather became worse in the evening with heavy rain, forcing Kishan to stay home.',
                            synonyms: ['Poorer', 'Inferior'],
                            antonyms: ['Better', 'Improved']
                        }
                    },
                    {
                        q: 'What is the meaning of Declare?',
                        options: ['Hide (छिपाना)', 'Announce (घोषित करना)', 'Ask (पूछना)', 'Buy (खरीदना)'],
                        answer: 'Announce (घोषित करना)',
                        explanation: {
                            word: 'Declare',
                            hindi: 'घोषित करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To say something in a solemn and emphatic manner.',
                            sentence: 'The principal will declare the exam results tomorrow, Anshika told her friends.',
                            synonyms: ['Announce', 'Proclaim'],
                            antonyms: ['Conceal', 'Hide']
                        }
                    },
                    {
                        q: 'What is the meaning of Urge?',
                        options: ['Stop (रोकना)', 'Request strongly/Advise (आग्रह करना/कहना)', 'Hate (नफरत करना)', 'Sleep (सोना)'],
                        answer: 'Request strongly/Advise (आग्रह करना/कहना)',
                        explanation: {
                            word: 'Urge',
                            hindi: 'आग्रह करना/कहना',
                            partOfSpeech: 'Verb',
                            meaning: 'To try earnestly or persistently to persuade someone to do something.',
                            sentence: 'Teachers always urge students to study daily, Shivansh recalled.',
                            synonyms: ['Encourage', 'Advise'],
                            antonyms: ['Discourage', 'Deter']
                        }
                    },
                    {
                        q: 'What is the meaning of Rapid?',
                        options: ['Slow (धीमा)', 'Fast/Quick (तेज/तीव्र)', 'Lazy (आलसी)', 'Old (पुराना)'],
                        answer: 'Fast/Quick (तेज/तीव्र)',
                        explanation: {
                            word: 'Rapid',
                            hindi: 'तेज/तीव्र',
                            partOfSpeech: 'Adjective',
                            meaning: 'Happening in a short time or at a fast speed.',
                            sentence: 'Yash made rapid progress in learning English this month.',
                            synonyms: ['Fast', 'Quick'],
                            antonyms: ['Slow', 'Gradual']
                        }
                    },
                    {
                        q: 'What is the meaning of Migration?',
                        options: ['Sleeping (सोना)', 'Moving to another place (प्रवास/पलायन)', 'Eating (खाना)', 'Playing (खेलना)'],
                        answer: 'Moving to another place (प्रवास/पलायन)',
                        explanation: {
                            word: 'Migration',
                            hindi: 'प्रवास/पलायन',
                            partOfSpeech: 'Noun',
                            meaning: 'The movement of people or animals from one place to another.',
                            sentence: 'The migration of workers to the city is common, noted Stuti.',
                            synonyms: ['Relocation', 'Movement'],
                            antonyms: ['Staying', 'Settlement']
                        }
                    }
                ]
            },
            14: {
                name: 'Work & Society',
                icon: '👔',
                questions: [
                    {
                        q: 'What is the meaning of Sack?',
                        options: ['Hire (नौकरी देना)', 'Dismiss/Fire (बर्खास्त करना)', 'Promote (तरक्की देना)', 'Train (सिखाना)'],
                        answer: 'Dismiss/Fire (बर्खास्त करना)',
                        explanation: {
                            word: 'Sack',
                            hindi: 'बर्खास्त करना',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'As a Verb: To dismiss someone from a job. As a Noun: A large bag made of strong material.',
                            sentence: 'The manager threatened to sack the lazy worker, Ankit heard.',
                            synonyms: ['Dismiss', 'Fire'],
                            antonyms: ['Hire', 'Employ']
                        }
                    },
                    {
                        q: 'What is the meaning of Trade?',
                        options: ['Fight (लड़ाई)', 'Business/Commerce (व्यापार)', 'Gift (उपहार)', 'Game (खेल)'],
                        answer: 'Business/Commerce (व्यापार)',
                        explanation: {
                            word: 'Trade',
                            hindi: 'व्यापार',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Buying and selling goods and services.',
                            sentence: 'Hari Kishan wants to learn the trade of carpentry from his father.',
                            synonyms: ['Business', 'Commerce'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Illicit?',
                        options: ['Legal (कानूनी)', 'Illegal/Unlawful (अवैध)', 'Open (खुला)', 'Good (अच्छा)'],
                        answer: 'Illegal/Unlawful (अवैध)',
                        explanation: {
                            word: 'Illicit',
                            hindi: 'अवैध',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something forbidden by law, rules, or custom.',
                            sentence: 'The police arrested the men for selling illicit liquor, Adarsh read in the news.',
                            synonyms: ['Illegal', 'Unlawful'],
                            antonyms: ['Legal', 'Lawful']
                        }
                    },
                    {
                        q: 'What is the meaning of Preside?',
                        options: ['Follow (पीछा करना)', 'Lead/Head a meeting (अध्यक्षता करना)', 'Sleep (सोना)', 'Leave (छोड़ना)'],
                        answer: 'Lead/Head a meeting (अध्यक्षता करना)',
                        explanation: {
                            word: 'Preside',
                            hindi: 'अध्यक्षता करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To be in the position of authority in a meeting or gathering.',
                            sentence: 'The Principal will preside over the school\'s annual function, said Ladli.',
                            synonyms: ['Chair', 'Lead'],
                            antonyms: ['Follow']
                        }
                    },
                    {
                        q: 'What is the meaning of Involvement?',
                        options: ['Separation (अलगाव)', 'Participation/Inclusion (शामिल होना)', 'Silence (चुप्पी)', 'Hatred (नफरत)'],
                        answer: 'Participation/Inclusion (शामिल होना)',
                        explanation: {
                            word: 'Involvement',
                            hindi: 'शामिल होना',
                            partOfSpeech: 'Noun',
                            meaning: 'The fact or condition of being involved with or participating in something.',
                            sentence: 'Aniket Kumar\'s active involvement in sports helped him stay fit.',
                            synonyms: ['Participation', 'Connection'],
                            antonyms: ['Exclusion']
                        }
                    },
                    {
                        q: 'What is the meaning of Stringent?',
                        options: ['Easy (आसान)', 'Strict/Severe (कठोर/सख्त)', 'Soft (नरम)', 'Fake (नकली)'],
                        answer: 'Strict/Severe (कठोर/सख्त)',
                        explanation: {
                            word: 'Stringent',
                            hindi: 'कठोर/सख्त',
                            partOfSpeech: 'Adjective',
                            meaning: 'Regulations, requirements, or conditions that are very strict.',
                            sentence: 'The school has stringent rules about wearing the correct uniform, Shivshant warned.',
                            synonyms: ['Strict', 'Rigid'],
                            antonyms: ['Lenient', 'Flexible']
                        }
                    },
                    {
                        q: 'What is the meaning of Inevitable?',
                        options: ['Avoidable (बचा जा सकने वाला)', 'Unavoidable/Certain (अनिवार्य/तय)', 'Impossible (असंभव)', 'Rare (दुर्लभ)'],
                        answer: 'Unavoidable/Certain (अनिवार्य/तय)',
                        explanation: {
                            word: 'Inevitable',
                            hindi: 'अनिवार्य/तय',
                            partOfSpeech: 'Adjective',
                            meaning: 'Certain to happen; unavoidable.',
                            sentence: 'It was inevitable that Divanshi would win the race because she practiced so hard.',
                            synonyms: ['Unavoidable', 'Certain'],
                            antonyms: ['Avoidable', 'Uncertain']
                        }
                    },
                    {
                        q: 'What is the meaning of Fuel?',
                        options: ['Water (पानी)', 'Energy source/Encourage (ईंधन/बढ़ावा देना)', 'Stone (पत्थर)', 'Ice (बर्फ)'],
                        answer: 'Energy source/Encourage (ईंधन/बढ़ावा देना)',
                        explanation: {
                            word: 'Fuel',
                            hindi: 'ईंधन/बढ़ावा देना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: Material burned to produce heat. As a Verb: To supply with fuel or to stimulate something.',
                            sentence: 'Sakshi 2\'s father stopped at the pump to put fuel in the car.',
                            synonyms: ['Energy', 'Stimulate'],
                            antonyms: ['Extinguish']
                        }
                    },
                    {
                        q: 'What is the meaning of Criticise?',
                        options: ['Praise (तारीफ करना)', 'Find fault/Blame (आलोचना/निंदा करना)', 'Support (समर्थन करना)', 'Ignore (अनदेखा करना)'],
                        answer: 'Find fault/Blame (आलोचना/निंदा करना)',
                        explanation: {
                            word: 'Criticise',
                            hindi: 'आलोचना/निंदा करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To indicate the faults of someone or something in a disapproving way.',
                            sentence: 'It is easy to criticise, but hard to do the work yourself, said Vipin.',
                            synonyms: ['Blame', 'Condemn'],
                            antonyms: ['Praise', 'Commend']
                        }
                    },
                    {
                        q: 'What is the meaning of Foster?',
                        options: ['Destroy (नष्ट करना)', 'Encourage/Care for (लालन-पालन करना/बढ़ावा देना)', 'Hide (छिपाना)', 'Break (तोड़ना)'],
                        answer: 'Encourage/Care for (लालन-पालन करना/बढ़ावा देना)',
                        explanation: {
                            word: 'Foster',
                            hindi: 'लालन-पालन करना/बढ़ावा देना',
                            partOfSpeech: 'Verb',
                            meaning: 'To encourage the development of something or to bring up a child that is not one\'s own by birth.',
                            sentence: 'The teacher tries to foster a love for reading in all her students, including Madhu.',
                            synonyms: ['Nurture', 'Promote'],
                            antonyms: ['Neglect', 'Hinder']
                        }
                    },
                    {
                        q: 'What is the meaning of Abduct?',
                        options: ['Release (छोड़ना)', 'Kidnap (अपहरण करना)', 'Help (मदद करना)', 'Teach (पढ़ाना)'],
                        answer: 'Kidnap (अपहरण करना)',
                        explanation: {
                            word: 'Abduct',
                            hindi: 'अपहरण करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To take someone away illegally by force or deception; kidnap.',
                            sentence: 'The villain tried to abduct the hero\'s sister in the movie Kishan watched.',
                            synonyms: ['Kidnap', 'Seize'],
                            antonyms: ['Release', 'Free']
                        }
                    },
                    {
                        q: 'What is the meaning of Offender?',
                        options: ['Police (पुलिस)', 'Criminal/Guilty person (दोषी/अपराधी)', 'Victim (पीड़ित)', 'Lawyer (वकील)'],
                        answer: 'Criminal/Guilty person (दोषी/अपराधी)',
                        explanation: {
                            word: 'Offender',
                            hindi: 'दोषी/अपराधी',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who commits an illegal act.',
                            sentence: 'The police caught the traffic offender who jumped the red light, Anshika saw.',
                            synonyms: ['Criminal', 'Culprit'],
                            antonyms: ['Innocent', 'Law-abider']
                        }
                    },
                    {
                        q: 'What is the meaning of Stray?',
                        options: ['Pet (पालतू)', 'Homeless/Wanderer (आवारा/भटका हुआ)', 'Rich (अमीर)', 'Smart (होशियार)'],
                        answer: 'Homeless/Wanderer (आवारा/भटका हुआ)',
                        explanation: {
                            word: 'Stray',
                            hindi: 'आवारा/भटका हुआ',
                            partOfSpeech: 'Adjective/Verb',
                            meaning: 'A domestic animal without a home or to move away from the right place.',
                            sentence: 'Shivansh gave some milk to the stray dog near his house.',
                            synonyms: ['Homeless', 'Wandering'],
                            antonyms: ['Home', 'Pet']
                        }
                    },
                    {
                        q: 'What is the meaning of Cop?',
                        options: ['Doctor (डॉक्टर)', 'Police officer (पुलिस)', 'Thief (चोर)', 'Judge (न्यायाधीश)'],
                        answer: 'Police officer (पुलिस)',
                        explanation: {
                            word: 'Cop',
                            hindi: 'पुलिस',
                            partOfSpeech: 'Noun',
                            meaning: 'A police officer (informal).',
                            sentence: 'Yash wants to become a tough cop when he grows up.',
                            synonyms: ['Police officer', 'Constable'],
                            antonyms: ['Criminal']
                        }
                    },
                    {
                        q: 'What is the meaning of Activist?',
                        options: ['Actor (अभिनेता)', 'Campaigner (कार्यकर्ता)', 'Sleeper (सोने वाला)', 'Driver (चालक)'],
                        answer: 'Campaigner (कार्यकर्ता)',
                        explanation: {
                            word: 'Activist',
                            hindi: 'कार्यकर्ता',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who campaigns to bring about political or social change.',
                            sentence: 'The social activist fought for clean water in Stuti\'s village.',
                            synonyms: ['Campaigner', 'Reformer'],
                            antonyms: []
                        }
                    }
                ]
            },
            15: {
                name: 'Growth & Action',
                icon: '🚀',
                questions: [
                    {
                        q: 'What is the meaning of Hospitality?',
                        options: ['Hospital work (अस्पताल का काम)', 'Guest care/Warm welcome (मेहमान-नवाजी)', 'Treatment (इलाज)', 'Hostel (छात्रवास)'],
                        answer: 'Guest care/Warm welcome (मेहमान-नवाजी)',
                        explanation: {
                            word: 'Hospitality',
                            hindi: 'मेहमान-नवाजी',
                            partOfSpeech: 'Noun',
                            meaning: 'The friendly and generous reception and entertainment of guests or strangers.',
                            sentence: 'Ankit was praised for his warm hospitality when guests visited his home.',
                            synonyms: ['Welcome', 'Friendliness'],
                            antonyms: ['Rudeness', 'Hostility']
                        }
                    },
                    {
                        q: 'What is the meaning of Urban?',
                        options: ['Village (गाँव)', 'City-related (शहरी)', 'Jungle (जंगल)', 'Old (पुराना)'],
                        answer: 'City-related (शहरी)',
                        explanation: {
                            word: 'Urban',
                            hindi: 'शहरी',
                            partOfSpeech: 'Adjective',
                            meaning: 'Relates to a city or town (opposite of rural/village).',
                            sentence: 'Hari Kishan moved from his village to an urban area for better studies.',
                            synonyms: ['City', 'Metropolitan'],
                            antonyms: ['Rural', 'Village']
                        }
                    },
                    {
                        q: 'What is the meaning of Undergo?',
                        options: ['Go under (नीचे जाना)', 'Experience/Go through (गुजरना/सहना)', 'Stop (रुकना)', 'Play (खेलना)'],
                        answer: 'Experience/Go through (गुजरना/सहना)',
                        explanation: {
                            word: 'Undergo',
                            hindi: 'गुजरना/सहना',
                            partOfSpeech: 'Verb',
                            meaning: 'To experience or be subjected to something, typically something difficult or painful.',
                            sentence: 'Adarsh had to undergo a surgery to fix his broken leg.',
                            synonyms: ['Experience', 'Endure'],
                            antonyms: ['Avoid', 'Escape']
                        }
                    },
                    {
                        q: 'What is the meaning of Significant?',
                        options: ['Tiny (छोटा)', 'Important/Meaningful (महत्वपूर्ण)', 'Useless (बेकार)', 'Silent (शांत)'],
                        answer: 'Important/Meaningful (महत्वपूर्ण)',
                        explanation: {
                            word: 'Significant',
                            hindi: 'महत्वपूर्ण',
                            partOfSpeech: 'Adjective',
                            meaning: 'Sufficiently great or important to be worthy of attention.',
                            sentence: 'There was a significant improvement in Ladli\'s marks after she started studying daily.',
                            synonyms: ['Important', 'Major'],
                            antonyms: ['Insignificant', 'Minor']
                        }
                    },
                    {
                        q: 'What is the meaning of Objective?',
                        options: ['Object (वस्तु)', 'Goal/Aim (उद्देश्य)', 'Obstacle (बाधा)', 'Game (खेल)'],
                        answer: 'Goal/Aim (उद्देश्य)',
                        explanation: {
                            word: 'Objective',
                            hindi: 'उद्देश्य',
                            partOfSpeech: 'Noun',
                            meaning: 'A goal or aim that you are trying to achieve.',
                            sentence: 'The main objective of Aniket Kumar is to join the Indian Army.',
                            synonyms: ['Goal', 'Target'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Emphasize?',
                        options: ['Ignore (अनदेखा करना)', 'Stress/Give importance (जोर देना)', 'Whisper (फुसफुसाना)', 'Hide (छिपाना)'],
                        answer: 'Stress/Give importance (जोर देना)',
                        explanation: {
                            word: 'Emphasize',
                            hindi: 'जोर देना',
                            partOfSpeech: 'Verb',
                            meaning: 'To give special importance or prominence to something in speaking or writing.',
                            sentence: 'The teacher tried to emphasize the importance of grammar to Shivshant.',
                            synonyms: ['Highlight', 'Stress'],
                            antonyms: ['Ignore', 'Understate']
                        }
                    },
                    {
                        q: 'What is the meaning of Mutual?',
                        options: ['Alone (अकेला)', 'Shared/Common (आपसी/साझा)', 'Separate (अलग)', 'New (नया)'],
                        answer: 'Shared/Common (आपसी/साझा)',
                        explanation: {
                            word: 'Mutual',
                            hindi: 'आपसी/साझा',
                            partOfSpeech: 'Adjective',
                            meaning: 'A feeling or action experienced by two or more people equally.',
                            sentence: 'Divanshi and her friend have mutual respect for each other.',
                            synonyms: ['Shared', 'Reciprocal'],
                            antonyms: ['One-sided', 'Individual']
                        }
                    },
                    {
                        q: 'What is the meaning of Coordination?',
                        options: ['Fighting (लड़ाई)', 'Working together (तालमेल/मिल-जुल कर काम करना)', 'Dancing (नाचना)', 'Running (दौड़ना)'],
                        answer: 'Working together (तालमेल/मिल-जुल कर काम करना)',
                        explanation: {
                            word: 'Coordination',
                            hindi: 'तालमेल',
                            partOfSpeech: 'Noun',
                            meaning: 'The organization of different people or things so that they work together effectively.',
                            sentence: 'The team won the match because of good coordination between Sakshi 2 and the other players.',
                            synonyms: ['Cooperation', 'Teamwork'],
                            antonyms: ['Confusion', 'Discord']
                        }
                    },
                    {
                        q: 'What is the meaning of Eradicate?',
                        options: ['Plant (लगाना)', 'Destroy completely (जड़ से खत्म करना)', 'Build (बनाना)', 'Keep (रखना)'],
                        answer: 'Destroy completely (जड़ से खत्म करना)',
                        explanation: {
                            word: 'Eradicate',
                            hindi: 'जड़ से खत्म करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To destroy or get rid of something completely (like a disease or bad habit).',
                            sentence: 'The government is trying to eradicate polio from the country, Vipin learned.',
                            synonyms: ['Eliminate', 'Wipe out'],
                            antonyms: ['Create', 'Establish']
                        }
                    },
                    {
                        q: 'What is the meaning of Poach?',
                        options: ['Cook (पकाना)', 'Hunt illegally (अवैध शिकार करना)', 'Feed (खिलाना)', 'Buy (खरीदना)'],
                        answer: 'Hunt illegally (अवैध शिकार करना)',
                        explanation: {
                            word: 'Poach',
                            hindi: 'अवैध शिकार करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To hunt or catch animals illegally on someone else\'s land. (Also means to cook an egg).',
                            sentence: 'The forest guards arrested the men trying to poach tigers, Madhu read.',
                            synonyms: ['Hunt illegally', 'Steal'],
                            antonyms: ['Protect', 'Conserve']
                        }
                    },
                    {
                        q: 'What is the meaning of Poke?',
                        options: ['Pull (खींचना)', 'Jab/Prod (कोचना/चुभाना)', 'Stroke (सहलाना)', 'Hit (मारना)'],
                        answer: 'Jab/Prod (कोचना/चुभाना)',
                        explanation: {
                            word: 'Poke',
                            hindi: 'कोचना/चुभाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To prod or push someone or something with a finger or a sharp object.',
                            sentence: 'Kishan used a stick to poke the fire to make it burn brighter.',
                            synonyms: ['Jab', 'Prod'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Gore?',
                        options: ['Eat (खाना)', 'Pierce with horn (सींग घुसाना)', 'Run (दौड़ना)', 'Jump (कूदना)'],
                        answer: 'Pierce with horn (सींग घुसाना)',
                        explanation: {
                            word: 'Gore',
                            hindi: 'सींग घुसाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To pierce or stab someone with a horn or tusk (usually done by an animal like a bull).',
                            sentence: 'The angry bull tried to gore the matador, scaring Anshika.',
                            synonyms: ['Pierce', 'Stab'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Giant?',
                        options: ['Small (छोटा)', 'Huge/Very large (विशाल/राक्षस)', 'Weak (कमजोर)', 'Fast (तेज)'],
                        answer: 'Huge/Very large (विशाल/राक्षस)',
                        explanation: {
                            word: 'Giant',
                            hindi: 'विशाल/राक्षस',
                            partOfSpeech: 'Noun/Adjective',
                            meaning: 'A person or thing of unusually great size or power.',
                            sentence: 'Shivansh saw a giant statue of Lord Shiva during his trip.',
                            synonyms: ['Huge', 'Colossal'],
                            antonyms: ['Tiny', 'Dwarf']
                        }
                    },
                    {
                        q: 'What is the meaning of Deranged?',
                        options: ['Smart (होशियार)', 'Mad/Insane (सिर-फिरा/पागल)', 'Calm (शांत)', 'Healthy (स्वस्थ)'],
                        answer: 'Mad/Insane (सिर-फिरा/पागल)',
                        explanation: {
                            word: 'Deranged',
                            hindi: 'सिर-फिरा/पागल',
                            partOfSpeech: 'Adjective',
                            meaning: 'Someone who is mad or mentally unstable.',
                            sentence: 'The deranged man was shouting at the empty street, so Yash stayed away.',
                            synonyms: ['Insane', 'Crazy'],
                            antonyms: ['Sane', 'Rational']
                        }
                    },
                    {
                        q: 'What is the meaning of Execute?',
                        options: ['Plan (योजना बनाना)', 'Perform OR Kill (करना/फांसी देना)', 'Fail (असफल होना)', 'Sleep (सोना)'],
                        answer: 'Perform OR Kill (करना/फांसी देना)',
                        explanation: {
                            word: 'Execute',
                            hindi: 'करना/फांसी देना',
                            partOfSpeech: 'Verb',
                            meaning: 'To carry out or perform a plan. Also: To kill someone as a legal punishment.',
                            sentence: 'Stuti helped her team execute the project plan perfectly.',
                            synonyms: ['Perform', 'Put to death'],
                            antonyms: ['Abandon', 'Pardon']
                        }
                    }
                ]
            },
            16: {
                name: 'Law & Justice',
                icon: '⚖️',
                questions: [
                    {
                        q: 'What is the meaning of Possession?',
                        options: ['Ghost (भूत)', 'Ownership/Control (कब्जा/अधिकार)', 'Position (स्थिति)', 'Gift (उपहार)'],
                        answer: 'Ownership/Control (कब्जा/अधिकार)',
                        explanation: {
                            word: 'Possession',
                            hindi: 'कब्जा/अधिकार',
                            partOfSpeech: 'Noun',
                            meaning: 'The state of having, owning, or controlling something.',
                            sentence: 'The police recovered the stolen jewelry from the thief\'s possession, Ankit read.',
                            synonyms: ['Ownership', 'Custody'],
                            antonyms: ['Loss', 'Lacking']
                        }
                    },
                    {
                        q: 'What is the meaning of Cow Vigilante?',
                        options: ['Farmer (किसान)', 'Cow protector (गौ रक्षक)', 'Doctor (चिकित्सक)', 'Thief (चोर)'],
                        answer: 'Cow protector (गौ रक्षक)',
                        explanation: {
                            word: 'Cow Vigilante',
                            hindi: 'गौ रक्षक',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who takes the law into their own hands to protect cows (often illegally).',
                            sentence: 'Hari Kishan watched a news debate about the actions of a cow vigilante group.',
                            synonyms: ['Cow protector'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Vigilante?',
                        options: ['Soldier (सैनिक)', 'Self-appointed guard (रखवाली करने वाला/स्वयं-सेवक)', 'Police (पुलिस)', 'Judge (न्यायाधीश)'],
                        answer: 'Self-appointed guard (रखवाली करने वाला/स्वयं-सेवक)',
                        explanation: {
                            word: 'Vigilante',
                            hindi: 'रखवाली करने वाला/स्वयं-सेवक',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who tries to stop crime or punish criminals without having legal authority (like a superhero).',
                            sentence: 'Adarsh thought Batman was a cool vigilante, but in real life, we need police.',
                            synonyms: ['Watchman', 'Avenger'],
                            antonyms: ['Police officer']
                        }
                    },
                    {
                        q: 'What is the meaning of Evidence?',
                        options: ['Rumor (अफवाह)', 'Proof/Facts (सबूत)', 'Lie (झूठ)', 'Story (कहानी)'],
                        answer: 'Proof/Facts (सबूत)',
                        explanation: {
                            word: 'Evidence',
                            hindi: 'सबूत',
                            partOfSpeech: 'Noun',
                            meaning: 'The available facts or information indicating whether a belief is true (proof).',
                            sentence: 'Ladli showed the teacher the video as evidence that she did not break the glass.',
                            synonyms: ['Proof', 'Confirmation'],
                            antonyms: ['Disproof', 'Denial']
                        }
                    },
                    {
                        q: 'What is the meaning of Link?',
                        options: ['Break (तोड़ना)', 'Connect/Join (जोड़ना/संपर्क)', 'Separate (अलग करना)', 'Run (दौड़ना)'],
                        answer: 'Connect/Join (जोड़ना/संपर्क)',
                        explanation: {
                            word: 'Link',
                            hindi: 'जोड़ना/संपर्क',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'To connect two things or a relationship between two things.',
                            sentence: 'Police are trying to link the suspect to the crime scene, Aniket Kumar explained.',
                            synonyms: ['Connect', 'Join'],
                            antonyms: ['Separate', 'Disconnect']
                        }
                    },
                    {
                        q: 'What is the meaning of Impartial?',
                        options: ['Biased (पक्षपाती)', 'Fair/Unbiased (निष्पक्ष)', 'Angry (गुस्सा)', 'Part-time (अंशकालिक)'],
                        answer: 'Fair/Unbiased (निष्पक्ष)',
                        explanation: {
                            word: 'Impartial',
                            hindi: 'निष्पक्ष',
                            partOfSpeech: 'Adjective',
                            meaning: 'Treating all rivals or disputants equally; fair and just.',
                            sentence: 'A cricket umpire must be impartial to both teams, said Shivshant.',
                            synonyms: ['Unbiased', 'Neutral'],
                            antonyms: ['Biased', 'Partial']
                        }
                    },
                    {
                        q: 'What is the meaning of Intercept?',
                        options: ['Allow (अनुमति देना)', 'Stop/Catch midway (रोकना/बीच में पकड़ना)', 'Send (भेजना)', 'Sleep (सोना)'],
                        answer: 'Stop/Catch midway (रोकना/बीच में पकड़ना)',
                        explanation: {
                            word: 'Intercept',
                            hindi: 'रोकना/बीच में पकड़ना',
                            partOfSpeech: 'Verb',
                            meaning: 'To stop or catch someone or something that is going from one place to another.',
                            sentence: 'Divanshi jumped to intercept the ball before it reached the goal.',
                            synonyms: ['Stop', 'Block'],
                            antonyms: ['Allow', 'Release']
                        }
                    },
                    {
                        q: 'What is the meaning of Routinely?',
                        options: ['Rarely (शायद ही कभी)', 'Regularly (नियमित रूप से)', 'Never (कभी नहीं)', 'Quickly (जल्दी)'],
                        answer: 'Regularly (नियमित रूप से)',
                        explanation: {
                            word: 'Routinely',
                            hindi: 'नियमित रूप से',
                            partOfSpeech: 'Adverb',
                            meaning: 'Doing something as a part of a regular procedure or habit.',
                            sentence: 'Sakshi 2 routinely wakes up at 6 AM to study.',
                            synonyms: ['Regularly', 'Habitually'],
                            antonyms: ['Rarely', 'Occasionally']
                        }
                    },
                    {
                        q: 'What is the meaning of Harass?',
                        options: ['Help (मदद करना)', 'Trouble/Bother (परेशान करना/उत्पीड़न)', 'Please (खुश करना)', 'Ignore (अनदेखा करना)'],
                        answer: 'Trouble/Bother (परेशान करना/उत्पीड़न)',
                        explanation: {
                            word: 'Harass',
                            hindi: 'परेशान करना/उत्पीड़न',
                            partOfSpeech: 'Verb',
                            meaning: 'To trouble, annoy, or disturb someone repeatedly.',
                            sentence: 'It is a crime to harass anyone on the street, Vipin told his younger brother.',
                            synonyms: ['Bother', 'Pester'],
                            antonyms: ['Assist', 'Comfort']
                        }
                    },
                    {
                        q: 'What is the meaning of Chase?',
                        options: ['Wait (इंतजार करना)', 'Run after/Pursue (पीछा करना)', 'Lead (नेतृत्व करना)', 'Hide (छिपना)'],
                        answer: 'Run after/Pursue (पीछा करना)',
                        explanation: {
                            word: 'Chase',
                            hindi: 'पीछा करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To run after someone or something in order to catch them.',
                            sentence: 'Madhu laughed watching the dog chase its own tail.',
                            synonyms: ['Pursue', 'Follow'],
                            antonyms: ['Flee', 'Escape']
                        }
                    },
                    {
                        q: 'What is the meaning of Humiliate?',
                        options: ['Respect (आदर करना)', 'Insult/Disgrace (निरादर करना/नीचा दिखाना)', 'Praise (तारीफ करना)', 'Help (मदद करना)'],
                        answer: 'Insult/Disgrace (निरादर करना/नीचा दिखाना)',
                        explanation: {
                            word: 'Humiliate',
                            hindi: 'निरादर करना/नीचा दिखाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To make someone feel ashamed or foolish, especially publicly.',
                            sentence: 'The rude man tried to humiliate the waiter, but Kishan stood up for him.',
                            synonyms: ['Insult', 'Embarrass'],
                            antonyms: ['Honor', 'Respect']
                        }
                    },
                    {
                        q: 'What is the meaning of Fairly?',
                        options: ['Badly (बुरी तरह)', 'Justly/Honestly (न्यायपूर्वक)', 'Quickly (जल्दी)', 'Wrongly (गलत तरीके से)'],
                        answer: 'Justly/Honestly (न्यायपूर्वक)',
                        explanation: {
                            word: 'Fairly',
                            hindi: 'न्यायपूर्वक',
                            partOfSpeech: 'Adverb',
                            meaning: 'In a way that is honest, just, or reasonable.',
                            sentence: 'The teacher treated all students fairly, giving marks only for correct answers, said Anshika.',
                            synonyms: ['Honestly', 'Justly'],
                            antonyms: ['Unfairly', 'Biasedly']
                        }
                    },
                    {
                        q: 'What is the meaning of Via?',
                        options: ['Without (बिना)', 'Through/By way of (के द्वारा/के जरिए)', 'Against (खिलाफ)', 'Before (पहले)'],
                        answer: 'Through/By way of (के द्वारा/के जरिए)',
                        explanation: {
                            word: 'Via',
                            hindi: 'के द्वारा/के जरिए',
                            partOfSpeech: 'Preposition',
                            meaning: 'Traveling through a place en route to a destination.',
                            sentence: 'Shivansh sent the photo to his friend via WhatsApp.',
                            synonyms: ['Through', 'By means of'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Tout?',
                        options: ['Hide (छिपाना)', 'Promote/Praise (प्रचारित करना/दलाली करना)', 'Criticise (आलोचना करना)', 'Break (तोड़ना)'],
                        answer: 'Promote/Praise (प्रचारित करना/दलाली करना)',
                        explanation: {
                            word: 'Tout',
                            hindi: 'प्रचारित करना/दलाली करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To attempt to sell something, typically by pestering people, or to praise something energetically.',
                            sentence: 'The company tried to tout their new cream as a miracle cure, Yash noticed.',
                            synonyms: ['Promote', 'Praise'],
                            antonyms: ['Criticise', 'Discourage']
                        }
                    },
                    {
                        q: 'What is the meaning of Deceased?',
                        options: ['Sick (बीमार)', 'Dead person (मृतक/जो मर गया हो)', 'Alive (जीवित)', 'Lost (खोया हुआ)'],
                        answer: 'Dead person (मृतक/जो मर गया हो)',
                        explanation: {
                            word: 'Deceased',
                            hindi: 'मृतक/जो मर गया हो',
                            partOfSpeech: 'Adjective/Noun',
                            meaning: 'A person who has recently died.',
                            sentence: 'The family prayed for the peace of the deceased soul, said Stuti.',
                            synonyms: ['Dead', 'Departed'],
                            antonyms: ['Living', 'Alive']
                        }
                    }
                ]
            },
            17: {
                name: 'Life & Nature',
                icon: '🌿',
                questions: [
                    {
                        q: 'What is the meaning of Lethal?',
                        options: ['Safe (सुरक्षित)', 'Deadly/Fatal (घातक/जानलेवा)', 'Soft (मुलायम)', 'Alive (जीवित)'],
                        answer: 'Deadly/Fatal (घातक/जानलेवा)',
                        explanation: {
                            word: 'Lethal',
                            hindi: 'घातक/जानलेवा',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something dangerous enough to cause death.',
                            sentence: 'The snake\'s poison is lethal, so Ankit stayed far away from it.',
                            synonyms: ['Deadly', 'Fatal'],
                            antonyms: ['Harmless', 'Safe']
                        }
                    },
                    {
                        q: 'What is the meaning of Aggrieved?',
                        options: ['Happy (खुश)', 'Hurt/Upset (आहत/दुखी)', 'Sleeping (सोया हुआ)', 'Late (देर से)'],
                        answer: 'Hurt/Upset (आहत/दुखी)',
                        explanation: {
                            word: 'Aggrieved',
                            hindi: 'आहत/दुखी',
                            partOfSpeech: 'Adjective',
                            meaning: 'A feeling of resentment because one has been treated unfairly.',
                            sentence: 'Hari Kishan felt aggrieved when he was punished for a mistake he didn\'t make.',
                            synonyms: ['Resentful', 'Wronged'],
                            antonyms: ['Pleased', 'Satisfied']
                        }
                    },
                    {
                        q: 'What is the meaning of Wrap?',
                        options: ['Open (खोलना)', 'Cover/Enclose (लपेटना)', 'Break (तोड़ना)', 'Cut (काटना)'],
                        answer: 'Cover/Enclose (लपेटना)',
                        explanation: {
                            word: 'Wrap',
                            hindi: 'लपेटना',
                            partOfSpeech: 'Verb',
                            meaning: 'To cover or enclose something in paper or soft material.',
                            sentence: 'Adarsh helped his sister wrap the birthday gift with colorful paper.',
                            synonyms: ['Cover', 'Enclose'],
                            antonyms: ['Unwrap', 'Reveal']
                        }
                    },
                    {
                        q: 'What is the meaning of Quilt?',
                        options: ['Pillow (तकिया)', 'Thick blanket (रजाई)', 'Sheet (चादर)', 'Coat (कोट)'],
                        answer: 'Thick blanket (रजाई)',
                        explanation: {
                            word: 'Quilt',
                            hindi: 'रजाई',
                            partOfSpeech: 'Noun',
                            meaning: 'A warm bed covering made of padding enclosed between layers of fabric.',
                            sentence: 'Ladli pulled the warm quilt over herself on the cold winter night.',
                            synonyms: ['Duvet', 'Blanket'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Drought?',
                        options: ['Flood (बाढ़)', 'Dry spell/No rain (सूखा)', 'Storm (तूफान)', 'Rain (बारिश)'],
                        answer: 'Dry spell/No rain (सूखा)',
                        explanation: {
                            word: 'Drought',
                            hindi: 'सूखा',
                            partOfSpeech: 'Noun',
                            meaning: 'A prolonged period of abnormally low rainfall, leading to a shortage of water.',
                            sentence: 'The farmers were worried because the drought was destroying their crops, noted Aniket Kumar.',
                            synonyms: ['Dryness', 'Aridity'],
                            antonyms: ['Flood', 'Deluge']
                        }
                    },
                    {
                        q: 'What is the meaning of Dessert?',
                        options: ['Sand (रेत)', 'Sweet dish (मिठाई/मीठा)', 'Soup (सूप)', 'Main meal (मुख्य भोजन)'],
                        answer: 'Sweet dish (मिठाई/मीठा)',
                        explanation: {
                            word: 'Dessert',
                            hindi: 'मिठाई/मीठा',
                            partOfSpeech: 'Noun',
                            meaning: 'The sweet course eaten at the end of a meal (like ice cream or kheer).',
                            sentence: 'Shivshant loves to eat gulab jamun for dessert after dinner.',
                            synonyms: ['Sweet', 'Pudding'],
                            antonyms: ['Starter', 'Appetizer']
                        }
                    },
                    {
                        q: 'What is the meaning of Desertification?',
                        options: ['Gardening (बागवानी)', 'Becoming desert (मरुस्थलीकरण)', 'Raining (बारिश होना)', 'Building (निर्माण)'],
                        answer: 'Becoming desert (मरुस्थलीकरण)',
                        explanation: {
                            word: 'Desertification',
                            hindi: 'मरुस्थलीकरण',
                            partOfSpeech: 'Noun',
                            meaning: 'The process by which fertile land becomes desert, usually due to drought or deforestation.',
                            sentence: 'Divanshi learned that cutting too many trees can lead to desertification.',
                            synonyms: ['Land degradation'],
                            antonyms: ['Reforestation']
                        }
                    },
                    {
                        q: 'What is the meaning of Pancreas?',
                        options: ['Bone (हड्डी)', 'Body organ (अग्न्याशय)', 'Brain (दिमाग)', 'Heart (दिल)'],
                        answer: 'Body organ (अग्न्याशय)',
                        explanation: {
                            word: 'Pancreas',
                            hindi: 'अग्न्याशय',
                            partOfSpeech: 'Noun',
                            meaning: 'A large gland behind the stomach that helps digestion and regulates sugar.',
                            sentence: 'The doctor told Sakshi 2 that the pancreas produces insulin for the body.',
                            synonyms: ['Organ', 'Gland'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Fondness?',
                        options: ['Hatred (नफरत)', 'Liking/Affection (शौक/लगाव)', 'Fear (डर)', 'Anger (गुस्सा)'],
                        answer: 'Liking/Affection (शौक/लगाव)',
                        explanation: {
                            word: 'Fondness',
                            hindi: 'शौक/लगाव',
                            partOfSpeech: 'Noun',
                            meaning: 'Having an affection or liking for someone or something.',
                            sentence: 'Vipin has a great fondness for playing cricket on Sundays.',
                            synonyms: ['Affection', 'Liking'],
                            antonyms: ['Hatred', 'Dislike']
                        }
                    },
                    {
                        q: 'What is the meaning of Passed away?',
                        options: ['Slept (सो गया)', 'Died (गुजर जाना/मर जाना)', 'Left (चला गया)', 'Won (जीत गया)'],
                        answer: 'Died (गुजर जाना/मर जाना)',
                        explanation: {
                            word: 'Passed away',
                            hindi: 'गुजर जाना/मर जाना',
                            partOfSpeech: 'Phrasal Verb',
                            meaning: 'A polite way of saying that someone has died.',
                            sentence: 'Madhu was very sad when her favorite actor passed away.',
                            synonyms: ['Died', 'Expired'],
                            antonyms: ['Born', 'Lived']
                        }
                    },
                    {
                        q: 'What is the meaning of Pass?',
                        options: ['Fail (असफल होना)', 'Succeed/Go across (सफल होना/गुजरना)', 'Stop (रुकना)', 'Fall (गिरना)'],
                        answer: 'Succeed/Go across (सफल होना/गुजरना)',
                        explanation: {
                            word: 'Pass',
                            hindi: 'सफल होना/गुजरना',
                            partOfSpeech: 'Verb',
                            meaning: 'To be successful in a test or to move past something.',
                            sentence: 'Kishan studied very hard to pass the math exam with good marks.',
                            synonyms: ['Succeed', 'Proceed'],
                            antonyms: ['Fail', 'Stop']
                        }
                    },
                    {
                        q: 'What is the meaning of Throat?',
                        options: ['Leg (पैर)', 'Neck passage (गला)', 'Hand (हाथ)', 'Head (सिर)'],
                        answer: 'Neck passage (गला)',
                        explanation: {
                            word: 'Throat',
                            hindi: 'गला',
                            partOfSpeech: 'Noun',
                            meaning: 'The passage that leads from the back of the mouth down to the stomach and lungs.',
                            sentence: 'Anshika drank hot water to soothe her sore throat.',
                            synonyms: ['Gullet', 'Neck'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Despite?',
                        options: ['Because of (के कारण)', 'In spite of (के बावजूद)', 'Before (पहले)', 'After (बाद में)'],
                        answer: 'In spite of (के बावजूद)',
                        explanation: {
                            word: 'Despite',
                            hindi: 'के बावजूद',
                            partOfSpeech: 'Preposition',
                            meaning: 'Without being affected by; in spite of.',
                            sentence: 'Shivansh went to school despite the heavy rain.',
                            synonyms: ['Regardless of', 'In spite of'],
                            antonyms: ['Because of']
                        }
                    },
                    {
                        q: 'What is the meaning of Ward?',
                        options: ['Forest (जंगल)', 'Hospital room/Area (वार्ड/कक्ष)', 'Sky (आसमान)', 'Road (सड़क)'],
                        answer: 'Hospital room/Area (वार्ड/कक्ष)',
                        explanation: {
                            word: 'Ward',
                            hindi: 'वार्ड/कक्ष',
                            partOfSpeech: 'Noun',
                            meaning: 'A separate room in a hospital or an administrative division of a city.',
                            sentence: 'Yash visited his grandfather in the general ward of the hospital.',
                            synonyms: ['Room', 'Section'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Whisper?',
                        options: ['Shout (चिल्लाना)', 'Speak softly (फुसफुसाना)', 'Sing (गाना)', 'Laugh (हंसना)'],
                        answer: 'Speak softly (फुसफुसाना)',
                        explanation: {
                            word: 'Whisper',
                            hindi: 'फुसफुसाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To speak very softly using one\'s breath without using the vocal cords, usually for secrecy.',
                            sentence: 'Stuti leaned closer to whisper the secret answer to her friend.',
                            synonyms: ['Murmur', 'Mumble'],
                            antonyms: ['Shout', 'Scream']
                        }
                    }
                ]
            },
            18: {
                name: 'World & Expression',
                icon: '🌎',
                questions: [
                    {
                        q: 'What is the meaning of Along?',
                        options: ['Against (खिलाफ)', 'Beside/With (के साथ/किनारे)', 'Above (ऊपर)', 'Under (नीचे)'],
                        answer: 'Beside/With (के साथ/किनारे)',
                        explanation: {
                            word: 'Along',
                            hindi: 'के साथ/किनारे',
                            partOfSpeech: 'Preposition',
                            meaning: 'Moving in a constant direction on a path or being in company with others.',
                            sentence: 'Aniket walked along the river bank with his friends.',
                            synonyms: ['Beside', 'By'],
                            antonyms: ['Against', 'Apart']
                        }
                    },
                    {
                        q: 'What is the meaning of Shore?',
                        options: ['Mountain (पहाड़)', 'Coast/Bank (किनारा/तट)', 'Forest (जंगल)', 'Sky (आसमान)'],
                        answer: 'Coast/Bank (किनारा/तट)',
                        explanation: {
                            word: 'Shore',
                            hindi: 'किनारा/तट',
                            partOfSpeech: 'Noun',
                            meaning: 'The land along the edge of a sea, lake, or large river.',
                            sentence: 'Deva sat on the shore and watched the waves.',
                            synonyms: ['Coast', 'Beach'],
                            antonyms: ['Sea', 'Ocean center']
                        }
                    },
                    {
                        q: 'What is the meaning of Observation?',
                        options: ['Ignoring (अनदेखा)', 'Monitoring/Notice (निगरानी/अवलोकन)', 'Sleeping (सोना)', 'Talking (बात करना)'],
                        answer: 'Monitoring/Notice (निगरानी/अवलोकन)',
                        explanation: {
                            word: 'Observation',
                            hindi: 'निगरानी/अवलोकन',
                            partOfSpeech: 'Noun',
                            meaning: 'The action of watching something or someone carefully to gain information.',
                            sentence: 'The scientist kept the experiment under strict observation, Jhanvi noted.',
                            synonyms: ['Inspection', 'Monitoring'],
                            antonyms: ['Neglect', 'Indifference']
                        }
                    },
                    {
                        q: 'What is the meaning of Indeed?',
                        options: ['Never (कभी नहीं)', 'Really/In fact (वास्तव में/सचमुच)', 'Maybe (शायद)', 'False (गलत)'],
                        answer: 'Really/In fact (वास्तव में/सचमुच)',
                        explanation: {
                            word: 'Indeed',
                            hindi: 'वास्तव में/सचमुच',
                            partOfSpeech: 'Adverb',
                            meaning: 'Used to emphasize a statement or confirm something is true.',
                            sentence: '"It is indeed a very hot day," remarked Samriddhi Chaurasiya.',
                            synonyms: ['Certainly', 'Truly'],
                            antonyms: ['Doubtfully']
                        }
                    },
                    {
                        q: 'What is the meaning of Strike?',
                        options: ['Love (प्यार करना)', 'Hit/Surprise (मारना/हैरान करना)', 'Sleep (सोना)', 'Eat (खाना)'],
                        answer: 'Hit/Surprise (मारना/हैरान करना)',
                        explanation: {
                            word: 'Strike',
                            hindi: 'मारना/हैरान करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To hit forcibly OR to affect someone deeply (like a sudden thought or surprise).',
                            sentence: 'Arpit Pal was struck with wonder when he saw the beautiful Taj Mahal.',
                            synonyms: ['Hit', 'Impact', 'Amaze'],
                            antonyms: ['Miss', 'Protect']
                        }
                    },
                    {
                        q: 'What is the meaning of Possess?',
                        options: ['Lose (खोना)', 'Own/Have (पास होना/कब्जा करना)', 'Give (देना)', 'Want (चाहना)'],
                        answer: 'Own/Have (पास होना/कब्जा करना)',
                        explanation: {
                            word: 'Possess',
                            hindi: 'पास होना/कब्जा करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To have or own something.',
                            sentence: 'Kavya does not possess a bicycle yet, but she wants one.',
                            synonyms: ['Own', 'Have'],
                            antonyms: ['Lack', 'Lose']
                        }
                    },
                    {
                        q: 'What is the meaning of Stiff?',
                        options: ['Flexible (लचीला)', 'Hard/Rigid (सख्त/कड़ा)', 'Soft (मुलायम)', 'Liquid (तरल)'],
                        answer: 'Hard/Rigid (सख्त/कड़ा)',
                        explanation: {
                            word: 'Stiff',
                            hindi: 'सख्त/कड़ा',
                            partOfSpeech: 'Adjective',
                            meaning: 'Not easily bent or changed in shape; rigid.',
                            sentence: 'The new shoes were stiff and hurt Muskan\'s feet.',
                            synonyms: ['Rigid', 'Hard'],
                            antonyms: ['Flexible', 'Soft']
                        }
                    },
                    {
                        q: 'What is the meaning of March?',
                        options: ['Sit (बैठना)', 'Walk/Rally (पैदल चलना/जुलूस)', 'Swim (तैरना)', 'Fly (उड़ना)'],
                        answer: 'Walk/Rally (पैदल चलना/जुलूस)',
                        explanation: {
                            word: 'March',
                            hindi: 'पैदल चलना/जुलूस',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'To walk in a military manner or an organized procession (Rally).',
                            sentence: 'Sanjana Nishad participated in the protest march (rally) yesterday.',
                            synonyms: ['Parade', 'Walk'],
                            antonyms: ['Halt', 'Stop']
                        }
                    },
                    {
                        q: 'What is the meaning of Feed?',
                        options: ['Starve (भूखा रखना)', 'Give food (खिलाना)', 'Cook (पकाना)', 'Eat (खाना)'],
                        answer: 'Give food (खिलाना)',
                        explanation: {
                            word: 'Feed',
                            hindi: 'खिलाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To give food to a person or animal.',
                            sentence: 'Anubhav likes to feed the birds on his terrace every morning.',
                            synonyms: ['Nourish', 'Serve'],
                            antonyms: ['Starve']
                        }
                    },
                    {
                        q: 'What is the meaning of Cause?',
                        options: ['Result (परिणाम)', 'Reason/Make happen (वजह/कारण बनना)', 'End (अंत)', 'Stop (रोकना)'],
                        answer: 'Reason/Make happen (वजह/कारण बनना)',
                        explanation: {
                            word: 'Cause',
                            hindi: 'वजह/कारण बनना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: The reason why something happens. As a Verb: To make something happen.',
                            sentence: 'Heavy rain was the cause of the flood, explained Ankit.',
                            synonyms: ['Reason', 'Source'],
                            antonyms: ['Effect', 'Result']
                        }
                    },
                    {
                        q: 'What is the meaning of Utter?',
                        options: ['Listen (सुनना)', 'Speak/Say (बोलना/बड़बड़ाना)', 'Write (लिखना)', 'Read (पढ़ना)'],
                        answer: 'Speak/Say (बोलना/बड़बड़ाना)',
                        explanation: {
                            word: 'Utter',
                            hindi: 'बोलना/बड़बड़ाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To say something aloud or make a sound with your voice.',
                            sentence: 'Hari Kishan was so scared he could not utter a single word.',
                            synonyms: ['Speak', 'Say'],
                            antonyms: ['Silence', 'Mute']
                        }
                    },
                    {
                        q: 'What is the meaning of Pleasant?',
                        options: ['Unhappy (दुखी)', 'Nice/Enjoyable (सुहावना/अच्छा)', 'Ugly (बदसूरत)', 'Angry (गुस्सा)'],
                        answer: 'Nice/Enjoyable (सुहावना/अच्छा)',
                        explanation: {
                            word: 'Pleasant',
                            hindi: 'सुहावना/अच्छा',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something giving a sense of happy satisfaction or enjoyment.',
                            sentence: 'It was a very pleasant evening, so Adarsh went for a walk.',
                            synonyms: ['Nice', 'Delightful'],
                            antonyms: ['Unpleasant', 'Nasty']
                        }
                    },
                    {
                        q: 'What is the meaning of Narrator?',
                        options: ['Listener (श्रोता)', 'Storyteller (कथावाचक)', 'Writer (लेखक)', 'Actor (अभिनेता)'],
                        answer: 'Storyteller (कथावाचक)',
                        explanation: {
                            word: 'Narrator',
                            hindi: 'कथावाचक',
                            partOfSpeech: 'Noun',
                            meaning: 'The person who tells a story (in a book, movie, or play).',
                            sentence: 'Ladli acted as the narrator in the school play.',
                            synonyms: ['Storyteller', 'Speaker'],
                            antonyms: ['Listener']
                        }
                    },
                    {
                        q: 'What is the meaning of Embryo?',
                        options: ['Adult (वयस्क)', 'Unborn baby (भ्रूण)', 'Seed (बीज)', 'Egg (अंडा)'],
                        answer: 'Unborn baby (भ्रूण)',
                        explanation: {
                            word: 'Embryo',
                            hindi: 'भ्रूण',
                            partOfSpeech: 'Noun',
                            meaning: 'An unborn offspring in the process of development (early stage).',
                            sentence: 'Aniket Kumar learned in biology how a seed contains a plant embryo.',
                            synonyms: ['Fetus'],
                            antonyms: ['Adult']
                        }
                    },
                    {
                        q: 'What is the meaning of Stumble?',
                        options: ['Run fast (तेज दौड़ना)', 'Trip/Fall (ठोकर खाना)', 'Jump (कूदना)', 'Stand (खड़े होना)'],
                        answer: 'Trip/Fall (ठोकर खाना)',
                        explanation: {
                            word: 'Stumble',
                            hindi: 'ठोकर खाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To trip or momentarily lose one\'s balance; almost fall.',
                            sentence: 'Shivshant saw the runner stumble but quickly get up and finish the race.',
                            synonyms: ['Trip', 'Slip'],
                            antonyms: ['Stabilize']
                        }
                    }
                ]
            },
            19: {
                name: 'Food & Mind',
                icon: '🍽️',
                questions: [
                    {
                        q: 'What is the meaning of Relish?',
                        options: ['Hate (नफरत)', 'Enjoyment/Taste (स्वाद/मजा लेना)', 'Run (दौड़ना)', 'Sleep (सोना)'],
                        answer: 'Enjoyment/Taste (स्वाद/मजा लेना)',
                        explanation: {
                            word: 'Relish',
                            hindi: 'स्वाद/मजा लेना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: Great enjoyment. As a Verb: To enjoy something greatly.',
                            sentence: 'Aniket ate the mango pickle with great relish.',
                            synonyms: ['Enjoyment', 'Delight'],
                            antonyms: ['Dislike', 'Apathy']
                        }
                    },
                    {
                        q: 'What is the meaning of Appetizing?',
                        options: ['Bad (खराब)', 'Tasty/Delicious (स्वादिष्ट/मजेदार)', 'Ugly (बदसूरत)', 'Boring (उबाऊ)'],
                        answer: 'Tasty/Delicious (स्वादिष्ट/मजेदार)',
                        explanation: {
                            word: 'Appetizing',
                            hindi: 'स्वादिष्ट/मजेदार',
                            partOfSpeech: 'Adjective',
                            meaning: 'Food that looks or smells so good that you want to eat it.',
                            sentence: 'The smell of the cake was so appetizing that Deva felt hungry immediately.',
                            synonyms: ['Delicious', 'Tempting'],
                            antonyms: ['Tasteless', 'Disgusting']
                        }
                    },
                    {
                        q: 'What is the meaning of Wholesome?',
                        options: ['Unhealthy (अस्वस्थ)', 'Healthy/Nutritious (पौष्टिक/हितकारी)', 'Dirty (गंदा)', 'Broken (टूटा हुआ)'],
                        answer: 'Healthy/Nutritious (पौष्टिक/हितकारी)',
                        explanation: {
                            word: 'Wholesome',
                            hindi: 'पौष्टिक/हितकारी',
                            partOfSpeech: 'Adjective',
                            meaning: 'Food that is good for your health or things that are morally good.',
                            sentence: 'Jhanvi prefers eating wholesome home-cooked food over junk food.',
                            synonyms: ['Healthy', 'Nutritious'],
                            antonyms: ['Unhealthy', 'Junk']
                        }
                    },
                    {
                        q: 'What is the meaning of Meal?',
                        options: ['Snack (नाश्ता)', 'Food/Repast (खाना/भोजन)', 'Water (पानी)', 'Plate (थाली)'],
                        answer: 'Food/Repast (खाना/भोजन)',
                        explanation: {
                            word: 'Meal',
                            hindi: 'खाना/भोजन',
                            partOfSpeech: 'Noun',
                            meaning: 'The food eaten on regular occasions (like breakfast, lunch, or dinner).',
                            sentence: 'Samriddhi Chaurasiya invited her friends for a special meal on her birthday.',
                            synonyms: ['Food', 'Feast'],
                            antonyms: ['Starvation']
                        }
                    },
                    {
                        q: 'What is the meaning of Metamorphosis?',
                        options: ['Sleep (नींद)', 'Transformation (कायांतरण/रूप बदलना)', 'Walking (चलना)', 'Eating (खाना)'],
                        answer: 'Transformation (कायांतरण/रूप बदलना)',
                        explanation: {
                            word: 'Metamorphosis',
                            hindi: 'कायांतरण/रूप बदलना',
                            partOfSpeech: 'Noun',
                            meaning: 'A complete change of form (like a caterpillar turning into a butterfly).',
                            sentence: 'Arpit Pal was amazed to learn about the metamorphosis of a butterfly in science class.',
                            synonyms: ['Transformation', 'Change'],
                            antonyms: ['Stagnation']
                        }
                    },
                    {
                        q: 'What is the meaning of Quack?',
                        options: ['Real doctor (असली डॉक्टर)', 'Fake doctor (झोलाछाप डॉक्टर)', 'Teacher (शिक्षक)', 'Pilot (पायलट)'],
                        answer: 'Fake doctor (झोलाछाप डॉक्टर)',
                        explanation: {
                            word: 'Quack',
                            hindi: 'झोलाछाप डॉक्टर',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who dishonestly claims to have medical knowledge (a fake doctor).',
                            sentence: 'The villagers were warned not to take medicine from the quack, noted Kavya.',
                            synonyms: ['Fraud', 'Charlatan'],
                            antonyms: ['Professional', 'Expert']
                        }
                    },
                    {
                        q: 'What is the meaning of Deliberately?',
                        options: ['Accidentally (अनजाने में)', 'Intentionally (जान-बूझकर)', 'Quickly (जल्दी)', 'Slowly (धीरे)'],
                        answer: 'Intentionally (जान-बूझकर)',
                        explanation: {
                            word: 'Deliberately',
                            hindi: 'जान-बूझकर',
                            partOfSpeech: 'Adverb',
                            meaning: 'Doing something on purpose or intentionally.',
                            sentence: 'Muskan deliberately woke up early to study for the exam.',
                            synonyms: ['Intentionally', 'Purposely'],
                            antonyms: ['Accidentally', 'Mistakenly']
                        }
                    },
                    {
                        q: 'What is the meaning of Fatigue?',
                        options: ['Energy (ऊर्जा)', 'Tiredness/Exhaustion (थकान)', 'Strength (ताकत)', 'Speed (गति)'],
                        answer: 'Tiredness/Exhaustion (थकान)',
                        explanation: {
                            word: 'Fatigue',
                            hindi: 'थकान',
                            partOfSpeech: 'Noun',
                            meaning: 'Extreme tiredness resulting from mental or physical exertion.',
                            sentence: 'After playing football for two hours, Sanjana Nishad felt great fatigue.',
                            synonyms: ['Tiredness', 'Exhaustion'],
                            antonyms: ['Energy', 'Vigor']
                        }
                    },
                    {
                        q: 'What is the meaning of Appropriate?',
                        options: ['Wrong (गलत)', 'Suitable/Proper (उचित/सही)', 'Bad (बुरा)', 'Funny (मजाकिया)'],
                        answer: 'Suitable/Proper (उचित/सही)',
                        explanation: {
                            word: 'Appropriate',
                            hindi: 'उचित/सही',
                            partOfSpeech: 'Adjective',
                            meaning: 'Suitable or proper in the circumstances.',
                            sentence: 'Anubhav wore appropriate clothes for the wedding ceremony.',
                            synonyms: ['Suitable', 'Correct'],
                            antonyms: ['Inappropriate', 'Unsuitable']
                        }
                    },
                    {
                        q: 'What is the meaning of Hamlet?',
                        options: ['City (शहर)', 'Small village (छोटा गाँव/पुरवा)', 'Forest (जंगल)', 'Castle (महल)'],
                        answer: 'Small village (छोटा गाँव/पुरवा)',
                        explanation: {
                            word: 'Hamlet',
                            hindi: 'छोटा गाँव/पुरवा',
                            partOfSpeech: 'Noun',
                            meaning: 'A small settlement, generally smaller than a village.',
                            sentence: 'Ankit visited a small hamlet near the river to see his grandmother.',
                            synonyms: ['Settlement', 'Small village'],
                            antonyms: ['Metropolis', 'City']
                        }
                    },
                    {
                        q: 'What is the meaning of Whenever?',
                        options: ['Never (कभी नहीं)', 'At whatever time (जब भी/जब कभी)', 'Now (अभी)', 'Later (बाद में)'],
                        answer: 'At whatever time (जब भी/जब कभी)',
                        explanation: {
                            word: 'Whenever',
                            hindi: 'जब भी/जब कभी',
                            partOfSpeech: 'Conjunction',
                            meaning: 'At whatever time; on every occasion that.',
                            sentence: 'Hari Kishan smiles whenever he sees his favorite teacher.',
                            synonyms: ['Anytime', 'Every time'],
                            antonyms: ['Never']
                        }
                    },
                    {
                        q: 'What is the meaning of Illusion?',
                        options: ['Reality (हकीकत)', 'False idea/Trick (भ्रम/आभास)', 'Truth (सच)', 'Book (किताब)'],
                        answer: 'False idea/Trick (भ्रम/आभास)',
                        explanation: {
                            word: 'Illusion',
                            hindi: 'भ्रम/आभास',
                            partOfSpeech: 'Noun',
                            meaning: 'A false idea or belief; something that is likely to be wrongly perceived by the senses.',
                            sentence: 'The magician created an illusion that the rabbit had disappeared, surprising Adarsh.',
                            synonyms: ['Delusion', 'Trick'],
                            antonyms: ['Reality', 'Fact']
                        }
                    },
                    {
                        q: 'What is the meaning of Grocery?',
                        options: ['Clothes (कपड़े)', 'Food supplies/Store (किराना/राशन)', 'Medicine (दवाई)', 'Toys (खिलौने)'],
                        answer: 'Food supplies/Store (किराना/राशन)',
                        explanation: {
                            word: 'Grocery',
                            hindi: 'किराना/राशन',
                            partOfSpeech: 'Noun',
                            meaning: 'A grocer\'s store or items of food sold in a grocer\'s store.',
                            sentence: 'Ladli went to the grocery store to buy rice and sugar.',
                            synonyms: ['Provisions', 'Foodstuff'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Manipulate?',
                        options: ['Break (तोड़ना)', 'Handle cleverly (चालाकी से काम निकालना)', 'Help (मदद करना)', 'Sleep (सोना)'],
                        answer: 'Handle cleverly (चालाकी से काम निकालना)',
                        explanation: {
                            word: 'Manipulate',
                            hindi: 'चालाकी से काम निकालना',
                            partOfSpeech: 'Verb',
                            meaning: 'To control or influence a person or situation cleverly or unfairly.',
                            sentence: 'Aniket Kumar knows how to manipulate numbers to solve math problems quickly.',
                            synonyms: ['Control', 'Influence'],
                            antonyms: ['Leave alone']
                        }
                    },
                    {
                        q: 'What is the meaning of Bar?',
                        options: ['Circle (गोला)', 'Rod/Stick (छड़ी/डंडा)', 'Ball (गेंद)', 'Rope (रस्सी)'],
                        answer: 'Rod/Stick (छड़ी/डंडा)',
                        explanation: {
                            word: 'Bar',
                            hindi: 'छड़ी/डंडा',
                            partOfSpeech: 'Noun',
                            meaning: 'A long rigid piece of wood, metal, or similar material.',
                            sentence: 'Shivshant used an iron bar to lift the heavy stone.',
                            synonyms: ['Rod', 'Pole'],
                            antonyms: []
                        }
                    }
                ]
            },
            20: {
                name: 'People & Character',
                icon: '👥',
                questions: [
                    {
                        q: 'What is the meaning of Gullible?',
                        options: ['Clever (चालाक)', 'Innocent/Easily tricked (भोला/आसानी से धोखा खाने वाला)', 'Angry (गुस्सा)', 'Brave (बहादुर)'],
                        answer: 'Innocent/Easily tricked (भोला/आसानी से धोखा खाने वाला)',
                        explanation: {
                            word: 'Gullible',
                            hindi: 'भोला/आसानी से धोखा खाने वाला',
                            partOfSpeech: 'Adjective',
                            meaning: 'Someone who is easily persuaded to believe something or easily tricked.',
                            sentence: 'Aniket is so gullible that he believed the fake lottery message.',
                            synonyms: ['Innocent', 'Trusting'],
                            antonyms: ['Suspicious', 'Clever']
                        }
                    },
                    {
                        q: 'What is the meaning of Hygiene?',
                        options: ['Dirt (गंदगी)', 'Cleanliness (स्वच्छता)', 'Disease (बीमारी)', 'Food (भोजन)'],
                        answer: 'Cleanliness (स्वच्छता)',
                        explanation: {
                            word: 'Hygiene',
                            hindi: 'स्वच्छता',
                            partOfSpeech: 'Noun',
                            meaning: 'Conditions or practices that help to maintain health and prevent disease, especially through cleanliness.',
                            sentence: 'The teacher told Kavya to maintain good hygiene by bathing daily.',
                            synonyms: ['Cleanliness', 'Sanitation'],
                            antonyms: ['Dirtiness', 'Unhygienic']
                        }
                    },
                    {
                        q: 'What is the meaning of Irony?',
                        options: ['Iron metal (लोहा)', 'Sarcasm/Opposite of what is expected (ताना/विडंबना)', 'Truth (सच)', 'Lie (झूठ)'],
                        answer: 'Sarcasm/Opposite of what is expected (ताना/विडंबना)',
                        explanation: {
                            word: 'Irony',
                            hindi: 'ताना/विडंबना',
                            partOfSpeech: 'Noun',
                            meaning: 'A situation that is strange or funny because things happen in a way that seems the exact opposite of what you expected.',
                            sentence: 'The irony is that Deva, who works at a police station, had his own bicycle stolen!',
                            synonyms: ['Sarcasm', 'Paradox'],
                            antonyms: ['Sincerity', 'Expected']
                        }
                    },
                    {
                        q: 'What is the meaning of Probability?',
                        options: ['Problem (समस्या)', 'Chance/Likelihood (प्रायिकता/संभावना)', 'Result (परिणाम)', 'History (इतिहास)'],
                        answer: 'Chance/Likelihood (प्रायिकता/संभावना)',
                        explanation: {
                            word: 'Probability',
                            hindi: 'प्रायिकता/संभावना',
                            partOfSpeech: 'Noun',
                            meaning: 'The extent to which something is likely to happen.',
                            sentence: 'The probability of rain today is very high, so Jhanvi carried an umbrella.',
                            synonyms: ['Chance', 'Likelihood'],
                            antonyms: ['Impossibility', 'Certainty']
                        }
                    },
                    {
                        q: 'What is the meaning of Pretend?',
                        options: ['Truth (सच बोलना)', 'Act/Fake (बहाना करना/दिखावा करना)', 'Sleep (सोना)', 'Study (पढ़ना)'],
                        answer: 'Act/Fake (बहाना करना/दिखावा करना)',
                        explanation: {
                            word: 'Pretend',
                            hindi: 'बहाना करना/दिखावा करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To behave so as to make it appear that something is the case when in fact it is not.',
                            sentence: 'Samriddhi Chaurasiya pretended to have a stomachache to avoid going to school.',
                            synonyms: ['Act', 'Fake'],
                            antonyms: ['Be genuine', 'Tell truth']
                        }
                    },
                    {
                        q: 'What is the meaning of Grope?',
                        options: ['See clearly (साफ देखना)', 'Search blindly with hands (टटोलना)', 'Run fast (तेज दौड़ना)', 'Catch (पकड़ना)'],
                        answer: 'Search blindly with hands (टटोलना)',
                        explanation: {
                            word: 'Grope',
                            hindi: 'टटोलना',
                            partOfSpeech: 'Verb',
                            meaning: 'To feel about or search blindly or uncertainly with the hands.',
                            sentence: 'When the power went out suddenly, Arpit Pal groped along the wall for the switch.',
                            synonyms: ['Fumble', 'Feel blindly'],
                            antonyms: ['See', 'Grasp confidently']
                        }
                    },
                    {
                        q: 'What is the meaning of Verdict?',
                        options: ['Question (सवाल)', 'Decision/Judgment (फैसला/निर्णय)', 'Fight (लड़ाई)', 'Gift (उपहार)'],
                        answer: 'Decision/Judgment (फैसला/निर्णय)',
                        explanation: {
                            word: 'Verdict',
                            hindi: 'फैसला/निर्णय',
                            partOfSpeech: 'Noun',
                            meaning: 'A decision on a disputed issue in a civil or criminal case.',
                            sentence: 'The judge announced the verdict and freed the innocent man, Muskan saw on the news.',
                            synonyms: ['Decision', 'Judgment'],
                            antonyms: ['Accusation']
                        }
                    },
                    {
                        q: 'What is the meaning of Fellow?',
                        options: ['Enemy (दुश्मन)', 'Companion/Peer (साथी/सहकर्मी)', 'Boss (मालिक)', 'Animal (जानवर)'],
                        answer: 'Companion/Peer (साथी/सहकर्मी)',
                        explanation: {
                            word: 'Fellow',
                            hindi: 'साथी/सहकर्मी',
                            partOfSpeech: 'Noun/Adjective',
                            meaning: 'A person in the same situation, condition, or class as you.',
                            sentence: 'Sanjana Nishad always helps her fellow students in class.',
                            synonyms: ['Companion', 'Partner'],
                            antonyms: ['Opponent', 'Enemy']
                        }
                    },
                    {
                        q: 'What is the meaning of Passenger?',
                        options: ['Driver (चालक)', 'Traveler (यात्री/मुसाफिर)', 'Teacher (शिक्षक)', 'Pilot (पायलट)'],
                        answer: 'Traveler (यात्री/मुसाफिर)',
                        explanation: {
                            word: 'Passenger',
                            hindi: 'यात्री/मुसाफिर',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who is traveling in a vehicle but is not driving it or working on it.',
                            sentence: 'As soon as the train stopped, all the passengers rushed to get off, including Anubhav.',
                            synonyms: ['Traveler', 'Commuter'],
                            antonyms: ['Driver', 'Crew']
                        }
                    },
                    {
                        q: 'What is the meaning of Sibling?',
                        options: ['Friend (दोस्त)', 'Brother or Sister (भाई-बहन)', 'Parent (माता-पिता)', 'Teacher (शिक्षक)'],
                        answer: 'Brother or Sister (भाई-बहन)',
                        explanation: {
                            word: 'Sibling',
                            hindi: 'भाई-बहन',
                            partOfSpeech: 'Noun',
                            meaning: 'Each of two or more children or offspring having one or both parents in common; a brother or sister.',
                            sentence: 'Ankit and his younger sibling always fight over the TV remote.',
                            synonyms: ['Brother', 'Sister'],
                            antonyms: ['Only child']
                        }
                    },
                    {
                        q: 'What is the meaning of Debt?',
                        options: ['Profit (मुनाफा)', 'Money owed/Loan (कर्ज/ऋण)', 'Salary (वेतन)', 'Gift (उपहार)'],
                        answer: 'Money owed/Loan (कर्ज/ऋण)',
                        explanation: {
                            word: 'Debt',
                            hindi: 'कर्ज/ऋण',
                            partOfSpeech: 'Noun',
                            meaning: 'A sum of money that is owed or due to someone else.',
                            sentence: 'Hari Kishan worked day and night to pay off all his bank debt.',
                            synonyms: ['Loan', 'Liability'],
                            antonyms: ['Asset', 'Profit']
                        }
                    },
                    {
                        q: 'What is the meaning of Rude?',
                        options: ['Polite (विनम्र)', 'Impolite/Bad-mannered (अभद्र/बदतमीज)', 'Happy (खुश)', 'Silent (शांत)'],
                        answer: 'Impolite/Bad-mannered (अभद्र/बदतमीज)',
                        explanation: {
                            word: 'Rude',
                            hindi: 'अभद्र/बदतमीज',
                            partOfSpeech: 'Adjective',
                            meaning: 'Offensively impolite or bad-mannered.',
                            sentence: 'Adarsh never speaks in a rude manner to anyone; he respects everyone.',
                            synonyms: ['Impolite', 'Disrespectful'],
                            antonyms: ['Polite', 'Respectful']
                        }
                    },
                    {
                        q: 'What is the meaning of Bold?',
                        options: ['Scared (डरा हुआ)', 'Brave/Fearless (साहसी/निडर)', 'Weak (कमजोर)', 'Lazy (आलसी)'],
                        answer: 'Brave/Fearless (साहसी/निडर)',
                        explanation: {
                            word: 'Bold',
                            hindi: 'साहसी/निडर',
                            partOfSpeech: 'Adjective',
                            meaning: 'A person showing an ability to take risks; confident and courageous.',
                            sentence: 'Ladli made a bold decision to speak on stage in front of the whole assembly.',
                            synonyms: ['Brave', 'Fearless'],
                            antonyms: ['Timid', 'Cowardly']
                        }
                    },
                    {
                        q: 'What is the meaning of Bully?',
                        options: ['Help (मदद करना)', 'Intimidate/Threaten (धमकाना/डराना)', 'Play (खेलना)', 'Teach (पढ़ाना)'],
                        answer: 'Intimidate/Threaten (धमकाना/डराना)',
                        explanation: {
                            word: 'Bully',
                            hindi: 'धमकाना/डराना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Verb: To seek to harm, intimidate, or coerce someone perceived as vulnerable. As a Noun: A person who habitually threatens others.',
                            sentence: 'It is very wrong to bully a younger child in school, Aniket Kumar explained.',
                            synonyms: ['Threaten', 'Intimidate'],
                            antonyms: ['Support', 'Defend']
                        }
                    },
                    {
                        q: 'What is the meaning of Humble?',
                        options: ['Proud (घमंडी)', 'Modest/Polite (विनम्र/साधारण)', 'Angry (गुस्सा)', 'Rich (अमीर)'],
                        answer: 'Modest/Polite (विनम्र/साधारण)',
                        explanation: {
                            word: 'Humble',
                            hindi: 'विनम्र/साधारण',
                            partOfSpeech: 'Adjective',
                            meaning: 'Having or showing a modest or low estimate of one\'s own importance; not proud.',
                            sentence: 'Even after getting such great results, Shivshant remains very humble.',
                            synonyms: ['Modest', 'Polite'],
                            antonyms: ['Arrogant', 'Proud']
                        }
                    }
                ]
            },
            21: {
                name: 'Skills & Actions',
                icon: '🎯',
                questions: [
                    {
                        q: 'What is the meaning of Knit?',
                        options: ['Play (खेलना)', 'Weave/Make clothes (बुनना)', 'Cut (काटना)', 'Sew (सिलना)'],
                        answer: 'Weave/Make clothes (बुनना)',
                        explanation: {
                            word: 'Knit',
                            hindi: 'बुनना',
                            partOfSpeech: 'Verb',
                            meaning: 'To make clothes (like a sweater) by interlocking loops of wool or yarn.',
                            sentence: 'Jhanvi\'s grandmother is knitting a beautiful red sweater for her.',
                            synonyms: ['Weave', 'Stitch'],
                            antonyms: ['Unravel', 'Undo']
                        }
                    },
                    {
                        q: 'What is the meaning of Arrogant?',
                        options: ['Polite (विनम्र)', 'Proud/Haughty (घमंडी)', 'Poor (गरीब)', 'Happy (खुश)'],
                        answer: 'Proud/Haughty (घमंडी)',
                        explanation: {
                            word: 'Arrogant',
                            hindi: 'घमंडी',
                            partOfSpeech: 'Adjective',
                            meaning: 'Someone who behaves in a proud and unpleasant way, thinking they are better than others.',
                            sentence: 'Deva does not like arrogant people who look down on others.',
                            synonyms: ['Proud', 'Haughty'],
                            antonyms: ['Humble', 'Modest']
                        }
                    },
                    {
                        q: 'What is the meaning of Distillation?',
                        options: ['Mixing (मिलाना)', 'Purifying liquid (आसवन/शुद्ध करना)', 'Burning (जलाना)', 'Freezing (जमाना)'],
                        answer: 'Purifying liquid (आसवन/शुद्ध करना)',
                        explanation: {
                            word: 'Distillation',
                            hindi: 'आसवन/शुद्ध करना',
                            partOfSpeech: 'Noun',
                            meaning: 'A science process used to purify a liquid by heating and cooling it.',
                            sentence: 'In science class, Arpit Pal observed the distillation process used to purify water.',
                            synonyms: ['Purification', 'Refining'],
                            antonyms: ['Contamination', 'Pollution']
                        }
                    },
                    {
                        q: 'What is the meaning of Accumulate?',
                        options: ['Scatter (बिखेरना)', 'Gather/Collect (इकट्ठा होना/करना)', 'Hide (छिपाना)', 'Drop (गिराना)'],
                        answer: 'Gather/Collect (इकट्ठा होना/करना)',
                        explanation: {
                            word: 'Accumulate',
                            hindi: 'इकट्ठा होना/करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To gather or collect something together over time.',
                            sentence: 'Muskan has accumulated a lot of coins in her piggy bank.',
                            synonyms: ['Collect', 'Gather'],
                            antonyms: ['Scatter', 'Disperse']
                        }
                    },
                    {
                        q: 'What is the meaning of Soup?',
                        options: ['Solid food (ठोस भोजन)', 'Liquid food/Broth (सूप/रसेदार खाना)', 'Bread (रोटी)', 'Dessert (मिठाई)'],
                        answer: 'Liquid food/Broth (सूप/रसेदार खाना)',
                        explanation: {
                            word: 'Soup',
                            hindi: 'सूप/रसेदार खाना',
                            partOfSpeech: 'Noun',
                            meaning: 'A liquid dish, typically made by boiling meat, fish, or vegetables.',
                            sentence: 'During the winter season, Sanjana Nishad loves to have a warm tomato soup.',
                            synonyms: ['Broth', 'Stew'],
                            antonyms: ['Solid food']
                        }
                    },
                    {
                        q: 'What is the meaning of Obtain?',
                        options: ['Lose (खोना)', 'Get/Acquire (प्राप्त करना)', 'Give (देना)', 'Throw (फेंकना)'],
                        answer: 'Get/Acquire (प्राप्त करना)',
                        explanation: {
                            word: 'Obtain',
                            hindi: 'प्राप्त करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To get or acquire something, usually by effort.',
                            sentence: 'Anubhav obtained the highest marks in class through his hard work.',
                            synonyms: ['Get', 'Acquire'],
                            antonyms: ['Lose', 'Give up']
                        }
                    },
                    {
                        q: 'What is the meaning of String?',
                        options: ['Wire (तार)', 'Thread/Cord (धागा/डोरी)', 'Stick (लकड़ी)', 'Rope (मोटी रस्सी)'],
                        answer: 'Thread/Cord (धागा/डोरी)',
                        explanation: {
                            word: 'String',
                            hindi: 'धागा/डोरी',
                            partOfSpeech: 'Noun',
                            meaning: 'A material consisting of threads of cotton, hemp, or other material twisted together to form a thin length.',
                            sentence: 'Kavya used a strong string to fly her kite.',
                            synonyms: ['Thread', 'Cord'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Former?',
                        options: ['Next (अगला)', 'Previous/Earlier (पूर्व/पहला)', 'Future (भविष्य)', 'Current (वर्तमान)'],
                        answer: 'Previous/Earlier (पूर्व/पहला)',
                        explanation: {
                            word: 'Former',
                            hindi: 'पूर्व/पहला',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something that happened or existed in the past, or the first of two things mentioned.',
                            sentence: 'Samriddhi Chaurasiya misses her friends from her former school very much.',
                            synonyms: ['Previous', 'Earlier'],
                            antonyms: ['Current', 'Future']
                        }
                    },
                    {
                        q: 'What is the meaning of Cause?',
                        options: ['Result (परिणाम)', 'Reason/Make happen (कारण/वजह)', 'End (अंत)', 'Stop (रोकना)'],
                        answer: 'Reason/Make happen (कारण/वजह)',
                        explanation: {
                            word: 'Cause',
                            hindi: 'कारण/वजह',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: The reason why something happens. As a Verb: To make something happen.',
                            sentence: 'The main cause of the traffic jam was a fallen tree on the road, Aniket explained.',
                            synonyms: ['Reason', 'Source'],
                            antonyms: ['Effect', 'Result']
                        }
                    },
                    {
                        q: 'What is the meaning of Pending?',
                        options: ['Finished (खत्म)', 'Unfinished/Remaining (बची हुई/लंबित)', 'Started (शुरू)', 'Lost (खोया हुआ)'],
                        answer: 'Unfinished/Remaining (बची हुई/लंबित)',
                        explanation: {
                            word: 'Pending',
                            hindi: 'बची हुई/लंबित',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something that is waiting to be decided or completed.',
                            sentence: 'The teacher told Yash to complete all his pending homework today itself.',
                            synonyms: ['Unfinished', 'Remaining'],
                            antonyms: ['Finished', 'Resolved']
                        }
                    },
                    {
                        q: 'What is the meaning of Intentionally?',
                        options: ['By mistake (गलती से)', 'On purpose (जान बूझ कर)', 'Slowly (धीरे)', 'Rarely (शायद ही कभी)'],
                        answer: 'On purpose (जान बूझ कर)',
                        explanation: {
                            word: 'Intentionally',
                            hindi: 'जान बूझ कर',
                            partOfSpeech: 'Adverb',
                            meaning: 'Doing something deliberately or on purpose, not by accident.',
                            sentence: 'Shivansh did not intentionally hurt anyone; it was just an accident.',
                            synonyms: ['Deliberately', 'Purposely'],
                            antonyms: ['Accidentally', 'Unintentionally']
                        }
                    },
                    {
                        q: 'What is the meaning of Unleash?',
                        options: ['Tie up (बांधना)', 'Release/Let go (पट्टा खोलना/मुक्त करना)', 'Hold (पकड़ना)', 'Hide (छिपाना)'],
                        answer: 'Release/Let go (पट्टा खोलना/मुक्त करना)',
                        explanation: {
                            word: 'Unleash',
                            hindi: 'पट्टा खोलना/मुक्त करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To release an animal from a leash or to release a strong force.',
                            sentence: 'As soon as they reached the park, Stuti unleashed her dog from the leash.',
                            synonyms: ['Release', 'Free'],
                            antonyms: ['Restrain', 'Tie up']
                        }
                    },
                    {
                        q: 'What is the meaning of Leftovers?',
                        options: ['Fresh food (ताजा खाना)', 'Remaining food/stuff (बचा-कुचा खाना)', 'New items (नया सामान)', 'Rotten food (सड़ा हुआ खाना)'],
                        answer: 'Remaining food/stuff (बचा-कुचा खाना)',
                        explanation: {
                            word: 'Leftovers',
                            hindi: 'बचा-कुचा खाना',
                            partOfSpeech: 'Noun',
                            meaning: 'Food remaining after the rest has been used or eaten.',
                            sentence: 'After the party, Ankit distributed all the leftovers among the poor.',
                            synonyms: ['Remains', 'Remnants'],
                            antonyms: ['Freshly cooked food']
                        }
                    },
                    {
                        q: 'What is the meaning of Identify?',
                        options: ['Hide (छिपाना)', 'Recognize/Find out (पहचानना)', 'Forget (भूलना)', 'Lose (खोना)'],
                        answer: 'Recognize/Find out (पहचानना)',
                        explanation: {
                            word: 'Identify',
                            hindi: 'पहचानना',
                            partOfSpeech: 'Verb',
                            meaning: 'To recognize or establish who or what someone or something is.',
                            sentence: 'The police identified the thief immediately by watching the CCTV footage.',
                            synonyms: ['Recognize', 'Discover'],
                            antonyms: ['Confuse', 'Mistake']
                        }
                    },
                    {
                        q: 'What is the meaning of Aspirant?',
                        options: ['Winner (विजेता)', 'Candidate/Hopeful (उम्मीदवार/तैयारी करने वाला)', 'Doctor (चिकित्सक)', 'Teacher (शिक्षक)'],
                        answer: 'Candidate/Hopeful (उम्मीदवार/तैयारी करने वाला)',
                        explanation: {
                            word: 'Aspirant',
                            hindi: 'उम्मीदवार/तैयारी करने वाला',
                            partOfSpeech: 'Noun',
                            meaning: 'A person who has ambitions to achieve something, like a specific job or position.',
                            sentence: 'Hari Kishan is an Army aspirant, so he wakes up early every morning to go for a run.',
                            synonyms: ['Candidate', 'Hopeful'],
                            antonyms: []
                        }
                    }
                ]
            },
            22: {
                name: 'Life & Society',
                icon: '🏛️',
                questions: [
                    {
                        q: 'What is the meaning of Will?',
                        options: ['Power (ताकत)', 'Desire/Wish (इच्छा)', 'Sleep (नींद)', 'Anger (गुस्सा)'],
                        answer: 'Desire/Wish (इच्छा)',
                        explanation: {
                            word: 'Will',
                            hindi: 'इच्छा',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a Noun: A strong desire or determination to do something.',
                            sentence: 'Aniket has a strong will to become a successful doctor when he grows up.',
                            synonyms: ['Desire', 'Determination'],
                            antonyms: ['Reluctance', 'Apathy']
                        }
                    },
                    {
                        q: 'What is the meaning of Fate?',
                        options: ['Result (परिणाम)', 'Destiny (भाग्य/किस्मत)', 'Hard work (मेहनत)', 'Dream (सपना)'],
                        answer: 'Destiny (भाग्य/किस्मत)',
                        explanation: {
                            word: 'Fate',
                            hindi: 'भाग्य/किस्मत',
                            partOfSpeech: 'Noun',
                            meaning: 'The events outside a person\'s control, determined by a supernatural power; destiny.',
                            sentence: 'Deva believes that through hard work and good education, we can change our fate.',
                            synonyms: ['Destiny', 'Luck'],
                            antonyms: ['Choice', 'Free will']
                        }
                    },
                    {
                        q: 'What is the meaning of Turmoil?',
                        options: ['Peace (शांति)', 'Chaos/Confusion (अफरा-तफरी/अशांति)', 'Sleep (सोना)', 'Joy (खुशी)'],
                        answer: 'Chaos/Confusion (अफरा-तफरी/अशांति)',
                        explanation: {
                            word: 'Turmoil',
                            hindi: 'अफरा-तफरी/अशांति',
                            partOfSpeech: 'Noun',
                            meaning: 'A state of great disturbance, confusion, or uncertainty.',
                            sentence: 'The rumour of a fire in the market caused turmoil everywhere, Jhanvi reported.',
                            synonyms: ['Chaos', 'Disorder'],
                            antonyms: ['Peace', 'Calm']
                        }
                    },
                    {
                        q: 'What is the meaning of Bright?',
                        options: ['Dark (अंधेरा)', 'Shining/Smart (चमकीला/उज्ज्वल)', 'Heavy (भारी)', 'Slow (धीमा)'],
                        answer: 'Shining/Smart (चमकीला/उज्ज्वल)',
                        explanation: {
                            word: 'Bright',
                            hindi: 'चमकीला/उज्ज्वल',
                            partOfSpeech: 'Adjective',
                            meaning: 'Giving out or reflecting a lot of light, or someone who is very smart.',
                            sentence: 'Samriddhi Chaurasiya wore a very beautiful and bright yellow dress at the annual function.',
                            synonyms: ['Shining', 'Radiant'],
                            antonyms: ['Dark', 'Dull']
                        }
                    },
                    {
                        q: 'What is the meaning of Dull?',
                        options: ['Interesting (रोचक)', 'Boring/Not bright (नीरस/सुस्त)', 'Fast (तेज)', 'Happy (खुश)'],
                        answer: 'Boring/Not bright (नीरस/सुस्त)',
                        explanation: {
                            word: 'Dull',
                            hindi: 'नीरस/सुस्त',
                            partOfSpeech: 'Adjective',
                            meaning: 'Lacking interest or excitement; not bright or shiny.',
                            sentence: 'The weather was very dull today, so Arpit Pal did not go to play cricket.',
                            synonyms: ['Boring', 'Dreary'],
                            antonyms: ['Bright', 'Interesting']
                        }
                    },
                    {
                        q: 'What is the meaning of Hardship?',
                        options: ['Ease (आसानी)', 'Difficulty/Suffering (परेशानी/कठिनाई)', 'Joy (आनंद)', 'Wealth (संपत्ति)'],
                        answer: 'Difficulty/Suffering (परेशानी/कठिनाई)',
                        explanation: {
                            word: 'Hardship',
                            hindi: 'परेशानी/कठिनाई',
                            partOfSpeech: 'Noun',
                            meaning: 'Severe suffering or difficulty in life.',
                            sentence: 'Kavya faced many hardships to complete her education and topped the class.',
                            synonyms: ['Difficulty', 'Trouble'],
                            antonyms: ['Comfort', 'Ease']
                        }
                    },
                    {
                        q: 'What is the meaning of Appeal?',
                        options: ['Demand forcefully (जबरदस्ती मांगना)', 'Earnest request (निवेदन करना/अपील करना)', 'Reject (अस्वीकार करना)', 'Hide (छिपाना)'],
                        answer: 'Earnest request (निवेदन करना/अपील करना)',
                        explanation: {
                            word: 'Appeal',
                            hindi: 'निवेदन करना/अपील करना',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'To make a serious or urgent request to someone.',
                            sentence: 'Muskan appealed to the teacher to postpone the exam date.',
                            synonyms: ['Request', 'Plead'],
                            antonyms: ['Demand', 'Refuse']
                        }
                    },
                    {
                        q: 'What is the meaning of Cling?',
                        options: ['Let go (छोड़ देना)', 'Hold tightly (अडिग रहना/चिपके रहना)', 'Fall (गिरना)', 'Run (दौड़ना)'],
                        answer: 'Hold tightly (अडिग रहना/चिपके रहना)',
                        explanation: {
                            word: 'Cling',
                            hindi: 'अडिग रहना/चिपके रहना',
                            partOfSpeech: 'Verb',
                            meaning: 'To hold on tightly to something or someone.',
                            sentence: 'The scared little child clung to his mother tightly, Sanjana Nishad noticed.',
                            synonyms: ['Hold on', 'Stick'],
                            antonyms: ['Let go', 'Release']
                        }
                    },
                    {
                        q: 'What is the meaning of Cite?',
                        options: ['Forget (भूलना)', 'Quote/Mention (बताना/हवाला देना)', 'Hit (मारना)', 'Hide (छिपाना)'],
                        answer: 'Quote/Mention (बताना/हवाला देना)',
                        explanation: {
                            word: 'Cite',
                            hindi: 'बताना/हवाला देना',
                            partOfSpeech: 'Verb',
                            meaning: 'To refer to a book, author, or event as evidence or proof of what you are saying.',
                            sentence: 'While writing his answer, Anubhav cited an example from a famous book.',
                            synonyms: ['Quote', 'Mention'],
                            antonyms: ['Conceal', 'Ignore']
                        }
                    },
                    {
                        q: 'What is the meaning of Meal?',
                        options: ['Snack (नाश्ता)', 'Food/Repast (खाना/भोजन)', 'Water (पानी)', 'Plate (थाली)'],
                        answer: 'Food/Repast (खाना/भोजन)',
                        explanation: {
                            word: 'Meal',
                            hindi: 'खाना/भोजन',
                            partOfSpeech: 'Noun',
                            meaning: 'The food eaten on regular occasions (like breakfast, lunch, or dinner).',
                            sentence: 'For the afternoon meal, Hari Kishan had dal and rice.',
                            synonyms: ['Food', 'Feast'],
                            antonyms: ['Starvation']
                        }
                    },
                    {
                        q: 'What is the meaning of Recover?',
                        options: ['Lose (खोना)', 'Get back/Heal (मिला/पा लिया/ठीक होना)', 'Break (तोड़ना)', 'Forget (भूलना)'],
                        answer: 'Get back/Heal (मिला/पा लिया/ठीक होना)',
                        explanation: {
                            word: 'Recover',
                            hindi: 'मिला/पा लिया/ठीक होना',
                            partOfSpeech: 'Verb',
                            meaning: 'To find or regain possession of something stolen or lost, or to return to a normal state of health.',
                            sentence: 'The police recovered all the stolen goods from the thief, Adarsh read in the news.',
                            synonyms: ['Regain', 'Retrieve'],
                            antonyms: ['Lose', 'Worsen']
                        }
                    },
                    {
                        q: 'What is the meaning of Sewer?',
                        options: ['Clean water (साफ पानी)', 'Underground drain (गटर/नाला)', 'River (नदी)', 'Sky (आसमान)'],
                        answer: 'Underground drain (गटर/नाला)',
                        explanation: {
                            word: 'Sewer',
                            hindi: 'गटर/नाला',
                            partOfSpeech: 'Noun',
                            meaning: 'An underground pipe or drain used to carry off waste water and refuse.',
                            sentence: 'During the rainy season, the street sewer started to overflow, so Aniket Kumar called the municipal corporation.',
                            synonyms: ['Drain', 'Gutter'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Regarding?',
                        options: ['Ignoring (अनदेखा करना)', 'About/Concerning (के बारे में/किसी चीज को लेकर)', 'Behind (पीछे)', 'Before (पहले)'],
                        answer: 'About/Concerning (के बारे में/किसी चीज को लेकर)',
                        explanation: {
                            word: 'Regarding',
                            hindi: 'के बारे में/किसी चीज को लेकर',
                            partOfSpeech: 'Preposition',
                            meaning: '"With respect to" or "concerning" a particular subject.',
                            sentence: 'Ladli asked the teacher a few doubts regarding the upcoming exam.',
                            synonyms: ['Concerning', 'About'],
                            antonyms: ['Ignoring']
                        }
                    },
                    {
                        q: 'What is the meaning of Indecent?',
                        options: ['Polite (विनम्र)', 'Improper/Vulgar (अभद्र/अश्लील)', 'Good (अच्छा)', 'Silent (शांत)'],
                        answer: 'Improper/Vulgar (अभद्र/अश्लील)',
                        explanation: {
                            word: 'Indecent',
                            hindi: 'अभद्र/अश्लील',
                            partOfSpeech: 'Adjective',
                            meaning: 'Behavior or language that is not appropriate, polite, or acceptable in society.',
                            sentence: 'Shivshant believes that using indecent language in a public place is very wrong.',
                            synonyms: ['Improper', 'Vulgar'],
                            antonyms: ['Decent', 'Proper']
                        }
                    },
                    {
                        q: 'What is the meaning of Routine?',
                        options: ['Special event (खास कार्यक्रम)', 'Regular procedure (सामान्य/दिनचर्या)', 'Accident (दुर्घटना)', 'Surprise (आश्चर्य)'],
                        answer: 'Regular procedure (सामान्य/दिनचर्या)',
                        explanation: {
                            word: 'Routine',
                            hindi: 'सामान्य/दिनचर्या',
                            partOfSpeech: 'Noun/Adjective',
                            meaning: 'A sequence of actions regularly followed.',
                            sentence: 'Yash\'s daily routine starts with exercise at 6 in the morning.',
                            synonyms: ['Schedule', 'Everyday'],
                            antonyms: ['Unusual', 'Special']
                        }
                    }
                ]
            },
            23: {
                name: 'Law & Nature',
                icon: '⚖️',
                questions: [
                    {
                        q: 'What is the meaning of Obscene?',
                        options: ['Beautiful (सुंदर)', 'Indecent/Vulgar (अश्लील/अभद्र)', 'Polite (विनम्र)', 'Heavy (भारी)'],
                        answer: 'Indecent/Vulgar (अश्लील/अभद्र)',
                        explanation: {
                            word: 'Obscene',
                            hindi: 'अश्लील/अभद्र',
                            partOfSpeech: 'Adjective',
                            meaning: 'Something that is offensive to moral principles or socially unacceptable.',
                            sentence: 'Anubhav explained to his friends that using obscene language in public places is completely wrong.',
                            synonyms: ['Vulgar', 'Indecent'],
                            antonyms: ['Decent', 'Clean']
                        }
                    },
                    {
                        q: 'What is the meaning of Remark?',
                        options: ['Silence (चुप्पी)', 'Comment/Statement (टिप्पणी/कहना)', 'Ignore (अनदेखा करना)', 'Question (सवाल)'],
                        answer: 'Comment/Statement (टिप्पणी/कहना)',
                        explanation: {
                            word: 'Remark',
                            hindi: 'टिप्पणी/कहना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Something that you say or write which expresses an opinion or thought.',
                            sentence: 'The art teacher gave a very positive remark on Sanjana Nishad\'s beautiful drawing.',
                            synonyms: ['Comment', 'Observation'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Eve-teasing?',
                        options: ['Praising (तारीफ करना)', 'Harassment of women (छेड़-छाड़ करना)', 'Playing games (खेल खेलना)', 'Helping others (मदद करना)'],
                        answer: 'Harassment of women (छेड़-छाड़ करना)',
                        explanation: {
                            word: 'Eve-teasing',
                            hindi: 'छेड़-छाड़ करना',
                            partOfSpeech: 'Noun',
                            meaning: 'A term used for the public sexual harassment or molestation of women by men.',
                            sentence: 'Muskan saw on the news that the local police promised to take strict action against eve-teasing.',
                            synonyms: ['Harassment', 'Molestation'],
                            antonyms: ['Respecting', 'Honoring']
                        }
                    },
                    {
                        q: 'What is the meaning of Apprehend?',
                        options: ['Release (छोड़ना)', 'Catch/Arrest (पकड़ लेना/गिरफ्तार करना)', 'Hide (छिपाना)', 'Forget (भूलना)'],
                        answer: 'Catch/Arrest (पकड़ लेना/गिरफ्तार करना)',
                        explanation: {
                            word: 'Apprehend',
                            hindi: 'पकड़ लेना/गिरफ्तार करना',
                            partOfSpeech: 'Verb',
                            meaning: 'To catch and arrest someone who has not obeyed the law.',
                            sentence: 'Deva read in the newspaper that the police were able to apprehend the thief immediately after the robbery.',
                            synonyms: ['Arrest', 'Catch'],
                            antonyms: ['Release', 'Free']
                        }
                    },
                    {
                        q: 'What is the meaning of Rhinoceros?',
                        options: ['Elephant (हाथी)', 'Large horned animal (गैंडा)', 'Tiger (बाघ)', 'Snake (सांप)'],
                        answer: 'Large horned animal (गैंडा)',
                        explanation: {
                            word: 'Rhinoceros',
                            hindi: 'गैंडा',
                            partOfSpeech: 'Noun',
                            meaning: 'A large, heavily built plant-eating mammal with one or two horns on the nose.',
                            sentence: 'During the school trip to the zoo, Arpit Pal was amazed to see a huge rhinoceros.',
                            synonyms: ['Rhino'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Succumb?',
                        options: ['Win/Survive (जीतना/बचना)', 'Give in/Die (हार मान लेना/मृत्यु हो जाना)', 'Fight (लड़ना)', 'Build (बनाना)'],
                        answer: 'Give in/Die (हार मान लेना/मृत्यु हो जाना)',
                        explanation: {
                            word: 'Succumb',
                            hindi: 'हार मान लेना/मृत्यु हो जाना',
                            partOfSpeech: 'Verb',
                            meaning: 'To stop trying to resist something or to die from the effect of a disease or injury.',
                            sentence: 'Aniket was very sad to hear that the injured man succumbed to his injuries in the hospital.',
                            synonyms: ['Surrender', 'Die'],
                            antonyms: ['Resist', 'Survive']
                        }
                    },
                    {
                        q: 'What is the meaning of Preliminary?',
                        options: ['Final (अंतिम)', 'Initial/First (शुरुआती/प्रारंभिक)', 'Useless (बेकार)', 'Slow (धीमा)'],
                        answer: 'Initial/First (शुरुआती/प्रारंभिक)',
                        explanation: {
                            word: 'Preliminary',
                            hindi: 'शुरुआती/प्रारंभिक',
                            partOfSpeech: 'Adjective',
                            meaning: 'An action or event preceding or preparing for something fuller or more important.',
                            sentence: 'Kavya studied hard and scored the highest marks in the preliminary test before the final exams.',
                            synonyms: ['Initial', 'Preparatory'],
                            antonyms: ['Final', 'Concluding']
                        }
                    },
                    {
                        q: 'What is the meaning of Abscond?',
                        options: ['Stay back (रुकना)', 'Run away secretly (भाग जाना/फरार होना)', 'Speak loudly (जोर से बोलना)', 'Sleep (सोना)'],
                        answer: 'Run away secretly (भाग जाना/फरार होना)',
                        explanation: {
                            word: 'Abscond',
                            hindi: 'भाग जाना/फरार होना',
                            partOfSpeech: 'Verb',
                            meaning: 'To leave hurriedly and secretly, typically to escape from custody or avoid arrest.',
                            sentence: 'Samriddhi Chaurasiya read a news article about a criminal who managed to abscond from the city at night.',
                            synonyms: ['Escape', 'Flee'],
                            antonyms: ['Remain', 'Stay']
                        }
                    },
                    {
                        q: 'What is the meaning of Brutally?',
                        options: ['Kindly (प्यार से)', 'Cruelly/Violently (बुरी तरह से/बेरहमी से)', 'Softly (धीरे से)', 'Happily (खुशी से)'],
                        answer: 'Cruelly/Violently (बुरी तरह से/बेरहमी से)',
                        explanation: {
                            word: 'Brutally',
                            hindi: 'बुरी तरह से/बेरहमी से',
                            partOfSpeech: 'Adverb',
                            meaning: 'Doing something in a savagely violent, cruel, or harsh way.',
                            sentence: 'Jhanvi watched a wildlife documentary where a lion brutally attacked its prey in the jungle.',
                            synonyms: ['Cruelly', 'Violently'],
                            antonyms: ['Gently', 'Kindly']
                        }
                    },
                    {
                        q: 'What is the meaning of Place?',
                        options: ['Throw (फेंकना)', 'Put/Keep (रख देना/रखना)', 'Hide (छिपाना)', 'Break (तोड़ना)'],
                        answer: 'Put/Keep (रख देना/रखना)',
                        explanation: {
                            word: 'Place',
                            hindi: 'रख देना/रखना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'As a verb, it means to put something in a particular position.',
                            sentence: 'Shivansh carefully decided to place his brand new book on the top shelf of the study table.',
                            synonyms: ['Put', 'Position'],
                            antonyms: ['Remove', 'Take away']
                        }
                    },
                    {
                        q: 'What is the meaning of Frequently?',
                        options: ['Rarely (शायद ही कभी)', 'Often/Many times (बार-बार/अक्सर)', 'Never (कभी नहीं)', 'Slowly (धीरे)'],
                        answer: 'Often/Many times (बार-बार/अक्सर)',
                        explanation: {
                            word: 'Frequently',
                            hindi: 'बार-बार/अक्सर',
                            partOfSpeech: 'Adverb',
                            meaning: 'Regularly or habitually; often.',
                            sentence: 'Stuti frequently visits the school library during her free time to read new storybooks.',
                            synonyms: ['Often', 'Regularly'],
                            antonyms: ['Rarely', 'Seldom']
                        }
                    },
                    {
                        q: 'What is the meaning of Rusticate?',
                        options: ['Praise (तारीफ करना)', 'Expel/Ban (निकाल देना/बैन कर देना)', 'Welcome (स्वागत करना)', 'Teach (पढ़ाना)'],
                        answer: 'Expel/Ban (निकाल देना/बैन कर देना)',
                        explanation: {
                            word: 'Rusticate',
                            hindi: 'निकाल देना/बैन कर देना',
                            partOfSpeech: 'Verb',
                            meaning: 'In schools or colleges, it means to suspend or expel a student as a punishment.',
                            sentence: 'Yash told everyone that the principal decided to rusticate the naughty student for breaking the school rules.',
                            synonyms: ['Expel', 'Suspend'],
                            antonyms: ['Admit', 'Enroll']
                        }
                    },
                    {
                        q: 'What is the meaning of Corpse?',
                        options: ['Ghost (भूत)', 'Dead body (लाश या मृत शरीर)', 'Animal (जानवर)', 'Doctor (डॉक्टर)'],
                        answer: 'Dead body (लाश या मृत शरीर)',
                        explanation: {
                            word: 'Corpse',
                            hindi: 'लाश या मृत शरीर',
                            partOfSpeech: 'Noun',
                            meaning: 'A dead body, especially of a human being.',
                            sentence: 'Deva was watching an intense detective movie where the police discovered a hidden corpse in the forest.',
                            synonyms: ['Dead body', 'Carcass'],
                            antonyms: ['Living being']
                        }
                    },
                    {
                        q: 'What is the meaning of Remorse?',
                        options: ['Joy (खुशी)', 'Regret/Guilt (पछतावा/दुःख प्रकट करना)', 'Anger (गुस्सा)', 'Pride (गर्व)'],
                        answer: 'Regret/Guilt (पछतावा/दुःख प्रकट करना)',
                        explanation: {
                            word: 'Remorse',
                            hindi: 'पछतावा/दुःख प्रकट करना',
                            partOfSpeech: 'Noun',
                            meaning: 'A feeling of deep regret or guilt for a wrong committed.',
                            sentence: 'After arguing with his best friend over a small issue, Anubhav felt deep remorse and immediately apologized.',
                            synonyms: ['Regret', 'Guilt'],
                            antonyms: ['Indifference', 'Satisfaction']
                        }
                    },
                    {
                        q: 'What is the meaning of Herb?',
                        options: ['Big tree (बड़ा पेड़)', 'Plant for medicine/food (शाक/जड़ी-बूटी)', 'Rock (पत्थर)', 'Animal (जानवर)'],
                        answer: 'Plant for medicine/food (शाक/जड़ी-बूटी)',
                        explanation: {
                            word: 'Herb',
                            hindi: 'शाक/जड़ी-बूटी',
                            partOfSpeech: 'Noun',
                            meaning: 'Any plant with leaves, seeds, or flowers used for flavoring, food, medicine, or perfume.',
                            sentence: 'Sanjana Nishad\'s grandmother gave her a special medicinal herb from the garden to cure her cough.',
                            synonyms: ['Plant', 'Medicinal plant'],
                            antonyms: []
                        }
                    }
                ]
            },
            24: {
                name: 'Gathri 24',
                icon: '🌿',
                questions: [
                    {
                        q: 'What is the meaning of Shrub?',
                        options: ['Tall tree (लंबा पेड़)', 'Bush/Woody plant (झाड़ी)', 'Grass (घास)', 'Flower (फूल)'],
                        answer: 'Bush/Woody plant (झाड़ी)',
                        explanation: {
                            word: 'Shrub',
                            hindi: 'झाड़ी',
                            partOfSpeech: 'Noun',
                            meaning: 'Shrub is a Noun. It is a woody plant that is smaller than a tree and generally has several main stems arising at or near the ground.',
                            sentence: 'Aniket planted a beautiful rose shrub in his backyard garden.',
                            synonyms: ['Bush', 'Hedge'],
                            antonyms: ['Tree', 'Timber']
                        }
                    },
                    {
                        q: 'What is the meaning of Vow?',
                        options: ['Break a rule (नियम तोड़ना)', 'Swear/Make a promise (कसम खाना/शपथ लेना)', 'Speak loudly (जोर से बोलना)', 'Forget (भूलना)'],
                        answer: 'Swear/Make a promise (कसम खाना/शपथ लेना)',
                        explanation: {
                            word: 'Vow',
                            hindi: 'कसम खाना/शपथ लेना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Vow can be a Noun or a Verb. It means to make a solemn promise or pledge to do a specified thing.',
                            sentence: 'Deva made a firm vow to study hard and score the highest marks in his final exams.',
                            synonyms: ['Promise', 'Swear'],
                            antonyms: ['Break promise', 'Betray']
                        }
                    },
                    {
                        q: 'What is the meaning of Turn?',
                        options: ['Stop walking (चलना बंद करना)', 'Change direction/Rotate (बदल देना/मुड़ जाना)', 'Run fast (तेज दौड़ना)', 'Jump up (ऊपर कूदना)'],
                        answer: 'Change direction/Rotate (बदल देना/मुड़ जाना)',
                        explanation: {
                            word: 'Turn',
                            hindi: 'बदल देना/मुड़ जाना',
                            partOfSpeech: 'Verb',
                            meaning: 'Turn is a Verb. It means to move in a circular direction wholly or partly around an axis or point, or to change in nature/direction.',
                            sentence: 'Jhanvi watched in amazement as the green caterpillar began to turn into a beautiful butterfly.',
                            synonyms: ['Rotate', 'Transform'],
                            antonyms: ['Straighten', 'Remain']
                        }
                    },
                    {
                        q: 'What is the meaning of Maize?',
                        options: ['Wheat (गेहूं)', 'Corn (मक्का)', 'Rice (चावल)', 'Barley (जौ)'],
                        answer: 'Corn (मक्का)',
                        explanation: {
                            word: 'Maize',
                            hindi: 'मक्का',
                            partOfSpeech: 'Noun',
                            meaning: 'Maize is a Noun. It is a cereal plant that yields large grains set in rows on a cob; also known as corn.',
                            sentence: 'Samriddhi Chaurasiya loves eating warm, roasted maize with salt during the rainy season.',
                            synonyms: ['Corn', 'Sweetcorn'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Race?',
                        options: ['Competition only (सिर्फ प्रतियोगिता)', 'Species/Lineage OR Running contest (प्रजाति/वंश या दौड़)', 'Animal (जानवर)', 'Time (समय)'],
                        answer: 'Species/Lineage OR Running contest (प्रजाति/वंश या दौड़)',
                        explanation: {
                            word: 'Race',
                            hindi: 'प्रजाति/वंश या दौड़',
                            partOfSpeech: 'Noun',
                            meaning: 'Race is a Noun. It has two main meanings: a group of people sharing the same culture/history/lineage, or a competition of speed.',
                            sentence: 'Human beings belong to the same human race regardless of where they live, Arpit Pal read in a science book.',
                            synonyms: ['Lineage', 'Species'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Apology?',
                        options: ['Punishment (सजा)', 'Asking for forgiveness (क्षमायाचना/माफी)', 'Reward (इनाम)', 'Scolding (डांट)'],
                        answer: 'Asking for forgiveness (क्षमायाचना/माफी)',
                        explanation: {
                            word: 'Apology',
                            hindi: 'क्षमायाचना/माफी',
                            partOfSpeech: 'Noun',
                            meaning: 'Apology is a Noun. It is a regretful acknowledgment of an offense, failure, or mistake.',
                            sentence: 'Kavya wrote a very sincere apology letter to her best friend after their silly argument.',
                            synonyms: ['Regret', 'Pardon'],
                            antonyms: ['Defiance', 'Justification']
                        }
                    },
                    {
                        q: 'What is the meaning of Apprehension?',
                        options: ['Excitement (उत्साह)', 'Anxiety/Fear (डर/आशंका)', 'Courage (साहस)', 'Happiness (खुशी)'],
                        answer: 'Anxiety/Fear (डर/आशंका)',
                        explanation: {
                            word: 'Apprehension',
                            hindi: 'डर/आशंका',
                            partOfSpeech: 'Noun',
                            meaning: 'Apprehension is a Noun. It means anxiety or fear that something bad or unpleasant will happen.',
                            sentence: 'Muskan felt a strong sense of apprehension before stepping onto the large stage for her speech.',
                            synonyms: ['Anxiety', 'Fear'],
                            antonyms: ['Confidence', 'Calmness']
                        }
                    },
                    {
                        q: 'What is the meaning of Moron?',
                        options: ['Genius (प्रतिभावान)', 'Stupid person/Idiot (मूर्ख)', 'Teacher (शिक्षक)', 'Doctor (डॉक्टर)'],
                        answer: 'Stupid person/Idiot (मूर्ख)',
                        explanation: {
                            word: 'Moron',
                            hindi: 'मूर्ख',
                            partOfSpeech: 'Noun',
                            meaning: 'Moron is a Noun. It is an informal and insulting word used for a stupid person.',
                            sentence: 'The careless driver acted like a complete moron by ignoring the red traffic light, Sanjana Nishad noticed.',
                            synonyms: ['Idiot', 'Fool'],
                            antonyms: ['Genius', 'Brain']
                        }
                    },
                    {
                        q: 'What is the meaning of Act?',
                        options: ['Sleep (सोना)', 'Take action/Deed (काम किया/कार्य)', 'Read (पढ़ना)', 'Run (दौड़ना)'],
                        answer: 'Take action/Deed (काम किया/कार्य)',
                        explanation: {
                            word: 'Act',
                            hindi: 'काम किया/कार्य',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Act can be a Noun or a Verb. It means to take action, do something, or a specific deed that someone has done.',
                            sentence: 'Helping the poor old man cross the busy street was a very kind act by Anubhav.',
                            synonyms: ['Deed', 'Action'],
                            antonyms: ['Inaction', 'Idleness']
                        }
                    },
                    {
                        q: 'What is the meaning of Accomplice?',
                        options: ['Police officer (पुलिस अधिकारी)', 'Partner in crime (सह-अपराधी)', 'Judge (न्यायाधीश)', 'Victim (पीड़ित)'],
                        answer: 'Partner in crime (सह-अपराधी)',
                        explanation: {
                            word: 'Accomplice',
                            hindi: 'सह-अपराधी',
                            partOfSpeech: 'Noun',
                            meaning: 'Accomplice is a Noun. It refers to a person who helps another commit a crime or do something wrong.',
                            sentence: 'The police not only arrested the main thief but also caught his hidden accomplice, Aniket told everyone.',
                            synonyms: ['Partner', 'Associate'],
                            antonyms: ['Opponent', 'Enemy']
                        }
                    },
                    {
                        q: 'What is the meaning of Threaten?',
                        options: ['Help (मदद करना)', 'Intimidate/Warn (धमकाना)', 'Protect (रक्षा करना)', 'Love (प्यार करना)'],
                        answer: 'Intimidate/Warn (धमकाना)',
                        explanation: {
                            word: 'Threaten',
                            hindi: 'धमकाना',
                            partOfSpeech: 'Verb',
                            meaning: 'Threaten is a Verb. It means to state one\'s intention to take hostile action against someone in order to frighten them.',
                            sentence: 'It is a serious crime to threaten someone over the phone, Deva warned his younger brother.',
                            synonyms: ['Intimidate', 'Menace'],
                            antonyms: ['Protect', 'Defend']
                        }
                    },
                    {
                        q: 'What is the meaning of Chase?',
                        options: ['Wait (इंतजार करना)', 'Pursue/Run after (पीछा करना)', 'Hide (छिपना)', 'Lead (नेतृत्व करना)'],
                        answer: 'Pursue/Run after (पीछा करना)',
                        explanation: {
                            word: 'Chase',
                            hindi: 'पीछा करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Chase is a Verb. It means to pursue in order to catch or catch up with someone or something.',
                            sentence: 'Jhanvi watched from her window as the police car began to chase the speeding van down the highway.',
                            synonyms: ['Pursue', 'Follow'],
                            antonyms: ['Escape', 'Run away']
                        }
                    },
                    {
                        q: 'What is the meaning of Drug?',
                        options: ['Wake up (जगाना)', 'Administer medicine/narcotic (नशा देना/दवा देना)', 'Cure completely (पूरी तरह ठीक करना)', 'Feed food (खाना खिलाना)'],
                        answer: 'Administer medicine/narcotic (नशा देना/दवा देना)',
                        explanation: {
                            word: 'Drug',
                            hindi: 'नशा देना/दवा देना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Drug can be a Noun or a Verb. As a verb, it means to administer a drug to someone in order to induce sleep, unconsciousness, or a stupor.',
                            sentence: 'The villain in the mystery movie tried to drug the hero\'s drink, but Samriddhi Chaurasiya knew he would escape.',
                            synonyms: ['Medicate', 'Intoxicate'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Intoxicating?',
                        options: ['Boring (उबाऊ)', 'Fascinating/Making drunk (नशीली/मदहोश करने वाली)', 'Healthy (स्वस्थ)', 'Ugly (बदसूरत)'],
                        answer: 'Fascinating/Making drunk (नशीली/मदहोश करने वाली)',
                        explanation: {
                            word: 'Intoxicating',
                            hindi: 'नशीली/मदहोश करने वाली',
                            partOfSpeech: 'Adjective',
                            meaning: 'Intoxicating is an Adjective. It describes something that causes someone to lose control of their faculties (like alcohol) or something extremely fascinating.',
                            sentence: 'The sweet scent of the fresh jasmine flowers in Arpit Pal\'s garden was highly intoxicating.',
                            synonyms: ['Thrilling', 'Inebriating'],
                            antonyms: ['Boring', 'Sobering']
                        }
                    },
                    {
                        q: 'What is the meaning of Dizziness?',
                        options: ['Energy (ऊर्जा)', 'Feeling faint/Spinning (चक्कर आना)', 'Happiness (खुशी)', 'Hunger (भूख)'],
                        answer: 'Feeling faint/Spinning (चक्कर आना)',
                        explanation: {
                            word: 'Dizziness',
                            hindi: 'चक्कर आना',
                            partOfSpeech: 'Noun',
                            meaning: 'Dizziness is a Noun. It is a sensation of spinning around and losing one\'s balance or feeling faint.',
                            sentence: 'After spinning around rapidly in circles for a minute, Kavya felt extreme dizziness and had to sit down immediately.',
                            synonyms: ['Giddiness', 'Lightheadedness'],
                            antonyms: ['Steadiness', 'Balance']
                        }
                    }
                ]
            },
            25: {
                name: 'Gathri 25',
                icon: '⚖️',
                questions: [
                    {
                        q: 'What is the meaning of File?',
                        options: ['Throw (फेंकना)', 'Submit officially (दायर करना/दर्ज करना)', 'Run away (भाग जाना)', 'Sleep (सोना)'],
                        answer: 'Submit officially (दायर करना/दर्ज करना)',
                        explanation: {
                            word: 'File',
                            hindi: 'दायर करना/दर्ज करना',
                            partOfSpeech: 'Verb/Noun',
                            meaning: 'File can be a Verb or a Noun. As a verb, it means to place a document in a cabinet or to officially submit a legal charge or complaint.',
                            sentence: 'Aniket advised his neighbor to file a police complaint immediately about the stolen bicycle.',
                            synonyms: ['Submit', 'Register'],
                            antonyms: ['Withdraw', 'Cancel']
                        }
                    },
                    {
                        q: 'What is the meaning of Stone pelting?',
                        options: ['Building a house (घर बनाना)', 'Throwing stones (पथराव)', 'Cleaning the road (सड़क साफ करना)', 'Running fast (तेज दौड़ना)'],
                        answer: 'Throwing stones (पथराव)',
                        explanation: {
                            word: 'Stone pelting',
                            hindi: 'पथराव',
                            partOfSpeech: 'Noun Phrase',
                            meaning: 'Stone pelting is a Noun Phrase. It refers to the act of throwing stones or rocks at someone or something, often during a riot or protest.',
                            sentence: 'The police officers had to intervene quickly to stop the dangerous stone pelting in the street, said Deva.',
                            synonyms: ['Rock throwing'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Wage?',
                        options: ['Gift (उपहार)', 'Daily pay/Salary (वेतन/मजदूरी)', 'Tax (कर)', 'Fine (जुर्माना)'],
                        answer: 'Daily pay/Salary (वेतन/मजदूरी)',
                        explanation: {
                            word: 'Wage',
                            hindi: 'वेतन/मजदूरी',
                            partOfSpeech: 'Noun',
                            meaning: 'Wage is a Noun. It is a fixed regular payment earned for work or services, typically paid on a daily or weekly basis.',
                            sentence: 'The factory workers demanded a higher daily wage for their hard physical labor, Jhanvi read in the newspaper.',
                            synonyms: ['Salary', 'Pay'],
                            antonyms: ['Debt', 'Loss']
                        }
                    },
                    {
                        q: 'What is the meaning of Honorarium?',
                        options: ['Free service (मुफ्त सेवा)', 'Voluntary payment/Fee (मानदेय/सम्मान राशि)', 'Bank loan (बैंक ऋण)', 'Income tax (आयकर)'],
                        answer: 'Voluntary payment/Fee (मानदेय/सम्मान राशि)',
                        explanation: {
                            word: 'Honorarium',
                            hindi: 'मानदेय/सम्मान राशि',
                            partOfSpeech: 'Noun',
                            meaning: 'Honorarium is a Noun. It is a payment given for professional services that are rendered nominally without a fixed charge.',
                            sentence: 'The guest speaker was given a small honorarium to respectfully thank him for his wonderful lecture, Samriddhi Chaurasiya noted.',
                            synonyms: ['Fee', 'Reward'],
                            antonyms: ['Penalty']
                        }
                    },
                    {
                        q: 'What is the meaning of Drainage?',
                        options: ['Fresh drinking water (पीने का साफ पानी)', 'Waste water system (नाली/जल निकासी)', 'Beautiful garden (सुंदर बगीचा)', 'House roof (घर की छत)'],
                        answer: 'Waste water system (नाली/जल निकासी)',
                        explanation: {
                            word: 'Drainage',
                            hindi: 'नाली/जल निकासी',
                            partOfSpeech: 'Noun',
                            meaning: 'Drainage is a Noun. It is the action or system of draining away waste water or other liquids from an area.',
                            sentence: 'The heavy monsoon rain caused floods because the city\'s drainage system was completely blocked with plastic, Arpit Pal observed.',
                            synonyms: ['Sewerage', 'Waste system'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Spy?',
                        options: ['Security guard (सुरक्षा गार्ड)', 'Secret agent/Observe secretly (जासूस/जासूसी करना)', 'Best friend (पक्का दोस्त)', 'School teacher (स्कूल शिक्षक)'],
                        answer: 'Secret agent/Observe secretly (जासूस/जासूसी करना)',
                        explanation: {
                            word: 'Spy',
                            hindi: 'जासूस/जासूसी करना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Spy can be a Noun or a Verb. As a Noun: A person who secretly collects information about enemies. As a Verb: To secretly observe someone.',
                            sentence: 'Kavya watched a highly exciting movie about a secret spy trying to save the world from danger.',
                            synonyms: ['Secret agent', 'Undercover'],
                            antonyms: ['Informant (public)']
                        }
                    },
                    {
                        q: 'What is the meaning of Sacred / Holy?',
                        options: ['Evil (बुरा)', 'Blessed/Religious (पवित्र)', 'Dirty (गंदा)', 'Common (सामान्य)'],
                        answer: 'Blessed/Religious (पवित्र)',
                        explanation: {
                            word: 'Sacred / Holy',
                            hindi: 'पवित्र',
                            partOfSpeech: 'Adjective',
                            meaning: 'Sacred and Holy are Adjectives. They describe something that is connected with God or dedicated to a religious purpose.',
                            sentence: 'The river Ganga is considered a very sacred river by millions of people across the country, said Muskan.',
                            synonyms: ['Blessed', 'Divine'],
                            antonyms: ['Cursed', 'Unholy']
                        }
                    },
                    {
                        q: 'What is the meaning of Make a big deal?',
                        options: ['Stay completely quiet (बिल्कुल शांत रहना)', 'Overreact/Make a fuss (बात का बतंगड़ बनाना)', 'Ignore the problem (समस्या को अनदेखा करना)', 'Agree easily (आसानी से सहमत होना)'],
                        answer: 'Overreact/Make a fuss (बात का बतंगड़ बनाना)',
                        explanation: {
                            word: 'Make a big deal',
                            hindi: 'बात का बतंगड़ बनाना',
                            partOfSpeech: 'Idiom',
                            meaning: 'Make a big deal is a very common Idiom. It means to treat a minor problem or event as if it were very important or serious.',
                            sentence: 'It was just a small mistake on the project, so Sanjana Nishad told her teammate not to make a big deal out of it.',
                            synonyms: ['Overreact', 'Exaggerate'],
                            antonyms: ['Downplay', 'Ignore']
                        }
                    },
                    {
                        q: 'What is the meaning of Recall?',
                        options: ['Forget entirely (पूरी तरह भूल जाना)', 'Remember/Bring back to mind (याद करना)', 'Sleep peacefully (शांति से सोना)', 'Cry loudly (जोर से रोना)'],
                        answer: 'Remember/Bring back to mind (याद करना)',
                        explanation: {
                            word: 'Recall',
                            hindi: 'याद करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Recall is a Verb. It means to bring a past event, fact, or situation back into your mind; to remember.',
                            sentence: 'Anubhav closed his eyes and tried hard to recall the exact science formula during his difficult examination.',
                            synonyms: ['Remember', 'Recollect'],
                            antonyms: ['Forget', 'Overlook']
                        }
                    },
                    {
                        q: 'What is the meaning of Altercation?',
                        options: ['Deep friendship (गहरी दोस्ती)', 'Noisy argument/Fight (लड़ाई-झगड़ा)', 'Birthday party (जन्मदिन की पार्टी)', 'Complete silence (पूर्ण शांति)'],
                        answer: 'Noisy argument/Fight (लड़ाई-झगड़ा)',
                        explanation: {
                            word: 'Altercation',
                            hindi: 'लड़ाई-झगड़ा',
                            partOfSpeech: 'Noun',
                            meaning: 'Altercation is a Noun. It is a loud, noisy, and angry argument or disagreement, especially in public.',
                            sentence: 'The referee had to step in quickly when a sudden altercation broke out between the two frustrated football players, Aniket saw.',
                            synonyms: ['Argument', 'Dispute'],
                            antonyms: ['Agreement', 'Harmony']
                        }
                    },
                    {
                        q: 'What is the meaning of Funeral?',
                        options: ['Birthday celebration (जन्मदिन का जश्न)', 'Burial ceremony (अंतिम संस्कार)', 'Wedding event (शादी का समारोह)', 'Music festival (संगीत समारोह)'],
                        answer: 'Burial ceremony (अंतिम संस्कार)',
                        explanation: {
                            word: 'Funeral',
                            hindi: 'अंतिम संस्कार',
                            partOfSpeech: 'Noun',
                            meaning: 'Funeral is a Noun. It is a ceremony held shortly after a person\'s death, usually including burial or cremation.',
                            sentence: 'Deva wore a formal black suit to attend his grandfather\'s funeral and pay his final respects.',
                            synonyms: ['Burial', 'Cremation ceremony'],
                            antonyms: ['Birth', 'Baptism']
                        }
                    },
                    {
                        q: 'What is the meaning of Arm?',
                        options: ['Human leg (इंसान का पैर)', 'Weapon OR Body part (हथियार या बांह)', 'Human head (इंसान का सिर)', 'Leather shoe (चमड़े का जूता)'],
                        answer: 'Weapon OR Body part (हथियार या बांह)',
                        explanation: {
                            word: 'Arm',
                            hindi: 'हथियार या बांह',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Arm can be a Noun or a Verb. As a noun, it means a limb of the body or a weapon. As a verb, it means to supply yourself or others with weapons.',
                            sentence: 'The police officer had to arm himself with a heavy shield before facing the angry, dangerous crowd, Jhanvi explained.',
                            synonyms: ['Weapon', 'Equip'],
                            antonyms: ['Disarm']
                        }
                    },
                    {
                        q: 'What is the meaning of Confront?',
                        options: ['Hide from someone (किसी से छिपना)', 'Face aggressively/Challenge (मुकाबला करना/सामना करना)', 'Run away quickly (तेजी से भाग जाना)', 'Agree without arguing (बिना बहस के मान लेना)'],
                        answer: 'Face aggressively/Challenge (मुकाबला करना/सामना करना)',
                        explanation: {
                            word: 'Confront',
                            hindi: 'मुकाबला करना/सामना करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Confront is a Verb. It means to face, meet, or deal with a difficult situation or person directly and aggressively.',
                            sentence: 'Samriddhi Chaurasiya decided to boldly confront the classmate who was spreading false rumors about her.',
                            synonyms: ['Challenge', 'Face up to'],
                            antonyms: ['Avoid', 'Evade']
                        }
                    },
                    {
                        q: 'What is the meaning of Goon?',
                        options: ['Traffic police (यातायात पुलिस)', 'Thug/Hooligan (गुंडा/बदमाश)', 'Bright student (होनहार छात्र)', 'Heart doctor (हृदय रोग विशेषज्ञ)'],
                        answer: 'Thug/Hooligan (गुंडा/बदमाश)',
                        explanation: {
                            word: 'Goon',
                            hindi: 'गुंडा/बदमाश',
                            partOfSpeech: 'Noun',
                            meaning: 'Goon is an informal Noun. It refers to a violent criminal who is paid to frighten or attack people.',
                            sentence: 'The brave shopkeeper grabbed a stick and chased away the goon who tried to steal money from his store, Arpit Pal cheered.',
                            synonyms: ['Thug', 'Hooligan'],
                            antonyms: ['Protector', 'Police']
                        }
                    },
                    {
                        q: 'What is the meaning of Culprit?',
                        options: ['Innocent victim (मासूम पीड़ित)', 'Guilty person/Offender (अपराधी/दोषी)', 'Court judge (न्यायालय का न्यायाधीश)', 'Defense lawyer (बचाव पक्ष का वकील)'],
                        answer: 'Guilty person/Offender (अपराधी/दोषी)',
                        explanation: {
                            word: 'Culprit',
                            hindi: 'अपराधी/दोषी',
                            partOfSpeech: 'Noun',
                            meaning: 'Culprit is a Noun. It is a person who is responsible for a crime or some other misdeed.',
                            sentence: 'After searching for clues all day, the smart detective finally found the real culprit who had stolen the diamond necklace, Kavya read in her mystery book.',
                            synonyms: ['Offender', 'Criminal'],
                            antonyms: ['Innocent', 'Victim']
                        }
                    }
                ]
            },
            26: {
                name: 'Gathri 26',
                icon: '🎯',
                questions: [
                    {
                        q: 'What is the meaning of Partial?',
                        options: ['Complete (पूरा)', 'Incomplete/Biased (आंशिक/पक्षपाती)', 'Heavy (भारी)', 'Fair (निष्पक्ष)'],
                        answer: 'Incomplete/Biased (आंशिक/पक्षपाती)',
                        explanation: {
                            word: 'Partial',
                            hindi: 'आंशिक/पक्षपाती',
                            partOfSpeech: 'Adjective',
                            meaning: 'Partial is an Adjective. It can mean existing only in part (incomplete) or favoring one side in a dispute above the other (biased).',
                            sentence: 'Aniket realized the referee was being partial to the opposing team during the football match.',
                            synonyms: ['Incomplete', 'Biased'],
                            antonyms: ['Complete', 'Fair']
                        }
                    },
                    {
                        q: 'What is the meaning of Confine?',
                        options: ['Let go (जाने देना)', 'Restrict/Limit (सीमित कर देना/कैद करना)', 'Search (खोजना)', 'Run away (भाग जाना)'],
                        answer: 'Restrict/Limit (सीमित कर देना/कैद करना)',
                        explanation: {
                            word: 'Confine',
                            hindi: 'सीमित कर देना/कैद करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Confine is a Verb. It means to keep someone or something within certain limits of space, quantity, or time.',
                            sentence: 'The doctor advised Deva to confine himself to his bedroom until his contagious fever was completely gone.',
                            synonyms: ['Restrict', 'Limit'],
                            antonyms: ['Release', 'Free']
                        }
                    },
                    {
                        q: 'What is the meaning of Condemn?',
                        options: ['Praise highly (बहुत तारीफ करना)', 'Disapprove/Criticize (निंदा करना)', 'Welcome (स्वागत करना)', 'Protect (रक्षा करना)'],
                        answer: 'Disapprove/Criticize (निंदा करना)',
                        explanation: {
                            word: 'Condemn',
                            hindi: 'निंदा करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Condemn is a Verb. It means to express complete disapproval of something, typically in public.',
                            sentence: 'The principal stood on the stage to strongly condemn the bad behavior of the senior students, making Jhanvi nod in agreement.',
                            synonyms: ['Criticize', 'Censure'],
                            antonyms: ['Praise', 'Approve']
                        }
                    },
                    {
                        q: 'What is the meaning of Exemplary?',
                        options: ['Very bad (बहुत बुरा)', 'Perfect model/Outstanding (मिसाल/आदर्श)', 'Ordinary (साधारण)', 'Hidden (छिपा हुआ)'],
                        answer: 'Perfect model/Outstanding (मिसाल/आदर्श)',
                        explanation: {
                            word: 'Exemplary',
                            hindi: 'मिसाल/आदर्श',
                            partOfSpeech: 'Adjective',
                            meaning: 'Exemplary is an Adjective. It describes something representing the best of its kind or serving as a desirable model for others to follow.',
                            sentence: 'Samriddhi Chaurasiya received a special award for her exemplary performance in the final science exhibition.',
                            synonyms: ['Perfect', 'Outstanding'],
                            antonyms: ['Deplorable', 'Poor']
                        }
                    },
                    {
                        q: 'What is the meaning of Swift?',
                        options: ['Slow (धीमा)', 'Fast/Quick (तीव्र/तेज)', 'Heavy (भारी)', 'Weak (कमजोर)'],
                        answer: 'Fast/Quick (तीव्र/तेज)',
                        explanation: {
                            word: 'Swift',
                            hindi: 'तीव्र/तेज',
                            partOfSpeech: 'Adjective',
                            meaning: 'Swift is an Adjective. It means happening quickly or moving with great speed.',
                            sentence: 'The cheetah is famous for its extremely swift movements when hunting for food in the wild, Arpit Pal read in his book.',
                            synonyms: ['Fast', 'Rapid'],
                            antonyms: ['Slow', 'Sluggish']
                        }
                    },
                    {
                        q: 'What is the meaning of Strict?',
                        options: ['Lenient (उदार)', 'Severe/Firm (कठोर/सख्त)', 'Funny (मजाकिया)', 'Soft (मुलायम)'],
                        answer: 'Severe/Firm (कठोर/सख्त)',
                        explanation: {
                            word: 'Strict',
                            hindi: 'कठोर/सख्त',
                            partOfSpeech: 'Adjective',
                            meaning: 'Strict is an Adjective. It describes someone who demands that rules concerning behavior are perfectly obeyed and observed.',
                            sentence: 'Our new mathematics teacher is very strict about completing homework on time, Kavya warned her classmates.',
                            synonyms: ['Severe', 'Firm'],
                            antonyms: ['Lenient', 'Easygoing']
                        }
                    },
                    {
                        q: 'What is the meaning of Habitat?',
                        options: ['Clothes (कपड़े)', 'Natural home (आवास/प्राकृतिक घर)', 'Vehicle (वाहन)', 'Food (भोजन)'],
                        answer: 'Natural home (आवास/प्राकृतिक घर)',
                        explanation: {
                            word: 'Habitat',
                            hindi: 'आवास/प्राकृतिक घर',
                            partOfSpeech: 'Noun',
                            meaning: 'Habitat is a Noun. It is the natural home or environment of an animal, plant, or other organism.',
                            sentence: 'Polar bears are slowly losing their natural ice habitat due to global warming, Muskan explained during her presentation.',
                            synonyms: ['Environment', 'Home'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Pledge?',
                        options: ['Joke (मजाक)', 'Solemn promise (प्रतिज्ञा/शपथ)', 'Fight (लड़ाई)', 'Secret (रहस्य)'],
                        answer: 'Solemn promise (प्रतिज्ञा/शपथ)',
                        explanation: {
                            word: 'Pledge',
                            hindi: 'प्रतिज्ञा/शपथ',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Pledge can be a Noun or a Verb. It means a serious promise or agreement to do something.',
                            sentence: 'Every morning during the school assembly, Sanjana Nishad takes a proud pledge to respect her nation.',
                            synonyms: ['Promise', 'Vow'],
                            antonyms: ['Betrayal', 'Breach']
                        }
                    },
                    {
                        q: 'What is the meaning of Varied?',
                        options: ['Identical (एक जैसा)', 'Diverse/Different types (तरह-तरह की/विभिन्न)', 'Boring (उबाऊ)', 'Fixed (निश्चित)'],
                        answer: 'Diverse/Different types (तरह-तरह की/विभिन्न)',
                        explanation: {
                            word: 'Varied',
                            hindi: 'तरह-तरह की/विभिन्न',
                            partOfSpeech: 'Adjective',
                            meaning: 'Varied is an Adjective. It means incorporating a number of different types or elements; showing variation or variety.',
                            sentence: 'The school cafeteria offers a highly varied menu so that students can try different types of healthy meals, noticed Anubhav.',
                            synonyms: ['Diverse', 'Assorted'],
                            antonyms: ['Uniform', 'Identical']
                        }
                    },
                    {
                        q: 'What is the meaning of Strive?',
                        options: ['Give up (हार मानना)', 'Make great effort (प्रयास करना/संघर्ष करना)', 'Sleep deeply (गहरी नींद सोना)', 'Cry loudly (जोर से रोना)'],
                        answer: 'Make great effort (प्रयास करना/संघर्ष करना)',
                        explanation: {
                            word: 'Strive',
                            hindi: 'प्रयास करना/संघर्ष करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Strive is a Verb. It means to make great efforts to achieve or obtain something.',
                            sentence: 'Aniket promised his parents that he would always strive for excellence in all his upcoming sports tournaments.',
                            synonyms: ['Try hard', 'Endeavor'],
                            antonyms: ['Give up', 'Surrender']
                        }
                    },
                    {
                        q: 'What is the meaning of Worthy?',
                        options: ['Useless (बेकार)', 'Deserving/Valuable (योग्य/लायक)', 'Cheap (सस्ता)', 'Fake (नकली)'],
                        answer: 'Deserving/Valuable (योग्य/लायक)',
                        explanation: {
                            word: 'Worthy',
                            hindi: 'योग्य/लायक',
                            partOfSpeech: 'Adjective',
                            meaning: 'Worthy is an Adjective. It describes someone or something having the qualities that deserve a specified reward, action, or regard.',
                            sentence: 'The brave firefighter was deemed a worthy recipient of the national medal of honor, Deva read in the news.',
                            synonyms: ['Deserving', 'Meritorious'],
                            antonyms: ['Unworthy', 'Useless']
                        }
                    },
                    {
                        q: 'What is the meaning of Circumstances?',
                        options: ['Circles (गोले)', 'Situations/Conditions (परिस्थितियां/हालात)', 'Weather (मौसम)', 'Rules (नियम)'],
                        answer: 'Situations/Conditions (परिस्थितियां/हालात)',
                        explanation: {
                            word: 'Circumstances',
                            hindi: 'परिस्थितियां/हालात',
                            partOfSpeech: 'Noun',
                            meaning: 'Circumstances is a Noun. It refers to the facts, conditions, or events connected with or relevant to a situation.',
                            sentence: 'Despite the difficult financial circumstances at home, Jhanvi managed to score top marks in her board exams.',
                            synonyms: ['Situations', 'Conditions'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Fragile?',
                        options: ['Strong (मजबूत)', 'Easily broken/Delicate (नाजुक/कोमल)', 'Heavy (भारी)', 'Flexible (लचीला)'],
                        answer: 'Easily broken/Delicate (नाजुक/कोमल)',
                        explanation: {
                            word: 'Fragile',
                            hindi: 'नाजुक/कोमल',
                            partOfSpeech: 'Adjective',
                            meaning: 'Fragile is an Adjective. It describes an object that is easily broken or damaged.',
                            sentence: 'Samriddhi Chaurasiya handled the beautiful glass vase very carefully because it was extremely fragile.',
                            synonyms: ['Delicate', 'Breakable'],
                            antonyms: ['Strong', 'Unbreakable']
                        }
                    },
                    {
                        q: 'What is the meaning of Deceased?',
                        options: ['Sick person (बीमार व्यक्ति)', 'Dead person (मृतक/जो मर गया हो)', 'Doctor (डॉक्टर)', 'Criminal (अपराधी)'],
                        answer: 'Dead person (मृतक/जो मर गया हो)',
                        explanation: {
                            word: 'Deceased',
                            hindi: 'मृतक/जो मर गया हो',
                            partOfSpeech: 'Adjective/Noun',
                            meaning: 'Deceased is an Adjective or Noun. It refers to a person who has recently died.',
                            sentence: 'The solemn lawyer read the final will of the deceased man to his grieving family members, Arpit Pal watched in the movie.',
                            synonyms: ['Dead', 'Departed'],
                            antonyms: ['Alive', 'Living']
                        }
                    },
                    {
                        q: 'What is the meaning of Noose?',
                        options: ['Sharp knife (तेज चाकू)', 'Loop of rope (फंदा/फांसी का फंदा)', 'Heavy chain (भारी जंजीर)', 'Iron rod (लोहे की छड़)'],
                        answer: 'Loop of rope (फंदा/फांसी का फंदा)',
                        explanation: {
                            word: 'Noose',
                            hindi: 'फंदा/फांसी का फंदा',
                            partOfSpeech: 'Noun',
                            meaning: 'Noose is a Noun. It is a loop at the end of a rope that gets tighter when the rope is pulled, often used for trapping animals or hanging.',
                            sentence: 'The skillful cowboy quickly tied a strong noose in his rope to catch the running horse, Kavya saw on television.',
                            synonyms: ['Loop', 'Snare'],
                            antonyms: []
                        }
                    }
                ]
            },
            27: {
                name: 'Gathri 27',
                icon: '🔍',
                questions: [
                    {
                        q: 'What is the meaning of Seek?',
                        options: ['Hide (छिपाना)', 'Look for/Want (खोजना/चाहना)', 'Give (देना)', 'Cry (रोना)'],
                        answer: 'Look for/Want (खोजना/चाहना)',
                        explanation: {
                            word: 'Seek',
                            hindi: 'खोजना/चाहना',
                            partOfSpeech: 'Verb',
                            meaning: 'Seek is a Verb. It means to attempt to find something, or to ask for something from someone.',
                            sentence: 'Aniket decided to seek help from his teacher to solve the difficult math problem.',
                            synonyms: ['Search', 'Pursue'],
                            antonyms: ['Ignore', 'Abandon']
                        }
                    },
                    {
                        q: 'What is the meaning of Allegation?',
                        options: ['Truth (सच)', 'Claim/Accusation (आरोप)', 'Reward (इनाम)', 'Friendship (दोस्ती)'],
                        answer: 'Claim/Accusation (आरोप)',
                        explanation: {
                            word: 'Allegation',
                            hindi: 'आरोप',
                            partOfSpeech: 'Noun',
                            meaning: 'Allegation is a Noun. It is a claim or assertion that someone has done something wrong or illegal, typically one made without proof yet.',
                            sentence: 'The police carefully investigated the serious allegation made against the suspected thief, Deva read in the news.',
                            synonyms: ['Accusation', 'Charge'],
                            antonyms: ['Denial', 'Exculpation']
                        }
                    },
                    {
                        q: 'What is the meaning of Apex?',
                        options: ['Bottom (निचला हिस्सा)', 'Top/Highest point (सर्वोच्च/शिखर)', 'Middle (मध्य)', 'Ground (जमीन)'],
                        answer: 'Top/Highest point (सर्वोच्च/शिखर)',
                        explanation: {
                            word: 'Apex',
                            hindi: 'सर्वोच्च/शिखर',
                            partOfSpeech: 'Noun',
                            meaning: 'Apex is a Noun. It refers to the top or highest part of something, especially one forming a point.',
                            sentence: 'Jhanvi finally reached the apex of the mountain after a long and tiring hike.',
                            synonyms: ['Peak', 'Summit'],
                            antonyms: ['Bottom', 'Base']
                        }
                    },
                    {
                        q: 'What is the meaning of Halt?',
                        options: ['Start (शुरू करना)', 'Stop (रोक देना/रुकना)', 'Run (दौड़ना)', 'Jump (कूदना)'],
                        answer: 'Stop (रोक देना/रुकना)',
                        explanation: {
                            word: 'Halt',
                            hindi: 'रोक देना/रुकना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Halt can be a Noun or a Verb. It means to bring or come to an abrupt stop.',
                            sentence: 'The traffic police officer raised his hand to halt all the speeding vehicles on the road.',
                            synonyms: ['Stop', 'Pause'],
                            antonyms: ['Start', 'Continue']
                        }
                    },
                    {
                        q: 'What is the meaning of Demolition?',
                        options: ['Construction (निर्माण)', 'Destruction (नष्ट कर देना/तोड़फोड़)', 'Decoration (सजावट)', 'Painting (रंगाई)'],
                        answer: 'Destruction (नष्ट कर देना/तोड़फोड़)',
                        explanation: {
                            word: 'Demolition',
                            hindi: 'नष्ट कर देना/तोड़फोड़',
                            partOfSpeech: 'Noun',
                            meaning: 'Demolition is a Noun. It is the action or process of demolishing or forcefully destroying a building or structure.',
                            sentence: 'Samriddhi Chaurasiya watched the safe demolition of the old, abandoned building near her house.',
                            synonyms: ['Destruction', 'Knocking down'],
                            antonyms: ['Construction', 'Building']
                        }
                    },
                    {
                        q: 'What is the meaning of Belong?',
                        options: ['Reject (अस्वीकार करना)', 'Be the property of (संबंधित/का होना)', 'Lose (खो देना)', 'Break (तोड़ना)'],
                        answer: 'Be the property of (संबंधित/का होना)',
                        explanation: {
                            word: 'Belong',
                            hindi: 'संबंधित/का होना',
                            partOfSpeech: 'Verb',
                            meaning: 'Belong is a Verb. It means to be the property of someone or to be a member of a particular group.',
                            sentence: 'Arpit Pal found a lost wallet in the playground and wondered to whom it might belong.',
                            synonyms: ['Owned by', 'Appertain to'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Further?',
                        options: ['Closer (करीब)', 'More distant/Additional (आगे/और अधिक)', 'Less (कम)', 'Behind (पीछे)'],
                        answer: 'More distant/Additional (आगे/और अधिक)',
                        explanation: {
                            word: 'Further',
                            hindi: 'आगे/और अधिक',
                            partOfSpeech: 'Adverb/Adjective',
                            meaning: 'Further is an Adverb or Adjective. It means more distant in space or time, or something additional.',
                            sentence: 'Kavya refused to answer any further questions until she finished reading the entire book.',
                            synonyms: ['Additional', 'More'],
                            antonyms: ['Closer', 'Nearer']
                        }
                    },
                    {
                        q: 'What is the meaning of Occupy?',
                        options: ['Leave empty (खाली छोड़ना)', 'Take control of/Fill (कब्जा करना/घेरना)', 'Share (बांटना)', 'Destroy (नष्ट करना)'],
                        answer: 'Take control of/Fill (कब्जा करना/घेरना)',
                        explanation: {
                            word: 'Occupy',
                            hindi: 'कब्जा करना/घेरना',
                            partOfSpeech: 'Verb',
                            meaning: 'Occupy is a Verb. It means to take control of a place, or to fill a space, time, or someone\'s mind.',
                            sentence: 'The invading army tried to occupy the peaceful city, but the brave soldiers defended it well.',
                            synonyms: ['Take over', 'Inhabit'],
                            antonyms: ['Vacate', 'Leave']
                        }
                    },
                    {
                        q: 'What is the meaning of Mislead?',
                        options: ['Guide correctly (सही रास्ता दिखाना)', 'Deceive/Give wrong idea (गुमराह करना)', 'Help (मदद करना)', 'Teach (पढ़ाना)'],
                        answer: 'Deceive/Give wrong idea (गुमराह करना)',
                        explanation: {
                            word: 'Mislead',
                            hindi: 'गुमराह करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Mislead is a Verb. It means to cause someone to have a wrong idea or impression about something.',
                            sentence: 'Muskan quickly realized that the fake advertisement was designed to mislead the innocent customers.',
                            synonyms: ['Deceive', 'Fool'],
                            antonyms: ['Guide', 'Enlighten']
                        }
                    },
                    {
                        q: 'What is the meaning of Hoarding?',
                        options: ['Donating (दान देना)', 'Collecting/Stockpiling (जमाखोरी)', 'Selling cheaply (सस्ते में बेचना)', 'Throwing away (फेंकना)'],
                        answer: 'Collecting/Stockpiling (जमाखोरी)',
                        explanation: {
                            word: 'Hoarding',
                            hindi: 'जमाखोरी',
                            partOfSpeech: 'Noun',
                            meaning: 'Hoarding is a Noun. It refers to the practice of collecting or accumulating large amounts of something (like food or money), often secretly.',
                            sentence: 'The government took strict action against the illegal hoarding of essential food supplies during the crisis.',
                            synonyms: ['Stockpiling', 'Accumulating'],
                            antonyms: ['Distributing', 'Sharing']
                        }
                    },
                    {
                        q: 'What is the meaning of Essential?',
                        options: ['Optional (वैकल्पिक)', 'Absolutely necessary (आवश्यक/जरूरी)', 'Useless (बेकार)', 'Expensive (महंगा)'],
                        answer: 'Absolutely necessary (आवश्यक/जरूरी)',
                        explanation: {
                            word: 'Essential',
                            hindi: 'आवश्यक/जरूरी',
                            partOfSpeech: 'Adjective',
                            meaning: 'Essential is an Adjective. It describes something that is completely necessary or extremely important.',
                            sentence: 'Clean water and fresh air are completely essential for human survival, Sanjana Nishad learned in science class.',
                            synonyms: ['Crucial', 'Necessary'],
                            antonyms: ['Unimportant', 'Optional']
                        }
                    },
                    {
                        q: 'What is the meaning of Spot?',
                        options: ['Ignore (अनदेखा करना)', 'Notice/See (देखा/पहचानना)', 'Hide (छिपाना)', 'Run away (भाग जाना)'],
                        answer: 'Notice/See (देखा/पहचानना)',
                        explanation: {
                            word: 'Spot',
                            hindi: 'देखा/पहचानना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Spot can be a Noun (a mark) or a Verb. As a verb, it means to see, notice, or recognize someone or something that is difficult to detect.',
                            sentence: 'Anubhav was very excited to spot a rare blue bird resting on his balcony.',
                            synonyms: ['Notice', 'See'],
                            antonyms: ['Overlook', 'Miss']
                        }
                    },
                    {
                        q: 'What is the meaning of Freight train?',
                        options: ['Passenger train (यात्री ट्रेन)', 'Goods train (माल गाड़ी)', 'Bullet train (बुलेट ट्रेन)', 'Toy train (खिलौना ट्रेन)'],
                        answer: 'Goods train (माल गाड़ी)',
                        explanation: {
                            word: 'Freight train',
                            hindi: 'माल गाड़ी',
                            partOfSpeech: 'Noun Phrase',
                            meaning: 'Freight train is a Noun Phrase. It is a train specifically designed for carrying goods and heavy cargo rather than people.',
                            sentence: 'Aniket watched the long freight train slowly pass through the railway station carrying tons of heavy coal.',
                            synonyms: ['Goods train', 'Cargo train'],
                            antonyms: ['Passenger train']
                        }
                    },
                    {
                        q: 'What is the meaning of Civilian?',
                        options: ['Soldier (सैनिक)', 'Normal citizen (असैनिक/नागरिक)', 'Police officer (पुलिस अधिकारी)', 'King (राजा)'],
                        answer: 'Normal citizen (असैनिक/नागरिक)',
                        explanation: {
                            word: 'Civilian',
                            hindi: 'असैनिक/नागरिक',
                            partOfSpeech: 'Noun',
                            meaning: 'Civilian is a Noun. It refers to a person who is not a member of the armed services or the police force.',
                            sentence: 'During the dangerous rescue mission, the brave soldiers safely evacuated every single civilian from the affected zone.',
                            synonyms: ['Citizen', 'Non-military'],
                            antonyms: ['Military', 'Soldier']
                        }
                    },
                    {
                        q: 'What is the meaning of Crescent?',
                        options: ['Full circle (पूरा गोल)', 'Curved shape (अर्धचन्द्राकार)', 'Square (चौकोर)', 'Triangle (त्रिकोण)'],
                        answer: 'Curved shape (अर्धचन्द्राकार)',
                        explanation: {
                            word: 'Crescent',
                            hindi: 'अर्धचन्द्राकार',
                            partOfSpeech: 'Noun/Adjective',
                            meaning: 'Crescent is a Noun or Adjective. It is the curved sickle shape of the waxing or waning moon.',
                            sentence: 'Deva looked up at the beautiful night sky and peacefully admired the glowing crescent moon.',
                            synonyms: ['Half-moon shape', 'Curve'],
                            antonyms: ['Full circle']
                        }
                    }
                ]
            },
            28: {
                name: 'Gathri 28',
                icon: '⚖️',
                questions: [
                    {
                        q: 'What is the meaning of Huge?',
                        options: ['Tiny (छोटा)', 'Very big/Large (विशाल/बड़ा)', 'Heavy (भारी)', 'Empty (खाली)'],
                        answer: 'Very big/Large (विशाल/बड़ा)',
                        explanation: {
                            word: 'Huge',
                            hindi: 'विशाल/बड़ा',
                            partOfSpeech: 'Adjective',
                            meaning: 'Huge is an Adjective. It describes something that is extremely large in size or amount.',
                            sentence: 'Jhanvi was amazed to see a huge elephant bathing in the river during her jungle safari.',
                            synonyms: ['Enormous', 'Massive'],
                            antonyms: ['Tiny', 'Small']
                        }
                    },
                    {
                        q: 'What is the meaning of Tutor?',
                        options: ['Doctor (चिकित्सक)', 'Private teacher/Coach (कोच/निजी शिक्षक)', 'Player (खिलाड़ी)', 'Driver (चालक)'],
                        answer: 'Private teacher/Coach (कोच/निजी शिक्षक)',
                        explanation: {
                            word: 'Tutor',
                            hindi: 'कोच/निजी शिक्षक',
                            partOfSpeech: 'Noun',
                            meaning: 'Tutor is a Noun. It refers to a private teacher who teaches a single student or a very small group.',
                            sentence: 'Arpit Pal hired a mathematics tutor to help him understand algebra better before the final exams.',
                            synonyms: ['Instructor', 'Coach'],
                            antonyms: ['Student', 'Pupil']
                        }
                    },
                    {
                        q: 'What is the meaning of Conspiracy?',
                        options: ['Celebration (जश्न)', 'Secret evil plan (षड़यंत्र/साजिश)', 'Accidental meeting (संयोग)', 'Friendship (दोस्ती)'],
                        answer: 'Secret evil plan (षड़यंत्र/साजिश)',
                        explanation: {
                            word: 'Conspiracy',
                            hindi: 'षड़यंत्र/साजिश',
                            partOfSpeech: 'Noun',
                            meaning: 'Conspiracy is a Noun. It is a secret plan by a group to do something unlawful or harmful.',
                            sentence: 'The brilliant detective successfully uncovered a dangerous conspiracy against the king, Aniket read in his historical novel.',
                            synonyms: ['Plot', 'Scheme'],
                            antonyms: ['Honesty', 'Loyalty']
                        }
                    },
                    {
                        q: 'What is the meaning of Capital Punishment?',
                        options: ['Financial fine (आर्थिक जुर्माना)', 'Death penalty (सजा-ए-मौत)', 'Life imprisonment (आजीवन कारावास)', 'Warning (चेतावनी)'],
                        answer: 'Death penalty (सजा-ए-मौत)',
                        explanation: {
                            word: 'Capital Punishment',
                            hindi: 'सजा-ए-मौत',
                            partOfSpeech: 'Noun',
                            meaning: 'Capital Punishment is a Noun. It is the legally authorized killing of someone as punishment for a very serious crime.',
                            sentence: 'Deva watched a news debate discussing whether capital punishment should be banned in modern society.',
                            synonyms: ['Death penalty', 'Execution'],
                            antonyms: ['Pardon', 'Life sentence']
                        }
                    },
                    {
                        q: 'What is the meaning of Crux / Gist?',
                        options: ['End of a story (कहानी का अंत)', 'Main point/Summary (मूल बिंदु/सारांश)', 'Beginning (शुरुआत)', 'Useless talk (बेकार की बात)'],
                        answer: 'Main point/Summary (मूल बिंदु/सारांश)',
                        explanation: {
                            word: 'Crux / Gist',
                            hindi: 'मूल बिंदु/सारांश',
                            partOfSpeech: 'Noun',
                            meaning: 'Crux and Gist are Nouns. They refer to the most important or central point of an issue, or the general meaning of a speech or text.',
                            sentence: 'The teacher asked Samriddhi Chaurasiya to quickly explain the crux of the long poem to the rest of the class.',
                            synonyms: ['Core', 'Summary', 'Essence'],
                            antonyms: ['Details', 'Extras']
                        }
                    },
                    {
                        q: 'What is the meaning of Call off?',
                        options: ['Start early (जल्दी शुरू करना)', 'Cancel (बंद करना/मना करना/रद्द करना)', 'Speak loudly (जोर से बोलना)', 'Invite (आमंत्रित करना)'],
                        answer: 'Cancel (बंद करना/मना करना/रद्द करना)',
                        explanation: {
                            word: 'Call off',
                            hindi: 'बंद करना/मना करना/रद्द करना',
                            partOfSpeech: 'Phrasal Verb',
                            meaning: 'Call off is a Phrasal Verb. It means to cancel an event or agreement that was previously planned.',
                            sentence: 'The school principal had to call off the annual sports day because of the heavy thunderstorm, disappointing Sanjana Nishad.',
                            synonyms: ['Cancel', 'Abandon'],
                            antonyms: ['Continue', 'Proceed']
                        }
                    },
                    {
                        q: 'What is the meaning of Handcuff?',
                        options: ['Watch (घड़ी)', 'Metal rings for wrists (हथकड़ी)', 'Hand gloves (दस्ताने)', 'Golden bracelet (सोने का कंगन)'],
                        answer: 'Metal rings for wrists (हथकड़ी)',
                        explanation: {
                            word: 'Handcuff',
                            hindi: 'हथकड़ी',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Handcuff can be a Noun or a Verb. It refers to a pair of lockable metal rings connected by a short chain, used to secure a prisoner\'s wrists.',
                            sentence: 'The brave police officer managed to place a heavy handcuff on the running thief, Anubhav observed.',
                            synonyms: ['Manacles', 'Cuffs'],
                            antonyms: ['Release', 'Unfasten']
                        }
                    },
                    {
                        q: 'What is the meaning of Shackle?',
                        options: ['Shoes (जूते)', 'Chains for legs/wrists (बेड़ी)', 'Necklace (हार)', 'Belt (बेल्ट)'],
                        answer: 'Chains for legs/wrists (बेड़ी)',
                        explanation: {
                            word: 'Shackle',
                            hindi: 'बेड़ी',
                            partOfSpeech: 'Noun',
                            meaning: 'Shackle is a Noun (often used in plural as shackles). It refers to a pair of metal rings connected by a chain, used to fasten a prisoner\'s ankles or wrists.',
                            sentence: 'The innocent man cried tears of joy when the judge ordered the guards to remove his heavy iron shackles, Kavya read.',
                            synonyms: ['Chains', 'Fetters'],
                            antonyms: ['Freedom', 'Emancipation']
                        }
                    },
                    {
                        q: 'What is the meaning of Beware?',
                        options: ['Be careless (लापरवाह रहना)', 'Be cautious/Alert (सावधान/खबरदार)', 'Sleep peacefully (शांति से सोना)', 'Attack (हमला करना)'],
                        answer: 'Be cautious/Alert (सावधान/खबरदार)',
                        explanation: {
                            word: 'Beware',
                            hindi: 'सावधान/खबरदार',
                            partOfSpeech: 'Verb',
                            meaning: 'Beware is a Verb. It means to be cautious and alert to risks or dangers.',
                            sentence: 'A large sign on the wooden gate warned everyone to beware of the fierce guard dog, so Muskan stayed away.',
                            synonyms: ['Watch out', 'Be careful'],
                            antonyms: ['Ignore', 'Be reckless']
                        }
                    },
                    {
                        q: 'What is the meaning of Scam?',
                        options: ['Honest business (ईमानदार व्यापार)', 'Fraud/Dishonest scheme (घोटाला/धोखाधड़ी)', 'Exam (परीक्षा)', 'Game (खेल)'],
                        answer: 'Fraud/Dishonest scheme (घोटाला/धोखाधड़ी)',
                        explanation: {
                            word: 'Scam',
                            hindi: 'घोटाला/धोखाधड़ी',
                            partOfSpeech: 'Noun',
                            meaning: 'Scam is a Noun. It is a dishonest scheme or a fraud designed to cheat people out of their money.',
                            sentence: 'Yash quickly realized that the text message offering him a free lottery ticket was actually a dangerous scam.',
                            synonyms: ['Fraud', 'Swindle'],
                            antonyms: ['Honesty', 'Truth']
                        }
                    },
                    {
                        q: 'What is the meaning of Fodder?',
                        options: ['Human food (इंसानों का खाना)', 'Animal feed (चारा)', 'Water (पानी)', 'Fertilizer (खाद)'],
                        answer: 'Animal feed (चारा)',
                        explanation: {
                            word: 'Fodder',
                            hindi: 'चारा',
                            partOfSpeech: 'Noun',
                            meaning: 'Fodder is a Noun. It refers to food, especially dried hay or straw, used for feeding cattle and other livestock.',
                            sentence: 'Early in the morning, the hardworking farmer carried a large bundle of green fodder to feed his hungry cows, Shivansh noticed.',
                            synonyms: ['Animal feed', 'Forage'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Glorify?',
                        options: ['Insult (अपमान करना)', 'Praise highly (महिमा मंडन/पूजना)', 'Ignore (अनदेखा करना)', 'Punish (सजा देना)'],
                        answer: 'Praise highly (महिमा मंडन/पूजना)',
                        explanation: {
                            word: 'Glorify',
                            hindi: 'महिमा मंडन/पूजना',
                            partOfSpeech: 'Verb',
                            meaning: 'Glorify is a Verb. It means to describe or represent something as admirable, especially something that is actually not good, or to praise someone highly.',
                            sentence: 'Stuti believes that movies should never glorify criminals or violence because it sets a bad example for children.',
                            synonyms: ['Praise', 'Exalt'],
                            antonyms: ['Condemn', 'Criticize']
                        }
                    },
                    {
                        q: 'What is the meaning of Enforcement?',
                        options: ['Breaking rules (नियम तोड़ना)', 'Application of a law (लागू करना)', 'Writing a book (किताब लिखना)', 'Making excuses (बहाने बनाना)'],
                        answer: 'Application of a law (लागू करना)',
                        explanation: {
                            word: 'Enforcement',
                            hindi: 'लागू करना',
                            partOfSpeech: 'Noun',
                            meaning: 'Enforcement is a Noun. It is the act of compelling observance of or compliance with a law, rule, or obligation.',
                            sentence: 'Strict enforcement of traffic rules is absolutely necessary to prevent severe accidents on the highway, Ladli argued.',
                            synonyms: ['Implementation', 'Application'],
                            antonyms: ['Violation', 'Disregard']
                        }
                    },
                    {
                        q: 'What is the meaning of Scammer?',
                        options: ['Police officer (पुलिस अधिकारी)', 'Fraudster/Cheat (धोखाधड़ी करने वाला)', 'Bank manager (बैंक मैनेजर)', 'Teacher (शिक्षक)'],
                        answer: 'Fraudster/Cheat (धोखाधड़ी करने वाला)',
                        explanation: {
                            word: 'Scammer',
                            hindi: 'धोखाधड़ी करने वाला',
                            partOfSpeech: 'Noun',
                            meaning: 'Scammer is a Noun. It refers to a person who commits fraud or participates in a dishonest scheme to steal money or information.',
                            sentence: 'The clever scammer tried to steal bank details over a phone call, but Hari Kishan immediately disconnected the line.',
                            synonyms: ['Fraudster', 'Swindler'],
                            antonyms: ['Honest person', 'Philanthropist']
                        }
                    },
                    {
                        q: 'What is the meaning of Flour?',
                        options: ['Beautiful plant (सुंदर पौधा)', 'Ground grain powder (आटा)', 'Floor of a house (फर्श)', 'Sugar (चीनी)'],
                        answer: 'Ground grain powder (आटा)',
                        explanation: {
                            word: 'Flour',
                            hindi: 'आटा',
                            partOfSpeech: 'Noun',
                            meaning: 'Flour is a Noun. It is a powder obtained by grinding grain, typically wheat, and used to make bread, cakes, and pastry.',
                            sentence: 'Adarsh went to the grocery store to buy two packets of fine wheat flour so his mother could bake fresh bread.',
                            synonyms: ['Ground grain', 'Powder'],
                            antonyms: []
                        }
                    }
                ]
            },
            29: {
                name: 'Gathri 29',
                icon: '🌍',
                questions: [
                    {
                        q: 'What is the meaning of Stall?',
                        options: ['Big shopping mall (बड़ा मॉल)', 'Small shop/Stand (छोटी दुकान)', 'Empty ground (खाली मैदान)', 'Heavy vehicle (भारी वाहन)'],
                        answer: 'Small shop/Stand (छोटी दुकान)',
                        explanation: {
                            word: 'Stall',
                            hindi: 'छोटी दुकान',
                            partOfSpeech: 'Noun',
                            meaning: 'Stall is a Noun. It is a small shop, stand, or booth in a market where goods are sold.',
                            sentence: 'Aniket bought some fresh apples from a small fruit stall near the crowded market.',
                            synonyms: ['Stand', 'Booth'],
                            antonyms: ['Supermarket', 'Mall']
                        }
                    },
                    {
                        q: 'What is the meaning of Fame?',
                        options: ['Secret (रहस्य)', 'Renown/Popularity (प्रसिद्धि/शोहरत)', 'Wealth (धन)', 'Failure (विफलता)'],
                        answer: 'Renown/Popularity (प्रसिद्धि/शोहरत)',
                        explanation: {
                            word: 'Fame',
                            hindi: 'प्रसिद्धि/शोहरत',
                            partOfSpeech: 'Noun',
                            meaning: 'Fame is a Noun. It refers to the state of being known or talked about by many people, especially on account of notable achievements.',
                            sentence: 'The young singer achieved international fame after his first beautiful song went viral on the internet, Deva noted.',
                            synonyms: ['Popularity', 'Glory'],
                            antonyms: ['Obscurity', 'Disgrace']
                        }
                    },
                    {
                        q: 'What is the meaning of Collapse?',
                        options: ['Build up (निर्माण करना)', 'Fall down/Fail (गिर जाना/ढह जाना)', 'Run fast (तेज दौड़ना)', 'Fly high (ऊंचा उड़ना)'],
                        answer: 'Fall down/Fail (गिर जाना/ढह जाना)',
                        explanation: {
                            word: 'Collapse',
                            hindi: 'गिर जाना/ढह जाना',
                            partOfSpeech: 'Verb',
                            meaning: 'Collapse is a Verb. It means to suddenly fall down or give way, usually because of weakness or structural failure.',
                            sentence: 'Jhanvi warned everyone that the old wooden bridge might collapse if too many heavy trucks crossed it at the same time.',
                            synonyms: ['Fall', 'Cave in'],
                            antonyms: ['Rise', 'Stand strong']
                        }
                    },
                    {
                        q: 'What is the meaning of Grief?',
                        options: ['Extreme joy (अत्यधिक खुशी)', 'Deep sorrow (दुःख/शोक)', 'Anger (गुस्सा)', 'Confusion (उलझन)'],
                        answer: 'Deep sorrow (दुःख/शोक)',
                        explanation: {
                            word: 'Grief',
                            hindi: 'दुःख/शोक',
                            partOfSpeech: 'Noun',
                            meaning: 'Grief is a Noun. It is an intense sorrow or deep sadness, especially caused by someone\'s death or a major loss.',
                            sentence: 'Samriddhi Chaurasiya felt immense grief when her beloved pet dog passed away last week.',
                            synonyms: ['Sorrow', 'Sadness'],
                            antonyms: ['Joy', 'Happiness']
                        }
                    },
                    {
                        q: 'What is the meaning of Financial?',
                        options: ['Medical (चिकित्सा संबंधी)', 'Relating to money (वित्तीय/आर्थिक)', 'Educational (शैक्षिक)', 'Physical (शारीरिक)'],
                        answer: 'Relating to money (वित्तीय/आर्थिक)',
                        explanation: {
                            word: 'Financial',
                            hindi: 'वित्तीय/आर्थिक',
                            partOfSpeech: 'Adjective',
                            meaning: 'Financial is an Adjective. It is used to describe things relating to finance, money, or how money is managed.',
                            sentence: 'Arpit Pal wants to become a professional accountant to help companies easily manage their financial records.',
                            synonyms: ['Economic', 'Monetary'],
                            antonyms: ['Non-financial']
                        }
                    },
                    {
                        q: 'What is the meaning of Locate?',
                        options: ['Hide away (छिपा देना)', 'Find/Situate (पता लगाना/स्थित होना)', 'Destroy completely (पूरी तरह नष्ट करना)', 'Forget easily (आसानी से भूल जाना)'],
                        answer: 'Find/Situate (पता लगाना/स्थित होना)',
                        explanation: {
                            word: 'Locate',
                            hindi: 'पता लगाना/स्थित होना',
                            partOfSpeech: 'Verb',
                            meaning: 'Locate is a Verb. It means to discover the exact place or position of something, or to set something in a particular place.',
                            sentence: 'Kavya used a digital map on her smart phone to quickly locate the new museum in the city.',
                            synonyms: ['Find', 'Discover'],
                            antonyms: ['Lose', 'Misplace']
                        }
                    },
                    {
                        q: 'What is the meaning of Crumble?',
                        options: ['Join together (एक साथ जोड़ना)', 'Break into fragments (टुकड़े-टुकड़े होना)', 'Paint brightly (चमकीला रंगना)', 'Freeze solid (जम जाना)'],
                        answer: 'Break into fragments (टुकड़े-टुकड़े होना)',
                        explanation: {
                            word: 'Crumble',
                            hindi: 'टुकड़े-टुकड़े होना',
                            partOfSpeech: 'Verb',
                            meaning: 'Crumble is a Verb. It means to break or fall apart into small fragments, especially as part of a process of deterioration.',
                            sentence: 'Muskan accidentally dropped the dry biscuit, watching it immediately crumble into tiny pieces on the floor.',
                            synonyms: ['Disintegrate', 'Fall apart'],
                            antonyms: ['Solidify', 'Unite']
                        }
                    },
                    {
                        q: 'What is the meaning of Trigger?',
                        options: ['Prevent from happening (होने से रोकना)', 'Cause to happen (कारण बनना/शुरू करना)', 'Sleep deeply (गहरी नींद सोना)', 'Laugh loudly (जोर से हंसना)'],
                        answer: 'Cause to happen (कारण बनना/शुरू करना)',
                        explanation: {
                            word: 'Trigger',
                            hindi: 'कारण बनना/शुरू करना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Trigger can be a Noun or a Verb. As a verb, it means to cause an event or situation to happen or exist suddenly.',
                            sentence: 'Sanjana Nishad learned in geography class that a sudden earthquake under the ocean can easily trigger a dangerous tsunami.',
                            synonyms: ['Cause', 'Provoke'],
                            antonyms: ['Prevent', 'Halt']
                        }
                    },
                    {
                        q: 'What is the meaning of Brutally?',
                        options: ['With great love (बहुत प्यार से)', 'Cruelly/Violently (क्रूरता से/बेरहमी से)', 'Very quietly (बहुत शांति से)', 'With respect (सम्मान के साथ)'],
                        answer: 'Cruelly/Violently (क्रूरता से/बेरहमी से)',
                        explanation: {
                            word: 'Brutally',
                            hindi: 'क्रूरता से/बेरहमी से',
                            partOfSpeech: 'Adverb',
                            meaning: 'Brutally is an Adverb. It describes an action done in a savagely violent, cruel, or harsh way.',
                            sentence: 'Anubhav was shocked to read a history book explaining how ancient kings brutally treated their defeated enemies.',
                            synonyms: ['Cruelly', 'Savagely'],
                            antonyms: ['Gently', 'Kindly']
                        }
                    },
                    {
                        q: 'What is the meaning of Hibernation?',
                        options: ['Running marathon (मैराथन दौड़ना)', 'Winter sleep (शीतनिद्रा)', 'Summer vacation (गर्मी की छुट्टी)', 'Daily exercise (रोज का व्यायाम)'],
                        answer: 'Winter sleep (शीतनिद्रा)',
                        explanation: {
                            word: 'Hibernation',
                            hindi: 'शीतनिद्रा',
                            partOfSpeech: 'Noun',
                            meaning: 'Hibernation is a Noun. It is the condition or period of an animal or plant spending the winter in a dormant state (deep sleep).',
                            sentence: 'Aniket watched a fascinating nature documentary explaining how brown bears go into deep hibernation during the freezing winter months.',
                            synonyms: ['Winter sleep', 'Dormancy'],
                            antonyms: ['Activity', 'Awakening']
                        }
                    },
                    {
                        q: 'What is the meaning of Migrant?',
                        options: ['Local resident (स्थानीय निवासी)', 'Person who moves for work (प्रवासी/स्थान बदलकर रहने वाला)', 'Police officer (पुलिस अधिकारी)', 'Wild animal (जंगली जानवर)'],
                        answer: 'Person who moves for work (प्रवासी/स्थान बदलकर रहने वाला)',
                        explanation: {
                            word: 'Migrant',
                            hindi: 'प्रवासी/स्थान बदलकर रहने वाला',
                            partOfSpeech: 'Noun',
                            meaning: 'Migrant is a Noun. It refers to a person who moves from one place to another, especially in order to find work or better living conditions.',
                            sentence: 'Deva saw a news report about how a migrant worker travels very far from his hometown just to find a reliable job.',
                            synonyms: ['Traveler', 'Immigrant'],
                            antonyms: ['Native', 'Local']
                        }
                    },
                    {
                        q: 'What is the meaning of Nomad tribe?',
                        options: ['Modern city dwellers (आधुनिक शहरवासी)', 'Wandering community (खानाबदोश कबीला)', 'School students (स्कूल के छात्र)', 'Factory workers (कारखाने के मजदूर)'],
                        answer: 'Wandering community (खानाबदोश कबीला)',
                        explanation: {
                            word: 'Nomad tribe',
                            hindi: 'खानाबदोश कबीला',
                            partOfSpeech: 'Noun Phrase',
                            meaning: 'Nomad tribe is a Noun Phrase. It refers to a community of people who do not have a permanent home and travel from place to place to find fresh pasture for their livestock.',
                            sentence: 'Jhanvi read an adventurous story about a strong nomad tribe that constantly travels across the hot desert on camels.',
                            synonyms: ['Wandering tribe', 'Gypsies'],
                            antonyms: ['Settled community']
                        }
                    },
                    {
                        q: 'What is the meaning of Persist?',
                        options: ['Give up easily (आसानी से हार मानना)', 'Continue firmly (कायम रहना/दृढ़ रहना)', 'Run away (भाग जाना)', 'Sleep deeply (गहरी नींद सोना)'],
                        answer: 'Continue firmly (कायम रहना/दृढ़ रहना)',
                        explanation: {
                            word: 'Persist',
                            hindi: 'कायम रहना/दृढ़ रहना',
                            partOfSpeech: 'Verb',
                            meaning: 'Persist is a Verb. It means to continue firmly or obstinately in an opinion or a course of action in spite of difficulty, opposition, or failure.',
                            sentence: 'If the heavy rain continues to persist throughout the night, Samriddhi Chaurasiya knows the narrow streets will definitely flood.',
                            synonyms: ['Continue', 'Persevere'],
                            antonyms: ['Stop', 'Give up']
                        }
                    },
                    {
                        q: 'What is the meaning of Assure?',
                        options: ['Frighten (डराना)', 'Give confidence/Promise (भरोसा दिलाना)', 'Ignore completely (पूरी तरह अनदेखा करना)', 'Threaten (धमकाना)'],
                        answer: 'Give confidence/Promise (भरोसा दिलाना)',
                        explanation: {
                            word: 'Assure',
                            hindi: 'भरोसा दिलाना',
                            partOfSpeech: 'Verb',
                            meaning: 'Assure is a Verb. It means to tell someone something positively or confidently to dispel any doubts they may have.',
                            sentence: 'Arpit Pal tried his best to assure his nervous teammate that they had practiced more than enough to win the final match.',
                            synonyms: ['Promise', 'Guarantee'],
                            antonyms: ['Doubt', 'Alarm']
                        }
                    },
                    {
                        q: 'What is the meaning of Chunk?',
                        options: ['Drop of liquid (तरल की बूंद)', 'Thick piece (टुकड़ा)', 'Long thread (लंबा धागा)', 'Empty space (खाली जगह)'],
                        answer: 'Thick piece (टुकड़ा)',
                        explanation: {
                            word: 'Chunk',
                            hindi: 'टुकड़ा',
                            partOfSpeech: 'Noun',
                            meaning: 'Chunk is a Noun. It refers to a thick, solid piece of something (like wood, stone, or food).',
                            sentence: 'Kavya carefully used a knife to cut a large chunk of delicious chocolate cake and placed it gently on her plate.',
                            synonyms: ['Piece', 'Block'],
                            antonyms: ['Crumb', 'Speck']
                        }
                    }
                ]
            },
            30: {
                name: 'Gathri 30',
                icon: '🎭',
                questions: [
                    {
                        q: 'What is the meaning of Hold?',
                        options: ['Let go entirely (पूरी तरह छोड़ देना)', 'Grasp/Organize (पकड़ना/आयोजित करना)', 'Throw far away (दूर फेंकना)', 'Break into pieces (टुकड़े-टुकड़े करना)'],
                        answer: 'Grasp/Organize (पकड़ना/आयोजित करना)',
                        explanation: {
                            word: 'Hold',
                            hindi: 'पकड़ना/आयोजित करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Hold is a Verb. It means to grasp or carry something, or to arrange and take part in an event/meeting.',
                            sentence: 'Aniket helped the teacher to hold the heavy books and correctly organize the classroom event.',
                            synonyms: ['Grasp', 'Keep', 'Organize'],
                            antonyms: ['Drop', 'Release', 'Cancel']
                        }
                    },
                    {
                        q: 'What is the meaning of Immortal?',
                        options: ['Dying quickly (जल्दी मरने वाला)', 'Living forever (अमर)', 'Very sick (बहुत बीमार)', 'Famous (प्रसिद्ध)'],
                        answer: 'Living forever (अमर)',
                        explanation: {
                            word: 'Immortal',
                            hindi: 'अमर',
                            partOfSpeech: 'Adjective',
                            meaning: 'Immortal is an Adjective. It describes someone or something that lives forever and never dies.',
                            sentence: 'In the ancient story, the brave warrior drank a magic potion to become completely immortal, Deva read.',
                            synonyms: ['Eternal', 'Undying'],
                            antonyms: ['Mortal', 'Perishable']
                        }
                    },
                    {
                        q: 'What is the meaning of Mortal?',
                        options: ['Safe from danger (खतरे से सुरक्षित)', 'Subject to death (मरने वाला/नश्वर)', 'Extremely strong (अत्यधिक मजबूत)', 'Living forever (अमर)'],
                        answer: 'Subject to death (मरने वाला/नश्वर)',
                        explanation: {
                            word: 'Mortal',
                            hindi: 'मरने वाला/नश्वर',
                            partOfSpeech: 'Adjective/Noun',
                            meaning: 'Mortal is an Adjective or Noun. It means being subject to death; something that must eventually die.',
                            sentence: 'Jhanvi read a philosophical poem explaining that every single human being on earth is inherently mortal.',
                            synonyms: ['Human', 'Perishable'],
                            antonyms: ['Immortal', 'Eternal']
                        }
                    },
                    {
                        q: 'What is the meaning of Native?',
                        options: ['Foreigner (विदेशी)', 'Local/Indigenous (स्वदेशी/मूल निवासी)', 'Unknown person (अज्ञात व्यक्ति)', 'Enemy (दुश्मन)'],
                        answer: 'Local/Indigenous (स्वदेशी/मूल निवासी)',
                        explanation: {
                            word: 'Native',
                            hindi: 'स्वदेशी/मूल निवासी',
                            partOfSpeech: 'Adjective/Noun',
                            meaning: 'Native is an Adjective or Noun. It refers to a person born in a specified place or associated with the place by birth.',
                            sentence: 'Samriddhi Chaurasiya is a true native of this village and perfectly understands all the local traditions.',
                            synonyms: ['Indigenous', 'Local'],
                            antonyms: ['Foreign', 'Alien']
                        }
                    },
                    {
                        q: 'What is the meaning of Godman?',
                        options: ['True god (सच्चा भगवान)', 'Charismatic guru/Cult leader (तांत्रिक बाबा/ढोंगी)', 'Innocent child (मासूम बच्चा)', 'Scientist (वैज्ञानिक)'],
                        answer: 'Charismatic guru/Cult leader (तांत्रिक बाबा/ढोंगी)',
                        explanation: {
                            word: 'Godman',
                            hindi: 'तांत्रिक बाबा/ढोंगी',
                            partOfSpeech: 'Noun',
                            meaning: 'Godman is a Noun. It is a term commonly used in India to describe a charismatic guru or holy man, often used critically when they are involved in fraud.',
                            sentence: 'The local police arrested the fake godman for illegally cheating innocent people out of their money, Arpit Pal shared.',
                            synonyms: ['Guru', 'Cult leader'],
                            antonyms: ['Rationalist']
                        }
                    },
                    {
                        q: 'What is the meaning of Incarnation?',
                        options: ['Death (मृत्यु)', 'Embodiment/Avatar (अवतार)', 'Destruction (विनाश)', 'Illness (बीमारी)'],
                        answer: 'Embodiment/Avatar (अवतार)',
                        explanation: {
                            word: 'Incarnation',
                            hindi: 'अवतार',
                            partOfSpeech: 'Noun',
                            meaning: 'Incarnation is a Noun. It means a person who embodies in the flesh a deity, spirit, or abstract quality.',
                            sentence: 'Kavya learned in her mythology class that Lord Krishna is widely worshipped as a divine incarnation of Lord Vishnu.',
                            synonyms: ['Avatar', 'Embodiment'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Coincidence?',
                        options: ['Planned meeting (नियोजित बैठक)', 'Chance occurrence (संयोग/इत्तेफाक)', 'Bad luck (दुर्भाग्य)', 'Hard work (कड़ी मेहनत)'],
                        answer: 'Chance occurrence (संयोग/इत्तेफाक)',
                        explanation: {
                            word: 'Coincidence',
                            hindi: 'संयोग/इत्तेफाक',
                            partOfSpeech: 'Noun',
                            meaning: 'Coincidence is a Noun. It is a remarkable concurrence of events or circumstances without apparent causal connection.',
                            sentence: 'It was a huge and surprising coincidence that Muskan and her best friend bought the exact same dress without planning it.',
                            synonyms: ['Chance', 'Accident'],
                            antonyms: ['Plan', 'Intention']
                        }
                    },
                    {
                        q: 'What is the meaning of Duration?',
                        options: ['Distance (दूरी)', 'Time period (समय/अवधि)', 'Weight (वजन)', 'Speed (गति)'],
                        answer: 'Time period (समय/अवधि)',
                        explanation: {
                            word: 'Duration',
                            hindi: 'समय/अवधि',
                            partOfSpeech: 'Noun',
                            meaning: 'Duration is a Noun. It refers to the time during which something continues or exists.',
                            sentence: 'Sanjana Nishad stayed completely silent and focused for the entire duration of her two-hour examination.',
                            synonyms: ['Time', 'Period'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Flawless?',
                        options: ['Full of mistakes (गलतियों से भरा)', 'Perfect/Without defect (कोई कमी न होना/त्रुटिहीन)', 'Ugly (बदसूरत)', 'Broken (टूटा हुआ)'],
                        answer: 'Perfect/Without defect (कोई कमी न होना/त्रुटिहीन)',
                        explanation: {
                            word: 'Flawless',
                            hindi: 'कोई कमी न होना/त्रुटिहीन',
                            partOfSpeech: 'Adjective',
                            meaning: 'Flawless is an Adjective. It describes something that is without any blemishes or imperfections; completely perfect.',
                            sentence: 'Anubhav confidently delivered a completely flawless performance during the highly competitive annual speech contest.',
                            synonyms: ['Perfect', 'Impeccable'],
                            antonyms: ['Flawed', 'Defective']
                        }
                    },
                    {
                        q: 'What is the meaning of Pretense?',
                        options: ['Total honesty (पूरी ईमानदारी)', 'Faking/False show (दिखावा/बहाना)', 'Hard reality (कठोर वास्तविकता)', 'Future prediction (भविष्य की भविष्यवाणी)'],
                        answer: 'Faking/False show (दिखावा/बहाना)',
                        explanation: {
                            word: 'Pretense',
                            hindi: 'दिखावा/बहाना',
                            partOfSpeech: 'Noun',
                            meaning: 'Pretense is a Noun. It is an attempt to make something that is not the case appear true; faking or showing off.',
                            sentence: 'Under the clever pretense of helping, the trickster actually managed to steal the valuable watch, Aniket realized.',
                            synonyms: ['Fakery', 'Charade'],
                            antonyms: ['Honesty', 'Reality']
                        }
                    },
                    {
                        q: 'What is the meaning of Perpetrator?',
                        options: ['Innocent victim (मासूम पीड़ित)', 'Criminal/Offender (अपराधी/दोषी)', 'Police officer (पुलिस अधिकारी)', 'Defense lawyer (बचाव पक्ष का वकील)'],
                        answer: 'Criminal/Offender (अपराधी/दोषी)',
                        explanation: {
                            word: 'Perpetrator',
                            hindi: 'अपराधी/दोषी',
                            partOfSpeech: 'Noun',
                            meaning: 'Perpetrator is a Noun. It refers to a person who carries out a harmful, illegal, or immoral act.',
                            sentence: 'The smart detective finally gathered enough solid evidence to arrest the true perpetrator of the complex crime, Deva noted.',
                            synonyms: ['Criminal', 'Offender'],
                            antonyms: ['Victim', 'Innocent']
                        }
                    },
                    {
                        q: 'What is the meaning of Procure?',
                        options: ['Lose forever (हमेशा के लिए खो देना)', 'Obtain/Get (प्राप्त करना/हासिल करना)', 'Destroy completely (पूरी तरह नष्ट करना)', 'Ignore completely (पूरी तरह अनदेखा करना)'],
                        answer: 'Obtain/Get (प्राप्त करना/हासिल करना)',
                        explanation: {
                            word: 'Procure',
                            hindi: 'प्राप्त करना/हासिल करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Procure is a Verb. It means to obtain something, especially with care, effort, or legal means.',
                            sentence: 'Jhanvi managed to successfully procure two extremely rare tickets for the highly anticipated weekend music concert.',
                            synonyms: ['Obtain', 'Acquire'],
                            antonyms: ['Lose', 'Forfeit']
                        }
                    },
                    {
                        q: 'What is the meaning of Point?',
                        options: ['Hide away (छिपा देना)', 'Main idea OR Indicate direction (बिंदु/मुद्दा या इशारा करना)', 'Round circle (गोल घेरा)', 'Ask a question (सवाल पूछना)'],
                        answer: 'Main idea OR Indicate direction (बिंदु/मुद्दा या इशारा करना)',
                        explanation: {
                            word: 'Point',
                            hindi: 'बिंदु/मुद्दा या इशारा करना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Point can be a Noun or a Verb. It refers to the core idea of a discussion, a dot, or the action of directing someone\'s attention by extending a finger.',
                            sentence: 'Samriddhi Chaurasiya used a long wooden stick to directly point at the most important location on the large geographical map.',
                            synonyms: ['Core issue', 'Indicate'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Racket?',
                        options: ['Honest charity (ईमानदार दान)', 'Illegal scheme/Fraud (ठग विद्या/धोखाधड़ी)', 'Quiet library (शांत पुस्तकालय)', 'Safe investment (सुरक्षित निवेश)'],
                        answer: 'Illegal scheme/Fraud (ठग विद्या/धोखाधड़ी)',
                        explanation: {
                            word: 'Racket',
                            hindi: 'ठग विद्या/धोखाधड़ी',
                            partOfSpeech: 'Noun',
                            meaning: 'Racket is a Noun. While it means a bat used in sports, in this context, it refers to an illegal or dishonest scheme for obtaining money.',
                            sentence: 'The brave local journalist exposed a massive financial racket operating secretly within the city, Arpit Pal read in the morning paper.',
                            synonyms: ['Fraud', 'Scheme'],
                            antonyms: ['Legal business']
                        }
                    },
                    {
                        q: 'What is the meaning of Raid?',
                        options: ['Casual visit (सामान्य मुलाकात)', 'Surprise attack/Police search (छापा/अचानक हमला)', 'Peaceful march (शांतिपूर्ण मार्च)', 'Birthday party (जन्मदिन की पार्टी)'],
                        answer: 'Surprise attack/Police search (छापा/अचानक हमला)',
                        explanation: {
                            word: 'Raid',
                            hindi: 'छापा/अचानक हमला',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Raid can be a Noun or a Verb. It is a rapid surprise attack or a sudden search conducted by police to find criminals or illegal goods.',
                            sentence: 'The city police conducted a sudden, early morning raid to safely catch the dangerous criminals hiding in the abandoned warehouse, Kavya watched on the news.',
                            synonyms: ['Search', 'Incursion'],
                            antonyms: ['Retreat', 'Leave alone']
                        }
                    }
                ]
            },
            31: {
                name: 'Gathri 31',
                icon: '⚖️',
                questions: [
                    {
                        q: 'What is the meaning of Several?',
                        options: ['One single item (एक ही)', 'Many/More than two (अनेक/कई सारे)', 'None at all (बिल्कुल नहीं)', 'Everything (सब कुछ)'],
                        answer: 'Many/More than two (अनेक/कई सारे)',
                        explanation: {
                            word: 'Several',
                            hindi: 'अनेक/कई सारे',
                            partOfSpeech: 'Adjective/Pronoun',
                            meaning: 'Several is an Adjective or Pronoun. It means more than two but not very many.',
                            sentence: 'Rahul checked his bag and realized he had brought several pens to the examination hall.',
                            synonyms: ['Various', 'Multiple'],
                            antonyms: ['None', 'One']
                        }
                    },
                    {
                        q: 'What is the meaning of Personnel?',
                        options: ['Private secret (निजी रहस्य)', 'Staff/Employees (स्टाफ/कर्मचारी)', 'Personal bag (निजी बैग)', 'Customer (ग्राहक)'],
                        answer: 'Staff/Employees (स्टाफ/कर्मचारी)',
                        explanation: {
                            word: 'Personnel',
                            hindi: 'स्टाफ/कर्मचारी',
                            partOfSpeech: 'Noun',
                            meaning: 'Personnel is a Noun. It refers to the people employed in an organization or engaged in an organized undertaking, such as military service.',
                            sentence: 'The hospital requires all medical personnel to wash their hands before entering the operation theater, noted Dr. Sharma.',
                            synonyms: ['Staff', 'Employees', 'Workforce'],
                            antonyms: ['Management', 'Customers']
                        }
                    },
                    {
                        q: 'What is the meaning of Amid?',
                        options: ['Outside (बाहर)', 'In the middle of/During (के बीच/दौरान)', 'After (बाद में)', 'Before (पहले)'],
                        answer: 'In the middle of/During (के बीच/दौरान)',
                        explanation: {
                            word: 'Amid',
                            hindi: 'के बीच/दौरान',
                            partOfSpeech: 'Preposition',
                            meaning: 'Amid is a Preposition. It means surrounded by or in the middle of something (often a noisy or confusing situation).',
                            sentence: 'Amid the loud cheers of the crowd, Virat confidently walked onto the cricket pitch.',
                            synonyms: ['Among', 'During'],
                            antonyms: ['Outside', 'Away from']
                        }
                    },
                    {
                        q: 'What is the meaning of Mine?',
                        options: ['Small stone (छोटा पत्थर)', 'Excavation site (खान/खदान)', 'High mountain (ऊंचा पहाड़)', 'Water well (कुआं)'],
                        answer: 'Excavation site (खान/खदान)',
                        explanation: {
                            word: 'Mine',
                            hindi: 'खान/खदान',
                            partOfSpeech: 'Noun',
                            meaning: 'Mine is a Noun. It is a deep hole or excavation in the earth for extracting coal or other valuable minerals. (Note: It is also a pronoun meaning "belonging to me").',
                            sentence: 'The brave workers wore hard hats and carried bright flashlights as they went deep into the dark coal mine.',
                            synonyms: ['Pit', 'Excavation'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Stubborn?',
                        options: ['Highly flexible (लचीला)', 'Obstinate/Rigid (जिद्दी/अड़ियल)', 'Very obedient (आज्ञाकारी)', 'Always happy (हमेशा खुश)'],
                        answer: 'Obstinate/Rigid (जिद्दी/अड़ियल)',
                        explanation: {
                            word: 'Stubborn',
                            hindi: 'जिद्दी/अड़ियल',
                            partOfSpeech: 'Adjective',
                            meaning: 'Stubborn is an Adjective. It describes a person who has a strong determination not to change their attitude or position on something.',
                            sentence: 'The stubborn little boy refused to eat his healthy vegetables, no matter what his mother said.',
                            synonyms: ['Obstinate', 'Rigid'],
                            antonyms: ['Compliant', 'Flexible']
                        }
                    },
                    {
                        q: 'What is the meaning of Merchant?',
                        options: ['Customer (ग्राहक)', 'Trader/Businessman (व्यापारी/सौदागर)', 'Farmer (किसान)', 'Soldier (सिपाही)'],
                        answer: 'Trader/Businessman (व्यापारी/सौदागर)',
                        explanation: {
                            word: 'Merchant',
                            hindi: 'व्यापारी/सौदागर',
                            partOfSpeech: 'Noun',
                            meaning: 'Merchant is a Noun. It refers to a person or company involved in wholesale trade, especially dealing with foreign countries or supplying goods.',
                            sentence: 'The wealthy spice merchant traveled across the ocean in a large ship to sell his valuable goods in India.',
                            synonyms: ['Trader', 'Dealer'],
                            antonyms: ['Buyer', 'Consumer']
                        }
                    },
                    {
                        q: 'What is the meaning of Bribe?',
                        options: ['Salary (वेतन)', 'Illegal payment (घूस/रिश्वत)', 'School fee (स्कूल की फीस)', 'Honest gift (ईमानदार उपहार)'],
                        answer: 'Illegal payment (घूस/रिश्वत)',
                        explanation: {
                            word: 'Bribe',
                            hindi: 'घूस/रिश्वत',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Bribe is a Noun or Verb. It is money or a gift offered illegally to persuade someone to do something for you.',
                            sentence: 'The corrupt official was immediately arrested by the police when he was caught accepting a huge cash bribe.',
                            synonyms: ['Payoff', 'Kickback'],
                            antonyms: ['Fine', 'Penalty']
                        }
                    },
                    {
                        q: 'What is the meaning of Sweeper?',
                        options: ['Cook (रसोइया)', 'Cleaner (झाड़ू-पोछा करने वाला)', 'Security guard (सुरक्षा गार्ड)', 'Manager (प्रबंधक)'],
                        answer: 'Cleaner (झाड़ू-पोछा करने वाला)',
                        explanation: {
                            word: 'Sweeper',
                            hindi: 'झाड़ू-पोछा करने वाला',
                            partOfSpeech: 'Noun',
                            meaning: 'Sweeper is a Noun. It refers to a person whose job is cleaning floors or streets using a broom.',
                            sentence: 'The hardworking sweeper arrived early in the morning to make sure the school corridors were perfectly clean before the students arrived.',
                            synonyms: ['Cleaner', 'Janitor'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Recruitment?',
                        options: ['Firing employees (कर्मचारियों को निकालना)', 'Hiring new people (नौकरी पर रखना/भर्ती)', 'Office party (दफ्तर की पार्टी)', 'Resignation (इस्तीफा)'],
                        answer: 'Hiring new people (नौकरी पर रखना/भर्ती)',
                        explanation: {
                            word: 'Recruitment',
                            hindi: 'नौकरी पर रखना/भर्ती',
                            partOfSpeech: 'Noun',
                            meaning: 'Recruitment is a Noun. It is the overall process of finding, selecting, and hiring new employees for an organization.',
                            sentence: 'The software company started its annual recruitment drive to hire fifty talented new engineers this year, Priya announced.',
                            synonyms: ['Hiring', 'Enrollment'],
                            antonyms: ['Dismissal', 'Firing']
                        }
                    },
                    {
                        q: 'What is the meaning of Red-handed?',
                        options: ['Having dirty hands (गंदे हाथ होना)', 'Caught during a crime (रंगे हाथों पकड़े जाना)', 'Wearing red gloves (लाल दस्ताने पहनना)', 'Painting a wall (दीवार रंगना)'],
                        answer: 'Caught during a crime (रंगे हाथों पकड़े जाना)',
                        explanation: {
                            word: 'Red-handed',
                            hindi: 'रंगे हाथों पकड़े जाना',
                            partOfSpeech: 'Adjective/Adverb',
                            meaning: 'Red-handed is an Adjective or Adverb. It means discovering a person in the exact act of doing something wrong or illegal.',
                            sentence: 'Amit caught his little brother completely red-handed trying to secretly steal cookies from the jar at midnight.',
                            synonyms: ['In the act', 'Guilty'],
                            antonyms: ['Innocent']
                        }
                    },
                    {
                        q: 'What is the meaning of Installment?',
                        options: ['Full payment (पूरा भुगतान)', 'Partial payment (किस्त)', 'Refund (पैसे वापस)', 'Discount (छूट)'],
                        answer: 'Partial payment (किस्त)',
                        explanation: {
                            word: 'Installment',
                            hindi: 'किस्त',
                            partOfSpeech: 'Noun',
                            meaning: 'Installment is a Noun. It is a sum of money due as one of several equal payments for something, spread over an agreed period of time.',
                            sentence: 'Neha finally paid the last installment on her car loan and was very happy to be completely debt-free.',
                            synonyms: ['Payment', 'Portion'],
                            antonyms: ['Lump sum']
                        }
                    },
                    {
                        q: 'What is the meaning of Refrain?',
                        options: ['Forcefully push (जबरदस्ती धकेलना)', 'Stop oneself/Avoid (रोकना/परहेज करना)', 'Sing a song (गाना गाना)', 'Run away (भाग जाना)'],
                        answer: 'Stop oneself/Avoid (रोकना/परहेज करना)',
                        explanation: {
                            word: 'Refrain',
                            hindi: 'रोकना/परहेज करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Refrain is a Verb. It means to stop oneself from doing something, usually a habit or action.',
                            sentence: 'The strict doctor told Sanjay to absolutely refrain from eating any sugary foods to protect his teeth.',
                            synonyms: ['Abstain', 'Avoid'],
                            antonyms: ['Indulge', 'Continue']
                        }
                    },
                    {
                        q: 'What is the meaning of Fugitive?',
                        options: ['Brave warrior (बहादुर योद्धा)', 'Escaped person (भगोड़ा)', 'Loyal friend (वफादार दोस्त)', 'Honest judge (ईमानदार न्यायाधीश)'],
                        answer: 'Escaped person (भगोड़ा)',
                        explanation: {
                            word: 'Fugitive',
                            hindi: 'भगोड़ा',
                            partOfSpeech: 'Noun',
                            meaning: 'Fugitive is a Noun. It refers to a person who has escaped from captivity or is hiding from the police and law enforcement.',
                            sentence: 'The police checkpoints were set up on every major highway to catch the dangerous fugitive who escaped from prison.',
                            synonyms: ['Escapee', 'Runaway'],
                            antonyms: ['Captive', 'Prisoner']
                        }
                    },
                    {
                        q: 'What is the meaning of Climate?',
                        options: ['Soil quality (मिट्टी की गुणवत्ता)', 'Weather conditions (जलवायु)', 'River water (नदी का पानी)', 'Mountain peak (पहाड़ की चोटी)'],
                        answer: 'Weather conditions (जलवायु)',
                        explanation: {
                            word: 'Climate',
                            hindi: 'जलवायु',
                            partOfSpeech: 'Noun',
                            meaning: 'Climate is a Noun. It is the general weather conditions prevailing in an area over a long period.',
                            sentence: 'The warm, tropical climate of southern India is absolutely perfect for growing healthy coconut trees, Meera learned.',
                            synonyms: ['Weather pattern', 'Atmosphere'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Grave?',
                        options: ['High mountain (ऊंचा पहाड़)', 'Tomb OR Serious (कब्र या गंभीर)', 'Small plant (छोटा पौधा)', 'Loud noise (तेज आवाज)'],
                        answer: 'Tomb OR Serious (कब्र या गंभीर)',
                        explanation: {
                            word: 'Grave',
                            hindi: 'कब्र या गंभीर',
                            partOfSpeech: 'Noun/Adjective',
                            meaning: 'Grave can be a Noun or an Adjective. As a Noun: A hole dug in the ground to bury a dead body. As an Adjective: Giving cause for alarm; very serious.',
                            sentence: 'The doctor informed Arjun that his grandfather\'s illness was a very grave matter requiring immediate surgery.',
                            synonyms: ['Tomb', 'Serious', 'Critical'],
                            antonyms: ['Trivial', 'Mild']
                        }
                    }
                ]
            },
            32: {
                name: 'Gathri 32',
                icon: '🌊',
                questions: [
                    {
                        q: 'What is the meaning of Unprecedented?',
                        options: ['Very old (बहुत पुराना)', 'Never done or known before (जो पहले कभी न हुआ हो)', 'Expected (अपेक्षित)', 'Useless (बेकार)'],
                        answer: 'Never done or known before (जो पहले कभी न हुआ हो)',
                        explanation: {
                            word: 'Unprecedented',
                            hindi: 'जो पहले कभी न हुआ हो',
                            partOfSpeech: 'Adjective',
                            meaning: 'Unprecedented is an Adjective. It describes an event or situation that has never happened or existed in the past.',
                            sentence: 'Rohan witnessed an unprecedented level of support from his community during the local festival.',
                            synonyms: ['Unparalleled', 'Extraordinary'],
                            antonyms: ['Normal', 'Common']
                        }
                    },
                    {
                        q: 'What is the meaning of Cloudburst?',
                        options: ['White clouds (सफेद बादल)', 'Sudden heavy rainfall (बादल फटना)', 'Clear sky (साफ आसमान)', 'Light drizzle (हल्की बूंदाबांदी)'],
                        answer: 'Sudden heavy rainfall (बादल फटना)',
                        explanation: {
                            word: 'Cloudburst',
                            hindi: 'बादल फटना',
                            partOfSpeech: 'Noun',
                            meaning: 'Cloudburst is a Noun. It is a sudden, very heavy rainfall, usually local in nature and brief in duration.',
                            sentence: 'The sudden cloudburst caused massive flooding in the small mountain village, Priya read in the newspaper.',
                            synonyms: ['Downpour', 'Deluge'],
                            antonyms: ['Drought', 'Dry spell']
                        }
                    },
                    {
                        q: 'What is the meaning of Glacier?',
                        options: ['Hot desert (गर्म रेगिस्तान)', 'River of ice (हिमनद/बर्फ की नदी)', 'Green forest (हरा जंगल)', 'Deep ocean (गहरा महासागर)'],
                        answer: 'River of ice (हिमनद/बर्फ की नदी)',
                        explanation: {
                            word: 'Glacier',
                            hindi: 'हिमनद/बर्फ की नदी',
                            partOfSpeech: 'Noun',
                            meaning: 'Glacier is a Noun. It is a slowly moving mass or river of ice formed by the accumulation and compaction of snow on mountains.',
                            sentence: 'Amit was fascinated to see the massive, slow-moving glacier during his adventurous trip to the Himalayas.',
                            synonyms: ['Icecap', 'Ice field'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Graze?',
                        options: ['Drink water (पानी पीना)', 'Eat grass (चरना)', 'Sleep outside (बाहर सोना)', 'Run fast (तेज दौड़ना)'],
                        answer: 'Eat grass (चरना)',
                        explanation: {
                            word: 'Graze',
                            hindi: 'चरना',
                            partOfSpeech: 'Verb',
                            meaning: 'Graze is a Verb. It means to eat grass in a field (usually done by cattle, sheep, etc.).',
                            sentence: 'Sunita sat under a tree and watched the sheep peacefully graze in the green meadow all afternoon.',
                            synonyms: ['Feed', 'Pasture'],
                            antonyms: ['Starve']
                        }
                    },
                    {
                        q: 'What is the meaning of Violent?',
                        options: ['Peaceful (शांतिपूर्ण)', 'Aggressive/Using physical force (हिंसक)', 'Very quiet (बहुत शांत)', 'Colorful (रंगीन)'],
                        answer: 'Aggressive/Using physical force (हिंसक)',
                        explanation: {
                            word: 'Violent',
                            hindi: 'हिंसक',
                            partOfSpeech: 'Adjective',
                            meaning: 'Violent is an Adjective. It describes using or involving physical force intended to hurt, damage, or kill someone or something.',
                            sentence: 'Kabir strictly advised his younger brother to stop playing such violent video games.',
                            synonyms: ['Brutal', 'Aggressive'],
                            antonyms: ['Peaceful', 'Gentle']
                        }
                    },
                    {
                        q: 'What is the meaning of Rampage?',
                        options: ['Walking slowly (धीरे चलना)', 'Violent or destructive behavior (हंगामा/हिंसक आचरण)', 'Sleeping deeply (गहरी नींद सोना)', 'Eating food (खाना खाना)'],
                        answer: 'Violent or destructive behavior (हंगामा/हिंसक आचरण)',
                        explanation: {
                            word: 'Rampage',
                            hindi: 'हंगामा/हिंसक आचरण',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Rampage is a Noun or Verb. It refers to a period of violent and uncontrollable behavior, typically involving destruction.',
                            sentence: 'Anjali saw a terrifying news report about a wild elephant going on a rampage through the local farms.',
                            synonyms: ['Riot', 'Uproar'],
                            antonyms: ['Calmness', 'Peace']
                        }
                    },
                    {
                        q: 'What is the meaning of Supervision?',
                        options: ['Ignoring someone (किसी को अनदेखा करना)', 'Observation/Directing (देखरेख/निगरानी)', 'Fighting (लड़ना)', 'Playing games (खेल खेलना)'],
                        answer: 'Observation/Directing (देखरेख/निगरानी)',
                        explanation: {
                            word: 'Supervision',
                            hindi: 'देखरेख/निगरानी',
                            partOfSpeech: 'Noun',
                            meaning: 'Supervision is a Noun. It is the action of overseeing, observing, or directing someone or a project to ensure it is done correctly.',
                            sentence: 'The students conducted the dangerous chemistry experiment only under the strict supervision of their teacher, Vikram.',
                            synonyms: ['Oversight', 'Management'],
                            antonyms: ['Neglect', 'Inattention']
                        }
                    },
                    {
                        q: 'What is the meaning of Intervene?',
                        options: ['Watch silently (चुपचाप देखना)', 'Step in/Get involved (हस्तक्षेप करना/बीच-बचाव करना)', 'Run away (भाग जाना)', 'Support a fight (लड़ाई का समर्थन करना)'],
                        answer: 'Step in/Get involved (हस्तक्षेप करना/बीच-बचाव करना)',
                        explanation: {
                            word: 'Intervene',
                            hindi: 'हस्तक्षेप करना/बीच-बचाव करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Intervene is a Verb. It means to come between people or things, especially to prevent an argument or alter a situation.',
                            sentence: 'Sneha had to intervene quickly to stop the heated argument between her two best friends.',
                            synonyms: ['Mediate', 'Interfere'],
                            antonyms: ['Ignore', 'Stand by']
                        }
                    },
                    {
                        q: 'What is the meaning of Intentional?',
                        options: ['Accidental (अचानक)', 'Done on purpose/Deliberate (जान-बूझकर)', 'Forgotten (भूल गया)', 'Helpful (मददगार)'],
                        answer: 'Done on purpose/Deliberate (जान-बूझकर)',
                        explanation: {
                            word: 'Intentional',
                            hindi: 'जान-बूझकर',
                            partOfSpeech: 'Adjective',
                            meaning: 'Intentional is an Adjective. It describes something that is done on purpose or deliberately.',
                            sentence: 'Rahul apologized to his mother, explaining that breaking the beautiful glass vase was not an intentional act.',
                            synonyms: ['Deliberate', 'Calculated'],
                            antonyms: ['Accidental', 'Unintentional']
                        }
                    },
                    {
                        q: 'What is the meaning of Mourn?',
                        options: ['Celebrate (जश्न मनाना)', 'Feel deep sorrow (विलाप/शोक करना)', 'Laugh loudly (जोर से हंसना)', 'Travel far (दूर यात्रा करना)'],
                        answer: 'Feel deep sorrow (विलाप/शोक करना)',
                        explanation: {
                            word: 'Mourn',
                            hindi: 'विलाप/शोक करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Mourn is a Verb. It means to feel or show deep sorrow or regret, especially for the death of someone.',
                            sentence: 'Meera and her entire family gathered together to mourn the heartbreaking loss of their beloved grandmother.',
                            synonyms: ['Grieve', 'Lament'],
                            antonyms: ['Rejoice', 'Celebrate']
                        }
                    },
                    {
                        q: 'What is the meaning of Toddler?',
                        options: ['Teenager (किशोर)', 'Young child (बहुत छोटा बच्चा/शिशु जो चलना सीख रहा हो)', 'Adult (वयस्क)', 'Old person (बुजुर्ग)'],
                        answer: 'Young child (बहुत छोटा बच्चा/शिशु जो चलना सीख रहा हो)',
                        explanation: {
                            word: 'Toddler',
                            hindi: 'बहुत छोटा बच्चा/शिशु जो चलना सीख रहा हो',
                            partOfSpeech: 'Noun',
                            meaning: 'Toddler is a Noun. It refers to a very young child, usually one who is just learning to walk.',
                            sentence: 'Arjun gently held the hand of the toddler as the little boy learned to take his first few steps in the park.',
                            synonyms: ['Young child', 'Tot'],
                            antonyms: ['Adult', 'Teenager']
                        }
                    },
                    {
                        q: 'What is the meaning of Infant?',
                        options: ['School boy (स्कूली लड़का)', 'Baby/Newborn (शिशु/नवजात)', 'College student (कॉलेज का छात्र)', 'Grandfather (दादाजी)'],
                        answer: 'Baby/Newborn (शिशु/नवजात)',
                        explanation: {
                            word: 'Infant',
                            hindi: 'शिशु/नवजात',
                            partOfSpeech: 'Noun',
                            meaning: 'Infant is a Noun. It is a very young child or newborn baby who cannot walk or talk yet.',
                            sentence: 'Neha quietly sang a soft lullaby to help the sleepy infant fall asleep comfortably in the wooden cradle.',
                            synonyms: ['Baby', 'Newborn'],
                            antonyms: ['Adult', 'Grown-up']
                        }
                    },
                    {
                        q: 'What is the meaning of Territory?',
                        options: ['Sky (आसमान)', 'Area of land/Region (इलाका/क्षेत्र)', 'Deep river (गहरी नदी)', 'Small house (छोटा घर)'],
                        answer: 'Area of land/Region (इलाका/क्षेत्र)',
                        explanation: {
                            word: 'Territory',
                            hindi: 'इलाका/क्षेत्र',
                            partOfSpeech: 'Noun',
                            meaning: 'Territory is a Noun. It is an area of land under the jurisdiction of a ruler or state, or an area defended by an animal.',
                            sentence: 'The fierce tiger aggressively protected its jungle territory from other wild animals, Sanjay noted in his wildlife journal.',
                            synonyms: ['Region', 'Domain'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Capsize?',
                        options: ['Fly in the air (हवा में उड़ना)', 'Overturn in water (नाव का पलट जाना)', 'Drive a car (कार चलाना)', 'Build a ship (जहाज बनाना)'],
                        answer: 'Overturn in water (नाव का पलट जाना)',
                        explanation: {
                            word: 'Capsize',
                            hindi: 'नाव का पलट जाना',
                            partOfSpeech: 'Verb',
                            meaning: 'Capsize is a Verb. It specifically means for a boat or ship to overturn in the water.',
                            sentence: 'The unexpectedly heavy storm caused the small wooden fishing boat to capsize in the middle of the deep lake, Pooja explained.',
                            synonyms: ['Overturn', 'Tip over'],
                            antonyms: ['Right', 'Stabilize']
                        }
                    },
                    {
                        q: 'What is the meaning of Destination?',
                        options: ['Starting point (शुरुआती बिंदु)', 'Final place/Goal (मंजिल/गंतव्य)', 'Long road (लंबी सड़क)', 'Train ticket (ट्रेन का टिकट)'],
                        answer: 'Final place/Goal (मंजिल/गंतव्य)',
                        explanation: {
                            word: 'Destination',
                            hindi: 'मंजिल/गंतव्य',
                            partOfSpeech: 'Noun',
                            meaning: 'Destination is a Noun. It is the place to which someone or something is going or being sent.',
                            sentence: 'After a long and tiring train journey, Aditya finally reached his beautiful holiday destination in the mountains.',
                            synonyms: ['Goal', 'Journey\'s end'],
                            antonyms: ['Starting point', 'Origin']
                        }
                    }
                ]
            },
            33: {
                name: 'Gathri 33',
                icon: '🏙️',
                questions: [
                    {
                        q: 'What is the meaning of Sanitation?',
                        options: ['Cooking food (खाना पकाना)', 'Cleanliness/Hygiene (स्वच्छता या सफाई)', 'Building houses (घर बनाना)', 'Dirty water (गंदा पानी)'],
                        answer: 'Cleanliness/Hygiene (स्वच्छता या सफाई)',
                        explanation: {
                            word: 'Sanitation',
                            hindi: 'स्वच्छता या सफाई',
                            partOfSpeech: 'Noun',
                            meaning: 'Sanitation is a Noun. It refers to the conditions relating to public health, especially the provision of clean drinking water and adequate sewage disposal.',
                            sentence: 'Rohan realized that maintaining proper sanitation in the village would prevent many waterborne diseases.',
                            synonyms: ['Hygiene', 'Cleanliness'],
                            antonyms: ['Dirtiness', 'Pollution']
                        }
                    },
                    {
                        q: 'What is the meaning of Subsequently?',
                        options: ['Before (पहले)', 'Afterwards/Later (तत्पश्चात/तुरंत बाद)', 'Never (कभी नहीं)', 'Always (हमेशा)'],
                        answer: 'Afterwards/Later (तत्पश्चात/तुरंत बाद)',
                        explanation: {
                            word: 'Subsequently',
                            hindi: 'तत्पश्चात/तुरंत बाद',
                            partOfSpeech: 'Adverb',
                            meaning: 'Subsequently is an Adverb. It means after a particular thing has happened; afterwards.',
                            sentence: 'The cricket team lost their first match but subsequently won all the remaining games in the tournament, Aisha cheered.',
                            synonyms: ['Afterwards', 'Later'],
                            antonyms: ['Previously', 'Before']
                        }
                    },
                    {
                        q: 'What is the meaning of However?',
                        options: ['Therefore (इसलिए)', 'But/Nevertheless (हालांकि)', 'Because (क्योंकि)', 'Always (हमेशा)'],
                        answer: 'But/Nevertheless (हालांकि)',
                        explanation: {
                            word: 'However',
                            hindi: 'हालांकि',
                            partOfSpeech: 'Adverb',
                            meaning: 'However is an Adverb. It is used to introduce a statement that contrasts with or seems to contradict something that has been said previously.',
                            sentence: 'The mathematics exam was extremely difficult; however, Manish managed to score the highest marks in his class.',
                            synonyms: ['Nevertheless', 'But'],
                            antonyms: ['Consequently', 'Therefore']
                        }
                    },
                    {
                        q: 'What is the meaning of Contractor?',
                        options: ['Teacher (शिक्षक)', 'Builder/Agreement holder (ठेकेदार)', 'Doctor (डॉक्टर)', 'Farmer (किसान)'],
                        answer: 'Builder/Agreement holder (ठेकेदार)',
                        explanation: {
                            word: 'Contractor',
                            hindi: 'ठेकेदार',
                            partOfSpeech: 'Noun',
                            meaning: 'Contractor is a Noun. It refers to a person or company that undertakes a contract to provide materials or labor to perform a service or do a job.',
                            sentence: 'The government hired a reliable private contractor to quickly repair the damaged highway before the monsoon season started.',
                            synonyms: ['Builder', 'Supplier'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Hike?',
                        options: ['Decrease/Fall (गिरावट)', 'Increase/Rise (बढ़ोतरी)', 'Hide completely (पूरी तरह छिपना)', 'Run fast (तेज दौड़ना)'],
                        answer: 'Increase/Rise (बढ़ोतरी)',
                        explanation: {
                            word: 'Hike',
                            hindi: 'बढ़ोतरी',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Hike is a Noun or Verb. In this context, it means a sharp increase, especially in price, salary, or taxes. (It can also mean a long walk).',
                            sentence: 'Due to the sudden hike in petrol prices, Geeta decided to start using public transport for her daily office commute.',
                            synonyms: ['Increase', 'Rise'],
                            antonyms: ['Decrease', 'Drop']
                        }
                    },
                    {
                        q: 'What is the meaning of Demonstration?',
                        options: ['Quiet meeting (शांत बैठक)', 'Protest/Display (विरोध या प्रदर्शन)', 'Sleeping (सोना)', 'Building (निर्माण)'],
                        answer: 'Protest/Display (विरोध या प्रदर्शन)',
                        explanation: {
                            word: 'Demonstration',
                            hindi: 'विरोध या प्रदर्शन',
                            partOfSpeech: 'Noun',
                            meaning: 'Demonstration is a Noun. It is a public meeting or march protesting against something or expressing views on an issue.',
                            sentence: 'Thousands of local farmers gathered in the city center for a peaceful demonstration regarding the new agricultural laws.',
                            synonyms: ['Protest', 'Exhibition'],
                            antonyms: ['Concealment', 'Hiding']
                        }
                    },
                    {
                        q: 'What is the meaning of Pelt?',
                        options: ['Catch softly (आराम से पकड़ना)', 'Throw things at (फेंकने का कार्य/मारना)', 'Sing loudly (जोर से गाना)', 'Run away (भाग जाना)'],
                        answer: 'Throw things at (फेंकने का कार्य/मारना)',
                        explanation: {
                            word: 'Pelt',
                            hindi: 'फेंकने का कार्य/मारना',
                            partOfSpeech: 'Verb',
                            meaning: 'Pelt is a Verb. It means to attack someone by repeatedly hurling things at them.',
                            sentence: 'The angry mob started to pelt heavy stones at the empty buses during the violent riot, frightening the residents.',
                            synonyms: ['Throw', 'Bombard'],
                            antonyms: ['Catch', 'Hold']
                        }
                    },
                    {
                        q: 'What is the meaning of Massive?',
                        options: ['Very small (बहुत छोटा)', 'Huge/Very big (बहुत बड़ा)', 'Light weight (हल्का)', 'Invisible (अदृश्य)'],
                        answer: 'Huge/Very big (बहुत बड़ा)',
                        explanation: {
                            word: 'Massive',
                            hindi: 'बहुत बड़ा',
                            partOfSpeech: 'Adjective',
                            meaning: 'Massive is an Adjective. It describes something exceptionally large, heavy, and solid.',
                            sentence: 'After the terrible storm, a massive tree fell directly across the main road, completely blocking the morning traffic.',
                            synonyms: ['Huge', 'Enormous'],
                            antonyms: ['Tiny', 'Minute']
                        }
                    },
                    {
                        q: 'What is the meaning of Scorching heat?',
                        options: ['Freezing cold (कड़ाके की ठंड)', 'Extreme/Burning heat (खतरनाक गर्मी/झुलसाने वाली गर्मी)', 'Heavy rain (भारी बारिश)', 'Pleasant breeze (सुहावनी हवा)'],
                        answer: 'Extreme/Burning heat (खतरनाक गर्मी/झुलसाने वाली गर्मी)',
                        explanation: {
                            word: 'Scorching heat',
                            hindi: 'खतरनाक गर्मी/झुलसाने वाली गर्मी',
                            partOfSpeech: 'Noun Phrase',
                            meaning: 'Scorching heat is a Noun Phrase. It refers to weather that is extremely hot, to the point of burning or parching.',
                            sentence: 'Walking barefoot on the sandy beach in the scorching heat of the summer afternoon severely burned Tarun\'s feet.',
                            synonyms: ['Blistering heat', 'Extreme heat'],
                            antonyms: ['Freezing cold']
                        }
                    },
                    {
                        q: 'What is the meaning of Luxurious?',
                        options: ['Very poor (बहुत गरीब)', 'Expensive/Comfortable (शान शौकत/आलीशान)', 'Broken (टूटा हुआ)', 'Cheap (सस्ता)'],
                        answer: 'Expensive/Comfortable (शान शौकत/आलीशान)',
                        explanation: {
                            word: 'Luxurious',
                            hindi: 'शान शौकत/आलीशान',
                            partOfSpeech: 'Adjective',
                            meaning: 'Luxurious is an Adjective. It describes something extremely comfortable, elegant, or enjoyable, especially in a way that involves great expense.',
                            sentence: 'For their tenth wedding anniversary, Mr. and Mrs. Kapoor booked a stay in a highly luxurious five-star hotel in Mumbai.',
                            synonyms: ['Lavish', 'Opulent'],
                            antonyms: ['Poor', 'Cheap']
                        }
                    },
                    {
                        q: 'What is the meaning of Pristine?',
                        options: ['Very dirty (बहुत गंदा)', 'Spotless/Original condition (सबसे स्वच्छ/प्राचीन)', 'Broken down (खराब)', 'Crowded (भीड़भाड़ वाला)'],
                        answer: 'Spotless/Original condition (सबसे स्वच्छ/प्राचीन)',
                        explanation: {
                            word: 'Pristine',
                            hindi: 'सबसे स्वच्छ/प्राचीन',
                            partOfSpeech: 'Adjective',
                            meaning: 'Pristine is an Adjective. It means in its original condition, unspoiled, or completely clean and spotless.',
                            sentence: 'The hidden mountain valley was famous for its pristine rivers and beautifully untouched natural forests.',
                            synonyms: ['Spotless', 'Unspoiled'],
                            antonyms: ['Dirty', 'Polluted']
                        }
                    },
                    {
                        q: 'What is the meaning of Indeed?',
                        options: ['Never (कभी नहीं)', 'Truly/In fact (वास्तव में/सचमुच)', 'False (गलत)', 'Maybe (शायद)'],
                        answer: 'Truly/In fact (वास्तव में/सचमुच)',
                        explanation: {
                            word: 'Indeed',
                            hindi: 'वास्तव में/सचमुच',
                            partOfSpeech: 'Adverb',
                            meaning: 'Indeed is an Adverb. It is used to emphasize a statement or response confirming something already suggested.',
                            sentence: '"It is indeed a proud moment for our country to win the gold medal," the sports minister happily declared on television.',
                            synonyms: ['Truly', 'Certainly'],
                            antonyms: ['Doubtfully']
                        }
                    },
                    {
                        q: 'What is the meaning of Explore?',
                        options: ['Ignore totally (पूरी तरह अनदेखा करना)', 'Investigate/Discover (पता लगाना या खोजना)', 'Destroy (नष्ट करना)', 'Hide (छिपाना)'],
                        answer: 'Investigate/Discover (पता लगाना या खोजना)',
                        explanation: {
                            word: 'Explore',
                            hindi: 'पता लगाना या खोजना',
                            partOfSpeech: 'Verb',
                            meaning: 'Explore is a Verb. It means to travel through an unfamiliar area in order to learn about it, or to inquire into or discuss a subject in detail.',
                            sentence: 'During his summer vacation, Kabir rented a bicycle to completely explore the historic ruins of the ancient city.',
                            synonyms: ['Investigate', 'Discover'],
                            antonyms: ['Ignore', 'Overlook']
                        }
                    },
                    {
                        q: 'What is the meaning of Splendid?',
                        options: ['Very bad (बहुत खराब)', 'Magnificent/Excellent (शानदार)', 'Boring (उबाऊ)', 'Ugly (बदसूरत)'],
                        answer: 'Magnificent/Excellent (शानदार)',
                        explanation: {
                            word: 'Splendid',
                            hindi: 'शानदार',
                            partOfSpeech: 'Adjective',
                            meaning: 'Splendid is an Adjective. It describes something magnificent, very impressive, or excellent.',
                            sentence: 'The royal palace looked absolutely splendid when it was fully decorated with thousands of colorful lights for the Diwali festival.',
                            synonyms: ['Magnificent', 'Excellent'],
                            antonyms: ['Terrible', 'Awful']
                        }
                    },
                    {
                        q: 'What is the meaning of Treat?',
                        options: ['Ignore completely (पूरी तरह अनदेखा करना)', 'Behave towards/Deal with (व्यवहार करना)', 'Run fast (तेज दौड़ना)', 'Break down (टूट जाना)'],
                        answer: 'Behave towards/Deal with (व्यवहार करना)',
                        explanation: {
                            word: 'Treat',
                            hindi: 'व्यवहार करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Treat is a Verb. It means to behave towards or deal with someone or something in a certain way. (It can also mean giving medical care or paying for someone\'s food/entertainment).',
                            sentence: 'The wise principal advised his teachers to always treat all their students with equal respect and fairness, regardless of their backgrounds.',
                            synonyms: ['Behave towards', 'Handle'],
                            antonyms: ['Ignore', 'Mistreat']
                        }
                    }
                ]
            },
            34: {
                name: 'Gathri 34',
                icon: '⚔️',
                questions: [
                    {
                        q: 'What is the meaning of Brute force?',
                        options: ['Soft touch (हल्का स्पर्श)', 'Excessive physical power (अंधाधुंध ताकत)', 'Clever trick (चालाकी)', 'Gentle push (हल्का धक्का)'],
                        answer: 'Excessive physical power (अंधाधुंध ताकत)',
                        explanation: {
                            word: 'Brute force',
                            hindi: 'अंधाधुंध ताकत',
                            partOfSpeech: 'Noun Phrase',
                            meaning: 'Brute force is a Noun Phrase. It refers to relying entirely on physical strength or power rather than intelligence or strategy.',
                            sentence: 'The rescue team had to use brute force to break open the jammed wooden door and save the trapped family.',
                            synonyms: ['Muscle power', 'Sheer strength'],
                            antonyms: ['Finesse', 'Strategy']
                        }
                    },
                    {
                        q: 'What is the meaning of Stare?',
                        options: ['Close eyes (आंखें बंद करना)', 'Look fixedly/Gaze (घूरना)', 'Blink quickly (पलकें झपकाना)', 'Look away (दूसरी तरफ देखना)'],
                        answer: 'Look fixedly/Gaze (घूरना)',
                        explanation: {
                            word: 'Stare',
                            hindi: 'घूरना',
                            partOfSpeech: 'Verb',
                            meaning: 'Stare is a Verb. It means to look at someone or something with a fixed gaze, often with wide-open eyes.',
                            sentence: 'Priya\'s mother taught her that it is considered very impolite to constantly stare at strangers in public places.',
                            synonyms: ['Gaze', 'Glare'],
                            antonyms: ['Glance', 'Look away']
                        }
                    },
                    {
                        q: 'What is the meaning of Often?',
                        options: ['Rarely (शायद ही कभी)', 'Frequently/Many times (अक्सर/बार-बार)', 'Never (कभी नहीं)', 'Once (एक बार)'],
                        answer: 'Frequently/Many times (अक्सर/बार-बार)',
                        explanation: {
                            word: 'Often',
                            hindi: 'अक्सर/बार-बार',
                            partOfSpeech: 'Adverb',
                            meaning: 'Often is an Adverb. It means frequently or many times.',
                            sentence: 'Rohan often visits the local library on his weekends to read newly published historical novels.',
                            synonyms: ['Frequently', 'Regularly'],
                            antonyms: ['Rarely', 'Seldom']
                        }
                    },
                    {
                        q: 'What is the meaning of Abode?',
                        options: ['Vehicle (वाहन)', 'Home/Residence (घर/निवास)', 'Office (कार्यालय)', 'Forest (जंगल)'],
                        answer: 'Home/Residence (घर/निवास)',
                        explanation: {
                            word: 'Abode',
                            hindi: 'घर/निवास',
                            partOfSpeech: 'Noun',
                            meaning: 'Abode is a Noun. It is a formal or poetic word for a place of residence; a house or home.',
                            sentence: 'The tired traveler finally reached his humble abode after a long and exhausting journey through the mountains.',
                            synonyms: ['Home', 'Residence'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Indigo?',
                        options: ['Yellow flower (पीला फूल)', 'Dark blue dye/Color (नील)', 'Green grass (हरी घास)', 'Red apple (लाल सेब)'],
                        answer: 'Dark blue dye/Color (नील)',
                        explanation: {
                            word: 'Indigo',
                            hindi: 'नील',
                            partOfSpeech: 'Noun/Adjective',
                            meaning: 'Indigo is a Noun or Adjective. It is a tropical plant cultivated as a source of dark blue dye, or the dark blue color itself.',
                            sentence: 'In history class, Arjun learned that poor farmers were once forced to grow indigo crops against their will.',
                            synonyms: ['Dark blue', 'Navy'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Blunder?',
                        options: ['Great success (बड़ी सफलता)', 'Big mistake (बड़ी भूल या गलती)', 'Small problem (छोटी समस्या)', 'Good decision (अच्छा फैसला)'],
                        answer: 'Big mistake (बड़ी भूल या गलती)',
                        explanation: {
                            word: 'Blunder',
                            hindi: 'बड़ी भूल या गलती',
                            partOfSpeech: 'Noun',
                            meaning: 'Blunder is a Noun. It is a stupid or careless mistake.',
                            sentence: 'Sending the highly confidential email to the wrong client was a massive blunder by the careless employee.',
                            synonyms: ['Error', 'Mistake'],
                            antonyms: ['Accuracy', 'Perfection']
                        }
                    },
                    {
                        q: 'What is the meaning of Tingling?',
                        options: ['Deep sleep (गहरी नींद)', 'Prickling sensation (झनझनाहट)', 'Severe pain (तेज दर्द)', 'Soft touch (हल्का स्पर्श)'],
                        answer: 'Prickling sensation (झनझनाहट)',
                        explanation: {
                            word: 'Tingling',
                            hindi: 'झनझनाहट',
                            partOfSpeech: 'Noun/Adjective',
                            meaning: 'Tingling is a Noun or Adjective. It is a slight prickling or stinging sensation, usually felt when a body part "falls asleep."',
                            sentence: 'After sitting on the floor in the same awkward position for an hour, Sunita felt a strange tingling in her legs.',
                            synonyms: ['Prickling', 'Shivering'],
                            antonyms: ['Numbness']
                        }
                    },
                    {
                        q: 'What is the meaning of Wound?',
                        options: ['Medicine (दवा)', 'Injury/Cut (घाव)', 'Hospital (अस्पताल)', 'Health (स्वास्थ्य)'],
                        answer: 'Injury/Cut (घाव)',
                        explanation: {
                            word: 'Wound',
                            hindi: 'घाव',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Wound is a Noun or Verb. It is an injury to living tissue caused by a cut, blow, or other impact, typically one in which the skin is cut or broken.',
                            sentence: 'The kind nurse carefully cleaned the deep wound on the young soldier\'s arm and applied a fresh bandage.',
                            synonyms: ['Injury', 'Cut'],
                            antonyms: ['Healing', 'Cure']
                        }
                    },
                    {
                        q: 'What is the meaning of Water chestnut?',
                        options: ['Peanut (मूंगफली)', 'Aquatic nut (सिंघाड़ा)', 'Almond (बादाम)', 'Coconut (नारियल)'],
                        answer: 'Aquatic nut (सिंघाड़ा)',
                        explanation: {
                            word: 'Water chestnut',
                            hindi: 'सिंघाड़ा',
                            partOfSpeech: 'Noun Phrase',
                            meaning: 'Water chestnut is a Noun Phrase. It refers to a type of edible nut that grows underwater in marshes or ponds.',
                            sentence: 'During the holy fasting festival, Meera prepared a delicious sweet dish using fresh water chestnut flour.',
                            synonyms: ['Singhara'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Compel?',
                        options: ['Request politely (विनम्रता से अनुरोध करना)', 'Force/Oblige (मजबूर करना)', 'Allow easily (आसानी से अनुमति देना)', 'Forgive (क्षमा करना)'],
                        answer: 'Force/Oblige (मजबूर करना)',
                        explanation: {
                            word: 'Compel',
                            hindi: 'मजबूर करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Compel is a Verb. It means to force or oblige someone to do something.',
                            sentence: 'The continuous heavy rainfall and flooded streets will definitely compel the school administration to declare a holiday tomorrow.',
                            synonyms: ['Force', 'Press'],
                            antonyms: ['Allow', 'Let go']
                        }
                    },
                    {
                        q: 'What is the meaning of Cultivation?',
                        options: ['Destroying forests (जंगल नष्ट करना)', 'Growing crops/Farming (काटना या बोना/खेती करना)', 'Building houses (घर बनाना)', 'Driving tractors (ट्रैक्टर चलाना)'],
                        answer: 'Growing crops/Farming (काटना या बोना/खेती करना)',
                        explanation: {
                            word: 'Cultivation',
                            hindi: 'काटना या बोना/खेती करना',
                            partOfSpeech: 'Noun',
                            meaning: 'Cultivation is a Noun. It is the act of preparing land and growing crops on it (farming/agriculture).',
                            sentence: 'The highly fertile land near the great river is absolutely perfect for the cultivation of premium quality rice.',
                            synonyms: ['Farming', 'Agriculture'],
                            antonyms: ['Neglect', 'Destruction']
                        }
                    },
                    {
                        q: 'What is the meaning of Therefore?',
                        options: ['Because (क्योंकि)', 'For that reason (इसलिए)', 'Before (पहले)', 'Never (कभी नहीं)'],
                        answer: 'For that reason (इसलिए)',
                        explanation: {
                            word: 'Therefore',
                            hindi: 'इसलिए',
                            partOfSpeech: 'Adverb',
                            meaning: 'Therefore is an Adverb. It means for that reason; consequently. It is used to show the result of a situation.',
                            sentence: 'It was raining very heavily outside; therefore, Amit decided to stay safely inside his house and complete his homework.',
                            synonyms: ['Consequently', 'Thus'],
                            antonyms: ['However', 'Nevertheless']
                        }
                    },
                    {
                        q: 'What is the meaning of Acquire?',
                        options: ['Lose (खोना)', 'Obtain/Get (प्राप्त करना/अधिग्रहण करना)', 'Throw away (फेंक देना)', 'Forget (भूलना)'],
                        answer: 'Obtain/Get (प्राप्त करना/अधिग्रहण करना)',
                        explanation: {
                            word: 'Acquire',
                            hindi: 'प्राप्त करना/अधिग्रहण करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Acquire is a Verb. It means to buy or obtain an asset or object for oneself, or to learn or develop a new skill.',
                            sentence: 'Sneha knows that it takes many years of dedicated daily practice to successfully acquire a brand new foreign language.',
                            synonyms: ['Obtain', 'Gain'],
                            antonyms: ['Lose', 'Surrender']
                        }
                    },
                    {
                        q: 'What is the meaning of Forsake?',
                        options: ['Support fully (पूरा समर्थन करना)', 'Abandon/Give up (त्यागना या छोड़ देना)', 'Remember (याद रखना)', 'Protect (रक्षा करना)'],
                        answer: 'Abandon/Give up (त्यागना या छोड़ देना)',
                        explanation: {
                            word: 'Forsake',
                            hindi: 'त्यागना या छोड़ देना',
                            partOfSpeech: 'Verb',
                            meaning: 'Forsake is a Verb. It means to abandon someone or something, or to renounce or give up a habit.',
                            sentence: 'Kabir firmly believes that a true and loyal friend will never forsake you during your most difficult times in life.',
                            synonyms: ['Abandon', 'Desert'],
                            antonyms: ['Keep', 'Support']
                        }
                    },
                    {
                        q: 'What is the meaning of Lucrative?',
                        options: ['Producing a loss (नुकसान देने वाला)', 'Profitable/Tempting (लाभदायक/लुभावना)', 'Very boring (बहुत उबाऊ)', 'Completely free (पूरी तरह मुफ्त)'],
                        answer: 'Profitable/Tempting (लाभदायक/लुभावना)',
                        explanation: {
                            word: 'Lucrative',
                            hindi: 'लाभदायक/लुभावना',
                            partOfSpeech: 'Adjective',
                            meaning: 'Lucrative is an Adjective. It describes a job, deal, or business that produces a great deal of profit or wealth, making it very tempting.',
                            sentence: 'After completing his engineering degree, Manish received a highly lucrative job offer from a famous software company in the city.',
                            synonyms: ['Profitable', 'Rewarding'],
                            antonyms: ['Unprofitable', 'Unrewarding']
                        }
                    }
                ]
            },
            35: {
                name: 'Gathri 35',
                icon: '⚖️',
                questions: [
                    {
                        q: 'What is the meaning of Grievance?',
                        options: ['Celebration (जश्न)', 'Complaint/Resentment (शिकायत)', 'Deep sorrow (गहरा दुःख)', 'Friendship (दोस्ती)'],
                        answer: 'Complaint/Resentment (शिकायत)',
                        explanation: {
                            word: 'Grievance',
                            hindi: 'शिकायत',
                            partOfSpeech: 'Noun',
                            meaning: 'Grievance is a Noun. It is a real or imagined wrong or other cause for complaint or protest, especially unfair treatment.',
                            sentence: 'Rajesh filed a formal grievance with the HR department regarding the unfair distribution of extra work.',
                            synonyms: ['Complaint', 'Injustice'],
                            antonyms: ['Commendation', 'Praise']
                        }
                    },
                    {
                        q: 'What is the meaning of Redressal?',
                        options: ['Wearing red clothes (लाल कपड़े पहनना)', 'Remedy/Resolution (निपटारा या निवारण)', 'Increasing a problem (समस्या बढ़ाना)', 'Giving a speech (भाषण देना)'],
                        answer: 'Remedy/Resolution (निपटारा या निवारण)',
                        explanation: {
                            word: 'Redressal',
                            hindi: 'निपटारा या निवारण',
                            partOfSpeech: 'Noun',
                            meaning: 'Redressal is a Noun. It refers to the act of setting right an unjust situation or providing a remedy/compensation for a grievance.',
                            sentence: 'The consumer court promised quick redressal for the customers who were sold defective mobile phones.',
                            synonyms: ['Resolution', 'Remedy'],
                            antonyms: ['Worsening', 'Damage']
                        }
                    },
                    {
                        q: 'What is the meaning of Red tapism?',
                        options: ['Decorating with ribbons (रिबन से सजाना)', 'Excessive bureaucracy/Strict rules (लाल फीता शाही/कठोर नियम)', 'Fast service (तेज सेवा)', 'Government building (सरकारी इमारत)'],
                        answer: 'Excessive bureaucracy/Strict rules (लाल फीता शाही/कठोर नियम)',
                        explanation: {
                            word: 'Red tapism',
                            hindi: 'लाल फीता शाही/कठोर नियम',
                            partOfSpeech: 'Noun',
                            meaning: 'Red tapism (or Red Tape) is a Noun. It refers to excessive regulation or rigid conformity to formal rules that is considered redundant or bureaucratic and hinders or prevents action or decision-making.',
                            sentence: 'Priya was highly frustrated by the constant red tapism that delayed the approval of her simple bank loan for months.',
                            synonyms: ['Bureaucracy', 'Officialdom'],
                            antonyms: ['Efficiency', 'Flexibility']
                        }
                    },
                    {
                        q: 'What is the meaning of Tenure?',
                        options: ['High salary (उच्च वेतन)', 'Term/Period of office (कार्यकाल)', 'Ten years exactly (ठीक दस साल)', 'Difficult exam (कठिन परीक्षा)'],
                        answer: 'Term/Period of office (कार्यकाल)',
                        explanation: {
                            word: 'Tenure',
                            hindi: 'कार्यकाल',
                            partOfSpeech: 'Noun',
                            meaning: 'Tenure is a Noun. It is the conditions under which land or buildings are held or occupied, or more commonly, the period of time a person holds a specific job or office.',
                            sentence: 'During his successful five-year tenure as the city mayor, Vivek built three new hospitals and improved the roads.',
                            synonyms: ['Term', 'Incumbency'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Expel?',
                        options: ['Welcome warmly (गर्मजोशी से स्वागत करना)', 'Force out/Banish (निकाल देना)', 'Teach a lesson (सबक सिखाना)', 'Breathe out completely (पूरी तरह सांस छोड़ना)'],
                        answer: 'Force out/Banish (निकाल देना)',
                        explanation: {
                            word: 'Expel',
                            hindi: 'निकाल देना',
                            partOfSpeech: 'Verb',
                            meaning: 'Expel is a Verb. It means to officially force someone to leave a school, organization, or country.',
                            sentence: 'The school principal had no choice but to immediately expel the senior student for constantly breaking the strict disciplinary rules.',
                            synonyms: ['Banish', 'Eject'],
                            antonyms: ['Admit', 'Welcome']
                        }
                    },
                    {
                        q: 'What is the meaning of Brawl?',
                        options: ['Loud party (शोरगुल वाली पार्टी)', 'Rough fight/Dispute (झगड़ा या विवाद)', 'Deep friendship (गहरी दोस्ती)', 'Running competition (दौड़ प्रतियोगिता)'],
                        answer: 'Rough fight/Dispute (झगड़ा या विवाद)',
                        explanation: {
                            word: 'Brawl',
                            hindi: 'झगड़ा या विवाद',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Brawl is a Noun or a Verb. It is a rough, noisy fight or quarrel, usually in a public place.',
                            sentence: 'The local police had to arrive quickly to stop a violent brawl that broke out in the crowded vegetable market.',
                            synonyms: ['Fight', 'Scuffle'],
                            antonyms: ['Peace', 'Agreement']
                        }
                    },
                    {
                        q: 'What is the meaning of Robbery?',
                        options: ['Charity donation (धर्मार्थ दान)', 'Stealing with force (लूट लेना या डकैती)', 'Finding money (पैसे मिलना)', 'Honest business (ईमानदार व्यापार)'],
                        answer: 'Stealing with force (लूट लेना या डकैती)',
                        explanation: {
                            word: 'Robbery',
                            hindi: 'लूट लेना या डकैती',
                            partOfSpeech: 'Noun',
                            meaning: 'Robbery is a Noun. It is the action of taking property unlawfully from a person or place by force or threat of force.',
                            sentence: 'The security cameras recorded the entire bank robbery, helping the police identify the masked criminals.',
                            synonyms: ['Theft', 'Burglary'],
                            antonyms: ['Donation', 'Giving']
                        }
                    },
                    {
                        q: 'What is the meaning of Worth?',
                        options: ['Uselessness (बेकारपन)', 'Value/Cost (कीमत)', 'Heavy weight (भारी वजन)', 'Free of charge (मुफ्त)'],
                        answer: 'Value/Cost (कीमत)',
                        explanation: {
                            word: 'Worth',
                            hindi: 'कीमत',
                            partOfSpeech: 'Noun/Adjective',
                            meaning: 'Worth is a Noun or Adjective. It refers to the value equivalent to that of someone or something, usually in financial terms.',
                            sentence: 'Neha finally took her grandmother\'s old gold necklace to the jeweler to find out its true market worth.',
                            synonyms: ['Value', 'Price'],
                            antonyms: ['Worthlessness']
                        }
                    },
                    {
                        q: 'What is the meaning of Role?',
                        options: ['Round shape (गोल आकार)', 'Function/Part played (भूमिका)', 'Hard rule (कठोर नियम)', 'Loud noise (तेज आवाज)'],
                        answer: 'Function/Part played (भूमिका)',
                        explanation: {
                            word: 'Role',
                            hindi: 'भूमिका',
                            partOfSpeech: 'Noun',
                            meaning: 'Role is a Noun. It is the function assumed or part played by a person or thing in a particular situation, or an actor\'s part in a play.',
                            sentence: 'Sunita played a very crucial role in perfectly organizing the annual college cultural festival this year.',
                            synonyms: ['Part', 'Function'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Vandalism?',
                        options: ['Beautiful painting (सुंदर चित्रकला)', 'Destruction of property (तोड़-फोड़)', 'Cleaning a street (सड़क साफ करना)', 'Building construction (भवन निर्माण)'],
                        answer: 'Destruction of property (तोड़-फोड़)',
                        explanation: {
                            word: 'Vandalism',
                            hindi: 'तोड़-फोड़',
                            partOfSpeech: 'Noun',
                            meaning: 'Vandalism is a Noun. It is the action involving deliberate destruction of or damage to public or private property.',
                            sentence: 'The city park had to be closed for extensive repairs following a senseless night of vandalism by some aggressive teenagers.',
                            synonyms: ['Destruction', 'Defacement'],
                            antonyms: ['Protection', 'Conservation']
                        }
                    },
                    {
                        q: 'What is the meaning of Post (in this context)?',
                        options: ['Mail letter (डाक पत्र)', 'After/Later (बाद में)', 'Wooden pole (लकड़ी का खंभा)', 'Before (पहले)'],
                        answer: 'After/Later (बाद में)',
                        explanation: {
                            word: 'Post',
                            hindi: 'बाद में',
                            partOfSpeech: 'Preposition/Prefix',
                            meaning: 'Post can be a Preposition or Prefix. When used this way, it means subsequent to; after.',
                            sentence: 'Sanjay excitedly attended the post-match press conference to hear what the winning cricket captain had to say.',
                            synonyms: ['After', 'Following'],
                            antonyms: ['Pre', 'Before']
                        }
                    },
                    {
                        q: 'What is the meaning of Poll?',
                        options: ['Long stick (लंबी छड़ी)', 'Voting/Election (मतदान)', 'Deep water (गहरा पानी)', 'High mountain (ऊंचा पहाड़)'],
                        answer: 'Voting/Election (मतदान)',
                        explanation: {
                            word: 'Poll',
                            hindi: 'मतदान',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Poll is a Noun or Verb. It refers to the process of voting in an election, or a record of the number of votes cast.',
                            sentence: 'Millions of responsible citizens woke up early and went to their local centers to cast their vote in the national poll.',
                            synonyms: ['Vote', 'Election'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Arson?',
                        options: ['Son of a king (राजा का बेटा)', 'Setting fire intentionally (आग लगा देना या आगजनी)', 'Heavy rain (भारी बारिश)', 'Building a house (घर बनाना)'],
                        answer: 'Setting fire intentionally (आग लगा देना या आगजनी)',
                        explanation: {
                            word: 'Arson',
                            hindi: 'आग लगा देना या आगजनी',
                            partOfSpeech: 'Noun',
                            meaning: 'Arson is a Noun. It is the criminal act of deliberately setting fire to property.',
                            sentence: 'The police investigation proved that the old factory burning down was not a simple accident, but a clear case of illegal arson.',
                            synonyms: ['Fire-raising', 'Incendiarism'],
                            antonyms: ['Firefighting']
                        }
                    },
                    {
                        q: 'What is the meaning of Negligence?',
                        options: ['Hard work (कड़ी मेहनत)', 'Carelessness (लापरवाही)', 'Perfect attention (पूरा ध्यान)', 'Smartness (होशियारी)'],
                        answer: 'Carelessness (लापरवाही)',
                        explanation: {
                            word: 'Negligence',
                            hindi: 'लापरवाही',
                            partOfSpeech: 'Noun',
                            meaning: 'Negligence is a Noun. It is the failure to take proper care in doing something, often resulting in damage or injury.',
                            sentence: 'The careless driver was sued for gross negligence after his reckless driving caused a major accident on the highway.',
                            synonyms: ['Carelessness', 'Irresponsibility'],
                            antonyms: ['Care', 'Attention']
                        }
                    },
                    {
                        q: 'What is the meaning of Drown?',
                        options: ['Float easily (आसानी से तैरना)', 'Sink/Die underwater (डूबना)', 'Drink fast (जल्दी पीना)', 'Fly high (ऊंचा उड़ना)'],
                        answer: 'Sink/Die underwater (डूबना)',
                        explanation: {
                            word: 'Drown',
                            hindi: 'डूबना',
                            partOfSpeech: 'Verb',
                            meaning: 'Drown is a Verb. It means to die through submersion in and inhalation of water, or to completely submerge something in a liquid.',
                            sentence: 'The brave young lifeguard quickly jumped into the deep end of the swimming pool to save the little boy from drowning.',
                            synonyms: ['Sink', 'Submerge'],
                            antonyms: ['Float', 'Survive']
                        }
                    }
                ]
            },
            36: {
                name: 'Gathri 36',
                icon: '🌿',
                questions: [
                    {
                        q: 'What is the meaning of Fertile?',
                        options: ['Dry and rocky (सूखा और पथरीला)', 'Productive/Yielding crops (उपजाऊ)', 'Completely empty (पूरी तरह खाली)', 'Poisonous (जहरीला)'],
                        answer: 'Productive/Yielding crops (उपजाऊ)',
                        explanation: {
                            word: 'Fertile',
                            hindi: 'उपजाऊ',
                            partOfSpeech: 'Adjective',
                            meaning: 'Fertile is an Adjective. It describes soil or land that is capable of producing abundant vegetation or crops.',
                            sentence: 'Karan planted the wheat seeds in the highly fertile soil to ensure a massive harvest for the season.',
                            synonyms: ['Productive', 'Fruitful'],
                            antonyms: ['Barren', 'Infertile']
                        }
                    },
                    {
                        q: 'What is the meaning of Oppress?',
                        options: ['Support fully (पूरा समर्थन करना)', 'Treat cruelly/Persecute (जुल्म करना या अत्याचार)', 'Teach gently (प्यार से पढ़ाना)', 'Give freedom (आजादी देना)'],
                        answer: 'Treat cruelly/Persecute (जुल्म करना या अत्याचार)',
                        explanation: {
                            word: 'Oppress',
                            hindi: 'जुल्म करना या अत्याचार',
                            partOfSpeech: 'Verb',
                            meaning: 'Oppress is a Verb. It means to keep someone in subservience and hardship, especially by the unjust exercise of authority.',
                            sentence: 'The history teacher told Aarti how the cruel emperor used his massive army to oppress the poor villagers.',
                            synonyms: ['Persecute', 'Tyrannize'],
                            antonyms: ['Liberate', 'Free']
                        }
                    },
                    {
                        q: 'What is the meaning of Chameleon?',
                        options: ['Large snake (बड़ा सांप)', 'Color-changing lizard (गिरगिट)', 'Flying bird (उड़ने वाला पक्षी)', 'Water fish (पानी की मछली)'],
                        answer: 'Color-changing lizard (गिरगिट)',
                        explanation: {
                            word: 'Chameleon',
                            hindi: 'गिरगिट',
                            partOfSpeech: 'Noun',
                            meaning: 'Chameleon is a Noun. It is a small slow-moving lizard with a highly developed ability to change color.',
                            sentence: 'Ravi was fascinated to watch the small chameleon magically change its color to match the green leaves.',
                            synonyms: ['Lizard', 'Reptile'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Camouflage?',
                        options: ['Bright lighting (तेज रोशनी)', 'Disguise/Hide (छलावरण/छिपाव)', 'Loud noise (तेज आवाज)', 'Running fast (तेज दौड़ना)'],
                        answer: 'Disguise/Hide (छलावरण/छिपाव)',
                        explanation: {
                            word: 'Camouflage',
                            hindi: 'छलावरण/छिपाव',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Camouflage is a Noun or Verb. It refers to the hiding of something as a result of its appearance blending in with its surroundings.',
                            sentence: 'The clever tiger uses its striped fur as a natural camouflage to perfectly hide in the tall jungle grass, explained Manish.',
                            synonyms: ['Disguise', 'Concealment'],
                            antonyms: ['Reveal', 'Expose']
                        }
                    },
                    {
                        q: 'What is the meaning of Determine?',
                        options: ['Forget entirely (पूरी तरह भूल जाना)', 'Decide/Establish (निर्धारित करना/तय करना)', 'Run away (भाग जाना)', 'Mix together (एक साथ मिलाना)'],
                        answer: 'Decide/Establish (निर्धारित करना/तय करना)',
                        explanation: {
                            word: 'Determine',
                            hindi: 'निर्धारित करना/तय करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Determine is a Verb. It means to cause something to occur in a particular way or to firmly decide something.',
                            sentence: 'Pooja needs to carefully determine the exact time of her train departure before leaving her house for the station.',
                            synonyms: ['Decide', 'Resolve'],
                            antonyms: ['Hesitate', 'Waver']
                        }
                    },
                    {
                        q: 'What is the meaning of Fade?',
                        options: ['Grow brighter (अधिक चमकीला होना)', 'Lose color/Disappear (फीका पड़ना या मुरझाना)', 'Run faster (तेज दौड़ना)', 'Become heavier (भारी होना)'],
                        answer: 'Lose color/Disappear (फीका पड़ना या मुरझाना)',
                        explanation: {
                            word: 'Fade',
                            hindi: 'फीका पड़ना या मुरझाना',
                            partOfSpeech: 'Verb',
                            meaning: 'Fade is a Verb. It means to gradually grow faint and disappear or lose color.',
                            sentence: 'Deepak noticed that the bright red color of his favorite shirt started to fade after multiple harsh washes.',
                            synonyms: ['Pale', 'Diminish'],
                            antonyms: ['Brighten', 'Enhance']
                        }
                    },
                    {
                        q: 'What is the meaning of Usually?',
                        options: ['Never (कभी नहीं)', 'Normally/Mostly (अधिकतर या आमतौर पर)', 'Once a year (साल में एक बार)', 'By mistake (गलती से)'],
                        answer: 'Normally/Mostly (अधिकतर या आमतौर पर)',
                        explanation: {
                            word: 'Usually',
                            hindi: 'अधिकतर या आमतौर पर',
                            partOfSpeech: 'Adverb',
                            meaning: 'Usually is an Adverb. It means under normal conditions; generally.',
                            sentence: 'Sneha usually wakes up at six in the morning to peacefully practice yoga before heading to her college.',
                            synonyms: ['Generally', 'Normally'],
                            antonyms: ['Rarely', 'Seldom']
                        }
                    },
                    {
                        q: 'What is the meaning of Sticky?',
                        options: ['Very smooth (बहुत चिकना)', 'Adhesive/Clammy (चिपचिपा)', 'Extremely cold (अत्यधिक ठंडा)', 'Hard like rock (पत्थर जैसा सख्त)'],
                        answer: 'Adhesive/Clammy (चिपचिपा)',
                        explanation: {
                            word: 'Sticky',
                            hindi: 'चिपचिपा',
                            partOfSpeech: 'Adjective',
                            meaning: 'Sticky is an Adjective. It describes something that is designed or tending to stick to things on contact.',
                            sentence: 'After eating the sweet and juicy mango, Rohan\'s hands became very sticky and required a good wash.',
                            synonyms: ['Adhesive', 'Gummy'],
                            antonyms: ['Smooth', 'Dry']
                        }
                    },
                    {
                        q: 'What is the meaning of Concern?',
                        options: ['Total happiness (पूरी खुशी)', 'Worry/Matter of interest (चिंता/मामला)', 'Complete ignorance (पूरी अज्ञानता)', 'Loud laughter (तेज हंसी)'],
                        answer: 'Worry/Matter of interest (चिंता/मामला)',
                        explanation: {
                            word: 'Concern',
                            hindi: 'चिंता/मामला',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Concern can be a Noun or a Verb. It relates to anxiety or worry, or a matter of interest or importance to someone.',
                            sentence: 'The rapidly increasing air pollution in the city is a major concern for Dr. Patel and his asthma patients.',
                            synonyms: ['Worry', 'Issue'],
                            antonyms: ['Indifference', 'Peace']
                        }
                    },
                    {
                        q: 'What is the meaning of Impact?',
                        options: ['Gentle touch (हल्का स्पर्श)', 'Effect/Collision (प्रभाव/टकराव)', 'Hidden secret (छिपा हुआ रहस्य)', 'Starting point (शुरुआती बिंदु)'],
                        answer: 'Effect/Collision (प्रभाव/टकराव)',
                        explanation: {
                            word: 'Impact',
                            hindi: 'प्रभाव/टकराव',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Impact can be a Noun or a Verb. It is the action of one object coming forcibly into contact with another, or having a strong effect on someone or something.',
                            sentence: 'The heavy monsoon rainfall had a huge impact on the local traffic, causing Kiran to reach her office very late.',
                            synonyms: ['Effect', 'Influence'],
                            antonyms: ['Avoidance']
                        }
                    },
                    {
                        q: 'What is the meaning of Livestock?',
                        options: ['Dead plants (मरे हुए पौधे)', 'Farm animals (मवेशी)', 'Wild lions (जंगली शेर)', 'Machine parts (मशीन के पुर्जे)'],
                        answer: 'Farm animals (मवेशी)',
                        explanation: {
                            word: 'Livestock',
                            hindi: 'मवेशी',
                            partOfSpeech: 'Noun',
                            meaning: 'Livestock is a Noun. It refers to farm animals regarded as an asset (such as cows, sheep, and pigs).',
                            sentence: 'The hardworking village farmer relies entirely on his healthy livestock to generate his daily income, noted Suresh.',
                            synonyms: ['Farm animals', 'Cattle'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Intense?',
                        options: ['Very mild (बहुत हल्का)', 'Extreme/Strong (अत्यधिक/गहन)', 'Completely flat (पूरी तरह चपटा)', 'Colorless (रंगहीन)'],
                        answer: 'Extreme/Strong (अत्यधिक/गहन)',
                        explanation: {
                            word: 'Intense',
                            hindi: 'अत्यधिक/गहन',
                            partOfSpeech: 'Adjective',
                            meaning: 'Intense is an Adjective. It describes something of extreme force, degree, or strength.',
                            sentence: 'Gaurav felt an intense sharp pain in his left ankle immediately after tripping on the hard basketball court.',
                            synonyms: ['Extreme', 'Severe'],
                            antonyms: ['Mild', 'Moderate']
                        }
                    },
                    {
                        q: 'What is the meaning of Frightened?',
                        options: ['Very brave (बहुत बहादुर)', 'Afraid/Scared (भयभीत/डरा हुआ)', 'Extremely tired (अत्यधिक थका हुआ)', 'Highly educated (उच्च शिक्षित)'],
                        answer: 'Afraid/Scared (भयभीत/डरा हुआ)',
                        explanation: {
                            word: 'Frightened',
                            hindi: 'भयभीत/डरा हुआ',
                            partOfSpeech: 'Adjective',
                            meaning: 'Frightened is an Adjective (derived from the verb Frighten). It means feeling fear or being afraid.',
                            sentence: 'The sudden, loud thunder during the midnight storm made little Kavita feel very frightened in her dark room.',
                            synonyms: ['Scared', 'Terrified'],
                            antonyms: ['Fearless', 'Brave']
                        }
                    },
                    {
                        q: 'What is the meaning of Stool (in medical context)?',
                        options: ['Small wooden chair (छोटी लकड़ी की कुर्सी)', 'Feces/Waste matter (मल)', 'Clean drinking water (पीने का साफ पानी)', 'Fresh blood (ताजा खून)'],
                        answer: 'Feces/Waste matter (मल)',
                        explanation: {
                            word: 'Stool',
                            hindi: 'मल',
                            partOfSpeech: 'Noun',
                            meaning: 'Stool is a Noun. While it commonly means a backless chair, in biology and medicine, it refers to a piece of feces (solid waste from the body).',
                            sentence: 'The veterinarian gently asked Mohan to collect a sample of the dog\'s stool to test the pet for any stomach infections.',
                            synonyms: ['Feces', 'Excrement'],
                            antonyms: []
                        }
                    }
                ]
            },
            37: {
                name: 'Gathri 37',
                icon: '📜',
                questions: [
                    {
                        q: 'What is the meaning of Circular?',
                        options: ['Round ball (गोल गेंद)', 'Notice/Letter distributed to many (सूचना पत्र)', 'Secret document (गुप्त दस्तावेज़)', 'Newspaper (अखबार)'],
                        answer: 'Notice/Letter distributed to many (सूचना पत्र)',
                        explanation: {
                            word: 'Circular',
                            hindi: 'सूचना पत्र',
                            partOfSpeech: 'Noun/Adjective',
                            meaning: 'Circular can be an Adjective (meaning round) or a Noun. As a noun, it refers to a letter or advertisement that is distributed to a large number of people.',
                            sentence: 'The school principal sent a circular to all parents regarding the upcoming summer vacation dates.',
                            synonyms: ['Notice', 'Leaflet'],
                            antonyms: ['Private letter']
                        }
                    },
                    {
                        q: 'What is the meaning of Issue?',
                        options: ['Hide away (छिपाना)', 'Release/Distribute officially (जारी करना)', 'Destroy completely (नष्ट करना)', 'Keep secret (रहस्य रखना)'],
                        answer: 'Release/Distribute officially (जारी करना)',
                        explanation: {
                            word: 'Issue',
                            hindi: 'जारी करना',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Issue can be a Noun (a problem) or a Verb. As a verb, it means to supply or distribute something officially, like a document or an order.',
                            sentence: 'The traffic police department decided to issue a strict warning to drivers who constantly break the speed limit.',
                            synonyms: ['Release', 'Distribute'],
                            antonyms: ['Withdraw', 'Hold back']
                        }
                    },
                    {
                        q: 'What is the meaning of Manifesto?',
                        options: ['Grocery list (किराने की सूची)', 'Public declaration of policies (घोषणा पत्र)', 'Private diary (निजी डायरी)', 'Music album (संगीत एलबम)'],
                        answer: 'Public declaration of policies (घोषणा पत्र)',
                        explanation: {
                            word: 'Manifesto',
                            hindi: 'घोषणा पत्र',
                            partOfSpeech: 'Noun',
                            meaning: 'Manifesto is a Noun. It is a public declaration of policy and aims, especially one issued before an election by a political party or candidate.',
                            sentence: 'The political leader released a detailed manifesto promising better roads and clean water for the entire city.',
                            synonyms: ['Declaration', 'Platform'],
                            antonyms: ['Secret plan']
                        }
                    },
                    {
                        q: 'What is the meaning of Encroachment?',
                        options: ['Buying a house legally (कानूनी तौर पर घर खरीदना)', 'Illegal intrusion on land (अतिक्रमण/अवैध कब्जा)', 'Planting new trees (नए पेड़ लगाना)', 'Cleaning the street (सड़क साफ करना)'],
                        answer: 'Illegal intrusion on land (अतिक्रमण/अवैध कब्जा)',
                        explanation: {
                            word: 'Encroachment',
                            hindi: 'अतिक्रमण/अवैध कब्जा',
                            partOfSpeech: 'Noun',
                            meaning: 'Encroachment is a Noun. It refers to the intrusion on a person\'s territory, rights, or the illegal occupation of land.',
                            sentence: 'The municipal corporation brought a bulldozer to clear the illegal encroachment on the public footpath.',
                            synonyms: ['Intrusion', 'Invasion'],
                            antonyms: ['Retreat', 'Withdrawal']
                        }
                    },
                    {
                        q: 'What is the meaning of Resignation?',
                        options: ['Job offer (नौकरी का प्रस्ताव)', 'Act of quitting a job (त्याग पत्र)', 'Promotion (पदोन्नति)', 'Interview (साक्षात्कार)'],
                        answer: 'Act of quitting a job (त्याग पत्र)',
                        explanation: {
                            word: 'Resignation',
                            hindi: 'त्याग पत्र',
                            partOfSpeech: 'Noun',
                            meaning: 'Resignation is a Noun. It is the formal act of giving up or quitting one\'s position or office.',
                            sentence: 'After working at the company for ten years, Amit officially submitted his resignation to start his own business.',
                            synonyms: ['Departure', 'Quitting'],
                            antonyms: ['Hiring', 'Employment']
                        }
                    },
                    {
                        q: 'What is the meaning of Amendment?',
                        options: ['Total destruction (पूर्ण विनाश)', 'Minor change/Improvement (संशोधन/सुधार)', 'First draft (पहला ड्राफ्ट)', 'Refusal (इनकार)'],
                        answer: 'Minor change/Improvement (संशोधन/सुधार)',
                        explanation: {
                            word: 'Amendment',
                            hindi: 'संशोधन/सुधार',
                            partOfSpeech: 'Noun',
                            meaning: 'Amendment is a Noun. It is a minor change or addition designed to improve a text, piece of legislation, or document.',
                            sentence: 'The committee proposed a new amendment to the club rules to allow younger members to join.',
                            synonyms: ['Revision', 'Modification'],
                            antonyms: ['Worsening', 'Damage']
                        }
                    },
                    {
                        q: 'What is the meaning of Woo?',
                        options: ['Frighten away (डरा कर भगाना)', 'Try to gain love/Entice (लालच देना/लुभाना)', 'Shout loudly (जोर से चिल्लाना)', 'Ignore completely (पूरी तरह अनदेखा करना)'],
                        answer: 'Try to gain love/Entice (लालच देना/लुभाना)',
                        explanation: {
                            word: 'Woo',
                            hindi: 'लालच देना/लुभाना',
                            partOfSpeech: 'Verb',
                            meaning: 'Woo is a Verb. It means to try to gain the love of someone, or to seek the favor, support, or custom of someone.',
                            sentence: 'The shopping mall offered massive discounts to successfully woo more customers during the festive season.',
                            synonyms: ['Entice', 'Attract'],
                            antonyms: ['Repel', 'Disgust']
                        }
                    },
                    {
                        q: 'What is the meaning of Although?',
                        options: ['Because of (के कारण)', 'In spite of the fact that (हालाँकि/यद्यपि)', 'Therefore (इसलिए)', 'Never (कभी नहीं)'],
                        answer: 'In spite of the fact that (हालाँकि/यद्यपि)',
                        explanation: {
                            word: 'Although',
                            hindi: 'हालाँकि/यद्यपि',
                            partOfSpeech: 'Conjunction',
                            meaning: 'Although is a Conjunction. It means "even though" or "in spite of the fact that."',
                            sentence: 'Although it was raining very heavily outside, Priya still decided to walk to the library.',
                            synonyms: ['Even though', 'Despite the fact'],
                            antonyms: []
                        }
                    },
                    {
                        q: 'What is the meaning of Organize?',
                        options: ['Destroy completely (पूरी तरह नष्ट करना)', 'Arrange systematically (आयोजन करना/व्यवस्थित करना)', 'Forget everything (सब कुछ भूल जाना)', 'Sleep deeply (गहरी नींद सोना)'],
                        answer: 'Arrange systematically (आयोजन करना/व्यवस्थित करना)',
                        explanation: {
                            word: 'Organize',
                            hindi: 'आयोजन करना/व्यवस्थित करना',
                            partOfSpeech: 'Verb',
                            meaning: 'Organize is a Verb. It means to arrange things into a structured whole or coordinate the activities of a person or group.',
                            sentence: 'Rohan enthusiastically volunteered to organize the annual science fair at his college this year.',
                            synonyms: ['Arrange', 'Coordinate'],
                            antonyms: ['Mess up', 'Disrupt']
                        }
                    },
                    {
                        q: 'What is the meaning of Movement?',
                        options: ['Standing perfectly still (बिल्कुल स्थिर खड़े रहना)', 'Motion OR Campaign (गति या आंदोलन)', 'Silence (शांति)', 'Deep sleep (गहरी नींद)'],
                        answer: 'Motion OR Campaign (गति या आंदोलन)',
                        explanation: {
                            word: 'Movement',
                            hindi: 'गति या आंदोलन',
                            partOfSpeech: 'Noun',
                            meaning: 'Movement is a Noun. It can refer to the act of changing physical location, or a group of people working together to advance their shared political or social ideas.',
                            sentence: 'Mahatma Gandhi led a massive non-violent movement to help India gain independence from British rule.',
                            synonyms: ['Campaign', 'Motion'],
                            antonyms: ['Stillness', 'Inaction']
                        }
                    },
                    {
                        q: 'What is the meaning of Irregularity?',
                        options: ['Perfect order (पूर्ण व्यवस्था)', 'Anomaly/Not following rules (अनियमितता/गड़बड़ी)', 'Daily routine (दैनिक दिनचर्या)', 'Good behavior (अच्छा व्यवहार)'],
                        answer: 'Anomaly/Not following rules (अनियमितता/गड़बड़ी)',
                        explanation: {
                            word: 'Irregularity',
                            hindi: 'अनियमितता/गड़बड़ी',
                            partOfSpeech: 'Noun',
                            meaning: 'Irregularity is a Noun. It refers to a state of not being regular, balanced, or following established rules; an anomaly.',
                            sentence: 'The strict auditor found a major financial irregularity in the company\'s accounting records during the inspection.',
                            synonyms: ['Anomaly', 'Inconsistency'],
                            antonyms: ['Regularity', 'Consistency']
                        }
                    },
                    {
                        q: 'What is the meaning of Supplement?',
                        options: ['Main meal (मुख्य भोजन)', 'Something added to complete (पूरक/अतिरिक्त चीज)', 'Total reduction (कुल कमी)', 'Broken part (टूटा हुआ हिस्सा)'],
                        answer: 'Something added to complete (पूरक/अतिरिक्त चीज)',
                        explanation: {
                            word: 'Supplement',
                            hindi: 'पूरक/अतिरिक्त चीज',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Supplement is a Noun or Verb. It is something that completes or enhances something else when added to it.',
                            sentence: 'The doctor advised Vikram to take a daily vitamin supplement to quickly improve his overall health.',
                            synonyms: ['Addition', 'Enhancement'],
                            antonyms: ['Subtraction', 'Decrease']
                        }
                    },
                    {
                        q: 'What is the meaning of Bias?',
                        options: ['Fairness (निष्पक्षता)', 'Prejudice/Favoritism (पक्षपात/पूर्वाग्रह)', 'Equality (समानता)', 'Complete truth (पूर्ण सत्य)'],
                        answer: 'Prejudice/Favoritism (पक्षपात/पूर्वाग्रह)',
                        explanation: {
                            word: 'Bias',
                            hindi: 'पक्षपात/पूर्वाग्रह',
                            partOfSpeech: 'Noun/Verb',
                            meaning: 'Bias is a Noun or Verb. It is an unfair prejudice in favor of or against one thing, person, or group compared with another.',
                            sentence: 'The sports coach was accused of showing an unfair bias toward the players from his own hometown.',
                            synonyms: ['Prejudice', 'Partiality'],
                            antonyms: ['Fairness', 'Objectivity']
                        }
                    },
                    {
                        q: 'What is the meaning of Unbiased?',
                        options: ['Unfair (अनुचित)', 'Fair/Impartial (निष्पक्ष)', 'Angry (गुस्से में)', 'Secretive (रहस्यमय)'],
                        answer: 'Fair/Impartial (निष्पक्ष)',
                        explanation: {
                            word: 'Unbiased',
                            hindi: 'निष्पक्ष',
                            partOfSpeech: 'Adjective',
                            meaning: 'Unbiased is an Adjective. It describes someone or something that shows no prejudice and makes fair, impartial judgments.',
                            sentence: 'The judge carefully listened to both lawyers to ensure he made a completely unbiased decision in the courtroom.',
                            synonyms: ['Fair', 'Impartial'],
                            antonyms: ['Biased', 'Prejudiced']
                        }
                    },
                    {
                        q: 'What is the meaning of Concert?',
                        options: ['Sports match (खेल का मैच)', 'Musical performance (संगीत समारोह)', 'Movie theater (सिनेमा हॉल)', 'Silent reading (मौन पठन)'],
                        answer: 'Musical performance (संगीत समारोह)',
                        explanation: {
                            word: 'Concert',
                            hindi: 'संगीत समारोह',
                            partOfSpeech: 'Noun',
                            meaning: 'Concert is a Noun. It is a live musical performance given in public, typically by several performers or of several separate compositions.',
                            sentence: 'Sunita bought two front-row tickets to attend the spectacular live music concert of her favorite singer.',
                            synonyms: ['Musical performance', 'Show'],
                            antonyms: []
                        }
                    }
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
            },
            3: {
                name: 'Intermediate',
                icon: '🌳',
                questions: [
                    { q: 'Synonym of "brave"?', options: ['Timid', 'Courageous', 'Lazy', 'Weak'], answer: 'Courageous' },
                    { q: 'Synonym of "honest"?', options: ['Lying', 'Truthful', 'Cheating', 'Fake'], answer: 'Truthful' },
                    { q: 'Synonym of "lazy"?', options: ['Active', 'Idle', 'Energetic', 'Busy'], answer: 'Idle' },
                    { q: 'Synonym of "polite"?', options: ['Rude', 'Courteous', 'Mean', 'Harsh'], answer: 'Courteous' },
                    { q: 'Synonym of "angry"?', options: ['Calm', 'Furious', 'Happy', 'Peaceful'], answer: 'Furious' },
                    { q: 'Synonym of "confident"?', options: ['Doubtful', 'Self-assured', 'Scared', 'Shy'], answer: 'Self-assured' },
                    { q: 'Synonym of "curious"?', options: ['Bored', 'Inquisitive', 'Sleepy', 'Tired'], answer: 'Inquisitive' },
                    { q: 'Synonym of "silent"?', options: ['Noisy', 'Quiet', 'Loud', 'Active'], answer: 'Quiet' },
                    { q: 'Synonym of "kind"?', options: ['Cruel', 'Caring', 'Mean', 'Selfish'], answer: 'Caring' },
                    { q: 'Synonym of "tired"?', options: ['Energetic', 'Exhausted', 'Fresh', 'Active'], answer: 'Exhausted' }
                ]
            },
            4: {
                name: 'Advanced',
                icon: '🌴',
                questions: [
                    { q: 'Synonym of "assault"?', options: ['Praise', 'Attack', 'Ignore', 'Welcome'], answer: 'Attack' },
                    { q: 'Synonym of "collision"?', options: ['Separation', 'Crash', 'Agreement', 'Peace'], answer: 'Crash' },
                    { q: 'Synonym of "cattle"?', options: ['Birds', 'Livestock', 'Insects', 'Fish'], answer: 'Livestock' },
                    { q: 'Synonym of "extinct"?', options: ['Alive', 'Vanished', 'Popular', 'Growing'], answer: 'Vanished' },
                    { q: 'Synonym of "victim"?', options: ['Winner', 'Sufferer', 'Leader', 'Hero'], answer: 'Sufferer' },
                    { q: 'Synonym of "lure"?', options: ['Push', 'Tempt', 'Warn', 'Scare'], answer: 'Tempt' },
                    { q: 'Synonym of "fog"?', options: ['Sunshine', 'Mist', 'Rain', 'Clear sky'], answer: 'Mist' },
                    { q: 'Synonym of "hollow"?', options: ['Heavy', 'Empty', 'Solid', 'Full'], answer: 'Empty' },
                    { q: 'Synonym of "compensation"?', options: ['Punishment', 'Payment', 'Tax', 'Theft'], answer: 'Payment' },
                    { q: 'Synonym of "hell"?', options: ['Paradise', 'Nightmare', 'School', 'Garden'], answer: 'Nightmare' }
                ]
            },
            5: {
                name: 'Nature & Life',
                icon: '🏆',
                questions: [
                    { q: 'Synonym of "patrol"?', options: ['Sleep', 'Guard', 'Dance', 'Cook'], answer: 'Guard' },
                    { q: 'Synonym of "excreta"?', options: ['Food', 'Waste', 'Flower', 'Water'], answer: 'Waste' },
                    { q: 'Synonym of "argument"?', options: ['Friendship', 'Dispute', 'Silence', 'Agreement'], answer: 'Dispute' },
                    { q: 'Synonym of "burp"?', options: ['Sneeze', 'Belch', 'Cough', 'Laugh'], answer: 'Belch' },
                    { q: 'Synonym of "sprout"?', options: ['Die', 'Grow', 'Cut', 'Cook'], answer: 'Grow' },
                    { q: 'Synonym of "germination"?', options: ['Destruction', 'Sprouting', 'Sleeping', 'Eating'], answer: 'Sprouting' },
                    { q: 'Synonym of "python"?', options: ['Fish', 'Serpent', 'Bird', 'Lion'], answer: 'Serpent' },
                    { q: 'Synonym of "killing"?', options: ['Saving', 'Murdering', 'Creating', 'Helping'], answer: 'Murdering' },
                    { q: 'Synonym of "boon"?', options: ['Curse', 'Blessing', 'Loss', 'Pain'], answer: 'Blessing' },
                    { q: 'Synonym of "snake charmer"?', options: ['Dancer', 'Juggler', 'Singer', 'Doctor'], answer: 'Juggler' }
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
            },
            3: {
                name: 'Intermediate',
                icon: '🌳',
                questions: [
                    { q: 'Antonym of "brave"?', options: ['Courageous', 'Cowardly', 'Fearless', 'Bold'], answer: 'Cowardly' },
                    { q: 'Antonym of "honest"?', options: ['Truthful', 'Dishonest', 'Sincere', 'Frank'], answer: 'Dishonest' },
                    { q: 'Antonym of "lazy"?', options: ['Idle', 'Active', 'Slow', 'Tired'], answer: 'Active' },
                    { q: 'Antonym of "polite"?', options: ['Courteous', 'Rude', 'Kind', 'Nice'], answer: 'Rude' },
                    { q: 'Antonym of "angry"?', options: ['Furious', 'Calm', 'Mad', 'Upset'], answer: 'Calm' },
                    { q: 'Antonym of "confident"?', options: ['Assured', 'Doubtful', 'Certain', 'Sure'], answer: 'Doubtful' },
                    { q: 'Antonym of "curious"?', options: ['Inquisitive', 'Uninterested', 'Eager', 'Keen'], answer: 'Uninterested' },
                    { q: 'Antonym of "silent"?', options: ['Quiet', 'Loud', 'Mute', 'Still'], answer: 'Loud' },
                    { q: 'Antonym of "kind"?', options: ['Caring', 'Cruel', 'Gentle', 'Nice'], answer: 'Cruel' },
                    { q: 'Antonym of "tired"?', options: ['Exhausted', 'Energetic', 'Weary', 'Sleepy'], answer: 'Energetic' }
                ]
            },
            4: {
                name: 'Advanced',
                icon: '🌴',
                questions: [
                    { q: 'Antonym of "assault"?', options: ['Attack', 'Protect', 'Hit', 'Strike'], answer: 'Protect' },
                    { q: 'Antonym of "collision"?', options: ['Crash', 'Avoidance', 'Impact', 'Hit'], answer: 'Avoidance' },
                    { q: 'Antonym of "extinct"?', options: ['Dead', 'Alive', 'Gone', 'Vanished'], answer: 'Alive' },
                    { q: 'Antonym of "victim"?', options: ['Sufferer', 'Attacker', 'Injured', 'Hurt'], answer: 'Attacker' },
                    { q: 'Antonym of "lure"?', options: ['Tempt', 'Repel', 'Attract', 'Draw'], answer: 'Repel' },
                    { q: 'Antonym of "fog"?', options: ['Mist', 'Clear sky', 'Haze', 'Cloud'], answer: 'Clear sky' },
                    { q: 'Antonym of "hollow"?', options: ['Empty', 'Solid', 'Vacant', 'Bare'], answer: 'Solid' },
                    { q: 'Antonym of "compensation"?', options: ['Payment', 'Penalty', 'Reward', 'Refund'], answer: 'Penalty' },
                    { q: 'Antonym of "hell"?', options: ['Nightmare', 'Heaven', 'Misery', 'Suffering'], answer: 'Heaven' },
                    { q: 'Antonym of "cattle"?', options: ['Livestock', 'Wild animals', 'Farm animals', 'Pets'], answer: 'Wild animals' }
                ]
            },
            5: {
                name: 'Nature & Life',
                icon: '🏆',
                questions: [
                    { q: 'Antonym of "patrol"?', options: ['Guard', 'Ignore', 'Watch', 'Protect'], answer: 'Ignore' },
                    { q: 'Antonym of "excreta"?', options: ['Waste', 'Nutrient', 'Garbage', 'Trash'], answer: 'Nutrient' },
                    { q: 'Antonym of "argument"?', options: ['Dispute', 'Agreement', 'Fight', 'Quarrel'], answer: 'Agreement' },
                    { q: 'Antonym of "sprout"?', options: ['Grow', 'Wither', 'Bloom', 'Blossom'], answer: 'Wither' },
                    { q: 'Antonym of "germination"?', options: ['Sprouting', 'Decay', 'Growth', 'Budding'], answer: 'Decay' },
                    { q: 'Antonym of "killing"?', options: ['Murdering', 'Saving', 'Slaying', 'Destroying'], answer: 'Saving' },
                    { q: 'Antonym of "boon"?', options: ['Blessing', 'Curse', 'Gift', 'Benefit'], answer: 'Curse' },
                    { q: 'Antonym of "python" (large)?', options: ['Giant', 'Tiny', 'Huge', 'Big'], answer: 'Tiny' },
                    { q: 'Antonym of "burp" (release)?', options: ['Belch', 'Hold in', 'Let out', 'Release'], answer: 'Hold in' },
                    { q: 'Antonym of "disagreement"?', options: ['Argument', 'Harmony', 'Dispute', 'Conflict'], answer: 'Harmony' }
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

    // Update Level 5 (Gathri 5) progress
    const level5Data = progress['level5'] || { completed: 0, total: 10, bestScore: 0 };
    const level5Percent = Math.round((level5Data.completed / level5Data.total) * 100);

    const level5ProgressEl = document.getElementById('level5Progress');
    const level5ProgressTextEl = document.getElementById('level5ProgressText');

    if (level5ProgressEl) {
        level5ProgressEl.style.width = level5Percent + '%';
    }

    if (level5ProgressTextEl) {
        if (level5Data.completed === 0) {
            level5ProgressTextEl.textContent = 'Not Started';
        } else if (level5Percent >= 100) {
            level5ProgressTextEl.textContent = '✅ Completed! Best: ' + level5Data.bestScore + '/' + level5Data.total;
        } else {
            level5ProgressTextEl.textContent = 'Best: ' + level5Data.bestScore + '/' + level5Data.total;
        }
    }

    // Update Level 6 (Gathri 6) progress
    const level6Data = progress['level6'] || { completed: 0, total: 15, bestScore: 0 };
    const level6Percent = Math.round((level6Data.completed / level6Data.total) * 100);

    const level6ProgressEl = document.getElementById('level6Progress');
    const level6ProgressTextEl = document.getElementById('level6ProgressText');

    if (level6ProgressEl) {
        level6ProgressEl.style.width = level6Percent + '%';
    }

    if (level6ProgressTextEl) {
        if (level6Data.completed === 0) {
            level6ProgressTextEl.textContent = 'Not Started';
        } else if (level6Percent >= 100) {
            level6ProgressTextEl.textContent = '✅ Completed! Best: ' + level6Data.bestScore + '/' + level6Data.total;
        } else {
            level6ProgressTextEl.textContent = 'Best: ' + level6Data.bestScore + '/' + level6Data.total;
        }
    }

    // Update Level 7 (Gathri 7) progress
    const level7Data = progress['level7'] || { completed: 0, total: 15, bestScore: 0 };
    const level7Percent = Math.round((level7Data.completed / level7Data.total) * 100);

    const level7ProgressEl = document.getElementById('level7Progress');
    const level7ProgressTextEl = document.getElementById('level7ProgressText');

    if (level7ProgressEl) {
        level7ProgressEl.style.width = level7Percent + '%';
    }

    if (level7ProgressTextEl) {
        if (level7Data.completed === 0) {
            level7ProgressTextEl.textContent = 'Not Started';
        } else if (level7Percent >= 100) {
            level7ProgressTextEl.textContent = '✅ Completed! Best: ' + level7Data.bestScore + '/' + level7Data.total;
        } else {
            level7ProgressTextEl.textContent = 'Best: ' + level7Data.bestScore + '/' + level7Data.total;
        }
    }

    // Update Level 8 (Gathri 8) progress
    const level8Data = progress['level8'] || { completed: 0, total: 15, bestScore: 0 };
    const level8Percent = Math.round((level8Data.completed / level8Data.total) * 100);

    const level8ProgressEl = document.getElementById('level8Progress');
    const level8ProgressTextEl = document.getElementById('level8ProgressText');

    if (level8ProgressEl) {
        level8ProgressEl.style.width = level8Percent + '%';
    }

    if (level8ProgressTextEl) {
        if (level8Data.completed === 0) {
            level8ProgressTextEl.textContent = 'Not Started';
        } else if (level8Percent >= 100) {
            level8ProgressTextEl.textContent = '✅ Completed! Best: ' + level8Data.bestScore + '/' + level8Data.total;
        } else {
            level8ProgressTextEl.textContent = 'Best: ' + level8Data.bestScore + '/' + level8Data.total;
        }
    }

    // Update Level 9 (Gathri 9) progress
    const level9Data = progress['level9'] || { completed: 0, total: 15, bestScore: 0 };
    const level9Percent = Math.round((level9Data.completed / level9Data.total) * 100);

    const level9ProgressEl = document.getElementById('level9Progress');
    const level9ProgressTextEl = document.getElementById('level9ProgressText');

    if (level9ProgressEl) {
        level9ProgressEl.style.width = level9Percent + '%';
    }

    if (level9ProgressTextEl) {
        if (level9Data.completed === 0) {
            level9ProgressTextEl.textContent = 'Not Started';
        } else if (level9Percent >= 100) {
            level9ProgressTextEl.textContent = '✅ Completed! Best: ' + level9Data.bestScore + '/' + level9Data.total;
        } else {
            level9ProgressTextEl.textContent = 'Best: ' + level9Data.bestScore + '/' + level9Data.total;
        }
    }

    // Update Level 10 (Gathri 10) progress
    const level10Data = progress['level10'] || { completed: 0, total: 15, bestScore: 0 };
    const level10Percent = Math.round((level10Data.completed / level10Data.total) * 100);

    const level10ProgressEl = document.getElementById('level10Progress');
    const level10ProgressTextEl = document.getElementById('level10ProgressText');

    if (level10ProgressEl) {
        level10ProgressEl.style.width = level10Percent + '%';
    }

    if (level10ProgressTextEl) {
        if (level10Data.completed === 0) {
            level10ProgressTextEl.textContent = 'Not Started';
        } else if (level10Percent >= 100) {
            level10ProgressTextEl.textContent = '✅ Completed! Best: ' + level10Data.bestScore + '/' + level10Data.total;
        } else {
            level10ProgressTextEl.textContent = 'Best: ' + level10Data.bestScore + '/' + level10Data.total;
        }
    }

    // Update Level 11 (Gathri 11) progress
    const level11Data = progress['level11'] || { completed: 0, total: 15, bestScore: 0 };
    const level11Percent = Math.round((level11Data.completed / level11Data.total) * 100);

    const level11ProgressEl = document.getElementById('level11Progress');
    const level11ProgressTextEl = document.getElementById('level11ProgressText');

    if (level11ProgressEl) {
        level11ProgressEl.style.width = level11Percent + '%';
    }

    if (level11ProgressTextEl) {
        if (level11Data.completed === 0) {
            level11ProgressTextEl.textContent = 'Not Started';
        } else if (level11Percent >= 100) {
            level11ProgressTextEl.textContent = '✅ Completed! Best: ' + level11Data.bestScore + '/' + level11Data.total;
        } else {
            level11ProgressTextEl.textContent = 'Best: ' + level11Data.bestScore + '/' + level11Data.total;
        }
    }

    // Update Level 12 (Gathri 12) progress
    const level12Data = progress['level12'] || { completed: 0, total: 15, bestScore: 0 };
    const level12Percent = Math.round((level12Data.completed / level12Data.total) * 100);

    const level12ProgressEl = document.getElementById('level12Progress');
    const level12ProgressTextEl = document.getElementById('level12ProgressText');

    if (level12ProgressEl) {
        level12ProgressEl.style.width = level12Percent + '%';
    }

    if (level12ProgressTextEl) {
        if (level12Data.completed === 0) {
            level12ProgressTextEl.textContent = 'Not Started';
        } else if (level12Percent >= 100) {
            level12ProgressTextEl.textContent = '✅ Completed! Best: ' + level12Data.bestScore + '/' + level12Data.total;
        } else {
            level12ProgressTextEl.textContent = 'Best: ' + level12Data.bestScore + '/' + level12Data.total;
        }
    }

    // Update Level 13 (Gathri 13) progress
    const level13Data = progress['level13'] || { completed: 0, total: 15, bestScore: 0 };
    const level13Percent = Math.round((level13Data.completed / level13Data.total) * 100);

    const level13ProgressEl = document.getElementById('level13Progress');
    const level13ProgressTextEl = document.getElementById('level13ProgressText');

    if (level13ProgressEl) {
        level13ProgressEl.style.width = level13Percent + '%';
    }

    if (level13ProgressTextEl) {
        if (level13Data.completed === 0) {
            level13ProgressTextEl.textContent = 'Not Started';
        } else if (level13Percent >= 100) {
            level13ProgressTextEl.textContent = '✅ Completed! Best: ' + level13Data.bestScore + '/' + level13Data.total;
        } else {
            level13ProgressTextEl.textContent = 'Best: ' + level13Data.bestScore + '/' + level13Data.total;
        }
    }

    // Update Level 14 (Gathri 14) progress
    const level14Data = progress['level14'] || { completed: 0, total: 15, bestScore: 0 };
    const level14Percent = Math.round((level14Data.completed / level14Data.total) * 100);

    const level14ProgressEl = document.getElementById('level14Progress');
    const level14ProgressTextEl = document.getElementById('level14ProgressText');

    if (level14ProgressEl) {
        level14ProgressEl.style.width = level14Percent + '%';
    }

    if (level14ProgressTextEl) {
        if (level14Data.completed === 0) {
            level14ProgressTextEl.textContent = 'Not Started';
        } else if (level14Percent >= 100) {
            level14ProgressTextEl.textContent = '✅ Completed! Best: ' + level14Data.bestScore + '/' + level14Data.total;
        } else {
            level14ProgressTextEl.textContent = 'Best: ' + level14Data.bestScore + '/' + level14Data.total;
        }
    }

    // Update Level 15 (Gathri 15) progress
    const level15Data = progress['level15'] || { completed: 0, total: 15, bestScore: 0 };
    const level15Percent = Math.round((level15Data.completed / level15Data.total) * 100);

    const level15ProgressEl = document.getElementById('level15Progress');
    const level15ProgressTextEl = document.getElementById('level15ProgressText');

    if (level15ProgressEl) {
        level15ProgressEl.style.width = level15Percent + '%';
    }

    if (level15ProgressTextEl) {
        if (level15Data.completed === 0) {
            level15ProgressTextEl.textContent = 'Not Started';
        } else if (level15Percent >= 100) {
            level15ProgressTextEl.textContent = '✅ Completed! Best: ' + level15Data.bestScore + '/' + level15Data.total;
        } else {
            level15ProgressTextEl.textContent = 'Best: ' + level15Data.bestScore + '/' + level15Data.total;
        }
    }

    // Update Level 16 (Gathri 16) progress
    const level16Data = progress['level16'] || { completed: 0, total: 15, bestScore: 0 };
    const level16Percent = Math.round((level16Data.completed / level16Data.total) * 100);

    const level16ProgressEl = document.getElementById('level16Progress');
    const level16ProgressTextEl = document.getElementById('level16ProgressText');

    if (level16ProgressEl) {
        level16ProgressEl.style.width = level16Percent + '%';
    }

    if (level16ProgressTextEl) {
        if (level16Data.completed === 0) {
            level16ProgressTextEl.textContent = 'Not Started';
        } else if (level16Percent >= 100) {
            level16ProgressTextEl.textContent = '✅ Completed! Best: ' + level16Data.bestScore + '/' + level16Data.total;
        } else {
            level16ProgressTextEl.textContent = 'Best: ' + level16Data.bestScore + '/' + level16Data.total;
        }
    }

    // Update Level 17 (Gathri 17) progress
    const level17Data = progress['level17'] || { completed: 0, total: 15, bestScore: 0 };
    const level17Percent = Math.round((level17Data.completed / level17Data.total) * 100);

    const level17ProgressEl = document.getElementById('level17Progress');
    const level17ProgressTextEl = document.getElementById('level17ProgressText');

    if (level17ProgressEl) {
        level17ProgressEl.style.width = level17Percent + '%';
    }

    if (level17ProgressTextEl) {
        if (level17Data.completed === 0) {
            level17ProgressTextEl.textContent = 'Not Started';
        } else if (level17Percent >= 100) {
            level17ProgressTextEl.textContent = '✅ Completed! Best: ' + level17Data.bestScore + '/' + level17Data.total;
        } else {
            level17ProgressTextEl.textContent = 'Best: ' + level17Data.bestScore + '/' + level17Data.total;
        }
    }

    // Update Level 18 (Gathri 18) progress
    const level18Data = progress['level18'] || { completed: 0, total: 15, bestScore: 0 };
    const level18Percent = Math.round((level18Data.completed / level18Data.total) * 100);

    const level18ProgressEl = document.getElementById('level18Progress');
    const level18ProgressTextEl = document.getElementById('level18ProgressText');

    if (level18ProgressEl) {
        level18ProgressEl.style.width = level18Percent + '%';
    }

    if (level18ProgressTextEl) {
        if (level18Data.completed === 0) {
            level18ProgressTextEl.textContent = 'Not Started';
        } else if (level18Percent >= 100) {
            level18ProgressTextEl.textContent = '✅ Completed! Best: ' + level18Data.bestScore + '/' + level18Data.total;
        } else {
            level18ProgressTextEl.textContent = 'Best: ' + level18Data.bestScore + '/' + level18Data.total;
        }
    }

    // Update Level 19 (Gathri 19) progress
    const level19Data = progress['level19'] || { completed: 0, total: 15, bestScore: 0 };
    const level19Percent = Math.round((level19Data.completed / level19Data.total) * 100);

    const level19ProgressEl = document.getElementById('level19Progress');
    const level19ProgressTextEl = document.getElementById('level19ProgressText');

    if (level19ProgressEl) {
        level19ProgressEl.style.width = level19Percent + '%';
    }

    if (level19ProgressTextEl) {
        if (level19Data.completed === 0) {
            level19ProgressTextEl.textContent = 'Not Started';
        } else if (level19Percent >= 100) {
            level19ProgressTextEl.textContent = '✅ Completed! Best: ' + level19Data.bestScore + '/' + level19Data.total;
        } else {
            level19ProgressTextEl.textContent = 'Best: ' + level19Data.bestScore + '/' + level19Data.total;
        }
    }

    // Update Level 20 (Gathri 20) progress
    const level20Data = progress['level20'] || { completed: 0, total: 15, bestScore: 0 };
    const level20Percent = Math.round((level20Data.completed / level20Data.total) * 100);

    const level20ProgressEl = document.getElementById('level20Progress');
    const level20ProgressTextEl = document.getElementById('level20ProgressText');

    if (level20ProgressEl) {
        level20ProgressEl.style.width = level20Percent + '%';
    }

    if (level20ProgressTextEl) {
        if (level20Data.completed === 0) {
            level20ProgressTextEl.textContent = 'Not Started';
        } else if (level20Percent >= 100) {
            level20ProgressTextEl.textContent = '✅ Completed! Best: ' + level20Data.bestScore + '/' + level20Data.total;
        } else {
            level20ProgressTextEl.textContent = 'Best: ' + level20Data.bestScore + '/' + level20Data.total;
        }
    }

    // Update Level 21 (Gathri 21) progress
    const level21Data = progress['level21'] || { completed: 0, total: 15, bestScore: 0 };
    const level21Percent = Math.round((level21Data.completed / level21Data.total) * 100);

    const level21ProgressEl = document.getElementById('level21Progress');
    const level21ProgressTextEl = document.getElementById('level21ProgressText');

    if (level21ProgressEl) {
        level21ProgressEl.style.width = level21Percent + '%';
    }

    if (level21ProgressTextEl) {
        if (level21Data.completed === 0) {
            level21ProgressTextEl.textContent = 'Not Started';
        } else if (level21Percent >= 100) {
            level21ProgressTextEl.textContent = '✅ Completed! Best: ' + level21Data.bestScore + '/' + level21Data.total;
        } else {
            level21ProgressTextEl.textContent = 'Best: ' + level21Data.bestScore + '/' + level21Data.total;
        }
    }

    // Update Level 22 (Gathri 22) progress
    const level22Data = progress['level22'] || { completed: 0, total: 15, bestScore: 0 };
    const level22Percent = Math.round((level22Data.completed / level22Data.total) * 100);

    const level22ProgressEl = document.getElementById('level22Progress');
    const level22ProgressTextEl = document.getElementById('level22ProgressText');

    if (level22ProgressEl) {
        level22ProgressEl.style.width = level22Percent + '%';
    }

    if (level22ProgressTextEl) {
        if (level22Data.completed === 0) {
            level22ProgressTextEl.textContent = 'Not Started';
        } else if (level22Percent >= 100) {
            level22ProgressTextEl.textContent = '✅ Completed! Best: ' + level22Data.bestScore + '/' + level22Data.total;
        } else {
            level22ProgressTextEl.textContent = 'Best: ' + level22Data.bestScore + '/' + level22Data.total;
        }
    }

    // Update Level 23 (Gathri 23) progress
    const level23Data = progress['level23'] || { completed: 0, total: 15, bestScore: 0 };
    const level23Percent = Math.round((level23Data.completed / level23Data.total) * 100);

    const level23ProgressEl = document.getElementById('level23Progress');
    const level23ProgressTextEl = document.getElementById('level23ProgressText');

    if (level23ProgressEl) {
        level23ProgressEl.style.width = level23Percent + '%';
    }

    if (level23ProgressTextEl) {
        if (level23Data.completed === 0) {
            level23ProgressTextEl.textContent = 'Not Started';
        } else if (level23Percent >= 100) {
            level23ProgressTextEl.textContent = '✅ Completed! Best: ' + level23Data.bestScore + '/' + level23Data.total;
        } else {
            level23ProgressTextEl.textContent = 'Best: ' + level23Data.bestScore + '/' + level23Data.total;
        }
    }

    // Update Level 24 (Gathri 24) progress
    const level24Data = progress['level24'] || { completed: 0, total: 15, bestScore: 0 };
    const level24Percent = Math.round((level24Data.completed / level24Data.total) * 100);

    const level24ProgressEl = document.getElementById('level24Progress');
    const level24ProgressTextEl = document.getElementById('level24ProgressText');

    if (level24ProgressEl) {
        level24ProgressEl.style.width = level24Percent + '%';
    }

    if (level24ProgressTextEl) {
        if (level24Data.completed === 0) {
            level24ProgressTextEl.textContent = 'Not Started';
        } else if (level24Percent >= 100) {
            level24ProgressTextEl.textContent = '✅ Completed! Best: ' + level24Data.bestScore + '/' + level24Data.total;
        } else {
            level24ProgressTextEl.textContent = 'Best: ' + level24Data.bestScore + '/' + level24Data.total;
        }
    }

    // Update Level 25 (Gathri 25) progress
    const level25Data = progress['level25'] || { completed: 0, total: 15, bestScore: 0 };
    const level25Percent = Math.round((level25Data.completed / level25Data.total) * 100);

    const level25ProgressEl = document.getElementById('level25Progress');
    const level25ProgressTextEl = document.getElementById('level25ProgressText');

    if (level25ProgressEl) {
        level25ProgressEl.style.width = level25Percent + '%';
    }

    if (level25ProgressTextEl) {
        if (level25Data.completed === 0) {
            level25ProgressTextEl.textContent = 'Not Started';
        } else if (level25Percent >= 100) {
            level25ProgressTextEl.textContent = '✅ Completed! Best: ' + level25Data.bestScore + '/' + level25Data.total;
        } else {
            level25ProgressTextEl.textContent = 'Best: ' + level25Data.bestScore + '/' + level25Data.total;
        }
    }

    // Update Level 26 (Gathri 26) progress
    const level26Data = progress['level26'] || { completed: 0, total: 15, bestScore: 0 };
    const level26Percent = Math.round((level26Data.completed / level26Data.total) * 100);

    const level26ProgressEl = document.getElementById('level26Progress');
    const level26ProgressTextEl = document.getElementById('level26ProgressText');

    if (level26ProgressEl) {
        level26ProgressEl.style.width = level26Percent + '%';
    }

    if (level26ProgressTextEl) {
        if (level26Data.completed === 0) {
            level26ProgressTextEl.textContent = 'Not Started';
        } else if (level26Percent >= 100) {
            level26ProgressTextEl.textContent = '✅ Completed! Best: ' + level26Data.bestScore + '/' + level26Data.total;
        } else {
            level26ProgressTextEl.textContent = 'Best: ' + level26Data.bestScore + '/' + level26Data.total;
        }
    }

    // Update Level 27 (Gathri 27) progress
    const level27Data = progress['level27'] || { completed: 0, total: 15, bestScore: 0 };
    const level27Percent = Math.round((level27Data.completed / level27Data.total) * 100);

    const level27ProgressEl = document.getElementById('level27Progress');
    const level27ProgressTextEl = document.getElementById('level27ProgressText');

    if (level27ProgressEl) {
        level27ProgressEl.style.width = level27Percent + '%';
    }

    if (level27ProgressTextEl) {
        if (level27Data.completed === 0) {
            level27ProgressTextEl.textContent = 'Not Started';
        } else if (level27Percent >= 100) {
            level27ProgressTextEl.textContent = '✅ Completed! Best: ' + level27Data.bestScore + '/' + level27Data.total;
        } else {
            level27ProgressTextEl.textContent = 'Best: ' + level27Data.bestScore + '/' + level27Data.total;
        }
    }

    // Update Level 28 (Gathri 28) progress
    const level28Data = progress['level28'] || { completed: 0, total: 15, bestScore: 0 };
    const level28Percent = Math.round((level28Data.completed / level28Data.total) * 100);

    const level28ProgressEl = document.getElementById('level28Progress');
    const level28ProgressTextEl = document.getElementById('level28ProgressText');

    if (level28ProgressEl) {
        level28ProgressEl.style.width = level28Percent + '%';
    }

    if (level28ProgressTextEl) {
        if (level28Data.completed === 0) {
            level28ProgressTextEl.textContent = 'Not Started';
        } else if (level28Percent >= 100) {
            level28ProgressTextEl.textContent = '✅ Completed! Best: ' + level28Data.bestScore + '/' + level28Data.total;
        } else {
            level28ProgressTextEl.textContent = 'Best: ' + level28Data.bestScore + '/' + level28Data.total;
        }
    }

    // Update Level 29 (Gathri 29) progress
    const level29Data = progress['level29'] || { completed: 0, total: 15, bestScore: 0 };
    const level29Percent = Math.round((level29Data.completed / level29Data.total) * 100);

    const level29ProgressEl = document.getElementById('level29Progress');
    const level29ProgressTextEl = document.getElementById('level29ProgressText');

    if (level29ProgressEl) {
        level29ProgressEl.style.width = level29Percent + '%';
    }

    if (level29ProgressTextEl) {
        if (level29Data.completed === 0) {
            level29ProgressTextEl.textContent = 'Not Started';
        } else if (level29Percent >= 100) {
            level29ProgressTextEl.textContent = '✅ Completed! Best: ' + level29Data.bestScore + '/' + level29Data.total;
        } else {
            level29ProgressTextEl.textContent = 'Best: ' + level29Data.bestScore + '/' + level29Data.total;
        }
    }

    // Update Level 30 (Gathri 30) progress
    const level30Data = progress['level30'] || { completed: 0, total: 15, bestScore: 0 };
    const level30Percent = Math.round((level30Data.completed / level30Data.total) * 100);

    const level30ProgressEl = document.getElementById('level30Progress');
    const level30ProgressTextEl = document.getElementById('level30ProgressText');

    if (level30ProgressEl) {
        level30ProgressEl.style.width = level30Percent + '%';
    }

    if (level30ProgressTextEl) {
        if (level30Data.completed === 0) {
            level30ProgressTextEl.textContent = 'Not Started';
        } else if (level30Percent >= 100) {
            level30ProgressTextEl.textContent = '✅ Completed! Best: ' + level30Data.bestScore + '/' + level30Data.total;
        } else {
            level30ProgressTextEl.textContent = 'Best: ' + level30Data.bestScore + '/' + level30Data.total;
        }
    }

    // Update Level 31 (Gathri 31) progress
    const level31Data = progress['level31'] || { completed: 0, total: 15, bestScore: 0 };
    const level31Percent = Math.round((level31Data.completed / level31Data.total) * 100);

    const level31ProgressEl = document.getElementById('level31Progress');
    const level31ProgressTextEl = document.getElementById('level31ProgressText');

    if (level31ProgressEl) {
        level31ProgressEl.style.width = level31Percent + '%';
    }

    if (level31ProgressTextEl) {
        if (level31Data.completed === 0) {
            level31ProgressTextEl.textContent = 'Not Started';
        } else if (level31Percent >= 100) {
            level31ProgressTextEl.textContent = '✅ Completed! Best: ' + level31Data.bestScore + '/' + level31Data.total;
        } else {
            level31ProgressTextEl.textContent = 'Best: ' + level31Data.bestScore + '/' + level31Data.total;
        }
    }

    // Update Level 32 (Gathri 32) progress
    const level32Data = progress['level32'] || { completed: 0, total: 15, bestScore: 0 };
    const level32Percent = Math.round((level32Data.completed / level32Data.total) * 100);

    const level32ProgressEl = document.getElementById('level32Progress');
    const level32ProgressTextEl = document.getElementById('level32ProgressText');

    if (level32ProgressEl) {
        level32ProgressEl.style.width = level32Percent + '%';
    }

    if (level32ProgressTextEl) {
        if (level32Data.completed === 0) {
            level32ProgressTextEl.textContent = 'Not Started';
        } else if (level32Percent >= 100) {
            level32ProgressTextEl.textContent = '✅ Completed! Best: ' + level32Data.bestScore + '/' + level32Data.total;
        } else {
            level32ProgressTextEl.textContent = 'Best: ' + level32Data.bestScore + '/' + level32Data.total;
        }
    }

    // Update Level 33 (Gathri 33) progress
    const level33Data = progress['level33'] || { completed: 0, total: 15, bestScore: 0 };
    const level33Percent = Math.round((level33Data.completed / level33Data.total) * 100);

    const level33ProgressEl = document.getElementById('level33Progress');
    const level33ProgressTextEl = document.getElementById('level33ProgressText');

    if (level33ProgressEl) {
        level33ProgressEl.style.width = level33Percent + '%';
    }

    if (level33ProgressTextEl) {
        if (level33Data.completed === 0) {
            level33ProgressTextEl.textContent = 'Not Started';
        } else if (level33Percent >= 100) {
            level33ProgressTextEl.textContent = '✅ Completed! Best: ' + level33Data.bestScore + '/' + level33Data.total;
        } else {
            level33ProgressTextEl.textContent = 'Best: ' + level33Data.bestScore + '/' + level33Data.total;
        }
    }

    // Update Level 34 (Gathri 34) progress
    const level34Data = progress['level34'] || { completed: 0, total: 15, bestScore: 0 };
    const level34Percent = Math.round((level34Data.completed / level34Data.total) * 100);

    const level34ProgressEl = document.getElementById('level34Progress');
    const level34ProgressTextEl = document.getElementById('level34ProgressText');

    if (level34ProgressEl) {
        level34ProgressEl.style.width = level34Percent + '%';
    }

    if (level34ProgressTextEl) {
        if (level34Data.completed === 0) {
            level34ProgressTextEl.textContent = 'Not Started';
        } else if (level34Percent >= 100) {
            level34ProgressTextEl.textContent = '✅ Completed! Best: ' + level34Data.bestScore + '/' + level34Data.total;
        } else {
            level34ProgressTextEl.textContent = 'Best: ' + level34Data.bestScore + '/' + level34Data.total;
        }
    }

    // Update Level 35 (Gathri 35) progress
    const level35Data = progress['level35'] || { completed: 0, total: 15, bestScore: 0 };
    const level35Percent = Math.round((level35Data.completed / level35Data.total) * 100);

    const level35ProgressEl = document.getElementById('level35Progress');
    const level35ProgressTextEl = document.getElementById('level35ProgressText');

    if (level35ProgressEl) {
        level35ProgressEl.style.width = level35Percent + '%';
    }

    if (level35ProgressTextEl) {
        if (level35Data.completed === 0) {
            level35ProgressTextEl.textContent = 'Not Started';
        } else if (level35Percent >= 100) {
            level35ProgressTextEl.textContent = '✅ Completed! Best: ' + level35Data.bestScore + '/' + level35Data.total;
        } else {
            level35ProgressTextEl.textContent = 'Best: ' + level35Data.bestScore + '/' + level35Data.total;
        }
    }

    // Update Level 36 (Gathri 36) progress
    const level36Data = progress['level36'] || { completed: 0, total: 14, bestScore: 0 };
    const level36Percent = Math.round((level36Data.completed / level36Data.total) * 100);

    const level36ProgressEl = document.getElementById('level36Progress');
    const level36ProgressTextEl = document.getElementById('level36ProgressText');

    if (level36ProgressEl) {
        level36ProgressEl.style.width = level36Percent + '%';
    }

    if (level36ProgressTextEl) {
        if (level36Data.completed === 0) {
            level36ProgressTextEl.textContent = 'Not Started';
        } else if (level36Percent >= 100) {
            level36ProgressTextEl.textContent = '✅ Completed! Best: ' + level36Data.bestScore + '/' + level36Data.total;
        } else {
            level36ProgressTextEl.textContent = 'Best: ' + level36Data.bestScore + '/' + level36Data.total;
        }
    }

    // Update Level 37 (Gathri 37) progress
    const level37Data = progress['level37'] || { completed: 0, total: 15, bestScore: 0 };
    const level37Percent = Math.round((level37Data.completed / level37Data.total) * 100);

    const level37ProgressEl = document.getElementById('level37Progress');
    const level37ProgressTextEl = document.getElementById('level37ProgressText');

    if (level37ProgressEl) {
        level37ProgressEl.style.width = level37Percent + '%';
    }

    if (level37ProgressTextEl) {
        if (level37Data.completed === 0) {
            level37ProgressTextEl.textContent = 'Not Started';
        } else if (level37Percent >= 100) {
            level37ProgressTextEl.textContent = '✅ Completed! Best: ' + level37Data.bestScore + '/' + level37Data.total;
        } else {
            level37ProgressTextEl.textContent = 'Best: ' + level37Data.bestScore + '/' + level37Data.total;
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
    document.getElementById('quizCategory').textContent = 'Gathri ' + level + ' • ' + levelData.name;
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

    [1, 2, 3, 4, 5].forEach(level => {
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

    document.getElementById('quizCategory').textContent = 'Gathri ' + level + ' • ' + levelData.name;
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

    [1, 2, 3, 4, 5].forEach(level => {
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

    document.getElementById('quizCategory').textContent = 'Gathri ' + level + ' • ' + levelData.name;
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

    // Hide feedback & inline explanation
    document.getElementById('feedbackBox').className = 'feedback-box';
    const inlineExp = document.getElementById('inlineExplanation');
    if (inlineExp) {
        inlineExp.style.display = 'none';
        inlineExp.classList.remove('visible');
    }

    // Show/Hide Pronunciation Button based on mode
    const pronounceBtn = document.getElementById('pronounceBtn');
    if (pronounceBtn) {
        const vocabModes = ['vocabulary', 'synonyms', 'antonyms', 'idioms'];
        if (vocabModes.includes(quizState.mode)) {
            pronounceBtn.style.display = 'inline-flex';
            pronounceBtn.className = 'pronounce-btn visible';
            // Reset speaking state
            document.getElementById('pronounceLabel').textContent = 'Hear It';
        } else {
            pronounceBtn.style.display = 'none';
        }
    }
}

// ============================================
// PRONUNCIATION ENGINE - Web Speech API
// Premium word pronunciation for vocabulary
// ============================================

// Cache the best English voice once found
let _cachedEnglishVoice = null;
let _voicesLoaded = false;

/**
 * Get the best available English voice for pronunciation.
 * Prioritizes: en-US/en-GB female voices > en-US/en-GB any > any English voice > default
 */
function getBestEnglishVoice() {
    if (_cachedEnglishVoice && _voicesLoaded) return _cachedEnglishVoice;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return null;

    _voicesLoaded = true;

    // Priority 1: Premium English voices (US/UK female — clearer for learners)
    const premiumNames = ['Samantha', 'Karen', 'Moira', 'Tessa', 'Martha', 'Google US English', 'Google UK English Female'];
    const premium = voices.find(v => premiumNames.some(name => v.name.includes(name)));
    if (premium) { _cachedEnglishVoice = premium; return premium; }

    // Priority 2: Any en-US or en-GB voice
    const usUk = voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB');
    if (usUk) { _cachedEnglishVoice = usUk; return usUk; }

    // Priority 3: Any English voice
    const anyEn = voices.find(v => v.lang.startsWith('en'));
    if (anyEn) { _cachedEnglishVoice = anyEn; return anyEn; }

    // Fallback: default voice
    return voices[0] || null;
}

// Pre-load voices (some browsers load them asynchronously)
if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
        _cachedEnglishVoice = null;
        _voicesLoaded = false;
        getBestEnglishVoice();
    };
}

/**
 * Extracts the English word from the vocabulary question text.
 * Handles formats like:
 *  - What does "happy" mean?
 *  - What is the meaning of Assault?
 *  - What does "Crack down" mean?
 */
function extractWordFromQuestion(questionText) {
    if (!questionText) return null;

    // Pattern 1: Word inside quotes — "word" or "word"
    const quotedMatch = questionText.match(/["""]([^"""]+)["""]/);
    if (quotedMatch) return quotedMatch[1].trim();

    // Pattern 2: "What is the meaning of WORD?"
    const meaningOfMatch = questionText.match(/meaning\s+of\s+(.+?)[\?\.]?\s*$/i);
    if (meaningOfMatch) return meaningOfMatch[1].trim().replace(/\?$/, '');

    // Pattern 3: "What does WORD mean?"
    const doesMatch = questionText.match(/does\s+(.+?)\s+mean/i);
    if (doesMatch) return doesMatch[1].trim().replace(/["""]/g, '');

    return null;
}

/**
 * Pronounce a word using the Web Speech API.
 * @param {string} word - The word to pronounce (if null, extracts from current question)
 */
function pronounceWord(word) {
    // Respect mute toggle — no pronunciation when sounds are off
    if (window.BroProSounds && !BroProSounds.enabled) return;

    if (!window.speechSynthesis) {
        console.warn('🔇 Speech Synthesis not supported in this browser');
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Get word from current question if not provided
    if (!word) {
        const q = quizState.questions[quizState.currentIndex];
        word = extractWordFromQuestion(q?.q);
    }

    if (!word) {
        console.warn('🔇 Could not extract word from question');
        return;
    }

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(word);

    // Configure for clear, learner-friendly pronunciation
    const voice = getBestEnglishVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = 'en-US';
    utterance.rate = 0.85;   // Slightly slower for clarity
    utterance.pitch = 1.0;   // Natural pitch
    utterance.volume = 1.0;  // Full volume

    // UI: Enter speaking state
    const btn = document.getElementById('pronounceBtn');
    if (btn) {
        btn.classList.add('speaking');
        document.getElementById('pronounceLabel').textContent = word;
    }

    // Play a subtle click sound if available
    if (window.BroProSounds) BroProSounds.play('click');

    // When speech ends, reset button
    utterance.onend = () => {
        if (btn) {
            btn.classList.remove('speaking');
            document.getElementById('pronounceLabel').textContent = 'Hear It';
        }
    };

    utterance.onerror = () => {
        if (btn) {
            btn.classList.remove('speaking');
            document.getElementById('pronounceLabel').textContent = 'Hear It';
        }
    };

    // Speak!
    window.speechSynthesis.speak(utterance);
}

/**
 * Auto-pronounce the vocabulary word after user answers.
 * Called automatically — speaks the correct word for reinforcement.
 */
function autoPronounceAfterAnswer() {
    // Respect mute toggle — skip auto-pronunciation when sounds are off
    if (window.BroProSounds && !BroProSounds.enabled) return;

    const vocabModes = ['vocabulary', 'synonyms', 'antonyms', 'idioms'];
    if (!vocabModes.includes(quizState.mode)) return;
    if (!window.speechSynthesis) return;

    const q = quizState.questions[quizState.currentIndex];
    const word = extractWordFromQuestion(q?.q);
    if (!word) return;

    // Small delay so the feedback appears first, then pronunciation plays
    setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(word);
        const voice = getBestEnglishVoice();
        if (voice) utterance.voice = voice;
        utterance.lang = 'en-US';
        utterance.rate = 0.8;   // Even slower for post-answer reinforcement
        utterance.pitch = 1.0;
        utterance.volume = 0.85;
        window.speechSynthesis.speak(utterance);
    }, 300);
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

    // Auto-pronounce the word after answering (vocabulary reinforcement)
    // Cancel any manual pronunciation first
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    autoPronounceAfterAnswer();

    // Hide the manual pronounce button during feedback
    const pronounceBtn = document.getElementById('pronounceBtn');
    if (pronounceBtn) pronounceBtn.style.display = 'none';

    // Check if this question has inline explanation data
    const hasExplanation = q.explanation && q.explanation.word;

    if (hasExplanation) {
        // Delay explanation card so feedback + meme sounds have time to play
        setTimeout(() => {
            showInlineExplanation(q.explanation, isCorrect);
        }, 800);
    } else {
        // No explanation data (e.g., grammar) — use original auto-advance timer
        setTimeout(() => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
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
// INLINE EXPLANATION ENGINE
// Shows explanation card immediately after each answer
// with हिं/En translation toggle support
// ============================================

// State for the currently displayed inline explanation
let _currentInlineExp = null;
let _currentInlineExpLang = 'en';

/**
 * Display the inline explanation card with word details.
 * @param {Object} exp - The explanation object from the question
 * @param {boolean} isCorrect - Whether the user answered correctly
 */
function showInlineExplanation(exp, isCorrect) {
    const card = document.getElementById('inlineExplanation');
    if (!card) return;

    // Store explanation data for language toggle
    _currentInlineExp = exp;
    _currentInlineExpLang = 'en';

    // Look up Hindi data from vocabularyDB
    _currentInlineExp._hiData = _lookupHindiData(exp);

    // Reset toggle buttons to English active
    _updateInlineLangToggle('en');

    // Render in English (default)
    _renderInlineExpContent('en');

    // Update the "Next" button text for last question
    const nextBtn = document.getElementById('inlineExpNextBtn');
    if (quizState.currentIndex >= quizState.questions.length - 1) {
        nextBtn.textContent = 'Finish Quiz 🏆';
    } else {
        nextBtn.textContent = 'Next →';
    }

    // Show the card with animation
    card.style.display = 'block';
    card.classList.add('visible');

    // Scroll the explanation into view smoothly
    setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Look up Hindi translations from the vocabularyDB in explanations.js.
 * Returns an object with sentenceHi and extraInfoHi if found.
 * Falls back to building Hindi data from the explanation object itself.
 */
function _lookupHindiData(exp) {
    const q = quizState.questions[quizState.currentIndex];
    if (!q) return null;

    // Extract the English key from the answer (e.g., "Indecent/Vulgar (अश्लील/अभद्र)" -> "indecent/vulgar")
    let answerKey = q.answer || '';
    answerKey = answerKey.replace(/\s*\([^)]*\)\s*/g, '').trim().toLowerCase();

    // Try vocabularyDB lookup first
    if (window.BroProExplanations) {
        try {
            const entry = BroProExplanations._getVocabEntry(answerKey);
            if (entry && (entry.sentenceHi || entry.extraInfoHi)) {
                return entry;
            }
        } catch (e) {
            // Silent fallback
        }
    }

    // Fallback: Build Hindi data from the explanation object's hindi field
    // This ensures the toggle always has SOMETHING to show in Hindi
    if (exp.hindi) {
        return {
            sentenceHi: null,
            extraInfoHi: exp.word + ' (' + exp.hindi + ') — ' + (exp.partOfSpeech || '') + '. ' + (exp.meaning || ''),
            extraInfo: exp.meaning || ''
        };
    }

    return null;
}

/**
 * Render the inline explanation content in the specified language.
 * @param {string} lang - 'en' or 'hi'
 */
function _renderInlineExpContent(lang) {
    const exp = _currentInlineExp;
    if (!exp) return;

    const hiData = exp._hiData;

    // Word & Part of Speech (always in English)
    document.getElementById('inlineExpWord').textContent = exp.word || '';
    document.getElementById('inlineExpPos').textContent = exp.partOfSpeech || '';
    document.getElementById('inlineExpHindi').textContent = exp.hindi ? '(' + exp.hindi + ')' : '';

    // Meaning
    const meaningEl = document.getElementById('inlineExpMeaning');
    if (lang === 'hi' && hiData && hiData.extraInfoHi) {
        meaningEl.textContent = hiData.extraInfoHi;
    } else {
        meaningEl.textContent = exp.meaning || '';
    }

    // Sentence
    const sentenceEl = document.getElementById('inlineExpSentence');
    if (lang === 'hi' && hiData && hiData.sentenceHi) {
        sentenceEl.innerHTML = hiData.sentenceHi;
    } else if (exp.sentence) {
        if (exp.sentence.includes('<strong>') || exp.sentence.includes('<b>')) {
            sentenceEl.innerHTML = exp.sentence;
        } else {
            const wordRegex = new RegExp('(' + exp.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            sentenceEl.innerHTML = exp.sentence.replace(wordRegex, '<strong>$1</strong>');
        }
    } else {
        sentenceEl.textContent = '';
    }

    // Synonyms (always in English)
    const synContainer = document.getElementById('inlineExpSynonyms');
    const synGroup = document.getElementById('inlineExpSynonymsGroup');
    if (exp.synonyms && exp.synonyms.length > 0) {
        synContainer.innerHTML = exp.synonyms.map(s =>
            '<span class="inline-exp-tag synonym">' + s + '</span>'
        ).join('');
        synGroup.style.display = 'block';
    } else {
        synContainer.innerHTML = '';
        synGroup.style.display = 'none';
    }

    // Antonyms (always in English)
    const antContainer = document.getElementById('inlineExpAntonyms');
    const antGroup = document.getElementById('inlineExpAntonymsGroup');
    if (exp.antonyms && exp.antonyms.length > 0) {
        antContainer.innerHTML = exp.antonyms.map(a =>
            '<span class="inline-exp-tag antonym">' + a + '</span>'
        ).join('');
        antGroup.style.display = 'block';
    } else {
        antContainer.innerHTML = '';
        antGroup.style.display = 'none';
    }
}

/**
 * Update the toggle button active states.
 * @param {string} lang - 'en' or 'hi'
 */
function _updateInlineLangToggle(lang) {
    const toggleContainer = document.getElementById('inlineExpLangToggle');
    if (!toggleContainer) return;

    toggleContainer.querySelectorAll('.inline-lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Toggle inline explanation language (called from toggle buttons).
 * @param {string} lang - 'en' or 'hi'
 */
function toggleInlineExpLang(lang) {
    if (!_currentInlineExp) return;
    if (_currentInlineExpLang === lang) return;

    _currentInlineExpLang = lang;
    _updateInlineLangToggle(lang);
    _renderInlineExpContent(lang);

    if (window.BroProSounds) BroProSounds.play('click');
}

/**
 * Advance to the next question (called from inline explanation "Next" button).
 */
function advanceToNextQuestion() {
    // Cancel any ongoing speech
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    // Hide the inline explanation
    const card = document.getElementById('inlineExplanation');
    if (card) {
        card.style.display = 'none';
        card.classList.remove('visible');
    }

    // Clear state
    _currentInlineExp = null;
    _currentInlineExpLang = 'en';

    // Advance
    quizState.currentIndex++;
    if (quizState.currentIndex >= quizState.questions.length) {
        endQuiz();
    } else {
        loadQuestion();
    }
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

    // 🎰 Check for Saat Crore Easter Egg (7 quizzes with 90%+ accuracy)
    if (window.SaatCroreEasterEgg) {
        SaatCroreEasterEgg.recordPerfectQuiz(accuracy, quizState.mode);
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
    // Cancel any ongoing pronunciation
    if (window.speechSynthesis) window.speechSynthesis.cancel();
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


// ============================================
// SORTING FUNCTIONALITY FOR LEVELS
// ============================================

// Sorting state - stored in localStorage for persistence
let vocabSortAscending = localStorage.getItem('vocabSortAscending') !== 'false';
let grammarSortAscending = localStorage.getItem('grammarSortAscending') !== 'false';

/**
 * Toggle Vocabulary Levels Sort Order
 * Reorders the Gathri cards in ascending/descending order
 */
function toggleVocabSort() {
    vocabSortAscending = !vocabSortAscending;
    localStorage.setItem('vocabSortAscending', vocabSortAscending);

    // Update button UI
    const btn = document.getElementById('vocabSortBtn');
    const icon = document.getElementById('vocabSortIcon');
    const text = document.getElementById('vocabSortText');

    if (vocabSortAscending) {
        btn.classList.remove('descending');
        icon.textContent = '↑';
        text.textContent = 'Low → High';
    } else {
        btn.classList.add('descending');
        icon.textContent = '↓';
        text.textContent = 'High → Low';
    }

    // Reorder the grid
    sortVocabLevels();
}

/**
 * Sort vocabulary level cards in the grid
 */
function sortVocabLevels() {
    const grid = document.getElementById('vocabLevelsGrid');
    if (!grid) return;

    // Get all level cards
    const cards = Array.from(grid.querySelectorAll('.gathri-card'));

    // Sort by level number
    cards.sort((a, b) => {
        // Get level number from the gathri-number element
        const aNum = parseInt(a.querySelector('.gathri-number')?.textContent) || 0;
        const bNum = parseInt(b.querySelector('.gathri-number')?.textContent) || 0;

        return vocabSortAscending ? aNum - bNum : bNum - aNum;
    });

    // Animate reordering
    cards.forEach((card, index) => {
        card.style.order = index;
        // Add animation
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = 'sortFadeIn 0.3s ease forwards';
        card.style.animationDelay = `${index * 0.03}s`;
    });
}

/**
 * Toggle Grammar (BroGrammar) Levels Sort Order
 * Reorders the grammar level cards in ascending/descending order
 */
function toggleGrammarSort() {
    grammarSortAscending = !grammarSortAscending;
    localStorage.setItem('grammarSortAscending', grammarSortAscending);

    // Update button UI
    const btn = document.getElementById('grammarSortBtn');
    const icon = document.getElementById('grammarSortIcon');
    const text = document.getElementById('grammarSortText');

    if (grammarSortAscending) {
        btn.classList.remove('descending');
        icon.textContent = '↑';
        text.textContent = 'Low → High';
    } else {
        btn.classList.add('descending');
        icon.textContent = '↓';
        text.textContent = 'High → Low';
    }

    // Reorder the grid
    sortGrammarLevels();
}

/**
 * Sort grammar level cards in the grid
 */
function sortGrammarLevels() {
    const grid = document.getElementById('grammarLevelsGrid');
    if (!grid) return;

    // Get all level cards (exclude the "Coming Soon" card)
    const cards = Array.from(grid.querySelectorAll('.wb-level-card'));
    const comingSoon = grid.querySelector('.vocab-level-card:not(.wb-level-card)');

    // Sort by level number
    cards.sort((a, b) => {
        // Get level number from the badge or data attribute
        const aText = a.querySelector('.level-badge-premium')?.textContent || '';
        const bText = b.querySelector('.level-badge-premium')?.textContent || '';
        const aNum = parseInt(aText.replace(/\D/g, '')) || 0;
        const bNum = parseInt(bText.replace(/\D/g, '')) || 0;

        return grammarSortAscending ? aNum - bNum : bNum - aNum;
    });

    // Animate reordering
    cards.forEach((card, index) => {
        card.style.order = index;
        // Add animation
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = 'sortFadeIn 0.3s ease forwards';
        card.style.animationDelay = `${index * 0.03}s`;
    });

    // Keep "Coming Soon" at the end
    if (comingSoon) {
        comingSoon.style.order = cards.length;
    }
}

/**
 * Initialize sort state from localStorage on page load
 */
function initSortState() {
    // Initialize vocabulary sort state
    const vocabBtn = document.getElementById('vocabSortBtn');
    const vocabIcon = document.getElementById('vocabSortIcon');
    const vocabText = document.getElementById('vocabSortText');

    if (vocabBtn && vocabIcon && vocabText) {
        if (!vocabSortAscending) {
            vocabBtn.classList.add('descending');
            vocabIcon.textContent = '↓';
            vocabText.textContent = 'High → Low';
        }
        // Apply initial sort
        sortVocabLevels();
    }

    // Initialize grammar sort state
    const grammarBtn = document.getElementById('grammarSortBtn');
    const grammarIcon = document.getElementById('grammarSortIcon');
    const grammarText = document.getElementById('grammarSortText');

    if (grammarBtn && grammarIcon && grammarText) {
        if (!grammarSortAscending) {
            grammarBtn.classList.add('descending');
            grammarIcon.textContent = '↓';
            grammarText.textContent = 'High → Low';
        }
        // Apply initial sort
        sortGrammarLevels();
    }
}

// Initialize sort state when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSortState);
} else {
    initSortState();
}
