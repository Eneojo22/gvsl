"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import { Carousel, Card } from "./uiforcomponent/carousel";

// Strongly typed ServiceContent props
type ServiceContentProps = {
  category: string;
};

const ServiceContent: React.FC<ServiceContentProps> = ({ category }) => {
  // Custom content for each service category
  const contentMap: Record<string, ReactNode> = {
    Orientation: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Get started on the right foot with our comprehensive orientation service.
          </span>{" "}
          We provide personalized neighborhood tours, local regulations briefing, and
          essential service setup assistance to help you navigate your new environment
          with confidence.
        </p>
        <Image
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=3000&auto=format&fit=crop"
          alt="Orientation service"
          width={800}
          height={600}
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-6 rounded-xl"
          priority={category === "Orientation"} // Prioritize for first slide
        />
      </div>
    ),
    "Airport Meet and Greet": (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Your journey begins with a warm welcome.
          </span>{" "}
          Our professional greeters meet you at arrivals, assist with luggage, and
          provide direct transportation to your accommodation. Available 24/7 with flight
          tracking for delayed arrivals.
        </p>
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3000&auto=format&fit=crop"
          alt="Airport meet and greet"
          width={800}
          height={600}
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-6 rounded-xl"
          priority={category === "Airport Meet and Greet"} // Prioritize if first slide
        />
      </div>
    ),
    // Placeholder for other categories to avoid fallback
    "Short-term Housing": (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Comfortable and convenient temporary accommodations.
          </span>{" "}
          Find the perfect short-term housing solution tailored to your needs.
        </p>
        <Image
          src="/image/Homes.jpg"
          alt="Short-term housing"
          width={800}
          height={600}
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-6 rounded-xl"
        />
      </div>
    ),
    "Home Search": (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Find your perfect home with expert guidance.
          </span>{" "}
          Our team assists you in finding a home that meets your preferences and budget.
        </p>
        <Image
          src="/image/home.jpg"
          alt="Home search"
          width={800}
          height={600}
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-6 rounded-xl"
        />
      </div>
    ),
    "Educational Assistance": (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Support for school admissions and educational resources.
          </span>{" "}
          We help you navigate the educational landscape for your family.
        </p>
        <Image
          src="/image/education.jpg"
          alt="Educational assistance"
          width={800}
          height={600}
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-6 rounded-xl"
        />
      </div>
    ),
    "Our Apartment": (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Premium living spaces tailored to your needs.
          </span>{" "}
          Explore our curated apartments for a comfortable stay.
        </p>
        <Image
          src="/image/apartment.jpg"
          alt="Our apartment"
          width={800}
          height={600}
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-6 rounded-xl"
        />
      </div>
    ),
    "Settling-in": (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Comprehensive assistance to help you feel at home.
          </span>{" "}
          We provide settling-in support to make your transition seamless.
        </p>
        <Image
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=3000&auto=format&fit=crop"
          alt="Settling-in service"
          width={800}
          height={600}
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-6 rounded-xl"
        />
      </div>
    ),
    "Departure Services": (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Smooth and organized support for your next journey.
          </span>{" "}
          We assist with all aspects of your departure to ensure a hassle-free exit.
        </p>
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3000&auto=format&fit=crop"
          alt="Departure services"
          width={800}
          height={600}
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-6 rounded-xl"
        />
      </div>
    ),
  };

  // Fallback for undefined categories
  return (
    contentMap[category] || (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          Premium service content coming soon.
        </p>
      </div>
    )
  );
};

// Define card type
type CardData = {
  category: string;
  title: string;
  src: string;
  content: ReactNode;
};

export const data: CardData[] = [
  {
    category: "Orientation",
    title: "Get acquainted with your new environment effortlessly.",
    src: "/image/orientation.jpg",
    content: <ServiceContent category="Orientation" />,
  },
  {
    category: "Airport Meet and Greet",
    title: "A warm welcome and hassle-free transfer upon arrival.",
    src: "/image/meetgreet.jpg",
    content: <ServiceContent category="Airport Meet and Greet" />,
  },
  {
    category: "Short-term Housing",
    title: "Comfortable and convenient temporary accommodations.",
    src: "/image/Homes.jpg",
    content: <ServiceContent category="Short-term Housing" />,
  },
  {
    category: "Home Search",
    title: "Find your perfect home with expert guidance.",
    src: "/image/home.jpg",
    content: <ServiceContent category="Home Search" />,
  },
  {
    category: "Educational Assistance",
    title: "Support for school admissions and educational resources.",
    src: "/image/education.jpg",
    content: <ServiceContent category="Educational Assistance" />,
  },
  {
    category: "Our Apartment",
    title: "Premium living spaces tailored to your needs.",
    src: "/image/apartment.jpg",
    content: <ServiceContent category="Our Apartment" />,
  },
  {
    category: "Settling-in",
    title: "Comprehensive assistance to help you feel at home.",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=3000&auto=format&fit=crop",
    content: <ServiceContent category="Settling-in" />,
  },
  {
    category: "Departure Services",
    title: "Smooth and organized support for your next journey.",
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3000&auto=format&fit=crop",
    content: <ServiceContent category="Departure Services" />,
  },
];

export function CardsCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <Carousel items={cards} />
    </div>
  );
}