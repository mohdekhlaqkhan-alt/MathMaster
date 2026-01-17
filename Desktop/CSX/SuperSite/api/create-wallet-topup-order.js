/**
 * ============================================
 * 💰 Create Wallet Top-Up Order API
 * ============================================
 * Creates a Cashfree payment session for wallet top-up
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
        // Extract data from request body
        const { customerName, customerEmail, customerPhone, customerId, amount } = req.body;

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

        // Validate amount (₹1 to ₹999)
        if (!Validators.isNumber(amount, 1, 999)) {
            return sendValidationError(res, 'amount', 'Amount must be between ₹1 and ₹999');
        }
        const orderAmount = Math.round(parseFloat(amount) * 100) / 100;

        // Sanitize optional fields
        const sanitizedPhone = customerPhone && Validators.isPhone(customerPhone)
            ? customerPhone.replace(/[\s-]/g, '')
            : '9999999999';
        const sanitizedName = Validators.sanitize(customerName) || 'BroPro User';

        // ============================================
        // CASHFREE API CALL
        // ============================================

        // Cashfree Credentials
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

        // Generate unique order ID with wallet prefix
        const orderId = `wallet_${Date.now()}_${customerId.substring(0, 8)}`;

        // Build payload
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
                return_url: `https://bropro.in/wallet-success.html?order_id=${orderId}&amount=${orderAmount}`,
                notify_url: `https://bropro.in/api/wallet-webhook`
            },
            order_note: `Wallet Top-Up: ₹${orderAmount}`,
            order_tags: {
                type: 'wallet_topup',
                amount: orderAmount.toString(),
                user_id: customerId
            }
        };

        console.log('💳 Creating wallet top-up order:', {
            orderId,
            amount: orderAmount,
            customerId: customerId.substring(0, 8) + '...'
        });

        // Call Cashfree API
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

        if (response.ok && data.payment_session_id) {
            console.log('✅ Wallet top-up order created:', orderId);
            res.status(200).json({
                ...data,
                order_id: orderId,
                order_type: 'wallet_topup'
            });
        } else {
            console.error('❌ Cashfree Error:', data);
            return sendError(res, 400, 'Failed to create wallet top-up order. Please try again.');
        }

    } catch (error) {
        console.error('❌ Server Error:', error);
        return sendError(res, 500, 'An error occurred. Please try again.');
    }
};
