## Archive Assets

This folder is used by the **production Next.js site** to serve the historical archive at:
- `/history/documents`
- `/history/timeline`
- `/history/provenance`

The contents under `public/archive/` are **synced from** `Rittenhouse-Residence/` via:
- `rittenhouse-website/scripts/prepare-archive-assets.mjs`

Files in `public/archive/` are treated as **generated build artifacts** and are ignored by git.
