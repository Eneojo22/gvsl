import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  KeyRound,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

import type { HomeListing } from "@/app/lib/cms-types";

import {
  buildHomeCollections,
  buildLeadwoodStats,
  getInspectionLink,
  leadwoodBasePath,
} from "./listing-utils";
import { LeadwoodBreadcrumbs, LeadwoodListingCard } from "./shared";

type LeadwoodHomesLandingProps = {
  homes: HomeListing[];
};

const journeySteps = [
  {
    title: "Browse confidently",
    description:
      "Start with a clear view of active homes, apartment types, pricing, and neighborhood options.",
    icon: Building2,
  },
  {
    title: "Shortlist the right fit",
    description:
      "Compare serviced apartments, short stays, and larger homes before committing your time.",
    icon: KeyRound,
  },
  {
    title: "Book inspection fast",
    description:
      "Move from interest to action with a direct inspection request for the apartment you prefer.",
    icon: CalendarDays,
  },
  {
    title: "Move in with clarity",
    description:
      "Clients know the kind of space they are choosing before they ever step through the door.",
    icon: BadgeCheck,
  },
];

const serviceValues = [
  {
    title: "Location-led choices",
    description:
      "From Ikeja to Lekki and Victoria Island, the current collection shows where each home sits.",
    icon: MapPinned,
  },
  {
    title: "Security and ease",
    description:
      "Leadwood Homes is presented as a calm, professional housing experience with inspection-ready detail.",
    icon: ShieldCheck,
  },
];

