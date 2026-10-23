type LenisLike = { stop: () => void; start: () => void; scrollTo: (t: HTMLElement | number, o?: object) => void };

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

let locks = 0;

/** Lock / unlock page scroll (lightbox, mobile menu). Safe to nest. */
export function lockScroll(lock: boolean) {
  locks = Math.max(0, locks + (lock ? 1 : -1));
  const on = locks > 0;
  if (on) window.__lenis?.stop();
  else window.__lenis?.start();
  document.documentElement.style.overflow = on ? "hidden" : "";
}

export function scrollToTarget(el: HTMLElement) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.__lenis && !reduced) window.__lenis.scrollTo(el, { duration: 1.7 });
  else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}
