"use client";

import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { useDeferredValue, useState } from "react";

import type { HomeListing } from "@/app/lib/cms-types";

import { getInspectionLink, leadwoodBasePath } from "../listing-utils";
import { LeadwoodBreadcrumbs, LeadwoodListingCard } from "../shared";

type ApartmentBrowserProps = {
  homes: HomeListing[];
};

type SortMode = "latest" | "price-low" | "price-high" | "largest";

export default function ApartmentBrowser({ homes }: ApartmentBrowserProps) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState("any");
  const [sortMode, setSortMode] = useState<SortMode>("latest");

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const typeOptions = Array.from(new Set(homes.map((home) => home.type))).sort();
  const locationOptions = Array.from(new Set(homes.map((home) => home.location))).sort();

  const filteredHomes = homes
    .filter((home) => {
      const matchesQuery =
        deferredQuery.length === 0 ||
        `${home.title} ${home.type} ${home.location} ${home.description}`
          .toLowerCase()
          .includes(deferredQuery);
      const matchesType = selectedType === "all" || home.type === selectedType;
      const matchesLocation = selectedLocation === "all" || home.location === selectedLocation;
      const matchesBedrooms =
        selectedBedrooms === "any" || home.features.bedrooms >= Number(selectedBedrooms);

      return matchesQuery && matchesType && matchesLocation && matchesBedrooms;
    })
    .sort((first, second) => {
      if (sortMode === "price-low") {
        return first.price - second.price;
      }

      if (sortMode === "price-high") {
        return second.price - first.price;
      }

      if (sortMode === "largest") {
        return second.features.bedrooms - first.features.bedrooms;
      }

      return second.id - first.id;
    });

  const hasFilters =
    query.length > 0 ||
    selectedType !== "all" ||
    selectedLocation !== "all" ||
    selectedBedrooms !== "any" ||
    sortMode !== "latest";

  return (
    <div className="min-h-screen bg-[#fcf8f4] text-[#1c140d]">
      <section className="border-b border-[#eee0d4] bg-[linear-gradient(180deg,#fff8f2_0%,#f6eee6_100%)]">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-32 sm:px-6 lg:px-8">
          <LeadwoodBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Leadwood Homes", href: leadwoodBasePath },
              { label: "Apartments" },
            ]}
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#cf6c3d]">
                Apartment browser
              </p>
              <h1 className="mt-3 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[3.45rem]">
                Explore the kind of apartment Leadwood Homes currently offers.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f4a3b]">
                This page gives clients a cleaner way to search live apartments, compare locations,
                and move straight into the apartment detail page that fits them best.
              </p>
            </div>

            <div className="rounded-[28px] bg-[#1c120b] p-6 text-white shadow-[0_24px_70px_-34px_rgba(0,0,0,0.7)]">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#f3b48d]">
                Live overview
              </p>
              <p className="mt-4 text-4xl font-medium">{homes.length}</p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                active apartments are available to explore right now.
              </p>
              <Link
                href={getInspectionLink()}
                target="_blank"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#dd5500] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#c54800]"
              >
                Request inspection help
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-[#ead9cb] bg-white p-5 shadow-[0_18px_50px_-28px_rgba(74,37,15,0.35)]">
          <div className="flex items-center gap-3 text-[#1c140d]">
            <SlidersHorizontal className="h-5 w-5 text-[#cf6c3d]" />
            <p className="text-lg font-semibold">Filter apartments</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#5f4a3b]">Search</span>
              <div className="flex items-center gap-3 rounded-2xl border border-[#e7d5c6] px-4 py-3">
                <Search className="h-4 w-4 text-[#cf6c3d]" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Title, type, or location"
                  className="w-full bg-transparent text-sm text-[#1c140d] outline-none placeholder:text-[#8b786a]"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#5f4a3b]">Type</span>
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                className="w-full rounded-2xl border border-[#e7d5c6] bg-white px-4 py-3 text-sm text-[#1c140d] outline-none"
              >
                <option value="all">All apartment types</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#5f4a3b]">Location</span>
              <select
                value={selectedLocation}
                onChange={(event) => setSelectedLocation(event.target.value)}
                className="w-full rounded-2xl border border-[#e7d5c6] bg-white px-4 py-3 text-sm text-[#1c140d] outline-none"
              >
                <option value="all">All locations</option>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#5f4a3b]">Bedrooms</span>
              <select
                value={selectedBedrooms}
                onChange={(event) => setSelectedBedrooms(event.target.value)}
                className="w-full rounded-2xl border border-[#e7d5c6] bg-white px-4 py-3 text-sm text-[#1c140d] outline-none"
              >
                <option value="any">Any size</option>
                <option value="1">1 bed or more</option>
                <option value="2">2 beds or more</option>
                <option value="3">3 beds or more</option>
                <option value="4">4 beds or more</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#5f4a3b]">Sort</span>
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value as SortMode)}
                className="w-full rounded-2xl border border-[#e7d5c6] bg-white px-4 py-3 text-sm text-[#1c140d] outline-none"
              >
                <option value="latest">Latest first</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="largest">Largest bedrooms first</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#5f4a3b]">
            Showing <span className="font-semibold text-[#1c140d]">{filteredHomes.length}</span>{" "}
            apartment{filteredHomes.length === 1 ? "" : "s"}.
          </p>

          {hasFilters ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedType("all");
                setSelectedLocation("all");
                setSelectedBedrooms("any");
                setSortMode("latest");
              }}
              className="inline-flex w-fit items-center justify-center rounded-full border border-[#d9c1af] px-4 py-2 text-sm font-semibold text-[#7b2d00] transition hover:border-[#cf6c3d] hover:text-[#cf6c3d]"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {filteredHomes.length > 0 ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredHomes.map((home) => (
              <LeadwoodListingCard key={home.id} home={home} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[30px] border border-dashed border-[#d9c1af] bg-white px-6 py-14 text-center">
            <p className="text-2xl font-semibold text-[#1c140d]">No apartment matches those filters.</p>
            <p className="mt-3 text-sm leading-6 text-[#5f4a3b]">
              Try a broader location, clear some filters, or return to the Leadwood Homes overview.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedType("all");
                  setSelectedLocation("all");
                  setSelectedBedrooms("any");
                  setSortMode("latest");
                }}
                className="rounded-full bg-[#1c120b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#dd5500]"
              >
                Reset filters
              </button>
              <Link
                href={leadwoodBasePath}
                className="rounded-full border border-[#d9c1af] px-5 py-3 text-sm font-semibold text-[#7b2d00] transition hover:border-[#cf6c3d] hover:text-[#cf6c3d]"
              >
                Back to overview
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
