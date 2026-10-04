---
name: SLA — Arise Emberfall
description: The System Window — a cold violet HUD codex for Solo Leveling: ARISE hunters, builds and team guides.
colors:
  mana: "#6137ff"
  mana-dim: "#4400d9"
  mana-bright: "#c9bfff"
  mana-deep: "#2e009c"
  mana-soft: "#e3dcff"
  spectral: "#c3c3ee"
  spectral-dim: "#928ea3"
  danger: "#ffb4ab"
  danger-bg: "#93000a"
  mana-wash: "rgba(97, 55, 255, 0.12)"
  success: "#3a8a4a"
  void: "#000000"
  base: "#131313"
  surface: "#161616"
  container: "#1c1b1b"
  container-2: "#201f1f"
  container-3: "#2a2a2a"
  elevated: "#353534"
  sidenav-ink: "#0d0d1a"
  void-violet: "#1a0f3a"
  void-violet-deep: "#24104d"
  text-primary: "#ffffff"
  text-on-surface: "#e5e2e1"
  text-secondary: "#c9c3da"
  text-muted: "#928ea3"
  text-dim: "#484456"
  border: "#353534"
  border-bright: "#484456"
  elem-dark: "#8b5cf6"
  elem-fire: "#ef4444"
  elem-water: "#3b82f6"
  elem-light: "#facc15"
  elem-wind: "#10b981"
  weak: "#34d399"
  resist: "#f87171"
  rarity-ssr: "#f59e0b"
  rarity-sr: "#a855f7"
  rarity-r: "#3b82f6"
typography:
  display:
    fontFamily: "Orbitron, monospace"
    fontSize: "clamp(52px, 8vw, 96px)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Orbitron, monospace"
    fontSize: "clamp(24px, 3vw, 36px)"
    fontWeight: 700
    letterSpacing: "0.05em"
  title:
    fontFamily: "Orbitron, monospace"
    fontSize: "20px"
    fontWeight: 700
    letterSpacing: "0.05em"
  readout:
    fontFamily: "Orbitron, monospace"
    fontSize: "14px"
    fontWeight: 700
    letterSpacing: "0.05em"
  button:
    fontFamily: "Orbitron, monospace"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.2em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Orbitron, monospace"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: "0.2em"
rounded:
  none: "0px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "24": "96px"
components:
  button-primary:
    backgroundColor: "{colors.mana}"
    textColor: "{colors.text-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.mana-bright}"
    textColor: "{colors.void}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mana-bright}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "14px 32px"
  button-ghost-hover:
    backgroundColor: "rgba(97, 55, 255, 0.08)"
    textColor: "{colors.mana-bright}"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "20px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.mana-bright}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
  element-badge:
    backgroundColor: "rgba(0, 0, 0, 0.3)"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "3px 10px"
  readout:
    backgroundColor: "rgba(0, 0, 0, 0.7)"
    textColor: "{colors.text-primary}"
    typography: "{typography.readout}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  nav:
    backgroundColor: "rgba(0, 0, 0, 0.7)"
    textColor: "{colors.text-secondary}"
    padding: "12px 24px"
  nav-link-active:
    backgroundColor: "rgba(97, 55, 255, 0.08)"
    textColor: "{colors.mana-bright}"
    padding: "6px 12px"
---

# Design System: SLA — Arise Emberfall

## Overview

**Creative North Star: "The System Window"**

SLA is the System interface a hunter sees in-world: floating panels of cold violet light hung over absolute black. Each screen is a System window, with an angular frame, a tagged header (`// SECTION 01`), mono readouts, and a single violet energy that lights up whatever is live, selected or new. The site does not decorate around the game's art. It frames that art the way the System frames a quest.

Density is high and disciplined. Hunter grids, team slots, stat bars and set bonuses sit close together. Orbitron in uppercase with wide tracking carries every label, tag and number, so the UI reads as instrumentation. Inter carries only the prose players actually read: passives, advancements, descriptions. The surfaces are flat. Depth comes from light, not lift.

The palette moved from ember orange to violet (v3.0.0). Violet is now the only accent. The `--sla-ember-*` token names survive as aliases for mana, and any warm orange left in the code is drift, not intent.

