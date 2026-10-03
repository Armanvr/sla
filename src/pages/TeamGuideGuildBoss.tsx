import { useState } from 'preact/hooks'
import { RunesSection } from '../components/hunter/RunesSection'
import { BackLink } from '../components/sla/BackLink'
import { SectionHeader } from '../components/sla/SectionHeader'
import { AdvancementEffectsTable } from '../components/team/AdvancementEffectsTable'
import { ElementTabs } from '../components/team/ElementTabs'
import { HunterSlot } from '../components/team/HunterSlot'
import { JinwooPanel } from '../components/team/JinwooPanel'
import type { MonarchId } from '../components/team/monarchs'
import { DEFAULT_MONARCH } from '../components/team/monarchs'
import { type PuissanceMode, PuissanceRemanente } from '../components/team/PuissanceRemanente'
import type { SuccessorId } from '../components/team/successors'
import { DEFAULT_SUCCESSOR } from '../components/team/successors'
import { TeamConfigTabs } from '../components/team/TeamConfigTabs'
import type { Hunter, WeaponData } from '../components/team/types'
import { JINWOO_WEAPONS_BY_NAME } from '../components/team/weapons'
import teamsConfig from '../data/teams/guild-boss.json'

const RANDOM_ROLES = ['Striker', 'Striker', 'Breaker', 'Elemental Stacker', 'Supporter', 'Supporter']

const modeForElement = (el: string): PuissanceMode => (el === 'Wind' ? 'successor' : 'monarch')

const ELEMENT_ICON: Record<string, string> = {
	Dark: '/assets/utils/Dark_Element.png',
	Water: '/assets/utils/Water_Element.png',
	Fire: '/assets/utils/Fire_Element.png',
	Light: '/assets/utils/Light_Element.png',
	Wind: '/assets/utils/Wind_Element.png',
}

interface SlotState {
	hunter: Hunter | null
	role: string
	preferredBuild?: string
}

interface BossEntry {
	name: string
	icon: string
	weakness: string[]
	active: boolean
}

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

// ── Sub-component: active boss banner ─────────────────────────────────────────

