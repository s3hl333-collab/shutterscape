import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

export interface UploadResult {
  url: string;
  provider: "cloudinary" | "local";
  publicId?: string;
}

export async function uploadMedia(file: File): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Use Cloudinary if credentials are provided
  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    const isVideo = file.type.startsWith("video/");
    const base64Data = `data:${file.type || "image/jpeg"};base64,${buffer.toString("base64")}`;

    const uploaded = await cloudinary.uploader.upload(base64Data, {
      folder: "shutterscape",
      resource_type: isVideo ? "video" : "image",
    });

    return {
      url: uploaded.secure_url,
      provider: "cloudinary",
      publicId: uploaded.public_id,
    };
  }

  // Automatic local file storage fallback in public/uploads
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const ext = path.extname(file.name) || (file.type.startsWith("video/") ? ".mp4" : ".jpg");
  const safeBase = path
    .basename(file.name, ext)
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .slice(0, 40);
  const filename = `${Date.now()}-${safeBase || "frame"}${ext}`;
  const filePath = path.join(uploadsDir, filename);

  fs.writeFileSync(filePath, buffer);

  return {
    url: `/uploads/${filename}`,
    provider: "local",
  };
}
