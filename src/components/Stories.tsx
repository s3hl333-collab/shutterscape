"use client";

import { useState } from "react";
import { stories } from "@/data/content";
import { photoById } from "@/data/photos";
import { site } from "@/data/site";
import { playShutterSound } from "@/lib/audio";
import { Parallax } from "./Parallax";
import { PhotoImage } from "./PhotoImage";
import { Lines, Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";
import { MapPin, Camera, Clock } from "lucide-react";

function StoryMeta({ credit, n, location, technical }: { credit?: string; n: string; location?: string; technical?: string }) {
  return (
    <div className="mono-label mt-6 space-y-1.5 border-t border-white/15 pt-4 text-[0.62rem] text-silver">
      <div className="flex items-center justify-between">
        <span className="text-vermilion font-bold">ESSAY Nº {n}</span>
        <span className="text-ivory">{credit ?? site.sampleCredit}</span>
      </div>
      {location && (
        <div className="flex items-center gap-1.5 text-silver/80">
          <MapPin size={11} className="text-vermilion" /> {location}
        </div>
      )}
      {technical && (
        <div className="flex items-center gap-1.5 text-silver/60">
          <Camera size={11} /> {technical}
        </div>
      )}
    </div>
  );
}

export function Stories() {
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);
  const storyList = stories.map((s) => ({ s, photo: photoById(s.photoId)! }));
  const allPhotos = storyList.map((x) => x.photo);

  const [s1, s2, s3] = storyList;

  return (
    <section id="stories" className="relative overflow-hidden bg-obsidian text-ivory">
      <div className="mx-auto max-w-[1800px] px-6 pt-24 md:px-14 md:pt-40">
        <p className="mono-label mb-6 text-[0.65rem] text-vermilion font-medium">Nº 05 — Editorial Essays</p>
        <Lines
          as="h2"
          className="display text-[clamp(4.2rem,13vw,14.5rem)] uppercase leading-[0.8] tracking-[-0.045em] text-ivory"
          lines={["Frames", <span key="b" className="italic lg:pl-[18%]">that stay</span>]}
        />
        <p className="display mt-6 max-w-xl text-[1.35rem] italic text-silver/90">
          Three visual essays on memory, chance, and the fleeting light we almost walked past.
        </p>
      </div>

      {/* STORY 1 — Full-bleed cinematic spread */}
      <article className="relative mt-20 md:mt-32">
        <div
          className="cursor-pointer"
          onClick={() => {
            playShutterSound();
            setOpenPhoto(0);
          }}
        >
          <Reveal variant="clip" className="aspect-[4/5] w-full bg-graphite sm:aspect-[16/9] border-y border-white/10">
            <Parallax speed={0.05} className="absolute -inset-y-[6%] inset-x-0">
              <PhotoImage photo={s1.photo} sizes="100vw" />
            </Parallax>
          </Reveal>
        </div>

        <div className="relative z-10 mx-auto -mt-[2.4em] max-w-[1800px] px-6 text-[clamp(3.2rem,10.5vw,11.5rem)] md:px-14 pointer-events-none">
          <Lines as="h3" className="display italic leading-[0.85] tracking-[-0.04em] text-ivory drop-shadow-2xl" lines={[s1.s.title]} />
        </div>

        <div className="mx-auto mt-8 grid max-w-[1800px] gap-6 px-6 md:px-14 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <span className="mono-label text-[0.62rem] text-vermilion tracking-widest">{s1.s.subtitle}</span>
              <p className="display mt-2 text-[1.6rem] italic leading-[1.24] text-ivory/90">{s1.s.caption}</p>
              <StoryMeta credit={s1.s.credit} n="01" location={s1.s.location} technical={s1.s.technical} />
            </Reveal>
          </div>
        </div>
      </article>

      {/* STORY 2 — Tall portrait left, giant display right */}
      <article className="mx-auto mt-28 grid max-w-[1800px] items-center gap-10 px-6 md:mt-48 md:px-14 lg:grid-cols-12 lg:gap-14">
        <div
          className="lg:col-span-5 cursor-pointer"
          onClick={() => {
            playShutterSound();
            setOpenPhoto(1);
          }}
        >
          <Reveal variant="clip" className="aspect-[4/5] bg-graphite border border-white/15 shadow-2xl">
            <PhotoImage photo={s2.photo} sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:-ml-[5vw] lg:pt-20">
          <span className="mono-label text-[0.65rem] text-vermilion">{s2.s.subtitle}</span>
          <Lines
            as="h3"
            className="display text-[clamp(3.6rem,9.2vw,10.2rem)] uppercase leading-[0.84] tracking-[-0.045em] text-ivory mt-2"
            lines={["Between", <span key="c" className="italic lg:pl-[12%]">Classes</span>]}
          />
          <Reveal className="mt-8 max-w-lg lg:ml-[12%]" delay={150}>
            <p className="display text-[1.6rem] italic leading-[1.24] text-ivory/90">{s2.s.caption}</p>
            <StoryMeta credit={s2.s.credit} n="02" location={s2.s.location} technical={s2.s.technical} />
          </Reveal>
        </div>
      </article>

      {/* STORY 3 — Ultra-wide panoramic crop */}
      <article className="mx-auto mt-28 max-w-[1800px] px-6 pb-28 md:mt-48 md:px-14 md:pb-44">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-12">
            <span className="mono-label text-[0.65rem] text-vermilion">{s3.s.subtitle}</span>
            <Lines
              as="h3"
              className="display text-[clamp(3.4rem,10vw,11.2rem)] leading-[0.85] tracking-[-0.04em] text-ivory mt-2"
              lines={[
                "A Sky We",
                <span key="d" className="italic lg:pl-[28%]">Almost Missed</span>,
              ]}
            />
          </div>

          <div
            className="lg:col-span-9 lg:col-start-4 cursor-pointer"
            onClick={() => {
              playShutterSound();
              setOpenPhoto(2);
            }}
          >
            <Reveal variant="clip" className="aspect-[4/3] bg-graphite sm:aspect-[2.4] border border-white/15 shadow-2xl">
              <PhotoImage photo={s3.photo} sizes="(min-width:1024px) 75vw, 100vw" />
            </Reveal>
          </div>

          <div className="lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:self-end">
            <Reveal delay={150}>
              <p className="display text-[1.55rem] italic leading-[1.24] text-ivory/90">{s3.s.caption}</p>
              <StoryMeta credit={s3.s.credit} n="03" location={s3.s.location} technical={s3.s.technical} />
            </Reveal>
          </div>
        </div>
      </article>

      <Lightbox
        items={allPhotos}
        index={openPhoto}
        onClose={() => setOpenPhoto(null)}
        onNavigate={(idx) => setOpenPhoto(idx)}
      />
    </section>
  );
}
