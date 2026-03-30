"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  MapPin,
  PhoneCall,
  Sparkles,
  Star,
} from "lucide-react";

import { CardsCarousel } from "./courasel";
import { HoverEffect } from "./uiforcomponent/sectionsumary";

interface HeroMessage {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  image: string;
  alt: string;
  supporting: string;
  focus: string[];
}

const heroMessages: HeroMessage[] = [
  {
    eyebrow: "Property management",
    title: "Leadwood Homes",
    description:
      "Shortlisted properties, guided inspections, and move-in preparation that keep the home search calm, clear, and well supported.",
    cta: "Explore Homes",
    ctaLink: "/services/leadwoodhomes",
    image: "/image/leadhome.jpg",
    alt: "Bright apartment interior prepared for a client move-in",
    supporting:
      "Clean spaces, trusted listings, and confident property decisions from the first viewing.",
    focus: ["Apartment sourcing", "Viewing coordination", "Move-in readiness"],
  },
  {
    eyebrow: "Relocation management",
    title: "Arrival and settling-in support",
    description:
      "Airport arrival, local orientation, and practical settling-in guidance that make a new city feel warm and manageable from day one.",
    cta: "Plan Your Move",
    ctaLink: "/services/airportmeetandgreet",
    image: "/image/meetgreet.jpg",
    alt: "Concierge-style relocation support for arriving clients",
    supporting:
      "From airport pickup to orientation and onward coordination, every step feels smoother.",
    focus: ["Airport meet and greet", "Orientation support", "Settling-in guidance"],
  },
  {
    eyebrow: "Furniture solutions",
    title: "Leadwood Furniture",
    description:
      "Furniture packages, styling, delivery, and setup that turn an empty apartment into a welcoming living space without the usual stress.",
    cta: "View Furniture",
    ctaLink: "/services/leadwoodfurniture",
    image: "/image/dinningroom.jpg",
    alt: "Warm dining room furniture styled for comfortable living",
    supporting:
      "Thoughtful furniture choices that make homes, serviced apartments, and offices feel complete.",
    focus: ["Furniture sourcing", "Interior setup", "Ready-to-live spaces"],
  },
];

const heroPillars = [
  {
    title: "Property management",
    description:
      "Apartment discovery, shortlist support, inspections, and readiness for a smooth move-in.",
    icon: Building2,
  },
  {
    title: "Relocation management",
    description:
      "Arrival support, orientation, and local coordination handled by one responsive team.",
    icon: MapPin,
  },
  {
    title: "Furniture solutions",
    description:
      "Warm, functional spaces with curated furniture delivery and setup across your new home.",
    icon: Star,
  },
];

const heroStats = [
  {
    value: "300+",
    label: "Relocations completed",
    note: "Trusted support for families, teams, and executives.",
  },
  {
    value: "98%",
    label: "Client satisfaction",
    note: "A calm, people-first experience clients remember.",
  },
  {
    value: "< 24h",
    label: "Average response time",
    note: "Fast answers when decisions need to move quickly.",
  },
  {
    value: "One team",
    label: "Property, move, and furniture",
    note: "Everything connected for a more seamless journey.",
  },
];

const packages = [
  { imageUrl: "/image/leadhome-removebg-preview.png" },
  { imageUrl: "/image/download (1).png" },
  { imageUrl: "/image/download (5).png" },
  { imageUrl: "/image/download (4).png" },
  { imageUrl: "/image/download (2).png" },
  { imageUrl: "/image/download.png" },
  { imageUrl: "/image/download (3).png" },
];

export const projects = [
  {
    title: "Leadwood Homes",
    description:
      "Access premium houses, apartments, and housing options through our partnership with Leadwood Homes, with secure locations and flexible choices.",
    link: "/services/leadwoodhomes",
  },
  {
    title: "Leadwood Furniture",
    description:
      "Premium furniture options for homes and apartments, selected for quality, style, and durability.",
    link: "/services/leadwoodfurniture",
  },
  {
    title: "Airport Meet and Greet",
    description:
      "Personalized arrival support from immigration guidance and luggage assistance to a smooth transfer to your accommodation.",
    link: "/services/airportmeetandgreet",
  },
  {
    title: "Car Rental Services",
    description:
      "Reliable transportation with well-maintained vehicles and professional drivers, available across Nigeria.",
    link: "/services/rentals",
  },
  {
    title: "Orientation",
    description:
      "A tailored onboarding experience covering local culture, safety guidance, and practical settling-in support.",
    link: "/services/orientation",
  },
];

