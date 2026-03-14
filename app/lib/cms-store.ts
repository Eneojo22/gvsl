import "server-only";

import { randomUUID } from "crypto";

import { seedCmsContent } from "./cms-seed";
import type {
  CmsContent,
  ContactMessage,
  ContactReply,
  EventItem,
  FurnitureItem,
  HomeGallerySectionKey,
  HomeListing,
  HomeListingFeatures,
  HomeListingGallery,
} from "./cms-types";
import { createEmptyHomeListingGallery, homeGallerySections } from "./cms-types";
import { deletePublicUpload, readJsonFile, saveUploadFile, writeJsonFile } from "./local-store";

const CMS_CONTENT_FILE = "cms-data.json";
const CONTACT_MESSAGES_FILE = "contact-messages.json";

function numberOrZero(value: number | string | null | undefined) {
  const numericValue =
    typeof value === "number" ? value : Number.parseInt(String(value ?? 0), 10);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

function decimalOrZero(value: number | string | null | undefined) {
  const numericValue =
    typeof value === "number" ? value : Number.parseFloat(String(value ?? 0));

  return Number.isFinite(numericValue) ? numericValue : 0;
}

function getNextNumericId(items: Array<{ id: number }>) {
  return items.reduce((highestId, item) => Math.max(highestId, item.id), 0) + 1;
}

function normalizeHomeGallery(gallery?: Partial<HomeListingGallery> | null): HomeListingGallery {
  const emptyGallery = createEmptyHomeListingGallery();

  return {
    livingRoom:
      gallery?.livingRoom?.filter(
        (image): image is string => typeof image === "string" && image.length > 0
      ) ?? emptyGallery.livingRoom,
    bedroom:
      gallery?.bedroom?.filter(
        (image): image is string => typeof image === "string" && image.length > 0
      ) ?? emptyGallery.bedroom,
    toilet:
      gallery?.toilet?.filter(
        (image): image is string => typeof image === "string" && image.length > 0
      ) ?? emptyGallery.toilet,
  };
}

function normalizeHomeListing(
  home: Omit<HomeListing, "gallery"> & { gallery?: Partial<HomeListingGallery> | null }
): HomeListing {
  return {
    ...home,
    gallery: normalizeHomeGallery(home.gallery),
  };
}

function collectHomeMediaPaths(home: Pick<HomeListing, "image" | "gallery">) {
  const mediaPaths = new Set<string>();

  if (home.image) {
    mediaPaths.add(home.image);
  }

  homeGallerySections.forEach((section) => {
    home.gallery[section.key].forEach((image) => mediaPaths.add(image));
  });

  return Array.from(mediaPaths);
}

async function deleteHomeMediaUploads(home: Pick<HomeListing, "image" | "gallery">) {
  await Promise.all(collectHomeMediaPaths(home).map((image) => deletePublicUpload(image)));
}

function getFormFile(entry: FormDataEntryValue | null) {
  return entry instanceof File && entry.size > 0 ? entry : null;
}

function getFormFiles(entries: FormDataEntryValue[]) {
  return entries.filter((entry): entry is File => entry instanceof File && entry.size > 0);
}

export async function getCmsContent(): Promise<CmsContent> {
  const contentFromFile = await readJsonFile<Partial<CmsContent>>(CMS_CONTENT_FILE, seedCmsContent);

  const content: CmsContent = {
    homes: (contentFromFile.homes ?? seedCmsContent.homes).map((home) => normalizeHomeListing(home)),
    furniture: contentFromFile.furniture ?? seedCmsContent.furniture,
    events: contentFromFile.events ?? seedCmsContent.events ?? [],
  };

  return content;
}

async function saveCmsContent(content: CmsContent) {
  await writeJsonFile(CMS_CONTENT_FILE, content);
}

export async function getHomeListings() {
  const content = await getCmsContent();
  return content.homes.sort((first, second) => second.id - first.id);
}

export async function getHomeListingById(id: number) {
  const homes = await getHomeListings();
  return homes.find((home) => home.id === id) ?? null;
}

export async function createHomeListing(input: {
  title: string;
  type: string;
  description: string;
  price: number;
  location: string;
  features: HomeListingFeatures;
  image: string | null;
  gallery: HomeListingGallery;
}) {
  const content = await getCmsContent();
  const timestamp = new Date().toISOString();

  const newListing: HomeListing = {
    id: getNextNumericId(content.homes),
    title: input.title,
    type: input.type,
    description: input.description,
    price: input.price,
    location: input.location,
    features: input.features,
    image: input.image,
    gallery: normalizeHomeGallery(input.gallery),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  content.homes.unshift(newListing);
  await saveCmsContent(content);

  return newListing;
}

export async function updateHomeListing(
  id: number,
  updates: Partial<Omit<HomeListing, "id" | "createdAt" | "gallery">> & {
    gallery?: Partial<HomeListingGallery>;
  }
) {
  const content = await getCmsContent();
  const currentListing = content.homes.find((home) => home.id === id);

  if (!currentListing) {
    return null;
  }

  const nextListing: HomeListing = {
    ...currentListing,
    ...updates,
    image: updates.image === undefined ? currentListing.image : updates.image,
    gallery:
      updates.gallery === undefined
        ? currentListing.gallery
        : normalizeHomeGallery({
            ...currentListing.gallery,
            ...updates.gallery,
          }),
    features: {
      ...currentListing.features,
      ...(updates.features ?? {}),
    },
    updatedAt: new Date().toISOString(),
  };

  content.homes = content.homes.map((home) => (home.id === id ? nextListing : home));
  await saveCmsContent(content);

  return nextListing;
}

export async function deleteHomeListing(id: number) {
  const content = await getCmsContent();
  const currentListing = content.homes.find((home) => home.id === id);

  if (!currentListing) {
    return false;
  }

  await deleteHomeMediaUploads(currentListing);
  content.homes = content.homes.filter((home) => home.id !== id);
  await saveCmsContent(content);

  return true;
}

export async function deleteHomeListingImage(id: number) {
  const currentListing = await getHomeListingById(id);

  if (!currentListing) {
    return null;
  }

  await deleteHomeMediaUploads(currentListing);
  return updateHomeListing(id, {
    image: null,
    gallery: createEmptyHomeListingGallery(),
  });
}

export async function getFurnitureItems() {
  const content = await getCmsContent();
  return content.furniture.sort((first, second) => second.id - first.id);
}

export async function getFurnitureItemById(id: number) {
  const items = await getFurnitureItems();
  return items.find((item) => item.id === id) ?? null;
}

export async function createFurnitureItem(input: {
  name: string;
  category: string;
  price: number;
  description: string;
  image: string | null;
}) {
  const content = await getCmsContent();
  const timestamp = new Date().toISOString();

  const newItem: FurnitureItem = {
    id: getNextNumericId(content.furniture),
    name: input.name,
    category: input.category,
    price: input.price,
    description: input.description,
    image: input.image,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  content.furniture.unshift(newItem);
  await saveCmsContent(content);

  return newItem;
}

export async function updateFurnitureItem(
  id: number,
  updates: Partial<Omit<FurnitureItem, "id" | "createdAt">>
) {
  const content = await getCmsContent();
  const currentItem = content.furniture.find((item) => item.id === id);

  if (!currentItem) {
    return null;
  }

  const nextItem: FurnitureItem = {
    ...currentItem,
    ...updates,
    image: updates.image === undefined ? currentItem.image : updates.image,
    updatedAt: new Date().toISOString(),
  };

  content.furniture = content.furniture.map((item) => (item.id === id ? nextItem : item));
  await saveCmsContent(content);

  return nextItem;
}

export async function deleteFurnitureItem(id: number) {
  const content = await getCmsContent();
  const currentItem = content.furniture.find((item) => item.id === id);

  if (!currentItem) {
    return false;
  }

  await deletePublicUpload(currentItem.image);
  content.furniture = content.furniture.filter((item) => item.id !== id);
  await saveCmsContent(content);

  return true;
}

export async function getEvents() {
  const content = await getCmsContent();
  return content.events.sort((first, second) => second.id - first.id);
}

export async function getEventById(id: number) {
  const events = await getEvents();
  return events.find((event) => event.id === id) ?? null;
}

export async function createEvent(input: {
  title: string;
  date: string;
  location: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const content = await getCmsContent();
  const timestamp = new Date().toISOString();

  const event: EventItem = {
    id: getNextNumericId(content.events),
    title: input.title,
    date: input.date,
    location: input.location,
    description: input.description,
    ctaLabel: input.ctaLabel,
    ctaHref: input.ctaHref,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  content.events.unshift(event);
  await saveCmsContent(content);

  return event;
}

export async function updateEvent(
  id: number,
  updates: Partial<Omit<EventItem, "id" | "createdAt">>
) {
  const content = await getCmsContent();
  const currentEvent = content.events.find((item) => item.id === id);

  if (!currentEvent) {
    return null;
  }

  const nextEvent: EventItem = {
    ...currentEvent,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  content.events = content.events.map((item) => (item.id === id ? nextEvent : item));
  await saveCmsContent(content);

  return nextEvent;
}

export async function deleteEvent(id: number) {
  const content = await getCmsContent();
  const existingEvent = content.events.find((item) => item.id === id);

  if (!existingEvent) {
    return false;
  }

  content.events = content.events.filter((item) => item.id !== id);
  await saveCmsContent(content);

  return true;
}

export function parseEventFormData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    date: String(formData.get("date") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    ctaLabel: String(formData.get("ctaLabel") ?? "").trim(),
    ctaHref: String(formData.get("ctaHref") ?? "/contact-us").trim(),
  };
}

export async function saveHomeImage(file: File) {
  return saveUploadFile(file, "homes");
}

export async function saveHomeGalleryImages(
  galleryFiles: Record<HomeGallerySectionKey, File[]>
): Promise<HomeListingGallery> {
  const gallery = createEmptyHomeListingGallery();

  await Promise.all(
    homeGallerySections.map(async (section) => {
      gallery[section.key] = await Promise.all(
        galleryFiles[section.key].map((file) => saveHomeImage(file))
      );
    })
  );

  return gallery;
}

export async function saveFurnitureImage(file: File) {
  return saveUploadFile(file, "furniture");
}

export async function getContactMessages() {
  const messages = await readJsonFile<ContactMessage[]>(CONTACT_MESSAGES_FILE, []);
  return messages.sort(
    (first, second) =>
      new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
  );
}

export async function createContactMessage(input: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  agree: boolean;
}) {
  const messages = await getContactMessages();

  const nextMessage: ContactMessage = {
    id: randomUUID(),
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    company: input.company,
    interest: input.interest,
    message: input.message,
    agree: input.agree,
    status: "new",
    createdAt: new Date().toISOString(),
    replies: [],
  };

  messages.unshift(nextMessage);
  await writeJsonFile(CONTACT_MESSAGES_FILE, messages);

  return nextMessage;
}

export async function addContactReply(messageId: string, reply: ContactReply) {
  const messages = await getContactMessages();
  const existingMessage = messages.find((message) => message.id === messageId);

  if (!existingMessage) {
    return null;
  }

  existingMessage.status = "replied";
  existingMessage.replies.unshift(reply);

  await writeJsonFile(CONTACT_MESSAGES_FILE, messages);

  return existingMessage;
}

export function parseHomeFormData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    type: String(formData.get("type") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    price: decimalOrZero(formData.get("price")?.toString()),
    location: String(formData.get("location") ?? "").trim(),
    features: {
      bedrooms: numberOrZero(formData.get("bedrooms")?.toString()),
      bathrooms: numberOrZero(formData.get("bathrooms")?.toString()),
      toilets: numberOrZero(formData.get("toilets")?.toString()),
      parkingSpaces: numberOrZero(formData.get("parkingSpaces")?.toString()),
    },
    imageFile: getFormFile(formData.get("image")),
    galleryFiles: homeGallerySections.reduce<Record<HomeGallerySectionKey, File[]>>(
      (gallery, section) => ({
        ...gallery,
        [section.key]: getFormFiles(formData.getAll(section.fieldName)),
      }),
      {
        livingRoom: [],
        bedroom: [],
        toilet: [],
      }
    ),
  };
}

export function parseFurnitureFormData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    price: decimalOrZero(formData.get("price")?.toString()),
    imageFile: formData.get("image"),
  };
}
