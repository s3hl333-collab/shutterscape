# SHUTTERSPACE — THE ART OF SEEING
### The Photography Club of Girijananda Choudhury University (GCU)
**Instagram:** [@shutterscapegcu](https://www.instagram.com/shutterscapegcu/)

---

> *"We don't just capture moments. We give them a place to live."*

**Shutterspace** is a cinematic, award-worthy digital art exhibition built for the photography collective of Girijananda Choudhury University (GCU), Assam. Designed with the visual poise of an avant-garde editorial magazine, independent cinema darkroom aesthetics, and museum exhibition catalogs.

---

## ✨ Features & Art Direction

1. **Cinematic Hero**:
   - Oversized typography layered behind and across photographs.
   - Live camera viewfinder HUD with real-time timecode (Assam / IST), optical focus brackets, exposure meter, and GCU coordinates (`26.1158° N, 91.5647° E`).
   - Direct CTA to explore the archive and official Instagram link.

2. **The Archive (Curated Collections)**:
   - 6 photographic collections:
     - **STREETS** — Urban life, candid moments, and everyday chaos.
     - **PORTRAITS** — Expressions, personalities, and human stories.
     - **NATURE** — Landscapes, monsoon rain, skies, and the natural world.
     - **MONOCHROME** — Contrast, shadows, geometry, and silver-gelatin tones.
     - **CAMPUS CHRONICLES** — Life, events, friendships, and memories at GCU.
     - **ABSTRACT / EXPERIMENTAL** — Reflections, motion, and unconventional perspectives.
   - Interactive layout switcher: **Masonry Wall** vs **35mm Contact Sheet**.
   - Hover reveals with photographic plate details and technical camera specs.

3. **Exhibition Lightbox**:
   - Full-screen high-fidelity viewing experience.
   - **EXIF Inspector**: Displays camera body, lens, focal length, aperture, shutter speed, ISO, and location.
   - **Loupe Zoom (2×)**: Press `Z` or click the Loupe button to inspect fine textures and focus.
   - **Filmstrip Thumbnail Drawer**: Instant visual jump to any frame in the collection.
   - Accessible keyboard controls (`ArrowLeft`, `ArrowRight`, `Esc`, `Z`, `I`).
   - Mobile touch swipe navigation.

4. **35mm Analog Strip ("Unhurried Light")**:
   - Authentic negative roll design with realistic perforated sprocket holes and Kodak / Ilford edge stencils (`KODAK TRI-X 400 · PANCHROMATIC SAFETY FILM`).
   - Horizontal scroll and drag progression with frame counter indicators (`01A`, `02A`...).

5. **Editorial Philosophy ("Why We See")**:
   - Magazine spread aesthetic on warm ivory paper with drop-caps, delicate borders, and museum-grade typography.

6. **Living Community ("Beyond the Lens")**:
   - 6 immersive culture pillars:
     1. Photo Walks & Campus Expeditions
     2. Workshops, Darkroom Lab & Editing Critiques
     3. Campus Events & Behind the Scenes
     4. Creative Challenges & Themed Contests
     5. Member Spotlights & Artist Stories
     6. Annual Print Exhibition & Archival Zine

7. **Featured Stories ("Frames That Stay")**:
   - Three photo essays: *"The City After Rain"*, *"Between Classes"*, and *"A Sky We Almost Missed"*.
   - Alternating editorial layouts (full-bleed panoramic, vertical diptych, asymmetrical letterbox).

8. **The Collective ("The People Behind the Lens")**:
   - Leadership, Core Team, and Contributing Photographers.
   - Contact-sheet crop markings, role tags, and equipment notes.
   - Clear sample placeholder indications for student onboarding.

9. **Join the Collective & Inquiry Form**:
   - High-impact headline: **YOUR EYES. YOUR STORIES. YOUR SPACE.**
   - Prominent Instagram CTA linking directly to [@shutterscapegcu](https://www.instagram.com/shutterscapegcu/).
   - Validated inquiry form with honest endpoint handling and zero fake success states.

10. **Sensory & Interactive Atmosphere**:
    - **Native Web Audio Shutter Sound**: Optional realistic mechanical shutter click synthesized via Web Audio API (zero audio file downloads, pure audio synthesis, muted by default).
    - **Darkroom Red Safelight Mode**: Switches site to ruby/amber photographic darkroom ambiance.
    - **3×3 Rule-of-Thirds Grid**: Toggleable viewfinder composition lines.
    - **Custom Focus Reticle Cursor**: Desktop-only tactile focus ring with state transformations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Instrument Serif, Hanken Grotesk, IBM Plex Mono

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js 18+ (tested on Node.js v26.8.1)
- npm or pnpm

### 2. Installation
```bash
cd shutterspace
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📂 Content Customization Guide

All website data is completely decoupled into clean, typed TypeScript files in `src/data/`:

### 1. Adding Photographs to the Archive
Open `src/data/photos.ts`:
```typescript
{
  id: "st-06",
  src: "unsplash-photo-id-or-empty",
  url: "https://your-domain.com/photo.jpg", // Optional custom URL
  title: "Evening Chai Stall",
  category: "streets", // "streets" | "portraits" | "nature" | "monochrome" | "campus" | "abstract"
  ratio: 1.5, // width / height ratio (e.g. 1.5 for 3:2, 0.8 for 4:5, 1 for 1:1)
  alt: "A man pouring steaming milk tea at dusk",
  photographer: "Your Name · GCU '25",
  camera: "Fujifilm X-T5",
  lens: "35mm f/1.4",
  focal: "35mm",
  aperture: "ƒ/1.4",
  shutter: "1/250s",
  iso: "ISO 800",
  location: "Azara Market, Guwahati",
  year: "2024"
}
```

### 2. Updating Club Members & Leadership
Open `src/data/content.ts` and edit the `members` array:
```typescript
{
  id: "m1",
  group: "Leadership", // "Leadership" | "Core team" | "Photographers"
  name: "Your Name",
  role: "President",
  bio: "A sentence or two about your photography perspective and what you shoot.",
  gear: "Sony A7 IV · 35mm f/1.4 GM",
  focusArea: "Street & Candid",
  portrait: "https://your-domain.com/portrait.jpg", // Optional portrait image URL
  ratio: 0.75,
  placeholder: false // set to false once filled with real member information!
}
```

### 3. Connecting the Inquiry Form
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your_form_id
```
If this endpoint is left empty, the form automatically offers visitors a 1-click pre-filled link to message [@shutterscapegcu](https://www.instagram.com/shutterscapegcu/) on Instagram.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push this project to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Set `NEXT_PUBLIC_FORM_ENDPOINT` (optional) in Environment Variables.
4. Click **Deploy**.

---

© Girijananda Choudhury University (GCU) Photography Club · Shutterspace  
*Made of light, time, and perspective.*
