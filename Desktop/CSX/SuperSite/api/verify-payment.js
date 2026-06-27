/**
 * ============================================
 * 💳 Verify Payment API
 * ============================================
 * Verifies payment status and grants premium access
 * 
 * Security: Fortress Protocol Compliant
 * - CORS whitelisting
 * - Input validation
 * - Safe error handling
 */

const {
    setCorsHeaders,
    handlePreflight,
    sendError,
    Validators
} = require('./_security');

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
    // Set secure CORS headers
    setCorsHeaders(req, res);

    // Handle preflight
    if (handlePreflight(req, res)) return;

    try {
        const { orderId } = req.query;

        // ============================================
        // INPUT VALIDATION
        // ============================================
        if (!orderId) {
            return sendError(res, 400, 'Order ID is required');
        }

        // Validate order ID format
        if (!Validators.isOrderId(orderId)) {
            return sendError(res, 400, 'Invalid order ID format');
        }

        // ============================================
        // CASHFREE API CALL
        // ============================================

        // Cashfree Credentials
        const APP_ID = process.env.CASHFREE_APP_ID;
        const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
        const ENV = 'PROD';

        if (!APP_ID || !SECRET_KEY) {
            console.error('❌ Missing Cashfree credentials');
            return sendError(res, 500, 'Payment verification service temporarily unavailable');
        }

        const baseUrl = ENV === 'TEST'
            ? `https://sandbox.cashfree.com/pg/orders/${orderId}`
            : `https://api.cashfree.com/pg/orders/${orderId}`;

        console.log('🔍 Verifying payment:', orderId);

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
            // ============================================
            // GRANT PREMIUM ACCESS IF PAID
            // ============================================
            if (data.order_status === 'PAID') {
                try {
                    const hasFirebase = initFirebaseAdmin();

                    if (hasFirebase && db) {
                        const customerEmail = data.customer_details?.customer_email || '';
                        const customerName = data.customer_details?.customer_name || 'Unknown';
                        const orderAmount = data.order_amount;

                        // Extract promo code and plan from order notes if present
                        let promoCode = null;
                        let plan = 'yearly';
                        const orderNote = data.order_note || '';
                        
                        if (orderNote.toLowerCase().includes('monthly')) {
                            plan = 'monthly';
                        }
                        
                        const promoMatch = orderNote.match(/Promo: ([A-Z0-9_]+)/i);
                        if (promoMatch) {
                            promoCode = promoMatch[1];
                        }

                        // Calculate expiry date dynamically
                        const expiryDate = new Date();
                        if (plan === 'monthly') {
                            expiryDate.setMonth(expiryDate.getMonth() + 1);
                        } else {
                            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                        }

                        // Record to premiumSubscriptions collection (authoritative source)
                        await db.collection('premiumSubscriptions').doc(orderId).set({
                            orderId: orderId,
                            customerEmail: customerEmail.toLowerCase(),
                            customerName: customerName,
                            orderAmount: orderAmount,
                            promoCode: promoCode,
                            plan: plan,
                            paymentStatus: 'PAID',
                            premium: true,
                            premiumExpiry: expiryDate.toISOString(),
                            premiumGrantedAt: new Date().toISOString(),
                            source: 'cashfree',
                            createdAt: admin.firestore.FieldValue.serverTimestamp(),
                            synced: false
                        });

                        console.log(`✅ Premium subscription recorded for ${customerEmail} (Order: ${orderId})`);

                        // Try to find and update the user by email
                        if (customerEmail) {
                            const normalizedEmail = customerEmail.toLowerCase();

                            // Search in presence collection
                            let presenceQuery = await db.collection('presence')
                                .where('email', '==', normalizedEmail)
                                .get();

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
                                    premiumPlan: plan,
                                    email: normalizedEmail,
                                    name: userData.name || customerName,
                                    displayName: userData.displayName || userData.name || customerName
                                }, { merge: true });

                                // Update presence collection
                                await db.collection('presence').doc(userId).set({
                                    premium: true,
                                    premiumExpiry: expiryDate.toISOString(),
                                    premiumPaymentRef: `cashfree_${orderId}`,
                                    premiumPromoCode: promoCode,
                                    premiumPlan: plan
                                }, { merge: true });

                                // Mark subscription as synced
                                await db.collection('premiumSubscriptions').doc(orderId).update({
                                    synced: true,
                                    userId: userId
                                });

                                console.log(`✅ User ${userId} updated with premium status`);
                            } else {
                                console.log(`⚠️ User with email ${normalizedEmail} not found, subscription pending sync`);
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
            console.error('❌ Cashfree Verify Error:', data);
            return sendError(res, 400, 'Failed to verify payment. Please contact support.');
        }

    } catch (error) {
        console.error('❌ Verify API Error:', error);
        return sendError(res, 500, 'An error occurred during verification. Please try again.');
    }
};
