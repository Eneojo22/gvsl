import React from "react";
import Image from "next/image";

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

      <div className="w-full mt-10">
        <div className="mx-auto w-full max-w-5xl px-4 md:px-10 py-10 text-[#333333] space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold">Airport Meet and Greet</h1>

          <p className="leading-relaxed">
            The first moments in a new country can set the tone for your entire experience. At G&V Support Services,
            we believe your arrival should be warm, comfortable, and stress-free. Our Airport Meet &amp; Greet service
            is designed to remove the pressure of arrival logistics and ensure a smooth transition from the moment
            you land.
          </p>

          <h2 className="text-xl md:text-2xl font-semibold pt-2">Your Personal Welcome Team</h2>

          <p className="leading-relaxed">
            Our Destination Consultants are more than staff — they are your first point of contact and trusted guide.
            With in-depth knowledge of Nigerian airports, they meet you at your port of entry and support you through
            the arrival process. From navigating immigration and customs to assisting with luggage, your consultant
            stays by your side and helps with any immediate needs. This is more than a pickup service — it’s a
            reassuring welcome and professional support after a long journey.
          </p>

          <h2 className="text-xl md:text-2xl font-semibold pt-2">A Coordinated and Effortless Transition</h2>

          <p className="leading-relaxed">
            Relocation can feel overwhelming, which is why we handle the details behind the scenes. Before your
            arrival, we coordinate with you and your company’s HR or relocation manager to confirm travel information
            and ensure every step is properly planned.
          </p>

          <p className="leading-relaxed">
            On arrival, your Destination Consultant escorts you to a pre-arranged, comfortable vehicle and takes you
            directly to your accommodation. We can also assist with the check-in process so you can settle in quickly
            and without unnecessary delays.
          </p>

          <p className="leading-relaxed">
            Our support goes beyond the airport. We plan for special requirements in advance — such as a child’s car
            seat, a preferred vehicle type, or other personal needs — so you can bypass the stress of a new
            environment and begin your journey in Nigeria with confidence and peace of mind.
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
  overlayOpacity?: string;
  height?: string;
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
      <Image src={image} alt={title} fill priority className="object-cover object-center" />
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
        {subtitle && <p className="text-base md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}