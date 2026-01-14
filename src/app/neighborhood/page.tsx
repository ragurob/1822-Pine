import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Utensils,
  Wine,
  Coffee,
  ShoppingBag,
  TreePine,
  Building2,
  Car,
  Train,
  Clock,
  Phone,
  Star,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Neighborhood Guide | Rittenhouse Square, Philadelphia",
  description:
    "Your complete guide to Rittenhouse Square - Philadelphia's most prestigious neighborhood. Restaurants, bars, coffee shops, parking, transit, museums, and local tips.",
  openGraph: {
    title: "Rittenhouse Square Neighborhood Guide",
    description:
      "Explore Philadelphia's most prestigious neighborhood - top restaurants, bars, coffee shops, and local tips steps from the Rittenhouse Residence.",
    images: ["/images/venues/parc.jpg"],
  },
};

const restaurants = {
  fineDining: [
    {
      name: "Parc",
      cuisine: "French Bistro",
      description: "Iconic sidewalk cafe overlooking the Square. Classic French with perfect people-watching.",
      price: "$$$",
      distance: "1 min walk",
      address: "227 S 18th St",
      phone: "(215) 545-2262",
      website: "https://parc-restaurant.com",
      image: "/images/venues/parc.jpg",
    },
    {
      name: "Vernick Food & Drink",
      cuisine: "New American",
      description: "James Beard Award-winning chef Greg Vernick. Reservations essential.",
      price: "$$$$",
      distance: "3 min walk",
      address: "2031 Walnut St",
      phone: "(267) 639-6644",
      website: "https://www.vernickphilly.com",
      image: "/images/venues/vernick.jpg",
    },
    {
      name: "Lacroix",
      cuisine: "French Contemporary",
      description: "Refined dining at The Rittenhouse hotel. Tasting menus and exceptional wine list.",
      price: "$$$$",
      distance: "2 min walk",
      address: "210 W Rittenhouse Sq",
      phone: "(215) 790-2533",
      website: "https://www.lacroixrestaurant.com",
      image: "/images/venues/lacroix.jpg",
    },
    {
      name: "Friday Saturday Sunday",
      cuisine: "New American",
      description: "Michelin-starred. James Beard Outstanding Restaurant 2023. Eight-course tasting menu.",
      price: "$$$$",
      distance: "5 min walk",
      address: "261 S 21st St",
      phone: "(215) 546-4232",
      website: "https://www.fridaysaturdaysunday.com",
      image: "/images/venues/friday-saturday-sunday.jpg",
    },
  ],
  casual: [
    {
      name: "Dizengoff",
      cuisine: "Israeli/Hummus",
      description: "Famous hummus bowls from Michael Solomonov. Counter service, big flavors.",
      price: "$",
      distance: "4 min walk",
      address: "1625 Sansom St",
      phone: "(215) 867-8181",
      website: "https://www.dizengoffphilly.com",
      image: "/images/venues/dizengoff.jpg",
    },
    {
      name: "JJ Thai Cuisine",
      cuisine: "Thai (BYOB)",
      description: "Reliably excellent Thai. BYOB makes it perfect for groups.",
      price: "$$",
      distance: "6 min walk",
      address: "2028 Chestnut St",
      phone: "(215) 568-7058",
      website: "https://www.jjthaicuisine.com",
      image: null,
    },
    {
      name: "Good Dog Bar",
      cuisine: "American Gastropub",
      description: "Famous Roquefort-stuffed burger. Great beer selection on 3 floors.",
      price: "$$",
      distance: "5 min walk",
      address: "224 S 15th St",
      phone: "(215) 985-9600",
      website: "https://gooddogbar.com",
      image: null,
    },
    {
      name: "Huda",
      cuisine: "Gourmet Sandwiches",
      description: "Chef-driven sandwiches on house-made milk buns. From a Zahav alum.",
      price: "$",
      distance: "4 min walk",
      address: "32 S 18th St",
      phone: "(445) 544-8025",
      website: "https://hudaphl.com",
      image: null,
    },
  ],
  italian: [
    {
      name: "Borromini",
      cuisine: "Italian",
      description: "100-layer lasagna and Aperol spritzes on tap. Stunning 15,000 sq ft interior.",
      price: "$$$",
      distance: "3 min walk",
      address: "1805 Walnut St",
      phone: "(215) 596-1000",
      website: "https://borrominiristorante.com",
      image: "/images/venues/borromini.jpg",
    },
    {
      name: "Via Locusta",
      cuisine: "Italian",
      description: "Jeff Michaud's handmade pasta with locally-sourced ingredients.",
      price: "$$$",
      distance: "4 min walk",
      address: "1723 Locust St",
      phone: "(215) 642-0020",
      website: "https://www.vialocusta.com",
      image: "/images/venues/via-locusta.jpg",
    },
  ],
  cheesesteaks: [
    {
      name: "Dalessandro's Steaks",
      cuisine: "Philly Cheesesteaks",
      description: "Cash-only institution since 1960. Many locals call it the best cheesesteak in the city. Worth the drive to Roxborough.",
      price: "$",
      distance: "20 min drive",
      address: "600 Wendover St",
      phone: "(215) 482-5407",
      website: "https://dalessandros.com",
      image: "/images/venues/dalessandros.jpg",
    },
    {
      name: "McNally's Tavern",
      cuisine: "The Schmitter",
      description: "Home of the legendary Schmitter—beef, cheese, onions, tomato, grilled salami, and secret sauce on a Kaiser roll. A Chestnut Hill landmark since 1921.",
      price: "$",
      distance: "25 min drive",
      address: "8634 Germantown Ave",
      phone: "(215) 247-9736",
      website: "https://www.mcnallys.com",
      image: null,
    },
  ],
};

