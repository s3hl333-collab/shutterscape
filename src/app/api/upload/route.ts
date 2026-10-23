import { NextResponse } from "next/server";
import { uploadMedia } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const result = await uploadMedia(file);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to upload file." },
      { status: 500 }
    );
  }
}
