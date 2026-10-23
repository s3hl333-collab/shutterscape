import fs from "fs";
import path from "path";
import os from "os";
import { MongoClient, Db } from "mongodb";
import { hashPassword } from "./auth";

export interface GalleryItem {
  id: string;
  title: string;
  cat: string;
  z: string; // "", "w2", "h2", "w2 h2", "w3"
  seed: number;
  src: string | null;
  video?: string | null;
  who: string;
  caption?: string;
  r: number;
  createdAt: string;
}

export interface MemberItem {
  id: string;
  name: string;
  role: string;
  group: "leads" | "studs";
  art: string; // "eye" | "alien" | "bust" | "invader" | "camera" | "eagle" | "flower" | "invader2" | "cloud"
  bg: string;
  w: number;
  r: number;
  small: boolean;
  src?: string | null; // Optional uploaded portrait photo
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  channel: number; // 0 = CH 1. Events, 1 = CH 2. Notices, 2 = CH 3. Frame of the week
  title: string;
  date: string;
  description: string; // Supports rich text HTML (bold, italics, links, etc.)
  image?: string | null;
  upcoming?: boolean;
  createdAt: string;
}

export interface ContactSignal {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
}

export interface DatabaseSchema {
  admins: AdminUser[];
  gallery: GalleryItem[];
  members: MemberItem[];
  activities: ActivityItem[];
  messages: ContactSignal[];
}

// Exact default data from the provided HTML page
const RAW_PHOTOS: [string, string, string][] = [
  ["Untitled 01", "Street", "w2 h2"],
  ["Untitled 02", "Portrait", ""],
  ["Untitled 03", "Nature", "h2"],
  ["Untitled 04", "Monochrome", "w2"],
  ["Untitled 05", "Campus", ""],
  ["Untitled 06", "Experimental", "w3"],
  ["Untitled 07", "Street", "h2"],
  ["Untitled 08", "Nature", ""],
  ["Untitled 09", "Portrait", "w2"],
  ["Untitled 10", "Campus", "h2"],
  ["Untitled 11", "Experimental", ""],
  ["Untitled 12", "Monochrome", "w2"],
  ["Untitled 13", "Street", "h2"],
  ["Untitled 14", "Abstract", "w2"],
  ["Untitled 15", "Nature", ""],
  ["Untitled 16", "Portrait", "h2"],
  ["Untitled 17", "Campus", "w2"],
  ["Untitled 18", "Experimental", "w2 h2"],
];

export const DEFAULT_GALLERY: GalleryItem[] = RAW_PHOTOS.map(([t, c, z], i) => ({
  id: `photo-${i + 1}`,
  title: t,
  cat: c,
  z,
  seed: i + 3,
  src: null,
  video: null,
  who: "Photographer name",
  caption: "",
  r: Number((((i * 37) % 7 - 3) * 0.8).toFixed(2)),
  createdAt: new Date(Date.now() - (18 - i) * 60000).toISOString(),
}));

