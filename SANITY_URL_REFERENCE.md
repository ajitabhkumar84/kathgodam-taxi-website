# Sanity Studio URL Reference

This document explains how to find production URLs for pages you create in Sanity Studio.

## Individual Content Pages

After you generate a slug for any document (Route, Package, or Temple), you'll see a **🌐 Production URL** field that shows the live URL and allows you to click to open it.

### URL Pattern for Individual Pages

All individual content pages follow this simple pattern:

```
https://kathgodamtaxi.com/{slug}
```

**Examples:**
- Route: `https://kathgodamtaxi.com/kathgodam-nainital`
- Package: `https://kathgodamtaxi.com/2-days-nainital-tour`
- Temple: `https://kathgodamtaxi.com/kainchi-dham`

## Main Template/Listing Pages

These are the main pages that list multiple items:

### Homepage
- **URL**: `https://kathgodamtaxi.com/`
- **Content Type**: `homePage` in Sanity
- Shows featured routes, packages, and temples

### Rates Page (All Routes)
- **URL**: `https://kathgodamtaxi.com/rates` *(verify this URL in your site)*
- **Content Type**: `ratesPage` in Sanity
- Lists all taxi routes organized by category

### Packages Listing
- **URL**: `https://kathgodamtaxi.com/packages` *(verify this URL in your site)*
- Shows all tour packages

### Temples Listing
- **URL**: `https://kathgodamtaxi.com/temples` *(verify this URL in your site)*
- Lists all temples in the region

### Contact Page
- **URL**: `https://kathgodamtaxi.com/contact`
- **Content Type**: `contactPage` in Sanity

### Complete Tour Page
- **URL**: `https://kathgodamtaxi.com/taxi-for-complete-tour`
- **Content Type**: `completeTourPage` in Sanity

## How to Update the Domain

If your production domain changes, update it in these files:

1. **For individual pages**: Edit the `url` variable in:
   - `sanity/schemas/route.ts` (line ~42)
   - `sanity/schemas/package.ts` (line ~77)
   - `sanity/schemas/temple.ts` (line ~48)

2. **For reference**: Update the constants in:
   - `sanity/lib/previewUrl.ts`

## Development URLs

When running locally (`npm run dev`), all URLs are served from:
```
http://localhost:4321/{slug}
```

## Verifying URLs

To verify that a page is live:
1. Go to the document in Sanity Studio
2. Look for the **🌐 Production URL** field (below the slug field)
3. Click the URL to open it in a new tab
4. If the page doesn't exist, make sure:
   - The slug is generated
   - The document is marked as "Published"
   - The site has been rebuilt/deployed with the latest content
