# Hero Images & Pricing Table Guide

## ✅ Your Questions Answered

### 1. Is the route page similar to the kathgodam-nainital page?

**YES!** 100% identical layout and functionality. Here's how:

- **Same Layout**: All route pages use the exact same `RoutePageLayout.astro` template
- **Same Sections**: Hero slider, pricing table, attractions, FAQs, packages - all present
- **Same Styling**: Identical colors, fonts, spacing, and responsive design
- **Same Components**: Uses the exact same components (RouteHeroSlider, RoutePricingTable, etc.)

**The only difference**: Data comes from Sanity CMS instead of being hardcoded!

### 2. Where can I add hero images and slider images in Sanity Studio?

**Step-by-Step Guide to Add Hero Slider Images:**

#### Option 1: Via Sanity Studio (Recommended)

1. **Access Sanity Studio**
   ```
   npm run dev
   # Visit http://localhost:4321/studio
   ```

2. **Navigate to your route**
   - Click "Route" in the left sidebar
   - Open an existing route OR create a new one

3. **Find the "Hero Slider Images" field**
   - It's located after "Starting Price"
   - Before "Page Title" section
   - Labeled as "Hero Slider Images"

4. **Add a slider image**
   - Click "+ Add item"
   - You'll see three fields:

   **a) Slide Image** (Required)
   - Click "Select" or drag & drop
   - Upload your image (recommended size: 2070x1380px or 3:2 ratio)
   - Add alt text for SEO

   **b) Slide Title** (Required)
   - E.g., "Scenic Drive from Kathgodam to Nainital"
   - E.g., "Discover Nainital"
   - E.g., "Comfortable & Safe Journey"

   **c) Slide Description** (Required)
   - E.g., "Experience the beautiful mountain roads with professional drivers"
   - E.g., "Explore the enchanting hill station nestled in the Kumaon hills"

5. **Add more slides** (Recommended: 3 slides)
   - Click "+ Add item" again
   - Repeat the process
   - You can add 1-5 slides total

6. **Save**
   - Click "Publish" to save your changes

#### What Images to Upload?

**Recommended Specifications:**
- **Size**: 2070x1380px (or maintain 3:2 ratio)
- **Format**: JPG or PNG
- **File Size**: Under 500KB for fast loading
- **Subject**: Scenic route photos, destination images, or taxi/car photos

**Good Image Ideas:**
- Slide 1: Mountain road / scenic route photo
- Slide 2: Destination landmark (e.g., Nainital Lake)
- Slide 3: Comfortable taxi or happy passengers

#### Visual Location in Studio:

```
Route Form Structure:
├── From Location
├── To Location
├── Slug
├── Distance
├── Duration
├── Starting Price
│
├── 📸 HERO SLIDER IMAGES ← HERE!
│   ├── [+] Add item
│   ├── Slide 1
│   │   ├── Image (upload here)
│   │   ├── Title
│   │   └── Description
│   ├── Slide 2
│   └── Slide 3
│
├── Page Title
├── Meta Description
└── ... (rest of fields)
```

### 3. Will the pricing table be displayed the same way?

**YES!** The pricing table displays exactly the same as the kathgodam-nainital page.

Here's what's displayed:

#### Pricing Table Features (Same as Kathgodam-Nainital):

✅ **Car Image** - Shows the car type image you upload in Sanity
✅ **Car Name** - E.g., "Hatchback", "Sedan", "SUV Luxury"
✅ **Car Model** - E.g., "Alto / Alto K10", "Innova Car - 7 pax"
✅ **Passenger Capacity** - E.g., "Up to 4 passengers"
✅ **Season Price** - Price during peak season
✅ **Off-Season Price** - Price during off-season
✅ **Features List** - Bullet points of car features
✅ **"Book Now" Button** - Same styling and functionality

#### Where to Add Car Images & Pricing in Sanity Studio:

1. **In your route document**, scroll to "Car Types & Pricing" section
2. Click "+ Add item" to add a car type
3. Fill in the fields:
   - **Name**: E.g., "Hatchback"
   - **Model**: E.g., "Alto / Alto K10"
   - **Capacity**: E.g., "Up to 4 passengers"
   - **Season Price**: E.g., "₹1,300"
   - **Off-Season Price**: E.g., "₹1,100"
   - **Image**: Click "Select" to upload car image
   - **Features**: Add features one by one

#### Car Image Specifications:

**Recommended:**
- **Size**: 800x600px
- **Format**: PNG (transparent background preferred) or JPG
- **Subject**: Car photo from side angle
- **Background**: White or transparent

