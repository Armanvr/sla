# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A guild / player community that the maintainer shares SLA with. Members use it to coordinate teams and keep everyone on the same builds for Solo Leveling: ARISE content: weekly Power & Destruction rotation, Guild Boss, Workshop raids. They are French-speaking players. They open it both while planning and while playing, often on a phone next to the game.

## Product Purpose

An interactive guide ("codex") for Solo Leveling: ARISE: hunter dossiers (stats, passive, advancements, recommended equipment and core builds), team compositions per element and per game mode, and a build optimizer that compares a player's gear stats to the recommended build. Success means guild members find the current recommended team and build fast, and the community plays from one shared reference.

## Positioning

- **Rotation-aware:** knows the current P&D game week (Thursday-start) and the active Guild Boss, then pre-selects the recommended element and team.
- **Interactive, not static:** every hunter, shadow, weapon, equipment and core slot is editable. Compare scores a player's own stats against the recommendation.
- **Curated and opinionated:** one maintainer's recommended teams (up to 3 configs per element) and builds, not an exhaustive data dump.

## Operating Context

- Content follows the game's live cadence. P&D weakness rotation changes weekly (Thursday). Guild Boss rotates. New hunters arrive with patches and get a "New Hunter" spotlight and live-feed ticker entry.
- The maintainer updates data by hand in JSON files (`src/data/`): hunter dossiers, artifact sets, cores, shadows, team configs. Active rotation and boss are flipped with `active: true`.
- Hunter data is sourced from the official game wiki.
- Used alongside the game, frequently on mobile. Installable as a PWA.

## Capabilities and Constraints

- Routes: Home, Hunters list (filter by category), Hunter dossier, Compare (build optimizer), Team Guides (Power & Destruction, Guild Boss, Workshop per raid), Workshops index, Design System gallery.
- Static site, no backend. All data is bundled JSON; deployable to any static host; offline-capable PWA (Workbox).
- Must stay usable on phones (bottom tab bar on mobile, sidebar on desktop).
- UI copy is French. Game terms (skill, set, core, boss, weapon names) stay in English as they appear in-game.
- Terminology: hunters, shadows, cores (Mind / Body / Spirit), artifact sets (armor, jewelry, complete 8-piece), advancements, categories (Striker, Breaker, Supporter, Elemental Stacker, Elemental Buster), Puissance rémanente (Monarch) / Successeur, Workshop floors and blessings.
- Undecided: multilingual support (EN / KR) is on the README roadmap but not committed. Other roadmap items (runes/techniques data, damage score, saved teams in localStorage, shadow and weapon pages, tier list) are open.

## Brand Commitments

- Unofficial fan project: must keep the "no affiliation with Netmarble" stance. No official logos or claims of endorsement.
- Existing names in use: "SLA", "SLA // ARISE", "ARISE EMBERFALL", footer "© 2026 Arise Emberfall".

## Evidence on Hand

- 50 hunter dossiers (`src/data/hunters/`), 14 shadows, artifact sets (`src/data/artifacts/artifacts.json`), cores (`src/data/cores/cores.json`), team configs (`src/data/teams/`).
- Game art assets in `public/assets/` (hunter portraits and icons, weapons, artifacts, cores, shadows, guild bosses, workshop bosses, section covers).
- No testimonials, usage numbers, or community metrics exist; do not invent them.

## Product Principles

1. **Current first.** The active rotation, boss and newest hunters lead; stale content never outranks what's live this week.
2. **One shared answer, still editable.** Show the curated recommendation by default; let players swap slots to explore without losing the reference.
3. **Fast lookup mid-session.** A guild member on a phone should reach the right team or build in a few taps.
4. **Game-faithful terms.** Use the game's own names so guidance maps directly to what players see in-game.
