import { useState } from 'preact/hooks'
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
	const [open, setOpen] = useState(false)
	const img = selected ? (selected.render ?? selected.image ?? selected.ranks?.general) : null

	return (
		<div class='relative'>
			{open && (
				<button type='button' class='fixed inset-0 z-40' onClick={() => setOpen(false)} aria-label='Fermer' />
			)}

			<div
				class={`bg-zinc-800/50 border rounded-2xl p-4 transition-colors ${open ? 'border-purple-500/60' : 'border-purple-900/40 hover:border-purple-600/50'}`}
			>
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
									onError={(e) => {
										;(e.target as HTMLImageElement).style.display = 'none'
									}}
								/>
							) : (
								<div class='w-20 h-20 rounded-xl bg-purple-900/20 border border-purple-700/30 flex items-center justify-center'>
									<img src='/assets/utils/Hunter_Icon.png' alt='' class='w-10 h-10 object-contain opacity-40' />
								</div>
							)}
							<div>
								<p class='text-[10px] text-purple-400 font-semibold uppercase tracking-wider'>
									{selected.title}
								</p>
								<p class='text-sm font-semibold text-zinc-100 leading-tight'>{selected.name}</p>
							</div>
							<button
								type='button'
								onClick={(e) => {
									e.stopPropagation()
									onSelect(null)
								}}
								class='text-zinc-600 hover:text-red-400 transition-colors text-base leading-none'
								aria-label='Retirer cette ombre'
							>
								×
							</button>
						</>
					) : (
						<>
							<div class='w-20 h-20 rounded-xl bg-purple-900/10 border border-dashed border-purple-800/40 flex items-center justify-center'>
								<img src='/assets/utils/Hunter_Icon.png' alt='' class='w-10 h-10 object-contain opacity-30' />
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
					{shadows.map((s) => {
						const thumb = s.render ?? s.image ?? s.ranks?.general
						return (
							<button
								key={s.name}
								type='button'
								onClick={() => {
									onSelect(s)
									setOpen(false)
								}}
								class={`w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors ${selected?.name === s.name ? 'bg-purple-900/20' : ''}`}
							>
								{thumb ? (
									<img
										src={thumb}
										alt={s.name}
										class='w-8 h-8 rounded-lg object-contain flex-shrink-0 bg-zinc-700/40'
										onError={(e) => {
											;(e.target as HTMLImageElement).style.display = 'none'
										}}
									/>
								) : (
									<div class='w-8 h-8 rounded-lg bg-purple-900/20 flex items-center justify-center flex-shrink-0'>
										<img src='/assets/utils/Hunter_Icon.png' alt='' class='w-5 h-5 object-contain opacity-40' />
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
