# Website Build Plan - Rittenhouse Residence
**Domain:** rittenhouseresidence.com
**Property:** 1822 Pine Street, Philadelphia, PA 19103
**Created:** 2026-01-09

---

## Executive Summary

This plan defines the complete technical implementation for a premium vacation rental website that combines:
- **Direct booking** with full Guesty integration
- **Rich historical content** (65 documents, 149 images, 198 years of history)
- **Guest self-service portal** with digital guidebook
- **Staff operations hub** with cleaning checklists and maintenance access
- **AI-powered automation** across the guest journey

The result: a fully automated, SEO-optimized booking engine that reduces OTA dependence while showcasing one of Philadelphia's most documented historic homes.

**Historical Content Depth:**
- **19 book chapters** with rich narratives spanning 1820s-present
- **65 primary source documents** (deeds, newspaper clippings, certificates)
- **198 years of documented history** (1824-2022)
- **OCR-verified facts** with traceable citations
- **Verified Drexel dynasty connection** (Ellen Roset → Anthony J. Drexel, 1850)
- **Documented suffrage activism** (Davis family, 1911-1915)

---

## I. Technical Architecture

### Framework Selection: **Next.js 14+ (App Router)**

**Why Next.js:**
- Server-side rendering for SEO (critical for direct booking discovery)
- API routes for secure Guesty integration
- Static generation for historical content (fast, cheap to host)
- Built-in image optimization (we have 149+ images)
- Vercel deployment with edge functions
- TypeScript support for reliability

**Alternative considered:** Quarto (existing) - rejected because:
- No dynamic booking capability
- No user authentication
- Limited API integration options

### Hosting & Infrastructure

| Component | Service | Rationale |
|-----------|---------|-----------|
| **Frontend** | Vercel | Edge deployment, automatic SSL, preview deploys |
| **Database** | Supabase (PostgreSQL) | Auth, real-time subscriptions, row-level security |
| **File Storage** | Cloudflare R2 | S3-compatible, no egress fees for 149+ images |
| **CDN** | Cloudflare | Image optimization, caching, DDoS protection |
| **Forms** | Netlify Forms or Formspree | Contact form handling |
| **Analytics** | Plausible + GA4 | Privacy-first primary, GA4 for conversion tracking |
| **Email** | Resend or Postmark | Transactional emails (confirmations, reminders) |

### Project Structure

```
rittenhouse-residence/
├── app/
│   ├── (public)/              # Public pages
│   │   ├── page.tsx           # Homepage
│   │   ├── stay/
│   │   │   ├── page.tsx       # Rooms & amenities
│   │   │   ├── floor-plans/
│   │   │   └── [room]/
│   │   ├── history/
│   │   │   ├── page.tsx           # History landing (gateway to all)
│   │   │   ├── timeline/          # Interactive timeline
│   │   │   ├── documents/         # 65-document archive
│   │   │   │   └── [slug]/        # Individual document viewer
│   │   │   ├── provenance/        # Verified facts dossier
│   │   │   ├── people/            # Historical figures
│   │   │   │   └── [person]/      # Individual profiles
│   │   │   └── chapters/          # Full book chapters
│   │   │       └── [chapter]/     # 19 narrative chapters
│   │   ├── gallery/
│   │   ├── neighborhood/
│   │   ├── events/
│   │   ├── faq/
│   │   └── contact/
│   ├── (booking)/             # Booking flow
│   │   ├── book/
│   │   │   ├── page.tsx       # Date selection + Guesty widget
│   │   │   ├── verify/        # Chekin ID verification
│   │   │   ├── agreement/     # Rental agreement
│   │   │   └── confirm/       # Payment + confirmation
│   │   └── api/
│   │       ├── guesty/        # Guesty webhooks
│   │       ├── chekin/        # Chekin callbacks
│   │       └── truvi/         # Screening webhooks
│   ├── (guest)/               # Authenticated guest portal
│   │   ├── portal/
│   │   │   ├── page.tsx       # Guest dashboard
│   │   │   ├── guidebook/     # Touch Stay embed or custom
│   │   │   ├── checkin/       # Self check-in instructions
│   │   │   ├── checkout/      # Checkout checklist
│   │   │   ├── upsells/       # The Host Co integration
│   │   │   └── support/       # Direct messaging
│   │   └── layout.tsx         # Auth wrapper
│   ├── (staff)/               # Staff operations hub
│   │   ├── ops/
│   │   │   ├── page.tsx       # Operations dashboard
│   │   │   ├── turnovers/     # Breezeway checklist links
│   │   │   ├── maintenance/   # MaintainX embed
│   │   │   ├── inventory/     # Supply tracking
│   │   │   └── emergency/     # Emergency procedures
│   │   └── layout.tsx         # Staff auth wrapper
│   ├── (admin)/               # Owner/manager dashboard
│   │   └── admin/
│   │       ├── revenue/       # Guesty reporting
│   │       ├── calendar/      # Availability management
│   │       └── settings/
│   └── api/
│       ├── auth/              # Supabase auth routes
│       ├── availability/      # Guesty availability proxy
│       ├── webhook/           # Inbound webhooks
│       └── cron/              # Scheduled jobs
├── components/
│   ├── booking/
│   │   ├── DatePicker.tsx
│   │   ├── GuestSelector.tsx
│   │   ├── PriceDisplay.tsx
│   │   └── BookingWidget.tsx
│   ├── gallery/
│   │   ├── ImageLightbox.tsx
│   │   ├── DocumentViewer.tsx
│   │   └── TimelineSlider.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── ui/                    # Shadcn/ui components
├── lib/
│   ├── guesty.ts              # Guesty API client
│   ├── chekin.ts              # Chekin integration
│   ├── truvi.ts               # Truvi integration
│   ├── supabase.ts            # Database client
│   └── analytics.ts           # Event tracking
├── content/
│   ├── history/               # MDX historical content
│   ├── documents/             # Document metadata
│   └── rooms/                 # Room descriptions
├── public/
│   ├── images/
│   │   ├── property/          # Professional photos
│   │   ├── documents/         # Historical document scans
│   │   ├── floor-plans/
│   │   └── airbnb/
│   └── pdfs/                  # Downloadable floor plans
└── data/
    ├── timeline.json          # Generated from timeline.yml
    └── documents.json         # Document catalog
```

