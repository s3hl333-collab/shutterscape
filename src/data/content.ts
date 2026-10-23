import type { Member, Photo } from "@/lib/types";

export interface StudentLead extends Member {
  theme: "stoic" | "tv" | "dragon" | "eagle" | "alien" | "flower" | "pixel";
  quote: string;
  anomalyCode: string;
}

export const studentsAndLeads: StudentLead[] = [
  {
    id: "lead-01",
    group: "Leadership",
    name: "Arunav Baruah",
    role: "Club President & Optical Lead",
    bio: "Obsessed with high-contrast shadows, stoic marble statues, and 35mm film grain. Believes the camera is a tool to freeze the soul.",
    gear: "Leica M6 · 35mm Summicron",
    focusArea: "Street Liminal & Stoic B&W",
    theme: "stoic",
    quote: "THE EYE SEES ONLY WHAT THE MIND DARES TO WITNESS",
    anomalyCode: "OPERATOR #001",
    ratio: 0.8,
    placeholder: true,
  },
  {
    id: "lead-02",
    group: "Leadership",
    name: "Priyanka Sarma",
    role: "Vice President & CRT Archivist",
    bio: "Broadcasts strange frequencies across campus. Curates our monthly exhibitions, retro monitor installations, and analog photo archives.",
    gear: "Sony A7 IV · CRT Monitor Rig",
    focusArea: "Video Glitch & Portraiture",
    theme: "tv",
    quote: "TUNING INTO CHANNELS THAT DON'T EXIST",
    anomalyCode: "OPERATOR #002",
    ratio: 1.1,
    placeholder: true,
  },
  {
    id: "lead-03",
    group: "Leadership",
    name: "Himanshu Kalita",
    role: "Creative Director & Dragon Alchemist",
    bio: "Mixes silver chemistry late into the night. Taming dragons of light leaks, halation, and accidental double exposures in the GCU darkroom.",
    gear: "Nikon FM2 · Hasselblad 500C/M",
    focusArea: "Analog Film & Darkroom Alchemy",
    theme: "dragon",
    quote: "CHEMISTRY IS MAGIC THAT LEAVES A PERMANENT STAIN",
    anomalyCode: "OPERATOR #003",
    ratio: 0.75,
    placeholder: true,
  },
  {
    id: "lead-04",
    group: "Core team",
    name: "Rohan Das",
    role: "Field Expeditions & Eagle Scout",
    bio: "Leads our dawn walks along the Brahmaputra sandbars and midnight rooftop crawls. Sharp eyes like an eagle; patient like a coiled serpent.",
    gear: "Fujifilm X-T5 · 23mm f/1.4",
    focusArea: "Dawn Expeditions & Wildlife",
    theme: "eagle",
    quote: "LOOK UP BEFORE THE LIGHT ESCAPES THE SKY",
    anomalyCode: "OPERATOR #004",
    ratio: 0.85,
    placeholder: true,
  },
  {
    id: "lead-05",
    group: "Core team",
    name: "Ananya Goswami",
    role: "Space & Alien Signals Lead",
    bio: "Astrophotography and surreal infrared experiments. Searching the Assam night sky for strange geometries and unexplainable light orbs.",
    gear: "Canon EOS R5 · Samyang 14mm f/2.8",
    focusArea: "Astrophotography & Cosmic Void",
    theme: "alien",
    quote: "WE ARE BEING OBSERVED THROUGH THE APERTURE",
    anomalyCode: "OPERATOR #005",
    ratio: 0.95,
    placeholder: true,
  },
  {
    id: "lead-06",
    group: "Photographers",
    name: "Nandini Saikia",
    role: "Wildflower Botanist & Macro",
    bio: "Finds surreal beauty in decomposing wildflowers, rusted fences, and rain-soaked spiderwebs on campus grounds.",
    gear: "Ricoh GR IIIx · Macro Convertor",
    focusArea: "Botanical Weirdcore & Flora",
    theme: "flower",
    quote: "PLANTS DREAM IN ULTRAVIOLET",
    anomalyCode: "OPERATOR #006",
    ratio: 0.7,
    placeholder: true,
  },
  {
    id: "lead-07",
    group: "Photographers",
    name: "Pallav Chaliha",
    role: "8-Bit Chronicler & Campus BTS",
    bio: "Documents the chaos of student life at Girijananda Chowdhury University. Blending low-res Gameboy cameras with modern digital sensors.",
    gear: "Fujifilm X100V · Gameboy Camera (1998)",
    focusArea: "8-Bit Dither & Campus Chronicles",
    theme: "pixel",
    quote: "EVERY PIXEL REMEMBERS WHAT IT FELT LIKE",
    anomalyCode: "OPERATOR #007",
    ratio: 1.05,
    placeholder: true,
  },
  {
    id: "lead-08",
    group: "Photographers",
    name: "Debojit Nath",
    role: "Monochrome Void Chronicler",
    bio: "Deep inky blacks and blinding white highlights. Stripping color away until only raw geometry, eye contact, and soul remain.",
    gear: "Nikon Z6 II · 50mm f/1.8 S",
    focusArea: "High-Contrast B&W & Architecture",
    theme: "stoic",
    quote: "LIGHT DOES NOT EXIST WITHOUT SHADOW",
    anomalyCode: "OPERATOR #008",
    ratio: 0.8,
    placeholder: true,
  },
];


