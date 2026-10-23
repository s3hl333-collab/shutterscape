"use client";

interface SpaceProps {
  className?: string;
  size?: number;
}

/** Retro Alien with camera viewfinder & celestial aura. */
export function AlienObserver({ className = "", size = 120 }: SpaceProps) {
  return (
    <div className={`relative inline-block select-none group ${className}`} style={{ width: size, height: size * 1.25 }}>
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md" fill="none">
        {/* Cosmic Halo */}
        <ellipse cx="50" cy="50" rx="45" ry="14" stroke="#d48a28" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Alien Head (Inverted teardrop) */}
        <path
          d="M20,40 C15,10 85,10 80,40 C76,68 64,88 50,95 C36,88 24,68 20,40 Z"
          fill="#f0e6d2"
          stroke="#141312"
          strokeWidth="3"
        />

        {/* Giant Almond Shaped Alien Eyes */}
        {/* Left Eye */}
        <g transform="translate(32, 45) rotate(-16)">
          <path d="M-14,0 C-10,-12 10,-10 14,0 C10,12 -10,10 -14,0 Z" fill="#141312" stroke="#d73b22" strokeWidth="1.5" />
          <circle cx="-3" cy="-3" r="3.5" fill="#fff" />
          <circle cx="4" cy="2" r="1.5" fill="#00e676" />
        </g>
        {/* Right Eye */}
        <g transform="translate(68, 45) rotate(16)">
          <path d="M-14,0 C-10,-12 10,-10 14,0 C10,12 -10,10 -14,0 Z" fill="#141312" stroke="#d73b22" strokeWidth="1.5" />
          <circle cx="3" cy="-3" r="3.5" fill="#fff" />
          <circle cx="-4" cy="2" r="1.5" fill="#00e676" />
        </g>

        {/* Tiny Slit Nostrils & Mouth */}
        <circle cx="47" cy="72" r="1" fill="#141312" />
        <circle cx="53" cy="72" r="1" fill="#141312" />
        <line x1="44" y1="82" x2="56" y2="82" stroke="#141312" strokeWidth="1.5" strokeLinecap="round" />

        {/* Small Antenna with camera lens sphere */}
        <line x1="50" y1="18" x2="50" y2="4" stroke="#141312" strokeWidth="2" />
        <circle cx="50" cy="4" r="4.5" fill="#d73b22" stroke="#141312" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/** Celestial Ringed Planet / Moon. */
export function CelestialPlanet({ className = "", size = 110 }: SpaceProps) {
  return (
    <div className={`inline-block select-none ${className}`} style={{ width: size, height: size * 0.75 }}>
      <svg viewBox="0 0 120 90" className="w-full h-full drop-shadow-sm" fill="none">
        {/* Planet Sphere */}
        <circle cx="60" cy="45" r="28" fill="#eae0cc" stroke="#141312" strokeWidth="2.5" />
        {/* Craters */}
        <circle cx="50" cy="38" r="4" fill="#d8cdb6" stroke="#141312" strokeWidth="1" />
        <circle cx="68" cy="44" r="6" fill="#d8cdb6" stroke="#141312" strokeWidth="1" />
        <circle cx="55" cy="56" r="3" fill="#d8cdb6" stroke="#141312" strokeWidth="1" />

        {/* Orbiting Planetary Ring */}
        <ellipse
          cx="60"
          cy="45"
          rx="54"
          ry="15"
          stroke="#d73b22"
          strokeWidth="3.5"
          transform="rotate(-15, 60, 45)"
        />
        <ellipse
          cx="60"
          cy="45"
          rx="48"
          ry="12"
          stroke="#d48a28"
          strokeWidth="1.5"
          transform="rotate(-15, 60, 45)"
        />
      </svg>
    </div>
  );
}
