import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Photo Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'text',
          rows: 2,
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'room',
      title: 'Room/Location',
      type: 'string',
      options: {
        list: [
          { title: 'Entry Hall', value: 'entry' },
          { title: 'Double Parlors', value: 'parlors' },
          { title: 'Dining Room', value: 'dining' },
          { title: 'Kitchen', value: 'kitchen' },
          { title: 'Primary Suite', value: 'primary-suite' },
          { title: 'Second Floor Suite', value: 'second-floor' },
          { title: 'Third Floor Suite', value: 'third-floor' },
          { title: 'Fourth Floor Suite', value: 'fourth-floor' },
          { title: 'Garden Suite', value: 'garden' },
          { title: 'Bathrooms', value: 'bathrooms' },
          { title: 'Outdoor/Garden', value: 'outdoor' },
          { title: 'Exterior', value: 'exterior' },
          { title: 'Architectural Details', value: 'details' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Keywords for filtering (e.g., "historic", "luxury", "bedroom")',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      description: 'Show on homepage/key areas',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Display order in gallery',
      validation: (Rule) => Rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Room',
      name: 'room',
      by: [{ field: 'room', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'room',
      media: 'image',
    },
  },
});
