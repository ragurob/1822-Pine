# Content Migration Guide
## Migrating ALL Content from Quarto to Sanity.io

This guide walks you through migrating all 21 pages, 19 historical chapters, 70 images, and all other content to Sanity CMS.

---

## Prerequisites

### 1. Sanity Project Setup

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize project (in astro-site directory)
cd astro-site
sanity init

# During init:
# - Create new project
# - Use default dataset
# - Skip schema templates (we have custom ones)
```

**Save your PROJECT_ID** - you'll need it!

### 2. Update Configuration

Replace `YOUR_PROJECT_ID` in these files:
- `astro.config.mjs` (line 11)
- `sanity.config.ts` (line 9)
- `sanity.cli.ts` (line 4)

### 3. Get Sanity API Token

1. Go to https://sanity.io/manage
2. Select your project
3. Go to **API** > **Tokens**
4. Click **Add API token**
5. Name it: "Migration Script"
6. Permissions: **Editor**
7. Copy the token

### 4. Install Dependencies

**Python dependencies:**
```bash
cd astro-site/scripts
pip install -r requirements.txt
```

**Node dependencies:**
```bash
cd astro-site
npm install
```

---

## Running the Migration

### Option 1: Python Script (Recommended)

```bash
cd astro-site/scripts

# Set environment variables
export SANITY_PROJECT_ID="your_project_id"
export SANITY_DATASET="production"
export SANITY_TOKEN="your_api_token"

# Run migration
python3 migrate-to-sanity.py
```

**What it migrates:**
- ✅ Homepage with hero, trust bar, at-a-glance cards
- ✅ Rates page with all pricing tiers
- ✅ All 70 property images (optimized to max 2400px, 85% quality JPEG)
- ✅ All 19 historical chapters
- ✅ FAQ items parsed from faq.qmd
- ✅ Site settings (contact, social, branding)
- ✅ SEO settings (meta defaults, keywords)

**Estimated time:** 10-15 minutes (depending on internet speed for image uploads)

---

### Option 2: Manual Entry

If you prefer hands-on control or the script fails:

#### A. Upload Images

```bash
# In astro-site directory
npx sanity dataset import ../images/property sanity-assets
```

Then in Sanity Studio:
1. Go to **Photo Gallery** > **Create new**
2. Upload each image
3. Add title, alt text, room category
4. Click **Publish**

Repeat for all 70 images.

#### B. Enter Page Content

**Homepage:**
1. Open Sanity Studio (http://localhost:4321/admin or your deployed URL)
2. Go to **Pages** > **Homepage**
3. Fill in:
   - Hero image (upload DSC00064.jpg)
   - Heading: "You're Not Just Booking a House"
   - Subheading: "You're Stepping Into Philadelphia History"
   - At-a-glance cards (copy from current homepage)
   - Trust bar text
4. Click **Publish**

**Rates Page:**
1. Go to **Pages** > **Rates & Booking**
2. Enter:
   - Weekday rate: 1600
   - Weekend rate: 1800
   - Prime weekend rate: 2500
   - Cleaning fee: 450
   - Weekly discount: 10%
   - Monthly discount: 20%
   - Direct booking discount: 5%
   - Airbnb URL
   - VRBO URL
3. **Publish**

**Repeat for:** Story, Contact, Gallery, etc.

---

## Verification Checklist

After migration, verify in Sanity Studio:

### Pages
- [ ] Homepage exists with hero image
- [ ] Rates page has correct pricing
- [ ] Contact page has email/phone
- [ ] Story page placeholder created

### Collections
- [ ] Gallery Images: 50-70 images uploaded
- [ ] Testimonials: At least 5-10 reviews (manually add these)
- [ ] History Timeline: 6-8 key events
- [ ] History Chapters: 19 chapters imported
- [ ] Rooms: 5 suite descriptions
- [ ] FAQ Items: 15-20 questions
- [ ] Neighborhood Locations: 10-15 spots

### Settings
- [ ] Site Settings: Logo, contact info, social links
- [ ] SEO Settings: Default meta tags, keywords

---

## Post-Migration Tasks

### 1. Add Testimonials (Manual)

The script can't scrape reviews from Airbnb/VRBO, so add these manually:

1. Go to **Guest Reviews** > **Create**
2. For each review:
   - Guest name
   - Rating (1-5)
   - Review text
   - Stay date
   - Platform (Airbnb/VRBO)
   - Check **Featured** for homepage display
3. Publish

**Recommended:** Add 10-15 featured reviews first, then add more over time.

### 2. Create Room Descriptions

1. Go to **Rooms & Suites** > **Create**
2. For each suite:
   - Name (e.g., "Primary Suite")
   - Floor level
   - Bed configuration
   - Sleeps
   - Features list
   - Upload 3-5 photos per room
3. Publish

**Rooms to create:**
- Primary Suite (Second Floor)
- Second Floor Suite
- Third Floor Suite
- Fourth Floor Suite
- Garden Level Suite

### 3. Add Neighborhood Locations

1. Go to **Neighborhood Location** > **Create**
2. Add top recommendations:

**Restaurants:**
- Parc (3-min walk, French bistro)
- Vernick Food & Drink (5-min walk)
- The Love (7-min walk)

**Coffee:**
- La Colombe (3-min walk)

**Attractions:**
- Rittenhouse Square (2-min walk)
- Barnes Foundation (10-min walk)
- Philadelphia Museum of Art (15-min walk)

3. Check **Featured** for top 5-6
4. Publish each

### 4. Upload Logo & Favicon

1. Go to **Settings** > **Site Settings**
2. Upload logo (if you have one)
3. Upload favicon (32x32px icon)
4. Publish

---

## Troubleshooting

### "SANITY_TOKEN not set" Error

**Solution:**
```bash
export SANITY_TOKEN="your_token_here"
# Or create .env file in astro-site/scripts/:
echo "SANITY_TOKEN=your_token_here" > .env
```

### "Image upload failed" Error

**Causes:**
- Token doesn't have write permissions
- Image file corrupted
- Network timeout

**Solution:**
- Verify token has "Editor" permissions
- Try uploading one image manually first to test
- Check file permissions: `ls -la ../images/property/`

### "Module not found" Error

**Solution:**
```bash
pip install -r requirements.txt
# Or individually:
pip install requests PyYAML Pillow python-dotenv
```

### Migration Runs But Content Missing

**Checks:**
1. Verify PROJECT_ID matches in config files
2. Check DATASET is "production"
3. Look for errors in script output
4. Verify files exist: `ls ../website/*.qmd`

---

## Re-running Migration

If you need to re-run (e.g., after fixing issues):

```bash
# Migration script uses createOrReplace, so it's safe to re-run
python3 migrate-to-sanity.py
```

**Note:** This will overwrite existing documents with the same IDs. Manually created content (like testimonials) won't be affected.

---

## Next Steps

After successful migration:

1. **Review in Sanity Studio:**
   - Check all pages loaded correctly
   - Verify images display properly
   - Test search functionality

2. **Build Astro Pages:**
   - Create page components that query Sanity
   - Design conversion-optimized layouts
   - Implement booking CTAs

3. **Deploy:**
   - Deploy Sanity Studio: `npx sanity deploy`
   - Deploy Astro site to Netlify
   - Set up webhooks for auto-rebuild

---

## Support

**Issues with Migration?**
- Check migration script output for specific errors
- Verify all environment variables are set
- Try manual upload of one item to test API access

**Need Help?**
- Sanity Docs: https://www.sanity.io/docs
- Sanity Slack: https://slack.sanity.io
- GitHub Issues: [Your repo]/issues
