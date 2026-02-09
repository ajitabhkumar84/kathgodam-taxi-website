import {defineField, defineType} from 'sanity'
import {PreviewUrlInput} from '../components/PreviewUrlInput'

export default defineType({
  name: 'package',
  title: 'Package',
  type: 'document',
  fieldsets: [
    {
      name: 'basicInfo',
      title: '1. Basic Information',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'seo',
      title: '2. SEO Settings (Required)',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'heroSection',
      title: '3. Hero Section',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'content',
      title: '4. Content & Description',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'pricing',
      title: '5. Pricing Options',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'itinerary',
      title: '6. Itinerary (Optional)',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'attractions',
      title: '7. Attractions & FAQs',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'publishing',
      title: '8. Publishing Settings',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    // Basic Info
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      description: 'e.g., 2 Days Nainital Tour, Kainchi Dham Package',
      fieldset: 'basicInfo',
      validation: (Rule) => Rule.required().error('Package Name is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (e.g., 2-days-nainital-tour, kainchi-dham-package)',
      fieldset: 'basicInfo',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required - click "Generate" button to create from Package Name'),
    }),
    defineField({
      name: 'previewUrl',
      title: '🌐 Production URL',
      type: 'string',
      description: 'This is the live URL of this package page',
      fieldset: 'basicInfo',
      readOnly: true,
      components: {
        input: PreviewUrlInput
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short tagline or description',
      fieldset: 'basicInfo',
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price',
      type: 'string',
      description: 'e.g., ₹4,000 or From ₹5,500',
      fieldset: 'basicInfo',
      validation: (Rule) => Rule.required().error('Starting Price is required'),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 2 Days / 1 Night, Full Day',
      fieldset: 'basicInfo',
    }),

    // SEO (moved up for better visibility)
    defineField({
      name: 'pageTitle',
      title: 'Page Title (SEO)',
      type: 'string',
      description: 'SEO title for the page (max 60 characters)',
      fieldset: 'seo',
      validation: (Rule) =>
        Rule.required().error('Page Title is required for SEO')
            .max(60).warning('Page Title should be under 60 characters for optimal SEO'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      description: 'SEO meta description (max 160 characters)',
      fieldset: 'seo',
      validation: (Rule) =>
        Rule.required().error('Meta Description is required for SEO')
            .max(160).warning('Meta Description should be under 160 characters for optimal SEO'),
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'string',
      description: 'Comma-separated keywords for SEO',
      fieldset: 'seo',
    }),

    // Hero Section
    defineField({
      name: 'heroSlides',
      title: 'Hero Slider Images',
      type: 'array',
      of: [{type: 'heroSlide'}],
      description: 'Add images for the hero slider (optional, max 5)',
      fieldset: 'heroSection',
      validation: (Rule) => Rule.max(5).warning('Maximum 5 Hero Slider Images recommended'),
    }),

    // Content
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 5,
      description: 'Main introduction/description. Supports HTML tags like <strong>, <br>',
      fieldset: 'content',
      validation: (Rule) => Rule.required().error('Introduction Text is required'),
    }),
    defineField({
      name: 'highlights',
      title: 'Package Highlights',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key features or highlights of the package',
      fieldset: 'content',
    }),

    // Feature Box (e.g., Complete Spiritual Circuit)
    defineField({
      name: 'featureBox',
      title: 'Feature Box (Optional)',
      type: 'object',
      fieldset: 'content',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Feature Box',
          description: 'Display a highlighted feature box with stats',
          initialValue: false,
        },
        {
          name: 'title',
          type: 'string',
          title: 'Box Title',
          description: 'e.g., Complete Spiritual Circuit, Premium Package',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'description',
          type: 'text',
          title: 'Box Description',
          rows: 2,
          description: 'Short description under the title',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'stats',
          type: 'array',
          title: 'Statistics (up to 4)',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'value', type: 'string', title: 'Value', description: 'e.g., 4, ~120, 1, ∞'},
                {name: 'label', type: 'string', title: 'Label', description: 'e.g., Temples, KM Total, Full Day, Blessings'},
              ],
            },
          ],
          validation: (Rule) => Rule.max(4),
          hidden: ({parent}) => !parent?.enabled,
        },
      ],
      description: 'Optional feature highlight box with customizable stats',
    }),
    defineField({
      name: 'inclusions',
      title: "What's Included",
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of items/services included in the package',
      fieldset: 'content',
    }),
    defineField({
      name: 'exclusions',
      title: "What's Excluded",
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of items/services not included in the package',
      fieldset: 'content',
    }),

    // Itinerary (Optional)
    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      fieldset: 'itinerary',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              type: 'string',
              title: 'Day Label',
              description: 'e.g., Day 1, Temple 1',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              type: 'string',
              title: 'Destination/Title',
              description: 'e.g., Kainchi Dham, Bhumiadhar Temple',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 5,
              description: 'Detailed description of this day/destination',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'route',
              type: 'string',
              title: 'Route Information',
              description: 'e.g., Kathgodam → Bhimtal → Bowali → Kainchi Dham',
            },
            {
              name: 'totalTime',
              type: 'string',
              title: 'Total Time',
              description: 'e.g., 1.30 Hour from Kathgodam, 2 Hours',
            },
            {
              name: 'badge',
              type: 'string',
              title: 'Optional Badge',
              description: 'e.g., MOST POPULAR, Sacred Site (optional)',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Day Image',
              description: 'Image for this day (recommended). Recommended size: 800x600px',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'activities',
              type: 'array',
              title: 'Activities (Optional)',
              of: [{type: 'string'}],
              description: 'List of activities for this day (optional)',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'day',
              media: 'image',
            },
          },
        },
      ],
      description: 'Day-by-day itinerary with images and details',
    }),

    // Car Types for Taxi-Only Pricing
    defineField({
      name: 'carTypes',
      title: 'Car Types (Taxi-Only Pricing)',
      type: 'array',
      fieldset: 'pricing',
      of: [{type: 'carType'}],
      description: 'Available car types with season and off-season pricing for taxi-only package',
    }),

    // Hotel Add-on Pricing
    defineField({
      name: 'hotelAddon',
      title: 'Hotel Add-on Option',
      type: 'object',
      fieldset: 'pricing',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Enable Hotel Add-on',
          description: 'Show "Taxi + Hotel" pricing section on the package page',
          initialValue: false,
        },
        {
          name: 'carTypes',
          type: 'array',
          title: 'Car Types (Taxi + Hotel Pricing)',
          of: [{type: 'carType'}],
          description: 'Combined pricing for taxi + hotel. Sedan includes 1 Deluxe Room, SUVs include 2 Deluxe Rooms (Twin Sharing)',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'hotelDetails',
          type: 'text',
          title: 'Hotel Details',
          rows: 3,
          description: 'Additional information about hotel accommodation (optional)',
          hidden: ({parent}) => !parent?.enabled,
        },
      ],
      description: 'Configure hotel add-on pricing for this package',
    }),
    defineField({
      name: 'relatedRoutes',
      title: 'Related Routes',
      type: 'array',
      fieldset: 'pricing',
      of: [{type: 'reference', to: [{type: 'route'}]}],
      description: 'Link related route pages to this package',
    }),

    // Online Booking Settings
    defineField({
      name: 'onlineBooking',
      title: 'Online Booking Settings',
      type: 'object',
      fieldset: 'pricing',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Enable Online Booking',
          description: 'Show "Book Online" button on package page with payment integration',
          initialValue: false,
        },
        {
          name: 'upiQrCodeUrl',
          type: 'url',
          title: 'UPI QR Code Image URL',
          description: 'URL of the UPI QR code image for payments',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'upiId',
          type: 'string',
          title: 'UPI ID',
          description: 'e.g., 7351721351@paytm',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'payeeName',
          type: 'string',
          title: 'Payee Name',
          description: 'Name shown on payment screen',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'bookingTerms',
          type: 'text',
          title: 'Booking Terms',
          rows: 3,
          description: 'Terms and conditions for booking',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'cancellationPolicy',
          type: 'text',
          title: 'Cancellation Policy',
          rows: 3,
          description: 'Cancellation and refund policy',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'helpPhone',
          type: 'string',
          title: 'Help Phone Number',
          description: 'Phone number for booking assistance (e.g., 7351721351)',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'helpWhatsapp',
          type: 'string',
          title: 'Help WhatsApp Number',
          description: 'WhatsApp number with country code (e.g., 917351721351)',
          hidden: ({parent}) => !parent?.enabled,
        },
      ],
      description: 'Configure online booking with payment integration',
    }),

    // Attractions
    defineField({
      name: 'attractions',
      title: 'Attractions Covered',
      type: 'array',
      fieldset: 'attractions',
      of: [{type: 'attraction'}],
      description: 'Places covered in this package',
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      fieldset: 'attractions',
      of: [{type: 'faq'}],
    }),

    // Published status
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      fieldset: 'publishing',
      description: 'Set to true to make this package visible on the website',
      initialValue: false,
    }),

    // Homepage Feature Settings
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      fieldset: 'publishing',
      description: 'Make this package available for homepage selection',
      initialValue: false,
    }),
    defineField({
      name: 'featuredHomepageImage',
      title: 'Featured Homepage Image',
      type: 'image',
      fieldset: 'publishing',
      description: 'Image displayed on homepage for this package. Recommended size: 800x600px (4:3 ratio). Required when "Show on Homepage" is enabled.',
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const showOnHomepage = (context.document as any)?.showOnHomepage
          if (showOnHomepage && !image) {
            return 'Featured Homepage Image is required when "Show on Homepage" is enabled'
          }
          return true
        }),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'startingPrice',
      published: 'published',
    },
    prepare(selection) {
      const {title, subtitle, published} = selection
      return {
        title: title,
        subtitle: `${subtitle} | ${published ? '✅ Published' : '❌ Draft'}`,
      }
    },
  },

  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Price',
      name: 'priceAsc',
      by: [{field: 'startingPrice', direction: 'asc'}],
    },
  ],
})
