"use client";

import { ArrowUp, ArrowUpRight, Instagram, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { playShutterSound } from "@/lib/audio";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto max-w-[1800px] px-6 pt-20 md:px-14 md:pt-32">
        <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-12">
          {/* Closing Statement */}
          <div className="lg:col-span-6">
            <span className="mono-label text-[0.62rem] text-vermilion tracking-widest block mb-4">
              COLOPHON & FINAL FRAME
            </span>
            <p className="display text-[clamp(1.9rem,3.4vw,3.6rem)] italic leading-[1.05] tracking-[-0.02em] text-ivory">
              The last page is just the next frame. Go and look at something properly today.
            </p>
            <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-silver">
              Founded at Girijananda Choudhury University to nurture visual literacy, celebrate the art of seeing, and preserve
              ephemeral stories across Assam and beyond.
            </p>
          </div>

          {/* Quick Details & Instagram */}
          <ul className="mono-label space-y-3.5 text-[0.68rem] lg:col-span-3 lg:col-start-8">
            <li className="text-white/40 pb-1">CONNECT</li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playShutterSound()}
                className="inline-flex items-center gap-2 text-ivory transition-colors hover:text-vermilion font-medium"
              >
                <Instagram size={14} /> {site.instagramHandle} <ArrowUpRight size={13} />
              </a>
            </li>
            <li className="text-silver">{site.university}</li>
            <li className="text-silver flex items-center gap-1.5">
              <MapPin size={11} className="text-vermilion" /> {site.region} ({site.coordinates})
            </li>
          </ul>

          {/* Back to top */}
          <div className="flex items-end lg:col-span-2 lg:col-start-11 lg:justify-end">
            <a
              href="#top"
              onClick={() => playShutterSound()}
              className="mono-label group inline-flex items-center gap-3 text-[0.68rem] text-ivory transition-colors hover:text-vermilion"
            >
              <span>Back to top</span>
              <span className="grid h-11 w-11 place-items-center border border-white/25 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-vermilion group-hover:bg-vermilion group-hover:text-obsidian">
                <ArrowUp size={16} />
              </span>
            </a>
          </div>
        </div>

        {/* Art book signature line */}
        <div className="mono-label flex flex-wrap items-center justify-between gap-4 py-8 text-[0.65rem] text-silver">
          <span>© {new Date().getFullYear()} Shutterspace · Girijananda Choudhury University (GCU)</span>
          <span className="italic normal-case tracking-normal [font-family:var(--font-display)] text-[1.2rem] text-ivory">
            Made of light, time, and perspective.
          </span>
          <span className="text-silver/60">35MM · SILVER GELATIN · KODAK ARCHIVES</span>
        </div>
      </div>

      {/* Massive final-page wordmark */}
      <div
        aria-hidden="true"
        className="display -mb-[0.16em] select-none whitespace-nowrap text-center uppercase leading-[0.78] tracking-[-0.05em] text-ivory/95"
        style={{ fontSize: "min(22.8vw, 490px)" }}
      >
        Shutterspace
      </div>
    </footer>
  );
}
