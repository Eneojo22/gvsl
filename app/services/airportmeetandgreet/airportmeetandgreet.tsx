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
        <div className="text-[#333333] md:m-auto">
  <div className="md:text-4xl text-2xl font-bold md:m-3">
    Airport Meet and Greet
  </div>

  <p>
    The first moments in a new country can set the tone for your entire experience. 
    At G&V Support Services, we believe your arrival should be welcoming, comfortable, 
    and stress-free. Our Airport Meet & Greet service is designed to take the burden 
    off your shoulders, ensuring a smooth transition from the moment you land.
  </p>

  <p className="text-2xl m-3 font-semibold">
    Your Personal Welcome Team
  </p>

  <p>
    Our dedicated Destination Consultants are more than just staff they are your 
    first point of contact and trusted guide. With in-depth knowledge of Nigerian 
    airports, they will meet you directly at your port of entry and assist you 
    throughout the arrival process. From navigating immigration and customs to 
    handling luggage, your consultant will be by your side, ready to support any 
    immediate needs. This is more than a simple pickup service—it is a warm welcome, 
    a friendly face, and professional assistance that makes all the difference 
    after a long flight.
  </p>

  <p className="text-2xl m-3 font-semibold">
    A Coordinated and Effortless Transition
  </p>

  <p>
    We understand that relocating can be overwhelming, which is why we handle 
    every logistical detail behind the scenes. Before your arrival, we coordinate 
    with you and your company’s HR or relocation manager to confirm travel 
    arrangements and ensure everything is perfectly organized.
  </p>

  <p>
    Once you arrive, your Destination Consultant will escort you to a pre-arranged, 
    comfortable vehicle and take you directly to your accommodation. We also assist 
    with the check-in process so that you can settle into your temporary home 
    smoothly and without unnecessary delays.
  </p>

  <p>
    Our support goes beyond airport pickup. We anticipate special requirements and 
    organize them in advance—whether it is a child’s car seat, a specific vehicle 
    type, or other personal preferences. Our goal is to handle every practical 
    detail so that you can bypass the initial stress of a new environment and begin 
    your journey in Nigeria with confidence and peace of mind.
  </p>
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