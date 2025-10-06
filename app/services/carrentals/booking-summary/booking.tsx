"use client";
import { UseCarContextForInput } from "@/app/services/carrentals/gettingcarinputfromclient";
import Image from "next/image";
import { Car,carTypes } from "../main";
// import { Car } from "lucide-react";
// import { div } from "framer-motion/dist/types/client";



type CarCardProps = {
  carTypes: Car;
};


 export const BookingSummaryPage: React.FC<CarCardProps> = () => {
  const { booking } = UseCarContextForInput();

  if (!booking) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">No booking found</h2>
        <p>Please go back and select a car first.</p>
      </div>
    );
  }
  const gettotal = +booking.amount
  const Total = +gettotal * 3

  return (
    <main className="flex flex-col lg:flex-row gap-6 p-6">
      {/* LEFT SIDE */}
      <div className="flex-1">
        {/* Selected Vehicle */}
        <section className=" rounded-xl shadow p-4 mb-6">
          <span className="bg-orange-500 text-white p-2 rounded-3xl font-bold text-lg mb-3">
            Selected car
          </span>
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={booking?.carImage}
              alt={booking.carType}
              width={220}
              height={150}
              className="rounded-xl object-contain"
            />
            <div className="flex flex-col justify-between">
              {/* <h2>}</h2> */}
              <h4 className="font-bold text-xl">{booking.carType}</h4>
              <p className="text-gray-600 text-sm">{booking.carName}</p>
              <p className="text-lg font-semibold">₦{booking.amount} / day</p>
              <p className="text-sm">{Total.toLocaleString()} total for 3 days</p>
              <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded mt-3 hover:bg-orange-500 hover:text-white transition">
                Rent this Vehicle
              </button>
            </div>
          </div>
        </section>

        {/* Other Cars */}
        <section className=" rounded-xl  shadow p-4">
          <h3 className="text-orange-500 font-bold text-lg mb-3">
         Other Vehicle Class
          </h3>
            {carTypes.map((car, i) => (

          <div className="flex flex-col md:flex-row gap-4 " key={i}>
            <Image
              src={`${car.imageUrl}`}
              alt="Mini"
              width={220}
              height={150}
              className="rounded-xl object-contain  md:w-90 md:h-90"
            />
            <div className="flex flex-col items-center justify-center md:w-90 md:h-90  rounded-lg p-4 " >
              <h4 className="font-bold text-xl">{car.name}</h4>
              <p className="text-gray-600 text-sm">{car.type}</p>
              <p className="text-lg font-semibold">₦{car.amount} / day</p>
              {/* <p className="text-sm">₦196,35 total for 3 days</p> */}
              <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded mt-3 hover:bg-orange-500 hover:text-white transition">
                Rent this Vehicle
              </button>
            </div>
           
          </div>
             ))}
        </section>
      </div>

      {/* RIGHT SIDE */}
      <aside className="w-full lg:w-1/3  rounded-xl shadow p-4">
        <h3 className="font-bold text-lg text-orange-500 mb-3">Summary</h3>

        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold">Pickup</h4>
            <p>
              {booking.pickUpDate} @ 12:00 <br />
              Location: {booking.pickUpLocation}
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Return</h4>
            <p>
              {booking.dropOffDate} @ {booking.dropOffTime} <br />
              Location: {booking.dropOffLocation}
            </p>
          </div>

          <div>
            <h4 className="font-semibold">{booking.carType}</h4>
          </div>

          <hr />

          <div>
            <h4 className="font-semibold">Equipment & Services</h4>
            <p>Extra Km: ₦0,00</p>
            {/* <p>Early/Late pickup: €20,00</p> */}
          </div>
          <div className="font-bold text-lg mt-4">
            Total: <span className="text-orange-500">₦{booking.amount}</span>
          </div>

          {/* <div className="text-red-600 font-bold">Security Deposit: €800,00</div> */}
        </div>
      </aside>
    </main>
  );
}
export default BookingSummaryPage