export function Ticker({ label, items }: { label: string; items: string[] }) {
	return (
		<div className='sla-ticker'>
			<span className='sla-ticker-label' aria-hidden='true'>
				{label}
			</span>
			{/* biome-ignore lint/a11y/noRedundantRoles: VoiceOver drops list semantics when list-style is none */}
			<ul className='sla-ticker-content' role='list' aria-label={label}>
				{/* Second copy only feeds the seamless CSS loop: hidden from assistive tech. */}
				{[...items, ...items].map((it, i) => (
					<li
						key={i}
						className={i >= items.length ? 'sla-ticker-dup' : undefined}
						aria-hidden={i >= items.length ? 'true' : undefined}
					>
						{it}
					</li>
				))}
			</ul>
		</div>
	)
}
