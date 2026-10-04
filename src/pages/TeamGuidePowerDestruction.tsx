import { useState } from 'preact/hooks'
import { RunesSection } from '../components/hunter/RunesSection'
import { BackLink } from '../components/sla/BackLink'
import { ELEMENT_ICON, ELEMENT_RESISTANCE_ICON } from '../components/sla/elements'
import { SectionHeader } from '../components/sla/SectionHeader'
import { AdvancementEffectsTable } from '../components/team/AdvancementEffectsTable'
import { ElementTabs } from '../components/team/ElementTabs'
import { HunterSlot } from '../components/team/HunterSlot'
import { JinwooPanel } from '../components/team/JinwooPanel'
import type { MonarchId } from '../components/team/monarchs'
import { DEFAULT_MONARCH } from '../components/team/monarchs'
import { type PuissanceMode, PuissanceRemanente } from '../components/team/PuissanceRemanente'
import { ShadowSlot } from '../components/team/ShadowSlot'
import { SHADOWS, SHADOWS_BY_ID } from '../components/team/shadows'
import { DEFAULT_SUCCESSOR, type SuccessorId } from '../components/team/successors'
import { TeamConfigTabs } from '../components/team/TeamConfigTabs'
import type { Hunter, ShadowData, WeaponData } from '../components/team/types'
import { JINWOO_WEAPONS_BY_NAME } from '../components/team/weapons'
import teamsConfig from '../data/teams/power-destruction.json'

// ── Team config types ─────────────────────────────────────────────────────────

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

// ── Rotation lookup ───────────────────────────────────────────────────────────

interface RotationEntry {
	weakness: string[]
	resistance: string[]
	active: boolean
}

