#!/usr/bin/env python3

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class RoutePattern:
    pattern: str
    regex: re.Pattern[str]
    sources: tuple[Path, ...]


def build_route_patterns(app_dir: Path) -> list[RoutePattern]:
    pages = sorted(app_dir.rglob("page.tsx"))

    route_to_sources: dict[str, list[Path]] = {}
    for page in pages:
        rel = page.relative_to(app_dir)
        segments = []
        for seg in rel.parts[:-1]:
            if seg.startswith("(") and seg.endswith(")"):
                continue
            segments.append(seg)
        route = "/" + "/".join(segments)
        route = "/" if route == "/" else route.rstrip("/")
        route_to_sources.setdefault(route, []).append(page)

    patterns: list[RoutePattern] = []
    for route, sources in sorted(route_to_sources.items(), key=lambda x: x[0]):
        parts = [p for p in route.split("/") if p]
        regex_parts = []
        for part in parts:
            if part.startswith("[") and part.endswith("]"):
                regex_parts.append(r"[^/]+")
            else:
                regex_parts.append(re.escape(part))
        regex = re.compile(r"^/" + "/".join(regex_parts) + r"/?$")
        patterns.append(RoutePattern(pattern=route, regex=regex, sources=tuple(sources)))
    return patterns


def read_text_files(paths: list[Path]) -> dict[Path, str]:
    out: dict[Path, str] = {}
    for path in paths:
        try:
            out[path] = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
    return out


def extract_quoted_absolute_paths(text: str) -> set[str]:
    # Includes link hrefs, asset paths, and any other quoted absolute strings.
    # Examples: "/faq#rules", "/images/brand/logo.jpg"
    found = set()
    for m in re.finditer(r"""["'](/[^"']+)["']""", text):
        value = m.group(1)
        if value.startswith("//"):
            continue
        # Skip non-URL regex matchers (e.g., Next.js middleware matchers).
        if "\\\\" in value or "(?" in value or re.search(r"[\\^$|]", value):
            continue
        found.add(value)
    return found


def split_url(url: str) -> tuple[str, str | None]:
    if "#" not in url:
        return url, None
    base, frag = url.split("#", 1)
    return base or "/", frag or None


def is_probable_asset_path(url_base: str) -> bool:
    if url_base.startswith("/images/") or url_base.startswith("/archive/"):
        return True
    return bool(re.search(r"\.[a-zA-Z0-9]{2,5}$", url_base))


def match_route(patterns: list[RoutePattern], route: str) -> RoutePattern | None:
    for p in patterns:
        if p.regex.match(route):
            return p
    return None


def validate_anchor(target_page: Path, fragment: str) -> bool:
    text = target_page.read_text(encoding="utf-8")
    return bool(re.search(rf"""\bid\s*=\s*["']{re.escape(fragment)}["']""", text))


def validate_archive_assets(repo_root: Path) -> list[str]:
    issues: list[str] = []
    public_dir = repo_root / "rittenhouse-website" / "public"
    archive_root = public_dir / "archive"

    # Archive assets are generated/synced by `scripts/prepare-archive-assets.mjs`.
    # If they haven't been prepared in this working tree, skip validation.
    if not (archive_root / "raw_documents").exists():
        return issues

    archive_json = repo_root / "rittenhouse-website" / "src" / "data" / "document-archive.json"
    if not archive_json.exists():
        return ["Missing document archive JSON: src/data/document-archive.json"]

    docs = json.loads(archive_json.read_text(encoding="utf-8"))
    for doc in docs:
        filename = doc.get("filename")
        if not filename:
            issues.append("Document missing filename in document-archive.json")
            continue
        raw_path = public_dir / "archive" / "raw_documents" / filename
        if not raw_path.exists():
            issues.append(f"Missing raw document: {raw_path}")

        for img in doc.get("web_images") or []:
            img_path = public_dir / "archive" / "images" / "web" / img
            if not img_path.exists():
                issues.append(f"Missing web image: {img_path}")

    return issues


def main() -> None:
    repo_root = Path(__file__).resolve().parents[2]
    app_dir = repo_root / "rittenhouse-website" / "src" / "app"
    public_dir = repo_root / "rittenhouse-website" / "public"

    patterns = build_route_patterns(app_dir)
    route_to_sources = {p.pattern: p.sources for p in patterns}

    duplicates = {r: s for r, s in route_to_sources.items() if len(s) > 1}

    src_dir = repo_root / "rittenhouse-website" / "src"
    code_files = sorted(
        [*src_dir.rglob("*.ts"), *src_dir.rglob("*.tsx")],
        key=lambda p: str(p),
    )
    texts = read_text_files(code_files)

    urls: dict[str, set[Path]] = {}
    for path, text in texts.items():
        for url in extract_quoted_absolute_paths(text):
            urls.setdefault(url, set()).add(path)

    missing_routes: dict[str, set[Path]] = {}
    missing_assets: dict[str, set[Path]] = {}
    missing_anchors: dict[str, set[Path]] = {}

    for url, sources in sorted(urls.items(), key=lambda x: x[0]):
        base, frag = split_url(url)
        base = base.rstrip("/") if base != "/" else "/"

        if base.startswith("/api/"):
            continue

        if is_probable_asset_path(base):
            asset = public_dir / base.lstrip("/")
            if not asset.exists():
                missing_assets[url] = sources
            continue

        matched = match_route(patterns, base)
        if not matched:
            missing_routes[url] = sources
            continue

        if frag:
            if len(matched.sources) == 1 and "[" not in matched.pattern:
                page_file = matched.sources[0]
                if not validate_anchor(page_file, frag):
                    missing_anchors[url] = sources

    archive_issues = validate_archive_assets(repo_root)

    def print_group(title: str, items: dict[str, set[Path]]) -> None:
        if not items:
            return
        print()
        print(title)
        print("-" * len(title))
        for url, srcs in items.items():
            src_list = ", ".join(sorted(str(p.relative_to(repo_root)) for p in srcs))
            print(f"- {url} (found in {src_list})")

    if duplicates:
        print("Duplicate routes (potential conflicts)")
        print("-----------------------------------")
        for route, srcs in duplicates.items():
            src_list = ", ".join(sorted(str(p.relative_to(repo_root)) for p in srcs))
            print(f"- {route} -> {src_list}")

    print_group("Missing routes", missing_routes)
    print_group("Missing assets", missing_assets)
    print_group("Missing anchors", missing_anchors)

    if archive_issues:
        print()
        print("Archive asset issues")
        print("--------------------")
        for issue in archive_issues:
            print(f"- {issue}")

    if not missing_routes and not missing_assets and not missing_anchors and not archive_issues:
        print("OK: no missing routes/assets/anchors detected.")


if __name__ == "__main__":
    main()
