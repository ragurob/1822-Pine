import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Guest Review',
  type: 'document',
  fields: [
    defineField({
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).precision(1),
      description: 'Rating out of 5 stars',
    }),
    defineField({
      name: 'review',
      title: 'Review Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stayDate',
      title: 'Stay Date',
      type: 'date',
      description: 'When did they stay?',
    }),
    defineField({
      name: 'platform',
      title: 'Review Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Airbnb', value: 'airbnb' },
          { title: 'VRBO', value: 'vrbo' },
          { title: 'Direct Guest', value: 'direct' },
          { title: 'Google', value: 'google' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Show on homepage?',
      initialValue: false,
    }),
    defineField({
      name: 'verified',
      title: 'Verified Stay',
      type: 'boolean',
      description: 'Confirmed booking',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Rating (High to Low)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'stayDate', direction: 'desc' }],
    },
    {
      title: 'Manual Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'guestName',
      subtitle: 'review',
      rating: 'rating',
    },
    prepare({ title, subtitle, rating }) {
      return {
        title: `${title} - ${rating}⭐`,
        subtitle: subtitle?.substring(0, 100) + '...',
      };
    },
  },
});
