"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { photos, categories } from "@/data/photos";
import type { CategorySlug, Photo } from "@/lib/types";
import { Lightbox } from "../Lightbox";
import { playShutterSound } from "@/lib/audio";
import { unsplashLoader } from "@/lib/loader";
import { Eyeball } from "./Eyeball";
import { PixelCamera, PixelFlower, PixelStar } from "./PixelElements";
import { Wildflowers } from "./Wildflowers";
import { Eye, MapPin, Sparkles, Filter, Tv } from "lucide-react";

type FilterType = "all" | CategorySlug;

interface FrameProps {
  photo: Photo;
  index: number;
  onOpen: () => void;
}

// 1. Retro CRT TV Frame
function TVFrame({ photo, index, onOpen }: FrameProps) {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer rounded-2xl border-3 border-ink bg-[#f0e6cf] p-3 shadow-[6px_7px_0px_rgba(20,19,18,0.9)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-1"
      style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1}deg)` }}
    >
      <div className="mb-2 flex items-center justify-between text-[0.62rem] font-mono px-1">
        <span className="pixel-text text-ink font-bold">CH 0{index + 1} · CRT FEED</span>
        <span className="text-vermilion animate-pulse font-bold">● LIVE</span>
      </div>
      <div className="crt-screen relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-ink bg-black">
        <Image
          loader={unsplashLoader}
          src={photo.url ?? photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width:1024px) 30vw, 90vw"
        />
        <div className="absolute bottom-2 left-2 z-30 bg-black/75 px-2 py-0.5 rounded text-[0.62rem] font-mono text-crtGreen">
          {photo.title}
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[0.65rem] font-mono text-ink/70 px-1">
        <span>{photo.photographer ?? "GCU Student"}</span>
        <span className="text-vermilion">{photo.focal ?? "35mm"}</span>
      </div>
    </div>
  );
}

// 2. Vintage Polaroid with Masking Tape
function PolaroidFrame({ photo, index, onOpen }: FrameProps) {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer border-2 border-ink bg-[#fffef9] p-3 pb-6 shadow-[5px_6px_0px_rgba(20,19,18,0.85)] transition-transform duration-300 hover:-translate-y-1.5"
      style={{ transform: `rotate(${index % 3 === 0 ? 2.5 : -2}deg)` }}
    >
      {/* Masking tape on top edge */}
      <div className="masking-tape -top-2.5 left-1/3 w-20" />

      <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink/40 bg-graphite">
        <Image
          loader={unsplashLoader}
          src={photo.url ?? photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: photo.mono ? "grayscale(1) contrast(1.1)" : undefined }}
          sizes="(min-width:1024px) 30vw, 90vw"
        />
      </div>

      <div className="mt-3 px-1">
        <p className="display text-lg italic leading-tight text-ink group-hover:text-vermilion transition-colors">
          {photo.title}
        </p>
        <div className="mt-1 flex items-center justify-between text-[0.65rem] font-mono text-ink/60">
          <span>{photo.location ?? "Guwahati"}</span>
          <span className="dymo-label py-0.5 px-1.5 text-[0.55rem]">POLAROID</span>
        </div>
      </div>
    </div>
  );
}

// 3. Serrated Postage Stamp Frame with Botanical Wildflower
function StampFrame({ photo, index, onOpen }: FrameProps) {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer stamp-border border-2 border-dashed border-ink/40 bg-[#faf4e6] p-4 shadow-[4px_5px_0px_rgba(20,19,18,0.7)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-1"
      style={{ transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)` }}
    >
      <div className="relative aspect-square w-full overflow-hidden border-2 border-ink bg-graphite">
        <Image
          loader={unsplashLoader}
          src={photo.url ?? photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width:1024px) 30vw, 90vw"
        />
        {/* Botanical Wildflower sprig in corner */}
        <div className="absolute -bottom-3 -right-3 z-10 pointer-events-none">
          <Wildflowers size={60} type="single" />
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <div>
          <span className="pixel-text text-xs text-vermilion block">POSTAGE NO. {index + 10}</span>
          <h4 className="display text-base italic leading-tight text-ink">{photo.title}</h4>
        </div>
        <span className="text-[0.6rem] font-mono border border-ink/40 rounded px-1.5 py-0.5 bg-[#f0e6cf]">
          {photo.year ?? "2024"}
        </span>
      </div>
    </div>
  );
}

