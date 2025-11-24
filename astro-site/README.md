# The Rittenhouse Residence - Astro + Sanity.io

Modern website rebuild using **Astro** (static site generator) + **Sanity.io** (headless CMS) + **Netlify** (hosting).

## 🎯 What This Gives You

- **Professional CMS**: Team can edit all content through web interface
- **Real-time Collaboration**: Multiple editors simultaneously
- **Structured Content**: Validation prevents errors
- **Fast Performance**: Static site with optimized images
- **Easy Deployment**: Automatic builds on content changes

## 📋 Setup Instructions

### 1. Create Sanity Project

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity (creates free account if needed)
sanity login

# Initialize Sanity project
cd astro-site
sanity init --project-plan free

# Note your PROJECT_ID from the output
```

### 2. Configure Project IDs

Replace `YOUR_PROJECT_ID` in these files with your actual Sanity project ID:
- `astro.config.mjs`
- `sanity.config.ts`
- `sanity.cli.ts`

### 3. Install Dependencies

```bash
npm install
```

### 4. Import Initial Content (Optional)

To migrate content from the existing Quarto site, run:
```bash
npm run import-content
```

### 5. Start Development

```bash
# Terminal 1: Start Astro dev server
npm run dev

# Terminal 2: Start Sanity Studio
npx sanity dev
```

**Access points:**
- Website: http://localhost:4321
- Sanity Studio (CMS): http://localhost:4321/admin

### 6. Deploy to Production

#### A. Deploy to Sanity (one-time)
```bash
npx sanity deploy
```
This creates your production CMS at: `https://rittenhouse-residence.sanity.studio`

#### B. Deploy to Netlify

1. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" > "Import an existing project"
   - Connect to your GitHub repository
   - Select the `astro-site` directory as the base directory

2. **Configure Build Settings:**
   ```
   Base directory: astro-site
   Build command: npm run build
   Publish directory: dist
   ```

3. **Add Environment Variables:**
   In Netlify dashboard > Site Settings > Environment Variables:
   ```
   SANITY_PROJECT_ID=your_project_id
   SANITY_DATASET=production
   ```

4. **Deploy:**
   - Push to GitHub main branch
   - Netlify auto-builds and deploys

## 🏗️ Project Structure

```
astro-site/
├── src/
│   ├── pages/          # Website pages (index.astro = homepage)
│   ├── layouts/        # Reusable layouts
│   ├── components/     # UI components
│   ├── lib/            # Sanity client & helpers
│   └── styles/         # CSS files
├── sanity/
│   └── schemas/        # Content models (10 schemas defined)
├── public/             # Static assets
├── sanity.config.ts    # Sanity Studio configuration
└── astro.config.mjs    # Astro configuration
```

## 📝 Content Models (Schemas)

### Pages
- **Homepage**: Hero, trust bar, at-a-glance cards, photo story
- **Story Page**: Historical narrative with timeline
- **Rates Page**: Pricing, discounts, booking links
- **Contact Page**: Email, phone, address, social links

### Collections
- **Gallery Images**: Photos organized by room, tags, featured status
- **Testimonials**: Guest reviews with ratings, platforms, featured toggle
- **History Timeline**: Year, title, description, category, images
- **Rooms**: Suite details, bed config, features, photo galleries

### Settings
- **Site Settings**: Logo, colors, contact info, social links, analytics
- **SEO Settings**: Default meta, structured data, keywords

## 🎨 Editing Content

1. Go to https://rittenhouse-residence.sanity.studio (or http://localhost:4321/admin locally)
2. Login with your Sanity account
3. Navigate to the content type you want to edit
4. Make changes and click **Publish**
5. Website auto-rebuilds (takes ~2 minutes on Netlify)

### Quick Edits:

**Update Rates:**
1. Pages > Rates & Booking
2. Change weekday/weekend rates
3. Publish

**Add Guest Review:**
1. Guest Reviews > Create new
2. Fill in guest name, rating, review text
3. Check "Featured" to show on homepage
4. Publish

**Update Hero Image:**
1. Pages > Homepage
2. Hero Section > Upload new image
3. Adjust overlay opacity if needed
4. Publish

## 🚀 Performance

- **Lighthouse Score**: 95-100 (expected)
- **Build Time**: 1-2 minutes
- **Image Optimization**: Automatic via Sanity CDN
- **Caching**: Aggressive browser caching on Netlify

## 💰 Costs

- **Sanity.io Free Tier**: 3 users, 10k documents, 100k API requests/month
- **Netlify Free Tier**: 300 build minutes/month, 100GB bandwidth
- **Upgrade if needed**: Sanity Growth plan $99/month (unlimited users/documents)

## 🔧 Common Tasks

### Add a New Page
1. Create schema in `sanity/schemas/yourPage.ts`
2. Add to `schemas/index.ts`
3. Create Astro page in `src/pages/yourpage.astro`
4. Add query helper in `src/lib/sanity.ts`

### Update Styles
- Global CSS: `src/layouts/BaseLayout.astro`
- Component CSS: In each `.astro` file's `<style>` tag
- Reuse existing CSS from `website/styles/` directory

### Migrate More Content
Copy content from `website/*.qmd` files into Sanity Studio manually, or create import scripts.

## 📚 Documentation

- [Astro Docs](https://docs.astro.build)
- [Sanity Docs](https://www.sanity.io/docs)
- [Netlify Docs](https://docs.netlify.com)

## 🆘 Support

**Issues? Contact:**
- Sanity support: help@sanity.io
- Netlify support: support@netlify.com
- Developer: [Your contact info]

---

**Status**: 🚧 In Development
**Next Steps**: Complete homepage, add remaining pages, import content
