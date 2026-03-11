import { NextResponse } from "next/server";

import { getHomeListings } from "@/app/lib/cms-store";

export async function GET() {
  const homes = await getHomeListings();
  return NextResponse.json({ homes });
}
