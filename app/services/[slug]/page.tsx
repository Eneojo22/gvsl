// 'use client'
import { use } from "react"
import { ImageCarousel } from "../../aboutUs/teamInfo/teaminfo"


function Settlings(){

return (
         <ImageCarousel  title="Settling in Services" subtitle="we working on it ."image="/image/meetgreet.jpg"overlayOpacity="bg-black/80" height="h-[30vh]"/>
         )
}
export default async function Page({params,}: { params: Promise<{ slug: string }>;}) {
  const { slug } = await params;
  // console.log(slug);

  if (slug === "Settling-in") {
    return (
      <div className="h-dvh">
       
        <Settlings />
         {/* <Link href="/" className="text-black font-bold">
          servicesddd
        </Link> */}
        <strong> /</strong> {slug || "home"}/
      </div>
    );
  }

  return <div className="h-100 mt-35 flex   justify-center items-center text-black text-4xl font-bold">
    Can't find this post: {slug} </div>;
}