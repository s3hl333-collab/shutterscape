import { ArrowUpRight, Instagram } from "lucide-react";
import { site } from "@/data/site";
import { JoinForm } from "./JoinForm";
import { Lines, Reveal } from "./Reveal";

export function Join() {
  return (
    <section id="join" className="relative overflow-hidden bg-obsidian text-ivory">
      <div className="mx-auto max-w-[1800px] px-6 py-24 md:px-14 md:py-40">
        <p className="mono-label mb-8 text-[0.65rem] text-vermilion font-medium">Nº 07 — Join the Collective</p>
        <Lines
          as="h2"
          className="display text-[clamp(3.6rem,12.2vw,13.5rem)] uppercase leading-[0.82] tracking-[-0.045em] text-ivory"
          lines={[
            "Your eyes.",
            <span key="b" className="italic text-vermilion lg:pl-[8%]">
              Your stories.
            </span>,
            <span key="c" className="lg:pl-[22%]">
              Your space.
            </span>,
          ]}
        />

        <div className="mt-16 grid gap-14 md:mt-28 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Manifesto & Primary Instagram CTA */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="display text-[clamp(1.75rem,2.8vw,3rem)] italic leading-[1.1] tracking-[-0.015em] text-ivory">
                You don’t need the most expensive camera. You just need the curiosity to see things differently.
              </p>
            </Reveal>

            <Reveal className="mt-10" delay={120}>
              <div className="space-y-4">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-4 overflow-hidden bg-vermilion px-9 py-6 text-obsidian transition-colors duration-500 hover:bg-ivory shadow-2xl"
                >
                  <span className="mono-label text-[0.85rem] font-bold tracking-wider">JOIN SHUTTERSPACE</span>
                  <ArrowUpRight size={20} className="transition-transform duration-500 group-hover:rotate-45" />
                </a>

                <p className="mono-label text-[0.65rem] leading-relaxed text-silver max-w-sm">
                  Official GCU photography community on Instagram:{" "}
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory underline underline-offset-4 hover:text-vermilion"
                  >
                    {site.instagramHandle}
                  </a>
                  . Follow our ongoing stories, exhibitions, and announcements.
                </p>
              </div>

              <div className="mt-12 border-t border-white/15 pt-6 mono-label text-[0.62rem] text-silver space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-vermilion" />
                  <span>CAMPUS CHAPTER: Girijananda Choudhury University, Azara</span>
                </div>
                <div>MEETINGS: Bi-weekly photo walks & darkroom reviews</div>
                <div>EQUIPMENT: Any device — phone cameras, analog film, DSLRs, mirrorless</div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Inquiry & Membership Form */}
          <div className="lg:col-span-7">
            <Reveal delay={200}>
              <div id="inquiry" className="on-light bg-ivory p-8 text-obsidian shadow-2xl border border-obsidian/10 md:p-14">
                <div className="mb-8 flex items-baseline justify-between border-b border-obsidian/20 pb-4">
                  <div>
                    <span className="mono-label text-[0.62rem] text-crimson font-medium">MEMBERSHIP & INQUIRIES</span>
                    <h3 className="display text-[2.4rem] italic leading-tight text-obsidian mt-1">Say hello</h3>
                  </div>
                  <span className="mono-label text-[0.62rem] text-obsidian/60">GCU Chapter</span>
                </div>
                <JoinForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
