import crypto from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "shutterscape-gcu-secret-key-2026-codenix";
export const COOKIE_NAME = "shutterscape_admin_session";

export function hashPassword(password: string, salt?: string): string {
  const s = salt || crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, s, 64).toString("hex");
  return `${s}:${derived}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  const derived = crypto.scryptSync(password, salt, 64);
  const keyBuf = Buffer.from(key, "hex");
  if (derived.length !== keyBuf.length) return false;
  return crypto.timingSafeEqual(derived, keyBuf);
}

export interface AdminTokenPayload {
  id: string;
  username: string;
  email: string;
  exp: number;
}

export function signAdminToken(payload: Omit<AdminTokenPayload, "exp">): string {
  const fullPayload: AdminTokenPayload = {
    ...payload,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };
  const data = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const expectedSig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
    if (sig !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as AdminTokenPayload;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdmin(): Promise<AdminTokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}
