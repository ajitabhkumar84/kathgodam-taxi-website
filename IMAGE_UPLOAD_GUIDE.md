# Image Upload Guide for Kathgodam Taxi CMS

This guide provides detailed specifications for all image upload fields throughout your Sanity CMS.

## 🎯 Quick Reference Table

| Section | Recommended Size | Aspect Ratio | Max File Size | Format | Purpose |
|---------|-----------------|--------------|---------------|---------|---------|
| **Hero Slider (Homepage)** | 1920x1080px | 16:9 | 2MB | JPEG/WebP | Full-width hero background images |
| **Hero Slider (Routes/Packages)** | 1920x1080px | 16:9 | 2MB | JPEG/WebP | Full-width slider images for route & package pages |
| **Attraction Images** | 800x800px | 1:1 (Square) | 1MB | JPEG/WebP | Attraction thumbnails in grid layouts |
| **Why Choose Us Image** | 800x600px | 4:3 | 1MB | JPEG/WebP | Service quality showcase image |
| **Corporate Client Logos** | 200x100px | 2:1 | 200KB | PNG | Company logos (transparent background preferred) |

---

## 📸 Detailed Image Specifications

### 1. Hero Slider Images (Homepage)

**Location:** Home Page → Hero Slider → Background Image

**Specifications:**
- **Dimensions:** 1920x1080px (Full HD)
- **Aspect Ratio:** 16:9 (Landscape)
- **Max File Size:** 2MB
- **Recommended Format:** JPEG (for photos), WebP (for best performance)
- **Alt Text:** Required - Describe the scene or location

**Tips:**
- Use high-quality, scenic landscape photos
- Images should be bright and eye-catching
- Consider text overlay areas (keep important content away from the center-left where text appears)
- Compress images before upload using tools like TinyPNG or ImageOptim

**Best Practices:**
- Capture the beauty of Kumaon hills
- Show roads, destinations, or taxi services
- Avoid cluttered or busy backgrounds
- Test readability of overlay text on the image

---

### 2. Hero Slider Images (Routes & Packages)

**Location:** Routes → Hero Slider Images | Packages → Hero Slider Images

**Specifications:**
- **Dimensions:** 1920x1080px (Full HD)
- **Aspect Ratio:** 16:9 (Landscape)
- **Max File Size:** 2MB
- **Recommended Format:** JPEG, WebP
- **Alt Text:** Required - Describe the location/scene

**Tips:**
- Show destination-specific images
- Use 2-5 images per route/package (3 recommended)
- Images should tell a story about the journey or destination
- Include landmarks, scenic views, or popular attractions

---

### 3. Attraction Images

**Location:** Routes → Attractions | Packages → Attractions Covered

**Specifications:**
- **Dimensions:** 800x800px
- **Aspect Ratio:** 1:1 (Square)
- **Max File Size:** 1MB
- **Recommended Format:** JPEG, WebP
- **Alt Text:** Required - Name of the attraction

**Tips:**
- Square format ensures consistent grid display
- Focus on the main attraction/landmark
- Good lighting and clear visibility
- Avoid cropping important elements

**Best Practices:**
- Center the main subject
- Use clear, recognizable views of attractions
- Consistent quality across all attraction images
- Prefer daytime photos with good lighting

---

### 4. Why Choose Us Section Image

**Location:** Why Choose Us Section → Section Image

**Specifications:**
- **Dimensions:** 800x600px
- **Aspect Ratio:** 4:3
- **Max File Size:** 1MB
- **Recommended Format:** JPEG, WebP
- **Alt Text:** Required - Describe the image content

**Purpose:** Showcase your service quality, clean taxis, or professional drivers

**Tips:**
- Show clean, well-maintained vehicles
- Professional driver photos
- Happy customers (with permission)
- Service quality indicators

**Suggested Image Types:**
- Clean, modern taxi exterior
- Professional driver with vehicle
- Customer service moment
- Well-maintained vehicle interior

---

### 5. Corporate Client Logos

**Location:** Corporate Clients Section → Client Logos

**Specifications:**
- **Dimensions:** 200x100px
- **Aspect Ratio:** 2:1 (Landscape)
- **Max File Size:** 200KB
- **Recommended Format:** PNG (with transparent background)
- **Alt Text:** Usually just the company name

**Tips:**
- Use official company logos
- Transparent background preferred
- Logos will be displayed in grayscale by default
- Full color appears on hover

**Best Practices:**
- Request vector logos (SVG/AI) from clients, then export as PNG
- Ensure logos are centered within the 200x100px canvas
- Maintain consistent padding around logos
- Use high-resolution source files to avoid pixelation

---

## 🎨 Image Preparation Workflow

### Step 1: Resize Images
Use tools like:
- **Photoshop/GIMP:** For precise control
- **Online Tools:** Canva, Pixlr, Photopea
- **Batch Processing:** ImageMagick, XnConvert

