# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a taxi service website for Kathgodam Taxi, built with **Astro 5**, **Sanity CMS**, and **Tailwind CSS 4**. The site provides information about taxi routes, tour packages, and allows users to book taxi services in the Kumaon Hills region of Uttarakhand, India.

**Key Technologies:**
- **Astro 5.15+** - Static site generator with server-side rendering capabilities
- **Sanity CMS** - Headless CMS for content management (Project ID: 2o6xnbku)
- **Tailwind CSS 4** - Utility-first CSS framework (integrated via Vite plugin)
- **React 19** - For interactive components (via @astrojs/react)
- **TypeScript** - Type-safe development

## Development Commands

### Local Development
```bash
npm run dev              # Start dev server at http://localhost:4321
```

### Build & Preview
```bash
npm run build            # Build for production (outputs to ./dist)
npm run preview          # Preview production build locally
```

### Sanity Studio
The Sanity Studio CMS is accessible at:
- **Development**: `http://localhost:4321/studio`
- **Production**: `https://your-domain.com/studio`

Configured in `astro.config.mjs` with `studioBasePath: '/studio'`.

## Architecture

### Content Management with Sanity CMS

All website content is managed through Sanity CMS. The CMS integration follows this pattern:

1. **Schema Definition** (`sanity/schemas/`):
   - `route.ts` - Individual taxi routes (e.g., Kathgodam to Nainital)
   - `package.ts` - Tour packages (multi-day trips)
   - `homePage.ts` - Homepage content and hero slides
   - `ratesPage.ts` - Rates page with categorized routes
   - `navbar.ts` / `footer.ts` - Global navigation elements
   - `siteSettings.ts` - Site-wide settings (phone, WhatsApp, etc.)
   - Object schemas: `carType.ts`, `attraction.ts`, `faq.ts`, `heroSlide.ts`, etc.

2. **Client Configuration** (`src/lib/sanity.ts`):
   - Exports `client` (CDN-cached) and `previewClient` (real-time drafts)
   - `getClient(preview)` - Returns appropriate client based on preview mode
   - `urlFor()` - Image URL builder for Sanity images
   - Helper functions for fetching routes, packages, and content:
     - `getAllRoutes()` / `getRouteBySlug(slug)`
     - `getAllPackages()` / `getPackageBySlug(slug)`
     - `getHomePage(preview)` / `getRatesPage(preview)`
     - `getNavbar(preview)` / `getFooter(preview)`
     - `getSiteSettings()` / `getWhyChooseUs(preview)` / `getCorporateClients(preview)`

3. **Environment Variables**:
   - `PUBLIC_SANITY_PROJECT_ID` - Sanity project ID (public, accessible in client)
   - `PUBLIC_SANITY_DATASET` - Dataset name (usually "production")
   - `PUBLIC_SANITY_API_VERSION` - API version (e.g., "2024-01-01")
   - `SANITY_API_TOKEN` - Write token for preview mode and migrations (private)

### Page Generation Strategy

The site uses a **hybrid rendering approach**:

1. **Static Pages** (Pre-rendered at build time):
   - Most route pages via `[slug].astro` dynamic route
   - Package pages also via `[slug].astro`
   - Uses `getStaticPaths()` to generate all routes/packages at build time

2. **Server-Rendered Pages** (On-demand):
   - Homepage (`index.astro`) - Has `export const prerender = false` to support preview mode
   - Preview mode is enabled via a cookie: `preview-mode=true`

3. **Dynamic Route** (`src/pages/[slug].astro`):
   - Handles both routes and packages through a single dynamic page
   - Fetches all slugs from Sanity at build time
   - Props include `type: 'route' | 'package'` to determine content type
   - Renders appropriate layout based on content type

### Component Structure

Components are organized by purpose:

**Layout Components:**
- `src/layouts/RoutePageLayout.astro` - Template for route pages with pricing tables, attractions, FAQs

**Global Components:**
- `Navbar.astro` / `Footer.astro` - Site navigation (content from Sanity)
- `PreviewBanner.astro` - Shows when in preview mode

**Homepage Components:**
- `HeroSlider.astro` - Main hero carousel
- `PopularRoutes.astro` - Featured routes grid
- `TourPackagesGrid.astro` - Tour packages display
- `WhyChooseUs.astro` - Feature highlights
- `TestimonialsSection.astro` - Customer testimonials
- `CorporateClients.astro` - Client logos
- `TrustSignals.astro` - Trust badges/statistics

**Route Page Components:**
- `RouteHeroSlider.astro` - Image carousel for route pages
- `RoutePricingTable.astro` - Car types and pricing table
- `AttractionsGrid.astro` - Tourist attractions grid
- `RouteFAQ.astro` - Frequently asked questions
- `StickyBookingSidebar.astro` - Floating booking CTA
- `CategoryJumpNav.astro` - Navigation for route categories
- `RouteCategorySection.astro` - Grouped routes by category

**Shared Components:**
- `RouteCard.astro` / `TourCard.astro` - Card displays for routes/packages
- `TestimonialCard.astro` - Individual testimonial card

