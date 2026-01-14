import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, FileText, Calendar, MapPin } from "lucide-react";

import storyData from "@/data/story-chapters.json";

type ContentBlock = {
  type: "narrator" | "heading" | "paragraph" | "callout";
  text: string;
};

type DocumentLink = {
  title: string;
  slug: string;
  description: string;
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
  content: ContentBlock[];
  documents: DocumentLink[];
  keyFacts: string[];
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const chapters = storyData.chapters as Chapter[];
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapters = storyData.chapters as Chapter[];
  const chapter = chapters.find((c) => c.slug === slug);

  if (!chapter) {
    return {
      title: "Chapter Not Found | Rittenhouse Residence",
    };
  }

  const chapterLabel = chapter.number === 0
    ? "Prologue"
    : chapter.number === chapters.length - 1
      ? "Epilogue"
      : `Chapter ${chapter.number}`;

  return {
    title: `${chapter.title} | ${chapterLabel} | The Story of 1822 Pine Street`,
    description: chapter.excerpt,
    keywords: [
      "Philadelphia history",
      "Rittenhouse Square",
      "1822 Pine Street",
      chapter.era,
      "historic Philadelphia mansion",
      "Philadelphia Victorian homes",
      ...chapter.keyFacts.slice(0, 3),
    ],
    openGraph: {
      title: `${chapter.title} - ${chapter.subtitle}`,
      description: chapter.excerpt,
      type: "article",
      images: [
        {
          url: chapter.heroImage,
          width: 1200,
          height: 630,
          alt: `${chapter.title} - ${chapter.era}`,
        },
      ],
    },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const chapters = storyData.chapters as Chapter[];
  const chapterIndex = chapters.findIndex((c) => c.slug === slug);

  if (chapterIndex === -1) {
    notFound();
  }

  const chapter = chapters[chapterIndex];
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;

  const chapterLabel = chapter.number === 0
    ? "Prologue"
    : chapter.number === chapters.length - 1
      ? "Epilogue"
      : `Chapter ${chapter.number}`;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src={chapter.heroImage}
            alt={`${chapter.title} - ${chapter.era}`}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/history/story"
              className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Story Index
            </Link>
          </nav>

          <div className="text-center">
            <span className="inline-block bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-medium px-4 py-1 rounded-full mb-4">
              {chapterLabel}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {chapter.title}
            </h1>
            <p className="mt-4 font-serif text-xl sm:text-2xl text-amber-200">
              {chapter.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-400" />
                {chapter.yearStart === chapter.yearEnd
                  ? chapter.yearStart
                  : `${chapter.yearStart}–${chapter.yearEnd}`}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-amber-400" />
                {chapter.era}
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-amber-400" />
                {chapter.documents.length} Source Documents
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Content */}
      <article className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Key Facts Bar */}
          <div className="mb-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
            <h2 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-3">
              Key Facts from This Era
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {chapter.keyFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-amber-500 font-bold">•</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            {chapter.content.map((block, idx) => {
              switch (block.type) {
                case "narrator":
                  return (
                    <blockquote
                      key={idx}
                      className="not-prose my-8 border-l-4 border-amber-400 bg-amber-50/50 py-4 px-6 italic text-gray-700 font-serif text-lg leading-relaxed"
                    >
                      {block.text}
                    </blockquote>
                  );
                case "heading":
                  return (
                    <h2
                      key={idx}
                      className="font-serif text-2xl font-bold text-gray-900 mt-12 mb-4"
                    >
                      {block.text}
                    </h2>
                  );
                case "callout":
                  return (
                    <div
                      key={idx}
                      className="not-prose my-8 p-6 bg-gray-50 border border-gray-200 rounded-xl"
                    >
                      <p className="text-gray-700 leading-relaxed">{block.text}</p>
                    </div>
                  );
                case "paragraph":
                default:
                  return (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {block.text}
                    </p>
                  );
              }
            })}
          </div>

          {/* Source Documents */}
          {chapter.documents.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-600" />
                Historical Documents
              </h3>
              <div className="grid gap-4">
                {chapter.documents.map((doc, idx) => (
                  <Link
                    key={idx}
                    href={`/history/documents/${doc.slug}`}
                    className="group block p-4 bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-200 rounded-xl transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                      {doc.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">{doc.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Chapter Navigation */}
      <section className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {prevChapter ? (
              <Link
                href={`/history/story/${prevChapter.slug}`}
                className="group flex-1 p-4 bg-white hover:bg-amber-50 border border-gray-200 hover:border-amber-200 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <ArrowLeft className="h-4 w-4" />
                  Previous Chapter
                </div>
                <p className="font-serif font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {prevChapter.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            <Link
              href="/history/story"
              className="flex items-center justify-center gap-2 px-6 py-4 text-gray-600 hover:text-amber-700 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">All Chapters</span>
            </Link>

            {nextChapter ? (
              <Link
                href={`/history/story/${nextChapter.slug}`}
                className="group flex-1 p-4 bg-white hover:bg-amber-50 border border-gray-200 hover:border-amber-200 rounded-xl transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-1">
                  Next Chapter
                  <ArrowRight className="h-4 w-4" />
                </div>
                <p className="font-serif font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {nextChapter.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </section>


      {/* CTA Footer */}
      <section className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            Ready to experience this remarkable house for yourself? 8 bedrooms, original
            fireplaces, and 170 years of stories—all steps from Rittenhouse Square.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="text-amber-700 hover:text-amber-800 text-sm font-medium"
            >
              Check Availability →
            </Link>
            <Link
              href="/stay"
              className="text-amber-700 hover:text-amber-800 text-sm font-medium"
            >
              View the Property →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
