import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sightseeingTour',
  title: 'Sightseeing Tour',
  type: 'document',
  fields: [
    // Basic Tour Info
    defineField({
      name: 'name',
      title: 'Tour Name',
      type: 'string',
      description: 'e.g., Kainchi Dham Day Tour',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (e.g., kainchi-dham-day-tour)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tourType',
      title: 'Tour Type',
      type: 'string',
      options: {
        list: [
          {title: 'Full Day', value: 'Full Day'},
          {title: 'Half Day', value: 'Half Day'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 8-9 Hours',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'distance',
      title: 'Total Distance',
      type: 'string',
      description: 'e.g., 120 KM Round Trip',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          {title: 'Easy', value: 'Easy'},
          {title: 'Moderate', value: 'Moderate'},
          {title: 'Challenging', value: 'Challenging'},
        ],
      },
      initialValue: 'Easy',
    }),
    defineField({
      name: 'price',
      title: 'Starting Price',
      type: 'string',
      description: 'e.g., ₹2,500',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bestTime',
      title: 'Best Time to Visit',
      type: 'string',
      description: 'e.g., October to June',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pickupLocation',
      title: 'Pickup Location',
      type: 'string',
      description: 'e.g., Kathgodam Railway Station / Nainital Hotels',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dropLocation',
      title: 'Drop-off Location',
      type: 'string',
      description: 'e.g., Same as pickup location',
      validation: (Rule) => Rule.required(),
    }),

    // Hero Slider
    defineField({
      name: 'heroSlides',
      title: 'Hero Slider Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),

    // Overview Section
    defineField({
      name: 'overviewDescription',
      title: 'Overview Description',
      type: 'text',
      rows: 4,
      description: 'Main description of the tour',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Tour Highlights',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key highlights of the tour',
      validation: (Rule) => Rule.required().min(3).max(8),
    }),

    // Itinerary
    defineField({
      name: 'itinerary',
      title: 'Detailed Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Time',
              type: 'string',
              description: 'e.g., 08:00 AM',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Activity Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'e.g., 1 hour',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'time',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(3),
    }),

    // Places Included
    defineField({
      name: 'placesIncluded',
      title: 'Places Covered',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Place Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'timeSpent',
              title: 'Time Spent',
              type: 'string',
              description: 'e.g., 1-2 hours',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'highlights',
              title: 'Place Highlights',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Key features of this place',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'timeSpent',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2),
    }),

    // Pricing (Vehicle Options)
    defineField({
      name: 'pricing',
      title: 'Vehicle Pricing Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'vehicleType',
              title: 'Vehicle Type',
              type: 'string',
              description: 'e.g., Sedan, SUV',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'model',
              title: 'Car Model',
              type: 'string',
              description: 'e.g., Swift Dzire, Ertiga',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'capacity',
              title: 'Passenger Capacity',
              type: 'string',
              description: 'e.g., 4 passengers',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g., ₹2,500',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{type: 'string'}],
              validation: (Rule) => Rule.required().min(2),
            },
            {
              name: 'image',
              title: 'Vehicle Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'vehicleType',
              subtitle: 'price',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Inclusions & Exclusions
    defineField({
      name: 'inclusions',
      title: "What's Included",
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'exclusions',
      title: "What's Not Included",
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(2),
    }),

    // Additional Info
    defineField({
      name: 'thingsToCarry',
      title: 'Things to Carry',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of recommended items to bring',
    }),
    defineField({
      name: 'importantInfo',
      title: 'Important Information',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Important notes, restrictions, or guidelines',
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),

    // Related Tours
    defineField({
      name: 'relatedTours',
      title: 'Related Tours',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'sightseeingTour'}]}],
      description: 'Similar tours that users might be interested in',
    }),

    // Map & Location
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Custom Google Maps embed URL showing the tour route',
    }),
    defineField({
      name: 'weatherLatitude',
      title: 'Weather Widget Latitude',
      type: 'number',
      description: 'Latitude for weather widget',
      validation: (Rule) => Rule.min(-90).max(90),
    }),
    defineField({
      name: 'weatherLongitude',
      title: 'Weather Widget Longitude',
      type: 'number',
      description: 'Longitude for weather widget',
      validation: (Rule) => Rule.min(-180).max(180),
    }),

    // SEO
    defineField({
      name: 'pageTitle',
      title: 'Page Title (SEO)',
      type: 'string',
      description: 'SEO title for the page',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'string',
      description: 'Comma-separated keywords for SEO',
    }),

    // Published status
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Set to true to make this tour visible on the website',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'tourType',
      published: 'published',
    },
    prepare(selection) {
      const {title, subtitle, published} = selection
      return {
        title: title,
        subtitle: `${subtitle} | ${published ? '✅ Published' : '❌ Draft'}`,
      }
    },
  },

  orderings: [
    {
      title: 'Tour Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})
