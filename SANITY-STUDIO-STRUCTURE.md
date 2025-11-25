# SANITY STUDIO CONTENT STRUCTURE
## The Rittenhouse Residence - Complete CMS Configuration

**Generated:** 2025-11-25
**Status:** ✅ STUDIO CONFIGURED - READY FOR CONTENT
**Schemas:** 15 content types + 4 object types

---

## SANITY STUDIO ORGANIZATION

### 📄 PAGES (Singleton Documents)

#### 1. **Homepage** (`homepage` - ID: `homepage`)
**Purpose:** Main landing page content
**Status:** ✅ Schema Complete

**Content Structure:**
```json
{
  "_id": "homepage",
  "_type": "homepage",
  "title": "The Rittenhouse Residence - Historic Philadelphia Mansion",
  "hero": {
    "heading": "Historic Elegance in the Heart of Rittenhouse Square",
    "subheading": "1854 Greek Revival Mansion • 8 Bedrooms • Sleeps 16",
    "image": { /* Sanity image reference */ },
    "primaryCta": {
      "text": "View Rates & Book",
      "url": "/rates"
    },
    "secondaryCta": {
      "text": "Explore Gallery",
      "url": "/gallery"
    },
    "overlayOpacity": 0.25
  },
  "trustBar": {
    "rating": 4.9,
    "reviewCount": 500,
    "badges": ["Superhost", "5-Star", "Verified"]
  },
  "atAGlance": [
    {
      "icon": "👥",
      "label": "Capacity",
      "value": "16 Guests"
    },
    {
      "icon": "📍",
      "label": "Location",
      "value": "Rittenhouse Square"
    },
    {
      "icon": "⭐",
      "label": "Rating",
      "value": "4.9 / 5.0"
    },
    {
      "icon": "🏛️",
      "label": "Built",
      "value": "1854"
    }
  ],
  "photoStory": {
    "stories": [
      {
        "title": "Your Arrival",
        "description": "Step through the grand entrance...",
        "image": { /* DSC00066.jpg */ }
      },
      {
        "title": "Gathering Spaces",
        "description": "Double parlors with 18-foot ceilings...",
        "image": { /* DSC00090.jpg */ }
      },
      {
        "title": "Private Retreat",
        "description": "8 beautifully appointed bedrooms...",
        "image": { /* DSC00084.jpg */ }
      }
    ]
  },
  "bookingCta": {
    "heading": "Book Your Historic Stay",
    "airbnbUrl": "https://www.airbnb.com/...",
    "vrboUrl": "https://www.vrbo.com/..."
  },
  "seo": {
    "metaTitle": "The Rittenhouse Residence | Historic Philadelphia Mansion",
    "metaDescription": "Book your stay at Philadelphia's most distinguished historic mansion. 1854 Greek Revival elegance, 8 bedrooms, sleeps 16. Prime Rittenhouse Square location."
  }
}
```

---

#### 2. **Story Page** (`storyPage` - ID: `story`)
**Purpose:** Historical narrative page
**Status:** ✅ Schema Complete

**Content Structure:**
```json
{
  "_id": "story",
  "_type": "storyPage",
  "title": "The Story of 1822 Pine",
  "heroImage": { /* DSC00064.jpg */ },
  "introduction": "1822 Pine Street stands as one of Philadelphia's most remarkable...",
  "keyMilestones": [
    {
      "year": 1854,
      "title": "Original Construction",
      "description": "Built by merchant John McCrea..."
    },
    {
      "year": 1899,
      "title": "Gilded Age Transformation",
      "description": "Duhring, Okie & Ziegler renovation..."
    },
    {
      "year": 2024,
      "title": "Modern Luxury",
      "description": "Restored to original grandeur..."
    }
  ],
  "seo": { /* SEO metadata */ }
}
```

---

#### 3. **Rates Page** (`ratesPage` - ID: `rates`)
**Purpose:** Pricing and booking page
**Status:** ✅ Schema Complete

