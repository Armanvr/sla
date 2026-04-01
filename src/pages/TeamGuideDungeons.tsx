import { useState } from 'preact/hooks'
import { CoresSection } from '../components/hunter/CoresSection'
import { EquipmentSection } from '../components/hunter/EquipmentSection'
import type { ArtifactSet, Build, HunterData } from '../components/hunter/types'
import artifactsData from '../data/artifacts/artifacts.json'
import jinwooData from '../data/hunters/sung-jinwoo.json'
import beruData from '../data/shadows/beru.json'
import besteData from '../data/shadows/beste.json'
import bigrockData from '../data/shadows/bigrock.json'
import bladesData from '../data/shadows/blades.json'
import bruteData from '../data/shadows/brute.json'
import cerbieData from '../data/shadows/cerbie.json'
import igrisData from '../data/shadows/igris.json'
import ironData from '../data/shadows/iron.json'
import jimaData from '../data/shadows/jima.json'
import kaiselData from '../data/shadows/kaisel.json'
import skullData from '../data/shadows/skull.json'
import tankData from '../data/shadows/tank.json'
import tuskData from '../data/shadows/tusk.json'
import urosData from '../data/shadows/uros.json'

interface Hunter {
	id: string
	data: HunterData
}

interface ShadowData {
	name: string
	title: string
	shadowAuthority: string
	image: string | null
	render: string | null
	ranks: { common: string | null; elite: string | null; knight: string | null; eliteKnight: string | null; general: string | null }
	weapon: { name: string; icon: string } | null
	skills: { icon: string; name: string | null; description: string | null }[]
}

const SHADOWS: ShadowData[] = [
	beruData, besteData, bigrockData, bladesData, bruteData,
	cerbieData, igrisData, ironData, jimaData, kaiselData,
	skullData, tankData, tuskData, urosData,
]

// ─── Artifact lookup ──────────────────────────────────────────────────────────

const ALL_SETS: ArtifactSet[] = [
	...(artifactsData.armor as ArtifactSet[]),
	...(artifactsData.jewelry as ArtifactSet[]),
	...((artifactsData as unknown as { complete: ArtifactSet[] }).complete),
]
const SET_BY_ID = new Map(ALL_SETS.map((s) => [s.id, s]))

const SLOT_ICON_KEYS = ['head', 'chest', 'gloves', 'boots', 'necklace', 'ring', 'bracelet', 'earrings']

// ─── Minimal equipment list ───────────────────────────────────────────────────

function MiniEquipment({ builds }: { builds?: Build[] }) {
	const niv120 = builds?.find((b) => b.name === 'Build Niv. 120')
	if (!niv120) return null

	const allSlots = [...niv120.armor, ...niv120.jewelry]

	// Group slots by set id, keep insertion order
	const groups = new Map<string, { set: ArtifactSet; firstIdx: number; count: number }>()
	allSlots.forEach((id, i) => {
		if (!id) return
		const set = SET_BY_ID.get(id)
		if (!set) return
		if (groups.has(id)) {
			groups.get(id)!.count++
		} else {
			groups.set(id, { set, firstIdx: i, count: 1 })
		}
	})

	return (
		<div class='mt-2 pt-2 border-t border-zinc-700/40 space-y-1.5'>
			{Array.from(groups.values()).map(({ set, firstIdx, count }) => {
				const icon = set.icons[SLOT_ICON_KEYS[firstIdx]] ?? null
				return (
					<div key={set.id} class='flex items-center gap-2'>
						{icon ? (
							<img
								src={icon}
								alt={set.name}
								class='w-6 h-6 rounded object-cover flex-shrink-0 bg-zinc-700/40'
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
						) : (
							<div class='w-6 h-6 rounded bg-zinc-700/40 flex-shrink-0' />
						)}
						<span class='text-xs text-zinc-300 truncate flex-1 min-w-0'>{set.name}</span>
						<span class='text-[10px] text-zinc-500 flex-shrink-0'>×{count}</span>
					</div>
				)
			})}
		</div>
	)
}

// ─── Hunter Slot Picker ───────────────────────────────────────────────────────

