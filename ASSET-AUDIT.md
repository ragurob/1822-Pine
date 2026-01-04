# 1822 Pine Street - Asset Audit (Updated)

**Property:** 1822 Pine Street, Philadelphia, PA
**Marketing Name:** The Rittenhouse Residence
**Audit Date:** 2026-01-04
**Source Repository:** 1822-Pine

---

## Executive Summary

This audit reflects the full on-disk archive plus the latest OCR pass and verified research outputs. New evidence and narratives are stored in `research/` and are based on OCR-backed sources.

**Current inventory totals**
- **Primary documents:** 65 files in `raw_documents/`
- **OCR/metadata:** 65 JSON records in `metadata/` with refreshed `processing_results.json`
- **Derived document images:** 117 web images + 94 print images in `images/`
- **Property photos:** 27 professional photos in `website/images/property/`
- **Airbnb photos:** 23 images in `website/images/property/airbnb/`
- **Floor plan PDFs:** 5 PDFs in `images/floor-plans/`

---

## I. Repository Structure

- `raw_documents/` — source deeds, clippings, floor plans, certificates
- `metadata/` — OCR output per file + `processing_results.json`
- `images/` — web/print derivatives created by OCR pipeline
- `data/` — regenerated timeline data (`data/timeline.yml`)
- `refs/` — regenerated bibliography (`refs/bibliography.bib`)
- `research/` — verified facts, OCR transcriptions, and narrative drafts
- `website/` — existing site content and images

---

## II. Primary Source Documents (raw_documents/)

**Total files:** 65

### A. Deeds (21)
- 1822 Pine - 1979 Deed.pdf
- 1822 Pine - 1985 Deed.pdf
- 1822 Pine - 1999 Deed 1.pdf
- 1822 Pine - 1999 Deed 2.pdf
- 1822 Pine - 2002 Deed.pdf
- 1822 Pine - 2013 Deed.pdf
- 1822 Pine - Deed 1987.pdf
- 1854 Deed abstract (2).jpg
- 1893 Deed abstract.jpg
- 1899 Deed abstract - 1.jpg
- 1899 Deed abstract - 2.jpg
- 1922 Deed abstract - 1.jpg
- 1922 Deed abstract - 2.jpg
- 1941 Deed abstract - 1.jpg
- 1941 Deed abstract - 2.jpg
- 1947 Deed abstract - 1.jpg
- 1947 Deed abstract - 2.jpg
- 1949 Deed abstract - 1.jpg
- 1949 Deed abstract - 2.jpg
- 1952 Deed abstract - 1.jpg
- 1952 Deed abstract - 2.jpg

### B. Floor Plans (10)
- 1822 1 Floor.jpg
- 1822 1 Floor.pdf
- 1822 2 Floor.jpg
- 1822 2 Floor.pdf
- 1822 3 Floor.jpg
- 1822 3 Floor.pdf
- 1822 4 Floor.jpg
- 1822 4 Floor.pdf
- 1822 Roof Deck.jpg
- 1822 Roof Deck.pdf

### C. Property Certificate (1)
- 1822 Pine - Property Cert.pdf

### D. Sale Clipping (1)
- 1822_Sold_for_14_000.pdf

