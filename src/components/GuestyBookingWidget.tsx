"use client";

import { Calendar, ExternalLink } from "lucide-react";

// Direct booking URL - skips property selection, goes straight to calendar
const DIRECT_BOOKING_URL = "https://rittenhouseresidence.guestybookings.com/en/properties/69584f75d11b4200144404b8";

export function GuestyBookingWidget() {
  return (
    <div className="text-center">
      <p className="text-gray-600 mb-6">
        Check availability and book directly - no booking fees when you reserve through our site.
      </p>

      {/* Primary: Direct booking */}
      <a
        href={DIRECT_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-amber-700 hover:shadow-lg transition-all"
      >
        <Calendar className="h-5 w-5" />
        Check Availability & Book Direct
        <ExternalLink className="h-4 w-4" />
      </a>

      {/* Secondary: OTA options */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-4">Also available on:</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://www.airbnb.com/rooms/6000930"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            Airbnb
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://www.vrbo.com/757481"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            VRBO
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
