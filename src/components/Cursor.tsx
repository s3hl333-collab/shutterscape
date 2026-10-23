"use client";

import { useEffect, useRef, useState } from "react";

/** Minimal focus-reticle cursor. Desktop / fine pointers only. */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setEnabled(mq.matches && !reduced.matches);
    set();
    mq.addEventListener("change", set);
    reduced.addEventListener("change", set);
    return () => {
      mq.removeEventListener("change", set);
      reduced.removeEventListener("change", set);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = root.current!;
    document.documentElement.classList.add("has-cursor");

    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      const t = e.target as HTMLElement | null;
      const view = t?.closest<HTMLElement>("[data-cursor]");
      const interactive = t?.closest("a, button, summary, [role='button']");
      const text = t?.closest("input, textarea, select");
      let state = "idle";
      if (text) state = "text";
      else if (view?.dataset.cursor) state = view.dataset.cursor;
      else if (interactive) state = "link";
      el.dataset.state = state;
      if (label.current) label.current.textContent = state === "view" ? "View" : state === "drag" ? "Drag" : "";
    };
    const down = () => (el.dataset.press = "1");
    const up = () => delete el.dataset.press;
    const leave = () => (el.style.opacity = "0");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      data-state="idle"
      className="group pointer-events-none fixed left-0 top-0 z-[200] opacity-0 mix-blend-difference transition-opacity duration-300"
    >
      <div
        className="absolute -left-[22px] -top-[22px] h-11 w-11 transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)]
          group-data-[state=link]:scale-[1.5] group-data-[state=view]:scale-[2.1] group-data-[state=drag]:scale-[2.1]
          group-data-[state=text]:scale-[0.25] group-data-[press=1]:!scale-[0.8]"
      >
        <span className="absolute inset-0 rounded-full border border-white/90 transition-opacity group-data-[state=view]:bg-white group-data-[state=drag]:bg-white" />
        <span className="absolute left-1/2 top-[-6px] h-[7px] w-px -translate-x-1/2 bg-white group-data-[state=view]:opacity-0 group-data-[state=drag]:opacity-0" />
        <span className="absolute bottom-[-6px] left-1/2 h-[7px] w-px -translate-x-1/2 bg-white group-data-[state=view]:opacity-0 group-data-[state=drag]:opacity-0" />
        <span className="absolute left-[-6px] top-1/2 h-px w-[7px] -translate-y-1/2 bg-white group-data-[state=view]:opacity-0 group-data-[state=drag]:opacity-0" />
        <span className="absolute right-[-6px] top-1/2 h-px w-[7px] -translate-y-1/2 bg-white group-data-[state=view]:opacity-0 group-data-[state=drag]:opacity-0" />
        <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white group-data-[state=view]:opacity-0 group-data-[state=drag]:opacity-0" />
        <span
          ref={label}
          className="mono-label absolute inset-0 flex items-center justify-center text-[5px] text-black"
          style={{ fontSize: 5 }}
        />
      </div>
    </div>
  );
}
