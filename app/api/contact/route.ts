import { NextResponse } from "next/server";

import { getAdminEmailRecipients } from "@/app/lib/admin-auth";
import { createContactMessage } from "@/app/lib/cms-store";
import { sendAppEmail } from "@/app/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const payload = {
      firstName: String(body.firstName ?? "").trim(),
      lastName: String(body.lastName ?? "").trim(),
      email: String(body.email ?? "").trim().toLowerCase(),
      company: String(body.company ?? "").trim(),
      interest: String(body.interest ?? "").trim(),
      message: String(body.message ?? "").trim(),
      agree: Boolean(body.agree),
    };

    if (!payload.firstName || !payload.email || !payload.interest || !payload.message) {
      return NextResponse.json(
        { error: "First name, email, interest, and message are required." },
        { status: 400 }
      );
    }

    const contactMessage = await createContactMessage(payload);
    const adminRecipients = await getAdminEmailRecipients();

    if (adminRecipients.length > 0) {
      await sendAppEmail({
        to: adminRecipients,
        subject: `New website contact from ${payload.firstName} ${payload.lastName}`.trim(),
        text:
          `Name: ${payload.firstName} ${payload.lastName}\n` +
          `Email: ${payload.email}\n` +
          `Company: ${payload.company || "Not provided"}\n` +
          `Interest: ${payload.interest}\n\n` +
          `${payload.message}`,
      });
    }

    return NextResponse.json({
      message: "Your message has been received.",
      contactMessage,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to submit contact message.",
      },
      { status: 400 }
    );
  }
}
