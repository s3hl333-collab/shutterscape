import { members } from "@/data/content";
import type { Member } from "@/lib/types";
import { PhotoImage } from "./PhotoImage";
import { Lines, Reveal } from "./Reveal";
import { Camera, Aperture } from "lucide-react";

const groups: Member["group"][] = ["Leadership", "Core team", "Photographers"];

/** Column span + vertical offset per position, per group — irregular on purpose. */
const layout: Record<Member["group"], string[]> = {
  Leadership: ["lg:col-span-5", "lg:col-span-4 lg:mt-24", "lg:col-span-3 lg:mt-8"],
  "Core team": ["lg:col-span-4", "lg:col-span-4 lg:mt-20", "lg:col-span-4 lg:mt-6"],
  Photographers: ["lg:col-span-4 lg:col-start-2", "lg:col-span-4 lg:col-start-7 lg:mt-12"],
};

function Marks() {
  const c = "absolute h-4 w-4 border-obsidian/60 transition-all duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)]";
  return (
    <>
      <span className={`${c} left-3 top-3 border-l border-t group-hover:left-5 group-hover:top-5`} />
      <span className={`${c} right-3 top-3 border-r border-t group-hover:right-5 group-hover:top-5`} />
      <span className={`${c} bottom-3 left-3 border-b border-l group-hover:bottom-5 group-hover:left-5`} />
      <span className={`${c} bottom-3 right-3 border-b border-r group-hover:bottom-5 group-hover:right-5`} />
    </>
  );
}

function Portrait({ m, index }: { m: Member; index: number }) {
  return (
    <figure className="group">
      <Reveal variant="clip" className="bg-[#dcd4c0] border border-obsidian/10 shadow-lg" delay={index * 100} style={{ aspectRatio: m.ratio }}>
        {m.portrait ? (
          <PhotoImage
            photo={{
              id: m.id,
              src: m.portrait,
              url: m.portrait,
              title: m.name,
              alt: `Portrait of ${m.name}`,
              category: "portraits",
              ratio: m.ratio,
            }}
            sizes="(min-width:1024px) 30vw, 90vw"
          />
        ) : (
          <div className="absolute inset-0 transition-colors duration-700 group-hover:bg-[#d0c6af] flex flex-col items-center justify-center p-6">
            <Marks />
            <span aria-hidden className="h-px w-10 bg-obsidian/30" />
            <span aria-hidden className="h-10 w-px -mt-5 bg-obsidian/30" />
            <div className="mt-4 text-center">
              <span className="mono-label block text-[0.6rem] text-obsidian/75 font-medium">EDITORIAL CROP</span>
              <span className="mono-label block text-[0.52rem] text-obsidian/50 mt-1">Portrait placeholder</span>
            </div>
          </div>
        )}
      </Reveal>

      <figcaption className="mt-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <p className="display text-[2.1rem] leading-none tracking-[-0.02em] text-obsidian">{m.name}</p>
            {m.placeholder && (
              <span className="mono-label shrink-0 border border-obsidian/30 bg-obsidian/5 px-2 py-0.5 text-[0.52rem] text-obsidian/70">
                Sample
              </span>
            )}
          </div>
          <p className="mono-label mt-2 text-[0.68rem] font-bold text-crimson">{m.role}</p>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-obsidian/80">{m.bio}</p>
        </div>

        {(m.gear || m.focusArea) && (
          <div className="mt-4 border-t border-obsidian/15 pt-3 mono-label text-[0.58rem] text-obsidian/60 space-y-1">
            {m.focusArea && (
              <div className="flex items-center gap-1.5">
                <Aperture size={11} className="text-crimson" /> {m.focusArea}
              </div>
            )}
            {m.gear && (
              <div className="flex items-center gap-1.5">
                <Camera size={11} /> {m.gear}
              </div>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export function Collective() {
  return (
    <section id="collective" className="on-light bg-ivory text-obsidian">
      <div className="mx-auto max-w-[1800px] px-6 py-24 md:px-14 md:py-40">
        <header className="mb-16 grid gap-8 md:mb-24 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="mono-label mb-6 text-[0.65rem] text-crimson font-medium">Nº 06 — The Collective</p>
            <Lines
              as="h2"
              className="display text-[clamp(3.4rem,9.6vw,10.5rem)] uppercase leading-[0.84] tracking-[-0.045em] text-obsidian"
              lines={[
                "The people",
                <span key="b" className="italic lg:pl-[10%]">
                  behind the lens
                </span>,
              ]}
            />
          </div>
          <Reveal className="self-end lg:col-span-3" delay={150}>
            <p className="text-[0.95rem] leading-relaxed text-obsidian/80">
              The creative leadership, organizers, and contributing eyes of Girijananda Choudhury University.
            </p>
            <p className="mono-label mt-3 text-[0.6rem] text-obsidian/60">
              Profiles are sample placeholders — easily customized in <code className="font-mono text-obsidian">src/data/content.ts</code>.
            </p>
          </Reveal>
        </header>

        <div className="space-y-24 md:space-y-36">
          {groups.map((g) => {
            const list = members.filter((m) => m.group === g);
            if (!list.length) return null;
            return (
              <div key={g}>
                <div className="mono-label mb-8 flex items-center gap-4 border-t border-obsidian/25 pt-4 text-[0.7rem] font-bold">
                  <span>{g.toUpperCase()}</span>
                  <span className="text-obsidian/40">[{String(list.length).padStart(2, "0")}]</span>
                </div>
                <div className="grid items-start gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-12">
                  {list.map((m, i) => (
                    <div key={m.id} className={`${layout[g][i] ?? "lg:col-span-4"}`}>
                      <Portrait m={m} index={i} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