export const DEFAULT_MEMBERS: MemberItem[] = [
  // The leads (exact from HTML)
  {
    id: "lead-1",
    name: "Name Surname",
    role: "Club lead (placeholder)",
    group: "leads",
    art: "eye",
    bg: "#e0a526",
    w: 250,
    r: -2,
    small: false,
    src: null,
    createdAt: "2026-01-01T00:01:00.000Z",
  },
  {
    id: "lead-2",
    name: "Name Surname",
    role: "Co-lead (placeholder)",
    group: "leads",
    art: "alien",
    bg: "#1f6f6a",
    w: 210,
    r: 2,
    small: false,
    src: null,
    createdAt: "2026-01-01T00:02:00.000Z",
  },
  {
    id: "lead-3",
    name: "Name Surname",
    role: "Creative lead (placeholder)",
    group: "leads",
    art: "bust",
    bg: "#d9482b",
    w: 280,
    r: -1,
    small: false,
    src: null,
    createdAt: "2026-01-01T00:03:00.000Z",
  },
  // The students (exact from HTML)
  {
    id: "stud-1",
    name: "Name Surname",
    role: "Student",
    group: "studs",
    art: "invader",
    bg: "#8fae8b",
    w: 130,
    r: 3,
    small: true,
    src: null,
    createdAt: "2026-01-01T00:04:00.000Z",
  },
  {
    id: "stud-2",
    name: "Name Surname",
    role: "Student",
    group: "studs",
    art: "camera",
    bg: "#e0a526",
    w: 170,
    r: -3,
    small: true,
    src: null,
    createdAt: "2026-01-01T00:05:00.000Z",
  },
  {
    id: "stud-3",
    name: "Name Surname",
    role: "Student",
    group: "studs",
    art: "eagle",
    bg: "#f3ecdc",
    w: 150,
    r: 2,
    small: true,
    src: null,
    createdAt: "2026-01-01T00:06:00.000Z",
  },
  {
    id: "stud-4",
    name: "Name Surname",
    role: "Student",
    group: "studs",
    art: "flower",
    bg: "#d9482b",
    w: 120,
    r: -2,
    small: true,
    src: null,
    createdAt: "2026-01-01T00:07:00.000Z",
  },
  {
    id: "stud-5",
    name: "Name Surname",
    role: "Student",
    group: "studs",
    art: "invader2",
    bg: "#fbf8f0",
    w: 160,
    r: 4,
    small: true,
    src: null,
    createdAt: "2026-01-01T00:08:00.000Z",
  },
  {
    id: "stud-6",
    name: "Name Surname",
    role: "Student",
    group: "studs",
    art: "cloud",
    bg: "#1f6f6a",
    w: 140,
    r: -4,
    small: true,
    src: null,
    createdAt: "2026-01-01T00:09:00.000Z",
  },
];

export const DEFAULT_ACTIVITIES: ActivityItem[] = [
  // CH 1. Events
  {
    id: "act-1",
    channel: 0,
    title: "Photo walk",
    date: "Date to be announced",
    description: "Date to be announced",
    image: null,
    upcoming: true,
    createdAt: "2026-01-01T00:09:00.000Z",
  },
  {
    id: "act-2",
    channel: 0,
    title: "Workshop and critique",
    date: "Date to be announced",
    description: "Date to be announced",
    image: null,
    upcoming: true,
    createdAt: "2026-01-01T00:08:00.000Z",
  },
  {
    id: "act-3",
    channel: 0,
    title: "Themed photo challenge",
    date: "Date to be announced",
    description: "Date to be announced",
    image: null,
    upcoming: false,
    createdAt: "2026-01-01T00:07:00.000Z",
  },
  // CH 2. Notices
  {
    id: "act-4",
    channel: 1,
    title: "Membership",
    date: "Follow Instagram for updates",
    description: "Follow Instagram for updates",
    image: null,
    upcoming: false,
    createdAt: "2026-01-01T00:06:00.000Z",
  },
  {
    id: "act-5",
    channel: 1,
    title: "Notices appear here",
    date: "Edit via Admin Dashboard",
    description: "Edit the CH array in this page",
    image: null,
    upcoming: false,
    createdAt: "2026-01-01T00:05:00.000Z",
  },
  {
    id: "act-6",
    channel: 1,
    title: "Submit your frames",
    date: "Open for all students",
    description: "Contact the club leads",
    image: null,
    upcoming: false,
    createdAt: "2026-01-01T00:04:00.000Z",
  },
  // CH 3. Frame of the week
  {
    id: "act-7",
    channel: 2,
    title: "Coming soon",
    date: "Weekly picks",
    description: "Weekly picks will appear here",
    image: null,
    upcoming: false,
    createdAt: "2026-01-01T00:03:00.000Z",
  },
  {
    id: "act-8",
    channel: 2,
    title: "Sample pick",
    date: "Featured",
    description: "A frame from the Gallery",
    image: null,
    upcoming: false,
    createdAt: "2026-01-01T00:02:00.000Z",
  },
  {
    id: "act-9",
    channel: 2,
    title: "Updates",
    date: "@shutterscapegcu",
    description: "Follow Instagram for news",
    image: null,
    upcoming: false,
    createdAt: "2026-01-01T00:01:00.000Z",
  },
];

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shutterscape2026";
const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "shutterscape@gcuniversity.ac.in";

