/**
 * BroPro Wallet Payment Verification API
 * Verifies wallet top-up payment and returns order details
 */

const fetch = require('node-fetch');

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
            return res.status(400).json({ error: 'Missing orderId parameter' });
        }

        // Validate it's a wallet order
        if (!orderId.startsWith('wallet_')) {
            return res.status(400).json({ error: 'Invalid wallet order ID format' });
        }

        // Cashfree Credentials
        const APP_ID = process.env.CASHFREE_APP_ID;
        const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
        const ENV = 'PROD';

        if (!APP_ID || !SECRET_KEY) {
            console.error('❌ Missing Cashfree credentials');
            return res.status(500).json({ error: 'Server misconfiguration: Missing payment gateway keys' });
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
                // Customer details
                customerEmail: data.customer_details?.customer_email,
                customerId: data.customer_details?.customer_id,
                // Original response for debugging
                rawResponse: data
            });
        } else {
            console.error('❌ Cashfree Verify Error:', data);
            res.status(400).json({
                success: false,
                error: data.message || 'Failed to verify wallet payment',
                details: data
            });
        }

    } catch (error) {
        console.error('❌ Verify API Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
