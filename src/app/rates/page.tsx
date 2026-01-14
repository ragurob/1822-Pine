import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Rates | Rittenhouse Residence",
  description:
    "Typical nightly rates and policies for the Rittenhouse Residence. Final pricing depends on dates and availability.",
};

export default function RatesPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium text-amber-400 mb-4">
              Transparent pricing
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Rittenhouse Residence Rates
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Rates vary by date. Use the booking calendar for exact pricing and availability.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Typical Nightly Range
            </h2>
            <p className="mt-2 text-gray-600">
              These are common starting points; holidays and peak weekends may be higher.
            </p>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <dt className="text-sm font-medium text-gray-500">Weeknights</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  From $1,600/night
                </dd>
                <p className="mt-2 text-sm text-gray-600">Mon–Thu (typical)</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <dt className="text-sm font-medium text-gray-500">Weekends</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  From $1,800/night
                </dd>
                <p className="mt-2 text-sm text-gray-600">Fri–Sun (typical)</p>
              </div>
            </dl>

            <div className="mt-8 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-amber-900">
              <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700" />
              <p className="text-sm">
                Final pricing, taxes, fees, and minimum stays are shown during booking.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white hover:bg-gray-800 transition-colors"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Check Availability
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Read FAQs & Policies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

