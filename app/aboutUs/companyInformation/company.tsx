'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  Compass,
  Globe2,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import HeroSection from "../shared/HeroSection";

type StatCard = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type DivisionCard = {
  title: string;
  description: string;
  points: string[];
  icon: LucideIcon;
  accent: string;
};

type ValueCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const stats: StatCard[] = [
  {
    value: "3",
    label: "Specialist divisions",
    description: "Mobility, immigration, and research support working together as one service experience.",
    icon: Building2,
  },
  {
    value: "7+",
    label: "Key Nigerian locations",
    description: "Supporting assignments across Lagos, Abuja, Edo, Rivers, Imo, Delta, and Akwa Ibom.",
    icon: Globe2,
  },
  {
    value: "End-to-end",
    label: "Relocation coverage",
    description: "From arrival support and housing search to immigration guidance and departure planning.",
    icon: BriefcaseBusiness,
  },
];

const divisions: DivisionCard[] = [
  {
    title: "Mobility Division",
    description: "Practical relocation support that helps assignees and families settle quickly and confidently.",
    points: [
      "Orientation, home and school search, settling-in and departure services",
      "Cultural guidance, transport support, and lease management services",
      "A smoother landing experience for employees, families, and HR teams",
    ],
    icon: Compass,
    accent: "bg-[#fff1e7] text-[#d95b15]",
  },
  {
    title: "Immigration Division",
    description: "Structured visa and immigration coordination designed around compliance, speed, and clarity.",
    points: [
      "Visa and permit processing support for expatriates and dependants",
      "Guidance through changing local requirements and documentation needs",
      "Timely communication that reduces risk and avoids unnecessary delays",
    ],
    icon: ShieldCheck,
    accent: "bg-[#eef6ff] text-[#1657b8]",
  },
  {
    title: "Research Division",
    description: "Location intelligence that helps organizations make informed mobility and assignment decisions.",
    points: [
      "Insights into housing, schooling, mobility, and cost-of-living realities",
      "Reliable local market data gathered across major economic hubs",
      "Decision-ready input for global mobility and HR planning teams",
    ],
    icon: Sparkles,
    accent: "bg-[#f5f3ff] text-[#5b36b4]",
  },
];

const values: ValueCard[] = [
  {
    title: "Embrace innovation",
    description: "We treat change as an opportunity to improve, adapt, and create better outcomes for clients navigating new environments.",
    icon: Sparkles,
  },
  {
    title: "Unwavering integrity",
    description: "We build trust through honest communication, responsible actions, and dependable follow-through in every engagement.",
    icon: ShieldCheck,
  },
  {
    title: "People-centric service",
    description: "Every assignment is personal. We listen carefully, respect cultural differences, and tailor support to individual needs.",
    icon: Users,
  },
  {
    title: "Ownership and accountability",
    description: "We take responsibility for the details so our clients can stay focused on their goals with confidence.",
    icon: Target,
  },
];

export default function CompanyInfo() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <HeroSection
        title="Company information"
        subtitle="A trusted Nigerian relocation and destination services partner helping expatriates and global teams settle with confidence."
        backgroundImage="/image/meetgreet.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/aboutUs" },
          { label: "Company Information" },
        ]}
        ctaLabel="Talk to our team"
        ctaHref="/contact-us"
      />

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1e7] text-[#dd5500]">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-6 text-3xl font-semibold text-slate-900">{stat.value}</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">{stat.label}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{stat.description}</p>
              </motion.article>
            );
          })}
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">History</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Built to make international relocation simpler in Nigeria
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
              <p>
                G&amp;V Support Services Limited was founded by Mr. Gospel Akuetiemhe with a clear
                vision: simplify the complexity of expatriate relocation so individuals, families,
                and employers can transition into Nigeria with confidence.
              </p>
              <p>
                One of the company&apos;s earliest milestones came while supporting expatriate
                families relocating from Korea to Nigeria. By coordinating housing support, school
                search, and vehicle rental services, G&amp;V created a seamless landing experience
                that helped establish its reputation for dependable service delivery.
              </p>
              <p>
                From that foundation, the company expanded its reach across major economic hubs
                including Lagos, Abuja, Edo, Rivers, Imo, Delta, and Akwa Ibom. Today, G&amp;V is
                recognized as a leading independently run destination service provider in Nigeria,
                delivering tailored support for multinational organizations and expatriate teams.
              </p>
              <p>
                While inbound relocation remains central to the business, the company has grown into
                a broader expatriate solutions partner with visa and immigration coordination, car
                rental support, and lease management services that respond to the realities of
                modern assignments.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb38a]">
                Company profile
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-200">
                <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Founded to serve expatriates, their families, and global employers with practical
                  local support.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Trusted for destination services, immigration support, and mobility coordination.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Designed to blend local expertise, reliable execution, and a people-first service
                  culture.
                </li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-[#f2d5c3] bg-[#fff7f2] p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">
                Where we operate
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {["Lagos", "Abuja", "Edo", "Rivers", "Imo", "Delta", "Akwa Ibom"].map((state) => (
                  <span
                    key={state}
                    className="rounded-full border border-[#f1c3a6] bg-white px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">
              Our divisions
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Specialized teams for every stage of the assignment journey
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Our services are organized around the needs that matter most to expatriates and
              global mobility teams: smooth arrival, compliant documentation, and informed local
              decision-making.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {divisions.map((division, index) => {
              const Icon = division.icon;

              return (
                <motion.article
                  key={division.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${division.accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{division.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{division.description}</p>
                  <ul className="mt-6 space-y-3">
                    {division.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-[#fff4ec] p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">Purpose</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Deliver relocation experiences people remember for the right reasons
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              We create exceptional relocation experiences that leave clients with lasting, positive
              memories of Nigeria&apos;s culture, people, and opportunities. At G&amp;V, it is not only
              about what we do. It is about how supported and confident our clients feel throughout
              the journey.
            </p>
          </div>

          <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb38a]">Vision</p>
            <h2 className="mt-3 text-2xl font-semibold">
              To be Nigeria&apos;s preferred partner for expatriate relocation and mobility services
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-200">
              Our goal is to set the standard for reliable, people-centered destination services by
              combining local expertise, responsive execution, and trusted long-term relationships.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">
              Core values
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Principles that shape the way we serve
            </h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{value.description}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">
                Work with us
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Looking for a dependable relocation partner in Nigeria?
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                We support organizations and internationally mobile professionals with clear,
                reliable, and human-centered relocation services from first contact to full
                settlement.
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
                href="/aboutUs/teamInfo"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
