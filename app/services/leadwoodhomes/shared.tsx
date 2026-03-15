import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { HomeListing } from "@/app/lib/cms-types";

import {
  formatHomePrice,
  getHomeCollection,
  getHomeFeatureLabels,
  getHomeFocus,
  getPrimaryHomeImage,
  getPricingCadence,
  leadwoodBasePath,
} from "./listing-utils";

export type LeadwoodBreadcrumbItem = {
  label: string;
  href?: string;
};

export function LeadwoodBreadcrumbs({
  items,
  light = false,
}: {
  items: LeadwoodBreadcrumbItem[];
  light?: boolean;
}) {
  const textColor = light ? "text-white/75" : "text-[#6d5646]";
  const activeColor = light ? "text-white" : "text-[#1c140d]";

  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-2 text-sm ${textColor}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition hover:text-[#dd5500]">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? activeColor : undefined}>{item.label}</span>
            )}
            {!isLast ? <span>/</span> : null}
          </div>
        );
      })}
    </nav>
  );
}

export function LeadwoodListingCard({
  home,
  href = `${leadwoodBasePath}/${home.id}`,
}: {
  home: HomeListing;
  href?: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#ead9cb] bg-white shadow-[0_18px_50px_-24px_rgba(74,37,15,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(74,37,15,0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={getPrimaryHomeImage(home)}
          alt={home.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7b2d00]">
            {getHomeCollection(home)}
          </span>
          <span className="rounded-full bg-[#1a120b]/85 px-3 py-1 text-xs font-semibold text-white">
            {getPricingCadence(home)}
          </span>
        </div>
      </div>

      <div className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#cf6c3d]">
              {home.type}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[#1c140d]">{home.title}</h3>
            <p className="mt-2 text-sm text-[#6d5646]">{home.location}</p>
          </div>
          <p className="text-lg font-semibold text-[#1c140d]">{formatHomePrice(home.price)}</p>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-[#5b4739]">{home.description}</p>

        <div className="grid gap-2 text-sm text-[#2d241e] sm:grid-cols-2">
          {getHomeFeatureLabels(home).map((label) => (
            <span
              key={label}
              className="rounded-full bg-[#f8efe8] px-3 py-2 font-medium text-[#50331d]"
            >
              {label}
            </span>
          ))}
        </div>

        <p className="max-w-[15rem] text-sm font-medium text-[#6d5646]">{getHomeFocus(home)}</p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-[#1b1209] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#dd5500]"
          >
            View apartment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
