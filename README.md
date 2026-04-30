# SLA Guide

An interactive guide for **Solo Leveling: ARISE** — stats, skills, equipment, cores, weapons, and team guides by element.
This project has no affiliation with Netmarble Corporation or its affiliates.

## Tech Stack

| Area | Technology |
|------|------------|
| UI | [Preact](https://preactjs.com/) |
| Language | TypeScript |
| Bundler | [Vite](https://vite.dev/) (via rolldown-vite) |
| CSS | [Tailwind CSS v4](https://tailwindcss.com/) |
| Linter / Formatter | [Biome](https://biomejs.dev/) |

## Project Structure

```
src/
├── main.tsx                          # Preact entry point
├── app.tsx                           # App shell
├── router.tsx                        # Centralized SPA router (AppRouter)
├── index.css                         # Tailwind @theme tokens + global styles
├── styles/
│   ├── sla-tokens.css                # Design tokens (colors, typography, spacing, glow…)
│   └── sla-elements.css              # Utility CSS classes (panel, badge, button, tag…)
├── pages/
│   ├── HomePage.tsx                  # Hunter grid, navigation to Team Guides
│   ├── TeamGuideDungeons.tsx         # Team Guide — Dungeons
│   ├── TeamGuidePowerDestruction.tsx # Team Guide — Power & Destruction
│   ├── TeamGuideGuildBoss.tsx        # Team Guide — Guild Boss
│   ├── TeamGuideWorkshop.tsx         # Team Guide — Workshop (raid floors & blessings)
│   ├── ComparePage.tsx               # Side-by-side hunter comparison
│   └── DesignSystemPage.tsx          # Design system gallery (/design-system)
├── components/
│   ├── HunterProfile.tsx             # Detailed hunter profile
│   ├── sla/                          # SLA component library (built on design tokens)
│   │   ├── Nav.tsx                   # Navigation bar with real-time clock and version
│   │   ├── Panel.tsx                 # Clipped-corner panel with gradient background
│   │   ├── Badge.tsx                 # Status badges (active / pending / critical / success)
│   │   ├── Button.tsx                # Primary and ghost buttons
│   │   ├── ElementBadge.tsx          # Element badges and bars with icons
│   │   ├── BackLink.tsx              # Back navigation link
│   │   ├── Progress.tsx              # HUD progress bar
│   │   ├── Readout.tsx               # Data readout (label + value)
│   │   ├── SectionHeader.tsx         # Section title with decorative line
│   │   ├── Tag.tsx                   # Tag and Label primitives
│   │   └── Ticker.tsx                # Scrolling ticker banner
│   ├── hunter/
│   │   ├── HeroSection.tsx           # Header (image, stats, elements)
│   │   ├── EquipmentSection.tsx      # Interactive armor & jewelry slots
│   │   ├── CoresSection.tsx          # Mind / Body / Spirit slots
│   │   └── types.ts                  # Shared types (Build, CoreBuild, HunterData…)
│   └── team/
│       ├── ElementTabs.tsx           # Element tab selector with weekly indicators
│       ├── HunterSlot.tsx            # Interactive hunter slot
│       ├── ShadowSlot.tsx            # Interactive shadow slot
│       ├── WeaponSlot.tsx            # Interactive weapon slot
│       ├── JinwooPanel.tsx           # Sung Jinwoo panel (weapons, equipment, cores)
│       └── types.ts                  # Shared team types
└── data/
    ├── hunters.ts                    # Typed hunter registry (HunterEntry[] + findHunter)
    ├── hunters/                      # 49 JSON files — one per hunter
    ├── shadows/                      # 14 JSON files — Sung Jinwoo's shadows
    ├── artifacts/
    │   └── artifacts.json            # Artifact sets (armor, jewelry, full sets)
    ├── cores/
    │   └── cores.json                # Cores (Mind, Body, Spirit)
    └── teams/
        ├── power-destruction.json    # Team compositions + weekly elemental rotation
        ├── guild-boss.json           # Team compositions + active boss weaknesses
        └── workshop.json             # Workshop raid floors, blessings, and boss data

public/assets/
├── hunters/                          # Portraits and renders
│   └── _icons/                       # Hunter profile icons
├── shadows/                          # Shadow images
├── artifacts/                        # Artifact set icons
├── cores/                            # Core icons
├── weapons/                          # 120+ weapon icons + manifest.json
├── guild-boss/                       # Guild boss icons
├── workshop/                         # Workshop raid boss icons (per raid/section)
└── sections/                         # Section cover images (coming-soon, etc.)

```

## Features

### Design System
- **SLA Emberfall design tokens** — palette, typographie, espacement, effets glow, animations, définis dans `sla-tokens.css`
- **Bibliothèque de composants** — `Nav`, `Panel`, `Badge`, `Button`, `ElementBadge`, `Progress`, `Readout`, `SectionHeader`, `Tag`, `Ticker`, `BackLink`
- **Page Design System** (`/design-system`) — galerie interactive de toutes les couleurs, composants et tokens

### Hunter Guides
- Base stats, elements, and rarity
- Skills (Basic / Core / Skill / Support / QTE / Ultimate) with descriptions and icons
- Passives, advancements, and costumes
- Equipment builds by level (armor + jewelry presets)
- Recommended core build (Mind / Body / Spirit)

### Team Guides — Dungeons
- Fixed Sung Jinwoo slot with Equipment and Core builds
- **Weapons section** — 2 weapon selection slots with search (120+ weapons)
- 3 interactive hunter slots (dropdown with mini-loadout)
- 3 interactive shadow slots

### Team Guides — Power & Destruction
- **Weekly rotation banner** — automatically detects the current game week (starts Thursday) and displays elemental weaknesses and resistances
- Element tabs with **recommended** (★) and **resistance** (✗) indicators for the current week
- Default element auto-selected based on the active weekly rotation
- Sung Jinwoo slot with **Weapons section** (2 slots), Equipment and Cores
- 3 hunter slots and 3 shadow slots, all editable

### Team Guides — Guild Boss
- **Active boss banner** — displays the current boss image, name, and elemental weaknesses
- Element tabs with **recommended** (★) indicators based on boss weaknesses
- Default element auto-selected to the first recommended weakness
- Sung Jinwoo slot with **Weapons section** (2 slots), Equipment and Cores
- 6 hunter slots with roles (Striker × 2, Breaker, Elemental Stacker, Supporter × 2)

### Team Guides — Workshop
- Per-raid navigation (sections → floors → blessings, each in their own tab row)
- **Boss card** with elemental weaknesses and resistances (large icons, colored glow)
- Dual-team selector (Primaire / Secondaire) per floor
- Sung Jinwoo panel with weapon selection on `with-jinwoo` floors
- **Coming soon** placeholder for raids not yet available

### Weapon Selector
- Searchable dropdown (search by name)
- 120+ weapons with icons from local assets
- Resets on element change

## Roadmap

- [ ] **Techniques & Runes** section in all Team Guides
- [ ] **Damage score** calculation per team composition
- [ ] **Favorites** / saved teams in localStorage
- [ ] Multilingual support (EN / KR)
- [ ] Detailed **shadow** pages (skills, shadow authority, ranks)
- [ ] Detailed **weapon** pages (stats, passive effects, recommendations)
- [ ] Dynamic tier list by game mode

## Installation

**Prerequisites**: Node.js (LTS recommended) and npm.

```bash
npm install
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite development server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Code linting with Biome |

## Deployment

The `dist/` folder generated by `npm run build` is a static site deployable on any host (Netlify, Vercel, GitHub Pages, S3, etc.).
