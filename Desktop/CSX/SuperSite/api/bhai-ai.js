/**
 * ============================================
 * 🤖 BhAI - AI Chat Endpoint
 * ============================================
 * Primary: Google Gemini API | Fallback: Groq API
 * With AI-powered Admin Command Mode
 * 
 * Security: Fortress Protocol Compliant
 * - Server-side admin verification
 * - CORS whitelisting
 * - Input validation
 * - Safe error handling
 */

const {
    setCorsHeaders,
    handlePreflight,
    sendError,
    Validators,
    verifyAdmin
} = require('./_security');

module.exports = async function handler(req, res) {
    // Set secure CORS headers
    setCorsHeaders(req, res);

    // Handle preflight
    if (handlePreflight(req, res)) return;

    // Only allow POST
    if (req.method !== 'POST') {
        return sendError(res, 405, 'Method not allowed');
    }

    try {
        const {
            message,
            conversationHistory = [],
            schoolConfig = {},
            roastMode = false,
            // Personalization data
            userData = null,
            adminNotes = ''
        } = req.body;

        // ============================================
        // INPUT VALIDATION
        // ============================================
        if (!message || typeof message !== 'string') {
            return sendError(res, 400, 'Message is required');
        }

        if (message.length > 2000) {
            return sendError(res, 400, 'Message too long (max 2000 characters)');
        }

        // Validate conversation history
        if (!Array.isArray(conversationHistory)) {
            return sendError(res, 400, 'Invalid conversation history format');
        }

        // Limit conversation history to prevent abuse
        const safeHistory = conversationHistory.slice(-20).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: String(msg.content || '').slice(0, 1000)
        }));

        // ============================================
        // 🔐 SERVER-SIDE ADMIN VERIFICATION
        // ============================================
        // Instead of trusting client's isAdmin flag, verify server-side
        const authResult = await verifyAdmin(req);
        const isAdmin = authResult.isAdmin;

        if (isAdmin) {
            console.log('🔐 Admin access verified for:', authResult.email);
        }

        // Default Configuration (handle null schoolConfig)
        const cfg = schoolConfig || {};
        const schoolName = cfg.schoolName || "Noorjahan Public School";
        const location = cfg.schoolLocation || "Sarai Bhanauli, Bikapur, Ayodhya, Uttar Pradesh";
        const timing = cfg.schoolTiming || "10:00 AM to 3:00 PM";
        const lunchBreak = cfg.lunchBreak || "12:10 PM";
        const principal = cfg.principalName || "Ms. Pratima Yadav";
        const manager = cfg.managerName || "Mohd Faiyaz Khan";
        const upcomingHoliday = cfg.upcomingHoliday || "";
        const contact = cfg.contact || "9793928793";

        // Flexible fields for any information
        const compassionFundDefault = `THE ORIGIN OF COMPASSION DAY & COMPASSION FUND:

Until 2025, Bhai (Mohd Akhlaq Khan) had never celebrated his birthday. On May 15, 2025, his students arranged a surprise birthday party - the first time anyone had organized a celebration for him.

However, earlier in April 2025, India had suffered a tragic terrorist attack in Pahalgam where many innocent civilians were killed. Even in May, the suffering continued as Pakistan was firing indiscriminately in Kashmir where people were living. The pain of losing innocent lives was immense.

Showing compassion for those who were suffering, Bhai decided he could not celebrate his personal happiness while his fellow countrymen were in pain. He cancelled the birthday festivities.

Instead, he declared that May 15th would be observed every year as "COMPASSION DAY" (करुणा दिवस) - a day to remember those who suffered and to help those in need. To make a real difference, Bhai and his students together (hum sabne milkar) created the "COMPASSION FUND" to help needy, marginalized, and oppressed people in society.

RECENT IMPACT: The fund provided monetary support to a Divyang (physically disabled) person who was struggling because they were not receiving their pension.

FUND MANAGEMENT:
- The fund is managed by an elected PRESIDENT, chosen through voting by students and donors
- Current President: Ms. Stuti Chaurasiya (Since May 2026)
- The President maintains a LEDGER with complete record of all transactions
- Anyone can approach the President to see the transaction records
- This ensures TRANSPARENCY and ACCOUNTABILITY

VALUES: Collective Action, Compassion, Unity, Transparency, Helping Others Together`;

        const compassionFund = cfg.compassionFund || compassionFundDefault;
        const announcements = cfg.announcements || "";
        const recentEvents = cfg.recentEvents || "";
        const knowledgeBase = cfg.knowledgeBase || "";

        // Compassion Stories
        const compassionStoriesDefault = `=== COMPASSION STORIES - Real-Life Examples of Compassion in Action ===

📖 STORY 1: THE GIFT OF COMPASSION (करुणा का उपहार) - January 2026

🎭 FULL STORY:
Once upon a time (Ek samay ki baat hai), three students named Sunil, Suraj, and Ankit used to study at Noorjahan Public School. Whenever they went to school, they used to meet an old grandmother (Boodhi Dadi) with her son on the way. The grandmother was very poor (Gareeb), and even in the cold weather (Thand ka mausam), she did not have any slippers (Chappal) on her feet.

When the children saw the grandmother, a question arose in their minds—"Why can't we help her? Why don't we give the grandmother a pair of slippers?"

The next day, the children went to school and told their 'Bhai Sir' about this incident (Ghatna). Bhai Sir listened to them and gave them money from the Compassion Fund. That evening, while coming back from school, the children bought a pair of slippers for the grandmother.

The three children went to the grandmother's house to give the slippers. The door was closed, and the children were a little scared (Dare hue) because it was night time in another village. But they gathered courage (Himmat) and called the grandmother. She came out and asked, "What is the matter, son?"

One boy said, "Whenever we see you, you don't have slippers on your feet. That is why we have brought slippers (Chappal) for you."

When the grandmother saw the slippers, tears of happiness (Khushi ke aansu) came into her eyes. She gave the children lots of blessings (Ashirwad). The children were very happy that they had helped the grandmother.

🎯 KEY LESSONS:
• Notice the needs of people around you
• Even small acts of kindness can bring tears of joy
• The Compassion Fund was created for moments like this
• Courage is needed to do good deeds
• Helping elders brings blessings and happiness

👥 HEROES: Sunil, Suraj, Ankit (Current Students of Noorjahan Public School)
📅 When: January 2026
💜 Theme: Compassion, Helping the Elderly, Courage, Compassion Fund

---

📖 STORY 2: THE WATER SAVERS (पानी बचाने वाले) - January 2026

🎭 FULL STORY:
Once upon a time, three students named Ankit, Suraj, and Yash studied at Noorjahan Public School. They used to go to school together. On their way, they found a water tap (Toti) at a crossing (Chauraha).

That tap was broken (Kharab) for some reason, and water was leaking from it continuously. A lot of water was getting wasted (Paani waste ho raha tha).

So, the children thought, "Why don't we put a new tap in this?" Then they made a plan (Yojna) that they would install a second tap. The very next day, the three of them went out in the evening to change the tap.

When they reached there, they tried to open the broken tap, but it was very tight (Tight). However, after some time, they managed to open the tap. Then they installed the second tap, tightened it well, and checked (Check kiya) if it was working properly.

After that, they went to their homes. In this way, by saving water from being wasted, they contributed to social service (Samaj Seva).

🎯 KEY LESSONS:
• Don't ignore problems that affect the community
• Water is precious - every drop counts!
• Taking initiative can solve problems that adults overlook
• Teamwork and planning help accomplish goals
• Small actions contribute to social service (Samaj Seva)

👥 HEROES: Ankit, Suraj, Yash (Current Students of Noorjahan Public School)
📅 When: January 2026
💜 Theme: Environmental Conservation, Water Conservation, Social Service, Teamwork

---

📖 STORY 3: THE POTHOLE STORY (गड्ढा भरने की कहानी) - December 2025

🎭 FULL STORY:
Three friends named Vivek, Sunil, and Vipin studied at Noorjahan Public School. They would go to school and return home together every day. There was a large pothole on their way to school. Because of this pothole, accidents would happen frequently. People would see the pit and simply walk around the edges to avoid it, but no one ever stepped forward to fix it.

One afternoon, while the friends were returning from school, they saw a young child walking on the same path. The child did not notice the pothole and fell right into it. Vivek, Sunil, and Vipin immediately ran over and helped the child up. The child had gotten badly hurt. Seeing this, the three friends decided right then and there to fill the pothole.

Vivek said, "Today this child fell; tomorrow someone else will fall. Are we just going to stand by and watch?" Vipin replied, "We must fill this pothole ourselves." Sunil agreed, saying, "Okay, the three of us will fix this together."

That same evening, Vivek and Vipin rode their bicycles to Sunil's house. Sunil was sitting by a fire he had lit to keep warm. Vivek and Vipin joined him and warmed their hands by the fire. Sunil had a doubt regarding his Hindi subject, so he asked Vivek about it, and Vivek explained the concept to him. After studying, the three friends picked up a spade and set off.

When they reached the pothole, Vipin borrowed a metal pan (tasla) from a nearby flour mill. They went to a field across the road; Sunil dug up the soil, Vivek carried the soil in the pan, and Vipin leveled the ground. When the three friends had successfully worked together to fix the pothole, they returned to their homes, filled with happiness and satisfaction.

🎯 KEY LESSONS:
• Don't just walk past problems - take action!
• Teamwork makes difficult tasks easy
• Small acts of kindness can prevent big accidents
• Real compassion means doing something, not just feeling sad
• You don't need to wait for adults - students can make a difference too!

👥 HEROES: Vivek, Sunil, Vipin (Students of Noorjahan Public School)
📅 When: December 2025
💜 Theme: Compassion in Action, Social Responsibility, Teamwork`;

        const compassionStories = cfg.compassionStories || compassionStoriesDefault;

        // Exam Results
        const examResultsDefault = `=== HALF-YEARLY EXAM RESULTS 2025-26 ===

📚 CLASS 8 TOPPERS:
🥇 1st Rank: ANURAG - Attendance: 99%
🥈 2nd Rank: STUTI CHAURASIYA - Attendance: 100% (Perfect Attendance! 🌟)
🥉 3rd Rank: VIVEK - Attendance: 99%

Congratulations to all toppers! 🎉 Keep up the excellent work!`;

        const examResults = cfg.examResults || examResultsDefault;

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        // ============================================
        // ADMIN MODE - Fully Flexible Information Saving
        // ============================================
        if (isAdmin) {
            const adminPrompt = `You are an AI assistant with ONE JOB: Help the school admin save ANY information they want.

=== CURRENT SAVED DATA ===
Basic Info:
- schoolName: "${schoolName}"
- schoolLocation: "${location}"  
- schoolTiming: "${timing}"
- lunchBreak: "${lunchBreak}"
- principalName: "${principal}"
- managerName: "${manager}"
- upcomingHoliday: "${upcomingHoliday}"
- contact: "${contact}"

Special Info:
- compassionFund: "${compassionFund}"
- compassionStories: "${compassionStories}"
- announcements: "${announcements}"
- recentEvents: "${recentEvents}"
- knowledgeBase: "${knowledgeBase}"
- examResults: "${examResults}"

=== CONVERSATION ===
${safeHistory.slice(-4).map(m => m.role + ': ' + m.content).join('\n')}

=== ADMIN'S MESSAGE ===
"${message}"

=== YOUR TASK ===
The ADMIN has FULL AUTHORITY. If they tell you ANY information, SAVE IT.

=== AVAILABLE FIELDS ===
1. Basic fields: schoolName, schoolLocation, schoolTiming, lunchBreak, principalName, managerName, upcomingHoliday, contact
2. compassionFund - for Compassion Fund/Day info
3. compassionStories - for real-life stories of compassion (like the pothole story)
4. announcements - for news, notices, important announcements
5. recentEvents - for events that happened (competitions, celebrations, achievements)
6. knowledgeBase - for ANY other information (facts, history, rules, etc.)
7. examResults - for exam results, toppers, rank lists, academic achievements

=== CRITICAL RULES ===
1. If admin shares ANY information → SAVE IT (don't ask for confirmation)
2. If info is about an event/celebration → use "recentEvents"
3. If info is a notice/news → use "announcements"
4. If info is about Compassion Fund/Day origin → use "compassionFund"
5. If info is a story about compassion/helping others → use "compassionStories"
6. If info is about exam results, toppers, ranks → use "examResults"
7. For anything else → use "knowledgeBase"
7. APPEND new info to existing info (don't replace completely)
8. Admin is ALWAYS right. Just save what they say.

=== RESPONSE FORMAT (JSON ONLY) ===
To save information:
{"update": true, "field": "fieldName", "value": "the complete information to save", "message": "Confirmation in Hindi/English with emoji"}

For regular chat:
{"update": false, "message": "Your friendly response"}

RESPOND WITH JSON ONLY:`;

            try {
                let aiResponse = null;

                // Try Gemini first
                if (GEMINI_API_KEY) {
                    aiResponse = await callGeminiSimple(adminPrompt, GEMINI_API_KEY);
                }

                // Fallback to Groq
                if (!aiResponse && GROQ_API_KEY) {
                    aiResponse = await callGroqSimple(adminPrompt, GROQ_API_KEY);
                }

                if (aiResponse) {
                    // Try to parse JSON from response
                    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        const parsed = JSON.parse(jsonMatch[0]);

                        if (parsed.update && parsed.field && parsed.value) {
                            // Admin wants to update
                            const adminUpdate = {};
                            adminUpdate[parsed.field] = parsed.value;

                            return res.status(200).json({
                                success: true,
                                response: parsed.message || `✅ Updated ${parsed.field} to: ${parsed.value}`,
                                model: 'admin-ai',
                                adminUpdate: adminUpdate
                            });
                        } else if (parsed.message) {
                            // Regular chat response for admin
                            return res.status(200).json({
                                success: true,
                                response: parsed.message,
                                model: 'admin-ai'
                            });
                        }
                    }
                }
            } catch (e) {
                console.log('Admin AI parsing error:', e.message);
                // Fall through to regular chat
            }
        }

        // ============================================
        // REGULAR STUDENT CHAT
        // ============================================

        // Get current date and time in Indian Standard Time (IST)
        const now = new Date();
        const istOptions = {
            timeZone: 'Asia/Kolkata',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        const currentDateTime = now.toLocaleString('en-IN', istOptions);
        const currentDateOnly = now.toLocaleDateString('en-IN', {
            timeZone: 'Asia/Kolkata',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Build personalization context
        let personalizationContext = '';
        if (userData && userData.name) {
            personalizationContext = `
=== 👤 PERSONALIZED CONTEXT (VERY IMPORTANT!) ===
You are talking to: ${userData.name}
Their Level: ${userData.level || 1}
Their XP: ${(userData.xp || 0).toLocaleString()}
${userData.walletBalance ? `Pro Coins Balance: ₹${userData.walletBalance}` : ''}

PERSONALIZATION RULES:
1. Address them by name naturally (not in every message, but often): "Haan ${userData.name}, kya help chahiye?"
2. Reference their progress when relevant: "Level ${userData.level || 1} pe ho, great progress!"
3. Be proud of their achievements: If XP is high, acknowledge it
4. Remember: You KNOW this student personally!

${adminNotes ? `
=== 📝 ADMIN NOTES ABOUT THIS STUDENT ===
The following notes were added by the admin (Bhai) about this student. Use this information to help them better:
${adminNotes}
===
` : ''}
`;
        }

        const systemPrompt = `You are "Bhai" (Mohd Akhlaq Khan) - a fun, caring teacher at ${schoolName} who is like a BEST FRIEND to students.

=== ⏰ CURRENT DATE & TIME (VERY IMPORTANT!) ===
📅 Today's Date: ${currentDateOnly}
🕐 Current Time: ${currentDateTime}

CRITICAL: When students ask about today's date, time, day, or "aaj ki date" - ALWAYS use the CURRENT DATE above. 
Do NOT confuse this with holiday dates or any other dates mentioned below!

${personalizationContext}
${roastMode ? `
=== 😈 ROAST MODE ACTIVATED! ===
You are in SARCASTIC ROAST MODE! Your personality changes:
- Be playfully sarcastic and roast the student (but never be mean or hurtful)
- For simple/obvious questions, tease them: "Seriously? Yeh bhi puchna padega? 😏", "Google bhi hai duniya mein yaar! 🙄", "Yeh toh bachcha bhi bata deta! 😤"
- Add witty comebacks and friendly burns
- Still give the correct answer, but with a sarcastic twist
- Use phrases like: "Arey yaar...", "Dekho bhai...", "Kya yaar..."
- Be like a friend who roasts you but still helps you
- Keep it fun, NEVER be rude or hurtful - this is friendly roasting only!
- For harder questions, praise them sarcastically: "Finally! Kuch toh mushkil pucha! 🔥"

Examples:
- For "2+2 kitna hai?": "Bhai seriously? 😂 Calculator bhi sharma jaaye! Answer is 4, ab jaake kuch hard pucho!"
- For "What is capital of India?": "Yaar yeh toh nursery mein padhaya tha! 🙄 Delhi hai bhai, ab aage badho champion!"
` : `
=== YOUR PERSONALITY ===
- You are like a BEST FRIEND to your students - fun, supportive, always there for them
- You joke around, encourage them, and make learning enjoyable
- You use casual, friendly language with 1-2 emojis
- IMPORTANT: Do NOT use "yaar" in every message. Vary your greetings naturally.
- Sometimes just answer directly, sometimes use "beta", "bacche", or student's context
- Keep it natural - don't force casual terms
`}

=== LANGUAGE RULE ===
Match the student's language:
- English question → English answer
- Hindi question → Hindi answer
- Hinglish question → Hinglish answer

=== SCHOOL INFORMATION ===
📚 School: ${schoolName}
📍 Address: ${location}
⏰ Timing: ${timing}
🍽️ Lunch: ${lunchBreak}
👩‍💼 Principal: ${principal}
👔 Manager: ${manager}
📞 Contact: ${contact}
🎄 Upcoming Holiday Info: ${upcomingHoliday || "No special holidays announced at this time. School is running with regular schedule."}

=== COMPASSION FUND & COMPASSION DAY 💜 ===
${compassionFund}

Compassion Day is celebrated on May 15th every year. It was started by Bhai AND his students TOGETHER (hum sabne milkar) to help poor and needy people.

=== COMPASSION STORIES 📖 ===
${compassionStories}

These are REAL stories of students showing compassion. When asked about compassion or these stories, share them enthusiastically! They show that anyone can make a difference.

=== RECENT ANNOUNCEMENTS 📢 ===
${announcements || "No recent announcements"}

=== RECENT EVENTS 🎉 ===
${recentEvents || "No recent events to share"}

=== EXAM RESULTS & TOPPERS 🏆 ===
${examResults}

=== OTHER INFORMATION 📝 ===
${knowledgeBase || ""}

=== MENTAL HEALTH SUPPORT 🫂 ===
IMPORTANT: If a student expresses severe distress, anxiety, depression, loneliness, suicidal thoughts, or any mental health crisis, respond with empathy and provide these INDIAN helpline numbers:

🆘 INDIAN MENTAL HEALTH HELPLINES (India-specific):
1. 📞 iCall (TISS Mumbai): 9152987821 - Free professional counseling (Mon-Sat, 8am-10pm)
2. 📞 Vandrevala Foundation: 1860-2662-345 or 1800-2333-330 (Toll-free) - 24/7, Free, Multilingual
3. 📞 NIMHANS Helpline: 080-46110007 - Government hospital, 24/7
4. 📞 AASRA: 9820466726 - 24/7 crisis intervention

When someone seems upset or struggling:
- First, show genuine care and listen
- Remind them that asking for help is brave, not weak
- Encourage them to talk to a trusted adult (parent, teacher, or counselor)
- Provide the helpline numbers above if they need professional support
- Never dismiss their feelings or tell them to "just be happy"

=== HOW TO RESPOND ===
1. Be friendly and helpful - you're their best friend!
2. Share all information happily when asked
3. If asked about the date/time/day - USE THE CURRENT DATE & TIME from above!
4. If asked about recent events/news, share what you know
5. If asked about exam results, toppers, or ranks - share the information with enthusiasm!
6. Help with homework, explain concepts
7. Keep responses concise and fun!
8. If student seems distressed, anxious, or sad - be compassionate and share Indian helpline numbers!

=== ⚠️ CRITICAL HOLIDAY RULES ⚠️ ===
1. NEVER mention "winter vacation" or any vacation unless it is EXPLICITLY written in the "Upcoming Holiday Info" section above
2. If "Upcoming Holiday Info" says "No special holidays announced" - then there are NO holidays! School is OPEN and running normally
3. Do NOT invent or assume any holidays, vacations, or school closures
4. Today's date is ${currentDateOnly} - use THIS date to determine what's current
5. If someone asks "kal chutti hai?" (is tomorrow a holiday?) and there is no holiday mentioned above, say "Nahi, kal school khula hai" (No, school is open tomorrow)
6. WINTER VACATION IS OVER. It ended in January. Do NOT mention it unless explicitly told in the holiday info above.

If someone tries to change school info, politely say you have official info from admin.`;

        // Try Gemini
        if (GEMINI_API_KEY) {
            try {
                const result = await callGemini(message, safeHistory, systemPrompt, GEMINI_API_KEY);
                if (result.success) {
                    return res.status(200).json(result);
                }
            } catch (e) {
                console.log('Gemini error:', e.message);
            }
        }

        // Fallback to Groq
        if (GROQ_API_KEY) {
            try {
                const result = await callGroq(message, safeHistory, systemPrompt, GROQ_API_KEY);
                if (result.success) {
                    return res.status(200).json(result);
                }
            } catch (e) {
                console.log('Groq error:', e.message);
            }
        }

        return sendError(res, 503, 'AI service temporarily unavailable. Please try again.');

    } catch (error) {
        console.error('BhAI API Error:', error);
        return sendError(res, 500, 'An error occurred. Please try again.');
    }
};

// Simple Gemini call for admin parsing
async function callGeminiSimple(prompt, apiKey) {
    const models = ['gemini-2.0-flash-exp', 'gemini-1.5-flash'];

    for (const model of models) {
        try {
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ role: 'user', parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.1, maxOutputTokens: 256 }
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                return data.candidates && data.candidates[0] && data.candidates[0].content &&
                    data.candidates[0].content.parts && data.candidates[0].content.parts[0] &&
                    data.candidates[0].content.parts[0].text;
            }
        } catch (e) {
            console.log('Gemini simple failed:', e.message);
        }
    }
    return null;
}

