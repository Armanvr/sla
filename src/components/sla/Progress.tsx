export function Progress({ value, max = 100, class: className = '' }: { value: number; max?: number; class?: string }) {
	const pct = Math.max(0, Math.min(100, (value / max) * 100))
	return (
		<div className={`sla-progress ${className}`}>
			<div className='sla-progress-fill' style={{ width: `${pct}%` }} />
		</div>
	)
}
