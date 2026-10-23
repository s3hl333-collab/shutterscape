"use client";

interface StoicArtProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  quote?: string;
}

export function StoicArt({ size = "md", className = "", quote = "ARS LONGA, VITA BREVIS" }: StoicArtProps) {
  const dimensions = {
    sm: "w-28 h-36",
    md: "w-44 h-56",
    lg: "w-64 h-80",
  }[size];

  return (
    <div className={`relative inline-block select-none group ${className}`}>
      {/* Background Classical Arch / Halo */}
      <div className="absolute -inset-2 rounded-t-full border border-ink/25 bg-[#faf0dc] -z-10 shadow-[3px_4px_0px_rgba(20,19,18,0.2)]" />

      {/* Classical Bust Artwork with Camera Lens Eye */}
      <div className={`relative ${dimensions} flex flex-col items-center justify-center p-2`}>
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full drop-shadow-md text-ink fill-current transition-transform duration-500 group-hover:scale-105"
        >
          {/* Classical Head Outline */}
          <path
            d="M70,40 C75,20 125,20 130,40 C145,50 150,80 145,100 C140,120 135,140 120,165 C115,175 125,190 140,210 L60,210 C75,190 85,175 80,165 C65,140 60,120 55,100 C50,80 55,50 70,40 Z"
            fill="#f7efe0"
            stroke="#141312"
            strokeWidth="3.5"
          />

          {/* Curly Classical Hair / Laurel Wreath */}
          <path
            d="M65,45 C55,30 75,15 95,20 C110,15 130,22 135,38 C145,45 142,65 135,70 C125,60 120,40 100,42 C85,42 75,55 65,45 Z"
            fill="#e2d4bc"
            stroke="#141312"
            strokeWidth="2.5"
          />
          {/* Floral Laurel Sprig in Hair */}
          <circle cx="82" cy="28" r="4" fill="#d73b22" />
          <circle cx="100" cy="22" r="4" fill="#d48a28" />
          <circle cx="118" cy="26" r="4" fill="#00e676" />

          {/* Classical Nose & Stern Eyebrow */}
          <path
            d="M95,70 L108,70 L105,115 L92,120 Z"
            fill="#ede0cc"
            stroke="#141312"
            strokeWidth="2"
          />
          {/* Stoic Lips */}
          <path
            d="M92,142 Q102,138 112,142 Q102,150 92,142 Z"
            fill="#d6c6ad"
            stroke="#141312"
            strokeWidth="2"
          />

          {/* Left Eye: Classical Sculpted Eye */}
          <path d="M78,85 Q88,80 96,87 Q88,93 78,85 Z" fill="#fff" stroke="#141312" strokeWidth="2" />
          <circle cx="88" cy="86" r="3.5" fill="#141312" />

          {/* Right Eye: CYBORG CAMERA LENS MONOCLE! */}
          <circle cx="118" cy="86" r="14" fill="#181514" stroke="#d73b22" strokeWidth="2.5" />
          <circle cx="118" cy="86" r="9" fill="#00e676" opacity="0.6" />
          <circle cx="118" cy="86" r="4" fill="#fff" />
          {/* Laser beam / gaze emission line */}
          <line x1="118" y1="86" x2="190" y2="70" stroke="#d73b22" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Neck & Shoulder Pedestal Drapes */}
          <path
            d="M60,210 C70,185 85,175 100,175 C115,175 130,185 140,210 L160,235 L40,235 Z"
            fill="#e2d4bc"
            stroke="#141312"
            strokeWidth="3"
          />
          <path d="M75,190 Q100,205 125,190" stroke="#141312" strokeWidth="2" fill="none" />
        </svg>

        {/* Stoic Inscription Banner Ribbon */}
        {quote && (
          <div className="absolute -bottom-3 inset-x-0 flex justify-center z-10">
            <span className="dymo-label text-[0.62rem] py-0.5 px-2 tracking-wider whitespace-nowrap bg-ink text-ivory border border-white/20 transform -rotate-1 shadow">
              {quote}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
