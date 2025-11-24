import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ratesPage',
  title: 'Rates & Booking Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weekdayRate',
      title: 'Weekday Rate (Mon-Thu)',
      type: 'number',
      description: 'Nightly rate in dollars',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'weekendRate',
      title: 'Weekend Rate (Fri-Sun)',
      type: 'number',
      description: 'Nightly rate in dollars',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'primeWeekendRate',
      title: 'Prime Weekend Rate',
      type: 'number',
      description: 'Graduation weekends, holidays',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'cleaningFee',
      title: 'Cleaning Fee',
      type: 'number',
      description: 'One-time fee in dollars',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'weeklyDiscount',
      title: 'Weekly Discount (%)',
      type: 'number',
      description: '7+ nights discount percentage',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'biweeklyDiscount',
      title: 'Bi-weekly Discount (%)',
      type: 'number',
      description: '14+ nights discount percentage',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'monthlyDiscount',
      title: 'Monthly Discount (%)',
      type: 'number',
      description: '28+ nights discount percentage',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'directBookingDiscount',
      title: 'Direct Booking Discount (%)',
      type: 'number',
      description: 'Additional discount for direct bookings',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'minimumStay',
      title: 'Minimum Stay (nights)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'checkInTime',
      title: 'Check-in Time',
      type: 'string',
      initialValue: '4:00 PM',
    }),
    defineField({
      name: 'checkOutTime',
      title: 'Check-out Time',
      type: 'string',
      initialValue: '11:00 AM',
    }),
    defineField({
      name: 'airbnbUrl',
      title: 'Airbnb Booking URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vrboUrl',
      title: 'VRBO Booking URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'taxRate',
      title: 'Philadelphia Hotel Tax (%)',
      type: 'number',
      description: 'Applied to stays under 30 days',
      initialValue: 15.5,
    }),
    defineField({
      name: 'includedAmenities',
      title: 'What\'s Included',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category', type: 'string' },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'policies',
      title: 'Booking Policies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Policy Title', type: 'string' },
            { name: 'content', title: 'Policy Content', type: 'text', rows: 4 },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoMeta',
    }),
  ],
  preview: {
    select: {
      weekdayRate: 'weekdayRate',
      weekendRate: 'weekendRate',
    },
    prepare({ weekdayRate, weekendRate }) {
      return {
        title: 'Rates & Booking',
        subtitle: `$${weekdayRate} weekday | $${weekendRate} weekend`,
      };
    },
  },
});
