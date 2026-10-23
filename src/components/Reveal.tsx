"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  variant?: "up" | "clip";
  delay?: number;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/** Fade-up or clip-path mask reveal. Children of `clip` fill the box (give the box an aspect ratio). */
export function Reveal({ children, variant = "up", delay = 0, className = "", as, style }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useInView<HTMLElement>(variant === "clip" ? 0.08 : 0.12);
  const s = { "--d": `${delay}ms`, ...style } as CSSProperties;
  if (variant === "clip") {
    return (
      <Tag ref={ref} className={`rv-clip relative overflow-hidden ${className}`} style={s}>
        <div className="rv-inner absolute inset-0">{children}</div>
      </Tag>
    );
  }
  return (
    <Tag ref={ref} className={`rv-up ${className}`} style={s}>
      {children}
    </Tag>
  );
}

/** Masked line-by-line headline reveal. */
export function Lines({
  lines,
  className = "",
  delay = 0,
  step = 110,
  as,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  step?: number;
  as?: ElementType;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useInView<HTMLElement>(0.2);
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="rv-line" style={{ "--d": `${delay + i * step}ms` } as CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
