import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'

interface NavLink {
	href: string
	label: string
}

const LINKS: NavLink[] = [
	{ href: '/', label: 'Home' },
	{ href: '/compare', label: 'Compare' },
	{ href: '/design-system', label: 'Design' },
]

function useClock() {
	const [now, setNow] = useState(() => new Date())
	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(id)
	}, [])
	return now.toLocaleTimeString('fr-FR', { hour12: false })
}

export function Nav() {
	const { url } = useLocation()
	const time = useClock()

	return (
		<header class='sla-nav'>
			<a href='/' class='sla-nav-logo'>
				SLA <span class='sla-nav-logo-accent'>{'// ARISE'}</span>
			</a>
			<span class='sla-tag' style={{ marginLeft: 4 }}>
				v3.0.0
			</span>
			<nav style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
				{LINKS.map((l) => {
					const active = url === l.href || (l.href !== '/' && url.startsWith(l.href))
					return (
						<a key={l.href} href={l.href} class={`sla-nav-link ${active ? 'active' : ''}`}>
							{l.label}
						</a>
					)
				})}
			</nav>
			<div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
				<span class='sla-status-dot' />
				<span class='sla-label'>Online</span>
				<span class='sla-nav-clock'>{time}</span>
			</div>
		</header>
	)
}
