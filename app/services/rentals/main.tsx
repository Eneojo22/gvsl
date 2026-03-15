"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CarFront,
  Compass,
  DoorClosed,
  Landmark,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

import HeroSection from "@/app/aboutUs/shared/HeroSection";

import CardisplayPage from "./cardisplay";
import { Car, carTypes } from "./chooseAvehicle";
import { Booking, UseCarContextForInput } from "./gettingcarinputfromclient";

const locations: string[] = [
  "Murtala Muhammed International Airport (MMIA)",
  "Ikeja",
  "Victoria Island",
  "Lekki Phase 1",
  "Ajah",
  "Ikoyi",
  "Surulere",
  "Yaba",
  "Maryland",
  "Festac",
  "Apapa",
  "Ogba",
  "Magodo",
  "Gbagada",
  "Oshodi",
];

type HighlightItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ExperienceCard = {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  ctaLabel: string;
};

const highlights: HighlightItem[] = [
  {
    title: "Executive-ready transport",
    description: "Polished vehicles for airport arrivals, corporate movement, and client hospitality.",
    icon: CarFront,
  },
  {
    title: "Locally grounded service",
    description: "Drivers and coordinators who understand Lagos routes, timing, and guest care.",
    icon: Compass,
  },
  {
    title: "Reliable trip planning",
    description: "Structured pickups, flexible bookings, and smoother movement across busy city schedules.",
    icon: ShieldCheck,
  },
];

const experienceCards: ExperienceCard[] = [
  {
    title: "Airport pickups and city transfers",
    description: "Professional arrival support for executives, families, and guests moving between the airport, hotel, and destination.",
    imageUrl: "/image/carr.jpg",
    href: "#booking-panel",
    ctaLabel: "Book a transfer",
  },
  {
    title: "Sightseeing with a local lens",
    description: "Comfortable rides for cultural discovery, city orientation, and curated visits to the places that shape local life.",
    imageUrl: "/image/sitesee.jpg",
    href: "/services/rentals/sight-seeing",
    ctaLabel: "See packages",
  },
  {
    title: "Flexible daily vehicle hire",
    description: "Choose from practical, premium, and larger-capacity vehicles for business trips, family movement, and special errands.",
    imageUrl: "/image/freedrive.jpg",
    href: "#booking-panel",
    ctaLabel: "Choose a vehicle",
  },
];

const servicePromises: HighlightItem[] = [
  {
    title: "Warm Nigerian hospitality",
    description: "We blend professionalism with the welcoming service culture clients remember long after the trip ends.",
    icon: Sparkles,
  },
  {
    title: "Business and family friendly",
    description: "From executive meetings to family settling-in runs, our transport support adapts to the reason for the journey.",
    icon: Users,
  },
  {
    title: "Movement with local confidence",
    description: "Pickup timing, neighborhood familiarity, and route awareness matter. Our planning reflects that reality.",
    icon: Landmark,
  },
];

const selectedCarNote: Record<string, string> = {
  "Compact car": "A practical choice for everyday city movement and efficient executive errands.",
  "Premium car": "A refined option for client-facing travel, airport meet-and-greet, and senior staff movement.",
  "Cargo Transporter": "Ideal when the journey includes equipment, deliveries, or logistics-heavy movement.",
  Mini: "Suitable for lighter movement around the city with comfort and simplicity.",
  Luxury: "A stronger premium statement for important arrivals, hosted visitors, and higher-touch travel.",
  "7-Seater": "Best for group airport pickups, family movement, and team transport with extra luggage.",
};

const formatAmount = (amount: string) => `NGN ${amount}`;

const Carrental = () => {
  return <RentalsLandingPage />;
};

export default Carrental;

