import type { Metadata } from "next";
import Link from "next/link";

// FAQ Schema matching on-page content
function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I check availability?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the booking calendar on /book for real-time availability and pricing.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum stay?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typically 2 nights. Certain peak periods may require a longer minimum stay.",
        },
      },
      {
        "@type": "Question",
        name: "What time is check-in and check-out?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Check-in is 4:00 PM and check-out is 10:00 AM (when available, early/late options may be offered).",
        },
      },
      {
        "@type": "Question",
        name: "What amenities are included?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "High-speed WiFi, two full kitchens, linens/towels, washer/dryer, and climate control.",
        },
      },
      {
        "@type": "Question",
        name: "Is parking available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Street parking is available nearby; garages are also within walking distance.",
        },
      },
      {
        "@type": "Question",
        name: "Is smoking allowed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No—smoking and vaping are not permitted anywhere on the property.",
        },
      },
      {
        "@type": "Question",
        name: "Are parties allowed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This is a residential, historic property—quiet hours apply and the home is not suitable for parties.",
        },
      },
      {
        "@type": "Question",
        name: "What is the cancellation policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cancellations require 60 days notice. A 50% deposit is due at reservation, with the balance due 60 days before arrival.",
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

export const metadata: Metadata = {
  title: "FAQ | Rittenhouse Residence",
  description:
    "Frequently asked questions about booking, check-in, amenities, parking, house rules, and cancellation policies for the Rittenhouse Residence.",
};

export default function FaqPage() {
  return (
    <>
      <FAQSchema />
      <div className="flex flex-col">
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium text-amber-400 mb-4">
              Everything you need to know
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Rittenhouse Residence FAQ
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Booking, policies, and practical details for a smooth stay.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Quick Links
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              <li>
                <a className="text-amber-700 hover:text-amber-800" href="#booking">
                  Booking
                </a>
              </li>
              <li>
                <a className="text-amber-700 hover:text-amber-800" href="#checkin">
                  Check-in & Check-out
                </a>
              </li>
              <li>
                <a className="text-amber-700 hover:text-amber-800" href="#amenities">
                  Amenities
                </a>
              </li>
              <li>
                <a className="text-amber-700 hover:text-amber-800" href="#parking">
                  Parking
                </a>
              </li>
              <li>
                <a className="text-amber-700 hover:text-amber-800" href="#rules">
                  House Rules
                </a>
              </li>
              <li>
                <a className="text-amber-700 hover:text-amber-800" href="#cancellation">
                  Cancellation
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-12 space-y-12">
            <section id="booking">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Booking
              </h2>
              <div className="mt-4 space-y-6 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    How do I check availability?
                  </h3>
                  <p className="mt-2">
                    Use the booking calendar on{" "}
                    <Link className="text-amber-700 hover:text-amber-800" href="/book">
                      /book
                    </Link>{" "}
                    for real-time availability and pricing.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    What is the minimum stay?
                  </h3>
                  <p className="mt-2">
                    Typically 2 nights. Certain peak periods may require a longer minimum stay.
                  </p>
                </div>
              </div>
            </section>

            <section id="checkin">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Check-in & Check-out
              </h2>
              <div className="mt-4 space-y-6 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    What time is check-in and check-out?
                  </h3>
                  <p className="mt-2">
                    Check-in is 4:00 PM and check-out is 10:00 AM (when available, early/late options may be offered).
                  </p>
                </div>
              </div>
            </section>

            <section id="amenities">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Amenities
              </h2>
              <div className="mt-4 space-y-6 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    What’s included?
                  </h3>
                  <p className="mt-2">
                    High-speed WiFi, two full kitchens, linens/towels, washer/dryer, and climate control.
                  </p>
                </div>
              </div>
            </section>

            <section id="parking">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Parking
              </h2>
              <div className="mt-4 space-y-6 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Is parking available?
                  </h3>
                  <p className="mt-2">
                    Street parking is available nearby; garages are also within walking distance. See our{" "}
                    <Link className="text-amber-700 hover:text-amber-800" href="/neighborhood#getting-here-parking">
                      parking and transit guide
                    </Link>{" "}
                    for detailed recommendations.
                  </p>
                </div>
              </div>
            </section>

            <section id="rules">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                House Rules
              </h2>
              <div className="mt-4 space-y-6 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Is smoking allowed?
                  </h3>
                  <p className="mt-2">
                    No—smoking and vaping are not permitted anywhere on the property.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Are parties allowed?
                  </h3>
                  <p className="mt-2">
                    No. This is a residential, historic property—quiet hours apply and the home is not suitable for parties.
                  </p>
                </div>
              </div>
            </section>

            <section id="cancellation">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Cancellation
              </h2>
              <div className="mt-4 space-y-6 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    What is the cancellation policy?
                  </h3>
                  <p className="mt-2">
                    Cancellations require 60 days notice. A 50% deposit is due at reservation, with the balance due 60 days before arrival.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-16 rounded-2xl bg-gray-900 p-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-white">
              Still have questions?
            </h3>
            <p className="mt-3 text-gray-300">
              Send a note and we’ll reply as soon as we can.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

