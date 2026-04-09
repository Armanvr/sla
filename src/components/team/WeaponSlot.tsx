import { useState } from 'preact/hooks'
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
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')

	const close = () => {
		setOpen(false)
		setSearch('')
	}
	const filtered = search.trim()
		? weapons.filter((w) => w.name.toLowerCase().includes(search.toLowerCase()))
		: weapons

	return (
		<div class='relative'>
			{open && <button type='button' class='fixed inset-0 z-40' onClick={close} aria-label='Fermer' />}

			<div
				class={`bg-zinc-800/50 border rounded-2xl p-4 transition-colors ${open ? 'border-amber-500/60' : 'border-amber-900/40 hover:border-amber-600/50'}`}
			>
				<button
					type='button'
					onClick={() => setOpen((p) => !p)}
					class='w-full flex flex-col items-center gap-2 text-center'
				>
					{selected ? (
						<>
							<img
								src={selected.icon}
								alt={selected.name}
								class='w-20 h-20 object-contain rounded-xl bg-zinc-700/30 drop-shadow-lg'
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
							<p class='text-sm font-semibold text-zinc-100 leading-tight'>{selected.name}</p>
							<button
								type='button'
								onClick={(e) => {
									e.stopPropagation()
									onSelect(null)
								}}
								class='text-zinc-600 hover:text-red-400 transition-colors text-base leading-none'
								aria-label='Retirer cette arme'
							>
								×
							</button>
						</>
					) : (
						<>
							<div class='w-20 h-20 rounded-xl bg-amber-900/10 border border-dashed border-amber-800/40 flex items-center justify-center text-zinc-500 text-3xl'>
								⚔️
							</div>
							<p class='text-xs text-zinc-500'>Arme {slot}</p>
						</>
					)}
				</button>
			</div>

			{open && (
				<div class='absolute z-50 top-full mt-1 left-0 w-64 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl flex flex-col'>
					<div class='p-2 border-b border-zinc-700/50'>
						<input
							type='text'
							placeholder='Rechercher...'
							value={search}
							onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
							class='w-full bg-zinc-700/50 border border-zinc-600/50 rounded-lg px-2 py-1 text-xs text-zinc-200 placeholder-zinc-500 outline-none focus:border-amber-500/50'
							onClick={(e) => e.stopPropagation()}
						/>
					</div>
					<div class='max-h-64 overflow-y-auto'>
						<button
							type='button'
							onClick={() => {
								onSelect(null)
								close()
							}}
							class='w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors'
						>
							<div class='w-8 h-8 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 flex-shrink-0'>
								–
							</div>
							<span class='text-sm text-zinc-500'>— Vide —</span>
						</button>
						<div class='border-t border-zinc-700/50' />
						{filtered.map((w) => (
							<button
								key={w.name}
								type='button'
								onClick={() => {
									onSelect(w)
									close()
								}}
								class={`w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors ${selected?.name === w.name ? 'bg-amber-900/20' : ''}`}
							>
								<img
									src={w.icon}
									alt={w.name}
									class='w-8 h-8 rounded-lg object-contain flex-shrink-0 bg-zinc-700/40'
									onError={(e) => {
										;(e.target as HTMLImageElement).style.display = 'none'
									}}
								/>
								<span class='text-sm text-zinc-200 truncate text-left'>{w.name}</span>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