---

## II. Integration Architecture

### A. Booking Engine (Guesty)

**Integration Method:** Guesty Open API v2 + Booking Engine Widget

```
┌─────────────────────────────────────────────────────────────────┐
│                        BOOKING FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. SEARCH                    2. VERIFY                         │
│  ┌──────────────┐            ┌──────────────┐                   │
│  │ Date Picker  │───────────▶│ Chekin ID    │                   │
│  │ Guest Count  │            │ Verification │                   │
│  │ Guesty API   │            │              │                   │
│  └──────────────┘            └──────┬───────┘                   │
│                                     │                            │
│  3. SCREEN                    4. AGREE                          │
│  ┌──────────────┐            ┌──────────────┐                   │
│  │ Truvi        │◀───────────│ Rental       │                   │
│  │ Background   │            │ Agreement    │                   │
│  │ Check        │            │ House Rules  │                   │
│  └──────┬───────┘            └──────────────┘                   │
│         │                                                        │
│  5. PAY                       6. CONFIRM                        │
│  ┌──────────────┐            ┌──────────────┐                   │
│  │ Stripe via   │───────────▶│ Guesty       │                   │
│  │ Guesty       │            │ Reservation  │                   │
│  │              │            │ Created      │                   │
│  └──────────────┘            └──────┬───────┘                   │
│                                     │                            │
│  7. POST-BOOKING                    ▼                            │
│  ┌──────────────────────────────────────────────────┐           │
│  │ • Confirmation email (Guesty)                     │           │
│  │ • Guidebook delivery (Touch Stay)                 │           │
│  │ • Upsell offers (The Host Co)                    │           │
│  │ • Pre-arrival checklist (Guesty Automations)     │           │
│  │ • Lock code generation (Schlage via Guesty)      │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**API Endpoints Required:**

```typescript
// lib/guesty.ts
export const guestyClient = {
  // Availability
  getAvailability: (startDate: string, endDate: string) => Promise<Availability>,
  getPrice: (checkIn: string, checkOut: string, guests: number) => Promise<Quote>,

  // Reservations
  createReservation: (data: ReservationInput) => Promise<Reservation>,
  getReservation: (id: string) => Promise<Reservation>,

  // Guest Portal
  getGuestReservation: (confirmationCode: string) => Promise<GuestView>,

  // Webhooks
  handleWebhook: (event: GuestyWebhookEvent) => Promise<void>,
}
```

### B. Guest Screening Flow (Chekin + Truvi)

```
Guest Selects Dates
        │
        ▼
┌───────────────────┐
│ Chekin Widget     │
│ - ID Upload       │
│ - Selfie Match    │
│ - Data Extraction │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ Truvi Screening   │
│ - Background      │
│ - Fraud Score     │
│ - Deposit Calc    │
└────────┬──────────┘
         │
    Pass/Fail
         │
    ┌────┴────┐
    │         │
   Pass      Fail
    │         │
    ▼         ▼
 Continue   Manual
 to Pay     Review
