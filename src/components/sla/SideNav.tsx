import type { JSX } from 'preact'
import { useLocation } from 'preact-iso'
import { NAV_ITEMS } from './nav-items'

const sideNavLinkBase: JSX.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	gap: 10,
	padding: '10px 16px',
	fontFamily: 'var(--sla-font-hud)',
	fontSize: 'var(--sla-text-xs)',
	letterSpacing: 'var(--sla-ls-wider)',
	textTransform: 'uppercase',
	textDecoration: 'none',
	transition: 'color 0.15s, border-color 0.15s, background 0.15s',
}

export function SideNav() {
	const { url } = useLocation()

	return (
		<aside className='sla-sidenav'>
			{NAV_ITEMS.map((item) => {
				const active = url === item.href || (item.href !== '/' && url.startsWith(item.href))
				return (
					<a
						key={item.href}
						href={item.href}
						style={{
							...sideNavLinkBase,
							color: active ? 'var(--sla-ember)' : 'var(--sla-text-muted)',
							borderLeft: active ? '2px solid var(--sla-ember)' : '2px solid transparent',
							background: active ? 'rgba(194, 94, 28, 0.06)' : 'transparent',
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
