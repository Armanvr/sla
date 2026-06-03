import type { MonarchId } from './monarchs'
import { MonarchSelector } from './MonarchSelector'
import type { SuccessorId } from './successors'
import { SuccessorSelector } from './SuccessorSelector'

export type PuissanceMode = 'monarch' | 'successor'

interface PuissanceRemanteProps {
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
}: PuissanceRemanteProps) {
	return (
		<div>
			<div class='flex gap-2 mb-4'>
				{(['monarch', 'successor'] as PuissanceMode[]).map((m) => (
					<button
						key={m}
						type='button'
						onClick={() => onModeChange(m)}
						class={[
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
