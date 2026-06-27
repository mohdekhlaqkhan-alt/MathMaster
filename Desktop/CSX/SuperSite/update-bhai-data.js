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
            upcomingHoliday: "",
            announcements: "",
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
