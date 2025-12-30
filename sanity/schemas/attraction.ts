import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'attraction',
  title: 'Attraction',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Attraction Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Attraction Image',
      type: 'image',
      description: 'Recommended: 800x800px (1:1 square aspect ratio), Max 1MB, JPEG/WebP format. Image should showcase the attraction prominently.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility. Describe the attraction shown.',
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
    },
  },
})
