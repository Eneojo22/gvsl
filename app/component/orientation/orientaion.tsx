"use client";
import React from "react";
// import { calsans } from "@/fonts/calsans";
import { Cal_Sans } from "next/font/google";

import { twMerge } from "tailwind-merge";
// import { TracingBeam } from "../ui/tracing-beam";
import { TracingBeam } from "../uiforcomponent/tracing-beam";
import { div } from "framer-motion/client";

export function TracingBm() {
  return (
    <div className="pt-30 ">
      <TracingBeam className="">
      <div className="max-w-2xl mx-auto antialiased pt-4 text-black relative">
        {Content.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className= "text-xl mb-4">
              {item.title}
            </p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item?.image && (
                <img
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
        <p>Cultural Insight: We provide a deep understanding of local Nigerian culture, customs, and social norms to help you feel at home faster.

Neighborhood Information: We give you the inside scoop on the best neighborhoods, their unique characteristics, and what they offer in terms of lifestyle and amenities.

Housing Options: We provide an overview of housing options that fit your preferences and can even arrange viewings of sample accommodations.

Education and Schools: We help you navigate the local school system, offering information on reputable schools for your children.

s.</p>
          
        
      </>
    ),
    // badge: "Changelog",
    image:
     "/image/cultural.jpg",
  },
  {
    title: "Neighborhood Information",
    description: (
      <>
        <p>Choosing the right neighborhood is one of the most important decisions you'll make.
           We don't just point you to a map; we give you the inside scoop. 
           Our team provides detailed profiles of various neighborhoods in major cities like Lagos and Abuja. We'll highlight the unique characteristics of each area—from the bustling, cosmopolitan vibe of Lekki to the more laid-back, family-friendly atmosphere of Ikeja. We'll help you understand the local amenities, traffic patterns, security considerations, and social scenes so you can choose a location that perfectly fits your lifestyle.

</p>
      </>
    ),
    // badge: "Launch Week",
    image:
      "/image/cultural.jpg",
  },
];
