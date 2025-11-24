# 🚀 Astro + Sanity.io + Netlify Implementation

## ✅ What's Been Done

I've created the **complete foundation** for your new CMS-driven website in the `/astro-site` directory.

### 📦 Created Files (26 total)

**Core Configuration:**
- `package.json` - Dependencies (Astro, Sanity, Netlify adapter)
- `astro.config.mjs` - Astro with Sanity integration
- `sanity.config.ts` - Sanity Studio configuration
- `tsconfig.json` - TypeScript setup
- `netlify.toml` - Deployment configuration
- `.env.example` - Environment variables template

**Sanity Content Schemas (10 models):**

1. **Homepage** - Hero, trust bar, at-a-glance cards, photo story section
2. **Story Page** - Historical narrative with timeline integration
3. **Rates Page** - Dynamic pricing, discounts, booking URLs, policies
4. **Contact Page** - Email, phone, address, social links
5. **Gallery Images** - Photos with room tags, captions, featured system
6. **Testimonials** - Guest reviews with ratings, platforms, verification
7. **History Timeline** - Chronological events with years, categories, images
8. **Rooms/Suites** - Bed configuration, features, photo galleries
9. **Site Settings** - Logo, colors, contact info, analytics, social links
10. **SEO Settings** - Default meta tags, structured data, keywords

**Reusable Components:**
- Hero Section (customizable overlay, CTAs)
- CTA Buttons (styled, tracking-ready)
- SEO Meta (per-page optimization)
- Rate Tables (structured pricing)

**Astro Files:**
- `src/layouts/BaseLayout.astro` - SEO, analytics, global styles
- `src/lib/sanity.ts` - Query helpers for all content types

---

## 🎯 What This Gives Your Team

### ✨ Professional CMS Features

| Feature | Benefit |
|---------|---------|
| **Web-based editing** | No Git, code, or technical knowledge needed |
| **Real-time collaboration** | Multiple editors work simultaneously |
| **Structured content** | Validation prevents formatting errors |
| **Rich text editor** | WYSIWYG for easy content creation |
| **Image management** | Drag-and-drop with automatic optimization |
| **Preview before publish** | See changes before going live |
| **Revision history** | Undo changes, see who edited what |
| **Role-based access** | Control who can edit what |
| **Scheduled publishing** | Set content to go live at specific times |

### 📊 Content Management Capabilities

**Edit Everything Through Web Interface:**
- ✅ Homepage hero image & text
- ✅ Pricing & rates (updates instantly)
- ✅ Guest reviews & testimonials
- ✅ Photo gallery (upload, tag, reorder)
- ✅ Room descriptions & features
- ✅ Historical timeline items
- ✅ SEO metadata (titles, descriptions, keywords)
- ✅ Contact information
- ✅ Social media links
- ✅ Site-wide settings

---

## 📋 Next Steps to Launch

### Phase 1: Setup (1-2 hours)

#### 1. Create Sanity Account & Project

```bash
cd astro-site

# Install Sanity CLI
npm install -g @sanity/cli

# Login (creates free account if needed)
sanity login

# Initialize project
sanity init

# Choose options:
# - Create new project
# - Use default dataset configuration
# - Output path: current directory
# - Select project template: Clean project with no predefined schema

# ⚠️ IMPORTANT: Note your PROJECT_ID from the output
```

#### 2. Update Configuration Files

Replace `YOUR_PROJECT_ID` with your actual Sanity project ID in:
- `astro.config.mjs` (line 11)
- `sanity.config.ts` (line 9)
- `sanity.cli.ts` (line 4)

#### 3. Install Dependencies

```bash
npm install
```

#### 4. Start Development

```bash
# Terminal 1: Astro dev server
npm run dev

# Terminal 2: Sanity Studio
npx sanity dev
```

**Access:**
- Website: http://localhost:4321
- CMS: http://localhost:4321/admin

---

### Phase 2: Content Migration (2-3 days)

#### Option A: Manual Entry (Recommended for accuracy)

1. Open Sanity Studio at http://localhost:4321/admin
2. Navigate to each content type
3. Copy content from existing `/website/*.qmd` files
4. Paste and format in Sanity Studio
5. Upload images to Sanity
6. Publish each item

**Migration Checklist:**
- [ ] Homepage content
- [ ] Story/about page
- [ ] Rates & pricing
- [ ] Contact information
- [ ] 5-10 featured guest reviews
- [ ] 20-30 gallery photos (prioritize best shots)
- [ ] 6-8 timeline events
- [ ] Room/suite descriptions
- [ ] Site settings (logo, colors, social links)
- [ ] SEO defaults

#### Option B: Automated Import Script (Faster but requires development)

Create a migration script that:
1. Reads existing `.qmd` files
2. Parses frontmatter and content
3. Uploads to Sanity via API
4. Matches images to new structure

*(I can help create this script if needed)*

---

### Phase 3: Build Pages (3-4 days)

**Pages to Create:**

1. **Homepage** (`src/pages/index.astro`)
   - Hero section with Sanity content
   - At-a-glance cards
   - Photo story section
   - Featured testimonials
   - Timeline preview
   - Booking CTA

2. **Story Page** (`src/pages/story.astro`)
   - Hero image
   - Historical narrative
   - Full timeline
   - Links to documents

