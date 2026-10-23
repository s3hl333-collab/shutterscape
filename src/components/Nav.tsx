"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { lockScroll } from "@/lib/scroll";
import { playShutterSound } from "@/lib/audio";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.5);
      setHidden(y > last && y > window.innerHeight * 0.85);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[transform,background-color,border-color,backdrop-filter] duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          solid || open
            ? "border-b border-white/10 bg-obsidian/85 backdrop-blur-md shadow-lg"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-5 md:h-20 md:px-10"
        >
          {/* Brand Logo */}
          <a
            href="#top"
            onClick={() => playShutterSound()}
            className="group flex items-center gap-3 text-ivory"
            aria-label="Shutterspace — back to top"
          >
            <span
              aria-hidden
              className="h-2 w-2 rounded-full bg-vermilion transition-transform duration-500 group-hover:scale-150"
            />
            <span className="display text-[1.65rem] uppercase tracking-[-0.01em] text-ivory md:text-[1.85rem]">
              Shutterspace
            </span>
            <span className="mono-label hidden text-[0.55rem] text-silver/80 tracking-widest lg:inline border-l border-white/20 pl-3">
              GCU PHOTOGRAPHY
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => playShutterSound()}
                  className="mono-label group relative inline-block py-2 text-[0.72rem] text-ivory/80 transition-colors hover:text-ivory"
                >
                  {l.label}
                  <span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-vermilion transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playShutterSound()}
                aria-label="Shutterspace on Instagram (opens in a new tab)"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-ivory transition-colors hover:border-vermilion hover:bg-vermilion hover:text-obsidian"
              >
                <Instagram size={17} strokeWidth={1.5} />
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mono-label flex h-10 items-center gap-2 text-ivory md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              playShutterSound();
              setOpen((o) => !o);
            }}
          >
            {open ? (
              <>
                Close <X size={16} />
              </>
            ) : (
              <>
                Menu <span aria-hidden className="block h-px w-6 bg-ivory shadow-[0_5px_0_#f5efe3]" />
              </>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[95] flex flex-col justify-between bg-obsidian px-6 pb-10 pt-28 transition-[clip-path] duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] md:hidden ${
          open ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {nav.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  playShutterSound();
                  setOpen(false);
                }}
                className="display flex items-baseline gap-4 border-b border-white/10 py-4 text-[2.7rem] text-ivory"
              >
                <span className="mono-label text-[0.8rem] text-vermilion">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-end justify-between border-t border-white/15 pt-6">
          <a
            href={site.instagram}
            tabIndex={open ? 0 : -1}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label inline-flex items-center gap-2 text-ivory"
          >
            <Instagram size={16} strokeWidth={1.5} /> {site.instagramHandle} <ArrowUpRight size={14} />
          </a>
          <span className="mono-label text-[0.62rem] text-silver">GCU · {site.region}</span>
        </div>
      </div>
    </>
  );
}
