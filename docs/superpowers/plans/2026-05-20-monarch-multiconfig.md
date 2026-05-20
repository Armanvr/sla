# Monarch Selector + Multi-Config Teams Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Puissance rémanente / Successeur" monarch selector section to team guide pages, and support 3 switchable team configurations per element.

**Architecture:** New `monarchs.ts` + `MonarchSelector.tsx` components handle monarch selection; new `TeamConfigTabs.tsx` handles config switching. Both `power-destruction.json` and `guild-boss.json` are migrated from flat team fields to a `configs[]` array. Both team pages get new state and two new sections (config tabs + monarch selector).

**Tech Stack:** Preact, TypeScript, Tailwind CSS v4, JSON data files

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `src/components/team/monarchs.ts` | `MonarchId` type + `MONARCHS` constant |
| Create | `src/components/team/MonarchSelector.tsx` | Radio-style monarch card picker |
| Create | `src/components/team/TeamConfigTabs.tsx` | Numbered config switcher tabs |
| Modify | `src/data/teams/power-destruction.json` | Migrate flat fields → `configs[]`, add `monarch` |
| Modify | `src/data/teams/guild-boss.json` | Migrate flat fields → `configs[]`, add `monarch` |
| Modify | `src/pages/TeamGuidePowerDestruction.tsx` | New state, updated init fns, new sections |
| Modify | `src/pages/TeamGuideGuildBoss.tsx` | New state, updated init fns, new sections |

---

### Task 1: Create `src/components/team/monarchs.ts`

**Files:**
- Create: `src/components/team/monarchs.ts`

- [ ] **Step 1: Write the file**

```ts
export type MonarchId =
  | 'monarch-of-steel'
  | 'monarch-of-white-flames'
  | 'monarch-of-transfiguration'

export interface MonarchData {
  id: MonarchId
  name: string
  image: string
}

export const DEFAULT_MONARCH: MonarchId = 'monarch-of-steel'

export const MONARCHS: MonarchData[] = [
  {
    id: 'monarch-of-steel',
    name: "Monarque d'Acier",
    image: '/assets/workshop/monarch-of-steel/monarch-of-steel.png',
  },
  {
    id: 'monarch-of-white-flames',
    name: 'Monarque des Flammes Blanches',
    image: '/assets/workshop/monarch-of-white-flames/monarch-of-white-flames.png',
  },
  {
    id: 'monarch-of-transfiguration',
    name: 'Monarque de la Transfiguration',
    image: '/assets/workshop/monarch-of-transfiguration/monarch-of-transfiguration.png',
  },
]
```

- [ ] **Step 2: Verify lint passes**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/team/monarchs.ts
git commit -m "feat: add monarchs data and MonarchId type"
```

---

### Task 2: Create `src/components/team/MonarchSelector.tsx`

**Files:**
- Create: `src/components/team/MonarchSelector.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { MONARCHS } from './monarchs'
import type { MonarchId } from './monarchs'

interface MonarchSelectorProps {
  selected: MonarchId
  onChange: (id: MonarchId) => void
}

