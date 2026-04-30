import type { ComponentChildren } from 'preact'

type Variant = 'active' | 'pending' | 'critical' | 'success'

export function Badge({
	children,
	variant = 'active',
	class: className = '',
}: {
	children: ComponentChildren
	variant?: Variant
	class?: string
}) {
	return <span class={`sla-badge sla-badge-${variant} ${className}`}>{children}</span>
}
