import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'temple',
  title: 'Temple',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Information'},
    {name: 'seo', title: 'SEO'},
    {name: 'media', title: 'Media'},
    {name: 'content', title: 'Page Content'},
    {name: 'details', title: 'Temple Details'},
    {name: 'taxi', title: 'Taxi Integration'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    // ============================================
    // BASIC INFORMATION
    // ============================================
    defineField({
      name: 'name',
      title: 'Temple Name',
      type: 'string',
      group: 'basic',
      description: 'e.g., Kainchi Dham, Jageshwar Temple',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      description: 'URL-friendly identifier (e.g., kainchi-dham, jageshwar-temple)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle/Tagline',
      type: 'string',
      group: 'basic',
      description: 'e.g., "The Ashram of Neem Karoli Baba"',
    }),
    defineField({
      name: 'district',
      title: 'District',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Nainital', value: 'nainital'},
          {title: 'Almora', value: 'almora'},
          {title: 'Champawat', value: 'champawat'},
          {title: 'Pithoragarh', value: 'pithoragarh'},
          {title: 'Bageshwar', value: 'bageshwar'},
          {title: 'Udham Singh Nagar', value: 'udham-singh-nagar'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'templeType',
      title: 'Temple Type',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Shiva Temple', value: 'shiva'},
          {title: 'Shakti/Devi Temple', value: 'shakti'},
          {title: 'Ashram/Spiritual Center', value: 'ashram'},
          {title: 'Heritage Temple', value: 'heritage'},
          {title: 'Local Deity', value: 'local'},
          {title: 'Pilgrimage Site', value: 'pilgrimage'},
        ],
      },
    }),

    // ============================================
    // SEO FIELDS
    // ============================================
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      group: 'seo',
      description: 'SEO title for the page (max 60 chars)',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'SEO meta description (max 160 chars)',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'string',
      group: 'seo',
      description: 'Comma-separated keywords',
    }),

    // ============================================
    // MEDIA
    // ============================================
    defineField({
      name: 'heroSlides',
      title: 'Hero Slider Images',
      type: 'array',
      group: 'media',
      of: [{type: 'heroSlide'}],
      description: 'Add 2-5 images for the hero slider (1920x1080px, 16:9)',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Listing Image',
      type: 'image',
      group: 'media',
      description: 'Image for temple cards on listing page (800x600px, 4:3). Required.',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt text'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoEmbed',
      title: 'Video Embed URL',
      type: 'url',
      group: 'media',
      description: 'YouTube or Vimeo embed URL (optional)',
    }),

    // ============================================
    // PAGE CONTENT
    // ============================================
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 5,
      group: 'content',
      description: 'Main introduction. Supports HTML tags like <strong>, <br>.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'history',
      title: 'History & Significance',
      type: 'text',
      rows: 8,
      group: 'content',
      description: 'Detailed history and spiritual significance. Supports HTML.',
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{type: 'string'}],
      group: 'content',
      description: '3-6 key highlights for quick overview',
      validation: (Rule) => Rule.min(2).max(6),
    }),
    defineField({
      name: 'customSections',
      title: 'Custom Sections',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        name: 'customSection',
        title: 'Custom Section',
        fields: [
          {
            name: 'sectionTitle',
            type: 'string',
            title: 'Section Title',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'sectionContent',
            type: 'text',
            title: 'Section Content',
            rows: 5,
            description: 'Supports HTML tags',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'sectionImage',
            type: 'image',
            title: 'Section Image (optional)',
            options: {hotspot: true},
            fields: [
              {name: 'alt', type: 'string', title: 'Alt text'},
            ],
          },
        ],
        preview: {
          select: {
            title: 'sectionTitle',
            media: 'sectionImage',
          },
        },
      }],
      description: 'Add custom content sections (e.g., Spiritual Teachings, Architecture, Events)',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'content',
      of: [{type: 'faq'}],
      description: 'Frequently asked questions about this temple',
    }),

    // ============================================
    // TEMPLE DETAILS
    // ============================================
    defineField({
      name: 'timings',
      title: 'Temple Timings',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'openTime',
          type: 'string',
          title: 'Opening Time',
          description: 'e.g., 6:00 AM',
        },
        {
          name: 'closeTime',
          type: 'string',
          title: 'Closing Time',
          description: 'e.g., 8:00 PM',
        },
        {
          name: 'poojaTimings',
          type: 'text',
          title: 'Pooja/Aarti Timings',
          rows: 3,
          description: 'e.g., Morning Aarti: 6:00 AM, Evening Aarti: 7:00 PM',
        },
        {
          name: 'closedDays',
          type: 'string',
          title: 'Closed Days',
          description: 'e.g., Open all days, or Closed on Tuesdays',
        },
        {
          name: 'specialNote',
          type: 'string',
          title: 'Special Note',
          description: 'e.g., Closed June 15 - Sept 15 for monsoon',
        },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location Details',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'address',
          type: 'text',
          title: 'Full Address',
          rows: 2,
        },
        {
          name: 'nearestCity',
          type: 'string',
          title: 'Nearest Major City',
          description: 'e.g., Nainital, Almora',
        },
        {
          name: 'altitude',
          type: 'string',
          title: 'Altitude',
          description: 'e.g., 1,850 meters',
        },
        {
          name: 'latitude',
          type: 'number',
          title: 'Latitude',
          validation: (Rule) => Rule.min(-90).max(90),
        },
        {
          name: 'longitude',
          type: 'number',
          title: 'Longitude',
          validation: (Rule) => Rule.min(-180).max(180),
        },
        {
          name: 'googleMapsEmbedUrl',
          type: 'url',
          title: 'Google Maps Embed URL',
        },
      ],
    }),
    defineField({
      name: 'howToReach',
      title: 'How to Reach',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'fromKathgodam',
          type: 'text',
          title: 'From Kathgodam Station',
          rows: 2,
          description: 'Distance and route description',
        },
        {
          name: 'fromPantnagar',
          type: 'text',
          title: 'From Pantnagar Airport',
          rows: 2,
        },
        {
          name: 'fromDelhi',
          type: 'text',
          title: 'From Delhi',
          rows: 2,
        },
        {
          name: 'nearestRailway',
          type: 'string',
          title: 'Nearest Railway Station',
          description: 'e.g., Kathgodam (35 km)',
        },
        {
          name: 'nearestAirport',
          type: 'string',
          title: 'Nearest Airport',
          description: 'e.g., Pantnagar Airport (70 km)',
        },
        {
          name: 'distanceFromKathgodam',
          type: 'string',
          title: 'Distance from Kathgodam',
          description: 'e.g., 35 km, 1.5 hours',
        },
      ],
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'e.g., March to June and September to November',
    }),
    defineField({
      name: 'seasonalEvents',
      title: 'Festivals & Events',
      type: 'array',
      group: 'details',
      of: [{
        type: 'object',
        name: 'seasonalEvent',
        title: 'Event',
        fields: [
          {
            name: 'eventName',
            type: 'string',
            title: 'Event/Festival Name',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'timing',
            type: 'string',
            title: 'When (Month/Date)',
            description: 'e.g., Mahashivratri (February/March)',
          },
          {
            name: 'description',
            type: 'text',
            title: 'Description',
            rows: 2,
          },
        ],
        preview: {
          select: {
            title: 'eventName',
            subtitle: 'timing',
          },
        },
      }],
    }),
    defineField({
      name: 'pilgrimageTips',
      title: 'Pilgrimage Tips',
      type: 'array',
      of: [{type: 'string'}],
      group: 'details',
      description: 'Practical tips for pilgrims',
    }),
    defineField({
      name: 'accommodationInfo',
      title: 'Accommodation Information',
      type: 'text',
      rows: 4,
      group: 'details',
      description: 'Nearby accommodation options, dharamshalas, hotels',
    }),

    // ============================================
    // TAXI INTEGRATION
    // ============================================
    defineField({
      name: 'relatedRoutes',
      title: 'Related Taxi Routes',
      type: 'array',
      group: 'taxi',
      of: [{type: 'reference', to: [{type: 'route'}]}],
      description: 'Routes that reach this temple (e.g., Kathgodam to Kainchi Dham)',
    }),
    defineField({
      name: 'relatedPackages',
      title: 'Packages Including This Temple',
      type: 'array',
      group: 'taxi',
      of: [{type: 'reference', to: [{type: 'package'}]}],
      description: 'Tour packages that visit this temple',
    }),
    defineField({
      name: 'nearbyTemples',
      title: 'Nearby Temples',
      type: 'array',
      group: 'taxi',
      of: [{type: 'reference', to: [{type: 'temple'}]}],
      description: 'Other temples nearby for combined visits',
    }),
    defineField({
      name: 'nearbyAttractions',
      title: 'Nearby Attractions',
      type: 'array',
      group: 'taxi',
      of: [{type: 'reference', to: [{type: 'attraction'}]}],
      description: 'Tourist attractions near this temple',
    }),
    defineField({
      name: 'taxiCta',
      title: 'Taxi Booking CTA',
      type: 'object',
      group: 'taxi',
      description: 'Configure the "Book a Taxi" call-to-action section',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'CTA Heading',
          initialValue: 'Book a Taxi to This Temple',
        },
        {
          name: 'subheading',
          type: 'string',
          title: 'CTA Subheading',
          initialValue: 'Reliable taxi service from Kathgodam to this sacred destination',
        },
        {
          name: 'primaryRoute',
          type: 'reference',
          title: 'Primary Route to Highlight',
          to: [{type: 'route'}],
          description: 'The main route to show with pricing (e.g., Kathgodam to Nainital)',
        },
      ],
    }),

    // ============================================
    // SETTINGS
    // ============================================
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      group: 'settings',
      description: 'Set to true to make this temple visible on the website',
      initialValue: false,
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Feature on Homepage',
      type: 'boolean',
      group: 'settings',
      description: 'Show this temple in the featured temples section on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'popularity',
      title: 'Popularity Score',
      type: 'number',
      group: 'settings',
      description: 'Higher score = more popular (1-100). Used for default sorting.',
      validation: (Rule) => Rule.min(1).max(100),
      initialValue: 50,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'district',
      published: 'published',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, subtitle, published, media} = selection
      const districtLabels: Record<string, string> = {
        'nainital': 'Nainital',
        'almora': 'Almora',
        'champawat': 'Champawat',
        'pithoragarh': 'Pithoragarh',
        'bageshwar': 'Bageshwar',
        'udham-singh-nagar': 'Udham Singh Nagar',
      }
      return {
        title,
        subtitle: `${districtLabels[subtitle] || subtitle} | ${published ? '✅ Published' : '❌ Draft'}`,
        media,
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
      title: 'Popularity (High to Low)',
      name: 'popularityDesc',
      by: [{field: 'popularity', direction: 'desc'}],
    },
    {
      title: 'District',
      name: 'districtAsc',
      by: [{field: 'district', direction: 'asc'}],
    },
  ],
})
