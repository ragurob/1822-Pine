import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Booking & Cancellation', value: 'booking' },
          { title: 'Property Details', value: 'property' },
          { title: 'Amenities & Services', value: 'amenities' },
          { title: 'House Rules & Policies', value: 'rules' },
          { title: 'Location & Transportation', value: 'location' },
          { title: 'Special Requests', value: 'special' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured (Show on Contact Page)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: (Rule) => Rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Category, then Sort Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'sortOrder', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
});
