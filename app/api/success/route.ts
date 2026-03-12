import { NextResponse } from "next/server";

export async function GET() {
  const successStory = {
    title: "From arrival to life in Lagos: A smooth, stress-free journey",
    highlight:
      "We helped a family relocate from Amsterdam with a fully coordinated move, housing search, and cultural orientation. Everything was ready on day one.",
    details:
      "Our team booked airport meet-and-greet, handled immigration support, lined up school viewings, and arranged furniture delivery — all within two weeks. The family moved into their new home confidently and hit the ground running.",
    ctaLabel: "Read more testimonials",
    ctaLink: "/aboutUs/Testimonials",
  };

  return NextResponse.json(successStory, { status: 200 });
}
