import {defineField, defineType} from 'sanity'
import {PreviewUrlInput} from '../components/PreviewUrlInput'

export default defineType({
  name: 'route',
  title: 'Route',
  type: 'document',
  fields: [
    // Route Basic Info
    defineField({
      name: 'from',
      title: 'From Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'to',
      title: 'To Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (e.g., kathgodam-nainital)',
      options: {
        source: (doc: any) => `${doc.from?.toLowerCase()}-${doc.to?.toLowerCase()}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previewUrl',
      title: '🌐 Production URL',
      type: 'string',
      description: 'This is the live URL of this route page',
      readOnly: true,
      components: {
        input: PreviewUrlInput
      }
    }),
    defineField({
      name: 'distance',
      title: 'Distance',
      type: 'string',
      description: 'e.g., 34 KM',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Journey Duration',
      type: 'string',
      description: 'e.g., 1 Hour',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price',
      type: 'string',
      description: 'e.g., ₹1,100',
      validation: (Rule) => Rule.required(),
    }),

    // Hero Slider
    defineField({
      name: 'heroSlides',
      title: 'Hero Slider Images',
      type: 'array',
      of: [{type: 'heroSlide'}],
      description: 'Add 2-5 images for the hero slider (recommended: 3 images)',
      validation: (Rule) => Rule.min(1).max(5),
    }),

    // Location Coordinates (for Weather & Maps)
    defineField({
      name: 'destinationLatitude',
      title: 'Destination Latitude',
      type: 'number',
      description: 'Latitude for weather widget and maps (e.g., 29.3803 for Nainital). Find on Google Maps.',
      validation: (Rule) => Rule.min(-90).max(90),
    }),
    defineField({
      name: 'destinationLongitude',
      title: 'Destination Longitude',
      type: 'number',
      description: 'Longitude for weather widget and maps (e.g., 79.4636 for Nainital). Find on Google Maps.',
      validation: (Rule) => Rule.min(-180).max(180),
    }),
    defineField({
      name: 'googleMapsEmbedUrl',
      title: 'Google Maps Embed URL (Optional)',
      type: 'url',
      description: 'Optional: Custom Google Maps embed URL. If not provided, will auto-generate from locations.',
    }),

    // Page Content
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
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
    defineField({
      name: 'introText1',
      title: 'Introduction Paragraph 1',
      type: 'text',
      rows: 3,
      description: 'First intro paragraph. Supports HTML like <strong>',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introText2',
      title: 'Introduction Paragraph 2',
      type: 'text',
      rows: 3,
      description: 'Second intro paragraph. Supports HTML like <strong>',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attractionsTitle',
      title: 'Attractions Section Title',
      type: 'string',
      description: 'e.g., Places Worth Seeing in Nainital',
      initialValue: 'Places Worth Seeing',
    }),

    // Car Types
    defineField({
      name: 'carTypes',
      title: 'Car Types & Pricing',
      type: 'array',
      of: [{type: 'carType'}],
      description: 'Default car types are pre-filled. You can edit any field including prices, features, or add/remove car types.',
      validation: (Rule) => Rule.required().min(1),
      initialValue: [
        {
          name: 'Hatchback',
          model: 'Alto',
          capacity: 'Up to 4 passengers',
          seasonPrice: '',
          offSeasonPrice: '',
          features: [
            'Compact Car - ideal for solo or couples',
            'Fuel efficient for mountain roads',
            'Experienced local driver',
            'AC is not available'
          ]
        },
        {
          name: 'Sedan',
          model: 'Dzire',
          capacity: 'Up to 4 passengers',
          seasonPrice: '',
          offSeasonPrice: '',
          features: [
            'Premium comfort & space',
            'Ideal for journey of more than 2.5 hours in hills for small families',
            'Extra luggage capacity',
            'Experienced local driver'
          ]
        },
        {
          name: 'SUV Standard',
          model: 'Ertiga/Triber/Tavera',
          capacity: 'Up to 6 passengers',
          seasonPrice: '',
          offSeasonPrice: '',
          features: [
            'Spacious for large groups 6 pax',
            'Perfect for family trips',
            'For hills, less chances of motion sickness',
            'Experienced local driver'
          ]
        },
        {
          name: 'SUV Deluxe',
          model: 'Innova',
          capacity: 'Up to 7 passengers',
          seasonPrice: '',
          offSeasonPrice: '',
          features: [
            'Comfortable and Spacious',
            'Perfect for family trip',
            'Carrier on top - extra luggage',
            'Less chances of motion sickness',
            'Experienced local driver'
          ]
        },
        {
          name: 'SUV Luxury',
          model: 'Innova Crysta',
          capacity: 'Up to 7 passengers',
          seasonPrice: '',
          offSeasonPrice: '',
          features: [
            'Premium luxury experience',
            'Most comfortable ride',
            'Ideal for corporate Travel',
            'Experienced local driver'
          ]
        }
      ],
    }),

    // Attractions
    defineField({
      name: 'attractions',
      title: 'Attractions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'attraction'}]}],
      description: 'Select from existing attractions or create new ones. Referenced attractions can be reused across multiple routes.',
    }),

    // What's Excluded
    defineField({
      name: 'exclusions',
      title: "What's Excluded",
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of items/services not included in the pricing',
      initialValue: [
        'Toll and Car parking charges',
        'Non-AC Car. AC would not work in hills.',
        'No stoppage for sightseeing for pickup and drop journeys.',
      ],
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{type: 'faq'}],
      description: 'Edit these default FAQs as needed. Use {{from}}, {{to}}, {{distance}}, {{duration}} for dynamic values.',
      initialValue: [
        {
          question: 'How long does the journey take from {{from}} to {{to}}?',
          answer: 'The journey from {{from}} to {{to}} typically takes around <strong>{{duration}}</strong>, covering a distance of {{distance}}. The actual time may vary depending on traffic conditions and weather.'
        },
        {
          question: 'What is included in the taxi fare?',
          answer: 'Our taxi fare is fully inclusive of:<br>• All tolls and state taxes<br>• Parking fees<br>• Driver allowance<br>• Fuel charges<br>• Pick up from {{from}}<br>There are absolutely no hidden charges!'
        },
        {
          question: 'Is the car AC or non-AC?',
          answer: 'AC will not work on hills. If required its Rs. 400/route extra and not work while car is stationary or in extended jam onroute.'
        },
        {
          question: 'What if my train is delayed?',
          answer: 'Don\'t worry! We track train timings and our drivers wait for delayed trains at no extra cost for multiple day bookings. If you have only booked one way cab then we wait for 2 hours of train delay and if we have other commitments from onward journeys then we refund the advance amount.'
        },
        {
          question: 'Is the drop till our Hotel?',
          answer: 'The charges are generally for the city center or the bus stand of that particular area. However, we accommodate till Hotel drop for most of places, provided they are within reasonable distance from city center. Please check with us the hotel name for clarifications regarding prices as some hotels are very distant from main place.'
        }
      ],
    }),

    // Stay Packages (Optional)
    defineField({
      name: 'stayPackages',
      title: 'Stay Packages',
      type: 'array',
      of: [{type: 'stayPackage'}],
      description: 'Optional: Add stay + taxi packages',
    }),

    // Tour Packages (Optional)
    defineField({
      name: 'tourPackages',
      title: 'Tour Packages',
      type: 'array',
      of: [{type: 'tourPackage'}],
      description: 'Optional: Add multi-day tour packages',
    }),

    // Related Packages (Optional)
    defineField({
      name: 'relatedPackages',
      title: 'Related Package Pages',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'package'}]}],
      description: 'Optional: Link to related standalone package pages',
    }),

    // Published status
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Set to true to make this route visible on the website',
      initialValue: false,
    }),

    // Homepage Feature Settings
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Make this route available for homepage selection',
      initialValue: false,
    }),
    defineField({
      name: 'featuredHomepageImage',
      title: 'Featured Homepage Image',
      type: 'image',
      description: 'Image displayed on homepage for this route. Recommended size: 800x600px (4:3 ratio). Required when "Show on Homepage" is enabled.',
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const showOnHomepage = (context.document as any)?.showOnHomepage
          if (showOnHomepage && !image) {
            return 'Featured Homepage Image is required when "Show on Homepage" is enabled'
          }
          return true
        }),
    }),
  ],

  preview: {
    select: {
      from: 'from',
      to: 'to',
      distance: 'distance',
      published: 'published',
    },
    prepare(selection) {
      const {from, to, distance, published} = selection
      return {
        title: `${from} → ${to}`,
        subtitle: `${distance} | ${published ? '✅ Published' : '❌ Draft'}`,
      }
    },
  },

  orderings: [
    {
      title: 'From Location A-Z',
      name: 'fromAsc',
      by: [{field: 'from', direction: 'asc'}],
    },
    {
      title: 'To Location A-Z',
      name: 'toAsc',
      by: [{field: 'to', direction: 'asc'}],
    },
  ],
})