**Key Characteristics:**
- Absolute-black canvas (`void`) with near-black tonal panels; no light theme.
- One accent: mana violet. Element and rarity hues are game-coded data colors, not brand accents.
- Zero radius everywhere; angularity comes from clip-path corner cuts and HUD corner brackets.
- Orbitron, uppercase and widely tracked, for all chrome; Inter for reading.
- Flat surfaces, violet glow as the only depth signal; scanlines and a sweep line as ambient System texture.

## Colors

A void-black interface lit by one electric violet, with game-coded element and rarity hues used strictly as data.

### Primary
- **Mana Violet** (`mana`): the System's energy as light and fill. Primary button fills, the status dot, the ticker label block, progress fill, HUD corner brackets, active-nav edges, glows and text selection: every "this is live / selected / new" signal that is a surface, border or glow. Exposed as `--sla-mana` and its legacy alias `--sla-ember`.
- **Mana Dim** (`mana-dim`): borders of ghost buttons and tags, scrollbar thumb, progress gradient start, readout accent border.
- **Mana Bright** (`mana-bright`): violet as text. Tags, links, active and hovered nav, ghost button labels, `// ARISE` logo accent, back links, hunter titles, passive names, and the primary button's hover fill (with black text).
- **Mana Soft** (`mana-soft`): hover state of mana-bright text (links, back links).
- **Mana Deep** (`mana-deep`): rarely used dark end of the ramp, for gradients.

### Secondary
- **Spectral Lavender** (`spectral`, `spectral-dim`): a cool, desaturated companion to mana, for secondary informational tone. Never a competing accent.

### Neutral
- **Void** (`void`): page background, image fades, the space between windows.
- **Base / Surface** (`base`, `surface`): panel gradient stops (`surface` → `base` at 95% opacity).
- **Container tiers** (`container`, `container-2`, `container-3`): inset blocks inside panels (advancement rows, weapon chips).
- **Elevated** (`elevated`): dropdown menus and pickers.
- **Sidenav Ink** (`sidenav-ink`): the faintly violet-tinted black of the desktop sidebar.
- **Void Violet** (`void-violet`, `void-violet-deep`): violet-black gradient stops for atmospheric fills only (New Hunter spotlight card, home feature-card fallbacks when an image fails), always paired with `sidenav-ink` or `void`.
- **Text ramp:** `text-primary` for names and headings, `text-secondary` for body copy, `text-muted` for labels, field captions, pending badges, supporting info and inactive nav, `text-dim` only for non-text dividers and disabled chrome (it is 2:1 on black and never carries readable text).
- **Borders:** `border` for dividers and inset rows, `border-bright` for panel frames and the nav underline.

