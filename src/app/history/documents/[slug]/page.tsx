import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import archive from "@/data/document-archive.json";

type ArchiveDocument = {
  slug: string;
  filename: string;
  type?: string | null;
  extracted_date?: string | null;
  pages?: number | null;
  web_images?: string[];
};

function webImageUrl(imageFile: string) {
  return `/archive/images/web/${encodeURIComponent(imageFile)}`;
}

function rawDocUrl(filename: string) {
  return `/archive/raw_documents/${encodeURIComponent(filename)}`;
}

function titleFromFilename(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/_/g, " ").replace(/\s+/g, " ").trim();
}

function formatDate(date: string | null | undefined) {
  if (!date) return null;
  const [year, month, day] = date.split("-");
  if (!year) return null;
  if (!month || !day) return year;
  const dt = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dt);
}

function fileExtension(filename: string) {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? match[1].toUpperCase() : "FILE";
}

function isFloorPlan(filename: string) {
  const f = filename.toLowerCase();
  return f.includes(" floor") || f.includes("roof deck");
}

function isSaleNotice(filename: string) {
  return filename.toLowerCase().includes("sold_for");
}

function documentKind(doc: ArchiveDocument) {
  if (isFloorPlan(doc.filename)) return "floor-plan";
  if (isSaleNotice(doc.filename)) return "sale-notice";
  if (doc.type === "deed" || doc.filename.toLowerCase().includes("deed")) return "deed";
  if (doc.type === "clipping") return "clipping";
  return "document";
}

function documentKindLabel(kind: string) {
  switch (kind) {
    case "floor-plan":
      return "Floor Plan";
    case "sale-notice":
      return "Sale Notice";
    case "deed":
      return "Deed / Ownership Record";
    case "clipping":
      return "Newspaper Clipping";
    default:
      return "Historical Document";
  }
}

function floorLabelFromFilename(filename: string) {
  const lower = filename.toLowerCase();
  if (lower.includes("roof deck")) return "roof deck";
  const match = lower.match(/(\\d)\\s*floor/);
  if (!match) return "the residence";
  const floorMap: Record<string, string> = {
    "1": "first floor",
    "2": "second floor",
    "3": "third floor",
    "4": "fourth floor",
  };
  return floorMap[match[1]] ?? "the residence";
}

function documentSummary(doc: ArchiveDocument) {
  const kind = documentKind(doc);
  const dateLabel = formatDate(doc.extracted_date);
  if (kind === "floor-plan") {
    return `Architectural floor plan showing the ${floorLabelFromFilename(doc.filename)} layout.`;
  }
  if (kind === "sale-notice") {
    return dateLabel
      ? `Sale notice published on ${dateLabel}.`
      : "Sale notice recorded in the local press.";
  }
  if (kind === "deed") {
    return dateLabel
      ? `Ownership record dated ${dateLabel}.`
      : "Ownership record in the chain of title.";
  }
  if (kind === "clipping") {
    return dateLabel
      ? `Newspaper clipping dated ${dateLabel}.`
      : "Undated newspaper clipping related to the residence.";
  }
  return "Primary-source document connected to 1822 Pine Street.";
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const doc = (archive as ArchiveDocument[]).find((d) => d.slug === slug);
    if (!doc) return { title: "Document Not Found | Rittenhouse Residence" };
    const kindLabel = documentKindLabel(documentKind(doc));
    const dateLabel = formatDate(doc.extracted_date);
    const description = dateLabel
      ? `${kindLabel} dated ${dateLabel}. Primary-source record for the Rittenhouse Residence.`
      : `${kindLabel} from the Rittenhouse Residence archive.`;
    const previewImage = doc.web_images?.[0]
      ? webImageUrl(doc.web_images[0])
      : undefined;
    return {
      title: `${titleFromFilename(doc.filename)} | Documents`,
      description,
      keywords: [
        "Rittenhouse Residence archive",
        "1822 Pine Street",
        "Philadelphia historic document",
        "primary-source document",
      ],
      openGraph: {
        title: `${titleFromFilename(doc.filename)} | Documents`,
        description,
        type: "article",
        images: previewImage
          ? [
              {
                url: previewImage,
                alt: `${titleFromFilename(doc.filename)} document preview`,
              },
            ]
          : undefined,
      },
    };
  });
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (archive as ArchiveDocument[]).find((d) => d.slug === slug);
  if (!doc) notFound();

  const title = titleFromFilename(doc.filename);
  const kind = documentKind(doc);
  const dateLabel = formatDate(doc.extracted_date);

  return (
    <div className="flex flex-col">
      <section className="py-12 bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-amber-400 mb-3">
            {documentKindLabel(kind)}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            {title}
          </h1>
          <p className="mt-3 text-gray-300">
            {documentSummary(doc)}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <dl className="grid gap-3 text-sm text-gray-300 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-white">Date</dt>
                <dd>{dateLabel ?? "Undated"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Pages</dt>
                <dd>{doc.pages ? doc.pages : "—"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">File Type</dt>
                <dd>{fileExtension(doc.filename)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Source File</dt>
                <dd className="truncate">{doc.filename}</dd>
              </div>
            </dl>
            <div className="flex gap-3">
              <a
                href={rawDocUrl(doc.filename)}
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Original
              </a>
              <Link
                href="/history/documents"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Back to Archive
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {(doc.web_images ?? []).map((img) => (
            <div key={img} className="rounded-xl border border-gray-200 overflow-hidden">
              <img
                src={webImageUrl(img)}
                alt={`${title} document page`}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
