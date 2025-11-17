import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'route',
  title: 'Route',
  type: 'document',
  fields: [
    // Route Basic Info
    defineField({
      name: 'from',
      title: 'From Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'to',
      title: 'To Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (e.g., kathgodam-nainital)',
      options: {
        source: (doc: any) => `${doc.from?.toLowerCase()}-${doc.to?.toLowerCase()}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'distance',
      title: 'Distance',
      type: 'string',
      description: 'e.g., 34 KM',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Journey Duration',
      type: 'string',
      description: 'e.g., 1 Hour',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price',
      type: 'string',
      description: 'e.g., ₹1,100',
      validation: (Rule) => Rule.required(),
    }),

    // Page Content
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
    defineField({
      name: 'introText1',
      title: 'Introduction Paragraph 1',
      type: 'text',
      rows: 3,
      description: 'First intro paragraph. Supports HTML like <strong>',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introText2',
      title: 'Introduction Paragraph 2',
      type: 'text',
      rows: 3,
      description: 'Second intro paragraph. Supports HTML like <strong>',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attractionsTitle',
      title: 'Attractions Section Title',
      type: 'string',
      description: 'e.g., Places Worth Seeing in Nainital',
      initialValue: 'Places Worth Seeing',
    }),

    // Car Types
    defineField({
      name: 'carTypes',
      title: 'Car Types & Pricing',
      type: 'array',
      of: [{type: 'carType'}],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Attractions
    defineField({
      name: 'attractions',
      title: 'Attractions',
      type: 'array',
      of: [{type: 'attraction'}],
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{type: 'faq'}],
    }),

    // Stay Packages (Optional)
    defineField({
      name: 'stayPackages',
      title: 'Stay Packages',
      type: 'array',
      of: [{type: 'stayPackage'}],
      description: 'Optional: Add stay + taxi packages',
    }),

    // Tour Packages (Optional)
    defineField({
      name: 'tourPackages',
      title: 'Tour Packages',
      type: 'array',
      of: [{type: 'tourPackage'}],
      description: 'Optional: Add multi-day tour packages',
    }),

    // Published status
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Set to true to make this route visible on the website',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      from: 'from',
      to: 'to',
      distance: 'distance',
      published: 'published',
    },
    prepare(selection) {
      const {from, to, distance, published} = selection
      return {
        title: `${from} → ${to}`,
        subtitle: `${distance} | ${published ? '✅ Published' : '❌ Draft'}`,
      }
    },
  },

  orderings: [
    {
      title: 'From Location A-Z',
      name: 'fromAsc',
      by: [{field: 'from', direction: 'asc'}],
    },
    {
      title: 'To Location A-Z',
      name: 'toAsc',
      by: [{field: 'to', direction: 'asc'}],
    },
  ],
})
