import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
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
          description: 'Important for SEO and accessibility',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'Primary headline (e.g., "You\'re Not Just Booking a House")',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Secondary headline',
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary Call-to-Action',
      type: 'ctaButton',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Call-to-Action',
      type: 'ctaButton',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      description: 'Dark overlay opacity (0-100%). Lower = more image visible',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 25,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
  },
});
