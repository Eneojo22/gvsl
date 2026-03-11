import { NextResponse } from "next/server";

import { getFurnitureItems } from "@/app/lib/cms-store";

export async function GET() {
  const furniture = await getFurnitureItems();
  return NextResponse.json({ furniture });
}
