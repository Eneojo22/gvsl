import "server-only";

import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";

import type {
  AdminSessionRecord,
  AdminUserRecord,
  AdminViewer,
  SignupVerificationRecord,
} from "./cms-types";
import { sendAppEmail } from "./mailer";
import { readJsonFile, writeJsonFile } from "./local-store";

const ADMIN_USERS_FILE = "admin-users.json";
const ADMIN_SESSIONS_FILE = "admin-sessions.json";
const SIGNUP_CODES_FILE = "admin-signup-codes.json";

export const ADMIN_SESSION_COOKIE = "gvss_admin_session";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function ensureOfficialEmail(email: string) {
  return /^[^\s@]+@gvss\.ng$/i.test(email.trim());
}

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

function verifyPassword(password: string, hash: string, salt: string) {
  const comparisonHash = scryptSync(password, salt, 64);
  const storedHash = Buffer.from(hash, "hex");

  if (comparisonHash.length !== storedHash.length) {
    return false;
  }

  return timingSafeEqual(comparisonHash, storedHash);
}

function generateVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function toViewer(record: AdminUserRecord): AdminViewer {
  return {
    id: record.id,
    fullName: record.fullName,
    email: record.email,
    createdAt: record.createdAt,
    verifiedAt: record.verifiedAt,
  };
}

async function getAdminUsers() {
  return readJsonFile<AdminUserRecord[]>(ADMIN_USERS_FILE, []);
}

async function saveAdminUsers(users: AdminUserRecord[]) {
  await writeJsonFile(ADMIN_USERS_FILE, users);
}

async function getSignupCodes() {
  const codes = await readJsonFile<SignupVerificationRecord[]>(SIGNUP_CODES_FILE, []);
  const now = new Date().toISOString();
  const activeCodes = codes.filter((item) => item.expiresAt > now);

  if (activeCodes.length !== codes.length) {
    await writeJsonFile(SIGNUP_CODES_FILE, activeCodes);
  }

  return activeCodes;
}

async function saveSignupCodes(codes: SignupVerificationRecord[]) {
  await writeJsonFile(SIGNUP_CODES_FILE, codes);
}

async function getAdminSessions() {
  const sessions = await readJsonFile<AdminSessionRecord[]>(ADMIN_SESSIONS_FILE, []);
  const now = new Date().toISOString();
  const activeSessions = sessions.filter((item) => item.expiresAt > now);

  if (activeSessions.length !== sessions.length) {
    await writeJsonFile(ADMIN_SESSIONS_FILE, activeSessions);
  }

  return activeSessions;
}

async function saveAdminSessions(sessions: AdminSessionRecord[]) {
  await writeJsonFile(ADMIN_SESSIONS_FILE, sessions);
}

function validateSignupInput(input: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  if (!input.fullName.trim()) {
    throw new Error("Full name is required.");
  }

  if (!ensureOfficialEmail(input.email)) {
    throw new Error("Only official @gvss.ng email addresses can create admin accounts.");
  }

  if (input.password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  if (input.password !== input.confirmPassword) {
    throw new Error("Passwords do not match.");
  }
}

export async function requestSignupCode(input: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  validateSignupInput(input);

  const normalizedEmail = normalizeEmail(input.email);
  const existingUsers = await getAdminUsers();

  if (existingUsers.some((user) => user.email === normalizedEmail)) {
    throw new Error("An admin account with this email already exists.");
  }

  const passwordRecord = hashPassword(input.password);
  const verificationCode = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const existingCodes = await getSignupCodes();
  const remainingCodes = existingCodes.filter((item) => item.email !== normalizedEmail);

  remainingCodes.push({
    email: normalizedEmail,
    fullName: input.fullName.trim(),
    passwordHash: passwordRecord.hash,
    passwordSalt: passwordRecord.salt,
    code: verificationCode,
    expiresAt,
    requestedAt: new Date().toISOString(),
  });

  await saveSignupCodes(remainingCodes);

  const emailResult = await sendAppEmail({
    to: normalizedEmail,
    subject: "GVSS admin verification code",
    text: `Your verification code is ${verificationCode}. It expires in 10 minutes.`,
  });

  return {
    email: normalizedEmail,
    expiresAt,
    deliveryMethod: emailResult.deliveryMethod,
    previewCode: emailResult.deliveryMethod === "preview" ? verificationCode : undefined,
  };
}

async function createSessionForUser(userId: string) {
  const sessions = await getAdminSessions();
  const now = Date.now();
  const expiresAt = new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();
  const nextSession: AdminSessionRecord = {
    token: randomUUID(),
    userId,
    createdAt: new Date(now).toISOString(),
    expiresAt,
  };

  sessions.push(nextSession);
  await saveAdminSessions(sessions);

  return nextSession;
}

export async function verifySignupCode(input: { email: string; code: string }) {
  const normalizedEmail = normalizeEmail(input.email);
  const signupCodes = await getSignupCodes();
  const verification = signupCodes.find(
    (item) => item.email === normalizedEmail && item.code === input.code.trim()
  );

  if (!verification) {
    throw new Error("The verification code is invalid or has expired.");
  }

  const users = await getAdminUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("This admin account already exists.");
  }

  const newUser: AdminUserRecord = {
    id: randomUUID(),
    fullName: verification.fullName,
    email: normalizedEmail,
    passwordHash: verification.passwordHash,
    passwordSalt: verification.passwordSalt,
    createdAt: new Date().toISOString(),
    verifiedAt: new Date().toISOString(),
  };

  users.push(newUser);
  await saveAdminUsers(users);
  await saveSignupCodes(signupCodes.filter((item) => item.email !== normalizedEmail));

  const session = await createSessionForUser(newUser.id);

  return {
    viewer: toViewer(newUser),
    session,
  };
}

export async function loginAdmin(input: { email: string; password: string }) {
  const normalizedEmail = normalizeEmail(input.email);
  const users = await getAdminUsers();
  const user = users.find((item) => item.email === normalizedEmail);

  if (!user || !verifyPassword(input.password, user.passwordHash, user.passwordSalt)) {
    throw new Error("Invalid email or password.");
  }

  const session = await createSessionForUser(user.id);

  return {
    viewer: toViewer(user),
    session,
  };
}

export async function getAdminViewerBySessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const sessions = await getAdminSessions();
  const activeSession = sessions.find((session) => session.token === token);

  if (!activeSession) {
    return null;
  }

  const users = await getAdminUsers();
  const user = users.find((item) => item.id === activeSession.userId);

  return user ? toViewer(user) : null;
}

export async function revokeSession(token?: string | null) {
  if (!token) {
    return;
  }

  const sessions = await getAdminSessions();
  await saveAdminSessions(sessions.filter((session) => session.token !== token));
}

export async function getAdminEmailRecipients() {
  const users = await getAdminUsers();
  return users.map((user) => user.email);
}
