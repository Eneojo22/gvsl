"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState,useEffect, } from "react";
import { HiMenu, HiX, HiPlus } from "react-icons/hi";
import Cartlist from "./cartlist";



// --- Props for ProductCard ---
interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  isOpen: boolean;
  handleBtnClick2:(e: React.MouseEvent<HTMLButtonElement>) => void;
  onToggle: () => void;
}

// --- Product Card ---
export default function ProductCard({
  image,
  title,
  price,
  handleBtnClick2
  
  // isOpen,
  // onToggle,
}: ProductCardProps) {
 
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className="shadow-md rounded-xl border-2 p-4 flex flex-col items-center cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full h-100 bg-white relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain transition-transform duration-500 hover:scale-110 w-full"
        />
      </div>

      {/* Product Info */}
      <div className="text-center mt-4">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="text-white font-bold">{price}</p>

      <Button value="Order Noow" handleBtnClick={handleBtnClick2}/>

       {/* Conditionally render Background */}
{/* {cartOpen} */}
      </div>
    </motion.div>
  
  );
}


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
interface buttonProps {
  value:string
  handleBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// --- Product Card ---



function Button({ value, handleBtnClick }: buttonProps) {
  return (
    <button className="square" onClick={handleBtnClick}>
      {value}
    </button>
  );
}
