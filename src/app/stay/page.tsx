import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Bath,
  Users,
  Wifi,
  Car,
  UtensilsCrossed,
  Tv,
  Wind,
  Waves,
  Home,
  Sun,
  Crown,
  Star,
} from "lucide-react";
import { GuestyBookingWidget } from "@/components/GuestyBookingWidget";

export const metadata: Metadata = {
  title: "The Property",
  description:
    "Tour The Rittenhouse Residence — a historic 1854 mansion with 8 bedrooms across 5 floors. Features 3 VIP suites, master suite with sitting room, 2 full kitchens, and private roof deck. Steps from Rittenhouse Square, Philadelphia.",
  keywords: [
    "The Rittenhouse Residence",
    "Philadelphia mansion rental",
    "Rittenhouse Square vacation home",
    "large group accommodation Philadelphia",
    "historic home rental",
    "8 bedroom rental Philadelphia",
    "whole house rental Center City",
    "family reunion Philadelphia",
    "corporate retreat Philadelphia",
  ],
};

const floors = [
  {
    floor: "Ground Floor",
    floorNum: 1,
    name: "Grand Public Rooms",
    description: "Historic entertaining spaces and the primary kitchen",
    spaces: [
      {
        name: "Parlor",
        type: "living",
        description: "Formal receiving room with original fireplace and ornate millwork.",
      },
      {
        name: "Gallery",
        type: "living",
        description: "Central hall connecting the ground floor spaces.",
      },
      {
        name: "Dining Room",
        type: "dining",
        description: "Seats 16 guests for formal dinners beneath crystal chandeliers.",
      },
      {
        name: "Primary Kitchen",
        type: "kitchen",
        description: "Professional-grade appliances, generous counter space, and butler's pantry.",
      },
      {
        name: "Pantry",
        type: "kitchen",
        description: "Additional storage and prep area connected to the kitchen.",
      },
      {
        name: "Courtyard",
        type: "outdoor",
        description: "Private outdoor space accessible from the ground floor.",
      },
    ],
  },
  {
    floor: "Second Floor",
    floorNum: 2,
    name: "Master Suite & Library",
    description: "The principal living and sleeping floor with the finest accommodations",
    spaces: [
      {
        name: "Master Bedroom",
        type: "master",
        beds: "King bed",
        description: "The residence's premier bedroom with adjoining sitting room—ideal for the hosts or honored guests.",
      },
      {
        name: "Master Sitting Room",
        type: "living",
        description: "Private parlor adjoining the master bedroom for reading or quiet retreat.",
      },
      {
        name: "Library Bedroom (VIP 1)",
        type: "vip",
        beds: "Queen bed",
        sqft: "600+ sq ft",
        description: "Elegant VIP suite with 22 feet of frontage along Pine Street's historic row.",
      },
      {
        name: "Library",
        type: "living",
        description: "Formal library with floor-to-ceiling bookshelves and period furnishings.",
      },
    ],
  },
  {
    floor: "Third Floor",
    floorNum: 3,
    name: "Family Living & VIP Suite",
    description: "Communal gathering space with full kitchen plus private sleeping quarters",
    spaces: [
      {
        name: "Family Room",
        type: "living",
        description: "Spacious gathering area perfect for group movie nights or casual lounging.",
      },
      {
        name: "Second Kitchen",
        type: "kitchen",
        description: "Fully equipped secondary kitchen for larger groups or separate meal prep.",
      },
      {
        name: "Second Bedroom",
        type: "primary",
        beds: "Queen bed",
        description: "Primary bedroom adjacent to the family room.",
      },
      {
        name: "VIP Bedroom 2",
        type: "vip",
        beds: "Queen bed",
        sqft: "600+ sq ft",
        description: "Grand suite with 22 feet of Pine Street frontage and period details.",
      },
    ],
  },
  {
    floor: "Fourth Floor",
    floorNum: 4,
    name: "Family Bedrooms & VIP Suite",
    description: "Two connecting family bedrooms plus a spacious VIP suite",
    spaces: [
      {
        name: "Family Bedroom 1",
        type: "family",
        beds: "Queen bed",
        description: "Connecting room ideal for families traveling with children.",
      },
      {
        name: "Family Bedroom 2",
        type: "family",
        beds: "Queen bed",
        description: "Links directly to Family Bedroom 1 for flexible family configurations.",
      },
      {
        name: "Third Bedroom",
        type: "primary",
        beds: "Queen bed",
        description: "Comfortable primary bedroom with historic details.",
      },
      {
        name: "VIP Bedroom 3",
        type: "vip",
        beds: "King bed",
        sqft: "600+ sq ft",
        description: "Expansive suite with king bed and 22 feet of frontage along tree-lined Pine Street.",
      },
    ],
  },
  {
    floor: "Fifth Floor",
    floorNum: 5,
    name: "Roof Deck",
    description: "Private outdoor entertaining space with panoramic city views",
    spaces: [
      {
        name: "Private Roof Deck",
        type: "outdoor",
        description: "Furnished outdoor terrace perfect for morning coffee or evening gatherings under the Philadelphia skyline.",
      },
    ],
  },
];

const bedroomSummary = [
  {
    category: "VIP Bedrooms",
    count: 3,
    icon: Crown,
    description: "600+ sq ft each with 22ft Pine Street frontage",
    color: "amber",
  },
  {
    category: "Master Suite",
    count: 1,
    icon: Star,
    description: "King bed with adjoining private sitting room",
    color: "amber",
  },
  {
    category: "Primary Bedrooms",
    count: 2,
    icon: Bed,
    description: "Comfortable queen accommodations",
    color: "gray",
  },
  {
    category: "Family Bedrooms",
    count: 2,
    icon: Users,
    description: "Connecting rooms ideal for families",
    color: "gray",
  },
];

