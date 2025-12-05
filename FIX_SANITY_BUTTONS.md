# Fix Sanity Studio Button Labels

If you're seeing button labels like "action.publish.draft.label" instead of proper text like "Publish", this is a Sanity Studio caching issue.

## Quick Fix Options

### Option 1: Hard Refresh (Recommended)
1. Go to Sanity Studio: http://localhost:4321/studio/
2. Press `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
3. This clears the cache and reloads the page
4. The button labels should return to normal

### Option 2: Clear Browser Cache
1. Press `F12` to open Developer Tools
2. Right-click the refresh button in the browser
3. Select "Empty Cache and Hard Reload"
4. Close Developer Tools

### Option 3: Clear Site Data (Nuclear Option)
1. Press `F12` to open Developer Tools
2. Go to the "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Find "localhost:4321" in the left sidebar
4. Click "Clear site data" or "Clear all"
5. Close and reopen the browser
6. Navigate back to http://localhost:4321/studio/

### Option 4: Restart Dev Server
Sometimes restarting the dev server helps:
```bash
# Stop the current server (Ctrl+C in the terminal)
# Then start it again:
npm run dev
```

## Why This Happens

Sanity Studio caches configuration and translation files. When we modify `sanity.config.ts` or plugins, sometimes the cache doesn't invalidate properly, causing translation keys to display instead of the actual button text.

The hard refresh (Option 1) usually fixes this immediately.

## Verify It's Fixed

After trying any of the above options, you should see:
- ✅ "Publish" button (not "action.publish.draft.label")
- ✅ "Unpublish" option in dropdown (not "action.unpublish.label")
- ✅ "Duplicate" option (not "action.duplicate.label")
- ✅ "Preview" button with eye icon (our custom button)

## Still Not Working?

If button labels are still showing as translation keys after trying all options:

1. Check browser console (F12) for JavaScript errors
2. Try a different browser (sometimes browser extensions interfere)
3. Make sure you're using a modern browser version
4. Check if any browser extensions are blocking JavaScript
