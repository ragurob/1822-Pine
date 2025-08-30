# RP-Alt-Index (Research & Provenance Alternate Index)

Purpose: A navigable hierarchical catalog of all project content (chapters, guidebook, timeline data, metadata JSON, images, handouts) structured for dual use as (1) website alternate index/navigation map and (2) foundation for forthcoming print book master index.

## 0. High-Level Domains

1. House Identity & Orientation
2. Chronology & Periodization
3. People & Roles
4. Architecture & Fabric
5. Rooms & Spatial Function
6. Events (Social / Domestic / Activism / Medical)
7. Ownership & Legal (Chain of Title, Deeds, Transfers)
8. Modern Adaptation (Hospitality, Filming, Events Operations)
9. Material Evidence (Clippings, Deed Abstracts, Images, Metadata)
10. Interpretive Layers (Narrative Voice, Endnotes, Provenance Claims)
11. Guest Operations & House Use (Guidebook Content)
12. Seasonal & Environmental (Use Patterns, Seasonal House Chapter)
13. Field Guides & Walkthroughs (Room Walks, Field Guide, Floor Plans)
14. Timeline Dataset (Structured Chronology Nodes)
15. Future Research / Probables / Gaps

Each domain has sub‑taxonomies below. Cross references indicated with ➡ and code refs in backticks for source files.

---
## 1. House Identity & Orientation
- Core Titles: 00 Preamble (`00-preamble.qmd`), 01 Welcome (`01-welcome.qmd`)
- Elements:
  - Address Identity ("1822 Pine Street", variants) ➡ Domain 7
  - Naming Conventions: "The Rittenhouse Residence" (marketing) ➡ Domain 8
  - Historical Framing Statements (opening narrative) ➡ Domain 10
  - How to Use This Book sections (user segmentation: owner, guest, scout) ➡ Domain 11
- Assets: Opening narrative paragraphs; subtitle statements; guest/owner/buyer callouts.

## 2. Chronology & Periodization
- Period Chapters: `02-between-mourning-and-modernity.qmd`, `05-long-edwardian-afternoon.qmd`, `07-apartment-house-years.qmd`, `08-back-to-grande-dame.qmd`
- Temporal Anchors:
  - 1854 Foundational Sale (start of proven chain) ➡ Domain 7
  - 1891–1905 Transitional Modernization Window (Spencer to DO&Z works) ➡ Domain 4
  - Apartment House Years (mid 20th c. fragmentation) ➡ Domain 4/8
  - Modern Revival & Historic District Inclusion (1995, 2013+) ➡ Domain 8
- Dataset Source: `data/timeline.yml` (machine-parseable chronology) ➡ Domain 14
- Sub-index structure: Year > Event Type (deed | social | obituary | improvement | activism | medical | listing) > Source.

## 3. People & Roles
- Owner Families: Roset, Spencer, Davis, later owners (per deed abstracts) ➡ Domain 7
- Professional / Service: Architects (Duhring, Okie & Ziegler), Builders (John McCrea), Physicians (Dr. Damon B. Pfeiffer, Stillwell Corson Burns) ➡ Domain 6
- Social / Activism: Naomi Lawton Davis, Martha Davis (suffrage), society participants (Fayette R. Plumb) ➡ Domain 6
- Staff Archetypes: cook, parlor maid, laundress, coachman, boy (interpretive, not all individually evidenced) ➡ Domain 10 (interpretive caution)
- Guest Operations Personas: Owners, Buyers, Event Planners, Film Scouts, Lodging Guests ➡ Domain 11
- Crosswalk Table (to build later): Person Name > Roles > Date Range > Source Codes.

## 4. Architecture & Fabric
- Fabric Elements: Façade (mid‑19th c. red brick), 1905 fireplace, marble mantels, service corridor to Waverly
- Alterations: 1899 DO&Z alterations & additions (scope placeholder), potential rear extension/back stair (probable) ➡ Domain 15 if unverified
- Floor Plans: `13-floor-plans.qmd`, image metadata (`metadata/*Floor_metadata.json`), raw images in `images/floor-plans/`
- Preservation Status: 1995 Historic District inclusion
- Interpretive Features for Labels: card tray location, parlor scale, work/life overlay (medical practice) ➡ Domain 10

## 5. Rooms & Spatial Function
- Primary Spaces: Double Parlors, Dining Room, Hall/Threshold, Rear Service Axis, Roof Deck
- Suite Naming (Guidebook): Emily Drexel Suite, Library Suite, Mansion Suite, Pine Street Suite, Waverly Street Suite ➡ Domain 11
- Functional Overlays: Medical Suite (1915–1916), Event Hosting (historic "At Homes" vs modern micro‑weddings) ➡ Domain 8
- Field Guide References: `09-walk-rooms-field-guide.qmd`, `04-walk-the-rooms.qmd`
- Wayfinding Tagging Plan: Space Code (PARLOR_FRONT, PARLOR_REAR, DINING, HALL, STAIR_LAND, KITCHEN_MAIN, KITCHEN_UPPER, ROOF, SUITE_LIB, SUITE_DREXEL, SUITE_MANSION, SUITE_PINE, SUITE_WAVERLY, GARDEN, SERVICE_ENTRY) ➡ To define JSON in future iteration.

