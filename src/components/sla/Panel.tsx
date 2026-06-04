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
		<Tag className={`sla-panel ${corners ? 'sla-corners' : ''} ${className}`} style={style}>
			{corners && (
				<>
					<span className='sla-corner-bl' />
					<span className='sla-corner-br' />
				</>
			)}
			<div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
		</Tag>
	)
}