const elementAccent: Record<string, string> = {
	Dark: 'border-purple-500/50',
	Water: 'border-blue-500/50',
	Fire: 'border-red-500/50',
	Light: 'border-yellow-500/50',
	Wind: 'border-emerald-500/50',
}

const rarityColors: Record<string, string> = {
	SSR: 'text-amber-400',
	SR: 'text-purple-400',
	R: 'text-blue-400',
}

function HunterSlot({
	slot,
	selected,
	hunters,
	onSelect,
}: {
	slot: number
	selected: Hunter | null
	hunters: Hunter[]
	onSelect: (h: Hunter | null) => void
}) {
	const [open, setOpen] = useState(false)
	const primaryEl = selected?.data.elements.find((e) => e.primary) ?? selected?.data.elements[0]
	const accentClass = primaryEl ? (elementAccent[primaryEl.name] ?? 'border-zinc-600/50') : 'border-zinc-600/50'

	return (
		<div class='relative'>
			{open && (
				<button
					type='button'
					class='fixed inset-0 z-40'
					onClick={() => setOpen(false)}
					aria-label='Fermer'
				/>
			)}

			<div class={`bg-zinc-800/50 border rounded-2xl p-4 transition-colors ${open ? 'border-purple-500/60' : accentClass}`}>
				<button
					type='button'
					onClick={() => setOpen((p) => !p)}
					class='w-full flex flex-col items-center gap-2 text-center'
				>
					{selected ? (
						<>
							<img
								src={selected.data.icon ?? selected.data.image}
								alt={selected.data.name}
								class='w-20 h-20 object-contain rounded-xl bg-zinc-700/30 drop-shadow-lg'
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
							<div>
								<p class={`text-xs font-bold ${rarityColors[selected.data.rarity ?? ''] ?? 'text-zinc-400'}`}>
									{selected.data.rarity}
								</p>
								<p class='text-sm font-semibold text-zinc-100 leading-tight'>{selected.data.name}</p>
								{primaryEl && <p class='text-[10px] text-zinc-500 mt-0.5'>{primaryEl.name}</p>}
							</div>
							<button
								type='button'
								onClick={(e) => {
									e.stopPropagation()
									onSelect(null)
								}}
								class='text-zinc-600 hover:text-red-400 transition-colors text-base leading-none'
								aria-label='Retirer ce chasseur'
							>
								×
							</button>
						</>
					) : (
						<>
							<div class='w-20 h-20 rounded-xl bg-zinc-700/20 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 text-3xl'>
								+
							</div>
							<p class='text-xs text-zinc-500'>Chasseur {slot}</p>
						</>
					)}
				</button>

				{selected && <MiniEquipment builds={selected.data.builds} />}
			</div>

			{open && (
				<div class='absolute z-50 top-full mt-1 left-0 w-64 max-h-72 overflow-y-auto bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl'>
					<button
						type='button'
						onClick={() => {
							onSelect(null)
							setOpen(false)
						}}
						class='w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors'
					>
						<div class='w-8 h-8 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 flex-shrink-0'>
							–
						</div>
						<span class='text-sm text-zinc-500'>— Vide —</span>
					</button>
					<div class='border-t border-zinc-700/50' />
					{hunters.map((h) => (
						<button
							key={h.id}
							type='button'
							onClick={() => {
								onSelect(h)
								setOpen(false)
							}}
							class={`w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors ${selected?.id === h.id ? 'bg-purple-900/20' : ''}`}
						>
							<img
								src={h.data.icon ?? h.data.image}
								alt={h.data.name}
								class='w-8 h-8 rounded-lg object-contain flex-shrink-0 bg-zinc-700/40'
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
							<div class='text-left min-w-0'>
								<p class='text-sm text-zinc-200 truncate'>{h.data.name}</p>
								{h.data.rarity && (
									<p class={`text-[10px] ${rarityColors[h.data.rarity] ?? 'text-zinc-500'}`}>{h.data.rarity}</p>
								)}
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	)
}

// ─── Shadow Slot Picker ───────────────────────────────────────────────────────

function ShadowSlot({
	slot,
	selected,
	shadows,
	onSelect,
}: {
	slot: number
	selected: ShadowData | null
	shadows: ShadowData[]
	onSelect: (s: ShadowData | null) => void
}) {
	const [open, setOpen] = useState(false)
	const img = selected ? (selected.render ?? selected.image ?? selected.ranks.general) : null

	return (
		<div class='relative'>
			{open && (
				<button
					type='button'
					class='fixed inset-0 z-40'
					onClick={() => setOpen(false)}
					aria-label='Fermer'
				/>
			)}

			<div class={`bg-zinc-800/50 border rounded-2xl p-4 transition-colors ${open ? 'border-purple-500/60' : 'border-purple-900/40 hover:border-purple-600/50'}`}>
				<button
					type='button'
					onClick={() => setOpen((p) => !p)}
					class='w-full flex flex-col items-center gap-2 text-center'
				>
					{selected ? (
						<>
							{img ? (
								<img
									src={img}
									alt={selected.name}
									class='w-20 h-20 object-contain rounded-xl bg-zinc-700/30 drop-shadow-lg'
									onError={(e) => { ;(e.target as HTMLImageElement).style.display = 'none' }}
								/>
							) : (
								<div class='w-20 h-20 rounded-xl bg-purple-900/20 border border-purple-700/30 flex items-center justify-center text-3xl select-none'>
									👥
								</div>
							)}
							<div>
								<p class='text-[10px] text-purple-400 font-semibold uppercase tracking-wider'>{selected.title}</p>
								<p class='text-sm font-semibold text-zinc-100 leading-tight'>{selected.name}</p>
							</div>
							<button
								type='button'
								onClick={(e) => { e.stopPropagation(); onSelect(null) }}
								class='text-zinc-600 hover:text-red-400 transition-colors text-base leading-none'
								aria-label='Retirer cette ombre'
							>
								×
							</button>
						</>
					) : (
						<>
							<div class='w-20 h-20 rounded-xl bg-purple-900/10 border border-dashed border-purple-800/40 flex items-center justify-center text-zinc-500 text-3xl'>
								👥
							</div>
							<p class='text-xs text-zinc-500'>Ombre {slot}</p>
						</>
					)}
				</button>

				{selected && (
					<div class='mt-2 pt-2 border-t border-zinc-700/40'>
						<p class='text-[10px] text-zinc-500 leading-relaxed'>{selected.shadowAuthority}</p>
					</div>
				)}
			</div>

			{open && (
				<div class='absolute z-50 top-full mt-1 left-0 w-64 max-h-72 overflow-y-auto bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl'>
					<button
						type='button'
						onClick={() => { onSelect(null); setOpen(false) }}
						class='w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors'
					>
						<div class='w-8 h-8 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 flex-shrink-0'>
							–
						</div>
						<span class='text-sm text-zinc-500'>— Vide —</span>
					</button>
					<div class='border-t border-zinc-700/50' />
					{shadows.map((s) => {
						const thumb = s.render ?? s.image ?? s.ranks.general
						return (
							<button
								key={s.name}
								type='button'
								onClick={() => { onSelect(s); setOpen(false) }}
								class={`w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors ${selected?.name === s.name ? 'bg-purple-900/20' : ''}`}
							>
								{thumb ? (
									<img
										src={thumb}
										alt={s.name}
										class='w-8 h-8 rounded-lg object-contain flex-shrink-0 bg-zinc-700/40'
										onError={(e) => { ;(e.target as HTMLImageElement).style.display = 'none' }}
									/>
								) : (
									<div class='w-8 h-8 rounded-lg bg-purple-900/20 flex items-center justify-center text-base flex-shrink-0'>
										👥
									</div>
								)}
								<div class='text-left min-w-0'>
									<p class='text-sm text-zinc-200 truncate'>{s.name}</p>
									<p class='text-[10px] text-purple-400 truncate'>{s.title}</p>
								</div>
							</button>
						)
					})}
				</div>
			)}
		</div>
	)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function RowLabel({ children }: { children: string }) {
	return (
		<p class='text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3'>
			{children}
		</p>
	)
}

function UnderConstruction() {
	return (
		<div class='bg-zinc-800/30 border border-zinc-700/40 rounded-xl px-6 py-8 text-center'>
			<p class='text-zinc-600 text-xs font-medium uppercase tracking-wider'>En construction</p>
		</div>
	)
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function TeamGuideDungeons({ hunters, onBack }: { hunters: Hunter[]; onBack: () => void }) {
	const otherHunters = hunters.filter((h) => h.id !== 'sung-jinwoo')
	const [selectedHunters, setSelectedHunters] = useState<[Hunter | null, Hunter | null, Hunter | null]>([
		null,
		null,
		null,
	])

	const setSlot = (index: 0 | 1 | 2, h: Hunter | null) => {
		setSelectedHunters((prev) => {
			const next: [Hunter | null, Hunter | null, Hunter | null] = [...prev]
			next[index] = h
			return next
		})
	}

	const takenIds = new Set(selectedHunters.filter(Boolean).map((h) => h!.id))
	const available = (index: 0 | 1 | 2) =>
		otherHunters.filter((h) => h.id !== selectedHunters[index]?.id && !takenIds.has(h.id))

	const [selectedShadows, setSelectedShadows] = useState<[ShadowData | null, ShadowData | null, ShadowData | null]>([null, null, null])

	const setShadowSlot = (index: 0 | 1 | 2, s: ShadowData | null) => {
		setSelectedShadows((prev) => {
			const next: [ShadowData | null, ShadowData | null, ShadowData | null] = [...prev]
			next[index] = s
			return next
		})
	}

	const takenShadowNames = new Set(selectedShadows.filter(Boolean).map((s) => s!.name))
	const availableShadows = (index: 0 | 1 | 2) =>
		SHADOWS.filter((s) => s.name !== selectedShadows[index]?.name && !takenShadowNames.has(s.name))

	return (
		<div class='min-h-screen bg-zinc-900 text-zinc-100'>
			<header class='sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur px-6 py-4 flex items-center gap-4'>
				<button
					type='button'
					onClick={onBack}
					class='text-zinc-400 hover:text-zinc-100 transition-colors'
					aria-label='Back'
				>
					← Retour
				</button>
				<h1 class='text-lg font-bold'>
					Team Guides — <span class='text-purple-400'>Dungeons</span>
				</h1>
			</header>

			<main class='max-w-6xl mx-auto px-4 py-10 space-y-10'>
				{/* ── Sung Jinwoo + build rows ── */}
				<section>
					<div class='flex flex-col lg:flex-row gap-8'>
						<div class='flex-shrink-0 flex flex-col items-center gap-3 lg:w-48'>
							<img
								src={jinwooData.image}
								alt={jinwooData.name}
								class='w-40 object-contain drop-shadow-2xl'
							/>
							<div class='text-center'>
								<p class='text-xs text-amber-400 font-bold'>{jinwooData.rarity}</p>
								<p class='text-sm font-bold text-zinc-100'>{jinwooData.name}</p>
								<p class='text-[10px] text-zinc-500'>{jinwooData.title}</p>
							</div>
						</div>

						<div class='flex-1 space-y-8 min-w-0'>
							<div>
								<RowLabel>Équipements</RowLabel>
								<EquipmentSection
									builds={(jinwooData as HunterData).builds}
									equipmentStats={(jinwooData as HunterData).equipmentStats}
									showDetails={false}
								/>
							</div>

							<hr class='border-zinc-800' />

							<div>
								<RowLabel>Cores</RowLabel>
								<CoresSection
									coreBuild={(jinwooData as HunterData).coreBuild}
									coreStats={(jinwooData as HunterData).coreStats}
									showDetails={false}
								/>
							</div>

							<hr class='border-zinc-800' />

							<div>
								<RowLabel>Techniques &amp; Runes</RowLabel>
								<UnderConstruction />
							</div>
						</div>
					</div>
				</section>

				<hr class='border-zinc-800' />

				{/* ── Hunter slots ── */}
				<section>
					<p class='text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4'>Chasseurs</p>
					<div class='grid grid-cols-3 gap-4'>
						{([0, 1, 2] as const).map((i) => (
							<HunterSlot
								key={i}
								slot={i + 1}
								selected={selectedHunters[i]}
								hunters={available(i)}
								onSelect={(h) => setSlot(i, h)}
							/>
						))}
					</div>
				</section>

				<hr class='border-zinc-800' />

				{/* ── Shadow slots ── */}
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
