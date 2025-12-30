import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'safetyBanner',
  title: 'Safety Banner (Route Pages)',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Banner',
      type: 'boolean',
      description: 'Toggle to show/hide the safety banner on route and package pages',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          {title: 'Gradient (Green to Teal)', value: 'gradient-green'},
          {title: 'Solid Green', value: 'solid-green'},
          {title: 'Dark (Black/Gray)', value: 'dark'},
          {title: 'Light with Border', value: 'light'},
        ],
      },
      initialValue: 'gradient-green',
    }),
    defineField({
      name: 'badges',
      title: 'Quick Safety Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Badge Text',
              type: 'string',
              description: 'Short text (2-4 words recommended)',
              validation: (Rule: any) => Rule.required().max(30),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Shield', value: 'shield'},
                  {title: 'Check Circle', value: 'checkCircle'},
                  {title: 'User Check', value: 'userCheck'},
                  {title: 'No Alcohol', value: 'noAlcohol'},
                  {title: 'Star', value: 'star'},
                  {title: 'Clock', value: 'clock'},
                  {title: 'GPS', value: 'gps'},
                ],
              },
              initialValue: 'checkCircle',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'text',
            },
          },
        },
      ],
      description: 'Add 3-5 quick safety points (keep text short)',
      validation: (Rule) => Rule.min(3).max(6),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Safety Banner (Route Pages)',
        subtitle: 'Slim banner strip configuration',
      }
    },
  },
})
