import { NextResponse } from "next/server";
import { db, MemberItem } from "@/lib/db";
import { getAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await db.getMembers();
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/members error:", err);
    return NextResponse.json({ error: "Failed to fetch members." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { name, role, group, art, bg, w, r, src } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const grp = group === "leads" ? "leads" : "studs";
    const defaultW = grp === "leads" ? 240 : 150;
    const defaultR = ((Math.floor(Math.random() * 7) - 3) || 2);

    const newItem: MemberItem = {
      id: `mem-${Date.now()}`,
      name: String(name).trim(),
      role: String(role || (grp === "leads" ? "Club lead" : "Student")).trim(),
      group: grp,
      art: String(art || "camera"),
      bg: String(bg || "#e0a526"),
      w: Number(w || defaultW),
      r: Number(r ?? defaultR),
      small: grp === "studs",
      src: src ? String(src) : null,
      createdAt: new Date().toISOString(),
    };

    const created = await db.addMember(newItem);
    return NextResponse.json({ ok: true, item: created });
  } catch (err) {
    console.error("POST /api/members error:", err);
    return NextResponse.json({ error: "Failed to add member." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, role, group, art, bg, w, r, src } = body;

    if (!id) {
      return NextResponse.json({ error: "Member id is required." }, { status: 400 });
    }

    const updates: Partial<MemberItem> = {};
    if (name !== undefined) updates.name = String(name).trim();
    if (role !== undefined) updates.role = String(role).trim();
    if (group !== undefined) {
      updates.group = group === "leads" ? "leads" : "studs";
      updates.small = updates.group === "studs";
    }
    if (art !== undefined) updates.art = String(art);
    if (bg !== undefined) updates.bg = String(bg);
    if (w !== undefined) updates.w = Number(w);
    if (r !== undefined) updates.r = Number(r);
    if (src !== undefined) updates.src = src ? String(src) : null;

    const updated = await db.updateMember(String(id), updates);
    if (!updated) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, item: updated });
  } catch (err) {
    console.error("PUT /api/members error:", err);
    return NextResponse.json({ error: "Failed to update member." }, { status: 500 });
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
      return NextResponse.json({ error: "Member id is required." }, { status: 400 });
    }

    const deleted = await db.deleteMember(id);
    return NextResponse.json({ ok: deleted });
  } catch (err) {
    console.error("DELETE /api/members error:", err);
    return NextResponse.json({ error: "Failed to delete member." }, { status: 500 });
  }
}
