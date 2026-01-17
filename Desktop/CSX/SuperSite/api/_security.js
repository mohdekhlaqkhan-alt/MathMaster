/**
 * ============================================
 * 🛡️ FORTRESS PROTOCOL - Security Utilities
 * ============================================
 * Centralized security functions for all API endpoints
 * Created: 2026-01-17
 */

// ============================================
// CORS CONFIGURATION - Whitelist Only
// ============================================
const ALLOWED_ORIGINS = [
    'https://bropro.in',
    'https://www.bropro.in',
    'http://localhost:3000',  // Local development
    'http://localhost:5000',  // Firebase emulator
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000'
];

/**
 * Set secure CORS headers - Only allow whitelisted origins
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function setCorsHeaders(req, res) {
    const origin = req.headers.origin;

    // Only set CORS for whitelisted origins
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (!origin) {
        // Allow requests without origin (same-origin, curl, etc.)
        res.setHeader('Access-Control-Allow-Origin', 'https://bropro.in');
    }
    // If origin is not in whitelist, don't set Access-Control-Allow-Origin
    // This will cause the browser to block the request

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
    );

    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
}

/**
 * Handle CORS preflight OPTIONS request
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {boolean} - True if handled preflight
 */
function handlePreflight(req, res) {
    if (req.method === 'OPTIONS') {
        setCorsHeaders(req, res);
        res.status(200).end();
        return true;
    }
    return false;
}

// ============================================
// INPUT VALIDATION SCHEMAS
// ============================================

/**
 * Simple validation helper without external dependencies
 * (Zod would require npm install on Vercel which complicates deployment)
 */
const Validators = {
    /**
     * Validate email format
     */
    isEmail(value) {
        if (!value || typeof value !== 'string') return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) && value.length <= 254;
    },

    /**
     * Validate phone number (10 digits)
     */
    isPhone(value) {
        if (!value || typeof value !== 'string') return false;
        const phoneRegex = /^[0-9]{10,15}$/;
        return phoneRegex.test(value.replace(/[\s-]/g, ''));
    },

    /**
     * Validate string with length limits
     */
    isString(value, minLen = 1, maxLen = 1000) {
        if (!value || typeof value !== 'string') return false;
        const trimmed = value.trim();
        return trimmed.length >= minLen && trimmed.length <= maxLen;
    },

    /**
     * Validate number in range
     */
    isNumber(value, min = 0, max = Infinity) {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    },

    /**
     * Sanitize string - remove dangerous characters
     */
    sanitize(value) {
        if (!value || typeof value !== 'string') return '';
        return value
            .trim()
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .slice(0, 1000); // Limit length
    },

    /**
     * Validate customer ID (Firebase UID format)
     */
    isCustomerId(value) {
        if (!value || typeof value !== 'string') return false;
        // Firebase UIDs are 28 characters, alphanumeric
        return /^[a-zA-Z0-9]{20,40}$/.test(value);
    },

    /**
     * Validate order ID format
     */
    isOrderId(value) {
        if (!value || typeof value !== 'string') return false;
        // Order IDs: order_timestamp_userid or wallet_timestamp_userid
        return /^(order|wallet)_[0-9]+_[a-zA-Z0-9]+$/.test(value) && value.length <= 100;
    },

    /**
     * Validate promo code format
     */
    isPromoCode(value) {
        if (!value) return true; // Optional
        if (typeof value !== 'string') return false;
        // Promo codes: alphanumeric with underscores, max 50 chars
        return /^[A-Za-z0-9_]{1,50}$/.test(value);
    },

    /**
     * Validate plan type
     */
    isPlan(value) {
        if (!value) return true; // Optional, defaults to 'yearly'
        return ['monthly', 'yearly', 'lifetime'].includes(value);
    }
};

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Send a safe error response (no stack traces or internal details)
 * @param {Object} res - Response object
 * @param {number} statusCode - HTTP status code
 * @param {string} userMessage - Safe message for the user
 * @param {Error|string} internalError - Full error for logging (not sent to client)
 */
function sendError(res, statusCode, userMessage, internalError = null) {
    // Log full error server-side for debugging
    if (internalError) {
        console.error(`[ERROR ${statusCode}]`, internalError);
    }

    // Send sanitized message to client
    res.status(statusCode).json({
        success: false,
        error: userMessage
    });
}

/**
 * Send a validation error response
 * @param {Object} res - Response object
 * @param {string} field - Field that failed validation
 * @param {string} message - Validation error message
 */
function sendValidationError(res, field, message) {
    console.warn(`[VALIDATION] Field '${field}' failed: ${message}`);
    res.status(400).json({
        success: false,
        error: `Invalid ${field}: ${message}`
    });
}

// ============================================
// ADMIN VERIFICATION
// ============================================

// Admin email from environment variable (with fallback for safety)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mohdekhlaqkhan@gmail.com';

/**
 * Verify if request is from admin (server-side check)
 * Uses Firebase Admin SDK to verify ID token
 * 
 * @param {Object} req - Request object
 * @returns {Promise<{isAdmin: boolean, email: string|null, uid: string|null}>}
 */
async function verifyAdmin(req) {
    const result = { isAdmin: false, email: null, uid: null };

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return result;
        }

        const idToken = authHeader.split('Bearer ')[1];

        if (!idToken || idToken.length < 100) {
            return result;
        }

        // Lazy load Firebase Admin to avoid cold start issues
        let admin;
        try {
            admin = require('firebase-admin');

            // Initialize if not already
            if (admin.apps.length === 0) {
                admin.initializeApp();
            }
        } catch (e) {
            console.warn('Firebase Admin not available for token verification');
            return result;
        }

        // Verify the ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        result.email = decodedToken.email || null;
        result.uid = decodedToken.uid || null;
        result.isAdmin = result.email &&
            result.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

        return result;

    } catch (error) {
        console.warn('Admin verification failed:', error.message);
        return result;
    }
}

// ============================================
// EXPORTS
// ============================================
module.exports = {
    // CORS
    setCorsHeaders,
    handlePreflight,
    ALLOWED_ORIGINS,

    // Validation
    Validators,

    // Errors
    sendError,
    sendValidationError,

    // Admin
    verifyAdmin,
    ADMIN_EMAIL
};
