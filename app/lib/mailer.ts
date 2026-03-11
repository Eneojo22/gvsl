import "server-only";

import nodemailer from "nodemailer";

type MailPayload = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
};

export function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendAppEmail(payload: MailPayload) {
  if (!isSmtpConfigured()) {
    return {
      deliveryMethod: "preview" as const,
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT ?? "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });

  return {
    deliveryMethod: "smtp" as const,
  };
}
