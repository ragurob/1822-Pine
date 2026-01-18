import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Explore 170 years of history at The Rittenhouse Residence, 1822 Pine Street — a historic Rittenhouse Square mansion. Victorian elegance, original fireplaces, and remarkable stories await.",
  keywords: [
    "Philadelphia historic home",
    "Rittenhouse Square rental",
    "1822 Pine Street",
    "Philadelphia Victorian mansion",
    "historic mansion rental",
    "Philadelphia group rental",
    "Rittenhouse-Fitler Historic District",
  ],
  openGraph: {
    title: "170 Years of Stories | Rittenhouse Residence",
    description:
      "Victorian elegance, original fireplaces, and 170 years of remarkable stories at Philadelphia's most storied address.",
    type: "website",
  },
};

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
