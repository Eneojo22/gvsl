import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getHomeListingById, getHomeListings } from "@/app/lib/cms-store";

import ApartmentDetailPage from "./dynamicpage";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ apartment: string }>;
}): Promise<Metadata> {
  const { apartment } = await params;

  if (!/^\d+$/.test(apartment)) {
    return {
      title: "Apartment | Leadwood Homes",
    };
  }

  const home = await getHomeListingById(Number.parseInt(apartment, 10));

  if (!home) {
    return {
      title: "Apartment Not Found | Leadwood Homes",
    };
  }

  return {
    title: `${home.title} | Leadwood Homes`,
    description: `${home.type} in ${home.location} with ${home.features.bedrooms} bedrooms and ${home.features.parkingSpaces} parking spaces.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ apartment: string }>;
}) {
  const { apartment } = await params;

  if (!/^\d+$/.test(apartment)) {
    notFound();
  }

  const apartmentId = Number.parseInt(apartment, 10);
  const [home, homes] = await Promise.all([
    getHomeListingById(apartmentId),
    getHomeListings(),
  ]);

  if (!home) {
    notFound();
  }

  const relatedHomes = homes.filter((candidate) => candidate.id !== home.id).slice(0, 3);

  return <ApartmentDetailPage apartment={home} relatedHomes={relatedHomes} />;
}
