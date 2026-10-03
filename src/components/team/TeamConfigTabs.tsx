interface TeamConfigTabsProps {
	labels: string[] // e.g. ["Équipe 1", "Équipe 2", "Équipe 3"]
	active: number // 0-indexed
	hasData: boolean[] // true if configs[i].hunters.length > 0
	onChange: (i: number) => void
}

export function TeamConfigTabs({ labels, active, hasData, onChange }: TeamConfigTabsProps) {
	return (
		<div className='flex flex-wrap gap-2'>
			{labels.map((label, i) => (
				<button
					key={label}
					type='button'
					onClick={() => onChange(i)}
					aria-pressed={active === i}
					className={`sla-tap sla-tab px-4 py-2 text-xs font-semibold ${hasData[i] ? '' : 'opacity-40'}`}
				>
					{label}
				</button>
			))}
		</div>
	)
}
