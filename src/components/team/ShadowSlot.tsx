import { useState } from 'preact/hooks'
import { EmptyOption, Listbox, optionProps, useListbox } from '../sla/Listbox'
import { useFlashOnChange } from '../sla/useFlashOnChange'
import type { ShadowData } from './types'

export function ShadowSlot({
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
	const flash = useFlashOnChange(selected?.name ?? null)
	const select = (next: ShadowData | null) => {
		flash.markChange(next?.name ?? null)
		onSelect(next)
	}
	const [open, setOpen] = useState(false)
	const img = selected ? (selected.render ?? selected.image ?? selected.ranks?.general) : null
	const lb = useListbox({
		open,
		onToggle: () => setOpen((p) => !p),
		onClose: () => setOpen(false),
		label: `Ombre ${slot}`,
		value: selected?.name ?? 'vide',
	})

	return (
		<div className='relative sla-team-slot' style={{ '--i': slot - 1 }}>
			<div
				ref={flash.ref}
				className={`sla-shadow-slot bg-zinc-800/50 border rounded-2xl p-4 transition-colors ${open ? 'border-purple-500/60' : 'border-purple-900/40 hover:border-purple-600/50'}`}
			>
				<div className='relative'>
					<button
						type='button'
						{...lb.triggerProps}
						className={`w-full flex flex-col items-center gap-2 text-center ${selected ? 'pb-6' : ''}`}
					>
						{selected ? (
							<>
								{img ? (
									<img
										src={img}
										loading='lazy'
										decoding='async'
										width={80}
										height={80}
										alt={selected.name}
										className='w-20 h-20 object-contain rounded-xl bg-zinc-700/30 drop-shadow-lg'
										onError={(e) => {
											;(e.target as HTMLImageElement).style.display = 'none'
										}}
									/>
								) : (
									<div className='w-20 h-20 rounded-xl bg-purple-900/20 border border-purple-700/30 flex items-center justify-center'>
										<img
											src='/assets/utils/Hunter_Icon.png'
											alt=''
											className='w-10 h-10 object-contain opacity-40'
										/>
									</div>
								)}
								<div className='min-w-0 max-w-full'>
									<p className='text-label text-purple-400 font-semibold uppercase tracking-wider break-words'>
										{selected.title}
									</p>
									<p className='text-sm font-semibold text-zinc-100 leading-tight break-words'>
										{selected.name}
									</p>
								</div>
							</>
						) : (
							<>
								<div className='w-20 h-20 rounded-xl bg-purple-900/10 border border-dashed border-purple-800/40 flex items-center justify-center'>
									<img
										src='/assets/utils/Hunter_Icon.png'
										alt=''
										className='w-10 h-10 object-contain opacity-30'
									/>
								</div>
								<p className='text-xs text-zinc-500'>Ombre {slot}</p>
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
							aria-label='Retirer cette ombre'
						>
							×
						</button>
					)}
				</div>

				{selected && (
					<div className='mt-2 pt-2 border-t border-zinc-700/40'>
						<p className='text-label text-zinc-500 leading-relaxed'>{selected.shadowAuthority}</p>
					</div>
				)}
			</div>

			{open && (
				<Listbox
					{...lb.popupProps}
					className='absolute z-50 top-full mt-1 left-0 w-64 max-h-72 overflow-y-auto bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl'
				>
					<EmptyOption
						selected={!selected}
						onClick={() => {
							select(null)
							setOpen(false)
						}}
					/>
					{shadows.map((s) => {
						const thumb = s.render ?? s.image ?? s.ranks?.general
						return (
							<button
								key={s.name}
								type='button'
								{...optionProps(selected?.name === s.name)}
								onClick={() => {
									select(s)
									setOpen(false)
								}}
								className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors ${selected?.name === s.name ? 'bg-purple-900/20' : ''}`}
							>
								{thumb ? (
									<img
										src={thumb}
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
								) : (
									<div className='w-8 h-8 rounded-lg bg-purple-900/20 flex items-center justify-center flex-shrink-0'>
										<img
											src='/assets/utils/Hunter_Icon.png'
											alt=''
											className='w-5 h-5 object-contain opacity-40'
										/>
									</div>
								)}
								<div className='text-left min-w-0'>
									<p className='text-sm text-zinc-200 truncate'>{s.name}</p>
									<p className='text-label text-purple-400 truncate'>{s.title}</p>
								</div>
							</button>
						)
					})}
				</Listbox>
			)}
		</div>
	)
}
