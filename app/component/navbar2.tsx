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
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`);
  const isHomePage = pathname === "/";
  const isServicesPage = pathname.startsWith("/services");
  const useElevatedNavbar = isScrolled || isServicesPage || menuOpen;
  const useWarmHomeNavbar = isHomePage && !useElevatedNavbar;
  const navTextColor = useElevatedNavbar
    ? "text-[#f7ede3]"
    : useWarmHomeNavbar
      ? "text-[#3a2113]"
      : "text-white";
  const navLinkColor = useElevatedNavbar
    ? "text-[#f7ede3] hover:text-[#ffbf94]"
    : useWarmHomeNavbar
      ? "text-[#4b2a17] hover:text-[#c8612b]"
      : "text-white hover:text-[#ffd4b8]";
  const brandAccentColor = useElevatedNavbar
    ? "text-[#ffb27d]"
    : useWarmHomeNavbar
      ? "text-[#b65017]"
      : "text-[#dd5500]";
  const navSurfaceClass = useElevatedNavbar
    ? "border-b border-white/10 bg-[#120b06]/88 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.85)] backdrop-blur-md"
    : useWarmHomeNavbar
      ? "border-b border-[#ead8c8]/70 bg-[#fff9f1]/82 shadow-[0_18px_42px_-32px_rgba(83,34,12,0.42)] backdrop-blur-md"
      : "bg-transparent";
  const contactButtonClass = useElevatedNavbar
    ? "rounded-full bg-[#fff8f1] px-5 py-3 font-medium text-[#a5430c] shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl"
    : useWarmHomeNavbar
      ? "rounded-full bg-[#cf5f1f] px-5 py-3 font-medium text-white shadow-[0_18px_36px_-26px_rgba(177,84,25,0.75)] transition-all duration-300 hover:bg-[#b9521a] hover:shadow-xl"
      : "rounded-full bg-[#fff8f1] px-5 py-3 font-medium text-[#a5430c] shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl";

  return (
    <nav className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${navSurfaceClass}`}>
      <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center"
          >
            <Link href="/" className="shrink-0">
              <Image
                src="/image/G & V SUPPORT SERVICE ltd (2).png"
                height={50}
                width={80}
                alt="GVSS Logo"
                className="h-12 w-auto object-contain sm:h-14"
              />
            </Link>

            <Link
              href="/"
              className={`ml-3 min-w-0 text-sm font-medium leading-tight tracking-tight sm:text-base lg:text-lg xl:text-[1.35rem] ${montserrat.className} ${navTextColor}`}
            >
              <span className={`${brandAccentColor} mx-3`}>G&V Support</span>
              <span className={brandAccentColor}>
                Services Limited
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="hidden items-center gap-5 text-sm xl:flex 2xl:gap-7">
          {navLinks.map(({ href, label, dropdown }, index) => (
            <div key={`${href}-${index}`} className="group relative text-white">
              <Link
                href={normalizePath(href)}
                className={`font-medium transition-colors ${navLinkColor}`}
              >
                {label}
              </Link>

              {dropdown && (
                <ul className="invisible absolute left-0 mt-2 w-60 translate-y-2 rounded-2xl border border-[#ead9cb] bg-[#fffaf5] py-2 opacity-0 shadow-lg transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {dropdown.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-[#2a1d13] transition-colors hover:text-[#cf6c3d]"
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
            className={contactButtonClass}
          >
            Contact Us
          </Link>
        </div>

        <div className="xl:hidden">
          <button
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className={`transition-transform duration-300 ease-in-out ${
              useElevatedNavbar
                ? "text-[#ffb27d]"
                : useWarmHomeNavbar
                  ? "text-[#cf5f1f]"
                  : "text-white"
            }`}
          >
            {menuOpen ? (
              <HiX size={30} className="rotate-90 transition-transform duration-300" />
            ) : (
              <HiMenu size={30} className="scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out xl:hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 bg-white px-4 py-4 shadow-lg sm:px-6">
          {navLinks.map(({ href, label, dropdown }, index) => (
            <div key={`${href}-${index}`} className="border-b border-gray-200 py-2">
              <div className="flex items-center justify-between gap-3 text-black">
                <Link
                  href={normalizePath(href)}
                  className="font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>

                {dropdown && (
                  <button
                    onClick={() =>
                      setOpenDropdown((current) => (current === index ? null : index))
                    }
                    aria-label={`Toggle ${typeof label === "string" ? label : "menu"} submenu`}
                    className="text-black transition-transform duration-300"
                  >
                    <HiPlus
                      size={20}
                      className={`transition-transform duration-300 ease-in-out ${
                        openDropdown === index ? "rotate-45" : "rotate-0"
                      }`}
                    />
                  </button>
                )}
              </div>

              {dropdown && openDropdown === index && (
                <ul className="mt-2 rounded-md p-2 transition-all duration-300 ease-in-out">
                  {dropdown.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-2 text-black transition-colors hover:text-[#ffffff]"
                        onClick={() => setMenuOpen(false)}
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
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#dd5500] px-4 py-3 font-medium text-white transition-colors hover:bg-[#c54400]"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
      </nav>
  );
}
