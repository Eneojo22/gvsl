import type { HomeListing } from "@/app/lib/cms-types";

export const leadwoodBasePath = "/services/leadwoodhomes";

type CollectionDetails = {
  name: string;
  description: string;
};

const collectionDictionary: Record<string, CollectionDetails> = {
  "Short Stays": {
    name: "Short Stays",
    description: "Move-in ready homes for business trips, quick visits, and flexible living.",
  },
  "Serviced Apartments": {
    name: "Serviced Apartments",
    description: "Convenient apartments designed for comfortable city living and easy routines.",
  },
  "Terrace Homes": {
    name: "Terrace Homes",
    description: "Elegant layouts with a balance of privacy, space, and modern finishes.",
  },
  "Duplex Homes": {
    name: "Duplex Homes",
    description: "Multi-level homes for families, executives, and clients who need room to grow.",
  },
  "Executive Homes": {
    name: "Executive Homes",
    description: "Premium residences in strong residential locations with standout everyday comfort.",
  },
};

function pluralize(value: number, singular: string, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`;
}

export function formatHomePrice(price: number) {
  return `N${price.toLocaleString("en-NG")}`;
}

export function getPricingCadence(home: HomeListing) {
  const lowerText = `${home.title} ${home.type} ${home.description}`.toLowerCase();

  if (lowerText.includes("shortlet") || lowerText.includes("short stay")) {
    return "Flexible short stay";
  }

  return "Annual rent";
}

export function getInspectionLink(title?: string) {
  const message = title
    ? `Hello Leadwood Homes, I would like to schedule an inspection for ${title}.`
    : "Hello Leadwood Homes, I would like to schedule an apartment inspection.";

  return `https://wa.me/2348137167298?text=${encodeURIComponent(message)}`;
}

export function getHomeCollection(home: HomeListing) {
  const lowerText = `${home.title} ${home.type}`.toLowerCase();

  if (lowerText.includes("shortlet")) {
    return collectionDictionary["Short Stays"].name;
  }

  if (lowerText.includes("terrace")) {
    return collectionDictionary["Terrace Homes"].name;
  }

  if (lowerText.includes("duplex")) {
    return collectionDictionary["Duplex Homes"].name;
  }

  if (lowerText.includes("apartment")) {
    return collectionDictionary["Serviced Apartments"].name;
  }

  return collectionDictionary["Executive Homes"].name;
}

export function getHomeFocus(home: HomeListing) {
  if (home.features.bedrooms >= 5) {
    return "Best for families and company leases";
  }

  if (home.features.bedrooms >= 3) {
    return "Great for executives and long-stay comfort";
  }

  if (getPricingCadence(home) === "Flexible short stay") {
    return "Built for short visits and easy move-ins";
  }

  return "Ideal for compact, easy-to-manage living";
}

export function getHomeFeatureLabels(home: HomeListing) {
  return [
    pluralize(home.features.bedrooms, "Bed"),
    pluralize(home.features.bathrooms, "Bath"),
    pluralize(home.features.parkingSpaces, "Parking Bay", "Parking Bays"),
    home.location,
  ];
}

export function buildLeadwoodStats(homes: HomeListing[]) {
  if (homes.length === 0) {
    return [
      {
        label: "Live listings",
        value: "0",
        description: "Fresh Leadwood Homes inventory will appear here as soon as it is added.",
      },
    ];
  }

  const prices = homes.map((home) => home.price);
  const bedrooms = homes.map((home) => home.features.bedrooms);
  const uniqueLocations = new Set(homes.map((home) => home.location)).size;

  return [
    {
      label: "Live listings",
      value: String(homes.length),
      description: "Properties pulled from the active Leadwood Homes inventory.",
    },
    {
      label: "Locations",
      value: String(uniqueLocations),
      description: "Well-positioned Lagos neighborhoods represented in the current mix.",
    },
    {
      label: "Apartment range",
      value: `${Math.min(...bedrooms)}-${Math.max(...bedrooms)} Beds`,
      description: "From compact short stays to larger family-ready layouts.",
    },
    {
      label: "Price range",
      value: `${formatHomePrice(Math.min(...prices))} - ${formatHomePrice(Math.max(...prices))}`,
      description: "A quick view of the active pricing spread across the collection.",
    },
  ];
}

export function buildHomeCollections(homes: HomeListing[]) {
  const collectionMap = new Map<string, number>();

  homes.forEach((home) => {
    const collection = getHomeCollection(home);
    collectionMap.set(collection, (collectionMap.get(collection) ?? 0) + 1);
  });

  return Array.from(collectionMap.entries())
    .map(([collection, count]) => ({
      name: collection,
      count,
      description:
        collectionDictionary[collection]?.description ?? collectionDictionary["Executive Homes"].description,
    }))
    .sort((first, second) => second.count - first.count);
}

export function buildApartmentHighlights(home: HomeListing) {
  const highlights = [
    `${pluralize(home.features.bedrooms, "bedroom")} layout with room to settle in comfortably.`,
    `${pluralize(home.features.bathrooms, "bathroom")} and ${pluralize(home.features.toilets, "toilet")} planned for smoother daily use.`,
    `${pluralize(home.features.parkingSpaces, "parking space")} available for residents and visitors.`,
    `Located in ${home.location} for quick access to business hubs, schools, and key city routes.`,
  ];

  const lowerText = `${home.title} ${home.type} ${home.description}`.toLowerCase();

  if (lowerText.includes("furnished")) {
    highlights.splice(1, 0, "Furnished setup that reduces move-in stress and shortens setup time.");
  } else if (lowerText.includes("serviced")) {
    highlights.splice(1, 0, "Serviced arrangement that helps simplify routine living and guest stays.");
  } else if (lowerText.includes("duplex")) {
    highlights.splice(1, 0, "Multi-level home style that offers extra separation between living zones.");
  }

  return highlights.slice(0, 4);
}

export function getAudienceLabel(home: HomeListing) {
  if (getPricingCadence(home) === "Flexible short stay") {
    return "Short-stay guests, business travelers, and quick relocations";
  }

  if (home.features.bedrooms >= 4) {
    return "Families, long-stay executives, and company housing plans";
  }

  if (home.features.bedrooms >= 2) {
    return "Professionals, couples, and small households";
  }

  return "Solo residents and short-stay professionals";
}
