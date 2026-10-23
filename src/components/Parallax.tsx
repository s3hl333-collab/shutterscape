"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Gentle scroll parallax. Skipped on mobile and for reduced-motion users. */
export function Parallax({
  speed = 0.08,
  children,
  className = "",
  style,
}: {
  speed?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 768) return;

    let raf = 0;
    let visible = false;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = parent.getBoundingClientRect();
        const c = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-c * speed).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => visible && update();
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) update();
      },
      { rootMargin: "150px" },
    );
    io.observe(parent);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
