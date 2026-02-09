import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Desktop Image',
      type: 'image',
      description: 'Desktop/Tablet hero image. Recommended: 1920x1080px (16:9 aspect ratio), Max 2MB, JPEG/WebP format. Hero slider images should be landscape and showcase scenic views.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility. Describe the scene or location shown.',
        }
      ],
      validation: (Rule) => Rule.required().error('Desktop Hero Slide Image is required'),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image (Optional)',
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
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      description: 'e.g., Scenic Drive from Kathgodam to Nainital',
      validation: (Rule) => Rule.required().error('Slide Title is required'),
    }),
    defineField({
      name: 'description',
      title: 'Slide Description',
      type: 'string',
      description: 'Short description for the slide',
      validation: (Rule) => Rule.required().error('Slide Description is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})
