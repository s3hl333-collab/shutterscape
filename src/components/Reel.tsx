"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reel } from "@/data/content";
import { playShutterSound } from "@/lib/audio";
import { Lightbox } from "./Lightbox";
import { PhotoImage } from "./PhotoImage";

export function Reel() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [height, setHeight] = useState<number | undefined>();
  const [frame, setFrame] = useState(1);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (!desktop) {
      setHeight(undefined);
      return;
    }
    const t = track.current!;
    const s = section.current!;
    let max = 0;
    let raf = 0;

    const measure = () => {
      max = Math.max(0, t.scrollWidth - window.innerWidth);
      setHeight(max + window.innerHeight);
      update();
    };
    const update = () => {
      const r = s.getBoundingClientRect();
      const p = max ? Math.min(1, Math.max(0, -r.top / max)) : 0;
      t.style.transform = `translate3d(${-p * max}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setFrame(Math.min(reel.length, Math.floor(p * reel.length * 0.999) + 1));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
      t.style.transform = "";
    };
  }, [desktop]);

  const Frames = (
    <div className="inline-flex w-max flex-col bg-[#110f0d] border-y border-white/10 shadow-2xl">
      {/* Top Film Edge with Sprocket Perforations & Negative Stencils */}
      <div className="film-edge !bg-[#151310] !py-2.5 px-6 flex items-center justify-between text-[0.55rem] font-mono text-[#d49b45]">
        <span className="tracking-widest">KODAK TRI-X 400 · PANCHROMATIC SAFETY FILM · GCU ARCHIVES</span>
        <div className="sprockets w-[65%]" />
        <span className="tracking-widest">EXP. 36 · ISO 400</span>
      </div>

      {/* Film frames */}
      <ul className="flex gap-4 px-6 py-4 lg:gap-6 lg:px-8">
        {reel.map((p, i) => (
          <li key={p.id} className="shrink-0 snap-center">
            <button
              type="button"
              data-cursor="view"
              onClick={() => {
                playShutterSound();
                setOpen(i);
              }}
              aria-label={`Open frame ${i + 1}: ${p.title}`}
              className="group relative block aspect-[1.5] w-[80vw] overflow-hidden bg-graphite border border-white/15 sm:w-[62vw] lg:h-[52vh] lg:w-auto"
            >
              <div className="absolute inset-0 transition-transform duration-[1600ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]">
                <PhotoImage photo={p} sizes="(min-width:1024px) 75vh, 80vw" />
              </div>
              <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                <span className="mono-label rounded bg-black/80 px-3 py-1 text-[0.68rem] text-ivory">
                  INSPECT FRAME
                </span>
              </div>
            </button>
            <div className="mono-label mt-3 flex items-center justify-between text-[0.62rem] text-silver">
              <span className="text-[#e2933a] font-bold">▸ {String(i + 1).padStart(2, "0")}A</span>
              <span className="text-ivory font-medium">{p.title}</span>
              <span className="text-silver/60">{p.focal}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Bottom Film Edge with Sprocket Perforations & Frame Markers */}
      <div className="film-edge !bg-[#151310] !py-2.5 px-6 flex items-center justify-between text-[0.55rem] font-mono text-[#d49b45]">
        <span className="tracking-widest">EMULSION 2024 · GUWAHATI</span>
        <div className="sprockets w-[65%]" />
        <span className="tracking-widest">LAT 26.1158° N, 91.5647° E</span>
      </div>
    </div>
  );

  return (
    <section
      id="reel"
      ref={section}
      aria-label="Roll Nº 01 — a horizontal reel of analog photographs"
      className="relative bg-[#0d0c0b]"
      style={desktop && height ? { height } : undefined}
    >
      <div className={desktop ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24"}>
        <div className="mx-auto flex w-full max-w-[1800px] items-end justify-between gap-6 px-6 pb-8 md:px-14 lg:pb-10">
          <div>
            <p className="mono-label mb-3 text-[0.65rem] text-vermilion">Nº 03 — Roll 01 / 35mm Analog Strip</p>
            <h2 className="display text-[clamp(2.6rem,5.6vw,5.8rem)] italic leading-[0.9] tracking-[-0.03em] text-ivory">
              Unhurried <span className="not-italic">light</span>
            </h2>
          </div>
          <p className="mono-label hidden text-right text-[0.62rem] text-silver md:block">
            {desktop ? "Scroll downwards — the 35mm negative advances" : "Swipe horizontally to advance the negative"}
            <br />
            Field expeditions · Assam & Eastern Himalayas
          </p>
        </div>

        {desktop ? (
          <div ref={track} className="will-change-transform">
            {Frames}
          </div>
        ) : (
          <div className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {Frames}
          </div>
        )}

        {desktop && (
          <div className="mx-auto mt-8 flex w-full max-w-[1800px] items-center gap-6 px-14">
            <span className="mono-label text-[0.65rem] text-ivory font-bold" aria-hidden>
              FRAME {String(frame).padStart(2, "0")} / {String(reel.length).padStart(2, "0")}
            </span>
            <span aria-hidden className="relative h-px flex-1 bg-white/20">
              <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-vermilion transition-transform duration-75" />
            </span>
          </div>
        )}
      </div>
      <Lightbox items={reel} index={open} onClose={close} onNavigate={setOpen} />
    </section>
  );
}
