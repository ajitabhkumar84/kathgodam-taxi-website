import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Internal link (e.g., /contact) or anchor (e.g., #tours). Leave empty if using dropdown.',
            },
            {
              name: 'hasDropdown',
              title: 'Has Dropdown?',
              type: 'boolean',
              description: 'Enable dropdown menu for this link',
              initialValue: false,
            },
            {
              name: 'dropdownItems',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'string',
                      description: 'Short description shown below label (optional)',
                    },
                    {
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      description: 'Internal link (e.g., /rates) or anchor (e.g., #routes)',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      description: 'Icon name (optional): taxi, map, list, location',
                      options: {
                        list: [
                          {title: 'Taxi', value: 'taxi'},
                          {title: 'Map', value: 'map'},
                          {title: 'List', value: 'list'},
                          {title: 'Location Pin', value: 'location'},
                        ],
                      },
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'href',
                    },
                  },
                },
              ],
              hidden: ({parent}) => !parent?.hasDropdown,
              description: 'Items shown in dropdown menu',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              hasDropdown: 'hasDropdown',
            },
            prepare({title, subtitle, hasDropdown}) {
              return {
                title,
                subtitle: hasDropdown ? '↓ Dropdown Menu' : subtitle,
              }
            },
          },
        },
      ],
      description: 'Main navigation menu items. Drag to reorder.',
      validation: (Rule) => Rule.required().min(1),
      initialValue: [
        {label: 'Home', href: '/', hasDropdown: false},
        {
          label: 'Pickup & Drop',
          href: '#routes',
          hasDropdown: true,
          dropdownItems: [
            {
              label: 'All Routes & Rates',
              description: 'View all destinations with pricing',
              href: '/rates',
              icon: 'list',
            },
            {
              label: 'Popular Routes',
              description: 'Most requested taxi routes',
              href: '#routes',
              icon: 'taxi',
            },
          ],
        },
        {label: 'Car Rental for Tour', href: '/taxi-for-complete-tour', hasDropdown: false},
        {label: 'Tour Packages', href: '#tours', hasDropdown: false},
        {label: 'Temples in Kumaon', href: '#temples', hasDropdown: false},
        {label: 'Contact', href: '/contact', hasDropdown: false},
      ],
    }),
    defineField({
      name: 'bookNowLabel',
      title: 'Book Now Button Label',
      type: 'string',
      initialValue: 'Book Now',
    }),
    defineField({
      name: 'bookNowOptions',
      title: 'Book Now Dropdown Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'sublabel',
              title: 'Sublabel',
              type: 'string',
              description: 'Small text below label (optional)',
            },
            {
              name: 'type',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  {title: 'WhatsApp', value: 'whatsapp'},
                  {title: 'Phone', value: 'phone'},
                  {title: 'Internal Link', value: 'link'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link (for internal links)',
              type: 'string',
              description: 'Only for type=link (e.g., /contact)',
              hidden: ({parent}) => parent?.type !== 'link',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'type',
            },
          },
        },
      ],
      initialValue: [
        {label: 'WhatsApp', sublabel: 'Instant booking', type: 'whatsapp'},
        {label: 'Call Now', sublabel: '7351721351', type: 'phone'},
        {label: 'Submit Query', sublabel: 'Get custom quote', type: 'link', href: '/contact'},
      ],
    }),
    defineField({
      name: 'mobileMenuLabel',
      title: 'Mobile Menu Label',
      type: 'string',
      initialValue: 'Menu',
    }),
    defineField({
      name: 'showSearch',
      title: 'Show Search Button',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle search button visibility',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navbar',
        subtitle: 'Navigation menu configuration',
      }
    },
  },
})
