import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'package',
  title: 'Package',
  type: 'document',
  fields: [
    // Basic Info
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      description: 'e.g., 2 Days Nainital Tour, Kainchi Dham Package',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (e.g., 2-days-nainital-tour, kainchi-dham-package)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short tagline or description',
    }),

    // Pricing
    defineField({
      name: 'startingPrice',
      title: 'Starting Price',
      type: 'string',
      description: 'e.g., ₹4,000 or From ₹5,500',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 2 Days / 1 Night, Full Day',
    }),

    // Hero Section
    defineField({
      name: 'heroSlides',
      title: 'Hero Slider Images',
      type: 'array',
      of: [{type: 'heroSlide'}],
      description: 'Add 2-5 images for the hero slider',
      validation: (Rule) => Rule.min(1).max(5),
    }),

    // SEO
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'SEO title for the page',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'string',
      description: 'Comma-separated keywords for SEO',
    }),

    // Content
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 5,
      description: 'Main introduction/description. Supports HTML tags like <strong>, <br>',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Package Highlights',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key features or highlights of the package',
    }),

    // Itinerary (Optional)
    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'day', type: 'string', title: 'Day', description: 'e.g., Day 1'},
            {name: 'title', type: 'string', title: 'Title'},
            {
              name: 'activities',
              type: 'array',
              title: 'Activities',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
      description: 'Day-by-day itinerary',
    }),

    // Pricing Options
    defineField({
      name: 'pricingOptions',
      title: 'Pricing Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Option Name'},
            {name: 'description', type: 'string', title: 'Description'},
            {name: 'price', type: 'string', title: 'Price'},
            {name: 'features', type: 'array', title: 'Features', of: [{type: 'string'}]},
            {name: 'popular', type: 'boolean', title: 'Popular', initialValue: false},
          ],
        },
      ],
      description: 'Different pricing tiers or options',
    }),

    // What's Included/Excluded
    defineField({
      name: 'inclusions',
      title: "What's Included",
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of items/services included in the package',
    }),
    defineField({
      name: 'exclusions',
      title: "What's Excluded",
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of items/services not included in the package',
    }),

    // Related Routes (Optional linking)
    defineField({
      name: 'relatedRoutes',
      title: 'Related Routes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'route'}]}],
      description: 'Link related route pages to this package',
    }),

    // Attractions
    defineField({
      name: 'attractions',
      title: 'Attractions Covered',
      type: 'array',
      of: [{type: 'attraction'}],
      description: 'Places covered in this package',
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{type: 'faq'}],
    }),

    // Published status
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Set to true to make this package visible on the website',
      initialValue: false,
    }),

    // Homepage Feature Settings
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Make this package available for homepage selection',
      initialValue: false,
    }),
    defineField({
      name: 'featuredHomepageImage',
      title: 'Featured Homepage Image',
      type: 'image',
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
