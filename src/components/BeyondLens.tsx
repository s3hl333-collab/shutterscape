import { activities, activityPhotos } from "@/data/content";
import type { Activity } from "@/lib/types";
import { PhotoImage } from "./PhotoImage";
import { Lines, Reveal } from "./Reveal";

function Meta({ items, light }: { items: string[]; light?: boolean }) {
  return (
    <ul className={`mono-label mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.62rem] ${light ? "text-ivory/75" : "text-obsidian/75"}`}>
      {items.map((m) => (
        <li key={m} className="flex items-center gap-1.5">
          <span className={`inline-block h-1 w-1 rounded-full ${light ? "bg-vermilion" : "bg-crimson"}`} />
          {m}
        </li>
      ))}
    </ul>
  );
}

function Pictured({ a, ratio, className = "" }: { a: Activity; ratio: string; className?: string }) {
  const photo = a.photoId ? activityPhotos.find((p) => p.id === a.photoId) : undefined;
  return (
    <article className={`${className} group`}>
      {photo && (
        <Reveal variant="clip" className={`${ratio} bg-graphite border border-obsidian/10 shadow-lg`}>
          <PhotoImage photo={photo} sizes="(min-width:1024px) 55vw, 100vw" />
        </Reveal>
      )}
      <Reveal className="mt-6 grid grid-cols-[auto_1fr] gap-x-5" delay={120}>
        <span aria-hidden className="display text-[4.5rem] italic leading-[0.75] text-crimson">
          {a.index}
        </span>
        <div>
          <span className="mono-label text-[0.58rem] text-crimson tracking-widest">{a.tag}</span>
          <h3 className="display text-[clamp(1.9rem,2.8vw,3rem)] leading-[0.98] tracking-[-0.02em] text-obsidian">{a.title}</h3>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-obsidian/80">{a.text}</p>
          <Meta items={a.meta} />
        </div>
      </Reveal>
    </article>
  );
}

function Typographic({ a, tone }: { a: Activity; tone: "ink" | "crimson" }) {
  return (
    <Reveal
      as="article"
      className={`flex min-h-[24rem] flex-col justify-between p-8 md:p-12 shadow-xl border border-white/10 ${
        tone === "ink" ? "bg-obsidian text-ivory" : "bg-crimson text-ivory"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="mono-label text-[0.65rem] text-ivory/80">PILLAR {a.index}</span>
        <span className="mono-label text-[0.6rem] text-vermilion bg-black/40 px-2 py-0.5 rounded">{a.tag}</span>
      </div>
      <div>
        <h3 className="display text-[clamp(2.4rem,4.2vw,4.5rem)] italic leading-[0.95] tracking-[-0.025em]">{a.title}</h3>
        <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ivory/85">{a.text}</p>
        <Meta items={a.meta} light />
      </div>
    </Reveal>
  );
}

export function BeyondLens() {
  const [a1, a2, a3, a4, a5, a6] = activities;
  return (
    <section id="beyond" className="on-light bg-paper text-obsidian">
      <div className="mx-auto max-w-[1800px] px-6 py-24 md:px-14 md:py-40">
        <header className="mb-16 grid gap-8 md:mb-28 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="mono-label mb-6 text-[0.65rem] text-crimson font-medium">Nº 04 — Living Community</p>
            <Lines
              as="h2"
              className="display text-[clamp(3.8rem,11vw,12rem)] uppercase leading-[0.82] tracking-[-0.045em] text-obsidian"
              lines={["Beyond", <span key="l" className="italic lg:pl-[10%]">the Lens</span>]}
            />
          </div>
          <Reveal className="self-end lg:col-span-4" delay={150}>
            <p className="display text-[1.65rem] italic leading-[1.2] text-obsidian/90">
              A camera is only the instrument. The club lives in the dawn walks, the arguments over a crop, the late darkroom edits, and the shared contact sheets.
            </p>
          </Reveal>
        </header>

        <div className="grid gap-x-8 gap-y-16 lg:grid-cols-12 lg:gap-y-28">
          {/* 01: Photo Walks & Expeditions */}
          <Pictured a={a1} ratio="aspect-[4/3]" className="lg:col-span-7" />

          {/* 02: Workshops, Critiques & Editing */}
          <Pictured a={a2} ratio="aspect-[4/5]" className="lg:col-span-5 lg:mt-36" />

          {/* 03: Campus Events & BTS */}
          <Pictured a={a3} ratio="aspect-square" className="lg:col-span-5 lg:-mt-12" />

          {/* 04: Creative Challenges & Contests */}
          <Pictured a={a4} ratio="aspect-[5/4]" className="lg:col-span-7 lg:mt-16" />

          {/* 05: Member Spotlights (Darkroom Ink panel) */}
          <div className="lg:col-span-6">
            <Typographic a={a5} tone="ink" />
          </div>

          {/* 06: Annual Print Exhibition & Zine (Crimson panel) */}
          <div className="lg:col-span-6 lg:mt-12">
            <Typographic a={a6} tone="crimson" />
          </div>
        </div>

        <div className="mt-20 border-t border-obsidian/15 pt-6 flex flex-wrap items-center justify-between gap-4 mono-label text-[0.62rem] text-obsidian/60">
          <span>Shutterspace Culture & Activities · Girijananda Choudhury University</span>
          <span>Sample program schedule · Open to all GCU departments</span>
        </div>
      </div>
    </section>
  );
}
