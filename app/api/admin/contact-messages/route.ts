import { NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminViewerBySessionToken } from "@/app/lib/admin-auth";
import { getContactMessages } from "@/app/lib/cms-store";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const viewer = await getAdminViewerBySessionToken(token);

  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const messages = await getContactMessages();
  return NextResponse.json({ messages });
}
