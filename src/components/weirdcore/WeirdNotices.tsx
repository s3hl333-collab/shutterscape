"use client";

import { noticeItems, site } from "@/data/site";
import { playShutterSound } from "@/lib/audio";
import { PixelCamera, PixelStar } from "./PixelElements";
import { Wildflowers } from "./Wildflowers";
import { Calendar, MapPin, AlertCircle, ArrowUpRight, Radio, Tag } from "lucide-react";

export function WeirdNotices() {
  return (
    <section id="notices" className="relative bg-[#faf5eb] py-24 sm:py-36 border-b-4 border-ink">
      <div className="mx-auto max-w-[1700px] px-5 sm:px-10">
        {/* Ticker Tape */}
        <div className="mb-12 overflow-hidden border-2 border-ink bg-[#141210] py-2 text-crtGreen shadow-[4px_5px_0px_rgba(20,19,18,0.9)]">
          <div className="flex w-max animate-pixel-scroll gap-8 pixel-text text-sm">
            <span>● TRANSMISSION INTERCEPTED: GIRIJANANDA CHOWDHURY UNIVERSITY</span>
            <span>★ SHUTTERSPACE EXPEDITION NO. 04</span>
            <span>⚡ NEXT PHOTO WALK: THE MIDNIGHT ROOFTOP RUN</span>
            <span>👁️ KEEP YOUR LENSES CLEAN AND EYES OPEN</span>
            <span>▲ APERTURE ƒ/1.4 · ISO 400 · 35MM GRAIN</span>
            <span>● TRANSMISSION INTERCEPTED: GIRIJANANDA CHOWDHURY UNIVERSITY</span>
            <span>★ SHUTTERSPACE EXPEDITION NO. 04</span>
            <span>⚡ NEXT PHOTO WALK: THE MIDNIGHT ROOFTOP RUN</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b-2 border-ink pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="dymo-label dymo-red text-xs">SECTION 03</span>
              <span className="pixel-text text-sm font-bold text-ink">
                BULLETIN BOARD // TRANSMISSIONS &amp; EXPEDITIONS
              </span>
            </div>
            <h2
              className="display uppercase tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8rem)" }}
            >
              Events
              <span className="italic text-vermilion ml-3">&amp; Notices</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm font-mono text-ink/80 leading-relaxed">
              Official bulletins, photo walks, chemical darkroom sessions, and exhibition deadlines for Girijananda Chowdhury
              University students.
            </p>
          </div>
        </div>

        {/* Asymmetrical Bulletin Cards (Varied Sizes & Rotations) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {noticeItems.map((notice, idx) => {
            const isLarge = idx === 0 || idx === 2;
            const rotation = idx % 2 === 0 ? "-rotate-1" : "rotate-1";

            return (
              <div
                key={notice.id}
                className={`group relative border-3 border-ink bg-[#fffdf9] p-6 shadow-[6px_8px_0px_rgba(20,19,18,0.9)] transform ${rotation} transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[9px_11px_0px_rgba(20,19,18,0.95)] ${
                  isLarge ? "md:p-8" : "md:p-6"
                }`}
              >
                {/* Masking tape on header */}
                <div className={`masking-tape -top-3 ${idx % 2 === 0 ? "left-6" : "right-8"} w-24`} />

                {/* Notice Top Bar */}
                <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="dymo-label text-[0.62rem] bg-ink text-white py-0.5 px-2">
                      {notice.code}
                    </span>
                    <span className="pixel-text text-xs text-vermilion font-bold">
                      {notice.category}
                    </span>
                  </div>

                  <span className="dymo-label dymo-red text-[0.55rem] py-0.5 px-1.5">
                    {notice.badge}
                  </span>
                </div>

                {/* Title & Date */}
                <h3 className="display text-2xl sm:text-3xl italic leading-tight text-ink group-hover:text-vermilion transition-colors">
                  {notice.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs font-mono text-ink/75">
                  <span className="flex items-center gap-1.5 font-bold text-vermilion">
                    <Calendar size={13} /> {notice.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-ink/60" /> {notice.venue}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm font-mono text-ink/80 leading-relaxed border-t border-ink/15 pt-3">
                  {notice.description}
                </p>

                {/* Footer Stamp & Instagram RSVP link */}
                <div className="mt-5 flex items-center justify-between border-t border-ink/20 pt-3 text-[0.65rem] font-mono">
                  <span className="rounded border border-ink/40 bg-[#f4ece0] px-2 py-0.5 text-ink/70">
                    {notice.stamp}
                  </span>

                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playShutterSound()}
                    className="inline-flex items-center gap-1 font-bold text-vermilion hover:underline underline-offset-4"
                  >
                    <span>RSVP ON INSTAGRAM</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