**Content Structure:**
```json
{
  "_id": "rates",
  "_type": "ratesPage",
  "title": "Rates & Booking",
  "weekdayRate": 1600,
  "weekendRate": 1800,
  "primeWeekendRate": 2500,
  "cleaningFee": 300,
  "weeklyDiscount": 10,
  "biweeklyDiscount": 15,
  "monthlyDiscount": 20,
  "directBookingDiscount": 5,
  "minimumStay": 2,
  "checkInTime": "4:00 PM",
  "checkOutTime": "11:00 AM",
  "airbnbUrl": "https://www.airbnb.com/...",
  "vrboUrl": "https://www.vrbo.com/...",
  "taxRate": 15.5,
  "includedAmenities": [
    {
      "category": "Bedrooms & Sleeping",
      "items": [
        "8 bedrooms across 5 luxury suites",
        "Sleeps 16 adults comfortably",
        "Premium linens and bedding",
        "Blackout curtains in all bedrooms"
      ]
    },
    {
      "category": "Bathrooms",
      "items": [
        "6.5 beautifully appointed bathrooms",
        "Luxury toiletries provided",
        "Plush towels and bath mats",
        "Hair dryers in each bathroom"
      ]
    }
  ],
  "policies": [
    {
      "title": "Cancellation Policy",
      "content": "Flexible cancellation up to 14 days before check-in..."
    },
    {
      "title": "Payment Terms",
      "content": "50% deposit due at booking, remainder due 30 days before arrival..."
    }
  ]
}
```

---

#### 4. **Contact Page** (`contactPage` - ID: `contact`)
**Purpose:** Contact information and form settings
**Status:** ✅ Schema Complete

**Content Structure:**
```json
{
  "_id": "contact",
  "_type": "contactPage",
  "title": "Contact Us",
  "email": "info@therittenhouseresidence.com",
  "phone": "+1 (215) XXX-XXXX",
  "address": {
    "street": "1822 Pine Street",
    "city": "Philadelphia",
    "state": "PA",
    "zip": "19103"
  },
  "responseTime": "Usually within 4 hours",
  "socialLinks": {
    "instagram": "https://instagram.com/therittenhouseresidence",
    "facebook": "https://facebook.com/therittenhouseresidence"
  }
}
```

---

### 📚 COLLECTIONS (Multiple Documents)

#### 5. **Gallery Images** (`galleryImage`)
**Purpose:** All property photos with metadata
**Status:** ✅ Schema Complete
**Expected Count:** 70+ images

**Sample Document:**
```json
{
  "_type": "galleryImage",
  "title": "Grand Entry Hall with Checkerboard Marble Floor",
  "image": {
    "asset": { /* Sanity image asset */ },
    "alt": "Black and white checkerboard marble floor in historic entry hall",
    "caption": "Original 1854 marble flooring welcomes you to the residence"
  },
  "room": "entry",
  "tags": ["historic", "marble", "entrance", "flooring"],
  "featured": true,
  "sortOrder": 1
}
```

**Room Categories:**
- `entry` - Entry Hall (featured marble floor)
- `parlors` - Double Parlors (18ft ceilings)
- `dining` - Dining Room
- `kitchen` - Chef's Kitchen
- `primary-suite` - Primary Suite
- `second-floor` - Second Floor Suite
- `third-floor` - Third Floor Suite
- `fourth-floor` - Fourth Floor Suite
- `garden` - Garden Suite
- `bathrooms` - Bathrooms (6.5 total)
- `outdoor` - Outdoor/Garden spaces
- `exterior` - Building exterior
- `details` - Architectural details (mantels, plasterwork)

---

#### 6. **Testimonials** (`testimonial`)
**Purpose:** Guest reviews from all platforms
**Status:** ✅ Schema Complete
**Expected Count:** 300+ reviews

**Sample Document:**
```json
{
  "_type": "testimonial",
  "guestName": "Sarah M.",
  "rating": 5,
  "review": "Absolutely stunning property! The historical details are breathtaking and the location couldn't be better. Perfect for our family reunion with 14 guests. The double parlors were ideal for gathering, and each bedroom was beautifully appointed. Highly recommend!",
  "stayDate": "2024-10-15",
  "platform": "airbnb",
  "featured": true,
  "verified": true,
  "sortOrder": 1
}
```

