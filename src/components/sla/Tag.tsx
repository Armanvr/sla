import type { ComponentChildren } from 'preact'

export function Tag({ children, class: className = '' }: { children: ComponentChildren; class?: string }) {
	return <span className={`sla-tag ${className}`}>{children}</span>
}

export function Label({ children, class: className = '' }: { children: ComponentChildren; class?: string }) {
	return <span className={`sla-label ${className}`}>{children}</span>
}
