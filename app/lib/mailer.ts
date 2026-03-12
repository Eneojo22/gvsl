import "server-only";

import { existsSync, readFileSync } from "fs";
import nodemailer from "nodemailer";
import path from "path";

type MailPayload = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
};

type EnvMap = Record<string, string>;

let backendEnvCache: EnvMap | null = null;

function parseEnvFile(fileContents: string) {
  return fileContents.split(/\r?\n/).reduce<EnvMap>((envMap, line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return envMap;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return envMap;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    let value = trimmedLine.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key) {
      envMap[key] = value;
    }

    return envMap;
  }, {});
}

function getBackendEnv() {
  if (backendEnvCache) {
    return backendEnvCache;
  }

  const backendEnvPath = path.join(process.cwd(), "..", "gvssbackend", "gvssbackend", ".env");

  if (!existsSync(backendEnvPath)) {
    backendEnvCache = {};
    return backendEnvCache;
  }

  backendEnvCache = parseEnvFile(readFileSync(backendEnvPath, "utf-8"));
  return backendEnvCache;
}

function getMailConfig() {
  const backendEnv = getBackendEnv();
  const host = process.env.SMTP_HOST ?? process.env.EMAIL_HOST ?? backendEnv.EMAIL_HOST;
  const user =
    process.env.SMTP_USER ?? process.env.EMAIL_HOST_USER ?? backendEnv.EMAIL_HOST_USER;
  const pass =
    process.env.SMTP_PASS ?? process.env.EMAIL_HOST_PASSWORD ?? backendEnv.EMAIL_HOST_PASSWORD;
  const from =
    process.env.SMTP_FROM ??
    process.env.DEFAULT_FROM_EMAIL ??
    backendEnv.DEFAULT_FROM_EMAIL ??
    user;
  const port = Number.parseInt(
    process.env.SMTP_PORT ?? process.env.EMAIL_PORT ?? backendEnv.EMAIL_PORT ?? "587",
    10
  );
  const secure = (
    process.env.SMTP_SECURE ??
    process.env.EMAIL_USE_SSL ??
    backendEnv.EMAIL_USE_SSL ??
    "false"
  ).toLowerCase() === "true";

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
  };
}

export function isSmtpConfigured() {
  const config = getMailConfig();
  return Boolean(config.host && config.user && config.pass);
}

export async function sendAppEmail(payload: MailPayload) {
  const config = getMailConfig();

  if (!isSmtpConfigured()) {
    return {
      deliveryMethod: "preview" as const,
    };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });

  return {
    deliveryMethod: "smtp" as const,
  };
}
