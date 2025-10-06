import Image from "next/image";
import Link from "next/link";
import packages from "../seeingData";
import React from "react";
import { CarRentalCard } from "../../main";


export default async function page({ params }: {params:Promise<{slug:string}>}) {
    const {slug} = await params
  const decodedSlug = decodeURIComponent(slug); 
//   console.log("✅ Current slug from URL:", decodedSlug);


  const location = packages.find((p) => p.id.toLocaleString() === decodedSlug);
//   console.log('location')

  if (!location) {
    return (
      <div className="mt-35 h-dvh text-black">
        ❌ Apartment not found for slug: {decodedSlug} <br/>
        <Link href={"/"}>Go back to our Apartment</Link>
      </div>
    );
  }

  return (
    <>
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
          Nike Centre For Art And Culture, Lekki Conservation Centre, Cultural
          Tours, Beaches.
        </span>{" "}
        For personalized recommendations, you can contact our admin.
      </p>
      <Link href={'/services/carrentals/booking-summary'}>
      <button className="mt-5 bg-orange-500 hover:bg-orange-600 transition-colors py-2 px-6 text-white font-semibold rounded-3xl shadow-md">
        Rent a car now
      </button>
      </Link>
    </div>
  </div>
</div>
    <div className="md:w-1/2 mx-auto my-20">
      <CarRentalCard/>
    </div>
    </>
  );
}


