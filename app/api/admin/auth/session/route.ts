import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  getAdminViewerBySessionToken,
  loginAdmin,
  revokeSession,
} from "@/app/lib/admin-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const viewer = await getAdminViewerBySessionToken(token);

  if (!viewer) {
    return NextResponse.json({ viewer: null }, { status: 401 });
  }

  return NextResponse.json({ viewer });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await loginAdmin({
      email: String(body.email ?? ""),
      password: String(body.password ?? ""),
    });

    const response = NextResponse.json({
      message: "Login successful.",
      viewer: result.viewer,
    });

    response.cookies.set(ADMIN_SESSION_COOKIE, result.session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(result.session.expiresAt),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to log in.",
      },
      { status: 401 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  await revokeSession(token);

  const response = NextResponse.json({ message: "Logged out successfully." });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
