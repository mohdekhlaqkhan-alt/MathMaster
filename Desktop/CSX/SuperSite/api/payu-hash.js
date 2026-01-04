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

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { txnid, amount, productinfo, firstname, email } = req.body;

        // Validation
        if (!txnid || !amount || !productinfo || !firstname || !email) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Get credentials from Environment Variables
        // Using Test/UAT Keys for now - Replace with Live keys after account activation
        const key = process.env.PAYU_MERCHANT_KEY || '3T1bJH';
        const salt = process.env.PAYU_MERCHANT_SALT || 'DIPPvrCExTdMeoAdVXRcsycYSGgOkYqw';

        // Hash Sequence: key|txnid|amount|productinfo|firstname|email|||||||||||salt
        const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;

        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        res.status(200).json({
            hash: hash,
            key: key // Send key back to frontend as it's needed for the form
        });

    } catch (error) {
        console.error('Hash generation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
