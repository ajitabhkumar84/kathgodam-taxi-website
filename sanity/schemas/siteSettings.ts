import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Phone number without country code (e.g., 7351721351)',
      validation: (Rule) => Rule.required(),
      initialValue: '7351721351',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'WhatsApp number with country code (e.g., 917351721351)',
      validation: (Rule) => Rule.required(),
      initialValue: '917351721351',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Default WhatsApp Message',
      type: 'text',
      rows: 2,
      description: 'Default message when clicking WhatsApp button',
      initialValue: 'Hi, I would like to book a taxi from Kathgodam.',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Contact email address',
      validation: (Rule) => Rule.required().email(),
      initialValue: 'kathgodamtaxi@gmail.com',
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      description: 'Main logo text (e.g., Kathgodam)',
      initialValue: 'Kathgodam',
    }),
    defineField({
      name: 'logoHighlight',
      title: 'Logo Highlight Text',
      type: 'string',
      description: 'Highlighted part of logo (e.g., Taxi)',
      initialValue: 'Taxi',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'Your GTM container ID (e.g., GTM-XXXXXXX). GTM can manage all your other tracking tags.',
      placeholder: 'GTM-XXXXXXX',
      validation: (Rule) => Rule.regex(/^GTM-[A-Z0-9]+$/).error('Must be a valid GTM ID (e.g., GTM-XXXXXXX)'),
      fieldset: 'tracking',
    }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Search Console Verification Code',
      type: 'string',
      description: 'Verification code from Google Search Console (meta tag content value only)',
      placeholder: 'AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'facebookDomainVerification',
      title: 'Facebook Domain Verification Code',
      type: 'string',
      description: 'Facebook domain verification meta tag content value',
      placeholder: 'abcdefghijklmnopqrstuvwxyz123456',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'customHeadScripts',
      title: 'Custom Head Scripts',
      type: 'text',
      rows: 6,
      description: 'Additional scripts to inject in <head> section. Paste complete script tags here. For advanced users only.',
      fieldset: 'tracking',
    }),
  ],
  fieldsets: [
    {
      name: 'tracking',
      title: 'Tracking & Analytics',
      description: 'Configure tracking scripts and verification codes for your website',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global website configuration',
      }
    },
  },
})
