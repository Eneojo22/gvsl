import type { Metadata } from "next";

import { getHomeListings } from "@/app/lib/cms-store";
import { defaultKeywords } from "@/app/lib/seo";

import LeadwoodHomesLanding from "./ourapartment";

export const metadata: Metadata = {
  title: "Apartments in Lagos | Leadwood Homes by G&V Support Services",
  description:
    "Browse apartments in Lagos, executive homes, and premium housing options through Leadwood Homes with support from G&V Support Services.",
  keywords: [
    ...defaultKeywords,
    "apartment in Lagos",
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