import { photos } from "./photos";

// Backward compatibility exports for legacy editorial components
export const members = studentsAndLeads;

export const editorial = {
  heroMain: photos[0],
  heroSide: photos[1],
  heroTiny: photos[2],
  manifesto: photos[3],
  heroTagline: "We don't just capture moments. We give them a place to live.",
  heroSupport:
    "A photography collective at GCU, chasing light, preserving fleeting moments, and discovering stories hidden in the ordinary.",
  whyHeadline: "Some moments disappear.\nSome become photographs.\nSome become part of us.",
  whyCopy:
    "Shutterspace is a community of curious eyes, restless minds, and people who find stories in ordinary places. Through our lenses, we explore perspectives, experiment with visual storytelling, and preserve the moments that make our time at GCU unforgettable.",
  ctaText: "EXPLORE OUR WORLD ↗",
};

export const activities = [
  {
    id: "act-01",
    index: "01",
    num: "01",
    tag: "EXPEDITION",
    title: "Campus Photo Walks & Dawn Expeditions",
    desc: "Golden hour explorations across GCU campus, Azara village, and Brahmaputra riverbanks.",
    text: "Golden hour explorations across GCU campus, Azara village, and Brahmaputra riverbanks.",
    meta: ["Weekly", "Open to all students"],
    photoId: photos[0].id,
  },
  {
    id: "act-02",
    index: "02",
    num: "02",
    tag: "DARKROOM & DIGITAL",
    title: "Workshops & Darkroom Sessions",
    desc: "Hands-on masterclasses covering manual exposure, 35mm film development, and color grading.",
    text: "Hands-on masterclasses covering manual exposure, 35mm film development, and color grading.",
    meta: ["Bi-weekly", "Practical sessions"],
    photoId: photos[1].id,
  },
  {
    id: "act-03",
    index: "03",
    num: "03",
    tag: "CAMPUS ARCHIVE",
    title: "Campus Life & Behind the Scenes",
    desc: "Documenting university festivals, sports meets, quiet library corners, and campus memories.",
    text: "Documenting university festivals, sports meets, quiet library corners, and campus memories.",
    meta: ["Ongoing", "Archive coverage"],
    photoId: photos[2].id,
  },
  {
    id: "act-04",
    index: "04",
    num: "04",
    tag: "EXHIBITIONS",
    title: "Print Zines & Gallery Showcases",
    desc: "Turning digital pixels into tactile print exhibitions, wall galleries, and annual photobooks.",
    text: "Turning digital pixels into tactile print exhibitions, wall galleries, and annual photobooks.",
    meta: ["Semester showcase", "Curated prints"],
    photoId: photos[3].id,
  },
];

export const activityPhotos: Photo[] = [
  photos[0],
  photos[1],
  photos[2],
  photos[3],
];

export const reel: Photo[] = activityPhotos;

export const stories = [
  {
    id: "story-1",
    title: "The City After Rain",
    subtitle: "Reflections, neon puddles, and twilight skies",
    caption: "The asphalt turns into mirrors when the monsoon breaks over Assam.",
    credit: "Arunav Baruah",
    technical: "Leica M6 · 35mm Summicron",
    location: "Guwahati City",
    timestamp: "18:42",
    photoId: photos[0].id,
    ratio: 1.4,
  },
  {
    id: "story-2",
    title: "Between Classes",
    subtitle: "Sunbeams through library windows and laughter in the corridors",
    caption: "Moments that feel unremarkable until you look back at them years later.",
    credit: "Priyanka Sarma",
    technical: "Fujifilm X-T5 · 23mm f/1.4",
    location: "GCU Campus",
    timestamp: "13:15",
    photoId: photos[1].id,
    ratio: 1.2,
  },
  {
    id: "story-3",
    title: "A Sky We Almost Missed",
    subtitle: "Crimson dusk above the GCU university grounds",
    caption: "Thirty seconds of golden embers before night swallowed the valley.",
    credit: "Himanshu Kalita",
    technical: "Sony A7 IV · 85mm f/1.8",
    location: "Azara, Assam",
    timestamp: "17:50",
    photoId: photos[2].id,
    ratio: 1.5,
  },
];