const bars = [
  {
    name: "SkyHigh",
    type: "Rooftop Bar & Lounge",
    description: "Philadelphia's highest bar on the 60th floor of the Four Seasons. Panoramic views, craft cocktails, live music.",
    vibe: "Glamorous, special occasion",
    address: "1 N 19th St, Fl 60",
    phone: "(215) 419-5000",
    website: "https://www.skyhighphiladelphia.com",
    image: null,
  },
  {
    name: "The Library Bar",
    type: "Hotel Lounge",
    description: "At The Rittenhouse Hotel. Hand-crafted cocktails, rare spirits, elegant setting overlooking the Square.",
    vibe: "Upscale, quiet",
    address: "210 W Rittenhouse Sq",
    phone: "(215) 790-2533",
    website: "https://www.rittenhousehotel.com/dining/librarybar",
    image: "/images/venues/library-bar.jpg",
  },
  {
    name: "Monk's Cafe",
    type: "Belgian Beer Bar",
    description: "Institution since 1997. 200+ Belgian beers, excellent mussels and burgers.",
    vibe: "Casual, locals' favorite",
    address: "264 S 16th St",
    phone: "(215) 545-7005",
    website: "https://www.monkscafe.com",
    image: "/images/venues/monks-cafe.jpg",
  },
  {
    name: "The Ranstead Room",
    type: "Speakeasy Cocktails",
    description: "Hidden entrance behind El Rey, craft cocktails. Look for the double R door.",
    vibe: "Intimate, date night",
    address: "2013 Ranstead St",
    phone: "(215) 563-3330",
    website: "https://ransteadroom.com",
    image: "/images/venues/ranstead-room.jpg",
  },
  {
    name: "Tria Rittenhouse",
    type: "Wine Bar",
    description: "Curated wine, cheese, and beer. Perfect for a pre-dinner glass.",
    vibe: "Cozy, sophisticated",
    address: "123 S 18th St",
    phone: "(215) 972-8742",
    website: "https://www.triaphilly.com",
    image: "/images/venues/tria.jpg",
  },
  {
    name: "Good Dog Bar",
    type: "Gastropub",
    description: "Three floors of fun. Rooftop in summer, cozy basement bar.",
    vibe: "Lively, all ages",
    address: "224 S 15th St",
    phone: "(215) 985-9600",
    website: "https://gooddogbar.com",
    image: null,
  },
];

