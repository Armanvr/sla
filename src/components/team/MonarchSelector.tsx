import type { MonarchId } from './monarchs'
import { MONARCHS } from './monarchs'

interface MonarchSelectorProps {
	selected: MonarchId
	onChange: (id: MonarchId) => void
}

export function MonarchSelector({ selected, onChange }: MonarchSelectorProps) {
	return (
		<div class='flex gap-3 flex-wrap'>
			{MONARCHS.map((m) => (
				<button
					key={m.id}
					type='button'
					onClick={() => onChange(m.id)}
					class={[
						'flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer flex-1 min-w-[100px]',
						selected === m.id
							? 'border-zinc-400 bg-zinc-700/60 shadow-[0_0_12px_rgba(255,255,255,0.06)]'
							: 'border-zinc-700/40 bg-zinc-800/40 hover:border-zinc-600 hover:bg-zinc-800/60',
					].join(' ')}
				>
					<img
						src={m.image}
						alt={m.name}
						class='w-20 h-20 object-cover rounded-lg'
						onError={(e) => {
							;(e.target as HTMLImageElement).style.opacity = '0.3'
						}}
					/>
					<span class='text-xs text-zinc-300 font-medium text-center leading-tight'>
						{m.name}
					</span>
				</button>
			))}
		</div>
	)
}
