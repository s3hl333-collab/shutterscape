export type CategorySlug =
  | "streets"
  | "portraits"
  | "nature"
  | "monochrome"
  | "campus"
  | "abstract";

export interface Category {
  slug: CategorySlug;
  label: string;
  blurb: string;
}

/** A single photograph with rich editorial & darkroom metadata. */
export interface Photo {
  id: string;
  /** Unsplash photo id or external CDN path. */
  src: string;
  /** Optional full image URL (e.g. your own CDN). Overrides `src` when present. */
  url?: string;
  title: string;
  category: CategorySlug;
  alt: string;
  /** Width / height used for the gallery crop. */
  ratio: number;
  /** Real photographer credit. Leave empty to show the default sample credit. */
  photographer?: string;
  /** CSS object-position for the crop, e.g. "50% 30%". */
  focus?: string;
  /** Render in black & white. */
  mono?: boolean;
  /** Technical photographic metadata (EXIF). */
  camera?: string;
  lens?: string;
  focal?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
  location?: string;
  year?: string;
  caption?: string;
  frameStyle?: "tv" | "polaroid" | "stamp" | "stoic" | "eye" | "panoramic" | "glitch";
  rotation?: number;
}

export interface Story {
  id: string;
  title: string;
  subtitle?: string;
  caption: string;
  credit?: string;
  location?: string;
  timestamp?: string;
  technical?: string;
  /** Photo id from the archive. */
  photoId: string;
  ratio: number;
}

export interface Member {
  id: string;
  group: "Leadership" | "Core team" | "Photographers";
  name: string;
  role: string;
  bio: string;
  /** Add a portrait URL when you have one. */
  portrait?: string;
  ratio: number;
  placeholder: boolean;
  gear?: string;
  focusArea?: string;
}

export interface Activity {
  id: string;
  index: string;
  tag: string;
  title: string;
  text: string;
  meta: string[];
  photoId?: string;
}
