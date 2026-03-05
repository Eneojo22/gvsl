import React from "react";
import { Hero } from "../airportmeetandgreet/airportmeetandgreet";
import { BiCheckbox } from "react-icons/bi";

const Departure = () => {
  const departureItems = [
    "End-of-assignment lease termination",
    "Formal notice to landlords",
    "Deposit refund facilitation",
    "Coordination of property repairs and third-party services",
    "Assistance with bank account transfers or closures",
    "Arrangement of professional cleaning services",
    "Inventory check-out management",
  ];

  return (
    <>
      <div className="w-full text-black mt-40">
        <Hero
          title="See You Next Time"
          image="/image/meetgreet.jpg"
          overlayOpacity="bg-black/50"
          height="h-[30vh]"
        />
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 md:px-10 py-10 text-black">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Departure Services</h1>

        <p className="text-[#333333] leading-relaxed">
          At G&V Support Services Limited, we understand that the end of an expatriate assignment requires the same
          level of care and attention as its beginning. Our comprehensive Departure Services allow assignees to remain
          focused on their responsibilities through their final day, while we manage the key departure steps.
          <br /><br />
          Your dedicated Destination Consultant will create a tailored departure timeline and coordinate every detail
          with precision from lease termination and deposit recovery to handling any property-related claims. We also
          coordinate the disconnection of utilities, phone, and internet services, ensuring all required notices are
          issued on time and the transition is smooth.
        </p>

        <p className="mt-6 font-semibold text-[#333333]">G&V Departure Services include:</p>

        <ul className="mt-4 space-y-3">
          {departureItems.map((item) => (
            <Items key={item} title={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Departure;

interface ItemsProps {
  title: string;
}

export function Items({ title }: ItemsProps) {
  return (
    <li className="flex items-start text-[#333333]">
      <BiCheckbox className="w-5 h-5 text-amber-700 mr-2 mt-0.5" />
      <span>{title}</span>
    </li>
  );
}