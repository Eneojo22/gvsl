"use client"
import Image from "next/image";
import { useState } from "react";
import { products } from "./product";
import { InfiniteMovingCard } from "./infinite";
// import { Products } from "../component/products";
import ProductCard from "./infinite";
// import SeeOrder  from "./infinite";
// import { SeeOrder } from "./infinite";
export default function Herowood() {

const [query, setQuery] = useState("");
const [cartOpen, setCartOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

const handleClose = () => {
    setOpen(false);

  };
  // const HandleBtnClick2 = () => setCartOpen(!cartOpen);
  if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
;

  return (
    <>
    <section className="mt-40  relative h-200 flex flex-col justify-between">
      {/* Background image */}
      <Image
        src="/image/funitures.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center"
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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
      />
      <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-700">
        Search
      </button>
    </div>
  </div>
  <div>
    <div className="border-8 h-10">

    </div>
  <div className="grid  grid-cols-1   gap-8 md:bg-[#09031b] md:pt-10">
{filteredProducts.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4   gap-8">
    {filteredProducts.map((product) => (
      <div key={product.id}>
      <ProductCard
        image={product.image}
        title={product.name}
        price={product.price}
      
        />
      </div>
    ))}     
  </div>
) : (
  <p className="text-center text-gray-500 text-lg">No results found.</p>
)}



    </div> 
</div>
  </>
  );
}