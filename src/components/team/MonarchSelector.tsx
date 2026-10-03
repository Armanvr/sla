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
					className='sla-select-card flex flex-col items-center gap-2 p-3 border border-zinc-700/40 bg-zinc-800/40 hover:bg-zinc-800/60 transition-all cursor-pointer flex-1 min-w-[100px]'
				>
					<img
						src={m.image}
						alt={m.name}
						className='w-20 h-20 object-cover rounded-lg'
						onError={(e) => {
							;(e.target as HTMLImageElement).style.opacity = '0.3'
						}}
					/>
					<span className='text-xs text-zinc-300 font-medium text-center leading-tight'>{m.name}</span>
				</button>
			))}
		</div>
	)
}
