import { useLocation } from 'preact-iso'

const NAV_ITEMS = [
	{ href: '/hunters', label: 'Hunters', icon: '⚔' },
	{ href: '/compare', label: 'Compare', icon: '⇌' },
	{ href: '/team/dungeons', label: 'Dungeons', icon: '◈' },
	{ href: '/team/power-destruction', label: 'Power', icon: '⚡' },
	{ href: '/team/guild-boss', label: 'Guild Boss', icon: '◉' },
	{ href: '/shadows', label: 'Shadows', icon: '◆' },
]

export function SideNav() {
	const { url } = useLocation()

	return (
		<aside
			style={{
				width: 160,
				minWidth: 160,
				alignSelf: 'flex-start',
				position: 'sticky',
				top: 52,
				height: 'calc(100vh - 52px)',
				overflowY: 'auto',
				background: '#0d0d1a',
				borderRight: '1px solid var(--sla-mana)',
				display: 'flex',
				flexDirection: 'column',
				padding: '24px 0',
				gap: 2,
			}}
		>
			{NAV_ITEMS.map((item) => {
				const active = url === item.href || (item.href !== '/' && url.startsWith(item.href))
				return (
					<a
						key={item.href}
						href={item.href}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							padding: '10px 16px',
							fontFamily: 'var(--sla-font-hud)',
							fontSize: 'var(--sla-text-xs)',
							letterSpacing: 'var(--sla-ls-wider)',
							textTransform: 'uppercase',
							textDecoration: 'none',
							color: active ? 'var(--sla-ember)' : 'var(--sla-text-muted)',
							borderLeft: active ? '2px solid var(--sla-ember)' : '2px solid transparent',
							background: active ? 'rgba(194, 94, 28, 0.06)' : 'transparent',
							transition: 'color 0.15s, border-color 0.15s, background 0.15s',
						}}
					>
						<span style={{ fontSize: 14, lineHeight: 1, opacity: active ? 1 : 0.5 }}>{item.icon}</span>
						{item.label}
					</a>
				)
			})}
		</aside>
	)
}
