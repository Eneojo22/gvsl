import type { Metadata } from "next";

import { defaultKeywords } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Leadwood Furniture Collection | G&V Support Services",
  description:
    "Browse the Leadwood Furniture collection from G&V Support Services for sofas, dining sets, bedroom furniture, and apartment furnishing solutions in Nigeria.",
  keywords: [
    ...defaultKeywords,
    "furniture collection Lagos",
    "apartment furniture Nigeria",
    "sofas and dining sets Lagos",
    "Leadwood Furniture collection",
  ],
  alternates: {
    canonical: "/services/leadwoodfurniture/leadwoods-funitures",
  },
};

export { default } from "../../LeadwoodFunitures/leadwoods-funitures/page";
