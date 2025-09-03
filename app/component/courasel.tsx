"use client";

import React from "react";
import { Carousel, Card } from "./uiforcomponent/carousel";

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

const ServiceContent = ({ category }) => {
  // Custom content for each service category
  const contentMap = {
    "Orientation": (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Get started on the right foot with our comprehensive orientation service.
          </span>{" "}
          We provide personalized neighborhood tours, local regulations briefing, and essential service setup assistance to help you navigate your new environment with confidence.
        </p>
        <img
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=3000&auto=format&fit=crop"
          alt="Orientation service"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-6 rounded-xl"
        />
      </div>
    ),
    "Airport Meet and Greet": (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Your journey begins with a warm welcome.
          </span>{" "}
          Our professional greeters meet you at arrivals, assist with luggage, and provide direct transportation to your accommodation. 
          Available 24/7 with flight tracking for delayed arrivals.
        </p>
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3000&auto=format&fit=crop"
          alt="Airport meet and greet"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-6 rounded-xl"
        />
      </div>
    ),
    // Add similar content blocks for all other services
    // ...
  };

  return contentMap[category] || (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        Premium service content coming soon.
      </p>
    </div>
  );
};

const data = [
  {
    category: "Orientation",
    title: "Get acquainted with your new environment effortlessly.",
    src: "/image/orientation.jpg",
    content: <ServiceContent category="Orientation" />,
  },
  {
    category: "Airport Meet and Greet",
    title: "A warm welcome and hassle-free transfer upon arrival.",
    src: "/image/meetgreet.jpg ",
    content: <ServiceContent category="Airport Meet and Greet" />,
  },
  {
    category: "Short-term Housing",
    title: "Comfortable and convenient temporary accommodations.",
    src: " /image/Homes.jpg ",
    content: <ServiceContent category="Short-term Housing" />,
  },
  {
    category: "Home Search",
    title: "Find your perfect home with expert guidance.",
    src: "/image/home ",
    content: <ServiceContent category="Home Search" />,
  },
  {
    category: "Educational Assistance",
    title: "Support for school admissions and educational resources.",
    src: "  ",
    content: <ServiceContent category="Educational Assistance" />,
  },
  {
    category: "Our Apartment",
    title: "Premium living spaces tailored to your needs.",
    src: "  ",
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
  }
];