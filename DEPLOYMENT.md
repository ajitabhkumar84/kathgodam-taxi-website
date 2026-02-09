# Production Deployment Guide

Complete guide for deploying Kathgodam Taxi website to production.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Deployment Steps](#deployment-steps)
4. [Post-Deployment Verification](#post-deployment-verification)
5. [Rollback Procedure](#rollback-procedure)

---

## Pre-Deployment Checklist

### Phase 1: Security (CRITICAL)

- [ ] **Regenerate all exposed API keys**
  - [ ] Sanity API Token (see instructions below)
  - [ ] Resend API Key (see instructions below)
  - [ ] Change admin password to strong value

- [ ] **Verify .env is in .gitignore**
  - [ ] Confirm .env is NOT committed
  - [ ] Verify .env.example is up to date

### Phase 2: Configuration Files

- [x] **404 Page** - Created ✓
- [x] **robots.txt** - Created ✓
- [x] **Sitemap** - Integrated ✓
- [ ] **Update astro.config.mjs site URL**
  - [ ] Change `site: 'https://kathgodamtaxi.com'` to your actual domain

### Phase 3: Security Implementation

- [x] **Rate Limiting** - Implemented ✓
- [x] **CSRF Protection** - Implemented ✓
- [ ] **Update booking forms** - Add CSRF tokens to React components
- [ ] **Security headers** - Configure on hosting platform

### Phase 4: Testing

- [ ] **Build test**
  ```bash
  npm run build
  ```
- [ ] **Preview build locally**
  ```bash
  npm run preview
  ```
- [ ] **Test all critical flows**
  - [ ] Homepage loads correctly
  - [ ] Route pages display properly
  - [ ] Package pages work
  - [ ] Booking form submits successfully
  - [ ] Admin login works
  - [ ] Admin dashboard accessible
  - [ ] Payment verification works

### Phase 5: Content Verification

- [ ] **Sanity CMS**
  - [ ] All routes published
  - [ ] All packages published
  - [ ] Homepage content complete
  - [ ] Images optimized
  - [ ] Contact information correct

---

## Environment Setup

### Step 1: Regenerate API Keys

#### Sanity API Token

1. Go to https://www.sanity.io/manage
2. Select project: `2o6xnbku`
3. Navigate to **API** → **Tokens**
4. Click **Revoke** on the exposed token
5. Click **Add API Token**
   - Name: `Production Token`
   - Permissions: `Editor`
6. Copy the new token (save it securely!)

#### Resend API Key

1. Go to https://resend.com/api-keys
2. Find and revoke the exposed key
3. Click **Create API Key**
   - Name: `Kathgodam Taxi Production`
   - Permission: `Sending access`
4. Copy the new key (save it securely!)

#### Admin Password

Generate a strong password using a password manager:
- Minimum 16 characters
- Mix of uppercase, lowercase, numbers, symbols
- Example using `openssl`:
  ```bash
  openssl rand -base64 32
  ```

### Step 2: Prepare Environment Variables

Create a secure note with all production environment variables:

```bash
# Sanity CMS
PUBLIC_SANITY_PROJECT_ID=2o6xnbku
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=<new_token_from_step_1>
SANITY_PREVIEW_SECRET=<generate_random_secret>

# Admin
ADMIN_PASSWORD=<strong_password_from_step_1>

# Email (Resend)
RESEND_API_KEY=<new_key_from_step_1>
FROM_EMAIL=bookings@kathgodamtaxi.com
ADMIN_EMAIL=kathgodamtaxi@gmail.com
```

---

## Deployment Steps

### Option 1: Vercel (Recommended)

#### Initial Setup

1. **Install Vercel CLI** (optional, can use web UI)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Link Project**
   ```bash
   vercel link
   ```
   - Select your Vercel account
   - Link to existing project or create new one

#### Configure Environment Variables

**Via CLI**:
```bash
vercel env add PUBLIC_SANITY_PROJECT_ID production
# Enter value: 2o6xnbku

vercel env add PUBLIC_SANITY_DATASET production
# Enter value: production

vercel env add PUBLIC_SANITY_API_VERSION production
# Enter value: 2024-01-01

vercel env add SANITY_API_TOKEN production
# Enter value: <your_new_token>

vercel env add SANITY_PREVIEW_SECRET production
# Enter value: <your_secret>

vercel env add ADMIN_PASSWORD production
# Enter value: <your_strong_password>

vercel env add RESEND_API_KEY production
# Enter value: <your_new_key>

vercel env add FROM_EMAIL production
# Enter value: bookings@kathgodamtaxi.com

vercel env add ADMIN_EMAIL production
# Enter value: kathgodamtaxi@gmail.com
```

**Via Web UI**:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable from your secure note
5. Select environment: **Production**

#### Configure Custom Domain

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your domain: `kathgodamtaxi.com`
3. Add `www.kathgodamtaxi.com` (optional)
4. Follow DNS configuration instructions
5. Wait for SSL certificate to provision (automatic)

#### Deploy

**Via CLI**:
```bash
vercel --prod
```

**Via Git** (Automatic):
1. Push to your main branch:
   ```bash
   git add .
   git commit -m "Production deployment"
   git push origin master
   ```
2. Vercel will automatically deploy

#### Add Security Headers

Create `vercel.json` in project root:
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
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

Commit and redeploy.

---

### Option 2: Netlify

#### Initial Setup

1. **Install Netlify CLI** (optional)
   ```bash
   npm i -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   ```

#### Configure Environment Variables

**Via CLI**:
```bash
netlify env:set PUBLIC_SANITY_PROJECT_ID "2o6xnbku"
netlify env:set PUBLIC_SANITY_DATASET "production"
# ... etc
```

**Via Web UI**:
1. Go to https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add each variable from your secure note

#### Configure Custom Domain

1. In Netlify dashboard, go to **Domain settings**
2. Click **Add custom domain**
3. Enter: `kathgodamtaxi.com`
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic via Let's Encrypt)

#### Add Security Headers

Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"

[[headers]]
  for = "/api/*"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"
```

#### Deploy

**Via CLI**:
```bash
netlify deploy --prod
```

**Via Git**:
1. Connect your Git repository in Netlify dashboard
2. Push to main branch
3. Netlify will auto-deploy

---

## Post-Deployment Verification

### Critical Checks

1. **Homepage** - `https://kathgodamtaxi.com`
   - [ ] Loads without errors
   - [ ] Images display correctly
   - [ ] Hero slider works
   - [ ] All links functional

2. **Route Pages** - `https://kathgodamtaxi.com/kathgodam-nainital`
   - [ ] Content displays
   - [ ] Images load
   - [ ] Pricing table visible
   - [ ] Booking button works

3. **Booking Flow** - `https://kathgodamtaxi.com/book`
   - [ ] Form loads
   - [ ] Can select route/vehicle
   - [ ] Validation works
   - [ ] Submission successful
   - [ ] Confirmation email received

4. **Admin Panel** - `https://kathgodamtaxi.com/admin/login`
   - [ ] Login form works
   - [ ] Rate limiting active (try 6 failed attempts)
   - [ ] CSRF protection working
   - [ ] Dashboard loads after login
   - [ ] Can view bookings

5. **Sanity Studio** - `https://kathgodamtaxi.com/studio`
   - [ ] Studio loads
   - [ ] Can login with Sanity credentials
   - [ ] Can edit content

6. **SEO & Security**
   - [ ] robots.txt accessible: `/robots.txt`
   - [ ] Sitemap accessible: `/sitemap-index.xml`
   - [ ] 404 page works: `/nonexistent-page`
   - [ ] HTTPS enabled (padlock in browser)
   - [ ] Security headers present (use securityheaders.com)

### Testing Tools

**SSL/TLS Check**:
```bash
https://www.ssllabs.com/ssltest/analyze.html?d=kathgodamtaxi.com
```

**Security Headers Check**:
```bash
https://securityheaders.com/?q=kathgodamtaxi.com
```

**Page Speed**:
```bash
https://pagespeed.web.dev/
```

**Mobile Friendly**:
```bash
https://search.google.com/test/mobile-friendly
```

### Monitor Error Logs

**Vercel**:
- Dashboard → Your Project → Logs
- Real-time function logs

**Netlify**:
- Site Overview → Functions → Logs

---

## Rollback Procedure

### Vercel Rollback

**Via Dashboard**:
1. Go to Deployments
2. Find previous working deployment
3. Click three dots → **Promote to Production**

**Via CLI**:
```bash
vercel rollback
```

### Netlify Rollback

**Via Dashboard**:
1. Go to Deploys
2. Find previous successful deploy
3. Click **Publish deploy**

**Via CLI**:
```bash
netlify deploy --prod --alias previous-version
```

### Emergency Rollback

If site is completely broken:

1. **Revert Git Commit**:
   ```bash
   git revert HEAD
   git push origin master
   ```
   Auto-deploy will trigger with previous version

2. **Restore Environment Variables**:
   - Check if any env vars were changed
   - Restore from backup

3. **Contact Support**:
   - Vercel: support@vercel.com
   - Netlify: support@netlify.com

---

## Post-Launch Checklist

### Week 1

- [ ] Monitor error logs daily
- [ ] Check booking submissions
- [ ] Verify emails are sending
- [ ] Review analytics setup
- [ ] Monitor uptime (use UptimeRobot)
- [ ] Test all forms

### Month 1

- [ ] Review security logs
- [ ] Check for dependency updates
- [ ] Run security audit: `npm audit`
- [ ] Verify backups (Sanity auto-backups)
- [ ] Review performance metrics

### Quarterly

- [ ] Rotate API keys and passwords
- [ ] Update dependencies
- [ ] Review and update content
- [ ] Performance optimization
- [ ] Security audit

---

## Monitoring & Maintenance

### Set Up Monitoring

1. **Uptime Monitoring**
   - UptimeRobot (free): https://uptimerobot.com
   - Monitor homepage, booking, admin

2. **Error Tracking**
   - Sentry (recommended): https://sentry.io
   ```bash
   npm install @sentry/astro
   ```

3. **Analytics**
   - Google Analytics 4
   - Vercel Analytics (built-in)
   - Netlify Analytics

### Regular Maintenance

**Weekly**:
- Review error logs
- Check booking submissions
- Monitor uptime reports

**Monthly**:
- Update dependencies
- Review security alerts
- Backup Sanity content (auto-backed up)

**Quarterly**:
- Rotate API keys
- Security audit
- Performance review

---

## Support & Troubleshooting

### Common Issues

**Build Fails**:
1. Check environment variables are set
2. Verify Node version (18.x or 20.x)
3. Clear build cache
4. Check error logs

**Images Not Loading**:
1. Verify Sanity project ID
2. Check image URLs in Sanity
3. Verify CDN is enabled

**Booking Form Not Working**:
1. Check CSRF token generation
2. Verify rate limiting not too strict
3. Check Resend API key is valid
4. Review function logs

**Admin Login Fails**:
1. Verify ADMIN_PASSWORD env var set
2. Check rate limiting (wait 15 min)
3. Clear cookies and retry
4. Check CSRF token

### Getting Help

- **Astro Discord**: https://astro.build/chat
- **Sanity Help**: https://www.sanity.io/help
- **Vercel Support**: https://vercel.com/support
- **Netlify Support**: https://www.netlify.com/support

---

## Final Notes

**Before going live**:
1. Complete ALL items in Pre-Deployment Checklist
2. Run through ALL Post-Deployment Verification checks
3. Have rollback procedure ready
4. Monitor closely for first 24 hours

**Remember**:
- Security is ongoing, not one-time
- Regular updates are critical
- Monitor your site actively
- Keep credentials secure
- Have a backup plan

Good luck with your deployment! 🚀
