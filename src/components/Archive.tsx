"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { categories, photos } from "@/data/photos";
import type { CategorySlug, Photo } from "@/lib/types";
import { site } from "@/data/site";
import { playShutterSound } from "@/lib/audio";
import { Lightbox } from "./Lightbox";
import { PhotoImage } from "./PhotoImage";
import { Lines, Reveal } from "./Reveal";
import { LayoutGrid, Columns, MapPin, Camera } from "lucide-react";

type Filter = "all" | CategorySlug;
type LayoutMode = "masonry" | "contact" | "columns";

/** Round-robin across categories so "All" feels artfully mixed rather than grouped. */
function interleave(list: Photo[]) {
  const buckets = categories.map((c) => list.filter((p) => p.category === c.slug));
  const out: Photo[] = [];
  for (let i = 0; out.length < list.length; i++) {
    for (const b of buckets) if (b[i]) out.push(b[i]);
  }
  return out;
}

export function Archive() {
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState<Filter>("all");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("masonry");
  const [fading, setFading] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const items = useMemo(
    () => (shown === "all" ? interleave(photos) : photos.filter((p) => p.category === shown)),
    [shown],
  );

  const choose = (f: Filter) => {
    if (f === filter) return;
    playShutterSound();
    setFilter(f);
    setFading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(f);
      setFading(false);
    }, 280);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const close = useCallback(() => setOpen(null), []);
  const activeCat = categories.find((c) => c.slug === filter);

  return (
    <section id="archive" className="relative bg-obsidian">
      <div className="mx-auto max-w-[1800px] px-4 pb-28 pt-24 md:px-10 md:pb-40 md:pt-40">
        <header className="mb-12 grid gap-8 px-2 md:mb-20 md:px-4 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="mono-label mb-6 text-[0.65rem] text-vermilion">Nº 02 — Curated Collections</p>
            <Lines
              as="h2"
              className="display text-[clamp(4.2rem,15vw,15.5rem)] uppercase leading-[0.8] tracking-[-0.045em] text-ivory"
              lines={[
                "The",
                <span key="a" className="italic lg:pl-[14%]">
                  Archive
                </span>,
              ]}
            />
          </div>
          <Reveal className="self-end lg:col-span-3" delay={200}>
            <p className="text-[0.95rem] leading-relaxed text-silver">
              Six curated collections, one way of seeing. Every frame here represents moments captured by the Shutterspace collective at
              Girijananda Choudhury University and on field expeditions.
            </p>
            <p className="mono-label mt-4 text-[0.6rem] text-silver/60">
              Easily expanded via <code className="font-mono text-ivory">src/data/photos.ts</code>
            </p>
          </Reveal>
        </header>

        {/* Filters and Layout Bar */}
        <div className="mb-10 flex flex-col gap-6 border-y border-white/15 px-2 py-5 md:flex-row md:items-center md:justify-between md:px-4">
          <div role="group" aria-label="Filter the archive by collection" className="flex flex-wrap gap-x-6 gap-y-3">
            {(
              [
                { slug: "all", label: "All", count: photos.length },
                ...categories.map((c) => ({
                  slug: c.slug,
                  label: c.label,
                  count: photos.filter((p) => p.category === c.slug).length,
                })),
              ] as { slug: Filter; label: string; count: number }[]
            ).map((c) => (
              <button
                key={c.slug}
                type="button"
                aria-pressed={filter === c.slug}
                onClick={() => choose(c.slug)}
                className={`mono-label group relative flex items-baseline gap-2 py-1.5 text-[0.72rem] transition-colors ${
                  filter === c.slug ? "text-ivory font-bold" : "text-silver hover:text-ivory"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 self-center rounded-full bg-vermilion transition-transform duration-500 ${
                    filter === c.slug ? "scale-100" : "scale-0"
                  }`}
                />
                {c.label}
                <sup className="text-[0.55rem] text-silver/80">{String(c.count).padStart(2, "0")}</sup>
              </button>
            ))}
          </div>

          {/* Grid Layout Switcher */}
          <div className="flex items-center gap-2 text-silver mono-label text-[0.65rem]">
            <span className="hidden lg:inline text-silver/60">LAYOUT:</span>
            <button
              type="button"
              onClick={() => setLayoutMode("masonry")}
              className={`p-1.5 transition-colors ${
                layoutMode === "masonry" ? "text-vermilion" : "text-silver hover:text-ivory"
              }`}
              title="Masonry Gallery"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode("contact")}
              className={`p-1.5 transition-colors ${
                layoutMode === "contact" ? "text-vermilion" : "text-silver hover:text-ivory"
              }`}
              title="35mm Contact Sheet Mode"
            >
              <Columns size={15} />
            </button>
          </div>
        </div>

        {/* Active collection description statement */}
        <div className="mb-8 px-2 md:px-4">
          <p className="display min-h-[1.6em] text-[1.3rem] italic text-silver/90" aria-live="polite">
            {activeCat ? activeCat.blurb : "Everything we have framed so far across Assam, GCU, and beyond."}
          </p>
        </div>

        {/* Gallery Grid */}
        <ul
          className={`transition-[opacity,transform] duration-300 ${
            layoutMode === "masonry"
              ? "columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:balance]"
              : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          } ${fading ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"}`}
        >
          {items.map((p, n) => (
            <li
              key={p.id}
              className={`tile-in ${
                layoutMode === "masonry" ? "mb-4 break-inside-avoid" : "aspect-square"
              }`}
              style={{ "--i": n } as React.CSSProperties}
            >
              <button
                type="button"
                data-cursor="view"
                onClick={() => {
                  playShutterSound();
                  setOpen(n);
                }}
                aria-label={`Open ${p.title}, ${categories.find((c) => c.slug === p.category)?.label}`}
                className="group relative block w-full overflow-hidden bg-graphite text-left border border-white/10"
                style={layoutMode === "masonry" ? { aspectRatio: p.ratio } : { height: "100%" }}
              >
                <div className="absolute inset-0 transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]">
                  <PhotoImage photo={p} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                </div>

                {/* Darkroom Contact Sheet Annotation (Always subtly visible on bottom border) */}
                <div className="absolute top-2 left-2 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mono-label rounded bg-black/80 px-2 py-0.5 text-[0.55rem] text-vermilion">
                    EXP {String(n + 1).padStart(2, "0")}A
                  </span>
                </div>

                {/* Elegant Hover Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100 md:p-5">
                  <div className="flex items-center gap-2 translate-y-2 transition-transform duration-500 group-hover:translate-y-0 [@media(hover:none)]:translate-y-0">
                    <span className="mono-label text-[0.6rem] text-vermilion font-bold">
                      {categories.find((c) => c.slug === p.category)?.label}
                    </span>
                    {p.location && (
                      <span className="mono-label flex items-center gap-1 text-[0.58rem] text-silver">
                        <MapPin size={10} /> {p.location}
                      </span>
                    )}
                  </div>

                  <span className="display translate-y-2 text-[1.6rem] italic leading-tight text-ivory transition-transform delay-75 duration-500 group-hover:translate-y-0 [@media(hover:none)]:translate-y-0 md:text-[1.85rem]">
                    {p.title}
                  </span>

                  <div className="mt-1 flex items-center justify-between translate-y-2 transition-transform delay-100 duration-500 group-hover:translate-y-0 [@media(hover:none)]:translate-y-0">
                    <span className="mono-label text-[0.62rem] text-silver">
                      {p.photographer ?? site.sampleCredit}
                    </span>
                    {p.focal && (
                      <span className="mono-label text-[0.55rem] text-silver/70">
                        {p.focal} · {p.aperture}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox items={items} index={open} onClose={close} onNavigate={setOpen} />
    </section>
  );
}
