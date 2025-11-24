import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seoMeta',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title shown in search results (50-60 chars ideal)',
      validation: (Rule) => Rule.max(60).warning('Titles over 60 characters may be truncated'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description shown in search results (150-160 chars ideal)',
      validation: (Rule) =>
        Rule.max(160).warning('Descriptions over 160 characters may be truncated'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'SEO keywords (comma-separated)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Media Share Image',
      type: 'image',
      description: 'Image shown when page is shared on social media (1200x630px ideal)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Check to prevent this page from appearing in search results',
      initialValue: false,
    }),
  ],
});
