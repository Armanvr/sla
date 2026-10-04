import { useState } from 'preact/hooks'
import artifactsData from '../../data/artifacts/artifacts.json'
import { EmptyOption, Listbox, optionProps, useListbox } from '../sla/Listbox'
import { useFlashOnChange } from '../sla/useFlashOnChange'
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
						<span key={i} className='text-mana-bright'>
							{part}
						</span>
					)
				if (part === 'Attack' || part === 'Defense')
					return (
						<span key={i} className='text-text-sla font-semibold'>
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
		<div className='mt-1.5'>
			<button
				type='button'
				onClick={() => setOpen((o) => !o)}
				className='flex items-center gap-1 text-label text-text-sla-muted uppercase tracking-wider hover:text-text-sla transition-colors px-1 select-none'
			>
				<span>Stats</span>
				<span className='font-mono'>{open ? '▲' : '▼'}</span>
			</button>
			{open && (
				<div className='mt-1 bg-bg-surface border border-border-sla px-3 py-2 space-y-0.5'>
					{main && <p className='text-xs font-bold text-text-sla'>{main}</p>}
					{secondary.map((s) => (
						<p key={s} className='text-xs text-text-sla-secondary'>
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
				loading='lazy'
				decoding='async'
				alt={name}
				className={`${sizeClass} object-cover flex-shrink-0 bg-bg-container`}
				onError={(e) => {
					;(e.target as HTMLImageElement).style.display = 'none'
				}}
			/>
		)
	}
	return (
		<div
			className={`${sizeClass} bg-bg-container flex items-center justify-center text-text-sla-muted text-xs flex-shrink-0`}
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
	onClose,
	onSelect,
	stats,
}: {
	slotLabel: string
	iconKey: string
	value: string | null
	availableSets: ArtifactSet[]
	allSets: ArtifactSet[]
	isOpen: boolean
	onToggle: () => void
	onClose: () => void
	onSelect: (id: string | null) => void
	stats?: SlotStats
}) {
	const flash = useFlashOnChange(value)
	const select = (next: string | null) => {
		flash.markChange(next)
		onSelect(next)
	}
	const selected = value ? allSets.find((s) => s.id === value) : null
	const selectedIcon = selected?.icons[iconKey] ?? null
	const lb = useListbox({ open: isOpen, onToggle, onClose, label: slotLabel, value: selected?.name ?? 'vide' })
	return (
		<div className='relative'>
			<div ref={flash.ref} className='relative'>
				<button
					type='button'
					{...lb.triggerProps}
					className={`w-full flex items-center gap-3 bg-bg-surface border py-2.5 text-left transition-colors ${
						selected ? 'pl-3 pr-9' : 'px-3'
					} ${isOpen ? 'border-mana' : 'border-border-sla hover:border-border-sla-bright'}`}
				>
					{selected ? (
						<ArtifactIcon src={selectedIcon} name={selected.name} />
					) : (
						<div className='w-10 h-10 bg-bg-container border border-dashed border-border-sla-bright flex items-center justify-center text-text-sla-muted text-lg flex-shrink-0'>
							+
						</div>
					)}
					<div className='flex-1 min-w-0'>
						<p className='text-label text-text-sla-muted uppercase tracking-wider leading-none mb-0.5'>
							{slotLabel}
						</p>
						<p
							className={`text-sm truncate ${selected ? 'text-text-sla font-medium' : 'text-text-sla-muted'}`}
						>
							{selected ? selected.name : '—'}
						</p>
					</div>
				</button>
				{selected && (
					<button
						type='button'
						onClick={() => {
							select(null)
							lb.focusTrigger()
						}}
						className='absolute right-[5px] top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-text-sla-muted hover:text-danger transition-colors text-lg leading-none cursor-pointer'
						aria-label='Vider le slot'
					>
						×
					</button>
				)}
			</div>

			{isOpen && (
				<Listbox
					{...lb.popupProps}
					className='absolute z-50 top-full mt-1 left-0 w-64 max-h-64 overflow-y-auto bg-bg-elevated border border-border-sla-bright'
				>
					<EmptyOption selected={!selected} onClick={() => select(null)} />
					{availableSets.map((s) => (
						<button
							key={s.id}
							type='button'
							{...optionProps(s.id === value)}
							onClick={() => select(s.id)}
							className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-container transition-colors ${s.id === value ? 'bg-bg-wash' : ''}`}
						>
							<ArtifactIcon src={s.icons[iconKey]} name={s.name} sizeClass='w-8 h-8' />
							<span className='text-sm text-text-sla text-left'>{s.name}</span>
						</button>
					))}
				</Listbox>
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
				<div className='flex flex-wrap items-center gap-2 mb-5'>
					<span className='text-xs font-semibold text-text-sla-secondary uppercase tracking-wider'>
						Builds :
					</span>
					{builds.map((build) => (
						<button
							key={build.name}
							type='button'
							onClick={() => applyBuild(build)}
							aria-pressed={activeBuildName === build.name}
							className='sla-tap sla-tab px-3 py-1.5 text-sm font-medium'
						>
							{build.name}
						</button>
					))}
					<button
						type='button'
						onClick={clearAll}
						className='sla-tap sla-tab sla-tab-danger px-3 py-1.5 text-sm font-medium'
					>
						Réinitialiser
					</button>
				</div>
			)}

			<div className='flex flex-col gap-6'>
				{showDetails && (
					<div>
						<p className='text-xs font-semibold text-text-sla-secondary uppercase tracking-wider mb-3'>
							Bonus de sets actifs
						</p>
						{activeBonuses.length === 0 ? (
							<div className='bg-bg-surface border border-border-sla p-4 text-sm text-text-sla-muted italic'>
								Équipez 2 pièces du même set pour activer un bonus.
							</div>
						) : (
							<div className='space-y-3'>
								{activeBonuses.map((active) => (
									<div
										key={active.name}
										className='bg-bg-surface border border-mana-dim p-4 space-y-2'
									>
										<div className='flex items-center justify-between gap-2'>
											<span className='font-semibold text-sm text-text-sla'>{active.name}</span>
											<span className='text-label bg-bg-wash text-mana-bright border border-mana-dim px-2 py-0.5 font-medium'>
												{active.count} pcs
											</span>
										</div>
										{active.bonuses.map((b) => (
											<div key={b.pieces} className='flex gap-2'>
												<span className='flex-shrink-0 text-label bg-bg-container text-text-sla-secondary border border-border-sla px-1.5 py-0.5 font-mono font-bold mt-0.5'>
													{b.pieces}
												</span>
												<p className='text-xs text-text-sla-secondary leading-relaxed'>
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

				<div>
					<p className='text-xs font-semibold text-text-sla-secondary uppercase tracking-wider mb-3 flex items-center gap-2'>
						<span>◈</span> Armure
					</p>
					<div className='grid grid-cols-2 gap-3'>
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
								onClose={() => setOpenPicker(null)}
								onSelect={(id) => handleSelect('armor', i, id)}
								stats={showDetails ? equipmentStats?.[iconKey as keyof EquipmentStats] : undefined}
							/>
						))}
					</div>
				</div>

				<div>
					<p className='text-xs font-semibold text-text-sla-secondary uppercase tracking-wider mb-3 flex items-center gap-2'>
						<span>◇</span> Bijoux
					</p>
					<div className='grid grid-cols-2 gap-3'>
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
								onClose={() => setOpenPicker(null)}
								onSelect={(id) => handleSelect('jewelry', i, id)}
								stats={showDetails ? equipmentStats?.[iconKey as keyof EquipmentStats] : undefined}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
