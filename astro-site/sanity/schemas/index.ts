// Import all schema types
import homepage from './homepage';
import storyPage from './storyPage';
import ratesPage from './ratesPage';
import contactPage from './contactPage';
import galleryImage from './galleryImage';
import testimonial from './testimonial';
import historyTimeline from './historyTimeline';
import room from './room';
import siteSettings from './siteSettings';
import seoSettings from './seoSettings';

// Object types
import heroSection from './objects/heroSection';
import ctaButton from './objects/ctaButton';
import seoMeta from './objects/seoMeta';
import rateTable from './objects/rateTable';

export const schemaTypes = [
  // Document types
  homepage,
  storyPage,
  ratesPage,
  contactPage,
  galleryImage,
  testimonial,
  historyTimeline,
  room,
  siteSettings,
  seoSettings,

  // Object types (reusable components)
  heroSection,
  ctaButton,
  seoMeta,
  rateTable,
];
