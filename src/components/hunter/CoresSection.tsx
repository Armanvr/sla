import type { ComponentChildren } from 'preact'
import { useState } from 'preact/hooks'
import coresData from '../../data/cores/cores.json'
import { EmptyOption, Listbox, optionProps, useListbox } from '../sla/Listbox'
import { useFlashOnChange } from '../sla/useFlashOnChange'
import { CORE_SLOTS } from './constants'
import { StatsPanel } from './EquipmentSection'
import type { Core, CoreBuild, CoreStats } from './types'

function CoreSlot({
	label,
	emoji,
	cores,
	selectedId,
	selected,
	isOpen,
	isLocked,
	isFreeChoice,
	onToggle,
	onClose,
	onSelect,
	children,
}: {
	label: string
	emoji: string
	cores: Core[]
	selectedId: string | null
	selected?: Core | null
	isOpen: boolean
	isLocked: boolean
	isFreeChoice: boolean
	onToggle: () => void
	onClose: () => void
	onSelect: (id: string | null) => void
	children: ComponentChildren
}) {
	const flash = useFlashOnChange(selectedId)
	const select = (next: string | null) => {
		flash.markChange(next)
		onSelect(next)
	}
	const lb = useListbox({
		open: isOpen,
		onToggle,
		onClose,
		label,
		value: selected ? `${selected.name}${isLocked ? ' (obligatoire)' : ''}` : isFreeChoice ? 'au choix' : 'vide',
	})
	// Supporter-locked spirit slot stays a plain, non-openable button.
	const popupAttrs = isLocked
		? { 'aria-disabled': true, 'aria-label': lb.triggerProps['aria-label'] }
		: lb.triggerProps
	return (
		<div className='relative'>
			<div ref={flash.ref} className='relative'>
				<button
					type='button'
					{...popupAttrs}
					className={`w-full flex items-center gap-3 bg-bg-surface border py-3 text-left transition-colors ${
						selected && !isLocked ? 'pl-3 pr-9' : 'px-3'
					} ${
						isOpen ? 'border-mana' : `border-border-sla ${isLocked ? '' : 'hover:border-border-sla-bright'}`
					} ${isLocked ? 'cursor-default opacity-80' : ''}`}
				>
					{selected ? (
						<img
							src={selected.icon}
							loading='lazy'
							decoding='async'
							width={48}
							height={48}
							alt={selected.name}
							className='w-12 h-12 object-cover flex-shrink-0 bg-bg-container'
							onError={(e) => {
								;(e.target as HTMLImageElement).style.display = 'none'
							}}
						/>
					) : isFreeChoice ? (
						<img
							src='/assets/cores/Core_Set.png'
							loading='lazy'
							decoding='async'
							width={48}
							height={48}
							alt='Au choix'
							className='w-12 h-12 object-cover flex-shrink-0 bg-bg-container'
							onError={(e) => {
								;(e.target as HTMLImageElement).style.display = 'none'
							}}
						/>
					) : (
						<div className='w-12 h-12 bg-bg-container border border-dashed border-border-sla-bright flex items-center justify-center text-text-sla-muted text-lg flex-shrink-0'>
							+
						</div>
					)}
					<div className='flex-1 min-w-0'>
						<p className='text-label text-text-sla-muted uppercase tracking-wider leading-none mb-0.5'>
							{emoji} {label}
						</p>
						<p
							className={`text-sm truncate ${selected ? 'text-text-sla font-medium' : isFreeChoice ? 'text-text-sla-secondary italic' : 'text-text-sla-muted'}`}
						>
							{selected ? selected.name : isFreeChoice ? 'Au choix' : '—'}
						</p>
						{isLocked && (
							<span className='text-label text-mana-bright font-semibold uppercase tracking-wider mt-0.5'>
								Obligatoire
							</span>
						)}
					</div>
				</button>
				{selected && !isLocked && (
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
					<EmptyOption selected={!selectedId} onClick={() => select(null)} />
					{cores.map((core) => (
						<button
							key={core.id}
							type='button'
							{...optionProps(core.id === selectedId)}
							onClick={() => select(core.id)}
							className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-container transition-colors ${core.id === selectedId ? 'bg-bg-wash' : ''}`}
						>
							<img
								src={core.icon}
								loading='lazy'
								decoding='async'
								width={32}
								height={32}
								alt=''
								className='w-8 h-8 object-cover flex-shrink-0 bg-bg-container'
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
							<span className='text-sm text-text-sla text-left'>{core.name}</span>
						</button>
					))}
				</Listbox>
			)}

			{children}
		</div>
	)
}

export function CoresSection({
	coreBuild,
	coreStats,
	showDetails = true,
	hunterCategory,
}: {
	coreBuild?: CoreBuild
	coreStats?: CoreStats
	showDetails?: boolean
	hunterCategory?: string
}) {
	const isSupporterLocked = hunterCategory === 'Supporter'
	const SUPPORTER_SPIRIT = 'ferocious-protectors-claw'

	const [slots, setSlots] = useState<Record<'mind' | 'body' | 'spirit', string | null>>({
		mind: coreBuild?.mind ?? null,
		body: coreBuild?.body ?? null,
		spirit: isSupporterLocked ? SUPPORTER_SPIRIT : (coreBuild?.spirit ?? null),
	})
	const [isDefaultBuild, setIsDefaultBuild] = useState(!!coreBuild)
	const [openPicker, setOpenPicker] = useState<'mind' | 'body' | 'spirit' | null>(null)

	const allCores: Record<string, Core[]> = {
		mind: coresData.mind as Core[],
		body: coresData.body as Core[],
		spirit: coresData.spirit as Core[],
	}

	const coreById = new Map<string, Core>()
	for (const list of Object.values(allCores)) {
		for (const c of list) coreById.set(c.id, c)
	}

	const applyCoreBuild = () => {
		if (!coreBuild) return
		setSlots({
			mind: coreBuild.mind,
			body: coreBuild.body,
			spirit: isSupporterLocked ? SUPPORTER_SPIRIT : coreBuild.spirit,
		})
		setIsDefaultBuild(true)
		setOpenPicker(null)
	}

	const clearCores = () => {
		setSlots({ mind: null, body: null, spirit: isSupporterLocked ? SUPPORTER_SPIRIT : null })
		setIsDefaultBuild(false)
		setOpenPicker(null)
	}

	const selectCore = (slotKey: 'mind' | 'body' | 'spirit', id: string | null) => {
		setSlots((prev) => ({ ...prev, [slotKey]: id }))
		setIsDefaultBuild(false)
		setOpenPicker(null)
	}

	return (
		<div>
			{coreBuild && (
				<div className='flex flex-wrap items-center gap-2 mb-5'>
					<span className='text-xs font-semibold text-text-sla-secondary uppercase tracking-wider'>
						Build :
					</span>
					<button
						type='button'
						onClick={applyCoreBuild}
						aria-pressed={isDefaultBuild}
						className='sla-tap sla-tab px-3 py-1.5 text-sm font-medium'
					>
						Build recommandé
					</button>
					<button
						type='button'
						onClick={clearCores}
						className='sla-tap sla-tab sla-tab-danger px-3 py-1.5 text-sm font-medium'
					>
						Réinitialiser
					</button>
				</div>
			)}

			<div className={'grid gap-3 grid-cols-1'}>
				{CORE_SLOTS.map(({ key, label, emoji }) => {
					const selectedId = slots[key]
					const selected = selectedId ? coreById.get(selectedId) : null
					return (
						<CoreSlot
							key={key}
							label={label}
							emoji={emoji}
							cores={allCores[key]}
							selectedId={selectedId}
							selected={selected}
							isOpen={openPicker === key}
							isLocked={isSupporterLocked && key === 'spirit'}
							isFreeChoice={isDefaultBuild && coreBuild?.[key] === null && selectedId === null}
							onToggle={() => setOpenPicker((prev) => (prev === key ? null : key))}
							onClose={() => setOpenPicker(null)}
							onSelect={(id) => selectCore(key, id)}
						>
							{showDetails && selected && (
								<div className='mt-2 bg-bg-surface border border-border-sla px-3 py-2'>
									<p className='text-xs text-text-sla-secondary leading-relaxed'>
										{selected.effects.legendary}
									</p>
								</div>
							)}

							{showDetails && coreStats?.[key] && <StatsPanel secondary={coreStats[key]!} />}
						</CoreSlot>
					)
				})}
			</div>
		</div>
	)
}
