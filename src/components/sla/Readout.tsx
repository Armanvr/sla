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
		<div class={`sla-readout ${className}`}>
			<div class='sla-readout-label'>{label}</div>
			<div class='sla-readout-value'>{value}</div>
		</div>
	)
}
