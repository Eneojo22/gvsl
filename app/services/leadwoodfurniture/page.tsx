import type { Metadata } from "next";

import { defaultKeywords } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Leadwood Furniture | G&V Support Services",
  description:
    "Explore Leadwood Furniture by G&V Support Services for home, apartment, office, and serviced-space furniture solutions in Nigeria.",
  keywords: [
    ...defaultKeywords,
    "Leadwood Furniture",
    "G&V furniture",
    "furniture for apartments in Lagos",
    "home furniture Nigeria",
  ],
  alternates: {
    canonical: "/services/leadwoodfurniture",
  },
};

export { default } from "../LeadwoodFunitures/page";
