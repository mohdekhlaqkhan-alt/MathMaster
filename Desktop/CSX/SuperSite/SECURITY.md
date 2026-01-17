# 🛡️ BroPro Security Documentation

## Fortress Protocol Compliance

This document outlines the security measures implemented in the BroPro application.

---

## ✅ Security Measures Implemented

### 1. CORS Whitelisting
All API endpoints now only accept requests from whitelisted origins:
- `https://bropro.in`
- `https://www.bropro.in`
- `http://localhost:3000` (development)
- `http://localhost:5000` (Firebase emulator)

**File:** `api/_security.js`

### 2. Input Validation
All user inputs are validated before processing:
- Email format validation
- Phone number format (10-15 digits)
- Amount ranges
- Customer ID format (Firebase UID)
- Order ID format
- Promo code format

**File:** `api/_security.js` → `Validators` object

### 3. Secure Error Handling
- Internal errors are logged server-side only
- User-facing error messages are generic and safe
- No stack traces or internal details exposed

**Function:** `sendError()` and `sendValidationError()`

### 4. Server-Side Admin Verification
Admin status is now verified server-side using Firebase ID tokens:
- Frontend sends `Authorization: Bearer <idToken>` header
- Backend verifies token using Firebase Admin SDK
- Admin email is checked against `process.env.ADMIN_EMAIL`

**Files:** 
- `api/_security.js` → `verifyAdmin()`
- `api/bhai-ai.js`
- `scripts/admin.js` → `getAuthToken()`

### 5. Security Headers
All responses include security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**File:** `vercel.json`

### 6. Secrets Management
- All secrets stored in Vercel environment variables
- `.env.local` file deleted (was a security risk)
- Only `.env.example` template exists in repo

---

## 🔄 Secret Rotation Guide

### When to Rotate
- Immediately after any suspected compromise
- After team member leaves
- Every 90 days (recommended)
- After any security audit finding

### How to Rotate Each Secret

#### GEMINI_API_KEY
1. Go to https://aistudio.google.com
2. Click "Get API key" → "Create API key in new project" or regenerate existing
3. Copy the new key
4. Go to Vercel Dashboard → Settings → Environment Variables
5. Update `GEMINI_API_KEY` with new value
6. Click "Save"
7. Redeploy: `vercel --prod`
8. **Impact:** BhAI chat will use fallback during 30-second window

#### GROQ_API_KEY
1. Go to https://console.groq.com/keys
2. Click "Create API Key" or revoke and create new
3. Copy the new key
4. Update in Vercel Dashboard
5. Redeploy
6. **Impact:** Only affects AI fallback, minimal risk

#### OPENROUTER_API_KEY
1. Go to https://openrouter.ai/keys
2. Delete old key, create new one
3. Update in Vercel Dashboard
4. Redeploy
5. **Impact:** Minimal, only affects optional AI routing

#### CASHFREE_SECRET_KEY (⚠️ CRITICAL)
**Best Time:** 3:00 AM - 5:00 AM IST (lowest traffic)

1. Go to https://merchant.cashfree.com
2. Navigate to Developers → API Keys
3. Generate new Secret Key
4. **IMPORTANT:** Do NOT revoke old key yet
5. Update in Vercel Dashboard
6. Redeploy immediately
7. Test a small payment (₹1)
8. If working, revoke old key in Cashfree dashboard
9. **Impact:** ~30 seconds of potential payment failures

#### PAYU_MERCHANT_SALT
1. Contact PayU support or use dashboard
2. Same process as Cashfree

#### FIREBASE_SERVICE_ACCOUNT_KEY
1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate new private key (creates new JSON)
3. Copy entire JSON (minified, single line)
4. Update in Vercel Dashboard
5. Redeploy
6. Delete old service account in GCP Console

---

## 🔒 Firestore Security Rules

Current rules enforce:
- Authentication required for most operations
- Users can only modify their own data
- Admin verified by email (`mohdekhlaqkhan@gmail.com`)
- Activities are immutable after creation
- Transaction history is immutable

**File:** `firestore.rules`

---

## 📋 Security Checklist

Before deploying, verify:
- [ ] All API keys are in Vercel Dashboard (not in code)
- [ ] `.env.local` does NOT exist locally
- [ ] CORS is restricted to production domains
- [ ] All user inputs are validated
- [ ] Error messages don't leak internal details
- [ ] Admin operations require Firebase authentication
- [ ] Security headers are configured in vercel.json

---

## 🚨 Incident Response

If you suspect a security breach:

1. **Immediately rotate all API keys** (especially Cashfree)
2. Check Vercel logs for suspicious activity
3. Review Firebase audit logs
4. Check Cashfree transactions for unauthorized payments
5. Update admin email password in Firebase
6. Review and update Firestore rules if needed

---

## 📧 Security Contact

For security concerns, contact the admin email configured in the system.

---

*Last Updated: January 17, 2026*
*Fortress Protocol Version: 1.0*
