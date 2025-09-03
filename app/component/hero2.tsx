"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCarSide, FaPassport, FaSearch, FaMoneyBillWave } from "react-icons/fa";

interface Service {
  title: string;
  bgImage: string;
  icon?: React.ReactNode;
}

interface ServicesRowProps {
  services: Service[];
}

const servicesData: Service[] = [
  {
    title: "mobility",
    bgImage: "/image/last.jpg",
    icon: <FaCarSide size={48} className="text-black opacity-90" />,
  },
  {
    title: "immigration",
    bgImage: "/image/immigration.jpg",
    icon: <FaPassport size={48} className="text-black opacity-90" />,
  },
  {
    title: "Our Homes",
    bgImage: "/image/homes.jpg",
    icon: <FaSearch size={48} className="text-white opacity-90" />,
  },
  {
    title: "remuneration",
    bgImage: "/path/to/remuneration-man-baking.jpg",
    icon: <FaMoneyBillWave size={48} className="text-white opacity-90" />,
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: 50 }, // slide in from right
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2, // stagger
      duration: 0.10,
      ease: "easeOut",
    },
  }),
};

const ServicesRow: React.FC<ServicesRowProps> = ({ services }) => {
 
  return (
    <motion.div
      className="  flex justify-around w-full py-10 h-auto flex-wrap gap-6"
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
          {/* Main circular image with hover animation */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-100 h-100 rounded-full overflow-hidden relative shadow-lg"
          >
            <Image
              src={service.bgImage}
              alt={service.title}
              fill
              className="object-cover"
            />
            {/* Blur overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-white text-lg font-semibold bg-amber-200 p-5 pointer-coarse:">
                Read More .............................
              </span>
            </div>
          </motion.div>

          {/* Icon */}
          <div className="mt-3 flex justify-center">{service.icon}</div>

          {/* Title */}
          <p className="text-[#b95715] text-xl mt-2 font-bold">{service.title}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};


