"use client";

import { useEffect, useState, useRef } from "react";
import { Calendar, ExternalLink, AlertCircle } from "lucide-react";

// Direct booking URL - skips property selection, goes straight to calendar
const DIRECT_BOOKING_URL =
  "https://rittenhouseresidence.guestybookings.com/en/properties/69584f75d11b4200144404b8";

// Guesty widget configuration
const GUESTY_SCRIPT_URL =
  "https://s3.amazonaws.com/guesty-frontend-production/search-bar-production.js";
const GUESTY_ACCOUNT_ID = "IO312PWQ"; // From the original widget
const WIDGET_CONTAINER_ID = "guesty-search-widget";

// Timeout for widget loading (ms)
const WIDGET_TIMEOUT = 10000;

type WidgetState = "loading" | "ready" | "error" | "fallback";

declare global {
  interface Window {
    GuestySearchBarWidget?: {
      create: (config: {
        accountId: string;
        rootElementID: string;
        locale?: string;
      }) => Promise<void>;
    };
  }
}

export function GuestyBookingWidget() {
  const [widgetState, setWidgetState] = useState<WidgetState>("loading");
  const containerRef = useRef<HTMLDivElement>(null);
  const initAttempted = useRef(false);

  useEffect(() => {
    // Only run once
    if (initAttempted.current) return;
    initAttempted.current = true;

    let timeoutId: NodeJS.Timeout;

    const initWidget = async () => {
      try {
        // Set a timeout for the entire loading process
        timeoutId = setTimeout(() => {
          console.warn("Guesty widget timed out, showing fallback");
          setWidgetState("fallback");
        }, WIDGET_TIMEOUT);

        // Check if script is already loaded
        if (window.GuestySearchBarWidget) {
          await createWidget();
          return;
        }

        // Check if script tag already exists
        const existingScript = document.querySelector(
          `script[src="${GUESTY_SCRIPT_URL}"]`
        );
        if (existingScript) {
          // Script exists but widget not ready - wait a bit
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (window.GuestySearchBarWidget) {
            await createWidget();
          } else {
            throw new Error("Script loaded but widget not available");
          }
          return;
        }

        // Load the script
        const script = document.createElement("script");
        script.src = GUESTY_SCRIPT_URL;
        script.async = true;

        script.onload = async () => {
          // Give the script a moment to initialize
          await new Promise((resolve) => setTimeout(resolve, 500));

          if (window.GuestySearchBarWidget) {
            await createWidget();
          } else {
            throw new Error("Script loaded but GuestySearchBarWidget not found");
          }
        };

        script.onerror = () => {
          console.error("Failed to load Guesty script (blocked or network error)");
          clearTimeout(timeoutId);
          setWidgetState("fallback");
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error("Guesty widget error:", error);
        clearTimeout(timeoutId);
        setWidgetState("error");
      }
    };

    const createWidget = async () => {
      if (!window.GuestySearchBarWidget) {
        throw new Error("GuestySearchBarWidget not available");
      }

      try {
        await window.GuestySearchBarWidget.create({
          accountId: GUESTY_ACCOUNT_ID,
          rootElementID: WIDGET_CONTAINER_ID,
          locale: "en",
        });

        clearTimeout(timeoutId);
        setWidgetState("ready");
      } catch (error) {
        console.error("Failed to create Guesty widget:", error);
        clearTimeout(timeoutId);
        setWidgetState("error");
      }
    };

    initWidget();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Fallback booking UI (used for error, fallback, and as primary CTA)
  const FallbackBooking = ({ showMessage = true }: { showMessage?: boolean }) => (
    <div className="text-center">
      {showMessage && widgetState === "error" && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg inline-flex items-center gap-2 text-amber-800 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>Booking widget unavailable. Use the direct link below.</span>
        </div>
      )}

      <p className="text-gray-600 mb-6">
        Check availability and book directly - no booking fees when you reserve
        through our site.
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

  // Loading state
  if (widgetState === "loading") {
    return (
      <div className="text-center">
        <div className="min-h-[120px] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mb-4" />
          <p className="text-gray-500 text-sm">Loading booking calendar...</p>
        </div>
        {/* Hidden container for widget */}
        <div
          id={WIDGET_CONTAINER_ID}
          ref={containerRef}
          className="hidden"
        />
        {/* Show fallback link while loading */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2">
            Taking too long?
          </p>
          <a
            href={DIRECT_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-700 text-sm font-medium inline-flex items-center gap-1"
          >
            Book directly on Guesty
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    );
  }

  // Widget ready - show the embedded widget
  if (widgetState === "ready") {
    return (
      <div className="text-center">
        <div
          id={WIDGET_CONTAINER_ID}
          ref={containerRef}
          className="guesty-widget-container"
        />
        {/* Fallback link below widget */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Or book on other platforms:
          </p>
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

  // Error or fallback state - show direct booking link
  return <FallbackBooking showMessage={widgetState === "error"} />;
}
