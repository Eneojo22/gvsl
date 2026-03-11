import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, verifySignupCode } from "@/app/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await verifySignupCode({
      email: String(body.email ?? ""),
      code: String(body.code ?? ""),
    });

    const response = NextResponse.json({
      message: "Admin account created successfully.",
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
        error: error instanceof Error ? error.message : "Unable to verify signup code.",
      },
      { status: 400 }
    );
  }
}