### Styling Architecture

**Tailwind CSS 4 via Vite Plugin:**
- Configured in `astro.config.mjs` with `@tailwindcss/vite`
- CSS imported in `src/styles/global.css`
- Uses `@theme` directive for custom design tokens
- **NO separate tailwind.config.js file** - configuration is in CSS via `@theme`

**Color Theme:**
- Primary: Mustard Yellow (#f59e0b) - Taxi branding
- Secondary: Black/Gray scale - Professional contrast
- Accent: WhatsApp Green (#25d366) - CTA elements
- Font: Poppins (Google Fonts)

**Custom CSS Variables:**
```css
--color-mustard: #f59e0b
--color-black: #000000
--color-accent: #25d366
```

### TypeScript Types

Type definitions are in `src/types/`:
- `route.ts` - Route, CarType, Attraction, FAQ, StayPackage, TourPackage interfaces
- `package.ts` - Package-specific types
- `ratesPage.ts` - Rates page structure

All Sanity data should be typed using these interfaces.

### Preview Mode

Preview mode allows content editors to see draft changes before publishing:

1. **Enable Preview**: Set `preview-mode=true` cookie
2. **Client Switching**: `getClient(preview)` returns `previewClient` when enabled
3. **Preview Client**: Uses `perspective: 'drafts'` to fetch unpublished content
4. **UI Indicator**: `PreviewBanner.astro` shows at top when in preview mode
5. **Server Rendering Required**: Pages supporting preview must use `export const prerender = false`

## Common Development Patterns

### Adding a New Route Page

1. Create route schema entry in Sanity Studio
2. The route will automatically appear via `[slug].astro` dynamic routing
3. No code changes needed - content is fully CMS-driven

### Adding a New Component

1. Create `.astro` file in `src/components/`
2. Import and use Sanity client for data: `import { client } from '../lib/sanity'`
3. Use `urlFor()` helper for Sanity images
4. Style with Tailwind utility classes

### Working with Sanity Images

```typescript
import { urlFor } from '../lib/sanity';

// In component
const imageUrl = urlFor(sanityImageObject)
  .width(800)
  .height(600)
  .url();
```

### Fetching Sanity Data in Pages

```typescript
import { getRouteBySlug, urlFor } from '../lib/sanity';

const route = await getRouteBySlug(slug);
const heroImage = route.heroSlides?.[0]?.image
  ? urlFor(route.heroSlides[0].image).url()
  : '';
```

### Adding New Sanity Schema

1. Create schema file in `sanity/schemas/your-schema.ts`
2. Export the schema definition
3. Import and add to `sanity/schemas/index.ts` in the `schemaTypes` array
4. Changes appear in Studio after restart

## Important Conventions

### Contact Information
- **Phone**: Stored in Sanity `siteSettings.phone` (default: 7351721351)
- **WhatsApp**: Stored in Sanity `siteSettings.whatsappNumber` (default: 917351721351)
- **Email**: Stored in Sanity `siteSettings.email`

Always fetch these from `getSiteSettings()` rather than hardcoding.

### Route vs Package Content Types
- **Routes**: Point-to-point taxi services (e.g., "Kathgodam to Nainital")
- **Packages**: Multi-day tour packages with itineraries

Both use the same `[slug].astro` page but render different layouts based on the `type` prop.

### Preview vs Production
- Always support preview mode in CMS-driven pages by accepting a `preview` parameter
- Use `getClient(preview)` to fetch appropriate content
- Check for preview cookie: `Astro.cookies.get('preview-mode')?.value === 'true'`

### Seasonal Pricing
Many routes have seasonal pricing (peak tourist season vs off-season):
- `carType.seasonPrice` - Peak season (March-June, September-November)
- `carType.offSeasonPrice` - Off season (Monsoon, Winter)

## Git & Deployment

Current branch: `master` (main branch for PRs)

**Untracked Files** (as of last init):
- New contact page components and schema files
- New rates page components and schema files
- `CONTACT_PAGE_SETUP.md` documentation

The site migrated from WordPress to this modern Astro + Sanity stack for better performance, SEO, and maintainability.

## Troubleshooting

### Sanity Connection Issues
- Verify `PUBLIC_SANITY_PROJECT_ID` matches project ID in Sanity dashboard
- Check dataset name (usually "production")
- Ensure API version is set correctly
- For preview mode, verify `SANITY_API_TOKEN` has read permissions

### Build Failures
- Clear `.astro` cache: Delete `.astro/` directory
- Verify all Sanity queries return expected data structure
- Check for missing required fields in Sanity documents

### Image Issues
- Use `urlFor()` helper for all Sanity images
- Sanity images need to be built at runtime: `urlFor(image).url()`
- For responsive images, chain width/height: `urlFor(image).width(800).url()`

### Type Errors
- Ensure TypeScript types in `src/types/` match Sanity schema structure
- Use optional chaining (`?.`) when accessing nested Sanity data
- Check that all required fields in schemas have corresponding TypeScript properties
