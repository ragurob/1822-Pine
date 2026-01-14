"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, Calendar, Filter, ChevronDown, BookOpen, ArrowRight, Scroll } from "lucide-react";

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
  if (dateStr.length === 4) return dateStr;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Check if a source is a deed document
function isDeed(source: string | null | undefined): boolean {
  if (!source) return false;
  const lower = source.toLowerCase();
  return lower.includes("deed") || lower.includes("abstract");
}

export default function HistoryPage() {
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

  const totalDocs = (timeline as TimelineEvent[]).filter((e) => e.source).length;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/property/DSC00064.jpg"
            alt="Historic 1822 Pine Street mansion"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-400 mb-4">
              Est. 1854 • Philadelphia Historic Register
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              The History of the Rittenhouse Residence
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-300">
              170 years of Philadelphia history. From Victorian parlor gatherings to Gilded Age celebrations,
              the Rittenhouse Residence has hosted the city&apos;s finest moments. Stay where history happened.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 md:mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl">
            <div className="text-center">
              <Scroll className="h-6 w-6 md:h-8 md:w-8 text-amber-400 mx-auto" />
              <p className="mt-2 font-serif text-2xl md:text-3xl font-bold text-white">
                1854
              </p>
              <p className="text-xs md:text-sm text-gray-400">Year Built</p>
            </div>
            <div className="text-center">
              <Calendar className="h-6 w-6 md:h-8 md:w-8 text-amber-400 mx-auto" />
              <p className="mt-2 font-serif text-2xl md:text-3xl font-bold text-white">
                170+
              </p>
              <p className="text-xs md:text-sm text-gray-400">Years of Stories</p>
            </div>
            <div className="text-center">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-amber-400 mx-auto" />
              <p className="mt-2 font-serif text-2xl md:text-3xl font-bold text-white">
                8
              </p>
              <p className="text-xs md:text-sm text-gray-400">Bedrooms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Feature Section - The Novel */}
      <section className="py-12 md:py-16 bg-amber-50 border-b border-amber-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-amber-700 mb-4">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">The Story</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
                House at the Edge of the Square
              </h2>
              <p className="mt-2 font-serif text-base md:text-lg text-amber-800">
                A Philadelphia Novel in Fourteen Chapters
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Experience 170 years of history through the voice of the house itself—told
                from the perspective of the marble threshold that has counted every footfall
                since 1854. From Victorian society balls and Drexel banking connections to
                suffrage activism in the parlors, discover the documented narrative of one
                of Rittenhouse Square&apos;s most storied addresses.
              </p>
              <p className="mt-3 text-gray-600 text-sm">
                The Spencer family&apos;s elegant renovations, Drexel banking connections,
                and suffrage activism in these very parlors—every chapter reveals what makes
                this house extraordinary.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/history/story"
                  className="inline-flex items-center justify-center rounded-md bg-amber-600 px-5 py-3 text-base font-semibold text-white hover:bg-amber-700 transition-colors"
                >
                  Read the Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/history/story/prologue"
                  className="inline-flex items-center justify-center rounded-md border border-amber-600 bg-white px-5 py-3 text-base font-semibold text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  Start with Prologue
                </Link>
              </div>
            </div>
            <div className="lg:w-72 flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl max-w-xs mx-auto lg:max-w-none">
                <Image
                  src="/images/property/DSC00064.jpg"
                  alt="1822 Pine Street - Historic Philadelphia Mansion"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-serif text-white text-lg font-semibold">14 Chapters</p>
                  <p className="text-amber-200 text-sm">170+ Years of History</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 text-gray-700 hover:text-amber-700 font-medium text-sm md:text-base"
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
              className="text-amber-700 font-semibold hover:text-amber-800 text-sm md:text-base"
            >
              View Document Archive →
            </Link>
          </div>

          {/* Era Filter Pills */}
          {showFilters && (
            <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
              {allEras.map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era === selectedEra ? null : era)}
                  className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-colors ${
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
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
              Complete Documentary Timeline
            </h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Deeds, newspaper articles, and historical records in chronological order
            </p>
          </div>

          {Object.entries(groupedByEra).map(([era, events]) => (
            <div key={era} className="mb-10 md:mb-12">
              {/* Era Header */}
              <div className="sticky top-14 md:top-16 z-[5] bg-gray-50 py-2 md:py-3 mb-4 md:mb-6">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500" />
                  {era}
                  <span className="text-xs md:text-sm font-normal text-gray-500">
                    ({events.length} {events.length === 1 ? "event" : "events"})
                  </span>
                </h3>
              </div>

              {/* Timeline Events */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-amber-200" />

                <div className="space-y-4 md:space-y-6">
                  {events.map((event, idx) => {
                    const source = event.source;
                    const doc = source ? docsByFilename.get(source) : undefined;
                    const thumbnail = doc?.web_images?.[0];
                    const isDocDeed = isDeed(source);

                    return (
                      <article
                        key={`${era}-${idx}`}
                        className="relative pl-10 md:pl-16"
                      >
                        {/* Timeline dot */}
                        <div className={`absolute left-2 md:left-4 top-5 md:top-6 w-4 h-4 md:w-5 md:h-5 rounded-full bg-white border-4 ${
                          isDocDeed ? "border-emerald-500" : "border-amber-500"
                        }`} />

                        <div className={`bg-white rounded-lg md:rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
                          isDocDeed ? "border-emerald-100" : "border-gray-100"
                        }`}>
                          <div className="p-4 md:p-5">
                            {/* Date badge + Document type */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              {event.date && (
                                <time
                                  dateTime={event.date}
                                  className="inline-block px-2.5 py-1 bg-amber-50 text-amber-800 text-xs md:text-sm font-medium rounded-full"
                                >
                                  {formatDate(event.date)}
                                </time>
                              )}
                              {isDocDeed && (
                                <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                                  DEED
                                </span>
                              )}
                            </div>

                            {/* Description */}
                            <p className="text-gray-900 leading-relaxed text-sm md:text-base">
                              {event.description}
                            </p>

                            {/* Document Link with Thumbnail */}
                            {source && doc && (
                              <Link
                                href={`/history/documents/${doc.slug}`}
                                className="mt-3 md:mt-4 flex items-start gap-3 md:gap-4 p-2.5 md:p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors group"
                              >
                                {/* Thumbnail */}
                                {thumbnail && (
                                  <div className="relative w-12 h-16 md:w-16 md:h-20 flex-shrink-0 rounded overflow-hidden border border-gray-200">
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
                                  <p className="text-xs md:text-sm font-medium text-amber-700 group-hover:text-amber-800 flex items-center gap-2">
                                    <FileText className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
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

      {/* Footer CTA Section */}
      <section className="py-10 md:py-12 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900">
            Stay at the Rittenhouse Residence
          </h2>
          <p className="mt-3 md:mt-4 text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            8 bedrooms, original fireplaces, marble mantels, and a private garden—all
            steps from Rittenhouse Square. Perfect for family reunions, celebrations,
            and unforgettable gatherings.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-md bg-amber-600 px-5 py-3 text-sm md:text-base font-semibold text-white hover:bg-amber-700 transition-colors"
            >
              Check Availability
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Link>
            <Link
              href="/stay"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-sm md:text-base font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              View the Property
            </Link>
            <Link
              href="/history/story"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm md:text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Read the Full Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
