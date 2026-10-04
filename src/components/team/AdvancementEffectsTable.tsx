import { aggregateTeamEffects } from './advancementEffects'
import type { Hunter } from './types'

interface Props {
	hunters: (Hunter | null)[]
}

const ROW_CLASSES: Record<'increase' | 'decrease' | 'other', string> = {
	increase: 'bg-weak-bg text-weak',
	decrease: 'bg-resist-bg text-resist',
	other: 'bg-bg-wash text-mana-bright',
}

const BADGE_CLASSES: Record<'increase' | 'decrease' | 'other', string> = {
	increase: 'bg-weak-bg text-weak border border-weak/40',
	decrease: 'bg-resist-bg text-resist border border-resist/40',
	other: 'bg-bg-wash text-mana-bright border border-mana-dim',
}

const ARROW: Record<'increase' | 'decrease' | 'other', string> = {
	increase: '↑',
	decrease: '↓',
	other: '~',
}

export function AdvancementEffectsTable({ hunters }: Props) {
	const filled = hunters.filter(Boolean)
	if (filled.length === 0) return null

	const effects = aggregateTeamEffects(hunters)
	if (effects.length === 0) return null

	return (
		<div className='mt-6'>
			<p className='text-xs font-hud text-text-sla-secondary uppercase tracking-widest mb-2'>
				Cumul des effets d'advancements
			</p>
			<div className='overflow-x-auto border border-border-sla'>
				<table className='w-full text-sm border-collapse'>
					<thead>
						<tr className='bg-bg-surface text-text-sla-secondary text-xs uppercase tracking-wider'>
							<th className='px-4 py-2 text-left font-medium'>Effect</th>
							<th className='px-4 py-2 text-right font-medium w-28'>Total</th>
							<th className='px-4 py-2 text-center font-medium w-12'>Dir.</th>
						</tr>
					</thead>
					<tbody>
						{effects.map((e, i) => (
							<tr key={i} className={`border-t border-border-sla ${ROW_CLASSES[e.direction]}`}>
								<td className='px-4 py-2 font-medium'>{e.label}</td>
								<td className='px-4 py-2 text-right'>
									{e.total !== null && e.rawValues.length > 0 ? (
										<span
											className={`inline-block px-2 py-0.5 text-xs font-hud tabular-nums ${BADGE_CLASSES[e.direction]}`}
										>
											{e.rawValues[0]?.includes('%')
												? `${e.total.toFixed(1)}%`
												: e.total.toFixed(1)}
										</span>
									) : (
										<span className='text-text-sla-muted text-xs'>—</span>
									)}
								</td>
								<td className='px-4 py-2 text-center text-base font-bold'>{ARROW[e.direction]}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
