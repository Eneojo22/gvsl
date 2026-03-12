import type { Metadata } from "next";

import { getHomeListings } from "@/app/lib/cms-store";

import LeadwoodHomesLanding from "./ourapartment";

export const metadata: Metadata = {
  title: "Leadwood Homes | G&V Support Services",
  description:
    "Explore Leadwood Homes apartment options, premium living spaces, and inspection-ready listings across Lagos.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const homes = await getHomeListings();

  return <LeadwoodHomesLanding homes={homes} />;
}
