import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import type { GalleryItem } from "./db";

export interface UploadResult {
  url: string;
  provider: "cloudinary" | "local";
  publicId?: string;
  resourceType?: "image" | "video";
}

export interface UploadMetadata {
  title?: string;
  cat?: string;
  who?: string;
  caption?: string;
  z?: string;
}

export async function uploadMedia(
  file: File,
  meta?: UploadMetadata
): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Use Cloudinary if credentials are provided
  if (cloudName && apiKey && apiSecret) {
    try {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });

      const isVideo = file.type.startsWith("video/");
      const base64Data = `data:${file.type || (isVideo ? "video/mp4" : "image/jpeg")};base64,${buffer.toString("base64")}`;

      const uploadOptions: Record<string, any> = {
        folder: "shutterscape",
        resource_type: isVideo ? "video" : "image",
      };

      if (meta) {
        const parts: string[] = [];
        if (meta.title) parts.push(`title=${meta.title.replace(/[|=]/g, " ")}`);
        if (meta.cat) parts.push(`cat=${meta.cat.replace(/[|=]/g, " ")}`);
        if (meta.who) parts.push(`who=${meta.who.replace(/[|=]/g, " ")}`);
        if (meta.caption) parts.push(`caption=${meta.caption.replace(/[|=]/g, " ")}`);
        if (meta.z) parts.push(`z=${meta.z.replace(/[|=]/g, " ")}`);
        if (parts.length) {
          uploadOptions.context = parts.join("|");
        }
        if (meta.cat) {
          uploadOptions.tags = ["shutterscape", meta.cat];
        } else {
          uploadOptions.tags = ["shutterscape"];
        }
      } else {
        uploadOptions.tags = ["shutterscape"];
      }

      const uploaded = await cloudinary.uploader.upload(base64Data, uploadOptions);

      return {
        url: uploaded.secure_url,
        provider: "cloudinary",
        publicId: uploaded.public_id,
        resourceType: isVideo ? "video" : "image",
      };
    } catch (cErr) {
      console.warn("Cloudinary upload failed, falling back to base64/local:", cErr);
    }
  }

  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  const mimeType = file.type || (file.name.endsWith(".mp4") ? "video/mp4" : "image/jpeg");
  const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;

  // In serverless environments (Vercel) without Cloudinary credentials, return base64 data URI
  // because the filesystem (/var/task) is read-only and static uploads cannot be served dynamically.
  if (isServerless) {
    return {
      url: dataUri,
      provider: "local",
      resourceType: file.type.startsWith("video/") ? "video" : "image",
    };
  }

  // Automatic local file storage fallback in public/uploads (local development)
  try {
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
      resourceType: file.type.startsWith("video/") ? "video" : "image",
    };
  } catch (err) {
    console.warn("Local uploads folder write failed, falling back to data URI:", err);
    return {
      url: dataUri,
      provider: "local",
      resourceType: file.type.startsWith("video/") ? "video" : "image",
    };
  }
}

function mapCloudinaryResource(r: any, i: number): GalleryItem {
  const custom = r.context?.custom || {};
  const isVideo = r.resource_type === "video";
  const rawBase = (r.public_id || "")
    .replace(/^shutterscape\//, "")
    .replace(/^\d+[-_]?/, "")
    .replace(/[-_]/g, " ")
    .trim();
  const formattedTitle =
    rawBase && rawBase !== "frame"
      ? rawBase.charAt(0).toUpperCase() + rawBase.slice(1)
      : `Frame ${i + 1}`;

  return {
    id: `cld-${(r.asset_id || r.public_id || String(Date.now())).replace(/[^a-zA-Z0-9_-]/g, "-")}`,
    title: custom.title || formattedTitle,
    cat: custom.cat || (Array.isArray(r.tags) && r.tags.find((t: string) => t !== "shutterscape") ? r.tags.find((t: string) => t !== "shutterscape") : "Street"),
    z: custom.z || "",
    seed: (i % 18) + 3,
    src: isVideo ? null : r.secure_url || r.url,
    video: isVideo ? r.secure_url || r.url : null,
    who: custom.who || "Photographer name",
    caption: custom.caption || "",
    r: Number((((i * 37) % 7 - 3) * 0.8).toFixed(2)),
    createdAt: r.created_at || new Date().toISOString(),
  };
}

export async function fetchCloudinaryGalleryItems(): Promise<GalleryItem[]> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return [];
  }

  try {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    // 1. Try search API first
    try {
      const searchResult = await cloudinary.search
        .expression("folder:shutterscape OR tags:shutterscape")
        .sort_by("created_at", "desc")
        .max_results(100)
        .with_field("context")
        .with_field("tags")
        .execute();

      if (
        searchResult &&
        Array.isArray(searchResult.resources) &&
        searchResult.resources.length > 0
      ) {
        return searchResult.resources.map((r: any, i: number) =>
          mapCloudinaryResource(r, i)
        );
      }
    } catch (sErr) {
      console.warn("Cloudinary search failed, falling back to api.resources:", sErr);
    }

    // 2. Fallback to api.resources (images + videos)
    const imgPromise = cloudinary.api
      .resources({
        type: "upload",
        prefix: "shutterscape",
        max_results: 100,
        context: true,
        tags: true,
      })
      .catch(() => ({ resources: [] }));

    const vidPromise = cloudinary.api
      .resources({
        resource_type: "video",
        type: "upload",
        prefix: "shutterscape",
        max_results: 30,
        context: true,
        tags: true,
      })
      .catch(() => ({ resources: [] }));

    const [imgRes, vidRes] = await Promise.all([imgPromise, vidPromise]);
    const merged = [...(imgRes.resources || []), ...(vidRes.resources || [])];
    return merged.map((r: any, i: number) => mapCloudinaryResource(r, i));
  } catch (err) {
    console.warn("fetchCloudinaryGalleryItems error:", err);
    return [];
  }
}

export async function deleteCloudinaryAsset(publicIdOrUrl: string): Promise<boolean> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return false;
  }

  try {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    let publicId = publicIdOrUrl;
    if (publicIdOrUrl.includes("cloudinary.com")) {
      const match = publicIdOrUrl.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
      if (match && match[1]) {
        publicId = match[1];
      }
    } else if (publicId.startsWith("cld-")) {
      publicId = publicId.replace(/^cld-/, "").replace(/-/g, "/");
    }

    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (err) {
    console.warn("deleteCloudinaryAsset failed:", err);
    return false;
  }
}