export const DEFAULT_ADMINS: AdminUser[] = [
  {
    id: "admin-1",
    username: DEFAULT_ADMIN_USERNAME,
    email: DEFAULT_ADMIN_EMAIL,
    passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD, "shutterscapesalt2026"),
    role: "core_admin",
  },
];

// MongoDB Connection Singleton
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getMongoDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (cachedDb) return cachedDb;
  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 4000,
    });
    await client.connect();
    cachedClient = client;
    cachedDb = client.db(process.env.MONGODB_DB || "shutterscape");

    // Ensure default data is seeded if empty (non-fatal)
    try {
      const adminCount = await cachedDb.collection("admins").countDocuments();
      if (adminCount === 0) {
        await cachedDb.collection("admins").insertMany(DEFAULT_ADMINS);
      }
      const galleryCount = await cachedDb.collection("gallery").countDocuments();
      if (galleryCount === 0) {
        await cachedDb.collection("gallery").insertMany(DEFAULT_GALLERY);
      }
      const membersCount = await cachedDb.collection("members").countDocuments();
      if (membersCount === 0) {
        await cachedDb.collection("members").insertMany(DEFAULT_MEMBERS);
      }
      const activitiesCount = await cachedDb.collection("activities").countDocuments();
      if (activitiesCount === 0) {
        await cachedDb.collection("activities").insertMany(DEFAULT_ACTIVITIES);
      }
    } catch (seedErr) {
      console.warn("MongoDB initial seed error (non-fatal):", seedErr);
    }

    return cachedDb;
  } catch (err) {
    console.warn("MongoDB connection failed, using local/tmp fallback:", err);
    return null;
  }
}

// Local JSON Database Fallback (serverless-proof with /tmp and in-memory fallback)
const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const LOCAL_DB_DIR = path.join(process.cwd(), "data");
const LOCAL_DB_FILE = path.join(LOCAL_DB_DIR, "db.json");
const TMP_DB_DIR = path.join(os.tmpdir(), "shutterscape");
const TMP_DB_FILE = path.join(TMP_DB_DIR, "db.json");

// In-memory cache singleton to guarantee consistency across requests
let memoryDb: DatabaseSchema | null = null;

export function readLocalDb(): DatabaseSchema {
  if (memoryDb) {
    return memoryDb;
  }

  // 1. Try reading from /tmp/shutterscape/db.json (if previously written in this container)
  if (fs.existsSync(TMP_DB_FILE)) {
    try {
      const raw = fs.readFileSync(TMP_DB_FILE, "utf8");
      const parsed = JSON.parse(raw) as Partial<DatabaseSchema>;
      memoryDb = {
        admins: parsed.admins?.length ? parsed.admins : DEFAULT_ADMINS,
        gallery: parsed.gallery ?? DEFAULT_GALLERY,
        members: parsed.members ?? DEFAULT_MEMBERS,
        activities: parsed.activities ?? DEFAULT_ACTIVITIES,
        messages: parsed.messages ?? [],
      };
      return memoryDb!;
    } catch {
      // ignore
    }
  }

  // 2. Try reading from bundled data/db.json in project
  if (fs.existsSync(LOCAL_DB_FILE)) {
    try {
      const raw = fs.readFileSync(LOCAL_DB_FILE, "utf8");
      const parsed = JSON.parse(raw) as Partial<DatabaseSchema>;
      memoryDb = {
        admins: parsed.admins?.length ? parsed.admins : DEFAULT_ADMINS,
        gallery: parsed.gallery ?? DEFAULT_GALLERY,
        members: parsed.members ?? DEFAULT_MEMBERS,
        activities: parsed.activities ?? DEFAULT_ACTIVITIES,
        messages: parsed.messages ?? [],
      };
      return memoryDb!;
    } catch {
      // ignore
    }
  }

  // 3. Fallback to default in-memory schema
  memoryDb = {
    admins: DEFAULT_ADMINS,
    gallery: DEFAULT_GALLERY,
    members: DEFAULT_MEMBERS,
    activities: DEFAULT_ACTIVITIES,
    messages: [],
  };
  return memoryDb;
}