```

### C. Operations Integration (Staff Hub)

```
┌─────────────────────────────────────────────────────────────────┐
│                     STAFF OPERATIONS HUB                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   BREEZEWAY     │  │   MAINTAINX     │  │   GUESTY        │ │
│  │   (Cleaning)    │  │  (Maintenance)  │  │   (Calendar)    │ │
│  │                 │  │                 │  │                 │ │
│  │ • Checklists    │  │ • Work Orders   │  │ • Reservations  │ │
│  │ • Photo Logs    │  │ • PM Schedule   │  │ • Guest Comms   │ │
│  │ • Inspections   │  │ • Vendor Mgmt   │  │ • Tasks         │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│           │                    │                    │           │
│           └────────────────────┼────────────────────┘           │
│                                │                                 │
│                    ┌───────────▼───────────┐                    │
│                    │   UNIFIED DASHBOARD    │                    │
│                    │   (Next.js /ops page)  │                    │
│                    │                        │                    │
│                    │ • Today's turnovers    │                    │
│                    │ • Open maintenance     │                    │
│                    │ • Upcoming arrivals    │                    │
│                    │ • Emergency contacts   │                    │
│                    └────────────────────────┘                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### D. Smart Home Integration

```
┌─────────────────────────────────────────────────────────────────┐
│                    SMART HOME ECOSYSTEM                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Access Control          Monitoring           Climate/Utilities │
│  ┌──────────────┐       ┌──────────────┐     ┌──────────────┐  │
│  │   SCHLAGE    │       │    MINUT     │     │    NEST      │  │
│  │   Locks      │       │  Noise/Party │     │  Thermostats │  │
│  │              │       │              │     │              │  │
│  │ • Auto codes │       │ • Alerts     │     │ • Auto temps │  │
│  │ • Entry logs │       │ • Occupancy  │     │ • Schedules  │  │
│  └──────────────┘       └──────────────┘     └──────────────┘  │
│                                                                  │
│  ┌──────────────┐       ┌──────────────┐     ┌──────────────┐  │
│  │    RING      │       │  FLO BY MOEN │     │    EERO      │  │
│  │  Doorbells   │       │    Water     │     │   Wi-Fi      │  │
│  │              │       │              │     │              │  │
│  │ • Video logs │       │ • Leak detect│     │ • StayFi     │  │
│  │ • Motion     │       │ • Auto shutoff│    │ • Captive    │  │
│  └──────────────┘       └──────────────┘     └──────────────┘  │
│                                                                  │
│  Integration via: Guesty API + Native Apps + Webhooks           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## III. Page-by-Page Specification

### A. Public Pages

#### 1. Homepage (`/`)
**Purpose:** Convert visitors to bookings, establish credibility

**Sections:**
1. **Hero** - Full-bleed image with booking widget overlay
   - Headline: "A Philadelphia Landmark Since 1854"
   - Subhead: "8 bedrooms • Rittenhouse Square • Historic luxury"
   - Embedded date picker + "Check Availability" CTA

2. **Trust Signals**
   - "Est. 1854 • 170 years of history"
   - "Drexel Family Connection"
   - "Featured in [publications]"
   - Star rating from Airbnb/VRBO

3. **Property Highlights** - 3-column grid
   - 8 Bedrooms, 5 Bathrooms
   - Steps from Rittenhouse Square
   - Documented suffrage history

4. **Photo Gallery Teaser** - 6 images + "View All"

5. **Historical Credibility**
   - "65 verified historical documents"
   - "198 years of documented history"
   - "Connected to Drexel banking dynasty"
   - Link to History section

6. **Guest Reviews** - Carousel from Guesty/Airbnb API

7. **Booking CTA** - Sticky footer on mobile

**SEO:**
- Title: "Rittenhouse Residence | Historic 8BR Philadelphia Mansion | Since 1854"
- Meta: "Book the Rittenhouse Residence - a verified historic mansion steps from Rittenhouse Square. 8 bedrooms, documented Drexel connection, suffrage history. Direct booking available."

#### 2. Stay (`/stay`)
**Sections:**
- Overview with specs (8BR/5BA, 16-18 guests)
- Room-by-room gallery with names and features
- Amenities grid (Wi-Fi, A/C, full kitchen, washer/dryer, etc.)
- Floor plan navigation

#### 3. Floor Plans (`/stay/floor-plans`)
- Interactive floor plan viewer
- Click-to-zoom per floor
- Room labels with links to detail pages
- PDF download option

#### 4. History Landing (`/history`)
**Purpose:** Gateway to the deepest historical documentation of any Philadelphia residence

**Hero Section:**
- "198 Years of Documented History"
- "65 Primary Source Documents • 19 Narrative Chapters • Verified by OCR"

**Navigation Cards:**
1. **The Full Story** → `/history/chapters` (19 chapters)
2. **Interactive Timeline** → `/history/timeline`
3. **Document Archive** → `/history/documents` (65 docs)
4. **Verified Provenance** → `/history/provenance`
5. **Historical Figures** → `/history/people`

**Featured Stories (rotating highlights):**
- "The Drexel Connection" - How Ellen Roset's 1850 marriage links this house to the Drexel banking dynasty
- "Votes in the Parlor" - The Davis family's suffrage activism (1911-1915)
- "The 1899 Transformation" - Duhring, Okie & Ziegler's documented renovation
- "A Child Lost" - The 1891 scarlet fever tragedy at 1822 Pine

**Quick Facts Panel:**
- Built: c. 1845, first sale 1854
- Builder: John McCrea (prolific Rittenhouse developer)
- Ownership spans: 8 distinct family eras
- Historic District: Rittenhouse-Fitler (1995)

---

### HISTORY SECTION DEEP DIVE

#### 5. Book Chapters Hub (`/history/chapters`)
**Purpose:** Full access to all 19 narrative chapters - the complete "House at the Edge of the Square" manuscript

**Chapter Index:**

| # | Chapter | Period | Key Content | Source File |
|---|---------|--------|-------------|-------------|
| 00 | Preamble | - | Introduction, proof standards | `00-preamble.qmd` |
| 01 | Before the Threshold | 1820s-1850s | McCrea builds, Rosets arrive, Drexel connection | `01-before-the-threshold.qmd` |
| 01-ALT | Welcome | - | Alternative opening | `01-welcome.qmd` |
| 02 | Between Mourning & Modernity | 1860s-1880s | Civil War era, estate transitions | `02-between-mourning-and-modernity.qmd` |
| 03 | Votes in the Parlor | 1890s-1920 | Suffrage activism, tax resistance, Equal Franchise tickets | `03-votes-in-the-parlor.qmd` |
| 03-ALT | 1891-1905 | 1891-1905 | Spencer scarlet fever death, DO&Z renovation | `03-1891-1905.qmd` |
| 04 | Walk the Rooms | - | Room-by-room architectural tour | `04-walk-the-rooms.qmd` |
| 05 | Long Edwardian Afternoon | 1900-1920 | Society life, weddings, medical practice | `05-long-edwardian-afternoon.qmd` |
| 06 | Architecture & Fabric | - | Construction, materials, craftsmanship | `06-architecture-fabric.qmd` |
| 07 | Apartment House Years | 1932-1950 | Depression conversion, WWII | `07-apartment-house-years.qmd` |
| 08 | Back to Grande Dame | 1950-1952 | Restoration to single-family | `08-back-to-grande-dame.qmd` |
| 09 | Walk the Rooms Field Guide | - | Practical visitor guide | `09-walk-rooms-field-guide.qmd` |
| 10 | Provenance Dossier | - | Copy-ready facts with citations | `10-provenance-dossier.qmd` |
| 11 | Events & Filming Playbook | - | Modern event logistics | `11-events-filming-playbook.qmd` |
| 12 | The Seasonal House | - | Year-round property guide | `12-seasonal-house.qmd` |
| 13 | Floor Plans | - | All 5 floors + roof deck | `13-floor-plans.qmd` |
| 98 | Timeline | 1824-2022 | Chronological listing (auto-generated) | `98-timeline.qmd` |
| 99 | Document Gallery | - | All 65 documents displayed | `99-document-gallery.qmd` |
| 99-C | Conclusion | - | Book closing | `99-conclusion.qmd` |

**Chapter Page Template (`/history/chapters/[slug]`):**
- Full narrative content (converted from QMD to MDX)
- Inline document references with hover previews
- "What to Notice Today" callout boxes
- Related documents sidebar
- Previous/Next chapter navigation
- "Book Your Stay" CTA

#### 6. Interactive Timeline (`/history/timeline`)
**Purpose:** Visual journey through 198 years

**Timeline Visualization:**
```
1824 ─────────────────────────────────────────────────────────── 2022
  │                                                                │
  ├─ 1854: McCrea sells to Roset                                   │
  ├─ 1850: Ellen Roset marries Anthony J. Drexel                  │
  ├─ 1891: Howard Spencer Jr. dies of scarlet fever               │
  ├─ 1893: Property sold for $14,000                              │
  ├─ 1899: DO&Z renovation commissioned                           │
  ├─ 1901: Rolin-Plumb wedding breakfast                          │
  ├─ 1904: Davis family "At Homes"                                │
  ├─ 1905: $130 fireplace installation                            │
  ├─ 1911: Tax resistance activism                                │
  ├─ 1915: Martha Davis sells suffrage tickets                    │
  ├─ 1918: Naomi Lawton Davis dies at 1822 Pine                   │
  ├─ 1922-1952: Apartment era (5 transfers)                       │
  ├─ 1995: Historic district designation                          │
  └─ 2013: Luxury rental revival                                  │
