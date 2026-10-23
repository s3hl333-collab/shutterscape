"use client";

import { ArrowUp, ArrowUpRight, Instagram, MapPin, Sparkles, Eye } from "lucide-react";
import { site } from "@/data/site";
import { playShutterSound } from "@/lib/audio";
import { Eyeball } from "./Eyeball";
import { PixelCloud, PixelStar, PixelCamera, PixelUFO } from "./PixelElements";
import { CelestialPlanet, AlienObserver } from "./SpaceAlien";
import { CelestialDragon, EagleAndSerpent } from "./DragonAndSerpent";
import { Wildflowers } from "./Wildflowers";

export function WeirdFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#141210] text-[#faf5eb] border-t-4 border-ink">
      {/* Background Floating Pixel Elements in Dark Space */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <PixelStar size={16} className="absolute left-[10%] top-[15%]" />
        <PixelStar size={20} className="absolute right-[15%] top-[25%]" />
        <PixelStar size={14} className="absolute left-[45%] top-[60%]" />
        <PixelStar size={18} className="absolute right-[35%] top-[75%]" />
        <PixelCloud size={190} className="absolute -left-10 top-20" />
        <PixelCloud size={240} className="absolute -right-16 top-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1700px] px-5 sm:px-10 pt-20 pb-12">
        {/* Top Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b-2 border-white/15 pb-16 items-start">
          {/* Column 1: Philosophy & University Badge (Span 5) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="dymo-label dymo-red text-xs">FINAL TRANSMISSION</span>
              <span className="pixel-text text-xs text-crtGreen">ARCHIVE FREQUENCY 404.99 MHZ</span>
            </div>

            <h3 className="display text-3xl sm:text-4xl lg:text-5xl italic text-cream leading-tight">
              &ldquo;Some moments disappear. Some become photographs. Some become a strange part of us.&rdquo;
            </h3>

            <p className="text-sm font-mono text-silver leading-relaxed max-w-lg">
              Shutterspace is the weirdcore photography collective of Girijananda Chowdhury University (GCU), Azara, Guwahati.
              Blending analog film traditions, surrealist collage, and experimental observation of our shared reality.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <span className="pixel-text text-xs text-amberOchre">
                ★ 35MM · SILVER GELATIN · RETRO CRT · LIMINAL EXPLORATION
              </span>
            </div>
          </div>

          {/* Column 2: Surveillance Node Eyeball & Botanical (Span 3) */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 border-2 border-white/20 bg-[#1c1a17] shadow-[5px_6px_0px_rgba(0,0,0,0.8)] relative">
            <div className="masking-tape -top-3 left-4 w-24" />
            <span className="pixel-text text-[0.65rem] text-crtGreen mb-3">
              NODE STATUS: MONITORING
            </span>
            <Eyeball size={120} label="THE NIGHT SEES" />
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-silver">
              <Sparkles size={12} className="text-vermilion" />
              <span>PUPIL SENSOR ACTIVE</span>
            </div>
          </div>

          {/* Column 3: Contact, Instagram & Location (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border-2 border-white/20 bg-[#1a1815] p-5 shadow-[4px_5px_0px_rgba(0,0,0,0.7)]">
              <span className="pixel-text block text-xs text-vermilion font-bold mb-3">
                // CONNECT FREQUENCY
              </span>

              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playShutterSound()}
                className="group flex items-center justify-between border-2 border-white/25 bg-[#fffef9] px-4 py-3 text-ink shadow-[3px_4px_0px_rgba(215,59,34,1)] transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2.5">
                  <Instagram size={18} className="text-vermilion" />
                  <span className="pixel-text text-sm font-bold">{site.instagramHandle}</span>
                </div>
                <ArrowUpRight size={16} className="text-vermilion transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="mt-4 space-y-2 text-xs font-mono text-silver">
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="text-vermilion shrink-0 mt-0.5" />
                  <span>
                    Girijananda Chowdhury University (GCU)
                    <br />
                    NH-37, Azara, Hatkhowapara, Guwahati, Assam 781017
                  </span>
                </p>
                <p className="text-[0.7rem] text-silver/70 pl-5">
                  Coordinates: {site.coordinates}
                </p>
              </div>
            </div>

            {/* Back to top button */}
            <div className="flex justify-end">
              <a
                href="#top"
                onClick={() => playShutterSound()}
                className="group flex items-center gap-3 border-2 border-white/30 bg-[#25221e] px-5 py-3 text-cream transition-all hover:border-vermilion hover:bg-vermilion hover:text-ink shadow-[4px_5px_0px_rgba(0,0,0,0.9)]"
              >
                <span className="pixel-text text-xs font-bold tracking-wider">
                  RETURN TO UPPER STRATA [TOP]
                </span>
                <span className="grid h-7 w-7 place-items-center border border-white/40 bg-black/40 group-hover:border-ink group-hover:bg-ink group-hover:text-cream transition-colors">
                  <ArrowUp size={14} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* University Signature Line */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-silver">
          <span>
            © {new Date().getFullYear()} SHUTTERSPACE · Girijananda Chowdhury University (GCU)
          </span>
          <span className="pixel-text text-amberOchre">
            DEVELOPED FOR GCU PHOTOGRAPHY COLLECTIVE · AZARA CAMPUS
          </span>
          <span className="text-silver/60">
            ALL LIGHT AND TIME RECORDED · DREAMCORE EDITION
          </span>
        </div>
      </div>

      {/* Colossal Bottom Wordmark */}
      <div
        aria-hidden="true"
        className="display -mb-[0.18em] select-none whitespace-nowrap text-center uppercase leading-[0.78] tracking-[-0.05em] text-[#221f1c] select-none"
        style={{ fontSize: "clamp(4.5rem, 23vw, 420px)" }}
      >
        SHUTTERSPACE
      </div>
    </footer>
  );
}
