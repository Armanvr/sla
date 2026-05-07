import { useState } from 'preact/hooks'
import { BackLink } from '../components/sla/BackLink'
import { HunterSlot } from '../components/team/HunterSlot'
import { JinwooPanel } from '../components/team/JinwooPanel'
import { ShadowSlot } from '../components/team/ShadowSlot'
import { SHADOWS, SHADOWS_BY_ID } from '../components/team/shadows'
import type { Hunter, ShadowData, WeaponData } from '../components/team/types'
import { JINWOO_WEAPONS_BY_NAME } from '../components/team/weapons'
import workshopConfig from '../data/teams/workshop.json'

// ── Types ────────────────────────────────────────────────────────────────────

interface BossConfig {
	name: string
	icon: string
	weaknesses: string[]
	resistances: string[]
}

interface TeamGroup {
	team: string
	hunters: { id: string; build: string }[]
	shadows: string[]
}

interface JinwooWeaponGroup {
	team: string
	weapons: string[]
}

interface FloorConfig {
	name: string
	type: string
	bosses: BossConfig
	jinwooWeapons?: JinwooWeaponGroup[]
	hunters: TeamGroup[]
}

interface SectionConfig {
	name: string
	floors: FloorConfig[]
	blessings?: FloorConfig[]
}

interface RaidConfig {
	name: string
	icon: string
	status: string
	sections: SectionConfig[]
}

// ── Constants ─────────────────────────────────────────────────────────────────

