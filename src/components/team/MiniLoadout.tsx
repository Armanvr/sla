import type { Build, CoreBuild } from '../hunter/types'
import { CORE_BY_ID, CORE_SLOTS_CONFIG, EQUIPMENT_SLOTS, SET_BY_ID } from './artifacts'

function SlotRow({ icon, label, name }: { icon: string | null; label: string; name: string | null }) {
	return (
		<div class='flex items-center gap-1.5 min-w-0'>
			{icon ? (
				<img
					src={icon}
					alt=''
					class='w-4 h-4 rounded flex-shrink-0 bg-zinc-700/40 object-cover'
					onError={(e) => {
						;(e.target as HTMLImageElement).style.display = 'none'
					}}
				/>
			) : (
				<div class='w-4 h-4 rounded bg-zinc-700/30 flex-shrink-0' />
			)}
			<span class='text-[9px] text-zinc-600 flex-shrink-0 w-10 leading-none'>{label}</span>
			<span class='text-[10px] text-zinc-400 truncate leading-none'>{name ?? '—'}</span>
		</div>
	)
}

export function MiniLoadout({
	builds,
	preferredBuild,
	coreBuild,
}: {
	builds?: Build[]
	preferredBuild?: string
	coreBuild?: CoreBuild | null
}) {
	const build = preferredBuild
		? (builds?.find((b) => b.name === preferredBuild) ?? builds?.find((b) => b.name.startsWith('Build Niv. 120')))
		: builds?.find((b) => b.name.startsWith('Build Niv. 120'))

	if (!build && !coreBuild) return null

	const armorSlots = EQUIPMENT_SLOTS.filter((s) => s.source === 'armor')
	const jewelrySlots = EQUIPMENT_SLOTS.filter((s) => s.source === 'jewelry')

	return (
		<div class='mt-2 pt-2 border-t border-zinc-700/40 space-y-2'>
			{build && (
				<>
					<div class='space-y-0.5'>
						<p class='text-[9px] text-zinc-600 uppercase tracking-widest mb-0.5'>Armure</p>
						{armorSlots.map((s) => {
							const set = build.armor[s.idx] ? SET_BY_ID.get(build.armor[s.idx]!) : null
							return (
								<SlotRow
									key={s.iconKey}
									icon={set?.icons[s.iconKey] ?? null}
									label={s.label}
									name={set?.name ?? null}
								/>
							)
						})}
					</div>
					<div class='space-y-0.5'>
						<p class='text-[9px] text-zinc-600 uppercase tracking-widest mb-0.5'>Bijoux</p>
						{jewelrySlots.map((s) => {
							const set = build.jewelry[s.idx] ? SET_BY_ID.get(build.jewelry[s.idx]!) : null
							return (
								<SlotRow
									key={s.iconKey}
									icon={set?.icons[s.iconKey] ?? null}
									label={s.label}
									name={set?.name ?? null}
								/>
							)
						})}
					</div>
				</>
			)}
			{coreBuild && (
				<div class='space-y-0.5'>
					<p class='text-[9px] text-zinc-600 uppercase tracking-widest mb-0.5'>Cores</p>
					{CORE_SLOTS_CONFIG.map(({ key, label }) => {
						const core = coreBuild[key] ? CORE_BY_ID.get(coreBuild[key]!) : null
						return <SlotRow key={key} icon={core?.icon ?? null} label={label} name={core?.name ?? null} />
					})}
				</div>
			)}
		</div>
	)
}