## 6. Events (Social / Domestic / Activism / Medical)
- Event Categories:
  - Social: Weddings (Rolin-Plumb breakfast 1901), "At Homes" (1904), Society Returns (winter residency notices)
  - Domestic Life Events: Deaths (Howard Spencer Jr. 1891; Naomi Lawton Davis 1918)
  - Activism: Suffrage ticket sales 1915; tax resistance 1911
  - Medical Practice: Listings 1915–1916 (professional adaptation of parlor level)
  - Physical Improvements: 1905 fireplace installation; architect commission 1899
- Index Key: Event > Date > Person(s) > Space (if known) > Source Code.

## 7. Ownership & Legal
- Chain of Title Core Lines: captured in `10-provenance-dossier.qmd`
- Deed Abstract Sources: metadata JSON in `metadata/*Deed*_metadata.json` (each tying scanned deed docs) and timeline entries (type: clipping with deed references)
- Periodization by Ownership: Roset Era (1854–1893), Spencer Transition (1893–1899), Agnes Spencer Modernization (1899–1905), Davis / Activism Period (1904–1918), Apartment / Fragment (1922–1952), Post‑Restoration & Heritage Branding (1995 → present)
- Ownership Data Structure (to define): owner_entity, acquisition_date, disposition_date, source_refs, notes.

## 8. Modern Adaptation (Hospitality | Filming | Events)
- Marketing Claims & Capacities: Sleeps 16–18; event capacity 50–75
- Operational Assets: Waverly load‑in, double parlors scale, multi‑kitchen configuration, roof deck usage constraints
- Guest / Event / Filming Playbook: `11-events-filming-playbook.qmd`
- Seasonal Use Patterns: `12-seasonal-house.qmd`
- Website Micro‑copy Blocks: within `10-provenance-dossier.qmd` (Micro‑copy section)
- Airbnb Listing Integration: `airbnb/` scrape kit (structured JSON -> fragments) feeding `index.qmd`, `stay.qmd`, `house-rules.qmd` (see kit README)

## 9. Material Evidence (Primary & Derived)
- Clippings: `images/clippings/` + timeline entries (type: clipping)
- Deeds & Legal Docs: `images/deeds/` + metadata JSON referencing them
- Floor Plans & Architectural: `images/floor-plans/` + floor metadata JSON
- Processed OCR Metadata: `metadata/*.json` (fields: filename, type, dimensions, extracted_date, entities, error messages for OCR status)
- Handouts & Fact Sheets: `handouts/` (event filming fact sheet, provenance handout)
- Document Gallery Chapter: `99-document-gallery.qmd`
- Evidence Index Strategy: assign Source IDs (e.g., NEWS_1891_SCARLET, DEED_1854_ABSTRACT) to unify references across narrative chapters and structured data.

## 10. Interpretive Layers
- Narrative Voice: House‑as‑speaker segments (italicized opening paragraphs in chapters)
- Sidebars & Callouts: callout-guest, callout-buyer, callout-note blocks
- Provenance Claim Types: "Publishable Claims", "Probables" (risk tiering) in `10-provenance-dossier.qmd`
- Interpretive Cautions: Staff archetypes, unverified rear extension/back stair, stable presence (flagged to Domain 15)

## 11. Guest Operations & House Use
- Guidebook (`guidebook/guest-guidebook-2024.qmd`): access codes, rules, amenities, suites, safety, neighborhood guidance
- House Rules: Noise, occupancy, preservation guidelines
- Amenity Inventory: Fireplaces, kitchens, roof deck constraints, technology
- Operational Roles: Rittenhouse Residence Team, contact protocols
- Mapping to Spaces (Domain 5) for digital on‑site navigation (future feature)

## 12. Seasonal & Environmental
- Chapter: `12-seasonal-house.qmd`
- Axes: High Season vs Off Season occupancy, winter social vs summer travel patterns historically (winter in town, summer out)
- Modern Operational Adjustments: roof deck scheduling, HVAC usage patterns, event calendar clustering

## 13. Field Guides & Walkthroughs
- Chapters: `04-walk-the-rooms.qmd`, `09-walk-rooms-field-guide.qmd`
- Floor Plan Integration: `13-floor-plans.qmd` + floor plan images + metadata
- Labeling Schema: Space Codes (see Domain 5) + interpretive tag sets (HISTORIC_EVENT, AMENITY, CAPACITY, VIEW, ACCESS)

