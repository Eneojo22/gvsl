"use client"
import React from 'react'
import { DirectionAwareHover } from "../../../component/direction-aware-hover";
import Image from 'next/image';
import packages from './seeingData';
import { Home } from 'lucide-react';
import Link from 'next/link';
// import { Clock } from 'lucide-react';


const Sightseeing = () => {
  return (
      <div className="px-6 mt-35  max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-17 flex items-center">
        <span><Home className='hover:text-black mx-1.5'/></span><span className='text-[17px] mx-1.5 font-extrabold'> &gt;</span><span>Sightseeing Packages</span> 
        </div>

      {/* Heading */}
      <h1 className="md:text-5xl text-3xl text-black font-bold mb-10 tracking-wider">Sightseeing Packages</h1>
      <p className="text-gray-600 max-w-5xl mb-10 text-sm tracking-wider ">
        Discover our carefully curated sightseeing packages, where you’ll
        experience both the city’s most iconic landmarks and its hidden gems.
        We partner with local experts to give you an authentic glimpse into the
        history, culture, and everyday life, delivered with maximum comfort and
        transparent pricing. Choose the perfect itinerary and see the city
        through the eyes of those who know it best.
      </p>

      {/* Cards */}
      <div className="">
        <DirectionAwareHoverprop/>
      </div>
    </div>
  )
}

export default Sightseeing



function DirectionAwareHoverprop() {
  return (
   <div className="mb-20">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 inset-0">
    {packages.map((pkg) => (
      <div key={pkg.id} className="relative rounded-2xl w-full overflow-hidden shadow-md">
  {/* Desktop hover effect */}
  <div className="hidden md:block">
    <DirectionAwareHover imageUrl={pkg.imageUrl}>
      <h3 className="text-black md:text-white font-bold text-lg mb-1 p-2 bg-black rounded-full inline my-4">
        {pkg.duration}
      </h3>
      <h3 className="text-black md:text-white font-bold text-lg mb-1">{pkg.title}</h3>
      <span className="text-sm md:text-white font-normal shadow-2xl block">
        {pkg.description}
      </span>
      <Link href={`/services/carrentals/sight-seeing/${pkg.slug}`}>
        <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-4 py-2">
          Book This Trip
        </button>
      </Link>
    </DirectionAwareHover>
  </div>

  {/* Mobile simple card */}
  <div className="md:hidden">
    <Image
      src={pkg.imageUrl}
      height={200}
      width={400}
      alt={pkg.title}
      className="w-full h-60 object-cover rounded-t-2xl"
    />
    <div className="p-3 bg-white rounded-b-2xl">
      <h3 className="text-black font-bold text-lg mb-1">{pkg.title}</h3>
      <p className="text-gray-600 text-sm">{pkg.description}</p>
      <Link href={`/services/carrentals/sight-seeing/${pkg.slug}`}>
        <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-4 py-2">
          Book This Trip
        </button>
      </Link>
    </div>
  </div>
</div>

    ))}
  </div>
</div>
  )


}



