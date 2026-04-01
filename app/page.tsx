import type { Metadata } from "next";

import Landingpage from "./component/landingpage";
import {
  brandSearchTerms,
  defaultKeywords,
  siteLegalName,
  siteName,
  siteUrl,
} from "./lib/seo";

const homePageDescription =
  "G&V Support Services helps clients secure housing, coordinate relocation, and furnish ready-to-live homes across Nigeria.";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${siteName} | Apartments, Housing, Furniture and Relocation Support`,
  url: siteUrl,
  description: homePageDescription,
  about: [
    "G&V Support Services",
    "housing support",
    "apartments in Lagos",
    "furniture in Nigeria",
    "relocation services in Nigeria",
  ],
  keywords: [...brandSearchTerms, "houses", "apartments", "furniture"],
  mainEntity: [
    {
      "@type": "Service",
      name: "Apartment and housing support",
      serviceType: "Housing support",
      provider: {
        "@type": "ProfessionalService",
        name: siteLegalName,
      },
      areaServed: "Lagos, Nigeria",
      description:
        "Support with apartments, houses, neighborhood selection, and viewings in Lagos.",
    },
    {
      "@type": "Service",
      name: "Furniture solutions",
      serviceType: "Furniture sourcing and setup",
      provider: {
        "@type": "ProfessionalService",
        name: siteLegalName,
      },
      areaServed: "Nigeria",
      description:
        "Furniture packages and setup support for homes, apartments, and office spaces.",
    },
    {
      "@type": "Service",
      name: "Relocation support",
      serviceType: "Relocation assistance",
      provider: {
        "@type": "ProfessionalService",
        name: siteLegalName,
      },
      areaServed: "Nigeria",
      description:
        "Airport meet and greet, orientation, and departure support for clients relocating in Nigeria.",
    },
  ],
};

export const metadata: Metadata = {
  title: "G&V Support Services | Apartments in Lagos, Housing, Furniture and Relocation",
  description: homePageDescription,
  keywords: [
    ...defaultKeywords,
    "GVSS apartments",
    "houses in Nigeria",
    "apartments in Nigeria",
    "furniture showroom Lagos",
    "G and V Support Services Nigeria",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "G&V Support Services | Apartments in Lagos, Housing, Furniture and Relocation",
    description: homePageDescription,
    url: siteUrl,
    images: [
      {
        url: "/image/leadhome.jpg",
        width: 1200,
        height: 630,
        alt: "G&V Support Services houses, apartments, and furniture support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "G&V Support Services | Apartments in Lagos, Housing, Furniture and Relocation",
    description: homePageDescription,
    images: ["/image/leadhome.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />
      <Landingpage />
    </>
  );
}
