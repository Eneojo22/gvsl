"use client"
import React from 'react'
import { useState } from 'react';
import Image from "next/image";
import { Users, Briefcase, DoorClosed} from "lucide-react";
import { UseCarContextForInput } from './gettingcarinputfromclient';
// Define the Car type
export type Car = {
  type: string;
  name: string;
  passengers: number;
  bags: number;
  doors: number;
  imageUrl: string;
};

// Export the array directly ✅
const carTypes: Car[] = [
  {
    type: "Compact car",
    name: "Toyota Camry",
    passengers: 4,
    bags: 2,
    doors: 4,
    imageUrl: "/image/compact-car.webp",
  },
  {
    type: "Premium car",
    name: "Benz",
    passengers: 4,
    bags: 2,
    doors: 4,
    imageUrl: "/image/premium-sedan.webp",
  },
  {
    type: "Cargo Transporter",
    name: "Ford Transit",
    passengers: 3,
    bags: 6,
    doors: 3,
    imageUrl: "/image/van-transporter.webp",
  },
  {
    type: "Mini",
    name: "Mini Camry",
    passengers: 4,
    bags: 1,
    doors: 4,
    imageUrl: "/image/mini.webp",
  },
  {
    type: "Luxury",
    name: "Toyota Luxury",
    passengers: 4,
    bags: 3,
    doors: 4,
    imageUrl: "/image/hybrid-sedan.webp",
  },
  {
    type: "7-Seater",
    name: "Toyota",
    passengers: 7,
    bags: 7,
    doors: 4,
    imageUrl: "/image/7-seater.webp",
  },
];

// export default

// carTypes;



