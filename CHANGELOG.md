# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).


## [5.0.0] — 2026-10-04

### Added
- **Agnes Rivera** — nouvelle fiche hunter complète (SSR, S-Rank, Dark, Elemental Buster, arme exclusive « La Famiglia », release 2026-07-02), données issues du wiki officiel ; configs équipements & cores basées sur celles de Liu Zhigang ; visible dans le listing, le spotlight « New Hunter » et sur `/hunter/agnes-rivera`
- **Set d'artefacts Surtur's Flame** — 8 pièces + bonus 4/8 (Blazing Annihilation → Cataclysmic Blaze), icônes dans `public/assets/artifacts/`
- **`Listbox`** (`src/components/sla/Listbox.tsx`) — sélecteur déroulant accessible (rôles ARIA `listbox` / `option`, navigation clavier ↑/↓, Home/End, Entrée/Espace, Échap/Tab pour fermer), utilisé par `HunterSlot`, `ShadowSlot`, `WeaponSlot`, `CoresSection` et `EquipmentSection`
- **`useFlashOnChange`** — flash visuel (`sla-pick-flash`) à la sélection dans un slot
- **Accessibilité**
  - Lien d'évitement « Aller au contenu » vers `<main id="main">`
  - Anneau de focus clavier global (`:focus-visible`), tracé à l'intérieur pour les éléments à coins coupés
  - `Ticker` rendu en liste sémantique, copie de boucle masquée aux lecteurs d'écran ; horloge de la Nav en `aria-hidden`
