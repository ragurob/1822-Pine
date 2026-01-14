import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History | 1822 Pine Street Since 1854",
  description:
    "Explore 170 years of history at 1822 Pine Street - from its 1854 construction through the Drexel banking dynasty, suffrage activism, and Victorian grandeur in Philadelphia's Rittenhouse Square.",
  openGraph: {
    title: "History of Rittenhouse Residence | 1854 Philadelphia Mansion",
    description:
      "Discover the rich history of this Victorian mansion - Drexel family connections, original deeds, and 170 years of Philadelphia history.",
    images: ["/images/documents/deed_1854_p1_web.jpg"],
  },
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
