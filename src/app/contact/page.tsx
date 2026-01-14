"use client";

import { useState } from "react";
import { MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          inquiryType: formData.get("inquiryType"),
          dates: formData.get("dates"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      setFormState("success");
      form.reset();
    } catch (err) {
      setFormState("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium text-amber-400 mb-4">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Contact the Rittenhouse Residence
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Questions about booking or our history? We&apos;d
              love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Send Us a Message
              </h2>
              <p className="mt-2 text-gray-600">
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </p>

              {formState === "success" ? (
                <div className="mt-8 rounded-xl bg-green-50 border border-green-200 p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                  <h3 className="mt-4 font-semibold text-green-900 text-lg">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-green-700">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-6 text-green-700 font-medium hover:text-green-800"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {formState === "error" && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Inquiry Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
                    >
                      <option value="">Select an option</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="general">General Question</option>
                      <option value="history">Historical Research</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="dates"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Preferred Dates (Optional)
                    </label>
                    <input
                      type="text"
                      id="dates"
                      name="dates"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="e.g., March 15-18, 2026"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Tell us about your plans..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formState === "submitting" ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:pl-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Location
              </h2>
              <p className="mt-2 text-gray-600">
                Our historic mansion in the heart of Philadelphia.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="mt-1 text-gray-600">
                      1800 Block of Pine Street
                      <br />
                      Philadelphia, PA 19103
                    </p>
                    <p className="mt-1 text-sm text-amber-700">
                      Steps from Rittenhouse Square
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Response Time</h3>
                    <p className="mt-1 text-gray-600">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-gray-900">
            Have Questions?
          </h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Check out our FAQ for answers to common questions about booking,
            check-in, amenities, and more.
          </p>
          <a
            href="/faq"
            className="mt-6 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            View FAQ
          </a>
        </div>
      </section>
    </div>
  );
}
