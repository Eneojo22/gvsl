"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Globe2,
  MapPin,
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

import ReviewStars from "../aboutUs/shared/ReviewStars";
import {
  getAllReviews,
  getAverageRating,
  REVIEW_UPDATE_EVENT,
  type Review,
} from "../aboutUs/shared/reviews";

type TrustItem = {
  value: string;
  label: string;
};

type ServicePathway = {
  eyebrow: string;
  title: string;
  description: string;
  audience: string;
  highlights: string[];
  href: string;
  ctaLabel: string;
  icon: LucideIcon;
  theme: "light" | "dark";
};

export type StatsItem = {
  value: string;
  label: string;
  description: string;
};

export type SuccessStory = {
  title: string;
  highlight: string;
  details: string;
  ctaLabel: string;
  ctaLink: string;
};

const defaultSuccessStory: SuccessStory = {
  title: "From arrival to life in Lagos: a smooth, stress-free move",
  highlight:
    "We supported a family relocating from Amsterdam with housing search, airport arrival, and cultural orientation so everything was ready from the start.",
  details:
    "Airport meet and greet, school viewings, and furniture delivery were coordinated within two weeks, helping the family move into their new home with clarity and confidence.",
  ctaLabel: "Read more testimonials",
  ctaLink: "/aboutUs/Testimonials",
};

const heroTrustItems: TrustItem[] = [
  { value: "50+", label: "Clients supported" },
  { value: "10+", label: "Years of experienceS" },
  { value: "7+", label: "Nigerian locations" },
  { value: "< 24h", label: "Average response time" },
];

const servicePathways: ServicePathway[] = [
  {
    eyebrow: "Housing support",
    title: "Leadwood Homes",
    description:
      "Shortlist stronger housing options faster, with clearer property guidance and move-in support around each decision.",
    audience: "Best for expatriates, executives, families, and short-stay housing needs.",
    highlights: [
      "Apartment and home shortlisting",
      "Viewing coordination and decision support",
      "Move-in readiness through one local partner",
    ],
    href: "/services/leadwoodhomes",
    ctaLabel: "Browse housing options",
    icon: Building2,
    theme: "light",
  },
  {
    eyebrow: "Relocation management",
    title: "Arrival to settling-in",
    description:
      "Move through airport arrival, orientation, and local settling-in with a single team coordinating the practical steps.",
    audience: "Best for assignees, first-time arrivals, relocating families, and hosted guests.",
    highlights: [
      "Airport meet and greet",
      "Orientation and area tours",
      "Structured settling-in and departure support",
    ],
    href: "/services/airportmeetandgreet",
    ctaLabel: "Explore relocation support",
    icon: MapPin,
    theme: "dark",
  },
  {
    eyebrow: "Furniture solutions",
    title: "Leadwood Furniture",
    description:
      "Turn an empty property into a ready-to-live home or work space without the usual sourcing and setup delays.",
    audience: "Best for homes, serviced apartments, offices, and furnished move-in projects.",
    highlights: [
      "Furniture sourcing and curation",
      "Delivery, installation, and setup",
      "Warm, practical spaces prepared for use",
    ],
    href: "/services/leadwoodfurniture",
    ctaLabel: "View furniture solutions",
    icon: Star,
    theme: "light",
  },
  {
    eyebrow: "Corporate relocation",
    title: "Support for HR and mobility teams",
    description:
      "Give employees, executives, and guests one accountable local partner across housing, arrival, furniture, and ongoing support.",
    audience: "Best for multinational employers, HR teams, and global mobility coordination.",
    highlights: [
      "Employee and guest relocation planning",
      "Housing liaison and furnished setup",
      "A more controlled local delivery model",
    ],
    href: "/contact-us",
    ctaLabel: "Talk about corporate relocation",
    icon: BriefcaseBusiness,
    theme: "dark",
  },
];

const serviceLocations = [
  "Lagos",
  "Abuja",
  "Edo",
  "Rivers",
  "Imo",
  "Delta",
  "Akwa Ibom",
];

