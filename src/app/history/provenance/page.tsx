import type { Metadata } from "next";
import Link from "next/link";

import facts from "@/data/verified-facts.json";
import archive from "@/data/document-archive.json";

type VerifiedFact = {
  fact: string;
  source: string;
};

type ArchiveDocument = {
  slug: string;
  filename: string;
};

export const metadata: Metadata = {
  title: "Provenance",
  description:
    "How the history of The Rittenhouse Residence at 1822 Pine Street is verified and documented using primary sources.",
};

const docsByFilename = new Map(
  (archive as ArchiveDocument[]).map((d) => [d.filename, d.slug])
);

function filenameFromSource(source: string) {
  return source.split("/").pop() ?? source;
}

const bibliographyDownloads = [
  { label: "Bibliography", filename: "bibliography.bib" },
  { label: "Enhanced Bibliography", filename: "bibliography_enhanced.bib" },
  { label: "Complete Bibliography", filename: "bibliography_complete.bib" },
];

function refsUrl(filename: string) {
  return `/archive/refs/${encodeURIComponent(filename)}`;
}

export default function ProvenancePage() {
  const verified = facts as VerifiedFact[];

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-400 mb-4">
              Documentation & verification
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Provenance
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Claims about the home are backed by primary sources (deeds, newspapers, and official records).
              This page highlights OCR-backed facts and links to the underlying documents.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/history/documents"
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Browse Document Archive
              </Link>
              <Link
                href="/history/timeline"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                View Timeline
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Verified Facts (OCR-Backed)
          </h2>
          <p className="mt-3 text-gray-600">
            Each item below links to a source document in the archive.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Note: the property certificate is intentionally excluded from the public archive and fact list.
          </p>

          <ul className="mt-8 space-y-4">
            {verified.map((v, idx) => {
              const filename = filenameFromSource(v.source);
              const slug = docsByFilename.get(filename);
              return (
                <li key={idx} className="rounded-xl bg-gray-50 p-5">
                  <p className="text-gray-900">{v.fact}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Source:{" "}
                    {slug ? (
                      <Link
                        className="text-amber-700 hover:text-amber-800"
                        href={`/history/documents/${slug}`}
                      >
                        {filename}
                      </Link>
                    ) : (
                      <span>{filename}</span>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-gray-900">
              Sources & Bibliography
            </h3>
            <p className="mt-2 text-gray-600">
              Download the reference files used during historical research.
            </p>
            <ul className="mt-4 space-y-2">
              {bibliographyDownloads.map((b) => (
                <li key={b.filename}>
                  <a
                    className="text-amber-700 hover:text-amber-800 font-semibold"
                    href={refsUrl(b.filename)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {b.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
