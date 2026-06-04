"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiMenu, HiPlus, HiX } from "react-icons/hi";

const montserrat = Montserrat({
  weight: ["500", "600"],
  subsets: ["latin"],
});

/* ================= NAV LINKS ================= */
const navLinks = [
  {
    href: "/aboutUs",
    label: "ABOUT US",
    dropdown: [
      { name: "Company Information", href: "/aboutUs/companyInformation" },
      { name: "Team Info", href: "/aboutUs/teamInfo" },
      { name: "Events", href: "/aboutUs/Event" },
      { name: "Testimonials", href: "/aboutUs/Testimonials" },
      { name: "Feedback", href: "/aboutUs/feedback" },
    ],
  },
  {
    href: "/",
    label: "SERVICES",
    dropdown: [
      { name: "Orientation", href: "/services/orientation" },
      { name: "Airport Meet and Greet", href: "/services/airportmeetandgreet" },
      { name: "LeadWood Homes", href: "/services/leadwoodhomes" },
      { name: "LeadWood Furniture", href: "/services/leadwoodfurniture" },
      { name: "Departure Services", href: "/services/departureservices" },
      { name: "Chauffeur Services", href: "/services/rentals" },
    ],
  },
  {
    href: "/location",
    label: (
      <>
        <FaMapMarkerAlt className="inline mr-1" />
        LOCATIONS
      </>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();

  /* ================= STATE ================= */
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  /* ================= SCROLL DETECTION ================= */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on page change */
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  /* ================= HELPERS ================= */
  const normalizePath = (path: string) =>
    path.startsWith("/") ? path : `/${path}`;

  const isHomePage = pathname === "/";
  const isServicesPage = pathname.startsWith("/services");

  const useElevatedNavbar = isScrolled || isServicesPage || menuOpen;
  const useWarmHomeNavbar = isHomePage && !useElevatedNavbar;

  /* ================= DYNAMIC COLORS ================= */
  const navTextColor = useElevatedNavbar
    ? "text-[#f7ede3]"
    : useWarmHomeNavbar
    ? "text-[#3a2113]"
    : "text-white";

  const navLinkColor = useElevatedNavbar
    ? "text-[#f7ede3] hover:text-[#ffb27d]"
    : useWarmHomeNavbar
    ? "text-[#4b2a17] hover:text-[#c8612b]"
    : "text-white hover:text-[#ffd4b8]";

  const brandAccentColor = useElevatedNavbar
    ? "text-[#ffb27d]"
    : useWarmHomeNavbar
    ? "text-[#b65017]"
    : "text-[#dd5500]";

  /* Navbar background */
  const navSurfaceClass = useElevatedNavbar
    ? "bg-[#000000] border-b border-white/10 backdrop-blur-md shadow-lg"
    : useWarmHomeNavbar
    ? "bg-[#000]/85 border-b border-[#ead8c8] backdrop-blur-md shadow-md"
    : "bg-transparent";

  /* Contact button */
  const contactButtonClass = useElevatedNavbar
    ? "bg-[#fff8f1] text-[#a5430c] hover:bg-white"
    : "bg-[#cf5f1f] text-white hover:bg-[#b9521a]";

  /* ================= UI ================= */
  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${navSurfaceClass}`}
    >
      <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <Link href="/">
              <Image
                src="/image/logoooo.png"
                width={80}
                height={50}
                alt="GVSS Logo"
                className="h-12 w-auto sm:h-14"
              />
            </Link>

            <Link
              href="/"
              className={`ml-3 font-medium ${montserrat.className} ${navTextColor}`}
            >
              <span className="text-[#ff8000] mx-2">
                G&V Support
              </span>
             <span className="text-white">Services Limited</span> 
            </Link>
          </motion.div>
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden xl:flex items-center gap-6 text-sm">
          {navLinks.map(({ href, label, dropdown }, index) => (
            <div key={index} className="relative group">
              <Link
                href={normalizePath(href)}
                className={`font-medium text-white`}
              >
                {label}
              </Link>

              {/* Dropdown */}
              {dropdown && (
                <ul className="absolute left-0 mt-2 w-60 rounded-xl bg-[#120b06] border border-white/10 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all">
                  {dropdown.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-[#f7ede3] hover:text-[#ffb27d]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <Link
            href="/contact-us"
            className={`px-5 py-2 rounded-full font-medium transition ${contactButtonClass}`}
          >
            Contact Us
          </Link>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <div className="xl:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={useElevatedNavbar ? "text-[#ffb27d]" : "text-white"}
          >
            {menuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#ff9040] px-4 py-4 space-y-2">

          {navLinks.map(({ href, label, dropdown }, index) => (
            <div
              key={index}
              className="border-b border-white/10 py-2"
            >
              <div className="flex justify-between items-center">

                {/* Main link */}
                <Link
                  href={normalizePath(href)}
                  className="text-[#f7ede3]"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>

                {/* Dropdown toggle */}
                {dropdown && (
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === index ? null : index
                      )
                    }
                    className="text-[#ffb27d]"
                  >
                    <HiPlus
                      className={
                        openDropdown === index ? "rotate-45" : ""
                      }
                    />
                  </button>
                )}
              </div>

              {/* Dropdown items */}
              {dropdown && openDropdown === index && (
                <div className="mt-2 pl-3">
                  {dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-[#f7ede3] hover:text-[#ffb27d]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Contact button */}
          <Link
            href="/contact-us"
            className="block text-center bg-[#dd5500] text-white py-3 rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}