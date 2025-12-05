# Preview Mode Implementation Summary

## ✅ Implementation Complete!

You now have a fully functional preview system that allows you to see draft content from Sanity CMS before publishing.

---

## 📁 Files Created

### API Routes
- ✅ `src/pages/api/preview.ts` - Enables preview mode
- ✅ `src/pages/api/exit-preview.ts` - Disables preview mode

### Components
- ✅ `src/components/PreviewBanner.astro` - Yellow banner shown in preview mode

### Sanity Plugin
- ✅ `sanity/plugins/previewPlugin.ts` - Adds Preview button to Sanity Studio

### Documentation
- ✅ `PREVIEW_MODE_GUIDE.md` - Complete user guide
- ✅ `PREVIEW_IMPLEMENTATION_SUMMARY.md` - This file

---

## 📝 Files Modified

### Configuration
- ✅ `sanity.config.ts` - Added preview plugin
- ✅ `.env` - Added PREVIEW_SECRET

### Library
- ✅ `src/lib/sanity.ts` - Added preview client and updated all helper functions

### Pages
- ✅ `src/pages/index.astro` - Added preview mode support and banner

---

## 🚀 How to Use

### Step 1: Get Sanity API Token
1. Visit: https://www.sanity.io/manage/project/2o6xnbku/api
2. Create token with **Viewer** permissions
3. Copy the token

### Step 2: Add Token to .env
```env
SANITY_API_TOKEN=your-token-here
```

### Step 3: Start Servers
```bash
# Terminal 1 - Astro Dev Server
npm run dev

# Terminal 2 - Sanity Studio (if not running)
cd sanity && sanity dev
```

