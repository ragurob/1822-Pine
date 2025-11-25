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
import faqItem from './faqItem';
import neighborhoodLocation from './neighborhoodLocation';
import historyChapter from './historyChapter';
import historicalDocument from './historicalDocument';
import flexiblePage from './flexiblePage';

// Object types
import heroSection from './objects/heroSection';
import ctaButton from './objects/ctaButton';
import seoMeta from './objects/seoMeta';
import rateTable from './objects/rateTable';

export const schemaTypes = [
  // Page types
  homepage,
  storyPage,
  ratesPage,
  contactPage,
  flexiblePage,

  // Collection types
  galleryImage,
  testimonial,
  historyTimeline,
  room,
  faqItem,
  neighborhoodLocation,
  historyChapter,
  historicalDocument,

  // Settings
  siteSettings,
  seoSettings,

  // Object types (reusable components)
  heroSection,
  ctaButton,
  seoMeta,
  rateTable,
];
