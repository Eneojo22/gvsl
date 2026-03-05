"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Location = () => {
  return (
    <div className="mb-20">
      {/* HERO */}
      <div className="w-full z-40 text-black mt-40">
        <Hero
          title="Nigeria"
          subtitle="Ẹ̀káàbọ̀"
          image="/image/emmanuel-ikwuegbu-T4q6ZPpYjog-unsplash.jpg"
          overlayOpacity="bg-black/50"
          height="h-[25vh]"
        />
      </div>

      {/* NAV */}
      <div className="w-full mt-5 border-y">
        <nav className="mx-auto flex items-center justify-end h-16 gap-6 w-full max-w-5xl px-4">
          
          <a href="#housing" className="text-gray-600 hover:text-gray-900">
            Housing
          </a>
          <a href="#immigration" className="text-gray-600 hover:text-gray-900">
            Immigration Policy
          </a>
        </nav>
      </div>

      {/* OVERVIEW */}
      <section id="overview">
        <SubHome />
      </section>

      {/* HOUSING */}
      <Hero
        title="Housing"
        image="/image/Homes.jpg"
        overlayOpacity="bg-black/50"
        height="h-[20vh]"
      />
      <section id="housing">
        <Housing />
      </section>

      {/* IMMIGRATION */}
      <Hero
        title="Immigration"
        image="/image/immigration.jpg"
        overlayOpacity="bg-black/50"
        height="h-[20vh]"
      />
      <section id="immigration">
        <Immigration />
      </section>
    </div>
  );
};

export default Location;

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  overlayOpacity?: string;
  height?: string;
}

function Hero({
  title,
  subtitle,
  image,
  overlayOpacity = "bg-black/40",
  height = "h-[30vh]",
}: HeroProps) {
  return (
    <section className={`relative ${height} w-full flex items-center justify-center overflow-hidden`}>
      <Image src={image} alt={title} fill priority className="object-cover object-center" />
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
        {subtitle && <p className="text-base md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}

function SubHome() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-[#dd5500] mb-3">Nigeria</h2>

          <p className="text-[#413f3f] text-sm leading-relaxed">
            Nigeria is a federal republic in West Africa and one of Africa’s most influential economies.
            It consists of 36 states and the Federal Capital Territory (Abuja). Lagos remains the country’s
            largest city and a major commercial hub. Nigeria is culturally diverse, with many ethnic groups,
            languages, and traditions—making it a vibrant place to live, work, and explore.
          </p>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/3 bg-gray-100 p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-[#dd5500] mb-3">Country Facts</h3>

          <ul className="space-y-2 text-[#333333] text-sm">
            <li className="flex items-center gap-2">⚙️ <span>Currency: Naira (NGN)</span></li>
            <li className="flex items-center gap-2">🌡️ <span>Climate: Tropical (varies by region)</span></li>
            <li className="flex items-center gap-2">💧 <span>Water: Bottled water recommended</span></li>
            <li className="flex items-center gap-2">⏰ <span>Time Zone: UTC+1 (WAT)</span></li>
            <li className="flex items-center gap-2">🗣️ <span>Official Language: English</span></li>
          </ul>

          <div className="mt-4 text-gray-500 text-sm">
            <DateTime />
          </div>
        </div>
      </div>
    </div>
  );
}

function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div>
      {formattedDate}
      <br />
      {formattedTime}
    </div>
  );
}

function Housing() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-semibold text-[#dd5500] mb-4 text-center">
        Housing in Nigeria: Accommodation Support with Leadwood Homes
      </h2>

      <p className="text-[#333333] text-base leading-relaxed">
        Finding the right home is one of the most important parts of a successful relocation. Through our partnership
        with <b>Leadwood Homes</b>, we support expatriates and corporate clients with housing options that match
        lifestyle preferences, proximity to work, security needs, and budget.
        <br /><br />
        Our team can assist with shortlisting, scheduled viewings, negotiation support, and move-in coordination—so
        you can settle in with clarity and confidence.
      </p>

      <div className="mt-5">
        <Link href="/services/apartments" className="text-[#dd5500] font-semibold hover:underline">
          Discover Leadwood Homes Properties
        </Link>
      </div>

      <p className="mt-4 text-[#333333] text-sm">
        For consultations or viewings, contact:{" "}
        <span className="text-[#dd5500] font-medium">leadwoodsupport@gvss.ng</span>
      </p>
    </div>
  );
}

function Immigration() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 mb-40 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-semibold text-[#dd5500] mb-4 text-center">
        Immigration Support for Expatriates
      </h2>

      <p className="text-[#333333] text-base leading-relaxed">
        Nigeria’s immigration processes can feel complex—especially for first-time assignees and relocating families.
        G&V Support Services provides structured guidance to help expatriates stay compliant and avoid unnecessary delays.
        <br /><br />
        We support documentation preparation, application guidance, appointment coordination, and onboarding steps after arrival.
        Where needed, we work alongside licensed immigration professionals to ensure each case is handled correctly and efficiently.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-[#dd5500] text-white">
            <tr>
              <th className="border border-gray-300 p-3 text-left">Category</th>
              <th className="border border-gray-300 p-3 text-left">What We Help With</th>
            </tr>
          </thead>

          <tbody className="text-[#333333]">
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3 font-medium">Pre-Arrival</td>
              <td className="border border-gray-300 p-3">
                Document checklist, guidance on the right pathway, submission readiness review, and timeline planning.
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3 font-medium">On Arrival</td>
              <td className="border border-gray-300 p-3">
                Arrival support coordination, next-step guidance, and structured onboarding for assignees.
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3 font-medium">Compliance Support</td>
              <td className="border border-gray-300 p-3">
                Reminders and coordination for renewals, dependents, and required follow-ups.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-[#333333] text-sm">
        Need help with an immigration case? Contact our team via{" "}
        <span className="text-[#dd5500] font-medium">immigration@gvss.ng</span>.
      </p>
    </div>
  );
}