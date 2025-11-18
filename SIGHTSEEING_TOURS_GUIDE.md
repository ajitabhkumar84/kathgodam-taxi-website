# Sightseeing Tours Template - Complete Guide

## Overview

This guide explains the newly redesigned **Single-Day Sightseeing Tour Template** for the Kathgodam Taxi website. The template has been designed to replace the basic point-to-point taxi service pages with comprehensive, engaging day tour packages.

## 🎯 What Changed?

### Previous Structure (Kainchi Dham Package)
- Basic route-based page (point A to point B)
- Limited to taxi pricing and car types
- Minimal tour information
- No detailed itinerary or timeline

### New Template Features
✨ **Comprehensive single-day sightseeing template** with:
- Full-screen hero slider with tour images
- Detailed hour-by-hour itinerary
- Places covered with descriptions and images
- What's included/excluded clearly displayed
- Things to carry and important information
- Vehicle pricing options with features
- Related tours recommendations
- Professional, engaging design consistent with site theme

---

## 📁 File Structure

```
src/
├── layouts/
│   └── SightseeingTourLayout.astro       # Main layout component
├── pages/
│   └── sightseeing/
│       ├── index.astro                   # Listing page for all tours
│       └── [slug].astro                  # Dynamic page for individual tours
├── types/
│   └── sightseeingTour.ts                # TypeScript type definitions
└── lib/
    └── sanity.ts                         # Sanity CMS functions (updated)

sanity/
└── schemas/
    ├── sightseeingTour.ts                # Sanity schema for tours
    └── index.ts                          # Schema registry (updated)
```

---

## 🎨 Page Sections (in order)

### 1. Hero Section
- Full-screen image slider (3-5 images recommended)
- Tour name, duration, distance, difficulty
- Starting price
- Quick booking CTAs
- Tour type badge (Full Day / Half Day)

### 2. Tour Overview
- Detailed description
- Tour highlights (bullet points)
- Quick information sidebar with:
  - Duration
  - Best time to visit
  - Pickup location
  - Drop-off location

### 3. Detailed Itinerary
- Hour-by-hour timeline
- Each entry includes:
  - Time (e.g., 08:00 AM)
  - Activity title
  - Description
  - Duration
  - Optional image

### 4. Places Covered
- Grid of destinations visited
- Each place includes:
  - Name and description
  - Time spent at location
  - Highlights (bullet points)
  - Featured image

### 5. Pricing Section
- Multiple vehicle options
- Each vehicle shows:
  - Type, model, capacity
  - Price
  - Features
  - Vehicle image

### 6. What's Included/Excluded
- Two-column layout
- Clear visual distinction (green ✓ / red ✗)
- Transparent about what's covered

### 7. Important Information
- Things to carry
- Important notes/restrictions
- Weather information
- Accessibility details

### 8. Related Tours
- Suggestions for similar tours
- Quick view cards with images
- Links to other tour pages

### 9. FAQs & Route Map
- Side-by-side layout
- Expandable FAQ items
- Interactive Google Maps embed

### 10. Final CTA
- Multiple booking options (WhatsApp, Phone, Contact Form)
- Trust signals
- Prominent call-to-action

---

## 🚀 How to Add a New Sightseeing Tour

### Step 1: Access Sanity Studio
Navigate to your Sanity Studio (usually at `/studio` or your Sanity dashboard URL).

### Step 2: Create New Sightseeing Tour
1. Click on **"Sightseeing Tour"** in the content menu
2. Click **"Create new"**
3. Fill in all required fields:

#### Basic Information
- **Tour Name**: e.g., "Kainchi Dham Day Tour"
- **Slug**: Auto-generated from name (e.g., `kainchi-dham-day-tour`)
- **Tour Type**: Full Day or Half Day
- **Duration**: e.g., "8-9 Hours"
- **Distance**: e.g., "120 KM Round Trip"
- **Difficulty**: Easy / Moderate / Challenging
- **Starting Price**: e.g., "₹2,500"
- **Best Time**: e.g., "October to June"
- **Pickup Location**: e.g., "Kathgodam Railway Station"
- **Drop Location**: e.g., "Same as pickup"

#### Hero Slides (1-5 images)
Upload 2-5 high-quality images of the tour destinations.
- Recommended size: 1920x1080px
- Use scenic, attractive photos
- Add captions (optional)

#### Overview
- **Description**: Write 2-3 paragraphs about the tour
- **Highlights**: Add 4-8 key selling points

#### Itinerary (minimum 3 items)
For each stop/activity:
- **Time**: e.g., "09:00 AM"
- **Title**: e.g., "Visit Kainchi Dham Temple"
- **Description**: Brief description of the activity
- **Duration**: e.g., "2 hours"
- **Image**: Optional photo of the location

#### Places Covered (minimum 2)
For each destination:
- **Name**: e.g., "Kainchi Dham"
- **Description**: About the place
- **Time Spent**: e.g., "1-2 hours"
- **Image**: Featured photo
- **Highlights**: Key features (optional)

#### Pricing (minimum 1 vehicle)
Add vehicle options:
- **Vehicle Type**: e.g., "Sedan"
- **Model**: e.g., "Swift Dzire"
- **Capacity**: e.g., "4 passengers"
- **Price**: e.g., "₹2,500"
- **Features**: List 3-6 features
- **Image**: Vehicle photo

#### Inclusions & Exclusions
- **What's Included**: List all included services
  - Example: "Fuel charges", "Driver allowance", "All tolls and parking"
- **What's Not Included**: Be clear about exclusions
  - Example: "Entry tickets", "Meals", "Personal expenses"

#### Additional Information (Optional)
- **Things to Carry**: Items guests should bring
- **Important Info**: Rules, restrictions, guidelines

