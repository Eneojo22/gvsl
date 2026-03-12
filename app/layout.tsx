import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import RootLayoutShell from "./root-layout-shell";
import {
  brandSearchTerms,
  defaultKeywords,
  organizationStructuredData,
  siteDescription,
  siteLegalName,
  siteName,
  siteUrl,
  websiteStructuredData,
} from "./lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Housing, Furniture and Relocation Support in Nigeria`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteLegalName,
  keywords: defaultKeywords,
  category: "Relocation, housing and furniture services",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} | Housing, Furniture and Relocation Support in Nigeria`,
    description: siteDescription,
    locale: "en_NG",
    images: [
      {
        url: "/image/leadhome.jpg",
        width: 1200,
        height: 630,
        alt: `${siteName} housing and furniture services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Housing, Furniture and Relocation Support in Nigeria`,
    description: siteDescription,
    images: ["/image/leadhome.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  authors: [{ name: siteLegalName }],
  creator: siteLegalName,
  publisher: siteLegalName,
  other: {
    "brand:alternate": brandSearchTerms.join(", "),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = [organizationStructuredData, websiteStructuredData];

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <RootLayoutShell>{children}</RootLayoutShell>
      </body>
    </html>
  );
}
