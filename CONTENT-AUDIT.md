# Content Audit (Next.js Production Site)

**Production website:** `https://rittenhouseresidence.com/` (Next.js app in `rittenhouse-website/`)

This audit focuses on the **current Next.js site** (the legacy Quarto site in `Rittenhouse-Residence/website/` is not production) and compares it to the full on-disk content inventory in `Rittenhouse-Residence/` (see `Rittenhouse-Residence/ASSET-AUDIT.md`).

## 1) Routes & Navigation

Implemented and intended to be live on the production site:
- `/`, `/stay`, `/gallery`, `/neighborhood`, `/contact`, `/book`
- `/rates`, `/faq`, `/stay/floor-plans`
- `/history`, `/history/documents`, `/history/documents/[slug]`, `/history/timeline`, `/history/provenance`
- `/privacy`, `/terms`, `/rental-agreement`, `/accessibility`

## 2) Historical Archive Content (Now Surfaced)

From `Rittenhouse-Residence/ASSET-AUDIT.md`, the repository includes:
- 65 primary documents in `Rittenhouse-Residence/raw_documents/`
- 117 derived web images in `Rittenhouse-Residence/images/web/`
- Timeline data in `Rittenhouse-Residence/data/timeline.yml`
- OCR-backed fact list in `Rittenhouse-Residence/docs/facts-verified.md`
- Bibliography files in `Rittenhouse-Residence/refs/`

The Next.js site now exposes these via:
- `/history/documents` + `/history/documents/[slug]` (browsing + original downloads)
- `/history/timeline` (chronological view backed by the on-disk timeline)
- `/history/provenance` (verified facts + bibliography downloads)

## 3) How Archive Assets Are Deployed

Archive files are synced into the Next.js `public/` folder for deployment:
- Source: `Rittenhouse-Residence/raw_documents`, `Rittenhouse-Residence/images/web`, `Rittenhouse-Residence/refs`
- Destination: `rittenhouse-website/public/archive/*`
- Sync script: `rittenhouse-website/scripts/prepare-archive-assets.mjs` (runs on `npm run dev` and `npm run build`)

`public/archive/*` is treated as generated output and is git-ignored in `rittenhouse-website/.gitignore`.

## 4) Other Content (Notes / Intentional Exclusions)

Some repository content is **not appropriate for public display** and is intentionally not surfaced on the public site, including:
- Internal research and operational notes in `Rittenhouse-Residence/source_notes/` (may include non-public operational details)
- Unverified narrative/claims in `Rittenhouse-Residence/docs/unverified-claims.md`
- The L&I property certificate (`1822 Pine - Property Cert.pdf`) is intentionally excluded from the public archive and timelines.

## 5) Editorial Direction: No Event Promotion

Per current direction, the website avoids marketing the property as an event venue (weddings/corporate retreats/film shoots). Content about *historical events* in the home’s history is OK.