export function MonarchSelector({ selected, onChange }: MonarchSelectorProps) {
  return (
    <div class='flex gap-3 flex-wrap'>
      {MONARCHS.map((m) => (
        <button
          key={m.id}
          type='button'
          onClick={() => onChange(m.id)}
          class={[
            'flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer flex-1 min-w-[100px]',
            selected === m.id
              ? 'border-zinc-400 bg-zinc-700/60 shadow-[0_0_12px_rgba(255,255,255,0.06)]'
              : 'border-zinc-700/40 bg-zinc-800/40 hover:border-zinc-600 hover:bg-zinc-800/60',
          ].join(' ')}
        >
          <img
            src={m.image}
            alt={m.name}
            class='w-20 h-20 object-cover rounded-lg'
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.opacity = '0.3'
            }}
          />
          <span class='text-xs text-zinc-300 font-medium text-center leading-tight'>
            {m.name}
          </span>
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/team/MonarchSelector.tsx
git commit -m "feat: add MonarchSelector component"
```

---

### Task 3: Create `src/components/team/TeamConfigTabs.tsx`

**Files:**
- Create: `src/components/team/TeamConfigTabs.tsx`

- [ ] **Step 1: Write the component**

```tsx
interface TeamConfigTabsProps {
  labels: string[]      // e.g. ["Équipe 1", "Équipe 2", "Équipe 3"]
  active: number        // 0-indexed
  hasData: boolean[]    // true if configs[i].hunters.length > 0
  onChange: (i: number) => void
}

export function TeamConfigTabs({ labels, active, hasData, onChange }: TeamConfigTabsProps) {
  return (
    <div class='flex gap-2'>
      {labels.map((label, i) => (
        <button
          key={label}
          type='button'
          onClick={() => onChange(i)}
          class={[
            'px-4 py-2 rounded-lg text-xs font-semibold transition-all border',
            active === i
              ? 'bg-zinc-700 text-zinc-100 border-zinc-500'
              : 'bg-zinc-800/40 border-zinc-700/40 text-zinc-400 hover:text-zinc-300 hover:border-zinc-600',
            !hasData[i] ? 'opacity-40' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/team/TeamConfigTabs.tsx
git commit -m "feat: add TeamConfigTabs component"
```

---

### Task 4: Migrate `src/data/teams/power-destruction.json`

**Files:**
- Modify: `src/data/teams/power-destruction.json`

Flat team fields (`jinwooWeapons`, `hunters`, `shadows`) move into `configs[0]`. Two empty configs added. `monarch` field added (all default to `"monarch-of-steel"`).

- [ ] **Step 1: Replace the file content**

```json
{
	"weaknessRotation": [
		{ "weakness": ["Water", "Dark"], "resistance": [], "active": false },
		{ "weakness": ["Fire", "Water"], "resistance": [], "active": false },
		{ "weakness": ["Dark", "Wind"], "resistance": [], "active": false },
		{ "weakness": ["Wind", "Light"], "resistance": [], "active": true },
		{ "weakness": ["Light", "Fire"], "resistance": [], "active": false }
	],
	"teams": [
		{
			"element": "Wind",
			"status": "active",
			"monarch": "monarch-of-steel",
			"configs": [
				{
					"label": "Équipe 1",
					"jinwooWeapons": ["Stormbringer", "Demon King's Daggers"],
					"hunters": [
						{ "id": "lennart-niermann", "build": "Build Niv. 120" },
						{ "id": "sung-jinah", "build": "Build Niv. 120 (A)" },
						{ "id": "sugimoto-reiji", "build": "Build Niv. 120" }
					],
					"shadows": ["beste", "cerbie", "skull"]
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
		},
		{
			"element": "Water",
			"status": "active",
			"monarch": "monarch-of-steel",
			"configs": [
				{
					"label": "Équipe 1",
					"jinwooWeapons": ["Allon's Orb", "Thetis' Grimoire"],
					"hunters": [
						{ "id": "frieren", "build": "Build Niv. 120 (A)" },
						{ "id": "meri-laine", "build": "Build Niv. 120" },
						{ "id": "cha-hae-in-pure-sword-princess", "build": "Build Niv. 120" }
					],
					"shadows": ["brute", "cerbie", "skull"]
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
		},
		{
			"element": "Fire",
			"status": "active",
			"monarch": "monarch-of-steel",
			"configs": [
				{
					"label": "Équipe 1",
					"jinwooWeapons": ["Glorious Demise", "Ennio's Roar"],
					"hunters": [
						{ "id": "christopher-reed", "build": "Build Niv. 120" },
						{ "id": "gina", "build": "Build Niv. 120 (A)" },
						{ "id": "yuqi", "build": "Build Niv. 120" }
					],
					"shadows": ["beste", "cerbie", "skull"]
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
		},
		{
			"element": "Light",
			"status": "active",
			"monarch": "monarch-of-steel",
			"configs": [
				{
					"label": "Équipe 1",
					"jinwooWeapons": ["Phantomblade", "Hero's Sword"],
					"hunters": [
						{ "id": "go-gunhee", "build": "Build Niv. 120" },
						{ "id": "laura-walker", "build": "Build Niv. 120 (A)" },
						{ "id": "thomas-andre", "build": "Build Niv. 120" }
					],
					"shadows": ["beste", "cerbie", "skull"]
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
		},
		{
			"element": "Dark",
			"status": "active",
			"monarch": "monarch-of-steel",
			"configs": [
				{
					"label": "Équipe 1",
					"jinwooWeapons": ["Moonshadow", "Transfiguration Key"],
					"hunters": [
						{ "id": "sian-halat", "build": "Build Niv. 120" },
						{ "id": "isla-wright", "build": "Build Niv. 120 (A)" },
						{ "id": "sung-il-hwan", "build": "Build Niv. 120" }
					],
					"shadows": ["uros", "cerbie", "skull"]
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
	]
}
```

- [ ] **Step 2: Verify JSON is valid**

```bash
node -e "require('./src/data/teams/power-destruction.json'); console.log('OK')"
```
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add src/data/teams/power-destruction.json
git commit -m "feat: migrate power-destruction config to configs[] structure"
```

---

### Task 5: Migrate `src/data/teams/guild-boss.json`

**Files:**
- Modify: `src/data/teams/guild-boss.json`

Same migration pattern — hunter entries keep their `role` field. No `shadows` field in guild boss configs.

- [ ] **Step 1: Replace the file content**

```json
{
	"weaknessRotation": [
		{
			"weakness": [],
			"name": "Fachtna, the King of the Desert",
			"icon": "assets/guild-boss/Boss_Fachtna__the_King_of_the_Desert_Icon.png",
			"active": false
		},
		{
			"weakness": ["Wind", "Fire", "Water"],
			"name": "Manticore, the Eager Engager",
			"icon": "assets/guild-boss/Boss_Manticore__the_Eager_Engager_Icon.png",
			"active": false
		},
		{
			"weakness": ["Wind", "Light"],
			"name": "Queen Ant",
			"icon": "assets/guild-boss/Boss_Queen_Ant_Icon.png",
			"active": true
		}
	],
	"teams": [
		{
			"element": "Wind",
			"status": "active",
			"monarch": "monarch-of-steel",
			"configs": [
				{
					"label": "Équipe 1",
					"jinwooWeapons": ["Stormbringer", "Thetis' Grimoire"],
					"hunters": [
						{ "id": "sugimoto-reiji", "role": "Elemental Stacker", "build": "Build Niv. 120" },
						{ "id": "sung-jinah", "role": "Supporter", "build": "Build Niv. 120 (A)" },
						{ "id": "lennart-niermann", "role": "Striker", "build": "Build Niv. 120" },
						{ "id": "soyeon", "role": "Breaker", "build": "Build Niv. 120" },
						{ "id": "han-se-mi", "role": "Supporter", "build": "Build Niv. 120 (B)" },
						{ "id": "amamiya-mirei", "role": "Striker", "build": "Build Niv. 120" }
					]
				},
				{
					"label": "Équipe 2",
					"jinwooWeapons": [],
					"hunters": []
				},
				{
					"label": "Équipe 3",
					"jinwooWeapons": [],
					"hunters": []
				}
			]
		},
		{
			"element": "Water",
			"status": "active",
			"monarch": "monarch-of-steel",
			"configs": [
				{
					"label": "Équipe 1",
					"jinwooWeapons": ["Allon's Orb", "Thetis' Grimoire"],
					"hunters": [
						{ "id": "meri-laine", "role": "Elemental Stacker", "build": "Build Niv. 120" },
						{ "id": "frieren", "role": "Supporter", "build": "Build Niv. 120 (B)" },
						{ "id": "cha-hae-in-pure-sword-princess", "role": "Striker", "build": "Build Niv. 120" },
						{ "id": "seorin", "role": "Breaker", "build": "Build Niv. 120" },
						{ "id": "elena-renault", "role": "Supporter", "build": "Build Niv. 120 (A)" },
						{ "id": "alicia-blanche", "role": "Striker", "build": "Build Niv. 120" }
					]
				},
				{
					"label": "Équipe 2",
					"jinwooWeapons": [],
					"hunters": []
				},
				{
					"label": "Équipe 3",
					"jinwooWeapons": [],
					"hunters": []
				}
			]
		},
		{
			"element": "Fire",
			"status": "active",
			"monarch": "monarch-of-steel",
			"configs": [
				{
					"label": "Équipe 1",
					"jinwooWeapons": ["Glorious Demise", "Ennio's Roar"],
					"hunters": [
						{ "id": "yuqi", "role": "Breaker", "build": "Build Niv. 120" },
						{ "id": "christopher-reed", "role": "Elemental Stacker", "build": "Build Niv. 120" },
						{ "id": "gina", "role": "Supporter", "build": "Build Niv. 120 (A)" },
						{ "id": "stark", "role": "Breaker", "build": "Build Niv. 100" },
						{ "id": "fern", "role": "Striker", "build": "Build Niv. 120" },
						{ "id": "tawata-kanae", "role": "Striker", "build": "Build Niv. 120" }
					]
				},
				{
					"label": "Équipe 2",
					"jinwooWeapons": [],
					"hunters": []
				},
				{
					"label": "Équipe 3",
					"jinwooWeapons": [],
					"hunters": []
				}
			]
		},
		{
			"element": "Light",
			"status": "active",
			"monarch": "monarch-of-steel",
			"configs": [
				{
					"label": "Équipe 1",
					"jinwooWeapons": ["Phantomblade", "Hero's Sword"],
					"hunters": [
						{ "id": "go-gunhee", "role": "Breaker", "build": "Build Niv. 120" },
						{ "id": "laura-walker", "role": "Supporter", "build": "Build Niv. 120 (A)" },
						{ "id": "thomas-andre", "role": "Striker", "build": "Build Niv. 120" },
						{ "id": "min-byung-gu", "role": "Supporter", "build": "Build Niv. 120 (B)" },
						{ "id": "miyeon", "role": "Striker", "build": "Build Niv. 120" },
						{ "id": "antoine-martinez", "role": "Elemental Stacker", "build": "Build Niv. 120" }
					]
				},
				{
					"label": "Équipe 2",
					"jinwooWeapons": [],
					"hunters": []
				},
				{
					"label": "Équipe 3",
					"jinwooWeapons": [],
					"hunters": []
				}
			]
		},
		{
			"element": "Dark",
			"status": "active",
			"monarch": "monarch-of-steel",
			"configs": [
				{
					"label": "Équipe 1",
					"jinwooWeapons": ["Moonshadow", "Transfiguration Key"],
					"hunters": [
						{ "id": "son-kihoon", "role": "Breaker", "build": "Build Niv. 120" },
						{ "id": "sian-halat", "role": "Elemental Stacker", "build": "Build Niv. 120" },
						{ "id": "sung-il-hwan", "role": "Striker", "build": "Build Niv. 120" },
						{ "id": "lee-bora", "role": "Supporter", "build": "Build Niv. 120 (B)" },
						{ "id": "isla-wright", "role": "Supporter", "build": "Build Niv. 120 (A)" },
						{ "id": "minnie", "role": "Striker", "build": "Build Niv. 120" }
					]
				},
				{
					"label": "Équipe 2",
					"jinwooWeapons": [],
					"hunters": []
				},
				{
					"label": "Équipe 3",
					"jinwooWeapons": [],
					"hunters": []
				}
			]
		}
	]
}
```

- [ ] **Step 2: Verify JSON is valid**

```bash
node -e "require('./src/data/teams/guild-boss.json'); console.log('OK')"
```
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add src/data/teams/guild-boss.json
git commit -m "feat: migrate guild-boss config to configs[] structure"
```

---

### Task 6: Update `TeamGuidePowerDestruction.tsx`

**Files:**
- Modify: `src/pages/TeamGuidePowerDestruction.tsx`

This task rewrites the page's init functions (now take a config index), adds `activeConfigIndex` + `selectedMonarch` state, updates `switchElement`, adds `switchConfig`, updates the JSX to include `TeamConfigTabs` and `MonarchSelector` sections.

- [ ] **Step 1: Add imports at top of file** (after existing imports)

Add these three lines after the existing imports block:

```tsx
import { MonarchSelector } from '../components/team/MonarchSelector'
import { TeamConfigTabs } from '../components/team/TeamConfigTabs'
import { DEFAULT_MONARCH } from '../components/team/monarchs'
import type { MonarchId } from '../components/team/monarchs'
```

- [ ] **Step 2: Add TypeScript interfaces** (after the imports, before `getGameWeek`)

```tsx
interface PdTeamConfig {
  label: string
  jinwooWeapons: string[]
  hunters: { id: string; build?: string }[]
  shadows: string[]
}

interface PdTeamEntry {
  element: string
  status: string
  monarch?: string
  configs: PdTeamConfig[]
}
```

- [ ] **Step 3: Update `initHunters` to accept config index**

Replace the existing `initHunters` function:

```tsx
const initHunters = (el: string, ci = 0): [Hunter | null, Hunter | null, Hunter | null] => {
  const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === el && t.status === 'active')
  if (!team) return [null, null, null]
  const cfg = team.configs[ci] ?? team.configs[0]
  if (!cfg?.hunters?.length) return [null, null, null]
  return cfg.hunters.slice(0, 3).map((e) => hunterById.get(e.id) ?? null) as [
    Hunter | null,
    Hunter | null,
    Hunter | null,
  ]
}
```

- [ ] **Step 4: Update `initBuilds` to accept config index**

Replace the existing `initBuilds` function:

```tsx
const initBuilds = (el: string, ci = 0): [string | undefined, string | undefined, string | undefined] => {
  const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === el && t.status === 'active')
  if (!team) return [undefined, undefined, undefined]
  const cfg = team.configs[ci] ?? team.configs[0]
  if (!cfg?.hunters?.length) return [undefined, undefined, undefined]
  return cfg.hunters.slice(0, 3).map((e) => e.build ?? undefined) as [
    string | undefined,
    string | undefined,
    string | undefined,
  ]
}
```

- [ ] **Step 5: Update `initShadows` to accept config index**

Replace the existing `initShadows` function:

```tsx
const initShadows = (el: string, ci = 0): [ShadowData | null, ShadowData | null, ShadowData | null] => {
  const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === el && t.status === 'active')
  if (!team) return [null, null, null]
  const cfg = team.configs[ci] ?? team.configs[0]
  if (!cfg?.shadows?.length) return [null, null, null]
  return cfg.shadows.slice(0, 3).map((id) => SHADOWS_BY_ID[id] ?? null) as [
    ShadowData | null,
    ShadowData | null,
    ShadowData | null,
  ]
}
```

- [ ] **Step 6: Update `initWeapons` to accept config index**

Replace the existing `initWeapons` function:

```tsx
const initWeapons = (el: string, ci = 0): [WeaponData | null, WeaponData | null] => {
  const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === el)
  const cfg = team?.configs[ci] ?? team?.configs[0]
  const names = cfg?.jinwooWeapons ?? []
  return [JINWOO_WEAPONS_BY_NAME.get(names[0]) ?? null, JINWOO_WEAPONS_BY_NAME.get(names[1]) ?? null]
}
```

- [ ] **Step 7: Add new state variables** (inside the component, after the existing `useState` declarations)

After `const [selectedWeapons, setSelectedWeapons] = useState(...)`, add:

```tsx
const [activeConfigIndex, setActiveConfigIndex] = useState(0)
const [selectedMonarch, setSelectedMonarch] = useState<MonarchId>(() => {
  const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === defaultElement)
  return (team?.monarch as MonarchId | undefined) ?? DEFAULT_MONARCH
})
```

- [ ] **Step 8: Update `switchElement` to reset config index and monarch**

Replace the existing `switchElement` function:

```tsx
const switchElement = (el: string) => {
  setActiveElement(el)
  setActiveConfigIndex(0)
  const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === el)
  setSelectedMonarch((team?.monarch as MonarchId | undefined) ?? DEFAULT_MONARCH)
  setSelectedWeapons(initWeapons(el, 0))
  if (team?.status === 'coming-soon') {
    setSelectedHunters(randomHunters())
    setPreferredBuilds([undefined, undefined, undefined])
    setSelectedShadows(randomShadows())
  } else {
    setSelectedHunters(initHunters(el, 0))
    setPreferredBuilds(initBuilds(el, 0))
    setSelectedShadows(initShadows(el, 0))
  }
}
```

- [ ] **Step 9: Add `switchConfig` function** (after `switchElement`)

```tsx
const switchConfig = (ci: number) => {
  setActiveConfigIndex(ci)
  setSelectedWeapons(initWeapons(activeElement, ci))
  const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === activeElement)
  const hasCfgData = (team?.configs[ci]?.hunters?.length ?? 0) > 0
  if (!hasCfgData) {
    setSelectedHunters(randomHunters())
    setPreferredBuilds([undefined, undefined, undefined])
    setSelectedShadows(randomShadows())
  } else {
    setSelectedHunters(initHunters(activeElement, ci))
    setPreferredBuilds(initBuilds(activeElement, ci))
    setSelectedShadows(initShadows(activeElement, ci))
  }
}
```

- [ ] **Step 10: Add `TeamConfigTabs` to JSX** (in SECTION 01, after the `<ElementTabs>` div)

After the closing `</div>` of the ElementTabs wrapper, add:

```tsx
{(() => {
  const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === activeElement)
  const configs = team?.configs ?? []
  if (configs.length <= 1) return null
  return (
    <div style={{ marginTop: 16 }}>
      <TeamConfigTabs
        labels={configs.map((c) => c.label)}
        active={activeConfigIndex}
        hasData={configs.map((c) => c.hunters.length > 0)}
        onChange={switchConfig}
      />
    </div>
  )
})()}
```

- [ ] **Step 11: Add SECTION 05 monarch selector** (after the closing `</section>` of SECTION 04)

```tsx
<section>
  <SectionHeader
    tag='// SECTION 05'
    title='Puissance rémanente / Successeur'
    description='Monarque actif pour cette composition.'
  />
  <MonarchSelector selected={selectedMonarch} onChange={setSelectedMonarch} />
</section>
```

- [ ] **Step 12: Build to verify TypeScript**

```bash
npm run build 2>&1 | tail -20
```
Expected: build succeeds with no TypeScript errors. Fix any type errors before continuing.

- [ ] **Step 13: Commit**

```bash
git add src/pages/TeamGuidePowerDestruction.tsx
git commit -m "feat: add config tabs and monarch selector to Power & Destruction page"
```

---

### Task 7: Update `TeamGuideGuildBoss.tsx`

**Files:**
- Modify: `src/pages/TeamGuideGuildBoss.tsx`

Same pattern as Task 6 but adapted for Guild Boss (6 hunters, no shadows, uses `SlotState[]`).

- [ ] **Step 1: Add imports** (after existing imports)

```tsx
import { MonarchSelector } from '../components/team/MonarchSelector'
import { TeamConfigTabs } from '../components/team/TeamConfigTabs'
import { DEFAULT_MONARCH } from '../components/team/monarchs'
import type { MonarchId } from '../components/team/monarchs'
```

- [ ] **Step 2: Add TypeScript interfaces** (after the existing `SlotState` and `BossEntry` interfaces)

```tsx
interface GbTeamConfig {
  label: string
  jinwooWeapons: string[]
  hunters: { id: string; role: string; build?: string }[]
}

interface GbTeamEntry {
  element: string
  status: string
  monarch?: string
  configs: GbTeamConfig[]
}
```

- [ ] **Step 3: Update `initSlots` to accept config index**

Replace existing `initSlots`:

```tsx
const initSlots = (el: string, ci = 0): SlotState[] => {
  const team = (teamsConfig.teams as GbTeamEntry[]).find((t) => t.element === el && t.status === 'active')
  if (!team) return RANDOM_ROLES.map((role) => ({ hunter: null, role }))
  const cfg = team.configs[ci] ?? team.configs[0]
  if (!cfg?.hunters?.length) return RANDOM_ROLES.map((role) => ({ hunter: null, role }))
  return cfg.hunters.map((entry) => ({
    hunter: hunterById.get(entry.id) ?? null,
    role: entry.role,
    preferredBuild: entry.build ?? undefined,
  }))
}
```

- [ ] **Step 4: Update `initWeapons` to accept config index**

Replace existing `initWeapons`:

```tsx
const initWeapons = (el: string, ci = 0): [WeaponData | null, WeaponData | null] => {
  const team = (teamsConfig.teams as GbTeamEntry[]).find((t) => t.element === el)
  const cfg = team?.configs[ci] ?? team?.configs[0]
  const names = cfg?.jinwooWeapons ?? []
  return [JINWOO_WEAPONS_BY_NAME.get(names[0]) ?? null, JINWOO_WEAPONS_BY_NAME.get(names[1]) ?? null]
}
```

- [ ] **Step 5: Add new state variables** (after existing `useState` declarations inside component)

After `const [selectedWeapons, setSelectedWeapons] = useState(...)`, add:

```tsx
const [activeConfigIndex, setActiveConfigIndex] = useState(0)
const [selectedMonarch, setSelectedMonarch] = useState<MonarchId>(() => {
  const team = (teamsConfig.teams as GbTeamEntry[]).find((t) => t.element === defaultElement)
  return (team?.monarch as MonarchId | undefined) ?? DEFAULT_MONARCH
})
```

- [ ] **Step 6: Update `switchElement`**

Replace existing `switchElement`:

```tsx
const switchElement = (el: string) => {
  setActiveElement(el)
  setActiveConfigIndex(0)
  const team = (teamsConfig.teams as GbTeamEntry[]).find((t) => t.element === el)
  setSelectedMonarch((team?.monarch as MonarchId | undefined) ?? DEFAULT_MONARCH)
  setSelectedWeapons(initWeapons(el, 0))
  if (team?.status === 'coming-soon') {
    setSlots(randomSlots())
  } else {
    setSlots(initSlots(el, 0))
  }
}
```

- [ ] **Step 7: Add `switchConfig` function** (after `switchElement`)

```tsx
const switchConfig = (ci: number) => {
  setActiveConfigIndex(ci)
  setSelectedWeapons(initWeapons(activeElement, ci))
  const team = (teamsConfig.teams as GbTeamEntry[]).find((t) => t.element === activeElement)
  const hasCfgData = (team?.configs[ci]?.hunters?.length ?? 0) > 0
  if (!hasCfgData) {
    setSlots(randomSlots())
  } else {
    setSlots(initSlots(activeElement, ci))
  }
}
```

- [ ] **Step 8: Add `TeamConfigTabs` to JSX** (in SECTION 01, after the ElementTabs wrapper div)

```tsx
{(() => {
  const team = (teamsConfig.teams as GbTeamEntry[]).find((t) => t.element === activeElement)
  const configs = team?.configs ?? []
  if (configs.length <= 1) return null
  return (
    <div style={{ marginTop: 16 }}>
      <TeamConfigTabs
        labels={configs.map((c) => c.label)}
        active={activeConfigIndex}
        hasData={configs.map((c) => c.hunters.length > 0)}
        onChange={switchConfig}
      />
    </div>
  )
})()}
```

- [ ] **Step 9: Add SECTION 04 monarch selector** (after closing `</section>` of the Composition section, which is currently SECTION 03)

```tsx
<section>
  <SectionHeader
    tag='// SECTION 04'
    title='Puissance rémanente / Successeur'
    description='Monarque actif pour cette composition.'
  />
  <MonarchSelector selected={selectedMonarch} onChange={setSelectedMonarch} />
</section>
```

- [ ] **Step 10: Build to verify TypeScript**

```bash
npm run build 2>&1 | tail -20
```
Expected: build succeeds with no errors.

- [ ] **Step 11: Manual smoke test**

```bash
npm run dev
```

Open `http://localhost:5173`. Navigate to Power & Destruction and Guild Boss pages. Verify:
- 3 config tabs appear ("Équipe 1", "Équipe 2", "Équipe 3")
- Switching tabs updates hunters/shadows/weapons
- "Équipe 2" and "Équipe 3" tabs show as muted (no data)
- Monarch selector shows 3 portrait cards
- Monarque d'Acier is selected by default
- Switching element resets config to 0 and monarch to Steel
- Monarch images load from `/assets/workshop/...`

- [ ] **Step 12: Commit**

```bash
git add src/pages/TeamGuideGuildBoss.tsx
git commit -m "feat: add config tabs and monarch selector to Guild Boss page"
```