```

**Features:**
- Zoomable timeline (decade, year, month views)
- Filter by: Ownership | Architecture | Society | Events | Tragedy
- Click any event → modal with source document preview
- "Explore This Era" → links to relevant chapter
- Data source: `data/timeline.yml`

#### 7. Document Archive (`/history/documents`)
**Purpose:** Searchable archive of all 65 primary source documents

**Document Categories:**

| Category | Count | Examples |
|----------|-------|----------|
| **Deeds** | 21 | 1854 McCrea→Roset, 1893 sale, 1899 Spencer, 1979-2013 modern |
| **Newspaper Clippings** | 32 | Suffrage coverage, society pages, death notices, renovation news |
| **Floor Plans** | 10 | All 5 floors (JPG + PDF) |
| **Certificates** | 1 | Property certificate (2022) |
| **Sale Records** | 1 | "1822 Sold for $14,000" (1893) |

**Archive Features:**
- Grid view with thumbnail previews
- List view with metadata
- Search by: keyword, date range, person name, document type
- Sort by: date (oldest/newest), relevance, type
- OCR text overlay toggle
- Download options (web/print resolution)
- Citation generator (Chicago, MLA, BibTeX)

**Individual Document Page (`/history/documents/[slug]`):**
- High-resolution zoomable viewer
- OCR text panel (searchable, selectable)
- Metadata:
  - Publication/Source
  - Date
  - People mentioned
  - Addresses mentioned
  - Related documents
- "Appears in Chapters" links
- Share/cite buttons

#### 8. Verified Provenance (`/history/provenance`)
**Purpose:** Marketing-safe, citation-backed facts

**Content from `10-provenance-dossier.qmd`:**

**Chain of Title Visualization:**
```
┌─────────────────────────────────────────────────────────────────┐
│                    OWNERSHIP CHAIN (1854-Present)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1854 ──► JOHN McCREA (builder) sells to JOHN ROSET             │
│           │                                                      │
│  1854-1880 JOHN & MARY ANN ROSET                                │
│           │ (daughter Ellen married Anthony J. Drexel, 1850)    │
│           │                                                      │
│  1880-1893 PENNSYLVANIA COMPANY (trustee)                       │
│           │                                                      │
│  1893-1896 GRAHAM SPENCER                                       │
│           │ (son Howard Jr. died here of scarlet fever, 1891)   │
│           │                                                      │
│  1896-1899 SPENCER ESTATE                                       │
│           │                                                      │
│  1899-1920s AGNES SPENCER → DAVIS FAMILY                        │
│           │ (DO&Z renovation 1899, suffrage activism 1911-1915) │
│           │                                                      │
│  1922-1952 APARTMENT ERA (5 transfers)                          │
│           │                                                      │
│  1952-1995 RESTORATION ERA                                      │
│           │                                                      │
│  1995     HISTORIC DISTRICT DESIGNATION                         │
│           │                                                      │
│  2013-NOW LUXURY RENTAL/EVENT VENUE                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Verified Facts (each with source link):**
- ✓ Built c. 1845, first documented sale April 1854
- ✓ Builder: John McCrea, prolific Rittenhouse developer
- ✓ Drexel connection: Ellen Roset married Anthony J. Drexel (August 13, 1850)
- ✓ 1899 renovation by Duhring, Okie & Ziegler
- ✓ 1905 fireplace installation ($130)
- ✓ 1911 tax resistance activism (Mrs. Henry C. Davis)
- ✓ 1915 suffrage ticket sales (Miss Martha Davis)
- ✓ 1918 death of Naomi Lawton Davis at this address
- ✓ 1995 Rittenhouse-Fitler Historic District inclusion

