# SLA Guide

Guide statique pour **Solo Leveling: ARISE** — stats, compétences, équipements, cores et builds recommandés pour chaque chasseur.

## Stack technique

| Domaine | Technologie |
|---------|-------------|
| UI | [Preact](https://preactjs.com/) |
| Langage | TypeScript |
| Bundler | [Vite](https://vite.dev/) (via rolldown-vite) |
| CSS | [Tailwind CSS v4](https://tailwindcss.com/) |
| Linter / Formatter | [Biome](https://biomejs.dev/) |

## Structure du projet

```
src/
├── main.tsx                   # Point d'entrée Preact
├── app.tsx                    # État de navigation (accueil / profil chasseur)
├── index.css                  # Import Tailwind
├── pages/
│   └── HomePage.tsx           # Grille de chasseurs, sections Team & Workshop
├── components/
│   └── HunterProfile.tsx      # Profil détaillé d'un chasseur
└── data/
    ├── sung-jinwoo.json       # Données par chasseur
    ├── alicia-blanche.json
    ├── christopher-reed.json
    ├── artifacts.json          # Sets d'artefacts (armure, bijoux, complets)
    └── cores.json              # Cores (Mind, Body, Spirit)

public/assets/                  # Images (chasseurs, artefacts, cores, armes)
scripts/                        # Scripts Python de téléchargement d'assets depuis le wiki Fandom
```

## Fonctionnalités

- **Hunter Guides** — Stats de base, compétences (basic / core / skill / support / QTE / ultimate), passif, avancements et costumes.
- **Équipements** — Slots armure et bijoux interactifs, calcul des bonus de set, presets de build par chasseur.
- **Cores** — Slots Mind / Body / Spirit avec effet légendaire, build recommandé et réinitialisation.
- **Team Guides** / **Workshop Guides** — Sections prévues (coming soon).

## Installation

**Prérequis** : Node.js (LTS recommandé) et npm.

```bash
npm install
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Compilation TypeScript + build de production |
| `npm run preview` | Prévisualisation du build de production |
| `npm run lint` | Vérification du code avec Biome |

## Téléchargement des assets (optionnel)

Les images et métadonnées proviennent du [wiki Fandom Solo Leveling: ARISE](https://solo-leveling-arise.fandom.com). Des scripts Python (nécessitant `requests`) permettent de les régénérer :

```bash
python scripts/download_assets.py      # Portraits de chasseurs
python scripts/download_artifacts.py   # Artefacts
python scripts/download_cores.py       # Cores
python scripts/download_weapons.py     # Armes
```

Ces scripts respectent un rate-limit de 0.5s entre chaque appel à l'API MediaWiki.

## Déploiement

Le dossier `dist/` généré par `npm run build` est un site statique déployable sur n'importe quel hébergeur (Netlify, Vercel, GitHub Pages, S3, etc.).
