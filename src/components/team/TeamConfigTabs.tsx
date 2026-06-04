interface TeamConfigTabsProps {
	labels: string[] // e.g. ["Équipe 1", "Équipe 2", "Équipe 3"]
	active: number // 0-indexed
	hasData: boolean[] // true if configs[i].hunters.length > 0
	onChange: (i: number) => void
}

export function TeamConfigTabs({ labels, active, hasData, onChange }: TeamConfigTabsProps) {
	return (
		<div className='flex gap-2'>
			{labels.map((label, i) => (
				<button
					key={label}
					type='button'
					onClick={() => onChange(i)}
					className={[
						'px-4 py-2 rounded-lg text-xs font-semibold transition-all border',
						active === i
							? 'bg-zinc-700 text-zinc-100 border-zinc-500'
							: 'bg-zinc-800/40 border-zinc-700/40 text-zinc-400 hover:text-zinc-300 hover:border-zinc-600',
						!hasData[i] ? 'opacity-40' : '',
					]
						.filter(Boolean)
						.join(' ')}
				>
					{label}
				</button>
			))}
		</div>
	)
}
