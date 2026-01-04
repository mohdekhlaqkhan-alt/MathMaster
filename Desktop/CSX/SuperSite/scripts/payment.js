/**
 * Cashfree Payment Integration for BroPro
 */

const CashfreePayment = {
    // Configuration
    config: {
        mode: 'production', // 'sandbox' or 'production'
    },

    /**
     * Initiate Payment Flow
     * @param {Object} userDetails - { name, email, phone, id }
     */
    async initiatePayment(userDetails) {
        try {
            console.log('🚀 Initiating Cashfree Payment...', userDetails);

            // 1. Initialize Cashfree SDK
            if (!window.Cashfree) {
                throw new Error('Cashfree SDK not loaded');
            }

            const cashfree = Cashfree({
                mode: this.config.mode
            });

            // 2. Create Order on Backend (Serverless Function)
            // We use the absolute path /api/create-cashfree-order
            const response = await fetch('/api/create-cashfree-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerName: userDetails.name,
                    customerEmail: userDetails.email,
                    customerPhone: userDetails.phone || '9999999999',
                    customerId: 'cust_' + Date.now(), // Unique ID
                    amount: userDetails.amount || 999, // Discounted amount, default to 999
                    promoCode: userDetails.promoCode || null
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create order');
            }

            const data = await response.json();

            if (!data.payment_session_id) {
                throw new Error('Invalid response: payment_session_id missing');
            }

            console.log('✅ Order Created. Session ID:', data.payment_session_id);

            // 3. Launch Cashfree Checkout
            const checkoutOptions = {
                paymentSessionId: data.payment_session_id,
                redirectTarget: "_self" // Redirect to Cashfree page and back, or "_blank" for popup
            };

            cashfree.checkout(checkoutOptions).then(function (result) {
                if (result.error) {
                    // This will handle errors if using popup mode, but we use redirect
                    console.error("User closed popup or payment failed", result.error);
                }
                if (result.redirect) {
                    console.log("Redirection");
                }
            });

        } catch (error) {
            console.error('Payment Error:', error);
            alert('Payment initialization failed: ' + error.message);
        }
    }
};

// Expose to window
window.CashfreePayment = CashfreePayment;

// Backwards compatibility alias (to avoid breaking app.js immediately)
window.PayU = CashfreePayment;
