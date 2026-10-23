export const C: Record<string, string> = {
  k: "#1d1a17",
  b: "#6b3a22",
  w: "#fbf8f0",
  y: "#e0a526",
  t: "#1f6f6a",
  d: "#d9482b",
  s: "#d9cdb3",
};

export const px = (rows: string[], m: Record<string, string> = {}): string => {
  let r = "";
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      const f = m[c] || C[c];
      if (c !== "." && f) {
        r += `<rect x="${x}" y="${y}" width="1.03" height="1.03" fill="${f}"/>`;
      }
    })
  );
  return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
};

export const mir = (h: string[]): string[] =>
  h.map((r) => r + [...r].reverse().join(""));

export const INV = [
  "..k.....k..",
  "...k...k...",
  "..kkkkkkk..",
  ".kk.kkk.kk.",
  "kkkkkkkkkkk",
  "k.kkkkkkk.k",
  "k.k.....k.k",
  "...kk.kk...",
];

export const eyeS = (c: string): string =>
  `<svg viewBox="0 0 200 120" aria-hidden="true"><defs><clipPath id="ec"><path d="M4 60Q100-30 196 60Q100 150 4 60Z"/></clipPath></defs><path d="M4 60Q100-30 196 60Q100 150 4 60Z" fill="#fbf8f0" stroke="#1d1a17" stroke-width="5"/><g clip-path="url(#ec)"><g class="pu"><circle cx="100" cy="60" r="40" fill="${c}" stroke="#1d1a17" stroke-width="4"/><circle cx="100" cy="60" r="25" fill="#e0a526"/><circle cx="100" cy="60" r="13" fill="#1d1a17"/><circle cx="108" cy="52" r="5" fill="#fbf8f0"/></g></g><path d="M22 38l-14-14M52 20L44 2M100 12V-6M148 20l8-18M178 38l14-14" stroke="#1d1a17" stroke-width="5" stroke-linecap="round"/></svg>`;

export const CAMC: Record<string, string> = {
  k: "#1d1a17",
  d: "#d9482b",
  s: "#cfc9bb",
  c: "#4f8fc0",
  w: "#fff",
  y: "#e0a526",
};

export function camRows(only?: number | boolean): string[] {
  const W = 22,
    H = 15,
    g = Array.from({ length: H }, () => Array(W).fill(".")),
    set = (x: number, y: number, c: string) => {
      if (x >= 0 && x < W && y >= 0 && y < H) g[y][x] = c;
    };
  if (!only) {
    for (let y = 3; y <= 14; y++)
      for (let x = 0; x < W; x++)
        set(x, y, x == 0 || x == W - 1 || y == 3 || y == 14 ? "k" : "d");
    for (let x = 8; x <= 13; x++) {
      set(x, 1, "k");
      set(x, 2, "s");
    }
    set(7, 2, "k");
    set(14, 2, "k");
    set(3, 2, "y");
    set(4, 2, "y");
    set(3, 1, "y");
    set(4, 1, "y");
    for (let y = 4; y <= 5; y++) {
      for (let x = 16; x <= 19; x++) set(x, y, "w");
      for (let x = 2; x <= 4; x++) set(x, y, "c");
    }
    for (let y = 6; y <= 13; y += 2) {
      set(1, y, "k");
      set(20, y, "k");
    }
    set(19, 12, "y");
  }
  const cx = 10.5,
    cy = 8.5;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d <= 5.6)
        set(
          x,
          y,
          d <= 1.5 ? "k" : d <= 3.2 ? "c" : d <= 3.9 ? "k" : d <= 4.8 ? "s" : "k"
        );
    }
  set(8, 6, "w");
  set(9, 6, "w");
  set(8, 7, "w");
  return g.map((r) => r.join(""));
}

