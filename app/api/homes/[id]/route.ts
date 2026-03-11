import { NextResponse } from "next/server";

import { getHomeListingById } from "@/app/lib/cms-store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const home = await getHomeListingById(Number.parseInt(id, 10));

  if (!home) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  return NextResponse.json({ home });
}
