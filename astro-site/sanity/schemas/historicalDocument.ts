import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'historicalDocument',
  title: 'Historical Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'documentType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'Deed', value: 'deed' },
          { title: 'Floor Plan', value: 'floorplan' },
          { title: 'Photograph', value: 'photograph' },
          { title: 'Newspaper Article', value: 'newspaper' },
          { title: 'Letter', value: 'letter' },
          { title: 'Census Record', value: 'census' },
          { title: 'Architectural Drawing', value: 'architectural' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Document Date',
      type: 'date',
      description: 'When was this document created?',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'For easier filtering',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Document Image/Scan',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'transcription',
      title: 'Transcription',
      type: 'text',
      rows: 6,
      description: 'Full text transcription if available',
    }),
    defineField({
      name: 'source',
      title: 'Source/Archive',
      type: 'string',
      description: 'Where is this document from?',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Document',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Year (Oldest First)',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }],
    },
    {
      title: 'Document Type',
      name: 'type',
      by: [{ field: 'documentType', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'documentType',
      media: 'image',
      year: 'year',
    },
    prepare({ title, subtitle, media, year }) {
      return {
        title: year ? `${year} - ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
