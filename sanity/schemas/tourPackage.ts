import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tourPackage',
  title: 'Tour Package',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g., Nainital Local Tour',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., From ₹5,500',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'popular',
      title: 'Popular Package',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
    },
  },
})
