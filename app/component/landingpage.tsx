"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './navbar2';
import { CardsCarousel } from './courasel';
import { HeroSectionOne, RideSection } from '../services/carrentals/carrental';
// import { Section } from './carrentals/carrental';
import { AboutSection } from './main-section';

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
    ctaLink: "/locations",
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
    ctaLink: "/funiture",
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
        <CardsCarousel/>
        {/* <RideSection/> */}
        <HeroSectionOne/>
        <SectionforCarRebtals/>
      </div>

    </>
  );
};



function SectionforCarRebtals(){
  return(
     <AboutSection
  // title="Expert Trade Facilitation"
  Subtitle="Our Chauffeur Services"
  end_subtle="We provide our client with  Professional drivers familiar with Nigerian roads, ideal for newcomers prioritizing safety."
  body="GVSS provides reliable, well-maintained vehicles for expatriates, ensuring safe and convenient transportation in Nigeria’s key cities (Lagos, Abuja, Port Harcourt)."
  buttonTitle=" learn More"
  backgroundImage="/image/carr.jpg"
/>
  )
}




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
        <button className="bg-[#fff] text-[#c93e08] text-2xl font-semibold py-7 px-10 rounded  transition animate-fade">
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

// Hexagon Clip Path
// const hexagonClipPath = {
//   clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
// };

export default Landingpage;