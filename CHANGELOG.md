# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
