#!/usr/bin/env python3
"""Scrape Airbnb listing content into normalized JSON.

Primary: Playwright (headless chromium). Fallback: requests + BeautifulSoup (limited).
Intentionally conservative: only targets provided URL (your own listing).

Outputs JSON with fields: title, subtitle, description, house_rules, amenities (categorized),
images (list of {url, local_path}), location_snippet, last_fetched (UTC ISO), source_url.

Usage:
  python scrape_airbnb.py --url https://www.airbnb.com/rooms/XXXX \
    --out-json airbnb/data/airbnb_listing.json --images-dir images/web/airbnb \
    --cookies airbnb/cookies.txt --max-images 12
"""
from __future__ import annotations
import argparse, json, os, sys, re, time, datetime, pathlib
from typing import List, Dict, Any
import yaml

try:
    from playwright.sync_api import sync_playwright
    HAVE_PLAYWRIGHT = True
except Exception:
    HAVE_PLAYWRIGHT = False

import requests
from bs4 import BeautifulSoup

CLEAN_WS = re.compile(r'\s+')


def load_mapping(path: str) -> dict:
    with open(path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def collapse_text(txt: str) -> str:
    if not txt:
        return ''
    return CLEAN_WS.sub(' ', txt).strip()


def ensure_dir(p: str):
    pathlib.Path(p).mkdir(parents=True, exist_ok=True)


def read_cookies(cookies_path: str) -> List[dict]:
    if not cookies_path or not os.path.exists(cookies_path):
        return []
    cookies = []
    with open(cookies_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('#') or not line.strip():
                continue
            parts = line.strip().split('\t')
            if len(parts) >= 7:
                domain, flag, path, secure, expiry, name, value = parts[:7]
                cookies.append({
                    'name': name,
                    'value': value,
                    'domain': domain,
                    'path': path,
                    'expires': int(expiry) if expiry.isdigit() else None,
                    'httpOnly': False,
                    'secure': secure.lower() == 'true'
                })
    return cookies


def playwright_scrape(url: str, mapping: dict, cookies_path: str | None, max_images: int, timeout_ms: int) -> Dict[str, Any]:
    if not HAVE_PLAYWRIGHT:
        return {}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        # cookies
        if cookies_path:
            try:
                cookies = read_cookies(cookies_path)
                if cookies:
                    context.add_cookies(cookies)
            except Exception:
                pass
        page = context.new_page()
        page.set_default_timeout(timeout_ms)
        page.goto(url)
        # Wait explicitly for title or description to ensure core DOM loaded
        try:
            page.wait_for_selector('h1[data-testid="title"], div[data-section-id="DESCRIPTION_DEFAULT"]', timeout=timeout_ms)
        except Exception:
            pass
        # Progressive scroll to load lazy sections
        for _ in range(10):
            page.mouse.wheel(0, 1500)
            time.sleep(0.4)
        # Attempt to expand any 'Show more' buttons (description / house rules / amenities)
        try:
            buttons = page.locator('button:has-text("Show more")')
            for i in range(buttons.count()):
                try:
                    buttons.nth(i).click()
                    time.sleep(0.2)
                except Exception:
                    continue
        except Exception:
            pass
        # Give dynamic content a moment
        time.sleep(1.5)
        html = page.content()
        data = extract_fields(html, mapping)
        # Direct field overrides using live DOM (more reliable than static HTML for dynamic elements)
        try:
            if 'title' not in data:
                tloc = page.locator('h1[data-testid="title"]')
                if tloc.count() > 0:
                    data['title'] = collapse_text(tloc.first.inner_text())
        except Exception:
            pass
        # House rules explicit extraction
        try:
            if 'house_rules' not in data:
                hr = page.locator('[data-section-id="HOUSE_RULES_DEFAULT"], section[data-testid="HOUSE_RULES_DEFAULT"]')
                if hr.count() > 0:
                    data['house_rules'] = collapse_text(hr.first.inner_text())
        except Exception:
            pass
        # Amenities granular items
        try:
            amen_items = page.locator('[data-testid="amenity-item"]')
            if amen_items.count() > 0:
                texts = []
                for i in range(min(amen_items.count(), 400)):
                    try:
                        txt = collapse_text(amen_items.nth(i).inner_text())
                        if txt and txt not in texts:
                            texts.append(txt)
                    except Exception:
                        continue
                if texts:
                    data['amenities'] = '\n'.join(texts)
        except Exception:
            pass
        # images: select visible gallery images first
        imgs: List[str] = []
        try:
            gallery_sel = page.locator('div[data-testid="image-grid"] img, picture img, img')
            for el in gallery_sel.element_handles():
                if len(imgs) >= max_images:
                    break
                src = el.get_attribute('src') or ''
                if src.startswith('https://') and any(d in src for d in ['airbnbstatic', 'a0.muscache.com']):
                    base = src.split('?')[0]
                    if base not in imgs:
                        imgs.append(base)
        except Exception:
            pass
        if imgs and 'images_raw' not in data:
            data['images_raw'] = imgs
        browser.close()
        return data


def fallback_scrape(url: str, mapping: dict, timeout: int) -> Dict[str, Any]:
    try:
        resp = requests.get(url, timeout=timeout/1000)
        if resp.status_code != 200:
            return {}
        html = resp.text
        return extract_fields(html, mapping)
    except Exception:
        return {}


def extract_fields(html: str, mapping: dict) -> Dict[str, Any]:
    soup = BeautifulSoup(html, 'lxml')
    out: Dict[str, Any] = {}
    fields = mapping.get('fields', {})
    for fname, spec in fields.items():
        selectors = spec.get('selectors', [])
        value = None
        for sel in selectors:
            if isinstance(sel, dict):  # css or xpath style
                if 'css' in sel:
                    node = soup.select_one(sel['css'])
                    if node:
                        value = collapse_text(node.get_text(' '))
                # xpath not implemented in fallback (lxml via soup lacks direct support)
            else:
                # simple css string
                node = soup.select_one(sel)
                if node:
                    value = collapse_text(node.get_text(' '))
            if value and len(value) >= mapping.get('settings', {}).get('min_text_length', 10):
                break
        if value:
            out[fname] = value
    return out


def normalize(data: Dict[str, Any], max_images: int, images_dir: str) -> Dict[str, Any]:
    ensure_dir(images_dir)
    norm: Dict[str, Any] = {}
    # Simple direct fields
    for k in ['title', 'subtitle', 'description', 'house_rules', 'location_snippet']:
        if k in data:
            norm[k] = data[k]
    # Amenities: attempt naive split on bullet markers or newlines
    if 'amenities' in data:
        raw = data['amenities']
        # naive segmentation
        items = [collapse_text(x) for x in re.split(r'[•\n]+', raw) if collapse_text(x)]
        # Basic categorization heuristics
        categories = {
            'Core': [],
            'Kitchen': [],
            'Safety': [],
            'Entertainment': [],
        }
        for it in items:
            low = it.lower()
            if any(w in low for w in ['wifi', 'heat', 'air', 'essentials', 'bed', 'parking']):
                categories['Core'].append(it)
            elif any(w in low for w in ['kitchen', 'dishwasher', 'oven', 'microwave', 'coffee', 'refrigerator']):
                categories['Kitchen'].append(it)
            elif any(w in low for w in ['smoke', 'carbon', 'fire', 'extinguisher', 'first aid']):
                categories['Safety'].append(it)
            elif any(w in low for w in ['tv', 'netflix', 'pool', 'game', 'speaker']):
                categories['Entertainment'].append(it)
            else:
                categories.setdefault('Other', []).append(it)
        norm['amenities'] = categories
    # Images
    images_raw = data.get('images_raw', [])[:max_images]
    downloaded = []
    for idx, url in enumerate(images_raw):
        try:
            r = requests.get(url, timeout=10)
            if r.status_code == 200:
                ext = '.jpg'
                fname = f"airbnb_{idx:02d}{ext}"
                fpath = os.path.join(images_dir, fname)
                with open(fpath, 'wb') as fh:
                    fh.write(r.content)
                downloaded.append({'url': url, 'local_path': fpath})
        except Exception:
            continue
    if downloaded:
        norm['images'] = downloaded
    norm['last_fetched'] = datetime.datetime.utcnow().replace(microsecond=0).isoformat() + 'Z'
    return norm


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--url', required=True)
    ap.add_argument('--mapping', default='airbnb/mapping.yaml')
    ap.add_argument('--out-json', default='airbnb/data/airbnb_listing.json')
    ap.add_argument('--images-dir', default='images/web/airbnb')
    ap.add_argument('--cookies')
    ap.add_argument('--max-images', type=int, default=12)
    args = ap.parse_args()

    mapping = load_mapping(args.mapping)
    timeout_ms = mapping.get('settings', {}).get('request_timeout', 20000)

    raw: Dict[str, Any] = {}
    # Prefer playwright
    raw = playwright_scrape(args.url, mapping, args.cookies, args.max_images, timeout_ms) or {}
    if not raw:
        print('Playwright unavailable or failed, attempting fallback...', file=sys.stderr)
        raw = fallback_scrape(args.url, mapping, timeout_ms) or {}
    if not raw:
        print('ERROR: Unable to scrape any content.', file=sys.stderr)
        sys.exit(1)

    norm = normalize(raw, args.max_images, args.images_dir)
    norm['source_url'] = args.url

    ensure_dir(os.path.dirname(args.out_json))
    with open(args.out_json, 'w', encoding='utf-8') as f:
        json.dump(norm, f, ensure_ascii=False, indent=2)
    print(f"Wrote {args.out_json} with keys: {list(norm.keys())}")

if __name__ == '__main__':
    main()
