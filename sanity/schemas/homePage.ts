import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // SEO Fields
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'SEO title for homepage',
      validation: (Rule) => Rule.required().max(60),
      initialValue: 'Kathgodam Taxi - Safe & Reliable Taxi Services in Kumaon Hills',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description',
      validation: (Rule) => Rule.required().max(160),
      initialValue: 'Kathgodam Taxi - Your trusted taxi service from Kathgodam Railway Station to Nainital, Mukteshwar, and all Kumaon destinations. Fixed prices, 15+ years experience.',
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'string',
      description: 'Comma-separated keywords',
      initialValue: 'Kathgodam taxi, Nainital taxi, Kumaon taxi service, Kathgodam railway station taxi, Uttarakhand taxi',
    }),

    // Hero Section
    defineField({
      name: 'heroSlides',
      title: 'Hero Slider',
      type: 'array',
      of: [{type: 'homeHeroSlide'}],
      description: 'Add 2-5 hero slides (recommended: 3)',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),

    // Featured Routes
    defineField({
      name: 'featuredRoutes',
      title: 'Featured Routes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'route'}]}],
      description: 'Select and order routes to display on homepage (max 9). Drag to reorder.',
      validation: (Rule) => Rule.max(9),
    }),
    defineField({
      name: 'routesSectionTitle',
      title: 'Routes Section Title',
      type: 'string',
      initialValue: 'Our Most Requested Taxi Services',
    }),
    defineField({
      name: 'routesSectionDescription',
      title: 'Routes Section Description',
      type: 'text',
      rows: 2,
      initialValue: 'Fixed prices, no hidden charges. All-inclusive fares covering tolls, taxes, and fuel.',
    }),
    defineField({
      name: 'routesBottomCTA',
      title: 'Routes Bottom CTA Text',
      type: 'string',
      initialValue: "Don't see your destination? We cover all Kumaon region destinations!",
    }),

    // Featured Packages
    defineField({
      name: 'featuredPackages',
      title: 'Featured Tour Packages',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'package'}]}],
      description: 'Select and order packages to display on homepage (max 6). Drag to reorder.',
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'packagesSectionTitle',
      title: 'Packages Section Title',
      type: 'string',
      initialValue: 'Customized Tour Packages',
    }),
    defineField({
      name: 'packagesSectionDescription',
      title: 'Packages Section Description',
      type: 'text',
      rows: 2,
      initialValue: 'Multi-day tours designed for complete relaxation and sightseeing. All-inclusive packages with accommodations and meals.',
    }),

    // Testimonials
    defineField({
      name: 'testimonials',
      title: 'Customer Testimonials',
      type: 'array',
      of: [{type: 'homeTestimonial'}],
      description: 'Add customer testimonials (recommended: 6-12)',
      validation: (Rule) => Rule.min(3),
    }),
    defineField({
      name: 'testimonialsSectionTitle',
      title: 'Testimonials Section Title',
      type: 'string',
      initialValue: 'What Our Guests Say',
    }),
    defineField({
      name: 'testimonialsSectionDescription',
      title: 'Testimonials Section Description',
      type: 'string',
      initialValue: "Don't just take our word for it - hear from our happy customers!",
    }),
    defineField({
      name: 'testimonialsFooterText',
      title: 'Testimonials Footer Text',
      type: 'string',
      initialValue: '4.9/5 Average Rating from 500+ Reviews',
    }),

    // Final CTA Section
    defineField({
      name: 'finalCtaHeading',
      title: 'Final CTA Heading',
      type: 'string',
      initialValue: 'Ready to Explore the Kumaon Hills?',
    }),
    defineField({
      name: 'finalCtaSubheading',
      title: 'Final CTA Subheading',
      type: 'text',
      rows: 2,
      initialValue: 'Book your taxi today and experience safe, reliable, and comfortable travel across the beautiful Kumaon region.',
    }),
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Trust badges shown in final CTA (recommended: 3)',
      initialValue: [
        '15+ Years Experience',
        'Fixed Transparent Pricing',
        '500+ Happy Customers',
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
        subtitle: 'Homepage content and settings',
      }
    },
  },
})
