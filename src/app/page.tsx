import Link from "next/link";
import { ArrowRight, Calendar, Users, MapPin, History, Award, Shield } from "lucide-react";

const features = [
  {
    name: "8 Bedrooms, 5 Bathrooms",
    description: "Sleeps 16-18 guests comfortably across 5 floors of historic elegance.",
    icon: Users,
  },
  {
    name: "Steps from Rittenhouse Square",
    description: "Philadelphia's most prestigious address, walkable to restaurants and attractions.",
    icon: MapPin,
  },
  {
    name: "198 Years of History",
    description: "65 verified historical documents, Drexel dynasty connection, suffrage activism.",
    icon: History,
  },
];

const stats = [
  { label: "Year Built", value: "1854" },
  { label: "Primary Documents", value: "65" },
  { label: "Bedrooms", value: "8" },
  { label: "Guest Capacity", value: "16-18" },
];

const trustSignals = [
  { icon: Shield, text: "Licensed & Insured" },
  { icon: Award, text: "Historic District" },
  { icon: History, text: "Drexel Connection" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background placeholder - replace with actual hero image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-amber-400 mb-4">
              Est. 1854 • Rittenhouse Square
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              A Philadelphia Landmark
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-xl">
              8 bedrooms of historic luxury, documented connections to the Drexel banking dynasty,
              and 198 years of Philadelphia history—yours for your next gathering.
            </p>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap gap-4">
              {trustSignals.map((signal) => (
                <div key={signal.text} className="flex items-center gap-2 text-sm text-gray-300">
                  <signal.icon className="h-4 w-4 text-amber-400" />
                  <span>{signal.text}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Check Availability
              </Link>
              <Link
                href="/history"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Explore Our History
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Rittenhouse Residence?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              More than a vacation rental—a living piece of Philadelphia history
              with the space and amenities for modern gatherings.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative rounded-2xl border border-gray-200 p-8 hover:border-gray-300 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Teaser Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-amber-600 mb-4">
                The Most Documented Home in Philadelphia
              </p>
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                198 Years of Stories
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                From the Roset family&apos;s connection to Anthony J. Drexel—founder of Drexel University—to
                the Davis family&apos;s suffrage activism in these very parlors, every room holds verified history.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="font-serif font-bold text-amber-700">1850</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">The Drexel Connection</h4>
                    <p className="text-sm text-gray-600">
                      Ellen Roset, daughter of the first owners, married Anthony J. Drexel—linking this house to the banking dynasty.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="font-serif font-bold text-amber-700">1915</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Votes in the Parlor</h4>
                    <p className="text-sm text-gray-600">
                      Martha Davis sold Equal Franchise Society tickets from 1822 Pine Street—suffrage activism documented at this address.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/history"
                className="mt-8 inline-flex items-center text-amber-700 font-semibold hover:text-amber-800"
              >
                Explore Full History
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              {/* Placeholder for historical document collage */}
              <div className="aspect-[4/3] rounded-2xl bg-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <History className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="mt-4 text-gray-500">65 Historical Documents</p>
                  <p className="text-sm text-gray-400">Deeds, newspapers, floor plans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gray-900 px-8 py-16 sm:px-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Ready to Make History Your Own?
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              From $1,600/night • 2-night minimum • Perfect for family reunions,
              corporate retreats, wedding parties, and film productions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Check Availability
              </Link>
              <Link
                href="/rates"
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                View Rates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Questions? We&apos;re here to help.
              </h3>
              <p className="mt-1 text-gray-600">
                Planning a special event or have specific needs? Let&apos;s talk.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
