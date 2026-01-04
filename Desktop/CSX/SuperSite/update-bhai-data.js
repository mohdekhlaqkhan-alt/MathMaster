// Script to update BhAI school settings in Firebase
// Run with: node update-bhai-data.js

const admin = require('firebase-admin');

// Initialize Firebase Admin (you need to run this in the project directory)
if (!admin.apps.length) {
    admin.initializeApp({
        projectId: 'supersite-2dcf9'
    });
}

const db = admin.firestore();

async function updateSchoolSettings() {
    try {
        const holidayData = {
            upcomingHoliday: "❄️ WINTER VACATION: School closed from 29th Dec 2025 to 14th Jan 2026 due to intense winter. Reopens 15th Jan. Republic Day rehearsals continue as scheduled.",
            announcements: "📢 WINTER VACATION NOTICE:\n\nDear Students and Parents,\n\nDue to intense winter conditions and winter vacation, the school will remain closed from 29th December 2025 to 14th January 2026.\n\nThe school will reopen on 15th January 2026 at its usual timings.\n\nStudents participating in the Republic Day programme are required to attend rehearsals as scheduled.\n\nThank you for your cooperation.",
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('school_settings').doc('config').set(holidayData, { merge: true });

        console.log('✅ School settings updated successfully!');
        console.log('Data saved:', holidayData);

    } catch (error) {
        console.error('❌ Error updating school settings:', error);
    }
}

updateSchoolSettings();
