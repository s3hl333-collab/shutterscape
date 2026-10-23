import { NextResponse } from "next/server";
import { db, ContactSignal } from "@/lib/db";
import { getAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const items = await db.getMessages();
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/contact error:", err);
    return NextResponse.json({ error: "Failed to fetch messages." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, interest, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const msg: ContactSignal = {
      id: `sig-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      interest: String(interest || "Street").trim(),
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
    };

    const saved = await db.addMessage(msg);
    return NextResponse.json({ ok: true, item: saved });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json({ error: "Failed to send signal." }, { status: 500 });
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
      return NextResponse.json({ error: "Message id is required." }, { status: 400 });
    }

    const deleted = await db.deleteMessage(id);
    return NextResponse.json({ ok: deleted });
  } catch (err) {
    console.error("DELETE /api/contact error:", err);
    return NextResponse.json({ error: "Failed to delete message." }, { status: 500 });
  }
}
