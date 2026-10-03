import type { ComponentChildren } from 'preact'

export function SectionHeader({
	tag,
	title,
	description,
	right,
	as: Heading = 'h2',
}: {
	tag?: string
	title: string
	description?: string
	right?: ComponentChildren
	as?: 'h1' | 'h2'
}) {
	return (
		<div className={`sla-section-head${Heading === 'h1' ? ' sla-anim-in' : ''}`}>
			<div className='sla-section-head-row'>
				{tag && <span className='sla-tag'>{tag}</span>}
				<Heading className='sla-title-section'>{title}</Heading>
				{right && <div style={{ marginLeft: 'auto' }}>{right}</div>}
			</div>
			{description && (
				<p
					style={{
						color: 'var(--sla-text-secondary)',
						fontFamily: 'var(--sla-font-body)',
						fontSize: 'var(--sla-text-base)',
						maxWidth: '70ch',
						margin: 0,
						letterSpacing: 'var(--sla-ls-tight)',
					}}
				>
					{description}
				</p>
			)}
			<hr className='sla-divider' />
		</div>
	)
}
