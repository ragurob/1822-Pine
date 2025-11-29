# Production Deployment Guide

Complete guide for deploying The Rittenhouse Residence to production on Netlify.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Netlify Configuration](#netlify-configuration)
4. [Domain Setup](#domain-setup)
5. [Performance Optimization](#performance-optimization)
6. [Monitoring & Analytics](#monitoring--analytics)
7. [Post-Deployment Testing](#post-deployment-testing)
8. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

### Content Requirements

**Sanity CMS:**
- [ ] Sanity project initialized (`npx sanity init`)
- [ ] All seed data imported (56 documents)
- [ ] 70+ property images uploaded
- [ ] Story page content created
- [ ] Rates page content created
- [ ] Contact page content created
- [ ] Actual contact info updated (not placeholder)
- [ ] Actual booking URLs updated (Airbnb, VRBO)
- [ ] SEO metadata reviewed and optimized
- [ ] Studio deployed (`npx sanity deploy`)

**Code Quality:**
- [ ] All TypeScript errors resolved (except expected Sanity module before init)
- [ ] No console errors in browser
- [ ] Mobile responsive testing completed
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] All links tested and working
- [ ] Forms tested and submitting correctly
- [ ] Images optimized and loading properly

**Legal & Compliance:**
- [ ] Terms of Service reviewed by legal counsel
- [ ] Privacy Policy compliant with GDPR/CCPA
- [ ] Cookie consent implemented (if using analytics)
- [ ] Contact information accurate
- [ ] Booking policies clearly stated

### Technical Requirements

- [ ] Node.js 18+ installed
- [ ] Git repository on GitHub
- [ ] Netlify account created
- [ ] Domain name purchased (or using Netlify subdomain)
- [ ] SSL certificate (automatic with Netlify)
- [ ] Sanity project ID obtained
- [ ] Sanity API token created (read-only for production)

---

## Environment Setup

### 1. Environment Variables

Create `.env.production` file (DO NOT commit to git):

```bash
# Sanity Configuration
SANITY_PROJECT_ID=abc123xyz          # Your actual project ID
SANITY_DATASET=production            # Use 'production' dataset
SANITY_API_VERSION=2024-01-01        # API version
SANITY_USE_CDN=true                  # Use CDN in production for performance

# Site Configuration
SITE_URL=https://therittenhouseresidence.com
CONTACT_EMAIL=stay@therittenhouseresidence.com

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX    # Your GA4 measurement ID
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX   # Optional: GTM container ID

# Forms (Optional - if using Netlify Forms)
NETLIFY_FORMS_ENABLED=true

# Security
SANITY_TOKEN=                        # Leave empty for public reads
                                     # Only needed if you have private datasets
```

### 2. Configure Netlify Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

| Key | Value | Notes |
|-----|-------|-------|
| `SANITY_PROJECT_ID` | `your-project-id` | Required |
| `SANITY_DATASET` | `production` | Required |
| `SANITY_API_VERSION` | `2024-01-01` | Required |
| `SANITY_USE_CDN` | `true` | Performance |
| `GOOGLE_ANALYTICS_ID` | `G-XXXXXXXXXX` | Optional |
| `NODE_VERSION` | `20` | Recommended |

**Important:** Never commit `.env` files to git! They're in `.gitignore`.

---

## Netlify Configuration

### 1. Connect Repository

1. Log in to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select repository: `ragurob/1822-Pine`
5. Configure build settings:

**Build Settings:**
```
Base directory: astro-site
Build command: npm run build
Publish directory: astro-site/dist
Functions directory: (leave empty)
```

### 2. Build Configuration

Your `netlify.toml` is already configured:

```toml
[build]
  base = "astro-site"
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  NPM_VERSION = "10"

[[plugins]]
  package = "@astrojs/netlify"

[context.production]
  command = "npm run build"

[context.deploy-preview]
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3. Deploy Settings

**Branch Deploys:**
- Production branch: `main` (or your default branch)
- Deploy previews: Enabled for all pull requests
- Branch deploys: Enabled for all branches

**Build Hooks (Optional):**
Create a webhook to trigger rebuilds when Sanity content changes:

1. Netlify Dashboard → Site Settings → Build & Deploy → Build Hooks
2. Create build hook: "Sanity Content Update"
3. Copy webhook URL
4. In Sanity Dashboard → API → Webhooks:
   - URL: Paste Netlify build hook URL
   - Dataset: `production`
   - Trigger on: Create, Update, Delete

Now content updates trigger automatic rebuilds!

---

## Domain Setup

### Option 1: Netlify Subdomain (Free)

Default: `your-site-name.netlify.app`

**Pros:** Free, instant SSL, no configuration
**Cons:** Not custom domain

### Option 2: Custom Domain

1. **Purchase Domain** (e.g., therittenhouseresidence.com)
   - Recommended registrars: Namecheap, Google Domains, Cloudflare

2. **Add Domain in Netlify:**
   - Site Settings → Domain Management → Add Custom Domain
   - Enter: `therittenhouseresidence.com`
   - Click "Verify"

3. **Configure DNS:**

**If using Netlify DNS (Recommended):**
- Point nameservers to Netlify
- Netlify automatically configures DNS
- SSL certificate auto-provisioned

**If using external DNS:**
Add these records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 75.2.60.5 |
| CNAME | www | your-site.netlify.app |

4. **Enable HTTPS:**
   - Netlify → Domain Settings → HTTPS
   - Certificate auto-provisions in 24 hours
   - Force HTTPS redirect: Enabled

5. **Add www Redirect:**
```toml
# In netlify.toml
[[redirects]]
  from = "https://www.therittenhouseresidence.com/*"
  to = "https://therittenhouseresidence.com/:splat"
  status = 301
  force = true
```

---

## Performance Optimization

### 1. Image Optimization

**Sanity Images:**
- Already optimized via Sanity CDN
- Automatic WebP conversion
- Responsive image sizing
- Lazy loading enabled

**Local Images:**
- Use Astro's `<Image>` component
- Enable automatic optimization
- Set appropriate sizes and quality

### 2. Caching Strategy

**Static Assets:** 1 year cache (configured in netlify.toml)
**HTML Pages:** No cache (always fresh content)
**API Calls:** Sanity CDN caching enabled

### 3. Lighthouse Optimization

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Common Issues & Fixes:**

| Issue | Fix |
|-------|-----|
| Large images | Use Sanity image optimization |
| Render-blocking resources | Critical CSS inlined |
| Unused JavaScript | Tree-shaking enabled |
| Missing alt text | All images have alt in CMS |
| Missing meta tags | SEO metadata in all schemas |

### 4. Font Optimization

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- Use font-display: swap -->
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('/fonts/inter-var.woff2') format('woff2');
}
```

---

## Monitoring & Analytics

### 1. Google Analytics 4 (Recommended)

**Setup:**

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to Netlify environment variables
4. Update `siteSettings` in Sanity with GA ID

**Configured Events:**
- Page views (automatic)
- Booking button clicks
- Contact form submissions
- External link clicks (Airbnb, VRBO)
- Gallery image views

### 2. Netlify Analytics (Optional, $9/mo)

**Included:**
- Server-side analytics (no client-side tracking)
- No cookie consent needed
- Page views, unique visitors
- Traffic sources
- Popular pages

**Enable:**
Netlify Dashboard → Analytics → Enable Analytics

### 3. Performance Monitoring

**Recommended Tools:**

**Google Search Console:**
- Add site at [search.google.com/search-console](https://search.google.com/search-console)
- Verify ownership via HTML meta tag or DNS
- Monitor search performance, indexing, mobile usability

**Pingdom / UptimeRobot:**
- Monitor uptime (Netlify has 99.9% SLA)
- Alert on downtime
- Free tier available

**Sentry (Optional - Error Tracking):**
- Catch JavaScript errors
- Monitor performance issues
- Free tier: 5,000 events/month

### 4. SEO Monitoring

**Tools:**
- Google Search Console (required)
- Bing Webmaster Tools
- Ahrefs / SEMrush (paid, advanced)

**Key Metrics:**
- Organic traffic growth
- Keyword rankings ("rittenhouse square vacation rental", "philadelphia historic mansion")
- Backlink profile
- Page speed scores

---

## Post-Deployment Testing

### Automated Tests

**Lighthouse CI:**
```bash
npm install -g @lhci/cli
lhci autorun --collect.url=https://yoursite.com
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Manual Testing Checklist

**Functionality:**
- [ ] All 9 pages load without errors
- [ ] Navigation works on desktop and mobile
- [ ] Contact form submits successfully
- [ ] Gallery lightbox opens and navigates
- [ ] FAQ accordions expand/collapse
- [ ] Booking buttons link to correct URLs
- [ ] Mobile menu opens and closes
- [ ] Smooth scroll anchors work

**Content:**
- [ ] All images display correctly
- [ ] No placeholder text ("Lorem ipsum", "YOUR_PROJECT_ID")
- [ ] Contact info is accurate
- [ ] Booking links go to actual listings
- [ ] Social media links are correct
- [ ] Legal pages (Terms, Privacy) are complete

**SEO:**
- [ ] Meta titles unique per page (50-60 characters)
- [ ] Meta descriptions compelling (150-160 characters)
- [ ] Open Graph tags present (check with [opengraph.xyz](https://www.opengraph.xyz/))
- [ ] Sitemap generated and submitted to Google
- [ ] Robots.txt allows crawling
- [ ] Structured data for LocalBusiness

**Performance:**
- [ ] Page load time < 3 seconds
- [ ] First Contentful Paint < 1.5 seconds
- [ ] Largest Contentful Paint < 2.5 seconds
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images lazy load on scroll

**Cross-Browser:**
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)
- [ ] iOS Safari (iPhone)
- [ ] Chrome Android

**Mobile:**
- [ ] Touch targets > 48x48px
- [ ] Text readable without zoom (16px+)
- [ ] No horizontal scrolling
- [ ] Forms easy to complete
- [ ] Buttons easily tappable

---

## Troubleshooting

### Build Failures

**"Cannot find module 'sanity:client'"**
- **Cause:** Sanity project not initialized or env vars missing
- **Fix:** Ensure `SANITY_PROJECT_ID` is set in Netlify environment variables

**"Out of memory" during build**
- **Cause:** Large image processing or dependencies
- **Fix:** Add to `netlify.toml`:
  ```toml
  [build.environment]
    NODE_OPTIONS = "--max-old-space-size=4096"
  ```

**"npm ERR! peer dependency"**
- **Cause:** Dependency version conflicts
- **Fix:** Use `npm install --legacy-peer-deps` in build command

### Runtime Errors

**Images not loading from Sanity**
- **Cause:** Wrong project ID or dataset
- **Fix:** Verify env vars match Sanity dashboard

**Forms not submitting**
- **Cause:** Netlify Forms not enabled
- **Fix:** Add `netlify` attribute to `<form>` tag

**404 on page refresh**
- **Cause:** Missing SPA fallback
- **Fix:** Already configured in netlify.toml redirects

### Performance Issues

**Slow initial page load**
- **Cause:** Large images, too many requests
- **Fix:** Enable Sanity CDN, optimize images, use lazy loading

**Low Lighthouse score**
- **Cause:** Multiple factors
- **Fix:** Run `npm run build` and check dist/ file sizes, optimize largest files

### SEO Issues

**Pages not indexed by Google**
- **Cause:** Robots.txt blocking, no sitemap
- **Fix:** Submit sitemap.xml to Google Search Console

**Missing in search results**
- **Cause:** Takes 2-4 weeks for new sites
- **Fix:** Build backlinks, submit to directories, create Google Business Profile

---

## Deployment Workflow

### Initial Deploy

```bash
# 1. Ensure all tests pass
npm run build

# 2. Commit and push to main branch
git add .
git commit -m "feat: Production ready deployment"
git push origin main

# 3. Netlify automatically deploys
# Monitor at: https://app.netlify.com/sites/YOUR_SITE/deploys
```

### Continuous Deployment

**Automatic:** Every push to `main` triggers a deploy

**Manual:** Netlify Dashboard → Deploys → Trigger Deploy

**Rollback:** Netlify Dashboard → Deploys → Click old deploy → Publish

### Content Updates (via Sanity)

1. Edit content in Sanity Studio
2. Publish changes
3. Webhook triggers Netlify rebuild (if configured)
4. OR manually trigger deploy in Netlify

**Rebuild Time:** ~2-3 minutes for full site

---

## Going Live Checklist

**48 Hours Before:**
- [ ] All content finalized
- [ ] Legal pages reviewed
- [ ] Contact info verified
- [ ] Booking links tested
- [ ] Staging site reviewed by stakeholders

**24 Hours Before:**
- [ ] Domain DNS updated (if using custom domain)
- [ ] SSL certificate verified
- [ ] Analytics configured and tested
- [ ] Search Console verified
- [ ] Backup of Sanity data exported

**Launch Day:**
- [ ] Deploy to production
- [ ] Verify all pages load
- [ ] Test forms and booking links
- [ ] Monitor analytics for first visitors
- [ ] Check Netlify deploy logs for errors

**Post-Launch (First Week):**
- [ ] Monitor uptime and performance
- [ ] Check Google Search Console for indexing
- [ ] Review analytics data
- [ ] Fix any user-reported issues
- [ ] Submit sitemap to Bing Webmaster Tools

---

## Maintenance

### Weekly
- [ ] Review analytics for traffic trends
- [ ] Check for broken links
- [ ] Monitor Sanity content for updates

### Monthly
- [ ] Update testimonials with new reviews
- [ ] Check Google Search Console for SEO issues
- [ ] Review and update rates if needed
- [ ] Check for npm dependency updates

### Quarterly
- [ ] Audit site performance with Lighthouse
- [ ] Review and update content for freshness
- [ ] Check competition and adjust positioning
- [ ] Update seasonal photos in gallery

### Annually
- [ ] Review and renew domain registration
- [ ] Update Terms of Service and Privacy Policy
- [ ] Conduct full security audit
- [ ] Review hosting costs and optimization opportunities

---

## Support Resources

- **Netlify Docs:** https://docs.netlify.com
- **Astro Docs:** https://docs.astro.build
- **Sanity Docs:** https://www.sanity.io/docs
- **Netlify Support:** https://www.netlify.com/support/
- **Community:** Netlify Discord, Astro Discord

---

**Last Updated:** 2025-11-29
**Version:** 1.0
**Status:** Production Ready ✅
