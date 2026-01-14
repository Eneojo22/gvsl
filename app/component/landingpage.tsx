"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './navbar2';
import { HoverEffect } from './uiforcomponent/sectionsumary';
import { CardsCarousel } from './courasel';
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
    description: "At G&V Support Services Limited, we transform the challenges of relocation into effortless experiences.",
    cta: "View all our locations",
    ctaLink: "/services/",
    image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg"
  },
  {
    title: "Seamless Relocation",
    description: "From airport pickup to settling in, we handle every detail of your move.",
    cta: "Our Services",
    ctaLink: "/services",
     image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg"
    // image: "/image/meetgreet.jpg"
  },
  {
    title: "Our Apartment Solutions",
    description: "Find your perfect home with our expert guidance and support.",
    cta: "Leadwoods Homes",
    ctaLink: "/housing",
     image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg"
    // image: "/image/"
  }
  ,
  {
    title: "Our Luxirous Funitures ",
    description: "We give you the best funitures for your Apartment.",
    cta: "Leadwoods Funitures",
    ctaLink: "/services/funitures",
     image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg"
    // image: "/image/"


  }
];

const Landingpage = () => {
  return (
    <>
      <div >
        <nav className="">
          <Navbar/>
        </nav>
        <HeroSection/>
        <CardHoverEffect/>
        <CardsCarousel/>
        <OurSponsors/>
        {/* <SectionforCarRebtals/> */}
      </div>

    </>
  );
};

const packages = [

  {
    
    imageUrl: "/image/leadhome-removebg-preview.png",
  },
  {
    
    imageUrl: "/image/download (1).png",
  },
  {
    
    imageUrl: "/image/download (5).png",
  },
  {
    
    imageUrl: "/image/download (4).png",
  },
  {
    
    imageUrl: "/image/download (2).png",
  },
  {
    
    imageUrl: "/image/download.png",
  },
  {
    
    imageUrl: "/image/download (3).png",
  },
  
];

const OurSponsors = () => {
  return (
    <section className="bg-white py-10 mb-50">
      <h2 className="text-center text-black text-3xl font-semibold mb-8">
        Our partners
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6 px-6 md:px-12">
        {packages.map((sponsor, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-white p-4 rounded-lg   transition"
          >
            <Image
              src={sponsor.imageUrl}
              alt={'pic'}
              width={200}
              height={100}
              className="w-full md:h-70 object-contain"
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
    const transitionDuration = 1000; // 1 second for fade out/in
    const displayDuration = 6000;    // 6 seconds display time
    
    const interval = setInterval(() => {
      // Start transition out
      setIsTransitioning(true);
      
      // After fade out completes, change message and fade in
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % heroMessages.length);
        setIsTransitioning(false);
      }, transitionDuration);
      
    }, displayDuration + transitionDuration);
    
    return () => clearInterval(interval);
  }, []);

  const currentMessage = heroMessages[currentMessageIndex];

return (
    <section className="text-white h-dvh flex  items-center relative  bg-gradient-to-r from-[#000000] to-[#868585]">
      {/* Background Image Blend */}
      <div className={`absolute inset-0 opacity-50 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-50'}`}>
        <Image
          src={currentMessage.image}
          alt={currentMessage.title}
          layout="fill"
          objectFit="cover"
          className="mix-blend-overlay"
          priority
        />
      </div>

      {/* Content */}
      <div className="z-10 flex flex-col justify-center items-center mx-auto h-dvh text-left px-4 ">
        <h1 className="md:text-8xl text-5xl  text-center p-5 text-[#000000] md:text-white  font-extrabold mb-4 animate-fade">
          {currentMessage.title}
        </h1>
        <p className="text-lg  text-center pb-3.5 mb-6 animate-fade">
          {currentMessage.description}
        </p>
        <button className="bg-[#fff] text-[#c93e08] text-2xl font-semibold p-3 md:py-5 md:px-10 rounded  transition animate-fade">
          {currentMessage.cta} 
        </button>
      </div>

      {/* Decorative Hexagon */}
      {/* <div
        className="absolute bottom-4 right-4 w-10 h-10 bg-yellow-400"
        style={hexagonClipPath}
      /> */}
    </section>
  );
};
export function CardHoverEffect() {
  return (
    <div className="  md:h-dvh  border-2 px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Leadwoods Home",
    description: "Through our partnership with Leads Woods Homes, we offer nice and luxurious homes designed for comfort and elegance. Our residences feature modern amenities, secure locations, and tailored designs to meet the unique needs of expatriates settling in Nigeria.",
    link: "/services/ourapartment",
  },
  {
    title: "LeadWoods Funitures",
    description: "Our homes are crafted from nature’s finest woods, showcasing sustainable, high-quality materials sourced responsibly. Leads Woods brings a natural gift to our clients, blending durability and beauty to create living spaces that reflect environmental stewardship.",
    link: "/services/LeadwoodsFuniture",
  },
  {
    title: "Airport Meet and Greet",
    description: "We warmly welcome clients with personalized airport meet-and-greet services. Our team ensures a smooth arrival in Nigeria with assistance through customs, transportation to accommodations, and an introduction to local support, setting a positive tone for their journey.",
    link: "/services/airportmeetandgreet",
  },
  {
    title: "Our Car Rental Services",
    description: "Our top-tier car rental services provide expatriates with reliable transportation across Nigeria. We offer well-maintained vehicles and professional drivers, ensuring clients reach their destinations effortlessly without the burden of owning or maintaining a car.",
    link: "/services/carrentals",
  },
  {
    title: "Our Orientation",
    description: "Our orientation program equips clients with essential knowledge to thrive in Nigeria. Covering local customs, legal requirements, safety tips, and community resources, we empower expatriates with the confidence to navigate their new environment successfully.",
    link: "/services/orientation",
  },
];


export default Landingpage;