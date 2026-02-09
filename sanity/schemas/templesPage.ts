import {defineField, defineType} from 'sanity'
import {createStaticPageUrlInput} from '../components/StaticPageUrlInput'

export default defineType({
  name: 'templesPage',
  title: 'Temples Page',
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
        input: createStaticPageUrlInput('/temples', 'Temples Page')
      }
    }),
    // SEO Fields
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'SEO title for temples page',
      validation: (Rule) => Rule.required().max(60),
      initialValue: 'Sacred Temples of Kumaon - Temple Taxi Services',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description',
      validation: (Rule) => Rule.required().max(160),
      initialValue:
        'Explore the sacred temples of Kumaon Hills. Book reliable taxi services to Kainchi Dham, Jageshwar, Naina Devi and more.',
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'string',
      description: 'Comma-separated keywords',
      initialValue:
        'Kumaon temples, temple tour taxi, Kainchi Dham taxi, Jageshwar temple, spiritual tourism Uttarakhand, Naina Devi taxi',
    }),

    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Sacred Temples of Kumaon',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        'Discover ancient temples, spiritual ashrams, and sacred sites across the Kumaon Hills. Book reliable taxi services for your pilgrimage.',
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: 'Spiritual Destinations',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Background image for hero section. Recommended: 1920x1080px (16:9 aspect ratio), Max 2MB, JPEG/WebP format for optimal display across devices',
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
        'The Kumaon region of Uttarakhand is home to some of the most sacred temples and spiritual destinations in India. From ancient Shiva temples in Deodar forests to renowned ashrams that have attracted spiritual seekers from around the world, explore our comprehensive guide to the temples of Kumaon.',
    }),

    // Filter Settings
    defineField({
      name: 'showFilters',
      title: 'Show Filter Bar',
      type: 'boolean',
      description: 'Display filter bar with search, district, and type filters',
      initialValue: true,
    }),
    defineField({
      name: 'filterByDistrictEnabled',
      title: 'Enable District Filter',
      type: 'boolean',
      description: 'Allow filtering by district (Nainital, Almora, etc.)',
      initialValue: true,
    }),
    defineField({
      name: 'filterByTypeEnabled',
      title: 'Enable Temple Type Filter',
      type: 'boolean',
      description: 'Allow filtering by temple type (Shiva, Shakti, Ashram, etc.)',
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

    // Temple Categories
    defineField({
      name: 'templeCategories',
      title: 'Temple Categories',
      type: 'array',
      of: [{type: 'templeCategory'}],
      description:
        'Add and organize temple categories. Drag to reorder. Each category will appear as a separate section on the page.',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),

    // Bottom CTA Section
    defineField({
      name: 'bottomCtaHeading',
      title: 'Bottom CTA Heading',
      type: 'string',
      initialValue: 'Plan Your Temple Tour',
    }),
    defineField({
      name: 'bottomCtaText',
      title: 'Bottom CTA Text',
      type: 'text',
      rows: 2,
      initialValue:
        'We can help you plan a customized temple tour covering multiple sacred sites in Kumaon. Contact us for a personalized itinerary.',
    }),

    // Additional Info Section
    defineField({
      name: 'showAdditionalInfo',
      title: 'Show Additional Information Section',
      type: 'boolean',
      description: 'Display temple visiting tips and information',
      initialValue: true,
    }),
    defineField({
      name: 'additionalInfoTitle',
      title: 'Additional Info Section Title',
      type: 'string',
      initialValue: 'Temple Visiting Tips',
    }),
    defineField({
      name: 'additionalInfoPoints',
      title: 'Information Points',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key tips for temple visitors',
      initialValue: [
        'Dress modestly when visiting temples - cover shoulders and knees',
        'Remove footwear before entering temple premises',
        'Morning visits recommended for darshan to avoid crowds',
        'Carry water and light snacks for hill temples',
        'Book return taxi in advance for remote temples',
        'Photography may be restricted inside some temples',
        'Respect local customs and traditions',
      ],
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'Temples Page FAQs',
      type: 'array',
      of: [{type: 'faq'}],
      description: 'General FAQs about temple visits and taxi services',
      initialValue: [
        {
          question: 'Which is the most popular temple in Kumaon?',
          answer:
            'Kainchi Dham, the ashram of Neem Karoli Baba (Maharaj-ji), is currently the most searched spiritual destination in Uttarakhand. Other popular temples include Jageshwar Dham (cluster of 124 ancient temples), Naina Devi Temple in Nainital, and Chitai Golu Devta temple.',
        },
        {
          question: 'How do I book a taxi for temple visits?',
          answer:
            'You can book a taxi for temple visits via WhatsApp, phone call, or through our website. For multiple temple visits, we recommend our temple tour packages which offer better value. Book at least 24 hours in advance.',
        },
        {
          question: 'Are all temples accessible by car?',
          answer:
            'Most temples are accessible by car, but some ancient temples may require a short trek. For example, Mahavatar Babaji Cave requires a moderate trek of about 3 km. We drop you at the nearest accessible point.',
        },
        {
          question: 'What is the best time to visit temples in Kumaon?',
          answer:
            'The best time to visit temples in Kumaon is March to June (spring/summer) and September to November (autumn). Monsoon season (July-August) can make travel difficult, and some temples may have restricted access during winter.',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Temples Page',
        subtitle: 'Temple listing page configuration',
      }
    },
  },
})
