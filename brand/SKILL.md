---
name: bishop-blanchet-design
description: Use this skill to generate well-branded interfaces and assets for Bishop Blanchet High School (BBHS / "the Bears"), a Catholic, coed, college-prep high school in Seattle. Contains the BBHS color palette, typography, fonts, voice & tone guide, bear-mark assets, and UI kit components for prototyping marketing pages, slide decks, athletic graphics, admissions material, and any other branded artifact.
user-invocable: true
---

# Bishop Blanchet Design System

Read **`README.md`** first — it covers brand context, voice & tone, visual foundations, iconography rules, and known caveats (font substitutions, missing spirit marks, etc.).

Then explore:
- `colors_and_type.css` — color tokens, type tokens, semantic classes. Import this at the top of any HTML artifact.
- `assets/` — extracted bear marks (stoic primary, color variants, outline variants, 1-color).
- `preview/` — small HTML preview cards for each token group (Colors, Type, Spacing, Components, Brand).
- `ui_kits/marketing-site/` — JSX component library + `index.html` showing a full BBHS marketing-site homepage built from the system.

## How to use this skill

If creating **visual artifacts** (slides, mock-ups, throwaway prototypes, social graphics, athletic call-outs, admissions pages, etc.):
1. Copy `colors_and_type.css` and the bear-mark PNGs from `assets/` into your output folder.
2. Link the stylesheet from your HTML.
3. Compose with the tokens (`--bb-kelly`, `--bb-spruce`, `--bb-yellow`, `var(--font-display)`, `var(--font-athletic)`, etc.) and the semantic classes (`.bb-display`, `.bb-athletic`, `.bb-eyebrow`).
4. For larger pages, lift the JSX components from `ui_kits/marketing-site/` — `TopNav`, `Hero`, `PillarsBlock`, `AthleticsStrip`, `NewsGrid`, `VisitCTA`, `SiteFooter`.

If working on **production code**: read `colors_and_type.css` as the source of truth for tokens; copy the bear marks; honor the voice rules in `README.md`'s **CONTENT FUNDAMENTALS** section.

## If invoked without other guidance

Ask the user what they want to build (admissions one-pager? game-day social graphic? Mass program? annual report spread?), ask a few clarifying questions (audience, format, length, photography availability), then act as an expert designer and output an HTML artifact or production-shaped code.

## Non-negotiables

- **Three pillars** appear in this order: **Faith · Scholarship · Service.**
- **Yellow is never** a body-text background or paired with Kelly for text.
- **No emoji** in official communications.
- **Focus rings** are always visible — 2 px Yellow outline with 2 px offset.
- The school is **"Bishop Blanchet"** on first mention; **BBHS / Blanchet / the Bears** thereafter.
- It's a great time to be a Bear.
