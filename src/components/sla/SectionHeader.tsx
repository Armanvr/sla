import type { ComponentChildren } from 'preact'

export function SectionHeader({
	tag,
	title,
	description,
	right,
}: {
	tag?: string
	title: string
	description?: string
	right?: ComponentChildren
}) {
	return (
		<div class='sla-section-head sla-anim-in'>
			<div class='sla-section-head-row'>
				{tag && <span class='sla-tag'>{tag}</span>}
				<h2 class='sla-title-section'>{title}</h2>
				{right && <div style={{ marginLeft: 'auto' }}>{right}</div>}
			</div>
			{description && (
				<p
					style={{
						color: 'var(--sla-text-secondary)',
						fontFamily: 'var(--sla-font-body)',
						fontSize: 'var(--sla-text-base)',
						margin: 0,
						letterSpacing: 'var(--sla-ls-tight)',
					}}
				>
					{description}
				</p>
			)}
			<hr class='sla-divider' />
		</div>
	)
}
