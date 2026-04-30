import { CollapsibleSection } from './hunter/CollapsibleSection'
import { CoresSection } from './hunter/CoresSection'
import { EquipmentSection } from './hunter/EquipmentSection'
import { HeroSection, StatBar } from './hunter/HeroSection'
import { SkillsSection } from './hunter/SkillsSection'
import type { HunterData } from './hunter/types'
import { BackLink } from './sla/BackLink'

export type { HunterData }

const rarityVariant: Record<string, string> = {
	SSR: 'sla-rarity sla-rarity-ssr',
	SR: 'sla-rarity sla-rarity-sr',
	R: 'sla-rarity sla-rarity-r',
}

export function HunterProfile({ data }: { data: HunterData }) {
	const hasDetailedStats = !!data.baseStats
	const maxStat = hasDetailedStats
		? Math.max(
				data.baseStats?.maxLevel.hp ?? 0,
				data.baseStats?.maxLevel.attack ?? 0,
				data.baseStats?.maxLevel.defense ?? 0,
			)
		: 0

	return (
		<div class='sla-container' style={{ paddingTop: 32, paddingBottom: 64 }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
				<BackLink />
				{data.rarity && rarityVariant[data.rarity] && (
					<span class={rarityVariant[data.rarity]} style={{ marginLeft: 'auto' }}>
						{data.rarity}
					</span>
				)}
			</div>

			<main class='flex flex-col gap-8'>
				<HeroSection data={data} />

				{hasDetailedStats && (
					<CollapsibleSection title='Base Stats' defaultOpen={true}>
						<div class='grid grid-cols-1 md:grid-cols-2 gap-8'>
							<div class='bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-5 space-y-4'>
								<p class='text-sm text-zinc-400 font-medium'>Level 1</p>
								<StatBar
									label='HP'
									value={data.baseStats?.level1.hp ?? 0}
									max={data.baseStats?.maxLevel.hp ?? 0}
									primary={data.baseStats?.primaryStat === 'HP'}
								/>
								<StatBar
									label='Attack'
									value={data.baseStats?.level1.attack ?? 0}
									max={maxStat}
									primary={data.baseStats?.primaryStat === 'Attack'}
								/>
								<StatBar
									label='Defense'
									value={data.baseStats?.level1.defense ?? 0}
									max={maxStat}
									primary={data.baseStats?.primaryStat === 'Defense'}
								/>
								<div class='pt-2 border-t border-zinc-700/40 flex justify-between text-sm'>
									<span class='text-zinc-500'>Total Power</span>
									<span class='text-amber-400 font-bold'>
										{data.baseStats?.level1.totalPower.toLocaleString()}
									</span>
								</div>
							</div>
							<div class='bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-5 space-y-4'>
								<p class='text-sm text-zinc-400 font-medium'>Max Level (5★ + 5 Dimensional)</p>
								<StatBar
									label='HP'
									value={data.baseStats?.maxLevel.hp ?? 0}
									max={data.baseStats?.maxLevel.hp ?? 0}
									primary={data.baseStats?.primaryStat === 'HP'}
								/>
								<StatBar
									label='Attack'
									value={data.baseStats?.maxLevel.attack ?? 0}
									max={maxStat}
									primary={data.baseStats?.primaryStat === 'Attack'}
								/>
								<StatBar
									label='Defense'
									value={data.baseStats?.maxLevel.defense ?? 0}
									max={maxStat}
									primary={data.baseStats?.primaryStat === 'Defense'}
								/>
								<div class='pt-2 border-t border-zinc-700/40 flex justify-between text-sm'>
									<span class='text-zinc-500'>Total Power</span>
									<span class='text-amber-400 font-bold'>
										{data.baseStats?.maxLevel.totalPower.toLocaleString()}
									</span>
								</div>
							</div>
						</div>
					</CollapsibleSection>
				)}

				<CollapsibleSection title='Equipements' defaultOpen={true}>
					<EquipmentSection builds={data.builds} equipmentStats={data.equipmentStats} />
				</CollapsibleSection>

				<CollapsibleSection title='Cores' defaultOpen={true}>
					<CoresSection coreBuild={data.coreBuild} coreStats={data.coreStats} />
				</CollapsibleSection>

				<CollapsibleSection title='Skills' defaultOpen={true}>
					<SkillsSection skills={data.skills} />
				</CollapsibleSection>

				{data.passive && (
					<CollapsibleSection title='Passive'>
						<div class='bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-5 flex gap-4'>
							{data.passive.icon && (
								<img
									src={data.passive.icon}
									alt={data.passive.name}
									class='w-14 h-14 rounded-lg border border-zinc-700/50 object-cover flex-shrink-0'
									onError={(e) => {
										;(e.target as HTMLImageElement).style.display = 'none'
									}}
								/>
							)}
							<div>
								<h4 class='font-semibold text-zinc-100 mb-1'>{data.passive.name}</h4>
								<p class='text-sm text-zinc-400'>{data.passive.description}</p>
							</div>
						</div>
					</CollapsibleSection>
				)}

				{data.advancements && data.advancements.length > 0 && (
					<CollapsibleSection title='Advancements'>
						<div class='space-y-3'>
							{data.advancements.map((adv, i) => (
								<div key={i} class='flex gap-4 bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4'>
									<span class='text-amber-400 font-bold text-lg leading-none flex-shrink-0 mt-0.5'>
										{'★'.repeat(i + 1)}
									</span>
									<p class='text-sm text-zinc-300'>{adv}</p>
								</div>
							))}
						</div>
					</CollapsibleSection>
				)}
			</main>
		</div>
	)
}
