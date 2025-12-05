import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    // Brand Section
    defineField({
      name: 'brandDescription',
      title: 'Brand Description',
      type: 'text',
      rows: 3,
      description: 'Short description shown in footer brand section',
      initialValue: 'Your trusted taxi partner for exploring the beautiful Kumaon hills. Safe, reliable, and comfortable travel since 2008.',
    }),

    // Navigation Links Section
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
      description: 'Footer navigation menu items',
      initialValue: [
        {label: 'Home', href: '/'},
        {label: 'Our Tours', href: '#tours'},
        {label: 'Our Fleet', href: '#fleet'},
        {label: 'Reviews', href: '#reviews'},
      ],
    }),

    // Services Links Section
    defineField({
      name: 'serviceLinks',
      title: 'Service Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
      description: 'Popular service/route links',
      initialValue: [
        {label: 'Kathgodam to Nainital', href: '/kathgodam-nainital'},
        {label: 'Kainchi Dham Visit', href: '#'},
        {label: 'Mukteshwar Tour', href: '#'},
        {label: 'Airport Transfers', href: '#'},
      ],
    }),

    // Contact Section
    defineField({
      name: 'contactSectionTitle',
      title: 'Contact Section Title',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'submitQueryLabel',
      title: 'Submit Query Button Label',
      type: 'string',
      initialValue: 'Submit Query',
    }),
    defineField({
      name: 'submitQueryLink',
      title: 'Submit Query Link',
      type: 'string',
      initialValue: '/contact',
    }),

    // Copyright
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright text. Use {year} for current year.',
      initialValue: '{year} Kathgodam Taxi. All rights reserved.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
        subtitle: 'Footer content and links',
      }
    },
  },
})
