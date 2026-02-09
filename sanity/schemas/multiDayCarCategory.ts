import { defineType } from 'sanity';

export default defineType({
  name: 'multiDayCarCategory',
  title: 'Multi-Day Car Category',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., "Hatchback Cars", "Sedan Cars", "SUV Deluxe"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'vehicles',
      title: 'Vehicle Models',
      type: 'string',
      description: 'e.g., "Alto, Alto K10" or "Innova (7 pax)"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Car Image',
      type: 'image',
      description: 'Image of the car category',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        },
      ],
    },
    {
      name: 'seasonPrice',
      title: 'Season Rate (per day)',
      type: 'number',
      description: 'Peak season price in ₹',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'midSeasonPrice',
      title: 'Mid Season Rate (per day)',
      type: 'number',
      description: 'Mid season price in ₹',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'offSeasonPrice',
      title: 'Off-Season Rate (per day)',
      type: 'number',
      description: 'Off season price in ₹',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'isPopular',
      title: 'Mark as Popular',
      type: 'boolean',
      description: 'Show "POPULAR" badge on this category',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category appears (lower numbers first)',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'vehicles',
      media: 'image',
      seasonPrice: 'seasonPrice',
    },
    prepare({ title, subtitle, media, seasonPrice }) {
      return {
        title: title,
        subtitle: `${subtitle} - ₹${seasonPrice}/day (season)`,
        media,
      };
    },
  },
});
