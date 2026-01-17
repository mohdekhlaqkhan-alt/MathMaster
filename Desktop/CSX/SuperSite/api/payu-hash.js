/**
 * ============================================
 * 💳 PayU Hash Generation API
 * ============================================
 * Generates secure hash for PayU payment gateway
 * 
 * Security: Fortress Protocol Compliant
 * - CORS whitelisting
 * - Input validation
 * - Safe error handling
 */

const crypto = require('crypto');

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
        const { txnid, amount, productinfo, firstname, email } = req.body;

        // ============================================
        // INPUT VALIDATION
        // ============================================

        // Validate txnid (transaction ID)
        if (!txnid || typeof txnid !== 'string' || txnid.length > 50) {
            return sendValidationError(res, 'txnid', 'Valid transaction ID is required');
        }

        // Validate amount
        if (!Validators.isNumber(amount, 1, 99999)) {
            return sendValidationError(res, 'amount', 'Valid amount is required (₹1 - ₹99999)');
        }

        // Validate productinfo
        if (!productinfo || typeof productinfo !== 'string' || productinfo.length > 200) {
            return sendValidationError(res, 'productinfo', 'Valid product info is required');
        }

        // Validate firstname
        if (!firstname || !Validators.isString(firstname, 1, 100)) {
            return sendValidationError(res, 'firstname', 'Valid name is required');
        }

        // Validate email
        if (!email || !Validators.isEmail(email)) {
            return sendValidationError(res, 'email', 'Valid email is required');
        }

        // ============================================
        // HASH GENERATION
        // ============================================

        // Get credentials from Environment Variables ONLY
        // NEVER use hardcoded fallback keys!
        const key = process.env.PAYU_MERCHANT_KEY;
        const salt = process.env.PAYU_MERCHANT_SALT;

        if (!key || !salt) {
            console.error('❌ Missing PayU credentials');
            return sendError(res, 500, 'Payment service temporarily unavailable');
        }

        // Sanitize inputs for hash
        const sanitizedTxnid = txnid.replace(/[|]/g, '');
        const sanitizedProductinfo = productinfo.replace(/[|]/g, '');
        const sanitizedFirstname = firstname.replace(/[|]/g, '');
        const sanitizedEmail = email.toLowerCase().trim();

        // Hash Sequence: key|txnid|amount|productinfo|firstname|email|||||||||||salt
        const hashString = `${key}|${sanitizedTxnid}|${amount}|${sanitizedProductinfo}|${sanitizedFirstname}|${sanitizedEmail}|||||||||||${salt}`;

        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        console.log('✅ Hash generated for txn:', sanitizedTxnid);

        res.status(200).json({
            hash: hash,
            key: key
        });

    } catch (error) {
        console.error('❌ Hash generation error:', error);
        return sendError(res, 500, 'An error occurred. Please try again.');
    }
};
