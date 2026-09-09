# Bishop Blanchet Design System

> **It's a great time to be a Bear.** — A design system for Bishop Blanchet High School: a Catholic, coeducational, college-prep school in the Green Lake neighborhood of Seattle, WA, founded in 1954.

This repo is the source of truth for visual identity at Bishop Blanchet High School (**BBHS / "Blanchet" / "the Bears"**). It contains the brand palette, type system, logo + sub-mark assets, copy guidelines, and ready-to-use UI components for building school communications, marketing, slide decks, athletic graphics, and digital experiences.

---

## Sources used to build this system

| Source | Status |
|---|---|
| `uploads/brandpad.io_bbhs_.png` | Official BBHS Brand Guidelines page exported from Brandpad. Used for colors, type, logo construction, sub-marks list, voice cues. |
| <https://www.bishopblanchet.org/> | Public school site — used for tone, copy patterns, taglines. |
| <https://www.bishopblanchet.org/about> | About page — used for the school story / voice. |
| <https://en.wikipedia.org/wiki/Bishop_Blanchet_High_School> | History / context — founding date, namesake, traditions. |
| <https://www.metroleague-bishopblanchet.org/> | Athletics site — voice for Bears Athletics. |

> ⚠️ Brandpad screenshot was rendered at a narrow viewport; HEX/RGB/CMYK/PMS values per color were cut off in the export. **All color hex codes in this system are sampled visually from the screenshot and verified against the bear-mark artwork.** If the BBHS communications office can share the official Brandpad CSV / color spec PDFs, swap the values in `colors_and_type.css`.

---

## The brand at a glance

- **Name:** Bishop Blanchet High School
- **Short:** BBHS / Blanchet
- **Mascot:** Bears
- **Founded:** 1954, by the Archdiocese of Seattle; named for **Bishop Augustin Magloire Alexandre Blanchet (1797–1887)**, first bishop of the Diocese of Nesqually
- **Location:** 8200 Wallingford Ave N, Seattle, WA 98103 — Green Lake neighborhood
- **Three pillars:** **Faith · Scholarship · Service**
- **Athletics affiliation:** Metro League — 198+ Metro titles
- **Student paper:** *The Miter*
- **Tagline / refrain:** *"It's a great time to be a Bear."* / *"Go Bears!"*

---

## CONTENT FUNDAMENTALS — Voice & tone

### Voice
Warm, proud, community-first, and grounded in faith. The school refers to itself as a **family** and a **community** more often than as an "institution." Copy is written in the **first-person plural** when the school is speaking ("we believe", "our community", "our Bears") and the **second person** when addressing prospective families ("you'll find", "your student"). Avoid the corporate "they."

It is unapologetically Catholic — faith is foregrounded, not hidden — but the voice is never preachy. Service, scholarship, and joy carry equal weight.

### Tone register
**Confident, never cocky. Warm, never saccharine. Catholic, never cloistered.** Athletic copy can get loud and short ("**Go Bears.**"). Academic copy stays measured and editorial. Marketing/admissions copy sits in the middle — warm, declarative, with an occasional flourish ("the heart of the Pacific Northwest").

### Casing
- **Display headlines:** Title Case or ALL CAPS in the athletic voice
- **Body copy:** Sentence case
- **"Bear" / "Bears" / "Blanchet"** are always capitalized when referring to the community
- **The three pillars** — **Faith, Scholarship and Service** — are always capitalized and almost always appear in that order (oxford comma optional but preferred internally)
- **Bishop Blanchet** is always spelled out on first reference; **BBHS** or **Blanchet** thereafter

### What we say (real examples lifted from the school's own copy)
- *"It's a great time to be a Bear!"*
- *"Go Bears!"*
- *"Educating the whole student to be prepared for college, and life, with a focus on Faith, Scholarship and Service."*
- *"The most complete Catholic high school experience in the city."*
- *"Established in 1954, Bishop Blanchet was the first Catholic co-ed high school in the Archdiocese of Seattle."*
- *"At Bishop Blanchet, the emphasis on teamwork extends beyond the sport itself."*

### What we don't do
- **No emoji** in official communications. The bear iconography and spirit marks do the emoji work.
- **No exclamation-point spam.** One per paragraph at most; the brand earns them.
- **No jargon or ed-speak** ("learner-centered ecosystem", "21st-century skills"). Plain, warm English.
- **No "Click here."** Action-led links: *"See our academics," "Apply today," "Visit campus."*
- **No abbreviations of religious terms.** Write *Mass*, *Catholic*, *Archdiocese* in full.
- **Avoid emoji-style hyperbole** ("amazing!!!"). Let the work and the community speak.