#### FAQs
Add common questions and answers about the tour.

#### Related Tours (Optional)
Link to similar tours for cross-promotion.

#### Map & Weather
- **Map Embed URL**: Google Maps embed URL for the route
- **Weather Coordinates**: Latitude and longitude for weather widget

#### SEO
- **Page Title**: SEO-optimized title (max 60 chars)
- **Meta Description**: Brief description (max 160 chars)
- **Keywords**: Comma-separated keywords

### Step 3: Publish
Toggle **"Published"** to `true` to make the tour visible on the website.

---

## 🎯 Example: Kainchi Dham Tour

Here's a sample structure for the Kainchi Dham Day Tour:

### Basic Info
```
Name: Kainchi Dham Day Tour from Nainital
Slug: kainchi-dham-day-tour
Type: Full Day
Duration: 8-9 Hours
Distance: 120 KM Round Trip
Difficulty: Easy
Price: ₹2,500
Best Time: October to June
Pickup: Kathgodam / Nainital Hotels
Drop: Same as pickup
```

### Sample Itinerary
```
08:00 AM - Pickup from Hotel
- Comfortable pickup from your hotel in Nainital
- Duration: 30 mins

09:00 AM - Visit Kainchi Dham Temple
- Explore the famous Neem Karoli Baba ashram
- Duration: 2 hours

11:30 AM - Bhowali Market Visit
- Shop for local fruits and handicrafts
- Duration: 1 hour

12:30 PM - Lunch Break
- Enjoy local Kumaoni cuisine (own expense)
- Duration: 1 hour

02:00 PM - Scenic Drive
- Enjoy beautiful mountain views
- Duration: 1 hour

03:00 PM - Return to Hotel
- Comfortable drop-off at your hotel
- Duration: Depends on location
```

### Sample Inclusions
```
✓ Fuel charges
✓ Driver allowance
✓ All tolls and parking fees
✓ Experienced local driver
✓ Clean and sanitized vehicle
✓ Pickup and drop-off

✗ Temple entry donations
✗ Meals and refreshments
✗ Personal expenses
✗ Any additional sightseeing not mentioned
```

---

## 🎨 Design Guidelines

### Colors (Consistent with Site Theme)
- **Primary**: Mustard Yellow (#f59e0b)
- **Secondary**: Black (#000000)
- **Accent**: WhatsApp Green (#25d366)

### Images
- Hero images: 1920x1080px minimum
- Place images: 800x600px minimum
- Vehicle images: 800x600px
- Use high-quality, professional photos
- Ensure good lighting and composition

### Content Guidelines
- Write in friendly, inviting tone
- Be specific about timings and locations
- Clearly state what's included/excluded
- Use bullet points for easy reading
- Keep paragraphs short (2-3 sentences)

---

## 🔧 Technical Details

### Routes
- **All Tours**: `/sightseeing/`
- **Individual Tour**: `/sightseeing/[slug]/`

### Data Flow
1. Content created in Sanity CMS
2. Data fetched via `getSightseeingTourBySlug()`
3. Transformed in `/pages/sightseeing/[slug].astro`
4. Rendered by `SightseeingTourLayout.astro`

### Static Site Generation
Tours are pre-rendered at build time using `getStaticPaths()`.

---

## 📱 Responsive Design

The template is fully responsive:
- **Mobile**: Stacked layout, touch-friendly CTAs
- **Tablet**: Optimized grid layouts
- **Desktop**: Multi-column layouts, sticky sidebar

---

## ✅ SEO Optimization

Each tour page includes:
- Unique meta title and description
- Structured heading hierarchy (H1, H2, H3)
- Image alt tags
- Open Graph tags
- Keyword optimization
- Clean URL structure

---

## 🚦 Testing Checklist

Before publishing a new tour:
- [ ] All images uploaded and optimized
- [ ] Hero slider working (2-5 images)
- [ ] Itinerary has at least 3 items
- [ ] Places covered section populated
- [ ] At least one vehicle pricing option
- [ ] Inclusions/exclusions clearly stated
- [ ] FAQs added (at least 3-5)
- [ ] SEO fields completed
- [ ] Map embed URL added
- [ ] Published toggle set to `true`
- [ ] Preview on mobile and desktop
- [ ] All CTAs working (WhatsApp, Phone, Contact)

---

## 🎓 Tips for Success

1. **Use Real Photos**: Avoid stock images; use actual tour destination photos
2. **Be Specific**: Provide exact timings, locations, and prices
3. **Tell a Story**: Make the itinerary flow like a journey
4. **Highlight Uniqueness**: What makes this tour special?
5. **Answer Questions**: Add FAQs based on common customer queries
6. **Update Regularly**: Keep content fresh and prices current
7. **Cross-promote**: Link related tours for better engagement

---

## 🆘 Troubleshooting

### Tour not showing on listing page?
- Ensure `published` is set to `true`
- Check if Sanity Studio deployment is complete
- Rebuild the Astro site

### Images not loading?
- Verify images are uploaded in Sanity
- Check image URLs in browser console
- Ensure proper image transformation in code

### Broken layout?
- Validate all required fields are filled
- Check browser console for errors
- Verify data structure matches TypeScript types

---

## 📞 Support

For questions or issues with the sightseeing tours template:
1. Check this guide first
2. Review the example implementation in the code
3. Contact the development team

---

## 🎉 Conclusion

The new sightseeing tours template provides a professional, comprehensive solution for showcasing day tours. It's designed to:
- Convert visitors into bookings
- Provide all necessary information upfront
- Build trust through transparency
- Create a memorable browsing experience
- Work seamlessly with your existing site theme

Happy touring! 🚗✨
