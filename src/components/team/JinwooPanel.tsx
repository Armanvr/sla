import jinwooData from '../../data/hunters/sung-jinwoo.json'
import { CoresSection } from '../hunter/CoresSection'
import { EquipmentSection } from '../hunter/EquipmentSection'
import type { HunterData } from '../hunter/types'
import { RowLabel } from './RowLabel'
import type { WeaponData } from './types'
import { UnderConstruction } from './UnderConstruction'
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
		<section>
			<div class='flex flex-col lg:flex-row gap-8'>
				{/* ── Portrait ── */}
				<div class='flex-shrink-0 flex flex-col items-center gap-3 lg:w-48'>
					<img src={jinwooData.image} alt={jinwooData.name} class='w-40 object-contain drop-shadow-2xl' />
					<div class='text-center'>
						<p class='text-xs text-amber-400 font-bold'>{jinwooData.rarity}</p>
						<p class='text-sm font-bold text-zinc-100'>{jinwooData.name}</p>
						<p class='text-[10px] text-zinc-500'>{(jinwooData as HunterData).title}</p>
					</div>
				</div>

				{/* ── Build sections ── */}
				<div class='flex-1 space-y-8 min-w-0'>
					<div>
						<RowLabel>Armes</RowLabel>
						<div class='grid grid-cols-2 gap-4'>
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

					<hr class='border-zinc-800' />

					<div>
						<RowLabel>Équipements</RowLabel>
						<EquipmentSection
							builds={(jinwooData as HunterData).builds}
							equipmentStats={(jinwooData as HunterData).equipmentStats}
							showDetails={false}
						/>
					</div>

					<hr class='border-zinc-800' />

					<div>
						<RowLabel>Cores</RowLabel>
						<CoresSection
							coreBuild={(jinwooData as HunterData).coreBuild}
							coreStats={(jinwooData as HunterData).coreStats}
							showDetails={false}
						/>
					</div>

					<hr class='border-zinc-800' />

					<div>
						<RowLabel>Techniques &amp; Runes</RowLabel>
						<UnderConstruction />
					</div>
				</div>
			</div>
		</section>
	)
}
