import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'templeCategory',
  title: 'Temple Category',
  type: 'object',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., "Shiva Temples", "Shakti Temples", "Spiritual Ashrams"',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'categorySlug',
      title: 'Category Slug',
      type: 'slug',
      description: 'URL-friendly anchor link (e.g., shiva-temples, shakti-temples)',
      options: {
        source: 'categoryName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryDescription',
      title: 'Category Description',
      type: 'text',
      rows: 2,
      description: 'Short description shown below category heading',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'icon',
      title: 'Category Icon',
      type: 'string',
      description: 'Icon identifier for the category',
      options: {
        list: [
          {title: 'Temple', value: 'temple'},
          {title: 'Om', value: 'om'},
          {title: 'Shiva (Trishul)', value: 'shiva'},
          {title: 'Shakti (Devi)', value: 'shakti'},
          {title: 'Lotus', value: 'lotus'},
          {title: 'Mountain', value: 'mountain'},
          {title: 'Star', value: 'star'},
          {title: 'Heritage', value: 'heritage'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'temple',
    }),
    defineField({
      name: 'temples',
      title: 'Temples in Category',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'temple'}]}],
      description: 'Select temples for this category. Drag to reorder.',
      validation: (Rule) => Rule.required().min(1).max(30),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order categories appear on the page (lower numbers first)',
      validation: (Rule) => Rule.required().integer().min(1),
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'categoryName',
      templeCount: 'temples.length',
      order: 'displayOrder',
    },
    prepare(selection) {
      const {title, templeCount, order} = selection
      return {
        title: title,
        subtitle: `${templeCount || 0} temples | Order: ${order}`,
      }
    },
  },
})
