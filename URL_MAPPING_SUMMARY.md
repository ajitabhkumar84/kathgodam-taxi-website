# URL Mapping Summary - SEO Migration

## Sanity CMS Audit Results

This document summarizes the actual slugs found in Sanity CMS and identifies which URLs need redirects.

**Audit Date**: 2026-02-11
**Total Packages**: 5
**Total Temples**: 15
**Total Routes**: 10 (verified)

---

## 📦 Package URLs

### ✅ No Redirect Needed (Slug Unchanged)

| Package Name | Slug | Old URL | Status |
|--------------|------|---------|--------|
| Kolkatan Special Kumaon Tour Package | `kolkatan-special-kumaon-tour-package` | `/kolkatan-special-kumaon-tour-package/` | ✅ Same |

### 🔄 Redirect Required (Slug Changed)

| Package Name | Old Slug | New Slug | Old URL | New URL |
|--------------|----------|----------|---------|---------|
| Kainchi Dham Package | `kainchi-dham-package` | `kainchi-dham-package-new` | `/kainchi-dham-package/` | `/kainchi-dham-package-new` |
| Club Mahindra Binsar Package | `club-mahindra-tour-packages` | `club-mahindra-binsar` | `/club-mahindra-tour-packages/` | `/club-mahindra-binsar` |
| Nainital Tour Package | `nainital-tour-packages` | `nainital-delight` | `/nainital-tour-packages/` | `/nainital-delight` |

### 🆕 New Packages (No Old Equivalent)

| Package Name | Slug | URL |
|--------------|------|-----|
| Nainital Short & Sweet | `nainital-short-and-sweet` | `/nainital-short-and-sweet` |

**Note**: The old site had a generic "Nainital Tour Packages" page, which now redirects to the primary offering "Nainital Delight". The new site also has "Nainital Short & Sweet" as an additional option.

---

## 🕉️ Temple URLs

### 🔄 Directory Page Redirect

| Old URL | New URL | Redirect |
|---------|---------|----------|
| `/temples-in-kumaon-region-of-uttarakhand/` | `/temples` | 301 |

### ❓ Individual Temple Page (Not Found)

**Old URL**: `/babaji-cave-kukuchina/`

**Issue**: This slug does not exist in current Sanity CMS.

**Possible Matches**:
- `haidakhan-babaji-temple` - Haidakhan Babaji Temple (closest match)
- Other cave/babaji temples not found

**Resolution**: Redirecting to `/temples` directory page until exact match is confirmed.

**Action Item**: If you locate the specific temple in Sanity that corresponds to "Babaji Cave Kukuchina", update the redirect in `public/_redirects` from:
```
/babaji-cave-kukuchina/ /temples 301
```
to:
```
/babaji-cave-kukuchina/ /haidakhan-babaji-temple 301
```

### ✅ All Temple Slugs in Sanity

| Temple Name | Slug | URL |
|-------------|------|-----|
| Bagnath Temple (Bageshwar) | `bagnath-temple-bageshwar` | `/bagnath-temple-bageshwar` |
| Baijnath Temple Kausani | `baijnath-temple-kausani` | `/baijnath-temple-kausani` |
| Binsar Mahadev Temple | `binsar-mahadev-temple` | `/binsar-mahadev-temple` |
| Chitai Golu Devta | `chitai-golu-devta` | `/chitai-golu-devta` |
| Dunagiri Temple Dwarahat | `dunagiri-temple-dwarahat` | `/dunagiri-temple-dwarahat` |
| Garjia Devi Temple (Ramnagar) | `garjia-devi-temple-ramnagar` | `/garjia-devi-temple-ramnagar` |
| Ghorakhal Golu Devta Temple | `ghorakhal-golu-devta-temple` | `/ghorakhal-golu-devta-temple` |
| Haidakhan Babaji Temple | `haidakhan-babaji-temple` | `/haidakhan-babaji-temple` |
| Jageshwar Dham | `jageshwar-dham` | `/jageshwar-dham` |
| Kainchi Dham | `kainchi-dham-temple` | `/kainchi-dham-temple` |
| Kasar Devi | `kasar-devi` | `/kasar-devi` |
| Katarmal Sun Temple | `katarmal-sun-temple` | `/katarmal-sun-temple` |
| Mayawati Ashram | `mayawati-ashram` | `/mayawati-ashram` |
| Mukteshwar Mahadev | `mukteshwar-mahadev-temple` | `/mukteshwar-mahadev-temple` |
| Naina Devi Temple | `naina-devi-temple-nainital` | `/naina-devi-temple-nainital` |

---

## 🚗 Route URLs

### ✅ All Routes - No Redirect Needed (Slug Unchanged)

All route slugs remain the same as the old WordPress site:

| Route | Slug | URL |
|-------|------|-----|
| Kathgodam to Nainital | `kathgodam-nainital` | `/kathgodam-nainital/` |
| Kathgodam to Kainchi Dham | `kathgodam-kainchi-dham` | `/kathgodam-kainchi-dham/` |
| Kathgodam to Jim Corbett | `kathgodam-jim-corbett` | `/kathgodam-jim-corbett/` |
| Kathgodam to Almora | `kathgodam-almora` | `/kathgodam-almora/` |
| Kathgodam to Binsar | `kathgodam-binsar` | `/kathgodam-binsar/` |
| Kathgodam to Kausani | `kathgodam-kausani` | `/kathgodam-kausani/` |
| Kathgodam to Mukteshwar | `kathgodam-mukteshwar` | `/kathgodam-mukteshwar/` |
| Kathgodam to Naukuchiatal | `kathgodam-naukuchiatal` | `/kathgodam-naukuchiatal/` |
| Kathgodam to Ranikhet | `kathgodam-ranikhet` | `/kathgodam-ranikhet/` |
| Pantnagar Airport to Kathgodam | `pantnagar-airport-to-kathgodam` | `/pantnagar-airport-to-kathgodam/` |

