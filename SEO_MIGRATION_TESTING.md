# SEO Migration Testing & Deployment Guide

## ✅ Completed Steps

### 1. Redirect Configuration Created
- **File**: `public/_redirects`
- **Redirects Configured**:
  - Temple directory: `/temples-in-kumaon-region-of-uttarakhand/` → `/temples`
  - Blog pages: All `/blog/*` and `/category/*` → `/` (homepage)
  - Package URL changes:
    - `/kainchi-dham-package/` → `/kainchi-dham-package-new`
    - `/club-mahindra-tour-packages/` → `/club-mahindra-binsar`
    - `/nainital-tour-packages/` → `/nainital-delight`
  - Temple page: `/babaji-cave-kukuchina/` → `/temples`
  - WordPress system pages: All `/wp-*` → `/`
  - Individual blog posts → `/`

### 2. robots.txt Updated
- **File**: `public/robots.txt`
- **Change**: Domain corrected from `kathgodamtaxi.com` to `kathgodamtaxi.in`

### 3. Sitemap Configuration Verified
- **File**: `astro.config.mjs`
- Site URL: `https://kathgodamtaxi.in` ✓
- Filters admin/studio/api pages ✓
- Will generate at `/sitemap-index.xml`

---

## 🧪 Pre-Deployment Testing

### Step 1: Build the Site Locally

```bash
cd "G:\Website Development\KathgodamTaxi\kathgodam-taxi"
npm run build
```

**Expected Output:**
- Build completes successfully
- Sitemap generated in `dist/sitemap-index.xml`
- No errors related to redirects

### Step 2: Preview Locally

```bash
npm run preview
```

**Test URL**: `http://localhost:4321`

### Step 3: Test Redirects Locally

**Using Browser:**

Open these URLs in your browser and verify they redirect:

1. Temple Directory:
   - `http://localhost:4321/temples-in-kumaon-region-of-uttarakhand/` → Should redirect to `/temples`

2. Packages:
   - `http://localhost:4321/kainchi-dham-package/` → Should redirect to `/kainchi-dham-package-new`
   - `http://localhost:4321/club-mahindra-tour-packages/` → Should redirect to `/club-mahindra-binsar`
   - `http://localhost:4321/nainital-tour-packages/` → Should redirect to `/nainital-delight`

3. Blog:
   - `http://localhost:4321/blog/` → Should redirect to `/`
   - `http://localhost:4321/category/news/` → Should redirect to `/`

**Using Command Line (PowerShell):**

```powershell
# Test temple directory redirect
Invoke-WebRequest -Uri "http://localhost:4321/temples-in-kumaon-region-of-uttarakhand/" -MaximumRedirection 0 -ErrorAction SilentlyContinue

# Test package redirect
Invoke-WebRequest -Uri "http://localhost:4321/kainchi-dham-package/" -MaximumRedirection 0 -ErrorAction SilentlyContinue

# Test blog redirect
Invoke-WebRequest -Uri "http://localhost:4321/blog/" -MaximumRedirection 0 -ErrorAction SilentlyContinue
```

**Look for**: `StatusCode: 301` and `Location` header pointing to new URL

**Using curl (if installed):**

```bash
curl -I http://localhost:4321/temples-in-kumaon-region-of-uttarakhand/
# Should return: HTTP/1.1 301 Moved Permanently
# Location: /temples
```

### Step 4: Verify Sitemap

1. Open: `http://localhost:4321/sitemap-index.xml`
2. Verify it includes:
   - Homepage (`/`)
   - All route pages (`/kathgodam-nainital/`, etc.)
   - Directory pages (`/rates`, `/packages`, `/temples`)
   - Package pages (with NEW slugs)
   - Temple pages
   - Contact page
3. Verify it EXCLUDES:
   - `/admin/*`
   - `/studio/*`
   - `/api/*`

### Step 5: Check for Redirect Chains

Ensure no redirect points to another redirect (should be single-hop):

```powershell
# This should go directly from old URL → new URL (not old → intermediate → new)
Invoke-WebRequest -Uri "http://localhost:4321/kainchi-dham-package/" -MaximumRedirection 5
```

Verify the redirect count is 1, not 2 or more.

---

## 🚀 Deployment Checklist

### Before Deploying

- [ ] Local build completes without errors
- [ ] All redirects tested locally and working
- [ ] Sitemap accessible at `/sitemap-index.xml`
- [ ] No redirect chains detected
- [ ] robots.txt has correct domain (`kathgodamtaxi.in`)

### Deploy to Cloudflare Pages

1. **Commit Changes**:
   ```bash
   git add public/_redirects public/robots.txt
   git commit -m "Add SEO migration redirects and update robots.txt"
   git push origin master
   ```

2. **Deploy via Cloudflare**:
   - Cloudflare Pages will auto-deploy from `master` branch
   - Or manually trigger deployment from Cloudflare dashboard

3. **Wait for Deployment**:
   - Monitor Cloudflare Pages dashboard
   - Wait for "Success" status

---

## ✅ Post-Deployment Validation (Day 1)

### Test Live Redirects

**Critical Redirects to Test:**