export const ART: Record<string, () => string> = {
  eye: () => eyeS("#d9482b"),
  cloud: () =>
    px(
      [
        ".....wwww.......",
        "...wwwwwwww.ww..",
        ".wwwwwwwwwwwwww.",
        "wwwwwwwwwwwwwwww",
        ".ssssssssssssss.",
      ],
      { w: "#cfeaf7", s: "#8ec5e3" }
    ),
  eagle: () =>
    px(
      mir([
        "kk........",
        "kkkk......",
        ".kkkkk....",
        "..kkkkkk..",
        "...bbbbbbb",
        "....bbbbbw",
        "....bbbbww",
        "......bbwy",
      ])
    ),
  invader: () => px(INV, { k: C.t }),
  invader2: () => px(INV, { k: C.d }),
  camera: () => px(camRows(), CAMC),
  snake: () => {
    const d =
      "M-20 70C80 5 170 5 260 70S440 135 540 70S720 5 820 70S1000 135 1090 80";
    return `<svg viewBox="0 0 1200 130" aria-hidden="true"><path d="${d}" fill="none" stroke="#1d1a17" stroke-width="38" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#1f6f6a" stroke-width="28" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#8fae8b" stroke-width="16" stroke-dasharray="3 13"/><ellipse cx="1118" cy="86" rx="36" ry="22" fill="#1f6f6a" stroke="#1d1a17" stroke-width="5"/><circle cx="1124" cy="78" r="6" fill="#e0a526" stroke="#1d1a17" stroke-width="2"/><path d="M1152 90l36-6m-36 6l34 12" stroke="#d9482b" stroke-width="4" stroke-linecap="round"/></svg>`;
  },
  flower: () => {
    let p = "";
    for (let i = 0; i < 10; i++)
      p += `<ellipse cx="40" cy="44" rx="6" ry="15" fill="#fbf8f0" stroke="#1d1a17" stroke-width="2.5" transform="rotate(${i * 36} 40 70)"/>`;
    let s = "";
    for (let i = 0; i < 9; i++)
      s += `<path d="M70 30L${70 + Math.cos(i * 0.7) * 30} ${30 + Math.sin(i * 0.7) * 30}" stroke="#5a2a3c" stroke-width="6" stroke-linecap="round"/>`;
    return `<svg viewBox="0 0 140 220" aria-hidden="true"><g stroke="#2f6b4f" stroke-width="5" fill="none" stroke-linecap="round"><path d="M40 70C46 130 30 170 40 220"/><path d="M95 112C88 160 104 190 96 220"/><path d="M70 30C66 100 78 160 70 220"/></g><ellipse cx="22" cy="150" rx="18" ry="7" fill="#2f6b4f" transform="rotate(-30 22 150)"/><ellipse cx="116" cy="170" rx="18" ry="7" fill="#2f6b4f" transform="rotate(30 116 170)"/>${p}<circle cx="40" cy="70" r="9" fill="#e0a526" stroke="#1d1a17" stroke-width="2.5"/><path d="M80 118Q84 84 95 100Q106 84 110 118Q96 130 80 118Z" fill="#d9482b" stroke="#1d1a17" stroke-width="3"/>${s}<circle cx="70" cy="30" r="8" fill="#e0a526" stroke="#1d1a17" stroke-width="2.5"/></svg>`;
  },
  dragon: () => {
    const d =
      "M10 105C50 15 95 20 125 85S195 145 225 80S262 30 268 62";
    return `<svg viewBox="0 0 330 150" aria-hidden="true"><path d="${d}" fill="none" stroke="#1d1a17" stroke-width="26" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#e8c27a" stroke-width="16" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#d9482b" stroke-width="22" stroke-dasharray="4 14"/><path d="M100 40l8-22 10 20M160 112l6 24 10-22M60 30l-4-20 14 12" fill="#e0a526" stroke="#1d1a17" stroke-width="3"/><path d="M262 48L306 38 322 58 304 78 266 74Z" fill="#e8c27a" stroke="#1d1a17" stroke-width="4"/><path d="M270 46L260 14M286 42L290 10" stroke="#1d1a17" stroke-width="5" stroke-linecap="round"/><circle cx="288" cy="54" r="5" fill="#d9482b" stroke="#1d1a17" stroke-width="2"/><path d="M320 62q-6 20 6 34M312 76q4 20 18 22" fill="none" stroke="#e0a526" stroke-width="3"/><path d="M12 108l-8 20 22-6" fill="#5a2a3c" stroke="#1d1a17" stroke-width="3"/></svg>`;
  },
  bust: () =>
    `<svg viewBox="0 0 160 250" aria-hidden="true"><rect x="28" y="196" width="104" height="48" fill="#e8dfc8" stroke="#1d1a17" stroke-width="4"/><path d="M48 196v48M68 196v48M92 196v48M112 196v48" stroke="#b9ad90" stroke-width="3"/><path d="M14 196Q14 150 80 142Q146 150 146 196Z" fill="#e8dfc8" stroke="#1d1a17" stroke-width="4"/><rect x="64" y="112" width="32" height="38" fill="#e8dfc8" stroke="#1d1a17" stroke-width="4"/><ellipse cx="80" cy="82" rx="36" ry="46" fill="#e8dfc8" stroke="#1d1a17" stroke-width="4"/><path d="M80 36a40 46 0 0 0 0 92c40 0 40-92 0-92" fill="#1d1a17" opacity=".1"/><g fill="#e8dfc8" stroke="#1d1a17" stroke-width="3"><circle cx="52" cy="46" r="10"/><circle cx="68" cy="38" r="11"/><circle cx="86" cy="36" r="11"/><circle cx="104" cy="44" r="10"/></g><path d="M52 70q8-6 16 0M92 70q8-6 16 0" stroke="#1d1a17" stroke-width="4" fill="none"/><ellipse cx="60" cy="78" rx="6" ry="3.5" fill="#1d1a17"/><ellipse cx="100" cy="78" rx="6" ry="3.5" fill="#1d1a17"/><path d="M80 78v18l-6 2" stroke="#1d1a17" stroke-width="3" fill="none"/><path d="M52 100q10 36 28 30q18 6 28-30q-10 14-28 12q-18 2-28-12Z" fill="#d6cbb0" stroke="#1d1a17" stroke-width="3"/><text x="80" y="226" font-size="12" text-anchor="middle" letter-spacing="3" fill="#1d1a17" font-family="Syne">VIDERE</text></svg>`,
  planet: () =>
    `<svg viewBox="0 0 280 180" aria-hidden="true"><defs><clipPath id="pc"><circle cx="140" cy="90" r="62"/></clipPath></defs><g transform="rotate(-16 140 90)"><ellipse cx="140" cy="90" rx="130" ry="26" fill="none" stroke="#f3ecdc" stroke-width="8" opacity=".5"/><circle cx="140" cy="90" r="62" fill="#e0a526"/><g clip-path="url(#pc)"><rect x="70" y="60" width="140" height="14" fill="#d9482b"/><rect x="70" y="96" width="140" height="22" fill="#5a2a3c" opacity=".6"/><circle cx="170" cy="72" r="9" fill="#b9801c"/></g><circle cx="140" cy="90" r="62" fill="none" stroke="#1d1a17" stroke-width="4"/><path d="M10 90A130 26 0 0 0 270 90" fill="none" stroke="#f3ecdc" stroke-width="8"/></g><circle cx="248" cy="22" r="9" fill="#8fae8b"/></svg>`,
  alien: () =>
    `<svg viewBox="0 0 160 200" aria-hidden="true"><path d="M80 6C152 6 160 100 100 188Q80 204 60 188C0 100 8 6 80 6Z" fill="#8fae8b" stroke="#f3ecdc" stroke-width="4"/><path d="M26 82Q60 66 74 112Q40 122 26 82Z" fill="#1d1a17"/><path d="M134 82Q100 66 86 112Q120 122 134 82Z" fill="#1d1a17"/><circle cx="48" cy="92" r="4" fill="#f3ecdc"/><circle cx="112" cy="92" r="4" fill="#f3ecdc"/><path d="M70 160h20" stroke="#1d1a17" stroke-width="4" stroke-linecap="round"/></svg>`,
  ufo: () =>
    `<svg viewBox="0 0 200 160" aria-hidden="true"><path d="M82 76L34 160H166L118 76Z" fill="#e0a526" opacity=".35"/><ellipse cx="100" cy="50" rx="36" ry="32" fill="#8fae8b" stroke="#1d1a17" stroke-width="4"/><ellipse cx="100" cy="74" rx="92" ry="24" fill="#5a2a3c" stroke="#1d1a17" stroke-width="4"/><g fill="#e0a526" stroke="#1d1a17" stroke-width="2"><circle cx="32" cy="78" r="6"/><circle cx="66" cy="90" r="6"/><circle cx="100" cy="94" r="6"/><circle cx="134" cy="90" r="6"/><circle cx="168" cy="78" r="6"/></g><circle cx="90" cy="46" r="5" fill="#1d1a17"/><circle cx="112" cy="46" r="5" fill="#1d1a17"/></svg>`,
  moon: () =>
    `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="74" fill="#f6e7c0" stroke="#1d1a17" stroke-width="5"/><g fill="#e3cf9c"><circle cx="38" cy="40" r="10"/><circle cx="124" cy="50" r="14"/><circle cx="116" cy="124" r="8"/></g><path d="M40 72q14 12 28 0M92 72q14 12 28 0M80 80v14l-6 2M58 110q22 20 44 0" fill="none" stroke="#1d1a17" stroke-width="5" stroke-linecap="round"/><circle cx="44" cy="96" r="9" fill="#d9482b" opacity=".4"/><circle cx="116" cy="96" r="9" fill="#d9482b" opacity=".4"/></svg>`,
  hand: () =>
    `<svg viewBox="0 0 140 210" aria-hidden="true"><g fill="#e8b88a" stroke="#1d1a17" stroke-width="4"><rect x="12" y="60" width="22" height="80" rx="11"/><rect x="38" y="22" width="22" height="110" rx="11"/><rect x="64" y="8" width="22" height="120" rx="11"/><rect x="90" y="26" width="22" height="104" rx="11"/><path d="M12 140L-8 108q-6-16 8-18q10 0 18 16Z"/><path d="M12 108Q6 192 68 202Q126 198 118 108Z"/></g><path d="M30 148Q66 112 102 148Q66 184 30 148Z" fill="#fbf8f0" stroke="#1d1a17" stroke-width="4"/><circle cx="66" cy="148" r="14" fill="#1f6f6a" stroke="#1d1a17" stroke-width="3"/><circle cx="66" cy="148" r="6" fill="#1d1a17"/></svg>`,
  moth: () => {
    const w = `<path d="M100 70C60 0 10 10 8 50C6 85 60 90 100 74Z" fill="#d9482b" stroke="#1d1a17" stroke-width="4"/><path d="M100 76C70 90 40 130 60 134C86 138 100 110 100 76Z" fill="#e0a526" stroke="#1d1a17" stroke-width="4"/><circle cx="48" cy="46" r="16" fill="#1d1a17"/><circle cx="48" cy="46" r="10" fill="#e0a526"/><circle cx="48" cy="46" r="4" fill="#1d1a17"/>`;
    return `<svg viewBox="0 0 200 140" aria-hidden="true"><g>${w}</g><g transform="translate(200 0) scale(-1 1)">${w}</g><ellipse cx="100" cy="78" rx="8" ry="32" fill="#1d1a17"/><path d="M96 48Q86 20 70 14M104 48Q114 20 130 14" fill="none" stroke="#1d1a17" stroke-width="3"/></svg>`;
  },
  column: () =>
    `<svg viewBox="0 0 90 270" aria-hidden="true"><g fill="#e8dfc8" stroke="#1d1a17" stroke-width="4"><rect x="6" y="4" width="78" height="16"/><rect x="14" y="20" width="62" height="10"/><path d="M20 30L16 240H74L70 30Z"/><rect x="6" y="240" width="78" height="22"/></g><path d="M34 34v204M45 34v204M56 34v204" stroke="#b9ad90" stroke-width="3"/><path d="M62 70l-10 16 12 10-10 18" fill="none" stroke="#1d1a17" stroke-width="3"/><path d="M20 240q-14-20 0-40q6 24 0 40Z" fill="#2f6b4f"/></svg>`,
  ghost: () =>
    px(
      [
        "..pppppp..",
        ".pppppppp.",
        "pppppppppp",
        "pwwppwwppp",
        "pwkppwkppp",
        "pppppppppp",
        "ppppkkpppp",
        "pppppppppp",
        "pppppppppp",
        "pp.pp.pp.p",
      ],
      { p: "#5a2a3c" }
    ),
  mushroom: () =>
    px([
      "...ddddd...",
      ".ddwdddddd.",
      "ddddddwdddd",
      "dwdddddddwd",
      "ddddddddddd",
      "...ssssss..",
      "...ssssss..",
      "...ssssss..",
      ".ssssssssss",
    ]),
  rocket: () =>
    px([
      "...k...",
      "..kdk..",
      "..kdk..",
      ".kdddk.",
      ".kdwwdk",
      ".kdwwdk",
      ".kdddk.",
      "kkdddkk",
      "k.kkk.k",
      "..y.y..",
      "..yyy..",
      "...y...",
    ]),
  sun: () => {
    let r = "";
    for (let i = 0; i < 14; i++)
      r += `<path d="M100 8L112 40L88 40Z" fill="#e0a526" stroke="#1d1a17" stroke-width="3" transform="rotate(${(i * 360) / 14} 100 100)"/>`;
    return `<svg viewBox="0 0 200 200" aria-hidden="true">${r}<circle cx="100" cy="100" r="58" fill="#e0a526" stroke="#1d1a17" stroke-width="5"/><path d="M52 100Q100 62 148 100Q100 138 52 100Z" fill="#fbf8f0" stroke="#1d1a17" stroke-width="4"/><circle cx="100" cy="100" r="19" fill="#1f6f6a" stroke="#1d1a17" stroke-width="3"/><circle cx="100" cy="100" r="8" fill="#1d1a17"/></svg>`;
  },
  koi: () =>
    `<svg viewBox="0 0 220 110" aria-hidden="true"><path d="M150 55L212 20Q198 55 212 90Z" fill="#d9482b" stroke="#1d1a17" stroke-width="4"/><path d="M30 55Q80 0 150 45Q175 55 150 65Q80 110 30 55Z" fill="#fbf8f0" stroke="#1d1a17" stroke-width="4"/><path d="M72 26Q104 18 112 40Q92 58 66 48Z" fill="#d9482b"/><path d="M118 62Q140 56 148 62Q132 80 112 78Z" fill="#e0a526"/><path d="M90 84Q96 108 118 100Q112 88 104 80Z" fill="#d9482b" stroke="#1d1a17" stroke-width="3"/><circle cx="50" cy="50" r="6" fill="#1d1a17"/></svg>`,
  cactus: () =>
    px(
      [
        "....yy....",
        "....gg....",
        "gg..gg.gg.",
        "gg..gg.gg.",
        "gggggg.gg.",
        "...gggggg.",
        "....gg....",
        "....gg....",
        "..dddddd..",
        "..dddddd..",
        "...dddd...",
      ],
      { g: "#2f6b4f" }
    ),
  eyeball: () => {
    const fb = Array.from(
      { length: 28 },
      (_, i) =>
        `<path d="M80 80L${80 + 32 * Math.cos(i * 0.2244)} ${80 + 32 * Math.sin(i * 0.2244)}" stroke="#f0cf86" stroke-width=".9" opacity=".4"/>`
    ).join("");
    return `<svg viewBox="0 0 160 230" aria-hidden="true"><defs><radialGradient id="sc" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fffdf8"/><stop offset=".7" stop-color="#eadccf"/><stop offset="1" stop-color="#b98c82"/></radialGradient><radialGradient id="ir" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#d9a441"/><stop offset=".55" stop-color="#8a5a1d"/><stop offset=".92" stop-color="#2f2a14"/><stop offset="1" stop-color="#14110a"/></radialGradient><radialGradient id="sh" cx=".38" cy=".3" r=".85"><stop offset=".55" stop-color="#3a0f08" stop-opacity="0"/><stop offset="1" stop-color="#3a0f08" stop-opacity=".5"/></radialGradient><linearGradient id="nv" x1="0" x2="1"><stop offset="0" stop-color="#c98f86"/><stop offset=".5" stop-color="#f0c7bb"/><stop offset="1" stop-color="#b97a72"/></linearGradient></defs><path d="M62 140Q58 190 36 224L74 214Q80 180 84 146Z" fill="url(#nv)" stroke="#6b3b36" stroke-width="2"/><path d="M84 142Q100 190 132 226L112 190Q96 160 98 140Z" fill="url(#nv)" stroke="#6b3b36" stroke-width="2"/><circle cx="80" cy="80" r="70" fill="url(#sc)" stroke="#8c5a52" stroke-width="2"/><g fill="none" stroke="#c0392b" stroke-width="1.3" opacity=".55"><path d="M12 90Q30 84 44 70M14 70Q34 72 46 56M148 84Q130 90 116 74M146 62Q128 66 118 52M80 148Q74 128 62 118M84 148Q92 130 106 120M20 110Q36 104 50 112"/></g><g class="pu" data-k=".45"><circle cx="80" cy="80" r="32" fill="url(#ir)"/>${fb}<circle cx="80" cy="80" r="14" fill="#050403"/></g><circle cx="80" cy="80" r="70" fill="url(#sh)"/><ellipse cx="62" cy="52" rx="14" ry="8" fill="#fff" opacity=".8" transform="rotate(-30 62 52)"/><circle cx="96" cy="100" r="3" fill="#fff" opacity=".5"/></svg>`;
  },
  mouth: () => "",
  ear: () =>
    `<svg viewBox="0 0 120 180" aria-hidden="true"><defs><linearGradient id="sk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4cfae"/><stop offset="1" stop-color="#d08e6c"/></linearGradient></defs><path d="M60 4C108 2 120 60 98 100C90 118 92 140 70 160C54 174 34 164 38 140C40 126 28 130 24 110C14 70 24 6 60 4Z" fill="url(#sk)" stroke="#7a4630" stroke-width="3"/><g fill="none" stroke="#a6644c" stroke-width="3" stroke-linecap="round"><path d="M62 30C90 30 94 70 78 96M52 50C66 50 70 74 60 96M48 100Q40 130 52 148"/></g><path d="M52 96Q60 112 72 100Q66 88 52 96Z" fill="#4a2018"/><path d="M96 70Q88 110 66 154" fill="none" stroke="#fff" stroke-width="4" opacity=".25"/></svg>`,
  feather: () => {
    let b = "";
    for (let i = 0; i < 34; i++) {
      const y = 26 + i * 6,
        w = 24 - Math.abs(i - 14) * 0.7,
        c = i % 2 ? "#8a5a35" : "#c9a06a";
      b += `<path d="M30 ${y}Q${30 - w * 0.5} ${y + 4} ${30 - w} ${y + 16}M30 ${y}Q${30 + w * 0.5} ${y + 4} ${30 + w} ${y + 16}" stroke="${c}" stroke-width="1.6" fill="none"/>`;
    }
    return `<svg viewBox="0 0 60 250" aria-hidden="true">${b}<path d="M30 8Q34 120 30 246" stroke="#4a2d18" stroke-width="3" fill="none"/></svg>`;
  },
  cloudw: () =>
    px(
      [
        ".....wwww.......",
        "...wwwwwwww.ww..",
        ".wwwwwwwwwwwwww.",
        "wwwwwwwwwwwwwwww",
        ".ssssssssssssss.",
      ],
      { w: "#ffffff", s: "#d3e6f1" }
    ),
};

