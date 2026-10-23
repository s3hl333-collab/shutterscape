"use client";

import { useEffect, useState } from "react";
import { Grid, Moon, Volume2, VolumeX, Eye } from "lucide-react";
import { isSoundEnabled, playShutterSound, toggleSound } from "@/lib/audio";
import { site } from "@/data/site";

export function CameraHUD() {
  const [timecode, setTimecode] = useState("00:00:00");
  const [gridActive, setGridActive] = useState(false);
  const [darkroomActive, setDarkroomActive] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as HH:MM:SS in 2-digit format
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setTimecode(`${hh}:${mm}:${ss}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSoundToggle = () => {
    const state = toggleSound();
    setSoundActive(state);
  };

  const handleDarkroomToggle = () => {
    const next = !darkroomActive;
    setDarkroomActive(next);
    if (next) {
      document.documentElement.classList.add("darkroom");
    } else {
      document.documentElement.classList.remove("darkroom");
    }
    if (soundActive) playShutterSound();
  };

  const handleGridToggle = () => {
    setGridActive((g) => !g);
    if (soundActive) playShutterSound();
  };

  return (
    <>
      {/* Optional Rule-of-Thirds Viewfinder Overlay */}
      {gridActive && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70] grid grid-cols-3 grid-rows-3 opacity-30"
        >
          <div className="border-b border-r border-ivory/40" />
          <div className="border-b border-r border-ivory/40" />
          <div className="border-b border-ivory/40" />
          <div className="border-b border-r border-ivory/40" />
          <div className="border-b border-r border-ivory/40" />
          <div className="border-b border-ivory/40" />
          <div className="border-r border-ivory/40" />
          <div className="border-r border-ivory/40" />
          <div />
          {/* Subtle center crosshairs */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-vermilion" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-vermilion" />
          </div>
        </div>
      )}

      {/* Floating Viewfinder Tools (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-[80] flex items-center gap-2 rounded-full border border-white/15 bg-obsidian/85 px-3 py-2 text-ivory backdrop-blur-md transition-all md:bottom-8 md:right-8">
        <button
          type="button"
          onClick={handleGridToggle}
          title={gridActive ? "Turn off viewfinder grid" : "Turn on 3×3 viewfinder grid"}
          aria-label="Toggle camera grid"
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-mono tracking-wider transition-colors ${
            gridActive ? "bg-vermilion text-obsidian font-bold" : "text-silver hover:text-ivory"
          }`}
        >
          <Grid size={13} />
          <span className="hidden sm:inline">GRID</span>
        </button>

        <span className="h-3 w-px bg-white/20" />

        <button
          type="button"
          onClick={handleDarkroomToggle}
          title={darkroomActive ? "Exit darkroom red safelight" : "Enter darkroom red safelight"}
          aria-label="Toggle darkroom mode"
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-mono tracking-wider transition-colors ${
            darkroomActive ? "bg-[#ff3b20] text-black font-bold shadow-[0_0_12px_rgba(255,59,32,0.6)]" : "text-silver hover:text-ivory"
          }`}
        >
          <Moon size={13} />
          <span className="hidden sm:inline">DARKROOM</span>
        </button>

        <span className="h-3 w-px bg-white/20" />

        <button
          type="button"
          onClick={handleSoundToggle}
          title={soundActive ? "Mute shutter sound" : "Enable camera shutter sound"}
          aria-label="Toggle shutter audio feedback"
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-mono tracking-wider transition-colors ${
            soundActive ? "bg-ivory text-obsidian font-bold" : "text-silver hover:text-ivory"
          }`}
        >
          {soundActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span className="hidden sm:inline">{soundActive ? "SOUND ON" : "SOUND"}</span>
        </button>
      </div>
    </>
  );
}
