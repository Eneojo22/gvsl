import { NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminViewerBySessionToken } from "@/app/lib/admin-auth";
import {
  createHomeListing,
  getHomeListings,
  parseHomeFormData,
  saveHomeGalleryImages,
  saveHomeImage,
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

  const homes = await getHomeListings();
  return NextResponse.json({ homes });
}

export async function POST(request: NextRequest) {
  const viewer = await requireAdmin(request);

  if (!viewer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const parsed = parseHomeFormData(formData);

    if (!parsed.title || !parsed.type || !parsed.description || !parsed.location) {
      return NextResponse.json(
        { error: "Title, type, description, and location are required." },
        { status: 400 }
      );
    }

    let image: string | null = null;

    if (parsed.imageFile) {
      image = await saveHomeImage(parsed.imageFile);
    }

    const gallery = await saveHomeGalleryImages(parsed.galleryFiles);

    const home = await createHomeListing({
      title: parsed.title,
      type: parsed.type,
      description: parsed.description,
      price: parsed.price,
      location: parsed.location,
      features: parsed.features,
      image,
      gallery,
    });

    return NextResponse.json({ home }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to create listing.",
      },
      { status: 400 }
    );
  }
}
