"use client";

import Link from "next/link";
import { MessageSquareQuote, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import ReviewStars from "./ReviewStars";
import {
  getAllReviews,
  getAverageRating,
  REVIEW_UPDATE_EVENT,
  type Review,
} from "./reviews";

function formatReviewDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function TestimonialsReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = () => {
      setReviews(getAllReviews());
    };

    loadReviews();

    window.addEventListener(REVIEW_UPDATE_EVENT, loadReviews);
    window.addEventListener("storage", loadReviews);

    return () => {
      window.removeEventListener(REVIEW_UPDATE_EVENT, loadReviews);
      window.removeEventListener("storage", loadReviews);
    };
  }, []);

  const averageRating = getAverageRating(reviews);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700">
            Honest reviews help new clients understand what it feels like to work with us. Every
            review added on this device is saved locally and shows up here right away.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#f3d4bf] bg-[#fff7f1] px-4 py-2 text-sm font-medium text-[#9d4715]">
            <Sparkles className="h-4 w-4" />
            Real client stories, practical support, and review-style ratings
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              Average rating
            </p>
            {reviews.length ? (
              <>
                <div className="mt-3 flex items-end gap-3">
                  <p className="text-4xl font-semibold text-slate-900">{averageRating.toFixed(1)}</p>
                  <ReviewStars rating={averageRating} />
                </div>
                <p className="mt-3 text-sm text-slate-600">Based on {reviews.length} review entries.</p>
              </>
            ) : (
              <>
                <p className="mt-3 text-2xl font-semibold text-slate-900">No reviews yet</p>
                <p className="mt-3 text-sm text-slate-600">
                  Client reviews will appear here after someone submits feedback.
                </p>
              </>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#fff7ed] p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#d35200]">
              <TrendingUp className="h-5 w-5" />
              <p className="text-sm font-medium uppercase tracking-[0.18em]">What stands out</p>
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Clients mention fast support, dependable local guidance, and smoother settling-in
              experiences across Nigeria.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {reviews.length ? (
          reviews.map((review) => (
            <article
              key={review.id}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <ReviewStars rating={review.rating} />
                  <p className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    {review.service}
                  </p>
                </div>
                <MessageSquareQuote className="h-8 w-8 shrink-0 text-[#dd5500]" />
              </div>

              <p className="mt-5 flex-1 text-base leading-relaxed text-slate-700">
                "{review.comment}"
              </p>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-base font-semibold text-slate-900">{review.name}</p>
                <p className="mt-1 text-sm text-slate-500">{review.location}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  {formatReviewDate(review.createdAt)}
                </p>
              </div>
            </article>
          ))
        ) : (
          <article className="rounded-3xl border border-dashed border-[#dd5500]/40 bg-[#fffaf6] p-8 text-center shadow-sm md:col-span-2 xl:col-span-3">
            <h3 className="text-2xl font-semibold text-slate-900">Be the first to leave a review</h3>
            <p className="mt-3 mx-auto max-w-2xl text-base leading-relaxed text-slate-700">
              No client reviews have been submitted on this device yet. Once a client leaves feedback,
              it will appear here automatically.
            </p>
          </article>
        )}
      </section>

      <section className="mt-16 rounded-3xl bg-[#f8f5f1] p-8 shadow-sm sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-900">Share your experience</h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
          Leave a review about the service you used. Your feedback will be saved in this browser
          and added to the testimonial list immediately.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/aboutUs/feedback"
            className="inline-flex items-center justify-center rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c54800]"
          >
            Write a review
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
