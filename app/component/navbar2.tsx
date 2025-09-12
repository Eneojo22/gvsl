"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX, HiPlus, HiMinus } from "react-icons/hi";
import { Montserrat } from 'next/font/google';
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
});


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
 const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
  {
    href: "/aboutUs",
    label: "ABOUT US ",
    dropdown: [
      { name: "Company Information", href: "/aboutUs/companyInformation" },
      { name: "Team Info", href: "/aboutUs/teamInfo" },
      { name: "Events", href: "/aboutUs/Event" },
      { name: "Testimonials", href: "/aboutUs/Testimonials" },
    ],
  },
  {
    href: "#",
    label: "SERVICES",
    // highlight: true,
    dropdown: [
      { name: "Orientation", href: "/component/orientation" },
      { name: "Airport Meet and Greet", href: "/component/airportmeetandgreet" },
      { name: "LeadsWoods Home", href: "/component/ourapartment" },
      { name: "LeadsWoods Furniture", href: "/LeadwoodsFuniture" },
      { name: "Settling-in", href: "/services/item7" },
      { name: "Departure Services", href: "/component/departureservices" },
      { name: "Chauffeur Services", href: "/component/carrentals" },
    ],
  },
  {
    href: "#",
    label: "RESOURCES ",
    dropdown: [
      { name: "Tips for succeeding in any african country", href: "/resources/item1" },
      { name: "successful landing  in nigerial ", href: "/resources/item2" },
      { name: "Businesses to do in Nigeria as a Forenig investor", href: "/resources/item2" },
      { name: "Hiding Gems in africa", href: "/resources/item2" },
    ],
  },
  { href: "/location", label: <><FaMapMarkerAlt className="inline mr-1" /> LOCATIONS</> },
  { href: "/component/contactUs", label: <><FaPhoneAlt className="inline mr-1" /> CONTACT US</> },
];

  const normalizePath = (path: string) => path.startsWith('/') ? path : '/' + path
// bg-[#ff3131]
  return (
    <nav
      className={`fixed top-0  left-0 w-full z-50  transition-colors duration-300 ${
        isScrolled ? " bg-[#000000] " : "bg-transparent font-bold  "
      }`}
    >
      <div className=" mx-auto px-6 py-4 flex justify-between  items-center relative\">
        {/* Logo */}
        <div className="flex items-center ">

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center"
        >
          <Image
            src="/image/G___V_SUPPORT_SERVICE_ltd__7_-removebg-preview.png"
            height={50}
            width={80}
            alt="GVSS Logo"
            className="object-contain"
          />
          </motion.div>
        <h1
          className={`md:text-3xl font-bold tracking-tight  ${montserrat.className} 
          ${isScrolled ? "" : "text-[#000000] font-bold"
                }`}>
                  <span className="text-[#dd5500]">G&V Support</span> Services Limited
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm">
         {navLinks.map(({ href, label, dropdown }, index) => (
        <div key={`${href}-${index}`} className="relative group text-[#000000]">

              {/* <Link key={i} href={normalizePath(href)}></Link> */}
              <Link href={normalizePath(href)}
                className={`hover:text-[#cf6c3d] ${ "font-bold "}
                ${isScrolled ? "text-[#ffffff] font-bold":""}
                
                `}
              >
                {label}
              </Link>

              {dropdown && (
                <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-58 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50">
                  {dropdown.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 hover:text-[#cf6c3d] text-[#000000]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="border">
            <Link
                  href="/book-appointment"
                  className="bg-white text-[#dd5500] font-bold px-4 py-4 rounded shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
                >
            Book Appointment
            </Link>
          </div>
           
        </div>
        

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-[#dd5500] transition-transform duration-300 ease-in-out"
          >
            {menuOpen ? (
              <HiX size={28} className="rotate-90 transition-transform duration-300" />
            ) : (
              <HiMenu size={28} className="scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col text-sm px-6 py-4 bg-white shadow-lg">
          {/* {navLinks.map(({ href, label, highlight, dropdown }, idx) => (
            <div key={href} className="border-b border-gray-200 py-2"> */}
              {navLinks.map(({ href, label,  dropdown }, idx) => (
  <div key={`${href}-${idx}`} className="border-b border-gray-200 py-2">

              <div className="flex justify-between items-center text-black">
                <Link
                  href={href}
                  className={`${
                     "font-medium" 
                  }`}
                >
                  {label}
                </Link>
                    {dropdown && (
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === idx ? null : idx)
                        }
   
                        className="text-black transform transition-transform duration-300"
                      >
                        <HiPlus
                          size={20}
                          className={`transition-transform duration-300 ease-in-out ${
                            openDropdown === idx ? "rotate-45" : "rotate-0"
                          }`}
                        />
                      </button>
)}
              </div>

              {/* Centered Dropdown */}
              {dropdown && openDropdown === idx && (
                <ul className="mt-2  rounded-md p-2  transition-all duration-300 ease-in-out">
                  {dropdown.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className="block  py-2 hover:bg-gray-200 text-black"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}



 {/* Tablet Menu Toggle */}
      //   <div className="md:hidden">
    
      // </div>