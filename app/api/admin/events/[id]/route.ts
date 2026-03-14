import { NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminViewerBySessionToken } from "@/app/lib/admin-auth";
import { deleteEvent, getEventById, parseEventFormData, updateEvent } from "@/app/lib/cms-store";

export const runtime = "nodejs";

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return getAdminViewerBySessionToken(token);
}

function parseId(id: string) {
  return Number.parseInt(id, 10);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const viewer = await requireAdmin(request);
  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const eventId = parseId(id);
  const existing = await getEventById(eventId);

  if (!existing) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  try {
    const formData = await request.formData();
    const parsed = parseEventFormData(formData);
    const updated = await updateEvent(eventId, {
      title: parsed.title || existing.title,
      date: parsed.date || existing.date,
      location: parsed.location || existing.location,
      description: parsed.description || existing.description,
      ctaLabel: parsed.ctaLabel || existing.ctaLabel,
      ctaHref: parsed.ctaHref || existing.ctaHref,
    });

    return NextResponse.json({ event: updated });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update event." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const viewer = await requireAdmin(request);
  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteEvent(parseId(id));

  if (!deleted) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