const amenities = [
  { icon: Wifi, name: "Gigabit WiFi", description: "High-speed fiber throughout all floors" },
  { icon: UtensilsCrossed, name: "Two Full Kitchens", description: "Professional appliances on ground and third floors" },
  { icon: Tv, name: "Smart TVs", description: "65\" screens in living areas" },
  { icon: Wind, name: "Central A/C", description: "Zoned climate control on every floor" },
  { icon: Car, name: "Street Parking", description: "Nearby garage recommendations provided" },
  { icon: Waves, name: "Washer/Dryer", description: "Full-size in-unit laundry" },
];

export default function StayPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/property/DSC00066.jpg"
            alt="Rittenhouse Residence grand parlor with original fireplace"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-400 mb-4">
              Whole-Home Rental
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Stay at the Rittenhouse Residence
            </h1>
            <p className="mt-2 text-2xl text-amber-300 font-medium">
              8 Bedrooms Across 5 Floors of Historic Luxury
            </p>
            <p className="mt-6 text-xl text-gray-300">
              An 1854 Philadelphia mansion restored for modern group travel.
              Three expansive VIP suites, a master bedroom with private sitting room,
              two full kitchens, and a private roof deck—all steps from Rittenhouse Square.
            </p>

            {/* Quick stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white">
                <Bed className="h-5 w-5 text-amber-400" />
                <span>8 Bedrooms</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Bath className="h-5 w-5 text-amber-400" />
                <span>6 Bathrooms</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Home className="h-5 w-5 text-amber-400" />
                <span>5 Floors</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Sun className="h-5 w-5 text-amber-400" />
                <span>Private Roof Deck</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Widget Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="font-serif text-2xl font-bold text-gray-900 text-center mb-6">
              Check Availability & Book
            </h2>
            <div className="min-h-[200px]">
              <GuestyBookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Bedroom Overview */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              8 Bedrooms, Thoughtfully Arranged
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our bedrooms are categorized by size and position. VIP suites offer 600+ square feet
              with 22 feet of frontage along tree-lined Pine Street. The master suite includes
              a private sitting room. Family bedrooms connect for flexible configurations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bedroomSummary.map((item) => (
              <div
                key={item.category}
                className={`p-6 rounded-xl ${
                  item.color === "amber" ? "bg-amber-50 border-2 border-amber-200" : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.color === "amber" ? "bg-amber-100" : "bg-gray-100"
                  }`}>
                    <item.icon className={`h-5 w-5 ${
                      item.color === "amber" ? "text-amber-700" : "text-gray-600"
                    }`} />
                  </div>
                  <span className={`text-2xl font-bold ${
                    item.color === "amber" ? "text-amber-700" : "text-gray-900"
                  }`}>
                    {item.count}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{item.category}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floor by Floor */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Floor by Floor
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore all five floors of the residence
            </p>
          </div>

          <div className="space-y-16">
            {floors.map((floor) => (
              <div key={floor.floor}>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">
                    {floor.floorNum}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gray-900">
                      {floor.floor}: {floor.name}
                    </h3>
                    <p className="text-gray-600">{floor.description}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {floor.spaces.map((space) => (
                    <div
                      key={space.name}
                      className={`p-5 rounded-xl transition-colors ${
                        space.type === "vip"
                          ? "bg-amber-50 border-2 border-amber-200"
                          : space.type === "master"
                          ? "bg-amber-50 border-2 border-amber-300"
                          : space.type === "family"
                          ? "bg-blue-50 border border-blue-200"
                          : space.type === "primary"
                          ? "bg-gray-50 border border-gray-200"
                          : "bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-gray-900">{space.name}</h4>
                        {space.type === "vip" && (
                          <span className="text-xs font-medium bg-amber-200 text-amber-800 px-2 py-1 rounded">
                            VIP Suite
                          </span>
                        )}
                        {space.type === "master" && (
                          <span className="text-xs font-medium bg-amber-300 text-amber-900 px-2 py-1 rounded">
                            Master
                          </span>
                        )}
                      </div>

                      {(space.beds || space.sqft) && (
                        <div className="mt-2 flex flex-wrap gap-3 text-sm">
                          {space.beds && (
                            <span className="flex items-center gap-1 text-gray-600">
                              <Bed className="h-4 w-4 text-gray-400" />
                              {space.beds}
                            </span>
                          )}
                          {space.sqft && (
                            <span className="text-amber-700 font-medium">
                              {space.sqft}
                            </span>
                          )}
                        </div>
                      )}

                      <p className="mt-2 text-sm text-gray-600">{space.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/stay/floor-plans"
              className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-800"
            >
              View Detailed Floor Plans
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Inside the Residence
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["DSC00068", "DSC00070", "DSC00072", "DSC00074", "DSC00076", "DSC00078"].map((filename) => (
              <div key={filename} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={`/images/property/${filename}.jpg`}
                  alt="Rittenhouse Residence interior showing historic details"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Modern Amenities, Historic Character
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need for a comfortable group stay
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity) => (
              <div key={amenity.name} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <amenity.icon className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Perfect For
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Family Reunions",
              "Wedding Parties",
              "Corporate Retreats",
              "Friends Getaways",
              "Multi-Generational Travel",
              "Philadelphia Weekends",
              "Holiday Gatherings",
              "Special Celebrations",
            ].map((use) => (
              <span
                key={use}
                className="px-4 py-2 bg-white rounded-full text-gray-700 border border-gray-200 text-sm"
              >
                {use}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
