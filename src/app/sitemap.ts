import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rittenhouseresidence.com";

  // Core pages with high priority
  const corePages = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/stay", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/book", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/gallery", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/rates", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/neighborhood", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  // History section - rich content for SEO
  const historyPages = [
    { url: "/history", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/history/story", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/history/timeline", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/history/documents", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/history/provenance", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  // Story chapters
  const storyChapters = [
    "prologue",
    "before-the-threshold",
    "the-roser-years",
    "the-quiet-after",
    "the-spencer-era",
    "between-mourning-and-modernity",
    "the-turning-point",
    "new-century-new-purpose",
    "the-baird-years",
    "the-long-decline",
    "fragments-and-silence",
    "awakening",
    "the-restoration",
    "epilogue",
  ].map((slug) => ({
    url: `/history/story/${slug}`,
    priority: 0.5,
    changeFrequency: "monthly" as const,
  }));

  // Legal/info pages
  const legalPages = [
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/accessibility", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/rental-agreement", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  // Property detail pages
  const propertyPages = [
    { url: "/stay/floor-plans", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const allPages = [
    ...corePages,
    ...historyPages,
    ...storyChapters,
    ...propertyPages,
    ...legalPages,
  ];

  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
