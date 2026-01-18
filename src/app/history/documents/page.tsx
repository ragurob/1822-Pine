import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import archive from "@/data/document-archive.json";

type ArchiveDocument = {
  slug: string;
  filename: string;
  type?: string | null;
  extracted_date?: string | null;
  pages?: number | null;
  synopsis?: string | null;
  web_images?: string[];
};

type DecadeGroup = {
  key: string;
  label: string;
  summary: string;
  docs: ArchiveDocument[];
};

export const metadata: Metadata = {
  title: "Document Archive",
  description:
    "A chronological archive of primary-source documents tied to 1822 Pine Street — deeds, newspaper clippings, and floor plans that document The Rittenhouse Residence.",
  keywords: [
    "Rittenhouse Residence history",
    "Philadelphia historic documents",
    "1822 Pine Street archive",
    "deed records Philadelphia",
    "newspaper clippings Philadelphia",
    "historic floor plans",
    "whole-home rental Philadelphia",
    "group stay Philadelphia",
  ],
  openGraph: {
    title: "Document Archive | Rittenhouse Residence",
    description:
      "Explore the time-ordered document archive for the Rittenhouse Residence, including deeds, press clippings, and floor plans.",
    type: "website",
    images: [
      {
        url: "/images/documents/1854-deed.jpg",
        width: 1200,
        height: 630,
        alt: "Rittenhouse Residence historical documents",
      },
    ],
  },
};

