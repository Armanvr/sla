import { useState } from 'preact/hooks'

export function CollapsibleSection({
	title,
	children,
	defaultOpen = false,
}: {
	title: string
	children: preact.ComponentChildren
	defaultOpen?: boolean
}) {
	const [open, setOpen] = useState(defaultOpen)
	return (
		<section class='sla-anim-in'>
			<button
				type='button'
				onClick={() => setOpen((o) => !o)}
				class='w-full flex items-center gap-3 text-left'
				style={{
					background: 'transparent',
					border: 'none',
					padding: '8px 0',
					cursor: 'pointer',
					borderBottom: '1px solid var(--sla-border-bright)',
				}}
			>
				<span class='sla-elem-bar sla-elem-bar-ember' style={{ height: 24 }} />
				<span class='sla-tag'>{'// SECTION'}</span>
				<h3
					style={{
						flex: 1,
						margin: 0,
						fontFamily: 'var(--sla-font-hud)',
						fontSize: 'var(--sla-text-lg)',
						fontWeight: 700,
						textTransform: 'uppercase',
						letterSpacing: 'var(--sla-ls-normal)',
						color: 'var(--sla-text-primary)',
					}}
				>
					{title}
				</h3>
				<span style={{ fontFamily: 'var(--sla-font-mono)', color: 'var(--sla-ember)' }}>
					{open ? '▲' : '▼'}
				</span>
			</button>
			{open && <div style={{ marginTop: 24 }}>{children}</div>}
		</section>
	)
}
