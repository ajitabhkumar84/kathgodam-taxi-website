# Weather Widget & Google Maps Setup Guide

## Problem: Weather Widget Not Working

The weather widget wasn't working because it needs **precise coordinates** (latitude/longitude) for each destination, not just the city name.

## ✅ Solution: Add Coordinates in Sanity Studio

I've fixed this by adding coordinate fields to your route schema. Now the weather widget and Google Maps will work automatically when you add coordinates!

---

## 📍 How to Find Coordinates

### Method 1: Using Google Maps (Easiest)

1. **Go to Google Maps**: https://maps.google.com
2. **Search for your destination** (e.g., "Nainital, Uttarakhand")
3. **Right-click on the exact location**
4. **Click the coordinates** (they'll be at the top of the menu)
5. **Copy the coordinates** - Format will be like: `29.3803, 79.4636`

**Visual Example:**
```
Right-click on map → Coordinates appear:
29.3803, 79.4636
     ↑        ↑
  Latitude  Longitude
```

### Method 2: From Google Maps URL

1. Search for location on Google Maps
2. Look at the URL in your browser
3. Find numbers after `@` symbol
4. Example URL:
   ```
   https://www.google.com/maps/place/Nainital/@29.3803039,79.4636042,13z
                                              ↑         ↑
                                           Latitude  Longitude
   ```

### Common Destinations in Uttarakhand:

| Destination | Latitude | Longitude |
|------------|----------|-----------|
| **Nainital** | 29.3803 | 79.4636 |
| **Ranikhet** | 29.6417 | 79.4324 |
| **Almora** | 29.5972 | 79.6591 |
| **Mukteshwar** | 29.4747 | 79.6469 |
| **Kausani** | 29.8397 | 79.6094 |
| **Bhimtal** | 29.3486 | 79.5581 |
| **Corbett** | 29.5301 | 78.7689 |
| **Mussoorie** | 30.4598 | 78.0644 |
| **Dehradun** | 30.3165 | 78.0322 |
| **Haridwar** | 29.9457 | 78.1642 |

---

## 🎯 How to Add Coordinates in Sanity Studio

### Step-by-Step:

1. **Access Sanity Studio**
   ```
   npm run dev
   Visit: http://localhost:4321/studio
   ```

2. **Open Your Route**
   - Click "Route" in sidebar
   - Select the route you want to edit
   - OR create a new route

3. **Scroll to "Location Coordinates"**
   - You'll see this section after "Hero Slider Images"
   - Before "Page Content"

4. **Enter Coordinates**

   **Field Location in Studio:**
   ```
   Route Form:
   ├── Starting Price
   ├── Hero Slider Images
   │
   ├── 📍 LOCATION COORDINATES (for Weather & Maps)
   │   ├── Destination Latitude (e.g., 29.3803)
   │   ├── Destination Longitude (e.g., 79.4636)
   │   └── Google Maps Embed URL (Optional)
   │
   ├── Page Title
   └── ...
   ```

   **Enter the numbers:**
   - **Destination Latitude**: `29.3803`
   - **Destination Longitude**: `79.4636`
   - **Google Maps Embed URL**: Leave blank (auto-generated) OR add custom

5. **Click "Publish"**

6. **Check Your Page**
   - Visit `/routes/[your-slug]`
   - Weather widget should now display!

---

## 🗺️ Google Maps (Optional Custom Embed)

### When to Use Custom Maps Embed:

- If you want a specific route view
- If you want custom zoom level
- If you want to highlight specific waypoints

### How to Get Custom Google Maps Embed URL:

1. **Go to Google Maps**: https://maps.google.com
2. **Search for your route**: "Kathgodam to Nainital"
3. **Click "Directions"**
4. **Enter From and To locations**
5. **Click the menu icon (☰)**
6. **Click "Share or embed map"**
7. **Click "Embed a map"**
8. **Copy the URL from the iframe src attribute**
9. **Paste into "Google Maps Embed URL" field in Sanity**

**If you don't add a custom URL**, the system uses a default map view (which is fine for most cases).

---

## 🌤️ How the Weather Widget Works Now

### Before (Broken):
```
https://forecast7.com/en/nainital/  ❌ Doesn't work
```

### After (Fixed):
```
https://forecast7.com/en/29.38/79.46/nainital/  ✅ Works!
                         ↑      ↑
                      Latitude Longitude
```

### What You'll See:

**With Coordinates:**
- Live weather data for the destination
- Temperature, conditions, forecast
- Auto-updates

**Without Coordinates:**
- Friendly message: "Weather information unavailable"
- Instructions to add coordinates
- No error, just a placeholder

---

## 🔄 Workflow Example

### Adding Nainital Route with Weather:

1. **Create route in Sanity Studio**
2. **Fill basic info**:
   - From: Kathgodam
   - To: Nainital
   - Distance, Duration, Price, etc.

3. **Add coordinates** (from table above):
   - Destination Latitude: `29.3803`
   - Destination Longitude: `79.4636`

4. **Publish**

5. **View page**: Weather widget now works! ✅

---

## 💡 Pro Tips

### 1. **Be Precise with Coordinates**
   - Use at least 4 decimal places (e.g., 29.3803, not 29.38)
   - More decimals = more accurate weather

### 2. **Test the Weather Widget**
   - After adding coordinates, check the page
   - Weather widget may take a few seconds to load
   - Works better on production/preview than localhost

### 3. **Reuse Coordinates**
   - Save common destination coordinates in a note
   - Use for multiple routes to the same destination

### 4. **Google Maps Embed**
   - Start without custom URL (uses default)
   - Add custom URL only if you need specific view

### 5. **Validate Coordinates**
   - Latitude: -90 to 90
   - Longitude: -180 to 180
   - India typically: Lat 8-35, Lon 68-97

---

## ❓ Troubleshooting

### Weather widget not showing?

1. **Check coordinates are entered** in Sanity Studio
2. **Publish the route** (not just save)
3. **Rebuild the site**: `npm run build`
4. **Check coordinates are correct** (paste in Google Maps to verify)
5. **Wait a few seconds** - external widget needs to load

### Weather widget shows wrong location?

- Double-check latitude/longitude aren't swapped
- Verify coordinates in Google Maps first

### Still not working in local development?

- The weather widget loads from external CDN (weatherwidget.io)
- May not work perfectly in localhost
- **Try in production or preview mode for best results**
- Google Maps should work in local though

---

## 📋 Quick Reference

**Required for Weather Widget:**
- ✅ Destination Latitude
- ✅ Destination Longitude

**Optional:**
- Google Maps Embed URL (auto-generated if not provided)

**Format:**
- Latitude: Number, 4+ decimals (e.g., 29.3803)
- Longitude: Number, 4+ decimals (e.g., 79.4636)

**Example:**
```
Nainital:
- Latitude: 29.3803
- Longitude: 79.4636
```

---

## ✅ Summary

**Before this fix:**
- ❌ Weather widget didn't work
- ❌ Google Maps hardcoded for Kathgodam-Nainital only
- ❌ No way to customize per route

**After this fix:**
- ✅ Weather widget works with coordinates
- ✅ Each route can have different weather/maps
- ✅ Easy to add coordinates in Sanity Studio
- ✅ Graceful fallback if coordinates missing
- ✅ Optional custom Google Maps embed

**Next step:** Add coordinates to your routes in Sanity Studio! 🎉

---

## 🚀 Ready to Use!

The weather widget and Google Maps are now **fully dynamic** and work from Sanity Studio data. Just add the coordinates when creating routes and everything works automatically!

For the complete list of coordinates for Uttarakhand destinations, see the table above.
