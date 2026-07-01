export interface NavItem {
	href: string
	label: string
	icon: string
}

export const NAV_ITEMS: NavItem[] = [
	{ href: '/hunters', label: 'Hunters', icon: '⚔' },
	{ href: '/compare', label: 'Compare', icon: '⇌' },
	{ href: '/team/power-destruction', label: 'Power', icon: '⚡' },
	{ href: '/team/guild-boss', label: 'Guild Boss', icon: '◉' },
]
