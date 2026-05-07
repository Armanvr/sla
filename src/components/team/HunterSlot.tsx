import { useState } from 'preact/hooks'
import { MiniLoadout } from './MiniLoadout'
import type { Hunter } from './types'

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
	const [open, setOpen] = useState(false)
	const primaryEl = selected?.data.elements.find((e) => e.primary) ?? selected?.data.elements[0]

	return (
		<div class='relative'>
			{open && (
				<button type='button' class='fixed inset-0 z-40' onClick={() => setOpen(false)} aria-label='Fermer' />
			)}

			<div
				class='sla-panel'
				style={{
					padding: 16,
					...(open ? { outline: '1px solid var(--sla-mana)' } : {}),
				}}
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
								<p class={rarityClass[selected.data.rarity ?? ''] ?? 'sla-label'}>
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
								>
									{selected.data.name}
								</p>
								{primaryEl && (
									<p class='sla-label' style={{ marginTop: 2 }}>
										{primaryEl.name}
									</p>
								)}
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
							<p class='sla-label'>Chasseur {slot}</p>
						</>
					)}
				</button>

				{selected && (
					<div class='mt-2 pt-2 flex items-center gap-2' style={{ borderTop: '1px solid var(--sla-border)' }}>
						<img
							src={selected.data.weapon?.icon ?? '/assets/utils/Placeholder_Weapon_Icon.png'}
							alt={selected.data.weapon?.name ?? 'Weapon'}
							class='w-6 h-6 object-contain rounded flex-shrink-0'
							onError={(e) => {
								;(e.target as HTMLImageElement).src = '/assets/utils/Placeholder_Weapon_Icon.png'
							}}
						/>
						<span
							class='truncate leading-tight'
							style={{ fontSize: 'var(--sla-text-xs)', color: 'var(--sla-text-muted)' }}
						>
							{selected.data.weapon?.name ?? '—'}
						</span>
					</div>
				)}

				{role && (
					<div class='text-center'>
						<span class='sla-label'>{role}</span>
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
				<div
					class='absolute z-50 top-full mt-1 left-0 w-64 max-h-72 overflow-y-auto shadow-2xl rounded-xl'
					style={{
						background: 'var(--sla-bg-elevated)',
						border: '1px solid var(--sla-border)',
					}}
				>
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
						<span style={{ fontSize: 'var(--sla-text-sm)', color: 'var(--sla-text-muted)' }}>— Vide —</span>
					</button>
					<div style={{ borderTop: '1px solid var(--sla-border)' }} />
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
								<p
									class='truncate'
									style={{ fontSize: 'var(--sla-text-sm)', color: 'var(--sla-text-secondary)' }}
								>
									{h.data.name}
								</p>
								{h.data.rarity && (
									<p class={rarityClass[h.data.rarity] ?? 'sla-label'}>{h.data.rarity}</p>
								)}
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