function webImageUrl(imageFile: string) {
  return `/archive/images/web/${encodeURIComponent(imageFile)}`;
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

function yearFromDate(date: string | null | undefined) {
  if (!date) return null;
  const y = date.slice(0, 4);
  return /^\d{4}$/.test(y) ? Number(y) : null;
}

function decadeFromYear(year: number | null) {
  if (!year) return null;
  return Math.floor(year / 10) * 10;
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

function decadeSummary(docs: ArchiveDocument[]) {
  const counts = {
    deed: 0,
    clipping: 0,
    floor: 0,
    sale: 0,
    other: 0,
  };

  for (const doc of docs) {
    const kind = documentKind(doc);
    if (kind === "deed") counts.deed += 1;
    else if (kind === "clipping") counts.clipping += 1;
    else if (kind === "floor-plan") counts.floor += 1;
    else if (kind === "sale-notice") counts.sale += 1;
    else counts.other += 1;
  }

  const parts: string[] = [];
  if (counts.deed) parts.push(`${counts.deed} deed record${counts.deed === 1 ? "" : "s"}`);
  if (counts.clipping) {
    parts.push(`${counts.clipping} newspaper clipping${counts.clipping === 1 ? "" : "s"}`);
  }
  if (counts.sale) parts.push(`${counts.sale} sale notice${counts.sale === 1 ? "" : "s"}`);
  if (counts.floor) parts.push(`${counts.floor} floor plan${counts.floor === 1 ? "" : "s"}`);
  if (counts.other) parts.push(`${counts.other} additional record${counts.other === 1 ? "" : "s"}`);

  if (!parts.length) return "Primary-source records from this period.";
  return `This period includes ${parts.join(" and ")} tied to the residence.`;
}

function groupByDecade(docs: ArchiveDocument[]): DecadeGroup[] {
  const map = new Map<string, ArchiveDocument[]>();
  for (const doc of docs) {
    const year = yearFromDate(doc.extracted_date);
    const decade = decadeFromYear(year);
    const key = decade ? `${decade}` : "undated";
    map.set(key, [...(map.get(key) ?? []), doc]);
  }

  const keys = [...map.keys()].sort((a, b) => {
    if (a === "undated") return 1;
    if (b === "undated") return -1;
    return Number(a) - Number(b);
  });

  return keys.map((key) => {
    const decade = key === "undated" ? null : Number(key);
    const label = decade ? `${decade}s` : "Undated Records";
    const docsForDecade = (map.get(key) ?? []).sort((a, b) => {
      const aDate = a.extracted_date ?? "9999-99-99";
      const bDate = b.extracted_date ?? "9999-99-99";
      return aDate.localeCompare(bDate) || a.filename.localeCompare(b.filename);
    });
    return {
      key,
      label,
      summary: decadeSummary(docsForDecade),
      docs: docsForDecade,
    };
  });
}

export default function DocumentsPage() {
  const docs = archive as ArchiveDocument[];
  const sortedDocs = [...docs].sort((a, b) => {
    const aDate = a.extracted_date ?? "9999-99-99";
    const bDate = b.extracted_date ?? "9999-99-99";
    return aDate.localeCompare(bDate) || a.filename.localeCompare(b.filename);
  });
  const groups = groupByDecade(sortedDocs);

  return (
    <div className="flex flex-col">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/documents/1854-deed.jpg"
            alt="Historical documents"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-400 mb-4">
              Primary sources
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Document Archive
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              A chronological walk through {docs.length} primary-source documents tied to 1822 Pine
              Street. Each entry includes a brief context note, metadata, and a document preview.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Note: the property certificate is intentionally excluded from the public archive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/history/timeline"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 backdrop-blur px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                View Timeline
              </Link>
              <Link
                href="/history/provenance"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 backdrop-blur px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Provenance & Verification
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Jump to:</span>
            {groups.map((group) => (
              <a
                key={group.key}
                href={`#decade-${group.key}`}
                className="text-amber-700 hover:text-amber-800"
              >
                {group.label}
              </a>
            ))}
          </div>

          <div className="mt-12 space-y-16">
            {groups.map((group) => (
              <section key={group.key} id={`decade-${group.key}`} className="scroll-mt-24">
                <div className="flex items-baseline gap-4">
                  <h2 className="font-serif text-3xl font-bold text-gray-900">
                    {group.label}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {group.docs.length} document{group.docs.length === 1 ? "" : "s"}
                  </span>
                </div>
                <p className="mt-3 text-gray-600 max-w-3xl">
                  {group.summary}
                </p>

                <div className="mt-10 space-y-10">
                  {group.docs.map((doc) => {
                    const thumb = doc.web_images?.[0];
                    const kind = documentKind(doc);
                    const dateLabel = formatDate(doc.extracted_date);
                    return (
                      <article
                        key={doc.slug}
                        className="grid gap-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
                      >
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                            {documentKindLabel(kind)}
                          </p>
                          <h3 className="mt-2 font-serif text-2xl font-bold text-gray-900">
                            <Link
                              href={`/history/documents/${doc.slug}`}
                              className="hover:text-amber-800"
                            >
                              {titleFromFilename(doc.filename)}
                            </Link>
                          </h3>
                          <p className="mt-3 text-gray-700">
                            {doc.synopsis ?? documentSummary(doc)}
                          </p>

                          <dl className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                            <div>
                              <dt className="font-semibold text-gray-900">Date</dt>
                              <dd>{dateLabel ?? "Undated"}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-gray-900">Pages</dt>
                              <dd>{doc.pages ? doc.pages : "—"}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-gray-900">File Type</dt>
                              <dd>{fileExtension(doc.filename)}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-gray-900">Source File</dt>
                              <dd className="truncate">{doc.filename}</dd>
                            </div>
                          </dl>

                          <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                              href={`/history/documents/${doc.slug}`}
                              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                            >
                              View Document
                            </Link>
                          </div>
                        </div>

                        <div className="relative">
                          <Link href={`/history/documents/${doc.slug}`} className="block">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-gray-200 bg-white">
                              {thumb ? (
                                <Image
                                  src={webImageUrl(thumb)}
                                  alt={`${titleFromFilename(doc.filename)} document preview`}
                                  fill
                                  className="object-cover object-top"
                                  sizes="(max-width: 1024px) 100vw, 40vw"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                  No preview available
                                </div>
                              )}
                            </div>
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
