export function UnderConstruction({ label }: { label?: string }) {
	return (
		<div className='bg-bg-surface border border-border-sla px-6 py-8 text-center space-y-2'>
			{label && <p className='text-text-sla-muted text-sm font-semibold'>{label}</p>}
			<p className='text-text-sla-muted text-xs font-medium uppercase tracking-wider'>En construction</p>
		</div>
	)
}
