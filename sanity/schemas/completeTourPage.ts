import { defineType } from 'sanity';
import {createStaticPageUrlInput} from '../components/StaticPageUrlInput'

export default defineType({
  name: 'completeTourPage',
  title: 'Complete Tour Page',
  type: 'document',
  fields: [
    // Page URL
    {
      name: 'pageUrl',
      title: '🌐 Page URL',
      type: 'string',
      description: 'The live URL of this page',
      readOnly: true,
      components: {
        input: createStaticPageUrlInput('/taxi-for-complete-tour', 'Complete Tour Page')
      }
    },
    // SEO & Meta
    {
      name: 'seo',
      title: 'SEO & Meta Data',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Page Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required().max(160),
        },
        {
          name: 'keywords',
          title: 'Meta Keywords',
          type: 'string',
          description: 'Comma-separated keywords',
        },
      ],
    },

    // Hero Section
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Trust Badge',
          type: 'string',
          description: 'e.g., "Trusted by 500+ Happy Travelers"',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'headline',
          title: 'Main Headline',
          type: 'object',
          fields: [
            {
              name: 'line1',
              title: 'Line 1',
              type: 'string',
              description: 'e.g., "Your Complete"',
            },
            {
              name: 'line2',
              title: 'Line 2 (Highlighted)',
              type: 'string',
              description: 'e.g., "Uttarakhand Journey"',
            },
            {
              name: 'line3',
              title: 'Line 3',
              type: 'string',
              description: 'e.g., "Awaits"',
            },
          ],
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'heroImage',
          title: 'Desktop Hero Image',
          type: 'image',
          description: 'Desktop/Tablet hero image. Recommended: 1920x1080px (16:9 aspect ratio), Max 2MB, JPEG/WebP format.',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
        {
          name: 'mobileHeroImage',
          title: 'Mobile Hero Image (Optional)',
          type: 'image',
          description: 'Mobile-optimized hero image shown on phones. Recommended: 768x1024px or 750x1000px (3:4 aspect ratio), Max 1MB, JPEG/WebP format. If not provided, desktop image will be used.',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Leave empty to use desktop image alt text.',
            },
          ],
        },
        {
          name: 'trustIndicators',
          title: 'Trust Indicators',
          type: 'array',
          description: 'Statistics displayed in hero (exactly 3)',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'number',
                  title: 'Number',
                  type: 'string',
                  description: 'e.g., "500+", "15+", "24/7"',
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  description: 'e.g., "Happy Travelers", "Years Experience"',
                },
              ],
              preview: {
                select: {
                  title: 'number',
                  subtitle: 'label',
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().length(3),
        },
      ],
    },

    // Pricing Section
    {
      name: 'pricingSection',
      title: 'Pricing Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Choose Your Ride',
        },
        {
          name: 'subheading',
          title: 'Section Subheading',
          type: 'text',
          rows: 2,
          initialValue: 'Per day rates for various car categories - transparent pricing for every season',
        },
        {
          name: 'seasonLabel',
          title: 'Season Rate Label',
          type: 'string',
          initialValue: 'Season Rates',
        },
        {
          name: 'seasonDateRanges',
          title: 'Season Date Ranges',
          type: 'array',
          description: 'Date ranges for peak season (e.g., "15 Apr - 10 Jul", "20 Dec - 15 Jan")',
          of: [{ type: 'string' }],
        },
        {
          name: 'seasonDescription',
          title: 'Season Description',
          type: 'string',
          description: 'Optional description shown below season label',
          initialValue: 'Peak tourist season',
        },
        {
          name: 'midSeasonLabel',
          title: 'Mid Season Label',
          type: 'string',
          initialValue: 'Mid Season',
        },
        {
          name: 'midSeasonDateRanges',
          title: 'Mid Season Date Ranges',
          type: 'array',
          description: 'Date ranges for mid season (e.g., "Jan - 14 Apr", "Nov")',
          of: [{ type: 'string' }],
        },
        {
          name: 'midSeasonDescription',
          title: 'Mid Season Description',
          type: 'string',
          description: 'Optional description shown below mid season label',
          initialValue: 'Moderate season',
        },
        {
          name: 'offSeasonLabel',
          title: 'Off-Season Label',
          type: 'string',
          initialValue: 'Off-Season Rates',
        },
        {
          name: 'offSeasonDateRanges',
          title: 'Off-Season Date Ranges',
          type: 'array',
          description: 'Date ranges for off-season (e.g., "Rest of the year")',
          of: [{ type: 'string' }],
        },
        {
          name: 'offSeasonDescription',
          title: 'Off-Season Description',
          type: 'string',
          description: 'Optional description shown below off-season label',
          initialValue: 'Off-peak season',
        },
        {
          name: 'carCategories',
          title: 'Car Categories',
          type: 'array',
          of: [{ type: 'multiDayCarCategory' }],
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'noteText',
          title: 'Pricing Note',
          type: 'text',
          rows: 2,
          initialValue: 'Above charges are general rates. Exact charges depend on itinerary and number of days.',
        },
      ],
    },

    // Inclusion & Exclusion Section
    {
      name: 'inclusionExclusionSection',
      title: 'What\'s Included & Excluded',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'What\'s Included & Excluded',
        },
        {
          name: 'subheading',
          title: 'Section Subheading',
          type: 'string',
          initialValue: 'Complete transparency - know exactly what you\'re paying for',
        },
        {
          name: 'included',
          title: 'What\'s Included',
          type: 'array',
          of: [{ type: 'inclusionExclusionItem' }],
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'excluded',
          title: 'What\'s NOT Included',
          type: 'array',
          of: [{ type: 'inclusionExclusionItem' }],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },

    // Tour Packages Section
    {
      name: 'packagesSection',
      title: 'Tour Duration Packages',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Choose Your Duration',
        },
        {
          name: 'subheading',
          title: 'Section Subheading',
          type: 'text',
          rows: 2,
          initialValue: 'Flexible packages tailored to your journey. The longer you travel, the more you save!',
        },
        {
          name: 'package1',
          title: 'Package 1 (3-4 Days)',
          type: 'tourDurationPackage',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'package2',
          title: 'Package 2 (5-7 Days)',
          type: 'tourDurationPackage',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'package3',
          title: 'Package 3 (8-10 Days)',
          type: 'tourDurationPackage',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'package4',
          title: 'Package 4 (Custom)',
          type: 'tourDurationPackage',
          validation: (Rule) => Rule.required(),
        },
      ],
    },

    // Popular Tour Itineraries Section
    {
      name: 'popularItinerariesSection',
      title: 'Popular Tour Itineraries',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Popular Tour Itineraries',
        },
        {
          name: 'subheading',
          title: 'Section Subheading',
          type: 'text',
          rows: 2,
          initialValue: 'Handpicked routes designed by local experts. Pick one or customize your own adventure.',
        },
        {
          name: 'featuredPackages',
          title: 'Featured Packages',
          type: 'array',
          description: 'Select existing tour packages to feature on this page',
          of: [
            {
              type: 'reference',
              to: [{ type: 'package' }],
            },
          ],
          validation: (Rule) => Rule.max(6),
        },
      ],
    },

    // Safety Section
    {
      name: 'safetySection',
      title: 'Safety Information',
      type: 'reference',
      to: [{ type: 'safetySection' }],
      description: 'Reference to the safety section content',
    },

    // FAQs Section
    {
      name: 'faqSection',
      title: 'FAQs Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Frequently Asked Questions',
        },
        {
          name: 'subheading',
          title: 'Section Subheading',
          type: 'string',
          initialValue: 'Everything you need to know about multi-day car rentals',
        },
        {
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          of: [{ type: 'faq' }],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },

    // CTA Section
    {
      name: 'ctaSection',
      title: 'Call-to-Action Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'CTA Heading',
          type: 'string',
          initialValue: 'Ready to Explore Uttarakhand?',
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 3,
          initialValue: 'Book your multi-day car rental today and experience Uttarakhand like never before. Flexible plans, transparent pricing, and unforgettable memories await.',
        },
        {
          name: 'features',
          title: 'CTA Features',
          type: 'array',
          description: 'Key features to highlight in CTA',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Feature Text',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'seo.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Complete Tour Page',
        subtitle: 'Multi-Day Car Rental Page',
      };
    },
  },
});
