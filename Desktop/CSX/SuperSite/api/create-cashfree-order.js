/**
 * ============================================
 * 💳 Create Cashfree Order API
 * ============================================
 * Creates a payment session for premium subscription
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
    sendValidationError,
    Validators
} = require('./_security');

module.exports = async (req, res) => {
    // Set secure CORS headers
    setCorsHeaders(req, res);

    // Handle preflight
    if (handlePreflight(req, res)) return;

    // Only allow POST
    if (req.method !== 'POST') {
        return sendError(res, 405, 'Method not allowed');
    }

    try {
        // Extract customer data from request body
        const { customerName, customerEmail, customerPhone, customerId, amount, promoCode, plan } = req.body;

        // ============================================
        // INPUT VALIDATION
        // ============================================

        // Required: customerId
        if (!customerId || !Validators.isCustomerId(customerId)) {
            return sendValidationError(res, 'customerId', 'Valid customer ID is required');
        }

        // Required: customerEmail
        if (!customerEmail || !Validators.isEmail(customerEmail)) {
            return sendValidationError(res, 'email', 'Valid email address is required');
        }

        // Optional but validate if provided: customerPhone
        const sanitizedPhone = customerPhone && Validators.isPhone(customerPhone)
            ? customerPhone.replace(/[\s-]/g, '')
            : '9999999999';

        // Validate and sanitize amount (minimum ₹1, maximum ₹9999)
        if (!Validators.isNumber(amount, 1, 9999)) {
            return sendValidationError(res, 'amount', 'Amount must be between ₹1 and ₹9999');
        }
        const orderAmount = Math.round(parseFloat(amount) * 100) / 100; // Round to 2 decimals

        // Validate plan
        if (!Validators.isPlan(plan)) {
            return sendValidationError(res, 'plan', 'Plan must be monthly, yearly, or lifetime');
        }
        const selectedPlan = plan || 'yearly';

        // Validate promoCode if provided
        if (promoCode && !Validators.isPromoCode(promoCode)) {
            return sendValidationError(res, 'promoCode', 'Invalid promo code format');
        }

        // Sanitize customer name
        const sanitizedName = Validators.sanitize(customerName) || 'BroPro User';

        console.log('📦 Order Request:', {
            customerId: customerId.substring(0, 8) + '...',
            amount: orderAmount,
            plan: selectedPlan,
            hasPromo: !!promoCode
        });

        // ============================================
        // CASHFREE API CALL
        // ============================================

        // Cashfree Credentials (from environment variables)
        const APP_ID = process.env.CASHFREE_APP_ID;
        const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
        const ENV = 'PROD';

        if (!APP_ID || !SECRET_KEY) {
            console.error('❌ Missing Cashfree credentials');
            return sendError(res, 500, 'Payment service temporarily unavailable');
        }

        const baseUrl = ENV === 'TEST'
            ? 'https://sandbox.cashfree.com/pg/orders'
            : 'https://api.cashfree.com/pg/orders';

        const orderId = `order_${Date.now()}_${customerId.substring(0, 5)}`;

        // Build return URL with order ID, promo code, and plan
        let returnUrl = `https://bropro.in/payment-success.html?order_id=${orderId}&plan=${selectedPlan}`;
        if (promoCode) {
            returnUrl += `&promo_code=${encodeURIComponent(promoCode)}`;
        }

        const payload = {
            order_id: orderId,
            order_amount: orderAmount,
            order_currency: 'INR',
            customer_details: {
                customer_id: customerId,
                customer_name: sanitizedName,
                customer_email: customerEmail.toLowerCase().trim(),
                customer_phone: sanitizedPhone
            },
            order_meta: {
                return_url: returnUrl,
                notify_url: `https://bropro.in/api/webhook`
            },
            order_note: `Premium ${selectedPlan.toUpperCase()} Subscription` + (promoCode ? ` (Promo: ${promoCode})` : "")
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
            console.log('✅ Order created:', orderId);
            res.status(200).json(data);
        } else {
            console.error('❌ Cashfree Error:', data);
            return sendError(res, 400, 'Failed to create payment order. Please try again.');
        }

    } catch (error) {
        console.error('❌ Server Error:', error);
        return sendError(res, 500, 'An error occurred. Please try again.');
    }
};