const defaultStats = [
  {
    value: "300+",
    label: "Relocations completed",
    description: "Supporting families and executives across Nigeria.",
  },
  {
    value: "10+",
    label: "Years of experience",
    description: "Delivering dependable support since day one.",
  },
  {
    value: "98%",
    label: "Customer satisfaction",
    description: "Trusted by clients for consistent, people-first service.",
  },
  {
    value: "6+",
    label: "Cities covered",
    description: "Active presence across Nigeria’s major hubs.",
  },
  {
    value: "15+",
    label: "Team members",
    description: "Experienced local specialists working together for you.",
  },
  {
    value: "< 24h",
    label: "Avg response time",
    description: "Fast answers when you need them most.",
  },
];

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

const Landingpage = () => {
  return (
    <div>
      <HeroSection />
      <BrandSearchSection />
      <StatsSection />
      <SuccessStory />
      <CardHoverEffect />
      <CardsCarousel />
      <OurSponsors />
    </div>
  );
};

function SuccessStory() {
  const [story, setStory] = useState<SuccessStory | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/success")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setStory(data);
      })
      .catch(() => {
        // keep defaults if the API is not available
        setStory({
          title: "From arrival to life in Lagos: A smooth, stress-free journey",
          highlight:
            "We helped a family relocate from Amsterdam with a fully coordinated move, housing search, and cultural orientation. Everything was ready on day one.",
          details:
            "Our team booked airport meet-and-greet, handled immigration support, lined up school viewings, and arranged furniture delivery — all within two weeks. The family moved into their new home confidently and hit the ground running.",
          ctaLabel: "Read more testimonials",
          ctaLink: "/aboutUs/Testimonials",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  if (!story) {
    return null;
  }

  return (
    <section className="bg-[#fff8f2] px-4 py-16 text-black">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#ead9cb] bg-white p-10 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#c8612b]">
              Success story
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              {story.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#5a473a]">
              {story.highlight}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#5a473a]">
              {story.details}
            </p>
            <Link
              href={story.ctaLink}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c54800]"
            >
              {story.ctaLabel}
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative h-80 w-full max-w-md">
              <div className="absolute -left-10 -top-8 h-14 w-14 rounded-full bg-[#dd5500]/20" />
              <div className="absolute -right-10 -bottom-8 h-16 w-16 rounded-full bg-[#c54800]/20" />
              <div className="absolute left-8 top-16 h-24 w-24 rounded-full bg-[#fac7b0]/40" />
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[#ead9cb] bg-[#fffaf4] shadow-sm">
                <Image
                  src="/image/meetgreet.jpg"
                  alt="Success story"
                  fill
                  className="object-cover"
                  priority
                />
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
        // keep defaults if API is not available
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-[#fcf7f1] px-4 py-16 text-black">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#c8612b]">
            Quick facts
          </p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            Numbers that matter
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#5a473a]">
            These numbers reflect our commitment to timely support, strong local
            partnerships, and a growing network of satisfied clients.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.09 }}
              className="rounded-3xl border border-[#ead9cb] bg-white p-8 text-center shadow-sm"
            >
              <p className="text-4xl font-semibold text-[#dd5500]">{stat.value}</p>
              <p className="mt-2 text-lg font-semibold text-[#1f1f1f]">{stat.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#5a473a]">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


const BrandSearchSection = () => {
  return (
    <section className="bg-[#fcf7f1] px-4 py-16 text-black">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-[#ead9cb] bg-white p-8 shadow-[0_18px_50px_-28px_rgba(74,37,15,0.2)] md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#c8612b]">
          G&amp;V Support Services
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
          Find apartments in Lagos, furnish homes, and settle in Nigeria.
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-7 text-[#5a473a]">
          G&amp;V Support Services Limited, also searched as G and V Support
          Services, GVSS, or GandV, helps clients find apartments and houses in
          Lagos, furnish homes and offices, and manage relocation support
          across Nigeria. Through Leadwood Homes and Leadwood Furniture, we
          bring housing, furnishing, airport meet and greet, orientation, and
          departure services together under one trusted brand.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            href="/services/leadwoodhomes"
            className="rounded-[24px] border border-[#ead9cb] bg-[#fff8f2] px-5 py-5 transition hover:border-[#dd5500] hover:bg-white"
          >
            <p className="text-lg font-semibold">Leadwood Homes</p>
            <p className="mt-2 text-sm leading-6 text-[#5a473a]">
              Browse apartments in Lagos and housing options supported by G&amp;V.
            </p>
          </Link>
          <Link
            href="/services/leadwoodfurniture"
            className="rounded-[24px] border border-[#ead9cb] bg-[#fff8f2] px-5 py-5 transition hover:border-[#dd5500] hover:bg-white"
          >
            <p className="text-lg font-semibold">Leadwood Furniture</p>
            <p className="mt-2 text-sm leading-6 text-[#5a473a]">
              Explore furniture solutions for homes, apartments, and offices.
            </p>
          </Link>
          <Link
            href="/services/airportmeetandgreet"
            className="rounded-[24px] border border-[#ead9cb] bg-[#fff8f2] px-5 py-5 transition hover:border-[#dd5500] hover:bg-white"
          >
            <p className="text-lg font-semibold">Relocation Support</p>
            <p className="mt-2 text-sm leading-6 text-[#5a473a]">
              Get arrival, orientation, and settling-in support from one local team.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

const OurSponsors = () => {
  return (
    <section className="mb-12 bg-white py-10">
      <h2 className="mb-8 text-center text-3xl font-semibold text-black">Our Partners</h2>
      <div className="grid grid-cols-2 gap-6 px-6 sm:grid-cols-3 md:grid-cols-7 md:px-12">
        {packages.map((sponsor, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-lg bg-white p-4 transition"
          >
            <Image
              src={sponsor.imageUrl}
              alt={`Partner logo ${index + 1}`}
              width={200}
              height={100}
              className="h-20 w-full object-contain md:h-24"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const HeroSection: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % heroMessages.length);
    }, 6500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const currentMessage = heroMessages[currentMessageIndex];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fff7ea_0%,#fffdf9_48%,#f5eadb_100%)] pb-16 pt-32 text-[#2f1b0f] sm:pb-20 sm:pt-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-14%] h-72 w-72 rounded-full bg-[#ffd5ad]/70 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute right-[-10%] top-[18%] h-72 w-72 rounded-full bg-[#ffe7c7]/80 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute bottom-[-8%] left-[20%] h-56 w-56 rounded-full bg-[#ffd9b4]/45 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute inset-0 bg-[url('/svg/african-pattern.svg')] opacity-[0.035]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#fff9f2]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e9d6c4] bg-white/80 px-4 py-2 text-sm font-medium text-[#a55422] shadow-[0_16px_35px_-26px_rgba(83,34,12,0.45)] backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Warm support for property, relocation, and furniture needs
            </div>

            <h1
              className="mt-6 text-[2.9rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#281409] sm:text-5xl lg:text-[3.9rem]"
            >
              A brighter start to every move, home, and living space.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#5f4938] sm:text-lg">
              G&amp;V Support Services brings property management, relocation
              coordination, and furniture solutions together in one calm,
              welcoming experience, helping clients arrive well, choose well,
              and settle in with confidence.
            </p>

            <div className="mt-5 rounded-[28px] border border-[#eddccf] bg-white/85 p-5 shadow-[0_22px_60px_-38px_rgba(83,34,12,0.45)] backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#c56a32]">
                Now spotlighting {currentMessage.eyebrow}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#5f4938] sm:text-base">
                {currentMessage.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {currentMessage.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#fff5ea] px-3 py-2 text-xs font-medium text-[#8b4a1d] sm:text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={currentMessage.ctaLink}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#cf5f1f] px-7 py-4 text-sm font-medium text-white shadow-[0_22px_40px_-24px_rgba(177,84,25,0.7)] transition hover:bg-[#b9521a]"
              >
                {currentMessage.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-[#d7bca8] bg-white/70 px-7 py-4 text-sm font-medium text-[#7d4119] transition hover:border-[#cf5f1f] hover:text-[#cf5f1f]"
              >
                Speak to our team
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {heroPillars.map(({ title, description, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-[28px] border border-[#ead8c8] bg-white/75 p-5 shadow-[0_18px_48px_-34px_rgba(83,34,12,0.45)] backdrop-blur"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1e3] text-[#b5561b]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-base font-medium text-[#2f1b0f]">
                    {title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#66503f]">
                    {description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-12 hidden h-28 w-28 rounded-full bg-[#ffd1aa]/60 blur-3xl lg:block" />
            <div className="absolute right-0 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full bg-[#ffe6c6]/75 blur-2xl lg:block" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage.title}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[34px] border border-[#ebdacc] bg-white/85 p-3 shadow-[0_28px_90px_-42px_rgba(83,34,12,0.55)]"
              >
                <div className="relative aspect-[4/4.8] overflow-hidden rounded-[28px] bg-[#f0e3d4] sm:aspect-[4/4.5]">
                  <Image
                    src={currentMessage.image}
                    alt={currentMessage.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,249,240,0.58)_0%,rgba(255,249,240,0.08)_34%,rgba(48,23,10,0.18)_100%)]" />

                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/88 px-4 py-2 text-xs font-medium uppercase tracking-[0.26em] text-[#a24f1e] shadow-sm backdrop-blur">
                    <CheckCircle2 className="h-4 w-4" />
                    Satisfaction-focused support
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 rounded-[28px] bg-white/90 p-5 shadow-[0_20px_55px_-36px_rgba(39,17,5,0.85)] backdrop-blur">
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#c56a32]">
                      {currentMessage.eyebrow}
                    </p>
                    <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h2
                          className="text-[1.9rem] font-semibold leading-tight tracking-[-0.02em] text-[#271307] sm:text-[2.15rem]"
                        >
                          {currentMessage.title}
                        </h2>
                        <p className="mt-3 max-w-md text-sm leading-6 text-[#5f4938]">
                          {currentMessage.supporting}
                        </p>
                      </div>
                      <Link
                        href={currentMessage.ctaLink}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#b5561b] transition hover:text-[#8f4718]"
                      >
                        Learn more
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="absolute -left-5 bottom-10 hidden max-w-[17rem] rounded-[28px] border border-[#ebd8c8] bg-white/92 p-5 shadow-[0_18px_55px_-34px_rgba(83,34,12,0.52)] xl:block"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff2e6] text-[#b5561b]">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2b170a]">
                    One reassuring point of contact
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#66503f]">
                    Property search, relocation planning, and furniture setup
                    coordinated without the usual back and forth.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-8 hidden rounded-[24px] bg-[#2d1508] px-5 py-4 text-white shadow-[0_24px_50px_-34px_rgba(31,13,4,0.95)] lg:block"
            >
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#f3cda3]">
                Client feeling
              </p>
              <p className="mt-2 text-2xl font-medium">Warm. Clear. Settled.</p>
              <p className="mt-2 max-w-[14rem] text-sm leading-6 text-[#f7ebdf]">
                Support that feels welcoming from first enquiry to move-in and
                final furniture setup.
              </p>
            </motion.div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {heroMessages.map((message, index) => (
                <button
                  key={message.title}
                  type="button"
                  onClick={() => setCurrentMessageIndex(index)}
                  aria-label={`Show ${message.title} spotlight`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    index === currentMessageIndex
                      ? "bg-[#cf5f1f] text-white shadow-[0_18px_35px_-24px_rgba(177,84,25,0.65)]"
                      : "bg-white/80 text-[#8a4a1d] hover:bg-[#fff2e6]"
                  }`}
                >
                  {message.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[28px] border border-[#ead8c8] bg-white/80 p-5 shadow-[0_16px_42px_-30px_rgba(83,34,12,0.4)] backdrop-blur"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-3xl font-medium text-[#c75f22]">{stat.value}</p>
                  <p className="mt-2 text-base font-medium text-[#29160a]">
                    {stat.label}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff2e6] text-[#b5561b]">
                  {index % 2 === 0 ? (
                    <Clock3 className="h-5 w-5" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#66503f]">{stat.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export function CardHoverEffect() {
  return (
    <div className="border-2 px-8 md:min-h-screen">
      <HoverEffect items={projects} />
    </div>
  );
}

export default Landingpage;