**Download Options:**
- Provenance Handout (PDF)
- Full Citation List (BibTeX)
- Marketing Fact Sheet

#### 9. Historical Figures (`/history/people`)
**Purpose:** Profiles of people connected to 1822 Pine Street

**Featured Profiles:**

| Person | Connection | Period |
|--------|------------|--------|
| **John McCrea** | Builder/developer | 1854 |
| **John Roset** | First owner | 1854-1870 |
| **Mary Ann Laning Roset** | Owner | 1854-1880 |
| **Ellen Roset Drexel** | Daughter, married Anthony J. Drexel | 1850 |
| **Anthony J. Drexel** | Son-in-law, Drexel University founder | 1850+ |
| **Graham Spencer** | Owner | 1893-1896 |
| **Agnes M. Spencer** | Heir, commissioned DO&Z renovation | 1899 |
| **Howard Spencer Jr.** | Died of scarlet fever at age 7 | 1891 |
| **Henry C. Davis** | Owner | 1900s-1918 |
| **Naomi Lawton Davis** | Suffragist, tax resister | 1911-1918 |
| **Martha Davis** | Suffragist, sold Equal Franchise tickets | 1915 |
| **Duhring, Okie & Ziegler** | Architects (1899 renovation) | 1899 |
| **Dr. Damon B. Pfeiffer** | Physician at 1822 Pine | 1915 |

**Person Page Template (`/history/people/[slug]`):**
- Portrait (if available) or era-appropriate illustration
- Biographical summary
- Connection to 1822 Pine Street
- Source documents mentioning this person
- Related chapters
- External links (Find a Grave, WikiTree, etc.)

---

### DOCUMENT VIEWER SPECIFICATION

**High-Resolution Document Viewer Component:**

