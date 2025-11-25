import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
// import { visionTool } from '@sanity/vision'; // Optional plugin - install separately if needed
// import { media } from 'sanity-plugin-media'; // Optional plugin - install separately if needed

// Import schemas
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'The Rittenhouse Residence',

  projectId: 'YOUR_PROJECT_ID', // Replace with your Sanity project ID
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton pages
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Homepage')
                      .child(S.document().schemaType('homepage').documentId('homepage')),
                    S.listItem()
                      .title('About/Story')
                      .child(S.document().schemaType('storyPage').documentId('story')),
                    S.listItem()
                      .title('Rates & Booking')
                      .child(S.document().schemaType('ratesPage').documentId('rates')),
                    S.listItem()
                      .title('Contact')
                      .child(S.document().schemaType('contactPage').documentId('contact')),
                  ])
              ),

            // Collections
            S.divider(),
            S.documentTypeListItem('galleryImage').title('Photo Gallery'),
            S.documentTypeListItem('testimonial').title('Guest Reviews'),
            S.documentTypeListItem('historyTimeline').title('Historical Timeline'),
            S.documentTypeListItem('historyChapter').title('Historical Chapters'),
            S.documentTypeListItem('room').title('Rooms & Suites'),
            S.documentTypeListItem('faqItem').title('FAQs'),
            S.documentTypeListItem('neighborhoodLocation').title('Neighborhood Guide'),
            S.documentTypeListItem('historicalDocument').title('Historical Documents'),

            // Settings
            S.divider(),
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
                    S.listItem()
                      .title('SEO Settings')
                      .child(S.document().schemaType('seoSettings').documentId('seoSettings')),
                  ])
              ),
          ]),
    }),
    // visionTool(), // Optional - install @sanity/vision package to enable
    // media(), // Optional - install sanity-plugin-media package to enable
  ],

  schema: {
    types: schemaTypes,
  },
});
