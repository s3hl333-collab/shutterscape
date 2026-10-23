export const site = {
  name: "SHUTTERSPACE",
  university: "Girijananda Chowdhury University",
  short: "GCU",
  region: "Azara, Guwahati, Assam",
  coordinates: "26.1158° N, 91.5647° E",
  tagline: "We don't just capture moments. We give them a strange place to live.",
  description:
    "Shutterspace is the weirdcore photography collective of Girijananda Chowdhury University (GCU). Chasing elusive light, surreal perspectives, liminal spaces, and the stories hidden in plain sight.",
  instagram: "https://www.instagram.com/shutterscapegcu/",
  instagramHandle: "@shutterscapegcu",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  membershipOpen: true,
  sampleCredit: "Shutterspace GCU Archive",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const nav = [
  { label: "Gallary", href: "#gallery", icon: "👁️" },
  { label: "Students & Leads", href: "#leads", icon: "🏛️" },
  { label: "Events & Notices", href: "#notices", icon: "📺" },
  { label: "Contact Us", href: "#contact", icon: "🛸" },
];

export const noticeItems = [
  {
    id: "not-01",
    code: "TRANS-048",
    title: "The Midnight Campus Photo Walk",
    date: "OCTOBER 28 · 11:30 PM",
    venue: "GCU Academic Quad & Library Roof",
    category: "EXPEDITION",
    urgent: true,
    description:
      "A silent night walk through the liminal corridors of Girijananda Chowdhury University. Long exposure techniques, tripod experiments, and chasing fluorescent tube hums.",
    badge: "OPEN REGISTRATION",
    stamp: "STAMPED · GCU AZARA",
  },
  {
    id: "not-02",
    code: "TRANS-049",
    title: "Darkroom Dragon: 35mm Chemical Lab",
    date: "NOVEMBER 04 · 02:00 PM",
    venue: "Fine Arts Darkroom · Block C",
    category: "WORKSHOP",
    urgent: false,
    description:
      "Hand-developing black & white 35mm film in Ilford chemistry. From spooling in total darkness to drying your negative roll and evaluating contact sheets.",
    badge: "15 SEATS ONLY",
    stamp: "CHEMISTRY APPROVED",
  },
  {
    id: "not-03",
    code: "TRANS-050",
    title: "Call for Frames: The Weird & Ordinary Zine",
    date: "SUBMISSION DEADLINE: NOV 15",
    venue: "Digital Drop / @shutterscapegcu",
    category: "EXHIBITION",
    urgent: true,
    description:
      "Send us your strangest photographs taken on campus or around Assam. Phone cameras, disposable film, DSLR, and pinhole cameras all accepted. Curated for the Semester Print Zine.",
    badge: "ALL GCU STUDENTS",
    stamp: "CURATED ZINE NO. 04",
  },
  {
    id: "not-04",
    code: "TRANS-051",
    title: "Brahmaputra Fog & River Island Expedition",
    date: "NOVEMBER 22 · 05:00 AM",
    venue: "Ghat Assembly · Saraighat Ridge",
    category: "FIELD TRIP",
    urgent: false,
    description:
      "Dawn light over the mighty Brahmaputra river. Fishermen boats through morning mist, water reflections, and catching the sunrise before the city wakes.",
    badge: "OUTDOOR WALK",
    stamp: "FIELD EXPEDITION",
  },
];

export const weirdInterests = [
  "Street & Liminal Spaces",
  "Portraits with Staring Eyes",
  "Haunted Nature & Fog Landscapes",
  "Monochrome & High-Contrast Void",
  "8-Bit & Pixel Art Photography",
  "Analog 35mm Film Developing",
  "Campus BTS & Student Life",
  "Curious Beginner / Just Bought a Camera",
];

export const interests = weirdInterests;