### Data hues (game-coded, not brand)
- **Elements:** `elem-dark`, `elem-fire`, `elem-water`, `elem-light`, `elem-wind`. Used for element badges, element accent bars and 10% top-gradient tints on hunter cards. They mirror the game's color code and must stay recognizable.
- **Rarity:** `rarity-ssr` (amber), `rarity-sr` (purple), `rarity-r` (blue) for rarity badges only.
- **States:** `danger` / `danger-bg` for critical, `success` for success badges. Weakness and resistance banners use green and red tints to match in-game meaning.
- **Weakness / resistance:** `weak` (#34d399) and `resist` (#f87171) as text, borders, dots and icon glows, with 8% tints `weak-bg` / `resist-bg` for banner fills. Always paired with a text label ("Faiblesses", "Résistances", "★ recommandé", "✗ résistance"). Exposed to Tailwind as `text-weak`, `border-resist/50`, etc. The same pair encodes direction elsewhere (build score good / poor, advancement effect increase / decrease), always with a glyph or a number beside it (↑ ↓ ~, 12/12), never color alone.
- **Mana wash:** `mana-wash` (12% mana, `bg-bg-wash`) fills selected options, active chips and "other" effect rows; text on it is `mana-bright`. Open or active slot borders use `mana`; resting slot borders use `border` and hover `mana-dim`.

### Named Rules
**The One Light Rule.** Mana violet is the only accent. Warm orange (`rgba(194, 94, 28, …)`, `rgba(255, 74, 28, …)`) is legacy ember drift. Replace it with mana when touched, and never introduce it in new work.

**The Data Not Decor Rule.** Element and rarity hues appear only where they encode game data: an element, a rarity, a weakness. Never use them as decorative color.

**The Bright Text Rule.** Violet text is always `mana-bright` (12:1 on void); `mana` itself (3.5:1) is reserved for fills, borders and glows. The only exception is the large flickering display word (`sla-text-ember`). Readable text never goes below `text-muted` (5.7:1 on surface).

## Typography

**Display Font:** Orbitron (with monospace fallback)
**Body Font:** Inter (with sans-serif fallback)
**Label/Mono Font:** Orbitron (`--sla-font-mono` and `--sla-font-hud` both resolve to Orbitron)

**Character:** Orbitron, uppercase and tracked from 0.05em to 0.4em, makes every label read like System instrumentation. Inter carries the human-readable layer underneath, quiet and legible.

### Hierarchy
- **Display** (900, `clamp(52px, 8vw, 96px)`, 0.9, balanced): hero titles only ("ARISE / EMBERFALL"), usually with violet text glow and a flickering mana span.
- **Headline** (700, `clamp(24px, 3vw, 36px)`, uppercase, 0.05em, balanced): section titles inside a section header.
- **Title** (700, 20–28px, uppercase): hunter names, feature card titles, dossier headings.
- **Readout** (700, 14px, uppercase, tabular numerals): data values: total power, stat numbers, readout values, the nav clock.
- **Body** (400, 16px, 1.6): descriptions and hero subcopy, capped at 65–70ch; 14px for passives, advancements and compact descriptions (never line-clamped); 12px (`text-meta`) for dense card copy.
- **Label** (400, 10px, uppercase, 0.2em): every `// TAG`, field label, badge and nav caption (`text-label` in Tailwind). 10px is the floor; nothing renders smaller.

Fonts load from Google Fonts via `<link>` with preconnect in `index.html` (Orbitron 400/700/900, Inter 400/500/600/700, `display=swap`). Orbitron is only ever set at 400, 700 or 900.

### Named Rules
**The Instrument Voice Rule.** Chrome (labels, tags, badges, buttons, nav, numbers) is always Orbitron, uppercase and tracked. Text a player reads for meaning (passives, advancements, descriptions) is always Inter in sentence case. Never mix the two roles.

**The Double-Slash Rule.** Section and panel captions are prefixed with `//` (`// SECTION 02`, `// Base Stats`, `// LIVE FEED`). It is the System's comment syntax and marks the start of every window.

## Layout

- **Container:** max-width 1280px, centered; horizontal padding 16px on mobile, 24px from 768px.
- **App shell:** sticky top nav (blurred black, bright-border underline). From 768px, a fixed 160px sidebar sits under it (sticky at `top: 52px`) with a 1px mana right border. Below 768px the sidebar is hidden and a 56px fixed bottom tab bar (safe-area aware) takes over; content pads its bottom to clear it.
- **Breakpoints:** 768px is the primary mobile/desktop switch (nav, sidebar / bottom tab bar, container padding, home grid 1 → 3 columns, hunter card image width 100 → 140px, section spacing 32 → 64px, slot pickers). Secondary content breakpoints: 480px (new-hunter spotlight), 640px (Compare stacking, Tailwind `sm` grids) and 1024px (dossier 3-column, build grid 2 + 1, Jinwoo panel side by side).
- **Grids:** hunter lists use `repeat(auto-fill, minmax(min(360px, 100%), 1fr))`; every auto-fill/auto-fit grid wraps its minimum in `min(Npx, 100%)` so narrow phones never scroll sideways. Team slots use 1 → 2 → 3 columns. The hunter dossier goes 1 → 2 → 3 columns (768px / 1024px): single column on phones (image portrait capped at 360px), image beside stats and profile with advancements full width at 768px, then the three-column grid with the image spanning two rows from 1024px. The build grid (equipment, cores) is a single column below 1024px, then 2 + 1.
- **Touch:** hover lift (translate and glow on buttons and clickable panels) only applies on hover-capable pointers; color changes stay everywhere. Tab-like buttons carry `sla-tap`, which raises them to 44px tall on coarse pointers.
- **Rhythm:** 4px base scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96). Panels pad 20px; sections are separated by 40–48px; section headers sit 32px above content.
- **Density:** tight and information-rich. Gaps inside grids are 12–16px.

## Elevation & Depth

The system is flat. Panels never lift with drop shadows. Depth is light: a violet glow appears when something is interactive, active or new, and the page carries an ambient System texture. That texture is a fixed 2px scanline overlay at 2.5% mana, plus a slow 8s violet sweep line moving down the viewport. Layering inside a panel is tonal (`container` tiers over `surface`), not shadowed.

