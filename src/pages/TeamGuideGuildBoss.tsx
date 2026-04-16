import { useState } from 'preact/hooks'
import { ElementTabs } from '../components/team/ElementTabs'
import { HunterSlot } from '../components/team/HunterSlot'
import { JinwooPanel } from '../components/team/JinwooPanel'
import type { Hunter, WeaponData } from '../components/team/types'
import { JINWOO_WEAPONS_BY_NAME } from '../components/team/weapons'
import teamsConfig from '../data/teams/guild-boss.json'

const RANDOM_ROLES = ['Striker', 'Striker', 'Breaker', 'Elemental Stacker', 'Supporter', 'Supporter']

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

// ── Sub-component: active boss banner ─────────────────────────────────────────

function ActiveBossBanner({ boss }: { boss: BossEntry }) {
	return (
		<div class='bg-zinc-800/40 border border-zinc-700/40 rounded-xl overflow-hidden'>
			<div class='flex items-center gap-4 px-4 py-3 border-b border-zinc-700/40'>
				<img
					src={`/${boss.icon}`}
					alt={boss.name}
					class='w-14 h-14 object-contain rounded-lg bg-zinc-700/30 flex-shrink-0'
					onError={(e) => {
						;(e.target as HTMLImageElement).style.display = 'none'
					}}
				/>
				<div>
					<p class='text-[10px] text-zinc-500 uppercase tracking-wider'>Boss actif</p>
					<p class='text-sm font-semibold text-zinc-100'>{boss.name}</p>
				</div>
			</div>

			{boss.weakness.length > 0 && (
				<div class='flex flex-col items-center gap-2 px-4 py-3 bg-emerald-950/40'>
					<span class='text-[11px] font-bold text-emerald-400 uppercase tracking-widest'>Faiblesses</span>
					<div class='flex gap-3 flex-wrap justify-center'>
						{boss.weakness.map((el) =>
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
			)}
		</div>
	)
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function TeamGuideGuildBoss({ hunters, onBack }: { hunters: Hunter[]; onBack: () => void }) {
	const hunterById = new Map(hunters.map((h) => [h.id, h]))
	const otherHunters = hunters.filter((h) => h.id !== 'sung-jinwoo')

	const activeBoss = (teamsConfig.weaknessRotation as BossEntry[]).find((b) => b.active) ?? null
	const bossWeaknesses = activeBoss?.weakness ?? []

	const defaultElement =
		bossWeaknesses.find((el) => teamsConfig.teams.find((t) => t.element === el && t.status === 'active')) ??
		teamsConfig.teams.find((t) => t.status === 'active')?.element ??
		'Wind'

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

	const initWeapons = (el: string): [WeaponData | null, WeaponData | null] => {
		const team = teamsConfig.teams.find((t) => t.element === el)
		const names = team?.jinwooWeapons ?? []
		return [JINWOO_WEAPONS_BY_NAME.get(names[0]) ?? null, JINWOO_WEAPONS_BY_NAME.get(names[1]) ?? null]
	}

	// ── State ─────────────────────────────────────────────────────────────────

	const [activeElement, setActiveElement] = useState(defaultElement)
	const [slots, setSlots] = useState<SlotState[]>(() => initSlots(defaultElement))
	const [selectedWeapons, setSelectedWeapons] = useState<[WeaponData | null, WeaponData | null]>(() =>
		initWeapons(defaultElement),
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

			<main class='max-w-6xl mx-auto px-4 py-6 space-y-6'>
				{activeBoss && <ActiveBossBanner boss={activeBoss} />}

				<ElementTabs
					teams={teamsConfig.teams}
					activeElement={activeElement}
					onSwitch={switchElement}
					weekWeaknesses={bossWeaknesses}
				/>

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
