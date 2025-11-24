import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'room',
  title: 'Room / Suite',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Room Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'floor',
      title: 'Floor Level',
      type: 'string',
      options: {
        list: [
          { title: 'Garden Level', value: 'garden' },
          { title: 'First Floor', value: 'first' },
          { title: 'Second Floor', value: 'second' },
          { title: 'Third Floor', value: 'third' },
          { title: 'Fourth Floor', value: 'fourth' },
        ],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief overview for listings',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'bedConfiguration',
      title: 'Bed Configuration',
      type: 'string',
      description: 'e.g., "1 King Bed" or "2 Queen Beds"',
    }),
    defineField({
      name: 'sleeps',
      title: 'Sleeps',
      type: 'number',
      description: 'Number of guests',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'hasPrivateBathroom',
      title: 'Private Bathroom',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'features',
      title: 'Features & Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Room-specific features (e.g., "Original fireplace", "Garden view")',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'historicalNote',
      title: 'Historical Note',
      type: 'text',
      rows: 3,
      description: 'Historical significance of this room',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Floor Level',
      name: 'floor',
      by: [{ field: 'floor', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'floor',
      media: 'gallery.0',
    },
  },
});
