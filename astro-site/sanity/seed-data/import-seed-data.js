/**
 * Sanity Seed Data Import Script
 *
 * This script imports all seed data files into your Sanity project.
 *
 * Prerequisites:
 * 1. Initialize Sanity project: npx sanity init
 * 2. Update PROJECT_ID in this file (line 19)
 * 3. Create a token at: https://sanity.io/manage
 *    - Go to your project → API → Tokens
 *    - Create token with "Editor" permissions
 * 4. Set environment variable: export SANITY_TOKEN=your_token_here
 *
 * Usage:
 *   node sanity/seed-data/import-seed-data.js
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'YOUR_PROJECT_ID';
const DATASET = process.env.SANITY_DATASET || 'production';
const TOKEN = process.env.SANITY_TOKEN;

if (!TOKEN) {
  console.error('❌ Error: SANITY_TOKEN environment variable is required');
  console.error('Create a token at: https://sanity.io/manage');
  console.error('Then run: export SANITY_TOKEN=your_token_here');
  process.exit(1);
}

if (PROJECT_ID === 'YOUR_PROJECT_ID') {
  console.error('❌ Error: Please update PROJECT_ID in this script or set SANITY_PROJECT_ID env var');
  process.exit(1);
}

// Initialize Sanity client
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Helper to read JSON file
function readJsonFile(filename) {
  const filePath = path.join(__dirname, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

// Helper to create or update document
async function createOrUpdateDocument(doc) {
  try {
    const result = await client.createOrReplace(doc);
    return result;
  } catch (error) {
    console.error(`Error creating/updating document:`, error.message);
    throw error;
  }
}

// Helper to create multiple documents
async function createDocuments(docs, typeName) {
  console.log(`\n📝 Importing ${docs.length} ${typeName} documents...`);
  let successCount = 0;
  let errorCount = 0;

  for (const doc of docs) {
    try {
      await createOrUpdateDocument(doc);
      successCount++;
      process.stdout.write(`✓`);
    } catch (error) {
      errorCount++;
      process.stdout.write(`✗`);
      console.error(`\nFailed to import ${typeName}:`, error.message);
    }
  }

  console.log(`\n✅ Imported ${successCount}/${docs.length} ${typeName} successfully`);
  if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} ${typeName} failed to import`);
  }
}

// Main import function
async function importAllData() {
  console.log('🚀 Starting Sanity data import...');
  console.log(`📦 Project: ${PROJECT_ID}`);
  console.log(`📊 Dataset: ${DATASET}\n`);

  try {
    // Import singleton pages
    console.log('📄 Importing singleton pages...');

    const homepage = readJsonFile('homepage.json');
    await createOrUpdateDocument(homepage);
    console.log('✅ Homepage imported');

    const siteSettings = readJsonFile('site-settings.json');
    await createOrUpdateDocument(siteSettings);
    console.log('✅ Site Settings imported');

    // Import collection documents
    const rooms = readJsonFile('rooms.json');
    await createDocuments(rooms, 'rooms');

    const testimonials = readJsonFile('testimonials.json');
    await createDocuments(testimonials, 'testimonials');

    const faqs = readJsonFile('faqs.json');
    await createDocuments(faqs, 'FAQs');

    const timeline = readJsonFile('timeline.json');
    await createDocuments(timeline, 'timeline events');

    console.log('\n🎉 Data import completed successfully!');
    console.log('\n📋 Import Summary:');
    console.log('   ✓ 2 singleton documents (homepage, siteSettings)');
    console.log(`   ✓ ${rooms.length} rooms`);
    console.log(`   ✓ ${testimonials.length} testimonials`);
    console.log(`   ✓ ${faqs.length} FAQs`);
    console.log(`   ✓ ${timeline.length} timeline events`);
    console.log(`\n📊 Total: ${2 + rooms.length + testimonials.length + faqs.length + timeline.length} documents imported`);
    console.log('\n🌐 View your content at:');
    console.log(`   https://${PROJECT_ID}.sanity.studio/`);
    console.log(`   or run: npm run dev (then visit /admin)\n`);

  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run import
importAllData();
