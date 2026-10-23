"use client";

import { useEffect, useRef, useState } from "react";

interface EyeballProps {
  size?: number;
  className?: string;
  label?: string;
}

export function Eyeball({ size = 160, className = "", label }: EyeballProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const distance = Math.hypot(deltaX, deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      // Max pupil displacement proportional to eye size
      const maxDistance = size * 0.22;
      const clampedDistance = Math.min(distance * 0.08, maxDistance);

      setPupilPos({
        x: Math.cos(angle) * clampedDistance,
        y: Math.sin(angle) * clampedDistance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  const triggerBlink = () => {
    setBlinking(true);
    setTimeout(() => setBlinking(false), 240);
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ width: size, height: size + (label ? 24 : 0) }}
    >
      <div
        ref={eyeRef}
        onClick={triggerBlink}
        title="I SEE YOU — Click to blink"
        className="group relative cursor-pointer overflow-hidden rounded-full border-2 border-ink bg-[#fffef9] shadow-[4px_6px_0px_rgba(20,19,18,0.25)] transition-transform duration-300 hover:scale-105"
        style={{ width: size, height: size }}
      >
        {/* Sclera & delicate red veins */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none opacity-40"
          viewBox="0 0 100 100"
        >
          <path d="M12 25 Q25 35 32 45" stroke="#c82c1b" strokeWidth="0.8" fill="none" />
          <path d="M18 72 Q30 65 35 55" stroke="#c82c1b" strokeWidth="0.7" fill="none" />
          <path d="M85 28 Q75 38 68 46" stroke="#c82c1b" strokeWidth="0.8" fill="none" />
          <path d="M82 78 Q72 68 64 56" stroke="#c82c1b" strokeWidth="0.7" fill="none" />
          <path d="M50 8 Q52 20 48 30" stroke="#c82c1b" strokeWidth="0.6" fill="none" />
        </svg>

        {/* Iris & Pupil that follows the cursor */}
        <div
          className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full transition-transform duration-75 ease-out"
          style={{
            width: size * 0.54,
            height: size * 0.54,
            transform: `translate(calc(-50% + ${pupilPos.x}px), calc(-50% + ${pupilPos.y}px))`,
            background: "radial-gradient(circle, #d8851e 0%, #a43d1a 55%, #181514 100%)",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.8), 0 0 8px rgba(216,133,30,0.4)",
          }}
        >
          {/* Camera Aperture blades inside iris */}
          <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 60 60">
            <line x1="30" y1="10" x2="45" y2="40" stroke="#fff" strokeWidth="1" />
            <line x1="45" y1="20" x2="25" y2="50" stroke="#fff" strokeWidth="1" />
            <line x1="45" y1="40" x2="15" y2="30" stroke="#fff" strokeWidth="1" />
            <line x1="30" y1="50" x2="15" y2="20" stroke="#fff" strokeWidth="1" />
            <line x1="15" y1="40" x2="35" y2="10" stroke="#fff" strokeWidth="1" />
          </svg>

          {/* Pupil */}
          <div
            className="relative flex items-center justify-center rounded-full bg-black shadow-inner"
            style={{ width: size * 0.26, height: size * 0.26 }}
          >
            {/* White specular highlight reflection */}
            <span
              className="absolute left-[20%] top-[20%] rounded-full bg-white opacity-90"
              style={{ width: size * 0.07, height: size * 0.07 }}
            />
            <span
              className="absolute right-[25%] bottom-[25%] rounded-full bg-white opacity-50"
              style={{ width: size * 0.035, height: size * 0.035 }}
            />
          </div>
        </div>

        {/* Eyelid Blink Layer */}
        <div
          className={`absolute inset-0 bg-[#e7d8bd] border-b-2 border-ink transition-transform duration-150 ${
            blinking ? "translate-y-0" : "-translate-y-full"
          }`}
        />
        <div
          className={`absolute inset-0 bg-[#e7d8bd] border-t-2 border-ink transition-transform duration-150 ${
            blinking ? "translate-y-0" : "translate-y-full"
          }`}
        />
      </div>

      {label && (
        <span className="dymo-label mt-2 text-[0.7rem] transform -rotate-1 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
