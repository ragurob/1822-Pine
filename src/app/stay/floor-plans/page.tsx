import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Floor Plans",
  description:
    "Floor plans for The Rittenhouse Residence, organized by level across five floors.",
};

const plans = [
  { label: "First Floor", image: "/images/floor-plans/floor-1.jpg", pdf: "1822 1 Floor.pdf" },
  { label: "Second Floor", image: "/images/floor-plans/floor-2.jpg", pdf: "1822 2 Floor.pdf" },
  { label: "Third Floor", image: "/images/floor-plans/floor-3.jpg", pdf: "1822 3 Floor.pdf" },
  { label: "Fourth Floor", image: "/images/floor-plans/floor-4.jpg", pdf: "1822 4 Floor.pdf" },
  { label: "Roof Deck", image: "/images/floor-plans/roof-deck.jpg", pdf: "1822 Roof Deck.pdf" },
];

function rawDocUrl(filename: string) {
  return `/archive/raw_documents/${encodeURIComponent(filename)}`;
}

export default function FloorPlansPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Floor Plans
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            A room-by-room overview of the home, organized by level.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.label} className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                <div className="relative aspect-[3/4] bg-white">
                  <Image
                    src={plan.image}
                    alt={`${plan.label} floor plan`}
                    fill
                    className="object-contain p-3"
                  />
                </div>
                <div className="p-5 border-t border-gray-200">
                  <h2 className="font-semibold text-gray-900">{plan.label}</h2>
                  <a
                    href={rawDocUrl(plan.pdf)}
                    className="mt-2 inline-block text-sm font-semibold text-amber-700 hover:text-amber-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

