"use client";

import React, { useEffect, useRef, useState } from "react";
import { ART } from "@/lib/art";
import type { GalleryItem } from "@/lib/db";

const CATEGORIES = [
  "All",
  "Street",
  "Portrait",
  "Nature",
  "Monochrome",
  "Campus",
  "Abstract",
  "Experimental",
];

export default function GalleryPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const fetchUploadedGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const all: GalleryItem[] = data.items || [];
        // Filter to only uploaded images/videos (apart from the 18 default placeholder frames on the main frontend)
        const uploadedOnly = all.filter((item) => Boolean(item.src || item.video));
        setItems(uploadedOnly);
      }
    } catch (err) {
      console.warn("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploadedGallery();
  }, []);

  // Populate decorative SVG elements & pointer-following pupils
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>("[data-a]").forEach((n) => {
      const key = n.dataset.a;
      if (key && ART[key]) {
        n.innerHTML = ART[key]();
      }
    });

    const RM = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const onPointerMove = (e: PointerEvent) => {
      root.querySelectorAll<SVGGElement>(".pu").forEach((p) => {
        const svg = p.ownerSVGElement;
        if (!svg) return;
        const b = svg.getBoundingClientRect();
        const x = e.clientX - b.left - b.width / 2;
        const y = e.clientY - b.top - b.height / 2;
        const a = Math.atan2(y, x);
        const d = Math.min(1, Math.hypot(x, y) / 320);
        const k = +(p.dataset.k || 1);
        p.setAttribute(
          "transform",
          `translate(${Math.cos(a) * 30 * d * k} ${Math.sin(a) * 14 * d * k})`
        );
      });
    };
    if (!RM) {
      window.addEventListener("pointermove", onPointerMove);
    }
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  const filteredItems =
    selectedCat === "All"
      ? items
      : items.filter((i) => i.cat.toLowerCase() === selectedCat.toLowerCase());

  return (
    <div ref={rootRef} style={{ minHeight: "100vh", background: "var(--wh)" }}>
      <nav className="nv" aria-label="Primary">
        <a className="w" href="/">
          <span data-a="eye" className="in"></span>shutterscape
        </a>
        <a
          href="/"
          style={{
            padding: "4px 14px",
            borderRadius: "99px",
            background: "var(--mus)",
            color: "var(--ink)",
            border: "2px solid var(--ink)",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: "13px",
            marginLeft: "auto",
            boxShadow: "2px 2px 0 var(--ink)",
          }}
        >
          ← Home
        </a>
        <a className="l" href="/#stories">
          Stories
        </a>
        <a className="l" href="/#people">
          Students &amp; Leads
        </a>
        <a className="l" href="/#events">
          Events &amp; Notices
        </a>
      </nav>

      <section
        className="g"
        style={{
          paddingTop: "120px",
          minHeight: "calc(100vh - 180px)",
          background: "var(--wh)",
        }}
      >
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              right: "28%",
              top: "74px",
              width: "76px",
              "--r": "12deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="camera"
          style={
            {
              right: "5%",
              top: "86px",
              width: "92px",
              "--r": "8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="cloud"
          style={{ left: "44%", top: "70px", width: "110px" }}
        ></span>
        <span
          className="el"
          data-a="flower"
          style={
            {
              left: "-10px",
              bottom: "-6px",
              width: "170px",
              "--r": "-3deg",
            } as React.CSSProperties
          }
        ></span>

        <div className="hd" style={{ marginBottom: "26px" }}>
          <h2>Uploaded Gallery</h2>
          <small>
            All photographs uploaded by the club, with captions and credits
            below every frame.
          </small>
        </div>

        {/* Category Filter Bar (Smooth horizontal scroll on mobile) */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "8px",
            marginBottom: "32px",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {CATEGORIES.map((c) => {
            const active = selectedCat === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCat(c)}
                style={{
                  padding: "7px 16px",
                  border: "2px solid var(--ink)",
                  borderRadius: "99px",
                  background: active ? "var(--mus)" : "var(--bone)",
                  color: "var(--ink)",
                  font: "700 13px Syne, sans-serif",
                  boxShadow: active ? "2px 2px 0 var(--ink)" : "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Uploaded Images Grid */}
        {loading ? (
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "60px 20px",
              textAlign: "center",
              font: "28px Gloock, serif",
            }}
          >
            Developing frames...
          </div>
        ) : filteredItems.length === 0 ? (
          <div
            style={{
              position: "relative",
              zIndex: 2,
              background: "var(--bone)",
              border: "3px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--ink)",
              padding: "36px 20px",
              textAlign: "center",
              maxWidth: "620px",
              margin: "30px auto",
              borderRadius: "10px",
            }}
          > 
            <div
              style={{ width: "72px", margin: "0 auto 14px" }}
              dangerouslySetInnerHTML={{ __html: ART.camera() }}
            />
            <h3 style={{ fontSize: "28px", marginBottom: "8px" }}>
              No uploaded photographs yet
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: "15px" }}>
              The 18 default frames remain on the main homepage. Photographs can be uploaded securely via the Admin Dashboard.
            </p>
            <a
              className="bt"
              href="/admin"
            >
              Go to Admin Dashboard →
            </a>
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "20px",
            }}
          >
            {filteredItems.map((p, idx) => {
              const tilt = (((idx * 29) % 5) - 2) * 0.35;
              return (
                <article
                  key={p.id}
                  style={{
                    background: "var(--bone)",
                    border: "3px solid var(--ink)",
                    borderRadius: "12px",
                    boxShadow: "5px 5px 0 var(--ink)",
                    padding: "12px",
                    transform: `rotate(${tilt}deg)`,
                    transition: "transform .25s",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => setLightboxItem(p)}
                >
                  <div
                    style={{
                      aspectRatio: "4/3",
                      border: "2px solid var(--ink)",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#16130f",
                      marginBottom: "10px",
                    }}
                  >
                    {p.video ? (
                      <video
                        src={p.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <img
                        src={p.src || ""}
                        alt={p.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "8px",
                    }}
                  >
                    <h3 style={{ fontSize: "22px", lineHeight: 1.15 }}>
                      {p.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "99px",
                        border: "2px solid var(--ink)",
                        background: "var(--mus)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.cat}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      opacity: 0.8,
                      marginTop: "4px",
                    }}
                  >
                    By {p.who}
                  </span>

                  {p.caption && (
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: "13px",
                        lineHeight: 1.4,
                        paddingTop: "6px",
                        borderTop: "1px dashed var(--ink)",
                      }}
                    >
                      {p.caption}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer>
        <div className="big">
          shutter
          <br />
          scape
        </div>
        <p>
          Photography club, Girijananda Chowdhury University.{" "}
          <a href="/">← Back to Home</a> · <a href="/admin">Admin Dashboard</a>
        </p>
      </footer>

      {/* Lightbox Modal when clicking an uploaded photo */}
      {lightboxItem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 220,
            background: "rgba(29, 26, 23, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(10px, 3vw, 24px)",
          }}
          onClick={() => setLightboxItem(null)}
        >
          <div
            style={{
              background: "var(--wh)",
              color: "var(--ink)",
              border: "3px solid var(--ink)",
              borderRadius: "12px",
              boxShadow: "6px 6px 0 var(--mus)",
              padding: "14px",
              maxWidth: "860px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--teal)" }}>
                {lightboxItem.cat} · {lightboxItem.who}
              </span>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                style={{
                  background: "var(--tom)",
                  color: "#fff",
                  border: "2px solid var(--ink)",
                  borderRadius: "99px",
                  padding: "4px 12px",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                ✕ Close
              </button>
            </div>

            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                border: "2px solid var(--ink)",
                background: "#000",
                maxHeight: "56vh",
              }}
            >
              {lightboxItem.video ? (
                <video
                  src={lightboxItem.video}
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    maxHeight: "56vh",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              ) : (
                <img
                  src={lightboxItem.src || ""}
                  alt={lightboxItem.title}
                  style={{
                    width: "100%",
                    maxHeight: "56vh",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
                marginTop: "14px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "30px" }}>{lightboxItem.title}</h3>
                <p style={{ margin: "4px 0 0", fontSize: "14px", fontWeight: 600 }}>
                  {lightboxItem.cat} · Photographed by {lightboxItem.who}
                </p>
                {lightboxItem.caption && (
                  <p style={{ margin: "8px 0 0", fontSize: "15px" }}>
                    {lightboxItem.caption}
                  </p>
                )}
              </div>
              <button
                type="button"
                className="bt o"
                onClick={() => setLightboxItem(null)}
                style={{ padding: "8px 16px", fontSize: "14px" }}
              >
                Close ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
