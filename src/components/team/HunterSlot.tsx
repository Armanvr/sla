import { useState } from 'preact/hooks'
import { MiniLoadout } from './MiniLoadout'
import type { Hunter } from './types'

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
	const [open, setOpen] = useState(false)
	const primaryEl = selected?.data.elements.find((e) => e.primary) ?? selected?.data.elements[0]
	const accentClass = primaryEl ? (elementAccent[primaryEl.name] ?? 'border-zinc-600/50') : 'border-zinc-600/50'

	return (
		<div class='relative'>
			{open && (
				<button type='button' class='fixed inset-0 z-40' onClick={() => setOpen(false)} aria-label='Fermer' />
			)}

			<div
				class={`bg-zinc-800/50 border rounded-2xl p-4 transition-colors ${open ? 'border-purple-500/60' : accentClass}`}
			>
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
								<p
									class={`text-xs font-bold ${rarityColors[selected.data.rarity ?? ''] ?? 'text-zinc-400'}`}
								>
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

				{selected?.data.weapon && (
					<div class='mt-2 pt-2 border-t border-zinc-700/40 flex items-center gap-2'>
						<img
							src={selected.data.weapon.icon}
							alt={selected.data.weapon.name}
							class='w-6 h-6 object-contain rounded flex-shrink-0'
							onError={(e) => {
								;(e.target as HTMLImageElement).style.display = 'none'
							}}
						/>
						<span class='text-[10px] text-zinc-500 truncate leading-tight'>
							{selected.data.weapon.name}
						</span>
					</div>
				)}

				{role && (
					<div class={`${selected?.data.weapon ? '' : 'mt-2 pt-2 border-t border-zinc-700/40 '}text-center`}>
						<span class='text-[10px] text-zinc-600 uppercase tracking-wider font-medium'>{role}</span>
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
									<p class={`text-[10px] ${rarityColors[h.data.rarity] ?? 'text-zinc-500'}`}>
										{h.data.rarity}
									</p>
								)}
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
