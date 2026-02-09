import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'carType',
  title: 'Car Type',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Car Name',
      type: 'string',
      description: 'Car category name (Hatchback, Sedan, SUV Standard, SUV Deluxe, SUV Luxury)',
    }),
    defineField({
      name: 'model',
      title: 'Car Model',
      type: 'string',
      description: 'e.g., Alto, Dzire, Ertiga/Xylo, Innova, Innova Crysta',
    }),
    defineField({
      name: 'capacity',
      title: 'Passenger Capacity',
      type: 'string',
      description: 'e.g., Up to 4 passengers, Up to 6 passengers, Up to 7 passengers',
    }),
    defineField({
      name: 'seasonPrice',
      title: 'Season Price',
      type: 'string',
      description: 'Price during peak season (e.g., ₹1,300) - Optional',
    }),
    defineField({
      name: 'offSeasonPrice',
      title: 'Off-Season Price',
      type: 'string',
      description: 'Price during off-season (e.g., ₹1,100) - Optional',
    }),
    defineField({
      name: 'image',
      title: 'Car Image (Optional)',
      type: 'image',
      description: 'Optional: Override the default car image for this specific route. If not provided, will use the default image from Site Settings.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the car model (e.g., "White Toyota Innova Crysta")',
        }
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of features for this car type (defaults are set for each category)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'model',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Car Type',
        subtitle: subtitle || 'Model not set',
      }
    },
  },
})
