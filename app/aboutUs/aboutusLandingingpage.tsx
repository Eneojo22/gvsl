'use client'

import Link from "next/link";
import { Globe2, HeartHandshake, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "./shared/HeroSection";

const stats = [
  { value: "60+", label: "Relocations completed", description: "Supporting families and executives across Nigeria." },
  { value: "10+", label: "Years of experience", description: "Delivering dependable support since day one." },
  { value: "98%", label: "Customer satisfaction", description: "Trusted by clients for consistent, people-first service." },
  { value: "6+", label: "Cities covered", description: "Active presence across Nigeria’s major hubs." },
  { value: "15+", label: "Team members", description: "Experienced local specialists working together for you." },
  { value: "< 24h", label: "Avg response time", description: "Fast answers when you need them most." },
];

export default function AboutusLandingingpage() {
  return (
    <div className="text-slate-900">
      <HeroSection
        title="We make relocation feel like home"
        subtitle="Combining local Nigerian expertise with global standards to help you land with confidence, clarity and comfort."
        backgroundImage="/image/meetgreet.jpg"
        ctaLabel="Let's get started"
        ctaHref="/contact-us"
      />

      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
       
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd9b4] text-[#d35200]">
              <MapPin className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Local expertise</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Our team is based in Nigeria, and we leverage deep local knowledge to make your relocation smooth and culturally confident.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffe8e0] text-[#c34217]">
              <Globe2 className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Global care, local feel</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              We blend international relocation standards with a warm Nigerian touch so you feel supported at every step.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffe7eb] text-[#b72a20]">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Trusted relationships</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              From housing to permits, we connect you with trusted service partners and walk alongside you until you’re settled.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
              >
                <p className="text-3xl font-semibold text-[#dd5500]">{stat.value}</p>
                <p className="mt-2 text-base font-semibold text-slate-800">{stat.label}</p>
                <p className="mt-2 text-sm text-slate-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-slate-200 bg-[#fff7ed] p-10 text-slate-900 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Ready to take the next step?</h2>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-700">
                Reach out and we’ll craft a relocation plan that fits your timeline, budget, and family needs — all with the ease of working with a local partner you can trust.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c54800]"
              >
                Contact us
              </Link>
              <Link
                href="/aboutUs/Testimonials"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Read testimonials
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
