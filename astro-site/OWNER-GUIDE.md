# Site Owner's Guide

Easy-to-follow guide for managing The Rittenhouse Residence website after launch.

## Table of Contents

1. [Quick Links](#quick-links)
2. [Daily Operations](#daily-operations)
3. [Updating Content](#updating-content)
4. [Common Tasks](#common-tasks)
5. [Troubleshooting](#troubleshooting)
6. [Getting Help](#getting-help)

---

## Quick Links

### Essential URLs

| Service | URL | What It's For |
|---------|-----|---------------|
| **Your Website** | https://therittenhouseresidence.com | Live site visitors see |
| **Sanity Studio** | https://therittenhouseresidence.com/admin | Update site content here |
| **Netlify Dashboard** | https://app.netlify.com | Hosting, deploys, analytics |
| **Google Analytics** | https://analytics.google.com | See who visits your site |
| **Google Search Console** | https://search.google.com/search-console | SEO performance |

### Login Credentials

**Keep these in a password manager (1Password, LastPass):**
- Sanity account (for editing content)
- Netlify account (for hosting)
- Google Analytics (for traffic stats)
- Domain registrar (for DNS/domain renewal)

---

## Daily Operations

### What Runs Automatically

✅ **Website Updates:** When you edit content in Sanity Studio and click "Publish", the website rebuilds automatically (takes 2-3 minutes)

✅ **Analytics Tracking:** Every visitor is tracked in Google Analytics automatically

✅ **Backups:** Sanity automatically backs up all your content

✅ **SSL Certificate:** Netlify renews your HTTPS certificate automatically

✅ **Spam Protection:** Contact form has built-in spam filtering

### What You Should Monitor

**Weekly (~10 minutes):**
- Check Google Analytics for visitor trends
- Read contact form submissions in your email
- Glance at booking platform messages (Airbnb, VRBO)

**Monthly (~30 minutes):**
- Add new guest reviews to Reviews page
- Update rates if needed for seasonal changes
- Check for any website errors in Netlify dashboard

**Quarterly (~1 hour):**
- Update gallery with new property photos
- Review and refresh homepage content
- Check competitors' sites and adjust positioning

---

## Updating Content

### How to Edit Content (Sanity Studio)

**Step 1: Access Studio**
1. Go to: https://therittenhouseresidence.com/admin
2. Log in with your Sanity account

**Step 2: Find What to Edit**
The Studio sidebar shows all content:
- **Pages** → Homepage, Story, Rates, Contact
- **Photo Gallery** → All property images
- **Guest Reviews** → Testimonials
- **Historical Timeline** → Property history
- **Rooms & Suites** → Room descriptions
- **FAQs** → Question & answer items
- **Neighborhood Guide** → Nearby places
- **Settings** → Contact info, social media

**Step 3: Make Changes**
1. Click the item you want to edit
2. Make your changes in the form fields
3. Click "Publish" (top right corner)
4. Wait 2-3 minutes for site to rebuild

**Step 4: Verify**
1. Visit your website
2. Refresh the page (Cmd+R or Ctrl+R)
3. Confirm your changes appear

### Common Content Updates

#### Add a New Guest Review

1. Go to Studio → **Guest Reviews** → **Create**
2. Fill in:
   - Guest Name: "Sarah & Tom J."
   - Location: "Boston, MA"
   - Rating: 5 stars
   - Title: "Perfect Family Vacation"
   - Review: Copy/paste their review text
   - Date: When they stayed
   - Platform: Airbnb, VRBO, or Direct
   - Featured: Check this for great reviews to show on homepage
3. Click **Publish**

**Where to find reviews:**
- Copy from Airbnb reviews tab
- Copy from VRBO reviews section
- Copy from direct guest emails

#### Update Rates

1. Go to Studio → **Pages** → **Rates & Booking**
2. Scroll to "Rate Tables" section
3. Edit pricing:
   - Nightly rate
   - Weekly rate (usually 15-20% discount)
   - Monthly rate (usually 30-40% discount)
   - Peak season rates
   - Holiday rates
4. Update "Last Updated" date
5. Click **Publish**

**Tip:** Update rates 30-60 days before season changes (summer, fall, winter, spring)

#### Add Gallery Images

1. Go to Studio → **Photo Gallery** → **Create**
2. Upload image (drag & drop or click to browse)
3. Fill in:
   - Title: "Master Bedroom Fireplace"
   - Alt Text: "Historic marble fireplace in master suite" (for accessibility)
   - Room Filter: Select which room (or "All")
   - Caption: Brief description (optional)
   - Featured: Check to show on homepage
   - Order: Number for sorting (lower = appears first)
4. Click **Publish**
5. Repeat for each image

**Photo Tips:**
- Take during daytime for best lighting
- Clean and stage rooms before photos
- Use professional photographer annually
- Aim for 70-100 total images
- Include detail shots (architectural features)

#### Update Contact Information

1. Go to Studio → **Settings** → **Site Settings**
2. Update:
   - Email address
   - Phone number
   - Social media links
   - Booking platform URLs (Airbnb, VRBO)
3. Click **Publish**

**Important:** Any changes here affect the entire site (header, footer, contact page)

#### Change Hero Images

1. Go to Studio → **Pages** → **Homepage**
2. Find "Hero Section"
3. Click "Upload" under Hero Image
4. Select new image
5. Click **Publish**

**Tip:** Hero images should be:
- High resolution (at least 1920x1080px)
- Well-lit, professional quality
- Show the property's best features
- Not too busy (text needs to overlay)

---

## Common Tasks

### Add a Special Offer

**Option 1: Homepage Banner**
1. Studio → **Pages** → **Homepage**
2. Add a "Special Announcement" section:
   - Heading: "Fall Special: 20% Off 7+ Night Stays"
   - Description: "Book by October 31st..."
   - CTA Button: "View Rates"
3. Publish

**Option 2: Rates Page Notice**
1. Studio → **Pages** → **Rates**
2. Add to "Seasonal Specials" section
3. Set expiration date reminder
4. Publish

### Respond to a Contact Form

**Email notifications are automatic:**
1. You receive email when someone submits form
2. Reply directly to their email
3. Include booking links if they're interested

**No action needed in Studio** - forms go to your email, not stored in CMS

### Update for a Holiday

**Example: Christmas/New Year**

1. **Update Rates:**
   - Studio → Pages → Rates
   - Set holiday pricing (usually 25-50% higher)
   - Set minimum stay (usually 5-7 nights for holidays)

2. **Add Holiday Photos:**
   - Decorate property for photos
   - Upload to Gallery with "Holiday" tag
   - Feature best ones on homepage

3. **Update Availability:**
   - Mark dates as booked in Airbnb/VRBO
   - Update homepage with "Holiday Booking Open"

4. **Add Holiday FAQs:**
   - Studio → FAQs → Create
   - Q: "Do you decorate for Christmas?"
   - A: "Yes, we provide a decorated tree..."

### Handle a Booking

**Bookings happen on Airbnb/VRBO, not your website**

Your website's job is to:
1. ✅ Show beautiful photos → Gallery Page
2. ✅ Build trust → Reviews Page
3. ✅ Answer questions → FAQs
4. ✅ Direct to booking platforms → "Book Now" buttons

**After guest books:**
1. Send them welcome email with check-in details
2. After stay, request they leave review on booking platform
3. If great review, add to your website:
   - Studio → Guest Reviews → Create
   - Copy their review
   - Mark as "Featured"
   - Publish

### Update Neighborhood Recommendations

**When new restaurant/shop opens nearby:**

1. Studio → **Neighborhood Guide** → **Create**
2. Fill in:
   - Name: "Parc Restaurant"
   - Category: "Restaurant"
   - Description: "French bistro with outdoor seating"
   - Address: "227 S 18th St"
   - Distance: "2 blocks (3-minute walk)"
   - Phone: (215) 545-2262
   - Website: https://parc-restaurant.com
   - Hours: "Daily 8am-12am"
   - Recommended: Check if you personally recommend
   - Price Level: $$ (or $, $$$, $$$$)
3. Publish

**Keep this updated!** Guests love current local recommendations.

---

## Troubleshooting

### "I published changes but don't see them on the site"

**Solution:**
1. Wait 3-5 minutes (site needs to rebuild)
2. Hard refresh your browser:
   - Mac: Cmd + Shift + R
   - Windows: Ctrl + Shift + R
3. Check in Netlify dashboard if deploy succeeded:
   - Go to https://app.netlify.com
   - Click your site
   - Check "Deploys" tab
   - Should show "Published" in green

### "Images aren't loading"

**Possible causes:**

1. **Image too large:**
   - Resize before uploading
   - Max recommended: 5MB per image
   - Sanity will optimize automatically

2. **Wrong format:**
   - Use: JPG, PNG, or WebP
   - Avoid: BMP, TIFF, PSD

3. **Slow connection:**
   - Images lazy-load (load as you scroll)
   - First visit is slower, then cached

**Fix:** Re-upload image at smaller size

### "Contact form not working"

**Check:**
1. Are you seeing success message after submit?
2. Is spam filtering catching emails? (Check spam folder)
3. Is email address correct in Site Settings?

**Fix:**
- Netlify Dashboard → Forms tab
- Check if submissions appear there
- Update email in Studio → Settings → Site Settings

### "Website is down"

**Very rare with Netlify (99.99% uptime)**

**First steps:**
1. Check if it's just you: https://downforeveryoneorjustme.com/yoursite.com
2. Check Netlify status: https://www.netlifystatus.com/
3. Check Netlify dashboard for deploy errors

**If actually down:**
- Email Netlify support: support@netlify.com
- They typically respond within hours

### "Google Analytics shows no data"

**Check:**
1. Did you add Google Analytics ID to Site Settings?
2. Has it been 24-48 hours since adding? (Data delayed)
3. Are you blocking ads/tracking in your browser? (Use incognito to test)

**Fix:**
- Verify GA Measurement ID in Studio → Settings
- Check Google Analytics admin for tracking code status

---

## Content Calendar Suggestions

### January
- [ ] Update rates for winter season
- [ ] Add winter/cozy photos to gallery
- [ ] Create "Winter Escape" promotion
- [ ] Add testimonials from holiday guests

### April
- [ ] Update rates for spring/summer
- [ ] Add spring photos (gardens blooming)
- [ ] Promote summer booking early
- [ ] Update nearby events (outdoor festivals)

### July
- [ ] Check peak summer rates are active
- [ ] Add summer outdoor photos
- [ ] Update gallery with recent guest photos (with permission)
- [ ] Promote fall booking

### October
- [ ] Update rates for fall/holiday season
- [ ] Add fall foliage photos
- [ ] Create holiday booking promotion
- [ ] Update FAQs for holiday policies

---

## Best Practices

### Content Quality

**Photos:**
- ✅ Natural lighting (daytime photos best)
- ✅ Clean, staged spaces
- ✅ Mix of wide shots and detail shots
- ✅ Consistent editing style
- ❌ Avoid dark, blurry, or cluttered photos

**Reviews:**
- ✅ Add new reviews within 1-2 weeks of guest stay
- ✅ Mix different guest types (families, couples, corporate)
- ✅ Respond to reviews in Studio (shows you care)
- ✅ Feature best reviews on homepage
- ❌ Don't edit guest reviews (keep authentic)

**Rates:**
- ✅ Update seasonally (4 times/year)
- ✅ Offer weekly/monthly discounts
- ✅ Clear cancellation policy
- ✅ Transparent about fees
- ❌ Don't change rates for confirmed bookings

### SEO Tips

**Do this to show up higher in Google:**

1. **Add Content Regularly:**
   - New reviews monthly
   - Update gallery quarterly
   - Refresh homepage copy annually

2. **Use Local Keywords:**
   - "Rittenhouse Square vacation rental"
   - "Philadelphia historic mansion rental"
   - "Center City Philadelphia house rental"

3. **Get Reviews:**
   - Every Airbnb/VRBO review helps
   - Encourage guests to review
   - Respond to all reviews

4. **Build Links:**
   - Get listed on local tourism sites
   - Share on social media
   - Partner with local businesses

### Security

**Protect your accounts:**
- ✅ Use strong, unique passwords
- ✅ Enable two-factor authentication (2FA)
- ✅ Don't share login credentials
- ✅ Log out on shared computers
- ❌ Don't save passwords in browser on public computers

**Protect guest privacy:**
- ✅ Only collect necessary information
- ✅ Don't share guest details publicly
- ✅ Follow Privacy Policy you've published
- ❌ Don't use guest photos without permission

---

## Getting Help

### Free Resources

**Documentation:**
- This guide (you're reading it!)
- SANITY-SETUP-GUIDE.md (technical setup)
- DEPLOYMENT-GUIDE.md (hosting info)

**Official Docs:**
- [Sanity Documentation](https://www.sanity.io/docs)
- [Netlify Support](https://docs.netlify.com/)
- [Google Analytics Help](https://support.google.com/analytics)

**Video Tutorials:**
- Search YouTube: "Sanity CMS tutorial"
- Search YouTube: "Netlify hosting guide"

### Support Contacts

**Technical Issues:**
- Sanity Support: https://www.sanity.io/help
- Netlify Support: https://www.netlify.com/support/
- Response time: Usually within 24 hours

**Content Questions:**
- Review this guide first
- Check Sanity docs
- Email: support@sanity.io

**Website Emergency:**
- Netlify status page: https://www.netlifystatus.com/
- Email: support@netlify.com
- Use "Priority" or "Urgent" in subject

### When to Hire Help

**Consider hiring a developer if:**
- You need major design changes
- You want to add new features (booking system, payment processing)
- You're experiencing persistent technical issues
- You want custom integrations (CRM, email marketing)

**For small updates:**
- You can handle most content changes yourself
- This guide covers 90% of regular maintenance
- Sanity Studio is designed to be user-friendly

---

## Maintenance Checklist

### Weekly (10 minutes)
- [ ] Check Google Analytics for traffic
- [ ] Respond to contact form submissions
- [ ] Glance at Netlify deploy status
- [ ] Check Airbnb/VRBO messages

### Monthly (30 minutes)
- [ ] Add new guest reviews (2-3 new ones)
- [ ] Update gallery if you have new photos
- [ ] Review rates for next season
- [ ] Check for any website errors in Netlify

### Quarterly (1-2 hours)
- [ ] Update rates for new season
- [ ] Refresh gallery with seasonal photos
- [ ] Review and update homepage content
- [ ] Check competitors and adjust positioning
- [ ] Update neighborhood recommendations
- [ ] Review Google Search Console for SEO

### Annually (3-4 hours)
- [ ] Hire professional photographer for new photos
- [ ] Full content audit (outdated info?)
- [ ] Review and update all policies
- [ ] Check Terms & Privacy pages for legal changes
- [ ] Assess website performance (Lighthouse test)
- [ ] Consider design refresh if needed
- [ ] Renew domain registration (auto-renew recommended)

---

## Pro Tips

### Increase Bookings

1. **Add Reviews Constantly:**
   - Every new 5-star review builds trust
   - Aim for 30-50 total reviews on site

2. **Professional Photography:**
   - Invest in pro photos annually
   - Worth $500-1000 investment
   - Can increase booking rate 30-50%

3. **Update Seasonal Photos:**
   - Show property in all seasons
   - Holiday decorations drive winter bookings
   - Garden blooms drive spring bookings

4. **Highlight Unique Features:**
   - 170-year history is a major differentiator
   - 14 original fireplaces
   - Rittenhouse Square location
   - Sleeps 16 (great for groups)

5. **Fast Response:**
   - Answer inquiries within 2 hours
   - Increases conversion rate
   - Shows professionalism

### Save Time

1. **Use Templates for Guest Communication:**
   - Save check-in instructions
   - Save house rules
   - Save local recommendations
   - Copy/paste for each guest

2. **Batch Content Updates:**
   - Upload 10 photos at once, not one at a time
   - Add multiple reviews in one session
   - Update all rates together

3. **Set Calendar Reminders:**
   - "Update rates for summer" - March 1st
   - "Add holiday photos" - November 1st
   - "Review testimonials" - 1st of every month

### Track What Works

**In Google Analytics, monitor:**
- Which pages visitors spend most time on
- Where visitors come from (Google, Airbnb, social media)
- What percentage visit "Rates" page (conversion funnel)
- Mobile vs desktop traffic (optimize accordingly)

**Use this data to:**
- Improve high-traffic pages
- Add more content on popular topics
- Optimize for devices your visitors use

---

## Quick Reference Card

**Print this out and keep handy:**

```
THE RITTENHOUSE RESIDENCE - QUICK REFERENCE

Website: https://therittenhouseresidence.com
Studio (edit content): https://therittenhouseresidence.com/admin
Netlify (hosting): https://app.netlify.com

TO UPDATE CONTENT:
1. Go to /admin
2. Find what to edit in sidebar
3. Make changes
4. Click "Publish" (top right)
5. Wait 3 minutes, refresh website

WEEKLY TASKS:
□ Check analytics
□ Respond to messages
□ Add new reviews

MONTHLY TASKS:
□ Update gallery
□ Review rates
□ Check for errors

EMERGENCY CONTACTS:
Netlify Support: support@netlify.com
Sanity Support: support@sanity.io
Domain Registrar: [your registrar support]

PASSWORDS SAVED IN: [1Password / LastPass / etc]
```

---

**Last Updated:** 2025-11-29
**Version:** 1.0
**For:** Property Owner/Manager

**Questions?** Email your developer or reference the technical documentation in this repository.
