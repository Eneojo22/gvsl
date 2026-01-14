"use client";
import React, { useState } from "react";
import CardisplayPage from "./cardisplay";
import { useRouter } from "next/navigation";
import { CarProvider, UseCarContextForInput, Booking } from "./gettingcarinputfromclient";
import { Users, Briefcase, DoorClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// ✅ Car type
import { Car, carTypes } from "./chooseAvehicle";

const locations: string[] = [
  "Murtala Muhammed International Airport (MMIA)",
  "Ikeja",
  "Victoria Island",
  "Lekki Phase 1",
  "Ajah",
  "Ikoyi",
  "Surulere",
  "Yaba",
  "Maryland",
  "Festac",
  "Apapa",
  "Ogba",
  "Magodo",
  "Gbagada",
  "Oshodi",
];

// ✅ Main Page
const Carrental = () => {
  return <HeroSection />;
};
export default Carrental;

function HeroSection() {
  return (
    <main>
      {/* Top cards */}
      <div className="bg-[#eeeeee] py-6 w-full text-black px-4 md:px-10 grid gap-6 md:grid-cols-3">
        <ServiceCard
          title="Car Rental"
          description="Book your car rental and explore with freedom. Premium, affordable rental cars for city drives and scenic road trips — your journey, your pace."
          imageUrl="/image/freedrive.jpg"
        />

        
        <ServiceCard
          title="Sightseeing Packages"
          description="Sightseeing packages for iconic sights & hidden gems. Curated by locals, our tours uncover the best your destination has to offer — beyond the guidebooks."
          imageUrl="/image/sitesee.jpg"
        />
        <ServiceCard
          title="Individual Transfers"
          description="Private individual transfers, hassle-free and on time. From airport pickups to city-to-city rides, travel in comfort and confidence."
          imageUrl="/image/carr.jpg"
        />
      </div>

      {/* Car rental booking */}
      <div className="bg-white shadow-lg mx-4 md:mx-6 rounded-2xl flex flex-col md:flex-row justify-center my-5 p-4">
        <div className="md:w-1/3 w-full mb-6 md:mb-0 md:mr-6">
          {/* <CarProvider> */}
            <CarRentalCard  />
          {/* </CarProvider> */}
        </div>
        <div className="flex-1 border-2 rounded-xl p-4">
          <CardisplayPage />
        </div>
      </div>
    </main>
  );
}

//  Service card
type ServiceCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
};

export function ServiceCard({
  title,
  description,
  imageUrl,
  buttonText = "Show more",
}: ServiceCardProps) {
  return (
    <div
      className="rounded-3xl shadow-2xl overflow-hidden relative flex flex-col justify-between bg-[#462103]/60 bg-cover bg-center bg-blend-overlay min-h-[300px]"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="p-6 flex flex-col justify-between h-full bg-black/40">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
          {title}
        </h2>
        <p className="text-white text-sm md:text-base mb-4">{description}</p>
        <Link href={'/services/carrentals/sight-seeing'} >
        <button className="bg-orange-500 hover:bg-orange-600 w-full text-white font-medium py-3 px-4 rounded-xl">
          {buttonText}
        </button>
        </Link>
      </div>
    </div>
  );
}

// ✅ Car Rental Card
export function CarRentalCard() {
  const { setBooking } = UseCarContextForInput();
  const router = useRouter();

  // form states
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  // const [dropOffTime, setDropOffTime] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car>(carTypes[0]);
  // const [ bookingcarIng,SetBookingcarImage] = useState("")
  // ✅ handle car change
  const handleCarChange = (carType: string) => {
    const newCar = carTypes.find((car) => car.type === carType)!;
    setSelectedCar(newCar);
  };

  // ✅ handle submit
  const handleSubmit = () => {
    const newBooking: Booking = {
      // Image:selectedCar.imageUrl,
      amount:selectedCar.amount,
      carImage: selectedCar.imageUrl,
      carName:selectedCar.name,
      carType: selectedCar.type,
      pickUpLocation,
      pickUpDate,
      dropOffLocation,
      dropOffDate,
      // dropOffTime,
    };

    setBooking(newBooking);
    router.push("carrentals/booking-summary");
  };
// console.log()
  return (
    <div className="rounded-3xl shadow-lg w-full bg-[#f1f1f1] p-6 text-black">
      {/* Car Selector */}
      <div className="mx-4">
        <h3 className="text-lg font-semibold mb-3">Choose a Vehicle</h3>

        <select
          value={selectedCar.type}
          onChange={(e) => handleCarChange(e.target.value)}
          className="w-full px-5 py-3 rounded-full border mb-4 "
        >
          {carTypes.map((car, i) => (
            <option key={i} value={car.type} className="p-3">
              {car.type}
            </option>
          ))}
        </select>

        {/* Selected Car Info */}
        <div className="bg-black text-white rounded-2xl px-7 py-5 mb-4">
          <p className="font-bold">{selectedCar.type}</p>
          <p className="text-sm">e.g. {selectedCar.name}</p>
        </div>

        {/* Car Features */}
        <div className="flex px-4 items-center mb-4">
          <span className="flex items-center gap-2 bg-black text-white p-3 mx-3 rounded-full font-bold">
            <Users size={18} /> {selectedCar.passengers}
          </span>
          <span className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 p-3 mx-3 rounded-full font-bold">
            <Briefcase size={18} /> {selectedCar.bags}
          </span>
          <span className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 p-3 mx-3 rounded-full font-bold">
            <DoorClosed size={18} /> {selectedCar.doors}
          </span>
        </div>

        {/* Car Image */}
        <div className="w-full h-50 relative mb-4">
          <Image
            src={selectedCar.imageUrl}
            alt={selectedCar.name}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Pick-Up Section */}
      <h4 className="font-bold mt-4">Pick-Up</h4>
      <select
        value={pickUpLocation}
        onChange={(e) => setPickUpLocation(e.target.value)}
        className="w-full px-4 py-3 rounded-full border mt-2 mb-3"
      >
        <option value="">Select location</option>
        {locations.map((loc, i) => (
          <option key={i} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <input
        value={pickUpDate}
        type="date"
        className="w-full p-3 rounded-full border mb-4"
        onChange={(e) => setPickUpDate(e.target.value)}
      />

      {/* Drop-Off Section */}
      <h4 className="font-bold">Drop-Off</h4>
      <select
        value={dropOffLocation}
        onChange={(e) => setDropOffLocation(e.target.value)}
        className="w-full p-3 rounded-full border mt-2 mb-3"
      >
        <option value="">Select location</option>
        {locations.map((loc, i) => (
          <option key={i} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={dropOffDate}
          type="date"
          className="flex-1 p-3 rounded-full border"
          onChange={(e) => setDropOffDate(e.target.value)}
        />
        {/* <input
          value={dropOffTime}
          type="time"
          className="flex-1 p-3 rounded-full border"
          onChange={(e) => setDropOffTime(e.target.value)}
        /> */}
      </div>

      {/* Rent Button */}
      <button
        onClick={handleSubmit}
        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-full w-full mt-6"
      >
        Rent This Car
      </button>
    </div>
  );
}
