import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms | Rittenhouse Residence",
  description:
    "Terms and important information for bookings and use of the Rittenhouse Residence website.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Terms
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Booking and payment terms vary by booking channel.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8 text-gray-700">
          <p>
            If you book through a third-party platform, your reservation is governed by that platform’s terms and policies.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <a
                className="text-amber-700 hover:text-amber-800"
                href="https://www.airbnb.com/rooms/6000930"
                target="_blank"
                rel="noopener noreferrer"
              >
                Airbnb Listing
              </a>
            </li>
            <li>
              <a
                className="text-amber-700 hover:text-amber-800"
                href="https://www.vrbo.com/757481"
                target="_blank"
                rel="noopener noreferrer"
              >
                VRBO Listing
              </a>
            </li>
          </ul>

          <p>
            For questions about booking or policies, please{" "}
            <Link className="text-amber-700 hover:text-amber-800" href="/contact">
              contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
