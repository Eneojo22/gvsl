"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar2";
import { HoverEffect } from "./uiforcomponent/sectionsumary";
import { CardsCarousel } from "./courasel";

interface HeroMessage {
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  image: string;
}

const heroMessages: HeroMessage[] = [
  {
    title: "Your Journey Starts Here",
    description:
      "At G&V Support Services Limited, we transform relocation challenges into smooth, effortless experiences.",
    cta: "Explore Our Services",
    ctaLink: "/services/airportmeetandgreet",
    image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg",
  },
  {
    title: "Seamless Relocation",
    description:
      "From airport pickup to settling in, we handle every detail of your move.",
    cta: "Airport Meet and Greet",
    ctaLink: "/services/airportmeetandgreet",
    image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg",
  },
  {
    title: "Our Apartment Solutions",
    description:
      "Find your ideal apartment with expert local guidance and support.",
    cta: "Leadwoods Homes",
    ctaLink: "/services/ourapartment",
    image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg",
  },
  {
    title: "Our Luxurious Furniture",
    description: "We provide premium furniture options for your apartment.",
    cta: "Leadwoods Furniture",
    ctaLink: "/services/LeadwoodsFuniture",
    image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg",
  },
];

const packages = [
  { imageUrl: "/image/leadhome-removebg-preview.png" },
  { imageUrl: "/image/download (1).png" },
  { imageUrl: "/image/download (5).png" },
  { imageUrl: "/image/download (4).png" },
  { imageUrl: "/image/download (2).png" },
  { imageUrl: "/image/download.png" },
  { imageUrl: "/image/download (3).png" },
];

const Landingpage = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <HeroSection />
      <CardHoverEffect />
      <CardsCarousel />
      <OurSponsors />
    </div>
  );
};

const OurSponsors = () => {
  return (
    <section className="bg-white py-10 mb-12">
      <h2 className="text-center text-black text-3xl font-semibold mb-8">Our Partners</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6 px-6 md:px-12">
        {packages.map((sponsor, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-white p-4 rounded-lg transition"
          >
            <Image
              src={sponsor.imageUrl}
              alt={`Partner logo ${index + 1}`}
              width={200}
              height={100}
              className="w-full h-20 md:h-24 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const HeroSection: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const transitionDuration = 1000;
    const displayDuration = 6000;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      timeoutId = setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % heroMessages.length);
        setIsTransitioning(false);
      }, transitionDuration);
    }, displayDuration + transitionDuration);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const currentMessage = heroMessages[currentMessageIndex];

  return (
    <section className="text-white min-h-screen flex items-center relative bg-gradient-to-r from-[#000000] to-[#868585]">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isTransitioning ? "opacity-0" : "opacity-50"
        }`}
      >
        <Image
          src={currentMessage.image}
          alt={currentMessage.title}
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
      </div>

      <div className="z-10 flex flex-col justify-center items-center mx-auto min-h-screen text-left px-4">
        <h1 className="md:text-8xl text-5xl text-center p-5 text-black md:text-white font-extrabold mb-4 animate-fade">
          {currentMessage.title}
        </h1>
        <p className="text-lg text-center pb-3.5 mb-6 animate-fade max-w-3xl">
          {currentMessage.description}
        </p>
        <Link
          href={currentMessage.ctaLink}
          className="bg-white text-[#c93e08] text-lg md:text-2xl font-semibold p-3 md:py-5 md:px-10 rounded transition animate-fade hover:bg-[#f3f3f3]"
        >
          {currentMessage.cta}
        </Link>
      </div>
    </section>
  );
};

export function CardHoverEffect() {
  return (
    <div className="md:min-h-screen border-2 px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Leadwoods Home",
    description:
      "Through our partnership with Leads Woods Homes, we offer luxurious homes designed for comfort and elegance with modern amenities and secure locations.",
    link: "/services/ourapartment",
  },
  {
    title: "LeadWoods Furniture",
    description:
      "Our homes are crafted from nature's finest woods, using sustainably sourced, high-quality materials that balance durability with beauty.",
    link: "/services/LeadwoodsFuniture",
  },
  {
    title: "Airport Meet and Greet",
    description:
      "We warmly welcome clients with personalized airport support, from customs assistance to smooth transport and local onboarding.",
    link: "/services/airportmeetandgreet",
  },
  {
    title: "Our Car Rental Services",
    description:
      "Our car rental service provides reliable transportation with well-maintained vehicles and professional drivers across Nigeria.",
    link: "/services/carrentals",
  },
  {
    title: "Our Orientation",
    description:
      "Our orientation program covers local customs, legal basics, safety guidance, and community resources to help clients settle confidently.",
    link: "/services/orientation",
  },
];

export default Landingpage;
