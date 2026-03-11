import { NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminViewerBySessionToken } from "@/app/lib/admin-auth";
import {
  createFurnitureItem,
  getFurnitureItems,
  parseFurnitureFormData,
  saveFurnitureImage,
} from "@/app/lib/cms-store";

export const runtime = "nodejs";

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return getAdminViewerBySessionToken(token);
}

export async function GET(request: NextRequest) {
  const viewer = await requireAdmin(request);

  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const furniture = await getFurnitureItems();
  return NextResponse.json({ furniture });
}

export async function POST(request: NextRequest) {
  const viewer = await requireAdmin(request);

  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const parsed = parseFurnitureFormData(formData);

    if (!parsed.name || !parsed.category || !parsed.description) {
      return NextResponse.json(
        { error: "Name, category, and description are required." },
        { status: 400 }
      );
    }

    let image: string | null = null;

    if (parsed.imageFile instanceof File && parsed.imageFile.size > 0) {
      image = await saveFurnitureImage(parsed.imageFile);
    }

    const item = await createFurnitureItem({
      name: parsed.name,
      category: parsed.category,
      description: parsed.description,
      price: parsed.price,
      image,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to create furniture item.",
      },
      { status: 400 }
    );
  }
}
