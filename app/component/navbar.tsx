
"use client"
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    {
      title: "Services",
      links: [
        { name: "Orientation", href: "/orientation" },
        { name: "Airport Meet and Greet", href: "/airport-meet" },
        { name: "Short-term Housing", href: "/short-term-housing" },
        { name: "Home Search", href: "/home-search" },
        { name: "Settling-in", href: "/settling-in" },
        { name: "Educational Assistance", href: "/educational-assistance" },
        { name: "Partner Support", href: "/partner-support" },
        { name: "Tenancy Management", href: "/tenancy-management" },
        { name: "Departure Services", href: "/departure-services" },
      ],
    },
    { title: "Products", href: "/products" },
    { title: "Locations", href: "/locations" },
    { title: "Training", href: "/training" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full">
      {/* Top Info Bar */}
      <div className="bg-[#8ab4f7] text-black text-sm text-center py-2 px-4">
        Our new Virtually-there service enables full destination services to be
        provided remotely with complete safety to transferees and assignees
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#1f2b6c] text-white px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold">GVSS</div>

          {/* Desktop + Tablet Menu */}
          <ul className="hidden sm:flex gap-6 items-center">
            {menuItems.map((item, index) =>
              item.links ? (
                <li
                  key={index}
                  className="relative group"
                  onClick={() =>
                    setOpenDropdown(openDropdown === index ? null : index)
                  }
                >
                  <div className="flex items-center gap-1 cursor-pointer">
                    {item.title}
                    <FaChevronDown size={12} />
                  </div>

                  {/* Desktop hover / Tablet click dropdown */}
                  <ul
                    className={`absolute left-0 mt-2 bg-white text-black shadow-lg rounded min-w-[200px] transition-all ${
                      openDropdown === index
                        ? "block"
                        : "hidden sm:group-hover:block lg:group-hover:block"
                    }`}
                  >
                    {item.links.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <Link href={subItem.href}>{subItem.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={index}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden text-2xl"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <ul className="sm:hidden mt-4 flex flex-col gap-4 bg-[#1f2b6c] p-4 rounded">
            {menuItems.map((item, index) =>
              item.links ? (
                <li key={index}>
                  <details>
                    <summary className="cursor-pointer">{item.title}</summary>
                    <ul className="ml-4 mt-2 flex flex-col gap-2">
                      {item.links.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link href={subItem.href}>{subItem.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={index}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              )
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}
