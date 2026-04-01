import { NextResponse } from "next/server";

export async function GET() {
  const stats = [
    {
      value: "300+",
      label: "Clients supported",
      description: "Across housing, relocation, and move-in support in Nigeria.",
    },
    {
      value: "10+",
      label: "Years of experience",
      description: "Helping clients make confident relocation decisions for over a decade.",
    },
    {
      value: "98%",
      label: "Client satisfaction",
      description: "Trusted for responsive, people-first service delivery.",
    },
    {
      value: "7+",
      label: "Service locations",
      description: "Supporting assignments across key Nigerian locations.",
    },
    {
      value: "End-to-end",
      label: "Relocation coverage",
      description: "Housing, arrival support, furniture, and ongoing local coordination.",
    },
    {
      value: "< 24h",
      label: "Average response time",
      description: "Fast answers when timelines and move decisions need clarity.",
    },
  ];

  return NextResponse.json(stats, { status: 200 });
}