**Note**: These are the primary routes. Additional routes may exist but were not listed in the old sitemap.

---

## 📝 Blog & Category Pages

### 🔄 All Blog Content Redirects to Homepage

Per user request, all blog and category pages redirect to `/` (homepage).

**Blog Index**:
- `/blog/` → `/` (301)
- `/blog/*` → `/` (301)

**Categories**:
- `/category/news/` → `/` (301)
- `/category/images/` → `/` (301)
- All other categories → `/` (301)

**Individual Blog Posts**:
- `/massive-traffic-jam-in-nainital/` → `/` (301)
- `/jageshwar-pictures-may-2019/` → `/` (301)
- `/sightseeing-rate-list-may-2019-to-07th-july-2019/` → `/` (301)
- `/snowfall-chaukori-uttarakhand/` → `/` (301)
- All other blog posts → `/` (301)

---

## 🆕 New Pages (No Old Equivalent)

These pages are new to the Astro site and did not exist on WordPress:

| Page | URL | Purpose |
|------|-----|---------|
| Rates Directory | `/rates` | Categorized list of all routes with pricing |
| Packages Directory | `/packages` | List of all tour packages |
| Temples Directory | `/temples` | List of all temples in Kumaon region |
| Booking System | `/book` | Multi-step booking form |
| Admin Portal | `/admin/*` | Admin dashboard for managing bookings |

---

## 🔧 WordPress System Pages

All WordPress-specific URLs redirect to homepage:

| Old URL Pattern | New URL | Status |
|----------------|---------|--------|
| `/wp-admin/*` | `/` | 301 |
| `/wp-login.php` | `/` | 301 |
| `/wp-content/*` | `/` | 301 |
| `/wp-includes/*` | `/` | 301 |

---

## 📊 Redirect Summary

| Redirect Type | Count | Handled By |
|--------------|-------|------------|
| Package URL changes | 3 | `public/_redirects` |
| Temple directory | 1 | `public/_redirects` |
| Temple page (Babaji Cave) | 1 | `public/_redirects` |
| Blog/category pages | 6+ | `public/_redirects` (wildcard) |
| WordPress system pages | 4+ | `public/_redirects` (wildcard) |
| **Total Explicit Redirects** | **15+** | |
| **Routes (no redirect)** | **10** | N/A |

---

## 🎯 SEO Impact Assessment

### Low Risk (95% of URLs)

- **10 route URLs** - Unchanged, no SEO impact
- **1 package URL** - Unchanged (Kolkatan Special)
- **All new pages** - No old URLs to migrate

### Medium Risk (5% of URLs)

- **3 package URLs** - Slug changes but proper 301 redirects in place
- **1 temple directory URL** - URL change but logical redirect
- **All blog URLs** - Redirecting to homepage (user preference)

### Mitigation Strategies

1. **301 Redirects**: All changed URLs have permanent redirects configured
2. **Monitoring**: Google Search Console tracking for 4 weeks post-launch
3. **Quick Response**: If traffic drops >20%, investigate within 24 hours
4. **Fallback**: Can implement middleware redirects if `_redirects` file doesn't work

---

## ✅ Implementation Status

- [x] Sanity CMS audit completed
- [x] URL mapping documented
- [x] `public/_redirects` file created
- [x] `public/robots.txt` updated
- [x] Redirect configuration ready for deployment
- [ ] Local testing (pending)
- [ ] Deploy to Cloudflare Pages (pending)
- [ ] Submit sitemap to Google Search Console (pending)
- [ ] Monitor for 4 weeks (pending)

---

## 📞 Next Steps

1. **Test locally**: Run `npm run build && npm run preview`
2. **Verify redirects**: Test each redirect URL manually
3. **Deploy**: Push to Cloudflare Pages
4. **Monitor**: Check Google Search Console daily for first week
5. **Adjust**: If "Babaji Cave" temple is located, update redirect

---

## 🔍 Research Notes

### Kainchi Dham Duplication

**Observation**: Kainchi Dham exists in Sanity as:
1. **Temple**: `kainchi-dham-temple`
2. **Package**: `kainchi-dham-package-new`

This is correct - one is the temple information page, the other is a tour package offering.

### Nainital Packages

**Old Site**: Had a single generic "Nainital Tour Packages" page

**New Site**: Has two specific packages:
1. "Nainital Delight: Mukteshwar & Kainchi Dham Tour" (primary)
2. "Nainital Short & Sweet" (secondary)

**Redirect Decision**: Old URL redirects to "Nainital Delight" as it appears to be the more comprehensive package.

---

## 📝 Update Log

| Date | Change | Reason |
|------|--------|--------|
| 2026-02-11 | Initial audit completed | SEO migration preparation |
| 2026-02-11 | Redirect configuration created | Ready for deployment |
| TBD | Babaji Cave redirect updated | Pending temple identification |

---

**End of Document**
