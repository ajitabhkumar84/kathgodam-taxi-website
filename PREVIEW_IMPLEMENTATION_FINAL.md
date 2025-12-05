# Preview Mode - Final Implementation

## Overview

The preview functionality has been implemented using a **POST-based approach** to bypass URL query parameter stripping issues that occurred with the previous GET-based implementation.

## How It Works

### Architecture

1. **Sanity Studio Action Button** (`sanity.config.ts`)
   - Adds "Open Preview" button to all document types
   - Opens `preview-loader.html` in a new tab with query parameters
   - Query params work here because it's a direct page navigation, not an API call

2. **Preview Loader Page** (`src/pages/preview-loader.html`)
   - Standalone HTML page that acts as an intermediate step
   - Reads query parameters from URL
   - Makes POST request to `/api/preview` with data in request body
   - Shows loading spinner during the process
   - Redirects to the final page once preview mode is enabled

3. **Preview API Endpoints** (`src/pages/api/preview.ts`)
   - **GET endpoint**: Supports legacy/manual preview links with query params
   - **POST endpoint**: Receives secret, type, and slug in request body
   - Both endpoints validate the secret and set the preview cookie
   - POST returns JSON with redirect URL

4. **Preview Banner** (`src/components/PreviewBanner.astro`)
   - Yellow banner shown at top of page when in preview mode
   - "Exit Preview" button to disable preview mode

5. **Data Fetching** (`src/lib/sanity.ts`)
   - `getClient(preview: boolean)` function switches between regular and preview clients
   - Preview client uses `perspective: 'previewDrafts'` to fetch draft content
   - All data fetching functions accept `preview` parameter

## Files Modified/Created

### Created Files
- `src/pages/preview-loader.html` - Intermediate loader page
- `src/pages/api/preview.ts` - Preview API with GET and POST endpoints
- `src/pages/api/exit-preview.ts` - Exit preview API
- `src/components/PreviewBanner.astro` - Preview mode banner

### Modified Files
- `sanity.config.ts` - Added document actions for "Open Preview" button
- `src/lib/sanity.ts` - Added preview client and preview parameter support
- `src/pages/index.astro` - Added preview mode detection and PreviewBanner
- All components - Updated to accept and use preview data

## Usage

### From Sanity Studio

1. Open any document in Sanity Studio (http://localhost:4321/studio/)
2. Look for the "Open Preview" button in the document actions (top right area)
3. Click "Open Preview"
4. A new tab will open with a loading screen
5. After a moment, you'll be redirected to the preview page with a yellow banner
6. You'll see your draft changes reflected on the page
7. Click "Exit Preview" on the yellow banner to return to normal mode

### Supported Document Types

- **homePage** - Previews homepage (/)
- **whyChooseUs** - Previews homepage (/)
- **corporateClient** - Previews homepage (/)
- **navbar** - Previews homepage (/)
- **footer** - Previews homepage (/)
- **siteSettings** - Previews homepage (/)
- **route** - Previews route page (/{slug})
- **package** - Previews package page (/{slug})

## Technical Details

### Why POST Instead of GET?

The original implementation used GET requests with query parameters:
```
http://localhost:4321/api/preview?secret=xxx&type=homePage
```

However, when opening this URL with `window.open()` or `createElement('a').click()` from Sanity Studio, the browser was stripping the query parameters, causing "Invalid token" errors.

The POST-based solution solves this by:
1. Opening a regular HTML page with query params (works fine for pages)
2. The HTML page makes a POST request with data in body (not affected by param stripping)
3. Cookie is set in the same browser context
4. Redirect happens with cookie already in place

### Cookie Configuration

```javascript
cookies.set('preview-mode', 'true', {
  path: '/',
  httpOnly: true,
  secure: import.meta.env.PROD,
  sameSite: 'lax',
  maxAge: 60 * 60, // 1 hour
});
```

- **httpOnly**: Prevents JavaScript access (security)
- **sameSite: 'lax'**: Allows cookie to work across page navigations
- **maxAge: 1 hour**: Preview mode automatically expires after 1 hour

## Testing

### Test with Manual URL

You can still test with direct URLs by pasting into browser:

**Homepage:**
```
http://localhost:4321/preview-loader.html?secret=preview-secret-kathgodam-taxi-2024&type=homePage
```

**Route (replace SLUG):**
```
http://localhost:4321/preview-loader.html?secret=preview-secret-kathgodam-taxi-2024&type=route&slug=SLUG
```

**Package (replace SLUG):**
```
http://localhost:4321/preview-loader.html?secret=preview-secret-kathgodam-taxi-2024&type=package&slug=SLUG
```

### Exit Preview

```
http://localhost:4321/api/exit-preview
```

Or click "Exit Preview" button on the yellow banner.

## Environment Variables

Required in `.env`:

```env
PREVIEW_SECRET=preview-secret-kathgodam-taxi-2024
SANITY_API_TOKEN=your-token-here
```

The preview secret should match between:
- `.env` file
- `sanity.config.ts` (hardcoded fallback)
- Preview API endpoint

## Troubleshooting

### "Open Preview" Button Not Visible

1. Make sure you've restarted the dev server after modifying `sanity.config.ts`
2. Hard refresh Sanity Studio (Ctrl+Shift+R)
3. Check browser console for errors

### Preview Not Working / Invalid Token

1. Check that `.env` has `PREVIEW_SECRET` set
2. Verify dev server restarted after `.env` changes
3. Check browser console and server logs for errors
4. Try manual URL test to isolate the issue

### Preview Content Not Showing

1. Verify `SANITY_API_TOKEN` has read permissions
2. Check that you have draft content to preview
3. Look for the yellow preview banner - if missing, cookie wasn't set
4. Check browser dev tools > Application > Cookies for `preview-mode` cookie

### Pop-up Blocked

If the preview window doesn't open, your browser may be blocking pop-ups:
1. Allow pop-ups for localhost:4321
2. Look for the pop-up blocked icon in address bar
3. Click to allow and try again

## Production Deployment

Before deploying to production:

1. Update `baseUrl` in `sanity.config.ts` from localhost to your production URL
2. Change `PREVIEW_SECRET` to a secure random string
3. Keep `PREVIEW_SECRET` confidential - it controls access to preview mode
4. Consider adding IP whitelist or authentication for extra security

## Summary

This implementation provides a robust preview system that:
- ✅ Works around browser query parameter stripping issues
- ✅ Provides good UX with loading states and error handling
- ✅ Supports all document types (pages and singletons)
- ✅ Shows clear visual indicator when in preview mode
- ✅ Automatically expires preview sessions after 1 hour
- ✅ Easy to test manually with direct URLs
- ✅ Secure with token validation and httpOnly cookies