```typescript
interface DocumentViewerProps {
  document: {
    id: string;
    title: string;
    date: string;
    type: 'deed' | 'clipping' | 'floorplan' | 'certificate';
    imageUrl: string;
    thumbnailUrl: string;
    ocrText: string;
    metadata: {
      source: string;
      publication?: string;
      page?: number;
      people: string[];
      addresses: string[];
      dates: string[];
    };
    relatedDocuments: string[];
    appearsInChapters: string[];
  };
}

// Features:
// - Pinch-to-zoom on mobile
// - Pan navigation
// - OCR text overlay toggle
// - Full-screen mode
// - Download (web/print resolution)
// - Share with deep link
// - Citation copy (multiple formats)
```

**OCR Text Panel:**
- Side-by-side or overlay mode
- Highlight search terms
- Select and copy text
- Report OCR errors (for future correction)

---

#### 10. Photo Gallery (`/gallery`)
- Tabs: Modern | Historic
- Masonry grid layout
- Lightbox with captions
- Filter by: Room, Era, Feature

#### 11. Neighborhood (`/neighborhood`)
- Interactive map (Mapbox or Google Maps)
- Walking distances to attractions
- Restaurant recommendations
- Transportation guide
- Local tips from guidebook

#### 12. Events & Filming (`/events`)
- Event capacity info
- Floor plan for event layout
- Inquiry form
- Past events/productions (if applicable)

#### 13. FAQ (`/faq`)
- Accordion sections:
  - Booking & Payment
  - Check-in & Access
  - Amenities & Features
  - House Rules
  - Neighborhood & Location
  - Historical Questions

#### 14. Contact (`/contact`)
- Contact form (Netlify Forms)
- Direct phone (OpenPhone)
- Email
- Map embed
- Response time commitment

### B. Booking Flow Pages

#### 13. Book (`/book`)
**Step 1: Search**
- Full-page booking experience
- Calendar with Guesty availability
- Guest count selector (max 18)
- Price calculation display
- "Continue" to verification

#### 14. Verify (`/book/verify`)
**Step 2: Guest Verification**
- Chekin widget embed
- ID upload + selfie
- Progress indicator
- "Why we verify" explainer
- Continue to agreement

#### 15. Agreement (`/book/agreement`)
**Step 3: Rental Agreement**
- Digital rental agreement display
- House rules acknowledgment
- Checkbox confirmations
- E-signature capture
- Continue to payment

#### 16. Confirm (`/book/confirm`)
**Step 4: Payment & Confirmation**
- Order summary
- Stripe payment form (via Guesty)
- Security deposit info (Truvi)
- Confirmation + next steps
- Redirect to guest portal

### C. Guest Portal (Authenticated)

#### 17. Guest Dashboard (`/portal`)
- Welcome message with confirmation code
- Stay countdown
- Quick links:
  - Check-in instructions
  - Digital guidebook
  - House rules
  - Support contact
- Upsell carousel (The Host Co)

#### 18. Digital Guidebook (`/portal/guidebook`)
- Touch Stay embed OR custom MDX pages
- Sections:
  - Welcome & Access
  - Wi-Fi & Entertainment
  - Kitchen & Appliances
  - Climate Control
  - Neighborhood Guide
  - Emergency Contacts
  - Checkout Procedures
  - **House History** (integrated from chapters)

#### 18b. Guest History Experience (`/portal/history`)
**Purpose:** Give guests exclusive access to the house's story during their stay

**Features:**
- "Your Room's History" - personalized content based on which bedroom they're in
- "What Happened Here" - events that occurred in the rooms they're using
- Room-by-room historical pins (from Chapter 09 Field Guide):
  - Hall table: "At Homes" card tray (1904)
  - Parlors: 1899 DO&Z renovation, 1905 fireplace
  - Stair landing: Naomi Lawton Davis (1918)
- Audio tour option (text-to-speech from chapter content)
- "Explore More" links to full history section
- Printable "History Highlights" one-pager for guests to take home
- QR codes placed throughout the house linking to room-specific history

#### 19. Check-in Instructions (`/portal/checkin`)
- Step-by-step arrival guide
- Lock code display (day of arrival)
- Parking instructions
- Entry photos/video
- Contact for issues

#### 20. Checkout (`/portal/checkout`)
- Checkout time reminder
- Checklist:
  - Dishes done
  - Trash bagged
  - Thermostat set
  - Doors locked
- Lock code expiration notice

#### 21. Upsells (`/portal/upsells`)
- The Host Co embed or API integration
- Options:
  - Early check-in ($100)
  - Late checkout ($100)
  - Mid-stay cleaning ($250)
  - Grocery stocking (market rate + 20%)
  - Airport transfer ($75-150)
  - In-home chef (market rate)

#### 22. Support (`/portal/support`)
- Direct message to host (via Guesty)
- FAQ quick links
- Emergency contacts
- Issue reporting form

### D. Staff Operations Hub (Authenticated)

#### 23. Ops Dashboard (`/ops`)
- Today's turnovers
- Upcoming check-ins/outs (48hr)
- Open maintenance tickets
- Alert status (Minut, Flo)
- Quick links to all tools