- **`src/components/sla/elements.ts`** — source unique des icônes d'élément (`ELEMENT_ICON`, `ELEMENT_RESISTANCE_ICON`)
- **Documentation** — `DESIGN.md` (système de design, tokens, règles d'usage) et `PRODUCT.md`

### Changed
- **Live Feed** — bandeau mis à jour : patch 5.0.0, nouveaux hunters Agnes Rivera et Liu Zhigang
- **HomePage** — date de mise à jour alignée sur la release d'Agnes Rivera (2 juillet 2026)
- **Version** — passage en 5.0.0 (header + package.json)
- **Images** — portraits, icônes de chasseurs et visuels de sections convertis de PNG en WebP (chemins des JSON chasseurs mis à jour)
- **PWA** — précache limité au shell applicatif (`js`, `css`, `html`, `svg`, `woff2` + `assets/utils/`) ; les autres images sont mises en cache au premier affichage (CacheFirst, 1000 entrées max, 30 j) ; favicon et apple-touch-icon en `includeAssets`
- **Polices** — Orbitron et Inter chargées via Google Fonts (avec `preconnect`)
- **Design system** — migration des classes Tailwind brutes (`zinc`, `purple`, `emerald`, `red`…) vers les tokens sémantiques (`bg-bg-surface`, `border-border-sla`, `text-text-sla-*`, `mana`…)
  - Nouveaux tokens faiblesse / résistance (`weak`, `resist`, `weak-bg`, `resist-bg`) et rampe typo `text-label` (10px) / `text-meta` (12px)
  - Coins arrondis et ombres `shadow-*` retirés ; contraste des états vides et des bordures de popups renforcé
  - Liens et sélection de texte en mana (`--sla-mana-bright`) au lieu d'ember
- **Nav** — lien « Design » masqué sous 768px (couvert par la barre d'onglets mobile)
- **Workshop** — un nom de raid inconnu dans `/team/workshop/:raid` renvoie la page 404
- **HunterProfile** — `StatBar` extrait dans `hunter/StatBar.tsx`, calcul de `maxStat` simplifié ; `CoresSection` reçoit `hunterCategory` au lieu de `hunterClass`

### Fixed
- **Équipes** — références de build Supporter des équipes Guild Boss / Power & Destruction alignées sur les noms de builds existants ; nom du build de Liu Zhigang corrigé

### Removed
- Composants inutilisés `HeroSection` et `CollapsibleSection`
- Dossier `art-source/` retiré du suivi git (ajouté au `.gitignore`, conservé en local)

## [4.2.0] — 2026-07-01

### Added
- **Puissance rémanente : Monarque / Successeur** — la section monarque de Power & Destruction et Guild Boss devient un choix Monarque ou Successeur
  - Composant `PuissanceRemanente` (`PuissanceMode` : `'monarch' | 'successor'`) qui englobe `MonarchSelector` et le nouveau `SuccessorSelector`
  - Successeurs dans `successors.ts` (`SuccessorId`, `DEFAULT_SUCCESSOR`, `SUCCESSORS`) : Myro
  - Power & Destruction : mode Successeur par défaut sur Wind, Monarque sur les autres éléments
- **Liu Zhigang** — fiche hunter (Fire, SSR, Elemental Buster) avec builds complets et arme exclusive Nightcleaver
- **Runes & Bénédiction** — composant `RunesSection` (techniques + bénédictions, placeholder)
  - Nouvelle section sur la fiche Sung Jinwoo, activée par le flag `showRunes` de `HunterData`
  - Affichée sous le `JinwooPanel` en Guild Boss et Power & Destruction
- **Tableau des effets d'avancement** (`AdvancementEffectsTable` + `advancementEffects.ts`) — agrège les effets d'avancement de l'équipe (% cumulés), code couleur hausse / baisse / autre
- **Équipes 2 & 3** remplies, mono-élément, classées de la plus forte (1) à la plus faible (3) par élément
  - Guild Boss : 6 slots, un par rôle
  - Power & Destruction : 3 slots (Elemental Stacker + Supporter + Striker)
- **Verrou SPIRIT Supporter** — le noyau SPIRIT des Supporters est imposé à Ferocious Protector's Claw (badge « Obligatoire », picker désactivé)
- **Assets** — 43 pierres de bénédiction, 44 runes transcendantes (avec `manifest.json`), armes de Jinwoo Moonlit Gale et Soma and Asura, icône du boss Giant Statue, portrait du successeur Myro

### Changed
- **React Doctor pass 1** — `class` → `className` (~50 fichiers), attributs SVG en camelCase, styles inline extraits, découpage de `DesignSystemPage` et `HunterProfile`
- **Outillage** — Biome 2.5.2, `npm run lint` applique désormais `--write` ; formatage Biome appliqué à tout le code
- **Dépendances** — Preact 10.29.3, Vite 8.1.2, Tailwind 4.3.2, `@types/node` 26
- **Version** — passage en 4.2.0

### Fixed
- **Cores** — le bouton « vider » ne contourne plus le verrou SPIRIT des Supporters
- **Power & Destruction** — imports `successors` dupliqués fusionnés

### Removed
- **Page Shadows** (`/shadows`) et son entrée dans la navigation
- Anciens plans et specs `docs/superpowers/` (PWA mobile, multi-config monarque, v4.2)

## [4.1.0] — 2026-05-20

### Added
- **Sélecteur de monarque** — nouvelle section dans Power & Destruction (SECTION 05) et Guild Boss (SECTION 04)
  - 3 monarques sélectionnables : Monarque d'Acier (défaut), Monarque des Flammes Blanches, Monarque de la Transfiguration
  - Portraits tirés de `public/assets/workshop/`, sélection radio par clic, état par élément actif
  - Composant `MonarchSelector` + données dans `monarchs.ts` (`MonarchId`, `DEFAULT_MONARCH`, `MONARCHS`)
- **3 configurations d'équipe par élément** — Power & Destruction et Guild Boss
  - Tabs "Équipe 1 / 2 / 3" entre les onglets élémentaires et le contenu
  - Configs vides affichées à 40% d'opacité, données random si aucun hunter configuré
  - Migration JSON : `jinwooWeapons` / `hunters` / `shadows` → `configs[]` + champ `monarch` par équipe
  - Composant `TeamConfigTabs` (props : `labels`, `active`, `hasData`, `onChange`)
- **PWA — Progressive Web App**
  - `vite-plugin-pwa` + Workbox : service worker généré (`sw.js`), précache 350 entrées
  - Manifest (`manifest.webmanifest`) : name, short_name "SLA", theme `#000000`, display standalone, orientation portrait
  - Icônes générées via `@vite-pwa/assets-generator` : 64×64, 192×192, 512×512, maskable 512×512, apple-touch-icon 180×180, favicon.ico
  - Stratégies Workbox : CacheFirst `/assets/` (30j), StaleWhileRevalidate `.json`
  - `index.html` : `viewport-fit=cover`, `theme-color`, `apple-mobile-web-app-*`, apple touch icon

### Changed
- **Mobile-first layout**
  - `.sla-container` padding : `--sla-space-4` (16px) mobile → `--sla-space-6` (24px) à 768px+
  - Grilles chasseurs/ombres : `grid-cols-3` → `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` (Power & Destruction, Guild Boss)
  - `ElementTabs` : `overflow-x-auto pb-1` sur le conteneur pour scroll horizontal mobile
  - `.sla-app` : `padding-bottom: calc(56px + env(safe-area-inset-bottom))` mobile pour libérer BottomTabBar
  - `HunterSlot`, `ShadowSlot`, `WeaponSlot` : classe sémantique `sla-*-slot` + `min-height: 44px` mobile

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
