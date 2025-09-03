"use client"
import Image from "next/image";
import { InfiniteMovingCard } from "./infinite";
// import { Products } from "./infinite";
import { Products } from "../component/products";
import ProductCard from "./infinite";
export default function Herowood() {
  return (
    <>
    <section className="mt-40  relative h-200 flex flex-col justify-between">
      {/* Background image */}
      <Image
        src="/image/funitures.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center "
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <p className="text-sm uppercase tracking-widest text-white">
          New Arrival
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-white my-4">
          Refresh Your Space
        </h1>
        <p className="text-white/90 mb-6">
          The latest drops from our Weekly Selection.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="px-6 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-[#dd5500] transition">
            Shop Now
          </button>
          <button className="px-6 py-3 rounded-full bg-[#dd5500] text-black font-medium hover:bg-gray-200 transition">
            5% Off
          </button>
        </div>
      </div>

      {/* Category Navbar */}
      <div className="relative z-10 bg-white h-30 shadow-md flex justify-between items-center text-black py-4  px-15 text-sm font-semibold uppercase">
        <InfiniteMovingCard/>
      </div>
       
    </section>
    <div className="flex items-center justify-between max-w-6xl mx-auto   mt-10 mb-10">
        <div>
            <p className="text-3xl text-black">Our Collections</p>
        </div>
        <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
      />
      <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-700">
        Search
      </button>
    </div>
  </div>
    {/* </div> */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:bg-[#000000] md:pt-10">
      {Products.map((p, i) => (
        <ProductCard
          key={i}
          image={p.image}
          title={p.title}
          price={p.price}
          oldPrice={p.oldPrice}
        />
      ))}
    </div>
    </>
  );
}
