/**
 * ============================================
 * 💰 Verify Wallet Payment API
 * ============================================
 * Verifies wallet top-up payment and returns order details
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

const fetch = require('node-fetch');

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

        // Validate it's a wallet order
        if (!orderId.startsWith('wallet_')) {
            return sendError(res, 400, 'Invalid wallet order ID format');
        }

        // Additional format validation
        if (orderId.length > 100 || !/^wallet_[0-9]+_[a-zA-Z0-9_\-:.]+$/.test(orderId)) {
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

        console.log('🔍 Verifying wallet payment:', orderId);

        // Call Cashfree API to get order details
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
            // Extract relevant information
            const orderStatus = data.order_status;
            const paymentStatus = orderStatus === 'PAID' ? 'SUCCESS' :
                orderStatus === 'ACTIVE' ? 'PENDING' :
                    orderStatus === 'EXPIRED' ? 'EXPIRED' : 'FAILED';

            console.log(`💳 Wallet order ${orderId} status: ${paymentStatus}`);

            res.status(200).json({
                success: paymentStatus === 'SUCCESS',
                orderId: orderId,
                orderStatus: orderStatus,
                paymentStatus: paymentStatus,
                orderAmount: data.order_amount,
                orderCurrency: data.order_currency,
                orderType: 'wallet_topup',
                createdAt: data.created_at,
                // Payment details (if available)
                paymentMethod: data.payment_method || null,
                paymentTime: data.payment_completion_time || null,
                // Customer details (limited info)
                customerEmail: data.customer_details?.customer_email,
                customerId: data.customer_details?.customer_id
                // Note: rawResponse removed for security - don't expose internal data
            });
        } else {
            console.error('❌ Cashfree Verify Error:', data);
            return sendError(res, 400, 'Failed to verify wallet payment. Please contact support.');
        }

    } catch (error) {
        console.error('❌ Verify API Error:', error);
        return sendError(res, 500, 'An error occurred during verification. Please try again.');
    }
};
