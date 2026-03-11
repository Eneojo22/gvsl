import { NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminViewerBySessionToken } from "@/app/lib/admin-auth";
import {
  deleteHomeListing,
  getHomeListingById,
  parseHomeFormData,
  saveHomeImage,
  updateHomeListing,
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
  const listingId = parseId(id);
  const existingListing = await getHomeListingById(listingId);

  if (!existingListing) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  try {
    const formData = await request.formData();
    const parsed = parseHomeFormData(formData);
    let nextImage = existingListing.image;

    if (parsed.imageFile instanceof File && parsed.imageFile.size > 0) {
      nextImage = await saveHomeImage(parsed.imageFile);
      await deletePublicUpload(existingListing.image);
    }

    const home = await updateHomeListing(listingId, {
      title: parsed.title || existingListing.title,
      type: parsed.type || existingListing.type,
      description: parsed.description || existingListing.description,
      price: parsed.price || existingListing.price,
      location: parsed.location || existingListing.location,
      image: nextImage,
      features: {
        bedrooms: parsed.features.bedrooms || existingListing.features.bedrooms,
        bathrooms: parsed.features.bathrooms || existingListing.features.bathrooms,
        toilets: parsed.features.toilets || existingListing.features.toilets,
        parkingSpaces:
          parsed.features.parkingSpaces || existingListing.features.parkingSpaces,
      },
    });

    return NextResponse.json({ home });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to update listing.",
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
  const deleted = await deleteHomeListing(parseId(id));

  if (!deleted) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
