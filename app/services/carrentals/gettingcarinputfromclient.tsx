//
"use client"; 
// import React from 'react'
import React, { createContext, useContext, useEffect, useState } from "react";
// import { json } from "stream/consumers";


export type Booking = {
  carName:string;
carImage:string;
  carType:string;
  amount:string;
  pickUpLocation: string;
  pickUpDate: string;
//   pickUpTime:string;
  // dropOffTime:string
  dropOffLocation: string;
  dropOffDate: string;
//   dropUpTime: string;

};
type CarContextType = {
  booking: Booking | null;
  setBooking: (booking: Booking) => void;
};

const CarContext = createContext<CarContextType | undefined>(undefined);

export function CarProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<Booking | null>(null);
    useEffect(() => {
    const saved = localStorage.getItem("bookingData");
    if (saved) {
      setBooking(JSON.parse(saved));
    }
  }, []);

  // ✅ Save to localStorage when booking changes
  useEffect(() => {
    if (booking) {
      localStorage.setItem("bookingData", JSON.stringify(booking));
    }
  }, [booking]);
  return (
    <CarContext.Provider value={{ booking, setBooking }}>
      {children}
    </CarContext.Provider>
  );
}

export function UseCarContextForInput() {
  const context = useContext(CarContext);
  if (!context) throw new Error("UseCarContextForInput must be used inside CarProvider");
  return context;
}