### Vibe
A school that takes its work seriously and itself lightly. Tradition without stuffiness. Faith without performance. The athletic side runs hot; the academic side runs steady; the spiritual side runs deep.

---

## VISUAL FOUNDATIONS

### Color
The official BBHS palette is split into **Primary**, **Secondary**, and **Tertiary** tiers:

| Tier | Token | Name | HEX | PMS | RGB | CMYK |
|---|---|---|---|---|---|---|
| Primary | `--bb-yellow` | Yellow | `#FECC07` | 109 | 254 207 7 | 0 19 100 0 |
| Primary | `--bb-kelly` | Kelly | `#079B49` | 347 | 7 155 73 | 85 13 100 0 |
| Secondary | `--bb-forest` | Forest | `#00742B` | 356 | 0 116 43 | 89 29 100 19 |
| Secondary | `--bb-hunter` | Hunter | `#004939` | 7484 | 0 73 57 | 90 45 76 47 |
| Tertiary | `--bb-black` | Black | `#000000` | Black 6 | 0 0 0 | 0 0 0 100 |
| Tertiary | `--bb-gray` | Gray | `#969696` | Cool Gray 7 | 150 150 150 | 0 0 0 50 |
| Tertiary | `--bb-white` | White | `#FFFFFF` | — | 255 255 255 | 0 0 0 0 |
| Tertiary | `--bb-neon` | Neon | `#C8FF32` | 389 | 200 255 0 | 26 0 100 0 |
| Tertiary | `--bb-gold` | Gold | `~#C8A35B` | 7752 / Foil | — | — |

**Usage shape.** Yellow + Kelly are the loud primary brand colors. Forest and Hunter are workhorse green surfaces. Black, Gray and White carry the type system. **Neon** is reserved for the outline-stroke logo variant and high-spirit athletic graphics. **Gold** is a foil treatment for print only — the listed hex is a screen approximation.

Yellow is never a body-text background and is never paired with Kelly for type (poor contrast). For surfaces darker than Hunter, jump to Black.

**Extended neutrals** (`--bb-paper #FAF8F2`, `--bb-bone #EFEBDF`, `--bb-stone #D2D0C7`) are NOT part of the official spec. They are warm off-whites added for digital surface variety. Replace with `#FFFFFF` if strict adherence is required.

### Type
The school's brand sheet specifies a three-face system:
- **Leviathan** — heavy soft-cornered slab serif. Used for **main headings** including the words "Bear" / "Bears" and editorial display. Conveys tradition, weight, Catholic gravitas.
- **Redzone Classic** — athletic block sans. Used for **subheadings** including the "Bishop Blanchet" lockup, eyebrows, chapter numbers, sport call-outs, and button labels. *Redline Classic* is an acceptable alternate per the school.
- **Trade Gothic** or **Roboto** — body text. Bold weights are OK as needed.

> ⚠️ **Font substitution flag.** Leviathan and Redzone Classic are commercial. Until the licensed files are dropped into `fonts/`, the system substitutes Google Fonts **Ultra** (for Leviathan) and **Big Shoulders Display** (for Redzone Classic). These are good visual cousins but **not identical**. **Roboto is on Google Fonts and is loaded directly — no substitution needed for body.** Please drop the licensed display/athletic `.woff2`/`.otf` files into `fonts/` and swap the `@import` for `@font-face` in `colors_and_type.css`.

### Spacing & layout
- 4-pt base spacing scale (`--sp-1` … `--sp-10`).
- **Generous vertical rhythm.** Section titles get serious airspace above (96–128 px on hero pages); body blocks sit on a 24-px rhythm.
- **One-column on mobile, two-column editorial on desktop.** Brandpad's layout uses a left-aligned text column with the supporting visual locked to the right edge of the column — copy this pattern.
- **Hard-edged blocks of solid color** are a primary layout device (see the green "Introduction" block, the yellow logo-color examples). Lean into rectangles, avoid feathered or blurred backgrounds.
- **Numeric chapter markers** (`01`, `02`, `03`) in Redzone are used to break the document into "chapters."

