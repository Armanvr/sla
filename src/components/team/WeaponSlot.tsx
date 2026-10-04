import { useState } from 'preact/hooks'
import { EmptyOption, Listbox, optionProps, useListbox } from '../sla/Listbox'
import { useFlashOnChange } from '../sla/useFlashOnChange'
import type { WeaponData } from './types'
import { WEAPONS } from './weapons'

export function WeaponSlot({
	slot,
	selected,
	onSelect,
	weapons = WEAPONS,
}: {
	slot: number
	selected: WeaponData | null
	onSelect: (w: WeaponData | null) => void
	weapons?: WeaponData[]
}) {
	const flash = useFlashOnChange(selected?.name ?? null)
	const select = (next: WeaponData | null) => {
		flash.markChange(next?.name ?? null)
		onSelect(next)
	}
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')

	const close = () => {
		setOpen(false)
		setSearch('')
	}
	const filtered = search.trim()
		? weapons.filter((w) => w.name.toLowerCase().includes(search.toLowerCase()))
		: weapons

	// Touch: autofocusing the search raises the keyboard over the bottom sheet. Evaluated on each render while open.
	const autofocusSearch = !matchMedia('(pointer: coarse)').matches
	const toggle = () => (open ? close() : setOpen(true))
	const lb = useListbox({
		open,
		onToggle: toggle,
		onClose: close,
		label: `Arme ${slot}`,
		value: selected?.name ?? 'vide',
	})

	return (
		<div className='relative'>
			<div ref={flash.ref} className='relative'>
				<button
					type='button'
					{...lb.triggerProps}
					className={`sla-weapon-slot w-full flex items-center gap-3 bg-bg-surface border py-2 transition-colors ${selected ? 'pl-3 pr-9' : 'px-3'} ${open ? 'border-mana' : 'border-border-sla hover:border-mana-dim'}`}
				>
					{selected ? (
						<>
							<img
								src={selected.icon}
								loading='lazy'
								decoding='async'
								width={40}
								height={40}
								alt={selected.name}
								className='w-10 h-10 object-contain bg-bg-container flex-shrink-0'
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
							<p className='flex-1 min-w-0 text-sm font-medium text-text-sla text-left truncate leading-tight'>
								{selected.name}
							</p>
						</>
					) : (
						<>
							<div className='w-10 h-10 bg-bg-container border border-dashed border-border-sla-bright flex-shrink-0' />
							<p className='text-xs text-text-sla-muted'>Arme {slot}</p>
						</>
					)}
				</button>
				{selected && (
					<button
						type='button'
						onClick={() => {
							select(null)
							lb.focusTrigger()
						}}
						className='absolute right-[5px] top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-text-sla-muted hover:text-danger transition-colors text-lg leading-none'
						aria-label='Retirer cette arme'
					>
						×
					</button>
				)}
			</div>

			{open && (
				<Listbox
					{...lb.popupProps}
					className='absolute z-50 top-full mt-1 left-0 w-64 bg-bg-elevated border border-border-sla-bright flex flex-col'
					listClassName='max-h-64 overflow-y-auto'
					header={
						<div className='p-2 border-b border-border-sla'>
							<input
								type='text'
								data-autofocus={autofocusSearch || undefined}
								aria-label='Rechercher une arme'
								placeholder='Rechercher...'
								value={search}
								onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
								className='sla-input w-full px-2 py-1 text-xs'
							/>
						</div>
					}
				>
					<EmptyOption
						selected={!selected}
						onClick={() => {
							select(null)
							close()
						}}
					/>
					{filtered.map((w) => (
						<button
							key={w.name}
							type='button'
							{...optionProps(selected?.name === w.name)}
							onClick={() => {
								select(w)
								close()
							}}
							className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-container transition-colors ${selected?.name === w.name ? 'bg-bg-wash' : ''}`}
						>
							<img
								src={w.icon}
								loading='lazy'
								decoding='async'
								width={32}
								height={32}
								alt=''
								className='w-8 h-8 object-contain flex-shrink-0 bg-bg-container'
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
							<span className='min-w-0 text-sm text-text-sla truncate text-left'>{w.name}</span>
						</button>
					))}
					{filtered.length === 0 && (
						<p role='none' className='px-3 py-2 text-xs text-text-sla-secondary italic'>
							Aucune arme trouvée
						</p>
					)}
				</Listbox>
			)}
		</div>
	)
}
