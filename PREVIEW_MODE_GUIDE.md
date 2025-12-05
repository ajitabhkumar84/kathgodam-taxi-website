# Preview Mode Guide for Kathgodam Taxi CMS

## Overview
Preview mode allows you to see how your draft content will look on the live website **before publishing**. This is perfect for reviewing changes, catching errors, and ensuring everything looks correct.

---

## 🎯 How Preview Mode Works

When you click the **Preview** button in Sanity Studio:
1. A new browser tab opens showing your website
2. You see draft (unpublished) content alongside published content
3. A yellow banner at the top indicates you're in preview mode
4. You can navigate through the site to see how changes look
5. Click "Exit Preview" to return to normal viewing mode

---

## 📋 Setup Instructions

### Step 1: Get a Sanity API Token

To use preview mode, you need a Sanity API token with read permissions:

1. Go to https://www.sanity.io/manage/project/2o6xnbku/api
2. Click **"Add API token"**
3. Give it a name: "Preview Token"
4. Set permissions: **Viewer** (read-only)
5. Click **"Add token"**
6. **Copy the token** (you won't see it again!)

### Step 2: Add Token to .env File

Open your `.env` file and add the token:

```env
# Uncomment and add your token here:
SANITY_API_TOKEN=your-token-here
```

Replace `your-token-here` with the actual token you copied.

### Step 3: Update Production URL (Optional)

If you want preview to work on your production Sanity Studio:

1. Open `sanity/plugins/previewPlugin.ts`
2. Find the line with `https://your-production-domain.com`
3. Replace it with your actual domain (e.g., `https://kathgodamtaxi.com`)

### Step 4: Restart Development Server

```bash
npm run dev
```

You're all set!

---

## 🚀 Using Preview Mode

### From Homepage Document

1. Open **Sanity Studio** (http://localhost:3333)
2. Go to **"Home Page"** document
3. Make some changes (don't publish yet)
4. Click the **Preview** button in the top bar
5. A new tab opens showing your homepage with draft changes
6. Notice the yellow banner at the top

### From Route Documents

1. Open any **Route** document (e.g., Kathgodam to Nainital)
2. Make changes to text, images, prices, etc.
3. Click the **Preview** button
4. See your route page with draft changes

### From Package Documents

1. Open any **Package** document
2. Edit package details, images, pricing
3. Click **Preview**
4. View your package page with changes

### From Other Documents

Preview works for these document types:
- **Home Page** - Shows homepage with your changes
- **Routes** - Shows individual route pages
- **Packages** - Shows individual package pages
- **Why Choose Us** - Shows homepage with updated section
- **Corporate Clients** - Shows homepage with updated logos
- **Navbar** - Shows any page with updated navigation
- **Footer** - Shows any page with updated footer
- **Site Settings** - Shows any page with updated settings

---

## 🎨 Preview Mode Features

### Yellow Banner
When in preview mode, you'll see a yellow banner at the top of every page:
- **"Preview Mode Active"** - Confirms you're viewing drafts
- **"Exit Preview"** button - Returns to normal mode
- Banner is fixed at the top and follows as you scroll

### Draft Content
In preview mode, you see:
- ✅ Your unpublished changes (drafts)
- ✅ Existing published content
- ✅ Mix of both - exactly how it will look when published

### Normal Mode
Without preview mode:
- ❌ Only published content is visible
- ❌ Drafts are hidden
- ✅ This is what your visitors see

---

## 🔄 Preview Workflow Example

Let's say you want to update the homepage hero slider:

### Step 1: Edit in Sanity
1. Open **Home Page** in Sanity Studio
2. Scroll to **Hero Slider** section
3. Update slide title: "Explore the Beautiful Kumaon Hills"
4. Upload a new image
5. **Don't click Publish yet!**

### Step 2: Preview Changes
1. Click the **Preview** button (eye icon)
2. New tab opens showing homepage
3. See the yellow preview banner
4. Your new hero slide appears!
5. Check if it looks good

### Step 3: Make Adjustments (if needed)
1. Go back to Sanity Studio tab
2. Make additional tweaks
3. Click **Preview** again to see updates
4. Repeat until satisfied

### Step 4: Publish
1. Happy with the changes?
2. Click **Publish** in Sanity Studio
3. Changes are now live!
4. Preview mode no longer needed for this content

---

## 🔧 Technical Details

### Preview Cookie
- Preview mode sets a secure HTTP-only cookie
- Cookie name: `preview-mode`
- Cookie value: `true`
- Expires after: 1 hour

### API Endpoints

**Enable Preview:**
```
GET /api/preview?secret=<SECRET>&type=<TYPE>&slug=<SLUG>
```

**Exit Preview:**
```
GET /api/exit-preview
```

### Security
- Preview requires a secret key (stored in `.env`)
- Only people with the secret can enable preview mode
- Token is needed to read draft content from Sanity
- Preview cookie is HTTP-only and secure

---

## ⚙️ Configuration

### Environment Variables

```env
# Required for preview mode
SANITY_API_TOKEN=your_viewer_token_here

# Secret for preview URL (change in production!)
PREVIEW_SECRET=preview-secret-kathgodam-taxi-2024
```

### Preview Secret
The `PREVIEW_SECRET` prevents unauthorized preview access:
- **Development:** Use the default secret
- **Production:** Change to a secure random string
- Generate secure secret: Use a password generator with 32+ characters

---

## 🐛 Troubleshooting

### Preview Button Does Nothing
**Issue:** Clicking Preview button doesn't open a new tab

**Solutions:**
1. Check if popup blocker is preventing new tabs
2. Allow popups for Sanity Studio domain
3. Try Ctrl+Click (Cmd+Click on Mac) to force new tab

### "Invalid token" Error
**Issue:** Preview URL shows "Invalid token" message

**Solutions:**
1. Check `.env` file has `PREVIEW_SECRET` set
2. Verify the secret matches in both:
   - `.env` file
   - `sanity/plugins/previewPlugin.ts`
3. Restart dev server after changing `.env`

### Draft Content Not Showing
**Issue:** Preview mode active but not seeing draft changes

**Solutions:**
1. Verify `SANITY_API_TOKEN` is set in `.env`
2. Token needs **Viewer** permissions minimum
3. Check token hasn't expired
4. Restart dev server

### Preview Banner Not Appearing
**Issue:** No yellow banner at top of page

**Solutions:**
1. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. Clear browser cookies
3. Check if preview cookie was set (Browser DevTools → Application → Cookies)

### Images Not Loading
**Issue:** Images appear broken in preview mode

**Solutions:**
1. Ensure Sanity API token has image permissions
2. Check image was actually uploaded (not just a local file)
3. Verify image URL in browser console

---

## 💡 Tips & Best Practices

### 1. Preview Before Publishing
Always preview major changes before publishing to catch issues early.

### 2. Test on Multiple Pages
If you change global elements (navbar, footer), check multiple pages in preview.

### 3. Mobile Preview
After previewing on desktop, resize browser window to check mobile view.

### 4. Share Preview with Team
You can share preview URLs with team members (they need the secret key).

### 5. Exit Preview When Done
Click "Exit Preview" to return to normal mode and see the live site.

### 6. Refresh for Latest Changes
If you make more changes in Sanity, refresh the preview tab to see updates.

---

## 🔐 Security Considerations

### Production Deployment

When deploying to production:

1. **Change the Preview Secret:**
   ```env
   PREVIEW_SECRET=your-super-secure-random-string-here
   ```

2. **Keep Token Secure:**
   - Never commit `.env` to version control
   - Add `.env` to `.gitignore`
   - Use environment variables in hosting platform

3. **Use HTTPS:**
   - Preview cookies are marked `secure` in production
   - Requires HTTPS connection

4. **Limit Access:**
   - Only share preview secret with authorized team members
   - Regenerate secret if compromised

---

## 📱 Preview on Mobile Devices

### Option 1: Browser DevTools
1. Open preview in desktop browser
2. Press F12 to open DevTools
3. Click mobile device toggle (Ctrl+Shift+M)
4. Select device from dropdown

### Option 2: Local Network
1. Find your computer's local IP (ipconfig/ifconfig)
2. Replace `localhost` with your IP in preview URL
3. Open on mobile device connected to same WiFi
4. Example: `http://192.168.1.100:4321/api/preview?...`

---

## 🎯 What Gets Previewed?

| Content Type | What You See in Preview |
|-------------|------------------------|
| **Draft** | ✅ Your unpublished changes |
| **Published** | ✅ Currently live content |
| **Mixed** | ✅ Drafts override published |
| **Deleted (unpublished)** | ❌ Not visible (as expected) |

---

## 📊 Preview Mode vs Published

| Feature | Preview Mode | Published (Normal) |
|---------|-------------|-------------------|
| Draft content | ✅ Visible | ❌ Hidden |
| Published content | ✅ Visible | ✅ Visible |
| CDN caching | ❌ Disabled | ✅ Enabled |
| Load speed | Slower (fresh data) | Faster (cached) |
| Yellow banner | ✅ Shown | ❌ Hidden |
| Who can see | Anyone with secret | Everyone |

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting to Publish
After previewing and being satisfied, don't forget to click **Publish** in Sanity Studio! Preview shows how it will look, but doesn't make it live.

### ❌ Mistake 2: Sharing Production Secret
Never share your production preview secret publicly. Keep it confidential like a password.

### ❌ Mistake 3: Leaving Preview Mode On
Remember to click "Exit Preview" when done. Otherwise, you'll keep seeing drafts instead of live content.

### ❌ Mistake 4: Not Using HTTPS in Production
Preview mode requires HTTPS in production for security. Don't disable it.

---

## 🎓 Advanced Usage

### Custom Preview URLs

You can manually construct preview URLs:

```
http://localhost:4321/api/preview
  ?secret=preview-secret-kathgodam-taxi-2024
  &type=route
  &slug=kathgodam-nainital
```

Parameters:
- `secret` - Your preview secret from `.env`
- `type` - Document type: `route`, `package`, `homePage`
- `slug` - Document slug (for routes and packages)

### Preview Link in Sanity

You could add preview links to your desk structure for quick access.

### Webhook Integration

For advanced setups, you can trigger preview from webhooks or external systems.

---

## 📞 Need Help?

If you encounter issues:

1. Check this guide's troubleshooting section
2. Verify environment variables are set correctly
3. Ensure dev server is running
4. Check browser console for errors
5. Try clearing cookies and cache

---

## 📝 Quick Reference

### Enable Preview
1. Open document in Sanity Studio
2. Make changes (don't publish)
3. Click **Preview** button
4. Review in new tab

### Exit Preview
1. Click **"Exit Preview"** button in yellow banner
2. OR visit: `http://localhost:4321/api/exit-preview`

### Check If Preview is Active
Look for the yellow banner at the top of the page.

---

**Last Updated:** December 2025
**Version:** 1.0

Happy previewing! 🎉
