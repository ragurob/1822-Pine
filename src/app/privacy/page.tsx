import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Rittenhouse Residence",
  description:
    "Privacy policy for the Rittenhouse Residence website and booking inquiries.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            We respect your privacy and protect your personal information.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 text-gray-700">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Information We Collect
            </h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>Contact information you submit through forms or email</li>
              <li>Booking details necessary to support your stay</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              How We Use Information
            </h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>To respond to inquiries and provide guest support</li>
              <li>To process bookings and coordinate check-in details</li>
              <li>To help keep the property and guests safe</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Third-Party Services
            </h2>
            <p className="mt-3">
              If you book through partner platforms, their privacy terms may apply.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>
                <a
                  className="text-amber-700 hover:text-amber-800"
                  href="https://www.airbnb.com/terms/privacy_policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Airbnb Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="text-amber-700 hover:text-amber-800"
                  href="https://www.vrbo.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VRBO Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Contact
            </h2>
            <p className="mt-3">
              For privacy questions, please{" "}
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

