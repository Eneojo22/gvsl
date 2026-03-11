import { NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminViewerBySessionToken } from "@/app/lib/admin-auth";
import {
  deleteFurnitureItem,
  getFurnitureItemById,
  parseFurnitureFormData,
  saveFurnitureImage,
  updateFurnitureItem,
} from "@/app/lib/cms-store";
import { deletePublicUpload } from "@/app/lib/local-store";

export const runtime = "nodejs";

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return getAdminViewerBySessionToken(token);
}

function parseId(id: string) {
  return Number.parseInt(id, 10);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const viewer = await requireAdmin(request);

  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const itemId = parseId(id);
  const existingItem = await getFurnitureItemById(itemId);

  if (!existingItem) {
    return NextResponse.json({ error: "Furniture item not found." }, { status: 404 });
  }

  try {
    const formData = await request.formData();
    const parsed = parseFurnitureFormData(formData);
    let nextImage = existingItem.image;

    if (parsed.imageFile instanceof File && parsed.imageFile.size > 0) {
      nextImage = await saveFurnitureImage(parsed.imageFile);
      await deletePublicUpload(existingItem.image);
    }

    const item = await updateFurnitureItem(itemId, {
      name: parsed.name || existingItem.name,
      category: parsed.category || existingItem.category,
      description: parsed.description || existingItem.description,
      price: parsed.price || existingItem.price,
      image: nextImage,
    });

    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to update furniture item.",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const viewer = await requireAdmin(request);

  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteFurnitureItem(parseId(id));

  if (!deleted) {
    return NextResponse.json({ error: "Furniture item not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
