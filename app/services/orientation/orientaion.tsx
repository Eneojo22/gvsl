"use client";
import React from "react";

import Image from "next/image";

import { twMerge } from "tailwind-merge";
// import { TracingBeam } from "../ui/tracing-beam";
import { TracingBeam } from "../../component/uiforcomponent/tracing-beam";


export function TracingBm() {
  return (
    <div className="pt-30 ">
      
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
    </div>
    
  );
}

const Content = [
  {
    title: "Our Approach to Orientation & Area Tours",
    description: (
      <>
       <p>
At G&V Support Services, we understand that every relocation journey is unique. 
A one-size-fits-all approach simply does not work. Each individual and family 
has different needs, expectations, and concerns when moving to a new country. 
That is why our Destination Consultants, with their first-hand experience of 
living in Nigeria, are dedicated to creating a personalized orientation 
experience tailored specifically for you.
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
       <div className="space-y-3">
  <p>
    <strong>Cultural Insight:</strong> We provide a deep understanding of Nigerian culture, customs, and social norms to help you adapt quickly and feel at home.
  </p>

  <p>
    <strong>Neighborhood Information:</strong> We offer valuable insights into the best neighborhoods, highlighting their unique characteristics and the lifestyle and amenities they provide.
  </p>

  <p>
    <strong>Housing Options:</strong> We present a range of housing options that match your preferences and can also arrange viewings of selected accommodations.
  </p>

  <p>
    <strong>Education and Schools:</strong> We guide you through the local education system, providing information on reputable schools and helping you find the best options for your children.
  </p>
</div>
      </>
    ),
    // badge: "Changelog",
    image:
     "/image/cultural.jpg",
  },
  
];
