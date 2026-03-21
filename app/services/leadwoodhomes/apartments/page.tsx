import type { Metadata } from "next";

import { getHomeListings } from "@/app/lib/cms-store";
import { defaultKeywords } from "@/app/lib/seo";

import ApartmentBrowser from "./apartment-browser";

export const metadata: Metadata = {
  title: "Browse Apartments in Lagos | Leadwood Homes",
  description:
    "Filter apartments in Lagos by type, location, and bedroom count to find the right Leadwood Homes fit quickly with G&V Support Services.",
  keywords: [
    ...defaultKeywords,
    "apartment in Lagos",
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
