"use client";

import React from "react";
import { useState } from "react";
// import SecureCheckout from "@/app/component/securecheckout";
import { UseCarContextForInput } from "../../gettingcarinputfromclient";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { booking } = UseCarContextForInput();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      name: "",
      address: "",
      phone: "",
      email: "",
      car_type: "",
  });
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleCarOrder = async () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.email) {
      // alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/car-orders/create-car-order/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          car_type:booking?.carType || "Unknown",
          car_model: booking?.carName || "Unknown",
          car_rental_Amount: parseFloat(String(booking?.amount).replace(/,/g, "")) || 0,
        }),
      });

      const data = await response.json();
      console.log(data)   
         if (!response.ok) {
        console.error("Backend error:", response.status, data);
        alert(data.error || JSON.stringify(data));
      } else {
        console.log("Order created:", data);
        // alert("Order successfully created!",data);
  router.push(
  `/services/carrentals/booking-summary/${booking?.carName
    .toLowerCase()
    .replace(/\s+/g, "-")}/car-order/car-order-success?orderId=${data.order_number}`
);

    }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-35 grid  grid-cols-1 sm:grid-cols-2 md:grid-flow-col md:grid-rows-3  gap-4 items-center  text-black bg-gray-100">
  <div className="max-w-lg bg-white shadow-lg rounded-2xl row-span-1 md:row-span-2  p-8 text-center mx-7 ">
    <h1 className="text-3xl font-bold mb-4">Checkout</h1>
    <p className="mb-6">
      You are about to book the <span className="font-semibold">{booking?.carName}</span> {booking?.carType} for{" "}
      <span className="font-semibold">₦{booking?.amount} per day</span>.
    </p>

    <div className="text-sm text-gray-700 leading-relaxed">
      <p className="mb-2">
        After making the transaction, you will be contacted by the admin for confirmation that your payment has been received.
      </p>
      <p className="mb-2">
        If things don’t go as planned, your payment will be <span className="font-semibold text-green-700">fully refunded</span>.
      </p>
      <p className="mt-4 font-semibold">
        Account Number: <span className="text-orange-600">8272828828773</span> <br />
        Bank: <span className="text-orange-600">FCMB Bank</span>
      </p>
      <p className="mt-4 italic text-gray-500">Thank you for choosing us!</p>
    </div>
  </div>
  <div className="max-w-lg bg-white shadow-lg rounded-2xl p-8  md:row-span-4  text-center">
    <h1 className="text-3xl font-bold mb-4">Selected car</h1>
    <div className="mb-6">
      <Image
        src={booking?.carImage || "/image/car-placeholder.png"}
        alt={booking?.carName || "Selected Car"}
        width={400}
        height={250}
        className="mx-auto rounded-lg object-cover " />
    </div>
    <div className="text-lg">
      <h2 className="text-2xl font-semibold mb-2">{booking?.carName}</h2>
      <p className="text-gray-600 mb-1">{booking?.carType}</p>
      {/* <p>{booking.dropOffDate}</p> */}
      <div>
        <div className="text-center mb-8">
      You are expected to pick up the car on{" "}
      <div className="text-sm text-gray-700 leading-relaxed">
      <span className="font-semibold text-black ">{booking?.pickUpDate}</span> you be going on a trip to {" "}
      <span className="font-semibold">{booking?.pickUpLocation}</span> and returning it on{" "}
      <span className="font-semibold">{booking?.dropOffDate}</span>.
      </div>
    </div>

      </div>
    </div>
  </div>
  <div className="max-w-lg bg-white shadow-lg rounded-2xl md:col-span-4 row-span-4 p-8 text-center">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Book this Vehicle</h2>
    <form
        onSubmit={(e) => {
          e.preventDefault();
          // handleOrder();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:outline-none focus:ring-3 focus:ring-orange-500"
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:outline-none focus:ring-3 focus:ring-orange-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:outline-none focus:ring-3 focus:ring-orange-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:outline-none focus:ring-3 focus:ring-orange-500"
        />

        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            onClick={handleCarOrder}
          className={`${
              loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-700"
            } text-white py-3 font-extrabold px-6 rounded-lg transition-all`}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
    </form>
  </div>
</div>
//₦
  );
};

export default CheckoutPage;
