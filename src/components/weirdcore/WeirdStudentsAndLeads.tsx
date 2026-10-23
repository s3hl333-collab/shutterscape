"use client";

import { studentsAndLeads } from "@/data/content";
import { StoicArt } from "./StoicArt";
import { Eyeball } from "./Eyeball";
import { Wildflowers } from "./Wildflowers";
import { CelestialDragon, EagleAndSerpent } from "./DragonAndSerpent";
import { AlienObserver, CelestialPlanet } from "./SpaceAlien";
import { PixelCamera, PixelFlower, PixelStar } from "./PixelElements";
import { Camera, Aperture, Radio, Sparkles } from "lucide-react";

export function WeirdStudentsAndLeads() {
  return (
    <section id="leads" className="relative bg-[#faf5eb] py-24 sm:py-36 border-b-4 border-ink halftone-bg">
      <div className="mx-auto max-w-[1700px] px-5 sm:px-10">
        {/* Section Header */}
        <div className="mb-16 border-b-2 border-ink pb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="dymo-label text-xs">SECTION 02</span>
              <span className="pixel-text text-sm font-bold text-ink">
                SIGHT OPERATORS // GIRIJANANDA CHOWDHURY UNIVERSITY
              </span>
            </div>
            <h2
              className="display uppercase tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8rem)" }}
            >
              Students
              <span className="italic text-vermilion ml-3">&amp; Leads</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm font-mono text-ink/80 leading-relaxed">
              The creative leadership, student chroniclers, and darkroom alchemists of Shutterspace GCU. Each operator sees the
              universe through a completely different frequency.
            </p>
            <div className="mt-2 text-[0.68rem] font-mono text-silver">
              *Sample editorial profiles — easily customized in <code className="text-ink">src/data/content.ts</code>
            </div>
          </div>
        </div>

        {/* Varied Asymmetrical Operator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {studentsAndLeads.map((member, i) => {
            // Give each lead a completely unique card design based on their weirdcore theme
            if (member.theme === "stoic") {
              return (
                <div
                  key={member.id}
                  className="lg:col-span-6 border-3 border-ink bg-[#fffef9] p-6 shadow-[7px_8px_0px_rgba(20,19,18,0.9)] transform -rotate-1 relative group"
                >
                  <div className="masking-tape -top-3 left-8 w-28" />
                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="relative shrink-0">
                      <StoicArt size="md" quote={member.quote} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="pixel-text text-xs text-vermilion font-bold">{member.anomalyCode}</span>
                        <span className="dymo-label text-[0.55rem]">{member.group}</span>
                      </div>
                      <h3 className="display text-3xl italic text-ink">{member.name}</h3>
                      <p className="pixel-text text-sm font-bold text-vermilion mt-0.5">{member.role}</p>
                      <p className="mt-2 text-xs font-mono text-ink/80 leading-relaxed">{member.bio}</p>
                      <div className="mt-4 border-t border-ink/20 pt-2 flex flex-wrap gap-3 text-[0.65rem] font-mono text-ink/70">
                        <span className="flex items-center gap-1 font-bold">
                          <Camera size={12} className="text-vermilion" /> {member.gear}
                        </span>
                        <span>·</span>
                        <span>{member.focusArea}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (member.theme === "tv") {
              return (
                <div
                  key={member.id}
                  className="lg:col-span-6 border-3 border-ink bg-[#f0e6cf] p-6 shadow-[7px_8px_0px_rgba(20,19,18,0.9)] transform rotate-1 relative"
                >
                  <div className="flex items-center justify-between border-b-2 border-ink/20 pb-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-vermilion animate-pulse" />
                      <span className="pixel-text text-xs font-bold text-ink">{member.anomalyCode} · CRT ARCHIVE</span>
                    </div>
                    <span className="dymo-label dymo-red text-[0.55rem]">SIGNAL LOCK</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 items-center">
                    <div className="crt-screen relative aspect-square w-full rounded-xl border-3 border-ink bg-black overflow-hidden flex items-center justify-center">
                      <Eyeball size={120} label="CRT FREQUENCY" />
                    </div>
                    <div>
                      <h3 className="display text-3xl italic text-ink">{member.name}</h3>
                      <p className="pixel-text text-sm font-bold text-vermilion mt-0.5">{member.role}</p>
                      <p className="mt-2 text-xs font-mono text-ink/80 leading-relaxed">{member.bio}</p>
                      <div className="mt-3 p-2 bg-[#e4d4b8] rounded border border-ink/30 text-[0.65rem] font-mono">
                        <p className="text-vermilion font-bold">&ldquo;{member.quote}&rdquo;</p>
                        <p className="mt-1 text-ink/70">{member.gear}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (member.theme === "dragon") {
              return (
                <div
                  key={member.id}
                  className="lg:col-span-4 border-3 border-ink bg-[#fffdf9] p-5 shadow-[6px_7px_0px_rgba(20,19,18,0.9)] transform -rotate-1 relative"
                >
                  <div className="absolute -top-10 -right-4 pointer-events-none">
                    <CelestialDragon size={170} />
                  </div>
                  <span className="pixel-text text-xs text-vermilion font-bold block">{member.anomalyCode}</span>
                  <h3 className="display text-2xl italic text-ink mt-1">{member.name}</h3>
                  <p className="pixel-text text-xs font-bold text-[#d48a28]">{member.role}</p>
                  <p className="mt-2 text-xs font-mono text-ink/80 leading-relaxed">{member.bio}</p>
                  <div className="mt-3 border-t border-ink/15 pt-2 text-[0.62rem] font-mono text-ink/70">
                    <p className="font-bold">{member.gear}</p>
                    <p className="text-vermilion italic mt-0.5">{member.quote}</p>
                  </div>
                </div>
              );
            }

            if (member.theme === "eagle") {
              return (
                <div
                  key={member.id}
                  className="lg:col-span-4 border-3 border-ink bg-[#faf2e1] p-5 shadow-[6px_7px_0px_rgba(20,19,18,0.9)] transform rotate-2 relative"
                >
                  <div className="flex justify-center -mt-2 mb-2">
                    <EagleAndSerpent size={110} />
                  </div>
                  <span className="pixel-text text-xs text-vermilion font-bold block">{member.anomalyCode}</span>
                  <h3 className="display text-2xl italic text-ink mt-0.5">{member.name}</h3>
                  <p className="pixel-text text-xs font-bold text-vermilion">{member.role}</p>
                  <p className="mt-2 text-xs font-mono text-ink/80 leading-relaxed">{member.bio}</p>
                  <div className="mt-3 border-t border-ink/15 pt-2 text-[0.62rem] font-mono text-ink/70">
                    <p className="font-bold">{member.gear}</p>
                    <p className="text-ink/60 mt-0.5">{member.focusArea}</p>
                  </div>
                </div>
              );
            }

            if (member.theme === "alien") {
              return (
                <div
                  key={member.id}
                  className="lg:col-span-4 border-3 border-ink bg-[#1a1716] text-ivory p-5 shadow-[6px_7px_0px_rgba(20,19,18,0.9)] transform -rotate-2 relative"
                >
                  <div className="absolute top-2 right-2">
                    <AlienObserver size={65} />
                  </div>
                  <span className="pixel-text text-xs text-crtGreen font-bold block">{member.anomalyCode}</span>
                  <h3 className="display text-2xl italic text-ivory mt-1">{member.name}</h3>
                  <p className="pixel-text text-xs font-bold text-yellow-300">{member.role}</p>
                  <p className="mt-2 text-xs font-mono text-silver leading-relaxed">{member.bio}</p>
                  <div className="mt-3 border-t border-white/20 pt-2 text-[0.62rem] font-mono text-silver">
                    <p className="text-crtGreen font-bold">{member.gear}</p>
                    <p className="italic text-ivory/80 mt-0.5">&ldquo;{member.quote}&rdquo;</p>
                  </div>
                </div>
              );
            }

            if (member.theme === "flower") {
              return (
                <div
                  key={member.id}
                  className="lg:col-span-4 border-3 border-ink bg-[#fffef9] p-5 shadow-[6px_7px_0px_rgba(20,19,18,0.9)] transform rotate-1 relative"
                >
                  <div className="absolute -bottom-6 -right-4 pointer-events-none">
                    <Wildflowers size={80} type="poppy" />
                  </div>
                  <span className="pixel-text text-xs text-vermilion font-bold block">{member.anomalyCode}</span>
                  <h3 className="display text-2xl italic text-ink mt-1">{member.name}</h3>
                  <p className="pixel-text text-xs font-bold text-[#4a5d3f]">{member.role}</p>
                  <p className="mt-2 text-xs font-mono text-ink/80 leading-relaxed">{member.bio}</p>
                  <div className="mt-3 border-t border-ink/15 pt-2 text-[0.62rem] font-mono text-ink/70">
                    <p className="font-bold">{member.gear}</p>
                    <p className="text-[#4a5d3f] italic mt-0.5">{member.quote}</p>
                  </div>
                </div>
              );
            }

            // Default: 8-Bit Pixel Member
            return (
              <div
                key={member.id}
                className="lg:col-span-4 border-3 border-ink bg-[#ded0b6] p-5 shadow-[6px_7px_0px_rgba(20,19,18,0.9)] transform -rotate-1 relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="pixel-text text-xs text-ink font-bold">{member.anomalyCode}</span>
                  <PixelCamera size={26} />
                </div>
                <h3 className="display text-2xl italic text-ink">{member.name}</h3>
                <p className="pixel-text text-xs font-bold text-vermilion">{member.role}</p>
                <p className="mt-2 text-xs font-mono text-ink/80 leading-relaxed">{member.bio}</p>
                <div className="mt-3 border-t border-ink/20 pt-2 text-[0.62rem] font-mono text-ink/70">
                  <p className="font-bold">{member.gear}</p>
                  <p className="italic text-ink/80 mt-0.5">&ldquo;{member.quote}&rdquo;</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
