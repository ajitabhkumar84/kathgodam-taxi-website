import {defineField, defineType} from 'sanity'
import {createStaticPageUrlInput} from '../components/StaticPageUrlInput'

export default defineType({
  name: 'packagesPage',
  title: 'Packages Page',
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
        input: createStaticPageUrlInput('/packages', 'Packages Page')
      }
    }),
    // SEO Fields
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'SEO title for packages page',
      validation: (Rule) => Rule.required().max(60),
      initialValue: 'Tour Packages - Multi-Day Tours in Kumaon Hills',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description',
      validation: (Rule) => Rule.required().max(160),
      initialValue:
        'Explore our curated tour packages for the Kumaon region. From short getaways to temple tours and premium Club Mahindra packages.',
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'string',
      description: 'Comma-separated keywords',
      initialValue:
        'Kumaon tour packages, Nainital packages, temple tour package, Club Mahindra taxi, multi-day tours',
    }),

    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Tour Packages',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        'Curated multi-day tours covering the best of Kumaon Hills. All-inclusive packages with accommodation, sightseeing, and more.',
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: 'All-Inclusive Tours',
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
        'Browse our comprehensive collection of tour packages designed to showcase the beauty of the Kumaon region. From quick weekend getaways to extensive temple tours, we have something for every traveler.',
    }),

    // Filter Settings
    defineField({
      name: 'showFilters',
      title: 'Show Filter Bar',
      type: 'boolean',
      description: 'Display search and filter options',
      initialValue: true,
    }),
    defineField({
      name: 'filterByDurationEnabled',
      title: 'Enable Duration Filter',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'filterByPriceEnabled',
      title: 'Enable Price Range Filter',
      type: 'boolean',
      initialValue: true,
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

    // Package Categories
    defineField({
      name: 'packageCategories',
      title: 'Package Categories',
      type: 'array',
      of: [{type: 'packageCategory'}],
      description:
        'Add and organize package categories. Packages can appear in multiple categories. Drag to reorder.',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),

    // Bottom CTA Section
    defineField({
      name: 'bottomCtaHeading',
      title: 'Bottom CTA Heading',
      type: 'string',
      initialValue: 'Need a Custom Package?',
    }),
    defineField({
      name: 'bottomCtaText',
      title: 'Bottom CTA Text',
      type: 'text',
      rows: 2,
      initialValue:
        'We can customize any package to match your requirements. Contact us to create your perfect Kumaon experience.',
    }),

    // Additional Info Section
    defineField({
      name: 'showAdditionalInfo',
      title: 'Show Additional Information Section',
      type: 'boolean',
      description: 'Display information about packages, terms, etc.',
      initialValue: true,
    }),
    defineField({
      name: 'additionalInfoTitle',
      title: 'Additional Info Section Title',
      type: 'string',
      initialValue: 'What You Need to Know',
    }),
    defineField({
      name: 'additionalInfoPoints',
      title: 'Information Points',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key points about packages and booking',
      initialValue: [
        'All packages are customizable based on your preferences',
        'Accommodation options range from budget to luxury',
        'Prices vary based on season and accommodation choices',
        'Early booking recommended for peak season (April-June, Oct-Nov)',
        'Free consultation to help you choose the right package',
      ],
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'Packages Page FAQs',
      type: 'array',
      of: [{type: 'faq'}],
      description: 'General FAQs about packages and booking',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Packages Page',
        subtitle: 'Tour packages configuration',
      }
    },
  },
})
