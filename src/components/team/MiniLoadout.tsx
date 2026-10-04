import type { Build, CoreBuild } from '../hunter/types'
import { CORE_BY_ID, CORE_SLOTS_CONFIG, EQUIPMENT_SLOTS, SET_BY_ID } from './artifacts'

function SlotRow({ icon, label, name }: { icon: string | null; label: string; name: string | null }) {
	return (
		<div className='flex items-center gap-1.5 min-w-0'>
			{icon ? (
				<img
					src={icon}
					loading='lazy'
					decoding='async'
					width={16}
					height={16}
					alt=''
					className='w-4 h-4 flex-shrink-0 bg-bg-container object-cover'
					onError={(e) => {
						;(e.target as HTMLImageElement).style.display = 'none'
					}}
				/>
			) : (
				<div className='w-4 h-4 bg-bg-container flex-shrink-0' />
			)}
			<span className='text-label text-text-sla-muted flex-shrink-0 w-10 leading-none'>{label}</span>
			<span className='text-label text-text-sla-secondary truncate leading-none'>{name ?? '—'}</span>
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
		<div className='mt-2 pt-2 border-t border-border-sla space-y-2'>
			{build && (
				<>
					<div className='space-y-0.5'>
						<p className='text-label text-text-sla-muted uppercase tracking-widest mb-0.5'>Armure</p>
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
					<div className='space-y-0.5'>
						<p className='text-label text-text-sla-muted uppercase tracking-widest mb-0.5'>Bijoux</p>
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
				<div className='space-y-0.5'>
					<p className='text-label text-text-sla-muted uppercase tracking-widest mb-0.5'>Cores</p>
					{CORE_SLOTS_CONFIG.map(({ key, label }) => {
						const core = coreBuild[key] ? CORE_BY_ID.get(coreBuild[key]!) : null
						return <SlotRow key={key} icon={core?.icon ?? null} label={label} name={core?.name ?? null} />
					})}
				</div>
			)}
		</div>
	)
}