export default function LeadwoodHomesLanding({ homes }: LeadwoodHomesLandingProps) {
  const featuredHomes = homes.slice(0, 3);
  const stats = buildLeadwoodStats(homes);
  const collections = buildHomeCollections(homes).slice(0, 4);
  const ikejaHomes = homes.filter((home) => home.location.toLowerCase().includes("ikeja"));

  return (
    <div className="bg-[#fcf8f4] text-[#1c140d]">
      <section className="relative isolate overflow-hidden bg-[#160d08]">
        <Image
          src="/image/leadhome.jpg"
          alt="Leadwood Homes landing"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(221,85,0,0.35),transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120b06]/95 via-[#120b06]/80 to-[#120b06]/35" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <LeadwoodBreadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Leadwood Homes" },
            ]}
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px]">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f3b48d]">
                Leadwood Homes
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                A real apartment journey, not just one landing page.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Clients can now move from the Leadwood Homes overview into a dedicated apartment
                browser and then into each apartment page to understand the type of home, the
                location, the size, and the pricing before they book an inspection.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`${leadwoodBasePath}/apartments`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c54800]"
                >
                  Explore apartments
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={getInspectionLink()}
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Book an inspection
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f2b994]">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 text-white shadow-[0_24px_80px_-32px_rgba(0,0,0,0.65)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f2b994]">
                Explore by page
              </p>
              <div className="mt-6 space-y-4">
                <Link
                  href={leadwoodBasePath}
                  className="block rounded-[24px] border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <p className="text-lg font-semibold">Overview</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Start with the Leadwood Homes story, apartment mix, and client journey.
                  </p>
                </Link>
                <Link
                  href={`${leadwoodBasePath}/apartments`}
                  className="block rounded-[24px] border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <p className="text-lg font-semibold">Apartment browser</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Filter live listings by type, location, bedroom count, and price order.
                  </p>
                </Link>
                <Link
                  href={featuredHomes[0] ? `${leadwoodBasePath}/${featuredHomes[0].id}` : leadwoodBasePath}
                  className="block rounded-[24px] border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <p className="text-lg font-semibold">Apartment detail pages</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Open any apartment to see a deeper page with facts, highlights, and inspection
                    action.
                  </p>
                </Link>
              </div>

              <div className="mt-8 rounded-[24px] bg-[#f8e2d3] p-5 text-[#2d170c]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b74a09]">
                  What visitors learn faster
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6">
                  <li>The kind of apartment available right now.</li>
                  <li>Where each home is located.</li>
                  <li>The size, parking, and layout before inspection.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#cf6c3d]">
              Apartment mix
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#1c140d] sm:text-4xl">
              Clear categories help clients understand what Leadwood Homes offers.
            </h2>
          </div>
          <Link
            href={`${leadwoodBasePath}/apartments`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#a33d00] transition hover:text-[#dd5500]"
          >
            View all apartments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection) => (
            <div
              key={collection.name}
              className="rounded-[28px] border border-[#ecd9cc] bg-white p-6 shadow-[0_16px_50px_-28px_rgba(74,37,15,0.35)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#cf6c3d]">
                {collection.count} listing{collection.count === 1 ? "" : "s"}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[#1c140d]">{collection.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5f4a3b]">{collection.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f5ede6_0%,#fff8f2_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#cf6c3d]">
                Featured homes
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#1c140d] sm:text-4xl">
                Start with the apartments most likely to spark interest.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#5f4a3b]">
              Each card now leads into its own apartment page, so visitors can explore before
              making contact.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {featuredHomes.map((home) => (
              <LeadwoodListingCard key={home.id} home={home} />
            ))}
          </div>

          <div className="mt-12 rounded-[28px] border border-[#e8d0ba] bg-[#fffdf8] p-5 text-[#352513]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a65a10]">
                  Ikeja House Extraction Bot
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[#1c140d]">
                  Smart suggestions for Ikeja perfect-fit homes
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5f4a3b]">
                  Our listing bot extracts top Ikeja options from the current inventory for faster
                  decisions.
                </p>
              </div>
              <span className="rounded-full bg-[#fff1d8] px-3 py-1 text-xs font-semibold text-[#a45f11]">
                Auto-extracted
              </span>
            </div>

            {ikejaHomes.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ikejaHomes.slice(0, 3).map((home) => (
                  <div
                    key={home.id}
                    className="rounded-2xl border border-[#f1dcc8] bg-white p-3 text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[#1c140d]">{home.title}</p>
                      <span className="rounded-full bg-[#eee4d8] px-2 py-0.5 text-xs text-[#795230]">
                        {home.features.bedrooms}BR
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#5f4a3b]">{home.location}</p>
                    <p className="mt-3 text-sm font-semibold text-[#7b3917]">
                      ₦{home.price.toLocaleString()}
                    </p>
                    {home.airbnb ? (
                      <p className="mt-1 text-xs text-[#5f4a3b]">Airbnb middleman available</p>
                    ) : null}
                    <Link
                      href={`${leadwoodBasePath}/${home.id}`}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#dd5500]"
                    >
                      View details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-[#5f4a3b]">
                No Ikeja homes are currently available in this collection, but more will be added
                soon.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#1b1209] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#f3b48d]">
                Client journey
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                A smoother way to explore Leadwood Homes.
              </h2>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {journeySteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-[28px] border border-white/10 bg-white/5 p-6"
                  >
                    <step.icon className="h-8 w-8 text-[#f3b48d]" />
                    <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {serviceValues.map((value) => (
                <div
                  key={value.title}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-6"
                >
                  <value.icon className="h-8 w-8 text-[#f3b48d]" />
                  <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[36px] bg-[linear-gradient(135deg,#1c120b_0%,#41200d_50%,#dd5500_100%)] px-6 py-10 text-white shadow-[0_24px_80px_-32px_rgba(74,37,15,0.55)] sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ffd7bf]">
                Ready to move
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Let clients step into the apartment browser and choose with confidence.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/80 sm:text-base">
                The Leadwood Homes section now works as a small journey: overview, apartment
                browser, and full apartment pages with direct inspection actions.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`${leadwoodBasePath}/apartments`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#9e3d06] transition hover:bg-[#fff2ea]"
              >
                Browse apartments
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={getInspectionLink()}
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Talk to Leadwood Homes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
