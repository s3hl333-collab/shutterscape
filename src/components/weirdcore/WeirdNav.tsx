"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram, Menu, X, Eye, Volume2, VolumeX, Sparkles } from "lucide-react";
import { nav, site } from "@/data/site";
import { lockScroll } from "@/lib/scroll";
import { playShutterSound } from "@/lib/audio";
import { PixelCamera } from "./PixelElements";

export function WeirdNav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 80);
      setHidden(y > last && y > 350 && !open);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleNavClick = () => {
    if (soundEnabled) playShutterSound();
    if (open) setOpen(false);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
    if (!soundEnabled) playShutterSound();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          solid
            ? "border-b-3 border-ink bg-[#fffef9]/95 backdrop-blur-md shadow-[0_4px_0_rgba(20,19,18,0.9)]"
            : "border-b-2 border-ink/40 bg-[#faf5eb]/90 backdrop-blur-sm"
        }`}
      >
        <nav
          aria-label="Weirdcore Navigation"
          className="mx-auto flex h-16 max-w-[1700px] items-center justify-between px-4 sm:px-8 md:h-20"
        >
          {/* Brand Wordmark & Eye Monocle */}
          <a
            href="#top"
            onClick={handleNavClick}
            className="group flex items-center gap-3 text-ink select-none"
            aria-label="Shutterspace GCU — back to top"
          >
            <div className="relative grid h-10 w-10 place-items-center rounded-xl border-2 border-ink bg-[#fffdf9] shadow-[2px_3px_0px_rgba(20,19,18,0.9)] transition-transform group-hover:scale-105">
              <span className="text-xl">👁️</span>
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-vermilion animate-ping" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="display text-2xl sm:text-3xl uppercase tracking-[-0.03em] text-ink leading-none">
                  Shutterspace
                </span>
                <span className="dymo-label dymo-red hidden text-[0.55rem] sm:inline-block">
                  GCU
                </span>
              </div>
              <span className="pixel-text block text-[0.68rem] text-vermilion font-bold tracking-wider leading-none mt-1">
                GIRIJANANDA CHOWDHURY UNIVERSITY
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (The 4 Requested Sections) */}
          <div className="hidden items-center gap-2 lg:flex">
            <ul className="flex items-center gap-1.5 border-2 border-ink bg-[#fffdf9] p-1 shadow-[3px_4px_0px_rgba(20,19,18,0.9)]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleNavClick}
                    className="pixel-text flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-ink transition-all hover:bg-ink hover:text-cream active:translate-y-0.5"
                  >
                    <span>{item.icon}</span>
                    <span className="font-bold tracking-wider">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Sound Effects Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              title={soundEnabled ? "Mute shutter audio" : "Enable shutter audio"}
              className="grid h-10 w-10 place-items-center border-2 border-ink bg-[#fffdf9] text-ink shadow-[3px_4px_0px_rgba(20,19,18,0.9)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 ml-2"
            >
              {soundEnabled ? (
                <Volume2 size={16} className="text-vermilion" />
              ) : (
                <VolumeX size={16} className="text-silver" />
              )}
            </button>

            {/* Instagram CTA */}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="pixel-text ml-2 flex items-center gap-2 border-2 border-ink bg-vermilion px-4 py-2 text-xs font-bold text-cream shadow-[3px_4px_0px_rgba(20,19,18,0.9)] transition-all hover:-translate-y-0.5 hover:shadow-[4px_6px_0px_rgba(20,19,18,0.9)] active:translate-y-0.5"
            >
              <Instagram size={14} />
              <span>{site.instagramHandle}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleSound}
              aria-label="Toggle shutter audio"
              className="grid h-10 w-10 place-items-center border-2 border-ink bg-[#fffdf9] text-ink shadow-[2px_3px_0px_rgba(20,19,18,0.9)]"
            >
              {soundEnabled ? (
                <Volume2 size={16} className="text-vermilion" />
              ) : (
                <VolumeX size={16} className="text-silver" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (soundEnabled) playShutterSound();
                setOpen((o) => !o);
              }}
              aria-label={open ? "Close menu" : "Open weirdcore menu"}
              className="pixel-text flex items-center gap-1.5 border-2 border-ink bg-vermilion px-3.5 py-2 text-xs font-bold text-cream shadow-[3px_4px_0px_rgba(20,19,18,0.9)] active:translate-y-0.5"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
              <span>{open ? "CLOSE" : "MENU"}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Weirdcore Overlay Drawer */}
      <div
        className={`fixed inset-0 z-[115] bg-[#faf5eb] transition-all duration-400 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="halftone-bg relative flex h-full flex-col justify-between px-6 pt-28 pb-10 overflow-y-auto">
          {/* Top Tape & Warning */}
          <div className="border-2 border-ink bg-[#fffef9] p-3 shadow-[4px_5px_0px_rgba(20,19,18,0.9)] flex items-center justify-between">
            <span className="pixel-text text-xs text-vermilion font-bold">
              ● SECTIONS OF ANOMALY
            </span>
            <span className="dymo-label text-[0.6rem]">GCU AZARA</span>
          </div>

          {/* Navigation Items in Massive Display Font */}
          <ul className="my-8 space-y-4">
            {nav.map((item, idx) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleNavClick}
                  className="group flex items-center justify-between border-3 border-ink bg-[#fffdf9] p-4 shadow-[5px_6px_0px_rgba(20,19,18,0.9)] transition-transform active:translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <span className="pixel-text block text-[0.65rem] text-vermilion font-bold">
                        0{idx + 1} // SECTION
                      </span>
                      <span className="display text-3xl uppercase tracking-tight text-ink">
                        {item.label}
                      </span>
                    </div>
                  </div>
                  <span className="pixel-text text-xl font-bold text-ink group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Footer Info in Drawer */}
          <div className="space-y-4">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="pixel-text flex items-center justify-center gap-2 border-3 border-ink bg-vermilion p-4 text-center text-sm font-bold text-cream shadow-[5px_6px_0px_rgba(20,19,18,0.9)]"
            >
              <Instagram size={18} />
              <span>FOLLOW {site.instagramHandle}</span>
              <ArrowUpRight size={16} />
            </a>

            <div className="text-center font-mono text-[0.65rem] text-ink/70">
              GIRIJANANDA CHOWDHURY UNIVERSITY · GUWAHATI, ASSAM
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
