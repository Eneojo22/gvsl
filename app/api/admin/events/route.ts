import { NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminViewerBySessionToken } from "@/app/lib/admin-auth";
import { createEvent, getEvents, parseEventFormData } from "@/app/lib/cms-store";

export const runtime = "nodejs";

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return getAdminViewerBySessionToken(token);
}

export async function GET(request: NextRequest) {
  const viewer = await requireAdmin(request);

  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const events = await getEvents();
  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
  const viewer = await requireAdmin(request);

  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const parsed = parseEventFormData(formData);

    if (!parsed.title || !parsed.date || !parsed.location || !parsed.description) {
      return NextResponse.json(
        { error: "Title, date, location, and description are required." },
        { status: 400 }
      );
    }

    const event = await createEvent(parsed);
    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create event." },
      { status: 400 }
    );
  }
}
