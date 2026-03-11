"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import fallbackProperties from "../apartmentData";

type Props = {
  apartmentId: string;
};

export default function Settlings({ apartmentId }: Props) {
  const fallbackApartment =
    fallbackProperties.find((property) => String(property.id) === apartmentId) ?? null;
  const [apartment, setApartment] = useState(fallbackApartment);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadApartment() {
      try {
        const response = await fetch(`/api/homes/${apartmentId}`, { cache: "no-store" });
        const data = await response.json();

        if (mounted && response.ok) {
          setApartment(data.home);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadApartment();

    return () => {
      mounted = false;
    };
  }, [apartmentId]);

  if (loading && !apartment) {
    return <div className="mt-36 text-lg">Loading apartment...</div>;
  }

  if (!apartment) {
    return (
      <div className="mt-36 text-center text-lg">
        Apartment not found. <Link href="/services/leadwoodhomes">Go back to listings</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mt-35 p-2 text-3xl font-semibold">{apartment.title}</h2>
      <div className="relative h-84 sm:w-full">
        <Image
          src={apartment.image || "/image/homes.jpg"}
          alt={apartment.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="md:p-4">
        <p className="font-semibold text-[#cf6c3d]">{apartment.type}</p>
        <p className="mt-2 text-sm text-gray-600">{apartment.description}</p>
        <p className="mt-4 text-xl font-bold text-black">N{apartment.price.toLocaleString()}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-700">
        <span>{apartment.features.bedrooms} Beds</span>
        <span>{apartment.features.bathrooms} Baths</span>
        <span>{apartment.features.toilets} Toilets</span>
        <span>{apartment.features.parkingSpaces} Parking</span>
      </div>

      <Link href="https://wa.me/2348137167298" target="_blank">
        <button className="mt-7 rounded-3xl bg-[#000] px-10 p-4 text-lg font-extrabold text-[#ffffff]">
          Book Inspection Now
        </button>
        <div>
          <p className="mt-2 text-sm text-gray-600 md:text-lg">
            Please click the button below to schedule your inspection. We encourage you
            to book promptly, as availability is limited.
          </p>
        </div>
      </Link>
    </div>
  );
}
