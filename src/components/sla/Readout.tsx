import type { ComponentChildren } from 'preact'

export function Readout({
	label,
	value,
	class: className = '',
}: {
	label: string
	value: ComponentChildren
	class?: string
}) {
	return (
		<div className={`sla-readout ${className}`}>
			<div className='sla-readout-label'>{label}</div>
			<div className='sla-readout-value'>{value}</div>
		</div>
	)
}
