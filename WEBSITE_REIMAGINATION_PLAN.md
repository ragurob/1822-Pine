# Website Reimagination Plan - Rittenhouse Residence (1822 Pine St)

This plan defines the scope, content, integrations, and risk controls for the new website at `rittenhouseresidence.com`. It treats the site as both a premium guest-facing experience and an operational backbone tied to the existing tech stack and insurance requirements.

---

## 1. Goals and Guiding Principles
- **Elevate the brand**: Present 1822 Pine as a landmark residence with documented history and modern luxury.
- **Drive direct bookings**: Reduce OTA dependence while maintaining compliance and risk controls.
- **Operate with accountability**: Integrate ops systems and verification trails into the guest journey.
- **Preserve provenance**: Every public claim must be backed by cited source materials.

---

## 2. Primary Audiences
- **Prospective guests**: Luxury travelers, families, corporate groups, and production teams.
- **Owners/management**: Revenue and operational oversight.
- **On-site staff**: Fast access to house and safety procedures.
- **Researchers and press**: Access to verified history and archival materials.

---

## 3. Core Site Capabilities
**Public experience**
- High-impact homepage with story, amenities, and booking CTA.
- Rich history pages with citations and primary documents.
- Full gallery (historic + contemporary) with clear rights metadata.
- Floor plans and room-by-room narratives.
- Neighborhood and experience guide.

**Direct booking**
- Real-time availability and rates (Guesty integration).
- Secure checkout with ID verification and screening.
- Rental agreement acceptance and house rules.
- Automated confirmation, pre-arrival messaging, and guidebook delivery.

**Operations hub (authenticated)**
- House manager guide (Notion/Touch Stay export or embedded pages).
- Maintenance logs and checklists (Breezeway).
- Emergency procedures and vendor directory.

---

## 4. Information Architecture (Draft)
- **Home**
- **Stay**
  - Suites and rooms
  - Amenities and services
  - Floor plans
- **History**
  - Timeline
  - Provenance dossier
  - Document gallery
- **Gallery**
  - Historic imagery
  - Modern photography
- **Neighborhood**
- **Events & Filming**
- **Direct Booking**
- **Guest Resources**
  - House guide
  - Policies
  - FAQ
- **Contact**

References to existing archival content:
- `research/facts-verified.md`
- `research/document-gallery.md`
- `data/timeline.yml`
- `chapters/10-provenance-dossier.qmd`

---

## 5. Content Strategy and Narrative Arc
**Narrative backbone**
- A chronological, sourced history from 1854 to present.
- The property as a living archive: architecture, owners, and community role.

**Featured micro-stories**
- 1899 Duhring, Okie & Ziegler renovation.
- Suffrage-era activity and 1911 tax resistance.
- 1932 conversion and 1950s restoration.

**Verification standard**
- Every public claim links to a citation in `research/facts-verified.md` or document scans in `raw_documents/`.
- Tag all visual assets with provenance and usage rights.

---

## 6. Integrations and Tech Stack Alignment
**System of record**
- **Guesty** for reservations, messaging, tasks, and revenue reporting.

**Operations and safety**
- **Breezeway** for cleaning checklists, inspections, safety certification.
- **Minut** for party prevention and noise monitoring (insurance incentive).
- **Ring** doorbells and exterior cameras.
- **Schlage** smart locks; optional centralized management.
- **Flo by Moen** water control + leak sensors.
- **Nest** thermostats.
- **Eero** Wi-Fi mesh with UPS backup.
- **MaintainX** for maintenance tickets and preventative tasks.

**Guest screening and check-in**
- **Truvi** for screening + deposits.
- **Chekin** for ID verification, self check-in, and compliance.

**Guest experience**
- **Touch Stay** for digital guidebook (guest-facing).
- **The Host Co** for upsells and in-stay purchases.
- **StayFi** for Wi-Fi marketing and guest email capture.

**Revenue management**
- **PriceLabs** (recommended test with outlier pricing rules).
- **Beyond** or **Wheelhouse** as alternative if PriceLabs underperforms.