**Platform Options:**
- `airbnb` - Airbnb reviews
- `vrbo` - VRBO reviews
- `direct` - Direct booking guests
- `google` - Google reviews

---

#### 7. **Historical Timeline** (`historyTimeline`)
**Purpose:** Key moments in property history
**Status:** ✅ Schema Complete
**Expected Count:** 20-30 items

**Sample Document:**
```json
{
  "_type": "historyTimeline",
  "year": 1854,
  "title": "Original Construction",
  "description": "John McCrea, a prominent Philadelphia merchant, commissions the construction of 1822 Pine Street as a Greek Revival townhouse during the city's rapid westward expansion.",
  "image": { /* Historical document or photo */ },
  "featured": true,
  "category": "architecture"
}
```

**Categories:**
- `architecture` - Building construction/renovation
- `residents` - Notable residents
- `events` - Significant events
- `social` - Social/cultural moments

---

#### 8. **Historical Chapters** (`historyChapter`)
**Purpose:** 19 narrative chapters from history book
**Status:** ✅ Schema Complete
**Expected Count:** 19 chapters

**Sample Document:**
```json
{
  "_type": "historyChapter",
  "chapterNumber": 1,
  "title": "Before the Threshold",
  "subtitle": "1820s–1850s",
  "slug": { "current": "before-the-threshold" },
  "content": [
    {
      "_type": "block",
      "children": [
        {
          "_type": "span",
          "text": "In the 1820s, Pine Street was still at the western edge..."
        }
      ]
    },
    {
      "_type": "image",
      /* Historical image */
    }
  ],
  "timeperiod": "1820s-1850s",
  "sortOrder": 1,
  "excerpt": "The story begins before the house itself, in an era when Rittenhouse Square was still a dream..."
}
```

**19 Chapters:**
1. Preamble - "House at the Edge of the Square"
2. Before the Threshold (1820s-1850s)
3. Welcome to 1822 Pine Street
4. Between Mourning and Modernity (1891-1905)
5. The Spencer, Plumb, and Davis Years
6. Votes in the Parlor (1911-1918)
7. Walk the Rooms: A Self-Guided Tour
8. The Long Edwardian Afternoon (1905-1925)
9. Architecture & Fabric
10. Apartment House Years (1930s-1950s)
11. Back to a Single-Family Grande Dame (1995-present)
12. Walk the Rooms: Details & Materials
13. Provenance Dossier
14. Events & Filming Playbook
15. The Seasonal House
16. Architectural Floor Plans
17. Historical Timeline
18. Conclusion: Let the Marble Speak
19. Document Gallery

---

#### 9. **Rooms & Suites** (`room`)
**Purpose:** Detailed room/suite information
**Status:** ✅ Schema Complete
**Expected Count:** 5 suites (8 bedrooms total)

**Sample Document:**
```json
{
  "_type": "room",
  "name": "Primary Suite",
  "floor": 2,
  "bedrooms": 2,
  "bathrooms": 2,
  "maxOccupancy": 4,
  "description": "The Primary Suite occupies the entire second floor, featuring two spacious bedrooms, two full bathrooms, and elegant period details including marble mantels and ornate plasterwork.",
  "amenities": [
    "Two queen beds",
    "Two full private bathrooms",
    "Original marble fireplace",
    "Period wallpaper",
    "Sitting area",
    "High ceilings"
  ],
  "gallery": [ /* Array of images */ ],
  "sortOrder": 1
}
```

**5 Suites:**
1. Primary Suite (2nd floor) - 2 bedrooms, 2 baths
2. Second Floor Suite - 1-2 bedrooms
3. Third Floor Suite - 2 bedrooms
4. Fourth Floor Suite - 2 bedrooms
5. Garden Suite - 1 bedroom

---

