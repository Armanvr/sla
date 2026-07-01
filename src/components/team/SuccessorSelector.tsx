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
					className={[
						'flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer flex-1 min-w-[100px]',
						selected === s.id
							? 'border-zinc-400 bg-zinc-700/60 shadow-[0_0_12px_rgba(255,255,255,0.06)]'
							: 'border-zinc-700/40 bg-zinc-800/40 hover:border-zinc-600 hover:bg-zinc-800/60',
					].join(' ')}
				>
					<img
						src={s.image}
						alt={s.name}
						className='w-20 h-20 object-cover rounded-lg'
						onError={(e) => {
							;(e.target as HTMLImageElement).style.opacity = '0.3'
						}}
					/>
					<span className='text-xs text-zinc-300 font-medium text-center leading-tight'>{s.name}</span>
				</button>
			))}
		</div>
	)
}
