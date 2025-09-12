'use client'
import React, { useState } from 'react'
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const AboutusLandingingpage = () => {
  return (
    <div><Section/></div>
  )
}

export default AboutusLandingingpage

interface HeroMessage {
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  image: string;
}

const Messages: HeroMessage[] = [
  
  {
    title: "Our Team",
    description: "Take a Look at our wonderful and extraordinary team who work seamlessly to make you feel comfortable and warming.",
    cta: "Our Teams",
    ctaLink: "aboutUs/teamInfo",
     image: "/image/immigration.jpg"
    // image: "/image/meetgreet.jpg"
  },
  {
    title: "Our Events",
    description: "Find your perfect home with our expert guidance and support.",
    cta: "The Main Events",
    ctaLink: "aboutUs/Event",
     image: "/image/immigration.jpg"
    // image: "/image/"
  }
  ,
  {
    title: "Our Testimonials ",
    description: "We give you the best funitures for your Apartment.",
    cta: "Explore Testimonials",
    ctaLink: "aboutUs/Testimonials",
     image: "/image/immigration.jpg"
    // image: "/image/"
  }
];


const Section = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  useEffect(() => {
    const transitionDuration = 100; // 0.5 second for fade out/in
    const displayDuration = 3000;    // 3 seconds display time


    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % Messages.length);
      setIsTransitioning(true);

      setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);   

    }, displayDuration + transitionDuration); 
    return() => clearInterval(interval)
},[]);
const currentMessage = Messages[currentMessageIndex];
  
return(
        <section className="text-white md:h-hdv flex  items-center relative  bg-gradient-to-r from-[#000000] to-[#ffffff]">
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
            <h1 className="md:text-8xl text-5xl   text-center p-5 text-[#ec3700] md:text-black  font-extrabold mb-4 animate-fade">
              {currentMessage.title}
            </h1>
            <p className="text-lg  text-center text-[12px] font-bold pb-3.5 mb-6 animate-fade">
              {currentMessage.description}
            </p>
            <button className="bg-[#000] text-[#e64201] md:text-[13] font-semibold py-3 w-70 rounded  transition animate-fade">
             <Link href={currentMessage.ctaLink}>{currentMessage.cta} </Link> 
            </button>
          </div>
        </section>
)
}  