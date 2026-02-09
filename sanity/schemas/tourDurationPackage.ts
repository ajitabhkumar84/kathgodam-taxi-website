import { defineType } from 'sanity';

export default defineType({
  name: 'tourDurationPackage',
  title: 'Tour Duration Package',
  type: 'object',
  fields: [
    {
      name: 'badge',
      title: 'Package Badge',
      type: 'string',
      description: 'e.g., "SHORT GETAWAY", "CLASSIC TOUR", "EXTENDED TOUR"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "3-4 Days", "5-7 Days", "Custom"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g., "Perfect for weekends", "Most preferred choice"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Package Features',
      type: 'array',
      description: 'List of features/highlights for this package',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Feature Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isBold',
              title: 'Bold Text',
              type: 'boolean',
              description: 'Make this feature text bold/highlighted',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'text',
              isBold: 'isBold',
            },
            prepare({ title, isBold }) {
              return {
                title: isBold ? `⭐ ${title}` : title,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'whatsappMessage',
      title: 'WhatsApp Booking Message',
      type: 'string',
      description: 'Message to pre-fill when user clicks WhatsApp button',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isPopular',
      title: 'Mark as Popular',
      type: 'boolean',
      description: 'Show "POPULAR" badge on this package',
      initialValue: false,
    },
    {
      name: 'isCustomPackage',
      title: 'Is Custom Package',
      type: 'boolean',
      description: 'Use dark/premium styling for custom package',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      badge: 'badge',
      duration: 'duration',
      subtitle: 'subtitle',
      isPopular: 'isPopular',
    },
    prepare({ badge, duration, subtitle, isPopular }) {
      return {
        title: `${duration} - ${badge}`,
        subtitle: `${subtitle}${isPopular ? ' ⭐ POPULAR' : ''}`,
      };
    },
  },
});
