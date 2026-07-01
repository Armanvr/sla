import { aggregateTeamEffects } from './advancementEffects'
import type { Hunter } from './types'

interface Props {
	hunters: (Hunter | null)[]
}

const ROW_CLASSES: Record<'increase' | 'decrease' | 'other', string> = {
	increase: 'bg-emerald-950/40 text-emerald-300',
	decrease: 'bg-amber-900/30 text-amber-300',
	other: 'bg-teal-900/30 text-teal-300',
}

const BADGE_CLASSES: Record<'increase' | 'decrease' | 'other', string> = {
	increase: 'bg-emerald-800/60 text-emerald-200',
	decrease: 'bg-amber-800/50 text-amber-200',
	other: 'bg-teal-800/50 text-teal-200',
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
			<p className='text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2'>
				Cumul des effets d'advancements
			</p>
			<div className='overflow-x-auto rounded-lg border border-zinc-700/50'>
				<table className='w-full text-sm border-collapse'>
					<thead>
						<tr className='bg-zinc-800/80 text-zinc-400 text-xs uppercase tracking-wider'>
							<th className='px-4 py-2 text-left font-medium'>Effect</th>
							<th className='px-4 py-2 text-right font-medium w-28'>Total</th>
							<th className='px-4 py-2 text-center font-medium w-12'>Dir.</th>
						</tr>
					</thead>
					<tbody>
						{effects.map((e, i) => (
							<tr key={i} className={`border-t border-zinc-700/30 ${ROW_CLASSES[e.direction]}`}>
								<td className='px-4 py-2 font-medium'>{e.label}</td>
								<td className='px-4 py-2 text-right'>
									{e.total !== null && e.rawValues.length > 0 ? (
										<span
											className={`inline-block px-2 py-0.5 rounded text-xs font-mono ${BADGE_CLASSES[e.direction]}`}
										>
											{e.rawValues[0]?.includes('%')
												? `${e.total.toFixed(1)}%`
												: e.total.toFixed(1)}
										</span>
									) : (
										<span className='text-zinc-500 text-xs'>—</span>
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