#### 24. Turnovers (`/ops/turnovers`)
- Breezeway embed or iframe
- Calendar view of cleaning schedule
- Checklist access
- Photo upload links
- Issue flagging

#### 25. Maintenance (`/ops/maintenance`)
- MaintainX embed
- Open tickets list
- Create new ticket
- Vendor directory
- Preventative schedule

#### 26. Emergency Procedures (`/ops/emergency`)
- Utility shutoff locations
- Emergency contacts (plumber, electrician, etc.)
- Fire/safety procedures
- Insurance info
- Incident reporting form

### E. Admin Dashboard (Authenticated)

#### 27. Admin Home (`/admin`)
- Revenue summary
- Occupancy calendar
- Recent bookings
- Performance metrics

#### 28. Revenue (`/admin/revenue`)
- Guesty reporting embed
- Revenue by channel
- ADR, RevPAR metrics
- Payout history

---

## IV. Content Migration Strategy

### Historical Content Migration

| Source | Destination | Format |
|--------|-------------|--------|
| `chapters/*.qmd` | `content/history/*.mdx` | MDX with components |
| `data/timeline.yml` | `data/timeline.json` | JSON for React |
| `metadata/*.json` | `data/documents.json` | Unified catalog |
| `images/web/*` | `public/images/documents/` | Optimized |
| `property_photos/*` | `public/images/property/` | Optimized |
| `docs/facts-verified.md` | `content/provenance.mdx` | MDX |

### Image Optimization Pipeline

```bash
# Using Next.js Image component + Cloudflare
1. Source images in public/images/
2. Next/Image handles responsive sizing
3. Cloudflare R2 + CDN for delivery
4. Blur placeholders for loading
```

---

## V. SEO Strategy

### Technical SEO

1. **Site Structure**
   - Clean URL hierarchy
   - XML sitemap auto-generation
   - robots.txt configuration
   - Canonical URLs

2. **Performance**
   - Core Web Vitals optimization
   - Image lazy loading
   - Critical CSS extraction
   - Edge caching

3. **Schema Markup**
   ```json
   {
     "@type": "LodgingBusiness",
     "name": "Rittenhouse Residence",
     "address": "1822 Pine Street, Philadelphia, PA 19103",
     "priceRange": "$1600-$2500/night",
     "amenityFeature": [...],
     "hasMap": "...",
     "photo": [...],
     "review": [...]
   }
   ```

4. **Local SEO**
   - Google Business Profile
   - Bing Places
   - Apple Maps Connect
   - Consistent NAP across listings

### Content SEO

1. **Target Keywords**
   - Primary: "Rittenhouse Square vacation rental", "Philadelphia historic mansion rental"
   - Secondary: "large group rental Philadelphia", "historic home events Philadelphia"
   - Long-tail: "8 bedroom vacation rental Philadelphia", "Rittenhouse Square wedding venue"

2. **Content Strategy**
   - Historical blog posts (monthly)
   - Neighborhood guides
   - Event planning guides
   - Philadelphia history content

---

## VI. AI Automation Strategy

### Guest Journey Automation (Guesty + Custom)

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTOMATED GUEST JOURNEY                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BOOKING                                                         │
│  ├─ Instant confirmation email                                   │
│  ├─ Rental agreement delivery                                    │
│  └─ Truvi screening auto-trigger                                │
│                                                                  │
│  PRE-ARRIVAL (-7 days)                                          │
│  ├─ Pre-arrival checklist email                                 │
│  ├─ Upsell offers (early check-in, groceries)                   │
│  └─ Guidebook link delivery                                     │
│                                                                  │
│  PRE-ARRIVAL (-1 day)                                           │
│  ├─ Check-in instructions                                       │
│  ├─ Lock code delivery                                          │
│  ├─ Weather forecast                                            │
│  └─ Cleaning team turnover triggered                            │
│                                                                  │
│  CHECK-IN DAY                                                    │
│  ├─ Welcome message (3pm)                                       │
│  ├─ "Everything OK?" check-in (8pm)                             │
│  └─ Local recommendations push                                  │
│                                                                  │
│  MID-STAY (multi-night)                                         │
│  ├─ Mid-stay check-in message                                   │
│  └─ Mid-stay cleaning offer                                     │
│                                                                  │
│  CHECKOUT DAY                                                    │
│  ├─ Checkout reminder (8am)                                     │
│  ├─ Checkout checklist                                          │
│  └─ Lock code expiration                                        │
│                                                                  │
│  POST-STAY                                                       │
│  ├─ Thank you message                                           │
│  ├─ Review request (48hr delay)                                 │
│  ├─ Future booking discount                                     │
│  └─ StayFi email capture for remarketing                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Operations Automation

1. **Turnover Triggers**
   - Guesty checkout → Breezeway task auto-created
   - Breezeway complete → Guesty task marked done
   - Photo log auto-attached to reservation

