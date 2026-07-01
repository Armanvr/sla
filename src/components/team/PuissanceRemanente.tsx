import { MonarchSelector } from './MonarchSelector'
import type { MonarchId } from './monarchs'
import { SuccessorSelector } from './SuccessorSelector'
import type { SuccessorId } from './successors'

export type PuissanceMode = 'monarch' | 'successor'

interface PuissanceRemanenteProps {
	mode: PuissanceMode
	onModeChange: (mode: PuissanceMode) => void
	monarchSelected: MonarchId
	onMonarchChange: (id: MonarchId) => void
	successorSelected: SuccessorId
	onSuccessorChange: (id: SuccessorId) => void
}

export function PuissanceRemanente({
	mode,
	onModeChange,
	monarchSelected,
	onMonarchChange,
	successorSelected,
	onSuccessorChange,
}: PuissanceRemanenteProps) {
	return (
		<div>
			<div className='flex gap-2 mb-4'>
				{(['monarch', 'successor'] as PuissanceMode[]).map((m) => (
					<button
						key={m}
						type='button'
						onClick={() => onModeChange(m)}
						className={[
							'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
							mode === m
								? 'bg-zinc-700 text-zinc-100 border border-zinc-500'
								: 'bg-zinc-800/40 text-zinc-400 border border-zinc-700/40 hover:border-zinc-600 hover:text-zinc-300',
						].join(' ')}
					>
						{m === 'monarch' ? 'Monarque' : 'Successeur'}
					</button>
				))}
			</div>
			{mode === 'monarch' ? (
				<MonarchSelector selected={monarchSelected} onChange={onMonarchChange} />
			) : (
				<SuccessorSelector selected={successorSelected} onChange={onSuccessorChange} />
			)}
		</div>
	)
}
