import { useState } from 'preact/hooks'
import { ElementTabs } from '../components/team/ElementTabs'
import { HunterSlot } from '../components/team/HunterSlot'
import { JinwooPanel } from '../components/team/JinwooPanel'
import { ShadowSlot } from '../components/team/ShadowSlot'
import { SHADOWS, SHADOWS_BY_ID } from '../components/team/shadows'
import type { Hunter, ShadowData, WeaponData } from '../components/team/types'
import { JINWOO_WEAPONS_BY_NAME } from '../components/team/weapons'
import teamsConfig from '../data/teams/power-destruction.json'

// ── Week helpers ──────────────────────────────────────────────────────────────

// Game weeks start on Thursday. We shift back 3 days (Thu→Mon) to reuse ISO week numbering,
// then add 1 because the game counts the new Thursday as the start of the *next* week.
function getGameWeek(date: Date): number {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
	d.setUTCDate(d.getUTCDate() - 3)
	const day = d.getUTCDay() || 7
	d.setUTCDate(d.getUTCDate() + 4 - day)
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7) + 1
}

// Returns the Thursday–Wednesday range for the game week containing `date`.
function getWeekDateRange(date: Date): { start: Date; end: Date } {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
	const day = d.getUTCDay() // 0=Sun, 4=Thu
	const daysSinceThursday = (day + 3) % 7 // Thu=0, Fri=1, …, Wed=6
	const thursday = new Date(d)
	thursday.setUTCDate(d.getUTCDate() - daysSinceThursday)
	const wednesday = new Date(thursday)
	wednesday.setUTCDate(thursday.getUTCDate() + 6)
	return { start: thursday, end: wednesday }
}

const MONTHS_FR = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc']

function fmtDate(d: Date): string {
	return `${d.getUTCDate()} ${MONTHS_FR[d.getUTCMonth()]}`
}

// ── Element icons (for the rotation banner) ───────────────────────────────────

const ELEMENT_ICON: Record<string, string> = {
	Dark: '/assets/utils/Dark_Element.png',
	Water: '/assets/utils/Water_Element.png',
	Fire: '/assets/utils/Fire_Element.png',
	Light: '/assets/utils/Light_Element.png',
	Wind: '/assets/utils/Wind_Element.png',
}

const ELEMENT_RESISTANCE_ICON: Record<string, string> = {
	Dark: '/assets/utils/Dark_Element_Resistance.png',
	Water: '/assets/utils/Water_Element_Resistance.png',
	Fire: '/assets/utils/Fire_Element_Resistance.png',
	Light: '/assets/utils/Light_Element_Resistance.png',
	Wind: '/assets/utils/Wind_Element_Resistance.png',
}

// ── Rotation lookup ───────────────────────────────────────────────────────────

interface RotationEntry {
	weakness: string[]
	resistance: string[]
	activeWeeks: number[]
}

function getCurrentRotation(): RotationEntry | null {
	const week = getGameWeek(new Date())
	return (
		(teamsConfig.weaknessRotation as RotationEntry[]).find((r) => r.activeWeeks.includes(week)) ?? null
	)
}

function getDefaultElement(rotation: RotationEntry | null): string {
	if (rotation) {
		for (const el of rotation.weakness) {
			const team = teamsConfig.teams.find((t) => t.element === el && t.status === 'active')
			if (team) return team.element
		}
	}
	return teamsConfig.teams.find((t) => t.status === 'active')?.element ?? 'Wind'
}

// ── Sub-component: rotation banner ───────────────────────────────────────────