### Backgrounds
- **Solid colors first.** Kelly, Forest, Hunter, Spruce, Yellow, Paper, White. Treat each as a deliberate flag.
- **Full-bleed photography** for hero shots — campus, students, athletics, Mass, performing arts. Photographs trend warm and natural (not graded blue/cool), with healthy grain and a Pacific-Northwest light quality (overcast, soft, golden when sunny).
- **No gradients** for major surfaces. The brand is flat.
- **No drop-shadows under images.** Use a tight green/spruce rule or a subtle outline if separation is needed.
- **No hand-drawn illustration** as primary art. The bear marks and sub-marks are the brand illustration.
- **Texture is allowed sparingly:** halftone overlays on athletic graphics, paper grain on print pieces. Never glossy.

### Animation
- **Quiet by default.** This is a school, not a tech startup. Use 200–250 ms ease-out transitions for hover/press; nothing bouncy.
- **No parallax.** No long scroll-jacked reveals.
- **Allowed:** fade-in (180 ms), 4-px lift on card hover (250 ms), 2 % shrink on button press (120 ms).

### Hover, press, focus
- **Hover** — links underline (or thicken the underline they already have); buttons darken one step (e.g. Kelly → Forest). Cards lift 4 px and gain `--shadow-2`.
- **Press** — buttons shrink to `scale(0.98)` and darken one further step.
- **Focus** — 2 px outline in **Yellow** with 2 px offset. Always visible; never `outline: none` without replacement. This is the most important accessibility detail in the system.

### Borders, rules, shadows
- **Rules are 2 px** in Kelly or Spruce, full-bleed across the column. This is the brand's most recognizable structural device after the bear mark.
- **Borders on cards:** 1 px `rgba(15,36,34,0.12)` (`--border-1`).
- **Shadows:** three levels (`--shadow-1/2/3`). Soft, low-contrast, dark-green tinted (not pure black). Most cards use no shadow at all — preferred technique is a hairline border.
- **Inner shadows:** not used. The brand is flat.

### Transparency & blur
- **Used sparingly.** Acceptable use: a 24-px backdrop blur on a fixed top nav when content scrolls under it, or a 60 % white/spruce overlay to dim photography behind a headline.
- **Never** a frosted-glass card on a busy background. Solid surfaces only.

### Corner radii
- **Square is the default.** Logo lockups, photo blocks, and major page surfaces are square.
- **`--radius-1` (4 px)** for buttons and form fields.
- **`--radius-2` (8 px)** for cards.
- **`--radius-pill`** for badges and tags only.

### Cards
A typical card is: white surface, 1 px hairline border, `--radius-2`, no shadow until hovered. On hover, it lifts and gains `--shadow-2`. Featured cards (e.g. an event hero) can use a Spruce background with Yellow eyebrow + Ultra headline + white body — these are the brand's prestige cards.

### Imagery
- **Warm, naturalistic.** Soft daylight, real students, real classrooms, real Mass, real fields. Saturated greens (Pacific Northwest), warm skin tones.
- **No stock photography that looks like stock.** No raised-fist gradient diversity hero shots.
- **Black-and-white is acceptable** for archival / historical pieces, Mass photography, or yearbook spreads.
- **Athletic photography** runs slightly more contrasted and saturated. Halftone treatments are allowed here only.

### Layout rules — fixed elements
- **Top nav** stays fixed on scroll, with a Spruce-tinted blur background.
- **The bear mark** appears top-left in the top nav, 32 px tall.
- **The athletic "BISHOP BLANCHET" wordmark** anchors footers and hero lockups.
- **A 2-px Kelly rule** typically lives directly under the page H1 — it's a brand fingerprint.

---

## ICONOGRAPHY

Bishop Blanchet has an unusually rich proprietary iconography centered on the **Bear**. The brand guide enumerates a full system of **Spirit Marks** (sub-marks for everyday graphic use):

| Mark | Use |
|---|---|
| **Bear Head — Stoic** | Primary mark. Calm, watchful. Default for academic & official contexts. |
| **Bear Head — Growling** | Alt primary. Tenacity, athletic energy. Default for sports & spirit. |
| **Bear — Profile / Walking / Standing / Alert** | Editorial illustrations, mascot moments. |
| **Shield (Bear Crest)** | Crest version of the head, used on uniforms and seals. |
| **Block-B** | Athletic monogram. Jerseys, helmets, hats. |
| **BB-Cross** | Catholic identity sub-mark — Block-B with a cross. Mass programs, retreat material. |
| **Bear Paw / Bear Claws** | Spirit pattern, sticker, repeating texture. |
| **Pennant / Compass / Roundels / Badges** | Editorial spot illustrations. |

