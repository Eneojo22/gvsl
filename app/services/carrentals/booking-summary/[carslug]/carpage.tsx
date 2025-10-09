"use client";

import React, { useState } from "react";
import Image from "next/image";

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
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Proceeding to payment for ${car.name}`);
  };

  return (
    <div className="bg-gray-50 p-6 border-t border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Book this Vehicle
      </h2>

      {/* Car details section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-32 h-24">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">{car.name}</h3>
          <p className="text-gray-600">{car.type}</p>
          <p className="text-indigo-600 font-semibold">{car.amount} / day</p>
        </div>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};
