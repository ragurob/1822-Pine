# Airbnb Scrape + Mapping Kit

All scraped + mapped content for Airbnb listing integration lives under `airbnb/`.

## Structure

```
airbnb/
  scrape_airbnb.py          # Main scraper (Playwright primary, requests/BS4 fallback)
  render_to_quarto.py       # Renders JSON -> Quarto-ready Markdown fragments via Jinja2
  mapping.yaml              # CSS/XPath selector fallbacks for each listing field
  templates/
    index-hero.md.j2        # Hero / intro fragment
    stay-excerpt.md.j2      # Amenities / about fragment
    house-rules.md.j2       # House rules fragment
  fragments/                # Generated .md fragments (git-ignored optionally)
  data/
    airbnb_listing.json     # Normalized structured output (created after scrape)
  README.md                 # This file
```

## Quick Start

```bash
# 0) (from repo root)
python3 -m venv .venv && source .venv/bin/activate
pip install playwright jinja2 pyyaml beautifulsoup4 requests lxml
playwright install

# 1) (optional) export cookies if authenticated fields needed
#    Save as airbnb/cookies.txt (Netscape format)

# 2) Run scraper
python airbnb/scrape_airbnb.py --url "https://www.airbnb.com/rooms/XXXX" \
  --out-json airbnb/data/airbnb_listing.json \
  --images-dir images/web/airbnb --cookies airbnb/cookies.txt --max-images 12

# 3) Render fragments
python airbnb/render_to_quarto.py --data airbnb/data/airbnb_listing.json --out airbnb/fragments/

# 4) Integrate into Quarto
#    - airbnb/fragments/index-hero.md -> index.qmd (hero section)
#    - airbnb/fragments/stay-excerpt.md -> stay.qmd (Highlights/Amenities)
#    - airbnb/fragments/house-rules.md -> house-rules.qmd (below compliance block)

# 5) Preview site
quarto preview
```

## mapping.yaml Philosophy
- Multiple selectors per field (first successful wins)
- Supports `css:` and `xpath:` entries
- Text cleanup: whitespace collapse + smart punctuation preservation

## Fields Captured
- title
- subtitle (short summary / tagline if present)
- description (about this space)
- house_rules
- amenities (normalized list)
- location_snippet (neighborhood summary if public)
- images (downloaded + listed)
- last_fetched (UTC ISO)
- source_url

## Template Outputs
- `index-hero.md` – Title block + short summary + hero image suggestion
- `stay-excerpt.md` – About/Amenities trimmed for guest-facing page
- `house-rules.md` – Airbnb rules snippet (append under local compliance rules)

## To Add More
1. Add field in `mapping.yaml`
2. Extend normalization in `scrape_airbnb.py`
3. Reference field in a template (.j2) and re-render

## Compliance & Ethical Use
Scrape only your own listing. Respect Airbnb ToS. Use cookies solely for content you already can see in your account. If the DOM shifts, update selectors rather than hammering with retries.

## Roadmap (Optional Enhancements)
- Photo caption extraction & alt text generation
- Amenities categorization (Core / Kitchen / Safety / Entertainment)
- Automatic insertion into Quarto chapters (dry-run diff mode)
- Backfill of missing alt text using simple ML caption model (offline)

---
Generated: 2025-08-30
