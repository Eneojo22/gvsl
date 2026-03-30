import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CarFront,
  CheckCircle2,
  MapPinned,
} from "lucide-react";

import type { HomeListing } from "@/app/lib/cms-types";

import {
  buildApartmentHighlights,
  formatHomePrice,
  getAudienceLabel,
  getHomeGallerySections,
  getHomeCollection,
  getInspectionLink,
  getPrimaryHomeImage,
  getPricingCadence,
  leadwoodBasePath,
} from "../listing-utils";
import { LeadwoodBreadcrumbs, LeadwoodListingCard } from "../shared";

type ApartmentDetailPageProps = {
  apartment: HomeListing;
  relatedHomes: HomeListing[];
};

export default function ApartmentDetailPage({
  apartment,
  relatedHomes,
}: ApartmentDetailPageProps) {
  const highlights = buildApartmentHighlights(apartment);
  const gallerySections = getHomeGallerySections(apartment);
  const facts = [
    {
      label: "Bedrooms",
      value: String(apartment.features.bedrooms),
      icon: BedDouble,
    },
    {
      label: "Bathrooms",
      value: String(apartment.features.bathrooms),
      icon: Bath,
    },
    {
      label: "Parking",
      value: String(apartment.features.parkingSpaces),
      icon: CarFront,
    },
    {
      label: "Location",
      value: apartment.location,
      icon: MapPinned,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcf8f4] text-[#1c140d]">
      <section className="relative isolate overflow-hidden bg-[#120b06]">
        <div className="absolute inset-0">
          <Image
            src={getPrimaryHomeImage(apartment)}
            alt={apartment.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(221,85,0,0.35),transparent_40%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120b06]/96 via-[#120b06]/78 to-[#120b06]/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <LeadwoodBreadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Leadwood Homes", href: leadwoodBasePath },
              { label: "Apartments", href: `${leadwoodBasePath}/apartments` },
              { label: apartment.title },
            ]}
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px]">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full bg-white/12 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#f3b48d] backdrop-blur">
                {getHomeCollection(apartment)}
              </div>
              <h1 className="mt-5 text-[2.8rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[3.5rem]">
                {apartment.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                {apartment.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-[24px] border border-white/10 bg-white/10 p-4 text-white backdrop-blur"
                  >
                    <fact.icon className="h-5 w-5 text-[#f3b48d]" />
                    <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-[#f3b48d]">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-lg font-medium">{fact.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={getInspectionLink(apartment.title)}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dd5500] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#c54800]"
                >
                  Book inspection
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`${leadwoodBasePath}/apartments`}
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  Browse more apartments
                </Link>
              </div>

            </div>

            <aside className="rounded-[32px] border border-white/10 bg-white/10 p-6 text-white shadow-[0_24px_80px_-32px_rgba(0,0,0,0.65)] backdrop-blur">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#f3b48d]">
                Apartment summary
              </p>
              <p className="mt-5 text-4xl font-medium">{formatHomePrice(apartment.price)}</p>
              <p className="mt-2 text-sm text-white/70">{getPricingCadence(apartment)}</p>

              <div className="mt-8 space-y-5 text-sm leading-6 text-white/80">
                <div>
                  <p className="font-medium uppercase tracking-[0.18em] text-[#f3b48d]">
                    Type
                  </p>
                  <p className="mt-2">{apartment.type}</p>
                </div>
                <div>
                  <p className="font-medium uppercase tracking-[0.18em] text-[#f3b48d]">
                    Best suited for
                  </p>
                  <p className="mt-2">{getAudienceLabel(apartment)}</p>
                </div>
                <div>
                  <p className="font-medium uppercase tracking-[0.18em] text-[#f3b48d]">
                    Location
                  </p>
                  <p className="mt-2">{apartment.location}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <div className="rounded-[32px] border border-[#ead9cb] bg-white p-8 shadow-[0_18px_50px_-28px_rgba(74,37,15,0.35)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#cf6c3d]">
                Apartment overview
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#1c140d]">
                What this apartment gives a client at first glance
              </h2>
              <p className="mt-4 text-base leading-7 text-[#5f4a3b]">
                Leadwood Homes visitors can now understand the apartment type, price level, and
                layout before they ever reach out. That makes this page a stronger handoff from the
                landing page into a real property decision.
              </p>
            </div>

            <div className="rounded-[32px] border border-[#ead9cb] bg-white p-8 shadow-[0_18px_50px_-28px_rgba(74,37,15,0.35)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#cf6c3d]">
                    Room gallery
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-[#1c140d]">
                    Walk through the apartment before inspection.
                  </h2>
                </div>
                <p className="text-sm text-[#6d5646]">
                  Living room, bedroom/rest room, and toilet photos can be grouped here.
                </p>
              </div>

              {gallerySections.length > 0 ? (
                <div className="mt-8 space-y-8">
                  {gallerySections.map((section) => (
                    <div
                      key={section.key}
                      className="rounded-[28px] border border-[#ead9cb] bg-[#fff8f2] p-5"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-[#1c140d]">{section.label}</h3>
                          <p className="mt-1 text-sm text-[#6d5646]">
                            {section.images.length} photo{section.images.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
                        <div className="relative min-h-[280px] overflow-hidden rounded-[24px] bg-[#f2ece4]">
                          <Image
                            src={section.images[0]}
                            alt={`${apartment.title} ${section.label}`}
                            fill
                            className="object-cover object-center"
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                          {section.images.slice(1).map((image, index) => (
                            <div
                              key={`${section.key}-${index}-${image}`}
                              className="relative min-h-[132px] overflow-hidden rounded-[20px] bg-[#f2ece4]"
                            >
                              <Image
                                src={image}
                                alt={`${apartment.title} ${section.label} view ${index + 2}`}
                                fill
                                className="object-cover object-center"
                              />
                            </div>
                          ))}

                          {section.images.length === 1 ? (
                            <div className="flex min-h-[132px] items-center rounded-[20px] border border-dashed border-[#d7bca9] bg-white px-4 py-5 text-sm leading-6 text-[#6d5646]">
                              More {section.label.toLowerCase()} photos can be added from the admin
                              dashboard whenever they are ready.
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-[28px] border border-dashed border-[#d7bca9] bg-[#fff8f2] px-5 py-6 text-sm leading-7 text-[#6d5646]">
                  Leadwood Homes can add grouped room photos from the admin dashboard so visitors
                  can inspect the living room, bedroom/rest room, and toilet before reaching out.
                </div>
              )}
            </div>

            <div className="rounded-[32px] border border-[#ead9cb] bg-[#fff8f2] p-8 shadow-[0_18px_50px_-28px_rgba(74,37,15,0.25)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#cf6c3d]">
                Highlights
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 rounded-[24px] border border-[#ecd9cc] bg-white p-5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#cf6c3d]" />
                    <p className="text-sm leading-6 text-[#4e3d31]">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[30px] border border-[#ead9cb] bg-white p-6 shadow-[0_18px_50px_-28px_rgba(74,37,15,0.35)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#cf6c3d]">
                Quick facts
              </p>
              <div className="mt-5 space-y-4 text-sm text-[#4e3d31]">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8efe8] px-4 py-3">
                  <span className="font-medium">Collection</span>
                  <span>{getHomeCollection(apartment)}</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8efe8] px-4 py-3">
                  <span className="font-medium">Toilets</span>
                  <span>{apartment.features.toilets}</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8efe8] px-4 py-3">
                  <span className="font-medium">Price cadence</span>
                  <span>{getPricingCadence(apartment)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] bg-[#1c120b] p-6 text-white shadow-[0_24px_70px_-34px_rgba(0,0,0,0.7)]">
              <Building2 className="h-8 w-8 text-[#f3b48d]" />
              <h3 className="mt-4 text-2xl font-semibold">Ready to inspect this home?</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Move from this apartment page into a direct WhatsApp inspection request with one
                click.
              </p>
              <Link
                href={getInspectionLink(apartment.title)}
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#dd5500] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c54800]"
              >
                Schedule inspection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {relatedHomes.length > 0 ? (
        <section className="bg-[linear-gradient(180deg,#f5ede6_0%,#fff8f2_100%)] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#cf6c3d]">
                  Similar homes
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#1c140d]">
                  Keep exploring other Leadwood Homes options.
                </h2>
              </div>
              <Link
                href={`${leadwoodBasePath}/apartments`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#a33d00] transition hover:text-[#dd5500]"
              >
                Browse all apartments
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 xl:grid-cols-3">
              {relatedHomes.map((home) => (
                <LeadwoodListingCard key={home.id} home={home} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
