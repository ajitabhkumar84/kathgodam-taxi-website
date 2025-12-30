import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'packageCategory',
  title: 'Package Category',
  type: 'object',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., "Short Packages", "Temple Tour", "Club Mahindra"',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'categorySlug',
      title: 'Category Slug',
      type: 'slug',
      description: 'URL-friendly anchor link (e.g., short-packages, temple-tour)',
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
      description: 'Icon identifier for this category',
      options: {
        list: [
          {title: 'Calendar (Short Duration)', value: 'calendar'},
          {title: 'Clock (Medium Duration)', value: 'clock'},
          {title: 'Star (Premium/Long)', value: 'star'},
          {title: 'Temple', value: 'temple'},
          {title: 'Mountain', value: 'mountain'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'calendar',
    }),
    defineField({
      name: 'packages',
      title: 'Packages in Category',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'package'}]}],
      description: 'Select packages for this category. Same package can appear in multiple categories. Drag to reorder.',
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
      packageCount: 'packages.length',
      order: 'displayOrder',
    },
    prepare(selection) {
      const {title, packageCount, order} = selection
      return {
        title: title,
        subtitle: `${packageCount || 0} packages | Order: ${order}`,
      }
    },
  },
})
