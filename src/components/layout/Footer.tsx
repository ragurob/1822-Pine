import Link from "next/link";

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
    { name: "Events & Filming", href: "/events" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Rental Agreement", href: "/rental-agreement" },
    { name: "Accessibility", href: "/accessibility" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-gray-900">
              Rittenhouse Residence
            </h2>
            <p className="text-sm text-gray-600 max-w-xs">
              A Philadelphia landmark since 1854. 8 bedrooms, 198 years of documented history, steps from Rittenhouse Square.
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
              1822 Pine Street, Philadelphia, PA 19103 • Est. 1854
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
