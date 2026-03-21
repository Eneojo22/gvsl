export const siteUrl = "https://gvss.ng";
export const siteName = "G&V Support Services";
export const siteLegalName = "G&V Support Services Limited";
export const siteDescription =
  "G&V Support Services Limited helps clients find apartments and houses in Lagos, furnish homes and offices, and manage relocation support across Nigeria.";

export const brandSearchTerms = [
  "G&V Support Services",
  "G and V Support Services",
  "G and V",
  "GandV",
  "GVSS",
  "GVSS Nigeria",
  "GV Support Services",
  "gvss.ng",
];

export const defaultKeywords = [
  "G&V Support Services",
  "G and V Support Services",
  "GandV",
  "GVSS",
  "housing in Nigeria",
  "apartment in Lagos",
  "apartments in Lagos",
  "serviced apartments Lagos",
  "houses in Lagos",
  "Leadwood Homes",
  "Leadwood Furniture",
  "furniture in Lagos",
  "furniture in Nigeria",
  "relocation services Lagos",
  "relocation services in Nigeria",
  "airport meet and greet Nigeria",
  "orientation services Nigeria",
  "departure services Nigeria",
];

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteLegalName,
  alternateName: "G and V Support Services (GVSS)",
  url: siteUrl,
  logo: `${siteUrl}/image/G___V_SUPPORT_SERVICE_ltd__7_-removebg-preview.png`,
  email: "info@gvss.ng",
  telephone: "+2348137167298",
  address: {
    "@type": "PostalAddress",
    streetAddress: "90 Allen Avenue",
    addressLocality: "Ikeja",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  description: siteDescription,
  areaServed: "Nigeria",
  knowsAbout: [
    "apartments in Lagos",
    "housing support",
    "apartments",
    "houses",
    "furniture solutions",
    "relocation services",
    "airport meet and greet",
    "orientation support",
    "departure services",
  ],
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  alternateName: "G and V Support Services",
  url: siteUrl,
  description: siteDescription,
};
