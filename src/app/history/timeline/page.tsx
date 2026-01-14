"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, Calendar, Filter, ChevronDown } from "lucide-react";

import timeline from "@/data/timeline.json";
import archive from "@/data/document-archive.json";

type TimelineEvent = {
  date?: string;
  year?: number | null;
  description?: string;
  source?: string | null;
  era?: string;
};

type ArchiveDocument = {
  slug: string;
  filename: string;
  web_images?: string[];
};

const docsByFilename = new Map(
  (archive as ArchiveDocument[]).map((d) => [d.filename, d])
);

// Get unique eras for filtering
const allEras = [...new Set((timeline as TimelineEvent[]).map((e) => e.era).filter(Boolean))] as string[];

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "";
  if (dateStr.length === 4) return dateStr; // Just a year
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HistoryTimelinePage() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = selectedEra
    ? (timeline as TimelineEvent[]).filter((e) => e.era === selectedEra)
    : (timeline as TimelineEvent[]);

  // Group by era for visual organization
  const groupedByEra = filteredEvents.reduce(
    (acc, event) => {
      const era = event.era || "Other";
      if (!acc[era]) acc[era] = [];
      acc[era].push(event);
      return acc;
    },
    {} as Record<string, TimelineEvent[]>
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section with SEO-optimized content */}
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-amber-400 mb-4">
            Since 1854 • Rittenhouse Square
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            170 Years of Stories
          </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the remarkable history of 1822 Pine Street—from Victorian parlor gatherings
            to Gilded Age celebrations. This is where Philadelphia&apos;s history happened.
            </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-400" />
              <span>170+ Years</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-400" />
              <span>{allEras.length} Eras of History</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 text-gray-700 hover:text-amber-700 font-medium"
              >
                <Filter className="h-4 w-4" />
                Filter by Era
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>
              {selectedEra && (
                <button
                  onClick={() => setSelectedEra(null)}
                  className="text-sm text-amber-700 hover:text-amber-800"
                >
                  Clear filter
                </button>
              )}
            </div>
            <Link
              href="/history/documents"
              className="text-amber-700 font-semibold hover:text-amber-800"
            >
              View Document Archive →
            </Link>
          </div>

          {/* Era Filter Pills */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {allEras.map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era === selectedEra ? null : era)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    era === selectedEra
                      ? "bg-amber-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-800"
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Timeline Content */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {Object.entries(groupedByEra).map(([era, events]) => (
            <div key={era} className="mb-12">
              {/* Era Header */}
              <div className="sticky top-20 z-[5] bg-gray-50 py-3 mb-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  {era}
                  <span className="text-sm font-normal text-gray-500">
                    ({events.length} {events.length === 1 ? "event" : "events"})
                  </span>
                </h2>
              </div>

              {/* Timeline Events */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber-200" />

                <div className="space-y-6">
                  {events.map((event, idx) => {
                    const source = event.source;
                    const doc = source ? docsByFilename.get(source) : undefined;
                    const thumbnail = doc?.web_images?.[0];

                    return (
                      <article
                        key={`${era}-${idx}`}
                        className="relative pl-16"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-white border-4 border-amber-500" />

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                          <div className="p-5">
                            {/* Date badge */}
                            {event.date && (
                              <time
                                dateTime={event.date}
                                className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-sm font-medium rounded-full mb-3"
                              >
                                {formatDate(event.date)}
                              </time>
                            )}

                            {/* Description */}
                            <p className="text-gray-900 leading-relaxed">
                              {event.description}
                            </p>

                            {/* Document Link with Thumbnail */}
                            {source && doc && (
                              <Link
                                href={`/history/documents/${doc.slug}`}
                                className="mt-4 flex items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors group"
                              >
                                {/* Thumbnail */}
                                {thumbnail && (
                                  <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden border border-gray-200">
                                    <Image
                                      src={`/archive/images/web/${thumbnail}`}
                                      alt={`Document thumbnail for ${source}`}
                                      fill
                                      className="object-cover"
                                      sizes="64px"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-amber-700 group-hover:text-amber-800 flex items-center gap-2">
                                    <FileText className="h-4 w-4 flex-shrink-0" />
                                    View Primary Source Document
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1 truncate">
                                    {source}
                                  </p>
                                </div>
                              </Link>
                            )}

                            {/* For events without linked documents */}
                            {!source && (
                              <p className="mt-3 text-xs text-gray-400 italic">
                                Historical record based on property documentation
                              </p>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA footer */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Stay Where History Happened
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            8 bedrooms, original fireplaces, marble mantels, and a private garden—all
            steps from Rittenhouse Square. Perfect for reunions, celebrations, and
            unforgettable gatherings.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-md bg-amber-600 px-6 py-3 text-base font-semibold text-white hover:bg-amber-700 transition-colors"
            >
              Check Availability
            </Link>
            <Link
              href="/stay"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              View the Property
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
