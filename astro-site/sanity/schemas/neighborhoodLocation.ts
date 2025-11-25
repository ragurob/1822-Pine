import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'neighborhoodLocation',
  title: 'Neighborhood Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Coffee Shop', value: 'coffee' },
          { title: 'Shopping', value: 'shopping' },
          { title: 'Museum', value: 'museum' },
          { title: 'Park', value: 'park' },
          { title: 'Nightlife', value: 'nightlife' },
          { title: 'Attraction', value: 'attraction' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'walkingTime',
      title: 'Walking Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured (Top Recommendation)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
});
