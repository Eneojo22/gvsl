"use client";

import Link from "next/link";
import { CheckCircle2, Star, ThumbsUp } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import ReviewStars from "./ReviewStars";
import {
  getAllReviews,
  saveLocalReview,
  serviceOptions,
  type Review,
} from "./reviews";

type FeedbackForm = {
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
};

const initialForm: FeedbackForm = {
  name: "",
  location: "",
  service: serviceOptions[0],
  rating: 5,
  comment: "",
};

function formatReviewDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function FeedbackFormSection() {
  const [form, setForm] = useState<FeedbackForm>(initialForm);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setReviews(getAllReviews().slice(0, 3));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextForm = {
      ...form,
      name: form.name.trim(),
      location: form.location.trim(),
      comment: form.comment.trim(),
    };

    if (!nextForm.name || !nextForm.location || !nextForm.comment) {
      setErrorMessage("Please complete your name, location, and review before sending.");
      setSuccessMessage("");
      return;
    }

    saveLocalReview(nextForm);
    setReviews(getAllReviews().slice(0, 3));
    setForm(initialForm);
    setErrorMessage("");
    setSuccessMessage("Thanks for the review. It has been saved on this device and added to testimonials.");
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex items-center gap-3 text-[#d35200]">
            <ThumbsUp className="h-6 w-6" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">Leave a review</p>
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-slate-900">Tell us how your experience went</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">
            Share the service you used, your rating, and what stood out to you. This review is
            stored in your browser, so it stays local to this device.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-800">Your name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Jane A."
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#dd5500] focus:ring-2 focus:ring-[#dd5500]/20"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-800">Location</span>
                <input
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, location: event.target.value }))
                  }
                  placeholder="Lekki, Lagos"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#dd5500] focus:ring-2 focus:ring-[#dd5500]/20"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-slate-800">Service used</span>
              <select
                value={form.service}
                onChange={(event) =>
                  setForm((current) => ({ ...current, service: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#dd5500] focus:ring-2 focus:ring-[#dd5500]/20"
              >
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <span className="text-sm font-semibold text-slate-800">Rating</span>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {[1, 2, 3, 4, 5].map((value) => {
                  const isActive = value === form.rating;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((current) => ({ ...current, rating: value }))}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "border-[#dd5500] bg-[#fff1e7] text-[#b24806]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-[#f1b086]"
                      }`}
                    >
                      <Star className={isActive ? "h-4 w-4 fill-current" : "h-4 w-4"} />
                      {value}
                    </button>
                  );
                })}
                <ReviewStars rating={form.rating} />
              </div>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-slate-800">Your review</span>
              <textarea
                value={form.comment}
                onChange={(event) =>
                  setForm((current) => ({ ...current, comment: event.target.value }))
                }
                rows={5}
                placeholder="What went well, and what should future clients know about your experience?"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#dd5500] focus:ring-2 focus:ring-[#dd5500]/20"
              />
            </label>

            {errorMessage ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            ) : null}

            {successMessage ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>{successMessage}</p>
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c54800]"
              >
                Send feedback
              </button>
              <Link
                href="/aboutUs/Testimonials"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                View testimonials
              </Link>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-[#fff7ed] p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">What happens after you submit?</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
              <li>Your review is saved in local storage on this device.</li>
              <li>It becomes visible on the testimonials page immediately.</li>
              <li>You can keep adding more reviews as fresh feedback comes in.</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">Recent reviews</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              A quick look at the latest review-style feedback.
            </p>

            <div className="mt-6 space-y-4">
              {reviews.length ? (
                reviews.map((review) => (
                  <article key={review.id} className="rounded-3xl bg-slate-50 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{review.name}</p>
                        <p className="text-sm text-slate-500">{review.location}</p>
                      </div>
                      <ReviewStars rating={review.rating} size={16} />
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-700">"{review.comment}"</p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                      <span>{review.service}</span>
                      <span>{formatReviewDate(review.createdAt)}</span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
                  No client reviews yet. The first submitted review will appear here.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
