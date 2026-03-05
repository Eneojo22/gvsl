import React from "react";
import Link from "next/link";
import { ImageCarousel } from "../../aboutUs/teamInfo/teaminfo";

function SettlingIn() {
  return (
    <>
      <ImageCarousel
        title="Settling-in Services"
        subtitle="We’re currently building this service page."
        image="/image/meetgreet.jpg"
        overlayOpacity="bg-black/70"
        height="h-[32vh]"
      />

      <section className="mx-auto w-full max-w-5xl px-4 md:px-10 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-black">
            Services
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Settling-in</span>
        </div>

        {/* Content Card */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#dd5500]">
              {/* simple icon */}
              <span className="text-xl">🛬</span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#111111]">
                Settling-in Services
              </h1>
              <p className="mt-2 text-[#333333] leading-relaxed">
                We’re working on this page and will publish full details soon. In the meantime,
                if you need settling-in support (utilities, local setup, area guidance, and day-to-day onboarding),
                reach out and our team will assist you.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-[#dd5500] px-5 py-3 text-white font-semibold hover:opacity-90"
                >
                  Contact Us
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-[#111111] font-semibold hover:bg-gray-50"
                >
                  View All Services
                </Link>
              </div>

              {/* Quick bullets */}
              <div className="mt-8">
                <p className="font-semibold text-[#111111]">What this service typically covers:</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-[#333333]">
                  <li>• Utilities setup and disconnections</li>
                  <li>• Local area orientation and guidance</li>
                  <li>• Basic registrations and onboarding support</li>
                  <li>• Practical support for first-week settling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "Settling-in") {
    return (
      <div className="min-h-dvh bg-white">
        <SettlingIn />
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <div className="text-4xl mb-3">⚠️</div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#111111]">
          Page Not Found
        </h1>
        <p className="mt-2 text-[#333333]">
          We can’t find a service page for:{" "}
          <span className="font-semibold">{slug}</span>
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/services/leadwoodhomes"
            className="inline-flex items-center justify-center rounded-lg bg-[#dd5500] px-5 py-3 text-white font-semibold hover:opacity-90"
          >
            Go to leadwoodhomes
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-[#111111] font-semibold hover:bg-gray-50"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}