const rnd = (s: number) => () => ((s = (s * 16807) % 2147483647) / 2147483647);

export function scene(s: number): string {
  const r = rnd(s * 131 + 7),
    P = [
      "#d9482b",
      "#e0a526",
      "#1f6f6a",
      "#5a2a3c",
      "#8fae8b",
      "#1d1a17",
      "#fbf8f0",
    ],
    q = () => P[Math.floor(r() * 7)],
    bg = P[Math.floor(r() * 6)];
  let g = `<rect width="200" height="200" fill="${bg}"/>`;
  const k = s % 4;
  if (k == 0) {
    g += `<circle cx="${60 + r() * 80}" cy="${60 + r() * 50}" r="${30 + r() * 30}" fill="${q()}"/>`;
    for (let i = 0; i < 5; i++)
      g += `<rect y="${120 + i * 16}" width="200" height="${4 + i * 2}" fill="${q()}"/>`;
  } else if (k == 1) {
    for (let i = 6; i > 0; i--)
      g += `<circle cx="${90 + r() * 20}" cy="${90 + r() * 20}" r="${i * 16}" fill="${q()}"/>`;
  } else if (k == 2) {
    for (let i = 0; i < 7; i++)
      g += `<path d="M${r() * 200} 0L${r() * 200} 200L${r() * 200} 200Z" fill="${q()}" opacity=".85"/>`;
  } else {
    for (let i = 0; i < 9; i++)
      g += `<ellipse cx="100" cy="46" rx="14" ry="40" fill="${q()}" transform="rotate(${i * 40} 100 100)"/>`;
    g += `<circle cx="100" cy="100" r="16" fill="${q()}"/>`;
  }
  return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Generated placeholder frame">${g}</svg>`;
}
