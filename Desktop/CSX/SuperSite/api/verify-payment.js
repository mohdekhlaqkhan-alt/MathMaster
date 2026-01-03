const fetch = require('node-fetch');

// Firebase Admin SDK for server-side writes
let admin = null;
let db = null;

// Initialize Firebase Admin (lazy loading)
function initFirebaseAdmin() {
    if (admin) return true;

    try {
        admin = require('firebase-admin');

        // Check if already initialized
        if (admin.apps.length === 0) {
            // Initialize with environment credentials
            const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

            if (serviceAccount) {
                admin.initializeApp({
                    credential: admin.credential.cert(JSON.parse(serviceAccount))
                });
            } else {
                // Try default credentials (works in some environments)
                admin.initializeApp();
            }
        }

        db = admin.firestore();
        return true;
    } catch (error) {
        console.error('Firebase Admin init failed:', error.message);
        return false;
    }
}

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const { orderId } = req.query;

        if (!orderId) {
            return res.status(400).json({ error: 'Missing orderId' });
        }

        // Cashfree Credentials
        const APP_ID = process.env.CASHFREE_APP_ID;
        const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
        const ENV = 'PROD';

        if (!APP_ID || !SECRET_KEY) {
            throw new Error('Server misconfiguration: Missing Cashfree Keys');
        }

        const baseUrl = ENV === 'TEST'
            ? `https://sandbox.cashfree.com/pg/orders/${orderId}`
            : `https://api.cashfree.com/pg/orders/${orderId}`;

        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'x-client-id': APP_ID,
                'x-client-secret': SECRET_KEY,
                'x-api-version': '2023-08-01',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            // *** CRITICAL: If payment is successful, record to Firebase ***
            if (data.order_status === 'PAID') {
                try {
                    const hasFirebase = initFirebaseAdmin();

                    if (hasFirebase && db) {
                        const customerEmail = data.customer_details?.customer_email || '';
                        const customerName = data.customer_details?.customer_name || 'Unknown';
                        const orderId = data.order_id;
                        const orderAmount = data.order_amount;

                        // Calculate expiry (1 year from now)
                        const expiryDate = new Date();
                        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

                        // Extract promo code from order notes if present
                        let promoCode = null;
                        const orderNote = data.order_note || '';
                        const promoMatch = orderNote.match(/Promo: ([A-Z0-9_]+)/i);
                        if (promoMatch) {
                            promoCode = promoMatch[1];
                        }

                        // Record to premiumSubscriptions collection (authoritative source)
                        await db.collection('premiumSubscriptions').doc(orderId).set({
                            orderId: orderId,
                            customerEmail: customerEmail.toLowerCase(),
                            customerName: customerName,
                            orderAmount: orderAmount,
                            promoCode: promoCode,
                            paymentStatus: 'PAID',
                            premium: true,
                            premiumExpiry: expiryDate.toISOString(),
                            premiumGrantedAt: new Date().toISOString(),
                            source: 'cashfree',
                            createdAt: admin.firestore.FieldValue.serverTimestamp(),
                            synced: false // Will be set to true when client syncs
                        });

                        console.log(`✅ Premium subscription recorded for ${customerEmail} (Order: ${orderId})`);

                        // Also try to find and update the user by email
                        if (customerEmail) {
                            // Normalize email to lowercase for consistent matching
                            const normalizedEmail = customerEmail.toLowerCase();

                            // Search in presence collection (try lowercase match first)
                            let presenceQuery = await db.collection('presence')
                                .where('email', '==', normalizedEmail)
                                .get();

                            // If not found, try case-insensitive search by also checking original email
                            if (presenceQuery.empty && customerEmail !== normalizedEmail) {
                                presenceQuery = await db.collection('presence')
                                    .where('email', '==', customerEmail)
                                    .get();
                            }

                            if (!presenceQuery.empty) {
                                const userId = presenceQuery.docs[0].id;
                                const userData = presenceQuery.docs[0].data();

                                console.log(`📍 Found user ${userId} by email: ${normalizedEmail}`);

                                // Update users collection
                                await db.collection('users').doc(userId).set({
                                    premium: true,
                                    premiumExpiry: expiryDate.toISOString(),
                                    premiumGrantedAt: new Date().toISOString(),
                                    premiumPaymentRef: `cashfree_${orderId}`,
                                    premiumPromoCode: promoCode,
                                    email: normalizedEmail,
                                    name: userData.name || customerName,
                                    displayName: userData.displayName || userData.name || customerName
                                }, { merge: true });

                                // Update presence collection
                                await db.collection('presence').doc(userId).set({
                                    premium: true,
                                    premiumExpiry: expiryDate.toISOString(),
                                    premiumPaymentRef: `cashfree_${orderId}`,
                                    premiumPromoCode: promoCode
                                }, { merge: true });

                                // Mark subscription as synced
                                await db.collection('premiumSubscriptions').doc(orderId).update({
                                    synced: true,
                                    userId: userId
                                });

                                console.log(`✅ User ${userId} updated with premium status`);
                            } else {
                                console.log(`⚠️ User with email ${normalizedEmail} not found in presence, subscription pending sync`);
                            }
                        }
                    }
                } catch (firebaseError) {
                    // Don't fail the API call, just log the error
                    console.error('Firebase recording failed (will sync client-side):', firebaseError.message);
                }
            }

            res.status(200).json(data);
        } else {
            console.error('Cashfree Verify Error:', data);
            res.status(400).json({ error: data.message || 'Failed to verify order' });
        }

    } catch (error) {
        console.error('Verify API Error:', error);
        res.status(500).json({ error: error.message });
    }
};
