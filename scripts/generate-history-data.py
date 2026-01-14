#!/usr/bin/env python3

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

import yaml


IGNORE_FILENAMES = {
    "1822 Pine - Property Cert.pdf",
}


def should_ignore_filename(filename: str) -> bool:
    normalized = filename.strip().lower()
    return normalized in {f.lower() for f in IGNORE_FILENAMES}


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value).strip("-")
    return value or "item"


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, sort_keys=False) + "\n", encoding="utf-8")


def generate_document_archive(source_processing_results: Path) -> list[dict[str, Any]]:
    raw = json.loads(source_processing_results.read_text(encoding="utf-8"))
    processed = raw.get("processed", [])

    out: list[dict[str, Any]] = []
    used_slugs: set[str] = set()

    for doc in processed:
        filename = doc.get("filename", "")
        if filename and should_ignore_filename(filename):
            # Intentionally excluded from the public archive.
            continue
        base = Path(filename).stem
        slug = slugify(base)
        if slug in used_slugs:
            # Ensure uniqueness
            suffix = 2
            while f"{slug}-{suffix}" in used_slugs:
                suffix += 1
            slug = f"{slug}-{suffix}"
        used_slugs.add(slug)

        images = doc.get("images") or []
        web_images = []
        for img in images:
            web_path = (img or {}).get("web")
            if not web_path:
                continue
            # processing_results stores e.g. "images/web/<file>.jpg"
            web_images.append(Path(web_path).name)

        out.append(
            {
                "slug": slug,
                "filename": filename,
                "type": doc.get("type"),
                "extracted_date": doc.get("extracted_date"),
                "pages": doc.get("pages"),
                "web_images": web_images,
            }
        )

    # Stable ordering (date then filename)
    out.sort(key=lambda d: (d.get("extracted_date") or "9999-99-99", d.get("filename") or ""))
    return out


def generate_timeline(source_timeline_yml: Path) -> list[dict[str, Any]]:
    data = yaml.safe_load(source_timeline_yml.read_text(encoding="utf-8"))
    events = (data or {}).get("timeline", [])
    out = []
    for e in events:
        date = e.get("date")
        source = e.get("source")
        if isinstance(source, str) and should_ignore_filename(source):
            continue
        year = None
        if isinstance(date, str) and len(date) >= 4 and date[:4].isdigit():
            year = int(date[:4])
        out.append(
            {
                "date": date,
                "year": year,
                "description": e.get("description"),
                "source": source,
            }
        )
    out.sort(key=lambda d: d.get("date") or "9999-99-99")
    return out


def generate_verified_facts(source_facts_md: Path) -> list[dict[str, Any]]:
    text = source_facts_md.read_text(encoding="utf-8")
    lines = [ln.rstrip() for ln in text.splitlines()]

    facts: list[dict[str, Any]] = []
    current_fact: str | None = None
    current_source: str | None = None

    for ln in lines:
        if ln.startswith("- "):
            if current_fact and current_source:
                facts.append({"fact": current_fact, "source": current_source})
            current_fact = ln[2:].strip()
            current_source = None
            continue

        if current_fact and ln.strip().startswith("- Source:"):
            m = re.search(r"`([^`]+)`", ln)
            if m:
                current_source = m.group(1)

    if current_fact and current_source:
        facts.append({"fact": current_fact, "source": current_source})

    # Filter out sensitive/non-public operational details
    blacklist = [
        "applicant",
        "owner name",
        "ownerproperty",
        "1521 locust",
        "pritzker",
        "price robertson",
        "wifi password",
        "phone",
        "email",
        "property cert",
        "property certificate",
    ]
    filtered = [
        f
        for f in facts
        if not any(b in (f["fact"].lower() + " " + f["source"].lower()) for b in blacklist)
    ]
    return filtered


def main() -> None:
    repo_root = Path(__file__).resolve().parents[2]

    source_processing = repo_root / "Rittenhouse-Residence" / "metadata" / "processing_results.json"
    source_timeline = repo_root / "Rittenhouse-Residence" / "data" / "timeline.yml"
    source_facts = repo_root / "Rittenhouse-Residence" / "docs" / "facts-verified.md"

    out_dir = repo_root / "rittenhouse-website" / "src" / "data"

    if not source_processing.exists():
        raise SystemExit(f"Missing {source_processing}")
    if not source_timeline.exists():
        raise SystemExit(f"Missing {source_timeline}")
    if not source_facts.exists():
        raise SystemExit(f"Missing {source_facts}")

    write_json(out_dir / "document-archive.json", generate_document_archive(source_processing))
    write_json(out_dir / "timeline.json", generate_timeline(source_timeline))
    write_json(out_dir / "verified-facts.json", generate_verified_facts(source_facts))

    print("Wrote:")
    print("-", out_dir / "document-archive.json")
    print("-", out_dir / "timeline.json")
    print("-", out_dir / "verified-facts.json")


if __name__ == "__main__":
    main()
