import { NextResponse } from "next/server";
import { db, GalleryItem } from "@/lib/db";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const items = await db.getGallery();
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/gallery error:", err);
    return NextResponse.json({ error: "Failed to fetch gallery." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, cat, z, src, video, who, caption } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const seed = Math.floor(Math.random() * 90) + 10;
    const r = Number((((seed * 37) % 7 - 3) * 0.8).toFixed(2));

    const newItem: GalleryItem = {
      id: `photo-${Date.now()}`,
      title: String(title).trim(),
      cat: String(cat || "Street").trim(),
      z: String(z ?? ""),
      seed,
      src: src ? String(src) : null,
      video: video ? String(video) : null,
      who: String(who || "Photographer name").trim(),
      caption: caption ? String(caption).trim() : "",
      r,
      createdAt: new Date().toISOString(),
    };

    const created = await db.addGalleryItem(newItem);
    return NextResponse.json({ ok: true, item: created });
  } catch (err) {
    console.error("POST /api/gallery error:", err);
    return NextResponse.json({ error: "Failed to add gallery item." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, cat, z, src, video, who, caption } = body;

    if (!id) {
      return NextResponse.json({ error: "Item id is required." }, { status: 400 });
    }

    const updates: Partial<GalleryItem> = {};
    if (title !== undefined) updates.title = String(title).trim();
    if (cat !== undefined) updates.cat = String(cat).trim();
    if (z !== undefined) updates.z = String(z);
    if (src !== undefined) updates.src = src ? String(src) : null;
    if (video !== undefined) updates.video = video ? String(video) : null;
    if (who !== undefined) updates.who = String(who).trim();
    if (caption !== undefined) updates.caption = String(caption).trim();

    const updated = await db.updateGalleryItem(String(id), updates);
    if (!updated) {
      return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, item: updated });
  } catch (err) {
    console.error("PUT /api/gallery error:", err);
    return NextResponse.json({ error: "Failed to update gallery item." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin login required." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Item id is required." }, { status: 400 });
    }

    const deleted = await db.deleteGalleryItem(id);
    return NextResponse.json({ ok: deleted });
  } catch (err) {
    console.error("DELETE /api/gallery error:", err);
    return NextResponse.json({ error: "Failed to delete gallery item." }, { status: 500 });
  }
}
