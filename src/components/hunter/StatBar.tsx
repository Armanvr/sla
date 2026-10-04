export function StatBar({
	label,
	value,
	max,
	primary,
}: {
	label: string
	value: number
	max: number
	primary: boolean
}) {
	const pct = Math.round((value / max) * 100)
	return (
		<div>
			<div className='flex justify-between text-sm mb-1'>
				<span className={`${primary ? 'text-mana-bright' : 'text-text-sla-secondary'}`}>{label}</span>
				<span className='text-text-sla font-hud tabular-nums'>{value.toLocaleString()}</span>
			</div>
			<div className='h-1.5 bg-border-sla overflow-hidden'>
				<div className='h-full bg-gradient-to-r from-mana-dim to-mana' style={`width:${pct}%`} />
			</div>
		</div>
	)
}
