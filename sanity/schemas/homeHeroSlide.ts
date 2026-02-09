import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homeHeroSlide',
  title: 'Hero Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Desktop Background Image',
      type: 'image',
      description: 'Desktop/Tablet hero image. Recommended: 1920x1080px (16:9 aspect ratio), Max 2MB, JPEG/WebP format for best performance. This is a full-width hero image.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility. Describe what is in the image.',
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Background Image (Optional)',
      type: 'image',
      description: 'Mobile-optimized hero image shown on phones (portrait orientation works best). Recommended: 768x1024px or 750x1000px (3:4 aspect ratio), Max 1MB, JPEG/WebP format. If not provided, desktop image will be used.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Alt text for mobile image. Leave empty to use desktop image alt text.',
        }
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Book Your Ride',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Internal link (e.g., /contact) or anchor (e.g., #tours)',
      initialValue: '/contact',
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge Text (Optional)',
      type: 'string',
      description: 'Small badge shown on slide (e.g., Trusted Since 2008)',
    }),
    defineField({
      name: 'hasSecondaryCTA',
      title: 'Show Secondary CTA',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Text',
      type: 'string',
      hidden: ({parent}) => !parent?.hasSecondaryCTA,
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'string',
      hidden: ({parent}) => !parent?.hasSecondaryCTA,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