#### 10. **FAQ Items** (`faqItem`)
**Purpose:** All frequently asked questions
**Status:** ✅ Schema Complete
**Expected Count:** 30+ questions

**Sample Document:**
```json
{
  "_type": "faqItem",
  "question": "What is your cancellation policy?",
  "answer": [
    {
      "_type": "block",
      "children": [
        {
          "_type": "span",
          "text": "We offer flexible cancellation up to 14 days before check-in for a full refund. Cancellations within 14 days are subject to a 50% refund. Please note that bookings through Airbnb or VRBO follow their respective platform policies."
        }
      ]
    }
  ],
  "category": "booking",
  "sortOrder": 1
}
```

**Categories:**
- `booking` - Booking & Cancellation
- `property` - Property Details
- `amenities` - Amenities & Services
- `rules` - House Rules & Policies
- `location` - Location & Transportation
- `special` - Special Requests

---

#### 11. **Neighborhood Locations** (`neighborhoodLocation`)
**Purpose:** Nearby restaurants, attractions, etc.
**Status:** ✅ Schema Complete
**Expected Count:** 50+ locations

**Sample Document:**
```json
{
  "_type": "neighborhoodLocation",
  "name": "Parc Restaurant",
  "category": "restaurant",
  "description": "French bistro with outdoor seating overlooking Rittenhouse Square. Perfect for breakfast, lunch, or dinner.",
  "address": "227 S 18th St",
  "walkingTime": 2,
  "featured": true,
  "priceRange": "$$$",
  "website": "https://www.parc-restaurant.com"
}
```

**Categories:**
- `restaurant` - Dining options
- `coffee` - Coffee shops & cafes
- `shopping` - Shopping & boutiques
- `museum` - Museums & galleries
- `park` - Parks & outdoor spaces
- `attraction` - Tourist attractions
- `transportation` - Transit hubs

---

#### 12. **Historical Documents** (`historicalDocument`)
**Purpose:** Deeds, articles, floor plans
**Status:** ✅ Schema Complete
**Expected Count:** 65+ documents

**Sample Document:**
```json
{
  "_type": "historicalDocument",
  "title": "Original 1854 Property Deed",
  "documentType": "deed",
  "year": 1854,
  "description": "Original property deed transfer from the City of Philadelphia to John McCrea for the construction of 1822 Pine Street.",
  "image": { /* Scanned document image */ },
  "transcription": "This Indenture made the fifteenth day of April...",
  "source": "Philadelphia City Archives"
}
```

**Document Types:**
- `deed` - Property deeds (17 documents, 1854-2013)
- `newspaper` - Newspaper clippings (35+ articles, 1824-1915)
- `floorplan` - Architectural floor plans (5 floors)
- `photograph` - Historical photographs
- `certificate` - Certificates & official documents

---

### ⚙️ SETTINGS (Singleton Documents)

#### 13. **Site Settings** (`siteSettings` - ID: `siteSettings`)
**Purpose:** Global site configuration
**Status:** ✅ Schema Complete

**Content Structure:**
```json
{
  "_id": "siteSettings",
  "_type": "siteSettings",
  "siteName": "The Rittenhouse Residence",
  "siteUrl": "https://therittenhouseresidence.com",
  "email": "info@therittenhouseresidence.com",
  "phone": "+1 (215) XXX-XXXX",
  "address": {
    "street": "1822 Pine Street",
    "city": "Philadelphia",
    "state": "PA",
    "zip": "19103"
  },
  "socialLinks": {
    "instagram": "https://instagram.com/therittenhouseresidence",
    "facebook": "https://facebook.com/therittenhouseresidence"
  },
  "bookingLinks": {
    "airbnb": "https://www.airbnb.com/...",
    "vrbo": "https://www.vrbo.com/..."
  },
  "logo": { /* Sanity image */ },
  "favicon": { /* Sanity image */ },
  "googleAnalytics": "G-XXXXXXXXXX"
}
```

---

#### 14. **SEO Settings** (`seoSettings` - ID: `seoSettings`)
**Purpose:** Default SEO configuration
**Status:** ✅ Schema Complete

