import { useState } from 'preact/hooks'
import { Listbox, optionProps, useListbox } from '../sla/Listbox'
import { useFlashOnChange } from '../sla/useFlashOnChange'
import { MiniLoadout } from './MiniLoadout'
import type { Hunter } from './types'

const WEAPON_PLACEHOLDER = '/assets/utils/Placeholder_Weapon_Icon.png'

const rarityClass: Record<string, string> = {
	SSR: 'sla-rarity sla-rarity-ssr',
	SR: 'sla-rarity sla-rarity-sr',
	R: 'sla-rarity sla-rarity-r',
}

export function HunterSlot({
	slot,
	selected,
	hunters,
	onSelect,
	preferredBuild,
	role,
}: {
	slot: number
	selected: Hunter | null
	hunters: Hunter[]
	onSelect: (h: Hunter | null) => void
	preferredBuild?: string
	role?: string
}) {
	const flash = useFlashOnChange(selected?.id ?? null)
	const select = (next: Hunter | null) => {
		flash.markChange(next?.id ?? null)
		onSelect(next)
	}
	const [open, setOpen] = useState(false)
	const primaryEl = selected?.data.elements.find((e) => e.primary) ?? selected?.data.elements[0]
	const lb = useListbox({
		open,
		onToggle: () => setOpen((p) => !p),
		onClose: () => setOpen(false),
		label: `Chasseur ${slot}`,
		value: selected?.data.name ?? 'vide',
	})

	return (
		<div className='relative sla-team-slot' style={{ '--i': slot - 1 }}>
			<div
				ref={flash.ref}
				className='sla-panel sla-hunter-slot'
				style={{
					padding: 16,
					...(open ? { outline: '1px solid var(--sla-mana)' } : {}),
				}}
			>
				<div className='relative'>
					<button
						type='button'
						{...lb.triggerProps}
						className={`w-full flex flex-col items-center gap-2 text-center ${selected ? 'pb-6' : ''}`}
					>
						{selected ? (
							<>
								<img
									src={selected.data.icon ?? selected.data.image}
									loading='lazy'
									decoding='async'
									width={80}
									height={80}
									alt={selected.data.name}
									className='w-20 h-20 object-contain rounded-xl bg-zinc-700/30 drop-shadow-lg'
									onError={(e) => {
										;(e.target as HTMLImageElement).style.display = 'none'
									}}
								/>
								<div className='min-w-0 max-w-full'>
									<p className={rarityClass[selected.data.rarity ?? ''] ?? 'sla-label'}>
										{selected.data.rarity}
									</p>
									<p
										style={{
											fontFamily: 'var(--sla-font-hud)',
											fontSize: 'var(--sla-text-xs)',
											color: 'var(--sla-text-primary)',
											fontWeight: 700,
											lineHeight: 1.25,
										}}
										className='break-words'
									>
										{selected.data.name}
									</p>
									{primaryEl && (
										<p className='sla-label' style={{ marginTop: 2 }}>
											{primaryEl.name}
										</p>
									)}
								</div>
							</>
						) : (
							<>
								<div className='w-20 h-20 rounded-xl bg-zinc-700/20 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 text-3xl'>
									+
								</div>
								<p className='sla-label'>Chasseur {slot}</p>
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
							className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center text-zinc-600 hover:text-red-400 transition-colors text-base leading-none'
							aria-label='Retirer ce chasseur'
						>
							×
						</button>
					)}
				</div>

				{selected && (
					<div
						className='mt-2 pt-2 flex items-center gap-2'
						style={{ borderTop: '1px solid var(--sla-border)' }}
					>
						<img
							src={selected.data.weapon?.icon || WEAPON_PLACEHOLDER}
							loading='lazy'
							decoding='async'
							width={24}
							height={24}
							alt={selected.data.weapon?.name ?? 'Weapon'}
							className='w-6 h-6 object-contain rounded flex-shrink-0'
							onError={(e) => {
								;(e.target as HTMLImageElement).src = WEAPON_PLACEHOLDER
							}}
						/>
						<span
							className='min-w-0 truncate leading-tight'
							style={{ fontSize: 'var(--sla-text-xs)', color: 'var(--sla-text-muted)' }}
						>
							{selected.data.weapon?.name ?? '—'}
						</span>
					</div>
				)}

				{role && (
					<div className='text-center'>
						<span className='sla-label'>{role}</span>
					</div>
				)}

				{selected && (
					<MiniLoadout
						builds={selected.data.builds}
						preferredBuild={preferredBuild}
						coreBuild={selected.data.coreBuild}
					/>
				)}
			</div>

			{open && (
				<Listbox
					{...lb.popupProps}
					className='absolute z-50 top-full mt-1 left-0 w-64 max-h-72 overflow-y-auto shadow-2xl rounded-xl bg-bg-elevated border border-border-sla'
				>
					<button
						type='button'
						{...optionProps(!selected)}
						onClick={() => {
							select(null)
							setOpen(false)
						}}
						className='w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors'
					>
						<div className='w-8 h-8 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 flex-shrink-0'>
							–
						</div>
						<span style={{ fontSize: 'var(--sla-text-sm)', color: 'var(--sla-text-muted)' }}>— Vide —</span>
					</button>
					<div role='none' style={{ borderTop: '1px solid var(--sla-border)' }} />
					{hunters.map((h) => (
						<button
							key={h.id}
							type='button'
							{...optionProps(selected?.id === h.id)}
							onClick={() => {
								select(h)
								setOpen(false)
							}}
							className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors ${selected?.id === h.id ? 'bg-purple-900/20' : ''}`}
						>
							<img
								src={h.data.icon ?? h.data.image}
								loading='lazy'
								decoding='async'
								width={32}
								height={32}
								alt=''
								className='w-8 h-8 rounded-lg object-contain flex-shrink-0 bg-zinc-700/40'
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
							<div className='text-left min-w-0'>
								<p
									className='truncate'
									style={{ fontSize: 'var(--sla-text-sm)', color: 'var(--sla-text-secondary)' }}
								>
									{h.data.name}
								</p>
								{h.data.rarity && (
									<p className={rarityClass[h.data.rarity] ?? 'sla-label'}>{h.data.rarity}</p>
								)}
							</div>
						</button>
					))}
				</Listbox>
			)}
		</div>
	)
}
