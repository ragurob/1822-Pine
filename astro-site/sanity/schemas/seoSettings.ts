import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seoSettings',
  title: 'SEO & Meta Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default Meta Title',
      type: 'string',
      description: 'Fallback title for pages without custom SEO',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      description: 'Fallback description for pages without custom SEO',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'defaultShareImage',
      title: 'Default Social Share Image',
      type: 'image',
      description: 'Used when pages don\'t have a custom share image (1200x630px)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter Handle',
      type: 'string',
      description: 'Your Twitter username (without @)',
    }),
    defineField({
      name: 'globalKeywords',
      title: 'Global Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords added to all pages',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'structuredData',
      title: 'Schema.org Structured Data',
      type: 'object',
      fields: [
        { name: 'organizationName', title: 'Organization Name', type: 'string' },
        { name: 'type', title: 'Business Type', type: 'string', initialValue: 'LodgingBusiness' },
        { name: 'priceRange', title: 'Price Range', type: 'string', initialValue: '$1600-$2500' },
        { name: 'telephone', title: 'Phone', type: 'string' },
      ],
    }),
    defineField({
      name: 'robotsTxt',
      title: 'Robots.txt Rules',
      type: 'text',
      rows: 5,
      description: 'Custom rules for search engine crawlers',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'SEO Settings',
      };
    },
  },
});