**Content Structure:**
```json
{
  "_id": "seoSettings",
  "_type": "seoSettings",
  "defaultMetaTitle": "The Rittenhouse Residence | Historic Philadelphia Mansion",
  "defaultMetaDescription": "Book your stay at Philadelphia's most distinguished historic mansion. 1854 Greek Revival elegance, 8 bedrooms, sleeps 16 guests.",
  "defaultShareImage": { /* Sanity image */ },
  "twitterHandle": "@rittenhouse1822",
  "facebookAppId": "XXXXXXXXXXXX",
  "keywords": [
    "Philadelphia historic mansion",
    "Rittenhouse Square rental",
    "luxury vacation rental Philadelphia",
    "corporate retreat Philadelphia",
    "wedding venue Philadelphia"
  ]
}
```

---

### 🧩 OBJECT TYPES (Reusable Components)

#### 15. **Hero Section** (`heroSection`)
**Purpose:** Reusable hero component
**Used In:** Homepage, Story Page, Events Page

**Structure:**
```json
{
  "_type": "heroSection",
  "heading": "Historic Elegance",
  "subheading": "1854 Greek Revival Mansion",
  "image": { /* Sanity image */ },
  "primaryCta": {
    "text": "Book Now",
    "url": "/rates"
  },
  "secondaryCta": {
    "text": "Learn More",
    "url": "/story"
  },
  "overlayOpacity": 0.25
}
```

---

#### 16. **CTA Button** (`ctaButton`)
**Purpose:** Call-to-action buttons
**Used In:** All pages

**Structure:**
```json
{
  "_type": "ctaButton",
  "text": "Book Your Stay",
  "url": "/rates",
  "style": "primary",
  "openInNewTab": false
}
```

---

#### 17. **SEO Meta** (`seoMeta`)
**Purpose:** Page-specific SEO
**Used In:** All page types

**Structure:**
```json
{
  "_type": "seoMeta",
  "metaTitle": "The Story | The Rittenhouse Residence",
  "metaDescription": "Discover 170 years of Philadelphia history...",
  "ogImage": { /* Sanity image */ },
  "noIndex": false
}
```

---

#### 18. **Rate Table** (`rateTable`)
**Purpose:** Pricing table component
**Used In:** Rates Page

**Structure:**
```json
{
  "_type": "rateTable",
  "label": "Weekday Rate",
  "rate": 1600,
  "unit": "night",
  "note": "Monday through Thursday"
}
```

---

## SANITY STUDIO SIDEBAR ORGANIZATION

```
📁 CONTENT
├── 📄 Pages
│   ├── Homepage
│   ├── About/Story
│   ├── Rates & Booking
│   └── Contact
│
├── ─────────────────
│
├── 📚 Photo Gallery (galleryImage)
├── ⭐ Guest Reviews (testimonial)
├── 📅 Historical Timeline (historyTimeline)
├── 📖 Historical Chapters (historyChapter)
├── 🛏️ Rooms & Suites (room)
├── ❓ FAQs (faqItem)
├── 📍 Neighborhood Guide (neighborhoodLocation)
├── 📜 Historical Documents (historicalDocument)
│
├── ─────────────────
│
└── ⚙️ Settings
    ├── Site Settings
    └── SEO Settings
```

---

## CONTENT ENTRY WORKFLOW

### **For Property Managers:**

1. **Update Rates:**
   - Navigate to: Pages → Rates & Booking
   - Edit: Weekday/Weekend rates, discounts
   - Publish changes

2. **Add New Review:**
   - Navigate to: Guest Reviews
   - Click: Create New
   - Fill: Guest name, rating (1-5), review text, platform
   - Toggle: Featured (if exceptional review)
   - Publish

3. **Add Gallery Photos:**
   - Navigate to: Photo Gallery
   - Click: Create New
   - Upload image, add title, select room category
   - Add tags for filtering
   - Toggle: Featured (for homepage display)
   - Set sort order
   - Publish