**Analytics and performance**
- Privacy-first analytics (e.g., Plausible) plus GA4 if desired.
- Conversion tracking for booking funnel and upsells.

---

## 7. Direct Booking Flow (Legal and Risk-Controlled)
**Proposed flow**
1. Guest selects dates and rates (Guesty API or booking engine).
2. ID verification + screening (Chekin + Truvi).
3. Rental agreement acceptance + house rules.
4. Payment capture (Guesty + Stripe or equivalent).
5. Confirmation + guidebook delivery + pre-arrival checklist.

**Risk controls**
- Enforce **minimum age** and **occupancy limits**.
- Require **security deposit or damage waiver**.
- Mandatory **quiet hours** and **no-party** policy.
- Clear **cancellation and refund terms**.
- Fraud and chargeback monitoring (Truvi/Stripe rules).

**Compliance considerations (to verify)**
- Philadelphia STR licensing and tax collection requirements.
- Data privacy policy, cookie consent, and retention schedule.
- ADA and accessibility best practices.

---

## 8. Insurance Alignment (Proper Insurance Policy Summary)
Source: `1822 Pine 20226 Insurance.pdf` (keep the full policy in secure storage; avoid publishing raw policy data).

**Coverage summary**
- Insured entity: Sole proprietor (Vacation Rental).
- Property location: 1822 Pine St, Philadelphia, PA 19103.
- Policy period: 12/26/2025 to 12/26/2026.
- **Commercial General Liability**: $3,000,000 aggregate; $2,000,000 per occurrence.
- **Personal and Advertising Injury**: $2,000,000.
- **Damage to Premises Rented**: $100,000.
- **Personal liability**: Not covered.

**Property coverage**
- Special Form with replacement cost.
- Building limit: **$3,300,000**.
- Business personal property: **$350,000**.
- Business income and extra expense: **Actual loss sustained**, max **$250,000** per location.

**Deductibles**
- Standard: **$10,000**.
- Wind: **$10,000**.
- Equipment breakdown: **$1,000**.

**Optional coverages**
- Civil authority flood: **$10,000**.
- Bed bug and flea + business revenue: **$20,000**.
- Squatters and eviction + business revenue: **$30,000**.
- Ordinance or law coverage included.

**Operational implications**
- Maintain documented inspections, incident logs, and safety checklists (Breezeway).
- Keep proof of noise monitoring and party prevention devices.
- Maintain pre-arrival screening and signed guest agreements.
- Maintain reserves for deductibles and short-term cash flow disruptions.

---

## 9. Proper Insurance Partner Discounts (To Action)
- **Breezeway Safety Certification**: up to 10% premium credit; discounted Breezeway pricing.
- **Party prevention devices**: up to 10% liability premium credit with approved vendors.
- **Chekin**: 90 days free for Proper clients (promo code PROPER90).
- **StayFi** and other partner offers: evaluate for marketing ROI.

Operational actions:
- Enroll in Breezeway certification and archive proof.
- Document device installations (Minut or approved alternatives).
- Submit proof to Proper for premium credits.

---

## 10. Implementation Roadmap (High-Level)
**Phase 1: Discovery + content audit**
- Confirm domain strategy: `rittenhouseresidence.com` vs existing references.
- Audit content in `research/`, `raw_documents/`, `images/`.
- Define the booking engine approach (Guesty direct booking).

**Phase 2: IA + content architecture**
- Finalize sitemap and page inventory.
- Map each page to verified sources and assets.

**Phase 3: Design + prototype**
- Modern visual system with strong typography and archival motifs.
- Mobile-first UX; accessibility targets.

**Phase 4: Build + integrations**
- Implement booking engine and analytics.
- Connect Guesty, Breezeway, Chekin, Truvi, and upsell tools.

**Phase 5: QA + launch**
- Legal and policy checks.
- Backup, monitoring, and incident response plan.

---

## 11. Open Decisions and Next Inputs
- Confirm the final domain: `rittenhouseresidence.com` or `therittenhouseresidence.com`.
- Confirm the direct booking engine (Guesty native vs third-party).
- Decide on privacy policy ownership and legal review.
- Confirm whether the insurance policy summary can live in the repo if public.
