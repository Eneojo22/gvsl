// import { cn } from "@/lib/utils";
import { cn } from "@/app/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../uiforcomponent/bento-grid";
import Image from "next/image";

export function BentoGd() {
  return (
    <BentoGrid className="max-w-4xl mx-auto mt-10">
    {items.map((item, i) => (
  <BentoGridItem
    key={i}
    title={item.title}
    description={item.description}
    // header={item.header}
    image={item.image} // ✅ now points to image
    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
  />
))}
    </BentoGrid>
  );
}

// const Skeleton = () => (
// //   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
// );

const items = [
  {
    title: "Apartment at keffi",
    description: "This is a recently renovated 1 bedroom apartment with a living-room, kitchen and a combined bathroom-toilet.",
    // header: <Skeleton />,
    image: "/image/dinning3.jpg",
  },
  {
    title: "Apartment at keffi",
    description: "Experience the epitome of luxury living in our spacious 3-bedroom apartment, where modern elegance and comfort seamlessly .",
    // header: <Skeleton />,
    image: "/image/pool.jpg",
  },
  {
    title: "Keffi Homes",
    description: "Experience our furnished 3-bedroom apartment,.",
    // header: <Skeleton />,
    image: "/image/third.jpg",
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    // header: <Skeleton />,
    icon: "/icons/communication.png",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    // header: <Skeleton />,
    icon: "/icons/knowledge.png",
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    // header: <Skeleton />,
    icon: "/icons/creation.png",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    // header: <Skeleton />,
    icon: "/image/flyfly.png",
  },
];
