import type { Metadata } from "next";

import { getHomeListings } from "@/app/lib/cms-store";
import { defaultKeywords } from "@/app/lib/seo";

import LeadwoodHomesLanding from "./ourapartment";

export const metadata: Metadata = {
  title: "Leadwood Homes | G&V Support Services",
  description:
    "Explore Leadwood Homes apartment options, houses, and premium living spaces from G&V Support Services across Lagos.",
  keywords: [
    ...defaultKeywords,
    "Leadwood Homes apartments",
    "Leadwood Homes houses",
    "G&V housing support",
    "apartments in Lagos",
    "houses in Lagos",
  ],
  alternates: {
    canonical: "/services/leadwoodhomes",
  },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const homes = await getHomeListings();

  return <LeadwoodHomesLanding homes={homes} />;
}
