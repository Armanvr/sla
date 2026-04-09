import { useState } from 'preact/hooks'
import artifactsData from '../../data/artifacts/artifacts.json'
import { ARMOR_SLOTS, JEWELRY_SLOTS } from './constants'
import type { ArtifactSet, Build, EquipmentStats, SlotStats } from './types'

interface ActiveBonus {
	name: string
	count: number
	bonuses: { pieces: number; effect: string }[]
}

function getActiveBonuses(slots: (string | null)[], sets: ArtifactSet[]): ActiveBonus[] {
	const counts: Record<string, number> = {}
	for (const id of slots) {
		if (id) counts[id] = (counts[id] ?? 0) + 1
	}
	const result: ActiveBonus[] = []
	for (const set of sets) {
		const count = counts[set.id] ?? 0
		if (count < 2) continue
		const bonuses = Object.entries(set.bonuses)
			.filter(([pieces]) => count >= Number(pieces))
			.map(([pieces, effect]) => ({ pieces: Number(pieces), effect }))
		result.push({ name: set.name, count, bonuses })
	}
	return result
}

function BonusText({ text }: { text: string }) {
	const parts = text.split(/(\[[^\]]+\]|Attack|Defense)/g)
	return (
		<>
			{parts.map((part, i) => {
				if (/^\[/.test(part))
					return (
						<span key={i} class='text-blue-400'>
							{part}
						</span>
					)
				if (part === 'Attack' || part === 'Defense')
					return (
						<span key={i} class='text-orange-400 font-semibold'>
							{part}
						</span>
					)
				return <span key={i}>{part}</span>
			})}
		</>
	)
}

export function StatsPanel({ main, secondary }: { main?: string | null; secondary: string[] }) {
	const [open, setOpen] = useState(true)
	return (
		<div class='mt-1.5'>
			<button
				type='button'
				onClick={() => setOpen((o) => !o)}
				class='flex items-center gap-1 text-[10px] text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors px-1 select-none'
			>
				<span>Stats</span>
				<span class='font-mono'>{open ? '▲' : '▼'}</span>
			</button>
			{open && (
				<div class='mt-1 bg-zinc-800/20 border border-zinc-700/30 rounded-lg px-3 py-2 space-y-0.5'>
					{main && <p class='text-xs font-bold text-zinc-200'>{main}</p>}
					{secondary.map((s) => (
						<p key={s} class='text-xs text-zinc-400'>
							{s}
						</p>
					))}
				</div>
			)}
		</div>
	)
}

function ArtifactIcon({
	src,
	name,
	sizeClass = 'w-10 h-10',
}: {
	src?: string | null
	name: string
	sizeClass?: string
}) {
	if (src) {
		return (
			<img
				src={src}
				alt={name}
				class={`${sizeClass} rounded-lg object-cover flex-shrink-0 bg-zinc-700/40`}
				onError={(e) => {
					;(e.target as HTMLImageElement).style.display = 'none'
				}}
			/>
		)
	}
	return (
		<div
			class={`${sizeClass} rounded-lg bg-zinc-700/40 flex items-center justify-center text-zinc-500 text-xs flex-shrink-0`}
		>
			?
		</div>
	)
}

