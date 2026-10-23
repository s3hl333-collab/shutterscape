"use client";

import Image from "next/image";
import type { Photo as PhotoT } from "@/lib/types";
import { unsplashLoader } from "@/lib/loader";

interface Props {
  photo: PhotoT;
  sizes: string;
  priority?: boolean;
  contain?: boolean;
  className?: string;
}

/** Fills its (positioned, aspect-ratio'd) parent. Uses Unsplash's CDN for responsive sizes + AVIF/WebP. */
export function PhotoImage({ photo, sizes, priority, contain, className = "" }: Props) {
  return (
    <Image
      loader={unsplashLoader}
      src={photo.url ?? photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={75}
      draggable={false}
      className={`${contain ? "object-contain" : "object-cover"} ${className}`}
      style={{
        objectPosition: photo.focus,
        filter: photo.mono ? "grayscale(1) contrast(1.08)" : undefined,
      }}
    />
  );
}
