import { useState } from 'preact/hooks'
import { ElementTabs } from '../components/team/ElementTabs'
import { HunterSlot } from '../components/team/HunterSlot'
import { JinwooPanel } from '../components/team/JinwooPanel'
import { ShadowSlot } from '../components/team/ShadowSlot'
import { SHADOWS, SHADOWS_BY_ID } from '../components/team/shadows'
import type { Hunter, ShadowData, WeaponData } from '../components/team/types'
import { JINWOO_WEAPONS_BY_NAME } from '../components/team/weapons'
import teamsConfig from '../data/teams/power-destruction.json'

export function TeamGuidePowerDestruction({ hunters, onBack }: { hunters: Hunter[]; onBack: () => void }) {
	const hunterById = new Map(hunters.map((h) => [h.id, h]))
	const otherHunters = hunters.filter((h) => h.id !== 'sung-jinwoo')
	const firstActive = teamsConfig.teams.find((t) => t.status === 'active')

	// ── Init helpers ──────────────────────────────────────────────────────────

	const initHunters = (el: string): [Hunter | null, Hunter | null, Hunter | null] => {
		const team = teamsConfig.teams.find((t) => t.element === el && t.status === 'active')
		if (!team) return [null, null, null]
		return team.hunters.slice(0, 3).map((e) => hunterById.get(e.id) ?? null) as [
			Hunter | null,
			Hunter | null,
			Hunter | null,
		]
	}

	const initBuilds = (el: string): [string | undefined, string | undefined, string | undefined] => {
		const team = teamsConfig.teams.find((t) => t.element === el && t.status === 'active')
		if (!team) return [undefined, undefined, undefined]
		return team.hunters.slice(0, 3).map((e) => e.build ?? undefined) as [
			string | undefined,
			string | undefined,
			string | undefined,
		]
	}

	const initShadows = (el: string): [ShadowData | null, ShadowData | null, ShadowData | null] => {
		const team = teamsConfig.teams.find((t) => t.element === el && t.status === 'active')
		if (!team) return [null, null, null]
		return team.shadows.slice(0, 3).map((id) => SHADOWS_BY_ID[id] ?? null) as [
			ShadowData | null,
			ShadowData | null,
			ShadowData | null,
		]
	}

	const randomHunters = (): [Hunter | null, Hunter | null, Hunter | null] => {
		const s = [...otherHunters].sort(() => Math.random() - 0.5)
		return [s[0] ?? null, s[1] ?? null, s[2] ?? null]
	}

	const randomShadows = (): [ShadowData | null, ShadowData | null, ShadowData | null] => {
		const s = [...SHADOWS].sort(() => Math.random() - 0.5)
		return [s[0] ?? null, s[1] ?? null, s[2] ?? null]
	}

	// ── State ─────────────────────────────────────────────────────────────────

	const [activeElement, setActiveElement] = useState(firstActive?.element ?? 'Wind')
	const [selectedHunters, setSelectedHunters] = useState<[Hunter | null, Hunter | null, Hunter | null]>(() =>
		initHunters(activeElement),
	)
	const [preferredBuilds, setPreferredBuilds] = useState<
		[string | undefined, string | undefined, string | undefined]
	>(() => initBuilds(activeElement))
	const [selectedShadows, setSelectedShadows] = useState<[ShadowData | null, ShadowData | null, ShadowData | null]>(
		() => initShadows(activeElement),
	)
	const initWeapons = (el: string): [WeaponData | null, WeaponData | null] => {
		const team = teamsConfig.teams.find((t) => t.element === el)
		const names = team?.jinwooWeapons ?? []
		return [JINWOO_WEAPONS_BY_NAME.get(names[0]) ?? null, JINWOO_WEAPONS_BY_NAME.get(names[1]) ?? null]
	}

	const [selectedWeapons, setSelectedWeapons] = useState<[WeaponData | null, WeaponData | null]>(() =>
		initWeapons(activeElement),
	)

	// ── Slot setters ──────────────────────────────────────────────────────────

	const setHunterSlot = (i: 0 | 1 | 2, h: Hunter | null) => {
		setSelectedHunters((prev) => {
			const next = [...prev] as typeof prev
			next[i] = h
			return next
		})
		setPreferredBuilds((prev) => {
			const next = [...prev] as typeof prev
			next[i] = undefined
			return next
		})
	}

	const setShadowSlot = (i: 0 | 1 | 2, s: ShadowData | null) =>
		setSelectedShadows((prev) => {
			const next = [...prev] as typeof prev
			next[i] = s
			return next
		})

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
			setSelectedHunters(randomHunters())
			setPreferredBuilds([undefined, undefined, undefined])
			setSelectedShadows(randomShadows())
		} else {
			setSelectedHunters(initHunters(el))
			setPreferredBuilds(initBuilds(el))
			setSelectedShadows(initShadows(el))
		}
	}

	// ── Available lists ───────────────────────────────────────────────────────

	const takenHunterIds = new Set(selectedHunters.filter(Boolean).map((h) => h!.id))
	const takenShadowNames = new Set(selectedShadows.filter(Boolean).map((s) => s!.name))

	const availableHunters = (i: 0 | 1 | 2) =>
		otherHunters.filter((h) => h.id !== selectedHunters[i]?.id && !takenHunterIds.has(h.id))

	const availableShadows = (i: 0 | 1 | 2) =>
		SHADOWS.filter((s) => s.name !== selectedShadows[i]?.name && !takenShadowNames.has(s.name))

	// ── Render ────────────────────────────────────────────────────────────────

	return (
		<div class='min-h-screen bg-zinc-900 text-zinc-100'>
			<header class='sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur px-6 py-4 flex items-center gap-4'>
				<button type='button' onClick={onBack} class='text-zinc-400 hover:text-zinc-100 transition-colors'>
					← Retour
				</button>
				<h1 class='text-lg font-bold'>
					Team Guides — <span class='text-emerald-400'>Power &amp; Destruction</span>
				</h1>
			</header>

			<main class='max-w-6xl mx-auto px-4 py-10 space-y-8'>
				<ElementTabs teams={teamsConfig.teams} activeElement={activeElement} onSwitch={switchElement} />

				<JinwooPanel selectedWeapons={selectedWeapons} onWeaponSelect={setWeaponSlot} />

				<hr class='border-zinc-800' />

				<section>
					<p class='text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4'>Chasseurs</p>
					<div class='grid grid-cols-3 gap-4'>
						{([0, 1, 2] as const).map((i) => (
							<HunterSlot
								key={i}
								slot={i + 1}
								selected={selectedHunters[i]}
								hunters={availableHunters(i)}
								preferredBuild={preferredBuilds[i]}
								onSelect={(h) => setHunterSlot(i, h)}
							/>
						))}
					</div>
				</section>

				<hr class='border-zinc-800' />

				<section>
					<p class='text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4'>Ombres</p>
					<div class='grid grid-cols-3 gap-4'>
						{([0, 1, 2] as const).map((i) => (
							<ShadowSlot
								key={i}
								slot={i + 1}
								selected={selectedShadows[i]}
								shadows={availableShadows(i)}
								onSelect={(s) => setShadowSlot(i, s)}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	)
}
