import { useState } from 'preact/hooks'
import coresData from '../../data/cores/cores.json'
import { CORE_SLOTS } from './constants'
import type { Core, CoreBuild, CoreStats } from './types'
import { StatsPanel } from './EquipmentSection'

export function CoresSection({ coreBuild, coreStats, showDetails = true }: { coreBuild?: CoreBuild; coreStats?: CoreStats; showDetails?: boolean }) {
	const [slots, setSlots] = useState<Record<'mind' | 'body' | 'spirit', string | null>>({
		mind: coreBuild?.mind ?? null,
		body: coreBuild?.body ?? null,
		spirit: coreBuild?.spirit ?? null,
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
		setSlots({ mind: coreBuild.mind, body: coreBuild.body, spirit: coreBuild.spirit })
		setIsDefaultBuild(true)
		setOpenPicker(null)
	}

	const clearCores = () => {
		setSlots({ mind: null, body: null, spirit: null })
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
				<div class='flex flex-wrap items-center gap-2 mb-5'>
					<span class='text-xs font-semibold text-zinc-400 uppercase tracking-wider'>Build :</span>
					<button
						type='button'
						onClick={applyCoreBuild}
						class={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
							isDefaultBuild
								? 'bg-purple-600 text-white'
								: 'bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:border-purple-500/40 hover:text-zinc-100'
						}`}
					>
						Build recommandé
					</button>
					<button
						type='button'
						onClick={clearCores}
						class='px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800 border border-zinc-700/60 text-zinc-500 hover:text-red-400 hover:border-red-500/30 transition-colors'
					>
						Réinitialiser
					</button>
				</div>
			)}

			{openPicker && <button type='button' class='fixed inset-0 z-40' onClick={() => setOpenPicker(null)} />}

			<div class='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				{CORE_SLOTS.map(({ key, label, emoji }) => {
					const selectedId = slots[key]
					const selected = selectedId ? coreById.get(selectedId) : null
					const isOpen = openPicker === key
					const isFreeChoice = isDefaultBuild && coreBuild?.[key] === null && selectedId === null

					return (
						<div key={key} class='relative'>
							<button
								type='button'
								onClick={() => setOpenPicker((prev) => (prev === key ? null : key))}
								class={`w-full flex items-center gap-3 bg-zinc-800/60 border rounded-xl px-3 py-3 text-left transition-colors ${
									isOpen ? 'border-purple-500/60' : 'border-zinc-700/60 hover:border-zinc-500/60'
								}`}
							>
								{selected ? (
									<img
										src={selected.icon}
										alt={selected.name}
										class='w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-zinc-700/40'
										onError={(e) => { ;(e.target as HTMLImageElement).style.display = 'none' }}
									/>
								) : isFreeChoice ? (
									<img
										src='/assets/cores/Core_Set.png'
										alt='Au choix'
										class='w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-zinc-700/40'
										onError={(e) => { ;(e.target as HTMLImageElement).style.display = 'none' }}
									/>
								) : (
									<div class='w-12 h-12 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 text-lg flex-shrink-0'>
										+
									</div>
								)}
								<div class='flex-1 min-w-0'>
									<p class='text-[10px] text-zinc-500 uppercase tracking-wider leading-none mb-0.5'>
										{emoji} {label}
									</p>
									<p class={`text-sm truncate ${selected ? 'text-zinc-100 font-medium' : isFreeChoice ? 'text-zinc-400 italic' : 'text-zinc-500'}`}>
										{selected ? selected.name : isFreeChoice ? 'Au choix' : '—'}
									</p>
								</div>
								{selected && (
									<button
										type='button'
										tabIndex={0}
										onClick={(e) => { e.stopPropagation(); selectCore(key, null) }}
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
										onClick={() => selectCore(key, null)}
										class='w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors'
									>
										<div class='w-8 h-8 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 flex-shrink-0'>
											–
										</div>
										<span class='text-sm text-zinc-500'>— Vide —</span>
									</button>
									<div class='border-t border-zinc-700/50' />
									{allCores[key].map((core) => (
										<button
											key={core.id}
											type='button'
											onClick={() => selectCore(key, core.id)}
											class={`w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-700/50 transition-colors ${core.id === selectedId ? 'bg-purple-900/20' : ''}`}
										>
											<img
												src={core.icon}
												alt={core.name}
												class='w-8 h-8 rounded-lg object-cover flex-shrink-0 bg-zinc-700/40'
												onError={(e) => { ;(e.target as HTMLImageElement).style.display = 'none' }}
											/>
											<span class='text-sm text-zinc-200 text-left'>{core.name}</span>
										</button>
									))}
								</div>
							)}

							{showDetails && selected && (
								<div class='mt-2 bg-zinc-800/30 border border-zinc-700/40 rounded-lg px-3 py-2'>
									<p class='text-xs text-zinc-400 leading-relaxed'>{selected.effects.legendary}</p>
								</div>
							)}

							{showDetails && coreStats?.[key] && <StatsPanel secondary={coreStats[key]!} />}
						</div>
					)
				})}
			</div>
		</div>
	)
}
