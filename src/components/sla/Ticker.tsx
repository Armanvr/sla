export function Ticker({ label, items }: { label: string; items: string[] }) {
	const doubled = [...items, ...items]
	return (
		<div className='sla-ticker'>
			<span className='sla-ticker-label'>{label}</span>
			<div className='sla-ticker-content'>
				{doubled.map((it, i) => (
					<span key={i}>{it}</span>
				))}
			</div>
		</div>
	)
}
