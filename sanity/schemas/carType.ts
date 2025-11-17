import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'carType',
  title: 'Car Type',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Car Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Car Model',
      type: 'string',
      description: 'e.g., Alto / Alto K10',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Passenger Capacity',
      type: 'string',
      description: 'e.g., Up to 4 passengers',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seasonPrice',
      title: 'Season Price',
      type: 'string',
      description: 'Price during peak season (e.g., ₹1,300)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'offSeasonPrice',
      title: 'Off-Season Price',
      type: 'string',
      description: 'Price during off-season (e.g., ₹1,100)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Car Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        }
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'model',
      media: 'image',
    },
  },
})
