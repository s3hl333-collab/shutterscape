"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Info, Camera, MapPin, Film } from "lucide-react";
import type { Photo } from "@/lib/types";
import { categories } from "@/data/photos";
import { site } from "@/data/site";
import { lockScroll } from "@/lib/scroll";
import { playShutterSound } from "@/lib/audio";
import { PhotoImage } from "./PhotoImage";

interface Props {
  items: Photo[];
  /** null = closed */
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}

const label = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug;

export function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [showExif, setShowExif] = useState(true);
  const lastIndex = useRef(0);
  const dir = useRef<1 | -1>(1);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  if (index !== null) lastIndex.current = index;
  const i = index ?? lastIndex.current;
  const photo = items[Math.min(i, items.length - 1)];

  // open / close lifecycle
  useEffect(() => {
    if (index !== null) {
      opener.current = document.activeElement as HTMLElement;
      setRendered(true);
      lockScroll(true);
      setZoomed(false);
      const r = requestAnimationFrame(() => {
        setVisible(true);
        closeBtn.current?.focus();
      });
      return () => cancelAnimationFrame(r);
    }
    if (rendered) {
      setVisible(false);
      setZoomed(false);
      const t = setTimeout(() => {
        setRendered(false);
        lockScroll(false);
        opener.current?.focus?.();
      }, 450);
      return () => clearTimeout(t);
    }
  }, [index === null]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = useCallback(
    (d: 1 | -1) => {
      if (index === null || items.length < 2) return;
      playShutterSound();
      dir.current = d;
      setZoomed(false);
      onNavigate((index + d + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playShutterSound();
        onClose();
      } else if (e.key === "ArrowRight") {
        go(1);
      } else if (e.key === "ArrowLeft") {
        go(-1);
      } else if (e.key.toLowerCase() === "z") {
        setZoomed((z) => !z);
      } else if (e.key.toLowerCase() === "i") {
        setShowExif((x) => !x);
      } else if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("button, a[href]");
        if (!f.length) return;
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, onClose]);

  if (!rendered || !photo) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    touch.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = touch.current;
    touch.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else if (dy > 110 && Math.abs(dy) > Math.abs(dx)) onClose();
  };

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title} — ${label(photo.category)}`}
      className={`fixed inset-0 z-[150] flex flex-col bg-obsidian text-ivory transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Top Bar: Plate number, Category, Tools, Close */}
      <div className="mono-label relative z-20 flex items-center justify-between border-b border-white/10 px-5 py-4 text-[0.7rem] md:px-10">
        <div className="flex items-center gap-4">
          <span aria-live="polite">
            <span className="text-vermilion font-bold">FRAME {String(i + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
          </span>
          <span className="text-white/20">|</span>
          <span className="hidden text-silver sm:inline">{label(photo.category)}</span>
          {photo.camera && (
            <>
              <span className="hidden text-white/20 md:inline">|</span>
              <span className="hidden text-silver/80 md:inline">{photo.camera}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom toggle button */}
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            title="Toggle detail loupe (Z)"
            aria-label={zoomed ? "Reset zoom" : "Zoom into photograph"}
            className="flex items-center gap-1.5 rounded border border-white/20 px-2.5 py-1 text-[0.62rem] text-silver transition-colors hover:border-ivory hover:text-ivory"
          >
            {zoomed ? <ZoomOut size={13} /> : <ZoomIn size={13} />}
            <span className="hidden sm:inline">{zoomed ? "FIT" : "LOUPE 2×"}</span>
          </button>

          {/* EXIF metadata toggle button */}
          <button
            type="button"
            onClick={() => setShowExif((x) => !x)}
            title="Toggle technical metadata (I)"
            aria-label="Toggle camera metadata"
            className={`flex items-center gap-1.5 rounded border px-2.5 py-1 text-[0.62rem] transition-colors ${
              showExif ? "border-vermilion text-vermilion" : "border-white/20 text-silver hover:border-ivory hover:text-ivory"
            }`}
          >
            <Info size={13} />
            <span className="hidden sm:inline">EXIF</span>
          </button>

          <span className="h-4 w-px bg-white/20" />

          {/* Close button */}
          <button
            ref={closeBtn}
            type="button"
            onClick={() => {
              playShutterSound();
              onClose();
            }}
            className="flex items-center gap-2 py-1 text-ivory transition-colors hover:text-vermilion"
          >
            <span>Close</span>
            <span className="hidden text-silver/60 md:inline">[ESC]</span>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Photographic Stage */}
      <div
        className={`relative mx-4 my-2 min-h-0 flex-1 touch-none overflow-hidden transition-all duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] md:mx-16 ${
          visible ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
        }`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (touch.current = null)}
      >
        <div
          key={photo.id}
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
            zoomed ? "scale-[1.85] cursor-zoom-out" : "scale-100 cursor-zoom-in"
          }`}
          onClick={() => setZoomed((z) => !z)}
          style={{
            animation: `${dir.current === 1 ? "lbInR" : "lbInL"} 0.6s cubic-bezier(.22,1,.36,1) both`,
          }}
        >
          <PhotoImage photo={photo} contain priority sizes="100vw" />
        </div>
      </div>

      {/* Bottom Technical EXIF Drawer & Filmstrip Navigation */}
      <div className="relative z-20 border-t border-white/10 bg-obsidian/95 px-5 pb-5 pt-4 backdrop-blur-md md:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          {/* Photograph title and context */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-silver mono-label text-[0.62rem]">
              <span className="text-vermilion">COLLECTION</span>
              <span>·</span>
              <span>{label(photo.category)}</span>
              {photo.location && (
                <>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 text-ivory">
                    <MapPin size={11} className="text-vermilion" /> {photo.location}
                  </span>
                </>
              )}
            </div>
            <h3 className="display truncate text-[clamp(1.7rem,3.4vw,2.8rem)] italic leading-tight tracking-[-0.02em] text-ivory">
              {photo.title}
            </h3>
            <p className="mono-label mt-1 text-[0.65rem] text-silver">
              Photographer: <span className="text-ivory">{photo.photographer ?? site.sampleCredit}</span>
            </p>
          </div>

          {/* EXIF Data Strip */}
          {showExif && (
            <div className="flex flex-wrap items-center gap-3 rounded bg-white/[0.04] p-3 text-[0.62rem] font-mono text-silver border border-white/10">
              {photo.camera && (
                <div className="flex items-center gap-1.5">
                  <Camera size={13} className="text-vermilion" />
                  <span className="text-ivory font-medium">{photo.camera}</span>
                </div>
              )}
              {photo.lens && <span>{photo.lens}</span>}
              {photo.focal && <span className="rounded bg-white/10 px-1.5 py-0.5 text-ivory">{photo.focal}</span>}
              {photo.aperture && <span className="rounded bg-white/10 px-1.5 py-0.5 text-ivory">{photo.aperture}</span>}
              {photo.shutter && <span className="rounded bg-white/10 px-1.5 py-0.5 text-ivory">{photo.shutter}</span>}
              {photo.iso && <span className="rounded bg-white/10 px-1.5 py-0.5 text-ivory">{photo.iso}</span>}
            </div>
          )}

          {/* Navigation Arrows */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photograph (Arrow Left)"
              className="grid h-11 w-11 place-items-center border border-white/25 transition-colors hover:border-vermilion hover:bg-vermilion hover:text-obsidian"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photograph (Arrow Right)"
              className="grid h-11 w-11 place-items-center border border-white/25 transition-colors hover:border-vermilion hover:bg-vermilion hover:text-obsidian"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Thumbnail Filmstrip Bar */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it, idx) => (
            <button
              key={it.id}
              type="button"
              onClick={() => {
                playShutterSound();
                onNavigate(idx);
              }}
              aria-label={`Jump to frame ${idx + 1}: ${it.title}`}
              className={`relative h-12 w-16 shrink-0 overflow-hidden border transition-all ${
                idx === i ? "border-vermilion ring-1 ring-vermilion scale-105" : "border-white/20 opacity-50 hover:opacity-100"
              }`}
            >
              <PhotoImage photo={it} sizes="64px" />
              <span className="mono-label absolute bottom-0.5 right-0.5 bg-black/80 px-1 text-[0.48rem] text-ivory">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
