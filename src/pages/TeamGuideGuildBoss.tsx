import { useState } from 'preact/hooks'
import { ElementTabs } from '../components/team/ElementTabs'
import { HunterSlot } from '../components/team/HunterSlot'
import { JinwooPanel } from '../components/team/JinwooPanel'
import type { Hunter, WeaponData } from '../components/team/types'
import { JINWOO_WEAPONS_BY_NAME } from '../components/team/weapons'
import teamsConfig from '../data/teams/guild-boss.json'

const RANDOM_ROLES = ['Striker', 'Striker', 'Breaker', 'Elemental Stacker', 'Supporter', 'Supporter']

interface SlotState {
	hunter: Hunter | null
	role: string
	preferredBuild?: string
}

export function TeamGuideGuildBoss({ hunters, onBack }: { hunters: Hunter[]; onBack: () => void }) {
	const hunterById = new Map(hunters.map((h) => [h.id, h]))
	const otherHunters = hunters.filter((h) => h.id !== 'sung-jinwoo')
	const firstActive = teamsConfig.teams.find((t) => t.status === 'active')

	// ── Init helpers ──────────────────────────────────────────────────────────

	const initSlots = (el: string): SlotState[] => {
		const team = teamsConfig.teams.find((t) => t.element === el && t.status === 'active')
		if (!team || team.hunters.length === 0) {
			return RANDOM_ROLES.map((role) => ({ hunter: null, role }))
		}
		return team.hunters.map((entry) => ({
			hunter: hunterById.get(entry.id) ?? null,
			role: entry.role,
			preferredBuild: entry.build ?? undefined,
		}))
	}

	const randomSlots = (): SlotState[] => {
		const shuffled = [...otherHunters].sort(() => Math.random() - 0.5).slice(0, 6)
		return RANDOM_ROLES.map((role, i) => ({ hunter: shuffled[i] ?? null, role }))
	}

	// ── State ─────────────────────────────────────────────────────────────────

	const [activeElement, setActiveElement] = useState(firstActive?.element ?? 'Wind')
	const [slots, setSlots] = useState<SlotState[]>(() => initSlots(activeElement))
	const initWeapons = (el: string): [WeaponData | null, WeaponData | null] => {
		const team = teamsConfig.teams.find((t) => t.element === el)
		const names = team?.jinwooWeapons ?? []
		return [JINWOO_WEAPONS_BY_NAME.get(names[0]) ?? null, JINWOO_WEAPONS_BY_NAME.get(names[1]) ?? null]
	}

	const [selectedWeapons, setSelectedWeapons] = useState<[WeaponData | null, WeaponData | null]>(() =>
		initWeapons(activeElement),
	)

	// ── Slot setters ──────────────────────────────────────────────────────────

	const setSlot = (i: number, h: Hunter | null) =>
		setSlots((prev) => prev.map((s, idx) => (idx === i ? { ...s, hunter: h, preferredBuild: undefined } : s)))

	const setWeaponSlot = (i: 0 | 1, w: WeaponData | null) =>
		setSelectedWeapons((prev) => {
			const next = [...prev] as typeof prev
			next[i] = w
			return next
		})

	// ── Element switch ────────────────────────────────────────────────────────

	const switchElement = (el: string) => {
		setActiveElement(el)
		setSelectedWeapons(initWeapons(el))
		const team = teamsConfig.teams.find((t) => t.element === el)
		if (team?.status === 'coming-soon') {
			setSlots(randomSlots())
		} else {
			setSlots(initSlots(el))
		}
	}

	// ── Available lists ───────────────────────────────────────────────────────

	const takenIds = new Set(slots.map((s) => s.hunter?.id).filter(Boolean) as string[])

	const availableHunters = (i: number) =>
		otherHunters.filter((h) => h.id !== slots[i]?.hunter?.id && !takenIds.has(h.id))

	// ── Render ────────────────────────────────────────────────────────────────

	return (
		<div class='min-h-screen bg-zinc-900 text-zinc-100'>
			<header class='sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur px-6 py-4 flex items-center gap-4'>
				<button type='button' onClick={onBack} class='text-zinc-400 hover:text-zinc-100 transition-colors'>
					← Retour
				</button>
				<h1 class='text-lg font-bold'>
					Team Guides — <span class='text-amber-400'>Guild Boss</span>
				</h1>
			</header>

			<main class='max-w-6xl mx-auto px-4 py-10 space-y-8'>
				<ElementTabs teams={teamsConfig.teams} activeElement={activeElement} onSwitch={switchElement} />

				<JinwooPanel selectedWeapons={selectedWeapons} onWeaponSelect={setWeaponSlot} />

				<hr class='border-zinc-800' />

				<section>
					<p class='text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4'>Chasseurs</p>
					<div class='grid grid-cols-3 gap-4'>
						{slots.map((s, i) => (
							<HunterSlot
								key={i}
								slot={i + 1}
								selected={s.hunter}
								hunters={availableHunters(i)}
								preferredBuild={s.preferredBuild}
								role={s.role}
								onSelect={(h) => setSlot(i, h)}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	)
}
