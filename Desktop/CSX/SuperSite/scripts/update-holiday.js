/**
 * BhAI Holiday CLEAR Script
 * 
 * Run this in the browser console on the BroPro website
 * to CLEAR the outdated holiday data.
 */

async function clearBhaiHoliday() {
    if (typeof firebase === 'undefined' || !firebase.firestore) {
        console.error('❌ Firebase not loaded! Run this on the BroPro website.');
        return;
    }

    const db = firebase.firestore();

    // Clear holiday information
    const clearData = {
        upcomingHoliday: "",
        announcements: "",
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Admin Script - Cleared'
    };

    try {
        await db.collection('school_settings').doc('config').set(
            clearData,
            { merge: true }
        );

        console.log('✅ BhAI holiday data CLEARED successfully!');
        console.log('🧹 upcomingHoliday and announcements are now empty.');
        console.log('');
        console.log('🎉 BhAI will now say "No special holidays announced at this time."');

        return true;
    } catch (error) {
        console.error('❌ Failed to clear holiday:', error);
        return false;
    }
}

// Auto-run the clear
clearBhaiHoliday();

