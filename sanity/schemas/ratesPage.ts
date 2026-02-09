import {defineField, defineType} from 'sanity'
import {createStaticPageUrlInput} from '../components/StaticPageUrlInput'

export default defineType({
  name: 'ratesPage',
  title: 'Rates Page',
  type: 'document',
  fields: [
    // Page URL
    defineField({
      name: 'pageUrl',
      title: '🌐 Page URL',
      type: 'string',
      description: 'The live URL of this page',
      readOnly: true,
      components: {
        input: createStaticPageUrlInput('/rates', 'Rates Page')
      }
    }),
    // SEO Fields
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'SEO title for rates page',
      validation: (Rule) => Rule.required().max(60),
      initialValue: 'Pickup & Drop Taxi Rates - Kathgodam to Kumaon Destinations',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description',
      validation: (Rule) => Rule.required().max(160),
      initialValue:
        'Complete taxi rate card from Kathgodam to all Kumaon destinations. Fixed prices, no hidden charges. Temple tours, hill stations, and popular destinations.',
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'string',
      description: 'Comma-separated keywords',
      initialValue:
        'Kathgodam taxi rates, taxi fare Kathgodam, Kumaon taxi prices, temple tour rates, Nainital taxi fare',
    }),

    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Pickup & Drop Taxi Rates',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        'Fixed prices for all destinations in the Kumaon region. No hidden charges, all-inclusive fares.',
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: 'Transparent Pricing',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Background image for hero section. Recommended: 1920x600px',
      options: {
        hotspot: true,
      },
    }),

    // Page Introduction
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 3,
      description: 'Introductory paragraph shown below hero',
      initialValue:
        'Browse our comprehensive rate card for pickup and drop services from Kathgodam to all major destinations in the Kumaon region. All fares include tolls, taxes, and driver allowances.',
    }),

    // Category Navigation Settings
    defineField({
      name: 'showCategoryNav',
      title: 'Show Category Navigation',
      type: 'boolean',
      description: 'Display jump navigation at top of page',
      initialValue: true,
    }),
    defineField({
      name: 'categoryNavTitle',
      title: 'Category Navigation Title',
      type: 'string',
      initialValue: 'Browse by Category',
    }),

    // Route Categories
    defineField({
      name: 'routeCategories',
      title: 'Route Categories',
      type: 'array',
      of: [{type: 'routeCategory'}],
      description:
        'Add and organize route categories. Drag to reorder. Each category will appear as a separate section on the page.',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),

    // Bottom CTA Section
    defineField({
      name: 'bottomCtaHeading',
      title: 'Bottom CTA Heading',
      type: 'string',
      initialValue: "Don't See Your Destination?",
    }),
    defineField({
      name: 'bottomCtaText',
      title: 'Bottom CTA Text',
      type: 'text',
      rows: 2,
      initialValue:
        'We cover all destinations in the Kumaon region. Contact us for a custom quote for your specific route.',
    }),

    // Additional Info Section
    defineField({
      name: 'showAdditionalInfo',
      title: 'Show Additional Information Section',
      type: 'boolean',
      description: 'Display information about pricing, terms, etc.',
      initialValue: true,
    }),
    defineField({
      name: 'additionalInfoTitle',
      title: 'Additional Info Section Title',
      type: 'string',
      initialValue: 'Important Information',
    }),
    defineField({
      name: 'additionalInfoPoints',
      title: 'Information Points',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key points about pricing and service',
      initialValue: [
        'All rates are all-inclusive (tolls, taxes, parking, driver allowance)',
        'Prices may vary during peak season (April-June, October-November)',
        'AC charges extra: ₹400 per route (limited usage in hills)',
        'We provide clean, well-maintained vehicles with experienced drivers',
        'Free waiting for train delays on multi-day bookings',
      ],
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'Rates Page FAQs',
      type: 'array',
      of: [{type: 'faq'}],
      description: 'General FAQs about rates and booking',
      initialValue: [
        {
          question: 'Are these rates final or will there be extra charges?',
          answer:
            'Our rates are completely transparent and all-inclusive. They cover tolls, state taxes, parking fees, driver allowance, and fuel charges. There are absolutely no hidden charges.',
        },
        {
          question: 'Do rates change during peak season?',
          answer:
            'Rates shown are for off-season. During peak season (April-June, October-November), rates may be 10-20% higher due to increased demand. Please contact us for exact peak season rates.',
        },
        {
          question: 'How do I book a taxi?',
          answer:
            'You can book instantly via WhatsApp, call us directly, or submit a query through our contact form. We recommend booking at least 24 hours in advance, especially during peak season.',
        },
        {
          question: 'What is your cancellation policy?',
          answer:
            'Free cancellation up to 24 hours before pickup. Cancellations within 24 hours may incur a 20% charge. No-show bookings are non-refundable.',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Rates Page',
        subtitle: 'Pickup & Drop rates configuration',
      }
    },
  },
})
