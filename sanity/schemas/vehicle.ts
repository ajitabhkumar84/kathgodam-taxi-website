import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'vehicle',
  title: 'Vehicle',
  type: 'document',
  fields: [
    defineField({
      name: 'vehicleId',
      title: 'Vehicle ID',
      type: 'string',
      description: 'Unique identifier for the vehicle (e.g., KT-001)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'registrationNumber',
      title: 'Registration Number',
      type: 'string',
      description: 'Vehicle registration/license plate number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'carType',
      title: 'Car Type',
      type: 'string',
      description: 'Category of the vehicle',
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
      name: 'model',
      title: 'Model',
      type: 'string',
      description: 'Specific model name (e.g., Innova Crysta, Dzire, Alto)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Passenger Capacity',
      type: 'number',
      description: 'Maximum number of passengers',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'image',
      title: 'Vehicle Image',
      type: 'image',
      description: 'Photo of the vehicle',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Is this vehicle currently active in the fleet?',
      initialValue: true,
    }),
    defineField({
      name: 'maintenanceMode',
      title: 'Under Maintenance',
      type: 'boolean',
      description: 'Is this vehicle currently under maintenance?',
      initialValue: false,
    }),
    defineField({
      name: 'driverName',
      title: 'Assigned Driver',
      type: 'string',
      description: 'Name of the regular driver for this vehicle',
    }),
    defineField({
      name: 'driverPhone',
      title: 'Driver Phone',
      type: 'string',
      description: 'Driver contact number',
    }),
    defineField({
      name: 'blockedDates',
      title: 'Blocked Dates',
      type: 'array',
      description: 'Date ranges when this vehicle is unavailable',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'reason',
              title: 'Reason',
              type: 'string',
              description: 'e.g., Maintenance, Personal use, Pre-booked',
            }),
          ],
          preview: {
            select: {
              start: 'startDate',
              end: 'endDate',
              reason: 'reason',
            },
            prepare(selection) {
              const {start, end, reason} = selection
              return {
                title: `${start} to ${end}`,
                subtitle: reason || 'No reason specified',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
      description: 'Any additional notes about this vehicle',
    }),
  ],

  preview: {
    select: {
      vehicleId: 'vehicleId',
      model: 'model',
      carType: 'carType',
      isActive: 'isActive',
      maintenanceMode: 'maintenanceMode',
    },
    prepare(selection) {
      const {vehicleId, model, carType, isActive, maintenanceMode} = selection
      let status = isActive ? 'Active' : 'Inactive'
      if (maintenanceMode) status = 'Maintenance'
      return {
        title: `${vehicleId} - ${model}`,
        subtitle: `${carType} | ${status}`,
      }
    },
  },

  orderings: [
    {
      title: 'Vehicle ID',
      name: 'vehicleIdAsc',
      by: [{field: 'vehicleId', direction: 'asc'}],
    },
    {
      title: 'Car Type',
      name: 'carTypeAsc',
      by: [{field: 'carType', direction: 'asc'}],
    },
  ],
})
