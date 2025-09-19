"use client";
import React from "react";

import Image from "next/image";

import { twMerge } from "tailwind-merge";
// import { TracingBeam } from "../ui/tracing-beam";
import { TracingBeam } from "../../component/uiforcomponent/tracing-beam";


export function TracingBm() {
  return (
    <div className="pt-30 ">
      <TracingBeam className="">
      <div className="max-w-2xl mx-auto antialiased pt-4 text-black relative">
        {Content.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {/* {item.} */}
            </h2>

            <p className= "text-xl mb-4">
              {item.title}
            </p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item?.image && (
                <Image
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam></div>
    
  );
}

const Content = [
  {
    title: "Our Approach to Orientation & Area Tours",
    description: (
      <>
       <p>At G&V Support Services, we know that every relocation journey is unique. 
        A one-size-fits-all approach simply doesn't work. We understand that each individual and family h
        as a different set of needs and anxieties when moving to a new country. That's why our Destination Consultants, 
        with their first-hand experience of living in Nigeria,
         are dedicated to crafting a tailored orientation experience just for you.
         </p>
        
      
      </>
    ),
    // badge: "React",
    image:
      "/image/nigeria (1).jpg",
  },
  {
    title: "Cultural Insight",
    description: (
      <>
        <div>Cultural Insight: We provide a deep understanding of local Nigerian culture, customs, and social norms to help you feel at home faster.

            Neighborhood Information: We give you the inside scoop on the best neighborhoods, their unique characteristics, and what they offer in terms of lifestyle and amenities.

            Housing Options: We provide an overview of housing options that fit your preferences and can even arrange viewings of sample accommodations.

            Education and Schools: We help you navigate the local school system, offering information on reputable schools for your children.
            </div>
          
        
      </>
    ),
    // badge: "Changelog",
    image:
     "/image/cultural.jpg",
  },
  
];
