import { NextResponse } from "next/server";
import { db, ActivityItem } from "@/lib/db";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const items = await db.getActivities();
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/activities error:", err);
    return NextResponse.json({ error: "Failed to fetch activities." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { channel, title, date, description, image, upcoming } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const newItem: ActivityItem = {
      id: `act-${Date.now()}`,
      channel: Number(channel ?? 0),
      title: String(title).trim(),
      date: String(date || "Date to be announced").trim(),
      description: String(description || date || "").trim(),
      image: image ? String(image) : null,
      upcoming: Boolean(upcoming),
      createdAt: new Date().toISOString(),
    };

    const created = await db.addActivity(newItem);
    return NextResponse.json({ ok: true, item: created });
  } catch (err) {
    console.error("POST /api/activities error:", err);
    return NextResponse.json({ error: "Failed to add activity." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { id, channel, title, date, description, image, upcoming } = body;

    if (!id) {
      return NextResponse.json({ error: "Activity id is required." }, { status: 400 });
    }

    const updates: Partial<ActivityItem> = {};
    if (channel !== undefined) updates.channel = Number(channel);
    if (title !== undefined) updates.title = String(title).trim();
    if (date !== undefined) updates.date = String(date).trim();
    if (description !== undefined) updates.description = String(description).trim();
    if (image !== undefined) updates.image = image ? String(image) : null;
    if (upcoming !== undefined) updates.upcoming = Boolean(upcoming);

    const updated = await db.updateActivity(String(id), updates);
    if (!updated) {
      return NextResponse.json({ error: "Activity not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, item: updated });
  } catch (err) {
    console.error("PUT /api/activities error:", err);
    return NextResponse.json({ error: "Failed to update activity." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Activity id is required." }, { status: 400 });
    }

    const deleted = await db.deleteActivity(id);
    return NextResponse.json({ ok: deleted });
  } catch (err) {
    console.error("DELETE /api/activities error:", err);
    return NextResponse.json({ error: "Failed to delete activity." }, { status: 500 });
  }
}