**Image Location in Table:**
- Displayed at the top of each pricing card
- Size: Full width of the card
- Height: 160px (auto-scaled)
- Style: Contains padding for clean look

---

## 📋 Complete Workflow Example

### Adding a New Route with Hero Images and Pricing

1. **Go to Sanity Studio**: `/studio`
2. **Create New Route**
3. **Fill Basic Info**:
   - From: Kathgodam
   - To: Ranikhet
   - Distance: 85 KM
   - Duration: 2.5 Hours
   - Starting Price: ₹2,500

4. **Add Hero Slider Images** (3 slides):
   - **Slide 1**:
     - Upload: Mountain road photo
     - Title: "Scenic Drive from Kathgodam to Ranikhet"
     - Description: "Experience stunning Himalayan views"

   - **Slide 2**:
     - Upload: Ranikhet temple photo
     - Title: "Discover Ranikhet"
     - Description: "Explore the Queen's Meadow"

   - **Slide 3**:
     - Upload: Comfortable taxi photo
     - Title: "Comfortable Journey"
     - Description: "Travel in style and comfort"

5. **Add SEO Info**:
   - Page Title
   - Meta Description
   - Keywords

6. **Add Car Types** (4 types):
   - **Hatchback**:
     - Upload car image
     - Add pricing
     - List features

   - **Sedan**:
     - Upload car image
     - Add pricing
     - List features

   - **SUV Deluxe**:
     - Upload car image
     - Add pricing
     - List features

   - **SUV Luxury**:
     - Upload car image
     - Add pricing
     - List features

7. **Add Attractions** (optional):
   - Upload attraction photos
   - Add descriptions

8. **Add FAQs**

9. **Set Published = true**

10. **Click Publish**

11. **View Your Page**: `/routes/kathgodam-ranikhet`

---

## 🎯 Key Points

### Hero Slider Images:
- ✅ Fully customizable from Sanity Studio
- ✅ Add 1-5 images per route (recommended: 3)
- ✅ Upload high-quality photos
- ✅ Add custom title and description for each slide
- ✅ If no images uploaded, default placeholders will show

### Pricing Table:
- ✅ Displays exactly the same as kathgodam-nainital
- ✅ Upload custom car images for each car type
- ✅ Set different season/off-season prices
- ✅ Add unlimited features per car
- ✅ Same layout, same styling, same functionality

### All Route Pages:
- ✅ Use the same template
- ✅ Look identical to kathgodam-nainital
- ✅ Only data changes based on Sanity content
- ✅ One template controls all 30+ route pages

---

## 🖼️ Image Upload Checklist

**Before uploading to Sanity, prepare your images:**

### Hero Slider Images:
- [ ] 3 high-quality photos ready
- [ ] Images are 2070x1380px (or 3:2 ratio)
- [ ] File size under 500KB each
- [ ] Images are relevant to the route
- [ ] Alt text written for SEO

### Car Type Images:
- [ ] 4 car photos ready (Hatchback, Sedan, SUV Deluxe, SUV Luxury)
- [ ] Images are 800x600px
- [ ] Clean background (white/transparent preferred)
- [ ] Side angle view of cars
- [ ] File size under 200KB each

### Attraction Images:
- [ ] High-quality destination photos
- [ ] Images are 800x600px
- [ ] Show the attraction clearly
- [ ] Alt text written for SEO

---

## 🚀 Quick Reference

**To add hero images**: Sanity Studio → Route → "Hero Slider Images" section → "+ Add item"

**To add car images**: Sanity Studio → Route → "Car Types & Pricing" section → "+ Add item" → "Image" field

**To preview**: Save & Publish → Visit `/routes/[your-slug]`

**Image uploads**: Click "Select" or drag & drop directly in Sanity Studio

---

## 💡 Pro Tips

1. **Reuse Images**: Upload common car images once, use across multiple routes
2. **Optimize Before Upload**: Compress images before uploading to Sanity
3. **Alt Text Matters**: Always add descriptive alt text for SEO
4. **Test Responsive**: Check how images look on mobile after uploading
5. **Consistent Style**: Use similar photo styles across all routes for brand consistency

---

## ❓ Need Help?

- **Sanity Studio not loading?** Check your `.env` file has correct credentials
- **Images not showing?** Make sure you clicked "Publish" after uploading
- **Want to change template design?** Edit `src/layouts/RoutePageLayout.astro`
- **Pricing table not showing?** Ensure you added at least one car type

For more details, see:
- `SANITY_SETUP.md` - Complete Sanity setup guide
- `README_ROUTES.md` - Route template system overview

---

**Happy uploading! 🎉** Your route pages will look exactly like kathgodam-nainital with your custom images!
