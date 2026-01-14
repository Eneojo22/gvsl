
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  // your logic here
  return NextResponse.json({ success: true, data });
}
