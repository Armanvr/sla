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
		<section class='space-y-3'>
			{/* ── Compact header ── */}
			<div class='flex items-center gap-3'>
				<img
					src={jinwooData.image}
					alt={jinwooData.name}
					class='w-10 h-10 rounded-lg object-cover bg-zinc-700/40'
				/>
				<div class='flex items-center gap-2'>
					<span class='text-sm font-bold text-zinc-100'>{jinwooData.name}</span>
					<span class='text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded px-1.5 py-0.5'>
						{jinwooData.rarity}
					</span>
					<span class='text-[10px] text-zinc-500'>{(jinwooData as HunterData).title}</span>
				</div>
			</div>

			{/* ── Armes ── */}
			<div>
				<RowLabel>Armes</RowLabel>
				<div class='grid grid-cols-2 gap-3'>
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
			<div class='grid grid-cols-2 gap-6'>
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
