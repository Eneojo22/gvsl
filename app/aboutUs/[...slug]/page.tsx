'use client'
import { use } from "react"

const Iteam2Details = () => {
  return (
    <div className="h-dvh bg-amber-950 text-black">
      Company Information... (content for items2)
    </div>
  )
}

export default function AboutPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);
  const slugArray = slug || [];
  const path = slugArray.join("/"); 

  // Start with no component
  let ContentComponent: React.ReactNode = null;
    let checkpath  = false
    //  This is for the routes manupulation 
  if (path === "Event") {
     ContentComponent = <div>
        <Link href="/" className="text-black  font-bold">Home</Link><strong> /</strong> {path || "home"}/
        <Event />
        </div>;
    checkpath  = true
    checkpath  = true
  } else if (path === "Testimonials") {
    ContentComponent = <div>
        <Link href="/" className="text-black  font-bold">Home</Link><strong> /</strong> {path || "home"}/
        <Testimonal />
        </div>;
    checkpath  = true
  } 
// The Output if no match is found and if found
return (
  !checkpath ? (
    <div className="p-6 text-black bg-yellow-200 mt-50">
      <h1 className="text-2xl font-bold">This Page can not be found</h1>
      <p className="mb-4">
        <strong>Path:</strong> {path || "home"}
      </p>
    </div>
  ) : (
    <div className="p-6 text-black  mt-50">
      {/* <h1 className="text-2xl font-bold">About Us Page</h1> */}
      {ContentComponent}
    </div>
  )
);
}


// import { ImageCarousel } from "../teamInfo/teaminfo";

import { ImageCarousel } from "../../aboutUs/teamInfo/teaminfo"
import { div } from "framer-motion/dist/types/client";
import Link from "next/link";

function Testimonal(){

    return (
         <ImageCarousel 
                    title="Our-Testimonials"
                          subtitle="we still have a long way to go but we are getting there"
                          image="/image/meetgreet.jpg"
                          overlayOpacity="bg-black/80"
                          height="h-[30vh]"
                  
                  />
    )
}
function Event(){

    return (
         <ImageCarousel 
                    title="Our Events"
                          subtitle="Our Events are designed to bring together individuals and families from diverse backgrounds to connect, learn, and celebrate their new beginnings in a supportive environment."
                          image="/image/meetgreet.jpg"
                          overlayOpacity="bg-black/80"
                          height="h-[30vh]"/>
    )
}