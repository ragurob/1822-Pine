import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rittenhouse Residence | Historic 8BR Philadelphia Mansion | Since 1854",
    template: "%s | Rittenhouse Residence",
  },
  description:
    "Book the Rittenhouse Residence - a verified historic mansion steps from Rittenhouse Square. 8 bedrooms, documented Drexel connection, suffrage history. Direct booking available.",
  keywords: [
    "Philadelphia vacation rental",
    "Rittenhouse Square rental",
    "historic mansion Philadelphia",
    "8 bedroom rental Philadelphia",
    "luxury vacation rental",
    "Philadelphia wedding venue",
    "corporate retreat Philadelphia",
  ],
  authors: [{ name: "Rittenhouse Residence" }],
  openGraph: {
    title: "Rittenhouse Residence | Historic Philadelphia Mansion Since 1854",
    description:
      "8 bedrooms, 198 years of history, steps from Rittenhouse Square. The most documented historic home in Philadelphia.",
    url: "https://rittenhouseresidence.com",
    siteName: "Rittenhouse Residence",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rittenhouse Residence | Historic Philadelphia Mansion",
    description:
      "8 bedrooms, 198 years of history, steps from Rittenhouse Square.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
