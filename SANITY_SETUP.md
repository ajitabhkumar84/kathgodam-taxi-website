# Sanity CMS Setup Guide for Route Pages

This guide explains how to use Sanity CMS to manage your route pages for the Kathgodam Taxi website.

## 📋 Table of Contents

1. [Initial Setup](#initial-setup)
2. [Creating Your First Route](#creating-your-first-route)
3. [Understanding the Data Structure](#understanding-the-data-structure)
4. [Accessing Sanity Studio](#accessing-sanity-studio)
5. [Workflow](#workflow)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Initial Setup

### Step 1: Create a Sanity Account

1. Go to [https://www.sanity.io/](https://www.sanity.io/)
2. Sign up for a free account
3. Create a new project

### Step 2: Get Your Project Credentials

After creating your project:

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Copy your **Project ID** and **Dataset** name (usually "production")

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Sanity credentials:
   ```env
   PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   PUBLIC_SANITY_DATASET=production
   PUBLIC_SANITY_API_VERSION=2024-01-01
   ```

### Step 4: Deploy Sanity Schema

Run the following command to deploy your schema to Sanity:

```bash
npx sanity deploy
```

This will upload your content schemas (route, carType, attraction, FAQ, etc.) to your Sanity project.

---

## 📝 Creating Your First Route

### Option 1: Via Sanity Studio (Recommended)

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:4321/studio` in your browser

3. Click on "Route" in the left sidebar

4. Click "+ Create new Route"

5. Fill in all the required fields:
   - **From Location**: e.g., "Kathgodam"
   - **To Location**: e.g., "Nainital"
   - **Slug**: Auto-generated (e.g., kathgodam-nainital)
   - **Distance**: e.g., "34 KM"
   - **Journey Duration**: e.g., "1 Hour"
   - **Starting Price**: e.g., "₹1,100"
   - **Page Title**: SEO title
   - **Meta Description**: SEO description
   - **Introduction Paragraphs**: Route description
   - **Car Types**: Add car options with pricing
   - **Attractions**: Add tourist attractions
   - **FAQs**: Add frequently asked questions
   - **Packages** (optional): Add stay/tour packages
   - **Published**: Set to `true` to make it live

6. Click "Publish"

Your route will now be available at `/routes/[slug]`

### Option 2: Via API/Import

You can also bulk import routes from your existing data. See the migration section below.

---

## 🏗️ Understanding the Data Structure

### Route Document

```typescript
{
  from: string              // Starting location
  to: string                // Destination
  slug: string              // URL slug (auto-generated)
  distance: string          // e.g., "34 KM"
  duration: string          // e.g., "1 Hour"
  startingPrice: string     // e.g., "₹1,100"
  pageTitle: string         // SEO title
  metaDescription: string   // SEO description
  keywords: string          // SEO keywords
  introText1: string        // First intro paragraph
  introText2: string        // Second intro paragraph
  attractionsTitle: string  // Optional custom title
  carTypes: CarType[]       // Array of car options
  attractions: Attraction[] // Array of attractions
  faqs: FAQ[]              // Array of FAQs
  stayPackages: Package[]   // Optional stay packages
  tourPackages: Package[]   // Optional tour packages
  published: boolean        // Publish status
}
```

### CarType Object

```typescript
{
  name: string              // e.g., "Hatchback"
  model: string             // e.g., "Alto / Alto K10"
  capacity: string          // e.g., "Up to 4 passengers"
  seasonPrice: string       // e.g., "₹1,300"
  offSeasonPrice: string    // e.g., "₹1,100"
  image: SanityImage        // Car image
  features: string[]        // Array of features
}
```

### Attraction Object

```typescript
{
  name: string              // Attraction name
  description: string       // Description
  image: SanityImage        // Attraction image
  highlights: string[]      // Array of highlights
}
```

---

## 🎨 Accessing Sanity Studio

### Local Development

When running `npm run dev`, Sanity Studio is available at:
```
http://localhost:4321/studio
```

### Production

After deploying your Astro site, Sanity Studio will be available at:
```
https://yourdomain.com/studio
```

You can also deploy a standalone Sanity Studio:
```bash
npx sanity deploy
```

This gives you a dedicated URL like: `https://your-project.sanity.studio`

---

## 🔄 Workflow

### Adding a New Route (30+ Routes)

1. **Prepare Your Data**
   - Gather route information (distance, duration, pricing)
   - Collect car type information
   - Gather attraction details
   - Write FAQs

2. **Access Sanity Studio**
   - Go to `/studio`
   - Click "Route" → "Create"

3. **Fill in Basic Information**
   - From/To locations
   - Distance and duration
   - Starting price
   - SEO information

4. **Add Car Types**
   - Click "Add item" under Car Types
   - Fill in name, model, capacity
   - Set season and off-season prices
   - Upload car image
   - Add features

5. **Add Attractions** (if applicable)
   - Click "Add item" under Attractions
   - Fill in name and description
   - Upload attraction image
   - Add highlights

6. **Add FAQs**
   - Click "Add item" under FAQs
   - Add question and answer

7. **Add Packages** (optional)
   - Add stay packages if available
   - Add tour packages if available

8. **Publish**
   - Set "Published" to true
   - Click "Publish"

9. **Verify**
   - Visit `/routes/[your-slug]` to see the live page
   - Check `/routes` to see all routes

### Editing an Existing Route

1. Go to `/studio`
2. Click "Route" in sidebar
3. Find and click the route you want to edit
4. Make your changes
5. Click "Publish"

### Bulk Operations

For bulk operations (adding 30+ routes):

1. **Option A**: Use the Sanity Studio interface
   - Fastest for <10 routes
   - Click-based interface

2. **Option B**: Use the Sanity CLI for import
   ```bash
   # Export current kathgodam-nainital data
   # Transform to Sanity format
   # Use sanity dataset import
   ```

3. **Option C**: Use the Sanity API
   - Write a script to import routes
   - Best for 30+ routes
   - See example below

---

## 📤 Migrating Existing Data

To migrate your kathgodam-nainital route data to Sanity:

### Option 1: Manual (Recommended for First Route)

1. Copy the data from `src/pages/kathgodam-nainital.astro`
2. Go to `/studio`
3. Create new route
4. Paste data into corresponding fields
5. Upload images to Sanity (replace external URLs)
6. Publish

### Option 2: Automated Import Script

Create a file `scripts/import-routes.js`:

```javascript
import { client } from './src/lib/sanity';

const routeData = {
  _type: 'route',
  from: 'Kathgodam',
  to: 'Nainital',
  slug: { current: 'kathgodam-nainital' },
  distance: '34 KM',
  duration: '1 Hour',
  startingPrice: '₹1,100',
  // ... rest of your data
  published: true
};

client.create(routeData)
  .then(res => console.log('Route created:', res))
  .catch(err => console.error('Error:', err));
```

Run with:
```bash
node scripts/import-routes.js
```

---

## 🔍 Troubleshooting

### Studio not loading

- Check that `PUBLIC_SANITY_PROJECT_ID` is set in `.env`
- Verify your project ID is correct
- Run `npx sanity deploy` to deploy schema

### Images not showing

- Make sure you uploaded images to Sanity (not external URLs)
- Check that `urlFor()` helper is used correctly
- Verify image field is not empty

### Route not appearing on website

- Check that `published` is set to `true`
- Verify slug is correct
- Check browser console for errors
- Rebuild the site: `npm run build`

### "Project not found" error

- Double-check `PUBLIC_SANITY_PROJECT_ID` in `.env`
- Ensure `.env` is in the root directory
- Restart development server after changing `.env`

---

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Astro + Sanity Guide](https://docs.astro.build/en/guides/cms/sanity/)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)

---

## 🎯 Next Steps

1. ✅ Set up Sanity account and get credentials
2. ✅ Configure `.env` file
3. ✅ Deploy schema: `npx sanity deploy`
4. ✅ Access studio at `/studio`
5. ✅ Create your first route
6. ✅ Migrate remaining 30+ routes
7. ✅ Update homepage to link to `/routes`
8. ✅ Test all routes
9. ✅ Deploy to production

---

## 💡 Tips for Managing 30+ Routes

1. **Use Consistent Naming**
   - Keep location names consistent
   - Use standard format for slugs

2. **Reuse Data**
   - Create a base template for similar routes
   - Copy and modify existing routes

3. **Batch by Region**
   - Group routes by starting location
   - Add them in batches

4. **Use Images Wisely**
   - Optimize images before upload
   - Reuse generic car images across routes
   - Use high-quality attraction images

5. **Set Defaults**
   - Create standard FAQ answers
   - Reuse common car types
   - Template intro text

Good luck with your Sanity CMS setup! 🚀
