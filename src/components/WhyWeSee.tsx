import { editorial } from "@/data/content";
import { PhotoImage } from "./PhotoImage";
import { Lines, Reveal } from "./Reveal";
import { Parallax } from "./Parallax";

export function WhyWeSee() {
  return (
    <section id="why" className="on-light relative overflow-hidden bg-ivory text-obsidian">
      <div className="mx-auto max-w-[1800px] px-6 pb-28 pt-24 md:px-14 md:pb-44 md:pt-40">
        {/* Magazine running head */}
        <div className="mono-label mb-14 flex items-center justify-between border-b border-obsidian/20 pb-4 text-[0.65rem] text-obsidian/70 md:mb-24">
          <span className="font-medium tracking-widest">VOL. 03 · THE ART OF SEEING</span>
          <span className="hidden sm:inline">Nº 01 — A Philosophy in Three Lines</span>
          <span>p. 02 / 36</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2 className="display text-[clamp(3.2rem,10.2vw,10.8rem)] leading-[0.84] tracking-[-0.04em]">
              <Lines
                as="span"
                lines={[
                  "Some moments",
                  <span key="a" className="pl-[8%]">disappear.</span>,
                ]}
                delay={0}
              />
              <Lines
                as="span"
                className="mt-[0.35em] block"
                lines={[
                  <span key="b" className="italic">Some become</span>,
                  <span key="c" className="pl-[14%]">photographs.</span>,
                ]}
              />
              <Lines
                as="span"
                className="mt-[0.35em] block"
                lines={[
                  "Some become",
                  <span key="d" className="pl-[4%] italic text-[#a82a17]">part of us.</span>,
                ]}
              />
            </h2>

            <div className="mt-14 grid gap-8 lg:ml-[14%] lg:mt-24 lg:grid-cols-12">
              <Reveal className="lg:col-span-10" delay={150}>
                <p className="display text-[clamp(1.4rem,2.1vw,2.2rem)] italic leading-[1.24] tracking-[-0.01em]">
                  Shutterspace is a community of curious eyes, restless minds, and people who find stories in ordinary places.
                  Through our lenses, we explore perspectives, experiment with visual storytelling, and preserve the moments that
                  make our time at GCU unforgettable.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-obsidian/15 pt-6 text-[0.68rem] text-obsidian/70 mono-label lg:ml-[14%]">
              <span>EST. GIRINANANDA CHOUDHURY UNIVERSITY</span>
              <span>·</span>
              <span>COMMUNITY OF VISUAL STORYTELLERS</span>
              <span>·</span>
              <span>ASSAM</span>
            </div>
          </div>

          <div className="relative lg:col-span-4 lg:pt-36">
            <div className="mx-auto w-[82%] max-w-[480px] lg:w-full lg:max-w-none">
              <div className="relative p-3 bg-white/70 shadow-2xl border border-obsidian/10">
                <Reveal variant="clip" className="aspect-[0.72] bg-graphite" delay={100}>
                  <Parallax speed={0.04} className="absolute -inset-y-[8%] inset-x-0">
                    <PhotoImage photo={editorial.manifesto} sizes="(min-width:1024px) 30vw, 80vw" />
                  </Parallax>
                </Reveal>
                <div className="mono-label mt-3 flex justify-between text-[0.58rem] text-obsidian/70">
                  <span>Fig. 1 — {editorial.manifesto.title}</span>
                  <span>{editorial.manifesto.location}</span>
                </div>
              </div>
              <div className="mt-4 text-right">
                <span className="mono-label text-[0.55rem] text-obsidian/50 uppercase tracking-widest">
                  Archival Gelatin Silver Print
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
