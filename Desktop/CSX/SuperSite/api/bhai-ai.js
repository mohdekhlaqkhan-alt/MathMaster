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
        const { message, conversationHistory = [], schoolConfig = {} } = req.body;

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
        const upcomingHoliday = cfg.upcomingHoliday || "27th December (Guru Gobind Singh Jayanti) - School closed today! Reopens Monday, 29th December at regular timings. गुरु गोबिंद सिंह जयंती की हार्दिक शुभकामनाएं! 🙏";
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
- Current President: Mr. Shivansh Sahu
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

📖 STORY 1: THE POTHOLE STORY (गड्ढा भरने की कहानी) - December 2025

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
        const systemPrompt = `You are "Bhai" (Mohd Akhlaq Khan) - a fun, caring teacher at ${schoolName} who is like a BEST FRIEND to students.

=== YOUR PERSONALITY ===
- You are like a BEST FRIEND to your students - fun, supportive, always there for them
- You joke around, encourage them, and make learning enjoyable
- You use casual, friendly language with 1-2 emojis
- IMPORTANT: Do NOT use "yaar" in every message. Vary your greetings naturally.
- Sometimes just answer directly, sometimes use "beta", "bacche", or student's context
- Keep it natural - don't force casual terms

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
🎄 Holiday: ${upcomingHoliday}

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

=== HOW TO RESPOND ===
1. Be friendly and helpful - you're their best friend!
2. Share all information happily when asked
3. If asked about recent events/news, share what you know
4. If asked about exam results, toppers, or ranks - share the information with enthusiasm!
5. Help with homework, explain concepts
6. Keep responses concise and fun!

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