2. **Maintenance Alerts**
   - Flo by Moen leak → MaintainX ticket + SMS alert
   - Minut noise alert → Guesty message to guest + host
   - HVAC issue → Vendor auto-notification

3. **Dynamic Pricing**
   - PriceLabs connected to Guesty
   - Custom rules for outlier property:
     - Floor: $1,400/night
     - Ceiling: $3,500/night
     - Event premium: +50%
     - Last-minute: -15% max

---

## VII. Authentication & Security

### User Roles

| Role | Access | Auth Method |
|------|--------|-------------|
| **Guest** | Portal, guidebook, upsells | Confirmation code + email (magic link) |
| **Staff** | Ops hub, checklists, emergency | Email/password + 2FA |
| **Admin** | Full access, revenue, settings | Email/password + 2FA |

### Security Measures

1. **Authentication**: Supabase Auth with magic links for guests
2. **Authorization**: Row-level security in Supabase
3. **API Security**: Server-side only for Guesty/payment APIs
4. **Data Privacy**: GDPR-compliant data handling
5. **PCI Compliance**: Stripe handles all payment data

---

## VIII. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up Supabase (auth + database)
- [ ] Configure Vercel deployment
- [ ] Set up Cloudflare R2 for images
- [ ] Migrate images from 1822-Pine repo
- [ ] Create base component library (Shadcn/ui)
- [ ] Implement layout and navigation

### Phase 2: Public Pages (Weeks 3-4)
- [ ] Homepage with booking widget placeholder
- [ ] Stay pages with room details
- [ ] Floor plans viewer
- [ ] Photo gallery
- [ ] History landing and timeline
- [ ] Document gallery viewer
- [ ] Neighborhood guide
- [ ] FAQ and Contact pages

### Phase 3: Booking Integration (Weeks 5-6)
- [ ] Guesty API integration
- [ ] Availability calendar component
- [ ] Price calculation
- [ ] Chekin widget integration
- [ ] Truvi screening integration
- [ ] Rental agreement flow
- [ ] Stripe payment integration
- [ ] Confirmation flow

### Phase 4: Guest Portal (Week 7)
- [ ] Guest authentication (magic link)
- [ ] Portal dashboard
- [ ] Touch Stay embed or custom guidebook
- [ ] Check-in/checkout instructions
- [ ] The Host Co upsells integration
- [ ] Guest messaging

### Phase 5: Staff & Admin (Week 8)
- [ ] Staff authentication
- [ ] Operations dashboard
- [ ] Breezeway integration
- [ ] MaintainX integration
- [ ] Admin revenue views
- [ ] Emergency procedures page

### Phase 6: Automation & Polish (Weeks 9-10)
- [ ] Guesty automation rules
- [ ] Email templates
- [ ] SEO optimization
- [ ] Performance tuning
- [ ] Analytics setup
- [ ] Testing and QA
- [ ] Launch preparation

---

## IX. Tech Stack Summary

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Shadcn/ui
- **State**: React Query + Zustand
- **Forms**: React Hook Form + Zod
- **Maps**: Mapbox GL JS

### Backend
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Cloudflare R2
- **APIs**: Next.js API Routes

### Integrations
- **PMS**: Guesty Open API v2
- **Payments**: Stripe (via Guesty)
- **ID Verification**: Chekin
- **Screening**: Truvi
- **Guidebook**: Touch Stay
- **Upsells**: The Host Co
- **Cleaning**: Breezeway
- **Maintenance**: MaintainX
- **Wi-Fi Marketing**: StayFi
- **Pricing**: PriceLabs
- **Analytics**: Plausible + GA4

### Infrastructure
- **Hosting**: Vercel
- **CDN**: Cloudflare
- **Email**: Resend
- **Monitoring**: Vercel Analytics + Sentry

---

## X. Success Metrics

### Business KPIs
- Direct booking conversion rate: >5%
- OTA booking reduction: -30% within 6 months
- Average daily rate maintained/improved
- Guest satisfaction: 4.9+ stars
- Repeat booking rate: >15%

### Technical KPIs
- Lighthouse score: >90 all categories
- Core Web Vitals: Pass
- Uptime: 99.9%
- Page load: <2 seconds
- Booking flow completion: >60%

---

## XI. Budget Estimate (Monthly)

| Service | Cost |
|---------|------|
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| Cloudflare Pro + R2 | $25 |
| Plausible | $9 |
| Resend | $20 |
| Domain | ~$2 |
| **Total Infrastructure** | **~$100/month** |

*Note: Guesty, Chekin, Truvi, Breezeway, etc. are separate operational costs.*

---

## XII. Next Steps

1. **Confirm domain**: `rittenhouseresidence.com` vs alternative
2. **Guesty API access**: Request Open API credentials
3. **Design direction**: Provide brand guidelines or approve defaults
4. **Content priority**: Confirm which historical content is highest priority
5. **Integration credentials**: Gather API keys for all services

---

*Plan created: 2026-01-09*
*Ready for implementation upon approval*
