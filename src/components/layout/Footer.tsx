import Link from "next/link";
import { Calendar, ExternalLink } from "lucide-react";

const footerNavigation = {
  property: [
    { name: "Stay", href: "/stay" },
    { name: "Floor Plans", href: "/stay/floor-plans" },
    { name: "Rates", href: "/rates" },
    { name: "House Rules", href: "/faq#rules" },
  ],
  history: [
    { name: "Our Story", href: "/history" },
    { name: "Timeline", href: "/history/timeline" },
    { name: "Documents", href: "/history/documents" },
    { name: "Provenance", href: "/history/provenance" },
  ],
  visitors: [
    { name: "Neighborhood", href: "/neighborhood" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Book Now", href: "/book" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Rental Agreement", href: "/rental-agreement" },
    { name: "Accessibility", href: "/accessibility" },
  ],
};

// Direct booking URL - skips property selection
const DIRECT_BOOKING_URL = "https://rittenhouseresidence.guestybookings.com/en/properties/69584f75d11b4200144404b8";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      {/* Booking CTA Section */}
      <div className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-white">
              Book the Rittenhouse Residence
            </h3>
            <p className="mt-2 text-gray-300">
              8 bedrooms · 6 bathrooms · Steps from Rittenhouse Square
            </p>

            {/* Primary: Direct booking */}
            <div className="mt-8">
              <a
                href={DIRECT_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-10 py-4 text-lg font-semibold text-white shadow-md hover:bg-amber-700 hover:shadow-lg transition-all"
              >
                <Calendar className="h-5 w-5" />
                Check Availability & Book Direct
                <ExternalLink className="h-4 w-4" />
              </a>
              <p className="mt-3 text-amber-400 text-sm">No booking fees when you reserve direct</p>
            </div>

            {/* Secondary: OTA options */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-4">Also available on:</p>
              <div className="flex flex-row gap-4 justify-center">
                <a
                  href="https://www.airbnb.com/rooms/6000930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Airbnb
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-gray-600">·</span>
                <a
                  href="https://www.vrbo.com/757481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  VRBO
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-gray-600">·</span>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-gray-900">
              Rittenhouse Residence
            </h2>
            <p className="text-sm text-gray-600 max-w-xs">
              A Philadelphia landmark since 1854. 8 bedrooms, original fireplaces, steps from Rittenhouse Square.
            </p>
            <div className="flex space-x-4">
              <p className="text-xs text-gray-500">
                Licensed Vacation Rental • Philadelphia, PA
              </p>
            </div>
          </div>

          {/* Navigation sections */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Property</h3>
                <ul role="list" className="mt-4 space-y-2">
                  {footerNavigation.property.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900">History</h3>
                <ul role="list" className="mt-4 space-y-2">
                  {footerNavigation.history.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Visitors</h3>
                <ul role="list" className="mt-4 space-y-2">
                  {footerNavigation.visitors.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
                <ul role="list" className="mt-4 space-y-2">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Rittenhouse Residence. All rights reserved.
            </p>
            <p className="mt-2 text-xs text-gray-500 md:mt-0">
              1800 Block of Pine Street, Philadelphia, PA 19103 • Est. 1854
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
