"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


  

// import router from "next/router";
interface Car {
  name: string;
  type: string;
  amount: string;
  image: string;
}

interface CarPageProps {
  car: Car;
}

export const CarPage: React.FC<CarPageProps> = ({ car }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
      name: "",
      address: "",
      phone: "",
      email: "",
      car_type: "",
      // car_model: "",
      // car_rental_Amount: "",
    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCarOrder = async () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.email) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/car-orders/create-car-order/`, {
        method: "POST",
        headers: {    },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          car_type: car?.type || "Unknown",
          car_model: car?.name || "Unknown",
          car_rental_Amount: parseFloat(String(car?.amount).replace(/,/g, "")) || 0,
        }),
      });

      const data = await response.json();
        console.log("🟩 Full response:", response);
        console.log("🟨 Data from backend:", data);
      console.log(data)   
         if (!response.ok) {
        console.error("Backend error:", response.status, data);
        alert(data.error || JSON.stringify(data));
      } else {
        console.log("Order created:", data);
        // alert("Order successfully created!",data);
  router.push(
  `/services/carrentals/booking-summary/${car.name
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
    <div className="bg-gray-50 p-6 border-t border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Book this Vehicle</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-48  h-34">
          <Image src={car.image} alt={car.name} fill className="rounded-lg object-cover " />
        </div>
        <div>
          <h3 className="text-lg font-bold">{car.name}</h3>
          <p className="text-gray-600">{car.type}</p>
          <p className="text-indigo-600 font-semibold">{car.amount} / day</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCarOrder();
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
            className={`${
              loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-700"
            } text-white py-3 font-extrabold px-6 rounded-lg transition-all`}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};
