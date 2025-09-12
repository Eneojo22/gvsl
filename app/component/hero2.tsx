"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants, easeOut } from "framer-motion";
import { FaCarSide, FaPassport, FaSearch, FaMoneyBillWave } from "react-icons/fa";

interface Service {
  title: string;
  bgImage: string;
  icon?: React.ReactNode;
}

interface ServicesRowProps {
  services: Service[];
}

// ✅ Animation variants with TypeScript-friendly easing
const itemVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: easeOut,
    },
  }),
};

const ServicesRow: React.FC<ServicesRowProps> = ({ services }) => {
  return (
    <motion.div
      className="flex justify-around w-full py-10 h-auto flex-wrap gap-6"
      initial="hidden"
      animate="visible"
    >
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="text-center relative group"
          variants={itemVariants}
          custom={index}
        >
          {/* Circular image with hover effect */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg"
          >
            <Image
              src={service.bgImage}
              alt={service.title}
              fill
              className="object-cover"
            />

            {/* Blur overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-black text-lg font-semibold bg-amber-200 px-4 py-2 rounded-lg shadow">
                Read More →
              </span>
            </div>
          </motion.div>

          {/* Icon with hover scale */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mt-3 flex justify-center"
          >
            {service.icon}
          </motion.div>

          {/* Title */}
          <motion.p
            whileHover={{ color: "#b95715" }}
            className="text-neutral-800 dark:text-white text-xl mt-2 font-bold"
          >
            {service.title}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ServicesRow;
