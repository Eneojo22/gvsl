"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState,useEffect, } from "react";
import { HiMenu, HiX, HiPlus } from "react-icons/hi";
import Cartlist from "./cartlist";
import { useCart } from "./cartContext";



// --- Props for ProductCard ---


// --- Product Card ---


// import { useState } from "react";

// --- SeeOrder Section ---


// --- Infinite Moving Navbar ---
export function InfiniteMovingCard() {
  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="animate-marquee whitespace-nowrap flex space-x-12 font-semibold uppercase text-sm">
        {["Living", "Bedroom", "Dining", "Kitchen", "Pool", "Restroom", "Office"].map(
          (item, idx) => (
            <a key={idx} href="#" className="hover:text-gray-600">
              {item}
            </a>
          )
        )}
        {/* duplicate for infinite effect */}
        {["Living", "Bedroom", "Dining", "Kitchen", "Pool", "Restroom", "Office"].map(
          (item, idx) => (
            <a key={idx + 10} href="#" className="hover:text-gray-600">
              {item}</a>
          )
        )}
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          min-width: 100%;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}


export  function ChatWidget() {
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWidget(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (!showWidget) return null;

  return (
    <div className="fixed bottom-6 right-6 flex items-center space-x-2 z-50">
      <div className="bg- text-sm rounded-md shadow-md px-3 py-2">
        
        Need Help? <span className="text-blue-600 font-medium cursor-pointer">Chat with us</span>
      </div>
      <button
        className="w-10 h-10 rounded-full bg-green-500 shadow-lg focus:outline-none"
        aria-label="Chat Button"
      ></button>
    </div>
  );
}
{/* <button  onClick={handleBtnClick} className="mt-3 w-full bg-[#ca430d] text-white py-2 rounded-lg hover:bg-amber-800 transition">
  Add to Cart
</button> */}
