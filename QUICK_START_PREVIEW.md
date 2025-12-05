# Quick Start - Preview Mode Testing

## ✅ Fix Applied!

The Sanity Studio crash has been fixed. The preview plugin is now working correctly.

---

## 🚀 Test the Fix (5 Minutes)

### Step 1: Start Sanity Studio

Open a **new terminal** and run:

```bash
cd "G:\website development\KathgodamTaxi\kathgodam-taxi"
npx sanity dev
```

This should start Sanity Studio on **http://localhost:3333**

### Step 2: Verify Sanity Studio Loads

1. Open browser: **http://localhost:3333**
2. Studio should load without errors
3. You should see "Kathgodam Taxi Website" in the header

### Step 3: Test Preview Button (Without Token)

1. Click on **"Home Page"** in the left sidebar
2. Look at the top toolbar
3. You should see a **"Preview"** button with an eye icon
4. Click it - a new tab will open (you'll get an error for now, that's expected)

✅ **If you see the Preview button, the fix worked!**

---

## 📝 Enable Full Preview Functionality

To make preview actually work, you need a Sanity API token:

### Get API Token (2 minutes)

1. Visit: https://www.sanity.io/manage/project/2o6xnbku/api
2. Click **"Add API token"**
3. Settings:
   - Name: `Preview Token`
   - Permissions: **Viewer** (or higher)
4. Click **"Add token"**
5. **Copy the token** (you won't see it again!)

### Add Token to .env

Open `.env` file and add:

```env
SANITY_API_TOKEN=your-copied-token-here
```

Save the file.

### Restart Astro Dev Server

In the terminal where `npm run dev` is running:
1. Press `Ctrl+C` to stop
2. Run `npm run dev` again

---

## ✨ Test Full Preview

1. In Sanity Studio (http://localhost:3333)
2. Open **"Home Page"**
3. Make a small change (e.g., edit hero title)
4. **DON'T publish yet!**
5. Click **"Preview"** button
6. New tab opens at http://localhost:4321
7. You should see:
   - ✅ Yellow banner at top: "Preview Mode Active"
   - ✅ Your draft changes visible
   - ✅ "Exit Preview" button

### Success! 🎉

If you see the yellow banner and your changes, preview mode is working perfectly!

---

## 🔄 Quick Workflow

```
Edit in Sanity → Preview → Adjust → Preview Again → Publish
```

1. Make changes in Sanity (don't publish)
2. Click Preview to see how it looks
3. Go back and make adjustments
4. Click Preview again
5. When happy, click Publish

---

## 🐛 Troubleshooting

### "Preview button not showing"
- Hard refresh: `Ctrl+Shift+R`
- Clear browser cache
- Restart Sanity Studio

### "Invalid token" error when clicking Preview
- Check `PREVIEW_SECRET` in `.env` file
- Ensure both Astro dev server and Sanity Studio are running

### "Draft content not showing"
- Verify `SANITY_API_TOKEN` is in `.env`
- Restart Astro dev server after adding token
- Token needs "Viewer" permissions minimum

---

## 📖 Full Documentation

For complete details, see:
- **PREVIEW_MODE_GUIDE.md** - Complete usage guide
- **PREVIEW_IMPLEMENTATION_SUMMARY.md** - Technical details

---

## ✅ Status Checklist

Mark off as you complete:

- [ ] Astro dev server running (http://localhost:4321)
- [ ] Sanity Studio running (http://localhost:3333)
- [ ] Studio loads without errors
- [ ] Preview button visible in documents
- [ ] API token obtained from Sanity
- [ ] Token added to `.env` file
- [ ] Dev server restarted
- [ ] Preview opens new tab
- [ ] Yellow banner appears
- [ ] Draft changes visible in preview

---

**Next:** Once preview is working, see **IMAGE_UPLOAD_GUIDE.md** to start uploading images!

**Last Updated:** December 2025