## 14. Timeline Dataset (Structured Chronology)
- Source File: `data/timeline.yml`
- Data Fields: date (ISO), type (clipping), description (file ref), source (original filename), people (array), amounts (optional), generated timestamp
- Expansion Plan: Add event_category, normalized_person_ids, verified_flag, house_relation (e.g., OWNERSHIP_CHANGE, SOCIAL_EVENT, IMPROVEMENT, ACTIVISM, MEDICAL, LISTING)
- Integration: Cross-link Year ranges to Period Chapters (Domain 2), Ownership (Domain 7), Events (Domain 6)

## 15. Future Research / Probables / Gaps
- Verification Targets:
  - Rear extension/back stair (need permits / Sanborn maps)
  - Stable/coach structure on Waverly (atlas confirmation)
  - Apartment era transfer specifics (1922–1952 chain granularity)
  - Post‑1952 occupancy narrative pre‑1995 district listing
  - Detailed DO&Z alteration scope (architectural drawings or permit book)
- Data Quality Tasks:
  - OCR completion (tesseract installation; reprocess metadata entries with empty text)
  - Entity extraction (people, places, events) into structured JSON for index generation
  - Source ID normalization across chapters

---
## A. Proposed Hierarchical Index Tree (Concise View)

HOUSE IDENTITY
  Orientation Narrative
  How to Use (Owners | Guests | Buyers | Scouts)
CHRONOLOGY & PERIODS
  Roset Era (1854–1893)
  Spencer Transition (1893–1899)
  Modernization & Society (1899–1905)
  Activism & Professional Use (1905–1918)
  Apartment / Fragmentation (1922–1952)
  Preservation & Revival (1995–Present)
PEOPLE
  Owners
  Residents
  Professionals (Architects | Physicians)
  Activists
  Staff Archetypes
ARCHITECTURE & FABRIC
  Exterior Fabric
  Interior Features
  Alterations & Additions
  Floor Plans
ROOMS & SPACES
  Parlors
  Dining
  Suites (Named)
  Service Axis
  Roof Deck & Exterior
EVENTS
  Social
  Domestic Life Events
  Activism
  Medical Practice
  Improvements
OWNERSHIP & LEGAL
  Chain of Title
  Deed Abstracts
  Legal Transitions
MODERN ADAPTATION
  Hospitality Configuration
  Event & Filming Operations
  Marketing Micro‑copy
MATERIAL EVIDENCE
  Clippings
  Deeds
  Floor Plans
  Metadata JSON
  Handouts
INTERPRETIVE LAYERS
  Narrative Voice
  Sidebars/Callouts
  Claim Tiers
GUEST OPERATIONS
  Guidebook
  House Rules
  Amenities
SEASONAL & ENVIRONMENTAL
  Historical Patterns
  Modern Operations
FIELD GUIDES & WALKTHROUGHS
  Room Walks
  Field Guide
  Floor Plans Integration
TIMELINE DATASET
  YAML Events
  Normalized IDs (future)
FUTURE RESEARCH
  Verification Targets
  Data Quality Tasks

---
## B. Implementation Roadmap (Next Actions)
1. Assign unique Source IDs across dossier & chapters (script: scan for citation markers `[@...]` and map to consistent slug).
2. Create `data/index/` JSON files (people.json, spaces.json, events.json, ownership.json) aligned with domains.
3. Enrich `timeline.yml` with event_category & verified_flag fields.
4. OCR pipeline: install Tesseract; re-run over `images/clippings` & update metadata text fields.
5. Generate automated HTML navigation page from this taxonomy (Quarto include).
6. Build crosswalk CSV: person_name, role, period, source_ids.
7. Add front-matter index tags to each chapter (domains + key entities) for future programmatic extraction.
8. Integrate Airbnb scraper output (schedule cron or manual) -> regenerate fragments -> embed into site prior to render.

## C. Tag Vocabulary (Draft)
- Period Tags: period-roset, period-spencer, period-modernization, period-activism, period-apartment, period-revival
- Domain Tags: dom-identity, dom-chronology, dom-people, dom-architecture, dom-rooms, dom-events, dom-ownership, dom-modern, dom-evidence, dom-interpretive, dom-operations, dom-seasonal, dom-fieldguide, dom-timeline, dom-research
- Space Tags: space-parlors, space-dining, space-library-suite, space-drexel-suite, space-mansion-suite, space-pine-suite, space-waverly-suite, space-roof, space-service-axis, space-garden
- Event Tags: evt-wedding, evt-athome, evt-death, evt-suffrage, evt-medical, evt-improvement, evt-sale, evt-modernization
- Claim Tier: claim-publishable, claim-probable

## D. File Placement
- This catalog file: `RP-Alt-Index.md`
- Future index data directory (to create): `data/index/`
- Scripts for extraction (placeholder): `scripts/build_index.py` (future)

## E. Usage Notes
- Treat this as the authoritative structural map. Any new chapter or asset should declare: Primary Domain(s), Period Tag(s), Associated Space Codes, Source IDs added.
- Print Book Adaptation: Use Domains 1–15 as Part/Section scaffolding; convert Tag Vocabulary into back-of-book index head terms.

---
Generated: 2025-08-30
