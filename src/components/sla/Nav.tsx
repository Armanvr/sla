import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'

interface NavLink {
	href: string
	label: string
	/** Hidden below 768px (bottom tab bar covers the player routes). */
	desktopOnly?: boolean
}

const LINKS: NavLink[] = [
	{ href: '/', label: 'Home' },
	{ href: '/design-system', label: 'Design', desktopOnly: true },
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
		<header className='sla-nav' style={{ justifyContent: 'center' }}>
			<a href='/' className='sla-nav-logo'>
				SLA <span className='sla-nav-logo-accent'>{'// ARISE'}</span>
			</a>
			<span className='sla-tag' style={{ marginLeft: 4 }}>
				v5.0.0
			</span>
			<nav style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
				{LINKS.map((l) => {
					const active = url === l.href || (l.href !== '/' && url.startsWith(l.href))
					return (
						<a
							key={l.href}
							href={l.href}
							className={`sla-nav-link ${l.desktopOnly ? 'sla-nav-link-desktop' : ''} ${active ? 'active' : ''}`}
						>
							{l.label}
						</a>
					)
				})}
			</nav>
			<div className='sla-nav-status'>
				<span className='sla-status-dot' />
				<span className='sla-label'>Online</span>
				<span className='sla-nav-clock' aria-hidden='true'>
					{time}
				</span>
			</div>
		</header>
	)
}
