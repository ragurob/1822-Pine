import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Create image URL builder
const builder = imageUrlBuilder(sanityClient);

// Helper function to generate image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Query helpers
export async function getHomepage() {
  const query = `*[_type == "homepage" && _id == "homepage"][0]{
    ...,
    hero{
      ...,
      image{
        ...,
        asset->
      }
    },
    photoStory{
      ...,
      stories[]{
        ...,
        image{
          ...,
          asset->
        }
      }
    },
    seo{
      ...,
      ogImage{
        ...,
        asset->
      }
    }
  }`;

  return await sanityClient.fetch(query);
}

export async function getRatesPage() {
  const query = `*[_type == "ratesPage" && _id == "rates"][0]`;
  return await sanityClient.fetch(query);
}

export async function getStoryPage() {
  const query = `*[_type == "storyPage" && _id == "story"][0]{
    ...,
    heroImage{
      ...,
      asset->
    }
  }`;
  return await sanityClient.fetch(query);
}

export async function getContactPage() {
  const query = `*[_type == "contactPage" && _id == "contact"][0]`;
  return await sanityClient.fetch(query);
}

export async function getFeaturedTestimonials(limit = 3) {
  const query = `*[_type == "testimonial" && featured == true] | order(rating desc, stayDate desc)[0...${limit}]`;
  return await sanityClient.fetch(query);
}

export async function getAllTestimonials() {
  const query = `*[_type == "testimonial"] | order(stayDate desc)`;
  return await sanityClient.fetch(query);
}

export async function getGalleryImages() {
  const query = `*[_type == "galleryImage"] | order(sortOrder asc){
    ...,
    image{
      ...,
      asset->
    }
  }`;
  return await sanityClient.fetch(query);
}

export async function getGalleryImagesByRoom(room: string) {
  const query = `*[_type == "galleryImage" && room == $room] | order(sortOrder asc){
    ...,
    image{
      ...,
      asset->
    }
  }`;
  return await sanityClient.fetch(query, { room });
}

export async function getHistoryTimeline() {
  const query = `*[_type == "historyTimeline"] | order(year asc){
    ...,
    image{
      ...,
      asset->
    }
  }`;
  return await sanityClient.fetch(query);
}

export async function getFeaturedTimelineItems() {
  const query = `*[_type == "historyTimeline" && featured == true] | order(year asc){
    ...,
    image{
      ...,
      asset->
    }
  }`;
  return await sanityClient.fetch(query);
}

export async function getRooms() {
  const query = `*[_type == "room"] | order(sortOrder asc){
    ...,
    gallery[]{
      ...,
      asset->
    }
  }`;
  return await sanityClient.fetch(query);
}

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
    ...,
    logo{
      ...,
      asset->
    },
    favicon{
      ...,
      asset->
    }
  }`;
  return await sanityClient.fetch(query);
}

export async function getSeoSettings() {
  const query = `*[_type == "seoSettings" && _id == "seoSettings"][0]{
    ...,
    defaultShareImage{
      ...,
      asset->
    }
  }`;
  return await sanityClient.fetch(query);
}

export async function getFaqsByCategory(category: string) {
  const query = `*[_type == "faqItem" && category == $category] | order(sortOrder asc)`;
  return await sanityClient.fetch(query, { category });
}

export async function getAllFaqs() {
  const query = `*[_type == "faqItem"] | order(category asc, sortOrder asc)`;
  return await sanityClient.fetch(query);
}
