# Design Spec: Monarch Selector + Multi-Config Teams + PWA

Date: 2026-05-20  
Scope: 3 independent features across team guide pages and app infrastructure

---

## Feature 1 — Monarch Selector ("Puissance rémanente / Successeur")

### Goal

Add a new section to team guide pages (Power & Destruction, Guild Boss) letting the user pick which Workshop monarch's power they're using. One monarch per team. Default: Monarch of Steel.

### Monarchs

3 monarchs extracted from `public/assets/workshop/`:

| ID | Name (FR) | Image path |
|----|-----------|------------|
| `monarch-of-steel` | Monarque d'Acier | `/assets/workshop/monarch-of-steel/monarch-of-steel.png` |
| `monarch-of-white-flames` | Monarque des Flammes Blanches | `/assets/workshop/monarch-of-white-flames/monarch-of-white-flames.png` |
| `monarch-of-transfiguration` | Monarque de la Transfiguration | `/assets/workshop/monarch-of-transfiguration/monarch-of-transfiguration.png` |

### Architecture

**New files:**
- `src/components/team/monarchs.ts` — `MONARCHS` constant array + `MonarchId` type
- `src/components/team/MonarchSelector.tsx` — UI component

**`MonarchSelector` props:**
```ts
interface MonarchSelectorProps {
  selected: MonarchId
  onChange: (id: MonarchId) => void
}
```

UI: 3 portrait cards in a flex row. Click to select (radio behavior). Selected card gets accent border ring. Portrait image + name label beneath. SLA design system styling (zinc palette, accent border on selection).

**State:** Per element tab. On element switch, restore to config value or fall back to `'monarch-of-steel'`. Not persisted to localStorage.

### Config changes

Both `power-destruction.json` and `guild-boss.json`: add optional `monarch` field per team entry. Absent → defaults to `'monarch-of-steel'`.

```json
{
  "element": "Wind",
  "status": "active",
  "monarch": "monarch-of-steel",
  ...
}
```

### Page changes

`TeamGuidePowerDestruction` and `TeamGuideGuildBoss`: add new section after Shadows (Power) / Composition (Guild Boss).

```
// SECTION 05 — Puissance rémanente / Successeur
```

State: `selectedMonarch: MonarchId`, initialized from `team.monarch ?? 'monarch-of-steel'`, reset on `switchElement`.

---

## Feature 2 — 3 Team Configurations Per Element

### Goal

Each element tab in Power & Destruction and Guild Boss supports 3 distinct team configurations (different hunters/shadows/weapons). User can switch between configs via numbered tabs.

### Config structure change

Wrap team data into a `configs` array. Old flat fields (`jinwooWeapons`, `hunters`, `shadows`) move into `configs[0]`. Two additional empty config entries pre-populated with `status: "coming-soon"` label can be filled later.

**Power & Destruction** (`power-destruction.json`):
```json
{
  "element": "Wind",
  "status": "active",
  "monarch": "monarch-of-steel",
  "configs": [
    {
      "label": "Équipe 1",
      "jinwooWeapons": ["Stormbringer", "Demon King's Daggers"],
      "hunters": [...],
      "shadows": [...]
    },
    {
      "label": "Équipe 2",
      "jinwooWeapons": [],
      "hunters": [],
      "shadows": []
    },
    {
      "label": "Équipe 3",
      "jinwooWeapons": [],
      "hunters": [],
      "shadows": []
    }
  ]
}
```

**Guild Boss** (`guild-boss.json`): same pattern but each hunter entry keeps its `role` field.

### UI Component

**New file:** `src/components/team/TeamConfigTabs.tsx`

```ts
interface TeamConfigTabsProps {
  labels: string[]       // e.g. ["Équipe 1", "Équipe 2", "Équipe 3"]
  active: number         // 0-indexed
  hasData: boolean[]     // true if configs[i].hunters.length > 0
  onChange: (i: number) => void
}
```

Displays as small numbered tabs with label text. Tabs with `hasData[i] === false` are greyed-out but still clickable (shows placeholder state). Sits between ElementTabs and weapon/hunter content.

### Page changes

Both pages: add `activeConfigIndex: number` state (0-indexed), reset to `0` on `switchElement`.

Init functions (`initHunters`, `initShadows`, `initWeapons`) read from `team.configs[activeConfigIndex]` instead of flat team fields.

If `configs[activeConfigIndex].hunters.length === 0`, fall through to random/placeholder behavior.

---

## RD — Mobile-First + PWA

### Goal

Transform the app to mobile-first layout while preserving the existing desktop UI. Add PWA capabilities (installable, offline-capable, manifest).

### Mobile-First CSS

Audit all layout CSS to ensure:
- Base styles target ~360px viewport (no `min-width` assumptions in base rules)
- Desktop enhancements use responsive prefixes (`md:` = 768px+, `lg:` = 1024px+)
- Touch targets: interactive elements ≥ 44px height/width
- Safe area insets: `padding-bottom: env(safe-area-inset-bottom)` on bottom nav
- Grid columns: `grid-cols-1` base → `grid-cols-3` at `md:`
- `sla-container` horizontal padding: 16px mobile → 32px desktop

Key areas needing mobile work:
- Hunter/Shadow slot grids (currently hardcoded 3-col)
- JinwooPanel weapon row
- TeamConfigTabs + ElementTabs scroll on small screens (horizontal scroll container)
- Nav: hide on mobile (BottomTabBar already exists)

### PWA Setup

**Dependency:** `vite-plugin-pwa` (dev)

**`vite.config.ts` changes:**
```ts
import { VitePWA } from 'vite-plugin-pwa'

VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,png,svg,webp}'],
    runtimeCaching: [
      { urlPattern: /\.json$/, handler: 'StaleWhileRevalidate' },
      { urlPattern: /\/assets\//, handler: 'CacheFirst', options: { cacheName: 'assets-cache' } },
    ],
  },
  manifest: {
    name: 'SLA — Solo Leveling: ARISE Guide',
    short_name: 'SLA',
    theme_color: '#09090b',
    background_color: '#09090b',
    display: 'standalone',
    orientation: 'portrait-primary',
    start_url: '/',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  },
})
```


**`index.html` additions:**
- `<link rel="manifest" href="/manifest.webmanifest">`
- `<meta name="theme-color" content="#09090b">`
- `<meta name="apple-mobile-web-app-capable" content="yes">`
- `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`
- `<link rel="apple-touch-icon" href="/icons/icon-192.png">`

**Icons:** Create two PNG icons (192×192, 512×512) in `public/icons/`. Use existing SLA branding/logo or derive from the app visual identity (zinc dark bg + "SLA" text).

### Service Worker Strategy

| Resource | Strategy | Cache name |
|----------|----------|------------|
| HTML/routes | NetworkFirst | `html-cache` |
| `/assets/**` images | CacheFirst (30d) | `assets-cache` |
| `*.json` data | StaleWhileRevalidate | `data-cache` |
| JS/CSS bundles | CacheFirst (1y, versioned) | `static-cache` |

Offline fallback: serve cached index.html for navigation requests that fail.

### Desktop Preservation

All existing desktop class names and layout remain. Mobile styles are purely additive (base layer). No existing `lg:` or fixed-width containers removed.

---

## Implementation Order

1. Feature 1 (Monarch Selector) — new component + config field + section in 2 pages
2. Feature 2 (3 configs) — config migration + new tab component + page state changes
3. RD (Mobile-first + PWA) — CSS audit + vite-plugin-pwa + icons + manifest
