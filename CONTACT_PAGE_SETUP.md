# Contact Page Setup Guide

Your contact page has been successfully created at `/contact`! 🎉

## What's Been Created

### Components (in `src/components/`)
1. **ContactHero.astro** - Beautiful hero section with badges
2. **ContactForm.astro** - Comprehensive booking form with all fields
3. **ContactInfo.astro** - Contact cards (WhatsApp, Call, Email, Address) + Google Map
4. **ContactFAQ.astro** - FAQ accordion with 10 relevant questions

### Page
- **src/pages/contact.astro** - Main contact page assembling all components

## Features Included

✅ **Free-form Service Request Form** with:
- Name, Email, Phone
- Pickup & Drop locations
- Travel date & time
- Number of passengers
- Vehicle type preference
- Additional requirements/message

✅ **WhatsApp Button** - Two types:
- Form submission via WhatsApp (fills form data into message)
- Direct contact cards with instant chat

✅ **Call Button** - Clickable phone number cards

✅ **FAQs Section** - 10 comprehensive FAQs with accordion

✅ **Google Maps Integration** - Embedded map + "Open in Google Maps" button

✅ **Beautiful Layout** - Matches your existing theme (mustard & black)

## Required Setup Steps

### 1. Get Web3Forms Access Key

The contact form uses Web3Forms (free service) to send emails:

1. Go to https://web3forms.com
2. Sign up with your email: **kathgodamtaxi@gmail.com**
3. You'll receive an access key via email
4. Open `src/components/ContactForm.astro`
5. Replace `YOUR_ACCESS_KEY_HERE` on line 24 with your actual key:
   ```html
   <input type="hidden" name="access_key" value="your-actual-key-here" />
   ```

### 2. Update Google Maps Embed (Optional)

Currently using a placeholder map URL. To show accurate location:

1. Go to https://www.google.com/maps
2. Search for: "A19- Near Kathgodam Railway Station, Nainital, Uttarakhand 263126"
3. Click "Share" → "Embed a map"
4. Copy the iframe URL
5. Open `src/pages/contact.astro`
6. Replace the `mapUrl` value (around line 38) with your copied URL

## How It Works

### Form Submission Flow
1. User fills out the contact form
2. Two submission options:
   - **Submit Request** → Sends email via Web3Forms to kathgodamtaxi@gmail.com
   - **Send via WhatsApp** → Opens WhatsApp with pre-filled message containing all form data

### Contact Methods
- **WhatsApp**: Opens chat with +91 7351721351
- **Phone**: Direct call link to +91 7351721351
- **Email**: Opens mail client to kathgodamtaxi@gmail.com
- **Map**: Shows your location near Kathgodam Railway Station

## Testing the Page

1. Visit: http://localhost:4321/contact
2. Test the form (without access key, it won't submit yet)
3. Test WhatsApp button (should work immediately)
4. Test call button (should work immediately)
5. Test FAQ accordion (should expand/collapse)
6. Test "Open in Google Maps" button

## Customization

### Change Form Fields
Edit `src/components/ContactForm.astro` - add/remove input fields as needed

### Modify FAQs
Edit `src/components/ContactFAQ.astro` - update the `faqs` array (lines 8-70)

### Update Contact Info
Edit `src/pages/contact.astro` - change phone, email, address variables (lines 26-29)

### Styling
All components use your existing Tailwind theme:
- Primary color: Mustard yellow (`primary-500`)
- Secondary color: Black (`secondary-900`)
- WhatsApp green: `bg-whatsapp`

## SEO & Schema

The contact page includes:
- ✅ Meta description & keywords
- ✅ Open Graph tags
- ✅ Local Business schema markup (for Google search)
- ✅ Proper heading hierarchy

## Next Steps

1. **Get Web3Forms key** (5 minutes)
2. **Test form submission** with the key
3. **Update Google Maps** URL (optional but recommended)
4. **Add link to navigation** if not already present

## Support

If you need any changes to:
- Form fields
- FAQ questions
- Contact information
- Layout/design

Just let me know and I'll help you customize it!

---

**Page URL**: http://localhost:4321/contact (dev) / https://yourdomain.com/contact (production)
