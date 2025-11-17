# Route Pages Template System

## 🎯 Overview

This project uses a **template-first approach** with **Sanity CMS** for managing 30+ route pages. Each route page is dynamically generated from Sanity data using a reusable template.

## 📁 Project Structure

```
kathgodam-taxi-website/
├── src/
│   ├── layouts/
│   │   └── RoutePageLayout.astro      # ✨ Reusable route page template
│   ├── pages/
│   │   ├── routes/
│   │   │   ├── [slug].astro           # 🔄 Dynamic route pages
│   │   │   └── index.astro            # 📋 All routes listing
│   │   └── kathgodam-nainital.astro   # 📄 Static example (for reference)
│   ├── lib/
│   │   └── sanity.ts                  # 🔧 Sanity client & helpers
│   └── types/
│       └── route.ts                   # 📝 TypeScript types
├── sanity/
│   └── schemas/
│       ├── route.ts                   # 📄 Main route schema
│       ├── carType.ts                 # 🚗 Car type object
│       ├── attraction.ts              # 🏔️ Attraction object
│       ├── faq.ts                     # ❓ FAQ object
│       ├── stayPackage.ts             # 🏨 Stay package object
│       ├── tourPackage.ts             # 🎒 Tour package object
│       └── index.ts                   # 📦 Schema exports
├── scripts/
│   └── migrate-route.js               # 🔄 Migration helper
├── sanity.config.ts                   # ⚙️ Sanity configuration
├── astro.config.mjs                   # ⚙️ Astro configuration
├── .env.example                       # 📝 Environment variables template
├── SANITY_SETUP.md                    # 📚 Detailed setup guide
└── README_ROUTES.md                   # 📖 This file
```

## 🚀 Quick Start

### 1. Set Up Sanity

```bash
# Copy environment variables
cp .env.example .env

# Edit .env and add your Sanity credentials
# Get them from https://www.sanity.io/manage
```

### 2. Deploy Schema to Sanity

```bash
npx sanity deploy
```

### 3. Start Development Server

```bash
npm install
npm run dev
```

### 4. Access Sanity Studio

Visit: `http://localhost:4321/studio`

### 5. Create Your First Route

1. Click "Route" in Studio sidebar
2. Click "+ Create"
3. Fill in all fields
4. Set "Published" to true
5. Click "Publish"

Your route is now live at: `/routes/[your-slug]`

## 📝 Creating New Routes

### Method 1: Via Sanity Studio (Recommended)

Perfect for adding routes one at a time with a visual interface.

1. Go to `/studio`
2. Create new route
3. Fill in all data
4. Upload images
5. Publish

### Method 2: Via Migration Script

Perfect for bulk importing routes.

1. Edit `scripts/migrate-route.js`
2. Customize the `routeData` object
3. Run: `node scripts/migrate-route.js`

See `SANITY_SETUP.md` for detailed instructions.

## 🏗️ How It Works

### Template System

```
RoutePageLayout.astro (Template)
    ↓
Receives props (data)
    ↓
Renders complete page
```

### Data Flow

```
Sanity CMS (Content)
    ↓
GROQ Query (Fetch)
    ↓
[slug].astro (Transform)
    ↓
RoutePageLayout (Render)
    ↓
Final Route Page
```

### Example Usage

```astro
---
// src/pages/routes/[slug].astro
import RoutePageLayout from '../../layouts/RoutePageLayout.astro';
import { getRouteBySlug } from '../../lib/sanity';

const route = await getRouteBySlug(slug);
---

<RoutePageLayout
  routeData={{ from, to, distance, duration, ... }}
  carTypes={[...]}
  attractions={[...]}
  faqs={[...]}
  pageContent={{ title, description, ... }}
  packages={{ stayPackages, tourPackages }}
/>
```

## 📊 Data Structure

Each route contains:

- ✅ Basic route info (from, to, distance, duration, price)
- ✅ SEO metadata (title, description, keywords)
- ✅ Introduction text
- ✅ Car types with pricing
- ✅ Attractions with images
- ✅ FAQs
- ✅ Optional stay packages
- ✅ Optional tour packages

See `src/types/route.ts` for full TypeScript interface.

## 🎨 Customizing Templates

### Update All Routes

Modify `src/layouts/RoutePageLayout.astro` and all routes will update automatically!

### Update Single Route

Edit the route data in Sanity Studio.

### Add New Sections

1. Update `RoutePageLayout.astro` to add new section
2. Update `sanity/schemas/route.ts` to add new fields
3. Redeploy schema: `npx sanity deploy`
4. Add data via Studio

## 🔍 Available Pages

- **Dynamic Routes**: `/routes/[slug]` - All routes from Sanity
- **Routes Index**: `/routes` - List of all available routes
- **Static Example**: `/kathgodam-nainital` - Original static version (for reference)
- **Sanity Studio**: `/studio` - Content management

## 📚 Documentation

- **SANITY_SETUP.md** - Complete setup guide with screenshots
- **README_ROUTES.md** - This file (quick reference)
- **src/types/route.ts** - TypeScript interfaces
- **sanity/schemas/** - Schema documentation

## 🛠️ Common Tasks

### Add a New Route

```bash
# Via Studio
Visit /studio → Create Route

# Via Script
node scripts/migrate-route.js
```

### Update Existing Route

```bash
Visit /studio → Find route → Edit → Publish
```

### Change Template Design

```bash
Edit src/layouts/RoutePageLayout.astro
```

### Add New Field to All Routes

```bash
1. Edit sanity/schemas/route.ts
2. Run: npx sanity deploy
3. Update RoutePageLayout.astro
4. Update [slug].astro
```

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

### Deploy

The site will statically generate all route pages at build time.

Sanity Studio will be available at `/studio` on your production domain.

## 💡 Tips for 30+ Routes

1. **Reuse data** - Copy similar routes and modify
2. **Batch by region** - Add routes from the same starting point together
3. **Use templates** - Create a base FAQ set to reuse
4. **Optimize images** - Upload once, reuse across similar routes
5. **Set defaults** - Configure default car types and packages

## 🔗 Related Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Astro Documentation](https://docs.astro.build)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

## 🎯 Next Steps

1. ✅ Complete Sanity setup (see SANITY_SETUP.md)
2. ✅ Create first route via Studio
3. ✅ Test the route page
4. ✅ Migrate remaining routes
5. ✅ Update homepage to link to /routes
6. ✅ Deploy to production

---

**Need help?** See `SANITY_SETUP.md` for detailed instructions!