1. **Temple Directory**:
   ```powershell
   Invoke-WebRequest -Uri "https://kathgodamtaxi.in/temples-in-kumaon-region-of-uttarakhand/" -MaximumRedirection 0 -ErrorAction SilentlyContinue
   ```
   Expected: `StatusCode: 301`, `Location: /temples`

2. **Package Redirects**:
   ```powershell
   Invoke-WebRequest -Uri "https://kathgodamtaxi.in/kainchi-dham-package/" -MaximumRedirection 0 -ErrorAction SilentlyContinue
   Invoke-WebRequest -Uri "https://kathgodamtaxi.in/club-mahindra-tour-packages/" -MaximumRedirection 0 -ErrorAction SilentlyContinue
   Invoke-WebRequest -Uri "https://kathgodamtaxi.in/nainital-tour-packages/" -MaximumRedirection 0 -ErrorAction SilentlyContinue
   ```

3. **Blog Redirects**:
   ```powershell
   Invoke-WebRequest -Uri "https://kathgodamtaxi.in/blog/" -MaximumRedirection 0 -ErrorAction SilentlyContinue
   Invoke-WebRequest -Uri "https://kathgodamtaxi.in/category/news/" -MaximumRedirection 0 -ErrorAction SilentlyContinue
   ```

**Online Tools:**
- https://httpstatus.io/ - Enter old URLs and verify 301 status
- https://www.redirect-checker.org/ - Check for redirect chains

### Verify Sitemap

1. Visit: `https://kathgodamtaxi.in/sitemap-index.xml`
2. Confirm it loads successfully
3. Click through to individual sitemaps if applicable

### Check robots.txt

1. Visit: `https://kathgodamtaxi.in/robots.txt`
2. Verify:
   - `Sitemap: https://kathgodamtaxi.in/sitemap-index.xml`
   - Disallow rules for `/admin/`, `/studio/`, `/api/`

### Test Structured Data

1. Go to: https://search.google.com/test/rich-results
2. Test homepage: `https://kathgodamtaxi.in/`
   - Should show **TaxiService** schema
3. Test route page: `https://kathgodamtaxi.in/kathgodam-nainital/`
   - Should show **FAQPage** and **BreadcrumbList** schemas

### Verify Canonical URLs

1. Visit any route page (e.g., `/kathgodam-nainital/`)
2. View page source (Ctrl+U)
3. Look for: `<link rel="canonical" href="https://kathgodamtaxi.in/kathgodam-nainital/" />`
4. Verify it matches the current URL

---

## 📊 Google Search Console Setup

### Day 1: Submit Sitemap

1. Go to: https://search.google.com/search-console
2. Select property: `kathgodamtaxi.in`
3. Navigate to: **Sitemaps** (left sidebar)
4. Remove old sitemap (if exists)
5. Add new sitemap: `https://kathgodamtaxi.in/sitemap-index.xml`
6. Click **Submit**

**Expected Result:**
- Status: "Success" or "Pending"
- Wait 24-48 hours for initial crawl

### Day 2-3: Monitor Initial Crawl

1. GSC → **Pages** report
2. Look for:
   - Indexed page count (should stabilize at ~30-50 pages)
   - Crawl errors (should be 0)
   - Redirect errors (should be 0)

### Week 1: Check Coverage Report

1. GSC → **Coverage** → **Excluded** tab
2. Verify old blog URLs show status: **"Redirect"**
3. Ensure no **"Not found (404)"** errors for migrated URLs

---

## 📈 Monitoring Schedule

### Daily (Week 1)

- [ ] Check GSC for crawl errors
- [ ] Monitor indexed page count
- [ ] Verify no 404 errors in server logs
- [ ] Spot-check 2-3 redirects are working

### Weekly (Weeks 2-4)

- [ ] Review GSC Coverage Report
- [ ] Check organic traffic in Google Analytics
- [ ] Monitor keyword rankings (top 10 terms)
- [ ] Verify old blog URLs are de-indexed

### Monthly (Months 2-3)

- [ ] Compare organic traffic to pre-migration baseline
- [ ] Review Core Web Vitals in GSC
- [ ] Check for any new 404 errors
- [ ] Update internal links pointing to old URLs (if any)

---

## 🎯 Success Metrics

### Week 1 Goals
- ✅ Zero 404 errors in GSC
- ✅ All redirects returning 301 status
- ✅ Sitemap successfully crawled
- ✅ Indexed page count > 25 pages

### Month 1 Goals
- ✅ Organic traffic within 10% of pre-migration baseline
- ✅ Old blog URLs de-indexed
- ✅ New directory pages (/rates, /packages, /temples) indexed
- ✅ Core Web Vitals: All green or yellow

### Month 2-3 Goals
- ✅ Organic traffic matches or exceeds pre-migration
- ✅ Top 10 keyword rankings maintained or improved
- ✅ Zero redirect-related errors in GSC
- ✅ All new pages ranking in Google

---

## 🔧 Troubleshooting

### Issue: Redirects Not Working

**Symptoms:**
- Old URLs return 404 instead of 301
- Redirects work locally but not in production

