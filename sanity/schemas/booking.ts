import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    // Booking Reference
    defineField({
      name: 'bookingId',
      title: 'Booking ID',
      type: 'string',
      description: 'Unique booking reference (e.g., KT-20251227-0001)',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),

    // Customer Information
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Email',
      type: 'string',
    }),

    // Trip Details
    defineField({
      name: 'pickupLocation',
      title: 'Pickup Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dropLocation',
      title: 'Drop Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hotelLocationDetail',
      title: 'Hotel/Specific Location',
      type: 'string',
      description: 'Hotel name or specific drop-off point within the destination',
    }),
    defineField({
      name: 'travelDate',
      title: 'Travel Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pickupTime',
      title: 'Pickup Time',
      type: 'string',
      description: 'e.g., 10:00 AM, 2:30 PM',
      validation: (Rule) => Rule.required(),
    }),

    // Vehicle & Pricing
    defineField({
      name: 'carType',
      title: 'Car Type',
      type: 'string',
      options: {
        list: [
          {title: 'Hatchback', value: 'Hatchback'},
          {title: 'Sedan', value: 'Sedan'},
          {title: 'SUV Standard', value: 'SUV Standard'},
          {title: 'SUV Deluxe', value: 'SUV Deluxe'},
          {title: 'SUV Luxury', value: 'SUV Luxury'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'carModel',
      title: 'Car Model',
      type: 'string',
      description: 'Specific model (e.g., Innova Crysta)',
    }),
    defineField({
      name: 'passengerCount',
      title: 'Number of Passengers',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'priceType',
      title: 'Price Type',
      type: 'string',
      options: {
        list: [
          {title: 'Season Price', value: 'season'},
          {title: 'Off-Season Price', value: 'offSeason'},
        ],
      },
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      description: 'Total booking amount in INR',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'advanceAmount',
      title: 'Advance Amount',
      type: 'number',
      description: 'Token advance amount (25% of total, minimum ₹500)',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'advanceReceived',
      title: 'Advance Received',
      type: 'boolean',
      description: 'Has the token advance payment been received and verified?',
      initialValue: false,
    }),

    // Source Reference (where the booking originated)
    defineField({
      name: 'sourceType',
      title: 'Source Type',
      type: 'string',
      options: {
        list: [
          {title: 'Route', value: 'route'},
          {title: 'Package', value: 'package'},
          {title: 'Custom', value: 'custom'},
        ],
      },
    }),
    defineField({
      name: 'sourceRoute',
      title: 'Source Route',
      type: 'reference',
      to: [{type: 'route'}],
      hidden: ({document}) => document?.sourceType !== 'route',
    }),
    defineField({
      name: 'sourcePackage',
      title: 'Source Package',
      type: 'reference',
      to: [{type: 'package'}],
      hidden: ({document}) => document?.sourceType !== 'package',
    }),

    // Assigned Vehicle
    defineField({
      name: 'assignedVehicle',
      title: 'Assigned Vehicle',
      type: 'reference',
      to: [{type: 'vehicle'}],
      description: 'Vehicle assigned for this booking (after confirmation)',
    }),

    // Payment Information
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Screenshot Uploaded', value: 'screenshot_uploaded'},
          {title: 'Verified', value: 'verified'},
          {title: 'Rejected', value: 'rejected'},
          {title: 'Refunded', value: 'refunded'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'paymentScreenshot',
      title: 'Payment Screenshot',
      type: 'image',
      description: 'Screenshot of UPI payment confirmation',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'paymentVerifiedAt',
      title: 'Payment Verified At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'paymentVerifiedBy',
      title: 'Verified By',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
      description: 'UPI transaction reference number',
    }),

    // Booking Status
    defineField({
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Confirmed', value: 'confirmed'},
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),

    // Notes
    defineField({
      name: 'customerNotes',
      title: 'Customer Notes',
      type: 'text',
      rows: 3,
      description: 'Special requests or notes from customer',
    }),
    defineField({
      name: 'adminNotes',
      title: 'Admin Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes (not visible to customer)',
    }),

    // Communication Log
    defineField({
      name: 'communications',
      title: 'Communication Log',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'timestamp',
              title: 'Time',
              type: 'datetime',
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'WhatsApp', value: 'whatsapp'},
                  {title: 'Email', value: 'email'},
                  {title: 'Phone', value: 'phone'},
                  {title: 'System', value: 'system'},
                ],
              },
            }),
            defineField({
              name: 'message',
              title: 'Message',
              type: 'text',
            }),
            defineField({
              name: 'sentBy',
              title: 'Sent By',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              type: 'type',
              message: 'message',
              timestamp: 'timestamp',
            },
            prepare(selection) {
              const {type, message, timestamp} = selection
              return {
                title: `${type}: ${message?.substring(0, 50)}...`,
                subtitle: timestamp,
              }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      bookingId: 'bookingId',
      customerName: 'customerName',
      pickup: 'pickupLocation',
      drop: 'dropLocation',
      travelDate: 'travelDate',
      status: 'status',
      paymentStatus: 'paymentStatus',
    },
    prepare(selection) {
      const {bookingId, customerName, pickup, drop, travelDate, status, paymentStatus} = selection
      const statusEmoji = {
        pending: '🕐',
        confirmed: '✅',
        in_progress: '🚗',
        completed: '🏁',
        cancelled: '❌',
      }[status] || '❓'

      const paymentEmoji = {
        pending: '💳',
        screenshot_uploaded: '📷',
        verified: '✅',
        rejected: '❌',
        refunded: '↩️',
      }[paymentStatus] || '❓'

      return {
        title: `${bookingId} - ${customerName}`,
        subtitle: `${pickup} → ${drop} | ${travelDate} | ${statusEmoji} ${paymentEmoji}`,
      }
    },
  },

  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
    {
      title: 'Travel Date',
      name: 'travelDateAsc',
      by: [{field: 'travelDate', direction: 'asc'}],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{field: 'status', direction: 'asc'}],
    },
  ],
})
