import { defineType } from 'sanity';

export default defineType({
  name: 'inclusionExclusionItem',
  title: 'Inclusion/Exclusion Item',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Item Title',
      type: 'string',
      description: 'e.g., "Car Rental", "Toll Charges"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Item Description',
      type: 'string',
      description: 'Brief description of the item',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
});
