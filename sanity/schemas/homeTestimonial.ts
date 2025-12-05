import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homeTestimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or region (e.g., New Delhi, Mumbai)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      rating: 'rating',
    },
    prepare({title, subtitle, rating}) {
      return {
        title: title,
        subtitle: `${subtitle} - ${rating}/5 stars`,
      }
    },
  },
})
