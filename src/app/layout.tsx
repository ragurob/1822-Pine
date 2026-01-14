import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VacationRentalSchema, LocalBusinessSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://rittenhouseresidence.com"),
  title: {
    default: "Rittenhouse Residence | 8-Bedroom Historic Mansion Rental Philadelphia",
    template: "%s",
  },
  description:
    "Philadelphia's premier historic mansion for group stays - 8 bedrooms, 6 bathrooms across five floors. Whole-home rental steps from Rittenhouse Square. Perfect for family reunions, milestone celebrations. From $1,600/night.",
  keywords: [
    "large group rental Philadelphia",
    "whole home rental Philadelphia",
    "Philadelphia mansion rental",
    "8 bedroom rental Philadelphia",
    "family reunion house Philadelphia",
    "Rittenhouse Square rental",
    "group vacation rental Philadelphia",
    "Philadelphia group stay",
    "historic mansion rental Philadelphia",
    "Center City large rental",
    "Victorian mansion Philadelphia",
  ],
  authors: [{ name: "Rittenhouse Residence" }],
  openGraph: {
    title: "Rittenhouse Residence | Historic Philadelphia Mansion Since 1854",
    description:
      "8 bedrooms, 6 bathrooms, original fireplaces and marble mantels. A whole-home rental for group stays steps from Rittenhouse Square.",
    url: "https://rittenhouseresidence.com",
    siteName: "Rittenhouse Residence",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/airbnb/airbnb_03.jpg",
        width: 1200,
        height: 630,
        alt: "Grand Parlor at Rittenhouse Residence - Historic 1854 Philadelphia Mansion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rittenhouse Residence | Historic Philadelphia Mansion",
    description:
      "8 bedrooms, original fireplaces, steps from Rittenhouse Square.",
    images: ["/images/airbnb/airbnb_03.jpg"],
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
    <html lang="en">
      <head>
        <VacationRentalSchema />
        <LocalBusinessSchema />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N5XCRVPL');`,
          }}
        />
        {/* Google Analytics 4 - beforeInteractive for Search Console verification */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YYXHNWZ4PK"
          strategy="beforeInteractive"
        />
        <Script
          id="ga4-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-YYXHNWZ4PK');`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N5XCRVPL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