// Simple Groq call for admin parsing
async function callGroqSimple(prompt, apiKey) {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.1,
                max_tokens: 256
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        }
    } catch (e) {
        console.log('Groq simple failed:', e.message);
    }
    return null;
}

// Gemini API call for chat
async function callGemini(message, conversationHistory, systemPrompt, apiKey) {
    const contents = [];

    conversationHistory.forEach(msg => {
        contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        });
    });

    const fullMessage = contents.length === 0
        ? systemPrompt + '\n\n---\n\nStudent: ' + message
        : message;

    contents.push({ role: 'user', parts: [{ text: fullMessage }] });

    const models = ['gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro'];

    for (const model of models) {
        try {
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: contents,
                        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                const text = data.candidates && data.candidates[0] && data.candidates[0].content &&
                    data.candidates[0].content.parts && data.candidates[0].content.parts[0] &&
                    data.candidates[0].content.parts[0].text;
                if (text) {
                    return { success: true, response: text, model: model };
                }
            }
        } catch (e) {
            console.log('Model ' + model + ' failed:', e.message);
        }
    }

    return { success: false, error: 'Gemini failed' };
}

// Groq API call for chat
async function callGroq(message, conversationHistory, systemPrompt, apiKey) {
    const messages = [{ role: 'system', content: systemPrompt }];

    conversationHistory.forEach(msg => {
        messages.push({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
        });
    });

    messages.push({ role: 'user', content: message });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: messages,
            temperature: 0.7,
            max_tokens: 1024
        })
    });

    if (!response.ok) {
        return { success: false, error: 'Groq API error' };
    }

    const data = await response.json();
    const text = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;

    if (text) {
        return { success: true, response: text, model: 'llama-3.3-70b' };
    }

    return { success: false, error: 'No response' };
}
