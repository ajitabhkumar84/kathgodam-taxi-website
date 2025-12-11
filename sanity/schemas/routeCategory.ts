import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'routeCategory',
  title: 'Route Category',
  type: 'object',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., "Popular Destinations", "Temple Tours"',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'categorySlug',
      title: 'Category Slug',
      type: 'slug',
      description: 'URL-friendly anchor link (e.g., popular-destinations, temple-tours)',
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
      description: 'Icon identifier (mountain, temple, city, etc.)',
      options: {
        list: [
          {title: 'Mountain', value: 'mountain'},
          {title: 'Temple', value: 'temple'},
          {title: 'City', value: 'city'},
          {title: 'Lake', value: 'lake'},
          {title: 'Nature', value: 'nature'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'mountain',
    }),
    defineField({
      name: 'routes',
      title: 'Routes in Category',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'route'}]}],
      description: 'Select routes for this category. Drag to reorder. Recommended: 6-12 routes per category.',
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
      routeCount: 'routes.length',
      order: 'displayOrder',
    },
    prepare(selection) {
      const {title, routeCount, order} = selection
      return {
        title: title,
        subtitle: `${routeCount || 0} routes | Order: ${order}`,
      }
    },
  },
})