function RentalsLandingPage() {
  return (
    <div className="bg-[#f6f1ea] text-slate-900">
      <HeroSection
        title="Professional chauffeur and rental services"
        subtitle="Move through Lagos and beyond with transport support that feels polished, culturally aware, and genuinely dependable."
        backgroundImage="/image/carr.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/" },
          { label: "Rentals" },
        ]}
        ctaLabel="Book a vehicle"
        ctaHref="#booking-panel"
      />

      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#ead5c5] bg-[#fff8f1] px-6 py-5 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">
            Chauffeur-led mobility
          </p>
          <p className="mt-2 text-base leading-7 text-slate-700">
            Designed for airport arrivals, business appointments, family support, and city
            orientation with a more thoughtful Nigerian service experience.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1e7] text-[#dd5500]">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </motion.article>
            );
          })}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-sm sm:p-10">
            <div className="absolute inset-0 bg-[url('/svg/african-pattern.svg')] bg-repeat opacity-10" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb38a]">
                Why this feels different
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Less generic car hire, more confident local movement
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200">
                G&amp;V rentals is built around what travelers and globally mobile teams actually
                need in Nigeria: punctual pickups, trustworthy drivers, comfortable vehicles, and a
                team that understands how local movement shapes the whole experience.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
                Whether the trip begins at the airport, a hotel, an office district, or a cultural
                destination, we aim to make the journey feel smooth, respectful, and properly
                hosted.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {[
                  "Airport protocol",
                  "Executive movement",
                  "Family support",
                  "City orientation",
                  "Trusted local drivers",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-slate-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ead8ca] bg-[#fff7f2] p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">
              Service promise
            </p>
            <div className="mt-6 space-y-4">
              {servicePromises.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#f0dfd3] bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff1e7] text-[#dd5500]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">
              Service options
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Built for business, hospitality, and everyday movement
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              We support different kinds of journeys with the same goal: cleaner coordination,
              better presentation, and transport that feels reliable from start to finish.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {experienceCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                  <Link
                    href={card.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1b1209] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#dd5500]"
                  >
                    {card.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="booking-panel"
          className="mt-16 grid gap-8 rounded-[2rem] border border-[#ebddd2] bg-[#fcfaf7] p-5 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:p-8"
        >
          <CarRentalCard />
          <CardisplayPage />
        </section>

        <section className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">
                Ready to move
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Need a vehicle, transfer, or sightseeing ride?
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Start with the booking panel, or speak with our team if you need something more
                tailored for a guest arrival, executive visit, or family schedule.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#booking-panel"
                className="inline-flex items-center justify-center rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c54800]"
              >
                Start booking
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Contact our team
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export function CarRentalCard() {
  const { setBooking } = UseCarContextForInput();
  const router = useRouter();
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car>(carTypes[1] ?? carTypes[0]);

  const today = new Date().toISOString().split("T")[0];
  const isFormReady =
    Boolean(pickUpLocation) &&
    Boolean(dropOffLocation) &&
    Boolean(pickUpDate) &&
    Boolean(dropOffDate);

  const handleCarChange = (carType: string) => {
    const newCar = carTypes.find((car) => car.type === carType);

    if (newCar) {
      setSelectedCar(newCar);
    }
  };

  const handleSubmit = () => {
    if (!isFormReady) {
      return;
    }

    const newBooking: Booking = {
      amount: selectedCar.amount,
      carImage: selectedCar.imageUrl,
      carName: selectedCar.name,
      carType: selectedCar.type,
      pickUpLocation,
      pickUpDate,
      dropOffLocation,
      dropOffDate,
    };

    setBooking(newBooking);
    router.push("/services/rentals/booking-summary");
  };

  return (
    <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-sm sm:p-8">
      <div className="flex flex-col gap-4">
        <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb38a]">
          Reservation panel
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Reserve your vehicle</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">
            Choose a vehicle class, set your pickup and return details, and move into booking with
            a cleaner, more confident transport flow.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
        <label className="text-sm font-semibold text-white" htmlFor="vehicle-type">
          Vehicle class
        </label>
        <select
          id="vehicle-type"
          value={selectedCar.type}
          onChange={(event) => handleCarChange(event.target.value)}
          className="mt-3 w-full rounded-full border border-white/10 bg-white px-5 py-3 text-sm text-slate-900 outline-none transition focus:border-[#dd5500] focus:ring-2 focus:ring-[#dd5500]/20"
        >
          {carTypes.map((car) => (
            <option key={car.slug} value={car.type}>
              {car.type}
            </option>
          ))}
        </select>

        <div className="mt-5 rounded-[1.75rem] bg-[#120c07] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb38a]">
                Selected vehicle
              </p>
              <h3 className="mt-2 text-2xl font-semibold">{selectedCar.name}</h3>
              <p className="mt-1 text-sm text-slate-300">{selectedCar.type}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left sm:text-right">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Daily rate</p>
              <p className="mt-1 text-xl font-semibold text-white">{formatAmount(selectedCar.amount)}</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            {selectedCarNote[selectedCar.type] ?? "A dependable option for professional daily movement."}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <Users className="h-4 w-4 text-[#ffb38a]" />
              <span>{selectedCar.passengers} passengers</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <Briefcase className="h-4 w-4 text-[#ffb38a]" />
              <span>{selectedCar.bags} bags</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <DoorClosed className="h-4 w-4 text-[#ffb38a]" />
              <span>{selectedCar.doors} doors</span>
            </div>
          </div>

          <div className="relative mt-6 h-56 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-white via-white to-[#f7e0d0]">
            <Image
              src={selectedCar.imageUrl}
              alt={selectedCar.name}
              fill
              priority
              className="object-contain p-5"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-white" htmlFor="pickup-location">
            Pick-up location
          </label>
          <div className="relative mt-3">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <select
              id="pickup-location"
              value={pickUpLocation}
              onChange={(event) => setPickUpLocation(event.target.value)}
              className="w-full rounded-full border border-white/10 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#dd5500] focus:ring-2 focus:ring-[#dd5500]/20"
            >
              <option value="">Select pickup location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-white" htmlFor="pickup-date">
            Pick-up date
          </label>
          <div className="relative mt-3">
            <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              id="pickup-date"
              value={pickUpDate}
              type="date"
              min={today}
              className="w-full rounded-full border border-white/10 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#dd5500] focus:ring-2 focus:ring-[#dd5500]/20"
              onChange={(event) => setPickUpDate(event.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-white" htmlFor="return-date">
            Return date
          </label>
          <div className="relative mt-3">
            <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              id="return-date"
              value={dropOffDate}
              type="date"
              min={pickUpDate || today}
              className="w-full rounded-full border border-white/10 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#dd5500] focus:ring-2 focus:ring-[#dd5500]/20"
              onChange={(event) => setDropOffDate(event.target.value)}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-white" htmlFor="return-location">
            Return location
          </label>
          <div className="relative mt-3">
            <Plane className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <select
              id="return-location"
              value={dropOffLocation}
              onChange={(event) => setDropOffLocation(event.target.value)}
              className="w-full rounded-full border border-white/10 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#dd5500] focus:ring-2 focus:ring-[#dd5500]/20"
            >
              <option value="">Select return location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormReady}
        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
          isFormReady
            ? "bg-[#dd5500] text-white hover:bg-[#c54800]"
            : "cursor-not-allowed bg-white/10 text-slate-400"
        }`}
      >
        Continue to booking summary
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
