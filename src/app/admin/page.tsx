"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ART, scene } from "@/lib/art";
import type {
  ActivityItem,
  ContactSignal,
  GalleryItem,
  MemberItem,
} from "@/lib/db";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [adminUser, setAdminUser] = useState<{
    username: string;
    email: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<
    "gallery" | "activities" | "members" | "messages"
  >("gallery");

  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [messages, setMessages] = useState<ContactSignal[]>([]);
  const [statusBanner, setStatusBanner] = useState<string>("");

  // Gallery Form State
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [gTitle, setGTitle] = useState("");
  const [gCat, setGCat] = useState("Street");
  const [gWho, setGWho] = useState("");
  const [gCaption, setGCaption] = useState("");
  const [gSpan, setGSpan] = useState("");
  const [gSrc, setGSrc] = useState("");
  const [gFile, setGFile] = useState<File | null>(null);
  const [gSaving, setGSaving] = useState(false);

  // Activity Form State
  const [editingActId, setEditingActId] = useState<string | null>(null);
  const [aChannel, setAChannel] = useState<number>(0);
  const [aTitle, setATitle] = useState("");
  const [aDate, setADate] = useState("");
  const [aDesc, setADesc] = useState("");
  const [aImage, setAImage] = useState("");
  const [aFile, setAFile] = useState<File | null>(null);
  const [aUpcoming, setAUpcoming] = useState(false);
  const [aSaving, setASaving] = useState(false);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // Member Form State
  const [editingMemId, setEditingMemId] = useState<string | null>(null);
  const [mName, setMName] = useState("");
  const [mRole, setMRole] = useState("");
  const [mGroup, setMGroup] = useState<"leads" | "studs">("leads");
  const [mArt, setMArt] = useState("eye");
  const [mBg, setMBg] = useState("#e0a526");
  const [mSrc, setMSrc] = useState("");
  const [mFile, setMFile] = useState<File | null>(null);
  const [mSaving, setMSaving] = useState(false);

  const notify = (msg: string) => {
    setStatusBanner(msg);
    setTimeout(() => setStatusBanner(""), 4000);
  };

  const loadAll = async () => {
    const [gRes, aRes, mRes, cRes] = await Promise.all([
      fetch("/api/gallery"),
      fetch("/api/activities"),
      fetch("/api/members"),
      fetch("/api/contact"),
    ]);
    if (gRes.ok) setGallery((await gRes.json()).items || []);
    if (aRes.ok) setActivities((await aRes.json()).items || []);
    if (mRes.ok) setMembers((await mRes.json()).items || []);
    if (cRes.ok) setMessages((await cRes.json()).items || []);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.replace("/admin/login");
        return;
      }
      const data = await res.json();
      setAdminUser(data.admin);
      setAuthChecked(true);
      await loadAll();
    })();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const uploadFileHelper = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok || !data.url) {
      throw new Error(data.error || "Upload failed");
    }
    return data.url;
  };

  // --- Gallery Handlers ---
  const resetGalleryForm = () => {
    setEditingPhotoId(null);
    setGTitle("");
    setGCat("Street");
    setGWho("");
    setGCaption("");
    setGSpan("");
    setGSrc("");
    setGFile(null);
  };

  const startEditPhoto = (p: GalleryItem) => {
    setEditingPhotoId(p.id);
    setGTitle(p.title);
    setGCat(p.cat);
    setGWho(p.who === "Photographer name" ? "" : p.who);
    setGCaption(p.caption || "");
    setGSpan(p.z || "");
    setGSrc(p.src || "");
    setGFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setGSaving(true);
    try {
      let finalUrl = gSrc.trim() || null;
      let isVideo = false;
      if (gFile) {
        isVideo = gFile.type.startsWith("video/");
        finalUrl = await uploadFileHelper(gFile);
      }

      if (editingPhotoId) {
        const res = await fetch("/api/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingPhotoId,
            title: gTitle,
            cat: gCat,
            z: gSpan,
            src: isVideo ? null : finalUrl,
            video: isVideo ? finalUrl : null,
            who: gWho || "Photographer name",
            caption: gCaption,
          }),
        });
        if (!res.ok) throw new Error("Failed to update gallery item.");
        notify("Gallery frame updated!");
      } else {
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: gTitle,
            cat: gCat,
            z: gSpan,
            src: isVideo ? null : finalUrl,
            video: isVideo ? finalUrl : null,
            who: gWho || "Photographer name",
            caption: gCaption,
          }),
        });
        if (!res.ok) throw new Error("Failed to add gallery item.");
        notify("New image added to Gallery!");
      }
      resetGalleryForm();
      await loadAll();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Error saving gallery item.");
    } finally {
      setGSaving(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    const res = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      notify("Gallery frame deleted.");
      await loadAll();
    }
  };

  // --- Rich Text Toolbar Helper for Activities ---
  const applyRichTag = (openTag: string, closeTag: string) => {
    const el = descRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = aDesc.slice(start, end) || "text";
    const next =
      aDesc.slice(0, start) + openTag + selected + closeTag + aDesc.slice(end);
    setADesc(next);
  };

  const resetActivityForm = () => {
    setEditingActId(null);
    setAChannel(0);
    setATitle("");
    setADate("");
    setADesc("");
    setAImage("");
    setAFile(null);
    setAUpcoming(false);
  };

  const startEditActivity = (a: ActivityItem) => {
    setEditingActId(a.id);
    setAChannel(a.channel);
    setATitle(a.title);
    setADate(a.date);
    setADesc(a.description);
    setAImage(a.image || "");
    setAFile(null);
    setAUpcoming(Boolean(a.upcoming));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setASaving(true);
    try {
      let finalImg = aImage.trim() || null;
      if (aFile) {
        finalImg = await uploadFileHelper(aFile);
      }
      const payload = {
        id: editingActId,
        channel: aChannel,
        title: aTitle,
        date: aDate || "Date to be announced",
        description: aDesc || aDate || "Date to be announced",
        image: finalImg,
        upcoming: aUpcoming,
      };
      const res = await fetch("/api/activities", {
        method: editingActId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save activity.");
      notify(editingActId ? "Activity updated!" : "Activity added!");
      resetActivityForm();
      await loadAll();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Error saving activity.");
    } finally {
      setASaving(false);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    const res = await fetch(`/api/activities?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      notify("Activity deleted.");
      await loadAll();
    }
  };

  // --- Member Handlers ---
  const resetMemberForm = () => {
    setEditingMemId(null);
    setMName("");
    setMRole("");
    setMGroup("leads");
    setMArt("eye");
    setMBg("#e0a526");
    setMSrc("");
    setMFile(null);
  };

  const startEditMember = (m: MemberItem) => {
    setEditingMemId(m.id);
    setMName(m.name);
    setMRole(m.role);
    setMGroup(m.group);
    setMArt(m.art);
    setMBg(m.bg);
    setMSrc(m.src || "");
    setMFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setMSaving(true);
    try {
      let finalImg = mSrc.trim() || null;
      if (mFile) {
        finalImg = await uploadFileHelper(mFile);
      }
      const payload = {
        id: editingMemId,
        name: mName,
        role: mRole,
        group: mGroup,
        art: mArt,
        bg: mBg,
        src: finalImg,
      };
      const res = await fetch("/api/members", {
        method: editingMemId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save member.");
      notify(editingMemId ? "Member updated!" : "Member added!");
      resetMemberForm();
      await loadAll();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Error saving member.");
    } finally {
      setMSaving(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    const res = await fetch(`/api/members?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      notify("Member removed.");
      await loadAll();
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const res = await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      notify("Message deleted.");
      await loadAll();
    }
  };

  if (!authChecked) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bone)",
          font: "24px Gloock, serif",
        }}
      >
        Loading Shutterscape Admin...
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    padding: "10px 12px",
    border: "3px solid var(--ink)",
    background: "#fff",
    color: "var(--ink)",
    font: "15px Syne, sans-serif",
    width: "100%",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bone)", paddingBottom: "80px" }}>
      <nav className="nv" aria-label="Admin Top Bar">
        <a className="w" href="/">
          <span
            className="in"
            dangerouslySetInnerHTML={{ __html: ART.eye() }}
          />
          shutterscape admin
        </a>
        <span style={{ fontSize: "13px", opacity: 0.8 }}>
          Signed in as <b>{adminUser?.username}</b>
        </span>
        <a href="/">View Live Site ↗</a>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            background: "var(--tom)",
            color: "#fff",
            border: "2px solid var(--ink)",
            borderRadius: "99px",
            padding: "4px 12px",
            font: "700 13px Syne, sans-serif",
            cursor: "pointer",
          }}
        >
          Log out
        </button>
      </nav>

      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "96px clamp(16px, 4vw, 40px) 0",
        }}
      >
        {statusBanner && (
          <div
            style={{
              background: "var(--teal)",
              color: "#fff",
              border: "3px solid var(--ink)",
              boxShadow: "5px 5px 0 var(--ink)",
              padding: "12px 18px",
              marginBottom: "22px",
              fontWeight: 700,
            }}
          >
            {statusBanner}
          </div>
        )}

        {/* Section Tabs */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          {(
            [
              ["gallery", `Gallery Frames (${gallery.length})`],
              ["activities", `Events & Notices (${activities.length})`],
              ["members", `Students & Leads (${members.length})`],
              ["messages", `Contact Signals (${messages.length})`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={activeTab === key ? "bt" : "bt o"}
              onClick={() => setActiveTab(key)}
              style={{ fontSize: "15px", padding: "10px 20px" }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* TAB 1: GALLERY MANAGER */}
        {activeTab === "gallery" && (
          <div style={{ display: "grid", gap: "32px" }}>
            <div
              style={{
                background: "var(--wh)",
                border: "4px solid var(--ink)",
                boxShadow: "8px 8px 0 var(--ink)",
                padding: "26px",
              }}
            >
              <h2 style={{ fontSize: "36px", marginBottom: "6px" }}>
                {editingPhotoId
                  ? "Edit / Upload Image for Frame"
                  : "Upload New Image to Gallery"}
              </h2>
              <p style={{ margin: "0 0 18px", fontSize: "14px" }}>
                Upload an image from your device (stored via Cloudinary or{" "}
                <code>/public/uploads</code>) or paste an image URL.
              </p>

              <form
                onSubmit={handleSaveGallery}
                style={{ display: "grid", gap: "14px" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "14px",
                  }}
                >
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Title *
                    <input
                      style={inputStyle}
                      value={gTitle}
                      onChange={(e) => setGTitle(e.target.value)}
                      placeholder="e.g. Untitled 01"
                      required
                    />
                  </label>
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Category
                    <select
                      style={inputStyle}
                      value={gCat}
                      onChange={(e) => setGCat(e.target.value)}
                    >
                      <option>Street</option>
                      <option>Portrait</option>
                      <option>Nature</option>
                      <option>Monochrome</option>
                      <option>Campus</option>
                      <option>Abstract</option>
                      <option>Experimental</option>
                    </select>
                  </label>
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Photographer Name
                    <input
                      style={inputStyle}
                      value={gWho}
                      onChange={(e) => setGWho(e.target.value)}
                      placeholder="Photographer name"
                    />
                  </label>
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Grid Size
                    <select
                      style={inputStyle}
                      value={gSpan}
                      onChange={(e) => setGSpan(e.target.value)}
                    >
                      <option value="">Standard (1×1)</option>
                      <option value="w2">Wide (w2)</option>
                      <option value="h2">Tall (h2)</option>
                      <option value="w2 h2">Large Square (w2 h2)</option>
                      <option value="w3">Feature Banner (w3)</option>
                    </select>
                  </label>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "14px",
                  }}
                >
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Upload Image / Video File
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => setGFile(e.target.files?.[0] || null)}
                      style={{
                        ...inputStyle,
                        background: "var(--bone)",
                        borderStyle: "dashed",
                      }}
                    />
                  </label>
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Or Direct Image URL (optional)
                    <input
                      style={inputStyle}
                      value={gSrc}
                      onChange={(e) => setGSrc(e.target.value)}
                      placeholder="https://... or /uploads/..."
                    />
                  </label>
                </div>

                <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                  Short Description / Caption
                  <input
                    style={inputStyle}
                    value={gCaption}
                    onChange={(e) => setGCaption(e.target.value)}
                    placeholder="Short caption displayed below the photograph"
                  />
                </label>

                <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                  <button type="submit" className="bt" disabled={gSaving}>
                    {gSaving
                      ? "Saving..."
                      : editingPhotoId
                        ? "Update Gallery Frame"
                        : "+ Add to Gallery"}
                  </button>
                  {editingPhotoId && (
                    <button
                      type="button"
                      className="bt o"
                      onClick={resetGalleryForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Gallery Grid */}
            <div>
              <h3 style={{ fontSize: "28px", marginBottom: "14px" }}>
                Current Gallery Frames (Click Edit to upload/replace photo)
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "18px",
                }}
              >
                {gallery.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: "var(--wh)",
                      border: "3px solid var(--ink)",
                      boxShadow: "5px 5px 0 var(--ink)",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "4/3",
                        border: "2px solid var(--ink)",
                        borderRadius: "6px",
                        overflow: "hidden",
                        background: "#111",
                      }}
                    >
                      {p.src ? (
                        <img
                          src={p.src}
                          alt={p.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <div
                          style={{ width: "100%", height: "100%" }}
                          dangerouslySetInnerHTML={{ __html: scene(p.seed) }}
                        />
                      )}
                    </div>
                    <div>
                      <b style={{ font: "20px Gloock, serif", display: "block" }}>
                        {p.title}
                      </b>
                      <span style={{ fontSize: "13px", opacity: 0.85 }}>
                        {p.cat} · {p.who} {p.z ? `(${p.z})` : ""}
                      </span>
                      {p.caption && (
                        <p style={{ margin: "4px 0 0", fontSize: "12px" }}>
                          {p.caption}
                        </p>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: "auto",
                        paddingTop: "6px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => startEditPhoto(p)}
                        style={{
                          flex: 1,
                          padding: "6px 10px",
                          border: "2px solid var(--ink)",
                          background: "var(--mus)",
                          font: "700 12px Syne, sans-serif",
                          cursor: "pointer",
                        }}
                      >
                        {p.src ? "Edit Photo" : "Upload Photo"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGallery(p.id)}
                        style={{
                          padding: "6px 10px",
                          border: "2px solid var(--ink)",
                          background: "var(--tom)",
                          color: "#fff",
                          font: "700 12px Syne, sans-serif",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVITIES & TV NOTICES MANAGER */}
        {activeTab === "activities" && (
          <div style={{ display: "grid", gap: "32px" }}>
            <div
              style={{
                background: "var(--wh)",
                border: "4px solid var(--ink)",
                boxShadow: "8px 8px 0 var(--ink)",
                padding: "26px",
              }}
            >
              <h2 style={{ fontSize: "36px", marginBottom: "6px" }}>
                {editingActId ? "Edit Activity / Notice" : "Add Activity / Notice"}
              </h2>
              <p style={{ margin: "0 0 18px", fontSize: "14px" }}>
                Manage Events &amp; Notices displayed on the retro TV channels
                (CH 1, CH 2, CH 3). Latest &amp; Upcoming activities appear at
                the top.
              </p>

              <form
                onSubmit={handleSaveActivity}
                style={{ display: "grid", gap: "14px" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "14px",
                  }}
                >
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    TV Channel
                    <select
                      style={inputStyle}
                      value={aChannel}
                      onChange={(e) => setAChannel(Number(e.target.value))}
                    >
                      <option value={0}>CH 1. Events</option>
                      <option value={1}>CH 2. Notices</option>
                      <option value={2}>CH 3. Frame of the week</option>
                    </select>
                  </label>
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Title *
                    <input
                      style={inputStyle}
                      value={aTitle}
                      onChange={(e) => setATitle(e.target.value)}
                      placeholder="e.g. Photo walk"
                      required
                    />
                  </label>
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Date / Subtitle
                    <input
                      style={inputStyle}
                      value={aDate}
                      onChange={(e) => setADate(e.target.value)}
                      placeholder="e.g. 25 Nov 2026 or Date to be announced"
                    />
                  </label>
                </div>

                {/* Rich Text Tools for Description */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: "14px" }}>
                      Description (with Rich Text tools):
                    </span>
                    <button
                      type="button"
                      onClick={() => applyRichTag("<b>", "</b>")}
                      style={{
                        border: "2px solid var(--ink)",
                        background: "var(--bone)",
                        padding: "2px 8px",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => applyRichTag("<i>", "</i>")}
                      style={{
                        border: "2px solid var(--ink)",
                        background: "var(--bone)",
                        padding: "2px 8px",
                        fontStyle: "italic",
                        cursor: "pointer",
                      }}
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => applyRichTag("<u>", "</u>")}
                      style={{
                        border: "2px solid var(--ink)",
                        background: "var(--bone)",
                        padding: "2px 8px",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      U
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        applyRichTag(
                          '<a href="https://www.instagram.com/shutterscapegcu/" target="_blank">',
                          "</a>"
                        )
                      }
                      style={{
                        border: "2px solid var(--ink)",
                        background: "var(--bone)",
                        padding: "2px 8px",
                        cursor: "pointer",
                      }}
                    >
                      🔗 Link
                    </button>
                  </div>
                  <textarea
                    ref={descRef}
                    rows={3}
                    style={inputStyle}
                    value={aDesc}
                    onChange={(e) => setADesc(e.target.value)}
                    placeholder="Activity details (supports bold, italics, links...)"
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "14px",
                    alignItems: "center",
                  }}
                >
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Activity Image (optional)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setAFile(e.target.files?.[0] || null)}
                      style={{ ...inputStyle, background: "var(--bone)" }}
                    />
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontWeight: 700,
                      cursor: "pointer",
                      marginTop: "18px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={aUpcoming}
                      onChange={(e) => setAUpcoming(e.target.checked)}
                      style={{ width: "20px", height: "20px" }}
                    />
                    Highlight as Upcoming Activity
                  </label>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                  <button type="submit" className="bt" disabled={aSaving}>
                    {aSaving
                      ? "Saving..."
                      : editingActId
                        ? "Update Activity"
                        : "+ Add Activity"}
                  </button>
                  {editingActId && (
                    <button
                      type="button"
                      className="bt o"
                      onClick={resetActivityForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {activities.map((a) => (
                <div
                  key={a.id}
                  style={{
                    background: "var(--wh)",
                    border: "3px solid var(--ink)",
                    boxShadow: "5px 5px 0 var(--ink)",
                    padding: "14px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        padding: "2px 8px",
                        background: "var(--mus)",
                        border: "2px solid var(--ink)",
                        marginRight: "8px",
                      }}
                    >
                      CH {a.channel + 1}
                    </span>
                    {a.upcoming && (
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "2px 8px",
                          background: "var(--tom)",
                          color: "#fff",
                          border: "2px solid var(--ink)",
                          marginRight: "8px",
                        }}
                      >
                        UPCOMING
                      </span>
                    )}
                    <b style={{ font: "22px Gloock, serif" }}>{a.title}</b>
                    <div
                      style={{ fontSize: "14px", marginTop: "4px" }}
                      dangerouslySetInnerHTML={{
                        __html: a.description || a.date,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => startEditActivity(a)}
                      style={{
                        padding: "6px 12px",
                        border: "2px solid var(--ink)",
                        background: "var(--mus)",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteActivity(a.id)}
                      style={{
                        padding: "6px 12px",
                        border: "2px solid var(--ink)",
                        background: "var(--tom)",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: STUDENTS & LEADS MANAGER */}
        {activeTab === "members" && (
          <div style={{ display: "grid", gap: "32px" }}>
            <div
              style={{
                background: "var(--wh)",
                border: "4px solid var(--ink)",
                boxShadow: "8px 8px 0 var(--ink)",
                padding: "26px",
              }}
            >
              <h2 style={{ fontSize: "36px", marginBottom: "6px" }}>
                {editingMemId ? "Edit Member Card" : "Add Lead / Student Card"}
              </h2>
              <form
                onSubmit={handleSaveMember}
                style={{ display: "grid", gap: "14px" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "14px",
                  }}
                >
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Name *
                    <input
                      style={inputStyle}
                      value={mName}
                      onChange={(e) => setMName(e.target.value)}
                      placeholder="Name Surname"
                      required
                    />
                  </label>
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Role
                    <input
                      style={inputStyle}
                      value={mRole}
                      onChange={(e) => setMRole(e.target.value)}
                      placeholder="Club lead / Student"
                    />
                  </label>
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Section Group
                    <select
                      style={inputStyle}
                      value={mGroup}
                      onChange={(e) =>
                        setMGroup(e.target.value as "leads" | "studs")
                      }
                    >
                      <option value="leads">The leads</option>
                      <option value="studs">The students</option>
                    </select>
                  </label>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "14px",
                  }}
                >
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Artwork Icon (if no portrait uploaded)
                    <select
                      style={inputStyle}
                      value={mArt}
                      onChange={(e) => setMArt(e.target.value)}
                    >
                      <option value="eye">Eye</option>
                      <option value="alien">Alien</option>
                      <option value="bust">Marble Bust</option>
                      <option value="invader">Pixel Invader (Teal)</option>
                      <option value="invader2">Pixel Invader (Red)</option>
                      <option value="camera">Pixel Camera</option>
                      <option value="eagle">Pixel Eagle</option>
                      <option value="flower">Wildflower</option>
                      <option value="cloud">Pixel Cloud</option>
                    </select>
                  </label>
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Card Backdrop Color
                    <select
                      style={inputStyle}
                      value={mBg}
                      onChange={(e) => setMBg(e.target.value)}
                    >
                      <option value="#e0a526">Mustard (#e0a526)</option>
                      <option value="#1f6f6a">Teal (#1f6f6a)</option>
                      <option value="#d9482b">Tomato (#d9482b)</option>
                      <option value="#8fae8b">Sage (#8fae8b)</option>
                      <option value="#f3ecdc">Bone (#f3ecdc)</option>
                      <option value="#fbf8f0">Cream (#fbf8f0)</option>
                    </select>
                  </label>
                  <label style={{ display: "grid", gap: "5px", fontWeight: 600 }}>
                    Upload Portrait Photo (optional)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setMFile(e.target.files?.[0] || null)}
                      style={{ ...inputStyle, background: "var(--bone)" }}
                    />
                  </label>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                  <button type="submit" className="bt" disabled={mSaving}>
                    {mSaving
                      ? "Saving..."
                      : editingMemId
                        ? "Update Member"
                        : "+ Add Member"}
                  </button>
                  {editingMemId && (
                    <button
                      type="button"
                      className="bt o"
                      onClick={resetMemberForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: "18px",
              }}
            >
              {members.map((m) => (
                <div
                  key={m.id}
                  style={{
                    background: "var(--wh)",
                    border: "3px solid var(--ink)",
                    boxShadow: "5px 5px 0 var(--ink)",
                    padding: "12px",
                  }}
                >
                  <div
                    style={{
                      background: m.bg,
                      border: "2px solid var(--ink)",
                      padding: "12px",
                      marginBottom: "8px",
                      height: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {m.src ? (
                      <img
                        src={m.src}
                        alt={m.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{ width: "70px" }}
                        dangerouslySetInnerHTML={{
                          __html: (ART[m.art] || ART.eye)(),
                        }}
                      />
                    )}
                  </div>
                  <b style={{ font: "20px Gloock, serif", display: "block" }}>
                    {m.name}
                  </b>
                  <span style={{ fontSize: "12px", display: "block" }}>
                    {m.role} ({m.group === "leads" ? "Lead" : "Student"})
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => startEditMember(m)}
                      style={{
                        flex: 1,
                        padding: "5px",
                        border: "2px solid var(--ink)",
                        background: "var(--mus)",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMember(m.id)}
                      style={{
                        padding: "5px 10px",
                        border: "2px solid var(--ink)",
                        background: "var(--tom)",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT SIGNALS */}
        {activeTab === "messages" && (
          <div style={{ display: "grid", gap: "14px" }}>
            {messages.length === 0 ? (
              <div
                style={{
                  background: "var(--wh)",
                  border: "3px solid var(--ink)",
                  padding: "24px",
                }}
              >
                No signals received from the Contact Us form yet.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    background: "var(--wh)",
                    border: "3px solid var(--ink)",
                    boxShadow: "5px 5px 0 var(--ink)",
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <div>
                    <b style={{ font: "22px Gloock, serif" }}>{m.name}</b>{" "}
                    <span style={{ fontSize: "13px", opacity: 0.8 }}>
                      ({m.email}) · Interest: <b>{m.interest}</b>
                    </span>
                    <p style={{ margin: "6px 0 0" }}>{m.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteMessage(m.id)}
                    style={{
                      padding: "6px 12px",
                      border: "2px solid var(--ink)",
                      background: "var(--tom)",
                      color: "#fff",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
