import type { Metadata } from "next";

import Landingpage from "./component/landingpage";
import {
  brandSearchTerms,
  defaultKeywords,
  siteDescription,
  siteName,
  siteUrl,
} from "./lib/seo";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${siteName} Home`,
  url: siteUrl,
  description: siteDescription,
  about: [
    "housing support",
    "apartments in Lagos",
    "furniture in Nigeria",
    "relocation services in Nigeria",
  ],
  keywords: [...brandSearchTerms, "houses", "apartments", "furniture"],
};

export const metadata: Metadata = {
  title: "G&V Support Services | Houses, Apartments, Furniture and Relocation Support",
  description: siteDescription,
  keywords: [
    ...defaultKeywords,
    "houses in Nigeria",
    "apartments in Nigeria",
    "furniture showroom Lagos",
    "G and V Support Services Nigeria",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "G&V Support Services | Houses, Apartments, Furniture and Relocation Support",
    description: siteDescription,
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