const SECTION_LABELS: Record<string, string> = {
	'lower-floors': 'Étages inférieurs',
	'upper-floors': 'Étages supérieurs',
	'arena-of-madnesss': 'Arène de la Folie',
	'the-puppeteer-s-theater': 'Le Théâtre des Pantins',
	'spire-of-transfiguration': 'Flèche de la Transfiguration',
	'the-distorted-sanctuary': 'Le Sanctuaire Distordu',
}

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

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatLabel(name: string): string {
	return (
		SECTION_LABELS[name] ??
		name
			.split('-')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ')
	)
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Tabs({
	labels,
	active,
	onSwitch,
	color = 'orange',
}: {
	labels: string[]
	active: number
	onSwitch: (i: number) => void
	color?: 'orange' | 'zinc' | 'amber'
}) {
	const activeClass =
		color === 'orange'
			? 'bg-orange-600 text-white'
			: color === 'amber'
				? 'bg-amber-500 text-zinc-900'
				: 'bg-zinc-600 text-white'
	return (
		<div class='flex flex-wrap gap-2'>
			{labels.map((label, i) => (
				<button
					key={`${label}-${i}`}
					type='button'
					onClick={() => onSwitch(i)}
					class={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
						i === active
							? activeClass
							: 'bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:border-zinc-500/60 hover:text-zinc-100'
					}`}
				>
					{label}
				</button>
			))}
		</div>
	)
}

function BossCard({ boss }: { boss: BossConfig }) {
	const hasWeaknesses = boss.weaknesses.length > 0
	const hasResistances = boss.resistances.length > 0

	return (
		<div class='bg-zinc-800/40 border border-zinc-700/40 rounded-xl overflow-hidden'>
			<div class='flex items-center gap-4 px-4 py-3'>
				<img
					src={`/assets/workshop/${boss.icon}`}
					alt={boss.name}
					class='w-12 h-12 object-contain rounded-lg bg-zinc-700/30 flex-shrink-0'
					onError={(e) => {
						;(e.target as HTMLImageElement).style.display = 'none'
					}}
				/>
				<div class='flex-1 min-w-0'>
					<p class='text-[10px] text-zinc-500 uppercase tracking-wider'>Boss</p>
					<p class='text-sm font-semibold text-zinc-100 truncate'>{boss.name}</p>
				</div>
			</div>

			{(hasWeaknesses || hasResistances) && (
				<div class='flex border-t border-zinc-700/40'>
					{hasWeaknesses && (
						<div
							class={`flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-emerald-950/40 ${hasResistances ? 'border-r border-zinc-700/40' : ''}`}
						>
							<span class='text-[11px] font-bold text-emerald-400 uppercase tracking-widest'>
								Faiblesses
							</span>
							<div class='flex gap-2 flex-wrap justify-center'>
								{boss.weaknesses.map((el) =>
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
					{hasResistances && (
						<div class='flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-red-950/40'>
							<span class='text-[11px] font-bold text-red-400 uppercase tracking-widest'>
								Résistances
							</span>
							<div class='flex gap-2 flex-wrap justify-center'>
								{boss.resistances.map((el) =>
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
					)}
				</div>
			)}
		</div>
	)
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function TeamGuideWorkshop({ hunters, raidName }: { hunters: Hunter[]; raidName: string }) {
	const raids = (workshopConfig as { raids: RaidConfig[] }).raids
	const raid = raids.find((r) => r.name === raidName) ?? raids[0]

	const hunterById = new Map(hunters.map((h) => [h.id, h]))
	const otherHunters = hunters.filter((h) => h.id !== 'sung-jinwoo')

	// ── Navigation state ──────────────────────────────────────────────────────

	const [activeSectionIdx, setActiveSectionIdx] = useState(0)
	const [activeFloorIdx, setActiveFloorIdx] = useState(0)
	const [activeBlessingIdx, setActiveBlessingIdx] = useState(0)
	const [viewType, setViewType] = useState<'floor' | 'blessing'>('floor')
	const [activeTeamIdx, setActiveTeamIdx] = useState(0)

	const section = raid.sections[activeSectionIdx]
	const blessings = section.blessings ?? []
	const floor = viewType === 'floor' ? section.floors[activeFloorIdx] : blessings[activeBlessingIdx]

	// ── Init helpers ──────────────────────────────────────────────────────────

	const initHunters = (f: FloorConfig, teamIdx: number): (Hunter | null)[] => {
		const group = f.hunters[teamIdx] ?? f.hunters[0]
		return group.hunters.map((e) => (e.id ? (hunterById.get(e.id) ?? null) : null))
	}

	const initBuilds = (f: FloorConfig, teamIdx: number): (string | undefined)[] => {
		const group = f.hunters[teamIdx] ?? f.hunters[0]
		return group.hunters.map((e) => (e.build ? e.build : undefined))
	}

	const initShadows = (f: FloorConfig, teamIdx: number): (ShadowData | null)[] => {
		const group = f.hunters[teamIdx] ?? f.hunters[0]
		return group.shadows.map((id) => (id ? (SHADOWS_BY_ID[id] ?? null) : null))
	}

	const initWeapons = (f: FloorConfig, teamIdx: number): [WeaponData | null, WeaponData | null] => {
		const group = f.jinwooWeapons?.[teamIdx] ?? f.jinwooWeapons?.[0]
		const names = group?.weapons ?? []
		return [JINWOO_WEAPONS_BY_NAME.get(names[0]) ?? null, JINWOO_WEAPONS_BY_NAME.get(names[1]) ?? null]
	}

	// ── Team state ────────────────────────────────────────────────────────────

	const [selectedHunters, setSelectedHunters] = useState<(Hunter | null)[]>(() =>
		floor ? initHunters(floor, 0) : [],
	)
	const [preferredBuilds, setPreferredBuilds] = useState<(string | undefined)[]>(() =>
		floor ? initBuilds(floor, 0) : [],
	)
	const [selectedShadows, setSelectedShadows] = useState<(ShadowData | null)[]>(() =>
		floor ? initShadows(floor, 0) : [],
	)
	const [selectedWeapons, setSelectedWeapons] = useState<[WeaponData | null, WeaponData | null]>(() =>
		floor ? initWeapons(floor, 0) : [null, null],
	)

	// ── Switch handlers ───────────────────────────────────────────────────────

	const applyFloor = (f: FloorConfig, teamIdx: number) => {
		setSelectedHunters(initHunters(f, teamIdx))
		setPreferredBuilds(initBuilds(f, teamIdx))
		setSelectedShadows(initShadows(f, teamIdx))
		setSelectedWeapons(initWeapons(f, teamIdx))
	}

	const switchSection = (i: number) => {
		setActiveSectionIdx(i)
		setActiveFloorIdx(0)
		setActiveBlessingIdx(0)
		setViewType('floor')
		setActiveTeamIdx(0)
		const firstFloor = raid.sections[i].floors[0]
		if (firstFloor) applyFloor(firstFloor, 0)
	}

	const switchFloor = (i: number) => {
		setActiveFloorIdx(i)
		setViewType('floor')
		setActiveTeamIdx(0)
		const f = section.floors[i]
		if (f) applyFloor(f, 0)
	}

	const switchBlessing = (i: number) => {
		setActiveBlessingIdx(i)
		setViewType('blessing')
		setActiveTeamIdx(0)
		const b = blessings[i]
		if (b) applyFloor(b, 0)
	}

	const switchTeam = (i: number) => {
		setActiveTeamIdx(i)
		if (floor) applyFloor(floor, i)
	}

	// ── Slot setters ──────────────────────────────────────────────────────────

	const setHunterSlot = (i: number, h: Hunter | null) => {
		setSelectedHunters((prev) => {
			const next = [...prev]
			next[i] = h
			return next
		})
		setPreferredBuilds((prev) => {
			const next = [...prev]
			next[i] = undefined
			return next
		})
	}

	const setShadowSlot = (i: number, s: ShadowData | null) =>
		setSelectedShadows((prev) => {
			const next = [...prev]
			next[i] = s
			return next
		})

	const setWeaponSlot = (i: 0 | 1, w: WeaponData | null) =>
		setSelectedWeapons((prev) => {
			const next = [...prev] as typeof prev
			next[i] = w
			return next
		})

	// ── Available lists ───────────────────────────────────────────────────────

	const takenHunterIds = new Set(selectedHunters.filter(Boolean).map((h) => h!.id))
	const takenShadowNames = new Set(selectedShadows.filter(Boolean).map((s) => s!.name))

	const availableHunters = (i: number) =>
		otherHunters.filter((h) => h.id !== selectedHunters[i]?.id && !takenHunterIds.has(h.id))

	const availableShadows = (i: number) =>
		SHADOWS.filter((s) => s.name !== selectedShadows[i]?.name && !takenShadowNames.has(s.name))

	// ── Derived ───────────────────────────────────────────────────────────────

	const isWithJinwoo = floor?.type === 'with-jinwoo'
	const hasShadows = selectedShadows.length > 0
	const teamGroups = floor?.hunters ?? []
	const hasMultipleTeams = teamGroups.length > 1
	const isComingSoon = raid.status === 'coming-soon'

	const raidLabel = raid.name
		.split('-')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ')

	const sectionLabels = raid.sections.map((s) => formatLabel(s.name))

	const floorLabels = section.floors.map((f, i) => (f.name.trim() ? f.name.trim() : `Étage ${i + 1}`))
	const blessingLabels = blessings.map((b, i) => `Béné. ${i + 1} — ${b.bosses.name}`)

	const teamLabels = teamGroups.map((g) => g.team)

	// ── Render ────────────────────────────────────────────────────────────────

	return (
		<div class='sla-container' style={{ paddingTop: 32, paddingBottom: 64 }}>
			<BackLink href='/workshops' />
			<div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
				<img
					src={`/assets/workshop/${raid.name}/${raid.icon}.png`}
					alt={raidLabel}
					style={{ width: 48, height: 48, objectFit: 'contain' }}
					onError={(e) => {
						;(e.target as HTMLImageElement).style.display = 'none'
					}}
				/>
				<div>
					<div class='sla-tag'>{'// WORKSHOP'}</div>
					<h1 class='sla-title-section sla-text-glow' style={{ marginTop: 4 }}>
						{raidLabel}
					</h1>
				</div>
			</div>

			<main style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
				{/* Section tabs */}
				<Tabs labels={sectionLabels} active={activeSectionIdx} onSwitch={switchSection} color='orange' />

				{isComingSoon ? (
					<div class='flex flex-col items-center gap-5 py-8'>
						<img
							src='/assets/sections/coming-soon.jpg'
							alt='Coming soon'
							class='w-full max-w-xl rounded-2xl shadow-lg'
						/>
						<p class='text-zinc-400 text-sm font-medium tracking-wide'>
							Ce contenu sera disponible prochainement.
						</p>
					</div>
				) : (
					<>
						{/* Floor tabs */}
						{floorLabels.length > 1 && (
							<Tabs
								labels={floorLabels}
								active={viewType === 'floor' ? activeFloorIdx : -1}
								onSwitch={switchFloor}
								color='zinc'
							/>
						)}

						{/* Blessing tabs */}
						{blessingLabels.length > 0 && (
							<div class='space-y-2'>
								<p class='text-[11px] font-bold text-amber-400/80 uppercase tracking-widest'>
									Bénédictions
								</p>
								<Tabs
									labels={blessingLabels}
									active={viewType === 'blessing' ? activeBlessingIdx : -1}
									onSwitch={switchBlessing}
									color='amber'
								/>
							</div>
						)}

						{/* Boss */}
						{floor?.bosses && <BossCard boss={floor.bosses} />}

						{/* Team selector (Primaire / Secondaire) */}
						{hasMultipleTeams && (
							<Tabs labels={teamLabels} active={activeTeamIdx} onSwitch={switchTeam} color='amber' />
						)}

						{/* Jinwoo */}
						{isWithJinwoo && (
							<>
								<JinwooPanel selectedWeapons={selectedWeapons} onWeaponSelect={setWeaponSlot} />
								<hr class='border-zinc-800' />
							</>
						)}

						{/* Hunters */}
						{floor && (
							<section>
								<p class='text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4'>Chasseurs</p>
								<div class='grid grid-cols-3 gap-4'>
									{(floor.hunters[activeTeamIdx] ?? floor.hunters[0]).hunters.map((_, i) => (
										<HunterSlot
											key={`${activeSectionIdx}-${activeFloorIdx}-${activeBlessingIdx}-${viewType}-${activeTeamIdx}-${i}`}
											slot={i + 1}
											selected={selectedHunters[i] ?? null}
											hunters={availableHunters(i)}
											preferredBuild={preferredBuilds[i]}
											onSelect={(h) => setHunterSlot(i, h)}
										/>
									))}
								</div>
							</section>
						)}

						{/* Shadows */}
						{hasShadows && (
							<>
								<hr class='border-zinc-800' />
								<section>
									<p class='text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4'>Ombres</p>
									<div class='grid grid-cols-3 gap-4'>
										{selectedShadows.map((_, i) => (
											<ShadowSlot
												key={`${activeSectionIdx}-${activeFloorIdx}-${activeBlessingIdx}-${viewType}-${activeTeamIdx}-${i}`}
												slot={i + 1}
												selected={selectedShadows[i] ?? null}
												shadows={availableShadows(i)}
												onSelect={(s) => setShadowSlot(i, s)}
											/>
										))}
									</div>
								</section>
							</>
						)}
					</>
				)}
			</main>
		</div>
	)
}
