"use client";

import { useState } from "react";
import Image from "next/image";
import { playShutterSound } from "@/lib/audio";
import { Tv, Volume2, Power } from "lucide-react";

interface TVChannel {
  name: string;
  caption: string;
  url: string;
  tag: string;
}

const CHANNELS: TVChannel[] = [
  {
    name: "CH 01 · LIMINAL GCU",
    caption: "Academic Block B · 03:14 AM · Corridor of Echoes",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=75",
    tag: "LIVE FEED // GCU AZARA",
  },
  {
    name: "CH 02 · COSMIC VOID",
    caption: "Deep Space Frequency · 8-bit star dust & alien transmissions",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=75",
    tag: "ASTRONOMICAL SIGNAL",
  },
  {
    name: "CH 03 · WILDFLOWER BLOOM",
    caption: "Assam Meadow Botanical Macro · Flora blooming through CRT circuits",
    url: "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?auto=format&fit=crop&w=800&q=75",
    tag: "ORGANIC OVERLAY",
  },
  {
    name: "CH 04 · DARKROOM LAB",
    caption: "Silver Halide Alchemy · Red safelight & developing bath",
    url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=75",
    tag: "EMULSION LAB",
  },
];

export function RetroTV({ className = "" }: { className?: string }) {
  const [currentCh, setCurrentCh] = useState(0);
  const [isOn, setIsOn] = useState(true);

  const nextChannel = () => {
    playShutterSound();
    setCurrentCh((c) => (c + 1) % CHANNELS.length);
  };

  const togglePower = () => {
    playShutterSound();
    setIsOn((p) => !p);
  };

  const ch = CHANNELS[currentCh];

  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Rabbit-Ear Antenna with Wildflower vines */}
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-none z-10 w-48">
        <div className="h-16 w-1 bg-ink/70 rotate-[-22deg] origin-bottom rounded-full relative">
          {/* Wildflower blooming on antenna */}
          <span className="absolute -top-2 -left-2 text-base">🌸</span>
        </div>
        <div className="h-20 w-1 bg-ink/70 rotate-[25deg] origin-bottom rounded-full relative">
          <span className="absolute -top-2 -right-2 text-base">🌼</span>
        </div>
      </div>

      {/* Main TV Frame (Vintage Cream & Woodgrain casing) */}
      <div className="relative rounded-2xl border-4 border-ink bg-[#f2e6cf] p-4 shadow-[8px_10px_0px_rgba(20,19,18,0.9)] max-w-sm sm:max-w-md w-full">
        {/* TV Header Brand badge */}
        <div className="mb-2 flex items-center justify-between border-b-2 border-ink/30 pb-1.5 px-1">
          <div className="flex items-center gap-1.5">
            <Tv size={14} className="text-vermilion" />
            <span className="pixel-text text-sm font-bold tracking-wider text-ink">
              SHUTTER-VISION 1987
            </span>
          </div>
          <span className="dymo-label text-[0.62rem] dymo-red py-0.5 px-1.5">
            SIGNAL: ACTIVE
          </span>
        </div>

        {/* Screen Bezel */}
        <div className="relative rounded-xl border-4 border-ink bg-[#141210] p-2.5 shadow-inner">
          {/* CRT Screen with Scanlines */}
          <div className="crt-screen relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black">
            {isOn ? (
              <>
                <Image
                  src={ch.url}
                  alt={ch.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="400px"
                  priority
                />
                {/* On-Screen Display HUD */}
                <div className="absolute inset-0 p-3 flex flex-col justify-between z-30 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="pixel-text text-sm text-crtGreen bg-black/60 px-1.5 py-0.5 rounded">
                      {ch.name}
                    </span>
                    <span className="pixel-text text-xs text-yellow-300 animate-pulse">
                      ● REC
                    </span>
                  </div>

                  <div className="bg-black/75 p-2 rounded border border-white/10 backdrop-blur-xs">
                    <span className="pixel-text block text-xs text-crtGreen">
                      {ch.tag}
                    </span>
                    <p className="font-mono text-[0.68rem] text-ivory/90 truncate">
                      {ch.caption}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0c0b] text-silver/40">
                <span className="h-0.5 w-16 bg-white/20 animate-pulse" />
                <span className="pixel-text text-xs mt-2">STANDBY</span>
              </div>
            )}
          </div>
        </div>

        {/* TV Control Panel (Knobs, Speakers & Buttons) */}
        <div className="mt-3 flex items-center justify-between px-2 pt-1">
          {/* Speaker Grille */}
          <div className="flex flex-col gap-1 w-20">
            <span className="h-1 bg-ink/40 rounded-full" />
            <span className="h-1 bg-ink/40 rounded-full" />
            <span className="h-1 bg-ink/40 rounded-full" />
            <span className="h-1 bg-ink/40 rounded-full" />
          </div>

          {/* Dials & Buttons */}
          <div className="flex items-center gap-3">
            {/* Channel Knob */}
            <button
              type="button"
              onClick={nextChannel}
              title="Click to change channel"
              className="group flex flex-col items-center text-center"
            >
              <div className="h-9 w-9 rounded-full border-2 border-ink bg-[#ded0b6] shadow-[2px_2px_0px_rgba(20,19,18,0.8)] flex items-center justify-center active:translate-y-0.5 active:shadow-none transition-transform group-hover:rotate-45">
                <span className="h-3.5 w-1 bg-ink rounded-full" />
              </div>
              <span className="pixel-text text-[0.65rem] text-ink mt-0.5">CH TUNE</span>
            </button>

            {/* Power Button */}
            <button
              type="button"
              onClick={togglePower}
              title="Power on/off"
              className={`h-8 w-8 rounded-full border-2 border-ink flex items-center justify-center shadow-[2px_2px_0px_rgba(20,19,18,0.8)] active:translate-y-0.5 active:shadow-none transition-colors ${
                isOn ? "bg-vermilion text-white" : "bg-[#ded0b6] text-ink"
              }`}
            >
              <Power size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
