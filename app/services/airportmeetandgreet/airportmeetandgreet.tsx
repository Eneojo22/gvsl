import React from 'react';
import Image from 'next/image';

const Airportmeetandgreet = () => {
  return (
    <>
      <div className="bobi2 w-full z-40 text-black mt-40">
        <Hero
          title="Welcome to Nigeria"
          subtitle="Seamless Airport Meet & Greet"
          image="/image/meetgreet.jpg"
          overlayOpacity="bg-black/50"
          height="h-[30vh]"
        />
      </div>
      <div className="w-full p-10 mt-10">
        <div className="text-[#333333]  md:m-auto  ">
          <div className=" md:text-4xl text-2xl  font-bold md:m-3">Airport Meet and Greet</div>
          The first moments in a new country can set the tone for your entire experience. At G&V Support Services,
          we believe your arrival should be as welcoming and stress-free as possible.
          Our Airport Meet & Greet service is designed to take the burden off your shoulders,
          ensuring a smooth transition from the moment you land.

          <p className="text-2xl m-3">Your Personal Welcome Committee</p>
          Our dedicated Destination Consultants aren&apos;t just staff; they are your first point of contact and an expert guide. Who knows the ins and outs of Nigerian airports, and we&apos;ll be there to meet you directly at your port of entry. From navigating customs to handling luggage, your personal consultant will be by your side, ready to assist with any immediate needs. This is more than just a pickup service—it&apos;s a friendly face and a helping hand that makes all the difference after a long flight.

          <p className="text-2xl m-3">A Coordinated & Effortless Transition</p>
          We understand that you have a lot on your mind, which is why we handle all the logistics behind the scenes. Before your flight, we coordinate with you and your company&apos;s HR or relocation manager to confirm all details, ensuring a perfectly timed and executed plan. Once you land, your consultant will escort you to a pre-arranged, comfortable vehicle and take you directly to your accommodation. We&apos;ll even help you with the check-in process, ensuring you can settle into your temporary home without any unnecessary delays or complications.
          Our support doesn&apos;t end at the curb. We know that special circumstances can arise. Whether it&apos;s a need for a child&apos;s car seat, a specific type of vehicle, or any other personal requirement, we make a note of it and organize it in advance. Our goal is to anticipate your needs and handle all practical and personal concerns efficiently, allowing you to bypass the initial stress of a new environment and start your journey in Nigeria with confidence and peace of mind.
        </div>
      </div>
    </>
  );
};

export default Airportmeetandgreet;

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  overlayOpacity?: string; // e.g. "bg-black/40"
  height?: string; // e.g. "h-[60vh]" or "h-screen"
}

export  function Hero({
  title,
  subtitle,
  image,
  overlayOpacity = 'bg-black/40',
  height = 'h-[30vh]',
}: HeroProps) {
  return (
    <section className={`relative ${height} w-full flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      <Image src={image} alt={title} fill priority className="object-cover object-center" />

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