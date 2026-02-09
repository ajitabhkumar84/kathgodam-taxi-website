# Security Guide - Kathgodam Taxi

This document outlines the security measures implemented in the Kathgodam Taxi website and provides guidance for secure deployment.

## Table of Contents

1. [Security Features Implemented](#security-features-implemented)
2. [Pre-Production Security Checklist](#pre-production-security-checklist)
3. [Environment Variables Security](#environment-variables-security)
4. [Rate Limiting](#rate-limiting)
5. [CSRF Protection](#csrf-protection)
6. [Admin Authentication](#admin-authentication)
7. [Deployment Security](#deployment-security)
8. [Ongoing Security Practices](#ongoing-security-practices)

---

## Security Features Implemented

### ✅ Rate Limiting

**Location**: `src/lib/rateLimit.ts`

The project now includes a comprehensive rate limiting system to prevent abuse:

- **Booking API**: 3 requests per 5 minutes
- **Contact Forms**: 5 submissions per 10 minutes
- **Admin Login**: 5 attempts per 15 minutes
- **General API**: 60 requests per minute

**Usage Example**:
```typescript
import { checkRateLimit, createRateLimitResponse, RATE_LIMIT_PRESETS } from '../lib/rateLimit';

export const POST: APIRoute = async ({ request }) => {
  const rateLimitResult = checkRateLimit(request, RATE_LIMIT_PRESETS.BOOKING);
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult);
  }
  // ... rest of your code
};
```

### ✅ CSRF Protection

**Location**: `src/lib/csrf.ts`

Cross-Site Request Forgery (CSRF) protection is implemented for all state-changing operations:

- Tokens stored in secure, HttpOnly cookies
- Validation for POST, PUT, DELETE, PATCH requests
- Support for both form data and JSON payloads

**Usage in Astro Pages**:
```astro
---
import { getCSRFToken, validateCSRFToken } from '../lib/csrf';

const csrfToken = getCSRFToken(Astro.cookies);

if (Astro.request.method === 'POST') {
  const isValid = await validateCSRFToken(Astro.request, Astro.cookies);
  if (!isValid) {
    // Handle invalid token
  }
}
---

<form method="POST">
  <input type="hidden" name="csrf-token" value={csrfToken} />
  <!-- form fields -->
</form>
```

**Usage in API Routes**:
```typescript
import { requireCSRF } from '../lib/csrf';

export const POST: APIRoute = async ({ request, cookies }) => {
  const csrfError = await requireCSRF(request, cookies);
  if (csrfError) return csrfError;
  // ... rest of your code
};
```

### ✅ Protected Routes

- **Admin pages**: `/admin/*` - Password-protected, noindex/nofollow
- **Sanity Studio**: `/studio` - Excluded from search engines
- **API endpoints**: `/api/*` - Rate limited and CSRF protected
- **Private pages**: `/my-bookings` - Excluded from sitemap

### ✅ SEO Security

- `robots.txt` configured to block admin areas
- Sitemap excludes private pages
- Admin pages marked with `robots="noindex, nofollow"`

---

## Pre-Production Security Checklist

### 🚨 CRITICAL - Must Complete Before Deployment

- [ ] **Regenerate SANITY_API_TOKEN**
  - Go to https://www.sanity.io/manage
  - Navigate to your project → API → Tokens
  - Revoke the old token
  - Create a new token with Editor permissions
  - Update in your hosting platform's environment variables

- [ ] **Regenerate RESEND_API_KEY**
  - Go to https://resend.com/api-keys
  - Revoke the old key
  - Create a new API key
  - Update in your hosting platform's environment variables

- [ ] **Change ADMIN_PASSWORD**
  - Use a strong password (minimum 16 characters)
  - Include uppercase, lowercase, numbers, and symbols
  - Use a password manager to generate and store it
  - Update in your hosting platform's environment variables

- [ ] **Remove .env from repository**
  - Ensure `.env` is in `.gitignore` (already done ✓)
  - Remove from git history if previously committed:
    ```bash
    git filter-branch --force --index-filter \
    "git rm --cached --ignore-unmatch .env" \
    --prune-empty --tag-name-filter cat -- --all
    ```

- [ ] **Set environment variables on hosting platform**
  - Copy all variables from `.env.example`
  - Set secure values on your hosting platform (Vercel, Netlify, etc.)
  - Verify all variables are set correctly

### ⚠️ HIGH PRIORITY

- [ ] **Enable HTTPS**
  - Ensure your hosting platform uses HTTPS
  - Set up SSL certificate (usually automatic on Vercel/Netlify)
  - Enable HSTS headers

- [ ] **Configure CORS**
  - Set appropriate CORS headers in `astro.config.mjs` or hosting config
  - Restrict to your domain only

- [ ] **Set up Content Security Policy (CSP)**
  - Add CSP headers to prevent XSS attacks
  - Configure in hosting platform or middleware

- [ ] **Enable security headers**
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin

---

## Environment Variables Security

### Required Environment Variables

All sensitive configuration must be stored in environment variables, never committed to the repository.

**Create `.env` file locally** (already in .gitignore):
```bash
cp .env.example .env
```

**Set on hosting platform**:

For Vercel:
```bash
vercel env add SANITY_API_TOKEN
vercel env add RESEND_API_KEY
vercel env add ADMIN_PASSWORD
# ... etc
```

For Netlify:
- Go to Site settings → Environment variables
- Add each variable manually

### Environment Variable Best Practices

1. **Never commit `.env` file** - Already in .gitignore ✓
2. **Use different values for staging/production**
3. **Rotate secrets regularly** (every 90 days recommended)
4. **Use strong passwords** (16+ characters, random)
5. **Limit token permissions** to minimum required

---

## Rate Limiting

### How It Works

The rate limiter uses an in-memory store with automatic cleanup. It identifies users by IP address (with support for proxies via `x-forwarded-for` headers).

### Presets Available

```typescript
RATE_LIMIT_PRESETS = {
  STRICT: { maxRequests: 5, windowSeconds: 60 },        // 5/min
  STANDARD: { maxRequests: 10, windowSeconds: 60 },     // 10/min
  BOOKING: { maxRequests: 3, windowSeconds: 300 },      // 3 per 5min
  CONTACT: { maxRequests: 5, windowSeconds: 600 },      // 5 per 10min
  ADMIN_LOGIN: { maxRequests: 5, windowSeconds: 900 },  // 5 per 15min
  API: { maxRequests: 60, windowSeconds: 60 },          // 60/min
}
```

### Where Rate Limiting Is Applied

✅ **Currently Protected**:
- `/api/bookings/create` - Booking creation (3 per 5 min)
- `/admin/login` - Admin login attempts (5 per 15 min)

⚠️ **Recommended to Add**:
- Other booking API endpoints (`/api/bookings/*`)
- Contact form submissions
- Any other public APIs

### Custom Rate Limits

```typescript
import { checkRateLimit, createRateLimitResponse } from '../lib/rateLimit';

const customLimit = { maxRequests: 10, windowSeconds: 120 };
const result = checkRateLimit(request, customLimit);
```

---

## CSRF Protection

### How It Works

1. Server generates a random CSRF token
2. Token stored in secure, HttpOnly cookie
3. Token included in forms or API requests
4. Server validates token before processing requests

### Where CSRF Protection Is Applied

✅ **Currently Protected**:
- `/admin/login` - Admin login form
- `/api/bookings/create` - Booking creation

⚠️ **Recommended to Add**:
- Other admin forms
- Contact form submissions
- All state-changing API endpoints

### Client-Side Integration

For React components making API calls:

```typescript
// Get CSRF token from cookie or pass from server
const response = await fetch('/api/bookings/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken, // Include in header
  },
  body: JSON.stringify({
    csrfToken, // OR include in body
    // ... other data
  }),
});
```

---

## Admin Authentication

### Current Implementation

**Security Features**:
- Password-based authentication
- Secure session cookies (HttpOnly, SameSite=strict)
- Rate limiting on login attempts (5 per 15 min)
- CSRF protection on login form

**Session Storage**:
- Cookie name: `admin-session`
- Expires: 24 hours
- HttpOnly: Yes
- Secure: Yes (in production)
- SameSite: Strict

### Recommendations for Enhanced Security

1. **Implement 2FA (Two-Factor Authentication)**
   - Add TOTP-based 2FA using `@authenticator/otpauth`
   - Require 2FA for admin access

2. **Use JWT Tokens**
   - Replace base64-encoded JSON with signed JWT tokens
   - Add token rotation and refresh tokens

3. **Add IP Whitelisting**
   - Restrict admin access to specific IP ranges
   - Useful if admin always accesses from known locations

4. **Implement Audit Logging**
   - Log all admin actions
   - Track login attempts (successful and failed)
   - Store in Sanity CMS or external service

---

## Deployment Security

### Pre-Deployment Checklist

- [ ] All environment variables set on hosting platform
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting tested
- [ ] CSRF protection tested
- [ ] Error pages don't expose sensitive info
- [ ] Admin password changed to strong value
- [ ] API tokens regenerated
- [ ] `.env` not committed to repository

### Hosting Platform Configuration

#### Vercel

**vercel.json**:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

#### Netlify

**netlify.toml**:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

### CDN & Caching

1. **Cache static assets aggressively**
   - Images, CSS, JS: 1 year
   - Add versioning/hashing to filenames

2. **Don't cache dynamic content**
   - API responses: no-cache
   - Admin pages: no-cache, no-store
   - Booking pages: no-cache

3. **Use CDN for static assets**
   - Vercel/Netlify CDN (built-in)
   - Cloudflare for additional DDoS protection

---

## Ongoing Security Practices

### Regular Maintenance

1. **Update Dependencies Monthly**
   ```bash
   npm outdated
   npm update
   npm audit fix
   ```

2. **Rotate Secrets Quarterly**
   - Generate new API tokens every 90 days
   - Update admin password regularly
   - Regenerate CSRF secrets

3. **Monitor Security Advisories**
   - Watch GitHub security alerts
   - Subscribe to Astro security announcements
   - Monitor Sanity CMS updates

4. **Review Access Logs**
   - Check for unusual patterns
   - Monitor failed login attempts
   - Track API usage

### Security Monitoring

**Recommended Tools**:

1. **Sentry** - Error tracking and monitoring
   ```bash
   npm install @sentry/astro
   ```

2. **Cloudflare** - DDoS protection, firewall rules

3. **Google Search Console** - Monitor for hacked content

4. **Uptime Monitoring** - UptimeRobot, Pingdom

### Incident Response Plan

1. **If secrets are exposed**:
   - Immediately revoke compromised tokens
   - Generate new tokens/passwords
   - Review access logs for unauthorized access
   - Notify affected users if needed

2. **If breach detected**:
   - Take affected systems offline
   - Preserve logs for investigation
   - Contact hosting provider
   - Consider legal/regulatory requirements

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Astro Security Best Practices](https://docs.astro.build/en/guides/security/)
- [Sanity Security Guide](https://www.sanity.io/docs/security)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

## Support

For security concerns or to report vulnerabilities, please contact:
- Email: security@yourdomain.com (set this up!)
- Create a private GitHub issue

**Do not publicly disclose security vulnerabilities.**
