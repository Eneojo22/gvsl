import React from 'react'
import { useState,useEffect } from 'react';
import Image from 'next/image';
interface CarDisplayProps{
  bags: number;
  passengers: number;
    imageUrl: string;
  type:string;
  name:string;
}

const CarDisplay: CarDisplayProps[] = [
 {
    type: "Compact car",
    name: "Toyota Camry",
    passengers: 4,
    bags: 2,
    // doors: 4,
    imageUrl: "/image/compact-car.webp",
  },
   {
    type: "Premium car",
    name: "Benz",
    passengers: 4,
    bags: 2,
    // doors: 4,
    imageUrl: "/image/premium-sedan.webp",
  },
   {
    type: "Mini",
    name: "Mini Camry",
    passengers: 4,
    bags: 1,
    // doors: 4,
    imageUrl: "/image/mini.webp",
  },
  {
    type: "Luxury",
    name: "Toyota Luxury",
    passengers: 4,
    bags: 3,
    // doors: 4,
    imageUrl: "/image/hybrid-sedan.webp",
  },
  {
    type: "7-Seater",
    name: "Toyota",
    passengers: 7,
    bags: 7,
    // doors: 4,
    imageUrl: "/image/7-seater.webp",
  },


];

const CardisplayPage: React.FC = () => {
    
  return (
    <div className='mx-8' >
        <div className=' text-black py-10'>
            <p className='font-bold text-lg '>Your Time, Your Ride</p>
            <h3 className='font-extrabold md:text-6xl text-orange-500 my-4 '>Car Rental</h3>
            <p  className='font-extrabold md:text-4xl text-shadow-2xs  '>in Lagos,Abuja. Nigeria </p>
            <div>
                <p className='text-shadow-2xs text-[#5f5c5c] mt-5'> We stand for exciting mobility and tailored solutions. 
                    <p>We lead with innovation in the car-hire sector.</p>
                    High-quality customer service and seamless rental experiences
                </p>
            </div>
        </div>
        <div className=' py-10 '>
            <p className='text-shadow-2xs text-[#141212] m-5 w-full md:text-start text-center text-3xl font-bold'>Our Fleet of Rentals Cars</p>
            <DisplayDifferentCar/>
        </div>
        <div></div>
    </div>
    
  )
}
export default CardisplayPage

function DisplayDifferentCar(){
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
            setCurrentMessageIndex((prev) => (prev + 1) % CarDisplay.length);
            setIsTransitioning(false);
          }, transitionDuration);
          
        }, displayDuration + transitionDuration);
        
        return () => clearInterval(interval);
      }, []);
    
      const currentMessage =CarDisplay[currentMessageIndex];
    return(
         <section className="  flex  items-center relative   ">
          {/* Background Image Blend */}
          <div className={`text-black h-50 w-50  md:h-100   duration-1000 ${isTransitioning && 'opacity-100' }`}>
            <Image
              src={currentMessage.imageUrl}
              alt={currentMessage.name}
            //   layout="fill"
              objectFit="cover  "
              className="bg-cover"
              fill
            />
          </div>
    
          {/* Content */}
          <div className="z-50 flex flex-col justify-center items-center mx-auto  text-left px-4 ">
            
          </div>
    
          {/* Decorative Hexagon */}
          {/* <div
            className="absolute bottom-4 right-4 w-10 h-10 bg-yellow-400"
            style={hexagonClipPath}
          /> */}
        </section>
    )
}