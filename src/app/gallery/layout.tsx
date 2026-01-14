import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Rittenhouse Residence",
  description:
    "Browse photos of the Rittenhouse Residence - 8 bedrooms, 6 bathrooms, grand parlors, roof deck, and historic details in this 1854 Philadelphia mansion.",
  openGraph: {
    title: "Photo Gallery | Rittenhouse Residence",
    description:
      "Tour the Rittenhouse Residence through photos - Victorian elegance, original fireplaces, crystal chandeliers, and modern amenities.",
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