// 4. Classical Stoic Carved Frame
function StoicFrame({ photo, index, onOpen }: FrameProps) {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer border-3 border-ink bg-[#f5ecda] p-3 shadow-[6px_7px_0px_rgba(20,19,18,0.9)] transition-transform duration-300 hover:-translate-y-1"
      style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1.5}deg)` }}
    >
      <div className="mb-1.5 flex items-center justify-between text-[0.62rem] font-mono border-b border-ink/20 pb-1">
        <span className="text-ink font-bold">🏛️ GCU ARCHIVE</span>
        <span className="italic text-ink/70">ARS MEMORIAE</span>
      </div>

      <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-ink bg-graphite">
        <Image
          loader={unsplashLoader}
          src={photo.url ?? photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: photo.mono ? "grayscale(1) contrast(1.15)" : undefined }}
          sizes="(min-width:1024px) 30vw, 90vw"
        />
      </div>

      <div className="mt-2 text-center">
        <span className="dymo-label text-[0.65rem] bg-ink text-ivory py-0.5 px-2">
          {photo.title}
        </span>
      </div>
    </div>
  );
}

// 5. Giant Circular Eye Peephole Frame
function EyeFrame({ photo, index, onOpen }: FrameProps) {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer flex flex-col items-center border-2 border-ink bg-[#fffef9] p-4 rounded-3xl shadow-[5px_6px_0px_rgba(20,19,18,0.85)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
    >
      <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-full border-4 border-ink bg-black shadow-inner">
        <Image
          loader={unsplashLoader}
          src={photo.url ?? photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="280px"
        />
        {/* Optical Target Crosshair Overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-75 transition-opacity">
          <div className="h-full w-px bg-vermilion" />
          <div className="w-full h-px bg-vermilion absolute" />
          <div className="h-16 w-16 rounded-full border border-vermilion absolute" />
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className="pixel-text text-sm font-bold text-vermilion block">THE WATCHER&rsquo;S LENS</span>
        <span className="display text-lg italic text-ink">{photo.title}</span>
      </div>
    </div>
  );
}

// 6. Panoramic Cinematic Letterbox Frame
function PanoramicFrame({ photo, index, onOpen }: FrameProps) {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer md:col-span-2 border-3 border-ink bg-[#141210] p-3 shadow-[7px_8px_0px_rgba(20,19,18,0.95)] text-ivory transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="mb-2 flex items-center justify-between text-[0.62rem] font-mono px-1 text-silver">
        <span className="text-vermilion font-bold">PANORAMA // 2.39:1 CINEMASCOPE</span>
        <span>LAT: {photo.location ?? "GCU ASSAM"}</span>
      </div>

      <div className="relative aspect-[2.39/1] w-full overflow-hidden border border-white/20 bg-graphite">
        <Image
          loader={unsplashLoader}
          src={photo.url ?? photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
          <div>
            <h4 className="display text-2xl italic text-white drop-shadow-md">{photo.title}</h4>
            <p className="text-xs font-mono text-silver">
              Photographer: {photo.photographer} · {photo.camera}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. 8-Bit Pixel GameBoy Frame
function GlitchFrame({ photo, index, onOpen }: FrameProps) {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer border-3 border-ink bg-[#c8ded0] p-3 shadow-[5px_6px_0px_rgba(20,19,18,0.9)] transition-transform duration-300 hover:-translate-y-1"
      style={{ transform: `rotate(${index % 2 === 0 ? 1.5 : -1.5}deg)` }}
    >
      <div className="mb-1.5 flex items-center justify-between text-[0.65rem] font-mono">
        <span className="pixel-text font-bold text-ink flex items-center gap-1">
          <PixelCamera size={18} /> GAMEBOY CAM &apos;98
        </span>
        <span className="pixel-text text-vermilion">DOT MATRIX</span>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-ink bg-[#2b3d2f]">
        <Image
          loader={unsplashLoader}
          src={photo.url ?? photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width:1024px) 30vw, 90vw"
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-[0.68rem] font-mono">
        <span className="pixel-text text-ink truncate font-bold">{photo.title}</span>
        <span className="dymo-label text-[0.55rem] py-0 px-1 bg-ink text-ivory">8-BIT</span>
      </div>
    </div>
  );
}

export function WeirdGallery() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (filter === "all") return photos;
    return photos.filter((p) => p.category === filter);
  }, [filter]);

  const handleOpenPhoto = (idx: number) => {
    playShutterSound();
    setOpenIndex(idx);
  };

  return (
    <section id="gallery" className="relative bg-[#faf5eb] py-24 sm:py-36 border-b-4 border-ink">
      <div className="mx-auto max-w-[1700px] px-5 sm:px-10">
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b-2 border-ink pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="dymo-label dymo-red text-xs">SECTION 01</span>
              <span className="pixel-text text-sm font-bold text-ink">
                ANOMALY GALLERY // GCU PHOTOGRAPHY ARCHIVE
              </span>
            </div>
            <h2
              className="display uppercase tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}
            >
              The Gallary
              <span className="italic text-vermilion ml-3">of Strange</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm font-mono text-ink/80 leading-relaxed">
              Every frame here has a distinct visual container, aspect ratio, and physical texture. No uniform cards. Tap any image to
              enter full-screen inspection mode.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-14 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              playShutterSound();
              setFilter("all");
            }}
            className={`pixel-text text-sm py-2 px-4 border-2 border-ink shadow-[2px_3px_0px_rgba(20,19,18,0.8)] transition-all ${
              filter === "all"
                ? "bg-vermilion text-white font-bold translate-y-0.5 shadow-none"
                : "bg-[#fffdf9] text-ink hover:bg-[#ede0cc]"
            }`}
          >
            ★ ALL STRANGE FRAMES ({photos.length})
          </button>

          {categories.map((c) => {
            const count = photos.filter((p) => p.category === c.slug).length;
            const isSelected = filter === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => {
                  playShutterSound();
                  setFilter(c.slug);
                }}
                className={`pixel-text text-sm py-2 px-3.5 border-2 border-ink shadow-[2px_3px_0px_rgba(20,19,18,0.8)] transition-all ${
                  isSelected
                    ? "bg-ink text-white font-bold translate-y-0.5 shadow-none"
                    : "bg-[#fffdf9] text-ink hover:bg-[#ede0cc]"
                }`}
              >
                {c.label.toUpperCase()} ({count})
              </button>
            );
          })}
        </div>

        {/* Varied Asymmetrical Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredPhotos.map((photo, i) => {
            // Pick a distinct frame style based on index or explicit style
            const style = photo.frameStyle ?? (i % 7 === 0 ? "tv" : i % 7 === 1 ? "polaroid" : i % 7 === 2 ? "stamp" : i % 7 === 3 ? "stoic" : i % 7 === 4 ? "eye" : i % 7 === 5 ? "panoramic" : "glitch");

            if (style === "tv") return <TVFrame key={photo.id} photo={photo} index={i} onOpen={() => handleOpenPhoto(i)} />;
            if (style === "polaroid") return <PolaroidFrame key={photo.id} photo={photo} index={i} onOpen={() => handleOpenPhoto(i)} />;
            if (style === "stamp") return <StampFrame key={photo.id} photo={photo} index={i} onOpen={() => handleOpenPhoto(i)} />;
            if (style === "stoic") return <StoicFrame key={photo.id} photo={photo} index={i} onOpen={() => handleOpenPhoto(i)} />;
            if (style === "eye") return <EyeFrame key={photo.id} photo={photo} index={i} onOpen={() => handleOpenPhoto(i)} />;
            if (style === "panoramic") return <PanoramicFrame key={photo.id} photo={photo} index={i} onOpen={() => handleOpenPhoto(i)} />;
            return <GlitchFrame key={photo.id} photo={photo} index={i} onOpen={() => handleOpenPhoto(i)} />;
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredPhotos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(idx) => setOpenIndex(idx)}
      />
    </section>
  );
}