### Step 2: Optimize File Size
Recommended tools:
- **TinyPNG** (https://tinypng.com) - Great compression
- **Squoosh** (https://squoosh.app) - Google's tool with preview
- **ImageOptim** (Mac) - Drag-and-drop optimization

### Step 3: Convert to WebP (Optional)
- WebP provides better compression than JPEG
- Use Squoosh or online converters
- 25-35% smaller file sizes with same quality

### Step 4: Upload to Sanity
- Navigate to the appropriate section in Sanity Studio
- Click "Upload" or drag and drop your image
- Add descriptive alt text for SEO and accessibility
- Use the hotspot feature to define the focal point

---

## 📝 Alt Text Best Practices

Alt text is crucial for:
- **SEO:** Helps search engines understand your images
- **Accessibility:** Screen readers for visually impaired users
- **Fallback:** Displayed if image fails to load

**Good Alt Text Examples:**

✅ **Hero Slider:**
- "Scenic mountain road from Kathgodam to Nainital with pine trees"
- "Naini Lake surrounded by hills during sunset"

✅ **Attractions:**
- "Naina Devi Temple on hilltop overlooking Nainital"
- "Bhimtal Lake with boats and mountain backdrop"

✅ **Why Choose Us:**
- "Clean white Toyota Innova taxi parked at Kathgodam station"
- "Professional taxi driver standing beside well-maintained vehicle"

✅ **Corporate Logos:**
- "MakeMyTrip logo"
- "Club Mahindra logo"

❌ **Poor Alt Text:**
- "Image1.jpg"
- "Photo"
- Leaving it blank

---

## 🔧 Hotspot Feature in Sanity

When uploading images, Sanity allows you to set a "hotspot" - this defines the focal point of your image.

**Why it matters:**
- Ensures the important part of your image is always visible
- Helpful when images are cropped for different screen sizes
- Particularly important for hero images with off-center subjects

**How to use:**
1. Upload your image
2. Click on the image in Sanity
3. Adjust the blue circle (hotspot) to the most important part
4. Adjust the white rectangle (crop area) as needed

---

## 🚀 Quick Start Checklist

When adding new images to your site:

- [ ] Check the recommended dimensions for your section
- [ ] Resize image to exact or proportional dimensions
- [ ] Optimize file size (should be under max limit)
- [ ] Convert to WebP if possible (optional but recommended)
- [ ] Upload to Sanity CMS
- [ ] Write descriptive alt text
- [ ] Set hotspot for focal point (if needed)
- [ ] Preview on frontend to ensure quality
- [ ] Test on mobile devices for responsiveness

---

## 📱 Mobile Considerations

All images are automatically responsive, but keep these in mind:

- Hero images will be cropped on mobile (test critical content placement)
- Logos remain readable at smaller sizes
- Attraction images work well in single-column mobile grids
- Ensure text remains readable on all background images

---

## 🎯 Performance Tips

1. **Always compress images** before upload
2. **Use appropriate formats:**
   - Photos: JPEG or WebP
   - Logos with transparency: PNG
   - Graphics/illustrations: SVG when possible
3. **Don't upload massive files** - Sanity has file size limits
4. **Lazy loading is automatic** - Images load as users scroll
5. **CDN delivery** - Sanity uses Sanity CDN for fast image delivery

---

## ❓ FAQ

**Q: What if my image isn't exactly the recommended size?**
A: As long as the aspect ratio matches, Sanity will handle resizing. A 1600x900 image works fine for 16:9 ratio.

**Q: Can I upload PNG for hero images?**
A: Yes, but JPEG or WebP is recommended for photos as they're much smaller file sizes.

**Q: What happens if I skip alt text?**
A: Images will still work, but you'll miss SEO benefits and accessibility features. Always add alt text!

**Q: How do I change an image after uploading?**
A: In Sanity Studio, go to the image field and click "Remove" then upload a new one, or click "Edit" to adjust hotspot.

**Q: Can I use free stock photos?**
A: Yes! Good sources include:
   - Unsplash (https://unsplash.com)
   - Pexels (https://pexels.com)
   - Pixabay (https://pixabay.com)

   Always check the license and provide attribution if required.

---

## 🛠️ Troubleshooting

**Issue: Image looks blurry**
- Solution: Upload a higher resolution image or check compression settings

**Issue: File too large to upload**
- Solution: Use TinyPNG or Squoosh to compress before uploading

**Issue: Image is cropped oddly on mobile**
- Solution: Adjust the hotspot in Sanity to focus on the important area

**Issue: Logo looks distorted**
- Solution: Ensure logo maintains 2:1 aspect ratio (200x100px)

---

## 📞 Need Help?

If you encounter any issues with image uploads:

1. Check this guide first
2. Verify image dimensions and file size
3. Try compressing the image
4. Test with a different image to isolate the issue
5. Check Sanity Studio for error messages

---

**Last Updated:** December 2025
**Version:** 1.0

Happy uploading! 🎉
