#!/usr/bin/env python3
"""Render scraped Airbnb JSON into Quarto Markdown fragments via Jinja2 templates.

Usage:
  python airbnb/render_to_quarto.py --data airbnb/data/airbnb_listing.json --out airbnb/fragments/
"""
from __future__ import annotations
import argparse, json, os, pathlib, datetime
from typing import Dict, Any
from jinja2 import Environment, FileSystemLoader, select_autoescape


def load_json(path: str) -> Dict[str, Any]:
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def build_env(templates_dir: str) -> Environment:
    env = Environment(
        loader=FileSystemLoader(templates_dir),
        autoescape=select_autoescape(['html', 'xml'])
    )
    # Add truncate filter fallback if not present
    if 'truncate' not in env.filters:
        def truncate(s, length=300, killwords=False, end='...'):
            s = s or ''
            if len(s) <= length:
                return s
            if killwords:
                return s[:length] + end
            else:
                cut = s[:length].rsplit(' ', 1)[0]
                return cut + end
        env.filters['truncate'] = truncate
    return env


def render_fragments(data: Dict[str, Any], templates_dir: str, out_dir: str):
    env = build_env(templates_dir)
    ensure_dir(out_dir)
    template_map = {
        'index-hero.md.j2': 'index-hero.md',
        'stay-excerpt.md.j2': 'stay-excerpt.md',
        'house-rules.md.j2': 'house-rules.md',
    'gallery.md.j2': 'gallery.md',
    }
    for tpl_name, out_name in template_map.items():
        tpl = env.get_template(tpl_name)
        content = tpl.render(**data)
        out_path = os.path.join(out_dir, out_name)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Rendered {out_path}")


def ensure_dir(p: str):
    pathlib.Path(p).mkdir(parents=True, exist_ok=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--data', required=True)
    ap.add_argument('--templates', default='airbnb/templates')
    ap.add_argument('--out', default='airbnb/fragments')
    args = ap.parse_args()
    data = load_json(args.data)
    # Provide defaults if keys absent
    data.setdefault('images', [])
    data.setdefault('title', 'Stay at 1822 Pine Street')
    data.setdefault('last_fetched', datetime.datetime.utcnow().isoformat() + 'Z')
    render_fragments(data, args.templates, args.out)

if __name__ == '__main__':
    main()
