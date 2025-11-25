import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'flexiblePage',
  title: 'Flexible Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
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
      name: 'pageBuilder',
      title: 'Page Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Text Section',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: {
              title: 'heading',
            },
            prepare({ title }) {
              return {
                title: title || 'Text Section',
                subtitle: 'Text Content',
              };
            },
          },
        },
        {
          type: 'object',
          name: 'imageGallery',
          title: 'Image Gallery',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'images',
              title: 'Images',
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
            },
          ],
          preview: {
            select: {
              title: 'heading',
              image: 'images.0',
            },
            prepare({ title, image }) {
              return {
                title: title || 'Image Gallery',
                subtitle: 'Gallery Section',
                media: image,
              };
            },
          },
        },
        {
          type: 'object',
          name: 'ctaSection',
          title: 'Call-to-Action Section',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'buttons',
              title: 'Buttons',
              type: 'array',
              of: [{ type: 'ctaButton' }],
            },
          ],
          preview: {
            select: {
              title: 'heading',
            },
            prepare({ title }) {
              return {
                title: title || 'CTA Section',
                subtitle: 'Call-to-Action',
              };
            },
          },
        },
        {
          type: 'object',
          name: 'testimonialSection',
          title: 'Testimonials Section',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'testimonials',
              title: 'Select Testimonials',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
            },
          ],
        },
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
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug}`,
      };
    },
  },
});
