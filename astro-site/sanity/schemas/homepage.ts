import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (for SEO)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
    }),
    defineField({
      name: 'trustBar',
      title: 'Trust Bar',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'text',
          rows: 2,
          description: 'Trust signals (reviews, features, etc.)',
        },
      ],
    }),
    defineField({
      name: 'atAGlance',
      title: 'At a Glance Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon', type: 'string', description: 'Emoji or icon code' },
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'photoStory',
      title: 'Photo Story Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Section Heading', type: 'string' },
        {
          name: 'stories',
          title: 'Story Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'image', title: 'Image', type: 'image' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
              ],
            },
          ],
          validation: (Rule) => Rule.max(3),
        },
      ],
    }),
    defineField({
      name: 'bookingCta',
      title: 'Booking Call-to-Action',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'airbnbUrl', title: 'Airbnb URL', type: 'url' },
        { name: 'vrboUrl', title: 'VRBO URL', type: 'url' },
        { name: 'startingRate', title: 'Starting Rate (e.g., $1,600)', type: 'string' },
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
      title: 'title',
    },
    prepare() {
      return {
        title: 'Homepage',
      };
    },
  },
});