const clientGroups = [
  "Multinational employers",
  "HR and global mobility teams",
  "Executives and assignees",
  "Relocating families",
  "Serviced apartments",
  "Corporate guests",
];

const deliveryProof = [
  "Housing search is supported through Leadwood Homes.",
  "Furniture sourcing and setup are handled through Leadwood Furniture.",
  "Airport arrival, orientation, and settling-in support stay coordinated under one team.",
];

const successOutcomeItems = [
  "Airport arrival coordinated",
  "School and housing viewings arranged",
  "Furniture delivery handled before move-in",
];

const reviewThemes = [
  "Fast response",
  "Reliable local guidance",
  "Smoother settling-in",
];

const partnerLogos = [
  { imageUrl: "/image/leadhome-removebg-preview.png" },
  { imageUrl: "/image/download (1).png" },
  { imageUrl: "/image/download (5).png" },
  { imageUrl: "/image/download (4).png" },
  { imageUrl: "/image/download (2).png" },
  { imageUrl: "/image/download.png" },
  { imageUrl: "/image/download (3).png" },
];

const defaultStats = [
  {
    value: "300+",
    label: "Clients supported",
    description: "Across housing, relocation, and move-in support in Nigeria.",
  },
  {
    value: "10+",
    label: "Years of experience",
    description: "Helping clients make confident relocation decisions for over a decade.",
  },
  {
    value: "98%",
    label: "Client satisfaction",
    description: "Trusted for responsive, people-first service delivery.",
  },
  {
    value: "7+",
    label: "Service locations",
    description: "Supporting assignments across key Nigerian locations.",
  },
  {
    value: "End-to-end",
    label: "Relocation coverage",
    description: "Housing, arrival support, furniture, and ongoing local coordination.",
  },
  {
    value: "< 24h",
    label: "Average response time",
    description: "Fast answers when timelines and move decisions need clarity.",
  },
];

