import React from 'react'
import Image from 'next/image'
const Airportmeetandgreet = () => {
  return (
  <>
     <div className='bobi2  w-full z-40 text-black mt-40 '>
                <Hero
            title="Welcome to Nigeria"
            subtitle="Seamless Airport Meet & Greet"
            image="/image/meetgreet.jpg"
            overlayOpacity="bg-black/50"
            height="h-[30vh]"
          />
        </div>
       <div className="w-full p-10 mt-10 ">
                {/* <h1 className="text-2xl font-bold text-[#dd5500] mb-2">Nigeria</h1> */}
                {/* <p className='text-[#333333] w-1/2 m-auto '>
                  
                  Seamless Airport Meet & Greet
                    Arriving in a new country can be overwhelming, but with G&V Support Services, you'll be greeted by a friendly face that's ready to help. Our Airport Meet & Greet service ensures a smooth and stress-free arrival for you and your family.

                    We understand how daunting it can be to land in a new city. Our Destination Consultants are here to ease that pressure by handling every detail, so you can relax and settle in without a hitch.
                </p> */}
                <p className='text-[#333333] w-200 m-auto p-7'>
                  
                 <p className='text-4xl font-bold m-3'>Airport Meet and Greet</p>

                  The first moments in a new country can set the tone for your entire experience. At G&V Support Services, 
                  we believe your arrival should be as welcoming and stress-free as possible.
                   Our Airport Meet & Greet service is designed to take the burden off your shoulders, 
                   ensuring a smooth transition from the moment you land.
                  

                 <p className='text-2xl m-3'> Your Personal Welcome Committee</p>
                  Our dedicated Destination Consultants aren't just staff; they are your first point of contact and an expert guide. Who knows the ins and outs of Nigerian airports, and we'll be there to meet you directly at your port of entry. From navigating customs to handling luggage, your personal consultant will be by your side, ready to assist with any immediate needs. This is more than just a pickup service—it's a friendly face and a helping hand that makes all the difference after a long flight.

                 <p className='text-2xl m-3'>  A Coordinated & Effortless Transition</p>
                  We understand that you have a lot on your mind, which is why we handle all the logistics behind the scenes. Before your flight, we coordinate with you and your company's HR or relocation manager to confirm all details, ensuring a perfectly timed and executed plan. Once you land, your consultant will escort you to a pre-arranged, comfortable vehicle and take you directly to your accommodation. We'll even help you with the check-in process, ensuring you can settle into your temporary home without any unnecessary delays or complications.
                    Our support doesn't end at the curb. We know that special circumstances can arise. Whether it's a need for a child's car seat, a specific type of vehicle, or any other personal requirement, we make a note of it and organize it in advance. Our goal is to anticipate your needs and handle all practical and personal concerns efficiently, allowing you to bypass the initial stress of a new environment and start your journey in Nigeria with confidence and peace of mind.
                </p>
                {/* <p className="text-gray-700 mb-4">
                  Overview <br />
                  Angola, officially the Republic of Angola (República de Angola), is a sovereign state in Central Africa and the west coast of Southern Africa. It is the second largest lusophone (Portuguese-speaking) country in both total area and population (behind Brazil), and it is the seventh-largest country in Africa, bordered by Namibia to the south, the Democratic Republic of the Congo to the north, Zambia to the east, and the Atlantic Ocean to the west. Angola has an enclave province of Cabinda that borders the Republic of the Congo and the Democratic Republic of the Congo. The capital and largest city is Luanda. <br /> <br />
                  Angola is a member of the United Nations, OPEC, African Union, the Community of Portuguese Language Countries, and the Southern African Development Community, and has a multicultural and multiethnic population.
                </p> */}
                
              </div>



        </> 
  )
}

export default Airportmeetandgreet


interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  overlayOpacity?: string; // e.g. "bg-black/40"
  height?: string; // e.g. "h-[60vh]" or "h-screen"
}
export function Hero({
  title,
  subtitle,
  image,
  overlayOpacity = "bg-black/40",
  height = "h-[30vh]",
}: HeroProps) {
  return (
    <section className={`relative ${height} w-full flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