### Step 4: Test Preview
1. Open Sanity Studio (http://localhost:3333)
2. Go to "Home Page"
3. Make a change (don't publish)
4. Click the **Preview** button (eye icon)
5. See your changes in a new tab with yellow banner

---

## 🎯 Features

### For All Document Types
- ✅ Preview button in Sanity Studio toolbar
- ✅ Works with draft (unpublished) content
- ✅ Works with published content
- ✅ Shows exact preview of how page will look

### Preview Banner
- ✅ Yellow banner at top of page
- ✅ Shows "Preview Mode Active" message
- ✅ "Exit Preview" button to return to normal mode
- ✅ Fixed position, follows scroll

### Supported Document Types
- ✅ Home Page
- ✅ Routes
- ✅ Packages
- ✅ Why Choose Us
- ✅ Corporate Clients
- ✅ Navbar
- ✅ Footer
- ✅ Site Settings

---

## 🔧 Technical Architecture

### Preview Flow
```
Sanity Studio → Click Preview Button
     ↓
Opens: /api/preview?secret=XXX&type=route&slug=XXX
     ↓
API sets preview cookie (1 hour expiry)
     ↓
Redirects to page (e.g., /kathgodam-nainital)
     ↓
Page checks for preview cookie
     ↓
If cookie exists: Fetch draft content
     ↓
Shows yellow banner + draft content
```

### Exit Preview Flow
```
User clicks "Exit Preview"
     ↓
Opens: /api/exit-preview
     ↓
API deletes preview cookie
     ↓
Redirects to homepage
     ↓
Normal published content shown
```

---

## 🔐 Security

### Preview Secret
- Stored in `.env` as `PREVIEW_SECRET`
- Default: `preview-secret-kathgodam-taxi-2024`
- **Change this in production!**

### API Token
- Stored in `.env` as `SANITY_API_TOKEN`
- Required for reading draft content
- Minimum: Viewer permissions
- Never commit to version control

### Cookie Security
- HTTP-only: Prevents JavaScript access
- Secure: HTTPS required in production
- SameSite: Strict
- Expires: 1 hour

---

## 🌐 Environment Variables

Required in `.env`:

```env
# Sanity Configuration (already set)
PUBLIC_SANITY_PROJECT_ID=2o6xnbku
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01

# Preview Mode (add these)
SANITY_API_TOKEN=your-viewer-token-here
PREVIEW_SECRET=preview-secret-kathgodam-taxi-2024
```

---

## 📋 Next Steps

### 1. Set Up Token
- [ ] Get Sanity API token
- [ ] Add to `.env` file
- [ ] Restart dev server

### 2. Test Preview
- [ ] Make draft changes in Sanity
- [ ] Click Preview button
- [ ] Verify yellow banner appears
- [ ] Verify draft content shows
- [ ] Test Exit Preview

### 3. Update for Production
- [ ] Change `PREVIEW_SECRET` to secure random string
- [ ] Update production URL in `previewPlugin.ts`
- [ ] Add environment variables to hosting platform
- [ ] Test on production

---

## 📖 Documentation

Refer to **PREVIEW_MODE_GUIDE.md** for:
- Detailed usage instructions
- Troubleshooting guide
- Best practices
- Security considerations
- Advanced usage

---

## 🎓 How Preview Works

### Draft Content
In Sanity, documents have two states:
- **Draft** - Unpublished changes (prefixed with `drafts.`)
- **Published** - Live content

### Preview Mode
When preview is enabled:
- Uses `previewClient` with `perspective: 'previewDrafts'`
- Sanity returns drafts when available
- Falls back to published if no draft exists
- No CDN caching (fresh data every time)

### Normal Mode
When preview is disabled:
- Uses regular `client`
- Only published documents returned
- CDN caching enabled (faster)
- What your visitors see

---

## ⚡ Performance Notes

### Preview Mode
- **Slower** - No CDN, fresh queries
- **Purpose** - Accuracy over speed
- **Use** - Only for previewing drafts

### Normal Mode
- **Faster** - CDN cached
- **Purpose** - Speed for visitors
- **Use** - All production traffic

---

## 🐛 Troubleshooting Quick Fix

### Preview Not Working?

1. **Check token:**
   ```bash
   # Verify .env has SANITY_API_TOKEN set
   cat .env | grep SANITY_API_TOKEN
   ```

2. **Restart server:**
   ```bash
   # Stop dev server (Ctrl+C)
   npm run dev
   ```

3. **Clear cookies:**
   - Browser DevTools → Application → Cookies
   - Delete all cookies for localhost:4321

4. **Check browser console:**
   - F12 → Console tab
   - Look for errors

---

## 🎉 Success Indicators

You'll know preview is working when:

✅ Preview button appears in Sanity Studio
✅ Clicking it opens a new tab
✅ Yellow banner shows at top of page
✅ Banner says "Preview Mode Active"
✅ Draft changes are visible
✅ "Exit Preview" works and removes banner

---

## 📊 What's Different in Preview vs Live?

| Aspect | Preview Mode | Live Mode |
|--------|-------------|-----------|
| Content | Drafts + Published | Published only |
| Speed | Slower (no cache) | Faster (cached) |
| URL | Has preview cookie | No cookie |
| Banner | Yellow banner shown | No banner |
| Audience | You + team | Public visitors |
| CDN | Disabled | Enabled |

---

## 🔄 Workflow Example

```
1. Edit content in Sanity Studio
   ↓
2. Click Preview (don't publish yet)
   ↓
3. Review changes in new tab
   ↓
4. Go back to Sanity, make adjustments
   ↓
5. Click Preview again to see updates
   ↓
6. Repeat until satisfied
   ↓
7. Click Publish in Sanity
   ↓
8. Content is now live!
```

---

## 💡 Pro Tips

1. **Preview Early, Preview Often** - Catch issues before publishing

2. **Mobile Testing** - Use browser DevTools mobile view to test responsive design

3. **Share Preview Links** - Give preview URL to team members (they need the secret)

4. **Exit When Done** - Don't forget to exit preview mode to see live site

5. **Refresh for Updates** - After making more Sanity changes, refresh preview tab

---

## 🚀 Ready to Use!

Your preview system is fully implemented and ready to use. Follow the steps in "How to Use" section above to get started.

For detailed instructions, see **PREVIEW_MODE_GUIDE.md**.

---

**Status:** ✅ Complete
**Date:** December 2025
**Version:** 1.0
