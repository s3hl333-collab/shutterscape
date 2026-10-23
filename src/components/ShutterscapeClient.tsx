"use client";

import React, { useEffect, useRef, useState } from "react";
import { ART, CAMC, camRows, px, scene } from "@/lib/art";
import type { ActivityItem, GalleryItem, MemberItem } from "@/lib/db";

interface Props {
  initialGallery: GalleryItem[];
  initialMembers: MemberItem[];
  initialActivities: ActivityItem[];
}

export default function ShutterscapeClient({
  initialGallery,
  initialMembers,
  initialActivities,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<GalleryItem[]>(initialGallery);
  const [members] = useState<MemberItem[]>(initialMembers);
  const [activities] = useState<ActivityItem[]>(initialActivities);

  // Keep a mutable ref to photos so the vanilla TV & random-picker intervals always read the latest gallery list
  const photosRef = useRef<GalleryItem[]>(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  // Run the exact page initialization script from the provided HTML design
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 1. Populate all [data-a] SVG illustrations
    root.querySelectorAll<HTMLElement>("[data-a]").forEach((n) => {
      const key = n.dataset.a;
      if (key && ART[key]) {
        n.innerHTML = ART[key]();
      }
    });

    // 2. Pupils follow the pointer
    const RM = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const onPointerMove = (e: PointerEvent) => {
      root.querySelectorAll<SVGGElement>(".pu").forEach((p) => {
        const svg = p.ownerSVGElement;
        if (!svg) return;
        const b = svg.getBoundingClientRect();
        const x = e.clientX - b.left - b.width / 2;
        const y = e.clientY - b.top - b.height / 2;
        const a = Math.atan2(y, x);
        const d = Math.min(1, Math.hypot(x, y) / 320);
        const k = +(p.dataset.k || 1);
        p.setAttribute(
          "transform",
          `translate(${Math.cos(a) * 30 * d * k} ${Math.sin(a) * 14 * d * k})`
        );
      });
    };
    if (!RM) {
      window.addEventListener("pointermove", onPointerMove);
    }

    // 3. Marquee
    const mqi = root.querySelector("#mqi");
    if (mqi) {
      mqi.innerHTML = [
        "look twice",
        "the light is lying",
        "shoot first, explain later",
        "weird is a focal length",
        "every eye is a lens",
      ]
        .map((t) => `<span>${t}</span><b>◉</b>`)
        .join("")
        .repeat(2);
    }

    // 4. Stories
    const sy = root.querySelector("#sy");
    if (sy) {
      sy.innerHTML = (
        [
          ["The City After Rain", 41, "16/9"],
          ["Between Classes", 42, "4/5"],
          ["A Sky We Almost Missed", 43, "21/9"],
        ] as [string, number, string][]
      )
        .map(
          ([t, sd, ra], i) =>
            `<article class="sy${i % 2 ? " r" : ""}"><figure style="aspect-ratio:${ra}">${scene(sd)}</figure><div><h3>${t}</h3><p>Sample story. Photographer name.</p></div></article>`
        )
        .join("");
    }

    // 5. What We Do (Rituals)
    const rt = root.querySelector("#rt");
    if (rt) {
      rt.innerHTML = (
        [
          [
            "Photo walks",
            "Wander campus and town with cameras and zero plan.",
            "eagle",
            "#e0a526",
            260,
            -2,
          ],
          [
            "Workshops",
            "Light, framing and editing, one strange lesson at a time.",
            "camera",
            "#8fae8b",
            200,
            3,
          ],
          [
            "Critique nights",
            "Honest feedback, served warm.",
            "eye",
            "#fbf8f0",
            230,
            -3,
          ],
          [
            "Photo challenges",
            "A theme, a deadline, no rules about sanity.",
            "invader",
            "#f3ecdc",
            190,
            2,
          ],
          [
            "Member spotlights",
            "One photographer, one body of work.",
            "flower",
            "#d9482b",
            170,
            -1,
          ],
          [
            "Exhibitions",
            "Putting the weird on the wall.",
            "bust",
            "#1f6f6a",
            250,
            2,
          ],
        ] as [string, string, string, string, number, number][]
      )
        .map(
          ([t, d, a, bg, w, r]) =>
            `<div style="width:${w}px;background:${bg};--r:${r}deg"><span class="in" style="width:${w * 0.42}px">${ART[a]()}</span><h3>${t}</h3><p>${d}</p></div>`
        )
        .join("");
    }

    // 6. Helper for rendering photo HTML inside TVs & Random Picker
    function photoHTML(p: GalleryItem) {
      return p.video
        ? `<video src="${p.video}" autoplay muted loop playsinline aria-label="${p.title}"></video>`
        : p.src
          ? `<img src="${p.src}" alt="${p.title}" loading="lazy">`
          : scene(p.seed);
    }

    // 7. Glimpses of Us Retro TVs
    const TVS: [string, number, number, number][] = [
      ["k", 5, 4, 14],
      ["l", 19.5, 4, 18],
      ["k", 22, 43, 13],
      ["m", 36.5, 4, 28],
      ["k", 65, 45, 13],
      ["p", 64, 4, 18],
      ["m", 83, 4, 15],
    ];
    const tvbox = root.querySelector<HTMLElement>("#tvbox");
    const cur: number[] = [];
    const tvTimers: number[] = [];
    if (tvbox) {
      tvbox.innerHTML = TVS.map(
        ([c, l, b, w], i) =>
          `<button class="tvx ${c}" style="left:${l}%;bottom:${b}%;width:${w}%" aria-label="Show another glimpse" data-i="${i}">${[0, 2, 3, 4, 6].includes(i) ? '<i class="an a1"></i><i class="an a2"></i>' : ""}<span class="bz"><span class="sc"></span></span><span class="pn"><span class="gr"></span><span class="kn"><i></i><i></i></span></span><u class="ft"></u><u class="ft r"></u></button>`
      ).join("");

      const show = (i: number) => {
        const list = photosRef.current;
        if (!list.length) return;
        // Prefer uploaded real photos if any exist, while still cycling through all frames
        let k: number;
        do {
          k = Math.floor(Math.random() * list.length);
        } while (k === cur[i] && list.length > 1);
        cur[i] = k;
        const p = list[k];
        const sc = tvbox.children[i]?.querySelector<HTMLElement>(".sc");
        if (!sc) return;
        sc.classList.remove("fl");
        void sc.offsetWidth;
        sc.classList.add("fl");
        sc.innerHTML = photoHTML(p);
        const skyc = root.querySelector("#skyc");
        if (skyc) skyc.textContent = `Glimpse: ${p.title}, ${p.cat}`;
      };

      tvbox.querySelectorAll<HTMLButtonElement>(".tvx").forEach((b, i) => {
        show(i);
        b.onclick = () => show(i);
        if (!RM) {
          const t = () => {
            show(i);
            tvTimers.push(window.setTimeout(t, 4000 + Math.random() * 5000));
          };
          tvTimers.push(window.setTimeout(t, 2000 + Math.random() * 4000));
        }
      });
    }

    // 8. 3D spinning pixel cameras in #tvs
    function cam3(col: string, size: number, sp: number, rev: number) {
      const B = camRows();
      const Lz = camRows(1);
      const map = { ...CAMC, d: col };
      const bs = px(B, map);
      const ls = px(Lz, map);
      const L = 10;
      const st = size * 0.03;
      let h = "";
      for (let i = 0; i < L; i++) {
        h += `<div style="transform:translateZ(${(i - L / 2) * st}px);filter:brightness(${0.5 + (i / L) * 0.4})">${bs}</div>`;
      }
      for (let j = 0; j < 5; j++) {
        h += `<div style="transform:translateZ(${(L / 2 + j) * st}px)">${ls}</div>`;
      }
      return `<div class="c3" style="width:${size}px;animation-duration:${sp}s;animation-direction:${rev ? "reverse" : "normal"}">${h}</div>`;
    }
    const skyS = root.querySelector("#tvs");
    if (skyS) {
      skyS.querySelectorAll(".cw").forEach((n) => n.remove());
      const ks = window.innerWidth < 700 ? 0.6 : 1;
      (
        [
          ["left:2%;top:78px", "#d9482b", 120, 7, 0],
          ["right:2%;top:78px", "#e0a526", 150, 9, 1],
          ["left:2%;bottom:14px", "#5a2a3c", 140, 11, 1],
          ["right:3%;bottom:16px", "#d9482b", 100, 6, 0],
        ] as [string, string, number, number, number][]
      ).forEach(([pos, c, z, sp, r]) => {
        const d = document.createElement("div");
        d.className = "cw";
        d.style.cssText = pos;
        d.setAttribute("aria-hidden", "true");
        d.innerHTML = cam3(c, z * ks, sp, r);
        skyS.append(d);
      });
    }

    // 9. Pick a Random Image (#prompt)
    let lp2 = -1;
    function pick() {
      const list = photosRef.current;
      if (!list.length) return;
      let i: number;
      do {
        i = Math.floor(Math.random() * list.length);
      } while (i === lp2 && list.length > 1);
      lp2 = i;
      const p = list[i];
      const pfi = root?.querySelector("#pfi");
      const pfc = root?.querySelector("#pfc");
      if (pfi) pfi.innerHTML = photoHTML(p);
      if (pfc)
        pfc.textContent = `${p.title}. ${p.cat}. ${p.who}${p.caption ? ` — ${p.caption}` : ""}`;
    }
    pick();
    const spinBtn = root.querySelector<HTMLButtonElement>("#spin");
    if (spinBtn) {
      spinBtn.onclick = () => {
        pick();
        const f = root.querySelector<HTMLElement>("#pf");
        if (f) {
          f.classList.remove("f");
          void f.offsetWidth;
          f.classList.add("f");
        }
      };
    }

    // 10. Weird Dictionary (#dc)
    const dc = root.querySelector("#dc");
    if (dc) {
      dc.innerHTML = (
        [
          [
            "Aperture",
            "The opening the light comes through. Wider means more light and a blurrier background.",
            "eye",
            "#e0a526",
            270,
            -2,
            "#1d1a17",
          ],
          [
            "Shutter speed",
            "How long the eye stays open. Fast freezes motion, slow lets it smear.",
            "camera",
            "#8fae8b",
            220,
            2,
            "#1d1a17",
          ],
          [
            "ISO",
            "How sensitive the sensor is. Higher is brighter and grainier.",
            "invader",
            "#d69e62",
            210,
            -3,
            "#1d1a17",
          ],
          [
            "Focal length",
            "How much of the world fits in. Wide sees more, long pulls things closer.",
            "moon",
            "#deb86c",
            250,
            2,
            "#1d1a17",
          ],
          [
            "Bokeh",
            "The soft, glowing blur behind a sharp subject.",
            "cloud",
            "#5fa3bf",
            200,
            -2,
            "#1d1a17",
          ],
          [
            "Golden hour",
            "The hour after sunrise and before sunset when light turns warm and low.",
            "sun",
            "#d9482b",
            240,
            3,
            "#ffffff",
          ],
          [
            "Rule of thirds",
            "Imagine a tic-tac-toe grid over the frame and put interesting things on the lines.",
            "flower",
            "#af8ec9",
            230,
            -1,
            "#1d1a17",
          ],
          [
            "Exposure",
            "How much light the photograph received. Too little is dark, too much is a ghost.",
            "ghost",
            "#1f6f6a",
            200,
            2,
            "#ffffff",
          ],
        ] as [string, string, string, string, number, number, string][]
      )
        .map(
          ([t, d, a, bg, w, r, tc]) =>
            `<div style="width:${w}px;background:${bg};color:${tc};--r:${r}deg"><span class="in" style="width:${w * 0.34}px">${ART[a]()}</span><h3 style="color:${tc}">${t}</h3><p style="color:${tc};font-weight:600">${d}</p></div>`
        )
        .join("");
    }

    // 11. Philosophy of photography: statues + slider
    function statue(o: {
      n: string;
      h: "long" | "short" | "back" | "wavy" | "bald";
      g?: number;
      sk?: number;
      mu?: number;
      b?: number;
      w?: string;
    }) {
      const M = "#e8dfc8",
        K = 'stroke="#1d1a17" stroke-width="3"',
        fc = `fill="${M}" ${K}`;
      const long = `<path d="M56 96Q46 28 100 32Q154 28 144 96Q154 150 140 196L126 192Q134 130 124 84L76 84Q66 130 74 192L60 196Q46 150 56 96Z" ${fc}/>`,
        cap = `<path d="M58 100Q52 36 100 40Q148 36 142 100Q130 62 100 64Q70 62 58 100Z" ${fc}/>`,
        back = `<path d="M58 100Q50 34 104 38Q150 40 142 100Q132 58 100 56Q74 58 58 100Z" ${fc}/><path d="M70 54Q100 44 130 56M64 66Q100 52 138 68" fill="none" stroke="#b9ad90" stroke-width="2"/>`,
        wavy = [0, 1, 2, 3, 4]
          .map(
            (i) =>
              `<circle cx="${62 + i * 19}" cy="${60 - Math.sin(i * 0.8) * 16}" r="14" ${fc}/>`
          )
          .join(""),
        bald = `<circle cx="60" cy="96" r="9" ${fc}/><circle cx="140" cy="96" r="9" ${fc}/>`;
      const pre = o.h === "long" ? long : "";
      const post = { long: cap, short: cap, back, wavy, bald }[o.h];
      const gl = o.g
        ? `<g fill="rgba(255,255,255,.25)" stroke="#1d1a17" stroke-width="3"><circle cx="84" cy="108" r="14"/><circle cx="116" cy="108" r="14"/></g><path d="M98 108h4M70 106L56 100M130 106L144 100" stroke="#1d1a17" stroke-width="3" fill="none"/>`
        : "";
      return `<svg viewBox="0 0 200 300" aria-hidden="true">${pre}<path d="M18 252Q18 200 100 190Q182 200 182 252Z" ${fc}/><path d="M60 200Q100 236 140 200M50 252Q60 224 76 214" fill="none" stroke="#b9ad90" stroke-width="3"/><rect x="84" y="160" width="32" height="38" ${fc}/><ellipse cx="58" cy="112" rx="6" ry="12" ${fc}/><ellipse cx="142" cy="112" rx="6" ry="12" ${fc}/><ellipse cx="100" cy="108" rx="42" ry="54" ${fc}/>${post}${o.sk ? '<path d="M92 42Q84 80 76 128" stroke="#a99d80" stroke-width="6" fill="none" stroke-linecap="round"/>' : ""}<path d="M72 98Q84 92 94 98M106 98Q116 92 128 98" fill="none" stroke="#1d1a17" stroke-width="3"/><ellipse cx="84" cy="108" rx="8" ry="4.5" fill="#1d1a17"/><ellipse cx="116" cy="108" rx="8" ry="4.5" fill="#1d1a17"/><path d="M100 110v22l-7 3M88 150Q100 155 112 150" fill="none" stroke="#1d1a17" stroke-width="3"/>${gl}${o.mu ? `<path d="M82 142Q100 134 118 142Q108 150 100 144Q92 150 82 142Z" fill="#cfc4a6" ${K}/>` : ""}${o.b ? `<path d="M64 128Q70 176 100 180Q130 176 136 128Q124 154 100 152Q76 154 64 128Z" fill="#d6cbb0" ${K}/>` : ""}${o.w || ""}<rect x="40" y="252" width="120" height="40" ${fc}/><text x="100" y="277" text-anchor="middle" font-size="12" font-family="Syne,sans-serif" letter-spacing="2" fill="#1d1a17">${o.n}</text><path d="M44 252q10-14 20 0 8-10 14 0zM132 252q8-12 18 0z" fill="#2f6b4f"/></svg>`;
    }

    const BD = 'stroke="#1d1a17" stroke-width="3"';
    const PH = [
      {
        bg: "#e0a526",
        a: "Susan Sontag",
        y: 1977,
        t: "In Plato's Cave",
        d: "To photograph is to take. Collecting pictures can feel like owning the world, and a flood of images can turn reality into something we consume instead of face. The essay opens On Photography, her book of linked essays.",
        try: "Take one photograph, then ask what you took from the scene, and what you left behind.",
        s: {
          n: "SONTAG",
          h: "long" as const,
          sk: 1,
          w: `<ellipse cx="100" cy="66" rx="11" ry="6" fill="#fbf8f0" ${BD}/><circle cx="100" cy="66" r="3.5" fill="#d9482b"/>`,
        },
        x: [
          ["eyeball", "right:3%;top:16px;width:70px;--r:10deg"],
          ["moon", "left:2%;top:14px;width:50px"],
        ],
      },
      {
        bg: "#1f6f6a",
        tc: "lt",
        a: "Roland Barthes",
        y: 1980,
        t: "Camera Lucida",
        d: "Most photographs hold a general, cultural interest he calls the studium. Rarely, one small detail pricks you personally. That is the punctum. A photograph also proves that something really was in front of the lens.",
        try: "Find the detail in a photograph that stings you, then make that detail the main subject of your next frame.",
        s: {
          n: "BARTHES",
          h: "back" as const,
          mu: 1,
          w: `<path d="M132 150L168 122" stroke="#1d1a17" stroke-width="3"/><circle cx="170" cy="120" r="5" fill="#d9482b" ${BD}/><circle cx="130" cy="152" r="3" fill="#d9482b"/>`,
        },
        x: [
          ["flower", "right:3%;bottom:0;width:110px"],
          ["ear", "right:22%;top:20px;width:56px;--r:12deg"],
        ],
      },
      {
        bg: "#a9d8ea",
        a: "Walter Benjamin",
        y: 1931,
        t: "Little History of Photography",
        d: "The camera shows what the eye never registers: slowed movements, enlarged details, an optical unconscious. He also mourns the fading of the aura found in early portraits.",
        try: "Get closer than is comfortable and photograph something everyone walks past.",
        s: {
          n: "BENJAMIN",
          h: "back" as const,
          g: 1,
          mu: 1,
          w: `<circle cx="84" cy="108" r="19" fill="rgba(255,255,255,.35)" ${BD}/><path d="M98 122L122 150" stroke="#6b3a22" stroke-width="7" stroke-linecap="round"/>`,
        },
        x: [
          ["sun", "right:4%;top:14px;width:90px;--r:8deg"],
          ["cloudw", "left:34%;top:18px;width:100px"],
        ],
      },
      {
        bg: "#5a2a3c",
        tc: "lt",
        a: "Vilém Flusser",
        y: 1983,
        t: "Towards a Philosophy of Photography",
        d: "The camera is an apparatus with a program built in. The photographer plays against that program, trying to make an image the machine did not expect. Freedom means outwitting the device.",
        try: "Break one default today: tilt, blur, shoot into the sun, or turn the flash on at noon.",
        s: {
          n: "FLUSSER",
          h: "bald" as const,
          b: 1,
          w: `<rect x="78" y="10" width="44" height="26" rx="3" fill="#d9482b" ${BD}/><circle cx="100" cy="24" r="8" fill="#4f8fc0" ${BD}/><circle cx="100" cy="24" r="3" fill="#1d1a17"/>`,
        },
        x: [
          ["invader2", "right:5%;top:24px;width:60px"],
          ["ufo", "right:20%;bottom:8px;width:110px"],
        ],
      },
      {
        bg: "#8fae8b",
        a: "André Bazin",
        y: 1945,
        t: "The Ontology of the Photographic Image",
        d: "Images answer an old wish to hold things against time, like embalming. Because a machine makes the picture, we believe the subject was actually there, and that gives photography its odd power.",
        try: "Photograph something that will not be there next month.",
        s: {
          n: "BAZIN",
          h: "bald" as const,
          w: `<path d="M62 84L140 66M60 102L142 86M64 122L138 108M70 140L134 130M52 232L148 214M50 248L150 232" stroke="#fbf8f0" stroke-width="7"/><path d="M62 84L140 66M60 102L142 86M64 122L138 108" stroke="#1d1a17" stroke-width="1.2" opacity=".5"/>`,
        },
        x: [
          ["feather", "right:4%;top:12px;width:34px;--r:24deg"],
          ["mushroom", "right:14%;bottom:6px;width:60px"],
        ],
      },
      {
        bg: "#f0b9a4",
        a: "Kendall Walton",
        y: 1984,
        t: "Transparent Pictures",
        d: "He makes a bold claim: we literally see the world through photographs, much as we see through a window or a telescope. Philosophers still argue about it, which makes it a good argument to carry around.",
        try: "Frame a photograph as if you were opening a window for a friend on the other side of the world.",
        s: {
          n: "WALTON",
          h: "short" as const,
          g: 1,
          w: `<rect x="44" y="62" width="112" height="108" fill="rgba(255,255,255,.18)" stroke="#6b3a22" stroke-width="7"/><path d="M100 62v108M44 116h112" stroke="#6b3a22" stroke-width="5"/>`,
        },
        x: [
          ["koi", "right:3%;top:18px;width:140px;--r:-8deg"],
          ["ghost", "left:2%;top:12px;width:46px"],
        ],
      },
      {
        bg: "#c9b8e8",
        a: "John Berger",
        y: 1978,
        t: "Uses of Photography",
        d: "A photograph cut from its surroundings goes mute and ambiguous. Words, neighbouring images and a living context give it meaning, and the same picture can say very different things in different places.",
        try: "Write two opposite captions for one photograph and notice how the picture changes.",
        s: {
          n: "BERGER",
          h: "wavy" as const,
          b: 1,
          w: `<rect x="72" y="198" width="56" height="30" fill="#fbf8f0" transform="rotate(-6 100 213)" ${BD}/><path d="M80 210h40M80 218h28" stroke="#1d1a17" stroke-width="2" transform="rotate(-6 100 213)"/>`,
        },
        x: [
          ["moth", "right:3%;top:16px;width:120px;--r:10deg"],
          ["hand", "right:22%;bottom:-18px;width:80px;--r:-6deg"],
        ],
      },
    ];
    const RD = [
      "120px 20px 20px 20px",
      "20px 20px 20px 120px",
      "20px 120px 20px 20px",
      "60px 20px 60px 20px",
    ];
    const pht = root.querySelector<HTMLElement>("#pht");
    const pd = root.querySelector<HTMLElement>("#pdots");
    const pcn = root.querySelector<HTMLElement>("#pcn");
    if (pht && pd && pcn) {
      pht.innerHTML = PH.map(
        (o, i) =>
          `<article class="pls${o.tc ? " lt" : ""}" style="background:${o.bg};--rd:${RD[i % 4]}" aria-roledescription="slide" aria-label="${i + 1} of ${PH.length}: ${o.a}">${o.x.map(([a, st]) => `<span class="el hm" style="${st}">${ART[a]()}</span>`).join("")}<div class="stt">${statue(o.s)}</div><div class="ar"><p class="no">No. ${i + 1} of ${PH.length}</p><h3 class="d">${o.t}</h3><p class="by">${o.a}, ${o.y}</p><p class="tx">${o.d}</p><p class="try"><b>Try it:</b> ${o.try}</p></div></article>`
      ).join("");
      pd.innerHTML = PH.map(
        (_, i) =>
          `<button aria-label="Go to page ${i + 1}" data-i="${i}"></button>`
      ).join("");
      let pi = 0,
        pt = 0;
      let scrollTimer: number;
      const pgo = (i: number) => {
        i = Math.max(0, Math.min(PH.length - 1, i));
        pt = i;
        const targetChild = pht.children[i] as HTMLElement;
        const firstChild = pht.children[0] as HTMLElement;
        if (targetChild && firstChild) {
          pht.scrollTo({
            left: targetChild.offsetLeft - firstChild.offsetLeft,
            behavior: RM ? "auto" : "smooth",
          });
        }
      };
      const pup = () => {
        const firstChild = pht.children[0] as HTMLElement;
        if (!firstChild) return;
        pi = Math.round(pht.scrollLeft / (firstChild.offsetWidth + 22));
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(() => {
          pt = pi;
        }, 160);
        [...pd.children].forEach((b, j) =>
          b.setAttribute("aria-current", String(j === pi))
        );
        pcn.textContent = `${pi + 1} / ${PH.length}`;
      };
      pht.addEventListener("scroll", pup, { passive: true });
      pd.onclick = (e) => {
        const b = (e.target as HTMLElement).closest("button");
        if (b && b.dataset.i) pgo(+b.dataset.i);
      };
      const pprev = root.querySelector<HTMLButtonElement>("#pprev");
      const pnext = root.querySelector<HTMLButtonElement>("#pnext");
      if (pprev) pprev.onclick = () => pgo(pt - 1);
      if (pnext) pnext.onclick = () => pgo(pt + 1);
      pht.onkeydown = (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          pgo(pt + 1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          pgo(pt - 1);
        }
      };
      pup();
    }

    const ps = root.querySelector("#philosophy");
    if (ps) {
      ps.querySelectorAll(".st").forEach((n) => n.remove());
      for (let i = 0; i < 45; i++) {
        const t = document.createElement("i");
        t.className = "st";
        const z = 2 + Math.random() * 3;
        t.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${z}px;height:${z}px;animation-delay:${Math.random() * 3}s;background:${Math.random() > 0.8 ? "#e0a526" : "#f3ecdc"}`;
        ps.prepend(t);
      }
    }

    // Interactive Shooting Star Launcher for Dark Sky Zone (Weird Dictionary to Philosophy)
    const launchShootingStar = (e?: MouseEvent) => {
      const star = document.createElement("div");
      const clientX = e ? e.clientX : window.innerWidth * (0.5 + Math.random() * 0.35);
      const clientY = e ? e.clientY : window.innerHeight * (0.2 + Math.random() * 0.4);
      star.style.cssText = `
        position: fixed;
        left: ${clientX}px;
        top: ${clientY}px;
        width: 240px;
        height: 3px;
        background: linear-gradient(90deg, #ffffff, #ffe680 30%, #d9482b 60%, transparent);
        border-radius: 99px;
        transform: rotate(-38deg) translateX(80px);
        pointer-events: none;
        z-index: 9999;
        filter: drop-shadow(0 0 10px #ffe680);
        opacity: 1;
        transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 0.55s ease;
      `;
      document.body.appendChild(star);
      requestAnimationFrame(() => {
        star.style.transform = `rotate(-38deg) translateX(-500px) scaleX(1.4)`;
        star.style.opacity = "0";
      });
      setTimeout(() => star.remove(), 600);
    };

    const shootBtn = root.querySelector<HTMLButtonElement>("#shootStarBtn");
    if (shootBtn) {
      shootBtn.onclick = (e) => {
        e.stopPropagation();
        launchShootingStar();
      };
    }

    const dictEl = root.querySelector<HTMLElement>("#dictionary");
    if (dictEl) {
      dictEl.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("button") && !target.closest("a") && !target.closest(".rt > div")) {
          launchShootingStar(e);
        }
      });
    }

    const philoEl = root.querySelector<HTMLElement>("#philosophy");
    if (philoEl) {
      philoEl.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("button") && !target.closest("a") && !target.closest(".pls")) {
          launchShootingStar(e);
        }
      });
    }

    // 12. Camera Anatomy
    const PARTS: [string, string, number, number, number][] = [
      [
        "Lens",
        "The eye of the camera. It gathers light and focuses it. Focal length decides how much of the world fits in, and the aperture inside controls how much light gets through.",
        47.7,
        56.7,
        1,
      ],
      [
        "Shutter button",
        "Starts the exposure. On most cameras a half press focuses and a full press takes the picture.",
        15.9,
        11,
        0,
      ],
      [
        "Flash",
        "A short burst of extra light for dark places. It can freeze motion, and it makes ordinary things look strangely dramatic.",
        79.5,
        30,
        0,
      ],
      [
        "Viewfinder",
        "The window you frame through. In a DSLR you see the real view through the lens, and in a mirrorless camera it is a tiny screen.",
        13.6,
        31,
        0,
      ],
      [
        "Prism and mirror",
        "In a DSLR a mirror bounces light up into a prism so you can see the scene the right way up. The mirror flips out of the way when you shoot.",
        47.7,
        9,
        0,
      ],
      [
        "Sensor",
        "A grid of light-sensitive cells that turns light into an image. On a film camera, film does this job.",
        81,
        69,
        0,
      ],
      [
        "Grip",
        "Where your hand lives. A steady grip is half of a sharp photograph.",
        93,
        60,
        0,
      ],
    ];
    const stg = root.querySelector<HTMLElement>("#stg");
    const ai = root.querySelector<HTMLElement>("#ai");
    if (stg && ai) {
      const W = Math.min(580, window.innerWidth * 0.9),
        st = W * 0.03,
        L = 10,
        mp = { ...CAMC, d: "#d9482b" },
        bs = px(camRows(), mp),
        ls = px(camRows(1), mp);
      let h = "";
      for (let i = 0; i < L; i++) {
        h += `<div class="sl" style="pointer-events:none;transform:translateZ(${(i - L / 2) * st}px);filter:brightness(${0.5 + (i / L) * 0.5})">${bs}</div>`;
      }
      for (let j = 0; j < 5; j++) {
        h += `<div class="sl" style="pointer-events:none;transform:translateZ(${(L / 2 + j) * st}px)">${ls}</div>`;
      }
      h += PARTS.map(
        (p, i) =>
          `<button type="button" class="hs" style="left:${p[2]}%;top:${p[3]}%;z-index:30;pointer-events:auto;transform:translateZ(${(L / 2 + 5) * st + 14}px)" aria-pressed="false" aria-label="${p[0]}" data-i="${i}">${i + 1}</button>`
      ).join("");
      stg.innerHTML = `<div class="cmw" id="cmw">${h}</div>`;
      const pickPart = (i: number) => {
        const p = PARTS[i];
        if (!p) return;
        ai.innerHTML = `<small>Part ${i + 1} of ${PARTS.length}</small><h3 class="d">${p[0]}</h3><p>${p[1]}</p>`;
        stg
          .querySelectorAll(".hs")
          .forEach((b, j) => b.setAttribute("aria-pressed", String(j === i)));
      };
      ai.innerHTML =
        '<small>Camera anatomy</small><h3 class="d">Tap a dot (1–7)</h3><p>Seven parts, one tiny machine for stopping time.</p>';
      stg.querySelectorAll<HTMLButtonElement>(".hs").forEach((btn) => {
        btn.addEventListener("pointerdown", (e) => {
          e.stopPropagation();
        });
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (btn.dataset.i !== undefined) pickPart(+btn.dataset.i);
        });
      });
      if (!RM) {
        const c = stg.querySelector<HTMLElement>("#cmw");
        if (c) {
          stg.onpointermove = (e) => {
            const r = stg.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            c.style.transform = `rotateX(${-y * 22}deg) rotateY(${x * 38}deg)`;
          };
          stg.onpointerleave = () => {
            c.style.transform = "";
          };
        }
      }
    }

    // 13. Shutter Soundboard (Web Audio)
    let AC: AudioContext | null = null;
    const ac = () => {
      if (!AC) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        AC = new Ctx();
      }
      return AC;
    };
    function nz(
      t: number,
      d: number,
      f: number,
      q: number,
      g: number,
      ty?: BiquadFilterType
    ) {
      const a = ac(),
        n = Math.floor(a.sampleRate * d),
        b = a.createBuffer(1, n, a.sampleRate),
        c = b.getChannelData(0);
      for (let i = 0; i < n; i++)
        c[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
      const s = a.createBufferSource();
      s.buffer = b;
      const fl = a.createBiquadFilter();
      fl.type = ty || "bandpass";
      fl.frequency.value = f;
      fl.Q.value = q;
      const gn = a.createGain();
      gn.gain.value = g;
      s.connect(fl);
      fl.connect(gn);
      gn.connect(a.destination);
      s.start(t);
    }
    function tn(
      t: number,
      f1: number,
      f2: number,
      d: number,
      g: number,
      ty?: OscillatorType
    ) {
      const a = ac(),
        o = a.createOscillator(),
        gn = a.createGain();
      o.type = ty || "sine";
      o.frequency.setValueAtTime(f1, t);
      o.frequency.exponentialRampToValueAtTime(f2, t + d);
      gn.gain.setValueAtTime(g, t);
      gn.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(gn);
      gn.connect(a.destination);
      o.start(t);
      o.stop(t + d + 0.02);
    }
    const shut = (t: number) => {
      nz(t, 0.03, 2500, 1.5, 0.9);
      tn(t, 200, 60, 0.05, 0.6);
      nz(t + 0.07, 0.04, 1800, 1.2, 0.7);
      tn(t + 0.07, 150, 50, 0.06, 0.5);
    };
    const SND: ((t: number) => void)[] = [
      (t) => shut(t),
      (t) => {
        for (let i = 0; i < 9; i++)
          nz(t + i * 0.035, 0.02, 3000 + i * 200, 3, 0.5);
      },
      (t) => {
        const a = ac(),
          o = a.createOscillator(),
          g = a.createGain();
        o.type = "triangle";
        o.frequency.setValueAtTime(400, t);
        o.frequency.exponentialRampToValueAtTime(5000, t + 1.4);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.18, t + 1.35);
        g.gain.linearRampToValueAtTime(0, t + 1.45);
        o.connect(g);
        g.connect(a.destination);
        o.start(t);
        o.stop(t + 1.5);
      },
      (t) => {
        nz(t, 0.25, 6000, 0.7, 0.9, "highpass");
        tn(t, 1200, 200, 0.2, 0.25);
      },
      (t) => {
        tn(t, 140, 35, 0.14, 0.9);
        nz(t, 0.05, 900, 1, 0.6);
      },
      (t) => {
        tn(t, 2400, 2400, 0.07, 0.22, "square");
        tn(t + 0.12, 2400, 2400, 0.07, 0.22, "square");
      },
      (t) => {
        tn(t, 90, 260, 1.6, 0.12, "sawtooth");
        for (let i = 0; i < 40; i++) nz(t + i * 0.04, 0.015, 2000, 2, 0.25);
      },
      (t) => {
        [0, 0.5, 1, 1.4, 1.7, 1.9, 2.05, 2.15].forEach((d) =>
          tn(t + d, 1800, 1800, 0.06, 0.2, "square")
        );
        shut(t + 2.35);
      },
    ];
    const PADS: [string, string, string, string, number, number][] = [
      ["Shutter click", "The classic", "camera", "#e0a526", 230, -2],
      ["Film advance", "Wind it on", "invader", "#8fae8b", 180, 2],
      ["Flash charge", "Whine up", "sun", "#d9482b", 210, -3],
      ["Flash pop", "Bang", "rocket", "#c9b8e8", 170, 3],
      ["Mirror slap", "Thump", "eye", "#a9d8ea", 200, -1],
      ["Autofocus", "Beep beep", "ufo", "#f0b9a4", 220, 2],
      ["Film rewind", "Whirr", "mushroom", "#9fd8c4", 180, -2],
      ["Self-timer", "Hurry up", "ghost", "#fbf8f0", 200, 3],
    ];
    const padsEl = root.querySelector<HTMLElement>("#pads");
    const sfl = root.querySelector<HTMLElement>("#sfl");
    function play(i: number) {
      if (!padsEl) return;
      const a = ac();
      if (a.state === "suspended") a.resume();
      SND[i](a.currentTime + 0.01);
      const b = padsEl.children[i] as HTMLElement;
      if (b) {
        b.classList.add("hit");
        setTimeout(() => b.classList.remove("hit"), 110);
      }
      if (!RM && i < 5 && sfl) {
        sfl.classList.remove("f");
        void sfl.offsetWidth;
        sfl.classList.add("f");
      }
    }
    if (padsEl) {
      padsEl.innerHTML = PADS.map(
        ([n, d, a, bg, w, r], i) =>
          `<button class="pad" style="background:${bg};width:${w}px;--r:${r}deg" data-i="${i}"><kbd>${i + 1}</kbd><span class="in" style="width:${w * 0.34}px">${ART[a]()}</span><b>${n}</b><small>${d}</small></button>`
      ).join("");
      padsEl.onclick = (e) => {
        const b = (e.target as HTMLElement).closest<HTMLElement>(".pad");
        if (b && b.dataset.i) play(+b.dataset.i);
      };
    }
    let sbIn = false;
    const soundsSec = root.querySelector("#sounds");
    let io: IntersectionObserver | null = null;
    if (soundsSec) {
      io = new IntersectionObserver((en) => {
        sbIn = en[0].isIntersecting;
      });
      io.observe(soundsSec);
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        !sbIn ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        /INPUT|TEXTAREA|SELECT/.test(
          (document.activeElement as HTMLElement)?.tagName || ""
        )
      )
        return;
      const n = +e.key;
      if (n >= 1 && n <= 8) play(n - 1);
    };
    window.addEventListener("keydown", onKeyDown);

    // 14. FAQ
    const fq = root.querySelector("#fq");
    if (fq) {
      fq.innerHTML = [
        [
          "Do I need a fancy camera?",
          "No. A phone is a camera. Curiosity is the lens.",
        ],
        [
          "Do I need experience?",
          "No. Bring questions and a willingness to look twice.",
        ],
        [
          "How do I join?",
          "Follow @shutterscapegcu on Instagram and send a signal through the contact form.",
        ],
        [
          "Can I share my photographs?",
          "Message the club leads on Instagram. Details will be posted when submissions open.",
        ],
        [
          "When do you meet?",
          "Nothing is scheduled on this page yet. Watch Events & Notices and Instagram.",
        ],
        ["Where are you based?", "Girijananda Chowdhury University."],
      ]
        .map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`)
        .join("");
    }

    // 15. People (Students & Leads from database, initialized with the exact HTML placeholders)
    const card = (m: MemberItem) => {
      const inner = m.src
        ? `<img src="${m.src}" alt="${m.name}" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block;border-radius:4px">`
        : `<span class="in" style="width:${m.w * 0.5}px;margin:auto">${(ART[m.art] || ART.eye)()}</span>`;
      return `<div class="cd${m.small ? " s" : ""}" style="width:${m.w}px;--r:${m.r}deg"><div class="im" style="background:${m.bg}">${inner}</div><b>${m.name}</b><span>${m.role}</span></div>`;
    };
    const leadsEl = root.querySelector("#leads");
    const studsEl = root.querySelector("#studs");
    if (leadsEl) {
      leadsEl.innerHTML = members
        .filter((m) => m.group === "leads")
        .map(card)
        .join("");
    }
    if (studsEl) {
      studsEl.innerHTML = members
        .filter((m) => m.group === "studs")
        .map(card)
        .join("");
    }

    // 16. Events & Notices Retro TV (powered by activities from database)
    const channelTitles = [
      "CH 1. Events",
      "CH 2. Notices",
      "CH 3. Frame of the week",
    ];
    const scr = root.querySelector<HTMLElement>("#scr");
    function tune(i: number) {
      if (!scr) return;
      scr.classList.remove("n");
      void scr.offsetWidth;
      scr.classList.add("n");
      const chItems = activities.filter((a) => Number(a.channel) === i);
      scr.innerHTML = `<h3>${channelTitles[i] || `CH ${i + 1}`}</h3><ul>${chItems
        .map(
          (a) =>
            `<li><b>${a.title}${a.upcoming ? ' <u style="color:#d9482b;font-size:11px;text-decoration:none;border:1px solid #d9482b;padding:1px 5px;border-radius:99px;margin-left:6px">UPCOMING</u>' : ""}</b><span>${a.description || a.date}</span>${a.image ? `<img src="${a.image}" alt="${a.title}" style="margin-top:8px;max-height:110px;border-radius:6px;border:2px solid #6b5a38;display:block">` : ""}</li>`
        )
        .join("")}</ul>`;
      root
        ?.querySelectorAll<HTMLButtonElement>(".ctl button")
        .forEach((b) =>
          b.setAttribute("aria-pressed", String(Number(b.dataset.c) === i))
        );
    }
    root
      .querySelectorAll<HTMLButtonElement>(".ctl button")
      .forEach((b) => (b.onclick = () => tune(+(b.dataset.c || 0))));
    tune(0);

    // 17. Contact section stars & form connected to /api/contact
    const cs = root.querySelector("#contact");
    if (cs) {
      cs.querySelectorAll(".st").forEach((n) => n.remove());
      for (let i = 0; i < 60; i++) {
        const s = document.createElement("i");
        s.className = "st";
        const z = 2 + Math.random() * 3;
        s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${z}px;height:${z}px;animation-delay:${Math.random() * 3}s;background:${Math.random() > 0.8 ? "#e0a526" : "#f3ecdc"}`;
        cs.prepend(s);
      }
    }

    const ENDPOINT = "/api/contact";
    const IG = "https://www.instagram.com/shutterscapegcu/";
    const formEl = root.querySelector<HTMLFormElement>("#f");
    if (formEl) {
      formEl.onsubmit = async (e) => {
        e.preventDefault();
        const f = e.currentTarget as HTMLFormElement;
        const d = Object.fromEntries(new FormData(f)) as Record<string, string>;
        const x: Record<string, string> = {};
        if (!d.name?.trim()) x.name = "Enter your name.";
        if (!/^\S+@\S+\.\S+$/.test(d.email || ""))
          x.email = "Enter a valid email address.";
        if ((d.message || "").trim().length < 10)
          x.message = "Write at least a sentence.";
        f.querySelectorAll<HTMLElement>("[data-e]").forEach((s) => {
          const key = s.dataset.e || "";
          s.textContent = x[key] || "";
        });
        const st = root.querySelector("#st");
        if (Object.keys(x).length) return;
        try {
          const r = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d),
          });
          if (!r.ok) throw new Error("Failed");
          if (st) st.textContent = "Signal received.";
          f.reset();
        } catch {
          if (st)
            st.innerHTML = `Not sent. Try again or <a href="${IG}">message us on Instagram</a>.`;
        }
      };
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("keydown", onKeyDown);
      tvTimers.forEach((id) => window.clearTimeout(id));
      io?.disconnect();
    };
  }, [members, activities]);

  return (
    <div ref={rootRef}>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <filter id="mb" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".035 .09"
            numOctaves={4}
            seed={3}
            result="n"
          />
          <feDiffuseLighting
            in="n"
            lightingColor="#fff"
            surfaceScale={2.4}
            result="l"
          >
            <feDistantLight azimuth={45} elevation={62} />
          </feDiffuseLighting>
          <feComposite
            in="l"
            in2="SourceGraphic"
            operator="arithmetic"
            k1={1.15}
            k2={0}
            k3={0}
            k4={0}
            result="m"
          />
          <feComposite in="m" in2="SourceAlpha" operator="in" />
        </filter>
      </svg>

      <nav className="nv" aria-label="Primary">
        <a className="w" href="#top">
          <span data-a="eye" className="in"></span>shutterscape
        </a>
        <a className="l" href="#gallery">
          Gallery
        </a>
        <a className="l" href="#stories">
          Stories
        </a>
        <a className="l" href="#people">
          Students &amp; Leads
        </a>
        <a className="l" href="#events">
          Events &amp; Notices
        </a>
        <a className="l" href="#faq">
          FAQ
        </a>
        <a href="#contact">Contact Us</a>
        <a className="l" href="/admin">
          Admin
        </a>
      </nav>

      <header id="top" className="hero">
        <span
          className="el drift"
          data-a="cloud"
          style={{
            top: "14%",
            width: "150px",
            animationDuration: "70s",
            animationDelay: "-20s",
          }}
        ></span>
        <span
          className="el drift"
          data-a="cloud"
          style={{
            top: "30%",
            width: "70px",
            animationDuration: "45s",
            animationDelay: "-5s",
          }}
        ></span>
        <span
          className="el drift hm"
          data-a="cloud"
          style={{
            top: "6%",
            width: "230px",
            animationDuration: "110s",
            animationDelay: "-60s",
          }}
        ></span>
        <span
          className="el"
          data-a="eye"
          style={
            {
              right: "-4vw",
              top: "9%",
              width: "min(52vw,640px)",
              "--r": "-7deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="eye"
          style={
            {
              left: "38%",
              top: "20%",
              width: "90px",
              "--r": "12deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="eagle"
          style={
            {
              left: "5%",
              top: "19%",
              width: "120px",
              "--r": "-6deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el sn"
          data-a="snake"
          style={{ left: "-4%", bottom: "22%", width: "112%", zIndex: 2 }}
        ></span>
        <span
          className="el hm"
          data-a="flower"
          style={
            {
              right: "4%",
              bottom: 0,
              width: "120px",
              "--r": "4deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="ufo"
          style={
            {
              left: "52%",
              top: "9%",
              width: "150px",
              "--r": "8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="moon"
          style={
            {
              left: "22%",
              top: "34%",
              width: "84px",
              "--r": "-12deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="mushroom"
          style={{ right: "22%", bottom: "6px", width: "64px" }}
        ></span>
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              left: "30%",
              bottom: "36%",
              width: "104px",
              "--r": "-10deg",
            } as React.CSSProperties
          }
        ></span>
        <h1>
          <span>s</span>
          <span>h</span>
          <span>u</span>
          <span>t</span>
          <span>t</span>
          <span>e</span>
          <span>r</span>
          <span className="b">
            <span>s</span>
            <span>c</span>
            <span>a</span>
            <span>p</span>
            <span>e</span>
          </span>
        </h1>
        <p className="t">
          The photography club of Girijananda Chowdhury University. We
          photograph the strange, the soft and the ordinary until they look
          back.
        </p>
        <div className="btns">
          <a className="bt" href="#gallery">
            Enter the gallery ↓
          </a>
          <a
            className="bt o"
            href="https://www.instagram.com/shutterscapegcu/"
            target="_blank"
            rel="noreferrer"
          >
            @shutterscapegcu ↗
          </a>
        </div>
      </header>

      <section id="tvs" className="sky">
        <span
          className="el drift"
          data-a="cloudw"
          style={{
            top: "8%",
            width: "200px",
            animationDuration: "90s",
            animationDelay: "-35s",
          }}
        ></span>
        <span
          className="el drift"
          data-a="cloudw"
          style={{
            top: "34%",
            width: "110px",
            animationDuration: "60s",
            animationDelay: "-10s",
          }}
        ></span>
        <span
          className="el drift hm"
          data-a="cloudw"
          style={{
            top: "62%",
            width: "280px",
            animationDuration: "130s",
            animationDelay: "-80s",
          }}
        ></span>
        <div
          className="hd"
          style={{ justifyContent: "center", textAlign: "center" }}
        >
          <h2>Glimpses of Us</h2>
          <small>
            Tap a TV for another glimpse. Photos and videos from around the
            university, straight from the Gallery.
          </small>
        </div>
        <div className="tvs" id="tvbox"></div>
        <p className="skyc" id="skyc" aria-live="polite"></p>
      </section>

      <div className="mq" aria-hidden="true">
        <div id="mqi"></div>
      </div>

      <section id="about" className="m">
        <span
          className="el"
          data-a="moon"
          style={
            {
              right: "5%",
              top: "50px",
              width: "min(26vw,250px)",
              "--r": "10deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el"
          data-a="hand"
          style={
            {
              right: "22%",
              bottom: "-20px",
              width: "min(18vw,170px)",
              "--r": "-8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="mushroom"
          style={
            {
              left: "50%",
              bottom: "10px",
              width: "90px",
              "--r": "-4deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="mushroom"
          style={{ left: "56%", bottom: "6px", width: "44px" }}
        ></span>
        <span
          className="el hm"
          data-a="cloud"
          style={{ left: "6%", top: "36px", width: "100px" }}
        ></span>
        <span
          className="el rl"
          data-a="ear"
          style={
            {
              left: "2%",
              bottom: "16px",
              width: "88px",
              "--r": "-12deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              left: "40%",
              top: "26px",
              width: "84px",
              "--r": "8deg",
            } as React.CSSProperties
          }
        ></span>
        <h2>Some frames are loud. Some are shy. Some stare back.</h2>
        <p>
          Shutterscape is where curious eyes at GCU meet. We trade cameras,
          argue about light, and keep the photographs that feel like dreams you
          almost remember.
        </p>
      </section>

      <section id="gallery" className="g">
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              right: "30%",
              top: "16px",
              width: "72px",
              "--r": "12deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el rl hm"
          data-a="feather"
          style={
            {
              left: "42%",
              top: "10px",
              width: "36px",
              "--r": "28deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="camera"
          style={
            {
              right: "6%",
              top: "40px",
              width: "84px",
              "--r": "8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el"
          data-a="flower"
          style={
            {
              left: "-10px",
              bottom: "-6px",
              width: "190px",
              "--r": "-3deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="cloud"
          style={{ right: "22%", bottom: "30px", width: "110px" }}
        ></span>

        <div className="hd">
          <h2>Gallery</h2>
          <small>
            Every frame is a different species. Click nothing, look at
            everything.
          </small>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <a
              className="bt"
              href="/gallery"
              style={{ fontSize: "14px", padding: "10px 18px" }}
            >
              View Gallery →
            </a>
          </div>
        </div>

        <div className="gg" id="gg">
          {[...photos]
            .sort((a, b) => {
              const aHas = Boolean(a.src || a.video);
              const bHas = Boolean(b.src || b.video);
              if (aHas && !bHas) return -1;
              if (!aHas && bHas) return 1;
              return 0;
            })
            .slice(0, 18)
            .map((p) => (
              <figure
                key={p.id}
                className={p.z}
                style={
                  { "--r": `${p.r}deg` } as React.CSSProperties
                }
                tabIndex={0}
              >
                {p.video ? (
                  <video
                    src={p.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : p.src ? (
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{ width: "100%", height: "100%" }}
                    dangerouslySetInnerHTML={{ __html: scene(p.seed) }}
                  />
                )}
                <figcaption>
                  {p.title}
                  <br />
                  {p.cat}, {p.who}
                  {p.caption ? (
                    <>
                      <br />
                      <span style={{ opacity: 0.85 }}>{p.caption}</span>
                    </>
                  ) : null}
                </figcaption>
              </figure>
            ))}
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          <p className="note" style={{ margin: 0 }}>
            Sample frames on the main page. Click <b>View Gallery →</b> to see
            all uploaded photographs on the dedicated Gallery page.
          </p>
          <a className="bt" href="/gallery">
            View Gallery →
          </a>
        </div>
      </section>

      <section id="stories" className="g" style={{ background: "var(--bone)" }}>
        <span
          className="el"
          data-a="ufo"
          style={
            {
              right: "6%",
              top: "40px",
              width: "min(24vw,230px)",
              "--r": "-6deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="ghost"
          style={
            {
              left: "44%",
              top: "60px",
              width: "70px",
              "--r": "6deg",
            } as React.CSSProperties
          }
        ></span>
        <div className="hd">
          <h2>Frames That Stay</h2>
          <small>
            Sample stories. Replace the captions and credits with real ones.
          </small>
        </div>
        <div id="sy"></div>
      </section>

      <section id="rituals" style={{ background: "var(--wh)" }}>
        <span
          className="el"
          data-a="moth"
          style={
            {
              right: "3%",
              top: "30px",
              width: "min(26vw,260px)",
              "--r": "12deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="rocket"
          style={
            {
              left: "3%",
              bottom: "40px",
              width: "50px",
              "--r": "20deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="eye"
          style={
            {
              right: "34%",
              bottom: "30px",
              width: "110px",
              "--r": "-6deg",
            } as React.CSSProperties
          }
        ></span>
        <div className="hd">
          <h2>What We Do</h2>
          <small>Club rituals. Sample descriptions, edit freely.</small>
        </div>
        <div className="rt" id="rt"></div>
      </section>

      <section
        id="prompt"
        style={{ background: "var(--tom)", color: "var(--wh)" }}
      >
        <span
          className="el"
          data-a="sun"
          style={
            {
              right: "3%",
              top: "40px",
              width: "min(30vw,300px)",
              "--r": "8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="cactus"
          style={{ left: "3%", bottom: 0, width: "84px" }}
        ></span>
        <span
          className="el hm"
          data-a="koi"
          style={
            {
              left: "42%",
              bottom: "24px",
              width: "210px",
              "--r": "-8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el rl hm"
          data-a="ear"
          style={
            {
              right: "34%",
              bottom: "150px",
              width: "84px",
              "--r": "10deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              right: "26%",
              bottom: "30px",
              width: "90px",
              "--r": "6deg",
            } as React.CSSProperties
          }
        ></span>
        <div className="hd">
          <h2>Pick a Random Image</h2>
          <small style={{ color: "var(--wh)" }}>
            Feeling lucky? Pull one frame out of the gallery.
          </small>
        </div>
        <button className="bt o" id="spin">
          Pick a random image ↻
        </button>
        <figure className="pf" id="pf">
          <div className="im" id="pfi"></div>
          <figcaption id="pfc" aria-live="polite"></figcaption>
        </figure>
      </section>

      <section id="people" className="p">
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              left: "34%",
              top: "20px",
              width: "92px",
              "--r": "-8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el"
          data-a="bust"
          style={
            {
              right: "2%",
              top: "70px",
              width: "min(24vw,230px)",
              "--r": "3deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="eye"
          style={
            {
              right: "30%",
              top: "36px",
              width: "70px",
              "--r": "-10deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="invader"
          style={{ left: "46%", bottom: "18px", width: "60px" }}
        ></span>
        <div className="hd">
          <h2>Students &amp; Leads</h2>
          <small>
            Placeholder faces. Swap in real names, roles and portraits.
          </small>
        </div>
        <h3 className="sub">The leads</h3>
        <div className="row" id="leads"></div>
        <h3 className="sub">The students</h3>
        <div className="row" id="studs"></div>
      </section>

      <section id="events" className="e">
        <span
          className="el"
          data-a="dragon"
          style={{ left: "-2%", top: "30px", width: "min(52vw,520px)" }}
        ></span>
        <span
          className="el hm"
          data-a="invader"
          style={
            {
              right: "10%",
              top: "60px",
              width: "54px",
              "--r": "10deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="cloud"
          style={{ right: "2%", top: "150px", width: "130px" }}
        ></span>
        <span
          className="el"
          data-a="flower"
          style={
            {
              right: "2%",
              bottom: "-8px",
              width: "150px",
              "--r": "5deg",
            } as React.CSSProperties
          }
        ></span>
        <div
          className="hd"
          style={{ justifyContent: "flex-end", textAlign: "right" }}
        >
          <small>Switch channels. All listings are sample content.</small>
          <h2>Events &amp; Notices</h2>
        </div>
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              left: "2%",
              bottom: "24px",
              width: "130px",
              "--r": "-6deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el rl hm"
          data-a="feather"
          style={
            {
              left: "46%",
              top: "14px",
              width: "40px",
              "--r": "-24deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el rl hm"
          data-a="ear"
          style={
            {
              right: "20%",
              bottom: "20px",
              width: "80px",
              "--r": "14deg",
            } as React.CSSProperties
          }
        ></span>
        <div className="tv">
          <div className="scr" id="scr" aria-live="polite"></div>
          <div className="ctl">
            <button aria-pressed="true" data-c="0">
              CH 1
            </button>
            <button aria-pressed="false" data-c="1">
              CH 2
            </button>
            <button aria-pressed="false" data-c="2">
              CH 3
            </button>
            <i aria-hidden="true"></i>
          </div>
        </div>
      </section>

      <section id="dictionary" className="dark-sky-zone">
        {/* Fun Shooting Stars & Night Sky Starfield Layer */}
        <div className="night-sky-layer" aria-hidden="true">
          <div className="shooting-star" style={{ "--top": "10%", "--left": "82%", "--angle": "-35deg", "--dur": "3.8s", "--delay": "0.3s", "--len": "210px" } as React.CSSProperties} />
          <div className="shooting-star" style={{ "--top": "28%", "--left": "68%", "--angle": "-42deg", "--dur": "4.4s", "--delay": "2.1s", "--len": "170px" } as React.CSSProperties} />
          <div className="shooting-star" style={{ "--top": "54%", "--left": "90%", "--angle": "-38deg", "--dur": "3.9s", "--delay": "3.5s", "--len": "190px" } as React.CSSProperties} />
          <div className="shooting-star" style={{ "--top": "76%", "--left": "74%", "--angle": "-36deg", "--dur": "4.6s", "--delay": "1.2s", "--len": "180px" } as React.CSSProperties} />
          <div className="shooting-star" style={{ "--top": "88%", "--left": "86%", "--angle": "-40deg", "--dur": "4.1s", "--delay": "4.8s", "--len": "160px" } as React.CSSProperties} />

          <span className="cross-star" style={{ top: "10%", left: "12%", "--sz": "16px", "--dur": "3.6s", "--delay": "0.2s" } as React.CSSProperties}>✦</span>
          <span className="cross-star" style={{ top: "28%", right: "10%", "--sz": "14px", "--dur": "4.2s", "--delay": "1.4s" } as React.CSSProperties}>✦</span>
          <span className="cross-star" style={{ top: "58%", left: "26%", "--sz": "18px", "--dur": "3.7s", "--delay": "2.2s" } as React.CSSProperties}>✦</span>
          <span className="cross-star" style={{ top: "82%", right: "28%", "--sz": "13px", "--dur": "4.5s", "--delay": "0.8s" } as React.CSSProperties}>✦</span>
          <span className="cross-star" style={{ top: "18%", left: "58%", "--sz": "15px", "--dur": "3.3s", "--delay": "2.7s" } as React.CSSProperties}>✦</span>

          {[
            [8, 22, 2, 2.5, 0.4],
            [15, 45, 3, 3.2, 1.2],
            [24, 78, 2, 2.8, 0.8],
            [35, 16, 3, 3.6, 2.1],
            [44, 62, 2, 2.4, 0.3],
            [54, 36, 3, 4.0, 1.7],
            [66, 84, 2, 3.1, 2.4],
            [74, 14, 3, 2.7, 0.6],
            [84, 52, 2, 3.5, 1.9],
            [92, 76, 3, 3.0, 1.1],
          ].map(([top, left, sz, dur, delay], idx) => (
            <span
              key={idx}
              className="twinkle-star"
              style={
                {
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${sz}px`,
                  height: `${sz}px`,
                  "--dur": `${dur}s`,
                  "--delay": `${delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <span
          className="el"
          data-a="moon"
          style={
            {
              left: "2%",
              top: "28px",
              width: "110px",
              "--r": "-4deg",
              filter: "drop-shadow(0 0 18px rgba(246,231,192,0.45))",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="hand"
          style={
            {
              right: "2%",
              top: "30px",
              width: "110px",
              "--r": "12deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="cactus"
          style={{ right: "20%", top: "46px", width: "56px" }}
        ></span>
        <div className="hd">
          <h2>Weird Dictionary</h2>
          <small>
            Real photography terms, explained like a field guide.
          </small>
          <button
            type="button"
            className="star-wish-pill"
            id="shootStarBtn"
            title="Click to launch a shooting star"
          >
            ✦ Tap sky to shoot a star ✦
          </button>
        </div>
        <div className="rt" id="dc"></div>
      </section>

      <section id="philosophy" className="ph dark-sky-zone">
        {/* Fun Shooting Stars & Night Sky Starfield Layer */}
        <div className="night-sky-layer" aria-hidden="true">
          <div className="shooting-star" style={{ "--top": "8%", "--left": "80%", "--angle": "-38deg", "--dur": "4.1s", "--delay": "0.8s", "--len": "220px" } as React.CSSProperties} />
          <div className="shooting-star" style={{ "--top": "24%", "--left": "72%", "--angle": "-34deg", "--dur": "3.7s", "--delay": "2.6s", "--len": "180px" } as React.CSSProperties} />
          <div className="shooting-star" style={{ "--top": "46%", "--left": "88%", "--angle": "-42deg", "--dur": "4.5s", "--delay": "1.5s", "--len": "200px" } as React.CSSProperties} />
          <div className="shooting-star" style={{ "--top": "68%", "--left": "68%", "--angle": "-36deg", "--dur": "3.8s", "--delay": "3.8s", "--len": "160px" } as React.CSSProperties} />
          <div className="shooting-star" style={{ "--top": "85%", "--left": "84%", "--angle": "-39deg", "--dur": "4.3s", "--delay": "0.2s", "--len": "190px" } as React.CSSProperties} />

          <span className="cross-star" style={{ top: "14%", right: "15%", "--sz": "16px", "--dur": "3.9s", "--delay": "0.6s" } as React.CSSProperties}>✦</span>
          <span className="cross-star" style={{ top: "38%", left: "18%", "--sz": "14px", "--dur": "4.3s", "--delay": "1.8s" } as React.CSSProperties}>✦</span>
          <span className="cross-star" style={{ top: "64%", right: "22%", "--sz": "18px", "--dur": "3.5s", "--delay": "2.5s" } as React.CSSProperties}>✦</span>
          <span className="cross-star" style={{ top: "82%", left: "28%", "--sz": "12px", "--dur": "4.8s", "--delay": "1.1s" } as React.CSSProperties}>✦</span>

          {[
            [10, 30, 2, 2.9, 0.7],
            [18, 65, 3, 3.4, 1.5],
            [26, 12, 2, 2.6, 0.3],
            [38, 88, 3, 3.8, 2.2],
            [46, 42, 2, 2.5, 0.9],
            [56, 72, 3, 4.2, 1.8],
            [68, 16, 2, 3.2, 2.6],
            [76, 58, 3, 2.8, 0.4],
            [88, 34, 2, 3.6, 1.3],
            [94, 82, 3, 3.1, 2.0],
          ].map(([top, left, sz, dur, delay], idx) => (
            <span
              key={idx}
              className="twinkle-star"
              style={
                {
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${sz}px`,
                  height: `${sz}px`,
                  "--dur": `${dur}s`,
                  "--delay": `${delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <span
          className="el hm"
          data-a="eyeball"
          style={
            {
              left: "3%",
              top: "50px",
              width: "90px",
              "--r": "-10deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm rl"
          data-a="ear"
          style={
            {
              right: "3%",
              bottom: "80px",
              width: "80px",
              "--r": "12deg",
            } as React.CSSProperties
          }
        ></span>
        <div className="hd">
          <h2>Philosophy of Photography</h2>
          <small>
            Seven thinkers, seven ways of looking. Swipe, tap the arrows or
            press the arrow keys.
          </small>
        </div>
        <div className="phw">
          <div
            className="pht"
            id="pht"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Philosophers on photography"
          ></div>
          <div className="pc">
            <button id="pprev" aria-label="Previous page">
              ‹
            </button>
            <div id="pdots"></div>
            <span id="pcn" aria-live="polite"></span>
            <button id="pnext" aria-label="Next page">
              ›
            </button>
          </div>
        </div>
        <p className="note" style={{ color: "#cfc6e6" }}>
          Summaries are paraphrases, not quotations. Statues are stylised
          illustrations, not likenesses. Read the originals.
        </p>
      </section>

      <section id="anatomy" className="an">
        <span
          className="el hm rl"
          data-a="eyeball"
          style={
            {
              left: "3%",
              top: "40px",
              width: "80px",
              "--r": "-10deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="invader2"
          style={
            {
              right: "5%",
              top: "50px",
              width: "56px",
              "--r": "8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="cloudw"
          style={{ left: "40%", bottom: "20px", width: "120px" }}
        ></span>
        <div className="hd">
          <h2>Camera Anatomy</h2>
          <small>
            Tap the glowing dots. Move your cursor, or drag a finger, to turn
            the camera.
          </small>
        </div>
        <div className="ag">
          <div className="stg" id="stg"></div>
          <div className="ai" id="ai" aria-live="polite"></div>
        </div>
      </section>

      <section id="sounds" className="sb">
        <span
          className="el hm"
          data-a="hand"
          style={
            {
              right: "3%",
              top: "30px",
              width: "90px",
              "--r": "10deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="cactus"
          style={{ left: "46%", bottom: 0, width: "60px" }}
        ></span>
        <div className="hd">
          <h2>Shutter Soundboard</h2>
          <small>
            Eight little sounds, made right in your browser. Tap a pad or press
            keys 1 to 8. Turn your volume on.
          </small>
        </div>
        <div className="pads" id="pads"></div>
        <p className="note">
          Sounds are synthesised on the fly, so nothing is downloaded.
        </p>
        <div className="sfl" id="sfl"></div>
      </section>

      <section id="faq" className="p">
        <span
          className="el"
          data-a="eagle"
          style={
            {
              right: "4%",
              top: "60px",
              width: "min(24vw,200px)",
              "--r": "6deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="cloud"
          style={{ right: "26%", top: "30px", width: "120px" }}
        ></span>
        <span
          className="el hm"
          data-a="flower"
          style={{ right: "6%", bottom: "-8px", width: "130px" }}
        ></span>
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              right: "36%",
              bottom: "24px",
              width: "80px",
              "--r": "-8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el rl hm"
          data-a="feather"
          style={
            {
              right: "16%",
              bottom: "14px",
              width: "34px",
              "--r": "40deg",
            } as React.CSSProperties
          }
        ></span>
        <div className="hd">
          <h2>FAQ</h2>
          <small>Tap a question.</small>
        </div>
        <div className="fq" id="fq"></div>
      </section>

      <section id="join" className="j">
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              left: "42%",
              top: "36px",
              width: "100px",
              "--r": "10deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el rl hm"
          data-a="ear"
          style={
            {
              right: "26%",
              bottom: "20px",
              width: "84px",
              "--r": "-10deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el"
          data-a="column"
          style={{ right: "4%", top: "30px", width: "min(14vw,120px)" }}
        ></span>
        <span
          className="el hm"
          data-a="invader2"
          style={
            {
              right: "18%",
              bottom: "30px",
              width: "70px",
              "--r": "-8deg",
            } as React.CSSProperties
           }
        ></span>
        <span
          className="el hm"
          data-a="snake"
          style={{ left: "-6%", bottom: "-10px", width: "70%", opacity: 0.9 }}
        ></span>
        <div className="hd">
          <h2>How To Join</h2>
          <small>Any camera works. A phone is a camera.</small>
        </div>
        <div className="js">
          <div>
            <b>1</b>
            <h3>Say hello</h3>
            <p>
              Follow @shutterscapegcu on Instagram and watch for announcements.
            </p>
          </div>
          <div>
            <b>2</b>
            <h3>Send a signal</h3>
            <p>Use the form below, or message us on Instagram.</p>
          </div>
          <div>
            <b>3</b>
            <h3>Bring your eyes</h3>
            <p>
              Come to the next walk, workshop or challenge when it is announced.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="c">
        <span
          className="el rl"
          data-a="eyeball"
          style={
            {
              left: "2%",
              bottom: "40px",
              width: "150px",
              "--r": "-12deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              right: "44%",
              top: "90px",
              width: "60px",
              "--r": "8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el rl hm"
          data-a="eyeball"
          style={
            {
              left: "30%",
              bottom: "24px",
              width: "90px",
              "--r": "14deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el"
          data-a="planet"
          style={
            {
              right: "-30px",
              top: "60px",
              width: "min(46vw,420px)",
              "--r": "-8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="alien"
          style={
            {
              right: "36%",
              bottom: "30px",
              width: "100px",
              "--r": "9deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el"
          data-a="invader"
          style={
            {
              right: "12%",
              bottom: "80px",
              width: "80px",
              "--r": "-6deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="invader2"
          style={{ right: "5%", bottom: "230px", width: "44px" }}
        ></span>
        <div className="hd">
          <h2>Contact Us</h2>
          <small>Send a signal. We answer from Earth.</small>
        </div>
        <div className="cg">
          <form id="f" noValidate>
            <label>
              Name
              <input name="name" autoComplete="name" />
              <span className="er" data-e="name"></span>
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" />
              <span className="er" data-e="email"></span>
            </label>
            <label>
              What do you like to photograph?
              <select name="interest">
                <option>Street</option>
                <option>Portrait</option>
                <option>Nature</option>
                <option>Monochrome</option>
                <option>Campus events</option>
                <option>Experimental</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows={4}></textarea>
              <span className="er" data-e="message"></span>
            </label>
            <button type="submit">Send signal</button>
            <p id="st" role="status"></p>
          </form>
          <div>
            <p style={{ font: "30px/1.15 Gloock,serif", margin: "0 0 14px" }}>
              Fastest route: Instagram.
            </p>
            <a
              className="bt"
              href="https://www.instagram.com/shutterscapegcu/"
              target="_blank"
              rel="noreferrer"
            >
              @shutterscapegcu ↗
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span
          className="el"
          data-a="dragon"
          style={
            {
              right: "-3%",
              top: "20px",
              width: "min(50vw,460px)",
              "--r": "-4deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el"
          data-a="flower"
          style={{ right: "30%", bottom: "-6px", width: "110px" }}
        ></span>
        <span
          className="el hm"
          data-a="eagle"
          style={
            {
              right: "6%",
              bottom: "60px",
              width: "150px",
              "--r": "8deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="ghost"
          style={
            {
              left: "44%",
              top: "40px",
              width: "56px",
              "--r": "-6deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="rocket"
          style={
            {
              left: "60%",
              bottom: "50px",
              width: "44px",
              "--r": "28deg",
            } as React.CSSProperties
          }
        ></span>
        <span
          className="el hm"
          data-a="mushroom"
          style={{ left: "70%", bottom: 0, width: "70px" }}
        ></span>
        <span
          className="el rl hm"
          data-a="feather"
          style={
            {
              right: "1%",
              top: "24px",
              width: "44px",
              "--r": "-18deg",
            } as React.CSSProperties
          }
        ></span>
        <div className="big">
          shutter
          <br />
          scape
        </div>
        <p>
          Photography club, Girijananda Chowdhury University.{" "}
          <a href="#top">Back to top ↑</a> · <a href="/admin">Admin Dashboard</a>
        </p>
      </footer>
    </div>
  );
}
