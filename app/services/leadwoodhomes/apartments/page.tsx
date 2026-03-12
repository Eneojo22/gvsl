import type { Metadata } from "next";

import { getHomeListings } from "@/app/lib/cms-store";
import { defaultKeywords } from "@/app/lib/seo";

import ApartmentBrowser from "./apartment-browser";

export const metadata: Metadata = {
  title: "Browse Apartments | Leadwood Homes",
  description:
    "Filter Leadwood Homes apartments and houses by type, location, and bedroom count to find the right fit quickly with G&V Support Services.",
  keywords: [
    ...defaultKeywords,
    "browse apartments Lagos",
    "Leadwood Homes listings",
    "G&V apartments",
  ],
  alternates: {
    canonical: "/services/leadwoodhomes/apartments",
  },
};

export const dynamic = "force-dynamic";

export default async function ApartmentsPage() {
  const homes = await getHomeListings();

  return <ApartmentBrowser homes={homes} />;
}
