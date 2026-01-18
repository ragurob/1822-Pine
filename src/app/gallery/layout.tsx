import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Browse photos of The Rittenhouse Residence — 8 bedrooms, 6 bathrooms, grand parlors, roof deck, and historic details in this 1854 Philadelphia mansion.",
  openGraph: {
    title: "Photo Gallery | The Rittenhouse Residence",
    description:
      "Tour The Rittenhouse Residence through photos — Victorian elegance, original fireplaces, crystal chandeliers, and modern amenities.",
    images: ["/images/airbnb/airbnb_03.jpg"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
