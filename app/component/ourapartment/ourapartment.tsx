// import Image from "next/image";


"use client";

import Image from "next/image";
import { useState } from "react";
import { BentoGd } from "./grid";

export default function HeroSearch() {
  const [location, setLocation] = useState("Lagos, Nigeria");

  return ( 
  <>
    <section className="flex justify-center items-center py-12   inset-0  bg-[url(/image/brandon-griggs-wR11KBaB86U-unsplash.jpg)]  ">
      
      <div className="flex w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
       
        <div className="w-full  p-6 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-2">
           LeadsWoods Home Rentals
          </h1>
          <p className="text-gray-600 mb-6">
            book your  apartments 
          </p>

          {/* Location input */}
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1">LOCATION</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          {/* Date inputs */}
        
          {/* Search button */}
          <button className="w-full bg-[#dd5500]  text-white font-semibold py-3 rounded-lg transition">
            Search
          </button>
        </div>

        {/* Right side - Image */}
      
      </div>
    </section>
    <div>
      <div className="flex flex-col w-full justify-center items-center p-5">
        <p className="text-2xl font-bold mb-2">Our Top apartment rentals at Leadwoods Homes</p>
      <p>Guests agree: these apartments are highly rated for location, cleanliness, and more.</p>
      </div>
      
        <BentoGd/>
      </div>
     
      </>
  );
}

