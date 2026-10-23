import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { COOKIE_NAME, signAdminToken, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Username/email and password are required." },
        { status: 400 }
      );
    }

    const admin = await db.findAdmin(String(identifier));
    if (!admin || !verifyPassword(String(password), admin.passwordHash)) {
      return NextResponse.json(
        { error: "Invalid admin credentials." },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      id: admin.id,
      username: admin.username,
      email: admin.email,
    });

    const res = NextResponse.json({
      ok: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error during login." }, { status: 500 });
  }
}
