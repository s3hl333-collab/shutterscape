"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Instagram, Sparkles, Eye, Tv, Compass } from "lucide-react";
import { Eyeball } from "./Eyeball";
import { RetroTV } from "./RetroTV";
import { StoicArt } from "./StoicArt";
import { CelestialDragon, EagleAndSerpent } from "./DragonAndSerpent";
import { PixelCloud, PixelCamera, PixelUFO, PixelStar, PixelFlower } from "./PixelElements";
import { Wildflowers } from "./Wildflowers";
import { AlienObserver, CelestialPlanet } from "./SpaceAlien";
import { site } from "@/data/site";
import { playShutterSound } from "@/lib/audio";

export function WeirdHero() {
  const [timecode, setTimecode] = useState("00:00:00");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimecode(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
          now.getSeconds()
        ).padStart(2, "0")}`
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#faf5eb] text-ink pt-20 pb-28 border-b-4 border-ink halftone-bg">
      {/* 8-Bit Pixel Clouds drifting in background */}
      <div className="pointer-events-none absolute inset-x-0 top-12 z-0 opacity-80 flex justify-between px-6">
        <PixelCloud size={170} className="animate-float-slow -translate-y-2" />
        <PixelCloud size={210} className="hidden sm:inline-block animate-float-reverse translate-y-6" />
        <PixelCloud size={140} className="hidden lg:inline-block animate-float-slow -translate-y-4" />
      </div>

      {/* Floating 8-bit Stars & Sparkles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <PixelStar size={18} className="absolute left-[8%] top-[25%]" />
        <PixelStar size={14} className="absolute right-[12%] top-[18%]" />
        <PixelStar size={20} className="absolute left-[45%] top-[10%]" />
        <PixelStar size={16} className="absolute right-[32%] top-[40%]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1700px] px-5 sm:px-10">
        {/* Top Anomaly Bar / University Ticket */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-2 border-ink bg-[#fffdf9] p-3 shadow-[4px_5px_0px_rgba(20,19,18,0.85)]">
          <div className="flex items-center gap-3">
            <span className="dymo-label dymo-red py-0.5 px-2 text-xs">
              ANOMALY #098
            </span>
            <span className="pixel-text text-sm sm:text-base font-bold text-ink">
              GIRIJANANDA CHOWDHURY UNIVERSITY · AZARA CAMPUS
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="hidden md:inline text-silver">COORD: {site.coordinates}</span>
            <span className="flex items-center gap-1.5 font-bold text-vermilion">
              <span className="h-2 w-2 rounded-full bg-vermilion animate-ping" />
              TIMECODE: {timecode}
            </span>
          </div>
        </div>

        {/* Hero Title & Weirdcore Typography */}
        <div className="relative mb-12">
          {/* Celestial Dragon soaring across the main title */}
          <div className="absolute -top-16 -left-4 sm:left-[15%] z-20 pointer-events-none">
            <CelestialDragon size={240} className="animate-float-slow" />
          </div>

          {/* Flying Saucer abducting the word 'SHUTTER' */}
          <div className="absolute -top-10 right-4 sm:right-[14%] z-20 pointer-events-none">
            <PixelUFO size={120} className="animate-float-reverse" />
          </div>

          <h1
            aria-label="SHUTTERSPACE"
            className="display text-center uppercase tracking-[-0.04em] text-ink select-none relative z-10"
            style={{ fontSize: "clamp(3.8rem, 16vw, 15rem)", lineHeight: 0.82 }}
          >
            SHUTTER
            <span className="block italic text-vermilion -mt-[0.05em] transform -rotate-1">
              SPACE
            </span>
          </h1>

          {/* Dymo Subtitle Strip */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="dymo-label text-xs sm:text-sm transform -rotate-2">
              THE PHOTOGRAPHY COLLECTIVE OF GCU
            </span>
            <span className="dymo-label dymo-red text-xs sm:text-sm transform rotate-1">
              EST. GUWAHATI, ASSAM
            </span>
            <span className="dymo-label text-xs sm:text-sm transform -rotate-1 bg-[#d48a28]">
              EYES WIDE OPEN
            </span>
          </div>
        </div>

        {/* Asymmetrical Surreal Collage Layer (Varying Sizes and Unique Elements) */}
        <div className="relative mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT COLLAGE CLUSTER: Stoic Bust + Eyeball + Wildflowers */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6">
            {/* Stoic Roman Bust with Camera Lens Eye */}
            <div className="relative">
              {/* Masking tape on corner */}
              <div className="masking-tape -top-3 -left-4 w-28" />
              <StoicArt size="md" quote="AMOR FATI // WE SEE ALL" />
              {/* Wildflowers sprouting from the bust's shoulder */}
              <div className="absolute -bottom-6 -right-6 pointer-events-none">
                <Wildflowers size={95} type="poppy" />
              </div>
            </div>

            {/* Giant Interactive Eyeball tracking the cursor */}
            <div className="relative mt-2 p-3 bg-[#fffef9] border-2 border-ink shadow-[5px_6px_0px_rgba(20,19,18,0.9)] rounded-2xl transform rotate-2">
              <Eyeball size={145} label="DO NOT BLINK" />
              <span className="pixel-text text-center block text-xs mt-1 text-ink/70">
                PUPIL SYNCHRONIZED
              </span>
            </div>
          </div>

          {/* CENTER COLLAGE CLUSTER: Retro TV with working channels + Eagle & Serpent */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Retro CRT TV */}
            <div className="relative w-full flex justify-center">
              <RetroTV />
            </div>

            {/* Eagle & Serpent Emblem underneath */}
            <div className="mt-6 flex items-center justify-center relative">
              <EagleAndSerpent size={190} className="transform -rotate-1" />
            </div>
          </div>

          {/* RIGHT COLLAGE CLUSTER: Space Planet + Alien Observer + Manifesto Card */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end gap-6">
            {/* Alien Observer & Saturn Planet */}
            <div className="relative flex items-center gap-2">
              <AlienObserver size={110} className="transform -rotate-6" />
              <CelestialPlanet size={100} className="transform rotate-12" />
            </div>

            {/* Weirdcore Manifesto Card (Asymmetric, jagged paper) */}
            <div className="relative border-3 border-ink bg-[#fffdf9] p-5 shadow-[6px_7px_0px_rgba(20,19,18,0.95)] max-w-xs transform rotate-[-2deg]">
              <div className="masking-tape -top-3 right-6 w-24" />
              <div className="flex items-center gap-1.5 mb-2">
                <PixelCamera size={28} />
                <span className="pixel-text text-xs text-vermilion font-bold">
                  GCU MANIFESTO
                </span>
              </div>
              <p className="display text-xl italic leading-tight text-ink">
                &ldquo;We don&rsquo;t just capture moments. We give them a strange place to live.&rdquo;
              </p>
              <p className="mt-2 text-xs font-mono text-ink/80 leading-relaxed">
                A photography collective at Girijananda Chowdhury University, chasing light, capturing dreams, and preserving the
                ephemeral in an unpredictable universe.
              </p>
              <div className="mt-3 border-t border-ink/20 pt-2 flex items-center justify-between text-[0.6rem] font-mono">
                <span>PLATE #001</span>
                <span className="text-vermilion">AZARA, ASSAM</span>
              </div>
            </div>

            {/* Wildflower Bouquet accent */}
            <div className="relative self-center lg:self-end">
              <Wildflowers size={85} type="bouquet" />
            </div>
          </div>
        </div>

        {/* Action Buttons & Links */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
          <a
            href="#gallery"
            onClick={() => playShutterSound()}
            className="group relative inline-flex items-center gap-3 border-3 border-ink bg-vermilion px-8 py-5 text-cream shadow-[5px_6px_0px_rgba(20,19,18,1)] transition-transform hover:-translate-y-1 hover:shadow-[7px_9px_0px_rgba(20,19,18,1)] active:translate-y-0.5"
          >
            <Eye size={18} />
            <span className="pixel-text text-base font-bold tracking-wider">
              EXPLORE THE GALLARY
            </span>
            <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
          </a>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playShutterSound()}
            className="group inline-flex items-center gap-3 border-3 border-ink bg-[#fffdf9] px-7 py-5 text-ink shadow-[5px_6px_0px_rgba(20,19,18,1)] transition-transform hover:-translate-y-1 hover:bg-[#eae0cc] hover:shadow-[7px_9px_0px_rgba(20,19,18,1)]"
          >
            <Instagram size={18} className="text-vermilion" />
            <span className="pixel-text text-base font-bold tracking-wider">
              {site.instagramHandle}
            </span>
            <span className="text-xs font-mono">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
