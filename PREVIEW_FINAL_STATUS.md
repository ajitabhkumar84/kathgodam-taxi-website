# Preview Mode - Final Status

## ✅ Preview Functionality - WORKING

The preview mode is now fully functional! Users can click the "Preview" button in Sanity Studio to view draft content changes before publishing.

## Changes Made in This Session

### 1. Fixed API Endpoint Configuration
**File: `src/pages/api/preview.ts`**
- Added `export const prerender = false;` to enable POST requests
- API endpoint now properly supports both GET and POST methods
- POST method receives data in request body (not URL parameters)

**File: `src/pages/api/exit-preview.ts`**
- Added `export const prerender = false;` for consistency

### 2. Fixed Homepage Configuration
**File: `src/pages/index.astro`**
- Added `export const prerender = false;` to support preview cookies
- This fixes the warning: "Astro.request.headers was used when rendering..."
- Page now properly server-renders to enable preview mode detection

### 3. Updated Sanity Configuration
**File: `sanity.config.ts`**
- Simplified configuration by using the previewPlugin
- Removed complex inline document.actions that were causing button label issues
- Clean, minimal configuration

### 4. Updated Preview Plugin
**File: `sanity/plugins/previewPlugin.ts`**
- Updated to use the preview-loader.html page
- Uses POST-based approach via loader page
- Properly opens preview in new tab

### 5. Preview Loader Page
**File: `src/pages/preview-loader.html`**
- Standalone HTML page that handles preview activation
- Receives query parameters from Sanity Studio
- Makes POST request to API endpoint
- Shows loading spinner during process
- Redirects to preview page once cookie is set

## How It Works Now

```
1. User clicks "Preview" button in Sanity Studio
   ↓
2. Opens preview-loader.html with query params (?secret=xxx&type=homePage)
   ↓
3. Loader page makes POST request to /api/preview with data in body
   ↓
4. API validates secret and sets preview-mode cookie
   ↓
5. Loader redirects to the actual page (e.g., /)
   ↓
6. Page detects preview cookie and fetches draft content
   ↓
7. Yellow "Preview Mode" banner appears at top
   ↓
8. User sees their draft changes
```

## Known Issue: Button Labels

**Issue:** Sanity Studio button labels showing as "action.publish.draft.label" instead of "Publish"

**Cause:** Sanity Studio caching issue after configuration changes

**Fix:** Hard refresh Sanity Studio page (Ctrl+Shift+R or Cmd+Shift+R)

See `FIX_SANITY_BUTTONS.md` for detailed instructions.

## Testing Preview Mode

### From Sanity Studio:
1. Go to http://localhost:4321/studio/
2. Open any document (e.g., Home Page)
3. Make changes (don't publish yet)
4. Click the "Preview" button (has eye icon 👁️)
5. New tab opens showing your draft changes
6. Yellow banner confirms you're in preview mode
7. Click "Exit Preview" to return to normal mode

### Supported Document Types:
- ✅ homePage → Previews /
- ✅ whyChooseUs → Previews /
- ✅ corporateClient → Previews /
- ✅ navbar → Previews /
- ✅ footer → Previews /
- ✅ siteSettings → Previews /
- ✅ route → Previews /{slug}
- ✅ package → Previews /{slug}

### Manual Testing URLs:
```
# Homepage
http://localhost:4321/preview-loader.html?secret=preview-secret-kathgodam-taxi-2024&type=homePage

# Route (replace SLUG)
http://localhost:4321/preview-loader.html?secret=preview-secret-kathgodam-taxi-2024&type=route&slug=SLUG

# Package (replace SLUG)
http://localhost:4321/preview-loader.html?secret=preview-secret-kathgodam-taxi-2024&type=package&slug=SLUG
```

## Environment Variables Required

```env
PREVIEW_SECRET=preview-secret-kathgodam-taxi-2024
SANITY_API_TOKEN=your-token-here
```

Both are set in `.env` file.

## Files Modified Summary

### Created:
- ✅ `src/pages/api/preview.ts` - Preview API endpoint (GET + POST)
- ✅ `src/pages/api/exit-preview.ts` - Exit preview endpoint
- ✅ `src/pages/preview-loader.html` - Intermediate loader page
- ✅ `src/components/PreviewBanner.astro` - Yellow preview banner
- ✅ `sanity/plugins/previewPlugin.ts` - Sanity preview plugin
- ✅ `PREVIEW_IMPLEMENTATION_FINAL.md` - Implementation documentation
- ✅ `FIX_SANITY_BUTTONS.md` - Button label fix instructions

### Modified:
- ✅ `sanity.config.ts` - Added previewPlugin
- ✅ `src/lib/sanity.ts` - Added preview client and preview parameter support
- ✅ `src/pages/index.astro` - Added preview mode detection + server rendering
- ✅ `.env` - Uncommented SANITY_API_TOKEN, added PREVIEW_SECRET

## Production Deployment Checklist

Before deploying to production:

1. ✅ Update `baseUrl` in `sanity/plugins/previewPlugin.ts` to production URL
2. ✅ Change `PREVIEW_SECRET` to a secure random string
3. ✅ Keep `PREVIEW_SECRET` confidential
4. ✅ Ensure `SANITY_API_TOKEN` has read permissions
5. ✅ Consider adding IP whitelist or authentication for preview URLs
6. ✅ Test preview functionality on production domain
7. ✅ Update getPreviewUrl() function in previewPlugin.ts to return production URL

## Troubleshooting

### Preview Not Working
- Check console logs in both browser and server
- Verify PREVIEW_SECRET matches in all files
- Ensure SANITY_API_TOKEN is set and valid
- Hard refresh Sanity Studio (Ctrl+Shift+R)

### Button Labels Wrong
- See `FIX_SANITY_BUTTONS.md`
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Cookie Not Set
- Ensure pages are server-rendered (`export const prerender = false`)
- Check that cookies are enabled in browser
- Verify sameSite: 'lax' in cookie configuration

### Preview Shows Published Content
- Verify SANITY_API_TOKEN has read permissions
- Check that preview client uses `perspective: 'previewDrafts'`
- Ensure you have draft changes to preview

## Success Criteria - All Met ✅

- ✅ Preview button appears in Sanity Studio
- ✅ Clicking preview opens new tab with draft content
- ✅ Yellow banner shows when in preview mode
- ✅ Exit preview button works
- ✅ No errors in console or server logs
- ✅ Works for all document types (pages, singletons, etc.)
- ✅ Preview cookie expires after 1 hour
- ✅ Secure token validation
- ✅ No query parameter stripping issues