**Solutions:**
1. Verify `_redirects` file is in `public/` folder
2. Check file is deployed to Cloudflare (inspect deployed files)
3. Try clearing Cloudflare cache (Cloudflare dashboard → Caching → Purge Everything)
4. If still not working, implement redirects in `src/middleware.ts` instead

**Middleware Fallback:**
Edit `src/middleware.ts` and add redirect logic before security headers:

```typescript
// Check for SEO redirects
const pathname = url.pathname.replace(/\/$/, ''); // Remove trailing slash

// Temple directory
if (pathname === '/temples-in-kumaon-region-of-uttarakhand') {
  return _context.redirect('/temples', 301);
}

// Package redirects
const packageRedirects: Record<string, string> = {
  '/kainchi-dham-package': '/kainchi-dham-package-new',
  '/club-mahindra-tour-packages': '/club-mahindra-binsar',
  '/nainital-tour-packages': '/nainital-delight',
};
if (packageRedirects[pathname]) {
  return _context.redirect(packageRedirects[pathname], 301);
}

// Blog redirects
if (pathname.startsWith('/blog') || pathname.startsWith('/category')) {
  return _context.redirect('/', 301);
}
```

### Issue: Sitemap Not Updating

**Symptoms:**
- Sitemap shows old URLs
- New pages missing from sitemap

**Solutions:**
1. Clear `.astro` cache: Delete `.astro/` directory
2. Rebuild: `npm run build`
3. Verify `astro.config.mjs` has `site: 'https://kathgodamtaxi.in'`
4. Check Sanity CMS: Ensure new pages have `published: true`

### Issue: Organic Traffic Drop

**Symptoms:**
- Traffic down >20% after migration
- Keyword rankings dropped

**Immediate Actions:**
1. Check GSC for crawl errors
2. Verify all redirects are working
3. Test structured data validity
4. Check for broken internal links
5. Ensure canonical URLs are correct

**If Critical:**
- Document the issue with screenshots
- Consider rolling back temporarily
- Investigate root cause before re-deploying

---

## 📝 URL Mapping Reference

### Package Redirects (Slug Changes)

| Old URL | New URL | Status |
|---------|---------|--------|
| `/kainchi-dham-package/` | `/kainchi-dham-package-new` | 301 |
| `/club-mahindra-tour-packages/` | `/club-mahindra-binsar` | 301 |
| `/nainital-tour-packages/` | `/nainital-delight` | 301 |
| `/kolkatan-special-kumaon-tour-package/` | SAME (no redirect) | - |

### Temple Redirects

| Old URL | New URL | Status |
|---------|---------|--------|
| `/temples-in-kumaon-region-of-uttarakhand/` | `/temples` | 301 |
| `/babaji-cave-kukuchina/` | `/temples` | 301 |

### Blog Redirects

| Old URL | New URL | Status |
|---------|---------|--------|
| `/blog/*` | `/` | 301 |
| `/category/*` | `/` | 301 |
| All individual blog posts | `/` | 301 |

### Routes (No Redirect Needed)

All route URLs remain unchanged:
- `/kathgodam-nainital/`
- `/kathgodam-kainchi-dham/`
- `/kathgodam-jim-corbett/`
- `/kathgodam-almora/`
- `/kathgodam-binsar/`
- `/kathgodam-kausani/`
- `/kathgodam-mukteshwar/`
- `/kathgodam-naukuchiatal/`
- `/kathgodam-ranikhet/`
- `/pantnagar-airport-to-kathgodam/`

---

## ✅ Final Pre-Launch Checklist

- [ ] `public/_redirects` file created
- [ ] `public/robots.txt` updated with correct domain
- [ ] Local build completes successfully
- [ ] All redirects tested locally
- [ ] Sitemap accessible at `/sitemap-index.xml`
- [ ] No redirect chains detected
- [ ] Committed to git and ready to deploy
- [ ] Google Search Console access confirmed
- [ ] Analytics tracking code verified

---

## 📞 Support & Resources

**Testing Tools:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Redirect Checker: https://www.redirect-checker.org/
- HTTP Status Checker: https://httpstatus.io/
- Google Search Console: https://search.google.com/search-console

**Documentation:**
- Cloudflare Pages Redirects: https://developers.cloudflare.com/pages/configuration/redirects/
- Astro Sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/

**Project Files:**
- Redirects: `public/_redirects`
- Robots: `public/robots.txt`
- Sitemap Config: `astro.config.mjs`
- Middleware: `src/middleware.ts` (fallback option)

---

## 🎉 Expected Outcome

After successful deployment and 2-4 weeks of monitoring:

1. **Zero 404 errors** - All old URLs properly redirected
2. **SEO equity preserved** - Rankings maintained for key terms
3. **Improved performance** - Faster load times benefit SEO
4. **New pages indexed** - /rates, /packages, /temples ranking
5. **Organic traffic stable or growing** - Within 10% of baseline

The migration is **low-risk** because:
- Only ~15 URLs needed redirects
- Most route URLs remained unchanged
- Comprehensive redirect strategy
- Existing SEO optimizations already in place
- Ability to monitor via Google Search Console

Good luck with the deployment! 🚀
