export const siteUrl = "https://gvss.com";
export const siteName = "G&V Support Services";
export const siteLegalName = "G&V Support Services Limited";
export const siteDescription =
  "G&V Support Services Limited provides housing support, apartments, furniture solutions, airport meet and greet, orientation, and departure services in Nigeria.";

export const brandSearchTerms = [
  "G&V Support Services",
  "G and V Support Services",
  "G and V",
  "GandV",
  "GV Support Services",
];

export const defaultKeywords = [
  "G&V Support Services",
  "G and V Support Services",
  "GandV",
  "housing in Nigeria",
  "apartments in Lagos",
  "houses in Lagos",
  "Leadwood Homes",
  "Leadwood Furniture",
  "furniture in Lagos",
  "furniture in Nigeria",
  "relocation services in Nigeria",
  "airport meet and greet Nigeria",
  "orientation services Nigeria",
  "departure services Nigeria",
];

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteLegalName,
  alternateName: "G and V Support Services (GandV)",
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
