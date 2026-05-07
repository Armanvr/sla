# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [4.0.0] — 2026-05-07

### Added
- **Sidebar de navigation globale** (`SideNav`) — panneau latéral fixe sur toutes les pages avec icônes HUD : Hunters, Compare, Dungeons, Power of Destruction, Guild Boss, Shadows
  - Fond `#0d0d1a` (teinture mana), bordure droite `--sla-mana`, lien actif highlighté
  - Sticky (`position: sticky; top: 52px`) pour ne pas masquer le header
- **Page Hunters** (`/hunters`) — liste complète des chasseurs par élément avec filtre par catégorie
  - Cards horizontales inspirées de `NewHunterSpotlight` : image à gauche, info à droite
  - Tri automatique : `newHunter: true` en premier dans chaque groupe
  - Badge **NEW** + glow mana pour les chasseurs récents
- **Page Shadows** (`/shadows`) — guide des ombres invocables (anciennement section de la HomePage)
- **Page Workshops** (`/workshops`) — guide des raids Workshop (anciennement section de la HomePage)
- **Composant `NewHunterSpotlight`** — zone mise en avant sous le LiveFeed pour les chasseurs avec `newHunter: true`
  - Layout horizontal en row, fond dégradé violet/ember, bordure et glow mana
- **Footer** global — copyright "© 2026 Arise Emberfall" sur toutes les pages
- **Antoine Martinez** — config chasseur complète (`src/data/hunters/antoine-martinez.json`)
  - Light / Elemental Stacker — National Level SSR, sorti le 2026-05-07
  - Arme exclusive : Saint's Benediction
  - Passive Holy Retribution, 5 advancements, kit complet (Shattered Equilibrium, Unforgiving Blessed Light, Light of Shattered Sorrow, Judgement of Severed Fate, Calamity's Retribution, Tragedy Cleaver, The Angel's Stay)
- **Champ `newHunter`** — clé booléenne optionnelle dans `HunterData` pour identifier les chasseurs récents

### Changed
- **Homepage** — refonte complète
  - Hero centré, 3 sections initiales supprimées au profit d'une section **Fonctionnalités du système** : 4 feature cards en grille alternée rectangle/carré (Hunters, Power & Destruction, Guild Boss, Workshop)
  - `NewHunterSpotlight` intégré sous le LiveFeed
  - Ticker mis à jour avec Antoine Martinez
- **Fiche chasseur** (`HunterProfile`) — redesign complet en grille 3 colonnes
  - **Section 01 — Détails** : Image (col 1 × 2 rows) | Base Stats max level (col 2) | Profil compact + passive (col 2) | Advancements (col 3 × 2 rows)
  - **Section 02 — Recommandations** : Équipements (cols 1-2) | Cores (col 3)
  - Toutes les sections auto-dépliées (suppression des `CollapsibleSection`)
  - Base Stats : niveau max uniquement (niveau 1 retiré)
  - Section Skills entièrement supprimée
  - BackLink pointe vers `/hunters`
- **EquipmentSection** — ordre colonne réorganisé : Bonus de sets → Armure → Bijoux
- **CoresSection** — affichage en colonne unique (plus de grille 3-col)
- **Données chasseurs** — clé `skills` supprimée de l'ensemble des 48+ fichiers JSON
- **Guild Boss + P&D** — sections redécoupées avec titres `SectionHeader` (Boss actif / Rotation → Armes de Jinwoo → Composition / Chasseurs → Ombres)
- **HunterSlot** — style migré de Tailwind zinc vers design system SLA (`sla-panel`, vars CSS)
- **Power & Destruction** — `weaknessRotation` unifié avec le format Guild Boss : `activeWeeks[]` → `active: boolean`
- **Icônes** — emoji (`🧠 🛡️ ✨ ⚔️ 💨 👁️`) remplacés par symboles HUD (`◇ ◈ ✦ ⚔ ◃ ◎`) dans `constants.ts`
- **Nav** — éléments centrés, lien Compare retiré (présent dans SideNav), version `v4.0.0`

### Removed
- **Section Skills** de la fiche chasseur — composants `SkillsSection` et `SkillCard` supprimés
- **Clé `skills`** retirée de `HunterData` (interface TypeScript) et de tous les fichiers JSON chasseurs

## [3.0.0] — 2026-04-30

