import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rental Agreement",
  description:
    "High-level rental agreement information for The Rittenhouse Residence.",
};

export default function RentalAgreementPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Rental Agreement
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Key terms are provided during booking; this page summarizes common expectations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 text-gray-700">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Summary
            </h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>No parties; quiet hours apply.</li>
              <li>No smoking anywhere on the property.</li>
              <li>Occupancy limits are enforced for guest safety and neighborhood respect.</li>
              <li>Guests are responsible for damage beyond normal wear and tear.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Questions
            </h2>
            <p className="mt-3">
              If you need a copy of the full agreement text before booking, please{" "}
              <Link className="text-amber-700 hover:text-amber-800" href="/contact">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

