import type { MonarchId } from './monarchs'
import { MONARCHS } from './monarchs'

interface MonarchSelectorProps {
	selected: MonarchId
	onChange: (id: MonarchId) => void
}

export function MonarchSelector({ selected, onChange }: MonarchSelectorProps) {
	return (
		<div className='flex gap-3 flex-wrap'>
			{MONARCHS.map((m) => (
				<button
					key={m.id}
					type='button'
					onClick={() => onChange(m.id)}
					aria-pressed={selected === m.id}
					className='sla-select-card flex flex-col items-center gap-2 p-3 border border-border-sla bg-bg-surface hover:bg-bg-container transition-all cursor-pointer flex-1 min-w-[100px]'
				>
					<img
						src={m.image}
						alt={m.name}
						className='w-20 h-20 object-cover'
						onError={(e) => {
							;(e.target as HTMLImageElement).style.opacity = '0.3'
						}}
					/>
					<span className='text-xs text-text-sla-secondary font-medium text-center leading-tight'>
						{m.name}
					</span>
				</button>
			))}
		</div>
	)
}
