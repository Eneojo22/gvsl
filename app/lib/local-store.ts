import "server-only";

import { randomUUID } from "crypto";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const UPLOADS_DIR = path.join(PUBLIC_DIR, "uploads");

export async function ensureJsonFile<T>(fileName: string, fallback: T) {
  await mkdir(DATA_DIR, { recursive: true });

  const filePath = path.join(DATA_DIR, fileName);

  try {
    await readFile(filePath, "utf-8");
  } catch {
    await writeFile(filePath, JSON.stringify(fallback, null, 2), "utf-8");
  }

  return filePath;
}

export async function readJsonFile<T>(fileName: string, fallback: T): Promise<T> {
  const filePath = await ensureJsonFile(fileName, fallback);

  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await writeJsonFile(fileName, fallback);
    return fallback;
  }
}

export async function writeJsonFile<T>(fileName: string, data: T) {
  const filePath = await ensureJsonFile(fileName, data);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function getSafeExtension(fileName: string) {
  const extension = path.extname(fileName || "").toLowerCase();
  return extension || ".bin";
}

export async function saveUploadFile(file: File, folder: "homes" | "furniture") {
  const folderPath = path.join(UPLOADS_DIR, folder);
  await mkdir(folderPath, { recursive: true });

  const safeName = `${folder}-${Date.now()}-${randomUUID()}${getSafeExtension(file.name)}`;
  const outputPath = path.join(folderPath, safeName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(outputPath, buffer);

  return `/uploads/${folder}/${safeName}`;
}

export async function deletePublicUpload(publicPath?: string | null) {
  if (!publicPath || !publicPath.startsWith("/uploads/")) {
    return;
  }

  const relativePath = publicPath.replace(/^\/+/, "");
  const absolutePath = path.join(PUBLIC_DIR, relativePath);
  const uploadsRoot = path.join(PUBLIC_DIR, "uploads");

  if (!absolutePath.startsWith(uploadsRoot)) {
    return;
  }

  try {
    await unlink(absolutePath);
  } catch {
    // Ignore missing files so deletes stay idempotent.
  }
}
