import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'storyPage',
  title: 'Story / About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
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
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Opening paragraphs about the house',
    }),
    defineField({
      name: 'timelineHeading',
      title: 'Timeline Section Heading',
      type: 'string',
      initialValue: 'Key Moments in Time',
    }),
    defineField({
      name: 'showTimeline',
      title: 'Show Historical Timeline',
      type: 'boolean',
      description: 'Display timeline items from the Timeline collection',
      initialValue: true,
    }),
    defineField({
      name: 'archivesSection',
      title: 'Archives Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
        { name: 'ctaUrl', title: 'CTA Button URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoMeta',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About / Story Page',
      };
    },
  },
});
