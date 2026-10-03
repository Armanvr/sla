import jinwooData from '../../data/hunters/sung-jinwoo.json'
import { CoresSection } from '../hunter/CoresSection'
import { EquipmentSection } from '../hunter/EquipmentSection'
import type { HunterData } from '../hunter/types'
import { RowLabel } from './RowLabel'
import type { WeaponData } from './types'
import { WeaponSlot } from './WeaponSlot'
import { JINWOO_WEAPONS } from './weapons'

export function JinwooPanel({
	selectedWeapons,
	onWeaponSelect,
}: {
	selectedWeapons: [WeaponData | null, WeaponData | null]
	onWeaponSelect: (i: 0 | 1, w: WeaponData | null) => void
}) {
	return (
		<section className='space-y-3'>
			{/* ── Compact header ── */}
			<div className='flex items-center gap-3'>
				<img
					src={jinwooData.image}
					loading='lazy'
					decoding='async'
					width={40}
					height={40}
					alt={jinwooData.name}
					className='w-10 h-10 rounded-lg object-cover bg-zinc-700/40'
				/>
				<div className='flex items-center gap-2'>
					<span className='text-sm font-bold text-zinc-100'>{jinwooData.name}</span>
					<span className='text-label font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded px-1.5 py-0.5'>
						{jinwooData.rarity}
					</span>
					<span className='text-label text-zinc-500'>{(jinwooData as HunterData).title}</span>
				</div>
			</div>

			{/* ── Armes ── */}
			<div>
				<RowLabel>Armes</RowLabel>
				<div className='grid grid-cols-2 gap-3'>
					{([0, 1] as const).map((i) => (
						<WeaponSlot
							key={i}
							slot={i + 1}
							selected={selectedWeapons[i]}
							onSelect={(w) => onWeaponSelect(i, w)}
							weapons={JINWOO_WEAPONS}
						/>
					))}
				</div>
			</div>

			{/* ── Équipements + Cores ── */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div>
					<RowLabel>Équipements</RowLabel>
					<EquipmentSection
						builds={(jinwooData as HunterData).builds}
						equipmentStats={(jinwooData as HunterData).equipmentStats}
						showDetails={false}
					/>
				</div>
				<div>
					<RowLabel>Cores</RowLabel>
					<CoresSection
						coreBuild={(jinwooData as HunterData).coreBuild}
						coreStats={(jinwooData as HunterData).coreStats}
						showDetails={false}
						compact={true}
					/>
				</div>
			</div>
		</section>
	)
}
