"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollToTarget } from "@/lib/scroll";

/** Smooth scrolling (Lenis) + in-page anchor handling. No-ops for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | undefined;
    let raf = 0;

    if (!reduced) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      window.__lenis = lenis;
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      if (id) history.replaceState(null, "", `#${id}`);
      if (!id) {
        if (window.__lenis && !reduced) window.__lenis.scrollTo(0, { duration: 1.8 });
        else window.scrollTo({ top: 0 });
      } else scrollToTarget(target);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
