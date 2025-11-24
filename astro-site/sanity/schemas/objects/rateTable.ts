import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'rateTable',
  title: 'Rate Table',
  type: 'object',
  fields: [
    defineField({
      name: 'periodName',
      title: 'Period Name',
      type: 'string',
      description: 'e.g., "Weekdays", "Weekends"',
    }),
    defineField({
      name: 'rate',
      title: 'Nightly Rate',
      type: 'number',
      description: 'Rate in dollars',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'string',
      description: 'Additional info (e.g., "2-night minimum")',
    }),
  ],
  preview: {
    select: {
      title: 'periodName',
      rate: 'rate',
    },
    prepare({ title, rate }) {
      return {
        title,
        subtitle: `$${rate}/night`,
      };
    },
  },
});
