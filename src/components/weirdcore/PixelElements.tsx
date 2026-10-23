"use client";

interface PixelProps {
  className?: string;
  size?: number;
}

/** 8-Bit Pixel Clouds drifting across the warm sky. */
export function PixelCloud({ className = "", size = 160 }: PixelProps) {
  return (
    <div className={`inline-block select-none ${className}`} style={{ width: size, height: size * 0.55 }}>
      <svg
        viewBox="0 0 32 18"
        className="w-full h-full pixelated drop-shadow-[2px_3px_0px_rgba(20,19,18,0.2)]"
        fill="currentColor"
      >
        {/* Crisp 8-bit pixel cloud grid */}
        <g fill="#fffef9" stroke="#141312" strokeWidth="0.7">
          {/* Top Bump */}
          <rect x="10" y="2" width="12" height="4" />
          <rect x="8" y="4" width="16" height="4" />
          {/* Mid Body */}
          <rect x="4" y="6" width="24" height="6" />
          {/* Bottom Flat */}
          <rect x="2" y="10" width="28" height="4" />
        </g>
        {/* Soft shadow underside */}
        <g fill="#e5d8be">
          <rect x="6" y="12" width="20" height="2" />
        </g>
      </svg>
    </div>
  );
}

/** 8-Bit Retro Camera with pixel lens. */
export function PixelCamera({ className = "", size = 64 }: PixelProps) {
  return (
    <div className={`inline-block select-none ${className}`} style={{ width: size, height: size * 0.75 }}>
      <svg viewBox="0 0 24 18" className="w-full h-full pixelated drop-shadow-sm">
        {/* Camera Body */}
        <rect x="2" y="4" width="20" height="12" fill="#181514" stroke="#141312" strokeWidth="0.8" />
        {/* Viewfinder bump */}
        <rect x="6" y="2" width="6" height="3" fill="#d73b22" stroke="#141312" strokeWidth="0.8" />
        {/* Shutter Button */}
        <rect x="15" y="2" width="3" height="2" fill="#d48a28" />
        {/* Lens Outer */}
        <circle cx="12" cy="10" r="4.5" fill="#f4ede0" stroke="#141312" strokeWidth="0.8" />
        {/* Lens Inner Glass */}
        <circle cx="12" cy="10" r="2.5" fill="#00e676" />
        <rect x="11" y="9" width="1" height="1" fill="#fff" />
        {/* Red Sensor Dot */}
        <rect x="4" y="6" width="1.5" height="1.5" fill="#d73b22" />
      </svg>
    </div>
  );
}

/** 8-Bit Alien UFO beaming up a photograph with tractor beam. */
export function PixelUFO({ className = "", size = 140 }: PixelProps) {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size }}>
      <svg viewBox="0 0 36 44" className="w-full h-full pixelated drop-shadow-md">
        {/* Flying Saucer Dome */}
        <rect x="14" y="4" width="8" height="4" fill="#00e676" stroke="#141312" strokeWidth="0.8" />
        {/* Alien inside dome */}
        <rect x="17" y="5" width="2" height="2" fill="#141312" />
        <rect x="16" y="5" width="1" height="1" fill="#fff" />
        <rect x="19" y="5" width="1" height="1" fill="#fff" />

        {/* Saucer Rim */}
        <rect x="6" y="8" width="24" height="4" fill="#d48a28" stroke="#141312" strokeWidth="0.8" />
        {/* Pulsing lights on rim */}
        <rect x="8" y="9" width="2" height="2" fill="#d73b22" />
        <rect x="14" y="9" width="2" height="2" fill="#fff" />
        <rect x="20" y="9" width="2" height="2" fill="#d73b22" />
        <rect x="26" y="9" width="2" height="2" fill="#fff" />

        {/* Tractor Abduction Light Beam */}
        <polygon points="12,12 24,12 32,42 4,42" fill="rgba(0, 230, 118, 0.22)" stroke="#00e676" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Polaroid being abducted in beam */}
        <g transform="translate(13, 24)">
          <rect x="0" y="0" width="10" height="12" fill="#fffdf9" stroke="#141312" strokeWidth="0.7" />
          <rect x="1.5" y="1.5" width="7" height="6.5" fill="#181514" />
        </g>
      </svg>
    </div>
  );
}

/** 8-Bit Pixel Wildflowers. */
export function PixelFlower({ className = "", size = 32 }: PixelProps) {
  return (
    <div className={`inline-block select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 16 16" className="w-full h-full pixelated">
        {/* Petals */}
        <rect x="6" y="2" width="4" height="3" fill="#d73b22" />
        <rect x="2" y="6" width="3" height="4" fill="#d73b22" />
        <rect x="11" y="6" width="3" height="4" fill="#d73b22" />
        <rect x="6" y="11" width="4" height="3" fill="#d73b22" />
        {/* Center */}
        <rect x="6" y="6" width="4" height="4" fill="#d48a28" stroke="#141312" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

/** 8-Bit Pixel Star / Sparkle. */
export function PixelStar({ className = "", size = 20 }: PixelProps) {
  return (
    <div className={`inline-block select-none animate-pulse ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 12 12" className="w-full h-full pixelated">
        <rect x="5" y="1" width="2" height="10" fill="#d48a28" />
        <rect x="1" y="5" width="10" height="2" fill="#d48a28" />
        <rect x="4" y="4" width="4" height="4" fill="#fff" />
      </svg>
    </div>
  );
}
