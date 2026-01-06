const crypto = require('crypto');

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
        // Extract customer data from request body
        const { customerName, customerEmail, customerPhone, customerId, amount, promoCode, plan } = req.body;

        // Validate and sanitize amount (minimum ₹1, maximum ₹9999 for yearly plans)
        const orderAmount = Math.max(1, Math.min(9999, parseFloat(amount) || 1999));
        const selectedPlan = plan || 'yearly';
        console.log('📦 Order Request:', { customerId, amount: orderAmount, promoCode, plan: selectedPlan });

        // Cashfree Credentials (Securely loaded from Environment Variables)
        const APP_ID = process.env.CASHFREE_APP_ID;
        const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
        const ENV = 'PROD'; // Switched to PRODUCTION mode

        if (!APP_ID || !SECRET_KEY) {
            throw new Error('Server misconfiguration: Missing Cashfree Keys');
        }

        if (!customerId || !customerEmail) {
            throw new Error('Missing required customer information');
        }

        const baseUrl = ENV === 'TEST'
            ? 'https://sandbox.cashfree.com/pg/orders'
            : 'https://api.cashfree.com/pg/orders';

        const orderId = `order_${Date.now()}_${customerId.substring(0, 5)}`;

        // Ensure phone number is valid (10 digits). If not provided/valid, use a dummy for testing if allowed, 
        // but Cashfree requires valid phone. We assume frontend sends a valid one.
        // If phone is missing, Cashfree acts up.
        const phone = customerPhone && customerPhone.length >= 10 ? customerPhone : '9999999999';

        // Build return URL with order ID, promo code, and plan
        let returnUrl = `https://bropro.in/payment-success.html?order_id=${orderId}&plan=${selectedPlan}`;
        if (promoCode) {
            returnUrl += `&promo_code=${encodeURIComponent(promoCode)}`;
        }

        const payload = {
            order_id: orderId,
            order_amount: orderAmount, // Use the discounted amount from frontend
            order_currency: 'INR',
            customer_details: {
                customer_id: customerId,
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: phone
            },
            order_meta: {
                return_url: returnUrl,
                notify_url: `https://bropro.in/api/webhook` // Optional
            },
            order_note: promoCode ? `Premium Subscription (Promo: ${promoCode})` : "Premium Subscription"
        };

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': APP_ID,
                'x-client-secret': SECRET_KEY,
                'x-api-version': '2023-08-01'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            res.status(200).json(data);
        } else {
            console.error('Cashfree Error:', data);
            res.status(400).json({ error: data.message || 'Failed to create order' });
        }

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: error.message });
    }
};
