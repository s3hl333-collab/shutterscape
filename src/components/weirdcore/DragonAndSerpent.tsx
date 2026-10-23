"use client";

interface MythicProps {
  className?: string;
  size?: number;
}

/** Oriental celestial dragon winding through the sky & clouds. */
export function CelestialDragon({ className = "", size = 260 }: MythicProps) {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.65 }}>
      <svg
        viewBox="0 0 320 200"
        className="w-full h-full drop-shadow-[2px_3px_0px_rgba(20,19,18,0.3)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dragon Spine Curves */}
        <path
          d="M20,140 Q50,70 100,100 T180,90 T260,110 T300,50"
          stroke="#141312"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M20,140 Q50,70 100,100 T180,90 T260,110 T300,50"
          stroke="#d73b22"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Dragon Scales */}
        <path
          d="M25,138 Q50,73 100,98 T180,88 T260,108 T295,52"
          stroke="#d48a28"
          strokeWidth="2"
          strokeDasharray="4 6"
        />

        {/* Dragon Spines & Back Fins */}
        <path d="M45,80 L52,65 L58,82" fill="#d73b22" stroke="#141312" strokeWidth="1.5" />
        <path d="M75,82 L82,66 L88,86" fill="#d73b22" stroke="#141312" strokeWidth="1.5" />
        <path d="M125,92 L132,74 L138,94" fill="#d73b22" stroke="#141312" strokeWidth="1.5" />
        <path d="M165,85 L172,68 L178,88" fill="#d73b22" stroke="#141312" strokeWidth="1.5" />
        <path d="M210,95 L217,78 L223,98" fill="#d73b22" stroke="#141312" strokeWidth="1.5" />
        <path d="M245,105 L252,88 L258,108" fill="#d73b22" stroke="#141312" strokeWidth="1.5" />

        {/* Dragon Head (Right side) */}
        <g transform="translate(270, 20)">
          {/* Horns */}
          <path d="M15,22 Q30,5 45,8" stroke="#141312" strokeWidth="3" fill="none" />
          <path d="M12,28 Q25,18 38,20" stroke="#141312" strokeWidth="2.5" fill="none" />
          {/* Snout & Jaw */}
          <path
            d="M5,35 Q25,25 40,30 Q46,38 35,45 Q20,44 12,48 Z"
            fill="#d73b22"
            stroke="#141312"
            strokeWidth="2.5"
          />
          {/* Whiskers */}
          <path d="M38,32 Q50,42 60,38" stroke="#d48a28" strokeWidth="2" fill="none" />
          <path d="M35,40 Q48,55 58,58" stroke="#d48a28" strokeWidth="1.8" fill="none" />
          {/* Eye */}
          <circle cx="24" cy="30" r="3.5" fill="#fff" stroke="#141312" strokeWidth="1.5" />
          <circle cx="25" cy="30" r="1.5" fill="#141312" />
          {/* Pearl / Sacred Camera Lens in Front of Dragon */}
          <circle cx="55" cy="48" r="8" fill="#181514" stroke="#d48a28" strokeWidth="2" />
          <circle cx="55" cy="48" r="4" fill="#00e676" />
        </g>

        {/* Dragon Claws */}
        <g transform="translate(85, 95)">
          <path d="M0,0 L-6,22 M-6,22 L-12,28 M-6,22 L-4,30 M-6,22 L2,27" stroke="#141312" strokeWidth="2.5" />
        </g>
        <g transform="translate(200, 95)">
          <path d="M0,0 L-4,20 M-4,20 L-10,26 M-4,20 L-2,28 M-4,20 L4,25" stroke="#141312" strokeWidth="2.5" />
        </g>

        {/* Tail Tufts */}
        <path d="M20,140 Q5,150 2,165 Q15,155 25,150 Q12,168 25,175" stroke="#d73b22" strokeWidth="2.5" fill="none" />
      </svg>
    </div>
  );
}

/** Eagle and Serpent in surreal photographic balance. */
export function EagleAndSerpent({ className = "", size = 220 }: MythicProps) {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none">
        {/* Serpent Coiled Around 35mm Lens */}
        <g transform="translate(100, 115)">
          {/* Central Camera Lens */}
          <circle cx="0" cy="0" r="32" fill="#181514" stroke="#141312" strokeWidth="3" />
          <circle cx="0" cy="0" r="24" fill="#262220" stroke="#d48a28" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="15" fill="#0c0b0a" stroke="#d73b22" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="6" fill="#00e676" />

          {/* Coiled Snake Body around the lens */}
          <path
            d="M-36,5 C-42,-25 0,-44 32,-30 C55,-18 52,20 28,36 C5,50 -35,38 -36,5"
            stroke="#141312"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M-36,5 C-42,-25 0,-44 32,-30 C55,-18 52,20 28,36 C5,50 -35,38 -36,5"
            stroke="#d48a28"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Snake Diamond Pattern */}
          <path
            d="M-36,5 C-42,-25 0,-44 32,-30 C55,-18 52,20 28,36"
            stroke="#141312"
            strokeWidth="2"
            strokeDasharray="2 6"
          />

          {/* Snake Head */}
          <g transform="translate(32, -32) rotate(45)">
            <ellipse cx="0" cy="0" rx="9" ry="6" fill="#d73b22" stroke="#141312" strokeWidth="2" />
            <circle cx="3" cy="-2" r="1.5" fill="#fff" />
            <circle cx="3" cy="-2" r="0.8" fill="#141312" />
            {/* Forked Tongue */}
            <path d="M9,0 L16,0 M16,0 L20,-3 M16,0 L20,3" stroke="#d73b22" strokeWidth="1.5" />
          </g>
        </g>

        {/* Majestic Eagle Soaring from Above with Film Strip */}
        <g transform="translate(100, 52)">
          {/* Wings */}
          <path
            d="M0,10 C-35,-25 -80,-20 -95,-5 C-75,10 -50,15 -25,20 L0,22 L25,20 C50,15 75,10 95,-5 C80,-20 35,-25 0,10 Z"
            fill="#e2d4bc"
            stroke="#141312"
            strokeWidth="3"
          />
          {/* Wing Feather Ribs */}
          <path d="M-80,-2 L-40,16 M-60,-10 L-25,18 M60,-10 L25,18 M80,-2 L40,16" stroke="#141312" strokeWidth="1.5" />

          {/* Eagle Body & Tail */}
          <path d="M-12,18 L-18,48 L0,40 L18,48 L12,18 Z" fill="#d6c6ad" stroke="#141312" strokeWidth="2.5" />

          {/* Eagle Head */}
          <circle cx="0" cy="5" r="12" fill="#fffdf9" stroke="#141312" strokeWidth="2.5" />
          <circle cx="3" cy="3" r="2.5" fill="#d73b22" />
          {/* Golden Hooked Beak */}
          <path d="M0,8 Q12,10 14,18 Q8,16 0,13 Z" fill="#d48a28" stroke="#141312" strokeWidth="2" />

          {/* Film Negative Strip held in Talons */}
          <rect x="-35" y="44" width="70" height="14" rx="2" fill="#181514" stroke="#d48a28" strokeWidth="1.5" />
          <line x1="-30" y1="48" x2="30" y2="48" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="-30" y1="54" x2="30" y2="54" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>
      </svg>
    </div>
  );
}
