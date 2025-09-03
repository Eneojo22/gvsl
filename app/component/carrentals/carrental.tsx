"use client";
import Image from "next/image";
import { motion } from "motion/react";

export function HeroSectionOne() {
  const heading = "Arrive In Style, Everytime"; // main heading
  const subText =
    "Our premium car rental services redefine sophistication, ensuring you arrive at your destination in elegance and comfort.";

  return (
   <div className="relative mx-auto my-30 flex w-full flex-col items-center justify-center bg-[url('/image/carrentals (1).jpg')] bg-cover bg-center bg-no-repeat   bg-black">
  {/* Overlay for better text visibility */}
  <div className="absolute inset-0  rounded-2xl" />
      <div className="px-4 py-10 md:py-20">
        {/* Animated Heading */}
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl ">
          {heading.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          {subText}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg  px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a53f00] bg-[#dd5500]">
            Need A Ride?
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  );
}




 export function RideSection(){
    return(
    <div className="bg-[#1a1a1a] text-white p-6 md:p-10">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
    {/* Car Image */}
   <div className="relative w-full h-[500px] rounded-lg shadow-lg">
  <Image
    src="/image/carrentals (2).jpg"
    alt="Car Rental"
    fill
    className="object-cover rounded-lg"
  />
</div>

    {/* Text Content */}
    <div className="text-center md:text-left space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold">CAR RENTAL SERVICES</h2>
      <p className="text-gray-300 leading-relaxed">
       Experience unmatched comfort and sophistication with G&V Support Services Limited’s executive luxury car rental service, ideal for expatriate business travel, special occasions,
        and exclusive nightlife services with presence in Lagos, Abuja, Edo, Rivers, Imo, Delta and Akwa Ibom States.
        Enjoy our sleek sedans and spacious SUVs tailored to your style and needs
      </p>
      <button className="mt-4 px-6 py-2 bg-black border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300">
        RESERVE
      </button>
    </div>
  </div>
</div>

    )
}