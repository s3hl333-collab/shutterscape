"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";
import { editorial } from "@/data/content";
import { site } from "@/data/site";
import { PhotoImage } from "./PhotoImage";
import { Parallax } from "./Parallax";
import { playShutterSound } from "@/lib/audio";

function Word({ text, offset = 0, italic = false }: { text: string; offset?: number; italic?: boolean }) {
  return (
    <span className={`block whitespace-nowrap ${italic ? "italic" : ""}`} aria-hidden="true">
      {text.split("").map((c, i) => (
        <span key={i} className="hero-letter" style={{ "--i": i + offset } as React.CSSProperties}>
          <span>{c}</span>
        </span>
      ))}
    </span>
  );
}

function ViewfinderCorners() {
  const c = "absolute h-5 w-5 border-ivory/60 transition-all duration-700 md:h-7 md:w-7";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-3.5 bottom-3.5 top-[4.5rem] z-30 md:inset-x-8 md:bottom-6 md:top-[6.25rem]"
    >
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />

      {/* Optical focus brackets in center */}
      <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 opacity-30 md:h-16 md:w-16">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-ivory" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-ivory" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-ivory" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-ivory" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vermilion" />
      </div>
    </div>
  );
}

export function Hero() {
  const { heroMain, heroSide, heroTiny } = editorial;
  const [timecode, setTimecode] = useState("00:00:00");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setTimecode(`${hh}:${mm}:${ss}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-obsidian pt-16 md:pt-20"
    >
      <ViewfinderCorners />

      {/* Top Camera Metadata Bar (Inside Viewfinder) */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-3 text-[0.62rem] text-silver mono-label md:px-12">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-ivory">
            <span aria-hidden className="rec-dot inline-block h-2 w-2 rounded-full bg-vermilion" />
            REC
          </span>
          <span className="text-ivory font-mono">{timecode}</span>
          <span className="hidden text-silver/60 sm:inline">|</span>
          <span className="hidden sm:inline">35MM FORMAT</span>
          <span className="hidden lg:inline text-silver/60">|</span>
          <span className="hidden lg:inline">PORTRA 400 EMULATION</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-ivory">ƒ/1.4 · 1/250s · ISO 400</span>
          <span className="hidden text-silver/60 sm:inline">|</span>
          <span className="hidden sm:inline font-mono">[-2 · · 0 · · +2]</span>
        </div>
      </div>

      {/* STAGE — expressive typography layered behind and alongside photographs */}
      <div className="relative min-h-[460px] flex-1 lg:min-h-[440px]">
        {/* Plate 01: Hero Main Photograph */}
        <Parallax
          speed={0.05}
          className="absolute right-[5vw] top-[10%] z-10 h-[78%] aspect-[0.72] lg:right-[9vw] lg:top-[2%] lg:h-[90%]"
        >
          <div
            className="hero-photo relative h-full w-full overflow-hidden border border-white/10 shadow-2xl"
            style={{ "--d": "500ms" } as React.CSSProperties}
          >
            <div className="hero-photo-inner absolute inset-0" style={{ "--d": "500ms" } as React.CSSProperties}>
              <PhotoImage photo={heroMain} priority sizes="(min-width:1024px) 28vw, 65vw" />
            </div>
            {/* Film Edge Annotation inside plate */}
            <div className="mono-label absolute bottom-2 left-2 z-20 bg-obsidian/75 px-1.5 py-0.5 text-[0.55rem] text-ivory/80 backdrop-blur-sm">
              PLATE 01 · {heroMain.focal} · {heroMain.aperture}
            </div>
          </div>
        </Parallax>

        {/* Plate 02: Hero Side Photograph */}
        <Parallax
          speed={-0.04}
          className="absolute left-[5vw] top-[48%] z-[15] w-[38vw] lg:left-[6vw] lg:top-[46%] lg:w-[20vw]"
        >
          <div
            className="hero-photo relative aspect-[1.4] overflow-hidden border border-white/10 shadow-2xl"
            style={{ "--d": "800ms" } as React.CSSProperties}
          >
            <div className="hero-photo-inner absolute inset-0" style={{ "--d": "800ms" } as React.CSSProperties}>
              <PhotoImage photo={heroSide} priority sizes="(min-width:1024px) 20vw, 40vw" />
            </div>
            <div className="mono-label absolute bottom-2 left-2 z-20 bg-obsidian/75 px-1.5 py-0.5 text-[0.55rem] text-ivory/80 backdrop-blur-sm">
              PLATE 02 · {heroSide.title}
            </div>
          </div>
          <p className="mono-label mt-2 hidden text-[0.6rem] text-silver lg:block">
            Plate 02 — {heroSide.title} ({heroSide.camera})
          </p>
        </Parallax>

        {/* Plate 03: Hero Tiny Detail */}
        <div className="absolute left-[30vw] top-[64%] z-[15] hidden w-[9.5vw] lg:block">
          <div
            className="hero-photo relative aspect-[1.2] overflow-hidden border border-white/10 shadow-xl"
            style={{ "--d": "1000ms" } as React.CSSProperties}
          >
            <div className="hero-photo-inner absolute inset-0" style={{ "--d": "1000ms" } as React.CSSProperties}>
              <PhotoImage photo={heroTiny} priority sizes="10vw" />
            </div>
          </div>
          <span className="mono-label mt-1 block text-[0.55rem] text-silver/70">Darkroom Desk</span>
        </div>

        <p
          aria-hidden="true"
          className="mono-label absolute bottom-1 right-[9vw] z-20 hidden w-[25vw] text-[0.6rem] text-silver lg:block"
        >
          Plate 01 — {heroMain.title} · {heroMain.location}
        </p>

        {/* Enormous expressive Title */}
        <h1
          aria-label="Shutterspace"
          className="display pointer-events-none absolute inset-x-[4vw] top-[2%] z-20 select-none uppercase text-ivory"
          style={{ fontSize: "min(21vw, 32svh)", lineHeight: 0.8 }}
        >
          <Word text="SHUTTER" />
          <span className="mt-[0.04em] block text-right">
            <Word text="SPACE" offset={7} italic />
          </span>
        </h1>
      </div>

      {/* Copy row & Editorial Callout */}
      <div className="relative z-20 px-6 pb-5 pt-8 md:px-14 lg:pb-6 lg:pt-10">
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <p
            className="hero-fade display text-[clamp(1.65rem,2.7vw,3.1rem)] italic leading-[1.05] tracking-[-0.015em] text-ivory lg:col-span-5"
            style={{ "--d": "1400ms" } as React.CSSProperties}
          >
            We don’t just capture moments.
            <br />
            <span className="text-vermilion">We give them a place to live.</span>
          </p>

          <p
            className="hero-fade max-w-md text-[0.95rem] leading-relaxed text-silver lg:col-span-4 lg:col-start-6 xl:col-span-4 xl:col-start-6"
            style={{ "--d": "1600ms" } as React.CSSProperties}
          >
            A photography collective at GCU, chasing light, preserving fleeting moments, and discovering stories hidden in the
            ordinary.
          </p>

          <div
            className="hero-fade flex items-end justify-between gap-4 lg:col-span-3 lg:col-start-10 lg:justify-end xl:col-span-3 xl:col-start-10"
            style={{ "--d": "1750ms" } as React.CSSProperties}
          >
            <a
              href="#archive"
              onClick={() => playShutterSound()}
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-ivory bg-transparent px-7 py-4 text-ivory transition-colors duration-500 hover:text-obsidian"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-ivory transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100"
              />
              <span className="mono-label relative text-[0.72rem] tracking-wider">Explore our world</span>
              <ArrowUpRight size={16} className="relative transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </div>
        </div>

        {/* Annotation & Location bar */}
        <div className="mono-label mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/15 pt-4 text-[0.62rem] text-silver">
          <span className="flex items-center gap-2">
            <span aria-hidden className="rec-dot inline-block h-1.5 w-1.5 rounded-full bg-vermilion" />
            Photography collective · {site.university} · {site.region} ({site.coordinates})
          </span>

          <span className="hidden items-center gap-3 md:flex" aria-hidden="true">
            <span className="relative h-8 w-px overflow-hidden bg-white/20 scroll-cue" />
            Scroll to descend into the archive
          </span>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playShutterSound()}
            className="inline-flex items-center gap-2 text-ivory transition-colors hover:text-vermilion"
          >
            <Instagram size={13} strokeWidth={1.5} />
            {site.instagramHandle}
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
