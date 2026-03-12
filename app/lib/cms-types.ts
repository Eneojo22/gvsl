export const homeGalleryFieldNames = {
  livingRoom: "livingRoomImages",
  bedroom: "bedroomImages",
  toilet: "toiletImages",
} as const;

export const homeGallerySections = [
  {
    key: "livingRoom",
    label: "Living room",
    fieldName: homeGalleryFieldNames.livingRoom,
  },
  {
    key: "bedroom",
    label: "Bedroom / rest room",
    fieldName: homeGalleryFieldNames.bedroom,
  },
  {
    key: "toilet",
    label: "Toilet",
    fieldName: homeGalleryFieldNames.toilet,
  },
] as const;

export type HomeGallerySectionKey = (typeof homeGallerySections)[number]["key"];

export type HomeListingGallery = Record<HomeGallerySectionKey, string[]>;

export function createEmptyHomeListingGallery(): HomeListingGallery {
  return {
    livingRoom: [],
    bedroom: [],
    toilet: [],
  };
}

export interface HomeListingFeatures {
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  parkingSpaces: number;
}

export interface HomeListing {
  id: number;
  title: string;
  type: string;
  description: string;
  price: number;
  location: string;
  image: string | null;
  gallery: HomeListingGallery;
  features: HomeListingFeatures;
  createdAt: string;
  updatedAt: string;
}

export interface FurnitureItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactReply {
  id: string;
  adminEmail: string;
  adminName: string;
  message: string;
  sentAt: string;
  deliveryMethod: "smtp" | "preview";
}

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  agree: boolean;
  status: "new" | "replied";
  createdAt: string;
  replies: ContactReply[];
}

export interface CmsContent {
  homes: HomeListing[];
  furniture: FurnitureItem[];
}

export interface AdminUserRecord {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
  verifiedAt: string;
}

export interface AdminViewer {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  verifiedAt: string;
}

export interface SignupVerificationRecord {
  email: string;
  fullName: string;
  passwordHash: string;
  passwordSalt: string;
  code: string;
  expiresAt: string;
  requestedAt: string;
}

export interface AdminSessionRecord {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}