### E. Newspaper Clippings (32)
- Evening_Public_Ledger_1915_01_08_Page_10.pdf
- Society_Tea.pdf
- The_Evening_Telegraph_1867_04_08_Page_3.pdf
- The_Evening_Telegraph_1870_08_10_Page_8.pdf
- The_Philadelphia_Inquirer_1866_12_08_Page_8.pdf
- The_Philadelphia_Inquirer_1871_01_14_Page_6.pdf
- The_Philadelphia_Inquirer_1871_12_06_Page_7.pdf
- The_Philadelphia_Inquirer_1891_11_28_Page_2.pdf
- The_Philadelphia_Inquirer_1893_07_01_Page_1.pdf
- The_Philadelphia_Inquirer_1899_04_06_Page_7.pdf
- The_Philadelphia_Inquirer_1899_07_18_Page_12.pdf
- The_Philadelphia_Inquirer_1900_10_03_Page_5.pdf
- The_Philadelphia_Inquirer_1901_10_27_Page_19.pdf
- The_Philadelphia_Inquirer_1901_11_21_Page_16.pdf
- The_Philadelphia_Inquirer_1904_12_11_Page_36.pdf
- The_Philadelphia_Inquirer_1905_08_04_Page_6.pdf
- The_Philadelphia_Inquirer_1906_12_30_Page_11.pdf
- The_Philadelphia_Inquirer_1907_12_15_Page_16.pdf
- The_Philadelphia_Inquirer_1908_01_06_Page_14.pdf
- The_Philadelphia_Inquirer_1912_09_29_Page_26.pdf
- The_Philadelphia_Inquirer_1913_02_09_Page_38.pdf
- The_Philadelphia_Inquirer_1913_03_10_Page_12.pdf
- The_Philadelphia_Inquirer_1914_03_27_Page_16.pdf
- The_Philadelphia_Times_1883_12_09_Page_4.pdf
- The_Philadelphia_Times_1893_02_01_Page_6.pdf
- The_Philadelphia_Times_1893_07_01_Page_2.pdf
- The_Philadelphia_Times_1896_06_29_Page_5.pdf
- The_Philadelphia_Times_1896_11_23_Page_11.pdf
- The_Philadelphia_Times_1899_08_06_Page_10.pdf
- The_Philadelphia_Times_1901_01_11_Page_6.pdf
- The_United_States_Gazette_1824_03_26_3.pdf
- Thu_Apr_23_1891_Page_3_Scarlet_Fever.pdf

---

## III. Image Assets

### A. Derived Document Images
- `images/web/` — 117 images (web-optimized pages)
- `images/print/` — 94 images (print-ready pages)
- `images/floor-plans/` — 5 floor plan PDFs

### B. Property Photography
- `website/images/property/` — 27 professional photos (DSC00064.jpg–DSC00122.jpg)
- `website/images/property/airbnb/` — 23 listing images (airbnb_00.jpg–airbnb_22.jpg)

---

## IV. OCR Processing Status

OCR pipeline completed against all 65 documents.

From `metadata/processing_results.json`:
- Total documents processed: 65
- PDFs processed: 46
- Images processed: 19
- Deeds detected: 21
- Clippings detected: 44
- Dates extracted: 41

---

## V. Verified Facts (OCR-Backed)

All verified facts with OCR snippets live in `research/facts-verified.md`.

Examples:
- Property certificate shows **address 1822 Pine St, Philadelphia, PA 19103-6602**, **zoning classification RM1**, **issue date 03/30/2022**, and **five (5) dwelling units**.
  - Source: `raw_documents/1822 Pine - Property Cert.pdf`
- 2013 deed legal description places the lot on the **south side of Pine Street**, with **22-foot frontage** and **90-foot depth to Waverly Street**, and identifies the property as **1822 Pine Street, Philadelphia, Pennsylvania**.
  - Source: `raw_documents/1822 Pine - 2013 Deed.pdf`
- **Duhring, Okie & Ziegler** finished plans for alterations and additions to **Mrs. Graham Spencer's** residence at **1822 Pine Street** (1899).
  - Source: `raw_documents/The_Philadelphia_Inquirer_1899_07_18_Page_12.pdf`
- **Equal Franchise Society** luncheon tickets were available from **Miss Martha Davis, 1822 Pine Street** (1915).
  - Source: `raw_documents/Evening_Public_Ledger_1915_01_08_Page_10.pdf`

---

## VI. Research Artifacts (New)

- `research/facts-verified.md` — OCR-backed facts with citations
- `research/transcriptions-ocr.md` — draft OCR text from key clippings
- `research/narrative-draft.md` — verified narrative (OCR-backed)
- `research/document-gallery.md` — document index
- `research/document-catalog.json` — machine-readable catalog
- `research/unverified-claims.md` — catalog claims needing verification

---

## VII. Research Backlog (Not Yet Verified by OCR)

These items appear in historical narratives but are **not OCR-verified** in this repo and should remain provisional until manual transcription or improved OCR confirms them:
- 1854 deed abstract details (names, consideration, construction claims)
- Remaining named residents and society events from clippings not yet OCR-transcribed
- Architectural attribution beyond the 1899 notices
- Catalog copy and captions flagged in `research/unverified-claims.md`

---

## VIII. Notes on Duplication

The repo currently includes duplicate asset copies in `website/images/` and `images/`. This was preserved for backward compatibility with the existing site, but canonical sources are the originals in `raw_documents/` and `images/` plus the verified research in `research/`.

