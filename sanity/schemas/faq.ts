import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required().error('FAQ Question is required'),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description: 'Supports HTML tags like <strong>, <br>, etc.',
      validation: (Rule) => Rule.required().error('FAQ Answer is required'),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
})