const coffeeShops = [
  {
    name: "Vernick Coffee Bar",
    specialty: "Specialty Coffee & Breakfast",
    hours: "Mon-Fri 7:30am-4pm",
    notes: "From James Beard winner Greg Vernick. Try the grain bowls.",
    address: "1800 Arch St, Fl 2",
    phone: "(215) 419-5052",
    website: "https://www.vernickcoffeebar.com",
    image: null,
  },
  {
    name: "The Bread Room",
    specialty: "Bakery & Pastries",
    hours: "Mon-Fri 7am-4pm, Sat-Sun 8am-3pm",
    notes: "Ellen Yin's bakery. Fresh pastries daily, exceptional croissants.",
    address: "834 Chestnut St",
    phone: "(215) 419-5820",
    website: "https://thebreadroomphl.com",
    image: null,
  },
  {
    name: "P.S. & Co.",
    specialty: "Vegan Cafe",
    hours: "Mon-Fri 7am-7pm, Sat-Sun 9am-5pm",
    notes: "100% organic, plant-based, and gluten-free. Great for health-conscious guests.",
    address: "1706 Locust St",
    phone: "(215) 985-1706",
    website: "https://psandco.com",
    image: null,
  },
  {
    name: "La Colombe",
    specialty: "Third Wave Coffee",
    hours: "Daily 6am-7pm",
    notes: "Philadelphia-born roaster. Draft lattes are a local favorite.",
    address: "130 S 19th St",
    phone: "(215) 563-0860",
    website: "https://www.lacolombe.com",
    image: "/images/venues/la-colombe.jpg",
  },
];

const groceryStores = [
  {
    name: "Di Bruno Bros",
    type: "Gourmet Market",
    distance: "4 min walk",
    description: "Legendary Italian market. Cheese, charcuterie, prepared foods, wine. Everything you need for an in-house dinner party.",
    address: "1730 Chestnut St",
    phone: "(215) 665-9220",
    website: "https://dibruno.com",
  },
  {
    name: "Rittenhouse Market",
    type: "Neighborhood Grocery",
    distance: "2 min walk",
    description: "Open 6:30am-10pm daily. Basics, snacks, beer, wine. 70+ years serving the neighborhood.",
    address: "1733 Spruce St",
    phone: "(215) 985-5930",
    website: null,
  },
  {
    name: "Trader Joe's",
    type: "Grocery Chain",
    distance: "8 min walk",
    description: "Budget-friendly specialty items, wine, and prepared foods.",
    address: "2121 Market St",
    phone: "(215) 569-9282",
    website: "https://www.traderjoes.com",
  },
  {
    name: "Whole Foods Market",
    type: "Natural Foods",
    distance: "12 min walk",
    description: "Full-service grocery with prepared foods bar.",
    address: "2101 Pennsylvania Ave",
    phone: "(215) 557-0015",
    website: "https://www.wholefoodsmarket.com",
  },
];

const museums = [
  {
    name: "Philadelphia Museum of Art",
    type: "Art Museum",
    distance: "15 min walk / 5 min Uber",
    description: "World-class collection spanning 2,000 years. The famous 'Rocky Steps' are here.",
    highlight: "Van Gogh, Impressionists, Arms & Armor",
    address: "2600 Benjamin Franklin Pkwy",
    phone: "(215) 763-8100",
    website: "https://philamuseum.org",
    image: "/images/neighborhood/philadelphia-museum-of-art.jpg",
  },
  {
    name: "Barnes Foundation",
    type: "Art Collection",
    distance: "18 min walk / 6 min Uber",
    description: "Extraordinary private collection. Renoir, Cezanne, Matisse in intimate galleries.",
    highlight: "Largest Renoir collection in the world",
    address: "2025 Benjamin Franklin Pkwy",
    phone: "(215) 278-7000",
    website: "https://www.barnesfoundation.org",
    image: "/images/venues/barnes-foundation.jpg",
  },
  {
    name: "Mütter Museum",
    type: "Medical History",
    distance: "8 min walk",
    description: "Fascinating (and slightly macabre) medical artifacts and anatomical specimens.",
    highlight: "Einstein's brain, Soap Lady",
    address: "19 S 22nd St",
    phone: "(215) 560-8564",
    website: "https://muttermuseum.org",
    image: "/images/venues/mutter-museum.jpg",
  },
  {
    name: "Rosenbach Museum",
    type: "Rare Books & Manuscripts",
    distance: "3 min walk",
    description: "Intimate museum in a historic townhouse. Rare books and literary artifacts.",
    highlight: "Bram Stoker's Dracula notes",
    address: "2008-2010 Delancey Pl",
    phone: "(215) 732-1600",
    website: "https://rosenbach.org",
    image: "/images/venues/rosenbach.jpg",
  },
  {
    name: "Academy of Music",
    type: "Performing Arts",
    distance: "6 min walk",
    description: "America's oldest opera house still in use. Home to Philadelphia Orchestra.",
    highlight: "Stunning 19th-century interior",
    address: "240 S Broad St",
    phone: "(215) 893-1999",
    website: "https://www.academyofmusic.org",
    image: null,
  },
];

