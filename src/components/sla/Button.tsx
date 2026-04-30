import type { ComponentChildren, JSX } from 'preact'

interface BaseProps {
	children: ComponentChildren
	variant?: 'primary' | 'ghost'
	class?: string
}

type ButtonProps = BaseProps & JSX.HTMLAttributes<HTMLButtonElement>
type AnchorProps = BaseProps & JSX.HTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button({ children, variant = 'primary', class: className = '', ...rest }: ButtonProps) {
	return (
		<button
			type='button'
			class={`sla-btn sla-btn-${variant} ${className}`}
			{...(rest as JSX.HTMLAttributes<HTMLButtonElement>)}
		>
			{children}
		</button>
	)
}

export function ButtonLink({ children, variant = 'primary', class: className = '', href, ...rest }: AnchorProps) {
	return (
		<a
			href={href}
			class={`sla-btn sla-btn-${variant} ${className}`}
			{...(rest as JSX.HTMLAttributes<HTMLAnchorElement>)}
		>
			{children}
		</a>
	)
}
