"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, DoorClosed, Users } from "lucide-react";

import { carTypes } from "./chooseAvehicle";

const formatAmount = (amount: string) => `NGN ${amount}`;

export default function CardisplayPage() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">
          Curated fleet
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Vehicles prepared for modern Nigerian movement
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Explore a small fleet designed around airport pickups, business trips, family movement,
          and hosted guest transport. Each option gives clients a clearer idea of comfort, luggage
          capacity, and daily rate before they continue.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {carTypes.map((car, index) => (
          <motion.article
            key={car.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#fcfaf7] shadow-sm"
          >
            <div className="relative h-52 bg-gradient-to-br from-white to-[#f6e7d9]">
              <Image
                src={car.imageUrl}
                alt={car.name}
                fill
                className="object-contain p-5"
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#cf6c3d]">
                    {car.type}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{car.name}</h3>
                </div>
                <div className="rounded-2xl border border-[#ecd7c4] bg-white px-4 py-2 text-right">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Daily rate</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatAmount(car.amount)}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700">
                  <Users className="h-4 w-4 text-[#dd5500]" />
                  <span>{car.passengers}</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700">
                  <Briefcase className="h-4 w-4 text-[#dd5500]" />
                  <span>{car.bags}</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700">
                  <DoorClosed className="h-4 w-4 text-[#dd5500]" />
                  <span>{car.doors}</span>
                </div>
              </div>

              <Link
                href={`/services/rentals/booking-summary/${car.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1b1209] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#dd5500]"
              >
                View vehicle
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
