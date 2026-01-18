import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History",
  description:
    "Explore 170 years of history at The Rittenhouse Residence — from its 1854 construction through the Drexel banking dynasty, suffrage activism, and Victorian grandeur in Philadelphia's Rittenhouse Square.",
  openGraph: {
    title: "History | The Rittenhouse Residence",
    description:
      "Discover the rich history of this Victorian mansion — Drexel family connections, original deeds, and 170 years of Philadelphia history.",
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
