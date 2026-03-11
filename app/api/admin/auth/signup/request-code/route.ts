import { NextResponse } from "next/server";

import { requestSignupCode } from "@/app/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await requestSignupCode({
      fullName: String(body.fullName ?? ""),
      email: String(body.email ?? ""),
      password: String(body.password ?? ""),
      confirmPassword: String(body.confirmPassword ?? ""),
    });

    return NextResponse.json({
      message: "Verification code sent successfully.",
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to send verification code.",
      },
      { status: 400 }
    );
  }
}
