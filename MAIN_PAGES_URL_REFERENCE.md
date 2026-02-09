# Main Pages URL Reference

This document shows the URLs for all main template/listing pages on your website.

## Main Template Pages

These pages display lists or collections of content:

| Page Name | Sanity Content | Astro File | Production URL |
|-----------|---------------|------------|----------------|
| **Homepage** | `homePage` | `src/pages/index.astro` | `/` |
| **Packages Listing** | `packagesPage` | `src/pages/packages.astro` | `/packages` |
| **Rates (All Routes)** | `ratesPage` | `src/pages/rates.astro` | `/rates` |
| **Temples Listing** | `templesPage` | `src/pages/temples.astro` | `/temples` |
| **Contact Page** | `contactPage` | `src/pages/contact.astro` | `/contact` |
| **Complete Tour** | `completeTourPage` | `src/pages/taxi-for-complete-tour.astro` | `/taxi-for-complete-tour` |

## Individual Content Pages

These pages are generated dynamically from Sanity content:

| Content Type | URL Pattern | Example |
|--------------|-------------|---------|
| **Route** | `/{slug}` | `/kathgodam-nainital` |
| **Package** | `/{slug}` | `/2-days-nainital-tour` |
| **Temple** | `/{slug}` | `/kainchi-dham` |

> **Note:** Individual pages use the same `src/pages/[slug].astro` dynamic route file.

## How to Change a Main Page URL

### Method 1: Rename the Astro File

Example: Change `/packages` to `/tour-packages`

1. Navigate to `src/pages/`
2. Rename `packages.astro` to `tour-packages.astro`
3. Update any internal links that reference `/packages`
4. Rebuild the site

```bash
# Example command
git mv src/pages/packages.astro src/pages/tour-packages.astro
```

### Method 2: Create Redirects (if you need to keep old URL working)

If you change a URL, add a redirect in `astro.config.mjs`:

```javascript
export default defineConfig({
  redirects: {
    '/packages': '/tour-packages', // Old URL → New URL
  }
})
```

## Finding Internal Links

To find all places that link to a page before changing its URL:

```bash
# Search for references to /packages
npm run grep "\\/packages"

# Or search in code
grep -r "/packages" src/
```

## Quick Reference

**Full URLs with domain:**
- Homepage: `https://kathgodamtaxi.com/`
- Packages: `https://kathgodamtaxi.com/packages`
- Rates: `https://kathgodamtaxi.com/rates`
- Temples: `https://kathgodamtaxi.com/temples`
- Contact: `https://kathgodamtaxi.com/contact`
- Complete Tour: `https://kathgodamtaxi.com/taxi-for-complete-tour`

**Local development URLs:**
- All pages: `http://localhost:4321/{page-name}`

## Notes

- **Sanity documents** (Packages Page, Rates Page, etc.) control the **content** of these pages
- **Astro files** control the **URL** and **layout**
- Changing content in Sanity = content updates only
- Renaming Astro files = URL changes