function getCurrentRotation(): RotationEntry | null {
	return (teamsConfig.weaknessRotation as RotationEntry[]).find((r) => r.active) ?? null
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

const modeForElement = (el: string): PuissanceMode => (el === 'Wind' ? 'successor' : 'monarch')

// ── Sub-component: rotation banner ───────────────────────────────────────────

function WeekRotationBanner({ rotation }: { rotation: RotationEntry | null }) {
	const week = getGameWeek(new Date())
	const { start, end } = getWeekDateRange(new Date())

	return (
		<div className='bg-bg-surface border border-border-sla overflow-hidden'>
			<div className='flex items-center justify-between px-4 py-3 border-b border-border-sla'>
				<div>
					<p className='text-label text-text-sla-muted uppercase tracking-wider'>Rotation hebdomadaire</p>
					<p className='text-sm font-semibold text-text-sla'>
						Semaine {week}
						<span className='ml-2 text-xs font-normal text-text-sla-secondary'>
							{fmtDate(start)} – {fmtDate(end)}
						</span>
					</p>
				</div>
			</div>

			{rotation ? (
				<div className='flex'>
					<div className='flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-weak-bg border-r border-border-sla'>
						<span className='text-meta font-bold text-weak uppercase tracking-widest'>Faiblesses</span>
						<div className='flex gap-3 flex-wrap justify-center'>
							{rotation.weakness.map((el) =>
								ELEMENT_ICON[el] ? (
									<div key={el} className='flex flex-col items-center gap-1'>
										<img
											src={ELEMENT_ICON[el]}
											alt={el}
											className='w-9 h-9 object-contain drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]'
										/>
										<span className='text-label text-weak font-medium'>{el}</span>
									</div>
								) : null,
							)}
						</div>
					</div>
					<div className='flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-resist-bg'>
						<span className='text-meta font-bold text-resist uppercase tracking-widest'>Résistances</span>
						<div className='flex gap-3 flex-wrap justify-center'>
							{rotation.resistance.map((el) =>
								ELEMENT_RESISTANCE_ICON[el] ? (
									<div key={el} className='flex flex-col items-center gap-1'>
										<img
											src={ELEMENT_RESISTANCE_ICON[el]}
											alt={el}
											className='w-9 h-9 object-contain drop-shadow-[0_0_6px_rgba(248,113,113,0.5)]'
										/>
										<span className='text-label text-resist font-medium'>{el}</span>
									</div>
								) : null,
							)}
						</div>
					</div>
				</div>
			) : (
				<p className='px-4 py-3 text-sm text-text-sla-muted'>Rotation inconnue pour cette semaine.</p>
			)}
		</div>
	)
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function TeamGuidePowerDestruction({ hunters }: { hunters: Hunter[] }) {
	const hunterById = new Map(hunters.map((h) => [h.id, h]))
	const otherHunters = hunters.filter((h) => h.id !== 'sung-jinwoo')

	const rotation = getCurrentRotation()
	const defaultElement = getDefaultElement(rotation)

	// ── Init helpers ──────────────────────────────────────────────────────────

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

	const initWeapons = (el: string, ci = 0): [WeaponData | null, WeaponData | null] => {
		const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === el)
		const cfg = team?.configs[ci] ?? team?.configs[0]
		const names = cfg?.jinwooWeapons ?? []
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
	const [activeConfigIndex, setActiveConfigIndex] = useState(0)
	const [selectedMonarch, setSelectedMonarch] = useState<MonarchId>(() => {
		const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === defaultElement)
		return (team?.monarch as MonarchId | undefined) ?? DEFAULT_MONARCH
	})
	const [selectedSuccessor, setSelectedSuccessor] = useState<SuccessorId>(DEFAULT_SUCCESSOR)
	const [puissanceMode, setPuissanceMode] = useState<PuissanceMode>(() => modeForElement(defaultElement))

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
		setActiveConfigIndex(0)
		const team = (teamsConfig.teams as PdTeamEntry[]).find((t) => t.element === el)
		setSelectedMonarch((team?.monarch as MonarchId | undefined) ?? DEFAULT_MONARCH)
		setSelectedSuccessor(DEFAULT_SUCCESSOR)
		setPuissanceMode(modeForElement(el))
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

	// ── Available lists ───────────────────────────────────────────────────────

	const takenHunterIds = new Set(selectedHunters.filter(Boolean).map((h) => h?.id))
	const takenShadowNames = new Set(selectedShadows.filter(Boolean).map((s) => s?.name))

	const availableHunters = (i: 0 | 1 | 2) =>
		otherHunters.filter((h) => h.id !== selectedHunters[i]?.id && !takenHunterIds.has(h.id))

	const availableShadows = (i: 0 | 1 | 2) =>
		SHADOWS.filter((s) => s.name !== selectedShadows[i]?.name && !takenShadowNames.has(s.name))

	const teamKey = `${activeElement}-${activeConfigIndex}`

	// ── Render ────────────────────────────────────────────────────────────────

	return (
		<div className='sla-container' style={{ paddingTop: 32, paddingBottom: 64 }}>
			<BackLink />
			<div style={{ marginTop: 24 }}>
				<SectionHeader
					tag='// TEAM GUIDE'
					title='Power & Destruction'
					as='h1'
					description='Composition par élément actif.'
				/>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
				<section>
					<SectionHeader
						tag='// SECTION 01'
						title='Rotation hebdomadaire'
						description='Faiblesses et résistances élémentaires de la semaine en cours.'
					/>
					<WeekRotationBanner rotation={rotation} />
					<div style={{ marginTop: 16 }}>
						<ElementTabs
							teams={teamsConfig.teams}
							activeElement={activeElement}
							onSwitch={switchElement}
							weekWeaknesses={rotation?.weakness ?? []}
							weekResistances={rotation?.resistance ?? []}
						/>
					</div>
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
				</section>

				<section>
					<SectionHeader
						tag='// SECTION 02'
						title='Armes de Jinwoo'
						description='Sélectionne les armes optimales pour le contenu actif.'
					/>
					<JinwooPanel selectedWeapons={selectedWeapons} onWeaponSelect={setWeaponSlot} />
					<div style={{ marginTop: 24 }}>
						<RunesSection />
					</div>
				</section>

				<section>
					<SectionHeader
						tag='// SECTION 03'
						title='Chasseurs'
						description='Trois chasseurs recommandés pour cet élément actif.'
					/>
					<div key={teamKey} className='sla-team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
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
					<AdvancementEffectsTable hunters={selectedHunters} />
				</section>

				<section>
					<SectionHeader
						tag='// SECTION 04'
						title='Ombres'
						description="Ombres recommandées pour renforcer l'équipe."
					/>
					<div key={teamKey} className='sla-team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
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

				<section>
					<SectionHeader
						tag='// SECTION 05'
						title='Puissance rémanente / Successeur'
						description='Monarque ou Successeur actif pour cette composition.'
					/>
					<PuissanceRemanente
						mode={puissanceMode}
						onModeChange={setPuissanceMode}
						monarchSelected={selectedMonarch}
						onMonarchChange={setSelectedMonarch}
						successorSelected={selectedSuccessor}
						onSuccessorChange={setSelectedSuccessor}
					/>
				</section>
			</div>
		</div>
	)
}
