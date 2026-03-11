import { NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminViewerBySessionToken } from "@/app/lib/admin-auth";
import { deleteHomeListingImage } from "@/app/lib/cms-store";

export const runtime = "nodejs";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const viewer = await getAdminViewerBySessionToken(token);

  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const home = await deleteHomeListingImage(Number.parseInt(id, 10));

  if (!home) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  return NextResponse.json({ home });
}