### Shadow Vocabulary
- **Glow SM** (`box-shadow: 0 0 10px rgba(97, 55, 255, 0.35)`): small accents.
- **Glow MD** (`box-shadow: 0 0 15px rgba(97, 55, 255, 0.4), 0 0 30px rgba(97, 55, 255, 0.2)`): hover on clickable panels and ghost buttons.
- **Glow LG** (`box-shadow: 0 0 25px rgba(97, 55, 255, 0.5), 0 0 60px rgba(97, 55, 255, 0.25)`): hover on primary buttons; new-hunter emphasis.
- **Text glow** (`text-shadow: 0 0 18px rgba(97, 55, 255, 0.6), 0 0 40px rgba(97, 55, 255, 0.3)`): hero and section titles marked `sla-text-glow`.

### Named Rules
**The Light Not Lift Rule.** Surfaces are flat at rest. Interaction is shown by glow plus a 1–2px upward nudge, never by a gray drop shadow.

## Shapes

Hard edges only. A global reset forces `border-radius: 0` on everything inside the app, including Tailwind `rounded-*` utilities. Angularity comes from clip-path corner cuts: panels cut the top-right and bottom-left corners by 16px, buttons by 10px, code blocks by 6px. Tags, badges and rarity chips cut only the top-right corner (4–6px), like a filing tab. The ticker label ends in an arrow chevron. The signature silhouette is the HUD frame: four 12px mana corner brackets (2px stroke) on hero-level panels. Borders are 1px; accent borders are 3px (readout left edge, active nav left edge, element bars).

### Named Rules
**The Cut Corner Rule.** Never round a corner. If a shape needs softening or distinction, cut it with a clip-path diagonal instead.

## Components

### Buttons
Decisive, angular, lit from within.
- **Shape:** top-right and bottom-left corners cut 10px; no radius.
- **Primary:** mana fill, white Orbitron 12px/700 uppercase at 0.2em, padding 14px 32px.
- **Hover:** fill brightens to mana-bright and text flips to black, Glow LG, lifts 1px; 200ms transition.
- **Ghost:** transparent with a 1px mana-dim border and mana-bright text; hover adds an 8% mana wash, mana border, Glow MD and a 1px lift.
- **ButtonLink:** the same two variants rendered as anchors.

### Tags, Badges and Chips
Filing tabs on a System window.
- **Tag:** mana-bright text, 1px mana-dim border, 10px Orbitron at 0.1em, padding 4px 12px, top-right cut 6px. Used for `// SECTION` captions, versions and ranks.
- **Status badge:** currentColor border and text. Variants: active (mana-bright), pending (text-muted), critical (danger, pulsing), success (green).
- **Element badge:** element hue as text and border on a 30% black fill. Labels are French (Ténèbres, Feu, Eau, Lumière, Vent) when unlabeled.
- **Rarity badge:** Orbitron 700, rarity hue as text and border.

### Tabs & Toggles
Every tab, chip and toggle button shares `.sla-tab`: container fill, 1px border-bright, text-secondary Orbitron, top-right cut 6px. Hover swaps the border to mana-dim and the text to primary. Selection is `aria-pressed="true"` (buttons in a toggle group, no tablist role), in two levels:
- **Primary** (`.sla-tab-primary`, the main choice on a page: element tabs, workshop sections): solid mana fill, mana border and white text (no glow: the cut-corner clip-path would hide it).
- **Secondary** (default, sub-choices: team configs, floors, blessings, build chips, mode toggles): mana border, 12% mana wash, mana-bright text.
- **Danger** (`.sla-tab-danger`, "Réinitialiser"): stays unselected; hover turns border and text danger.
- Selectable image cards (Monarch / Successor) use `.sla-select-card`: mana border and Glow SM when pressed, mana-dim border on hover.

### Cards / Containers (Panel)
The System window itself.
- **Corner Style:** 16px top-right and bottom-left cuts; optional four mana HUD corner brackets for hero blocks.
- **Background:** 135° gradient from surface to base at 95% opacity, with a faint 4% mana sheen in the top-left.
- **Border:** 1px border-bright.
- **Shadow Strategy:** none at rest; clickable panels take Glow MD and a 2px lift on hover.
- **Internal Padding:** 20px standard; 24–48px for showcase or empty-state panels.

