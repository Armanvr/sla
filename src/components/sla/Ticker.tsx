export function Ticker({ label, items }: { label: string; items: string[] }) {
	const doubled = [...items, ...items]
	return (
		<div class='sla-ticker'>
			<span class='sla-ticker-label'>{label}</span>
			<div class='sla-ticker-content'>
				{doubled.map((it, i) => (
					<span key={i}>{it}</span>
				))}
			</div>
		</div>
	)
}
