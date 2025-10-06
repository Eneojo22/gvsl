"use client";
// import { CarProvider } from "./CarContext";
import { CarProvider } from "./gettingcarinputfromclient";

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  return <CarProvider>{children}</CarProvider>;
}
