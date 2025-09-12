"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";


export function InfiniteMovingCard() {
  return (<>
      <div className=" w-full overflow-hidden bg-white ">
      <div className="animate-marquee whitespace-nowrap flex space-x-12 font-semibold uppercase text-sm">
        
        <a href="#" className="hover:text-gray-600">Living</a>
        <a href="#" className="hover:text-gray-600">Bedroom</a>
        <a href="#" className="hover:text-gray-600">Dining</a>
        <a href="#" className="hover:text-gray-600">Kitchen</a>
        <a href="#" className="hover:text-gray-600">Pool</a>
        <a href="#" className="hover:text-gray-600">Restroom</a>
        <a href="#" className="hover:text-gray-600">Office</a>

        {/* duplicate for infinite effect */}
        <a href="#" className="hover:text-gray-600">Living</a>
        <a href="#" className="hover:text-gray-600">Bedroom</a>
        <a href="#" className="hover:text-gray-600">Dining</a>
        <a href="#" className="hover:text-gray-600">Kitchen</a>
        <a href="#" className="hover:text-gray-600">Pool</a>
        <a href="#" className="hover:text-gray-600">Restroom</a>
        <a href="#" className="hover:text-gray-600">Office</a>
        <a href="#" className="hover:text-gray-600">Living</a>
        <a href="#" className="hover:text-gray-600">Bedroom</a>
        <a href="#" className="hover:text-gray-600">Dining</a>
        <a href="#" className="hover:text-gray-600">Kitchen</a>
        <a href="#" className="hover:text-gray-600">Pool</a>
        <a href="#" className="hover:text-gray-600">Restroom</a>
        <a href="#" className="hover:text-gray-600">Office</a>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          min-width: 100%;
          animation: marquee 20s linear infinite;
          // animation-play-state: paused
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
    
    </>
    // </div>
  );
}

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  category: string;
  // oldPrice?: string;
}

export default function ProductCard({
  image,
  title,
  price,
  // oldPrice,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className="shadow-md rounded-xl border-2  p-4 flex flex-col items-center  cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full h-100 border-5 text-white  bg-white relative">
        <Image
          src={image}
          alt={title}
          // width={40}
          fill
          className="object-contain transition-transform duration-500 hover:scale-110 w-full "
        />
      </div>

      {/* Product Info */}
      <div className="text-center mt-4">
        <h3 className="text-base font-semibold text-amber-50">{title}</h3>
        <p className="text-white font-bold">{price}</p>
         <button className="mt-3 w-full bg-[#ca430d] text-white py-2 rounded-lg hover:bg-green-700 transition">
            Order Now</button>
    
        </div>
    </motion.div>
  );
}


// components/ChatWidget.tsx
// import { useEffect, useState } from 'react';

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


