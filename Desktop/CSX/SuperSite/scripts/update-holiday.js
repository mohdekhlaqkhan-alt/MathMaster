/**
 * BhAI Holiday Update Script
 * 
 * Run this in the browser console on the BroPro website
 * OR include it temporarily in your page to update Firebase.
 * 
 * This updates the school_settings/config document in Firestore.
 */

async function updateBhaiHoliday() {
    // Check if Firebase is available
    if (typeof firebase === 'undefined' || !firebase.firestore) {
        console.error('❌ Firebase not loaded! Run this on the BroPro website.');
        return;
    }

    const db = firebase.firestore();

    // New holiday information for Guru Gobind Singh Jayanti
    const holidayUpdate = {
        upcomingHoliday: `🎉 TODAY (27th December) is a HOLIDAY - Guru Gobind Singh Jayanti! The Uttar Pradesh Government has declared this holiday. School is CLOSED today and will reopen on MONDAY, 29th December at usual timings. गुरु गोबिंद सिंह जी की जयंती की हार्दिक शुभकामनाएं! 🙏`,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Admin Script'
    };

    try {
        // Update the school settings document
        await db.collection('school_settings').doc('config').set(
            holidayUpdate,
            { merge: true } // Merge with existing data
        );

        console.log('✅ BhAI holiday updated successfully!');
        console.log('📅 New holiday:', holidayUpdate.upcomingHoliday);
        console.log('');
        console.log('🎉 BhAI will now know about Guru Gobind Singh Jayanti!');

        return true;
    } catch (error) {
        console.error('❌ Failed to update holiday:', error);
        return false;
    }
}

// Auto-run the update
updateBhaiHoliday();
