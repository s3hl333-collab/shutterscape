"use client";

interface WildflowerProps {
  className?: string;
  size?: number;
  type?: "poppy" | "fern" | "bouquet" | "single";
}

export function Wildflowers({ className = "", size = 80, type = "bouquet" }: WildflowerProps) {
  if (type === "single") {
    return (
      <div className={`inline-block select-none ${className}`} style={{ width: size, height: size * 1.5 }}>
        <svg viewBox="0 0 40 70" className="w-full h-full drop-shadow-sm" fill="none">
          {/* Stem */}
          <path d="M20,68 Q18,45 22,25" stroke="#4a5d3f" strokeWidth="2" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M19,50 Q10,48 8,42 Q15,42 20,48" fill="#586e4b" stroke="#141312" strokeWidth="1" />
          <path d="M21,38 Q30,35 32,28 Q25,29 21,36" fill="#586e4b" stroke="#141312" strokeWidth="1" />
          {/* Flower Bloom */}
          <g transform="translate(22, 20)">
            <circle cx="0" cy="0" r="10" fill="#d73b22" stroke="#141312" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="6" fill="#e85d3f" />
            <circle cx="0" cy="0" r="3" fill="#141312" />
            <circle cx="1" cy="-1" r="1" fill="#fff" />
          </g>
        </svg>
      </div>
    );
  }

  if (type === "fern") {
    return (
      <div className={`inline-block select-none ${className}`} style={{ width: size, height: size * 1.8 }}>
        <svg viewBox="0 0 50 90" className="w-full h-full drop-shadow-sm" fill="none">
          <path d="M25,85 Q22,50 35,10" stroke="#3b4d32" strokeWidth="2.5" strokeLinecap="round" />
          {/* Fern fronds */}
          <path d="M24,70 Q10,68 8,60 Q18,62 24,67" fill="#4d6440" stroke="#141312" strokeWidth="1" />
          <path d="M26,60 Q40,55 42,48 Q32,50 26,57" fill="#4d6440" stroke="#141312" strokeWidth="1" />
          <path d="M25,48 Q12,44 11,36 Q20,38 25,45" fill="#4d6440" stroke="#141312" strokeWidth="1" />
          <path d="M28,38 Q42,32 40,24 Q32,28 28,35" fill="#4d6440" stroke="#141312" strokeWidth="1" />
          <path d="M30,24 Q18,18 20,12 Q26,16 30,22" fill="#4d6440" stroke="#141312" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // Default: Botanical Wildflower Bouquet
  return (
    <div className={`inline-block select-none ${className}`} style={{ width: size, height: size * 1.2 }}>
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm" fill="none">
        {/* Stems */}
        <path d="M50,115 Q40,80 30,45" stroke="#4a5d3f" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M50,115 Q52,75 58,35" stroke="#4a5d3f" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M50,115 Q65,85 75,50" stroke="#4a5d3f" strokeWidth="2" strokeLinecap="round" />

        {/* Leaves */}
        <path d="M42,90 Q28,88 25,80 Q35,80 44,87" fill="#586e4b" stroke="#141312" strokeWidth="1" />
        <path d="M56,75 Q70,70 72,62 Q62,64 55,72" fill="#586e4b" stroke="#141312" strokeWidth="1" />

        {/* Flower 1: Red Poppy */}
        <g transform="translate(30, 42)">
          <ellipse cx="0" cy="0" rx="14" ry="11" fill="#d73b22" stroke="#141312" strokeWidth="1.8" />
          <ellipse cx="0" cy="0" rx="9" ry="7" fill="#e85d3f" />
          <circle cx="0" cy="0" r="4" fill="#141312" />
          <circle cx="1.5" cy="-1" r="1.5" fill="#fff" />
        </g>

        {/* Flower 2: Golden Daisy */}
        <g transform="translate(58, 32)">
          {/* Petals */}
          <circle cx="-10" cy="0" r="4.5" fill="#fffef9" stroke="#141312" strokeWidth="1" />
          <circle cx="10" cy="0" r="4.5" fill="#fffef9" stroke="#141312" strokeWidth="1" />
          <circle cx="0" cy="-10" r="4.5" fill="#fffef9" stroke="#141312" strokeWidth="1" />
          <circle cx="0" cy="10" r="4.5" fill="#fffef9" stroke="#141312" strokeWidth="1" />
          <circle cx="-7" cy="-7" r="4.5" fill="#fffef9" stroke="#141312" strokeWidth="1" />
          <circle cx="7" cy="-7" r="4.5" fill="#fffef9" stroke="#141312" strokeWidth="1" />
          <circle cx="-7" cy="7" r="4.5" fill="#fffef9" stroke="#141312" strokeWidth="1" />
          <circle cx="7" cy="7" r="4.5" fill="#fffef9" stroke="#141312" strokeWidth="1" />
          {/* Golden Center */}
          <circle cx="0" cy="0" r="6" fill="#d48a28" stroke="#141312" strokeWidth="1.5" />
        </g>

        {/* Flower 3: Blue Cornflower / Wild Bell */}
        <g transform="translate(75, 48)">
          <path d="M-8,-4 Q0,-12 8,-4 Q6,6 0,10 Q-6,6 -8,-4 Z" fill="#2563eb" stroke="#141312" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill="#d73b22" />
        </g>
      </svg>
    </div>
  );
}