export default function Landingpage() {
  return (
    <div className="bg-[#fffaf5]">
      <HeroSection />
      <ServicePathwaysSection />
      <CredibilitySection />
      <StatsSection />
      <ClientProofSection />
      <TrustedPartnersSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fff7ea_0%,#fffdf9_45%,#f3e3d0_100%)] pb-16 pt-24 text-[#2f1b0f] sm:pb-20 sm:pt-28 lg:pt-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[-10%] h-56 w-56 rounded-full bg-[#ffd4ad]/70 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
        <div className="absolute right-[-16%] top-[10%] h-60 w-60 rounded-full bg-[#ffe6c8]/80 blur-3xl sm:h-80 sm:w-80 lg:h-[28rem] lg:w-[28rem]" />
        <div className="absolute bottom-[-10%] left-[12%] h-44 w-44 rounded-full bg-[#ffd7b8]/40 blur-3xl sm:h-60 sm:w-60 lg:h-72 lg:w-72" />
        <div className="absolute inset-0 bg-[url('/svg/african-pattern.svg')] opacity-[0.03]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-16">
          <div className="max-w-2xl lg:pt-6">
            <div className="inline-flex items-center gap-2  rounded-full border border-[#e7d4c2] bg-white/90 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#9f4d1d] shadow-[0_16px_35px_-26px_rgba(83,34,12,0.42)] backdrop-blur sm:px-4 sm:text-sm sm:tracking-normal">
              <Sparkles className="h-4 w-4" />
              Housing, relocation, and furniture support in Nigeria
            </div>

            <h1 className="mt-5 text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#281409] sm:mt-6 sm:text-[3rem] lg:text-[4.45rem]">
              Find the right home, move with less stress, and settle faster in Nigeria.
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#5f4938] sm:mt-6 sm:text-lg sm:leading-8">
              G&amp;V Support Services helps expatriates, families, and corporate teams secure
              housing, coordinate relocation, and furnish ready-to-live spaces through one
              experienced local partner.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/contact-us"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#cf5f1f] px-6 py-4 text-sm font-medium text-white shadow-[0_22px_40px_-24px_rgba(177,84,25,0.7)] transition hover:bg-[#b9521a] sm:w-auto sm:px-7"
              >
                Talk to a relocation specialist
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="max-w-sm text-sm leading-6 text-[#715847]">
                Ideal for private moves, executive assignments, and corporate relocation needs.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto w-full max-w-[34rem] rounded-[30px] border border-[#ead8c8] bg-white/92 p-2.5 shadow-[0_32px_90px_-42px_rgba(83,34,12,0.55)] sm:rounded-[36px] sm:p-3 lg:col-start-2 lg:row-span-2 lg:max-w-none"
          >
            <div className="relative aspect-[4/3.8] overflow-hidden rounded-[24px] bg-[#f1e3d5] sm:aspect-[4/4.35] sm:rounded-[30px] lg:aspect-[4/4.7]">
              <Image
                src="/image/leadhome.jpg"
                alt="Premium apartment prepared for move-in support"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,238,0.42)_0%,rgba(255,248,238,0.06)_36%,rgba(37,19,9,0.74)_100%)]" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#9f4d1d] shadow-sm sm:left-5 sm:top-5 sm:px-4 sm:text-xs sm:tracking-[0.24em]">
                <ShieldCheck className="h-4 w-4" />
                One coordinated local partner
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#c56a32]">
                What clients get
              </p>
              <h2 className="mt-3 text-[1.7rem] font-semibold leading-tight tracking-[-0.03em] text-[#271307] sm:text-[2rem]">
                Clear decisions, smoother arrival, and a move-in-ready space.
              </h2>

              <div className="mt-6 space-y-3">
                {deliveryProof.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[#5f4938]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#bf571c]" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] bg-[#2a170c] p-4 text-white sm:rounded-[24px] sm:p-5">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#f3cda3]">
                  Corporate and private relocation
                </p>
                <p className="mt-3 text-sm leading-6 text-[#f7ebdf]">
                  Built for expatriate assignments, executive arrivals, relocating families, serviced
                  apartments, and employers who need reliable local execution.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:gap-5 lg:max-w-2xl">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {heroTrustItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-[#ead8c8] bg-white/90 px-4 py-4 shadow-[0_14px_32px_-28px_rgba(83,34,12,0.42)] sm:rounded-[24px]"
                >
                  <p className="text-lg font-semibold text-[#bf571c] sm:text-xl">{item.value}</p>
                  <p className="mt-1 text-sm leading-5 text-[#5f4938]">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-[#ead9cb] bg-white/90 p-4 shadow-[0_20px_55px_-38px_rgba(83,34,12,0.45)] sm:rounded-[28px] sm:p-5">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#c56a32]">
                Recent relocation result
              </p>
              <p className="mt-3 text-base font-medium text-[#2a180d]">
                One family moved from arrival to furnished move-in with the full process coordinated
                in two weeks.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5f4938]">
                Airport arrival, housing search, school viewings, and furniture delivery were all
                handled through one local support structure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicePathwaysSection() {
  return (
    <section className="bg-[#f8efe6] px-4 py-14 text-[#1d160f] sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#c8612b]">
            Choose your pathway
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
            Start with the support path that matches the assignment.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5f4a3b]">
            These are not decorative service tiles. Each pathway is built around a real client
            decision: secure housing, coordinate relocation, furnish a space, or give a corporate
            team one accountable local partner.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-2">
          {servicePathways.map((pathway, index) => {
            const Icon = pathway.icon;
            const isDark = pathway.theme === "dark";

            return (
              <motion.article
                key={pathway.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`rounded-[28px] border p-6 shadow-[0_22px_60px_-38px_rgba(83,34,12,0.4)] sm:rounded-[32px] sm:p-8 ${
                  isDark
                    ? "border-[#3f2616] bg-[#21140b] text-white"
                    : "border-[#ead9cb] bg-white text-[#1d160f]"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p
                      className={`text-xs font-medium uppercase tracking-[0.26em] ${
                        isDark ? "text-[#f3cda3]" : "text-[#c8612b]"
                      }`}
                    >
                      {pathway.eyebrow}
                    </p>
                    <h3 className="mt-3 text-[1.45rem] font-semibold leading-tight sm:text-2xl">
                      {pathway.title}
                    </h3>
                  </div>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${
                      isDark ? "bg-white/10 text-[#f3cda3]" : "bg-[#fff3e7] text-[#bf571c]"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <p
                  className={`mt-5 text-[15px] leading-7 sm:text-base ${
                    isDark ? "text-white/80" : "text-[#5f4a3b]"
                  }`}
                >
                  {pathway.description}
                </p>

                <div
                  className={`mt-6 rounded-[22px] p-4 sm:rounded-[24px] sm:p-5 ${
                    isDark ? "bg-white/6" : "bg-[#fff8f2]"
                  }`}
                >
                  <p
                    className={`text-xs font-medium uppercase tracking-[0.22em] ${
                      isDark ? "text-[#f3cda3]" : "text-[#c8612b]"
                    }`}
                  >
                    Best for
                  </p>
                  <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/75" : "text-[#5f4a3b]"}`}>
                    {pathway.audience}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {pathway.highlights.map((item) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 text-sm leading-6 ${
                        isDark ? "text-white/78" : "text-[#5f4a3b]"
                      }`}
                    >
                      <CheckCircle2
                        className={`mt-0.5 h-5 w-5 shrink-0 ${
                          isDark ? "text-[#f3cda3]" : "text-[#bf571c]"
                        }`}
                      />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={pathway.href}
                  className={`mt-8 inline-flex w-full items-center justify-between gap-2 rounded-full border px-5 py-3 text-sm font-medium transition sm:w-fit ${
                    isDark
                      ? "border-white/12 bg-white/8 text-[#f7e2cf] hover:bg-white/12 hover:text-white"
                      : "border-[#e2c7b4] bg-[#fff8f2] text-[#a5430c] hover:bg-[#fff1e4] hover:text-[#cf5f1f]"
                  }`}
                >
                  {pathway.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CredibilitySection() {
  return (
    <section className="bg-[#1c120b] px-4 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.8)] sm:rounded-[34px] sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#f3cda3]">
              Professional credibility
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
              Built for global teams, corporate assignees, and families relocating into Nigeria.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/75">
              G&amp;V Support Services combines housing support, relocation coordination, furniture
              setup, and local guidance under one delivery structure so clients do not have to piece
              the process together themselves.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-5 sm:rounded-[28px] sm:p-6">
                <div className="flex items-center gap-3 text-[#f3cda3]">
                  <Globe2 className="h-5 w-5" />
                  <p className="text-sm font-medium uppercase tracking-[0.2em]">Service locations</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {serviceLocations.map((location) => (
                    <span
                      key={location}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/88"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/6 p-5 sm:rounded-[28px] sm:p-6">
                <div className="flex items-center gap-3 text-[#f3cda3]">
                  <Users className="h-5 w-5" />
                  <p className="text-sm font-medium uppercase tracking-[0.2em]">
                    Client groups served
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {clientGroups.map((group) => (
                    <span
                      key={group}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/88"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div className="rounded-[28px] bg-[#fff4e8] p-6 text-[#26150a] shadow-[0_24px_70px_-42px_rgba(0,0,0,0.55)] sm:rounded-[34px] sm:p-8">
              <div className="flex items-center gap-3 text-[#bf571c]">
                <BriefcaseBusiness className="h-5 w-5" />
                <p className="text-sm font-medium uppercase tracking-[0.2em]">
                  Corporate relocation option
                </p>
              </div>
              <h3 className="mt-4 text-[1.55rem] font-semibold leading-tight sm:text-2xl">
                Give HR and mobility teams one accountable local partner.
              </h3>
              <p className="mt-4 text-base leading-7 text-[#5f4a3b]">
                Useful for employee assignments, executive arrivals, guest hosting, and projects that
                need controlled housing, relocation, and move-in support across Nigeria.
              </p>
              <div className="mt-6 space-y-3 text-sm leading-6 text-[#5f4a3b]">
                {[
                  "Arrival coordination and local orientation",
                  "Housing search liaison and move-in support",
                  "Furniture setup for homes, offices, or serviced apartments",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#bf571c]" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/contact-us"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#a5430c] transition hover:text-[#cf5f1f]"
              >
                Discuss corporate relocation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.8)] sm:rounded-[34px] sm:p-8">
              <div className="flex items-center gap-3 text-[#f3cda3]">
                <ShieldCheck className="h-5 w-5" />
                <p className="text-sm font-medium uppercase tracking-[0.2em]">Why teams trust us</p>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  "Trusted housing partner: Leadwood Homes",
                  "Furniture sourcing and setup through Leadwood Furniture",
                  "Average response time under 24 hours for active enquiries",
                  "One connected workflow from arrival to move-in support",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f3cda3]" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const [statsData, setStatsData] = useState<StatsItem[]>(defaultStats);

  useEffect(() => {
    let active = true;

    fetch("/api/stats")
      .then((res) => res.json())
      .then((data: StatsItem[]) => {
        if (!active) return;
        if (Array.isArray(data) && data.length > 0) {
          setStatsData(data);
        }
      })
      .catch(() => {
        // Keep fallback metrics if the API is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-[#f7efe7] px-4 py-14 text-[#1d160f] sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#c8612b]">
            Results and responsiveness
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
            Performance proof that helps new clients trust the next step.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5f4a3b]">
            These numbers help show the scale, speed, and breadth of the support clients can expect
            from G&amp;V Support Services.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 xl:grid-cols-3">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[26px] border border-[#e6d1c1] bg-white p-6 shadow-[0_18px_50px_-34px_rgba(74,37,15,0.32)] sm:rounded-[30px] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-4xl font-semibold text-[#bf571c]">{stat.value}</p>
                  <p className="mt-3 text-lg font-medium text-[#1d160f]">{stat.label}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff2e6] text-[#bf571c]">
                  {index % 2 === 0 ? <Clock3 className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#5f4a3b]">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientProofSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [story, setStory] = useState<SuccessStory>(defaultSuccessStory);

  useEffect(() => {
    const loadReviews = () => {
      setReviews(getAllReviews());
    };

    let active = true;
    loadReviews();

    fetch("/api/success")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setStory(data);
      })
      .catch(() => {
        setStory(defaultSuccessStory);
      });

    window.addEventListener(REVIEW_UPDATE_EVENT, loadReviews);
    window.addEventListener("storage", loadReviews);

    return () => {
      active = false;
      window.removeEventListener(REVIEW_UPDATE_EVENT, loadReviews);
      window.removeEventListener("storage", loadReviews);
    };
  }, []);

  const averageRating = getAverageRating(reviews);
  const featuredReviews = reviews.slice(0, 2);

  return (
    <section className="bg-[#fff9f4] px-4 py-14 text-[#1d160f] sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#c8612b]">
            Client proof
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
            Confidence grows when the proof is visible.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5f4a3b]">
            Review data appears here automatically when feedback is submitted on this device, and
            the case study on the right shows the kind of outcome clients rely on us to deliver.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[28px] border border-[#ead9cb] bg-white p-6 shadow-[0_18px_50px_-34px_rgba(74,37,15,0.3)] sm:rounded-[32px] sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#c8612b]">
                  Review snapshot
                </p>
                <h3 className="mt-2 text-[1.55rem] font-semibold text-[#1d160f] sm:text-2xl">
                  What clients say about the experience
                </h3>
              </div>

              {reviews.length ? (
                <div className="rounded-[22px] bg-[#fff4e8] px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#a5430c]">
                    Average rating
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <p className="text-2xl font-semibold text-[#1d160f]">{averageRating.toFixed(1)}</p>
                    <ReviewStars rating={averageRating} size={16} />
                  </div>
                </div>
              ) : null}
            </div>

            {featuredReviews.length ? (
              <div className="mt-8 space-y-5">
                {featuredReviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-[24px] border border-[#ead9cb] bg-[#fffaf6] p-5 sm:rounded-[28px] sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <ReviewStars rating={review.rating} size={16} />
                        <p className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#7b4a2a]">
                          {review.service}
                        </p>
                      </div>
                      <MessageSquareQuote className="h-7 w-7 shrink-0 text-[#cf5f1f]" />
                    </div>
                    <p className="mt-5 text-base leading-7 text-[#5f4a3b]">
                      "{review.comment}"
                    </p>
                    <div className="mt-5 border-t border-[#ead9cb] pt-4">
                      <p className="text-base font-medium text-[#1d160f]">{review.name}</p>
                      <p className="mt-1 text-sm text-[#7b6556]">{review.location}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                <div className="rounded-[24px] border border-dashed border-[#dd5500]/35 bg-[#fffaf6] p-5 sm:rounded-[28px] sm:p-6">
                  <p className="text-lg font-medium text-[#1d160f]">No local reviews yet</p>
                  <p className="mt-3 text-sm leading-7 text-[#5f4a3b]">
                    Client reviews will appear here after feedback is submitted on this device. You
                    can still use the case study and performance proof on this page to understand
                    the kind of support we deliver.
                  </p>
                </div>

                <div className="rounded-[24px] bg-[#fff4e8] p-5 sm:rounded-[28px] sm:p-6">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#a5430c]">
                    What clients consistently value
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {reviewThemes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white px-3 py-2 text-sm text-[#7b4a2a]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/aboutUs/Testimonials"
                className="inline-flex items-center justify-center rounded-full bg-[#dd5500] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#c54800]"
              >
                Read testimonials
              </Link>
              <Link
                href="/aboutUs/feedback"
                className="inline-flex items-center justify-center rounded-full border border-[#ead9cb] bg-white px-6 py-3 text-sm font-medium text-[#1d160f] transition hover:bg-[#fff9f2]"
              >
                Leave a review
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#21140b] p-6 text-white shadow-[0_24px_80px_-42px_rgba(0,0,0,0.72)] sm:rounded-[32px] sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#f3cda3]">
              Successful case
            </p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">{story.title}</h3>
            <p className="mt-5 text-base leading-8 text-white/80">{story.highlight}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {successOutcomeItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/10 bg-white/6 p-4 text-sm leading-6 text-white/82"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#f3cda3]" />
                  <p className="mt-3">{item}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm leading-7 text-white/74">{story.details}</p>

            <Link
              href={story.ctaLink}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#f7e2cf] transition hover:text-white"
            >
              {story.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedPartnersSection() {
  return (
    <section className="bg-[#f6efe7] px-4 py-14 text-[#1d160f] sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#c8612b]">
            Trusted partners
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
            Delivery backed by housing, furnishing, and support brands clients can recognize.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5f4a3b]">
            Our support model works best when the right partners are connected to the assignment.
            These brands and service relationships help us deliver housing, furnishing, and local
            coordination more reliably.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5 xl:grid-cols-7">
          {partnerLogos.map((sponsor, index) => (
            <div
              key={index}
              className="flex min-h-[7rem] items-center justify-center rounded-[22px] border border-[#ead9cb] bg-white p-4 shadow-[0_16px_42px_-32px_rgba(74,37,15,0.25)] sm:min-h-[8.5rem] sm:rounded-[26px] sm:p-5"
            >
              <Image
                src={sponsor.imageUrl}
                alt={`Partner logo ${index + 1}`}
                width={200}
                height={110}
                className="h-16 w-full object-contain sm:h-20"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
