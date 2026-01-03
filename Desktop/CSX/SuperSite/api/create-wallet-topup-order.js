/**
 * BroPro Wallet Top-Up Order Creation API
 * Creates a Cashfree payment session for wallet top-up
 */

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

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Extract data from request body
        const { customerName, customerEmail, customerPhone, customerId, amount } = req.body;

        // Validate required fields
        if (!customerId || !customerEmail) {
            return res.status(400).json({ error: 'Missing required customer information' });
        }

        // Validate amount (₹1 to ₹999)
        const orderAmount = parseFloat(amount);
        if (isNaN(orderAmount) || orderAmount < 1 || orderAmount > 999) {
            return res.status(400).json({
                error: `Invalid amount. Must be between ₹1 and ₹999. Received: ${amount}`
            });
        }

        // Cashfree Credentials
        const APP_ID = process.env.CASHFREE_APP_ID;
        const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
        const ENV = 'PROD'; // Production mode

        if (!APP_ID || !SECRET_KEY) {
            console.error('❌ Missing Cashfree credentials');
            return res.status(500).json({ error: 'Server misconfiguration: Missing payment gateway keys' });
        }

        const baseUrl = ENV === 'TEST'
            ? 'https://sandbox.cashfree.com/pg/orders'
            : 'https://api.cashfree.com/pg/orders';

        // Generate unique order ID with wallet prefix
        const orderId = `wallet_${Date.now()}_${customerId.substring(0, 8)}`;

        // Phone validation
        const phone = customerPhone && customerPhone.length >= 10 ? customerPhone : '9999999999';

        // Build payload
        const payload = {
            order_id: orderId,
            order_amount: orderAmount,
            order_currency: 'INR',
            customer_details: {
                customer_id: customerId,
                customer_name: customerName || 'BroPro User',
                customer_email: customerEmail,
                customer_phone: phone
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

        console.log('💳 Creating wallet top-up order:', { orderId, amount: orderAmount, customerId });

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
            res.status(400).json({
                error: data.message || 'Failed to create wallet top-up order',
                details: data
            });
        }

    } catch (error) {
        console.error('❌ Server Error:', error);
        res.status(500).json({ error: error.message });
    }
};
