import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'historyTimeline',
  title: 'Historical Timeline Item',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1800).max(2100),
    }),
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Construction', value: 'construction' },
          { title: 'Renovation', value: 'renovation' },
          { title: 'Ownership Change', value: 'ownership' },
          { title: 'Social Event', value: 'social' },
          { title: 'Historical Moment', value: 'historical' },
          { title: 'Architecture', value: 'architecture' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Related Image (optional)',
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
      ],
    }),
    defineField({
      name: 'relatedDocumentUrl',
      title: 'Related Document Link',
      type: 'string',
      description: 'Link to historical document or detailed page',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Manual ordering (if not using chronological)',
    }),
  ],
  orderings: [
    {
      title: 'Year (Oldest First)',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }],
    },
    {
      title: 'Year (Newest First)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      year: 'year',
      title: 'title',
      media: 'image',
    },
    prepare({ year, title, media }) {
      return {
        title: `${year}: ${title}`,
        media,
      };
    },
  },
});