### Readouts and Progress
- **Readout:** 70% black block, 1px border-bright, 3px mana-dim left edge; 10px text-muted label over a 14px Orbitron value with tabular numerals.
- **Progress:** 3px track in `border`, mana-dim → mana gradient fill, with a pulsing blurred mana-bright tip.

### Navigation
- **Top nav:** sticky 70% black with 8px backdrop blur and a border-bright underline. "SLA" logo in Orbitron 900 with a mana-bright `// ARISE`, version tag, Orbitron 12px links. The active link gets mana-bright text, a 3px mana left border and an 8% mana wash. On desktop a status cluster shows a pulsing square mana dot, "Online" and a live clock.
- **Sidebar (≥768px):** icon + uppercase label rows on sidenav ink; active row is mana text with a 2px mana left border.
- **Bottom tab bar (<768px):** 56px, 92% black blurred, icon over a centered 10px label (normal tracking, may wrap to two lines); the active item turns mana-bright with text glow.

### Section Header (signature)
The opening of every System window: a `// SECTION NN` tag, an uppercase Orbitron headline (optionally glowing), an optional right-aligned slot (e.g. a count badge), an optional Inter description, then a hairline gradient divider fading from border-bright to transparent. It fades in on entrance (600ms rise from 12px).

### Ticker (signature)
The live feed: a 36px band with a 5% mana wash and mana hairlines, a mana label block ending in a chevron, and uppercase mono items scrolling at a constant 40s loop.

### Slot Picker (Listbox)
Every pick-one-of-N slot (hunter, shadow, weapon, equipment set, core) uses the shared `useListbox` / `<Listbox>` primitive (`src/components/sla/Listbox.tsx`). The trigger is a single button that names the slot and its value. The popup is a `role=listbox` with "— Vide —" as the first option. The clear × is a separate 24×24 button beside the trigger, never inside it. Keyboard:
- Arrow keys wrap through the options; Home and End jump to the first and last.
- Escape and Shift+Tab return focus to the trigger.
- Clicking outside closes the popup.
Below 768px the popup becomes a bottom sheet: fixed above the 56px tab bar, full width, 60vh max, mana top border, a dim scrim around it, and 48px option rows.
New pickers reuse it; don't hand-roll another backdrop dropdown.

### Focus
A global `:focus-visible` ring: 2px mana-bright outline, 2px offset. Cut-corner elements (panels, buttons, tags, badges) use a -3px inset offset so the clip-path doesn't hide the ring. A "Aller au contenu" skip link (mana fill, white text) appears top-left on first Tab.

### Inputs / Fields
Search fields and selects share `.sla-input` (`sla-elements.css`): container fill, 1px border-bright stroke, text-primary value, text-muted placeholder, and a mana border on focus (the global `:focus-visible` ring stays on top). It is unlayered CSS, so don't set bg, border-color or text-color utilities on the same element; size, padding and font-size utilities are fine. Checkboxes keep the native control tinted with `accent-mana`. Pickers' search inputs inside a Slot Picker use the same class.

## Do's and Don'ts

### Do:
- **Do** use mana violet as the only accent, and for every live, selected or new signal.
- **Do** build new UI from the `--sla-*` tokens and SLA primitives (Panel, SectionHeader, Tag, Badge, Button, ElementBadge, Readout).
- **Do** cut corners with clip-path (16px panels, 10px buttons, 4–6px tags) and keep `border-radius: 0`.
- **Do** caption windows with `//` tags and set all chrome in uppercase, tracked Orbitron.
- **Do** mark every selected tab, chip or toggle with the shared selection role (`.sla-tab` + `aria-pressed`).
- **Do** keep element and rarity hues exactly game-coded and limited to data.
- **Do** show interactivity with violet glow and a 1–2px lift.

### Don't:
- **Don't** introduce warm orange or reuse the legacy ember RGB values; `ember` means mana.
- **Don't** round corners or rely on Tailwind `rounded-*` to shape anything.
- **Don't** add drop shadows for elevation; depth is glow and tonal layering only.
- **Don't** use raw Tailwind palette classes (zinc, purple, amber…); use SLA tokens or their theme utilities.
- **Don't** use element or rarity colors decoratively, or as a second brand accent.
- **Don't** add a light theme; the System window is always lit violet on black.
