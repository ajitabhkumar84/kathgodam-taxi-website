import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'corporateClient',
  title: 'Corporate Clients Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Kathgodam Taxi Corporate Clients & Tour Operators',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      initialValue: 'We are the preferred taxi partner for the following corporate and tour operators',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      initialValue: 'Trusted by leading travel companies and tour operators across India',
    }),
    defineField({
      name: 'clients',
      title: 'Client Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Client Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'logo',
              title: 'Client Logo',
              type: 'image',
              description: 'Recommended: 200x100px (2:1 aspect ratio), Max 200KB, PNG format with transparent background preferred. Logo will be displayed in grayscale and colored on hover.',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description: 'Usually just the company name',
                }
              ],
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which the logo appears (lower numbers first)',
              initialValue: 1,
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
              order: 'order',
            },
            prepare(selection: any) {
              const {title, media, order} = selection
              return {
                title: title,
                subtitle: `Order: ${order || 'Not set'}`,
                media: media,
              }
            },
          },
        },
      ],
      description: 'Add 4-12 client logos. Recommended: 8 logos for best display.',
      validation: (Rule) => Rule.min(4).max(12),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Corporate Clients Section',
        subtitle: 'Homepage content',
      }
    },
  },
})
