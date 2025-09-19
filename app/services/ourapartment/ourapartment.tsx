// import Image from "next/image";
"use client";
import { InfiniteMovingCard } from "../LeadwoodsFuniture/infinite";
import Image from "next/image";
import { useState } from "react";
import properties from "./apartmentData";
import Link from "next/link";

export default function HeroSearch() {
  // const [location, setLocation] = useState("Lagos, Nigeria");
  
 const [query, setQuery] = useState("");
  const filteredProperties = properties.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return ( 
  <>
        <section className=" relative h-200 flex flex-col justify-between">
          {/* Background image */}
          <Image
            src="/image/homes.jpg"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#000]/70" />
    
          {/* Hero content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
            <p className="text-sm uppercase tracking-widest text-white">
              Our platform integrates real-time listings, transparent pricing.
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white my-4">
              Your Gateway to Smarter, Secure, and Modern Living
            </h1>
            <p className="text-[#ffffff] mb-6">
              The latest drops from our Weekly Selection.
            </p>
    
            {/* Buttons */}
            <div className="flex space-x-4">
              <button className="px-6 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-[#dd5500] transition">
                Explore Now
              </button>
              <button className="px-6 py-3 rounded-full bg-[#dadada] text-[#dd5500] font-medium hover:bg-gray-200 transition">
                10% Off
              </button>
            </div>
          </div>
    
          {/* Category Navbar */}
          <div className="relative z-10 bg-white h-30 shadow-md flex justify-between items-center text-black py-4  px-15 text-sm font-semibold uppercase">
            <InfiniteMovingCard/>
          </div>
           
        </section>
    <div className="max-w-7xl mx-auto py-10 border-b">
      <div className="flex flex-col w-full justify-center items-center p-5">
        <p className="text-2xl font-bold mb-2">Our Top apartment rentals at Leadwoods Homes</p>
      <p>Guests agree: these apartments are highly rated for location, cleanliness, and more.</p>
       <div className="flex items-center mt-8">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
      />
      <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-700">
        Search
      </button>
    </div>
      </div>
      
        {/* <BentoGd/> */}
      </div>
     <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 m-10 sm:p-4">
      {filteredProperties.map((property) => (
        <Link key={property.id} href={`/services/ourapartment/${property.id}`} className="rounded-lg sm:shadow-md overflow-hidden bg-white block"
        >
          {/* Title */}
          <h2 className="text-lg font-semibold p-2">{property.title}</h2>

          {/* Image */}
          <div className="relative sm:w-full h-44">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:p-4">
            <p className="text-[#cf6c3d] font-semibold">{property.type}</p>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {property.description}
            </p>

            <p className="text-xl font-bold text-black mt-4">
              ₦{property.price.toLocaleString()}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-700 mt-4">
              <span>🛏 {property.features.bedrooms} Beds</span>
              <span>🛁 {property.features.bathrooms} Baths</span>
              <span>🚽 {property.features.toilets} Toilets</span>
              <span>🚗 {property.features.parkingSpaces} Parking</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
      </div>
      </>
  );
}


