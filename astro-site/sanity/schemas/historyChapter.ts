import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'historyChapter',
  title: 'History Chapter',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Chapter Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'chapterNumber',
      title: 'Chapter Number',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'timeperiod',
      title: 'Time Period',
      type: 'string',
      description: 'e.g., "1854-1890" or "The Victorian Era"',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief summary for listings',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'content',
      title: 'Chapter Content',
      type: 'array',
      of: [
        { type: 'block' },
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
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
      name: 'relatedDocuments',
      title: 'Related Historical Documents',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'historicalDocument' }] }],
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Chapter Number',
      name: 'chapterNumber',
      by: [{ field: 'chapterNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'timeperiod',
      media: 'headerImage',
      chapter: 'chapterNumber',
    },
    prepare({ title, subtitle, media, chapter }) {
      return {
        title: `${chapter}. ${title}`,
        subtitle,
        media,
      };
    },
  },
});
