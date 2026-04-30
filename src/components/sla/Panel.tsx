import type { ComponentChildren, JSX } from 'preact'

interface PanelProps {
	children: ComponentChildren
	corners?: boolean
	class?: string
	style?: JSX.CSSProperties
	as?: 'div' | 'section' | 'article'
}

export function Panel({ children, corners = false, class: className = '', style, as = 'div' }: PanelProps) {
	const Tag = as as keyof JSX.IntrinsicElements
	return (
		<Tag class={`sla-panel ${corners ? 'sla-corners' : ''} ${className}`} style={style}>
			{corners && (
				<>
					<span class='sla-corner-bl' />
					<span class='sla-corner-br' />
				</>
			)}
			<div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
		</Tag>
	)
}