const parks = [
  {
    name: "Rittenhouse Square",
    distance: "1 min walk",
    description: "The crown jewel. One of William Penn's original five squares. Perfect for morning coffee, afternoon reading, or evening strolls.",
    activities: ["People watching", "Picnics", "Dog spotting", "Seasonal festivals"],
  },
  {
    name: "Schuylkill River Trail",
    distance: "10 min walk",
    description: "Miles of paved trail along the river. Running, biking, or a scenic walk to the Art Museum.",
    activities: ["Running", "Cycling", "Kayaking", "Boathouse Row views"],
  },
  {
    name: "Washington Square",
    distance: "12 min walk",
    description: "Another of Penn's squares. Quieter, historic, with the Tomb of the Unknown Soldier.",
    activities: ["History", "Reading", "Squirrel watching"],
  },
];

export default function NeighborhoodPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/property/DSC00112.jpg"
            alt="Rittenhouse Square neighborhood"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-400 mb-4">
              Your Local Guide
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Rittenhouse Square Neighborhood
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Philadelphia's most prestigious neighborhood—and home to the Rittenhouse Residence.
              World-class dining, boutique shopping, historic charm, and urban convenience—all
              within walking distance of your door.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <Utensils className="h-6 w-6 text-amber-400 mx-auto" />
              <p className="mt-2 font-serif text-2xl font-bold text-white">100+</p>
              <p className="text-sm text-gray-300">Restaurants</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <ShoppingBag className="h-6 w-6 text-amber-400 mx-auto" />
              <p className="mt-2 font-serif text-2xl font-bold text-white">50+</p>
              <p className="text-sm text-gray-300">Boutiques</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <Building2 className="h-6 w-6 text-amber-400 mx-auto" />
              <p className="mt-2 font-serif text-2xl font-bold text-white">10+</p>
              <p className="text-sm text-gray-300">Museums</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <MapPin className="h-6 w-6 text-amber-400 mx-auto" />
              <p className="mt-2 font-serif text-2xl font-bold text-white">98</p>
              <p className="text-sm text-gray-300">Walk Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Utensils className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-900">Dining</h2>
              <p className="text-gray-600">From James Beard winners to casual favorites</p>
            </div>
          </div>

          {/* Fine Dining */}
          <div className="mb-12">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Fine Dining
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {restaurants.fineDining.map((restaurant) => (
                <div key={restaurant.name} className="bg-white rounded-xl shadow-sm overflow-hidden flex">
                  {restaurant.image && (
                    <div className="relative w-28 flex-shrink-0">
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <a
                          href={restaurant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-900 hover:text-amber-700 transition-colors"
                        >
                          {restaurant.name}
                          <ExternalLink className="inline-block ml-1 h-3 w-3" />
                        </a>
                        <p className="text-sm text-amber-700">{restaurant.cuisine}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-500">{restaurant.price}</span>
                        <p className="text-xs text-gray-400">{restaurant.distance}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{restaurant.description}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {restaurant.address}
                      </span>
                    </div>
                    {restaurant.image && (
                      <p className="mt-1 text-[10px] text-gray-400 italic">Image: {restaurant.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Casual Dining */}
          <div className="mb-12">
            <h3 className="font-semibold text-gray-900 mb-4">Casual & Quick Bites</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {restaurants.casual.map((restaurant) => (
                <div key={restaurant.name} className="bg-white rounded-xl shadow-sm overflow-hidden flex">
                  {restaurant.image && (
                    <div className="relative w-28 flex-shrink-0">
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className={`p-4 flex-1 ${!restaurant.image ? 'p-6' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <a
                          href={restaurant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-900 hover:text-amber-700 transition-colors"
                        >
                          {restaurant.name}
                          <ExternalLink className="inline-block ml-1 h-3 w-3" />
                        </a>
                        <p className="text-sm text-amber-700">{restaurant.cuisine}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-500">{restaurant.price}</span>
                        <p className="text-xs text-gray-400">{restaurant.distance}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{restaurant.description}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {restaurant.address}
                      </span>
                    </div>
                    {restaurant.image && (
                      <p className="mt-1 text-[10px] text-gray-400 italic">Image: {restaurant.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Italian */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Italian</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {restaurants.italian.map((restaurant) => (
                <div key={restaurant.name} className="bg-white rounded-xl shadow-sm overflow-hidden flex">
                  {restaurant.image && (
                    <div className="relative w-28 flex-shrink-0">
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <a
                          href={restaurant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-900 hover:text-amber-700 transition-colors"
                        >
                          {restaurant.name}
                          <ExternalLink className="inline-block ml-1 h-3 w-3" />
                        </a>
                        <p className="text-sm text-amber-700">{restaurant.cuisine}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-500">{restaurant.price}</span>
                        <p className="text-xs text-gray-400">{restaurant.distance}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{restaurant.description}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {restaurant.address}
                      </span>
                    </div>
                    {restaurant.image && (
                      <p className="mt-1 text-[10px] text-gray-400 italic">Image: {restaurant.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philly Cheesesteaks */}
          <div className="mt-12">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Philly Cheesesteaks
              <span className="text-xs font-normal text-gray-500 ml-2">(Worth the trip)</span>
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {restaurants.cheesesteaks.map((restaurant) => (
                <div key={restaurant.name} className="bg-white rounded-xl shadow-sm overflow-hidden flex border-2 border-amber-100">
                  {restaurant.image && (
                    <div className="relative w-28 flex-shrink-0">
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className={`p-4 flex-1 ${!restaurant.image ? 'p-6' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <a
                          href={restaurant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-900 hover:text-amber-700 transition-colors"
                        >
                          {restaurant.name}
                          <ExternalLink className="inline-block ml-1 h-3 w-3" />
                        </a>
                        <p className="text-sm text-amber-700">{restaurant.cuisine}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-500">{restaurant.price}</span>
                        <p className="text-xs text-gray-400">{restaurant.distance}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{restaurant.description}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {restaurant.address}
                      </span>
                    </div>
                    {restaurant.image && (
                      <p className="mt-1 text-[10px] text-gray-400 italic">Image: {restaurant.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bars & Nightlife */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Wine className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-900">Bars & Nightlife</h2>
              <p className="text-gray-600">From hidden speakeasies to neighborhood institutions</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bars.map((bar) => (
              <div key={bar.name} className="bg-gray-50 rounded-xl overflow-hidden">
                {bar.image && (
                  <div className="relative h-32">
                    <Image
                      src={bar.image}
                      alt={bar.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <a
                    href={bar.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-900 hover:text-amber-700 transition-colors"
                  >
                    {bar.name}
                    <ExternalLink className="inline-block ml-1 h-3 w-3" />
                  </a>
                  <p className="text-sm text-amber-700">{bar.type}</p>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{bar.description}</p>
                  <p className="mt-2 text-xs text-gray-500 italic">Vibe: {bar.vibe}</p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {bar.address}
                    </span>
                  </div>
                  {bar.image && (
                    <p className="mt-1 text-[10px] text-gray-400 italic">Image: {bar.name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee & Cafes */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Coffee className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-900">Coffee & Cafes</h2>
              <p className="text-gray-600">Your morning ritual, sorted</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coffeeShops.map((shop) => (
              <div key={shop.name} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <a
                    href={shop.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-900 hover:text-amber-700 transition-colors"
                  >
                    {shop.name}
                    <ExternalLink className="inline-block ml-1 h-3 w-3" />
                  </a>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {shop.hours}
                  </div>
                </div>
                <p className="text-sm text-amber-700">{shop.specialty}</p>
                <p className="mt-2 text-sm text-gray-600">{shop.notes}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {shop.address}
                  </span>
                  <a href={`tel:${shop.phone}`} className="flex items-center gap-1 hover:text-amber-700">
                    <Phone className="h-3 w-3" />
                    {shop.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grocery & Essentials */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-900">Grocery & Essentials</h2>
              <p className="text-gray-600">Stock your kitchen for home-cooked meals</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {groceryStores.map((store) => (
              <div key={store.name} className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    {store.website ? (
                      <a
                        href={store.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-gray-900 hover:text-amber-700 transition-colors"
                      >
                        {store.name}
                        <ExternalLink className="inline-block ml-1 h-3 w-3" />
                      </a>
                    ) : (
                      <h4 className="font-semibold text-gray-900">{store.name}</h4>
                    )}
                    <p className="text-sm text-amber-700">{store.type}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    {store.distance}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600">{store.description}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {store.address}
                  </span>
                  <a href={`tel:${store.phone}`} className="flex items-center gap-1 hover:text-amber-700">
                    <Phone className="h-3 w-3" />
                    {store.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Museums & Culture */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h2 className="font-serif text-3xl font-bold text-gray-900">Museums & Culture</h2>
                  <p className="text-gray-600">World-class institutions and hidden gems</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                From the iconic Philadelphia Museum of Art (yes, the Rocky steps!) to intimate galleries
                and the wonderfully peculiar Mütter Museum, Philadelphia punches well above its weight
                in cultural offerings. Most are an easy walk, Uber, or scenic stroll along the Parkway.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/neighborhood/philadelphia-museum-of-art.jpg"
                alt="Philadelphia Museum of Art"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm font-medium">Philadelphia Museum of Art</p>
                <p className="text-white/80 text-xs">15 min walk from Rittenhouse Residence</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {museums.map((museum) => (
              <div key={museum.name} className="bg-white rounded-xl shadow-sm overflow-hidden flex">
                {museum.image && (
                  <div className="relative w-28 flex-shrink-0">
                    <Image
                      src={museum.image}
                      alt={museum.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className={`p-4 flex-1 ${!museum.image ? 'p-6' : ''}`}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={museum.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gray-900 hover:text-amber-700 transition-colors"
                    >
                      {museum.name}
                      <ExternalLink className="inline-block ml-1 h-3 w-3" />
                    </a>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {museum.distance}
                    </span>
                  </div>
                  <p className="text-sm text-amber-700">{museum.type}</p>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{museum.description}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    <span className="font-medium">Don't miss:</span> {museum.highlight}
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {museum.address}
                    </span>
                  </div>
                  {museum.image && (
                    <p className="mt-1 text-[10px] text-gray-400 italic">Image: {museum.name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parks & Outdoors */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="/images/neighborhood/schuylkill-river.jpg"
                alt="Schuylkill River Trail"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm font-medium">Schuylkill River Trail</p>
                <p className="text-white/80 text-xs">10 min walk from Rittenhouse Residence</p>
              </div>
            </div>
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <TreePine className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h2 className="font-serif text-3xl font-bold text-gray-900">Parks & Green Spaces</h2>
                  <p className="text-gray-600">Urban oases for relaxation and recreation</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                Rittenhouse Square—one of William Penn's original five squares—is quite literally at your
                doorstep. But the neighborhood offers even more: the scenic Schuylkill River Trail for
                morning runs, historic Washington Square, and easy access to Fairmount Park.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {parks.map((park) => (
              <div key={park.name} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{park.name}</h4>
                  <span className="text-xs text-gray-500">{park.distance}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{park.description}</p>
                <div className="flex flex-wrap gap-2">
                  {park.activities.map((activity) => (
                    <span
                      key={activity}
                      className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Tips */}
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-white">Local Tips</h2>
            <p className="mt-4 text-gray-300">Insider knowledge from your hosts</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h4 className="font-semibold text-white mb-2">Best Time to Visit the Square</h4>
              <p className="text-sm text-gray-300">
                Early morning (before 9am) or golden hour (5-7pm) for the best atmosphere.
                Weekday lunchtimes see the business crowd, weekends are more relaxed.
              </p>
            </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-2">Reservation Strategy</h4>
                  <p className="text-sm text-gray-300">
                    Book Vernick 2-3 weeks ahead. Parc doesn’t take reservations—go at off-peak times.
                    Most others, a few days notice is fine.
                  </p>
                </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h4 className="font-semibold text-white mb-2">BYOB Culture</h4>
              <p className="text-sm text-gray-300">
                Many restaurants are BYOB with no corkage fee. Grab a bottle at Di Bruno Bros
                and save on your dinner bill.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h4 className="font-semibold text-white mb-2">Farmers Market</h4>
              <p className="text-sm text-gray-300">
                Rittenhouse Farmers Market runs Saturdays year-round (10am-2pm). Local produce,
                artisan breads, fresh flowers.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h4 className="font-semibold text-white mb-2">Seasonal Highlights</h4>
              <p className="text-sm text-gray-300">
                Spring Festival (May), Fine Art Show (Fall), and the magical Christmas Tree
                Lighting with 5,000+ lights.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h4 className="font-semibold text-white mb-2">Day Trip from Here</h4>
              <p className="text-sm text-gray-300">
                30th Street Station offers easy Amtrak access. New York (90 min), Washington DC (2 hr),
                or the Main Line suburbs (20 min).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here & Parking */}
      <section id="getting-here-parking" className="py-16 bg-white scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Getting Here & Parking
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about arriving and getting around
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Parking */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Car className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900">Parking</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-amber-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Nearby Parking Garages</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li><strong>Parkway Corp - 1845 Walnut</strong> • 2 min walk • ~$25/day</li>
                    <li><strong>LAZ Parking - 1919 Spruce</strong> • 3 min walk • ~$22/day</li>
                    <li><strong>Icon Parking - 1616 Walnut</strong> • 4 min walk • ~$28/day</li>
                    <li><strong>PMC Parking - 17th & Sansom</strong> • 5 min walk • ~$20/day</li>
                  </ul>
                </div>
                <div className="border-l-4 border-gray-200 pl-4">
                  <h4 className="font-semibold text-gray-900">Street Parking</h4>
                  <p className="text-sm text-gray-600">
                    Limited 2-hour metered parking. $4.50-$6/hour during peak times.
                    Free evenings after 8pm and Sundays in some areas.
                  </p>
                </div>
                <div className="border-l-4 border-gray-200 pl-4">
                  <h4 className="font-semibold text-gray-900">Our Recommendation</h4>
                  <p className="text-sm text-gray-600">
                    Skip the car if possible. The neighborhood is extremely walkable (98 Walk Score),
                    and Uber/Lyft are readily available for longer trips.
                  </p>
                </div>
              </div>

              <a
                href="https://spothero.com/destination/philadelphia/rittenhouse-square-parking"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center text-amber-700 font-semibold hover:text-amber-800"
              >
                Reserve Parking on SpotHero
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>

              {/* Back Entry Tip */}
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 text-sm">Luggage Drop-Off Tip</h4>
                <p className="text-sm text-amber-800 mt-1">
                  Arriving with lots of luggage or supplies? Our rear entrance on Waverly Street
                  offers direct access to the house on a quiet, rarely-trafficked lane—perfect
                  for unloading. Pull up, drop off, then park your car at a nearby garage.
                </p>
              </div>
            </div>

            {/* Public Transit */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Train className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900">Public Transit</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-amber-400 pl-4">
                  <h4 className="font-semibold text-gray-900">SEPTA Subway</h4>
                  <p className="text-sm text-gray-600">
                    Broad Street Line: 15th Street Station (10 min walk).
                    Market-Frankford Line: 15th-16th & Locust (8 min walk).
                  </p>
                </div>
                <div className="border-l-4 border-gray-200 pl-4">
                  <h4 className="font-semibold text-gray-900">Regional Rail</h4>
                  <p className="text-sm text-gray-600">
                    Suburban Station (12 min walk) and 30th Street Station (20 min walk or quick Uber).
                    Direct service to Philadelphia Airport.
                  </p>
                </div>
                <div className="border-l-4 border-gray-200 pl-4">
                  <h4 className="font-semibold text-gray-900">Bus Lines</h4>
                  <p className="text-sm text-gray-600">
                    Multiple routes on Walnut, Chestnut, and Market Streets.
                    Fare: $2.50 cash or use SEPTA Key card.
                  </p>
                </div>
                <div className="border-l-4 border-gray-200 pl-4">
                  <h4 className="font-semibold text-gray-900">From the Airport</h4>
                  <p className="text-sm text-gray-600">
                    SEPTA Airport Line to Suburban Station (~35 min, $8).
                    Uber/Lyft (~25 min, $25-40 depending on traffic).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-gray-900">
            Ready to Experience Rittenhouse?
          </h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Book your stay at the Rittenhouse Residence and explore Philadelphia’s
            finest neighborhood from our historic 1854 mansion.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-8 py-3 text-base font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              Book Your Stay
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Ask Us Anything
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
