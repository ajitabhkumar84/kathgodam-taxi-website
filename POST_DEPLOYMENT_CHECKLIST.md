# Post-Deployment SEO & Analytics Checklist

Complete this checklist after pointing your domain to Cloudflare Pages.

## ✅ Immediate Actions (First 24 Hours)

### 1. Google Search Console Setup
- [ ] **Add Property**: Go to [Google Search Console](https://search.google.com/search-console)
- [ ] **Choose Domain Property**: Add `kathgodamtaxi.in`
- [ ] **Get Verification Code**: Copy the meta tag content value
- [ ] **Add to Sanity**:
  - Go to `/studio`
  - Navigate to **Site Settings**
  - Paste verification code in **"Google Search Console Verification Code"** field
  - Publish
- [ ] **Verify**: Return to Search Console and click "Verify"

**What you get**: Crawl errors, search performance data, indexing status

### 2. Google Tag Manager (GTM) Setup
- [ ] **Create Account**: Go to [Google Tag Manager](https://tagmanager.google.com/)
- [ ] **Create Container**:
  - Container name: `Kathgodam Taxi`
  - Target platform: `Web`
- [ ] **Copy Container ID**: Format will be `GTM-XXXXXXX`
- [ ] **Add to Sanity**:
  - Go to `/studio` → Site Settings
  - Paste GTM ID in **"Google Tag Manager ID"** field
  - Publish
- [ ] **Configure GTM Tags** (see section below)

### 3. Google Analytics 4 (via GTM)
- [ ] **Create GA4 Property**: Go to [Google Analytics](https://analytics.google.com/)
- [ ] **Copy Measurement ID**: Format `G-XXXXXXXXXX`
- [ ] **Add to GTM**:
  1. In GTM, click **Tags** → **New**
  2. Tag Configuration: **Google Analytics: GA4 Configuration**
  3. Paste Measurement ID
  4. Triggering: **All Pages**
  5. Save and name it "GA4 Configuration"
- [ ] **Publish Container**: Click "Submit" in GTM

**What you get**: Traffic analytics, user behavior, conversion tracking

### 4. Submit Sitemap to Google
- [ ] **Sitemap URL**: `https://kathgodamtaxi.in/sitemap-index.xml`
- [ ] **Submit**: In Google Search Console → Sitemaps → Add new sitemap
- [ ] **Verify**: Check that sitemap is "Success" status (may take 24 hours)

### 5. Test Redirects
Test each old URL to confirm 301 redirects are working:

```bash
# Test in browser or use curl:
curl -I https://kathgodamtaxi.in/temples-in-kumaon-region-of-uttarakhand/
# Should return: HTTP/2 301 + Location: /temples

curl -I https://kathgodamtaxi.in/kainchi-dham-package/
# Should return: HTTP/2 301 + Location: /kainchi-dham-package-new

curl -I https://kathgodamtaxi.in/blog/
# Should return: HTTP/2 301 + Location: /
```

**URLs to test:**
- [ ] `/temples-in-kumaon-region-of-uttarakhand/` → `/temples`
- [ ] `/kainchi-dham-package/` → `/kainchi-dham-package-new`
- [ ] `/club-mahindra-tour-packages/` → `/club-mahindra-binsar`
- [ ] `/nainital-tour-packages/` → `/nainital-delight`
- [ ] `/blog/` → `/` (homepage)
- [ ] `/wp-admin/` → `/` (homepage)
- [ ] Any random URL like `/random-page-xyz` → Should show 404 page

### 6. Test 404 Page
- [ ] Visit: `https://kathgodamtaxi.in/this-page-does-not-exist`
- [ ] Verify 404 page shows
- [ ] Open DevTools → Network tab → Check status code is **404** (not 200)

---

## 📊 Analytics & Tracking (Week 1)

### 7. Set Up Enhanced Measurement (GA4)
In Google Analytics:
- [ ] Go to **Admin** → **Data Streams** → Select your web stream
- [ ] Enable **Enhanced Measurement**:
  - ✓ Page views (auto-enabled)
  - ✓ Scrolls
  - ✓ Outbound clicks
  - ✓ Site search
  - ✓ Form interactions
  - ✓ File downloads

### 8. Set Up Conversion Goals (GTM + GA4)

**Goal 1: Booking Form Submissions**
- [ ] In GTM, create Tag:
  - Type: GA4 Event
  - Event Name: `booking_initiated`
  - Trigger: Form submission on `/book` page
- [ ] Mark as conversion in GA4

**Goal 2: WhatsApp Clicks**
- [ ] In GTM, create Tag:
  - Type: GA4 Event
  - Event Name: `whatsapp_click`
  - Trigger: Click on `wa.me` links
- [ ] Mark as conversion in GA4

**Goal 3: Phone Clicks**
- [ ] In GTM, create Tag:
  - Type: GA4 Event
  - Event Name: `phone_click`
  - Trigger: Click on `tel:` links
- [ ] Mark as conversion in GA4

### 9. Google Ads Conversion Tracking (If Running Ads)
- [ ] Create Google Ads account (if not already)
- [ ] Link Google Ads to GA4
- [ ] Import GA4 conversions to Google Ads
- [ ] Set up remarketing audiences

### 10. Facebook Pixel (Optional - If Running Facebook Ads)
- [ ] Create Facebook Business Manager account
- [ ] Create Facebook Pixel
- [ ] Get Domain Verification Code
- [ ] Add to Sanity:
  - Go to `/studio` → Site Settings
  - Paste in **"Facebook Domain Verification Code"** field
  - Publish
- [ ] Add Pixel Code via GTM:
  1. In GTM, create Tag: Custom HTML
  2. Paste Facebook Pixel base code
  3. Trigger: All Pages
  4. Publish

---

## 🔍 SEO Optimization (Week 1-2)

### 11. Google Business Profile
- [ ] **Claim/Update**: [Google Business Profile](https://business.google.com/)
- [ ] **Add Details**:
  - Business name: Kathgodam Taxi
  - Category: Taxi Service
  - Address: Your pickup location
  - Phone: 7351721351
  - Website: https://kathgodamtaxi.in
  - Hours: Add operating hours
- [ ] **Add Photos**: Vehicles, scenic routes, team
- [ ] **Get Reviews**: Ask satisfied customers to leave Google reviews

### 12. Bing Webmaster Tools
- [ ] **Sign up**: [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] **Add Site**: `https://kathgodamtaxi.in`
- [ ] **Import from Google**: Use GSC import option (easiest)
- [ ] **Submit Sitemap**: Same URL as Google

### 13. Schema Markup Validation
- [ ] **Test Homepage**: [Rich Results Test](https://search.google.com/test/rich-results)
  - Paste: `https://kathgodamtaxi.in`
  - Should show: `LocalBusiness` schema
- [ ] **Test Route Page**:
  - Paste: `https://kathgodamtaxi.in/kathgodam-nainital`
  - Should show: `FAQPage` and `BreadcrumbList` schema

### 14. Page Speed Testing
- [ ] **Test on PageSpeed Insights**: [PageSpeed Insights](https://pagespeed.web.dev/)
  - Test homepage
  - Test a route page (e.g., `/kathgodam-nainital`)
  - Target: Score 90+ on both mobile and desktop
- [ ] **Test on GTmetrix**: [GTmetrix](https://gtmetrix.com/)
- [ ] **Fix Issues**: If any critical issues, document for later optimization

### 15. Mobile Friendliness
- [ ] **Test**: [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] **Verify**: Should pass without errors

### 16. Social Media Open Graph Testing
- [ ] **Facebook Debugger**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - Test homepage and 2-3 route pages
  - Click "Scrape Again" to refresh cache
- [ ] **Twitter Card Validator**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - Verify cards display correctly

---

## 🔗 Backlink & Local SEO (Ongoing)

### 17. Submit to Directories
- [ ] **JustDial**: List your taxi service
- [ ] **IndiaMART**: Business listing
- [ ] **Sulekha**: Taxi services directory
- [ ] **TradeIndia**: Service listing
- [ ] **Local Tourism Sites**: Contact Uttarakhand tourism directories

### 18. Set Up Social Media Profiles
- [ ] **Facebook Page**: Create business page
- [ ] **Instagram Business**: Create account
- [ ] **Update Sanity**:
  - Go to `/studio` → Site Settings → Social Media Links
  - Add Facebook, Instagram, Twitter URLs
  - Publish

### 19. Create Citations (NAP Consistency)
Ensure Name, Address, Phone (NAP) are identical across:
- [ ] Google Business Profile
- [ ] Facebook Page
- [ ] JustDial
- [ ] Bing Places
- [ ] Yellow Pages India
- [ ] Local directories

### 20. Monitor Brand Mentions
- [ ] Set up Google Alerts for "Kathgodam Taxi"
- [ ] Monitor TripAdvisor, Google Reviews
- [ ] Respond to all reviews (positive and negative)

---

## 📈 Ongoing Monitoring (Monthly)

### 21. Monthly Analytics Review
- [ ] **Check GA4 Dashboard**:
  - Traffic trends
  - Top pages
  - Conversion rates
  - Bounce rate
- [ ] **Check GSC**:
  - Search impressions
  - Click-through rate (CTR)
  - Average position
  - Coverage issues
- [ ] **Review Goals**: Are conversions increasing?

### 22. Technical SEO Health Check
- [ ] **Check GSC for errors**:
  - 404 errors
  - Server errors (5xx)
  - Mobile usability issues
  - Core Web Vitals
- [ ] **Fix issues** as they appear

### 23. Content Freshness
- [ ] Update seasonal pricing in Sanity (if applicable)
- [ ] Add new routes if you expand service
- [ ] Update FAQs based on customer questions
- [ ] Add new testimonials

---

## 🚨 Critical Warnings

### SSL Certificate
- [ ] **Verify HTTPS**: Ensure `https://kathgodamtaxi.in` loads with valid certificate
- [ ] **Redirect HTTP → HTTPS**: Cloudflare should handle this automatically
- [ ] **Test**: Visit `http://kathgodamtaxi.in` (should redirect to HTTPS)

### Cloudflare Settings
- [ ] **Enable Auto Minify**: CSS, JS, HTML
- [ ] **Enable Brotli Compression**
- [ ] **Set Caching Level**: Standard or Aggressive
- [ ] **Enable Always Use HTTPS**
- [ ] **Enable HSTS**: Security → HSTS → Enable

### DNS Propagation
- [ ] **Check DNS**: [WhatsMyDNS](https://www.whatsmydns.net/)
  - Enter: `kathgodamtaxi.in`
  - Verify: All locations show Cloudflare IPs
- [ ] **Wait 24-48 hours**: For full global propagation

---

## 📝 Tools & Resources

### Essential Tools (Free)
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Google Tag Manager](https://tagmanager.google.com/)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Rich Results Test](https://search.google.com/test/rich-results)

### Monitoring Tools (Free Tiers)
- [Google Alerts](https://www.google.com/alerts) - Brand monitoring
- [Ubersuggest](https://neilpatel.com/ubersuggest/) - Keyword research (limited free)
- [AnswerThePublic](https://answerthepublic.com/) - Content ideas
- [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools) - Free backlink checker

### Uptime Monitoring (Recommended)
- [UptimeRobot](https://uptimerobot.com/) - Free for 50 monitors
  - Set up alert if site goes down
  - Email/SMS notifications

---

## 🎯 Quick Win Checklist (Do These First!)

**Priority 1 (Day 1):**
1. ✅ Google Search Console verification
2. ✅ Google Tag Manager + GA4 setup
3. ✅ Submit sitemap
4. ✅ Test redirects
5. ✅ Verify 404 page works

**Priority 2 (Week 1):**
6. ✅ Google Business Profile
7. ✅ Set up conversion tracking
8. ✅ Test page speed
9. ✅ Social media Open Graph testing
10. ✅ Cloudflare optimizations

**Priority 3 (Week 2-4):**
11. ✅ Bing Webmaster Tools
12. ✅ Directory submissions
13. ✅ Social media profiles
14. ✅ Review monitoring setup
15. ✅ Monthly analytics routine

---

## 📞 Need Help?

If you encounter issues with any of these steps:
1. Check Google's official documentation
2. Cloudflare support docs: https://developers.cloudflare.com/
3. Sanity docs: https://www.sanity.io/docs

**Pro Tip**: Set a recurring calendar reminder to review analytics on the 1st of each month!
