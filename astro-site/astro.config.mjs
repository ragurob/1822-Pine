import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://therittenhouseresidence.com',
  output: 'hybrid',
  adapter: netlify(),
  integrations: [
    sanity({
      projectId: 'YOUR_PROJECT_ID', // Replace with actual Sanity project ID
      dataset: 'production',
      useCdn: false, // Use CDN for faster response times (set to false for latest data)
      apiVersion: '2024-01-01',
      studioBasePath: '/admin', // Access Sanity Studio at /admin
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['@sanity/client'],
    },
  },
});