4. **Update Contact Info:**
   - Navigate to: Settings → Site Settings
   - Edit: Email, phone, social media links
   - Publish

5. **Manage FAQs:**
   - Navigate to: FAQs
   - Create new or edit existing questions
   - Select category (booking, property, amenities, etc.)
   - Write answer using rich text editor
   - Publish

---

## CONTENT MIGRATION STATUS

### **✅ Ready for Migration:**
- Homepage structure
- All 70 images (with metadata from photo-catalog.json)
- Pricing data (rates, discounts, policies)
- FAQ items (parsed from faq.qmd)
- Historical timeline items (from timeline.qmd)
- All 19 chapters (from chapters/*.qmd)
- Site settings
- SEO defaults

### **📝 Requires Manual Entry:**
- Individual testimonials (300+ reviews from platforms)
- Room/suite detailed descriptions
- Neighborhood locations (50+ nearby places)
- Historical documents (65+ scanned docs)

### **🔄 Migration Script Features:**
- ✅ Automatic image optimization (max 2400px, 85% quality)
- ✅ Markdown to Portable Text conversion
- ✅ Metadata preservation
- ✅ Room categorization
- ✅ Tag extraction
- ✅ Sort order assignment

---

## SANITY STUDIO FEATURES

### **Content Management:**
- ✅ Rich text editor with images
- ✅ Image uploads with alt text
- ✅ Drag-and-drop reordering
- ✅ Content preview
- ✅ Publish/draft workflow
- ✅ Version history
- ✅ Content relationships

### **Image Management:**
- ✅ Automatic CDN optimization
- ✅ Responsive image generation
- ✅ Hotspot/crop controls
- ✅ Alt text for accessibility
- ✅ Metadata tagging

### **Team Features:**
- ✅ Multi-user access
- ✅ Role-based permissions
- ✅ Real-time collaboration
- ✅ Content scheduling
- ✅ Revision history
- ✅ Comment system

---

## NEXT STEPS

### **1. Initialize Sanity Project** (15 minutes)
```bash
cd /home/user/1822-Pine/astro-site
npx sanity init
# Follow prompts, save PROJECT_ID
```

### **2. Update Config Files** (5 minutes)
Replace `YOUR_PROJECT_ID` in:
- `astro.config.mjs` line 9
- `sanity.config.ts` line 13
- `sanity.cli.ts` line 3

### **3. Start Sanity Studio** (5 minutes)
```bash
cd /home/user/1822-Pine/astro-site
npm run dev
# Studio available at http://localhost:3000/admin
```

### **4. Run Migration Script** (30 minutes)
```bash
cd scripts
export SANITY_PROJECT_ID="your_project_id"
export SANITY_DATASET="production"
export SANITY_TOKEN="your_write_token"
python3 migrate-to-sanity.py
```

### **5. Manual Content Entry** (2-4 hours)
- Add 5 room descriptions
- Add 10-20 featured testimonials
- Add 20-30 neighborhood locations
- Add site contact information
- Upload logo and favicon

### **6. Test Integration** (30 minutes)
- Verify Astro pages pull Sanity data
- Test image optimization
- Validate all queries
- Check responsive images

### **7. Deploy Studio** (10 minutes)
```bash
npx sanity deploy
# Choose studio hostname
```

---

## STUDIO ACCESS

**URL Structure:**
- Local: `http://localhost:3000/admin`
- Production: `https://your-project.sanity.studio`
- Deployed: `https://rittenhouse-residence.sanity.studio` (after deploy)

**Default Views:**
- Dashboard: Overview of recent changes
- Content: Organized sidebar navigation
- Vision: Query testing tool (if plugin installed)
- Media: Image library browser (if plugin installed)

---

**Status:** ✅ STUDIO CONFIGURED & DOCUMENTED
**Next Action:** Initialize Sanity project with `npx sanity init`
**Total Content Types:** 15 schemas + 4 object types = 19 total
**Expected Documents:** 500+ (70 images, 300+ reviews, 19 chapters, FAQs, timeline, etc.)
