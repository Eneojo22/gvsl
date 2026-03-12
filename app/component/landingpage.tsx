"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Star, MapPin } from "lucide-react";

import { CardsCarousel } from "./courasel";
import { HoverEffect } from "./uiforcomponent/sectionsumary";

interface HeroMessage {
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  image: string;
}

const heroMessages: HeroMessage[] = [
  {
    title: "Your Journey Starts Here",
    description:
      "G&V Support Services Limited turns relocation complexity into a smooth, well-coordinated experience from arrival to housing, furniture setup, and settling in.",
    cta: "Explore Services",
    ctaLink: "/services/airportmeetandgreet",
    image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg",
  },
  {
    title: "Seamless Arrival Support",
    description:
      "Airport Meet & Greet, immigration guidance, and direct transfer to your accommodation, handled with care and precision.",
    cta: "Airport Meet and Greet",
    ctaLink: "/services/airportmeetandgreet",
    image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg",
  },
  {
    title: "Houses and Apartments",
    description:
      "Secure the right house or apartment faster with trusted local guidance, shortlisted options, and coordinated viewings through Leadwood Homes.",
    cta: "Leadwood Homes",
    ctaLink: "/services/leadwoodhomes",
    image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg",
  },
  {
    title: "Furniture",
    description:
      "Premium furniture solutions for homes, apartments, and serviced spaces, delivered quickly and professionally through Leadwood Furniture.",
    cta: "Leadwood Furniture",
    ctaLink: "/services/leadwoodfurniture",
    image: "/image/chad-peltola-Rch8oP-O5sU-unsplash.jpg",
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
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
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
          Housing, furniture, and relocation support in Nigeria.
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-7 text-[#5a473a]">
          G&amp;V Support Services Limited, also searched as G and V Support
          Services or GandV, helps clients with houses, apartments, furniture,
          airport meet and greet, orientation, and departure support in Nigeria.
          Through Leadwood Homes and Leadwood Furniture, we connect housing and
          furnishing needs under one trusted brand.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            href="/services/leadwoodhomes"
            className="rounded-[24px] border border-[#ead9cb] bg-[#fff8f2] px-5 py-5 transition hover:border-[#dd5500] hover:bg-white"
          >
            <p className="text-lg font-semibold">Leadwood Homes</p>
            <p className="mt-2 text-sm leading-6 text-[#5a473a]">
              Browse houses and apartments supported by G&amp;V.
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
            href="/contact-us"
            className="rounded-[24px] border border-[#ead9cb] bg-[#fff8f2] px-5 py-5 transition hover:border-[#dd5500] hover:bg-white"
          >
            <p className="text-lg font-semibold">Contact G&amp;V</p>
            <p className="mt-2 text-sm leading-6 text-[#5a473a]">
              Talk to our team about housing, furniture, or relocation support.
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
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const transitionDuration = 1000;
    const displayDuration = 6000;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      timeoutId = setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % heroMessages.length);
        setIsTransitioning(false);
      }, transitionDuration);
    }, displayDuration + transitionDuration);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const currentMessage = heroMessages[currentMessageIndex];

  return (
    <section className="relative flex min-h-screen items-center bg-gradient-to-r from-[#000000] to-[#868585] text-white">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isTransitioning ? "opacity-0" : "opacity-50"
        }`}
      >
        <Image
          src={currentMessage.image}
          alt={currentMessage.title}
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-[url('/svg/african-pattern.svg')] bg-repeat opacity-20" />
      </div>

      <div className="z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-left">
        <div className="relative inline-flex items-center">
          <h1 className="animate-fade p-5 text-center text-5xl font-extrabold text-black md:text-8xl md:text-white">
            {currentMessage.title}
          </h1>

          <motion.div
            className="absolute -left-8 -top-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-7 w-7 text-[#f7d3aa]" />
          </motion.div>

          <motion.div
            className="absolute -right-8 -top-4"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Star className="h-7 w-7 text-[#ffb74d]" />
          </motion.div>

          <motion.div
            className="absolute -right-10 bottom-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin className="h-6 w-6 text-[#ff8f00]" />
          </motion.div>
        </div>

        <p className="animate-fade mb-6 max-w-3xl pb-3.5 text-center text-lg">
          {currentMessage.description}
        </p>
        <Link
          href={currentMessage.ctaLink}
          className="animate-fade rounded bg-white p-3 text-lg font-semibold text-[#c93e08] transition hover:bg-[#f3f3f3] md:px-10 md:py-5 md:text-2xl"
        >
          {currentMessage.cta}
        </Link>
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
