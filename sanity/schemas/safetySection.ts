import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'safetySection',
  title: 'Safety Section (Homepage)',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Main headline for the safety section',
      validation: (Rule) => Rule.required(),
      initialValue: 'Your Safety is Our Priority',
    }),
    defineField({
      name: 'emotionalTagline',
      title: 'Emotional Tagline',
      type: 'text',
      rows: 2,
      description: 'A compelling emotional message about family safety',
      validation: (Rule) => Rule.required(),
      initialValue: "Don't compromise on your family's safety during the trip. Travel with trusted, verified professionals.",
    }),
    defineField({
      name: 'subDescription',
      title: 'Sub Description',
      type: 'text',
      rows: 3,
      description: 'Additional description text below the tagline',
      initialValue: 'Every journey with Kathgodam Taxi is backed by our commitment to passenger safety, experienced drivers, and well-maintained vehicles.',
    }),
    defineField({
      name: 'safetyBadges',
      title: 'Safety Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Badge Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Badge Description',
              type: 'text',
              rows: 2,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Choose an icon type',
              options: {
                list: [
                  {title: 'Shield (Verified/Safety)', value: 'shield'},
                  {title: 'User Check (Background Verified)', value: 'userCheck'},
                  {title: 'No Alcohol', value: 'noAlcohol'},
                  {title: 'Experience/Years', value: 'experience'},
                  {title: 'GPS Tracking', value: 'gps'},
                  {title: 'Clean Car', value: 'car'},
                  {title: 'Family', value: 'family'},
                  {title: 'Phone Support', value: 'phone'},
                  {title: 'Certificate', value: 'certificate'},
                  {title: 'Heart (Care)', value: 'heart'},
                ],
              },
              initialValue: 'shield',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      description: 'Add 4-6 safety trust badges',
      validation: (Rule) => Rule.min(3).max(8),
    }),
    defineField({
      name: 'familyImage',
      title: 'Family/Safety Image',
      type: 'image',
      description: 'Optional: An image showing happy family or safe journey. Recommended: 600x400px',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for SEO and accessibility',
        }
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the call-to-action button',
      initialValue: 'Book a Safe Ride',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      description: 'Link for the CTA button (e.g., /contact or #)',
      initialValue: '/contact',
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Toggle to show/hide this section on the homepage',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Safety Section (Homepage)',
        subtitle: 'Trust and safety messaging',
      }
    },
  },
})
