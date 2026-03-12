import type { Metadata } from "next";

import { getHomeListings } from "@/app/lib/cms-store";

import ApartmentBrowser from "./apartment-browser";

export const metadata: Metadata = {
  title: "Browse Apartments | Leadwood Homes",
  description:
    "Filter Leadwood Homes apartments by type, location, and bedroom count to find the right fit quickly.",
};

export const dynamic = "force-dynamic";

export default async function ApartmentsPage() {
  const homes = await getHomeListings();

  return <ApartmentBrowser homes={homes} />;
}
