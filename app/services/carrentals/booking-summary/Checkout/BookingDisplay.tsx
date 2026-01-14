"use client";

import { UseCarContextForInput } from "@/app/services/carrentals/gettingcarinputfromclient";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";


export function BookingDisplay() {
  const { booking } = UseCarContextForInput();




  
  if (!booking) {
    return (
      <div className="p-6 text-center text-gray-700">
        <h2 className="text-2xl font-bold mb-2">No booking found</h2>
        <p className="text-gray-500">Please go back and select a car first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-35 bg-gray-100 py-12 px-4 text-black">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        {/* Left side: Booking Summary */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col space-y-4"
        >
          <div className="relative h-72 w-full mb-4">
            <Image
              src={booking.carImage}
              alt={booking.carName}
              fill
              className="object-contain p-6 bg-gray-50 rounded-xl"
            />
          </div>

          <h1 className="text-3xl font-bold mb-2">{booking.carName}</h1>
          <p className="text-gray-600 text-lg mb-1">{booking.carType}</p>
          <p className="text-orange-600 font-bold text-xl mb-4">
            ₦{booking.amount} / day
          </p>

          {/* <CarPage
            car={{
              name: booking.carName,
              type: booking.carType,
              amount: booking.amount,
              image: booking.carImage,
            }}
          /> */}
        </motion.div>

        {/* Right side: Payment Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gray-50 rounded-xl p-8 shadow-inner"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Checkout
          </h2>

          <form  className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-2 font-medium">
                Name on Card
              </label>
              <input
                type="text"
                name="name"
                // value={formData.name}
                // onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-gray-600 mb-2 font-medium">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                maxLength={19}
                // value={formData.cardNumber}
                // onChange={handleChange}
                required
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Expiry + CVV */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-600 mb-2 font-medium">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  maxLength={5}
                  // value={formData.expiry}
                  // onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="w-24">
                <label className="block text-gray-600 mb-2 font-medium">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  maxLength={3}
                  // value={formData.cvv}
                  // onChange={handleChange}
                  required
                  placeholder="***"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Proceed to Payment
            </motion.button>
          </form>

          {/* Animated Secure Message */}
          <motion.p
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="text-center text-[#4d4d4d] font-extrabold text-sm mt-4"
          >
            🔒 Your payment details are encrypted and secure
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}












// declare global {
//   interface Window {
//     PaystackPop: any;
//   }
// }

// export default function SecureCheckout({
//   amount,
//   email,
// }: {
//   amount: number;
//   email: string;
// }) {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://js.paystack.co/v1/inline.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const payWithPaystack = () => {
//     if (typeof window.PaystackPop === "undefined") {
//       alert("Payment system not loaded yet. Please try again in a moment.");
//       return;
//     }

//     const handler = window.PaystackPop.setup({
//       key: "sk_test_2ea24d4e49faeae61b93ac6b2edafb359c568da8", 
//       email,
//       amount: amount * 100, // amount in kobo
//       currency: "NGN",
//       ref: "ref-" + Date.now(),
//       onClose: function () {
//         alert("Payment window closed.");
//       },
//       callback: function (response: any) {
//         alert("✅ Payment complete! Reference: " + response.reference);
//       },
//     });

//     handler.openIframe();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto mt-10 animate-slideIn">
//       <h2 className="text-2xl font-semibold mb-3">Secure Payment</h2>
//       <p className="text-gray-500 mb-4 animate-bounce">
//         🔒 Your payment details are encrypted
//       </p>
//       <button
//         onClick={payWithPaystack}
//         className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full transition-all"
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// }