### Logo color rules (from the guide)
1. Always use a **positive** version (dark head, light muzzle). Inverse reads "like a film negative."
2. The full-color mark uses **Hunter Green + Forest Green + Yellow**.
3. On problematic backgrounds, use the **outline-stroke variant** — Yellow, Neon, or Forest stroke around the mark.
4. For 1-color reproduction, use **Kelly, Forest, Hunter, Spruce, or Black** — never Yellow alone.
5. Maintain **clearspace equal to half the height of the mark** on all sides.

### What we have in `assets/` so far
- `bear-stoic-shield.png` — Primary stoic bear inside the shield ground (cropped from the guidelines)
- `bear-stoic-on-green.png` / `bear-stoic-on-yellow.png` — Approved color-pair examples
- `bear-outline-on-green.png` / `bear-outline-on-yellow.png` — Yellow-stroke variants
- `bear-onecolor.png` — 1-color (Hunter) version on white

> ⚠️ **Iconography flag.** Brandpad screenshots are raster crops, not the original vector marks. The Bears communications office should drop the **vector master files** (`.svg`, `.ai`, `.eps`) into `assets/marks/` and the **growling, walking, standing, and alert bears**, plus the **Block-B**, **BB-Cross**, **Bear Paw**, **Pennant**, **Compass**, **Roundels**, and **Badges** into `assets/spirit-marks/`. The current set covers ~25 % of the documented system.

### UI iconography (separate from spirit marks)
For non-brand UI affordances (menu, search, chevrons, calendar, etc.), the system uses **[Lucide](https://lucide.dev/)** at **1.75 px stroke** in `--bb-spruce`. Lucide is loaded from CDN in the UI kit. This is a **substitution** for whatever the school's web shop is using today — please confirm.

### Emoji & unicode
- **Emoji: not used** in brand communications.
- **Unicode symbols** are acceptable for in-line marks: em-dashes (`—`), bullets (`•`), section marks (`§`), and the registered/copyright marks where legally required. Always use real Unicode characters, not ASCII substitutes (`—` not `--`; `…` not `...`).

---

## Repository index

```
/
├── README.md                       ← you are here
├── SKILL.md                        ← agent-skill manifest
├── colors_and_type.css             ← color + type tokens, semantic classes
├── assets/                         ← bear marks, sub-marks, logos
│   ├── bear-stoic-shield.png
│   ├── bear-stoic-on-green.png
│   ├── bear-stoic-on-yellow.png
│   ├── bear-outline-on-green.png
│   ├── bear-outline-on-yellow.png
│   ├── bear-onecolor.png
│   └── bear-shield-clean.png
├── preview/                        ← design-system tab cards (Type, Colors, …)
│   ├── type-display.html
│   ├── type-athletic.html
│   ├── …
└── ui_kits/
    └── marketing-site/             ← BBHS marketing-site UI kit
        ├── README.md
        ├── index.html
        ├── Hero.jsx
        ├── PillarsBlock.jsx
        ├── EventCard.jsx
        └── …
```

Open `preview/*.html` files individually for swatch-level previews, or visit the **Design System tab** in this project to see them as a board.

---

## Caveats & known gaps

1. **Color hex codes are now verified** against the school's official color spec sheet (Primary / Secondary / Tertiary tiers with PMS, RGB, CMYK values). The Gold value is a screen approximation of the print-only foil.
2. **Fonts are partially substituted.** Body is **Roboto** (confirmed by the school, loaded directly from Google Fonts). Display **Leviathan → Ultra** and athletic **Redzone Classic → Big Shoulders Display** are still substitutes. Drop the licensed Leviathan + Redzone Classic files into `fonts/` and update the `@import` / `@font-face` block in `colors_and_type.css`.
3. **Most spirit marks are missing.** We have the bear-head/shield variants. The Block-B, BB-Cross, paw, claw, pennant, compass, roundels, badges, and walking/standing/alert/profile bears all need vector originals.
4. **No photography** has been included. We need a small library of campus, classroom, athletic, Mass, and student-life photography to make the UI kit feel complete.
5. **The Bishop Blanchet wordmark (athletic block)** is not yet vectorized in this repo — only the bear-head marks. The Logotype section of the guide includes BISHOP BLANCHET / BLANCHET BEARS / BEARS in horizontal and arched configurations; we need the source files.
