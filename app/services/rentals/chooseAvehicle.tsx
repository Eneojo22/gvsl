export type Car = {
  type: string;
  name: string;
  passengers: number;
  bags: number;
  doors: number;
  imageUrl: string;
  amount: string;
  slug: string; 
};


export const carTypes: Car[] = [
  {
    type: "Compact car",
    name: "Toyota Camry",
    passengers: 4,
    bags: 2,
    doors: 4,
    imageUrl: "/image/compact-car.webp",
    amount: "50,000",
    slug: "toyota-camry-compact-car",
  },
  {
    type: "Premium car",
    name: "Benz",
    passengers: 4,
    bags: 2,
    doors: 4,
    imageUrl: "/image/premium-sedan.webp",
    amount: "100,000",
    slug: "benz-premium-car",
  },
  {
    type: "Cargo Transporter",
    name: "Ford Transit",
    passengers: 3,
    bags: 6,
    doors: 3,
    imageUrl: "/image/van-transporter.webp",
    amount: "100,000",
    slug: "ford-transit-cargo-transporter",
  },
  {
    type: "Mini",
    name: "Mini Camry",
    passengers: 4,
    bags: 1,
    doors: 4,
    imageUrl: "/image/mini.webp",
    amount: "80,000",
    slug: "mini-camry-mini",
  },
  {
    type: "Luxury",
    name: "Toyota Luxury",
    passengers: 4,
    bags: 3,
    doors: 4,
    imageUrl: "/image/hybrid-sedan.webp",
    amount: "80,000",
    slug: "toyota-luxury-luxury",
  },
  {
    type: "7-Seater",
    name: "Toyota",
    passengers: 7,
    bags: 7,
    doors: 4,
    imageUrl: "/image/7-seater.webp",
    amount: "90,000",
    slug: "toyota-7-seater",
  },
];
