import type { SuccessorId } from './successors'
import { SUCCESSORS } from './successors'

interface SuccessorSelectorProps {
	selected: SuccessorId
	onChange: (id: SuccessorId) => void
}

export function SuccessorSelector({ selected, onChange }: SuccessorSelectorProps) {
	return (
		<div className='flex gap-3 flex-wrap'>
			{SUCCESSORS.map((s) => (
				<button
					key={s.id}
					type='button'
					onClick={() => onChange(s.id)}
					aria-pressed={selected === s.id}
					className='sla-select-card flex flex-col items-center gap-2 p-3 border border-border-sla bg-bg-surface hover:bg-bg-container transition-all cursor-pointer flex-1 min-w-[100px]'
				>
					<img
						src={s.image}
						alt={s.name}
						className='w-20 h-20 object-cover'
						onError={(e) => {
							;(e.target as HTMLImageElement).style.opacity = '0.3'
						}}
					/>
					<span className='text-xs text-text-sla-secondary font-medium text-center leading-tight'>
						{s.name}
					</span>
				</button>
			))}
		</div>
	)
}
