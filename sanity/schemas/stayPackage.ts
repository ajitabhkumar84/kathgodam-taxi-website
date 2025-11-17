import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stayPackage',
  title: 'Stay Package',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'e.g., Alto/Alto K10 + 1 Room (Twin Sharing)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seasonPrice',
      title: 'Season Price',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'offSeasonPrice',
      title: 'Off-Season Price',
      type: 'string',
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
      subtitle: 'description',
    },
  },
})