export function writeLocalDb(data: DatabaseSchema): void {
  // Always update in-memory state first
  memoryDb = data;

  const serialized = JSON.stringify(data, null, 2);

  // 1. If not running in serverless, try writing to local project data/db.json
  let written = false;
  if (!IS_SERVERLESS) {
    try {
      if (!fs.existsSync(LOCAL_DB_DIR)) {
        fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
      }
      fs.writeFileSync(LOCAL_DB_FILE, serialized, "utf8");
      written = true;
    } catch {
      // Ignore read-only or permission errors on restricted disks
    }
  }

  // 2. Fallback to writing to /tmp/shutterscape/db.json (always writable on Vercel)
  if (!written) {
    try {
      if (!fs.existsSync(TMP_DB_DIR)) {
        fs.mkdirSync(TMP_DB_DIR, { recursive: true });
      }
      fs.writeFileSync(TMP_DB_FILE, serialized, "utf8");
    } catch {
      // Memory state is already updated, ignore disk write failure
    }
  }
}

// Unified Data Access Layer (MongoDB first, automatic local/tmp/memory fallback)
export const db = {
  async findAdmin(identifier: string): Promise<AdminUser | null> {
    const q = identifier.trim().toLowerCase();
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        const user = await mongo.collection<AdminUser>("admins").findOne({
          $or: [
            { username: { $regex: new RegExp(`^${q}$`, "i") } },
            { email: { $regex: new RegExp(`^${q}$`, "i") } },
          ],
        });
        if (user) return user;
      }
    } catch (err) {
      console.warn("MongoDB findAdmin error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    return (
      local.admins.find(
        (a) => a.username.toLowerCase() === q || a.email.toLowerCase() === q
      ) || null
    );
  },

  async getGallery(): Promise<GalleryItem[]> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        return await mongo
          .collection<GalleryItem>("gallery")
          .find({}, { projection: { _id: 0 } })
          .toArray();
      }
    } catch (err) {
      console.warn("MongoDB getGallery error, falling back to local/tmp store:", err);
    }
    return readLocalDb().gallery;
  },

  async addGalleryItem(item: GalleryItem): Promise<GalleryItem> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.collection<GalleryItem>("gallery").insertOne({ ...item });
        return item;
      }
    } catch (err) {
      console.warn("MongoDB addGalleryItem error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    local.gallery.unshift(item);
    writeLocalDb(local);
    return item;
  },

  async updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem | null> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.collection<GalleryItem>("gallery").updateOne({ id }, { $set: updates });
        return await mongo.collection<GalleryItem>("gallery").findOne({ id }, { projection: { _id: 0 } });
      }
    } catch (err) {
      console.warn("MongoDB updateGalleryItem error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    const idx = local.gallery.findIndex((g) => g.id === id);
    if (idx === -1) return null;
    local.gallery[idx] = { ...local.gallery[idx], ...updates, id };
    writeLocalDb(local);
    return local.gallery[idx];
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        const res = await mongo.collection<GalleryItem>("gallery").deleteOne({ id });
        return res.deletedCount > 0;
      }
    } catch (err) {
      console.warn("MongoDB deleteGalleryItem error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    const prevLen = local.gallery.length;
    local.gallery = local.gallery.filter((g) => g.id !== id);
    writeLocalDb(local);
    return local.gallery.length < prevLen;
  },

  async getMembers(): Promise<MemberItem[]> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        return await mongo
          .collection<MemberItem>("members")
          .find({}, { projection: { _id: 0 } })
          .toArray();
      }
    } catch (err) {
      console.warn("MongoDB getMembers error, falling back to local/tmp store:", err);
    }
    return readLocalDb().members;
  },

  async addMember(item: MemberItem): Promise<MemberItem> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.collection<MemberItem>("members").insertOne({ ...item });
        return item;
      }
    } catch (err) {
      console.warn("MongoDB addMember error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    local.members.push(item);
    writeLocalDb(local);
    return item;
  },

  async updateMember(id: string, updates: Partial<MemberItem>): Promise<MemberItem | null> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.collection<MemberItem>("members").updateOne({ id }, { $set: updates });
        return await mongo.collection<MemberItem>("members").findOne({ id }, { projection: { _id: 0 } });
      }
    } catch (err) {
      console.warn("MongoDB updateMember error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    const idx = local.members.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    local.members[idx] = { ...local.members[idx], ...updates, id };
    writeLocalDb(local);
    return local.members[idx];
  },

  async deleteMember(id: string): Promise<boolean> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        const res = await mongo.collection<MemberItem>("members").deleteOne({ id });
        return res.deletedCount > 0;
      }
    } catch (err) {
      console.warn("MongoDB deleteMember error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    const prevLen = local.members.length;
    local.members = local.members.filter((m) => m.id !== id);
    writeLocalDb(local);
    return local.members.length < prevLen;
  },

  async getActivities(): Promise<ActivityItem[]> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        return await mongo
          .collection<ActivityItem>("activities")
          .find({}, { projection: { _id: 0 } })
          .sort({ upcoming: -1, createdAt: -1 })
          .toArray();
      }
    } catch (err) {
      console.warn("MongoDB getActivities error, falling back to local/tmp store:", err);
    }
    const list = readLocalDb().activities;
    return [...list].sort((a, b) => {
      if (Boolean(b.upcoming) !== Boolean(a.upcoming)) {
        return b.upcoming ? 1 : -1;
      }
      return b.createdAt.localeCompare(a.createdAt);
    });
  },

  async addActivity(item: ActivityItem): Promise<ActivityItem> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.collection<ActivityItem>("activities").insertOne({ ...item });
        return item;
      }
    } catch (err) {
      console.warn("MongoDB addActivity error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    local.activities.unshift(item);
    writeLocalDb(local);
    return item;
  },

  async updateActivity(id: string, updates: Partial<ActivityItem>): Promise<ActivityItem | null> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.collection<ActivityItem>("activities").updateOne({ id }, { $set: updates });
        return await mongo.collection<ActivityItem>("activities").findOne({ id }, { projection: { _id: 0 } });
      }
    } catch (err) {
      console.warn("MongoDB updateActivity error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    const idx = local.activities.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    local.activities[idx] = { ...local.activities[idx], ...updates, id };
    writeLocalDb(local);
    return local.activities[idx];
  },

  async deleteActivity(id: string): Promise<boolean> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        const res = await mongo.collection<ActivityItem>("activities").deleteOne({ id });
        return res.deletedCount > 0;
      }
    } catch (err) {
      console.warn("MongoDB deleteActivity error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    const prevLen = local.activities.length;
    local.activities = local.activities.filter((a) => a.id !== id);
    writeLocalDb(local);
    return local.activities.length < prevLen;
  },

  async getMessages(): Promise<ContactSignal[]> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        return await mongo
          .collection<ContactSignal>("messages")
          .find({}, { projection: { _id: 0 } })
          .sort({ createdAt: -1 })
          .toArray();
      }
    } catch (err) {
      console.warn("MongoDB getMessages error, falling back to local/tmp store:", err);
    }
    return readLocalDb().messages;
  },

  async addMessage(msg: ContactSignal): Promise<ContactSignal> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.collection<ContactSignal>("messages").insertOne({ ...msg });
        return msg;
      }
    } catch (err) {
      console.warn("MongoDB addMessage error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    local.messages.unshift(msg);
    writeLocalDb(local);
    return msg;
  },

  async deleteMessage(id: string): Promise<boolean> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        const res = await mongo.collection<ContactSignal>("messages").deleteOne({ id });
        return res.deletedCount > 0;
      }
    } catch (err) {
      console.warn("MongoDB deleteMessage error, falling back to local/tmp store:", err);
    }
    const local = readLocalDb();
    const prevLen = local.messages.length;
    local.messages = local.messages.filter((m) => m.id !== id);
    writeLocalDb(local);
    return local.messages.length < prevLen;
  },
};