function ActiveBossBanner({ boss }: { boss: BossEntry }) {
	return (
		<div className='bg-zinc-800/40 border border-zinc-700/40 rounded-xl overflow-hidden'>
			<div className='flex items-center gap-4 px-4 py-3 border-b border-zinc-700/40'>
				<img
					src={`/${boss.icon}`}
					alt={boss.name}
					className='w-14 h-14 object-contain rounded-lg bg-zinc-700/30 flex-shrink-0'
					onError={(e) => {
						;(e.target as HTMLImageElement).style.display = 'none'
					}}
				/>
				<div>
					<p className='text-label text-zinc-500 uppercase tracking-wider'>Boss actif</p>
					<p className='text-sm font-semibold text-zinc-100'>{boss.name}</p>
				</div>
			</div>

			{boss.weakness.length > 0 && (
				<div className='flex flex-col items-center gap-2 px-4 py-3 bg-weak-bg'>
					<span className='text-meta font-bold text-weak uppercase tracking-widest'>Faiblesses</span>
					<div className='flex gap-3 flex-wrap justify-center'>
						{boss.weakness.map((el) =>
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
			)}
		</div>
	)
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function TeamGuideGuildBoss({ hunters }: { hunters: Hunter[] }) {
	const hunterById = new Map(hunters.map((h) => [h.id, h]))
	const otherHunters = hunters.filter((h) => h.id !== 'sung-jinwoo')

	const activeBoss = (teamsConfig.weaknessRotation as BossEntry[]).find((b) => b.active) ?? null
	const bossWeaknesses = activeBoss?.weakness ?? []

	const defaultElement =
		bossWeaknesses.find((el) => teamsConfig.teams.find((t) => t.element === el && t.status === 'active')) ??
		teamsConfig.teams.find((t) => t.status === 'active')?.element ??
		'Wind'

	// ── Init helpers ──────────────────────────────────────────────────────────

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

	const randomSlots = (): SlotState[] => {
		const shuffled = [...otherHunters].sort(() => Math.random() - 0.5).slice(0, 6)
		return RANDOM_ROLES.map((role, i) => ({ hunter: shuffled[i] ?? null, role }))
	}

	const initWeapons = (el: string, ci = 0): [WeaponData | null, WeaponData | null] => {
		const team = (teamsConfig.teams as GbTeamEntry[]).find((t) => t.element === el)
		const cfg = team?.configs[ci] ?? team?.configs[0]
		const names = cfg?.jinwooWeapons ?? []
		return [JINWOO_WEAPONS_BY_NAME.get(names[0]) ?? null, JINWOO_WEAPONS_BY_NAME.get(names[1]) ?? null]
	}

	// ── State ─────────────────────────────────────────────────────────────────

	const [activeElement, setActiveElement] = useState(defaultElement)
	const [slots, setSlots] = useState<SlotState[]>(() => initSlots(defaultElement))
	const [selectedWeapons, setSelectedWeapons] = useState<[WeaponData | null, WeaponData | null]>(() =>
		initWeapons(defaultElement),
	)
	const [activeConfigIndex, setActiveConfigIndex] = useState(0)
	const [selectedMonarch, setSelectedMonarch] = useState<MonarchId>(() => {
		const team = (teamsConfig.teams as GbTeamEntry[]).find((t) => t.element === defaultElement)
		return (team?.monarch as MonarchId | undefined) ?? DEFAULT_MONARCH
	})
	const [selectedSuccessor, setSelectedSuccessor] = useState<SuccessorId>(DEFAULT_SUCCESSOR)
	const [puissanceMode, setPuissanceMode] = useState<PuissanceMode>(() => modeForElement(defaultElement))

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
		setActiveConfigIndex(0)
		const team = (teamsConfig.teams as GbTeamEntry[]).find((t) => t.element === el)
		setSelectedMonarch((team?.monarch as MonarchId | undefined) ?? DEFAULT_MONARCH)
		setSelectedSuccessor(DEFAULT_SUCCESSOR)
		setPuissanceMode(modeForElement(el))
		setSelectedWeapons(initWeapons(el, 0))
		if (team?.status === 'coming-soon') {
			setSlots(randomSlots())
		} else {
			setSlots(initSlots(el, 0))
		}
	}

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

	// ── Available lists ───────────────────────────────────────────────────────

	const takenIds = new Set(slots.map((s) => s.hunter?.id).filter(Boolean) as string[])

	const availableHunters = (i: number) =>
		otherHunters.filter((h) => h.id !== slots[i]?.hunter?.id && !takenIds.has(h.id))

	const teamKey = `${activeElement}-${activeConfigIndex}`

	// ── Render ────────────────────────────────────────────────────────────────

	return (
		<div className='sla-container' style={{ paddingTop: 32, paddingBottom: 64 }}>
			<BackLink />
			<div style={{ marginTop: 24 }}>
				<SectionHeader
					tag='// TEAM GUIDE'
					title='Guild Boss'
					as='h1'
					description='Composition optimale pour le boss actif.'
				/>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
				<section>
					<SectionHeader
						tag='// SECTION 01'
						title='Boss actif'
						description='Faiblesses et éléments recommandés pour le boss en rotation.'
					/>
					{activeBoss && <ActiveBossBanner boss={activeBoss} />}
					<div style={{ marginTop: 16 }}>
						<ElementTabs
							teams={teamsConfig.teams}
							activeElement={activeElement}
							onSwitch={switchElement}
							weekWeaknesses={bossWeaknesses}
						/>
					</div>
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
						title='Composition'
						description='Six chasseurs recommandés pour ce boss.'
					/>
					<div key={teamKey} className='sla-team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
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
					<AdvancementEffectsTable hunters={slots.map((s) => s.hunter ?? null)} />
				</section>

				<section>
					<SectionHeader
						tag='// SECTION 04'
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