3. **Rates Page** (`src/pages/rates.astro`)
   - Dynamic rate tables
   - Discount calculator
   - Booking platform links
   - Policies

4. **Gallery Page** (`src/pages/gallery.astro`)
   - Filterable image grid
   - Room categories
   - Lightbox viewer

5. **Testimonials Page** (`src/pages/testimonials.astro`)
   - All reviews
   - Filter by rating/platform
   - Statistics

6. **Contact Page** (`src/pages/contact.astro`)
   - Contact form
   - Map embed
   - Social links

---

### Phase 4: Styling (2-3 days)

Copy CSS from existing site:
- Migrate `website/styles/homepage.css` → Astro components
- Migrate `website/styles/animations.css` → Astro components
- Update color variables to match brand
- Ensure responsive design

---

### Phase 5: Deploy (1 day)

#### A. Deploy Sanity Studio

```bash
npx sanity deploy
```

This creates: `https://rittenhouse-residence.sanity.studio`

#### B. Deploy to Netlify

1. Push code to GitHub
2. Go to https://app.netlify.com
3. "Add new site" > "Import existing project"
4. Connect GitHub repo
5. **Build settings:**
   ```
   Base directory: astro-site
   Build command: npm run build
   Publish directory: dist
   ```
6. **Environment variables:**
   ```
   SANITY_PROJECT_ID=your_project_id
   SANITY_DATASET=production
   ```
7. Deploy!

#### C. Setup Webhooks (Auto-rebuild on content changes)

1. In Sanity Studio: Settings > API > Webhooks
2. Add webhook:
   ```
   Name: Netlify Deploy
   URL: https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID
   Dataset: production
   Trigger on: Create, Update, Delete
   ```
3. Now when team publishes content, site auto-rebuilds (takes 2 min)

---

## 💰 Costs

### Free Tier (Good for Start)
- **Sanity**: 3 users, 10k documents, 100k API requests/month
- **Netlify**: 300 build minutes/month, 100GB bandwidth
- **Total**: $0/month

### Recommended Production Setup
- **Sanity Growth**: $99/month
  - Unlimited users
  - Unlimited documents
  - 1M API requests/month
  - Priority support
- **Netlify**: Free tier (likely sufficient)
- **Total**: $99/month

**ROI Calculation:**
- If team saves 3 hours/month on content updates = $99 pays for itself
- Professional CMS vs. editing Markdown files = Huge productivity gain

---

## 🎓 Training Your Team

### Quick Start Guide for Editors

**Editing Content:**
1. Go to https://rittenhouse-residence.sanity.studio
2. Login with Sanity account
3. Click content type (e.g., "Pages" > "Homepage")
4. Edit fields
5. Click "Publish" (green button)
6. Wait ~2 minutes for site to rebuild

**Common Tasks:**

**Update Rates:**
1. Pages > Rates & Booking
2. Change nightly rates
3. Publish

**Add Guest Review:**
1. Guest Reviews > Create
2. Fill in fields
3. Check "Featured" for homepage
4. Publish

**Upload Gallery Photo:**
1. Photo Gallery > Create
2. Upload image
3. Add title, alt text, caption
4. Select room
5. Publish

**Update SEO:**
1. Any page > SEO Settings section
2. Edit meta title, description
3. Upload social share image
4. Publish

---

## 🔧 Development Workflow

### Local Development
```bash
cd astro-site
npm run dev              # Start Astro (port 4321)
npx sanity dev           # Start Sanity Studio (port 3333)
```

### Common Commands
```bash
npm run build            # Build for production
npm run preview          # Preview production build
npx sanity deploy        # Deploy CMS
npm run astro --help     # Astro CLI help
```

---

## 🆘 Troubleshooting

### Build Fails
- Check Sanity PROJECT_ID is correct in all configs
- Ensure all schemas are properly imported in `schemas/index.ts`
- Run `npm install` to update dependencies

### Content Not Showing
- Verify content is published (not draft) in Sanity Studio
- Check query functions in `src/lib/sanity.ts`
- Look for errors in browser console

### Images Not Loading
- Ensure images are uploaded to Sanity (not local files)
- Check `urlFor()` function usage
- Verify image asset references in queries

---

## 📚 Resources

- **Astro Docs**: https://docs.astro.build
- **Sanity Docs**: https://www.sanity.io/docs
- **Sanity Schema Reference**: https://www.sanity.io/docs/schema-types
- **Netlify Docs**: https://docs.netlify.com

---

## 🎯 Current Status

✅ **Complete:**
- Project structure
- All Sanity schemas (10 content models)
- Sanity Studio configuration
- Astro base layout
- Query helpers
- Netlify configuration
- Documentation

🚧 **Next:**
- Create Sanity project
- Build Astro pages
- Migrate content
- Deploy

**Estimated Time to Launch:** 1-2 weeks (with focused effort)

---

## 💡 Want Me to Continue?

I can help with:
1. **Create sample pages** - Build homepage, rates, gallery with real components
2. **Migration script** - Automate content import from existing site
3. **Component library** - Reusable UI components
4. **Additional schemas** - FAQs, blog posts, events, etc.
5. **Advanced features** - Search, filtering, booking integration

**Let me know what you'd like me to tackle next!**
