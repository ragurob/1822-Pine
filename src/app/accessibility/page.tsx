import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility | Rittenhouse Residence",
  description:
    "Accessibility information for the Rittenhouse Residence website and property.",
};

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Accessibility
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            We aim to make our website and stay information clear and accessible.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 text-gray-700">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Website Accessibility
            </h2>
            <p className="mt-3">
              If you encounter an accessibility issue on this website, please{" "}
              <Link className="text-amber-700 hover:text-amber-800" href="/contact">
                contact us
              </Link>{" "}
              and describe the problem and the page you were using.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Property Accessibility
            </h2>
            <p className="mt-3">
              The home is a historic multi-story townhouse with stairs between levels. Please
              contact us before booking if you have mobility needs so we can help determine fit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

