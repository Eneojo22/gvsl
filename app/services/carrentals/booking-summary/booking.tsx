"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UseCarContextForInput } from "@/app/services/carrentals/gettingcarinputfromclient";
import { Car, carTypes } from "../main";

type CarCardProps = {
  carTypes: Car;
};

export const BookingSummaryPage: React.FC<CarCardProps> = () => {
  const { booking } = UseCarContextForInput();

  if (!booking) {
    return (
      <div className="p-6 text-center text-gray-700">
        <h2 className="text-2xl font-bold mb-2">No booking found</h2>
        <p className="text-gray-500">Please go back and select a car first.</p>
      </div>
    );
  }

  // const total = +booking.amount * 3;

  return (
    <main className="flex flex-col lg:flex-row gap-8 p-6 bg-gray-50 min-h-screen font-[Poppins]">
      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 space-y-8"
      >
        {/* Selected Vehicle */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-orange-500 mb-4">
            Selected Car
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-200 relative h-[350px]">
              <Image
                src={booking.carImage}
                alt={booking.carType}
                // width={400}
                // height={250}
                fill
                className="object-cover rounded-xl"
              />
            </motion.div>

            <div className="flex flex-col  text-center md:text-left space-y-3">
              <h3 className="text-2xl font-bold">{booking.carType}</h3>
              <p className="text-gray-500">{booking.carName}</p>
              <p className="text-lg font-semibold text-orange-600">
                ₦{booking.amount} / day
              </p>
              <p className="text-sm text-gray-600">
                {/* Total for 3 days: ₦{total.toLocaleString()} */}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-3xl transition-all shadow-sm"
              >
                Rent this Vehicle
              </motion.button>
            </div>
          </div>
        </section>

        {/* Other Cars */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-orange-500 mb-4">
            Other Vehicle Classes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {carTypes.map((car, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center text-center bg-gray-50 rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
              >
              <div className="relative  w-full h-[300px]">
  <Image
    src={car.imageUrl}
    alt={car.name}
    fill
    className="object-cover rounded-xl"
  />
</div>
              <div className=" text-black">
                <h4 className="font-bold text-xl mt-3">{car.name}</h4>
                <p className="text-gray-600 text-sm">{car.type}</p>
                <p className="text-lg font-semibold text-orange-600">
                  ₦{car.amount} / day
                </p>
                <button className="mt-3 border border-orange-500 text-orange-500 px-5 py-2 rounded-3xl hover:bg-orange-500 hover:text-white transition-all">
                  Rent this Vehicle
                </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.aside
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full lg:w-1/3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-gray-100"
      >
        <h3 className="font-bold text-lg text-orange-500 mb-4">Booking Summary</h3>

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold text-gray-900">Pickup</h4>
            <p>
              {booking.pickUpDate} @ 12:00 <br />
              <span className="text-gray-500">
                Location: {booking.pickUpLocation}
              </span>
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Return</h4>
            <p>
              {booking.dropOffDate} @ {booking.dropOffTime} <br />
              <span className="text-gray-500">
                Location: {booking.dropOffLocation}
              </span>
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">{booking.carType}</h4>
          </div>

          <hr />

          <div>
            <h4 className="font-semibold text-gray-900">
              Equipment & Services
            </h4>
            <p className="text-gray-600">Extra Km: ₦0.00</p>
          </div>

          <div className="text-lg font-bold text-gray-900">
            Total:{" "}
            <span className="text-orange-500">₦{booking.amount}</span>
          </div>
        </div>
      </motion.aside>
    </main>
  );
};

export default BookingSummaryPage;
