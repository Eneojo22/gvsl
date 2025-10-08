import Image from "next/image";
import Link from "next/link";
import packages from "../seeingData";
import React from "react";
// import { CarRentalCard, carTypes } from "../../main"; // ✅ import both
import { use } from "react";

// ✅ Locations (same as in main file)
const locations: string[] = [
  "Murtala Muhammed International Airport (MMIA)",
  "Ikeja",
  "Victoria Island",
  "Lekki Phase 1",
  "Ajah",
  "Ikoyi",
  "Surulere",
  "Yaba",
  "Maryland",
  "Festac",
  "Apapa",
  "Ogba",
  "Magodo",
  "Gbagada",
  "Oshodi",
];

// ✅ Page
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const location = packages.find(
    (p) => p.id.toLocaleString() === decodedSlug
  );

  if (!location) {
    return (
      <div className="mt-35 h-dvh text-black text-center flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold mb-4">
          ❌ Apartment not found for slug: {decodedSlug}
        </p>
        <Link
          href={"/"}
          className="text-orange-600 font-bold hover:underline"
        >
          Go back to our Apartment
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Apartment Details Section */}
      <div className="mt-25 mx-auto max-w-5xl p-4 text-gray-900">
        <p className="font-extrabold text-3xl md:text-4xl bg-black text-white rounded-3xl shadow-md text-center py-4 mb-8 tracking-tight">
          {location.title}
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src={location.imageUrl}
              height={400}
              width={600}
              alt={location.title}
              className="rounded-2xl shadow-md w-full h-[300px] object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <p className="text-base md:text-lg font-light leading-relaxed">
              {location.description}
            </p>
            <p className="text-sm md:text-base font-light text-gray-700">
              Check out must-see sights and activities:{" "}
              <span className="font-semibold">
                Nike Centre For Art And Culture, Lekki Conservation Centre,
                Cultural Tours, Beaches.
              </span>{" "}
              For personalized recommendations, you can contact our admin.
            </p>
            <Link href={"/services/carrentals/booking-summary"}>
              <button className="mt-5 bg-orange-500 hover:bg-orange-600 transition-colors py-2 px-6 text-white font-semibold rounded-3xl shadow-md">
                Rent a car now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Car Rental Booking Section */}
      
    </>
  );
}
