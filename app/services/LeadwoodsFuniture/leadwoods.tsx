"use client";

import Image from "next/image";
import Link from "next/link";
import { InfiniteMovingCard } from "./infinite";

// ---------- TYPES ----------
type SectionItem = {
  heading: string;
  paragraphs: string[];
};

type GVRelocationSectionProps = {
  title: string;
  image: string;
  imageAlt: string;
  intro: string[];
  sections: SectionItem[];
};

type FeatureItem = {
  image?: string;
  icon?: string;
  heading: string;
  text?: string;
  title?: string;
  description?: string;
};

type FeatureCardsProps = {
  title: string;
  items: FeatureItem[];
};

type IconGridProps = {
  title: string;
  items: FeatureItem[];
};

type SupportFeaturesProps = {
  heading: string;
  subHeading?: string;
  features: FeatureItem[];
};

// ---------- COMPONENTS ----------

const GVRelocationSection = ({
  title,
  image,
  imageAlt,
  intro,
  sections,
}: GVRelocationSectionProps) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 border-2">
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center">
        {title}
      </h1>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative w-full h-[320px] rounded-xl overflow-hidden">
          <Image src={image} alt={imageAlt} fill className="object-cover" />
        </div>

        <div className="text-gray-700 space-y-4">
          {intro.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-10 text-gray-700">
        {sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-2xl font-semibold text-black mb-3">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, j) => (
              <p key={j} className={j > 0 ? "mt-3" : ""}>
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const FeatureCards = ({ title, items }: FeatureCardsProps) => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-12 text-center text-[#565a63]">
        {title}
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {items.map((item, index) => (
          <div key={index} className="space-y-4">
            {item.image && (
              <div className="relative w-full h-[250px] rounded-xl overflow-hidden">
                <Image src={item.image} alt={item.heading} fill className="object-cover" />
              </div>
            )}
            <h3 className="text-xl font-semibold text-black">{item.heading}</h3>
            {item.text && <p className="text-gray-800">{item.text}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

const IconGrid = ({ title, items }: IconGridProps) => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-14 text-center text-black">{title}</h2>

      <div className="grid md:grid-cols-3 gap-12">
        {items.map((item, index) => (
          <div key={index} className="text-center space-y-4">
            {item.icon && (
              <div className="flex justify-center">
                <div className="relative w-36 h-36 mx-auto">
                  <Image src={item.icon} alt={item.heading} fill className="object-contain" />
                </div>
              </div>
            )}
            <h3 className="text-lg font-semibold text-black">{item.heading}</h3>
            {item.text && <p className="text-gray-600 text-sm">{item.text}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

const SupportFeatures = ({ heading, subHeading, features }: SupportFeaturesProps) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">{heading}</h2>
        {subHeading && <p className="text-gray-700 mt-2">{subHeading}</p>}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 space-y-4 text-center">
            {feature.icon && (
              <div className="relative w-20 h-20 mx-auto">
                <Image src={feature.icon} alt={feature.title || ""} fill className="object-contain" />
              </div>
            )}
            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------- DATA ----------

const features: FeatureItem[] = [
  { heading: "Reliable Support", description: "We provide dependable support services that businesses can count on, no matter the challenge." },
  { heading: "Experienced Professionals", description: "Our team consists of trained and experienced professionals dedicated to delivering quality service." },
  { heading: "Wide Range of Services", description: "From technical assistance to operational support, we offer solutions tailored to your needs." },
  { heading: "Cost-Effective Solutions", description: "Our services are designed to maximize value while keeping costs affordable and predictable." },
  { heading: "Fast Response Time", description: "We act quickly and efficiently to resolve issues and minimize downtime." },
  { heading: "Stress-Free Experience", description: "G&V handles the details so you can focus on growing your business." },
];


// ---------- MAIN PAGE ----------

export default function Herowood() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="mt-40 relative h-[520px] flex flex-col justify-between">
        <Image
          src="/image/funitures.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          <p className="text-sm uppercase tracking-widest text-white">
            Leadwoods by G&V Support Services
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-white my-4">
            Furnish Smarter. Live Better.
          </h1>

          <p className="text-white/90 mb-6 max-w-xl">
            Premium furniture solutions for homes, offices, and serviced apartments across Nigeria.
          </p>

          <div className="flex space-x-4">
            <button className="px-6 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-[#dd5500] transition duration-300">
              Explore Collection
            </button>
            <button className="px-6 py-3 rounded-full bg-[#dd5500] text-white font-medium hover:bg-gray-200 hover:text-black transition duration-300">
              Get Quote
            </button>
          </div>
        </div>

        <InfiniteMovingCard />
      </section>

      {/* CTA */}
      <div className="text-black m-10 p-10 rounded-xl flex flex-col md:flex-row items-center justify-center gap-6 bg-gray-50">
        <p className="text-4xl font-semibold text-center md:text-left">
          Let’s create a space you’ll love living in.
        </p>

        <Link href="/services/LeadwoodsFuniture/leadwoods-funitures/">
          <button className="bg-white text-black py-3 px-6 border-4 rounded-full text-lg hover:bg-[#dd5500] hover:text-white transition duration-300">
            Get Started
          </button>
        </Link>
      </div>

      {/* CONTENT */}
      <GVRelocationSection
        title="Leadwoods Furniture Solutions for Modern Living"
        image="/image/leadswood picture/yevhen-ptashnyk-TGhaRbUwbxI-unsplash.jpg"
        imageAlt="Leadwoods Furniture"
        intro={[
          "Leadwoods by G&V Support Services provides smart, stylish, and flexible furniture solutions for individuals, expatriates, businesses, and serviced apartments across Nigeria.",
          "We remove the stress of furnishing by handling selection, delivery, installation, and support so you can focus on living, working, and growing comfortably.",
        ]}
        sections={[
          {
            heading: "Why Choose Leadwoods When Setting Up in Nigeria?",
            paragraphs: [
              "Relocating or setting up a new space comes with enough challenges; furniture should not be one of them. Shipping, buying, and assembling furniture can be expensive, slow, and frustrating.",
              "Leadwoods offers flexible furniture rental and supply solutions that save time, reduce costs, and allow you to move into a fully functional space without stress.",
            ],
          },
          {
            heading: "What Makes Leadwoods Different",
            paragraphs: [
              "Finding fully furnished properties is often difficult. Leadwoods helps you turn any apartment, office, studio, or serviced residence into a ready-to-use space.",
              "Backed by G&V Support Services, we manage everything from furniture selection to delivery, installation, maintenance, and removal with flexible terms.",
              "Our collections cover living rooms, bedrooms, dining spaces, home offices, corporate setups, and short-stay apartments.",
            ],
          },
          {
            heading: "How Leadwoods Simplifies Your Setup",
            paragraphs: [
              "Whether you’re relocating staff, preparing serviced apartments, or furnishing your personal home, Leadwoods keeps the process smooth and professional.",
              "We deliver, install, arrange, and support your furniture—no heavy lifting, no delays, no confusion.",
              "With Leadwoods by G&V Support Services, your space is ready before you even settle in.",
            ],
          },
        ]}
      />

      {/* FEATURES */}
      <FeatureCards
        title="Furniture rental, your way."
        items={[
          { image: "/image/Leadwoods-furniture/furniture-1.jpg", heading: "Clean", text: "Our furniture arrives clean and undamaged." },
          { image: "/image/Leadwoods-furniture/furniture-2.jpg", heading: "Stylish", text: "Choose from quality styles that match your taste." },
          { image: "/image/Leadwoods-furniture/furniture-3.jpg", heading: "Affordable", text: "Flexible pricing that fits your budget." },
        ]}
      />

      {/* ICON GRID */}
      <IconGrid
        title="Wherever you’re heading, we’ll be there."
        items={[
          { icon: "/image/Leadwoods-furniture/global-network.png", heading: "Global Network", text: "We operate across multiple locations worldwide." },
          { icon: "/image/Leadwoods-furniture/local-experts.png", heading: "Local Experts", text: "Professionals ready to assist wherever you are." },
          { icon: "/image/Leadwoods-furniture/widest-selection.png", heading: "Widest Selection", text: "Everything from furniture to appliances." },
        ]}
      />

      {/* SUPPORT FEATURES */}
      <SupportFeatures
        heading="Why Choose Leadwoods?"
        subHeading="Our key benefits"
        features={features}
      />
    </>
  );
}