### Added
- **SLA Design System** — nouveau système de design complet (`src/styles/sla-tokens.css` + `src/styles/sla-elements.css`)
  - Tokens de couleur, typographie, espacement, bordures, ombres/glow et animations
  - Thème "Emberfall" : palette redéfinie (ember → bleu acier `#6b9ac4`, amber → violet `#4c2c72`, border-bright → `#77b6ea`)
- **Bibliothèque de composants SLA** (`src/components/sla/`) — 11 composants Preact réutilisables construits sur les tokens :
  - `Nav` — barre de navigation unifiée avec horloge temps réel et version
  - `Panel` — conteneur avec coins coupés et fond dégradé
  - `Badge` — badges de statut (active, pending, critical, success)
  - `Button` / `ButtonLink` — boutons primaires et ghost
  - `ElementBadge` / `ElementBar` — badges et barres d'éléments avec icônes
  - `BackLink`, `Progress`, `Readout`, `SectionHeader`, `Tag`, `Ticker`
- **Page Design System** — route `/design-system` : galerie interactive de toutes les couleurs, typographies et composants
- **Router centralisé** (`src/router.tsx`) — `AppRouter` avec `Nav` intégré, scroll-to-top automatique, et page 404 dédiée
- **Registre des chasseurs** (`src/data/hunters.ts`) — `HunterEntry[]` typé avec helper `findHunter()`

### Changed
- Toutes les pages et composants migrés vers les composants SLA (remplace les classes Tailwind utilitaires inline)
- `HomePage` — suppression des `elementColors` / `elementAccent` / `elementHeading` hardcodés ; utilisation de `ElementBadge`, `Panel`, `SectionHeader`, `Ticker`
- `HunterProfile` et guides d'équipe refactorisés pour utiliser `Panel`, `Badge`, `SectionHeader`, `BackLink`
- `src/index.css` — couleurs `@theme` Tailwind synchronisées avec les tokens du design system
- Navigation extraite de `app.tsx` vers le composant `Nav` dédié

## [2.0.0] — 2026-04-16

### Added
- **Workshop Guide** — nouvelle page interactive par raid (Monarch of Steel, Monarch of Transfiguration, Monarch of White Flames)
  - Navigation par section, étage principal, et bénédictions (listes séparées)
  - Carte boss avec faiblesses et résistances élémentaires mises en valeur (icônes larges, glow coloré, fond vert/rouge)
  - Sélecteur d'équipe (Primaire / Secondaire) et panneau Sung Jinwoo avec armes
  - Affichage "Coming soon" pour les raids non encore disponibles (image + message)
- **Rotation hebdomadaire Power & Destruction** — bandeau automatique affichant le boss de la semaine, ses faiblesses et résistances selon la semaine ISO courante
  - Calcul basé sur des semaines jeu démarrant le jeudi
  - Sélection automatique de l'élément recommandé au chargement
- **Boss actif Guild Boss** — bannière affichant l'image, le nom et les faiblesses élémentaires du boss en cours
  - Sélection automatique du premier élément faible au chargement
- **Indicateurs élémentaires sur les onglets** (ElementTabs) — badge vert "★ recommandé" et badge rouge "✗ résistance" sur les onglets correspondants

### Changed
- Couleur de sélection des onglets élémentaires unifiée (couleur unique au lieu d'une couleur par élément)
- Onglets de bénédictions séparés des étages principaux dans le Workshop (section dédiée avec label "Bénédictions")

## [1.0.1] — 2026-04-09

### Added
- **Elena Renault** hunter profile (`src/data/hunters/elena-renault.json`)
  - Water / Supporter — A-Rank SSR
  - Full skill set: Danse d'Argent, Trahison d'Argent, Piège d'Argent, Furie d'Argent, Triple Estoc, Éclat de Folie, Prison d'Argent
  - Passive: Mercury Arts (Winter Chill, Tide of Silver, Obsession's Grasp)
  - 5 advancements, equipment stats, core build, and recommended builds

## [1.0.0] — 2026-03-17

### Added
- Initial release
- **48 hunter profiles** with stats, skills, passives, advancements, equipment builds, and core builds
- **Team Guides** for Dungeons, Power & Destruction, and Guild Boss
  - Fixed Wind compositions; random generation for Water / Fire / Light / Dark
  - Interactive hunter, shadow, and weapon slots per guide
- **Weapon selector** with searchable dropdown (120+ weapons)
- **Compare page** for side-by-side hunter comparison
