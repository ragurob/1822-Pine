export function VacationRentalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://rittenhouseresidence.com/#lodging",
    name: "Rittenhouse Residence",
    description:
      "Philadelphia's premier whole-home rental for groups. Historic 1854 mansion with 8 bedrooms, 6 bathrooms. Steps from Rittenhouse Square.",
    url: "https://rittenhouseresidence.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1822 Pine Street",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      postalCode: "19103",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.9468,
      longitude: -75.1715,
    },
    image: [
      "https://rittenhouseresidence.com/images/airbnb/airbnb_03.jpg",
      "https://rittenhouseresidence.com/images/airbnb/airbnb_04.jpg",
      "https://rittenhouseresidence.com/images/airbnb/airbnb_01.jpg",
    ],
    priceRange: "$$$$",
    numberOfRooms: 8,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
      { "@type": "LocationFeatureSpecification", name: "Washer/Dryer", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Roof Deck", value: true },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.89",
      reviewCount: "93",
      bestRating: "5",
      worstRating: "1",
    },
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many guests can the Rittenhouse Residence accommodate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Rittenhouse Residence offers 8 bedrooms and 6 bathrooms across 5 floors. Contact us to discuss your group's needs.",
        },
      },
      {
        "@type": "Question",
        name: "Where is the Rittenhouse Residence located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The property is located at 1822 Pine Street in Philadelphia, just 2 blocks from Rittenhouse Square in the heart of Center City.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum stay at Rittenhouse Residence?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We require a 2-night minimum stay for all reservations.",
        },
      },
      {
        "@type": "Question",
        name: "What is the nightly rate for the Rittenhouse Residence?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rates start at $1,600 per night for the entire 8-bedroom historic mansion.",
        },
      },
      {
        "@type": "Question",
        name: "Is the Rittenhouse Residence suitable for family reunions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! The property is ideal for family reunions with multiple gathering spaces, a large dining room, two full kitchens, and 8 bedrooms to accommodate the whole family under one roof.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: "Rittenhouse Residence - Historic Philadelphia Mansion",
    description:
      "Whole-home vacation rental for groups in Philadelphia. 8 bedrooms, 6 bathrooms across five floors. Historic 1854 mansion steps from Rittenhouse Square.",
    url: "https://rittenhouseresidence.com",
    image: "https://rittenhouseresidence.com/images/airbnb/airbnb_03.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1822 Pine Street",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      postalCode: "19103",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.9468,
      longitude: -75.1715,
    },
    numberOfBedrooms: 8,
    numberOfBathroomsTotal: 6,
    floorSize: {
      "@type": "QuantitativeValue",
      value: 7000,
      unitCode: "FTK",
    },
    yearBuilt: 1854,
    petsAllowed: false,
    tourBookingPage: "https://rittenhouseresidence.com/book",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