function WeekRotationBanner({ rotation }: { rotation: RotationEntry | null }) {
	const week = getGameWeek(new Date())
	const { start, end } = getWeekDateRange(new Date())

	return (
		<div class='bg-zinc-800/40 border border-zinc-700/40 rounded-xl overflow-hidden'>
			<div class='flex items-center justify-between px-4 py-3 border-b border-zinc-700/40'>
				<div>
					<p class='text-[10px] text-zinc-500 uppercase tracking-wider'>Rotation hebdomadaire</p>
					<p class='text-sm font-semibold text-zinc-100'>
						Semaine {week}
						<span class='ml-2 text-xs font-normal text-zinc-400'>
							{fmtDate(start)} – {fmtDate(end)}
						</span>
					</p>
				</div>
			</div>

			{rotation ? (
				<div class='flex'>
					<div class='flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-emerald-950/40 border-r border-zinc-700/40'>
						<span class='text-[11px] font-bold text-emerald-400 uppercase tracking-widest'>Faiblesses</span>
						<div class='flex gap-3 flex-wrap justify-center'>
							{rotation.weakness.map((el) =>
								ELEMENT_ICON[el] ? (
									<div key={el} class='flex flex-col items-center gap-1'>
										<img
											src={ELEMENT_ICON[el]}
											alt={el}
											class='w-9 h-9 object-contain drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]'
										/>
										<span class='text-[9px] text-emerald-300/80 font-medium'>{el}</span>
									</div>
								) : null,
							)}
						</div>
					</div>
					<div class='flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-red-950/40'>
						<span class='text-[11px] font-bold text-red-400 uppercase tracking-widest'>Résistances</span>
						<div class='flex gap-3 flex-wrap justify-center'>
							{rotation.resistance.map((el) =>
								ELEMENT_RESISTANCE_ICON[el] ? (
									<div key={el} class='flex flex-col items-center gap-1'>
										<img
											src={ELEMENT_RESISTANCE_ICON[el]}
											alt={el}
											class='w-9 h-9 object-contain drop-shadow-[0_0_6px_rgba(248,113,113,0.5)]'
										/>
										<span class='text-[9px] text-red-300/80 font-medium'>{el}</span>
									</div>
								) : null,
							)}
						</div>
					</div>
				</div>
			) : (
				<p class='px-4 py-3 text-sm text-zinc-500'>Rotation inconnue pour cette semaine.</p>
			)}
		</div>
	)
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function TeamGuidePowerDestruction({ hunters, onBack }: { hunters: Hunter[]; onBack: () => void }) {
	const hunterById = new Map(hunters.map((h) => [h.id, h]))
	const otherHunters = hunters.filter((h) => h.id !== 'sung-jinwoo')

	const rotation = getCurrentRotation()
	const defaultElement = getDefaultElement(rotation)

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

	const initWeapons = (el: string): [WeaponData | null, WeaponData | null] => {
		const team = teamsConfig.teams.find((t) => t.element === el)
		const names = team?.jinwooWeapons ?? []
		return [JINWOO_WEAPONS_BY_NAME.get(names[0]) ?? null, JINWOO_WEAPONS_BY_NAME.get(names[1]) ?? null]
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

	const [activeElement, setActiveElement] = useState(defaultElement)
	const [selectedHunters, setSelectedHunters] = useState<[Hunter | null, Hunter | null, Hunter | null]>(() =>
		initHunters(defaultElement),
	)
	const [preferredBuilds, setPreferredBuilds] = useState<
		[string | undefined, string | undefined, string | undefined]
	>(() => initBuilds(defaultElement))
	const [selectedShadows, setSelectedShadows] = useState<[ShadowData | null, ShadowData | null, ShadowData | null]>(
		() => initShadows(defaultElement),
	)
	const [selectedWeapons, setSelectedWeapons] = useState<[WeaponData | null, WeaponData | null]>(() =>
		initWeapons(defaultElement),
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

			<main class='max-w-6xl mx-auto px-4 py-6 space-y-6'>
				<WeekRotationBanner rotation={rotation} />

				<ElementTabs
					teams={teamsConfig.teams}
					activeElement={activeElement}
					onSwitch={switchElement}
					weekWeaknesses={rotation?.weakness ?? []}
					weekResistances={rotation?.resistance ?? []}
				/>

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
