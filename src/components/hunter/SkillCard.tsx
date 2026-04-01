import type { BasicSkill } from './types'

export function EffectPill({ effect }: { effect: string }) {
	return (
		<span class='bg-blue-900/40 text-blue-300 border border-blue-700/30 text-xs px-2 py-0.5 rounded-full'>
			{effect}
		</span>
	)
}

export function SkillCard({ skill, label }: { skill: BasicSkill; label: string }) {
	return (
		<div class='h-full bg-zinc-800/40 border border-zinc-700/40 rounded-xl p-4 hover:border-zinc-600/60 transition-colors flex flex-col'>
			<div class='flex items-start gap-3 mb-3'>
				{skill.icon && (
					<img
						src={skill.icon}
						alt={skill.name}
						class='w-12 h-12 rounded-lg border border-zinc-700/50 object-cover flex-shrink-0'
						onError={(e) => {
							;(e.target as HTMLImageElement).style.display = 'none'
						}}
					/>
				)}
				<div class='min-w-0'>
					<p class='text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5'>{label}</p>
					<h4 class='font-semibold text-zinc-100 leading-tight'>{skill.name}</h4>
				</div>
			</div>

			<p class='text-sm text-zinc-400 mb-3'>{skill.description}</p>

			<div class='space-y-1.5 text-sm'>
				{skill.damage && (
					<div class='flex justify-between'>
						<span class='text-zinc-500'>Damage</span>
						<span class='text-amber-400 font-medium'>{skill.damage}</span>
					</div>
				)}
				{skill.stages?.map((s) => (
					<div key={s.stage} class='flex justify-between'>
						<span class='text-zinc-500'>Stage {s.stage}</span>
						<span class='text-amber-400 font-medium'>{s.damage}</span>
					</div>
				))}
				{skill.cooldown != null && (
					<div class='flex justify-between'>
						<span class='text-zinc-500'>Cooldown</span>
						<span class='text-zinc-300'>{skill.cooldown}s</span>
					</div>
				)}
				{skill.mpCost && (
					<div class='flex justify-between'>
						<span class='text-zinc-500'>MP Cost</span>
						<span class='text-blue-400'>{skill.mpCost}</span>
					</div>
				)}
				{skill.powerGaugeCost !== undefined && (
					<div class='flex justify-between'>
						<span class='text-zinc-500'>Power Gauge</span>
						<span class='text-yellow-400'>{skill.powerGaugeCost}%</span>
					</div>
				)}
			</div>

			{skill.effects && skill.effects.length > 0 && (
				<div class='mt-3 flex flex-wrap gap-1.5'>
					{skill.effects.map((e) => (
						<EffectPill key={e} effect={e} />
					))}
				</div>
			)}
		</div>
	)
}
