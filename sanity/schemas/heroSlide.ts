import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Slide Image',
      type: 'image',
      description: 'Recommended: 1920x1080px (16:9 aspect ratio), Max 2MB, JPEG/WebP format. Hero slider images should be landscape and showcase scenic views.',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      description: 'e.g., Scenic Drive from Kathgodam to Nainital',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Slide Description',
      type: 'string',
      description: 'Short description for the slide',
      validation: (Rule) => Rule.required(),
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