function EquipmentSlot({
	slotLabel,
	iconKey,
	value,
	availableSets,
	allSets,
	isOpen,
	onToggle,
	onSelect,
	onClear,
	stats,
}: {
	slotLabel: string
	iconKey: string
	value: string | null
	availableSets: ArtifactSet[]
	allSets: ArtifactSet[]
	isOpen: boolean
	onToggle: () => void
	onSelect: (id: string | null) => void
	onClear: () => void
	stats?: SlotStats
}) {
	const selected = value ? allSets.find((s) => s.id === value) : null
	const selectedIcon = selected?.icons[iconKey] ?? null
	return (
		<div class='relative'>
			<button
				type='button'
				onClick={onToggle}
				class={`w-full flex items-center gap-3 bg-zinc-800/60 border rounded-xl px-3 py-2.5 text-left transition-colors ${
					isOpen ? 'border-purple-500/60' : 'border-zinc-700/60 hover:border-zinc-500/60'
				}`}
			>
				{selected ? (
					<ArtifactIcon src={selectedIcon} name={selected.name} />
				) : (
					<div class='w-10 h-10 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 text-lg flex-shrink-0'>
						+
					</div>
				)}
				<div class='flex-1 min-w-0'>
					<p class='text-[10px] text-zinc-500 uppercase tracking-wider leading-none mb-0.5'>{slotLabel}</p>
					<p class={`text-sm truncate ${selected ? 'text-zinc-100 font-medium' : 'text-zinc-500'}`}>
						{selected ? selected.name : '—'}
					</p>
				</div>
				{selected && (
					<button
						type='button'
						tabIndex={0}
						onClick={(e) => {
							e.stopPropagation()
							onClear()
						}}
						// biome-ignore lint/complexity/noCommaOperator: Quick fix
						onKeyDown={(e) => e.key === 'Enter' && (e.stopPropagation(), onClear())}
						class='text-zinc-500 hover:text-red-400 transition-colors text-lg leading-none flex-shrink-0 cursor-pointer'
						aria-label='Vider le slot'
					>
						×
					</button>
				)}
			</button>

			{isOpen && (
				<div class='absolute z-50 top-full mt-1 left-0 w-64 max-h-64 overflow-y-auto bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl'>
					<button
						type='button'
						onClick={() => onSelect(null)}
						class='w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors'
					>
						<div class='w-8 h-8 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 flex-shrink-0'>
							–
						</div>
						<span class='text-sm text-zinc-500'>— Vide —</span>
					</button>
					<div class='border-t border-zinc-700/50' />
					{availableSets.map((s) => (
						<button
							key={s.id}
							type='button'
							onClick={() => onSelect(s.id)}
							class={`w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors ${s.id === value ? 'bg-purple-900/20' : ''}`}
						>
							<ArtifactIcon src={s.icons[iconKey]} name={s.name} sizeClass='w-8 h-8' />
							<span class='text-sm text-zinc-200 text-left'>{s.name}</span>
						</button>
					))}
				</div>
			)}

			{stats && <StatsPanel main={stats.main} secondary={stats.secondary} />}
		</div>
	)
}

