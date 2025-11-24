import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'YOUR_PROJECT_ID', // Replace with your Sanity project ID
    dataset: 'production',
  },
  studioHost: 'rittenhouse-residence', // Choose your studio hostname
});
