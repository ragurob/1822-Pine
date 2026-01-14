import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Users,
  MapPin,
  Bed,
  Bath,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Full Screen Dramatic Image */}
      <section className="relative h-[85vh] min-h-[600px]">
        <Image
          src="/images/airbnb/airbnb_03.jpg"
          alt="The Grand Parlor at Rittenhouse Residence - Historic 1854 Philadelphia Mansion"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-amber-300 font-medium tracking-wide mb-3">
              Est. 1854 · Rittenhouse Square
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight">
              <span className="text-white/70 font-normal">The</span>{" "}
              <span className="text-amber-200">Rittenhouse Residence</span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-white/90 font-medium">
              Philadelphia&apos;s Premier Whole-Home Rental for Large Groups
            </p>
            <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
              Nearly 7,000 square feet of Victorian grandeur—a historic mansion
              designed for groups traveling together. Two blocks from
              Rittenhouse Square.
            </p>

            {/* Quick Stats Row */}
            <div className="mt-8 flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                <span>8 Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5" />
                <span>6 Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Five Floors</span>
              </div>
              {/* Review data sourced from Airbnb listing (Jan 2025) - update periodically */}
              <a
                href="https://www.airbnb.com/rooms/6000930"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span>4.89 · 93 Reviews</span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-gray-900 hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Check Availability
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/40 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                View Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Essence - Brief Introduction */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-700 font-medium tracking-widest uppercase text-sm mb-6">
            Where History Meets Hospitality
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            One of Philadelphia&apos;s finest surviving Victorian mansions,
            meticulously preserved and thoughtfully modernized.
          </h2>
          <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Built in 1854, this grand townhouse has hosted Drexel banking heirs,
            witnessed suffrage activism in its parlors, and now welcomes guests
            seeking an extraordinary Philadelphia experience.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/history"
              className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-800 text-lg"
            >
              Discover Our Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <span className="hidden sm:block text-gray-300">|</span>
            <Link
              href="/stay"
              className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-800 text-lg"
            >
              Explore the Property
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Spaces - Elegant Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-amber-700 font-medium tracking-widest uppercase text-sm mb-4">
              Spaces
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
              Grand Rooms for Gathering Together
            </h2>
          </div>

          {/* Asymmetric Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Grand Parlor - Large */}
            <div className="group relative aspect-[4/3] md:aspect-auto md:row-span-2 rounded-2xl overflow-hidden">
              <Image
                src="/images/airbnb/airbnb_04.jpg"
                alt="Grand Parlor with Pool Table and Crystal Chandelier"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                  The Grand Parlor
                </h3>
                <p className="mt-2 text-white/80">
                  Original fireplace, crystal chandelier, pool table
                </p>
              </div>
            </div>

            {/* Library Lounge */}
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/airbnb/airbnb_05.jpg"
                alt="Library Lounge with Wet Bar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-white">
                  Library Lounge
                </h3>
                <p className="mt-1 text-white/80 text-sm">
                  Wet bar, 70&quot; 4K TV, period furnishings
                </p>
              </div>
            </div>

            {/* Roof Deck */}
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/airbnb/airbnb_02.jpg"
                alt="Roof Deck with Panoramic Philadelphia Skyline Views"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-white">
                  Roof Deck
                </h3>
                <p className="mt-1 text-white/80 text-sm">
                  Panoramic city skyline views
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-lg border-2 border-gray-900 px-8 py-4 text-base font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              View Complete Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bedroom Showcase */}
      <section className="py-20 md:py-28 bg-stone-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-700 font-medium tracking-widest uppercase text-sm mb-4">
                Accommodations
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                Eight Bedrooms Across Five Private Suites
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                From the master suite with its four-poster bed and private bath to
                cozy third-floor retreats, each room has been thoughtfully appointed
                to honor the home&apos;s heritage while ensuring modern comfort.
              </p>
              <ul className="mt-8 space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">2</span>
                  <span>Six queen beds, two king beds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">6</span>
                  <span>Six full bathrooms with period fixtures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">5</span>
                  <span>Five floors of private living space</span>
                </li>
              </ul>
              <Link
                href="/stay"
                className="mt-8 inline-flex items-center text-amber-700 font-semibold hover:text-amber-800 text-lg"
              >
                View All Bedrooms
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src="/images/property/DSC00082.jpg"
                  alt="Master Bedroom with Four-Poster Bed"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mt-8">
                <Image
                  src="/images/airbnb/airbnb_08.jpg"
                  alt="Second Floor Guest Bedroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/property/DSC00088.jpg"
                  alt="Historic Interior Details"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-amber-700 font-medium tracking-widest uppercase text-sm mb-4">
                Location
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                <MapPin className="inline h-8 w-8 mr-2 text-amber-600" />
                Rittenhouse Square
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                &ldquo;New York has the Upper East Side... And in Philadelphia,
                we have Rittenhouse Square.&rdquo;
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Walk to world-class restaurants, museums along the Ben Franklin Parkway,
                and Philadelphia&apos;s best shopping. Our tree-lined block offers the quiet
                of a residential neighborhood with the energy of Center City at your doorstep.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-lg">
                  <p className="font-semibold text-gray-900">2 Blocks</p>
                  <p className="text-sm text-gray-500">to Rittenhouse Square</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-lg">
                  <p className="font-semibold text-gray-900">5 Minutes</p>
                  <p className="text-sm text-gray-500">to Subway</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-lg">
                  <p className="font-semibold text-gray-900">Walking Distance</p>
                  <p className="text-sm text-gray-500">to Top Restaurants</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-lg">
                  <p className="font-semibold text-gray-900">10 Minutes</p>
                  <p className="text-sm text-gray-500">to Museums</p>
                </div>
              </div>
              <Link
                href="/neighborhood"
                className="mt-8 inline-flex items-center text-amber-700 font-semibold hover:text-amber-800 text-lg"
              >
                Explore the Neighborhood
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-28 bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <blockquote className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed">
            &ldquo;This house is absolutely stunning. The photos don&apos;t do it justice.
            We had our family reunion here and everyone was in awe of the beautiful
            spaces, the history, and the perfect location.&rdquo;
          </blockquote>
          <p className="mt-8 text-amber-300 font-medium">
            — Recent Guest Review
          </p>
          <p className="mt-2 text-gray-400">
            4.89 average from 93 reviews
          </p>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-700 font-medium tracking-widest uppercase text-sm mb-4">
              Ideal For
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
              Create Your Own Story Here
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                Family Reunions
              </h3>
              <p className="text-gray-600">
                Eight bedrooms, multiple gathering spaces, and a dining room that
                seats the whole family. Create memories across generations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                Milestone Celebrations
              </h3>
              <p className="text-gray-600">
                Birthdays, anniversaries, graduations—celebrate life&apos;s moments
                in a setting as special as the occasion.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                Friends&apos; Getaways
              </h3>
              <p className="text-gray-600">
                Bachelor and bachelorette weekends, girls&apos; trips, golf buddies—
                everyone stays together in one unforgettable home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 md:py-32">
        <Image
          src="/images/airbnb/airbnb_04.jpg"
          alt="Grand Parlor at Rittenhouse Residence"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Your Story at the Rittenhouse Residence Starts Here
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            8 bedrooms · 6 bathrooms · From $1,600/night
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-lg bg-white px-10 py-5 text-lg font-semibold text-gray-900 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Check Availability
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-10 py-5 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
