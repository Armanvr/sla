import { skillSectionLabels } from './constants'
import { SkillCard } from './SkillCard'
import type { HunterData } from './types'

function SkillGroup({ keys, skills }: { keys: readonly (keyof HunterData['skills'])[]; skills: HunterData['skills'] }) {
	const hasAny = keys.some((k) => (skills[k]?.length ?? 0) > 0)
	if (!hasAny) return null

	return (
		<div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
			{keys.map((key) => {
				const list = skills[key]
				if (!list || list.length === 0) return null
				return (
					<div key={key}>
						<h4 class='text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4'>
							{skillSectionLabels[key]}
						</h4>
						<div class='grid grid-cols-1 gap-4'>
							{list.map((skill) => (
								<SkillCard key={skill.name} skill={skill} label={skillSectionLabels[key]} />
							))}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export function SkillsSection({ skills }: { skills: HunterData['skills'] }) {
	const hasAny = (['basic', 'core', 'skill', 'support', 'qte', 'ultimate'] as const).some(
		(k) => (skills[k]?.length ?? 0) > 0,
	)

	if (!hasAny) {
		return (
			<div class='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{['Basic Skills', 'QTE Skills', 'Ultimate Skills'].map((t) => (
					<div key={t} class='bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4'>
						<h4 class='text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2'>{t}</h4>
						<p class='text-sm text-zinc-500 italic'>Coming soon...</p>
					</div>
				))}
			</div>
		)
	}

	return (
		<div class='space-y-14'>
			<SkillGroup keys={['basic', 'core']} skills={skills} />
			<SkillGroup keys={['skill', 'support']} skills={skills} />
			<SkillGroup keys={['qte', 'ultimate']} skills={skills} />
		</div>
	)
}
