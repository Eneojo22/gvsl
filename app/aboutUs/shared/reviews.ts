export type Review = {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type ReviewInput = Omit<Review, "id" | "createdAt">;

export const REVIEW_STORAGE_KEY = "gvss-customer-reviews";
export const REVIEW_UPDATE_EVENT = "gvss-reviews-updated";

export const serviceOptions = [
  "Orientation support",
  "Home search",
  "Furniture support",
  "Airport meet and greet",
  "Departure support",
  "Chauffeur services",
  "General relocation support",
] as const;

function clampRating(rating: number) {
  return Math.max(1, Math.min(5, Math.round(rating)));
}

function isReviewLike(value: unknown): value is Review {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Review>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.location === "string" &&
    typeof candidate.service === "string" &&
    typeof candidate.rating === "number" &&
    typeof candidate.comment === "string" &&
    typeof candidate.createdAt === "string"
  );
}

function normalizeReview(review: Review): Review {
  return {
    ...review,
    name: review.name.trim(),
    location: review.location.trim(),
    service: review.service.trim(),
    comment: review.comment.trim(),
    rating: clampRating(review.rating),
  };
}

function sortReviewsByNewest(reviews: Review[]) {
  return [...reviews].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

function parseStoredReviews(rawValue: string | null) {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return sortReviewsByNewest(parsed.filter(isReviewLike).map(normalizeReview));
  } catch {
    return [];
  }
}

export function getLocalReviews() {
  if (typeof window === "undefined") {
    return [];
  }

  return parseStoredReviews(window.localStorage.getItem(REVIEW_STORAGE_KEY));
}

export function getAllReviews() {
  return getLocalReviews();
}

export function saveLocalReview(review: ReviewInput) {
  if (typeof window === "undefined") {
    return null;
  }

  const nextReview: Review = normalizeReview({
    ...review,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  });

  const updatedReviews = sortReviewsByNewest([nextReview, ...getLocalReviews()]);
  window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(updatedReviews));
  window.dispatchEvent(new Event(REVIEW_UPDATE_EVENT));

  return nextReview;
}

export function getAverageRating(reviews: Review[]) {
  if (!reviews.length) {
    return 0;
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
}
