import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bookingSettings',
  title: 'Booking Settings',
  type: 'document',
  fields: [
    // UPI Payment Configuration
    defineField({
      name: 'upiId',
      title: 'UPI ID',
      type: 'string',
      description: 'Your UPI ID for receiving payments (e.g., kathgodamtaxi@upi)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'upiQrCode',
      title: 'UPI QR Code',
      type: 'image',
      description: 'QR code image for UPI payment',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'payeeName',
      title: 'Payee Name',
      type: 'string',
      description: 'Name displayed for payment (e.g., Kathgodam Taxi)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bankDetails',
      title: 'Bank Details (Alternative)',
      type: 'text',
      rows: 4,
      description: 'Alternative bank transfer details for manual payments',
    }),

    // Booking Configuration
    defineField({
      name: 'advanceBookingDays',
      title: 'Advance Booking Days',
      type: 'number',
      description: 'How many days in advance can users book? (e.g., 30)',
      initialValue: 30,
      validation: (Rule) => Rule.required().min(1).max(365),
    }),
    defineField({
      name: 'minAdvanceHours',
      title: 'Minimum Advance Hours',
      type: 'number',
      description: 'Minimum hours before pickup time for booking (24 = 1 day advance)',
      initialValue: 24,
      validation: (Rule) => Rule.required().min(1).max(168),
    }),
    defineField({
      name: 'allowSameDayBooking',
      title: 'Allow Same Day Booking',
      type: 'boolean',
      description: 'Allow bookings for the same day (subject to minAdvanceHours)',
      initialValue: false,
    }),

    // Season Configuration - Date Ranges
    defineField({
      name: 'defaultSeason',
      title: 'Default Season',
      type: 'string',
      description: 'Season to use when date is not in any defined range',
      options: {
        list: [
          {title: 'Peak Season (Higher Price)', value: 'season'},
          {title: 'Off Season (Lower Price)', value: 'offSeason'},
        ],
      },
      initialValue: 'offSeason',
    }),
    defineField({
      name: 'seasonDateRanges',
      title: 'Season Date Ranges',
      type: 'array',
      description: 'Define peak and off-season periods by date ranges',
      of: [
        {
          type: 'object',
          name: 'seasonRange',
          title: 'Season Range',
          fields: [
            {
              name: 'name',
              title: 'Period Name',
              type: 'string',
              description: 'e.g., "Winter Peak", "Monsoon Off-Season"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'seasonType',
              title: 'Season Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Peak Season (Higher Price)', value: 'season'},
                  {title: 'Off Season (Lower Price)', value: 'offSeason'},
                ],
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              description: 'Start of this season period',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              description: 'End of this season period (inclusive)',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              name: 'name',
              seasonType: 'seasonType',
              startDate: 'startDate',
              endDate: 'endDate',
            },
            prepare({name, seasonType, startDate, endDate}: {name: string; seasonType: string; startDate: string; endDate: string}) {
              return {
                title: name || 'Unnamed Period',
                subtitle: `${seasonType === 'season' ? '🔥 Peak' : '❄️ Off'} | ${startDate} → ${endDate}`,
              }
            },
          },
        },
      ],
    }),

    // Blocked Date Ranges - No Online Booking
    defineField({
      name: 'blockedDateRanges',
      title: 'Blocked Date Ranges',
      type: 'array',
      description: 'Periods when online booking is not available (e.g., holidays, special events)',
      of: [
        {
          type: 'object',
          name: 'blockedRange',
          title: 'Blocked Period',
          fields: [
            {
              name: 'name',
              title: 'Block Reason',
              type: 'string',
              description: 'e.g., "Diwali Rush", "Fleet Maintenance"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              description: 'First blocked date',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              description: 'Last blocked date (inclusive)',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'message',
              title: 'Customer Message',
              type: 'text',
              rows: 2,
              description: 'Message shown to customers (e.g., "Online booking unavailable. Please call for availability.")',
              initialValue: 'Online booking is not available for this period. Please contact us directly.',
            },
            {
              name: 'allowPhoneBooking',
              title: 'Show Phone/WhatsApp Option',
              type: 'boolean',
              description: 'Show phone/WhatsApp contact as alternative',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              name: 'name',
              startDate: 'startDate',
              endDate: 'endDate',
            },
            prepare({name, startDate, endDate}: {name: string; startDate: string; endDate: string}) {
              return {
                title: `🚫 ${name || 'Blocked Period'}`,
                subtitle: `${startDate} → ${endDate}`,
              }
            },
          },
        },
      ],
    }),

    // Notification Templates
    defineField({
      name: 'confirmationEmailSubject',
      title: 'Confirmation Email Subject',
      type: 'string',
      description: 'Subject line for booking confirmation email',
      initialValue: 'Booking Confirmed - Kathgodam Taxi',
    }),
    defineField({
      name: 'confirmationEmailTemplate',
      title: 'Confirmation Email Template',
      type: 'text',
      rows: 10,
      description: 'Email template. Placeholders: {{bookingId}}, {{customerName}}, {{pickup}}, {{drop}}, {{date}}, {{time}}, {{carType}}, {{amount}}',
      initialValue: `Dear {{customerName}},

Your booking has been confirmed!

Booking Details:
- Booking ID: {{bookingId}}
- Pickup: {{pickup}}
- Drop: {{drop}}
- Date: {{date}}
- Time: {{time}}
- Vehicle: {{carType}}
- Amount: Rs.{{amount}}

Our driver will contact you before pickup.

For any queries, contact us:
Phone: 7351721351
WhatsApp: +91 7351721351

Thank you for choosing Kathgodam Taxi!`,
    }),
    defineField({
      name: 'confirmationWhatsappTemplate',
      title: 'Confirmation WhatsApp Template',
      type: 'text',
      rows: 8,
      description: 'WhatsApp message template for booking confirmation',
      initialValue: `Booking Confirmed

Booking ID: {{bookingId}}
Name: {{customerName}}
Route: {{pickup}} to {{drop}}
Date: {{date}}
Time: {{time}}
Vehicle: {{carType}}
Amount: Rs.{{amount}}

Driver details will be shared before pickup.
Contact: 7351721351`,
    }),
    defineField({
      name: 'paymentReminderTemplate',
      title: 'Payment Reminder Template',
      type: 'text',
      rows: 5,
      description: 'WhatsApp reminder for pending payments',
      initialValue: `Payment Pending

Your booking {{bookingId}} is waiting for payment.
Amount: Rs.{{amount}}

Please complete payment and share screenshot to confirm your booking.`,
    }),

    // Terms & Conditions
    defineField({
      name: 'bookingTerms',
      title: 'Booking Terms & Conditions',
      type: 'text',
      rows: 10,
      description: 'Terms shown during booking process',
      initialValue: `1. Booking is confirmed only after payment verification.
2. Cancellation must be done via phone/WhatsApp.
3. Pickup time may vary by 15-30 minutes based on traffic.
4. Extra charges apply for AC in hilly terrain.
5. Toll and parking charges are included in the fare.
6. For train pickup, we track train timing and wait for delays.`,
    }),
    defineField({
      name: 'cancellationPolicy',
      title: 'Cancellation Policy',
      type: 'text',
      rows: 6,
      description: 'Cancellation policy shown to customers',
      initialValue: `- Free cancellation up to 24 hours before pickup
- 50% refund for cancellation 12-24 hours before pickup
- No refund for cancellation less than 12 hours before pickup
- Contact us via WhatsApp or phone for cancellation`,
    }),

    // Contact for booking issues
    defineField({
      name: 'bookingHelpPhone',
      title: 'Booking Help Phone',
      type: 'string',
      description: 'Phone number for booking-related queries',
      initialValue: '7351721351',
    }),
    defineField({
      name: 'bookingHelpWhatsapp',
      title: 'Booking Help WhatsApp',
      type: 'string',
      description: 'WhatsApp number for booking support',
      initialValue: '917351721351',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Booking Settings',
        subtitle: 'UPI, Policies, and Notification Templates',
      }
    },
  },
})
