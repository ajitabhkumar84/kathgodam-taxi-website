import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'whyChooseUs',
  title: 'Why Choose Us Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'A Safe, Hassle-Free Experience',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      initialValue: "We're committed to providing you with transparent pricing and exceptional service for your journey through the Kumaon hills.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Section Image',
      type: 'image',
      description: 'Recommended: 800x600px (4:3 aspect ratio), Max 1MB, JPEG/WebP format. Shows your clean, modern taxi or service quality.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for SEO and accessibility',
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 2,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Choose an icon type',
              options: {
                list: [
                  {title: 'Clipboard Check (Fixed Pricing)', value: 'clipboard'},
                  {title: 'Dollar Sign (No Hidden Fees)', value: 'dollar'},
                  {title: 'Check Mark (Clean Cars)', value: 'check'},
                  {title: 'Users (Expert Drivers)', value: 'users'},
                  {title: 'Shield (Safety)', value: 'shield'},
                  {title: 'Clock (Punctual)', value: 'clock'},
                  {title: 'Star (5-Star Service)', value: 'star'},
                  {title: 'Award (Award Winning)', value: 'award'},
                ],
              },
              initialValue: 'check',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      description: 'Add 3-6 key features of your service',
      validation: (Rule) => Rule.min(3).max(6),
      initialValue: [
        {
          title: 'Crystal Clear Fixed Pricing',
          description: 'No surprises. The price we quote is the price you pay.',
          icon: 'clipboard',
        },
        {
          title: 'No Hidden Fees',
          description: 'All our prices include tolls, state taxes, and driver allowances.',
          icon: 'dollar',
        },
        {
          title: 'Well-Maintained & Clean Cars',
          description: 'Our fleet is professionally maintained for your comfort and safety.',
          icon: 'check',
        },
        {
          title: 'Local Expert Drivers',
          description: 'Our courteous, local drivers are your guides to the hills.',
          icon: 'users',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Why Choose Us Section',
        subtitle: 'Homepage content',
      }
    },
  },
})