export function EquipmentSection({
	builds,
	equipmentStats,
	showDetails = true,
}: {
	builds?: Build[]
	equipmentStats?: EquipmentStats
	showDetails?: boolean
}) {
	const defaultBuild = builds?.[0] ?? null
	const [armorSlots, setArmorSlots] = useState<(string | null)[]>(
		defaultBuild ? [...defaultBuild.armor] : [null, null, null, null],
	)
	const [jewelrySlots, setJewelrySlots] = useState<(string | null)[]>(
		defaultBuild ? [...defaultBuild.jewelry] : [null, null, null, null],
	)
	const [openPicker, setOpenPicker] = useState<{ type: 'armor' | 'jewelry'; index: number } | null>(null)
	const [activeBuildName, setActiveBuildName] = useState<string | null>(defaultBuild?.name ?? null)

	const armorSets = artifactsData.armor as ArtifactSet[]
	const jewelrySets = artifactsData.jewelry as ArtifactSet[]
	const completeSets = (artifactsData as unknown as { complete: ArtifactSet[] }).complete
	const armorSlotSets = [...armorSets, ...completeSets]
	const jewelrySlotSets = [...jewelrySets, ...completeSets]

	const allSlots = [...armorSlots, ...jewelrySlots]
	const activeBonuses = [
		...getActiveBonuses(armorSlots, armorSets),
		...getActiveBonuses(jewelrySlots, jewelrySets),
		...getActiveBonuses(allSlots, completeSets),
	]

	const updateSlot = (
		slots: (string | null)[],
		setSlots: (s: (string | null)[]) => void,
		index: number,
		value: string | null,
	) => {
		const next = [...slots]
		next[index] = value
		setSlots(next)
	}

	const handleSelect = (type: 'armor' | 'jewelry', index: number, id: string | null) => {
		if (type === 'armor') updateSlot(armorSlots, setArmorSlots, index, id)
		else updateSlot(jewelrySlots, setJewelrySlots, index, id)
		setActiveBuildName(null)
		setOpenPicker(null)
	}

	const handleToggle = (type: 'armor' | 'jewelry', index: number) => {
		setOpenPicker((prev) => (prev?.type === type && prev?.index === index ? null : { type, index }))
	}

	const applyBuild = (build: Build) => {
		setArmorSlots([...build.armor])
		setJewelrySlots([...build.jewelry])
		setActiveBuildName(build.name)
		setOpenPicker(null)
	}

	const clearAll = () => {
		setArmorSlots([null, null, null, null])
		setJewelrySlots([null, null, null, null])
		setActiveBuildName(null)
		setOpenPicker(null)
	}

	return (
		<div>
			{builds && builds.length > 0 && (
				<div class='flex flex-wrap items-center gap-2 mb-5'>
					<span class='text-xs font-semibold text-zinc-400 uppercase tracking-wider'>Builds :</span>
					{builds.map((build) => (
						<button
							key={build.name}
							type='button'
							onClick={() => applyBuild(build)}
							class={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
								activeBuildName === build.name
									? 'bg-purple-600 text-white'
									: 'bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:border-purple-500/40 hover:text-zinc-100'
							}`}
						>
							{build.name}
						</button>
					))}
					<button
						type='button'
						onClick={clearAll}
						class='px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800 border border-zinc-700/60 text-zinc-500 hover:text-red-400 hover:border-red-500/30 transition-colors'
					>
						Réinitialiser
					</button>
				</div>
			)}

			{openPicker && <button type='button' class='fixed inset-0 z-40' onClick={() => setOpenPicker(null)} />}

			<div class='flex flex-col lg:flex-row gap-6'>
				<div class={showDetails ? 'lg:w-2/3 space-y-6' : 'w-full space-y-6'}>
					<div>
						<p class='text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2'>
							<span class='text-base'>🛡️</span> Armure
						</p>
						<div class='grid grid-cols-2 gap-3'>
							{ARMOR_SLOTS.map(({ label, iconKey }, i) => (
								<EquipmentSlot
									key={iconKey}
									slotLabel={label}
									iconKey={iconKey}
									value={armorSlots[i]}
									availableSets={armorSlotSets}
									allSets={armorSlotSets}
									isOpen={openPicker?.type === 'armor' && openPicker?.index === i}
									onToggle={() => handleToggle('armor', i)}
									onSelect={(id) => handleSelect('armor', i, id)}
									onClear={() => handleSelect('armor', i, null)}
									stats={showDetails ? equipmentStats?.[iconKey as keyof EquipmentStats] : undefined}
								/>
							))}
						</div>
					</div>
					<div>
						<p class='text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2'>
							<span class='text-base'>💍</span> Bijoux
						</p>
						<div class='grid grid-cols-2 gap-3'>
							{JEWELRY_SLOTS.map(({ label, iconKey }, i) => (
								<EquipmentSlot
									key={iconKey}
									slotLabel={label}
									iconKey={iconKey}
									value={jewelrySlots[i]}
									availableSets={jewelrySlotSets}
									allSets={jewelrySlotSets}
									isOpen={openPicker?.type === 'jewelry' && openPicker?.index === i}
									onToggle={() => handleToggle('jewelry', i)}
									onSelect={(id) => handleSelect('jewelry', i, id)}
									onClear={() => handleSelect('jewelry', i, null)}
									stats={showDetails ? equipmentStats?.[iconKey as keyof EquipmentStats] : undefined}
								/>
							))}
						</div>
					</div>
				</div>

				{showDetails && (
					<div class='lg:w-1/3'>
						<p class='text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3'>
							Bonus de sets actifs
						</p>
						{activeBonuses.length === 0 ? (
							<div class='bg-zinc-800/30 border border-zinc-700/40 rounded-xl p-4 text-sm text-zinc-500 italic'>
								Équipez 2 pièces du même set pour activer un bonus.
							</div>
						) : (
							<div class='space-y-3'>
								{activeBonuses.map((active) => (
									<div
										key={active.name}
										class='bg-zinc-800/40 border border-purple-500/20 rounded-xl p-4 space-y-2'
									>
										<div class='flex items-center justify-between gap-2'>
											<span class='font-semibold text-sm text-zinc-100'>{active.name}</span>
											<span class='text-[10px] bg-purple-700/40 text-purple-300 border border-purple-600/30 rounded-full px-2 py-0.5 font-medium'>
												{active.count} pcs
											</span>
										</div>
										{active.bonuses.map((b) => (
											<div key={b.pieces} class='flex gap-2'>
												<span class='flex-shrink-0 text-[10px] bg-zinc-700/60 text-zinc-300 border border-zinc-600/40 rounded px-1.5 py-0.5 font-mono font-bold mt-0.5'>
													{b.pieces}
												</span>
												<p class='text-xs text-zinc-300 leading-relaxed'>
													<BonusText text={b.effect} />
												</p>
											</div>
										))}
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
