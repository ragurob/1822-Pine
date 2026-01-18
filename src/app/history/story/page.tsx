import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, FileText, ArrowRight, ChevronRight } from "lucide-react";

import storyData from "@/data/story-chapters.json";

export const metadata: Metadata = {
  title: "The Story of 1822 Pine Street",
  description:
    "Explore 170 years of Philadelphia history through the story of The Rittenhouse Residence at 1822 Pine Street. From Victorian society to women's suffrage, discover the documented narrative of Rittenhouse Square's most storied residence.",
  keywords: [
    "Philadelphia history",
    "Rittenhouse Square history",
    "1822 Pine Street story",
    "Philadelphia Victorian homes",
    "women's suffrage Philadelphia",
    "Drexel family Philadelphia",
    "historic Philadelphia mansion",
    "Rittenhouse Residence history",
    "Philadelphia townhouse history",
    "Center City historic homes",
  ],
  openGraph: {
    title: "The Story of 1822 Pine Street | 170 Years of Philadelphia History",
    description:
      "A documented narrative of one of Philadelphia's most historic addresses, from 1854 to present.",
    type: "article",
  },
};

type Chapter = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  era: string;
  yearStart: number;
  yearEnd: number;
  excerpt: string;
  heroImage: string;
  keyFacts: string[];
};

export default function StoryIndexPage() {
  const chapters = storyData.chapters as Chapter[];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/property/DSC00064.jpg"
            alt="1822 Pine Street - Historic Philadelphia Mansion"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-400 mb-4">
              A Documented Historical Narrative
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              {storyData.title}
            </h1>
            <p className="mt-2 font-serif text-xl sm:text-2xl text-amber-200">
              {storyData.subtitle}
            </p>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              {storyData.introduction}
            </p>

            {/* Quick Stats */}
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-gray-300">
                <BookOpen className="h-5 w-5 text-amber-400" />
                <span>{chapters.length} Chapters</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-5 w-5 text-amber-400" />
                <span>170+ Years</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FileText className="h-5 w-5 text-amber-400" />
                <span>Documented Sources</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Card */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 md:p-12">
            <p className="font-serif text-xl text-gray-800 italic leading-relaxed">
              &ldquo;I was a slab of white marble when the mason bedded me into Pine
              Street—cool under dust and hooves. Since that day, I have counted
              every footfall that crossed my threshold. This is my story, and
              yours.&rdquo;
            </p>
            <p className="mt-4 text-gray-600 text-sm">
              — The Threshold, 1822 Pine Street
            </p>
          </div>
        </div>
      </section>

      {/* Chapter List */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Read the Complete Story
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Each chapter covers an era in the house&apos;s life, anchored by
              documented facts—deeds, newspaper notices, and building permits
              that specifically name 1822 Pine Street.
            </p>
          </div>

          <div className="space-y-6">
            {chapters.map((chapter, index) => (
              <Link
                key={chapter.slug}
                href={`/history/story/${chapter.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    {/* Chapter Image */}
                    <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                      <Image
                        src={chapter.heroImage}
                        alt={`${chapter.title} - ${chapter.era}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t" />
                      <div className="absolute bottom-4 left-4 md:hidden">
                        <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Chapter {chapter.number}
                        </span>
                      </div>
                    </div>

                    {/* Chapter Content */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="hidden md:inline-block bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">
                              {chapter.number === 0
                                ? "Prologue"
                                : chapter.number === chapters.length - 1
                                  ? "Epilogue"
                                  : `Chapter ${chapter.number}`}
                            </span>
                            <span className="text-sm text-gray-500">
                              {chapter.era}
                            </span>
                          </div>
                          <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                            {chapter.title}
                          </h3>
                          <p className="text-amber-700 font-medium mt-1">
                            {chapter.subtitle}
                          </p>
                          <p className="mt-3 text-gray-600 line-clamp-2">
                            {chapter.excerpt}
                          </p>

                          {/* Key Facts Preview */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {chapter.keyFacts.slice(0, 2).map((fact, i) => (
                              <span
                                key={i}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                              >
                                {fact}
                              </span>
                            ))}
                            {chapter.keyFacts.length > 2 && (
                              <span className="text-xs text-gray-400">
                                +{chapter.keyFacts.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>

                        <ChevronRight className="h-6 w-6 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex-shrink-0 hidden md:block" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Visual */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 text-center mb-12">
            170 Years at a Glance
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-amber-200" />

            <div className="space-y-8">
              {[
                { year: "1854", event: "House built by John McCrea, sold to Roset family" },
                { year: "1893", event: "Spencer family acquires property" },
                { year: "1899", event: "Major renovation by Duhring, Okie & Ziegler" },
                { year: "1905", event: "Fireplace installed, still in use today" },
                { year: "1911-1918", event: "Suffrage activism documented at address" },
                { year: "1930s-50s", event: "Apartment conversion preserves fabric" },
                { year: "1995", event: "Historic district designation" },
                { year: "Today", event: "The Rittenhouse Residence welcomes guests" },
              ].map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow" />
                  <div
                    className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <span className="font-serif text-lg font-bold text-amber-700">
                      {item.year}
                    </span>
                    <p className="text-sm text-gray-600">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* SEO Content Footer */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <h2 className="font-serif text-xl font-bold text-gray-900">
              About This Historical Narrative
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              &ldquo;House at the Edge of the Square&rdquo; tells the documented story of
              1822 Pine Street, one of Philadelphia&apos;s most historically significant
              Rittenhouse Square properties. Every claim in this narrative is
              anchored by primary source documents—deeds, newspaper articles,
              building permits, and directory listings that specifically name
              this address. Where the record is incomplete, we acknowledge gaps;
              where family tradition suggests details we cannot yet prove, we
              mark them as probable pending verification.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              This documentation draws from the Philadelphia City Archives,
              Historical Society of Pennsylvania, and extensive newspaper
              research. The house&apos;s connection to the Drexel banking family,
              documented suffrage activism, and architectural evolution through
              170 years make it one of the most thoroughly documented historic
              homes in Center City Philadelphia.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/history/documents"
              className="text-amber-700 font-semibold hover:text-amber-800 text-sm"
            >
              Browse Document Archive →
            </Link>
            <Link
              href="/history/provenance"
              className="text-amber-700 font-semibold hover:text-amber-800 text-sm"
            >
              View Provenance Documentation →
            </Link>
            <Link
              href="/history/timeline"
              className="text-amber-700 font-semibold hover:text-amber-800 text-sm"
            >
              Interactive Timeline →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
