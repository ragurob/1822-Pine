# Sanity Studio Setup Guide

Complete instructions for initializing and populating your Sanity CMS.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create Sanity Project](#step-1-create-sanity-project)
3. [Step 2: Update Configuration](#step-2-update-configuration)
4. [Step 3: Import Seed Data](#step-3-import-seed-data)
5. [Step 4: Test Integration](#step-4-test-integration)
6. [Step 5: Deploy Studio](#step-5-deploy-studio)
7. [Manual Content Entry](#manual-content-entry)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

✅ Node.js 18+ installed
✅ npm dependencies installed (`npm install`)
✅ Sanity account (free at https://sanity.io)

---

## Step 1: Create Sanity Project

### Option A: Interactive CLI Setup (Recommended)

```bash
cd /home/user/1822-Pine/astro-site
npx sanity init
```

**Follow the prompts:**

1. **Create new project**: Yes
2. **Project name**: "Rittenhouse Residence" (or your preference)
3. **Use default dataset**: Yes (production)
4. **Project output path**: Leave blank (uses current directory)
5. **Login**: Browser will open for Sanity login/signup

**Save your PROJECT_ID!** It will be displayed after creation.

### Option B: Create Via Sanity Dashboard

1. Go to https://sanity.io/manage
2. Click "Create New Project"
3. Name: "Rittenhouse Residence"
4. Keep "production" dataset
5. Copy the PROJECT_ID from dashboard

---

## Step 2: Update Configuration

Replace `YOUR_PROJECT_ID` with your actual project ID in three files:

### File 1: `astro.config.mjs`

```javascript
// Line 12
projectId: 'abc123xyz', // ← Replace YOUR_PROJECT_ID
```

### File 2: `sanity.config.ts`

```typescript
// Line 13
projectId: 'abc123xyz', // ← Replace YOUR_PROJECT_ID
```

### File 3: `sanity.cli.ts`

```typescript
// Line 5
projectId: 'abc123xyz', // ← Replace YOUR_PROJECT_ID
```

---

## Step 3: Import Seed Data

### Create a Sanity API Token

1. Go to https://sanity.io/manage
2. Select your project
3. Navigate to: **API** → **Tokens**
4. Click "Add API Token"
   - Label: "Seed Data Import"
   - Permissions: **Editor**
5. Copy the token (you'll only see it once!)

### Set Environment Variable

```bash
export SANITY_TOKEN=your_token_here
export SANITY_PROJECT_ID=your_project_id_here
```

### Run Import Script

```bash
cd /home/user/1822-Pine/astro-site
node sanity/seed-data/import-seed-data.js
```

**Expected Output:**

```
🚀 Starting Sanity data import...
📦 Project: abc123xyz
📊 Dataset: production

📄 Importing singleton pages...
✅ Homepage imported
✅ Site Settings imported

📝 Importing 5 rooms documents...
✓✓✓✓✓
✅ Imported 5/5 rooms successfully

📝 Importing 10 testimonials documents...
✓✓✓✓✓✓✓✓✓✓
✅ Imported 10/10 testimonials successfully

📝 Importing 24 FAQs documents...
✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓
✅ Imported 24/24 FAQs successfully

📝 Importing 15 timeline events documents...
✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓
✅ Imported 15/15 timeline events successfully

🎉 Data import completed successfully!

📋 Import Summary:
   ✓ 2 singleton documents (homepage, siteSettings)
   ✓ 5 rooms
   ✓ 10 testimonials
   ✓ 24 FAQs
   ✓ 15 timeline events

📊 Total: 56 documents imported
```

---

## Step 4: Test Integration

### Start Development Server

```bash
npm run dev
```

This starts both:
- **Astro site**: http://localhost:4321
- **Sanity Studio**: http://localhost:4321/admin

### Verify Sanity Studio

1. Open http://localhost:4321/admin
2. You should see the Studio interface with:
   - **Pages** section (Homepage, About/Story, Rates, Contact)
   - **Collections** (Gallery, Reviews, Timeline, etc.)
   - **Settings** (Site Settings, SEO Settings)

### Verify Data in Studio

1. Click **Pages** → **Homepage**
2. You should see all the imported homepage content
3. Check **Guest Reviews** - should show 10 testimonials
4. Check **Rooms & Suites** - should show 5 rooms
5. Check **FAQs** - should show 24 questions

### Verify Astro Integration

1. Open http://localhost:4321 (homepage)
2. Content should now load from Sanity (previously showing errors)
3. Check browser console - should be no "sanity:client" errors

---

## Step 5: Deploy Studio

Once everything is working locally, deploy Studio to the cloud:

```bash
npx sanity deploy
```

**Follow prompts:**

1. **Studio hostname**: Choose a unique name (e.g., `rittenhouse-residence`)
2. Deployment will complete in ~1 minute

**Access deployed Studio at:**
`https://your-hostname.sanity.studio`

Now you (or property managers) can edit content from anywhere!

---

## Manual Content Entry

Some content types require manual entry or image uploads:

### Required Content

#### 1. Upload Images (Priority: HIGH)

**Gallery Images** (~70 images from `/images` directory):

1. Go to Studio → **Photo Gallery** → **Create**
2. For each image:
   - Upload image file
   - Title: "Master Bedroom Fireplace"
   - Alt text: "Original 1854 marble fireplace in master bedroom"
   - Room filter: Select appropriate room
   - Featured: Check for hero images
   - Order: Number for sorting

**Tip**: Batch upload 5-10 images at a time for efficiency.

#### 2. Create Story Page Content

1. Go to **Pages** → **About/Story** → **Create**
2. Fill in:
   - Hero section (image, heading, CTA)
   - Introduction text
   - 170-year narrative (use Portable Text editor)
   - Architectural highlights
   - Notable residents section

**Content Source**: Use existing `story.astro` as reference

#### 3. Create Rates Page Content

1. Go to **Pages** → **Rates & Booking** → **Create**
2. Fill in:
   - Rate tables (nightly, weekly, monthly)
   - Seasonal pricing
   - Booking policies
   - House rules
   - Cancellation policy

**Content Source**: Use existing `rates.astro` as reference

#### 4. Create Contact Page Content

1. Go to **Pages** → **Contact** → **Create**
2. Fill in:
   - Contact form settings
   - Email destination
   - FAQ references (link to FAQ items)
   - Special requests text

#### 5. Add More Testimonials (Optional)

Current: 10 seed testimonials
Goal: 20-30 featured reviews

**Sources**:
- Airbnb reviews (copy/paste best ones)
- VRBO reviews
- Direct booking emails

### Optional Enhancements

#### Add Neighborhood Locations (~50 items)

1. Go to **Neighborhood Guide** → **Create**
2. For each location:
   - Name: "Parc Restaurant"
   - Category: "Restaurant"
   - Description: "French bistro with sidewalk seating"
   - Address: "227 S 18th St"
   - Distance: "2 blocks (3 min walk)"
   - Phone, website, hours
   - Recommended: Check if highly recommended

**Categories**: Restaurants, Coffee, Shopping, Museums, Parks, Healthcare, Services

#### Add Historical Documents (Optional)

If you have scanned documents (deeds, photos, letters):

1. Go to **Historical Documents** → **Create**
2. Upload document image/PDF
3. Add metadata: year, title, description, significance

---

## Troubleshooting

### Issue: "Cannot find module 'sanity:client'"

**Cause**: Configuration files not updated with PROJECT_ID
**Fix**: Complete Step 2, restart dev server

### Issue: "Unauthorized" error during import

**Cause**: Invalid or missing SANITY_TOKEN
**Fix**: Recreate token with "Editor" permissions, update environment variable

### Issue: Images not showing in Astro pages

**Cause**: Images not uploaded to Sanity yet
**Fix**: Upload images via Studio (see Manual Content Entry)

### Issue: Studio shows empty pages

**Cause**: Singleton documents not created
**Fix**: Run import script, or manually create in Studio

### Issue: TypeScript errors in browser console

**Cause**: Schema mismatch between TypeScript types and Sanity schema
**Fix**: Run `npm run astro check` to identify type issues

---

## Next Steps After Setup

1. ✅ **Content Audit**: Verify all imported content is accurate
2. ✅ **Image Upload**: Add all 70 property images
3. ✅ **Test All Pages**: Visit each page to ensure data displays correctly
4. ✅ **Mobile Testing**: Test responsive design on mobile devices
5. ✅ **SEO Setup**: Complete SEO Settings singleton with meta tags
6. ✅ **Deploy to Netlify**: Push to production once testing is complete

---

## Support Resources

- **Sanity Documentation**: https://www.sanity.io/docs
- **Astro + Sanity Guide**: https://docs.astro.build/en/guides/cms/sanity/
- **Schema Reference**: See `SANITY-STUDIO-STRUCTURE.md`
- **Seed Data Files**: `/sanity/seed-data/` directory

---

**Estimated Time to Complete:**

- Step 1-2: 10 minutes
- Step 3: 5 minutes
- Step 4: 15 minutes
- Step 5: 5 minutes
- Manual Content Entry: 2-4 hours (depending on image count)

**Total: ~3-5 hours for complete setup**
