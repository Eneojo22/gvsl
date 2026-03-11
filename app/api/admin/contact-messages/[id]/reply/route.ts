import { randomUUID } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminViewerBySessionToken } from "@/app/lib/admin-auth";
import { addContactReply, getContactMessages } from "@/app/lib/cms-store";
import { sendAppEmail } from "@/app/lib/mailer";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const viewer = await getAdminViewerBySessionToken(token);

  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const replyMessage = String(body.message ?? "").trim();

  if (!replyMessage) {
    return NextResponse.json({ error: "Reply message is required." }, { status: 400 });
  }

  const { id } = await params;
  const messages = await getContactMessages();
  const existingMessage = messages.find((message) => message.id === id);

  if (!existingMessage) {
    return NextResponse.json({ error: "Contact message not found." }, { status: 404 });
  }

  const emailResult = await sendAppEmail({
    to: existingMessage.email,
    subject: `Reply from G&V Support Services`,
    text: `${replyMessage}\n\nBest regards,\n${viewer.fullName}\nG&V Support Services Limited`,
  });

  const updatedMessage = await addContactReply(id, {
    id: randomUUID(),
    adminEmail: viewer.email,
    adminName: viewer.fullName,
    message: replyMessage,
    sentAt: new Date().toISOString(),
    deliveryMethod: emailResult.deliveryMethod,
  });

  return NextResponse.json({
    message: "Reply saved successfully.",
    contactMessage: updatedMessage,
    deliveryMethod: emailResult.deliveryMethod,
  });
}
